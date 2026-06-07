/**
 * POST /api/question-bank/translate
 *   { text: string }  →  { korean: string }
 *
 * Translates ONLY a question's explanation/solution ("풀이") into Korean —
 * never the question prompt or answer options. Powers the per-card
 * "풀이 한국어로 보기" button on the question bank, so a Korean student can
 * read the reasoning in their first language without leaking the question
 * itself out of English.
 */
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { getAnthropicApiKey } from "@/lib/env";

const client = new Anthropic({
  apiKey: getAnthropicApiKey(),
});

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("question-bank-translate");
  if (guard) return Response.json(guard);

  try {
    const body = await req.json();
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!text) {
      return Response.json({ error: "text is required" }, { status: 400 });
    }

    const systemPrompt =
      "You are a translator for InHero, helping Korean AP students. You translate an English AP answer explanation (풀이) into natural, clear Korean. Keep technical terms accurate — leave subject-specific English terms in parentheses after the Korean when it helps a student map to the exam (e.g. \"수분 퍼텐셜(water potential)\"). Preserve numbers, units, and symbols exactly. Output ONLY the Korean translation — no preamble, no quotes, no extra commentary.";

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: systemPrompt,
      messages: [{ role: "user", content: text }],
    });

    const korean = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return Response.json({ korean });
  } catch (error) {
    return Response.json(getAiFallback("question-bank-translate", error));
  }
}
