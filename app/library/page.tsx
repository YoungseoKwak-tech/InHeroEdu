"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import PdfThumbnailBackfill from "@/components/library/PdfThumbnailBackfill";
import OriginalsSidebar from "@/components/library/OriginalsSidebar";
import SaveButton from "@/components/my-space/SaveButton";
import ReactionPicker from "@/components/my-space/ReactionPicker";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  DOC_GROUP_BLURBS,
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

interface LoungeOption {
  slug: string;
  name: string;
  subjectCategory: string | null;
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

const MAX_LIBRARY_UPLOAD = 5 * 1024 * 1024 * 1024;
const MAX_LIBRARY_UPLOAD_LABEL = "5 GB";
const EAGER_PDF_PREVIEW_MAX_BYTES = 20 * 1024 * 1024;
const PDF_PREVIEW_TIMEOUT_MS = 20_000;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<null>((resolve) => {
        timeoutId = setTimeout(() => resolve(null), ms);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

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
  const [feedVersion, setFeedVersion] = useState(0);
  const [lounges, setLounges] = useState<LoungeOption[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadGroup, setUploadGroup] = useState<DocGroup>("notes");
  const [uploadLounge, setUploadLounge] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // IDs we've already hydrated, so we only ask about new ones on
  // subsequent pages.
  const hydratedIdsRef = useRef<Set<string>>(new Set());
  const requestSeqRef = useRef(0);

  const sentinelRef = useRef<HTMLDivElement>(null);
  // Single in-flight guard. Prevents double-fetch on rapid IO callbacks.
  const fetchingRef = useRef(false);
  const supabase = createBrowserClient();

  // Reset feed on filter change.
  useEffect(() => {
    requestSeqRef.current += 1;
    fetchingRef.current = false;
    setItems([]);
    setCursor(null);
    setHasMore(true);
    setError(null);
    setLoading(false);
    setSavedMap({});
    setReactionMap({});
    hydratedIdsRef.current = new Set();
  }, [sort, folder, official, feedVersion]);

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
        const session = await getClientSession();
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

  // Dim the global SpaceBackground sprites while the user is on
  // /library — the catalog + feed panels carry the page now, the
  // planets just need to be ambient atmosphere.
  useEffect(() => {
    document.body.classList.add("lib-quiet-bg");
    return () => { document.body.classList.remove("lib-quiet-bg"); };
  }, []);

  useEffect(() => {
    if (profileStatus !== "ok") return;
    let mounted = true;
    void (async () => {
      try {
        const res = await authFetch("/api/lounges", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { lounges?: LoungeOption[] };
        const nextLounges = json.lounges ?? [];
        if (!mounted) return;
        setLounges(nextLounges);
        setUploadLounge((current) => current || nextLounges[0]?.slug || "ap-bio");
      } catch {
        // Upload can still fall back to AP Bio if the lounge list probe fails.
        if (mounted) setUploadLounge((current) => current || "ap-bio");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [profileStatus]);

  function openUploadDialog() {
    setUploadError(null);
    if (profileStatus === "out") {
      window.dispatchEvent(
        new CustomEvent("inhero:open-auth", {
          detail: { mode: "login", redirectTo: "/library" },
        })
      );
      return;
    }
    if (profileStatus === "no_profile") {
      window.location.href = "/onboarding?next=%2Flibrary";
      return;
    }
    setUploadGroup(folder === "all" ? "notes" : folder);
    setUploadOpen(true);
  }

  function closeUploadDialog() {
    if (uploading) return;
    setUploadOpen(false);
    setUploadFile(null);
    setUploadTitle("");
    setUploadGroup("notes");
    setUploadError(null);
  }

  function onUploadFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (event.target) event.target.value = "";
    setUploadError(null);
    if (!file) return;
    if (file.size > MAX_LIBRARY_UPLOAD) {
      setUploadError(`File too large. Max ${MAX_LIBRARY_UPLOAD_LABEL}.`);
      return;
    }
    setUploadFile(file);
    setUploadTitle((current) => current || file.name);
  }

  function startPdfPreviewBackfill(resourceId: string, pdfFile: File) {
    // Upload must never wait on PDF rendering. Large PDFs can take a long
    // time in pdf.js, so they should publish immediately and let preview
    // generation happen later instead of trapping the modal on "Publishing...".
    if (pdfFile.size > EAGER_PDF_PREVIEW_MAX_BYTES) {
      console.info("[lib-upload] skipping eager preview for large PDF", {
        resourceId,
        size: pdfFile.size,
      });
      return;
    }

    void (async () => {
      try {
        const [{ renderPdfPage1ToJpegBlob }, { uploadThumbnailForResource }] = await Promise.all([
          import("@/lib/pdfThumbnailRender"),
          import("@/lib/clientThumbnailUpload"),
        ]);
        const arrayBuffer = await withTimeout(pdfFile.arrayBuffer(), PDF_PREVIEW_TIMEOUT_MS);
        if (!arrayBuffer) return;
        const blob = await withTimeout(
          renderPdfPage1ToJpegBlob(new Uint8Array(arrayBuffer)),
          PDF_PREVIEW_TIMEOUT_MS,
        );
        if (!blob) return;
        const previewUrl = await withTimeout(
          uploadThumbnailForResource(resourceId, blob),
          PDF_PREVIEW_TIMEOUT_MS,
        );
        if (!previewUrl) return;
        setItems((prev) =>
          prev.map((item) =>
            item.id === resourceId ? { ...item, previewPage1Url: previewUrl } : item,
          ),
        );
      } catch (err) {
        console.warn("[lib-upload] eager preview failed", err);
      }
    })();
  }

  async function uploadToLibrary() {
    if (uploading) return;
    if (!uploadFile) {
      setUploadError("Choose a file first.");
      return;
    }
    const file = uploadFile;
    const loungeSlug = uploadLounge || lounges[0]?.slug || "ap-bio";
    if (!loungeSlug) {
      setUploadError("Choose a lounge.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      const mimeType = file.type || "application/octet-stream";
      const title = uploadTitle.trim() || file.name || "Untitled";
      const signRes = await authFetch(`/api/lounges/${encodeURIComponent(loungeSlug)}/chat/upload/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name || "file",
          fileSize: file.size,
          mimeType,
        }),
      });
      const signJson = (await signRes.json().catch(() => null)) as {
        error?: string;
        code?: string;
        path?: string;
        token?: string;
        bucket?: string;
      } | null;
      if (signJson?.code === "NO_PROFILE") {
        window.location.href = "/onboarding?next=%2Flibrary";
        return;
      }
      if (!signRes.ok || !signJson?.path || !signJson.token || !signJson.bucket) {
        throw new Error(signJson?.error ?? `Upload sign failed (${signRes.status})`);
      }

      const { error: storageErr } = await supabase.storage
        .from(signJson.bucket)
        .uploadToSignedUrl(signJson.path, signJson.token, file, {
          contentType: mimeType,
          upsert: false,
        });
      if (storageErr) throw new Error(`Storage upload failed: ${storageErr.message}`);

      const finalizeRes = await authFetch(
        `/api/lounges/${encodeURIComponent(loungeSlug)}/chat/upload/finalize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: signJson.path,
            fileName: file.name || "file",
            fileSize: file.size,
            mimeType,
            caption: title,
            group: uploadGroup,
            publishToLibrary: true,
          }),
        }
      );
      const finalizeJson = (await finalizeRes.json().catch(() => null)) as {
        ok?: boolean;
        dedup?: boolean;
        error?: string;
        message?: { attachment?: { resourceId?: string | null } | null };
        resource?: FeedItem | null;
      } | null;
      if (!finalizeRes.ok || !finalizeJson?.ok) {
        throw new Error(finalizeJson?.error ?? `Upload finalize failed (${finalizeRes.status})`);
      }

      const resourceId = finalizeJson.message?.attachment?.resourceId;
      const uploadedResource = finalizeJson.resource ?? null;

      setUploadOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setUploadGroup("notes");

      const revealUploadedResource = (resource: FeedItem | null) => {
        if (!resource) return;
        const folderMatches = folder === "all" || resource.folder === folder;
        const officialMatches =
          official === "all" ||
          (official === "official" && resource.isInheroOfficial) ||
          (official === "community" && !resource.isInheroOfficial);
        if (!folderMatches || !officialMatches) return;
        setItems((prev) =>
          collapseFeedDuplicates([
            resource,
            ...prev.filter((item) => item.id !== resource.id),
          ])
        );
      };

      console.log("[lib-upload] finalize OK", {
        resourceId: uploadedResource?.id,
        hasResource: !!uploadedResource,
      });

      // Optimistic show for immediate feedback (fast)
      if (uploadedResource) {
        revealUploadedResource(uploadedResource);
      }
      if (finalizeJson.dedup) {
        setError("This file is already in the library — kept the existing card.");
      }
      // Revalidate shortly after the optimistic card appears. Waiting a
      // beat avoids a read-after-write race where the immediate feed refetch
      // can momentarily miss a just-inserted resource and make it vanish.
      window.setTimeout(() => {
        setFeedVersion((version) => version + 1);
      }, 1200);
      if (mimeType.toLowerCase() === "application/pdf" && resourceId) {
        startPdfPreviewBackfill(resourceId, file);
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || !hasMore || profileStatus === "loading" || profileStatus === "out") return;
    const requestSeq = requestSeqRef.current;
    const requestCursor = cursor;
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
      if (requestCursor) qs.set("cursor", requestCursor);
      // Per-request cache buster — defeats any browser/edge layer that
      // might be serving a stale Library response after a DB cleanup.
      qs.set("_", Date.now().toString());

      const res = await authFetch(`/api/library/feed?${qs.toString()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      });
      if (requestSeq !== requestSeqRef.current) return;
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
      if (requestSeq !== requestSeqRef.current) return;
      setItems((prev) => {
        const base = requestCursor ? prev : [];
        const byId = new Map<string, FeedItem>();
        for (const item of base) {
          byId.set(item.id, item);
        }
        for (const item of json.items) {
          byId.set(item.id, item);
        }
        return collapseFeedDuplicates(Array.from(byId.values()));
      });
      setCursor(json.nextCursor);
      setHasMore(json.nextCursor !== null && json.items.length > 0);
      if (typeof json.viewerIsAdmin === "boolean") setViewerIsAdmin(json.viewerIsAdmin);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load feed");
      setHasMore(false);
    } finally {
      setLoading(false);
      if (requestSeq === requestSeqRef.current) {
        fetchingRef.current = false;
      }
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
      <div className="lib-shell">
      <header className="lib-head">
        <div className="lib-eyebrow">LIBRARY</div>
        <h1 className="lib-title">Every resource. Every Lounge. One feed.</h1>
      </header>

      <div className="lib-with-sidebar">
        <OriginalsSidebar />

        <div className="lib-feed-col">

      <div className="lib-controls">
        <div className="lib-action-row">
          <button
            type="button"
            className="lib-upload-btn"
            onClick={openUploadDialog}
            disabled={uploading || profileStatus === "loading"}
          >
            {uploading ? "Uploading..." : "+ Upload to Library"}
          </button>
          <span className="lib-upload-hint">
            Upload notes, guides, FRQs, study plans, or essays directly here.
          </span>
        </div>

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

      {uploadOpen && (
        <div className="lib-upload-backdrop" role="presentation" onMouseDown={closeUploadDialog}>
          <div
            className="lib-upload-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="library-upload-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="lib-upload-head">
              <div>
                <div className="lib-upload-kicker">PUBLISH RESOURCE</div>
                <h2 id="library-upload-title" className="lib-upload-title">Upload straight to Library</h2>
              </div>
              <button
                type="button"
                className="lib-upload-close"
                onClick={closeUploadDialog}
                disabled={uploading}
                aria-label="Close upload"
              >
                ×
              </button>
            </div>

            <label className="lib-upload-drop">
              <input
                type="file"
                className="lib-upload-input"
                onChange={onUploadFileChange}
                disabled={uploading}
              />
              <span className="lib-upload-drop-icon">⇧</span>
              <span className="lib-upload-drop-title">
                {uploadFile ? uploadFile.name : "Choose a file"}
              </span>
              <span className="lib-upload-drop-sub">
                {uploadFile
                  ? `${formatBytes(uploadFile.size)} · ${uploadFile.type || "file"}`
                  : `PDFs, images, and documents up to ${MAX_LIBRARY_UPLOAD_LABEL}`}
              </span>
            </label>

            <label className="lib-upload-field">
              <span>Display title</span>
              <input
                value={uploadTitle}
                onChange={(event) => setUploadTitle(event.target.value)}
                placeholder="Resource title"
                disabled={uploading}
              />
            </label>

            <label className="lib-upload-field">
              <span>Lounge</span>
              <select
                value={uploadLounge}
                onChange={(event) => setUploadLounge(event.target.value)}
                disabled={uploading}
              >
                {(lounges.length > 0 ? lounges : [{ slug: "ap-bio", name: "AP Biology Lounge", subjectCategory: "AP Biology" }]).map((lounge) => (
                  <option key={lounge.slug} value={lounge.slug}>
                    {lounge.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="lib-upload-folder-label">Folder</div>
            <div className="lib-upload-groups">
              {USER_UPLOADABLE_GROUPS.map((groupKey) => (
                <button
                  key={groupKey}
                  type="button"
                  className={`lib-upload-group ${uploadGroup === groupKey ? "is-active" : ""}`}
                  onClick={() => setUploadGroup(groupKey)}
                  disabled={uploading}
                >
                  <span className="lib-upload-group-emoji" aria-hidden="true">{DOC_GROUP_EMOJI[groupKey]}</span>
                  <span className="lib-upload-group-name">{DOC_GROUP_LABELS[groupKey]}</span>
                  <span className="lib-upload-group-blurb">{DOC_GROUP_BLURBS[groupKey]}</span>
                </button>
              ))}
            </div>

            {uploadError && <div className="lib-upload-error">{uploadError}</div>}

            <div className="lib-upload-actions">
              <button type="button" className="lib-upload-cancel" onClick={closeUploadDialog} disabled={uploading}>
                Cancel
              </button>
              <button type="button" className="lib-upload-submit" onClick={() => void uploadToLibrary()} disabled={uploading || !uploadFile}>
                {uploading ? "Publishing..." : "Publish to Library"}
              </button>
            </div>
          </div>
        </div>
      )}

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

        </div>{/* /lib-feed-col */}
      </div>{/* /lib-with-sidebar */}
      </div>{/* /lib-shell */}

      <style jsx>{`
        .lib-root {
          --accent: #5eead4;
          --gold: #F4C95D;
          min-height: calc(100vh - 4rem);
          color: #d8d9e6;
          font-family: Inter, Space Grotesk, system-ui, sans-serif;
          position: relative;
        }

        /* Centered shell. The 1600px cap + 48px side padding give both
           panels real breathing room without going edge-to-edge on
           ultrawide. Header lives inside the shell so it lines up with
           the panel edges. */
        .lib-shell {
          max-width: 1800px;
          margin: 0 auto;
          padding: 2rem 3rem 4rem;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .lib-shell { padding: 1.75rem 1.5rem 3.5rem; }
        }
        @media (max-width: 760px) {
          .lib-shell { padding: 1.25rem 0.85rem 3rem; }
        }
        .lib-head { margin-bottom: 1.5rem; }

        /* 50/50 split — left half is the textbook cover grid (InHero
           Originals), right half is the community handwritten-note
           feed. Stacks below 1024 px so each pane keeps a usable
           width on tablet/phone. */
        .lib-with-sidebar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .lib-feed-col {
          min-width: 0;
          padding: 1.5rem;
          background: rgba(15, 18, 24, 0.6);
          border: 1px solid #232838;
          border-radius: 12px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        @media (max-width: 1024px) {
          .lib-with-sidebar { grid-template-columns: 1fr; gap: 1.25rem; }
          .lib-feed-col { padding: 1.25rem; }
        }
        .lib-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.22em;
          color: var(--accent);
          margin-bottom: 0.4rem;
        }
        .lib-title {
          font-family: Cormorant Garamond, serif;
          font-size: 2.1rem; font-weight: 600;
          letter-spacing: -0.01em;
          color: #f3f3fb;
          margin: 0;
        }

        .lib-controls { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.4rem; }
        .lib-action-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.15rem;
        }
        .lib-upload-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.55rem;
          padding: 0.65rem 1rem;
          border: 1px solid rgba(94,234,212,0.65);
          border-radius: 999px;
          background: linear-gradient(135deg, #5eead4, #8cf6e8);
          color: #071014;
          font-family: ui-monospace, monospace;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          cursor: pointer;
          box-shadow: 0 12px 34px rgba(94,234,212,0.2);
        }
        .lib-upload-btn:hover:not(:disabled) { filter: brightness(1.04); transform: translateY(-1px); }
        .lib-upload-btn:disabled { opacity: 0.55; cursor: default; }
        .lib-upload-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: rgba(148,163,184,0.68);
        }
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

        .lib-upload-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(2,4,12,0.76);
          backdrop-filter: blur(10px);
        }
        .lib-upload-panel {
          width: min(100%, 34rem);
          max-height: min(92vh, 48rem);
          overflow-y: auto;
          padding: 1.1rem;
          border: 1px solid rgba(94,234,212,0.24);
          border-radius: 18px;
          background:
            radial-gradient(circle at 20% 0%, rgba(94,234,212,0.14), transparent 44%),
            radial-gradient(circle at 100% 20%, rgba(244,201,93,0.1), transparent 38%),
            rgba(8,10,20,0.98);
          box-shadow: 0 28px 90px rgba(0,0,0,0.62), 0 0 36px rgba(94,234,212,0.12);
        }
        .lib-upload-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.95rem;
        }
        .lib-upload-kicker {
          font-family: ui-monospace, monospace;
          font-size: 0.64rem;
          font-weight: 900;
          letter-spacing: 0.2em;
          color: var(--accent);
        }
        .lib-upload-title {
          margin: 0.15rem 0 0;
          font-family: Cormorant Garamond, serif;
          font-size: 1.55rem;
          line-height: 1.05;
          color: #f3f3fb;
        }
        .lib-upload-close {
          width: 2rem;
          height: 2rem;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          color: rgba(216,217,230,0.85);
          font-size: 1.25rem;
          cursor: pointer;
        }
        .lib-upload-close:hover:not(:disabled) { color: #ff8b7e; border-color: rgba(255,139,126,0.34); }
        .lib-upload-drop {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          min-height: 9.5rem;
          padding: 1rem;
          border: 1px dashed rgba(94,234,212,0.38);
          border-radius: 14px;
          background: rgba(94,234,212,0.05);
          cursor: pointer;
          text-align: center;
        }
        .lib-upload-input { display: none; }
        .lib-upload-drop-icon {
          width: 2.25rem;
          height: 2.25rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(94,234,212,0.15);
          color: var(--accent);
          font-family: ui-monospace, monospace;
          font-weight: 900;
        }
        .lib-upload-drop-title {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #f3f3fb;
          font-weight: 800;
        }
        .lib-upload-drop-sub {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: rgba(148,163,184,0.72);
        }
        .lib-upload-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.8rem;
        }
        .lib-upload-field > span,
        .lib-upload-folder-label {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          color: rgba(216,217,230,0.76);
          text-transform: uppercase;
        }
        .lib-upload-field input,
        .lib-upload-field select {
          width: 100%;
          min-height: 2.55rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          color: #f3f3fb;
          padding: 0.65rem 0.75rem;
          font-family: inherit;
          outline: none;
        }
        .lib-upload-field input:focus,
        .lib-upload-field select:focus {
          border-color: rgba(94,234,212,0.65);
          box-shadow: 0 0 0 1px rgba(94,234,212,0.3);
        }
        .lib-upload-folder-label { margin-top: 0.85rem; margin-bottom: 0.45rem; }
        .lib-upload-groups {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
        }
        .lib-upload-group {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.18rem 0.45rem;
          align-items: start;
          padding: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: rgba(255,255,255,0.035);
          color: rgba(216,217,230,0.9);
          text-align: left;
          cursor: pointer;
        }
        .lib-upload-group.is-active {
          border-color: rgba(94,234,212,0.7);
          background: rgba(94,234,212,0.12);
          color: #f3f3fb;
        }
        .lib-upload-group-emoji { grid-row: span 2; }
        .lib-upload-group-name { font-size: 0.82rem; font-weight: 800; }
        .lib-upload-group-blurb {
          font-size: 0.68rem;
          color: rgba(148,163,184,0.74);
        }
        .lib-upload-error {
          margin-top: 0.8rem;
          padding: 0.72rem 0.8rem;
          border: 1px solid rgba(255,139,126,0.35);
          border-radius: 10px;
          background: rgba(255,139,126,0.08);
          color: #ff8b7e;
          font-size: 0.82rem;
        }
        .lib-upload-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.55rem;
          margin-top: 1rem;
        }
        .lib-upload-cancel,
        .lib-upload-submit {
          min-height: 2.4rem;
          padding: 0.58rem 0.9rem;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          cursor: pointer;
        }
        .lib-upload-cancel {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          color: rgba(216,217,230,0.88);
        }
        .lib-upload-submit {
          border: 1px solid var(--accent);
          background: var(--accent);
          color: #071014;
        }
        .lib-upload-cancel:disabled,
        .lib-upload-submit:disabled {
          opacity: 0.5;
          cursor: default;
        }
        @media (max-width: 560px) {
          .lib-upload-groups { grid-template-columns: 1fr; }
          .lib-upload-actions { flex-direction: column-reverse; }
          .lib-upload-cancel,
          .lib-upload-submit { width: 100%; }
        }

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
        /* Masonry inside the right-hand panel. Tighter column-width
           than the old full-bleed feed because the panel is now
           ~half the viewport — 220px gives 2 columns at ~700px panel
           and one column on phones. */
        .lib-grid {
          column-width: 220px;
          column-gap: 0.9rem;
        }
        @media (max-width: 760px) {
          .lib-grid { column-width: 150px; column-gap: 0.6rem; }
        }
        /* Phone: drop to a single full-width column for readability —
           the masonry 2-up at 160px is too cramped on a 375px screen. */
        @media (max-width: 480px) {
          .lib-grid { column-count: 1; column-width: auto; }
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

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}

function feedDedupeKey(item: FeedItem): string {
  // Keep client dedupe strictly id-based so legitimate uploads are never
  // hidden by an over-broad title collapse rule.
  return item.id;
}

function collapseFeedDuplicates(items: FeedItem[]): FeedItem[] {
  const seen = new Set<string>();
  const out: FeedItem[] = [];
  for (const item of items) {
    const key = feedDedupeKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
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
  useEffect(() => {
    if (item.previewPage1Url) {
      setLocalPreview1Url(item.previewPage1Url);
      setBackfillFailed(false);
    }
  }, [item.id, item.previewPage1Url]);

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
      if (res.status === 404) {
        // Old/stale cards may point at IDs that no longer exist. The user
        // intent is still satisfied: remove it locally and do not alert.
        setConfirming(false);
        onDeleted(item.id);
        return;
      }
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
            "{item.title}" will disappear from the Library and its Lounge attachment. This action cannot be undone.
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
          {item.mimeType === "application/pdf" && typeof item.totalPages === "number" && item.totalPages > 0 && (
            <span
              className="fc-time"
              title={`${item.totalPages} page${item.totalPages === 1 ? "" : "s"} · ~1.5 min per page`}
            >
              ⏱ ~{Math.max(1, Math.ceil(item.totalPages * 1.5))} min read
            </span>
          )}
          {item.author && <span className="fc-author">by <em>{item.author.handle}</em></span>}
          <span className="fc-card-actions">
            {canDelete && (
              <button
                type="button"
                className="fc-delete-direct"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setConfirming(true);
                }}
              >
                Delete
              </button>
            )}
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
        .fc-time {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: JetBrains Mono, ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(0, 255, 178, 0.78);
          background: rgba(0, 255, 178, 0.06);
          border: 1px solid rgba(0, 255, 178, 0.20);
          padding: 0.18rem 0.5rem;
          border-radius: 9999px;
          flex-shrink: 0;
        }
        .fc-author em {
          font-family: Cormorant Garamond, serif;
          font-style: italic;
          font-size: 1.05em;
          font-weight: 600;
          color: #f3f3fb;
        }
        .fc-card-actions {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-left: auto;
        }
        .fc-delete-direct {
          border: 1px solid rgba(255,139,126,0.32);
          border-radius: 999px;
          background: rgba(255,139,126,0.08);
          color: #ff8b7e;
          padding: 0.22rem 0.48rem;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .fc-delete-direct:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(255,139,126,0.58);
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
