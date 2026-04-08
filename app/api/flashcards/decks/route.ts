import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? "";

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("flashcard_decks")
    .select("*")
    .or(userId ? `user_id.eq.${userId},is_public.eq.true` : "is_public.eq.true")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ decks: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { userId, title, subject, isPublic } = await req.json();
  if (!userId || !title?.trim()) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("flashcard_decks")
    .insert({ user_id: userId, title: title.trim(), subject: subject || null, is_public: isPublic ?? false })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deck: data });
}

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("flashcard_decks").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
