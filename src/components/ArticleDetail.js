import { ArticleList } from "@/components/ArticleList";
import { formatDate } from "@/lib/format";
import { renderSimpleMarkdown } from "@/lib/markdown";

export function ArticleDetail({ article, category, related }) {
  return (
    <div className="container section article-layout">
      <article className="article-shell">
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
      <aside className="aside-stack">
        <div className="story-panel">
          <h3>Why this category matters</h3>
          <p>{category.description}</p>
        </div>
        <div className="story-panel">
          <h3>Related reads</h3>
          <ArticleList articles={related} emptyTitle="No related reads yet." />
        </div>
      </aside>
    </div>
  );
}
