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

export interface NoteTerm {
  term: string;
  def: string;
}
export interface NoteSection {
  title: string;
  subtitle?: string | null;
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
  unitName?: string | null;
  title: string;
  subtitle?: string | null;
  objectives: string[];
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
function unitFromLessonId(lessonId: string | null): number | null {
  if (!lessonId) return null;
  const m = lessonId.match(/-u(\d+)-l\d+/i);
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
    unit: typeof c.unit_number === "number" ? c.unit_number : unitFromLessonId(row.lesson_id),
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

async function rebuild(): Promise<CoreNote[]> {
  const rows = await selectAllScripts();
  const notes = rows.map(noteFromScript).filter((n): n is CoreNote => n !== null);
  notes.sort((a, b) => {
    if (a.subjectLabel !== b.subjectLabel) return a.subjectLabel.localeCompare(b.subjectLabel);
    if ((a.unit ?? 99) !== (b.unit ?? 99)) return (a.unit ?? 99) - (b.unit ?? 99);
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
