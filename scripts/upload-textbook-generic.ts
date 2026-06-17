/**
 * Generic InHero textbook uploader.
 *
 * Reads scripts/textbook/build/<courseId>/{manifest.json, chapters_data.json,
 * pdfs/} (produced by corenotes-to-book.ts + inhero_textbook.py) and stands up
 * the textbook in Supabase the same way upload-ap-chem-textbook.ts does:
 *   1. upsert `textbooks` row (slug from manifest)
 *   2. upsert `textbook_units` rows (from manifest.units)
 *   3. for each chapter (ordered like the renderer): upload its PDF to
 *      storage `splits/<slug>/<NN>.<MM>.pdf` and upsert a `textbook_chapters`
 *      row pointing at the public URL.
 *
 * Chapter unit/lesson numbers are derived exactly like the Python renderer
 * (sequential, incrementing whenever unit_name changes), so the U{NN}_{MM}
 * PDF filenames line up. Titles come from chapters_data.json (Korean intact).
 *
 *   npx tsx scripts/upload-textbook-generic.ts <courseId>
 *   npx tsx scripts/upload-textbook-generic.ts <courseId> --dry-run
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

const COURSE_ID = process.argv[2];
const DRY_RUN = process.argv.includes("--dry-run");
if (!COURSE_ID || COURSE_ID.startsWith("--")) {
  console.error("Usage: npx tsx scripts/upload-textbook-generic.ts <courseId> [--dry-run]");
  process.exit(1);
}

const BUILD_DIR = join(process.cwd(), "scripts", "textbook", "build", COURSE_ID);
const PDF_DIR = join(BUILD_DIR, "pdfs");
const STORAGE_BUCKET = "textbooks";

type Manifest = {
  slug: string; title: string; subtitle: string; courseSlug: string;
  author: string; totalChapters: number; totalUnits: number;
  units: { number: number; title: string }[];
};
type Chapter = { unit_name: string; chapter_title: string };

const manifest: Manifest = JSON.parse(readFileSync(join(BUILD_DIR, "manifest.json"), "utf8"));
const chapters: Chapter[] = JSON.parse(readFileSync(join(BUILD_DIR, "chapters_data.json"), "utf8"));

// chapters_data.json titles are XML-escaped for the PDF renderer; undo that
// for the DB/UI which renders titles as plain React text.
function unesc(s: string): string {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SB_URL, SB_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

/** Replicate inhero_textbook.py enumerate_chapters: unit++ when unit_name changes. */
function enumerate(): { unitNumber: number; lessonNumber: number; code: string; chapterNumber: string; title: string }[] {
  const out = [];
  let lastName: string | null = null;
  let unitNumber = 0;
  let lessonNumber = 0;
  for (const ch of chapters) {
    const name = (ch.unit_name || "GENERAL").trim() || "GENERAL";
    if (name !== lastName) { lastName = name; unitNumber++; lessonNumber = 1; }
    else lessonNumber++;
    const nn = String(unitNumber).padStart(2, "0");
    const mm = String(lessonNumber).padStart(2, "0");
    out.push({ unitNumber, lessonNumber, code: `U${nn}_${mm}`, chapterNumber: `${nn}.${mm}`, title: unesc(ch.chapter_title) });
  }
  return out;
}

async function ensureTextbook(): Promise<string> {
  console.log(`[textbook] upserting ${manifest.slug}…`);
  const { data: existing } = await supabase.from("textbooks").select("id").eq("slug", manifest.slug).maybeSingle();
  if (existing?.id) { console.log(`  found existing id=${existing.id}`); return existing.id; }
  if (DRY_RUN) { console.log("  (dry-run — would insert)"); return "DRY_RUN_TEXTBOOK_ID"; }
  const { data, error } = await supabase.from("textbooks").insert({
    slug: manifest.slug,
    title: manifest.title,
    subtitle: manifest.subtitle,
    course_slug: manifest.courseSlug,
    author_name: manifest.author,
    total_chapters: manifest.totalChapters,
    total_units: manifest.totalUnits,
    is_premium: false,
    is_published: true,
    processing_status: "completed",
  }).select("id").single();
  if (error) throw new Error(`textbook insert: ${error.message}`);
  console.log(`  created id=${data.id}`);
  return data.id;
}

async function ensureUnits(textbookId: string): Promise<Map<number, string>> {
  console.log(`[units] upserting ${manifest.units.length} unit rows…`);
  const { data: existing } = await supabase
    .from("textbook_units").select("id, unit_number").eq("textbook_id", textbookId);
  const have = new Map<number, string>();
  for (const u of existing ?? []) have.set(u.unit_number as number, u.id as string);

  for (const u of manifest.units) {
    if (have.has(u.number)) continue;
    if (DRY_RUN) { console.log(`  unit ${u.number}: (dry-run) ${u.title}`); continue; }
    const { data, error } = await supabase.from("textbook_units").insert({
      textbook_id: textbookId, unit_number: u.number, title: u.title, ordinal: u.number,
    }).select("id").single();
    if (error) throw new Error(`unit ${u.number} insert: ${error.message}`);
    have.set(u.number, data.id);
  }
  return have;
}

async function uploadPdf(localPath: string, storagePath: string): Promise<string> {
  const bytes = readFileSync(localPath);
  if (DRY_RUN) return "DRY_RUN_URL";
  const { error } = await supabase.storage.from(STORAGE_BUCKET)
    .upload(storagePath, bytes, { contentType: "application/pdf", upsert: true });
  if (error) throw new Error(`upload ${storagePath}: ${error.message}`);
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

async function upsertChapter(args: {
  textbookId: string; unitId: string; unitNumber: number; chapterIndex: number;
  chapterNumber: string; title: string; pdfUrl: string; ordinal: number;
}) {
  const row = {
    textbook_id: args.textbookId, unit_id: args.unitId, chapter_number: args.chapterNumber,
    unit_number: args.unitNumber, chapter_index: args.chapterIndex, title: args.title,
    pdf_url: args.pdfUrl, page_count: 6, estimated_read_time: 9, ordinal: args.ordinal,
  };
  if (DRY_RUN) { console.log(`  (dry-run chapter ${args.chapterNumber}: ${args.title})`); return; }
  const { data: existing } = await supabase.from("textbook_chapters").select("id")
    .eq("textbook_id", args.textbookId).eq("chapter_number", args.chapterNumber).maybeSingle();
  if (existing?.id) {
    const { error } = await supabase.from("textbook_chapters").update(row).eq("id", existing.id);
    if (error) throw new Error(`chapter ${args.chapterNumber} update: ${error.message}`);
  } else {
    const { error } = await supabase.from("textbook_chapters").insert(row);
    if (error) throw new Error(`chapter ${args.chapterNumber} insert: ${error.message}`);
  }
}

async function main() {
  console.log(`\n=== ${manifest.title} (${manifest.slug}) — ${chapters.length} chapters ===`);
  const pdfFiles = readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  const byCode = new Map<string, string>();
  for (const f of pdfFiles) {
    const m = f.match(/^(U\d{2}_\d{2})_/);
    if (m) byCode.set(m[1], f);
  }

  const textbookId = await ensureTextbook();
  const unitIds = await ensureUnits(textbookId);
  const locators = enumerate();

  let ordinal = 0, processed = 0, missing = 0;
  for (const loc of locators) {
    ordinal++;
    const file = byCode.get(loc.code);
    if (!file) { console.warn(`  MISSING pdf for ${loc.code} (${loc.title})`); missing++; continue; }
    const unitId = unitIds.get(loc.unitNumber);
    if (!unitId) { console.warn(`  no unit ${loc.unitNumber} for ${loc.code}`); missing++; continue; }
    const storagePath = `splits/${manifest.slug}/${loc.chapterNumber}.pdf`;
    const pdfUrl = await uploadPdf(join(PDF_DIR, file), storagePath);
    await upsertChapter({
      textbookId, unitId, unitNumber: loc.unitNumber, chapterIndex: loc.lessonNumber,
      chapterNumber: loc.chapterNumber, title: loc.title, pdfUrl, ordinal,
    });
    processed++;
    if (processed % 10 === 0) console.log(`  …${processed}/${locators.length}`);
  }

  console.log(`[done] ${manifest.slug}: processed=${processed} missing=${missing} dry-run=${DRY_RUN}`);
  if (!DRY_RUN) console.log(`Verify: https://inheroedu.com/textbooks/${manifest.slug}/01.01/read`);
}

main().catch((err) => { console.error("[fatal]", err); process.exit(1); });
