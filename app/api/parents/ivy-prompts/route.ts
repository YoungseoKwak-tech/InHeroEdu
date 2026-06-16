/**
 * GET /api/parents/ivy-prompts — Ivy-League admissions AI prompt pack, gated.
 *
 * The first 2 prompts are a free taster (full body). For every other prompt,
 * non-holders get the title/desc teaser but the prompt body is stripped — the
 * paid copy never ships to the browser. Holders of res:/parents/ivy-prompts
 * (admins exempt) get the full pack. Client fetches via authFetch.
 */
import { NextRequest, NextResponse } from "next/server";
import { IVY_PROMPTS, IVY_PROMPT_COST } from "@/lib/data/ivyPrompts";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const UNLOCK_KEY = "res:/parents/ivy-prompts";
const PREVIEW = 2;

export async function GET(req: NextRequest) {
  const ctx = await getUnlockContext(req);
  const unlocked = hasAnyUnlock(ctx, [UNLOCK_KEY]);
  const prompts = IVY_PROMPTS.map((p, i) =>
    unlocked || i < PREVIEW ? p : { ...p, prompt: "" }
  );
  return NextResponse.json(
    { prompts, total: IVY_PROMPTS.length, preview: PREVIEW, cost: IVY_PROMPT_COST, locked: !unlocked },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
