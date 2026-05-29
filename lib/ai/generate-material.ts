import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey } from "@/lib/env";

const MODEL = "claude-sonnet-4-6";

export type MaterialType = "notes" | "practice" | "explanation" | "summary";
export type Difficulty = "basic" | "intermediate" | "advanced";

export interface GenerationContext {
  query: string;
  course?: string;
  unit?: number;
  materialType: MaterialType;
  difficulty?: Difficulty;
}

export interface GeneratedMaterial {
  title: string;
  content: string;
  topics: string[];
  difficulty: Difficulty;
  estimatedReadTime: number;
}

interface Template {
  structure: string;
  estimatedTokens: number;
}

const MATERIAL_TEMPLATES: Record<MaterialType, Template> = {
  notes: {
    structure: `1. Concept overview (3-5 sentences)
2. Key terms and definitions
3. Core formulas/principles (if applicable)
4. Worked example with step-by-step explanation
5. Common mistakes to avoid
6. Quick reference summary`,
    estimatedTokens: 2500,
  },
  practice: {
    structure: `1. Brief concept reminder (2-3 sentences)
2. 5 practice problems (varied difficulty)
3. Step-by-step solutions
4. Why each answer is correct
5. Tips for similar problems`,
    estimatedTokens: 3000,
  },
  explanation: {
    structure: `1. The simple version (ELI5 style)
2. The technical version (proper terminology)
3. Real-world analogy
4. Connection to broader topic
5. "But wait" — common misconceptions clarified`,
    estimatedTokens: 2200,
  },
  summary: {
    structure: `1. One-paragraph executive summary
2. 5 bullet points of must-know facts
3. How this connects to other units
4. Exam tip
5. Mnemonic device (if helpful)`,
    estimatedTokens: 1800,
  },
};

const SYSTEM_PROMPT = `You are InHero AI, a study material generator for AP/SAT/college prep students.
Your materials are clear, accurate, and exam-focused. You write like a top Ivy League tutor —
warm but precise. Never invent fake examples or hallucinate specific exam questions from
official test banks. Use widely-known concepts and standard educational examples.

When generating content:
- Use Markdown formatting
- Include emoji sparingly (one per section header max)
- Keep tone friendly but academic
- For AP courses, align with College Board CED
- For SAT, align with current SAT format
- Be concise — students have limited time`;

export class GenerationError extends Error {
  constructor(
    message: string,
    public readonly reason:
      | "missing_api_key"
      | "model_error"
      | "parse_error"
      | "shape_error"
  ) {
    super(message);
    this.name = "GenerationError";
  }
}

export interface GenerationResult {
  material: GeneratedMaterial;
  cost: number;
  durationMs: number;
  model: string;
  usage: { input: number; output: number };
}

/**
 * Generate a study material via Claude. Throws GenerationError on
 * missing key / API failure / unparseable output so callers can map
 * each to an appropriate HTTP status.
 */
export async function generateStudyMaterial(
  context: GenerationContext
): Promise<GenerationResult> {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new GenerationError("ANTHROPIC_API_KEY not set", "missing_api_key");
  }

  const startTime = Date.now();
  const template = MATERIAL_TEMPLATES[context.materialType];

  const userPrompt = [
    `Generate a study material for this student request:`,
    ``,
    `Topic: ${context.query}`,
    context.course ? `Course: ${context.course}` : undefined,
    context.unit !== undefined ? `Unit: ${context.unit}` : undefined,
    `Material type: ${context.materialType}`,
    context.difficulty ? `Difficulty: ${context.difficulty}` : undefined,
    ``,
    `Structure to follow:`,
    template.structure,
    ``,
    `Return ONLY valid JSON in this exact format (no preamble, no markdown fences):`,
    `{`,
    `  "title": "Clear, specific title (max 80 chars)",`,
    `  "content": "Full markdown content of the study material",`,
    `  "topics": ["topic1", "topic2", "topic3"],`,
    `  "difficulty": "basic" | "intermediate" | "advanced",`,
    `  "estimatedReadTime": 5`,
    `}`,
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");

  const client = new Anthropic({ apiKey });

  let resp;
  try {
    resp = await client.messages.create({
      model: MODEL,
      max_tokens: template.estimatedTokens,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });
  } catch (e) {
    throw new GenerationError(
      e instanceof Error ? e.message : String(e),
      "model_error"
    );
  }

  const text = resp.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  if (!text) {
    throw new GenerationError("model returned no text", "model_error");
  }

  const raw = extractJsonObject(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new GenerationError(
      `JSON.parse failed: ${e instanceof Error ? e.message : String(e)}`,
      "parse_error"
    );
  }

  const material = normalizeMaterial(parsed);
  const usage = {
    input: resp.usage?.input_tokens ?? 0,
    output: resp.usage?.output_tokens ?? 0,
  };
  // Sonnet 4.6: $3/MTok in, $15/MTok out
  const cost = (usage.input * 3 + usage.output * 15) / 1_000_000;

  return {
    material,
    cost,
    durationMs: Date.now() - startTime,
    model: MODEL,
    usage,
  };
}

/**
 * Decide whether to offer AI generation given the existing matches.
 * Returns true when the existing surface is too thin to satisfy the
 * student's intent.
 */
export function shouldGenerate(
  matches: ReadonlyArray<{ score: number }>,
  threshold = 0.2
): boolean {
  if (matches.length === 0) return true;
  if (matches.length < 3 && matches[0].score < threshold) return true;
  if (matches.every((m) => m.score < threshold)) return true;
  return false;
}

// ────────────────────────────────────────────────────────────
// JSON parsing helpers — Claude occasionally prepends a sentence
// or wraps the JSON in ```json``` despite the prompt asking not to.
// We snip to the first '{' and last '}' to survive both cases.
// ────────────────────────────────────────────────────────────

function extractJsonObject(text: string): string {
  const trimmed = text.trim();
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first === -1 || last === -1 || last < first) {
    throw new GenerationError("no JSON object found in response", "parse_error");
  }
  return trimmed.slice(first, last + 1);
}

function normalizeMaterial(raw: unknown): GeneratedMaterial {
  if (!raw || typeof raw !== "object") {
    throw new GenerationError("response was not an object", "shape_error");
  }
  const o = raw as Record<string, unknown>;

  const title = typeof o.title === "string" ? o.title.trim() : "";
  if (!title) throw new GenerationError("missing title", "shape_error");

  const content = typeof o.content === "string" ? o.content : "";
  if (!content.trim()) throw new GenerationError("missing content", "shape_error");

  const topics = Array.isArray(o.topics)
    ? o.topics.filter((t): t is string => typeof t === "string" && t.trim().length > 0)
    : [];

  const rawDifficulty = typeof o.difficulty === "string" ? o.difficulty : "intermediate";
  const difficulty: Difficulty =
    rawDifficulty === "basic" || rawDifficulty === "advanced"
      ? rawDifficulty
      : "intermediate";

  const estimatedReadTime =
    typeof o.estimatedReadTime === "number" && Number.isFinite(o.estimatedReadTime)
      ? Math.max(1, Math.round(o.estimatedReadTime))
      : 5;

  return {
    title: title.slice(0, 120),
    content,
    topics: topics.slice(0, 8),
    difficulty,
    estimatedReadTime,
  };
}
