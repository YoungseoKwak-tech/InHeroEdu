import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const questionId = new URL(req.url).searchParams.get("questionId");
  if (!questionId) return NextResponse.json({ error: "questionId required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("answers_qa")
    .select("*")
    .eq("question_id", questionId)
    .order("is_ai",     { ascending: false })
    .order("is_expert", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ answers: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { questionId, userId, nickname, content, isExpert } = await req.json();
  if (!questionId || !content?.trim()) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("answers_qa")
    .insert({
      question_id: questionId,
      user_id:     userId   || null,
      nickname:    nickname || "익명",
      content:     content.trim(),
      is_expert:   isExpert ?? false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update answer count
  const { data: q } = await supabase
    .from("questions_qa")
    .select("answer_count")
    .eq("id", questionId)
    .single();
  await supabase
    .from("questions_qa")
    .update({ answer_count: (q?.answer_count ?? 0) + 1 })
    .eq("id", questionId);

  return NextResponse.json({ answer: data });
}

export async function PATCH(req: NextRequest) {
  const { answerId, action } = await req.json();
  if (!answerId || !action) return NextResponse.json({ error: "missing" }, { status: 400 });

  const supabase = createAdminClient();
  if (action === "like") {
    const { data } = await supabase.from("answers_qa").select("likes").eq("id", answerId).single();
    await supabase.from("answers_qa").update({ likes: (data?.likes ?? 0) + 1 }).eq("id", answerId);
  } else if (action === "accept") {
    await supabase.from("answers_qa").update({ is_accepted: true }).eq("id", answerId);
  }
  return NextResponse.json({ success: true });
}
