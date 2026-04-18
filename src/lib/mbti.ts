/** All 16 Myers–Briggs types (fixed order: analysts, diplomats, sentinels, explorers). */
export const MBTI_VALUES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export type MbtiType = (typeof MBTI_VALUES)[number];

export const MBTI_OPTIONS = MBTI_VALUES.map((value) => ({
  value,
  label: value,
}));
