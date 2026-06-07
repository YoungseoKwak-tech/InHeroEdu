/**
 * Core Notes — Khan-Academy-style condensed study cards derived from the same
 * lesson_scripts the courses run on. Every 8-minute script is already authored
 * in sections (concept body + key_terms + ap_alert "trap" boxes) plus
 * learning_objectives, so we extract the exam-relevant essentials
 * deterministically (no API): one screen, one concept.
 *
 *   chapter subtitle           → one-liner (why it matters)
 *   learning_objectives        → "Remember" key points
 *   sections[].key_terms       → concept term → definition cards
 *   sections[].boxes ap_alert  → red TRAP boxes (the exam pitfalls)
 */
import { createAdminClient } from "@/lib/supabase";
import { inferCourseIdFromLessonId } from "@/lib/learning-tracking";
import { courses } from "@/lib/data/courses";
import coreNotesSeed from "@/lib/data/coreNotesSeed.json";
import { CORE_NOTES_AUTHORED } from "@/lib/data/coreNotesAuthored";

export interface NoteTerm {
  term: string;
  def: string;
}
export interface NoteTable {
  headers: string[];
  rows: string[][];
}
export interface NoteSection {
  title: string;
  subtitle?: string | null;
  /** Narrative explanation (Khan-style prose), rendered as paragraphs. */
  body?: string | null;
  /** A one-line highlighted takeaway (mint callout). */
  keyIdea?: string | null;
  /** A comparison table rendered with a colored header. */
  table?: NoteTable | null;
  terms: NoteTerm[];
  traps: string[];
  example?: string | null;
}
export interface CoreNote {
  lessonId: string;
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  unit: number | null;
  lessonNum: number | null;
  unitName?: string | null;
  title: string;
  subtitle?: string | null;
  /** Narrative intro to the whole lesson (Khan-style), rendered before REMEMBER. */
  overview?: string | null;
  objectives: string[];
  /** Key formulas rendered as a monospace panel (quant subjects). */
  formulas?: string[];
  /** Key of a built-in SVG diagram to render (e.g. "supply-demand"). */
  diagram?: string | null;
  sections: NoteSection[];
}
export interface NoteSubjectCount {
  courseId: string | null;
  label: string;
  emoji: string;
  count: number;
}

const courseMeta = new Map(courses.map((c) => [c.id, { label: c.subjectEn, emoji: c.icon }]));
function metaFor(courseId: string | null): { label: string; emoji: string } {
  if (courseId && courseMeta.has(courseId)) return courseMeta.get(courseId)!;
  return { label: courseId ?? "General", emoji: "📘" };
}
// The lesson_id (e.g. "ap-biology-u7-l2") is the authoritative source of unit
// and order — chapter_json.unit_number is wrong on many rows.
function unitFromLessonId(lessonId: string | null): number | null {
  if (!lessonId) return null;
  const m = lessonId.match(/-u(\d+)-l\d+/i);
  return m ? parseInt(m[1], 10) : null;
}
function lessonNumFromLessonId(lessonId: string | null): number | null {
  if (!lessonId) return null;
  const m = lessonId.match(/-u\d+-l(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}

interface ScriptRow {
  lesson_id: string;
  chapter_json: Record<string, unknown> | null;
}

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/** boxes are [type, text] tuples; pull the exam-pitfall (ap_alert / trap / warning) ones. */
function trapsFromBoxes(boxes: unknown): string[] {
  if (!Array.isArray(boxes)) return [];
  const out: string[] = [];
  for (const b of boxes) {
    if (!Array.isArray(b) || b.length < 2) continue;
    const type = str(b[0]).toLowerCase();
    const text = str(b[1]);
    if (!text) continue;
    if (/alert|trap|warn|pitfall|caution|common.?(error|mistake)/.test(type)) out.push(text);
  }
  return out;
}

function termsFromKeyTerms(kt: unknown): NoteTerm[] {
  if (!Array.isArray(kt)) return [];
  const out: NoteTerm[] = [];
  for (const pair of kt) {
    if (Array.isArray(pair) && pair.length >= 2) {
      const term = str(pair[0]);
      const def = str(pair[1]);
      if (term && def) out.push({ term, def });
    } else if (pair && typeof pair === "object") {
      const o = pair as Record<string, unknown>;
      const term = str(o.term ?? o.name);
      const def = str(o.def ?? o.definition);
      if (term && def) out.push({ term, def });
    }
  }
  return out;
}

// Worked examples live in the section prose, introduced by cue phrases.
// Pull the first paragraph that reads like an example (so notes get a concrete
// "here's how it works", not just definitions).
function exampleFromBody(body: unknown): string | null {
  const text = str(body);
  if (!text) return null;
  const cue = /\b(for example|for instance|consider|suppose|imagine|let'?s|let us|worked example|to illustrate|calculate|say that|picture)\b/i;
  const paras = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  for (const p of paras) {
    if (cue.test(p) && p.length > 60) {
      return p.length > 720 ? p.slice(0, 720).replace(/\s+\S*$/, "") + "…" : p;
    }
  }
  return null;
}

function noteFromScript(row: ScriptRow): CoreNote | null {
  const cj = row.chapter_json;
  if (!cj || typeof cj !== "object") return null;
  const c = cj as Record<string, unknown>;

  const rawSections = Array.isArray(c.sections) ? (c.sections as Record<string, unknown>[]) : [];
  const sections: NoteSection[] = rawSections
    .map((s) => ({
      title: str(s.title),
      subtitle: str(s.subtitle) || null,
      terms: termsFromKeyTerms(s.key_terms),
      traps: trapsFromBoxes(s.boxes),
      example: exampleFromBody(s.body),
    }))
    .filter((s) => s.title && (s.terms.length > 0 || s.traps.length > 0 || s.example));

  const objectives = Array.isArray(c.learning_objectives)
    ? (c.learning_objectives as unknown[]).map(str).filter(Boolean)
    : [];

  const title = str(c.chapter_title) || sections[0]?.title || "";
  // A note is only worth showing if it has real distilled content.
  if (!title || (sections.length === 0 && objectives.length === 0)) return null;

  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);
  return {
    lessonId: row.lesson_id,
    courseId,
    subjectLabel: meta.label,
    emoji: meta.emoji,
    unit: unitFromLessonId(row.lesson_id) ?? (typeof c.unit_number === "number" ? c.unit_number : null),
    lessonNum: lessonNumFromLessonId(row.lesson_id),
    unitName: str(c.unit_name) || null,
    title,
    subtitle: str(c.subtitle) || null,
    objectives,
    sections,
  };
}

// PostgREST caps a select at 1000 rows; page through every script.
async function selectAllScripts(): Promise<ScriptRow[]> {
  const supabase = createAdminClient();
  const PAGE = 1000;
  const rows: ScriptRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("lesson_scripts")
      .select("lesson_id, chapter_json")
      .order("lesson_id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []) as ScriptRow[];
    rows.push(...batch);
    if (batch.length < PAGE) break;
  }
  return rows;
}

const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; data: CoreNote[] } | null = null;
let inFlight: Promise<CoreNote[]> | null = null;

// Authored Core Notes for subjects without lesson scripts (content subjects
// distilled from the term banks; quant subjects authored by hand). Same card
// shape, merged into the same pipeline.
interface SeedNote {
  courseId: string;
  unit: number;
  lessonNum?: number;
  unitName?: string;
  title: string;
  subtitle?: string;
  overview?: string;
  objectives?: string[];
  formulas?: string[];
  diagram?: string | null;
  sections?: { title: string; subtitle?: string | null; body?: string | null; keyIdea?: string | null; table?: NoteTable | null; terms?: NoteTerm[]; traps?: string[]; example?: string | null }[];
}
function seedToNote(s: SeedNote): CoreNote {
  const meta = metaFor(s.courseId);
  const lessonNum = s.lessonNum ?? 1;
  return {
    lessonId: `${s.courseId}-u${s.unit}-l${lessonNum}`,
    courseId: s.courseId,
    subjectLabel: meta.label,
    emoji: meta.emoji,
    unit: s.unit,
    lessonNum,
    unitName: s.unitName ?? null,
    title: s.title,
    subtitle: s.subtitle ?? null,
    overview: s.overview ?? null,
    objectives: s.objectives ?? [],
    formulas: s.formulas ?? [],
    diagram: s.diagram ?? null,
    sections: (s.sections ?? []).map((sec) => ({
      title: sec.title,
      subtitle: sec.subtitle ?? null,
      body: sec.body ?? null,
      keyIdea: sec.keyIdea ?? null,
      table: sec.table ?? null,
      terms: sec.terms ?? [],
      traps: sec.traps ?? [],
      example: sec.example ?? null,
    })),
  };
}

async function rebuild(): Promise<CoreNote[]> {
  const rows = await selectAllScripts();
  let notes = rows.map(noteFromScript).filter((n): n is CoreNote => n !== null);
  notes = notes.concat((coreNotesSeed as unknown as SeedNote[]).map(seedToNote));
  // Hand-authored rich notes override the auto-generated ones for the same lesson.
  const authored = (CORE_NOTES_AUTHORED as unknown as SeedNote[]).map(seedToNote);
  const authoredKeys = new Set(authored.map((n) => `${n.courseId}|${n.unit}|${n.lessonNum}`));
  notes = notes.filter((n) => !authoredKeys.has(`${n.courseId}|${n.unit}|${n.lessonNum}`)).concat(authored);

  // Some scripts carry the same title in two units (data error, e.g. "Carbon:
  // The Backbone of Life" in both u1 and u7). Keep the earliest unit/lesson.
  const ordVal = (n: CoreNote) => (n.unit ?? 99) * 1000 + (n.lessonNum ?? 99);
  const byKey = new Map<string, CoreNote>();
  for (const n of notes) {
    const key = `${n.courseId ?? "?"}::${n.title.toLowerCase()}`;
    const cur = byKey.get(key);
    if (!cur || ordVal(n) < ordVal(cur)) byKey.set(key, n);
  }
  notes = [...byKey.values()];

  // chapter_json.unit_name is wrong on the same rows whose unit_number is wrong,
  // so derive each (course, unit)'s name from the most common value in that group.
  const nameVotes = new Map<string, Map<string, number>>();
  for (const n of notes) {
    if (n.unit == null || !n.unitName) continue;
    const k = `${n.courseId}::${n.unit}`;
    if (!nameVotes.has(k)) nameVotes.set(k, new Map());
    const m = nameVotes.get(k)!;
    m.set(n.unitName, (m.get(n.unitName) ?? 0) + 1);
  }
  const bestName = new Map<string, string>();
  for (const [k, m] of nameVotes) {
    bestName.set(k, [...m.entries()].sort((a, b) => b[1] - a[1])[0][0]);
  }
  for (const n of notes) {
    if (n.unit != null) n.unitName = bestName.get(`${n.courseId}::${n.unit}`) ?? n.unitName ?? null;
  }

  notes.sort((a, b) => {
    if (a.subjectLabel !== b.subjectLabel) return a.subjectLabel.localeCompare(b.subjectLabel);
    if ((a.unit ?? 99) !== (b.unit ?? 99)) return (a.unit ?? 99) - (b.unit ?? 99);
    if ((a.lessonNum ?? 99) !== (b.lessonNum ?? 99)) return (a.lessonNum ?? 99) - (b.lessonNum ?? 99);
    return a.title.localeCompare(b.title);
  });
  return notes;
}

export async function getAllCoreNotes(): Promise<CoreNote[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  if (inFlight) return inFlight;
  inFlight = rebuild()
    .then((data) => {
      cache = { at: Date.now(), data };
      return data;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export function countBySubject(notes: CoreNote[]): NoteSubjectCount[] {
  const m = new Map<string, NoteSubjectCount>();
  for (const n of notes) {
    const key = n.courseId ?? "general";
    const cur = m.get(key);
    if (cur) cur.count += 1;
    else m.set(key, { courseId: n.courseId, label: n.subjectLabel, emoji: n.emoji, count: 1 });
  }
  return [...m.values()].sort((a, b) => b.count - a.count);
}

export async function getCoreNotes(subject?: string): Promise<CoreNote[]> {
  const all = await getAllCoreNotes();
  if (!subject) return all;
  return all.filter((n) => n.courseId === subject);
}

export async function getCoreNoteByLessonId(lessonId: string): Promise<CoreNote | null> {
  const all = await getAllCoreNotes();
  return all.find((n) => n.lessonId === lessonId) ?? null;
}
