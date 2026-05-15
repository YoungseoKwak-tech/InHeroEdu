import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import type { DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ResourceRow {
  id: string;
  chat_message_id: string | null;
  lounge_id: string;
  author_id: string | null;
  folder_type: DocGroup;
  title: string;
  description: string | null;
  attachment_url: string;
  attachment_meta: Record<string, unknown> | null;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  is_inhero_official: boolean;
  is_seeded: boolean;
  download_count: number;
  upvote_count: number;
  comment_count: number;
  created_at: string;
}

/**
 * GET /api/library/resource/[id]
 *
 * Returns a single approved resource hydrated with author handle + lounge
 * slug/name. Used by /library/[resourceId] detail page.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("lounge_resources")
    .select(
      "id, chat_message_id, lounge_id, author_id, folder_type, title, description, attachment_url, attachment_meta, file_name, file_size, mime_type, is_inhero_official, is_seeded, download_count, upvote_count, comment_count, created_at"
    )
    .eq("id", id)
    .eq("review_status", "approved")
    .maybeSingle();

  if (error) {
    if (/relation .* does not exist/i.test(error.message)) {
      return NextResponse.json({ error: "library not yet provisioned" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });

  const resource = row as ResourceRow;

  const [loungeRes, profileRes] = await Promise.all([
    supabase.from("lounges").select("id, slug, name").eq("id", resource.lounge_id).maybeSingle(),
    resource.author_id
      ? supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .eq("user_id", resource.author_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const lounge = loungeRes.data as { id: string; slug: string; name: string } | null;
  const profile = profileRes.data as { user_id: string; display_handle: string | null } | null;

  return NextResponse.json(
    {
      resource: {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        folder: resource.folder_type,
        attachmentUrl: resource.attachment_url,
        fileName: resource.file_name,
        fileSize: resource.file_size,
        mimeType: resource.mime_type,
        isImage: typeof resource.mime_type === "string" && resource.mime_type.startsWith("image/"),
        isPdf: resource.mime_type === "application/pdf",
        isInheroOfficial: resource.is_inhero_official,
        isSeeded: resource.is_seeded,
        downloadCount: resource.download_count,
        upvoteCount: resource.upvote_count,
        commentCount: resource.comment_count,
        createdAt: resource.created_at,
        isMine: resource.author_id === user.id,
        lounge: lounge ? { slug: lounge.slug, name: lounge.name } : null,
        author: profile?.display_handle ? { handle: profile.display_handle } : null,
      },
    },
    {
      headers: { "Cache-Control": "private, no-store, must-revalidate" },
    }
  );
}
