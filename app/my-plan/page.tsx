"use client";

/**
 * /my-plan — personalized study roadmap.
 *
 * Reads the user_study_plans row (built by /api/generate-plan) and
 * renders: greeting hero, exam-countdown strip, weekly calendar,
 * recommended materials + lounges + clubs, and a "start here" CTA.
 *
 * If the user has no plan yet, sends them to /onboarding/study-plan.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import { findExam } from "@/lib/planning/exams";

interface ExamSelection {
  slug: string;
  name: string;
  exam_date: string;
  textbook_id?: string | null;
  total_chapters?: number | null;
  next_chapter_id?: string | null;
  next_chapter_number?: string | null;
  next_chapter_title?: string | null;
}

interface DayBlock {
  subject: string;
  subject_slug: string;
  subject_emoji: string;
  subject_color: string;
  activity: string;
  chapter_id?: string;
  chapter_number?: string;
  duration_min: number;
  type: "read" | "practice" | "review" | "discuss";
}

interface MaterialRec {
  id: string;
  title: string;
  course_slug: string;
  chapter_number: string;
  unit_number: number;
  estimated_time_min: number;
  href: string;
}

interface LoungeRec {
  slug: string;
  name: string;
  href: string;
}

interface ClubRec {
  slug: string;
  name: string;
  glyph: string;
  accent: string;
  why_recommended: string;
  href: string;
}

interface StudyPlan {
  id: string;
  grade: string | null;
  exam_selections: ExamSelection[];
  weekly_schedule: Record<string, DayBlock[]>;
  recommended_materials: MaterialRec[];
  recommended_lounges: LoungeRec[];
  recommended_clubs: ClubRec[];
  created_at: string;
}

const DAYS: { key: keyof StudyPlan["weekly_schedule"]; label: string; abbr: string }[] = [
  { key: "mon", label: "Monday",    abbr: "Mon" },
  { key: "tue", label: "Tuesday",   abbr: "Tue" },
  { key: "wed", label: "Wednesday", abbr: "Wed" },
  { key: "thu", label: "Thursday",  abbr: "Thu" },
  { key: "fri", label: "Friday",    abbr: "Fri" },
  { key: "sat", label: "Saturday",  abbr: "Sat" },
  { key: "sun", label: "Sunday",    abbr: "Sun" },
];

function daysUntil(isoDate: string): number {
  // Signed delta — callers handle "past" (< 0) and "today" (=== 0)
  // explicitly via classifyCountdown below.
  const target = new Date(isoDate + "T00:00:00Z").getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

type CountdownState = "past" | "today" | "critical" | "soon" | "future";

function classifyCountdown(days: number): CountdownState {
  if (days < 0) return "past";
  if (days === 0) return "today";
  if (days <= 7) return "critical";
  if (days <= 14) return "soon";
  return "future";
}

function todayKey(): string {
  const d = new Date();
  const dow = d.getDay(); // 0=Sun, 1=Mon...
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][dow];
}

// Tailwind color name → CSS hex pair (bar gradient + glow).
const COLOR_PALETTE: Record<string, { bar: string; glow: string; chip: string }> = {
  emerald: { bar: "linear-gradient(90deg, #34d399, #5eead4)", glow: "rgba(94,234,212,0.4)",  chip: "rgba(94,234,212,0.12)" },
  orange:  { bar: "linear-gradient(90deg, #fb923c, #fbbf24)", glow: "rgba(251,146,60,0.4)",  chip: "rgba(251,146,60,0.12)" },
  sky:     { bar: "linear-gradient(90deg, #38bdf8, #818cf8)", glow: "rgba(56,189,248,0.4)",  chip: "rgba(56,189,248,0.12)" },
  rose:    { bar: "linear-gradient(90deg, #fb7185, #f472b6)", glow: "rgba(251,113,133,0.4)", chip: "rgba(251,113,133,0.12)" },
  violet:  { bar: "linear-gradient(90deg, #a78bfa, #c084fc)", glow: "rgba(167,139,250,0.4)", chip: "rgba(167,139,250,0.12)" },
  amber:   { bar: "linear-gradient(90deg, #fbbf24, #f59e0b)", glow: "rgba(251,191,36,0.4)",  chip: "rgba(251,191,36,0.12)" },
  indigo:  { bar: "linear-gradient(90deg, #818cf8, #a78bfa)", glow: "rgba(129,140,248,0.4)", chip: "rgba(129,140,248,0.12)" },
  slate:   { bar: "linear-gradient(90deg, #94a3b8, #cbd5e1)", glow: "rgba(148,163,184,0.4)", chip: "rgba(148,163,184,0.12)" },
};

function pal(color: string) {
  return COLOR_PALETTE[color] ?? COLOR_PALETTE.slate;
}

export default function MyPlanPage() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "in">("loading");
  const [userName, setUserName] = useState<string | null>(null);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shifting, setShifting] = useState(false);

  // Rebuild the plan against the current EXAM_CATALOG default dates.
  // Used by the "Plan for AP 2027" banner when the existing selections
  // straddle a closed exam cycle. Custom user-set dates are replaced;
  // students can re-edit afterwards.
  async function shiftToCurrentCycle() {
    if (!plan || shifting) return;
    setShifting(true);
    try {
      const exams = plan.exam_selections.map((e) => {
        const catalog = findExam(e.slug);
        return { slug: e.slug, exam_date: catalog?.default_exam_date ?? e.exam_date };
      });
      const res = await authFetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade: plan.grade, exams }),
      });
      const json = await res.json();
      if (res.ok && json?.plan) setPlan(json.plan as StudyPlan);
    } catch {
      // Swallow — banner re-appears on next render if any date still past.
    } finally {
      setShifting(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session?.user) {
        setAuthStatus("out");
        setLoading(false);
        return;
      }
      setAuthStatus("in");
      const meta = session.user.user_metadata ?? {};
      setUserName(
        (meta.name as string)?.split(" ")[0] ??
        (meta.full_name as string)?.split(" ")[0] ??
        session.user.email?.split("@")[0] ??
        null,
      );

      try {
        const res = await authFetch("/api/generate-plan");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
        if (!json?.plan) {
          router.replace("/onboarding/study-plan");
          return;
        }
        if (mounted) setPlan(json.plan as StudyPlan);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : "Failed to load plan");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [router, supabase]);

  const today = useMemo(todayKey, []);

  if (authStatus === "loading" || loading) {
    return (
      <main className="mp-root">
        <div className="mp-status">Loading your plan…</div>
        <style>{baseRootCss}</style>
      </main>
    );
  }

  if (authStatus === "out") {
    return (
      <main className="mp-root">
        <div className="mp-status">
          Sign in to see your plan.
          <div style={{ marginTop: "1rem" }}>
            <Link href="/" className="mp-status-link">← Back to home</Link>
          </div>
        </div>
        <style>{baseRootCss}</style>
      </main>
    );
  }

  if (error || !plan) {
    return (
      <main className="mp-root">
        <div className="mp-status">
          {error ?? "No plan yet."}
          <div style={{ marginTop: "1rem" }}>
            <Link href="/onboarding/study-plan" className="mp-status-link">Build my plan →</Link>
          </div>
        </div>
        <style>{baseRootCss}</style>
      </main>
    );
  }

  const startedDate = new Date(plan.created_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
  const startHere = plan.recommended_materials[0];

  return (
    <main className="mp-root">
      <div className="mp-shell">
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="mp-hero">
          <div className="mp-stamp">
            <span className="mp-pulse" />
            <span>STUDY PLAN · ACTIVE</span>
          </div>
          <h1 className="mp-greeting">
            Hi {userName ?? "there"}, here's your <em>roadmap</em>.
          </h1>
          <p className="mp-sub">
            {plan.grade ? `${gradeLabel(plan.grade)} · ` : ""}
            {plan.exam_selections.length} exam{plan.exam_selections.length !== 1 ? "s" : ""} ·
            {" "}Started {startedDate}
            {" · "}<Link href="/onboarding/study-plan" className="mp-edit">edit plan</Link>
          </p>
        </section>

        {/* Past-cycle banner: any exam date in the past gets a one-tap
            "rebuild on this year's catalog dates" affordance. */}
        {plan.exam_selections.some((e) => daysUntil(e.exam_date) < 0) && (
          <section className="mp-banner">
            <div className="mp-banner-text">
              <strong>Looks like part of your plan is in the past.</strong>
              <span> The AP 2026 cycle has wrapped — want to roll those exams forward to the 2027 dates?</span>
            </div>
            <button
              type="button"
              className="mp-banner-btn"
              disabled={shifting}
              onClick={() => void shiftToCurrentCycle()}
            >
              {shifting ? "Updating…" : "Plan for AP 2027 →"}
            </button>
          </section>
        )}

        {/* ── COUNTDOWN STRIP ────────────────────────────────────── */}
        <section className="mp-counts">
          {[...plan.exam_selections]
            .sort((a, b) => {
              // Future first (ascending by date), then past (most-recent past first).
              const da = daysUntil(a.exam_date);
              const db = daysUntil(b.exam_date);
              const pa = da < 0, pb = db < 0;
              if (pa && !pb) return 1;
              if (!pa && pb) return -1;
              return da - db;
            })
            .map((exam) => {
              const catalog = findExam(exam.slug);
              const days = daysUntil(exam.exam_date);
              const state = classifyCountdown(days);
              const p = pal(catalog?.accent ?? "slate");
              const totalCh = exam.total_chapters ?? 0;
              const completedCh = 0; // TODO: real progress when student_chapter_progress is hot
              const pct = totalCh > 0 ? Math.round((completedCh / totalCh) * 100) : 0;
              return (
                <div key={exam.slug} className={`mp-count-card mp-state-${state}`}>
                  <div className="mp-count-head">
                    <span className="mp-count-emoji">{catalog?.emoji ?? "📚"}</span>
                    <span className="mp-count-name">{catalog?.short_name ?? exam.name}</span>
                  </div>
                  <div className="mp-count-days">
                    {state === "past" ? (
                      <span className="mp-count-label">Past</span>
                    ) : state === "today" ? (
                      <span className="mp-count-label mp-count-label-today">Today</span>
                    ) : (
                      <>
                        <span className="mp-count-num">{days}</span>
                        <span className="mp-count-unit">day{days === 1 ? "" : "s"}</span>
                      </>
                    )}
                  </div>
                  {totalCh > 0 ? (
                    <>
                      <div className="mp-count-bar">
                        <div className="mp-count-fill" style={{ width: `${pct}%`, background: p.bar, boxShadow: `0 0 10px ${p.glow}` }} />
                      </div>
                      <div className="mp-count-meta">{pct}% · {totalCh} chapters</div>
                    </>
                  ) : (
                    <div className="mp-count-meta">{new Date(exam.exam_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                  )}
                </div>
              );
            })}
        </section>

        {/* ── WEEKLY CALENDAR ────────────────────────────────────── */}
        <section className="mp-block">
          <h2 className="mp-h2">This week's plan</h2>
          <div className="mp-week">
            {DAYS.map((d) => {
              const blocks = plan.weekly_schedule[d.key] ?? [];
              const isToday = d.key === today;
              return (
                <div key={d.key} className={`mp-day ${isToday ? "is-today" : ""}`}>
                  <div className="mp-day-head">
                    <span className="mp-day-abbr">{d.abbr}</span>
                    {isToday && <span className="mp-day-today">Today</span>}
                  </div>
                  {blocks.length === 0 ? (
                    <div className="mp-day-empty">Rest day</div>
                  ) : (
                    blocks.map((b, i) => {
                      const p = pal(b.subject_color);
                      const inner = (
                        <>
                          <div className="mp-block-head">
                            <span>{b.subject_emoji}</span>
                            <span className="mp-block-subj">{b.subject}</span>
                            <span className="mp-block-time">{b.duration_min}m</span>
                          </div>
                          <div className="mp-block-act">{b.activity}</div>
                        </>
                      );
                      const style = {
                        background: p.chip,
                        borderColor: p.glow.replace("0.4", "0.35"),
                      } as React.CSSProperties;
                      return b.chapter_number ? (
                        <Link
                          key={i}
                          href={`/textbooks/ap-bio-ultimate/${b.chapter_number}`}
                          className="mp-block-card mp-block-card-link"
                          style={style}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <div key={i} className="mp-block-card" style={style}>{inner}</div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── RECOMMENDED MATERIALS ─────────────────────────────── */}
        <section className="mp-block">
          <h2 className="mp-h2">📚 Read next</h2>
          {plan.recommended_materials.length === 0 ? (
            <div className="mp-empty">
              We're building textbook content for your exam mix — for now, AI can generate study material on demand from the Library tab.
            </div>
          ) : (
            <div className="mp-mat-row">
              {plan.recommended_materials.map((m) => (
                <Link key={m.id} href={m.href} className="mp-mat">
                  <div className="mp-mat-tag">Ch {m.chapter_number} · Unit {m.unit_number}</div>
                  <div className="mp-mat-title">{m.title}</div>
                  <div className="mp-mat-meta">{m.estimated_time_min} min · {m.course_slug.toUpperCase()}</div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── LOUNGES + CLUBS ───────────────────────────────────── */}
        {(plan.recommended_lounges.length > 0 || plan.recommended_clubs.length > 0) && (
          <section className="mp-block">
            <h2 className="mp-h2">💬 Your tribe</h2>
            <div className="mp-tribe-grid">
              {plan.recommended_lounges.map((l) => (
                <Link key={l.slug} href={l.href} className="mp-lounge">
                  <div className="mp-lounge-tag">LOUNGE</div>
                  <div className="mp-lounge-name">{l.name}</div>
                  <div className="mp-lounge-cta">Join discussion →</div>
                </Link>
              ))}
              {plan.recommended_clubs.map((c) => (
                <Link key={c.slug} href={c.href} className="mp-club" style={{ borderColor: c.accent + "55" }}>
                  <div className="mp-club-glyph" style={{ color: c.accent, textShadow: `0 0 14px ${c.accent}66` }}>{c.glyph}</div>
                  <div className="mp-club-name">{c.name}</div>
                  <div className="mp-club-why">{c.why_recommended}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────────── */}
        {startHere && (
          <section className="mp-cta-wrap">
            <Link href={startHere.href} className="mp-cta">
              <span className="mp-cta-prefix">Start with</span>
              <span className="mp-cta-title">Ch {startHere.chapter_number} — {startHere.title}</span>
              <span className="mp-cta-arrow">→</span>
            </Link>
            <div className="mp-cta-hint">{startHere.estimated_time_min} min · {startHere.course_slug.toUpperCase()}</div>
          </section>
        )}
      </div>

      <style>{baseRootCss + pageCss}</style>
    </main>
  );
}

function gradeLabel(g: string): string {
  switch (g) {
    case "9":  return "9th grade";
    case "10": return "10th grade";
    case "11": return "11th grade";
    case "12": return "12th grade";
    default:   return "Gap year";
  }
}

const baseRootCss = `
  .mp-root {
    min-height: 100vh;
    padding: 2.5rem 1.25rem 4rem;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(94,234,212,0.06), transparent 50%),
      radial-gradient(ellipse at 80% 100%, rgba(255,107,91,0.04), transparent 60%),
      #050610;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
    color: #d8d9e6;
  }
  .mp-status {
    max-width: 24rem; margin: 8rem auto;
    text-align: center;
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    color: rgba(148,163,184,0.75);
    letter-spacing: 0.04em;
  }
  .mp-status-link { color: #5eead4; text-decoration: none; }
  .mp-status-link:hover { text-decoration: underline; }
`;

const pageCss = `
  .mp-shell { max-width: 72rem; margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem; }

  /* ── Hero ───────────────────────────────────────────────────── */
  .mp-hero { display: flex; flex-direction: column; gap: 0.55rem; }
  .mp-stamp {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #5eead4;
    text-shadow: 0 0 10px rgba(94,234,212,0.5);
    width: max-content;
  }
  .mp-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 10px rgba(94,234,212,0.7);
    animation: mp-pulse 1.6s ease-in-out infinite;
  }
  @keyframes mp-pulse { 0%,100% { opacity: 0.55; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.15); } }
  .mp-greeting {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.02em; line-height: 1.1;
  }
  .mp-greeting em { font-style: italic; color: #5eead4; text-shadow: 0 0 20px rgba(94,234,212,0.4); }
  .mp-sub { font-size: 0.92rem; color: rgba(148,163,184,0.85); margin: 0; }
  .mp-edit { color: #5eead4; text-decoration: none; }
  .mp-edit:hover { text-decoration: underline; }

  /* ── Section block ──────────────────────────────────────────── */
  .mp-block { display: flex; flex-direction: column; gap: 0.85rem; }
  .mp-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .mp-empty {
    padding: 1.25rem;
    background: rgba(255,255,255,0.02);
    border: 1px dashed rgba(94,234,212,0.2);
    border-radius: 0.6rem;
    color: rgba(216,217,230,0.7);
    font-size: 0.88rem;
    line-height: 1.55;
  }

  /* ── Countdown strip ────────────────────────────────────────── */
  .mp-counts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 0.85rem;
  }
  .mp-count-card {
    padding: 1.05rem 1.15rem 1rem;
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0.7rem;
    transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
  }
  .mp-count-card:hover { transform: translateY(-2px); border-color: rgba(94,234,212,0.35); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  .mp-count-head { display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.55rem; }
  .mp-count-emoji { font-size: 1.1rem; }
  .mp-count-name {
    font-family: ui-monospace, monospace;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.04em;
    color: rgba(216,217,230,0.9);
  }
  .mp-count-days { display: flex; align-items: baseline; gap: 0.4rem; min-height: 3.4rem; }
  .mp-count-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.4rem; font-weight: 600;
    color: #f3f3fb;
    line-height: 0.9;
    letter-spacing: -0.02em;
  }
  .mp-count-unit { font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.7); letter-spacing: 0.1em; text-transform: uppercase; }

  /* ── Countdown states ────────────────────────────────────────── */
  /* soon = 8–14 days out: amber warning, no pulse */
  .mp-state-soon .mp-count-num {
    color: #F4C95D;
    text-shadow: 0 0 14px rgba(244,201,93,0.3);
  }
  /* critical = 1–7 days out: coral with gentle pulse */
  .mp-state-critical .mp-count-num {
    color: #FF6B5B;
    text-shadow: 0 0 18px rgba(255,107,91,0.4);
    animation: mp-count-pulse 2s ease-in-out infinite;
  }
  @keyframes mp-count-pulse {
    0%, 100% { text-shadow: 0 0 14px rgba(255,107,91,0.3); }
    50%      { text-shadow: 0 0 22px rgba(255,107,91,0.6); }
  }
  /* today = exam day: large coral label, no number */
  .mp-state-today { border-color: rgba(255,107,91,0.45); box-shadow: 0 0 24px rgba(255,107,91,0.18); }
  .mp-count-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem; font-weight: 600;
    color: rgba(148,163,184,0.55);
    letter-spacing: -0.01em;
    line-height: 1;
  }
  .mp-count-label-today {
    color: #FF6B5B;
    font-style: italic;
    font-size: 2.6rem;
    text-shadow: 0 0 20px rgba(255,107,91,0.55);
    animation: mp-count-pulse 2s ease-in-out infinite;
  }
  /* past = exam already happened: desaturate the whole card */
  .mp-state-past {
    opacity: 0.55;
    border-color: rgba(148,163,184,0.12);
  }
  .mp-state-past:hover { transform: none; border-color: rgba(148,163,184,0.2); box-shadow: none; }
  .mp-state-past .mp-count-fill { filter: grayscale(0.7); opacity: 0.6; }

  /* ── Past-cycle banner ───────────────────────────────────────── */
  .mp-banner {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.95rem 1.15rem;
    background: linear-gradient(135deg, rgba(244,201,93,0.08), rgba(255,107,91,0.06));
    border: 1px solid rgba(244,201,93,0.32);
    border-radius: 0.7rem;
    flex-wrap: wrap;
  }
  .mp-banner-text { flex: 1; min-width: 14rem; font-size: 0.9rem; color: rgba(216,217,230,0.92); line-height: 1.5; }
  .mp-banner-text strong { color: #F4C95D; font-weight: 600; }
  .mp-banner-btn {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.6rem 0.95rem;
    color: #0a0a10;
    background: linear-gradient(135deg, #F4C95D 0%, #FF6B5B 100%);
    border: 0; border-radius: 0.45rem;
    cursor: pointer;
    transition: filter 150ms ease, box-shadow 200ms ease, transform 100ms ease;
  }
  .mp-banner-btn:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 22px rgba(244,201,93,0.45); transform: translateY(-1px); }
  .mp-banner-btn:disabled { opacity: 0.55; cursor: default; }
  .mp-count-bar {
    height: 5px;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    overflow: hidden;
    margin: 0.8rem 0 0.5rem;
  }
  .mp-count-fill { height: 100%; transition: width 0.4s; }
  .mp-count-meta {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148,163,184,0.7);
    letter-spacing: 0.04em;
  }

  /* ── Weekly calendar ────────────────────────────────────────── */
  .mp-week {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.55rem;
  }
  @media (max-width: 760px) { .mp-week { grid-template-columns: repeat(2, minmax(0, 1fr)); } }

  .mp-day {
    display: flex; flex-direction: column; gap: 0.4rem;
    padding: 0.7rem 0.65rem;
    background: rgba(255,255,255,0.015);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0.55rem;
    min-height: 8rem;
  }
  .mp-day.is-today {
    border-left: 3px solid #a99cff;
    background: linear-gradient(180deg, rgba(169,156,255,0.05), rgba(255,255,255,0.015));
    box-shadow: inset 0 0 0 1px rgba(169,156,255,0.18);
  }
  .mp-day-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem; }
  .mp-day-abbr {
    font-family: ui-monospace, monospace;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(148,163,184,0.85);
  }
  .mp-day-today {
    font-family: ui-monospace, monospace;
    font-size: 0.58rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #a99cff;
    padding: 0.1rem 0.35rem;
    background: rgba(169,156,255,0.12);
    border: 1px solid rgba(169,156,255,0.3);
    border-radius: 0.3rem;
  }
  .mp-day-empty {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148,163,184,0.5);
    padding: 0.5rem 0;
    text-align: center;
  }
  .mp-block-card {
    display: flex; flex-direction: column; gap: 0.3rem;
    padding: 0.55rem 0.6rem;
    border: 1px solid;
    border-radius: 0.4rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.1s, filter 0.15s, box-shadow 0.2s;
  }
  .mp-block-card-link:hover { transform: translateY(-1px); filter: brightness(1.1); box-shadow: 0 6px 18px rgba(0,0,0,0.3); }
  .mp-block-head {
    display: flex; align-items: center; gap: 0.35rem;
    font-family: ui-monospace, monospace;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(216,217,230,0.92);
  }
  .mp-block-subj { flex: 1; }
  .mp-block-time { color: rgba(148,163,184,0.7); font-weight: 500; }
  .mp-block-act {
    font-size: 0.78rem;
    color: rgba(216,217,230,0.85);
    line-height: 1.35;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /* ── Materials row ──────────────────────────────────────────── */
  .mp-mat-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 0.7rem;
  }
  .mp-mat {
    display: flex; flex-direction: column; gap: 0.45rem;
    padding: 1rem 1.05rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0.6rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
  }
  .mp-mat:hover { transform: translateY(-2px); border-color: rgba(94,234,212,0.4); box-shadow: 0 8px 28px rgba(94,234,212,0.12); }
  .mp-mat-tag { font-family: ui-monospace, monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #5eead4; }
  .mp-mat-title { font-size: 0.95rem; color: #f3f3fb; line-height: 1.35; font-weight: 500; }
  .mp-mat-meta { font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.7); margin-top: auto; }

  /* ── Tribe grid (lounges + clubs) ───────────────────────────── */
  .mp-tribe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 0.7rem;
  }
  .mp-lounge, .mp-club {
    display: flex; flex-direction: column; gap: 0.3rem;
    padding: 0.95rem 1.05rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0.6rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
  }
  .mp-lounge:hover, .mp-club:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
  .mp-lounge:hover { border-color: rgba(94,234,212,0.4); }
  .mp-lounge-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(94,234,212,0.85);
  }
  .mp-lounge-name { font-size: 1rem; color: #f3f3fb; font-weight: 500; line-height: 1.25; }
  .mp-lounge-cta {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem; font-weight: 600;
    color: rgba(148,163,184,0.7);
    letter-spacing: 0.08em;
    margin-top: 0.25rem;
  }
  .mp-club-glyph { font-size: 1.6rem; line-height: 1; }
  .mp-club-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: #f3f3fb; }
  .mp-club-why { font-size: 0.82rem; color: rgba(148,163,184,0.78); line-height: 1.4; }

  /* ── CTA ──────────────────────────────────────────────────── */
  .mp-cta-wrap { display: flex; flex-direction: column; align-items: stretch; gap: 0.5rem; margin-top: 0.5rem; }
  .mp-cta {
    display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;
    padding: 1.1rem 1.4rem;
    background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(169,156,255,0.18));
    border: 1px solid rgba(94,234,212,0.4);
    border-radius: 0.7rem;
    text-decoration: none;
    color: inherit;
    transition: filter 0.15s, transform 0.1s, box-shadow 0.2s;
  }
  .mp-cta:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 12px 36px rgba(94,234,212,0.25); }
  .mp-cta-prefix { font-family: ui-monospace, monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(148,163,184,0.85); }
  .mp-cta-title { flex: 1; font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; color: #f3f3fb; letter-spacing: -0.01em; }
  .mp-cta-arrow { font-size: 1.6rem; color: #5eead4; text-shadow: 0 0 14px rgba(94,234,212,0.5); }
  .mp-cta-hint { font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.65); margin-left: 0.4rem; letter-spacing: 0.08em; }
`;
