"use client";

/**
 * Always-visible 🔥 N · Tier pill in the navbar's signed-in cluster.
 *
 * Hydrates from /api/streak on mount + listens for the
 * "inhero:streak-changed" window CustomEvent that SectionLessonPlayer
 * dispatches after each TAP_QUICK answer — so the pill updates in real
 * time without polling.
 *
 * Visible only when current_streak ≥ 1 (no zero-state to avoid empty
 * decoration). Click → /me (or wherever streak history lives later).
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import { getTier, type StreakTier } from "@/lib/streakTiers";

interface StreakState {
  current_streak: number;
  highest_streak: number;
  current_tier: StreakTier;
}

const EVENT_NAME = "inhero:streak-changed";

export default function NavbarStreakPill() {
  const [state, setState] = useState<StreakState | null>(null);
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function applyServerRow(row: unknown) {
      if (!row || typeof row !== "object") return;
      const r = row as Partial<StreakState>;
      const cur = Number(r.current_streak);
      if (!Number.isFinite(cur) || cur < 0) return;
      setState((prev) => {
        const bump = prev !== null && cur > prev.current_streak;
        if (bump) {
          setBumped(true);
          window.setTimeout(() => setBumped(false), 700);
        }
        return {
          current_streak: cur,
          highest_streak: Number(r.highest_streak ?? Math.max(cur, prev?.highest_streak ?? 0)),
          current_tier: (r.current_tier as StreakTier) ?? getTier(cur).id as StreakTier,
        };
      });
    }

    // Hydrate from server
    authFetch("/api/streak")
      .then((r) => r.json())
      .then((j) => { if (!cancelled && j?.ok) applyServerRow(j.data); })
      .catch(() => { /* signed-out / offline — stay hidden */ });

    // Subscribe to in-tab updates from the lesson player
    function onStreakChanged(e: Event) {
      const ce = e as CustomEvent<unknown>;
      applyServerRow(ce.detail);
    }
    window.addEventListener(EVENT_NAME, onStreakChanged);
    return () => {
      cancelled = true;
      window.removeEventListener(EVENT_NAME, onStreakChanged);
    };
  }, []);

  if (!state || state.current_streak < 1) return null;

  const tier = getTier(state.current_streak);

  return (
    <Link
      href="/me"
      title={`${state.current_streak} correct in a row · ${tier.label}`}
      className={bumped ? "nbsp-bumped" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: 9999,
        background: "rgba(255, 179, 71, 0.10)",
        border: "1px solid rgba(255, 179, 71, 0.32)",
        color: "#FFD073",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textDecoration: "none",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255, 179, 71, 0.18)";
        el.style.borderColor = "rgba(255, 179, 71, 0.55)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255, 179, 71, 0.10)";
        el.style.borderColor = "rgba(255, 179, 71, 0.32)";
      }}
    >
      <span>🔥 {state.current_streak}</span>
      <span style={{ opacity: 0.7, fontStyle: "italic", fontWeight: 500, fontSize: 10 }}>
        {tier.label}
      </span>
      <style>{`
        .nbsp-bumped {
          background: rgba(255, 179, 71, 0.22) !important;
          border-color: rgba(255, 179, 71, 0.7) !important;
          box-shadow: 0 0 18px rgba(255, 179, 71, 0.55);
          animation: nbsp-pop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes nbsp-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.22); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Link>
  );
}
