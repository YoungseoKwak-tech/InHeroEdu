export const AI_MODELS = {
  overlayGeneration: "claude-opus-4-6",
  companionResponse: "claude-haiku-4-5-20251001",
  companionProfileExtraction: "claude-sonnet-4-6",
  socraticResponse: "claude-sonnet-4-6",
  socraticAnalysis: "claude-sonnet-4-6",
  reverseTutorLive: "claude-haiku-4-5-20251001",
  reverseTutorAnalysis: "claude-sonnet-4-6",
  lessonExplainFast: "claude-haiku-4-5-20251001",
  lessonExplainDeep: "claude-sonnet-4-6",
  thinkingAnalyzer: "claude-sonnet-4-6",
  memoryCompression: "claude-sonnet-4-6",
  trajectoryAnalyze: "claude-sonnet-4-6",
  trajectoryBuild: "claude-sonnet-4-6",
  trajectoryChat: "claude-sonnet-4-6",
  trajectoryScaffold: "claude-haiku-4-5-20251001",
} as const;

export function getLessonExplainModel(mode: string) {
  return mode === "default" ? AI_MODELS.lessonExplainFast : AI_MODELS.lessonExplainDeep;
}
