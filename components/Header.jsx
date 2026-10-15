import Link from "next/link";

export default function Header({ nav }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="logo" aria-label="Wendy Chu — home">
          <svg viewBox="0 0 50 39" aria-hidden="true">
            <g fill="none" fillRule="evenodd">
              <path
                fill="#FFAA8E"
                d="M34.724 16.406c4.49 5.22 10.045 8.691 15.303 10.022a19.222 19.222 0 0 1-5.614 7.511c-8.364 6.842-20.833 5.778-27.851-2.375-7.018-8.153-5.927-20.309 2.437-27.15A19.888 19.888 0 0 1 27.312.383c.522 5.174 3.04 10.939 7.412 16.023z"
              />
              <path
                stroke="#1B2C63"
                strokeWidth="2"
                d="M.603 23.285c3.067-.04 3.627 4.597 7.443 4.587 3.816-.01 3.87-4.627 7.741-4.627 3.87 0 3.87 4.627 7.742 4.627 3.87 0 4.674-4.627 7.74-4.627"
              />
            </g>
          </svg>
        </Link>
        <nav aria-label="Main">
          {nav.map((item) => (
            <a key={item.id} href={`/#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
