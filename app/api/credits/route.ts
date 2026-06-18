import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile, isSchemaMissing } from "@/lib/credits-server";
import { isAdminEmail } from "@/lib/adminEmails";
import { parseCreditServiceId } from "@/lib/creditPackages";
import { auditCredits, fundedUnlocks } from "@/lib/unlockCosts";

export const runtime = "nodejs";

/** GET /api/credits — the signed-in user's balance, code, unlocks, receipt. */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const profile = await ensureCreditProfile(supabase, user.id);
  if (!profile) return NextResponse.json({ migrated: false });

  const [{ data: refs, error }, { data: orders }] = await Promise.all([
    supabase
      .from("referrals")
      .select("referred_name, reward, created_at")
      .eq("referrer_user_id", user.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("orders")
      .select("service_id")
      .eq("user_id", user.id)
      .eq("status", "paid"),
  ]);
  if (error && isSchemaMissing(error)) return NextResponse.json({ migrated: false });

  const paidCredits = ((orders ?? []) as { service_id?: string | null }[]).reduce(
    (sum, order) => sum + (parseCreditServiceId(order.service_id ?? "")?.credits ?? 0),
    0,
  );
  const referralCredits = ((refs ?? []) as { reward?: number | null }[]).reduce(
    (sum, ref) => sum + Number(ref.reward ?? 0),
    0,
  );
  const audit = auditCredits({
    balance: profile.credits,
    unlocks: profile.credit_unlocks,
    paidCredits,
    referralCredits,
  });
  const unlocks = !isAdminEmail(user.email) && audit.anomaly
    ? fundedUnlocks(profile.credit_unlocks, audit.entitled - audit.balance)
    : profile.credit_unlocks;

  return NextResponse.json({
    migrated: true,
    balance: profile.credits,
    code: profile.referral_code,
    unlocks,
    creditAnomaly: audit.anomaly,
    referredBy: profile.referred_by,
    referrals: (refs ?? []).map((r) => ({ name: r.referred_name, date: r.created_at, reward: r.reward })),
  });
}
