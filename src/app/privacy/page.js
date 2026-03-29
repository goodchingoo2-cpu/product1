export const metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPage() {
  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">Privacy</span>
        <h1>Privacy Policy</h1>
        <p>This page explains how site data, admin authentication, and analytics-related signals are handled.</p>
      </div>
      <div className="policy-copy">
        <h2>Information collected</h2>
        <p>
          The public site is designed to minimize data collection. Standard server logs and basic
          performance telemetry may be processed by the hosting platform.
        </p>
        <h2>Admin authentication</h2>
        <p>
          Admin access uses Firebase Authentication. Session cookies are used only to keep approved
          editors signed in to the private publishing area.
        </p>
        <h2>Advertising and analytics</h2>
        <p>
          If advertising or analytics tools are added, this policy should be updated to reflect
          cookie usage, consent flows, and applicable regional compliance requirements.
        </p>
      </div>
    </div>
  );
}
