/**
 * Shared credit policy for client UI, server spend enforcement, and admin audit.
 *
 * Any paid unlock must resolve through this file on the server. The browser may
 * display a cost, but `/api/credits/spend` never trusts the browser's number.
 */

export const WELCOME_CREDITS = 200;

export const CREDIT_COSTS = {
  FREE: 0,
  COLLEGE_DB: 25,
  GUIDE: 25,
  NOTE_UNIT: 50,
  VOCAB: 100,
  ESSAY: 250,
  ACTIVITIES: 250,
  TEXTBOOK: 250,
  SUBJECT: 200,
  STORY_BOOK: 300,
  CORE_NOTES_SUBJECT: 500,
  ALL_SUBJECTS: 1000,      // 핵심노트 전 과목 번들 (문제은행과 분리)
  QUESTION_BANK: 500,      // AP 문제은행 전 과목 이용권
  CORE_NOTES: 1000,
  SAT_MOCK: 500,           // SAT 모의고사 — 무제한
  AP_MOCK: 500,
  TOEFL_MOCK: 500,         // TOEFL 모의고사 — 무제한
  MOCK_5PACK: 200,         // SAT/TOEFL 모의고사 5회 이용권
  SUPPLEMENTALS: 1000,
  ADMIT_ITEM: 25,          // 합격 활동/합격 에세이 — 1건 열람당
} as const;

/** Canonical server-side cost for a paid unlock key. Unknown keys fail closed. */
export function unlockKeyCost(key: string): number | null {
  if (!key) return null;

  // Purchase markers record top-ups; they are not spendable unlocks.
  if (key.startsWith("creditpurchase:") || key.startsWith("credit_purchase:")) return 0;

  if (key === "res:/parents/story") return CREDIT_COSTS.STORY_BOOK;
  if (key === "res:/parents/essay") return CREDIT_COSTS.ADMIT_ITEM;
  if (key.startsWith("res:/parents/essay:")) return CREDIT_COSTS.ADMIT_ITEM;
  if (key === "res:/parents/activities/list") return CREDIT_COSTS.ACTIVITIES;
  if (key.startsWith("res:/parents/activities/item:")) return CREDIT_COSTS.ADMIT_ITEM;
  if (key.startsWith("res:/parents/activities/guide:")) return 500;
  if (key === "res:/parents/colleges") return CREDIT_COSTS.COLLEGE_DB;
  if (key === "res:/parents/cases") return CREDIT_COSTS.COLLEGE_DB;

  if (
    key === "res:/parents/competitions" ||
    key === "res:/parents/ap-guide" ||
    key === "res:/parents/study-method" ||
    key === "res:/parents/story-design" ||
    key === "res:/parents/math" ||
    key === "res:/parents/amc" ||
    key === "res:/parents/question-bank/exam"
  ) {
    return CREDIT_COSTS.GUIDE;
  }

  if (key === "parents:question-bank") return CREDIT_COSTS.QUESTION_BANK;
  if (key.startsWith("parents:question-bank:")) return CREDIT_COSTS.SUBJECT;
  if (key === "parents:core-notes") return CREDIT_COSTS.CORE_NOTES;
  if (key.startsWith("parents:core-notes:")) return CREDIT_COSTS.CORE_NOTES_SUBJECT;
  if (key === "parents:sat-mock:5") return CREDIT_COSTS.MOCK_5PACK;
  if (key === "parents:sat-mock") return CREDIT_COSTS.SAT_MOCK;
  if (key === "parents:ap-mock:5") return CREDIT_COSTS.MOCK_5PACK;
  if (key === "parents:ap-mock") return CREDIT_COSTS.AP_MOCK;
  if (key === "parents:toefl-mock:5") return CREDIT_COSTS.MOCK_5PACK;
  if (key === "parents:toefl-mock") return CREDIT_COSTS.TOEFL_MOCK;
  if (key === "parents:vocab") return CREDIT_COSTS.VOCAB;
  if (key.startsWith("admit-supplements:")) return CREDIT_COSTS.SUPPLEMENTALS;

  if (key.startsWith("material:")) return CREDIT_COSTS.NOTE_UNIT;
  if (key.startsWith("book:") || key.startsWith("textbook:")) return CREDIT_COSTS.TEXTBOOK;
  if (key.startsWith("vocab")) return CREDIT_COSTS.VOCAB;
  if (key.startsWith("qa-post:")) return 5;

  return null;
}

export function spendCostForUnlockKey(key: string): number {
  return unlockKeyCost(key) ?? 0;
}
