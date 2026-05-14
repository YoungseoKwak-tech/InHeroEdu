import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface PreviewMessage {
  id: string;
  handle: string | null;
  isMentor: boolean;
  content: string;
  type: "text" | "image" | "file";
  createdAt: string;
}

/** GET /api/lounges — list active lounges + post count + live chat preview. */
export async function GET() {
  const supabase = createAdminClient();
  const { data: lounges, error } = await supabase
    .from("lounges")
    .select("id, slug, name, subject_category, description, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const loungeIds = (lounges ?? []).map((l) => l.id);

  // Post counts (forum-style threaded posts).
  const postCounts = new Map<string, number>();
  if (loungeIds.length > 0) {
    const { data: posts } = await supabase
      .from("lounge_posts")
      .select("lounge_id")
      .in("lounge_id", loungeIds)
      .eq("is_deleted", false);
    for (const p of (posts ?? []) as { lounge_id: string }[]) {
      postCounts.set(p.lounge_id, (postCounts.get(p.lounge_id) ?? 0) + 1);
    }
  }

  // Live chat preview — last 8 messages per lounge, oldest→newest order so
  // the card reads naturally top-to-bottom.
  const previewByLounge = new Map<string, PreviewMessage[]>();
  const chatCounts = new Map<string, number>();
  if (loungeIds.length > 0) {
    const { data: chatRows } = await supabase
      .from("chat_messages")
      .select("id, context_id, content, type, author_id, created_at")
      .in("context_id", loungeIds)
      .eq("context_type", "lounge")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .limit(400);
    const rows = (chatRows ?? []) as Array<{
      id: string;
      context_id: string;
      content: string | null;
      type: string;
      author_id: string | null;
      created_at: string;
    }>;

    // Author handle + mentor flag.
    const authorIds = Array.from(new Set(rows.map((r) => r.author_id).filter((x): x is string => !!x)));
    const handleMap = new Map<string, string>();
    const mentorIds = new Set<string>();
    if (authorIds.length > 0) {
      const [{ data: profiles }, { data: mentors }] = await Promise.all([
        supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .in("user_id", authorIds),
        supabase
          .from("mentor_profiles")
          .select("user_id")
          .eq("is_verified", true)
          .in("user_id", authorIds),
      ]);
      for (const p of (profiles ?? []) as { user_id: string; display_handle: string }[]) {
        handleMap.set(p.user_id, p.display_handle);
      }
      for (const m of (mentors ?? []) as { user_id: string }[]) {
        mentorIds.add(m.user_id);
      }
    }

    for (const r of rows) {
      chatCounts.set(r.context_id, (chatCounts.get(r.context_id) ?? 0) + 1);
      const list = previewByLounge.get(r.context_id) ?? [];
      if (list.length >= 8) continue;
      let content: string;
      if (r.type === "image") content = "📷 sent a photo";
      else if (r.type === "file") content = "📄 sent a file";
      else if (r.type === "text") content = (r.content ?? "").trim();
      else continue;
      if (!content) continue;
      list.push({
        id: r.id,
        handle: r.author_id ? handleMap.get(r.author_id) ?? null : null,
        isMentor: !!r.author_id && mentorIds.has(r.author_id),
        content,
        type: r.type as "text" | "image" | "file",
        createdAt: r.created_at,
      });
      previewByLounge.set(r.context_id, list);
    }
  }

  return NextResponse.json({
    ok: true,
    lounges: (lounges ?? []).map((l) => ({
      slug: l.slug,
      name: l.name,
      subjectCategory: l.subject_category,
      description: l.description,
      postCount: postCounts.get(l.id) ?? 0,
      chatCount: chatCounts.get(l.id) ?? 0,
      // Reverse so the preview reads top→bottom (oldest first).
      previewMessages: (previewByLounge.get(l.id) ?? []).slice().reverse(),
    })),
  });
}
