/**
 * Core Notes English version — Honors Chemistry Unit 4 (Thermochemistry).
 * Faithful English rendering of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
 * Source: lib/data/authored-corenotes/honors-chemistry.json, unit 4 (lessonNum 1-4).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_CHEMISTRY_U4_EN: CoreNote[] = [
  {
    lessonId: "honors-chemistry-u4-l1",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 1,
    unitName: "Thermochemistry",
    title: "What Heat and Temperature Actually Measure",
    subtitle: "The difference between heat and temperature, specific heat capacity, and calorimetry",
    overview:
      "Heat and temperature are not the same thing. Temperature measures the average kinetic energy of particles; heat is the total thermal energy that flows from a hotter to a colder object. A bathtub of warm water holds far more heat than a spark that is much hotter, because heat depends on amount and on specific heat capacity — how much energy a substance needs to change temperature. Water's unusually high specific heat is why oceans moderate climate and why it is such an effective coolant. Calorimetry measures these energy flows with q = mcΔT.",
    objectives: [
      "Distinguish heat from temperature",
      "Define and use specific heat capacity",
      "Apply q = mcΔT in calorimetry problems",
      "Explain why water's high specific heat matters",
    ],
    formulas: [
      "q = m c ΔT  (heat = mass × specific heat × temperature change)",
      "ΔT = T_final − T_initial (°C or K)",
      "Conservation: q_lost by hot = − q_gained by cold",
      "Specific heat of water ≈ 4.18 J/(g·°C)",
    ],
    sections: [
      {
        title: "Heat vs Temperature, and Specific Heat",
        subtitle: "Why a sparkler is hotter but burns less than a kettle",
        body: "Temperature is the average kinetic energy per particle; heat is the total energy transferred between objects at different temperatures. A sparkler at 1000 °C carries little total heat because it has so few particles, while a kettle of boiling water at 100 °C holds enormous heat. Specific heat capacity is the energy needed to raise 1 g of a substance by 1 °C — water's is unusually high (4.18 J/g·°C), so it resists temperature change and stores lots of energy.",
        keyIdea: "Temperature = average kinetic energy; heat = total energy that flows; specific heat = energy needed per gram per degree.",
        terms: [
          { term: "Temperature", def: "A measure of the average kinetic energy of the particles in a substance." },
          { term: "Heat (q)", def: "Thermal energy that flows from a hotter to a colder object; depends on amount and ΔT." },
          { term: "Specific heat capacity (c)", def: "The energy needed to raise the temperature of 1 g of a substance by 1 °C." },
          { term: "Thermal equilibrium", def: "The state where two objects in contact reach the same temperature and net heat flow stops." },
        ],
        traps: [
          "A higher temperature does NOT mean more total heat — amount and specific heat matter too.",
          "Specific heat is per gram per degree; don't forget to multiply by mass.",
        ],
      },
      {
        title: "Calorimetry: Measuring Heat Flow",
        subtitle: "q = mcΔT and conservation of energy",
        body: "Calorimetry measures heat exchange by tracking temperature change in an insulated container. Using q = mcΔT, the heat lost by a hot object equals the heat gained by a cold one (energy is conserved): q_hot = −q_cold. This lets us find an unknown specific heat or a reaction's energy. ΔT is always final minus initial, so a temperature rise gives positive q (heat absorbed) and a drop gives negative q (heat released).",
        keyIdea: "In an insulated system, heat lost by one substance = heat gained by another; solve with q = mcΔT.",
        terms: [
          { term: "Calorimetry", def: "The experimental measurement of heat flow during physical or chemical changes." },
          { term: "Calorimeter", def: "An insulated device used to measure heat exchange via temperature change." },
          { term: "Conservation of energy", def: "Energy is neither created nor destroyed; heat lost by one body is gained by another." },
        ],
        traps: [
          "Mind the sign of ΔT (final − initial): a temperature drop makes q negative.",
          "Assume the calorimeter is insulated unless told otherwise — heat lost = heat gained.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u4-l2",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 2,
    unitName: "Thermochemistry",
    title: "How to Calculate Energy Change in a Reaction",
    subtitle: "Enthalpy, exothermic vs endothermic reactions, Hess's law, and bond energies",
    overview:
      "Every reaction absorbs or releases energy as bonds break and form. Enthalpy change (ΔH) is the heat exchanged at constant pressure: negative for exothermic reactions (energy released, surroundings warm) and positive for endothermic ones (energy absorbed, surroundings cool). Because enthalpy is a state function, ΔH depends only on the start and end points — so we can add reaction steps (Hess's law) or estimate ΔH from bond energies. Breaking bonds costs energy; forming bonds releases it.",
    objectives: [
      "Define enthalpy and classify reactions as exo/endothermic",
      "Interpret the sign of ΔH",
      "Apply Hess's law to combine reaction steps",
      "Estimate ΔH from bond energies",
    ],
    formulas: [
      "ΔH < 0 → exothermic (releases heat); ΔH > 0 → endothermic (absorbs heat)",
      "Hess's law: ΔH_total = Σ ΔH_steps",
      "ΔH ≈ Σ(bonds broken) − Σ(bonds formed)",
    ],
    sections: [
      {
        title: "Enthalpy: Exothermic and Endothermic",
        subtitle: "Reading the sign of ΔH",
        body: "Enthalpy change ΔH is the heat exchanged at constant pressure. In an exothermic reaction (combustion, neutralization) the products are lower in energy than the reactants, so energy is released and ΔH is negative — the surroundings warm up. In an endothermic reaction (photosynthesis, dissolving ammonium nitrate) the products are higher in energy, energy is absorbed, ΔH is positive, and the surroundings cool. An energy diagram shows reactants and products at different heights with ΔH as the gap.",
        keyIdea: "Exothermic releases heat (ΔH negative); endothermic absorbs heat (ΔH positive).",
        terms: [
          { term: "Enthalpy (H)", def: "The heat content of a system at constant pressure; we track its change, ΔH." },
          { term: "Exothermic", def: "A reaction that releases heat to the surroundings (ΔH < 0)." },
          { term: "Endothermic", def: "A reaction that absorbs heat from the surroundings (ΔH > 0)." },
          { term: "State function", def: "A property depending only on the current state, not the path taken (enthalpy is one)." },
        ],
        traps: [
          "Exothermic means the SYSTEM loses energy (ΔH < 0) while the surroundings gain it.",
          "The sign of ΔH is from the system's perspective — don't flip it.",
        ],
      },
      {
        title: "Hess's Law and Bond Energies",
        subtitle: "Two ways to find ΔH without measuring it directly",
        body: "Because enthalpy is a state function, ΔH depends only on initial and final states, not the route. Hess's law lets us add the ΔH of intermediate steps to get the overall ΔH (reverse a step → flip the sign; scale a step → scale ΔH). Alternatively, since breaking bonds absorbs energy and forming bonds releases it, ΔH ≈ (energy to break reactant bonds) − (energy released forming product bonds). A net release of energy gives a negative ΔH.",
        keyIdea: "ΔH is path-independent: add steps (Hess's law) or use bonds broken minus bonds formed.",
        terms: [
          { term: "Hess's law", def: "The total ΔH of a reaction equals the sum of the ΔH of any set of steps that add to it." },
          { term: "Bond energy", def: "The energy required to break one mole of a particular bond in the gas phase." },
          { term: "Standard enthalpy of formation (ΔH°f)", def: "The enthalpy change to form one mole of a compound from its elements in standard states." },
        ],
        traps: [
          "Reversing a reaction flips the sign of ΔH; multiplying a reaction multiplies ΔH.",
          "Bond-energy formula is broken MINUS formed — reversing it gives the wrong sign.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u4-l3",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 3,
    unitName: "Thermochemistry",
    title: "Why Some Reactions Happen Spontaneously and Others Don't",
    subtitle: "Entropy, Gibbs free energy, and how enthalpy and entropy together decide spontaneity",
    overview:
      "Spontaneity is not about speed — it is about whether a process can proceed on its own. Two factors decide it: enthalpy (systems tend toward lower energy) and entropy (systems tend toward greater disorder). Gibbs free energy combines them as ΔG = ΔH − TΔS. A reaction is spontaneous when ΔG is negative. Because temperature multiplies the entropy term, the same reaction can be spontaneous at one temperature and not another — which is why ice melts above 0 °C but refreezes below it.",
    objectives: [
      "Define entropy and predict its change in a process",
      "State the meaning of Gibbs free energy",
      "Use ΔG = ΔH − TΔS to predict spontaneity",
      "Explain how temperature affects spontaneity",
    ],
    formulas: [
      "ΔG = ΔH − TΔS  (T in kelvin)",
      "ΔG < 0 → spontaneous; ΔG > 0 → nonspontaneous; ΔG = 0 → equilibrium",
      "Entropy ↑: solid → liquid → gas, fewer → more particles, dissolving",
    ],
    sections: [
      {
        title: "Entropy: The Drive Toward Disorder",
        subtitle: "Why gases spread and ice melts",
        body: "Entropy (S) measures the number of ways energy and particles can be arranged — loosely, disorder. Systems naturally move toward higher entropy: a gas fills its container, a drop of dye spreads through water. Entropy increases going solid → liquid → gas, when a reaction makes more gas molecules, and when a solid dissolves. The second law of thermodynamics says the total entropy of the universe always increases for a spontaneous process.",
        keyIdea: "Entropy is the tendency toward more disorder; it rises from solid to liquid to gas and when particle count increases.",
        terms: [
          { term: "Entropy (S)", def: "A measure of the disorder or number of accessible microstates of a system." },
          { term: "Second law of thermodynamics", def: "The total entropy of the universe increases in any spontaneous process." },
          { term: "Spontaneous process", def: "A change that proceeds on its own without continuous outside energy input." },
        ],
        traps: [
          "Spontaneous does NOT mean fast — rusting is spontaneous but slow.",
          "Entropy generally increases when gases form or particle count rises; check phases.",
        ],
      },
      {
        title: "Gibbs Free Energy and Temperature",
        subtitle: "ΔG = ΔH − TΔS decides everything",
        body: "Gibbs free energy combines enthalpy and entropy: ΔG = ΔH − TΔS. A reaction is spontaneous when ΔG < 0. Exothermic + entropy-increasing reactions (ΔH < 0, ΔS > 0) are always spontaneous; the opposite case never is. When ΔH and ΔS push opposite ways, temperature decides: a high T can make a positive TΔS term dominate. This is why melting (ΔH > 0, ΔS > 0) is spontaneous only above the melting point.",
        keyIdea: "ΔG = ΔH − TΔS; negative ΔG means spontaneous, and temperature can flip the outcome.",
        terms: [
          { term: "Gibbs free energy (G)", def: "The thermodynamic quantity whose change predicts spontaneity: ΔG = ΔH − TΔS." },
          { term: "Spontaneity", def: "Whether a process can occur on its own; determined by the sign of ΔG." },
          { term: "Equilibrium (ΔG = 0)", def: "The point where forward and reverse drives balance and no net change occurs." },
        ],
        traps: [
          "Temperature in ΔG = ΔH − TΔS must be in KELVIN, not °C.",
          "ΔG, not ΔH alone, determines spontaneity — entropy and temperature can override enthalpy.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u4-l4",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 4,
    unitName: "Thermochemistry",
    title: "How Energy Changes at Phase Boundaries",
    subtitle: "Heating curves, latent heat of fusion and vaporization, and why temperature pauses during a phase change",
    overview:
      "When you heat ice steadily, its temperature climbs — then stalls at 0 °C while it melts, climbs again, then stalls at 100 °C while it boils. During a phase change the added energy goes entirely into breaking intermolecular forces, not into raising temperature, so the thermometer holds steady. This 'hidden' energy is latent heat. Vaporization needs far more energy than fusion because boiling fully separates the molecules. A heating curve maps these stages and lets us compute total energy with q = mcΔT plus q = mL.",
    objectives: [
      "Read a heating curve and identify each stage",
      "Explain why temperature is constant during a phase change",
      "Distinguish heat of fusion from heat of vaporization",
      "Calculate total energy combining q = mcΔT and q = mL",
    ],
    formulas: [
      "Within a phase: q = m c ΔT (temperature rises)",
      "During a phase change: q = m L (temperature constant)",
      "L_vaporization > L_fusion (full separation costs more energy)",
    ],
    sections: [
      {
        title: "The Heating Curve and Latent Heat",
        subtitle: "Why the thermometer pauses while ice melts",
        body: "On a heating curve, sloped segments are single phases where temperature rises (q = mcΔT), and flat plateaus are phase changes where temperature is constant. During melting or boiling, all incoming energy goes to overcoming intermolecular forces — increasing potential energy, not kinetic energy — so the temperature does not change. This stored energy is latent heat: heat of fusion for melting, heat of vaporization for boiling.",
        keyIdea: "During a phase change, added energy breaks intermolecular forces instead of raising temperature, so T stays flat.",
        terms: [
          { term: "Heating curve", def: "A graph of temperature vs energy added, showing sloped phases and flat phase-change plateaus." },
          { term: "Latent heat", def: "Energy absorbed or released during a phase change at constant temperature." },
          { term: "Heat of fusion (L_f)", def: "Energy to convert 1 g (or 1 mol) of solid to liquid at the melting point." },
          { term: "Heat of vaporization (L_v)", def: "Energy to convert 1 g (or 1 mol) of liquid to gas at the boiling point." },
        ],
        traps: [
          "Temperature stays constant during a phase change even though energy is being added.",
          "Use q = mL (not q = mcΔT) for the flat plateaus — ΔT is zero there.",
        ],
      },
      {
        title: "Why Vaporization Costs More Than Fusion",
        subtitle: "Loosening vs fully separating molecules",
        body: "Melting only loosens molecules enough to let them slide past each other, so the intermolecular forces are partly retained. Boiling pulls molecules completely apart into the gas phase, fully overcoming those forces, which demands much more energy — water's heat of vaporization (~2260 J/g) far exceeds its heat of fusion (~334 J/g). To find total energy for a multi-stage process, add each segment: heat the solid, melt it, heat the liquid, boil it, heat the gas.",
        keyIdea: "Vaporization fully separates molecules and needs far more energy than fusion, which only loosens them.",
        terms: [
          { term: "Phase change", def: "A transition between solid, liquid, and gas at constant temperature." },
          { term: "Sublimation", def: "A direct solid-to-gas phase change without passing through the liquid." },
          { term: "Intermolecular forces", def: "Attractions between molecules that must be overcome (partly in melting, fully in boiling)." },
        ],
        traps: [
          "Heat of vaporization is much larger than heat of fusion — don't treat them as equal.",
          "For total energy across phases, sum every segment; don't skip the phase-change plateaus.",
        ],
      },
    ],
  },
];
