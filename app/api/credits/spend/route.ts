import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile } from "@/lib/credits-server";

export const runtime = "nodejs";

/** POST /api/credits/spend { itemKey, cost } — deduct credits & record unlock. */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { itemKey, cost } = await req.json().catch(() => ({}));
  if (!itemKey || typeof cost !== "number" || cost < 0) {
    return NextResponse.json({ error: "itemKey and cost required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const profile = await ensureCreditProfile(supabase, user.id);
  if (!profile) return NextResponse.json({ migrated: false });

  // Already unlocked → idempotent success, no charge.
  if (profile.credit_unlocks.includes(itemKey)) {
    return NextResponse.json({ migrated: true, ok: true, balance: profile.credits, unlocks: profile.credit_unlocks });
  }
  if (profile.credits < cost) {
    return NextResponse.json({ migrated: true, ok: false, reason: "insufficient", balance: profile.credits, unlocks: profile.credit_unlocks });
  }

  const nextBalance = profile.credits - cost;
  const nextUnlocks = [...profile.credit_unlocks, itemKey];
  const { error } = await supabase
    .from("profiles")
    .update({ credits: nextBalance, credit_unlocks: nextUnlocks })
    .eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ migrated: true, ok: true, balance: nextBalance, unlocks: nextUnlocks });
}
