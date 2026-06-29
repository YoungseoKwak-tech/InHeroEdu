/**
 * Core Notes English version — IB Chemistry Unit 5 (Energetics / Thermochemistry).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u5-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 1,
    unitName: "Energetics",
    title: "Exothermic and Endothermic Reactions and Enthalpy — Energy Profile Diagrams and ΔH",
    subtitle: "If a reaction releases heat it is exothermic, if it absorbs heat it is endothermic — a single sign on ΔH tells the whole story",
    overview:
      "When a chemical reaction occurs, energy changes. Heat is released in a combustion reaction, and light energy is stored in glucose during photosynthesis. The core of IB thermochemistry is measuring and expressing this energy change quantitatively. The enthalpy change (ΔH) represents the heat energy exchanged between the system and the surroundings at constant pressure, with units of kJ mol⁻¹. In an exothermic reaction the total enthalpy of the products is lower than that of the reactants, so ΔH < 0 (negative) and the reaction releases heat to the surroundings. In an endothermic reaction the total enthalpy of the products is higher, so ΔH > 0 (positive) and the reaction absorbs heat from the surroundings. An energy profile diagram visualises the enthalpy change along the reaction coordinate and shows the activation energy (Eₐ) and ΔH at a glance. Questions that ask you to draw and label this diagram directly are a staple of IB Paper 2. In this lesson you will fully master the concept of ΔH, the sign convention, and the components of an energy profile diagram.",
    objectives: [
      "Define and distinguish exothermic and endothermic reactions in terms of the sign of ΔH (negative/positive) and the direction of energy flow (system→surroundings, surroundings→system)",
      "Correctly label reactant enthalpy, product enthalpy, activation energy (Eₐ), and ΔH on an energy profile diagram and draw both exothermic and endothermic reactions",
      "Use the fact that bond breaking is endothermic and bond forming is exothermic to qualitatively predict the sign of ΔH and the direction of a reaction",
      "Explain the definition of a standard enthalpy change (ΔH°) (referenced to 298 K, 100 kPa, standard states) and the main types of enthalpy change such as enthalpy of combustion (ΔH°comb), enthalpy of formation (ΔH°f), and enthalpy of neutralisation (ΔH°neut)",
      "Explain that for the reverse of a given reaction the magnitude of ΔH is identical and only the sign is reversed (a precursor to Hess's law) and apply this in calculations",
    ],
    formulas: [
      "ΔH = H(products) − H(reactants)",
      "Exothermic: ΔH < 0 (kJ mol⁻¹)",
      "Endothermic: ΔH > 0 (kJ mol⁻¹)",
      "Reverse reaction: ΔH(reverse) = −ΔH(forward)",
    ],
    sections: [
      {
        title: "Enthalpy Change and the ΔH Sign Convention",
        subtitle: "If the system releases heat ΔH < 0, if it absorbs heat ΔH > 0 — getting one sign wrong inverts every calculation",
        terms: [
          {
            term: "Enthalpy Change (ΔH)",
            def: "The heat energy exchanged between the system and the surroundings when a chemical reaction occurs at constant pressure. ΔH = H(products) − H(reactants). Exothermic: ΔH < 0 — the system releases energy to the surroundings, so the temperature of the surroundings rises. Endothermic: ΔH > 0 — the system absorbs energy from the surroundings, so the temperature of the surroundings falls. Units are kJ mol⁻¹ (per the molar quantities specified in the equation).",
          },
          {
            term: "Standard Enthalpy Change (ΔH°)",
            def: "An enthalpy change measured under standard conditions (298 K, 100 kPa, all substances in their standard states). The '°' symbol (plimsoll line) denotes the standard state. Main types: enthalpy of combustion (ΔH°comb): when 1 mol of a substance is completely combusted; enthalpy of formation (ΔH°f): formation of 1 mol of a compound from its elements in their standard states; enthalpy of neutralisation (ΔH°neut): formation of 1 mol of water from the aqueous reaction of a strong acid and a strong base ≈ −57 kJ mol⁻¹.",
          },
          {
            term: "Energy Profile Diagram",
            def: "A graph showing the enthalpy change (y-axis) along the reaction coordinate (x-axis). Components: ① reactant energy level, ② the peak of the transition state (the activated complex), ③ product energy level, ④ activation energy (Eₐ): the energy difference from the reactants to the transition state, ⑤ ΔH: the difference between the reactant and product energy levels. Exothermic reaction: product level < reactant level → the ΔH arrow points downward. Endothermic reaction: product level > reactant level → the ΔH arrow points upward.",
          },
          {
            term: "Bond Breaking and Forming and Energy",
            def: "Bond breaking always absorbs energy and is an endothermic process. Bond forming always releases energy and is an exothermic process. The overall ΔH of a reaction is determined by the sum of the energies of the two processes: if the energy required to break bonds < the energy released in forming bonds → overall exothermic (ΔH < 0). The reverse gives endothermic (ΔH > 0).",
          },
        ],
        traps: [
          "Describing the ΔH sign convention from the perspective of the surroundings rather than the system is wrong. In the IB definition, ΔH is the enthalpy change of the system (the reaction mixture). In an exothermic reaction the surroundings warm up because the system has 'lost' energy, so relative to the system ΔH < 0. Writing 'the surroundings gain energy so ΔH > 0' is an immediate error.",
          "Confusing the activation energy (Eₐ) with ΔH on an energy profile diagram is a frequent mistake. Eₐ is the difference from the reactant energy level to the transition state (the top of the curve), whereas ΔH is the difference between the reactant and product energy levels. Even in an exothermic reaction Eₐ is always positive (an energy barrier), and a negative ΔH does not mean there is no Eₐ. When drawing the diagram, clearly distinguish the Eₐ arrow (from the reactant level up to the peak of the curve) from the ΔH arrow (from the reactant level to the product level).",
        ],
        example:
          "Let's draw and label the energy profile diagram for the combustion of methane (CH₄): CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH° = −890 kJ mol⁻¹. y-axis (enthalpy): the reactants (CH₄ + 2O₂) are shown at a higher energy level and the products (CO₂ + 2H₂O) at a lower level. The transition state, where the curve rises, sits at a position higher than the reactants. Eₐ arrow: from the reactant level → up to the peak of the transition state (positive). ΔH arrow: from the reactant level → down to the product level (downward, −890 kJ mol⁻¹). This diagram shows an exothermic reaction: after the reaction the system's energy is lower, and that energy has been released to the surroundings as heat.",
      },
      {
        title: "Examples of Exothermic and Endothermic Reactions and Everyday Connections",
        subtitle: "Hand warmers are exothermic, cold packs are endothermic — the energy direction of chemical reactions governs everyday life",
        terms: [
          {
            term: "Examples of Exothermic Reactions",
            def: "Combustion: hydrocarbon + O₂ → CO₂ + H₂O, ΔH < 0. Neutralisation: strong acid + strong base → H₂O + salt, ΔH°neut ≈ −57 kJ mol⁻¹. Rust formation (oxidation of iron): 4Fe + 3O₂ → 2Fe₂O₃, ΔH < 0 (slow exothermic). Reaction of calcium oxide with water: CaO + H₂O → Ca(OH)₂, strongly exothermic. In these reactions the temperature of the surroundings (the solution or the air) rises, and measured with a calorimeter this appears as a temperature increase (ΔT > 0).",
          },
          {
            term: "Examples of Endothermic Reactions",
            def: "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, ΔH > 0 (absorbs solar energy). Dissolving ammonium nitrate: NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq), ΔH > 0 — the principle behind a cold pack. Thermal decomposition of calcium carbonate: CaCO₃(s) → CaO(s) + CO₂(g), ΔH > 0 (requires high temperature). Breaking of hydration. In these reactions the temperature of the surroundings falls (ΔT < 0) and appears as a temperature decrease in calorimetric measurement.",
          },
        ],
        traps: [
          "The enthalpy of neutralisation (ΔH°neut ≈ −57 kJ mol⁻¹) is referenced to the formation of 1 mol of water in a strong acid–strong base reaction. If a weak acid or weak base is involved, additional energy is needed for ionisation, so the absolute value of ΔH°neut is smaller than 57. On IB Paper 2, if asked 'why is the ΔH°neut of a weak acid reacting with a strong base less negative than −57 kJ mol⁻¹,' you must answer that energy is consumed in the partial ionisation of the weak acid.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u5-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 2,
    unitName: "Energetics",
    title: "Calorimetry — Calculating ΔH with q = mcΔT",
    subtitle: "From the coffee-cup calorimeter to the bomb calorimeter — the standard procedure for calculating reaction enthalpy from a single temperature change",
    overview:
      "Having defined ΔH in theory, it is now time to learn how to measure ΔH experimentally. Calorimetry is an experimental technique that measures the heat released or absorbed by a reaction from the temperature change of a solution. The key equation is q = mcΔT: q is the heat energy (J), m is the mass of the solution (g), c is the specific heat capacity (J g⁻¹ K⁻¹), and ΔT is the temperature change (K or °C). In IB the target is usually an aqueous solution, so c = 4.18 J g⁻¹ K⁻¹ (the specific heat of water) is used. The q obtained here is the heat absorbed or released by the solution, not the enthalpy change ΔH of the reaction. To find ΔH (kJ mol⁻¹) you must divide q by the number of moles of the substance reacted and apply the sign convention (for an exothermic reaction the solution absorbs heat → q > 0, but the reaction's ΔH < 0). In this lesson you will master the full workflow of the q = mcΔT calculation step by step and also cover how to analyse error in an IB lab report.",
    objectives: [
      "Apply the basic calorimetry equation q = mcΔT to calculate the heat energy q released or absorbed in a reaction",
      "Apply the procedure of correctly handling the sign (q_reaction = −q_solution) and dividing by the number of moles when calculating the molar enthalpy change ΔH (kJ mol⁻¹) from q",
      "Explain the assumptions of a coffee-cup calorimetry experiment (heat loss neglected, specific heat of solution = specific heat of water) and the resulting systematic error",
      "Explain how to obtain a heat-loss-corrected ΔT by extrapolating a temperature–time graph",
    ],
    formulas: [
      "q = mcΔT",
      "c(water) = 4.18 J g⁻¹ K⁻¹",
      "ΔT = T_final − T_initial",
      "q_reaction = −q_solution",
      "ΔH = −q_solution / n  (kJ mol⁻¹, after converting q to kJ)",
    ],
    sections: [
      {
        title: "The q = mcΔT Calculation Procedure",
        subtitle: "Measure → calculate q → calculate moles → derive ΔH — follow the 4 steps in order and you will never get it wrong",
        terms: [
          {
            term: "Specific Heat Capacity (c)",
            def: "The heat energy required to raise 1 g of a substance by 1 K (or 1 °C). Units: J g⁻¹ K⁻¹. Water: c = 4.18 J g⁻¹ K⁻¹. In IB calorimetry experiments the specific heat of a dilute aqueous solution is assumed equal to that of water and c = 4.18 is used. Non-aqueous solvents such as ethanol have a different c (ethanol ≈ 2.44 J g⁻¹ K⁻¹) — if a c value is given in the question, use it.",
          },
          {
            term: "Relationship between q_reaction and q_solution (Heat of Reaction vs. Heat of Solution)",
            def: "In a calorimetry experiment, if the reaction is exothermic heat is transferred to the solution and the solution temperature rises (q_solution > 0); if endothermic heat is absorbed from the solution and the temperature falls (q_solution < 0). By the law of conservation of energy: q_reaction = −q_solution. Therefore ΔH (per mole) = −q_solution / n, where n = the number of moles of substance reacted. Watch the unit conversion: q is in J and ΔH is in kJ mol⁻¹, so you must divide by 1000.",
          },
          {
            term: "Coffee-Cup Calorimeter",
            def: "A simple device that uses an insulating polystyrene cup to measure the heat change of an aqueous-solution reaction. Assumptions: ① there is no heat loss to the surroundings, ② the specific heat of the solution = that of water (4.18 J g⁻¹ K⁻¹), ③ the solution density = 1.00 g cm⁻³. Because of these assumptions, a systematic error arises between the experimental and theoretical values. Improvement: extrapolate the corrected temperature–time graph to estimate the temperature just before mixing and correct ΔT.",
          },
          {
            term: "Steps for ΔH Calculation",
            def: "① Calculate the heat q (J) absorbed/released by the solution using q = mcΔT. ② Calculate the number of moles n of the substance reacted (n = m/M or n = cV). ③ Apply q_reaction = −q_solution. ④ Calculate ΔH = q_reaction / n = −q_solution / n in kJ mol⁻¹ (after converting q to kJ). ⑤ Check the sign: temperature rise (ΔT > 0) → q_solution > 0 → ΔH < 0 (exothermic). Temperature fall (ΔT < 0) → q_solution < 0 → ΔH > 0 (endothermic).",
          },
        ],
        traps: [
          "The most common mistake is omitting the sign of ΔH in the final step of the calculation. In an exothermic reaction, when the solution temperature rises (ΔT > 0), q_solution = mcΔT > 0. But this means 'the solution absorbed heat,' not 'the reaction is endothermic.' Since the heat of the reaction q_reaction = −q_solution, ΔH = −q_solution/n < 0. On IB Paper 2 calculation questions, omitting this sign reversal loses marks on the final answer.",
          "Students often confuse what to use for the mass m. m is not the mass of the reactants but the total mass of the solution that absorbed the heat. In an acid–base neutralisation experiment, if 50 cm³ HCl + 50 cm³ NaOH are mixed, then m = 100 g (assuming density 1.00 g cm⁻³), not 50 g. Also, when finding ΔH, the n you divide by is calculated based on which reagent is the limiting reagent, or matched to the basis (per 1 mol of a particular substance) if the question specifies it.",
        ],
        example:
          "Experiment: 50.0 cm³ of 1.00 mol dm⁻³ HCl(aq) was mixed with 50.0 cm³ of 1.00 mol dm⁻³ NaOH(aq), and the temperature rose from 21.5 °C to 28.3 °C. Calculate ΔH°neut (c = 4.18 J g⁻¹ K⁻¹, density = 1.00 g cm⁻³). Solution: ① m = (50.0 + 50.0) g = 100.0 g. ΔT = 28.3 − 21.5 = 6.8 °C = 6.8 K. q_solution = 100.0 × 4.18 × 6.8 = 2842 J = 2.842 kJ. ② n(H₂O) = 0.0500 L × 1.00 mol dm⁻³ = 0.0500 mol (HCl and NaOH in equal amounts). ③ q_reaction = −q_solution = −2.842 kJ. ④ ΔH = −2.842 / 0.0500 = −56.8 kJ mol⁻¹. Conclusion: ΔH°neut ≈ −56.8 kJ mol⁻¹ (close to the theoretical value of −57.1 kJ mol⁻¹, the difference being due to heat loss).",
      },
      {
        title: "Calorimetry Errors and Temperature–Time Graph Extrapolation",
        subtitle: "If heat loss is not corrected, the absolute value of ΔH is always underestimated",
        terms: [
          {
            term: "Systematic Error and Heat Loss",
            def: "A coffee-cup calorimeter cannot be perfectly insulated, so part of the heat produced in the reaction is lost to the surroundings. Because of this the measured ΔT is smaller than the true value and the calculated |ΔH| comes out smaller than the theoretical value — a systematic underestimation. A bomb calorimeter combusts the sample with high-pressure oxygen in an insulated vessel to minimise heat loss, making it more accurate for measuring enthalpies of combustion.",
          },
          {
            term: "Extrapolation of Temperature–Time Graph",
            def: "In a calorimetry experiment, after the reaction the temperature continues to fall slowly as heat keeps escaping to the surroundings. By extrapolating the cooling straight-line portion back to the reaction start time (t = 0), you can estimate the maximum temperature that would have been reached had there been no heat loss. Using the difference between this corrected maximum temperature and the initial temperature as ΔT reduces the systematic error.",
          },
        ],
        traps: [
          "A bomb calorimeter measures the heat of a combustion reaction under constant-volume conditions, so strictly it measures the internal energy change (ΔU). At IB SL level ΔU ≈ ΔH is approximated, but in HL extension a correction ΔH = ΔU + ΔnRT may be required. Do not automatically write ΔH = ΔU just because a bomb calorimeter is mentioned in a question — check the SL/HL distinction.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u5-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 3,
    unitName: "Energetics",
    title: "Hess's Law and Bond Enthalpies — Finding ΔH by Indirect Calculation",
    subtitle: "Even the ΔH of a reaction that cannot be measured directly can be calculated with Hess's law and a table of average bond enthalpies",
    overview:
      "How do you find the enthalpy change of a reaction that is difficult or impossible to measure directly by calorimetry? There are two powerful tools. The first is Hess's law: the enthalpy change of a reaction is independent of the reaction pathway and depends only on the initial and final states. That is, you can add or subtract the ΔH values of several stepwise reactions to calculate the ΔH of the target reaction indirectly. This is commonly visualised as an 'enthalpy cycle' or a 'Hess's triangle.' The second is the bond enthalpy (bond dissociation enthalpy) method: subtracting the sum of the energies of the bonds formed (exothermic) from the sum of the energies of the bonds broken (endothermic) in the reaction estimates ΔH. However, the values in a bond enthalpy data table are average values measured for molecules in the gaseous state, so the ΔH obtained this way can differ slightly from the experimental value. In this lesson you will fully master both the Hess's law enthalpy cycle and the bond enthalpy calculation.",
    objectives: [
      "Construct an enthalpy cycle using Hess's law and calculate the ΔH of a given reaction indirectly from the ΔH values of two or more other reactions",
      "Apply the formula ΔH°reaction = Σ ΔH°f(products) − Σ ΔH°f(reactants) using enthalpy of formation (ΔH°f) data",
      "Estimate the ΔH of a gaseous reaction using average bond enthalpy data with the formula ΔH ≈ Σ(bond breaking energy) − Σ(bond forming energy), and explain why this value can differ from the experimental value",
      "Correctly apply the manipulation rules in Hess's law calculations: reversing the sign of ΔH when an equation is reversed, and applying the same multiplier to ΔH when multiplying coefficients",
    ],
    formulas: [
      "Hess's law: ΔH°reaction = Σ ΔH°f(products) − Σ ΔH°f(reactants)",
      "Bond enthalpy: ΔH ≈ Σ E(bonds broken) − Σ E(bonds formed)",
      "Reverse reaction: ΔH(reverse) = −ΔH(forward)",
      "Equation × n: ΔH also × n",
    ],
    sections: [
      {
        title: "Hess's Law and the Enthalpy Cycle",
        subtitle: "Path A + Path B = the direct path — draw the triangle and the unknown ΔH appears",
        terms: [
          {
            term: "Hess's Law",
            def: "Because enthalpy is a state function, the ΔH of a reaction is independent of the reaction pathway and depends only on the initial and final states. In equation form: the ΔH of path 1 = the sum of the ΔH of paths 2a + 2b. Using this you can calculate the ΔH of a reaction that is hard to measure directly from the ΔH of other reactions. Example: calculate the ΔH of C(s) + ½O₂(g) → CO(g) from the ΔH values of C(s)→CO₂(g) and CO(g)→CO₂(g).",
          },
          {
            term: "Enthalpy Cycle",
            def: "An energy pathway diagram that depicts Hess's law. It is usually drawn as a triangle (Hess's triangle): the top path (direct route) carries the unknown ΔH_x, and the two lower paths (indirect route) carry the known ΔH₁ and ΔH₂. Hess's law: ΔH_x = ΔH₁ + ΔH₂ (watch the arrow directions). If an arrow must go opposite to the path direction, the sign of ΔH must be reversed.",
          },
          {
            term: "Calculating ΔH° from Standard Enthalpies of Formation",
            def: "ΔH°reaction = Σ ΔH°f(products) − Σ ΔH°f(reactants). The ΔH°f of an element in its standard state = 0 (e.g., O₂(g), C(graphite), H₂(g)). As a special application of Hess's law, given a table of enthalpy of formation data this formula lets you directly calculate the ΔH° of any reaction. Do not forget to multiply by the coefficients.",
          },
        ],
        traps: [
          "The most common mistake in Hess's law calculations is failing to reverse the sign of ΔH when an equation is reversed. For example, if C + O₂ → CO₂, ΔH₁ = −394 kJ mol⁻¹ is given and you need CO₂ → C + O₂, you must use ΔH = +394 kJ mol⁻¹. Also, if you scale an equation's coefficients by a factor of n, ΔH must also be scaled by n. Changing only the coefficients while leaving ΔH unchanged, or keeping the sign unchanged for a reversed reaction, are the most frequent calculation errors on IB Paper 2.",
          "In the formation formula ΔH°reaction = Σ ΔH°f(products) − Σ ΔH°f(reactants), omitting the coefficients is an error. Example: for the formation of 2H₂O(l) you must use ΔH°f(H₂O) × 2. Also, substances with a standard-state ΔH°f = 0 (O₂, N₂, C(graphite), H₂, Fe, etc.) have no effect if left out of the table, but if a different allotrope appears (O₃, diamond, etc.) its ΔH°f ≠ 0, so it must be included.",
        ],
        example:
          "Use Hess's law to calculate the ΔH of C(s) + ½O₂(g) → CO(g). Given data: (1) C(s) + O₂(g) → CO₂(g), ΔH₁ = −394 kJ mol⁻¹. (2) CO(g) + ½O₂(g) → CO₂(g), ΔH₂ = −283 kJ mol⁻¹. Solution: target reaction = reaction (1) − reaction (2). Reversing reaction (2): CO₂(g) → CO(g) + ½O₂(g), ΔH = +283 kJ mol⁻¹. Target reaction: C(s) + O₂(g) + CO₂(g) → CO₂(g) + CO(g) + ½O₂(g). Cancelling CO₂ and ½O₂ from both sides: C(s) + ½O₂(g) → CO(g). ΔH = −394 + (+283) = −111 kJ mol⁻¹. The enthalpy of formation of CO is ΔH°f(CO) = −111 kJ mol⁻¹.",
      },
      {
        title: "Bond Enthalpy and Average Bond Enthalpy",
        subtitle: "Look up bond energies in a table and calculate breaking − forming to get an estimate of ΔH — but only in the gaseous state",
        terms: [
          {
            term: "Bond Enthalpy / Bond Dissociation Enthalpy",
            def: "The energy required to homolytically cleave 1 mol of a specific bond (A:B → A· + B·) in molecules in the gaseous state (always positive, endothermic). Example: the H-H bond enthalpy = 436 kJ mol⁻¹, C-H = 413 kJ mol⁻¹ (average). The values in the IB data booklet are average bond enthalpies measured across a variety of molecules, so they can differ from the actual bond energy in a specific molecule.",
          },
          {
            term: "ΔH Estimation from Bond Enthalpies",
            def: "ΔH ≈ Σ E(bonds broken, reactants) − Σ E(bonds formed, products). Bond breaking: endothermic (+), bond forming: exothermic (−). Calculation procedure: ① list all the bonds in the reactants and add up each bond enthalpy (total endothermic energy). ② list all the bonds in the products and add up each bond enthalpy (total exothermic energy). ③ ΔH = (total endothermic) − (total exothermic). If ΔH < 0, the forming side dominates (exothermic reaction).",
          },
          {
            term: "Limitations of the Bond Enthalpy Method",
            def: "① Average bond enthalpies are mean values across several molecules, so they differ from the exact value in a specific molecule. ② Bond enthalpies are referenced to molecules in the gaseous state. If a reactant or product is a liquid or solid, the enthalpy of vaporisation (ΔH°vap) or enthalpy of sublimation (ΔH°sub) must be considered separately, so this method alone cannot give an exact value. For these two reasons, a ΔH calculated from bond enthalpies is less accurate than one calculated from Hess's law or enthalpies of formation.",
          },
        ],
        traps: [
          "The most common mistake in bond enthalpy calculations is applying the sign the wrong way around. The correct formula: ΔH = Σ(bonds broken energy) − Σ(bonds formed energy). If you remember the principle that 'breaking is endothermic (+) and forming is exothermic (−),' the structure of subtracting the forming sum from the breaking sum follows naturally. Reversing it flips every sign and makes an exothermic reaction calculate as endothermic.",
          "The bond enthalpy method applies directly only to reactants and products in the gaseous phase. For example, in the reaction H₂(g) + ½O₂(g) → H₂O(l) the product is liquid water, so from the bond enthalpy calculation for H₂O(g) you must separately subtract the enthalpy of vaporisation of water (ΔH°vap = +44 kJ mol⁻¹). On IB Paper 2, if asked why the bond enthalpy calculation for a reaction with a liquid product differs from the experimental ΔH, you must answer that 'bond enthalpies are referenced to the gaseous state and the product is a liquid, so the enthalpy of condensation was not taken into account.'",
        ],
        example:
          "Calculate the ΔH of the combustion of methane CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) using bond enthalpies. Data (kJ mol⁻¹): C-H = 413, O=O = 498, C=O = 805, O-H = 463. Solution: bonds broken (reactants): C-H × 4: 4 × 413 = 1652, O=O × 2: 2 × 498 = 996. Total endothermic = 1652 + 996 = 2648 kJ. Bonds formed (products): C=O × 2 (CO₂): 2 × 805 = 1610, O-H × 4 (2H₂O): 4 × 463 = 1852. Total exothermic = 1610 + 1852 = 3462 kJ. ΔH = 2648 − 3462 = −814 kJ mol⁻¹. Reasons it differs from the experimental value (−890 kJ mol⁻¹, based on liquid H₂O products): ① use of average bond enthalpies, ② this calculation is based on H₂O(g) and so does not include the energy of condensation to H₂O(l).",
      },
    ],
  },
];
