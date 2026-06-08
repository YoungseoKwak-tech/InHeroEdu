"use client";

/**
 * Score-trend widget — reads the localStorage attempt history and draws a small
 * line chart of total scores over time plus a recent-attempts list. Theme-aware
 * (dark for /sat, light for /parents/sat). Renders nothing if there's no
 * history yet.
 */

import { useEffect, useState } from "react";
import { readSatHistory, type SatAttempt } from "@/lib/sat/history";

type Theme = "dark" | "light";

export default function SatHistory({ theme = "dark", refreshKey }: { theme?: Theme; refreshKey?: number }) {
  const [history, setHistory] = useState<SatAttempt[]>([]);
  useEffect(() => { setHistory(readSatHistory()); }, [refreshKey]);

  if (history.length === 0) return null;

  const light = theme === "light";
  const text = light ? "#1a1a1f" : "#fff";
  const sub = light ? "#64748b" : "rgba(255,255,255,0.5)";
  const accent = light ? "#00b85f" : "#00FFB2";
  const cardBg = light ? "#fff" : "rgba(255,255,255,0.02)";
  const border = light ? "#e6e8ec" : "rgba(255,255,255,0.08)";

  const recent = history.slice(-10);
  const best = Math.max(...history.map((h) => h.total));
  const latest = history[history.length - 1];

  // Line chart geometry (400–1600 range).
  const W = 320, H = 96, pad = 6;
  const xs = (i: number) => recent.length <= 1 ? W / 2 : pad + (i * (W - 2 * pad)) / (recent.length - 1);
  const ys = (v: number) => H - pad - ((v - 400) / 1200) * (H - 2 * pad);
  const pts = recent.map((h, i) => `${xs(i)},${ys(h.total)}`).join(" ");

  return (
    <div style={{ borderRadius: 16, border: `1px solid ${border}`, background: cardBg, padding: "18px 20px", marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: text }}>📈 내 점수 추이</span>
        <span style={{ fontSize: 12, color: sub }}>최근 {recent.length}회</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: sub }}>최고 <strong style={{ color: accent }}>{best}</strong> · 최근 <strong style={{ color: text }}>{latest.total}</strong></span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", maxWidth: 480, overflow: "visible" }}>
        {[400, 800, 1200, 1600].map((v) => (
          <line key={v} x1={pad} x2={W - pad} y1={ys(v)} y2={ys(v)} stroke={border} strokeWidth="1" />
        ))}
        {recent.length > 1 && <polyline points={pts} fill="none" stroke={accent} strokeWidth="2.5" />}
        {recent.map((h, i) => (
          <circle key={h.id} cx={xs(i)} cy={ys(h.total)} r="3.5" fill={accent} />
        ))}
      </svg>
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        {[...history].reverse().slice(0, 5).map((h) => (
          <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: sub }}>
            <span>{new Date(h.date).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })}</span>
            <span style={{ color: text }}>{h.formTitle.replace("InHero SAT ", "")}</span>
            <span style={{ marginLeft: "auto" }}>R&W {h.rw} · Math {h.math}</span>
            <span style={{ fontWeight: 800, color: accent, minWidth: 42, textAlign: "right" }}>{h.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
