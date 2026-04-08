import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type ExplainMode = "default" | "simpler" | "english";

function buildPrompt(
  term: string,
  termEn: string | null,
  lessonTopic: string,
  mode: ExplainMode
): string {
  const termDisplay = termEn ? `"${term}" (${termEn})` : `"${term}"`;

  if (mode === "simpler") {
    return `학생이 ${termDisplay}에 대한 설명을 더 쉽게 이해하고 싶어합니다. 아주 쉬운 비유나 일상생활의 예시를 사용해서, 중학생도 이해할 수 있을 정도로 간단하게 한국어로 2-3문장으로 다시 설명해주세요.`;
  }

  if (mode === "english") {
    return `Please explain the term ${termDisplay} in English. The student is studying AP ${lessonTopic}. Give a clear, concise explanation in 3-4 sentences that covers the definition and its importance in this topic. Use academic vocabulary appropriate for AP level.`;
  }

  return `학생이 AP Biology 강의에서 "${lessonTopic}"를 배우던 중 ${termDisplay}이라는 용어를 클릭했습니다. 이 용어를 한국어로 쉽고 명확하게 3-4문장으로 설명해주세요. 방금 강의에서 배운 맥락과 연결지어 설명하고, AP Biology 시험에서 중요한 포인트가 있다면 간략히 언급해주세요.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { term, termEn, lessonTopic, mode = "default" } = body as {
      term: string;
      termEn?: string;
      lessonTopic: string;
      mode?: ExplainMode;
    };

    if (!term || !lessonTopic) {
      return new Response(JSON.stringify({ error: "term and lessonTopic are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt =
      "You are a InHero tutor — a helpful, friendly, and knowledgeable AP Biology tutor who specializes in helping Korean students excel in their AP exams and get into Ivy League universities. You explain concepts clearly and concisely, always connecting new terms to the broader context of what the student is learning.";

    const userPrompt = buildPrompt(term, termEn ?? null, lessonTopic, mode as ExplainMode);

    const stream = await client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    // Return SSE stream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI explain error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate explanation" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
