import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAuthenticatedUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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

  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { data } = await supabase
    .from("user_points")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return NextResponse.json(data ?? { user_id: user.id, points: 0, streak_days: 0, total_earned: 0 });
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { nickname, action, points } = await req.json();
  if (!action || points === undefined) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("user_points")
    .select("points, total_earned")
    .eq("user_id", user.id)
    .single();

  const newPoints = Math.max(0, (existing?.points ?? 0) + points);
  const newTotal  = (existing?.total_earned ?? 0) + (points > 0 ? points : 0);

  await supabase
    .from("user_points")
    .upsert(
      { user_id: user.id, nickname: nickname || null, points: newPoints, total_earned: newTotal, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );

  await supabase.from("point_history").insert({ user_id: user.id, action, points });

  return NextResponse.json({ success: true, newPoints });
}
