import type { ToeflForm } from "./types";
import { TOEFL_FORM_1 } from "./form1";
import { TOEFL_FORM_2 } from "./form2";
import { TOEFL_FORM_3 } from "./form3";
import { TOEFL_FORM_4 } from "./form4";
import { TOEFL_FORM_5 } from "./form5";
import { TOEFL_FORM_6 } from "./form6";
import { TOEFL_FORM_7 } from "./form7";
import { TOEFL_FORM_8 } from "./form8";

/** All available TOEFL practice tests, in display order. */
export const TOEFL_FORMS: ToeflForm[] = [
  TOEFL_FORM_1, TOEFL_FORM_2, TOEFL_FORM_3, TOEFL_FORM_4,
  TOEFL_FORM_5, TOEFL_FORM_6, TOEFL_FORM_7, TOEFL_FORM_8,
];

export function getToeflForm(id?: string): ToeflForm {
  return TOEFL_FORMS.find((f) => f.id === id) ?? TOEFL_FORM_1;
}

export function toeflCounts(f: ToeflForm) {
  const reading = f.reading.reduce((n, s) => n + s.questions.length, 0);
  const listening = f.listening.reduce((n, s) => n + s.questions.length, 0);
  return { reading, listening, speaking: f.speaking.length, writing: f.writing.length };
}
