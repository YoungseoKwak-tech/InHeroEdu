import type { SatForm } from "./types";
import { SAT_FORM_1 } from "./form1";
import { SAT_FORM_2, SAT_FORM_3 } from "./forms-extra";
import { SAT_FORM_4 } from "./form4";
import { SAT_FORM_5 } from "./form5";
import { SAT_FORM_6 } from "./form6";
import { SAT_FORM_7 } from "./form7";
import { SAT_FORM_8 } from "./form8";
import { SAT_FORM_9 } from "./form9";
import { SAT_FORM_10 } from "./form10";
import { SAT_FORM_11 } from "./form11";
import { SAT_FORM_12 } from "./form12";
import { SAT_FORM_13 } from "./form13";
import { SAT_FORM_14 } from "./form14";
import { SAT_FORM_15 } from "./form15";
import { SAT_FORM_16 } from "./form16";
import { SAT_FORM_17 } from "./form17";

/** All available practice tests, in display order. */
export const SAT_FORMS: SatForm[] = [
  SAT_FORM_1, SAT_FORM_2, SAT_FORM_3, SAT_FORM_4, SAT_FORM_5,
  SAT_FORM_6, SAT_FORM_7, SAT_FORM_8, SAT_FORM_9, SAT_FORM_10,
  SAT_FORM_11, SAT_FORM_12, SAT_FORM_13, SAT_FORM_14, SAT_FORM_15,
  SAT_FORM_16, SAT_FORM_17,
];

export const DIGITAL_SAT_MODULE_SPEC = {
  rwQuestions: 27,
  rwTimeSec: 32 * 60,
  mathQuestions: 22,
  mathTimeSec: 35 * 60,
};

export function isFullLengthSatForm(f: SatForm): boolean {
  return (
    f.rw.m1.length === DIGITAL_SAT_MODULE_SPEC.rwQuestions &&
    f.rw.m2easy.length === DIGITAL_SAT_MODULE_SPEC.rwQuestions &&
    f.rw.m2hard.length === DIGITAL_SAT_MODULE_SPEC.rwQuestions &&
    f.rw.timeSec === DIGITAL_SAT_MODULE_SPEC.rwTimeSec &&
    f.math.m1.length === DIGITAL_SAT_MODULE_SPEC.mathQuestions &&
    f.math.m2easy.length === DIGITAL_SAT_MODULE_SPEC.mathQuestions &&
    f.math.m2hard.length === DIGITAL_SAT_MODULE_SPEC.mathQuestions &&
    f.math.timeSec === DIGITAL_SAT_MODULE_SPEC.mathTimeSec
  );
}

/** Verified full-length tests matching the current digital SAT module shape. */
export const SAT_FULL_LENGTH_FORMS: SatForm[] = SAT_FORMS.filter(isFullLengthSatForm);

export function getSatForm(id: string | undefined): SatForm | undefined {
  return SAT_FULL_LENGTH_FORMS.find((f) => f.id === id);
}

/** A full run = both modules of each section (Module 2 sizes match Module 1's pools). */
export function formCounts(f: SatForm) {
  return {
    rw: f.rw.m1.length + f.rw.m2easy.length,
    math: f.math.m1.length + f.math.m2easy.length,
  };
}
