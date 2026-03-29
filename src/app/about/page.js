export const metadata = {
  title: "About",
  description: "Learn why K Context Guide exists and how it explains Korean cultural context for international audiences."
};

export default function AboutPage() {
  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">About</span>
        <h1>Built for viewers who want context, not clutter.</h1>
        <p>
          K Context Guide explains Korean cultural signals in a clean editorial format designed for
          trust, clarity, and long-term search visibility.
        </p>
      </div>
      <div className="policy-copy">
        <p>
          The goal is simple: help non-Korean viewers understand why a line, gesture, silence, or
          ritual feels important even when subtitles look ordinary.
        </p>
        <p>
          Articles focus on cultural literacy instead of celebrity news or fandom churn. That keeps
          the site aligned with an AdSense-friendly, reader-first publishing model.
        </p>
        <p>
          Content is organized into Korean lines, cultural concepts, and scene meanings so readers
          can either search directly or browse by learning style.
        </p>
      </div>
    </div>
  );
}
