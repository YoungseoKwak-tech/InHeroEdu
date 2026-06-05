"use client";

/**
 * WelcomePopup — first-visit modal on the landing page.
 *
 * Tells a cold visitor they can start free and surfaces the
 * signup CTA before they scroll. Skips on:
 *   - signed-in users (handled by SignedInRedirector earlier in the page)
 *   - visits where the user has already seen and dismissed once
 *     (localStorage flag `inhero_welcome_seen`)
 *
 * Signup CTA dispatches the existing `inhero:open-auth` CustomEvent so
 * the Navbar AuthModal opens in "signup" mode without us having to
 * hoist that state up.
 */

import { useEffect, useState } from "react";
import { getClientSession } from "@/lib/client-auth";

const SEEN_KEY = "inhero_welcome_seen";
const SHOW_DELAY_MS = 1200;

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      // Don't pop the modal if they've already seen it.
      try {
        if (localStorage.getItem(SEEN_KEY) === "1") return;
      } catch {
        // localStorage blocked — fall through and show once per session.
      }
      // Or if they're signed in.
      const session = await getClientSession();
      if (cancelled || session?.user) return;
      const t = window.setTimeout(() => {
        if (!cancelled) setOpen(true);
      }, SHOW_DELAY_MS);
      return () => window.clearTimeout(t);
    })();

    return () => { cancelled = true; };
  }, []);

  function markSeen() {
    try { localStorage.setItem(SEEN_KEY, "1"); } catch {}
  }

  function close() {
    markSeen();
    setOpen(false);
  }

  function openSignup() {
    markSeen();
    setOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("inhero:open-auth", { detail: { mode: "signup" } })
      );
    }
  }

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,8,0.86)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        animation: "wp-fade-in 220ms ease-out",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
          background: "#0a0a14",
          border: "1px solid rgba(0,255,136,0.28)",
          borderRadius: "0.85rem",
          padding: "2.25rem 1.85rem 1.85rem",
          textAlign: "center",
          color: "#e8e8f0",
          position: "relative",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,255,136,0.05) inset",
        }}
      >
        {/* HUD corner brackets — matches the rest of the landing */}
        <span style={cornerStyle("top", "left")}>┌</span>
        <span style={cornerStyle("top", "right")}>┐</span>
        <span style={cornerStyle("bottom", "left")}>└</span>
        <span style={cornerStyle("bottom", "right")}>┘</span>

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, #00FF88, transparent)",
            opacity: 0.55,
          }}
        />

        {/* Close X */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            color: "rgba(216,217,230,0.55)",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            padding: "4px 8px",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Status pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,255,136,0.1)",
            color: "#00FF88",
            padding: "6px 14px",
            borderRadius: 999,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00FF88",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(0,255,136,0.8)",
            }}
          />
          First cohort · boarding
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#ffffff",
          }}
        >
          All Subject Pass
        </h2>

        {/* Pricing block — strike-through full price, mint zero-price below. */}
        <div
          style={{
            marginTop: 18,
            marginBottom: 22,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(216,217,230,0.55)",
              letterSpacing: "-0.01em",
            }}
          >
            $899
            {/* Red strike line — angled for stronger "crossed out" feel. */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-6%",
                right: "-6%",
                top: "52%",
                height: "3px",
                background: "#ff3b3b",
                transform: "rotate(-8deg)",
                borderRadius: "2px",
                boxShadow: "0 0 6px rgba(255,59,59,0.5)",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: 36,
              fontWeight: 800,
              color: "#00FF88",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              textShadow: "0 0 22px rgba(0,255,136,0.35)",
            }}
          >
            $0 <span style={{ fontSize: 18, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.01em" }}>to start</span>
          </span>
          <span
            style={{
              marginTop: 4,
              fontSize: 13,
              color: "#94a3b8",
              lineHeight: 1.5,
            }}
          >
            No card required — just an email.
          </span>
        </div>

        <button
          onClick={openSignup}
          style={{
            width: "100%",
            padding: "13px 16px",
            background: "#00FF88",
            color: "#000",
            border: "none",
            borderRadius: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.08em",
            cursor: "pointer",
            transition: "transform 150ms ease, box-shadow 150ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,255,136,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          SIGN UP FREE →
        </button>

        <button
          onClick={close}
          style={{
            marginTop: 14,
            background: "transparent",
            color: "#6b7280",
            border: "none",
            fontSize: 13,
            cursor: "pointer",
            padding: "6px 8px",
          }}
        >
          Maybe later
        </button>
      </div>

      <style>{`
        @keyframes wp-fade-in {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function cornerStyle(v: "top" | "bottom", h: "left" | "right") {
  return {
    position: "absolute" as const,
    [v]: "10px",
    [h]: "12px",
    color: "rgba(0,255,136,0.3)",
    fontFamily: "ui-monospace, monospace",
    fontSize: "14px",
    pointerEvents: "none" as const,
  } as React.CSSProperties;
}
