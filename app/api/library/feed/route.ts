import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 60;
const TRENDING_WINDOW_DAYS = 14;

type Sort = "new" | "trending";

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

interface LoungeJoin { id: string; slug: string; name: string }
interface ProfileJoin { user_id: string; display_handle: string | null }

/**
 * GET /api/library/feed
 *   ?sort=new|trending (default: new)
 *   ?lounge=<slug>                  filter
 *   ?folder=<doc-group-slug>        filter
 *   ?official=true|false            filter (omit = both)
 *   ?cursor=<base64 created_at|id>  pagination cursor
 *   ?limit=<n>                      max 60, default 24
 */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const url = new URL(req.url);
  const sortParam = (url.searchParams.get("sort") ?? "new").toLowerCase();
  const sort: Sort = sortParam === "trending" ? "trending" : "new";
  const loungeSlug = url.searchParams.get("lounge");
  const folderParam = url.searchParams.get("folder");
  const folder: DocGroup | null = folderParam && isDocGroup(folderParam) ? folderParam : null;
  const officialParam = url.searchParams.get("official");
  const officialFilter: boolean | null =
    officialParam === "true" ? true : officialParam === "false" ? false : null;
  const cursor = url.searchParams.get("cursor");
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(url.searchParams.get("limit") ?? DEFAULT_LIMIT))
  );

  const supabase = createAdminClient();

  // Resolve lounge filter to id (slug → id) if present.
  let loungeIdFilter: string | null = null;
  if (loungeSlug) {
    const { data: lounge } = await supabase
      .from("lounges")
      .select("id")
      .eq("slug", loungeSlug)
      .maybeSingle();
    if (!lounge) {
      return NextResponse.json({ items: [], nextCursor: null });
    }
    loungeIdFilter = (lounge as { id: string }).id;
  }

  // Build base query.
  let query = supabase
    .from("lounge_resources")
    .select(
      "id, chat_message_id, lounge_id, author_id, folder_type, title, description, attachment_url, attachment_meta, file_name, file_size, mime_type, is_inhero_official, is_seeded, download_count, upvote_count, comment_count, created_at"
    )
    .eq("review_status", "approved")
    .limit(limit + 1);

  if (loungeIdFilter) query = query.eq("lounge_id", loungeIdFilter);
  if (folder) query = query.eq("folder_type", folder);
  if (officialFilter !== null) query = query.eq("is_inhero_official", officialFilter);

  // Sort + cursor.
  if (sort === "new") {
    query = query.order("created_at", { ascending: false }).order("id", { ascending: false });
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (decoded) {
        // Keyset pagination: created_at < cursor.created_at OR (equal AND id < cursor.id)
        query = query.or(
          `created_at.lt.${decoded.createdAt},and(created_at.eq.${decoded.createdAt},id.lt.${decoded.id})`
        );
      }
    }
  } else {
    // Trending: narrow to last 14 days then sort by trending_score in JS.
    // PostgREST can't ORDER BY a function call, so we hydrate then re-sort.
    const since = new Date(Date.now() - TRENDING_WINDOW_DAYS * 86400_000).toISOString();
    query = query.gte("created_at", since).order("created_at", { ascending: false });
  }

  const { data: rows, error } = await query;
  if (error) {
    if (/relation .* does not exist/i.test(error.message)) {
      return NextResponse.json({ items: [], nextCursor: null });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let items = (rows ?? []) as ResourceRow[];

  if (sort === "trending") {
    items = items
      .map((r) => ({ row: r, score: trendingScore(r) }))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.row);
  }

  // One extra row signals "more available". Trim before hydration.
  const hasMore = items.length > limit;
  if (hasMore) items = items.slice(0, limit);

  // Hydrate author handles + lounge info via two batched lookups.
  const loungeIds = Array.from(new Set(items.map((r) => r.lounge_id)));
  const authorIds = Array.from(
    new Set(items.map((r) => r.author_id).filter((id): id is string => !!id))
  );

  const [loungesRes, profilesRes] = await Promise.all([
    loungeIds.length > 0
      ? supabase.from("lounges").select("id, slug, name").in("id", loungeIds)
      : Promise.resolve({ data: [] as LoungeJoin[] }),
    authorIds.length > 0
      ? supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .in("user_id", authorIds)
      : Promise.resolve({ data: [] as ProfileJoin[] }),
  ]);

  const loungeById = new Map<string, LoungeJoin>(
    ((loungesRes.data ?? []) as LoungeJoin[]).map((l) => [l.id, l])
  );
  const profileById = new Map<string, ProfileJoin>(
    ((profilesRes.data ?? []) as ProfileJoin[]).map((p) => [p.user_id, p])
  );

  const hydrated = items.map((r) => {
    const lounge = loungeById.get(r.lounge_id);
    const profile = r.author_id ? profileById.get(r.author_id) : undefined;
    return {
      id: r.id,
      title: r.title,
      folder: r.folder_type,
      attachmentUrl: r.attachment_url,
      mimeType: r.mime_type,
      isImage: typeof r.mime_type === "string" && r.mime_type.startsWith("image/"),
      isInheroOfficial: r.is_inhero_official,
      isSeeded: r.is_seeded,
      downloadCount: r.download_count,
      upvoteCount: r.upvote_count,
      commentCount: r.comment_count,
      createdAt: r.created_at,
      lounge: lounge ? { slug: lounge.slug, name: lounge.name } : null,
      author: profile?.display_handle ? { handle: profile.display_handle } : null,
    };
  });

  let nextCursor: string | null = null;
  if (sort === "new" && hasMore && items.length > 0) {
    const last = items[items.length - 1];
    nextCursor = encodeCursor(last.created_at, last.id);
  }

  return NextResponse.json(
    { items: hydrated, nextCursor },
    {
      headers: { "Cache-Control": "private, no-store, must-revalidate" },
    }
  );
}

function trendingScore(r: ResourceRow): number {
  const ageHours = (Date.now() - new Date(r.created_at).getTime()) / 3_600_000;
  const engagement = r.download_count * 1 + r.upvote_count * 3 + r.comment_count * 2;
  return engagement / Math.pow(ageHours + 2, 1.5);
}

function encodeCursor(createdAt: string, id: string): string {
  return Buffer.from(`${createdAt}|${id}`, "utf8").toString("base64url");
}

function decodeCursor(cursor: string): { createdAt: string; id: string } | null {
  try {
    const raw = Buffer.from(cursor, "base64url").toString("utf8");
    const [createdAt, id] = raw.split("|");
    if (!createdAt || !id) return null;
    return { createdAt, id };
  } catch {
    return null;
  }
}
