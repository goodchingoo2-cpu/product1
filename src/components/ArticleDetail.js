import { formatDate } from "@/lib/format";
import { renderSimpleMarkdown } from "@/lib/markdown";

export function ArticleDetail({ article, category }) {
  return (
    <div className="container section article-layout article-layout-single">
      <article className="article-shell article-shell-wide">
        <header className="article-header">
          <span className="eyebrow">{category.name}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="meta-row">
            <span>{formatDate(article.publishedAt)}</span>
            {article.tags.map(function (tag) {
              return (
                <span key={tag} className="tag">
                  {tag}
                </span>
              );
            })}
          </div>
        </header>
        <div className="rich-text">{renderSimpleMarkdown(article.content)}</div>
      </article>
    </div>
  );
}
