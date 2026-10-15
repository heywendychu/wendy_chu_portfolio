import Link from "next/link";
import { groupByCompany } from "@/lib/content";

// Projects grouped by company. Used on the home page and in the project-page footer.
export default function WorkList({ projects, current, compact = false }) {
  const groups = groupByCompany(projects);
  return (
    <div className={`work ${compact ? "work--compact" : ""}`}>
      {groups.map((g) => (
        <div className="work__company" key={g.company}>
          <h3 className="work__company-name">{g.company}</h3>
          <ul>
            {g.projects.map((p) => {
              const isCurrent = p.slug === current;
              return (
                <li key={p.slug}>
                  {p.externalUrl ? (
                    <a className="work__link" href={p.externalUrl} target="_blank" rel="noreferrer">
                      <span>{p.menuLabel}</span>
                      <span className="work__ext" aria-label="(opens in a new tab)">↗</span>
                    </a>
                  ) : (
                    <Link
                      className={`work__link ${isCurrent ? "is-current" : ""}`}
                      href={`/projects/${p.slug}`}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <span>{p.menuLabel}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
