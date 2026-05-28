"use client";

/**
 * VideoLessonPlayer
 *
 * HTML5 video player that fires overlay checkpoints at timestamps derived
 * from the lesson script. When a checkpoint fires, the video pauses and an
 * OverlayCard is shown fullscreen. On dismiss, the video resumes.
 *
 * Props:
 *   lessonId       — DB lesson ID (for overlay logging)
 *   videoUrl       — direct URL to the video file (Supabase Storage)
 *   overlays       — OverlayRow[] merged with triggerAt timestamps
 *   onComplete     — called when video ends and all overlays have fired
 */

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import OverlayCard from "@/components/lesson/OverlayCard";
import type { OverlayRow } from "@/lib/overlays";

interface TimedOverlay extends OverlayRow {
  triggerAt?: number;
}

interface Props {
  lessonId: string;
  videoUrl: string;
  overlays: TimedOverlay[];
  onComplete?: () => void;
}

export default function VideoLessonPlayer({ lessonId, videoUrl, overlays, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedRef = useRef<Set<string>>(new Set());
  const [activeOverlay, setActiveOverlay] = useState<TimedOverlay | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  const sortedOverlays = useMemo(() => {
    const timed = overlays.filter((overlay) => typeof overlay.triggerAt === "number");
    const untimed = overlays.filter((overlay) => typeof overlay.triggerAt !== "number");

    if (timed.length > 0) {
      return [...timed, ...untimed].sort((a, b) => (a.triggerAt ?? Number.POSITIVE_INFINITY) - (b.triggerAt ?? Number.POSITIVE_INFINITY));
    }

    if (!duration || untimed.length === 0) {
      return [...overlays];
    }

    const step = duration / (untimed.length + 1);
    return untimed.map((overlay, index) => ({
      ...overlay,
      triggerAt: step * (index + 1),
    }));
  }, [overlays, duration]);

  // timeupdate handler — check if any overlay should fire
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || activeOverlay) return;

    const currentTime = video.currentTime;
    for (const overlay of sortedOverlays) {
      if (typeof overlay.triggerAt !== "number") continue;
      if (!firedRef.current.has(overlay.id) && currentTime >= overlay.triggerAt) {
        video.pause();
        firedRef.current.add(overlay.id);
        setActiveOverlay(overlay);
        // Animate in on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setOverlayVisible(true));
        });
        return; // only fire one at a time
      }
    }
  }, [sortedOverlays, activeOverlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [handleTimeUpdate]);

  function handleOverlayComplete() {
    setOverlayVisible(false);
    setTimeout(() => {
      setActiveOverlay(null);
      videoRef.current?.play().catch(() => {});
    }, 200);
  }

  function handleVideoEnded() {
    onComplete?.();
  }

  return (
    <div className="vlp-root">
      {/* Video element */}
      <div className="vlp-video-wrap">
        <video
          ref={videoRef}
          className="vlp-video"
          src={videoUrl}
          controls
          playsInline
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? null)}
          onEnded={handleVideoEnded}
        />
      </div>

      {/* Overlay layer */}
      {activeOverlay && (() => {
        const isTapQuick = (activeOverlay.type ?? "").toUpperCase() === "TAP_QUICK";
        return (
          <div className={`${isTapQuick ? "vlp-overlay-popup" : "vlp-overlay-layer"} ${overlayVisible ? "vlp-overlay-visible" : ""}`}>
            <div className={isTapQuick ? "vlp-popup-inner" : "vlp-overlay-inner"}>
              <OverlayCard
                overlay={activeOverlay}
                lessonId={lessonId}
                onComplete={handleOverlayComplete}
                popupMode={isTapQuick}
              />
            </div>
          </div>
        );
      })()}

      <style>{`
        .vlp-root {
          position: relative;
          width: 100%;
          background: #000;
        }
        .vlp-video-wrap {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vlp-video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }
        .vlp-overlay-layer {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          opacity: 0;
          transform: translateY(1.5rem);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .vlp-overlay-popup {
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
        }
        .vlp-overlay-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vlp-overlay-inner {
          width: 100%;
          max-width: 34rem;
        }
        .vlp-popup-inner {
          width: 100%;
          max-width: 26rem;
        }
      `}</style>
    </div>
  );
}
