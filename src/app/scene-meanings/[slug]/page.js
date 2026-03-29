import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/ArticleDetail";
import { findPublishedArticle, getPublishedArticlesByCategory } from "@/lib/articles";
import { getCategory } from "@/lib/site";

export async function generateMetadata(props) {
  const article = await findPublishedArticle("scene-meanings", props.params.slug);
  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    alternates: {
      canonical: "/scene-meanings/" + article.slug
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: "article",
      url: "/scene-meanings/" + article.slug
    }
  };
}

export default async function SceneMeaningArticlePage(props) {
  const article = await findPublishedArticle("scene-meanings", props.params.slug);
  if (!article) notFound();

  const related = (await getPublishedArticlesByCategory("scene-meanings"))
    .filter(function (item) {
      return item.slug !== article.slug;
    })
    .slice(0, 3);
  const category = getCategory("scene-meanings");

  return <ArticleDetail article={article} category={category} related={related} />;
}
