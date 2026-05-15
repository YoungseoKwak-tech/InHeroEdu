"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import Link from "next/link";

// Dynamic import with ssr:false: pdfjs-dist + canvas APIs are
// browser-only, and even though PdfReader is "use client", Next.js
// App Router still prerenders client components on the server for
// the initial HTML — that prerender was producing markup that
// didn't match what the client rendered after pdfjs/window state
// settled, causing React errors #418 + #423 (hydration mismatch).
// ssr:false suppresses the server pass entirely for this subtree.
const PdfReader = dynamic(() => import("./PdfReader"), {
  ssr: false,
  loading: () => <ReaderBootSkeleton />,
});

export default function ReaderPage() {
  return (
    <ReaderErrorBoundary>
      <PdfReader />
    </ReaderErrorBoundary>
  );
}

// Minimal class-component error boundary. No external dep — just enough
// to surface a real error instead of a black screen if anything in the
// reader subtree throws during render or hydration.
interface BoundaryState {
  error: Error | null;
}

class ReaderErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    // eslint-disable-next-line no-console
    console.error("[reader] caught", error, info.componentStack ?? "");
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <main className="reb-root">
          <h1>Reader couldn&apos;t open</h1>
          <p>Something went wrong loading this manual.</p>
          <details>
            <summary>Technical details</summary>
            <pre>{this.state.error.message}</pre>
            {this.state.error.stack && <pre>{this.state.error.stack}</pre>}
          </details>
          <div className="reb-actions">
            <button type="button" onClick={this.reset} className="reb-retry">Try again</button>
            <Link href="/library" className="reb-back">← Back to Library</Link>
          </div>
          <style jsx>{`
            .reb-root {
              max-width: 720px;
              margin: 5rem auto;
              padding: 0 1.5rem;
              color: #d8d9e6;
              font-family: 'Inter', system-ui, sans-serif;
            }
            h1 {
              font-family: 'Cormorant Garamond', serif;
              font-size: 1.7rem; font-weight: 600;
              color: #f3f3fb;
              margin: 0 0 0.6rem;
            }
            p { color: rgba(148,163,184,0.75); margin: 0 0 1.2rem; font-size: 0.92rem; }
            details {
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 0.5rem;
              padding: 0.7rem 0.9rem;
              margin-bottom: 1.4rem;
            }
            summary {
              cursor: pointer;
              font-family: ui-monospace, monospace;
              font-size: 0.72rem; letter-spacing: 0.1em; font-weight: 700;
              color: rgba(216,217,230,0.7);
            }
            pre {
              font-family: ui-monospace, monospace;
              font-size: 0.7rem;
              color: rgba(255,139,126,0.9);
              white-space: pre-wrap;
              word-break: break-word;
              margin: 0.6rem 0 0;
              padding: 0.6rem 0.8rem;
              background: rgba(0,0,0,0.3);
              border-radius: 0.35rem;
              max-height: 30vh; overflow: auto;
            }
            .reb-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
            .reb-retry, .reb-back {
              font-family: ui-monospace, monospace;
              font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
              padding: 0.55rem 1rem;
              border-radius: 999px;
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              color: rgba(216,217,230,0.9);
              text-decoration: none;
              cursor: pointer;
            }
            .reb-retry:hover { color: #5eead4; border-color: rgba(94,234,212,0.45); }
            .reb-back:hover { color: #5eead4; border-color: rgba(94,234,212,0.45); }
          `}</style>
        </main>
      );
    }
    return this.props.children;
  }
}

// Boot-time placeholder shown while the dynamic reader chunk is downloading.
// Identical visual to the reader's internal loading state so the user
// doesn't see a flash on swap.
function ReaderBootSkeleton() {
  return (
    <main className="rbs-root">
      <div className="rbs-spinner" aria-hidden="true" />
      <div className="rbs-label">Opening reader…</div>
      <style jsx>{`
        .rbs-root {
          position: fixed;
          inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.85rem;
          background: linear-gradient(180deg, #0a0612 0%, #1a0e2e 100%);
          color: rgba(216,217,230,0.78);
          font-family: ui-monospace, monospace;
          z-index: 100;
        }
        .rbs-spinner {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2.5px solid rgba(94,234,212,0.2);
          border-top-color: #5eead4;
          animation: rbs-spin 0.85s linear infinite;
        }
        .rbs-label { font-size: 0.78rem; letter-spacing: 0.08em; }
        @keyframes rbs-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
