import { describe, expect, it } from "vitest";
import {
  buildFallbackLessons,
  getFallbackLessonMatch,
} from "@/lib/getCourseLessons";

describe("course lesson fallbacks", () => {
  it("builds fallback AP Biology lessons from the breakdown seed", () => {
    const lessons = buildFallbackLessons("ap-biology");

    expect(lessons[0]).toMatchObject({
      id: "ap-biology-u1-l1",
      unit_number: 1,
      lesson_number: 1,
      title: "Why Water Makes Life Possible",
    });
    expect(lessons.length).toBeGreaterThan(40);
  });

  it("resolves fallback next and previous lesson ids", () => {
    expect(getFallbackLessonMatch("ap-biology-u1-l1", "ap-biology")).toEqual({
      lesson: {
        id: "ap-biology-u1-l1",
        unit_number: 1,
        lesson_number: 1,
        title: "Why Water Makes Life Possible",
      },
      courseId: "ap-biology",
      nextLessonId: "ap-biology-u1-l2",
      prevLessonId: null,
    });

    const secondLesson = getFallbackLessonMatch("ap-biology-u1-l2", "ap-biology");
    expect(secondLesson?.prevLessonId).toBe("ap-biology-u1-l1");
  });
});
