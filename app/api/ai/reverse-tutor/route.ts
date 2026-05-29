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
  유치원생: "You are a 5-year-old child. Use very simple words, get confused easily, ask 'what's that?' and 'why?' a lot. Get distracted sometimes. 2-3 sentences max. Respond in English only.",
  초등학생: "You are a 10-year-old elementary student. Curious, ask for comparisons to cartoons or games. 2-4 sentences. Respond in English only.",
  중학생: "You are a 13-year-old middle schooler. Half-interested, say things like 'oh I think I've heard of that'. Ask for concrete examples. 3-4 sentences. Respond in English only.",
  고등학생: "You are a 16-year-old high schooler focused on exams. Ask 'is this on the AP exam?' and detailed mechanism questions. 3-5 sentences. Respond in English only.",
  대학생: "You are a 20-year-old college student. Challenge the explanation, ask about edge cases and exceptions. 3-5 sentences. Respond in English only.",
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
All strings must be in English. (Legacy lang=${lang} hint is ignored — platform is English-only.)`;
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
    const convo = history.map(m => `${m.role === "user" ? "student" : level}: ${m.content}`).join("\n");
    try {
      const response = await client.messages.create({
        model: AI_MODELS.reverseTutorAnalysis,
        max_tokens: 600,
        system: buildAnalysisSystem(lang),
        messages: [{ role: "user", content: `Concept: ${concept}\nLevel: ${level}\n\nConversation:\n${convo}` }],
      });
      const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
      return Response.json({ analysis: parseJsonBlock(raw, {}) });
    } catch (e) {
      return Response.json(getAiFallback("reverse-tutor-analysis", e));
    }
  }

  // ── Normal chat turn ────────────────────────────────────────────────────────
  try {
    void lang; // platform is English-only — ignore legacy hint
    const langRule = "Respond in English.";
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
