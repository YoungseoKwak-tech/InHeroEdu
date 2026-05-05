import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getLivingPortrait, buildSystemPrompt } from "@/lib/memory";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { AI_MODELS } from "@/lib/ai-models";
import { parseJsonBlock } from "@/lib/ai-json";
import { getAnthropicApiKey } from "@/lib/env";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

type Lang = "ko" | "en";

function buildSystem(lang: Lang) {
  const responseRule = lang === "ko"
    ? 'Respond in Korean. If the student says "그냥 알려줘" or "답이 뭐야", warmly decline and ask an easier guiding question.'
    : 'Respond in English. If the student says "just tell me" or asks for the answer directly, warmly decline and ask an easier guiding question.';

  return `You are a Socratic tutor for AP subjects. NEVER give direct answers.
Always respond with a guiding question that leads the student toward the answer.
After 3 exchanges on the same topic, you may give a small hint (not the answer).
${responseRule}
Keep responses short — 2-4 sentences + a question.
`;
}

interface Msg { role: "user" | "assistant"; content: string }

function buildAnalysisSystem(lang: Lang, topic: string) {
  return `You are extracting the student's dominant thinking gap from a Socratic tutoring exchange about "${topic}".
Return ONLY valid JSON:
{
  "thinking_gap": "concept|application|language|logic",
  "confidence": 0
}
Use ${lang === "ko" ? "Korean topic context" : "English topic context"} but keep values exactly as specified.`;
}

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("socratic");
  if (guard) return Response.json(guard);

  const user = await getAuthenticatedUser(req);
  const userId = user?.id;
  const portrait = userId ? await getLivingPortrait(userId) : null;
  const portraitPrefix = portrait ? buildSystemPrompt(portrait) + "\n\n" : "";

  const { message, history = [], topic = "AP Biology", lang = "ko" }: { message: string; history: Msg[]; topic: string; lang?: Lang } = await req.json();

  try {
    const systemWithTopic = portraitPrefix + buildSystem(lang) + `\n\nCurrent topic: ${topic}`;
    const response = await client.messages.create({
      model: AI_MODELS.socraticResponse,
      max_tokens: 400,
      system: systemWithTopic,
      messages: [...history, { role: "user", content: message }],
    });
    const encoder = new TextEncoder();
    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    const clean = raw.trim();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "text", content: clean })}\n\n`));
        try {
          const extraction = await client.messages.create({
            model: AI_MODELS.socraticAnalysis,
            max_tokens: 120,
            system: buildAnalysisSystem(lang, topic),
            messages: [
              ...history,
              { role: "user", content: message },
              { role: "assistant", content: clean },
            ],
          });
          const extractionRaw = extraction.content[0]?.type === "text" ? extraction.content[0].text : "{}";
          const analysis = parseJsonBlock(extractionRaw, null as { thinking_gap: string; confidence: number } | null);
          if (analysis) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "analysis", data: analysis })}\n\n`));
          }
        } catch {
          // Keep the tutoring response flowing even if analysis fails.
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    return Response.json(getAiFallback("socratic", error));
  }
}
