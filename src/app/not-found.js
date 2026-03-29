import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section">
      <div className="empty-state panel">
        <h1>Page not found</h1>
        <p>The page you requested does not exist or is no longer published.</p>
        <Link href="/" className="button" style={{ marginTop: "1rem" }}>
          Return home
        </Link>
      </div>
    </div>
  );
}
