// Shared types for the SelfSynchronization hero.
// Kept minimal — scene.ts owns its own Three.js types internally.

import type { OutfitId } from "./wardrobe/outfits";

export interface SelfSynchronizationProps {
  /** Starting sync percent (0–100). Default 30 (hoodie + varsity demo-ready). */
  initialSync?: number;
  /** Use the 2.5s test timer instead of the 25-min real timer. */
  demoMode?: boolean;
  /** Fires after a focus session completes; arg is the new sync %. */
  onFocusComplete?: (newSync: number) => void;
  /** Fires when the user clicks ▶ START FOCUS. */
  onFocusStart?: () => void;
  /** Optional extra class on the outer container. */
  className?: string;
}

export interface SyncSceneOptions {
  canvas: HTMLCanvasElement;
  container: HTMLDivElement;
  initialSync: number;
  demoMode: boolean;
  initialPastOutfit?: OutfitId;
  initialFutureOutfit?: OutfitId;
  onFocusComplete?: (newSync: number) => void;
  onFocusStart?: () => void;
  /** Fires when the displayed sync's integer value changes. */
  onSyncChange?: (sync: number) => void;
  /** Refs the scene drives from inside the RAF loop, set by the wrapper. */
  syncLabel?: HTMLElement | null;
  countdownLabel?: HTMLElement | null;
  flashEl?: HTMLElement | null;
  shockEl?: HTMLElement | null;
  popupEl?: HTMLElement | null;
  startBtn?: HTMLButtonElement | null;
}
