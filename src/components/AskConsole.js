"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { askModes, askTestPrompts, defaultAskMode } from "@/lib/ask-config";

const modeList = Object.values(askModes);

export function AskConsole({
  initialQuestion = "",
  eyebrow = "ASK",
  title = "Ask in English or Korean.",
  description = "This answer box uses only this site's articles as source material. If the site does not contain enough evidence, it should say so instead of guessing.",
  autoRun = false,
  compact = false
}) {
  const [question, setQuestion] = useState(initialQuestion);
  const [mode, setMode] = useState(defaultAskMode);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const hasAutoRunRef = useRef(false);
  const resultRef = useRef(null);

  async function runQuestion(nextQuestion, nextMode) {
    setError("");
    setIsPending(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: nextQuestion, mode: nextMode })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate an answer.");
      }

      setResult(data);
    } catch (requestError) {
      setResult(null);
      setError(requestError.message);
    } finally {
      setIsPending(false);
    }
  }

  useEffect(
    function () {
      const trimmed = initialQuestion.trim();
      if (!autoRun || !trimmed || hasAutoRunRef.current) return;
      hasAutoRunRef.current = true;
      void runQuestion(trimmed, mode);
    },
    [autoRun, initialQuestion, mode]
  );

  useEffect(
    function () {
      if (!compact || !result || !resultRef.current) return;
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [compact, result]
  );

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || isPending) return;
    void runQuestion(trimmed, mode);
  }

  function handleInputKeyDown(event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || isPending) return;
    void runQuestion(trimmed, mode);
  }

  function useStarter(value) {
    setQuestion(value);
    void runQuestion(value, mode);
  }

  if (compact) {
    return (
      <div className="ask-compact-shell">
        <section className="search-panel hero-search-panel ask-compact-panel">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-row">
              <input
                aria-label="Ask a question"
                className="input"
                placeholder="Ask about a Korean line, cultural concept, or scene meaning"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button className="button" type="submit" disabled={isPending || !question.trim()}>
                {isPending ? "Searching..." : "ASK"}
              </button>
            </div>
          </form>
        </section>

        {error ? <div className="message error">{error}</div> : null}

        {result ? (
          <section ref={resultRef} className="panel ask-banner">
            <div className="label-row">
              <span className="label">Answer</span>
              <span className="tag">{result.sources.length} sources</span>
            </div>
            <h2>{result.question}</h2>
            <div className="rich-text ask-answer-copy">
              {result.answer.split("\n\n").map(function (paragraph, index) {
                return <p key={String(index)}>{paragraph}</p>;
              })}
            </div>
            {result.sources.length ? (
              <div className="ask-banner-sources">
                {result.sources.map(function (source) {
                  return (
                    <Link
                      key={source.slug}
                      href={"/" + source.category + "/" + source.slug}
                      className="search-chip"
                    >
                      {source.title}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div className="ask-layout">
      <section className="panel ask-panel">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>

        <div className="ask-mode-grid">
          {modeList.map(function (item) {
            const isActive = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={isActive ? "ask-mode-card active" : "ask-mode-card"}
                onClick={() => setMode(item.id)}
              >
                <strong>{item.name}</strong>
                <span>{item.description}</span>
                <small>
                  Up to {item.articleLimit} source articles, {item.articleCharLimit} chars each
                </small>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="ask-form">
          <textarea
            className="textarea"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Why is calling someone sunbae important?"
            style={{ minHeight: 160 }}
          />
          <div className="ask-actions">
            <button className="button" type="submit" disabled={isPending || !question.trim()}>
              {isPending ? "Searching..." : "ASK"}
            </button>
          </div>
        </form>

        <div className="ask-test-block">
          <div className="label-row">
            <span className="label">Test prompts</span>
            <span className="tag">10 examples</span>
          </div>
          <div className="search-chip-row" aria-label="Starter questions">
            {askTestPrompts.map(function (item) {
              return (
                <button
                  key={item}
                  type="button"
                  className="search-chip ask-chip-button"
                  onClick={() => useStarter(item)}
                  disabled={isPending}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ask-sidebar">
        <div className="panel ask-note">
          <h2>How it works</h2>
          <p>1. The site finds related internal articles.</p>
          <p>2. It builds an answer only from those saved articles.</p>
          <p>3. Source articles are shown below for verification.</p>
        </div>
        <div className="panel ask-note">
          <h2>Limits</h2>
          <p>
            This is not a live web search. It only answers from content already stored on this
            site.
          </p>
        </div>
      </section>

      {error ? <div className="message error">{error}</div> : null}

      {result ? (
        <section className="ask-result-grid">
          <article className="panel ask-answer">
            <div className="label-row">
              <span className="label">Answer</span>
              <span className="tag">{result.sources.length} sources</span>
              <span className="tag">{result.mode}</span>
              <span className="tag">{result.limits.sourcePolicy}</span>
            </div>
            <h2>{result.question}</h2>
            <div className="ask-limit-row">
              <span>
                up to {result.limits.articleLimit} sources x {result.limits.articleCharLimit} chars
              </span>
              <span>site articles only</span>
            </div>
            <div className="rich-text ask-answer-copy">
              {result.answer.split("\n\n").map(function (paragraph, index) {
                return <p key={String(index)}>{paragraph}</p>;
              })}
            </div>
          </article>

          <aside className="aside-stack">
            <div className="panel ask-note">
              <h2>Source articles</h2>
              <div className="grid">
                {result.sources.map(function (source) {
                  return (
                    <Link
                      key={source.slug}
                      href={"/" + source.category + "/" + source.slug}
                      className="story-panel"
                    >
                      <div className="label-row">
                        <span className="label">{source.categoryName}</span>
                      </div>
                      <h3>{source.title}</h3>
                      <p>{source.excerpt}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>
      ) : null}
    </div>
  );
}
