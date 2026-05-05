/**
 * GET /api/patterns
 * Returns the authenticated student's patterns from student_patterns.
 *
 * POST /api/patterns/resolve
 * Marks a pattern as resolved.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAuthenticatedUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const url = new URL(req.url);
  const resolved = url.searchParams.get("resolved"); // "true" | "false" | null = all

  const supabase = createAdminClient();

  let query = supabase
    .from("student_patterns")
    .select("*")
    .eq("user_id", user.id)
    .order("last_detected", { ascending: false });

  if (resolved === "true") query = query.eq("is_resolved", true);
  if (resolved === "false") query = query.eq("is_resolved", false);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Derive dominant gap type from active patterns
  const active = (data ?? []).filter((p) => !p.is_resolved);
  const gapTypeCounts: Record<string, number> = {};
  for (const p of active) {
    if (p.gap_type) {
      gapTypeCounts[p.gap_type] = (gapTypeCounts[p.gap_type] ?? 0) + p.occurrence_count;
    }
  }
  const dominantGapType =
    Object.keys(gapTypeCounts).sort(
      (a, b) => gapTypeCounts[b] - gapTypeCounts[a]
    )[0] ?? null;

  return NextResponse.json({
    patterns: data ?? [],
    dominantGapType,
  });
}
