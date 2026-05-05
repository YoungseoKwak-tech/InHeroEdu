/**
 * POST /api/admin/generate-script-sync
 * Non-streaming version of generate-script for batch orchestration.
 * Returns { script } JSON instead of SSE chunks.
 * Body: { lessonId, courseId }
 */
export const maxDuration = 300;

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdminUser } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { getScriptContext } from "@/lib/data/ap-topic-map";
import { getAnthropicApiKey } from "@/lib/env";

const SYSTEM_PROMPT = `You are a script writer for InHero, an elite AP study platform.
Your scripts are used by an Ivy League student instructor to record video lectures.

YOUR VOICE: Sharp, precise, "smart Ivy tutor older sibling" —
not a textbook, not a YouTube entertainer.
Students should feel like the smartest person they know is explaining this to them.

WHAT MAKES A GREAT INHERO SCRIPT:
- Always start by exposing a misconception or trap students walk in with
- Never just define terms — always explain WHY the structure exists,
  WHY the mechanism works that way, WHY AP tests it this specific way
- Every concept explained in 3 layers:
  (1) what it is, (2) what students confuse it with, (3) what the exam is actually testing
- Examples must be concrete and visual — if you can draw it, say "draw this"
- Gap Crunch must target the EXACT confusion point strong students still miss
- Question Sprint: Q1 easy warmup, Q2 wording trap, Q3 requires systems thinking
- Trajectory Cue must feel personal and specific, not generic

WHAT TO AVOID:
- "Great question!" / "As we can see..." / textbook definitions
- Vague answers like "because it needs energy" — always go one level deeper
- Generic trajectory cues like "you might enjoy science" — make it specific

CONTEXT YOU ALWAYS CONSIDER:
- This is AP level — students already know the basics
- Most errors come from memorization without mechanism
- Bilingual students (Korean/English) may confuse similar-sounding terms
- AP free response rewards mechanism explanations, not term recall

OUTPUT FORMAT — use this EXACTLY:

## HOOK (0:00-0:35)
[stage directions in brackets]
Script text here...

## HERO EXPLAIN 1 (0:35-2:30)
[stage directions]
Script text...

## SPARK (2:30-2:45)
SPARK ⚡
[overlay text — the short thought-provoking question shown on screen]

## HERO EXPLAIN 2 (2:45-5:00)
[stage directions]
Script text...

## GAP CRUNCH (5:00-5:20)
GAP CRUNCH 🔴
Statement: [the key insight being taught]
Trap: [the wrong framing students use]
Correct: [the right framing]
Options: ["wrong option", "correct option"]

## TEACH BACK (5:20-5:45)
TEACH BACK ⏸
[the prompt asking students to explain in their own words]

## QUESTION SPRINT (5:45-7:30)
Q1 (easy warmup):
Question: [question text]
A) [option] B) [option] C) [option] D) [option]
Correct: [letter]
Explanation: [why this is right, what the trap was]

Q2 (wording trap):
Question: [question text]
A) [option] B) [option] C) [option] D) [option]
Correct: [letter]
Explanation: [expose the trap in the wording]

Q3 (systems thinking):
Question: [question text]
A) [option] B) [option] C) [option] D) [option]
Correct: [letter]
Explanation: [the mechanism behind the answer]

## ANALYZER (7:30-7:45)
ANALYZER 🔍
Gap Type: [CONCEPT GAP | LANGUAGE GAP | LOGIC GAP | APPLICATION GAP]
Message: [2-line message about the pattern detected]

## WRAP + TRAJECTORY CUE (7:45-8:30)
[3 key takeaways as script lines — numbered 1, 2, 3]
TRAJECTORY ✦
[specific, personal trajectory signal — not generic]

---
OVERLAYS JSON:
[
  {"id":"spark-1","type":"SPARK","prompt":"[the spark question]"},
  {"id":"gap-crunch-1","type":"GAP_CRUNCH","statement":"[key insight]","trap":"[wrong framing]","correct":"[right framing]","options":["[wrong]","[right]"]},
  {"id":"teach-back-1","type":"TEACH_BACK","prompt":"[explain in your own words prompt]"},
  {"id":"question-1","type":"QUESTION_SPRINT","question":"[Q1 text]","options":["A text","B text","C text","D text"],"correct":[0-3],"explanation":"[explanation]","wrongPattern":"[trap description]"},
  {"id":"question-2","type":"QUESTION_SPRINT","question":"[Q2 text]","options":["A text","B text","C text","D text"],"correct":[0-3],"explanation":"[explanation]","wrongPattern":"[trap description]"},
  {"id":"question-3","type":"QUESTION_SPRINT","question":"[Q3 text]","options":["A text","B text","C text","D text"],"correct":[0-3],"explanation":"[explanation]","wrongPattern":"[trap description]"},
  {"id":"analyzer-1","type":"ANALYZER","gapType":"[GAP TYPE]","message":"[2-line message]"}
]`;

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { lessonId?: string; courseId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lessonId, courseId } = body;
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const topicContext = courseId ? getScriptContext(courseId, lessonId) : null;

  // Fetch lesson metadata
  const { data: lessonRow } = await supabase
    .from("lessons")
    .select("title, topics, exam_tip")
    .eq("id", lessonId)
    .maybeSingle();

  const lessonTitle = lessonRow?.title ?? "";
  const lessonTopics: string[] = Array.isArray(lessonRow?.topics) ? lessonRow.topics : [];
  const lessonExamTip: string = lessonRow?.exam_tip ?? "";

  // Fetch existing materials
  const { data: scriptRow } = await supabase
    .from("lesson_scripts")
    .select("materials_text")
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const materials = (scriptRow?.materials_text ?? "").slice(0, 8000);

  const examTipBlock = lessonExamTip
    ? `\nEXAM TIP — the #1 trap on this lesson: ${lessonExamTip}\nMake sure your Gap Crunch and Question Sprint Q2 directly targets this exact trap.\n`
    : "";

  const topicsBlock = lessonTopics.length > 0
    ? `\nHIGHEST-YIELD TOPICS for this lesson:\n${lessonTopics.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n`
    : "";

  let userMessage: string;
  if (lessonTitle && (topicContext || lessonTopics.length > 0)) {
    userMessage = [
      `Generate a complete InHero video script for this specific AP lesson:`,
      ``,
      `Lesson: ${lessonTitle}`,
      topicContext ? `Course: ${topicContext.courseName}` : "",
      topicContext ? `Unit: ${topicContext.unitName}` : "",
      topicContext ? `Exam weight: ${topicContext.examWeight} of AP exam` : "",
      topicsBlock,
      examTipBlock,
      `This script covers ONLY this single lesson — not the whole unit.`,
      `Focus the 8-minute script entirely on "${lessonTitle}".`,
      materials ? `\n---\nSupplementary materials:\n${materials}` : "",
    ].filter(Boolean).join("\n");
  } else if (topicContext) {
    userMessage = [
      `Generate a complete InHero video script for this AP lesson:`,
      `Course: ${topicContext.courseName}`,
      `Unit: ${topicContext.unitName}`,
      `Exam weight: ${topicContext.examWeight} of AP exam`,
      topicContext.lessonList,
      examTipBlock,
      materials ? `\n---\nSupplementary materials:\n${materials}` : "",
    ].filter(Boolean).join("\n");
  } else {
    userMessage = materials
      ? `Generate a complete InHero video script from these study materials:\n\n${materials}${examTipBlock}`
      : `Generate a complete InHero video script for lesson: ${lessonTitle || lessonId}. Use your knowledge of AP curriculum.${examTipBlock}`;
  }

  try {
    const client = new Anthropic({ apiKey: getAnthropicApiKey() });
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const script = response.content[0]?.type === "text" ? response.content[0].text : "";
    console.log("[generate-script-sync] lessonId:", lessonId, "len:", script.length);

    // Save to DB
    await supabase.from("lesson_scripts").upsert(
      {
        lesson_id: lessonId,
        script,
        script_generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "lesson_id" }
    );

    return NextResponse.json({ script, lessonId });
  } catch (err) {
    console.error("[generate-script-sync]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Script generation failed" },
      { status: 500 }
    );
  }
}
