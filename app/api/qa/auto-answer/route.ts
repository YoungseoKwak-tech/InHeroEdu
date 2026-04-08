import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  const { questionId, title, content, subject } = await req.json();
  if (!questionId || !content) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Prevent duplicate AI answers
  const { data: existing } = await supabase
    .from("answers_qa")
    .select("id")
    .eq("question_id", questionId)
    .eq("is_ai", true)
    .maybeSingle();

  if (existing) return NextResponse.json({ answer: existing, skipped: true });

  const subjectLine = subject ? `Subject: ${subject}\n` : "";
  const prompt = `${subjectLine}Question: ${title}\n\n${content}`;

  try {
    const message = await anthropic.messages.create({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: `You are an expert tutor for AP/SAT/AMC subjects.
Answer this student question clearly and helpfully in Korean.
If it's a math/science question, show step-by-step solution.
Keep it concise but complete. Max 300 words.
Start directly with the answer — no greetings or introductions.`,
      messages: [{ role: "user", content: prompt }],
    });

    const aiContent = (message.content[0] as { type: string; text: string }).text;

    const { data, error } = await supabase
      .from("answers_qa")
      .insert({
        question_id: questionId,
        user_id:     "ai_tutor",
        nickname:    "AI 튜터",
        content:     aiContent,
        is_ai:       true,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AI error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
