import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile } from "@/lib/credits-server";
import { unlockKeyCost } from "@/lib/creditPolicy";
import { parseCreditServiceId } from "@/lib/creditPackages";
import { auditCredits, fundedUnlocks } from "@/lib/unlockCosts";

export const runtime = "nodejs";

async function confirmedCreditFunding(supabase: ReturnType<typeof createAdminClient>, userId: string) {
  const [{ data: orders }, { data: referrals }] = await Promise.all([
    supabase
      .from("orders")
      .select("service_id")
      .eq("user_id", userId)
      .eq("status", "paid"),
    supabase
      .from("referrals")
      .select("reward")
      .eq("referrer_user_id", userId),
  ]);

  const paidCredits = ((orders ?? []) as Record<string, unknown>[]).reduce((sum, order) => {
    const serviceId = typeof order.service_id === "string" ? order.service_id : "";
    return sum + (parseCreditServiceId(serviceId)?.credits ?? 0);
  }, 0);
  const referralCredits = ((referrals ?? []) as Record<string, unknown>[]).reduce(
    (sum, referral) => sum + Number(referral.reward ?? 0),
    0,
  );

  return { paidCredits, referralCredits };
}

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

  const funding = await confirmedCreditFunding(supabase, user.id);
  const audit = auditCredits({
    balance: profile.credits,
    unlocks: profile.credit_unlocks,
    paidCredits: funding.paidCredits,
    referralCredits: funding.referralCredits,
  });

  // Already unlocked → idempotent success only for accounts that pass funding
  // audit. If the existing unlock leaked in unpaid, require a real balance
  // deduction now before treating it as owned.
  if (profile.credit_unlocks.includes(normalizedItemKey)) {
    const funded = audit.anomaly
      ? fundedUnlocks(profile.credit_unlocks, audit.entitled - audit.balance)
      : profile.credit_unlocks;
    if (funded.includes(normalizedItemKey)) {
      return NextResponse.json({ migrated: true, ok: true, balance: profile.credits, unlocks: funded });
    }
    if (audit.anomaly) {
      if (profile.credits < canonicalCost) {
        return NextResponse.json({
          migrated: true,
          ok: false,
          reason: "insufficient",
          balance: profile.credits,
          unlocks: funded,
        });
      }
      const nextFunded = fundedUnlocks(profile.credit_unlocks, audit.entitled - (profile.credits - canonicalCost));
      if (!nextFunded.includes(normalizedItemKey)) {
        return NextResponse.json({
          migrated: true,
          ok: false,
          reason: "account_anomaly",
          balance: profile.credits,
          unlocks: funded,
        });
      }
      const paidDown = profile.credits - canonicalCost;
      const { data: updated, error } = await supabase
        .from("profiles")
        .update({ credits: paidDown })
        .eq("id", user.id)
        .gte("credits", canonicalCost)
        .select("credits, credit_unlocks")
        .maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!updated) {
        const fresh = await ensureCreditProfile(supabase, user.id);
        return NextResponse.json({
          migrated: true,
          ok: false,
          reason: "insufficient",
          balance: fresh?.credits ?? profile.credits,
          unlocks: funded,
        });
      }
      return NextResponse.json({
        migrated: true,
        ok: true,
        balance: Number(updated.credits ?? paidDown),
        unlocks: nextFunded,
      });
    }
  }
  if (audit.anomaly) {
    return NextResponse.json({
      migrated: true,
      ok: false,
      reason: "account_anomaly",
      balance: profile.credits,
      unlocks: fundedUnlocks(profile.credit_unlocks, audit.entitled - audit.balance),
    });
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
