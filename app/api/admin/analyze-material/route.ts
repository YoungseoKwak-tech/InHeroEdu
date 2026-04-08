import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  try {
    const { materialId, subject, count = 10, rawTextOverride } = await req.json();

    const supabase = createAdminClient();

    let rawText: string | null = rawTextOverride ?? null;

    if (!rawText && materialId) {
      const { data: material, error } = await supabase
        .from("source_materials")
        .select("*")
        .eq("id", materialId)
        .single();

      if (error || !material) {
        return NextResponse.json({ error: "material not found" }, { status: 404 });
      }
      rawText = material.raw_text;

      if (!rawText) {
        return NextResponse.json(
          { error: "no text content — please paste text directly or upload a TXT/image file" },
          { status: 400 }
        );
      }

      await supabase.from("source_materials").update({ status: "processing" }).eq("id", materialId);
    }

    const claude = new Anthropic();

    const message = await claude.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 8192,
      messages: [
        {
          role: "user",
          content: `You are an expert ${subject} exam question creator. Analyze this study material and create ${count} high-quality exam questions.

STUDY MATERIAL:
${(rawText ?? "").slice(0, 8000)}

Create ${count} questions. For each question return a JSON object with:
- topic: specific topic within the subject (string)
- difficulty: "easy", "medium", or "hard"
- type: "multiple_choice" or "free_response"
- question_text: the question in English
- option_a, option_b, option_c, option_d: answer choices (multiple_choice only, leave "" for free_response)
- option_e: 5th option if needed, otherwise ""
- correct_answer: "A"/"B"/"C"/"D"/"E" for multiple choice; full answer text for free_response
- explanation: detailed 3-4 sentence explanation in English
- explanation_korean: same explanation in Korean
- tags: array of 2-4 key concept strings

Rules:
1. Match real AP/SAT/AMC exam style and difficulty distribution (40% easy, 40% medium, 20% hard)
2. Test deep understanding — not pure memorization
3. Include plausible trap answers for multiple choice
4. Cover different cognitive levels: recall, application, analysis

Return ONLY a valid JSON array. No markdown, no explanation, just the array.`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "[]";

    let questions: Record<string, unknown>[];
    try {
      const match = responseText.match(/\[[\s\S]*\]/);
      questions = JSON.parse(match ? match[0] : responseText);
    } catch {
      return NextResponse.json({ error: "Claude returned invalid JSON" }, { status: 500 });
    }

    // Normalize and insert
    const rows = questions.map((q) => ({
      subject,
      topic: q.topic ?? "General",
      difficulty: q.difficulty ?? "medium",
      type: q.type ?? "multiple_choice",
      question_text: q.question_text ?? "",
      option_a: q.option_a ?? null,
      option_b: q.option_b ?? null,
      option_c: q.option_c ?? null,
      option_d: q.option_d ?? null,
      option_e: q.option_e || null,
      correct_answer: q.correct_answer ?? "",
      explanation: q.explanation ?? "",
      explanation_korean: q.explanation_korean ?? null,
      tags: Array.isArray(q.tags) ? q.tags : [],
    }));

    const { data: inserted, error: insertError } = await supabase
      .from("questions")
      .insert(rows)
      .select();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    if (materialId) {
      await supabase
        .from("source_materials")
        .update({ status: "done" })
        .eq("id", materialId);
    }

    return NextResponse.json({ count: inserted?.length ?? 0, questions: inserted });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
