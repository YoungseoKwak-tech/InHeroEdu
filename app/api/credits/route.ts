import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile, isSchemaMissing } from "@/lib/credits-server";

export const runtime = "nodejs";

/** GET /api/credits — the signed-in user's balance, code, unlocks, receipt. */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const profile = await ensureCreditProfile(supabase, user.id);
  if (!profile) return NextResponse.json({ migrated: false });

  const { data: refs, error } = await supabase
    .from("referrals")
    .select("referred_name, reward, created_at")
    .eq("referrer_user_id", user.id)
    .order("created_at", { ascending: true });
  if (error && isSchemaMissing(error)) return NextResponse.json({ migrated: false });

  return NextResponse.json({
    migrated: true,
    balance: profile.credits,
    code: profile.referral_code,
    unlocks: profile.credit_unlocks,
    referredBy: profile.referred_by,
    referrals: (refs ?? []).map((r) => ({ name: r.referred_name, date: r.created_at, reward: r.reward })),
  });
}
