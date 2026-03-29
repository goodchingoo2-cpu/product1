import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getPrivateKey() {
  const value = process.env.FIREBASE_PRIVATE_KEY;
  return value ? value.replace(/\\n/g, "\n") : undefined;
}

export function isFirebaseAdminConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      getPrivateKey()
  );
}

export function getFirebaseAdminApp() {
  if (!isFirebaseAdminConfigured()) return null;

  if (getApps().length) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: getPrivateKey()
    })
  });
}

export function getAdminAuth() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getAuth(app);
}

export function getAdminDb() {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getFirestore(app);
}
