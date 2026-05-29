"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import MySpaceCard, { type MySpaceCardItem } from "@/components/my-space/MySpaceCard";
import SkeletonGrid from "@/components/my-space/SkeletonGrid";

type ReactionType = "heart" | "fire" | "lightbulb" | "pin";
type Filter = "all" | ReactionType;

const FILTERS: { key: Filter; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "✦" },
  { key: "heart", label: "Loved", emoji: "❤️" },
  { key: "fire", label: "Fire", emoji: "🔥" },
  { key: "lightbulb", label: "Aha", emoji: "💡" },
  { key: "pin", label: "Pinned", emoji: "📌" },
];

export default function LikedPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [items, setItems] = useState<MySpaceCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await authFetch(
          `/api/my-space/reactions?type=${encodeURIComponent(filter)}`
        );
        if (!res.ok) throw new Error(await res.text());
        const json = (await res.json()) as { items: MySpaceCardItem[] };
        if (!alive) return;
        setItems(json.items);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [filter]);

  return (
    <>
      <div className="ms-filter-row" role="tablist" aria-label="Reaction filter">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`ms-chip ${filter === f.key ? "is-active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            <span aria-hidden="true">{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {error && <div className="ms-error">{error}</div>}

      {loading && items.length === 0 && <SkeletonGrid count={8} />}

      {!loading && items.length === 0 && !error && (
        <div className="ms-empty">
          <div className="ms-empty-icon" aria-hidden="true">
            <span style={{ fontSize: 48, lineHeight: 1 }}>❤️</span>
          </div>
          <div className="ms-empty-title">
            {filter === "all" ? "Nothing liked yet" : "No matching reactions"}
          </div>
          <div className="ms-empty-sub">
            {filter === "all"
              ? "React to resources in the library — your hearts, fires, and aha moments collect here."
              : "Try another filter, or react to more resources in the library."}
          </div>
          <Link href="/library" className="ms-empty-cta">
            → Browse library
          </Link>
        </div>
      )}

      <section className="ms-grid">
        {items.map((it) => (
          <MySpaceCard
            key={it.id}
            item={it}
            variant="liked"
            onRemoved={(id) => setItems((prev) => prev.filter((x) => x.id !== id))}
          />
        ))}
      </section>

      <style jsx>{`
        .ms-filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .ms-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.42rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          color: rgba(216, 217, 230, 0.85);
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s, color 0.12s;
        }
        .ms-chip:hover {
          border-color: rgba(94, 234, 212, 0.4);
          color: #f3f3fb;
        }
        .ms-chip.is-active {
          background: rgba(94, 234, 212, 0.14);
          border-color: rgba(94, 234, 212, 0.5);
          color: #5eead4;
        }
        .ms-error {
          padding: 0.85rem 1rem;
          margin: 1rem 0;
          background: rgba(255, 139, 126, 0.08);
          border: 1px solid rgba(255, 139, 126, 0.3);
          border-radius: 0.5rem;
          color: #ff8b7e;
          font-size: 0.85rem;
        }
        .ms-grid {
          column-width: 280px;
          column-gap: 1rem;
        }
        @media (max-width: 760px) {
          .ms-grid { column-width: 160px; column-gap: 0.6rem; }
        }
        .ms-loading {
          padding: 2rem 1rem;
          text-align: center;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: rgba(148, 163, 184, 0.7);
        }
        .ms-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          padding: 3.5rem 1.5rem;
          margin: 1rem 0;
          text-align: center;
          background:
            radial-gradient(circle at 70% 20%, rgba(244, 201, 93, 0.08), transparent 50%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
          border: 1px dashed rgba(244, 201, 93, 0.22);
          border-radius: 0.95rem;
        }
        .ms-empty-icon { margin-bottom: 0.3rem; }
        .ms-empty-title {
          font-family: Cormorant Garamond, serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #f3f3fb;
        }
        .ms-empty-sub {
          max-width: 44ch;
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(216, 217, 230, 0.78);
        }
        .ms-empty-cta {
          margin-top: 0.55rem;
          padding: 0.6rem 1rem;
          background: #5eead4;
          color: #0a0a10;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-decoration: none;
        }
        .ms-empty-cta:hover { filter: brightness(1.05); }
      `}</style>
    </>
  );
}
