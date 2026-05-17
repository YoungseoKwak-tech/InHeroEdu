"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import CollectionChips, { type CollectionSummary } from "@/components/my-space/CollectionChips";
import MySpaceCard, { type MySpaceCardItem } from "@/components/my-space/MySpaceCard";
import SkeletonGrid from "@/components/my-space/SkeletonGrid";

interface CollectionRow extends CollectionSummary {
  description: string | null;
  coverResourceId: string | null;
  isPrivate: boolean;
  updatedAt: string;
}

export default function SavedPage() {
  const [collections, setCollections] = useState<CollectionRow[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [unfiledCount, setUnfiledCount] = useState(0);
  const [activeId, setActiveId] = useState<string>("all");
  const [items, setItems] = useState<MySpaceCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCollections = useCallback(async () => {
    const res = await authFetch("/api/my-space/collections");
    if (!res.ok) throw new Error(await res.text());
    const json = (await res.json()) as {
      collections: CollectionRow[];
      totalSaved: number;
      unfiledCount: number;
    };
    setCollections(json.collections);
    setTotalSaved(json.totalSaved);
    setUnfiledCount(json.unfiledCount);
  }, []);

  const loadItems = useCallback(async (collection: string) => {
    const res = await authFetch(`/api/my-space/saves?collection=${encodeURIComponent(collection)}`);
    if (!res.ok) throw new Error(await res.text());
    const json = (await res.json()) as { items: MySpaceCardItem[] };
    setItems(json.items);
  }, []);

  // Initial load: collections + first slice of items.
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        await loadCollections();
        if (!alive) return;
        await loadItems("all");
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [loadCollections, loadItems]);

  // When the chip changes, refetch just that bucket.
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        await loadItems(activeId);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [activeId, loadItems]);

  async function createCollection(name: string) {
    const res = await authFetch("/api/my-space/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error(await res.text());
    await loadCollections();
  }

  function onRemoved(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setTotalSaved((n) => Math.max(0, n - 1));
    // Best-effort: pull a fresh count for chips without blocking UI.
    void loadCollections();
  }

  function onMoved(id: string, collectionId: string | null) {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, collectionId } : it))
        // Drop the card from the current view if it no longer matches.
        .filter((it) => {
          if (activeId === "all") return true;
          if (activeId === "none") return it.collectionId === null;
          return it.collectionId === activeId;
        })
    );
    void loadCollections();
  }

  return (
    <>
      <CollectionChips
        collections={collections}
        activeId={activeId}
        totalSaved={totalSaved}
        unfiledCount={unfiledCount}
        onSelect={setActiveId}
        onCreate={createCollection}
      />

      {error && <div className="ms-error">{error}</div>}

      {loading && items.length === 0 && <SkeletonGrid count={8} />}

      {!loading && items.length === 0 && !error && (
        <div className="ms-empty">
          <div className="ms-empty-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <div className="ms-empty-title">
            {totalSaved === 0
              ? "Start building your archive"
              : "Nothing in this collection yet"}
          </div>
          <div className="ms-empty-sub">
            {totalSaved === 0
              ? "Save resources from the library to revisit them anytime."
              : "Move a saved resource here from another collection, or save something new."}
          </div>
          <Link href="/library" className="ms-empty-cta">
            → Explore the library
          </Link>
        </div>
      )}

      <section className="ms-grid">
        {items.map((it) => (
          <MySpaceCard
            key={it.id}
            item={it}
            variant="saved"
            onRemoved={onRemoved}
            onMoved={onMoved}
          />
        ))}
      </section>

      <style jsx>{`
        .ms-error {
          padding: 0.85rem 1rem;
          margin: 1rem 0;
          background: rgba(255,139,126,0.08);
          border: 1px solid rgba(255,139,126,0.3);
          border-radius: 0.5rem;
          color: #ff8b7e;
          font-size: 0.85rem;
        }
        .ms-grid {
          column-width: 280px;
          column-gap: 1rem;
          margin-top: 1rem;
        }
        @media (max-width: 760px) {
          .ms-grid { column-width: 160px; column-gap: 0.6rem; }
        }
        .ms-loading {
          padding: 2rem 1rem;
          text-align: center;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.7);
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
            radial-gradient(circle at 30% 20%, rgba(94,234,212,0.08), transparent 50%),
            linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px dashed rgba(94,234,212,0.22);
          border-radius: 0.95rem;
        }
        .ms-empty-icon {
          color: rgba(244,201,93,0.85);
          margin-bottom: 0.3rem;
        }
        .ms-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #f3f3fb;
        }
        .ms-empty-sub {
          max-width: 44ch;
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(216,217,230,0.78);
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
