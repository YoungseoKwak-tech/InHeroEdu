/**
 * GET /api/parents/activities — admit activities + deep guides, server-gated.
 *
 * The Common App entries, analysis, and step-by-step build guides used to ship
 * in the client bundle (CreditGate only CSS-blurred them). Now the paid detail
 * is stripped server-side for non-holders:
 *   - activity detail (원문·분석·실행 가이드) ← res:/parents/activities/list
 *   - each deep guide's detail ← res:/parents/activities/guide:<id>
 * Free teaser fields (titles, meta, overview, strategy points) always return.
 * Admins get everything. Client fetches via authFetch + re-fetches on unlock.
 */
import { NextRequest, NextResponse } from "next/server";
import {
  ACTIVITIES, DEEP_GUIDES, STRATEGY_POINTS, COMMONAPP_RULES,
  type ActivityEntry, type DeepGuide,
} from "@/app/parents/activities/data";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const LIST_KEY = "res:/parents/activities/list"; // legacy bundle — still unlocks all
const itemKey = (num: number) => `res:/parents/activities/item:${num}`;
const guideKey = (id: string) => `res:/parents/activities/guide:${id}`;

// Empty the paid fields (keep shape so the client never crashes on undefined).
function stripActivity(a: ActivityEntry): ActivityEntry {
  return {
    ...a, typeEn: "", bullets: [], analysis: "",
    grades: "", timing: "", hoursPerWeek: "", weeksPerYear: "",
    guideTitle: "", guideIntro: "", steps: [], resources: [], storyTip: "",
  };
}
function stripGuide(g: DeepGuide): DeepGuide {
  return { ...g, table: undefined, phases: [], links: [], pitfalls: [], commonApp: "", storyTip: "" };
}

export async function GET(req: NextRequest) {
  const ctx = await getUnlockContext(req);
  const listUnlocked = hasAnyUnlock(ctx, [LIST_KEY]);
  // Per-activity unlock (25 credits each); the legacy bundle still unlocks all.
  const activities = ACTIVITIES.map((a) =>
    listUnlocked || hasAnyUnlock(ctx, [itemKey(a.num)]) ? a : stripActivity(a)
  );
  const guides = DEEP_GUIDES.map((g) => (hasAnyUnlock(ctx, [guideKey(g.id)]) ? g : stripGuide(g)));
  return NextResponse.json(
    {
      activities, guides,
      strategyPoints: STRATEGY_POINTS, commonAppRules: COMMONAPP_RULES,
      listLocked: !listUnlocked,
    },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
