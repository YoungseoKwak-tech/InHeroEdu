import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ensureCreditProfile } from "@/lib/credits-server";

export const runtime = "nodejs";

// Demo top-up amounts (until real payment is wired).
const ALLOWED = new Set([100, 200, 500, 1000]);

/** POST /api/credits/charge { credits } — add credits (demo top-up). */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

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
