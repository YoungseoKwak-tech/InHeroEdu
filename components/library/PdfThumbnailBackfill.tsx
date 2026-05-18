"use client";

// Browser-side PDF thumbnail generator. Mounted by the library card
// when a PDF resource has no preview_page_1_url yet. Uses pdfjs in the
// browser (same engine the reader already uses) to render page 1, then
// uploads via the existing /preview/sign + /preview/finalize pair.
//
// Renders nothing in the DOM. Self-throttled by an IntersectionObserver
// on a marker so we only do the work for cards a viewer actually sees.
// Also self-throttled by a per-session Set so we don't loop on rows
// the API refused, and a 2-slot semaphore so we don't fire all visible
// renders at once.

import { useEffect, useRef } from "react";
import { authFetch } from "@/lib/client-auth";
import { renderPdfPage1ToJpegBlob } from "@/lib/pdfThumbnailRender";
import { uploadThumbnailForResource } from "@/lib/clientThumbnailUpload";

const VIEWPORT_MARGIN = "200px";
const MAX_CONCURRENT = 2;

const inFlightOrDone = new Set<string>();

// Temporary: post structured failure payloads to /api/diag so the
// silent catch below isn't a debugging dead end. Remove once the
// upload flow is verified working end-to-end on prod.
function diag(payload: Record<string, unknown>) {
  try {
    void authFetch("/api/diag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  } catch { /* ignore */ }
}

let activeGenerations = 0;
const waitingQueue: Array<() => void> = [];
function acquireSlot(): Promise<void> {
  if (activeGenerations < MAX_CONCURRENT) {
    activeGenerations++;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    waitingQueue.push(() => {
      activeGenerations++;
      resolve();
    });
  });
}
function releaseSlot() {
  activeGenerations--;
  const next = waitingQueue.shift();
  if (next) next();
}

interface Props {
  resourceId: string;
  onGenerated: (url: string) => void;
  // Called when the backfill bails — fetch error, pdfjs render
  // exception, sign endpoint 404 (e.g. the card came from a chat
  // message with no lounge_resources mirror), etc. Lets the card
  // swap the "Generating preview…" label for the emoji + filetype
  // fallback instead of stalling forever.
  onFailed?: () => void;
}

export default function PdfThumbnailBackfill({ resourceId, onGenerated, onFailed }: Props) {
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
      await acquireSlot();
      try {
        if (cancelled) return;
        const fileResp = await authFetch(`/api/library/resource/${resourceId}/file`, {
          cache: "no-store",
        });
        if (!fileResp.ok) throw new Error(`fetch pdf: ${fileResp.status}`);
        const bytes = new Uint8Array(await fileResp.arrayBuffer());
        if (cancelled) return;

        const blob = await renderPdfPage1ToJpegBlob(bytes);
        if (cancelled) return;

        const url = await uploadThumbnailForResource(resourceId, blob);
        if (cancelled || !url) return;
        onGenerated(url);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        const name = e instanceof Error ? e.name : undefined;
        // eslint-disable-next-line no-console
        console.error("[PdfThumbnailBackfill]", resourceId, name, msg);
        diag({
          source: "PdfThumbnailBackfill",
          resourceId,
          name,
          error: msg,
          ts: new Date().toISOString(),
        });
        if (!cancelled) onFailed?.();
      } finally {
        releaseSlot();
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
  }, [resourceId, onGenerated, onFailed]);

  return <div ref={markerRef} aria-hidden="true" style={{ width: 0, height: 0 }} />;
}
