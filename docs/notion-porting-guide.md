# Writing case studies in Notion

Case studies are no longer ported by hand. Every build reads them straight from
the **Portfolio projects** Notion database (`scripts/sync-notion.mjs`) and renders
them with `components/Blocks.jsx`. This guide covers the conventions that mapping
follows. Setup and the day-to-day workflow are in `docs/notion-setup.md`.

**Keep it up to date: whenever we make a new convention or change an existing one,
edit this file in the same change.**

## Block → design mapping (implemented in `components/Blocks.jsx`)

| Notion block | Renders as |
|---|---|
| page **Name** + properties | Project header: company \| date, `h1` title, responsibilities, role summary, cover |
| highest heading level used on the page | Section eyebrow (`h2`, red line, auto-UPPERCASE) |
| next heading level down | `h3` subsection heading |
| one more level down | `h4` |
| text | body paragraph |
| bulleted / numbered list | red-bullet list (nests) |
| image | full-width figure; caption = caption + alt text; lightbox zoom |
| columns | side-by-side, stacks below 768px |
| callout | `StatCallout` (CanelaWeb 32px, a `<p>`, not a heading) |
| quote | pull quote |
| embed / video | responsive iframe (Figma 4:3, others 16:9); share links auto-converted |
| divider | rule |
| toggle | `<details>` |
| link / @-mention of another project page | `/projects/<slug>` |

### The heading rule (important — this is our convention)

The mapping is **role-based and relative**, not a mechanical 1:1 with Notion's
heading types. Whatever the highest heading level on the page is, it becomes the
section eyebrows, and the levels below it step down from there. This keeps a clean
`h1 → h2 → h3` outline with **no skipped levels** (a WCAG / screen-reader
requirement), no matter whether you wrote the case study with Heading 1s or
Heading 2s as the top level.

### Keep these as text (not headings)

- **Inline bold run-in leads**: "**Research:** we interviewed…" stays a bold run-in
  inside the paragraph. It's emphasis, not an outline node.
- **Sentences that introduce a list** ("The previous size selection had several
  issues:") stay bold paragraphs.

### Metadata

Fill the database properties; don't put metadata in the page body. Don't invent a
**Date**. Leave it blank if unknown.

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
- **Images (v1): `public/images/<Project>/`, descriptive kebab-case names.** Still served for migrated content.
- **Don't invent `ProjectHeader` `date`;** leave blank and confirm with owner.

- **(v2) Content lives in Notion; the site is a static Next.js export on Netlify.**
  — editing a case study shouldn't need code. Builds pull from Notion, so a broken
  Notion response fails the build and the last good deploy stays live.
- **(v2) Images are downloaded at build time into `public/notion/`, resized to
  ≤2400px WebP (GIFs/SVGs untouched).** — Notion file URLs expire after an hour;
  originals were up to 2.5MB each.
- **(v2) Image caption doubles as alt text.** — Notion has no alt field for images.
- **(v2) Mobile-only image variants (`ImageGroup mobile=`) are dropped;** the
  desktop image is shown at all sizes. — only two existed, and Notion has no
  per-breakpoint images.
- **(v2) Client-side page passwords removed.** — they weren't real security (the
  content shipped in the JS bundle). Unpublished = not built at all.
- **(v2) Slugs kept identical to the old routes** (`/projects/allbirds-pdp`, …) so
  existing links keep working.
