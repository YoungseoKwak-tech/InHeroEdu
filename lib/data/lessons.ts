export interface ClickableTerm {
  term: string;
  termEn: string;
}

export interface TranscriptSegment {
  time: string;
  text: string;
  textEn?: string;
  clickableTerms: ClickableTerm[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  titleEn: string;
  duration: string;
  youtubeId: string;
  topic: string;
  transcript: TranscriptSegment[];
  practiceQuestions: PracticeQuestion[];
  nextLessonId: string | null;
  prevLessonId: string | null;
  order: number;
}

export const lessons: Record<string, Lesson> = {
  "cell-structure": {
    id: "cell-structure",
    courseId: "ap-biology",
    title: "Cell Structure and Function",
    titleEn: "Cell Structure and Function",
    duration: "8:30",
    youtubeId: "",
    topic: "Cell Structure and Function",
    transcript: [],
    practiceQuestions: [],
    nextLessonId: null,
    prevLessonId: null,
    order: 1,
  },
};

export function getLessonsByCourse(courseId: string): Lesson[] {
  return Object.values(lessons)
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}
