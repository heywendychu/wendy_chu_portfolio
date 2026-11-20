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
  // The screenshot always spans the panel's full width (never cropped at the sides); only the bottom is cut off.
  // Panel: inset 8% left/right/top of the 16:10 frame, running off the bottom. A wide, short image gets a
  // shorter panel (it starts lower) so it still runs a little off the bottom instead of leaving a gap.
  const ratio = img?.width && img?.height ? img.width / img.height : 1.6;
  const frameH = (84 * 1.6) / ratio; // image height as % of the frame height
  const top = Math.max(8, 100 - frameH * 0.88);
  const panelH = 100 - top; // panel height as % of the frame
  const overflow = (frameH / panelH) * 100 - 100; // how far (% of panel) the image runs past the bottom
  let y = 0;
  if (project.imageCrop && typeof project.imageCrop.y === "number") y = project.imageCrop.y;
  else if (top <= 8) y = -overflow * ({ top: 0, center: 0.5, bottom: 1 }[project.imagePosition] ?? 0);
  y = Math.min(0, Math.max(-overflow, y));
  const panelStyle = top > 8 ? { top: `${top.toFixed(1)}%` } : undefined;
  const imgStyle = { position: "absolute", left: 0, top: `${y.toFixed(1)}%`, width: "100%", height: "auto", maxWidth: "none", objectFit: "initial" };
  return (
    <div className={`fw__img ${project.imageTransparent ? "fw__img--clear" : ""}`} aria-hidden="true">
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
        <h3 className="lf__h">{HEADLINE_IS_OUTCOME ? project.outcome || project.menuLabel : project.menuLabel}</h3>
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
