import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { sampleArticles } from "@/lib/sample-articles";

function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function serializeArticle(id, data) {
  const publishedAt =
    typeof data.publishedAt?.toDate === "function"
      ? data.publishedAt.toDate().toISOString()
      : data.publishedAt || null;
  const updatedAt =
    typeof data.updatedAt?.toDate === "function"
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt || null;

  return {
    id,
    title: data.title || "",
    slug: data.slug || "",
    category: data.category || "korean-lines",
    excerpt: data.excerpt || "",
    content: data.content || "",
    tags: normalizeArray(data.tags),
    metaTitle: data.metaTitle || data.title || "",
    metaDescription: data.metaDescription || data.excerpt || "",
    status: data.status || "draft",
    featured: Boolean(data.featured),
    publishedAt,
    updatedAt
  };
}

function sortArticles(items) {
  return [...items].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

export async function getAllPublishedArticles() {
  if (!isFirebaseAdminConfigured()) {
    return sortArticles(sampleArticles.filter((article) => article.status === "published"));
  }

  const db = getAdminDb();
  const snapshot = await db
    .collection("articles")
    .where("status", "==", "published")
    .get();

  return sortArticles(snapshot.docs.map((doc) => serializeArticle(doc.id, doc.data())));
}

export async function getPublishedArticlesByCategory(category) {
  const items = await getAllPublishedArticles();
  return items.filter((article) => article.category === category);
}

export async function findPublishedArticle(category, slug) {
  const items = await getAllPublishedArticles();
  return items.find(
    (article) => article.category === category && article.slug === slug && article.status === "published"
  );
}

export async function searchPublishedArticles(query) {
  const items = await getAllPublishedArticles();
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  return items.filter((article) => {
    const haystack = [
      article.title,
      article.excerpt,
      article.content,
      article.metaDescription,
      article.tags.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export async function getAdminArticles() {
  if (!isFirebaseAdminConfigured()) {
    return sortArticles(sampleArticles);
  }

  const db = getAdminDb();
  const snapshot = await db.collection("articles").get();
  return sortArticles(snapshot.docs.map((doc) => serializeArticle(doc.id, doc.data())));
}

export async function saveArticle(id, payload) {
  const db = getAdminDb();
  if (!db) throw new Error("Firebase Admin is not configured.");

  const articleId = id || db.collection("articles").doc().id;
  const now = new Date().toISOString();
  const publishedAt =
    payload.status === "published"
      ? payload.publishedAt || now
      : payload.publishedAt || null;

  const article = {
    title: payload.title,
    slug: payload.slug,
    category: payload.category,
    excerpt: payload.excerpt,
    content: payload.content,
    tags: normalizeArray(payload.tags),
    metaTitle: payload.metaTitle,
    metaDescription: payload.metaDescription,
    status: payload.status,
    featured: Boolean(payload.featured),
    publishedAt,
    updatedAt: now
  };

  await db.collection("articles").doc(articleId).set(article, { merge: true });
  const snapshot = await db.collection("articles").doc(articleId).get();
  return serializeArticle(snapshot.id, snapshot.data());
}

export async function deleteArticle(id) {
  const db = getAdminDb();
  if (!db) throw new Error("Firebase Admin is not configured.");
  await db.collection("articles").doc(id).delete();
}
