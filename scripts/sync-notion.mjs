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

// Fetch an image, retrying dropped connections (UND_ERR_SOCKET, resets, timeouts).
async function fetchImage(url) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (res.status >= 500 && attempt < 4) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw Object.assign(new Error(`download ${res.status} ${url.slice(0, 80)}`), { final: true });
      return { res, buf: Buffer.from(await res.arrayBuffer()) };
    } catch (err) {
      if (err.final || attempt >= 4) {
        const cause = err.cause?.code || err.cause?.message || err.message;
        throw new Error(`Couldn't download image ${url.split("?")[0].slice(-60)} (${cause})`);
      }
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
  }
}

// Images already in public/notion/ from an earlier sync (key → file), and the ones this sync uses.
// Keys include the block's or page's last-edited time, so an unchanged image is reused, not re-downloaded,
// and the folder is never emptied mid-sync (the local preview keeps working while a sync runs).
let EXISTING = new Map();
const USED = new Set();

/** Write a file in one step (temp file + rename) so a running preview never reads half a file. */
async function writeAtomic(file, data) {
  const tmp = `${file}.tmp-${process.pid}`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, file);
}

async function download(url, key, { raw = false } = {}) {
  const base0 = crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
  const have = EXISTING.get(base0);
  if (have) {
    USED.add(have);
    let dims = {};
    if (sharp && !raw) {
      try {
        const m = await sharp(path.join(IMG_DIR, have), { failOn: "none" }).metadata();
        dims = { width: m.width, height: m.pageHeight || m.height };
      } catch {}
    }
    return { src: `/notion/${have}`, ...dims };
  }
  const { res, buf } = await fetchImage(url);
  const type = res.headers.get("content-type") || "";
  let ext = (new URL(url).pathname.match(/\.([a-z0-9]{2,5})$/i)?.[1] || type.split("/")[1] || "png").toLowerCase();
  if (ext === "jpeg") ext = "jpg";
  const base = crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);

  // Animated GIFs and SVGs are kept as-is; everything else becomes a resized WebP.
  if (sharp && !raw && !["gif", "svg", "svg+xml"].includes(ext)) {
    const img = sharp(buf, { failOn: "none" }).rotate();
    const out = await img.resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer({ resolveWithObject: true });
    const file = `${base}.webp`;
    await writeAtomic(path.join(IMG_DIR, file), out.data);
    USED.add(file);
    return { src: `/notion/${file}`, width: out.info.width, height: out.info.height };
  }
  const file = `${base}.${ext === "svg+xml" ? "svg" : ext}`;
  await writeAtomic(path.join(IMG_DIR, file), buf);
  USED.add(file);
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
    let url = fileObj.external.url;
    // A link to an image already on this site (e.g. https://wendychu.design/images/...) → local path.
    const own = url.match(/^https?:\/\/(?:www\.)?wendychu\.design(\/[^?#]*)/);
    if (own) url = own[1];
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
  // Local runs: read .env.local (Netlify sets these variables itself).
  for (const f of [".env.local", ".env"]) {
    try { process.loadEnvFile(path.join(ROOT, f)); } catch {}
  }
  if (!process.env.NOTION_TOKEN) {
    console.warn("[sync] NOTION_TOKEN not set — building from the committed snapshot in content/");
    return;
  }
  const dbId = toId(process.env.NOTION_DATABASE_ID);
  const homeId = toId(process.env.NOTION_HOME_PAGE_ID);
  if (!dbId) throw new Error("NOTION_DATABASE_ID is not set");
  const includeDrafts = process.env.NOTION_INCLUDE_DRAFTS === "1";

  await fs.mkdir(IMG_DIR, { recursive: true });
  EXISTING = new Map(
    (await fs.readdir(IMG_DIR)).filter((n) => /^[0-9a-f]{16}\.[a-z0-9]+$/.test(n)).map((n) => [n.split(".")[0], n])
  );

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
    // Homepage thumbnail: "Homepage image" if set, otherwise the cover. "Image position" picks the crop.
    const homeFiles = prop(page, "Homepage image")?.files || [];
    const homeImage = homeFiles[0] ? await localiseFile(homeFiles[0], `${page.id}:home:${page.last_edited_time}`) : null;
    const position = (text(page, "Image position") || "Top").toLowerCase();

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
      homeImage: homeImage ? { ...homeImage, alt: text(page, "Cover alt") || title } : null,
      imagePosition: ["top", "center", "bottom"].includes(position) ? position : "top",
      imageTransparent: !!prop(page, "Transparent background")?.checkbox,
      // Exact crop from the review page's Thumbnails tab (all three or none): image width and left
      // offset as % of the thumbnail's inner panel width, top offset as % of its height.
      imageCrop: (() => {
        const n = (k) => { const v = prop(page, k)?.number; return typeof v === "number" ? v : null; };
        const zoom = n("Image zoom"), x = n("Image x"), y = n("Image y");
        return zoom && x !== null && y !== null ? { zoom, x, y } : null;
      })(),
      outcome: text(page, "Outcome"),
      skills: (prop(page, "Skills")?.multi_select || []).map((o) => o.name).slice(0, 3),
      published,
    };
    console.log(`[sync]  • ${project.company} — ${title}${published ? "" : " (draft)"}`);
    if (!externalUrl) {
      const blocks = await clean(await getBlockTree(page.id));
      // No Cover property? Images at the very top of the page (before any text) become the cover.
      // Two or more are shown side by side at the same height.
      if (!project.cover) {
        let i = 0;
        const covers = [];
        while (i < blocks.length) {
          const b = blocks[i];
          if (b.type === "paragraph" && !b.paragraph.rich_text?.length) { i++; continue; }
          if (b.type !== "image") break;
          const caption = (b.image.caption || []).map((t) => t.plain_text).join("");
          covers.push({ src: b.image.src, width: b.image.width, height: b.image.height, alt: caption || title, caption });
          i++;
        }
        if (covers.length) {
          blocks.splice(0, i);
          project.cover = { ...covers[0], alt: text(page, "Cover alt") || covers[0].alt, caption: text(page, "Cover caption") || (covers.length === 1 ? covers[0].caption : "") };
          if (covers.length > 1) project.covers = covers;
        }
      }
      project.blocks = blocks;
      // "Homepage image override", picked in the review page's Thumbnails tab:
      //   page:N     → the Nth image on the case-study page (1 = first, counting a top-of-page cover)
      //   /home/...  → an image file added to the site's public/home folder
      const override = text(page, "Homepage image override").trim();
      if (override) {
        const pageImages = [...(project.covers || (project.cover && !coverFiles[0] ? [project.cover] : []))];
        const walk = (bs) => (bs || []).forEach((b) => { if (b.type === "image" && b.image?.src) pageImages.push({ src: b.image.src, width: b.image.width, height: b.image.height }); walk(b.children); });
        walk(blocks);
        const m = override.match(/^page:(\d+)$/i);
        if (m && pageImages[+m[1] - 1]) project.homeImage = { ...pageImages[+m[1] - 1], alt: title };
        else if (override.startsWith("/home/")) project.homeImage = { src: override, ...(await localDims(override)), alt: title };
      }
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
  await fs.mkdir(path.join(CONTENT, "projects"), { recursive: true });
  const written = new Set();
  for (const p of projects) {
    if (p.blocks) {
      await writeAtomic(path.join(CONTENT, "projects", `${p.slug}.json`), JSON.stringify({ blocks: p.blocks }));
      written.add(`${p.slug}.json`);
      delete p.blocks;
    }
  }
  await writeAtomic(path.join(CONTENT, "projects.json"), JSON.stringify(projects, null, 2));
  await writeAtomic(path.join(CONTENT, "home.json"), JSON.stringify(home));
  // Only now remove what this sync no longer uses (old project files and images).
  for (const n of await fs.readdir(path.join(CONTENT, "projects"))) {
    if (n.endsWith(".json") && !written.has(n)) await fs.rm(path.join(CONTENT, "projects", n), { force: true });
  }
  for (const n of await fs.readdir(IMG_DIR)) {
    if (/^[0-9a-f]{16}\.[a-z0-9]+$/.test(n) && !USED.has(n)) await fs.rm(path.join(IMG_DIR, n), { force: true });
  }
  console.log(`[sync] done: ${projects.length} projects`);
}

main().catch((err) => {
  // Fail the build so Netlify keeps the last good deploy live.
  console.error("[sync] FAILED:", err.message, err.cause ? `(${err.cause.code || err.cause.message})` : "");
  process.exit(1);
});
