# Running the site from Notion

The site's content lives in Notion. Every Netlify build pulls it in, turns it into
static pages, and publishes them. Nothing about a case study lives in code any more.

```
Notion  ──(build: scripts/sync-notion.mjs)──▶  content/*.json + public/notion/*  ──(next build)──▶  out/  ──▶  Netlify
```

## Day to day

| I want to… | Do this in Notion |
|---|---|
| Edit a case study | Open its page in **Portfolio projects** and edit it like any doc. |
| Add a case study | Add a row to **Portfolio projects** (fill **Name**, **Company**, **Order**). Write the case study in the page body. Tick **Published** when it's ready. |
| Hide a case study | Untick **Published**. |
| Reorder the work list | Change **Order** (lower numbers first). Companies appear in the order of their first project. |
| Link to a case study hosted elsewhere | Fill **External URL**. The page body is ignored and the link opens in a new tab. |
| Change About / Contact | Edit the **Portfolio home** page. |

Then publish:

- **Right away:** open your publish link, `https://wendychu.design/publish?key=…`. Bookmark it, or paste it at the top of the Portfolio home page. The changes go live in about 2 minutes.
- **Automatically:** the site also rebuilds every night, so any edits you forget to publish go live by the next morning.

If a build fails (for example, Notion is down), Netlify keeps the previous version
of the site live.

### Writing a case study

Write normally in Notion. The site maps Notion blocks onto the portfolio's styles:

| In Notion | On the site |
|---|---|
| Biggest heading you use (usually **Heading 1**) | Red-line uppercase section label (OBJECTIVES, RESEARCH, …) |
| Next heading down (**Heading 2**) | Bold subsection heading |
| Next one down (**Heading 3**) | Smaller subsection heading |
| Text | Body paragraph. **Bold**, *italic* and links all work. |
| Bulleted or numbered list | Red-bullet list (indent to nest) |
| Image (upload or paste) | Full-width image. The image **caption** becomes the caption *and* the alt text. Click to zoom. |
| Columns (drag blocks side by side) | Side-by-side images or text. Stacks on mobile. |
| Callout | Big stat line, like "+181% Uplift in Conversion" |
| Quote | Pull quote |
| Embed / video (Figma, Vimeo, YouTube, Loom) | Responsive embedded player. Paste the normal share link. |
| Divider | Thin rule |
| Toggle | Expandable section |
| Link to another case study page (@-mention or link) | Link to that case study on the site |

Anything before the first heading shows up as an intro with no section label.

### Project properties

| Property | Used for |
|---|---|
| Name | Page title (the big serif headline) |
| Published | Only ticked projects are built |
| Company | Groups the work list ("VTS", "Allbirds", …) and appears above the title |
| Menu label | Short name in the work list. Defaults to **Name**. |
| Order | Sort order. Lower numbers come first. |
| Slug | The URL, `/projects/<slug>`. Defaults to the name. **Keep existing slugs unchanged** so old links keep working. |
| Date | Shown next to the company ("Primary.com \| May 2019") |
| Responsibilities | "Responsibilities: …" line |
| Role summary | Paragraph under the title. Also used as the Google/LinkedIn description. |
| Cover | Hero image at the top |
| Cover alt / Cover caption | Hero image alt text and caption |
| External URL | Makes the row a link instead of a page |
| Description | Optional custom Google/LinkedIn description |

### Portfolio home page

- Each **Heading 1** is a section: "About me", "Work", "Contact". The nav links come from these headings.
- In **About me**, the first **Heading 2** is the big "Hi, I'm Wendy Chu." headline, and the first image is your portrait.
- **Work** is filled in automatically from the database. Text you put under it shows above the list.

---

## One-time setup (about 15 minutes)

### 1. Create a Notion integration

1. Go to <https://www.notion.so/profile/integrations> and click **New integration**.
2. Name it "Portfolio site", choose your workspace, and set the type to **Internal**.
3. Under **Capabilities**, keep **Read content**. Also tick **Insert content** and **Update content**; the migration in step 2 needs them. You can untick both afterwards.
4. Copy the **Internal Integration Secret**. This is your `NOTION_TOKEN`.

### 2. Move the existing case studies into Notion

1. In Notion, create an empty page called **Portfolio**.
2. Open its **•••** menu, choose **Connections**, and add **Portfolio site**.
3. Copy the page's link. This is your `NOTION_PARENT_PAGE_ID`.
4. In the repo, run:

   ```bash
   npm install
   NOTION_TOKEN=secret_xxx NOTION_PARENT_PAGE_ID=<link> npm run migrate:push
   ```

The script creates the **Portfolio projects** database (one page per case study, with
all images uploaded) and the **Portfolio home** page inside **Portfolio**. It then
prints `NOTION_DATABASE_ID` and `NOTION_HOME_PAGE_ID` and saves both to `.env.local`.

Run it only once; running it again creates duplicates. The Ralph Lauren pages and the
VTS Mobile Access page come across unpublished, because the old site didn't link them.
Their old passwords aren't carried over. Tick **Published** to make one live.

**Market Listing Share** comes across as an External URL row that points at its
public Notion page. To host it on the site like the others, open that page's **•••**
menu, choose **Move to → Portfolio projects**, then fill in its properties and clear
**External URL**.

### 3. Netlify

In **Site configuration → Build & deploy**:

- Set **Branch to deploy** to whichever branch has this code.
- The build command and publish directory come from `netlify.toml`; you don't need to set them.
- Under **Build hooks**, add a hook named "Notion" and copy its URL.

In **Site configuration → Environment variables**, add:

| Key | Value |
|---|---|
| `NOTION_TOKEN` | the integration secret |
| `NOTION_DATABASE_ID` | printed by the migration |
| `NOTION_HOME_PAGE_ID` | printed by the migration |
| `NETLIFY_BUILD_HOOK` | the build hook URL |
| `PUBLISH_KEY` | any long random string, e.g. from `openssl rand -hex 16` |

Then trigger a deploy. Your publish link is
`https://wendychu.design/publish?key=<PUBLISH_KEY>`.

### 4. Tidy up (optional)

- After you've checked the migrated pages, delete `legacy/` and the migration script.
- In the integration settings, untick **Insert/Update content** so the site only ever reads.

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # paste in the token + ids
npm run sync                       # pull from Notion into content/
npm run dev                        # http://localhost:3000
```

- Run `npm run sync` again after editing in Notion.
- `NOTION_INCLUDE_DRAFTS=1 npm run sync` also pulls unpublished projects, so you can preview them locally.
- Without `NOTION_TOKEN`, everything builds from the snapshot committed in `content/`.
- `npm run build` writes the static site to `out/`.

### Files

| Path | What it is |
|---|---|
| `scripts/sync-notion.mjs` | Pulls Notion → `content/` and downloads images into `public/notion/` (resized to WebP) |
| `components/Blocks.jsx` | The Notion-block → design mapping in the table above |
| `app/` | Pages: home, `/projects/[slug]`, 404 |
| `app/globals.css` | All styles and design tokens |
| `netlify/functions/` | The `/publish` link and the nightly rebuild |
| `content/` | Content snapshot (overwritten on every Netlify build) |
| `legacy/` | The old Create React App source, kept only for the migration |
