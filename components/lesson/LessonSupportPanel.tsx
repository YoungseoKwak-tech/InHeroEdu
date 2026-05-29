"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { authFetch } from "@/lib/client-auth";
import { trackLearningEventV1 } from "@/lib/learning-tracking-client";
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

type LessonLocale = "en" | "ko";
type MsgVariant = "default" | "locked" | "fallback" | "limit";

interface Msg {
  role: "user" | "assistant";
  content: string;
  variant?: MsgVariant;
  showCta?: boolean;
}

interface LessonSupportPanelProps {
  courseId: string;
  lessonId: string;
  courseName: string;
  lessonTitle: string;
  lessonScript?: string;
  lessonLang?: LessonLocale;
}

const COPY = {
  en: {
    channel: "MISSION CONTROL",
    status: "ONLINE · CHANNEL OPEN",
    tracking: "TRACKING",
    placeholder: "transmit a question...",
    safe: "Channel locked to this lesson · Grounded in your study pattern",
    quickPrompts: [
      "Summarize this section",
      "Explain the core mechanism",
      "Ask me one AP-style check question",
      "Say it in simpler words",
    ],
    quickPromptLabels: ["summarize", "explain mechanism", "quiz me", "simplify"],
    openFull: "expand",
    loading: "transmitting...",
    opener: (lessonTitle: string) =>
      `I am here with you while you watch "${lessonTitle}". Pause anytime and ask what is confusing, what matters most, or what you should notice for the AP exam.`,
  },
  ko: {
    channel: "MISSION CONTROL",
    status: "ONLINE · CHANNEL OPEN",
    tracking: "TRACKING",
    placeholder: "질문을 전송하세요...",
    safe: "이 강의 채널 · 학생 학습 패턴 기반",
    quickPrompts: [
      "방금 내용 요약해줘",
      "핵심 메커니즘 설명해줘",
      "AP 스타일 체크 문제 하나 내줘",
      "더 쉽게 다시 설명해줘",
    ],
    quickPromptLabels: ["요약", "메커니즘", "퀴즈 내줘", "쉽게 설명"],
    openFull: "확장",
    loading: "전송 중...",
    opener: (lessonTitle: string) =>
      `"${lessonTitle}" 강의를 보면서 바로 질문할 수 있어요. 멈추고 헷갈린 부분, 핵심 포인트, AP 시험에서 어떻게 나오는지 편하게 물어보세요.`,
  },
} as const;

function normalizeLessonScript(script?: string): string | undefined {
  if (!script) return undefined;
  const normalized = script.replace(/\s+/g, " ").trim();
  if (!normalized) return undefined;
  return normalized.slice(0, 7000);
}

// ── Tiny inline SVG icons (no extra dependencies) ────────────────────────
function IconSparkles({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.3 3.3l2 2M10.7 10.7l2 2M12.7 3.3l-2 2M5.3 10.7l-2 2"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IconZap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M9 1.5 3 9.5h4l-1 5 6-8H8l1-5Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function IconHelp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.2 6.2c.2-1.1 1.1-1.7 2-1.7 1.2 0 2 .8 2 1.7 0 1.5-2 1.5-2 2.6"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8.2" cy="11.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function IconChat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M2.5 4.5C2.5 3.4 3.4 2.5 4.5 2.5h7c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H7l-3 2.5V11.5c-.8 0-1.5-.7-1.5-1.5v-5.5Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function IconSend({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 10h13m0 0-4-4m4 4-4 4"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconExpand({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M9.5 2.5h4v4M13.5 2.5l-4.5 4.5M6.5 13.5h-4v-4M2.5 13.5l4.5-4.5"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const QUICK_ICONS = [IconSparkles, IconZap, IconHelp, IconChat] as const;

// ── Mini "satellite" avatar (orbital ring) ──────────────────────────────
function SatelliteAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      className="support-avatar relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #d1fae5 0%, #5eead4 38%, #134e4a 88%, #03110f 100%)",
          boxShadow: "0 0 12px rgba(94,234,212,0.35)",
        }}
      />
      <span
        className="support-avatar-ring absolute rounded-full border border-dashed border-cyan-300/35"
        style={{ inset: -3 }}
      />
    </span>
  );
}

export default function LessonSupportPanel({
  courseId,
  lessonId,
  courseName,
  lessonTitle,
  lessonScript,
  lessonLang: _lessonLang = "en",
}: LessonSupportPanelProps) {
  // Platform is English-only — pin the copy lookup to "en" even if the caller
  // forwards "ko". Network/AI hand-offs further down still use lessonLang
  // (held below) when calling the API.
  void _lessonLang;
  const lessonLang = "en" as const;
  const copy = COPY[lessonLang];
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: copy.opener(lessonTitle) },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const latestMsgsRef = useRef<Msg[]>([{ role: "assistant", content: copy.opener(lessonTitle) }]);
  const sessionStartRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const lessonScriptExcerpt = useMemo(() => normalizeLessonScript(lessonScript), [lessonScript]);

  const compressAndSave = useCallback(
    async (messages: { role: string; content: string }[]) => {
      if (messages.length < 2) return;
      const durationMin = Math.round((Date.now() - sessionStartRef.current) / 60000);
      const rawSummary = messages
        .slice(-10)
        .map((message) => `${message.role}: ${message.content.slice(0, 120)}`)
        .join("\n");
      try {
        await authFetch("/api/memory/compress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            subject: "lesson_support",
            durationMin: Math.max(1, durationMin),
            rawSummary,
          }),
        });
      } catch {
        // Non-blocking: keep lesson support resilient.
      }
    },
    []
  );

  useEffect(() => {
    latestMsgsRef.current = msgs;
  }, [msgs]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    setMsgs([{ role: "assistant", content: copy.opener(lessonTitle) }]);
    setInput("");
    setLoading(false);
    sessionStartRef.current = Date.now();
    sessionIdRef.current = crypto.randomUUID();
  }, [copy, lessonTitle]);

  useEffect(() => {
    return () => {
      compressAndSave(latestMsgsRef.current);
    };
  }, [compressAndSave]);

  useEffect(() => {
    if (msgs.length > 0 && msgs.length % 8 === 0) {
      compressAndSave(msgs);
    }
  }, [msgs, compressAndSave]);

  async function showEarlyAccessMessage(index: number, kind: MsgVariant) {
    const content =
      kind === "fallback"
        ? EARLY_ACCESS_FALLBACK_MESSAGE
        : kind === "limit"
          ? getFeatureLimitMessage("companion")
          : getFeatureLockedMessage("companion");

    await new Promise((resolve) => setTimeout(resolve, getEarlyAccessDelayMs()));
    setMsgs((prev) => {
      if (!prev[index] || prev[index].role !== "assistant") return prev;
      const next = [...prev];
      next[index] = { role: "assistant", content, variant: kind, showCta: true };
      return next;
    });
  }

  async function sendMessage(draft?: string) {
    const text = (draft ?? input).trim();
    if (!text || loading) return;

    const assistantIndex = msgs.length + 1;
    const history = msgs.map((message) => ({ role: message.role, content: message.content }));

    setLoading(true);
    setInput("");
    setMsgs((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: EARLY_ACCESS_LOADING_MESSAGE },
    ]);

    void trackLearningEventV1({
      schemaVersion: 1,
      sessionId: sessionIdRef.current,
      lessonId,
      courseId,
      subjectId: courseId,
      lessonLocale: lessonLang,
      eventType: "chat_message_sent",
      valueText: text,
      payload: {
        source: "lesson_support",
        historyCount: history.length,
      },
      clientTs: new Date().toISOString(),
    }).catch(() => {});

    try {
      if (hasReachedEarlyAccessLimit("companion")) {
        await showEarlyAccessMessage(assistantIndex, "limit");
        return;
      }

      incrementEarlyAccessUsage("companion");
      const res = await authFetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
          lang: lessonLang,
          mode: "education",
          context: {
            courseName,
            lessonTitle,
            lessonScript: lessonScriptExcerpt,
          },
        }),
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
      const decoder = new TextDecoder();
      let buffer = "";
      let hasText = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") continue;
          try {
            const event = JSON.parse(raw);
            if (event.type !== "text") continue;
            hasText = hasText || Boolean(event.content?.trim());
            setMsgs((prev) => {
              const next = [...prev];
              next[next.length - 1] = {
                role: "assistant",
                content: event.content,
                variant: "default",
                showCta: false,
              };
              return next;
            });
          } catch {
            // Skip malformed chunks.
          }
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

  return (
    <>
      <div className="relative isolate flex h-full min-h-[32rem] flex-col overflow-hidden rounded-xl border border-cyan-300/15 bg-[#0a0e1a]/90 backdrop-blur-xl">
        {/* Top hairline glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(94,234,212,0.7),transparent)]" />

        {/* Faint cosmic backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(94,234,212,0.10),transparent_38%),radial-gradient(circle_at_88%_92%,rgba(56,114,167,0.10),transparent_42%)]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(215,227,255,0.85) 0.6px, transparent 0.6px), radial-gradient(rgba(120,255,216,0.45) 0.4px, transparent 0.4px)",
              backgroundSize: "26px 26px, 37px 37px",
              backgroundPosition: "0 0, 13px 18px",
            }}
          />
        </div>

        <div className="relative z-10 flex h-full min-h-0 flex-col">
          {/* ── HUD HEADER ───────────────────────────────────────────── */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <SatelliteAvatar size={30} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/85">
                  <span className="support-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{copy.channel}</span>
                </div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  ● {copy.status}
                </div>
              </div>
            </div>

            <Link
              href="/ai-companion"
              className="group inline-flex items-center gap-1.5 rounded px-1.5 py-1 text-cyan-300/60 transition hover:text-cyan-200"
              aria-label={copy.openFull}
            >
              <IconExpand className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition group-hover:opacity-100">
                {copy.openFull}
              </span>
            </Link>
          </div>

          {/* ── TRACKING TICKER ─────────────────────────────────────── */}
          <div className="border-b border-white/5 px-4 py-2">
            <div className="group flex items-center gap-2 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/45 transition hover:text-cyan-200/85">
              <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-cyan-300/80" />
              <span className="shrink-0">◉ {copy.tracking}</span>
              <span className="text-slate-500/70">·</span>
              <span className="truncate text-slate-300/80 group-hover:text-cyan-100/95">{lessonTitle}</span>
              <span className="text-slate-500/70">·</span>
              <span className="shrink-0 text-slate-400/70">{courseName}</span>
            </div>
          </div>

          {/* ── CHAT STREAM ─────────────────────────────────────────── */}
          <div
            className="support-chat-area min-h-0 flex-1 overflow-y-auto px-4 py-4 support-chat-scroll"
            style={{
              maskImage:
                "linear-gradient(180deg, transparent 0, #000 18px, #000 calc(100% - 4px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0, #000 18px, #000 calc(100% - 4px), transparent 100%)",
            }}
          >
            <div>
              {msgs.map((message, index) => {
                const prev = index > 0 ? msgs[index - 1] : null;
                const next = index + 1 < msgs.length ? msgs[index + 1] : null;
                const isUser = message.role === "user";
                const samePrev = prev?.role === message.role;
                const sameNext = next?.role === message.role;
                const showAvatar = !isUser && !samePrev;
                const isLoadingMessage =
                  !isUser &&
                  loading &&
                  index === msgs.length - 1 &&
                  message.content === EARLY_ACCESS_LOADING_MESSAGE;

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`support-bubble-in flex ${isUser ? "justify-end" : "justify-start"}`}
                    style={{ marginTop: index === 0 ? 0 : samePrev ? 4 : 14 }}
                  >
                    <div
                      className={`flex max-w-[88%] items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
                    >
                      {!isUser && (
                        <div className="mb-0.5 flex w-6 shrink-0 justify-center">
                          {showAvatar ? <SatelliteAvatar size={22} /> : null}
                        </div>
                      )}

                      <div
                        className={[
                          "relative px-3.5 py-2.5 text-sm leading-6 whitespace-pre-wrap rounded-lg",
                          isUser
                            ? "bg-[rgba(94,234,212,0.12)] border border-cyan-300/25 text-cyan-50"
                            : "bg-[rgba(94,234,212,0.06)] border border-cyan-300/15 text-slate-100",
                          samePrev ? (isUser ? "rounded-tr-sm" : "rounded-tl-sm") : "",
                          sameNext ? (isUser ? "rounded-br-sm" : "rounded-bl-sm") : "",
                        ].join(" ")}
                      >
                        {isLoadingMessage ? (
                          <div className="flex items-center gap-2">
                            <span className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <span
                                  key={i}
                                  className="support-typing-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-300"
                                  style={{ animationDelay: `${i * 140}ms` }}
                                />
                              ))}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/70">
                              {copy.loading}
                            </span>
                          </div>
                        ) : (
                          <div>{message.content}</div>
                        )}

                        {message.showCta && (
                          <div className="mt-3">
                            <UpgradePrompt
                              kind={
                                message.variant === "limit"
                                  ? "limit"
                                  : message.variant === "fallback"
                                    ? "fallback"
                                    : "locked"
                              }
                              feature="AI Companion"
                              freeCount={8}
                            />
                          </div>
                        )}

                        {!isUser && !samePrev && (
                          <span className="pointer-events-none absolute -bottom-4 left-0 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300/40">
                            transmitted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* ── QUICK SLASH CHIPS ───────────────────────────────────── */}
          <div className="px-4 pt-2">
            <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 support-chat-scroll">
              {copy.quickPrompts.map((prompt, index) => {
                const Icon = QUICK_ICONS[index] ?? IconSparkles;
                const label = copy.quickPromptLabels[index] ?? prompt;
                return (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    disabled={loading}
                    className="support-chip group relative inline-flex shrink-0 items-center gap-1.5 rounded-md border border-cyan-300/15 bg-transparent px-2.5 py-1.5 font-mono text-[11px] tracking-tight text-cyan-200/75 transition disabled:opacity-40"
                  >
                    <Icon className="h-3 w-3 opacity-70 transition group-hover:opacity-100" />
                    <span className="text-slate-500/80 group-hover:text-cyan-300/90 transition">/</span>
                    <span className="transition group-hover:text-cyan-50">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── COMPOSER (bare textarea + bottom cyan line) ─────────── */}
          <div className="px-4 pt-1">
            <div className="support-composer relative">
              <textarea
                ref={textareaRef}
                rows={2}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder={copy.placeholder}
                className="support-textarea peer w-full resize-none border-0 bg-transparent py-2.5 pr-9 text-sm italic text-white placeholder:italic placeholder:text-slate-500/70 focus:outline-none focus:ring-0"
              />
              <span className="support-composer-line pointer-events-none absolute inset-x-0 bottom-0 h-px bg-cyan-300/20 transition" />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={!input.trim() || loading}
                aria-label="Transmit"
                className="absolute bottom-2 right-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-cyan-300/70 transition hover:bg-cyan-300/8 hover:text-cyan-200 hover:shadow-[0_0_14px_rgba(94,234,212,0.35)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
              >
                <IconSend className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── FOOTER (hairline + tiny mono safe text) ─────────────── */}
          <div className="mt-2 border-t border-white/5 px-4 py-2 text-center">
            <p className="font-mono text-[10px] tracking-[0.05em] text-slate-500/75">
              {copy.safe}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .support-bubble-in {
          animation: supportBubbleIn 200ms ease-out both;
        }
        .support-chat-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(94, 234, 212, 0.25) transparent;
        }
        .support-chat-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .support-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .support-chat-scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(94, 234, 212, 0.22);
        }
        @keyframes supportBubbleIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .support-pulse-dot {
          box-shadow: 0 0 8px rgba(94, 234, 212, 0.65);
          animation: supportPulse 1.6s ease-in-out infinite;
        }
        @keyframes supportPulse {
          0%, 100% { opacity: 0.55; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }

        .support-avatar-ring {
          animation: supportOrbit 14s linear infinite;
        }
        @keyframes supportOrbit {
          to { transform: rotate(360deg); }
        }

        .support-typing-dot {
          animation: supportTyping 1.1s ease-in-out infinite;
          opacity: 0.4;
        }
        @keyframes supportTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%           { transform: translateY(-3px); opacity: 1; }
        }

        .support-chip:hover:not(:disabled) {
          border-color: rgba(94, 234, 212, 0.45);
          box-shadow: 0 0 14px rgba(94, 234, 212, 0.25);
        }
        .support-chip:active:not(:disabled) { transform: translateY(0.5px); }

        .support-textarea:focus ~ .support-composer-line,
        .support-composer:focus-within .support-composer-line {
          background: rgba(94, 234, 212, 0.85);
          height: 2px;
          box-shadow: 0 0 14px rgba(94, 234, 212, 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .support-bubble-in,
          .support-pulse-dot,
          .support-avatar-ring,
          .support-typing-dot { animation: none; }
        }
      `}</style>
    </>
  );
}
