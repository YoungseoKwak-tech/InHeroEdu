"use client";

/**
 * SelfSynchronization — landing-page hero.
 *
 * Thin React shell that mounts a `SyncScene` (Three.js) into a
 * canvas, exposes the overlay HUD + CTA + completion overlays as
 * sibling DOM nodes, and forwards the few callbacks (focus
 * start/end). Heavy lifting is in scene.ts.
 *
 * The scene instance is created once per mount and disposed on
 * unmount — disposal cancels RAF, removes every listener, and
 * frees every geometry/material/renderer so route navigation
 * doesn't leak GPU memory.
 */

import { useEffect, useRef } from "react";
import { SyncScene } from "./scene";
import type { SelfSynchronizationProps } from "./types";
import styles from "./SelfSynchronization.module.css";

export default function SelfSynchronization(props: SelfSynchronizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const syncLabelRef = useRef<HTMLSpanElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const shockRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SyncScene | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    // Tag <body> while the hero is mounted so SpaceBackground
    // sprites (astronaut, ships, planets) get hidden via the
    // global CSS rule in our module. Restored on unmount.
    document.body.classList.add("ss-hero-active");

    // Read ?demo=true from the URL post-mount to avoid Suspense
    // gymnastics around useSearchParams during static prerender.
    const queryDemo = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("demo") === "true"
      : false;
    const demoMode = props.demoMode ?? queryDemo;

    const scene = new SyncScene({
      canvas: canvasRef.current,
      container: containerRef.current,
      initialSync: props.initialSync ?? 8,
      demoMode,
      onFocusComplete: props.onFocusComplete,
      onFocusStart: props.onFocusStart,
      syncLabel: syncLabelRef.current,
      countdownLabel: countdownRef.current,
      startBtn: btnRef.current,
      flashEl: flashRef.current,
      shockEl: shockRef.current,
      popupEl: popupRef.current,
    });
    sceneRef.current = scene;
    return () => {
      scene.dispose();
      sceneRef.current = null;
      document.body.classList.remove("ss-hero-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${props.className ?? ""}`}
      aria-label="Self synchronization hero"
    >
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.hud} aria-live="polite">
        <div className={styles.hudLine}>
          <span className={styles.dot} aria-hidden="true" />
          SYNCHRONIZATION ·{" "}
          <span ref={syncLabelRef} className={styles.hudPct}>
            {props.initialSync ?? 8}
          </span>
          %
        </div>
        <div className={styles.hudSub}>
          your present and possible selves are merging
        </div>
      </div>

      <div className={styles.caption}>
        the version of you that's arriving.
      </div>

      <div className={styles.ctaWrap}>
        <button ref={btnRef} className={styles.cta} type="button">
          ▶ START FOCUS
        </button>
        <div ref={countdownRef} className={styles.countdown} aria-live="polite" />
      </div>

      {/* Completion overlays (driven by scene.ts via refs). */}
      <div ref={flashRef} className={styles.flash} aria-hidden="true" />
      <div className={styles.shockWrap} aria-hidden="true">
        <div ref={shockRef} className={styles.shock} />
      </div>
      <div ref={popupRef} className={styles.popup} aria-hidden="true" />
    </div>
  );
}
