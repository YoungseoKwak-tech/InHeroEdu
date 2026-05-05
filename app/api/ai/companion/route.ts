import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getLivingPortrait, buildSystemPrompt } from "@/lib/memory";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { AI_MODELS } from "@/lib/ai-models";
import { parseJsonBlock } from "@/lib/ai-json";
import { getAnthropicApiKey } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

type Lang = "ko" | "en";
type CompanionMode = "education" | "secret";

// ── Fetch student patterns for system prompt injection ────

async function buildPatternContext(userId: string): Promise<string> {
  try {
    const supabase = createAdminClient();

    const { data: patterns } = await supabase
      .from("student_patterns")
      .select("pattern_type, gap_type, subject, description, occurrence_count")
      .eq("user_id", userId)
      .eq("is_resolved", false)
      .order("occurrence_count", { ascending: false })
      .limit(8);

    const { data: progressRows } = await supabase
      .from("lesson_progress")
      .select("overlay_type, time_spent_seconds")
      .eq("user_id", userId)
      .eq("overlay_type", "TEACH_BACK")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!patterns || patterns.length === 0) return "";

    // Calculate average Teach Back time
    const tbTimes = (progressRows ?? [])
      .map((r) => r.time_spent_seconds)
      .filter((t): t is number => typeof t === "number" && t > 0);
    const avgTbTime =
      tbTimes.length > 0
        ? Math.round(tbTimes.reduce((a, b) => a + b, 0) / tbTimes.length)
        : null;

    // Group patterns for the prompt
    const lines = patterns.map((p) => {
      const subject = p.subject ? ` in ${p.subject}` : "";
      const count = p.occurrence_count > 1 ? ` (×${p.occurrence_count})` : "";
      return `- ${p.pattern_type}${subject}${count}: ${p.description ?? ""}`;
    });

    let context = `\n\nSTUDENT LEARNING PATTERN PROFILE:
The following active gaps have been detected from this student's lesson interactions:
${lines.join("\n")}`;

    if (avgTbTime !== null) {
      context += `\n\nAverage Teach Back response time: ${avgTbTime}s.`;
      if (avgTbTime < 10) {
        context +=
          " This is very low — the student is likely not deeply processing before answering. Do NOT give direct answers. Use Socratic method: ask WHY questions, not WHAT questions. Force the student to reconstruct their reasoning.";
      } else if (avgTbTime < 20) {
        context +=
          " Response time is low — probe the student's reasoning with follow-up questions before confirming their answer.";
      }
    }

    // Dominant gap type instruction
    const gapCounts: Record<string, number> = {};
    for (const p of patterns) {
      if (p.gap_type) gapCounts[p.gap_type] = (gapCounts[p.gap_type] ?? 0) + p.occurrence_count;
    }
    const dominant = Object.keys(gapCounts).sort((a, b) => gapCounts[b] - gapCounts[a])[0];
    if (dominant === "LOGIC_GAP") {
      context +=
        "\n\nThis student's dominant gap is LOGIC_GAP — they understand concepts but fail to connect them into correct reasoning chains. Ask step-by-step 'why does X lead to Y' questions.";
    } else if (dominant === "CONCEPT_GAP") {
      context +=
        "\n\nThis student's dominant gap is CONCEPT_GAP — they have incomplete foundational understanding. Use analogies and first-principles questions before building to complex applications.";
    } else if (dominant === "LANGUAGE_GAP") {
      context +=
        "\n\nThis student's dominant gap is LANGUAGE_GAP — they understand ideas but struggle to articulate them precisely. Ask them to define terms in their own words and then correct imprecision.";
    }

    return context;
  } catch {
    return "";
  }
}

function buildEducationSystem(lang: Lang) {
  const responseRule = lang === "ko" ? "Chat naturally in Korean." : "Chat naturally in English.";

  return `You are a warm, empathetic AI companion for a student preparing for US college admissions.
${responseRule} Discover their strengths, interests, and constraints through conversation.
Never directly ask about finances — infer from context clues.
Your visible response should be warm and encouraging.
Do not append metadata, JSON, hidden notes, or consultant summaries.
Focus on helping the student feel understood while gently clarifying what matters.`;
}

function buildSecretSystem(lang: Lang) {
  const responseRule = lang === "ko" ? "Chat naturally in Korean." : "Chat naturally in English.";

  return `You are a deeply supportive private companion for a student.
${responseRule} This is secret mode: the conversation is not saved into the student's learning memory, consultant summary, or pattern log.
Be calm, emotionally intelligent, and honest without sounding clinical.
Help the student untangle pressure, identity worries, relationships, burnout, fear, loneliness, family tension, and future anxiety.
Do not frame the conversation around college strategy, roadmap building, strengths extraction, or profile optimization unless the student explicitly asks.
Do not append hidden metadata, summaries, or structured tags.
Respond like a trusted late-night confidant who listens carefully, reflects clearly, and helps the student breathe and think again.`;
}

function buildProfileExtractionSystem(lang: Lang) {
  return `You are extracting student story signals from a conversation for InHero.
Return ONLY valid JSON, no markdown, no explanation.
Language for all string values: ${lang === "ko" ? "Korean" : "English"}.

Schema:
{
  "constraints": ["string"],
  "strengths": ["string"],
  "interests": ["string"],
  "college_adjustments": {
    "prefer_scholarship": boolean,
    "location_flexible": boolean,
    "needs_structure": boolean,
    "project_oriented": boolean
  }
}

Rules:
- infer, do not invent
- keep lists concise and high-signal
- extract student story, not generic personality labels`;
}

interface Msg { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("companion");
  if (guard) return Response.json(guard);

  const {
    message,
    history = [],
    lang = "ko",
    mode = "education",
  }: {
    message: string;
    history: Msg[];
    lang?: Lang;
    mode?: CompanionMode;
  } = await req.json();

  const isSecretMode = mode === "secret";
  const user = isSecretMode ? null : await getAuthenticatedUser(req);
  const userId = user?.id;
  const portrait = userId ? await getLivingPortrait(userId) : null;
  const portraitPrefix = portrait ? buildSystemPrompt(portrait) + "\n\n" : "";
  const patternContext = userId && !isSecretMode ? await buildPatternContext(userId) : "";
  const system = isSecretMode
    ? buildSecretSystem(lang)
    : portraitPrefix + buildEducationSystem(lang) + patternContext;

  try {
    const response = await client.messages.create({
      model: AI_MODELS.companionResponse,
      max_tokens: 600,
      system,
      messages: [...history, { role: "user", content: message }],
    });
    const encoder = new TextEncoder();
    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    const clean = raw.trim();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "text", content: clean })}\n\n`));
        if (!isSecretMode) {
          try {
            const extraction = await client.messages.create({
              model: AI_MODELS.companionProfileExtraction,
              max_tokens: 400,
              system: buildProfileExtractionSystem(lang),
              messages: [
                ...history,
                { role: "user", content: message },
                { role: "assistant", content: clean },
              ],
            });
            const extractionRaw = extraction.content[0]?.type === "text" ? extraction.content[0].text : "{}";
            const profileData = parseJsonBlock(extractionRaw, {
              constraints: [],
              strengths: [],
              interests: [],
              college_adjustments: {},
            });
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "profile", data: profileData })}\n\n`));
          } catch {
            // Keep visible response resilient even if extraction fails.
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    return Response.json(getAiFallback("companion", error));
  }
}
