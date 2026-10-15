// Renders a Notion rich_text array: bold, italic, underline, strikethrough, code, links.

const isExternal = (href) => /^https?:\/\//.test(href) && !href.startsWith("https://wendychu.design");

export function plainText(rt = []) {
  return rt.map((t) => t.plain_text ?? t.text?.content ?? "").join("");
}

function Segment({ t }) {
  let node = t.plain_text ?? t.text?.content ?? "";
  // soft line breaks inside a Notion text block
  if (node.includes("\n")) {
    const parts = node.split("\n");
    node = parts.flatMap((p, i) => (i === 0 ? [p] : [<br key={i} />, p]));
  }
  const a = t.annotations || {};
  if (a.code) node = <code>{node}</code>;
  if (a.bold) node = <strong>{node}</strong>;
  if (a.italic) node = <em>{node}</em>;
  if (a.underline) node = <u>{node}</u>;
  if (a.strikethrough) node = <s>{node}</s>;

  const href = t.href || t.text?.link?.url;
  if (href) {
    const ext = isExternal(href);
    node = (
      <a className="text-link" href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}>
        {node}
      </a>
    );
  }
  return node;
}

export default function RichText({ text = [] }) {
  return text.map((t, i) => <Segment key={i} t={t} />);
}
