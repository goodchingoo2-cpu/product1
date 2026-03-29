# K Context Guide

Minimal Next.js content site for explaining Korean cultural context in K-content to international readers.

## Features

- Home page with category sections and featured articles
- Category hubs for Korean lines, cultural concepts, and scene meanings
- Search page and clean article URLs
- About, Contact, Privacy Policy, and Terms pages
- Firebase Authentication based admin session
- Firestore-backed article storage
- SEO metadata, sitemap, and robots setup
- Graceful sample-content fallback when Firebase is not configured yet
- Korean search keyword support through `searchTerms`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in Firebase values.

3. Enable a Firebase Authentication provider for your admin account.
   This project uses Google sign-in from the admin screen and checks `ADMIN_EMAILS`.

4. Start the app:

```bash
npm run dev
```

## Firestore

Use a collection named `articles`. Documents can be created from the admin page after login.

Expected document shape:

```json
{
  "title": "What 'aigoo' really means in Korean dramas",
  "slug": "what-aigoo-means",
  "category": "korean-lines",
  "excerpt": "How one short exclamation changes by tone and context.",
  "content": "Markdown-like body text",
  "status": "published",
  "tags": ["language", "emotion"],
  "searchTerms": ["aigoo", "아이고", "감탄사"],
  "metaTitle": "What 'Aigoo' Means in Korean Dramas",
  "metaDescription": "Learn how 'aigoo' works in Korean speech and why subtitles rarely capture the nuance.",
  "featured": true,
  "publishedAt": "2026-03-29T00:00:00.000Z",
  "updatedAt": "2026-03-29T00:00:00.000Z"
}
```

## Notes

- Public pages read published articles from Firestore when server credentials are present.
- Without Firebase configuration, the site still renders with bundled sample articles.
- Admin APIs require a verified Firebase session cookie and an email listed in `ADMIN_EMAILS`.
- Search checks title, excerpt, content, tags, meta description, and `searchTerms`.
