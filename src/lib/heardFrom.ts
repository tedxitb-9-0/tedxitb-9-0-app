export const HEARD_FROM_VALUES = [
  "instagram",
  "tiktok",
  "friend_word_of_mouth",
  "broadcast",
  "himpunan_ukm",
  "student_ambassador",
  "media_partner",
  "other",
] as const;

export type HeardFrom = (typeof HEARD_FROM_VALUES)[number];

export const HEARD_FROM_LABELS: Record<HeardFrom, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  friend_word_of_mouth: "Friend / Word of Mouth",
  broadcast: "Broadcast",
  himpunan_ukm: "Himpunan / UKM",
  student_ambassador: "Student Ambassador",
  media_partner: "Media Partner",
  other: "Other",
};

export const HEARD_FROM_OPTIONS = HEARD_FROM_VALUES.map((value) => ({
  value,
  label: HEARD_FROM_LABELS[value],
}));

export const getHeardFromLabel = (value: string | null | undefined) => {
  if (!value) return null;
  return HEARD_FROM_LABELS[value as HeardFrom] ?? value;
};
