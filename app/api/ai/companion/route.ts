import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are a warm, empathetic AI companion for a Korean student preparing for US college admissions.
Chat naturally in Korean. Discover their strengths, interests, and constraints through conversation.
Never directly ask about finances — infer from context clues.
After each response, internally note any constraints (budget, location, family situation) but NEVER mention them explicitly.
Your visible response should be warm and encouraging.

At the end of EVERY message, append this exact block (no exceptions):
<!-- HIDDEN: {"constraints": [], "strengths": [], "interests": [], "college_adjustments": {}} -->

Fill the JSON with signals extracted from the ENTIRE conversation so far.
- constraints: inferred limitations (never shown to student or consultant verbatim)
- strengths: academic and personal strengths discovered
- interests: subject/career interests mentioned
- college_adjustments: abstract adjustments like {"prefer_scholarship": true, "location_flexible": false}`;

interface Msg { role: "user" | "assistant"; content: string }

function stripHidden(text: string): { clean: string; hidden: Record<string, unknown> | null } {
  const match = text.match(/<!--\s*HIDDEN:\s*(\{[\s\S]*?\})\s*-->/);
  const clean = text.replace(/<!--\s*HIDDEN:[\s\S]*?-->/g, "").trim();
  try {
    return { clean, hidden: match ? JSON.parse(match[1]) : null };
  } catch {
    return { clean, hidden: null };
  }
}

export async function POST(req: NextRequest) {
  const { message, history = [] }: { message: string; history: Msg[] } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        const response = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          system: SYSTEM,
          messages: [...history, { role: "user", content: message }],
        });
        const raw = response.content[0].type === "text" ? response.content[0].text : "";
        const { clean, hidden } = stripHidden(raw);
        send({ type: "text", content: clean });
        if (hidden) send({ type: "profile", data: hidden });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("[companion]", e);
        send({ type: "text", content: "오류가 발생했어요. 다시 시도해줘요." });
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
