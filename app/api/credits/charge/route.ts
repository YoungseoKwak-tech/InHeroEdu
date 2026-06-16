import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile } from "@/lib/credits-server";

export const runtime = "nodejs";

// Demo top-up amounts (until real payment is wired).
const ALLOWED = new Set([100, 200, 500, 1000]);

// Once real payment (NicePay) is live, this free top-up route is a backdoor:
// any logged-in user could self-grant credits without paying. Disable it
// whenever NicePay is enabled — credits must then come only from a confirmed
// payment. Flip NEXT_PUBLIC_NICEPAY_ENABLED back off to re-open demo mode.
const PAYMENTS_LIVE = process.env.NEXT_PUBLIC_NICEPAY_ENABLED === "true";

/** POST /api/credits/charge { credits } — add credits (demo top-up). */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  if (PAYMENTS_LIVE) {
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
