/**
 * GET /api/question-bank/bank
 *   ?subject=ap-biology   filter by course id (optional)
 *   ?unit=3               filter by unit number within the subject (optional)
 *   ?countOnly=true       return per-subject counts only
 *
 * Serves the aggregated bank built from lesson overlays + the admin
 * questions table (see lib/questionBank). Every signed-in student sees all
 * subjects with counts and gets a couple of free questions per subject to
 * try; beyond that, unpaid subjects come back locked — prompt/options only,
 * with correct flags, feedback, explanations, and the similar-variant
 * stripped server-side so the paywall can't be read out of devtools.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  getPaidSubjectAccessIds,
  hasPaidSubjectAccess,
} from "@/lib/paid-subject-access";
import {
  buildBankQuestions,
  type BankOption,
  type BankQuestion,
} from "@/lib/questionBank";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";
import precomputedSubjects from "@/lib/data/precomputed/questionBankSubjects.json";
import precomputedPreview from "@/lib/data/precomputed/questionBankPreview.json";

export const dynamic = "force-dynamic";

// The page only renders the first ~150 cards; sending all ~2,200 questions
// (multi-MB JSON) is what made the response slow. Cap the payload and
// return the true `total` so the UI can still say "showing N of M".
const DEFAULT_LIMIT = 150;
const MAX_LIMIT = 400;

// No free questions by default: every MCQ's answers/explanations require paid
// access. Locked cards still show the prompt as a teaser, but never the answer
// key. The /parents surface opts into a small lead-magnet taste via ?preview=N.
const FREE_PREVIEW_PER_SUBJECT = 0;
// First N per subject are a free sample; everything after is paid/locked.
const MAX_PREVIEW_PER_SUBJECT = 10;

// Credit-unlock keys (CreditGate on /parents/question-bank). The all-pass key
// unlocks every subject; the per-subject key is `${ALL_KEY}:${courseId}`.
// Unlocking with credits must grant the full answerable payload the same way a
// paid subject order does — otherwise unlocked parents still get locked cards.
const QBANK_ALL_KEY = "parents:question-bank";
const subjectUnlockKey = (courseId: string | null) =>
  courseId ? `${QBANK_ALL_KEY}:${courseId}` : null;

interface PreviewQuestion {
  id: string;
  subjectLabel: string;
  emoji: string;
  unit: number | null;
  prompt: string;
  options: BankOption[];
  explanation?: string | null;
  explanationKorean?: string | null;
  similar?: BankQuestion["similar"];
}

interface PreviewEntry {
  label: string;
  emoji: string;
  total: number;
  units: { unit: number; count: number }[];
  questions: PreviewQuestion[];
}

const previewBySubject = precomputedPreview as Record<string, PreviewEntry | undefined>;

/** Strip everything a student could use to answer or learn from. */
function lockQuestion<T extends {
  options: BankOption[];
  explanation?: string | null;
  explanationKorean?: string | null;
  similar?: BankQuestion["similar"];
}>(q: T): T & { locked: true } {
  return {
    ...q,
    locked: true,
    options: q.options.map((o) => ({ label: o.label, correct: false })),
    explanation: null,
    explanationKorean: null,
    similar: null,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")?.trim() || undefined;
    const countOnly = searchParams.get("countOnly") === "true";

    if (countOnly) {
      // Subject grid: served from the build-time precomputed snapshot instead
      // of building the ~170k-question bank on a cold start (which left the
      // grid blank for ~12s). Counts only change on deploy. No auth needed —
      // visibility is public; the lock happens on the question payload.
      return NextResponse.json(precomputedSubjects, {
        headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400" },
      });
    }

    // Anonymous visitors can browse: every subject's counts plus a couple of
    // free questions each. Signed-in students additionally unlock the subjects
    // in their paid plan. No auth → no paid access (empty set), not a 401.
    const user = await getAuthenticatedUser(req);
    const accessIds = user ? await getPaidSubjectAccessIds(user) : new Set<string>();
    // Credit unlocks (the /parents portal) grant access the same as a paid
    // order. all-pass → everything; per-subject key → that subject only.
    const unlockCtx = user ? await getUnlockContext(req) : null;
    const hasAllPass = !!unlockCtx && hasAnyUnlock(unlockCtx, [QBANK_ALL_KEY]);
    const courseUnlocked = (courseId: string | null) => {
      if (hasPaidSubjectAccess(accessIds, courseId)) return true;
      if (hasAllPass) return true;
      const key = subjectUnlockKey(courseId);
      return !!key && !!unlockCtx && hasAnyUnlock(unlockCtx, [key]);
    };

    // /parents lead-magnet taste: a few answerable questions per subject even
    // without access. Opt-in via ?preview=N so the cosmic /question-bank stays
    // fully locked (FREE_PREVIEW_PER_SUBJECT = 0).
    const previewParam = parseInt(searchParams.get("preview") ?? "", 10);
    const freePerSubject = Number.isFinite(previewParam) && previewParam > 0
      ? Math.min(MAX_PREVIEW_PER_SUBJECT, previewParam)
      : FREE_PREVIEW_PER_SUBJECT;

    const limitParam = parseInt(searchParams.get("limit") ?? "", 10);
    const limit = Math.min(
      MAX_LIMIT,
      Number.isFinite(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT
    );
    const unitParam = parseInt(searchParams.get("unit") ?? "", 10);

    // Fast path for the parent portal's locked browse: serve a build-time
    // preview snapshot instead of building the full ~170k-question pool on a
    // cold start. Paid/credit-unlocked requests and unit-filtered requests still
    // use the live builder so they receive the complete, exact payload.
    if (subject && freePerSubject > 0 && !Number.isFinite(unitParam) && !courseUnlocked(subject)) {
      const preview = previewBySubject[subject];
      if (preview) {
        let freeUsed = 0;
        const questions = preview.questions.slice(0, limit).map((q) => {
          const withCourse = { ...q, courseId: subject };
          if (freeUsed < freePerSubject) {
            freeUsed += 1;
            return withCourse;
          }
          return lockQuestion(withCourse);
        });

        return NextResponse.json(
          {
            questions,
            total: preview.total,
            units: preview.units,
          },
          { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } }
        );
      }
    }

    // Filter by the RAW bank course id. buildBankQuestions normalizes/falls back
    // internally; passing the access-normalized id (which is null for bank-only
    // subjects like ap-biology) would drop the filter and leak every subject.
    const allInSubject = await buildBankQuestions(subject);

    // Per-unit counts for the subject (pre-unit-filter) so the page's unit
    // rail can show every unit with its full count regardless of the active
    // unit tab. Questions without a unit fall under the "All units" tab only.
    const unitCountMap = new Map<number, number>();
    for (const q of allInSubject) {
      if (q.unit != null) unitCountMap.set(q.unit, (unitCountMap.get(q.unit) ?? 0) + 1);
    }
    const units = [...unitCountMap.entries()]
      .map(([unit, count]) => ({ unit, count }))
      .sort((a, b) => a.unit - b.unit);

    const questions = Number.isFinite(unitParam)
      ? allInSubject.filter((q) => q.unit === unitParam)
      : allInSubject;

    // Accessible subjects (paid order OR credit unlock) come through untouched.
    // For everything else the first few questions per subject stay answerable as
    // a free taste (when ?preview=N) and the rest go out locked (no
    // answers/explanations in the payload).
    const freeUsed = new Map<string, number>();
    const shaped = questions.slice(0, limit).map((q) => {
      if (courseUnlocked(q.courseId)) return q;
      const key = q.courseId ?? "general";
      const used = freeUsed.get(key) ?? 0;
      if (used < freePerSubject) {
        freeUsed.set(key, used + 1);
        return q;
      }
      return lockQuestion(q);
    });
    // Cap the payload — the page only renders the first ~150 cards — but
    // report the true total so the UI can still say "showing N of M".
    return NextResponse.json({
      questions: shaped,
      total: questions.length,
      units,
    });
  } catch (e) {
    console.error("[question-bank/bank]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
