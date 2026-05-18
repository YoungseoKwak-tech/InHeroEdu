"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import PdfThumbnailBackfill from "@/components/library/PdfThumbnailBackfill";
import FeaturedTextbooks from "@/components/library/FeaturedTextbooks";
import SaveButton from "@/components/my-space/SaveButton";
import ReactionPicker from "@/components/my-space/ReactionPicker";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  DOC_GROUP_EMOJI,
  DOC_GROUP_LABELS,
  USER_UPLOADABLE_GROUPS,
  type DocGroup,
} from "@/lib/docGroups";

type ReactionType = "heart" | "fire" | "lightbulb" | "pin";

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
  isMine: boolean;
  downloadCount: number;
  upvoteCount: number;
  commentCount: number;
  createdAt: string;
  // Server-rendered preview pages from /api/library/resource/[id]/process-preview.
  // page 1 is full clarity, pages 2 & 3 are baked-blurred PNGs.
  previewPage1Url: string | null;
  previewPage2Url: string | null;
  previewPage3Url: string | null;
  totalPages: number | null;
  previewStatus: string | null;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
}

interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
  viewerIsAdmin?: boolean;
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
  // viewer-level admin flag — comes back on every feed page; the
  // last-seen value drives whether each card shows the Delete affordance
  // when the viewer isn't the author.
  const [viewerIsAdmin, setViewerIsAdmin] = useState(false);
  const [profileStatus, setProfileStatus] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  // Per-viewer saves + reactions for currently visible cards. Hydrated
  // in batch from /api/my-space/viewer-state when new pages load.
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [reactionMap, setReactionMap] = useState<Record<string, ReactionType[]>>({});
  // IDs we've already hydrated, so we only ask about new ones on
  // subsequent pages.
  const hydratedIdsRef = useRef<Set<string>>(new Set());

  const sentinelRef = useRef<HTMLDivElement>(null);
  // Single in-flight guard. Prevents double-fetch on rapid IO callbacks.
  const fetchingRef = useRef(false);
  const supabase = createBrowserClient();

  // Reset feed on filter change.
  useEffect(() => {
    setItems([]);
    setCursor(null);
    setHasMore(true);
    setError(null);
    setSavedMap({});
    setReactionMap({});
    hydratedIdsRef.current = new Set();
  }, [sort, folder, official]);

  // Hydrate viewer's save/reaction state for any newly-loaded cards.
  useEffect(() => {
    if (profileStatus !== "ok") return;
    const pending = items
      .map((it) => it.id)
      .filter((id) => !hydratedIdsRef.current.has(id));
    if (pending.length === 0) return;
    pending.forEach((id) => hydratedIdsRef.current.add(id));
    void (async () => {
      try {
        const qs = new URLSearchParams({ ids: pending.join(",") });
        const res = await authFetch(`/api/my-space/viewer-state?${qs.toString()}`);
        if (!res.ok) return;
        const json = (await res.json()) as {
          saves: Record<string, true>;
          reactions: Record<string, string[]>;
        };
        setSavedMap((prev) => ({ ...prev, ...json.saves }));
        const nextReactions: Record<string, ReactionType[]> = {};
        for (const [id, kinds] of Object.entries(json.reactions ?? {})) {
          nextReactions[id] = kinds.filter(
            (k): k is ReactionType =>
              k === "heart" || k === "fire" || k === "lightbulb" || k === "pin"
          );
        }
        setReactionMap((prev) => ({ ...prev, ...nextReactions }));
      } catch {
        // best-effort hydration; buttons still work without it
      }
    })();
  }, [items, profileStatus]);

  // Lightweight profile probe: if a logged-in user hasn't claimed a handle
  // yet, surface an explicit CTA so uploads/chat don't feel broken.
  useEffect(() => {
    let mounted = true;
    async function probeProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!session?.access_token) {
          setProfileStatus("out");
          return;
        }

        const res = await authFetch("/api/profile/me", { cache: "no-store" });
        const json = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (json?.profile?.handle) {
          setProfileStatus("ok");
        } else if (res.ok) {
          setProfileStatus("no_profile");
        } else {
          setProfileStatus("out");
        }
      } catch {
        if (mounted) setProfileStatus("out");
      }
    }
    void probeProfile();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || !hasMore || profileStatus === "loading" || profileStatus === "out") return;
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
        if (res.status === 401 || res.status === 403) {
          setProfileStatus("out");
          setHasMore(false);
          return;
        }
        const text = await res.text();
        throw new Error(text || `feed ${res.status}`);
      }
      const json = (await res.json()) as FeedResponse;
      setItems((prev) => [...prev, ...json.items]);
      setCursor(json.nextCursor);
      setHasMore(json.nextCursor !== null && json.items.length > 0);
      if (typeof json.viewerIsAdmin === "boolean") setViewerIsAdmin(json.viewerIsAdmin);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load feed");
      setHasMore(false);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [sort, folder, official, cursor, hasMore, profileStatus]);

  // Kick the initial load whenever filters reset.
  useEffect(() => {
    if (profileStatus === "loading" || profileStatus === "out") return;
    if (items.length === 0 && hasMore && !loading) void loadMore();
  }, [items.length, hasMore, loading, loadMore, profileStatus]);

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

      <FeaturedTextbooks />

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

      {profileStatus === "no_profile" && (
        <div className="lib-banner">
          <div className="lib-banner-copy">
            <div className="lib-banner-kicker">UPLOADS LOCKED</div>
            <div className="lib-banner-title">Claim your trajectory handle to publish to the Library.</div>
            <div className="lib-banner-sub">
              You can browse now, but your uploads and lounge posts won&apos;t appear until onboarding is complete.
            </div>
          </div>
          <Link href="/onboarding?next=%2Flibrary" className="lib-banner-cta">
            Claim handle →
          </Link>
        </div>
      )}

      {profileStatus === "out" && (
        <div className="lib-login-gate">
          <div className="lib-login-kicker">SIGN IN REQUIRED</div>
          <div className="lib-login-title">Log in to unlock the Library feed.</div>
          <div className="lib-login-sub">
            The Library is available after sign-in. Once you're in, the feed loads here instead of a blank dark page.
          </div>
          <div className="lib-login-actions">
            <Link href="/auth/login?redirect=%2Flibrary" className="lib-login-cta">
              Sign in →
            </Link>
            <button
              type="button"
              className="lib-login-secondary"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("inhero:open-auth", {
                    detail: { mode: "login", redirectTo: "/library" },
                  })
                );
              }}
            >
              Open login modal
            </button>
          </div>
        </div>
      )}

      {error && <div className="lib-error">{error}</div>}

      <section className="lib-grid">
        {items.map((it) => (
          <FeedCard
            key={it.id}
            item={it}
            viewerIsAdmin={viewerIsAdmin}
            initialSaved={savedMap[it.id] ?? false}
            initialReactions={reactionMap[it.id] ?? []}
            onDeleted={(deletedId) =>
              setItems((prev) => prev.filter((x) => x.id !== deletedId))
            }
          />
        ))}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={`s-${i}`} index={i} />)}
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
          /* Full-bleed feed — drop the 1600px cap so the masonry breathes
             into the viewport on wide screens. Side padding stays so
             cards don't hug the edges. */
          max-width: 100%;
          margin: 0;
        }
        @media (max-width: 760px) {
          .lib-root { padding: 1.25rem 0.85rem 3rem; }
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

        .lib-banner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.1rem;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, rgba(244,201,93,0.12), rgba(94,234,212,0.08));
          border: 1px solid rgba(244,201,93,0.28);
          border-radius: 0.85rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
        }
        .lib-banner-copy { display: flex; flex-direction: column; gap: 0.3rem; }
        .lib-banner-kicker {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #F4C95D;
        }
        .lib-banner-title {
          font-size: 1rem;
          font-weight: 700;
          color: #f3f3fb;
        }
        .lib-banner-sub {
          max-width: 56ch;
          font-size: 0.86rem;
          line-height: 1.5;
          color: rgba(216,217,230,0.82);
        }
        .lib-banner-cta {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.35rem;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          background: #F4C95D;
          color: #111014;
          text-decoration: none;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }
        .lib-banner-cta:hover { filter: brightness(1.03); }
        @media (max-width: 760px) {
          .lib-banner {
            flex-direction: column;
            align-items: stretch;
          }
          .lib-banner-cta {
            width: 100%;
          }
        }

        .lib-login-gate {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 1.1rem 1.15rem;
          margin: 0 0 1rem;
          background:
            radial-gradient(circle at top left, rgba(94,234,212,0.14), transparent 52%),
            linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 1px solid rgba(94,234,212,0.22);
          border-radius: 0.95rem;
          box-shadow: 0 12px 32px rgba(0,0,0,0.24);
        }
        .lib-login-kicker {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: var(--accent);
        }
        .lib-login-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #f3f3fb;
        }
        .lib-login-sub {
          max-width: 56ch;
          font-size: 0.88rem;
          line-height: 1.55;
          color: rgba(216,217,230,0.82);
        }
        .lib-login-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 0.35rem;
        }
        .lib-login-cta,
        .lib-login-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.35rem;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(94,234,212,0.25);
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-decoration: none;
          cursor: pointer;
        }
        .lib-login-cta {
          background: var(--accent);
          color: #0a0a10;
        }
        .lib-login-secondary {
          background: rgba(255,255,255,0.02);
          color: #f3f3fb;
        }
        .lib-login-cta:hover,
        .lib-login-secondary:hover {
          filter: brightness(1.05);
        }

        .lib-error {
          padding: 0.85rem 1rem; margin-bottom: 1rem;
          background: rgba(255,139,126,0.08);
          border: 1px solid rgba(255,139,126,0.3);
          border-radius: 0.5rem;
          color: #ff8b7e;
          font-size: 0.85rem;
        }

        /* Pinterest-style masonry via CSS columns. Switched from a
           fixed column-count (was: 4/3/2) to column-width auto-fill so
           the layout scales smoothly with viewport width — wide screens
           pack more columns; narrow drop to two without a breakpoint
           cliff. */
        .lib-grid {
          column-width: 280px;
          column-gap: 1rem;
        }
        @media (max-width: 760px) {
          .lib-grid { column-width: 160px; column-gap: 0.6rem; }
        }

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

function FeedCard({
  item,
  viewerIsAdmin,
  initialSaved,
  initialReactions,
  onDeleted,
}: {
  item: FeedItem;
  viewerIsAdmin: boolean;
  initialSaved: boolean;
  initialReactions: ReactionType[];
  onDeleted: (id: string) => void;
}) {
  // Primary click target on a card body is the reader. Detail page is
  // only reachable now via the comments icon (#comments anchor) or a
  // shared link.
  const readerHref = `/library/${item.id}/read`;
  const detailHref = `/library/${item.id}`;
  const loungeHref = item.lounge ? `/lounges/${item.lounge.slug}` : null;
  const canDelete = item.isMine || viewerIsAdmin;
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Local override so the card can swap in a browser-generated
  // thumbnail without waiting for a feed refetch. Initialized from the
  // server-provided URL; PdfThumbnailBackfill calls setLocalPreview1Url
  // when it finishes rendering + uploading.
  const [localPreview1Url, setLocalPreview1Url] = useState<string | null>(item.previewPage1Url);
  // Set when PdfThumbnailBackfill reports a failure (sign 404,
  // pdfjs render exception, etc). Lets the placeholder swap the
  // "Generating preview…" label for the emoji + filetype fallback
  // instead of looping forever.
  const [backfillFailed, setBackfillFailed] = useState(false);
  const previewPages: { url: string; blurred: boolean }[] = [];
  if (localPreview1Url) previewPages.push({ url: localPreview1Url, blurred: false });
  if (item.previewPage2Url) previewPages.push({ url: item.previewPage2Url, blurred: true });
  if (item.previewPage3Url) previewPages.push({ url: item.previewPage3Url, blurred: true });
  const hasPreviews = previewPages.length > 0;
  const [previewIndex, setPreviewIndex] = useState(0);
  const currentPreview = hasPreviews ? previewPages[previewIndex] : null;
  const isPdf = item.mimeType === "application/pdf";
  const needsThumbnailBackfill = isPdf && !localPreview1Url && !backfillFailed;

  function cyclePreviewNext(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPreviewIndex((i) => (i + 1) % previewPages.length);
  }
  function cyclePreviewPrev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPreviewIndex((i) => (i === 0 ? previewPages.length - 1 : i - 1));
  }

  // Click outside the ⋯ menu closes it. Mounted only while open so we
  // don't leak listeners across every card on the feed.
  useEffect(() => {
    if (!menuOpen) return;
    const onDocPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [menuOpen]);

  async function doDelete() {
    if (deleting) return;
    setDeleting(true);
    try {
      const res = await authFetch(`/api/library/resource/${item.id}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        // Surface a real error rather than silent failure — owner/admin
        // sees what went wrong.
        let msg = `HTTP ${res.status}`;
        try {
          const j = (await res.json()) as { error?: string };
          if (j.error) msg = j.error;
        } catch { /* ignore */ }
        throw new Error(msg);
      }
      onDeleted(item.id);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`Could not delete: ${e instanceof Error ? e.message : String(e)}`);
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <div className={`fc ${item.isInheroOfficial ? "is-official" : "is-community"}`}>
      {/* Hover-revealed affordances at top-right: SaveButton (always),
          owner / admin ⋯ menu (only when canDelete). Both live OUTSIDE
          the preview-link <Link> so clicks here never navigate. */}
      <div className="fc-affordances" onMouseDown={(e) => e.stopPropagation()}>
        <SaveButton
          resourceId={item.id}
          initialSaved={initialSaved}
        />
        {canDelete && (
          <div className="fc-owner-menu" ref={menuRef}>
            <button
              type="button"
              className="fc-menu-trigger"
              aria-label="Card options"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
            >
              ⋯
            </button>
            {menuOpen && (
              <div className="fc-menu-dropdown" onMouseDown={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="fc-menu-item fc-menu-delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(false);
                    setConfirming(true);
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirming}
        title="Delete this resource?"
        message={
          <>
            "{item.title}" will disappear from the library feed. This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
        loading={deleting}
        destructive
        onConfirm={doDelete}
        onCancel={() => {
          if (!deleting) setConfirming(false);
        }}
      />

      {/* Thumbnail — click goes straight into the reader. Preview
          carousel arrows are stacked on top, outside the Link so they
          don't navigate. */}
      <div className="fc-preview-wrap">
        <Link href={readerHref} className="fc-preview-link" aria-label={`Open ${item.title}`}>
          <div className="fc-preview">
            {item.isImage ? (
              // Image resources are their own thumbnail — no preview pipeline.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.attachmentUrl} alt={item.title} loading="lazy" draggable={false} />
            ) : currentPreview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentPreview.url}
                  alt={`${item.title} — preview page ${previewIndex + 1}`}
                  className={`fc-preview-img ${currentPreview.blurred ? "is-blurred" : ""}`}
                  loading="lazy"
                  draggable={false}
                />
                {currentPreview.blurred && (
                  <span className="fc-preview-locked">🔒 page {previewIndex + 1}</span>
                )}
              </>
            ) : (
              <div className="fc-placeholder">
                <span className="fc-placeholder-emoji" aria-hidden="true">
                  {DOC_GROUP_EMOJI[item.folder]}
                </span>
                <span className="fc-placeholder-mime">
                  {needsThumbnailBackfill
                    ? "Generating preview…"
                    : item.mimeType?.split("/").pop()?.toUpperCase() ?? "FILE"}
                </span>
                {needsThumbnailBackfill && (
                  <PdfThumbnailBackfill
                    resourceId={item.id}
                    onGenerated={setLocalPreview1Url}
                    onFailed={() => setBackfillFailed(true)}
                  />
                )}
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
        {/* Reaction picker — sibling of the preview-link so taps never
            navigate. Hover-revealed on desktop, always visible on touch. */}
        <div className="fc-reactions">
          <ReactionPicker
            resourceId={item.id}
            initialReactions={initialReactions}
          />
        </div>
        {/* Carousel controls — siblings of the Link, not inside it, so
            arrow clicks never navigate. Hidden on cards with only one
            preview page or none. */}
        {previewPages.length > 1 && (
          <div className="fc-carousel" aria-label="Cycle preview pages">
            <button
              type="button"
              className="fc-carousel-arrow"
              onClick={cyclePreviewPrev}
              aria-label="Previous preview"
            >
              ◀
            </button>
            <span className="fc-carousel-dots">
              {previewPages.map((_, i) => (
                <span key={i} className={`fc-carousel-dot ${i === previewIndex ? "is-active" : ""}`} />
              ))}
            </span>
            <button
              type="button"
              className="fc-carousel-arrow"
              onClick={cyclePreviewNext}
              aria-label="Next preview"
            >
              ▶
            </button>
          </div>
        )}
      </div>

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
          position: relative;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }

        /* Hover-revealed affordances row at top-right: SaveButton plus
           optional owner ⋯ menu. Lives outside the preview-link so
           clicks here never navigate. */
        .fc-affordances {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 0.32rem;
          opacity: 0;
          transform: translateY(-2px);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .fc:hover .fc-affordances,
        .fc-affordances:focus-within {
          opacity: 1;
          transform: translateY(0);
        }
        @media (hover: none) {
          .fc-affordances { opacity: 1; transform: none; }
        }

        /* Owner / admin ⋯ menu — now nested inside .fc-affordances. */
        .fc-owner-menu {
          position: relative;
        }
        .fc-menu-trigger {
          width: 28px; height: 28px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 6px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.92);
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }
        .fc-menu-trigger:hover { background: rgba(0,0,0,0.85); }
        .fc-menu-dropdown {
          position: absolute;
          top: 32px;
          right: 0;
          min-width: 140px;
          padding: 4px;
          background: rgba(10,6,18,0.96);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.5);
        }
        .fc-menu-item {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: none;
          border: 0;
          border-radius: 4px;
          color: rgba(255,255,255,0.88);
          text-align: left;
          font-family: inherit;
          font-size: 0.82rem;
          cursor: pointer;
        }
        .fc-menu-delete:hover { background: rgba(239,68,68,0.16); color: #ff8b7e; }

        .fc:hover {
          transform: translateY(-2px);
          border-color: rgba(94,234,212,0.4);
          box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 18px rgba(94,234,212,0.12);
        }
        .fc.is-official:hover { border-color: rgba(244,201,93,0.5); box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 18px rgba(244,201,93,0.18); }

        .fc-preview-wrap {
          position: relative;
        }
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
        .fc-preview-img.is-blurred {
          /* Server-baked blur — this class is purely a marker. */
          opacity: 0.96;
        }
        .fc-preview-locked {
          position: absolute;
          top: 0.65rem;
          right: 0.65rem;
          padding: 0.18rem 0.5rem;
          background: rgba(0,0,0,0.72);
          color: rgba(255,255,255,0.92);
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          pointer-events: none;
        }

        /* Reaction picker — anchored bottom-right of the preview.
           Hover-revealed on desktop (same logic as the affordances row);
           always visible on touch. */
        .fc-reactions {
          position: absolute;
          bottom: 0.55rem;
          right: 0.55rem;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .fc:hover .fc-reactions,
        .fc-reactions:focus-within { opacity: 1; }
        @media (hover: none) {
          .fc-reactions { opacity: 1; }
        }

        /* Preview carousel — visible only on hover desktop, always
           visible on touch / narrow viewports so the affordance is
           still discoverable without a hover state. */
        .fc-carousel {
          position: absolute;
          bottom: 0.55rem;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.22rem 0.55rem;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          opacity: 0;
          transition: opacity 0.18s ease;
          z-index: 4;
        }
        .fc-preview-wrap:hover .fc-carousel,
        .fc-carousel:focus-within { opacity: 1; }
        @media (hover: none) {
          .fc-carousel { opacity: 1; }
        }
        .fc-carousel-arrow {
          background: transparent;
          border: 0;
          color: rgba(255,255,255,0.88);
          font-size: 0.7rem;
          padding: 0.18rem 0.32rem;
          cursor: pointer;
          border-radius: 4px;
        }
        .fc-carousel-arrow:hover { background: rgba(255,255,255,0.14); }
        .fc-carousel-dots {
          display: inline-flex;
          gap: 0.25rem;
        }
        .fc-carousel-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.32);
          transition: background 0.12s;
        }
        .fc-carousel-dot.is-active { background: rgba(255,255,255,0.95); }
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

// Deterministic per-index heights — using Math.random() during render
// produced different values on SSR vs CSR and triggered React #425.
const SHIMMER_HEIGHTS = [180, 220, 260, 300, 240, 200, 280, 260];

function ShimmerCard({ index }: { index: number }) {
  const h = SHIMMER_HEIGHTS[index % SHIMMER_HEIGHTS.length];
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
