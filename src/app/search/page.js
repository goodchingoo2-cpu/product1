import { ArticleList } from "@/components/ArticleList";
import { SearchBar } from "@/components/SearchBar";
import { searchPublishedArticles } from "@/lib/articles";

export const metadata = {
  title: "Search"
};

export default async function SearchPage({ searchParams }) {
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const results = await searchPublishedArticles(query);

  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">Search</span>
        <h1>Find the context you need.</h1>
        <p>Search by phrase, custom, emotional cue, symbolism, or K-drama situation.</p>
        <div className="search-panel" style={{ marginTop: "1rem", padding: 0, border: 0, boxShadow: "none" }}>
          <SearchBar initialQuery={query} compact />
        </div>
      </div>
      <ArticleList
        articles={results}
        emptyTitle="No matching articles yet."
        emptyCopy="Try a broader phrase such as nunchi, sunbae, ramyeon, hierarchy, or subtitles."
      />
    </div>
  );
}
