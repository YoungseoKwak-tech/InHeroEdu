import type { SatForm } from "./types";
import { SAT_FORM_1 } from "./form1";
import { SAT_FORM_2, SAT_FORM_3 } from "./forms-extra";

/** All available practice tests, in display order. */
export const SAT_FORMS: SatForm[] = [SAT_FORM_1, SAT_FORM_2, SAT_FORM_3];

export function getSatForm(id: string | undefined): SatForm | undefined {
  return SAT_FORMS.find((f) => f.id === id);
}

/** A full run = both modules of each section (Module 2 sizes match Module 1's pools). */
export function formCounts(f: SatForm) {
  return {
    rw: f.rw.m1.length + f.rw.m2easy.length,
    math: f.math.m1.length + f.math.m2easy.length,
  };
}
