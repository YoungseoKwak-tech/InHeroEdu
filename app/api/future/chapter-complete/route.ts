// POST /api/future/chapter-complete
//
// Server-side trigger for the chapter completion ritual. Body:
//   { chapter_id, subject_slug }
// Effect:
//   1. Mark student_chapter_progress as completed
//   2. Compute resonance deltas from the subject's path biases
//   3. Upsert future_self_paths with new resonance values
//   4. Insert a recent_event ('chapter_complete') for /future
//   5. Return the deltas + a chosen lo-fi phrase so the client
//      modal can render "researcher future is clarifying"

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { deltasForSubject, PATH_BY_SLUG } from "@/lib/future-self/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  chapter_id?: string;
  subject_slug?: string;
  textbook_id?: string | null;
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => null)) as Body | null;
  const chapterId = typeof body?.chapter_id === "string" ? body.chapter_id : "";
  const subjectSlug = typeof body?.subject_slug === "string" ? body.subject_slug : "";
  if (!chapterId) return NextResponse.json({ error: "chapter_id required" }, { status: 400 });

  const sb = createAdminClient();

  // 1. Mark chapter completed. We need textbook_id from the
  //    chapter row to satisfy the progress table's FK.
  const { data: chapter } = await sb
    .from("textbook_chapters")
    .select("id, textbook_id, title, chapter_number")
    .eq("id", chapterId)
    .maybeSingle();
  if (!chapter) return NextResponse.json({ error: "chapter not found" }, { status: 404 });

  const nowIso = new Date().toISOString();
  await sb.from("student_chapter_progress").upsert({
    user_id: user.id,
    chapter_id: chapter.id,
    textbook_id: chapter.textbook_id,
    status: "completed",
    completed_at: nowIso,
    last_opened_at: nowIso,
  });

  // 2. Resonance deltas.
  const deltas = deltasForSubject(subjectSlug);
  const updates: { slug: string; new_resonance: number; delta: number; phrase: string; name: string; accent: string }[] = [];

  for (const [slug, delta] of Array.from(deltas.entries())) {
    // Read current.
    const { data: existing } = await sb
      .from("future_self_paths")
      .select("resonance")
      .eq("user_id", user.id)
      .eq("path_slug", slug)
      .maybeSingle();
    const prev = (existing?.resonance as number | undefined) ?? 0;
    const next = Math.min(1, prev + delta);

    await sb.from("future_self_paths").upsert(
      { user_id: user.id, path_slug: slug, resonance: next, updated_at: nowIso },
      { onConflict: "user_id,path_slug" },
    );

    const catalog = PATH_BY_SLUG.get(slug);
    if (!catalog) continue;
    const phrase = catalog.resonance_phrases[Math.floor(Math.random() * catalog.resonance_phrases.length)];
    updates.push({
      slug,
      new_resonance: next,
      delta: next - prev,
      phrase,
      name: catalog.name,
      accent: catalog.accent,
    });
  }

  // 3. Append a narrative event.
  await sb.from("recent_events").insert({
    user_id: user.id,
    event_type: "chapter_complete",
    payload: {
      chapter_id: chapter.id,
      chapter_number: chapter.chapter_number,
      title: chapter.title,
      subject_slug: subjectSlug,
      resonance_deltas: updates.map((u) => ({ slug: u.slug, delta: u.delta })),
    },
  });

  // 4. Pick the most-resonating path for the modal headline.
  const dominant = [...updates].sort((a, b) => b.delta - a.delta)[0] ?? null;

  return NextResponse.json({
    ok: true,
    deltas: updates,
    dominant,
  });
}
