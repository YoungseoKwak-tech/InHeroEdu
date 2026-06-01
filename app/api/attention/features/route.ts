/**
 * /api/attention/features
 *
 * GET                                  → list this student's feature vectors
 *                                        (one row per session × pipeline version),
 *                                        newest first.
 * GET ?session=<uuid>                  → just the row for that session
 *                                        (current pipeline version only by default).
 * GET ?pipeline=<n>                    → filter to a specific feature pipeline
 *                                        version. Default: latest version present.
 * GET ?limit=<n>                       → cap rows (1..200, default 50).
 *
 * Auth-required. Students see only their own rows (RLS-equivalent).
 *
 * This is the read surface for:
 *   * the Stage 2b debugging dashboard ("does this feature actually capture
 *     the structure I think it does?")
 *   * Stage 3 state inference, which will pull these vectors as the input
 *     space for HMM / dimensional models.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const params = req.nextUrl.searchParams;
  const sessionId = params.get("session");
  const pipelineParam = params.get("pipeline");
  const limitParam = params.get("limit");

  let limit = DEFAULT_LIMIT;
  if (limitParam) {
    const parsed = Number.parseInt(limitParam, 10);
    if (!Number.isNaN(parsed) && parsed > 0) limit = Math.min(parsed, MAX_LIMIT);
  }

  const supabase = createAdminClient();

  let pipelineVersion: number | null = null;
  if (pipelineParam) {
    const parsed = Number.parseInt(pipelineParam, 10);
    if (!Number.isNaN(parsed) && parsed > 0) pipelineVersion = parsed;
  }

  // If no explicit pipeline asked for, default to the latest version this
  // user has any row for, so old rows aren't silently mixed with new ones.
  if (pipelineVersion === null) {
    const { data: latest } = await supabase
      .from("attention_features")
      .select("feature_pipeline_version")
      .eq("user_id", user.id)
      .order("feature_pipeline_version", { ascending: false })
      .limit(1);
    pipelineVersion = (latest?.[0]?.feature_pipeline_version as number | undefined) ?? null;
  }

  let query = supabase
    .from("attention_features")
    .select("*")
    .eq("user_id", user.id)
    .order("computed_at", { ascending: false });

  if (pipelineVersion !== null) query = query.eq("feature_pipeline_version", pipelineVersion);
  if (sessionId) query = query.eq("session_id", sessionId);
  query = query.limit(sessionId ? 1 : limit);

  const { data, error } = await query;
  if (error) {
    console.error("[/api/attention/features] query failed", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    feature_pipeline_version: pipelineVersion,
    count: data?.length ?? 0,
    features: data ?? [],
  });
}
