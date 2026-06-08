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

/** Grant the credits for a paid `credits:<id>` order (called from approve). */
export async function grantPurchasedCredits(
  supabase: SupabaseClient,
  userId: string,
  serviceId: string
): Promise<void> {
  const pkg = parseCreditServiceId(serviceId);
  if (!pkg) return;
  const profile = await ensureCreditProfile(supabase, userId);
  if (!profile) return;
  await supabase.from("profiles").update({ credits: profile.credits + pkg.credits }).eq("id", userId);
}
