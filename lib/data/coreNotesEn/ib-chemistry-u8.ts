/**
 * Core Notes English version — IB Chemistry Unit 8 (Acids & Bases).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U8_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u8-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 8,
    lessonNum: 1,
    unitName: "Acids & Bases",
    title: "Brønsted-Lowry Theory — Acids and Bases as a 'Proton Give-and-Take' Relationship",
    subtitle: "Donate H⁺ and you are an acid; accept H⁺ and you are a base — understanding conjugate acid-base pairs solves half of IB's reaction equations",
    overview:
      "The Arrhenius definition you learned in high school limited acids to 'substances that release H⁺' and bases to 'substances that release OH⁻.' But this definition struggles to explain why NH₃ acts as a base — NH₃ does not release OH⁻. In 1923, Brønsted of Denmark and Lowry of Britain simultaneously published the same idea: 'an acid is a particle that donates a proton (H⁺), and a base is a particle that accepts a proton.' This is the Brønsted-Lowry theory. From this viewpoint, in the reaction HCl + H₂O → H₃O⁺ + Cl⁻, HCl gives H⁺ to H₂O, so it is the acid (proton donor), while H₂O accepts H⁺ to become H₃O⁺, so it is the base (proton acceptor). Meanwhile, substances such as H₂O and HCO₃⁻ that can both give and accept H⁺ depending on conditions are called amphiprotic substances. In this lesson we will completely organise the Brønsted-Lowry definition, conjugate acid-base pairs, and the concept of amphiprotic substances at the IB Paper 1 and 2 level. This concept forms the backbone of the whole of Unit 8, so once you have a firm grip on it, neither pH calculations nor titrations will shake you.",
    objectives: [
      "Define an acid as a 'proton donor' and a base as a 'proton acceptor' according to the Brønsted-Lowry definition, and correctly identify acids and bases in a given reaction equation",
      "Identify the conjugate acid-base pairs in a Brønsted-Lowry reaction and apply the relationships 'conjugate acid = base + H⁺' and 'conjugate base = acid − H⁺'",
      "Explain, with reaction equations, that amphiprotic substances (H₂O, HCO₃⁻, HSO₄⁻, etc.) can act as either an acid or a base",
      "Describe the difference between the Arrhenius and Brønsted-Lowry definitions, and explain that the Brønsted-Lowry definition is broader because it includes non-OH⁻ bases such as NH₃",
    ],
    formulas: [
      "Brønsted-Lowry acid: H⁺ donor (proton donor)",
      "Brønsted-Lowry base: H⁺ acceptor (proton acceptor)",
      "Conjugate acid-base pair: acid ⇌ H⁺ + conjugate base  /  base + H⁺ ⇌ conjugate acid",
    ],
    sections: [
      {
        title: "The Brønsted-Lowry Definition and Conjugate Acid-Base Pairs",
        subtitle: "The instant you hand over H⁺ you are an acid; the instant you receive H⁺ you are a base — and you must find the acid and base of the reverse reaction too",
        terms: [
          {
            term: "Brønsted-Lowry Acid and Base",
            def: "Acid: a particle that donates a proton (H⁺) to another particle in a reaction. Examples: HCl, H₂SO₄, CH₃COOH, H₂O (when acting as an acid). Base: a particle that accepts a proton (H⁺) in a reaction. Examples: NH₃, H₂O (when acting as a base), OH⁻, HCO₃⁻ (when acting as a base). Key point: in the Brønsted-Lowry definition, acid and base are not absolute properties but relative roles determined by the reaction partner. The same substance (e.g., H₂O, HCO₃⁻) can act as an acid in one reaction and a base in another.",
          },
          {
            term: "Conjugate Acid-Base Pair",
            def: "In a Brønsted-Lowry reaction, the two particles that interconvert by giving and accepting one H⁺ are called a conjugate acid-base pair. Rule: when an acid loses H⁺ it becomes that acid's conjugate base, and when a base gains H⁺ it becomes that base's conjugate acid. Example: HCl (acid) + H₂O (base) → H₃O⁺ (conjugate acid) + Cl⁻ (conjugate base). Conjugate acid-base pair 1: HCl / Cl⁻. Conjugate acid-base pair 2: H₃O⁺ / H₂O. Another example: NH₃ (base) + H₂O (acid) ⇌ NH₄⁺ (conjugate acid) + OH⁻ (conjugate base). Conjugate acid-base pair 1: NH₄⁺ / NH₃. Conjugate acid-base pair 2: H₂O / OH⁻. 'Write all the conjugate acid-base pairs in the reaction equation' is a staple question on IB Paper 2.",
          },
          {
            term: "Amphiprotic Substance",
            def: "A substance that can both give H⁺ (acting as an acid) and accept H⁺ (acting as a base) depending on conditions is called an amphiprotic substance. Representative examples: ① H₂O: when reacting with NH₃ it gives H⁺ and acts as an acid (H₂O → OH⁻); when reacting with HCl it accepts H⁺ and acts as a base (H₂O → H₃O⁺). ② HCO₃⁻: when reacting with a strong acid it accepts H⁺ to become H₂CO₃, so it is a base; when reacting with a strong base it gives H⁺ to become CO₃²⁻, so it is an acid. ③ HSO₄⁻: likewise amphiprotic. In IB SL, the amphiprotic nature of H₂O is the most frequently examined. Do not confuse amphiprotic and amphoteric — amphiprotic refers to the context of H⁺ transfer (Brønsted-Lowry), while amphoteric refers to broader acid-base behaviour (reacting as both an acid and a base). IB exams mostly require amphiprotic.",
          },
        ],
        traps: [
          "If you forget that a conjugate acid-base pair must differ by only 'one H⁺,' you will get it wrong. The conjugate base of HCl is Cl⁻, not H₂Cl⁺. The conjugate acid of NH₃ is NH₄⁺, not N₂H₄. When writing pairs, always check that there is only a difference of one H atom and one positive charge. Misidentifying a conjugate acid or conjugate base on IB Paper 2 produces a chain of wrong answers.",
          "H₂O can be both an acid and a base, so you must judge its role by looking at the reaction partner. In HCl + H₂O → H₃O⁺ + Cl⁻, H₂O is a base; in NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, H₂O is an acid. If you memorise 'water is always a base,' you will certainly get it wrong on IB Paper 1.",
        ],
        example:
          "Example of finding conjugate acid-base pairs (IB Paper 2 type): For the reaction CH₃COOH(aq) + H₂O(l) ⇌ CH₃COO⁻(aq) + H₃O⁺(aq), write the two conjugate acid-base pairs. Solution: CH₃COOH gives H⁺ to H₂O, so it is the acid → its conjugate base is CH₃COO⁻ (pair 1: CH₃COOH / CH₃COO⁻). H₂O accepts H⁺ to become H₃O⁺, so it is the base → its conjugate acid is H₃O⁺ (pair 2: H₃O⁺ / H₂O). Check with the reverse reaction too: CH₃COO⁻ (base) accepts H⁺ from H₃O⁺ (acid) to become CH₃COOH — a perfect match.",
      },
      {
        title: "Strong/Weak Acids and Strong/Weak Bases — Strength and Concentration Are Completely Different Concepts",
        subtitle: "Fully ionised = strong; only partially ionised = weak — being concentrated does not make an acid strong",
        terms: [
          {
            term: "Strong Acid and Weak Acid",
            def: "Strong acid: an acid that releases H⁺ (or H₃O⁺) by ionising essentially 100% in aqueous solution. The ionisation reaction is effectively irreversible (→). Strong acids to remember for IB: HCl, HBr, HI, HNO₃, H₂SO₄ (first ionisation), HClO₄. Weak acid: an acid that ionises only partially in aqueous solution. The ionisation equilibrium (⇌) lies toward the reactant side (Ka < 1). Examples: CH₃COOH, H₂CO₃, HF, H₃PO₄, HCN. In a solution of a weak acid, un-ionised molecules and ions coexist. The greater the degree of ionisation, the stronger the acid. 'Which of the following is a weak acid?' is a staple IB Paper 1 question — be sure to remember that HF is a weak acid (many students miss that HF is the only weak acid among the hydrohalic acids).",
          },
          {
            term: "Strong Base and Weak Base",
            def: "Strong base: a base that fully dissociates to give OH⁻ in aqueous solution, or accepts H⁺ from H₂O essentially 100% to generate OH⁻. Examples: NaOH, KOH, Ca(OH)₂, Ba(OH)₂. Weak base: a base that ionises only partially in aqueous solution. The ionisation equilibrium (⇌) lies toward the reactant side (Kb < 1). Representative example: NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq). In a solution of a weak base, most of the un-ionised molecules remain. The list of strong bases in IB is short — it consists mainly of Group 1 and 2 metal hydroxides, with most others treated as weak bases.",
          },
        ],
        traps: [
          "Confusing strong/weak acid (strength) with concentrated/dilute acid (concentration) is the most common error on IB exams. 'Strong acid' refers to the degree of ionisation, while 'concentrated acid' refers to the number of moles of solute per unit volume (concentration). Concentrated CH₃COOH has a high concentration but is still a weak acid. Dilute HCl has a low concentration but is still a strong acid. Swapping these two terms in an IB Paper 2 written answer is an instant loss of marks.",
          "HF, because of the high electronegativity of F, intuitively 'looks like it should be a strong acid,' but in reality it is a weak acid (low degree of ionisation). Unlike HCl, HBr, and HI, HF does not ionise completely in aqueous solution. Choosing HF in a 'select the strong acid' question on IB Paper 1 is a wrong answer.",
        ],
        example:
          "Distinguishing strength from concentration experimentally. Compare equal 1.0 mol dm⁻³ solutions of HCl (strong acid) and CH₃COOH (weak acid) of identical concentration. HCl ionises fully, HCl → H⁺ + Cl⁻, so [H⁺] ≈ 1.0 mol dm⁻³ and the pH ≈ 0, whereas CH₃COOH ionises only about 0.4 %, giving [H⁺] ≈ 4 × 10⁻³ mol dm⁻³ and pH ≈ 2.4, even though the two solutions have the same concentration. Adding magnesium to each shows the difference directly: the HCl fizzes vigorously because of its high [H⁺], while the CH₃COOH reacts noticeably more slowly. This proves that 'strong' refers to the degree of ionisation, not to how concentrated the acid is — a dilute HCl is still strong and a concentrated ethanoic acid is still weak.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u8-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 8,
    lessonNum: 2,
    unitName: "Acids & Bases",
    title: "pH·pOH·Kw — The Technique of Expressing the H⁺ Concentration in Solution as a Single Number",
    subtitle: "pH = −log[H⁺], Kw = [H⁺][OH⁻] = 10⁻¹⁴, pH + pOH = 14 — every aqueous acid-base calculation starts from these three lines",
    overview:
      "In 1909, the Danish biochemist Søren Sørensen, while measuring acidity during beer fermentation, introduced the concept of pH to handle awkward small numbers (e.g., [H⁺] = 0.000001 mol dm⁻³). Defining pH = −log₁₀[H⁺] makes the pH of pure water, where [H⁺] = 10⁻⁷ mol dm⁻³, equal to 7; the more acidic the solution (higher H⁺ concentration), the smaller the pH, and the more basic, the larger the pH. In pure water at 25°C, [H⁺] = [OH⁻] = 10⁻⁷ mol dm⁻³, and this product (Kw = [H⁺][OH⁻] = 10⁻¹⁴) is the ionic product of water. Because Kw is always 10⁻¹⁴ at constant temperature (25°C), knowing [H⁺] lets you find [OH⁻] immediately, and the sum of pH and pOH is always 14. In this lesson we will completely organise, at IB exam level, the definitions and calculations of pH and pOH, conversion between [H⁺] and [OH⁻] using Kw, the pH calculations of strong acid and strong base solutions, and even the environmental context of acid deposition.",
    objectives: [
      "Use the definitions pH = −log[H⁺] and pOH = −log[OH⁻] to calculate pH and pOH from a given [H⁺] or [OH⁻], and conversely find [H⁺] from pH",
      "Use the ionic product of water Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (25°C) to find [OH⁻] from [H⁺], and apply the relationship pH + pOH = 14",
      "Calculate the pH of strong acid and strong base solutions under the assumption of complete ionisation, and check that the result is reasonable (acidic < 7, basic > 7, neutral = 7)",
      "Write the causative substances of acid deposition (SO₂, NO₂, CO₂) and the relevant reaction equations, and describe the effects of acid rain (pH < 5.6) on ecosystems and buildings",
    ],
    formulas: [
      "pH = −log[H⁺]",
      "pOH = −log[OH⁻]",
      "pH + pOH = 14  (25°C)",
      "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴  (25°C)",
      "[H⁺] = 10⁻ᵖᴴ",
    ],
    sections: [
      {
        title: "pH·pOH·Kw — Definitions and Calculations",
        subtitle: "Handling logs is more about concepts than the calculator — always remember that a difference of 1 in pH is a 10-fold difference in H⁺ concentration",
        terms: [
          {
            term: "Definition and Calculation of pH",
            def: "pH = −log₁₀[H⁺(aq)]. Here [H⁺] is the hydrogen ion (proton) concentration in mol dm⁻³. Because it is a logarithmic scale, a decrease of 1 in pH means a 10-fold increase in [H⁺]. At 25°C: pH < 7 → acidic, pH = 7 → neutral, pH > 7 → basic/alkaline. Reverse conversion: [H⁺] = 10⁻ᵖᴴ. Strong acid calculation example: 0.010 mol dm⁻³ HCl solution → HCl is a strong acid, so [H⁺] = 0.010 = 10⁻² mol dm⁻³ → pH = −log(10⁻²) = 2. In IB, the number of decimal places matters: the integer part of the log (the characteristic) is the order of magnitude of the concentration, and only the decimal part (the mantissa) gives the significant figures, so pH 2.30 means 2 significant figures.",
          },
          {
            term: "Ionic Product of Water Kw",
            def: "Pure water also self-ionises to a very small extent: H₂O(l) ⇌ H⁺(aq) + OH⁻(aq). The equilibrium constant of this equilibrium is called Kw, and at 25°C, Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (mol dm⁻³)². Kw changes with temperature — as the temperature rises, Kw increases (self-ionisation is endothermic). Therefore at high temperatures the pH of a neutral solution can be lower than 7 (neutral even though pH ≠ 7). In IB SL, calculations use 25°C, Kw = 10⁻¹⁴ as the reference. Using Kw, when you know [H⁺] you can immediately find [OH⁻] = Kw / [H⁺].",
          },
          {
            term: "pOH and the Relationship pH + pOH = 14",
            def: "pOH is defined as −log[OH⁻]. Taking −log of both sides of Kw = [H⁺][OH⁻] = 10⁻¹⁴ gives: pH + pOH = 14 (25°C). Using this relationship, you can calculate the pH of a strong base solution. Example: 0.10 mol dm⁻³ NaOH → NaOH fully dissociates → [OH⁻] = 0.10 mol dm⁻³ → pOH = −log(0.10) = 1 → pH = 14 − 1 = 13. Because IB exams frequently ask for a pH calculation via the pOH route, you must be comfortable with both routes (direct [H⁺] calculation, or going through pOH).",
          },
          {
            term: "Acid Deposition",
            def: "Acid deposition is the phenomenon of atmospheric acidic substances falling to the surface as rain, snow, fog, or dry dust. Normal rainwater reacts with atmospheric CO₂ to give pH ≈ 5.6 (forming H₂CO₃). Acid rain is defined as pH < 5.6. Main causative substances: ① SO₂: fossil fuels and volcanoes → oxidised to SO₃ in the atmosphere → produces H₂SO₄. ② NO₂: vehicles and power stations → produces HNO₃ in the atmosphere. Relevant equations: SO₂(g) + H₂O(l) → H₂SO₃(aq) (or 2SO₂ + O₂ → 2SO₃ → H₂SO₄). Damage: soil acidification (leaching of Al³⁺ and heavy metals), harm to aquatic ecosystems, erosion of marble and limestone buildings (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂).",
          },
        ],
        traps: [
          "At high temperatures, the pH of a neutral solution may not be 7. At 37°C (body temperature) Kw ≈ 2.4 × 10⁻¹⁴, so neutral pH ≈ 6.8. If IB Paper 2 asks 'is a solution with pH 6.8 at 37°C acidic?', the correct answer is 'No, it is neutral — because [H⁺] = [OH⁻].' The formula 'neutral = pH 7' holds only at 25°C.",
          "If a strong acid dilution calculation gives a result of pH 7 or above, you must always recheck it. Example: calculating the pH of 10⁻⁸ mol dm⁻³ HCl as −log(10⁻⁸) = 8 is wrong. At this concentration the self-ionisation of water ([H⁺] from H₂O ≈ 10⁻⁷) is greater than the contribution from HCl, so the accurate [H⁺] is slightly greater than 10⁻⁷ and the pH is slightly below 7 (about 6.98). In IB SL, the common-sense check that 'the pH of an acid solution is always below 7' is important.",
        ],
        example:
          "Example of strong acid/strong base pH calculation (IB Paper 2 type): ① Find the pH of 0.050 mol dm⁻³ H₂SO₄(aq). (Assume H₂SO₄ is a diprotic strong acid that ionises completely.) Solution: H₂SO₄ → 2H⁺ + SO₄²⁻ → [H⁺] = 2 × 0.050 = 0.100 mol dm⁻³ → pH = −log(0.100) = 1.00. ② Find the pH of 0.025 mol dm⁻³ Ba(OH)₂(aq). Solution: Ba(OH)₂ → Ba²⁺ + 2OH⁻ → [OH⁻] = 2 × 0.025 = 0.050 mol dm⁻³ → pOH = −log(0.050) = 1.30 → pH = 14 − 1.30 = 12.70. Because in both calculations the IB mark scheme is 'including units and significant figures,' develop the habit of stating the final answer together with mol dm⁻³.",
      },
      {
        title: "Weak Acid/Weak Base Ka·Kb and Ionisation Equilibrium",
        subtitle: "A weak acid 'ionises only partially' — write the Ka expression like Kc and calculate using an ICE table",
        terms: [
          {
            term: "Acid Dissociation Constant Ka",
            def: "Ionisation equilibrium of weak acid HA: HA(aq) ⇌ H⁺(aq) + A⁻(aq). Ka = [H⁺][A⁻] / [HA]. The larger Ka, the higher the degree of ionisation and the stronger the acid. Example: CH₃COOH (Ka = 1.8 × 10⁻⁵) < HF (Ka = 6.8 × 10⁻⁴) < H₂SO₃ (Ka₁ = 1.5 × 10⁻²). It is also expressed as pKa = −log(Ka), where a smaller pKa means a stronger acid. When calculating Ka, H₂O (pure liquid) is excluded from the denominator, just as in the Kc expression. In IB HL, pH calculations using Ka (applying an ICE table or solving a quadratic equation) are examined.",
          },
          {
            term: "Relationship Ka × Kb = Kw",
            def: "For a conjugate acid-base pair, the relationship Ka × Kb = Kw = 10⁻¹⁴ (25°C) holds. Example: NH₄⁺(Ka) × NH₃(Kb) = 10⁻¹⁴. This relationship is important at IB HL level. The conjugate base of a strong acid (e.g., Cl⁻) has an extremely small Kb because Ka(HCl) is very large — so Cl⁻ effectively does not act as a base. Conversely, the conjugate base of a weak acid (e.g., CH₃COO⁻) has a significant Kb and, through hydrolysis, makes the solution basic.",
          },
        ],
        traps: [
          "In Ka calculations, you must judge whether you can neglect the change x from the initial concentration on the grounds that a weak acid's degree of ionisation is small. The '5% rule': if x / [HA]₀ × 100% < 5%, it can be neglected. Otherwise you must solve the quadratic equation. Omitting this judgement on IB HL Paper 2 results in a loss of partial marks.",
        ],
        example:
          "Calculating the pH of a weak acid using Ka and an ICE table. Find the pH of 0.100 mol dm⁻³ CH₃COOH, given Ka = 1.8 × 10⁻⁵. For CH₃COOH ⇌ H⁺ + CH₃COO⁻, the ICE table gives equilibrium [H⁺] = [CH₃COO⁻] = x and [CH₃COOH] = 0.100 − x, so Ka = x² / (0.100 − x). Because the acid is weak, assume 0.100 − x ≈ 0.100, giving x² = 1.8 × 10⁻⁵ × 0.100 = 1.8 × 10⁻⁶, so x = [H⁺] = 1.34 × 10⁻³ mol dm⁻³ and pH = −log(1.34 × 10⁻³) = 2.87. Check the approximation: x / 0.100 × 100 % = 1.3 % < 5 %, so neglecting x was valid and the quadratic was unnecessary.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u8-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 8,
    lessonNum: 3,
    unitName: "Acids & Bases",
    title: "Acid-Base Titration and Indicators — The Quantitative Relationship of Neutralisation and Reading the pH Curve",
    subtitle: "At the equivalence point the moles of acid and base exactly meet — to score full marks you must also know which indicator to use and the shape of the pH curve",
    overview:
      "An acid-base titration is a technique for accurately measuring the concentration of one solution using another solution of known concentration (a standard solution). As you add acid (or base) drop by drop from a burette, you reach a point where the moles of acid and base become exactly equal — the equivalence point. At this point the change in pH occurs most sharply, and an indicator works correctly when its colour change range falls within that region of rapid change. The equivalence point of a strong acid–strong base titration is pH = 7, but the equivalence point of a weak acid–strong base titration is pH > 7 (hydrolysis of the conjugate base), and that of a strong acid–weak base titration is pH < 7. Therefore you must choose a different appropriate indicator for each type of titration. The shape of the pH curve (titration curve) also differs by titration type — to answer graph-interpretation questions on IB Paper 2, you must accurately read the gentle S-shaped region (buffer zone), the steep vertical region, the equivalence point, and so on. In this lesson we will completely organise the quantitative relationship of neutralisation, titration calculations, pH curve interpretation, and the principles of indicator selection.",
    objectives: [
      "Apply the relationship n(acid) × c(acid) × V(acid) = n(base) × c(base) × V(base) (n is the number of protons) in an acid-base neutralisation reaction to calculate concentration or volume",
      "Explain the differences between strong acid–strong base, weak acid–strong base, and strong acid–weak base titration curves (equivalence point pH, presence or absence of an S-shaped buffer region, range of the vertical region), and identify the equivalence point and half-equivalence point on each curve",
      "Use the fact that an indicator is itself a weak acid (or weak base) to explain its colour change range (pKₐ ± 1), and give the rationale for choosing an indicator appropriate to the titration type (phenolphthalein, methyl orange, etc.)",
      "Explain that a buffer solution is made from a mixture of a weak acid and its conjugate base (or a weak base and its conjugate acid), and explain the principle by which it resists changes in pH from a Brønsted-Lowry viewpoint",
    ],
    formulas: [
      "Neutralisation titration calculation: c₁V₁ / n₁  =  c₂V₂ / n₂  (n = number of H⁺ or OH⁻ per molecule)",
      "Equivalence point pH: strong acid–strong base = 7,  weak acid–strong base > 7,  strong acid–weak base < 7",
      "Indicator colour change range: pKₐ(indicator) ± 1",
      "At the half-equivalence point pH = pKₐ(weak acid)  [from Henderson-Hasselbalch when [HA] = [A⁻]]",
    ],
    sections: [
      {
        title: "Titration Calculations and pH Curve Interpretation",
        subtitle: "The three regions of a titration curve — the gentle region, the vertical jump, and after the equivalence point — you must read each one's meaning accurately",
        terms: [
          {
            term: "Neutralisation and Titration Calculation",
            def: "Neutralisation reaction of strong acid HA and strong base BOH: H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH = −57 kJ mol⁻¹ (standard enthalpy of neutralisation). Titration calculation formula: at the equivalence point n(H⁺) = n(OH⁻), that is c(acid) × V(acid) × z(acid) = c(base) × V(base) × z(base). Here z is the number of H⁺ (or OH⁻) released per molecule (e.g., H₂SO₄ has z=2, HCl has z=1). Practical calculation steps: ① calculate n(mol) = c × V(dm³) from the given c and V → ② apply the stoichiometric ratio → ③ calculate the unknown c or V. In IB Paper 2 titration calculation problems, you must always make the units consistent (dm³ vs cm³) and convert cm³ to dm³ by ÷1000.",
          },
          {
            term: "Titration Curves — Strong Acid–Strong Base vs Weak Acid–Strong Base",
            def: "Strong acid–strong base titration curve (e.g., HCl vs NaOH): equivalence point pH = 7. Near the equivalence point the pH changes almost vertically over a range of about 3 to 11. There is no buffer region (because both are strong). Weak acid–strong base titration curve (e.g., CH₃COOH vs NaOH): the pH starts higher than in a strong acid titration (because the weak acid has a lower [H⁺]). At the half-equivalence point [HA] = [A⁻] → pH = pKₐ. A buffer region appears. The equivalence point pH > 7 (because of hydrolysis of CH₃COO⁻). The vertical region is shorter and narrower than in the strong acid–strong base case. Strong acid–weak base titration curve (e.g., HCl vs NH₃): equivalence point pH < 7 (hydrolysis of NH₄⁺). On IB Paper 2, sketching the curve and marking the equivalence point is a staple written-response question.",
          },
          {
            term: "Indicator Selection",
            def: "An indicator is itself a weak acid (HIn) whose ionised form (In⁻) and molecular form (HIn) have different colours: HIn ⇌ H⁺ + In⁻ (colour A) (colour B). Colour change range: pH ≈ pKₐ(HIn) ± 1. In a titration, the indicator's colour change range must fall within the vertical region of the titration curve (the region of rapid pH change) for the endpoint to coincide with the equivalence point. Selection criteria: ① Strong acid–strong base: both phenolphthalein (pKₐ ≈ 9, colour change pH 8.2–10.0) and methyl orange (pKₐ ≈ 4, colour change pH 3.1–4.4) are usable — because the vertical region is wide. ② Weak acid–strong base: use phenolphthalein (because the vertical region is above pH 7). Methyl orange is unsuitable. ③ Strong acid–weak base: use methyl orange (because the vertical region is below pH 7). Phenolphthalein is unsuitable.",
          },
        ],
        traps: [
          "Writing 'equivalence point pH = 7' in a weak acid–strong base titration is wrong. At the equivalence point the conjugate base produced (e.g., CH₃COO⁻) hydrolyses to generate OH⁻, so the equivalence point pH > 7. Conversely, in a strong acid–weak base titration, ionisation of the conjugate acid produced (e.g., NH₄⁺) makes the equivalence point pH < 7. 'Equivalence point = pH 7 for all titrations' is a special case that holds only for strong acid–strong base.",
          "You must not use endpoint and equivalence point with the same meaning. The equivalence point is the theoretical point at which the moles of acid and base become exactly equal, while the endpoint is the experimentally observed point at which the indicator changes colour. Ideally the two points should coincide, but if you choose the wrong indicator the endpoint differs from the equivalence point and a titration error arises. On IB Paper 2, a statement distinguishing these two is included in the mark scheme.",
        ],
        example:
          "Titration calculation example (IB Paper 2 type): 25.0 cm³ of CH₃COOH solution was titrated with 0.100 mol dm⁻³ NaOH standard solution, reaching the equivalence point (phenolphthalein colour change) at 20.0 cm³. Find the concentration of CH₃COOH. Solution: n(NaOH) = c × V = 0.100 mol dm⁻³ × (20.0/1000) dm³ = 0.00200 mol. Neutralisation reaction: CH₃COOH + NaOH → CH₃COONa + H₂O, a 1:1 mole ratio, so n(CH₃COOH) = 0.00200 mol. c(CH₃COOH) = n / V = 0.00200 mol / (25.0/1000) dm³ = 0.0800 mol dm⁻³. Additional question: what is a suitable indicator for this titration? → Phenolphthalein (because it is a weak acid–strong base titration, the equivalence point pH > 7, and the phenolphthalein colour change range 8.2–10.0 falls within the vertical region). Methyl orange is unsuitable.",
      },
      {
        title: "Buffer Solutions — Systems That Resist Changes in pH",
        subtitle: "A mixture of a weak acid + its conjugate base is the key — explain, using Brønsted-Lowry, why adding a small amount of acid or base barely changes the pH",
        terms: [
          {
            term: "Buffer Solution Principle",
            def: "A buffer solution is a solution in which the change in pH is minimised even when a small amount of acid or base is added. Composition: ① a weak acid (HA) and its conjugate base (A⁻, usually supplied as a salt). Example: the CH₃COOH/CH₃COO⁻Na⁺ buffer system (pH ≈ pKₐ = 4.74). ② or a weak base (B) and its conjugate acid (BH⁺). Example: the NH₃/NH₄Cl buffer system. Operating principle: when a strong acid (H⁺) is added → the conjugate base (A⁻) absorbs H⁺: A⁻ + H⁺ → HA (suppressing the rise in pH). When a strong base (OH⁻) is added → the weak acid (HA) supplies H⁺: HA + OH⁻ → A⁻ + H₂O (suppressing the fall in pH). Biological importance: blood pH = 7.4 (the HCO₃⁻/H₂CO₃ buffer system), intracellular phosphate buffer system. Buffer capacity: the pH range in which buffering is effective = pKₐ ± 1.",
          },
          {
            term: "Henderson-Hasselbalch Equation",
            def: "The equation that approximately calculates the pH of a buffer solution: pH = pKₐ + log([A⁻]/[HA]). At the half-equivalence point, if [HA] = [A⁻], then pH = pKₐ + log(1) = pKₐ. This is why the pH at the half-equivalence point on a titration curve equals pKₐ. At IB HL level, this equation is applied to buffer pH calculations. At SL, often only the principle of buffering (a qualitative explanation) is required.",
          },
        ],
        traps: [
          "To make a buffer solution, mixing a weak acid and a strong base alone is not enough. If you add too much strong base, the weak acid is all neutralised and loses its buffering ability. Buffering ability is greatest when the mole ratio of the weak acid and its salt (conjugate base) is similar. 'A solution made by adding a small amount of strong base to a weak acid to neutralise only half of the weak acid' is the optimal buffer system. On IB Paper 2, writing 'mix a strong acid and a strong base' in answer to 'describe how to make a buffer solution' is an instant wrong answer.",
        ],
        example:
          "Buffer solution pH calculation example (IB HL type): Find the pH of a buffer solution made by mixing 0.200 mol dm⁻³ CH₃COOH and 0.100 mol dm⁻³ CH₃COONa. (Ka(CH₃COOH) = 1.8 × 10⁻⁵, pKₐ = 4.74) Solution (Henderson-Hasselbalch): pH = pKₐ + log([CH₃COO⁻]/[CH₃COOH]) = 4.74 + log(0.100/0.200) = 4.74 + log(0.500) = 4.74 + (−0.301) = 4.44. If a small amount of NaOH (0.010 mol) is added to this buffer solution: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. The moles of CH₃COOH decrease and the moles of CH₃COO⁻ increase → new pH = pKₐ + log([0.110]/[0.190]) = 4.74 + (−0.238) = 4.50. pH change = 0.06 units — extremely small compared with the pH change (several units) when the same amount of NaOH is added to pure water without a buffer.",
      },
    ],
  },
];
