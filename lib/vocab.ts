import "server-only";
import { CORE_NOTES_KO } from "@/lib/data/coreNotesKo";
import { MATH_VOCAB } from "@/lib/data/vocabMathTerms";

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

  // Merge curated 수학 개념용어 — math notes carry few term cards, so these
  // ensure a real 수학 단어장 (creates the math buckets if absent).
  for (const [cid, mv] of Object.entries(MATH_VOCAB)) {
    let b = acc.get(cid);
    if (!b) {
      b = { courseId: cid, label: mv.label, emoji: mv.emoji, seen: new Map() };
      acc.set(cid, b);
    }
    for (const t of mv.terms) {
      const key = t.en.toLowerCase();
      if (!b.seen.has(key)) b.seen.set(key, { en: t.en, ko: t.ko, def: t.def, unit: t.unit ?? null });
    }
  }

  const out = new Map<string, Bucket>();
  for (const [cid, b] of acc) {
    if (b.seen.size === 0) continue;
    out.set(cid, {
      courseId: cid,
      label: b.label,
      emoji: b.emoji,
      terms: [...b.seen.values()].sort(
        (a, z) => (a.unit ?? 0) - (z.unit ?? 0) || a.en.localeCompare(z.en)
      ),
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
