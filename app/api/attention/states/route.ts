import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { ATTENTION_MODEL_VERSION } from "@/lib/attentionStates";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session");
  const limitParam = Number(searchParams.get("limit") || "50");
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(Math.floor(limitParam), 1), 200)
    : 50;

  const supabase = createAdminClient();
  let query = supabase
    .from("attention_state_inferences")
    .select("*")
    .eq("user_id", user.id)
    .eq("model_version", ATTENTION_MODEL_VERSION)
    .order("inferred_at", { ascending: false })
    .limit(limit);

  if (sessionId) query = query.eq("session_id", sessionId);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ states: data ?? [] });
}
