"use client";

import Wardrobe from "./Wardrobe";
import { PAST_OUTFITS, type OutfitId } from "./outfits";

interface Props {
  syncValue: number;
  currentOutfit: OutfitId;
  onSelect: (id: OutfitId) => void;
}

export default function PastWardrobe(props: Props) {
  return <Wardrobe side="past" outfits={PAST_OUTFITS} {...props} />;
}
