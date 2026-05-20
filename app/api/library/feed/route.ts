import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 60;
const TRENDING_WINDOW_DAYS = 14;
const HYDRATION_LIMIT = 500;

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
  preview_page_1_url: string | null;
}

interface FeedRow {
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
  preview_page_1_url: string | null;
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

  const resourceQuery = supabase
    .from("lounge_resources")
    .select(
      "id, chat_message_id, lounge_id, author_id, folder_type, title, description, attachment_url, attachment_meta, file_name, file_size, mime_type, is_inhero_official, is_seeded, download_count, upvote_count, comment_count, created_at, preview_page_1_url"
    )
    .eq("review_status", "approved")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(HYDRATION_LIMIT);

  let resourceQueryFiltered = resourceQuery;
  if (loungeIdFilter) resourceQueryFiltered = resourceQueryFiltered.eq("lounge_id", loungeIdFilter);
  if (folder) resourceQueryFiltered = resourceQueryFiltered.eq("folder_type", folder);
  if (officialFilter !== null) resourceQueryFiltered = resourceQueryFiltered.eq("is_inhero_official", officialFilter);

  const resourceRes = await resourceQueryFiltered;
  if (resourceRes.error && !isMissingRelationError(resourceRes.error)) {
    return NextResponse.json({ error: resourceRes.error.message }, { status: 500 });
  }

  const resourceRows = (resourceRes.data ?? []) as ResourceRow[];
  // Safety dedupe for historical duplicate uploads:
  // keep only the newest row for effectively identical files in the
  // same lounge/folder so the Library never floods with copies.
  const dedupedResourceRows: ResourceRow[] = [];
  const seenResourceKeys = new Set<string>();
  for (const row of resourceRows) {
    const key = dedupeResourceKey(row);
    if (seenResourceKeys.has(key)) continue;
    seenResourceKeys.add(key);
    dedupedResourceRows.push(row);
  }

  let items: FeedRow[] = dedupedResourceRows.map((r) => ({
    id: r.id,
    chat_message_id: r.chat_message_id,
    lounge_id: r.lounge_id,
    author_id: r.author_id,
    folder_type: r.folder_type,
    title: r.title,
    description: r.description,
    attachment_url: r.attachment_url,
    attachment_meta: r.attachment_meta,
    file_name: r.file_name,
    file_size: r.file_size,
    mime_type: r.mime_type,
    is_inhero_official: r.is_inhero_official,
    is_seeded: r.is_seeded,
    download_count: r.download_count,
    upvote_count: r.upvote_count,
    comment_count: r.comment_count,
    created_at: r.created_at,
    preview_page_1_url: r.preview_page_1_url,
  }));

  if (folder) {
    items = items.filter((item) => item.folder_type === folder);
  }
  if (officialFilter !== null) {
    items = items.filter((item) => item.is_inhero_official === officialFilter);
  }

  if (sort === "new") {
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (decoded) {
        items = items.filter((item) => isAfterCursor(item, decoded));
      }
    }
    items = items.sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id));
  } else {
    const since = new Date(Date.now() - TRENDING_WINDOW_DAYS * 86400_000).toISOString();
    items = items
      .filter((item) => item.created_at >= since)
      .sort((a, b) => trendingScore(b) - trendingScore(a) || b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id));
  }

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

  const viewerIsAdmin = isAdminEmail(user.email);

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
      // Delete UI needs to know if the viewer can act on this card.
      // isMine drives the per-card menu; viewerIsAdmin at the response
      // level lets the client gate any global admin-only affordances
      // without a separate API call.
      isMine: r.author_id === user.id,
      previewPage1Url: r.preview_page_1_url,
      previewPage2Url: null,
      previewPage3Url: null,
      totalPages: null,
      previewStatus: null,
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
    { items: hydrated, nextCursor, viewerIsAdmin },
    {
      headers: { "Cache-Control": "private, no-store, must-revalidate" },
    }
  );
}

function trendingScore(r: FeedRow): number {
  const ageHours = (Date.now() - new Date(r.created_at).getTime()) / 3_600_000;
  const engagement = r.download_count * 1 + r.upvote_count * 3 + r.comment_count * 2;
  return engagement / Math.pow(ageHours + 2, 1.5);
}

function isMissingRelationError(error: { message: string }): boolean {
  return /relation .* does not exist/i.test(error.message);
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

function isAfterCursor(item: { created_at: string; id: string }, cursor: { createdAt: string; id: string }): boolean {
  return item.created_at < cursor.createdAt || (item.created_at === cursor.createdAt && item.id < cursor.id);
}

function dedupeResourceKey(row: ResourceRow): string {
  const normTitle = row.title.trim().toLowerCase();
  const loungeId = row.lounge_id ?? "";
  const folder = row.folder_type ?? "";
  const mime = (row.mime_type ?? "").toLowerCase();
  const author = row.author_id ?? "";
  // Include author so a user's own duplicate uploads collapse but
  // a user upload of "X.pdf" doesn't get collapsed against a seeded
  // "X.pdf" from a different author (which was causing fresh
  // uploads to vanish from the feed entirely).
  // Intentionally ignore file_size so re-exports of the same name
  // with tiny byte differences still collapse for the SAME author.
  return `${loungeId}|${folder}|${normTitle}|${mime}|${author}`;
}
