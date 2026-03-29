import { ArticleList } from "@/components/ArticleList";
import { getPublishedArticlesByCategory } from "@/lib/articles";
import { getCategory } from "@/lib/site";

export const metadata = {
  title: "Cultural Concepts"
};

export default async function CulturalConceptsPage() {
  const category = getCategory("cultural-concepts");
  const articles = await getPublishedArticlesByCategory(category.slug);

  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">{category.name}</span>
        <h1>{category.hero}</h1>
        <p>{category.description}</p>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
