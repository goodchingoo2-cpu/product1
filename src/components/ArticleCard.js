import Link from "next/link";
import { formatDate } from "@/lib/format";
import { getCategory } from "@/lib/site";

export function ArticleCard({ article }) {
  const category = getCategory(article.category);

  return (
    <article className="article-card panel">
      <div className="label-row">
        <span className="label">{category?.name || article.category}</span>
        <span className={`status-pill ${article.status}`}>{article.status}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="article-meta">
        <span>{formatDate(article.publishedAt)}</span>
        {article.tags?.slice(0, 2).map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link className="card-link" href={`/${article.category}/${article.slug}`}>
        Read article
      </Link>
    </article>
  );
}
