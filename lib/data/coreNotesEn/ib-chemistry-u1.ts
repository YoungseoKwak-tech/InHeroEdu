/**
 * Core Notes English version — IB Chemistry Unit 1 (Stoichiometric Relationships).
 * Based on IB DP Chemistry SL/HL curriculum, written in narrative exam-prep style.
 * Terms are given in English with precise IB exam-ready definitions.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u1-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 1,
    unitName: "Stoichiometric Relationships",
    title: "The Mole and Avogadro — How Chemists Count the World",
    subtitle: "Why chemists use moles instead of individual counts, and how Avogadro's number bridges the atomic world and the laboratory bench",
    overview:
      "The mass of a single atom is on the order of 10⁻²⁴ g. Counting atoms one by one on a balance would take longer than the age of the universe. That's why chemists invented a 'bundle unit' — the mole. The moment we agreed that 6.02 × 10²³ particles equals 1 mol, the atomic world became connected to the laboratory balance. Once you know the molar mass, you can freely convert between mass, moles, and number of particles. This conversion triangle is the computational foundation of all of IB Chemistry.",
    objectives: [
      "State the definition and units of Avogadro's number precisely",
      "Read molar mass from the periodic table and perform conversions between mass, moles, and number of particles",
      "Calculate the molar mass of elements and compounds from their chemical formulae",
      "Connect the mole concept to physical quantities of laboratory reagents and estimate realistic scales",
    ],
    formulas: [
      "n = m / M",
      "N = n × Nₐ",
      "Nₐ = 6.02 × 10²³ mol⁻¹",
    ],
    sections: [
      {
        title: "Avogadro's Number and the Definition of the Mole",
        subtitle: "The bridge connecting the atomic world to the laboratory balance",
        terms: [
          {
            term: "Mole",
            def: "The SI base unit of amount of substance, equal to exactly 6.022 × 10²³ chemical entities (atoms, molecules, ions, etc.). Symbol: mol. Originally defined as the number of atoms in exactly 12 g of carbon-12, but redefined in 2019 as a fixed numerical value.",
          },
          {
            term: "Avogadro's Number (Nₐ)",
            def: "The number of particles in one mole: 6.022 × 10²³ mol⁻¹. Named after Italian scientist Amedeo Avogadro. Applies equally to atoms, molecules, ions, or any other specified entity.",
          },
          {
            term: "Molar Mass (M)",
            def: "The mass of one mole of a substance. Units: g mol⁻¹. For elements, the numerical value equals the relative atomic mass (Ar) found on the periodic table. For example, the molar mass of oxygen (O) is 16.00 g mol⁻¹.",
          },
          {
            term: "Relative Atomic Mass (Ar)",
            def: "The ratio of the average mass of an atom of an element to 1/12 the mass of a carbon-12 atom. It is a dimensionless pure number and represents the weighted average over all naturally occurring isotopes.",
          },
        ],
        traps: [
          "Confusing molar mass (g mol⁻¹) with relative atomic mass (Ar, dimensionless) is a frequent mistake. The numerical values are identical, but Ar carries no units while molar mass requires 'g mol⁻¹'. Always write the unit on your IB answer sheet — omitting it risks losing the mark.",
          "Avogadro's number is not restricted to atoms. One mole of NaCl contains 6.02 × 10²³ Na⁺ ions and 6.02 × 10²³ Cl⁻ ions — that is, 6.02 × 10²³ ion pairs. Always check from context which particle '1 mol of a substance' refers to.",
        ],
        example:
          "Find the number of molecules in 18.02 g of water (H₂O). Molar mass: M = 2(1.008) + 16.00 = 18.02 g mol⁻¹. Moles: n = m / M = 18.02 g ÷ 18.02 g mol⁻¹ = 1.00 mol. Number of molecules: N = n × Nₐ = 1.00 × 6.02 × 10²³ = 6.02 × 10²³. A single cup of water (~18 g) contains 602 sextillion molecules.",
      },
      {
        title: "Converting Between Mass, Moles, and Number of Particles",
        subtitle: "Moving freely among the three vertices of the conversion triangle",
        terms: [
          {
            term: "Formula Mass (Mr)",
            def: "The sum of the Ar values of all atoms in a compound's chemical formula. It is dimensionless and numerically equal to the compound's molar mass in g mol⁻¹. Example: Mr of CO₂ = 12.01 + 2(16.00) = 44.01.",
          },
          {
            term: "Mole Calculation",
            def: "A calculation using n = m / M to convert mass (m, in g) to moles (n, in mol) or vice versa. This is a core calculation type tested on both IB Chemistry Paper 1 and Paper 2.",
          },
          {
            term: "Significant Figures",
            def: "The number of meaningful digits in a measured or calculated value. IB penalises answers that report more significant figures than the data warrant. Round results to match the datum with the fewest significant figures.",
          },
        ],
        traps: [
          "Students frequently invert the direction of the g → mol conversion. Remember: n = m / M. Dividing mass by molar mass gives moles; multiplying moles by molar mass gives mass. Practise applying the formula exactly as written on your formula sheet.",
        ],
        example:
          "Find the mass of 0.500 mol of iron (Fe). Ar of Fe = 55.85, so M = 55.85 g mol⁻¹. m = n × M = 0.500 mol × 55.85 g mol⁻¹ = 27.9 g (3 sig. figs.). Conversely, 167.6 g of Fe = 167.6 / 55.85 = 3.00 mol.",
      },
      {
        title: "Applying the Mole Concept in the Laboratory",
        subtitle: "Stoichiometric coefficients in balanced equations are directly mole ratios",
        terms: [
          {
            term: "Mole Ratio",
            def: "The stoichiometric ratio of moles between reactants and products in a balanced chemical equation. The coefficients in the equation directly represent mole ratios and are the key link in mass calculations.",
          },
          {
            term: "Balanced Equation",
            def: "A chemical equation in which the number of atoms of each element is equal on both sides, achieved by adjusting coefficients. Balancing the equation is always a prerequisite for any mole calculation in IB Chemistry.",
          },
          {
            term: "Standard Conditions (STP / SATP)",
            def: "Reference conditions used in IB for gas volume calculations. STP is defined as 0 °C and 100 kPa, giving an ideal gas molar volume of 22.7 L mol⁻¹. Do not confuse this with the older IUPAC standard of 22.4 L mol⁻¹ at 0 °C and 101.3 kPa.",
          },
        ],
        traps: [
          "IB uses a molar gas volume of 22.7 L mol⁻¹ at STP (100 kPa). Many textbooks and problem sets still use the older value of 22.4 L mol⁻¹ (0 °C, 101.3 kPa). In IB exams, 22.7 L mol⁻¹ is the required value. Always verify with the Data Booklet.",
        ],
        example:
          "In the combustion reaction 2 H₂ + O₂ → 2 H₂O, find the mass of H₂O produced when 4.00 g of H₂ burns completely. M(H₂) = 2.016 g mol⁻¹, so n(H₂) = 4.00 / 2.016 = 1.98 mol. From the equation, n(H₂O) = n(H₂) = 1.98 mol. M(H₂O) = 18.02 g mol⁻¹, so m(H₂O) = 1.98 × 18.02 = 35.7 g (3 s.f.).",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u1-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 2,
    unitName: "Stoichiometric Relationships",
    title: "Empirical Formula, Molecular Formula, and Limiting Reactants",
    subtitle: "Deriving formulae from composition data, and identifying which reagent runs out first",
    overview:
      "Numbers that come out of a chemical analysis experiment are mass percentages. 'This unknown compound contains 40% carbon, 6.7% hydrogen, and 53.3% oxygen' — converting that into a chemical formula is called deriving the empirical formula. One step further, knowing the molar mass lets you pin down the molecular formula. In real reactions, two reagents almost never run out simultaneously. One side hits zero first and brings the reaction to a halt — that is the limiting reactant. These two skills are at the heart of the extended calculation questions on IB Paper 2.",
    objectives: [
      "Carry out the step-by-step procedure for deriving the empirical formula from elemental analysis data (mass percentages or combustion analysis)",
      "Determine the molecular formula from the empirical formula and the molar mass",
      "Identify the limiting reactant and the excess reactant by comparing moles with stoichiometric coefficients",
      "Calculate the theoretical yield based on the limiting reactant and determine the percentage yield from an experimental yield",
      "Complete the flow from percentage composition to empirical formula to molecular formula",
    ],
    formulas: [
      "% yield = (actual yield / theoretical yield) × 100",
      "n = m / M",
    ],
    sections: [
      {
        title: "Deriving the Empirical Formula — A 4-Step Routine",
        subtitle: "From mass percentages to mole ratios, from mole ratios to the simplest whole-number ratio",
        terms: [
          {
            term: "Empirical Formula",
            def: "The simplest whole-number mole ratio of elements in a compound. Example: the empirical formula of glucose (C₆H₁₂O₆) is CH₂O. Derived directly from laboratory analysis data.",
          },
          {
            term: "Molecular Formula",
            def: "The actual number of atoms of each element in one molecule of a compound. It is a whole-number multiple of the empirical formula: molecular formula = empirical formula × n, where n = Mr(molecule) / Mr(empirical formula).",
          },
          {
            term: "Percentage Composition",
            def: "The percentage by mass that each element contributes to the total molar mass of a compound. Calculation: % element = (total atomic mass of element / Mr of compound) × 100.",
          },
          {
            term: "Combustion Analysis",
            def: "An analytical technique in which a hydrocarbon or organic compound is burned completely and the masses of the CO₂ and H₂O produced are measured to determine the C and H content. The oxygen content is found by subtracting C + H from the total mass.",
          },
        ],
        traps: [
          "After Step 3 of the empirical formula routine (dividing by the smallest mole value), you may get non-integer ratios such as 1.5, 1.33, or 1.25. A common error is to stop, confused that the result isn't a whole number. Instead, multiply all ratios by the appropriate integer to clear the fraction (e.g. multiply through by 2 for 1.5, by 3 for 1.33). The critical mistake is rounding 1.5 to 2 — solve it by multiplication, not rounding.",
          "The empirical formula can be identical to the molecular formula (e.g. H₂O, CO₂). Without knowing Mr you cannot confirm whether the empirical formula is also the molecular formula, so always use the provided Mr when a question asks for the molecular formula.",
        ],
        example:
          "Elemental analysis of an organic compound: C 40.0%, H 6.67%, O 53.3%. Mr = 180 g mol⁻¹.\n① Convert mass % to moles (per 100 g): C: 40.0 / 12.01 = 3.33 mol, H: 6.67 / 1.008 = 6.62 mol, O: 53.3 / 16.00 = 3.33 mol.\n② Divide by the smallest (3.33): C:H:O = 1:2:1.\n③ Empirical formula = CH₂O, Mr(empirical) = 30.0.\n④ n = 180 / 30.0 = 6 → Molecular formula = C₆H₁₂O₆ (glucose).",
      },
      {
        title: "Limiting Reactants and Theoretical Yield",
        subtitle: "You must identify which reagent runs out first before you can accurately predict the amount of product",
        terms: [
          {
            term: "Limiting Reactant",
            def: "The reactant that is completely consumed first and determines the maximum extent of the reaction. The theoretical yield of any product must be calculated from the moles of the limiting reactant.",
          },
          {
            term: "Excess Reactant",
            def: "The reactant that remains after the reaction is complete. Amount remaining = initial moles − moles consumed by the limiting reactant.",
          },
          {
            term: "Theoretical Yield",
            def: "The maximum amount of product obtainable, assuming the limiting reactant reacts completely. It is the calculated maximum and does not account for experimental losses or side reactions.",
          },
          {
            term: "Actual Yield",
            def: "The amount of product isolated and purified in a real experiment. Always less than or equal to the theoretical yield, due to mechanical losses, incomplete reaction, and side reactions.",
          },
        ],
        traps: [
          "The most common cause of misidentifying the limiting reactant is the false intuition that 'the reagent with the smaller mass is the limiting reactant.' The limiting reactant is determined by comparing moles relative to stoichiometric coefficients — not by mass. Always follow this sequence: convert to moles → divide by coefficient → the smallest value identifies the limiting reactant.",
          "In percentage yield calculations, make sure the units of the actual yield and theoretical yield match. A common trap is giving the theoretical yield in grams and the actual yield in moles. Convert both to grams or both to moles before dividing.",
        ],
        example:
          "For the reaction N₂ + 3 H₂ → 2 NH₃, find the theoretical yield of NH₃ when 28.0 g of N₂ and 8.00 g of H₂ are mixed.\nn(N₂) = 28.0 / 28.02 = 1.00 mol, n(H₂) = 8.00 / 2.016 = 3.97 mol.\nStoichiometry: 1 mol N₂ requires 3 mol H₂. For 1.00 mol N₂, 3.00 mol H₂ is needed. Available H₂ is 3.97 mol, so H₂ is in excess and N₂ is the limiting reactant.\nn(NH₃) = 2 × n(N₂) = 2.00 mol, m(NH₃) = 2.00 × 17.03 = 34.1 g.",
      },
      {
        title: "Percentage Yield and Factors Affecting Yield",
        subtitle: "Quantifying the gap between theory and experiment, and linking it to experimental design",
        terms: [
          {
            term: "Percentage Yield",
            def: "The actual yield expressed as a percentage of the theoretical yield. Formula: % yield = (actual yield / theoretical yield) × 100. Cannot exceed 100%; you should always be ready to explain why it falls short of 100%.",
          },
          {
            term: "Side Reaction",
            def: "A reaction that occurs simultaneously with the main reaction, diverting some of the reactant into unwanted products and thereby reducing the yield of the desired product.",
          },
          {
            term: "Irreversible / Reversible Reaction",
            def: "In an irreversible reaction, reactants are converted almost entirely to products. In a reversible reaction, reactants and products coexist at equilibrium. The theoretical yield of a reversible reaction is limited by the equilibrium constant (K).",
          },
        ],
        traps: [
          "Answering 'careless experiment' or similarly vague reasons for a low yield earns no marks in IB. You must give specific, chemically justified reasons such as: transfer losses, incomplete reaction, side reactions, or equilibrium limitation. Practise using precise chemical language in your explanations.",
        ],
        example:
          "In the ammonia synthesis above, if 28.9 g of NH₃ is actually obtained, calculate the % yield. Theoretical yield = 34.1 g (from the previous example). % yield = (28.9 / 34.1) × 100 = 84.7%. The remaining 15.3% was lost because some NH₃ decomposed via the reverse reaction or was lost during transfer.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u1-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 3,
    unitName: "Stoichiometric Relationships",
    title: "The Ideal Gas Law and Solution Concentration",
    subtitle: "PV = nRT unifies gas volume, temperature, pressure, and moles; molarity handles solution stoichiometry",
    overview:
      "Gases are awkward to work with by mass — their volume, temperature, and pressure are all intertwined. The ideal gas law PV = nRT ties these four variables into a single equation. Combined with a balanced equation, knowing only the volume of a gaseous reagent lets you calculate the amount of product directly. In aqueous reactions, concentration (c) is the key quantity. Molar concentration (molarity) and the calculations that go with acid-base titrations appear in both the IB Internal Assessment and Paper 2 — mastering them is non-negotiable.",
    objectives: [
      "Apply the ideal gas law PV = nRT, which unifies Boyle's Law, Charles's Law, and Gay-Lussac's Law",
      "Use the ideal gas law to calculate an unknown variable (volume, pressure, temperature, or moles) for a gas",
      "Interconvert concentration, volume, and moles of a solution using molarity (c = n / V)",
      "Calculate the unknown concentration of an acid or base from acid-base titration data",
    ],
    formulas: [
      "PV = nRT",
      "R = 8.314 J mol⁻¹ K⁻¹ (= 8.314 Pa m³ mol⁻¹ K⁻¹)",
      "c = n / V",
      "n = c × V",
    ],
    sections: [
      {
        title: "The Ideal Gas Law — PV = nRT",
        subtitle: "The moment Boyle's, Charles's, and Gay-Lussac's laws merge into one",
        terms: [
          {
            term: "Ideal Gas",
            def: "A theoretical gas in which molecules have no intermolecular attractions and occupy negligible volume. Real gases approach ideal behaviour at high temperature and low pressure.",
          },
          {
            term: "Ideal Gas Law",
            def: "PV = nRT, where P is pressure (Pa), V is volume (m³), n is amount of substance (mol), R is the gas constant (8.314 J mol⁻¹ K⁻¹), and T is absolute temperature (K). Given any three variables, the fourth can be calculated.",
          },
          {
            term: "Absolute Temperature (T)",
            def: "Temperature expressed on the Kelvin scale. T(K) = T(°C) + 273.15. Gas law calculations must use Kelvin — substituting Celsius directly produces completely wrong answers.",
          },
          {
            term: "Molar Volume",
            def: "The volume occupied by one mole of an ideal gas under specified conditions. At STP (0 °C, 100 kPa) the molar volume is 22.7 L mol⁻¹. Confirm this value in the IB Data Booklet.",
          },
        ],
        traps: [
          "Mixing units in PV = nRT immediately gives a wrong answer. The most common unit error in IB: entering pressure in kPa while using R in Pa·m³ units, or entering volume in litres while the formula expects m³. Rule: use P in Pa, V in m³, R = 8.314 J mol⁻¹ K⁻¹, T in K — or copy the units directly from the Data Booklet.",
          "Entering temperature in °C instead of K is one of the most frequent causes of lost marks in IB gas-law questions. Make '°C → K conversion first' a non-negotiable first step before any calculation.",
        ],
        example:
          "Find the volume occupied by 0.500 mol of CO₂ at 27 °C and 200 kPa. T = 27 + 273 = 300 K, P = 200 × 10³ Pa = 2.00 × 10⁵ Pa. V = nRT / P = (0.500 × 8.314 × 300) / (2.00 × 10⁵) = 1247.1 / 200 000 = 6.24 × 10⁻³ m³ = 6.24 L.",
      },
      {
        title: "Molar Concentration and Solution Stoichiometry",
        subtitle: "c = n / V is all you need to master solution reaction calculations",
        terms: [
          {
            term: "Molar Concentration (Molarity)",
            def: "The number of moles of solute dissolved per cubic decimetre (dm³ = L) of solution. Units: mol dm⁻³ (= mol L⁻¹, M). Formula: c = n / V, where V is in dm³. IB uses dm³ and L as equivalent units.",
          },
          {
            term: "Titration",
            def: "An analytical technique in which a standard solution of known concentration (in a burette) is added to a solution of unknown concentration until the equivalence point is reached, allowing the unknown concentration to be determined from the volume used.",
          },
          {
            term: "Equivalence Point",
            def: "The point at which the acid and base have reacted in exactly the stoichiometric ratio. Distinguish this from the end point, which is the experimentally observed colour change of an indicator — the end point is an approximation of the equivalence point.",
          },
          {
            term: "Dilution",
            def: "The process of lowering the concentration of a solution by adding more solvent. Because the moles of solute are unchanged: c₁V₁ = c₂V₂. Doubling the volume halves the concentration.",
          },
        ],
        traps: [
          "Volume unit confusion: IB uses dm³ (= L) for concentration calculations but m³ for the ideal gas law. In c = n / V, if V is given in mL, convert to dm³ by dividing by 1000 before substituting. For example, 25.0 mL = 0.0250 dm³.",
          "Assuming a 1:1 acid-to-base mole ratio without checking the balanced equation is a frequent error in titration calculations. For example, H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O gives H₂SO₄ : NaOH = 1:2. Always write the balanced equation first.",
        ],
        example:
          "A 25.0 mL sample of HCl(aq) is titrated with 0.100 mol dm⁻³ NaOH. The titration requires 22.4 mL of NaOH. Find the concentration of the HCl.\nHCl + NaOH → NaCl + H₂O (1:1 ratio).\nn(NaOH) = 0.100 × 0.0224 = 2.24 × 10⁻³ mol.\nn(HCl) = n(NaOH) = 2.24 × 10⁻³ mol.\nc(HCl) = 2.24 × 10⁻³ / 0.0250 = 0.0896 mol dm⁻³ (3 s.f.).",
      },
    ],
  },
];
