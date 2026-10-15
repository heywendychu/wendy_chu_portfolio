#!/usr/bin/env node
// One-time migration: turns the hand-written case studies in legacy/src/*.js into
// Notion blocks.
//
//   node scripts/migrate-to-notion.mjs --snapshot
//       Writes content/ (the offline snapshot the site builds from when no
//       NOTION_TOKEN is set). No Notion account needed.
//
//   NOTION_TOKEN=… NOTION_PARENT_PAGE_ID=… node scripts/migrate-to-notion.mjs --push
//       Creates, under the parent page you shared with your integration:
//         • a "Portfolio projects" database with one page per case study
//         • a "Portfolio home" page with the About + Contact copy
//       Images are uploaded to Notion. Prints the env vars to paste into Netlify.
//       Run it once — running it again creates a second copy.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";
import { notion, toId } from "./lib/notion-api.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.join(ROOT, "legacy", "src");
const PUBLIC = path.join(ROOT, "public");

const warnings = [];
const warn = (m) => warnings.push(m);

// ---------------------------------------------------------------------------
// JSX helpers

const read = async (f) => parse(await fs.readFile(path.join(LEGACY, f), "utf8"), { sourceType: "module", plugins: ["jsx"] });

function walk(node, visit) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => walk(n, visit));
  if (node.type) visit(node);
  for (const k of Object.keys(node)) {
    if (k === "loc" || k === "start" || k === "end" || k === "extra") continue;
    walk(node[k], visit);
  }
}

const nameOf = (el) => el.openingElement?.name?.name;

function attr(el, name) {
  const a = el.openingElement.attributes.find((x) => x.name?.name === name);
  if (!a) return undefined;
  if (a.value === null) return true;
  return exprValue(a.value);
}
function exprValue(v) {
  if (!v) return undefined;
  if (v.type === "StringLiteral") return v.value;
  if (v.type === "JSXExpressionContainer") return exprValue(v.expression);
  if (v.type === "NumericLiteral" || v.type === "BooleanLiteral") return v.value;
  if (v.type === "TemplateLiteral") return v.quasis.map((q) => q.value.cooked).join("");
  return undefined;
}

// Babel's JSX whitespace rule (cleanJSXElementLiteralChild)
function jsxText(value) {
  const lines = value.split(/\r\n|\n|\r/);
  let last = 0;
  lines.forEach((l, i) => { if (/[^ \t]/.test(l)) last = i; });
  let out = "";
  lines.forEach((line, i) => {
    let t = line.replace(/\t/g, " ");
    if (i !== 0) t = t.replace(/^[ ]+/, "");
    if (i !== lines.length - 1) t = t.replace(/[ ]+$/, "");
    if (t) {
      if (i !== last) t += " ";
      out += t;
    }
  });
  return out;
}

// ---------------------------------------------------------------------------
// rich text

const INLINE = new Set(["B", "b", "strong", "em", "i", "SpanLink", "a", "br", "span", "u"]);

function richText(children, ann = {}, link = null, out = []) {
  for (const c of children) {
    if (c.type === "JSXText") {
      const t = jsxText(c.value);
      if (t) out.push({ content: t, ann, link });
    } else if (c.type === "JSXExpressionContainer") {
      const v = exprValue(c.expression);
      if (typeof v === "string" && v) out.push({ content: v, ann, link });
    } else if (c.type === "JSXElement") {
      const n = nameOf(c);
      if (n === "br") out.push({ content: "\n", ann, link });
      else if (["B", "b", "strong"].includes(n)) richText(c.children, { ...ann, bold: true }, link, out);
      else if (["em", "i"].includes(n)) richText(c.children, { ...ann, italic: true }, link, out);
      else if (n === "u") richText(c.children, { ...ann, underline: true }, link, out);
      else if (["SpanLink", "a"].includes(n)) richText(c.children, ann, attr(c, "href"), out);
      else richText(c.children, ann, link, out);
    } else if (c.type === "JSXFragment") {
      richText(c.children, ann, link, out);
    }
  }
  return out;
}

function toRich(segments) {
  // merge neighbours with identical formatting, trim the ends
  const merged = [];
  for (const s of segments) {
    const prev = merged[merged.length - 1];
    if (prev && JSON.stringify(prev.ann) === JSON.stringify(s.ann) && prev.link === s.link) prev.content += s.content;
    else merged.push({ ...s });
  }
  if (merged.length) {
    merged[0].content = merged[0].content.replace(/^\s+/, "");
    merged[merged.length - 1].content = merged[merged.length - 1].content.replace(/\s+$/, "");
  }
  const rt = [];
  for (const s of merged) {
    if (!s.content) continue;
    for (let i = 0; i < s.content.length; i += 2000) {
      const content = s.content.slice(i, i + 2000);
      rt.push({
        type: "text",
        text: { content, link: s.link ? { url: s.link } : null },
        annotations: { bold: !!s.ann.bold, italic: !!s.ann.italic, strikethrough: false, underline: !!s.ann.underline, code: false, color: "default" },
        plain_text: content,
        href: s.link || null,
      });
    }
  }
  return rt;
}
const rt = (s) => toRich([{ content: s, ann: {}, link: null }]);

// ---------------------------------------------------------------------------
// block conversion

const sentenceCase = (s) => (s === s.toUpperCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s);
const block = (type, data, children) => ({ type, [type]: data, ...(children?.length ? { children } : {}) });
const imageBlock = (file, caption) => block("image", { type: "external", external: { url: `/images/${file}` }, caption: rt(caption || "") });

const SKIP = new Set(["Spacer", "br", "ProjectHeader", "Footer", "CompanyContainer", "Company", "ProjectLink"]);
const WALK = new Set(["Container", "div", "Column", "Col", "MainRow", "CompanyWrapper", "span", "React.Fragment"]);

function convert(nodes, ctx = {}) {
  const out = [];
  for (const n of nodes) {
    if (n.type === "JSXText") {
      const t = jsxText(n.value).trim();
      if (t) out.push(block("paragraph", { rich_text: rt(t) }));
      continue;
    }
    if (n.type === "JSXFragment") { out.push(...convert(n.children, ctx)); continue; }
    if (n.type !== "JSXElement") continue;
    const name = nameOf(n);
    if (SKIP.has(name)) continue;

    switch (name) {
      case "Section": {
        const title = attr(n, "title");
        if (title) out.push(block("heading_1", { rich_text: rt(sentenceCase(title)) }));
        out.push(...convert(n.children, ctx));
        break;
      }
      case "Heading": {
        const level = Number(attr(n, "level")) || 3;
        const type = level <= 2 ? "heading_1" : level === 3 ? "heading_2" : "heading_3";
        out.push(block(type, { rich_text: toRich(richText(n.children)) }));
        break;
      }
      case "Headline":
        out.push(block("heading_2", { rich_text: toRich(richText(n.children)) }));
        break;
      case "P":
      case "p":
      case "Paragraph": {
        const r = toRich(richText(n.children));
        if (r.length) out.push(block("paragraph", { rich_text: r }));
        break;
      }
      case "StatCallout":
        out.push(block("callout", { rich_text: toRich(richText(n.children)), icon: { type: "emoji", emoji: "📈" }, color: "default" }));
        break;
      case "Ul":
      case "Ol":
      case "ul":
      case "ol": {
        const type = name.toLowerCase() === "ol" ? "numbered_list_item" : "bulleted_list_item";
        for (const li of n.children.filter((c) => c.type === "JSXElement")) {
          const inline = li.children.filter((c) => !(c.type === "JSXElement" && !INLINE.has(nameOf(c))));
          const nested = li.children.filter((c) => c.type === "JSXElement" && !INLINE.has(nameOf(c)));
          out.push(block(type, { rich_text: toRich(richText(inline)) }, convert(nested, ctx)));
        }
        break;
      }
      case "ImageGroup": {
        const file = attr(n, "desktop");
        if (!file) break;
        if (attr(n, "mobile")) warn(`${ctx.slug}: mobile-only variant "${attr(n, "mobile")}" dropped (desktop image is used everywhere)`);
        out.push(imageBlock(file, attr(n, "caption")));
        break;
      }
      case "ProfilePicture":
        if (!ctx.portrait) {
          ctx.portrait = true;
          out.push(imageBlock("profile.png", ""));
        }
        break;
      case "TwoCol": {
        const cols = n.children.filter((c) => c.type === "JSXElement").map((c) => block("column", {}, convert(c.children, ctx)));
        out.push(block("column_list", {}, cols));
        break;
      }
      case "iframe": {
        const src = attr(n, "src") || "";
        const vimeo = src.match(/player\.vimeo\.com\/video\/(\d+)/);
        if (vimeo) out.push(block("video", { type: "external", external: { url: `https://vimeo.com/${vimeo[1]}` }, caption: [] }));
        else out.push(block("embed", { url: src, caption: [] }));
        break;
      }
      default:
        if (!WALK.has(name)) warn(`${ctx.slug}: unknown element <${name}> — converted its children only`);
        out.push(...convert(n.children, ctx));
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// gather projects from the legacy source

async function collect() {
  // exported JSX consts: AllbirdsPDP.js etc.
  const exported = {};
  for (const f of ["AllbirdsPDP.js", "AccessManagement.js", "MobileAccess.js"]) {
    const ast = await read(f);
    walk(ast, (n) => {
      if (n.type === "ExportNamedDeclaration" && n.declaration?.declarations) {
        for (const d of n.declaration.declarations) {
          let init = d.init;
          while (init?.type === "ParenthesizedExpression") init = init.expression;
          if (init?.type === "JSXElement") exported[d.id.name] = init;
        }
      }
    });
  }

  // the data array in Project.js
  const projAst = await read("Templates/Project.js");
  const entries = [];
  walk(projAst, (n) => {
    if (n.type !== "ObjectExpression") return;
    const get = (k) => n.properties.find((p) => p.key?.name === k)?.value;
    const route = get("route");
    const content = get("content");
    if (route?.type !== "StringLiteral" || !content) return;
    let el = content;
    while (el.type === "ParenthesizedExpression") el = el.expression;
    if (el.type === "Identifier") el = exported[el.name];
    if (el) entries.push({ route: route.value, el });
  });

  // ordering, companies, menu labels from the home page work list
  const landing = await read("Templates/Landing.js");
  const links = [];
  walk(landing, (n) => {
    if (n.type === "JSXElement" && nameOf(n) === "Company") {
      const company = attr(n, "title");
      for (const c of n.children) {
        if (c.type === "JSXElement" && nameOf(c) === "ProjectLink") {
          links.push({ company, text: attr(c, "text"), route: attr(c, "route"), href: attr(c, "href") });
        }
      }
    }
  });

  const projects = [];
  links.forEach((l, i) => {
    if (l.href) {
      projects.push({
        slug: (l.company + "-" + l.text).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: l.text, menuLabel: l.text, company: l.company, externalUrl: l.href, order: (i + 1) * 10, published: true, blocks: null,
      });
    }
  });
  for (const e of entries) {
    let header;
    walk(e.el, (n) => { if (!header && n.type === "JSXElement" && nameOf(n) === "ProjectHeader") header = n; });
    if (!header) { warn(`${e.route}: no ProjectHeader, skipped`); continue; }
    const linkIdx = links.findIndex((l) => l.route === e.route);
    const link = links[linkIdx];
    const blocks = convert(e.el.children, { slug: e.route });
    projects.push({
      slug: e.route,
      title: attr(header, "title") || e.route,
      menuLabel: link?.text || attr(header, "title"),
      company: link?.company || attr(header, "company"),
      date: attr(header, "date") || "",
      responsibilities: attr(header, "responsibilities") || "",
      roleSummary: attr(header, "roleSummary") || "",
      coverFile: attr(header, "pictureFile") || null,
      coverAlt: attr(header, "alt") || "",
      coverCaption: attr(header, "caption") || "",
      externalUrl: null,
      order: linkIdx >= 0 ? (linkIdx + 1) * 10 : 900 + projects.length,
      // anything not linked from the old home page comes across as a draft
      published: linkIdx >= 0,
      blocks,
    });
    if (blocks.length < 3) warn(`${e.route}: only ${blocks.length} blocks — looks like a stub`);
  }
  projects.sort((a, b) => a.order - b.order);

  // home page: About + Work + Contact
  let landingRoot;
  walk(landing, (n) => { if (!landingRoot && n.type === "JSXElement" && nameOf(n) === "Container") landingRoot = n; });
  const home = convert(landingRoot.children, { slug: "home" });

  return { projects, home };
}

// ---------------------------------------------------------------------------
// --snapshot: write content/ in the same shape scripts/sync-notion.mjs produces

let sharp = null;
try { sharp = (await import("sharp")).default; } catch {}
async function dims(file) {
  if (!sharp) return {};
  try {
    const m = await sharp(path.join(PUBLIC, "images", file)).metadata();
    return { width: m.width, height: m.pageHeight || m.height };
  } catch { return {}; }
}

async function toSnapshotBlocks(blocks, prefix) {
  let i = 0;
  const go = async (list) => {
    const out = [];
    for (const b of list) {
      const id = `${prefix}-${++i}`;
      if (b.type === "image") {
        const file = b.image.external.url.replace(/^\/images\//, "");
        out.push({ id, type: "image", image: { src: b.image.external.url, ...(await dims(file)), caption: b.image.caption } });
        continue;
      }
      const data = { ...b[b.type] };
      if (b.type === "video") data.src = data.external.url;
      if (b.type === "embed") data.src = data.url;
      out.push({ id, type: b.type, [b.type]: data, ...(b.children ? { children: await go(b.children) } : {}) });
    }
    return out;
  };
  return go(blocks);
}

async function snapshot({ projects, home }) {
  const dir = path.join(ROOT, "content");
  await fs.rm(path.join(dir, "projects"), { recursive: true, force: true });
  await fs.mkdir(path.join(dir, "projects"), { recursive: true });
  const meta = [];
  for (const p of projects) {
    const { blocks, coverFile, coverAlt, coverCaption, ...rest } = p;
    meta.push({
      ...rest,
      date: p.date || "",
      responsibilities: p.responsibilities || "",
      roleSummary: p.roleSummary || "",
      description: "",
      cover: coverFile ? { src: `/images/${coverFile}`, ...(await dims(coverFile)), alt: coverAlt, caption: coverCaption } : null,
    });
    if (blocks) {
      await fs.writeFile(path.join(dir, "projects", `${p.slug}.json`), JSON.stringify({ blocks: await toSnapshotBlocks(blocks, p.slug) }, null, 1));
    }
  }
  await fs.writeFile(path.join(dir, "projects.json"), JSON.stringify(meta, null, 2));
  await fs.writeFile(path.join(dir, "home.json"), JSON.stringify({ title: "Portfolio home", blocks: await toSnapshotBlocks(home, "home") }, null, 1));
  console.log(`Wrote content/ snapshot: ${meta.length} projects (${meta.filter((m) => m.published).length} published)`);
}

// ---------------------------------------------------------------------------
// --push: create everything in Notion

const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml" };

async function upload(file) {
  const abs = path.join(PUBLIC, "images", file);
  const ext = path.extname(file).slice(1).toLowerCase();
  const filename = path.basename(file);
  try {
    const created = await notion("/file_uploads", { method: "POST", body: { filename, content_type: MIME[ext] || "application/octet-stream" } });
    const form = new FormData();
    form.append("file", new Blob([await fs.readFile(abs)], { type: MIME[ext] }), filename);
    const res = await fetch(`https://api.notion.com/v1/file_uploads/${created.id}/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.NOTION_TOKEN}`, "Notion-Version": "2022-06-28" },
      body: form,
    });
    if (!res.ok) throw new Error(`${res.status} ${(await res.json()).message}`);
    process.stdout.write(".");
    return { type: "file_upload", file_upload: { id: created.id } };
  } catch (err) {
    // Fall back to the copy this site serves from /public/images.
    warn(`upload failed for ${file} (${err.message}); linked https://wendychu.design/images/${file} instead`);
    return { type: "external", external: { url: `https://wendychu.design/images/${encodeURI(file)}` } };
  }
}

async function prepare(blocks) {
  for (const b of blocks) {
    if (b.type === "image") {
      const file = b.image.external.url.replace(/^\/images\//, "");
      b.image = { ...(await upload(file)), caption: b.image.caption };
    }
    if (b.children) await prepare(b.children);
  }
  return blocks;
}

const strip = (b) => {
  // API create payload: no read-only fields, and children only where Notion requires them inline
  const { children, ...rest } = b;
  const data = { ...rest[rest.type] };
  for (const t of data.rich_text || []) { delete t.plain_text; delete t.href; }
  for (const t of data.caption || []) { delete t.plain_text; delete t.href; }
  const clean = { object: "block", type: rest.type, [rest.type]: data };
  if (rest.type === "column_list") clean.column_list.children = children.map((c) => ({ object: "block", type: "column", column: { children: c.children.map(strip) } }));
  return clean;
};

async function appendTree(parentId, blocks) {
  for (let i = 0; i < blocks.length; i += 90) {
    const chunk = blocks.slice(i, i + 90);
    const res = await notion(`/blocks/${parentId}/children`, { method: "PATCH", body: { children: chunk.map(strip) } });
    for (let j = 0; j < chunk.length; j++) {
      const src = chunk[j];
      if (src.children?.length && src.type !== "column_list") await appendTree(res.results[j].id, src.children);
    }
  }
}

async function push({ projects, home }) {
  const parent = toId(process.env.NOTION_PARENT_PAGE_ID);
  if (!process.env.NOTION_TOKEN || !parent) throw new Error("Set NOTION_TOKEN and NOTION_PARENT_PAGE_ID first (see docs/notion-setup.md)");

  console.log("Creating the Portfolio projects database…");
  const companies = [...new Set(projects.map((p) => p.company))];
  const db = await notion("/databases", {
    method: "POST",
    body: {
      parent: { type: "page_id", page_id: parent },
      title: rt("Portfolio projects").map(({ plain_text, href, ...t }) => t),
      is_inline: true,
      properties: {
        Name: { title: {} },
        Published: { checkbox: {} },
        Company: { select: { options: companies.map((name) => ({ name })) } },
        "Menu label": { rich_text: {} },
        Order: { number: {} },
        Slug: { rich_text: {} },
        Date: { rich_text: {} },
        Responsibilities: { rich_text: {} },
        "Role summary": { rich_text: {} },
        Cover: { files: {} },
        "Cover alt": { rich_text: {} },
        "Cover caption": { rich_text: {} },
        "External URL": { url: {} },
        Description: { rich_text: {} },
      },
    },
  });

  const txt = (s) => ({ rich_text: s ? [{ type: "text", text: { content: s.slice(0, 2000) } }] : [] });
  for (const p of projects) {
    process.stdout.write(`\n• ${p.company} — ${p.title} `);
    const cover = p.coverFile ? await upload(p.coverFile) : null;
    const page = await notion("/pages", {
      method: "POST",
      body: {
        parent: { database_id: db.id },
        properties: {
          Name: { title: [{ type: "text", text: { content: p.title } }] },
          Published: { checkbox: p.published },
          Company: { select: { name: p.company } },
          "Menu label": txt(p.menuLabel),
          Order: { number: p.order },
          Slug: txt(p.slug),
          Date: txt(p.date),
          Responsibilities: txt(p.responsibilities),
          "Role summary": txt(p.roleSummary),
          "Cover alt": txt(p.coverAlt),
          "Cover caption": txt(p.coverCaption),
          "External URL": { url: p.externalUrl || null },
          ...(cover ? { Cover: { files: [{ name: path.basename(p.coverFile), ...cover }] } } : {}),
        },
      },
    });
    if (p.blocks) await appendTree(page.id, await prepare(p.blocks));
  }

  console.log("\n\nCreating the Portfolio home page…");
  const homePage = await notion("/pages", {
    method: "POST",
    body: { parent: { page_id: parent }, properties: { title: { title: [{ type: "text", text: { content: "Portfolio home" } }] } } },
  });
  await appendTree(homePage.id, await prepare(home));

  const env = `NOTION_DATABASE_ID=${db.id.replace(/-/g, "")}\nNOTION_HOME_PAGE_ID=${homePage.id.replace(/-/g, "")}\n`;
  await fs.appendFile(path.join(ROOT, ".env.local"), env);
  console.log(`\nDone! Add these to Netlify (Site configuration → Environment variables) — also saved to .env.local:\n\n${env}`);
}

// ---------------------------------------------------------------------------

const mode = process.argv[2];
const data = await collect();
if (mode === "--snapshot") await snapshot(data);
else if (mode === "--push") await push(data);
else if (mode === "--inspect") console.log(JSON.stringify(data, null, 1));
else console.log("Usage: node scripts/migrate-to-notion.mjs --snapshot | --push | --inspect");
if (warnings.length) console.log(`\nNotes:\n- ${[...new Set(warnings)].join("\n- ")}`);
