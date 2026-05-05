import type { LessonPlayerData } from "@/lib/lesson-player-types";

/**
 * AP Biology — Cell Structure and Function
 * Interactive lesson player data (sample / placeholder videos)
 *
 * Replace the youtubeId values with real lesson clips before launch.
 * The placeholder uses a public YouTube video so the YouTube IFrame API
 * can be tested end-to-end locally.
 */
export const cellStructureLesson: LessonPlayerData = {
  id: "cell-structure",
  title: "Cell Structure and Function",
  parts: [
    // ── Part 1: Introduction ────────────────────────────────────────────────
    {
      id: "part-1",
      type: "video",
      youtubeId: "dQw4w9WgXcQ",   // TODO: replace with real clip
      duration: "2:30",
    },

    // ── After Part 1: SPARK — open reflection ───────────────────────────────
    {
      id: "spark-1",
      type: "SPARK",
      prompt:
        "If every compartment in a cell shares the same environment, what's the point of having separate organelles?",
    },

    // ── Part 2: Prokaryotes vs. Eukaryotes ──────────────────────────────────
    {
      id: "part-2",
      type: "video",
      youtubeId: "dQw4w9WgXcQ",   // TODO: replace with real clip
      duration: "2:45",
    },

    // ── After Part 2: GAP CRUNCH — spot the misconception ───────────────────
    {
      id: "gap-crunch-1",
      type: "GAP_CRUNCH",
      statement: "Prokaryotes have NO nucleus — but they still have DNA.",
      trap: "No nucleus = no DNA",
      correct: "No nucleus = no membrane-bound organelles",
      options: [
        "No nucleus = no DNA",
        "No nucleus = no membrane-bound organelles",
      ],
    },

    // ── Part 3: Membrane Transport ──────────────────────────────────────────
    {
      id: "part-3",
      type: "video",
      youtubeId: "dQw4w9WgXcQ",   // TODO: replace with real clip
      duration: "3:00",
    },

    // ── After Part 3: QUESTION SPRINT ───────────────────────────────────────
    {
      id: "question-1",
      type: "QUESTION_SPRINT",
      question:
        "Which of the following structures is found in BOTH prokaryotic and eukaryotic cells?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      correct: 2,
      explanation:
        "Ribosomes are present in all living cells — every cell needs ribosomes to synthesize proteins. The nucleus, mitochondria, and Golgi apparatus are all membrane-bound organelles exclusive to eukaryotes.",
      wrongPattern:
        "Don't confuse membrane-bound organelles (nucleus, mitochondria, Golgi) with ribosomes. Ribosomes are NOT membrane-bound and are universal to all cells.",
    },

    // ── ANALYZER ────────────────────────────────────────────────────────────
    {
      id: "analyzer-1",
      type: "ANALYZER",
      gapType: "CONCEPT GAP",
      message:
        "You recalled the vocabulary but may have missed the key boundary: 'no nucleus' means no membrane-bound organelles — not the absence of genetic material. Watch for this distinction on AP FRQs.",
    },
  ],
};
