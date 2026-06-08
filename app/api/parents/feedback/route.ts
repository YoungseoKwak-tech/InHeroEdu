import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 자료요청 & 피드백 board.
 *   GET  → recent submissions (public, reflected on /parents/feedback)
 *   POST → submit { kind, nickname?, body }   (login optional — user_id attached if present)
 */

const KINDS = new Set(["request", "feedback", "bug"]);
const STATUS_PUBLIC = ["open", "reviewing", "done"];

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("parent_feedback")
    .select("id, kind, nickname, body, status, upvotes, created_at")
    .in("status", STATUS_PUBLIC)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    // Table may not be migrated yet — return empty instead of 500.
    return NextResponse.json({ items: [] });
  }
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const kind = KINDS.has(body?.kind) ? body.kind : "request";
  const text = String(body?.body ?? "").trim();
  const nickname = String(body?.nickname ?? "").trim().slice(0, 40) || null;

  if (text.length < 2 || text.length > 2000) {
    return NextResponse.json({ error: "내용을 2자 이상 입력해주세요." }, { status: 400 });
  }

  // Login optional — attach user_id when a valid token is present.
  const user = await getAuthenticatedUser(req).catch(() => null);

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("parent_feedback")
    .insert({ kind, nickname, body: text, user_id: user?.id ?? null })
    .select("id, kind, nickname, body, status, upvotes, created_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, item: data });
}
