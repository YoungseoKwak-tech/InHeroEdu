import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";
import { recordInteraction } from "@/lib/ml/collaborative-filtering";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["heart", "fire", "lightbulb", "pin"]);

interface ReactionBody {
  resourceId?: string;
  reactionType?: string;
}

// POST /api/my-space/reactions
//   body: { resourceId, reactionType }
//   Toggle: insert if absent, delete if present. Returns the resulting
//   set of active reaction_types for this user on this resource so the
//   client can re-render without a follow-up GET.
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as ReactionBody;
  const resourceId = body.resourceId?.trim();
  const reactionType = body.reactionType?.trim();
  if (!resourceId || !reactionType || !ALLOWED.has(reactionType)) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing, error: lookupErr } = await supabase
    .from("user_resource_reactions")
    .select("id")
    .eq("user_id", user.id)
    .eq("resource_id", resourceId)
    .eq("reaction_type", reactionType)
    .maybeSingle();
  if (lookupErr) {
    return NextResponse.json({ error: lookupErr.message }, { status: 500 });
  }

  let active: boolean;
  if (existing) {
    const { error: delErr } = await supabase
      .from("user_resource_reactions")
      .delete()
      .eq("id", existing.id);
    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }
    active = false;
  } else {
    const { error: insErr } = await supabase
      .from("user_resource_reactions")
      .insert({ user_id: user.id, resource_id: resourceId, reaction_type: reactionType });
    if (insErr) {
      return NextResponse.json({ error: insErr.message }, { status: 500 });
    }
    await recordInteraction(user.id, resourceId, "reaction");
    active = true;
  }

  const { data: rows } = await supabase
    .from("user_resource_reactions")
    .select("reaction_type")
    .eq("user_id", user.id)
    .eq("resource_id", resourceId);

  const reactions = (rows ?? []).map((r) => (r as { reaction_type: string }).reaction_type);
  return NextResponse.json({ active, reactionType, reactions });
}

// GET /api/my-space/reactions?type=all|heart|fire|lightbulb|pin
//   Returns the viewer's reacted resources (newest first), with the
//   underlying resource hydrated for grid rendering.
//
//   Each item carries `reactions: string[]` — the *full* set of
//   reactions the viewer has on that resource, even when filtered to
//   a single type — so a card filtered by 🔥 can still show the
//   user's other reactions if they stacked them.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const url = new URL(req.url);
  const typeParam = (url.searchParams.get("type") ?? "all").toLowerCase();

  const supabase = createAdminClient();

  // Two-step: figure out which resources match the filter, then load
  // every reaction the viewer has on those resources (so the cards
  // show the full ❤️🔥💡📌 set, not just the filtered one).
  let pickQuery = supabase
    .from("user_resource_reactions")
    .select("resource_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(500);
  if (typeParam !== "all" && ALLOWED.has(typeParam)) {
    pickQuery = pickQuery.eq("reaction_type", typeParam);
  }
  const { data: picks, error: pickErr } = await pickQuery;
  if (pickErr) {
    return NextResponse.json({ error: pickErr.message }, { status: 500 });
  }

  const orderedIds: string[] = [];
  const seen = new Set<string>();
  for (const row of ((picks ?? []) as Array<{ resource_id: string }>)) {
    if (!seen.has(row.resource_id)) {
      seen.add(row.resource_id);
      orderedIds.push(row.resource_id);
    }
  }

  if (orderedIds.length === 0) {
    return NextResponse.json({ items: [] });
  }

  const [resourcesRes, reactionsRes] = await Promise.all([
    supabase
      .from("lounge_resources")
      .select(
        "id, lounge_id, author_id, folder_type, title, attachment_url, mime_type, is_inhero_official, download_count, upvote_count, comment_count, save_count, created_at, preview_page_1_url"
      )
      .in("id", orderedIds)
      .eq("review_status", "approved")
      .is("deleted_at", null),
    supabase
      .from("user_resource_reactions")
      .select("resource_id, reaction_type")
      .eq("user_id", user.id)
      .in("resource_id", orderedIds),
  ]);

  if (resourcesRes.error) {
    return NextResponse.json({ error: resourcesRes.error.message }, { status: 500 });
  }

  const resourceById = new Map<string, ResourceRow>(
    ((resourcesRes.data ?? []) as ResourceRow[]).map((r) => [r.id, r])
  );

  const reactionsByResource: Record<string, string[]> = {};
  for (const row of ((reactionsRes.data ?? []) as Array<{
    resource_id: string;
    reaction_type: string;
  }>)) {
    const list = reactionsByResource[row.resource_id] ?? [];
    list.push(row.reaction_type);
    reactionsByResource[row.resource_id] = list;
  }

  const loungeIds = Array.from(
    new Set(((resourcesRes.data ?? []) as ResourceRow[]).map((r) => r.lounge_id))
  );
  const authorIds = Array.from(
    new Set(
      ((resourcesRes.data ?? []) as ResourceRow[])
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

  const items = orderedIds
    .map((id) => {
      const r = resourceById.get(id);
      if (!r || !isDocGroup(r.folder_type)) return null;
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
        reactions: reactionsByResource[r.id] ?? [],
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  return NextResponse.json({ items });
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
