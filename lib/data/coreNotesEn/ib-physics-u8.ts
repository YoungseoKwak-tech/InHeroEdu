/**
 * Core Notes English version — IB Physics (DP) Unit 8 (Energy Production).
 * Covers classification of energy sources (primary/secondary, renewable/non-renewable),
 * specific energy & energy density, Sankey diagrams & efficiency, power equations for
 * fossil-fuel/nuclear-fission/wind/hydro/solar generation, thermal energy transfer
 * (conduction/convection/radiation), black-body radiation, the Stefan-Boltzmann law,
 * Wien's displacement law, emissivity, and the solar constant with Earth's energy
 * balance and the greenhouse effect, per the IB DP Physics curriculum.
 * All objectives, terms, traps, formulas, and examples preserved at full depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U8_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u8-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 8,
    lessonNum: 1,
    unitName: "Energy Production",
    title: "Classifying Energy Sources & Power Generation — Reading Efficiency from Sankey Diagrams",
    subtitle:
      "Fully understand, at IB DP level, primary and secondary energy sources, renewable and non-renewable energy, specific energy and energy density, Sankey diagrams and efficiency, and the principles and power equations of fossil-fuel, nuclear-fission, hydroelectric, wind, and solar generation",
    overview:
      "Where does the energy that modern civilisation consumes come from? Fossil fuels such as coal, oil, and natural gas are compressed records of solar energy stored over hundreds of millions of years. Uranium converts a mass defect into energy through nuclear fission. Wind, rivers, and sunlight are renewable energy sources that are, for practical purposes, supplied without limit. Yet every energy source inevitably loses some energy as heat during conversion — no generator is 100 % efficient. The core of IB DP Topic 8 is understanding the principles and limits of each energy source quantitatively, with numbers and equations. The Sankey diagram is a perennial IB tool that shows energy flow and losses at a glance, while the comparative metrics energy density and specific energy are the criteria for judging the 'economy' of an energy source. Efficiency calculations, Sankey interpretation, and applying the wind-power equation appear frequently on both Paper 1 and Paper 2.",
    objectives: [
      "Distinguish primary from secondary energy sources, and renewable from non-renewable energy sources, with examples, and describe the advantages and disadvantages of each at IB level",
      "Define specific energy (J kg⁻¹) and energy density (J m⁻³) and calculate the available generated energy from given fuel data",
      "Read the useful energy and wasted energy from a Sankey diagram to calculate the efficiency η = W_useful/W_input, and explain that arrow width is proportional to the energy fraction",
      "Calculate power output using the wind-power equation P = ½Aρv³, the hydroelectric-power equation P = ρgQΔh, and the solar-power relation P_out = η × I × A",
      "Explain the roles of the main components of a nuclear fission reactor (fuel, moderator, control rods, coolant, shielding) and describe the conditions under which a chain reaction is sustained",
    ],
    formulas: [
      "η = W_useful / W_input  (efficiency; dimensionless, usually expressed as %)",
      "P = ½ρAv³  (wind power; ρ = air density, A = swept area, v = wind speed)",
      "P = ρgQΔh  (hydroelectric power; Q = volume flow rate m³ s⁻¹, Δh = head)",
      "specific energy [J kg⁻¹]  /  energy density [J m⁻³]  (metrics for comparing energy sources)",
      "P_out = η × I × A  (solar; I = irradiance W m⁻², A = panel area, η = efficiency)",
    ],
    sections: [
      {
        title: "Classifying Energy Sources & Energy Density — Which Fuel Is Most Efficient?",
        subtitle:
          "Master the definitions and comparisons of primary/secondary and renewable/non-renewable energy sources, and the concepts of specific energy and energy density, matched to IB question patterns",
        terms: [
          {
            term: "Primary & Secondary Energy Sources",
            def: "Primary energy source: energy obtained directly from nature — coal, oil, natural gas (fossil fuels), uranium, wind, the Sun, and hydropower. Secondary energy source: energy produced by converting a primary energy source — electricity and hydrogen are the classic examples. Electricity itself cannot be mined from nature; it is produced at power stations using primary energy. IB frequently sets multiple-choice questions testing the fact that 'electricity is a secondary energy source.'",
          },
          {
            term: "Renewable & Non-renewable Energy Sources",
            def: "Renewable source: an energy source replenished by nature much faster than humans use it. Examples: solar, wind, hydroelectric, tidal, geothermal, biomass. Non-renewable source: an energy source whose replenishment rate is so much slower than its rate of use that it is effectively depleted. Examples: fossil fuels (coal, oil, natural gas) and nuclear fuel (uranium). Non-renewable energy has a high energy density and can provide a stable supply, but brings environmental problems such as CO₂ emissions and radioactive waste. Renewable energy imposes a lighter environmental burden, but its drawbacks are intermittency and low energy density.",
          },
          {
            term: "Specific Energy & Energy Density",
            def: "Specific energy: the energy stored per unit mass [J kg⁻¹] — 'how many joules per kilogram.' Energy density: the energy stored per unit volume [J m⁻³] — 'how many joules per litre.' Both values matter — specific energy is decisive where weight is limited (as in an aircraft), and energy density where volume is limited (as in an underground tank). Rough comparison: gasoline ≈ 46 MJ kg⁻¹, coal ≈ 30 MJ kg⁻¹, hydrogen (gas) ≈ 142 MJ kg⁻¹ (highest specific energy but low energy density), lithium-ion battery ≈ 0.7 MJ kg⁻¹. IB sets extended-response questions giving a fuel-comparison table and asking which use a fuel is suited to.",
          },
          {
            term: "Sankey Diagram & Efficiency",
            def: "Sankey diagram: represents the input energy, useful energy output, and wasted energy (such as waste heat) in an energy-conversion process, with the width of each arrow proportional to its energy. The thickest arrow is the largest energy flow. Efficiency: η = W_useful / W_input (or P_useful / P_input). It is dimensionless, expressed between 0 and 1 or between 0 and 100 %. The reason it never reaches 100 %: in every real conversion some energy is dissipated as heat (internal energy) — an inevitable consequence of the second law of thermodynamics. In a Sankey diagram the arrows that bend away or drop downward are the wasted energy.",
          },
        ],
        traps: [
          "Mixing up energy density (J m⁻³) and specific energy (J kg⁻¹) produces wrong answers. The two concepts use different reference units — energy density is per volume, specific energy is per mass. Hydrogen (H₂) has very high specific energy (because it is light) but low energy density in the gaseous state (because it occupies a large volume). The key in IB problems is distinguishing which metric applies in which context. Always check and apply the units.",
          "Inverting numerator and denominator in efficiency calculations is a common slip. Since η = W_useful / W_input, if W_input = 100 J and W_useful = 35 J then η = 0.35 (35 %). Do not confuse the 'fraction of energy wasted' with efficiency — the wasted fraction is 1 − η. In a Sankey diagram the 'total arrow width = input energy,' so the efficiency is the width of the useful-output arrow as a percentage of the total.",
        ],
        example:
          "Calculating generated power from specific energy: a coal-fired power station burns 200 t (2.00 × 10⁵ kg) of coal per hour. Coal's specific energy = 30 MJ kg⁻¹, station efficiency η = 0.38. ① Energy input per hour: W_in = 2.00 × 10⁵ kg × 30 × 10⁶ J kg⁻¹ = 6.0 × 10¹² J. ② Useful electrical energy per hour: W_useful = η × W_in = 0.38 × 6.0 × 10¹² = 2.28 × 10¹² J. ③ Power: P = W/t = 2.28 × 10¹² / 3600 s ≈ 633 MW. IB marking points: multiplying specific energy by mass, applying the efficiency, and dividing the energy by seconds to obtain power are all marked steps.",
      },
      {
        title: "Power Equations by Generation Method — The Physics of Wind, Hydro & Nuclear Fission",
        subtitle:
          "Fully master wind power P = ½Aρv³, hydroelectric power P = ρgQΔh, and nuclear-reactor structure, together with the IB question types in which they appear",
        terms: [
          {
            term: "Wind Power — P = ½Aρv³",
            def: "Wind power: a turbine converts the kinetic energy of the wind into rotational energy → a generator produces electricity. Ideal maximum power: P = ½ρAv³, where ρ = air density (about 1.2 kg m⁻³), A = the circular area swept by the rotating blades = πr² (r = blade length), and v = wind speed (m s⁻¹). Key point: the power is proportional to the cube of the wind speed (v³) — doubling the wind speed makes the power eight times larger. The efficiency of a real wind turbine is about 40–50 % of this theoretical value, and the Betz limit ≈ 59 % is the theoretical maximum. IB frequently sets calculations of the power ratio when wind speed or blade radius changes.",
          },
          {
            term: "Hydroelectric Power — P = ρgQΔh",
            def: "Hydroelectric power: water at a height falls, converting potential energy → turbine rotational energy → electrical energy. Power equation: P = ρgQΔh, where ρ = density of water (1000 kg m⁻³), g = acceleration due to gravity (9.81 m s⁻²), Q = volume flow rate (m³ s⁻¹), and Δh = effective head (m). It can also be derived from P = mgΔh/t: since the mass flow rate ṁ = ρQ, P = ρQgΔh. Including efficiency, P_useful = η × ρgQΔh. Hydroelectric power boasts the highest efficiency among renewables (85–95 %), but its drawbacks are ecosystem destruction from dam construction and large-scale alteration of the terrain.",
          },
          {
            term: "Components of a Nuclear Fission Reactor",
            def: "Fuel: U-235 (uranium-235) — absorbs a slow neutron (thermal neutron) and undergoes fission, releasing 2–3 fast neutrons and energy. Chain reaction: neutrons from one fission trigger the next fission — if uncontrolled, it explodes. Moderator: slows fast neutrons down to promote the next fission — light water, heavy water (D₂O), or graphite. Control rods: absorb neutrons to regulate the rate of the chain reaction — made of boron or cadmium. Coolant: cools the fuel rods and transfers thermal energy — water, pressurised water, or liquid metal. Shielding: blocks α, β, and γ radiation — thick concrete and lead. IB repeatedly sets Paper 2 questions asking students to describe the role of each component.",
          },
        ],
        traps: [
          "In the wind equation P = ½ρAv³, A is not the 'blade area' but the 'circular area swept by the rotating blades (swept area) = πr².' Be careful: it is the area of the circle traced by the blade tips, not the area of a single blade. Also check the units in which the wind speed v is given (m s⁻¹, km h⁻¹) and always convert to m s⁻¹. Because P ∝ v³, an error in the wind-speed unit produces a large error in the answer.",
          "In the hydroelectric equation, Δh is the 'difference in water-surface height,' but when an IB problem gives the 'effective head' it is a value that already accounts for losses such as friction. Unless a separate efficiency is given, treat η = 1 and apply P = ρgQΔh directly. Check whether the problem uses ρ = 1000 kg m⁻³ (water) and g = 9.81 m s⁻² (or the IB data booklet value of 10 m s⁻²).",
        ],
        example:
          "Calculating wind-power output: a wind turbine with blade radius r = 40 m, air density ρ = 1.2 kg m⁻³, wind speed v = 12 m s⁻¹, efficiency η = 0.45. ① Swept area: A = π × 40² = π × 1600 ≈ 5027 m². ② Ideal maximum power: P_max = ½ × 1.2 × 5027 × 12³ = ½ × 1.2 × 5027 × 1728 = ½ × 1.2 × 8 686 656 ≈ 5.21 × 10⁶ W ≈ 5.21 MW. ③ Actual power: P_useful = η × P_max = 0.45 × 5.21 × 10⁶ ≈ 2.34 MW. IB marking points: calculating A = πr² (circular area), calculating v³ (1728), applying the formula ½ρAv³, and multiplying by efficiency are all marked steps.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u8-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 8,
    lessonNum: 2,
    unitName: "Energy Production",
    title: "Thermal Energy Transfer — The Physics of Conduction, Convection & Radiation",
    subtitle:
      "Fully understand, at IB DP level, the principles and differences of the thermal-energy-transfer mechanisms (conduction, convection, radiation), black-body radiation, the Stefan-Boltzmann law, Wien's displacement law, and emissivity",
    overview:
      "Energy always flows wherever there is a temperature difference — this is thermal energy transfer. Heat escaping through the walls of a house is conduction; air circulating around a hot radiator is convection; the Sun warming the Earth across empty space is radiation. The three mechanisms work on different principles, and radiation is the only one that can transfer heat through a vacuum. Every object emits electromagnetic radiation according to its temperature — an ideal absorber and emitter is a black body. The Stefan-Boltzmann law L = σAT⁴ tells us that radiated power increases in proportion to the fourth power of the surface temperature. Wien's displacement law λ_max T = 2.90 × 10⁻³ m K describes the relationship between the peak wavelength of the emission spectrum and the temperature, and is used to measure the surface temperatures of stars. On IB DP Paper 2, calculating a star's surface temperature, interpreting black-body graphs, and applying the concept of emissivity appear frequently.",
    objectives: [
      "Explain the mechanisms of conduction, convection, and radiation at the atomic and molecular level, and distinguish the situations in which each dominates and the mechanism possible in a vacuum",
      "Use the Stefan-Boltzmann law L = σAT⁴ to calculate the radiated power (luminosity) of a black body, and compare output ratios when temperature or area changes",
      "Apply Wien's displacement law λ_max T = 2.90 × 10⁻³ m K to calculate an object's surface temperature from its peak wavelength, and explain that the peak shifts to shorter wavelengths as temperature rises",
      "Define emissivity (ε) and calculate the radiated power of a real object P = εσAT⁴ in comparison with a black body",
      "Qualitatively explain how the peak shifts and how the area under the curve (total radiated power) changes with temperature on a black-body radiation spectrum (Planck curve)",
    ],
    formulas: [
      "L = σAT⁴  (Stefan-Boltzmann law; σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴, black body)",
      "P = εσAT⁴  (radiated power of a real object; ε = emissivity, 0 ≤ ε ≤ 1)",
      "λ_max T = 2.90 × 10⁻³ m K  (Wien's displacement law)",
      "I = P / A  (radiated intensity; A = surface or spherical cross-sectional area 4πr²)",
      "Q/t = kA(ΔT/Δx)  (conduction heat flux; k = thermal conductivity, ΔT/Δx = temperature gradient — for qualitative understanding)",
    ],
    sections: [
      {
        title: "Conduction, Convection & Radiation — The Three Ways Heat Moves",
        subtitle:
          "Master the atomic-level explanation of the three mechanisms, the strategy for IB comparison questions, and the special nature of radiation in a vacuum",
        terms: [
          {
            term: "Conduction",
            def: "Conduction: energy transferred within an object as neighbouring particles (atoms and free electrons) collide and pass on kinetic energy — energy is transferred without any movement of the material itself. It is most effective in solids, and metals, thanks to their free electrons, have a far higher thermal conductivity than non-metallic solids. Heat flux: Q/t = kA(ΔT/Δx), where k = thermal conductivity (W m⁻¹ K⁻¹), A = cross-sectional area, ΔT = temperature difference, Δx = thickness. At IB DP level, the description of 'why metals conduct better' is set more often than numerical calculation with the conduction formula — you must mention the movement of free electrons.",
          },
          {
            term: "Convection",
            def: "Convection: in a fluid (a liquid or a gas), a temperature difference creates a density difference, so the fluid itself moves and transfers energy. Hot fluid becomes less dense and rises (buoyancy), while cold fluid becomes denser and sinks → forming a convection current. Natural convection: the fluid moves through density differences alone. Forced convection: the fluid is moved deliberately by a fan or pump. Convection cannot occur in solids, nor in a vacuum. IB sets questions requiring students to state the condition that 'a fluid must be present for convection to occur.'",
          },
          {
            term: "Radiation — Energy Transfer by Electromagnetic Waves",
            def: "Radiation: energy transferred through electromagnetic waves. Because no material medium is needed, energy transfer is possible even in a vacuum — it is the only way energy is transferred from the Sun to the Earth. Every object emits electromagnetic radiation according to its temperature. The higher the temperature, the more energy is emitted and at shorter wavelengths (Wien's law). A good absorber is also a good emitter — a black surface absorbs and emits all wavelengths completely, while a white/shiny surface reflects radiation.",
          },
        ],
        traps: [
          "Do not confuse 'radiation' (thermal) with the radiation of radioactive decay. In thermal energy transfer, radiation (thermal radiation) is energy transfer through electromagnetic waves, and it is an entirely different concept from the radiation (α, β, γ) of nuclear physics. Always check in which context 'radiation' is being used in IB. Also, conduction and convection both occur through matter, but in conduction the matter does not move whereas in convection the matter (fluid) moves — you must clearly distinguish this difference in extended-response answers.",
          "Remember that in radiation 'a good absorber = a good emitter' — a black object absorbs all wavelengths well and emits well. Conversely, a white (shiny) object reflects radiation well and also emits less. A solar collector is made with a black surface to raise its absorptivity, and a thermos has silvered inner walls to reduce radiative losses. Discard the false intuition that 'black stays hotter,' and understand that 'black emits faster and therefore cools faster.'",
        ],
        example:
          "Identifying thermal-energy-transfer mechanisms: describe the dominant thermal-energy-transfer mechanism in each of the following situations. ① The handle of a metal pan becomes hot → conduction: the free electrons and atomic vibrations of the metal transfer energy, with no movement of material. ② Air around a heater warms the whole room → convection: warm air decreases in density → rises, cold air sinks → circulation. ③ The Sun warms the Earth → radiation: electromagnetic waves (mainly visible light and infrared) cross the vacuum of space and reach the Earth. IB marking points: you must clearly state the name of each mechanism and 'whether material moves' and 'whether a medium is required.'",
      },
      {
        title: "Black-Body Radiation, the Stefan-Boltzmann & Wien's Laws — How to Measure a Star's Temperature",
        subtitle:
          "Completely master the definition of a black body, L = σAT⁴, λ_max T = 2.90 × 10⁻³ m K, and emissivity ε through IB calculation-question patterns",
        terms: [
          {
            term: "Black Body & the Black-Body Radiation Spectrum (Planck Curve)",
            def: "Black body: an ideal object that completely absorbs electromagnetic radiation of all wavelengths. Reflectivity = 0. Absorptivity = 1. A black body is simultaneously the most efficient emitter of radiation. Black-body radiation spectrum (Planck curve): the distribution curve of the energy emitted at each wavelength by a black body at temperature T. Features: ① there is a peak wavelength (λ_max). ② The higher the temperature, the shorter λ_max becomes (shifts toward shorter wavelengths). ③ The higher the temperature, the greater the emitted intensity at every wavelength. ④ The area under the curve = the total radiated power ∝ T⁴ (Stefan-Boltzmann). IB sets questions giving the Planck curves at two temperatures and asking which is hotter/colder or to describe the change.",
          },
          {
            term: "Stefan-Boltzmann Law — L = σAT⁴",
            def: "Stefan-Boltzmann law: the radiated power (luminosity, L or P) of a black body is proportional to the fourth power of the absolute temperature and to the surface area. L = σAT⁴. The Stefan-Boltzmann constant σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴ (provided in the IB data booklet). The temperature must always be in kelvin (K) — using Celsius (°C) directly gives a wrong answer. For a spherical star, the surface area A = 4πR², so L = 4πR²σT⁴. IB repeatedly sets questions asking for the luminosity ratio of two stars when their surface-temperature and radius ratios are given: L₁/L₂ = (R₁/R₂)² × (T₁/T₂)⁴.",
          },
          {
            term: "Wien's Displacement Law & Emissivity",
            def: "Wien's displacement law: λ_max × T = 2.90 × 10⁻³ m K. The product of the peak wavelength λ_max of the black-body radiation spectrum and the absolute temperature T is a constant. Application: measure λ_max from a star's spectrum → calculate the surface temperature as T = 2.90 × 10⁻³ / λ_max. Example: the Sun has λ_max ≈ 500 nm → T ≈ 2.90 × 10⁻³ / (500 × 10⁻⁹) ≈ 5800 K. Emissivity (ε): the ratio of the radiated power of a real object to that of a black body at the same temperature. 0 ≤ ε ≤ 1. Black body: ε = 1. Real object: P = εσAT⁴. The Earth's average emissivity ≈ 0.6. In IB, when ε is given use P = εσAT⁴; when no ε is given, treat the object as a black body (ε = 1).",
          },
        ],
        traps: [
          "In the Stefan-Boltzmann law L = σAT⁴, the temperature T must be the absolute temperature (Kelvin, K). T(K) = T(°C) + 273.15. Calculating 20⁴ from Celsius 20 °C directly produces a huge error. Also, because of T⁴, doubling the temperature makes the output 2⁴ = 16 times larger — this ratio calculation is a regular IB question, so you must be comfortable computing the (T₁/T₂)⁴ pattern.",
          "In Wien's displacement law λ_max T = 2.90 × 10⁻³ m K, λ must be in metres (m). If the wavelength is given in nm (nanometres), multiply by × 10⁻⁹ to convert to m. Example: λ_max = 700 nm = 700 × 10⁻⁹ m = 7.00 × 10⁻⁷ m. Remember the units (m K) of '2.90 × 10⁻³' and substitute λ in m and T in K consistently to avoid errors.",
        ],
        example:
          "Calculating a star's surface temperature and luminosity ratio: star A has a black-body radiation spectrum peak wavelength λ_max = 290 nm and radius R_A = 2.0 × R_☉. For the Sun (☉), T_☉ = 5800 K, R_☉. ① Star A's surface temperature: T_A = 2.90 × 10⁻³ / (290 × 10⁻⁹) = 2.90 × 10⁻³ / 2.90 × 10⁻⁷ = 1.0 × 10⁴ K = 10 000 K. ② Luminosity ratio L_A / L_☉ = (R_A / R_☉)² × (T_A / T_☉)⁴ = (2.0)² × (10 000 / 5800)⁴ = 4.0 × (1.724)⁴ = 4.0 × 8.84 ≈ 35. Star A's luminosity is about 35 times the Sun's. IB marking points: calculating T_A with Wien's law (including the nm → m conversion), applying the L ∝ R²T⁴ ratio formula, and calculating (T_A/T_☉)⁴ are all marked steps.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u8-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 8,
    lessonNum: 3,
    unitName: "Energy Production",
    title: "The Solar Constant & Earth's Energy Balance — The Physics of the Greenhouse Effect",
    subtitle:
      "Fully understand, at IB DP level, the definition and calculation of the solar constant (S₀), the Earth's albedo and absorbed energy, Earth's energy balance and the calculation of its mean surface temperature, and the greenhouse effect and the role of greenhouse gases",
    overview:
      "Why does the Earth stay at a temperature suitable for life? The answer lies in the balance between the energy coming in from the Sun and the energy the Earth radiates out into space. The solar constant (S₀ ≈ 1360 W m⁻²) is the power that sunlight delivers per unit area just outside the Earth's atmosphere. But because the Earth is a sphere, the energy it actually absorbs is far less than this — the difference between the cross-sectional area (πr²) and the total surface area (4πr²), together with the albedo, is the key. If the Earth is in radiative equilibrium, then absorbed energy = emitted energy, and under this condition the Earth's 'effective temperature' can be calculated with the Stefan-Boltzmann law. Yet the actual mean temperature of the Earth (≈ 288 K) is about 33 °C higher than this calculated value (≈ 255 K) — this is the result of the natural greenhouse effect. Greenhouse gases such as water vapour, CO₂, and methane absorb and re-emit the infrared radiation the Earth emits, heating the surface further. On IB DP Paper 2 extended-response questions, calculating the Earth's mean temperature, applying the albedo, and describing the greenhouse effect appear as high-mark questions.",
    objectives: [
      "Define the solar constant (S₀) and calculate it using S₀ = L_☉ / (4πd²) from the Sun's luminosity (L_☉) and the Earth-Sun distance (d)",
      "Define albedo (α) and calculate the solar radiated power absorbed by the Earth, P_absorbed = S₀πr²(1 − α)",
      "Apply the Stefan-Boltzmann law under the condition of Earth's radiative equilibrium to calculate the Earth's effective temperature, and explain the difference from the actual mean temperature in terms of the greenhouse effect",
      "Qualitatively describe how greenhouse gases affect Earth's energy balance — the mechanism of additional heating through infrared absorption and re-emission",
      "Analyse, both qualitatively and quantitatively, the effects of changes in albedo, greenhouse-gas concentration, and solar luminosity on the Earth's mean temperature",
    ],
    formulas: [
      "S₀ = L_☉ / (4πd²)  (solar constant; d = Earth-Sun distance ≈ 1.50 × 10¹¹ m)",
      "P_absorbed = S₀ × πr_E² × (1 − α)  (Earth's absorbed power; α = albedo, r_E = Earth's radius)",
      "P_emitted = σ × 4πr_E² × T_E⁴  (Earth's emitted power; × ε if emissivity included for a black body)",
      "Equilibrium condition: P_absorbed = P_emitted  →  T_E = [S₀(1 − α) / (4σ)]^(1/4)",
      "albedo α = P_reflected / P_incident  (albedo = reflected power / incident power, 0 ≤ α ≤ 1)",
    ],
    sections: [
      {
        title: "The Solar Constant & Albedo — The Real Energy the Earth Receives",
        subtitle:
          "Master S₀ = L/4πd², albedo, and the Earth's absorbed power P = S₀πr²(1 − α) through IB calculation-question patterns",
        terms: [
          {
            term: "Solar Constant (S₀)",
            def: "Solar constant (S₀): the solar radiant energy received per unit time by a unit area perpendicular to the sunlight, just outside the Earth's atmosphere. Unit: W m⁻². Measured value: S₀ ≈ 1.36 × 10³ W m⁻² ≈ 1360 W m⁻². Derivation: the Sun's luminosity (L_☉) spreads uniformly over the whole sphere of radius d → S₀ = L_☉ / (4πd²), where d = the mean Earth-Sun distance ≈ 1.50 × 10¹¹ m. Because it is just outside the Earth's atmosphere, it is the value before atmospheric absorption. In reality, about 30 % is reflected, scattered, or absorbed as it passes through the atmosphere. In IB the value of S₀ is provided in the data booklet or calculated from L_☉ and d.",
          },
          {
            term: "Albedo (α) & the Earth's Absorbed Power",
            def: "Albedo (α): the fraction of incident solar radiation that is reflected. α = P_reflected / P_incident. 0 ≤ α ≤ 1. The Earth's mean albedo ≈ 0.30 (about 30 % is reflected). Snow and ice have high albedo (0.8–0.9), forests low albedo (0.1–0.2). Calculating the Earth's absorbed power: the Earth intercepts sunlight over a cross-sectional area πr_E² and absorbs only the fraction (1 − α). P_absorbed = S₀ × πr_E² × (1 − α), where r_E = Earth's radius ≈ 6.37 × 10⁶ m. If the albedo rises (e.g. an increase in glacier area), absorbed energy falls and the Earth cools; conversely a fall in albedo (e.g. melting glaciers or deforestation) leads to additional warming.",
          },
          {
            term: "Radiative Equilibrium & the Effective Temperature",
            def: "Radiative equilibrium: the state where absorbed power = emitted power — the reason the Earth's temperature is constant over the long term. P_absorbed = P_emitted → S₀πr_E²(1 − α) = σ × 4πr_E² × T_E⁴, where 4πr_E² is the Earth's whole surface area (the emitting area) and πr_E² is the cross-sectional area (the absorbing area). Cancelling πr_E² on both sides: S₀(1 − α) / 4 = σT_E⁴. Therefore: T_E = [S₀(1 − α) / (4σ)]^(1/4). Substituting α = 0.30, S₀ = 1360 W m⁻², σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴ gives T_E ≈ 255 K ≈ −18 °C. This is 33 °C lower than the actual mean temperature ≈ 288 K (+15 °C) — this difference is the contribution of the natural greenhouse effect.",
          },
        ],
        traps: [
          "In the Earth's absorbed power P_absorbed = S₀ × πr_E² × (1 − α), students often confuse why the cross-sectional area (πr_E²) is used rather than the whole surface area (4πr_E²). Sunlight reaches only one face (the cross-section) of the Earth — the cross-section with which the Earth intercepts sunlight is πr_E². The Earth, on the other hand, radiates heat uniformly from the whole spherical surface (4πr_E²). The emitted power must use 4πr_E². This 'πr² vs 4πr²' distinction is the heart of the equilibrium-temperature calculation and an explicit marking point in IB mark schemes.",
          "Be careful with the sign of the albedo α. The absorbed fraction is (1 − α); α itself is not the absorbed fraction. Writing P_absorbed = S₀ × πr_E² × α incorrectly produces the physical error that absorption is maximal when α = 1, even though α = 1 means 'everything is reflected and nothing is absorbed.' Apply the intuition 'the higher the albedo, the more reflection and the less absorption' consistently in the formula.",
        ],
        example:
          "Calculating the Earth's equilibrium temperature: S₀ = 1.36 × 10³ W m⁻², Earth's albedo α = 0.30, σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴. Treating the Earth as a black body, find the radiative-equilibrium temperature T_E. Equilibrium condition: S₀(1 − α) / 4 = σT_E⁴. ① T_E⁴ = S₀(1 − α) / (4σ) = 1360 × 0.70 / (4 × 5.67 × 10⁻⁸) = 952 / (2.268 × 10⁻⁷) = 4.20 × 10⁹ K⁴. ② T_E = (4.20 × 10⁹)^(1/4) = [(4.20)^(1/4)] × [10⁹]^(1/4) = 1.432 × 10^(2.25) ≈ 1.432 × 177.8 ≈ 254.6 K ≈ 255 K. Since the actual mean temperature ≈ 288 K, the additional warming due to the greenhouse effect ≈ 33 K. IB marking points: deriving S₀(1−α)/4 = σT⁴ (recognising the absorbing/emitting area ratio), calculating T = (…)^(1/4), and the description linking the difference from the actual temperature to the greenhouse effect are all marked steps.",
      },
      {
        title: "The Greenhouse Effect & Global Warming — How CO₂ Wraps the Earth in a Blanket",
        subtitle:
          "Master, through IB question patterns, the radiation-absorption-and-re-emission mechanism of greenhouse gases, human activity and the enhanced greenhouse effect, and the quantitative analysis of temperature change",
        terms: [
          {
            term: "The Greenhouse Effect & Greenhouse Gases",
            def: "Natural greenhouse effect: the phenomenon in which greenhouse gases in the Earth's atmosphere (water vapour H₂O, carbon dioxide CO₂, methane CH₄, nitrous oxide N₂O, ozone O₃, etc.) absorb and re-emit the long-wave infrared (~10 μm) radiation emitted by the Earth, further heating the surface. However, they let most of the short-wave radiation from the Sun (short-wave, ~0.5 μm visible light and UV) pass through — a mechanism similar to greenhouse glass (glass transmits visible light but absorbs infrared). Thanks to the natural greenhouse effect, the Earth's mean temperature is maintained at +15 °C rather than −18 °C. Enhanced greenhouse effect: human activity (burning fossil fuels, deforestation) increases CO₂ and CH₄ concentrations → increased infrared absorption → additional warming.",
          },
          {
            term: "Energy-Balance Perturbation & Temperature Response",
            def: "Radiative forcing: the degree to which the Earth's energy balance is disturbed by an increase in greenhouse-gas concentration or a change in the solar constant [W m⁻²]. Positive radiative forcing → energy absorbed > emitted → temperature rises → a new equilibrium is reached. Earth energy-balance analysis: ① absorption of solar (short-wave) radiation: S₀(1−α)/4. ② Emission of Earth (long-wave) radiation: σT⁴ (black-body approximation). ③ With the greenhouse effect included: the atmosphere re-absorbs part of the radiation emitted by the Earth and sends it back to the surface, so the emitted energy does not escape immediately into space. IB sets questions estimating, with the Stefan-Boltzmann law, the effect on temperature of a doubling of CO₂ concentration.",
          },
          {
            term: "Albedo Feedback & Climate Feedback",
            def: "Albedo feedback: temperature rises → glaciers and snow melt → albedo decreases → more solar radiation absorbed → further temperature rise (positive feedback). Cloud feedback: temperature rises → evaporation increases → more clouds → higher albedo (negative feedback), or more high-altitude clouds → stronger greenhouse effect (positive feedback). In IB you must explain that positive feedback is a response that amplifies the initial change. Negative feedback is a response in the direction that damps the initial change. The climate system is a complex of intricate feedback loops.",
          },
        ],
        traps: [
          "Confusing the greenhouse effect with 'ozone depletion' is a common error. The two are completely different phenomena. Greenhouse effect: greenhouse gases absorb and re-emit the infrared the Earth emits → temperature rises. Ozone depletion: CFCs and similar substances break down O₃ → its ability to block ultraviolet decreases. In IB, a description that confuses the two scores zero. Both 'greenhouse gases destroy the ozone layer' and 'the ozone layer causes the greenhouse effect' are incorrect statements.",
          "When calculating, with the equilibrium-temperature formula T_E = [S₀(1 − α) / (4σ)]^(1/4), the effect on T_E of a change in albedo α, remember that T_E ∝ (1 − α)^(1/4). When α increases from 0.30 to 0.35: (1 − 0.30)/(1 − 0.35) = 0.70/0.65 = 1.077. Temperature ratio T₁/T₂ = (1.077)^(1/4) ≈ 1.019 → about a 1.9 % decrease in temperature. Recognise that, thanks to the fourth root, a small change in albedo has a fairly small effect on temperature.",
        ],
        example:
          "Energy-balance extended response including the greenhouse effect: describe, from an energy-balance perspective, the mechanism by which an increase in greenhouse-gas concentration raises the Earth's mean surface temperature. ① The Earth absorbs short-wave radiation (visible light, UV) from the Sun. P_abs = S₀πr²(1−α)/4. ② The Earth's surface emits energy as long-wave infrared. P_emit = σT⁴ × 4πr². ③ Increased greenhouse-gas concentration → the atmosphere absorbs more of the infrared emitted by the Earth → re-emits it toward the surface (increased back-radiation). ④ Therefore the total energy reaching the surface > the previous equilibrium value → P_absorbed > P_emitted → an energy imbalance. ⑤ The Earth's surface temperature rises so that P_emit increases → a new equilibrium: T_new > T_old. IB marking points: distinguishing short-wave absorption from long-wave emission, explicitly stating 'infrared absorption and re-emission (back-radiation),' and the logical sequence of energy imbalance → temperature rise → reaching a new equilibrium are all marked steps.",
      },
    ],
  },
];
