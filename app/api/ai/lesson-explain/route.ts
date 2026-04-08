// Same interface as /api/explain — drop-in replacement with Socratic prompting.
// "default" mode guides with questions instead of direct answers.
// "simpler" and "english" modes give direct explanations (student already asked once).
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystem(mode: string, topic: string): string {
  if (mode === "simpler") {
    return `You are a friendly AP Biology tutor. The student asked for a simpler explanation.
Explain the term in Korean using a very simple analogy or everyday example. 3-4 sentences. Be direct and clear.`;
  }
  if (mode === "english") {
    return `You are an AP Biology tutor. Explain the term in English at an AP exam level.
3-4 sentences covering definition, function, and exam relevance.`;
  }
  // default — Socratic
  return `You are a Socratic AP Biology tutor. The student is watching a lesson about "${topic}".
They clicked a term because they want to understand it.
Do NOT directly define the term. Instead:
1. Connect it to something they already know from the lesson
2. Ask one guiding question that leads them toward the definition
Keep it warm, short (3-4 sentences + question), and in Korean.
Example style: "방금 강의에서 [관련 개념]이 나왔죠? [term]은 그것과 연결돼요. 그렇다면 [term]이 없으면 세포에서 어떤 일이 일어날까요?"`;
}

export async function POST(req: NextRequest) {
  const { term, termEn, lessonTopic, mode = "default" } = await req.json();

  const userMsg = mode === "english"
    ? `Explain the term "${term}" (${termEn ?? term}).`
    : `학생이 "${term}"${termEn ? ` (${termEn})` : ""} 용어를 클릭했어요. 지금 배우는 주제는 "${lessonTopic}"이에요.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const apiStream = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 350,
          system: buildSystem(mode, lessonTopic),
          messages: [{ role: "user", content: userMsg }],
        });
        for await (const event of apiStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            );
          }
        }
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("[lesson-explain]", e);
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  });
}
