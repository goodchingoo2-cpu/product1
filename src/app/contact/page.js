import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="container section">
      <div className="page-header panel">
        <span className="eyebrow">Contact</span>
        <h1>Editorial contact</h1>
        <p>Use this page for corrections, article suggestions, partnerships, or licensing questions.</p>
      </div>
      <div className="policy-copy">
        <p>Email: {siteConfig.contactEmail}</p>
        <p>Response time: usually within 3 business days.</p>
        <p>
          For ad, compliance, or data questions, include the page URL and a short description of
          the issue so it can be reviewed quickly.
        </p>
      </div>
    </div>
  );
}
