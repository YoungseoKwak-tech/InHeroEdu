"use client";

import { useEffect, useRef, useState } from "react";
import type { FacultyWithAssets } from "@/lib/facultyAssets";

interface Props {
  faculty: FacultyWithAssets[];
}

export default function ClassroomGrid({ faculty }: Props) {
  const [playing, setPlaying] = useState<FacultyWithAssets | null>(null);

  return (
    <>
      <div className="cg-grid">
        {faculty.map((f, idx) => (
          <ClassroomCard
            key={f.id}
            faculty={f}
            order={idx + 1}
            onPlay={() => setPlaying(f)}
          />
        ))}
      </div>
      <VideoLightbox faculty={playing} onClose={() => setPlaying(null)} />
      <style>{CG_STYLES}</style>
    </>
  );
}

function ClassroomCard({
  faculty,
  order,
  onPlay,
}: {
  faculty: FacultyWithAssets;
  order: number;
  onPlay: () => void;
}) {
  const hasVideo = !!faculty.introVideoUrl;
  const hasImage = !!faculty.imageUrl;

  return (
    <button
      type="button"
      onClick={() => { if (hasVideo) onPlay(); }}
      className="cg-card"
      style={{
        ["--accent" as string]: faculty.accent,
        ["--bg" as string]: faculty.bg,
      }}
      disabled={!hasVideo}
      aria-label={`Play ${faculty.name} intro video`}
    >
      <div className="cg-cover">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faculty.imageUrl ?? undefined}
            alt={faculty.name}
            className="cg-poster"
          />
        ) : (
          <div className="cg-poster-fallback">
            <span className="cg-mascot">{faculty.mascotEmoji}</span>
          </div>
        )}

        {/* Top-left chip */}
        <div className="cg-chip">
          <span className="cg-chip-num">0{order}</span>
          <span className="cg-chip-tag">{faculty.subjectShort}</span>
        </div>

        {/* Play icon — only if video exists */}
        {hasVideo && (
          <div className="cg-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Bottom gradient + label */}
        <div className="cg-overlay">
          <h3 className="cg-name">{faculty.name}</h3>
          <p className="cg-tagline">"{faculty.tagline}"</p>
        </div>
      </div>
    </button>
  );
}

function VideoLightbox({
  faculty,
  onClose,
}: {
  faculty: FacultyWithAssets | null;
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
    <div className="cgvl-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cgvl-shell" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cgvl-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="cgvl-header">
          <div className="cgvl-eyebrow">{faculty.subjectShort}</div>
          <h3 className="cgvl-name">{faculty.name}</h3>
          <p className="cgvl-tagline">"{faculty.tagline}"</p>
        </div>
        <video
          ref={videoRef}
          src={faculty.introVideoUrl}
          className="cgvl-video"
          controls
          autoPlay
          playsInline
        />
      </div>
      <style>{CGVL_STYLES}</style>
    </div>
  );
}

const CG_STYLES = `
  .cg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.2rem;
  }

  .cg-card {
    --accent: #5eead4;
    --bg: #0a0e1a;
    display: block;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    background: var(--bg);
    border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
    box-shadow:
      0 18px 48px rgba(0,0,0,0.45),
      inset 0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent);
    cursor: pointer;
    padding: 0;
    color: inherit;
    text-align: left;
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.25, 1),
                box-shadow 0.35s,
                border-color 0.35s;
  }
  .cg-card:disabled { cursor: default; }
  .cg-card:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.01);
    border-color: color-mix(in srgb, var(--accent) 45%, transparent);
    box-shadow:
      0 28px 60px rgba(0,0,0,0.55),
      0 0 0 1px var(--accent),
      0 0 36px color-mix(in srgb, var(--accent) 35%, transparent);
  }

  .cg-cover {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: var(--bg);
  }

  .cg-poster {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .cg-card:hover:not(:disabled) .cg-poster { transform: scale(1.04); }

  .cg-poster-fallback {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%),
      var(--bg);
  }
  .cg-mascot { font-size: 4rem; opacity: 0.6; }

  .cg-chip {
    position: absolute;
    top: 0.8rem; left: 0.8rem;
    z-index: 4;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.55rem;
    border-radius: 0.4rem;
    background: rgba(8, 10, 16, 0.7);
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
    backdrop-filter: blur(8px);
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .cg-chip-num { color: var(--accent); text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 60%, transparent); }
  .cg-chip-tag { color: rgba(255,255,255,0.85); }

  /* Play icon overlay */
  .cg-play {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    width: 4rem; height: 4rem;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(8,10,16,0.65);
    border: 1.5px solid var(--accent);
    color: var(--accent);
    backdrop-filter: blur(6px);
    box-shadow: 0 0 28px color-mix(in srgb, var(--accent) 40%, transparent);
    transition: transform 0.25s ease, background 0.25s, color 0.25s;
  }
  .cg-card:hover:not(:disabled) .cg-play {
    transform: translate(-50%, -50%) scale(1.1);
    background: var(--accent);
    color: #0a0a0a;
  }
  .cg-play svg { display: block; margin-left: 4px; }

  .cg-overlay {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    z-index: 4;
    padding: 1rem 1rem 1.05rem;
    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.95) 100%);
    display: flex; flex-direction: column; gap: 0.35rem;
  }
  .cg-name {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.005em;
    line-height: 1.15;
  }
  .cg-tagline {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-style: italic;
    font-size: 0.88rem;
    color: color-mix(in srgb, var(--accent) 80%, white 20%);
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .cg-card, .cg-poster, .cg-play { transition: none; }
    .cg-card:hover:not(:disabled) { transform: none; }
    .cg-card:hover:not(:disabled) .cg-poster { transform: none; }
    .cg-card:hover:not(:disabled) .cg-play { transform: translate(-50%, -50%); }
  }
`;

const CGVL_STYLES = `
  .cgvl-backdrop {
    position: fixed; inset: 0;
    z-index: 80;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: cgvl-fade 0.2s ease-out;
  }
  @keyframes cgvl-fade { from { opacity: 0; } to { opacity: 1; } }

  .cgvl-shell {
    position: relative;
    width: min(960px, 100%);
    background: #06070d;
    border: 1px solid rgba(94,234,212,0.2);
    border-radius: 0.85rem;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    display: flex; flex-direction: column;
  }
  .cgvl-close {
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
  .cgvl-close:hover { background: rgba(255,107,91,0.4); color: #fff; }

  .cgvl-header {
    padding: 1rem 1.25rem 0.85rem;
    display: flex; flex-direction: column; gap: 0.2rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .cgvl-eyebrow {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5eead4;
  }
  .cgvl-name {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.015em;
  }
  .cgvl-tagline {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-style: italic;
    font-size: 0.92rem;
    color: rgba(148,163,184,0.85);
    margin: 0;
  }

  .cgvl-video {
    width: 100%;
    max-height: 70vh;
    background: #000;
    display: block;
  }
`;
