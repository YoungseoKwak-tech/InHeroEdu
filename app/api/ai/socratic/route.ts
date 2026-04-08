import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are a Socratic tutor for AP subjects. NEVER give direct answers.
Always respond with a guiding question that leads the student toward the answer.
After 3 exchanges on the same topic, you may give a small hint (not the answer).
Respond in Korean. Keep responses short — 2-4 sentences + a question.
If the student says "그냥 알려줘" or "답이 뭐야", warmly decline and ask an easier guiding question.

At the end of EVERY response, append this exact block:
<!-- ANALYSIS: {"thinking_gap": "concept|application|language|logic", "confidence": 0} -->

Fill thinking_gap with the most likely gap type based on the student's response.
Fill confidence (0-100) for how strong that gap assessment is.`;

interface Msg { role: "user" | "assistant"; content: string }

function stripAnalysis(text: string): { clean: string; analysis: { thinking_gap: string; confidence: number } | null } {
  const match = text.match(/<!--\s*ANALYSIS:\s*(\{[\s\S]*?\})\s*-->/);
  const clean = text.replace(/<!--\s*ANALYSIS:[\s\S]*?-->/g, "").trim();
  try {
    return { clean, analysis: match ? JSON.parse(match[1]) : null };
  } catch {
    return { clean, analysis: null };
  }
}

export async function POST(req: NextRequest) {
  const { message, history = [], topic = "AP Biology" }: { message: string; history: Msg[]; topic: string } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        const systemWithTopic = SYSTEM + `\n\nCurrent topic: ${topic}`;
        const response = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 400,
          system: systemWithTopic,
          messages: [...history, { role: "user", content: message }],
        });
        const raw = response.content[0].type === "text" ? response.content[0].text : "";
        const { clean, analysis } = stripAnalysis(raw);
        send({ type: "text", content: clean });
        if (analysis) send({ type: "analysis", data: analysis });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("[socratic]", e);
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
