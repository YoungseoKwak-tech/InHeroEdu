import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  toVerificationPublic,
  VERIFICATION_KIND_META,
  type VerificationRow,
} from "@/lib/verifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/verifications/[id]/decide
 *   { decision: 'approve' | 'reject', declineReason? }
 *
 * On approve → inserts the matching badge row (with metadata).
 * On reject → records decline_reason for the user to see.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const { id: rawId } = await params;
  const id = String(rawId ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  let body: { decision?: string; declineReason?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }
  const decision = body.decision === "approve" ? "approve" : body.decision === "reject" ? "reject" : null;
  if (!decision) return NextResponse.json({ error: "decision must be 'approve' or 'reject'" }, { status: 400 });

  const supabase = createAdminClient();

  // Load all and filter in JS (work around the earlier PostgREST .eq quirk).
  const { data: all } = await supabase.from("verifications").select("*");
  const row = ((all ?? []) as VerificationRow[]).find((r) => r.id === id);
  if (!row) return NextResponse.json({ error: "verification not found" }, { status: 404 });
  if (row.status !== "pending") {
    return NextResponse.json({ error: `Already ${row.status}.` }, { status: 409 });
  }

  const nowIso = new Date().toISOString();

  if (decision === "approve") {
    // Award the matching badge with metadata.
    const meta = VERIFICATION_KIND_META[row.kind];
    const badgeMetadata: Record<string, unknown> = {
      verification_id: row.id,
      claim: row.claim_text.slice(0, 240),
    };
    if (row.kind === "school" && row.school_name) {
      badgeMetadata.school = row.school_name;
    }
    if (row.evidence_url) badgeMetadata.evidence_url = row.evidence_url;

    const { error: badgeErr } = await supabase.from("badges").upsert(
      {
        user_id: row.user_id,
        badge_type: meta.badgeType,
        badge_metadata: badgeMetadata,
      },
      { onConflict: "user_id,badge_type" }
    );
    if (badgeErr) {
      return NextResponse.json({ error: `badge upsert failed: ${badgeErr.message}` }, { status: 500 });
    }
  }

  const { data: updated, error: updateErr } = await supabase
    .from("verifications")
    .update({
      status: decision === "approve" ? "approved" : "rejected",
      reviewed_at: nowIso,
      reviewer_user_id: admin.id,
      decline_reason:
        decision === "reject"
          ? (typeof body.declineReason === "string" ? body.declineReason.trim().slice(0, 400) : null)
          : null,
    })
    .eq("id", id)
    .select()
    .single();
  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    verification: toVerificationPublic(updated as VerificationRow),
  });
}
