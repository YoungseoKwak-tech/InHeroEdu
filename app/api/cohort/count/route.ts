import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { FOUNDING_COHORT_CAP } from "@/lib/trajectory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/cohort/count — how many of the FOUNDING_COHORT_CAP seats are claimed. */
export async function GET() {
  const supabase = createAdminClient();
  const { count } = await supabase
    .from("profiles_public")
    .select("*", { count: "exact", head: true });
  const claimed = typeof count === "number" ? count : 0;
  return NextResponse.json({
    ok: true,
    cap: FOUNDING_COHORT_CAP,
    claimed,
    remaining: Math.max(0, FOUNDING_COHORT_CAP - claimed),
  });
}
