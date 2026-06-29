// English definitions for the 단어장, merged per deck (courseId → enLower → English def).
// Filled progressively by content authoring; missing entries fall back to the Korean def.
// One JSON per deck so parallel authoring never conflicts on a single file.
import _sat_essential from "./vocab-endefs/sat-essential.json";
import _toefl_essential from "./vocab-endefs/toefl-essential.json";
import _ap_biology from "./vocab-endefs/ap-biology.json";
import _ap_chemistry from "./vocab-endefs/ap-chemistry.json";
import _ap_physics_2 from "./vocab-endefs/ap-physics-2.json";
import _ap_calculus_ab from "./vocab-endefs/ap-calculus-ab.json";
import _ap_physics_1 from "./vocab-endefs/ap-physics-1.json";
import _ap_world_history from "./vocab-endefs/ap-world-history.json";
import _ap_physics_c_mechanics from "./vocab-endefs/ap-physics-c-mechanics.json";
import _honors_chemistry from "./vocab-endefs/honors-chemistry.json";
import _honors_physics from "./vocab-endefs/honors-physics.json";
import _ib_chemistry from "./vocab-endefs/ib-chemistry.json";
import _ap_precalculus from "./vocab-endefs/ap-precalculus.json";
import _ap_environmental_science from "./vocab-endefs/ap-environmental-science.json";
import _ib_ess from "./vocab-endefs/ib-ess.json";
import _ib_cs from "./vocab-endefs/ib-cs.json";
import _honors_english from "./vocab-endefs/honors-english.json";
import _ib_math_aa from "./vocab-endefs/ib-math-aa.json";
import _ib_physics from "./vocab-endefs/ib-physics.json";
import _ib_biology from "./vocab-endefs/ib-biology.json";
import _ib_history from "./vocab-endefs/ib-history.json";
import _ib_math_ai from "./vocab-endefs/ib-math-ai.json";
import _ib_economics from "./vocab-endefs/ib-economics.json";
import _ap_us_history from "./vocab-endefs/ap-us-history.json";
import _honors_world_history from "./vocab-endefs/honors-world-history.json";
import _honors_biology from "./vocab-endefs/honors-biology.json";
import _honors_algebra_2 from "./vocab-endefs/honors-algebra-2.json";
import _ib_english from "./vocab-endefs/ib-english.json";
import _ib_psychology from "./vocab-endefs/ib-psychology.json";
import _honors_us_history from "./vocab-endefs/honors-us-history.json";
import _honors_geometry from "./vocab-endefs/honors-geometry.json";
import _honors_precalculus from "./vocab-endefs/honors-precalculus.json";
import _math_concepts from "./vocab-endefs/math-concepts.json";
import _ap_psychology from "./vocab-endefs/ap-psychology.json";
import _honors_english_9 from "./vocab-endefs/honors-english-9.json";
import _ap_statistics from "./vocab-endefs/ap-statistics.json";
import _ap_computer_science_a from "./vocab-endefs/ap-computer-science-a.json";
import _ap_human_geography from "./vocab-endefs/ap-human-geography.json";
import _ap_english_language from "./vocab-endefs/ap-english-language.json";
import _ap_us_government from "./vocab-endefs/ap-us-government.json";
import _ap_macroeconomics from "./vocab-endefs/ap-macroeconomics.json";
import _ap_microeconomics from "./vocab-endefs/ap-microeconomics.json";
import _ap_calculus_bc from "./vocab-endefs/ap-calculus-bc.json";

export const VOCAB_EN_DEFS: Record<string, Record<string, string>> = {
  "sat-essential": _sat_essential as Record<string, string>,
  "toefl-essential": _toefl_essential as Record<string, string>,
  "ap-biology": _ap_biology as Record<string, string>,
  "ap-chemistry": _ap_chemistry as Record<string, string>,
  "ap-physics-2": _ap_physics_2 as Record<string, string>,
  "ap-calculus-ab": _ap_calculus_ab as Record<string, string>,
  "ap-physics-1": _ap_physics_1 as Record<string, string>,
  "ap-world-history": _ap_world_history as Record<string, string>,
  "ap-physics-c-mechanics": _ap_physics_c_mechanics as Record<string, string>,
  "honors-chemistry": _honors_chemistry as Record<string, string>,
  "honors-physics": _honors_physics as Record<string, string>,
  "ib-chemistry": _ib_chemistry as Record<string, string>,
  "ap-precalculus": _ap_precalculus as Record<string, string>,
  "ap-environmental-science": _ap_environmental_science as Record<string, string>,
  "ib-ess": _ib_ess as Record<string, string>,
  "ib-cs": _ib_cs as Record<string, string>,
  "honors-english": _honors_english as Record<string, string>,
  "ib-math-aa": _ib_math_aa as Record<string, string>,
  "ib-physics": _ib_physics as Record<string, string>,
  "ib-biology": _ib_biology as Record<string, string>,
  "ib-history": _ib_history as Record<string, string>,
  "ib-math-ai": _ib_math_ai as Record<string, string>,
  "ib-economics": _ib_economics as Record<string, string>,
  "ap-us-history": _ap_us_history as Record<string, string>,
  "honors-world-history": _honors_world_history as Record<string, string>,
  "honors-biology": _honors_biology as Record<string, string>,
  "honors-algebra-2": _honors_algebra_2 as Record<string, string>,
  "ib-english": _ib_english as Record<string, string>,
  "ib-psychology": _ib_psychology as Record<string, string>,
  "honors-us-history": _honors_us_history as Record<string, string>,
  "honors-geometry": _honors_geometry as Record<string, string>,
  "honors-precalculus": _honors_precalculus as Record<string, string>,
  "math-concepts": _math_concepts as Record<string, string>,
  "ap-psychology": _ap_psychology as Record<string, string>,
  "honors-english-9": _honors_english_9 as Record<string, string>,
  "ap-statistics": _ap_statistics as Record<string, string>,
  "ap-computer-science-a": _ap_computer_science_a as Record<string, string>,
  "ap-human-geography": _ap_human_geography as Record<string, string>,
  "ap-english-language": _ap_english_language as Record<string, string>,
  "ap-us-government": _ap_us_government as Record<string, string>,
  "ap-macroeconomics": _ap_macroeconomics as Record<string, string>,
  "ap-microeconomics": _ap_microeconomics as Record<string, string>,
  "ap-calculus-bc": _ap_calculus_bc as Record<string, string>,
};

/** Course-scoped English definition for an English term (lowercased), if authored. */
export function englishDef(courseId: string, enLower: string): string | undefined {
  return VOCAB_EN_DEFS[courseId]?.[enLower];
}
