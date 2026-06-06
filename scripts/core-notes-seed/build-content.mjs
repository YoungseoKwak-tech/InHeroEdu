// Build Core Notes seed for the 6 content subjects from the authored term banks
// (the "In AP terms, X is best defined as:" questions). Groups term→def by unit,
// pulls traps from contrast-y explanations, and writes lib/data/coreNotesSeed.json
// (merged by lib/coreNotes at build time). Authored by Claude, no API.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const seedDir = join(here, "..", "question-bank-seed");
const outDir = join(here, "..", "..", "lib", "data");

const SUBJECTS = {
  "ap-psychology": ["Unit 1 — Biological Bases", "Unit 2 — Cognition", "Unit 3 — Development & Learning", "Unit 4 — Social Psychology & Personality", "Unit 5 — Mental & Physical Health"],
  "ap-world-history": [], "ap-environmental-science": [], "ap-us-government": [],
  "ap-english-language": [], "ap-human-geography": [],
};

const DEF_RE = /^In AP terms, (.+?) is best defined as:$/;
const TRAP_RE = /\b(not |unlike|whereas|however,|the opposite|don't confuse|do not confuse|common (?:mistake|error)|be careful|remember that|in contrast|rather than)\b/i;

function optText(q) {
  const L = (q.correct_answer || "").trim().toLowerCase();
  return q["option_" + L];
}

const files = readdirSync(seedDir).filter((f) => f.endsWith(".json"));
const bySubject = {};
for (const f of files) {
  let d;
  try { d = JSON.parse(readFileSync(join(seedDir, f), "utf8")); } catch { continue; }
  if (!SUBJECTS[d.subject]) continue;
  (bySubject[d.subject] ||= []).push(...d.questions);
}

const seed = [];
for (const [subject, qs] of Object.entries(bySubject)) {
  // term -> def per unit (dedupe by term, prefer first)
  const unitTerms = new Map(); // unit -> Map(term->def)
  const unitTopic = new Map(); // unit -> Map(topic->count)
  const unitTraps = new Map(); // unit -> Set(trap)
  for (const q of qs) {
    const u = q.unit;
    if (u == null) continue;
    const m = (q.question_text || "").match(DEF_RE);
    if (m) {
      const term = m[1].trim();
      const def = (optText(q) || "").trim();
      if (term && def) {
        if (!unitTerms.has(u)) unitTerms.set(u, new Map());
        if (!unitTerms.get(u).has(term)) unitTerms.get(u).set(term, def);
        if (q.topic) {
          if (!unitTopic.has(u)) unitTopic.set(u, new Map());
          const tm = unitTopic.get(u);
          tm.set(q.topic, (tm.get(q.topic) || 0) + 1);
        }
      }
    }
    // traps from contrast-y explanations
    const ex = (q.explanation || "").trim();
    if (ex && TRAP_RE.test(ex) && ex.length <= 240) {
      if (!unitTraps.has(u)) unitTraps.set(u, new Set());
      if (unitTraps.get(u).size < 8) unitTraps.get(u).add(ex);
    }
  }

  for (const [unit, terms] of [...unitTerms.entries()].sort((a, b) => a[0] - b[0])) {
    const termArr = [...terms.entries()].map(([term, def]) => ({ term, def }));
    if (termArr.length < 3) continue;
    // unit name = most common topic
    const topics = unitTopic.get(unit);
    const unitName = topics ? [...topics.entries()].sort((a, b) => b[1] - a[1])[0][0] : `Unit ${unit}`;
    // split terms into sections of ~8
    const sections = [];
    for (let i = 0; i < termArr.length; i += 8) {
      const chunk = termArr.slice(i, i + 8);
      sections.push({
        title: sections.length === 0 ? "Key concepts" : `Key concepts (cont. ${sections.length + 1})`,
        terms: chunk,
        traps: [],
        example: null,
      });
    }
    // attach traps (max 2) to the first section
    const traps = [...(unitTraps.get(unit) || [])].slice(0, 2);
    if (traps.length && sections[0]) sections[0].traps = traps;
    // objectives: 3 concise, referencing the unit + a couple anchor terms
    const anchors = termArr.slice(0, 3).map((t) => t.term);
    const objectives = [
      `Master the core vocabulary of ${unitName}, including ${anchors.join(", ")}.`,
      `Distinguish closely related concepts and avoid the common AP traps in this unit.`,
      `Apply these terms to AP-style multiple-choice and free-response prompts.`,
    ];
    seed.push({
      courseId: subject,
      unit,
      lessonNum: 1,
      unitName,
      title: unitName,
      subtitle: `The essential terms and traps for ${unitName} — distilled for the exam room.`,
      objectives,
      sections,
    });
  }
}

mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "coreNotesSeed.json");
// merge with any existing seed for OTHER subjects (quant authored separately)
let existing = [];
try { existing = JSON.parse(readFileSync(outFile, "utf8")); } catch {}
const kept = existing.filter((n) => !SUBJECTS[n.courseId]);
const merged = [...kept, ...seed];
writeFileSync(outFile, JSON.stringify(merged, null, 1));
const counts = {};
for (const n of seed) counts[n.courseId] = (counts[n.courseId] || 0) + 1;
console.log("content seed notes:", JSON.stringify(counts, null, 0), "| total in file:", merged.length);
