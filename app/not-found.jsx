import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="display">Page not found</h1>
      <p className="body">
        That page doesn’t exist (anymore). <Link className="text-link" href="/#work">See my work →</Link>
      </p>
    </div>
  );
}
