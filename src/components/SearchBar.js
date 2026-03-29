"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar({ initialQuery = "", compact = false }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const target = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";
    router.push(target);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className={compact ? "search-row" : "search-form"}>
        <input
          aria-label="Search articles"
          className="input"
          placeholder="Search Korean phrases, customs, or scene meanings"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
