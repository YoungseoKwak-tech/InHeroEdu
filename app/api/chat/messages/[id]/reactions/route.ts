import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { REACTION_EMOJI } from "@/lib/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMOJI_SET = new Set<string>(REACTION_EMOJI);

/**
 * POST /api/chat/messages/[id]/reactions { emoji }
 *   Toggle: if user already reacted with this emoji on this message, remove.
 *   Otherwise insert. Returns the message's full reactions list (hydrated).
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const messageId = String(params.id ?? "").trim();
  if (!messageId) return NextResponse.json({ error: "message id required" }, { status: 400 });

  let body: { emoji?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid JSON" }, { status: 400 }); }

  const emoji = String(body.emoji ?? "").trim();
  if (!EMOJI_SET.has(emoji)) {
    return NextResponse.json({ error: "invalid emoji" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Verify message exists + visible.
  const { data: msg } = await supabase
    .from("chat_messages")
    .select("id, context_type, context_id, is_deleted")
    .eq("id", messageId)
    .maybeSingle();
  if (!msg || (msg as { is_deleted: boolean }).is_deleted) {
    return NextResponse.json({ error: "message not found" }, { status: 404 });
  }

  // Profile gate.
  const { data: profiles } = await supabase.from("profiles_public").select("user_id");
  const hasProfile = ((profiles ?? []) as { user_id: string }[]).some((p) => p.user_id === user.id);
  if (!hasProfile) {
    return NextResponse.json({ error: "Claim your trajectory handle first." }, { status: 403 });
  }

  // Check if user already reacted (JS-side filter for safety).
  const { data: existing } = await supabase
    .from("chat_reactions")
    .select("message_id, user_id, emoji")
    .eq("message_id", messageId);
  const mine = ((existing ?? []) as { user_id: string; emoji: string }[]).find(
    (r) => r.user_id === user.id && r.emoji === emoji
  );

  if (mine) {
    const { error } = await supabase
      .from("chat_reactions")
      .delete()
      .eq("message_id", messageId)
      .eq("user_id", user.id)
      .eq("emoji", emoji);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("chat_reactions")
      .insert({ message_id: messageId, user_id: user.id, emoji });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return aggregated reactions for this message after the toggle.
  const { data: refreshed } = await supabase
    .from("chat_reactions")
    .select("user_id, emoji")
    .eq("message_id", messageId);
  const agg = new Map<string, { count: number; mine: boolean }>();
  for (const r of (refreshed ?? []) as { user_id: string; emoji: string }[]) {
    const cur = agg.get(r.emoji) ?? { count: 0, mine: false };
    cur.count += 1;
    if (r.user_id === user.id) cur.mine = true;
    agg.set(r.emoji, cur);
  }

  return NextResponse.json({
    ok: true,
    reactions: Array.from(agg.entries()).map(([emoji, v]) => ({ emoji, count: v.count, mine: v.mine })),
  });
}
