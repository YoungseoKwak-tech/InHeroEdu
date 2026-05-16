import {
  buildScriptOverlayRowsFromRaw,
  type RawScriptOverlay,
  type ScriptDerivedOverlayRow,
} from "@/lib/scriptOverlays";

const KNOWN_SCRIPT_OVERLAYS: Record<string, RawScriptOverlay[]> = {
  "ap-biology-u1-l1": [
    {
      id: "spark-1",
      type: "SPARK",
      prompt:
        "If you poured oil into water, the water molecules don't bond to the oil - they bond harder to each other around it. Why does that push the oil out instead of just surrounding it?",
    },
    {
      id: "gap-crunch-1",
      type: "GAP_CRUNCH",
      statement:
        "A drop in pH disrupts enzyme function because it alters the enzyme's shape, not just its environment.",
      trap:
        "Students say 'low pH denatures the enzyme' without explaining why - treating pH as a vague harmful condition rather than a specific molecular event.",
      correct:
        "Increased H+ ions protonate charged R-groups, disrupting the ionic and hydrogen bonds that maintain tertiary structure and collapsing the active site's 3D geometry.",
      options: [
        "The acidic environment interferes with the reaction",
        "Extra H+ ions alter R-group charges, collapsing the active site's shape",
      ],
    },
    {
      id: "teach-back-1",
      type: "TEACH_BACK",
      prompt:
        "Without using the word 'polar,' explain to a friend why a water molecule can form hydrogen bonds - and why that same property lets it dissolve salt. Go.",
    },
    {
      id: "question-1",
      type: "QUESTION_SPRINT",
      question: "Which property of water allows it to move upward through xylem against gravity?",
      options: [
        "Water's high specific heat capacity",
        "Cohesion due to hydrogen bonding between water molecules",
        "Adhesion between water and air molecules",
        "The hydrophobic effect of xylem cell walls",
      ],
      correct: 1,
      explanation:
        "Cohesion - water molecules holding onto each other via hydrogen bonds - allows the water column to act as a continuous chain pulled upward by transpiration. Adhesion to xylem walls assists, but cohesion is the direct mechanism for the upward pull.",
      wrongPattern:
        "Confusing cohesion with adhesion, or attributing xylem transport to osmosis or specific heat",
    },
    {
      id: "question-2",
      type: "QUESTION_SPRINT",
      question:
        "A researcher observes that an enzyme stops functioning when the pH of the solution drops from 7 to 5. Which explanation best accounts for this?",
      options: [
        "The lower pH reduced the kinetic energy of the enzyme molecules",
        "The increased H+ concentration altered the charge of R-groups in the active site, disrupting tertiary structure",
        "The acidic conditions caused the substrate to break down before binding",
        "Water molecules became less polar at lower pH, reducing enzyme-substrate interactions",
      ],
      correct: 1,
      explanation:
        "H+ ions protonate R-groups on amino acid side chains, neutralizing their charges and destroying the ionic and hydrogen bonds that maintain the active site's 3D geometry. No geometry, no substrate binding, no function.",
      wrongPattern:
        "Saying 'the acidic environment' harmed the enzyme without identifying the specific molecular mechanism - treating pH change as a vague condition rather than a protonation event",
    },
    {
      id: "question-3",
      type: "QUESTION_SPRINT",
      question:
        "During intense exercise, CO2 produced by muscle cells enters the blood and reacts with water to form carbonic acid (H2CO3), which dissociates into H+ and HCO3-. Which of the following best describes how the blood buffer system responds to maintain homeostasis?",
      options: [
        "The kidneys immediately excrete all H+ ions, removing the acid permanently",
        "Hemoglobin denatures to absorb the excess H+ ions",
        "Bicarbonate ions in the blood accept the excess H+, forming carbonic acid and resisting the pH drop",
        "Blood pH drops sharply because the buffer is overwhelmed by the CO2 influx",
      ],
      correct: 2,
      explanation:
        "Bicarbonate (HCO3-) acts as a base - it accepts the extra H+ produced when carbonic acid dissociates. This converts it back to H2CO3, effectively hiding the free H+ and preventing a sharp pH drop.",
      wrongPattern:
        "Confusing immediate chemical buffering with slower kidney regulation, or assuming exercise instantly overwhelms normal blood buffer capacity",
    },
    {
      id: "analyzer-1",
      type: "ANALYZER",
      gapType: "LOGIC GAP",
      message:
        "You know the vocabulary - polarity, hydrogen bond, buffer - but when pressure hits, you describe what happens instead of why it happens at the molecular level. AP free response rewards the mechanism. Train yourself to always ask: what specific bonds are breaking, and what specific charges are changing?",
    },
  ],
};

export function getKnownScriptOverlayRows(lessonId: string): ScriptDerivedOverlayRow[] {
  const raw = KNOWN_SCRIPT_OVERLAYS[lessonId] ?? [];
  return buildScriptOverlayRowsFromRaw(raw, lessonId);
}
