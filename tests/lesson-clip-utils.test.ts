import { describe, expect, it } from "vitest";
import {
  getClipBaseTitle,
  getNextClipPartNumber,
  getClipPartNumber,
  getStoredClipSectionTitle,
  isClipSectionTitle,
  normalizeClipTitle,
} from "@/lib/lessonClipUtils";

describe("lesson clip utils", () => {
  it("parses clip part metadata", () => {
    expect(getClipBaseTitle("HOOK__PART_3")).toBe("HOOK");
    expect(getClipPartNumber("HOOK__PART_3")).toBe(3);
    expect(getClipPartNumber("HOOK")).toBe(1);
  });

  it("normalizes clip titles for matching", () => {
    expect(normalizeClipTitle("Hero Explain 1__PART_2")).toBe("HERO EXPLAIN 1");
    expect(normalizeClipTitle("  wrap + trajectory cue  ")).toBe("WRAP + TRAJECTORY CUE");
  });

  it("builds stored part titles and next part numbers", () => {
    expect(getStoredClipSectionTitle("HOOK", 1)).toBe("HOOK");
    expect(getStoredClipSectionTitle("HOOK", 3)).toBe("HOOK__PART_3");

    expect(getNextClipPartNumber([], "HOOK")).toBe(1);
    expect(getNextClipPartNumber(["HOOK"], "HOOK")).toBe(2);
    expect(getNextClipPartNumber(["HOOK__PART_2"], "HOOK")).toBe(3);
    expect(getNextClipPartNumber(["HOOK", "HOOK__PART_3"], "HOOK")).toBe(4);
  });

  it("keeps upload UI limited to real video sections", () => {
    expect(isClipSectionTitle("HOOK")).toBe(true);
    expect(isClipSectionTitle("HERO EXPLAIN 1")).toBe(true);
    expect(isClipSectionTitle("WRAP + TRAJECTORY CUE")).toBe(true);

    expect(isClipSectionTitle("SPARK")).toBe(false);
    expect(isClipSectionTitle("GAP CRUNCH")).toBe(false);
    expect(isClipSectionTitle("TEACH BACK")).toBe(false);
    expect(isClipSectionTitle("QUESTION SPRINT")).toBe(false);
    expect(isClipSectionTitle("ANALYZER")).toBe(false);
    expect(isClipSectionTitle("OVERLAYS JSON:")).toBe(false);
  });
});
