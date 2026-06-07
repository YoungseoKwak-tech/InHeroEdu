"use client";

/**
 * FeaturedTextbooks — pinned hero strip at the top of /library
 * surfacing the AI-curated textbooks living at /textbooks. Renders
 * a single wide card when only one textbook is published (today
 * just AP Bio) and degrades to a horizontal scroll once AP Chem /
 * AP Physics are ingested. Hides itself entirely if the
 * /api/textbooks list fetch fails — better silent than a broken
 * section on the library page.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/contexts/LanguageContext";

interface Textbook {
  slug: string;
  title: string;
  subtitle: string | null;
  author_name: string;
  total_pages: number | null;
  total_chapters: number | null;
  total_units: number | null;
  cover_url: string | null;
}

const EMOJI_BY_SLUG: Record<string, string> = {
  "ap-bio-ultimate":       "🧬",
  "ap-chem-ultimate":      "⚗️",
  "ap-physics-ultimate":   "⚛️",
  "ap-physics-2-ultimate": "🧲",
  "ap-calc-bc-ultimate":   "∫",
};

export default function FeaturedTextbooks() {
  const t = useT();
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/textbooks", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { textbooks?: Textbook[] };
        if (!cancelled) setTextbooks(json.textbooks ?? []);
      } catch {
        // Silent — library still works without this strip.
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (textbooks.length === 0) return null;

  return (
    <section className="ft-wrap" aria-label="Featured textbooks">
      <div className="ft-eyebrow">
        <span className="ft-eyebrow-dot" aria-hidden="true" />
        {t("FEATURED TEXTBOOKS")}
      </div>
      <div className={`ft-strip ft-count-${Math.min(textbooks.length, 3)}`}>
        {textbooks.map((book) => {
          const emoji = EMOJI_BY_SLUG[book.slug] ?? "📚";
          const metaParts = [
            book.total_chapters ? `${book.total_chapters} ${t("chapters")}` : null,
            book.total_pages ? `${book.total_pages} ${t("pages")}` : null,
          ].filter(Boolean);
          return (
            <Link key={book.slug} href={`/textbooks/${book.slug}`} className="ft-card">
              <div className="ft-card-glyph">{emoji}</div>
              <div className="ft-card-body">
                <div className="ft-card-title">
                  {book.title}
                  {book.subtitle && (
                    <span className="ft-card-subtitle"> — {t(book.subtitle)}</span>
                  )}
                </div>
                {metaParts.length > 0 && (
                  <div className="ft-card-meta">{metaParts.join(" · ")}</div>
                )}
              </div>
              <div className="ft-card-cta">
                <span>{t("Open textbook")}</span>
                <span className="ft-card-arrow" aria-hidden="true">→</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .ft-wrap { margin: 0 0 1.8rem; }
        .ft-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #F4C95D;
          text-shadow: 0 0 10px rgba(244, 201, 93, 0.4);
          margin-bottom: 0.7rem;
        }
        .ft-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #F4C95D;
          box-shadow: 0 0 8px rgba(244, 201, 93, 0.6);
          animation: ft-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ft-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .ft-strip {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
        }
        /* 2+ textbooks: horizontal scroll snap on tablet/desktop, stack on mobile. */
        .ft-strip.ft-count-2, .ft-strip.ft-count-3 {
          grid-auto-flow: column;
          grid-auto-columns: minmax(min(28rem, 100%), 1fr);
          grid-template-columns: none;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 0.4rem;
        }
        .ft-strip.ft-count-2 .ft-card,
        .ft-strip.ft-count-3 .ft-card { scroll-snap-align: start; }

        .ft-card {
          display: grid;
          grid-template-columns: max-content 1fr max-content;
          align-items: center;
          gap: 1.2rem;
          padding: 1.35rem 1.55rem;
          background:
            radial-gradient(ellipse at 0% 100%, rgba(169, 156, 255, 0.18), transparent 60%),
            radial-gradient(ellipse at 100% 0%, rgba(94, 234, 212, 0.12), transparent 55%),
            linear-gradient(135deg, rgba(8, 10, 18, 0.92), rgba(8, 10, 18, 0.78));
          border: 1px solid rgba(169, 156, 255, 0.32);
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 240ms ease;
        }
        .ft-card:hover {
          transform: translateY(-2px);
          border-color: rgba(169, 156, 255, 0.55);
          box-shadow: 0 24px 56px rgba(169, 156, 255, 0.22);
        }
        .ft-card:hover .ft-card-arrow { transform: translateX(6px); }

        .ft-card-glyph {
          font-size: 3.2rem;
          line-height: 1;
          filter: drop-shadow(0 0 18px rgba(169, 156, 255, 0.35));
        }
        .ft-card-body { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
        .ft-card-title {
          font-family: Cormorant Garamond, Georgia, serif;
          font-size: 1.65rem; font-weight: 600;
          color: #f3f3fb;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .ft-card-subtitle {
          font-style: italic;
          color: rgba(216, 217, 230, 0.85);
          font-weight: 500;
        }
        .ft-card-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: rgba(148, 163, 184, 0.78);
          letter-spacing: 0.04em;
        }

        .ft-card-cta {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #a99cff;
          text-shadow: 0 0 10px rgba(169, 156, 255, 0.35);
          white-space: nowrap;
        }
        .ft-card-arrow {
          font-size: 1.1rem;
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Mobile: stack cta below, glyph slightly smaller */
        @media (max-width: 720px) {
          .ft-card {
            grid-template-columns: max-content 1fr;
            grid-template-rows: auto auto;
            gap: 0.85rem 1rem;
            padding: 1.1rem 1.2rem;
          }
          .ft-card-cta {
            grid-column: 1 / -1;
            justify-content: flex-end;
            padding-top: 0.25rem;
            border-top: 1px solid rgba(169, 156, 255, 0.15);
          }
          .ft-card-glyph { font-size: 2.4rem; }
          .ft-card-title { font-size: 1.35rem; }
        }
      `}</style>
    </section>
  );
}
