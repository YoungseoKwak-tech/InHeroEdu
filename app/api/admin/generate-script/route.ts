import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdminUser } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { getScriptContext } from "@/lib/data/ap-topic-map";
import { getAnthropicApiKey } from "@/lib/env";

const anthropic = new Anthropic({ apiKey: getAnthropicApiKey() });

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

INPUT: You will receive raw study materials (notes, textbook pages, diagrams).
Extract the highest-yield concepts, identify the most common student traps,
and build a script that makes strong students even stronger.

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

const SCRIPT_SECTIONS = [
  "HOOK",
  "HERO EXPLAIN 1",
  "SPARK",
  "HERO EXPLAIN 2",
  "GAP CRUNCH",
  "TEACH BACK",
  "QUESTION SPRINT",
  "ANALYZER",
  "WRAP + TRAJECTORY CUE",
];

/**
 * POST /api/admin/generate-script
 * Body: { lessonId: string, section?: string }
 * Streams the Claude response as SSE text chunks.
 * If `section` is provided, regenerates only that section.
 */
export async function POST(req: NextRequest) {
  console.log("[generate-script] API route hit — API key exists:", !!process.env.ANTHROPIC_API_KEY);

  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) {
    console.warn("[generate-script] Auth rejected:", admin.status);
    return admin;
  }

  let body: { lessonId?: string; courseId?: string; section?: string; materialsText?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, courseId, section, materialsText: inlineMaterials } = body;
  console.log("[generate-script] lessonId:", lessonId, "courseId:", courseId, "section:", section ?? "(full)", "hasMaterials:", !!inlineMaterials);

  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  if (section && !SCRIPT_SECTIONS.includes(section)) {
    return NextResponse.json({ error: `Unknown section: ${section}` }, { status: 400 });
  }

  // Build curriculum context early — if found, DB read is only needed for section rewrites
  const topicContext = courseId ? getScriptContext(courseId, lessonId) : null;
  console.log("[generate-script] topicContext:", topicContext
    ? `${topicContext.courseName} / ${topicContext.unitName}`
    : "NOT FOUND (courseId=" + courseId + ", lessonId=" + lessonId + ")"
  );

  const supabase = createAdminClient();
  let materials = inlineMaterials?.slice(0, 8000) ?? "";
  let existingScript = "";

  // ── Fetch lesson metadata (topics + examTip) from lessons table ───────────
  let lessonTopics: string[] = [];
  let lessonExamTip = "";
  let lessonTitle = "";
  {
    const { data: lessonRow } = await supabase
      .from("lessons")
      .select("title, topics, exam_tip")
      .eq("id", lessonId)
      .maybeSingle();
    if (lessonRow) {
      lessonTitle = lessonRow.title ?? "";
      lessonTopics = Array.isArray(lessonRow.topics) ? lessonRow.topics : [];
      lessonExamTip = lessonRow.exam_tip ?? "";
      console.log("[generate-script] Found lesson metadata:", lessonTitle, "topics:", lessonTopics.length, "examTip:", !!lessonExamTip);
    }
  }

  // Only read DB when needed: no inline materials OR doing a section rewrite
  if (!materials || section) {
    const { data: scriptRow, error: dbErr } = await supabase
      .from("lesson_scripts")
      .select("materials_text, script")
      .eq("lesson_id", lessonId)
      .single();

    if (dbErr && dbErr.code !== "PGRST116") {
      // PGRST116 = row not found — fine for new lessons
      console.warn("[generate-script] DB read warn (non-fatal):", dbErr.code, dbErr.message);
    }

    if (!materials) {
      materials = (scriptRow?.materials_text ?? "").slice(0, 8000);
    }
    existingScript = scriptRow?.script ?? "";
  }

  // Build exam tip injection block (used in all prompt paths)
  const examTipBlock = lessonExamTip
    ? `\nEXAM TIP — the #1 trap on this lesson: ${lessonExamTip}\nMake sure your Gap Crunch and Question Sprint Q2 directly targets this exact trap.\n`
    : "";

  const topicsBlock = lessonTopics.length > 0
    ? `\nHIGHEST-YIELD TOPICS for this lesson:\n${lessonTopics.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n`
    : "";

  // Only block if BOTH topic context and materials are missing (and no lesson metadata)
  if (!materials && !topicContext && !lessonTitle) {
    console.error("[generate-script] No materials and no topic context — blocking");
    return NextResponse.json(
      { error: "No materials found and no topic map context available. Upload lesson materials first." },
      { status: 400 }
    );
  }

  console.log("[generate-script] Starting generation — materials:", materials.length, "chars, topicContext:", !!topicContext, "lessonMeta:", !!lessonTitle);

  let userMessage: string;
  if (section) {
    userMessage = `Rewrite ONLY the ## ${section} section of this script. Output ONLY that section (keep all formatting). Do not output any other sections.\n\nCurrent full script for context:\n${existingScript.slice(0, 6000)}\n\n---\nMaterials:\n${materials || "(none)"}${examTipBlock}`;
  } else if (lessonTitle && (topicContext || lessonTopics.length > 0)) {
    // New lesson-level generation: specific lesson with topics and examTip
    userMessage = [
      `Generate a complete InHero video script for this specific AP lesson:`,
      ``,
      `Lesson: ${lessonTitle}`,
      topicContext ? `Course: ${topicContext.courseName}` : `Course ID: ${courseId}`,
      topicContext ? `Unit: ${topicContext.unitName}` : "",
      topicContext ? `Exam weight: ${topicContext.examWeight} of AP exam` : "",
      topicsBlock,
      examTipBlock,
      `This script covers ONLY this single lesson — not the whole unit.`,
      `Focus the 8-minute script entirely on "${lessonTitle}".`,
      materials ? `\n---\nSupplementary materials:\n${materials}` : "",
    ].filter(Boolean).join("\n");
  } else if (topicContext) {
    // Legacy unit-level generation
    userMessage = [
      `Generate a complete InHero video script for this AP lesson:`,
      ``,
      `Course: ${topicContext.courseName}`,
      `Unit: ${topicContext.unitName}`,
      `Exam weight: ${topicContext.examWeight} of AP exam`,
      ``,
      `Lessons in this unit:`,
      topicContext.lessonList,
      ``,
      `The script should cover the ENTIRE unit — all lessons listed above.`,
      examTipBlock,
      materials ? `\n---\nSupplementary materials (use to enrich the script):\n${materials}` : "",
    ].filter(Boolean).join("\n");
  } else {
    // Fallback: no topic map match — use materials or lessonId as context
    userMessage = materials
      ? `Generate a complete InHero video script from these study materials:\n\n${materials}${examTipBlock}`
      : `Generate a complete InHero video script for lesson: ${lessonTitle || lessonId}. Use your knowledge of AP curriculum.${examTipBlock}`;
  }

  // ── Stream Claude response as SSE ─────────────────────────────────────────
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        console.log("[generate-script] Calling Anthropic API — model: claude-sonnet-4-6, prompt length:", userMessage.length);
        const stream = anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        let fullScript = "";
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullScript += event.delta.text;
            const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
            controller.enqueue(encoder.encode(chunk));
          }
        }

        console.log("[generate-script] Anthropic stream complete — script length:", fullScript.length);

        // Fire-and-forget: persist script + materials to DB for future section rewrites.
        // Failures here are silent — generation already succeeded.
        supabase
          .from("lesson_scripts")
          .upsert(
            {
              lesson_id: lessonId,
              script: fullScript,
              materials_text: inlineMaterials?.slice(0, 24_000) ?? undefined,
              script_generated_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "lesson_id" }
          )
          .then(({ error }) => {
            if (error) console.warn("[generate-script] DB save failed (non-fatal):", error.message);
          });

      } catch (e) {
        const errChunk = `data: ${JSON.stringify({ error: String(e) })}\n\n`;
        controller.enqueue(encoder.encode(errChunk));
      } finally {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
