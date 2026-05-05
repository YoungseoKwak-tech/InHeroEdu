// Types for the InHero interactive LessonPlayer component

export type PartType =
  | "video"
  | "SPARK"
  | "GAP_CRUNCH"
  | "TEACH_BACK"
  | "QUESTION_SPRINT"
  | "ANALYZER";

export interface VideoPart {
  id: string;
  type: "video";
  /**
   * Direct video URL (S3, CDN) or a YouTube watch/embed URL.
   * Optional when youtubeId is provided directly.
   */
  src?: string;
  /** Pre-extracted YouTube video ID — takes precedence over src */
  youtubeId?: string;
  duration?: string;
}

export interface SparkPart {
  id: string;
  type: "SPARK";
  prompt: string;
  inputType?: "text";
}

export interface GapCrunchPart {
  id: string;
  type: "GAP_CRUNCH";
  /** The key insight framing being taught */
  statement: string;
  /** The wrong / trap option */
  trap: string;
  /** The correct option text */
  correct: string;
  /** All displayed options in the desired order */
  options: string[];
}

export interface TeachBackPart {
  id: string;
  type: "TEACH_BACK";
  prompt: string;
}

export interface QuestionSprintPart {
  id: string;
  type: "QUESTION_SPRINT";
  question: string;
  options: string[];
  /** Zero-based index of the correct option */
  correct: number;
  explanation: string;
  wrongPattern: string;
}

export type GapLabel =
  | "CONCEPT GAP"
  | "LANGUAGE GAP"
  | "LOGIC GAP"
  | "APPLICATION GAP";

export interface AnalyzerPart {
  id: string;
  type: "ANALYZER";
  gapType: GapLabel;
  message: string;
}

export type LessonPart =
  | VideoPart
  | SparkPart
  | GapCrunchPart
  | TeachBackPart
  | QuestionSprintPart
  | AnalyzerPart;

export interface LessonPlayerData {
  /** Matches the lesson id in lessons.ts */
  id: string;
  title: string;
  parts: LessonPart[];
}
