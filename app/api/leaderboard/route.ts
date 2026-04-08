import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

function calcStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const unique = Array.from(new Set(dates)).sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  const cur = new Date(today);
  for (const d of unique) {
    if (d === cur.toISOString().slice(0, 10)) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else break;
  }
  return streak;
}

export async function GET(req: NextRequest) {
  const period = new URL(req.url).searchParams.get("period") ?? "weekly";
  const supabase = createAdminClient();

  const now = new Date();
  let since: string;
  if (period === "weekly") {
    const d = new Date(now); d.setDate(d.getDate() - 7);
    since = d.toISOString();
  } else if (period === "monthly") {
    const d = new Date(now); d.setMonth(d.getMonth() - 1);
    since = d.toISOString();
  } else {
    since = "2000-01-01T00:00:00Z";
  }

  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("user_id, is_correct, created_at")
    .not("user_id", "is", null)
    .gte("created_at", since);

  // Get all-time dates for streak
  const { data: allAttempts } = await supabase
    .from("question_attempts")
    .select("user_id, created_at")
    .not("user_id", "is", null);

  const userDates: Record<string, string[]> = {};
  (allAttempts ?? []).forEach((a: { user_id: string; created_at: string }) => {
    if (!userDates[a.user_id]) userDates[a.user_id] = [];
    userDates[a.user_id].push(a.created_at.slice(0, 10));
  });

  const stats: Record<string, { userId: string; correct: number; total: number }> = {};
  (attempts ?? []).forEach((a: { user_id: string; is_correct: boolean }) => {
    if (!stats[a.user_id]) stats[a.user_id] = { userId: a.user_id, correct: 0, total: 0 };
    stats[a.user_id].total++;
    if (a.is_correct) stats[a.user_id].correct++;
  });

  const rows = Object.values(stats)
    .map((s) => ({
      userId: s.userId,
      correct: s.correct,
      total: s.total,
      accuracy: s.total ? Math.round((s.correct / s.total) * 100) : 0,
      streak: calcStreak(userDates[s.userId] ?? []),
    }))
    .sort((a, b) => b.correct - a.correct)
    .slice(0, 50);

  return NextResponse.json({ rows, period });
}
