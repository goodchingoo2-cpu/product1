"use client";

import { useMemo, useState, useTransition } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { getFirebaseClientAuth, getGoogleProvider } from "@/lib/firebase-client";
import { categoryConfig } from "@/lib/site";
import { toSlug } from "@/lib/format";

const emptyArticle = {
  id: "",
  title: "",
  slug: "",
  category: "korean-lines",
  excerpt: "",
  content: "",
  tags: "",
  searchTerms: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft",
  featured: false
};

function normalizeEditorData(article) {
  return {
    id: article?.id || "",
    title: article?.title || "",
    slug: article?.slug || "",
    category: article?.category || "korean-lines",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    tags: Array.isArray(article?.tags) ? article.tags.join(", ") : article?.tags || "",
    searchTerms: Array.isArray(article?.searchTerms)
      ? article.searchTerms.join(", ")
      : article?.searchTerms || "",
    metaTitle: article?.metaTitle || article?.title || "",
    metaDescription: article?.metaDescription || article?.excerpt || "",
    status: article?.status || "draft",
    featured: Boolean(article?.featured)
  };
}

export function AdminConsole({ initialArticles = [], initialSession = null, firebaseReady }) {
  const [session, setSession] = useState(initialSession);
  const [articles, setArticles] = useState(initialArticles);
  const [form, setForm] = useState(emptyArticle);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const sortedArticles = useMemo(
    function () {
      return articles.slice().sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    },
    [articles]
  );

  async function handleLogin() {
    setError("");
    setMessage("");

    try {
      const auth = getFirebaseClientAuth();
      if (!auth) {
        throw new Error("Firebase client variables are missing.");
      }

      const result = await signInWithPopup(auth, getGoogleProvider());
      const idToken = await result.user.getIdToken();
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idToken: idToken })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create an admin session.");
      }

      setSession(data.session);
      setMessage("Admin session started.");
      window.location.reload();
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  async function handleLogout() {
    setError("");
    setMessage("");

    try {
      const auth = getFirebaseClientAuth();
      if (auth) {
        await signOut(auth);
      }

      await fetch("/api/admin/session", { method: "DELETE" });
      setSession(null);
      setForm(emptyArticle);
      setMessage("Signed out.");
      window.location.reload();
    } catch (logoutError) {
      setError(logoutError.message);
    }
  }

  function editArticle(article) {
    setForm(normalizeEditorData(article));
    setError("");
    setMessage("");
  }

  function handleFieldChange(key, value) {
    setForm(function (current) {
      const next = { ...current, [key]: value };

      if (key === "title" && !current.id) {
        next.slug = toSlug(value);
      }

      return next;
    });
  }

  function resetForm() {
    setForm(emptyArticle);
    setError("");
    setMessage("");
  }

  async function handleSave(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    startTransition(async function () {
      try {
        const payload = {
          ...form,
          slug: toSlug(form.slug || form.title)
        };
        const endpoint = form.id ? "/api/admin/articles/" + form.id : "/api/admin/articles";
        const response = await fetch(endpoint, {
          method: form.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not save the article.");
        }

        setArticles(function (current) {
          const withoutCurrent = current.filter(function (item) {
            return item.id !== data.article.id;
          });
          return [data.article].concat(withoutCurrent);
        });
        setForm(normalizeEditorData(data.article));
        setMessage(form.id ? "Article updated." : "Article created.");
      } catch (saveError) {
        setError(saveError.message);
      }
    });
  }

  async function handleDelete() {
    if (!form.id) return;
    setError("");
    setMessage("");

    startTransition(async function () {
      try {
        const response = await fetch("/api/admin/articles/" + form.id, {
          method: "DELETE"
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not delete the article.");
        }

        setArticles(function (current) {
          return current.filter(function (item) {
            return item.id !== form.id;
          });
        });
        setForm(emptyArticle);
        setMessage("Article deleted.");
      } catch (deleteError) {
        setError(deleteError.message);
      }
    });
  }

  if (!session) {
    return (
      <div className="admin-panel">
        <h2>Admin access</h2>
        <p>
          Sign in with an approved Firebase Authentication account to create, edit, and publish
          articles.
        </p>
        {!firebaseReady && (
          <div className="message error">
            Firebase client variables are missing. Add your `.env.local` values first.
          </div>
        )}
        {error ? <div className="message error">{error}</div> : null}
        {message ? <div className="message success">{message}</div> : null}
        <div className="admin-login">
          <button className="button" onClick={handleLogin} disabled={!firebaseReady} type="button">
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-grid">
      <section className="admin-panel">
        <div className="section-heading">
          <div>
            <h2>Publishing desk</h2>
            <p>Signed in as {session.email}</p>
          </div>
          <button className="button-secondary" onClick={handleLogout} type="button">
            Sign out
          </button>
        </div>
        {error ? <div className="message error">{error}</div> : null}
        {message ? <div className="message success">{message}</div> : null}
        <form onSubmit={handleSave} className="grid">
          <div className="input-grid">
            <div className="field">
              <label htmlFor="title">Title</label>
              <input id="title" className="input" value={form.title} onChange={(event) => handleFieldChange("title", event.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="slug">Slug</label>
              <input id="slug" className="input" value={form.slug} onChange={(event) => handleFieldChange("slug", event.target.value)} required />
            </div>
          </div>
          <div className="input-grid">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category" className="select" value={form.category} onChange={(event) => handleFieldChange("category", event.target.value)}>
                {Object.values(categoryConfig).map(function (category) {
                  return (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" className="select" value={form.status} onChange={(event) => handleFieldChange("status", event.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea id="excerpt" className="textarea" value={form.excerpt} onChange={(event) => handleFieldChange("excerpt", event.target.value)} style={{ minHeight: 120 }} required />
          </div>
          <div className="field">
            <label htmlFor="content">Content</label>
            <textarea id="content" className="textarea" value={form.content} onChange={(event) => handleFieldChange("content", event.target.value)} required />
          </div>
          <div className="input-grid">
            <div className="field">
              <label htmlFor="metaTitle">Meta title</label>
              <input id="metaTitle" className="input" value={form.metaTitle} onChange={(event) => handleFieldChange("metaTitle", event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="tags">Tags</label>
              <input id="tags" className="input" value={form.tags} onChange={(event) => handleFieldChange("tags", event.target.value)} placeholder="language, hierarchy, symbolism" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="searchTerms">Search keywords</label>
            <input
              id="searchTerms"
              className="input"
              value={form.searchTerms}
              onChange={(event) => handleFieldChange("searchTerms", event.target.value)}
              placeholder="aigoo, 아이고, 선배, nunchi, 눈치"
            />
          </div>
          <div className="field">
            <label htmlFor="metaDescription">Meta description</label>
            <textarea id="metaDescription" className="textarea" value={form.metaDescription} onChange={(event) => handleFieldChange("metaDescription", event.target.value)} style={{ minHeight: 120 }} />
          </div>
          <div className="label-row">
            <label className="tag" htmlFor="featured">
              <input id="featured" type="checkbox" checked={form.featured} onChange={(event) => handleFieldChange("featured", event.target.checked)} style={{ marginRight: 8 }} />
              Feature on homepage
            </label>
          </div>
          <div className="admin-actions">
            <button className="button" type="submit" disabled={isPending}>
              {form.id ? "Update article" : "Create article"}
            </button>
            <button className="button-secondary" type="button" onClick={resetForm}>
              New draft
            </button>
            {form.id ? (
              <button className="button-ghost" type="button" onClick={handleDelete} disabled={isPending}>
                Delete article
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="admin-panel">
        <h3>All articles</h3>
        <div className="grid">
          {sortedArticles.map(function (article) {
            return (
              <button
                key={article.id}
                type="button"
                className="story-panel"
                onClick={() => editArticle(article)}
                style={{ textAlign: "left", cursor: "pointer" }}
              >
                <div className="label-row">
                  <span className="label">{categoryConfig[article.category]?.shortName}</span>
                  <span className={"status-pill " + article.status}>{article.status}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
