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

// IB DP — English Core Notes for units 4+ (rendered from the complete Korean
// set so EN now spans every Korean unit; ib-english/ib-psychology stop at U3).
import { IB_BIOLOGY_U4_EN } from "./ib-biology-u4";
import { IB_BIOLOGY_U5_EN } from "./ib-biology-u5";
import { IB_BIOLOGY_U6_EN } from "./ib-biology-u6";
import { IB_CHEMISTRY_U4_EN } from "./ib-chemistry-u4";
import { IB_CHEMISTRY_U5_EN } from "./ib-chemistry-u5";
import { IB_CHEMISTRY_U6_EN } from "./ib-chemistry-u6";
import { IB_CHEMISTRY_U7_EN } from "./ib-chemistry-u7";
import { IB_CHEMISTRY_U8_EN } from "./ib-chemistry-u8";
import { IB_CHEMISTRY_U9_EN } from "./ib-chemistry-u9";
import { IB_CHEMISTRY_U10_EN } from "./ib-chemistry-u10";
import { IB_CHEMISTRY_U11_EN } from "./ib-chemistry-u11";
import { IB_CS_U4_EN } from "./ib-cs-u4";
import { IB_CS_U5_EN } from "./ib-cs-u5";
import { IB_CS_U6_EN } from "./ib-cs-u6";
import { IB_CS_U7_EN } from "./ib-cs-u7";
import { IB_ECONOMICS_U4_EN } from "./ib-economics-u4";
import { IB_ESS_U4_EN } from "./ib-ess-u4";
import { IB_ESS_U5_EN } from "./ib-ess-u5";
import { IB_ESS_U6_EN } from "./ib-ess-u6";
import { IB_ESS_U7_EN } from "./ib-ess-u7";
import { IB_ESS_U8_EN } from "./ib-ess-u8";
import { IB_HISTORY_U4_EN } from "./ib-history-u4";
import { IB_HISTORY_U5_EN } from "./ib-history-u5";
import { IB_MATH_AA_U4_EN } from "./ib-math-aa-u4";
import { IB_MATH_AA_U5_EN } from "./ib-math-aa-u5";
import { IB_MATH_AI_U4_EN } from "./ib-math-ai-u4";
import { IB_MATH_AI_U5_EN } from "./ib-math-ai-u5";
import { IB_PHYSICS_U4_EN } from "./ib-physics-u4";
import { IB_PHYSICS_U5_EN } from "./ib-physics-u5";
import { IB_PHYSICS_U6_EN } from "./ib-physics-u6";
import { IB_PHYSICS_U7_EN } from "./ib-physics-u7";
import { IB_PHYSICS_U8_EN } from "./ib-physics-u8";

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
import { HONORS_CHEMISTRY_U5_EN } from "./honors-chemistry-u5";
import { HONORS_CHEMISTRY_U6_EN } from "./honors-chemistry-u6";
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
  // IB DP — units 4+ (English now mirrors the full Korean set)
  ...IB_BIOLOGY_U4_EN, ...IB_BIOLOGY_U5_EN, ...IB_BIOLOGY_U6_EN,
  ...IB_CHEMISTRY_U4_EN, ...IB_CHEMISTRY_U5_EN, ...IB_CHEMISTRY_U6_EN, ...IB_CHEMISTRY_U7_EN, ...IB_CHEMISTRY_U8_EN, ...IB_CHEMISTRY_U9_EN, ...IB_CHEMISTRY_U10_EN, ...IB_CHEMISTRY_U11_EN,
  ...IB_CS_U4_EN, ...IB_CS_U5_EN, ...IB_CS_U6_EN, ...IB_CS_U7_EN,
  ...IB_ECONOMICS_U4_EN,
  ...IB_ESS_U4_EN, ...IB_ESS_U5_EN, ...IB_ESS_U6_EN, ...IB_ESS_U7_EN, ...IB_ESS_U8_EN,
  ...IB_HISTORY_U4_EN, ...IB_HISTORY_U5_EN,
  ...IB_MATH_AA_U4_EN, ...IB_MATH_AA_U5_EN,
  ...IB_MATH_AI_U4_EN, ...IB_MATH_AI_U5_EN,
  ...IB_PHYSICS_U4_EN, ...IB_PHYSICS_U5_EN, ...IB_PHYSICS_U6_EN, ...IB_PHYSICS_U7_EN, ...IB_PHYSICS_U8_EN,
  // Honors
  ...HONORS_ALGEBRA_2_U1_EN, ...HONORS_ALGEBRA_2_U2_EN, ...HONORS_ALGEBRA_2_U3_EN, ...HONORS_ALGEBRA_2_U4_EN,
  ...HONORS_BIOLOGY_U1_EN, ...HONORS_BIOLOGY_U2_EN, ...HONORS_BIOLOGY_U3_EN, ...HONORS_BIOLOGY_U4_EN,
  ...HONORS_CHEMISTRY_U1_EN, ...HONORS_CHEMISTRY_U2_EN, ...HONORS_CHEMISTRY_U3_EN, ...HONORS_CHEMISTRY_U4_EN, ...HONORS_CHEMISTRY_U5_EN, ...HONORS_CHEMISTRY_U6_EN,
  ...HONORS_ENGLISH_9_U1_EN, ...HONORS_ENGLISH_9_U2_EN, ...HONORS_ENGLISH_9_U3_EN, ...HONORS_ENGLISH_9_U4_EN,
  ...HONORS_GEOMETRY_U1_EN, ...HONORS_GEOMETRY_U2_EN, ...HONORS_GEOMETRY_U3_EN, ...HONORS_GEOMETRY_U4_EN,
  ...HONORS_PHYSICS_U1_EN, ...HONORS_PHYSICS_U2_EN, ...HONORS_PHYSICS_U3_EN, ...HONORS_PHYSICS_U4_EN,
  ...HONORS_PRECALCULUS_U1_EN, ...HONORS_PRECALCULUS_U2_EN, ...HONORS_PRECALCULUS_U3_EN, ...HONORS_PRECALCULUS_U4_EN,
  ...HONORS_US_HISTORY_U1_EN, ...HONORS_US_HISTORY_U2_EN, ...HONORS_US_HISTORY_U3_EN, ...HONORS_US_HISTORY_U4_EN,
  ...HONORS_WORLD_HISTORY_U1_EN, ...HONORS_WORLD_HISTORY_U2_EN, ...HONORS_WORLD_HISTORY_U3_EN, ...HONORS_WORLD_HISTORY_U4_EN,
];
