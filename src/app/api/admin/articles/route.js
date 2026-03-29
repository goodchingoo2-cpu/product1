import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { saveArticle } from "@/lib/articles";

function validatePayload(payload) {
  if (!payload.title || !payload.title.trim()) return "Title is required.";
  if (!payload.slug || !payload.slug.trim()) return "Slug is required.";
  if (!payload.excerpt || !payload.excerpt.trim()) return "Excerpt is required.";
  if (!payload.content || !payload.content.trim()) return "Content is required.";
  return null;
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const article = await saveArticle("", payload);
    return NextResponse.json({ article: article });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
