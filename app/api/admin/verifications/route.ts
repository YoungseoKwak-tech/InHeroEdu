import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  toVerificationPublic,
  type VerificationRow,
} from "@/lib/verifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/verifications?status=pending
 *   Lists verifications filtered by status. Hydrates with submitter handle.
 */
export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? "pending";

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("verifications")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(200);

  const rows = ((data ?? []) as VerificationRow[]).filter((r) => !status || r.status === status);

  // Hydrate submitter handle.
  const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
  const { data: profiles } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle, graduation_year");
  const profileMap = new Map<string, { handle: string; year: number | null }>();
  for (const p of ((profiles ?? []) as { user_id: string; display_handle: string; graduation_year: number | null }[])) {
    if (userIds.includes(p.user_id)) profileMap.set(p.user_id, { handle: p.display_handle, year: p.graduation_year });
  }

  return NextResponse.json({
    ok: true,
    verifications: rows.map((r) => {
      const p = profileMap.get(r.user_id);
      return {
        ...toVerificationPublic(r),
        submitter: p ? { handle: p.handle, graduationYear: p.year } : null,
      };
    }),
  });
}
