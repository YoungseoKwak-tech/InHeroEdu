// Document folder taxonomy. When a user uploads a file in a lounge chat,
// they pick one of these groups; the value is persisted on the chat message's
// attachment_meta.group field. The "this-week" slot is admin-only — students
// see it as an info hint, not a selectable card.

export const DOC_GROUPS = [
  "notes",
  "visual-guides",
  "practice-frqs",
  "study-plans",
  "essays-writing",
  "this-week",
] as const;

export type DocGroup = (typeof DOC_GROUPS)[number];

export const DOC_GROUP_LABELS: Record<DocGroup, string> = {
  "notes":           "Notes",
  "visual-guides":   "Visual Guides",
  "practice-frqs":   "Practice & FRQs",
  "study-plans":     "Study Plans",
  "essays-writing":  "Essays & Writing",
  "this-week":       "This Week",
};

export const DOC_GROUP_EMOJI: Record<DocGroup, string> = {
  "notes":           "📕",
  "visual-guides":   "🗺️",
  "practice-frqs":   "📝",
  "study-plans":     "📐",
  "essays-writing":  "✍️",
  "this-week":       "💎",
};

export const DOC_GROUP_BLURBS: Record<DocGroup, string> = {
  "notes":           "Subject notes, unit summaries",
  "visual-guides":   "Flowcharts, diagrams",
  "practice-frqs":   "Your solutions, FRQ approaches",
  "study-plans":     "Schedules, roadmaps",
  "essays-writing":  "Your essays, writing samples",
  "this-week":       "Admin-curated weekly drops",
};

// Folders a non-admin student can upload to. "this-week" is gated server-side
// and rendered as an info hint, not a card, in the upload picker.
export const USER_UPLOADABLE_GROUPS = [
  "notes",
  "visual-guides",
  "practice-frqs",
  "study-plans",
  "essays-writing",
] as const satisfies readonly DocGroup[];

export function isDocGroup(value: unknown): value is DocGroup {
  return typeof value === "string" && (DOC_GROUPS as readonly string[]).includes(value);
}
