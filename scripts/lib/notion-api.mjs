// Minimal Notion REST client (no SDK) shared by the sync and migration scripts.
// Uses the stable 2022-06-28 API version so `databases/{id}/query` keeps working.

const API = process.env.NOTION_API_BASE || "https://api.notion.com/v1"; // override only for tests
const VERSION = "2022-06-28";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function getToken() {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN is not set");
  return token;
}

export async function notion(path, { method = "GET", body, token = getToken() } = {}) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": VERSION,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 || res.status >= 500) {
      const wait = Number(res.headers.get("retry-after")) * 1000 || 1000 * 2 ** attempt;
      await sleep(wait);
      continue;
    }
    const json = await res.json();
    if (!res.ok) {
      const err = new Error(`Notion ${method} ${path} → ${res.status}: ${json.message}`);
      err.status = res.status;
      err.code = json.code;
      throw err;
    }
    return json;
  }
  throw new Error(`Notion ${method} ${path}: too many retries`);
}

/** Collect every page of a paginated endpoint. */
export async function paginate(path, { method = "GET", body = {} } = {}) {
  const results = [];
  let cursor;
  do {
    let json;
    if (method === "GET") {
      const sep = path.includes("?") ? "&" : "?";
      json = await notion(`${path}${sep}page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`);
    } else {
      json = await notion(path, {
        method,
        body: { ...body, page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) },
      });
    }
    results.push(...json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  return results;
}

/** Fetch a block's children recursively, attaching them as `children`. */
export async function getBlockTree(blockId) {
  const blocks = await paginate(`/blocks/${blockId}/children`);
  for (const block of blocks) {
    // child pages/databases are separate documents; don't inline them
    if (block.has_children && !["child_page", "child_database"].includes(block.type)) {
      block.children = await getBlockTree(block.id);
    }
  }
  return blocks;
}

/** Normalise a Notion page/database id from a URL or bare id to dashed form. */
export function toId(input) {
  if (!input) return input;
  const hex = input.replace(/-/g, "").match(/[0-9a-f]{32}/gi);
  if (!hex) return input;
  const h = hex[hex.length - 1].toLowerCase();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
