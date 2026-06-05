/**
 * scripts/upload-ap-chem-textbook.ts
 *
 * One-shot migration: take the 72 chapter PDFs in
 * /AP_Chemistry_PDFs_72 and stand up the AP Chemistry textbook the
 * same way ap-bio-ultimate was set up.
 *
 * Steps (idempotent — re-running skips already-uploaded rows/files):
 *   1. Upsert the `textbooks` row (slug = "ap-chem-ultimate").
 *   2. Upsert 9 rows in `textbook_units` using the College Board
 *      AP Chem CED unit titles.
 *   3. For each PDF UNIT{NN}_{MM}_{slug}.pdf:
 *        - upload to storage as splits/ap-chem-ultimate/{NN}.{MM}.pdf
 *        - upsert a row in `textbook_chapters` pointing to its
 *          public URL.
 *
 * After this script: /textbooks/ap-chem-ultimate/01.01/read renders
 * the first chapter exactly like the AP Bio textbook does.
 *
 *   npx tsx scripts/upload-ap-chem-textbook.ts
 *   npx tsx scripts/upload-ap-chem-textbook.ts --dry-run
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

const SLUG = "ap-chem-ultimate";
const COURSE_SLUG = "ap-chem";
const TITLE = "AP Chemistry";
const SUBTITLE = "The Ultimate Guide";
const AUTHOR = "Youngseo Kwak";
const PDF_DIR = "AP_Chemistry_PDFs_72";
const STORAGE_BUCKET = "textbooks";
const DRY_RUN = process.argv.includes("--dry-run");

// AP Chem CED unit titles (College Board, 2024-25 CED).
const UNIT_TITLES: Record<number, string> = {
  1: "Atomic Structure and Properties",
  2: "Compound Structure and Properties",
  3: "Properties of Substances and Mixtures",
  4: "Chemical Reactions",
  5: "Kinetics",
  6: "Thermodynamics",
  7: "Equilibrium",
  8: "Acids and Bases",
  9: "Applications of Thermodynamics",
};

/** Convert "UNIT01_05_Moles__Molar_Mass__and_Stoichiometry_Foundations.pdf"
 *  to { unit: 1, chapter: 5, title: "Moles, Molar Mass, and Stoichiometry Foundations" }. */
function parseFilename(name: string): { unit: number; chapter: number; title: string } | null {
  const m = name.match(/^UNIT(\d{2})_(\d{2})_(.+)\.pdf$/i);
  if (!m) return null;
  const titleRaw = m[3]
    .replace(/__/g, ", ")            // double underscore → ", "
    .replace(/_/g, " ")              // single underscore → space
    .replace(/\s+,/g, ",")           // ", , Foo" cleanup
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
      total_chapters: 72,
      total_units: 9,
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
  console.log(`[units] upserting 9 unit rows…`);
  const { data: existing } = await supabase
    .from("textbook_units")
    .select("id, unit_number")
    .eq("textbook_id", textbookId);
  const have = new Map<number, string>();
  for (const u of existing ?? []) have.set(u.unit_number as number, u.id as string);

  for (let n = 1; n <= 9; n++) {
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
    page_count: 15,                  // average — refine later with pdfjs if needed
    estimated_read_time: 23,         // 15 pages × ~1.5 min
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
      console.warn(`  SKIP ${file} (filename doesn't match expected pattern)`);
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
