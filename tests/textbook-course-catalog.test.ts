import { describe, expect, it } from "vitest";
import { getTextbookCourseLabel } from "@/lib/textbookCourseCatalog";

describe("textbook course catalog", () => {
  it("resolves known course ids to their live labels", () => {
    expect(getTextbookCourseLabel("ap-biology")).toBe("AP Biology");
    expect(getTextbookCourseLabel("ap-chemistry")).toBe("AP Chemistry");
  });

  it("falls back to a readable label for unknown ids", () => {
    expect(getTextbookCourseLabel("custom-course-id")).toBe("Custom Course Id");
  });
});
