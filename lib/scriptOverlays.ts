export interface RawScriptOverlay {
  id?: string;
  type?: string;
  [key: string]: unknown;
}

export interface CompactScriptOverlay {
  type: string;
  data: Record<string, unknown>;
}

export interface ScriptDerivedOverlayRow {
  id: string;
  lesson_id: string;
  type: string;
  data: Record<string, unknown>;
  script_section_ref: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

const TYPE_TO_SECTION_REF: Record<string, string> = {
  SPARK: "SPARK",
  GAP_CRUNCH: "GAP CRUNCH",
  TEACH_BACK: "TEACH BACK",
  QUESTION_SPRINT: "QUESTION SPRINT",
  ANALYZER: "ANALYZER",
  CONFIDENCE_CHECK: "CONFIDENCE CHECK",
  NEXT_MOVE: "NEXT MOVE",
};

const TYPE_TO_DB: Record<string, string> = {
  SPARK: "spark",
  GAP_CRUNCH: "gap_crunch",
  TEACH_BACK: "teach_back",
  QUESTION_SPRINT: "question_sprint",
  ANALYZER: "analyzer",
  CONFIDENCE_CHECK: "confidence_check",
  NEXT_MOVE: "next_move",
};

function normalizeOverlayKey(value: string | null | undefined) {
  return String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[_\s]+/g, " ");
}

function normalizeType(type: string) {
  return normalizeOverlayKey(type).replace(/\s+/g, "_");
}

export function extractOverlaysJSON(script: string): RawScriptOverlay[] {
  const markerMatch = /##?\s*OVERLAYS JSON:/i.exec(script);
  if (!markerMatch) return [];

  const markerIndex = markerMatch.index;
  const jsonStart = script.indexOf("[", markerIndex);
  if (jsonStart === -1) return [];

  let depth = 0;
  let jsonEnd = -1;
  let inString = false;
  let escaped = false;

  for (let i = jsonStart; i < script.length; i++) {
    const ch = script[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
      continue;
    }

    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        jsonEnd = i;
        break;
      }
    }
  }

  if (jsonEnd === -1) return [];

  try {
    const parsed = JSON.parse(script.slice(jsonStart, jsonEnd + 1));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function compactScriptOverlays(raw: RawScriptOverlay[]): CompactScriptOverlay[] {
  const result: CompactScriptOverlay[] = [];
  let questionBatch: RawScriptOverlay[] = [];

  function withSource(type: string, data: Record<string, unknown>): CompactScriptOverlay {
    return {
      type,
      data: {
        source: "script_import",
        ...data,
      },
    };
  }

  function flushQuestions() {
    if (questionBatch.length === 0) return;
    result.push(
      withSource("QUESTION_SPRINT", {
        questions: questionBatch.map((q) => ({
          question: String(q.question ?? ""),
          options: Array.isArray(q.options) ? q.options : [],
          correct: typeof q.correct === "number" ? q.correct : 0,
          explanation: String(q.explanation ?? ""),
          wrongPattern: String(q.wrongPattern ?? ""),
          gapType: String(q.gapType ?? ""),
        })),
      })
    );
    questionBatch = [];
  }

  for (const item of raw) {
    const type = normalizeType(String(item.type ?? ""));
    if (!type) continue;

    if (type === "QUESTION_SPRINT") {
      if (Array.isArray(item.questions)) {
        flushQuestions();
        const { type: _type, id: _id, ...data } = item;
        void _type;
        void _id;
        result.push(withSource(type, data as Record<string, unknown>));
      } else {
        questionBatch.push(item);
      }
      continue;
    }

    flushQuestions();
    const { type: _type, id: _id, ...data } = item;
    void _type;
    void _id;
    result.push(withSource(type, data as Record<string, unknown>));
  }

  flushQuestions();
  return result;
}

export function buildScriptOverlayRows(
  script: string,
  lessonId: string
): ScriptDerivedOverlayRow[] {
  return buildScriptOverlayRowsFromRaw(extractOverlaysJSON(script), lessonId);
}

export function buildScriptOverlayRowsFromRaw(
  raw: RawScriptOverlay[],
  lessonId: string
): ScriptDerivedOverlayRow[] {
  const compacted = compactScriptOverlays(raw);
  return compacted.map((overlay, position) => ({
    id: `script-${lessonId}-${position}-${overlay.type.toLowerCase()}`,
    lesson_id: lessonId,
    type: TYPE_TO_DB[overlay.type] ?? overlay.type.toLowerCase(),
    data: overlay.data,
    script_section_ref: TYPE_TO_SECTION_REF[overlay.type] ?? "",
    position,
    created_at: "",
    updated_at: "",
  }));
}

export function chooseBestOverlayRows<T extends { type: string; script_section_ref: string | null; data: Record<string, unknown> }>(
  dbRows: T[],
  scriptRows: T[]
): T[] {
  if (scriptRows.length === 0) return dbRows;
  if (dbRows.length === 0) return scriptRows;

  const dbKeys = new Set(
    dbRows.map((row) => normalizeOverlayKey(row.script_section_ref || row.type))
  );
  const scriptKeys = new Set(
    scriptRows.map((row) => normalizeOverlayKey(row.script_section_ref || row.type))
  );
  const missingScriptKeys = Array.from(scriptKeys).filter((key) => !dbKeys.has(key));
  const hasScriptImportRows = dbRows.some(
    (row) => String(row.data?.source ?? "") === "script_import"
  );

  if (missingScriptKeys.length > 0 && (!hasScriptImportRows || dbRows.length < scriptRows.length)) {
    return scriptRows;
  }

  return dbRows;
}
