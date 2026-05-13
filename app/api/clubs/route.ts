import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { toClubPublic, type ClubRow } from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/clubs — list active clubs (admin-curated) with member counts. */
export async function GET() {
  const supabase = createAdminClient();
  const { data: clubs, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const clubIds = (clubs ?? []).map((c) => c.id);
  const countByClub = new Map<string, number>();
  if (clubIds.length > 0) {
    const { data: members } = await supabase
      .from("club_members")
      .select("club_id")
      .in("club_id", clubIds);
    for (const m of members ?? []) {
      countByClub.set(m.club_id, (countByClub.get(m.club_id) ?? 0) + 1);
    }
  }

  return NextResponse.json({
    ok: true,
    clubs: (clubs ?? []).map((c) =>
      toClubPublic(c as ClubRow, countByClub.get(c.id) ?? 0)
    ),
  });
}
