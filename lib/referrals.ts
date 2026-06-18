/**
 * Referral credits (client-side MVP). When someone signs up with your ID/code
 * you earn 20 credits. Login asks the new user for a referrer code; My Page
 * shows your code + a receipt of everyone who joined through you.
 *
 * Note: true cross-account crediting needs the backend (Supabase) — this MVP
 * tracks the flow per device so the UX/receipt works end-to-end.
 */

import { addCredits, hydrateCredits } from "./credits";
import { authFetch } from "@/lib/client-auth";

export const REFERRAL_REWARD = 20;

const CODE_KEY = "inhero-ref-code";
const REF_BY_KEY = "inhero-referred-by";
const REF_ANSWERED_KEY = "inhero-referral-answered";
const LEDGER_KEY = "inhero-referrals";

export interface Referral { name: string; date: string; reward: number }

function localDemoCreditsAllowed(): boolean {
  return typeof window !== "undefined" && ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

/** A stable shareable referral code for this user (generated once). */
export function getMyCode(): string {
  if (typeof window === "undefined") return "";
  let c = localStorage.getItem(CODE_KEY);
  if (!c) {
    c = "IH" + Math.random().toString(36).slice(2, 7).toUpperCase();
    localStorage.setItem(CODE_KEY, c);
  }
  return c;
}

export function referralAnswered(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem(REF_ANSWERED_KEY);
}

export function getReferredBy(): string | null {
  return typeof window === "undefined" ? null : localStorage.getItem(REF_BY_KEY);
}

/** Record the new user's answer to the login referral prompt (once). When
 *  signed in, this also tells the server, which credits the referrer +20. */
export function answerReferral(code: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REF_ANSWERED_KEY, "1");
  const c = code.trim();
  if (c) localStorage.setItem(REF_BY_KEY, c);
  authFetch("/api/credits/referral", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: c }),
  }).then(() => hydrateCredits()).catch(() => {});
}

export interface ServerReferralState {
  migrated: boolean;
  code?: string | null;
  referredBy?: string | null;
  referrals?: Referral[];
}

/** Account-backed referral state for My Page (receipt + code). */
export async function getServerReferralState(): Promise<ServerReferralState> {
  try {
    const r = await authFetch("/api/credits");
    const d = await r.json();
    if (!d?.migrated) return { migrated: false };
    return {
      migrated: true,
      code: d.code ?? null,
      referredBy: d.referredBy ?? null,
      referrals: (d.referrals ?? []).map((x: { name: string; date: string; reward: number }) => ({ name: x.name, date: x.date, reward: x.reward })),
    };
  } catch {
    return { migrated: false };
  }
}

export function getReferrals(): Referral[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LEDGER_KEY) || "[]") as Referral[];
  } catch {
    return [];
  }
}

export function totalReferralCredits(): number {
  return getReferrals().reduce((n, r) => n + r.reward, 0);
}

/** Add a referral (someone joined via your code) → +20 credits + receipt row. */
export function addReferral(name: string): Referral[] {
  const list = getReferrals();
  const next = [...list, { name: name || "익명 가입자", date: new Date().toISOString(), reward: REFERRAL_REWARD }];
  if (typeof window !== "undefined") localStorage.setItem(LEDGER_KEY, JSON.stringify(next));
  if (localDemoCreditsAllowed()) addCredits(REFERRAL_REWARD);
  return next;
}
