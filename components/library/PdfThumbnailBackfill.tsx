"use client";

// Browser-side PDF thumbnail generator. Mounted by the library card
// when a PDF resource has no preview_page_1_url yet. Uses pdfjs in the
// browser (same engine the reader already uses, with the worker file
// served from /pdf.worker.min.mjs) to render page 1 to a canvas at
// 800px width, uploads the PNG to Supabase Storage via a signed URL,
// then PATCHes the row.
//
// Renders nothing in the DOM. Self-throttled by an IntersectionObserver
// on a marker so we only do the work for cards a viewer actually sees.
// Also self-throttled by a per-session Set so we don't loop on rows
// the API refused.

import { useEffect, useRef } from "react";
import { authFetch } from "@/lib/client-auth";

const PDFJS_VERSION = "5.7.284";
const TARGET_WIDTH = 800;
const VIEWPORT_MARGIN = "200px";

const inFlightOrDone = new Set<string>();

interface Props {
  resourceId: string;
  onGenerated: (url: string) => void;
}

export default function PdfThumbnailBackfill({ resourceId, onGenerated }: Props) {
  const markerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = markerRef.current;
    if (!node) return;
    if (inFlightOrDone.has(resourceId)) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    async function run() {
      if (inFlightOrDone.has(resourceId)) return;
      inFlightOrDone.add(resourceId);
      try {
        const fileResp = await authFetch(`/api/library/resource/${resourceId}/file`, {
          cache: "no-store",
        });
        if (!fileResp.ok) throw new Error(`fetch pdf: ${fileResp.status}`);
        const bytes = new Uint8Array(await fileResp.arrayBuffer());
        if (cancelled) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const loadingTask = pdfjsLib.getDocument({
          data: bytes,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/standard_fonts/`,
        });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = TARGET_WIDTH / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no 2d context");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        if (cancelled) return;

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/png", 0.92),
        );
        if (!blob) throw new Error("toBlob returned null");
        if (cancelled) return;

        const signResp = await authFetch(`/api/library/resource/${resourceId}/preview/sign`, {
          method: "POST",
        });
        if (signResp.status === 409) {
          // Another tab/viewer already generated it. Read the URL back
          // from the response and surface it; the row is already
          // patched.
          const j = (await signResp.json().catch(() => null)) as { url?: string } | null;
          if (j?.url) onGenerated(j.url);
          return;
        }
        if (!signResp.ok) throw new Error(`sign: ${signResp.status}`);
        const signed = (await signResp.json()) as {
          signedUrl: string;
          path: string;
          token: string;
        };

        // Supabase signed upload URL accepts PUT with the file body.
        const putResp = await fetch(signed.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": "image/png" },
          body: blob,
        });
        if (!putResp.ok && putResp.status !== 200) {
          throw new Error(`upload: ${putResp.status}`);
        }
        if (cancelled) return;

        const finalizeResp = await authFetch(
          `/api/library/resource/${resourceId}/preview/finalize`,
          { method: "POST" },
        );
        if (!finalizeResp.ok) throw new Error(`finalize: ${finalizeResp.status}`);
        const finalized = (await finalizeResp.json()) as { previewPage1Url?: string };
        if (cancelled || !finalized.previewPage1Url) return;
        onGenerated(finalized.previewPage1Url);
      } catch {
        // Swallow — generation is opportunistic. Leave the placeholder
        // in place. Another viewer/refresh can try again next session
        // (the in-flight Set is module-scoped, per-session).
      }
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer?.disconnect();
          void run();
        }
      },
      { rootMargin: VIEWPORT_MARGIN },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [resourceId, onGenerated]);

  // Marker for IntersectionObserver. Zero visual footprint.
  return <div ref={markerRef} aria-hidden="true" style={{ width: 0, height: 0 }} />;
}
