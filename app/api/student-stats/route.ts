/**
 * GET /api/student-stats
 * Returns the authenticated student's stats row from student_stats.
 * If no row exists yet, returns zeroed defaults.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAuthenticatedUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("student_stats")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const defaults = {
    user_id: user.id,
    lessons_completed: 0,
    current_streak: 0,
    longest_streak: 0,
    total_questions_answered: 0,
    total_correct: 0,
    concept_gaps_detected: 0,
    concept_gaps_resolved: 0,
    last_active: null,
  };

  return NextResponse.json({ stats: data ?? defaults });
}
