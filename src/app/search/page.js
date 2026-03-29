import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { SearchBar } from "@/components/SearchBar";
import { searchPublishedArticles } from "@/lib/articles";

const suggestedQueries = [
  "aigoo",
  "아이고",
  "sunbae",
  "선배",
  "nunchi",
  "눈치",
  "라면",
  "회식"
];

export const metadata = {
  title: "Search"
};

export default async function SearchPage(props) {
  const resolvedSearchParams = await props.searchParams;
  const query = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : "";
  const results = await searchPublishedArticles(query);
  const hasQuery = query.trim().length > 0;
  const headline = hasQuery ? "Search results" : "Find the context you need.";
  const helperCopy = hasQuery
    ? "Browse matching explanations or refine your keyword with a Korean or English variant."
    : "Search by phrase, custom, emotional cue, symbolism, or K-drama situation.";

  return (
    <div className="container section search-layout">
      <div className="page-header panel search-hero">
        <span className="eyebrow">Search</span>
        <h1>{headline}</h1>
        <p>{helperCopy}</p>
        <div className="search-panel search-panel-flat">
          <SearchBar initialQuery={query} compact />
        </div>
        <div className="search-chip-row" aria-label="Suggested searches">
          {suggestedQueries.map(function (item) {
            return (
              <Link key={item} href={"/search?q=" + encodeURIComponent(item)} className="search-chip">
                {item}
              </Link>
            );
          })}
        </div>
      </div>

      {hasQuery ? (
        <div className="search-summary panel">
          <div>
            <span className="search-summary-label">Current query</span>
            <strong>“{query}”</strong>
          </div>
          <div>
            <span className="search-summary-label">Matches found</span>
            <strong>{results.length}</strong>
          </div>
        </div>
      ) : (
        <div className="search-summary panel">
          <div>
            <span className="search-summary-label">Search tip</span>
            <strong>Try both English and Korean keywords</strong>
          </div>
          <div>
            <span className="search-summary-label">Examples</span>
            <strong>sunbae, 선배, nunchi, 눈치</strong>
          </div>
        </div>
      )}

      <ArticleList
        articles={results}
        emptyTitle="No matching articles yet."
        emptyCopy="Try a broader phrase such as nunchi, sunbae, ramyeon, hierarchy, subtitles, or a Korean keyword like 눈치 or 아이고."
      />
    </div>
  );
}
