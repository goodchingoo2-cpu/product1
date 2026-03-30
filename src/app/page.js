import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { AskConsole } from "@/components/AskConsole";
import { getAllPublishedArticles } from "@/lib/articles";

export default async function HomePage() {
  const articles = await getAllPublishedArticles();
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 3);

  return (
    <div className="container">
      <section className="hero hero-minimal">
        <div className="hero-stack">
          <span className="eyebrow">K-content cultural context</span>
          <h1>Understand what Korean subtitles leave unsaid.</h1>
          <p className="hero-intro">
            Ask a question about a Korean line, cultural concept, or scene meaning and read the
            answer instantly from this site's saved articles.
          </p>
          <div className="hero-search-wrap">
            <div className="hero-search-panel">
              <AskConsole compact />
            </div>
          </div>
          <div className="hero-actions hero-actions-centered">
            <Link className="button-secondary" href="/about">
              How this site works
            </Link>
            <Link className="button-ghost" href="/search">
              Open full search
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading section-heading-centered">
          <div>
            <h2>Featured reads</h2>
            <p>Start with a few articles that quickly improve subtitle literacy.</p>
          </div>
        </div>
        <ArticleList articles={featuredArticles} />
      </section>
    </div>
  );
}
