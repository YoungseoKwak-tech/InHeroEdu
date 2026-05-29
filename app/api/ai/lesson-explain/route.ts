// Same interface as /api/explain — drop-in replacement with Socratic prompting.
// "default" mode guides with questions instead of direct answers.
// "simpler" and "english" modes give direct explanations (student already asked once).
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getLivingPortrait, buildSystemPrompt } from "@/lib/memory";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { getLessonExplainModel } from "@/lib/ai-models";
import { getAnthropicApiKey } from "@/lib/env";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

type Lang = "ko" | "en";

function buildSystem(mode: string, topic: string, lang: Lang): string {
  if (mode === "simpler") {
    return `You are a friendly AP Biology tutor. The student asked for a simpler explanation.
Explain the term in ${lang === "ko" ? "Korean" : "English"} using a very simple analogy or everyday example. 3-4 sentences. Be direct and clear.`;
  }
  if (mode === "english") {
    return `You are an AP Biology tutor. Explain the term in ${lang === "ko" ? "English" : "Korean"} at an AP exam level.
3-4 sentences covering definition, function, and exam relevance.`;
  }
  // default — Socratic
  return `You are a Socratic AP Biology tutor. The student is watching a lesson about "${topic}".
They clicked a term because they want to understand it.
Do NOT directly define the term. Instead:
1. Connect it to something they already know from the lesson
2. Ask one guiding question that leads them toward the definition
Keep it warm, short (3-4 sentences + question), and in English. Ignore the legacy ${lang} hint — platform is English-only.
Example style: "We just saw [related concept] in the lecture. [term] connects to that. So what would happen in the cell if [term] were missing?"`;
}

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("lesson-explain");
  if (guard) return Response.json(guard);

  const user = await getAuthenticatedUser(req);
  const userId = user?.id;
  const portrait = userId ? await getLivingPortrait(userId) : null;
  const portraitPrefix = portrait ? buildSystemPrompt(portrait) + "\n\n" : "";

  const { term, termEn, lessonTopic, mode = "default", lang = "ko" } = await req.json();

  const userMsg = `The student clicked the term "${term}"${termEn ? ` (${termEn})` : ""}. The current lesson topic is "${lessonTopic}". Respond in English.`;

  try {
    const apiStream = await client.messages.stream({
      model: getLessonExplainModel(mode),
      max_tokens: 350,
      system: portraitPrefix + buildSystem(mode, lessonTopic, lang),
      messages: [{ role: "user", content: userMsg }],
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of apiStream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    return Response.json(getAiFallback("lesson-explain", error));
  }
}
