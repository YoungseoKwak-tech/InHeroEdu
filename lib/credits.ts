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

import { authFetch } from "@/lib/client-auth";

const BAL_KEY = "inhero-credits";
const UNLOCK_KEY = "inhero-credits-unlocked";
const MIGRATION_KEY = "inhero-credits-v2";
export const WELCOME_CREDITS = 200;
export const CREDIT_EVENT = "inhero:credits-changed";

function emit() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CREDIT_EVENT));
}

/** Reads balance, granting the one-time welcome credit on first access. */
export function getBalance(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(BAL_KEY);
  let bal = raw === null ? WELCOME_CREDITS : (Number(raw) || 0);
  if (raw === null) localStorage.setItem(BAL_KEY, String(WELCOME_CREDITS));
  // One-time top-up for early testers who received the old 20-credit welcome.
  if (!localStorage.getItem(MIGRATION_KEY)) {
    localStorage.setItem(MIGRATION_KEY, "1");
    if (bal < WELCOME_CREDITS) { bal = WELCOME_CREDITS; localStorage.setItem(BAL_KEY, String(bal)); }
  }
  return bal;
}

function setBalance(n: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BAL_KEY, String(Math.max(0, Math.round(n))));
  emit();
}

export function addCredits(n: number) {
  setBalance(getBalance() + n);
}

// ── Account-backed sync (when signed in + schema migrated) ─────────────────
let serverBacked = false;
export function isServerBacked() { return serverBacked; }

/** Pull balance + unlocks from the account; silently keeps local if not. */
export async function hydrateCredits(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const r = await authFetch("/api/credits");
    const d = await r.json();
    if (!d?.migrated) return;
    serverBacked = true;
    localStorage.setItem(BAL_KEY, String(d.balance ?? WELCOME_CREDITS));
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(d.unlocks ?? []));
    emit();
  } catch { /* offline / signed out → keep local cache */ }
}

/** Top up through the account (demo); falls back to local if not server-backed. */
export async function chargeServer(amount: number): Promise<void> {
  if (serverBacked) {
    try {
      const r = await authFetch("/api/credits/charge", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ credits: amount }),
      });
      const d = await r.json();
      if (d?.migrated) { localStorage.setItem(BAL_KEY, String(d.balance)); emit(); return; }
    } catch { /* fall through */ }
  }
  addCredits(amount);
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

function mirrorServerCredits(balance: number, unlocks?: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BAL_KEY, String(Math.max(0, Math.round(Number(balance) || 0))));
  if (Array.isArray(unlocks)) {
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocks));
  }
  emit();
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
  if (serverBacked) {
    authFetch("/api/credits/spend", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemKey: key, cost }),
    }).catch(() => {});
  }
  return true;
}

export interface SpendCreditsResult {
  ok: boolean;
  balance: number;
  unlocks?: string[];
  reason?: string;
  serverBacked: boolean;
}

/**
 * Account-safe spend path. If the signed-in user's credits are server-backed,
 * the server must confirm the deduction before localStorage is updated. This
 * avoids the "looks deducted, refresh restores it" bug caused by fire-and-forget
 * writes.
 */
export async function spendAndUnlockAccount(key: string, cost: number): Promise<SpendCreditsResult> {
  if (cost <= 0) {
    return { ok: true, balance: getBalance(), unlocks: [...getUnlocked()], serverBacked };
  }

  await hydrateCredits().catch(() => {});

  if (isUnlocked(key)) {
    unlock(key);
    return { ok: true, balance: getBalance(), unlocks: [...getUnlocked()], serverBacked };
  }

  if (serverBacked) {
    try {
      const r = await authFetch("/api/credits/spend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemKey: key, cost }),
      });
      const d = await r.json().catch(() => ({}));

      if (d?.migrated === false) {
        serverBacked = false;
      } else if (r.ok && typeof d?.balance === "number") {
        mirrorServerCredits(d.balance, d.unlocks);
        return {
          ok: !!d.ok,
          balance: d.balance,
          unlocks: Array.isArray(d.unlocks) ? d.unlocks : [...getUnlocked()],
          reason: d.reason,
          serverBacked: true,
        };
      } else {
        return {
          ok: false,
          balance: getBalance(),
          reason: d?.error || "server_error",
          serverBacked: true,
        };
      }
    } catch {
      return {
        ok: false,
        balance: getBalance(),
        reason: "network_error",
        serverBacked: true,
      };
    }
  }

  const ok = spendAndUnlock(key, cost);
  return {
    ok,
    balance: getBalance(),
    unlocks: [...getUnlocked()],
    reason: ok ? undefined : "insufficient",
    serverBacked: false,
  };
}

/**
 * Canonical content credit costs (master plan, ₩1,550/$). Keep gating costs
 * referencing these so pricing stays consistent across the portal.
 *   FREE   소통(Q&A)·합격수기 텍스트            0
 *   LIGHT  한국어 핵심노트(단원)·단어장          50–100
 *   MEDIUM 합격 에세이 원문·합격 활동 분석        250
 *   HEAVY  AP 디지털 교재 1권(1,000p)            500
 *   ULTRA  AP 문제은행 전체·SAT 모의고사 패키지   1,000
 */
export const CREDIT_COSTS = {
  FREE: 0,
  COLLEGE_DB: 25,    // 미국 대학 분석 DB (인재상·입시·인턴십) — matches the resource-card price
  NOTE_UNIT: 50,
  VOCAB: 100,
  ESSAY: 250,
  ACTIVITIES: 250,
  TEXTBOOK: 220,     // one digital textbook — 200 welcome + 20 referral reward = exactly 1 book (drives 지인 추천)
  // 한국어 핵심노트 & 문제은행: 과목당 200 / 전 과목 1000 (원하는 과목만 선택 잠금해제)
  SUBJECT: 200,            // unlock one subject (question bank)
  STORY_BOOK: 220,         // 합격 수기 책 (내가 아이비리그 공대에 오기까지) — 200 welcome + 20 referral
  CORE_NOTES_SUBJECT: 500, // unlock one Korean core-notes subject (premium/기밀)
  ALL_SUBJECTS: 1000,      // unlock every subject of that product
  QUESTION_BANK: 1000,     // legacy alias = whole question bank (= ALL_SUBJECTS)
  CORE_NOTES: 1000,        // alias = all Korean core notes
  SAT_MOCK: 1000,
  SUPPLEMENTALS: 1000,     // one school's supplemental admit essays (per 합격 프로필)
} as const;
