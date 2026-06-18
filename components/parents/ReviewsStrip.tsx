"use client";

/**
 * Reusable 학부모·학생 후기 strip — drop on any parent page for social proof.
 * Sample quotes live in lib/data/reviews.ts (replace with real reviews).
 */

import { REVIEWS } from "@/lib/data/reviews";

export default function ReviewsStrip({
  title = "💬 먼저 써본 학부모·학생들",
  limit = 3,
  dark = false,
}: { title?: string; limit?: number; dark?: boolean }) {
  const items = REVIEWS.slice(0, limit);
  if (items.length === 0) return null;

  const card = dark ? "rgba(255,255,255,0.05)" : "#fff";
  const border = dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e6e8ec";
  const titleColor = dark ? "rgba(255,255,255,0.55)" : "#94a3b8";
  const textColor = dark ? "rgba(255,255,255,0.85)" : "#334155";
  const metaColor = dark ? "rgba(255,255,255,0.4)" : "#94a3b8";

  return (
    <section style={{ margin: "22px 0" }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: titleColor, letterSpacing: "0.03em", marginBottom: 10 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`, gap: 10 }}>
        {items.map((r, i) => (
          <div key={i} style={{ background: card, border, borderRadius: 12, padding: "14px 15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#f59e0b", letterSpacing: 1 }}>{"★".repeat(r.stars)}</span>
              {r.tag && <span style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", background: dark ? "rgba(124,58,237,0.18)" : "#faf7ff", borderRadius: 5, padding: "1px 7px" }}>{r.tag}</span>}
            </div>
            <p style={{ fontSize: 12.5, color: textColor, lineHeight: 1.6, margin: "0 0 7px" }}>“{r.text}”</p>
            <div style={{ fontSize: 11, color: metaColor }}>{r.name} · {r.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
