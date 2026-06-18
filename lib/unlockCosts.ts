/**
 * Resolve a `profiles.credit_unlocks` key back to the credit cost it should
 * have charged. Credits have no ledger table, so the unlock array IS the spend
 * history — this map lets the admin dashboard reconstruct "how much was spent"
 * and flag accounts whose spend exceeds what they were legitimately entitled to
 * (welcome grant + confirmed paid orders) — i.e. unpaid/anomalous unlocks.
 *
 * Costs mirror CREDIT_COSTS in lib/creditPolicy.ts. Unknown keys resolve to 0 so we
 * never over-flag; the goal is catching clear "unlocked without paying" cases.
 */
import { WELCOME_CREDITS, unlockKeyCost } from "@/lib/creditPolicy";

export { WELCOME_CREDITS };

/** Best-effort cost for one unlock key. Markers (credit purchases) cost 0. */
export function auditUnlockKeyCost(key: string): number {
  // Legacy key from the old parent resource card. It no longer unlocks the
  // activities API, but keeping its intended value makes leaked grants visible.
  if (key === "res:/parents/activities") return 250;
  return unlockKeyCost(key) ?? 0;
}

/** Sum the spend implied by an unlock array. */
export function spentFromUnlocks(unlocks: string[]): number {
  return (unlocks ?? []).reduce((sum, k) => sum + auditUnlockKeyCost(k), 0);
}

/**
 * Keep only the unlocks that can be funded by the user's legitimate spent
 * budget. `credit_unlocks` is append-only, so preserving order is our best
 * ledger substitute until a real credit_ledger table exists.
 */
export function fundedUnlocks(unlocks: string[], spentBudget: number): string[] {
  const allowed: string[] = [];
  let spent = 0;
  const budget = Math.max(0, spentBudget);

  for (const key of unlocks ?? []) {
    const cost = auditUnlockKeyCost(key);
    if (cost <= 0) {
      allowed.push(key);
      continue;
    }
    if (spent + cost <= budget + 5) {
      spent += cost;
      allowed.push(key);
    }
  }

  return allowed;
}

export interface CreditAudit {
  welcome: number;
  paidCredits: number;   // credits granted by confirmed paid orders
  referralCredits: number; // credits granted by confirmed referrals
  entitled: number;      // welcome + paidCredits + referralCredits
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
export function auditCredits(opts: { balance: number; unlocks: string[]; paidCredits: number; referralCredits?: number }): CreditAudit {
  const welcome = WELCOME_CREDITS;
  const spent = spentFromUnlocks(opts.unlocks);
  const referralCredits = opts.referralCredits ?? 0;
  const entitled = welcome + opts.paidCredits + referralCredits;
  const unaccounted = entitled - (opts.balance + spent);
  // Tolerance absorbs rounding / cost-map drift; anything beyond is real.
  const anomaly = opts.balance + spent > entitled + 5;
  return { welcome, paidCredits: opts.paidCredits, referralCredits, entitled, spent, balance: opts.balance, unaccounted, anomaly };
}
