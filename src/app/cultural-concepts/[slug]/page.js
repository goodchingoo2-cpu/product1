import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/ArticleDetail";
import { findPublishedArticle, getPublishedArticlesByCategory } from "@/lib/articles";
import { getCategory } from "@/lib/site";

export async function generateMetadata(props) {
  const params = await props.params;
  const article = await findPublishedArticle("cultural-concepts", params.slug);
  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    alternates: {
      canonical: "/cultural-concepts/" + article.slug
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: "article",
      url: "/cultural-concepts/" + article.slug
    }
  };
}

export default async function CulturalConceptArticlePage(props) {
  const params = await props.params;
  const article = await findPublishedArticle("cultural-concepts", params.slug);
  if (!article) notFound();

  const related = (await getPublishedArticlesByCategory("cultural-concepts"))
    .filter(function (item) {
      return item.slug !== article.slug;
    })
    .slice(0, 3);
  const category = getCategory("cultural-concepts");

  return <ArticleDetail article={article} category={category} related={related} />;
}
