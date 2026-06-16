import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile } from "@/lib/credits-server";

export const runtime = "nodejs";

// Demo top-up amounts (until real payment is wired).
const ALLOWED = new Set([100, 200, 500, 1000]);

// This free top-up route is a backdoor: any logged-in user could self-grant
// credits without paying. Fully disabled in production AND whenever real
// payment (NicePay) is live — credits must then come only from a confirmed
// NicePay order (see /api/payments/nicepay/approve → grantPurchasedCredits).
// It stays available only in local/preview dev so the credit UI is testable.
const DEMO_BLOCKED =
  process.env.VERCEL_ENV === "production" ||
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_NICEPAY_ENABLED === "true";

/** POST /api/credits/charge { credits } — add credits (demo top-up, dev only). */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  if (DEMO_BLOCKED) {
    return NextResponse.json(
      { error: "demo top-up disabled — real payment required" },
      { status: 403 },
    );
  }

  const { credits } = await req.json().catch(() => ({}));
  if (!ALLOWED.has(credits)) {
    return NextResponse.json({ error: "invalid amount" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const profile = await ensureCreditProfile(supabase, user.id);
  if (!profile) return NextResponse.json({ migrated: false });

  const nextBalance = profile.credits + credits;
  const { error } = await supabase.from("profiles").update({ credits: nextBalance }).eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ migrated: true, balance: nextBalance });
}
