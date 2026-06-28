/**
 * Core Notes English version — Honors Chemistry Unit 4 (Gases & Solutions).
 * Faithful English translation of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
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
    unitName: "Gases & Solutions",
    title: "Gas Laws — Boyle, Charles, and the Ideal Gas Equation",
    subtitle: "The moment you bind pressure, volume, temperature, and moles into a single equation PV = nRT, gas problems become variable tracking rather than formula memorization",
    overview:
      "Gases are the state of matter we can describe most simply with mathematics. Unlike solids and liquids, gas particles move freely with almost no influence on one another, so the behavior of a gas can be perfectly predicted from just four variables: temperature, pressure, volume, and moles. Boyle's law states that P and V are inversely proportional at constant temperature; Charles's law states that V and T (always Kelvin!) are directly proportional at constant pressure. Combining these two laws with Avogadro's law gives the ideal gas equation PV = nRT. Understanding this single equation solves 90% of gas-law problems. In particular, the combined gas law, which handles changes between two states, is merely PV = nRT written for two states. The gas laws are used later in reacting-gas stoichiometry, partial pressures, and gas-collection experiments.",
    objectives: [
      "Apply Boyle's law (P₁V₁ = P₂V₂) and Charles's law (V₁/T₁ = V₂/T₂) to calculate changes in a gas's pressure, volume, and temperature",
      "Select the appropriate R units in the ideal gas equation PV = nRT and perform a calculation for one of the four variables",
      "Use the combined gas law (P₁V₁/T₁ = P₂V₂/T₂) to calculate a gas's state change between two conditions",
      "Use Dalton's law of partial pressures to calculate the total pressure of a gas mixture or the partial pressure of a component gas",
      "Explain the key assumptions of the kinetic molecular theory and predict the conditions under which a real gas deviates from ideal behavior",
    ],
    formulas: [
      "Boyle's law: P₁V₁ = P₂V₂ (constant temperature)",
      "Charles's law: V₁/T₁ = V₂/T₂ (constant pressure, T in Kelvin)",
      "Combined gas law: P₁V₁/T₁ = P₂V₂/T₂",
      "Ideal gas equation: PV = nRT  (R = 0.08206 L·atm/mol·K)",
      "Dalton's law of partial pressures: P_total = P₁ + P₂ + P₃ + …",
      "Kelvin conversion: T(K) = T(°C) + 273.15",
    ],
    sections: [
      {
        title: "Boyle's, Charles's, and the Combined Gas Law",
        subtitle: "Understanding the two-variable relationships intuitively, then handling three variables at once with the combined law",
        terms: [
          {
            term: "Boyle's law",
            def: "At constant temperature and moles, a gas's pressure (P) and volume (V) are inversely proportional: P₁V₁ = P₂V₂. Doubling the pressure halves the volume. Pressing a piston while a finger blocks a syringe to reduce its volume and raise the pressure is an everyday example. Graphically, P vs 1/V is a straight line and P vs V is a hyperbola.",
          },
          {
            term: "Charles's law",
            def: "At constant pressure and moles, a gas's volume (V) and absolute temperature (T, Kelvin) are directly proportional: V₁/T₁ = V₂/T₂. Doubling the temperature doubles the volume. You must use Kelvin (K); using Celsius (°C) directly gives a completely wrong value. At absolute zero (0 K = −273.15 °C) an ideal gas's volume becomes 0.",
          },
          {
            term: "Combined gas law",
            def: "Boyle's and Charles's laws merged into one: P₁V₁/T₁ = P₂V₂/T₂. It applies whenever moles are constant and one of the three variables (P, V, T) changes. When one variable is fixed, canceling that term recovers Boyle's or Charles's law. Pressure and volume can use any consistent units, but temperature must be in Kelvin.",
          },
          {
            term: "Dalton's law of partial pressures",
            def: "In a mixture of non-reacting gases, the total pressure equals the sum of the partial pressures of the component gases: P_total = P₁ + P₂ + …. Each component's partial pressure equals the pressure that gas would exert if it occupied the whole volume alone. It is frequently used when collecting a gas over water to subtract the water vapor pressure and find the pure gas's partial pressure.",
          },
        ],
        traps: [
          "Both Charles's law and the combined gas law require temperature to be converted to Kelvin (K). Writing 0 °C and 100 °C directly as 0 and 100 changes the ratio completely. Since K = °C + 273.15, 0 °C = 273.15 K and 100 °C = 373.15 K — the Kelvin ratio is about 1:1.37, but a Celsius calculation either divides by zero or gives an absurdly large ratio. The first checkpoint of every gas-law calculation is: 'did you convert temperature to Kelvin?'",
          "When finding the pressure of a gas collected by water displacement, beware of leaving out the water vapor pressure (P_H₂O). Partial pressure of the collected gas = atmospheric pressure (P_atm) − the water vapor pressure (P_H₂O) at that temperature. If you fail to subtract this, you record a value higher than the gas's actual partial pressure.",
        ],
        example:
          "If a gas that is 3.00 L at 25 °C and 2.00 atm is changed to 50 °C and 1.50 atm, what is the new volume? Use the combined gas law. First convert temperatures to Kelvin: T₁ = 298.15 K, T₂ = 323.15 K. Substitute: (2.00 atm × 3.00 L) / 298.15 K = (1.50 atm × V₂) / 323.15 K. V₂ = (2.00 × 3.00 × 323.15) / (298.15 × 1.50) = 1938.9 / 447.2 = 4.337 L ≈ 4.34 L. Check: pressure decreased (2.00→1.50) so volume increases, and temperature rose (298→323) so volume increases, so 4.34 L being larger than 3.00 L is the correct direction.",
      },
      {
        title: "The Ideal Gas Equation and Kinetic Molecular Theory",
        subtitle: "Handle the four variables of PV = nRT freely, and understand the limits of the ideal gas model",
        terms: [
          {
            term: "Ideal gas equation",
            def: "PV = nRT. P = pressure (atm), V = volume (L), n = moles (mol), R = gas constant (0.08206 L·atm/mol·K), T = absolute temperature (K). Knowing three of the four variables lets you find the fourth. The value of R depends on the units (in kPa units, R = 8.314 J/mol·K), so always check the units of P and V first.",
          },
          {
            term: "Kinetic molecular theory (KMT)",
            def: "A theoretical model describing ideal gases, with five key assumptions: ① gas particles are point masses with negligible volume; ② there are no attractive or repulsive forces between gas particles; ③ particles are in constant random motion; ④ particle collisions are perfectly elastic; ⑤ temperature is proportional to the average kinetic energy of the particles. Under conditions where these assumptions break down (high pressure, low temperature), real gases behave differently from ideal gases.",
          },
          {
            term: "Real gas",
            def: "The behavior of actual gases that deviates from the ideal-gas assumptions. At high pressure (compression) the particles' own volume cannot be ignored, and at low temperature intermolecular forces become hard to ignore. The van der Waals equation, (P + a·n²/V²)(V − nb) = nRT, accounts for these corrections. At the Honors Chemistry level it is enough to explain qualitatively under what conditions a gas differs from an ideal gas.",
          },
        ],
        traps: [
          "Mixing the units of R in the ideal gas equation is extremely common. When using pressure in atm and volume in L, use R = 0.08206 L·atm/mol·K; when using pressure in kPa and energy units (J), use R = 8.314 J/mol·K. If the exam gives pressure in mmHg or kPa, first convert to atm (1 atm = 760 mmHg = 101.3 kPa) or match the R units. Unit mismatch is the number-one cause of all gas-calculation errors.",
        ],
        example:
          "At 27 °C, 5.00 g of N₂ gas is in a 2.00 L container; find the pressure in atm. First the moles: n = 5.00 g ÷ 28.02 g/mol = 0.1785 mol. T = 27 + 273.15 = 300.15 K. PV = nRT → P = nRT/V = (0.1785 mol × 0.08206 L·atm/mol·K × 300.15 K) / 2.00 L = 4.397 / 2.00 = 2.20 atm.",
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
    unitName: "Gases & Solutions",
    title: "Solutions and Concentration — Solubility, Molarity, Dilution",
    subtitle: "The moment you quantify the relationship of solute, solvent, and solution, every aqueous calculation converges to M = mol/L",
    overview:
      "If the gas laws are the language of the gaseous state, molarity is the language of the aqueous solution. A solution is a mixture in which a solute is uniformly dissolved in a solvent, and concentration is its quantitative expression. The concentration unit used most often in Honors Chemistry is molarity (M, mol/L) — the moles of solute dissolved in 1 liter of solution. Knowing the concentration lets you calculate moles from volume alone, so every stoichiometric calculation of aqueous reactions — acid-base titration, precipitation reactions, electrochemistry — passes through molarity. Diluting a concentrated solution is handled by the single equation M₁V₁ = M₂V₂, because diluting does not change the moles of solute. Solubility is the maximum amount of solute that can dissolve in a solvent under given temperature and pressure, determined by temperature, pressure, and solute-solvent interactions.",
    objectives: [
      "Calculate molarity (M = mol solute / L solution), and find the moles or mass of solute from concentration and volume",
      "Apply the dilution formula M₁V₁ = M₂V₂ to calculate the concentration or volume before and after dilution",
      "Explain the factors affecting solubility (temperature, pressure, polarity), and distinguish saturated, unsaturated, and supersaturated solutions",
      "Explain the process of preparing a solution of given molarity step by step",
    ],
    formulas: [
      "Molarity: M = n (mol) / V (L)",
      "Moles of solute: n = M × V",
      "Dilution formula: M₁V₁ = M₂V₂",
      "Mass percent concentration: % = (mass of solute / mass of solution) × 100",
    ],
    sections: [
      {
        title: "Molarity and Solution Preparation",
        subtitle: "M = mol/L, the single key unit that connects all aqueous stoichiometry",
        terms: [
          {
            term: "Molarity (M)",
            def: "The moles of solute dissolved in 1 liter of solution: M = n/V (units: mol/L or mol/dm³). Example: a 1.00 M NaCl solution has 1.00 mol NaCl (58.44 g) dissolved in 1.00 L. Note that the volume is the final solution volume after the solute is added, not the volume of solvent alone. To make a solution, first dissolve the solute in solvent and then add solvent up to the desired final volume (using a volumetric flask).",
          },
          {
            term: "Dilution",
            def: "The process of lowering concentration by adding solvent to a concentrated solution. Because adding solvent does not change the moles of solute, M₁V₁ = M₂V₂ holds. When diluting concentrated sulfuric acid (H₂SO₄, 18 M) in the lab, always add acid slowly to water — pouring water into acid can cause violent boiling and splattering from rapid heat release. 'Acid to water' is both a safety rule and an exam point.",
          },
          {
            term: "Solubility",
            def: "The maximum amount of solute that can dissolve in a given amount of solvent at a specific temperature and pressure (usually expressed as g/100 g solvent or g/100 mL solvent). A solution that has reached solubility is saturated; less than that is unsaturated; more than saturation is supersaturated. The solubility of solid solutes mostly increases with rising temperature, while the solubility of gases increases at lower temperature and higher pressure (Henry's law).",
          },
          {
            term: "Saturated, unsaturated, supersaturated solution",
            def: "A saturated solution is one in which no more solute dissolves under the given conditions. An unsaturated solution can dissolve additional solute, and a supersaturated solution is an unstable state holding more than the saturation amount. Adding a small seed crystal to, or disturbing, a supersaturated solution causes the excess solute to crystallize all at once.",
          },
        ],
        traps: [
          "In molarity calculations, the error of giving the volume in mL and failing to convert to L is extremely common. Since M = mol/L, you must convert mL to L (÷1000). Example: 0.500 mol dissolved in 250 mL gives M = 0.500 mol / 0.250 L = 2.00 M, not 0.500 / 250 = 0.00200 M. Writing the units as you calculate prevents this mistake.",
          "In the dilution formula M₁V₁ = M₂V₂, V₂ is the 'total final volume of the solution,' not the 'volume of water added.' Example: to make 100 mL of 2.00 M solution into a final 500 mL, you add 400 mL more water. M₂ = (2.00 M × 0.100 L) / 0.500 L = 0.400 M — you must not add 500 mL of water to make 600 mL.",
        ],
        example:
          "38.0 g of NaOH (molar mass 40.00 g/mol) is dissolved in water to make a final 500.0 mL solution. Find this solution's molarity, and if 150.0 mL of it is taken and diluted to 1.00 L, what is the new concentration? Step 1: n(NaOH) = 38.0 / 40.00 = 0.950 mol. Step 2: M₁ = 0.950 mol / 0.500 L = 1.90 M. Step 3: dilution M₂ = M₁V₁/V₂ = (1.90 M × 0.150 L) / 1.00 L = 0.285 M.",
      },
      {
        title: "Factors Affecting Solubility",
        subtitle: "The principles by which polarity, temperature, and pressure determine solubility, and Henry's law",
        terms: [
          {
            term: "Polarity and solubility",
            def: "Dissolution follows the principle 'like dissolves like.' A polar solvent (e.g. water, H₂O) dissolves polar and ionic solutes well, while a nonpolar solvent (e.g. hexane, C₆H₁₄) dissolves nonpolar solutes well. The reason ionic compounds dissolve in water is hydration — the dipoles of water molecules surround and stabilize the ions.",
          },
          {
            term: "Henry's law",
            def: "The solubility of a gas is proportional to its partial pressure: C = k_H × P. The way a carbonated drink fizzes out CO₂ when the cap is opened is an example of Henry's law — as pressure drops, CO₂'s solubility falls sharply. Decompression sickness works by the same principle: at greater depth more N₂ dissolves in the blood, and surfacing too quickly causes the N₂ to bubble out.",
          },
          {
            term: "Effect of temperature on solubility",
            def: "The solubility of most solid solutes increases with rising temperature (endothermic dissolution). However, some substances (e.g. Ce₂(SO₄)₃) are exceptions whose solubility is inversely related to temperature. The solubility of gases, by contrast, decreases with rising temperature — air bubbles forming when water is heated are an example. A solubility curve graphs the change in solubility with temperature and is used to distinguish saturated and unsaturated regions.",
          },
        ],
        traps: [
          "Memorizing 'the solubility of solids always increases with temperature' misses the exceptions. Most do, but substances such as Ce₂(SO₄)₃ exist whose solubility actually decreases as temperature rises. Exams often give a solubility curve and have you read it directly, so practice reading the graph accurately. It is also frequently tested that the solubility of gases responds to temperature in the opposite direction from solids.",
        ],
        example: null,
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
    unitName: "Gases & Solutions",
    title: "Properties of Solutions — Electrolytes, Colligative Properties, Acids/Bases and pH",
    subtitle: "The moment a solute dissolves, charge and particle count change, and that change governs boiling point, freezing point, and osmotic pressure",
    overview:
      "Dissolving something in a solution does more than just create a concentration. When an electrolyte dissolves in water, it splits into ions and lets electricity flow; when the number of solute particles increases, the solvent's freezing point drops and its boiling point rises. Properties determined not by the identity of the solute but by the number of dissolved particles are called colligative properties. Boiling point elevation, freezing point depression, and osmotic pressure are the main ones. And acids and bases, a core topic of aqueous chemistry, are explained by the transfer of H⁺ (protons). The Arrhenius definition, the Brønsted-Lowry definition, the distinction between strong and weak acids, and the pH scale that expresses the acidity of a solution form the basis for the later units on acid-base equilibria, titration, and buffers. pH = −log[H⁺] is a calculation you must master in Honors Chemistry.",
    objectives: [
      "Distinguish strong electrolytes, weak electrolytes, and nonelectrolytes, and represent the ionization and dissociation processes with chemical equations",
      "Calculate boiling point elevation (ΔT_b = i·K_b·m) and freezing point depression (ΔT_f = i·K_f·m) and explain the meaning of the van't Hoff factor (i)",
      "Distinguish acids and bases using the Arrhenius and Brønsted-Lowry definitions and identify conjugate acid-base pairs",
      "Calculate the pH of strong acids/bases from [H⁺] or [OH⁻], and use the relation pH + pOH = 14 to judge whether a solution is acidic, neutral, or basic",
    ],
    formulas: [
      "Boiling point elevation: ΔT_b = i · K_b · m",
      "Freezing point depression: ΔT_f = i · K_f · m",
      "Osmotic pressure: π = i · M · R · T",
      "pH = −log[H⁺]",
      "pOH = −log[OH⁻]",
      "pH + pOH = 14 (25 °C)",
      "Ion product of water: K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (25 °C)",
    ],
    sections: [
      {
        title: "Electrolytes and Colligative Properties",
        subtitle: "The principle by which the number of dissolved particles governs the physical properties of a solution",
        terms: [
          {
            term: "Electrolyte & nonelectrolyte",
            def: "An electrolyte is a substance that dissolves in water to produce ions and conduct electricity. A strong electrolyte ionizes completely in water (NaCl, HCl, KOH, etc.), while a weak electrolyte ionizes partially (CH₃COOH, NH₃). A nonelectrolyte does not ionize and so does not conduct electricity (glucose C₆H₁₂O₆, ethanol C₂H₅OH). Whether a substance is an electrolyte determines the van't Hoff factor i in colligative-property calculations.",
          },
          {
            term: "Colligative properties",
            def: "Physical properties of a solution that depend only on the number of dissolved particles (concentration), regardless of the solute's identity. They include boiling point elevation (ΔT_b = i·K_b·m), freezing point depression (ΔT_f = i·K_f·m), vapor pressure lowering, and osmotic pressure (π = i·M·R·T). Here m = molality (mol solute/kg solvent) and i = the van't Hoff factor.",
          },
          {
            term: "Van't Hoff factor (i)",
            def: "The number of particles produced when one solute unit dissolves. Nonelectrolytes (glucose, etc.) have i = 1; NaCl (Na⁺ + Cl⁻) ideally has i = 2; CaCl₂ (Ca²⁺ + 2Cl⁻) has i = 3. In reality, ion pairing makes i slightly smaller than the theoretical value in concentrated strong-electrolyte solutions. Because it reflects whether a solute is an electrolyte in colligative calculations, treating NaCl as a nonelectrolyte with i = 1 halves the value — an error.",
          },
          {
            term: "Molality (m)",
            def: "The moles of solute dissolved per kilogram of solvent: m = n(mol) / kg(solvent). The reason colligative calculations use molality instead of molarity (M, mol/L) is that the mass of solvent does not change with temperature (volume changes due to thermal expansion). Distinguish it from molarity by noting that the denominator is the mass of solvent, not the volume of solution.",
          },
        ],
        traps: [
          "The most common error in boiling-point-elevation and freezing-point-depression calculations is setting the van't Hoff factor (i) to 1. NaCl has i = 2, CaCl₂ has i = 3. For example, the freezing point depression of 0.100 m CaCl₂ with K_f(water) = 1.86 °C·kg/mol is ΔT_f = 3 × 1.86 × 0.100 = 0.558 °C, not 0.186 °C. Whenever you see an electrolyte solute, first ask 'what is i?'",
          "Don't confuse molality (m) with molarity (M). Molarity is based on solution volume (L); molality is based on solvent mass (kg). In the colligative formula (ΔT = i·K·m), m must be molality. In dilute aqueous solutions 1 kg solvent ≈ 1 L solution so M ≈ m, but in concentrated solutions or solvents other than water they differ greatly.",
        ],
        example:
          "What is the freezing point of a 0.200 m NaCl aqueous solution? (K_f of water = 1.86 °C·kg/mol.) NaCl is a strong electrolyte, so i = 2. ΔT_f = i × K_f × m = 2 × 1.86 × 0.200 = 0.744 °C. Freezing point = 0 °C − 0.744 °C = −0.744 °C. A glucose (i = 1) solution of the same concentration would give ΔT_f = 0.372 °C, so its freezing point = −0.372 °C, about half as much.",
      },
      {
        title: "Acid-Base Definitions and pH",
        subtitle: "Understand the difference between the Arrhenius and Brønsted-Lowry definitions and calculate the pH of strong acid/base solutions",
        terms: [
          {
            term: "Acid-base definitions",
            def: "Arrhenius definition: an acid releases H⁺ (hydrogen ions) in water, and a base releases OH⁻ (hydroxide ions). Brønsted-Lowry definition: an acid is a proton donor (gives H⁺) and a base is a proton acceptor (receives H⁺). The Brønsted-Lowry definition is more comprehensive because it can describe reactions outside aqueous solution. An acid-base pair that exchanges H⁺ is called a conjugate acid-base pair; when an acid loses H⁺ it becomes its conjugate base.",
          },
          {
            term: "Strong acid & weak acid",
            def: "A strong acid ionizes completely in aqueous solution: HCl → H⁺ + Cl⁻. The six main strong acids: HCl, HBr, HI, HNO₃, H₂SO₄ (first ionization), HClO₄. A weak acid ionizes partially (CH₃COOH ⇌ H⁺ + CH₃COO⁻), and the degree of ionization is expressed by the acid ionization constant Ka. For a strong acid, [H⁺] = the initial concentration, so pH calculation is direct; for a weak acid, Ka and an equilibrium calculation are required.",
          },
          {
            term: "pH and pOH",
            def: "pH = −log[H⁺] is the scale expressing the acidity of an aqueous solution. In a neutral aqueous solution at 25 °C, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, pH = 7. pH < 7 is acidic, pH > 7 is basic. pOH = −log[OH⁻] and pH + pOH = 14 (25 °C). For a 0.010 M strong acid HCl, [H⁺] = 0.010 M, pH = −log(0.010) = 2.00. A difference of 1 pH unit means a 10-fold difference in [H⁺].",
          },
        ],
        traps: [
          "The most common error in pH calculations is assuming a weak acid/base ionizes completely like a strong acid/base. CH₃COOH (acetic acid) is a weak acid, so the [H⁺] of a 0.10 M solution is not 0.10 M but must be found by an equilibrium calculation using Ka. In Honors Chemistry, memorize the six strong acids and the strong bases (group 1 and 2 metal hydroxides), and treat everything else as weak acids/bases.",
          "The relation pH + pOH = 14 is exact only at 25 °C. If the temperature changes, the ion product of water K_w changes, so this sum may not be 14. Also, saying that a pH 2 solution has 'twice as much H⁺' as a pH 4 solution is wrong — the pH scale is logarithmic, so a pH 2 solution's [H⁺] is 100 times that of a pH 4 solution.",
        ],
        example:
          "Find the pH of a 0.050 M HCl solution, and from that pH find [OH⁻]. HCl is a strong acid, so it ionizes completely: [H⁺] = 0.050 M. pH = −log(0.050) = −log(5.0 × 10⁻²) = −(log 5.0 + log 10⁻²) = −(0.699 − 2) = 1.30. pOH = 14 − 1.30 = 12.70. [OH⁻] = 10⁻¹²·⁷⁰ = 2.0 × 10⁻¹³ M. Check: [H⁺][OH⁻] = (0.050)(2.0 × 10⁻¹³) = 1.0 × 10⁻¹⁴ = K_w ✓.",
      },
    ],
  },
];
