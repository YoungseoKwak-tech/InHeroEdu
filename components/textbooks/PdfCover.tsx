"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  url: string;
  width?: number;
}

export default function PdfCover({ url, width = 340 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setFallback(false);

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF (${response.status})`);
        }

        const bytes = new Uint8Array(await response.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
        const page = await pdf.getPage(1);

        if (cancelled || !canvasRef.current) return;

        const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        await (page.render as any)({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setLoading(false);
          setFallback(true);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [url, width]);

  if (fallback) {
    return (
      <div style={{ position: "relative", width, aspectRatio: "8.5/11", overflow: "hidden", background: "#1A1208" }}>
        <iframe
          src={`${url}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          title="PDF cover preview"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            pointerEvents: "none",
            background: "#1A1208",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width, aspectRatio: "8.5/11" }}>
      {loading && (
        <div style={{ position: "absolute", inset: 0, background: "#0F0B06", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "24px", height: "24px", border: "1px solid #C8923A", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: loading ? "none" : "block", objectFit: "cover" }}
      />
    </div>
  );
}
