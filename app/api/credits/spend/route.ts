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
  if (
    typeof itemKey !== "string" ||
    !itemKey.trim() ||
    itemKey.length > 240 ||
    typeof cost !== "number" ||
    !Number.isFinite(cost) ||
    cost < 0 ||
    !Number.isInteger(cost)
  ) {
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
  const { data: updated, error } = await supabase
    .from("profiles")
    .update({ credits: nextBalance, credit_unlocks: nextUnlocks })
    .eq("id", user.id)
    .gte("credits", cost)
    .not("credit_unlocks", "cs", JSON.stringify([itemKey]))
    .select("credits, credit_unlocks")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!updated) {
    const fresh = await ensureCreditProfile(supabase, user.id);
    if (!fresh) return NextResponse.json({ migrated: false });
    if (fresh.credit_unlocks.includes(itemKey)) {
      return NextResponse.json({ migrated: true, ok: true, balance: fresh.credits, unlocks: fresh.credit_unlocks });
    }
    return NextResponse.json({ migrated: true, ok: false, reason: "insufficient", balance: fresh.credits, unlocks: fresh.credit_unlocks });
  }

  return NextResponse.json({
    migrated: true,
    ok: true,
    balance: Number(updated.credits ?? nextBalance),
    unlocks: Array.isArray(updated.credit_unlocks) ? updated.credit_unlocks : nextUnlocks,
  });
}
