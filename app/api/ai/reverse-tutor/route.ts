import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getLivingPortrait, buildSystemPrompt } from "@/lib/memory";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { AI_MODELS } from "@/lib/ai-models";
import { parseJsonBlock } from "@/lib/ai-json";
import { getAnthropicApiKey } from "@/lib/env";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

type Level = "유치원생" | "초등학생" | "중학생" | "고등학생" | "대학생";
type Lang = "ko" | "en";

const LEVEL_PROMPTS: Record<Level, string> = {
  유치원생: "You are a 5-year-old Korean child. Use very simple words, get confused easily, ask '그게 뭐예요?' and '왜요?' a lot. Get distracted sometimes. 2-3 sentences max.",
  초등학생: "You are a 10-year-old Korean elementary student. Curious, ask for comparisons to cartoons or games. Mix in simple English words naturally. 2-4 sentences.",
  중학생: "You are a 13-year-old Korean middle schooler. Half-interested, say '아 그거 들어본 것 같은데'. Ask for concrete examples. 3-4 sentences.",
  고등학생: "You are a 16-year-old Korean high schooler focused on exams. Ask '이거 AP 시험에 나와요?' and detailed mechanism questions. 3-5 sentences.",
  대학생: "You are a 20-year-old college student. Challenge the explanation, ask about edge cases and exceptions. Mostly Korean but can use English. 3-5 sentences.",
};

function buildAnalysisSystem(lang: Lang) {
  return `You are an educational analyst. A student just finished explaining a concept to an AI playing a specific age role.
Analyze the conversation and return ONLY valid JSON with no extra text:
{
  "understanding_score": 0-100,
  "strengths": ["string"],
  "gaps": ["string"],
  "misconceptions": ["string"],
  "next_step": "string"
}
All strings must be in ${lang === "ko" ? "Korean" : "English"}.`;
}

interface Msg { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("reverse-tutor");
  if (guard) return Response.json(guard);

  const user = await getAuthenticatedUser(req);
  const userId = user?.id;
  const portrait = userId ? await getLivingPortrait(userId) : null;
  const portraitPrefix = portrait ? buildSystemPrompt(portrait) + "\n\n" : "";

  const { message, history = [], level, concept, endSession = false, lang = "ko" }:
    { message: string; history: Msg[]; level: Level; concept: string; endSession: boolean; lang?: Lang } = await req.json();

  // ── Session analysis ────────────────────────────────────────────────────────
  if (endSession) {
    const convo = history.map(m => `${m.role === "user" ? "학생" : level}: ${m.content}`).join("\n");
    try {
      const response = await client.messages.create({
        model: AI_MODELS.reverseTutorAnalysis,
        max_tokens: 600,
        system: buildAnalysisSystem(lang),
        messages: [{ role: "user", content: `개념: ${concept}\n레벨: ${level}\n\n대화:\n${convo}` }],
      });
      const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
      return Response.json({ analysis: parseJsonBlock(raw, {}) });
    } catch (e) {
      return Response.json(getAiFallback("reverse-tutor-analysis", e));
    }
  }

  // ── Normal chat turn ────────────────────────────────────────────────────────
  try {
    const langRule = lang === "ko" ? "Respond in Korean." : "Respond in English.";
    const system = portraitPrefix + `${LEVEL_PROMPTS[level]}\nThe student is explaining the concept: "${concept}". React as your age group would. Point out confusing parts naturally. ${langRule}`;
    const response = await client.messages.create({
      model: AI_MODELS.reverseTutorLive,
      max_tokens: 300,
      system,
      messages: [...history, { role: "user", content: message }],
    });
    const encoder = new TextEncoder();
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "text", content: text })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    return Response.json(getAiFallback("reverse-tutor", error));
  }
}
