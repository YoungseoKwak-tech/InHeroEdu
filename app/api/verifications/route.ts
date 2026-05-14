import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  toVerificationPublic,
  VERIFICATION_KINDS,
  type VerificationKind,
  type VerificationRow,
} from "@/lib/verifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KIND_SET = new Set<string>(VERIFICATION_KINDS);
const SUBMIT_RATE_LIMIT = 3;
const SUBMIT_RATE_WINDOW_MS = 24 * 60 * 60 * 1000;

/** GET /api/verifications — list current user's own claims. */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  // JS-side filter to dodge the previously-observed PostgREST .eq quirk.
  const { data } = await supabase
    .from("verifications")
    .select("*")
    .order("submitted_at", { ascending: false });
  const rows = ((data ?? []) as VerificationRow[]).filter((r) => r.user_id === user.id);
  return NextResponse.json({
    ok: true,
    verifications: rows.map(toVerificationPublic),
  });
}

/**
 * POST /api/verifications
 *   { kind, claimText, evidenceUrl?, schoolName? }
 *
 * Submits a verification claim. Requires a trajectory profile + per-user
 * rate limit (3 / 24h). Status starts as 'pending' until admin reviews.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: {
    kind?: string;
    claimText?: string;
    evidenceUrl?: string | null;
    schoolName?: string | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const kind = String(body.kind ?? "").trim();
  if (!KIND_SET.has(kind)) {
    return NextResponse.json({ error: "Unknown verification kind." }, { status: 400 });
  }
  const claimText = String(body.claimText ?? "").trim();
  if (claimText.length < 10 || claimText.length > 800) {
    return NextResponse.json({ error: "Claim text must be 10–800 chars." }, { status: 400 });
  }
  const evidenceUrl = typeof body.evidenceUrl === "string" ? body.evidenceUrl.trim() : null;
  if (evidenceUrl && evidenceUrl.length > 0) {
    try { new URL(evidenceUrl); } catch {
      return NextResponse.json({ error: "Evidence URL is not a valid URL." }, { status: 400 });
    }
  }
  const schoolName = kind === "school"
    ? (typeof body.schoolName === "string" ? body.schoolName.trim() : "")
    : null;
  if (kind === "school" && (!schoolName || schoolName.length < 2 || schoolName.length > 80)) {
    return NextResponse.json({ error: "School name required (2–80 chars) for school verification." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Profile gate.
  const { data: allProfiles } = await supabase.from("profiles_public").select("user_id");
  const hasProfile = ((allProfiles ?? []) as { user_id: string }[]).some((p) => p.user_id === user.id);
  if (!hasProfile) {
    return NextResponse.json(
      { error: "Claim your trajectory handle before submitting a verification." },
      { status: 403 }
    );
  }

  // Rate limit.
  const since = new Date(Date.now() - SUBMIT_RATE_WINDOW_MS).toISOString();
  const { data: recent } = await supabase
    .from("verifications")
    .select("user_id, submitted_at")
    .gte("submitted_at", since);
  const recentCount = ((recent ?? []) as { user_id: string }[]).filter((r) => r.user_id === user.id).length;
  if (recentCount >= SUBMIT_RATE_LIMIT) {
    return NextResponse.json(
      { error: `Cap is ${SUBMIT_RATE_LIMIT} verification submissions per 24h.` },
      { status: 429 }
    );
  }

  const { data: row, error } = await supabase
    .from("verifications")
    .insert({
      user_id: user.id,
      kind: kind as VerificationKind,
      claim_text: claimText,
      evidence_url: evidenceUrl && evidenceUrl.length > 0 ? evidenceUrl : null,
      school_name: schoolName,
      status: "pending",
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, verification: toVerificationPublic(row as VerificationRow) });
}
