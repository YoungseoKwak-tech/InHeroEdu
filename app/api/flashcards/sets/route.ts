import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const subject = new URL(req.url).searchParams.get("subject") ?? "";
  const supabase = createAdminClient();

  let query = supabase
    .from("flashcard_sets")
    .select("*")
    .order("created_at", { ascending: true });

  if (subject) query = query.eq("subject", subject);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sets: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { subject, title } = await req.json();
  if (!subject?.trim() || !title?.trim()) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("flashcard_sets")
    .insert({ subject: subject.trim(), title: title.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ set: data });
}
