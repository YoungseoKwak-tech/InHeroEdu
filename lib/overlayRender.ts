export interface NormalizedQuestionSprintQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongPattern: string;
  gapType: string;
}

function hasOwnValue(data: Record<string, unknown>, key: string) {
  const value = data[key];
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function optionAlreadyLabeled(option: string) {
  return /^[A-E][).:\-]\s*/.test(option) || /^[A-E]\s/.test(option);
}

function letterToIndex(value: string) {
  const letter = value.trim().charAt(0).toUpperCase();
  const idx = ["A", "B", "C", "D", "E"].indexOf(letter);
  return idx >= 0 ? idx : 0;
}

export function isImportedScriptPromptOverlay(type: string, data: Record<string, unknown>) {
  const upperType = type.toUpperCase();

  if (upperType === "SPARK") {
    return hasOwnValue(data, "prompt") &&
      !hasOwnValue(data, "conceptUnlocked") &&
      !hasOwnValue(data, "whyItMatters") &&
      !hasOwnValue(data, "examConnection") &&
      !hasOwnValue(data, "memoryAnchor") &&
      !hasOwnValue(data, "connectedConcepts");
  }

  if (upperType === "TEACH_BACK") {
    return hasOwnValue(data, "prompt") &&
      !hasOwnValue(data, "targetConcept") &&
      !hasOwnValue(data, "teachPrompt") &&
      !hasOwnValue(data, "ifTheyStruggle") &&
      !hasOwnValue(data, "successSignal");
  }

  return false;
}

export function normalizeQuestionSprintQuestions(data: Record<string, unknown>): NormalizedQuestionSprintQuestion[] {
  const rawQuestions = Array.isArray(data.questions) ? data.questions : [];

  return rawQuestions.flatMap((rawQuestion) => {
    if (!rawQuestion || typeof rawQuestion !== "object") return [];

    const question = rawQuestion as Record<string, unknown>;

    if (typeof question.question === "string") {
      const options = Array.isArray(question.options)
        ? question.options.map((opt) => String(opt))
        : [];
      return [{
        prompt: question.question,
        options,
        correctIndex: typeof question.correct === "number" ? question.correct : 0,
        explanation: String(question.explanation ?? ""),
        wrongPattern: String(question.wrongPattern ?? question.explanation ?? ""),
        gapType: String(question.gapType ?? ""),
      }];
    }

    if (typeof question.q === "string") {
      const rawChoices = Array.isArray(question.choices)
        ? question.choices.map((choice) => String(choice))
        : [];
      const options = rawChoices.map((choice, idx) =>
        optionAlreadyLabeled(choice) ? choice : `${String.fromCharCode(65 + idx)}. ${choice}`
      );
      return [{
        prompt: question.q,
        options,
        correctIndex: typeof question.correct === "string"
          ? letterToIndex(question.correct)
          : 0,
        explanation: String(question.explanation ?? ""),
        wrongPattern: String(question.trap ?? question.explanation ?? ""),
        gapType: String(question.gapType ?? ""),
      }];
    }

    return [];
  });
}
