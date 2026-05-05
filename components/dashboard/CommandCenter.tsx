"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

interface Stats {
  lessons_completed: number;
  current_streak: number;
  longest_streak: number;
  total_questions_answered: number;
  total_correct: number;
  concept_gaps_detected: number;
  concept_gaps_resolved: number;
  last_active: string | null;
}

interface Pattern {
  id: string;
  pattern_type: string;
  gap_type: string | null;
  subject: string | null;
  description: string | null;
  occurrence_count: number;
  is_resolved: boolean;
}

const GAP_COLORS: Record<string, string> = {
  CONCEPT_GAP:       "#ef4444",
  LANGUAGE_GAP:      "#3b82f6",
  LOGIC_GAP:         "#a855f7",
  REPEAT_ERROR:      "#f97316",
  SPEED_SKIP:        "#eab308",
  CROSS_SUBJECT_GAP: "#14b8a6",
};

// ── Pattern Map Constellation ─────────────────────────────

function PatternMap({ patterns }: { patterns: Pattern[] }) {
  // Group patterns by subject
  const subjectMap: Record<string, { active: Pattern[]; resolved: Pattern[] }> = {};
  for (const p of patterns) {
    const key = p.subject ?? "General";
    if (!subjectMap[key]) subjectMap[key] = { active: [], resolved: [] };
    if (p.is_resolved) subjectMap[key].resolved.push(p);
    else subjectMap[key].active.push(p);
  }

  // Add unstarted subjects as grey nodes from subjects list
  const SUBJECTS = [
    "AP Biology", "AP Chemistry", "AP Physics", "AP Calculus",
    "AP Statistics", "AP English", "AP US History", "AP Psychology",
  ];
  for (const s of SUBJECTS) {
    if (!subjectMap[s]) subjectMap[s] = { active: [], resolved: [] };
  }

  const entries = Object.entries(subjectMap);

  return (
    <div style={{
      background: "rgba(0,255,136,0.02)",
      border: "1px solid rgba(0,255,136,0.08)",
      borderRadius: "4px",
      padding: "16px",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "rgba(0,255,136,0.6)",
        marginBottom: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span>▸ PATTERN MAP</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {[
            { color: "#ef4444", label: "ACTIVE" },
            { color: "#00FF88", label: "RESOLVED" },
            { color: "rgba(255,255,255,0.2)", label: "UNTOUCHED" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "8px",
      }}>
        {entries.map(([subject, { active, resolved }]) => {
          const hasActive = active.length > 0;
          const hasResolved = resolved.length > 0 && active.length === 0;
          const untouched = active.length === 0 && resolved.length === 0;

          const dotColor = hasActive
            ? GAP_COLORS[active[0].gap_type ?? active[0].pattern_type] ?? "#ef4444"
            : hasResolved
            ? "#00FF88"
            : "rgba(255,255,255,0.12)";

          const borderColor = hasActive
            ? `${dotColor}40`
            : hasResolved
            ? "rgba(0,255,136,0.2)"
            : "rgba(255,255,255,0.06)";

          return (
            <div
              key={subject}
              title={
                hasActive
                  ? `${active.length} active gap${active.length > 1 ? "s" : ""}`
                  : hasResolved
                  ? `${resolved.length} resolved`
                  : "not yet attempted"
              }
              style={{
                background: hasActive ? `${dotColor}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${borderColor}`,
                borderRadius: "4px",
                padding: "10px 10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "default",
              }}
            >
              {/* Dot */}
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: dotColor,
                flexShrink: 0,
                boxShadow: hasActive ? `0 0 6px ${dotColor}` : "none",
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "10px",
                  fontFamily: "'Inter', sans-serif",
                  color: untouched ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {subject.replace("AP ", "")}
                </div>
                {(hasActive || hasResolved) && (
                  <div style={{
                    fontSize: "9px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: hasActive ? dotColor : "#00FF88",
                    marginTop: "1px",
                    opacity: 0.8,
                  }}>
                    {hasActive ? `${active.length} gap${active.length > 1 ? "s" : ""}` : `${resolved.length} done`}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────

function StatCard({
  label, value, sub, accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(0,255,136,0.1)",
      borderRadius: "4px",
      padding: "16px 18px",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.35)",
        marginBottom: "6px",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(22px, 3vw, 30px)",
        fontWeight: 700,
        color: accent ?? "#ffffff",
        lineHeight: 1,
        marginBottom: sub ? "4px" : 0,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.06em",
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ── Recent Patterns Feed ──────────────────────────────────

function PatternFeed({ patterns }: { patterns: Pattern[] }) {
  const active = patterns.filter((p) => !p.is_resolved).slice(0, 5);
  if (active.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "24px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        color: "rgba(255,255,255,0.2)",
      }}>
        NO ACTIVE PATTERNS
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {active.map((p) => {
        const color = GAP_COLORS[p.gap_type ?? p.pattern_type] ?? "#ffffff";
        return (
          <div key={p.id} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "10px 12px",
            background: `${color}0d`,
            border: `1px solid ${color}30`,
            borderRadius: "4px",
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: color,
              boxShadow: `0 0 5px ${color}`,
              flexShrink: 0,
              marginTop: "5px",
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color,
                marginBottom: "3px",
              }}>
                {p.gap_type ?? p.pattern_type}
                {p.subject && ` · ${p.subject}`}
              </div>
              <div style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {p.description}
              </div>
            </div>
            {p.occurrence_count > 1 && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}>
                ×{p.occurrence_count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────

export default function CommandCenter() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [statsRes, patternsRes] = await Promise.all([
        authFetch("/api/student-stats"),
        authFetch("/api/patterns"),
      ]);
      if (statsRes.ok) {
        const { stats: s } = await statsRes.json();
        setStats(s);
      }
      if (patternsRes.ok) {
        const { patterns: p } = await patternsRes.json();
        setPatterns(p);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        color: "rgba(255,255,255,0.2)",
      }}>
        LOADING COMMAND CENTER...
      </div>
    );
  }

  const accuracyPct =
    stats && stats.total_questions_answered > 0
      ? Math.round((stats.total_correct / stats.total_questions_answered) * 100)
      : 0;

  const gapsOpen = (stats?.concept_gaps_detected ?? 0) - (stats?.concept_gaps_resolved ?? 0);

  return (
    <div style={{ marginTop: "40px" }}>

      {/* Section header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#00FF88",
            marginBottom: "4px",
          }}>
            ▸ COMMAND CENTER
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
          }}>
            Mission Intelligence
          </h2>
        </div>
        <Link
          href="/thinking-analyzer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "10px 20px",
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.3)",
            borderRadius: "3px",
            color: "#00FF88",
            textDecoration: "none",
          }}
        >
          VIEW FULL ANALYSIS →
        </Link>
      </div>

      {/* Stats grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "12px",
        marginBottom: "20px",
      }}>
        <StatCard
          label="MISSIONS COMPLETED"
          value={stats?.lessons_completed ?? 0}
          sub="lessons"
          accent="#00FF88"
        />
        <StatCard
          label="ACTIVE STREAK"
          value={`${stats?.current_streak ?? 0}d`}
          sub={`best: ${stats?.longest_streak ?? 0}d`}
          accent="#f97316"
        />
        <StatCard
          label="ACCURACY RATE"
          value={`${accuracyPct}%`}
          sub={`${stats?.total_correct ?? 0}/${stats?.total_questions_answered ?? 0} correct`}
          accent={accuracyPct >= 80 ? "#00FF88" : accuracyPct >= 60 ? "#f97316" : "#ef4444"}
        />
        <StatCard
          label="GAPS DETECTED"
          value={stats?.concept_gaps_detected ?? 0}
          sub={`${stats?.concept_gaps_resolved ?? 0} resolved · ${gapsOpen} open`}
          accent={gapsOpen > 0 ? "#ef4444" : "#00FF88"}
        />
        <StatCard
          label="GAPS RESOLVED"
          value={stats?.concept_gaps_resolved ?? 0}
          accent="#00FF88"
        />
      </div>

      {/* Pattern Map + Feed */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr",
        gap: "16px",
        alignItems: "start",
      }}>
        <PatternMap patterns={patterns} />

        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "4px",
          padding: "16px",
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "14px",
          }}>
            ▸ ACTIVE GAPS
          </div>
          <PatternFeed patterns={patterns} />
        </div>
      </div>
    </div>
  );
}
