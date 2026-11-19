import Link from "next/link";

// Home page work list: one row per project with a framed thumbnail.
// The thumbnail is the Notion "Homepage image" (or the cover if that's empty),
// cropped from the "Image position" (Top / Center / Bottom). "Transparent background"
// drops the white box so a cut-out image (e.g. a laptop mockup) sits straight on the peach.
function Thumb({ project }) {
  const img = project.homeImage || project.cover;
  // Cut-out images show their full width (same side padding as the others) and are pushed down
  // so about 12% of the image runs off the bottom of the frame, like the screenshots do.
  let panelStyle;
  let imgStyle = { objectPosition: `center ${project.imagePosition || "top"}` };
  const crop = project.imageCrop;
  if (crop) {
    // Set by eye on the review page: exact size and position inside the frame.
    imgStyle = { position: "absolute", width: `${crop.zoom}%`, height: "auto", left: `${crop.x}%`, top: `${crop.y}%`, maxWidth: "none", objectFit: "initial" };
  } else if (project.imageTransparent && img?.width && img?.height) {
    const heightPct = (84 * 1.6 * img.height) / img.width; // image height as % of the 16:10 frame
    panelStyle = { top: `${Math.max(8, 100 - heightPct * 0.88).toFixed(1)}%` };
  }
  return (
    <div className={`fw__img ${project.imageTransparent ? "fw__img--clear" : ""}`} aria-hidden="true">
      {img?.src ? (
        <div className="fw__panel" style={panelStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            style={imgStyle}
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
