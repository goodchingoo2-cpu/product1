export const metadata = {
  title: "Terms of Use"
};

export default function TermsPage() {
  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">Terms</span>
        <h1>Terms of Use</h1>
        <p>These terms describe how visitors may use the site and how editorial content may be referenced.</p>
      </div>
      <div className="policy-copy">
        <h2>Content usage</h2>
        <p>
          Articles are provided for educational and informational purposes. Republishing full
          articles without permission is not allowed.
        </p>
        <h2>No guarantees</h2>
        <p>
          Cultural explanations are editorial interpretations built from language and context
          analysis. They should not be treated as legal, academic, or professional advice.
        </p>
        <h2>Service changes</h2>
        <p>
          Site features, article availability, and publishing tools may change without prior notice.
        </p>
      </div>
    </div>
  );
}
