/**
 * Core Notes English version — IB Chemistry Unit 6 (Chemical Kinetics / Reaction Rates).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U6_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u6-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 1,
    unitName: "Chemical Kinetics",
    title: "Defining and Measuring Reaction Rate — Quantifying How Fast a Reaction Goes with Δ[concentration]/Δt",
    subtitle: "Moving beyond the intuition that a reaction is 'fast' or 'slow' — dividing concentration change by time gives the quantitative language of rate",
    overview:
      "An explosion happens in an instant, while iron takes years to rust. Expressing this difference numerically is the starting point of chemical kinetics. The rate of reaction is defined as the decrease in reactant concentration or the increase in product concentration per unit time, with units of mol dm⁻³ s⁻¹. Mathematically: rate = −Δ[reactant]/Δt = +Δ[product]/Δt. The sign convention matters — reactants decrease, so a negative sign is added to make the rate positive. On IB exams, reaction rate is measured using various experimental techniques: for reactions that produce gas, by measuring gas volume or mass loss; for reactions that change colour, by tracking absorbance with a colorimeter/spectrophotometer; for reactions where ions are produced or consumed, by measuring conductivity; for acid–base reactions, by measuring pH change. The slope of the tangent to the concentration–time graph gives the instantaneous rate at that moment, while the average over an interval gives the average rate. This lesson fully masters the definition, formula, experimental measurement methods, and graph interpretation of reaction rate.",
    objectives: [
      "Define the rate of reaction as the decrease in reactant concentration or the increase in product concentration per unit time, and explain the sign convention of the formula rate = −Δ[reactant]/Δt = Δ[product]/Δt",
      "Apply the methods of finding the average rate as the slope of a straight line (chord) joining two points and the instantaneous rate as the slope of the tangent at a point on a concentration–time graph",
      "Explain the reaction-rate measurement techniques used in IB experiments — gas volume measurement, mass loss, colorimeter, conductivity measurement, pH change — together with the principle of each and the type of reaction it suits",
      "Explain why the reaction rate generally decreases as the reaction proceeds, in terms of the decreasing reactant concentration",
      "Use the rate relationships of species with different stoichiometric coefficients (e.g., rate_A/a = rate_B/b for aA → bB) to calculate the rate of one species from that of another",
    ],
    formulas: [
      "rate = −Δ[reactant]/Δt  (mol dm⁻³ s⁻¹)",
      "rate = +Δ[product]/Δt",
      "instantaneous rate = slope of the tangent to the concentration–time graph",
      "aA → bB: rate_A / a = rate_B / b",
    ],
    sections: [
      {
        title: "Definition and Formula of Reaction Rate",
        subtitle: "Rate at which reactants disappear = rate at which products appear — just be careful with the sign",
        terms: [
          {
            term: "Rate of Reaction",
            def: "The decrease in reactant concentration or the increase in product concentration per unit time. Units: mol dm⁻³ s⁻¹. Reactants are consumed, so Δ[reactant] is negative — to express the rate as positive, a negative sign is placed in front: rate = −Δ[reactant]/Δt. Products are formed, so rate = +Δ[product]/Δt. As the reaction proceeds, reactant concentration decreases and collision frequency falls, so the reaction rate generally decreases over time.",
          },
          {
            term: "Average Rate vs. Instantaneous Rate",
            def: "Average rate: the concentration change between two time points t₁ and t₂ divided by Δt — the slope of the straight line (chord) joining two points on the concentration–time graph. Instantaneous rate: the rate at a specific time t — the slope of the tangent at that point on the concentration–time graph. The slope of the tangent at the start of the reaction (t = 0) is called the initial rate, and is used most frequently in IB experimental analysis.",
          },
          {
            term: "Experimental Methods for Measuring Rate",
            def: "① Gas volume measurement (gas syringe / water displacement): suitable for gas-producing reactions such as CO₂, H₂, O₂. ② Mass loss: for reactions where gas escapes from an open system (e.g., CaCO₃ + HCl → CO₂). ③ Colorimeter / spectrophotometer: measures absorbance change in colour-changing reactions (e.g., bromine decolourisation, the iodine clock reaction). ④ Conductance measurement: for reactions in which ion concentration changes. ⑤ pH measurement: for acid–base reactions. ⑥ Titration: samples are withdrawn at fixed time intervals, quenched, and back-titrated. Each technique exploits a change in an observable physical or chemical property of the reaction.",
          },
          {
            term: "Stoichiometry and Rates",
            def: "In the equation aA + bB → cC + dD, the rate of consumption or formation of each species is proportional to its stoichiometric coefficient. Therefore, dividing the consumption rate of A by a and the consumption rate of B by b gives the same 'reaction rate': rate = −(1/a) Δ[A]/Δt = −(1/b) Δ[B]/Δt = (1/c) Δ[C]/Δt = (1/d) Δ[D]/Δt. On IB Paper 1, avoid the error of ignoring the coefficient ratios and writing the rates as directly equal.",
          },
        ],
        traps: [
          "Omitting the sign convention when defining reaction rate makes the answer wrong. Writing 'the rate of change of reactant concentration' directly gives Δ[reactant]/Δt < 0 (negative), so to express the reaction rate (positive) you must place a negative sign in front: rate = −Δ[reactant]/Δt. On IB Paper 2, writing +Δ[reactant]/Δt for a question that asks you to 'write the formula for reaction rate' is an immediate error.",
          "On a concentration–time graph you must distinguish the slope of the tangent (instantaneous rate) from the slope of the chord joining two points (average rate). If the exam asks for the 'initial rate,' you must draw the tangent at t = 0; using the average slope between two arbitrary points loses marks. The tangent must be a straight line that touches the curve at exactly one point.",
        ],
        example:
          "Experiment: in the reaction of magnesium ribbon with hydrochloric acid, Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g), hydrogen gas was collected in a gas syringe: 0 cm³ at 0 s, 24 cm³ at 30 s, 40 cm³ at 60 s, 52 cm³ at 120 s. Calculate the average reaction rate over the 0–30 s interval in terms of gas volume. Solution: average rate = Δvolume/Δt = (24 − 0) cm³ / (30 − 0) s = 0.80 cm³ s⁻¹. For the 30–60 s interval: (40 − 24) / 30 = 0.53 cm³ s⁻¹. You can confirm that as the reaction proceeds, the surface area of Mg and the concentration of HCl decrease, so the rate falls.",
      },
      {
        title: "Reaction-Rate Experimental Design and Control of Variables",
        subtitle: "For a fair test, change only one variable at a time — the core of the IB IA and Paper 3",
        terms: [
          {
            term: "Control of Variables",
            def: "In a reaction-rate experiment, every dependent and controlled variable (e.g., temperature, surface area, presence of catalyst, solution volume) except the independent variable (the one deliberately changed, e.g., concentration) must be held constant to allow a fair comparison. If the control of variables is not stated in an IB IA (Internal Assessment) report, marks are lost under the Exploration criterion. To improve reproducibility, a minimum of 3 repeat measurements is recommended.",
          },
          {
            term: "Iodine Clock Reaction",
            def: "A reaction between H₂O₂ and I⁻ (iodide ion) in which a deep blue colour appears suddenly at a specific point (the clock time). Principle: sodium thiosulfate (Na₂S₂O₃) reduces the I₂ produced back to I⁻; the instant the Na₂S₂O₃ is exhausted, the remaining I₂ binds with starch and produces the blue colour. The reciprocal (1/t) of the time taken for the blue colour to appear (clock time) is proportional to the initial reaction rate. Experiments that compare 1/t while varying concentration or temperature appear frequently on IB exams.",
          },
        ],
        traps: [
          "In the iodine clock reaction, the measured 'time t' is not the reaction rate. A larger t means a slower reaction, so the relationship rate ∝ 1/t holds. Writing 'the time doubled, so the rate doubled' is exactly backwards — a doubled time means the rate is halved.",
        ],
        example:
          "Iodine clock design and analysis. A student varies only the initial concentration of I⁻ while keeping temperature (25 °C), total volume, and [H₂O₂] constant, and records the time for the blue starch–iodine colour to appear: at 0.020 mol dm⁻³ the clock time t = 40 s, and at 0.040 mol dm⁻³ t = 20 s. Converting to initial rate as 1/t gives 0.025 s⁻¹ and 0.050 s⁻¹ respectively. Doubling [I⁻] doubles 1/t, so the initial rate doubles, showing the reaction is first order in I⁻; note that although t halved, the rate did not halve but doubled, because rate ∝ 1/t. Repeating each concentration three times and averaging the times improves reliability and satisfies the fair-test requirement of the IA.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u6-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 2,
    unitName: "Chemical Kinetics",
    title: "Collision Theory and the Factors Affecting Reaction Rate",
    subtitle: "A reaction occurs only when molecules collide with enough energy and in the correct orientation — collision theory ties every rate variable together",
    overview:
      "Why does increasing concentration speed up a reaction? Why does raising the temperature speed it up even more? The answer to all these questions is collision theory. According to collision theory, two conditions must be met simultaneously for a reaction to occur: ① the reactant particles must collide (collision frequency), ② the colliding particles must have energy at least equal to the minimum, the activation energy (activation energy, Eₐ) (energy threshold), and ③ the collision must occur in the correct geometric orientation. Therefore, the ways to increase reaction rate are to (a) increase the frequency of effective collisions, or (b) increase the proportion of effective collisions. Increasing concentration and pressure (gases) and increasing surface area act mainly through (a), while raising temperature affects both (a) and (b) but produces a dramatic rate increase especially through (b). On IB Paper 2, extended-response questions asking you to 'explain, using collision theory, the effect of a given change of conditions on the reaction rate' appear very frequently. This lesson develops the ability to state precisely the three conditions of collision theory and which aspect of collision theory each variable (concentration, pressure, surface area, temperature) acts upon.",
    objectives: [
      "Explain the three conditions of collision theory — collision frequency, collision energy at least equal to the activation energy (energy ≥ Eₐ), and correct molecular orientation — and define the concept of an effective collision",
      "Explain, in the language of collision theory, which aspect (collision frequency or the proportion of effective collisions) is affected by increasing concentration, increasing gas pressure, increasing surface area, and increasing temperature",
      "Explain that raising temperature has a disproportionately large effect on rate because it not only increases collision frequency but also greatly increases the proportion of molecules with energy at or above Eₐ",
      "Apply the IB Paper 2 extended-response marking criteria (use of collision-theory terminology, explicit mention of the three elements of frequency, energy, and orientation) to describe reaction-rate changes accurately",
    ],
    formulas: [
      "effective collisions = collision frequency × (fraction with energy ≥ Eₐ) × (fraction with correct orientation)",
      "rate ∝ frequency of effective collisions",
    ],
    sections: [
      {
        title: "Collision Theory — the Three Conditions for a Reaction to Occur",
        subtitle: "A high frequency alone does not make a reaction fast — the energy threshold and orientation must all line up for an effective collision",
        terms: [
          {
            term: "Collision Theory",
            def: "For a chemical reaction to occur, the following three conditions must be met simultaneously. ① Collision frequency: the reactant particles must collide with one another. ② Energy threshold: the combined kinetic energy of the colliding particles must be at least the activation energy (Eₐ). ③ Molecular orientation: the collision must occur in the correct geometric orientation for a reaction to take place. A collision that satisfies all three conditions is called an effective collision, and the reaction rate is proportional to the number of effective collisions per unit time.",
          },
          {
            term: "Effect of Increasing Concentration",
            def: "Increasing the concentration of a reactant increases the number of particles per unit volume. As the number of particles increases, the number of collisions per unit time (collision frequency) increases. The number of effective collisions therefore also increases and the reaction rate becomes faster. Because the temperature does not change, the energy distribution is unchanged — the fraction of effective collisions does not change; rather the number of collisions themselves increases.",
          },
          {
            term: "Effect of Increasing Pressure for Gases",
            def: "In a gas-phase reaction, increasing the pressure increases the number of gas molecules within the same volume (the inverse of Boyle's law). That is, with the same effect as increasing concentration, the collision frequency increases, the number of effective collisions increases, and the reaction rate becomes faster. The density of solids and liquids is barely affected by pressure changes, so the pressure effect applies only to gas-phase reactions.",
          },
          {
            term: "Effect of Increasing Surface Area",
            def: "Grinding a solid reactant into smaller pieces (e.g., a lump of marble → marble powder) increases the number of particles exposed at the surface. Because the reaction occurs only at the solid surface, a larger surface area widens the region where reactant particles can collide, increasing the collision frequency and speeding up the reaction rate. Processing catalyst pellets into a powder works on the same principle.",
          },
          {
            term: "Effect of Increasing Temperature",
            def: "Raising the temperature produces two effects. ① Increased collision frequency: the average kinetic energy of the molecules rises so they move faster, slightly increasing the number of collisions. ② A sharp increase in the proportion of effective collisions (the more important effect): the Maxwell–Boltzmann distribution shifts toward higher energies, greatly increasing the fraction of molecules with energy at or above Eₐ (fraction with E ≥ Eₐ). As a rule of thumb, a 10 K rise in temperature roughly doubles the reaction rate, and this is mainly due to this second effect.",
          },
        ],
        traps: [
          "When describing the effect of increasing temperature, writing only 'collision frequency increases' earns only half marks in IB marking. You must include the statement that 'the fraction of molecules with energy at or above the activation energy (fraction of molecules with energy ≥ Eₐ) greatly increases.' In reality the increase in collision frequency due to a temperature rise is slight, and the shift in the energy distribution is the main cause. Failing to distinguish these two will always lose marks on a Paper 2 extended response.",
          "Mixing up the explanations for increasing concentration and increasing temperature is wrong. For increasing concentration, 'increased collision frequency' is the key point and the energy distribution does not change. For increasing temperature, 'increased collision frequency + a shift in the energy distribution that raises the fraction above Eₐ' is the key point. Confusing the two mechanisms and writing 'the energy distribution changes' in the explanation for increasing concentration is an error.",
        ],
        example:
          "IB Paper 2 extended-response model answer example: 'Explain, using collision theory, why raising the concentration of hydrochloric acid from 0.5 mol dm⁻³ to 1.0 mol dm⁻³ speeds up the reaction with magnesium.' Model answer: 'Increasing the concentration of hydrochloric acid increases the number of H⁺ ions per unit volume (number of particles per unit volume). As a result, the collision frequency between H⁺ ions and Mg atoms at the Mg surface increases. Because the temperature is constant, the energy distribution does not change, but the number of effective collisions per unit time increases, so the reaction rate becomes faster.' — including all three keywords (concentration/number of particles, collision frequency, effective collisions) earns full marks.",
      },
      {
        title: "A Quantitative Understanding of Temperature and Collision Theory",
        subtitle: "A 10 K rise roughly doubles the rate — the Maxwell–Boltzmann distribution shows why in a picture",
        terms: [
          {
            term: "Temperature and Reaction Rate",
            def: "Experimentally, there is a rule of thumb that a temperature increase of about 10 K roughly doubles the reaction rate. Because this is far greater than the increase in collision frequency (a few percent), the main cause is the sharp increase in the fraction of molecules with energy at or above Eₐ in the Maxwell–Boltzmann distribution. This fraction is approximately proportional to exp(−Eₐ/RT) (the Boltzmann factor of the Arrhenius relationship), and the larger Eₐ is, the more sensitively the reaction responds to temperature change.",
          },
          {
            term: "Importance of Molecular Orientation",
            def: "Even with sufficient energy, a reaction does not occur if the collision orientation is wrong. Example: in an SN2 reaction, the nucleophile must approach from the side 180° opposite to the leaving group. The orientation factor (steric factor or orientation factor) is the proportion of all collisions that occur in the correct orientation, and the smaller this value, the smaller the rate constant of the reaction. At IB DP SL it is treated only qualitatively, but you must clearly explain that without the correct orientation a collision cannot be effective.",
          },
        ],
        traps: [
          "When explaining the temperature effect with collision theory, writing only 'the molecules move faster, so collision frequency increases' earns only partial marks. The IB mark scheme awards full marks only if the statement 'the fraction of molecules with energy at or above the activation energy (Eₐ) increases' is included. Emphasise that the main cause of the rate increase is the change in the energy distribution.",
        ],
        example:
          "Estimating the temperature effect quantitatively. Using the '10 K rise roughly doubles the rate' rule of thumb, predict how much faster a reaction runs when the temperature is raised from 25 °C (298 K) to 55 °C (328 K). The increase is 30 K, which is three successive 10 K steps, so the rate multiplies by 2 × 2 × 2 = 8 — roughly an eightfold increase. Collision frequency, which rises only in proportion to the square root of absolute temperature (√(328/298) ≈ 1.05, about 5 %), cannot account for this; the dominant cause is the sharp rise in the Boltzmann factor exp(−Eₐ/RT), i.e. the fraction of molecules with energy ≥ Eₐ. This confirms that the shift of the Maxwell–Boltzmann distribution, not the small change in collision frequency, drives the large rate increase.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u6-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 6,
    lessonNum: 3,
    unitName: "Chemical Kinetics",
    title: "Maxwell–Boltzmann Distribution, Activation Energy, and Catalysts",
    subtitle: "Not every molecule has the same energy — the Maxwell–Boltzmann curve shows that uneven distribution, and a catalyst lowers Eₐ to increase the area beyond it",
    overview:
      "Gas molecules at the same temperature do not all move at exactly the same speed. The energy distribution is represented by the Maxwell–Boltzmann distribution: an asymmetric curve in which few molecules have low energy or very high energy, with the maximum frequency near intermediate energies. In this distribution, only molecules with energy at or above the activation energy (activation energy, Eₐ) can undergo an effective collision and react, and that fraction corresponds to the area under the curve to the right of Eₐ (the shaded area). As temperature rises, the curve flattens and spreads to the right (the peak height decreases and the curve shifts right), and the area to the right of Eₐ greatly increases — this is why a rise in temperature causes a sharp increase in reaction rate. A catalyst provides an alternative pathway for the reaction, lowering the activation energy (Eₐ). When Eₐ is lowered, the effect is the same as the Eₐ reference line moving to the left in the Maxwell–Boltzmann distribution, so the fraction of molecules able to react increases. Importantly, a catalyst does not affect the enthalpy change (ΔH) of the reaction; it only raises the rate. This lesson completes the ability to draw and interpret the Maxwell–Boltzmann distribution curve accurately, and to explain the role of a catalyst using both an energy profile diagram and the Maxwell–Boltzmann curve.",
    objectives: [
      "Draw the Maxwell–Boltzmann distribution curve correctly (y-axis: number of molecules/frequency, x-axis: energy; passing through the origin, rising to a maximum then decreasing asymptotically, with a constant total area under the curve), and explain that the area to the right of the Eₐ reference line is the fraction of molecules able to react",
      "Draw and describe in words how the Maxwell–Boltzmann curve changes when temperature increases (the peak lowers and shifts to the right, the total area is unchanged, and the area beyond Eₐ increases)",
      "Represent, with an energy profile diagram (two curves, with and without a catalyst), that a catalyst provides an alternative reaction pathway with a lower Eₐ, and link this to the increased fraction of molecules able to react in the Maxwell–Boltzmann distribution",
      "Confirm, using an energy profile diagram, that a catalyst increases the rate of the reaction but does not change the ΔH or the energy levels of the reactants and products",
      "Define a homogeneous catalyst and a heterogeneous catalyst and give an example of each (homogeneous: H⁺(aq); heterogeneous: Fe in the Haber process, Pt in a catalytic converter)",
    ],
    formulas: [
      "fraction of molecules above Eₐ ∝ exp(−Eₐ / RT)  (Boltzmann factor, for qualitative SL-level understanding)",
      "with a catalyst: Eₐ(catalysed) < Eₐ(uncatalysed), ΔH unchanged",
    ],
    sections: [
      {
        title: "Maxwell–Boltzmann Distribution — the Uneven Distribution of Molecular Energy",
        subtitle: "Not every molecule has the average energy — the area under the curve is the number of molecules, and the area to the right of Eₐ is the molecules able to react",
        terms: [
          {
            term: "Maxwell–Boltzmann Distribution",
            def: "A probability distribution curve representing the distribution of energy (or speed) of gas molecules at a fixed temperature. Key features: ① starts at the origin (0,0) (no molecule has energy = 0). ② asymmetric: the right-hand tail is longer than the left, so the most probable energy < the mean energy. ③ the total area under the curve = the total number of molecules (area is conserved). ④ approaches the x-axis asymptotically (asymptote): a small number of molecules have very high energy. y-axis label: 'number of molecules' or 'frequency'; x-axis label: 'energy / kinetic energy'. After drawing a vertical line at the activation energy (Eₐ), the area under the curve to its right (E ≥ Eₐ) = the number of molecules able to react.",
          },
          {
            term: "Effect of Temperature on the MB Distribution",
            def: "Raising the temperature from T₁ to T₂ (> T₁): ① the peak lowers and shifts to the right (toward higher energy). ② the curve becomes flatter and broader. ③ the total area under the curve does not change — the number of molecules has not changed, only the energy distribution. ④ the area to the right of the Eₐ reference line (E ≥ Eₐ) greatly increases — the fraction of molecules able to react rises sharply. This is why the reaction rate increases disproportionately when the temperature rises.",
          },
          {
            term: "Eₐ and the MB Distribution",
            def: "When the activation energy Eₐ is marked as a vertical line on the Maxwell–Boltzmann curve, the shaded area under the curve to the right of Eₐ represents the 'fraction of molecules able to react.' The lower Eₐ is (a catalyst effect), the larger this area; the higher the temperature, the larger this area. Both effects increase the proportion of effective collisions and so increase the reaction rate. On IB Paper 2, questions asking you to mark and explain this shaded area directly on the graph appear.",
          },
        ],
        traps: [
          "On a Maxwell–Boltzmann curve, the total area under the curve does not change even as temperature rises. The reason the higher-temperature T₂ curve is lower and more spread out than T₁ is precisely this conservation of area. On the exam, writing 'the number of molecules increases as temperature rises,' or drawing the peak of the T₂ curve higher than that of T₁, is wrong. The higher-temperature curve must lie lower and farther to the right, and the areas under the two curves must be equal.",
          "On the Maxwell–Boltzmann curve, the x-axis is energy, not speed — IB chemistry uses the energy-distribution version (the speed-distribution version is for IB physics). The y-axis label must also be 'number of molecules' or 'frequency'; writing 'probability' may lose marks. The graph must pass through the origin (0,0); drawing a graph whose y-intercept is not 0 loses marks immediately.",
        ],
        example:
          "IB Paper 2 graph interpretation example: at the same temperature T, compare reaction A (Eₐ = 50 kJ mol⁻¹) and reaction B (Eₐ = 100 kJ mol⁻¹) by drawing Eₐ vertical lines on the same Maxwell–Boltzmann distribution curve. The shaded area to the right of the Eₐ = 50 kJ mol⁻¹ line (reaction A) is much larger than that of Eₐ = 100 kJ mol⁻¹ (reaction B). Therefore, at the same temperature, the reaction rate of A is much faster than that of B. Now raise the temperature from T to T′ (T′ > T): the T′ curve lies lower and farther to the right than the T curve, and the shaded area for reaction B (higher Eₐ) increases by a greater proportion than for reaction A — a reaction with a higher Eₐ responds more sensitively to a temperature rise.",
      },
      {
        title: "Catalysts — an Alternative Reaction Pathway that Lowers Eₐ",
        subtitle: "A catalyst does not change ΔH, it only lowers Eₐ — on the energy profile only the peak height is reduced",
        terms: [
          {
            term: "Catalyst",
            def: "A substance that speeds up the rate of a reaction but is not consumed by the end of the reaction. A catalyst provides an alternative reaction pathway with a lower activation energy (lower Eₐ). On an energy profile diagram, with a catalyst the maximum energy of the transition state is lowered. As a result, the fraction of molecules with energy at or above Eₐ in the Maxwell–Boltzmann distribution increases, so effective collisions increase and the reaction rate becomes faster. Important: a catalyst does not change the energy levels of the reactants and products, so ΔH stays the same.",
          },
          {
            term: "Homogeneous and Heterogeneous Catalysts",
            def: "Homogeneous catalyst: a catalyst in the same phase as the reactants. Examples: H⁺(aq) in an aqueous acid–base reaction, H₂SO₄(aq) in an esterification reaction. Heterogeneous catalyst: a catalyst in a different phase from the reactants. Examples: the Fe(s) catalyst of the Haber process (N₂, H₂ are gases), the Pt/Rh(s) of an automobile catalytic converter (the exhaust gases are gases), Ni(s) in a hydrogenation reaction. A heterogeneous catalyst operates mainly by a mechanism in which gaseous reactants are adsorbed onto the surface (adsorption) and react there.",
          },
          {
            term: "Energy Profile with a Catalyst",
            def: "On an energy profile diagram, compare the uncatalysed case (a single high peak) with the catalysed case (a lower peak — in some cases a two-step peak). Key changes: ① the transition-state energy level falls → Eₐ(catalysed) < Eₐ(uncatalysed). ② the energy levels of the reactants and products are identical → ΔH unchanged. Thus a catalyst lowers only the 'peak height' of the energy profile diagram while keeping the 'start and end points' the same.",
          },
        ],
        traps: [
          "A catalyst does not change ΔH. On IB Paper 2, when describing 'why using a catalyst speeds up the reaction rate,' writing 'because less energy is needed' or 'because more heat is released' is wrong. The correct explanation is 'the catalyst provides an alternative reaction pathway with a lower Eₐ, so the fraction of molecules with energy at or above Eₐ in the Maxwell–Boltzmann distribution increases.' ΔH is determined by the energy difference between reactants and products, and a catalyst does not change these two levels themselves.",
          "When explaining the catalyst effect on the Maxwell–Boltzmann distribution, the curve itself does not change. Even with a catalyst, if the temperature is unchanged the energy-distribution curve stays the same, and the effect is the same as the Eₐ reference line (vertical line) moving to the left. Writing 'the catalyst shifts the Maxwell–Boltzmann curve to the right' is wrong — the curve stays the same and it is the reference line (Eₐ) that is lowered.",
        ],
        example:
          "Energy profile diagram comparison problem: for the reaction X → Y, the energy profile without a catalyst had Eₐ = 120 kJ mol⁻¹ and ΔH = −80 kJ mol⁻¹. With a catalyst, Eₐ(catalysed) = 75 kJ mol⁻¹. ① Draw both energy profiles, with and without a catalyst, on the same graph. ② Find the Eₐ of the reverse reaction after using the catalyst. Solution: ① Graph: in both cases the reactant energy level (start point) and the product energy level (end point, 80 kJ below the reactants) are identical. Without a catalyst: the transition state is 120 kJ above the reactants. With a catalyst: the transition state is 75 kJ above the reactants (a lower peak). ② Reverse-reaction Eₐ(catalysed): the activation energy of the reverse reaction = Eₐ(catalysed) − ΔH = 75 − (−80) = 155 kJ mol⁻¹. (The reverse reaction is endothermic, so the energy from products to the transition state is larger.) Conclusion: a catalyst lowers the Eₐ of both the forward and reverse reactions by the same amount (45 kJ), and ΔH = −80 kJ mol⁻¹ does not change.",
      },
    ],
  },
];
