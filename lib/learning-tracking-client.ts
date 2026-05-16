"use client";

import { authFetch } from "@/lib/client-auth";
import type {
  LearningEventV1Input,
  LessonSessionSummaryV1Input,
} from "@/lib/learning-tracking";

export async function trackLearningEventV1(event: LearningEventV1Input): Promise<void> {
  const res = await authFetch("/api/learning-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    throw new Error(`Failed to track learning event (${res.status})`);
  }
}

export async function flushLessonSessionV1(session: LessonSessionSummaryV1Input): Promise<void> {
  const res = await authFetch("/api/lesson-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(session),
  });

  if (!res.ok) {
    throw new Error(`Failed to save lesson session (${res.status})`);
  }
}
