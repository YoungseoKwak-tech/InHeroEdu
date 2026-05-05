import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getLivingPortrait, buildSystemPrompt } from "@/lib/memory";
import { getAuthenticatedUser } from "@/lib/auth";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { getAnthropicApiKey } from "@/lib/env";
import { parseJsonBlock } from "@/lib/ai-json";
import { AI_MODELS } from "@/lib/ai-models";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

const SYSTEM = `You are a bilingual learning analyst for Korean students studying AP subjects in English.

Analyze why the student got the question wrong. Classify into exactly one gap type:
- CONCEPT_GAP: doesn't understand the underlying concept
- APPLICATION_GAP: knows the concept but can't apply it to this problem context
- LANGUAGE_GAP: confused by English vocabulary/sentence structure, not the concept itself
- LOGIC_GAP: understood both concept and language, but reasoning chain broke

Return ONLY valid JSON, no markdown, no extra text:
{
  "gap_type": "CONCEPT_GAP|APPLICATION_GAP|LANGUAGE_GAP|LOGIC_GAP",
  "confidence": 0-100,
  "diagnosis_ko": "2-3 sentences in Korean explaining the root cause",
  "understood_correctly": "what they DID understand (Korean)",
  "broke_at": "precise point of failure (Korean)",
  "remedy_ko": "specific actionable fix (Korean)",
  "english_highlight": "LANGUAGE_GAP only: the exact English phrase that confused them (null otherwise)",
  "english_explanation_ko": "LANGUAGE_GAP only: explain that English structure in Korean (null otherwise)",
  "socratic_hint": "one guiding question to help them find the answer themselves (Korean)"
}`;

export type GapType = "CONCEPT_GAP" | "APPLICATION_GAP" | "LANGUAGE_GAP" | "LOGIC_GAP";

export interface GapResult {
  gap_type: GapType;
  confidence: number;
  diagnosis_ko: string;
  understood_correctly: string;
  broke_at: string;
  remedy_ko: string;
  english_highlight: string | null;
  english_explanation_ko: string | null;
  socratic_hint: string;
}

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("thinking-analyzer");
  if (guard) return Response.json(guard);

  const user = await getAuthenticatedUser(req);
  const userId = user?.id;
  const portrait = userId ? await getLivingPortrait(userId) : null;
  const portraitPrefix = portrait ? buildSystemPrompt(portrait) + "\n\n" : "";

  const { subject, question, studentAnswer, correctAnswer, reasoning = "" } = await req.json();

  const prompt = `Subject: ${subject}

Question (as given to student, in English):
${question}

Student's answer: ${studentAnswer}
Correct answer: ${correctAnswer}
Student's reasoning: ${reasoning || "(not provided)"}`;

  try {
    const response = await client.messages.create({
      model: AI_MODELS.thinkingAnalyzer,
      max_tokens: 700,
      system: portraitPrefix + SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
    const fallbackResult: GapResult = {
      gap_type: "LANGUAGE_GAP",
      confidence: 60,
      diagnosis_ko: "응답 형식을 정리하는 과정에서 분석 결과가 일부 손실되었습니다. 다시 시도하면 더 정확한 원인을 보여드릴 수 있습니다.",
      understood_correctly: "핵심 개념의 일부는 이해하고 있었습니다.",
      broke_at: "정확한 혼동 지점을 구조화하는 단계에서 응답 형식이 흔들렸습니다.",
      remedy_ko: "질문 문장과 선택지를 다시 읽고, 왜 그 선택지를 골랐는지 한 문장으로 적어보세요.",
      english_highlight: null,
      english_explanation_ko: null,
      socratic_hint: "이 문제에서 phenotype과 genotype의 차이를 한 문장으로 설명할 수 있나요?",
    };
    let result = parseJsonBlock<GapResult>(raw, fallbackResult);

    // If the model reasoning is good but the JSON shape is malformed, repair it with a cheap second pass.
    if (result === fallbackResult) {
      const repair = await client.messages.create({
        model: AI_MODELS.companionResponse,
        max_tokens: 500,
        system: `You repair malformed JSON outputs into valid JSON.
Return ONLY valid JSON matching this exact schema:
{
  "gap_type": "CONCEPT_GAP|APPLICATION_GAP|LANGUAGE_GAP|LOGIC_GAP",
  "confidence": 0-100,
  "diagnosis_ko": "string",
  "understood_correctly": "string",
  "broke_at": "string",
  "remedy_ko": "string",
  "english_highlight": "string|null",
  "english_explanation_ko": "string|null",
  "socratic_hint": "string"
}`,
        messages: [
          {
            role: "user",
            content: `Repair this malformed analyzer output into valid JSON:\n\n${raw}`,
          },
        ],
      });

      const repairedRaw = repair.content[0]?.type === "text" ? repair.content[0].text : "{}";
      result = parseJsonBlock<GapResult>(repairedRaw, fallbackResult);
    }

    return Response.json(result);
  } catch (e) {
    return Response.json(getAiFallback("thinking-analyzer", e));
  }
}
