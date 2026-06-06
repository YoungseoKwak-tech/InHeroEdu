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
import { authFetch, getClientSession } from "@/lib/client-auth";
import { courses } from "@/lib/data/courses";
import { findExam } from "@/lib/planning/exams";
import ResumeCard from "@/components/my-plan/ResumeCard";

interface ExamSelection {
  slug: string;
  name: string;
  // New shape — target_finish_date is primary. exam_date is optional
  // (null for non-AP-takers). Legacy plans built before this change
  // may not have target_finish_date; the render path falls back to
  // exam_date in that case so old rows still display.
  target_finish_date?: string;
  exam_date?: string | null;
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

interface BillingSubscription {
  id: string;
  provider: string;
  service_id: string;
  subject_id: string | null;
  status: string;
  next_billing_at: string | null;
  last_billed_at: string | null;
  last_order_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  can_cancel: boolean;
}

interface BillingSummary {
  subscriptions: BillingSubscription[];
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

/**
 * The exam selection's "primary" date — what the countdown card
 * counts down to. Prefers target_finish_date (new shape) and falls
 * back to exam_date for legacy plans built before the schema change.
 */
function primaryDate(e: ExamSelection): string {
  return e.target_finish_date ?? e.exam_date ?? "";
}

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

async function readJsonSafely(res: Response): Promise<Record<string, unknown> | null> {
  const text = await res.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function loadPlanResponse(): Promise<Response> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 7_000);

  try {
    return await authFetch("/api/generate-plan", {
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
}

async function loadBillingResponse(): Promise<BillingSummary> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 7_000);

  try {
    const res = await authFetch("/api/billing", {
      signal: controller.signal,
    });
    const json = await readJsonSafely(res);
    if (!res.ok) {
      const message =
        typeof json?.error === "string"
          ? json.error
          : `Could not load billing yet (${res.status}).`;
      throw new Error(message);
    }
    const subscriptions = Array.isArray(json?.subscriptions)
      ? (json.subscriptions as BillingSubscription[])
      : [];
    return { subscriptions };
  } finally {
    window.clearTimeout(timeout);
  }
}

// Subject color palette — desaturated ~40% vs. the original
// tailwind-bright values so the countdown strip and weekly
// calendar feel cosmic-watercolor instead of rainbow-neon. Each
// entry is still distinguishable; glow + chip alphas dropped too
// so the muted hues don't bloom on dark backgrounds.
const COLOR_PALETTE: Record<string, { bar: string; glow: string; chip: string }> = {
  emerald: { bar: "linear-gradient(90deg, #6ea394, #8dc8ba)", glow: "rgba(141,200,186,0.28)", chip: "rgba(141,200,186,0.08)" },
  orange:  { bar: "linear-gradient(90deg, #d99a72, #d3b162)", glow: "rgba(217,154,114,0.28)", chip: "rgba(217,154,114,0.08)" },
  sky:     { bar: "linear-gradient(90deg, #6fa5c2, #8d99c8)", glow: "rgba(111,165,194,0.28)", chip: "rgba(111,165,194,0.08)" },
  rose:    { bar: "linear-gradient(90deg, #c8939c, #c397ad)", glow: "rgba(200,147,156,0.28)", chip: "rgba(200,147,156,0.08)" },
  violet:  { bar: "linear-gradient(90deg, #a89ec4, #b5a4c6)", glow: "rgba(168,158,196,0.28)", chip: "rgba(168,158,196,0.08)" },
  amber:   { bar: "linear-gradient(90deg, #c2a565, #b08e44)", glow: "rgba(194,165,101,0.28)", chip: "rgba(194,165,101,0.08)" },
  indigo:  { bar: "linear-gradient(90deg, #8d99c8, #a89ec4)", glow: "rgba(141,153,200,0.28)", chip: "rgba(141,153,200,0.08)" },
  slate:   { bar: "linear-gradient(90deg, #94a3b8, #b6c0cf)", glow: "rgba(148,163,184,0.28)", chip: "rgba(148,163,184,0.08)" },
};

function pal(color: string) {
  return COLOR_PALETTE[color] ?? COLOR_PALETTE.slate;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "Not scheduled";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function subjectLabel(subjectId: string | null): string {
  if (!subjectId) return "All subjects";
  const course = courses.find((c) => c.id === subjectId);
  if (course) return course.subjectEn;
  return subjectId
    .split("-")
    .map((part) => (part === "ap" ? "AP" : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

function planLabel(subscription: BillingSubscription): string {
  if (subscription.service_id === "all_subjects") return "All Subject Elite";
  if (subscription.service_id.startsWith("one_subject:")) return "One Subject Elite";
  if (subscription.service_id === "one_subject") return "One Subject Elite";
  return subscription.service_id.replace(/_/g, " ");
}

export default function MyPlanPage() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "in">("loading");
  const [userName, setUserName] = useState<string | null>(null);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shifting, setShifting] = useState(false);
  const [billing, setBilling] = useState<BillingSummary | null>(null);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState<string | null>(null);
  const [cancelingSubscriptionId, setCancelingSubscriptionId] = useState<string | null>(null);

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
        // Roll the AP exam date forward to the current cycle. Keep
        // the student's chosen target_finish_date untouched so a
        // rebuild doesn't silently extend their personal deadline.
        return {
          slug: e.slug,
          target_finish_date: e.target_finish_date ?? primaryDate(e),
          exam_date: e.exam_date ? catalog?.default_exam_date ?? e.exam_date : null,
        };
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
      const session = await getClientSession();
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
        const res = await loadPlanResponse();
        const json = await readJsonSafely(res);

        if (res.status === 401 || res.status === 403) {
          if (mounted) {
            setAuthStatus("out");
            setError(null);
          }
          return;
        }

        if (!res.ok) {
          const message =
            typeof json?.error === "string"
              ? json.error
              : `Could not load your plan yet (${res.status}).`;
          throw new Error(message);
        }

        if (!json?.plan) {
          if (mounted) {
            setLoading(false);
            setError(null);
          }
          router.replace("/onboarding/study-plan");
          return;
        }

        if (mounted) setPlan(json.plan as StudyPlan);
      } catch (e) {
        if (mounted) {
          const message =
            e instanceof DOMException && e.name === "AbortError"
              ? "Your plan took too long to load. Try again, or sign in again if your session is stale."
              : e instanceof Error
                ? e.message
                : "Failed to load plan";
          setError(message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  useEffect(() => {
    if (authStatus !== "in") return;

    let mounted = true;
    setBillingLoading(true);
    setBillingError(null);

    loadBillingResponse()
      .then((summary) => {
        if (mounted) setBilling(summary);
      })
      .catch((e) => {
        if (!mounted) return;
        const message =
          e instanceof DOMException && e.name === "AbortError"
            ? "Billing took too long to load. Try refreshing once."
            : e instanceof Error
              ? e.message
              : "Failed to load billing.";
        setBillingError(message);
      })
      .finally(() => {
        if (mounted) setBillingLoading(false);
      });

    return () => { mounted = false; };
  }, [authStatus]);

  async function cancelSubscription(subscription: BillingSubscription) {
    if (subscription.status !== "active") return;

    const confirmed = window.confirm(
      "Cancel future recurring billing? You will keep access through the paid period, and no next monthly charge will be attempted."
    );
    if (!confirmed) return;

    setCancelingSubscriptionId(subscription.id);
    setBillingError(null);
    try {
      const res = await authFetch(
        `/api/billing/subscriptions/${encodeURIComponent(subscription.id)}/cancel`,
        { method: "POST" }
      );
      const json = await readJsonSafely(res);
      if (!res.ok) {
                        throw new Error(typeof json?.error === "string" ? json.error : "Could not cancel subscription.");
      }

      setBilling((current) => {
        if (!current) return current;
        return {
          subscriptions: current.subscriptions.map((item) =>
            item.id === subscription.id
              ? { ...item, status: "cancelled", can_cancel: false }
              : item
          ),
        };
      });
    } catch (e) {
      setBillingError(e instanceof Error ? e.message : "Could not cancel subscription.");
    } finally {
      setCancelingSubscriptionId(null);
    }
  }

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
  const subscriptions = billing?.subscriptions ?? [];

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
            {" "}<Link href="/onboarding/study-plan" className="mp-edit">✏️ Edit plan</Link>
          </p>
        </section>

        {/* ── TODAY block ────────────────────────────────────────
            Today's sessions pulled out of the weekly grid so a student
            landing here sees "what to do right now" at a glance —
            larger cards, fuller activity text, explicit Start CTA per
            session. The weekly grid below still shows the same TODAY
            column for week-context, intentionally kept un-dimmed so
            students can still compare today vs. the rest of the week. */}
        {(() => {
          const todayBlocks = plan.weekly_schedule[today] ?? [];
          const todayLabel = DAYS.find((d) => d.key === today)?.abbr.toUpperCase() ?? "";
          return (
            <section className="mp-today-block">
              <div className="mp-today-head">
                <span className="mp-today-eyebrow">
                  <span className="mp-pulse" aria-hidden="true" />
                  TODAY · {todayLabel}
                </span>
                <span className="mp-today-count">
                  {todayBlocks.length} session{todayBlocks.length === 1 ? "" : "s"}
                </span>
              </div>
              {todayBlocks.length === 0 ? (
                <div className="mp-today-empty">Rest day — no sessions scheduled.</div>
              ) : (
                <div className="mp-today-grid">
                  {todayBlocks.map((b, i) => {
                    const p = pal(b.subject_color);
                    const catalog = findExam(b.subject_slug);
                    const style = {
                      background: p.chip,
                      borderColor: p.glow.replace("0.28", "0.45"),
                    } as React.CSSProperties;
                    const blockHref = (() => {
                      if (b.chapter_number && b.subject_slug === "ap-bio") {
                        return `/textbooks/ap-bio-ultimate/${b.chapter_number}`;
                      }
                      if (catalog?.lounge_slug) return `/lounges/${catalog.lounge_slug}`;
                      return null;
                    })();
                    return (
                      <div key={i} className="mp-today-card" style={style}>
                        <div className="mp-today-card-head">
                          <span className="mp-today-card-emoji" aria-hidden="true">{b.subject_emoji}</span>
                          <span className="mp-today-card-subj">{b.subject}</span>
                          <span className="mp-today-card-time">{b.duration_min}m</span>
                        </div>
                        <div className="mp-today-card-act">{b.activity}</div>
                        {blockHref ? (
                          <Link href={blockHref} className="mp-today-card-cta">Start →</Link>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })()}

        {/* ── Resume CTA ──────────────────────────────────────────
            Single primary action: continue the last lesson + streak handoff. */}
        <ResumeCard />

        {/* ── BILLING + LEGAL CONTROLS ──────────────────────────── */}
        <section className="mp-billing">
          <div className="mp-billing-head">
            <div>
              <div className="mp-billing-eyebrow">BILLING CONTROL</div>
              <h2 className="mp-h2">My subscription</h2>
            </div>
            <Link href="/billing" className="mp-billing-link">Full billing history →</Link>
          </div>

          {billingLoading ? (
            <div className="mp-billing-muted">Loading billing status…</div>
          ) : billingError ? (
            <div className="mp-billing-error">
              {billingError}
              <span>If this persists, email inheroedu@gmail.com and we’ll handle cancellation manually.</span>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="mp-billing-empty">
              <strong>No active subscription on this account yet.</strong>
              <span>You can still use the free first lesson for each course. Upgrade only when you want the full subject unlocked.</span>
              <Link href="/pricing" className="mp-billing-cta">See pricing →</Link>
            </div>
          ) : (
            <div className="mp-subscription-list">
              {subscriptions.map((subscription) => {
                const isActive = subscription.status === "active";
                const isCancelling = cancelingSubscriptionId === subscription.id;
                return (
                  <article key={subscription.id} className={`mp-sub-card ${isActive ? "is-active" : "is-inactive"}`}>
                    <div className="mp-sub-main">
                      <div className="mp-sub-title-row">
                        <span className="mp-sub-title">{planLabel(subscription)}</span>
                        <span className={`mp-sub-status ${isActive ? "is-active" : ""}`}>
                          {subscription.status}
                        </span>
                      </div>
                      <div className="mp-sub-scope">
                        {subscription.service_id === "all_subjects"
                          ? "All courses, textbooks, question banks, and lounges"
                          : `${subjectLabel(subscription.subject_id)} course, textbook, question bank + all lounges`}
                      </div>
                      <div className="mp-sub-meta">
                        <span>Provider: {subscription.provider.toUpperCase()}</span>
                        <span>
                          {isActive ? "Next billing" : "Access through"}: {formatDateTime(subscription.next_billing_at)}
                        </span>
                        <span>Last billed: {formatDateTime(subscription.last_billed_at)}</span>
                      </div>
                    </div>
                    <div className="mp-sub-actions">
                      {isActive ? (
                        <button
                          type="button"
                          className="mp-cancel-btn"
                          disabled={isCancelling}
                          onClick={() => void cancelSubscription(subscription)}
                        >
                          {isCancelling ? "Cancelling…" : "Cancel renewal"}
                        </button>
                      ) : (
                        <span className="mp-cancelled-note">Renewal stopped</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mp-legal-box">
            <div className="mp-legal-copy">
              <strong>Cancellation + refund terms</strong>
              <span>
                Cancel renewal here anytime before the next billing cycle. Cancellation stops future recurring billing; current paid access stays available through the paid period unless applicable law or our refund review requires otherwise.
              </span>
            </div>
            <div className="mp-legal-links" aria-label="Legal and commerce policy links">
              <Link href="/refund-policy">Refund policy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/legal">Business info</Link>
            </div>
          </div>
        </section>

        {/* Past-cycle banner: any exam date in the past gets a one-tap
            "rebuild on this year's catalog dates" affordance. */}
        {plan.exam_selections.some((e) => daysUntil(primaryDate(e)) < 0) && (
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
              const da = daysUntil(primaryDate(a));
              const db = daysUntil(primaryDate(b));
              const pa = da < 0, pb = db < 0;
              if (pa && !pb) return 1;
              if (!pa && pb) return -1;
              return da - db;
            })
            .map((exam) => {
              const catalog = findExam(exam.slug);
              const finishISO = primaryDate(exam);
              const days = daysUntil(finishISO);
              const state = classifyCountdown(days);
              const hasExamDate = !!exam.exam_date;
              const p = pal(catalog?.accent ?? "slate");
              const totalCh = exam.total_chapters ?? 0;
              const completedCh = 0; // TODO: real progress when student_chapter_progress is hot
              const pct = totalCh > 0 ? Math.round((completedCh / totalCh) * 100) : 0;
              // Countdown card → course page. Uses catalog.textbook_course_slug
              // (e.g. "ap-bio") which resolveCourseId aliases to the canonical
              // courses entry. Only Common App / Supps / Interview style
              // college-app exams have no course; those stay as plain divs.
              const courseHref = catalog?.textbook_course_slug
                ? `/courses/${catalog.textbook_course_slug}`
                : null;
              const cardInner = (
                <>
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
                    <div className="mp-count-meta">
                      Finish by {new Date(finishISO).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {hasExamDate && exam.exam_date && (
                        <>
                          {" · "}
                          <span className="mp-count-meta-sub">
                            Exam {new Date(exam.exam_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </>
              );
              return courseHref ? (
                <Link
                  key={exam.slug}
                  href={courseHref}
                  className={`mp-count-card mp-count-card-link mp-state-${state}`}
                >
                  {cardInner}
                </Link>
              ) : (
                <div key={exam.slug} className={`mp-count-card mp-state-${state}`}>
                  {cardInner}
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
                      const catalog = findExam(b.subject_slug);
                      const style = {
                        background: p.chip,
                        borderColor: p.glow.replace("0.28", "0.3"),
                      } as React.CSSProperties;
                      // Primary tap target → textbook chapter reader if the
                      // subject is ap-bio AND a chapter number is on the
                      // block; otherwise the lounge. Pre-existing behavior,
                      // kept so students who clicked the card before still
                      // land where they expected.
                      const blockHref = (() => {
                        if (b.chapter_number && b.subject_slug === "ap-bio") {
                          return `/textbooks/ap-bio-ultimate/${b.chapter_number}`;
                        }
                        if (catalog?.lounge_slug) return `/lounges/${catalog.lounge_slug}`;
                        return null;
                      })();
                      // Secondary pill → course page. Shows only when the
                      // subject has a textbook_course_slug (e.g. ap-bio,
                      // ap-chem). Stops propagation so tapping the pill
                      // doesn't also fire the parent Link's textbook nav.
                      const coursePill = catalog?.textbook_course_slug ? (
                        <Link
                          href={`/courses/${catalog.textbook_course_slug}`}
                          className="mp-block-course"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open ${catalog.short_name ?? b.subject} course`}
                        >
                          Course →
                        </Link>
                      ) : null;
                      const inner = (
                        <>
                          <div className="mp-block-head">
                            <span>{b.subject_emoji}</span>
                            <span className="mp-block-subj">{b.subject}</span>
                            <span className="mp-block-time">{b.duration_min}m</span>
                          </div>
                          <div className="mp-block-act">{b.activity}</div>
                          {coursePill}
                        </>
                      );
                      return blockHref ? (
                        <Link
                          key={i}
                          href={blockHref}
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
  .mp-edit {
    display: inline-flex; align-items: center; gap: 6px;
    margin-left: 6px; vertical-align: middle;
    padding: 8px 18px; border-radius: 999px;
    font-size: 0.95rem; font-weight: 800; letter-spacing: 0.01em;
    color: #0a0a0a; background: #5eead4;
    text-decoration: none; transition: all .12s;
    box-shadow: 0 4px 16px rgba(94,234,212,0.25);
  }
  .mp-edit:hover { background: #6ff0d9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(94,234,212,0.4); }

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

  /* ── Billing controls ───────────────────────────────────────── */
  .mp-billing {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 1.15rem;
    border-radius: 0.9rem;
    border: 1px solid rgba(94,234,212,0.26);
    background:
      radial-gradient(circle at 12% 0%, rgba(94,234,212,0.08), transparent 38%),
      linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012));
    box-shadow: 0 0 0 1px rgba(94,234,212,0.04) inset;
  }
  .mp-billing-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }
  .mp-billing-eyebrow {
    margin-bottom: 0.25rem;
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: #5eead4;
  }
  .mp-billing-link,
  .mp-billing-cta {
    color: #5eead4;
    text-decoration: none;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  .mp-billing-link:hover,
  .mp-billing-cta:hover {
    text-decoration: underline;
  }
  .mp-billing-muted,
  .mp-billing-empty,
  .mp-billing-error {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 1rem;
    border-radius: 0.7rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .mp-billing-muted {
    border: 1px dashed rgba(148,163,184,0.2);
    color: rgba(148,163,184,0.78);
  }
  .mp-billing-empty {
    border: 1px dashed rgba(94,234,212,0.25);
    color: rgba(216,217,230,0.78);
    background: rgba(94,234,212,0.035);
  }
  .mp-billing-empty strong {
    color: #f3f3fb;
  }
  .mp-billing-error {
    border: 1px solid rgba(255,107,91,0.4);
    color: #ffb0a7;
    background: rgba(255,107,91,0.08);
  }
  .mp-billing-error span {
    color: rgba(255,224,220,0.75);
  }
  .mp-subscription-list {
    display: grid;
    gap: 0.75rem;
  }
  .mp-sub-card {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(5,6,16,0.58);
  }
  .mp-sub-card.is-active {
    border-color: rgba(94,234,212,0.35);
    box-shadow: 0 0 20px rgba(94,234,212,0.08);
  }
  .mp-sub-card.is-inactive {
    opacity: 0.74;
  }
  .mp-sub-main {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    min-width: 0;
  }
  .mp-sub-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.55rem;
  }
  .mp-sub-title {
    color: #f3f3fb;
    font-size: 1rem;
    font-weight: 700;
  }
  .mp-sub-status {
    padding: 0.16rem 0.48rem;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.26);
    color: rgba(148,163,184,0.82);
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .mp-sub-status.is-active {
    border-color: rgba(94,234,212,0.45);
    color: #5eead4;
    background: rgba(94,234,212,0.1);
  }
  .mp-sub-scope {
    color: rgba(216,217,230,0.86);
    line-height: 1.45;
  }
  .mp-sub-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem 0.9rem;
    color: rgba(148,163,184,0.72);
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.03em;
  }
  .mp-sub-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 9.5rem;
  }
  .mp-cancel-btn {
    padding: 0.55rem 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(255,107,91,0.55);
    background: rgba(255,107,91,0.09);
    color: #ffb0a7;
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .mp-cancel-btn:hover:not(:disabled) {
    background: rgba(255,107,91,0.16);
    border-color: rgba(255,107,91,0.75);
  }
  .mp-cancel-btn:disabled {
    cursor: default;
    opacity: 0.55;
  }
  .mp-cancelled-note {
    color: rgba(148,163,184,0.72);
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .mp-legal-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .mp-legal-copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 44rem;
    color: rgba(148,163,184,0.78);
    font-size: 0.78rem;
    line-height: 1.55;
  }
  .mp-legal-copy strong {
    color: rgba(216,217,230,0.92);
  }
  .mp-legal-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.5rem 0.75rem;
    min-width: 14rem;
  }
  .mp-legal-links a {
    color: rgba(94,234,212,0.88);
    text-decoration: none;
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
  }
  .mp-legal-links a:hover {
    text-decoration: underline;
  }
  @media (max-width: 760px) {
    .mp-billing-head,
    .mp-sub-card,
    .mp-legal-box {
      flex-direction: column;
      align-items: stretch;
    }
    .mp-sub-actions {
      justify-content: flex-start;
      min-width: 0;
    }
    .mp-legal-links {
      justify-content: flex-start;
      min-width: 0;
    }
  }

  /* ── Countdown strip ────────────────────────────────────────── */
  .mp-counts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 0.85rem;
  }
  /* Phone breakpoint: drop minmax to keep two cards per row at
     375px (instead of a single full-width column of 8 cards). */
  @media (max-width: 520px) {
    .mp-counts { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.55rem; }
    .mp-count-card { padding: 0.85rem 0.85rem 0.8rem; }
    .mp-count-num  { font-size: 2.6rem; }
    .mp-count-label { font-size: 2rem; }
    .mp-count-label-today { font-size: 2.1rem; }
  }
  /* Past-cycle banner reflows on narrow viewports — text + button
     stack with the button full-width so the touch target stays 44px. */
  @media (max-width: 520px) {
    .mp-banner { flex-direction: column; align-items: stretch; gap: 0.7rem; }
    .mp-banner-text { min-width: 0; font-size: 0.85rem; }
    .mp-banner-btn { width: 100%; padding: 0.75rem 1rem; }
  }
  .mp-count-card {
    padding: 1.05rem 1.15rem 1rem;
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 0.7rem;
    transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
  }
  .mp-count-card:hover { transform: translateY(-2px); border-color: rgba(94,234,212,0.35); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  .mp-count-card-link { text-decoration: none; color: inherit; cursor: pointer; }
  .mp-count-card-link:hover { border-color: rgba(94,234,212,0.55); box-shadow: 0 10px 36px rgba(0,0,0,0.5), 0 0 16px rgba(94,234,212,0.18); }
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
  .mp-count-meta-sub {
    color: rgba(148,163,184,0.5);
    font-size: 0.65rem;
  }

  /* ── TODAY block (prominent, above the weekly grid) ────────── */
  .mp-today-block {
    padding: 1.15rem 1.2rem 1.3rem;
    border-radius: 0.85rem;
    border: 1px solid rgba(94,234,212,0.32);
    background: linear-gradient(180deg, rgba(94,234,212,0.07), rgba(94,234,212,0.015));
    box-shadow: 0 0 0 1px rgba(94,234,212,0.05) inset;
  }
  .mp-today-head {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 1rem;
  }
  .mp-today-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #5eead4;
    text-shadow: 0 0 10px rgba(94,234,212,0.4);
  }
  .mp-today-count {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: rgba(94,234,212,0.7);
  }
  .mp-today-empty {
    font-size: 0.92rem;
    color: rgba(148,163,184,0.65);
    padding: 1.5rem 0;
    text-align: center;
    font-family: ui-monospace, monospace;
    letter-spacing: 0.04em;
  }
  .mp-today-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
    gap: 0.75rem;
  }
  .mp-today-card {
    display: flex; flex-direction: column;
    padding: 1rem 1.05rem 1.05rem;
    border: 1px solid;
    border-radius: 0.65rem;
    gap: 0.55rem;
  }
  .mp-today-card-head {
    display: flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, monospace;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.05em;
  }
  .mp-today-card-emoji { font-size: 1.15rem; line-height: 1; }
  .mp-today-card-subj { flex: 1; color: rgba(216,217,230,0.96); }
  .mp-today-card-time { color: rgba(148,163,184,0.78); font-weight: 500; }
  .mp-today-card-act {
    font-size: 1rem;
    line-height: 1.45;
    color: rgba(216,217,230,0.95);
  }
  .mp-today-card-cta {
    align-self: flex-start;
    margin-top: 0.4rem;
    padding: 0.45rem 0.95rem;
    border-radius: 0.4rem;
    background: rgba(94,234,212,0.18);
    border: 1px solid rgba(94,234,212,0.45);
    color: #5eead4;
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-decoration: none;
    transition: background 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
  }
  .mp-today-card-cta:hover {
    background: rgba(94,234,212,0.32);
    border-color: rgba(94,234,212,0.65);
    transform: translateY(-1px);
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
  .mp-block-course {
    display: inline-flex;
    align-self: flex-start;
    margin-top: 0.25rem;
    padding: 0.15rem 0.45rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(94,234,212,0.35);
    background: rgba(94,234,212,0.08);
    color: #5eead4;
    font-family: ui-monospace, monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-decoration: none;
    transition: background 0.15s, border-color 0.15s, transform 0.15s;
  }
  .mp-block-course:hover {
    background: rgba(94,234,212,0.18);
    border-color: rgba(94,234,212,0.6);
    transform: translateY(-1px);
  }
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
