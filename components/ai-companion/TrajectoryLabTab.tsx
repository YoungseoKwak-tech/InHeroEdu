"use client";

import { startTransition, useMemo, useState } from "react";
import Link from "next/link";
import { HERO_CODE_META } from "@/lib/hero-codes";
import {
  TRAJECTORY_LAB_SAMPLE_INPUT,
  parseCommaSeparatedInput,
  type TrajectoryAnalyzeRequest,
  type TrajectoryAnalyzeResponse,
  type TrajectoryBuildResponse,
  type TrajectoryScaffoldResponse,
  type TrajectoryDeployResponse,
} from "@/lib/trajectory-lab";

const pipeline = [
  {
    step: "01",
    title: "Pattern Extraction",
    body: "Read the student's questions, repeated interests, hesitation points, and friction inside conversation and activity history.",
    accent: "rgba(45, 212, 191, 0.18)",
  },
  {
    step: "02",
    title: "Trajectory Generation",
    body: "Turn those signals into a direction: what this student is actually becoming, not just what they score highest in.",
    accent: "rgba(96, 165, 250, 0.18)",
  },
  {
    step: "03",
    title: "Build Direction",
    body: "Choose whether the right expression is an app, a website, research, an initiative, or a toolkit.",
    accent: "rgba(251, 191, 36, 0.16)",
  },
  {
    step: "04",
    title: "MVP Blueprint",
    body: "Generate the first product frame, feature map, scaffold, and deploy-ready launch direction.",
    accent: "rgba(192, 132, 252, 0.16)",
  },
];

const fallbackSignals = [
  "Repeated return to biology + memory topics",
  "Strong concept retention, weak language transfer",
  "High persistence after mistakes",
  "Visual explanation tendency in open responses",
];

const fallbackTracks = [
  {
    label: "APP",
    title: "Memory Pattern Tracker",
    body: "A student-facing app that records weak links, revisits them in context, and strengthens retention before exams.",
  },
  {
    label: "WEB",
    title: "Concept-to-English Bridge",
    body: "A lightweight web tool that turns Korean-side understanding into AP-style English explanation flow.",
  },
  {
    label: "INITIATIVE",
    title: "Learning Identity Archive",
    body: "A student project that tracks how people think, where they stall, and how identity changes through correction loops.",
  },
];

export default function TrajectoryLabTab() {
  const [form, setForm] = useState({
    keywords: TRAJECTORY_LAB_SAMPLE_INPUT.keywords.join(", "),
    conversationSummary: TRAJECTORY_LAB_SAMPLE_INPUT.conversationSummary,
    activities: TRAJECTORY_LAB_SAMPLE_INPUT.activities.join(", "),
    interests: TRAJECTORY_LAB_SAMPLE_INPUT.interests.join(", "),
    strengths: TRAJECTORY_LAB_SAMPLE_INPUT.strengths.join(", "),
    frictions: TRAJECTORY_LAB_SAMPLE_INPUT.frictions.join(", "),
    heroCode: TRAJECTORY_LAB_SAMPLE_INPUT.heroCode,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<TrajectoryAnalyzeResponse | null>(null);
  const [buildResult, setBuildResult] = useState<TrajectoryBuildResponse | null>(null);
  const [scaffoldResult, setScaffoldResult] = useState<TrajectoryScaffoldResponse | null>(null);
  const [deployResult, setDeployResult] = useState<TrajectoryDeployResponse | null>(null);

  const detectedCode = useMemo(() => {
    const normalized = form.heroCode.trim().toUpperCase() as keyof typeof HERO_CODE_META;
    return HERO_CODE_META[normalized] ?? HERO_CODE_META.CF;
  }, [form.heroCode]);

  const liveSignals = analyzeResult?.signalSummary ?? fallbackSignals;
  const liveTracks =
    buildResult && analyzeResult
      ? [
          {
            label: buildResult.format.toUpperCase(),
            title: buildResult.productName,
            body: buildResult.problemStatement,
          },
          {
            label: "FLOW",
            title: "User flow",
            body: buildResult.userFlow.join(" → "),
          },
          {
            label: "MVP",
            title: "Launch scope",
            body: buildResult.mvpScope.join(", "),
          },
        ]
      : fallbackTracks;

  async function handleRunTrajectory() {
    setIsRunning(true);
    setError(null);

    const payload: TrajectoryAnalyzeRequest = {
      keywords: parseCommaSeparatedInput(form.keywords),
      conversationSummary: form.conversationSummary,
      activities: parseCommaSeparatedInput(form.activities),
      interests: parseCommaSeparatedInput(form.interests),
      strengths: parseCommaSeparatedInput(form.strengths),
      frictions: parseCommaSeparatedInput(form.frictions),
      heroCode: form.heroCode.trim().toUpperCase(),
      portraitSignals: TRAJECTORY_LAB_SAMPLE_INPUT.portraitSignals,
      lang: "en",
    };

    try {
      const analyzeRes = await fetch("/api/trajectory-lab/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const analyzeJson = await analyzeRes.json();
      if (!analyzeRes.ok || analyzeJson.status) {
        throw new Error(analyzeJson.message || analyzeJson.error || "Could not analyze trajectory.");
      }
      setAnalyzeResult(analyzeJson);

      const buildRes = await fetch("/api/trajectory-lab/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trajectory: analyzeJson.trajectory,
          buildDirection: analyzeJson.buildDirection,
          recommendedFormat: analyzeJson.recommendedFormat,
          signalSummary: analyzeJson.signalSummary,
          suggestedProjectTypes: analyzeJson.suggestedProjectTypes,
          mvpConcept: analyzeJson.mvpConcept,
          lang: "en",
        }),
      });
      const buildJson = await buildRes.json();
      if (!buildRes.ok || buildJson.status) {
        throw new Error(buildJson.message || buildJson.error || "Could not generate build direction.");
      }
      setBuildResult(buildJson);

      const scaffoldRes = await fetch("/api/trajectory-lab/scaffold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildJson),
      });
      const scaffoldJson = await scaffoldRes.json();
      if (!scaffoldRes.ok || scaffoldJson.status) {
        throw new Error(scaffoldJson.message || scaffoldJson.error || "Could not create scaffold.");
      }
      setScaffoldResult(scaffoldJson);

      const deployRes = await fetch("/api/trajectory-lab/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: buildJson.productName,
          format: buildJson.format,
          template: scaffoldJson.template,
        }),
      });
      const deployJson = await deployRes.json();
      if (!deployRes.ok || deployJson.status) {
        throw new Error(deployJson.message || deployJson.error || "Could not prepare deploy spec.");
      }
      setDeployResult(deployJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not run Trajectory Lab.");
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-primary-500/15 bg-[linear-gradient(135deg,rgba(5,10,16,0.96),rgba(7,20,19,0.94))] p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-primary-400/20 bg-primary-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-primary-300">
              TRAJECTORY LAB
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              From conversation and extracurriculars to a real build direction.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Trajectory Lab reads learning behavior, interest patterns, and activity history, then turns them into a trajectory, a product direction,
              and the first real blueprint a student can start building now.
            </p>
          </div>

          <div className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] font-bold tracking-[0.22em] text-primary-300">RUN A LIVE SESSION</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <input
                value={form.keywords}
                onChange={(event) => setForm((current) => ({ ...current, keywords: event.target.value }))}
                className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30 md:col-span-2"
                placeholder="keywords"
              />
              <input
                value={form.activities}
                onChange={(event) => setForm((current) => ({ ...current, activities: event.target.value }))}
                className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30 md:col-span-2"
                placeholder="activities"
              />
              <input
                value={form.interests}
                onChange={(event) => setForm((current) => ({ ...current, interests: event.target.value }))}
                className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30"
                placeholder="interests"
              />
              <input
                value={form.heroCode}
                onChange={(event) => setForm((current) => ({ ...current, heroCode: event.target.value }))}
                className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30"
                placeholder="hero code"
              />
            </div>
            <textarea
              value={form.conversationSummary}
              onChange={(event) => setForm((current) => ({ ...current, conversationSummary: event.target.value }))}
              className="mt-3 min-h-[88px] w-full rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/30"
              placeholder="conversation summary"
            />
            <button
              type="button"
              onClick={() => startTransition(() => void handleRunTrajectory())}
              disabled={isRunning}
              className="mt-3 inline-flex w-full items-center justify-center rounded-[1rem] bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRunning ? "Generating..." : "Run Trajectory Lab"}
            </button>
            {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pipeline.map((item) => (
            <div
              key={item.step}
              className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5"
              style={{ boxShadow: `inset 0 1px 0 ${item.accent}` }}
            >
              <div className="text-xs font-bold tracking-[0.22em] text-white/35">{item.step}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-gray-400">SIGNAL READOUT</p>
              <h3 className="mt-2 text-xl font-bold text-gray-950">What the system detects</h3>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Student behavior layer
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {liveSignals.map((signal) => (
              <div
                key={signal}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
              >
                <span className="mt-0.5 text-primary-500">✦</span>
                <p className="text-sm leading-6 text-gray-700">{signal}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <p className="text-xs font-bold tracking-[0.22em] text-primary-300">TRAJECTORY OUTPUT</p>
            <p className="mt-3 text-lg font-semibold">
              {analyzeResult?.trajectory ?? "Bilingual cognition tools for science learners"}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/68">
              {analyzeResult?.buildDirection ??
                "The student is not just learning AP Biology. The stronger long-term direction is building tools for how bilingual students understand, remember, and translate difficult STEM concepts."}
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-bold tracking-[0.22em] text-gray-400">DETECTED HERO CODE</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-gray-950">
                  {detectedCode.id} · {detectedCode.name}
                </p>
                <p className="mt-1 text-sm text-gray-600">{detectedCode.oneLiner}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white text-2xl shadow-sm">
                {detectedCode.mascot}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold tracking-[0.22em] text-gray-400">BUILD RECOMMENDATIONS</p>
          <h3 className="mt-2 text-xl font-bold text-gray-950">Possible directions to launch</h3>

          <div className="mt-5 space-y-4">
            {liveTracks.map((track) => (
              <div key={track.title} className="rounded-[1.4rem] border border-gray-100 p-4">
                <p className="text-[11px] font-bold tracking-[0.2em] text-primary-500">{track.label}</p>
                <h4 className="mt-2 text-base font-semibold text-gray-950">{track.title}</h4>
                <p className="mt-2 text-sm leading-6 text-gray-600">{track.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <p className="text-xs font-bold tracking-[0.22em] text-primary-300">MVP OUTPUT</p>
            <p className="mt-3 text-base font-semibold">
              {buildResult?.tagline ?? "Not generic extracurricular advice. A buildable future."}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/66">
              {scaffoldResult
                ? `${scaffoldResult.template} ready with ${scaffoldResult.pages.join(", ")} pages and ${scaffoldResult.components.join(", ")} components.`
                : "Once the trajectory is clear, the system can frame the first product, user flow, and launch structure a student can actually build."}
            </p>
            {deployResult ? (
              <p className="mt-3 text-xs font-medium text-emerald-200">
                {deployResult.previewUrl
                  ? `Preview ready: ${deployResult.previewUrl}`
                  : `Deploy-ready: ${deployResult.previewSlug} via ${deployResult.host}`}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-gray-400">FIRST VERSION OUTPUTS</p>
            <h3 className="mt-2 text-xl font-bold text-gray-950">What gets generated next</h3>
          </div>
          <div className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            App + web creation layer
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,#06131a_0%,#0a1b21_100%)] p-5 text-white">
            <p className="text-sm font-semibold text-primary-300">Build pipeline</p>
            <div className="mt-4 space-y-3">
              {(buildResult?.userFlow ?? [
                "Name the product and define the exact student problem",
                "Select the build format: app, website, or research platform",
                "Generate core features, user flow, and launch copy",
                "Create the first MVP scaffold and rollout plan",
              ]).map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/80">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-dashed border-gray-200 bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">Starter scaffold</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(scaffoldResult
                ? [
                    scaffoldResult.contentBlocks.hero,
                    scaffoldResult.contentBlocks.problem,
                    ...scaffoldResult.contentBlocks.features,
                    ...scaffoldResult.pages.slice(0, 2),
                  ]
                : [
                    "Product name + positioning",
                    "Landing page copy",
                    "Core feature set",
                    "User flow and wireframe",
                    "MVP roadmap",
                    "Starter app/web scaffold",
                  ]
              ).map((item) => (
                <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-gray-600">
              The goal is to turn a student's pattern history into a real first build, not another generic recommendation.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/trajectory-lab"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Open Full Trajectory Lab
          </Link>
          <Link
            href="/waitlist?source=trajectory_lab_tab"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            Join the First Cohort
          </Link>
        </div>
      </div>
    </div>
  );
}
