// Maps Notion blocks onto the portfolio's design language.
// The mapping follows docs/notion-porting-guide.md:
//
//   highest heading level used on the page  → Section eyebrow (h2, red line, UPPERCASE)
//   next heading level down                  → subsection heading (h3)
//   next one down                            → h4
//   paragraph                                → body paragraph
//   bulleted / numbered list                 → red-bullet list
//   image                                    → full-width figure + caption + lightbox
//   columns                                  → side-by-side (stacks on mobile)
//   callout                                  → stat callout ("+181% Uplift in Conversion")
//   quote                                    → pull quote
//   embed / video (Figma, Vimeo, YouTube…)   → responsive iframe
//   divider                                  → thin rule
//   toggle                                   → expandable <details>

import RichText, { plainText } from "./RichText";
import Figure from "./Figure";
import Section from "./Section";
import { slugify } from "@/lib/slugify";

const HEADINGS = ["heading_1", "heading_2", "heading_3"];
const LIST_TYPES = { bulleted_list_item: "ul", numbered_list_item: "ol", to_do: "ul" };

/** Split a page's top-level blocks into Sections using the relative heading rule. */
export function toSections(blocks = []) {
  const levels = blocks.filter((b) => HEADINGS.includes(b.type)).map((b) => HEADINGS.indexOf(b.type));
  const top = levels.length ? Math.min(...levels) : -1;
  const sections = [];
  let current = { title: "", id: null, blocks: [] };
  for (const b of blocks) {
    if (top >= 0 && b.type === HEADINGS[top]) {
      if (current.title || current.blocks.length) sections.push(current);
      const title = plainText(b[b.type].rich_text);
      current = { title, id: slugify(title), blocks: [] };
      // toggle headings keep their content as children
      if (b.children) current.blocks.push(...b.children);
    } else {
      current.blocks.push(b);
    }
  }
  if (current.title || current.blocks.length) sections.push(current);
  return { sections, topLevel: Math.max(top, 0) };
}

/** Render a page: sections with eyebrows, then their blocks. */
export function PageBlocks({ blocks }) {
  const { sections, topLevel } = toSections(blocks);
  return sections.map((s, i) => (
    <Section key={i} title={s.title} id={s.id} indent>
      <Blocks blocks={s.blocks} topLevel={topLevel} />
    </Section>
  ));
}

/** Render a list of blocks, grouping consecutive list items into <ul>/<ol>. */
export default function Blocks({ blocks = [], topLevel = 0 }) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const listTag = LIST_TYPES[b.type];
    if (listTag) {
      const items = [b];
      while (blocks[i + 1] && blocks[i + 1].type === b.type) items.push(blocks[++i]);
      const Tag = listTag;
      out.push(
        <Tag key={b.id || i} className={`list ${b.type === "to_do" ? "list--todo" : ""}`}>
          {items.map((it, j) => (
            <li key={it.id || j} className={it.to_do?.checked ? "is-checked" : undefined}>
              <RichText text={it[it.type].rich_text} />
              {it.children ? <Blocks blocks={it.children} topLevel={topLevel} /> : null}
            </li>
          ))}
        </Tag>
      );
      continue;
    }
    out.push(<Block key={b.id || i} block={b} topLevel={topLevel} />);
  }
  return out;
}

function Block({ block: b, topLevel }) {
  const data = b[b.type] || {};
  switch (b.type) {
    case "paragraph": {
      if (!data.rich_text?.length) return null; // empty Notion lines = spacing only
      return (
        <p className="body">
          <RichText text={data.rich_text} />
        </p>
      );
    }

    case "heading_1":
    case "heading_2":
    case "heading_3": {
      // relative: one level below the section eyebrow → h3, two below → h4
      const depth = HEADINGS.indexOf(b.type) - topLevel;
      const Tag = depth <= 1 ? "h3" : "h4";
      const title = plainText(data.rich_text);
      return (
        <>
          <Tag className={`subheading subheading--${Tag}`} id={slugify(title)}>
            <RichText text={data.rich_text} />
          </Tag>
          {b.children ? <Blocks blocks={b.children} topLevel={topLevel} /> : null}
        </>
      );
    }

    case "image": {
      const caption = data.caption?.length ? <RichText text={data.caption} /> : null;
      return (
        <Figure
          src={data.src}
          width={data.width}
          height={data.height}
          alt={plainText(data.caption) || ""}
          caption={caption}
        />
      );
    }

    case "column_list":
      return (
        <div className="columns" style={{ "--cols": b.children?.length || 2 }}>
          {(b.children || []).map((col, i) => (
            <div className="column" key={col.id || i}>
              <Blocks blocks={col.children} topLevel={topLevel} />
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <p className="stat">
          <RichText text={data.rich_text} />
        </p>
      );

    case "quote":
      return (
        <blockquote className="quote">
          <RichText text={data.rich_text} />
          {b.children ? <Blocks blocks={b.children} topLevel={topLevel} /> : null}
        </blockquote>
      );

    case "divider":
      return <hr className="rule" />;

    case "toggle":
      return (
        <details className="toggle">
          <summary>
            <RichText text={data.rich_text} />
          </summary>
          <Blocks blocks={b.children} topLevel={topLevel} />
        </details>
      );

    case "code":
      return (
        <pre className="code">
          <code>{plainText(data.rich_text)}</code>
        </pre>
      );

    case "video":
    case "embed":
    case "pdf": {
      const url = data.src || data.external?.url || data.file?.url || data.url;
      if (!url) return null;
      const caption = data.caption?.length ? <RichText text={data.caption} /> : null;
      if (b.type === "video" && /\.(mp4|webm|mov)(\?|$)/i.test(url)) {
        return (
          <figure className="figure">
            <video src={url} controls playsInline preload="metadata" />
            {caption ? <figcaption>{caption}</figcaption> : null}
          </figure>
        );
      }
      return <Embed url={url} caption={caption} />;
    }

    case "bookmark":
    case "link_preview":
      return (
        <p className="body">
          <a className="text-link" href={data.url} target="_blank" rel="noreferrer">
            {data.caption?.length ? plainText(data.caption) : data.url}
          </a>
        </p>
      );

    case "table":
      return (
        <div className="table-wrap">
          <table className="table">
            <tbody>
              {(b.children || []).map((row, i) => {
                const Cell = (data.has_column_header && i === 0) ? "th" : "td";
                return (
                  <tr key={row.id || i}>
                    {row.table_row.cells.map((cell, j) => (
                      <Cell key={j}>
                        <RichText text={cell} />
                      </Cell>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    case "synced_block":
    case "column":
      return <Blocks blocks={b.children} topLevel={topLevel} />;

    default:
      // child_page, child_database, unsupported… are skipped on purpose
      return null;
  }
}

// ---------------------------------------------------------------------------

export function embedUrl(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" && u.searchParams.get("v")) return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    if (host === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (host === "vimeo.com" && /^\/\d+/.test(u.pathname)) return `https://player.vimeo.com/video${u.pathname}`;
    if (host === "figma.com" && !u.pathname.startsWith("/embed"))
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    if (host === "loom.com" && u.pathname.startsWith("/share/")) return url.replace("/share/", "/embed/");
    return url;
  } catch {
    return url;
  }
}

function Embed({ url, caption }) {
  const src = embedUrl(url);
  const isFigma = /figma\.com/.test(src);
  return (
    <figure className="figure">
      <div className={`embed ${isFigma ? "embed--figma" : ""}`}>
        <iframe src={src} title={caption ? "Embedded media" : src} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
