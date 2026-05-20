// Dual outfit catalog. Two parallel lists — PAST_OUTFITS dresses the
// LEFT half of the figure (grounded / casual self), FUTURE_OUTFITS
// dresses the RIGHT half (aspirational self). The wardrobe UI mounts
// two panels and the scene maintains two active outfit groups
// clipped to their respective halves.

import type * as THREE from "three";
import type { OutfitMaterials, OutfitSide } from "./OutfitMesh";
import {
  buildTshirt,
  buildHoodie,
  buildTracksuit,
  buildSweater,
  buildCasualJacket,
  buildShirt,
  buildVarsity,
  buildLabCoat,
  buildSuit,
  buildGown,
} from "./OutfitMesh";

export type OutfitId = string;

export interface OutfitDef {
  id: OutfitId;
  side: OutfitSide;
  name: string;
  nameKo: string;
  unlockAt: number;
  description: string;
  /** CSS colors used by the 2D card preview swatch. */
  swatch: { base: string; accent: string };
  build: (mats: OutfitMaterials) => THREE.Group;
}

export const PAST_OUTFITS: OutfitDef[] = [
  {
    id: "tshirt", side: "past",
    name: "Plain Tee", nameKo: "평범한 티",
    unlockAt: 0,
    description: "Where you start.",
    swatch: { base: "#d8d4cc", accent: "#c5beb0" },
    build: buildTshirt,
  },
  {
    id: "hoodie", side: "past",
    name: "Hoodie", nameKo: "후드티",
    unlockAt: 0,
    description: "Comfort mode.",
    swatch: { base: "#f5f0e8", accent: "#eae0d0" },
    build: buildHoodie,
  },
  {
    id: "tracksuit", side: "past",
    name: "Tracksuit", nameKo: "츄리닝",
    unlockAt: 10,
    description: "Cozy grind.",
    swatch: { base: "#3a3a44", accent: "#8a8590" },
    build: buildTracksuit,
  },
  {
    id: "sweater", side: "past",
    name: "Knit Sweater", nameKo: "니트",
    unlockAt: 20,
    description: "A little warmer.",
    swatch: { base: "#a89070", accent: "#8a7560" },
    build: buildSweater,
  },
  {
    id: "casualjkt", side: "past",
    name: "Denim Jacket", nameKo: "청자켓",
    unlockAt: 30,
    description: "Stepping out.",
    swatch: { base: "#4a6488", accent: "#405878" },
    build: buildCasualJacket,
  },
];

export const FUTURE_OUTFITS: OutfitDef[] = [
  {
    id: "shirt", side: "future",
    name: "Crisp Shirt", nameKo: "셔츠",
    unlockAt: 0,
    description: "Putting it together.",
    swatch: { base: "#f8f5ed", accent: "#cfc8b8" },
    build: buildShirt,
  },
  {
    id: "varsity", side: "future",
    name: "Cornell Varsity", nameKo: "코넬 과잠",
    unlockAt: 25,
    description: "You belong here.",
    swatch: { base: "#1a2440", accent: "#c8232b" },
    build: buildVarsity,
  },
  {
    id: "labcoat", side: "future",
    name: "Lab Coat", nameKo: "실험가운",
    unlockAt: 50,
    description: "A scholar in motion.",
    swatch: { base: "#fafaf6", accent: "#1a1a22" },
    build: buildLabCoat,
  },
  {
    id: "suit", side: "future",
    name: "Tailored Suit", nameKo: "정장",
    unlockAt: 75,
    description: "The room turns.",
    swatch: { base: "#14141a", accent: "#6c2030" },
    build: buildSuit,
  },
  {
    id: "gown", side: "future",
    name: "Graduation Gown", nameKo: "졸업가운",
    unlockAt: 95,
    description: "The version that arrived.",
    swatch: { base: "#18181f", accent: "#c8232b" },
    build: buildGown,
  },
];

export function getOutfit(id: OutfitId, side: OutfitSide): OutfitDef {
  const list = side === "past" ? PAST_OUTFITS : FUTURE_OUTFITS;
  const o = list.find((x) => x.id === id);
  if (!o) throw new Error(`Unknown ${side} outfit: ${id}`);
  return o;
}
