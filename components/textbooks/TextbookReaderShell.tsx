"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PaymentButton from "@/components/PaymentButton";
import { authFetch } from "@/lib/client-auth";

type ReaderMeta = {
  ok: boolean;
  product: {
    subjectId: string;
    title: string;
    chapters: number;
    priceKrw: number;
    readerHref: string;
  };
  hasFullAccess: boolean;
  accessReason: "preview" | "complimentary" | "purchased";
  previewPages: number;
  fileUrl: string;
};

type ReaderMarker = {
  title: string;
  page: number;
  depth?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatSubjectLabel(subjectId: string) {
  return subjectId.replace(/-/g, " ").toUpperCase();
}

function buildFallbackMarkers(pageCount: number, visiblePageCount: number, isPreviewMode: boolean): ReaderMarker[] {
  const endPage = Math.max(1, visiblePageCount || pageCount || 1);
  const markers: ReaderMarker[] = [{ title: "Reader opening", page: 1 }];

  if (endPage >= 4) {
    markers.push({
      title: isPreviewMode ? "Core preview pages" : "Midpoint checkpoint",
      page: Math.max(2, Math.ceil(endPage / 2)),
    });
  }

  if (endPage >= 2) {
    markers.push({
      title: isPreviewMode ? "Preview edge" : "Last loaded spread",
      page: endPage,
    });
  }

  return markers;
}

async function resolveDestinationPage(pdf: any, dest: any): Promise<number | null> {
  let resolvedDest = dest;

  if (typeof resolvedDest === "string") {
    resolvedDest = await pdf.getDestination(resolvedDest);
  }

  if (!Array.isArray(resolvedDest) || resolvedDest.length === 0) {
    return null;
  }

  const target = resolvedDest[0];

  if (typeof target === "object" && target !== null) {
    const pageIndex = await pdf.getPageIndex(target);
    return pageIndex + 1;
  }

  if (typeof target === "number") {
    return target + 1;
  }

  return null;
}

async function flattenOutline(pdf: any): Promise<ReaderMarker[]> {
  const outline = await pdf.getOutline?.();
  if (!outline || !Array.isArray(outline) || outline.length === 0) {
    return [];
  }

  const markers: ReaderMarker[] = [];

  async function walk(nodes: any[], depth = 0) {
    for (const node of nodes) {
      const page = await resolveDestinationPage(pdf, node.dest);
      if (typeof page === "number" && Number.isFinite(page)) {
        markers.push({
          title: String(node.title ?? "Untitled section").trim() || "Untitled section",
          page,
          depth,
        });
      }

      if (Array.isArray(node.items) && node.items.length > 0) {
        await walk(node.items, depth + 1);
      }
    }
  }

  await walk(outline);
  return markers;
}

export default function TextbookReaderShell({ subjectId }: { subjectId: string }) {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<any>(null);

  const [meta, setMeta] = useState<ReaderMeta | null>(null);
  const [metaLoading, setMetaLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [outlineMarkers, setOutlineMarkers] = useState<ReaderMarker[]>([]);
  const [useNativeEmbed, setUseNativeEmbed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncViewport = () => setViewportWidth(window.innerWidth);
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setMetaLoading(true);
      setError("");

      try {
        const res = await authFetch(`/api/textbook-reader?subjectId=${encodeURIComponent(subjectId)}`);
        const body = (await res.json().catch(() => ({}))) as ReaderMeta & { error?: string };

        if (!res.ok) {
          throw new Error(body.error ?? "Failed to load textbook reader.");
        }

        if (!cancelled) {
          setMeta(body);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load textbook reader.");
        }
      } finally {
        if (!cancelled) {
          setMetaLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  useEffect(() => {
    if (!meta?.fileUrl) return;

    let cancelled = false;

    (async () => {
      setPdfLoading(true);
      setError("");
      setOutlineMarkers([]);
      setUseNativeEmbed(false);

      try {
        const response = await authFetch(meta.fileUrl, { cache: "no-store" });
        if (!response.ok) {
          const body = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error ?? `Failed to load manual PDF (${response.status})`);
        }

        const bytes = new Uint8Array(await response.arrayBuffer());
        try {
          const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
          pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

          // cMapUrl + standardFontDataUrl: required for PDFs with CMap-
          // encoded fonts; without them, glyphs render blank. Assets in
          // /public, copied by scripts/copy-pdfjs-assets.mjs.
          const pdf = await pdfjsLib.getDocument({
            data: bytes,
            cMapUrl: "/cmaps/",
            cMapPacked: true,
            standardFontDataUrl: "/standard_fonts/",
          }).promise;
          if (cancelled) return;

          pdfRef.current = pdf;
          setPageCount(pdf.numPages);
          setCurrentPage(1);

          const markers = await flattenOutline(pdf);
          if (!cancelled) {
            setOutlineMarkers(markers);
          }
        } catch (renderErr) {
          if (!cancelled) {
            pdfRef.current = null;
            setPageCount(0);
            setCurrentPage(1);
            setOutlineMarkers([]);
            setUseNativeEmbed(true);
            console.error("[TextbookReaderShell] Falling back to native PDF embed", renderErr);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load manual PDF.");
        }
      } finally {
        if (!cancelled) {
          setPdfLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      pdfRef.current = null;
    };
  }, [meta?.fileUrl]);

  const isPreviewMode = !!meta && !meta.hasFullAccess;
  const isSpreadLayout = viewportWidth >= 1320;
  const pagesPerView = isSpreadLayout ? 2 : 1;

  const visiblePageCount = useMemo(() => {
    if (!meta) return 0;
    if (meta.hasFullAccess) return pageCount;
    return Math.min(pageCount, meta.previewPages);
  }, [meta, pageCount]);

  const normalizePage = useCallback(
    (page: number) => {
      let next = clamp(page, 1, Math.max(visiblePageCount, 1));
      if (pagesPerView === 2 && next > 1 && next % 2 === 0) {
        next -= 1;
      }
      return next;
    },
    [pagesPerView, visiblePageCount]
  );

  useEffect(() => {
    if (!visiblePageCount) return;
    setCurrentPage((prev) => normalizePage(prev));
  }, [normalizePage, visiblePageCount]);

  const visiblePages = useMemo(() => {
    if (!visiblePageCount) return [] as number[];
    const pages = [normalizePage(currentPage)];
    if (pagesPerView === 2 && pages[0] + 1 <= visiblePageCount) {
      pages.push(pages[0] + 1);
    }
    return pages;
  }, [currentPage, normalizePage, pagesPerView, visiblePageCount]);

  const readerMarkers = useMemo(() => {
    if (useNativeEmbed) {
      return [{ title: "Embedded manual preview", page: 1 }];
    }
    if (outlineMarkers.length > 0) {
      return outlineMarkers.filter((marker) => marker.page <= Math.max(visiblePageCount, 1));
    }
    return buildFallbackMarkers(pageCount, visiblePageCount, isPreviewMode);
  }, [isPreviewMode, outlineMarkers, pageCount, useNativeEmbed, visiblePageCount]);

  const progressPercent = useMemo(() => {
    if (!visiblePageCount) return 0;
    return Math.min(100, Math.round(((visiblePages[0] ?? 1) / visiblePageCount) * 100));
  }, [visiblePageCount, visiblePages]);

  const spreadLabel = useMemo(() => {
    if (visiblePages.length === 0) return "Page 1";
    if (visiblePages.length === 1) return `Page ${visiblePages[0]}`;
    return `Pages ${visiblePages[0]}–${visiblePages[visiblePages.length - 1]}`;
  }, [visiblePages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentPage((prev) => normalizePage(prev - pagesPerView));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentPage((prev) => normalizePage(prev + pagesPerView));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [normalizePage, pagesPerView]);

  useEffect(() => {
    if (!meta || !pdfRef.current || !leftCanvasRef.current || !visiblePages.length) return;

    let cancelled = false;

    async function renderPageToCanvas(pageNumber: number, canvas: HTMLCanvasElement, maxWidth: number) {
      const page = await pdfRef.current.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = Math.min(1.55, maxWidth / baseViewport.width);
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      await (page.render as any)({
        canvasContext: ctx,
        viewport,
      }).promise;
    }

    (async () => {
      setRendering(true);

      try {
        const [leftPage, rightPage] = visiblePages;

        await renderPageToCanvas(leftPage, leftCanvasRef.current!, isSpreadLayout ? 560 : 960);
        if (cancelled) return;

        if (rightPage && rightCanvasRef.current) {
          await renderPageToCanvas(rightPage, rightCanvasRef.current, 560);
        } else if (rightCanvasRef.current) {
          const rightCanvas = rightCanvasRef.current;
          rightCanvas.width = 1;
          rightCanvas.height = 1;
          const ctx = rightCanvas.getContext("2d");
          ctx?.clearRect(0, 0, 1, 1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render manual page.");
        }
      } finally {
        if (!cancelled) {
          setRendering(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isSpreadLayout, meta, visiblePages]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(66, 112, 255, 0.12), transparent 26%), radial-gradient(circle at bottom right, rgba(114, 51, 197, 0.14), transparent 34%), #06070E",
        color: "#F5F7FA",
        padding: "88px 20px 90px",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#8AE6C6",
                marginBottom: "10px",
              }}
            >
              INHERO E-BOOK READER
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.15rem)",
                lineHeight: 1.03,
                fontWeight: 800,
                marginBottom: "10px",
              }}
            >
              {meta?.product.title ?? "Loading manual..."}
            </h1>
            <p style={{ color: "rgba(245,247,250,0.68)", maxWidth: "840px", lineHeight: 1.72 }}>
              Read the manual as an in-site textbook experience inside InHero. Students stay in the platform,
              move through page spreads, and preview or unlock the full manual without a public download button.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              href="/textbooks"
              style={{
                padding: "11px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(138,230,198,0.18)",
                color: "#D9F6EC",
                textDecoration: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              ← Back to manuals
            </Link>
            {meta?.product.readerHref && (
              <Link
                href={meta.product.readerHref}
                style={{
                  padding: "11px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(138,230,198,0.18)",
                  color: "#8AE6C6",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  background: "rgba(138,230,198,0.05)",
                }}
              >
                Refresh reader
              </Link>
            )}
          </div>
        </div>

        {metaLoading ? (
          <div style={{ padding: "80px 0", textAlign: "center", color: "rgba(245,247,250,0.56)" }}>Loading reader...</div>
        ) : error ? (
          <div
            style={{
              padding: "22px 24px",
              borderRadius: "22px",
              border: "1px solid rgba(255,90,90,0.22)",
              background: "rgba(255,90,90,0.08)",
              color: "#FFB8B8",
            }}
          >
            {error}
          </div>
        ) : meta ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: viewportWidth >= 1120 ? "minmax(0, 1fr) minmax(300px, 340px)" : "1fr",
              gap: "22px",
              alignItems: "start",
            }}
          >
            <section
              style={{
                borderRadius: "30px",
                background:
                  "linear-gradient(180deg, rgba(11,16,30,0.98), rgba(7,9,17,0.98))",
                border: "1px solid rgba(138,230,198,0.14)",
                boxShadow: "0 30px 100px rgba(0,0,0,0.38)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(circle at top left, rgba(138,230,198,0.08), transparent 24%), radial-gradient(circle at bottom right, rgba(122,105,255,0.09), transparent 30%)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "18px 22px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ minWidth: "240px", flex: "1 1 320px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        color: "#8AE6C6",
                      }}
                    >
                      {isPreviewMode ? "PREVIEW READER" : "FULL READER ACCESS"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        color: "rgba(245,247,250,0.5)",
                      }}
                    >
                      {formatSubjectLabel(meta.product.subjectId)}
                    </span>
                  </div>
                  <div style={{ color: "rgba(245,247,250,0.76)", fontSize: "14px", lineHeight: 1.65 }}>
                    {useNativeEmbed
                      ? "The manual is open in protected in-site embed mode while the reader shell loads."
                      : isPreviewMode
                        ? `Students can read the first ${visiblePageCount} pages here as an embedded InHero sample.`
                        : pdfLoading
                          ? "Preparing the full manual inside the InHero reader..."
                          : `Full manual access is active inside the site with ${pageCount} pages available in reader mode.`}
                  </div>
                </div>

                <div style={{ minWidth: "240px", flex: "1 1 260px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      color: "rgba(245,247,250,0.62)",
                    }}
                  >
                    <span>{spreadLabel}</span>
                    <span>{progressPercent}% through visible reader</span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: "100%",
                        borderRadius: "999px",
                        background: "linear-gradient(90deg, #78D9B1, #79B8FF)",
                        boxShadow: "0 0 16px rgba(120,217,177,0.45)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ position: "relative", padding: "20px 22px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => normalizePage(prev - pagesPerView))}
                      disabled={visiblePages[0] <= 1 || pdfLoading || rendering}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "999px",
                        border: "1px solid rgba(138,230,198,0.18)",
                        background:
                          visiblePages[0] <= 1 ? "rgba(255,255,255,0.04)" : "rgba(138,230,198,0.08)",
                        color: visiblePages[0] <= 1 ? "rgba(245,247,250,0.38)" : "#D9F6EC",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        cursor: visiblePages[0] <= 1 ? "default" : "pointer",
                      }}
                    >
                      ← Previous spread
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => normalizePage(prev + pagesPerView))}
                      disabled={
                        !visiblePageCount ||
                        visiblePages[visiblePages.length - 1] >= visiblePageCount ||
                        pdfLoading ||
                        rendering
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "999px",
                        border: "1px solid rgba(138,230,198,0.18)",
                        background:
                          !visiblePageCount || visiblePages[visiblePages.length - 1] >= visiblePageCount
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(138,230,198,0.08)",
                        color:
                          !visiblePageCount || visiblePages[visiblePages.length - 1] >= visiblePageCount
                            ? "rgba(245,247,250,0.38)"
                            : "#D9F6EC",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        cursor:
                          !visiblePageCount || visiblePages[visiblePages.length - 1] >= visiblePageCount
                            ? "default"
                            : "pointer",
                      }}
                    >
                      Next spread →
                    </button>
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "rgba(245,247,250,0.68)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {isSpreadLayout ? "spread mode active" : "single-page mode active"}
                  </div>
                </div>

                <div
                  style={{
                    position: "relative",
                    borderRadius: "26px",
                    padding: isSpreadLayout ? "28px 26px 30px" : "24px 18px 26px",
                    background:
                      "linear-gradient(180deg, rgba(18,22,36,0.94), rgba(9,11,18,0.96))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 80px rgba(0,0,0,0.36)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 34%), radial-gradient(circle at center, rgba(121,184,255,0.07), transparent 42%)",
                    }}
                  />

                  {(pdfLoading || rendering) && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(7,10,18,0.68)",
                        zIndex: 3,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.12em",
                        color: "#8AE6C6",
                      }}
                    >
                      {pdfLoading ? "Loading pages..." : "Turning page..."}
                    </div>
                  )}

                  {useNativeEmbed ? (
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "16px",
                        background: "#F6F1E7",
                        padding: "18px",
                        boxShadow:
                          "0 30px 60px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.04)",
                        minHeight: "680px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          left: "18px",
                          zIndex: 2,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "rgba(20,28,40,0.46)",
                        }}
                      >
                        {meta.product.title}
                      </div>
                      <iframe
                        src={`${meta.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={`${meta.product.title} embedded reader`}
                        style={{
                          width: "100%",
                          minHeight: "640px",
                          border: 0,
                          marginTop: "18px",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        position: "relative",
                        display: "grid",
                        gridTemplateColumns: isSpreadLayout ? "minmax(0, 1fr) minmax(0, 1fr)" : "1fr",
                        gap: isSpreadLayout ? "22px" : "0",
                        alignItems: "start",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          borderRadius: "16px",
                          background: "#F6F1E7",
                          padding: "18px 18px 34px",
                          boxShadow:
                            "0 30px 60px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.04)",
                          minHeight: "480px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "16px",
                            left: "18px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            color: "rgba(20,28,40,0.46)",
                          }}
                        >
                          {meta.product.title}
                        </div>
                        <canvas
                          ref={leftCanvasRef}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: pdfLoading ? "none" : "block",
                            marginTop: "18px",
                            background: "#FFFFFF",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "12px",
                            right: "18px",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "22px",
                            color: "rgba(20,28,40,0.55)",
                          }}
                        >
                          {visiblePages[0] ?? 1}
                        </div>
                      </div>

                      {(isSpreadLayout || visiblePages.length > 1) && (
                      <div
                        style={{
                          position: "relative",
                          borderRadius: "16px",
                          background: "#F6F1E7",
                          padding: "18px 18px 34px",
                          boxShadow:
                            "0 30px 60px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.04)",
                          minHeight: "480px",
                          display: visiblePages[1] ? "block" : "none",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "16px",
                            right: "18px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            color: "rgba(20,28,40,0.46)",
                          }}
                        >
                          INHERO READER
                        </div>
                        <canvas
                          ref={rightCanvasRef}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: pdfLoading ? "none" : "block",
                            marginTop: "18px",
                            background: "#FFFFFF",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "18px",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "22px",
                            color: "rgba(20,28,40,0.55)",
                          }}
                        >
                          {visiblePages[1] ?? ""}
                        </div>
                      </div>
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      position: "absolute",
                      top: "22px",
                      right: "22px",
                      zIndex: 1,
                      padding: "8px 12px",
                      borderRadius: "999px",
                      background: "rgba(3,8,18,0.72)",
                      border: "1px solid rgba(138,230,198,0.16)",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      color: "#8AE6C6",
                    }}
                  >
                    {isPreviewMode ? "PREVIEW LOCKED TO SITE" : "FULL E-BOOK MODE"}
                  </div>
                </div>
              </div>
            </section>

            <aside
              style={{
                borderRadius: "30px",
                background:
                  "linear-gradient(180deg, rgba(9,12,22,0.96), rgba(5,7,13,0.96))",
                border: "1px solid rgba(138,230,198,0.12)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
                padding: "22px 22px 24px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(circle at top left, rgba(138,230,198,0.07), transparent 28%), radial-gradient(circle at bottom right, rgba(122,105,255,0.08), transparent 34%)",
                }}
              />

              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    color: "#8AE6C6",
                    marginBottom: "10px",
                  }}
                >
                  READER STATUS
                </div>
                <h2 style={{ fontSize: "24px", lineHeight: 1.15, fontWeight: 800, marginBottom: "10px" }}>
                  {isPreviewMode ? "Open the sample like a digital book." : "Study inside the full InHero reader."}
                </h2>
                <p style={{ color: "rgba(245,247,250,0.68)", lineHeight: 1.72, marginBottom: "18px" }}>
                  {isPreviewMode
                    ? "This sample stays inside InHero and feels like a guided e-book rather than a detached PDF download."
                    : "Purchased or complimentary manuals stay embedded in the InHero reading flow so students can move from lesson to textbook without leaving the site."}
                </p>

                <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
                  {[
                    `Course: ${formatSubjectLabel(meta.product.subjectId)}`,
                    `Chapters in manual: ${meta.product.chapters}`,
                    isPreviewMode
                      ? `Visible sample pages: ${visiblePageCount || "loading..."}`
                      : useNativeEmbed
                        ? "Reader pages loaded: embedded mode"
                        : pdfLoading
                          ? "Reader pages loaded: preparing..."
                          : `Reader pages loaded: ${pageCount}`,
                    `Keyboard: use ← and → to turn pages`,
                  ].map((line) => (
                    <div
                      key={line}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "18px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(245,247,250,0.82)",
                        fontSize: "14px",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      color: "#D7B5FF",
                      marginBottom: "10px",
                    }}
                  >
                    {readerMarkers.length > 0 ? "READER MARKERS" : "READING FLOW"}
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {readerMarkers.slice(0, 8).map((marker, index) => (
                      <button
                        key={`${marker.title}-${marker.page}-${index}`}
                        type="button"
                        onClick={() => setCurrentPage(normalizePage(marker.page))}
                        style={{
                          textAlign: "left",
                          padding: "13px 14px",
                          borderRadius: "18px",
                          border:
                            marker.page === visiblePages[0]
                              ? "1px solid rgba(138,230,198,0.34)"
                              : "1px solid rgba(255,255,255,0.06)",
                          background:
                            marker.page === visiblePages[0]
                              ? "rgba(138,230,198,0.08)"
                              : "rgba(255,255,255,0.025)",
                          color: "#F5F7FA",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px",
                            letterSpacing: "0.14em",
                            color: marker.page === visiblePages[0] ? "#8AE6C6" : "rgba(245,247,250,0.52)",
                            marginBottom: "4px",
                            marginLeft: marker.depth ? `${marker.depth * 10}px` : "0",
                          }}
                        >
                          PAGE {marker.page}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "rgba(245,247,250,0.92)",
                            lineHeight: 1.45,
                            marginLeft: marker.depth ? `${marker.depth * 10}px` : "0",
                          }}
                        >
                          {marker.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {isPreviewMode ? (
                  <>
                    <div
                      style={{
                        marginBottom: "12px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        color: "#D7B5FF",
                      }}
                    >
                      UNLOCK FULL E-BOOK
                    </div>
                    <PaymentButton
                      serviceId="one_subject"
                      subjectId={meta.product.subjectId}
                      amount={49}
                      orderName={`${meta.product.title} — One Subject Elite Pass`}
                      label="$49/mo · Unlock course + e-book"
                      returnTo={meta.product.readerHref}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        padding: "14px 18px",
                        borderRadius: "18px",
                        border: "1px solid rgba(138,230,198,0.24)",
                        background:
                          "linear-gradient(90deg, rgba(11,29,26,0.94), rgba(12,22,36,0.94))",
                        color: "#8AE6C6",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                      }}
                    />
                    <p style={{ marginTop: "12px", color: "rgba(245,247,250,0.56)", lineHeight: 1.6, fontSize: "13px" }}>
                      Once unlocked, this same page becomes the full InHero e-book reader instead of opening a standalone PDF download.
                    </p>
                  </>
                ) : (
                  <p style={{ color: "rgba(245,247,250,0.58)", lineHeight: 1.7, fontSize: "13px" }}>
                    Full access readers stay in the same in-site flow, so students can move between lessons, AI support, and manuals without jumping into an external download window.
                  </p>
                )}
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}
