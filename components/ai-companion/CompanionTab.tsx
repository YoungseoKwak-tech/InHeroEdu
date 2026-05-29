"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/app/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { authFetch } from "@/lib/client-auth";
import type {
  TrajectoryAnalyzeRequest,
  TrajectoryAnalyzeResponse,
  TrajectoryBuildResponse,
  TrajectoryScaffoldResponse,
  TrajectoryDeployResponse,
} from "@/lib/trajectory-lab";
import UpgradePrompt from "@/components/ai-companion/UpgradePrompt";
import {
  EARLY_ACCESS_FALLBACK_MESSAGE,
  EARLY_ACCESS_LOADING_MESSAGE,
  getFeatureLimitMessage,
  getFeatureLockedMessage,
  getEarlyAccessDelayMs,
  hasReachedEarlyAccessLimit,
  incrementEarlyAccessUsage,
} from "@/lib/ai-access";

interface Msg {
  role: "user" | "assistant";
  content: string;
  variant?: "default" | "locked" | "fallback" | "limit";
  showCta?: boolean;
}
interface Profile {
  strengths: string[];
  interests: string[];
  college_adjustments: Record<string, unknown>;
}

interface TrajectoryState {
  analyze: TrajectoryAnalyzeResponse;
  build: TrajectoryBuildResponse;
  scaffold: TrajectoryScaffoldResponse;
  deploy: TrajectoryDeployResponse;
}

type CompanionMode = "education" | "secret";

const OPENERS: Record<CompanionMode, { ko: string; en: string }> = {
  education: {
    ko: "안녕하세요! 저는 InHero AI 컴패니언이에요 😊\n요즘 공부하면서 어떤 과목이 가장 재미있어요? 아니면 힘든 점이 있으면 편하게 얘기해줘요.",
    en: "Hi! I'm your InHero AI companion 😊\nWhat subject has been the most interesting lately? If anything feels hard, you can tell me that too.",
  },
  secret: {
    ko: "여기는 시크릿 모드예요.\n이 대화는 학습 로그나 상담 요약에 남지 않아요. 오늘 마음속에 제일 무거운 걸 편하게 말해줘도 돼요.",
    en: "This is Secret Mode.\nThis conversation does not go into your learning log or consultant summary. You can say the heaviest thing on your mind here.",
  },
};

const COPY = {
  ko: {
    modes: {
      education: {
        label: "Education Mode",
        title: "Study-aware support",
        body: "Learning concerns, motivation, and roadmap-aware conversation.",
      },
      secret: {
        label: "Secret Mode",
        title: "Private deep talk",
        body: "No learning-memory log. No consultant summary. Just private support.",
      },
    },
    safe: "💙 이 대화는 안전해요. 솔직하게 얘기해도 돼요.",
    secretSafe: "🤍 시크릿 모드예요. 이 대화는 학습 로그나 요약으로 남지 않아요.",
    consultantTitle: "컨설턴트 전달 내용",
    consultantNote: "원본 대화 미포함",
    consultantEmpty: "대화를 나눌수록 학생의 강점과 관심사가 자동으로 파악됩니다. 아직 충분한 대화가 없어요.",
    strengths: "학생 강점",
    interests: "관심 분야",
    roadmapCta: "🗺 대학 로드맵 생성",
    roadmapTitle: "대학 로드맵",
    roadmapFailed: "생성 실패",
    secretCard: "시크릿 모드에서는 어떤 내용도 상담 요약이나 학습 패턴 로그로 남지 않습니다.",
    trajectoryCta: "🚀 맞춤 빌드 방향 생성",
    trajectoryLoading: "학생 맞춤 build direction 생성 중...",
    trajectoryTitle: "Student Build Direction",
    trajectoryEmpty: "대화를 조금 더 쌓으면, 학생 관심사와 강점을 바탕으로 앱/웹/initiative 방향을 바로 제안합니다.",
    trajectoryFailed: "Trajectory generation failed.",
    trajectoryPreview: "Preview / Host direction",
    trajectoryFeatures: "First build features",
    trajectoryFlow: "Launch flow",
  },
  en: {
    modes: {
      education: {
        label: "Education Mode",
        title: "Study-aware support",
        body: "Learning concerns, motivation, and roadmap-aware conversation.",
      },
      secret: {
        label: "Secret Mode",
        title: "Private deep talk",
        body: "No learning-memory log. No consultant summary. Just private support.",
      },
    },
    safe: "💙 This conversation is safe. You can be honest here.",
    secretSafe: "🤍 Secret Mode is private. This conversation does not enter your learning log or summary.",
    consultantTitle: "Consultant Summary",
    consultantNote: "Original chat excluded",
    consultantEmpty: "As the conversation grows, the student's strengths and interests are detected automatically. There is not enough conversation yet.",
    strengths: "Student Strengths",
    interests: "Interest Areas",
    roadmapCta: "🗺 Generate College Roadmap",
    roadmapTitle: "College Roadmap",
    roadmapFailed: "Generation failed",
    secretCard: "Secret Mode keeps this conversation outside the student's learning memory, consultant summary, and pattern log.",
    trajectoryCta: "🚀 Generate Build Direction",
    trajectoryLoading: "Generating a student-specific build direction...",
    trajectoryTitle: "Student Build Direction",
    trajectoryEmpty: "Once the conversation has enough signal, InHero can turn the student's interests and strengths into an app, web, or initiative direction.",
    trajectoryFailed: "Trajectory generation failed.",
    trajectoryPreview: "Preview / host direction",
    trajectoryFeatures: "First build features",
    trajectoryFlow: "Launch flow",
  },
};

export default function CompanionTab() {
  const router = useRouter();
  const { lang: _lang } = useLang();
  // Platform is English-only — force English.
  void _lang;
  const lang = "en" as "en" | "ko";
  const tx = t[lang].aiCompanion.companion;
  const copy = COPY[lang];
  const [mode, setMode] = useState<CompanionMode>("education");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: OPENERS.education[lang] }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({ strengths: [], interests: [], college_adjustments: {} });
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [trajectory, setTrajectory] = useState<TrajectoryState | null>(null);
  const [trajectoryError, setTrajectoryError] = useState<string | null>(null);
  const [loadingTrajectory, setLoadingTrajectory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sessionStartRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const latestMsgsRef = useRef<Msg[]>([{ role: "assistant", content: OPENERS.education[lang] }]);
  const isSecretMode = mode === "secret";

  const compressAndSave = useCallback(async (messages: {role:string, content:string}[], subject: string) => {
    if (messages.length < 2) return;
    const durationMin = Math.round((Date.now() - sessionStartRef.current) / 60000);
    const rawSummary = messages.slice(-10).map(m => `${m.role}: ${m.content.slice(0, 120)}`).join('\n');
    try {
      await authFetch('/api/memory/compress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current, subject, durationMin: Math.max(1, durationMin), rawSummary }),
      });
    } catch {}
  }, []);

  useEffect(() => {
    latestMsgsRef.current = msgs;
  }, [msgs]);

  useEffect(() => {
    return () => {
      if (mode === "education") {
        compressAndSave(latestMsgsRef.current, "companion");
      }
    };
  }, [compressAndSave, mode]);

  useEffect(() => {
    if (mode === "education" && msgs.length > 0 && msgs.length % 8 === 0) {
      compressAndSave(msgs, "companion");
    }
  }, [msgs.length, compressAndSave, mode, msgs]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  useEffect(() => {
    setMsgs([{ role: "assistant", content: OPENERS[mode][lang] }]);
    setProfile({ strengths: [], interests: [], college_adjustments: {} });
    setRoadmap(null);
    setTrajectory(null);
    setTrajectoryError(null);
    sessionStartRef.current = Date.now();
    sessionIdRef.current = crypto.randomUUID();
  }, [mode, lang]);

  function setAssistantState(index: number, next: Partial<Msg>) {
    setMsgs((prev) => {
      if (!prev[index] || prev[index].role !== "assistant") return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], ...next };
      return updated;
    });
  }

  async function showEarlyAccessMessage(index: number, kind: "locked" | "fallback" | "limit") {
    const content = kind === "fallback"
      ? EARLY_ACCESS_FALLBACK_MESSAGE
      : kind === "limit"
        ? getFeatureLimitMessage("companion")
        : getFeatureLockedMessage("companion");

    await new Promise((resolve) => setTimeout(resolve, getEarlyAccessDelayMs()));
    setAssistantState(index, { content, variant: kind, showCta: true });
  }

  async function send() {
    if (!input.trim() || loading) return;
    const text = input.trim();
    const assistantIndex = msgs.length + 1;
    setInput("");
    setLoading(true);
    const history = msgs.map(m => ({ role: m.role, content: m.content }));
    setMsgs(prev => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: EARLY_ACCESS_LOADING_MESSAGE },
    ]);

    try {
      if (hasReachedEarlyAccessLimit("companion")) {
        await showEarlyAccessMessage(assistantIndex, "limit");
        return;
      }

      incrementEarlyAccessUsage("companion");
      const res = await authFetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, lang, mode }),
      });
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.status === "locked" || data.status === "fallback") {
          await showEarlyAccessMessage(assistantIndex, data.status);
          return;
        }
      }

      if (!res.body) {
        await showEarlyAccessMessage(assistantIndex, "locked");
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let hasText = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") continue;
          try {
            const ev = JSON.parse(raw);
            if (ev.type === "text") {
              hasText = hasText || Boolean(ev.content?.trim());
              setMsgs(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: ev.content, variant: "default", showCta: false };
                return next;
              });
            } else if (!isSecretMode && ev.type === "profile" && ev.data) {
              setProfile(prev => ({
                strengths: Array.from(new Set([...prev.strengths, ...(ev.data.strengths ?? [])])),
                interests: Array.from(new Set([...prev.interests, ...(ev.data.interests ?? [])])),
                college_adjustments: { ...prev.college_adjustments, ...(ev.data.college_adjustments ?? {}) },
              }));
            }
          } catch { /* skip */ }
        }
      }
      if (!hasText) {
        await showEarlyAccessMessage(assistantIndex, "locked");
      }
    } catch {
      await showEarlyAccessMessage(assistantIndex, "fallback");
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  async function generateRoadmap() {
    setLoadingRoadmap(true);
    setRoadmap(null);
    try {
      const res = await authFetch("/api/ai/companion/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, lang }),
      });
      const data = await res.json();
      if (data.status === "locked") {
        setRoadmap(getFeatureLockedMessage("trajectory"));
      } else if (data.status === "fallback") {
        setRoadmap(EARLY_ACCESS_FALLBACK_MESSAGE);
      } else {
        setRoadmap(data.roadmap ?? copy.roadmapFailed);
      }
    } finally {
      setLoadingRoadmap(false);
    }
  }

  function buildConversationSummary() {
    const recent = latestMsgsRef.current
      .filter((msg) => msg.role === "user")
      .slice(-4)
      .map((msg) => msg.content.trim())
      .filter(Boolean);

    return recent.join(" ").slice(0, 900);
  }

  async function generateTrajectory() {
    setLoadingTrajectory(true);
    setTrajectory(null);
    setTrajectoryError(null);

    const conversationSummary = buildConversationSummary();
    const interests = profile.interests.slice(0, 6);
    const strengths = profile.strengths.slice(0, 6);
    const keywords = Array.from(new Set([...interests, ...strengths])).slice(0, 8);

    if (hasReachedEarlyAccessLimit("trajectory")) {
      setTrajectory(null);
      setTrajectoryError(getFeatureLimitMessage("trajectory"));
      setLoadingTrajectory(false);
      return;
    }

    incrementEarlyAccessUsage("trajectory");

    const payload: TrajectoryAnalyzeRequest = {
      keywords,
      conversationSummary,
      activities: [],
      interests,
      strengths,
      frictions: [],
      heroCode: "CF",
      portraitSignals: [],
      lang,
    };

    try {
      const analyzeRes = await authFetch("/api/trajectory-lab/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const analyzeJson = await analyzeRes.json();
      if (!analyzeRes.ok || analyzeJson.status) {
        throw new Error(analyzeJson.message || analyzeJson.error || copy.trajectoryFailed);
      }

      const buildRes = await authFetch("/api/trajectory-lab/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trajectory: analyzeJson.trajectory,
          buildDirection: analyzeJson.buildDirection,
          recommendedFormat: analyzeJson.recommendedFormat,
          signalSummary: analyzeJson.signalSummary,
          suggestedProjectTypes: analyzeJson.suggestedProjectTypes,
          mvpConcept: analyzeJson.mvpConcept,
          lang,
        }),
      });
      const buildJson = await buildRes.json();
      if (!buildRes.ok || buildJson.status) {
        throw new Error(buildJson.message || buildJson.error || copy.trajectoryFailed);
      }

      const scaffoldRes = await authFetch("/api/trajectory-lab/scaffold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildJson),
      });
      const scaffoldJson = await scaffoldRes.json();
      if (!scaffoldRes.ok || scaffoldJson.status) {
        throw new Error(scaffoldJson.message || scaffoldJson.error || copy.trajectoryFailed);
      }

      const deployRes = await authFetch("/api/trajectory-lab/deploy", {
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
        throw new Error(deployJson.message || deployJson.error || copy.trajectoryFailed);
      }

      setTrajectory({
        analyze: analyzeJson,
        build: buildJson,
        scaffold: scaffoldJson,
        deploy: deployJson,
      });
    } catch (error) {
      setTrajectoryError(error instanceof Error ? error.message : copy.trajectoryFailed);
    } finally {
      setLoadingTrajectory(false);
    }
  }

  const hasProfile = profile.strengths.length > 0 || profile.interests.length > 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 md:grid-cols-2">
        {(["education", "secret"] as CompanionMode[]).map((modeOption) => {
          const modeCopy = copy.modes[modeOption];
          const active = mode === modeOption;
          return (
            <button
              key={modeOption}
              onClick={() => setMode(modeOption)}
              className={`rounded-[1.5rem] border p-5 text-left transition-all ${
                active
                  ? "border-primary-500 bg-primary-50/80 shadow-[0_14px_40px_rgba(16,185,129,0.12)] dark:bg-primary-900/20"
                  : "border-gray-200 bg-white hover:border-primary-200 dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              <p className="text-[11px] font-bold tracking-[0.22em] text-primary-500">{modeCopy.label}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-950 dark:text-white">{modeCopy.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{modeCopy.body}</p>
            </button>
          );
        })}
      </div>

      {/* Chat */}
      <div className="card overflow-hidden">
        <div className="h-[380px] overflow-y-auto p-5 space-y-4" id="companion-chat">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-base flex-shrink-0 mt-0.5">💙</div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary-500 text-white rounded-tr-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
              }`}>
                {m.content}
                {m.showCta && (
                  <UpgradePrompt
                    kind={m.variant === "limit" ? "limit" : m.variant === "fallback" ? "fallback" : "locked"}
                    feature="AI Companion"
                    freeCount={8}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={isSecretMode ? (lang === "ko" ? "아무 말이나 괜찮아요. 깊은 고민도 안전하게 얘기해도 돼요..." : "Anything is okay here. You can share the deep, messy version too...") : tx.placeholder}
            className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 dark:text-gray-100 placeholder:text-gray-400"
          />
          <button onClick={send} disabled={!input.trim() || loading} className="btn-primary text-sm py-2.5 px-4 rounded-xl disabled:opacity-50">{tx.send}</button>
        </div>
        <p className="text-xs text-gray-400 text-center pb-3">{isSecretMode ? copy.secretSafe : copy.safe}</p>
      </div>

      {isSecretMode ? (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🤍</span>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Secret Mode</h3>
          </div>
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">{copy.secretCard}</p>
        </div>
      ) : (
        <>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">🔒</span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">{copy.consultantTitle}</h3>
              <span className="text-xs text-gray-400 ml-auto">{copy.consultantNote}</span>
            </div>

            {!hasProfile ? (
              <p className="text-xs text-gray-400 leading-relaxed">{copy.consultantEmpty}</p>
            ) : (
              <div className="space-y-3 mb-4">
                {profile.strengths.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{copy.strengths}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.strengths.map(s => <Tag key={s} text={s} />)}
                    </div>
                  </div>
                )}
                {profile.interests.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{copy.interests}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.interests.map(s => <Tag key={s} text={s} color="emerald" />)}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={generateRoadmap}
              disabled={!hasProfile || loadingRoadmap}
              className="w-full btn-primary text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingRoadmap ? tx.thinking : copy.roadmapCta}
            </button>

            <button
              onClick={generateTrajectory}
              disabled={!hasProfile || loadingTrajectory}
              className="mt-3 w-full rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-gray-900 dark:text-primary-300 dark:hover:bg-primary-900/20"
            >
              {loadingTrajectory ? copy.trajectoryLoading : copy.trajectoryCta}
            </button>
          </div>

          {roadmap && (
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🏛</span> {copy.roadmapTitle}
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {roadmap}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🚀</span> {copy.trajectoryTitle}
            </h3>
            {trajectoryError ? (
              <p className="text-sm text-rose-500 dark:text-rose-300">{trajectoryError}</p>
            ) : trajectory ? (
              <div className="space-y-5 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">Trajectory</p>
                  <p className="mt-2 text-base font-semibold text-gray-950 dark:text-white">{trajectory.analyze.trajectory}</p>
                  <p className="mt-2 leading-7">{trajectory.analyze.buildDirection}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">MVP</p>
                  <p className="mt-2 text-base font-semibold text-gray-950 dark:text-white">{trajectory.build.productName}</p>
                  <p className="mt-1">{trajectory.build.tagline}</p>
                  <p className="mt-2 leading-7">{trajectory.build.problemStatement}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">{copy.trajectoryFeatures}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {trajectory.build.coreFeatures.map((feature) => (
                      <Tag key={feature} text={feature} color="emerald" />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">{copy.trajectoryFlow}</p>
                  <p className="mt-2 leading-7">{trajectory.build.userFlow.join(" → ")}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">{copy.trajectoryPreview}</p>
                  <p className="mt-2 leading-7">{trajectory.deploy.previewUrl ?? `https://${trajectory.deploy.previewSlug}.vercel.app`}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {trajectory.deploy.previewUrl ? (
                      <a
                        href={trajectory.deploy.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full bg-primary-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-600"
                      >
                        Open preview
                      </a>
                    ) : null}
                    <button
                      onClick={() => router.push("/trajectory-lab")}
                      className="inline-flex rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      Open Trajectory Lab
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">{copy.trajectoryEmpty}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Tag({ text, color = "primary" }: { text: string; color?: "primary" | "emerald" }) {
  const c = color === "emerald"
    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800"
    : "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-800";
  return <span className={`text-xs px-2.5 py-1 rounded-full border ${c}`}>{text}</span>;
}
