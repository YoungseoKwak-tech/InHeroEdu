"use client";

import MySpaceCard, { type MySpaceCardItem } from "@/components/my-space/MySpaceCard";

interface Props {
  title: string;
  description?: string;
  resources: MySpaceCardItem[];
}

/**
 * BriefSection — one themed band of the AI brief. Renders a section
 * heading + description, then a horizontal scroller of resource cards.
 * Each card is the standard MySpaceCard so SaveButton / ReactionPicker
 * stay live inside the brief itself.
 */
export default function BriefSection({ title, description, resources }: Props) {
  if (resources.length === 0) return null;

  return (
    <section className="bs">
      <header className="bs-head">
        <h3 className="bs-title">{title}</h3>
        {description && <p className="bs-desc">{description}</p>}
      </header>
      <div className="bs-scroll">
        {resources.map((r) => (
          <div key={r.id} className="bs-card">
            <MySpaceCard item={r} variant="recommended" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .bs {
          margin-bottom: 2rem;
        }
        .bs-head {
          margin-bottom: 0.7rem;
        }
        .bs-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.25rem;
          letter-spacing: -0.005em;
        }
        .bs-desc {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.5;
          color: rgba(216, 217, 230, 0.75);
          max-width: 56ch;
        }
        .bs-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.4rem 0 0.8rem;
          scroll-snap-type: x proximity;
          scrollbar-width: thin;
        }
        .bs-scroll::-webkit-scrollbar { height: 6px; }
        .bs-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }
        .bs-card {
          flex: 0 0 18rem;
          scroll-snap-align: start;
        }
        @media (max-width: 760px) {
          .bs-card { flex-basis: 14rem; }
        }
      `}</style>
    </section>
  );
}
