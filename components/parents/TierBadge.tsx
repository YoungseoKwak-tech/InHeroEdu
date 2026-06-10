"use client";

/**
 * TierBadge — small 학생/학부모 chip. <TierBadge tier> is presentational;
 * <MyTierBadge> reads the signed-in user's tier from the session and renders it.
 */

import { useEffect, useState } from "react";
import { getClientSession } from "@/lib/client-auth";
import { TIER_META, tierFromMetadata, type Tier } from "@/lib/tier";

export function TierBadge({ tier, size = "md" }: { tier: Tier; size?: "sm" | "md" }) {
  const m = TIER_META[tier];
  const sm = size === "sm";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: sm ? 4 : 6,
      fontSize: sm ? 11 : 12.5, fontWeight: 800, color: m.color,
      background: m.bg, border: `1px solid ${m.border}`, borderRadius: 999,
      padding: sm ? "2px 8px" : "4px 11px", whiteSpace: "nowrap", lineHeight: 1.2,
    }}>
      <span>{m.emoji}</span>{m.label}
    </span>
  );
}

export default function MyTierBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const [tier, setTier] = useState<Tier | null>(null);
  useEffect(() => {
    getClientSession().then((s) => setTier(tierFromMetadata(s?.user?.user_metadata as Record<string, unknown>))).catch(() => {});
  }, []);
  if (!tier) return null;
  return <TierBadge tier={tier} size={size} />;
}
