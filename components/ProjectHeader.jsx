import Figure from "./Figure";

export default function ProjectHeader({ project }) {
  const { company, date, title, responsibilities, roleSummary, cover } = project;
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
      {cover ? (
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
