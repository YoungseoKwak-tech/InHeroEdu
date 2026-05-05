import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAnthropicApiKey } from "@/lib/env";
import { parseJsonBlock } from "@/lib/ai-json";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

const MODEL = "claude-sonnet-4-6";

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { type } = body;

  // ── GAP CRUNCH ──────────────────────────────────────────────────────────
  if (type === "gap_crunch") {
    const { fixPrompt, studentResponse, gapType } = body as {
      fixPrompt: string;
      studentResponse: string;
      gapType: string;
    };

    const prompt = `Gap type: ${gapType}.\nQuestion: "${fixPrompt}"\nStudent answer: "${studentResponse}"\n\nIn exactly 2 sentences: identify one thing they got right, and pinpoint the precise concept still missing. No intro, no praise, no hedging.`;

    try {
      const res = await client.messages.create({
        model: MODEL,
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      });
      const feedback = res.content[0]?.type === "text" ? res.content[0].text.trim() : "";
      return NextResponse.json({ ok: true, feedback });
    } catch (err) {
      console.error("[evaluate gap_crunch]", err);
      return NextResponse.json({
        ok: true,
        feedback: "Your answer shows some understanding. Focus on precisely distinguishing when each case applies.",
      });
    }
  }

  // ── TEACH BACK ──────────────────────────────────────────────────────────
  if (type === "teach_back") {
    const { aiEvalPrompt, studentResponse } = body as {
      aiEvalPrompt: string;
      studentResponse: string;
    };

    const systemPrompt = `${aiEvalPrompt}

Return ONLY valid JSON: { "score": <1-5 integer>, "feedback": "<2-3 sentence evaluation>" }
Do not include markdown, explanation, or any text outside the JSON object.`;

    try {
      const res = await client.messages.create({
        model: MODEL,
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: "user", content: studentResponse }],
      });
      const raw = res.content[0]?.type === "text" ? res.content[0].text : "{}";
      const result = parseJsonBlock<{ score: number; feedback: string }>(raw, {
        score: 3,
        feedback: "Your explanation covers the basics. Try to be more specific about the causal mechanism.",
      });
      return NextResponse.json({ ok: true, score: result.score, feedback: result.feedback });
    } catch (err) {
      console.error("[evaluate teach_back]", err);
      return NextResponse.json({
        ok: true,
        score: 3,
        feedback: "Your explanation covers the basics. Try to be more specific about the causal mechanism.",
      });
    }
  }

  return NextResponse.json({ error: `unsupported type: ${String(type)}` }, { status: 400 });
}
