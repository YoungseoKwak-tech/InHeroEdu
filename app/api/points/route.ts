import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? "";
  const type   = searchParams.get("type") ?? "user";

  const supabase = createAdminClient();

  if (type === "leaderboard") {
    const { data, error } = await supabase
      .from("user_points")
      .select("user_id, nickname, points, total_earned, streak_days")
      .order("points", { ascending: false })
      .limit(10);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ rows: data ?? [] });
  }

  if (!userId) return NextResponse.json({ user_id: "", points: 0, streak_days: 0, total_earned: 0 });

  const { data } = await supabase
    .from("user_points")
    .select("*")
    .eq("user_id", userId)
    .single();

  return NextResponse.json(data ?? { user_id: userId, points: 0, streak_days: 0, total_earned: 0 });
}

export async function POST(req: NextRequest) {
  const { userId, nickname, action, points } = await req.json();
  if (!userId || !action || points === undefined) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("user_points")
    .select("points, total_earned")
    .eq("user_id", userId)
    .single();

  const newPoints = Math.max(0, (existing?.points ?? 0) + points);
  const newTotal  = (existing?.total_earned ?? 0) + (points > 0 ? points : 0);

  await supabase
    .from("user_points")
    .upsert(
      { user_id: userId, nickname: nickname || null, points: newPoints, total_earned: newTotal, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );

  await supabase.from("point_history").insert({ user_id: userId, action, points });

  return NextResponse.json({ success: true, newPoints });
}
