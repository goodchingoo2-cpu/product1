import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { CategoryPreview } from "@/components/CategoryPreview";
import { SearchBar } from "@/components/SearchBar";
import { getAllPublishedArticles } from "@/lib/articles";
import { getCategoryEntries } from "@/lib/site";

export default async function HomePage() {
  const articles = await getAllPublishedArticles();
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 3);
  const categories = getCategoryEntries();

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">K-content cultural context</span>
            <h1>Understand what Korean subtitles leave unsaid.</h1>
            <p>
              This site helps foreign viewers read the emotional, social, and cultural subtext
              behind Korean drama lines, rituals, and visual storytelling.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/search">
                Start with search
              </Link>
              <Link className="button-secondary" href="/about">
                How this site works
              </Link>
            </div>
            <div className="search-panel" style={{ marginTop: "1rem" }}>
              <SearchBar compact />
            </div>
          </div>

          <div className="hero-card panel">
            <div className="hero-card-stat">
              <div>
                <span>Reading paths</span>
                <strong>3 focused categories</strong>
              </div>
            </div>
            <div className="hero-card-stat">
              <div>
                <span>Coverage</span>
                <strong>{articles.length} context guides</strong>
              </div>
            </div>
            <div className="hero-card-stat">
              <div>
                <span>Editorial angle</span>
                <strong>Clear, ad-light, reader-first</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Browse by category</h2>
            <p>Each section focuses on a different kind of meaning that often gets lost in translation.</p>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryPreview key={category.slug} slug={category.slug} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Featured reads</h2>
            <p>Start with the articles that most quickly improve subtitle literacy for new viewers.</p>
          </div>
        </div>
        <ArticleList articles={featuredArticles} />
      </section>
    </div>
  );
}
