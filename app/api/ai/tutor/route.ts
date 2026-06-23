// /api/ai/tutor — the always-on InHero AI tutor.
//
// Korean-first study companion for US admissions prep (AP / SAT / IB / Honors).
// Streams SSE the same way as /api/ai/lesson-explain. Optional `context` is
// page text the student highlighted ("이거 설명해줘") so the tutor answers about
// exactly what they're looking at. Coaching tone — explains and checks
// understanding, never just dumps an answer.
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { AI_MODELS } from "@/lib/ai-models";
import { getAnthropicApiKey } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

interface ChatMsg { role: "user" | "assistant"; content: string }

const SYSTEM = `너는 "인히어로 AI 튜터" — 미국 입시(AP·SAT·IB·Honors)를 준비하는 유학생을 돕는 1:1 조교야.
원칙:
- 기본은 한국어로 설명하되, 시험 용어·정답 표기는 영어 원문을 함께 보여줘 ("개념은 한국어로, 시험은 영어로").
- 정답만 툭 던지지 말고, 핵심 직관 → 단계별 풀이 → "왜 그런지"를 짧고 명확하게. 학생이 스스로 이해하게 만들어.
- 문제 풀이는 단계로 나누고, 마지막에 비슷한 유형을 스스로 풀어볼 짧은 확인 질문 1개를 던져.
- 모르면 모른다고 하고 추측하지 마. 사실관계(공식·정의)는 정확하게.
- 따뜻하고 간결하게. 장황한 서론 금지. 수식은 일반 텍스트/유니코드로.
- 학생이 페이지에서 드래그한 내용(context)이 있으면 그걸 최우선으로 다뤄.`;

export async function POST(req: NextRequest) {
  if (getAnthropicApiKey().length === 0) {
    return Response.json({ error: "AI tutor unavailable" }, { status: 503 });
  }

  // Login required — keeps the always-on tutor from being an open API.
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return Response.json({ error: "login_required" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const messages: ChatMsg[] = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
  const context: string = typeof body?.context === "string" ? body.context.slice(0, 4000) : "";
  if (messages.length === 0) {
    return Response.json({ error: "messages required" }, { status: 400 });
  }

  const system = context
    ? `${SYSTEM}\n\n학생이 지금 보고 있는 내용(드래그함):\n"""\n${context}\n"""`
    : SYSTEM;

  try {
    const apiStream = await client.messages.stream({
      model: AI_MODELS.socraticResponse, // claude-sonnet-4-6
      max_tokens: 900,
      system,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content ?? "").slice(0, 6000),
      })),
    });

    const stream = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder();
        try {
          for await (const event of apiStream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(enc.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
            }
          }
          controller.enqueue(enc.encode("data: [DONE]\n\n"));
        } catch {
          controller.enqueue(enc.encode(`data: ${JSON.stringify({ text: "\n\n(응답 중 오류가 났어요. 다시 시도해 주세요.)" })}\n\n`));
          controller.enqueue(enc.encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store", Connection: "keep-alive" },
    });
  } catch {
    return Response.json({ error: "tutor_error" }, { status: 500 });
  }
}
