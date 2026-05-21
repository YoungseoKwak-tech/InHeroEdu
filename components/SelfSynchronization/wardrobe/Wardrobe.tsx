"use client";

/**
 * Shared wardrobe panel — used by both PastWardrobe and FutureWardrobe.
 *
 * Locally-controlled open/closed state. The parent passes which list
 * of outfits to render, which is currently equipped, the user's
 * syncValue (for unlock gating), and a select callback.
 *
 * - Click an unlocked card → onSelect(id)
 * - Click a locked card → CSS shake (no callback)
 * - Equipped card → green outline, disabled
 */

import { useEffect, useRef, useState } from "react";
import type { OutfitDef, OutfitId } from "./outfits";
import styles from "./Wardrobe.module.css";

interface WardrobeProps {
  side: "past" | "future";
  outfits: OutfitDef[];
  syncValue: number;
  currentOutfit: OutfitId;
  onSelect: (id: OutfitId) => void;
}

const COPY = {
  past: {
    title: "PAST SELF",
    symbol: "●",
    subtitle: "지금의 나를 입혀보세요",
    triggerLabel: "● PAST SELF",
  },
  future: {
    title: "FUTURE SELF",
    symbol: "✦",
    subtitle: "되고 싶은 나를 입혀보세요",
    triggerLabel: "✦ FUTURE SELF",
  },
} as const;

export default function Wardrobe({
  side,
  outfits,
  syncValue,
  currentOutfit,
  onSelect,
}: WardrobeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shakeId, setShakeId] = useState<OutfitId | null>(null);
  const [sparkleId, setSparkleId] = useState<OutfitId | null>(null);
  const shakeRef = useRef<number | null>(null);
  const sparkleRef = useRef<number | null>(null);
  const copy = COPY[side];

  useEffect(() => () => {
    if (shakeRef.current) window.clearTimeout(shakeRef.current);
    if (sparkleRef.current) window.clearTimeout(sparkleRef.current);
  }, []);

  const handleClick = (id: OutfitId, unlocked: boolean) => {
    if (!unlocked) {
      setShakeId(id);
      if (shakeRef.current) window.clearTimeout(shakeRef.current);
      shakeRef.current = window.setTimeout(() => setShakeId(null), 440);
      return;
    }
    if (id === currentOutfit) return;
    onSelect(id);
    setSparkleId(id);
    if (sparkleRef.current) window.clearTimeout(sparkleRef.current);
    sparkleRef.current = window.setTimeout(() => setSparkleId(null), 640);
  };

  const triggerCls = `${styles.trigger} ${
    side === "past" ? styles.triggerLeft : styles.triggerRight
  }`;
  const panelCls = `${styles.panel} ${
    side === "past" ? styles.panelLeft : styles.panelRight
  } ${isOpen ? styles.panelOpen : ""}`;

  return (
    <>
      <button
        type="button"
        className={triggerCls}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={`Toggle ${copy.title.toLowerCase()} wardrobe`}
      >
        {copy.triggerLabel}
      </button>

      <aside className={panelCls} aria-hidden={!isOpen}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>
            {copy.symbol} {copy.title}
          </h3>
          <p className={styles.headerSub}>{copy.subtitle}</p>
          <button
            type="button"
            className={styles.close}
            onClick={() => setIsOpen(false)}
            aria-label="Close wardrobe"
          >
            ✕
          </button>
        </header>

        <div className={styles.list}>
          {outfits.map((o) => {
            const unlocked = syncValue >= o.unlockAt;
            const equipped = o.id === currentOutfit;
            const cls = [
              styles.card,
              equipped ? styles.cardEquipped : "",
              !unlocked ? styles.cardLocked : "",
              shakeId === o.id ? styles.cardShake : "",
            ].filter(Boolean).join(" ");

            return (
              <button
                key={o.id}
                type="button"
                className={cls}
                onClick={() => handleClick(o.id, unlocked)}
                disabled={equipped}
              >
                <div className={styles.swatch} style={{ background: o.swatch.base }}>
                  <div
                    className={styles.swatchAccent}
                    style={{ background: o.swatch.accent }}
                  />
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.cardName}>
                    {o.name} <span className={styles.cardNameKo}>· {o.nameKo}</span>
                  </p>
                  <p className={styles.cardSub}>{o.description}</p>
                  <span
                    className={`${styles.cardMeta} ${
                      equipped
                        ? styles.metaEquipped
                        : unlocked
                          ? styles.metaUnlocked
                          : styles.metaLocked
                    }`}
                  >
                    {equipped
                      ? "● EQUIPPED"
                      : unlocked
                        ? "▶ TAP TO WEAR"
                        : `🔒 ${o.unlockAt}% SYNC`}
                  </span>
                </div>

                {!unlocked && (
                  <span className={styles.lockIcon} aria-hidden="true">🔒</span>
                )}
                {sparkleId === o.id && (
                  <span className={styles.sparkle} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
