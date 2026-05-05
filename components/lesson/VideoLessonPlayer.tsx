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

import { useRef, useState, useEffect, useCallback } from "react";
import OverlayCard from "@/components/lesson/OverlayCard";
import type { OverlayRow } from "@/lib/overlays";

interface TimedOverlay extends OverlayRow {
  triggerAt: number;
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

  // Sort overlays by triggerAt for efficiency
  const sortedOverlays = [...overlays].sort((a, b) => a.triggerAt - b.triggerAt);

  // timeupdate handler — check if any overlay should fire
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || activeOverlay) return;

    const currentTime = video.currentTime;
    for (const overlay of sortedOverlays) {
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
          onEnded={handleVideoEnded}
        />
      </div>

      {/* Overlay layer */}
      {activeOverlay && (
        <div className={`vlp-overlay-layer ${overlayVisible ? "vlp-overlay-visible" : ""}`}>
          <div className="vlp-overlay-inner">
            <OverlayCard
              overlay={activeOverlay}
              lessonId={lessonId}
              onComplete={handleOverlayComplete}
            />
          </div>
        </div>
      )}

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
        .vlp-overlay-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vlp-overlay-inner {
          width: 100%;
          max-width: 34rem;
        }
      `}</style>
    </div>
  );
}
