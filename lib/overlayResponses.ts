/**
 * Overlay Responses — server-side writes via admin client.
 * Feeds into the student's cognitive fingerprint.
 */

import { createAdminClient } from "@/lib/supabase";

export interface LogOverlayResponseData {
  studentId: string;
  lessonId: string;
  subjectId?: string | null;
  overlayId: string | null;
  overlayType: string;
  conceptName?: string | null;
  response: string | null;
  score: number | null;
  correct: boolean | null;
  gapType: string | null;
  questionIdx?: number | null;
}

export async function logOverlayResponse(data: LogOverlayResponseData): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("overlay_responses").insert({
    student_id:   data.studentId,
    lesson_id:    data.lessonId,
    subject_id:   data.subjectId ?? null,
    overlay_id:   data.overlayId ?? null,
    overlay_type: data.overlayType,
    concept_name: data.conceptName ?? null,
    response:     data.response ?? null,
    score:        data.score ?? null,
    correct:      data.correct ?? null,
    gap_type:     data.gapType ?? null,
    question_idx: data.questionIdx ?? null,
  });
  if (error) throw new Error(error.message);
}

/**
 * Extract the concept name from an overlay's data payload.
 * Checks fields in order of specificity across all overlay types.
 */
export function extractConceptName(
  overlayType: string,
  data: Record<string, unknown>
): string | null {
  // Type-specific primary field
  const candidates: (keyof typeof data)[] = [
    "conceptUnlocked",  // spark
    "targetConcept",    // teach_back
    "concept",          // generic
    "headline",         // gap_crunch fallback
  ];
  for (const key of candidates) {
    const val = data[key];
    if (typeof val === "string" && val.trim()) return val.trim();
  }
  return null;
}
