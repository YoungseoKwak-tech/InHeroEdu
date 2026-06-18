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

import { authFetch, getClientSession } from "@/lib/client-auth";
import { CREDIT_COSTS, WELCOME_CREDITS } from "@/lib/creditPolicy";

export { CREDIT_COSTS, WELCOME_CREDITS } from "@/lib/creditPolicy";

const BAL_KEY = "inhero-credits";
const UNLOCK_KEY = "inhero-credits-unlocked";
const MIGRATION_KEY = "inhero-credits-v2";
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

function localDemoCreditsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

/** Pull balance + unlocks from the account; returns true only when confirmed. */
export async function hydrateCredits(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const r = await authFetch("/api/credits");
    const d = await r.json();
    if (!r.ok || !d?.migrated) return false;
    serverBacked = true;
    localStorage.setItem(BAL_KEY, String(d.balance ?? WELCOME_CREDITS));
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(d.unlocks ?? []));
    emit();
    return true;
  } catch {
    return false;
  }
}

/** Top up through the account (demo/dev only). Never mint local credits in prod. */
export async function chargeServer(amount: number): Promise<boolean> {
  let loggedIn = false;
  try { loggedIn = !!(await getClientSession())?.user; } catch { /* ignore */ }

  if (serverBacked || loggedIn) {
    try {
      const r = await authFetch("/api/credits/charge", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ credits: amount }),
      });
      const d = await r.json();
      if (r.ok && d?.migrated) {
        localStorage.setItem(BAL_KEY, String(d.balance));
        emit();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  if (!localDemoCreditsAllowed()) return false;
  addCredits(amount);
  return true;
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
  if (serverBacked || !localDemoCreditsAllowed()) return false;
  if (cost <= 0 || isUnlocked(key)) { if (cost > 0) unlock(key); return true; }
  const b = getBalance();
  if (b < cost) return false;
  setBalance(b - cost);
  unlock(key);
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

  // SECURITY: a signed-in user's paid unlock must be confirmed by the server.
  // Knowing whether they're logged in lets us refuse the client-only fallback
  // below — that local (localStorage/demo-credit) path is exactly how unpaid
  // unlocks slipped in. Logged-out visitors can't reach paid content anyway
  // (every gated caller requires sign-in first).
  let loggedIn = false;
  try { loggedIn = !!(await getClientSession())?.user; } catch { /* treat as logged-out */ }

  if (isUnlocked(key) && !loggedIn) {
    unlock(key);
    return { ok: true, balance: getBalance(), unlocks: [...getUnlocked()], serverBacked };
  }

  // A transient hydrate miss would otherwise refuse a legit logged-in unlock and
  // surface a "credit error". Retry once so a network blip doesn't block it.
  if (loggedIn && !serverBacked) {
    await hydrateCredits().catch(() => {});
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

  // Not server-backed. For a signed-in user this means the account credits
  // couldn't be confirmed (schema/network) — REFUSE rather than grant a free
  // local unlock. Only genuinely logged-out callers fall back to the legacy
  // localStorage path (and they can't reach paid content without signing in).
  if (loggedIn) {
    return { ok: false, balance: getBalance(), reason: "server_required", serverBacked: false };
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
