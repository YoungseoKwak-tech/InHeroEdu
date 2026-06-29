/**
 * Core Notes English version — Honors Chemistry Unit 6 (Electrochemistry).
 * Faithful English rendering of the Korean-authored "why" Core Notes.
 * IB-level depth; terms are in English with exam-ready definitions.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_CHEMISTRY_U6_EN: CoreNote[] = [
  {
    lessonId: "honors-chemistry-u6-l1",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 1,
    unitName: "Electrochemistry",
    title: "How to Assign and Track Electron Bookkeeping (Oxidation States)",
    subtitle: "Oxidation states are the accounting ledger of electrons — OIL RIG, and the oxidizing agent is itself reduced",
    overview:
      "Electrochemistry is the discipline of tracking where electrons go, and the accounting ledger for that tracking is the oxidation state (oxidation number). By applying a short set of rules you can assign an oxidation state to every atom in a molecule or ion, and then read changes in those numbers as oxidation (electrons lost, number rises) or reduction (electrons gained, number falls) — the OIL RIG mnemonic. The most conceptually tricky part is the role distinction: the oxidizing agent causes another species to be oxidized, but in doing so it receives electrons and is itself reduced. Getting that inversion right is the key to every electrochemistry problem that follows.",
    objectives: [
      "Apply the oxidation-state rules to assign an oxidation number to each atom in a molecule or polyatomic ion",
      "Use changes in oxidation number to identify oxidation and reduction in a redox reaction (OIL RIG)",
      "Distinguish the oxidizing agent from the reducing agent and describe what happens to each",
      "Identify the oxidation half-reaction and the reduction half-reaction in a balanced equation",
    ],
    formulas: [
      "O = −2 (except in peroxides: −1), H = +1 (except in metal hydrides: −1), elemental form = 0",
      "Neutral molecule: sum of all oxidation states = 0; polyatomic ion: sum = ionic charge",
      "OIL RIG: Oxidation Is Loss (oxidation state increases), Reduction Is Gain (oxidation state decreases)",
    ],
    sections: [
      {
        title: "Assigning Oxidation States",
        subtitle: "A rule-based system for distributing imaginary charges among atoms",
        body: "An oxidation state is a hypothetical charge assigned to each atom under the assumption that all bonding electrons belong entirely to the more electronegative partner. The rules, applied in priority order: (1) any element in its pure elemental form has oxidation state 0; (2) a monatomic ion's oxidation state equals its ionic charge; (3) oxygen is −2 in almost all compounds (exception: peroxides such as H₂O₂ where O = −1); (4) hydrogen is +1 in most compounds (exception: metal hydrides such as NaH where H = −1); (5) the sum of all oxidation states in a neutral molecule equals 0, and in a polyatomic ion equals the ion's charge. These constraints let you back-calculate any unknown oxidation state by algebra.",
        keyIdea: "The sum rule is the master constraint — use it to solve for the unknown atom's oxidation state.",
        terms: [
          {
            term: "Oxidation state (oxidation number)",
            def: "A hypothetical charge assigned to an atom based on assumed complete electron transfer in each bond. Used to track electron flow in redox reactions.",
          },
          {
            term: "Redox reaction",
            def: "A reaction in which electrons are transferred so that at least one atom's oxidation state changes. Oxidation and reduction always occur together.",
          },
          {
            term: "Peroxide",
            def: "A compound containing the O₂²⁻ ion, in which each oxygen has oxidation state −1 rather than the usual −2. Example: H₂O₂.",
          },
          {
            term: "Metal hydride",
            def: "A binary compound of a metal and hydrogen in which hydrogen is the more electronegative partner, giving H an oxidation state of −1. Example: NaH.",
          },
        ],
        traps: [
          "Assuming oxygen is always −2 — in peroxides (H₂O₂, Na₂O₂) oxygen is −1. Applying the default blindly gives the wrong oxidation state for the other atom as well.",
          "Forgetting that the sum rule applies to polyatomic ions using the ion's charge, not zero — SO₄²⁻ has a charge of −2, so the oxidation states must sum to −2, not 0.",
        ],
        example: "In SO₄²⁻: each O = −2, so four oxygens contribute −8. The ion charge is −2. Therefore S + (−8) = −2, giving S = +6.",
      },
      {
        title: "OIL RIG — Oxidation and Reduction",
        subtitle: "Reading electron flow from changes in oxidation numbers",
        body: "Once every atom has been assigned an oxidation state, spotting a redox reaction is straightforward: any atom whose oxidation state increases between reactants and products has lost electrons and been oxidized (OIL — Oxidation Is Loss); any atom whose oxidation state decreases has gained electrons and been reduced (RIG — Reduction Is Gain). Oxidation and reduction are always coupled — the electrons released by the oxidized atom must be accepted by the reduced atom. Every redox reaction can therefore be split into two half-reactions: one showing only the electrons lost (oxidation half-reaction) and one showing only the electrons gained (reduction half-reaction).",
        keyIdea: "OIL RIG: oxidation state goes up → oxidized (lost e⁻); goes down → reduced (gained e⁻). They always happen simultaneously.",
        terms: [
          {
            term: "Oxidation",
            def: "The loss of electrons by an atom, resulting in an increase in its oxidation state.",
          },
          {
            term: "Reduction",
            def: "The gain of electrons by an atom, resulting in a decrease in its oxidation state.",
          },
          {
            term: "Half-reaction",
            def: "A balanced equation showing only the oxidation or only the reduction part of a full redox reaction, including the electrons transferred.",
          },
        ],
        traps: [
          "Confusing 'oxidation number increases' with 'the atom gained something' — an increase means electrons were lost, which is oxidation. The number goes up because it now has fewer electrons to share.",
        ],
      },
      {
        title: "Oxidizing Agent and Reducing Agent — The Role Reversal",
        subtitle: "The agent that causes oxidation is itself reduced, and vice versa",
        body: "The naming convention trips up many students: the oxidizing agent is the substance that causes another atom to be oxidized, but to do so it accepts electrons from that atom — so the oxidizing agent itself undergoes reduction. Symmetrically, the reducing agent causes another atom to be reduced by donating its own electrons — so the reducing agent itself undergoes oxidation. On exams you must answer two separate questions: (a) which substance is the oxidizing agent, and (b) what change does the oxidizing agent itself undergo (answer: it is reduced). Calling the substance that is oxidized the 'oxidizing agent' is a common and costly error.",
        keyIdea: "Oxidizing agent → causes oxidation in others, is itself reduced. Reducing agent → causes reduction in others, is itself oxidized.",
        terms: [
          {
            term: "Oxidizing agent",
            def: "The reactant that accepts electrons from another species, thereby causing that species to be oxidized. The oxidizing agent is itself reduced in the process.",
          },
          {
            term: "Reducing agent",
            def: "The reactant that donates electrons to another species, thereby causing that species to be reduced. The reducing agent is itself oxidized in the process.",
          },
        ],
        traps: [
          "Calling the substance that gets oxidized the 'oxidizing agent' — the oxidizing agent is the one that causes oxidation in the other substance while it is itself reduced.",
          "Missing the exceptions for oxidation states (peroxide O = −1, metal hydride H = −1) — applying only the default rules will lead to an incorrect identification of which atom changed.",
        ],
        example: "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s): Zn goes from 0 → +2 (oxidized, is the reducing agent); Cu²⁺ goes from +2 → 0 (reduced, is the oxidizing agent).",
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u6-l2",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 2,
    unitName: "Electrochemistry",
    title: "How Galvanic Cells Convert Chemistry to Electricity",
    subtitle: "Anode (oxidation) and cathode (reduction) separated in space, with the salt bridge maintaining charge neutrality",
    overview:
      "A galvanic cell (also called a voltaic cell) converts the energy of a spontaneous redox reaction into electrical energy by physically separating the two half-reactions into compartments called half-cells. In one half-cell, at the anode, oxidation releases electrons into an external wire; in the other half-cell, at the cathode, those electrons are consumed by reduction. The salt bridge is essential: without it, charge imbalance in each half-cell would stop the current almost immediately. In galvanic cells the anode carries the negative (−) sign and the cathode the positive (+) sign — this is the reverse of the convention for electrolytic cells, making sign confusion one of the most common exam errors.",
    objectives: [
      "Explain the roles of the anode and cathode in a galvanic cell and state what chemical process occurs at each",
      "Describe how the salt bridge maintains electrical neutrality in each half-cell and why it is indispensable",
      "Trace the direction of electron flow (in the wire) and ion flow (through the salt bridge)",
      "Write and interpret standard cell notation (line notation) for a galvanic cell",
    ],
    formulas: [
      "An Ox / Red Cat: Anode = Oxidation, Cathode = Reduction",
      "Galvanic cell: anode (−), cathode (+) — opposite of an electrolytic cell",
      "Cell notation: anode | anode solution ‖ cathode solution | cathode",
    ],
    sections: [
      {
        title: "The Two Electrodes — Anode and Cathode",
        subtitle: "Spatial separation of oxidation and reduction generates a current",
        body: "In a galvanic cell, the two half-reactions are carried out in separate compartments so that the electrons released during oxidation must travel through an external circuit — the wire — to reach the cathode where reduction occurs. The anode is the electrode at which oxidation takes place: metal atoms in the anode dissolve as cations into solution, releasing electrons. Those electrons flow through the external wire to the cathode, where aqueous cations in the cathode compartment gain electrons and are deposited as metal. The net result is that chemical potential energy is converted to electrical energy that can do work in the circuit. The mnemonic 'An Ox / Red Cat' (Anode = Oxidation, Cathode = Reduction) applies in both galvanic and electrolytic cells — it is the electrode signs (+/−) that differ between the two.",
        keyIdea: "Electrons always flow from anode to cathode through the external wire — anode is where oxidation (electron release) occurs.",
        terms: [
          {
            term: "Galvanic cell (voltaic cell)",
            def: "An electrochemical cell that converts the free energy of a spontaneous redox reaction into electrical work. Also called a voltaic cell.",
          },
          {
            term: "Anode",
            def: "The electrode at which oxidation occurs. In a galvanic cell the anode is the negative (−) electrode; it loses mass as metal dissolves.",
          },
          {
            term: "Cathode",
            def: "The electrode at which reduction occurs. In a galvanic cell the cathode is the positive (+) electrode; it gains mass as metal deposits.",
          },
          {
            term: "Half-cell",
            def: "One compartment of an electrochemical cell containing an electrode and the solution in which either oxidation or reduction takes place.",
          },
        ],
        traps: [
          "Reversing the sign of the anode in a galvanic cell — the anode is (−) in a galvanic cell (the source of electrons) but (+) in an electrolytic cell. The An Ox / Red Cat rule stays the same; only the signs flip between cell types.",
        ],
      },
      {
        title: "The Salt Bridge — Maintaining Charge Neutrality",
        subtitle: "Without ion migration, current stops; the salt bridge is the cell's circuit-completer",
        body: "As oxidation proceeds at the anode, metal cations accumulate in the anode compartment and the solution becomes positively charged. Simultaneously, at the cathode, cations are removed from solution as they are reduced to metal, and the solution becomes negatively charged. This charge imbalance quickly builds up a back-voltage that opposes further electron flow, shutting down the cell. The salt bridge — typically a tube filled with a concentrated inert electrolyte such as KNO₃ in agar gel — allows ions to migrate between compartments to neutralize these charges: anions migrate toward the anode compartment, and cations migrate toward the cathode compartment. Ion flow through the salt bridge completes the internal circuit while keeping the two solutions physically separated.",
        terms: [
          {
            term: "Salt bridge",
            def: "A pathway (usually a tube filled with an inert electrolyte gel) that allows ion migration between the two half-cells to maintain electrical neutrality in each compartment.",
          },
          {
            term: "Charge neutrality",
            def: "The condition in which each half-cell solution has no net excess of positive or negative charge. Maintained by ion migration through the salt bridge.",
          },
          {
            term: "Inert electrolyte",
            def: "An ionic compound (e.g., KNO₃, KCl) used in a salt bridge because its ions do not participate in the electrode reactions.",
          },
        ],
        traps: [
          "Thinking electrons flow through the salt bridge — only ions migrate through the salt bridge. Electrons flow through the external wire between the electrodes.",
        ],
      },
      {
        title: "Electrode Signs and Cell Notation",
        subtitle: "Galvanic versus electrolytic signs, and how to read line notation",
        body: "In a galvanic cell the anode is labeled (−) because it is the source of electrons (like the negative terminal of a battery), and the cathode is (+) because electrons flow into it. In an electrolytic cell the labels are reversed — the external power source forces oxidation at the electrode it connects to the positive terminal (which becomes the anode, +) and reduction at the electrode connected to the negative terminal (cathode, −). Cell notation (line notation) is a compact shorthand: the anode and its solution are written on the left, the cathode and its solution on the right. A single vertical line (|) represents a phase boundary (electrode–solution or two immiscible solutions), and a double vertical line (‖) represents the salt bridge.",
        keyIdea: "Galvanic: anode (−), cathode (+). Electrolytic: anode (+), cathode (−). The An Ox / Red Cat definition never changes.",
        terms: [
          {
            term: "Cell notation (line notation)",
            def: "A shorthand representation of an electrochemical cell written as: anode | anode solution ‖ cathode solution | cathode. Left side = oxidation; right side = reduction.",
          },
          {
            term: "Phase boundary (|)",
            def: "A single vertical line in cell notation indicating an interface between two different phases, such as a solid electrode and an aqueous solution.",
          },
        ],
        traps: [
          "Writing the cathode on the left in cell notation — by convention, the anode (oxidation) is always on the left and the cathode (reduction) on the right.",
          "Reversing electron flow direction — electrons leave the anode (where they are produced by oxidation) and travel through the external wire to the cathode (where they are consumed by reduction).",
        ],
        example: "Zn(s) | Zn²⁺(aq) ‖ Cu²⁺(aq) | Cu(s): Zn on the left is the anode (Zn → Zn²⁺ + 2e⁻); Cu on the right is the cathode (Cu²⁺ + 2e⁻ → Cu).",
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u6-l3",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 3,
    unitName: "Electrochemistry",
    title: "How to Calculate Cell Voltage and Spontaneity",
    subtitle: "E°cell = E°cathode − E°anode — cell potential is an intensive property and must never be multiplied by a stoichiometric coefficient",
    overview:
      "The voltage produced by a galvanic cell under standard conditions is calculated from the standard reduction potentials (E°red) of the two half-reactions: E°cell = E°cathode − E°anode, where both values are taken directly from a table of standard reduction potentials (both written in the reduction direction). A positive E°cell indicates a spontaneous reaction and is connected to a negative standard Gibbs free energy change (ΔG° = −nFE°cell) and an equilibrium constant greater than one (K > 1). The single most important conceptual point is that standard reduction potential is an intensive property — it does not depend on the amount of substance and must not be multiplied by stoichiometric coefficients when half-reactions are scaled to balance electrons.",
    objectives: [
      "Use standard reduction potential values to calculate E°cell = E°cathode − E°anode",
      "Use the sign of E°cell to determine whether a redox reaction is spontaneous under standard conditions",
      "State and apply the relationships E°cell > 0 ↔ ΔG° < 0 ↔ K > 1",
      "Explain why standard reduction potential is an intensive property and why it does not change when a half-reaction is multiplied by a coefficient",
    ],
    formulas: [
      "E°cell = E°cathode − E°anode (both values taken as reduction potentials from the table)",
      "Spontaneity: E°cell > 0 → spontaneous (ΔG° < 0); E°cell < 0 → non-spontaneous",
      "ΔG° = −nFE°cell, where n = moles of electrons transferred, F = 96,485 C mol⁻¹",
    ],
    sections: [
      {
        title: "Standard Reduction Potential and E°cell",
        subtitle: "The more positive E°red, the stronger the driving force for reduction",
        body: "Every half-reaction has a standard reduction potential (E°red) measured under standard conditions (1 M concentration, 1 atm pressure, 25 °C) relative to the standard hydrogen electrode (SHE), which is assigned E° = 0 V by definition. A large positive E°red means the species strongly tends to be reduced (gain electrons); a large negative E°red means it strongly resists reduction and will preferentially be oxidized. In a galvanic cell, the half-reaction with the higher E°red is spontaneously favored as the cathode (reduction), and the half-reaction with the lower E°red becomes the anode (oxidation). The overall cell potential is simply E°cell = E°cathode(reduction) − E°anode(reduction). No sign reversal of the anode value is needed before this subtraction — the formula already accounts for the direction change.",
        keyIdea: "Higher E°red → becomes cathode (favors reduction); lower E°red → becomes anode (favors oxidation). E°cell = E°cathode − E°anode.",
        terms: [
          {
            term: "Standard reduction potential (E°red)",
            def: "The voltage of a half-reaction measured under standard conditions (1 M, 1 atm, 25 °C) when written in the reduction direction. Larger values indicate a stronger tendency to be reduced.",
          },
          {
            term: "Standard cell potential (E°cell)",
            def: "The voltage produced by a galvanic cell under standard conditions. Calculated as E°cathode − E°anode using tabulated reduction potentials.",
          },
          {
            term: "Standard hydrogen electrode (SHE)",
            def: "The reference half-cell for standard reduction potentials, defined as E° = 0 V. It consists of H⁺(aq, 1 M) in contact with H₂(g, 1 atm) at a platinum electrode.",
          },
        ],
        traps: [
          "Reversing (negating) the anode's E° value before applying the formula — the formula E°cell = E°cathode − E°anode already incorporates the sign change. Using both the formula and a manual sign flip double-counts the correction.",
        ],
        example: "Cu²⁺/Cu: E°red = +0.34 V (cathode); Zn²⁺/Zn: E°red = −0.76 V (anode). E°cell = 0.34 − (−0.76) = +1.10 V. Positive → spontaneous.",
      },
      {
        title: "E°cell, ΔG°, and Keq — Three Faces of Spontaneity",
        subtitle: "A positive cell voltage, a negative free energy, and K > 1 all say the same thing",
        body: "The standard cell potential is directly linked to two other measures of spontaneity. Quantitatively, ΔG° = −nFE°cell, where n is the number of moles of electrons transferred per mole of reaction and F is the Faraday constant (96,485 C mol⁻¹). A positive E°cell gives a negative ΔG°, confirming spontaneity. The Gibbs free energy is also related to the equilibrium constant by ΔG° = −RT ln K, so a spontaneous cell (positive E°cell, negative ΔG°) corresponds to K > 1, meaning products are favored at equilibrium. Conversely, a non-spontaneous cell (negative E°cell) has ΔG° > 0 and K < 1. These three statements are always consistent and interconvertible.",
        keyIdea: "E°cell > 0 ↔ ΔG° < 0 ↔ K > 1 — spontaneous in the forward direction.",
        terms: [
          {
            term: "Faraday constant (F)",
            def: "The electric charge carried by one mole of electrons: 96,485 C mol⁻¹. Used in ΔG° = −nFE°cell to convert voltage to energy.",
          },
          {
            term: "Standard Gibbs free energy change (ΔG°)",
            def: "The maximum non-expansion work available from a reaction at standard conditions. Negative for spontaneous reactions; related to E°cell by ΔG° = −nFE°cell.",
          },
        ],
        traps: [
          "Thinking a large positive E°cell guarantees a fast reaction — cell potential is a thermodynamic quantity related to spontaneity and equilibrium, not to reaction rate (kinetics).",
        ],
      },
      {
        title: "Cell Potential Is an Intensive Property",
        subtitle: "Multiplying a half-reaction by a coefficient does not change its E° value",
        body: "The most important conceptual trap in electrochemistry calculations is treating E° as if it were an extensive property (like enthalpy or entropy). Standard reduction potential is intensive — it is a property of the substance regardless of how much of it you have, just as density or temperature do not change with sample size. If you need to multiply a half-reaction by 2 or 3 to balance the number of electrons transferred, the E° value of that half-reaction does not change. You do not multiply E° by the coefficient. By contrast, ΔG° = −nFE°cell is extensive: scaling the half-reaction changes n, so ΔG° scales proportionally. Similarly, Keq changes when n changes (through ΔG° = −RT ln K). The practical rule: when combining half-reactions, adjust n to balance electrons, calculate E°cell using the unmodified E° values, and then compute ΔG° using the new n.",
        keyIdea: "E° is intensive — never multiply it by a stoichiometric coefficient. Only n (and therefore ΔG°) changes when reactions are scaled.",
        terms: [
          {
            term: "Intensive property",
            def: "A physical property that does not depend on the amount of substance present, such as temperature, density, and standard reduction potential.",
          },
          {
            term: "Extensive property",
            def: "A physical property that scales with the amount of substance present, such as mass, volume, enthalpy, and Gibbs free energy.",
          },
        ],
        traps: [
          "Multiplying E°red by the stoichiometric coefficient when balancing the half-reactions — E° is intensive and must not be scaled. Only n in ΔG° = −nFE°cell reflects the coefficient change.",
          "Assuming ΔG° does not change when n changes — ΔG° = −nFE°cell is extensive; doubling n doubles the magnitude of ΔG°.",
        ],
        example: "If the Cu²⁺/Cu half-reaction is multiplied by ×2 to balance electrons, E°red stays at +0.34 V — only n doubles from 2 to 4, so ΔG° doubles while E°cell is unchanged.",
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u6-l4",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 4,
    unitName: "Electrochemistry",
    title: "How Electrolytic Cells Force Non-Spontaneous Reactions",
    subtitle: "External electrical energy drives non-spontaneous redox; Faraday's law connects charge passed to moles of product",
    overview:
      "An electrolytic cell is the electrochemical reverse of a galvanic cell: instead of producing electricity from a spontaneous reaction, it consumes electricity from an external power source to force a non-spontaneous reaction (one with E°cell < 0 and ΔG° > 0). The definitions of anode and cathode — oxidation at the anode, reduction at the cathode — remain the same, but the electrode signs are reversed (anode = +, cathode = −) because the power source, not the chemistry, determines polarity. The amount of substance produced at an electrode is governed by Faraday's law: the moles of product are proportional to the total charge passed. The calculation sequence is always Q = It → moles of electrons = Q ÷ 96,485 → moles of product via stoichiometry.",
    objectives: [
      "Compare electrolytic and galvanic cells in terms of energy input/output, spontaneity, and electrode signs",
      "Apply Faraday's law to calculate the mass of product formed at an electrode from current and time data",
      "Convert between charge in coulombs, moles of electrons, and moles of product using the correct stoichiometry of the reduction half-reaction",
      "Describe the principles of electroplating and the electrolysis of water as applications of electrolytic cells",
    ],
    formulas: [
      "Charge Q (coulombs, C) = current I (amperes, A) × time t (seconds, s): Q = I × t",
      "Moles of electrons = Q ÷ 96,485 (C mol⁻¹)",
      "Moles of product = moles of electrons × (stoichiometric ratio from the half-reaction)",
    ],
    sections: [
      {
        title: "Electrolytic Cell vs Galvanic Cell",
        subtitle: "Reversing spontaneity: from electricity producer to electricity consumer",
        body: "A galvanic cell is driven by a spontaneous redox reaction and produces electrical energy; an electrolytic cell is driven by an applied external voltage and forces a non-spontaneous redox reaction to occur. In both types of cell, oxidation occurs at the anode and reduction at the cathode — the fundamental definitions do not change. However, the polarity of the electrodes is reversed. In a galvanic cell the anode is (−) because oxidation spontaneously releases electrons. In an electrolytic cell the external power source pushes current in the opposite direction: it removes electrons from the electrode connected to its positive terminal, forcing oxidation there; that electrode is labeled (+) and is the anode. The electrode connected to the negative terminal of the power source receives electrons and forces reduction; it is labeled (−) and is the cathode. The applied voltage must exceed |E°cell| of the non-spontaneous reaction to overcome the thermodynamic barrier.",
        keyIdea: "Electrolytic cell: anode (+), cathode (−) — opposite sign to a galvanic cell, but oxidation at anode / reduction at cathode is always true.",
        terms: [
          {
            term: "Electrolysis",
            def: "The process of using electrical energy from an external source to drive a non-spontaneous redox reaction in an electrolytic cell.",
          },
          {
            term: "Electrolytic cell",
            def: "An electrochemical cell in which an external power source supplies electrical energy to force a non-spontaneous reaction. Anode = (+), cathode = (−).",
          },
          {
            term: "External power source",
            def: "A battery or DC power supply that provides the electrical energy needed to drive electrolysis. Its positive terminal connects to the anode and its negative terminal to the cathode.",
          },
        ],
        traps: [
          "Confusing the electrode signs of electrolytic and galvanic cells — in a galvanic cell, anode (−) and cathode (+); in an electrolytic cell, anode (+) and cathode (−). The definitions (oxidation at anode, reduction at cathode) are unchanged.",
        ],
      },
      {
        title: "Faraday's Law — Charge, Electrons, and Product",
        subtitle: "Three-step conversion: coulombs → moles of electrons → moles of product",
        body: "Faraday's law states that the amount of substance deposited or dissolved at an electrode is directly proportional to the total electric charge passed through the cell. The calculation is always carried out in three sequential steps. Step 1: calculate the total charge in coulombs from the current and time, Q = I × t (in amperes and seconds). Step 2: convert coulombs to moles of electrons by dividing by Faraday's constant, 96,485 C mol⁻¹. Step 3: use the stoichiometric ratio of the reduction (or oxidation) half-reaction to convert moles of electrons to moles of product. For example, if the half-reaction for copper deposition is Cu²⁺ + 2e⁻ → Cu, then 2 moles of electrons produce 1 mole of Cu. The most common error is skipping Step 2 and applying the coulombs directly in Step 3 — coulombs are not moles of electrons.",
        keyIdea: "Q = I × t → ÷96,485 → moles of e⁻ → × stoichiometric ratio → moles of product. Never skip the coulombs-to-moles conversion.",
        terms: [
          {
            term: "Faraday's law of electrolysis",
            def: "The law stating that the mass of substance produced at an electrode is proportional to the total charge passed. Quantitatively: moles of electrons = Q ÷ F.",
          },
          {
            term: "Coulomb (C)",
            def: "The SI unit of electric charge. One coulomb is the charge transferred by a current of one ampere flowing for one second (Q = I × t).",
          },
          {
            term: "Current (I)",
            def: "The rate of charge flow in a circuit, measured in amperes (A). One ampere equals one coulomb per second.",
          },
        ],
        traps: [
          "Applying coulombs directly as moles of electrons in stoichiometry — coulombs must first be divided by 96,485 C mol⁻¹ to obtain moles of electrons before any stoichiometric calculation.",
          "Forgetting the stoichiometric ratio from the half-reaction — the number of electrons in the half-reaction (e.g., 2 for Cu²⁺/Cu) must be used to convert moles of electrons to moles of product.",
        ],
        example: "A current of 2.00 A is passed for 9,650 s. Q = 2.00 × 9,650 = 19,300 C. Moles of e⁻ = 19,300 ÷ 96,485 = 0.200 mol. Half-reaction: Cu²⁺ + 2e⁻ → Cu. Moles of Cu = 0.200 ÷ 2 = 0.100 mol. Mass of Cu = 0.100 × 63.55 = 6.36 g.",
      },
      {
        title: "Applications — Electroplating and Water Electrolysis",
        subtitle: "Faraday's law governs the thickness of a plating and the volume of gas produced",
        body: "Electroplating uses electrolysis to deposit a thin, uniform layer of one metal onto the surface of another. The object to be plated is made the cathode; the plating metal (e.g., silver, gold, copper) dissolves from an anode made of that same metal or from a solution of its ions. Precise control of current and time, via Faraday's law, controls the thickness and mass of the deposited layer. The electrolysis of water is a classic demonstration of a non-spontaneous reaction forced by electricity: at the cathode, H⁺ ions (or water molecules) are reduced to H₂ gas (4H⁺ + 4e⁻ → 2H₂); at the anode, water is oxidized to O₂ gas (2H₂O → O₂ + 4H⁺ + 4e⁻). The volume ratio of H₂ to O₂ produced is 2:1, consistent with the stoichiometry of water. Both processes require a minimum applied voltage to overcome their non-spontaneous ΔG°.",
        terms: [
          {
            term: "Electroplating",
            def: "An electrolytic process in which metal ions from a solution are reduced and deposited as a thin metal film on an object serving as the cathode.",
          },
          {
            term: "Electrolysis of water",
            def: "A non-spontaneous electrolytic reaction that decomposes water into hydrogen gas (at the cathode) and oxygen gas (at the anode) using an applied voltage.",
          },
        ],
        traps: [
          "Assuming that in water electrolysis the volume ratio of H₂:O₂ is 1:1 — the half-reaction stoichiometry gives a 2:1 ratio (twice as many moles of H₂ as O₂ per mole of water decomposed).",
        ],
      },
    ],
  },
];
