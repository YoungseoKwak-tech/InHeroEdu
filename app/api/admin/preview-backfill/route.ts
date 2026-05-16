import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { generatePreviewsForResource } from "@/lib/previewGenerator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_BATCH = 5;
const MAX_BATCH = 20;

/**
 * POST /api/admin/preview-backfill?batch=5
 *
 * Admin-only helper that runs preview generation for up to `batch`
 * lounge_resources rows where preview_generation_status is in
 * ('pending', 'failed'). Use this to backfill resources that existed
 * before the rendering pipeline shipped, or to retry any failures.
 *
 * Synchronous (returns when the batch is done). For larger backlogs,
 * call repeatedly. Capped at MAX_BATCH per call to stay under the
 * route's 60s maxDuration.
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const url = new URL(req.url);
  const batch = Math.min(
    MAX_BATCH,
    Math.max(1, Number(url.searchParams.get("batch") ?? DEFAULT_BATCH))
  );

  const supabase = createAdminClient();
  const { data: rows, error } = await supabase
    .from("lounge_resources")
    .select("id")
    .in("preview_generation_status", ["pending", "failed"])
    .eq("review_status", "approved")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(batch);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const ids = ((rows ?? []) as { id: string }[]).map((r) => r.id);
  const results = await Promise.all(ids.map((id) => generatePreviewsForResource(id)));

  return NextResponse.json({
    ok: true,
    attempted: ids.length,
    succeeded: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  });
}
