import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, isAdminEmail, requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  CHAT_RATE_LIMIT,
  CHAT_RATE_WINDOW_MS,
  CHAT_TEXT_MAX,
  hydrateChatMessages,
  type ChatMessageRow,
} from "@/lib/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function noProfileResponse() {
  return NextResponse.json(
    {
      error: "Claim your trajectory handle before chatting.",
      code: "NO_PROFILE",
      onboardingUrl: "/onboarding",
    },
    { status: 403 }
  );
}

/**
 * GET /api/lounges/[slug]/chat/messages?limit=50&after=ISO
 *   Returns most-recent first. With after=, returns only messages strictly
 *   after that timestamp (used for polling new arrivals).
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "50", 10) || 50));
  const after = url.searchParams.get("after");

  const supabase = createAdminClient();
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug, name")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });

  let query = supabase
    .from("chat_messages")
    .select("*")
    .eq("context_type", "lounge")
    .eq("context_id", (lounge as { id: string }).id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (after) {
    const d = new Date(after);
    if (!Number.isNaN(d.getTime())) {
      query = query.gt("created_at", d.toISOString());
    }
  }
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // For "after" polling we want ascending; default fetch we want ascending too
  // so caller can just append. Reverse here.
  const rows = ((data ?? []) as ChatMessageRow[]).slice().reverse();

  const user = await getAuthenticatedUser(req);
  const messages = await hydrateChatMessages(rows, user?.id ?? null);
  return NextResponse.json({
    ok: true,
    lounge: { slug: (lounge as { slug: string }).slug, name: (lounge as { name: string }).name },
    viewerIsAdmin: isAdminEmail(user?.email),
    messages,
  });
}

/**
 * POST /api/lounges/[slug]/chat/messages { content, replyToId? }
 *   Send a text chat message. Requires profile + rate limit.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  let body: { content?: string; replyToId?: string | null };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid JSON" }, { status: 400 }); }

  const text = String(body.content ?? "").trim();
  if (text.length < 1 || text.length > CHAT_TEXT_MAX) {
    return NextResponse.json({ error: `Message must be 1–${CHAT_TEXT_MAX} chars.` }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Profile gate.
  const { data: profiles } = await supabase.from("profiles_public").select("user_id");
  const hasProfile = ((profiles ?? []) as { user_id: string }[]).some((p) => p.user_id === user.id);
  if (!hasProfile) {
    return noProfileResponse();
  }

  // Lounge lookup.
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug, name")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });

  // Rate limit (per user, last 60s).
  const since = new Date(Date.now() - CHAT_RATE_WINDOW_MS).toISOString();
  const { data: recentRows } = await supabase
    .from("chat_messages")
    .select("author_id, created_at")
    .gte("created_at", since)
    .eq("context_type", "lounge")
    .eq("context_id", (lounge as { id: string }).id);
  const recentMine = ((recentRows ?? []) as { author_id: string | null }[]).filter(
    (r) => r.author_id === user.id
  ).length;
  if (recentMine >= CHAT_RATE_LIMIT) {
    return NextResponse.json(
      { error: `Slow down. ${CHAT_RATE_LIMIT} messages per minute cap.` },
      { status: 429 }
    );
  }

  // Validate reply target if provided.
  let replyToId: string | null = null;
  if (body.replyToId) {
    const { data: target } = await supabase
      .from("chat_messages")
      .select("id, context_id, context_type, is_deleted")
      .eq("id", body.replyToId)
      .maybeSingle();
    if (target && (target as { context_id: string; context_type: string; is_deleted: boolean }).context_id === (lounge as { id: string }).id) {
      replyToId = body.replyToId;
    }
  }

  const { data: inserted, error } = await supabase
    .from("chat_messages")
    .insert({
      context_type: "lounge",
      context_id: (lounge as { id: string }).id,
      author_id: user.id,
      type: "text",
      content: text,
      reply_to_id: replyToId,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const [message] = await hydrateChatMessages([inserted as ChatMessageRow], user.id);
  return NextResponse.json({ ok: true, message });
}
