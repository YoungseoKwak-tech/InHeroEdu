import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { sendFriendtalkBroadcast, isSolapiConfigured } from "@/lib/solapi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET  /api/admin/notify/broadcast
 *   → { configured, audienceCount, recent[] }   admin dashboard data
 *
 * POST /api/admin/notify/broadcast
 *   body { title, body, linkUrl?, dryRun? }
 *   → sends a 친구톡 (광고성) blast to every marketing-consented parent and
 *     logs the run. dryRun=true counts the audience without sending.
 */

export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();

  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("marketing_consent", true)
    .not("phone", "is", null);

  const { data: recent } = await supabase
    .from("kakao_broadcasts")
    .select("id, channel, title, body, audience_count, sent_count, failed_count, status, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({
    configured: isSolapiConfigured(),
    audienceCount: count ?? 0,
    recent: recent ?? [],
  });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const body = await req.json().catch(() => ({}));
  const title = String(body?.title ?? "").trim();
  const message = String(body?.body ?? "").trim();
  const linkUrl = String(body?.linkUrl ?? "").trim() || null;
  const dryRun = body?.dryRun === true;

  if (!title || title.length > 80) {
    return NextResponse.json({ error: "title required (≤80 chars)" }, { status: 400 });
  }
  if (!message || message.length > 1000) {
    return NextResponse.json({ error: "body required (≤1000 chars)" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Audience = marketing-consented parents with a phone on file.
  const { data: recipients, error: audErr } = await supabase
    .from("profiles")
    .select("phone")
    .eq("marketing_consent", true)
    .not("phone", "is", null);

  if (audErr) {
    return NextResponse.json({ error: audErr.message }, { status: 500 });
  }

  const phones = (recipients ?? [])
    .map((r) => (r as { phone: string | null }).phone)
    .filter((p): p is string => !!p);

  // 친구톡 body convention: append the link as a trailing line if provided.
  const sendText = linkUrl ? `${message}\n\n▶ ${linkUrl}` : message;

  const result = dryRun
    ? { ok: true, dryRun: true as const, accepted: 0, failed: 0, groupId: undefined as string | undefined }
    : await sendFriendtalkBroadcast({ phones, text: sendText });

  const status = dryRun
    ? "dry_run"
    : result.dryRun
      ? "dry_run"
      : result.ok
        ? "sent"
        : result.accepted > 0
          ? "partial"
          : "failed";

  // Log every run for audit + stats.
  const { data: logged } = await supabase
    .from("kakao_broadcasts")
    .insert({
      sender_user_id: admin.id,
      channel: "friendtalk",
      title,
      body: sendText,
      link_url: linkUrl,
      audience_count: phones.length,
      sent_count: result.accepted,
      failed_count: result.failed,
      status,
      provider_ref: result.groupId ?? null,
      error_text: "error" in result ? (result as { error?: string }).error ?? null : null,
    })
    .select("id")
    .maybeSingle();

  return NextResponse.json({
    ok: result.ok,
    dryRun: result.dryRun || dryRun,
    audienceCount: phones.length,
    accepted: result.accepted,
    failed: result.failed,
    status,
    broadcastId: (logged as { id?: string } | null)?.id ?? null,
    note: !isSolapiConfigured()
      ? "Solapi 미설정 — 실제 발송되지 않았습니다(dry run). env 키를 넣으면 바로 발송됩니다."
      : undefined,
  });
}
