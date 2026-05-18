#!/usr/bin/env tsx
/**
 * Ingest an InHero-format textbook PDF into the database.
 *
 * Pipeline:
 *   1. Parse the source PDF page-by-page.
 *   2. Detect chapter boundaries via the InHero header pattern
 *      ("INHERO · AP BIOLOGY · UNIT NN / CHAPTER NN") plus the
 *      "— LEARNING OBJECTIVES" marker that only appears on chapter
 *      title pages.
 *   3. Extract per-chapter title, learning objectives, section
 *      titles, and full text.
 *   4. Split the source PDF into one PDF per chapter and upload
 *      each to the "textbooks" bucket under splits/{slug}/.
 *   5. Run Claude Sonnet on each chapter to produce summary +
 *      key concepts + topics + exam tips + difficulty.
 *   6. Insert textbook → units → chapters into the DB.
 *
 * Usage:
 *   npx tsx scripts/ingest-textbook.ts \
 *     --pdf ../Textbook/InHero_AP_Biology_Complete.pdf \
 *     --slug ap-bio-ultimate \
 *     --title "AP Biology" \
 *     --subtitle "The Ultimate Guide" \
 *     --course ap-bio \
 *     --author-name "Youngseo Kwak"
 *
 *   Add --dry-run to parse + analyze without writing the DB or
 *   uploading any PDFs (useful for verifying the parse layer
 *   before paying for AI analysis).
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 * and ANTHROPIC_API_KEY (loaded from .env.local).
 */

import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { PDFParse } from "pdf-parse";
import Anthropic from "@anthropic-ai/sdk";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ────────────────────────────────────────────────────────────
// Env loading (minimal, no dotenv dep)
// ────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────
// Parse markers
// ────────────────────────────────────────────────────────────

const HEADER_PATTERN = /INHERO\s*·\s*(.+?)\s+UNIT\s+(\d+)\s*\/\s*CHAPTER\s+(\d+)/i;
const LEARNING_OBJ_MARKER = "— LEARNING OBJECTIVES";

const UNIT_TITLES_AP_BIO: Record<number, string> = {
  1: "Chemistry of Life",
  2: "Cell Structure & Function",
  3: "Cellular Energetics",
  4: "Cell Communication & Cell Cycle",
  5: "Heredity",
  6: "Gene Expression & Regulation",
  7: "Natural Selection",
  8: "Ecology",
};

// ── Per-unit chapter counts for AP Biology Ultimate. The source
// PDF's page headers carry inconsistent UNIT/CHAPTER labels for
// roughly half the chapters (the original chapters_data.json is
// gone), so we IGNORE the header captures and re-derive UU.CC
// from sequence position using this array. Order: Unit 1..8.
//
// If you add another textbook with a different layout, define a
// new array and pass it into detectChapters.
const AP_BIO_UNIT_COUNTS = [8, 8, 9, 8, 8, 8, 8, 8] as const;

const STORAGE_BUCKET = "textbooks";
const SONNET_MODEL = "claude-sonnet-4-6";
const AI_COST_PER_CHAPTER_USD = 0.03; // rough Sonnet estimate, display-only

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

interface ChapterRange {
  chapterNumber: string; // 'UU.CC'
  unitNumber: number;
  chapterIndex: number;
  pageStart: number; // 1-indexed
  pageEnd: number;
}

interface ExtractedChapter extends ChapterRange {
  title: string;
  learningObjectives: string[];
  sectionTitles: string[];
  fullText: string;
  pageCount: number;
  estimatedReadTime: number;
  pdfBytes: Uint8Array;
}

interface AIAnalysis {
  summary: string;
  keyConcepts: string[];
  topics: string[];
  examTips: string[];
  difficulty: "basic" | "intermediate" | "advanced";
}

interface CliArgs {
  pdf: string;
  slug: string;
  title: string;
  subtitle?: string;
  course: string;
  authorName: string;
  authorId?: string;
  dryRun: boolean;
}

// ────────────────────────────────────────────────────────────
// Step 1: chapter boundary detection
//
// Strategy: parse the whole PDF once with pdf-parse v2, which
// returns per-page text in a single pass. Walk the page array
// and flag any page that matches the InHero header pattern +
// the "— LEARNING OBJECTIVES" marker (those two together only
// appear on chapter title pages).
// ────────────────────────────────────────────────────────────

async function readPdfPages(pdfBuffer: Buffer): Promise<string[]> {
  const parser = new PDFParse({ data: new Uint8Array(pdfBuffer) });
  try {
    const result = await parser.getText();
    return result.pages
      .sort((a, b) => a.num - b.num)
      .map((p) => p.text);
  } finally {
    await parser.destroy();
  }
}

function detectChapters(
  pageTexts: string[],
  unitCounts: readonly number[],
): ChapterRange[] {
  // First pass: find every page that's a chapter title page (the
  // header pattern + LEARNING OBJECTIVES marker only co-occur on
  // title pages). We trust this DETECTION but ignore the regex's
  // unit/chapter captures — those are unreliable in this PDF.
  const titlePageIdx: number[] = [];
  for (let pageIdx = 0; pageIdx < pageTexts.length; pageIdx++) {
    const pageText = pageTexts[pageIdx];
    if (HEADER_PATTERN.test(pageText) && pageText.includes(LEARNING_OBJ_MARKER)) {
      titlePageIdx.push(pageIdx);
    }
  }

  const expectedTotal = unitCounts.reduce((a, b) => a + b, 0);
  if (titlePageIdx.length !== expectedTotal) {
    throw new Error(
      `Detected ${titlePageIdx.length} chapter title pages but unit counts sum to ${expectedTotal}. ` +
      `Re-check AP_BIO_UNIT_COUNTS or the header-detection regex.`,
    );
  }

  // Walk the unit-counts array to map sequence position → (unit, chapter).
  function unitOfPosition(pos1: number): { unit: number; chapter: number } {
    let consumed = 0;
    for (let u = 0; u < unitCounts.length; u++) {
      if (pos1 <= consumed + unitCounts[u]) {
        return { unit: u + 1, chapter: pos1 - consumed };
      }
      consumed += unitCounts[u];
    }
    throw new Error(`Position ${pos1} exceeds sum of unit counts`);
  }

  const chapters: ChapterRange[] = [];
  for (let i = 0; i < titlePageIdx.length; i++) {
    const pos1 = i + 1;
    const { unit, chapter } = unitOfPosition(pos1);
    const chapterNumber =
      `${String(unit).padStart(2, "0")}.${String(chapter).padStart(2, "0")}`;
    chapters.push({
      chapterNumber,
      unitNumber: unit,
      chapterIndex: chapter,
      pageStart: titlePageIdx[i] + 1, // 1-indexed
      pageEnd: i + 1 < titlePageIdx.length ? titlePageIdx[i + 1] : pageTexts.length,
    });
  }
  return chapters;
}

// ────────────────────────────────────────────────────────────
// Step 2: per-chapter content extraction
// ────────────────────────────────────────────────────────────

async function extractChapterContent(
  sourceDoc: PDFDocument,
  pageTexts: string[],
  chapter: ChapterRange,
): Promise<ExtractedChapter> {
  const chapterDoc = await PDFDocument.create();
  const pageIndices: number[] = [];
  for (let i = chapter.pageStart - 1; i < chapter.pageEnd; i++) {
    pageIndices.push(i);
  }
  const copied = await chapterDoc.copyPages(sourceDoc, pageIndices);
  for (const p of copied) chapterDoc.addPage(p);
  const chapterBuffer = await chapterDoc.save();

  const fullText = pageTexts
    .slice(chapter.pageStart - 1, chapter.pageEnd)
    .join("\n");

  // ── Title — sits between the header and "— LEARNING OBJECTIVES".
  // We strip decorative MISSION / AP prefixes and join the
  // remaining short lines into the canonical title.
  const titleMatch = fullText.match(
    /UNIT\s+\d+\s*\/\s*CHAPTER\s+\d+\s*\n+([\s\S]+?)\n+—\s*LEARNING\s+OBJECTIVES/,
  );
  const titleRaw = titleMatch ? titleMatch[1] : "";
  const title =
    titleRaw
      .replace(/^—\s*MISSION\s+\d+\s*·?\s*AP\s*/i, "")
      // \b prevents matching the "Ap" prefix of words like "Apoptosis".
      .replace(/^\s*AP\b\s*/i, "")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 2 && l.length < 100)
      .join(" ")
      .trim() || `Chapter ${chapter.chapterNumber}`;

  // ── Learning objectives — numbered list, may wrap multiple lines.
  const objSlice = fullText.match(
    /—\s*LEARNING\s+OBJECTIVES[\s\S]*?(?=—\s*NAVIGATION|$)/,
  );
  const objText = objSlice ? objSlice[0] : "";
  const learningObjectives: string[] = [];
  let currentObj = "";
  for (const line of objText.split("\n")) {
    const numMatch = line.match(/^\s*0?(\d+)\s+(.+)/);
    if (numMatch && parseInt(numMatch[1], 10) <= 10) {
      if (currentObj) learningObjectives.push(currentObj.trim());
      currentObj = numMatch[2];
    } else if (currentObj && line.trim().length > 0) {
      currentObj += " " + line.trim();
    }
  }
  if (currentObj) learningObjectives.push(currentObj.trim());

  // ── Section titles — the NAVIGATION block on each title page is
  // a sequence of "01\n<word>\n<word>\n02\n<word>\n…" groups
  // terminated by the "COORD · UU.CC" footer. We slice from
  // "— NAVIGATION" to the first SECTION/COORD marker, then walk
  // lines: numeric markers start a new section, the following
  // word lines get joined to form the title.
  const navMatch = fullText.match(
    /—\s*NAVIGATION([\s\S]*?)(?=SECTION\s+\d+|COORD\s*·|$)/i,
  );
  const sectionTitles: string[] = [];
  if (navMatch) {
    let current: string[] = [];
    for (const raw of navMatch[1].split("\n")) {
      const line = raw.trim();
      if (!line) continue;
      if (/^0[1-9]$/.test(line)) {
        if (current.length) sectionTitles.push(current.join(" "));
        current = [];
        continue;
      }
      current.push(line);
    }
    if (current.length) sectionTitles.push(current.join(" "));
  }

  const pageCount = chapter.pageEnd - chapter.pageStart + 1;
  const estimatedReadTime = Math.max(3, Math.round(pageCount * 1.5));

  return {
    ...chapter,
    title,
    learningObjectives,
    sectionTitles,
    fullText,
    pageCount,
    estimatedReadTime,
    pdfBytes: chapterBuffer,
  };
}

// ────────────────────────────────────────────────────────────
// Step 3: AI analysis
// ────────────────────────────────────────────────────────────

async function analyzeChapter(
  client: Anthropic,
  chapter: ExtractedChapter,
  courseSlug: string,
): Promise<AIAnalysis> {
  const truncatedText = chapter.fullText.slice(0, 12000);

  const response = await client.messages.create({
    model: SONNET_MODEL,
    max_tokens: 1500,
    system:
      "You are analyzing chapters of an AP/college-prep textbook for InHero. " +
      "Extract structured metadata that will help students search and study. " +
      "Be accurate, terse, and exam-focused. Use College Board CED language for AP courses.",
    messages: [
      {
        role: "user",
        content: `Analyze this textbook chapter and return JSON only (no preamble, no fences):

COURSE: ${courseSlug}
UNIT: ${chapter.unitNumber}
CHAPTER: ${chapter.chapterNumber}
TITLE: ${chapter.title}

LEARNING OBJECTIVES:
${chapter.learningObjectives.map((o, i) => `${i + 1}. ${o}`).join("\n")}

FIRST 12000 CHARS OF CONTENT:
${truncatedText}

Return EXACTLY this JSON shape:
{
  "summary": "2-sentence overview of what this chapter teaches",
  "keyConcepts": ["concept1", "concept2", ...],
  "topics": ["topic1", "topic2", ...],
  "examTips": ["tip1", "tip2"],
  "difficulty": "basic" | "intermediate" | "advanced"
}`,
      },
    ],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .replace(/```json|```/g, "")
    .trim();

  const parsed = JSON.parse(text) as AIAnalysis;
  if (!["basic", "intermediate", "advanced"].includes(parsed.difficulty)) {
    parsed.difficulty = "intermediate";
  }
  return parsed;
}

// ────────────────────────────────────────────────────────────
// Step 4: DB writes
//
// Idempotent — re-running the script with the same slug will
// upsert the textbook + units + chapters in place. Per-chapter
// PDFs are uploaded with upsert:true.
// ────────────────────────────────────────────────────────────

async function writeTextbookToDB(
  sb: SupabaseClient,
  args: CliArgs,
  chapters: ExtractedChapter[],
  analyses: AIAnalysis[],
  totalPdfPages: number,
  sourcePdfSizeBytes: number,
): Promise<{ textbookId: string; chaptersWritten: number }> {
  // ── Textbook row (upsert by slug)
  const distinctUnits = new Set(chapters.map((c) => c.unitNumber));
  const { data: textbookRow, error: tbErr } = await sb
    .from("textbooks")
    .upsert(
      {
        slug: args.slug,
        title: args.title,
        subtitle: args.subtitle ?? null,
        course_slug: args.course,
        author_id: args.authorId ?? null,
        author_name: args.authorName,
        total_pages: totalPdfPages,
        total_chapters: chapters.length,
        total_units: distinctUnits.size,
        source_pdf_size_bytes: sourcePdfSizeBytes,
        processing_status: "processing",
        processing_started_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();

  if (tbErr || !textbookRow) {
    throw new Error(`textbooks upsert failed: ${tbErr?.message ?? "no row returned"}`);
  }
  const textbookId = textbookRow.id as string;

  // ── Units (one per distinct unit_number)
  const unitNumbers = Array.from(distinctUnits).sort((a, b) => a - b);
  const unitRows = unitNumbers.map((n, idx) => {
    const chaptersInUnit = chapters.filter((c) => c.unitNumber === n);
    const pageStart = Math.min(...chaptersInUnit.map((c) => c.pageStart));
    const pageEnd = Math.max(...chaptersInUnit.map((c) => c.pageEnd));
    return {
      textbook_id: textbookId,
      unit_number: n,
      title: UNIT_TITLES_AP_BIO[n] ?? `Unit ${n}`,
      ordinal: idx + 1,
      page_start: pageStart,
      page_end: pageEnd,
      total_chapters: chaptersInUnit.length,
    };
  });

  const { data: unitRowsWritten, error: unitErr } = await sb
    .from("textbook_units")
    .upsert(unitRows, { onConflict: "textbook_id,unit_number" })
    .select("id, unit_number");
  if (unitErr || !unitRowsWritten) {
    throw new Error(`textbook_units upsert failed: ${unitErr?.message ?? "no rows"}`);
  }
  const unitIdByNumber = new Map<number, string>(
    unitRowsWritten.map((u: { id: string; unit_number: number }) => [u.unit_number, u.id]),
  );

  // ── Chapters — upload PDF, then upsert row
  let chaptersWritten = 0;
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const an = analyses[i];

    const storagePath = `splits/${args.slug}/${ch.chapterNumber}.pdf`;
    const { error: upErr } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, Buffer.from(ch.pdfBytes), {
        contentType: "application/pdf",
        upsert: true,
      });
    if (upErr) {
      throw new Error(`storage upload failed for ${ch.chapterNumber}: ${upErr.message}`);
    }
    const { data: pub } = sb.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
    const pdfUrl = pub.publicUrl;

    const unitId = unitIdByNumber.get(ch.unitNumber);
    if (!unitId) throw new Error(`unit ${ch.unitNumber} missing for chapter ${ch.chapterNumber}`);

    const { error: chErr } = await sb.from("textbook_chapters").upsert(
      {
        textbook_id: textbookId,
        unit_id: unitId,
        chapter_number: ch.chapterNumber,
        unit_number: ch.unitNumber,
        chapter_index: ch.chapterIndex,
        title: ch.title,
        learning_objectives: ch.learningObjectives,
        section_titles: ch.sectionTitles,
        full_text: ch.fullText,
        ai_summary: an.summary,
        ai_key_concepts: an.keyConcepts,
        ai_topics: an.topics,
        ai_exam_tips: an.examTips,
        ai_difficulty: an.difficulty,
        ai_analyzed_at: new Date().toISOString(),
        pdf_url: pdfUrl,
        page_start: ch.pageStart,
        page_end: ch.pageEnd,
        page_count: ch.pageCount,
        estimated_read_time: ch.estimatedReadTime,
        ordinal: i + 1,
      },
      { onConflict: "textbook_id,chapter_number" },
    );
    if (chErr) {
      throw new Error(`chapters upsert failed for ${ch.chapterNumber}: ${chErr.message}`);
    }
    chaptersWritten++;
  }

  // ── Mark textbook completed
  await sb
    .from("textbooks")
    .update({
      processing_status: "completed",
      processing_completed_at: new Date().toISOString(),
      processing_error: null,
      is_published: false, // operator publishes explicitly via admin UI
    })
    .eq("id", textbookId);

  return { textbookId, chaptersWritten };
}

// ────────────────────────────────────────────────────────────
// CLI
// ────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): CliArgs {
  const out: Record<string, string | boolean> = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (a.startsWith("--")) {
      const key = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      out[key] = argv[i + 1];
      i++;
    }
  }
  const required = ["pdf", "slug", "title", "course", "authorName"] as const;
  for (const k of required) {
    if (!out[k]) {
      console.error(
        `Missing --${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`,
      );
      console.error(
        "Required: --pdf --slug --title --course --author-name. Optional: --subtitle --author-id --dry-run",
      );
      process.exit(1);
    }
  }
  return out as unknown as CliArgs;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log(`\nIngesting textbook: ${args.title}`);
  console.log(`   PDF:     ${args.pdf}`);
  console.log(`   Slug:    ${args.slug}`);
  console.log(`   Course:  ${args.course}`);
  console.log(`   Mode:    ${args.dryRun ? "DRY RUN" : "APPLY"}\n`);

  const pdfBuffer = await fs.readFile(path.resolve(args.pdf));
  console.log(`Loaded PDF: ${(pdfBuffer.length / 1024 / 1024).toFixed(1)} MB`);

  const tParseStart = Date.now();
  console.log("\nReading PDF text per page…");
  const pageTexts = await readPdfPages(pdfBuffer);
  console.log(`   ${pageTexts.length} pages parsed in ${((Date.now() - tParseStart) / 1000).toFixed(1)}s`);

  const sourceDoc = await PDFDocument.load(pdfBuffer);

  console.log("\nStep 1/4: detecting chapter boundaries…");
  const ranges = detectChapters(pageTexts, AP_BIO_UNIT_COUNTS);
  const unitsFound = Array.from(new Set(ranges.map((r) => r.unitNumber))).sort((a, b) => a - b);
  console.log(`   Found ${ranges.length} chapters across units ${unitsFound.join(", ")}`);

  // Per-unit counts (useful for spot-checking vs expected CED distribution).
  const perUnit = new Map<number, number>();
  for (const r of ranges) perUnit.set(r.unitNumber, (perUnit.get(r.unitNumber) ?? 0) + 1);
  for (const u of unitsFound) {
    console.log(`     Unit ${u}: ${perUnit.get(u)} chapters`);
  }

  console.log("\nStep 2/4: extracting chapter content…");
  const chapters: ExtractedChapter[] = [];
  for (const r of ranges) {
    const extracted = await extractChapterContent(sourceDoc, pageTexts, r);
    chapters.push(extracted);
    console.log(
      `   ${extracted.chapterNumber} ${extracted.title.slice(0, 50)} ` +
      `(${extracted.pageCount}p, ${extracted.learningObjectives.length} objectives, ${extracted.sectionTitles.length} sections)`,
    );
  }
  const totalPages = chapters.reduce((sum, c) => sum + c.pageCount, 0);
  console.log(`   Total page coverage: ${totalPages} / ${pageTexts.length} pages`);

  if (args.dryRun) {
    // First 3, middle 1, last 3 — matches the operator checklist
    // for validating a new textbook before paying for AI analysis.
    const sampleNumbers = new Set<string>();
    chapters.slice(0, 3).forEach((c) => sampleNumbers.add(c.chapterNumber));
    const mid = chapters[Math.floor(chapters.length / 2)];
    if (mid) sampleNumbers.add(mid.chapterNumber);
    chapters.slice(-3).forEach((c) => sampleNumbers.add(c.chapterNumber));
    const samples = chapters.filter((c) => sampleNumbers.has(c.chapterNumber));

    console.log("\nDRY RUN — sample chapters (first 3, middle, last 3):");
    for (const ch of samples) {
      console.log(`\n  ${ch.chapterNumber} ${ch.title}`);
      console.log(`    Pages ${ch.pageStart}-${ch.pageEnd} (${ch.pageCount}p)`);
      console.log(`    Objectives (${ch.learningObjectives.length}):`);
      ch.learningObjectives.forEach((o) =>
        console.log(`      - ${o.slice(0, 100)}${o.length > 100 ? "…" : ""}`),
      );
      console.log(`    Sections (${ch.sectionTitles.length}): ${ch.sectionTitles.join(" | ")}`);
    }
    console.log(`\n  Would analyze ${chapters.length} chapters with Claude`);
    console.log(`  Estimated AI cost: $${(chapters.length * AI_COST_PER_CHAPTER_USD).toFixed(2)}`);
    return;
  }

  // ── Environment checks (only required for the apply path)
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  if (!ANTHROPIC_KEY) {
    console.error("Missing ANTHROPIC_API_KEY");
    process.exit(1);
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
  const ai = new Anthropic({ apiKey: ANTHROPIC_KEY });

  // Resume cache: AI analyses are durable per (slug, chapterNumber).
  // We write after every successful call so a crash mid-loop only
  // discards the in-flight chapter. Fallback shapes (from errors)
  // are NOT cached so a future run will retry them.
  const cacheDir = path.resolve("scripts/.ingest-cache");
  const cachePath = path.join(cacheDir, `${args.slug}.json`);
  await fs.mkdir(cacheDir, { recursive: true });
  const cache: Record<string, AIAnalysis> = await fs
    .readFile(cachePath, "utf8")
    .then((s) => JSON.parse(s) as Record<string, AIAnalysis>)
    .catch(() => ({}));
  const cachedCount = Object.keys(cache).length;
  if (cachedCount > 0) {
    console.log(`\nResuming from cache: ${cachedCount} chapter(s) already analyzed`);
  }

  console.log("\nStep 3/4: AI analysis…");
  const analyses: AIAnalysis[] = [];
  let totalCost = 0;
  for (const ch of chapters) {
    process.stdout.write(`   ${ch.chapterNumber} ${ch.title.slice(0, 40).padEnd(40)} `);
    const cached = cache[ch.chapterNumber];
    if (cached) {
      analyses.push(cached);
      console.log(`cached (${cached.keyConcepts.length} concepts, ${cached.difficulty})`);
      continue;
    }
    try {
      const a = await analyzeChapter(ai, ch, args.course);
      analyses.push(a);
      cache[ch.chapterNumber] = a;
      await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
      totalCost += AI_COST_PER_CHAPTER_USD;
      console.log(`OK (${a.keyConcepts.length} concepts, ${a.difficulty})`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`FAIL ${msg}`);
      analyses.push({
        summary: ch.title,
        keyConcepts: [],
        topics: [],
        examTips: [],
        difficulty: "intermediate",
      });
    }
  }
  console.log(`   Total AI cost (est): $${totalCost.toFixed(2)} (${cachedCount} cached, ${chapters.length - cachedCount} attempted)`);

  console.log("\nStep 4/4: writing to DB + uploading per-chapter PDFs…");
  try {
    const { textbookId, chaptersWritten } = await writeTextbookToDB(
      sb,
      args,
      chapters,
      analyses,
      sourceDoc.getPageCount(),
      pdfBuffer.length,
    );
    console.log(`   Textbook ${textbookId}: ${chaptersWritten}/${chapters.length} chapters written`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`   Write failed: ${msg}`);
    // Best-effort: record the failure on the textbook row if it exists.
    await sb
      .from("textbooks")
      .update({
        processing_status: "failed",
        processing_error: msg,
        processing_completed_at: new Date().toISOString(),
      })
      .eq("slug", args.slug);
    process.exit(1);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
