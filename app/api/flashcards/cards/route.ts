import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const setId = new URL(req.url).searchParams.get("setId");
  if (!setId) return NextResponse.json({ error: "setId required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("set_id", setId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cards: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { setId, frontText, backTextKorean, backTextEnglish, example } = await req.json();
  if (!setId || !frontText?.trim() || !backTextKorean?.trim()) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("flashcards")
    .insert({
      set_id:            setId,
      front_text:        frontText.trim(),
      back_text_korean:  backTextKorean.trim(),
      back_text_english: backTextEnglish?.trim() || null,
      example:           example?.trim() || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update card count on the set
  const { data: set } = await supabase
    .from("flashcard_sets")
    .select("card_count")
    .eq("id", setId)
    .single();
  await supabase
    .from("flashcard_sets")
    .update({ card_count: (set?.card_count ?? 0) + 1 })
    .eq("id", setId);

  return NextResponse.json({ card: data });
}
