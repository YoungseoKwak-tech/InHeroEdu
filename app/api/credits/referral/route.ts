import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile, isSchemaMissing, REFERRAL_REWARD } from "@/lib/credits-server";

export const runtime = "nodejs";

/**
 * POST /api/credits/referral { code }
 * Records who referred the signed-in user (once) and credits the referrer
 * +20. Returns { credited } so the client can confirm.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { code } = await req.json().catch(() => ({}));
  const trimmed = typeof code === "string" ? code.trim() : "";

  const supabase = createAdminClient();
  const me = await ensureCreditProfile(supabase, user.id);
  if (!me) return NextResponse.json({ migrated: false });

  // Already referred, or no code given → nothing to do.
  if (me.referred_by) return NextResponse.json({ migrated: true, ok: true, credited: false, alreadyReferred: true });
  if (!trimmed) return NextResponse.json({ migrated: true, ok: true, credited: false });

  // Record what the user typed (even if it doesn't match anyone).
  await supabase.from("profiles").update({ referred_by: trimmed }).eq("id", user.id);

  // Find the referrer by code (can't refer yourself).
  const { data: referrer, error } = await supabase
    .from("profiles")
    .select("id, credits, name")
    .eq("referral_code", trimmed)
    .neq("id", user.id)
    .maybeSingle();
  if (error && isSchemaMissing(error)) return NextResponse.json({ migrated: false });
  if (!referrer) return NextResponse.json({ migrated: true, ok: true, credited: false });

  // My display name for the referrer's receipt.
  const { data: meRow } = await supabase.from("profiles").select("name").eq("id", user.id).maybeSingle();
  const referredName = (meRow?.name as string | null) || user.email || "익명 가입자";

  // Record the referral relationship (unique index blocks duplicates for the
  // same referee). NOTE: the +20 reward is NOT paid here. Anti-farm: the reward
  // only materializes once this referee makes a confirmed paid order, granted
  // lazily via reconcileReferralGrants on the referrer's next credits read.
  // This kills self-referral spam — fake free signups never pay → zero credit.
  const ins = await supabase.from("referrals").insert({
    referrer_user_id: referrer.id,
    referred_user_id: user.id,
    referred_name: referredName,
    reward: REFERRAL_REWARD,
  });
  if (ins.error) {
    // Already recorded (unique violation) — treat as success, no double record.
    return NextResponse.json({ migrated: true, ok: true, credited: false, alreadyReferred: true });
  }

  // Recorded — but payout is pending the referee's first confirmed purchase.
  return NextResponse.json({ migrated: true, ok: true, credited: false, pending: true });
}
