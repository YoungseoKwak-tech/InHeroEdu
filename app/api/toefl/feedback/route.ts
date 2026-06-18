import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { getAnthropicApiKey } from "@/lib/env";

/**
 * POST /api/toefl/feedback
 * Body: { kind: "speaking" | "writing", taskType, taskPrompt, response }
 * Returns TOEFL-rater feedback: { band (0–5), scaled (0–30), summary,
 * strengths[], improvements[] } with Korean explanations.
 */

export const runtime = "nodejs";

interface Body {
  kind?: "speaking" | "writing";
  taskType?: string;
  taskPrompt?: string;
  response?: string;
}

function clampNum(v: unknown, lo: number, hi: number, fallback: number): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(lo, Math.min(hi, n));
}

export async function POST(req: Request) {
  const guard = getAiRouteGuard("toefl-feedback");
  if (guard) return Response.json(guard);

  const { kind, taskType, taskPrompt, response }: Body = await req.json().catch(() => ({}));
  if (!kind || !response || response.trim().length < 5) {
    return Response.json({ error: "kind and a non-empty response are required" }, { status: 400 });
  }

  const isSpeaking = kind === "speaking";
  const rubric = isSpeaking
    ? "Score on the official TOEFL Speaking rubric (0–4 holistic): Delivery (clarity, pace), Language Use (grammar, vocabulary range), and Topic Development (completeness, coherence, use of the source where integrated). The response is an automatic transcript of spoken English, so ignore punctuation/spelling and judge content and language."
    : "Score on the official TOEFL Writing rubric (0–5 holistic): Development, Organization, and Language Use. For Integrated tasks, reward accurate selection of the lecture's points and how they relate to the reading; do not reward the writer's personal opinion. For Academic Discussion, reward a clear, well-supported contribution that engages the discussion.";

  const system =
    `You are an experienced TOEFL iBT rater. ${rubric}\n` +
    `Return ONLY valid minified JSON with this exact shape:\n` +
    `{"band": <number>, "scaled": <integer 0-30>, "summary": "<one Korean sentence>", "strengths": ["<Korean>", "<Korean>"], "improvements": ["<Korean>", "<Korean>", "<Korean>"]}\n` +
    `"band" is the holistic rubric score (${isSpeaking ? "0–4" : "0–5"}). "scaled" is your estimate of the corresponding 0–30 section score. ` +
    `Write summary/strengths/improvements in Korean, concrete and actionable. Be encouraging but honest. No markdown, no extra text.`;

  const user =
    `[Task type] ${taskType ?? kind}\n` +
    `[Prompt]\n${(taskPrompt ?? "").slice(0, 2000)}\n\n` +
    `[Test-taker's ${isSpeaking ? "spoken-transcript" : "written"} response]\n${response.slice(0, 4000)}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": getAnthropicApiKey(),
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 700,
        system,
        messages: [{ role: "user", content: user }],
      }),
    });
    const data = await r.json();
    const text: string = data?.content?.[0]?.text ?? "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

    const bandMax = isSpeaking ? 4 : 5;
    return Response.json({
      band: clampNum(parsed.band, 0, bandMax, 0),
      bandMax,
      scaled: Math.round(clampNum(parsed.scaled, 0, 30, 0)),
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3).map(String) : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 4).map(String) : [],
    });
  } catch (error) {
    return Response.json(getAiFallback("toefl-feedback", error));
  }
}
