// Canonical path catalog for the Future Self silhouette.
// Each path's `bias` describes how strongly different subject
// areas pull resonance toward it — used by the resonance-update
// helper to translate "studied chapter X" into "+Δ to path Y".
//
// Copy is intentionally lo-fi observatory tone (no motivational
// platitudes). Add new paths here when the silhouette gains them.

export interface PathDef {
  slug: string;
  name: string;
  description: string;
  glyph: string;
  accent: string; // hex
  // Subject slugs that push resonance up for this path. Values
  // are weights, summed when an event hits multiple matches.
  bias: Record<string, number>;
  // Lo-fi event copy. Picked at random by recordResonanceEvent.
  resonance_phrases: string[];
}

export const PATHS: PathDef[] = [
  {
    slug: "researcher",
    name: "Researcher",
    description: "Late-night lab notes. Slow-burning questions. Citation depth.",
    glyph: "◆",
    accent: "#5eead4",
    bias: { "ap-bio": 1.0, "ap-chem": 1.0, "ap-physics-1": 0.8, "ap-physics-c": 0.8, "ap-env-sci": 0.7, "ap-stats": 0.6 },
    resonance_phrases: [
      "researcher future is clarifying",
      "experimental thinking detected",
      "literature-trace activity rising",
      "hypothesis pattern stabilizing",
    ],
  },
  {
    slug: "founder",
    name: "Founder",
    description: "Build energy. Pattern-matching across fields. Bias to ship.",
    glyph: "✦",
    accent: "#a99cff",
    bias: { "ap-cs-a": 1.0, "ap-csp": 1.0, "ap-macro": 0.8, "ap-micro": 0.8, "ap-stats": 0.6, "sat": 0.3 },
    resonance_phrases: [
      "builder signature emerging",
      "founder future is clarifying",
      "ship-instinct strengthening",
      "build-mode resonance up",
    ],
  },
  {
    slug: "doctor",
    name: "Doctor",
    description: "Systems thinking. Memory load. Bedside patience.",
    glyph: "✚",
    accent: "#FF8B7E",
    bias: { "ap-bio": 1.0, "ap-chem": 0.9, "ap-psych": 0.8, "ap-stats": 0.5, "ap-physics-1": 0.4 },
    resonance_phrases: [
      "clinical reasoning detected",
      "doctor future is clarifying",
      "medical-pattern recall expanding",
      "diagnostic intuition tuning up",
    ],
  },
  {
    slug: "artist",
    name: "Artist",
    description: "Long attention. Texture sense. Unhurried craft.",
    glyph: "❋",
    accent: "#F4C95D",
    bias: { "ap-english-lit": 1.0, "ap-english-lang": 0.9, "ap-euro": 0.6, "ap-world": 0.5, "ap-us-hist": 0.5, "common-app": 0.7, "supplements": 0.7 },
    resonance_phrases: [
      "voice-development trace detected",
      "artist future is clarifying",
      "craft-time accumulating",
      "narrative density rising",
    ],
  },
];

export const PATH_BY_SLUG = new Map(PATHS.map((p) => [p.slug, p]));

// Translate a subject slug into per-path resonance deltas.
// Each path's bias for the subject is multiplied by a base
// step (default 0.04 — about 25 chapters of activity to fill).
export function deltasForSubject(subjectSlug: string | null, base = 0.04): Map<string, number> {
  const out = new Map<string, number>();
  if (!subjectSlug) return out;
  for (const path of PATHS) {
    const weight = path.bias[subjectSlug];
    if (weight) out.set(path.slug, weight * base);
  }
  return out;
}

// Lo-fi event copy for a path. Stable per path during a session
// (so users don't see the same phrase recycled rapidly).
export function pickPhraseForPath(slug: string): string {
  const p = PATH_BY_SLUG.get(slug);
  if (!p || p.resonance_phrases.length === 0) return "resonance increasing";
  return p.resonance_phrases[Math.floor(Math.random() * p.resonance_phrases.length)];
}
