/**
 * Core Notes English version — Honors Chemistry Unit 5 (Kinetics and Equilibrium).
 * Original Korean authored content translated to IB-level English.
 * Lessons cover reaction rate, rate laws, dynamic equilibrium, Le Chatelier's principle,
 * and acid-base equilibrium with pH. Facts verified for accuracy.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_CHEMISTRY_U5_EN: CoreNote[] = [
  {
    lessonId: "honors-chemistry-u5-l1",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 1,
    unitName: "Kinetics and Equilibrium",
    title: "What Controls How Fast a Reaction Goes",
    subtitle: "Collision theory — sufficient energy and correct orientation; catalysts lower activation energy, not supply it",
    overview:
      "Reaction rate is determined by how often particles collide and how 'effectively' those collisions happen (collision theory). For a collision to produce a reaction, two conditions must both be satisfied: the colliding particles must possess kinetic energy at least equal to the activation energy (Ea), and they must approach each other in the correct orientation. A catalyst does not add energy to the system; instead it provides an alternative reaction pathway with a lower activation energy, increasing the fraction of particles that can cross the barrier. Crucially, the catalyst is regenerated and neither consumed nor changes the overall enthalpy change (ΔH) of the reaction.",
    objectives: [
      "Explain the two conditions of collision theory (energy and orientation) for an effective collision",
      "Define activation energy and transition state, and read an energy diagram",
      "Describe how temperature, concentration, and surface area each affect reaction rate",
      "Explain the mechanism by which a catalyst increases reaction rate without altering ΔH",
    ],
    formulas: [
      "Effective collision: KE ≥ Ea AND correct collision orientation",
      "Temperature↑ → greater fraction of particles with KE ≥ Ea → rate↑",
      "Catalyst: lowers Ea via alternative pathway; ΔH and products unchanged",
    ],
    sections: [
      {
        title: "Collision Theory: Energy and Orientation",
        subtitle: "Not every collision leads to a reaction — both energy and geometry must be right",
        body: "Reaction requires particles to collide, but not every collision is productive. The colliding particles must first have kinetic energy greater than or equal to the activation energy (Ea) — only then can existing bonds break and new ones form. Simultaneously, the geometry of the collision must be correct: if the reactive sites do not face each other properly, the collision fails even when there is sufficient energy. Only a collision satisfying both conditions — adequate energy and correct orientation — is called an effective collision and yields products.",
        keyIdea: "Effective collision = sufficient energy (≥ Ea) AND correct orientation. Both are required.",
        terms: [
          {
            term: "Collision theory",
            def: "The model that explains reactions as the result of effective collisions between reactant particles that have sufficient energy and the correct orientation.",
          },
          {
            term: "Reaction rate",
            def: "The change in concentration of reactants or products per unit time. Often measured as mol/L·s.",
          },
          {
            term: "Orientation",
            def: "The spatial arrangement of colliding particles relative to each other. Even high-energy collisions fail if the reactive ends are not aligned properly.",
          },
        ],
        traps: [
          "Saying that 'any collision causes a reaction' — only effective collisions (energy ≥ Ea AND correct orientation) yield products. Most everyday collisions at room temperature are too gentle and/or mis-aligned.",
        ],
        example: null,
      },
      {
        title: "Activation Energy and the Transition State",
        subtitle: "The energy hill every reaction must climb — and what sits at the top",
        body: "Activation energy (Ea) is the minimum energy barrier that reactants must overcome for a reaction to proceed. On an energy diagram, Ea appears as the height of the hill between reactants and products. When reactants reach the top of this hill, they form an extremely unstable, high-energy arrangement called the transition state (or activated complex), where old bonds are partially broken and new bonds are partially formed. The lower Ea is, the greater the fraction of particles that can surmount the barrier at a given temperature, and therefore the faster the reaction. Raising the temperature dramatically increases this fraction because kinetic energy is distributed over a broader range.",
        terms: [
          {
            term: "Activation energy (Ea)",
            def: "The minimum energy that colliding particles must possess for a reaction to occur. The 'energy hill' on a reaction energy diagram.",
          },
          {
            term: "Transition state",
            def: "The unstable, highest-energy arrangement at the peak of the energy diagram, where old bonds are breaking and new bonds are forming simultaneously.",
          },
          {
            term: "Energy diagram",
            def: "A graph of potential energy versus reaction progress showing reactants, transition state, products, Ea, and ΔH.",
          },
        ],
        traps: [
          "Confusing Ea with ΔH — Ea is the height of the energy hill (barrier to get the reaction started); ΔH is the overall energy difference between products and reactants. A reaction can be highly exothermic (large negative ΔH) yet still have a high Ea (slow reaction).",
        ],
        example:
          "In the combustion of methane, the overall reaction is very exothermic (products are much lower in energy than reactants), but the reaction requires a spark or flame to start — that initial energy input overcomes Ea. Once the barrier is crossed, the reaction releases far more energy than was put in.",
      },
      {
        title: "Catalysts: Lowering Ea via an Alternative Pathway",
        subtitle: "Catalysts speed up reactions without being consumed or changing ΔH",
        body: "A catalyst works by providing an alternative reaction mechanism — a different sequence of steps — whose transition state is lower in energy than the uncatalyzed route. Because Ea is reduced, a larger fraction of particles can cross the barrier at the same temperature, and the reaction is faster. The catalyst participates in the mechanism but is regenerated at the end, so it is not consumed. The energies of the reactants and products are unchanged, so ΔH is exactly the same with or without the catalyst. Also important: a catalyst lowers the activation energy of both the forward and reverse reactions equally, so it speeds up both directions — equilibrium is reached faster, but the position of equilibrium does not shift.",
        keyIdea: "A catalyst provides a lower-Ea alternative pathway — it is not consumed, does not change ΔH, and does not shift equilibrium position.",
        terms: [
          {
            term: "Catalyst",
            def: "A substance that increases reaction rate by providing an alternative pathway with lower activation energy. It is not consumed and does not appear in the overall stoichiometry.",
          },
          {
            term: "Alternative pathway",
            def: "The different reaction mechanism offered by a catalyst, characterized by a lower-energy transition state than the uncatalyzed route.",
          },
        ],
        traps: [
          "Claiming a catalyst 'supplies energy' to the reaction — it does not. It lowers the energy barrier. The reactants still supply all the energy; the barrier is just shorter.",
          "Thinking a catalyst changes the equilibrium position or ΔH — it changes neither. It only changes the rate at which equilibrium is reached.",
        ],
        example:
          "The catalytic converter in a car uses platinum and palladium to speed up the oxidation of CO and hydrocarbons to CO₂ and H₂O at lower temperatures than the uncatalyzed reactions would require. The converter is not consumed in the process, and the overall ΔH of combustion is unchanged.",
      },
    ],
  },

  {
    lessonId: "honors-chemistry-u5-l2",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 2,
    unitName: "Kinetics and Equilibrium",
    title: "How to Write Rate Laws from Experiments (Not Equations)",
    subtitle: "Reaction orders come from initial-rate data alone — you cannot read them from a balanced equation",
    overview:
      "The rate law rate = k[A]^m[B]^n describes how reaction rate depends on the concentrations of reactants, but the exponents m and n (the reaction orders) have nothing to do with the stoichiometric coefficients in the balanced equation. They are determined solely by experiment, because they reflect the underlying reaction mechanism, not the overall stoichiometry. The standard technique is the method of initial rates: hold all but one concentration fixed, change that one, and observe how the initial rate responds. Once the orders are known, the integrated rate law allows the time-dependence of concentration to be tracked, and a graphical test reveals the order.",
    objectives: [
      "State the form of a rate law and define rate constant, reaction order, and overall order",
      "Use initial-rate data to determine the order with respect to each reactant",
      "Explain clearly why reaction orders cannot be read from stoichiometric coefficients",
      "Distinguish the integrated rate laws and half-life expressions for first- and second-order reactions",
    ],
    formulas: [
      "Rate law: rate = k[A]^m[B]^n",
      "Orders m and n determined by experiment only (not from balanced-equation coefficients)",
      "First order: ln[A] vs t is linear (slope = −k); half-life = 0.693/k (concentration-independent)",
      "Second order: 1/[A] vs t is linear (slope = +k); half-life = 1/(k[A]₀)",
    ],
    sections: [
      {
        title: "The Rate Law and What Its Terms Mean",
        subtitle: "Understanding k, m, and n before calculating anything",
        body: "The rate law for a reaction is an empirical equation of the form rate = k[A]^m[B]^n, where [A] and [B] are the molar concentrations of reactants, k is the rate constant (a proportionality factor that depends on temperature but not on concentration), m is the order with respect to A, and n is the order with respect to B. The overall reaction order is m + n. The order tells you the sensitivity of the rate to concentration: if the order is 0, changing concentration has no effect; if it is 1, doubling concentration doubles the rate; if it is 2, doubling concentration quadruples the rate. Orders are almost always small whole numbers or zero, but they can be fractions.",
        terms: [
          {
            term: "Rate law",
            def: "An empirical equation relating reaction rate to the concentrations of reactants: rate = k[A]^m[B]^n. The exponents are found experimentally.",
          },
          {
            term: "Rate constant (k)",
            def: "The proportionality constant in the rate law. Its value depends on temperature (it increases with temperature) but is independent of concentration.",
          },
          {
            term: "Reaction order",
            def: "The exponent on a reactant's concentration in the rate law. It describes how sensitive the rate is to that concentration. Determined by experiment, not from stoichiometry.",
          },
        ],
        traps: [
          "Reading reaction orders directly from the balanced equation — this is the most common kinetics error. The exponents in a rate law reflect the reaction mechanism, not the overall stoichiometry. For example, 2 NO₂ → 2 NO + O₂ is experimentally second-order in NO₂, but that happens to equal the coefficient; for other reactions they do not match.",
        ],
        example: null,
      },
      {
        title: "Method of Initial Rates: Determining Orders from Data",
        subtitle: "Isolate one variable, compare rates, solve for the exponent",
        body: "To find the order with respect to reactant A, choose two experiments in which [A] differs but all other concentrations are held constant. Divide one rate by the other: the ratio of rates equals the ratio of concentrations raised to the power m. Solving for m gives the order. If doubling [A] leaves the rate unchanged, m = 0; if the rate doubles, m = 1; if the rate quadruples, m = 2. Repeat for each reactant. Once all orders are known, substitute any one experiment's data into rate = k[A]^m[B]^n and solve for k.",
        keyIdea: "Double [A], observe rate change: ×1 → 0th order; ×2 → 1st order; ×4 → 2nd order.",
        terms: [
          {
            term: "Method of initial rates",
            def: "The experimental technique in which the initial rate is measured with only one reactant concentration varying at a time, allowing each order to be determined in isolation.",
          },
          {
            term: "Initial rate",
            def: "The reaction rate measured at the very start of the reaction (time ≈ 0), before significant concentrations have changed.",
          },
        ],
        traps: [
          "Forgetting to check that only one concentration changed between the two experiments you compare — if two concentrations both changed, you cannot isolate a single exponent.",
        ],
        example:
          "In three experiments: Exp 1: [A]=0.10 M, rate=2.0×10⁻³ M/s; Exp 2: [A]=0.20 M, rate=8.0×10⁻³ M/s. Rate ratio = 8.0/2.0 = 4; concentration ratio = 0.20/0.10 = 2. Since 2^m = 4, m = 2. The reaction is second-order in A.",
      },
      {
        title: "Integrated Rate Laws: Tracking Concentration Over Time",
        subtitle: "Which graph gives a straight line reveals the order",
        body: "The differential rate law tells us how rate depends on concentration at any instant; the integrated rate law rearranges that to give concentration as a function of time. For a first-order reaction, integrating rate = k[A] gives ln[A] = ln[A]₀ − kt, so a plot of ln[A] versus time is a straight line with slope −k and intercept ln[A]₀. The half-life of a first-order reaction is t₁/₂ = 0.693/k, which is constant (independent of concentration). For a second-order reaction, 1/[A] = 1/[A]₀ + kt, so a plot of 1/[A] versus time is linear with slope +k; the half-life is 1/(k[A]₀) and depends on initial concentration.",
        terms: [
          {
            term: "Integrated rate law",
            def: "The mathematical expression giving concentration as a function of time, obtained by integrating the differential rate law.",
          },
          {
            term: "Half-life (t₁/₂)",
            def: "The time required for a reactant's concentration to fall to half its current value. For a first-order reaction it is constant (= 0.693/k); for second-order it depends on [A]₀.",
          },
        ],
        traps: [
          "Assuming all half-lives are concentration-independent — only first-order half-lives are constant. Second-order half-lives lengthen as the reaction proceeds because [A]₀ decreases.",
        ],
        example: null,
      },
    ],
  },

  {
    lessonId: "honors-chemistry-u5-l3",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 3,
    unitName: "Kinetics and Equilibrium",
    title: "What Equilibrium Actually Means (Rates, Not Amounts)",
    subtitle: "Dynamic equilibrium means forward and reverse rates are equal — not that amounts are equal; pure solids and liquids are excluded",
    overview:
      "Chemical equilibrium is not a static state where the reaction has stopped. It is a dynamic condition in which the forward reaction and the reverse reaction are occurring simultaneously at the same rate, so the net concentrations no longer change. The equilibrium constant Keq is the ratio of products to reactants, each raised to the power of its stoichiometric coefficient. Pure solids and pure liquids are excluded from the Keq expression because their 'concentrations' (more precisely, their activities) are constant at 1. Keq depends only on temperature — changing concentration or pressure shifts the equilibrium position but does not change the value of Keq itself.",
    objectives: [
      "Define dynamic equilibrium in terms of equal forward and reverse reaction rates",
      "Write the Keq expression for any given balanced equation",
      "Explain why pure solids and pure liquids are excluded from the Keq expression",
      "Interpret the magnitude of Keq to predict whether products or reactants predominate at equilibrium",
    ],
    formulas: [
      "Dynamic equilibrium: rate(forward) = rate(reverse)",
      "For aA + bB ⇌ cC + dD:  Keq = [C]^c[D]^d / [A]^a[B]^b",
      "Pure solids and pure liquids (including water as solvent) are excluded from Keq",
    ],
    sections: [
      {
        title: "Dynamic Equilibrium: Rates Are Equal, Not Amounts",
        subtitle: "The reaction has not stopped — it is running equally in both directions",
        body: "When a reversible reaction reaches equilibrium, both the forward and reverse reactions are still occurring continuously. The forward reaction converts reactants to products, and the reverse reaction converts products back to reactants. Equilibrium is reached when these two opposing rates become equal, so the concentrations of all species stop changing over time. This is called dynamic equilibrium because at the molecular level there is constant activity, even though macroscopic concentrations appear frozen. A critical misconception to avoid: equilibrium does not mean that the concentrations of products and reactants are equal to each other. The system can be far to one side — mostly products or mostly reactants — and still be at equilibrium.",
        keyIdea: "Equilibrium = forward rate equals reverse rate (no net change). It does NOT mean [products] = [reactants].",
        terms: [
          {
            term: "Dynamic equilibrium",
            def: "A state in which the forward and reverse reactions occur at equal rates, so macroscopic concentrations remain constant even though the reaction continues at the molecular level.",
          },
          {
            term: "Forward reaction",
            def: "The reaction proceeding from reactants to products (left to right as written).",
          },
          {
            term: "Reverse reaction",
            def: "The reaction proceeding from products to reactants (right to left as written).",
          },
        ],
        traps: [
          "Thinking equilibrium means the reaction has stopped — at equilibrium both the forward and reverse reactions continue. Only the net change in concentration is zero.",
          "Thinking equilibrium means equal concentrations of products and reactants — the system may heavily favor one side. 'Equal' refers to the rates, not the amounts.",
        ],
        example: null,
      },
      {
        title: "The Equilibrium Constant Keq",
        subtitle: "Writing and interpreting the Keq expression",
        body: "For the general equilibrium aA + bB ⇌ cC + dD, the equilibrium constant expression is Keq = [C]^c[D]^d / ([A]^a[B]^b). Each concentration is raised to the power of its stoichiometric coefficient in the balanced equation. This expression is only valid at equilibrium — plug in equilibrium concentrations and the result is a constant at a given temperature. If Keq >> 1 (say, >10³), the equilibrium lies far to the right and products are dominant. If Keq << 1 (say, <10⁻³), the equilibrium lies far to the left and reactants are dominant. Keq is temperature-dependent: changing the temperature changes the value of Keq.",
        terms: [
          {
            term: "Equilibrium constant (Keq)",
            def: "The ratio of product concentrations to reactant concentrations, each raised to the power of its stoichiometric coefficient, evaluated at equilibrium. Depends only on temperature.",
          },
          {
            term: "Reaction quotient (Q)",
            def: "The same ratio as Keq but calculated using concentrations at any point in time (not necessarily equilibrium). Comparing Q to Keq predicts the direction of shift.",
          },
        ],
        traps: [
          "Changing stoichiometric coefficients when writing Keq — use the coefficients exactly as written in the balanced equation. If you multiply the entire equation by 2, Keq becomes Keq².",
        ],
        example: "For N₂ + 3 H₂ ⇌ 2 NH₃:  Keq = [NH₃]² / ([N₂][H₂]³).",
      },
      {
        title: "Why Pure Solids and Pure Liquids Are Excluded",
        subtitle: "Activity = 1 for pure phases, so they contribute no information to Keq",
        body: "The equilibrium constant is rigorously written in terms of thermodynamic activities, not just concentrations. The activity of a pure solid or pure liquid is defined as exactly 1, because its 'concentration' (molar density) is fixed by the substance itself and does not change as the reaction proceeds. Including them would just multiply Keq by a constant — which is absorbed into the constant itself. As a practical rule: omit pure solids and pure liquids (including water when it is the solvent) from the Keq expression. Gases and dissolved solutes (aqueous ions and molecules) do change in amount as the reaction proceeds, so they must be included.",
        keyIdea: "Pure solids and pure liquids have activity = 1 and are excluded from Keq. Gases and aqueous solutes are included.",
        terms: [
          {
            term: "Activity",
            def: "The effective 'chemical concentration' of a species in a thermodynamic sense. Pure solids and pure liquids have activity = 1 by convention.",
          },
          {
            term: "Pure solid / pure liquid",
            def: "A phase whose molar density is fixed; it is excluded from the Keq expression. Examples: CaCO₃(s), H₂O(l) when used as solvent.",
          },
        ],
        traps: [
          "Including solid or liquid concentrations in Keq — a common test error. For example, for CaCO₃(s) ⇌ CaO(s) + CO₂(g), the correct expression is Keq = [CO₂]. Neither solid appears.",
          "Excluding dissolved water (as a solute) — if water is a reactant or product in aqueous solution in stoichiometric amounts that matter, it should be included. The exclusion applies specifically to water as the bulk solvent.",
        ],
        example: null,
      },
    ],
  },

  {
    lessonId: "honors-chemistry-u5-l4",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 4,
    unitName: "Kinetics and Equilibrium",
    title: "How to Predict Which Way a Reaction Will Shift",
    subtitle: "Le Chatelier's principle: equilibrium shifts to oppose stress; Q vs K gives the quantitative direction; catalysts do not shift equilibrium",
    overview:
      "Le Chatelier's principle states that when a system at equilibrium is disturbed by an external stress, the equilibrium shifts in the direction that partially offsets the stress. Concentration changes, pressure/volume changes (for gases), and temperature changes all create stresses. The reaction quotient Q provides a quantitative way to predict the direction of shift: compare Q to K. Only a temperature change alters the value of Keq itself; concentration and pressure changes shift the position but leave Keq unchanged. A catalyst speeds up both the forward and reverse reactions equally, so it shortens the time to reach equilibrium without shifting the position at all.",
    objectives: [
      "Apply Le Chatelier's principle to predict equilibrium shift direction for concentration, pressure, and temperature stresses",
      "Use the Q vs K comparison to quantitatively predict the direction of shift",
      "Distinguish which stresses change the equilibrium position versus which change the value of Keq",
      "Explain why a catalyst does not shift the equilibrium position",
    ],
    formulas: [
      "Q < K → reaction shifts forward (to the right)",
      "Q > K → reaction shifts in reverse (to the left)",
      "Q = K → system is already at equilibrium; no net shift",
      "Only temperature change alters the value of Keq",
      "Catalyst: decreases time to reach equilibrium; does not change position or Keq",
    ],
    sections: [
      {
        title: "Le Chatelier's Principle",
        subtitle: "When equilibrium is disturbed, it shifts to reduce the disturbance",
        body: "Le Chatelier's principle is a qualitative rule for predicting how an equilibrium system responds to a stress. For concentration: adding more of a reactant shifts the equilibrium toward the products (forward shift); removing a product also shifts it forward (because the system tries to replace what was removed). For pressure and volume (gas-phase reactions): decreasing volume (increasing pressure) favors the side with fewer moles of gas, because reducing the number of gas molecules partially counteracts the pressure increase. For temperature: increasing temperature favors the endothermic direction (the system absorbs some of the added heat), and decreasing temperature favors the exothermic direction.",
        keyIdea: "Le Chatelier: the equilibrium shifts in the direction that partially offsets the applied stress.",
        terms: [
          {
            term: "Le Chatelier's principle",
            def: "If a system at equilibrium is subjected to an external stress (change in concentration, pressure, or temperature), the equilibrium shifts in the direction that partially relieves that stress.",
          },
          {
            term: "Equilibrium shift",
            def: "The net change in the direction of the reaction that occurs when an equilibrium is disturbed, until a new equilibrium is established.",
          },
        ],
        traps: [
          "Claiming that adding an inert gas (at constant volume) shifts equilibrium — it does not. Adding an inert gas increases total pressure but does not change the partial pressures or concentrations of the reactants and products, so Q is unchanged and no shift occurs.",
          "Mixing up the temperature effect direction — for an endothermic reaction, raising temperature shifts equilibrium toward products (more product formed); for an exothermic reaction, raising temperature shifts it toward reactants (Keq decreases).",
        ],
        example:
          "For N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)  ΔH = −92 kJ (exothermic): adding N₂ shifts right; removing NH₃ shifts right; decreasing volume shifts right (4 moles gas → 2 moles gas); raising temperature shifts left (exothermic, so heat is a 'product').",
      },
      {
        title: "Q vs K: Quantitative Direction Prediction",
        subtitle: "Calculate Q from current concentrations, compare to K, and you know which way to go",
        body: "The reaction quotient Q is calculated using the same expression as Keq, but with actual concentrations at any given moment rather than equilibrium concentrations. When Q is compared to K, three outcomes are possible. If Q < K, the ratio of products to reactants is smaller than it is at equilibrium, meaning more product must form — the reaction proceeds forward. If Q > K, there are too many products relative to equilibrium, so the reaction runs in reverse. If Q = K, the system is already at equilibrium and no net change occurs. This comparison is the quantitative backbone behind Le Chatelier's qualitative predictions.",
        keyIdea: "Q < K → shift right; Q > K → shift left; Q = K → equilibrium.",
        terms: [
          {
            term: "Reaction quotient (Q)",
            def: "The product-to-reactant concentration ratio (same formula as Keq) calculated at any point in time, not necessarily at equilibrium. Used to predict the direction of shift.",
          },
        ],
        traps: [
          "Confusing Q and K — K is a constant (at fixed temperature) evaluated at equilibrium; Q changes continuously as the reaction proceeds. Only when Q = K has equilibrium been reached.",
        ],
        example: "For a reaction with K = 10: if Q = 2, then Q < K, so the reaction shifts forward to produce more products until Q = K = 10.",
      },
      {
        title: "Temperature vs Concentration/Pressure: What Actually Changes Keq",
        subtitle: "Only temperature changes the value of Keq itself; catalysts do neither",
        body: "It is essential to distinguish between shifting the equilibrium position and changing the value of Keq. Adding or removing a reactant or product, or compressing a gas-phase equilibrium, changes Q without changing K, causing a shift until Q returns to K. In contrast, changing the temperature changes the rate constants of the forward and reverse reactions by different amounts (because the activation energies differ), which changes the ratio of these rates at equilibrium — meaning Keq itself has a new value. For an exothermic reaction, raising temperature decreases Keq; for an endothermic reaction, raising temperature increases Keq. A catalyst, as discussed in Lesson 1, lowers Ea equally for both directions, so both rates increase by the same factor and Keq is unchanged — only the time to reach equilibrium decreases.",
        keyIdea: "Only temperature changes Keq. Concentration/pressure changes shift position but not Keq. A catalyst changes neither position nor Keq.",
        terms: [
          {
            term: "Temperature dependence of Keq",
            def: "Because changing temperature affects the forward and reverse rate constants differently, Keq changes with temperature. Exothermic reactions have smaller Keq at higher temperatures.",
          },
          {
            term: "Catalyst",
            def: "Lowers Ea equally for both the forward and reverse reactions, increasing both rates by the same factor. Equilibrium is reached faster, but the position and Keq value are unchanged.",
          },
        ],
        traps: [
          "Thinking concentration or pressure changes alter Keq — they do not. They shift position (change Q) until Q returns to the same K value.",
          "Claiming a catalyst shifts the equilibrium position — it does not. It only accelerates the rate at which equilibrium is reached.",
        ],
        example: null,
      },
    ],
  },

  {
    lessonId: "honors-chemistry-u5-l5",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 5,
    lessonNum: 5,
    unitName: "Kinetics and Equilibrium",
    title: "Acid-Base Equilibrium: What pH Really Measures",
    subtitle: "pH is the logarithmic scale for [H⁺] — weak acids require an ICE table, and the 5% approximation must always be verified",
    overview:
      "Acid-base equilibria are a special case of chemical equilibrium governed by Ka (for weak acids) and Kb (for weak bases). pH = −log[H⁺] is a logarithmic measure of hydrogen ion concentration; a one-unit decrease in pH corresponds to a tenfold increase in [H⁺]. At 25 °C, water autoionizes with Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴, giving pH + pOH = 14. Strong acids dissociate completely in water ([H⁺] ≈ initial acid concentration), so pH is trivial to calculate. Weak acids dissociate only partially, requiring an ICE table (Initial–Change–Equilibrium) to solve for [H⁺]; the small-x approximation that simplifies the algebra must be validated using the 5% rule.",
    objectives: [
      "Write Ka and Kb expressions for weak acids and bases",
      "Apply the relationships pH = −log[H⁺], pOH = −log[OH⁻], and pH + pOH = 14",
      "Contrast the dissociation of strong versus weak acids and explain why pH of a weak acid cannot be found from the initial concentration alone",
      "Set up and solve an ICE table for a weak acid, apply the small-x approximation, and verify it with the 5% rule",
    ],
    formulas: [
      "pH = −log[H⁺]   pOH = −log[OH⁻]",
      "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (at 25 °C)   →   pH + pOH = 14",
      "Ka = [H⁺][A⁻] / [HA]   (weak acid dissociation equilibrium constant)",
      "Small-x approximation: x ≈ √(Ka × [HA]₀); valid only if x/[HA]₀ ≤ 5%",
    ],
    sections: [
      {
        title: "The pH Scale and Water's Autoionization",
        subtitle: "A logarithmic ruler for [H⁺], anchored by Kw",
        body: "pH is defined as −log[H⁺], where [H⁺] is the molar concentration of hydrogen ions (hydronium ions, H₃O⁺) in solution. Because the scale is logarithmic, each one-unit decrease in pH corresponds to a tenfold increase in [H⁺]. At 25 °C, pure water autoionizes: H₂O(l) ⇌ H⁺(aq) + OH⁻(aq), with Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴. In neutral water [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, giving pH = 7. Acidic solutions have [H⁺] > 10⁻⁷ M and pH < 7; basic solutions have [H⁺] < 10⁻⁷ M and pH > 7. Because pH + pOH = 14, knowing one tells you the other.",
        terms: [
          {
            term: "pH",
            def: "Negative base-10 logarithm of the hydrogen ion concentration: pH = −log[H⁺]. A lower pH means a more acidic solution.",
          },
          {
            term: "pOH",
            def: "Negative base-10 logarithm of the hydroxide ion concentration: pOH = −log[OH⁻]. Related to pH by pH + pOH = 14 at 25 °C.",
          },
          {
            term: "Ion-product constant of water (Kw)",
            def: "The equilibrium constant for the autoionization of water: Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C.",
          },
          {
            term: "Autoionization",
            def: "The self-ionization of water: H₂O ⇌ H⁺ + OH⁻. This occurs in every aqueous solution, establishing the Kw relationship.",
          },
        ],
        traps: [
          "Thinking a pH of 6 is 'slightly acidic' in the same sense as pH 5.9 — because the scale is logarithmic, pH 6 has [H⁺] = 10 times that of pH 7 (neutral). Small differences in pH represent large differences in acidity.",
          "Applying pH + pOH = 14 at temperatures other than 25 °C — Kw is temperature-dependent. At body temperature (~37 °C), Kw is slightly larger, so neutral pH is slightly below 7. The problem will usually specify the temperature or imply 25 °C.",
        ],
        example:
          "Find [OH⁻] and pOH when pH = 3.00 (25 °C). [H⁺] = 10⁻³·⁰⁰ = 1.0 × 10⁻³ M. [OH⁻] = Kw/[H⁺] = (1.0 × 10⁻¹⁴)/(1.0 × 10⁻³) = 1.0 × 10⁻¹¹ M. pOH = −log(1.0 × 10⁻¹¹) = 11.00. Check: pH + pOH = 3.00 + 11.00 = 14.00 ✓.",
      },
      {
        title: "Strong Acids vs Weak Acids",
        subtitle: "Complete versus partial dissociation — two completely different pH calculations",
        body: "A strong acid (such as HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄) dissociates essentially completely in water: HA → H⁺ + A⁻. Therefore [H⁺] equals the initial concentration of the acid, and pH = −log[initial acid]. No equilibrium calculation is needed. A weak acid (such as acetic acid CH₃COOH, hydrofluoric acid HF, or carbonic acid H₂CO₃) dissociates only partially: HA ⇌ H⁺ + A⁻, with an equilibrium constant Ka. Because only a fraction of the acid dissociates, [H⁺] is much less than the initial acid concentration, and Ka — not the initial concentration — governs the actual [H⁺] at equilibrium. The larger Ka, the more the acid dissociates and the lower the pH for a given concentration.",
        keyIdea: "Strong acid: complete dissociation → [H⁺] = initial [HA]. Weak acid: partial dissociation → must solve equilibrium using Ka.",
        terms: [
          {
            term: "Acid dissociation constant (Ka)",
            def: "The equilibrium constant for the ionization of a weak acid: Ka = [H⁺][A⁻] / [HA]. A larger Ka means a stronger weak acid (more dissociation).",
          },
          {
            term: "Base dissociation constant (Kb)",
            def: "The equilibrium constant for the ionization of a weak base: Kb = [BH⁺][OH⁻] / [B].",
          },
          {
            term: "Strong acid",
            def: "An acid that dissociates essentially 100% in dilute aqueous solution. Examples: HCl, HNO₃, H₂SO₄, HBr, HI, HClO₄.",
          },
          {
            term: "Weak acid",
            def: "An acid that only partially dissociates in water, establishing a dissociation equilibrium described by Ka. Examples: CH₃COOH, HF, H₂CO₃.",
          },
        ],
        traps: [
          "Using [H⁺] = initial concentration for a weak acid — only valid for strong acids. For weak acids, [H⁺] << initial concentration, so an equilibrium calculation is required.",
        ],
        example: null,
      },
      {
        title: "The ICE Table and the 5% Rule for Weak Acids",
        subtitle: "Set up the equilibrium systematically, approximate carefully, and always verify",
        body: "To find [H⁺] from a weak acid HA with initial concentration C and dissociation constant Ka, set up an ICE table: Initial: [HA] = C, [H⁺] = 0 (ignoring the tiny autoionization contribution), [A⁻] = 0. Change: [HA] decreases by x, [H⁺] increases by x, [A⁻] increases by x. Equilibrium: [HA] = C − x, [H⁺] = x, [A⁻] = x. Substituting into Ka = [H⁺][A⁻]/[HA] gives Ka = x²/(C − x). If x is much smaller than C, the denominator ≈ C and x ≈ √(Ka·C). But this approximation is only valid if the amount dissociated is negligible compared to the initial concentration. The 5% rule: calculate x/C × 100%; if this is ≤ 5%, the approximation is valid. If it exceeds 5%, the full quadratic x² + Ka·x − Ka·C = 0 must be solved for x.",
        keyIdea: "Weak acid ICE table gives x ≈ √(Ka·C). Always verify: if x/C > 5%, solve the quadratic instead.",
        terms: [
          {
            term: "ICE table",
            def: "A systematic table listing Initial concentrations, Changes in concentration (expressed in terms of the variable x), and Equilibrium concentrations, used to set up equilibrium calculations.",
          },
          {
            term: "5% rule",
            def: "The validity check for the small-x approximation: if x/[HA]₀ × 100% ≤ 5%, the approximation is acceptable; if it exceeds 5%, the quadratic must be solved.",
          },
        ],
        traps: [
          "Applying the small-x approximation and forgetting to check the 5% rule — if x/C > 5%, the approximation introduces significant error and the quadratic must be used.",
          "Leaving out the ICE table and setting [H⁺] = initial acid concentration for a weak acid — this is the strong-acid shortcut and gives a pH that is far too low for weak acids.",
        ],
        example:
          "Find the pH of 0.10 M acetic acid (Ka = 1.8 × 10⁻⁵). ICE: x² / (0.10 − x) ≈ x² / 0.10 = 1.8 × 10⁻⁵ → x = √(1.8 × 10⁻⁶) = 1.34 × 10⁻³ M. Check 5% rule: (1.34 × 10⁻³ / 0.10) × 100% = 1.34% ≤ 5% ✓. pH = −log(1.34 × 10⁻³) = 2.87.",
      },
    ],
  },
];
