import Link from "next/link";

// Home page work list: one tile per project, alternating sides.
// Text (from Figma "Project Tile"): company, the project name as the headline, the Outcome,
// up to 3 Skills tags and READ MORE with Wendy's arrow. The picture: Notion "Homepage image"
// (or the cover) in a rectangle frame. (The leaf version is in git history and lib/leaf.js.)
// Which line is the big headline: the project name (Menu label) with the Outcome under it,
// or flip to true for the Outcome as the headline with the project name under it.
const HEADLINE_IS_OUTCOME = false;

const Arrow = () => (
  <svg className="lf__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M0 3.367V2.132H7.592L5.863 0H7.423L9.659 2.756L7.423 5.499H5.863L7.605 3.367H0Z" fill="currentColor" />
  </svg>
);

// Rectangle thumbnail (design review B7): rounded peach frame, square screenshot inset 8% left,
// right and top, running off the bottom. "Transparent background" drops the white box.
// "Image zoom / x / y" (from the review page's Thumbnails tab) are % of the inner panel.
function Thumb({ project }) {
  const img = project.homeImage || project.cover;
  let panelStyle;
  let imgStyle = { objectPosition: `center ${project.imagePosition || "top"}` };
  const crop = project.imageCrop;
  // An exact crop may run into the side margins, out to the frame's edges (the frame clips it there);
  // the top still starts at the panel's top edge.
  if (crop) {
    imgStyle = { position: "absolute", width: `${crop.zoom}%`, height: "auto", left: `${crop.x}%`, top: `${crop.y}%`, maxWidth: "none", objectFit: "initial" };
  } else if (project.imageTransparent && img?.width && img?.height) {
    const heightPct = (84 * 1.6 * img.height) / img.width; // image height as % of the 16:10 frame
    panelStyle = { top: `${Math.max(8, 100 - heightPct * 0.88).toFixed(1)}%` };
  }
  return (
    <div className={`fw__img${project.imageTransparent ? " fw__img--clear" : ""}${crop ? " fw__img--crop" : ""}`} aria-hidden="true">
      {img?.src ? (
        <div className="fw__panel" style={panelStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt="" width={img.width} height={img.height} loading="lazy" decoding="async" style={imgStyle} />
        </div>
      ) : null}
    </div>
  );
}

function Tile({ project, flip }) {
  const body = (
    <>
      <div className="lf__text">
        <p className="lf__co">{project.company}</p>
        <h3 className="lf__h"><span className="lf__hl">{HEADLINE_IS_OUTCOME ? project.outcome || project.menuLabel : project.menuLabel}</span></h3>
        {project.outcome ? <p className="lf__sub">{HEADLINE_IS_OUTCOME ? project.menuLabel : project.outcome}</p> : null}
        {project.skills?.length ? (
          <ul className="lf__tags">
            {project.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : null}
        <span className="lf__more">
          {project.externalUrl ? "Visit" : "Read more"}
          <Arrow />
          {project.externalUrl ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
        </span>
      </div>
      <Thumb project={project} />
    </>
  );
  return (
    <li className={`lf ${flip ? "lf--flip" : ""}`}>
      {project.externalUrl ? (
        <a className="lf__row" href={project.externalUrl} target="_blank" rel="noreferrer">{body}</a>
      ) : (
        <Link className="lf__row" href={`/projects/${project.slug}`}>{body}</Link>
      )}
    </li>
  );
}

export default function FeaturedWork({ projects }) {
  return (
    <ul className="lf-list">
      {projects.map((p, i) => (
        <Tile key={p.slug} project={p} flip={i % 2 === 1} />
      ))}
    </ul>
  );
}
