/**
 * Core Notes English version — Honors Chemistry Unit 1 (Matter, Measurement & Atomic Structure).
 * Faithful English translation of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_CHEMISTRY_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-chemistry-u1-l1",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 1,
    unitName: "Matter, Measurement & Atomic Structure",
    title: "Classification and Changes of Matter",
    subtitle: "The difference between elements, compounds, and mixtures — and how to distinguish physical from chemical change",
    overview:
      "The first question of chemistry is 'what is the world made of?' All matter divides into pure substances and mixtures, and pure substances divide again into elements and compounds. Mastering this classification scheme gives you the eye to read the periodic table and chemical formulae. Adding physical change and chemical change to that framework lets you systematically analyze every phenomenon you observe in the laboratory. In this lesson the goal is not to memorize the categories but to understand 'why we divide them this way' at the mechanistic level.",
    objectives: [
      "Classify matter as element, compound, homogeneous mixture, or heterogeneous mixture, and explain the criterion for each category at the particle level",
      "Distinguish physical properties from chemical properties with examples, and explain which experiment measures each property",
      "Decide whether a change is physical or chemical based on energy change and the formation of a new substance",
      "Interpret the indicators of chemical change (gas evolution, color change, precipitate formation, energy change) by connecting them to experimental observations",
    ],
    sections: [
      {
        title: "Classifying Matter — Elements, Compounds, and Mixtures",
        subtitle: "How particle-level differences become the basis of classification",
        terms: [
          {
            term: "Element",
            def: "A pure substance that cannot be broken down into simpler substances by chemical means. It consists of only one kind of atom, and each cell of the periodic table corresponds to one element. Examples: oxygen (O₂), iron (Fe), gold (Au).",
          },
          {
            term: "Compound",
            def: "A pure substance in which two or more elements are chemically bonded in a fixed mass ratio. Its properties differ completely from those of its constituent elements, and it can be separated into those elements only by chemical means. Examples: water (H₂O), salt (NaCl), carbon dioxide (CO₂).",
          },
          {
            term: "Homogeneous mixture",
            def: "A mixture of two or more pure substances whose composition is uniform throughout, so the components cannot be distinguished by eye. A solution is the classic example, and its components can be separated by physical methods such as distillation or evaporation.",
          },
          {
            term: "Heterogeneous mixture",
            def: "A mixture whose components are not uniformly distributed, so the composition varies from region to region. Suspensions and colloids belong here, and the components can be separated by filtration, centrifugation, and similar methods. Examples: sand + water, salad dressing.",
          },
        ],
        traps: [
          "The key criteria that distinguish a compound from a mixture are 'fixed composition' and 'chemical bonding.' Water (H₂O) is always hydrogen : oxygen = 1 : 8 by mass, but salt water's composition changes with how much salt is added. Also, the components of a mixture keep their original properties, whereas the elements in a compound lose theirs. Don't assume 'two elements combined → automatically a compound'; confirm a fixed composition and new properties.",
          "Do not confuse an element with an elemental substance. The element oxygen refers to element number 8 on the periodic table, while the elemental substance O₂ is matter made of only oxygen atoms. Graphite and diamond are both the element carbon, but their structures differ so their properties differ completely — this relationship is called allotropy.",
        ],
        example:
          "Consider how to decide whether water (H₂O) is a compound or a mixture. Any sample of pure water has a fixed hydrogen : oxygen mass ratio of 1 : 8 (fixed composition), and electrolysis decomposes it into hydrogen gas and oxygen gas — components with completely different properties (chemical separation). Seawater, by contrast, has a different salt concentration in every sample (variable composition), and the salt can be separated by evaporation alone (physical separation). Therefore water is a compound and seawater is a mixture.",
      },
      {
        title: "Physical Change and Chemical Change",
        subtitle: "Whether the identity of the substance changes is the line that separates the two",
        terms: [
          {
            term: "Physical property",
            def: "A property that can be measured without changing the chemical composition of the substance. Density, melting point, boiling point, color, hardness, and electrical conductivity belong here. On exams the test is: 'can it be observed without a chemical reaction?'",
          },
          {
            term: "Chemical property",
            def: "A property that appears when a substance is converted into a different substance through a chemical change. Flammability, reactivity, and tendency to oxidize belong here. Measuring the property itself changes the substance.",
          },
          {
            term: "Physical change",
            def: "A change in which the chemical composition (the kinds of molecules/atoms and their bonds) is unchanged and only shape or state changes. Boiling, freezing, melting, breaking, and dissolving belong here. The original substance can often be recovered.",
          },
          {
            term: "Chemical change",
            def: "A change in which bonds between atoms break and re-form to create a new substance different from the original. Combustion, oxidation, fermentation, and neutralization belong here; gas evolution, color change, precipitate formation, and energy exchange are indicators of chemical change.",
          },
        ],
        traps: [
          "Sugar dissolving in water is a physical change — the sugar molecules (C₁₂H₂₂O₁₁) remain intact and can be recovered by evaporation. However, sugar caramelizing on heating is a chemical change in which new compounds form. When you see the word 'dissolve,' don't automatically declare it a physical change; check what is dissolving and whether a new substance forms.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u1-l2",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 2,
    unitName: "Matter, Measurement & Atomic Structure",
    title: "Measurement, Significant Figures, and Dimensional Analysis",
    subtitle: "The SI system, the rules of significant figures, and dimensional analysis as a systematic tool for unit conversion",
    overview:
      "Chemistry is a quantitative science — an experimental result is meaningless if you cannot express it as a number. This lesson covers three essentials: recording measurements accurately using SI units, communicating the precision of a measurement using significant figures, and converting units using dimensional analysis. These three tools reappear throughout all of Honors Chemistry, so mastering them perfectly now becomes the foundation of every later calculation.",
    objectives: [
      "Memorize the 7 SI base units and the common prefixes (nano-, micro-, milli-, centi-, kilo-, mega-) and apply them to unit conversion",
      "Apply the rules for significant figures to count the significant figures of a measurement correctly, and apply the different rounding rules for addition/subtraction versus multiplication/division",
      "Use dimensional analysis (the unit-factor method) to carry out multi-step unit conversions without error",
      "Calculate density from mass and volume, and use density to identify a substance or find its volume or mass",
      "Distinguish accuracy from precision in the context of experimental data",
    ],
    formulas: [
      "Density = mass / volume  →  D = m / V",
      "Celsius → Kelvin: K = °C + 273.15",
      "Percent error = |experimental value − accepted value| / accepted value × 100",
    ],
    sections: [
      {
        title: "The SI System and Density",
        subtitle: "The common language of measurement: base and derived units, and density as a tool for identifying substances",
        terms: [
          {
            term: "SI (International System of Units)",
            def: "The international standard system of units used throughout science. It consists of 7 base units (length m, mass kg, time s, temperature K, electric current A, amount of substance mol, luminous intensity cd) and derived units built from their combinations.",
          },
          {
            term: "Density",
            def: "Mass per unit volume (D = m/V). Written in g/mL or g/cm³, it has a value unique to each substance and is used to identify pure substances. As temperature rises, volume increases, so density generally decreases (water is the exception: maximum density at 4 °C).",
          },
          {
            term: "Accuracy",
            def: "A measure of how close a measured value is to the accepted (true) value. The smaller the systematic error, the higher the accuracy.",
          },
          {
            term: "Precision",
            def: "A measure of how closely repeated measurements cluster together. The smaller the random error, the higher the precision. High precision can still go with low accuracy.",
          },
        ],
        traps: [
          "Mass and weight are different. Mass is the amount of matter (kg, invariant); weight is the force gravity exerts on that mass (N = kg·m/s²) and varies with location. In chemistry, even when we say 'weigh,' what we measure is mass. On exams it is more accurate to write 'mass' rather than 'weight.'",
          "Always check the units in density problems. The density of a gas is usually given in g/L, while liquids and solids use g/mL (= g/cm³). Knowing that 1 mL = 1 cm³ makes conversions simple, but if a problem mixes units, unify them before you start calculating.",
        ],
        example:
          "Consider identifying a substance using density. An unknown metal chunk has a mass of 89.6 g, and when placed in a graduated cylinder the volume rose from 48.0 mL to 56.0 mL. The volume change = 56.0 − 48.0 = 8.0 mL, so density D = 89.6 g ÷ 8.0 mL = 11.2 g/mL. Lead's density is 11.3 g/mL, so the metal is most likely lead. Watch significant figures: 8.0 mL has 2 significant figures, so the answer should be rounded to 2 figures, 11 g/mL.",
      },
      {
        title: "Significant Figures and Dimensional Analysis",
        subtitle: "How to embed measurement uncertainty in a number, and a strategy that prevents errors in unit conversion",
        terms: [
          {
            term: "Significant figures",
            def: "The number of reliable digits in a measured value. Nonzero digits are always significant; zeros between two nonzero digits are significant; trailing zeros after a decimal point are significant. Leading zeros are not significant.",
          },
          {
            term: "Significant-figure rule for multiplication/division",
            def: "The number of significant figures in the result equals the smallest number of significant figures among the values used. Example: 2.5 × 3.42 = 8.6 (2 figures), 12.11 ÷ 4.0 = 3.0 (2 figures).",
          },
          {
            term: "Significant-figure rule for addition/subtraction",
            def: "The number of decimal places in the result equals the fewest decimal places among the values used. Example: 12.52 + 349.0 + 8.24 = 369.8 (to the first decimal place).",
          },
          {
            term: "Dimensional analysis",
            def: "A method of canceling units by multiplying by conversion factors. Arranging each fraction so the desired unit is in the numerator and the unit to cancel is in the denominator systematically prevents unit errors.",
          },
        ],
        traps: [
          "Misapplying the significant-figure rules to addition is extremely common. Addition and subtraction round based on 'decimal places,' not on 'number of significant figures.' For example, in 1000 + 1.245, the 1000 has 1 significant figure but 0 decimal places, so the result must be 1001 (no decimals). Mixing the two rules loses marks.",
          "Flipping a conversion factor the wrong way is a frequent exam error in dimensional analysis. Before converting, always fix the direction — 'the final unit must remain in the numerator' — then place the factors. Checking that the units cancel to leave only the desired unit catches calculation mistakes.",
        ],
        example:
          "Do a multi-step conversion with dimensional analysis: convert a car's speed of 65 miles/hour into m/s. Conversion factors: 1 mile = 1609 m, 1 hour = 3600 s. Calculation: 65 miles/hr × (1609 m / 1 mile) × (1 hr / 3600 s) = 65 × 1609 / 3600 m/s ≈ 29 m/s. Significant figures: 65 has 2 figures, so the result is 2 figures, 29 m/s. Writing the units and crossing them off as they cancel secures partial credit safely.",
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u1-l3",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 3,
    unitName: "Matter, Measurement & Atomic Structure",
    title: "Atomic Structure and Introduction to the Periodic Table",
    subtitle: "Subatomic particles, isotopes, average atomic mass — and the principle by which elements are arranged on the periodic table",
    overview:
      "The atom is the basic unit of chemistry. Our understanding of atomic structure has evolved from Dalton's atomic theory in the 19th century to the modern quantum model, but the core for Honors Chemistry is clear: how the three particles — protons, neutrons, and electrons — determine an atom's identity (atomic number) and mass (mass number), and how isotopes (same element, different neutron counts) contribute to the average atomic mass. These concepts form the basis for reading the periodic table, which then leads to electron configuration and periodic trends.",
    objectives: [
      "Compare the mass, charge, and location of protons, neutrons, and electrons, and explain the role each plays in determining atomic number and mass number",
      "Calculate the number of neutrons from atomic number (Z) and mass number (A), and find the number of electrons in an ion",
      "State the definition of isotopes and calculate an element's average atomic mass from each isotope's natural abundance and mass",
      "Locate periods, groups, metals, nonmetals, and metalloids on the periodic table, and predict why elements in the same group have similar chemical properties by linking it to electron configuration",
      "Describe, in chronological order, the key experiments and revisions of the Dalton, Thomson, Rutherford, Bohr, and modern atomic models",
    ],
    formulas: [
      "Mass number A = number of protons (Z) + number of neutrons (N)",
      "Number of neutrons N = A − Z",
      "Average atomic mass = Σ (isotope mass × fractional natural abundance)",
      "Number of electrons in an ion = Z − ionic charge",
    ],
    sections: [
      {
        title: "Subatomic Particles and the Identity of the Atom",
        subtitle: "How protons, neutrons, and electrons determine the kind of element and its ions",
        terms: [
          {
            term: "Atomic number (Z)",
            def: "The number of protons in the nucleus. It is the sole criterion that determines an element's chemical identity, and the same element always has the same Z. In a neutral atom, Z = number of electrons.",
          },
          {
            term: "Mass number (A)",
            def: "The sum of the protons and neutrons in the nucleus (A = Z + N). The electron's mass is negligibly small, so most of an atom's mass is concentrated in the nucleus. Nuclear symbol notation: ᴬzX (e.g. ¹²₆C is carbon-12).",
          },
          {
            term: "Ion",
            def: "An atom or molecule that has gained or lost electrons and therefore carries a charge. Losing electrons makes a cation, gaining them makes an anion. Number of electrons in an ion = Z − ionic charge (e.g. Na⁺ has 10 electrons, Cl⁻ has 18 electrons).",
          },
          {
            term: "Isotope",
            def: "Atoms of the same element with the same atomic number (protons) but different neutron counts, and therefore different mass numbers. Their chemical properties are identical, but the difference in mass causes slight differences in physical properties such as density and reaction rate. Examples: ¹H, ²H (deuterium), ³H (tritium).",
          },
        ],
        traps: [
          "The atomic number (Z) defines the element — changing the neutron count does not change the element. Carbon-12 and carbon-14 have different mass numbers but are both carbon (Z = 6). On the other hand, an atom with 6 neutrons but 7 protons is nitrogen (Z = 7). Don't fall for the trap that 'changing the neutrons makes a different element.'",
          "Confusing ions with isotopes is common. An ion has a changed number of electrons giving it a charge; an isotope has a different number of neutrons giving it a different mass. ²³Na and ²⁴Na are isotopes of each other, while Na and Na⁺ are an atom and its ion.",
        ],
        example:
          "Analyze the isotopes of chlorine (Cl). On the periodic table Cl has atomic number 17. ³⁵Cl has A = 35, so neutrons = 35 − 17 = 18; ³⁷Cl has neutrons = 37 − 17 = 20. Both isotopes have 17 protons so both are Cl, but their neutron counts differ. The Cl⁻ ion (chloride) gained 1 electron, so its electron count = 17 + 1 = 18. When a question asks about ³⁵Cl versus Cl⁻, be careful not to mix up the nuclear symbol notation with the ion notation.",
      },
      {
        title: "Average Atomic Mass and Introduction to the Periodic Table",
        subtitle: "How isotopic abundance sets the atomic mass, and how the periodic table arranges the elements",
        terms: [
          {
            term: "Average atomic mass",
            def: "The weighted average of the atomic masses of the naturally occurring isotopes, each weighted by its fractional natural abundance. The unit is the atomic mass unit (amu or u). The atomic mass shown on the periodic table is this weighted average.",
          },
          {
            term: "Period",
            def: "A horizontal row of the periodic table. Elements in the same period have the same number of electron shells (energy levels). The elements through period 3 (Na–Ar) are frequently dealt with in Honors Chemistry.",
          },
          {
            term: "Group (Family)",
            def: "A vertical column of the periodic table (1–18). Elements in the same group have the same number of valence electrons, so their chemical properties are similar. Group 1 is the alkali metals, group 17 the halogens, and group 18 the noble gases.",
          },
          {
            term: "Metal / Nonmetal / Metalloid",
            def: "A staircase line crossing the periodic table separates three regions. Metals (left/bottom): luster, electrical conductivity, ductility. Nonmetals (upper right): electrical insulators, brittle. Metalloids (adjacent to the staircase): semiconducting properties, including silicon (Si) and germanium (Ge).",
          },
        ],
        traps: [
          "In average-atomic-mass calculations you must convert abundance into a fraction (decimal). If an abundance is given as 75.77%, change it to 0.7577 before multiplying. Multiplying by the percentage as-is makes the atomic mass 100 times too large. Also check your work by confirming the result falls between the masses of the isotopes.",
          "Don't get confused by the periodic table numbering systems. The old naming (IA, IIA, etc.) and the current IUPAC 1–18 system are used interchangeably. Honors exams generally use 1–18, but remembering 'Group IA = Group 1 = alkali metals' lets you handle any notation.",
        ],
        example:
          "Calculate the average atomic mass of chlorine (Cl). In nature ³⁵Cl is 75.77% and ³⁷Cl is 24.23%. Average atomic mass = (34.969 amu × 0.7577) + (36.966 amu × 0.2423) = 26.496 + 8.957 = 35.453 amu. This matches the Cl atomic mass on the periodic table (35.45 amu). The simple average of the two isotope masses (35, 37) is 36, but the actual atomic mass 35.45 is closer to 35 because ³⁵Cl is far more abundant — that is the meaning of a weighted average.",
      },
      {
        title: "Historical Development of the Atomic Model",
        subtitle: "How decisive experiments revised the atomic model over time",
        terms: [
          {
            term: "Dalton's atomic theory",
            def: "Proposed in 1803. Key points: ① elements are made of indivisible atoms, ② atoms of the same element are identical, ③ compounds are combinations of atoms in fixed ratios, ④ chemical reactions rearrange atoms. It was unaware of subatomic particles and was later revised, but it grounds the law of definite proportions.",
          },
          {
            term: "Thomson's cathode-ray experiment and 'plum pudding' model",
            def: "In 1897, the cathode-ray-tube experiment discovered the electron. The atom was proposed as a sphere of evenly distributed positive charge with electrons embedded in it. It was the first to reveal the existence of electrons but could not account for the nucleus.",
          },
          {
            term: "Rutherford's gold foil experiment",
            def: "In 1911, alpha particles fired at gold foil mostly passed through, but a few scattered greatly. Conclusion: the atom's mass is concentrated in a small, dense, positively charged nucleus, and electrons orbit the empty space around it. This proposed the nuclear (planetary) model.",
          },
          {
            term: "Bohr model",
            def: "Proposed in 1913 to explain the line spectrum of the hydrogen atom. Electrons exist only in discrete orbits (energy levels) of specific energy, and they absorb or emit light when transitioning between orbits. It fits hydrogen well but is inaccurate for multi-electron atoms.",
          },
        ],
        traps: [
          "When interpreting Rutherford's results, the key evidence is that 'most alpha particles passed through.' If positive charge were spread out as in Thomson's model, all alpha particles should be deflected slightly and evenly. The fact that most passed straight through while only a few rebounded sharply is evidence that the atom's interior is mostly empty space with positive charge concentrated in one place (the nucleus). You must be able to describe the observation → inference chain in written form.",
        ],
        example:
          "Explain hydrogen's Balmer series line spectrum with the Bohr model. When an electron falls from the n = 3 to the n = 2 orbit, it emits light corresponding to the difference between the two energy levels (ΔE) — this is the red visible line (656 nm). The n = 4 → n = 2 transition has a larger ΔE, so it gives shorter-wavelength blue-green light (486 nm). Because energy exists only in discrete orbits, only specific wavelengths are emitted, producing a 'line spectrum.' The reason it is not a continuous spectrum is precisely the quantization of energy levels.",
      },
    ],
  },
];
