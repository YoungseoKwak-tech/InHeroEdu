/**
 * Core Notes English version — Honors Chemistry Unit 3 (Stoichiometry).
 * Faithful English rendering of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
 * Source: lib/data/authored-corenotes/honors-chemistry.json, unit 3 (lessonNum 1-5).
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
    unitName: "Stoichiometry",
    title: "Why the Mole Is the Chemist's Dozen",
    subtitle: "The mole is chemistry's 'dozen' — using Avogadro's number and dimensional analysis to link particles, mass, and moles",
    overview:
      "Atoms and molecules are so small they cannot be counted individually, so chemists bundle 6.022 × 10²³ of them into one unit called the mole. Molar mass is the mass of one mole (g/mol) and is read directly from the atomic masses on the periodic table. Converting among mass, moles, and number of particles becomes painless when you use dimensional analysis — setting up conversion factors so that units cancel — because the direction of multiplication or division is determined automatically by which unit you want to eliminate.",
    objectives: [
      "Explain Avogadro's number and the mole concept",
      "Read molar mass from the periodic table",
      "Interconvert mass, moles, and number of particles using dimensional analysis",
      "Determine whether to multiply or divide by inspecting unit cancellation",
    ],
    formulas: [
      "1 mol = 6.022 × 10²³ particles (Avogadro's number)",
      "moles = mass (g) ÷ molar mass (g/mol)",
      "mass (g) = moles × molar mass (g/mol)",
      "number of particles = moles × 6.022 × 10²³",
    ],
    sections: [
      {
        title: "The Mole and Avogadro's Number",
        subtitle: "A counting unit that makes the invisible measurable",
        body: "Just as eggs are counted in dozens of 12, chemists count particles in moles of 6.022 × 10²³. That enormous number — Avogadro's number — was defined as the number of atoms in exactly 12 g of carbon-12. Because the same count applies to any particle, one mole is a universal 'bundle': one mole of water molecules, one mole of sodium ions, or one mole of electrons each contains exactly 6.022 × 10²³ units. This lets us connect the invisible atomic world to the gram-scale world of the laboratory.",
        keyIdea: "The mole is chemistry's 'dozen': one bundle = 6.022 × 10²³ particles.",
        terms: [
          {
            term: "Mole (mol)",
            def: "The SI unit of amount of substance. One mole contains 6.022 × 10²³ particles.",
          },
          {
            term: "Avogadro's number",
            def: "The number of particles in one mole: 6.022 × 10²³ mol⁻¹.",
          },
          {
            term: "Amount of substance",
            def: "The quantity of matter measured in moles.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "Reading Molar Mass",
        subtitle: "The periodic table gives you molar mass for free",
        body: "Molar mass is the mass of one mole of a substance, expressed in g/mol. For any element, the atomic mass shown on the periodic table in amu is numerically equal to the molar mass in g/mol — carbon's atomic mass is 12.01 amu per atom and simultaneously 12.01 g/mol. For a compound, add up (molar mass × number of atoms) for every element present. For example, H₂O = 2(1.01) + 16.00 = 18.02 g/mol. Molar mass serves as the conversion factor between mass and moles.",
        terms: [
          {
            term: "Molar mass",
            def: "The mass of one mole of a substance (g/mol). Read numerically from the periodic table's atomic mass values.",
          },
          {
            term: "Atomic mass",
            def: "The weighted average mass of an element's naturally occurring isotopes (amu). Numerically equal to molar mass (g/mol).",
          },
          {
            term: "Formula mass",
            def: "The sum of the atomic masses of all atoms in one formula unit of a compound.",
          },
        ],
        traps: [],
        example: "CO₂ molar mass = 12.01 + 2(16.00) = 44.01 g/mol.",
      },
      {
        title: "Dimensional Analysis: Multiply or Divide?",
        subtitle: "Let unit cancellation decide — stop memorizing the direction",
        body: "Instead of trying to remember whether to multiply or divide, arrange conversion factors so that the unit you want to eliminate appears in the denominator. To convert grams to moles, write (1 mol / molar mass) so that grams cancel: g × (mol / g) = mol. To convert moles to particles, multiply by (6.022 × 10²³ particles / 1 mol) so that mol cancels. The rule is simple: place the unit you want to get rid of in the denominator, and the direction of the calculation takes care of itself.",
        keyIdea: "Put the unit you want to eliminate in the denominator — the direction of multiplication or division follows automatically.",
        terms: [
          {
            term: "Dimensional analysis",
            def: "A method of converting between units by multiplying by conversion factors chosen so that unwanted units cancel.",
          },
          {
            term: "Conversion factor",
            def: "A fraction whose numerator and denominator are equal in value but in different units (e.g. 1 mol / 18 g).",
          },
        ],
        traps: [
          "Dividing when you should multiply, and vice versa — set up dimensional analysis so units cancel instead of guessing direction. Converting grams to moles means dividing by molar mass (g → mol: divide by g/mol).",
          "Calculating a compound's molar mass using only one atom — multiply the atomic mass by the subscript for every element and sum the results (H₂O = 2 × H + 1 × O, not just H or O alone).",
        ],
        example: "36 g H₂O → mol: 36 g × (1 mol / 18.02 g) = 2.00 mol (g cancels).",
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
    unitName: "Stoichiometry",
    title: "How to Balance Equations Without Changing the Chemistry",
    subtitle: "Balancing adjusts coefficients only — changing a subscript creates a different substance",
    overview:
      "Balancing a chemical equation is the act of expressing conservation of mass in symbolic form: atoms are rearranged in a reaction but are never created or destroyed. The number of atoms of each element must be the same on both sides, and the only permitted adjustment is the coefficient in front of each formula. Changing the subscript inside a formula would change the identity of the substance itself. Recognizing polyatomic ions as intact units speeds up the process considerably.",
    objectives: [
      "Explain the law of conservation of mass as it applies to chemical equations",
      "Balance chemical equations by adjusting coefficients only",
      "Balance equations more efficiently by treating intact polyatomic ions as single units",
      "Explain why subscripts must never be changed while balancing",
    ],
    formulas: [
      "Balancing condition: number of atoms of each element is equal on both sides",
      "Permitted adjustment: coefficients (the numbers in front of formulas) only",
      "Forbidden adjustment: subscripts (numbers inside formulas)",
      "Intact polyatomic ions (SO₄²⁻, NO₃⁻, etc.) that appear unchanged can be counted as single units",
    ],
    sections: [
      {
        title: "Conservation of Mass Is the Balance",
        subtitle: "Atoms are rearranged, never created or destroyed",
        body: "In every chemical reaction, atoms are shuffled into new arrangements — bonds break and new ones form — but no atom vanishes and no new atom appears (law of conservation of mass). A balanced equation is a precise record of this fact: the atom count for every element must be identical on the reactant side and the product side. Only a balanced equation can be trusted for the mole ratios and quantitative calculations that come next. Think of balancing as chemistry's accounting ledger.",
        keyIdea: "Atoms do not disappear — equating atom counts on both sides is what balancing means.",
        terms: [
          {
            term: "Law of conservation of mass",
            def: "Mass (and therefore the number of atoms) is conserved in a chemical reaction. No atoms are created or destroyed.",
          },
          {
            term: "Chemical equation",
            def: "A symbolic representation of a chemical reaction showing reactants on the left and products on the right of an arrow.",
          },
          {
            term: "Reactant",
            def: "A substance present before the reaction; appears on the left side of the arrow.",
          },
          {
            term: "Product",
            def: "A substance formed by the reaction; appears on the right side of the arrow.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "Coefficients Only — Never Touch Subscripts",
        subtitle: "The coefficient counts molecules; the subscript defines what molecule it is",
        body: "A coefficient written in front of a formula — for example the '2' in 2H₂O — tells you how many formula units are present. Changing the coefficient does not change the identity of the substance. A subscript written inside a formula — the '2' in H₂O — defines how many of each atom are bonded together in one molecule. Changing H₂O to H₂O₂ produces hydrogen peroxide, an entirely different compound. The single most common and damaging balancing mistake is editing subscripts to make atom counts work out: it is chemically wrong and will cost marks on every exam.",
        keyIdea: "Coefficient = how many (change freely); subscript = what substance (never change while balancing).",
        terms: [
          {
            term: "Coefficient",
            def: "The number placed in front of a chemical formula in a balanced equation. It tells how many formula units are present and can be adjusted during balancing.",
          },
          {
            term: "Subscript",
            def: "The number written below and to the right of an element symbol within a formula. It defines the composition of the substance and must not be changed during balancing.",
          },
        ],
        traps: [],
        example: "2H₂ + O₂ → 2H₂O — the coefficient '2' is added in front of H₂ and H₂O to balance; subscripts remain unchanged throughout.",
      },
      {
        title: "Polyatomic Ions — Count Them as Single Units",
        subtitle: "Group unchanged ions together to reach balance faster",
        body: "When a polyatomic ion such as SO₄²⁻ or NO₃⁻ appears in both reactants and products without being broken apart, you do not need to track its individual atoms. Treat the whole ion as one unit and count how many appear on each side — this turns a multi-atom tally into a simple one-unit count. As a general strategy, start by balancing the most complex formula first, leave elemental substances such as O₂ and H₂ for last, and convert any fractional coefficients to the smallest whole-number set by multiplying through.",
        terms: [
          {
            term: "Polyatomic ion",
            def: "A group of atoms bonded together that carries an overall charge (e.g. SO₄²⁻, NO₃⁻, NH₄⁺). When the group is unchanged by the reaction, it can be counted as a single unit while balancing.",
          },
          {
            term: "Balancing by inspection",
            def: "The trial-and-error method of adjusting coefficients one element (or polyatomic ion) at a time until all atom counts are equal on both sides.",
          },
        ],
        traps: [
          "Changing subscripts to balance — changing subscripts changes the identity of the substance (H₂O₂ ≠ H₂O). Only adjust coefficients.",
          "Breaking a polyatomic ion into individual atoms when the ion is intact throughout — count it as one unit to save time and avoid confusion.",
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
    unitName: "Stoichiometry",
    title: "How the Mole Ratio Connects Reactants to Products",
    subtitle: "The mole ratio is the bridge — mass → moles → (mole ratio) → moles → mass, and what percent yield means",
    overview:
      "The coefficients of a balanced equation give you the mole ratio between every reactant and product. Because you cannot convert mass directly to mass of a different substance, every stoichiometric calculation must pass through the sequence: mass → moles → apply mole ratio → moles → mass. The amount you actually obtain in an experiment (actual yield) is always less than the theoretically calculated maximum (theoretical yield), and their ratio expressed as a percentage is the percent yield.",
    objectives: [
      "Read the mole ratio from a balanced equation",
      "Carry out a mass-to-mass stoichiometric calculation step by step",
      "Distinguish theoretical yield from actual yield",
      "Calculate percent yield",
    ],
    formulas: [
      "mole ratio = ratio of the coefficients in the balanced equation",
      "path: mass A → mol A → (mole ratio) → mol B → mass B",
      "percent yield = (actual yield ÷ theoretical yield) × 100%",
    ],
    sections: [
      {
        title: "The Mole Ratio: What the Equation Gives You",
        subtitle: "Balanced coefficients are a mole-to-mole conversion factor",
        body: "The coefficients of a balanced equation express the ratio of moles (or molecules) that react and are produced. In N₂ + 3H₂ → 2NH₃ the ratio N₂ : H₂ : NH₃ = 1 : 3 : 2. This tells you that 1 mol of N₂ reacts with exactly 3 mol of H₂ to give exactly 2 mol of NH₃. The mole ratio is a conversion factor that lets you move from the moles of any one substance to the moles of any other. The critical point: the coefficients express a mole ratio, not a mass ratio.",
        keyIdea: "Balanced equation coefficients = mole ratio. Not a mass ratio — a particle (mole) ratio.",
        terms: [
          {
            term: "Mole ratio",
            def: "The ratio of the coefficients of substances in a balanced equation. Used as a conversion factor to move from moles of one substance to moles of another.",
          },
          {
            term: "Stoichiometry",
            def: "The branch of chemistry concerned with the quantitative relationships between reactants and products in a chemical reaction.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "The Mass-to-Mass Path",
        subtitle: "Three steps every time: mass → moles → mole ratio → moles → mass",
        body: "To calculate the mass of a product from the mass of a reactant, follow three steps in order. First, divide the given mass by the molar mass of that reactant to get moles. Second, apply the mole ratio from the balanced equation to convert moles of reactant to moles of product. Third, multiply by the molar mass of the product to get grams. Skipping the mole ratio step and jumping directly from mass to mass is the most common stoichiometry error. Always check that your units cancel correctly at each step.",
        keyIdea: "You cannot jump from mass to mass directly — you must pass through moles and apply the mole ratio.",
        terms: [
          {
            term: "Mass-to-mass stoichiometry",
            def: "A three-step calculation that converts a reactant mass to a product mass: (1) mass → moles via molar mass, (2) moles → moles via mole ratio, (3) moles → mass via molar mass.",
          },
        ],
        traps: [],
        example: "28 g N₂ → g NH₃: 28 g ÷ 28 g/mol = 1 mol N₂ → × (2 mol NH₃ / 1 mol N₂) = 2 mol NH₃ → × 17 g/mol = 34 g NH₃.",
      },
      {
        title: "Theoretical Yield and Percent Yield",
        subtitle: "The calculation gives the maximum; the experiment gives less",
        body: "The theoretical yield is the maximum amount of product calculated from stoichiometry, assuming the limiting reactant reacts completely and no product is lost. In real experiments, side reactions, incomplete conversion, and handling losses always reduce the amount obtained. The actual yield is what you collect. Percent yield expresses the efficiency of the reaction: (actual ÷ theoretical) × 100%. Percent yield is almost always below 100%. A value above 100% signals an error — most likely that the product is contaminated with impurities or that the theoretical yield was calculated from the wrong substance.",
        terms: [
          {
            term: "Theoretical yield",
            def: "The maximum mass of product predicted by stoichiometry, calculated from the limiting reactant reacting completely.",
          },
          {
            term: "Actual yield",
            def: "The mass of product actually obtained in an experiment. Always ≤ theoretical yield under ideal conditions.",
          },
          {
            term: "Percent yield",
            def: "(Actual yield ÷ theoretical yield) × 100%. A measure of the efficiency of a reaction. Cannot exceed 100% under conservation of mass.",
          },
        ],
        traps: [
          "Skipping the mole ratio and converting the reactant's moles directly to the product's mass — the balanced equation's mole ratio must always be applied between the reactant moles and the product moles.",
          "Treating the coefficients as a mass ratio — coefficients are mole (count) ratios. To get mass you must multiply by each substance's molar mass.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u3-l4",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 4,
    unitName: "Stoichiometry",
    title: "How to Find the Ingredient That Runs Out First",
    subtitle: "Limiting reactant — compare moles against the mole ratio, not grams, to see which runs out first",
    overview:
      "When two reactants are mixed, they are rarely in exactly the stoichiometric ratio, so one will be completely consumed before the other. That first-to-run-out substance is the limiting reactant, and it determines the maximum amount of product. Identifying the limiting reactant requires converting both masses to moles and comparing them against the ratio demanded by the balanced equation — the reactant with fewer grams is not necessarily the limiting reactant. The substance left over after the reaction is the excess reactant.",
    objectives: [
      "Define limiting reactant and excess reactant",
      "Identify the limiting reactant by comparing mole ratios",
      "Calculate the amount of product from the limiting reactant",
      "Calculate the amount of excess reactant remaining after the reaction",
    ],
    formulas: [
      "limiting reactant = the reactant that yields the smaller amount of product",
      "comparison method: (moles of each reactant) ÷ (its coefficient) → smaller quotient = limiting reactant",
      "excess remaining = initial moles − moles consumed (from limiting reactant via mole ratio)",
    ],
    sections: [
      {
        title: "What the Limiting Reactant Means",
        subtitle: "The ingredient that runs out first controls how much product you get",
        body: "Imagine making sandwiches: you have 4 slices of bread and 10 slices of ham. Each sandwich needs 2 slices of bread and 1 of ham. You can make at most 2 sandwiches before the bread is gone — no matter how much ham remains. The bread is the limiting ingredient. In the same way, when two chemicals react, the one that is fully consumed first limits how far the reaction can proceed. The other reactant has some left over; it is in excess. The amount of product is determined entirely by the limiting reactant.",
        keyIdea: "The amount of product is set by the ingredient (reactant) that runs out first — the limiting reactant.",
        terms: [
          {
            term: "Limiting reactant",
            def: "The reactant that is completely consumed first, stopping the reaction and determining the maximum amount of product.",
          },
          {
            term: "Excess reactant",
            def: "The reactant that remains after the reaction is complete because the limiting reactant ran out first.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "Identifying the Limiting Reactant by Mole Ratio",
        subtitle: "Grams can be misleading — convert to moles and compare against the stoichiometric ratio",
        body: "The reactant with fewer grams is not necessarily the limiting reactant, because molar mass and coefficients both matter. The reliable method is to convert each reactant's mass to moles, then divide each mole value by that reactant's coefficient in the balanced equation. The reactant with the smaller quotient is the limiting reactant. Alternatively, pick one reactant and calculate how many moles of the other would be needed to react with it completely, then compare that to what you actually have. Either way, you must work in moles, not grams.",
        keyIdea: "Divide each reactant's moles by its coefficient — the smaller quotient identifies the limiting reactant.",
        terms: [
          {
            term: "Stoichiometric ratio",
            def: "The ratio of moles of reactants required by the balanced equation. Comparing actual mole ratios against this ratio reveals which reactant is limiting.",
          },
        ],
        traps: [],
        example: "N₂ + 3H₂ → 2NH₃ with 1 mol N₂ and 2 mol H₂: H₂ needs 3 mol to react with 1 mol N₂, but only 2 mol are available → H₂ is the limiting reactant.",
      },
      {
        title: "Calculating Product and Excess Remaining",
        subtitle: "Use the limiting reactant for yield; subtract consumed moles for the leftover",
        body: "Once the limiting reactant is identified, base all product calculations on its moles — ignore the excess reactant when calculating how much product forms. Apply the mole ratio from the balanced equation to convert limiting-reactant moles to product moles, then multiply by the product's molar mass to get grams. To find the excess reactant remaining, use the mole ratio to determine how many moles of the excess reactant were consumed when the limiting reactant reacted completely, then subtract that from the initial moles of the excess reactant.",
        terms: [
          {
            term: "Initial moles",
            def: "The number of moles of a reactant present before the reaction begins.",
          },
          {
            term: "Amount remaining",
            def: "The moles (or grams) of excess reactant left over after the limiting reactant is fully consumed.",
          },
        ],
        traps: [
          "Declaring the reactant with fewer grams the limiting reactant — convert to moles and compare against the stoichiometric ratio. The heavier reactant can still be the limiting one.",
          "Calculating product yield from the excess reactant — yield is always calculated from the limiting reactant's moles only.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u3-l5",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 5,
    unitName: "Stoichiometry",
    title: "Reading a Molecular Formula to Get Empirical and Molecular Formulas",
    subtitle: "Empirical and molecular formulas — never round a non-integer ratio; multiply to reach whole numbers",
    overview:
      "The empirical formula shows the simplest whole-number ratio of atoms in a compound; the molecular formula shows the actual number of atoms in one molecule. The molecular formula is always an integer multiple of the empirical formula. When deriving the empirical formula from percent composition, the mole ratios often come out as non-integers such as 0.33, 0.67, or 0.5. These must not be rounded off carelessly — instead, multiply all values by the appropriate integer (3, 3, or 2 respectively) to convert them to whole numbers.",
    objectives: [
      "Calculate the percent composition of a compound from its formula",
      "Derive the empirical formula from percent-by-mass data",
      "Determine the molecular formula from the empirical formula and the molar mass",
      "Handle non-integer mole ratios correctly by multiplying to obtain whole numbers",
    ],
    formulas: [
      "percent composition = (element mass ÷ compound molar mass) × 100%",
      "empirical formula: g of each element → mol → divide by smallest mol → multiply to integers",
      "molecular formula = n × (empirical formula), where n = molar mass ÷ empirical formula mass",
    ],
    sections: [
      {
        title: "Percent Composition",
        subtitle: "The mass fingerprint of a compound",
        body: "Percent composition tells you what fraction of a compound's mass comes from each element. If you know the formula, calculate each element's contribution: multiply the atomic mass by the number of atoms of that element, divide by the compound's molar mass, and multiply by 100%. The result is the percent composition. Percent composition is the starting point for working backwards to find the empirical formula from experimental data. It is also called elemental analysis.",
        terms: [
          {
            term: "Percent composition",
            def: "The mass percentage of each element in a compound: (total mass of element / molar mass of compound) × 100%.",
          },
          {
            term: "Molar mass",
            def: "The mass of one mole of a compound (g/mol). Used as the denominator in percent composition calculations.",
          },
        ],
        traps: [],
        example: "H₂O: H = (2.02 / 18.02) × 100 ≈ 11.2%; O = (16.00 / 18.02) × 100 ≈ 88.8%.",
      },
      {
        title: "Finding the Empirical Formula",
        subtitle: "Percent → grams → moles → smallest ratio → whole numbers",
        body: "Assume a 100 g sample so that each element's percent directly becomes grams. Convert each mass to moles by dividing by the element's molar mass. Divide all mole values by the smallest value to get a ratio. If the ratio values are whole numbers (or very close, e.g. 0.99 or 1.01), those are the subscripts of the empirical formula. If any value is not close to a whole number — such as 1.33, 1.67, or 1.5 — do not round it off. Instead, multiply all values by the integer that clears the decimal (3 for thirds, 2 for halves). The key is to get an exact whole-number ratio without losing accuracy through premature rounding.",
        keyIdea: "Percent → 100 g → moles → divide by smallest → multiply to whole numbers if needed.",
        terms: [
          {
            term: "Empirical formula",
            def: "The formula showing the simplest whole-number ratio of atoms in a compound. Derived from percent composition data.",
          },
          {
            term: "Mole ratio reduction",
            def: "The step of dividing all mole values by the smallest among them to produce the simplest ratio, then multiplying by an integer if any value is not a whole number.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "Multiplying to Whole Numbers and Finding the Molecular Formula",
        subtitle: "0.67 → × 3; 0.5 → × 2; then use molar mass to find n",
        body: "When a mole ratio produces non-integer values, multiply every element's ratio by the smallest integer that converts all values to whole numbers: multiply by 3 if you see thirds (0.33 or 0.67), by 2 if you see halves (0.5), and by 4 if you see quarters (0.25 or 0.75). For example, a raw ratio of 1 : 2.67 : 1 multiplied by 3 gives 3 : 8 : 3. Once you have the empirical formula, find the integer n by dividing the experimentally determined molar mass by the empirical formula mass. The molecular formula = n × (empirical formula). For example, if the empirical formula is CH₂O (formula mass 30 g/mol) and the actual molar mass is 180 g/mol, then n = 180/30 = 6, giving the molecular formula C₆H₁₂O₆.",
        keyIdea: "0.67/0.33 → multiply by 3; 0.5 → multiply by 2. Never round these to the nearest integer.",
        terms: [
          {
            term: "Molecular formula",
            def: "The formula showing the actual number of atoms of each element in one molecule of a compound. Always an integer multiple (n) of the empirical formula.",
          },
          {
            term: "Empirical formula mass",
            def: "The molar mass calculated from the empirical formula. Used as the denominator when finding n.",
          },
        ],
        traps: [
          "Rounding a ratio too early — 2.67 is not 3; it is a signal to multiply all values by 3 (giving 8 for 2.67). 0.5 → × 2, 0.33/0.67 → × 3.",
          "Treating the empirical formula as the molecular formula — the molecular formula = n × (empirical formula), where n = molar mass ÷ empirical formula mass.",
        ],
        example: "Empirical formula CH₂O (30 g/mol), molar mass 180 g/mol → n = 180/30 = 6 → molecular formula C₆H₁₂O₆.",
      },
    ],
  },
];
