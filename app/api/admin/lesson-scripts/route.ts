import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdminUser } from "@/lib/auth";

/** GET /api/admin/lesson-scripts?lessonId=<id> */
export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const lessonId = new URL(req.url).searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, script, overlays, materials_url, script_generated_at, updated_at")
    .eq("lesson_id", lessonId)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? null });
}

/**
 * POST /api/admin/lesson-scripts
 * Body: { lessonId, script?, overlays?, materialsUrl? }
 * Upserts the record — send only the fields you want to update.
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: {
    lessonId?: string;
    script?: string;
    overlays?: unknown[];
    materialsUrl?: string;
    markGenerated?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, script, overlays, materialsUrl, markGenerated } = body;
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const payload: Record<string, unknown> = {
    lesson_id: lessonId,
    updated_at: new Date().toISOString(),
  };
  if (script !== undefined) payload.script = script;
  if (overlays !== undefined) payload.overlays = overlays;
  if (materialsUrl !== undefined) payload.materials_url = materialsUrl;
  if (markGenerated) payload.script_generated_at = new Date().toISOString();

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_scripts")
    .upsert(payload, { onConflict: "lesson_id" });

  if (error) {
    console.error("[lesson-scripts] upsert failed", { lessonId, error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: refreshed, error: refreshError } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, script, overlays, materials_url, script_generated_at, updated_at")
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (refreshError) {
    console.warn("[lesson-scripts] post-upsert refresh failed", { lessonId, refreshError });
  }

  return NextResponse.json({
    data:
      refreshed ?? {
        lesson_id: lessonId,
        script: script ?? null,
        overlays: overlays ?? [],
        materials_url: materialsUrl ?? null,
        script_generated_at: markGenerated ? new Date().toISOString() : null,
        updated_at: payload.updated_at,
      },
  });
}
