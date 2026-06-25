import type { SatForm } from "./types";

/**
 * On-demand loaders for the heavy SAT form payloads.
 *
 * Each entry is a dynamic `import()` so every form becomes its own code-split
 * chunk — only the form the student actually starts is downloaded, instead of
 * bundling all ~2.2MB of question data. Keyed by the form's public `id`
 * (e.g. "practice-1"), matching the ids in `forms-meta.ts`.
 *
 * NOTE: this module intentionally does NOT statically import any form file;
 * the imports live inside the loader thunks so bundlers split them out.
 */
type FormLoader = () => Promise<SatForm>;

const LOADERS: Record<string, FormLoader> = {
  "practice-1": () => import("./form1").then((m) => m.SAT_FORM_1),
  "practice-2": () => import("./forms-extra").then((m) => m.SAT_FORM_2),
  "practice-3": () => import("./forms-extra").then((m) => m.SAT_FORM_3),
  "practice-4": () => import("./form4").then((m) => m.SAT_FORM_4),
  "practice-5": () => import("./form5").then((m) => m.SAT_FORM_5),
  "practice-6": () => import("./form6").then((m) => m.SAT_FORM_6),
  "practice-7": () => import("./form7").then((m) => m.SAT_FORM_7),
  "practice-8": () => import("./form8").then((m) => m.SAT_FORM_8),
  "practice-9": () => import("./form9").then((m) => m.SAT_FORM_9),
  "practice-10": () => import("./form10").then((m) => m.SAT_FORM_10),
  "practice-11": () => import("./form11").then((m) => m.SAT_FORM_11),
  "practice-12": () => import("./form12").then((m) => m.SAT_FORM_12),
  "practice-13": () => import("./form13").then((m) => m.SAT_FORM_13),
  "practice-14": () => import("./form14").then((m) => m.SAT_FORM_14),
  "practice-15": () => import("./form15").then((m) => m.SAT_FORM_15),
  "practice-16": () => import("./form16").then((m) => m.SAT_FORM_16),
  "practice-17": () => import("./form17").then((m) => m.SAT_FORM_17),
  "practice-18": () => import("./form18").then((m) => m.SAT_FORM_18),
  "practice-19": () => import("./form19").then((m) => m.SAT_FORM_19),
  "practice-20": () => import("./form20").then((m) => m.SAT_FORM_20),
  "practice-21": () => import("./form21").then((m) => m.SAT_FORM_21),
  "practice-22": () => import("./form22").then((m) => m.SAT_FORM_22),
  "practice-23": () => import("./form23").then((m) => m.SAT_FORM_23),
  "practice-24": () => import("./form24").then((m) => m.SAT_FORM_24),
  "practice-25": () => import("./form25").then((m) => m.SAT_FORM_25),
};

/** Default form id used when none/an unknown id is requested. */
export const DEFAULT_SAT_FORM_ID = "practice-1";

/**
 * Resolve a single form's heavy payload on demand. Falls back to the default
 * form for an unknown/undefined id, so callers always get a usable form.
 */
export async function loadSatForm(id: string | undefined): Promise<SatForm> {
  const loader = (id && LOADERS[id]) || LOADERS[DEFAULT_SAT_FORM_ID];
  return loader();
}

/** Whether a given id maps to a known form loader. */
export function hasSatForm(id: string | undefined): boolean {
  return !!id && id in LOADERS;
}
