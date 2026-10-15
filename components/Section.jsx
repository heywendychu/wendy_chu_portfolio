// A page section with the red-line, uppercase mono "eyebrow" title (an <h2>).
export default function Section({ title, id, indent = false, className = "", children }) {
  return (
    <section className={`section ${indent ? "section--indent" : ""} ${className}`} id={id || undefined}>
      {title ? (
        <h2 className="eyebrow">
          <span className="eyebrow__line" aria-hidden="true" />
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
