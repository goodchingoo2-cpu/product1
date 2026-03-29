import { NextResponse } from "next/server";
import { clearAdminSession, createAdminSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.idToken) {
      return NextResponse.json({ error: "Missing ID token." }, { status: 400 });
    }

    const session = await createAdminSession(body.idToken);
    return NextResponse.json({ session: session });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
