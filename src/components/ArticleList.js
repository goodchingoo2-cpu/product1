import { ArticleCard } from "@/components/ArticleCard";

export function ArticleList({ articles, emptyTitle = "No articles yet.", emptyCopy }) {
  if (!articles.length) {
    return (
      <div className="empty-state panel">
        <h2>{emptyTitle}</h2>
        <p>{emptyCopy || "Check back soon for new explanations and guides."}</p>
      </div>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
