import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { extractUrls } from "@/lib/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface PreviewDrop {
  kind: "photo" | "file" | "link";
  url: string;
  title: string;
  secondary: string | null;
  authorHandle: string | null;
  createdAt: string;
  mimeType?: string;
}

const PREVIEW_PER_LOUNGE = 8;

/** GET /api/lounges — list active lounges + post count + preview drops slider. */
export async function GET() {
  const supabase = createAdminClient();
  const { data: lounges, error } = await supabase
    .from("lounges")
    .select("id, slug, name, subject_category, description, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const loungeIds = (lounges ?? []).map((l) => l.id);

  // Post counts.
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

  // Preview drops: pull recent chat messages with attachments OR text-with-URLs
  // across all lounges in one bulk query.
  const previewByLounge = new Map<string, PreviewDrop[]>();
  if (loungeIds.length > 0) {
    const { data: chatRows } = await supabase
      .from("chat_messages")
      .select("context_id, content, type, attachment_url, attachment_meta, author_id, created_at")
      .in("context_id", loungeIds)
      .eq("context_type", "lounge")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .limit(200);

    const messageRows = (chatRows ?? []) as Array<{
      context_id: string;
      content: string | null;
      type: string;
      attachment_url: string | null;
      attachment_meta: Record<string, unknown> | null;
      author_id: string | null;
      created_at: string;
    }>;

    // Author handle resolution
    const authorIds = Array.from(
      new Set(messageRows.map((r) => r.author_id).filter((x): x is string => !!x))
    );
    const handleMap = new Map<string, string>();
    if (authorIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles_public")
        .select("user_id, display_handle")
        .in("user_id", authorIds);
      for (const p of (profiles ?? []) as { user_id: string; display_handle: string }[]) {
        handleMap.set(p.user_id, p.display_handle);
      }
    }

    for (const r of messageRows) {
      const list = previewByLounge.get(r.context_id) ?? [];
      if (list.length >= PREVIEW_PER_LOUNGE) continue;
      const authorHandle = r.author_id ? handleMap.get(r.author_id) ?? null : null;

      if (r.type === "image" && r.attachment_url) {
        list.push({
          kind: "photo",
          url: r.attachment_url,
          title: (r.attachment_meta?.fileName as string | undefined) ?? "Image",
          secondary: r.content,
          authorHandle,
          createdAt: r.created_at,
          mimeType: r.attachment_meta?.mimeType as string | undefined,
        });
      } else if (r.type === "file" && r.attachment_url) {
        list.push({
          kind: "file",
          url: r.attachment_url,
          title: (r.attachment_meta?.fileName as string | undefined) ?? "File",
          secondary: r.content,
          authorHandle,
          createdAt: r.created_at,
          mimeType: r.attachment_meta?.mimeType as string | undefined,
        });
      } else if (r.type === "text" && r.content) {
        const urls = extractUrls(r.content);
        for (const u of urls) {
          if (list.length >= PREVIEW_PER_LOUNGE) break;
          let host = u;
          try { host = new URL(u).host; } catch { /* keep raw */ }
          list.push({
            kind: "link",
            url: u,
            title: host,
            secondary: r.content,
            authorHandle,
            createdAt: r.created_at,
          });
        }
      }
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
      previewDrops: previewByLounge.get(l.id) ?? [],
    })),
  });
}
