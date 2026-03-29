import { getAllPublishedArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const staticPages = [
    "",
    "/search",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/korean-lines",
    "/cultural-concepts",
    "/scene-meanings"
  ].map(function (path) {
    return {
      url: siteConfig.url + path,
      lastModified: new Date()
    };
  });

  const articles = await getAllPublishedArticles();
  const articlePages = articles.map(function (article) {
    return {
      url: siteConfig.url + "/" + article.category + "/" + article.slug,
      lastModified: article.updatedAt || article.publishedAt || new Date().toISOString()
    };
  });

  return staticPages.concat(articlePages);
}
