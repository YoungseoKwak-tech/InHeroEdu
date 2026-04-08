import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// POST /api/question-bank/attempt
export async function POST(req: NextRequest) {
  try {
    const { questionId, selectedAnswer, isCorrect, timeSpent, userId } =
      await req.json();

    if (!questionId) {
      return NextResponse.json({ error: "questionId required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("question_attempts").insert({
      question_id: questionId,
      selected_answer: selectedAnswer ?? null,
      is_correct: isCorrect ?? null,
      time_spent: timeSpent ?? null,
      user_id: userId ?? null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
