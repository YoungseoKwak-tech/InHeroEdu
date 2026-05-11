"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { FacultyWithAssets } from "@/lib/facultyAssets";

interface Props {
  faculty: FacultyWithAssets[];
}

export default function ClassroomGrid({ faculty }: Props) {
  return (
    <div className="cg-grid">
      {faculty.map((f, idx) => (
        <ClassroomCard key={f.id} faculty={f} order={idx + 1} />
      ))}
      <style>{CG_STYLES}</style>
    </div>
  );
}

function ClassroomCard({ faculty, order }: { faculty: FacultyWithAssets; order: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hover, setHover] = useState(false);
  const hasVideo = !!faculty.introVideoUrl;
  const hasImage = !!faculty.imageUrl;
  const courseHref = faculty.courseId ? `/courses/${faculty.courseId}` : "#";

  function onEnter() {
    setHover(true);
    if (videoRef.current && hasVideo) {
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
      className="cg-card"
      style={{
        ["--accent" as string]: faculty.accent,
        ["--bg" as string]: faculty.bg,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Cover (video on hover, illustration default) */}
      <div className="cg-cover">
        {hasVideo && (
          <video
            ref={videoRef}
            src={faculty.introVideoUrl ?? undefined}
            className={`cg-video ${hover ? "is-active" : ""}`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faculty.imageUrl ?? undefined}
            alt={faculty.name}
            className={`cg-poster ${hover && hasVideo ? "is-faded" : ""}`}
          />
        ) : hasVideo ? (
          // Video first-frame underneath is the still — no overlay needed.
          null
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

        {/* Bottom gradient + label */}
        <div className="cg-overlay">
          <h3 className="cg-name">{faculty.name}</h3>
          <p className="cg-tagline">"{faculty.tagline}"</p>
        </div>

        {/* CTA arrow — appears on hover */}
        <div className="cg-cta">
          <span className="cg-cta-text">ENTER CLASSROOM</span>
          <span className="cg-cta-arrow">→</span>
        </div>
      </div>
    </Link>
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
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.25, 1),
                box-shadow 0.35s,
                border-color 0.35s;
    text-decoration: none;
    color: inherit;
  }
  .cg-card:hover {
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

  .cg-poster, .cg-video {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: opacity 0.4s ease, transform 0.5s ease;
  }
  .cg-poster { z-index: 2; }
  .cg-poster.is-faded { opacity: 0; }
  /* Show video's first frame as the default still portrait — hover just plays it. */
  .cg-video { z-index: 1; opacity: 1; }
  .cg-card:hover .cg-poster:not(.is-faded) { transform: scale(1.04); }
  .cg-card:hover .cg-video { transform: scale(1.04); }

  .cg-poster-fallback {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%),
      var(--bg);
    z-index: 2;
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

  .cg-cta {
    position: absolute;
    right: 0.8rem; top: 0.8rem;
    z-index: 4;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.65rem;
    border-radius: 0.4rem;
    background: var(--accent);
    color: #0a0a0a;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.25s, transform 0.25s;
  }
  .cg-card:hover .cg-cta {
    opacity: 1;
    transform: translateY(0);
  }
  .cg-cta-arrow { font-size: 0.8rem; }

  @media (prefers-reduced-motion: reduce) {
    .cg-card, .cg-poster, .cg-video, .cg-cta { transition: none; }
    .cg-card:hover { transform: none; }
  }
`;
