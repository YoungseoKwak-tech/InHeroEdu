"use client";

import Wardrobe from "./Wardrobe";
import { FUTURE_OUTFITS, type OutfitId } from "./outfits";

interface Props {
  syncValue: number;
  currentOutfit: OutfitId;
  onSelect: (id: OutfitId) => void;
}

export default function FutureWardrobe(props: Props) {
  return <Wardrobe side="future" outfits={FUTURE_OUTFITS} {...props} />;
}
