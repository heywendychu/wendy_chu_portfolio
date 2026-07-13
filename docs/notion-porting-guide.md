# Porting a Notion case study into this portfolio

This is the canonical, living guide for turning a public Notion page into a
project page on this site, consistently with what already exists. **Keep it up
to date: whenever we make a new convention or change an existing one, edit this
file in the same change.**

Related docs:
- `docs/allbirds-heading-wiring.md` — the first port (Allbirds PDP) and the
  heading-normalization pass; useful as a worked example + revert log.
- `scripts/notion_extract.py` — reusable extractor (below).

---

## 1. Extract the Notion content

Notion pages are client-rendered — fetching the HTML (WebFetch/curl) returns
nothing. Use the extractor, which calls Notion's unofficial `loadPageChunk`
API and prints the ordered outline + downloadable image URLs:

```bash
python3 scripts/notion_extract.py <notion-url-or-page-id>
```

Under the hood (documented in case the script needs changing):
- **Endpoint:** `POST https://<subdomain>.notion.site/api/v3/loadPageChunk`
  with JSON body `{"pageId":"<dashed-uuid>","limit":200,"cursor":{"stack":[]},
  "chunkNumber":0,"verticalColumns":false}`.
- **Page id:** the trailing 32 hex chars of the URL, re-dashed `8-4-4-4-12`.
- **Rich text:** `properties.title` is a list of `[text, [annotations]]`;
  annotation `["b"]`=bold, `["i"]`=italic, `["a", url]`=link.
- **Images:** `properties.source` is `attachment:<id>:<file>`. The public URL is
  `https://<subdomain>.notion.site/image/<url-encoded-source>?table=block&id=<blockId>&cache=v2`.

If a page is very long (>~200 blocks) it may paginate; `loadPageChunk` returns a
`cursor` to fetch the next chunk. Extend the script if we hit that.

## 2. Download images

Create `public/images/<ProjectName>/` and download each image from the URL
table the extractor prints. Use **descriptive kebab-case names** (not Notion's
hashes), e.g. `old-size-selection.png`, `final-product-details.png`. Verify they
are real images (`file public/images/<ProjectName>/*`) — a bad URL yields an
HTML error body, not a PNG.

```bash
mkdir -p public/images/<ProjectName>
curl -s -L -A "Mozilla/5.0" "<image-url>" -o public/images/<ProjectName>/<name>.png
```

## 3. Build the project file

Create `src/<ProjectName>.js` exporting a single JSX const, modeled on
`src/AllbirdsPDP.js` (the cleanest current example) or `src/AccessManagement.js`.
Copy the standard styled components from one of those files: `Container`, `P`,
`Ul`/`Ol`, `Li`, `B` (and `TwoCol`/`Col`, `StatCallout` if needed).

### Block → component mapping

| Notion block | Port to |
|---|---|
| page title | `ProjectHeader` (see metadata note) — the page `<h1>` |
| top-level structural sections | `Section title="…"` (red-line uppercase eyebrow, `<h2>`) |
| subsection labels within a section | `<Heading level={3}>` |
| deeper nested subheadings | `<Heading level={4}>` (reserved; unused so far) |
| paragraph (`text`) | `<P>` |
| bulleted_list / numbered_list | `<Ul><Li>…` (see list note) |
| image | `<ImageGroup desktop="…" caption="…" />` |
| column_list / column (side-by-side) | `TwoCol` + `Col` wrapping `ImageGroup`s (local to AllbirdsPDP) |
| inline link | `<SpanLink href="…">` |
| Figma / video embed | `<iframe …>` (see AccessManagement / Primary Nav) |
| key result metric | `<StatCallout>` (non-heading; local to AllbirdsPDP) |

### The heading rule (important — this is our convention)

The mapping is **role-based and relative**, not a mechanical 1:1 with Notion's
heading types:

- The **highest** heading level actually used in the doc becomes the site's
  `Section` eyebrows (the primary structural divider, rendered `<h2>`,
  auto-UPPERCASED). In the Allbirds doc that was Notion `sub_header`.
- The **next level down** — whether it's a real Notion heading *or* a bold-only
  paragraph acting as a label — becomes `<Heading level={3}>`.
- One level deeper → `<Heading level={4}>`.
- This keeps a clean `h1 → h2 → h3` outline with **no skipped levels** (a WCAG /
  screen-reader requirement). Do not jump from a `Section` straight to `h4`.

### Keep these as-is (not headings)

- **Inline bold run-in leads** — `<P><B>label:</B> …continuing sentence</P>` —
  stay as bold paragraphs. They're emphasis, and a run-in lead is a legitimate
  readable pattern. Converting them breaks prose. (Examples across the site:
  "New customers:", "Research:", etc.)
- **Sentences that introduce a list** (e.g. "The previous size selection had
  several issues:") stay as `<P><B>…</B></P>`.

### Lists

The site renders **both** bulleted and numbered lists as red bullets — `Ul`,
`Ol`, and `Li` are all styled with a red `•` via `::before` and no real numeric
counter. So a Notion `numbered_list` becomes `<Ul>`; if you need visible
numbers, prefix the text ("1. …") or add a real ordered style (none exists yet).

### Metrics / StatCallout

Standout result numbers (e.g. "+181% Uplift in Conversion") are values, not
outline headings — use `StatCallout` (a `<p>`, CanelaWeb 32px). It currently
carries **no color** by decision (see decisions log). It lives locally in
`AllbirdsPDP.js`; **if a second project needs it, promote it to
`src/UserInterface/StatCallout.js`** and import it (same for `TwoCol`/`Col`).

### ProjectHeader metadata

Notion docs usually have no metadata block, so fill these by hand:
`company`, `date`, `title`, `responsibilities`, `roleSummary`, `pictureFile`
(a hero image from the set), `alt`, `caption`. Don't invent a `date` — leave it
`""` if unknown and confirm with the owner.

## 4. Register the project

1. **`src/Templates/Project.js`** — `import { <Name> } from "../<Name>";` and add
   `{ route: "<kebab-route>", content: <Name> }` to the `data` array.
2. **`src/Templates/Landing.js`** — add a `<ProjectLink text="…" route="…" />`
   under the right `<Company>` in the WORK section. **New company →** add a new
   `<Company title="…">` block.
3. **`src/Templates/Project.js` footer** — add/append a
   `<Company title="More from <Company>:" footer={true}>` block with the
   `ProjectLink`(s) so cross-links appear at the bottom of project pages.

## 5. Verify

- Fast compile check (no full build needed):
  ```bash
  NODE_ENV=development node -e "require('@babel/core').transformFileSync('src/<Name>.js',{presets:['react-app']})"
  ```
- The dev server runs at `localhost:3000`; view the page at
  `localhost:3000/projects/<route>`. Check desktop + mobile (768px breakpoint),
  image lightbox/zoom, and links.

---

## Conventions & decisions log

Newest at the bottom. Record the rule **and** the reason so future-us doesn't
re-litigate it.

- **Heading scheme:** `h1` = ProjectHeader title, `h2` = `Section` eyebrow,
  `h3` = all subsection labels (one flat tier), `h4` = reserved. Never skip
  levels. — accessibility (no skipped headings) + one consistent subsection
  treatment across projects.
- **Inline bold run-in leads stay `<P><B>…</B></P>`.** — they're emphasis, not
  outline nodes; converting hurts readability.
- **Numbered lists render as bullets** (no real ordered styling exists). — the
  existing `Ol` is a bullet list; matches site visual language.
- **Section titles are auto-UPPERCASED** by `Section`. — matches every existing
  section (OBJECTIVES, BACKGROUND, …).
- **Result metrics use `StatCallout`, currently with no color.** — a metric is a
  value, not a heading; color treatment deferred pending a design decision.
- **`StatCallout`, `TwoCol`, `Col` are local to `AllbirdsPDP.js` for now;**
  promote to `src/UserInterface/` on first reuse.
- **Images: `public/images/<Project>/`, descriptive kebab-case names.**
- **Don't invent `ProjectHeader` `date`;** leave blank and confirm with owner.
