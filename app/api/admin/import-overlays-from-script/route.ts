import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

interface RawOverlay {
  id?: string;
  type?: string;
  [key: string]: unknown;
}

const TYPE_TO_SECTION_REF: Record<string, string> = {
  SPARK: "SPARK",
  GAP_CRUNCH: "GAP CRUNCH",
  TEACH_BACK: "TEACH BACK",
  QUESTION_SPRINT: "QUESTION SPRINT",
  ANALYZER: "ANALYZER",
};

const TYPE_TO_DB: Record<string, string> = {
  SPARK: "spark",
  GAP_CRUNCH: "gap_crunch",
  TEACH_BACK: "teach_back",
  QUESTION_SPRINT: "question_sprint",
  ANALYZER: "analyzer",
  CONFIDENCE_CHECK: "confidence_check",
  NEXT_MOVE: "next_move",
};

function extractOverlaysJSON(script: string): RawOverlay[] | null {
  const marker = script.indexOf("## OVERLAYS JSON:");
  if (marker === -1) return null;

  const after = script.slice(marker);
  const fenceStart = after.indexOf("```");
  if (fenceStart === -1) return null;

  const afterFence = after.slice(fenceStart + 3);
  const langStripped = afterFence.replace(/^json\s*/i, "");
  const fenceEnd = langStripped.indexOf("```");
  if (fenceEnd === -1) return null;

  const jsonText = langStripped.slice(0, fenceEnd).trim();
  try {
    const parsed = JSON.parse(jsonText);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Group consecutive QUESTION_SPRINT items into one overlay so the player can
 * walk students through them as a multi-question sprint.
 */
function compactOverlays(raw: RawOverlay[]): Array<{ type: string; data: Record<string, unknown> }> {
  const result: Array<{ type: string; data: Record<string, unknown> }> = [];
  let questionBatch: RawOverlay[] = [];

  function flushQuestions() {
    if (questionBatch.length === 0) return;
    result.push({
      type: "QUESTION_SPRINT",
      data: {
        questions: questionBatch.map((q) => ({
          question: String(q.question ?? ""),
          options: Array.isArray(q.options) ? q.options : [],
          correct: typeof q.correct === "number" ? q.correct : 0,
          explanation: String(q.explanation ?? ""),
        })),
      },
    });
    questionBatch = [];
  }

  for (const item of raw) {
    const t = String(item.type ?? "").toUpperCase();
    if (!t) continue;

    if (t === "QUESTION_SPRINT") {
      // If this entry already bundles a `questions` array, pass through.
      if (Array.isArray(item.questions)) {
        flushQuestions();
        const { type: _t, id: _id, ...data } = item;
        void _t; void _id;
        result.push({ type: "QUESTION_SPRINT", data: data as Record<string, unknown> });
      } else {
        questionBatch.push(item);
      }
      continue;
    }

    flushQuestions();

    const { type: _t, id: _id, ...data } = item;
    void _t; void _id;
    result.push({ type: t, data: data as Record<string, unknown> });
  }
  flushQuestions();

  return result;
}

/** POST /api/admin/import-overlays-from-script
 *  Body: { lessonId, replace?: boolean }
 *  Reads `lesson_scripts.script`, parses the `## OVERLAYS JSON:` block,
 *  groups consecutive QUESTION_SPRINT entries, and bulk-inserts overlays.
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { lessonId?: string; replace?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, replace = true } = body;
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: scriptRow, error: scriptErr } = await supabase
    .from("lesson_scripts")
    .select("script")
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (scriptErr) {
    return NextResponse.json({ error: scriptErr.message }, { status: 500 });
  }
  if (!scriptRow?.script) {
    return NextResponse.json({ error: "No script found for this lesson" }, { status: 404 });
  }

  const raw = extractOverlaysJSON(scriptRow.script);
  if (!raw) {
    return NextResponse.json(
      { error: "Could not find a `## OVERLAYS JSON:` ```json``` block in the script" },
      { status: 400 }
    );
  }

  const compacted = compactOverlays(raw);
  if (compacted.length === 0) {
    return NextResponse.json({ error: "No overlays parsed from script" }, { status: 400 });
  }

  if (replace) {
    const { error: delErr } = await supabase
      .from("overlays")
      .delete()
      .eq("lesson_id", lessonId);
    if (delErr) {
      return NextResponse.json({ error: `Replace failed: ${delErr.message}` }, { status: 500 });
    }
  }

  const rowsToInsert = compacted.map((overlay, position) => ({
    lesson_id: lessonId,
    type: TYPE_TO_DB[overlay.type] ?? overlay.type.toLowerCase(),
    data: overlay.data,
    script_section_ref: TYPE_TO_SECTION_REF[overlay.type] ?? "",
    position,
  }));

  const { data: inserted, error: insErr } = await supabase
    .from("overlays")
    .insert(rowsToInsert)
    .select();

  if (insErr) {
    return NextResponse.json({ error: `Insert failed: ${insErr.message}` }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    data: inserted ?? [],
    count: inserted?.length ?? 0,
  });
}
