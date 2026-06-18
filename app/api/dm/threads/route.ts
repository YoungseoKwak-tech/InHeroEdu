import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/dm/threads — the current user's DM threads (inbox), each with the
 * other participant's handle + latest message preview, newest first. This is
 * what lets a mentor actually see incoming messages.
 */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  const { data: allThreads } = await supabase.from("dm_threads").select("id, user_a, user_b");
  const mine = ((allThreads ?? []) as { id: string; user_a: string; user_b: string }[])
    .filter((t) => t.user_a === user.id || t.user_b === user.id);
  if (mine.length === 0) return NextResponse.json({ ok: true, threads: [] });

  const threadIds = mine.map((t) => t.id);
  const otherIds = Array.from(new Set(mine.map((t) => (t.user_a === user.id ? t.user_b : t.user_a))));

  const { data: msgs } = await supabase
    .from("chat_messages")
    .select("context_id, content, created_at, author_id")
    .eq("context_type", "dm")
    .eq("is_deleted", false)
    .in("context_id", threadIds)
    .order("created_at", { ascending: false });
  const latest = new Map<string, { content: string | null; created_at: string; author_id: string | null }>();
  for (const m of (msgs ?? []) as { context_id: string; content: string | null; created_at: string; author_id: string | null }[]) {
    if (!latest.has(m.context_id)) latest.set(m.context_id, { content: m.content, created_at: m.created_at, author_id: m.author_id });
  }

  const { data: profs } = await supabase.from("profiles_public").select("user_id, display_handle").in("user_id", otherIds);
  const handleOf = new Map(((profs ?? []) as { user_id: string; display_handle: string }[]).map((p) => [p.user_id, p.display_handle]));

  const threads = mine
    .map((t) => {
      const otherId = t.user_a === user.id ? t.user_b : t.user_a;
      const last = latest.get(t.id);
      return {
        threadId: t.id,
        otherHandle: handleOf.get(otherId) ?? null,
        lastMessage: last?.content ?? null,
        lastAt: last?.created_at ?? null,
        lastFromMe: last ? last.author_id === user.id : false,
      };
    })
    .filter((t) => !!t.otherHandle)
    .sort((a, b) => new Date(b.lastAt ?? 0).getTime() - new Date(a.lastAt ?? 0).getTime());

  return NextResponse.json({ ok: true, threads });
}
