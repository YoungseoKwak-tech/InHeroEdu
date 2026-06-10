/**
 * Core Notes 한국어 레지스트리 B — 터미널 B 전용.
 * Honors / IB DP 한국어 노트 (AP 외 커리큘럼). 새 데이터 파일을 추가하면
 * 여기에만 import + spread 하세요. 터미널 A는 이 파일을 절대 건드리지 않습니다
 * (registry-a.ts 사용).
 */
import type { CoreNote } from "@/lib/coreNotes";

// Honors (9–12) ────────────────────────────────────────────────
import { HONORS_BIOLOGY_U1_KO } from "./honors-biology-u1";

// IB Diploma Programme ─────────────────────────────────────────
import { IB_BIOLOGY_U1_KO } from "./ib-biology-u1";
import { IB_CHEMISTRY_U1_KO } from "./ib-chemistry-u1";
import { IB_PHYSICS_U1_KO } from "./ib-physics-u1";
import { IB_MATH_AA_U1_KO } from "./ib-math-aa-u1";
import { IB_MATH_AI_U1_KO } from "./ib-math-ai-u1";
import { IB_ENGLISH_U1_KO } from "./ib-english-u1";
import { IB_HISTORY_U1_KO } from "./ib-history-u1";
import { IB_ECONOMICS_U1_KO } from "./ib-economics-u1";
import { IB_PSYCHOLOGY_U1_KO } from "./ib-psychology-u1";
import { IB_ESS_U1_KO } from "./ib-ess-u1";
import { IB_CS_U1_KO } from "./ib-cs-u1";

// IB Diploma Programme — Unit 2 ────────────────────────────────
import { IB_BIOLOGY_U2_KO } from "./ib-biology-u2";
import { IB_CHEMISTRY_U2_KO } from "./ib-chemistry-u2";
import { IB_PHYSICS_U2_KO } from "./ib-physics-u2";
import { IB_MATH_AA_U2_KO } from "./ib-math-aa-u2";
import { IB_MATH_AI_U2_KO } from "./ib-math-ai-u2";
import { IB_ENGLISH_U2_KO } from "./ib-english-u2";
import { IB_HISTORY_U2_KO } from "./ib-history-u2";
import { IB_ECONOMICS_U2_KO } from "./ib-economics-u2";
import { IB_PSYCHOLOGY_U2_KO } from "./ib-psychology-u2";
import { IB_ESS_U2_KO } from "./ib-ess-u2";
import { IB_CS_U2_KO } from "./ib-cs-u2";

// IB Diploma Programme — Unit 3 ────────────────────────────────
import { IB_BIOLOGY_U3_KO } from "./ib-biology-u3";
import { IB_CHEMISTRY_U3_KO } from "./ib-chemistry-u3";
import { IB_PHYSICS_U3_KO } from "./ib-physics-u3";
import { IB_MATH_AA_U3_KO } from "./ib-math-aa-u3";
import { IB_MATH_AI_U3_KO } from "./ib-math-ai-u3";
import { IB_ENGLISH_U3_KO } from "./ib-english-u3";
import { IB_HISTORY_U3_KO } from "./ib-history-u3";
import { IB_ECONOMICS_U3_KO } from "./ib-economics-u3";
import { IB_PSYCHOLOGY_U3_KO } from "./ib-psychology-u3";
import { IB_ESS_U3_KO } from "./ib-ess-u3";
import { IB_CS_U3_KO } from "./ib-cs-u3";

// IB Diploma Programme — Unit 4 (English·Psychology core completed at U3) ─
import { IB_BIOLOGY_U4_KO } from "./ib-biology-u4";
import { IB_CHEMISTRY_U4_KO } from "./ib-chemistry-u4";
import { IB_PHYSICS_U4_KO } from "./ib-physics-u4";
import { IB_MATH_AA_U4_KO } from "./ib-math-aa-u4";
import { IB_MATH_AI_U4_KO } from "./ib-math-ai-u4";
import { IB_HISTORY_U4_KO } from "./ib-history-u4";
import { IB_ECONOMICS_U4_KO } from "./ib-economics-u4";
import { IB_ESS_U4_KO } from "./ib-ess-u4";
import { IB_CS_U4_KO } from "./ib-cs-u4";

export const REGISTRY_B: CoreNote[] = [
  ...HONORS_BIOLOGY_U1_KO,
  ...IB_BIOLOGY_U1_KO,
  ...IB_CHEMISTRY_U1_KO,
  ...IB_PHYSICS_U1_KO,
  ...IB_MATH_AA_U1_KO,
  ...IB_MATH_AI_U1_KO,
  ...IB_ENGLISH_U1_KO,
  ...IB_HISTORY_U1_KO,
  ...IB_ECONOMICS_U1_KO,
  ...IB_PSYCHOLOGY_U1_KO,
  ...IB_ESS_U1_KO,
  ...IB_CS_U1_KO,
  ...IB_BIOLOGY_U2_KO,
  ...IB_CHEMISTRY_U2_KO,
  ...IB_PHYSICS_U2_KO,
  ...IB_MATH_AA_U2_KO,
  ...IB_MATH_AI_U2_KO,
  ...IB_ENGLISH_U2_KO,
  ...IB_HISTORY_U2_KO,
  ...IB_ECONOMICS_U2_KO,
  ...IB_PSYCHOLOGY_U2_KO,
  ...IB_ESS_U2_KO,
  ...IB_CS_U2_KO,
  ...IB_BIOLOGY_U3_KO,
  ...IB_CHEMISTRY_U3_KO,
  ...IB_PHYSICS_U3_KO,
  ...IB_MATH_AA_U3_KO,
  ...IB_MATH_AI_U3_KO,
  ...IB_ENGLISH_U3_KO,
  ...IB_HISTORY_U3_KO,
  ...IB_ECONOMICS_U3_KO,
  ...IB_PSYCHOLOGY_U3_KO,
  ...IB_ESS_U3_KO,
  ...IB_CS_U3_KO,
  ...IB_BIOLOGY_U4_KO,
  ...IB_CHEMISTRY_U4_KO,
  ...IB_PHYSICS_U4_KO,
  ...IB_MATH_AA_U4_KO,
  ...IB_MATH_AI_U4_KO,
  ...IB_HISTORY_U4_KO,
  ...IB_ECONOMICS_U4_KO,
  ...IB_ESS_U4_KO,
  ...IB_CS_U4_KO,
];
