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

// IB Diploma Programme — Unit 2 ────────────────────────────────
import { IB_BIOLOGY_U2_EN } from "./ib-biology-u2";
import { IB_CHEMISTRY_U2_EN } from "./ib-chemistry-u2";
import { IB_PHYSICS_U2_EN } from "./ib-physics-u2";
import { IB_MATH_AA_U2_EN } from "./ib-math-aa-u2";
import { IB_MATH_AI_U2_EN } from "./ib-math-ai-u2";
import { IB_ENGLISH_U2_EN } from "./ib-english-u2";
import { IB_HISTORY_U2_EN } from "./ib-history-u2";
import { IB_ECONOMICS_U2_EN } from "./ib-economics-u2";
import { IB_PSYCHOLOGY_U2_EN } from "./ib-psychology-u2";
import { IB_ESS_U2_EN } from "./ib-ess-u2";
import { IB_CS_U2_EN } from "./ib-cs-u2";

// IB Diploma Programme — Unit 3 ────────────────────────────────
import { IB_BIOLOGY_U3_EN } from "./ib-biology-u3";
import { IB_CHEMISTRY_U3_EN } from "./ib-chemistry-u3";
import { IB_PHYSICS_U3_EN } from "./ib-physics-u3";
import { IB_MATH_AA_U3_EN } from "./ib-math-aa-u3";
import { IB_MATH_AI_U3_EN } from "./ib-math-ai-u3";
import { IB_ENGLISH_U3_EN } from "./ib-english-u3";
import { IB_HISTORY_U3_EN } from "./ib-history-u3";
import { IB_ECONOMICS_U3_EN } from "./ib-economics-u3";
import { IB_PSYCHOLOGY_U3_EN } from "./ib-psychology-u3";
import { IB_ESS_U3_EN } from "./ib-ess-u3";
import { IB_CS_U3_EN } from "./ib-cs-u3";

// Honors curricula — English Core Notes (4 units × 3 lessons each) ──
import { HONORS_ALGEBRA_2_U1_EN } from "./honors-algebra-2-u1";
import { HONORS_ALGEBRA_2_U2_EN } from "./honors-algebra-2-u2";
import { HONORS_ALGEBRA_2_U3_EN } from "./honors-algebra-2-u3";
import { HONORS_ALGEBRA_2_U4_EN } from "./honors-algebra-2-u4";
import { HONORS_BIOLOGY_U1_EN } from "./honors-biology-u1";
import { HONORS_BIOLOGY_U2_EN } from "./honors-biology-u2";
import { HONORS_BIOLOGY_U3_EN } from "./honors-biology-u3";
import { HONORS_BIOLOGY_U4_EN } from "./honors-biology-u4";
import { HONORS_CHEMISTRY_U1_EN } from "./honors-chemistry-u1";
import { HONORS_CHEMISTRY_U2_EN } from "./honors-chemistry-u2";
import { HONORS_CHEMISTRY_U3_EN } from "./honors-chemistry-u3";
import { HONORS_CHEMISTRY_U4_EN } from "./honors-chemistry-u4";
import { HONORS_ENGLISH_9_U1_EN } from "./honors-english-9-u1";
import { HONORS_ENGLISH_9_U2_EN } from "./honors-english-9-u2";
import { HONORS_ENGLISH_9_U3_EN } from "./honors-english-9-u3";
import { HONORS_ENGLISH_9_U4_EN } from "./honors-english-9-u4";
import { HONORS_GEOMETRY_U1_EN } from "./honors-geometry-u1";
import { HONORS_GEOMETRY_U2_EN } from "./honors-geometry-u2";
import { HONORS_GEOMETRY_U3_EN } from "./honors-geometry-u3";
import { HONORS_GEOMETRY_U4_EN } from "./honors-geometry-u4";
import { HONORS_PHYSICS_U1_EN } from "./honors-physics-u1";
import { HONORS_PHYSICS_U2_EN } from "./honors-physics-u2";
import { HONORS_PHYSICS_U3_EN } from "./honors-physics-u3";
import { HONORS_PHYSICS_U4_EN } from "./honors-physics-u4";
import { HONORS_PRECALCULUS_U1_EN } from "./honors-precalculus-u1";
import { HONORS_PRECALCULUS_U2_EN } from "./honors-precalculus-u2";
import { HONORS_PRECALCULUS_U3_EN } from "./honors-precalculus-u3";
import { HONORS_PRECALCULUS_U4_EN } from "./honors-precalculus-u4";
import { HONORS_US_HISTORY_U1_EN } from "./honors-us-history-u1";
import { HONORS_US_HISTORY_U2_EN } from "./honors-us-history-u2";
import { HONORS_US_HISTORY_U3_EN } from "./honors-us-history-u3";
import { HONORS_US_HISTORY_U4_EN } from "./honors-us-history-u4";
import { HONORS_WORLD_HISTORY_U1_EN } from "./honors-world-history-u1";
import { HONORS_WORLD_HISTORY_U2_EN } from "./honors-world-history-u2";
import { HONORS_WORLD_HISTORY_U3_EN } from "./honors-world-history-u3";
import { HONORS_WORLD_HISTORY_U4_EN } from "./honors-world-history-u4";

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
  ...IB_BIOLOGY_U2_EN,
  ...IB_CHEMISTRY_U2_EN,
  ...IB_PHYSICS_U2_EN,
  ...IB_MATH_AA_U2_EN,
  ...IB_MATH_AI_U2_EN,
  ...IB_ENGLISH_U2_EN,
  ...IB_HISTORY_U2_EN,
  ...IB_ECONOMICS_U2_EN,
  ...IB_PSYCHOLOGY_U2_EN,
  ...IB_ESS_U2_EN,
  ...IB_CS_U2_EN,
  ...IB_BIOLOGY_U3_EN,
  ...IB_CHEMISTRY_U3_EN,
  ...IB_PHYSICS_U3_EN,
  ...IB_MATH_AA_U3_EN,
  ...IB_MATH_AI_U3_EN,
  ...IB_ENGLISH_U3_EN,
  ...IB_HISTORY_U3_EN,
  ...IB_ECONOMICS_U3_EN,
  ...IB_PSYCHOLOGY_U3_EN,
  ...IB_ESS_U3_EN,
  ...IB_CS_U3_EN,
  // Honors
  ...HONORS_ALGEBRA_2_U1_EN, ...HONORS_ALGEBRA_2_U2_EN, ...HONORS_ALGEBRA_2_U3_EN, ...HONORS_ALGEBRA_2_U4_EN,
  ...HONORS_BIOLOGY_U1_EN, ...HONORS_BIOLOGY_U2_EN, ...HONORS_BIOLOGY_U3_EN, ...HONORS_BIOLOGY_U4_EN,
  ...HONORS_CHEMISTRY_U1_EN, ...HONORS_CHEMISTRY_U2_EN, ...HONORS_CHEMISTRY_U3_EN, ...HONORS_CHEMISTRY_U4_EN,
  ...HONORS_ENGLISH_9_U1_EN, ...HONORS_ENGLISH_9_U2_EN, ...HONORS_ENGLISH_9_U3_EN, ...HONORS_ENGLISH_9_U4_EN,
  ...HONORS_GEOMETRY_U1_EN, ...HONORS_GEOMETRY_U2_EN, ...HONORS_GEOMETRY_U3_EN, ...HONORS_GEOMETRY_U4_EN,
  ...HONORS_PHYSICS_U1_EN, ...HONORS_PHYSICS_U2_EN, ...HONORS_PHYSICS_U3_EN, ...HONORS_PHYSICS_U4_EN,
  ...HONORS_PRECALCULUS_U1_EN, ...HONORS_PRECALCULUS_U2_EN, ...HONORS_PRECALCULUS_U3_EN, ...HONORS_PRECALCULUS_U4_EN,
  ...HONORS_US_HISTORY_U1_EN, ...HONORS_US_HISTORY_U2_EN, ...HONORS_US_HISTORY_U3_EN, ...HONORS_US_HISTORY_U4_EN,
  ...HONORS_WORLD_HISTORY_U1_EN, ...HONORS_WORLD_HISTORY_U2_EN, ...HONORS_WORLD_HISTORY_U3_EN, ...HONORS_WORLD_HISTORY_U4_EN,
];
