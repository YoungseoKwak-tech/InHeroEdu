"use client";

/**
 * /onboarding/study-plan — 3-step study-plan onboarding flow.
 *
 * Different surface from /onboarding (which claims the trajectory
 * handle). This one captures grade + selected exams + exam dates,
 * then POSTs to /api/generate-plan and forwards to /my-plan.
 *
 * Reuses the cosmic ob-* styling from /onboarding/page.tsx as a
 * baseline plus its own sp-* additions for the multi-select grid.
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import {
  EXAMS_BY_CATEGORY,
  CATEGORY_LABELS,
  findExam,
  type ExamCategory,
} from "@/lib/planning/exams";

type Step = 0 | 1 | 2 | 3;
type Grade = "9" | "10" | "11" | "12" | "other";

const GRADE_LABELS: Record<Grade, string> = {
  "9":     "9th — Freshman",
  "10":    "10th — Sophomore",
  "11":    "11th — Junior",
  "12":    "12th — Senior",
  other:   "Other / Gap year",
};

const LOADING_MESSAGES = [
  "Mapping your textbooks…",
  "Finding your tribe…",
  "Building your week…",
  "Counting the days…",
];

export default function StudyPlanOnboardingPage() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "in">("loading");
  const [step, setStep] = useState<Step>(0);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [dates, setDates] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  // Auth gate.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthStatus(session?.user ? "in" : "out");
    })();
    return () => { mounted = false; };
  }, [supabase]);

  // Cycle the loading messages while submitting.
  useEffect(() => {
    if (!submitting) return;
    const t = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 900);
    return () => clearInterval(t);
  }, [submitting]);

  // Default the date inputs when an exam is first selected.
  useEffect(() => {
    setDates((prev) => {
      const next = { ...prev };
      for (const slug of selected) {
        if (!next[slug]) {
          const catalog = findExam(slug);
          if (catalog) next[slug] = catalog.default_exam_date;
        }
      }
      return next;
    });
  }, [selected]);

  function toggleExam(slug: string) {
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const canAdvance0 = grade != null;
  const canAdvance1 = selected.length > 0;
  const canSubmit = canAdvance1 && selected.every((s) => dates[s]);

  async function submit() {
    if (submitting || !canSubmit || !grade) return;
    setSubmitting(true);
    setError(null);
    setStep(3);

    const payload = {
      grade,
      exams: selected.map((slug) => ({ slug, exam_date: dates[slug] })),
    };

    try {
      const res = await authFetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? `HTTP ${res.status}`);
      }
      // Brief pause so the loading messages get a moment.
      setTimeout(() => router.push("/my-plan"), 700);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate plan");
      setSubmitting(false);
      setStep(2);
    }
  }

  const totalExams = selected.length;
  const examsByCat = useMemo(() => EXAMS_BY_CATEGORY, []);
  // Today as ISO YYYY-MM-DD for the date-input min attr. Computed
  // once per mount; new students shouldn't be able to pick a past
  // exam date.
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <main className="sp-root">
      <div className="sp-shell">
        <div className="sp-stamp">
          <span className="sp-pulse" />
          <span>STUDY PLAN · ONBOARDING</span>
        </div>
        <h1 className="sp-title">
          Build your <em>roadmap</em>.
        </h1>
        <p className="sp-sub">Three quick steps. We map textbooks, lounges, and a week-by-week plan.</p>

        {authStatus === "loading" && <div className="sp-loading">Checking your session…</div>}

        {authStatus === "out" && (
          <div className="sp-signed-out">
            <strong>Sign in first.</strong>
            <p>Hit SIGN IN in the top nav, then come back here.</p>
            <Link href="/" className="sp-link-home">← Back to home</Link>
          </div>
        )}

        {authStatus === "in" && (
          <>
            <div className="sp-steps" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`sp-step-dot ${i <= step ? "is-active" : ""}`} />
              ))}
            </div>

            {/* ── Step 0: Grade ───────────────────────────────────────── */}
            {step === 0 && (
              <section className="sp-section">
                <label className="sp-label">What grade are you in?</label>
                <div className="sp-grade-grid">
                  {(Object.keys(GRADE_LABELS) as Grade[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={`sp-grade ${grade === g ? "is-active" : ""}`}
                    >
                      <span className="sp-grade-num">{g === "other" ? "?" : g}</span>
                      <span className="sp-grade-label">{GRADE_LABELS[g]}</span>
                    </button>
                  ))}
                </div>
                <div className="sp-row sp-row-end">
                  <button type="button" onClick={() => setStep(1)} disabled={!canAdvance0} className="sp-btn-primary">
                    NEXT →
                  </button>
                </div>
              </section>
            )}

            {/* ── Step 1: Exams ───────────────────────────────────────── */}
            {step === 1 && (
              <section className="sp-section">
                <label className="sp-label">
                  What are you preparing for?
                  <span className="sp-label-hint">pick all that apply · selected: {totalExams}</span>
                </label>

                {(Object.keys(examsByCat) as ExamCategory[]).map((cat) => (
                  <div key={cat} className="sp-cat">
                    <div className="sp-cat-title">{CATEGORY_LABELS[cat]}</div>
                    <div className="sp-chips">
                      {examsByCat[cat].map((e) => {
                        const active = selected.includes(e.slug);
                        return (
                          <button
                            key={e.slug}
                            type="button"
                            onClick={() => toggleExam(e.slug)}
                            className={`sp-chip ${active ? "is-active" : ""}`}
                          >
                            <span className="sp-chip-emoji">{e.emoji}</span>
                            <span>{e.short_name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="sp-row">
                  <button type="button" onClick={() => setStep(0)} className="sp-btn-ghost">← Back</button>
                  <button type="button" onClick={() => setStep(2)} disabled={!canAdvance1} className="sp-btn-primary">
                    NEXT →
                  </button>
                </div>
              </section>
            )}

            {/* ── Step 2: Dates ───────────────────────────────────────── */}
            {step === 2 && (
              <section className="sp-section">
                <label className="sp-label">When are your tests?</label>
                <p className="sp-hint">Defaults to the 2026 calendar. Change any one if your date differs.</p>

                <div className="sp-dates">
                  {selected.map((slug) => {
                    const c = findExam(slug);
                    if (!c) return null;
                    const def = c.default_exam_date;
                    const cur = dates[slug] ?? def;
                    const isDefault = cur === def;
                    return (
                      <div key={slug} className="sp-date-row">
                        <span className="sp-date-emoji">{c.emoji}</span>
                        <span className="sp-date-name">{c.name}</span>
                        <input
                          type="date"
                          value={cur}
                          min={todayISO}
                          onChange={(ev) => setDates((d) => ({ ...d, [slug]: ev.target.value }))}
                          className="sp-date-input"
                        />
                        <span className={`sp-date-tag ${isDefault ? "is-default" : "is-custom"}`}>
                          {isDefault ? "default" : "custom"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {error && <div className="sp-error">{error}</div>}
                <div className="sp-row">
                  <button type="button" onClick={() => setStep(1)} className="sp-btn-ghost">← Back</button>
                  <button type="button" onClick={() => void submit()} disabled={!canSubmit} className="sp-btn-primary">
                    BUILD MY PLAN →
                  </button>
                </div>
              </section>
            )}

            {/* ── Step 3: Loading ─────────────────────────────────────── */}
            {step === 3 && (
              <section className="sp-section sp-loading-section">
                <div className="sp-spinner" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <div className="sp-loading-msg">{LOADING_MESSAGES[loadingMsgIdx]}</div>
                <div className="sp-loading-sub">Generating a custom plan from {totalExams} exam{totalExams !== 1 ? "s" : ""}…</div>
              </section>
            )}
          </>
        )}
      </div>

      <style>{`
        .sp-root {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem 1.25rem;
          background: radial-gradient(ellipse at top, rgba(94,234,212,0.06), transparent 60%), #050610;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          color: #d8d9e6;
        }
        .sp-shell {
          width: min(40rem, 100%);
          background: linear-gradient(180deg, #0a0e1a 0%, #050610 100%);
          border: 1px solid rgba(94, 234, 212, 0.18);
          border-radius: 1rem;
          padding: 1.85rem 1.75rem 1.5rem;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(94, 234, 212, 0.05);
        }
        .sp-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.5);
          margin-bottom: 0.85rem;
        }
        .sp-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 10px rgba(94,234,212,0.7);
          animation: sp-pulse 1.6s ease-in-out infinite;
        }
        @keyframes sp-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .sp-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.85rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.45rem;
          letter-spacing: -0.015em; line-height: 1.15;
        }
        .sp-title em { font-style: italic; color: #5eead4; text-shadow: 0 0 16px rgba(94,234,212,0.35); }
        .sp-sub { font-size: 0.9rem; color: #94a3b8; margin: 0 0 1.25rem; line-height: 1.5; }

        .sp-loading { padding: 1rem; font-family: ui-monospace, monospace; font-size: 0.8rem; color: rgba(148,163,184,0.7); text-align: center; }

        .sp-signed-out { padding: 1rem; background: rgba(244,201,93,0.06); border: 1px solid rgba(244,201,93,0.25); border-radius: 0.5rem; color: #F4C95D; }
        .sp-signed-out strong { display: block; margin-bottom: 0.4rem; }
        .sp-signed-out p { color: rgba(244,201,93,0.8); font-size: 0.84rem; margin: 0 0 0.7rem; }
        .sp-link-home { font-family: ui-monospace, monospace; font-size: 0.72rem; color: #5eead4; text-decoration: none; letter-spacing: 0.08em; }
        .sp-link-home:hover { text-decoration: underline; }

        .sp-steps { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; }
        .sp-step-dot { width: 24px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.08); transition: background 0.2s; }
        .sp-step-dot.is-active { background: #5eead4; box-shadow: 0 0 6px rgba(94,234,212,0.5); }

        .sp-section { display: flex; flex-direction: column; gap: 0.8rem; }
        .sp-label { font-family: ui-monospace, monospace; font-size: 0.66rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(148, 163, 184, 0.85); }
        .sp-label-hint { color: rgba(148,163,184,0.55); letter-spacing: 0.08em; margin-left: 0.4rem; text-transform: none; font-weight: 500; }
        .sp-hint { font-size: 0.8rem; color: rgba(148,163,184,0.7); line-height: 1.5; margin: 0; }

        /* ── Grade selector ─────────────────────────────────────────── */
        .sp-grade-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr)); gap: 0.55rem; }
        .sp-grade {
          display: flex; flex-direction: column; align-items: flex-start; gap: 0.35rem;
          padding: 1rem 0.95rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.6rem;
          color: #d8d9e6;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s, background 0.15s, box-shadow 0.2s;
        }
        .sp-grade:hover { border-color: rgba(94,234,212,0.4); transform: translateY(-1px); }
        .sp-grade.is-active {
          border-color: #5eead4;
          background: linear-gradient(180deg, rgba(94,234,212,0.12), rgba(94,234,212,0.04));
          box-shadow: 0 0 0 1px #5eead4, 0 0 22px rgba(94,234,212,0.25);
        }
        .sp-grade-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 600;
          color: #5eead4;
          line-height: 1;
        }
        .sp-grade-label { font-size: 0.82rem; color: rgba(216,217,230,0.85); }

        /* ── Exam chips ─────────────────────────────────────────────── */
        .sp-cat { display: flex; flex-direction: column; gap: 0.5rem; }
        .sp-cat-title {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(94,234,212,0.7);
          margin-top: 0.45rem;
        }
        .sp-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .sp-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 0.8rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: #d8d9e6;
          font-size: 0.82rem; font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.1s;
        }
        .sp-chip:hover { border-color: rgba(94,234,212,0.4); }
        .sp-chip.is-active {
          border-color: #5eead4;
          background: rgba(94,234,212,0.12);
          color: #5eead4;
          box-shadow: 0 0 0 1px #5eead4, 0 0 14px rgba(94,234,212,0.2);
          transform: scale(1.02);
        }
        .sp-chip-emoji { font-size: 0.95rem; }

        /* ── Dates ──────────────────────────────────────────────────── */
        .sp-dates { display: flex; flex-direction: column; gap: 0.5rem; }
        .sp-date-row {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.75rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
        }
        .sp-date-emoji { font-size: 1.15rem; }
        .sp-date-name { font-size: 0.9rem; color: #f3f3fb; }
        .sp-date-input {
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(94,234,212,0.25);
          border-radius: 0.35rem;
          padding: 0.4rem 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: #5eead4;
          outline: none;
          color-scheme: dark;
        }
        .sp-date-input:focus { border-color: #5eead4; box-shadow: 0 0 0 1px #5eead4; }
        .sp-date-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.15rem 0.45rem;
          border-radius: 0.3rem;
        }
        .sp-date-tag.is-default { color: rgba(148,163,184,0.7); background: rgba(148,163,184,0.07); }
        .sp-date-tag.is-custom { color: #F4C95D; background: rgba(244,201,93,0.1); }

        /* ── Row buttons ────────────────────────────────────────────── */
        .sp-row { display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 0.4rem; }
        .sp-row-end { justify-content: flex-end; }
        .sp-btn-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.75rem 1.15rem;
          color: #0a0a10; background: linear-gradient(135deg, #5eead4 0%, #a99cff 100%);
          border: 0; border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s, transform 0.1s;
        }
        .sp-btn-primary:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 22px rgba(94,234,212,0.5); transform: translateY(-1px); }
        .sp-btn-primary:disabled { opacity: 0.35; cursor: default; }
        .sp-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.7rem 0.95rem;
          color: rgba(148,163,184,0.85);
          background: transparent;
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .sp-btn-ghost:hover { color: #fff; border-color: rgba(94,234,212,0.4); }

        .sp-error {
          padding: 0.5rem 0.7rem;
          border-radius: 0.4rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          line-height: 1.55;
          word-break: break-word;
        }

        /* ── Loading section ───────────────────────────────────────── */
        .sp-loading-section { align-items: center; padding: 1.5rem 0 1rem; }
        .sp-spinner { position: relative; width: 56px; height: 56px; }
        .sp-spinner span {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #5eead4;
          animation: sp-spin 1.2s linear infinite;
        }
        .sp-spinner span:nth-child(2) { border-top-color: #a99cff; animation-duration: 1.6s; animation-direction: reverse; opacity: 0.7; }
        .sp-spinner span:nth-child(3) { border-top-color: #FF6B5B; animation-duration: 2s; opacity: 0.45; }
        @keyframes sp-spin { to { transform: rotate(360deg); } }

        .sp-loading-msg {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: #5eead4;
          text-shadow: 0 0 14px rgba(94,234,212,0.3);
          margin-top: 1rem;
          letter-spacing: -0.01em;
        }
        .sp-loading-sub {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: rgba(148,163,184,0.6);
          letter-spacing: 0.04em;
          margin-top: 0.3rem;
        }
      `}</style>
    </main>
  );
}
