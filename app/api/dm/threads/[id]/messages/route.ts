import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
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

interface ThreadRow {
  id: string;
  user_a: string;
  user_b: string;
}

async function authorizeThread(threadId: string, userId: string): Promise<ThreadRow | null> {
  const supabase = createAdminClient();
  const { data: threads } = await supabase
    .from("dm_threads")
    .select("id, user_a, user_b");
  const t = ((threads ?? []) as ThreadRow[]).find((x) => x.id === threadId);
  if (!t) return null;
  if (t.user_a !== userId && t.user_b !== userId) return null;
  return t;
}

/** GET /api/dm/threads/[id]/messages?limit=50&after=ISO */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { id: rawId } = await params;
  const threadId = String(rawId ?? "").trim();
  const thread = await authorizeThread(threadId, user.id);
  if (!thread) return NextResponse.json({ error: "thread not found" }, { status: 404 });

  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "50", 10) || 50));
  const after = url.searchParams.get("after");

  const supabase = createAdminClient();
  let query = supabase
    .from("chat_messages")
    .select("*")
    .eq("context_type", "dm")
    .eq("context_id", thread.id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (after) {
    const d = new Date(after);
    if (!Number.isNaN(d.getTime())) query = query.gt("created_at", d.toISOString());
  }
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = ((data ?? []) as ChatMessageRow[]).slice().reverse();
  const messages = await hydrateChatMessages(rows, user.id);

  // Other participant's handle
  const otherId = thread.user_a === user.id ? thread.user_b : thread.user_a;
  const { data: allProfiles } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle, graduation_year");
  const otherProfile = ((allProfiles ?? []) as { user_id: string; display_handle: string; graduation_year: number | null }[])
    .find((p) => p.user_id === otherId);

  return NextResponse.json({
    ok: true,
    thread: {
      id: thread.id,
      other: otherProfile
        ? { handle: otherProfile.display_handle, graduationYear: otherProfile.graduation_year }
        : null,
    },
    messages,
  });
}

/** POST /api/dm/threads/[id]/messages { content, replyToId? } */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { id: rawId } = await params;
  const threadId = String(rawId ?? "").trim();
  const thread = await authorizeThread(threadId, user.id);
  if (!thread) return NextResponse.json({ error: "thread not found" }, { status: 404 });

  let body: { content?: string; replyToId?: string | null };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid JSON" }, { status: 400 }); }

  const text = String(body.content ?? "").trim();
  if (text.length < 1 || text.length > CHAT_TEXT_MAX) {
    return NextResponse.json({ error: `Message must be 1–${CHAT_TEXT_MAX} chars.` }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Rate limit (across all chat — same budget).
  const since = new Date(Date.now() - CHAT_RATE_WINDOW_MS).toISOString();
  const { data: recent } = await supabase
    .from("chat_messages")
    .select("author_id, created_at")
    .gte("created_at", since)
    .eq("author_id", user.id);
  if ((recent ?? []).length >= CHAT_RATE_LIMIT) {
    return NextResponse.json({ error: `Slow down. ${CHAT_RATE_LIMIT}/min cap.` }, { status: 429 });
  }

  let validatedReplyId: string | null = null;
  if (body.replyToId) {
    const { data: target } = await supabase
      .from("chat_messages")
      .select("id, context_id")
      .eq("id", body.replyToId)
      .maybeSingle();
    if (target && (target as { context_id: string }).context_id === thread.id) {
      validatedReplyId = body.replyToId;
    }
  }

  const { data: inserted, error } = await supabase
    .from("chat_messages")
    .insert({
      context_type: "dm",
      context_id: thread.id,
      author_id: user.id,
      type: "text",
      content: text,
      reply_to_id: validatedReplyId,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // bump thread.last_message_at
  await supabase
    .from("dm_threads")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", thread.id);

  const [message] = await hydrateChatMessages([inserted as ChatMessageRow], user.id);
  return NextResponse.json({ ok: true, message });
}
