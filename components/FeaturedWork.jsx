import Link from "next/link";
import { autoCrop } from "@/lib/leaf";

// Home page work list: one tile per project, alternating sides.
// Text (from Figma "Project Tile"): company, the Outcome as the headline, the project name,
// up to 3 Skills tags and READ MORE with Wendy's arrow. The picture sits in a leaf-shaped
// peach panel: Notion "Homepage image" (or the cover), placed by "Image zoom / x / y" when set
// in the review page's Thumbnails tab, otherwise automatically (see lib/leaf.js).
const Arrow = () => (
  <svg className="lf__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M0 3.367V2.132H7.592L5.863 0H7.423L9.659 2.756L7.423 5.499H5.863L7.605 3.367H0Z" fill="currentColor" />
  </svg>
);

function Leaf({ project, flip }) {
  const img = project.homeImage || project.cover;
  const crop = project.imageCrop || autoCrop({ width: img?.width, height: img?.height, transparent: project.imageTransparent, flip });
  return (
    <div className={`lf__shape ${project.imageTransparent ? "is-clear" : ""}`} aria-hidden="true">
      {img?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img.src}
          alt=""
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          style={{ width: `${crop.zoom}%`, left: `${crop.x}%`, top: `${crop.y}%` }}
        />
      ) : null}
    </div>
  );
}

function Tile({ project, flip }) {
  const body = (
    <>
      <div className="lf__text">
        <p className="lf__co">{project.company}</p>
        <h3 className="lf__h">{project.outcome || project.menuLabel}</h3>
        {project.outcome ? <p className="lf__sub">{project.menuLabel}</p> : null}
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
      <Leaf project={project} flip={flip} />
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
