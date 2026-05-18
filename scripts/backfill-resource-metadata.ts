#!/usr/bin/env tsx
/**
 * One-time backfill of course_slug + unit_number on lounge_resources.
 *
 * course_slug: identity-copied from lounges.slug. The lounge slug is
 *   already a clean course/category tag (ap-bio, ap-chem, sat, ...);
 *   no name-parsing lookup is needed.
 *
 * unit_number: keyword-matched against the AP Biology 2024-25 CED for
 *   resources in the ap-bio lounge only. Other lounges are left NULL
 *   until per-course keyword tables exist.
 *
 * Default mode: DRY RUN (no writes). Pass --apply to commit.
 *
 *   npx tsx scripts/backfill-resource-metadata.ts
 *   npx tsx scripts/backfill-resource-metadata.ts --apply
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from
 * .env.local (minimal parser, no dotenv dep).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadEnv() {
  let text: string;
  try {
    text = readFileSync(".env.local", "utf8");
  } catch {
    return;
  }
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq);
    const val = line.slice(eq + 1);
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const APPLY = process.argv.includes("--apply");
const MODE = APPLY ? "APPLY (writes will be committed)" : "DRY RUN (no writes)";

// ────────────────────────────────────────────────────────────
// AP Bio CED 2024-25 keyword → unit lookup.
//
// We sort by descending keyword length at match time so multi-word
// keywords (e.g. "cell membrane" → Unit 2) win over single-word
// substrings ("cell" alone is ambiguous).
// ────────────────────────────────────────────────────────────
interface KeywordEntry {
  keyword: string;
  unit: number;
}

const AP_BIO_KEYWORDS: KeywordEntry[] = [
  // Unit 1 — Chemistry of Life
  { keyword: "biological molecule", unit: 1 },
  { keyword: "macromolecule", unit: 1 },
  { keyword: "nucleic acid", unit: 1 },
  { keyword: "carbohydrate", unit: 1 },
  { keyword: "protein", unit: 1 },
  { keyword: "lipid", unit: 1 },
  { keyword: "water", unit: 1 },

  // Unit 2 — Cell Structure & Function
  { keyword: "cellular compartment", unit: 2 },
  { keyword: "plasma membrane", unit: 2 },
  { keyword: "cell membrane", unit: 2 },
  { keyword: "organelle", unit: 2 },
  { keyword: "diffusion", unit: 2 },
  { keyword: "osmosis", unit: 2 },
  { keyword: "transport", unit: 2 },

  // Unit 3 — Cellular Energetics
  { keyword: "photosynthesis", unit: 3 },
  { keyword: "respiration", unit: 3 },
  { keyword: "fermentation", unit: 3 },
  { keyword: "metabolism", unit: 3 },
  { keyword: "enzyme", unit: 3 },
  { keyword: "atp", unit: 3 },

  // Unit 4 — Cell Communication & Cell Cycle
  { keyword: "signaling pathway", unit: 4 },
  { keyword: "cell cycle regulation", unit: 4 },
  { keyword: "embryonic development", unit: 4 },
  { keyword: "stem cell", unit: 4 },
  { keyword: "cell cycle", unit: 4 },
  { keyword: "mitosis", unit: 4 },
  { keyword: "apoptosis", unit: 4 },

  // Unit 5 — Heredity
  { keyword: "inheritance pattern", unit: 5 },
  { keyword: "mendelian genetic", unit: 5 },
  { keyword: "genetic variation", unit: 5 },
  { keyword: "meiosis", unit: 5 },

  // Unit 6 — Gene Expression & Regulation
  { keyword: "dna replication", unit: 6 },
  { keyword: "gene regulation", unit: 6 },
  { keyword: "biotechnology", unit: 6 },
  { keyword: "transcription", unit: 6 },
  { keyword: "translation", unit: 6 },
  { keyword: "mutation", unit: 6 },

  // Unit 7 — Natural Selection
  { keyword: "hardy-weinberg", unit: 7 },
  { keyword: "natural selection", unit: 7 },
  { keyword: "phylogeny", unit: 7 },
  { keyword: "speciation", unit: 7 },
  { keyword: "evolution", unit: 7 },

  // Unit 8 — Ecology
  { keyword: "biodiversity", unit: 8 },
  { keyword: "ecosystem", unit: 8 },
  { keyword: "population", unit: 8 },
  { keyword: "community", unit: 8 },
  { keyword: "ecology", unit: 8 },
];

const SORTED_KEYWORDS = [...AP_BIO_KEYWORDS].sort(
  (a, b) => b.keyword.length - a.keyword.length
);

function classifyApBioUnit(
  title: string
): { unit: number; matchedKeyword: string } | null {
  const haystack = title.toLowerCase();
  for (const { keyword, unit } of SORTED_KEYWORDS) {
    if (haystack.includes(keyword)) return { unit, matchedKeyword: keyword };
  }
  return null;
}

interface ResourceRow {
  id: string;
  title: string;
  course_slug: string | null;
  unit_number: number | null;
  lounge_id: string;
}

interface LoungeRow {
  id: string;
  slug: string;
}

async function main() {
  console.log(`\nMode: ${MODE}`);

  // Load every approved, non-deleted resource (no filter on course_slug
  // so the report shows both the "needs backfill" and "already populated"
  // populations distinctly).
  const { data: resources, error: rErr } = await supabase
    .from("lounge_resources")
    .select("id, title, course_slug, unit_number, lounge_id")
    .eq("review_status", "approved")
    .is("deleted_at", null);
  if (rErr || !resources) {
    console.error("Failed to load resources:", rErr);
    process.exit(1);
  }

  const { data: lounges, error: lErr } = await supabase
    .from("lounges")
    .select("id, slug");
  if (lErr || !lounges) {
    console.error("Failed to load lounges:", lErr);
    process.exit(1);
  }
  const loungeBySlug = new Map<string, string>(
    (lounges as LoungeRow[]).map((l) => [l.id, l.slug])
  );

  const plan: Array<{
    id: string;
    title: string;
    fromCourseSlug: string | null;
    toCourseSlug: string | null;
    fromUnit: number | null;
    toUnit: number | null;
    matchedKeyword?: string;
  }> = [];

  let courseSlugUpdates = 0;
  let unitUpdates = 0;

  for (const r of resources as ResourceRow[]) {
    const targetSlug = loungeBySlug.get(r.lounge_id) ?? null;
    if (!targetSlug) continue; // orphan resource — skip rather than NULL-stomp

    // course_slug: only write if missing
    const newCourseSlug = r.course_slug ?? targetSlug;
    const changedCourse = r.course_slug === null && newCourseSlug !== null;

    // unit_number: only AP Bio gets a guess, and only if missing
    let newUnit: number | null = r.unit_number;
    let matchedKeyword: string | undefined;
    if (newCourseSlug === "ap-bio" && r.unit_number === null) {
      const m = classifyApBioUnit(r.title);
      if (m) {
        newUnit = m.unit;
        matchedKeyword = m.matchedKeyword;
      }
    }
    const changedUnit = r.unit_number === null && newUnit !== null;

    if (changedCourse) courseSlugUpdates++;
    if (changedUnit) unitUpdates++;

    if (changedCourse || changedUnit) {
      plan.push({
        id: r.id,
        title: r.title,
        fromCourseSlug: r.course_slug,
        toCourseSlug: newCourseSlug,
        fromUnit: r.unit_number,
        toUnit: newUnit,
        matchedKeyword,
      });
    }
  }

  console.log("\n=== Plan summary ===");
  console.log(`Total approved resources scanned : ${resources.length}`);
  console.log(`Will update course_slug          : ${courseSlugUpdates}`);
  console.log(`Will update unit_number          : ${unitUpdates}`);
  console.log(`Total rows touched               : ${plan.length}`);

  // Distribution: per-target-course-slug count
  const perSlug: Record<string, number> = {};
  for (const p of plan) {
    const k = p.toCourseSlug ?? "(null)";
    perSlug[k] = (perSlug[k] ?? 0) + 1;
  }
  console.log("\nPer-target course_slug:");
  for (const [slug, n] of Object.entries(perSlug).sort()) {
    console.log(`  ${slug.padEnd(28)} ${n}`);
  }

  // Distribution: per-target-unit (AP Bio)
  const perUnit: Record<string, number> = {};
  for (const p of plan) {
    if (p.toUnit !== null && p.toCourseSlug === "ap-bio") {
      const k = `unit ${p.toUnit}`;
      perUnit[k] = (perUnit[k] ?? 0) + 1;
    }
  }
  const apBioPlanCount = plan.filter((p) => p.toCourseSlug === "ap-bio").length;
  const apBioUnitMatched = Object.values(perUnit).reduce((a, b) => a + b, 0);
  console.log(`\nAP Bio classification: ${apBioUnitMatched}/${apBioPlanCount} matched a unit`);
  for (const [k, n] of Object.entries(perUnit).sort()) {
    console.log(`  ${k.padEnd(28)} ${n}`);
  }

  // Sample 5 rows showing the before→after.
  console.log("\n=== Sample (up to 5) ===");
  for (const p of plan.slice(0, 5)) {
    const courseDelta = `${p.fromCourseSlug ?? "(null)"} → ${p.toCourseSlug ?? "(null)"}`;
    const unitDelta = `${p.fromUnit ?? "(null)"} → ${p.toUnit ?? "(null)"}`;
    const kw = p.matchedKeyword ? `[match: "${p.matchedKeyword}"]` : "";
    console.log(`  ${p.id.slice(0, 8)}  "${p.title.slice(0, 42)}"`);
    console.log(`      course_slug: ${courseDelta}`);
    console.log(`      unit_number: ${unitDelta} ${kw}`);
  }

  if (!APPLY) {
    console.log("\n(DRY RUN — no writes performed. Pass --apply to commit.)\n");
    return;
  }

  console.log("\n=== Applying updates ===");
  let ok = 0;
  let fail = 0;
  for (const p of plan) {
    const updates: Record<string, unknown> = {};
    if (p.toCourseSlug !== p.fromCourseSlug) updates.course_slug = p.toCourseSlug;
    if (p.toUnit !== p.fromUnit) updates.unit_number = p.toUnit;
    if (Object.keys(updates).length === 0) continue;

    const { error } = await supabase
      .from("lounge_resources")
      .update(updates)
      .eq("id", p.id);
    if (error) {
      console.error(`  FAIL ${p.id.slice(0, 8)} — ${error.message}`);
      fail++;
    } else {
      ok++;
    }
  }
  console.log(`\nWrites: ${ok} OK, ${fail} failed`);
  if (fail > 0) process.exit(1);
}

void main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
