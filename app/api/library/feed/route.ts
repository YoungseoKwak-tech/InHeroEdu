import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isDocGroup, USER_UPLOADABLE_GROUPS, type DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 60;
const TRENDING_WINDOW_DAYS = 14;
const HYDRATION_LIMIT = 500;
const RESOURCE_SELECT =
  "id, chat_message_id, lounge_id, author_id, folder_type, title, description, attachment_url, attachment_meta, file_name, file_size, mime_type, is_inhero_official, is_seeded, download_count, upvote_count, comment_count, created_at, preview_page_1_url, total_pages";

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
  total_pages: number | null;
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
  total_pages: number | null;
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
    .select(RESOURCE_SELECT)
    .eq("review_status", "approved")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(HYDRATION_LIMIT);

  let resourceQueryFiltered = resourceQuery;
  if (loungeIdFilter) resourceQueryFiltered = resourceQueryFiltered.eq("lounge_id", loungeIdFilter);
  if (officialFilter !== null) resourceQueryFiltered = resourceQueryFiltered.eq("is_inhero_official", officialFilter);

  const resourceRes = await resourceQueryFiltered;
  if (resourceRes.error && !isMissingRelationError(resourceRes.error)) {
    return NextResponse.json({ error: resourceRes.error.message }, { status: 500 });
  }

  const primaryResourceRows = (resourceRes.data ?? []) as ResourceRow[];
  const folderHydratedRows = folder
    ? await loadFolderResourceRows(supabase, folder, { loungeIdFilter, officialFilter })
    : await loadAllFolderResourceRows(supabase, { loungeIdFilter, officialFilter });
  const resourceRowsFromDb = mergeResourceRowsById([...primaryResourceRows, ...folderHydratedRows]);
  const resourceRows = collapseKnownDuplicateRows(resourceRowsFromDb);
  // Keep feed identity DB-backed. Older chat attachment fallback rows
  // caused deleted/legacy uploads to reappear and could hide freshly
  // inserted lounge_resources rows after refresh.
  let items: FeedRow[] = resourceRows.map((r) => ({
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
    total_pages: r.total_pages,
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
      totalPages: r.total_pages ?? null,
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
    {
      items: hydrated,
      nextCursor,
      viewerIsAdmin,
      _debug: {
        dbCount: resourceRows.length,
        hydratedCount: hydrated.length,
        deployVersion: "diag-v3",
        ts: new Date().toISOString(),
      },
    },
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

async function loadAllFolderResourceRows(
  supabase: ReturnType<typeof createAdminClient>,
  opts: {
    loungeIdFilter: string | null;
    officialFilter: boolean | null;
  },
): Promise<ResourceRow[]> {
  const results = await Promise.all(
    USER_UPLOADABLE_GROUPS.map((group) => loadFolderResourceRows(supabase, group, opts)),
  );
  return results.flat();
}

async function loadFolderResourceRows(
  supabase: ReturnType<typeof createAdminClient>,
  group: DocGroup,
  opts: {
    loungeIdFilter: string | null;
    officialFilter: boolean | null;
  },
): Promise<ResourceRow[]> {
  let query = supabase
    .from("lounge_resources")
    .select(RESOURCE_SELECT)
    .eq("review_status", "approved")
    .is("deleted_at", null)
    .eq("folder_type", group)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(HYDRATION_LIMIT);

  if (opts.loungeIdFilter) query = query.eq("lounge_id", opts.loungeIdFilter);
  if (opts.officialFilter !== null) {
    query = query.eq("is_inhero_official", opts.officialFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.warn("[feed] folder hydration failed", { group, message: error.message });
    return [];
  }
  return (data ?? []) as ResourceRow[];
}

function mergeResourceRowsById(rows: ResourceRow[]): ResourceRow[] {
  const byId = new Map<string, ResourceRow>();
  for (const row of rows) {
    if (!byId.has(row.id)) {
      byId.set(row.id, row);
    }
  }
  return Array.from(byId.values());
}

function collapseKnownDuplicateRows(rows: ResourceRow[]): ResourceRow[] {
  const seen = new Set<string>();
  const out: ResourceRow[] = [];

  for (const row of rows) {
    const key = knownDuplicateKey(row);
    if (key && seen.has(key)) continue;
    if (key) seen.add(key);
    out.push(row);
  }

  return out;
}

function knownDuplicateKey(row: ResourceRow): string | null {
  const title = normalizeTitleForDedupe(row.title);
  if (
    title === "transport across cell membrane" ||
    title === "embryonic development stem cells"
  ) {
    return `${row.folder_type}|${title}`;
  }
  return null;
}

function normalizeTitleForDedupe(title: string): string {
  let normalized = title.trim().toLowerCase();
  normalized = normalized.replace(/\.[a-z0-9]{2,5}$/i, "");
  normalized = normalized.replace(/[^a-z0-9가-힣]+/g, " ");
  normalized = normalized.replace(/\s+/g, " ").trim();
  return normalized;
}
