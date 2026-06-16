/**
 * Resolve a `profiles.credit_unlocks` key back to the credit cost it should
 * have charged. Credits have no ledger table, so the unlock array IS the spend
 * history — this map lets the admin dashboard reconstruct "how much was spent"
 * and flag accounts whose spend exceeds what they were legitimately entitled to
 * (welcome grant + confirmed paid orders) — i.e. unpaid/anomalous unlocks.
 *
 * Costs mirror CREDIT_COSTS in lib/credits.ts. Unknown keys resolve to 0 so we
 * never over-flag; the goal is catching clear "unlocked without paying" cases.
 */
import { CREDIT_COSTS, WELCOME_CREDITS } from "@/lib/credits";

export { WELCOME_CREDITS };

/** Best-effort cost for one unlock key. Markers (credit purchases) cost 0. */
export function unlockKeyCost(key: string): number {
  if (!key) return 0;
  // Purchase markers — not a spend, they RECORD a top-up.
  if (key.startsWith("creditpurchase:") || key.startsWith("credit_purchase:")) return 0;

  // Parent resource cards (res:/parents/*)
  if (key.startsWith("res:/parents/")) {
    if (key.includes("/story")) return CREDIT_COSTS.STORY_BOOK;     // 220
    if (key.includes("/essay")) return CREDIT_COSTS.ESSAY;          // 250
    if (key.includes("/activities")) return CREDIT_COSTS.ACTIVITIES;// 250
    if (key.includes("/colleges")) return CREDIT_COSTS.COLLEGE_DB;  // 25
    if (key.includes("/cases")) return CREDIT_COSTS.COLLEGE_DB;     // 25
    return CREDIT_COSTS.COLLEGE_DB;                                  // default card = 25
  }

  // Question bank / core notes per-subject or all
  if (key.startsWith("parents:question-bank:")) return key.endsWith(":all") ? CREDIT_COSTS.ALL_SUBJECTS : CREDIT_COSTS.SUBJECT;
  if (key.startsWith("parents:core-notes:")) return key.endsWith(":all") ? CREDIT_COSTS.CORE_NOTES : CREDIT_COSTS.CORE_NOTES_SUBJECT;
  if (key.startsWith("parents:sat-mock")) return CREDIT_COSTS.SAT_MOCK;          // 1000
  if (key.startsWith("parents:supplementals")) return CREDIT_COSTS.SUPPLEMENTALS;// 1000

  // Ivy-student materials, textbooks, Q&A peeks
  if (key.startsWith("material:")) return CREDIT_COSTS.NOTE_UNIT;   // 50
  if (key.startsWith("textbook:")) return CREDIT_COSTS.TEXTBOOK;    // 220
  if (key.startsWith("vocab")) return CREDIT_COSTS.VOCAB;           // 100
  if (key.startsWith("qa-post:")) return 5;

  return 0;
}

/** Sum the spend implied by an unlock array. */
export function spentFromUnlocks(unlocks: string[]): number {
  return (unlocks ?? []).reduce((sum, k) => sum + unlockKeyCost(k), 0);
}

export interface CreditAudit {
  welcome: number;
  paidCredits: number;   // credits granted by confirmed paid orders
  entitled: number;      // welcome + paidCredits
  spent: number;         // sum of unlock costs
  balance: number;       // current account balance
  /** entitled - (balance + spent). Negative = credits appeared from nowhere. */
  unaccounted: number;
  /** True when more was spent/held than legitimately granted (free/demo credits). */
  anomaly: boolean;
}

/**
 * Audit one account. `paidCredits` is the total credits from CONFIRMED paid
 * orders. An anomaly = the account spent + still holds more than welcome + paid
 * could fund (with a tiny tolerance), meaning unpaid/demo credits leaked in.
 */
export function auditCredits(opts: { balance: number; unlocks: string[]; paidCredits: number }): CreditAudit {
  const welcome = WELCOME_CREDITS;
  const spent = spentFromUnlocks(opts.unlocks);
  const entitled = welcome + opts.paidCredits;
  const unaccounted = entitled - (opts.balance + spent);
  // Tolerance absorbs rounding / cost-map drift; anything beyond is real.
  const anomaly = opts.balance + spent > entitled + 5;
  return { welcome, paidCredits: opts.paidCredits, entitled, spent, balance: opts.balance, unaccounted, anomaly };
}
