/**
 * InHero credits (client-side MVP). Balance + unlocked items live in
 * localStorage; a welcome grant lets new users taste premium content. Real
 * payment/earning hooks can replace addCredits later (Supabase + checkout).
 *
 * Tiers (per content value):
 *   Light  (단어장·개념정리·Q&A 열람)        free / 1–2
 *   Medium (문제은행 세트·교재 단원)          5–10
 *   Heavy  (합격 에세이·활동 분석·대학 분석)   20–30+
 */

const BAL_KEY = "inhero-credits";
const UNLOCK_KEY = "inhero-credits-unlocked";
const LOGIN_BONUS_KEY = "inhero-credits-login-bonus";
export const WELCOME_CREDITS = 20;
export const LOGIN_BONUS = 200;
export const CREDIT_EVENT = "inhero:credits-changed";

function emit() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CREDIT_EVENT));
}

/** Reads balance, granting the one-time welcome credit on first access. */
export function getBalance(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(BAL_KEY);
  if (raw === null) {
    localStorage.setItem(BAL_KEY, String(WELCOME_CREDITS));
    return WELCOME_CREDITS;
  }
  return Number(raw) || 0;
}

function setBalance(n: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BAL_KEY, String(Math.max(0, Math.round(n))));
  emit();
}

export function addCredits(n: number) {
  setBalance(getBalance() + n);
}

/** One-time login bonus — grants 200 credits the first time a user signs in. */
export function grantLoginBonus() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(LOGIN_BONUS_KEY)) return;
  localStorage.setItem(LOGIN_BONUS_KEY, "1");
  addCredits(LOGIN_BONUS);
}

export function getUnlocked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(UNLOCK_KEY) || "[]") as string[]);
  } catch {
    return new Set();
  }
}

export function isUnlocked(key: string): boolean {
  return getUnlocked().has(key);
}

function unlock(key: string) {
  const s = getUnlocked();
  s.add(key);
  if (typeof window !== "undefined") localStorage.setItem(UNLOCK_KEY, JSON.stringify([...s]));
}

/**
 * Spend `cost` credits to unlock `key`. Returns true if already unlocked or the
 * spend succeeded; false if the balance is insufficient.
 */
export function spendAndUnlock(key: string, cost: number): boolean {
  if (cost <= 0 || isUnlocked(key)) { if (cost > 0) unlock(key); return true; }
  const b = getBalance();
  if (b < cost) return false;
  setBalance(b - cost);
  unlock(key);
  return true;
}
