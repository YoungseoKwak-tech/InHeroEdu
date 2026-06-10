/**
 * Core Notes ENGLISH versions of the Korean-only curricula (Honors / IB DP).
 * These provide the genuine English column in the EN↔한국어 split view (the
 * Korean lives in coreNotesKo, the same lessonId). Add a data file → import +
 * spread it here. Same CoreNote shape; terms are { term, def } in English.
 */
import type { CoreNote } from "@/lib/coreNotes";

// IB Diploma Programme — Unit 1 ────────────────────────────────
import { IB_BIOLOGY_U1_EN } from "./ib-biology-u1";
import { IB_CHEMISTRY_U1_EN } from "./ib-chemistry-u1";
import { IB_PHYSICS_U1_EN } from "./ib-physics-u1";
import { IB_MATH_AA_U1_EN } from "./ib-math-aa-u1";
import { IB_MATH_AI_U1_EN } from "./ib-math-ai-u1";
import { IB_ENGLISH_U1_EN } from "./ib-english-u1";
import { IB_HISTORY_U1_EN } from "./ib-history-u1";
import { IB_ECONOMICS_U1_EN } from "./ib-economics-u1";
import { IB_PSYCHOLOGY_U1_EN } from "./ib-psychology-u1";
import { IB_ESS_U1_EN } from "./ib-ess-u1";
import { IB_CS_U1_EN } from "./ib-cs-u1";

export const CORE_NOTES_EN_LIST: CoreNote[] = [
  ...IB_BIOLOGY_U1_EN,
  ...IB_CHEMISTRY_U1_EN,
  ...IB_PHYSICS_U1_EN,
  ...IB_MATH_AA_U1_EN,
  ...IB_MATH_AI_U1_EN,
  ...IB_ENGLISH_U1_EN,
  ...IB_HISTORY_U1_EN,
  ...IB_ECONOMICS_U1_EN,
  ...IB_PSYCHOLOGY_U1_EN,
  ...IB_ESS_U1_EN,
  ...IB_CS_U1_EN,
];
