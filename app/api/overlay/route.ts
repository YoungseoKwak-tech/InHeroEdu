import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAnthropicApiKey } from "@/lib/env";
import { parseJsonBlock } from "@/lib/ai-json";
import { getStudentPattern, buildPatternContext } from "@/lib/studentPattern";

const client = new Anthropic({ apiKey: getAnthropicApiKey() });

const MODEL = "claude-opus-4-6";
const MAX_TOKENS = 1400;

type OverlayType =
  | "spark"
  | "gap_crunch"
  | "teach_back"
  | "question_sprint"
  | "analyzer"
  | "confidence_check"
  | "next_move";

interface OverlayContext {
  lessonTitle: string;
  subject: string;
  unit: string;
  scriptSection: string;
  fullScript: string;
}

function buildPrompt(type: OverlayType, ctx: OverlayContext, patternContext: string): string {
  const { lessonTitle, subject, scriptSection, fullScript } = ctx;

  switch (type) {
    case "spark":
      return `You are InHero's Spark Engine. Read this AP lesson script section and generate a SPARK overlay — the moment a key concept clicks.
LESSON: ${lessonTitle} | SUBJECT: ${subject}
SCRIPT SECTION: ${scriptSection}${patternContext}
Return JSON only: { "conceptUnlocked": string (4-6 words), "whyItMatters": string (1 sentence), "examConnection": string (1 sentence), "connectedConcepts": string[] (3-4 items), "memoryAnchor": string (1 vivid sentence) }`;

    case "gap_crunch":
      return `You are InHero's Gap Analyzer. Read this script section and generate a GAP CRUNCH overlay.
LESSON: ${lessonTitle} | SUBJECT: ${subject}
SCRIPT SECTION: ${scriptSection}${patternContext}
Return JSON only: { "gapType": "CONCEPT_GAP"|"APPLICATION_GAP"|"LANGUAGE_GAP"|"LOGIC_GAP", "headline": string (punchy, 8-10 words), "whatStudentsThink": string (1 sentence), "whatIsActuallyTrue": string (1 sentence), "examTrap": string (1 sentence), "fixPrompt": string (1 direct question) }`;

    case "teach_back":
      return `You are InHero's Reverse Tutor Engine. Generate a TEACH BACK overlay from this script section.
LESSON: ${lessonTitle} | SUBJECT: ${subject}
SCRIPT SECTION: ${scriptSection}${patternContext}
Return JSON only: { "teachPrompt": string (Feynman-style challenge, 1 sentence), "targetConcept": string (3-5 words), "ifTheyStruggle": string (1 hint sentence, not the answer), "successSignal": string (what correct explanation contains), "aiEvalPrompt": string (system prompt for Claude to evaluate student's teach-back — include what to look for and how to score 1-5) }`;

    case "question_sprint":
      return `You are InHero's AP Question Engine. Generate a QUESTION SPRINT overlay — 3 AP-style questions from this script section.
LESSON: ${lessonTitle} | SUBJECT: ${subject}
SCRIPT SECTION: ${scriptSection}${patternContext}
Return JSON only: { "questions": [ { "q": string, "choices": string[] (4 choices starting with A. B. C. D.), "correct": string (letter only), "trap": string (1 sentence), "gapType": string } ], "sprintFocus": string (1 sentence about the collective thinking pattern tested) }
Q1=concept recall, Q2=application in new scenario, Q3=multi-step/trap. Wrong choices must be plausible.`;

    case "analyzer":
      return `You are InHero's Pattern Analyzer. Analyze this full lesson script.
LESSON: ${lessonTitle} | SUBJECT: ${subject}
FULL SCRIPT: ${fullScript}${patternContext}
Return JSON only: { "coreConceptCount": number, "conceptMap": [ { "concept": string, "weight": "high"|"medium"|"low", "likelyGap": "CONCEPT"|"APPLICATION"|"LANGUAGE"|"LOGIC" } ], "examFrequency": string (1 sentence with specifics), "hardestMoment": string (1 sentence), "prerequisiteCheck": string[] (3 concepts student needs), "lessonInOneLine": string (entire lesson logic in 1 sentence, no jargon) }`;

    case "confidence_check":
      return `You are InHero's Identity Engine. Your job is to reframe how a student sees themselves as a learner — not just fix their knowledge.

LESSON: ${lessonTitle} | SUBJECT: ${subject}
SCRIPT SECTION: ${scriptSection}${patternContext}

A Confidence Check overlay interrupts the lesson at a moment where students often underestimate themselves OR overestimate themselves.

Return JSON only:
{
  "identityBelief": "The wrong belief the student probably holds about themselves here. e.g. 'I'm bad at graphs' or 'I've got this concept down'",
  "evidenceFromPattern": "One sentence using their actual data to challenge the belief. If no pattern data, use the general student misconception about this topic.",
  "reframe": "One sentence. The more accurate identity statement. e.g. 'You're not bad at graphs — you rush the axis interpretation step.'",
  "probeQuestion": "One direct question that makes them test the reframe right now. Not a quiz — a reflection. e.g. 'When was the last time you actually got a graph question wrong vs just felt shaky?'",
  "actionBridge": "One sentence. What to do with this reframe in the next 2 minutes of this lesson."
}`;

    case "next_move":
      return `You are InHero's Predictive Coach. You see what's coming before the student does.

LESSON: ${lessonTitle} | SUBJECT: ${subject}
SCRIPT SECTION: ${scriptSection}${patternContext}

A Next Move overlay appears near the END of a lesson section. It predicts exactly where this student will struggle next — in the upcoming exam, the next lesson, or an FRQ — based on what they just learned and their pattern history.

Return JSON only:
{
  "predictionHeadline": "One punchy sentence. 'You understand this now. Here's where it breaks later.' Be specific.",
  "predictedFailure": "The exact scenario where this concept will trip them up. Name the AP question type, FRQ format, or next lesson where it appears.",
  "whyYouWillBreak": "One sentence. The specific gap between what they just learned and what the exam will demand.",
  "preventionDrill": "One concrete 60-second action they can do RIGHT NOW to preempt this failure. Specific — not 'review the concept.'",
  "memoryTag": "Exactly 3-5 words (no more). A terse hook they can recall in an exam. e.g. 'gradient drives the spin' or 'mechanism not just outcome'"
}`;
  }
}

const FALLBACKS: Record<OverlayType, Record<string, unknown>> = {
  spark: {
    conceptUnlocked: "Key concept unlocked here",
    whyItMatters: "This connects to exam material in a critical way.",
    examConnection: "Frequently tested on AP multiple choice.",
    connectedConcepts: ["Related concept A", "Related concept B", "Related concept C"],
    memoryAnchor: "Think of it as a lock and key mechanism.",
  },
  gap_crunch: {
    gapType: "CONCEPT_GAP",
    headline: "Students Consistently Confuse These Two Things",
    whatStudentsThink: "Students believe the simpler explanation is always correct.",
    whatIsActuallyTrue: "The mechanism is more nuanced and depends on context.",
    examTrap: "The AP exam specifically tests whether you know the difference.",
    fixPrompt: "Can you explain exactly when each case applies?",
  },
  teach_back: {
    teachPrompt: "Explain this concept as if you are teaching a confused classmate.",
    targetConcept: "Core mechanism here",
    ifTheyStruggle: "Think about what causes the input to change the output.",
    successSignal: "Correct explanation includes the causal chain and a specific example.",
    aiEvalPrompt: "Evaluate the student's teach-back on a 1-5 scale. Look for: correct terminology, causal reasoning, and a concrete example.",
  },
  question_sprint: {
    questions: [
      { q: "Which of the following best describes the concept?", choices: ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"], correct: "B", trap: "Many students choose A because it sounds plausible.", gapType: "CONCEPT_GAP" },
      { q: "In a new scenario, what would happen if X changes?", choices: ["A. Increase", "B. Decrease", "C. Stay the same", "D. Cannot be determined"], correct: "A", trap: "Students forget the inverse relationship.", gapType: "APPLICATION_GAP" },
      { q: "Which combination of factors leads to the observed result?", choices: ["A. Both A and B", "B. Only A", "C. Only B", "D. Neither A nor B"], correct: "A", trap: "Students eliminate B prematurely.", gapType: "LOGIC_GAP" },
    ],
    sprintFocus: "Tests ability to apply concept across different contexts.",
  },
  analyzer: {
    coreConceptCount: 4,
    conceptMap: [
      { concept: "Primary mechanism", weight: "high", likelyGap: "CONCEPT" },
      { concept: "Application context", weight: "high", likelyGap: "APPLICATION" },
      { concept: "Supporting detail", weight: "medium", likelyGap: "LANGUAGE" },
    ],
    examFrequency: "Appears on approximately 3-5 AP questions per exam.",
    hardestMoment: "Students struggle most when applying the concept to novel scenarios.",
    prerequisiteCheck: ["Basic terminology", "Underlying mechanism", "Related concept"],
    lessonInOneLine: "This lesson establishes the core mechanism and its real-world application.",
  },
  confidence_check: {
    identityBelief: "I'm not a 'science person' — this stuff doesn't click for me.",
    evidenceFromPattern: "Your previous responses show you actually get the core mechanism right more often than you think.",
    reframe: "You're not bad at this subject — you just haven't built the vocabulary to trust your own reasoning yet.",
    probeQuestion: "When you got a question wrong recently, was it because you didn't understand the concept, or because you second-guessed yourself?",
    actionBridge: "For the next section, commit to your first instinct before reading the answer choices.",
  },
  next_move: {
    predictionHeadline: "You get it now — but the exam will flip the scenario on you.",
    predictedFailure: "FRQ questions will give you the outcome and ask you to explain the mechanism — the reverse of how you just learned it.",
    whyYouWillBreak: "You've learned the forward direction; the AP exam demands bidirectional mastery.",
    preventionDrill: "Right now, take the last concept you learned and explain it backwards: start from the result and work to the cause.",
    memoryTag: "Always reverse the scenario",
  },
};

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: {
    type?: OverlayType;
    context?: OverlayContext;
    studentId?: string;
    subjectId?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { type, context, studentId = "preview", subjectId = "" } = body;
  if (!type || !context) {
    return NextResponse.json({ error: "type and context required" }, { status: 400 });
  }

  const validTypes: OverlayType[] = [
    "spark", "gap_crunch", "teach_back", "question_sprint", "analyzer",
    "confidence_check", "next_move",
  ];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: `invalid type: ${type}` }, { status: 400 });
  }

  // Fetch student pattern (non-blocking — empty if no data)
  const pattern = await getStudentPattern(studentId, subjectId);
  const patternContext = buildPatternContext(pattern);

  const prompt = buildPrompt(type, context, patternContext);

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const data = parseJsonBlock(raw, FALLBACKS[type]);

    return NextResponse.json({ ok: true, type, data });
  } catch (err) {
    console.error("[overlay]", err);
    return NextResponse.json({ ok: true, type, data: FALLBACKS[type], fallback: true });
  }
}
