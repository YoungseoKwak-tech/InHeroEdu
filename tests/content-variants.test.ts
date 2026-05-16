import { describe, expect, it } from "vitest";
import {
  getCourseHref,
  getCourseIndexHref,
  getLessonContentId,
  getLessonHref,
  stripLessonContentVariant,
} from "@/lib/contentVariants";

describe("contentVariants", () => {
  it("derives Korean content lesson ids without changing base routes", () => {
    expect(getLessonContentId("ap-biology-u1-l1", "en")).toBe("ap-biology-u1-l1");
    expect(getLessonContentId("ap-biology-u1-l1", "ko")).toBe("ap-biology-u1-l1__ko");
    expect(stripLessonContentVariant("ap-biology-u1-l1__ko")).toBe("ap-biology-u1-l1");
  });

  it("builds English and Korean course routes from the same base lesson id", () => {
    expect(getCourseIndexHref("en")).toBe("/courses");
    expect(getCourseIndexHref("ko")).toBe("/kr/courses");
    expect(getCourseHref("ko", "ap-biology")).toBe("/kr/courses/ap-biology");
    expect(getLessonHref("ko", "ap-biology", "ap-biology-u1-l1__ko")).toBe(
      "/kr/courses/ap-biology/ap-biology-u1-l1"
    );
  });
});
