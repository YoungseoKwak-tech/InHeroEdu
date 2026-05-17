import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { getAnthropicApiKey } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "claude-sonnet-4-6";
const MAX_SAVES = 25;
const MAX_DISCUSSIONS = 15;
const DISCUSSION_CHAR_CAP = 100;
const FORCE_LIMIT_PER_DAY = 10;
// Generate fresh once per 24h by default; the column-level default
// matches but we use this when computing rate-limit windows.
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type BriefSection = {
  id: string;
  title: string;
  description?: string;
  resourceIds: string[];
};

type BriefDiscussion = {
  loungeSlug: string;
  loungeName: string;
  snippet: string;
};

type Brief = {
  greeting: string;
  generatedAt: string;
  sections: BriefSection[];
  activeDiscussions: BriefDiscussion[];
};

// POST /api/my-space/generate-brief?force=true
//   Returns either a cached brief (if a non-expired row exists and
//   force is false) or generates a fresh one via Claude. The response
//   shape:
//     { status: "ok", brief, source: "cache" | "fresh", generatedAt }
//   On error states it returns 4xx/5xx with { error }.
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "true";

  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    // Graceful failure per spec — the UI surfaces this as
    // "AI brief temporarily unavailable" without crashing.
    return NextResponse.json(
      { error: "AI brief temporarily unavailable", reason: "missing_api_key" },
      { status: 503 }
    );
  }

  const supabase = createAdminClient();

  // Load profile first — brief requires it.
  const { data: profileRow } = await supabase
    .from("user_study_profile")
    .select("grade, subjects, goals, details")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profileRow) {
    return NextResponse.json(
      { error: "Set up your study profile first", reason: "no_profile" },
      { status: 400 }
    );
  }

  // Cache check: latest non-expired row.
  if (!force) {
    const { data: cached } = await supabase
      .from("user_briefs")
      .select("id, content, generated_at, expires_at")
      .eq("user_id", user.id)
      .gt("expires_at", new Date().toISOString())
      .order("generated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (cached) {
      const brief = cached.content as Brief;
      const resources = await hydrateResources(supabase, brief);
      return NextResponse.json({
        status: "ok",
        source: "cache",
        brief,
        resources,
        generatedAt: cached.generated_at,
      });
    }
  }

  // Rate-limit force-refreshes (10/day total across forced + initial).
  if (force) {
    const since = new Date(Date.now() - CACHE_TTL_MS).toISOString();
    const { count } = await supabase
      .from("user_briefs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gt("generated_at", since);
    if ((count ?? 0) >= FORCE_LIMIT_PER_DAY) {
      return NextResponse.json(
        { error: "Daily refresh limit reached. Try again tomorrow.", reason: "rate_limited" },
        { status: 429 }
      );
    }
  }

  // ─── Build context: saves + discussions ─────────────────────────
  const { data: savesRaw } = await supabase
    .from("user_saved_resources")
    .select("resource_id, saved_at")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false })
    .limit(MAX_SAVES);
  const saveIds = ((savesRaw ?? []) as Array<{ resource_id: string }>).map((s) => s.resource_id);

  const { data: savedResources } = saveIds.length
    ? await supabase
        .from("lounge_resources")
        .select("id, title, folder_type, lounge_id, save_count, upvote_count")
        .in("id", saveIds)
    : { data: [] as ResourceRow[] };

  const resourcesById = new Map<string, ResourceRow>(
    ((savedResources ?? []) as ResourceRow[]).map((r) => [r.id, r])
  );

  // Lounges the user is engaged with — seed for discussions.
  const loungeIdsFromSaves = Array.from(
    new Set(((savedResources ?? []) as ResourceRow[]).map((r) => r.lounge_id))
  );

  const { data: loungeRows } = loungeIdsFromSaves.length
    ? await supabase
        .from("lounges")
        .select("id, slug, name")
        .in("id", loungeIdsFromSaves)
    : { data: [] as LoungeRow[] };
  const loungeById = new Map<string, LoungeRow>(
    ((loungeRows ?? []) as LoungeRow[]).map((l) => [l.id, l])
  );

  // Recent chat messages from those lounges (truncated).
  const { data: discussionsRaw } = loungeIdsFromSaves.length
    ? await supabase
        .from("chat_messages")
        .select("id, context_id, content, created_at")
        .eq("context_type", "lounge")
        .eq("is_deleted", false)
        .in("context_id", loungeIdsFromSaves)
        .not("content", "is", null)
        .order("created_at", { ascending: false })
        .limit(MAX_DISCUSSIONS)
    : { data: [] };

  const discussions = ((discussionsRaw ?? []) as Array<{
    id: string;
    context_id: string;
    content: string | null;
    created_at: string;
  }>)
    .map((m) => {
      const lounge = loungeById.get(m.context_id);
      const snippet = (m.content ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, DISCUSSION_CHAR_CAP);
      if (!lounge || snippet.length === 0) return null;
      return {
        loungeSlug: lounge.slug,
        loungeName: lounge.name,
        snippet,
      };
    })
    .filter((d): d is BriefDiscussion => d !== null);

  // ─── Build prompt ───────────────────────────────────────────────
  const subjects = Array.isArray(profileRow.subjects) ? profileRow.subjects : [];
  const savesForPrompt = ((savesRaw ?? []) as Array<{ resource_id: string }>)
    .map((s) => resourcesById.get(s.resource_id))
    .filter((r): r is ResourceRow => !!r)
    .map((r) => {
      const lounge = loungeById.get(r.lounge_id);
      return `- id=${r.id} | "${r.title}" | folder:${r.folder_type}${
        lounge ? ` | lounge:${lounge.name}` : ""
      } | saves:${r.save_count ?? 0}`;
    })
    .join("\n");

  const discussionsForPrompt = discussions
    .map((d) => `- ${d.loungeName}: "${d.snippet}"`)
    .join("\n");

  const SYSTEM = [
    `You are the InHero study brief writer.`,
    `InHero is the underground internet for ambitious high-school students — Ivy-bound but anti-CourseHero, anti-textbook-scan.`,
    `Tone: warm-but-sharp, no corporate self-help, no exclamation marks, no "let's get started!". Write like a slightly older friend who's three steps ahead.`,
    `Brief structure: a one-sentence greeting addressed to the student, 2-4 themed sections that each group resources by motive (not by subject mechanically), and an optional active-discussions strip.`,
    `Constraints:`,
    `- Use only resource IDs from the provided list, exactly as given.`,
    `- Each section: 2-5 resource IDs.`,
    `- Section titles read as actions or angles (e.g., "Sharpen what's already shaky", "Wins worth revisiting"). Avoid generic "AP Biology resources".`,
    `- If the user hasn't saved much, choose the strongest single section and surface a discussion instead of inventing fluff.`,
    `Output: VALID JSON ONLY, no prose, no code fences, matching this schema:`,
    `{`,
    `  "greeting": string,`,
    `  "sections": [{ "id": string, "title": string, "description": string, "resourceIds": string[] }],`,
    `  "activeDiscussions": [{ "loungeSlug": string, "loungeName": string, "snippet": string }]`,
    `}`,
  ].join("\n");

  const USER = [
    `Student profile:`,
    `- Grade: ${profileRow.grade ?? "unspecified"}`,
    `- Subjects: ${subjects.length ? subjects.join(", ") : "unspecified"}`,
    `- Goals: ${profileRow.goals ?? "unspecified"}`,
    ``,
    `Saved resources (most recent first):`,
    savesForPrompt || "(none yet)",
    ``,
    `Recent lounge discussions (truncated to 100 chars):`,
    discussionsForPrompt || "(none yet)",
    ``,
    `Write this week's brief. Output JSON only.`,
  ].join("\n");

  // ─── Call Claude ────────────────────────────────────────────────
  const client = new Anthropic({ apiKey });
  let raw: string;
  let usage = { input: 0, output: 0 };
  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM,
      messages: [{ role: "user", content: USER }],
    });
    usage = {
      input: resp.usage?.input_tokens ?? 0,
      output: resp.usage?.output_tokens ?? 0,
    };
    const firstBlock = resp.content[0];
    if (!firstBlock || firstBlock.type !== "text") {
      throw new Error("model returned no text");
    }
    raw = firstBlock.text;
  } catch (e) {
    console.error("[ai:generate-brief] anthropic call failed", e);
    return NextResponse.json(
      { error: "AI brief temporarily unavailable", reason: "model_error" },
      { status: 502 }
    );
  }

  // Strip ```json fences if the model snuck them in.
  const stripped = raw
    .trim()
    .replace(/^```(?:json)?\n?/i, "")
    .replace(/```$/, "")
    .trim();

  let parsed: Brief;
  try {
    parsed = normalizeBrief(JSON.parse(stripped), saveIds, discussions);
  } catch (e) {
    console.error("[ai:generate-brief] failed to parse model JSON", e, { raw });
    return NextResponse.json(
      { error: "Brief output malformed — try refreshing.", reason: "parse_error" },
      { status: 502 }
    );
  }

  const generatedAt = new Date().toISOString();
  parsed.generatedAt = generatedAt;

  // Approximate cost log for monitoring. Sonnet 4.6 = $3/MTok in,
  // $15/MTok out. Adjust constants when pricing shifts.
  const cost = (usage.input * 3 + usage.output * 15) / 1_000_000;
  console.log(
    `[ai:generate-brief] user=${user.id} cost~$${cost.toFixed(4)} ` +
      `in=${usage.input} out=${usage.output} force=${force}`
  );

  // Persist.
  const { error: insErr } = await supabase.from("user_briefs").insert({
    user_id: user.id,
    content: parsed,
    model: MODEL,
    generated_at: generatedAt,
    expires_at: new Date(Date.now() + CACHE_TTL_MS).toISOString(),
    force_count: force ? 1 : 0,
  });
  if (insErr) {
    console.error("[ai:generate-brief] persist failed", insErr);
    // Still return the brief; persistence is best-effort.
  }

  const resources = await hydrateResources(supabase, parsed);

  return NextResponse.json({
    status: "ok",
    source: "fresh",
    brief: parsed,
    resources,
    generatedAt,
  });
}

// Hydration map: resourceId → minimal shape MySpaceCard can render.
// We do this at response time (not at generation time) so a long-cached
// brief still reflects current resource titles / lounge names.
async function hydrateResources(
  supabase: ReturnType<typeof createAdminClient>,
  brief: Brief
): Promise<Record<string, HydratedResource>> {
  const ids = Array.from(
    new Set(brief.sections.flatMap((s) => s.resourceIds))
  );
  if (ids.length === 0) return {};

  const { data: rows } = await supabase
    .from("lounge_resources")
    .select(
      "id, lounge_id, author_id, folder_type, title, attachment_url, mime_type, is_inhero_official, download_count, upvote_count, comment_count, save_count, created_at, preview_page_1_url"
    )
    .in("id", ids)
    .eq("review_status", "approved")
    .is("deleted_at", null);

  const resources = (rows ?? []) as Array<{
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
    preview_page_1_url: string | null;
  }>;

  const loungeIds = Array.from(new Set(resources.map((r) => r.lounge_id)));
  const authorIds = Array.from(
    new Set(resources.map((r) => r.author_id).filter((id): id is string => !!id))
  );

  const [loungesRes, profilesRes] = await Promise.all([
    loungeIds.length
      ? supabase.from("lounges").select("id, slug, name").in("id", loungeIds)
      : Promise.resolve({ data: [] as LoungeRow[] }),
    authorIds.length
      ? supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .in("user_id", authorIds)
      : Promise.resolve({ data: [] as Array<{ user_id: string; display_handle: string | null }> }),
  ]);

  const loungeById = new Map<string, LoungeRow>(
    ((loungesRes.data ?? []) as LoungeRow[]).map((l) => [l.id, l])
  );
  const profileById = new Map(
    ((profilesRes.data ?? []) as Array<{ user_id: string; display_handle: string | null }>).map(
      (p) => [p.user_id, p]
    )
  );

  const out: Record<string, HydratedResource> = {};
  for (const r of resources) {
    const lounge = loungeById.get(r.lounge_id);
    const profile = r.author_id ? profileById.get(r.author_id) : undefined;
    out[r.id] = {
      id: r.id,
      title: r.title,
      folder: r.folder_type,
      attachmentUrl: r.attachment_url,
      mimeType: r.mime_type,
      isImage: typeof r.mime_type === "string" && r.mime_type.startsWith("image/"),
      isInheroOfficial: r.is_inhero_official,
      downloadCount: r.download_count,
      upvoteCount: r.upvote_count,
      commentCount: r.comment_count,
      saveCount: r.save_count ?? 0,
      previewPage1Url: r.preview_page_1_url,
      lounge: lounge ? { slug: lounge.slug, name: lounge.name } : null,
      author: profile?.display_handle ? { handle: profile.display_handle } : null,
    };
  }
  return out;
}

interface HydratedResource {
  id: string;
  title: string;
  folder: string;
  attachmentUrl: string;
  mimeType: string | null;
  isImage: boolean;
  isInheroOfficial: boolean;
  downloadCount: number;
  upvoteCount: number;
  commentCount: number;
  saveCount: number;
  previewPage1Url: string | null;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
}

interface ResourceRow {
  id: string;
  title: string;
  folder_type: string;
  lounge_id: string;
  save_count: number | null;
  upvote_count: number;
}

interface LoungeRow {
  id: string;
  slug: string;
  name: string;
}

// Defense-in-depth: even if the model hallucinates IDs or sections,
// drop anything that doesn't reference a real save and cap section
// counts. Better to render a small brief than to render a broken one.
function normalizeBrief(
  raw: unknown,
  validResourceIds: string[],
  validDiscussions: BriefDiscussion[]
): Brief {
  if (!raw || typeof raw !== "object") {
    throw new Error("not an object");
  }
  const obj = raw as Record<string, unknown>;
  const greeting =
    typeof obj.greeting === "string" && obj.greeting.trim().length > 0
      ? obj.greeting.trim()
      : "Welcome back.";

  const validIdSet = new Set(validResourceIds);
  const sectionsRaw = Array.isArray(obj.sections) ? obj.sections : [];
  const sections: BriefSection[] = sectionsRaw
    .map((s, idx): BriefSection | null => {
      if (!s || typeof s !== "object") return null;
      const sobj = s as Record<string, unknown>;
      const title = typeof sobj.title === "string" ? sobj.title.trim() : "";
      if (!title) return null;
      const idRaw = typeof sobj.id === "string" ? sobj.id.trim() : "";
      const id = idRaw || `section-${idx}`;
      const description = typeof sobj.description === "string" ? sobj.description.trim() : "";
      const ids = Array.isArray(sobj.resourceIds)
        ? sobj.resourceIds.filter(
            (v): v is string => typeof v === "string" && validIdSet.has(v)
          )
        : [];
      if (ids.length === 0) return null;
      return {
        id,
        title,
        description: description || undefined,
        resourceIds: ids.slice(0, 5),
      };
    })
    .filter((s): s is BriefSection => s !== null)
    .slice(0, 4);

  const validLoungeSlugs = new Set(validDiscussions.map((d) => d.loungeSlug));
  const discussionsRaw = Array.isArray(obj.activeDiscussions) ? obj.activeDiscussions : [];
  const activeDiscussions: BriefDiscussion[] = discussionsRaw
    .map((d): BriefDiscussion | null => {
      if (!d || typeof d !== "object") return null;
      const dobj = d as Record<string, unknown>;
      const loungeSlug = typeof dobj.loungeSlug === "string" ? dobj.loungeSlug : "";
      const loungeName = typeof dobj.loungeName === "string" ? dobj.loungeName : "";
      const snippet = typeof dobj.snippet === "string" ? dobj.snippet.trim() : "";
      if (!loungeSlug || !snippet || !validLoungeSlugs.has(loungeSlug)) return null;
      return { loungeSlug, loungeName, snippet: snippet.slice(0, 160) };
    })
    .filter((d): d is BriefDiscussion => d !== null)
    .slice(0, 4);

  return {
    greeting,
    generatedAt: new Date().toISOString(),
    sections,
    activeDiscussions,
  };
}
