/**
 * POST /api/toefl/score-speaking
 * AI scores a TOEFL Speaking response (transcript) against the official 0–4
 * rubric and returns a 0–30 scaled estimate + Korean feedback. Auth is
 * required because this route spends paid AI capacity on demand.
 *
 * Body: { taskType: "independent"|"integrated", prompt, readingText?, transcript }
 */
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey } from "@/lib/env";
import { getAiRouteGuard, getAiFallback } from "@/lib/ai-access";
import { requireAuthenticatedUser } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: getAnthropicApiKey() });
const MAX_BODY_BYTES = 32_000;
const MAX_PROMPT_CHARS = 1_000;
const MAX_SOURCE_CHARS = 2_000;
const MAX_TRANSCRIPT_CHARS = 4_000;

const SYSTEM = `You are an experienced TOEFL iBT Speaking rater.
Score one spoken response (given as a speech-to-text transcript) on the official 0–4 TOEFL Speaking rubric.
Judge three dimensions: Delivery (fluency, clarity), Language Use (grammar, vocabulary range), and Topic Development (relevance, completeness, coherence).
The input is a transcript, so ignore pronunciation/accent and minor transcription noise; focus on content, organization, grammar, and development.
Be fair but rigorous, like the real exam.

Return ONLY raw JSON (start with { end with }):
{
  "overall": <integer 0-4>,
  "delivery": <integer 0-4>,
  "language": <integer 0-4>,
  "topic": <integer 0-4>,
  "feedback_ko": "<2-3 sentence overall assessment in Korean>",
  "tips_ko": ["<short Korean improvement tip>", "<another>"]
}`;

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const guard = getAiRouteGuard("toefl-speaking-score");
  if (guard) return NextResponse.json(guard);

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "request too large" }, { status: 413 });
  }

  const { taskType, prompt, readingText, transcript } = await req.json().catch(() => ({}));
  const normalizedTaskType = taskType === "integrated" ? "integrated" : "independent";
  const safePrompt = typeof prompt === "string" ? prompt.slice(0, MAX_PROMPT_CHARS) : "";
  const safeReadingText = typeof readingText === "string" ? readingText.slice(0, MAX_SOURCE_CHARS) : "";
  const safeTranscript = typeof transcript === "string" ? transcript.slice(0, MAX_TRANSCRIPT_CHARS) : "";

  if (safeTranscript.trim().split(/\s+/).length < 5) {
    return NextResponse.json({ error: "답변이 너무 짧아 채점할 수 없어요. 더 길게 말한 뒤 다시 시도해 주세요." }, { status: 400 });
  }

  const userMsg = [
    `Task type: ${normalizedTaskType === "integrated" ? "Integrated" : "Independent"}`,
    safeReadingText ? `Reading/Listening source the student should use:\n${safeReadingText}` : "",
    `Prompt: ${safePrompt}`,
    `\nStudent response (speech-to-text transcript):\n${safeTranscript}`,
  ].filter(Boolean).join("\n");

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 700,
      system: SYSTEM,
      messages: [{ role: "user", content: userMsg }],
    });
    const raw = message.content[0]?.type === "text" ? message.content[0].text : "";
    const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    const cleaned = (fence ? fence[1] : raw).trim();
    const parsed = JSON.parse(cleaned) as {
      overall?: number; delivery?: number; language?: number; topic?: number;
      feedback_ko?: string; tips_ko?: string[];
    };

    const overall = clamp04(parsed.overall);
    const scaled = Math.round((overall / 4) * 30);
    return NextResponse.json({
      ok: true,
      overall,
      scaled,
      delivery: clamp04(parsed.delivery),
      language: clamp04(parsed.language),
      topic: clamp04(parsed.topic),
      feedback: typeof parsed.feedback_ko === "string" ? parsed.feedback_ko : "",
      tips: Array.isArray(parsed.tips_ko) ? parsed.tips_ko.filter((t) => typeof t === "string").slice(0, 4) : [],
    });
  } catch (err) {
    return NextResponse.json(getAiFallback("toefl-speaking-score", err));
  }
}

function clamp04(n: unknown): number {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(4, v));
}
