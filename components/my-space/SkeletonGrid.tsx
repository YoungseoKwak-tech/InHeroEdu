"use client";

// Deterministic per-index heights — Math.random() during render would
// produce SSR/CSR divergence and trip React #425. The library page uses
// the same constants for its shimmer grid, so the two surfaces stay
// visually consistent during loads.
const SHIMMER_HEIGHTS = [180, 220, 260, 300, 240, 200, 280, 260];

interface Props {
  /** How many shimmer cards to render. Default: 8. */
  count?: number;
}

export default function SkeletonGrid({ count = 8 }: Props) {
  return (
    <section className="sg">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sg-card"
          style={{ height: SHIMMER_HEIGHTS[i % SHIMMER_HEIGHTS.length] }}
        />
      ))}
      <style jsx>{`
        .sg {
          column-width: 280px;
          column-gap: 1rem;
        }
        @media (max-width: 760px) {
          .sg { column-width: 160px; column-gap: 0.6rem; }
        }
        .sg-card {
          break-inside: avoid;
          margin-bottom: 1rem;
          background: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0.04) 30%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.04) 70%
          );
          background-size: 220% 100%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0.7rem;
          animation: sg-pulse 1.4s ease-in-out infinite;
        }
        @keyframes sg-pulse {
          0% { background-position: 220% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </section>
  );
}
