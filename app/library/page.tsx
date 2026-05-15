"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import {
  DOC_GROUP_EMOJI,
  DOC_GROUP_LABELS,
  USER_UPLOADABLE_GROUPS,
  type DocGroup,
} from "@/lib/docGroups";

type Sort = "new" | "trending";
type OfficialFilter = "all" | "official" | "community";

interface FeedItem {
  id: string;
  title: string;
  folder: DocGroup;
  attachmentUrl: string;
  mimeType: string | null;
  isImage: boolean;
  isInheroOfficial: boolean;
  isSeeded: boolean;
  downloadCount: number;
  upvoteCount: number;
  commentCount: number;
  createdAt: string;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
}

interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
}

const SORT_TABS: { key: Sort; label: string }[] = [
  { key: "trending", label: "Trending" },
  { key: "new", label: "New" },
];

const FOLDER_FILTERS: { key: DocGroup | "all"; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "▦" },
  ...USER_UPLOADABLE_GROUPS.map((g) => ({
    key: g,
    label: DOC_GROUP_LABELS[g],
    emoji: DOC_GROUP_EMOJI[g],
  })),
];

const OFFICIAL_OPTIONS: { key: OfficialFilter; label: string }[] = [
  { key: "all", label: "Both" },
  { key: "official", label: "⭐ INHERO" },
  { key: "community", label: "✦ Community" },
];

export default function LibraryPage() {
  const [sort, setSort] = useState<Sort>("new");
  const [folder, setFolder] = useState<DocGroup | "all">("all");
  const [official, setOfficial] = useState<OfficialFilter>("all");
  const [items, setItems] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  // Single in-flight guard. Prevents double-fetch on rapid IO callbacks.
  const fetchingRef = useRef(false);

  // Reset feed on filter change.
  useEffect(() => {
    setItems([]);
    setCursor(null);
    setHasMore(true);
    setError(null);
  }, [sort, folder, official]);

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || !hasMore) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      qs.set("sort", sort);
      qs.set("limit", "24");
      if (folder !== "all") qs.set("folder", folder);
      if (official === "official") qs.set("official", "true");
      if (official === "community") qs.set("official", "false");
      if (cursor) qs.set("cursor", cursor);

      const res = await authFetch(`/api/library/feed?${qs.toString()}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `feed ${res.status}`);
      }
      const json = (await res.json()) as FeedResponse;
      setItems((prev) => [...prev, ...json.items]);
      setCursor(json.nextCursor);
      setHasMore(json.nextCursor !== null && json.items.length > 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load feed");
      setHasMore(false);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [sort, folder, official, cursor, hasMore]);

  // Kick the initial load whenever filters reset.
  useEffect(() => {
    if (items.length === 0 && hasMore && !loading) void loadMore();
  }, [items.length, hasMore, loading, loadMore]);

  // IntersectionObserver-driven infinite scroll.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && hasMore && !fetchingRef.current) {
          void loadMore();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loadMore, hasMore]);

  return (
    <main className="lib-root">
      <header className="lib-head">
        <div className="lib-eyebrow">LIBRARY</div>
        <h1 className="lib-title">Every resource. Every Lounge. One feed.</h1>
      </header>

      <div className="lib-controls">
        <div className="lib-tabs">
          {SORT_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`lib-tab ${sort === t.key ? "is-active" : ""}`}
              onClick={() => setSort(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="lib-filter-row" role="tablist" aria-label="Folder">
          {FOLDER_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`lib-chip ${folder === f.key ? "is-active" : ""}`}
              onClick={() => setFolder(f.key)}
            >
              <span aria-hidden="true">{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <div className="lib-filter-row" role="tablist" aria-label="Origin">
          {OFFICIAL_OPTIONS.map((o) => (
            <button
              key={o.key}
              type="button"
              className={`lib-chip lib-chip-sm ${official === o.key ? "is-active" : ""}`}
              onClick={() => setOfficial(o.key)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="lib-error">{error}</div>}

      <section className="lib-grid">
        {items.map((it) => (
          <FeedCard key={it.id} item={it} />
        ))}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={`s-${i}`} />)}
      </section>

      {!loading && items.length === 0 && !error && (
        <div className="lib-empty">
          Nothing in this slice yet. Try a different folder or check back after the next drop.
        </div>
      )}

      <div ref={sentinelRef} className="lib-sentinel" aria-hidden="true" />

      <style jsx>{`
        .lib-root {
          --accent: #5eead4;
          --gold: #F4C95D;
          min-height: calc(100vh - 4rem);
          padding: 2rem 1.5rem 4rem;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
          max-width: 1600px;
          margin: 0 auto;
        }
        .lib-head { margin-bottom: 1.5rem; }
        .lib-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.22em;
          color: var(--accent);
          margin-bottom: 0.4rem;
        }
        .lib-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.1rem; font-weight: 600;
          letter-spacing: -0.01em;
          color: #f3f3fb;
          margin: 0;
        }

        .lib-controls { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.4rem; }
        .lib-tabs { display: flex; gap: 0.25rem; }
        .lib-tab {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em;
          padding: 0.55rem 1rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: rgba(148,163,184,0.85);
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .lib-tab:hover { color: #f3f3fb; border-color: rgba(94,234,212,0.3); }
        .lib-tab.is-active {
          color: #0a0a10; background: var(--accent); border-color: var(--accent);
        }

        .lib-filter-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .lib-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: inherit;
          font-size: 0.78rem; font-weight: 600;
          padding: 0.42rem 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          color: rgba(216,217,230,0.85);
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s, color 0.12s;
        }
        .lib-chip:hover { border-color: rgba(94,234,212,0.4); color: #f3f3fb; }
        .lib-chip.is-active {
          background: rgba(94,234,212,0.12);
          border-color: rgba(94,234,212,0.5);
          color: var(--accent);
        }
        .lib-chip-sm { font-size: 0.72rem; padding: 0.32rem 0.6rem; }

        .lib-error {
          padding: 0.85rem 1rem; margin-bottom: 1rem;
          background: rgba(255,139,126,0.08);
          border: 1px solid rgba(255,139,126,0.3);
          border-radius: 0.5rem;
          color: #ff8b7e;
          font-size: 0.85rem;
        }

        /* Pinterest-style masonry via CSS columns — no JS layout deps */
        .lib-grid {
          column-count: 4;
          column-gap: 1rem;
        }
        @media (max-width: 1280px) { .lib-grid { column-count: 3; } }
        @media (max-width: 760px)  { .lib-grid { column-count: 2; column-gap: 0.6rem; } }

        .lib-empty {
          padding: 3rem 1rem;
          text-align: center;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.65);
          border: 1px dashed rgba(94,234,212,0.18);
          border-radius: 0.6rem;
        }
        .lib-sentinel { height: 1px; }
      `}</style>
    </main>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  // Primary click target on a card body is the reader. Detail page is
  // only reachable now via the comments icon (#comments anchor) or a
  // shared link.
  const readerHref = `/library/${item.id}/read`;
  const detailHref = `/library/${item.id}`;
  const loungeHref = item.lounge ? `/lounges/${item.lounge.slug}` : null;

  return (
    <div className={`fc ${item.isInheroOfficial ? "is-official" : "is-community"}`}>
      {/* Thumbnail — click goes straight into the reader */}
      <Link href={readerHref} className="fc-preview-link" aria-label={`Open ${item.title}`}>
        <div className="fc-preview">
          {item.isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.attachmentUrl} alt={item.title} loading="lazy" />
          ) : (
            <div className="fc-placeholder">
              <span className="fc-placeholder-emoji" aria-hidden="true">
                {DOC_GROUP_EMOJI[item.folder]}
              </span>
              <span className="fc-placeholder-mime">
                {item.mimeType?.split("/").pop()?.toUpperCase() ?? "FILE"}
              </span>
            </div>
          )}
          <div className="fc-badges">
            {item.folder === "this-week" && <span className="fc-badge fc-badge-week">💎 FREE THIS WEEK</span>}
            {item.isInheroOfficial && <span className="fc-badge fc-badge-official">⭐ INHERO ORIGINAL</span>}
            {!item.isInheroOfficial && item.folder !== "this-week" && (
              <span className="fc-badge fc-badge-community">✦ ORIGINAL</span>
            )}
          </div>
        </div>
      </Link>

      <div className="fc-body">
        {/* Title — click goes straight into the reader */}
        <Link href={readerHref} className="fc-title-link">
          <div className="fc-title">{item.title}</div>
        </Link>

        {/* Folder + Lounge — lounge name is its own link to the Lounge */}
        <div className="fc-meta">
          <span aria-hidden="true">{DOC_GROUP_EMOJI[item.folder]}</span>{" "}
          {DOC_GROUP_LABELS[item.folder]}
          {item.lounge && loungeHref && (
            <>
              {" · "}
              <Link href={loungeHref} className="fc-lounge-link">
                {item.lounge.name}
              </Link>
            </>
          )}
        </div>

        <div className="fc-foot">
          {item.author && <span className="fc-author">by <em>{item.author.handle}</em></span>}
          <span className="fc-counts">
            <span title="Downloads">{item.downloadCount} ↓</span>
            <span title="Upvotes">{item.upvoteCount} ▲</span>
            {/* Comment count — click jumps to #comments on the detail page */}
            <Link
              href={`${detailHref}#comments`}
              className="fc-comments-link"
              title="View comments"
            >
              {item.commentCount} 💬
            </Link>
          </span>
        </div>
      </div>

      <style jsx>{`
        .fc {
          display: block;
          break-inside: avoid;
          margin-bottom: 1rem;
          background: rgba(16,17,22,0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.7rem;
          overflow: hidden;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .fc:hover {
          transform: translateY(-2px);
          border-color: rgba(94,234,212,0.4);
          box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 18px rgba(94,234,212,0.12);
        }
        .fc.is-official:hover { border-color: rgba(244,201,93,0.5); box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 18px rgba(244,201,93,0.18); }

        .fc-preview-link {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        .fc-preview-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
        }
        .fc-preview {
          position: relative;
          background: linear-gradient(135deg, rgba(94,234,212,0.06), rgba(110,96,255,0.04));
        }
        .fc-preview img { display: block; width: 100%; height: auto; }
        .fc-placeholder {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.55rem;
          padding: 2.5rem 1rem;
          aspect-ratio: 3 / 4;
        }
        .fc-placeholder-emoji { font-size: 3.2rem; line-height: 1; }
        .fc-placeholder-mime {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.16em;
          color: rgba(148,163,184,0.6);
        }

        .fc-badges {
          position: absolute;
          top: 0.5rem; left: 0.5rem;
          display: flex; flex-direction: column; gap: 0.3rem;
          pointer-events: none;
        }
        .fc-badge {
          display: inline-flex; align-items: center;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800; letter-spacing: 0.14em;
          padding: 0.22rem 0.45rem;
          border-radius: 0.3rem;
          backdrop-filter: blur(6px);
        }
        .fc-badge-official { background: rgba(244,201,93,0.85); color: #1a1306; }
        .fc-badge-community { background: rgba(94,234,212,0.85); color: #062320; }
        .fc-badge-week { background: rgba(125,211,252,0.9); color: #022035; }

        .fc-body { padding: 0.7rem 0.85rem 0.85rem; }

        .fc-title-link {
          color: inherit;
          text-decoration: none;
          display: block;
        }
        .fc-title-link:hover .fc-title { color: var(--accent); }
        .fc-title {
          font-size: 0.94rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.35;
          margin-bottom: 0.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.12s;
        }
        .fc-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 600;
          color: rgba(148,163,184,0.75);
          letter-spacing: 0.04em;
          margin-bottom: 0.55rem;
        }
        .fc-lounge-link {
          color: rgba(94,234,212,0.85);
          text-decoration: none;
        }
        .fc-lounge-link:hover { color: var(--accent); text-decoration: underline; }

        .fc-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .fc-author {
          font-size: 0.72rem;
          color: rgba(216,217,230,0.7);
        }
        .fc-author em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          font-weight: 600;
          color: #f3f3fb;
        }
        .fc-counts {
          display: inline-flex; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.7);
        }
        .fc-comments-link {
          color: rgba(148,163,184,0.7);
          text-decoration: none;
        }
        .fc-comments-link:hover { color: var(--accent); }
      `}</style>
    </div>
  );
}

function ShimmerCard() {
  // Variable height shimmer so the masonry layout reads as alive on load.
  const h = 180 + Math.floor(Math.random() * 120);
  return (
    <div className="sk" style={{ height: h }}>
      <style jsx>{`
        .sk {
          break-inside: avoid;
          margin-bottom: 1rem;
          background: linear-gradient(110deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%);
          background-size: 220% 100%;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0.7rem;
          animation: sk-pulse 1.4s ease-in-out infinite;
        }
        @keyframes sk-pulse {
          0%   { background-position: 220% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
}
