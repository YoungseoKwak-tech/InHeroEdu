import type { ToeflForm } from "./types";
import { TOEFL_FORM_1 } from "./form1";
import { TOEFL_FORM_2 } from "./form2";
import { TOEFL_FORM_3 } from "./form3";

/** All available TOEFL practice tests, in display order. */
export const TOEFL_FORMS: ToeflForm[] = [TOEFL_FORM_1, TOEFL_FORM_2, TOEFL_FORM_3];

export function getToeflForm(id?: string): ToeflForm {
  return TOEFL_FORMS.find((f) => f.id === id) ?? TOEFL_FORM_1;
}

export function toeflCounts(f: ToeflForm) {
  const reading = f.reading.reduce((n, s) => n + s.questions.length, 0);
  const listening = f.listening.reduce((n, s) => n + s.questions.length, 0);
  return { reading, listening, speaking: f.speaking.length, writing: f.writing.length };
}
