// Reads the JSON written by scripts/sync-notion.mjs (or the committed snapshot).
// Only ever runs at build time — the exported site is plain HTML.
import fs from "node:fs";
import path from "node:path";

const CONTENT = path.join(process.cwd(), "content");
const readJSON = (file, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(CONTENT, file), "utf8"));
  } catch {
    return fallback;
  }
};

export const site = {
  name: "Wendy Chu",
  role: "Product Designer",
  url: "https://wendychu.design",
};

export function getProjects() {
  const drafts = process.env.NOTION_INCLUDE_DRAFTS === "1";
  return readJSON("projects.json", []).filter((p) => drafts || p.published !== false);
}

/** Projects that have their own page on this site (not external links). */
export function getLocalProjects() {
  return getProjects().filter((p) => !p.externalUrl);
}

export function getProject(slug) {
  const meta = getProjects().find((p) => p.slug === slug && !p.externalUrl);
  if (!meta) return null;
  return { ...meta, blocks: readJSON(`projects/${slug}.json`, { blocks: [] }).blocks };
}

export function getHome() {
  return readJSON("home.json", { blocks: [] });
}

/** Group projects by company, keeping the order of each company's first project. */
export function groupByCompany(projects) {
  const groups = [];
  for (const p of projects) {
    let g = groups.find((x) => x.company === p.company);
    if (!g) groups.push((g = { company: p.company, projects: [] }));
    g.projects.push(p);
  }
  return groups;
}
