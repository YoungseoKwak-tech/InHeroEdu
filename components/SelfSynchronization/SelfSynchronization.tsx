"use client";

/**
 * SelfSynchronization — landing-page hero.
 *
 * Mounts the Three.js scene + the dual wardrobe UI. The character
 * is split down the middle: the LEFT half is dressed by the past-self
 * wardrobe (warm/amber accent), the RIGHT half by the future-self
 * wardrobe (cool/purple accent). The user customizes both halves.
 *
 * The scene instance is created once per mount and disposed on
 * unmount — disposal cancels RAF, removes every listener, and
 * frees every geometry/material/renderer so route navigation
 * doesn't leak GPU memory.
 */

import { useEffect, useRef, useState } from "react";
import { SyncScene } from "./scene";
import type { SelfSynchronizationProps } from "./types";
import styles from "./SelfSynchronization.module.css";
import PastWardrobe from "./wardrobe/PastWardrobe";
import FutureWardrobe from "./wardrobe/FutureWardrobe";
import type { OutfitId } from "./wardrobe/outfits";

const INITIAL_PAST: OutfitId = "tshirt";
const INITIAL_FUTURE: OutfitId = "shirt";

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

  // 30% sync = the past tracksuit/sweater + future varsity unlocked,
  // labcoat/suit/gown still locked. Demo-friendly: play immediately
  // AND have a clear chase target.
  const initialSync = props.initialSync ?? 30;
  const [syncValue, setSyncValue] = useState(initialSync);
  const [pastOutfit, setPastOutfit] = useState<OutfitId>(INITIAL_PAST);
  const [futureOutfit, setFutureOutfit] = useState<OutfitId>(INITIAL_FUTURE);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    document.body.classList.add("ss-hero-active");

    const queryDemo = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("demo") === "true"
      : false;
    const demoMode = props.demoMode ?? queryDemo;

    const scene = new SyncScene({
      canvas: canvasRef.current,
      container: containerRef.current,
      initialSync,
      demoMode,
      initialPastOutfit: INITIAL_PAST,
      initialFutureOutfit: INITIAL_FUTURE,
      onFocusComplete: props.onFocusComplete,
      onFocusStart: props.onFocusStart,
      onSyncChange: setSyncValue,
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

  const handleSelectPast = (id: OutfitId) => {
    sceneRef.current?.swapPastOutfit(id);
    setPastOutfit(id);
  };
  const handleSelectFuture = (id: OutfitId) => {
    sceneRef.current?.swapFutureOutfit(id);
    setFutureOutfit(id);
  };

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
            {initialSync}
          </span>
          %
        </div>
        <div className={styles.hudSub}>
          your present and possible selves are merging
        </div>
      </div>

      <PastWardrobe
        syncValue={syncValue}
        currentOutfit={pastOutfit}
        onSelect={handleSelectPast}
      />
      <FutureWardrobe
        syncValue={syncValue}
        currentOutfit={futureOutfit}
        onSelect={handleSelectFuture}
      />

      <div className={styles.caption}>
        the version of you that&apos;s arriving.
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
