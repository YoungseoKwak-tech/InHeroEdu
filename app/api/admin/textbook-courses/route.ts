import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { getTextbookCourseLabel } from "@/lib/textbookCourseCatalog";

export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("course_id")
    .order("course_id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.course_id, (counts.get(row.course_id) ?? 0) + 1);
  }

  const courses = Array.from(counts.entries())
    .map(([id, chapters]) => ({
      id,
      label: getTextbookCourseLabel(id),
      chapters,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "en"));

  return NextResponse.json({ courses });
}
