"use client";

import Link from "next/link";

interface Props {
  loungeSlug: string;
  loungeName: string;
  snippet: string;
}

export default function ActiveDiscussionCard({ loungeSlug, loungeName, snippet }: Props) {
  return (
    <Link href={`/lounges/${loungeSlug}`} className="adc">
      <div className="adc-head">
        <span className="adc-glyph" aria-hidden="true">◌</span>
        <span className="adc-name">{loungeName}</span>
      </div>
      <div className="adc-snip">&ldquo;{snippet}&rdquo;</div>
      <style jsx>{`
        .adc {
          flex: 0 0 auto;
          width: 17rem;
          padding: 0.75rem 0.9rem;
          background: rgba(16, 17, 22, 0.7);
          border: 1px solid rgba(94, 234, 212, 0.18);
          border-radius: 0.65rem;
          color: inherit;
          text-decoration: none;
          transition: border-color 0.15s, background 0.15s, transform 0.15s;
        }
        .adc:hover {
          border-color: rgba(94, 234, 212, 0.5);
          background: rgba(94, 234, 212, 0.06);
          transform: translateY(-1px);
        }
        .adc-head {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.35rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(94, 234, 212, 0.9);
        }
        .adc-glyph {
          display: inline-block;
          animation: adc-pulse 1.8s ease-in-out infinite;
        }
        @keyframes adc-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .adc-snip {
          font-size: 0.84rem;
          line-height: 1.45;
          color: rgba(216, 217, 230, 0.85);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Link>
  );
}
