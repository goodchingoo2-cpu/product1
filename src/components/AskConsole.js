"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { askModes, askTestPrompts, defaultAskMode } from "@/lib/ask-config";

const modeList = Object.values(askModes);

export function AskConsole() {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState(defaultAskMode);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function runQuestion(nextQuestion, nextMode) {
    setError("");

    startTransition(async function () {
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
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    runQuestion(trimmed, mode);
  }

  function useStarter(value) {
    setQuestion(value);
    runQuestion(value, mode);
  }

  return (
    <div className="ask-layout">
      <section className="panel ask-panel">
        <span className="eyebrow">AI Ask</span>
        <h1>Ask in English or Korean.</h1>
        <p>
          This answer box uses only this site's articles as source material. If the site does not
          contain enough evidence, it should say so instead of guessing.
        </p>

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
                  {item.articleLimit} sources, {item.articleCharLimit} chars each, max {item.maxOutputTokens} output tokens
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
            placeholder="Why is calling someone sunbae important? / 선배라고 부르는 게 왜 중요해?"
            style={{ minHeight: 160 }}
          />
          <div className="ask-actions">
            <button className="button" type="submit" disabled={isPending || !question.trim()}>
              {isPending ? "Thinking..." : "Ask AI"}
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
          <p>2. Only those article excerpts are sent to OpenAI.</p>
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
              <span className="label">AI answer</span>
              <span className="tag">{result.sources.length} sources</span>
              <span className="tag">{result.mode}</span>
            </div>
            <h2>{result.question}</h2>
            <div className="ask-limit-row">
              <span>
                {result.limits.articleLimit} sources x {result.limits.articleCharLimit} chars
              </span>
              <span>max {result.limits.maxOutputTokens} output tokens</span>
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
