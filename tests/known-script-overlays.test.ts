import { describe, expect, it } from "vitest";
import { getKnownScriptOverlayRows } from "@/lib/knownScriptOverlays";

describe("known script overlay fallbacks", () => {
  it("provides a full overlay set for the AP Biology water lesson", () => {
    const rows = getKnownScriptOverlayRows("ap-biology-u1-l1");

    expect(rows).toHaveLength(5);
    expect(rows.map((row) => row.script_section_ref)).toEqual([
      "SPARK",
      "GAP CRUNCH",
      "TEACH BACK",
      "QUESTION SPRINT",
      "ANALYZER",
    ]);
  });

  it("returns no rows for lessons without a curated fallback", () => {
    expect(getKnownScriptOverlayRows("ap-biology-u1-l2")).toEqual([]);
  });
});
