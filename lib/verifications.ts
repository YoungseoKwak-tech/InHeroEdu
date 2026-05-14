/**
 * Verifications — claims a user submits + admin approves to earn a badge.
 *
 * Tier hierarchy:
 *   Visitor (no auth) → Member (has profile) → Verified Student (≥1 approved
 *   verification) → Mentor (mentor_profiles row).
 *
 * One fake Ivy admit on InHero kills the brand. Verifications are scarce
 * by design.
 */

import type { BadgeType } from "@/lib/trajectory";

export const VERIFICATION_KINDS = [
  "school",
  "ap_score",
  "olympiad",
  "research",
  "founder",
  "mentor_endorsement",
] as const;
export type VerificationKind = (typeof VERIFICATION_KINDS)[number];

export interface VerificationKindMeta {
  id: VerificationKind;
  label: string;
  short: string;
  helper: string;          // form helper text
  evidenceHint: string;    // what kind of evidence link to expect
  badgeType: BadgeType;
  accent: string;
  glyph: string;
  needsSchoolName?: boolean;
}

export const VERIFICATION_KIND_META: Record<VerificationKind, VerificationKindMeta> = {
  school: {
    id: "school",
    label: "School / University",
    short: "School",
    helper: "Verify you're an actual student or admit at a specific institution.",
    evidenceHint: ".edu email screenshot, acceptance letter (redact PII), LinkedIn, official ID.",
    badgeType: "school_verified",
    accent: "#7DD3FC",
    glyph: "✓",
    needsSchoolName: true,
  },
  ap_score: {
    id: "ap_score",
    label: "AP Score (5)",
    short: "AP 5",
    helper: "Verify an AP exam score of 5. We're strict — only 5s.",
    evidenceHint: "College Board score screenshot with name visible.",
    badgeType: "verified_ap5",
    accent: "#5DCAA5",
    glyph: "✓",
  },
  olympiad: {
    id: "olympiad",
    label: "Olympiad",
    short: "Olympiad",
    helper: "Qualified for a national or international subject olympiad.",
    evidenceHint: "Result page, certificate, or competition profile link.",
    badgeType: "olympiad_qualifier",
    accent: "#A99CFF",
    glyph: "◈",
  },
  research: {
    id: "research",
    label: "Research",
    short: "Research",
    helper: "Published / contributed to a real research project.",
    evidenceHint: "DOI link, lab page with your name, conference poster, or PI letter.",
    badgeType: "research_contributor",
    accent: "#5DAAF0",
    glyph: "⚗",
  },
  founder: {
    id: "founder",
    label: "Founder / Builder",
    short: "Founder",
    helper: "Shipping a real product or company with real users.",
    evidenceHint: "Live product URL, GitHub with traffic, App Store listing, or revenue proof.",
    badgeType: "founder_circle",
    accent: "#FF6B5B",
    glyph: "⚡",
  },
  mentor_endorsement: {
    id: "mentor_endorsement",
    label: "Mentor Endorsement",
    short: "Mentor Approved",
    helper: "An InHero mentor has personally vouched for you.",
    evidenceHint: "Tag the mentor's handle + brief context. Mentor will be notified.",
    badgeType: "mentor_approved",
    accent: "#5eead4",
    glyph: "✶",
  },
};

export interface VerificationRow {
  id: string;
  user_id: string;
  kind: VerificationKind;
  status: "pending" | "approved" | "rejected";
  claim_text: string;
  evidence_url: string | null;
  school_name: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  reviewer_user_id: string | null;
  decline_reason: string | null;
}

export interface VerificationPublic {
  id: string;
  kind: VerificationKind;
  kindLabel: string;
  status: "pending" | "approved" | "rejected";
  claimText: string;
  evidenceUrl: string | null;
  schoolName: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  declineReason: string | null;
}

export function toVerificationPublic(row: VerificationRow): VerificationPublic {
  return {
    id: row.id,
    kind: row.kind,
    kindLabel: VERIFICATION_KIND_META[row.kind].label,
    status: row.status,
    claimText: row.claim_text,
    evidenceUrl: row.evidence_url,
    schoolName: row.school_name,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at,
    declineReason: row.decline_reason,
  };
}
