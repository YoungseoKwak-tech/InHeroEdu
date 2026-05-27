"use client";

/**
 * FacultyLineup — landing-page teaser.
 * Cards show the illustration as a static thumbnail (or a styled
 * placeholder if none yet). Clicking a card opens a video lightbox.
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

// Where each instructor's "Enter [Subject]" CTA leads, plus the
// label rendered on the button. Slug must match a /courses/<id>
// route (or a known alias from lib/courseAliases.ts).
const CLASSROOM: Record<string, { slug: string; label: string }> = {
  coulomb:  { slug: "ap-chemistry",   label: "AP Chemistry" },
  lhopital: { slug: "ap-calculus-ab", label: "AP Calculus" },
  vacuum:   { slug: "ap-physics-1",   label: "AP Physics" },
  osmosis:  { slug: "ap-biology",     label: "AP Biology" },
  julian:   { slug: "ap-us-history",  label: "AP History" },
  evidence: { slug: "sat-reading",    label: "SAT R&W" },
};

export default function FacultyLineup() {
  const [rows, setRows] = useState<FacultyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<FacultyRow | null>(null);
  const [showPrincipal, setShowPrincipal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/faculty", { cache: "no-store" });
        const json = await res.json();
        if (json.ok && Array.isArray(json.faculty)) {
          setRows(json.faculty as FacultyRow[]);
        }
      } catch {
        // silent
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
        <header className="fl-head">
          <div className="fl-eyebrow">
            <span className="fl-pulse" />
            <span>THE FACULTY · WAVE 01 / VI</span>
          </div>
          <h2 className="fl-title">Meet the <em>instructors</em>.</h2>
          <p className="fl-sub">
            Six personas. Each one would die on their subject's hill. New instructor joining the roster every week.
          </p>
        </header>

        <div className="fl-grid">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="fc-card fc-card-skeleton" style={{ ["--accent" as string]: "#5eead4" }}>
                  <div className="fc-cover" />
                </div>
              ))
            : featured.map((f, idx) => (
                <FacultyCard
                  key={f.id}
                  faculty={f}
                  order={idx + 1}
                  accent={ACCENT[f.id] ?? "#5eead4"}
                  mascot={MASCOT[f.id] ?? "✦"}
                  classroom={CLASSROOM[f.id] ?? null}
                  onPlay={() => setPlaying(f)}
                />
              ))}

          {/* The Unseen Principal — clickable redacted silhouette */}
          <button
            type="button"
            onClick={() => setShowPrincipal(true)}
            className="fc-card fc-card-principal"
            style={{ ["--accent" as string]: "#E5E7EB" }}
            aria-label="The Unseen Principal"
          >
            <div className="fc-cover fc-cover-principal">
              <div className="fc-principal-frame">
                <div className="fc-principal-silhouette">
                  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {/* Academic gown silhouette */}
                    <defs>
                      <radialGradient id="prinHead" cx="50%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#22222b" />
                        <stop offset="100%" stopColor="#0a0a10" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="100" cy="92" rx="48" ry="56" fill="url(#prinHead)" />
                    <path
                      d="M 30 240 Q 30 160 100 150 Q 170 160 170 240 Z"
                      fill="#0a0a10"
                    />
                    {/* Hand on chin — accent */}
                    <path
                      d="M 92 145 Q 95 140 105 142 L 108 152 Q 102 156 95 152 Z"
                      fill="#1a1a22"
                    />
                  </svg>
                </div>
                <div className="fc-principal-label">
                  <div className="fc-principal-name">THE UNSEEN PRINCIPAL</div>
                  <div className="fc-principal-sub">IVY LEAGUE LEGEND, [REDACTED] STUDENT</div>
                </div>
              </div>
            </div>
          </button>

          {/* "?" — more arriving */}
          <Link href="/courses" className="fc-card fc-card-more" style={{ ["--accent" as string]: "#5eead4" }}>
            <div className="fc-cover fc-cover-more">
              <span className="fc-more-mark">?</span>
              <div className="fc-more-overlay">
                <div className="fc-more-tag">NEW · EVERY WEEK</div>
                <div className="fc-more-text">
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

      <VideoLightbox faculty={playing} onClose={() => setPlaying(null)} />
      {showPrincipal && <PrincipalModal onClose={() => setShowPrincipal(false)} />}

      <style>{FL_STYLES}</style>
    </section>
  );
}

function PrincipalModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="pm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pm-shell" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pm-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="pm-stamp">CLASSIFIED · LEVEL 5</div>
        <div className="pm-silhouette">
          <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="100" cy="92" rx="48" ry="56" fill="#0a0a10" />
            <path d="M 30 240 Q 30 160 100 150 Q 170 160 170 240 Z" fill="#0a0a10" />
          </svg>
        </div>
        <h3 className="pm-title">The Principal is unavailable.</h3>
        <p className="pm-body">
          Currently reconstructing logic structures inside the engineering library.
          <span className="pm-divider"> · </span>
          Do not disturb.
        </p>
        <div className="pm-meta">
          <div className="pm-meta-row"><span className="pm-k">ALIAS</span><span className="pm-v">[REDACTED]</span></div>
          <div className="pm-meta-row"><span className="pm-k">EDU</span><span className="pm-v">IVY LEAGUE · ENGINEERING</span></div>
          <div className="pm-meta-row"><span className="pm-k">ROLE</span><span className="pm-v">THE ARCHITECT — original Korean logic source</span></div>
          <div className="pm-meta-row"><span className="pm-k">STATUS</span><span className="pm-v"><span className="pm-pulse" /> Reconstructing axioms</span></div>
        </div>
        <p className="pm-footer">교장 선생님은 지금 코넬 엔지니어링 도서관에서 로직 구조를 재건축 중입니다. 방해 금지.</p>
      </div>
      <style>{PM_STYLES}</style>
    </div>
  );
}

function FacultyCard({
  faculty,
  order,
  accent,
  mascot,
  classroom,
  onPlay,
}: {
  faculty: FacultyRow;
  order: number;
  accent: string;
  mascot: string;
  classroom: { slug: string; label: string } | null;
  onPlay: () => void;
}) {
  const canPlay = !!faculty.introVideoUrl;
  return (
    <div className="fc-wrap" style={{ ["--accent" as string]: accent }}>
      <button
        type="button"
        onClick={() => { if (canPlay) onPlay(); }}
        className="fc-card"
        disabled={!canPlay}
        aria-label={`Play ${faculty.name} intro video`}
      >
        <div className="fc-cover">
          {faculty.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={faculty.imageUrl} alt={faculty.name} className="fc-poster" />
          ) : (
            <div className="fc-poster-fallback">
              <span className="fc-mascot">{mascot}</span>
            </div>
          )}

          <div className="fc-chip">
            <span className="fc-chip-num">0{order}</span>
            <span className="fc-chip-tag">{faculty.subjectShort}</span>
          </div>

          {/* Play icon — only if video exists */}
          {canPlay && (
            <div className="fc-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}

          <div className="fc-overlay">
            <h3 className="fc-name">{faculty.name}</h3>
            <p className="fc-tagline">"{faculty.tagline}"</p>
          </div>
        </div>
      </button>

      {classroom && (
        <Link
          href={`/courses/${classroom.slug}`}
          className="fc-enter"
          aria-label={`Enter ${classroom.label} classroom`}
        >
          <span>ENTER {classroom.label.toUpperCase()}</span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

function VideoLightbox({
  faculty,
  onClose,
}: {
  faculty: FacultyRow | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!faculty) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [faculty, onClose]);

  if (!faculty || !faculty.introVideoUrl) return null;

  return (
    <div className="vl-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vl-shell" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="vl-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="vl-header">
          <div className="vl-eyebrow">{faculty.subjectShort}</div>
          <h3 className="vl-name">{faculty.name}</h3>
          <p className="vl-tagline">"{faculty.tagline}"</p>
        </div>
        <video
          ref={videoRef}
          src={faculty.introVideoUrl}
          className="vl-video"
          controls
          autoPlay
          playsInline
        />
      </div>
      <style>{VL_STYLES}</style>
    </div>
  );
}

const FL_STYLES = `
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
  }
  .fl-inner { position: relative; max-width: 84rem; margin: 0 auto; }

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
    font-weight: 600; color: #f3f3fb; margin: 0;
    letter-spacing: -0.02em; line-height: 1.05;
  }
  .fl-title em { font-style: italic; color: #5eead4; text-shadow: 0 0 18px rgba(94,234,212,0.35); }
  .fl-sub { font-size: 0.92rem; color: #94a3b8; margin: 0; line-height: 1.5; max-width: 36rem; }

  .fl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 0.85rem;
  }
  @media (min-width: 1100px) {
    .fl-grid { grid-template-columns: repeat(6, 1fr); }
  }

  /* Card wrapper holds the video-launch button + the classroom CTA */
  .fc-wrap {
    --accent: #5eead4;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Classroom CTA — sits under each instructor card */
  .fc-enter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.55rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
    background: color-mix(in srgb, var(--accent) 8%, rgba(8, 10, 16, 0.7));
    color: color-mix(in srgb, var(--accent) 90%, white 10%);
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, box-shadow 0.25s, transform 0.2s;
  }
  .fc-enter:hover {
    background: color-mix(in srgb, var(--accent) 22%, rgba(8, 10, 16, 0.85));
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent), 0 0 16px color-mix(in srgb, var(--accent) 30%, transparent);
    transform: translateY(-1px);
  }
  .fc-enter:hover > span:last-child { transform: translateX(2px); }
  .fc-enter > span:last-child { transition: transform 0.2s; }

  /* Card */
  .fc-card {
    --accent: #5eead4;
    position: relative;
    display: block;
    border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
    border-radius: 0.7rem;
    overflow: hidden;
    background: #06070d;
    padding: 0;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    box-shadow:
      0 14px 36px rgba(0,0,0,0.4),
      inset 0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent);
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.25, 1),
                box-shadow 0.3s, border-color 0.3s;
  }
  .fc-card:disabled { cursor: default; }
  .fc-card:hover:not(:disabled) {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow:
      0 22px 50px rgba(0,0,0,0.55),
      0 0 0 1px var(--accent),
      0 0 28px color-mix(in srgb, var(--accent) 35%, transparent);
  }

  .fc-card-skeleton { pointer-events: none; }
  .fc-card-skeleton .fc-cover {
    background:
      linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent),
      #06070d;
    background-size: 220% 100%, 100% 100%;
    animation: fc-shimmer 1.6s ease-in-out infinite;
  }
  @keyframes fc-shimmer {
    0% { background-position: -120% 0, 0 0; }
    100% { background-position: 220% 0, 0 0; }
  }

  .fc-cover {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background:
      radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
      #06070d;
  }
  .fc-poster {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.5s ease;
  }
  .fc-card:hover:not(:disabled) .fc-poster { transform: scale(1.04); }

  .fc-poster-fallback {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%),
      #06070d;
  }
  .fc-mascot { font-size: 3.2rem; opacity: 0.65; }

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

  /* Play overlay */
  .fc-play {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    width: 3.2rem; height: 3.2rem;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(8,10,16,0.65);
    border: 1.5px solid var(--accent);
    color: var(--accent);
    backdrop-filter: blur(6px);
    box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 40%, transparent);
    transition: transform 0.25s ease, background 0.25s, color 0.25s;
  }
  .fc-card:hover:not(:disabled) .fc-play {
    transform: translate(-50%, -50%) scale(1.1);
    background: var(--accent);
    color: #0a0a0a;
  }
  .fc-play svg { display: block; margin-left: 3px; }

  .fc-overlay {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    z-index: 4;
    padding: 0.8rem 0.85rem 0.85rem;
    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.95) 100%);
    text-align: left;
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

  /* Principal card — old-photo / yearbook frame */
  .fc-card-principal {
    background: #f1ece2;
    border: 1px solid rgba(229, 231, 235, 0.4);
    box-shadow:
      0 14px 36px rgba(0,0,0,0.5),
      inset 0 0 0 6px #f1ece2,
      inset 0 0 0 7px rgba(0,0,0,0.15);
  }
  .fc-card-principal:hover:not(:disabled) {
    box-shadow:
      0 22px 48px rgba(0,0,0,0.6),
      inset 0 0 0 6px #f1ece2,
      inset 0 0 0 7px rgba(0,0,0,0.25),
      0 0 0 1px #fff,
      0 0 24px rgba(255,255,255,0.2);
    border-color: rgba(255, 255, 255, 0.65);
  }
  .fc-cover-principal {
    background: linear-gradient(180deg, #dcd3c1 0%, #c5bba8 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem 0.8rem 0.8rem;
    color: #111;
  }
  .fc-principal-frame {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .fc-principal-silhouette {
    width: 65%;
    aspect-ratio: 1 / 1.2;
    border-radius: 50%;
    overflow: hidden;
    background: radial-gradient(circle at 50% 30%, #2a2a32 0%, #0a0a10 100%);
    border: 4px solid #f1ece2;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.5);
    margin-bottom: 0.4rem;
  }
  .fc-principal-silhouette svg { width: 100%; height: 100%; display: block; }
  .fc-principal-label {
    text-align: center;
    width: 100%;
    padding-top: 0.3rem;
    border-top: 1px solid rgba(0,0,0,0.2);
  }
  .fc-principal-name {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #1a1a22;
    margin-bottom: 0.18rem;
  }
  .fc-principal-sub {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.16em;
    color: #555;
    line-height: 1.3;
  }

  /* "?" more card */
  .fc-card-more { border-style: dashed; }
  .fc-cover-more {
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 1.4rem 1rem 1.1rem;
    align-items: stretch;
  }
  .fc-more-mark {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(4rem, 8vw, 5.5rem);
    font-weight: 600;
    color: color-mix(in srgb, var(--accent) 55%, transparent);
    line-height: 1;
    margin: 1rem auto 0;
    text-shadow: 0 0 30px color-mix(in srgb, var(--accent) 30%, transparent);
    align-self: center;
  }
  .fc-more-overlay { display: flex; flex-direction: column; gap: 0.4rem; text-align: left; }
  .fc-more-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .fc-more-text {
    font-size: 0.75rem;
    color: rgba(148,163,184,0.85);
    line-height: 1.45;
  }

  /* Footer */
  .fl-foot { margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
  .fl-cta {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 0.6rem 1rem;
    border: 1px solid rgba(94,234,212,0.5);
    background: rgba(94,234,212,0.06);
    color: #5eead4;
    border-radius: 0.45rem;
    text-decoration: none;
    transition: background 0.15s, box-shadow 0.2s;
  }
  .fl-cta:hover {
    background: rgba(94,234,212,0.18);
    box-shadow: 0 0 0 1px #5eead4, 0 0 18px rgba(94,234,212,0.4);
  }
  .fl-foot-note {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148,163,184,0.65);
    letter-spacing: 0.04em;
  }

  @media (prefers-reduced-motion: reduce) {
    .fc-card, .fc-poster, .fc-play { transition: none; }
    .fc-card:hover:not(:disabled) { transform: none; }
    .fc-card:hover:not(:disabled) .fc-poster { transform: none; }
    .fc-card:hover:not(:disabled) .fc-play { transform: translate(-50%, -50%); }
  }
`;

const VL_STYLES = `
  .vl-backdrop {
    position: fixed; inset: 0;
    z-index: 80;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: vl-fade 0.2s ease-out;
  }
  @keyframes vl-fade { from { opacity: 0; } to { opacity: 1; } }

  .vl-shell {
    position: relative;
    width: min(960px, 100%);
    background: #06070d;
    border: 1px solid rgba(94,234,212,0.2);
    border-radius: 0.85rem;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    display: flex; flex-direction: column;
  }
  .vl-close {
    position: absolute;
    top: 0.7rem; right: 0.7rem;
    z-index: 4;
    width: 2rem; height: 2rem;
    border-radius: 50%;
    border: 0;
    background: rgba(8,10,16,0.7);
    color: rgba(255,255,255,0.85);
    cursor: pointer;
    font-size: 0.85rem;
    line-height: 1;
    backdrop-filter: blur(8px);
    transition: background 0.15s;
  }
  .vl-close:hover { background: rgba(255,107,91,0.4); color: #fff; }

  .vl-header {
    padding: 1rem 1.25rem 0.85rem;
    display: flex; flex-direction: column; gap: 0.2rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .vl-eyebrow {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5eead4;
  }
  .vl-name {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.015em;
  }
  .vl-tagline {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-style: italic;
    font-size: 0.92rem;
    color: rgba(148,163,184,0.85);
    margin: 0;
  }

  .vl-video {
    width: 100%;
    max-height: 70vh;
    background: #000;
    display: block;
  }
`;

const PM_STYLES = `
  .pm-backdrop {
    position: fixed; inset: 0;
    z-index: 90;
    background: rgba(0,0,0,0.86);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: pm-fade 0.25s ease-out;
  }
  @keyframes pm-fade { from { opacity: 0; } to { opacity: 1; } }
  .pm-shell {
    position: relative;
    width: min(28rem, 100%);
    background: linear-gradient(180deg, #131318 0%, #08080d 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0.85rem;
    padding: 1.5rem 1.4rem 1.4rem;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7);
    text-align: center;
    color: #d8d9e6;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .pm-close {
    position: absolute;
    top: 0.7rem; right: 0.7rem;
    width: 1.8rem; height: 1.8rem;
    border-radius: 50%;
    border: 0;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    font-size: 0.78rem;
    transition: background 0.15s;
  }
  .pm-close:hover { background: rgba(255,107,91,0.35); color: #fff; }
  .pm-stamp {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #ff6b5b;
    margin-bottom: 1rem;
    padding: 0.25rem 0.65rem;
    border: 1px dashed rgba(255,107,91,0.4);
    border-radius: 0.3rem;
    display: inline-block;
    transform: rotate(-2deg);
  }
  .pm-silhouette {
    width: 7rem; height: 7rem;
    margin: 0.4rem auto 1rem;
    border-radius: 50%;
    overflow: hidden;
    background: radial-gradient(circle at 50% 30%, #1a1a22 0%, #050508 100%);
    border: 2px solid rgba(255,255,255,0.08);
  }
  .pm-silhouette svg { width: 100%; height: 100%; }
  .pm-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0 0 0.55rem;
    letter-spacing: -0.01em;
    font-style: italic;
  }
  .pm-body {
    font-size: 0.88rem;
    color: rgba(216, 217, 230, 0.85);
    line-height: 1.55;
    margin: 0 0 1.1rem;
  }
  .pm-divider { color: rgba(255,255,255,0.3); }
  .pm-meta {
    display: flex;
    flex-direction: column;
    gap: 0.32rem;
    padding: 0.75rem;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0.5rem;
    background: rgba(255,255,255,0.02);
    margin-bottom: 1rem;
    text-align: left;
  }
  .pm-meta-row {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
  }
  .pm-k {
    color: rgba(94, 234, 212, 0.85);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
    min-width: 4rem;
  }
  .pm-v { color: rgba(255,255,255,0.9); }
  .pm-pulse {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 8px rgba(94,234,212,0.7);
    margin-right: 0.35rem;
    vertical-align: middle;
    animation: fl-pulse 1.6s ease-in-out infinite;
  }
  .pm-footer {
    font-family: 'Pretendard', system-ui, sans-serif;
    font-size: 0.78rem;
    color: rgba(148, 163, 184, 0.7);
    line-height: 1.5;
    margin: 0;
    padding-top: 0.6rem;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
`;
