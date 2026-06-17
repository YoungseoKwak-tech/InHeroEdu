/**
 * Core Notes (한국어 일타강사) → textbook chapters_data.json converter.
 *
 * Source: lib/data/coreNotesKo (static authored CoreNote[] per subject/unit).
 * Output: scripts/textbook/build/<courseId>/chapters_data.json + manifest.json
 *
 * Each CoreNote maps 1:1 to a renderer "chapter" (see scripts/textbook/
 * inhero_textbook.py — fields: unit_name, chapter_title, hook,
 * learning_objectives, sections[title/subtitle/body/key_terms/boxes]).
 *
 * The renderer derives unit/lesson numbers sequentially from unit_name
 * changes, so chapters MUST be emitted ordered by (unit, lessonNum) with a
 * stable unit_name per unit.
 *
 *   npx tsx scripts/textbook/corenotes-to-book.ts <courseId>
 *   npx tsx scripts/textbook/corenotes-to-book.ts all
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { CoreNote, NoteSection } from "@/lib/coreNotes";
import { CORE_NOTES_KO } from "@/lib/data/coreNotesKo";
import { courses } from "@/lib/data/courses";

// Subjects that already have a published textbook — skip them.
const ALREADY_PUBLISHED = new Set([
  "ap-biology", "ap-chemistry", "ap-physics-1", "ap-physics-2",
  "ap-calculus-ab", "ap-calculus-bc",
]);

const BUILD_ROOT = join(process.cwd(), "scripts", "textbook", "build");
const courseById = new Map(courses.map((c) => [c.id, c]));

// reportlab renders each field through its mini-XML Paragraph parser, so raw
// &, <, > (common in code / inequalities like "<Q1" or Java generics) must be
// escaped or the parser drops text or crashes ("unclosed tags"). Newlines stay
// literal — the renderer converts them to <br/> itself.
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Chapter = {
  unit_name: string;
  chapter_title: string;
  hook: string;
  learning_objectives: string[];
  sections: Array<{
    title: string;
    subtitle: string;
    body: string;
    key_terms: [string, string][];
    boxes: [string, string][];
  }>;
};

function sectionToBody(s: NoteSection): string {
  const parts: string[] = [];
  if (s.body) parts.push(s.body.trim());
  if (s.table && Array.isArray(s.table.rows) && s.table.rows.length) {
    const head = (s.table.headers || []).join(" | ");
    const rows = s.table.rows.map((r) => r.join(" | ")).join("\n");
    parts.push([head, rows].filter(Boolean).join("\n"));
  }
  if (s.keyIdea) parts.push(`◆ 핵심: ${s.keyIdea.trim()}`);
  if (s.example) parts.push(`예시: ${s.example.trim()}`);
  return parts.join("\n\n");
}

function noteToChapter(note: CoreNote): Chapter {
  const sections: Chapter["sections"] = [];

  // Lesson overview → intro section.
  if (note.overview) {
    sections.push({ title: "들어가며", subtitle: "", body: esc(note.overview.trim()), key_terms: [], boxes: [] });
  }
  // Key formulas → monospace-ish panel (rendered as body lines).
  if (note.formulas && note.formulas.length) {
    sections.push({
      title: "핵심 공식", subtitle: "",
      body: esc(note.formulas.join("\n")), key_terms: [], boxes: [],
    });
  }
  for (const s of note.sections || []) {
    sections.push({
      title: esc(s.title || ""),
      subtitle: esc(s.subtitle || ""),
      body: esc(sectionToBody(s)),
      key_terms: (s.terms || []).map((t) => [esc(t.term), esc(t.def)] as [string, string]),
      boxes: (s.traps || []).map((tr) => ["ap_alert", esc(tr)] as [string, string]),
    });
  }

  return {
    unit_name: esc((note.unitName || `Unit ${note.unit ?? ""}`).trim()),
    chapter_title: esc(note.title.trim()),
    hook: esc((note.subtitle || note.overview || "").trim()),
    learning_objectives: (note.objectives || []).map(esc),
    sections,
  };
}

function buildSubject(courseId: string, notes: CoreNote[]): void {
  const sorted = [...notes].sort((a, b) => {
    const ua = a.unit ?? 999, ub = b.unit ?? 999;
    if (ua !== ub) return ua - ub;
    return (a.lessonNum ?? 999) - (b.lessonNum ?? 999);
  });

  const chapters = sorted.map(noteToChapter);

  // Distinct unit names in emission order → renderer's sequential unit numbers.
  // Use RAW note.unitName (not the escaped chapter field) so the DB/UI unit
  // titles stay clean.
  const unitTitles: { number: number; title: string }[] = [];
  let lastName: string | null = null;
  for (const note of sorted) {
    const name = (note.unitName || `Unit ${note.unit ?? ""}`).trim();
    if (name !== lastName) {
      lastName = name;
      unitTitles.push({ number: unitTitles.length + 1, title: name });
    }
  }

  const course = courseById.get(courseId);
  const title = course?.subject || notes[0]?.subjectLabel || courseId;
  const slug = `${courseId}-ultimate`;

  const manifest = {
    courseId,
    slug,
    title,
    subtitle: "The Ultimate Guide",
    courseSlug: courseId,
    author: "Youngseo Kwak",
    emoji: course?.icon || notes[0]?.emoji || "📘",
    totalChapters: chapters.length,
    totalUnits: unitTitles.length,
    units: unitTitles,
  };

  const outDir = join(BUILD_ROOT, courseId);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "chapters_data.json"), JSON.stringify(chapters, null, 2), "utf8");
  writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`✓ ${courseId.padEnd(28)} ${chapters.length} chapters · ${unitTitles.length} units → build/${courseId}/`);
}

function main(): void {
  const arg = process.argv[2];
  const byCourse = new Map<string, CoreNote[]>();
  for (const note of CORE_NOTES_KO.values()) {
    const cid = note.courseId;
    if (!cid) continue;
    if (!byCourse.has(cid)) byCourse.set(cid, []);
    byCourse.get(cid)!.push(note);
  }

  const targets = arg && arg !== "all"
    ? [arg]
    : [...byCourse.keys()].filter((c) => !ALREADY_PUBLISHED.has(c)).sort();

  if (!arg) {
    console.log("Usage: npx tsx scripts/textbook/corenotes-to-book.ts <courseId|all>\n");
    console.log("Available subjects in Core Notes Ko (▶ = not yet published):");
    for (const c of [...byCourse.keys()].sort()) {
      console.log(`  ${ALREADY_PUBLISHED.has(c) ? "  " : "▶ "}${c}  (${byCourse.get(c)!.length} notes)`);
    }
    return;
  }

  for (const cid of targets) {
    const notes = byCourse.get(cid);
    if (!notes || !notes.length) { console.warn(`! no Core Notes for ${cid}`); continue; }
    buildSubject(cid, notes);
  }
}

main();
