import { NextResponse } from "next/server";
import { getAllPublishedArticles } from "@/lib/articles";
import { askModes, defaultAskMode } from "@/lib/ask-config";
import { getCategory } from "@/lib/site";

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";
const OPENAI_ASK_ENABLED = process.env.ENABLE_OPENAI_ASK === "true";
const MIN_MATCH_SCORE = 6;

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

function tokenizeQuery(question) {
  const englishTerms = (question.toLowerCase().match(/[a-z0-9]+/g) || []).filter(function (term) {
    return term.length > 1;
  });
  const koreanTerms = (question.match(/[가-힣]+/g) || []).filter(function (term) {
    return term.length > 1;
  });
  return [...new Set([...englishTerms, ...koreanTerms])];
}

function scoreArticle(article, question, terms) {
  const title = article.title.toLowerCase();
  const excerpt = article.excerpt.toLowerCase();
  const haystack = [
    article.title,
    article.excerpt,
    article.content,
    article.metaDescription,
    article.tags.join(" "),
    article.searchTerms.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  const normalizedQuestion = question.toLowerCase();
  let score = 0;

  if (title.includes(normalizedQuestion)) score += 14;
  if (excerpt.includes(normalizedQuestion)) score += 10;
  if (haystack.includes(normalizedQuestion)) score += 8;

  terms.forEach(function (term) {
    if (title.includes(term)) score += 6;
    else if (excerpt.includes(term)) score += 4;
    else if (haystack.includes(term)) score += 2;
  });

  return score;
}

function splitParagraphs(content) {
  return content
    .split("\n\n")
    .map(function (paragraph) {
      return paragraph.replace(/\*\*/g, "").trim();
    })
    .filter(Boolean);
}

function sentenceSplit(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(function (sentence) {
      return sentence.trim();
    })
    .filter(Boolean);
}

function pickSnippet(article, questionTerms) {
  const paragraphs = splitParagraphs(article.content);
  const paragraph =
    paragraphs.find(function (item) {
      const normalized = item.toLowerCase();
      return questionTerms.some(function (term) {
        return normalized.includes(term.toLowerCase());
      });
    }) || paragraphs[0] || article.excerpt;

  const sentences = sentenceSplit(paragraph);
  return sentences.slice(0, 2).join(" ");
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  return items.filter(function (item) {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function findMatchedArticles(question, limit) {
  const articles = await getAllPublishedArticles();
  const terms = tokenizeQuery(question);

  const ranked = articles
    .map(function (article) {
      return {
        article,
        score: scoreArticle(article, question, terms)
      };
    })
    .filter(function (item) {
      return item.score >= MIN_MATCH_SCORE;
    })
    .sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime();
    });

  return ranked.slice(0, limit).map(function (item) {
    return item.article;
  });
}

async function findRecommendedArticles(question, primaryArticle, desiredCount) {
  const articles = await getAllPublishedArticles();
  const terms = tokenizeQuery(question);

  const ranked = articles
    .filter(function (article) {
      return article.slug !== primaryArticle.slug;
    })
    .map(function (article) {
      let score = scoreArticle(article, question, terms);
      if (article.category !== primaryArticle.category) score += 2;
      if (
        article.tags.some(function (tag) {
          return primaryArticle.tags.includes(tag);
        })
      ) {
        score += 2;
      }
      return { article, score };
    })
    .filter(function (item) {
      return item.score >= MIN_MATCH_SCORE;
    })
    .sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime();
    })
    .map(function (item) {
      return item.article;
    });

  const crossCategory = uniqueBy(
    ranked.filter(function (article) {
      return article.category !== primaryArticle.category;
    }),
    function (article) {
      return article.category;
    }
  );

  const combined = uniqueBy(crossCategory.concat(ranked), function (article) {
    return article.slug;
  });

  return combined.slice(0, desiredCount);
}

function buildEnglishAnswer(question, primaryArticle, recommendedArticles) {
  const terms = tokenizeQuery(question);
  const lead = pickSnippet(primaryArticle, terms);
  const supportingSnippets = recommendedArticles
    .map(function (article) {
      return article.title + ": " + pickSnippet(article, terms);
    })
    .join(" ");

  const firstParagraph = [
    "Based on this site's internal articles, the clearest match for your question is",
    '"' + primaryArticle.title + '"',
    lead
  ].join(" ");

  const secondParagraph = recommendedArticles.length
    ? [
        "For added context, the related articles below help from nearby angles:",
        supportingSnippets,
        "This answer is based only on articles already stored on the site."
      ].join(" ")
    : "This answer is based only on articles already stored on the site. Open the linked source article below for the full context.";

  return [firstParagraph, secondParagraph].join("\n\n");
}

function buildKoreanAnswer(question, primaryArticle, recommendedArticles) {
  const terms = tokenizeQuery(question);
  const lead = pickSnippet(primaryArticle, terms);
  const supportingSnippets = recommendedArticles
    .map(function (article) {
      return article.title + ": " + pickSnippet(article, terms);
    })
    .join(" ");

  const firstParagraph = [
    "이 질문에는 사이트 내부 글 가운데",
    '"' + primaryArticle.title + '"',
    "가 가장 직접적으로 연결됩니다.",
    lead
  ].join(" ");

  const secondParagraph = recommendedArticles.length
    ? [
        "같이 보면 좋은 관련 글도 함께 골랐습니다.",
        supportingSnippets,
        "현재 답변은 이 사이트에 저장된 글만 바탕으로 정리했습니다."
      ].join(" ")
    : "현재 답변은 이 사이트에 저장된 글만 바탕으로 정리했습니다. 아래 source articles에서 원문 맥락을 바로 확인할 수 있습니다.";

  return [firstParagraph, secondParagraph].join("\n\n");
}

async function buildLocalAnswer(question, matchedArticles) {
  const primaryArticle = matchedArticles[0];
  const recommendedArticles = await findRecommendedArticles(question, primaryArticle, 2);
  const isKorean = /[가-힣]/.test(question);

  return {
    answer: isKorean
      ? buildKoreanAnswer(question, primaryArticle, recommendedArticles)
      : buildEnglishAnswer(question, primaryArticle, recommendedArticles),
    displayArticles: [primaryArticle].concat(recommendedArticles)
  };
}

async function generateOpenAIAnswer(question, mode, matchedArticles) {
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
        effort: "low"
      },
      max_output_tokens: mode.maxOutputTokens,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: instructions }]
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
    throw new Error("OpenAI request failed: " + errorText);
  }

  const data = await response.json();
  return data.output_text || "No answer was returned.";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const mode = getMode(typeof body.mode === "string" ? body.mode : defaultAskMode);

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const matchedArticles = await findMatchedArticles(question, mode.articleLimit);

    if (!matchedArticles.length) {
      return NextResponse.json({
        question,
        mode: mode.id,
        answer: /[가-힣]/.test(question)
          ? "현재 사이트 글만으로는 이 질문에 답할 만한 근거를 충분히 찾지 못했습니다. 더 구체적인 표현이나 관련 키워드로 다시 질문해 주세요."
          : "I could not find enough evidence in this site's articles to answer that yet. Try a more specific phrase or a related keyword.",
        sources: [],
        limits: {
          articleLimit: mode.articleLimit,
          articleCharLimit: mode.articleCharLimit,
          sourcePolicy: "internal-only"
        }
      });
    }

    let answer;
    let displayArticles = matchedArticles;

    if (OPENAI_ASK_ENABLED && process.env.OPENAI_API_KEY) {
      answer = await generateOpenAIAnswer(question, mode, matchedArticles);
    } else {
      const localResult = await buildLocalAnswer(question, matchedArticles);
      answer = localResult.answer;
      displayArticles = localResult.displayArticles;
    }

    const sources = displayArticles.map(function (article) {
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
      question,
      mode: mode.id,
      answer,
      sources,
      limits: {
        articleLimit: mode.articleLimit,
        articleCharLimit: mode.articleCharLimit,
        sourcePolicy: OPENAI_ASK_ENABLED && process.env.OPENAI_API_KEY ? "internal-plus-hidden-ai" : "internal-only"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
