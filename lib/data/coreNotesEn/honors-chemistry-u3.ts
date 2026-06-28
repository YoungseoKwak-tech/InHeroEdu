/**
 * Core Notes English version — Honors Chemistry Unit 3 (Chemical Reactions & Stoichiometry).
 * Faithful English translation of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_CHEMISTRY_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-chemistry-u3-l1",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 1,
    unitName: "Chemical Reactions & Stoichiometry",
    title: "Types of Chemical Reactions and Balancing Equations",
    subtitle: "A systematic strategy for classifying five reaction types and balancing coefficients, grounded in conservation of atoms",
    overview:
      "A chemical equation is an exact ledger of the atoms before and after a reaction. The law of conservation of mass, one of the most fundamental laws of chemistry, states that the kinds and numbers of atoms must be the same before and after a reaction — atoms are neither created nor destroyed. That is why we balance equations, adjusting coefficients to make the atom counts equal on both sides. At the same time, knowing reaction patterns lets you predict which products will form. The five reaction types — synthesis, decomposition, single displacement, double displacement, and combustion — are core topics that recur on AP exams and in Honors Chemistry. Tying reaction type and balancing together into one flow makes the stoichiometry you'll learn later far easier.",
    objectives: [
      "Distinguish the features of synthesis, decomposition, single-displacement, double-displacement, and combustion reactions, and classify a given equation by type",
      "Balance a chemical equation by adjusting coefficients on the basis of conservation of mass, and interpret the balanced coefficients as mole ratios",
      "Predict the products of the complete combustion of a hydrocarbon and balance the equation",
      "Distinguish precipitation, acid-base neutralization, and gas-evolution reactions among double-displacement reactions and write the net ionic equation",
    ],
    formulas: [
      "Conservation of mass: number of reactant atoms = number of product atoms (for each element)",
      "Complete combustion: CₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O",
    ],
    sections: [
      {
        title: "The Five Reaction Types",
        subtitle: "Classifying reactions by reactant/product pattern lets you predict the products",
        terms: [
          {
            term: "Synthesis reaction",
            def: "A reaction in which two or more substances combine to make a single new substance. General form: A + B → AB. Examples: 2Na + Cl₂ → 2NaCl, CaO + H₂O → Ca(OH)₂. Typical cases include an active metal reacting with oxygen, sulfur, or a halogen, or a metal oxide reacting with water to form a base.",
          },
          {
            term: "Decomposition reaction",
            def: "A reaction in which one compound breaks into two or more simpler substances. General form: AB → A + B. Often requires an energy input (heat, light, or electricity). Examples: 2H₂O₂ → 2H₂O + O₂, CaCO₃ (heated) → CaO + CO₂, 2HgO (heated) → 2Hg + O₂.",
          },
          {
            term: "Single displacement reaction",
            def: "A reaction in which one element displaces another from a compound. General form: A + BC → AC + B. For the reaction to actually occur, the displacing element must be higher in the activity series than the element it displaces. Examples: Zn + 2HCl → ZnCl₂ + H₂↑, Fe + CuSO₄ → FeSO₄ + Cu. You must know the metal activity series to predict whether products form.",
          },
          {
            term: "Double displacement reaction",
            def: "A reaction in which two ionic compounds exchange cations. General form: AB + CD → AD + CB. Precipitation, acid-base neutralization, and gas-evolution reactions fall into this type. Examples: AgNO₃ + NaCl → AgCl↓ + NaNO₃, HCl + NaOH → NaCl + H₂O. A 'driving force' must exist for the reaction to occur: an insoluble precipitate, water, or a gas must form.",
          },
        ],
        traps: [
          "Memorizing a combustion reaction simply as 'reacting with oxygen' fails to distinguish it from incomplete combustion. In complete combustion the products of a hydrocarbon are CO₂ and H₂O; if oxygen is insufficient, CO or C (soot) forms. Also, if the O₂ coefficient comes out as a fraction in a combustion equation, you must double all coefficients to make them whole numbers — coefficients must be the smallest whole numbers.",
          "Without knowing the activity series, you cannot even judge whether a single-displacement reaction occurs. Cu + ZnSO₄ → no reaction, Zn + CuSO₄ → reaction — these two pairs are frequent exam traps. Hydrogen's position matters too: metals more active than H (Na, Mg, Al, Zn, Fe, etc.) displace the H⁺ of an acid to evolve H₂ gas, but metals less active than H, such as Cu, Ag, and Au, do not react with acids.",
        ],
        example:
          "Balance the complete-combustion equation of propane (C₃H₈). Step 1: write the unbalanced equation → C₃H₈ + O₂ → CO₂ + H₂O. Step 2: balance C first → coefficient of CO₂ = 3. Step 3: balance H → C₃H₈ has 8 H, so coefficient of H₂O = 4. Step 4: balance O → right-side O = 3×2 + 4×1 = 10, so coefficient of O₂ = 5. Step 5: complete → C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Check: C 3=3 ✓, H 8=8 ✓, O 10=10 ✓. The coefficients 1·5·3·4 are the smallest whole-number ratio, so no reduction is needed.",
      },
      {
        title: "Balancing Chemical Equations",
        subtitle: "A coefficient-adjustment strategy — element order and fraction handling to finish without mistakes",
        terms: [
          {
            term: "Balanced chemical equation",
            def: "An equation in which coefficients are placed before the formulae so that the number of atoms of each element is equal on both reactant and product sides. The coefficients must be the smallest whole-number ratio, and you must never change the subscripts of a formula — changing a subscript makes a different substance.",
          },
          {
            term: "Spectator ion",
            def: "An ion that is present in solution during a double-displacement reaction but does not participate in the actual reaction and is unchanged before and after. In the net ionic equation, spectator ions are removed, leaving only the ions that actually react. Example: in AgNO₃ + NaCl → AgCl↓ + NaNO₃, Na⁺ and NO₃⁻ are spectators, and the net ionic equation is Ag⁺(aq) + Cl⁻(aq) → AgCl(s).",
          },
          {
            term: "Solubility rules",
            def: "Empirical rules for judging whether a precipitate forms in a double-displacement reaction. Key rules: ① all Na⁺, K⁺, NH₄⁺, NO₃⁻, and CH₃COO⁻ compounds are soluble; ② Cl⁻, Br⁻, I⁻ are insoluble when combined with Ag⁺, Pb²⁺, Hg₂²⁺; ③ SO₄²⁻ is insoluble when combined with Ba²⁺, Pb²⁺, Ca²⁺; ④ CO₃²⁻, PO₄³⁻, OH⁻ are mostly insoluble (except with alkali metals and NH₄⁺).",
          },
        ],
        traps: [
          "Changing a formula's subscript while balancing is a frequent cause of lost marks in Honors Chemistry. Changing H₂O to H₃O is an act of creating a completely different substance. Adjust only the coefficients, and if a polyatomic ion is unchanged, keep the parentheses and subscripts as-is and only raise the coefficient. Example: a coefficient of 2 on Ca(OH)₂ gives 2Ca(OH)₂, not Ca(OH)₄.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u3-l2",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 2,
    unitName: "Chemical Reactions & Stoichiometry",
    title: "The Mole Concept and Molar Mass",
    subtitle: "Why Avogadro's number is the only bridge connecting the atomic world to the laboratory world",
    overview:
      "The mass of a single atom is on the order of 10⁻²³ g — absurdly small and impossible to weigh directly. Yet in chemistry experiments we measure substances in grams. The unit that connects these two worlds is the mole. One mole is a 'bundle' of an enormous number of particles, 6.022 × 10²³ (Avogadro's number). The key point is that with this bundle, the number in atomic mass units (amu) becomes, unchanged, the molar mass in grams — C is 12 amu/atom and simultaneously 12 g/mol. This symmetry is the foundation of all stoichiometric calculation. The ability to convert freely among moles, mass, number of particles, and gas volume is used repeatedly across every calculation unit of this course.",
    objectives: [
      "Use Avogadro's number (6.022 × 10²³) and the definition of the mole to interconvert number of particles and moles",
      "Use the atomic masses on the periodic table to calculate the molar mass of elements and compounds, and convert between mass (g) and moles (mol)",
      "Find a compound's empirical formula and molecular formula from its percent composition",
      "Use the molar volume of a gas (22.4 L/mol at 0 °C, 1 atm) to convert between moles and volume of a gas",
    ],
    formulas: [
      "Moles (mol) = mass (g) ÷ molar mass (g/mol)",
      "Number of particles = moles × 6.022 × 10²³",
      "Percent composition = (molar mass of element × number of atoms / molar mass of compound) × 100%",
      "Gas volume (STP) = moles × 22.4 L/mol",
    ],
    sections: [
      {
        title: "The Mole and Avogadro's Number",
        subtitle: "The conversion factor that links the atomic/molecular world to the gram-scale laboratory world",
        terms: [
          {
            term: "Mole",
            def: "An SI base unit; a quantity containing the same number of particles (6.022 × 10²³) as the number of atoms in 12 g of carbon-12. It applies to any particle — atoms, molecules, ions, electrons. Because the mole is simply a 'counting unit,' '1 mole of apples' = 6.022 × 10²³ apples in the same way.",
          },
          {
            term: "Avogadro's number",
            def: "The number of particles in 1 mole: Nₐ = 6.022 × 10²³ mol⁻¹. It is defined as the number of atoms in 12 g of carbon-12. Used as a conversion factor: number of particles = moles × 6.022 × 10²³, moles = number of particles ÷ 6.022 × 10²³.",
          },
          {
            term: "Molar mass",
            def: "The mass of 1 mole of a substance, in g/mol. For an element, the atomic-mass value (amu) from the periodic table becomes the g/mol value directly. The molar mass of a compound is the sum of (atomic mass × number of atoms) for each element. Example: H₂SO₄ = 2(1.008) + 32.07 + 4(16.00) = 98.09 g/mol.",
          },
          {
            term: "Percent composition",
            def: "The mass fraction (%) that each element contributes to a compound's total molar mass. Percent composition = (total mass of element / molar mass of compound) × 100. In H₂O, the percent composition of H = (2 × 1.008) / 18.02 × 100 = 11.19%, O = 88.81%. From an experimentally measured percent composition you can work back to the empirical formula.",
          },
        ],
        traps: [
          "Don't confuse atomic mass with mass number. Atomic mass is a weighted average reflecting the abundances of naturally occurring isotopes, so it has a decimal value rather than a whole number — Cl's atomic mass is 35.45 g/mol, not 35 or 37. Mass number, by contrast, is the whole-number sum of protons + neutrons for a specific isotope. Always use the periodic table's atomic mass (the decimal value) for molar-mass calculations.",
          "Problems distinguishing empirical formula from molecular formula trip students up often. Percent composition always yields the empirical formula. To find the molecular formula, multiply by the integer n = molecular mass (usually measured by mass spectrometry) ÷ empirical formula mass. Example: from glucose's percent composition the empirical formula = CH₂O (empirical mass 30), and the actual molecular mass = 180, so n = 180/30 = 6 → molecular formula = C₆H₁₂O₆.",
        ],
        example:
          "Find the molecular formula of a compound whose elemental analysis gives C 40.00%, H 6.73%, O 53.27% with a molar mass of 60.05 g/mol. Step 1: assume 100 g → C = 40.00 g, H = 6.73 g, O = 53.27 g. Step 2: convert to moles → C = 40.00/12.01 = 3.331 mol, H = 6.73/1.008 = 6.677 mol, O = 53.27/16.00 = 3.329 mol. Step 3: divide by the smallest (O = 3.329) → C ≈ 1, H ≈ 2, O ≈ 1 → empirical formula CH₂O. Step 4: empirical formula mass = 12.01 + 2(1.008) + 16.00 = 30.03 g/mol. Step 5: n = 60.05 / 30.03 ≈ 2 → molecular formula = C₂H₄O₂ (acetic acid).",
      },
      {
        title: "The Mole Conversion Roadmap",
        subtitle: "Training to move freely among mass ↔ moles ↔ number of particles ↔ gas volume",
        terms: [
          {
            term: "Dimensional analysis",
            def: "A methodology of multiplying or dividing by conversion factors aimed at the desired unit. Because each conversion factor has equal numerator and denominator, the value itself is unchanged and only the units change. Mass → moles → particles path: mass (g) × (1 mol / molar mass) × (6.022×10²³ / 1 mol) in continuous conversion.",
          },
          {
            term: "Molar volume at STP",
            def: "The volume occupied by 1 mole of an ideal gas at standard conditions (STP: 0 °C, 1 atm) = 22.4 L/mol. Derived from the ideal gas law (PV = nRT). At SATP (25 °C, 100 kPa) it becomes 24.8 L/mol, so always confirm which conditions a problem specifies.",
          },
          {
            term: "Mole roadmap",
            def: "The skeleton of stoichiometric calculation: ① mass (g) ÷ molar mass (g/mol) = moles (mol); ② moles (mol) × Avogadro's number = number of particles; ③ moles (mol) × 22.4 L/mol (STP) = gas volume. When crossing from reactant to product, apply the mole ratio (the coefficient ratio of the balanced equation) in between.",
          },
        ],
        traps: [
          "The STP molar volume of 22.4 L/mol applies only to ideal gases. Real gases can differ from this value, and if the temperature or pressure is not STP you must use PV = nRT directly. Also, when IUPAC redefined STP in 2010 as 0 °C and 1 bar, the molar volume changed from 22.4 L/mol to 22.7 L/mol, but most Honors/AP textbooks still use 22.4 L/mol (0 °C, 1 atm). Check the conditions given in the problem.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u3-l3",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 3,
    unitName: "Chemical Reactions & Stoichiometry",
    title: "Stoichiometry — Mole Ratio, Limiting Reactant, and Percent Yield",
    subtitle: "The moment you use the coefficients of a balanced equation as conversion factors, every stoichiometric calculation converges to one algorithm",
    overview:
      "Stoichiometry is the technique of calculating the quantitative relationships between reactants and products in a balanced chemical equation. The starting point of all these calculations is the coefficients of the balanced equation, because those coefficients are the mole ratio. In 2H₂ + O₂ → 2H₂O, when 2 mol of H₂ react, 1 mol of O₂ is consumed and 2 mol of H₂O are produced. Using this ratio you can calculate the amount of any other substance from any given amount. In reality, reactants are not supplied in exactly the right ratio — there is always a limiting reactant that runs out first and stops the reaction. And the amount actually obtained in an experiment (actual yield) is always less than or equal to the theoretically calculated amount (theoretical yield). These three concepts — mole ratio, limiting reactant, and percent yield — are the highest-frequency calculation question type in Honors Chemistry.",
    objectives: [
      "Interpret the coefficients of a balanced equation as a mole ratio, and calculate the mass of product from a given reactant mass using dimensional analysis",
      "When the amounts of both reactants are given, determine the limiting reactant and calculate the amount of excess reactant remaining",
      "Explain the difference between theoretical yield and actual yield and calculate the percent yield",
      "Calculate the overall yield of a multi-step reaction by multiplying the yields of each step",
    ],
    formulas: [
      "Theoretical yield: reactant (g) × (1 mol / molar mass) × (product coefficient / reactant coefficient) × molar mass (product) = theoretical yield (g)",
      "Percent yield (% yield) = (actual yield / theoretical yield) × 100%",
      "Identifying the limiting reactant: calculate the moles of product obtainable from each reactant → the reactant giving the smaller value is the limiting reactant",
      "Overall yield of a multi-step reaction = %yield₁ × %yield₂ × … (convert to decimals first, then multiply)",
    ],
    sections: [
      {
        title: "Mole Ratio and Stoichiometric Calculation",
        subtitle: "The 4-step algorithm: mass → moles → apply mole ratio → moles → mass",
        terms: [
          {
            term: "Mole ratio",
            def: "The ratio of the coefficients of each substance in a balanced chemical equation. Used as a conversion factor in dimensional analysis. Example: in N₂ + 3H₂ → 2NH₃, the mole ratio of H₂ to NH₃ is 3:2, so when x mol of H₂ react, x × (2/3) mol of NH₃ form. The mole ratio must always be read from a balanced equation.",
          },
          {
            term: "Theoretical yield",
            def: "The maximum amount of product calculated stoichiometrically when the limiting reactant reacts completely. The amount actually obtained in the lab is at or below the theoretical yield due to reaction irreversibility, side reactions, and experimental losses. It can be expressed as mass (g), moles (mol), or volume (L, for gases).",
          },
          {
            term: "Actual yield & percent yield",
            def: "Actual yield is the amount of product actually obtained in an experiment; percent yield = (actual yield / theoretical yield) × 100%. Percent yield cannot exceed 100% (that would violate conservation of mass); if a result above 100% appears, the product contains impurities (e.g. unreacted reagent, moisture).",
          },
          {
            term: "Limiting & excess reactant",
            def: "The limiting reactant is the one consumed first that stops the reaction, and it determines the maximum amount of product. The excess reactant is the one with some remaining after the reaction. Identifying the limiting reactant: calculate the moles of product obtainable from each reactant; the one giving the smaller amount of product is the limiting reactant.",
          },
        ],
        traps: [
          "In limiting-reactant problems, simply comparing 'the reactant with fewer given moles is the limiting reactant' is wrong. You must account for the coefficient ratio of the balanced equation. In N₂ + 3H₂ → 2NH₃, given 4 mol N₂ and 9 mol H₂, H₂ (9 mol) intuitively looks like more, but 9 mol H₂ can consume only 3 mol N₂. N₂ is 4 mol while H₂ is 9 mol → the N₂ needed for reaction = 9/3 = 3 mol < 4 mol → H₂ is the limiting reactant. Always calculate and compare 'the moles of product obtainable from each reactant.'",
          "When calculating percent yield, the 'theoretical yield' must be found based on the limiting reactant. Calculating theoretical yield from the excess reactant gives a larger theoretical yield than reality, making the percent yield unrealistically low. Follow the order: determine limiting reactant → calculate theoretical yield → calculate percent yield.",
        ],
        example:
          "In the reaction Fe₂O₃ + 3CO → 2Fe + 3CO₂, when 200 g of Fe₂O₃ reacts with 100 g of CO, find ① the limiting reactant, ② the theoretical yield (mass of Fe), and ③ the percent yield if the actual yield is 98.5 g. ① Mole calculation: Fe₂O₃ = 200 / 159.7 = 1.252 mol, CO = 100 / 28.01 = 3.570 mol. Fe obtainable from each: from Fe₂O₃ → 1.252 × 2 = 2.504 mol Fe; from CO → 3.570 × (2/3) = 2.380 mol Fe. CO gives less Fe, so CO is the limiting reactant. ② Theoretical yield: 2.380 mol Fe × 55.85 g/mol = 132.9 g Fe. ③ % yield = (98.5 / 132.9) × 100% = 74.1%.",
      },
      {
        title: "Excess-Reactant Calculation and Multi-Step Yield",
        subtitle: "Advanced applications: quantifying the leftover reactant and assessing the overall efficiency of sequential reactions",
        terms: [
          {
            term: "Calculating the leftover excess reactant",
            def: "Once the limiting reactant is determined, use the mole ratio to calculate how much excess reactant is consumed when the limiting reactant reacts completely, then subtract that from the initial moles of excess reactant to find the leftover. Convert to grams by leftover (mol) × molar mass (g/mol).",
          },
          {
            term: "Overall yield in multi-step synthesis",
            def: "In reactions that proceed through several steps (such as organic synthesis), convert each step's percent yield to a decimal and multiply to get the overall yield. Example: in a 3-step reaction with step yields of 90%, 85%, and 80%, the overall yield = 0.90 × 0.85 × 0.80 = 0.612 = 61.2%. Because the overall yield drops sharply as steps are added, minimizing the number of steps is important in industrial processes.",
          },
          {
            term: "Significant figures in stoichiometry",
            def: "The significant figures of a calculated result follow the value with the fewest significant figures among the given data. Keep significant figures (or one extra digit) through intermediate calculations and round only at the final answer. Premature rounding in intermediate steps causes accumulated rounding error that can make the final answer wrong.",
          },
        ],
        traps: [
          "Treating a percent yield above 100% as 'the calculation is correct' is a major error. Realistically a yield above 100% is impossible (conservation of mass), and such a result means one of: ① the product contains moisture or impurities; ② the theoretical yield was calculated from the excess reactant instead of the limiting reactant; ③ a unit-conversion mistake. If you get a result above 100%, retrace the calculation to find where the error occurred.",
        ],
        example: null,
      },
    ],
  },
];
