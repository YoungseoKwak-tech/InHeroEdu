import "server-only";
import { CORE_NOTES_KO } from "@/lib/data/coreNotesKo";
import { CORE_NOTES_AUTHORED } from "@/lib/data/coreNotesAuthored";
import { courses } from "@/lib/data/courses";
import { englishDef } from "@/lib/data/vocabEnglishDefs";
import { MATH_VOCAB } from "@/lib/data/vocabMathTerms";
import { SAT_VOCAB } from "@/lib/data/vocabSatWords";
import { TOEFL_VOCAB } from "@/lib/data/vocabToeflWords";

const COURSE_META = new Map(courses.map((c) => [c.id, { label: c.subjectEn, emoji: c.icon }]));

/**
 * Subject vocabulary 단어장 — built from the Korean Core Notes, whose terms are
 * authored as "한국어 (English)" with a Korean definition. American admissions
 * reward strong subject vocabulary, and Korean students learn fastest by
 * mapping the Korean meaning they already know onto the English term. So we
 * surface every bilingual term as a flashcard pair (Korean → English).
 *
 * Source is static and grows automatically as the Core Notes 한국어 loop fills
 * more subjects — no separate content pipeline to maintain.
 */

export interface VocabTerm {
  en: string;          // English term (what the student must recall)
  ko: string;          // Korean term / gloss (the prompt they already know)
  def: string;         // Korean definition for context
  defEn?: string;      // English definition (for English-only learners; 영어 버전)
  unit: number | null;
}

export interface VocabSubject {
  courseId: string;
  label: string;
  emoji: string;
  count: number;
}

interface Bucket {
  courseId: string;
  label: string;
  emoji: string;
  terms: VocabTerm[];
}

/** Parse a "한국어 (English)" term into its two halves. */
function splitBilingual(raw: string): { ko: string; en: string } | null {
  const m = raw.match(/^(.+?)\s*\(([^()]+)\)\s*$/);
  if (!m) return null;
  const ko = m[1].trim();
  const en = m[2].trim();
  // The parenthetical must look like English (has latin letters) to be a term.
  if (!ko || !en || !/[A-Za-z]/.test(en)) return null;
  return { ko, en };
}

let CACHE: Map<string, Bucket> | null = null;

function build(): Map<string, Bucket> {
  const acc = new Map<string, { courseId: string; label: string; emoji: string; seen: Map<string, VocabTerm> }>();

  for (const note of CORE_NOTES_KO.values()) {
    if (!note.courseId) continue;
    let b = acc.get(note.courseId);
    if (!b) {
      b = { courseId: note.courseId, label: note.subjectLabel, emoji: note.emoji, seen: new Map() };
      acc.set(note.courseId, b);
    }
    for (const sec of note.sections ?? []) {
      for (const t of sec.terms ?? []) {
        const s = splitBilingual(t.term);
        if (!s) continue;
        const key = s.en.toLowerCase();
        if (!b.seen.has(key)) {
          b.seen.set(key, { en: s.en, ko: s.ko, def: t.def, unit: note.unit ?? null });
        }
      }
    }
  }

  // Also pull bilingual terms from hand-authored Core Notes (override channel) —
  // these subjects (e.g. AP Precalculus, Honors English) aren't in CORE_NOTES_KO
  // but their authored notes carry "한국어 (English)" terms for the 단어장.
  for (const note of CORE_NOTES_AUTHORED) {
    if (!note.courseId) continue;
    const meta = COURSE_META.get(note.courseId);
    let b = acc.get(note.courseId);
    if (!b) {
      b = { courseId: note.courseId, label: meta?.label ?? note.courseId, emoji: meta?.emoji ?? "📘", seen: new Map() };
      acc.set(note.courseId, b);
    }
    for (const sec of note.sections ?? []) {
      for (const t of sec.terms ?? []) {
        const s = splitBilingual(t.term);
        if (!s) continue;
        const key = s.en.toLowerCase();
        if (!b.seen.has(key)) {
          b.seen.set(key, { en: s.en, ko: s.ko, def: t.def, unit: note.unit ?? null });
        }
      }
    }
  }

  // Dedicated, CLEAN 수학 개념용어 단어책 — only the curated standard math terms
  // (한글 보고 → 영어 떠올리기), deduped across calculus + statistics. Kept as
  // its own subject so it isn't diluted by the noisier auto-extracted decks.
  const mathSeen = new Map<string, VocabTerm>();
  for (const mv of Object.values(MATH_VOCAB)) {
    for (const t of mv.terms) {
      const key = t.en.toLowerCase();
      if (!mathSeen.has(key)) mathSeen.set(key, { en: t.en, ko: t.ko, def: t.def, unit: t.unit ?? null });
    }
  }
  if (mathSeen.size > 0) {
    acc.set("math-concepts", { courseId: "math-concepts", label: "수학 개념용어", emoji: "🔢", seen: mathSeen });
  }

  // SAT 필수단어장 — curated high-frequency SAT words (영어 보고 → 한국어 뜻).
  // Its own subject so it stands apart from the subject-concept decks.
  const satSeen = new Map<string, VocabTerm>();
  for (const t of SAT_VOCAB) {
    const key = t.en.toLowerCase();
    if (!satSeen.has(key)) satSeen.set(key, { en: t.en, ko: t.ko, def: t.def, unit: t.unit ?? null });
  }
  if (satSeen.size > 0) {
    acc.set("sat-essential", { courseId: "sat-essential", label: "SAT 필수단어", emoji: "📕", seen: satSeen });
  }

  // TOEFL 필수단어장 — academic English from TOEFL iBT lecture/reading passages
  // (영어 보고 → 한국어 뜻). Its own subject, like the SAT deck.
  const toeflSeen = new Map<string, VocabTerm>();
  for (const t of TOEFL_VOCAB) {
    const key = t.en.toLowerCase();
    if (!toeflSeen.has(key)) toeflSeen.set(key, { en: t.en, ko: t.ko, def: t.def, unit: t.unit ?? null });
  }
  if (toeflSeen.size > 0) {
    acc.set("toefl-essential", { courseId: "toefl-essential", label: "TOEFL 필수단어", emoji: "📘", seen: toeflSeen });
  }

  const out = new Map<string, Bucket>();
  for (const [cid, b] of acc) {
    if (b.seen.size === 0) continue;
    out.set(cid, {
      courseId: cid,
      label: b.label,
      emoji: b.emoji,
      // Attach the authored English definition (if any) so 영어 버전 can show a
      // real English gloss; falls back to the Korean def in the UI when absent.
      terms: [...b.seen.values()]
        .map((t) => {
          const en = englishDef(cid, t.en.toLowerCase());
          return en ? { ...t, defEn: en } : t;
        })
        .sort((a, z) => (a.unit ?? 0) - (z.unit ?? 0) || a.en.localeCompare(z.en)),
    });
  }
  return out;
}

function cache(): Map<string, Bucket> {
  if (!CACHE) CACHE = build();
  return CACHE;
}

export function getVocabSubjects(): VocabSubject[] {
  return [...cache().values()]
    .map((b) => ({ courseId: b.courseId, label: b.label, emoji: b.emoji, count: b.terms.length }))
    .sort((a, z) => z.count - a.count);
}

export function getVocabTerms(courseId: string): VocabTerm[] {
  return cache().get(courseId)?.terms ?? [];
}

export function getTotalVocab(): number {
  let n = 0;
  for (const b of cache().values()) n += b.terms.length;
  return n;
}
