import { NextResponse } from "next/server";
import { searchPublishedArticles } from "@/lib/articles";
import { askModes, defaultAskMode } from "@/lib/ask-config";
import { getCategory } from "@/lib/site";

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

function getMode(mode) {
  return askModes[mode] || askModes[defaultAskMode];
}

function buildContext(articles, charLimit) {
  return articles
    .map(function (article, index) {
      return [
        "Source " + String(index + 1),
        "Title: " + article.title,
        "Category: " + article.category,
        "Excerpt: " + article.excerpt,
        "Content: " + article.content.slice(0, charLimit)
      ].join("\n");
    })
    .join("\n\n---\n\n");
}

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is missing. Add it to your environment variables first." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const mode = getMode(typeof body.mode === "string" ? body.mode : defaultAskMode);

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const matchedArticles = (await searchPublishedArticles(question)).slice(0, mode.articleLimit);

    if (!matchedArticles.length) {
      return NextResponse.json({
        question: question,
        mode: mode.id,
        answer:
          "I could not find enough information in this site's articles to answer that yet. Try a more specific keyword or add a related article first.",
        sources: []
      });
    }

    const instructions = [
      "You answer questions about Korean cultural context using only the provided site articles.",
      "Do not use outside knowledge.",
      "If the articles are insufficient, say that clearly.",
      "Write a concise answer in the same language as the user's question when possible.",
      "Prefer 2 short paragraphs or 3-4 compact bullet points.",
      "Do not invent quotes or facts."
    ].join(" ");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        reasoning: {
          effort: mode.reasoning
        },
        max_output_tokens: mode.maxOutputTokens,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: instructions
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Answer mode: " +
                  mode.id +
                  "\nQuestion:\n" +
                  question +
                  "\n\nUse only these source articles:\n\n" +
                  buildContext(matchedArticles, mode.articleCharLimit)
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "OpenAI request failed: " + errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    const answer = data.output_text || "No answer was returned.";
    const sources = matchedArticles.map(function (article) {
      const category = getCategory(article.category);
      return {
        title: article.title,
        slug: article.slug,
        category: article.category,
        categoryName: category ? category.name : article.category,
        excerpt: article.excerpt
      };
    });

    return NextResponse.json({
      question: question,
      mode: mode.id,
      answer: answer,
      sources: sources,
      limits: {
        articleLimit: mode.articleLimit,
        articleCharLimit: mode.articleCharLimit,
        maxOutputTokens: mode.maxOutputTokens
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
