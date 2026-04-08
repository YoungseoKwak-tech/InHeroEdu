import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
  const { subject, question, studentAnswer, correctAnswer, reasoning = "" } = await req.json();

  const prompt = `Subject: ${subject}

Question (as given to student, in English):
${question}

Student's answer: ${studentAnswer}
Correct answer: ${correctAnswer}
Student's reasoning: ${reasoning || "(not provided)"}`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 700,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result: GapResult = JSON.parse(cleaned);
    return Response.json(result);
  } catch (e) {
    console.error("[thinking-analyzer]", e);
    return Response.json({ error: "분석 실패" }, { status: 500 });
  }
}
