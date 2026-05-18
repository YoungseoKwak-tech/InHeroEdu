import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";
import { recordInteraction } from "@/lib/ml/collaborative-filtering";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SaveBody {
  resourceId?: string;
  collectionId?: string | null;
}

interface PatchBody {
  resourceId?: string;
  collectionId?: string | null;
}

// POST /api/my-space/saves
//   body: { resourceId, collectionId? }
//   Toggle behavior:
//     - if not saved → insert (in "All Saved" if collectionId omitted)
//     - if already saved → delete
//   Returns: { saved: boolean, collectionId: string | null }
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as SaveBody;
  const resourceId = body.resourceId?.trim();
  if (!resourceId) {
    return NextResponse.json({ error: "resourceId required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing, error: lookupErr } = await supabase
    .from("user_saved_resources")
    .select("id, collection_id")
    .eq("user_id", user.id)
    .eq("resource_id", resourceId)
    .maybeSingle();
  if (lookupErr) {
    return NextResponse.json({ error: lookupErr.message }, { status: 500 });
  }

  if (existing) {
    const { error: delErr } = await supabase
      .from("user_saved_resources")
      .delete()
      .eq("id", existing.id);
    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }
    return NextResponse.json({ saved: false, collectionId: null });
  }

  const collectionId =
    typeof body.collectionId === "string" && body.collectionId.length > 0
      ? body.collectionId
      : null;

  const { error: insErr } = await supabase
    .from("user_saved_resources")
    .insert({ user_id: user.id, resource_id: resourceId, collection_id: collectionId });
  if (insErr) {
    return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  await recordInteraction(user.id, resourceId, "save");

  return NextResponse.json({ saved: true, collectionId });
}

// PATCH /api/my-space/saves
//   body: { resourceId, collectionId: string | null }
//   Move an already-saved resource to a different collection (or
//   "All Saved" when collectionId is null). Inserts if not yet saved
//   so the picker can also act as "save into this collection".
export async function PATCH(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as PatchBody;
  const resourceId = body.resourceId?.trim();
  if (!resourceId) {
    return NextResponse.json({ error: "resourceId required" }, { status: 400 });
  }
  const collectionId =
    body.collectionId === null || body.collectionId === undefined
      ? null
      : typeof body.collectionId === "string" && body.collectionId.length > 0
        ? body.collectionId
        : null;

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("user_saved_resources")
    .select("id")
    .eq("user_id", user.id)
    .eq("resource_id", resourceId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("user_saved_resources")
      .update({ collection_id: collectionId })
      .eq("id", existing.id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("user_saved_resources")
      .insert({ user_id: user.id, resource_id: resourceId, collection_id: collectionId });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    await recordInteraction(user.id, resourceId, "save");
  }
  return NextResponse.json({ saved: true, collectionId });
}

// GET /api/my-space/saves?collection=all|none|<uuid>
//   Returns the viewer's saves filtered by collection, with the
//   underlying resource hydrated for grid rendering. Field shape
//   matches /api/library/feed so MySpaceCard can reuse the same UI.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const url = new URL(req.url);
  const collection = (url.searchParams.get("collection") ?? "all").toLowerCase();

  const supabase = createAdminClient();

  let query = supabase
    .from("user_saved_resources")
    .select("id, resource_id, collection_id, saved_at")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })
    .limit(500);
  if (collection === "none") {
    query = query.is("collection_id", null);
  } else if (collection !== "all") {
    query = query.eq("collection_id", collection);
  }

  const { data: saves, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const resourceIds = ((saves ?? []) as Array<{ resource_id: string }>).map((s) => s.resource_id);
  if (resourceIds.length === 0) {
    return NextResponse.json({ items: [] });
  }

  const { data: resources, error: rErr } = await supabase
    .from("lounge_resources")
    .select(
      "id, lounge_id, author_id, folder_type, title, attachment_url, mime_type, is_inhero_official, download_count, upvote_count, comment_count, save_count, created_at, preview_page_1_url"
    )
    .in("id", resourceIds)
    .eq("review_status", "approved")
    .is("deleted_at", null);
  if (rErr) {
    return NextResponse.json({ error: rErr.message }, { status: 500 });
  }

  const resourceById = new Map<string, ResourceRow>(
    ((resources ?? []) as ResourceRow[]).map((r) => [r.id, r])
  );

  const loungeIds = Array.from(
    new Set(((resources ?? []) as ResourceRow[]).map((r) => r.lounge_id))
  );
  const authorIds = Array.from(
    new Set(
      ((resources ?? []) as ResourceRow[])
        .map((r) => r.author_id)
        .filter((id): id is string => !!id)
    )
  );

  const [loungesRes, profilesRes] = await Promise.all([
    loungeIds.length > 0
      ? supabase.from("lounges").select("id, slug, name").in("id", loungeIds)
      : Promise.resolve({ data: [] as LoungeRow[] }),
    authorIds.length > 0
      ? supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .in("user_id", authorIds)
      : Promise.resolve({ data: [] as ProfileRow[] }),
  ]);

  const loungeById = new Map<string, LoungeRow>(
    ((loungesRes.data ?? []) as LoungeRow[]).map((l) => [l.id, l])
  );
  const profileById = new Map<string, ProfileRow>(
    ((profilesRes.data ?? []) as ProfileRow[]).map((p) => [p.user_id, p])
  );

  const items = ((saves ?? []) as Array<{
    id: string;
    resource_id: string;
    collection_id: string | null;
    saved_at: string;
  }>)
    .map((s) => {
      const r = resourceById.get(s.resource_id);
      if (!r) return null;
      const lounge = loungeById.get(r.lounge_id);
      const profile = r.author_id ? profileById.get(r.author_id) : undefined;
      return {
        id: r.id,
        title: r.title,
        folder: r.folder_type as DocGroup,
        attachmentUrl: r.attachment_url,
        mimeType: r.mime_type,
        isImage: typeof r.mime_type === "string" && r.mime_type.startsWith("image/"),
        isInheroOfficial: r.is_inhero_official,
        downloadCount: r.download_count,
        upvoteCount: r.upvote_count,
        commentCount: r.comment_count,
        saveCount: r.save_count ?? 0,
        createdAt: r.created_at,
        previewPage1Url: r.preview_page_1_url,
        lounge: lounge ? { slug: lounge.slug, name: lounge.name } : null,
        author: profile?.display_handle ? { handle: profile.display_handle } : null,
        savedAt: s.saved_at,
        collectionId: s.collection_id,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  // Server-side guard: docGroups validates against known folder slugs.
  // If a stored resource later carried a folder we don't know about
  // (shouldn't happen behind the CHECK constraint), we'd skip it.
  const filtered = items.filter((it) => isDocGroup(it.folder));

  return NextResponse.json({ items: filtered });
}

interface ResourceRow {
  id: string;
  lounge_id: string;
  author_id: string | null;
  folder_type: string;
  title: string;
  attachment_url: string;
  mime_type: string | null;
  is_inhero_official: boolean;
  download_count: number;
  upvote_count: number;
  comment_count: number;
  save_count: number | null;
  created_at: string;
  preview_page_1_url: string | null;
}

interface LoungeRow {
  id: string;
  slug: string;
  name: string;
}

interface ProfileRow {
  user_id: string;
  display_handle: string | null;
}
