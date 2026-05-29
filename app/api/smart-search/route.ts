import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  generateStudyMaterial,
  shouldGenerate,
  GenerationError,
  type MaterialType,
} from "@/lib/ai/generate-material";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface SearchBody {
  query?: string;
  course?: string | null;
  unit?: number | null;
  materialType?: MaterialType;
  autoGenerate?: boolean;
}

const ALLOWED_MATERIAL_TYPES: ReadonlyArray<MaterialType> = [
  "notes",
  "practice",
  "explanation",
  "summary",
];

// POST /api/smart-search
//   body: { query, course?, unit?, materialType, autoGenerate? }
//   - First runs match_resources_by_text against the live corpus
//   - Returns enriched matches + a flag asking the client to offer
//     AI generation if the surface is too thin
//   - If autoGenerate=true and we'd offer, generates immediately and
//     returns the new resource + auto-saves to the user's My Space
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as SearchBody;
  const query = body.query?.trim();
  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  const course =
    typeof body.course === "string" && body.course.length > 0 ? body.course : null;
  const unit =
    typeof body.unit === "number" && Number.isFinite(body.unit) ? body.unit : null;
  const materialType: MaterialType =
    body.materialType && ALLOWED_MATERIAL_TYPES.includes(body.materialType)
      ? body.materialType
      : "notes";

  const supabase = createAdminClient();

  // 1. Search existing corpus
  const courseFilter = course ? [course] : [];
  const { data: rawMatches, error: searchErr } = await supabase.rpc(
    "match_resources_by_text",
    {
      query_text: query,
      query_courses: courseFilter,
      exclude_ids: [],
      match_count: 10,
    }
  );
  if (searchErr) {
    console.error("[smart-search] rpc error:", searchErr);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
  const matches = (rawMatches ?? []) as Array<{ id: string; score: number }>;

  // 2. Enrich matches with the fields the UI needs to render a card
  let enrichedMatches: EnrichedMatch[] = [];
  if (matches.length > 0) {
    const ids = matches.map((m) => m.id);
    const { data: resources } = await supabase
      .from("lounge_resources")
      .select(
        "id, title, description, course_slug, unit_number, save_count, is_ai_generated, attachment_url, preview_page_1_url, ai_thumbs_up_count, ai_thumbs_down_count"
      )
      .in("id", ids);
    const byId = new Map(
      ((resources ?? []) as ResourceRow[]).map((r) => [r.id, r])
    );
    enrichedMatches = matches
      .map((m) => {
        const r = byId.get(m.id);
        if (!r) return null;
        return { ...r, score: m.score };
      })
      .filter((r): r is EnrichedMatch => r !== null);
  }

  // 3. Decide whether to suggest AI generation
  const shouldOfferAi = shouldGenerate(enrichedMatches);

  // 4. autoGenerate path — generate now, save, auto-bookmark
  if (body.autoGenerate && shouldOfferAi) {
    return await generateAndSave({
      userId: user.id,
      query,
      course,
      unit,
      materialType,
      matchedResourceId: enrichedMatches[0]?.id ?? null,
      supabase,
    });
  }

  // 5. Otherwise return matches + ai suggestion
  // Also log the request so analytics can see "found existing" outcomes,
  // even when we didn't generate.
  await supabase
    .from("ai_generation_requests")
    .insert({
      user_id: user.id,
      query_text: query,
      query_course: course,
      query_unit: unit,
      query_type: materialType,
      matched_resource_id: enrichedMatches[0]?.id ?? null,
      status: enrichedMatches.length > 0 ? "matched_existing" : "pending",
    });

  return NextResponse.json({
    matches: enrichedMatches,
    aiSuggestion: shouldOfferAi
      ? {
          available: true,
          message:
            enrichedMatches.length === 0
              ? "We don't have this yet — but we can create it for you in seconds ✨"
              : "Want a custom AI-generated study note tailored to your question?",
        }
      : null,
  });
}

// ────────────────────────────────────────────────────────────
// Generation path
// ────────────────────────────────────────────────────────────

interface GenerateArgs {
  userId: string;
  query: string;
  course: string | null;
  unit: number | null;
  materialType: MaterialType;
  matchedResourceId: string | null;
  supabase: ReturnType<typeof createAdminClient>;
}

async function generateAndSave(args: GenerateArgs): Promise<NextResponse> {
  const { userId, query, course, unit, materialType, supabase } = args;

  // 1. Log the request as generating
  const { data: reqRow, error: reqErr } = await supabase
    .from("ai_generation_requests")
    .insert({
      user_id: userId,
      query_text: query,
      query_course: course,
      query_unit: unit,
      query_type: materialType,
      matched_resource_id: args.matchedResourceId,
      status: "generating",
    })
    .select("id")
    .single();
  if (reqErr || !reqRow) {
    console.error("[smart-search] failed to log request:", reqErr);
    return NextResponse.json({ error: "Failed to start" }, { status: 500 });
  }
  const requestId = reqRow.id;

  // 2. Pick a lounge to file this resource under (lounge_id is NOT
  // NULL on lounge_resources). Prefer the course slug; fall back to
  // 'qna' (Q&A Lounge); last resort: any lounge so the insert can
  // never fail on the NOT NULL constraint.
  const loungeId = await resolveLoungeId(supabase, course);
  if (!loungeId) {
    await markFailed(supabase, requestId, "no lounge available");
    return NextResponse.json(
      { error: "No lounge to file this resource under" },
      { status: 500 }
    );
  }

  // 3. Call Claude
  try {
    const result = await generateStudyMaterial({
      query,
      course: course ?? undefined,
      unit: unit ?? undefined,
      materialType,
    });

    // 4. Insert as a resource. We use service-role client (admin)
    // so RLS doesn't fight us; the row is owned by `userId` via
    // author_id.
    const { data: newResource, error: insertErr } = await supabase
      .from("lounge_resources")
      .insert({
        lounge_id: loungeId,
        author_id: userId,
        folder_type: "notes",
        title: result.material.title,
        description: `AI-generated ${materialType} • ${result.material.estimatedReadTime} min read`,
        attachment_url: "", // synthetic resource — no file
        full_text: result.material.content,
        tags: result.material.topics,
        course_slug: course,
        unit_number: unit,
        is_ai_generated: true,
        ai_generation_prompt: query,
        ai_model: result.model,
        ai_generated_at: new Date().toISOString(),
      })
      .select(
        "id, title, description, course_slug, unit_number, full_text, is_ai_generated, ai_model, ai_generated_at, created_at, lounge_id"
      )
      .single();
    if (insertErr || !newResource) {
      console.error("[smart-search] insert resource failed:", insertErr);
      await markFailed(supabase, requestId, insertErr?.message ?? "insert failed");
      return NextResponse.json({ error: "Save failed" }, { status: 500 });
    }

    // 5. Auto-save to user's My Space (idempotent — UNIQUE
    // constraint on (user_id, resource_id))
    const { error: saveErr } = await supabase
      .from("user_saved_resources")
      .insert({ user_id: userId, resource_id: newResource.id });
    if (saveErr && !saveErr.message.includes("duplicate")) {
      console.warn("[smart-search] auto-save warn:", saveErr.message);
    }

    // 6. Mark request completed
    await supabase
      .from("ai_generation_requests")
      .update({
        status: "completed",
        generated_resource_id: newResource.id,
        cost_usd: result.cost,
        duration_ms: result.durationMs,
      })
      .eq("id", requestId);

    console.log(
      `[ai:generate] user=${userId} cost=$${result.cost.toFixed(4)} ` +
        `duration=${result.durationMs}ms tokens_in=${result.usage.input} ` +
        `tokens_out=${result.usage.output} type=${materialType}`
    );

    return NextResponse.json({
      generated: true,
      resource: newResource,
    });
  } catch (err) {
    if (err instanceof GenerationError) {
      await markFailed(supabase, requestId, err.message);
      const status =
        err.reason === "missing_api_key"
          ? 503
          : err.reason === "model_error"
            ? 502
            : 500;
      return NextResponse.json(
        { error: "Generation failed", reason: err.reason },
        { status }
      );
    }
    console.error("[smart-search] unexpected generation error:", err);
    await markFailed(
      supabase,
      requestId,
      err instanceof Error ? err.message : String(err)
    );
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

async function markFailed(
  supabase: ReturnType<typeof createAdminClient>,
  requestId: string,
  errorMessage: string
): Promise<void> {
  await supabase
    .from("ai_generation_requests")
    .update({ status: "failed", error_message: errorMessage })
    .eq("id", requestId);
}

async function resolveLoungeId(
  supabase: ReturnType<typeof createAdminClient>,
  course: string | null
): Promise<string | null> {
  if (course) {
    const { data } = await supabase
      .from("lounges")
      .select("id")
      .eq("slug", course)
      .maybeSingle();
    if (data) return (data as { id: string }).id;
  }

  // Fallback: Q&A lounge (most generic existing slug)
  const { data: fallback } = await supabase
    .from("lounges")
    .select("id")
    .eq("slug", "qna")
    .maybeSingle();
  if (fallback) return (fallback as { id: string }).id;

  // Last resort: any lounge at all
  const { data: any } = await supabase
    .from("lounges")
    .select("id")
    .limit(1)
    .maybeSingle();
  return any ? (any as { id: string }).id : null;
}

interface ResourceRow {
  id: string;
  title: string;
  description: string | null;
  course_slug: string | null;
  unit_number: number | null;
  save_count: number;
  is_ai_generated: boolean;
  attachment_url: string;
  preview_page_1_url: string | null;
  ai_thumbs_up_count: number;
  ai_thumbs_down_count: number;
}

interface EnrichedMatch extends ResourceRow {
  score: number;
}
