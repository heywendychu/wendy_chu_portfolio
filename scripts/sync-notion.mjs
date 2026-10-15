#!/usr/bin/env node
// Pull the portfolio's content out of Notion and write it to content/ as JSON.
// Runs automatically before every `npm run build` (and therefore every Netlify deploy).
//
//   NOTION_TOKEN          internal integration secret (required to sync)
//   NOTION_DATABASE_ID    the "Portfolio projects" database (URL or id)
//   NOTION_HOME_PAGE_ID   the "Portfolio home" page: About + Contact text (URL or id)
//   NOTION_INCLUDE_DRAFTS set to 1 to also build unpublished projects (local preview)
//
// Without NOTION_TOKEN the script leaves the committed snapshot in content/ alone, so
// the site still builds offline.
//
// Notion's file URLs expire after an hour, so every uploaded image is downloaded into
// public/notion/ (resized + converted to WebP when sharp is available).

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { getBlockTree, paginate, notion, toId } from "./lib/notion-api.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const IMG_DIR = path.join(ROOT, "public", "notion");
const MAX_WIDTH = 2400;

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[sync] sharp not installed — images are copied without resizing");
}

// ---------------------------------------------------------------------------
// property helpers (case-insensitive, tolerant of renamed/missing columns)

function prop(page, ...names) {
  const entries = Object.entries(page.properties || {});
  for (const n of names) {
    const hit = entries.find(([k]) => k.toLowerCase() === n.toLowerCase());
    if (hit) return hit[1];
  }
  return undefined;
}
const plain = (rt = []) => rt.map((t) => t.plain_text ?? t.text?.content ?? "").join("").trim();
function text(page, ...names) {
  const p = prop(page, ...names);
  if (!p) return "";
  switch (p.type) {
    case "title": return plain(p.title);
    case "rich_text": return plain(p.rich_text);
    case "select": return p.select?.name ?? "";
    case "url": return p.url ?? "";
    case "date": return p.date?.start ?? "";
    case "number": return p.number == null ? "" : String(p.number);
    default: return "";
  }
}
export const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// ---------------------------------------------------------------------------
// images

async function download(url, key, { raw = false } = {}) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} ${url.slice(0, 80)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const type = res.headers.get("content-type") || "";
  let ext = (new URL(url).pathname.match(/\.([a-z0-9]{2,5})$/i)?.[1] || type.split("/")[1] || "png").toLowerCase();
  if (ext === "jpeg") ext = "jpg";
  const base = crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);

  // Animated GIFs and SVGs are kept as-is; everything else becomes a resized WebP.
  if (sharp && !raw && !["gif", "svg", "svg+xml"].includes(ext)) {
    const img = sharp(buf, { failOn: "none" }).rotate();
    const out = await img.resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer({ resolveWithObject: true });
    const file = `${base}.webp`;
    await fs.writeFile(path.join(IMG_DIR, file), out.data);
    return { src: `/notion/${file}`, width: out.info.width, height: out.info.height };
  }
  const file = `${base}.${ext === "svg+xml" ? "svg" : ext}`;
  await fs.writeFile(path.join(IMG_DIR, file), buf);
  let dims = {};
  if (sharp && !raw) {
    try {
      const m = await sharp(buf, { failOn: "none" }).metadata();
      dims = { width: m.width, height: m.pageHeight || m.height };
    } catch {}
  }
  return { src: `/notion/${file}`, ...dims };
}

/** Turn a Notion file object (block image / files property entry) into {src,width,height}. */
async function localiseFile(fileObj, key) {
  if (!fileObj) return null;
  if (fileObj.type === "external") {
    const url = fileObj.external.url;
    // A path into this site's own /public (used by the migrated snapshot) needs no download.
    if (url.startsWith("/")) return { src: url, ...(await localDims(url)) };
    return { src: url };
  }
  const url = fileObj.file?.url;
  if (!url) return null;
  return download(url, key);
}

async function localDims(publicPath) {
  if (!sharp) return {};
  try {
    const m = await sharp(path.join(ROOT, "public", decodeURIComponent(publicPath))).metadata();
    return { width: m.width, height: m.pageHeight || m.height };
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// block cleanup: drop API noise, localise images, keep only what the renderer needs

async function clean(blocks) {
  const out = [];
  for (const b of blocks) {
    const data = { ...b[b.type] };
    if (b.type === "image") {
      const img = await localiseFile(b.image, `${b.id}:${b.last_edited_time}`);
      if (!img) continue;
      out.push({ id: b.id, type: "image", image: { ...img, caption: b.image.caption || [] } });
      continue;
    }
    if (["video", "pdf", "file"].includes(b.type)) {
      // uploaded media expires like images do; external links are kept as-is
      data.src = data.type === "file" ? (await download(data.file.url, `${b.id}:${b.last_edited_time}`, { raw: true })).src : data.external?.url;
      delete data.file;
    }
    const block = { id: b.id, type: b.type, [b.type]: data };
    if (b.children?.length) block.children = await clean(b.children);
    out.push(block);
  }
  return out;
}

// ---------------------------------------------------------------------------

async function main() {
  if (!process.env.NOTION_TOKEN) {
    console.warn("[sync] NOTION_TOKEN not set — building from the committed snapshot in content/");
    return;
  }
  const dbId = toId(process.env.NOTION_DATABASE_ID);
  const homeId = toId(process.env.NOTION_HOME_PAGE_ID);
  if (!dbId) throw new Error("NOTION_DATABASE_ID is not set");
  const includeDrafts = process.env.NOTION_INCLUDE_DRAFTS === "1";

  await fs.rm(IMG_DIR, { recursive: true, force: true });
  await fs.mkdir(IMG_DIR, { recursive: true });

  console.log("[sync] querying projects database…");
  const pages = await paginate(`/databases/${dbId}/query`, { method: "POST", body: {} });

  const projects = [];
  const seen = new Set();
  for (const page of pages) {
    if (page.archived || page.in_trash) continue;
    const publishedProp = prop(page, "Published");
    const published = publishedProp ? !!publishedProp.checkbox : true;
    if (!published && !includeDrafts) continue;

    const title = text(page, "Name", "Title");
    if (!title) continue;
    let slug = slugify(text(page, "Slug") || title);
    while (seen.has(slug)) slug += "-2";
    seen.add(slug);

    const coverFiles = prop(page, "Cover")?.files || [];
    const cover = coverFiles[0] ? await localiseFile(coverFiles[0], `${page.id}:cover:${page.last_edited_time}`) : null;
    const externalUrl = text(page, "External URL", "External link");

    const project = {
      id: page.id,
      slug,
      title,
      menuLabel: text(page, "Menu label") || title,
      company: text(page, "Company"),
      date: text(page, "Date"),
      responsibilities: text(page, "Responsibilities"),
      roleSummary: text(page, "Role summary"),
      description: text(page, "Description"),
      cover: cover ? { ...cover, alt: text(page, "Cover alt") || title, caption: text(page, "Cover caption") } : null,
      externalUrl: externalUrl || null,
      order: Number(text(page, "Order")) || 999,
      published,
    };
    console.log(`[sync]  • ${project.company} — ${title}${published ? "" : " (draft)"}`);
    if (!externalUrl) {
      const blocks = await clean(await getBlockTree(page.id));
      project.blocks = blocks;
    }
    projects.push(project);
  }
  projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  let home = { title: "", blocks: [] };
  if (homeId) {
    console.log("[sync] reading home page…");
    const page = await notion(`/pages/${homeId}`);
    home = { title: text(page, "title", "Name"), blocks: await clean(await getBlockTree(homeId)) };
  } else {
    console.warn("[sync] NOTION_HOME_PAGE_ID not set — keeping About/Contact from the snapshot");
    home = JSON.parse(await fs.readFile(path.join(CONTENT, "home.json"), "utf8"));
  }

  // Links between Notion pages (e.g. one case study linking another) → site URLs.
  const bySlug = new Map(projects.map((p) => [p.id.replace(/-/g, ""), p.slug]));
  const relink = (node) => {
    if (Array.isArray(node)) return node.forEach(relink);
    if (!node || typeof node !== "object") return;
    if (typeof node.href === "string") {
      const m = node.href.match(/^\/?([0-9a-f]{32})/i) || node.href.match(/notion\.(?:so|site)\/.*?([0-9a-f]{32})/i);
      if (m && bySlug.has(m[1].toLowerCase())) {
        node.href = `/projects/${bySlug.get(m[1].toLowerCase())}`;
        if (node.text?.link) node.text.link.url = node.href;
      }
    }
    Object.values(node).forEach(relink);
  };
  projects.forEach((p) => relink(p.blocks));
  relink(home.blocks);

  // write
  await fs.rm(path.join(CONTENT, "projects"), { recursive: true, force: true });
  await fs.mkdir(path.join(CONTENT, "projects"), { recursive: true });
  for (const p of projects) {
    if (p.blocks) {
      await fs.writeFile(path.join(CONTENT, "projects", `${p.slug}.json`), JSON.stringify({ blocks: p.blocks }));
      delete p.blocks;
    }
  }
  await fs.writeFile(path.join(CONTENT, "projects.json"), JSON.stringify(projects, null, 2));
  await fs.writeFile(path.join(CONTENT, "home.json"), JSON.stringify(home));
  console.log(`[sync] done: ${projects.length} projects`);
}

main().catch((err) => {
  // Fail the build so Netlify keeps the last good deploy live.
  console.error("[sync] FAILED:", err.message);
  process.exit(1);
});
