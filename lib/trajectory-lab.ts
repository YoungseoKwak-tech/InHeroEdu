export type TrajectoryFormat = "app" | "web" | "research" | "initiative" | "toolkit";

export interface TrajectoryAnalyzeRequest {
  keywords?: string[];
  conversationSummary?: string;
  activities?: string[];
  interests?: string[];
  strengths?: string[];
  frictions?: string[];
  heroCode?: string;
  portraitSignals?: string[];
  lang?: "ko" | "en";
}

export interface TrajectoryAnalyzeResponse {
  signalSummary: string[];
  trajectory: string;
  buildDirection: string;
  recommendedFormat: TrajectoryFormat;
  suggestedProjectTypes: string[];
  mvpConcept: {
    name: string;
    oneLiner: string;
    targetUser: string;
    coreProblem: string;
  };
}

export interface TrajectoryBuildRequest {
  trajectory: string;
  buildDirection: string;
  recommendedFormat: TrajectoryFormat;
  signalSummary?: string[];
  suggestedProjectTypes?: string[];
  mvpConcept: {
    name: string;
    oneLiner: string;
    targetUser: string;
    coreProblem: string;
  };
  lang?: "ko" | "en";
}

export interface TrajectoryBuildResponse {
  productName: string;
  tagline: string;
  format: TrajectoryFormat;
  audience: string;
  problemStatement: string;
  coreFeatures: string[];
  userFlow: string[];
  mvpScope: string[];
  launchCopy: {
    hero: string;
    sub: string;
    cta: string;
  };
}

export interface TrajectoryScaffoldRequest {
  productName: string;
  tagline: string;
  format: TrajectoryFormat;
  audience: string;
  problemStatement: string;
  coreFeatures: string[];
  userFlow: string[];
  mvpScope: string[];
  launchCopy: {
    hero: string;
    sub: string;
    cta: string;
  };
}

export interface TrajectoryScaffoldResponse {
  template: string;
  pages: string[];
  components: string[];
  stack: string[];
  contentBlocks: {
    hero: string;
    problem: string;
    features: string[];
  };
  nextStep: "ready_for_build";
}

export interface TrajectoryDeployRequest {
  productName: string;
  format: TrajectoryFormat;
  template: string;
}

export interface TrajectoryDeployResponse {
  status: "deployment_spec_ready" | "deployment_created";
  host: string;
  previewSlug: string;
  recommendedCommand: string;
  checklist: string[];
  previewUrl?: string;
  deploymentId?: string;
}

export const TRAJECTORY_LAB_SAMPLE_INPUT: Required<TrajectoryAnalyzeRequest> = {
  keywords: ["biology", "memory", "bilingual", "student tool"],
  conversationSummary:
    "The student keeps returning to biology-memory links and struggles to explain concepts clearly in English.",
  activities: ["AP Biology", "peer tutoring", "science notes translation"],
  interests: ["learning science", "education", "visual explanation"],
  strengths: ["pattern recognition", "persistence", "curiosity"],
  frictions: ["language transfer", "confidence in explanation"],
  heroCode: "CF",
  portraitSignals: [
    "high concept recall",
    "visual-first explanation",
    "returns after mistakes",
  ],
  lang: "en",
};

export function parseCommaSeparatedInput(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
