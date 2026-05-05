"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { HERO_CODE_META } from "@/lib/hero-codes";
import { authFetch } from "@/lib/client-auth";
import {
  TRAJECTORY_LAB_SAMPLE_INPUT,
  parseCommaSeparatedInput,
  type TrajectoryAnalyzeRequest,
  type TrajectoryAnalyzeResponse,
  type TrajectoryBuildResponse,
  type TrajectoryScaffoldResponse,
  type TrajectoryDeployResponse,
} from "@/lib/trajectory-lab";
import type { LivingPortrait } from "@/lib/memory/types";
import {
  hasReachedEarlyAccessLimit,
  incrementEarlyAccessUsage,
  FEATURE_TRIAL_LIMITS,
} from "@/lib/ai-access";

const pipeline = [
  {
    step: "01",
    title: "Pattern Extraction",
    body: "Read hesitation points, correction loops, language friction, persistence patterns, and repeated interests across the student's log history.",
  },
  {
    step: "02",
    title: "Trajectory Generation",
    body: "Turn those signals into a direction the student is actually growing into, not just the subject with the highest score.",
  },
  {
    step: "03",
    title: "Build Direction",
    body: "Decide whether the right expression is an app, a website, a research build, or a student-facing initiative.",
  },
  {
    step: "04",
    title: "MVP Blueprint",
    body: "Generate launch structure, product framing, core features, user flow, and the first real build scaffold.",
  },
];

const signalRows = [
  { label: "Topic gravity", value: "Still reading what subjects or problems pull you back most often" },
  { label: "Friction point", value: "Waiting to hear where learning feels sticky, frustrating, or personal" },
  { label: "Correction style", value: "Will map whether you re-try, avoid, or restructure after mistakes" },
  { label: "Expression mode", value: "Will detect whether you think visually, verbally, structurally, or by doing" },
];

const buildDirections = [
  {
    type: "APP",
    title: "Memory Pattern Tracker",
    body: "A personal study app that records weak links, revisits them inside new questions, and surfaces repeat confusion before exams.",
  },
  {
    type: "WEB",
    title: "Concept-to-English Bridge",
    body: "A lightweight web experience that converts Korean-side understanding into AP-style English reasoning and problem language.",
  },
  {
    type: "LAB",
    title: "Learning Identity Archive",
    body: "A living archive showing how a student's thinking pattern evolves across errors, revisions, and confidence shifts.",
  },
];

const outputCards = [
  "Product name + positioning",
  "Landing page structure",
  "Feature architecture",
  "User flow map",
  "MVP build scope",
  "Starter app or web scaffold",
];

const intakeQuestionChips = [
  "What subjects keep pulling you back lately?",
  "Can you list the activities you have already tried?",
  "Who do you want to help, and what problem bothers you?",
  "What kind of app, web tool, or project do you wish existed?",
  "What are you unusually good at when learning gets hard?",
];

const BUILD_NOW_KEYWORDS = [
  "build now",
  "host now",
  "just build",
  "just host",
  "make it now",
  "launch now",
  "do it now",
  "start the host",
];

// Local follow-up sequence used when the AI API is unavailable.
// Each entry pairs a keyword that might appear in the user's message with a smart follow-up.
const LOCAL_FOLLOWUPS: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ["don't know", "not sure", "idk", "no idea", "unsure", "i don't", "i do not"],
    reply: `That's totally fine — most students start exactly here. Let's find the signal together.\n\nTry answering just one of these:\n• What class or topic have you revisited the most this year, even outside of school?\n• What's a problem you've noticed that bothers you — in your school, your community, or daily life?\n• Have you ever tutored someone, made something, or started a project — even a small one?\n\nYou don't need to have it figured out. Just start anywhere.`,
  },
  {
    keywords: ["biology", "bio", "science", "chemistry", "physics"],
    reply: `Science signal detected. A few things that would sharpen this:\n• Is it more the concepts (how things work) or the application (experiments, research, real problems)?\n• Do you find yourself explaining biology to others or teaching it?\n• Is there a specific area — genetics, neuroscience, ecology — that keeps coming back?\n\nThat difference matters a lot for what kind of build fits you.`,
  },
  {
    keywords: ["math", "calculus", "statistics", "numbers", "data"],
    reply: `Math-oriented signal. Let me ask something more specific:\n• Do you like math as a tool for something else (modeling, data, finance) or do you like the reasoning itself?\n• Have you ever used numbers to explain something to someone who didn't get it before?\n• What would you build if you could use data or math to help a specific group of people?\n\nThe answer shapes whether this becomes a tool, a visualization, or something educational.`,
  },
  {
    keywords: ["coding", "programming", "code", "software", "app", "website", "build"],
    reply: `Builder instinct — that's a strong signal. Let's get specific:\n• What have you already built or started, even if it's unfinished?\n• Who do you imagine using something you build — students, parents, teachers, your own use?\n• What problem does the app or website exist to solve?\n\nIf you can answer those three, Trajectory Lab can generate a real product direction for you.`,
  },
  {
    keywords: ["help", "teaching", "tutor", "explain", "people"],
    reply: `Strong signal — you care about helping people understand things. Let's narrow it:\n• Who specifically? Younger students? Peers? A certain subject?\n• Is the problem that existing explanations are bad, that they're hard to find, or that they're not available in a certain language?\n• Have you tried explaining something and realized you actually enjoyed it?\n\nThat "wanting to help people understand" pattern is a very buildable trajectory.`,
  },
  {
    keywords: ["language", "bilingual", "korean", "english", "translate", "translation"],
    reply: `Bilingual/language signal — this is genuinely interesting for builds. Consider:\n• Is the problem translation itself, or is it that concepts explained in one language don't transfer well to another?\n• Do you think in Korean first for some subjects and English first for others?\n• Who do you know that struggles most with this gap?\n\nThere's a real product direction in this space. Tell me more and Trajectory Lab can map it.`,
  },
  {
    keywords: ["activity", "activities", "club", "competition", "extracurricular", "volunteer"],
    reply: `Activities signal — let's turn these into pattern data.\n• Which of your activities felt the most like YOU, not just resume-building?\n• Which one would you have done even if no one was grading you?\n• What did you get unusually good at through these activities?\n\nThe difference between "activities you did" and "activities that shaped how you think" is exactly what Trajectory Lab looks for.`,
  },
];

function getLocalFallbackReply(userMessage: string, conversationLength: number): string {
  const lower = userMessage.toLowerCase();

  if (BUILD_NOW_KEYWORDS.some((keyword) => lower.includes(keyword))) {
    return `I can do that, but I need to lock the direction first.\n\nGive me just enough to generate it:\n• who the website is for\n• the problem it solves\n• any activities or experience you already have in this area\n\nOr press **Run Trajectory** right now and I'll turn the current signal into a first build and hosting direction.`;
  }

  // Check for keyword matches first
  for (const item of LOCAL_FOLLOWUPS) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.reply;
    }
  }

  // Cycle through intake questions based on conversation depth
  const cycleQuestions = [
    `Got it — let's keep going. Here's a good next question:\n\n**What subjects or topics have you revisited the most this year, even outside of class?**\n\nDon't overthink it. Even "I keep reading about space" or "I always end up explaining things to my classmates" counts.`,
    `Understood. Let me ask it differently:\n\n**Have you ever started something — a project, a side hobby, a tool, anything — even if you didn't finish it?**\n\nThat unfinished thing often holds the most honest signal about what you actually want to build.`,
    `Let's try this angle:\n\n**Who is one person in your life who has a problem you could imagine solving?**\n\nIt doesn't have to be world-changing. "My classmates always struggle with [X]" or "My parents can't find [Y]" — that's enough signal to start a trajectory.`,
    `One more angle:\n\n**What kind of product or tool do you wish existed — for yourself or for someone you know?**\n\nDescribe it as simply as you want. Even "an app that helps bilingual students explain AP Biology in Korean" is a complete direction.`,
    `You're further along than you think. Based on what you've shared, fill in the intake form fields above with whatever comes to mind — even rough answers. Then hit **Run Trajectory** and let the system find the pattern for you.\n\nYou don't need to have it figured out before you run it.`,
  ];

  const idx = Math.min(Math.floor(conversationLength / 2), cycleQuestions.length - 1);
  return cycleQuestions[idx];
}

function buildPortraitSummary(portrait: LivingPortrait | null) {
  if (!portrait) return null;
  return [
    `Hero Code ${portrait.heroCode}`,
    `spark trigger ${portrait.sparkTrigger}`,
    `processing style ${portrait.processingStyle}`,
    portrait.recentMoments.length ? `recent growth: ${portrait.recentMoments.join(" | ")}` : "",
    portrait.essaySeeds.length ? `essay seeds: ${portrait.essaySeeds.join(" | ")}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function buildConversationSummary(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  return messages
    .filter((message) => message.role === "user")
    .map((message) => message.content.trim())
    .filter(Boolean)
    .slice(-6)
    .join(" ");
}

export default function TrajectoryLabPage() {
  const [form, setForm] = useState({
    keywords: "",
    conversationSummary: "",
    activities: "",
    interests: "",
    strengths: "",
    frictions: "",
    heroCode: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<TrajectoryAnalyzeResponse | null>(null);
  const [buildResult, setBuildResult] = useState<TrajectoryBuildResponse | null>(null);
  const [scaffoldResult, setScaffoldResult] = useState<TrajectoryScaffoldResponse | null>(null);
  const [deployResult, setDeployResult] = useState<TrajectoryDeployResponse | null>(null);
  const [portrait, setPortrait] = useState<LivingPortrait | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string; showCta?: boolean }>>([
    {
      role: "assistant",
      content:
        "Before we build anything, tell me what subjects keep pulling you back, what you actually enjoy, and what activities you have already tried. If you want, start by listing the projects, clubs, competitions, or tutoring you have done so far.",
    },
  ]);

  const detectedCode = useMemo(() => {
    const normalized = form.heroCode.trim().toUpperCase() as keyof typeof HERO_CODE_META;
    return HERO_CODE_META[normalized] ?? HERO_CODE_META.CF;
  }, [form.heroCode]);

  const signalSummary = analyzeResult?.signalSummary ?? [
    "No signal summary yet — start the intake to show what keeps pulling you back",
    "Trajectory Lab will read your repeated interests, friction points, and strengths",
    "Your first build direction appears here once enough student signal is detected",
  ];
  const trajectoryLabel = analyzeResult?.trajectory ?? "No trajectory generated yet";
  const buildFormatLabel = buildResult?.format ?? "waiting for signal";
  const firstOutputLabel = scaffoldResult?.template ?? "student intake first";
  const portraitSummary = useMemo(() => buildPortraitSummary(portrait), [portrait]);
  const portraitSignals = useMemo(
    () =>
      portrait
        ? [
            portrait.processingStyle,
            `spark trigger: ${portrait.sparkTrigger}`,
            ...portrait.recentMoments.slice(0, 3),
            ...portrait.essaySeeds.slice(0, 2),
          ].filter(Boolean)
        : TRAJECTORY_LAB_SAMPLE_INPUT.portraitSignals,
    [portrait]
  );
  const isTrajectoryReady = Boolean(analyzeResult && buildResult);
  const liveTrackCards =
    buildResult && analyzeResult
      ? [
          {
            type: buildResult.format.toUpperCase(),
            title: buildResult.productName,
            body: buildResult.problemStatement,
          },
          {
            type: "FLOW",
            title: "User flow",
            body: buildResult.userFlow.join(" → "),
          },
          {
            type: "MVP",
            title: "Launch scope",
            body: buildResult.mvpScope.join(", "),
          },
        ]
      : buildDirections;
  const liveOutputCards =
    scaffoldResult?.contentBlocks.features?.length
      ? [
          buildResult?.productName ?? "Product name + positioning",
          ...scaffoldResult.contentBlocks.features,
          ...(buildResult?.userFlow ?? []).slice(0, 2),
        ]
      : outputCards;

  const loadPortraitMemory = async () => {
    try {
      const response = await authFetch("/api/memory/portrait");
      if (!response.ok) return;
      const data = await response.json();
      if (!data?.portrait) return;
      setPortrait(data.portrait);
      setHistoryLoaded(true);
      setForm((current) => ({
        ...current,
        heroCode: current.heroCode || data.portrait.heroCode?.split("-")[0] || "",
      }));
      setChatMessages((current) => {
        if (current.length !== 1 || current[0]?.role !== "assistant" || analyzeResult || buildResult) return current;
        return [
          {
            role: "assistant",
            content: `I pulled your InHero history into this build intake. I can already see ${data.portrait.heroCode}, ${data.portrait.processingStyle}, and some recent growth signals. Now tell me what subjects, activities, or problems you want to turn into something buildable.`,
          },
        ];
      });
    } catch {
      // Silent fail for logged-out or first-time visitors.
    }
  };

  useEffect(() => {
    void loadPortraitMemory();
  }, []);

  async function runTrajectoryPipeline(options?: {
    conversationSummary?: string;
    preserveChat?: boolean;
  }) {
    const payload: TrajectoryAnalyzeRequest = {
      keywords: parseCommaSeparatedInput(form.keywords),
      conversationSummary: [
        form.conversationSummary,
        buildConversationSummary(chatMessages),
        options?.conversationSummary,
      ]
        .filter(Boolean)
        .join(" "),
      activities: parseCommaSeparatedInput(form.activities),
      interests: parseCommaSeparatedInput(form.interests),
      strengths: parseCommaSeparatedInput(form.strengths),
      frictions: parseCommaSeparatedInput(form.frictions),
      heroCode: (form.heroCode.trim().toUpperCase() || portrait?.heroCode.split("-")[0] || "").trim(),
      portraitSignals,
      lang: "en",
    };

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

    if (!options?.preserveChat) {
      setChatMessages([
        {
          role: "assistant",
          content: `Trajectory ready. Ask me anything about building ${buildJson.productName} — features, MVP scope, landing copy, stack, or hosting.`,
        },
      ]);
    }

    return {
      analyze: analyzeJson as TrajectoryAnalyzeResponse,
      build: buildJson as TrajectoryBuildResponse,
      scaffold: scaffoldJson as TrajectoryScaffoldResponse,
      deploy: deployJson as TrajectoryDeployResponse,
    };
  }

  async function handleRunTrajectory() {
    setIsRunning(true);
    setError(null);

    try {
      await runTrajectoryPipeline();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not run Trajectory Lab.");
    } finally {
      setIsRunning(false);
    }
  }

  async function handleSendBuildQuestion() {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    const nextHistory = chatMessages.map((msg) => ({ role: msg.role, content: msg.content }));

    setChatLoading(true);
    setChatInput("");
    setChatMessages((current) => [...current, { role: "user", content: userMessage }]);

    // Check free trial limit for trajectory chat
    if (hasReachedEarlyAccessLimit("trajectory")) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `You've used your ${FEATURE_TRIAL_LIMITS.trajectory} free Trajectory Build sessions. Upgrade to keep building — unlimited conversations, full AI pipeline, and all features unlocked.`,
          showCta: true,
        },
      ]);
      setChatLoading(false);
      return;
    }

    incrementEarlyAccessUsage("trajectory");

    try {
      const lower = userMessage.toLowerCase();
      const shouldForceBuildNow =
        !isTrajectoryReady && BUILD_NOW_KEYWORDS.some((keyword) => lower.includes(keyword));

      if (shouldForceBuildNow) {
        const generated = await runTrajectoryPipeline({
          conversationSummary: userMessage,
          preserveChat: true,
        });

        const preview = generated.deploy.previewUrl ?? `https://${generated.deploy.previewSlug}.vercel.app`;
        setChatMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              `I went ahead and turned the current signal into a first direction.\n\n` +
              `Build: ${generated.build.productName}\n` +
              `Why this fits: ${generated.analyze.buildDirection}\n` +
              `First feature: ${generated.build.coreFeatures[0]}\n` +
              `Best stack: ${generated.scaffold.stack.join(" + ")}\n` +
              `Host path: ${generated.deploy.host} via ${generated.deploy.recommendedCommand}\n` +
              `Preview target: ${preview}\n\n` +
              `Now ask me what page to build first, how to structure the landing page, or how to ship the MVP this week.`,
          },
        ]);
        return;
      }

      const res = await fetch("/api/trajectory-lab/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: nextHistory,
          analyze: analyzeResult,
          build: buildResult,
          scaffold: scaffoldResult,
          deploy: deployResult,
          portraitSummary,
          intakeContext: {
            keywords: parseCommaSeparatedInput(form.keywords),
            activities: parseCommaSeparatedInput(form.activities),
            interests: parseCommaSeparatedInput(form.interests),
            strengths: parseCommaSeparatedInput(form.strengths),
            frictions: parseCommaSeparatedInput(form.frictions),
            heroCode: form.heroCode.trim().toUpperCase(),
          },
          lang: "en",
        }),
      });
      const data = await res.json();

      // If the API is locked, in fallback mode, or returns no real reply,
      // use the local smart follow-up instead of the generic fallback message.
      const isBlocked = data.status === "locked" || data.status === "fallback";
      const reply = (!isBlocked && data.reply)
        ? data.reply
        : getLocalFallbackReply(userMessage, nextHistory.length);

      setChatMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch {
      // Network error — also use local smart follow-up
      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: getLocalFallbackReply(userMessage, nextHistory.length),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="tlab-root min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(0,255,178,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 35% at 80% 15%, rgba(120,160,255,0.05) 0%, transparent 60%)' }} />


        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-32 lg:pt-28">
          <div className="text-white">
            <div className="tlab-badge">
              <span className="tlab-badge-dot" />
              TRAJECTORY LAB &nbsp;•&nbsp; MAIN SYSTEM
            </div>

            <h1 className="mt-8 max-w-3xl text-4xl font-black text-white sm:text-5xl lg:text-6xl" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Turn student behavior into a buildable future.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Trajectory Lab reads how a student learns, where they stall, what they return to, and what kind of builder they are becoming.
              Then it turns those learning signals into a student-specific product direction, an MVP blueprint, and the first version of an app or website worth launching.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#coach"
                className="tlab-btn-primary"
              >
                Start Building Now
              </a>
              <Link
                href="/pricing"
                className="tlab-btn-ghost"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-14 grid gap-3 sm:grid-cols-3">
              {[
                { value: "4 layers", label: "Pattern to product system" },
                { value: "App + web", label: "First build output" },
                { value: "Identity-led", label: "Not generic activity advice" },
              ].map((item) => (
                <div key={item.label} className="tlab-glass px-5 py-4">
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 tlab-glass p-5" style={{ borderRadius: '8px' }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="tlab-label" style={{ color: '#00FFB2' }}>TRY THE ENGINE</p>
                  <h2 className="mt-2 text-xl font-bold text-white">Start with a short student intake</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Tell InHero what you like, what you have already done, and where your curiosity keeps returning. The system will turn that into a build direction.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => startTransition(() => void handleRunTrajectory())}
                  className="tlab-btn-run flex-shrink-0"
                  disabled={isRunning}
                >
                  {isRunning ? "Building..." : "Run Trajectory"}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {intakeQuestionChips.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setChatInput(prompt)}
                    className="tlab-chip"
                  >
                    {prompt}
                  </button>
                ))}
                {portraitSummary ? (
                  <button
                    type="button"
                    onClick={() => void loadPortraitMemory()}
                    className="tlab-chip tlab-chip-teal"
                  >
                    InHero history connected
                  </button>
                ) : historyLoaded ? null : (
                  <button
                    type="button"
                    onClick={() => void loadPortraitMemory()}
                    className="tlab-chip tlab-chip-sky"
                  >
                    Pull in AI Companion history
                  </button>
                )}
              </div>

              <div className="mt-5 grid gap-2 md:grid-cols-2">
                <input
                  value={form.keywords}
                  onChange={(event) => setForm((current) => ({ ...current, keywords: event.target.value }))}
                  className="tlab-input"
                  placeholder="keywords: biology, memory, bilingual"
                />
                <input
                  value={form.heroCode}
                  onChange={(event) => setForm((current) => ({ ...current, heroCode: event.target.value }))}
                  className="tlab-input"
                  placeholder="hero code: CF"
                />
                <input
                  value={form.activities}
                  onChange={(event) => setForm((current) => ({ ...current, activities: event.target.value }))}
                  className="tlab-input"
                  placeholder="activities: AP Biology, peer tutoring"
                />
                <input
                  value={form.interests}
                  onChange={(event) => setForm((current) => ({ ...current, interests: event.target.value }))}
                  className="tlab-input"
                  placeholder="interests: education, visual explanation"
                />
                <input
                  value={form.strengths}
                  onChange={(event) => setForm((current) => ({ ...current, strengths: event.target.value }))}
                  className="tlab-input"
                  placeholder="strengths: pattern recognition, persistence"
                />
                <input
                  value={form.frictions}
                  onChange={(event) => setForm((current) => ({ ...current, frictions: event.target.value }))}
                  className="tlab-input"
                  placeholder="frictions: language transfer, confidence"
                />
              </div>

              <textarea
                value={form.conversationSummary}
                onChange={(event) => setForm((current) => ({ ...current, conversationSummary: event.target.value }))}
                className="tlab-input mt-2 min-h-[80px] w-full resize-none"
                placeholder="conversation summary"
              />

              <div className="mt-3 flex flex-wrap gap-2" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono', monospace" }}>
                <span className="tlab-tag">conversation-first</span>
                <span className="tlab-tag">activity mapping</span>
                <span className="tlab-tag">buildable future</span>
              </div>

              {error ? <p className="mt-4 text-sm" style={{ color: '#ff7b7b' }}>{error}</p> : null}
            </div>
          </div>

          <div className="flex items-start pt-4">
            <div className="w-full tlab-glass p-5 sm:p-6" style={{ borderRadius: '8px' }}>
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div>
                  <p className="tlab-label" style={{ color: '#00FFB2' }}>LIVE READOUT</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Trajectory generation session</h2>
                </div>
                <span className="tlab-tag tlab-tag-teal">{isTrajectoryReady ? "build-ready" : "intake mode"}</span>
              </div>

              <div className="mt-5 space-y-3">
                {/* Signal summary — left teal border */}
                <div className="tlab-signal-card p-4">
                  <p className="tlab-label">SIGNAL SUMMARY</p>
                  <div className="mt-3 space-y-2 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    {signalSummary.map((signal) => (
                      <p key={signal}>{signal}</p>
                    ))}
                  </div>
                </div>

                <div className="tlab-signal-card p-4" style={{ borderLeftColor: 'rgba(120,160,255,0.6)' }}>
                  <p className="tlab-label" style={{ color: 'rgba(160,190,255,0.8)' }}>TRAJECTORY</p>
                  <p className="mt-3 text-base font-semibold text-white">{trajectoryLabel}</p>
                  <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {analyzeResult?.buildDirection ?? "Once intake starts, this becomes a student-specific build direction instead of a generic activity suggestion."}
                  </p>
                </div>

                <div className="tlab-signal-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="tlab-label" style={{ color: '#00FFB2' }}>DETECTED HERO CODE</p>
                      <p className="mt-2 text-base font-semibold text-white">{detectedCode.id} · {detectedCode.name}</p>
                      <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{detectedCode.oneLiner}</p>
                    </div>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-3xl" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
                      {detectedCode.mascot}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="tlab-glass p-4" style={{ borderRadius: '6px' }}>
                    <p className="tlab-label">BUILD FORMAT</p>
                    <p className="mt-3 text-sm font-semibold text-white">{buildFormatLabel} + launch page</p>
                  </div>
                  <div className="tlab-glass p-4" style={{ borderRadius: '6px' }}>
                    <p className="tlab-label">FIRST OUTPUT</p>
                    <p className="mt-3 text-sm font-semibold text-white">{firstOutputLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="tlab-glass p-6 sm:p-7" style={{ borderRadius: '8px' }}>
            <p className="tlab-label" style={{ color: '#00FFB2' }}>PATTERN EXTRACTION</p>
            <h2 className="mt-3 text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>What the system reads first</h2>
            <div className="mt-6 space-y-2">
              {(analyzeResult
                ? [
                    { label: "Topic gravity", value: analyzeResult.signalSummary[0] ?? "Still reading signal gravity" },
                    { label: "Friction point", value: analyzeResult.signalSummary[1] ?? "Still mapping friction" },
                    { label: "Growth direction", value: analyzeResult.trajectory },
                    { label: "Build fit", value: analyzeResult.buildDirection },
                  ]
                : signalRows
              ).map((row) => (
                <div key={row.label} className="tlab-signal-card px-4 py-4">
                  <p className="tlab-label">{row.label}</p>
                  <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(255,255,255,0.72)' }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tlab-glass p-6 sm:p-7" style={{ borderRadius: '8px' }}>
            <p className="tlab-label" style={{ color: '#00FFB2' }}>SYSTEM FLOW</p>
            <h2 className="mt-3 text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>How trajectory becomes a real build</h2>
            <div className="mt-6 grid gap-3">
              {pipeline.map((item, index) => (
                <div key={item.step} className="tlab-glass grid gap-4 p-4 sm:grid-cols-[72px_1fr] sm:items-start" style={{ borderRadius: '6px' }}>
                  <div className="flex flex-col items-center justify-center py-2 text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="tlab-label" style={{ color: '#00FFB2', fontSize: '9px' }}>STEP</p>
                    <p className="mt-1 text-3xl font-black text-white">{index + 1}</p>
                  </div>
                  <div className="py-1">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="tlab-glass p-7 sm:p-8 lg:p-10 text-white" style={{ borderRadius: '8px', borderColor: 'rgba(0,255,178,0.08)' }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="tlab-label" style={{ color: '#00FFB2' }}>BUILD DIRECTION RECOMMENDATION</p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl text-white" style={{ letterSpacing: '-0.02em' }}>What a student like this should build next</h2>
            </div>
            <p className="max-w-xl text-sm leading-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
              The system should not stop at suggestions. It should choose a direction that feels native to the student's pattern history.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {liveTrackCards.map((item) => (
              <div key={item.title} className="tlab-glass p-5" style={{ borderRadius: '6px' }}>
                <span className="tlab-tag tlab-tag-teal" style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px' }}>{item.type}</span>
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="tlab-glass p-6 sm:p-7" style={{ borderRadius: '8px' }}>
            <p className="tlab-label" style={{ color: '#00FFB2' }}>MVP BLUEPRINT</p>
            <h2 className="mt-3 text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>What gets generated immediately</h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {liveOutputCards.map((item) => (
                <div key={item} className="tlab-glass px-4 py-3 text-sm font-medium text-white" style={{ borderRadius: '4px', color: 'rgba(255,255,255,0.75)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="tlab-glass p-6 sm:p-7" style={{ borderRadius: '8px' }}>
            <p className="tlab-label" style={{ color: '#00FFB2' }}>WHY IT MATTERS</p>
            <h2 className="mt-3 text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>From extracurricular advice to product creation</h2>
            <div className="mt-6 space-y-4 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <p>
                Most systems stop at telling students what they might like. Trajectory Lab is meant to go further and tell them what someone with
                their actual learning pattern, academic friction, and strengths should build.
              </p>
              <p>
                The result is stronger student identity, better admissions storytelling, and a real first artifact that exists outside the chat window.
              </p>
            </div>

            <div className="mt-7 tlab-glass p-5" style={{ borderRadius: '6px', borderColor: 'rgba(0,255,178,0.12)' }}>
              <p className="tlab-label" style={{ color: '#00FFB2' }}>FINAL LAYER</p>
              <p className="mt-3 text-lg font-bold text-white">{deployResult ? `Deploy-ready on ${deployResult.host}` : "App and web creation"}</p>
              <p className="mt-3 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {deployResult
                  ? deployResult.previewUrl
                    ? `Preview created at ${deployResult.previewUrl}. Recommended command: ${deployResult.recommendedCommand}.`
                    : `Preview slug: ${deployResult.previewSlug}. Recommended command: ${deployResult.recommendedCommand}.`
                  : "Once the trajectory is clear, the system generates the first product direction, starter structure, and launch-ready frame for the student to keep building on."}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#coach" className="tlab-btn-primary">
                Start the Intake
              </a>
              <Link
                href="/ai-companion"
                className="tlab-btn-ghost"
              >
                Open AI Companion
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="tlab-glass p-6 sm:p-7" style={{ borderRadius: '8px' }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="tlab-label" style={{ color: '#00FFB2' }}>HERO CODE LAYER</p>
              <h2 className="mt-3 text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>A mascot-backed identity system</h2>
            </div>
            <p className="max-w-xl text-sm leading-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Trajectory gets sharper when the system can name the student's operating pattern and connect it to a collectible character.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {["CF", "CS", "CT", "IB"].map((id) => {
              const item = HERO_CODE_META[id as keyof typeof HERO_CODE_META];
              return (
                <div key={item.id} className="tlab-glass p-5" style={{ borderRadius: '6px' }}>
                  <span className="text-4xl">{item.mascot}</span>
                  <p className="mt-4 text-xs font-bold tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Mono', monospace" }}>{item.id}</p>
                  <h3 className="mt-1 text-base font-bold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.oneLiner}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-7">
            <Link
              href="/hero-codes"
              className="tlab-btn-ghost"
            >
              Explore All 20 Hero Codes
            </Link>
          </div>
        </div>
      </section>

      <section id="coach" className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="tlab-glass p-6 text-white sm:p-8" style={{ borderRadius: '8px', borderColor: 'rgba(0,255,178,0.1)', boxShadow: '0 0 80px rgba(0,255,178,0.04)' }}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#00FFB2' }}></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#00FFB2' }}></span>
                </span>
                <p className="tlab-label" style={{ color: '#00FFB2' }}>TRAJECTORY BUILD COACH</p>
              </div>
              <span className="tlab-tag tlab-tag-teal">product coach + host guide</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl" style={{ letterSpacing: '-0.02em' }}>Talk through the build in real time</h2>
            <p className="max-w-2xl text-sm leading-7" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Start with a short learning intake. Once Trajectory Lab detects enough signal from your subjects, activities, and interests,
              this becomes your build coach for features, landing copy, hosting, launch order, and the first shippable version.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="tlab-glass flex flex-col gap-4 p-5 sm:p-6" style={{ borderRadius: '6px' }}>
              {/* Chat messages */}
              <div className="min-h-[180px] max-h-[380px] space-y-3 overflow-y-auto pr-1">
                {chatMessages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center py-10 text-center" style={{ opacity: 0.5 }}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center text-2xl" style={{ border: '1px solid rgba(0,255,178,0.2)', borderRadius: '4px', background: 'rgba(0,255,178,0.06)' }}>✦</div>
                    <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Your build conversation starts here.</p>
                    <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Ask about features, stack, MVP scope, or launch.</p>
                  </div>
                ) : chatMessages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="mt-0.5 flex-shrink-0 flex h-6 w-6 items-center justify-center text-xs" style={{ border: '1px solid rgba(0,255,178,0.25)', borderRadius: '4px', background: 'rgba(0,255,178,0.08)', color: '#00FFB2' }}>✦</div>
                    )}
                    <div className="max-w-[84%] flex flex-col gap-2">
                      <div
                        className={`px-4 py-3 text-sm leading-7 ${message.role === "user" ? "font-medium" : ""}`}
                        style={message.role === "user"
                          ? { background: '#00FFB2', color: '#000', borderRadius: '4px', boxShadow: '0 6px 20px rgba(0,255,178,0.2)' }
                          : { border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.82)', borderRadius: '4px' }
                        }
                      >
                        {message.content}
                      </div>
                      {message.showCta && (
                        <div style={{ border: '1px solid rgba(0,255,178,0.2)', borderRadius: '6px', background: 'rgba(0,255,178,0.05)', padding: '14px 16px' }}>
                          <p className="text-sm font-bold text-white">⚡ Free trial limit reached</p>
                          <p className="mt-1 text-xs leading-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            You&apos;ve used your {FEATURE_TRIAL_LIMITS.trajectory} free Trajectory sessions. Upgrade to continue — unlimited builds, full AI pipeline, all features.
                          </p>
                          <Link
                            href="/pricing"
                            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded"
                            style={{ background: '#00FFB2', color: '#000' }}
                          >
                            See Plans — Unlock Full Access →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

              {/* Input area */}
              <div className="flex flex-col gap-3">
                <p className="tlab-label" style={{ color: 'rgba(0,255,178,0.7)' }}>
                  {isTrajectoryReady ? "ASK THE BUILD COACH" : "START THE STUDENT INTAKE"}
                </p>
                <textarea
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder={
                    isTrajectoryReady
                      ? "What should the first feature be? How do I host this? What can I ship this week?"
                      : "What subjects do I keep coming back to? What activities have I tried? What kind of student problem should I build for?"
                  }
                  className="tlab-input min-h-[90px] w-full resize-none"
                />
                <button
                  type="button"
                  onClick={() => startTransition(() => void handleSendBuildQuestion())}
                  disabled={!chatInput.trim() || chatLoading}
                  className="tlab-btn-primary w-full inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {chatLoading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2" style={{ borderColor: 'rgba(0,0,0,0.3)', borderTopColor: '#000' }} />
                      Thinking...
                    </>
                  ) : isTrajectoryReady ? "Ask Build Coach →" : "Start Intake Conversation →"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Current build panel */}
              <div className="tlab-glass p-5" style={{ borderRadius: '6px' }}>
                <p className="tlab-label">CURRENT BUILD</p>
                <p className="mt-3 text-base font-bold text-white leading-snug">
                  {buildResult?.productName ?? "No direction yet"}
                </p>
                <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {buildResult?.tagline ?? "Complete the intake above first. Once Trajectory Lab has enough learning signal, this panel turns your study pattern into a product direction."}
                </p>
              </div>

              {/* Suggested questions */}
              <div className="tlab-glass p-5" style={{ borderRadius: '6px' }}>
                <p className="tlab-label">
                  {isTrajectoryReady ? "GOOD QUESTIONS TO ASK" : "TRY ASKING"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(isTrajectoryReady
                    ? [
                        "What should the first feature be?",
                        "Should this be an app or web MVP first?",
                        "How do I host this on Vercel?",
                        "What can I ship in one week?",
                        "How should I write the landing page hero?",
                      ]
                    : intakeQuestionChips).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setChatInput(prompt)}
                      className="tlab-chip tlab-chip-hover-teal"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Connected memory / hosting panel */}
              <div className="tlab-glass p-5" style={{ borderRadius: '6px', borderColor: 'rgba(0,255,178,0.12)', background: 'linear-gradient(135deg, rgba(0,255,178,0.04), rgba(0,255,178,0.02))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#00FFB2', fontSize: '13px' }}>⬡</span>
                  <p className="tlab-label" style={{ color: '#00FFB2' }}>
                    {isTrajectoryReady ? "HOSTING LAYER" : "CONNECTED MEMORY"}
                  </p>
                </div>
                <p className="text-sm leading-7" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {isTrajectoryReady
                    ? "The build coach can help choose the first stack, shape the launch page, and explain how to turn this into a preview on Vercel."
                    : portraitSummary
                      ? portraitSummary
                      : "If you used AI Companion or other InHero chats before, Trajectory can pull that history in and listen before generating a direction."}
                </p>
                {isTrajectoryReady && deployResult ? (
                  <p className="mt-3 text-xs font-medium px-3 py-2" style={{ color: 'rgba(0,255,178,0.9)', background: 'rgba(0,255,178,0.08)', borderRadius: '4px' }}>
                    {deployResult.previewUrl
                      ? `Preview available at ${deployResult.previewUrl}`
                      : `Next deploy target: ${deployResult.previewSlug} on ${deployResult.host}`}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ─── Trajectory Lab design system ─── */
        .tlab-root {
          position: relative;
          background-color: #0a0a0f;
          background-image:
            radial-gradient(1px 1px at 10% 15%, rgba(232,240,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 40%, rgba(232,240,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 8%, rgba(232,240,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 60%, rgba(232,240,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 25%, rgba(232,240,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 82% 72%, rgba(232,240,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 18%, rgba(232,240,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 18% 80%, rgba(232,240,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 85%, rgba(232,240,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 70%, rgba(232,240,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 45%, rgba(232,240,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 35%, rgba(0,255,178,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 55%, rgba(0,255,178,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 55%, rgba(232,240,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 12%, rgba(232,240,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 90%, rgba(232,240,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 75%, rgba(232,240,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 95%, rgba(232,240,255,0.2) 0%, transparent 100%);
          animation: tlab-twinkle 9s ease-in-out infinite alternate;
        }
        @keyframes tlab-twinkle {
          0%   { background-color: #0a0a0f; }
          50%  { background-color: #0b0b12; }
          100% { background-color: #0a0a0f; }
        }

        /* Glass card */
        .tlab-glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Signal card — dark glass with left teal accent border */
        .tlab-signal-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-left: 2px solid rgba(0,255,178,0.5);
          backdrop-filter: blur(8px);
        }

        /* Badge — monospace, no background pill */
        .tlab-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #00FFB2;
        }
        .tlab-badge-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00FFB2;
          box-shadow: 0 0 6px rgba(0,255,178,0.6);
          animation: tlab-pulse 2s ease-in-out infinite;
        }
        @keyframes tlab-pulse {
          0%, 100% { box-shadow: 0 0 4px rgba(0,255,178,0.5); }
          50%       { box-shadow: 0 0 12px rgba(0,255,178,0.9); }
        }

        /* Label — monospace uppercase tiny */
        .tlab-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* Tags */
        .tlab-tag {
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 2px 10px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          border-radius: 3px;
        }
        .tlab-tag-teal {
          border-color: rgba(0,255,178,0.2);
          color: rgba(0,255,178,0.8);
          background: rgba(0,255,178,0.06);
        }

        /* Buttons */
        .tlab-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          background: #00FFB2;
          color: #000;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
          text-decoration: none;
        }
        .tlab-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .tlab-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.75);
          background: transparent;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          text-decoration: none;
        }
        .tlab-btn-ghost:hover {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
          background: rgba(255,255,255,0.04);
        }

        .tlab-btn-run {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 10px 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          font-family: 'Space Mono', monospace;
          background: transparent;
          color: #00FFB2;
          border: 1px solid rgba(0,255,178,0.3);
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .tlab-btn-run:hover { background: rgba(0,255,178,0.07); border-color: rgba(0,255,178,0.5); }
        .tlab-btn-run:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Form inputs */
        .tlab-input {
          width: 100%;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 10px 14px;
          font-size: 13px;
          color: #fff;
          outline: none;
          font-family: 'Inter', system-ui, sans-serif;
          transition: border-color 0.15s;
        }
        .tlab-input::placeholder { color: rgba(255,255,255,0.2); }
        .tlab-input:focus { border-color: rgba(0,255,178,0.3); box-shadow: 0 0 0 1px rgba(0,255,178,0.1); }

        /* Chips */
        .tlab-chip {
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 3px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .tlab-chip:hover, .tlab-chip-hover-teal:hover {
          border-color: rgba(0,255,178,0.25);
          color: rgba(0,255,178,0.9);
          background: rgba(0,255,178,0.06);
        }
        .tlab-chip-teal {
          border-color: rgba(0,255,178,0.2);
          color: rgba(0,255,178,0.8);
          background: rgba(0,255,178,0.07);
        }
        .tlab-chip-sky {
          border-color: rgba(120,160,255,0.2);
          color: rgba(180,210,255,0.8);
          background: rgba(120,160,255,0.07);
        }
      `}</style>
    </div>
  );
}
