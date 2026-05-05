export type HeroCodeId =
  | "PF" | "PB" | "PS"
  | "CF" | "CS" | "CE"
  | "DF" | "DA" | "DB"
  | "FS" | "FT" | "FB"
  | "IF" | "IE" | "IB"
  | "CV" | "CT" | "CA"
  | "DS" | "PE";

export interface HeroCodeMeta {
  id: HeroCodeId;
  name: string;
  oneLiner: string;
  activation: string;
  path: string;
  mascot: string;
  mascotName: string;
  accent: string;
  glow: string;
}

export const HERO_CODE_META: Record<HeroCodeId, HeroCodeMeta> = {
  PF: { id: "PF", name: "Pressure Forger", oneLiner: "Stress organizes you.", activation: "Deadlines, competition, responsibility", path: "Put yourself in high-stakes environments.", mascot: "🦊", mascotName: "Ember Fox", accent: "#D97706", glow: "rgba(217,119,6,0.22)" },
  PB: { id: "PB", name: "Chaos Builder", oneLiner: "You build under fire.", activation: "Urgency, uncertainty", path: "Stop waiting for perfect. Build immediately.", mascot: "🦝", mascotName: "Spark Raccoon", accent: "#F97316", glow: "rgba(249,115,22,0.22)" },
  PS: { id: "PS", name: "Tactical Executor", oneLiner: "Pressure sharpens your moves.", activation: "Real performance situations", path: "Increase real-world reps.", mascot: "🦅", mascotName: "Strike Hawk", accent: "#DC2626", glow: "rgba(220,38,38,0.22)" },
  CF: { id: "CF", name: "Pattern Seeker", oneLiner: "Curiosity finds structure.", activation: "New concepts, unexpected connections", path: "Protect interest-driven learning.", mascot: "🐱", mascotName: "Constellation Cat", accent: "#BA7517", glow: "rgba(186,117,23,0.22)" },
  CS: { id: "CS", name: "System Walker", oneLiner: "You decode step by step.", activation: "Logical flow, clear progression", path: "You need structured curriculum paths.", mascot: "🐢", mascotName: "Archive Turtle", accent: "#534AB7", glow: "rgba(83,74,183,0.22)" },
  CE: { id: "CE", name: "Idea Explorer", oneLiner: "You chase what could be.", activation: "New possibilities", path: "Explore widely, then commit to one direction.", mascot: "🦊", mascotName: "Balloon Fox", accent: "#993556", glow: "rgba(153,53,86,0.22)" },
  DF: { id: "DF", name: "Vision Architect", oneLiner: "You turn ambition into structure.", activation: "Big goals", path: "Break ambition into systems.", mascot: "🦌", mascotName: "Blueprint Stag", accent: "#2563EB", glow: "rgba(37,99,235,0.22)" },
  DA: { id: "DA", name: "Concept Driver", oneLiner: "You move through ideas.", activation: "Deep conceptual understanding", path: "Force output, not just input.", mascot: "🐇", mascotName: "Engine Hare", accent: "#0F766E", glow: "rgba(15,118,110,0.22)" },
  DB: { id: "DB", name: "Goal Builder", oneLiner: "You build what you want.", activation: "Clear targets", path: "Always set the next goal.", mascot: "🦫", mascotName: "Brick Beaver", accent: "#4F46E5", glow: "rgba(79,70,229,0.22)" },
  FS: { id: "FS", name: "Stability Keeper", oneLiner: "You perform in certainty.", activation: "Stable environments", path: "Train with gradual change.", mascot: "🐧", mascotName: "Balance Penguin", accent: "#0284C7", glow: "rgba(2,132,199,0.22)" },
  FT: { id: "FT", name: "Risk Scanner", oneLiner: "You move by avoiding loss.", activation: "Possibility of failure", path: "Practice small failures on purpose.", mascot: "🦇", mascotName: "Radar Bat", accent: "#64748B", glow: "rgba(100,116,139,0.22)" },
  FB: { id: "FB", name: "Defensive Builder", oneLiner: "You prepare before you act.", activation: "Anxiety, uncertainty", path: "Execute at 70%, not 100%.", mascot: "🐹", mascotName: "Shield Hamster", accent: "#B45309", glow: "rgba(180,83,9,0.22)" },
  IF: { id: "IF", name: "Impact Strategist", oneLiner: "You think in influence.", activation: "People, reach, effect", path: "You need collaborative environments.", mascot: "🐺", mascotName: "Signal Wolf", accent: "#C2410C", glow: "rgba(194,65,12,0.22)" },
  IE: { id: "IE", name: "Social Explorer", oneLiner: "You grow through people.", activation: "New relationships, new circles", path: "Build through networks and exposure.", mascot: "🐦", mascotName: "Passport Sparrow", accent: "#CA8A04", glow: "rgba(202,138,4,0.22)" },
  IB: { id: "IB", name: "Community Builder", oneLiner: "You build with others.", activation: "Team projects", path: "Choose team-centered roles.", mascot: "🐜", mascotName: "Captain Ant", accent: "#059669", glow: "rgba(5,150,105,0.22)" },
  CV: { id: "CV", name: "Pattern Hacker", oneLiner: "You see what others miss.", activation: "Complex data, hidden signals", path: "Express ideas through visualization.", mascot: "🐙", mascotName: "Signal Octo", accent: "#7C3AED", glow: "rgba(124,58,237,0.22)" },
  CT: { id: "CT", name: "Experiment Runner", oneLiner: "You learn by trying.", activation: "Test environments", path: "Run fast experiments repeatedly.", mascot: "🐒", mascotName: "Lab Runner", accent: "#DB2777", glow: "rgba(219,39,119,0.22)" },
  CA: { id: "CA", name: "Abstract Mapper", oneLiner: "You connect invisible dots.", activation: "Cross-concept linkage", path: "Translate ideas into real examples.", mascot: "🦌", mascotName: "Aurora Stag", accent: "#0F6E56", glow: "rgba(15,110,86,0.22)" },
  DS: { id: "DS", name: "Relentless Strategist", oneLiner: "Once locked in, you do not stop.", activation: "Goal commitment", path: "Build in mid-course review points.", mascot: "♞", mascotName: "Knight Wolf", accent: "#1D4ED8", glow: "rgba(29,78,216,0.22)" },
  PE: { id: "PE", name: "Adrenaline Explorer", oneLiner: "You peak in intensity.", activation: "Tension, challenge, adrenaline", path: "Design challenge into your routine.", mascot: "🐆", mascotName: "Volt Cheetah", accent: "#EA580C", glow: "rgba(234,88,12,0.22)" },
};

export const HERO_CODE_ORDER: HeroCodeId[] = [
  "PF", "PB", "PS",
  "CF", "CS", "CE",
  "DF", "DA", "DB",
  "FS", "FT", "FB",
  "IF", "IE", "IB",
  "CV", "CT", "CA",
  "DS", "PE",
];

export function getHeroCodeMeta(code?: string | null) {
  if (!code) return null;
  return HERO_CODE_META[code.slice(0, 2) as HeroCodeId] ?? null;
}
