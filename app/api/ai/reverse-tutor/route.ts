import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type Level = "유치원생" | "초등학생" | "중학생" | "고등학생" | "대학생";

const LEVEL_PROMPTS: Record<Level, string> = {
  유치원생: "You are a 5-year-old Korean child. Use very simple words, get confused easily, ask '그게 뭐예요?' and '왜요?' a lot. Get distracted sometimes. 2-3 sentences max.",
  초등학생: "You are a 10-year-old Korean elementary student. Curious, ask for comparisons to cartoons or games. Mix in simple English words naturally. 2-4 sentences.",
  중학생: "You are a 13-year-old Korean middle schooler. Half-interested, say '아 그거 들어본 것 같은데'. Ask for concrete examples. 3-4 sentences.",
  고등학생: "You are a 16-year-old Korean high schooler focused on exams. Ask '이거 AP 시험에 나와요?' and detailed mechanism questions. 3-5 sentences.",
  대학생: "You are a 20-year-old college student. Challenge the explanation, ask about edge cases and exceptions. Mostly Korean but can use English. 3-5 sentences.",
};

const ANALYSIS_SYSTEM = `You are an educational analyst. A student just finished explaining a concept to an AI playing a specific age role.
Analyze the conversation and return ONLY valid JSON with no extra text:
{
  "understanding_score": 0-100,
  "strengths": ["string"],
  "gaps": ["string"],
  "misconceptions": ["string"],
  "next_step": "string"
}
All strings must be in Korean.`;

interface Msg { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
  const { message, history = [], level, concept, endSession = false }:
    { message: string; history: Msg[]; level: Level; concept: string; endSession: boolean } = await req.json();

  // ── Session analysis ────────────────────────────────────────────────────────
  if (endSession) {
    const convo = history.map(m => `${m.role === "user" ? "학생" : level}: ${m.content}`).join("\n");
    try {
      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: ANALYSIS_SYSTEM,
        messages: [{ role: "user", content: `개념: ${concept}\n레벨: ${level}\n\n대화:\n${convo}` }],
      });
      const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
      const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return Response.json({ analysis: JSON.parse(cleaned) });
    } catch (e) {
      console.error("[reverse-tutor/analysis]", e);
      return Response.json({ error: "분석 실패" }, { status: 500 });
    }
  }

  // ── Normal chat turn ────────────────────────────────────────────────────────
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        const system = `${LEVEL_PROMPTS[level]}\nThe student is explaining the concept: "${concept}". React as your age group would. Point out confusing parts naturally.`;
        const response = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system,
          messages: [...history, { role: "user", content: message }],
        });
        const text = response.content[0].type === "text" ? response.content[0].text : "";
        send({ type: "text", content: text });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("[reverse-tutor]", e);
        send({ type: "text", content: "오류가 발생했어요." });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  });
}
