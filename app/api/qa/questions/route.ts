import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { rolesByUserId } from "@/lib/qaRoles";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id      = searchParams.get("id");
  const subject = searchParams.get("subject") ?? "";
  const sort    = searchParams.get("sort") ?? "latest";

  const supabase = createAdminClient();

  // Single question
  if (id) {
    const { data, error } = await supabase
      .from("questions_qa")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (data) {
      await supabase
        .from("questions_qa")
        .update({ view_count: (data.view_count ?? 0) + 1 })
        .eq("id", id);
    }
    const roles = data ? await rolesByUserId(supabase, [data.user_id]) : {};
    return NextResponse.json({ question: data ? { ...data, role: roles[data.user_id] ?? null } : null });
  }

  // List
  let query = supabase
    .from("questions_qa")
    .select("*")
    .order(sort === "popular" ? "view_count" : "created_at", { ascending: false })
    .limit(30);

  if (subject) query = query.eq("subject", subject);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const roles = await rolesByUserId(supabase, (data ?? []).map((q) => q.user_id));
  const questions = (data ?? []).map((q) => ({ ...q, role: roles[q.user_id] ?? null }));
  return NextResponse.json({ questions });
}

export async function POST(req: NextRequest) {
  const { userId, nickname, subject, title, content } = await req.json();
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("questions_qa")
    .insert({
      user_id:  userId  || null,
      nickname: nickname || "익명",
      subject:  subject  || null,
      title:    title.trim(),
      content:  content.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ question: data });
}
