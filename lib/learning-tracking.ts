import { createAdminClient } from "@/lib/supabase";

export type LessonLocale = "en" | "ko";

export type LearningEventType =
  | "session_started"
  | "section_completed"
  | "overlay_submitted"
  | "question_answered"
  | "chat_message_sent"
  | "lesson_exited"
  | "replay_signal"
  | "skip_signal";

export interface LearningEventV1Input {
  schemaVersion?: 1;
  dedupeKey?: string | null;
  sessionId?: string | null;
  courseId?: string | null;
  subjectId?: string | null;
  unitId?: string | null;
  lessonId: string;
  lessonLocale?: LessonLocale | string | null;
  sectionKey?: string | null;
  eventType: LearningEventType;
  overlayId?: string | null;
  conceptName?: string | null;
  gapType?: string | null;
  correct?: boolean | null;
  score?: number | null;
  valueNum?: number | null;
  valueText?: string | null;
  payload?: Record<string, unknown> | null;
  clientTs?: string | null;
}

export interface LessonSessionSummaryV1Input {
  schemaVersion?: 1;
  sessionId: string;
  courseId?: string | null;
  subjectId?: string | null;
  unitId?: string | null;
  lessonId: string;
  lessonLocale?: LessonLocale | string | null;
  startedAt: string;
  endedAt?: string | null;
  watchSeconds?: number | null;
  pausePointsSec?: number[] | null;
  replayRanges?: Array<{ from: number; to: number; sectionKey?: string | null }> | null;
  completedSections?: string[] | null;
  wrongCount?: number | null;
  chatCount?: number | null;
  overlayCount?: number | null;
  dropoffSection?: string | null;
  exitReason?: string | null;
}

interface PersistLearningEventArgs {
  userId: string;
  event: LearningEventV1Input;
}

interface PersistSessionArgs {
  userId: string;
  session: LessonSessionSummaryV1Input;
}

const TEXT_LIMIT = 500;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string | null | undefined): value is string {
  return !!value && UUID_RE.test(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function normalizeText(value?: string | null, limit = TEXT_LIMIT): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return null;
  return normalized.slice(0, limit);
}

function normalizeLocale(value?: string | null): LessonLocale {
  return value === "ko" ? "ko" : "en";
}

function uniqStrings(values: (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const normalized = normalizeText(value, 120);
    if (!normalized) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

export function inferCourseIdFromLessonId(lessonId: string): string | null {
  const normalized = normalizeText(lessonId, 160);
  if (!normalized) return null;
  const match = normalized.match(/^(.*?)-u\d+(?:-l\d+.*)?$/i);
  return match?.[1] ?? null;
}

function buildFallbackDedupeKey(userId: string, event: LearningEventV1Input): string {
  const base = [
    userId,
    event.lessonId,
    event.eventType,
    event.sectionKey ?? "",
    event.overlayId ?? "",
    event.conceptName ?? "",
    event.clientTs ?? "",
  ];
  return base.join(":");
}

function isMissingTableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /relation .* does not exist/i.test(error.message);
}

function isDuplicateError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /duplicate key/i.test(error.message);
}

async function computeCompletionPct(
  userId: string,
  courseId: string | null,
  subjectId: string
): Promise<number> {
  const supabase = createAdminClient();

  const completedLessonsQuery = supabase
    .from("learning_events")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("subject_id", subjectId)
    .eq("event_type", "section_completed");

  const { data: completedRows } = await completedLessonsQuery;
  const completedLessons = new Set((completedRows ?? []).map((row) => row.lesson_id).filter(Boolean));

  if (!courseId) return 0;

  const { count } = await supabase
    .from("lessons")
    .select("id", { count: "exact", head: true })
    .eq("course_id", courseId);

  if (!count || count <= 0) return 0;
  return round2((completedLessons.size / count) * 100);
}

async function upsertConceptMasteryFromEvent(userId: string, event: LearningEventV1Input) {
  const conceptName = normalizeText(event.conceptName, 180);
  const subjectId = normalizeText(event.subjectId, 120) ?? inferCourseIdFromLessonId(event.lessonId);
  if (!conceptName || !subjectId) return;

  const relevantEvent =
    event.eventType === "question_answered" || event.eventType === "overlay_submitted";
  if (!relevantEvent) return;

  const supabase = createAdminClient();
  const { data: current } = await supabase
    .from("student_concept_mastery")
    .select("*")
    .eq("user_id", userId)
    .eq("subject_id", subjectId)
    .eq("concept_name", conceptName)
    .maybeSingle();

  const prevAttempts = current?.attempt_count ?? 0;
  const prevCorrect = current?.correct_count ?? 0;
  const prevWrong = current?.wrong_count ?? 0;
  const prevAvgScore = typeof current?.avg_score === "number" ? current.avg_score : null;
  const prevStreak = current?.current_correct_streak ?? 0;

  const nextAttempts = prevAttempts + 1;
  const nextCorrect = prevCorrect + (event.correct === true ? 1 : 0);
  const nextWrong = prevWrong + (event.correct === false ? 1 : 0);
  const nextStreak = event.correct === true ? prevStreak + 1 : event.correct === false ? 0 : prevStreak;

  const nextAvgScore =
    typeof event.score === "number"
      ? prevAvgScore == null
        ? round2(event.score)
        : round2((prevAvgScore * prevAttempts + event.score) / nextAttempts)
      : prevAvgScore;

  const accuracy = nextAttempts > 0 ? nextCorrect / nextAttempts : 0;
  const streakNorm = clamp(nextStreak / 5, 0, 1);
  const volumeNorm = clamp(nextAttempts / 8, 0, 1);
  const scoreNorm = nextAvgScore != null ? clamp(nextAvgScore / 5, 0, 1) : accuracy;
  const masteryScore = round2(
    100 * (0.45 * accuracy + 0.25 * scoreNorm + 0.15 * streakNorm + 0.15 * volumeNorm)
  );
  const confidenceSignal = round2(100 * (0.6 * scoreNorm + 0.4 * accuracy));
  const recentMissRate = round2(nextAttempts > 0 ? nextWrong / nextAttempts : 0);

  const now = new Date().toISOString();
  const row = {
    user_id: userId,
    subject_id: subjectId,
    concept_name: conceptName,
    attempt_count: nextAttempts,
    correct_count: nextCorrect,
    wrong_count: nextWrong,
    avg_score: nextAvgScore,
    mastery_score: masteryScore,
    confidence_signal: confidenceSignal,
    recent_miss_rate: recentMissRate,
    current_correct_streak: nextStreak,
    last_gap_type: normalizeText(event.gapType, 80),
    last_seen_lesson_id: event.lessonId,
    first_seen_at: current?.first_seen_at ?? now,
    last_seen_at: now,
    updated_at: now,
  };

  const { error } = await supabase
    .from("student_concept_mastery")
    .upsert(row, { onConflict: "user_id,subject_id,concept_name" });

  if (error) throw new Error(error.message);
}

async function recomputeStudentPathState(userId: string, subjectId: string, courseId: string | null) {
  const supabase = createAdminClient();
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86_400_000).toISOString();
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 86_400_000).toISOString();

  const [
    { data: sessions7 },
    { data: sessions14 },
    { data: events7 },
    { data: events14 },
    { data: weakConcepts },
    { data: strongConcepts },
    { data: existingState },
  ] = await Promise.all([
    supabase
      .from("lesson_sessions")
      .select("lesson_id, started_at, ended_at, completed_sections, dropoff_section, chat_count, replay_ranges")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .gte("started_at", sevenDaysAgo)
      .order("started_at", { ascending: false })
      .limit(200),
    supabase
      .from("lesson_sessions")
      .select("lesson_id, started_at, ended_at, completed_sections, dropoff_section, chat_count, replay_ranges")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .gte("started_at", fourteenDaysAgo)
      .order("started_at", { ascending: false })
      .limit(400),
    supabase
      .from("learning_events")
      .select("lesson_id, event_type, correct, gap_type, concept_name, created_at")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .gte("created_at", sevenDaysAgo)
      .order("created_at", { ascending: false })
      .limit(600),
    supabase
      .from("learning_events")
      .select("lesson_id, event_type, correct, gap_type, concept_name, created_at")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .gte("created_at", fourteenDaysAgo)
      .order("created_at", { ascending: false })
      .limit(1000),
    supabase
      .from("student_concept_mastery")
      .select("concept_name, mastery_score")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .order("mastery_score", { ascending: true })
      .limit(3),
    supabase
      .from("student_concept_mastery")
      .select("concept_name, mastery_score")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .order("mastery_score", { ascending: false })
      .limit(3),
    supabase
      .from("student_path_state")
      .select("*")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .maybeSingle(),
  ]);

  const activityDates = new Set<string>();
  for (const row of [...(sessions7 ?? []), ...(events7 ?? [])]) {
    const ts = "started_at" in row ? row.started_at : row.created_at;
    if (typeof ts === "string") activityDates.add(ts.slice(0, 10));
  }
  const activeDaysNorm = clamp(activityDates.size / 7, 0, 1);

  const sectionsCompleted7 = (events7 ?? []).filter((event) => event.event_type === "section_completed").length;
  const completionSignalNorm = clamp(sectionsCompleted7 / 12, 0, 1);

  const overlayInteractions7 = (events7 ?? []).filter((event) =>
    event.event_type === "overlay_submitted" || event.event_type === "question_answered"
  ).length;
  const overlayParticipationNorm = clamp(
    overlayInteractions7 / Math.max(sectionsCompleted7 || overlayInteractions7, 1),
    0,
    1
  );

  const allActivityDatesDesc = uniqStrings(
    [...(sessions14 ?? [])].map((row) => row.started_at?.slice(0, 10))
  ).sort().reverse();
  let currentStreakDays = 0;
  if (allActivityDatesDesc.length > 0) {
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    for (const day of allActivityDatesDesc) {
      const current = cursor.toISOString().slice(0, 10);
      if (day === current) {
        currentStreakDays += 1;
        cursor = new Date(cursor.getTime() - 86_400_000);
        continue;
      }
      const prev = new Date(cursor.getTime() - 86_400_000).toISOString().slice(0, 10);
      if (day === prev) {
        currentStreakDays += 1;
        cursor = new Date(cursor.getTime() - 86_400_000 * 2);
        continue;
      }
      break;
    }
  }
  const streakNorm = clamp(currentStreakDays / 7, 0, 1);

  const helpSeeking7 = (events7 ?? []).filter((event) =>
    event.event_type === "chat_message_sent" || event.event_type === "replay_signal"
  ).length;
  const helpSeekingNorm = clamp(helpSeeking7 / 5, 0, 1);

  const momentumScore = Math.round(
    100 *
      (0.35 * activeDaysNorm +
        0.25 * completionSignalNorm +
        0.2 * overlayParticipationNorm +
        0.1 * streakNorm +
        0.1 * helpSeekingNorm)
  );

  const scoredEvents14 = (events14 ?? []).filter((event) =>
    event.event_type === "overlay_submitted" || event.event_type === "question_answered"
  );
  const wrongEvents14 = scoredEvents14.filter((event) => event.correct === false);
  const missRate = scoredEvents14.length > 0 ? wrongEvents14.length / scoredEvents14.length : 0;

  const gapCounts: Record<string, number> = {};
  for (const event of wrongEvents14) {
    const gap = normalizeText(event.gap_type, 80);
    if (!gap) continue;
    gapCounts[gap] = (gapCounts[gap] ?? 0) + 1;
  }
  const sortedGaps = Object.entries(gapCounts).sort((a, b) => b[1] - a[1]);
  const repeatGapRatio =
    wrongEvents14.length > 0 && sortedGaps.length > 0
      ? sortedGaps[0][1] / wrongEvents14.length
      : 0;

  const totalSessions14 = (sessions14 ?? []).length;
  const dropoffRate =
    totalSessions14 > 0
      ? (sessions14 ?? []).filter((session) => !!session.dropoff_section).length / totalSessions14
      : 0;

  const replaySignals14 = (events14 ?? []).filter((event) => event.event_type === "replay_signal").length;
  const confusionReplayNorm = clamp(replaySignals14 / Math.max(totalSessions14, 1) / 3, 0, 1);

  const allTimestamps = [
    ...(sessions14 ?? []).map((row) => row.ended_at ?? row.started_at),
    ...(events14 ?? []).map((row) => row.created_at),
  ].filter((value): value is string => typeof value === "string");
  const lastActiveAt = allTimestamps.sort().reverse()[0] ?? existingState?.last_active_at ?? now.toISOString();
  const daysSinceLastActive = Math.max(
    0,
    Math.floor((now.getTime() - new Date(lastActiveAt).getTime()) / 86_400_000)
  );
  const inactivityNorm = clamp(daysSinceLastActive / 7, 0, 1);

  const riskScore = Math.round(
    100 *
      (0.3 * missRate +
        0.2 * repeatGapRatio +
        0.2 * dropoffRate +
        0.15 * confusionReplayNorm +
        0.15 * inactivityNorm)
  );

  const topWeakConcepts = uniqStrings((weakConcepts ?? []).map((row) => row.concept_name)).slice(0, 3);
  const topStrongConcepts = uniqStrings((strongConcepts ?? []).map((row) => row.concept_name)).slice(0, 3);
  const activeGapTypes = sortedGaps.slice(0, 3).map(([gap]) => gap);

  let nextBestAction: string | null = null;
  if (topWeakConcepts[0]) {
    nextBestAction = `Review ${topWeakConcepts[0]} and answer one new AP-style check question.`;
  } else if (riskScore >= 60) {
    nextBestAction = "Replay the last section and explain it back in your own words.";
  } else if (topStrongConcepts[0]) {
    nextBestAction = `Advance your pace and pressure-test ${topStrongConcepts[0]} with a harder question.`;
  } else {
    nextBestAction = "Complete the next section and pause once to explain the mechanism out loud.";
  }

  const latestLessonId =
    normalizeText((events14 ?? [])[0]?.lesson_id, 160) ??
    normalizeText((sessions14 ?? [])[0]?.lesson_id, 160) ??
    existingState?.current_lesson_id ??
    null;

  const latestCompletedLessonId =
    (events14 ?? []).find((event) => event.event_type === "section_completed")?.lesson_id ??
    existingState?.last_completed_lesson_id ??
    null;

  const completionPct =
    courseId != null
      ? await computeCompletionPct(userId, courseId, subjectId)
      : Number(existingState?.completion_pct ?? 0);

  const row = {
    user_id: userId,
    subject_id: subjectId,
    current_course_id: courseId ?? existingState?.current_course_id ?? null,
    current_unit_id: existingState?.current_unit_id ?? null,
    current_lesson_id: latestLessonId,
    last_completed_lesson_id: latestCompletedLessonId,
    last_session_id: existingState?.last_session_id ?? null,
    completion_pct: round2(completionPct),
    momentum_score: momentumScore,
    risk_score: riskScore,
    active_gap_types: activeGapTypes,
    top_weak_concepts: topWeakConcepts,
    top_strong_concepts: topStrongConcepts,
    next_best_action: nextBestAction,
    momentum_factors: {
      activeDays7: activityDates.size,
      sectionsCompleted7,
      overlayInteractions7,
      currentStreakDays,
      helpSeeking7,
    },
    risk_factors: {
      missRate: round2(missRate),
      repeatGapRatio: round2(repeatGapRatio),
      dropoffRate: round2(dropoffRate),
      replaySignals14,
      daysSinceLastActive,
    },
    last_active_at: lastActiveAt,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("student_path_state")
    .upsert(row, { onConflict: "user_id,subject_id" });

  if (error) throw new Error(error.message);
}

export async function persistLearningEventV1({
  userId,
  event,
}: PersistLearningEventArgs): Promise<void> {
  const lessonId = normalizeText(event.lessonId, 160);
  if (!lessonId) throw new Error("lessonId is required");

  const subjectId =
    normalizeText(event.subjectId, 120) ??
    normalizeText(event.courseId, 120) ??
    inferCourseIdFromLessonId(lessonId);
  const courseId =
    normalizeText(event.courseId, 120) ??
    inferCourseIdFromLessonId(lessonId) ??
    subjectId;
  if (!subjectId || !courseId) {
    throw new Error("subjectId/courseId could not be determined");
  }

  const row = {
    schema_version: 1,
    dedupe_key: normalizeText(event.dedupeKey, 220) ?? buildFallbackDedupeKey(userId, event),
    user_id: userId,
    session_id: isUuid(event.sessionId ?? null) ? event.sessionId : null,
    course_id: courseId,
    subject_id: subjectId,
    unit_id: normalizeText(event.unitId, 120),
    lesson_id: lessonId,
    lesson_locale: normalizeLocale(event.lessonLocale),
    section_key: normalizeText(event.sectionKey, 120),
    event_type: event.eventType,
    overlay_id: normalizeText(event.overlayId, 160),
    concept_name: normalizeText(event.conceptName, 180),
    gap_type: normalizeText(event.gapType, 80),
    correct: typeof event.correct === "boolean" ? event.correct : null,
    score: typeof event.score === "number" ? round2(event.score) : null,
    value_num: typeof event.valueNum === "number" ? event.valueNum : null,
    value_text: normalizeText(event.valueText, TEXT_LIMIT),
    payload: event.payload ?? {},
    client_ts: event.clientTs ?? new Date().toISOString(),
  };

  const supabase = createAdminClient();
  const { error } = await supabase.from("learning_events").insert(row);
  if (error) {
    if (error.code === "23505" || isDuplicateError(new Error(error.message))) return;
    throw new Error(error.message);
  }

  await Promise.allSettled([
    upsertConceptMasteryFromEvent(userId, {
      ...event,
      lessonId,
      subjectId,
      courseId,
    }),
    recomputeStudentPathState(userId, subjectId, courseId),
  ]);
}

export async function bestEffortPersistLearningEventV1(args: PersistLearningEventArgs): Promise<void> {
  try {
    await persistLearningEventV1(args);
  } catch (error) {
    if (isMissingTableError(error)) return;
    console.error("[learning-tracking] event", error);
  }
}

export async function upsertLessonSessionSummaryV1({
  userId,
  session,
}: PersistSessionArgs): Promise<void> {
  const lessonId = normalizeText(session.lessonId, 160);
  const sessionId = normalizeText(session.sessionId, 120);
  if (!lessonId || !sessionId || !isUuid(sessionId)) {
    throw new Error("valid lessonId and sessionId are required");
  }

  const subjectId =
    normalizeText(session.subjectId, 120) ??
    normalizeText(session.courseId, 120) ??
    inferCourseIdFromLessonId(lessonId);
  const courseId =
    normalizeText(session.courseId, 120) ??
    inferCourseIdFromLessonId(lessonId) ??
    subjectId;
  if (!subjectId || !courseId) {
    throw new Error("subjectId/courseId could not be determined");
  }

  const pausePoints = (session.pausePointsSec ?? [])
    .filter((value): value is number => typeof value === "number" && value >= 0)
    .map((value) => Math.round(value))
    .slice(0, 8);

  const replayRanges = (session.replayRanges ?? [])
    .filter((value) => typeof value?.from === "number" && typeof value?.to === "number")
    .slice(0, 20)
    .map((value) => ({
      from: round2(value.from),
      to: round2(value.to),
      sectionKey: normalizeText(value.sectionKey, 120),
    }));

  const completedSections = uniqStrings(session.completedSections ?? []).slice(0, 20);

  const row = {
    schema_version: 1,
    session_id: sessionId,
    user_id: userId,
    course_id: courseId,
    subject_id: subjectId,
    unit_id: normalizeText(session.unitId, 120),
    lesson_id: lessonId,
    lesson_locale: normalizeLocale(session.lessonLocale),
    started_at: session.startedAt,
    ended_at: session.endedAt ?? null,
    watch_seconds: Math.max(0, Math.round(session.watchSeconds ?? 0)),
    distinct_pause_count: pausePoints.length,
    pause_points_sec: pausePoints,
    replay_ranges: replayRanges,
    completed_sections: completedSections,
    wrong_count: Math.max(0, Math.round(session.wrongCount ?? 0)),
    chat_count: Math.max(0, Math.round(session.chatCount ?? 0)),
    overlay_count: Math.max(0, Math.round(session.overlayCount ?? 0)),
    dropoff_section: normalizeText(session.dropoffSection, 120),
    exit_reason: normalizeText(session.exitReason, 120),
    updated_at: new Date().toISOString(),
  };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_sessions")
    .upsert(row, { onConflict: "user_id,session_id" });

  if (error) throw new Error(error.message);

  await recomputeStudentPathState(userId, subjectId, courseId);
}

export async function bestEffortUpsertLessonSessionSummaryV1(args: PersistSessionArgs): Promise<void> {
  try {
    await upsertLessonSessionSummaryV1(args);
  } catch (error) {
    if (isMissingTableError(error)) return;
    console.error("[learning-tracking] session", error);
  }
}
