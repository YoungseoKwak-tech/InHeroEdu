"use client";

import { useEffect, useState, useCallback } from "react";
import { authFetch } from "@/lib/client-auth";

interface Pattern {
  id: string;
  pattern_type: string;
  gap_type: string | null;
  subject: string | null;
  description: string | null;
  occurrence_count: number;
  first_detected: string;
  last_detected: string;
  is_resolved: boolean;
}

const GAP_META: Record<string, { color: string; border: string; label: string; icon: string }> = {
  CONCEPT_GAP:      { color: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   label: "Concept",  icon: "◈" },
  LANGUAGE_GAP:     { color: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  label: "Language", icon: "◇" },
  LOGIC_GAP:        { color: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.3)",  label: "Logic",    icon: "◆" },
  REPEAT_ERROR:     { color: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.3)",  label: "Repeat",   icon: "↺" },
  SPEED_SKIP:       { color: "rgba(234,179,8,0.12)",   border: "rgba(234,179,8,0.3)",   label: "Speed",    icon: "⚡" },
  CROSS_SUBJECT_GAP:{ color: "rgba(20,184,166,0.12)",  border: "rgba(20,184,166,0.3)",  label: "Cross",    icon: "⊗" },
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function GapTypeBadge({ gapType }: { gapType: string | null }) {
  if (!gapType) return null;
  const meta = GAP_META[gapType] ?? { color: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)", label: gapType, icon: "○" };
  return (
    <span style={{
      fontSize: "10px",
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      letterSpacing: "0.08em",
      padding: "3px 8px",
      borderRadius: "3px",
      background: meta.color,
      border: `1px solid ${meta.border}`,
      color: "#ffffff",
      whiteSpace: "nowrap",
    }}>
      {meta.icon} {meta.label}
    </span>
  );
}

function PatternCard({ pattern, onResolve }: { pattern: Pattern; onResolve: (id: string) => void }) {
  const meta = GAP_META[pattern.pattern_type] ?? GAP_META[pattern.gap_type ?? ""] ?? {
    color: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.15)", label: pattern.pattern_type, icon: "○"
  };

  return (
    <div style={{
      background: pattern.is_resolved ? "rgba(0,255,136,0.04)" : meta.color,
      border: `1px solid ${pattern.is_resolved ? "rgba(0,255,136,0.2)" : meta.border}`,
      borderRadius: "4px",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
          <GapTypeBadge gapType={pattern.gap_type ?? pattern.pattern_type} />
          {pattern.subject && (
            <span style={{
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "rgba(255,255,255,0.45)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {pattern.subject}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {pattern.occurrence_count > 1 && (
            <span style={{
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "rgba(255,255,255,0.4)",
            }}>
              ×{pattern.occurrence_count}
            </span>
          )}
          {!pattern.is_resolved && (
            <button
              onClick={() => onResolve(pattern.id)}
              style={{
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "3px 10px",
                border: "1px solid rgba(0,255,136,0.3)",
                borderRadius: "3px",
                background: "rgba(0,255,136,0.05)",
                color: "#00FF88",
                cursor: "pointer",
              }}
            >
              RESOLVE
            </button>
          )}
          {pattern.is_resolved && (
            <span style={{ fontSize: "11px", color: "#00FF88" }}>✓ RESOLVED</span>
          )}
        </div>
      </div>

      <p style={{
        fontSize: "12px",
        color: "rgba(255,255,255,0.7)",
        lineHeight: 1.5,
        margin: 0,
        fontFamily: "'Inter', sans-serif",
      }}>
        {pattern.description}
      </p>

      <div style={{
        fontSize: "10px",
        fontFamily: "'JetBrains Mono', monospace",
        color: "rgba(255,255,255,0.3)",
        display: "flex",
        gap: "16px",
      }}>
        <span>FIRST: {relativeTime(pattern.first_detected)}</span>
        <span>LAST: {relativeTime(pattern.last_detected)}</span>
      </div>
    </div>
  );
}

function DominantGapRadar({ dominantGapType, patterns }: { dominantGapType: string | null; patterns: Pattern[] }) {
  const counts: Record<string, number> = {};
  for (const p of patterns) {
    if (!p.is_resolved && p.gap_type) {
      counts[p.gap_type] = (counts[p.gap_type] ?? 0) + p.occurrence_count;
    }
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{
      background: "rgba(0,255,136,0.03)",
      border: "1px solid rgba(0,255,136,0.12)",
      borderRadius: "4px",
      padding: "16px",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "#00FF88",
        marginBottom: "12px",
      }}>
        ▸ YOUR GAP PROFILE
      </div>

      {dominantGapType && (
        <div style={{
          marginBottom: "14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>
            DOMINANT TYPE:
          </span>
          <GapTypeBadge gapType={dominantGapType} />
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {entries.map(([type, count]) => {
          const meta = GAP_META[type] ?? { color: "rgba(255,255,255,0.1)", border: "", label: type, icon: "○" };
          const pct = Math.round((count / total) * 100);
          return (
            <div key={type}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.55)" }}>
                  {meta.icon} {meta.label}
                </span>
                <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.4)" }}>
                  {count} · {pct}%
                </span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: meta.border,
                  borderRadius: "2px",
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Cross-Subject Connections ─────────────────────────────

function CrossSubjectPanel({ patterns }: { patterns: Pattern[] }) {
  const crossGaps = patterns.filter(
    (p) => p.pattern_type === "CROSS_SUBJECT_GAP" && !p.is_resolved
  );
  if (crossGaps.length === 0) return null;

  return (
    <div style={{
      background: "rgba(20,184,166,0.05)",
      border: "1px solid rgba(20,184,166,0.2)",
      borderRadius: "4px",
      padding: "14px 16px",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "rgb(20,184,166)",
        marginBottom: "10px",
      }}>
        ⊗ CROSS-SUBJECT CONNECTIONS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {crossGaps.map((p) => (
          <p key={p.id} style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.65)",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.5,
          }}>
            {p.description}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────

function Timeline({ patterns }: { patterns: Pattern[] }) {
  const sorted = [...patterns]
    .filter((p) => !p.is_resolved)
    .sort((a, b) => new Date(a.first_detected).getTime() - new Date(b.first_detected).getTime());

  if (sorted.length === 0) return null;

  return (
    <div style={{ paddingTop: "4px" }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "12px",
      }}>
        ▸ DETECTION TIMELINE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {sorted.map((p, i) => (
          <div key={p.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: GAP_META[p.gap_type ?? p.pattern_type]?.border ?? "rgba(255,255,255,0.3)",
                marginTop: "4px",
              }} />
              {i < sorted.length - 1 && (
                <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.1)", marginTop: "2px" }} />
              )}
            </div>
            <div style={{ paddingBottom: "12px", flex: 1 }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <GapTypeBadge gapType={p.gap_type ?? p.pattern_type} />
                <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.3)" }}>
                  {relativeTime(p.first_detected)}
                </span>
              </div>
              {p.subject && (
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                  {p.subject}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Panel ────────────────────────────────────────────

export default function PatternPanel() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [dominantGapType, setDominantGapType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"active" | "resolved">("active");

  const fetchPatterns = useCallback(async () => {
    try {
      const res = await authFetch("/api/patterns");
      if (res.ok) {
        const { patterns: data, dominantGapType: d } = await res.json();
        setPatterns(data);
        setDominantGapType(d);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatterns();
  }, [fetchPatterns]);

  const handleResolve = async (patternId: string) => {
    await authFetch("/api/patterns/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patternId }),
    });
    fetchPatterns();
  };

  const active = patterns.filter((p) => !p.is_resolved);
  const resolved = patterns.filter((p) => p.is_resolved);
  const displayed = tab === "active" ? active : resolved;

  if (loading) {
    return (
      <div style={{ padding: "32px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
        LOADING PATTERN DATA...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Gap Profile + Cross-Subject */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <DominantGapRadar dominantGapType={dominantGapType} patterns={patterns} />
        <CrossSubjectPanel patterns={patterns} />
      </div>

      {/* Timeline */}
      <Timeline patterns={patterns} />

      {/* Tabs */}
      <div>
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "14px" }}>
          {(["active", "resolved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                padding: "8px 18px",
                background: "transparent",
                border: "none",
                borderBottom: tab === t ? "2px solid #00FF88" : "2px solid transparent",
                color: tab === t ? "#00FF88" : "rgba(255,255,255,0.35)",
                cursor: "pointer",
                marginBottom: "-1px",
              }}
            >
              {t === "active" ? `PATTERNS DETECTED (${active.length})` : `RESOLVED (${resolved.length})`}
            </button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "32px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
          }}>
            {tab === "active" ? "NO ACTIVE PATTERNS — ALL CLEAR" : "NO RESOLVED PATTERNS YET"}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {displayed.map((p) => (
              <PatternCard key={p.id} pattern={p} onResolve={handleResolve} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
