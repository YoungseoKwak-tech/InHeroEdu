/**
 * scripts/upload-ap-physics-2-textbook.ts
 *
 * One-shot migration: take the 55 chapter PDFs in
 * /AP_Physics_2_PDFs_55 and stand up the AP Physics 2 textbook the
 * same way ap-physics-ultimate and ap-calc-ab-ultimate were set up.
 *
 *   npx tsx scripts/upload-ap-physics-2-textbook.ts
 *   npx tsx scripts/upload-ap-physics-2-textbook.ts --dry-run
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

(function loadEnv() {
  const text = readFileSync(".env.local", "utf8");
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const k = line.slice(0, eq);
    const v = line.slice(eq + 1).replace(/^"|"$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
})();

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SB_URL, SB_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const SLUG = "ap-physics-2-ultimate";
const COURSE_SLUG = "ap-physics-2";
const TITLE = "AP Physics 2";
const SUBTITLE = "The Ultimate Guide";
const AUTHOR = "InHero Originals";
const PDF_DIR = "AP_Physics_2_PDFs_55";
const STORAGE_BUCKET = "textbooks";
const TOTAL_UNITS = 7;
const TOTAL_CHAPTERS = 55;
const DRY_RUN = process.argv.includes("--dry-run");

// AP Physics 2 unit titles (College Board CED — Algebra-based,
// 7-unit structure: fluids through modern physics).
const UNIT_TITLES: Record<number, string> = {
  1: "Fluids",
  2: "Thermodynamics",
  3: "Electric Force, Field, and Potential",
  4: "Electric Circuits",
  5: "Magnetism and Electromagnetic Induction",
  6: "Geometric and Physical Optics",
  7: "Quantum, Atomic, and Nuclear Physics",
};

function parseFilename(name: string): { unit: number; chapter: number; title: string } | null {
  const m = name.match(/^UNIT(\d{2})_(\d{2})_(.+)\.pdf$/i);
  if (!m) return null;
  const titleRaw = m[3]
    .replace(/__/g, ", ")
    .replace(/_/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/\s+/g, " ")
    .trim();
  return {
    unit: parseInt(m[1], 10),
    chapter: parseInt(m[2], 10),
    title: titleRaw,
  };
}

async function ensureTextbook(): Promise<string> {
  console.log(`[textbook] upserting ${SLUG}…`);
  const { data: existing } = await supabase.from("textbooks").select("id").eq("slug", SLUG).maybeSingle();
  if (existing?.id) {
    console.log(`  found existing textbook id=${existing.id}`);
    return existing.id;
  }
  if (DRY_RUN) { console.log("  (dry-run — would insert)"); return "DRY_RUN_TEXTBOOK_ID"; }
  const { data, error } = await supabase
    .from("textbooks")
    .insert({
      slug: SLUG,
      title: TITLE,
      subtitle: SUBTITLE,
      course_slug: COURSE_SLUG,
      author_name: AUTHOR,
      total_chapters: TOTAL_CHAPTERS,
      total_units: TOTAL_UNITS,
      is_premium: false,
      is_published: true,
      processing_status: "completed",
    })
    .select("id")
    .single();
  if (error) throw new Error(`textbook insert: ${error.message}`);
  console.log(`  created textbook id=${data.id}`);
  return data.id;
}

async function ensureUnits(textbookId: string): Promise<Map<number, string>> {
  console.log(`[units] upserting ${TOTAL_UNITS} unit rows…`);
  const { data: existing } = await supabase
    .from("textbook_units")
    .select("id, unit_number")
    .eq("textbook_id", textbookId);
  const have = new Map<number, string>();
  for (const u of existing ?? []) have.set(u.unit_number as number, u.id as string);

  for (let n = 1; n <= TOTAL_UNITS; n++) {
    if (have.has(n)) { console.log(`  unit ${n}: exists`); continue; }
    if (DRY_RUN) { console.log(`  unit ${n}: (dry-run would create) ${UNIT_TITLES[n]}`); continue; }
    const { data, error } = await supabase
      .from("textbook_units")
      .insert({
        textbook_id: textbookId,
        unit_number: n,
        title: UNIT_TITLES[n],
        ordinal: n,
      })
      .select("id")
      .single();
    if (error) throw new Error(`unit ${n} insert: ${error.message}`);
    have.set(n, data.id);
    console.log(`  unit ${n}: created ${UNIT_TITLES[n]}`);
  }
  return have;
}

async function uploadPdf(localPath: string, storagePath: string): Promise<string> {
  const bytes = readFileSync(localPath);
  if (DRY_RUN) { console.log(`  (dry-run upload ${storagePath} — ${bytes.length} bytes)`); return "DRY_RUN_URL"; }
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, bytes, {
      contentType: "application/pdf",
      upsert: true,
    });
  if (error) throw new Error(`upload ${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function upsertChapter(args: {
  textbookId: string;
  unitId: string;
  unitNumber: number;
  chapterIndex: number;
  chapterNumber: string;
  title: string;
  pdfUrl: string;
  ordinal: number;
}) {
  const existing = await supabase
    .from("textbook_chapters")
    .select("id")
    .eq("textbook_id", args.textbookId)
    .eq("chapter_number", args.chapterNumber)
    .maybeSingle();

  const row = {
    textbook_id: args.textbookId,
    unit_id: args.unitId,
    chapter_number: args.chapterNumber,
    unit_number: args.unitNumber,
    chapter_index: args.chapterIndex,
    title: args.title,
    pdf_url: args.pdfUrl,
    page_count: 15,
    estimated_read_time: 23,
    ordinal: args.ordinal,
  };

  if (DRY_RUN) { console.log(`  (dry-run chapter ${args.chapterNumber}: ${args.title})`); return; }

  if (existing.data?.id) {
    const { error } = await supabase
      .from("textbook_chapters")
      .update(row)
      .eq("id", existing.data.id);
    if (error) throw new Error(`chapter ${args.chapterNumber} update: ${error.message}`);
  } else {
    const { error } = await supabase.from("textbook_chapters").insert(row);
    if (error) throw new Error(`chapter ${args.chapterNumber} insert: ${error.message}`);
  }
}

async function main() {
  const textbookId = await ensureTextbook();
  const unitIds = await ensureUnits(textbookId);

  const files = readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf")).sort();
  console.log(`[chapters] processing ${files.length} PDFs…`);

  let ordinal = 0;
  let processed = 0;
  let skipped = 0;
  for (const file of files) {
    ordinal++;
    const parsed = parseFilename(file);
    if (!parsed) {
      console.warn(`  SKIP ${file} (filename pattern mismatch)`);
      skipped++;
      continue;
    }
    const { unit, chapter, title } = parsed;
    const chapterNumber = `${String(unit).padStart(2, "0")}.${String(chapter).padStart(2, "0")}`;
    const storagePath = `splits/${SLUG}/${chapterNumber}.pdf`;
    const localPath = join(PDF_DIR, file);
    const unitId = unitIds.get(unit);
    if (!unitId) {
      console.warn(`  SKIP ${file} (no unit ${unit})`);
      skipped++;
      continue;
    }

    console.log(`  [${ordinal}/${files.length}] ${chapterNumber} — ${title}`);
    const pdfUrl = await uploadPdf(localPath, storagePath);
    await upsertChapter({
      textbookId,
      unitId,
      unitNumber: unit,
      chapterIndex: chapter,
      chapterNumber,
      title,
      pdfUrl,
      ordinal,
    });
    processed++;
  }

  console.log(`\n[done] processed=${processed} skipped=${skipped} dry-run=${DRY_RUN}`);
  if (!DRY_RUN) {
    console.log(`\nVerify in browser: https://inheroedu.com/textbooks/${SLUG}/01.01/read`);
  }
}

main().catch((err) => { console.error("[fatal]", err); process.exit(1); });
