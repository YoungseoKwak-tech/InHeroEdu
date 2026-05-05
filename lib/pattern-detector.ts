/**
 * Pattern Detector
 *
 * Runs after every overlay submission to detect learning patterns,
 * update student_stats, and write to learning_logs.
 */

import { createAdminClient } from "@/lib/supabase";

export type PatternType =
  | "REPEAT_ERROR"
  | "SPEED_SKIP"
  | "CROSS_SUBJECT_GAP"
  | "CONCEPT_GAP"
  | "LANGUAGE_GAP"
  | "LOGIC_GAP";

interface SavePatternArgs {
  userId: string;
  patternType: PatternType;
  gapType?: string | null;
  subject?: string | null;
  lessonId?: string | null;
  description: string;
}

// ── helpers ────────────────────────────────────────────────

async function getRecentErrors(userId: string, limit: number) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("gap_type, subject")
    .eq("user_id", userId)
    .eq("is_correct", false)
    .not("gap_type", "is", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

async function getCrossSubjectGaps(userId: string, gapType: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("subject")
    .eq("user_id", userId)
    .eq("gap_type", gapType)
    .eq("is_correct", false)
    .not("subject", "is", null);

  if (!data) return [];
  const seen = new Set<string>();
  const uniqueSubjects: string[] = [];
  for (const r of data) {
    if (r.subject && !seen.has(r.subject)) { seen.add(r.subject); uniqueSubjects.push(r.subject); }
  }
  return uniqueSubjects;
}

async function savePattern(args: SavePatternArgs) {
  const supabase = createAdminClient();

  // Upsert: if the same pattern_type + gap_type already exists for this user
  // and is not resolved, increment occurrence_count and update last_detected.
  const { data: existing } = await supabase
    .from("student_patterns")
    .select("id, occurrence_count")
    .eq("user_id", args.userId)
    .eq("pattern_type", args.patternType)
    .eq("gap_type", args.gapType ?? "")
    .eq("is_resolved", false)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("student_patterns")
      .update({
        occurrence_count: existing.occurrence_count + 1,
        last_detected: new Date().toISOString(),
        description: args.description,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("student_patterns").insert({
      user_id: args.userId,
      pattern_type: args.patternType,
      gap_type: args.gapType ?? null,
      subject: args.subject ?? null,
      lesson_id: args.lessonId ?? null,
      description: args.description,
    });

    // Increment concept_gaps_detected counter in student_stats (best-effort)
    try {
      const { data: statsRow } = await supabase
        .from("student_stats")
        .select("concept_gaps_detected")
        .eq("user_id", args.userId)
        .maybeSingle();
      if (statsRow) {
        await supabase
          .from("student_stats")
          .update({ concept_gaps_detected: statsRow.concept_gaps_detected + 1 })
          .eq("user_id", args.userId);
      }
    } catch {
      // Non-blocking
    }
  }
}

async function createLog(
  userId: string,
  logType: string,
  content: string,
  metadata: Record<string, unknown> = {}
) {
  const supabase = createAdminClient();
  await supabase.from("learning_logs").insert({
    user_id: userId,
    log_type: logType,
    content,
    metadata,
  });
}

async function upsertStats(userId: string, isCorrect: boolean) {
  const supabase = createAdminClient();

  // Fetch current stats row
  const { data: current } = await supabase
    .from("student_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const now = new Date().toISOString();
  const today = new Date().toDateString();

  if (!current) {
    // First interaction — create row
    await supabase.from("student_stats").insert({
      user_id: userId,
      total_questions_answered: 1,
      total_correct: isCorrect ? 1 : 0,
      current_streak: 1,
      longest_streak: 1,
      last_active: now,
    });
    return;
  }

  // Streak logic: increment if last_active was today or yesterday
  const lastActive = new Date(current.last_active);
  const diffDays = Math.floor(
    (new Date().setHours(0, 0, 0, 0) - lastActive.setHours(0, 0, 0, 0)) /
      86_400_000
  );
  const newStreak =
    diffDays === 0
      ? current.current_streak
      : diffDays === 1
      ? current.current_streak + 1
      : 1;

  await supabase
    .from("student_stats")
    .update({
      total_questions_answered: current.total_questions_answered + 1,
      total_correct: current.total_correct + (isCorrect ? 1 : 0),
      current_streak: newStreak,
      longest_streak: Math.max(current.longest_streak, newStreak),
      last_active: now,
    })
    .eq("user_id", userId);

  // Log streak milestone
  if (newStreak > 0 && newStreak % 7 === 0) {
    await createLog(userId, "STREAK", `${newStreak}-day study streak`, {
      streak: newStreak,
    });
  }
}

// ── main export ────────────────────────────────────────────

export async function detectPattern(
  userId: string,
  lessonId: string,
  overlayType: string,
  isCorrect: boolean,
  gapType: string | null,
  timeSpent: number,
  subject?: string | null
) {
  // Run detection and stat update concurrently; never throw to caller.
  try {
    await Promise.all([
      runDetection(userId, lessonId, overlayType, isCorrect, gapType, timeSpent, subject),
      upsertStats(userId, isCorrect),
    ]);
  } catch (err) {
    console.error("[pattern-detector]", err);
  }
}

async function runDetection(
  userId: string,
  lessonId: string,
  overlayType: string,
  isCorrect: boolean,
  gapType: string | null,
  timeSpent: number,
  subject?: string | null
) {
  const promises: Promise<void>[] = [];

  // ── 1. REPEAT_ERROR ────────────────────────────────────
  // Same gap_type on the last 3 consecutive wrong answers
  if (!isCorrect && gapType) {
    promises.push(
      (async () => {
        const recentErrors = await getRecentErrors(userId, 3);
        if (
          recentErrors.length === 3 &&
          recentErrors.every((e) => e.gap_type === gapType)
        ) {
          await savePattern({
            userId,
            patternType: "REPEAT_ERROR",
            gapType,
            subject,
            lessonId,
            description: `Repeated ${gapType} across 3 consecutive questions`,
          });
          await createLog(
            userId,
            "GAP_DETECTED",
            `REPEAT_ERROR: ${gapType} appeared 3 times in a row`,
            { gapType, lessonId }
          );
        }
      })()
    );
  }

  // ── 2. SPEED_SKIP ──────────────────────────────────────
  // Teach Back completed in < 10 seconds
  if (overlayType === "TEACH_BACK" && timeSpent < 10) {
    promises.push(
      (async () => {
        await savePattern({
          userId,
          patternType: "SPEED_SKIP",
          gapType: null,
          subject,
          lessonId,
          description: `Teach Back completed in ${timeSpent}s — likely not processing`,
        });
        await createLog(
          userId,
          "GAP_DETECTED",
          `SPEED_SKIP: Teach Back answered in ${timeSpent}s`,
          { overlayType, timeSpent, lessonId }
        );
      })()
    );
  }

  // ── 3. CROSS_SUBJECT_GAP ───────────────────────────────
  // Same gap_type appearing in 2+ different subjects
  if (!isCorrect && gapType) {
    promises.push(
      (async () => {
        const subjects = await getCrossSubjectGaps(userId, gapType);
        if (subjects.length >= 2) {
          await savePattern({
            userId,
            patternType: "CROSS_SUBJECT_GAP",
            gapType,
            subject,
            lessonId,
            description: `${gapType} appearing in ${subjects.join(" and ")} — foundational gap`,
          });
          await createLog(
            userId,
            "GAP_DETECTED",
            `CROSS_SUBJECT_GAP: ${gapType} in ${subjects.join(", ")}`,
            { gapType, subjects, lessonId }
          );
        }
      })()
    );
  }

  // ── 4. Direct gap-type pattern ─────────────────────────
  // Save a CONCEPT/LANGUAGE/LOGIC pattern on first detection
  if (!isCorrect && gapType) {
    const directPatternType = gapType as PatternType;
    const validDirect: PatternType[] = ["CONCEPT_GAP", "LANGUAGE_GAP", "LOGIC_GAP"];
    if (validDirect.includes(directPatternType)) {
      promises.push(
        savePattern({
          userId,
          patternType: directPatternType,
          gapType,
          subject,
          lessonId,
          description: `${gapType} detected in lesson`,
        })
      );
    }
  }

  // ── 5. Log every submission ────────────────────────────
  promises.push(
    createLog(
      userId,
      isCorrect ? "CORRECT" : "GAP_DETECTED",
      isCorrect
        ? `Correct answer on ${overlayType}`
        : `Gap detected: ${gapType ?? "unknown"} on ${overlayType}`,
      { lessonId, overlayType, gapType, isCorrect, timeSpent }
    )
  );

  await Promise.all(promises);
}

// ── Resolve a pattern (called from UI or after correct streak) ─

export async function resolvePattern(patternId: string, userId: string) {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("student_patterns")
    .update({ is_resolved: true })
    .eq("id", patternId)
    .eq("user_id", userId)
    .select("pattern_type, gap_type")
    .maybeSingle();

  if (data) {
    // Increment resolved counter
    const { data: stats } = await supabase
      .from("student_stats")
      .select("concept_gaps_resolved")
      .eq("user_id", userId)
      .maybeSingle();

    if (stats) {
      await supabase
        .from("student_stats")
        .update({ concept_gaps_resolved: stats.concept_gaps_resolved + 1 })
        .eq("user_id", userId);
    }

    await createLog(
      userId,
      "PATTERN_RESOLVED",
      `Resolved: ${data.pattern_type} — ${data.gap_type ?? ""}`,
      { patternId, patternType: data.pattern_type }
    );
  }
}

// ── Mark lesson complete ───────────────────────────────────

export async function markLessonComplete(
  userId: string,
  lessonId: string,
  lessonTitle: string,
  subject: string
) {
  const supabase = createAdminClient();

  // Increment lessons_completed
  const { data: stats } = await supabase
    .from("student_stats")
    .select("lessons_completed")
    .eq("user_id", userId)
    .maybeSingle();

  if (stats) {
    await supabase
      .from("student_stats")
      .update({ lessons_completed: stats.lessons_completed + 1 })
      .eq("user_id", userId);
  } else {
    await supabase.from("student_stats").insert({
      user_id: userId,
      lessons_completed: 1,
    });
  }

  await createLog(userId, "LESSON_COMPLETE", `Completed: ${lessonTitle}`, {
    lessonId,
    subject,
  });
}
