import { describe, expect, it } from "vitest";
import {
  buildScriptOverlayRows,
  buildScriptOverlayRowsFromRaw,
  chooseBestOverlayRows,
  compactScriptOverlays,
  extractOverlaysJSON,
} from "@/lib/scriptOverlays";

const sampleScript = `
## HOOK (0:00-0:35)
Hello world.

## OVERLAYS JSON:
\`\`\`json
[
  { "id": "spark-1", "type": "SPARK", "prompt": "Think." },
  { "id": "gap-1", "type": "GAP_CRUNCH", "statement": "State", "options": ["A", "B"] },
  { "id": "teach-1", "type": "TEACH_BACK", "prompt": "Explain." },
  { "id": "q1", "type": "QUESTION_SPRINT", "question": "Q1", "options": ["A", "B"], "correct": 1 },
  { "id": "q2", "type": "QUESTION_SPRINT", "question": "Q2", "options": ["A", "B"], "correct": 0 },
  { "id": "analyzer-1", "type": "ANALYZER", "gapType": "LOGIC GAP", "message": "Mechanism first." }
]
\`\`\`
`;

describe("script overlay parsing", () => {
  it("extracts overlay JSON from the script block", () => {
    const raw = extractOverlaysJSON(sampleScript);

    expect(raw).toHaveLength(6);
    expect(raw[0]).toMatchObject({
      type: "SPARK",
      prompt: "Think.",
    });
  });

  it("compacts consecutive question sprint items into one multi-question overlay", () => {
    const compacted = compactScriptOverlays(extractOverlaysJSON(sampleScript));

    expect(compacted).toHaveLength(5);
    expect(compacted[3]).toMatchObject({
      type: "QUESTION_SPRINT",
      data: {
        source: "script_import",
      },
    });
    expect(Array.isArray(compacted[3]?.data.questions)).toBe(true);
    expect((compacted[3]?.data.questions as unknown[])).toHaveLength(2);
  });

  it("builds overlay rows that can be used directly by the lesson player", () => {
    const rows = buildScriptOverlayRows(sampleScript, "ap-biology-u1-l1");

    expect(rows).toHaveLength(5);
    expect(rows[0]).toMatchObject({
      lesson_id: "ap-biology-u1-l1",
      type: "spark",
      script_section_ref: "SPARK",
      position: 0,
    });
    expect(rows[3]).toMatchObject({
      type: "question_sprint",
      script_section_ref: "QUESTION SPRINT",
    });
  });

  it("builds overlay rows from a saved lesson_scripts.overlays array", () => {
    const raw = extractOverlaysJSON(sampleScript);
    const rows = buildScriptOverlayRowsFromRaw(raw, "ap-biology-u1-l1");

    expect(rows).toHaveLength(5);
    expect(rows[1]).toMatchObject({
      type: "gap_crunch",
      script_section_ref: "GAP CRUNCH",
    });
  });

  it("prefers script-derived overlays when DB rows are incomplete", () => {
    const scriptRows = buildScriptOverlayRows(sampleScript, "ap-biology-u1-l1");
    const dbRows = [scriptRows[0]];

    expect(chooseBestOverlayRows(dbRows, scriptRows)).toEqual(scriptRows);
  });

  it("keeps DB overlays when they already match the imported script set", () => {
    const scriptRows = buildScriptOverlayRows(sampleScript, "ap-biology-u1-l1");
    const dbRows = scriptRows.map((row) => ({
      ...row,
      id: `db-${row.position}`,
      created_at: "2026-05-06T00:00:00.000Z",
      updated_at: "2026-05-06T00:00:00.000Z",
    }));

    expect(chooseBestOverlayRows(dbRows, scriptRows)).toEqual(dbRows);
  });
});
