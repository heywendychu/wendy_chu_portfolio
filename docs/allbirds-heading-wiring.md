# Heading component wiring (revert notes)

Trial of `src/UserInterface/Heading.js` across the case studies. Standalone
bold-paragraph pseudo-headings (`<P><B>…</B></P>`) were replaced with semantic
`<Heading level={3}>` elements. **These notes exist so the change can be
reverted cleanly if we don't like it.**

## Heading scheme used

| Tier | Rendered as | Source |
|------|-------------|--------|
| Page title | `<h1>` (CanelaWeb 56px) | `ProjectHeader` — unchanged |
| Section eyebrow | `<h2>` (red line + uppercase mono) | `Section` title — unchanged |
| Subsection label | `<h3>` (Noto Sans 20px/600) | **new** `Heading level={3}` |
| (reserved) sub-sub | `<h4>` | `Heading level={4}` — unused, kept for future |

`level={3}` (not 4) was chosen deliberately: these labels sit directly under a
`Section` (`<h2>`), so `<h3>` keeps a clean `h1 → h2 → h3` outline. Jumping to
`<h4>` would skip a level (a WCAG / screen-reader anti-pattern).

## Files + conversions

Each file also gained `import Heading from ".../UserInterface/Heading";`.

- **`src/AllbirdsPDP.js`** — 7 subsection labels as `<Heading level={3}>`.
  (Originally 9, wired as a mix of `level={3}`/`level={4}`; the `level={4}` ones
  were realigned to `level={3}`, then the two "+X% Uplift in Conversion" lines
  were moved to `StatCallout` — see "Metric callouts" below.)
- **`src/Templates/Project.js`** — 14 labels: Primary Nav process steps
  ("1. Research", "2. Design", "3. Build", "4. Test"), Primary PDP process steps
  ("1. Research", "2. Design", "3. Prioritize", "4. Build", "5. Test"), and the
  Primary Style Guide steps ("1. Understanding the Problem", "2. Research",
  "3. Design", "4. Test", "5. Iterate" — see "Style Guide steps" below).
- **`src/AccessManagement.js`** — 5 labels: "The scope I worked on:",
  "Property manager", "Security personnel", "Company access admin", "Employee".
- **`src/MobileAccess.js`** — same 5 labels (mirror of AccessManagement; not
  currently linked in the nav).

Total: 31 `<Heading level={3}>` across the four files.

## Style Guide steps (was: "known inconsistency")

The Primary Style Guide previously ran its process steps inline
(`<P><B>1. Understanding the Problem:</B> …explanation</P>`), unlike Nav/PDP.
Each was split into a standalone `<Heading level={3}>` (colon dropped, to match
Nav/PDP) followed by the explanation in its own `<P>`. All three Primary case
studies now present their process identically.

## Metric callouts (StatCallout)

The two Allbirds "+X% Uplift in Conversion" lines are results/values, not
outline headings, so they were moved from `<Heading>` to a local `StatCallout`
styled component (a `<p>`, CanelaWeb 32px). **No color was applied** — treatment
is intentionally minimal pending a later decision. To revert, turn each
`<StatCallout>…</StatCallout>` back into `<P><B>…</B></P>` (or `<Heading level={3}>`)
and remove the `StatCallout` styled component.

## What did NOT change (intentionally)

- **Section eyebrows** (OBJECTIVES, BACKGROUND, "Improved size selection", …)
  stay as the section-level `<h2>`.
- **Inline bold run-in lead-ins** — `<P><B>label:</B> …continuing sentence</P>`
  — were left as-is. They are emphasis, not headings, and a run-in lead-in is a
  legitimate, readable editorial pattern. Converting them would break prose.
  Examples left untouched:
  - Ralph Lauren: "Research:", "Design:", "Results:"
  - VTS: "New customers:", "Existing customers:", "Potential network effects"
- Two Allbirds list lead-in sentences kept as `<P><B>…</B></P>` (they introduce
  a list, not a section): "The previous size selection had several issues…",
  "I addressed the issues with the design below:".

## How to revert

- Cleanest: `git checkout <files>` (if uncommitted) or revert the wiring commit.
- Manual: remove the `Heading` import from each file and turn every
  `<Heading level={3}>X</Heading>` back into `<P><B>X</B></P>`. The component
  file `src/UserInterface/Heading.js` is standalone scaffolding and can stay.
