import Figure from "./Figure";

export default function ProjectHeader({ project }) {
  const { company, date, title, responsibilities, roleSummary, cover, covers } = project;
  return (
    <header className="project-header">
      <span className="project-header__line" aria-hidden="true" />
      <p className="project-header__meta">
        {company}
        {date ? ` | ${date}` : null}
      </p>
      <h1 className="display">{title}</h1>
      {responsibilities ? (
        <p className="project-header__detail">
          <span className="project-header__label">Responsibilities:</span> {responsibilities}
        </p>
      ) : null}
      {roleSummary ? <p className="project-header__detail">{roleSummary}</p> : null}
      {covers?.length > 1 ? (
        // Several cover images: one row, all the same height (each takes width in proportion to its shape).
        <div className="cover-row">
          {covers.map((c, i) => (
            <Figure
              key={c.src}
              className="cover-row__item"
              style={{ "--ar": c.width && c.height ? c.width / c.height : 1 }}
              src={c.src}
              width={c.width}
              height={c.height}
              alt={c.alt}
              caption={c.caption}
              priority={i === 0}
            />
          ))}
        </div>
      ) : cover ? (
        <Figure
          className="figure--hero"
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt}
          caption={cover.caption}
          priority
        />
      ) : null}
    </header>
  );
}
