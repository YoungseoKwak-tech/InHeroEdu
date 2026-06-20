/**
 * Server-side unlock enforcement for gated content APIs.
 *
 * The portal's credit gates were client-only (CreditGate just CSS-blurs content
 * that already shipped to the browser). Content APIs must instead check the
 * caller's server-recorded unlocks (profiles.credit_unlocks) and only return
 * the paid payload to holders/admins — returning a free preview to everyone
 * else. This module centralizes that check so every gated route does it the
 * same way.
 */
import type { NextRequest } from "next/server";
import { getAuthenticatedUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { parseCreditServiceId } from "@/lib/creditPackages";
import { confirmedReferralCredits } from "@/lib/credits-server";
import { auditCredits, fundedUnlocks } from "@/lib/unlockCosts";

export interface UnlockContext {
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
  unlocks: string[];
  creditAnomaly?: boolean;
}

/** Resolve the caller's identity + server-recorded unlocks (no 401 — anonymous
 *  callers get an empty context so routes can still serve a free preview). */
export async function getUnlockContext(req: Request | NextRequest): Promise<UnlockContext> {
  const user = await getAuthenticatedUser(req);
  if (!user) return { userId: null, email: null, isAdmin: false, unlocks: [] };
  const isAdmin = isAdminEmail(user.email);
  let unlocks: string[] = [];
  let creditAnomaly = false;
  try {
    const sb = createAdminClient();
    const { data } = await sb
      .from("profiles")
      .select("credits, credit_unlocks")
      .eq("id", user.id)
      .maybeSingle();
    if (Array.isArray(data?.credit_unlocks)) unlocks = data!.credit_unlocks as string[];
    if (!isAdmin) {
      const [{ data: orders }, referralCredits] = await Promise.all([
        sb
          .from("orders")
          .select("service_id")
          .eq("user_id", user.id)
          .eq("status", "paid"),
        // Only paid-referee referrals count — blocks self-referral farming.
        confirmedReferralCredits(sb, user.id),
      ]);
      const paidCredits = ((orders ?? []) as Record<string, unknown>[]).reduce((sum, order) => {
        const serviceId = typeof order.service_id === "string" ? order.service_id : "";
        return sum + (parseCreditServiceId(serviceId)?.credits ?? 0);
      }, 0);
      const audit = auditCredits({
        balance: Number(data?.credits ?? 0),
        unlocks,
        paidCredits,
        referralCredits,
      });
      if (audit.anomaly) {
        creditAnomaly = true;
        unlocks = fundedUnlocks(unlocks, audit.entitled - audit.balance);
      }
    }
  } catch {
    /* can't read unlocks → treat as none (fail closed for paid content) */
  }
  return { userId: user.id, email: user.email ?? null, isAdmin, unlocks, creditAnomaly };
}

/** True when the caller is an admin or holds ANY of the given unlock keys. */
export function hasAnyUnlock(ctx: UnlockContext, keys: string[]): boolean {
  return ctx.isAdmin || keys.some((k) => ctx.unlocks.includes(k));
}
