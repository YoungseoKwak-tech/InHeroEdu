"use client";

/**
 * AuthorChip — InHero's canonical "this is who said this" line.
 * Used on lounge posts, club rooms, member directories.
 *
 * Format: {handle} · {badge1} · {badge2} · '{grad_year}
 */

import Link from "next/link";
import { getBadgeMeta, type BadgeMeta } from "@/lib/trajectory";

interface MentorMini {
  university: string;
  universityRole: string;
}

interface Props {
  handle: string;
  graduationYear?: number | null;
  badges?: { type: string }[];
  mentor?: MentorMini | null;
  size?: "sm" | "md";
  link?: boolean;          // wrap in Link → /trajectory/[handle]
}

export default function AuthorChip({
  handle,
  graduationYear,
  badges = [],
  mentor,
  size = "md",
  link = true,
}: Props) {
  const resolvedBadges: BadgeMeta[] = badges
    .map((b) => getBadgeMeta(b.type))
    .filter((b): b is BadgeMeta => Boolean(b))
    .slice(0, 2);

  const yearShort = graduationYear ? `'${String(graduationYear).slice(-2)}` : null;

  const inner = (
    <span className={`ac-root ac-${size} ${mentor ? "ac-is-mentor" : ""}`}>
      <span className="ac-handle">{handle}</span>
      {mentor && (
        <span className="ac-mentor" title={`${mentor.university} · ${mentor.universityRole}`}>
          <span className="ac-mentor-glyph">★</span>
          <span className="ac-mentor-label">
            MENTOR · {mentor.universityRole}
          </span>
        </span>
      )}
      {resolvedBadges.map((b) => (
        <span
          key={b.id}
          className="ac-badge"
          style={{ ["--accent" as string]: b.accent }}
          title={b.blurb}
        >
          <span className="ac-badge-glyph">{b.glyph}</span>
          <span className="ac-badge-label">{b.short}</span>
        </span>
      ))}
      {yearShort && <span className="ac-year">{yearShort}</span>}

      <style>{`
        .ac-root {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.2;
          color: #d8d9e6;
        }
        .ac-sm { font-size: 0.72rem; gap: 0.35rem; }
        .ac-md { font-size: 0.85rem; }

        .ac-handle {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-weight: 600;
          color: #f3f3fb;
          letter-spacing: -0.005em;
        }
        .ac-sm .ac-handle { font-size: 0.85rem; }
        .ac-md .ac-handle { font-size: 1rem; }
        .ac-is-mentor .ac-handle {
          color: #F4C95D;
          text-shadow: 0 0 12px rgba(244,201,93,0.25);
        }

        .ac-mentor {
          display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.16rem 0.5rem;
          border-radius: 0.3rem;
          background: linear-gradient(90deg, rgba(244,201,93,0.18), rgba(244,201,93,0.06));
          border: 1px solid rgba(244,201,93,0.55);
          color: #F4C95D;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          white-space: nowrap;
          line-height: 1;
          text-shadow: 0 0 6px rgba(244,201,93,0.4);
          box-shadow: 0 0 10px rgba(244,201,93,0.15);
        }
        .ac-sm .ac-mentor { font-size: 0.5rem; padding: 0.12rem 0.4rem; }
        .ac-mentor-glyph {
          font-size: 0.85em;
          text-shadow: 0 0 8px rgba(244,201,93,0.7);
        }

        .ac-badge {
          --accent: #5eead4;
          display: inline-flex;
          align-items: center;
          gap: 0.28rem;
          padding: 0.12rem 0.42rem;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          color: color-mix(in srgb, var(--accent) 85%, white 15%);
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          white-space: nowrap;
          line-height: 1;
        }
        .ac-sm .ac-badge { font-size: 0.55rem; padding: 0.1rem 0.36rem; }
        .ac-badge-glyph {
          font-size: 0.78em;
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 60%, transparent);
        }
        .ac-badge-label { letter-spacing: 0.08em; text-transform: uppercase; }

        .ac-year {
          font-family: ui-monospace, monospace;
          font-size: 0.7em;
          color: rgba(148, 163, 184, 0.65);
          letter-spacing: 0.05em;
        }
      `}</style>
    </span>
  );

  return link ? (
    <Link href={`/trajectory/${encodeURIComponent(handle)}`} className="ac-link">
      {inner}
      <style>{`
        .ac-link { text-decoration: none; color: inherit; }
        .ac-link:hover .ac-handle { text-decoration: underline; text-decoration-color: rgba(94,234,212,0.4); text-underline-offset: 3px; }
      `}</style>
    </Link>
  ) : inner;
}
