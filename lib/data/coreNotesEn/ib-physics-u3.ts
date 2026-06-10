/**
 * Core Notes English version — IB Physics (DP) Unit 3 (Thermal Physics).
 * Covers temperature, internal energy, specific heat capacity, latent heat,
 * and kinetic theory of gases per the IB DP Physics curriculum.
 * All objectives, terms, traps, formulas, and examples preserved at full depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u3-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 3,
    lessonNum: 1,
    unitName: "Thermal Physics",
    title: "Temperature, Internal Energy & Thermal Equilibrium — What Is Heat?",
    subtitle:
      "Distinguish temperature from thermal energy, understand the meaning of the absolute (Kelvin) temperature scale, and identify the conditions for thermal equilibrium",
    overview:
      "The starting point of thermal physics is the recognition that 'temperature' and 'heat' are not the same thing. Temperature is a measure of the average random kinetic energy of particles, while heat is the transfer of energy between two objects due to a temperature difference. IB Physics demands this distinction rigorously. Internal energy is the total of all the random kinetic energies and intermolecular potential energies of every particle in an object. To build a solid foundation in thermodynamics you also need a precise understanding of the Kelvin temperature scale and the concept of thermal equilibrium. Questions designed to confuse these three ideas appear consistently on IB Paper 1 and Paper 2.",
    objectives: [
      "Define temperature as a measure of the average random kinetic energy of particles and clearly distinguish it from heat (energy transfer) and internal energy",
      "Convert between Celsius and Kelvin using T(K) = T(°C) + 273",
      "Explain the physical meaning of absolute zero (0 K) in terms of molecular motion",
      "State the definition of thermal equilibrium and apply the Zeroth Law of Thermodynamics to compare the temperatures of two objects",
    ],
    formulas: [
      "T(K) = T(°C) + 273",
      "Zeroth Law: if A⇌C and B⇌C then A⇌B (⇌ denotes thermal equilibrium)",
      "Internal energy U = sum of all particles' E_k + E_p",
    ],
    sections: [
      {
        title: "Temperature, Heat & Internal Energy — Distinguishing the Three Concepts",
        subtitle:
          "Clarify the difference between everyday language and physics language, and master the precise definitions required by IB exams",
        terms: [
          {
            term: "Temperature",
            def: "A measure of the average random kinetic energy of the particles that make up an object. Measured in kelvin (K) or degrees Celsius (°C). The higher the temperature, the faster the particles move randomly. Temperature is an intensive quantity — it does not change when more mass of the same substance is added.",
          },
          {
            term: "Internal Energy (U)",
            def: "The sum of the random kinetic energies of all particles in an object and the intermolecular potential energies between them. For an ideal gas there are no intermolecular attractions, so internal energy equals only the sum of kinetic energies. Internal energy is an extensive quantity — it is proportional to the amount of substance, so a larger mass of water at the same temperature has greater internal energy than a smaller mass.",
          },
          {
            term: "Heat (Q)",
            def: "Energy transferred between two objects because of a temperature difference. Heat is not a state quantity but a process quantity — it exists only during the transfer, and once the transfer is complete it becomes part of the internal energy of the receiving object. The expression 'heat stored in an object' is physically incorrect. Q > 0 means the object absorbs heat; Q < 0 means it releases heat.",
          },
          {
            term: "Kelvin Scale and Absolute Zero",
            def: "The Kelvin scale is referenced to absolute zero (0 K = −273.15 °C), the lowest theoretically possible temperature, where all random molecular motion ceases. No temperature below 0 K can exist. Conversion: T(K) = T(°C) + 273 (IB uses 273, not 273.15). The Kelvin temperature must always be used when applying gas laws.",
          },
        ],
        traps: [
          "The most common error on IB exams: writing 'the hotter object contains more heat.' Heat is energy in transit, not something an object possesses. The correct phrasing is 'higher temperature' or 'greater internal energy.' This conceptual error costs marks immediately on Paper 2 extended-response questions.",
          "Forgetting to convert Celsius to Kelvin is a fatal mistake in gas-law problems. For example, if T₁ = 27 °C = 300 K and T₂ = 127 °C = 400 K, the ratio T₂/T₁ = 4/3. Using 127/27 ≈ 4.7 without converting gives a completely different answer. Develop the habit of always converting to Kelvin first whenever temperature appears in a gas-law problem.",
        ],
        example:
          "Applying thermal equilibrium: a 40 °C metal block (mass 200 g) is placed in 20 °C water (mass 500 g). Before calculating the final temperature, first confirm the direction of heat flow — the metal is hotter than the water, so heat transfers from metal to water. When thermal equilibrium is reached, both objects are at the same temperature and net heat transfer stops. At that point 'heat lost by metal = heat gained by water' (conservation of energy), which is the starting equation for the specific heat capacity calculation in Lesson 2.",
      },
      {
        title: "The Zeroth Law of Thermodynamics & Thermal Equilibrium — The Logical Basis for Comparing Temperatures",
        subtitle:
          "Connect the thermal relationships among three objects A, B, C using the Zeroth Law, and understand why thermometers work",
        terms: [
          {
            term: "Thermal Equilibrium",
            def: "The state in which there is no longer any net heat transfer between two objects in thermal contact. At this point both objects are at the same temperature. Thermal equilibrium is a form of dynamic equilibrium — microscopic energy exchanges between particles continue at the molecular level, but the macroscopic net transfer is zero.",
          },
          {
            term: "Zeroth Law of Thermodynamics",
            def: "If object A is in thermal equilibrium with object C, and object B is also in thermal equilibrium with object C, then A and B are in thermal equilibrium with each other. This law justifies how thermometers work — if a thermometer (C) reaches thermal equilibrium with each of two objects (A and B) separately, the temperatures of A and B can be meaningfully compared.",
          },
        ],
        traps: [
          "IB Paper 1 sometimes asks whether the statement 'particles are still moving and exchanging energy when the system is in thermal equilibrium' is true or false. The answer is true. Thermal equilibrium means the macroscopic temperature is equal — it does not mean molecular motion has stopped. Remember: molecular motion is always present unless the temperature is absolute zero.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-physics-u3-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 3,
    lessonNum: 2,
    unitName: "Thermal Physics",
    title: "Specific Heat Capacity & Latent Heat — Quantifying Heat and Temperature Change",
    subtitle:
      "Use Q = mcΔT and Q = mL to calculate heating and phase changes, and read latent-heat plateaux accurately from cooling curves",
    overview:
      "When heat is supplied to an object, either its temperature rises or its state changes. The equation for calculating the heat needed to raise temperature is Q = mcΔT (specific heat capacity), and the equation for calculating the heat needed for a phase change is Q = mL (specific latent heat). The critical insight is that temperature does not change during a phase change — during that interval the heat energy goes into breaking or forming intermolecular bonds rather than increasing molecular kinetic energy. On IB Paper 2, reading heating/cooling curves and extracting specific heat capacity and latent heat values is a perennial question type, and applying the two formulas to the correct interval is the key marking point.",
    objectives: [
      "Define specific heat capacity and use Q = mcΔT to calculate temperature change, heat absorbed, or mass",
      "Define specific latent heat and use Q = mL to calculate the heat required for a phase change",
      "Distinguish the specific-heat-capacity regions from the latent-heat plateaux on a heating curve, and explain the significance of the slope and the flat sections",
      "Apply conservation of thermal energy (Q_lost = Q_gained) to find the final temperature after mixing",
    ],
    formulas: [
      "Q = mcΔT  (temperature-change region)",
      "Q = mL  (phase-change region, ΔT = 0)",
      "Specific heat capacity: c [J kg⁻¹ K⁻¹]",
      "Specific latent heat of fusion: L_f; specific latent heat of vaporisation: L_v",
      "Conservation of thermal energy: Q_lost = Q_gained (mixing problems)",
    ],
    sections: [
      {
        title: "Specific Heat Capacity — Every Material Has a Different Thermal Sensitivity",
        subtitle:
          "Understand why a larger c value means more energy is needed to raise the same mass by the same temperature",
        terms: [
          {
            term: "Specific Heat Capacity (c)",
            def: "The heat energy required to raise 1 kg of a substance by 1 K (or 1 °C). Unit: J kg⁻¹ K⁻¹. The specific heat capacity of water (c ≈ 4200 J kg⁻¹ K⁻¹) is much larger than that of most solids and metals. This is why the ocean changes temperature far more slowly than land, and why water is an ideal coolant. IB questions provide c values, so applying the formula correctly matters more than memorising values.",
          },
          {
            term: "Heat Transferred Q = mcΔT",
            def: "The heat required to change the temperature of mass m [kg] by ΔT [K]: Q = mcΔT. Q positive means heat is absorbed (temperature rises); Q negative means heat is released (temperature falls). ΔT = T_final − T_initial, so pay attention to sign. Because the size of a Kelvin degree equals the size of a Celsius degree, a temperature difference ΔT is numerically the same in both scales — you may use Celsius differences directly in Q = mcΔT.",
          },
          {
            term: "Conservation of Thermal Energy in Mixing",
            def: "When two objects are mixed in an insulated container, the heat lost by the hotter object equals the heat gained by the cooler object: m₁c₁ΔT₁ = m₂c₂ΔT₂. This holds when heat loss to the surroundings is negligible. In IB problems the condition 'adiabatic container' or 'heat losses neglected' signals this assumption.",
          },
        ],
        traps: [
          "A common error in mixing problems is mishandling the sign of ΔT. The hotter object cools, so ΔT₁ = T_f − T_i < 0; the cooler object warms, so ΔT₂ = T_f − T_i > 0. When writing Q_lost = Q_gained, treat both sides as positive (absolute values), or use the signed equation m₁c₁(T_f − T₁) + m₂c₂(T_f − T₂) = 0. Pick one approach and apply it consistently.",
          "Whether a Kelvin conversion is needed for ΔT: when computing a difference, Celsius and Kelvin give identical results because the degree size is the same. However, if a gas-law expression involving a temperature ratio T₂/T₁ is mixed into the problem, Kelvin is mandatory. For pure specific-heat problems, Celsius differences can be used directly.",
        ],
        example:
          "Mixing problem: a 0.5 kg metal block at 80 °C (c = 400 J kg⁻¹ K⁻¹) is placed in 1.0 kg of water at 20 °C (c = 4200 J kg⁻¹ K⁻¹). Find the final temperature T_f. Conservation of energy: 0.5 × 400 × (80 − T_f) = 1.0 × 4200 × (T_f − 20). 200(80 − T_f) = 4200(T_f − 20). 16000 − 200T_f = 4200T_f − 84000. 100000 = 4400T_f → T_f ≈ 22.7 °C. Because the specific heat capacity of the metal is far smaller than that of water, the final temperature barely shifts above water's initial temperature of 20 °C — an intuitively satisfying result.",
      },
      {
        title: "Latent Heat & Phase Changes — Temperature Stays Constant While Energy Still Flows",
        subtitle:
          "Understand the mechanism by which heat is used to change intermolecular bonding during the flat plateau sections of a heating curve",
        terms: [
          {
            term: "Specific Latent Heat (L)",
            def: "The heat energy required to change the state of 1 kg of a substance at constant temperature. Unit: J kg⁻¹. Specific latent heat of fusion (L_f): solid ↔ liquid. Specific latent heat of vaporisation (L_v): liquid ↔ gas. In general L_v ≫ L_f because far more energy is needed to vaporise than to melt. In Q = mL the temperature is constant, so ΔT = 0.",
          },
          {
            term: "Heating/Cooling Curve",
            def: "A graph of temperature versus time as a constant rate of heat is supplied to (or removed from) a substance. Sloped regions: temperature is changing → apply Q = mcΔT. Flat (plateau) regions: phase change occurring → apply Q = mL. The steepness of a slope is inversely proportional to the specific heat capacity. IB Paper 2 frequently asks students to compare specific heat capacities from the gradient of sloped regions, or compare latent heats from the length of plateau regions.",
          },
          {
            term: "Molecular Interpretation of Phase Changes",
            def: "During a phase change, the heat supplied is used to do work against intermolecular forces — breaking bonds — rather than increasing molecular kinetic energy (temperature). During melting the crystalline structure is partially disrupted; during vaporisation molecules separate completely from one another. L_v > L_f because vaporisation requires all intermolecular bonds to be fully broken.",
          },
        ],
        traps: [
          "The idea that 'internal energy does not change during a plateau because temperature does not change' is incorrect. During a plateau the molecular kinetic energy (the temperature-related component) is constant, but the intermolecular potential energy (due to changes in molecular separation and bonding) increases. Therefore internal energy U = E_k + E_p does increase during a plateau. IB Paper 2 'describe the change in internal energy during a phase change' questions require this point to be explicitly stated.",
          "When applying Q = mL, do not confuse units: IB DP uses specific latent heat in J kg⁻¹, so multiply L by mass in kg. Multiplying by moles gives the wrong answer.",
        ],
        example:
          "0.2 kg of ice starting at −10 °C is heated to steam at 100 °C. Find the total heat required. Data: c_ice = 2100 J kg⁻¹ K⁻¹, L_f = 3.34 × 10⁵ J kg⁻¹, c_water = 4200 J kg⁻¹ K⁻¹, L_v = 2.26 × 10⁶ J kg⁻¹. ① Warming ice (−10 → 0 °C): Q₁ = 0.2 × 2100 × 10 = 4200 J. ② Melting (0 °C): Q₂ = 0.2 × 3.34 × 10⁵ = 66 800 J. ③ Warming water (0 → 100 °C): Q₃ = 0.2 × 4200 × 100 = 84 000 J. ④ Vaporising (100 °C): Q₄ = 0.2 × 2.26 × 10⁶ = 452 000 J. Total = 4200 + 66 800 + 84 000 + 452 000 = 607 000 J ≈ 607 kJ. The latent heat of vaporisation accounts for 74 % of the total — a vivid demonstration that L_v ≫ L_f.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u3-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 3,
    lessonNum: 3,
    unitName: "Thermal Physics",
    title: "Kinetic Theory of Gases & the Ideal Gas Law",
    subtitle:
      "Explain pressure through molecular motion, and integrate Boyle's, Charles's, and Gay-Lussac's laws with the ideal gas equation PV = nRT",
    overview:
      "The three experimental gas laws — Boyle's, Charles's, and Gay-Lussac's — which describe the relationships among pressure, volume, and temperature of a gas, are unified by a single equation: PV = nRT. An ideal gas is a theoretical model in which there are no intermolecular attractions and the volume of the molecules themselves is negligible. The kinetic theory of gases provides the microscopic explanation for how the random motion and collisions of molecules produce the macroscopic quantities of pressure and temperature. Gas-law calculations and kinetic-theory extended-response questions on IB Paper 2 are among the most frequently examined topics.",
    objectives: [
      "State Boyle's, Charles's, and Gay-Lussac's laws individually, and represent the relationship between the two variables when the third is held constant, both graphically and algebraically",
      "Apply the ideal gas equation PV = nRT to solve problems involving changes of state of a gas",
      "List the assumptions of an ideal gas and explain how real gases differ from the ideal model",
      "Use kinetic theory to explain the microscopic origin of pressure (molecular collisions), and describe the relationship between temperature and the mean kinetic energy of molecules",
      "Predict the conditions (high pressure, low temperature) under which a real gas deviates significantly from ideal behaviour, and explain why",
    ],
    formulas: [
      "PV = nRT  (ideal gas equation; R = 8.31 J mol⁻¹ K⁻¹)",
      "Boyle's Law: P₁V₁ = P₂V₂  (T constant)",
      "Charles's Law: V₁/T₁ = V₂/T₂  (P constant)",
      "Gay-Lussac's Law: P₁/T₁ = P₂/T₂  (V constant)",
      "Mean kinetic energy: E_k = (3/2)k_BT  (k_B = 1.38 × 10⁻²³ J K⁻¹)",
      "Combined gas law: P₁V₁/T₁ = P₂V₂/T₂",
    ],
    sections: [
      {
        title: "The Three Gas Laws — Examining Each Pair of Variables with the Third Fixed",
        subtitle:
          "Understand the experimental conditions and graph shapes for each law, then unify them with the combined gas law",
        terms: [
          {
            term: "Boyle's Law",
            def: "At constant temperature, the pressure P and volume V of a fixed mass of gas are inversely proportional: P₁V₁ = P₂V₂. On a P–V graph this produces a rectangular hyperbola; on a P–(1/V) graph it produces a straight line through the origin. Microscopically: reducing the volume increases the number of molecular collisions with the walls per unit time, so pressure rises.",
          },
          {
            term: "Charles's Law",
            def: "At constant pressure, the volume V of a fixed mass of gas is directly proportional to its absolute temperature T: V₁/T₁ = V₂/T₂. On a V–T (Kelvin) graph this gives a straight line through the origin. Extrapolating to V = 0 gives T = 0 K, providing indirect evidence for the existence of absolute zero. On a V–T (Celsius) graph the line extrapolates to −273 °C at V = 0.",
          },
          {
            term: "Gay-Lussac's Law",
            def: "At constant volume, the pressure P of a fixed mass of gas is directly proportional to its absolute temperature T: P₁/T₁ = P₂/T₂. Heating a sealed container increases the average molecular speed, which raises both the frequency of wall collisions and the impulse per collision, so pressure increases. This is why car tyre pressure rises after a long drive.",
          },
          {
            term: "Combined Gas Law and Ideal Gas Equation",
            def: "Integrating all three laws gives: P₁V₁/T₁ = P₂V₂/T₂ (combined gas law, fixed amount of gas). Including the amount n gives the ideal gas equation: PV = nRT. R = 8.31 J mol⁻¹ K⁻¹ is provided in the IB data booklet. Units: P [Pa], V [m³], T [K], n [mol].",
          },
        ],
        traps: [
          "Substituting temperature in Celsius into gas-law equations is the single most common source of lost marks on IB Paper 2. In P₁/T₁ = P₂/T₂, using T₁ = 27 °C = 300 K and T₂ = 327 °C = 600 K gives P₂ = 2P₁. Without conversion, using 27 and 327 gives P₂ = (327/27)P₁ ≈ 12.1P₁ — a completely wrong answer. Automate the rule: T in gas laws must always be in kelvin.",
          "Drawing the P–V graph for Boyle's law as a straight line is a marking error. P–V is a hyperbola; P–(1/V) is a straight line. Similarly, the V–T (Celsius) graph for Charles's law does not pass through the origin — only the V–T (Kelvin) graph does. These distinctions are exactly what Paper 1 multiple-choice graph questions test.",
        ],
        example:
          "Combined gas law: a gas at 300 K and 2.0 × 10⁵ Pa occupies a volume of 0.5 m³. It is heated to 600 K while the pressure is raised to 4.0 × 10⁵ Pa. Find the new volume. P₁V₁/T₁ = P₂V₂/T₂ → V₂ = P₁V₁T₂/(T₁P₂) = (2.0 × 10⁵ × 0.5 × 600)/(300 × 4.0 × 10⁵) = (6.0 × 10⁷)/(1.2 × 10⁸) = 0.5 m³. The temperature doubled but so did the pressure, so the volume is unchanged. Unit check: Pa × m³ / (K × Pa) → m³ — units must balance to earn full marks on IB Paper 2.",
      },
      {
        title: "Kinetic Theory & Assumptions of an Ideal Gas — How Molecular Collisions Create Pressure",
        subtitle:
          "Link microscopic molecular motion to macroscopic P and T, and assess the limits of the ideal gas model",
        terms: [
          {
            term: "Assumptions of an Ideal Gas",
            def: "① Gas molecules are point masses — the volume of the molecules themselves is negligible. ② There are no intermolecular forces between molecules (no interactions except during collisions). ③ All collisions are perfectly elastic (kinetic energy is conserved). ④ Molecules are in constant, completely random motion. ⑤ The time spent in a collision is negligible compared with the time between collisions. IB Paper 2 asks 'State two assumptions of an ideal gas' almost every year.",
          },
          {
            term: "Molecular Origin of Pressure",
            def: "Gas pressure arises from molecules transferring momentum to the walls of the container during collisions. Pressure = rate of change of momentum per unit area. Temperature increase → faster molecules → higher collision frequency and greater impulse per collision → higher pressure. Volume decrease → greater molecular density → higher collision frequency → higher pressure.",
          },
          {
            term: "Temperature and Mean Kinetic Energy",
            def: "For an ideal gas, the mean kinetic energy of a single molecule is proportional only to absolute temperature: E_k = (3/2)k_BT (k_B = Boltzmann constant = 1.38 × 10⁻²³ J K⁻¹). This is the mathematical expression of 'temperature is a measure of mean kinetic energy.' Total internal energy of an ideal gas = n × N_A × (3/2)k_BT = (3/2)nRT.",
          },
          {
            term: "Deviations from Ideal Behaviour",
            def: "High pressure: molecules are close together, so their actual volume and mutual attractive forces can no longer be ignored → PV/nRT deviates from 1. Low temperature: slower molecules are more susceptible to attractive forces → condensation can occur. At high pressure and low temperature, real gases occupy a smaller volume than predicted by the ideal gas equation (when attractive forces dominate).",
          },
        ],
        traps: [
          "On IB Paper 2, when asked to 'use kinetic theory to explain an increase in gas pressure,' writing only 'the molecules move faster' earns only partial credit. A full-mark answer must include all four steps: ① temperature rises → mean molecular speed increases; ② molecules collide with the walls more frequently per unit time; ③ each collision transfers greater momentum to the wall; ④ therefore pressure increases.",
          "In PV = nRT, n is the amount of substance in moles. If the problem gives mass (in grams) or number of molecules (N), convert: n = mass/molar mass, or use N = nN_A. Confusing PV = NkT (N: number of molecules, k = k_B) with PV = nRT and mixing their variables causes unit errors. IB standard is PV = nRT; confirm R = 8.31 J mol⁻¹ K⁻¹ from the data booklet.",
        ],
        example:
          "Ideal gas equation calculation: a container holds 3.0 mol of an ideal gas at 27 °C and a pressure of 1.5 × 10⁵ Pa. Find the volume. T = 27 + 273 = 300 K. PV = nRT → V = nRT/P = (3.0 × 8.31 × 300)/(1.5 × 10⁵) = 7479/150000 ≈ 0.0499 m³ ≈ 0.050 m³ (about 50 L). Unit check: (mol × J mol⁻¹ K⁻¹ × K)/Pa = J/Pa = (N·m)/(N/m²) = m³ — correct. On IB Paper 2, the two most-checked marking points are significant figures (2–3 s.f.) and the Celsius-to-Kelvin conversion.",
      },
    ],
  },
];
