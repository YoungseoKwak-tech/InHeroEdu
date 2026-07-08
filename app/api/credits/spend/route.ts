import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile } from "@/lib/credits-server";
import { unlockKeyCost } from "@/lib/creditPolicy";

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
    (cost !== undefined && (
      typeof cost !== "number" ||
      !Number.isFinite(cost) ||
      cost < 0 ||
      !Number.isInteger(cost)
    ))
  ) {
    return NextResponse.json({ error: "invalid spend request" }, { status: 400 });
  }

  const normalizedItemKey = itemKey.trim();
  const canonicalCost = unlockKeyCost(normalizedItemKey);
  if (canonicalCost == null || canonicalCost <= 0) {
    return NextResponse.json({ error: "unknown paid unlock", itemKey: normalizedItemKey }, { status: 400 });
  }
  if (typeof cost === "number" && cost !== canonicalCost) {
    return NextResponse.json(
      { error: "credit cost mismatch", itemKey: normalizedItemKey, expectedCost: canonicalCost, receivedCost: cost },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();
  const profile = await ensureCreditProfile(supabase, user.id);
  if (!profile) return NextResponse.json({ migrated: false });

  // Already unlocked → idempotent success. credit_unlocks is append-only
  // ownership; once unlocked it stays unlocked ("처음 unlock 했으면 쭉 되게").
  // No re-audit or re-charge — a book a parent already unlocked must keep
  // working even if the credit audit later flags the account.
  if (profile.credit_unlocks.includes(normalizedItemKey)) {
    return NextResponse.json({ migrated: true, ok: true, balance: profile.credits, unlocks: profile.credit_unlocks });
  }
  if (profile.credits < canonicalCost) {
    return NextResponse.json({ migrated: true, ok: false, reason: "insufficient", balance: profile.credits, unlocks: profile.credit_unlocks });
  }

  const nextBalance = profile.credits - canonicalCost;
  const nextUnlocks = [...profile.credit_unlocks, normalizedItemKey];
  const { data: updated, error } = await supabase
    .from("profiles")
    .update({ credits: nextBalance, credit_unlocks: nextUnlocks })
    .eq("id", user.id)
    .gte("credits", canonicalCost)
    .not("credit_unlocks", "cs", JSON.stringify([normalizedItemKey]))
    .select("credits, credit_unlocks")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!updated) {
    const fresh = await ensureCreditProfile(supabase, user.id);
    if (!fresh) return NextResponse.json({ migrated: false });
    if (fresh.credit_unlocks.includes(normalizedItemKey)) {
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
