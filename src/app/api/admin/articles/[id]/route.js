import { NextResponse } from "next/server";
import { deleteArticle, saveArticle } from "@/lib/articles";
import { getAdminSession } from "@/lib/auth";

function validatePayload(payload) {
  if (!payload.title || !payload.title.trim()) return "Title is required.";
  if (!payload.slug || !payload.slug.trim()) return "Slug is required.";
  if (!payload.excerpt || !payload.excerpt.trim()) return "Excerpt is required.";
  if (!payload.content || !payload.content.trim()) return "Content is required.";
  return null;
}

export async function PUT(request, context) {
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

    const article = await saveArticle(context.params.id, payload);
    return NextResponse.json({ article: article });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, context) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await deleteArticle(context.params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
