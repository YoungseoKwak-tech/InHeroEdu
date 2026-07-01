/**
 * Core Notes English version — IB Chemistry Unit 7 (Chemical Equilibrium).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U7_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u7-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 7,
    lessonNum: 1,
    unitName: "Chemical Equilibrium",
    title: "Dynamic Equilibrium — The Reaction Has Not Stopped; the Forward and Reverse Reactions Continue at Equal Rates",
    subtitle: "Even when nothing appears to change at the macroscopic level, reaction continues ceaselessly at the molecular level — this is what 'dynamic' means",
    overview:
      "Picture brown nitrogen dioxide (NO₂) gas in a closed flask reaching equilibrium with colourless dinitrogen tetroxide (N₂O₄). After a certain time the colour stops changing. It is tempting to think 'the reaction is over,' but this is a misconception. In reality the forward reaction (NO₂ → N₂O₄) and the reverse reaction (N₂O₄ → NO₂) are proceeding simultaneously at the same rate, so that the net sum of concentration changes is zero. This is called dynamic equilibrium. Two conditions are required for dynamic equilibrium to hold: ① a closed system — matter cannot enter or leave; ② forward rate = reverse rate. At equilibrium the concentrations of reactants and products, along with all macroscopic properties such as temperature, pressure, and colour, remain constant. But you must distinguish carefully: this does not mean 'there is no change,' it means 'there is no net change.' IB Paper 1 and Paper 2 very frequently ask about 'the characteristics of dynamic equilibrium.' In this lesson you will master the definition, conditions, and characteristics of dynamic equilibrium, and develop the ability to interpret forward/reverse rates and concentration changes graphically.",
    objectives: [
      "Define dynamic equilibrium as 'a state in a closed system where the forward rate and the reverse rate are equal so that there is no net change in concentration,' and explain at the molecular level that 'the reaction has not stopped'",
      "State the two conditions required for equilibrium (closed system, forward rate = reverse rate) and accurately identify the equilibrium state on concentration–time and rate–time graphs",
      "List the macroscopic characteristics of the equilibrium state (constant concentration, constant colour, constant pressure, etc.) and explain how these are compatible with a 'dynamic process at the molecular level'",
      "Explain the meaning of the double-arrow notation (⇌) used to represent a reversible reaction and distinguish it from an irreversible reaction",
      "Explain that the direction in which a reaction reaches equilibrium is independent of the starting composition (reactants only, products only, or a mixture) — the same equilibrium state is reached at the same temperature",
    ],
    formulas: [
      "Condition for dynamic equilibrium: rate_forward = rate_reverse",
      "Net rate = rate_forward − rate_reverse = 0 (at equilibrium)",
    ],
    sections: [
      {
        title: "Definition and Characteristics of Dynamic Equilibrium",
        subtitle: "Macroscopic stillness ≠ microscopic stillness — reaction continues at the molecular level",
        terms: [
          {
            term: "Dynamic Equilibrium",
            def: "A state in a closed system where the forward reaction and the reverse reaction proceed simultaneously at the same rate, so that the concentrations of reactants and products remain constant. The word 'dynamic' signifies that reaction is continuously occurring at the molecular level, and it must not be confused with the apparent 'static state.' Macroscopic properties — concentration, colour, pressure, density, etc. — are all constant. Microscopic reality: reactant molecules are continuously converting into products, and product molecules into reactants.",
          },
          {
            term: "Closed System and Conditions for Equilibrium",
            def: "For equilibrium to be established, the system must be closed. In a reaction that evolves a gas, opening the lid lets the product escape so the reverse reaction cannot proceed and equilibrium is never reached. Example: in an open system, CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂(g) behaves like an irreversible reaction because CO₂ escapes into the atmosphere. Only in a sealed container can CO₂ accumulate, allowing the reverse reaction to proceed and equilibrium to be reached. Therefore, when an IB question asks 'can equilibrium be reached,' first check whether the system is closed.",
          },
          {
            term: "Rate–Time and Concentration–Time Graphs",
            def: "Rate–time graph: at the start of the reaction rate_forward is large and rate_reverse is 0. As time passes, the falling reactant concentration decreases rate_forward, while the rising product concentration increases rate_reverse, until the two curves meet at the point equilibrium is reached. After equilibrium the two rates remain equal (and non-zero). Concentration–time graph: reactant concentrations decrease and product concentrations increase until they converge to constant values. Both graphs are frequently examined in IB Paper 1 and Paper 2, so you must be able to draw them accurately.",
          },
          {
            term: "Reversible Reaction Notation",
            def: "A reversible reaction is written with a double arrow (⇌). Example: N₂(g) + 3H₂(g) ⇌ 2NH₃(g). The double arrow means 'the forward reaction occurs and the reverse reaction occurs too.' A single arrow (→) denotes an irreversible reaction or one that effectively goes to completion. Writing a reversible reaction with a single arrow loses marks in the IB exam.",
          },
        ],
        traps: [
          "Stating that at equilibrium 'the reaction has stopped' is marked wrong in IB. The correct statement is 'the rate of the forward reaction equals the rate of the reverse reaction,' and you must emphasise that reaction continues at the molecular level. Writing only 'the concentrations do not change' earns only partial credit, so always mention the equality of rates.",
          "Thinking that the concentrations of reactants and products must be equal at equilibrium is wrong. At equilibrium the concentrations are merely constant; this does not mean the reactant concentration equals the product concentration. The position of equilibrium differs from reaction to reaction and may lie toward the reactant side or the product side.",
        ],
        example:
          "NO₂/N₂O₄ equilibrium experiment: 2NO₂(g) ⇌ N₂O₄(g). When brown NO₂ is placed in a closed flask, the colour is initially deep brown, becomes paler over time, and finally settles to a constant brown. Drawing the concentration–time graph: [NO₂] decreases from a high initial value and converges to a constant value, while [N₂O₄] rises from 0 and converges to a constant value. On the rate–time graph the two curves meet at the same point. Beyond this intersection is the equilibrium state, at which the intensity of the brown colour remains constant. If the lid of the flask is opened, some N₂O₄ escapes or the effect of adding NO₂ arises, and the equilibrium is disturbed.",
      },
      {
        title: "Path to Equilibrium and Position of Equilibrium",
        subtitle: "Wherever you start, the same equilibrium is reached at the same temperature — equilibrium is path-independent",
        terms: [
          {
            term: "Position of Equilibrium",
            def: "The relative ratio of reactant and product concentrations at equilibrium. When equilibrium lies toward the product side (K > 1): described as 'the equilibrium lies to the right (forward direction).' When it lies toward the reactant side (K < 1): described as 'the equilibrium lies to the left (reverse direction).' The position of equilibrium varies with temperature; other changes (concentration, pressure) shift the position of equilibrium, but as long as the temperature does not change, the equilibrium constant (K) does not change.",
          },
          {
            term: "Path Independence of Equilibrium",
            def: "At the same temperature the same reaction system reaches the same equilibrium state regardless of the starting composition. Whether you start with only reactants, only products, or a mixture of reactants and products — if the temperature is the same, the ratio of concentrations at the final equilibrium is identical. This means the equilibrium constant (Kc) is a function of temperature alone, a concept that frequently causes confusion in IB Paper 2.",
          },
        ],
        traps: [
          "The ratio of reactant and product concentrations at equilibrium is independent of the starting composition. Whether you begin with only reactants or only products, you converge to equilibrium concentrations satisfying the same Kc value at the same temperature. The notion that 'adding more reactant changes the equilibrium constant' is wrong — the position of equilibrium (the concentration values) may change, but Kc is always constant at the same temperature.",
        ],
        example:
          "Demonstrating path independence for H₂(g) + I₂(g) ⇌ 2HI(g) at 500 °C, where Kc = 64. Approach A starts with only reactants, 1.00 mol dm⁻³ H₂ and 1.00 mol dm⁻³ I₂ and no HI; the system runs forward until [H₂] = [I₂] = 0.20 and [HI] = 1.60, giving (1.60)² / (0.20 × 0.20) = 64. Approach B starts with only product, 2.00 mol dm⁻³ HI and no reactants; HI decomposes until [HI] = 1.60 and [H₂] = [I₂] = 0.20 — the identical equilibrium mixture. Both routes reach the same concentrations satisfying Kc = 64 because Kc depends on temperature alone, not on where you began.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u7-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 7,
    lessonNum: 2,
    unitName: "Chemical Equilibrium",
    title: "The Equilibrium Constant Kc and the Reaction Quotient Qc — Expressing the Position of Equilibrium with a Single Number",
    subtitle: "Kc is the 'code' of the equilibrium state, and Qc is a compass that tells you how far the current system is from equilibrium",
    overview:
      "Once you understand dynamic equilibrium qualitatively, it is time to express that equilibrium state quantitatively. The equilibrium constant (Kc), which originates from the law of mass action of Guldberg and Waage (1864), represents the ratio of reactant and product concentrations when a closed system reaches equilibrium at a particular temperature. For the reaction aA + bB ⇌ cC + dD, Kc = [C]^c [D]^d / [A]^a [B]^b. In this expression products are in the numerator and reactants in the denominator, with each concentration raised to the power of its stoichiometric coefficient. The magnitude of Kc reveals the position of equilibrium: if Kc >> 1 the equilibrium lies toward the products, and if Kc << 1 it lies toward the reactants. Kc is a function of temperature alone — if concentration or pressure changes but the temperature is constant, Kc does not change. The reaction quotient (Qc) is calculated in the same form as the Kc expression but using current conditions (including non-equilibrium states). Comparing Qc with Kc lets you predict the direction the reaction will proceed: if Qc < Kc, the forward direction (→); if Qc > Kc, the reverse direction (←); if Qc = Kc, equilibrium. In this lesson you will fully master writing the Kc expression, interpreting its magnitude, and applying the comparison with Qc.",
    objectives: [
      "Correctly write Kc = [C]^c[D]^d / [A]^a[B]^b for the reversible reaction aA + bB ⇌ cC + dD, and explain why solids and pure liquids are excluded from the Kc expression",
      "Interpret the numerical magnitude of Kc (Kc >> 1, Kc ≈ 1, Kc << 1) in connection with the position of equilibrium and describe the 'extent' of the reaction",
      "Calculate the reaction quotient Qc at arbitrary conditions and compare Qc with Kc to predict the direction the reaction will proceed (forward, reverse, or already at equilibrium)",
      "State that Kc is a function of temperature alone, and explain that changes in concentration or pressure shift the position of equilibrium but do not change the value of Kc itself",
      "Calculate Kc from given equilibrium concentration data, and conversely use an ICE table (Initial-Change-Equilibrium) to find equilibrium concentrations from Kc and initial concentrations",
    ],
    formulas: [
      "Kc = [C]^c [D]^d / [A]^a [B]^b  (aA + bB ⇌ cC + dD)",
      "Qc = concentration ratio at non-equilibrium conditions (same form as the Kc expression)",
      "Qc < Kc → proceeds in the forward direction (→)",
      "Qc > Kc → proceeds in the reverse direction (←)",
      "Qc = Kc → at equilibrium (no change)",
    ],
    sections: [
      {
        title: "The Equilibrium Constant Kc — The Formula That Quantifies the Position of Equilibrium",
        subtitle: "Divide the product of product concentrations by the product of reactant concentrations — Kc is constant as long as the temperature does not change",
        terms: [
          {
            term: "Equilibrium Constant Kc",
            def: "At a fixed temperature, the product of the product concentrations (each raised to its stoichiometric coefficient) divided by the product of the reactant concentrations (each raised to its stoichiometric coefficient) for a system at equilibrium. For the reaction aA + bB ⇌ cC + dD: Kc = [C]^c[D]^d / [A]^a[B]^b. All concentrations are in mol dm⁻³, but Kc itself is often treated as dimensionless (at IB SL level). In the IB exam you may write only the numerical value without units. Because Kc is fixed at a given temperature, the same reaction yields the same Kc even when the starting composition differs, as long as the temperature is the same.",
          },
          {
            term: "Exclusion of Solids and Pure Liquids",
            def: "Pure solids and pure liquids are not included in the Kc expression. Reason: the 'concentration' of a pure solid or pure liquid is a constant value calculated from its density, and it does not change as the reaction proceeds, so it is treated as a constant and absorbed into Kc. Example: CaCO₃(s) ⇌ CaO(s) + CO₂(g) → Kc = [CO₂]. In aqueous reactions H₂O is a pure liquid present in large excess and is excluded from Kc, but gaseous H₂O(g) must be included.",
          },
          {
            term: "Interpreting the Magnitude of Kc",
            def: "Kc >> 1 (e.g., Kc = 10⁶): the equilibrium lies strongly toward the products — the reaction is close to going to completion. Kc << 1 (e.g., Kc = 10⁻⁶): the equilibrium lies strongly toward the reactants — the reaction barely proceeds. Kc ≈ 1: at equilibrium the concentrations of reactants and products are of similar magnitude. This interpretation of magnitude is core content frequently asked in both IB Paper 1 multiple choice and Paper 2 extended response.",
          },
          {
            term: "ICE Table (Initial-Change-Equilibrium)",
            def: "A method for systematically organising initial concentrations (Initial), changes (Change), and equilibrium concentrations (Equilibrium). For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) with initial [N₂] = 1.0, [H₂] = 3.0, [NH₃] = 0 mol dm⁻³: set the changes as −x, −3x, +2x, write the equilibrium concentrations as (1.0−x), (3.0−3x), (2x), then substitute into the Kc expression to solve for x. The ICE table is the standard method for equilibrium concentration calculations and is essential for 'calculation' questions in IB Paper 2.",
          },
        ],
        traps: [
          "Including solids and pure liquids in the Kc expression is wrong. Example: writing Kc = [CO₂] / [CaCO₃][CaO] is incorrect. Because CaCO₃ and CaO are pure solids, they are excluded from the denominator of Kc, so it must be written Kc = [CO₂]. This is a frequent error in IB Paper 2 questions on writing Kc expressions for heterogeneous equilibria.",
          "Writing the Kc expression for the reverse reaction, or misapplying the stoichiometric coefficients as molecule counts, is wrong. Writing the reaction in reverse gives the reciprocal of Kc (1/Kc), and multiplying the equation's coefficients by n gives (Kc)^n. Always check the direction and coefficients of the given equation. IB exams frequently ask you to find the Kc of the reverse reaction.",
        ],
        example:
          "Kc calculation example: for the reaction H₂(g) + I₂(g) ⇌ 2HI(g), at equilibrium at 500°C, [H₂] = 0.20 mol dm⁻³, [I₂] = 0.20 mol dm⁻³, [HI] = 1.60 mol dm⁻³. Find Kc. Solution: Kc = [HI]² / ([H₂][I₂]) = (1.60)² / (0.20 × 0.20) = 2.56 / 0.04 = 64. Since Kc = 64 >> 1, at this temperature the equilibrium lies strongly toward the product (HI). The reverse reaction I₂(g) + H₂(g) ⇌ 2HI(g) → identical, so Kc is the same. If instead the equation is written as ½H₂ + ½I₂ ⇌ HI, then Kc' = [HI] / ([H₂]^½[I₂]^½) = √64 = 8.",
      },
      {
        title: "The Reaction Quotient Qc and Predicting Reaction Direction",
        subtitle: "Qc is a 'snapshot' of this moment — comparing it with Kc instantly tells you which direction the reaction must run",
        terms: [
          {
            term: "Reaction Quotient Qc",
            def: "A value calculated, at arbitrary conditions (which may not be equilibrium), in the same form as the Kc expression using the concentrations of reactants and products. Unlike Kc, Qc can be calculated at any condition. Compare Qc with Kc to predict the reaction direction: ① Qc < Kc: relatively little product in the numerator — the forward reaction proceeds to form more product (→). ② Qc > Kc: relatively much product in the numerator — the reverse reaction proceeds to form more reactant (←). ③ Qc = Kc: already at equilibrium.",
          },
          {
            term: "Temperature and Kc",
            def: "Kc is a function of temperature alone. Changes in concentration, changes in pressure, and the addition of a catalyst shift the position of equilibrium but do not change the value of Kc. Changing the temperature, however, does change Kc: in an exothermic reaction (ΔH < 0), raising the temperature decreases Kc (shifts toward the reverse reaction) and lowering it increases Kc (shifts toward the forward reaction). For an endothermic reaction (ΔH > 0), the opposite holds. This is consistent with Le Chatelier's principle.",
          },
        ],
        traps: [
          "Thinking that adding a catalyst changes Kc is wrong. A catalyst lowers the activation energy of the forward and reverse reactions equally, merely allowing equilibrium to be reached faster; it does not change Kc or the position of equilibrium. Therefore, even with a catalyst, the ratio of concentrations at equilibrium (Kc) is the same. In IB Paper 1 multiple choice, choosing 'Kc increases' for a question on 'the effect of adding a catalyst' is wrong.",
        ],
        example:
          "Example of predicting reaction direction using Qc: for the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), Kc = 0.500 (500°C). When [N₂] = 0.10, [H₂] = 0.30, [NH₃] = 0.20 mol dm⁻³, in which direction does the reaction proceed? Solution: Qc = [NH₃]² / ([N₂][H₂]³) = (0.20)² / (0.10 × (0.30)³) = 0.040 / (0.10 × 0.027) = 0.040 / 0.0027 ≈ 14.8. Since Qc ≈ 14.8 > Kc = 0.500, Qc > Kc → the reverse reaction proceeds. That is, NH₃ decomposes and the reaction proceeds in the direction of forming N₂ and H₂.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u7-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 7,
    lessonNum: 3,
    unitName: "Chemical Equilibrium",
    title: "Le Chatelier's Principle — Disturb the Equilibrium and the System Resists",
    subtitle: "Change the concentration, pressure, or temperature and the equilibrium shifts to counteract that change — in the Haber process and the Contact process this principle becomes the heart of industry",
    overview:
      "In 1884 Le Chatelier announced a remarkable insight: 'When a perturbation is applied to a system at equilibrium, the system shifts toward a new equilibrium in the direction that minimises that change.' This is Le Chatelier's principle. The principle applies to three kinds of change. ① Change in concentration: adding reactant shifts toward the forward direction, adding product shifts toward the reverse direction. ② Change in pressure/volume: in a gaseous reaction, increasing the pressure (decreasing the volume) shifts toward the side with fewer moles of gas, and decreasing the pressure shifts toward the side with more moles of gas. However, if the moles of gas are equal on both sides, the position of equilibrium does not shift with pressure. ③ Change in temperature: raising the temperature shifts in the endothermic direction, lowering it shifts in the exothermic direction. Temperature change is the only factor that changes the value of Kc itself. A catalyst does not change the position of equilibrium; it only increases the rate at which equilibrium is reached. This principle applies directly to selecting the optimal conditions for the Haber process for ammonia synthesis and the Contact process for sulfuric acid production. In this lesson you will fully master applying Le Chatelier's principle to the three kinds of change, the traps that appear frequently in IB exams, and the industrial applications.",
    objectives: [
      "Define Le Chatelier's principle and, for changes in concentration, pressure, and temperature, predict the direction of the shift in equilibrium and explain the reasoning",
      "Explain why, in a gaseous reaction, increasing the pressure (or decreasing the volume) shifts the equilibrium toward the side with fewer total moles of gas, and explain that when the moles of gas are equal on the reactant and product sides a change in pressure does not affect the position of equilibrium",
      "State that a change in temperature is the only condition that changes Kc, and explain the direction in which Kc changes for exothermic/endothermic reactions when temperature increases or decreases",
      "Explain that a catalyst does not change the position of equilibrium or the value of Kc and only increases the rate at which equilibrium is reached",
      "Apply the compromise logic that explains, jointly from the perspectives of Le Chatelier's principle and reaction rate, the selection of temperature, pressure, and catalyst conditions in the Haber process (N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ mol⁻¹) and the Contact process (2SO₂ + O₂ ⇌ 2SO₃, ΔH = −196 kJ mol⁻¹)",
    ],
    formulas: [
      "Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g),  ΔH = −92 kJ mol⁻¹",
      "Contact process: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g),  ΔH = −196 kJ mol⁻¹",
      "Pressure effect: shifts toward fewer moles of gas (when pressure increases)",
      "Temperature effect: exothermic reaction → Kc decreases when temperature↑ (reverse direction)",
    ],
    sections: [
      {
        title: "Le Chatelier's Principle — Equilibrium Shifts for Changes in Concentration, Pressure, and Temperature",
        subtitle: "Equilibrium shifts to reduce the stress — you must distinguish the logic of each of the three variables precisely for full IB marks",
        terms: [
          {
            term: "Le Chatelier's Principle",
            def: "When an external change (stress) is applied to a system at equilibrium, the system shifts in the direction that minimises the effect of that change and reaches a new equilibrium. This principle applies to changes in concentration, pressure, and temperature, and at the new equilibrium Kc is the same if the temperature does not change (temperature change does alter Kc). In an extended-response answer, writing only 'by Le Chatelier's principle' earns partial credit — you must state specifically 'in which direction it shifts and why' for full marks.",
          },
          {
            term: "Effect of Concentration Change",
            def: "① Increasing the reactant concentration: the system shifts in the direction that consumes reactant (forward, →) and the product concentration increases. Kc does not change at constant temperature. ② Increasing the product concentration (or removing product): the system shifts to counteract that change. Removing product shifts forward (→), adding product shifts reverse (←). ③ Adding an inert gas — fixed-volume container: no change in the partial pressures/concentrations of reactants or products → the position of equilibrium is unchanged. This is why removing product continuously in industry is used to increase yield.",
          },
          {
            term: "Effect of Pressure/Volume Change",
            def: "In a gaseous reaction, increasing the pressure (= decreasing the volume) shifts the system toward the side that reduces the total moles of gas. Example: in N₂ + 3H₂ ⇌ 2NH₃ the reactant side has more moles of gas (1+3=4) than the product side (2), so increasing the pressure shifts it forward (→) to reduce the moles of gas. If the moles of gas are equal on the reactant and product sides (e.g., H₂ + I₂ ⇌ 2HI: 2 mol each), a change in pressure does not affect the position of equilibrium. The pressure effect of solids and liquids is neglected.",
          },
          {
            term: "Effect of Temperature Change",
            def: "Temperature is the only variable that affects both the reaction rate and Kc. Exothermic reaction (ΔH < 0): raising the temperature → shifts toward the reverse reaction (←), Kc decreases. Lowering the temperature → shifts toward the forward reaction (→), Kc increases. Endothermic reaction (ΔH > 0): the opposite direction. Intuition: raising the temperature supplies heat to the system — the system shifts in the direction that absorbs that heat (the endothermic direction) to suppress the temperature rise. This is why the temperature effect, 'unlike concentration and pressure, changes Kc itself.'",
          },
        ],
        traps: [
          "Thinking that adding a catalyst shifts the position of equilibrium or changes Kc is wrong. A catalyst lowers the activation energy of the forward and reverse reactions equally and only shortens the time to reach equilibrium. The ratio of concentrations at equilibrium (Kc) and the position of equilibrium are completely unchanged. In an IB Paper 2 extended response, writing 'the catalyst increases the yield' in answer to 'what is the concentration of NH₃ at equilibrium after adding a catalyst?' is wrong.",
          "In a reaction involving a solid or pure liquid, changing the amount of solid does not shift the position of equilibrium. Example: in CaCO₃(s) ⇌ CaO(s) + CO₂(g), adding more CaCO₃ does not change the position of equilibrium. Because the 'concentration' of a solid is constant (density-based), it is not treated as a concentration change. However, the concentration of CO₂(g) does genuinely affect the equilibrium.",
        ],
        example:
          "Integrated Le Chatelier's principle example (Paper 2 type): for the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = −196 kJ mol⁻¹, describe the effect of each of the following changes. ① Add O₂: the reactant (O₂) concentration increases → shifts forward (→) → [SO₃] increases, Kc unchanged. ② Raise the temperature: since the reaction is exothermic, shifts toward the reverse (←) → [SO₃] decreases, Kc decreases. ③ Increase the total pressure (decrease the volume): reactant moles of gas (2+1=3) > product moles of gas (2) → shifts forward (→) → [SO₃] increases, Kc unchanged. ④ Add V₂O₅ catalyst: lowers the forward and reverse Eₐ equally → equilibrium is reached faster, but Kc and the position of equilibrium are unchanged.",
      },
      {
        title: "Industrial Applications — Compromise in the Haber Process and the Contact Process",
        subtitle: "In theory a low temperature and high pressure are favourable — but a real factory chooses a compromise point that considers both rate and yield simultaneously",
        terms: [
          {
            term: "Haber Process",
            def: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = −92 kJ mol⁻¹. Industrial conditions: temperature about 450°C, pressure about 200 atm, catalyst Fe(s) (promoters: K₂O, Al₂O₃). Temperature: since the reaction is exothermic, a lower temperature raises Kc and increases the yield, but too low a temperature makes the reaction rate too slow to be economical → compromise: choose a suitably high temperature (450°C). Pressure: since reactant moles (4) > product moles (2), a higher pressure favours increased yield → compromise: choose 200 atm considering equipment cost and safety. Catalyst: position of equilibrium unchanged, rate of reaching equilibrium increased.",
          },
          {
            term: "Contact Process",
            def: "The key step of sulfuric acid manufacture: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = −196 kJ mol⁻¹. Industrial conditions: temperature about 450°C, pressure about 1–2 atm, catalyst V₂O₅(s). Temperature: since the reaction is exothermic, a lower temperature favours yield, but 450°C is the compromise for reaction rate. Pressure: since reactant moles of gas (2+1=3) > product (2), a higher pressure is favourable, but conversion already reaches ~99% even at 1–2 atm, so high-pressure equipment is unnecessary. Catalyst: position of equilibrium unchanged, economy secured through improved rate.",
          },
        ],
        traps: [
          "Writing that in the Haber process 'a high temperature raises the yield' is wrong. The Haber process reaction is exothermic (ΔH = −92 kJ mol⁻¹), so raising the temperature shifts toward the reverse reaction, decreasing the NH₃ yield and decreasing Kc. The reason 450°C is used in the actual process is not 'high yield' but 'a compromise to secure a suitable reaction rate.' For full marks you must state 'a low temperature favours yield but is slow, while a high temperature favours rate but gives low yield — therefore the compromise of 450°C is chosen.'",
          "In the IB exam, writing that 'adding an inert gas to a fixed-volume container shifts the equilibrium' is wrong. In a fixed-volume container, adding an inert gas increases the total pressure but the partial pressures and concentrations of reactants and products do not change, so the position of equilibrium does not shift. By contrast, in a piston (variable-volume) container where a constant total pressure is maintained while an inert gas is added, the partial pressures of the reactants fall and the equilibrium shifts toward the side with more moles of gas — you must always distinguish these two cases.",
        ],
        example:
          "Model extended-response answer on the compromise logic of the Haber process: 'Explain why, although a low temperature and high pressure are thermodynamically favourable in the Haber process, 450°C and 200 atm are used as the actual industrial conditions.' Model answer: Pressure: since the reactant moles of gas (N₂+3H₂=4) are greater than the products (2NH₃=2), a high pressure shifts the equilibrium toward the forward direction by Le Chatelier's principle, increasing the yield. Although theoretically an even higher pressure is possible, 200 atm is a compromise that considers the construction/maintenance cost of high-pressure equipment and safety issues. Temperature: since N₂ + 3H₂ ⇌ 2NH₃ is exothermic (ΔH = −92 kJ mol⁻¹), a low temperature raises Kc and increases the equilibrium yield. However, at too low a temperature the reaction rate is extremely slow because of the activation energy barrier, making economic production impossible. Therefore the compromise of 450°C, which satisfies both a reasonable reaction rate and an adequate yield, is chosen. The catalyst (Fe) does not change the position of equilibrium or the yield; it lowers the activation energy of the forward and reverse reactions equally so that equilibrium is reached faster.",
      },
    ],
  },
];
