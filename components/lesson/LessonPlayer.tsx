"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { authFetch } from "@/lib/client-auth";
import type {
  LessonPart,
  LessonPlayerData,
  VideoPart,
  SparkPart,
  GapCrunchPart,
  TeachBackPart,
  QuestionSprintPart,
  AnalyzerPart,
  GapLabel,
} from "@/lib/lesson-player-types";

// ─── Minimal YouTube IFrame API types ────────────────────────────────────────
interface YTPlayerInstance {
  pauseVideo(): void;
  playVideo(): void;
  destroy(): void;
}
interface YTStateEvent {
  data: number;
}
declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: YTStateEvent) => void;
          };
        }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// ─── YouTube API script loader (singleton across re-renders) ─────────────────
let _ytPromise: Promise<void> | null = null;
function loadYTScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (_ytPromise) return _ytPromise;
  _ytPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) { resolve(); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
  return _ytPromise;
}

function extractYouTubeId(src: string): string | null {
  const m = src.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return m?.[1] ?? null;
}

// ─── YouTubeVideo ─────────────────────────────────────────────────────────────
function YouTubeVideo({
  videoId,
  onEnded,
  blocked,
}: {
  videoId: string;
  onEnded: () => void;
  blocked: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const onEndedRef = useRef(onEnded);
  useEffect(() => { onEndedRef.current = onEnded; }, [onEnded]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    let mounted = true;
    const playerDiv = document.createElement("div");
    wrapperRef.current.appendChild(playerDiv);

    loadYTScript().then(() => {
      if (!mounted) return;
      playerRef.current = new window.YT.Player(playerDiv, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: (e) => {
            if (e.data === 0) onEndedRef.current(); // 0 = ENDED
          },
        },
      });
    });

    return () => {
      mounted = false;
      try { playerRef.current?.destroy(); } catch { /* noop */ }
      playerRef.current = null;
      if (playerDiv.parentNode) playerDiv.parentNode.removeChild(playerDiv);
    };
  }, [videoId]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0"
      style={{ pointerEvents: blocked ? "none" : "auto" }}
    />
  );
}

// ─── HTML5Video ───────────────────────────────────────────────────────────────
function HTML5Video({
  src,
  onEnded,
  blocked,
}: {
  src: string;
  onEnded: () => void;
  blocked: boolean;
}) {
  return (
    <video
      key={src}
      src={src}
      controls
      autoPlay
      playsInline
      onEnded={onEnded}
      className="absolute inset-0 w-full h-full object-contain bg-black"
      style={{ pointerEvents: blocked ? "none" : "auto" }}
    />
  );
}

// ─── SPARK overlay ────────────────────────────────────────────────────────────
function SparkOverlay({
  part,
  onSubmit,
}: {
  part: SparkPart;
  onSubmit: (response: string) => void;
}) {
  const [text, setText] = useState("");
  return (
    <div className="lp-overlay-card">
      <div className="lp-badge lp-badge-spark">⚡ SPARK</div>
      <p className="lp-overlay-hint">No right or wrong — just think out loud</p>
      <p className="lp-overlay-prompt">{part.prompt}</p>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your thoughts…"
        autoFocus
        className="lp-textarea"
      />
      <button
        onClick={() => text.trim() && onSubmit(text.trim())}
        disabled={!text.trim()}
        className="lp-btn lp-btn-spark"
      >
        Continue →
      </button>
    </div>
  );
}

// ─── GAP CRUNCH overlay ───────────────────────────────────────────────────────
function GapCrunchOverlay({
  part,
  onSubmit,
}: {
  part: GapCrunchPart;
  onSubmit: (response: string, isCorrect: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correctIdx = part.options.indexOf(part.correct);
  const isCorrect = submitted && selected === correctIdx;

  return (
    <div className="lp-overlay-card">
      <div className="lp-badge lp-badge-gap">⚡ GAP CRUNCH</div>
      <p className="lp-overlay-hint">Spot the correct framing</p>
      <div className="lp-gap-statement">
        <p className="lp-gap-label">KEY INSIGHT</p>
        <p className="lp-gap-text">{part.statement}</p>
      </div>
      <p className="lp-overlay-hint" style={{ marginBottom: "0.5rem" }}>Which statement is correct?</p>
      <div className="lp-options">
        {part.options.map((opt, i) => {
          let cls = "lp-option";
          if (submitted) {
            cls += i === correctIdx ? " lp-option-correct" : i === selected ? " lp-option-wrong" : " lp-option-dim";
          } else if (selected === i) {
            cls += " lp-option-selected-gap";
          }
          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={cls}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {submitted && (
        <p className={`lp-feedback ${isCorrect ? "lp-feedback-ok" : "lp-feedback-err"}`}>
          {isCorrect ? "✓ Correct! You identified the right framing." : "✗ The correct answer is highlighted in green above."}
        </p>
      )}
      {!submitted ? (
        <button
          onClick={() => selected !== null && setSubmitted(true)}
          disabled={selected === null}
          className="lp-btn lp-btn-gap"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={() => onSubmit(part.options[selected!], isCorrect)}
          className={`lp-btn ${isCorrect ? "lp-btn-ok" : "lp-btn-gap"}`}
        >
          {isCorrect ? "Continue →" : "Continue Anyway →"}
        </button>
      )}
    </div>
  );
}

// ─── TEACH BACK overlay ───────────────────────────────────────────────────────
function TeachBackOverlay({
  part,
  onSubmit,
}: {
  part: TeachBackPart;
  onSubmit: (response: string) => void;
}) {
  const [text, setText] = useState("");
  const enough = text.trim().length >= 30;
  return (
    <div className="lp-overlay-card">
      <div className="lp-badge lp-badge-teach">🎓 TEACH BACK</div>
      <p className="lp-overlay-hint">Explain it in your own words</p>
      <p className="lp-overlay-prompt">{part.prompt}</p>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Explain it as if you're teaching someone else…"
        autoFocus
        className="lp-textarea"
      />
      <p className="lp-char-hint">{text.trim().length}/30 min characters</p>
      <button
        onClick={() => enough && onSubmit(text.trim())}
        disabled={!enough}
        className="lp-btn lp-btn-teach"
      >
        Submit Explanation →
      </button>
    </div>
  );
}

// ─── QUESTION SPRINT overlay ──────────────────────────────────────────────────
const OPT_LABELS = ["A", "B", "C", "D", "E"];

type SprintPhase = "selecting" | "wrong" | "correct";

function QuestionSprintOverlay({
  part,
  onSubmit,
}: {
  part: QuestionSprintPart;
  onSubmit: (response: string, isCorrect: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<SprintPhase>("selecting");
  const [hasRetried, setHasRetried] = useState(false);
  // Store which option triggered the feedback (survives the retry reset)
  const [submittedAt, setSubmittedAt] = useState<number | null>(null);

  function handleSubmit() {
    if (selected === null) return;
    const correct = selected === part.correct;
    setSubmittedAt(selected);
    setPhase(correct ? "correct" : "wrong");
  }

  function handleRetry() {
    setHasRetried(true);
    setSelected(null);
    setPhase("selecting");
  }

  function optionClass(i: number): string {
    const base = "lp-option";
    if (phase === "selecting") return selected === i ? `${base} lp-option-selected-sprint` : base;
    if (i === part.correct) return `${base} lp-option-correct`;
    if (i === submittedAt && i !== part.correct) return `${base} lp-option-wrong`;
    return `${base} lp-option-dim`;
  }

  return (
    <div className="lp-overlay-card">
      <div className="lp-badge lp-badge-sprint">🏃 QUESTION SPRINT</div>
      <p className="lp-overlay-prompt" style={{ fontSize: "0.9rem" }}>{part.question}</p>
      <div className="lp-options">
        {part.options.map((opt, i) => (
          <button
            key={i}
            disabled={phase !== "selecting"}
            onClick={() => setSelected(i)}
            className={optionClass(i)}
          >
            <span className="lp-opt-label">{OPT_LABELS[i]}</span>
            {opt}
          </button>
        ))}
      </div>

      {phase === "correct" && (
        <div className="lp-feedback-box lp-feedback-box-ok">
          <p className="lp-feedback lp-feedback-ok">✓ Correct!</p>
          <p className="lp-feedback-body">{part.explanation}</p>
        </div>
      )}
      {phase === "wrong" && (
        <div className="lp-feedback-box lp-feedback-box-err">
          <p className="lp-feedback lp-feedback-err">✗ Not quite</p>
          <p className="lp-feedback-body">{part.wrongPattern}</p>
        </div>
      )}

      {phase === "selecting" && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="lp-btn lp-btn-sprint"
        >
          Submit Answer
        </button>
      )}
      {phase === "correct" && (
        <button
          onClick={() => onSubmit(part.options[submittedAt!], true)}
          className="lp-btn lp-btn-ok"
        >
          Continue →
        </button>
      )}
      {phase === "wrong" && (
        <div className="lp-row">
          {!hasRetried && (
            <button onClick={handleRetry} className="lp-btn lp-btn-ghost">
              Try Again
            </button>
          )}
          <button
            onClick={() => onSubmit(part.options[submittedAt!], false)}
            className={`lp-btn lp-btn-gap ${!hasRetried ? "lp-btn-half" : ""}`}
          >
            Move On →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ANALYZER overlay ─────────────────────────────────────────────────────────
const GAP_THEME: Record<GapLabel, { bg: string; border: string; color: string; icon: string }> = {
  "CONCEPT GAP":     { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.28)",  color: "#60A5FA", icon: "🧠" },
  "LANGUAGE GAP":    { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.28)",  color: "#C084FC", icon: "💬" },
  "LOGIC GAP":       { bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.28)",  color: "#FB923C", icon: "🔗" },
  "APPLICATION GAP": { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.28)",  color: "#34D399", icon: "🎯" },
};

function AnalyzerOverlay({
  part,
  onContinue,
}: {
  part: AnalyzerPart;
  onContinue: () => void;
}) {
  const theme = GAP_THEME[part.gapType] ?? GAP_THEME["CONCEPT GAP"];
  return (
    <div className="lp-overlay-card">
      <div className="lp-badge lp-badge-analyzer">🔬 ANALYZER</div>
      <p className="lp-overlay-hint">Pattern detected in your responses</p>
      <div
        className="lp-analyzer-box"
        style={{ background: theme.bg, borderColor: theme.border }}
      >
        <div className="lp-analyzer-head">
          <span className="lp-analyzer-icon">{theme.icon}</span>
          <span className="lp-analyzer-gap" style={{ color: theme.color }}>{part.gapType}</span>
        </div>
        <p className="lp-analyzer-msg">{part.message}</p>
      </div>
      <p className="lp-char-hint" style={{ textAlign: "center" }}>Saved to your learning profile.</p>
      <button
        onClick={onContinue}
        className="lp-btn"
        style={{ background: theme.border, color: "#fff" }}
      >
        Got it →
      </button>
    </div>
  );
}

// ─── LessonPlayer ─────────────────────────────────────────────────────────────
interface LessonPlayerProps {
  lesson: LessonPlayerData;
  onComplete?: () => void;
  /** Called when a video part ends. Parent receives the video-section index (0-based)
   *  and an `advance` fn to call when it's ready to continue (e.g. after showing a
   *  DB overlay). If omitted, the player advances immediately. */
  onVideoPartEnd?: (sectionIdx: number, advance: () => void) => void;
}

export default function LessonPlayer({ lesson, onComplete, onVideoPartEnd }: LessonPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const videoPartsPlayedRef = useRef(0);

  const isComplete = currentIdx >= lesson.parts.length;
  const currentPart: LessonPart | null = isComplete ? null : lesson.parts[currentIdx];
  const isOverlay = !!currentPart && currentPart.type !== "video";

  // Background video: the most recent video part we have already played
  const bgVideoPart = useMemo<VideoPart | null>(() => {
    for (let i = Math.min(currentIdx, lesson.parts.length - 1); i >= 0; i--) {
      if (lesson.parts[i].type === "video") return lesson.parts[i] as VideoPart;
    }
    return null;
  }, [lesson.parts, currentIdx]);

  // Active video: current if it's a video part, else the last video we saw
  const activeVideoPart: VideoPart | null = useMemo(() => {
    if (currentPart?.type === "video") return currentPart as VideoPart;
    return bgVideoPart;
  }, [currentPart, bgVideoPart]);

  // Resolve YouTube ID from src or explicit field
  const youtubeId: string | null = useMemo(() => {
    if (!activeVideoPart) return null;
    return activeVideoPart.youtubeId ?? extractYouTubeId(activeVideoPart.src ?? "");
  }, [activeVideoPart]);

  const isDirectVideo = !!(activeVideoPart && !youtubeId);

  // Progress
  const totalParts = lesson.parts.length;
  const progress = isComplete ? 100 : (currentIdx / totalParts) * 100;
  const interactiveParts = lesson.parts.filter((p) => p.type !== "video");
  const completedInteractive = lesson.parts
    .slice(0, currentIdx)
    .filter((p) => p.type !== "video").length;
  const videoCount = lesson.parts.filter((p) => p.type === "video").length;
  const completedVideos = lesson.parts
    .slice(0, currentIdx)
    .filter((p) => p.type === "video").length;

  // Trigger overlay fade-in when an overlay part becomes current
  useEffect(() => {
    if (isOverlay) {
      // Small delay so the DOM paints first (ensures transition is visible)
      const id = requestAnimationFrame(() => setOverlayVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setOverlayVisible(false);
    }
  }, [isOverlay, currentIdx]);

  useEffect(() => {
    if (isComplete) onComplete?.();
  }, [isComplete, onComplete]);

  // ── Advance ───────────────────────────────────────────────────────────────
  function advance() {
    setOverlayVisible(false);
    // Wait for overlay fade-out, then step forward
    setTimeout(() => setCurrentIdx((i) => i + 1), 280);
  }

  // ── Save progress (fire-and-forget) ──────────────────────────────────────
  const saveProgress = useCallback(
    (partId: string, overlayType: string, response: string, isCorrect: boolean) => {
      authFetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          partId,
          overlayType,
          studentResponse: response,
          isCorrect,
        }),
      }).catch(() => {});
    },
    [lesson.id]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleVideoEnded() {
    const sectionIdx = videoPartsPlayedRef.current;
    videoPartsPlayedRef.current += 1;
    if (onVideoPartEnd) {
      onVideoPartEnd(sectionIdx, advance);
    } else {
      advance();
    }
  }

  function handleSpark(response: string) {
    saveProgress(currentPart!.id, "SPARK", response, true);
    advance();
  }

  function handleGapCrunch(response: string, isCorrect: boolean) {
    saveProgress(currentPart!.id, "GAP_CRUNCH", response, isCorrect);
    advance();
  }

  function handleTeachBack(response: string) {
    saveProgress(currentPart!.id, "TEACH_BACK", response, true);
    advance();
  }

  function handleQuestionSprint(response: string, isCorrect: boolean) {
    saveProgress(currentPart!.id, "QUESTION_SPRINT", response, isCorrect);
    advance();
  }

  function handleAnalyzer() {
    saveProgress(currentPart!.id, "ANALYZER", "", true);
    advance();
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="lp-root">
      {/* ── Progress bar ── */}
      <div className="lp-topbar">
        <div className="lp-topbar-inner">
          <span className="lp-topbar-title">{lesson.title}</span>
          <div className="lp-progress-track">
            <div className="lp-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="lp-topbar-count">
            {isOverlay
              ? `Check-in ${completedInteractive + 1}/${interactiveParts.length}`
              : `Part ${completedVideos + 1}/${videoCount}`}
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="lp-body">
        {isComplete ? (
          /* ── Completion state ── */
          <div className="lp-complete">
            <div className="lp-complete-icon">🎓</div>
            <h2 className="lp-complete-title">Lesson Complete</h2>
            <p className="lp-complete-sub">
              You finished all {interactiveParts.length} check-in
              {interactiveParts.length !== 1 ? "s" : ""} for this lesson.
            </p>
            <button
              onClick={() => { setCurrentIdx(0); setOverlayVisible(false); }}
              className="lp-btn lp-btn-ghost lp-btn-replay"
            >
              ↺ Replay Lesson
            </button>
          </div>
        ) : (
          /* ── Video + overlay ── */
          <div className="lp-player-wrap">
            <div className="lp-video-shell">
              {/* Video layer */}
              {activeVideoPart ? (
                youtubeId ? (
                  <YouTubeVideo
                    key={activeVideoPart.id}
                    videoId={youtubeId}
                    onEnded={handleVideoEnded}
                    blocked={isOverlay}
                  />
                ) : (
                  <HTML5Video
                    key={activeVideoPart.id}
                    src={activeVideoPart.src ?? ""}
                    onEnded={handleVideoEnded}
                    blocked={isOverlay}
                  />
                )
              ) : (
                <div className="lp-no-video">
                  <span style={{ color: "#444" }}>No video</span>
                </div>
              )}

              {/* Overlay layer */}
              {isOverlay && (
                <div
                  className="lp-overlay-backdrop"
                  style={{
                    opacity: overlayVisible ? 1 : 0,
                    transform: overlayVisible ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  <div className="lp-overlay-scroll">
                    {currentPart.type === "SPARK" && (
                      <SparkOverlay
                        part={currentPart as SparkPart}
                        onSubmit={handleSpark}
                      />
                    )}
                    {currentPart.type === "GAP_CRUNCH" && (
                      <GapCrunchOverlay
                        part={currentPart as GapCrunchPart}
                        onSubmit={handleGapCrunch}
                      />
                    )}
                    {currentPart.type === "TEACH_BACK" && (
                      <TeachBackOverlay
                        part={currentPart as TeachBackPart}
                        onSubmit={handleTeachBack}
                      />
                    )}
                    {currentPart.type === "QUESTION_SPRINT" && (
                      <QuestionSprintOverlay
                        part={currentPart as QuestionSprintPart}
                        onSubmit={handleQuestionSprint}
                      />
                    )}
                    {currentPart.type === "ANALYZER" && (
                      <AnalyzerOverlay
                        part={currentPart as AnalyzerPart}
                        onContinue={handleAnalyzer}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Status strip below video */}
            <div className="lp-status-strip">
              {!isOverlay && currentPart?.type === "video" ? (
                <>
                  <span className="lp-pulse" />
                  <span className="lp-status-text">
                    Playing part {completedVideos + 1} of {videoCount}
                    {(currentPart as VideoPart).duration
                      ? ` · ${(currentPart as VideoPart).duration}`
                      : ""}
                  </span>
                </>
              ) : isOverlay ? (
                <>
                  <span className="lp-dot-yellow" />
                  <span className="lp-status-text">
                    {currentPart.type === "SPARK" && "Spark — reflection"}
                    {currentPart.type === "GAP_CRUNCH" && "Gap Crunch — spot the misconception"}
                    {currentPart.type === "TEACH_BACK" && "Teach Back — explain in your own words"}
                    {currentPart.type === "QUESTION_SPRINT" && "Question Sprint — test your knowledge"}
                    {currentPart.type === "ANALYZER" && "Analyzer — reviewing your pattern"}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* ── Styles ── */}
      <style>{`
        .lp-root {
          background: #0a0a0a;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          color: #fff;
        }

        /* Top bar — offset by 4rem (64px) to sit below the site Navbar */
        .lp-topbar {
          position: sticky;
          top: 4rem;
          z-index: 30;
          background: #111;
          border-bottom: 1px solid #1f1f1f;
          padding: 0.6rem 1rem;
        }
        .lp-topbar-inner {
          max-width: 52rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .lp-topbar-title {
          font-size: 0.7rem;
          color: #555;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 180px;
        }
        .lp-progress-track {
          flex: 1;
          height: 4px;
          border-radius: 9999px;
          background: #222;
          overflow: hidden;
        }
        .lp-progress-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #00FFB2, #00D9FF);
          transition: width 0.5s ease;
        }
        .lp-topbar-count {
          font-size: 0.7rem;
          color: #555;
          white-space: nowrap;
        }

        /* Body */
        .lp-body {
          max-width: 52rem;
          margin: 0 auto;
          padding: 1.5rem 1rem 3rem;
        }

        /* Video shell */
        .lp-player-wrap { display: flex; flex-direction: column; gap: 0.75rem; }
        .lp-video-shell {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 1rem;
          overflow: hidden;
        }
        .lp-no-video {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: #0f0f0f;
        }

        /* Overlay backdrop */
        .lp-overlay-backdrop {
          position: absolute; inset: 0;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          transition: opacity 0.28s ease, transform 0.28s ease;
          z-index: 10;
          overflow-y: auto;
        }
        .lp-overlay-scroll {
          width: 100%;
          max-width: 28rem;
        }

        /* Overlay card shared */
        .lp-overlay-card {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .lp-overlay-hint {
          font-size: 0.7rem;
          color: #555;
          margin-top: 0.3rem;
          margin-bottom: 0.9rem;
        }
        .lp-overlay-prompt {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.55;
          color: #f1f1f1;
          margin-bottom: 1rem;
        }

        /* Badges */
        .lp-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          border: 1px solid;
          width: fit-content;
        }
        .lp-badge-spark   { background: rgba(255,214,0,0.1);  color: #FFD600; border-color: rgba(255,214,0,0.25); }
        .lp-badge-gap     { background: rgba(239,68,68,0.1);  color: #F87171; border-color: rgba(239,68,68,0.25); }
        .lp-badge-teach   { background: rgba(59,130,246,0.1); color: #60A5FA; border-color: rgba(59,130,246,0.25); }
        .lp-badge-sprint  { background: rgba(167,139,250,0.1);color: #A78BFA; border-color: rgba(167,139,250,0.25); }
        .lp-badge-analyzer{ background: rgba(255,255,255,0.05);color: #888;   border-color: rgba(255,255,255,0.12); }

        /* Textarea */
        .lp-textarea {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #2a2a2a;
          background: #141414;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #e5e5e5;
          resize: none;
          outline: none;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .lp-textarea:focus { border-color: #3a3a3a; }
        .lp-textarea::placeholder { color: #3a3a3a; }
        .lp-char-hint { font-size: 0.65rem; color: #444; margin-top: 0.3rem; margin-bottom: 0.75rem; }

        /* Options list */
        .lp-options { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .lp-option {
          width: 100%;
          text-align: left;
          padding: 0.7rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #222;
          background: #111;
          color: #ddd;
          font-size: 0.83rem;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .lp-option:not(:disabled):hover { border-color: #333; background: #161616; }
        .lp-option:disabled { cursor: default; }
        .lp-option-selected-gap    { border-color: #F87171 !important; background: rgba(239,68,68,0.1) !important; }
        .lp-option-selected-sprint { border-color: #A78BFA !important; background: rgba(167,139,250,0.1) !important; }
        .lp-option-correct { border-color: #4ade80 !important; background: rgba(74,222,128,0.08) !important; color: #4ade80 !important; }
        .lp-option-wrong   { border-color: #f87171 !important; background: rgba(248,113,113,0.08) !important; color: #f87171 !important; }
        .lp-option-dim     { opacity: 0.35; }
        .lp-opt-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 700;
          flex-shrink: 0;
          background: rgba(255,255,255,0.07);
          color: #aaa;
        }

        /* GAP statement block */
        .lp-gap-statement {
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.18);
          margin-bottom: 0.85rem;
        }
        .lp-gap-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; color: #666; margin-bottom: 0.35rem; font-family: 'Space Mono', monospace; }
        .lp-gap-text  { font-size: 0.9rem; font-weight: 700; color: #fff; }

        /* Feedback inline */
        .lp-feedback { font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem; }
        .lp-feedback-ok  { color: #4ade80; }
        .lp-feedback-err { color: #f87171; }

        /* Feedback box */
        .lp-feedback-box {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          margin-bottom: 0.75rem;
          border: 1px solid;
        }
        .lp-feedback-box-ok  { background: rgba(74,222,128,0.06);  border-color: rgba(74,222,128,0.2); }
        .lp-feedback-box-err { background: rgba(248,113,113,0.06); border-color: rgba(248,113,113,0.2); }
        .lp-feedback-body { font-size: 0.8rem; color: #bbb; line-height: 1.5; }

        /* Buttons */
        .lp-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s, filter 0.15s;
          margin-top: 0.25rem;
        }
        .lp-btn:disabled { opacity: 0.35; cursor: default; }
        .lp-btn:not(:disabled):hover { filter: brightness(1.1); }

        .lp-btn-spark  { background: #FFD600; color: #0a0a0a; }
        .lp-btn-gap    { background: #dc2626; color: #fff; }
        .lp-btn-teach  { background: #2563eb; color: #fff; }
        .lp-btn-sprint { background: #7c3aed; color: #fff; }
        .lp-btn-ok     { background: #16a34a; color: #fff; }
        .lp-btn-ghost  { background: transparent; color: #aaa; border: 1px solid #2a2a2a; }
        .lp-btn-replay { width: auto; margin-top: 1rem; padding: 0.6rem 1.5rem; }
        .lp-btn-half   { flex: 1; width: auto; }

        /* Row layout for side-by-side buttons */
        .lp-row { display: flex; gap: 0.5rem; }
        .lp-row .lp-btn { margin-top: 0; }

        /* Analyzer */
        .lp-analyzer-box {
          padding: 1.1rem 1.1rem;
          border-radius: 1rem;
          border: 1px solid;
          margin-bottom: 0.75rem;
        }
        .lp-analyzer-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; }
        .lp-analyzer-icon { font-size: 1.3rem; }
        .lp-analyzer-gap  { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.07em; }
        .lp-analyzer-msg  { font-size: 0.88rem; color: #ccc; line-height: 1.55; }

        /* Status strip */
        .lp-status-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 0.25rem;
        }
        .lp-status-text { font-size: 0.75rem; color: #555; }
        .lp-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          animation: lp-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .lp-dot-yellow {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FFD600;
          flex-shrink: 0;
        }

        /* Complete screen */
        .lp-complete {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1rem;
          text-align: center;
        }
        .lp-complete-icon  { font-size: 3.5rem; margin-bottom: 1.25rem; }
        .lp-complete-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .lp-complete-sub   { font-size: 0.875rem; color: #555; margin-bottom: 0; }

        /* Animations */
        @keyframes lp-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .lp-overlay-backdrop { padding: 0.75rem; }
          .lp-overlay-prompt { font-size: 0.9rem; }
          .lp-video-shell { border-radius: 0.5rem; }
          .lp-topbar-title { display: none; }
        }
      `}</style>
    </div>
  );
}
