"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseClientEnv, hasFirebaseClientEnv } from "@/lib/firebase-config";

export function isFirebaseClientConfigured() {
  return hasFirebaseClientEnv();
}

export function getFirebaseClientApp() {
  if (!hasFirebaseClientEnv()) return null;
  return getApps().length ? getApp() : initializeApp(firebaseClientEnv);
}

export function getFirebaseClientAuth() {
  const app = getFirebaseClientApp();
  if (!app) return null;
  return getAuth(app);
}

export function getGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}
