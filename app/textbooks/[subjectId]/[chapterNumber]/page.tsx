// /textbooks/[subjectId]/[chapterNumber] — chapter reader.
//
// Server component: fetches the chapter row + navigation via the
// per-chapter API and renders the layout. The PDF itself is an
// <iframe> pointing at the per-chapter PDF in Supabase Storage
// (textbooks/splits/{slug}/{UU.CC}.pdf, populated by the ingest
// script). Native browser PDF viewer handles zoom / page nav /
// search / fullscreen / print, so we don't bring in pdfjs for v1.

import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase";
import ChapterCompletionTrigger from "@/components/future/ChapterCompletionTrigger";

export const dynamic = "force-dynamic";

interface ChapterRow {
  id: string;
  chapter_number: string;
  unit_number: number;
  chapter_index: number;
  title: string;
  subtitle: string | null;
  learning_objectives: unknown;
  section_titles: unknown;
  ai_summary: string | null;
  ai_difficulty: string | null;
  pdf_url: string | null;
  page_count: number | null;
  estimated_read_time: number | null;
  ordinal: number;
}

interface NavEntry {
  chapter_number: string;
  title: string;
  unit_number: number;
}

interface PageData {
  chapter: ChapterRow;
  textbook: { slug: string; title: string; course_slug: string | null };
  prev: NavEntry | null;
  next: NavEntry | null;
  ordinal: number;
  total_chapters: number;
}

async function loadPage(slug: string, chapterNumber: string): Promise<PageData | null> {
  const sb = createAdminClient();
  const { data: textbook } = await sb
    .from("textbooks")
    .select("id, slug, title, course_slug")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!textbook) return null;

  const { data: chapters } = await sb
    .from("textbook_chapters")
    .select("id, chapter_number, unit_number, chapter_index, title, subtitle, learning_objectives, section_titles, ai_summary, ai_difficulty, pdf_url, page_count, estimated_read_time, ordinal")
    .eq("textbook_id", textbook.id)
    .order("ordinal", { ascending: true });
  const list = (chapters ?? []) as ChapterRow[];
  const idx = list.findIndex((c) => c.chapter_number === chapterNumber);
  if (idx === -1) return null;

  const proj = (c: ChapterRow): NavEntry => ({
    chapter_number: c.chapter_number,
    title: c.title,
    unit_number: c.unit_number,
  });

  return {
    chapter: list[idx],
    textbook: {
      slug: textbook.slug as string,
      title: textbook.title as string,
      course_slug: (textbook.course_slug as string | null) ?? null,
    },
    prev: idx > 0 ? proj(list[idx - 1]) : null,
    next: idx < list.length - 1 ? proj(list[idx + 1]) : null,
    ordinal: list[idx].ordinal,
    total_chapters: list.length,
  };
}

export default async function ChapterReaderPage({
  params,
}: {
  params: Promise<{ subjectId: string; chapterNumber: string }>;
}) {
  const { subjectId, chapterNumber } = await params;
  const slug = decodeURIComponent(subjectId);
  const cnum = decodeURIComponent(chapterNumber);

  const data = await loadPage(slug, cnum);
  if (!data) notFound();

  const { chapter, textbook, prev, next, ordinal, total_chapters } = data;

  // Learning objectives may be jsonb of either string[] or {1,2,3} maps;
  // normalize to string[].
  const objectives: string[] = Array.isArray(chapter.learning_objectives)
    ? (chapter.learning_objectives as string[]).filter((o) => typeof o === "string")
    : [];

  // Progress dots — one tick per chapter in this textbook, current
  // one filled. Capped to a sane visual count for very long books.
  const dotCount = Math.min(total_chapters, 16);
  const filledDot = Math.round(((ordinal) / total_chapters) * dotCount);

  return (
    <main className="rd-root">
      {/* ── Sticky top bar ──────────────────────────────────────── */}
      <header className="rd-bar">
        <div className="rd-bar-inner">
          <Link href={`/textbooks/${textbook.slug}`} className="rd-bar-back">
            <span aria-hidden="true">←</span>
            <span className="rd-bar-back-text">TOC</span>
          </Link>
          <div className="rd-bar-center">
            <span className="rd-bar-tag">{textbook.title} · Ch {chapter.chapter_number}</span>
            <span className="rd-bar-title">{chapter.title}</span>
          </div>
          <div className="rd-bar-progress" aria-label={`Chapter ${ordinal} of ${total_chapters}`}>
            {Array.from({ length: dotCount }).map((_, i) => (
              <span
                key={i}
                className={`rd-dot ${i < filledDot ? "is-filled" : ""}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── Chapter header ──────────────────────────────────────── */}
      <section className="rd-head">
        <div className="rd-head-eyebrow">
          UNIT {String(chapter.unit_number).padStart(2, "0")} · CHAPTER {String(chapter.chapter_index).padStart(2, "0")}
        </div>
        <h1 className="rd-title">{chapter.title}</h1>
        {chapter.subtitle && <p className="rd-subtitle">{chapter.subtitle}</p>}
        <div className="rd-stats">
          <span>{chapter.estimated_read_time ?? "—"} min read</span>
          <span className="rd-stats-dot">·</span>
          <span>{chapter.page_count ?? "—"} pages</span>
          <span className="rd-stats-dot">·</span>
          <span>{textbook.title}</span>
          {chapter.ai_difficulty && (
            <>
              <span className="rd-stats-dot">·</span>
              <span className={`rd-diff rd-diff-${chapter.ai_difficulty}`}>
                {chapter.ai_difficulty}
              </span>
            </>
          )}
        </div>
      </section>

      {/* ── Learning objectives ─────────────────────────────────── */}
      {objectives.length > 0 && (
        <details className="rd-obj" open>
          <summary className="rd-obj-head">
            <span className="rd-obj-label">What you'll learn</span>
            <span className="rd-obj-chev" aria-hidden="true">▾</span>
          </summary>
          <ol className="rd-obj-list">
            {objectives.map((o, i) => (
              <li key={i} className="rd-obj-item">
                <span className="rd-obj-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="rd-obj-text">{o}</span>
              </li>
            ))}
          </ol>
        </details>
      )}

      {/* ── Read chapter CTA ────────────────────────────────────── */}
      <section className="rd-pdf-wrap">
        {chapter.pdf_url ? (
          <Link
            href={`/textbooks/${textbook.slug}/${chapter.chapter_number}/read`}
            className="rd-read-cta"
          >
            <span className="rd-read-icon" aria-hidden="true">📖</span>
            <span className="rd-read-text">
              <span className="rd-read-title">Read chapter</span>
              <span className="rd-read-meta">
                {chapter.page_count ?? "—"} pages
                {chapter.estimated_read_time ? ` · ${chapter.estimated_read_time} min` : ""}
              </span>
            </span>
            <span className="rd-read-arrow" aria-hidden="true">→</span>
          </Link>
        ) : (
          <div className="rd-pdf-missing">
            PDF is still processing. Check back in a few minutes — the
            ingest pipeline writes the chapter PDF to Supabase Storage
            and updates this row when it finishes.
          </div>
        )}
      </section>

      {/* ── Bottom nav ──────────────────────────────────────────── */}
      <nav className="rd-nav" aria-label="Chapter navigation">
        {prev ? (
          <Link href={`/textbooks/${textbook.slug}/${prev.chapter_number}`} className="rd-nav-link rd-nav-prev">
            <span className="rd-nav-dir">← Previous</span>
            <span className="rd-nav-meta">Ch {prev.chapter_number} · Unit {String(prev.unit_number).padStart(2, "0")}</span>
            <span className="rd-nav-title">{prev.title}</span>
          </Link>
        ) : (
          <div className="rd-nav-link rd-nav-prev rd-nav-disabled">
            <span className="rd-nav-dir">— Start of book</span>
            <span className="rd-nav-meta">Ch {chapter.chapter_number} is the first chapter</span>
          </div>
        )}
        {next ? (
          <Link href={`/textbooks/${textbook.slug}/${next.chapter_number}`} className="rd-nav-link rd-nav-next">
            <span className="rd-nav-dir">Next →</span>
            <span className="rd-nav-meta">Ch {next.chapter_number} · Unit {String(next.unit_number).padStart(2, "0")}</span>
            <span className="rd-nav-title">{next.title}</span>
          </Link>
        ) : (
          <div className="rd-nav-link rd-nav-next rd-nav-disabled">
            <span className="rd-nav-dir">End of book —</span>
            <span className="rd-nav-meta">You've reached the last chapter</span>
          </div>
        )}
      </nav>

      <ChapterCompletionTrigger
        chapterId={chapter.id}
        subjectSlug={textbook.course_slug}
        nextHref={next ? `/textbooks/${textbook.slug}/${next.chapter_number}` : null}
        textbookSlug={textbook.slug}
      />

      <style>{readerCss}</style>
    </main>
  );
}

const readerCss = `
  .rd-root {
    min-height: 100vh;
    background: #050610;
    color: #d8d9e6;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
    padding-bottom: 5rem;
  }

  /* ── Sticky top bar ─────────────────────────────────────────── */
  .rd-bar {
    position: sticky; top: 0; z-index: 30;
    background: rgba(5, 6, 16, 0.78);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(94, 234, 212, 0.12);
  }
  .rd-bar-inner {
    max-width: 64rem; margin: 0 auto;
    padding: 0.65rem 1.25rem;
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;
    gap: 1rem;
  }
  .rd-bar-back {
    display: inline-flex; align-items: center; gap: 0.45rem;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(148, 163, 184, 0.85);
    text-decoration: none;
    padding: 0.3rem 0.55rem;
    border-radius: 0.4rem;
    transition: color 150ms ease, background 150ms ease;
  }
  .rd-bar-back:hover { color: #5eead4; background: rgba(94,234,212,0.06); }
  .rd-bar-back-text { display: inline; }
  .rd-bar-center {
    display: flex; flex-direction: column; gap: 0.05rem;
    min-width: 0;
    text-align: center;
  }
  .rd-bar-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(94, 234, 212, 0.78);
  }
  .rd-bar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem; font-weight: 500;
    color: #f3f3fb;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .rd-bar-progress {
    display: flex; align-items: center; gap: 4px;
  }
  .rd-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(148, 163, 184, 0.22);
    transition: background 200ms ease, box-shadow 200ms ease;
  }
  .rd-dot.is-filled {
    background: #a99cff;
    box-shadow: 0 0 6px rgba(169, 156, 255, 0.55);
  }

  /* ── Chapter header ─────────────────────────────────────────── */
  .rd-head {
    max-width: 50rem; margin: 0 auto;
    padding: 3.25rem 1.5rem 1.75rem;
    text-align: left;
  }
  .rd-head-eyebrow {
    font-family: ui-monospace, monospace;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #a99cff;
    text-shadow: 0 0 12px rgba(169, 156, 255, 0.35);
    margin-bottom: 0.55rem;
  }
  .rd-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2rem, 5vw, 3rem); font-weight: 600;
    color: #f3f3fb;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0 0 0.45rem;
  }
  .rd-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: rgba(216,217,230,0.85);
    margin: 0 0 0.7rem;
  }
  .rd-tier {
    display: inline-block;
    font-family: ui-monospace, monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #F4C95D;
    text-shadow: 0 0 10px rgba(244,201,93,0.3);
    margin-bottom: 0.7rem;
  }
  .rd-stats {
    display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem;
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    color: rgba(148, 163, 184, 0.75);
    letter-spacing: 0.04em;
  }
  .rd-stats-dot { color: rgba(148,163,184,0.4); }
  .rd-diff {
    font-weight: 700;
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
    text-transform: uppercase;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
  }
  .rd-diff-basic        { color: #5DCAA5; background: rgba(93,202,165,0.1); }
  .rd-diff-intermediate { color: #F4C95D; background: rgba(244,201,93,0.1); }
  .rd-diff-advanced     { color: #FF8B7E; background: rgba(255,139,126,0.1); }

  /* ── Learning objectives panel ──────────────────────────────── */
  .rd-obj {
    max-width: 50rem; margin: 1rem auto 1.5rem;
    background: rgba(169, 156, 255, 0.04);
    border: 1px solid rgba(169, 156, 255, 0.22);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 200ms ease;
  }
  .rd-obj:hover { border-color: rgba(169, 156, 255, 0.35); }
  .rd-obj-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 1.15rem;
    cursor: pointer;
    list-style: none;
    user-select: none;
  }
  .rd-obj-head::-webkit-details-marker { display: none; }
  .rd-obj-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem; font-weight: 600;
    color: #f3f3fb;
    letter-spacing: -0.005em;
  }
  .rd-obj-chev {
    font-size: 0.75rem;
    color: rgba(169, 156, 255, 0.8);
    transition: transform 200ms ease;
  }
  .rd-obj[open] .rd-obj-chev { transform: rotate(180deg); }
  .rd-obj-list { margin: 0; padding: 0.1rem 1.15rem 0.95rem; list-style: none; }
  .rd-obj-item {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.85rem;
    padding: 0.55rem 0;
    border-top: 1px solid rgba(169, 156, 255, 0.1);
  }
  .rd-obj-item:first-child { border-top: 0; }
  .rd-obj-num {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    color: #a99cff;
    letter-spacing: 0.1em;
    padding-top: 0.15rem;
  }
  .rd-obj-text {
    font-size: 0.95rem;
    color: rgba(216, 217, 230, 0.92);
    line-height: 1.55;
  }

  /* ── PDF embed ───────────────────────────────────────────────── */
  .rd-pdf-wrap {
    max-width: 56rem; margin: 0 auto;
    padding: 0 1.25rem;
  }
  /* Read-chapter CTA: violet gradient card that opens the full-
     screen <PdfReader> on /read. Sits where the iframe used to. */
  .rd-read-cta {
    display: flex; align-items: center; gap: 1.15rem;
    padding: 1.5rem 1.65rem;
    background:
      radial-gradient(ellipse at 0% 50%, rgba(169, 156, 255, 0.16), transparent 60%),
      linear-gradient(135deg, rgba(169, 156, 255, 0.12), rgba(94, 234, 212, 0.05));
    border: 1px solid rgba(169, 156, 255, 0.35);
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    transition: transform 200ms ease, border-color 200ms ease, box-shadow 240ms ease;
  }
  .rd-read-cta:hover {
    transform: translateY(-2px);
    border-color: rgba(169, 156, 255, 0.6);
    box-shadow: 0 24px 56px rgba(169, 156, 255, 0.25);
  }
  .rd-read-cta:hover .rd-read-arrow { transform: translateX(6px); }
  .rd-read-icon {
    font-size: 2.4rem;
    line-height: 1;
    filter: drop-shadow(0 0 14px rgba(169, 156, 255, 0.35));
  }
  .rd-read-text { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; min-width: 0; }
  .rd-read-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem; font-weight: 600;
    color: #f3f3fb;
    letter-spacing: -0.01em;
    line-height: 1.1;
  }
  .rd-read-meta {
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    color: rgba(216, 217, 230, 0.7);
    letter-spacing: 0.04em;
  }
  .rd-read-arrow {
    font-size: 1.6rem;
    color: #a99cff;
    text-shadow: 0 0 16px rgba(169, 156, 255, 0.55);
    transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .rd-pdf-missing {
    padding: 2.5rem 1.5rem;
    background: rgba(255, 107, 91, 0.05);
    border: 1px dashed rgba(255, 107, 91, 0.3);
    border-radius: 12px;
    color: rgba(216, 217, 230, 0.8);
    font-size: 0.92rem;
    line-height: 1.55;
    text-align: center;
  }

  /* ── Bottom navigation ───────────────────────────────────────── */
  .rd-nav {
    max-width: 50rem; margin: 3rem auto 0;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }
  .rd-nav-link {
    display: flex; flex-direction: column; gap: 0.25rem;
    padding: 1.05rem 1.15rem;
    background: rgba(8, 10, 18, 0.65);
    border: 1px solid rgba(94, 234, 212, 0.18);
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: transform 150ms ease, border-color 150ms ease, box-shadow 200ms ease;
  }
  .rd-nav-link:hover {
    transform: translateY(-2px);
    border-color: rgba(169, 156, 255, 0.45);
    box-shadow: 0 12px 32px rgba(169, 156, 255, 0.18);
  }
  .rd-nav-next { text-align: right; }
  .rd-nav-dir {
    font-family: ui-monospace, monospace;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #a99cff;
  }
  .rd-nav-meta {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148, 163, 184, 0.7);
    letter-spacing: 0.04em;
  }
  .rd-nav-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem; font-weight: 500;
    color: #f3f3fb;
    line-height: 1.3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .rd-nav-disabled {
    opacity: 0.4;
    cursor: default;
  }
  .rd-nav-disabled:hover {
    transform: none;
    border-color: rgba(94, 234, 212, 0.18);
    box-shadow: none;
  }

  /* ── Mobile ─────────────────────────────────────────────────── */
  @media (max-width: 720px) {
    .rd-bar-inner { grid-template-columns: max-content 1fr max-content; gap: 0.5rem; padding: 0.5rem 0.75rem; }
    .rd-bar-back-text { display: none; }
    .rd-bar-title { display: none; }
    .rd-bar-tag { font-size: 0.6rem; letter-spacing: 0.14em; }
    .rd-bar-progress { display: none; }
    .rd-head { padding: 2rem 1.25rem 1.25rem; }
    .rd-title { font-size: 2rem; }
    .rd-nav { grid-template-columns: 1fr; }
    .rd-nav-next { text-align: left; }
  }
`;
