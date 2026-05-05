import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAuthenticatedUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { searchParams } = new URL(req.url);
  const setId  = searchParams.get("setId")  ?? "";

  if (!setId) return NextResponse.json({ progress: [] });

  const supabase = createAdminClient();

  const { data: cards } = await supabase
    .from("flashcards")
    .select("id")
    .eq("set_id", setId);

  const cardIds = (cards ?? []).map((c) => c.id);
  if (cardIds.length === 0) return NextResponse.json({ progress: [] });

  const { data, error } = await supabase
    .from("flashcard_progress")
    .select("card_id, status")
    .eq("user_id", user.id)
    .in("card_id", cardIds);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ progress: data ?? [] });
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { cardId, status } = await req.json();
  if (!cardId || !status) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("flashcard_progress")
    .upsert(
      { user_id: user.id, card_id: cardId, status, updated_at: new Date().toISOString() },
      { onConflict: "user_id,card_id" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
