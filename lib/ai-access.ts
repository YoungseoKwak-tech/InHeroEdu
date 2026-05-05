import { PRELAUNCH_MODE } from "@/lib/config";
import { hasAnthropicApiKey } from "@/lib/env";

export type AiAccessStatus = "locked" | "fallback";

export interface AiAccessResponse {
  status: AiAccessStatus;
  message: string;
}

export type AiFeatureKey =
  | "companion"
  | "socratic"
  | "reverse_tutor"
  | "trajectory"
  | "lesson_explain"
  | "thinking_analyzer";

export const FEATURE_TRIAL_LIMITS: Record<AiFeatureKey, number> = {
  companion: 8,
  socratic: 5,
  reverse_tutor: 3,
  trajectory: 2,
  lesson_explain: 8,
  thinking_analyzer: 1,
};

const STORAGE_PREFIX = "inhero_ai_usage";

export const AI_LOCKED_MESSAGE = "This feature is currently rolling out to early users.";
export const AI_FALLBACK_MESSAGE = "We're processing your learning pattern. Results will be available soon.";

export const EARLY_ACCESS_LOADING_MESSAGE = "Analyzing your learning pattern...";
export const EARLY_ACCESS_FALLBACK_MESSAGE = "We're processing your learning pattern. Results will be available soon.";
export const EARLY_ACCESS_CTA_LABEL = "Unlock Strategy";

function getStorageKey(feature: AiFeatureKey) {
  return `${STORAGE_PREFIX}:${feature}`;
}

function getFeatureLabel(feature: AiFeatureKey) {
  switch (feature) {
    case "companion":
      return "Companion";
    case "socratic":
      return "Socratic Mode";
    case "reverse_tutor":
      return "Reverse Tutor";
    case "trajectory":
      return "Trajectory Build";
    case "lesson_explain":
      return "Lesson Explain";
    case "thinking_analyzer":
      return "Thinking Analyzer";
    default:
      return "InHero AI";
  }
}

export function getFeatureLimitMessage(feature: AiFeatureKey): string {
  const limit = FEATURE_TRIAL_LIMITS[feature];
  const label = getFeatureLabel(feature);
  return `⚡ You've used the free ${label} trial.\n\nThat preview included ${limit} free ${limit === 1 ? "run" : "uses"}.\n\nUnlock Strategy to keep building from your pattern.`;
}

export function getFeatureLockedMessage(feature: AiFeatureKey): string {
  const label = getFeatureLabel(feature);
  return `🚧 ${label} is opening in stages.\n\nYou've seen the first layer.\n\nUnlock Strategy to keep going.`;
}

export function getAiRouteGuard(routeName: string): AiAccessResponse | null {
  if (PRELAUNCH_MODE) {
    console.info(`[ai:${routeName}] early access lock: prelaunch mode enabled`);
    return { status: "locked", message: AI_LOCKED_MESSAGE };
  }

  if (!hasAnthropicApiKey()) {
    console.info(`[ai:${routeName}] early access lock: missing ANTHROPIC_API_KEY`);
    return { status: "locked", message: AI_LOCKED_MESSAGE };
  }

  return null;
}

export function getAiFallback(routeName: string, error: unknown): AiAccessResponse {
  console.error(`[ai:${routeName}] rolling out fallback`, error);
  return { status: "fallback", message: AI_FALLBACK_MESSAGE };
}

export function getEarlyAccessDelayMs(): number {
  return 1200 + Math.floor(Math.random() * 801);
}

export function getEarlyAccessUsageCount(feature: AiFeatureKey): number {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(getStorageKey(feature)) ?? "0");
}

export function hasReachedEarlyAccessLimit(feature: AiFeatureKey): boolean {
  return getEarlyAccessUsageCount(feature) >= FEATURE_TRIAL_LIMITS[feature];
}

export function incrementEarlyAccessUsage(feature: AiFeatureKey): number {
  if (typeof window === "undefined") return 0;
  const next = getEarlyAccessUsageCount(feature) + 1;
  window.localStorage.setItem(getStorageKey(feature), String(next));
  return next;
}
