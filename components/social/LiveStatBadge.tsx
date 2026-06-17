"use client";

/**
 * LiveStatBadge — a small inline "🔥 지금 N명이 보는 중" pill that gently
 * fluctuates, used to make a section read as live. Count starts from a stable
 * SSR value (base) and only jitters after mount to avoid hydration mismatch.
 */

import { useEffect, useState } from "react";

export default function LiveStatBadge({
  base = 24,
  label = "지금 보는 중",
  emoji = "🔥",
  tone = "#dc2680",
}: {
  base?: number;
  label?: string;
  emoji?: string;
  tone?: string;
}) {
  const [n, setN] = useState(base);

  useEffect(() => {
    const t = setInterval(() => {
      setN((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2..+2
        const next = prev + delta;
        return Math.min(base + 12, Math.max(base - 6, next));
      });
    }, 4000);
    return () => clearInterval(t);
  }, [base]);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        fontWeight: 800,
        color: tone,
        background: `${tone}14`,
        border: `1px solid ${tone}33`,
        borderRadius: 999,
        padding: "4px 11px",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "#00b85f", fontSize: 9 }}>●</span>
      {emoji} {label} <b style={{ fontVariantNumeric: "tabular-nums" }}>{n}</b>명
    </span>
  );
}
