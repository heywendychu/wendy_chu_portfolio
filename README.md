# wendychu.design

Wendy Chu's portfolio. It's a static Next.js site whose content comes from Notion
and is deployed on Netlify.

- **Editing content:** do it in Notion, then open the publish link. See [docs/notion-setup.md](docs/notion-setup.md).
- **How Notion blocks map to the design:** see [docs/notion-porting-guide.md](docs/notion-porting-guide.md).

```bash
npm install
npm run dev        # http://localhost:3000 (uses content/ snapshot, or Notion after `npm run sync`)
npm run build      # sync from Notion (if NOTION_TOKEN is set) + static export to out/
```
