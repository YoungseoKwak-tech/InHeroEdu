import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hasTextbookAccess } from "@/lib/textbookAccess";

export const runtime = "nodejs";

interface RouteParams {
  params: { subjectId: string };
}

interface LessonRow {
  id: string;
  course_id: string;
  unit_title: string | null;
  title: string;
  unit_number: number | null;
  lesson_number: number | null;
}

interface ScriptRow {
  lesson_id: string;
  chapter_json: Record<string, unknown> | null;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const subjectId = params.subjectId?.trim();
  if (!subjectId) {
    return NextResponse.json({ error: "subjectId required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // 1) Look up requesting user's email (server-side; never trust client).
  const { data: authUser } = await supabase.auth.admin.getUserById(user.id);
  const email = authUser?.user?.email ?? null;

  // 2) Gate: complimentary OR purchase row in textbook_purchases.
  const access = await hasTextbookAccess({ userId: user.id, email, subjectId });
  if (!access.allowed) {
    return NextResponse.json(
      { error: "no access for this textbook", subjectId },
      { status: 403 }
    );
  }

  // 3) Ordered lessons for this subject.
  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, course_id, unit_title, title, unit_number, lesson_number")
    .eq("course_id", subjectId)
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });

  if (lessonsError) {
    return NextResponse.json({ error: lessonsError.message }, { status: 500 });
  }

  const ordered = (lessons ?? []) as LessonRow[];
  if (ordered.length === 0) {
    return NextResponse.json({ error: "no lessons for this subject" }, { status: 404 });
  }

  // 4) Fetch cached chapter_json for each lesson.
  const { data: scripts, error: scriptsError } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, chapter_json")
    .in("lesson_id", ordered.map((l) => l.id));

  if (scriptsError) {
    return NextResponse.json({ error: scriptsError.message }, { status: 500 });
  }

  const scriptMap = new Map(
    ((scripts ?? []) as ScriptRow[]).map((row) => [row.lesson_id, row.chapter_json])
  );

  const chapters = ordered
    .filter((l) => scriptMap.get(l.id) != null)
    .map((l) => ({
      lessonId: l.id,
      unitNumber: l.unit_number ?? 0,
      lessonNumber: l.lesson_number ?? 0,
      unitTitle: l.unit_title ?? "",
      title: l.title,
      chapterJson: scriptMap.get(l.id) ?? null,
    }));

  return NextResponse.json({
    ok: true,
    subjectId,
    accessReason: access.reason,
    viewerEmail: email,
    chapters,
  });
}
