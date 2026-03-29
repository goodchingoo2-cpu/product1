export const askModes = {
  economy: {
    id: "economy",
    name: "Economy",
    articleLimit: 2,
    articleCharLimit: 900,
    maxOutputTokens: 180,
    description: "Lowest cost. Good for short, direct answers.",
    reasoning: "low"
  },
  standard: {
    id: "standard",
    name: "Standard",
    articleLimit: 3,
    articleCharLimit: 1800,
    maxOutputTokens: 320,
    description: "Better depth with moderate cost.",
    reasoning: "low"
  }
};

export const defaultAskMode = "economy";

export const askTestPrompts = [
  "Why do Korean dramas use sunbae so often?",
  "선배라고 부르는 게 왜 중요해?",
  "What does nunchi mean in tense family meals?",
  "눈치가 좋다는 말은 정확히 무슨 뜻이야?",
  "Why does aigoo sound different depending on the scene?",
  "아이고는 슬플 때랑 답답할 때 느낌이 어떻게 달라?",
  "Why is a ramyeon invitation sometimes romantic?",
  "라면 먹고 갈래가 왜 특별한 뉘앙스가 있어?",
  "Why do office scenes care about pouring drinks?",
  "회식 자리에서 술 따르는 장면이 왜 중요해?"
];
