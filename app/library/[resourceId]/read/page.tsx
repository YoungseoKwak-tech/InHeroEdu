"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

// pdfjs returns this opaque-ish type; we only need a couple of methods.
type PdfDoc = {
  numPages: number;
  getPage(n: number): Promise<{
    getViewport(opts: { scale: number }): { width: number; height: number };
    render(opts: { canvasContext: CanvasRenderingContext2D; viewport: unknown }): { promise: Promise<void> };
  }>;
};

export default function ReadPage() {
  const params = useParams<{ resourceId: string }>();
  const resourceId = params?.resourceId;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PdfDoc | null>(null);

  const [resource, setResource] = useState<Resource | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [metaLoading, setMetaLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load resource metadata.
  useEffect(() => {
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
  }, [resourceId]);

  // Load PDF bytes + parse with pdfjs once we have the resource.
  useEffect(() => {
    if (!resource || !resource.isPdf) return;
    let cancelled = false;
    setPdfLoading(true);
    void (async () => {
      try {
        const response = await fetch(resource.attachmentUrl, { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to load PDF (${response.status})`);
        const bytes = new Uint8Array(await response.arrayBuffer());
        // Dynamic import — pdfjs is heavy and only needed here.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
        if (cancelled) return;
        pdfRef.current = pdf as PdfDoc;
        setPageCount(pdf.numPages);
        setCurrentPage(1);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setPdfLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [resource]);

  // Render the current page whenever it changes.
  useEffect(() => {
    if (!pdfRef.current || !canvasRef.current || pageCount === 0) return;
    let cancelled = false;
    setRendering(true);
    void (async () => {
      try {
        const pdf = pdfRef.current!;
        const canvas = canvasRef.current!;
        const page = await pdf.getPage(currentPage);
        const baseViewport = page.getViewport({ scale: 1 });
        const maxWidth = Math.min(960, window.innerWidth - 64);
        const scale = Math.min(1.8, maxWidth / baseViewport.width);
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setRendering(false);
      }
    })();
    return () => { cancelled = true; };
  }, [currentPage, pageCount]);

  // Keyboard nav + save/print guards.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentPage((p) => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        setCurrentPage((p) => Math.min(pageCount || 1, p + 1));
        if (e.key === " ") e.preventDefault();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pageCount]);

  const prev = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), []);
  const next = useCallback(() => setCurrentPage((p) => Math.min(pageCount || 1, p + 1)), [pageCount]);

  if (metaLoading) return <ReaderSkeleton />;
  if (error || !resource) return <ReaderError message={error} resourceId={resourceId} />;

  const detailHref = `/library/${resourceId}`;

  return (
    <main
      className="rr-root"
      onContextMenu={(e) => e.preventDefault()}
    >
      <header className="rr-topbar">
        <Link href={detailHref} className="rr-back">← Back</Link>
        <div className="rr-titleblock">
          <div className="rr-title">{resource.title}</div>
          <div className="rr-sub">
            {resource.isInheroOfficial && <span className="rr-badge rr-badge-official">⭐ INHERO ORIGINAL</span>}
            {!resource.isInheroOfficial && (
              <span className="rr-badge rr-badge-community">✦ ORIGINAL</span>
            )}
            <span aria-hidden="true">{DOC_GROUP_EMOJI[resource.folder]}</span>{" "}
            {DOC_GROUP_LABELS[resource.folder]}
            {resource.lounge && (
              <>
                {" · "}
                <Link href={`/lounges/${resource.lounge.slug}`} className="rr-lounge-link">
                  {resource.lounge.name}
                </Link>
              </>
            )}
            {resource.author && (
              <>
                {" · "}
                by <em>{resource.author.handle}</em>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="rr-stage">
        {resource.isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resource.attachmentUrl}
            alt={resource.title}
            className="rr-image"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        ) : resource.isPdf ? (
          <div className="rr-canvas-wrap">
            <canvas ref={canvasRef} className="rr-canvas" />
            {(pdfLoading || rendering) && <div className="rr-overlay">{pdfLoading ? "Opening reader…" : "Rendering page…"}</div>}
          </div>
        ) : (
          <div className="rr-unsupported">
            <div className="rr-unsupported-emoji" aria-hidden="true">{DOC_GROUP_EMOJI[resource.folder]}</div>
            <div>No inline reader for {resource.mimeType ?? "this file type"} yet.</div>
            <Link href={detailHref} className="rr-back-inline">← Back to detail</Link>
          </div>
        )}
      </div>

      {resource.isPdf && pageCount > 0 && (
        <footer className="rr-nav">
          <button type="button" onClick={prev} disabled={currentPage <= 1} className="rr-navbtn">← Prev</button>
          <div className="rr-pageinfo">
            <span>Page {currentPage} of {pageCount}</span>
            <input
              type="range"
              min={1}
              max={pageCount}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="rr-slider"
              aria-label="Page slider"
            />
          </div>
          <button type="button" onClick={next} disabled={currentPage >= pageCount} className="rr-navbtn">Next →</button>
        </footer>
      )}

      <style jsx>{`
        .rr-root {
          --accent: #5eead4;
          --gold: #F4C95D;
          min-height: calc(100vh - 4rem);
          display: flex; flex-direction: column;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
          user-select: none;
          -webkit-user-select: none;
        }

        .rr-topbar {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.5rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .rr-back {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          color: rgba(148,163,184,0.85);
          text-decoration: none;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
          transition: border-color 0.12s, color 0.12s;
        }
        .rr-back:hover { color: var(--accent); border-color: rgba(94,234,212,0.4); }

        .rr-titleblock { min-width: 0; flex: 1; }
        .rr-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 600;
          color: #f3f3fb;
          line-height: 1.2;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .rr-sub {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 600;
          color: rgba(148,163,184,0.85);
          letter-spacing: 0.02em;
          margin-top: 0.2rem;
          display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;
        }
        .rr-sub em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 600;
          color: #f3f3fb;
        }
        .rr-badge {
          font-family: ui-monospace, monospace;
          font-size: 0.56rem; font-weight: 800; letter-spacing: 0.12em;
          padding: 0.18rem 0.4rem;
          border-radius: 0.25rem;
        }
        .rr-badge-official { background: rgba(244,201,93,0.85); color: #1a1306; }
        .rr-badge-community { background: rgba(94,234,212,0.85); color: #062320; }
        .rr-lounge-link { color: var(--accent); text-decoration: none; }
        .rr-lounge-link:hover { text-decoration: underline; }

        .rr-stage {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 1.25rem 1.5rem;
          background: #08090f;
        }

        .rr-image {
          max-width: 100%;
          max-height: calc(100vh - 12rem);
          object-fit: contain;
          -webkit-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }

        .rr-canvas-wrap {
          position: relative;
          display: inline-block;
          background: #ffffff;
          border-radius: 0.4rem;
          box-shadow: 0 18px 60px rgba(0,0,0,0.55);
        }
        .rr-canvas {
          display: block;
          max-width: 100%;
          height: auto;
          pointer-events: none;
          -webkit-user-drag: none;
          user-drag: none;
        }
        .rr-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(8,9,15,0.65);
          color: rgba(216,217,230,0.9);
          font-family: ui-monospace, monospace;
          font-size: 0.78rem; letter-spacing: 0.08em;
          backdrop-filter: blur(2px);
        }

        .rr-unsupported {
          display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
          padding: 3rem;
          color: rgba(148,163,184,0.8);
          text-align: center;
        }
        .rr-unsupported-emoji { font-size: 3.5rem; line-height: 1; }
        .rr-back-inline {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          color: var(--accent);
          text-decoration: none;
          margin-top: 0.6rem;
        }

        .rr-nav {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.85rem 1.5rem 1.1rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .rr-navbtn {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 800; letter-spacing: 0.1em;
          padding: 0.55rem 0.95rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.45rem;
          color: rgba(216,217,230,0.92);
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .rr-navbtn:hover:not(:disabled) {
          background: rgba(94,234,212,0.1);
          border-color: rgba(94,234,212,0.45);
          color: var(--accent);
        }
        .rr-navbtn:disabled { opacity: 0.35; cursor: default; }

        .rr-pageinfo {
          flex: 1;
          display: flex; flex-direction: column; align-items: center; gap: 0.45rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.75);
        }
        .rr-slider {
          width: min(420px, 80%);
          accent-color: var(--accent);
        }

        @media print {
          .rr-root { display: none !important; }
        }
      `}</style>
      {/* Print kill-switch in case the user disables JS — CSS-only fallback */}
      <style jsx global>{`
        @media print {
          body::before {
            content: "Printing disabled. Resources read inside InHero only.";
            display: block; padding: 2rem; text-align: center;
            font-family: monospace;
          }
          body * { visibility: hidden !important; }
          body::before { visibility: visible !important; }
        }
      `}</style>
    </main>
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
