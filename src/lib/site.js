export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "K Context Guide",
  description:
    "Clear cultural explanations for Korean drama lines, social cues, and scene subtext that foreign viewers often miss.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "editor@kcontextguide.com"
};

export const categoryConfig = {
  "korean-lines": {
    slug: "korean-lines",
    name: "Korean Lines",
    shortName: "Lines",
    description:
      "Decode Korean phrases, repeated drama expressions, and subtitle choices that lose their original emotional texture.",
    hero:
      "Learn why one short line can sound affectionate, rude, resigned, or funny depending on who says it and when."
  },
  "cultural-concepts": {
    slug: "cultural-concepts",
    name: "Cultural Concepts",
    shortName: "Concepts",
    description:
      "Understand hierarchy, family expectations, social rituals, and values that shape dialogue and character decisions.",
    hero:
      "Move beyond literal translation and into the cultural rules that make a scene feel obvious to Korean viewers."
  },
  "scene-meanings": {
    slug: "scene-meanings",
    name: "Scene Meanings",
    shortName: "Scenes",
    description:
      "Break down iconic drama moments, symbolic gestures, and understated reactions that carry more weight than subtitles show.",
    hero:
      "See how framing, silence, props, and social context work together inside K-drama and film scenes."
  }
};

export function getCategory(slug) {
  return categoryConfig[slug];
}

export function getCategoryEntries() {
  return Object.values(categoryConfig);
}
