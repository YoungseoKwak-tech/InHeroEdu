import type { Metadata } from "next";
import MySpaceTabs from "@/components/my-space/MySpaceTabs";

export const metadata: Metadata = {
  title: "My Space — InHero",
  description: "Your personal archive: saved resources, reactions, and AI study brief.",
};

export default function MySpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ms-root">
      <header className="ms-head">
        <div className="ms-eyebrow">MY SPACE</div>
        <h1 className="ms-title">Your archive, your way.</h1>
        <p className="ms-sub">
          Everything you&apos;ve saved, reacted to, or had surfaced for you — one private feed.
        </p>
        <div className="ms-tabs-row">
          <MySpaceTabs />
        </div>
      </header>
      {children}
      <style>{`
        .ms-root {
          --accent: #5eead4;
          --gold: #f4c95d;
          min-height: calc(100vh - 4rem);
          padding: 2rem 1.5rem 4rem;
          color: #d8d9e6;
          font-family: Inter, Space Grotesk, system-ui, sans-serif;
          max-width: 100%;
          margin: 0;
        }
        @media (max-width: 760px) {
          .ms-root { padding: 1.25rem 0.85rem 3rem; }
        }
        .ms-head { margin-bottom: 1.4rem; }
        .ms-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--accent);
          margin-bottom: 0.4rem;
        }
        .ms-title {
          font-family: Cormorant Garamond, serif;
          font-size: 2.1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #f3f3fb;
          margin: 0;
        }
        .ms-sub {
          max-width: 56ch;
          margin: 0.4rem 0 1rem;
          font-size: 0.92rem;
          line-height: 1.55;
          color: rgba(216, 217, 230, 0.78);
        }
        .ms-tabs-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
