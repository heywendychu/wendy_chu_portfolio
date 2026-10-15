#!/usr/bin/env python3
"""
Extract a public Notion page for porting into this portfolio.

Notion pages are client-rendered, so a plain fetch (WebFetch/curl of the HTML)
returns nothing useful. This uses Notion's unofficial `loadPageChunk` API to
pull the block tree, then prints:
  1. the document outline (block type + text/image, in order), and
  2. a table of images with ready-to-download public URLs.

Usage:
    python3 scripts/notion_extract.py <notion-url-or-page-id>

Example:
    python3 scripts/notion_extract.py \\
      https://wendychu.notion.site/Allbirds-PDP-Updates-374a83b969a080a994b6d34bc1f8f4ac

See docs/notion-porting-guide.md for the full workflow.
"""
import json
import re
import sys
import urllib.parse
import urllib.request

DEFAULT_SUBDOMAIN = "wendychu"


def parse_target(arg):
    """Return (subdomain, dashed-uuid) from a Notion URL or a bare page id."""
    subdomain = DEFAULT_SUBDOMAIN
    m = re.search(r"https?://([^.]+)\.notion\.site", arg)
    if m:
        subdomain = m.group(1)
    # the page id is the last 32 hex chars in the string
    hexid = re.findall(r"[0-9a-fA-F]{32}", arg.replace("-", ""))
    if not hexid:
        sys.exit("Could not find a 32-char page id in: " + arg)
    h = hexid[-1].lower()
    dashed = f"{h[0:8]}-{h[8:12]}-{h[12:16]}-{h[16:20]}-{h[20:32]}"
    return subdomain, dashed


def load_chunk(subdomain, page_id):
    url = f"https://{subdomain}.notion.site/api/v3/loadPageChunk"
    body = json.dumps({
        "pageId": page_id,
        "limit": 200,
        "cursor": {"stack": []},
        "chunkNumber": 0,
        "verticalColumns": False,
    }).encode()
    req = urllib.request.Request(
        url, data=body,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
    )
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def rich(title):
    """Render Notion rich-text array to markdown-ish text with **bold**/_italic_/links."""
    if not title:
        return ""
    out = []
    for seg in title:
        txt = seg[0]
        anns = seg[1] if len(seg) > 1 else []
        bold = any(a[0] == "b" for a in anns)
        ital = any(a[0] == "i" for a in anns)
        link = next((a[1] for a in anns if a[0] == "a"), None)
        s = txt
        if bold:
            s = f"**{s}**"
        if ital:
            s = f"_{s}_"
        if link:
            s = f"[{s}]({link})"
        out.append(s)
    return "".join(out)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    subdomain, page_id = parse_target(sys.argv[1])
    data = load_chunk(subdomain, page_id)
    blocks = data["recordMap"]["block"]

    def val(bid):
        b = blocks.get(bid) or {}
        v = b.get("value")
        return (v or {}).get("value")

    images = []

    def walk(bid, depth=0):
        v = val(bid)
        if not v:
            print("  " * depth + f"[MISSING {bid}]")
            return
        t = v.get("type")
        ind = "  " * depth
        props = v.get("properties") or {}
        if t == "image":
            src = props.get("source", [[None]])[0][0]
            cap = rich(props.get("caption"))
            n = len(images) + 1
            images.append((n, bid, src))
            print(f"{ind}[IMAGE #{n}] {src}")
            if cap:
                print(f"{ind}   caption: {cap}")
        else:
            print(f"{ind}<{t}> {rich(props.get('title'))}")
        for c in v.get("content", []):
            walk(c, depth + 1)

    print("===== DOCUMENT OUTLINE =====")
    walk(page_id)

    print("\n===== IMAGES (download these into public/images/<Project>/) =====")
    for n, bid, src in images:
        enc = urllib.parse.quote(src, safe="")
        img_url = (
            f"https://{subdomain}.notion.site/image/{enc}"
            f"?table=block&id={bid}&cache=v2"
        )
        print(f"#{n}\t{img_url}")


if __name__ == "__main__":
    main()
