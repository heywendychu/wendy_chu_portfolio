import Link from "next/link";

// Home page work list: one row per project with a framed thumbnail.
// The thumbnail is the Notion "Homepage image" (or the cover if that's empty),
// cropped from the "Image position" (Top / Center / Bottom). "Transparent background"
// drops the white box so a cut-out image (e.g. a laptop mockup) sits straight on the peach.
function Thumb({ project }) {
  const img = project.homeImage || project.cover;
  return (
    <div className={`fw__img ${project.imageTransparent ? "fw__img--clear" : ""}`} aria-hidden="true">
      {img?.src ? (
        <div className="fw__panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: `center ${project.imagePosition || "top"}` }}
          />
        </div>
      ) : null}
    </div>
  );
}

function Row({ project }) {
  const body = (
    <>
      <Thumb project={project} />
      <div className="fw__text">
        <p className="fw__co">{project.company}</p>
        <h3 className="fw__title">
          <span>{project.menuLabel}</span>
          {project.externalUrl ? <span className="fw__ext" aria-label="(opens in a new tab)">↗</span> : null}
        </h3>
        {project.outcome ? <p className="fw__outcome">{project.outcome}</p> : null}
        {project.skills?.length ? (
          <ul className="fw__tags">
            {project.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
  return (
    <li>
      {project.externalUrl ? (
        <a className="fw__row" href={project.externalUrl} target="_blank" rel="noreferrer">{body}</a>
      ) : (
        <Link className="fw__row" href={`/projects/${project.slug}`}>{body}</Link>
      )}
    </li>
  );
}

export default function FeaturedWork({ projects }) {
  return (
    <ul className="fw">
      {projects.map((p) => (
        <Row key={p.slug} project={p} />
      ))}
    </ul>
  );
}
