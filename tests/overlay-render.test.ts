import { describe, expect, it } from "vitest";
import {
  isImportedScriptPromptOverlay,
  normalizeQuestionSprintQuestions,
} from "@/lib/overlayRender";

describe("overlay render helpers", () => {
  it("treats script-import spark and teach-back payloads as prompt-only overlays", () => {
    expect(
      isImportedScriptPromptOverlay("SPARK", {
        prompt: "Why does water push oil out instead of surrounding it?",
      })
    ).toBe(true);

    expect(
      isImportedScriptPromptOverlay("TEACH_BACK", {
        prompt: "Explain why water dissolves salt without using the word polar.",
      })
    ).toBe(true);

    expect(
      isImportedScriptPromptOverlay("SPARK", {
        conceptUnlocked: "Hydrogen bonds create cohesion",
        whyItMatters: "This explains xylem transport.",
      })
    ).toBe(false);
  });

  it("normalizes imported script question sprint questions", () => {
    const normalized = normalizeQuestionSprintQuestions({
      questions: [
        {
          question: "Which property lets water move upward in xylem?",
          options: ["A", "B", "C", "D"],
          correct: 1,
          explanation: "Cohesion creates a continuous pull.",
          wrongPattern: "Confusing cohesion with adhesion.",
          gapType: "LOGIC GAP",
        },
      ],
    });

    expect(normalized).toEqual([
      {
        prompt: "Which property lets water move upward in xylem?",
        options: ["A", "B", "C", "D"],
        correctIndex: 1,
        explanation: "Cohesion creates a continuous pull.",
        wrongPattern: "Confusing cohesion with adhesion.",
        gapType: "LOGIC GAP",
      },
    ]);
  });

  it("normalizes legacy multi-question sprint payloads with letter answers", () => {
    const normalized = normalizeQuestionSprintQuestions({
      questions: [
        {
          q: "What happens when pH drops?",
          choices: ["The enzyme unfolds", "Water stops being polar"],
          correct: "A",
          trap: "Thinking pH is just a vague bad environment.",
          gapType: "CONCEPT GAP",
        },
      ],
    });

    expect(normalized).toEqual([
      {
        prompt: "What happens when pH drops?",
        options: ["A. The enzyme unfolds", "B. Water stops being polar"],
        correctIndex: 0,
        explanation: "",
        wrongPattern: "Thinking pH is just a vague bad environment.",
        gapType: "CONCEPT GAP",
      },
    ]);
  });
});
