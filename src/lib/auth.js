import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase-admin";

const SESSION_COOKIE_NAME = "kcontext-admin-session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 5;

export function isAllowedAdminEmail(email = "") {
  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (!allowed.length) return false;
  return allowed.includes(email.toLowerCase());
}

export async function createAdminSession(idToken) {
  const auth = getAdminAuth();
  if (!auth) throw new Error("Firebase Admin is not configured.");

  const decoded = await auth.verifyIdToken(idToken);

  if (!decoded.email || !isAllowedAdminEmail(decoded.email)) {
    throw new Error("This account is not allowed to access the admin area.");
  }

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION
  });

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/"
  });

  return {
    email: decoded.email,
    uid: decoded.uid
  };
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/"
  });
}

export async function getAdminSession() {
  const auth = getAdminAuth();
  if (!auth) return null;

  const store = await cookies();
  const sessionCookie = store.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await auth.verifySessionCookie(sessionCookie, true);
    if (!decoded.email || !isAllowedAdminEmail(decoded.email)) return null;

    return {
      uid: decoded.uid,
      email: decoded.email
    };
  } catch {
    return null;
  }
}
