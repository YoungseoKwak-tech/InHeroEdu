"use client";

/**
 * LessonTranscriptStudy — renders the lecture script directly under the
 * video player as cosmic mission-control study notes. Section blocks come
 * from parseScript(); important lines are highlighted using deterministic
 * keyword + structural rules (no AI calls).
 */

import { useMemo, useState } from "react";
import { parseScript, type ScriptSection } from "@/lib/parseScript";

interface Props {
  script?: string;
  lang?: "en" | "ko";
}

// ── Section token (matches OverlayCard accents where applicable) ───────────
function getSectionToken(title: string): { color: string; tag: string } {
  const t = title.toUpperCase();
  if (t.includes("GAP") || t.includes("CRUNCH"))      return { color: "#FF6B5B", tag: "GAP CRUNCH" };
  if (t.includes("SPARK"))                             return { color: "#F4C95D", tag: "SPARK" };
  if (t.includes("TEACH"))                             return { color: "#5DCAA5", tag: "TEACH BACK" };
  if (t.includes("QUESTION") || t.includes("SPRINT"))  return { color: "#A99CFF", tag: "QUESTION SPRINT" };
  if (t.includes("ANALYZ"))                            return { color: "#5DAAF0", tag: "ANALYZER" };
  if (t.includes("HOOK"))                              return { color: "#5eead4", tag: "HOOK" };
  if (t.includes("WRAP") || t.includes("TRAJECTORY")) return { color: "#9F97ED", tag: "WRAP" };
  if (t.includes("HERO") || t.includes("EXPLAIN"))    return { color: "#5eead4", tag: "EXPLAIN" };
  if (t.includes("OVERLAYS JSON"))                     return { color: "#475569", tag: "JSON" };
  return { color: "#5eead4", tag: "" };
}

// ── Highlight detection rules ─────────────────────────────────────────────
const KEYWORDS_EN = [
  "definition", "is defined as", "defined as",
  "mechanism", "because of", "the reason",
  "AP exam", "AP test", "the exam", "trap",
  "key idea", "the key", "most important", "critically",
  "remember that", "remember:", "note that", "note:",
  "this is why", "this is the", "result is", "therefore",
  "in other words", "more specifically",
  "always", "never",
];

const KEYWORDS_KO = [
  "정의", "메커니즘", "핵심", "중요", "함정", "기억",
  "AP 시험", "AP 출제", "결과", "따라서", "즉",
  "왜냐하면", "이유는", "이게 핵심", "결국",
  "주의", "반드시", "항상", "절대",
];

interface ParsedLine {
  type: "stage" | "divider" | "text";
  text: string;
  highlight: boolean;
  score: number;
}

function parseSection(content: string, keywords: string[]): ParsedLine[] {
  if (!content?.trim()) return [];

  const paragraphs = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const result: ParsedLine[] = [];

  for (const raw of paragraphs) {
    // Stage direction: full-paragraph wrapped in [...]
    if (raw.startsWith("[") && raw.endsWith("]")) {
      result.push({ type: "stage", text: raw.slice(1, -1).trim(), highlight: false, score: 0 });
      continue;
    }
    // Plain divider
    if (/^-{3,}$/.test(raw)) {
      result.push({ type: "divider", text: "", highlight: false, score: 0 });
      continue;
    }

    // Score by keyword density
    const lower = raw.toLowerCase();
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) score += 1;
    }
    // Definition pattern: "Term: explanation..." or "Term — explanation..."
    if (/^["']?[A-Z가-힣][\w\s\-가-힣]{1,30}[:—](\s|$)/.test(raw)) score += 1;
    // Strong directive opener
    if (/^(this is|here is|the answer is|the mechanism|the result|the cause|notice that|핵심은|결론은)/i.test(raw)) score += 1;
    // Cap score so any single signal never dominates
    score = Math.min(score, 4);

    result.push({ type: "text", text: raw, highlight: false, score });
  }

  // Cap highlights at ~25% of text paragraphs
  const textOnly = result.filter((line) => line.type === "text");
  if (textOnly.length === 0) return result;
  const cap = Math.max(1, Math.floor(textOnly.length * 0.25));
  const winners = textOnly
    .filter((line) => line.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, cap);
  for (const w of winners) w.highlight = true;

  return result;
}

interface PreparedSection {
  raw: ScriptSection;
  token: { color: string; tag: string };
  lines: ParsedLine[];
}

function slugify(title: string, idx: number): string {
  const base = title.toLowerCase().replace(/[^a-z0-9가-힣]+/gi, "-").replace(/^-|-$/g, "");
  return `lts-${idx}-${base || "section"}`;
}

const COPY = {
  en: {
    eyebrow: "TRANSCRIPT",
    title: "Lecture transcript",
    subtitle: "highlighted study notes",
    counter: (n: number, m: number) => `${n} sections · ~${m} min read`,
    empty: "Transcript coming soon",
  },
  ko: {
    eyebrow: "TRANSCRIPT",
    title: "강의 스크립트",
    subtitle: "핵심 라인 하이라이트",
    counter: (n: number, m: number) => `${n}개 섹션 · 약 ${m}분 분량`,
    empty: "스크립트 준비 중",
  },
} as const;

export default function LessonTranscriptStudy({ script, lang = "en" }: Props) {
  const copy = COPY[lang];
  const [openIdx, setOpenIdx] = useState<Record<number, boolean>>({});
  const keywords = lang === "ko" ? KEYWORDS_KO : KEYWORDS_EN;

  const prepared = useMemo<PreparedSection[]>(() => {
    if (!script) return [];
    const sections = parseScript(script);
    // Drop the "OVERLAYS JSON" appendix from view (it's machine data, not study material)
    return sections
      .filter((s) => !/^\s*overlays\s+json/i.test(s.title))
      .map((raw) => ({
        raw,
        token: getSectionToken(raw.title),
        lines: parseSection(raw.content, keywords),
      }));
  }, [script, keywords]);

  const totalWords = useMemo(() => {
    return prepared.reduce((sum, s) => sum + s.raw.content.split(/\s+/).filter(Boolean).length, 0);
  }, [prepared]);
  const minutes = Math.max(1, Math.round(totalWords / 200));

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!script || prepared.length === 0) {
    return (
      <div className="lts-root lts-empty">
        <div className="lts-empty-inner">
          <span className="lts-pulse-dot" />
          <span>{copy.empty}</span>
        </div>
        <style>{LTS_STYLES}</style>
      </div>
    );
  }

  return (
    <div className="lts-root">
      <div className="lts-glow" aria-hidden="true" />
      <div className="lts-header">
        <div className="lts-header-left">
          <span className="lts-pulse-dot" />
          <span className="lts-eyebrow">{copy.eyebrow}</span>
          <span className="lts-sep">·</span>
          <span className="lts-title">{copy.title}</span>
          <span className="lts-subtitle">{copy.subtitle}</span>
        </div>
        <div className="lts-counter">{copy.counter(prepared.length, minutes)}</div>
      </div>

      <div className="lts-sections">
        {prepared.map((section, idx) => {
          const id = slugify(section.raw.title, idx);
          const collapsed = openIdx[idx] === false;
          const tok = section.token;
          return (
            <section
              key={id}
              id={id}
              className={`lts-section${collapsed ? " is-collapsed" : ""}`}
              style={{ ["--lts-tok" as string]: tok.color }}
            >
              <button
                type="button"
                className="lts-section-head"
                onClick={() =>
                  setOpenIdx((prev) => ({ ...prev, [idx]: prev[idx] === false ? true : false }))
                }
                aria-expanded={!collapsed}
              >
                <span className="lts-section-tag">{tok.tag || section.raw.title.toUpperCase()}</span>
                <span className="lts-section-title">{section.raw.title}</span>
                {section.raw.timestamp && (
                  <span className="lts-section-time">{section.raw.timestamp}</span>
                )}
                <span className="lts-section-chevron" aria-hidden="true">
                  {collapsed ? "+" : "−"}
                </span>
              </button>

              {!collapsed && (
                <div className="lts-section-body">
                  {section.lines.map((line, lineIdx) => {
                    if (line.type === "divider") {
                      return <hr key={lineIdx} className="lts-divider" />;
                    }
                    if (line.type === "stage") {
                      return (
                        <p key={lineIdx} className="lts-stage">
                          {line.text}
                        </p>
                      );
                    }
                    return (
                      <p
                        key={lineIdx}
                        className={`lts-line${line.highlight ? " is-key" : ""}`}
                      >
                        {line.text}
                      </p>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <style>{LTS_STYLES}</style>
    </div>
  );
}

const LTS_STYLES = `
  .lts-root {
    position: relative;
    margin-top: 1rem;
    border-radius: 0.85rem;
    border: 1px solid rgba(94, 234, 212, 0.15);
    background: rgba(10, 14, 26, 0.92);
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    color: #d8d9e6;
  }
  .lts-glow {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 12% 0%, rgba(94, 234, 212, 0.07), transparent 40%),
      radial-gradient(circle at 88% 100%, rgba(120, 92, 255, 0.06), transparent 42%);
  }
  .lts-empty {
    padding: 1.25rem 1rem;
    text-align: center;
  }
  .lts-empty-inner {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(94, 234, 212, 0.55);
  }
  .lts-pulse-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 10px rgba(94, 234, 212, 0.7);
    animation: lts-pulse 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes lts-pulse {
    0%, 100% { opacity: 0.55; transform: scale(0.85); }
    50%      { opacity: 1;    transform: scale(1.12); }
  }

  .lts-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .lts-header-left {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    flex-wrap: wrap;
    min-width: 0;
  }
  .lts-eyebrow {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5eead4;
    text-shadow: 0 0 10px rgba(94, 234, 212, 0.45);
  }
  .lts-sep { color: rgba(148, 163, 184, 0.4); }
  .lts-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #f3f3fb;
    letter-spacing: -0.01em;
  }
  .lts-subtitle {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: rgba(148, 163, 184, 0.65);
    letter-spacing: 0.04em;
  }
  .lts-counter {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(148, 163, 184, 0.7);
  }

  .lts-sections {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .lts-section {
    --lts-tok: #5eead4;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
  .lts-section:last-child { border-bottom: 0; }
  .lts-section-head {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.7rem 1rem;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: inherit;
    text-align: left;
    transition: background 0.15s;
  }
  .lts-section-head:hover {
    background: color-mix(in srgb, var(--lts-tok) 5%, transparent);
  }
  .lts-section-tag {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--lts-tok);
    text-shadow: 0 0 8px color-mix(in srgb, var(--lts-tok) 40%, transparent);
    flex-shrink: 0;
    min-width: 5.5rem;
  }
  .lts-section-title {
    flex: 1;
    min-width: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #e5e7f0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lts-section-time {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: rgba(148, 163, 184, 0.65);
    flex-shrink: 0;
  }
  .lts-section-chevron {
    width: 1.1rem;
    text-align: center;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: rgba(148, 163, 184, 0.55);
    flex-shrink: 0;
  }

  .lts-section-body {
    padding: 0.25rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .lts-line {
    margin: 0;
    padding: 0.4rem 0.7rem;
    font-size: 0.88rem;
    line-height: 1.65;
    color: #b8b9cc;
    border-left: 2px solid transparent;
    border-radius: 0 0.4rem 0.4rem 0;
    transition: background 0.15s, color 0.15s;
  }
  .lts-line.is-key {
    color: #f3f3fb;
    background: color-mix(in srgb, var(--lts-tok) 5%, transparent);
    border-left-color: var(--lts-tok);
    box-shadow: 0 0 14px color-mix(in srgb, var(--lts-tok) 12%, transparent);
  }
  .lts-stage {
    margin: 0;
    padding: 0.25rem 0.7rem;
    font-size: 0.78rem;
    font-style: italic;
    line-height: 1.55;
    color: #64748b;
  }
  .lts-divider {
    border: 0;
    border-top: 1px dashed rgba(255, 255, 255, 0.08);
    margin: 0.4rem 0;
  }

  @media (max-width: 720px) {
    .lts-section-tag { min-width: 0; }
    .lts-section-title { font-size: 0.8rem; }
    .lts-line { font-size: 0.85rem; padding: 0.35rem 0.55rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lts-pulse-dot { animation: none; }
  }
`;
