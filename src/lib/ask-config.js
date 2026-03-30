export const askModes = {
  quick: {
    id: "quick",
    name: "Quick",
    articleLimit: 2,
    articleCharLimit: 900,
    maxOutputTokens: 180,
    description: "Short answer from the closest internal articles."
  },
  deep: {
    id: "deep",
    name: "Deep",
    articleLimit: 3,
    articleCharLimit: 1800,
    maxOutputTokens: 320,
    description: "Uses more internal article context for a fuller answer."
  }
};

export const defaultAskMode = "quick";

export const askTestPrompts = [
  "What does 보고 싶었어 really mean?",
  "Why do Koreans say 밥 먹었어?",
  "What is jeong in Korean culture?",
  "Why is silence romantic in Korean dramas?",
  "Why does staying beside someone matter so much?",
  "What does 옆에 있어줘 mean in Korean?",
  "What does 괜찮아 really mean?",
  "Why do Korean couples express affection subtly?",
  "Why are reunion scenes often so quiet?",
  "Why does food mean care in Korean culture?"
];
