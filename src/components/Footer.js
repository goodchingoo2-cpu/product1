import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand-mark">
            K Context Guide
            <span>Minimal, reader-first cultural context</span>
          </div>
          <p className="footer-copy">
            Built for international readers who want context, not just translation.
          </p>
        </div>
        <div className="footer-nav">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
