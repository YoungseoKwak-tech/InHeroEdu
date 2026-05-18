"use client";

/**
 * ChapterCompletionTrigger — client island the chapter overview
 * page mounts to:
 *   1. Render a "Mark this chapter complete" button below the
 *      bottom prev/next nav.
 *   2. POST /api/future/chapter-complete on click.
 *   3. Open the RitualModal with the resonance deltas.
 *   4. On dismiss, navigate to the next chapter (if any) or back
 *      to the TOC.
 *
 * Owns its own state — the server-rendered page just provides
 * the chapter_id, subject_slug, and the next-chapter href.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
import RitualModal, { type RitualDelta } from "./RitualModal";

interface Props {
  chapterId: string;
  subjectSlug: string | null;
  nextHref: string | null;
  textbookSlug: string;
}

export default function ChapterCompletionTrigger({
  chapterId,
  subjectSlug,
  nextHref,
  textbookSlug,
}: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deltas, setDeltas] = useState<RitualDelta[] | null>(null);
  const [dominant, setDominant] = useState<RitualDelta | null>(null);
  const [done, setDone] = useState(false);

  async function trigger() {
    if (submitting || done) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await authFetch("/api/future/chapter-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapter_id: chapterId, subject_slug: subjectSlug }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
      setDeltas(json.deltas ?? []);
      setDominant(json.dominant ?? null);
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "could not record");
      setSubmitting(false);
    }
  }

  function dismiss() {
    setDeltas(null);
    setDominant(null);
    setSubmitting(false);
    if (nextHref) router.push(nextHref);
    else router.push(`/textbooks/${textbookSlug}`);
  }

  return (
    <>
      <div className="cc-row">
        <button
          type="button"
          className="cc-btn"
          onClick={() => void trigger()}
          disabled={submitting || done}
        >
          {done ? "✓ chapter recorded" : submitting ? "recording…" : "✓ mark this chapter complete"}
        </button>
        {error && <div className="cc-err">{error}</div>}
        <div className="cc-hint">
          completing a chapter updates your <em>future-self</em> resonance
        </div>
      </div>

      {deltas && <RitualModal dominant={dominant} deltas={deltas} onDismiss={dismiss} />}

      <style>{`
        .cc-row {
          max-width: 50rem; margin: 1.25rem auto 0;
          padding: 0 1.5rem;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .cc-btn {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: lowercase;
          padding: 0.85rem 1.6rem;
          color: #0a0a10;
          background: linear-gradient(135deg, #a99cff, #5eead4);
          border: 0;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: filter 150ms ease, transform 100ms ease, box-shadow 200ms ease;
        }
        .cc-btn:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(169, 156, 255, 0.45);
        }
        .cc-btn:disabled {
          opacity: 0.7;
          cursor: default;
        }
        .cc-err {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: #ff8b7e;
        }
        .cc-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148, 163, 184, 0.6);
          letter-spacing: 0.06em;
        }
        .cc-hint em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: rgba(169, 156, 255, 0.85);
        }
      `}</style>
    </>
  );
}
