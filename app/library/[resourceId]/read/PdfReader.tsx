"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
import {
  DOC_GROUP_EMOJI,
  DOC_GROUP_LABELS,
  type DocGroup,
} from "@/lib/docGroups";

interface Resource {
  id: string;
  title: string;
  folder: DocGroup;
  attachmentUrl: string;
  mimeType: string | null;
  isImage: boolean;
  isPdf: boolean;
  isInheroOfficial: boolean;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
}

/**
 * Optional drop-in data for callers outside /library (e.g. the
 * textbook chapter reader). When passed, the component skips its
 * /api/library/resource/{id} metadata fetch and uses the supplied
 * values directly; the PDF bytes are fetched from `fileUrl`
 * (callers point this at their own same-origin proxy so pdfjs can
 * avoid Supabase Storage CORS).
 *
 * The library code path (no source prop, reads resourceId from
 * URL params) is unchanged.
 */
export interface ReaderSource {
  fileUrl: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backHref: string;
  closeHref?: string;
}

interface Props {
  source?: ReaderSource;
}

// pdfjs returns this opaque-ish type; we only need a couple of methods.
type PdfDoc = {
  numPages: number;
  getPage(n: number): Promise<{
    getViewport(opts: { scale: number }): { width: number; height: number };
    render(opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown }): { promise: Promise<void> };
  }>;
};

type ViewMode = "spread" | "single";

const INACTIVITY_MS = 3000;
const MOBILE_BREAK = 768;

// Book convention: spread 1 shows the cover (right page only, no left).
// Subsequent spreads show 2N-2 / 2N-1.
function pagesForSpread(spread: number): { left: number | null; right: number | null } {
  if (spread <= 0) return { left: null, right: null };
  if (spread === 1) return { left: null, right: 1 };
  return { left: (spread - 1) * 2, right: (spread - 1) * 2 + 1 };
}

function maxSpreadFor(totalPages: number): number {
  if (totalPages <= 0) return 0;
  return Math.ceil((totalPages + 1) / 2);
}

function spreadForPage(page: number): number {
  if (page <= 1) return 1;
  return Math.ceil((page + 1) / 2);
}

export default function PdfReader({ source }: Props = {}) {
  const router = useRouter();
  const params = useParams<{ resourceId: string }>();
  // When a source prop is provided, the resourceId-from-URL path is
  // bypassed entirely. We still keep the local var defined so the
  // existing useEffect deps + JSX references compile unchanged.
  const resourceId = source ? null : params?.resourceId ?? null;

  const rootRef = useRef<HTMLDivElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const singleCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PdfDoc | null>(null);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [resource, setResource] = useState<Resource | null>(null);
  const [pageCount, setPageCount] = useState(0);
  // For single mode, "spread" is just the page number. The shared state
  // simplifies keyboard nav + slider — pagesForSpread() interprets it
  // differently depending on viewMode.
  const [position, setPosition] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("spread");
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [metaLoading, setMetaLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Purchase gate: the textbook /file proxy answers 403
  // { error: "elite_required" } when the signed-in student hasn't
  // bought this subject's Elite pass. Send them straight to /pricing
  // (the state just keeps the skeleton up during navigation).
  const [eliteRequired, setEliteRequired] = useState(false);
  // Auth gate: both file proxies answer 401 { error: "unauthorized" }
  // for logged-out visitors. Render a sign-in screen (with a redirect
  // back to this page) instead of the generic error.
  const [loginRequired, setLoginRequired] = useState(false);
  // PDF zoom — multiplier on top of the auto-fit base scale so + / −
  // actually grow / shrink the rendered canvas. Defaults to 1 (100%).
  const [zoomLevel, setZoomLevel] = useState(1);
  const ZOOM_MIN = 0.6;
  const ZOOM_MAX = 2.5;
  const ZOOM_STEP = 0.15;
  const zoomIn = useCallback(() => {
    setZoomLevel((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
  }, []);
  const zoomOut = useCallback(() => {
    setZoomLevel((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
  }, []);
  const zoomReset = useCallback(() => setZoomLevel(1), []);

  // Detect mobile + force single-page mode there.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAK}px)`);
    const apply = () => {
      setIsMobile(mq.matches);
      if (mq.matches) setViewMode("single");
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Reset inactivity timer + show controls. Wired to mousemove/touch/key.
  const bumpControls = useCallback(() => {
    setShowControls(true);
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => setShowControls(false), INACTIVITY_MS);
  }, []);

  useEffect(() => {
    bumpControls();
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [bumpControls]);

  // Load resource metadata. Source mode synthesizes the Resource
  // shape from the prop so the rest of the rendering code (which
  // reads resource.title, resource.isPdf, etc.) doesn't need to
  // know about the textbook caller.
  useEffect(() => {
    if (source) {
      setResource({
        id: "textbook-chapter",
        title: source.title,
        folder: "notes" as DocGroup,
        attachmentUrl: source.fileUrl,
        mimeType: "application/pdf",
        isImage: false,
        isPdf: true,
        isInheroOfficial: false,
        lounge: null,
        author: null,
      });
      setMetaLoading(false);
      setError(null);
      return;
    }
    if (!resourceId) return;
    let cancelled = false;
    setMetaLoading(true);
    setError(null);
    void (async () => {
      try {
        const res = await authFetch(`/api/library/resource/${resourceId}`);
        const raw = await res.text();
        let json: { resource?: Resource; error?: string } = {};
        try { json = raw ? JSON.parse(raw) : {}; } catch { /* ignore */ }
        if (res.status === 401) {
          if (!cancelled) setLoginRequired(true);
          return;
        }
        if (!res.ok || !json.resource) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        if (!cancelled) setResource(json.resource);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setMetaLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [resourceId, source]);

  // Load PDF bytes + parse with pdfjs. Timeout guards against a stuck
  // worker fetch (the previous "black screen" bug was a missing
  // pdf.worker.min.mjs — getDocument().promise hung forever).
  //
  // We fetch the file via our same-origin proxy /api/library/resource/[id]/file
  // because the chat-attachments Supabase bucket doesn't send a
  // CORS header for cross-origin fetch — direct fetch fails with
  // "Failed to fetch" in the browser. The proxy also auth-gates the
  // file, which the bucket itself does not (it's public-readable).
  useEffect(() => {
    if (!resource || !resource.isPdf) return;
    // Source mode points fileUrl at its own same-origin proxy
    // (e.g. /api/textbooks/[slug]/chapters/[n]/file). Library mode
    // uses the legacy proxy. Either way we go through authFetch so
    // cookies + auth headers travel.
    const fileUrl = source
      ? source.fileUrl
      : resourceId
        ? `/api/library/resource/${resourceId}/file`
        : null;
    if (!fileUrl) return;
    let cancelled = false;
    setPdfLoading(true);
    void (async () => {
      try {
        const response = await authFetch(fileUrl, {
          cache: "no-store",
        });
        if (!response.ok) {
          const text = await response.text().catch(() => "");
          if (response.status === 401) {
            if (!cancelled) setLoginRequired(true);
            return;
          }
          if (response.status === 403 && text.includes("elite_required")) {
            if (!cancelled) {
              setEliteRequired(true);
              // The reader also runs inside the lesson-page split-view
              // iframe — escape to the top window there so /pricing
              // doesn't render inside the pane.
              if (window.top && window.top !== window.self) {
                window.top.location.href = "/pricing";
              } else {
                router.replace("/pricing");
              }
            }
            return;
          }
          throw new Error(`Failed to load PDF (${response.status}) ${text.slice(0, 200)}`);
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        // cMapUrl + standardFontDataUrl: required for PDFs with CIDFont/
        // CMap-encoded glyphs. Sourced from jsdelivr (pinned to the
        // version in package.json) because Vercel's static asset deploy
        // for /public/cmaps was unreliable for this repo — see commits
        // 06fc515d, 20b246d9. We still ship the files locally in /public
        // for dev offline; the CDN is the production path.
        const PDFJS_VERSION = "5.7.284";
        const loadingTask = pdfjsLib.getDocument({
          data: bytes,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/standard_fonts/`,
        });
        const pdf = await Promise.race([
          loadingTask.promise,
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("PDF loader timed out. The pdf.js worker may be missing.")),
              30_000
            )
          ),
        ]);
        if (cancelled) return;
        pdfRef.current = pdf as PdfDoc;
        setPageCount((pdf as PdfDoc).numPages);
        setPosition(1);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setPdfLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [resource, source, resourceId, router]);

  // Current pair (depends on viewMode).
  const { leftPage, rightPage } = useMemo<{ leftPage: number | null; rightPage: number | null }>(() => {
    if (viewMode === "single") return { leftPage: null, rightPage: position };
    const { left, right } = pagesForSpread(position);
    return { leftPage: left, rightPage: right };
  }, [position, viewMode]);

  const maxPosition = useMemo(() => {
    if (pageCount === 0) return 1;
    return viewMode === "single" ? pageCount : maxSpreadFor(pageCount);
  }, [pageCount, viewMode]);

  // Render visible pages whenever position / viewMode changes.
  useEffect(() => {
    const pdf = pdfRef.current;
    if (!pdf || pageCount === 0) return;
    let cancelled = false;
    setRendering(true);

    async function renderTo(canvas: HTMLCanvasElement, pageNum: number, maxWidth: number) {
      if (!pdf) return;
      const page = await pdf.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1 });
      // Auto-fit to the container with the user-controlled zoom on top.
      const fit = Math.min(2.0, maxWidth / baseViewport.width) * zoomLevel;
      // Render at the device pixel ratio so text is crisp on retina screens;
      // the canvas is then displayed at the fit (CSS) size, so layout is
      // unchanged but the backing store has 2× the pixels.
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const viewport = page.getViewport({ scale: fit * dpr });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
    }

    void (async () => {
      try {
        if (viewMode === "single") {
          const c = singleCanvasRef.current;
          if (!c || !rightPage) return;
          const maxW = Math.min(900, window.innerWidth - 64);
          await renderTo(c, rightPage, maxW);
        } else {
          // Spread: each page gets up to ~half the available width.
          const halfMax = Math.min(620, (window.innerWidth - 96) / 2);
          if (leftPage && leftCanvasRef.current) {
            await renderTo(leftCanvasRef.current, leftPage, halfMax);
          }
          if (cancelled) return;
          if (rightPage && rightPage <= pageCount && rightCanvasRef.current) {
            await renderTo(rightCanvasRef.current, rightPage, halfMax);
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setRendering(false);
      }
    })();
    return () => { cancelled = true; };
  }, [leftPage, rightPage, viewMode, pageCount, zoomLevel]);

  // Step forwards/backwards in the current viewMode's unit.
  const goPrev = useCallback(() => {
    setPosition((p) => Math.max(1, p - 1));
    bumpControls();
  }, [bumpControls]);

  const goNext = useCallback(() => {
    setPosition((p) => Math.min(maxPosition, p + 1));
    bumpControls();
  }, [maxPosition, bumpControls]);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      void rootRef.current?.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      void document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Sync fullscreen state when user presses Esc / external triggers.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Toggle view mode without losing reading position.
  const toggleViewMode = useCallback(() => {
    setViewMode((mode) => {
      if (mode === "spread") {
        // → single: jump to the page currently visible.
        const pair = pagesForSpread(position);
        const target = pair.left ?? pair.right ?? 1;
        setPosition(target);
        return "single";
      }
      // → spread: pick the spread containing the current page.
      setPosition(spreadForPage(position));
      return "spread";
    });
  }, [position]);

  // Keyboard navigation + save/print guards.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goPrev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        if (e.key === " ") e.preventDefault();
        goNext();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, toggleFullscreen]);

  if (metaLoading) return <ReaderSkeleton />;
  if (loginRequired)
    return (
      <ReaderLoginRequired
        title={source?.title ?? resource?.title ?? "this resource"}
        backHref={source?.backHref ?? "/library"}
      />
    );
  // Redirecting to /pricing — keep the skeleton up so nothing flashes.
  if (eliteRequired) return <ReaderSkeleton />;
  if (error || !resource) return <ReaderError message={error} resourceId={resourceId ?? undefined} />;

  // Back arrow + close × destinations. Source mode (textbook
  // chapter reader) routes both back to the chapter overview by
  // default; library mode keeps the existing /library/{id} +
  // /library targets.
  const detailHref = source?.backHref ?? `/library/${resourceId}`;
  const closeHref = source?.closeHref ?? source?.backHref ?? "/library";
  const pageIndicator =
    viewMode === "spread"
      ? leftPage && rightPage && rightPage <= pageCount
        ? `${leftPage}-${rightPage} / ${pageCount}`
        : leftPage
          ? `${leftPage} / ${pageCount}`
          : `${rightPage ?? ""} / ${pageCount}`
      : `${position} / ${pageCount}`;

  return (
    <div
      ref={rootRef}
      className={`rd-root ${isFullscreen ? "is-fs" : ""}`}
      onMouseMove={bumpControls}
      onTouchStart={bumpControls}
      onContextMenu={(e) => e.preventDefault()}
    >
      <header className={`rd-top ${!showControls ? "is-hidden" : ""}`}>
        <Link href={detailHref} className="rd-icon-btn rd-back" aria-label="Back to detail">
          ←
        </Link>
        <div className="rd-titleblock">
          <div className="rd-title">{resource.title}</div>
          <div className="rd-sub">
            {source ? (
              <>
                {source.eyebrow && <span className="rd-badge rd-badge-official">{source.eyebrow}</span>}
                {source.subtitle && <span>{source.subtitle}</span>}
              </>
            ) : (
              <>
                {resource.isInheroOfficial && <span className="rd-badge rd-badge-official">⭐ INHERO</span>}
                {!resource.isInheroOfficial && <span className="rd-badge rd-badge-community">✦ ORIGINAL</span>}
                <span aria-hidden="true">{DOC_GROUP_EMOJI[resource.folder]}</span>{" "}
                {DOC_GROUP_LABELS[resource.folder]}
                {resource.lounge && (
                  <>
                    {" · "}
                    <Link href={`/lounges/${resource.lounge.slug}`} className="rd-lounge-link">
                      {resource.lounge.name}
                    </Link>
                  </>
                )}
                {resource.author && (
                  <>
                    {" · "}by <em>{resource.author.handle}</em>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="rd-actions">
          {/* Zoom controls — inline with the existing top toolbar so they
              are always visible (works inside the lesson-page split-view
              iframe too). */}
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoomLevel <= ZOOM_MIN}
            className="rd-icon-btn"
            title="Zoom out (−)"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={zoomReset}
            className="rd-icon-btn rd-zoom-pct"
            title="Reset zoom (100%)"
            aria-label="Reset zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoomLevel >= ZOOM_MAX}
            className="rd-icon-btn"
            title="Zoom in (+)"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rd-icon-btn"
            title="Fullscreen (F)"
            aria-label="Toggle fullscreen"
          >
            ⤢
          </button>
          {(source?.fileUrl ?? resource.attachmentUrl) && (
            <a
              href={source?.fileUrl ?? resource.attachmentUrl}
              download={`${resource.title}.pdf`}
              className="rd-icon-btn"
              title="원본 PDF 다운로드"
              aria-label="Download PDF"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            >
              📥
            </a>
          )}
          <button
            type="button"
            disabled
            className="rd-icon-btn rd-icon-disabled"
            title="Comments — ships next round"
            aria-label="Comments (coming soon)"
          >
            💬
          </button>
          <button
            type="button"
            disabled
            className="rd-icon-btn rd-icon-disabled"
            title="Chapters — ships next round"
            aria-label="Chapters (coming soon)"
          >
            📑
          </button>
          <Link href={closeHref} className="rd-icon-btn" title="Close (Esc)" aria-label="Close reader">
            ×
          </Link>
        </div>
      </header>

      <main className={`rd-stage view-${viewMode}`}>
        {/* 20% click zones for page nav, hidden when no PDF loaded */}
        {resource.isPdf && pageCount > 0 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={position <= 1}
              className="rd-nav-zone is-left"
              aria-label="Previous page"
            />
            <button
              type="button"
              onClick={goNext}
              disabled={position >= maxPosition}
              className="rd-nav-zone is-right"
              aria-label="Next page"
            />
          </>
        )}

        {resource.isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resource.attachmentUrl}
            alt={resource.title}
            className="rd-img"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        ) : resource.isPdf ? (
          <>
            {pageCount > 0 && (
              <div className={`rd-book ${viewMode === "spread" ? "is-spread" : "is-single"}`}>
                {viewMode === "spread" ? (
                  <>
                    {leftPage ? (
                      <div className="rd-page rd-page-left">
                        <canvas ref={leftCanvasRef} className="rd-canvas" />
                      </div>
                    ) : (
                      <div className="rd-page rd-page-blank" aria-hidden="true" />
                    )}
                    {rightPage && rightPage <= pageCount ? (
                      <div className="rd-page rd-page-right">
                        <canvas ref={rightCanvasRef} className="rd-canvas" />
                      </div>
                    ) : (
                      <div className="rd-page rd-page-blank" aria-hidden="true" />
                    )}
                  </>
                ) : (
                  <div className="rd-page rd-page-single">
                    <canvas ref={singleCanvasRef} className="rd-canvas" />
                  </div>
                )}
                {rendering && (
                  <div className="rd-stage-overlay">Rendering page…</div>
                )}
              </div>
            )}
            {(pdfLoading || pageCount === 0) && (
              <div className="rd-load">
                <div className="rd-load-spinner" aria-hidden="true" />
                <div className="rd-load-text">Opening reader…</div>
              </div>
            )}
          </>
        ) : (
          <div className="rd-unsupported">
            <div className="rd-unsupported-emoji" aria-hidden="true">{DOC_GROUP_EMOJI[resource.folder]}</div>
            <div>No inline reader for {resource.mimeType ?? "this file type"} yet.</div>
            <Link href={detailHref} className="rd-back-inline">← Back to detail</Link>
          </div>
        )}
      </main>

      {resource.isPdf && pageCount > 0 && (
        <footer className={`rd-bottom ${!showControls ? "is-hidden" : ""}`}>
          <button type="button" onClick={goPrev} disabled={position <= 1} className="rd-step">◀</button>
          <div className="rd-pageinfo">
            <span className="rd-pagenum">{pageIndicator}</span>
            <input
              type="range"
              min={1}
              max={maxPosition}
              value={position}
              onChange={(e) => { setPosition(Number(e.target.value)); bumpControls(); }}
              className="rd-slider"
              aria-label="Page slider"
            />
          </div>
          <button type="button" onClick={goNext} disabled={position >= maxPosition} className="rd-step">▶</button>
          {!isMobile && (
            <button
              type="button"
              onClick={toggleViewMode}
              className="rd-mode"
              title={viewMode === "spread" ? "Switch to single-page" : "Switch to two-page spread"}
            >
              {viewMode === "spread" ? "📄 1-page" : "📖 2-page"}
            </button>
          )}
        </footer>
      )}

      <style jsx>{`
        .rd-root {
          --accent: #5eead4;
          --gold: #F4C95D;
          position: fixed;
          inset: 0;
          display: flex; flex-direction: column;
          background: linear-gradient(180deg, #0a0612 0%, #1a0e2e 100%);
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
          z-index: 1000;
        }
        .rd-root.is-fs { background: #000; }

        .rd-top {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 0.8rem 1.1rem;
          background: rgba(10,6,18,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: opacity 400ms ease, transform 400ms ease;
          z-index: 11;
        }
        .rd-top.is-hidden {
          opacity: 0;
          transform: translateY(-100%);
          pointer-events: none;
        }
        .rd-icon-btn {
          width: 36px; height: 36px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          color: rgba(255,255,255,0.85);
          font-size: 1rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .rd-icon-btn:hover:not(:disabled) {
          background: rgba(94,234,212,0.15);
          border-color: rgba(94,234,212,0.4);
          color: var(--accent);
        }
        .rd-icon-disabled { opacity: 0.35; cursor: not-allowed; }
        .rd-back { font-size: 1.15rem; }
        /* Zoom %, wider than a square icon so "100%" fits. */
        .rd-zoom-pct {
          width: auto;
          padding: 0 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .rd-titleblock { flex: 1; min-width: 0; }
        .rd-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; font-weight: 600;
          color: rgba(255,255,255,0.94);
          line-height: 1.2;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .rd-sub {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.02em;
          margin-top: 0.2rem;
          display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;
          overflow: hidden;
        }
        .rd-sub em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 600;
          color: rgba(255,255,255,0.85);
        }
        .rd-badge {
          font-family: ui-monospace, monospace;
          font-size: 0.54rem; font-weight: 800; letter-spacing: 0.12em;
          padding: 0.16rem 0.36rem;
          border-radius: 0.22rem;
        }
        .rd-badge-official { background: rgba(244,201,93,0.85); color: #1a1306; }
        .rd-badge-community { background: rgba(94,234,212,0.85); color: #062320; }
        .rd-lounge-link { color: var(--accent); text-decoration: none; }
        .rd-lounge-link:hover { text-decoration: underline; }

        .rd-actions { display: inline-flex; gap: 0.4rem; flex-shrink: 0; }

        .rd-stage {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          padding: 1.5rem 1.25rem;
          overflow: hidden;
        }

        .rd-nav-zone {
          position: absolute;
          top: 0; bottom: 0;
          width: 20%;
          background: transparent;
          border: 0;
          cursor: pointer;
          z-index: 6;
          transition: background 200ms;
        }
        .rd-nav-zone.is-left { left: 0; cursor: w-resize; }
        .rd-nav-zone.is-right { right: 0; cursor: e-resize; }
        .rd-nav-zone:hover:not(:disabled) {
          background: linear-gradient(
            to var(--side, right),
            rgba(255,255,255,0.05), transparent
          );
        }
        .rd-nav-zone.is-left:hover:not(:disabled) {
          background: linear-gradient(to right, rgba(255,255,255,0.05), transparent);
        }
        .rd-nav-zone.is-right:hover:not(:disabled) {
          background: linear-gradient(to left, rgba(255,255,255,0.05), transparent);
        }
        .rd-nav-zone:disabled { cursor: default; }

        .rd-img {
          max-width: 100%;
          max-height: calc(100vh - 8rem);
          object-fit: contain;
          -webkit-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }

        .rd-book {
          position: relative;
          display: flex;
          gap: 0;
          background: #fefefe;
          border-radius: 4px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 8px 32px rgba(0,0,0,0.4);
          max-width: min(1400px, 96vw);
          max-height: calc(100vh - 9rem);
        }
        .rd-book.is-single { max-width: min(900px, 92vw); }

        .rd-page {
          position: relative;
          flex: 1;
          min-width: 0;
          background: #fefefe;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .rd-page-left::after,
        .rd-page-right::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 22px;
          pointer-events: none;
        }
        .rd-page-left::after {
          right: 0;
          background: linear-gradient(to right, transparent, rgba(0,0,0,0.16));
        }
        .rd-page-right::before {
          left: 0;
          background: linear-gradient(to left, transparent, rgba(0,0,0,0.16));
        }
        .rd-page-blank { background: rgba(254,254,254,0.6); }
        .rd-canvas {
          display: block;
          max-width: 100%;
          max-height: 100%;
          height: auto;
          width: auto;
          pointer-events: none;
          -webkit-user-drag: none;
          user-drag: none;
        }

        .rd-stage-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(8,9,15,0.55);
          color: rgba(216,217,230,0.92);
          font-family: ui-monospace, monospace;
          font-size: 0.78rem; letter-spacing: 0.08em;
          backdrop-filter: blur(2px);
          z-index: 4;
        }

        /* Stage-level loader — visible while PDF bytes + worker are still
           fetching. Lives outside .rd-book because that element has no
           size until pageCount > 0, which would hide an inner overlay. */
        .rd-load {
          display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
          color: rgba(216,217,230,0.78);
          font-family: ui-monospace, monospace;
          font-size: 0.78rem; letter-spacing: 0.08em;
        }
        .rd-load-spinner {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2.5px solid rgba(94,234,212,0.2);
          border-top-color: var(--accent);
          animation: rd-spin 0.85s linear infinite;
        }
        @keyframes rd-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .rd-unsupported {
          display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
          padding: 3rem;
          color: rgba(148,163,184,0.8);
          text-align: center;
        }
        .rd-unsupported-emoji { font-size: 3.5rem; line-height: 1; }
        .rd-back-inline {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          color: var(--accent);
          text-decoration: none;
          margin-top: 0.6rem;
        }

        .rd-bottom {
          display: flex; align-items: center; justify-content: center; gap: 1rem;
          padding: 0.85rem 1.2rem 1.1rem;
          background: rgba(10,6,18,0.85);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.06);
          transition: opacity 400ms ease, transform 400ms ease;
        }
        .rd-bottom.is-hidden {
          opacity: 0;
          transform: translateY(100%);
          pointer-events: none;
        }
        .rd-step {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          color: rgba(216,217,230,0.92);
          font-family: ui-monospace, monospace;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .rd-step:hover:not(:disabled) {
          background: rgba(94,234,212,0.12);
          border-color: rgba(94,234,212,0.45);
          color: var(--accent);
        }
        .rd-step:disabled { opacity: 0.32; cursor: default; }

        .rd-pageinfo {
          flex: 1;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          max-width: 480px;
        }
        .rd-pagenum {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(216,217,230,0.7);
        }
        .rd-slider {
          width: 100%;
          accent-color: var(--accent);
        }

        .rd-mode {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
          padding: 0.5rem 0.8rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          color: rgba(216,217,230,0.92);
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .rd-mode:hover {
          background: rgba(94,234,212,0.12);
          border-color: rgba(94,234,212,0.45);
          color: var(--accent);
        }

        @media (max-width: ${MOBILE_BREAK}px) {
          .rd-top { padding: 0.6rem 0.7rem; }
          .rd-icon-btn { width: 32px; height: 32px; font-size: 0.92rem; }
          .rd-title { font-size: 0.92rem; }
          .rd-sub { font-size: 0.62rem; }
          .rd-stage { padding: 0.6rem; }
          .rd-book { max-height: calc(100dvh - 7.5rem); }
          .rd-mode { display: none; }
        }

        @media print {
          .rd-root { display: none !important; }
        }
      `}</style>
      <style jsx global>{`
        @media print {
          body::before {
            content: "Reading materials are view-only inside InHero. Printing is disabled.";
            display: block; padding: 2rem; text-align: center;
            font-family: monospace;
          }
          body * { visibility: hidden !important; }
          body::before { visibility: visible !important; }
        }
      `}</style>
    </div>
  );
}

function ReaderSkeleton() {
  return (
    <main className="sk-root">
      <div className="sk-bar" />
      <div className="sk-stage" />
      <style jsx>{`
        .sk-root { min-height: 80vh; padding: 1.5rem; }
        .sk-bar, .sk-stage {
          background: linear-gradient(110deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%);
          background-size: 220% 100%;
          border-radius: 0.5rem;
          animation: sk-pulse 1.4s ease-in-out infinite;
        }
        .sk-bar { height: 48px; margin-bottom: 1rem; }
        .sk-stage { height: 70vh; }
        @keyframes sk-pulse {
          0%   { background-position: 220% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </main>
  );
}

function ReaderLoginRequired({ title, backHref }: { title: string; backHref: string }) {
  // Send the student back to this exact reader page after sign-in.
  const redirect =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.pathname)
      : "%2Flibrary";
  return (
    <main className="rlock-root">
      <div className="rlock-badge">SIGN IN REQUIRED</div>
      <h1>Log in to read {title}</h1>
      <p>
        The reader is available after sign-in. Log in (or create a free
        account) and you&apos;ll come right back to this page.
      </p>
      <div className="rlock-actions">
        <Link href={`/auth/login?redirect=${redirect}`} className="rlock-cta">Sign in →</Link>
        <Link href={backHref} className="rlock-back">← Back</Link>
      </div>
      <style jsx>{`
        .rlock-root {
          max-width: 560px;
          margin: 5rem auto;
          padding: 0 1.5rem;
          text-align: center;
          color: #d8d9e6;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .rlock-badge {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.22em;
          color: #5eead4;
          border: 1px solid rgba(94,234,212,0.45);
          border-radius: 999px;
          padding: 0.4rem 0.9rem;
          margin-bottom: 1.1rem;
        }
        h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.8rem;
        }
        p {
          color: rgba(148,163,184,0.8);
          margin: 0 0 1.8rem;
          font-size: 0.93rem;
          line-height: 1.7;
        }
        .rlock-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.9rem;
          flex-wrap: wrap;
        }
        .rlock-cta {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 800; letter-spacing: 0.12em;
          color: #062320;
          background: #5eead4;
          padding: 0.7rem 1.3rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 0 26px rgba(94,234,212,0.25);
        }
        .rlock-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          color: rgba(148,163,184,0.85);
          padding: 0.65rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
        }
        .rlock-back:hover { color: #5eead4; border-color: rgba(94,234,212,0.4); }
      `}</style>
    </main>
  );
}

function ReaderError({ message, resourceId }: { message: string | null; resourceId?: string }) {
  return (
    <main className="rerr-root">
      <h1>Can&apos;t open this resource</h1>
      <p>{message ?? "It may have been deleted, or you may not have access."}</p>
      <Link href={resourceId ? `/library/${resourceId}` : "/library"} className="rerr-back">← Back</Link>
      <style jsx>{`
        .rerr-root {
          max-width: 540px;
          margin: 5rem auto;
          padding: 0 1.5rem;
          text-align: center;
          color: #d8d9e6;
          font-family: 'Inter', system-ui, sans-serif;
        }
        h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.7rem;
        }
        p {
          color: rgba(148,163,184,0.75);
          margin: 0 0 1.5rem;
          font-size: 0.92rem;
        }
        .rerr-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          color: rgba(148,163,184,0.85);
          padding: 0.55rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
        }
        .rerr-back:hover { color: #5eead4; border-color: rgba(94,234,212,0.4); }
      `}</style>
    </main>
  );
}
