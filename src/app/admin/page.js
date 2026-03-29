import { AdminConsole } from "@/components/AdminConsole";
import { getAdminArticles } from "@/lib/articles";
import { getAdminSession } from "@/lib/auth";
import { hasFirebaseClientEnv } from "@/lib/firebase-config";

export const metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  const session = await getAdminSession();
  const articles = session ? await getAdminArticles() : [];

  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">Admin</span>
        <h1>Editorial admin</h1>
        <p>Create, update, and publish articles with Firebase-backed authentication and storage.</p>
      </div>
      <AdminConsole
        initialArticles={articles}
        initialSession={session}
        firebaseReady={hasFirebaseClientEnv()}
      />
    </div>
  );
}
