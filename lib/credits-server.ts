import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { parseCreditServiceId } from "./creditPackages";

export const WELCOME_CREDITS = 200;
export const REFERRAL_REWARD = 20;

/** True if a supabase error looks like the credits/referrals schema is missing. */
export function isSchemaMissing(error: { message?: string } | null): boolean {
  if (!error?.message) return false;
  return /(credits|referral_code|referred_by|credit_unlocks|referrals|column .* does not exist|relation .* does not exist)/i.test(error.message);
}

function genCode(): string {
  return "IH" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

interface CreditProfile {
  credits: number;
  referral_code: string | null;
  referred_by: string | null;
  credit_unlocks: string[];
}

export interface CreditGrantResult {
  ok: boolean;
  grantedCredits: number;
  balance?: number;
  alreadyGranted?: boolean;
  reason?: string;
}

/**
 * Reads the user's credit profile, creating the row / welcome grant / referral
 * code as needed. Returns null if the schema isn't migrated yet (caller should
 * fall back to client storage).
 */
export async function ensureCreditProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<CreditProfile | null> {
  const sel = "credits, referral_code, referred_by, credit_unlocks";
  let { data, error } = await supabase.from("profiles").select(sel).eq("id", userId).maybeSingle();
  if (error && isSchemaMissing(error)) return null;

  if (!data) {
    const ins = await supabase.from("profiles").upsert({ id: userId, credits: WELCOME_CREDITS }, { onConflict: "id" });
    if (ins.error && isSchemaMissing(ins.error)) return null;
    ({ data, error } = await supabase.from("profiles").select(sel).eq("id", userId).maybeSingle());
    if (error && isSchemaMissing(error)) return null;
  }
  if (!data) return null;

  let code = data.referral_code as string | null;
  if (!code) {
    for (let i = 0; i < 5; i++) {
      const candidate = genCode();
      const upd = await supabase.from("profiles").update({ referral_code: candidate }).eq("id", userId);
      if (!upd.error) { code = candidate; break; }
      if (isSchemaMissing(upd.error)) return null;
    }
  }

  return {
    credits: Number(data.credits ?? WELCOME_CREDITS),
    referral_code: code,
    referred_by: (data.referred_by as string | null) ?? null,
    credit_unlocks: Array.isArray(data.credit_unlocks) ? (data.credit_unlocks as string[]) : [],
  };
}

function creditPurchaseMarker(orderId: string) {
  return `credit_purchase:${orderId}`;
}

/** 0-cost marker recording that a referrer was already paid for referee X. */
function referralRewardMarker(refereeUserId: string) {
  return `referral_reward:${refereeUserId}`;
}

/**
 * Credits a referrer has legitimately EARNED — counted only for referrals whose
 * referee made a confirmed paid order. This is the anti-farm guard: fake free
 * signups never pay, so self-referral spam yields zero spendable credit.
 */
export async function confirmedReferralCredits(
  supabase: SupabaseClient,
  userId: string,
): Promise<number> {
  const { data: refs } = await supabase
    .from("referrals")
    .select("referred_user_id, reward")
    .eq("referrer_user_id", userId);
  const rows = (refs ?? []) as { referred_user_id?: string | null; reward?: number | null }[];
  const refereeIds = rows.map((r) => r.referred_user_id).filter((x): x is string => !!x);
  if (refereeIds.length === 0) return 0;

  const { data: paid } = await supabase
    .from("orders")
    .select("user_id")
    .eq("status", "paid")
    .in("user_id", refereeIds);
  const paidSet = new Set(((paid ?? []) as { user_id?: string | null }[]).map((o) => o.user_id));

  return rows.reduce(
    (sum, r) => sum + (r.referred_user_id && paidSet.has(r.referred_user_id) ? Number(r.reward ?? 0) : 0),
    0,
  );
}

/**
 * Self-healing referral payout. A referrer is credited +reward into their
 * BALANCE only once a referee has actually paid — granted lazily the next time
 * the referrer's credits are read. Idempotent via referral_reward:<refereeId>
 * markers, so it never double-pays. Mutates `profile` in place and returns the
 * (possibly updated) balance.
 */
export async function reconcileReferralGrants(
  supabase: SupabaseClient,
  profile: CreditProfile,
  userId: string,
): Promise<number> {
  const { data: refs } = await supabase
    .from("referrals")
    .select("referred_user_id, reward")
    .eq("referrer_user_id", userId);
  const rows = (refs ?? []) as { referred_user_id?: string | null; reward?: number | null }[];
  const refereeIds = rows.map((r) => r.referred_user_id).filter((x): x is string => !!x);
  if (refereeIds.length === 0) return profile.credits;

  const { data: paid } = await supabase
    .from("orders")
    .select("user_id")
    .eq("status", "paid")
    .in("user_id", refereeIds);
  const paidSet = new Set(((paid ?? []) as { user_id?: string | null }[]).map((o) => o.user_id));

  const newMarkers: string[] = [];
  let delta = 0;
  for (const r of rows) {
    if (!r.referred_user_id || !paidSet.has(r.referred_user_id)) continue;
    const marker = referralRewardMarker(r.referred_user_id);
    if (profile.credit_unlocks.includes(marker) || newMarkers.includes(marker)) continue;
    delta += Number(r.reward ?? REFERRAL_REWARD);
    newMarkers.push(marker);
  }
  if (delta <= 0) return profile.credits;

  const nextBalance = profile.credits + delta;
  const nextUnlocks = [...profile.credit_unlocks, ...newMarkers];
  const { error } = await supabase
    .from("profiles")
    .update({ credits: nextBalance, credit_unlocks: nextUnlocks })
    .eq("id", userId);
  if (error) return profile.credits; // best-effort; will retry on next read
  profile.credits = nextBalance;
  profile.credit_unlocks = nextUnlocks;
  return nextBalance;
}

/** Grant the credits for a paid `credits:<id>` order (called from approve/confirm). */
export async function grantPurchasedCredits(
  supabase: SupabaseClient,
  userId: string,
  serviceId: string,
  orderId?: string
): Promise<CreditGrantResult> {
  const pkg = parseCreditServiceId(serviceId);
  if (!pkg) return { ok: true, grantedCredits: 0, reason: "not_credit_order" };

  const profile = await ensureCreditProfile(supabase, userId);
  if (!profile) {
    return {
      ok: false,
      grantedCredits: 0,
      reason: "credits_schema_missing",
    };
  }

  const marker = orderId ? creditPurchaseMarker(orderId) : null;
  if (marker && profile.credit_unlocks.includes(marker)) {
    return {
      ok: true,
      grantedCredits: 0,
      balance: profile.credits,
      alreadyGranted: true,
    };
  }

  const nextBalance = profile.credits + pkg.credits;
  const nextUnlocks = marker
    ? [...profile.credit_unlocks, marker]
    : profile.credit_unlocks;

  const { error } = await supabase
    .from("profiles")
    .update({
      credits: nextBalance,
      ...(marker ? { credit_unlocks: nextUnlocks } : {}),
    })
    .eq("id", userId);

  if (error) {
    if (isSchemaMissing(error)) {
      return {
        ok: false,
        grantedCredits: 0,
        reason: "credits_schema_missing",
      };
    }
    throw error;
  }

  return {
    ok: true,
    grantedCredits: pkg.credits,
    balance: nextBalance,
  };
}
