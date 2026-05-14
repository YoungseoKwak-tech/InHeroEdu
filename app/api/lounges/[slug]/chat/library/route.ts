import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import {
  aggregateLibrary,
  hydrateChatMessages,
  type ChatMessageRow,
} from "@/lib/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/lounges/[slug]/chat/library
 *   Returns aggregated photos / files / links from all chat messages in
 *   this lounge. Pure derivation: photos = image messages, files = file
 *   messages, links = URLs extracted from text messages.
 */
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug, name")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });

  // Pull all non-deleted messages. We hydrate so we get authors for
  // attribution lines on each item.
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("context_type", "lounge")
    .eq("context_id", (lounge as { id: string }).id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const messages = await hydrateChatMessages((data ?? []) as ChatMessageRow[], null);
  const library = aggregateLibrary(messages);

  return NextResponse.json({
    ok: true,
    lounge: { slug: (lounge as { slug: string }).slug, name: (lounge as { name: string }).name },
    library,
    counts: {
      photos: library.photos.length,
      files: library.files.length,
      links: library.links.length,
    },
  });
}
