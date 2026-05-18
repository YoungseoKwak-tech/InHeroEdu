// GET /api/future/state
//
// Returns everything /future needs to render:
//   - paths[]: the 4 canonical paths + viewer's resonance per path
//   - recent_events[]: last 8 resonance / completion events
//   - dominant_path: highest-resonance path slug (or null if all 0)
//   - silhouette_clarity: 0–1 average resonance, drives the SVG
//     stroke opacity / feature definition

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { PATHS } from "@/lib/future-self/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;
  const sb = createAdminClient();

  // Fetch all rows; merge with the canonical catalog so paths
  // the user has never triggered still appear at 0.
  const { data: rows } = await sb
    .from("future_self_paths")
    .select("path_slug, resonance, updated_at")
    .eq("user_id", user.id);
  const bySlug = new Map<string, { resonance: number; updated_at: string | null }>();
  for (const r of rows ?? []) {
    bySlug.set(r.path_slug as string, {
      resonance: (r.resonance as number) ?? 0,
      updated_at: (r.updated_at as string | null) ?? null,
    });
  }

  const paths = PATHS.map((p) => {
    const row = bySlug.get(p.slug);
    return {
      slug: p.slug,
      name: p.name,
      description: p.description,
      glyph: p.glyph,
      accent: p.accent,
      resonance: row?.resonance ?? 0,
      updated_at: row?.updated_at ?? null,
    };
  });

  const dominant = [...paths].sort((a, b) => b.resonance - a.resonance)[0];
  const dominantPath = dominant && dominant.resonance > 0 ? dominant.slug : null;
  const silhouetteClarity = paths.length > 0
    ? paths.reduce((s, p) => s + p.resonance, 0) / paths.length
    : 0;

  const { data: events } = await sb
    .from("recent_events")
    .select("id, event_type, payload, occurred_at")
    .eq("user_id", user.id)
    .order("occurred_at", { ascending: false })
    .limit(8);

  return NextResponse.json({
    ok: true,
    paths,
    dominant_path: dominantPath,
    silhouette_clarity: silhouetteClarity,
    recent_events: events ?? [],
  });
}
