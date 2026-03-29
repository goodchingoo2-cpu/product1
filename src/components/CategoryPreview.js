import Link from "next/link";
import { getPublishedArticlesByCategory } from "@/lib/articles";
import { categoryConfig } from "@/lib/site";

export async function CategoryPreview({ slug }) {
  const category = categoryConfig[slug];
  const articles = await getPublishedArticlesByCategory(slug);
  const preview = articles.slice(0, 2);

  return (
    <div className="card">
      <div className="label-row">
        <span className="label">{category.shortName}</span>
        <span>{articles.length} articles</span>
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <div className="grid">
        {preview.map((article) => (
          <div key={article.id} className="hero-card-stat">
            <div>
              <span>{article.tags?.[0] || "Context"}</span>
              <strong>{article.title}</strong>
            </div>
          </div>
        ))}
      </div>
      <Link className="card-link" href={`/${slug}`}>
        Explore category
      </Link>
    </div>
  );
}
