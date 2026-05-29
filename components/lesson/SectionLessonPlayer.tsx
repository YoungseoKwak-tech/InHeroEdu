"use client";

/**
 * SectionLessonPlayer
 *
 * Drives a sequential playlist of video clips and overlay checkpoints.
 * Clips play back-to-back; overlays pause the flow until the student
 * completes the interaction.
 *
 * Props:
 *   playlist   — ordered array of PlaylistItems (clips + overlays)
 *   lessonId   — for overlay response logging
 *   onComplete — called when the final item is done
 */

import { useRef, useState, useEffect, useCallback } from "react";
import OverlayCard from "@/components/lesson/OverlayCard";
import type { PlaylistItem } from "@/lib/buildPlaylist";
import { getTier } from "@/lib/streakTiers";
import { authFetch } from "@/lib/client-auth";
import { startTelemetrySession, emit as emitTelemetry, endTelemetrySession } from "@/lib/attentionTelemetry";

const STREAK_CHANGED_EVENT = "inhero:streak-changed";

interface Props {
  playlist: PlaylistItem[];
  lessonId: string;
  onComplete?: () => void;
}

// ── Overlay type → dot color ──────────────────────────────────────────────
const OVERLAY_DOT_COLOR: Record<string, string> = {
  SPARK:           "#C9A84C",
  GAP_CRUNCH:      "#E85A4A",
  TEACH_BACK:      "#5DCAA5",
  QUESTION_SPRINT: "#9F97ED",
  ANALYZER:        "#378ADD",
  spark:           "#C9A84C",
  gap_crunch:      "#E85A4A",
  teach_back:      "#5DCAA5",
  question_sprint: "#9F97ED",
  analyzer:        "#378ADD",
};

export default function SectionLessonPlayer({ playlist, lessonId, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [completedIdxs, setCompletedIdxs] = useState<Set<number>>(new Set());
  const [tapStreak, setTapStreak] = useState(0);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  // Section-locked pulse: when a CLIP item finishes, hold the section title
  // here for ~900ms so the floating "section locked" toast and the progress
  // bar's mint pulse animation can read it. Pure visual reward — no metric.
  const [clipPulse, setClipPulse] = useState<string | null>(null);
  // Bumps the always-visible streak pill in the progress strip whenever the
  // streak ticks up — so the count "lives" instead of just sitting there.
  const [streakBumped, setStreakBumped] = useState(false);
  const prevStreakRef = useRef(tapStreak);
  useEffect(() => {
    if (tapStreak > prevStreakRef.current) {
      setStreakBumped(true);
      const t = setTimeout(() => setStreakBumped(false), 700);
      prevStreakRef.current = tapStreak;
      return () => clearTimeout(t);
    }
    prevStreakRef.current = tapStreak;
  }, [tapStreak]);
  const sprintCount = useRef(0);

  // ── Stage-1 attention telemetry: start a session per lesson visit ───────
  useEffect(() => {
    startTelemetrySession({ lessonId });
    emitTelemetry("lesson_start", { playlist_length: playlist.length });
    return () => {
      // lesson_complete is emitted from advance() at the natural end; this
      // path also fires for browser-back / route change so the session is
      // closed cleanly either way.
      endTelemetrySession();
    };
  }, [lessonId, playlist.length]);

  // ── Hydrate streak from server on mount ─────────────────────────────────
  // Source of truth lives in student_streak_state (server). Local useState
  // mirror gives instant UI; failures (offline, signed out) silently fall
  // back to 0 so the lesson still works.
  useEffect(() => {
    let cancelled = false;
    authFetch("/api/streak")
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        const n = Number(j?.data?.current_streak);
        if (Number.isFinite(n) && n >= 0) setTapStreak(n);
      })
      .catch(() => { /* offline or signed-out — local 0 is fine */ });
    return () => { cancelled = true; };
  }, []);

  // Push every tap to the server + broadcast so the navbar pill updates
  // immediately without polling. Returns the locally-computed next value
  // so the caller can update useState synchronously for instant feedback.
  const persistTap = useCallback((correct: boolean) => {
    authFetch("/api/streak", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correct }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && j?.data && typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent(STREAK_CHANGED_EVENT, { detail: j.data }));
        }
      })
      .catch(() => { /* network blip — local mirror still correct */ });
  }, []);

  // ADHD-friendly tab-switch grace: when the student drifts away (tab switch
  // / window blur), pause the video silently. When they return, show a soft
  // "Welcome back" pill for 2.5s and leave the video paused so they re-enter
  // on their own terms — no auto-resume, no punishment, streak preserved.
  useEffect(() => {
    let leftAt = 0;
    function onVisChange() {
      if (typeof document === "undefined") return;
      if (document.hidden) {
        videoRef.current?.pause();
        leftAt = Date.now();
      } else if (leftAt > 0 && Date.now() - leftAt > 1500) {
        setShowWelcomeBack(true);
        const t = setTimeout(() => setShowWelcomeBack(false), 2500);
        leftAt = 0;
        return () => clearTimeout(t);
      }
    }
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, []);

  const currentItem = playlist[currentIdx];

  // Animate overlay in when it becomes active
  useEffect(() => {
    if (currentItem?.kind === "overlay") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setOverlayVisible(true));
      });
    } else {
      setOverlayVisible(false);
    }
  }, [currentIdx, currentItem?.kind]);

  // Auto-play video when the current item is a clip
  useEffect(() => {
    if (currentItem?.kind === "clip" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIdx, currentItem]);

  const advance = useCallback(
    (nextIdx: number) => {
      setCompletedIdxs((prev) => new Set(prev).add(currentIdx));
      if (nextIdx >= playlist.length) {
        setDone(true);
        emitTelemetry("lesson_complete", { items_completed: completedIdxs.size + 1 });
        onComplete?.();
      } else {
        setCurrentIdx(nextIdx);
      }
    },
    [currentIdx, playlist.length, onComplete, completedIdxs.size]
  );

  function handleVideoEnded() {
    // Action-based reward: clip completion fires a 900ms mint pulse on the
    // progress bar + a "✓ SECTION locked" floating toast. Reuses the existing
    // progress bar — no new always-on UI element to distract.
    if (playlist[currentIdx]?.kind === "clip") {
      const sectionTitle = playlist[currentIdx].sectionTitle;
      setClipPulse(sectionTitle);
      window.setTimeout(() => setClipPulse((p) => (p === sectionTitle ? null : p)), 900);
      emitTelemetry("clip_locked", { section_title: sectionTitle, clip_idx: currentIdx });
      emitTelemetry("video_ended", { section_title: sectionTitle });
    }
    advance(currentIdx + 1);
  }

  // Video element lifecycle: pause / play / seek. Attach listeners to the
  // active <video> ref whenever the current item is a clip. We re-attach on
  // each clip change because <video> remounts.
  useEffect(() => {
    if (currentItem?.kind !== "clip") return;
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => emitTelemetry("video_play", { current_time: v.currentTime });
    const onPause = () => {
      // Filter out the pause that fires right before "ended" — that's not
      // a meaningful behavioral signal, just video element bookkeeping.
      if (v.ended) return;
      emitTelemetry("video_pause", { current_time: v.currentTime });
    };
    let lastTime = v.currentTime;
    const onSeeking = () => { lastTime = v.currentTime; };
    const onSeeked = () => {
      const direction = v.currentTime < lastTime ? "back" : "forward";
      emitTelemetry("video_seek", {
        from_sec: Math.round(lastTime * 100) / 100,
        to_sec: Math.round(v.currentTime * 100) / 100,
        direction,
      });
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("seeked", onSeeked);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("seeked", onSeeked);
    };
  }, [currentIdx, currentItem]);

  function handleOverlayComplete() {
    if (currentItem?.kind === "overlay") {
      const type = (currentItem.overlay.type ?? "").toUpperCase();
      if (type === "QUESTION_SPRINT") sprintCount.current += 1;
    }
    setOverlayVisible(false);
    setTimeout(() => advance(currentIdx + 1), 200);
  }

  // ── Completion screen ────────────────────────────────────────────────────
  if (done) {
    const sprintOverlays = playlist.filter(
      (p) => p.kind === "overlay" &&
        (p.overlay.type === "QUESTION_SPRINT" || p.overlay.type === "question_sprint")
    ).length;
    // Surface the streak + tier on the done card so the student leaves with
    // an explicit identity claim instead of a generic "completed" screen.
    const finalTier = getTier(tapStreak);
    return (
      <div className="slp-done-root">
        <div className="slp-done-card">
          <div className="slp-done-icon">🎓</div>
          <h2 className="slp-done-title">Lesson Complete</h2>
          <p className="slp-done-body">Your responses have been saved to your learning profile.</p>

          {tapStreak > 0 && (
            <div className="slp-done-handoff">
              <div className="slp-done-handoff-row">
                <span className="slp-done-handoff-streak">🔥 {tapStreak}</span>
                <span className="slp-done-handoff-tier">{finalTier.label}</span>
              </div>
              <p className="slp-done-handoff-body">
                Carry this into the next lesson.
              </p>
            </div>
          )}

          {sprintOverlays > 0 && (
            <div className="slp-done-stats">
              <span className="slp-done-stat">
                <span className="slp-done-stat-num">{sprintCount.current}</span>
                <span className="slp-done-stat-label">Sprint sets answered</span>
              </span>
              <span className="slp-done-stat">
                <span className="slp-done-stat-num">{playlist.filter(p => p.kind === "clip").length}</span>
                <span className="slp-done-stat-label">clips watched</span>
              </span>
            </div>
          )}
        </div>
        <style>{doneCss}</style>
      </div>
    );
  }

  if (playlist.length === 0) {
    return (
      <div className="slp-done-root">
        <p style={{ color: "#555", fontSize: "0.85rem" }}>No content available for this lesson yet.</p>
        <style>{doneCss}</style>
      </div>
    );
  }

  // ── Player ────────────────────────────────────────────────────────────────
  const clipItems   = playlist.filter((p) => p.kind === "clip");
  const clipsDone   = Array.from(completedIdxs).filter((i) => playlist[i]?.kind === "clip").length;

  // ── ADHD-friendly progress: always-on bar (rendered twice — in player and
  // inside the overlay layer — so the student sees progress in both states) ──
  const totalItems = playlist.length;
  const progressPct = totalItems > 0
    ? Math.min(100, Math.round(((completedIdxs.size + 0.5) / totalItems) * 100))
    : 0;
  const overlayCount = playlist.filter((p) => p.kind === "overlay").length;
  const overlaysDone = Array.from(completedIdxs).filter((i) => playlist[i]?.kind === "overlay").length;

  const currentStreakTier = getTier(tapStreak);
  const progressBar = (
    <div className="slp-progress-strip">
      <div className="slp-progress-bar-wrap">
        <div
          className={`slp-progress-bar ${clipPulse ? "slp-progress-bar-pulse" : ""}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="slp-progress-meta">
        <span className="slp-progress-count">
          {Math.min(currentIdx + 1, totalItems)} / {totalItems}
        </span>
        {tapStreak > 0 && (
          <span
            className={`slp-progress-streak ${streakBumped ? "slp-progress-streak-bumped" : ""}`}
            title={`${tapStreak} correct in a row · ${currentStreakTier.label}`}
          >
            <span className="slp-progress-streak-num">🔥 {tapStreak}</span>
            <span className="slp-progress-streak-tier">{currentStreakTier.label}</span>
          </span>
        )}
        {overlayCount > 0 && (
          <span className="slp-progress-unlock">
            ◎ {overlaysDone} / {overlayCount} unlocked
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="slp-root">
      {/* In-player progress bar (always present at top of player) */}
      {progressBar}

      {/* Gentle re-entry pill — fades in when student returns after drifting */}
      {showWelcomeBack && (
        <div className="slp-welcome-back" role="status" aria-live="polite">
          ◎ Welcome back — pick up when you&apos;re ready
        </div>
      )}

      {/* Clip-completion celebration — 900ms toast as a section finishes */}
      {clipPulse && (
        <div className="slp-clip-locked" role="status" aria-live="polite">
          ✓ {clipPulse} locked
        </div>
      )}

      {/* ── Video layer ── */}
      <div className="slp-video-wrap">
        {currentItem?.kind === "clip" ? (
          <>
            <video
              ref={videoRef}
              className="slp-video"
              src={currentItem.clipUrl}
              playsInline
              controls
              controlsList="nodownload"
              onEnded={handleVideoEnded}
            />
            <div className="slp-section-label">{currentItem.sectionTitle}</div>
            {clipItems.length > 1 && (
              <div className="slp-clip-counter">
                Clip {clipsDone + 1} of {clipItems.length}
              </div>
            )}
          </>
        ) : (
          // Placeholder while overlay is showing
          <div className="slp-video-placeholder" />
        )}
      </div>

      {/* ── Overlay layer ── */}
      {currentItem?.kind === "overlay" && (() => {
        const isTapQuick = (currentItem.overlay.type ?? "").toUpperCase() === "TAP_QUICK";
        // TAP_QUICK = ADHD pulse → render as a bottom-anchored popup over the
        // (dimmed) video frame. Every other overlay type still takes over
        // the full viewport because they require deeper focus.
        const layerClass = isTapQuick ? "slp-overlay-popup" : "slp-overlay-layer";
        const innerClass = isTapQuick ? "slp-popup-inner" : "slp-overlay-inner";
        return (
          <div className={`${layerClass} ${overlayVisible ? "slp-overlay-visible" : ""}`}>
            <div className="slp-progress-on-overlay">{progressBar}</div>
            <div className={innerClass}>
              <OverlayCard
                overlay={currentItem.overlay}
                lessonId={lessonId}
                onComplete={handleOverlayComplete}
                popupMode={isTapQuick}
                tapStreak={isTapQuick ? tapStreak : 0}
                onTapResult={(correct) => {
                  setTapStreak((s) => (correct ? s + 1 : 0));
                  persistTap(correct);
                }}
              />
            </div>
          </div>
        );
      })()}

      {/* ── Progress dots ── */}
      <div className="slp-dots">
        {playlist.map((item, i) => {
          const isCompleted = completedIdxs.has(i);
          const isCurrent   = i === currentIdx;
          if (item.kind === "clip") {
            return (
              <span
                key={i}
                className={`slp-dot slp-dot-clip ${isCompleted ? "slp-dot-done" : ""} ${isCurrent ? "slp-dot-current" : ""}`}
              />
            );
          }
          const color = OVERLAY_DOT_COLOR[item.overlay.type] ?? "#555";
          return (
            <span
              key={i}
              className={`slp-dot slp-dot-overlay ${isCurrent ? "slp-dot-current" : ""}`}
              style={{
                background: isCompleted ? color : "transparent",
                borderColor: color,
                "--dot-color": color,
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      <style>{playerCss}</style>
    </div>
  );
}

const playerCss = `
  .slp-root {
    position: relative;
    width: 100%;
    background: #000;
    display: flex;
    flex-direction: column;
  }

  /* Progress strip — rendered both inside the player and at the top of the
     overlay layer (via .slp-progress-on-overlay) so it remains visible in
     both states. ADHD UX rule: progress is always visible. */
  .slp-progress-strip {
    background: linear-gradient(180deg, #060606 0%, #050505 100%);
    padding: 0.45rem 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    font-family: 'Inter', system-ui, sans-serif;
    border-bottom: 1px solid #0e0e0e;
  }
  .slp-progress-on-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    pointer-events: none;
  }
  .slp-progress-on-overlay .slp-progress-strip {
    background: linear-gradient(180deg, rgba(8,12,18,0.85) 0%, transparent 100%);
    border-bottom: none;
  }
  .slp-progress-bar-wrap {
    height: 3px;
    background: rgba(255,255,255,0.07);
    border-radius: 2px;
    overflow: hidden;
  }
  .slp-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #00FFB2 0%, #5DCAA5 100%);
    box-shadow: 0 0 8px rgba(0,255,178,0.55);
    border-radius: 2px;
    transition: width 0.45s cubic-bezier(0.2, 0.8, 0.25, 1);
  }
  /* 900ms mint pulse when a clip finishes — pure visual reward. */
  .slp-progress-bar-pulse {
    animation: slp-bar-pulse 0.9s ease-out;
  }
  @keyframes slp-bar-pulse {
    0%   { box-shadow: 0 0 8px rgba(0,255,178,0.55); filter: brightness(1); }
    30%  { box-shadow: 0 0 24px rgba(0,255,178,0.95),
                       0 0 38px rgba(0,255,178,0.55);
           filter: brightness(1.35); }
    100% { box-shadow: 0 0 8px rgba(0,255,178,0.55); filter: brightness(1); }
  }
  .slp-progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .slp-progress-count { font-weight: 700; color: rgba(255,255,255,0.65); }
  .slp-progress-unlock { color: #00FFB2; }

  /* Always-visible streak indicator in the progress strip — student sees
     the count live between TAP popups, not just inside them. Soft breathing
     loop when idle; bumps with a spring scale when tapStreak increments. */
  .slp-progress-streak {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.18rem 0.65rem;
    border-radius: 9999px;
    background: rgba(255, 179, 71, 0.10);
    border: 1px solid rgba(255, 179, 71, 0.32);
    color: #FFD073;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    animation: slp-streak-breathe 3.2s ease-in-out infinite;
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
  }
  .slp-progress-streak-num { font-weight: 800; }
  .slp-progress-streak-tier {
    font-style: italic;
    font-weight: 500;
    opacity: 0.7;
    font-size: 0.6rem;
    text-transform: none;
    letter-spacing: 0;
  }
  @keyframes slp-streak-breathe {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 179, 71, 0); }
    50%      { box-shadow: 0 0 14px rgba(255, 179, 71, 0.3); }
  }
  .slp-progress-streak-bumped {
    background: rgba(255, 179, 71, 0.22);
    border-color: rgba(255, 179, 71, 0.7);
    color: #FFE4A8;
    box-shadow: 0 0 24px rgba(255, 179, 71, 0.7);
    animation: slp-streak-bump 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes slp-streak-bump {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.28); }
    100% { transform: scale(1); }
  }

  /* "Welcome back" pill — soft re-entry after tab switch / blur. */
  .slp-welcome-back {
    position: fixed;
    top: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1002;
    padding: 0.55rem 1rem;
    background: rgba(0, 255, 178, 0.10);
    border: 1px solid rgba(0, 255, 178, 0.4);
    border-radius: 9999px;
    color: #00FFB2;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    box-shadow: 0 6px 30px rgba(0, 255, 178, 0.18);
    animation: slp-welcome-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both,
               slp-welcome-out 0.4s ease 2.1s forwards;
    pointer-events: none;
  }
  @keyframes slp-welcome-in {
    from { opacity: 0; transform: translate(-50%, -10px); }
    to   { opacity: 1; transform: translate(-50%, 0); }
  }
  @keyframes slp-welcome-out {
    to { opacity: 0; transform: translate(-50%, -10px); }
  }

  /* "✓ SECTION locked" floating toast — short reward as a clip finishes. */
  .slp-clip-locked {
    position: fixed;
    top: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1002;
    padding: 0.5rem 0.95rem;
    background: rgba(0, 255, 178, 0.14);
    border: 1px solid rgba(0, 255, 178, 0.5);
    border-radius: 9999px;
    color: #00FFB2;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 0 8px 28px rgba(0, 255, 178, 0.28),
                0 0 22px rgba(0, 255, 178, 0.2);
    animation: slp-locked-in 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both,
               slp-locked-out 0.35s ease 0.55s forwards;
    pointer-events: none;
  }
  @keyframes slp-locked-in {
    from { opacity: 0; transform: translate(-50%, -8px) scale(0.85); }
    to   { opacity: 1; transform: translate(-50%, 0) scale(1); }
  }
  @keyframes slp-locked-out {
    to { opacity: 0; transform: translate(-50%, -6px) scale(0.95); }
  }

  .slp-video-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .slp-video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
  .slp-video-placeholder {
    width: 100%;
    height: 100%;
    background: rgba(10, 17, 23, 0.96);
  }
  .slp-section-label {
    position: absolute;
    top: 0.75rem;
    left: 0.85rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #4a6a80;
    pointer-events: none;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .slp-clip-counter {
    position: absolute;
    top: 0.75rem;
    right: 0.85rem;
    font-size: 0.65rem;
    color: #2a4060;
    font-family: 'Inter', system-ui, sans-serif;
    pointer-events: none;
  }
  .slp-overlay-layer {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(10, 17, 23, 0.96);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    opacity: 0;
    transform: translateY(1.5rem);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  /* TAP_QUICK popup — center-anchored, video stays visible (dimmed) behind it. */
  .slp-overlay-popup {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.78) 100%);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    opacity: 0;
    transition: opacity 0.18s ease;
    pointer-events: auto;
  }
  .slp-overlay-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .slp-overlay-inner {
    width: 100%;
    max-width: 40rem;
  }
  .slp-popup-inner {
    width: 100%;
    max-width: 26rem;
  }
  .slp-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0.6rem 1rem;
    background: #050505;
    min-height: 1.8rem;
  }
  .slp-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid #2a4060;
    background: transparent;
    transition: transform 0.15s, background 0.15s;
    flex-shrink: 0;
  }
  .slp-dot-clip.slp-dot-done { background: #378ADD; border-color: #378ADD; }
  .slp-dot-overlay {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    border-radius: 0;
    border: none;
    width: 7px;
    height: 7px;
  }
  .slp-dot-current {
    transform: scale(1.3);
    animation: slp-pulse 1.2s ease-in-out infinite;
  }
  @keyframes slp-pulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`;

const doneCss = `
  .slp-done-root {
    min-height: calc(100vh - 4rem);
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .slp-done-card {
    max-width: 24rem;
    width: 100%;
    background: #0d0d0d;
    border: 1px solid #1a1a1a;
    border-radius: 1.25rem;
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .slp-done-icon  { font-size: 2.8rem; margin-bottom: 1rem; }
  .slp-done-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: #C9A84C;
    margin-bottom: 0.5rem;
  }
  .slp-done-body {
    font-size: 0.83rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .slp-done-stats {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
  .slp-done-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  .slp-done-stat-num  { font-size: 1.6rem; font-weight: 800; color: #C9A84C; }
  .slp-done-stat-label { font-size: 0.65rem; color: #444; text-transform: uppercase; letter-spacing: 0.07em; }

  /* End-of-lesson streak + tier handoff */
  .slp-done-handoff {
    width: 100%;
    padding: 0.85rem 1rem;
    margin-bottom: 1.25rem;
    background:
      radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255, 179, 71, 0.18) 0%, transparent 70%),
      rgba(255, 179, 71, 0.05);
    border: 1px solid rgba(255, 179, 71, 0.32);
    border-radius: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: center;
  }
  .slp-done-handoff-row {
    display: flex;
    align-items: baseline;
    gap: 0.55rem;
  }
  .slp-done-handoff-streak {
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 1.35rem;
    font-weight: 800;
    color: #FFD073;
    text-shadow: 0 0 16px rgba(255, 179, 71, 0.6);
  }
  .slp-done-handoff-tier {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    font-style: italic;
    color: rgba(255, 179, 71, 0.85);
    letter-spacing: 0.02em;
  }
  .slp-done-handoff-body {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.45);
    margin: 0;
  }
`;
