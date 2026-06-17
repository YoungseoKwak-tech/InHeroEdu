/**
 * Server-safe full-screen loading fallback for the textbook routes (used by
 * loading.tsx files). App Router shows this instantly on navigation while the
 * force-dynamic reader/TOC pages fetch from the DB + proxy the chapter PDF —
 * otherwise the screen just freezes with no feedback. Spinner + message.
 */
export default function TextbookLoading({
  message = "교재를 불러오는 중이에요…",
  hint = "잠시만 기다려 주세요",
}: {
  message?: string;
  hint?: string;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.1rem",
        background: "radial-gradient(ellipse at 50% 30%, #0c1424, #050811 70%)",
        color: "rgba(216,217,230,0.85)",
        fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div className="tbl-spinner" aria-hidden="true" />
      <div style={{ fontSize: "0.95rem", letterSpacing: "0.04em", color: "#eef2f7" }}>{message}</div>
      <div style={{ fontSize: "0.78rem", letterSpacing: "0.06em", color: "rgba(148,163,184,0.7)" }}>{hint}</div>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} role="status">
        Loading
      </span>
      <style>{`
        .tbl-spinner {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 3px solid rgba(94,234,212,0.18);
          border-top-color: #5eead4;
          animation: tbl-spin 0.85s linear infinite;
        }
        @keyframes tbl-spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
