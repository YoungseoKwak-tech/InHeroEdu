"use client";

/**
 * FacultyLineup — landing-page teaser section.
 * Shows the inaugural faculty (5 active, SAT/Evidence hidden until ready)
 * plus a "?" placeholder card communicating that more instructors are
 * onboarding. Fetches /api/faculty client-side so each visit reflects
 * the latest admin uploads without a rebuild.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FacultyRow {
  id: string;
  name: string;
  subjectShort: string;
  tagline: string;
  imageUrl: string | null;
  introVideoUrl: string | null;
}

// Subject IDs to surface on the landing page (in this order).
// Evidence/SAT hidden until launch.
const FEATURED_IDS = ["coulomb", "lhopital", "vacuum", "osmosis", "julian"] as const;

const ACCENT: Record<string, string> = {
  coulomb: "#C9A84C",
  lhopital: "#E97099",
  vacuum: "#94A3B8",
  osmosis: "#5DCAA5",
  julian: "#B45309",
  evidence: "#FF6B5B",
};

const MASCOT: Record<string, string> = {
  coulomb: "⚗️", lhopital: "∫", vacuum: "♾",
  osmosis: "🧬", julian: "🕯", evidence: "📑",
};

export default function FacultyLineup() {
  const [rows, setRows] = useState<FacultyRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/faculty", { cache: "no-store" });
        const json = await res.json();
        if (json.ok && Array.isArray(json.faculty)) {
          setRows(json.faculty as FacultyRow[]);
        }
      } catch {
        // silent; section just degrades to placeholder mode
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = FEATURED_IDS
    .map((id) => rows.find((r) => r.id === id))
    .filter((r): r is FacultyRow => Boolean(r));

  return (
    <section className="fl-root">
      <div className="fl-stars" aria-hidden="true" />
      <div className="fl-inner">
        {/* Header */}
        <header className="fl-head">
          <div className="fl-eyebrow">
            <span className="fl-pulse" />
            <span>THE FACULTY · WAVE 01 / VI</span>
          </div>
          <h2 className="fl-title">Meet the <em>instructors</em>.</h2>
          <p className="fl-sub">
            Six personas. Each one would die on their subject's hill. More joining the roster every quarter.
          </p>
        </header>

        {/* Lineup */}
        <div className="fl-grid">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="fl-card fl-card-skeleton" style={{ ["--accent" as string]: "#5eead4" }}>
                  <div className="fl-cover" />
                </div>
              ))
            : featured.map((f, idx) => (
                <FacultyCard
                  key={f.id}
                  faculty={f}
                  order={idx + 1}
                  accent={ACCENT[f.id] ?? "#5eead4"}
                  mascot={MASCOT[f.id] ?? "✦"}
                />
              ))}

          {/* "?" — more arriving */}
          <Link href="/courses" className="fl-card fl-card-more">
            <div className="fl-cover fl-cover-more">
              <span className="fl-more-mark">?</span>
              <div className="fl-more-overlay">
                <div className="fl-more-tag">WAVE 02 · ARRIVING</div>
                <div className="fl-more-text">
                  AP Stats · AP Lit · AP Econ · IB Sciences · and more
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="fl-foot">
          <Link href="/courses" className="fl-cta">
            ENTER THE CLASSROOM →
          </Link>
          <span className="fl-foot-note">
            Instructor lineup expanding. 20+ subjects in onboarding.
          </span>
        </div>
      </div>

      <style>{`
        .fl-root {
          position: relative;
          padding: 5rem 1.25rem 3rem;
          background: #03050d;
          color: #d8d9e6;
          overflow: hidden;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .fl-stars {
          position: absolute; inset: 0;
          pointer-events: none;
          opacity: 0.4;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.85), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.5),  transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.6), transparent 100%),
            radial-gradient(0.8px 0.8px at 64% 88%, rgba(255,255,255,0.4), transparent 100%),
            radial-gradient(1px 1px at 92% 56%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 50% 8%, rgba(94,234,212,0.7), transparent 100%);
          background-size: 320px 320px;
          background-repeat: repeat;
        }
        .fl-inner {
          position: relative;
          max-width: 84rem;
          margin: 0 auto;
        }
        .fl-head { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.75rem; }
        .fl-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase; color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.5);
        }
        .fl-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 10px rgba(94,234,212,0.7);
          animation: fl-pulse 1.6s ease-in-out infinite;
        }
        @keyframes fl-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .fl-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4.2vw, 2.8rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.05;
        }
        .fl-title em {
          font-style: italic;
          color: #5eead4;
          text-shadow: 0 0 18px rgba(94,234,212,0.35);
        }
        .fl-sub {
          font-size: 0.92rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
          max-width: 36rem;
        }

        /* Grid */
        .fl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
          gap: 0.85rem;
        }
        @media (min-width: 1100px) {
          .fl-grid { grid-template-columns: repeat(6, 1fr); }
        }

        .fl-card {
          --accent: #5eead4;
          position: relative;
          display: block;
          border-radius: 0.7rem;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
          background: #06070d;
          box-shadow:
            0 14px 36px rgba(0,0,0,0.4),
            inset 0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.25, 1),
                      box-shadow 0.3s,
                      border-color 0.3s;
        }
        .fl-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--accent) 50%, transparent);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.55),
            0 0 0 1px var(--accent),
            0 0 28px color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .fl-cover {
          position: relative;
          aspect-ratio: 3 / 4;
          background:
            radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
            #06070d;
          overflow: hidden;
        }

        /* Skeleton state */
        .fl-card-skeleton .fl-cover {
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent),
            #06070d;
          background-size: 220% 100%, 100% 100%;
          animation: fl-shimmer 1.6s ease-in-out infinite;
        }
        @keyframes fl-shimmer {
          0%   { background-position: -120% 0, 0 0; }
          100% { background-position: 220% 0, 0 0; }
        }

        /* "?" more card */
        .fl-card-more { border-style: dashed; }
        .fl-cover-more {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.4rem 1rem 1.1rem;
        }
        .fl-more-mark {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(4rem, 8vw, 5.5rem);
          font-weight: 600;
          color: color-mix(in srgb, var(--accent) 55%, transparent);
          line-height: 1;
          margin: 1rem auto 0;
          text-shadow: 0 0 30px color-mix(in srgb, var(--accent) 30%, transparent);
        }
        .fl-more-overlay {
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .fl-more-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .fl-more-text {
          font-size: 0.75rem;
          color: rgba(148,163,184,0.85);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}

function FacultyCard({
  faculty,
  order,
  accent,
  mascot,
}: {
  faculty: FacultyRow;
  order: number;
  accent: string;
  mascot: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hover, setHover] = useState(false);

  const courseHref = `/courses`; // (could deep-link per faculty later)

  function onEnter() {
    setHover(true);
    if (videoRef.current && faculty.introVideoUrl) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  }
  function onLeave() {
    setHover(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <Link
      href={courseHref}
      className="fc-card"
      style={{ ["--accent" as string]: accent }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="fc-cover">
        {faculty.introVideoUrl && (
          <video
            ref={videoRef}
            src={faculty.introVideoUrl}
            className={`fc-video ${hover ? "is-active" : ""}`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        {faculty.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faculty.imageUrl}
            alt={faculty.name}
            className={`fc-poster ${hover && faculty.introVideoUrl ? "is-faded" : ""}`}
          />
        ) : (
          <div className="fc-poster-fallback">
            <span className="fc-mascot">{mascot}</span>
          </div>
        )}

        <div className="fc-chip">
          <span className="fc-chip-num">0{order}</span>
          <span className="fc-chip-tag">{faculty.subjectShort}</span>
        </div>

        <div className="fc-overlay">
          <h3 className="fc-name">{faculty.name}</h3>
          <p className="fc-tagline">"{faculty.tagline}"</p>
        </div>
      </div>

      <style>{`
        .fc-card {
          --accent: #5eead4;
          display: block;
          position: relative;
          border-radius: 0.7rem;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          background: #06070d;
          box-shadow:
            0 14px 36px rgba(0,0,0,0.4),
            inset 0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.25, 1),
                      box-shadow 0.3s,
                      border-color 0.3s;
        }
        .fc-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--accent) 55%, transparent);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.55),
            0 0 0 1px var(--accent),
            0 0 28px color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .fc-cover {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #06070d;
        }
        .fc-poster, .fc-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.4s, transform 0.5s ease;
        }
        .fc-poster { z-index: 2; }
        .fc-poster.is-faded { opacity: 0; }
        .fc-video { z-index: 1; opacity: 0; }
        .fc-video.is-active { opacity: 1; }
        .fc-card:hover .fc-poster:not(.is-faded) { transform: scale(1.04); }
        .fc-card:hover .fc-video { transform: scale(1.04); }

        .fc-poster-fallback {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background:
            radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%),
            #06070d;
          z-index: 2;
        }
        .fc-mascot { font-size: 3rem; opacity: 0.6; }

        .fc-chip {
          position: absolute;
          top: 0.55rem; left: 0.55rem;
          z-index: 4;
          display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.22rem 0.45rem;
          border-radius: 0.32rem;
          background: rgba(8,10,16,0.7);
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
          backdrop-filter: blur(8px);
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .fc-chip-num { color: var(--accent); }
        .fc-chip-tag { color: rgba(255,255,255,0.85); }

        .fc-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          z-index: 4;
          padding: 0.8rem 0.8rem 0.85rem;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.95) 100%);
        }
        .fc-name {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.08rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          letter-spacing: -0.005em;
          line-height: 1.15;
        }
        .fc-tagline {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: 0.74rem;
          color: color-mix(in srgb, var(--accent) 85%, white 15%);
          margin: 0.2rem 0 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .fc-card, .fc-poster, .fc-video { transition: none; }
          .fc-card:hover { transform: none; }
        }
      `}</style>
    </Link>
  );
}
