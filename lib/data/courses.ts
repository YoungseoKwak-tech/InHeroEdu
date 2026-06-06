export type Difficulty = "Intro" | "Intermediate" | "Advanced";
export type Category = "AP" | "IB" | "Honors" | "Core" | "Competition" | "Test Prep";

// IB-only metadata. Optional on Course; only set for category === "IB".
export type Curriculum = "AP" | "IB" | "A_LEVEL" | "SAT" | "OTHER";
export type IbGroup = 1 | 2 | 3 | 4 | 5 | 6;
export type IbLevel = "HL" | "SL" | "BOTH";

export interface Unit {
  number: number;
  title: string;
  slug: string;
  examWeight: string;
  topics: string[];
  // IB-only: which levels this unit is part of. Omit / undefined for AP.
  ibLevels?: IbLevel[];
  ibThemeCode?: string;
}

export interface Course {
  id: string;
  subject: string;
  subjectEn: string;
  category: Category;
  description: string;
  topicCount: number;
  difficulty: Difficulty;
  color: string;
  icon: string;
  lessonIds: string[];
  units?: Unit[];
  // IB-only fields. Undefined for AP/other curricula.
  curriculum?: Curriculum;
  ibGroup?: IbGroup;
  ibSyllabusFirstTeaching?: number;
  // When set, the course supports both HL and SL — lessons inside carry
  // ib_level: "HL" | "SL" | "BOTH" and the course page renders a toggle.
  ibLevels?: IbLevel[];
  // When set, the course page renders a "Open textbook" CTA that links
  // to /textbooks/<textbookSlug>. Today only AP Bio has a published
  // textbook; AP Chem / AP Physics will get slugs once they ship.
  textbookSlug?: string;
  // Catalog card availability flag. When set, the course card on /courses
  // surfaces a "Start lesson →" button that opens the course units page.
  // When unset, the card shows a disabled "Coming Soon" state.
  firstLessonId?: string;
}

export const courses: Course[] = [
  // ─── AP Sciences ────────────────────────────────────────────────────────
  {
    id: "ap-biology",
    subject: "AP Biology", subjectEn: "AP Biology", category: "AP",
    description: "From cell structure to genetics, master the full AP Biology sequence with an AI layer that remembers how you learn.",
    topicCount: 47, difficulty: "Intermediate", color: "from-green-500 to-emerald-600", icon: "🧬",
    lessonIds: [],
    textbookSlug: "ap-bio-ultimate",
    firstLessonId: "ap-biology-u1-l1",
    units: [
      {
        number: 1, title: "Chemistry of Life", slug: "chemistry-of-life", examWeight: "8–11%",
        topics: ["Structure of water and hydrogen bonding", "Elements of life", "Introduction to biological macromolecules", "Properties of biological macromolecules", "Structure and function of biological macromolecules"],
      },
      {
        number: 2, title: "Cell Structure and Function", slug: "cell-structure-and-function", examWeight: "10–13%",
        topics: ["Cell structure: prokaryotic and eukaryotic cells", "Cell size", "Plasma membranes", "Membrane permeability", "Membrane transport", "Facilitated diffusion", "Tonicity and osmoregulation", "Mechanisms of transport", "Cell compartmentalization"],
      },
      {
        number: 3, title: "Cellular Energetics", slug: "cellular-energetics", examWeight: "12–16%",
        topics: ["Enzymes", "Environmental impacts on enzyme function", "Cellular energy", "Photosynthesis", "Light-dependent reactions", "Calvin cycle", "Cellular respiration", "Glycolysis and pyruvate oxidation", "Krebs cycle and electron transport chain", "Fitness of the environment"],
      },
      {
        number: 4, title: "Cell Communication and Cell Cycle", slug: "cell-communication-and-cell-cycle", examWeight: "10–15%",
        topics: ["Cell communication", "Signal transduction", "Cellular responses", "Feedback mechanisms", "Cell cycle", "Regulation of cell cycle"],
      },
      {
        number: 5, title: "Heredity", slug: "heredity", examWeight: "8–11%",
        topics: ["Meiosis", "Meiosis and genetic diversity", "Mendelian genetics", "Non-Mendelian genetics", "Environmental effects on phenotype", "Chromosomal inheritance"],
      },
      {
        number: 6, title: "Gene Expression and Regulation", slug: "gene-expression-and-regulation", examWeight: "12–16%",
        topics: ["DNA and RNA structure", "Replication", "Transcription and RNA processing", "Translation", "Mutations", "Gene regulation", "Development", "Biotechnology"],
      },
      {
        number: 7, title: "Natural Selection", slug: "natural-selection", examWeight: "13–20%",
        topics: ["Introduction to natural selection", "Natural selection", "Artificial selection", "Population genetics", "Hardy-Weinberg equilibrium", "Evidence of evolution", "Common ancestry and phylogeny", "Speciation", "Extinction", "Origins of life on Earth"],
      },
      {
        number: 8, title: "Ecology", slug: "ecology", examWeight: "10–15%",
        topics: ["Responses to the environment", "Energy flow through ecosystems", "Population ecology", "Effect of density on populations", "Community ecology", "Biodiversity", "Disruptions to ecosystems"],
      },
    ],
  },
  {
    id: "ap-chemistry",
    subject: "AP Chemistry", subjectEn: "AP Chemistry", category: "AP",
    description: "Build from atomic structure and periodic trends to thermodynamics with a crisp, step-by-step AP Chemistry path.",
    topicCount: 52, difficulty: "Advanced", color: "from-blue-500 to-cyan-600", icon: "⚗️",
    lessonIds: [],
    textbookSlug: "ap-chem-ultimate",
    units: [
      {
        number: 1, title: "Atomic Structure and Properties", slug: "atomic-structure-and-properties", examWeight: "7–9%",
        topics: ["Moles and molar mass", "Mass spectroscopy of elements", "Elemental composition of pure substances", "Composition of mixtures", "Atomic structure and electron configuration", "Photoelectron spectroscopy", "Periodic trends", "Valence electrons and ionic compounds"],
      },
      {
        number: 2, title: "Molecular and Ionic Compound Structure and Properties", slug: "molecular-and-ionic-compound-structure", examWeight: "7–9%",
        topics: ["Types of chemical bonds", "Intramolecular force and potential energy", "Structure of ionic solids", "Structure of metals and alloys", "Lewis diagrams", "Resonance and formal charge", "VSEPR and bond hybridization"],
      },
      {
        number: 3, title: "Intermolecular Forces and Properties", slug: "intermolecular-forces-and-properties", examWeight: "18–22%",
        topics: ["Intermolecular forces", "Properties of solids", "Solids, liquids, and gases", "Kinetic molecular theory", "Deviation from ideal gas law", "Solutions and mixtures", "Photoelectric effect", "Beer-Lambert law"],
      },
      {
        number: 4, title: "Chemical Reactions", slug: "chemical-reactions", examWeight: "7–9%",
        topics: ["Introduction to reactions", "Net ionic equations", "Representations of reactions", "Physical and chemical changes", "Stoichiometry", "Introduction to titration", "Types of chemical reactions"],
      },
      {
        number: 5, title: "Kinetics", slug: "kinetics", examWeight: "7–9%",
        topics: ["Reaction rates", "Introduction to rate law", "Concentration changes over time", "Elementary reactions", "Collision model", "Reaction energy profile", "Introduction to reaction mechanisms", "Multistep reaction energy profile", "Catalysis"],
      },
      {
        number: 6, title: "Thermodynamics", slug: "thermodynamics", examWeight: "7–9%",
        topics: ["Endothermic and exothermic processes", "Energy diagrams", "Heat transfer and thermal equilibrium", "Heat capacity and calorimetry", "Energy of phase changes", "Introduction to enthalpy of reaction", "Bond enthalpies", "Enthalpy of formation", "Hess's law"],
      },
      {
        number: 7, title: "Equilibrium", slug: "equilibrium", examWeight: "7–9%",
        topics: ["Introduction to equilibrium", "Calculating equilibrium constant", "Calculating equilibrium concentrations", "Reaction quotient and equilibrium constant", "Magnitude of equilibrium constant", "Properties of the equilibrium constant", "Changing equilibrium conditions: Le Chatelier's principle", "Reaction quotient and Le Chatelier's principle", "Introduction to solubility equilibria", "Common-ion effect", "pH and solubility"],
      },
      {
        number: 8, title: "Acids and Bases", slug: "acids-and-bases", examWeight: "11–15%",
        topics: ["Introduction to acids and bases", "pH and pOH of strong acids and bases", "Weak acid and base equilibria", "Acid-base reactions and buffers", "Acid-base titrations", "Molecular structure of acids and bases", "pH and pKa", "Henderson-Hasselbalch equation", "Buffer capacity"],
      },
      {
        number: 9, title: "Applications of Thermodynamics", slug: "applications-of-thermodynamics", examWeight: "7–11%",
        topics: ["Introduction to entropy", "Absolute entropy and entropy change", "Gibbs free energy and thermodynamic favorability", "Thermodynamic and kinetic control", "Free energy and equilibrium", "Coupled reactions", "Galvanic (voltaic) cells", "Electrolysis and Faraday's law"],
      },
    ],
  },
  {
    id: "ap-environmental-science",
    subject: "AP Environmental Science", subjectEn: "AP Environmental Science", category: "AP",
    description: "Study ecosystems, energy, and environmental challenges with data-driven scientific reasoning.",
    topicCount: 38, difficulty: "Intermediate", color: "from-green-400 to-teal-500", icon: "🌱",
    lessonIds: [],
    units: [
      {
        number: 1, title: "The Living World: Ecosystems", slug: "living-world-ecosystems", examWeight: "6–8%",
        topics: ["Introduction to ecosystems", "Terrestrial biomes", "Aquatic biomes", "The carbon cycle", "The nitrogen cycle", "The phosphorus cycle", "The hydrologic cycle", "Primary productivity", "Trophic levels", "Energy flow and the 10% rule", "Food chains and food webs"],
      },
      {
        number: 2, title: "The Living World: Biodiversity", slug: "living-world-biodiversity", examWeight: "6–8%",
        topics: ["Introduction to biodiversity", "Ecosystem services", "Island biogeography", "Ecological tolerance", "Natural disruptions to ecosystems", "Adaptations", "Ecological succession"],
      },
      {
        number: 3, title: "Populations", slug: "populations", examWeight: "10–15%",
        topics: ["Generalist and specialist species", "K-selected and r-selected species", "Survivorship curves", "Carrying capacity", "Population growth and resource availability", "Age structure diagrams", "Total fertility rate", "Human population dynamics", "Demographic transition"],
      },
      {
        number: 4, title: "Earth Systems and Resources", slug: "earth-systems-and-resources", examWeight: "10–15%",
        topics: ["Plate tectonics", "Soil formation and erosion", "Soil composition and properties", "Earth's atmosphere", "Global wind patterns", "Watersheds", "Solar energy and the seasons", "Earth's geography and climate", "El Niño and La Niña"],
      },
      {
        number: 5, title: "Land and Water Use", slug: "land-and-water-use", examWeight: "10–15%",
        topics: ["Introduction to land and water use", "Feeding the world", "The Green Revolution", "Impacts of agricultural practices", "Irrigation methods", "Pest control methods", "Meat production methods", "Impacts of meat production", "Aquaculture", "Impacts of fishing", "Mining", "Impacts of mining", "Urbanization", "Ecological footprints", "Introduction to sustainability", "Methods of achieving sustainability", "Sustainable agriculture"],
      },
      {
        number: 6, title: "Energy Resources and Consumption", slug: "energy-resources-and-consumption", examWeight: "10–15%",
        topics: ["Renewable and nonrenewable resources", "Global energy consumption", "Fuel types and uses", "Nuclear power", "Energy from biomass", "Solar energy", "Hydroelectric power", "Geothermal energy", "Hydrogen fuel cells", "Wind energy", "Energy conservation"],
      },
      {
        number: 7, title: "Atmospheric Pollution", slug: "atmospheric-pollution", examWeight: "7–10%",
        topics: ["Introduction to air pollution", "Photochemical smog", "Thermal inversion", "Atmospheric CO2 and particulates", "Indoor air pollutants", "Reduction of air pollutants", "Acid rain", "Noise pollution"],
      },
      {
        number: 8, title: "Aquatic and Terrestrial Pollution", slug: "aquatic-and-terrestrial-pollution", examWeight: "7–10%",
        topics: ["Sources of pollution", "Human impacts on ecosystems", "Endocrine disruptors", "Human impacts on wetlands and mangroves", "Eutrophication", "Thermal pollution", "Persistent organic pollutants (POPs)", "Bioaccumulation and biomagnification", "Solid waste disposal", "Waste reduction methods", "Sewage treatment", "Lethal dose 50% (LD50)", "Dose response curve", "Pollution and human health", "Pathogens and infectious diseases"],
      },
      {
        number: 9, title: "Global Change", slug: "global-change", examWeight: "15–20%",
        topics: ["Stratospheric ozone depletion", "Reducing ozone depletion", "The greenhouse effect", "Increases in the greenhouse gases", "Global climate change", "Ocean warming", "Ocean acidification", "Invasive species", "Endangered species", "Human impacts on biodiversity"],
      },
    ],
  },
  {
    id: "ap-physics-1",
    subject: "AP Physics 1", subjectEn: "AP Physics 1", category: "AP",
    description: "Master algebra-based mechanics through kinematics, forces, energy, momentum, rotation, oscillations, and gravitation.",
    topicCount: 42, difficulty: "Intermediate", color: "from-sky-500 to-blue-600", icon: "🔭",
    lessonIds: [],
    textbookSlug: "ap-physics-ultimate",
    units: [
      {
        number: 1, title: "Kinematics", slug: "kinematics", examWeight: "12–18%",
        topics: ["Position, velocity, and acceleration", "Representations of motion", "Reference frames and relative motion", "Free fall and projectile motion"],
      },
      {
        number: 2, title: "Forces and Newton's Laws of Motion", slug: "forces-and-newtons-laws", examWeight: "16–20%",
        topics: ["Systems and center of mass", "Forces and free-body diagrams", "Newton's first law", "Newton's second law", "Newton's third law", "Gravitational force", "Contact forces", "Circular motion"],
      },
      {
        number: 3, title: "Work, Energy, and Power", slug: "work-energy-and-power", examWeight: "20–28%",
        topics: ["Translational kinetic energy", "Work", "Work–energy theorem", "Conservative and nonconservative forces", "Potential energy", "Conservation of energy", "Power"],
      },
      {
        number: 4, title: "Systems of Particles and Linear Momentum", slug: "linear-momentum", examWeight: "12–18%",
        topics: ["Center of mass motion", "Linear momentum", "Impulse and momentum", "Conservation of momentum", "Elastic and inelastic collisions"],
      },
      {
        number: 5, title: "Rotation", slug: "rotation", examWeight: "12–18%",
        topics: ["Rotational kinematics", "Torque and rotational dynamics", "Rotational inertia", "Newton's second law for rotation", "Angular momentum and its conservation", "Rolling motion"],
      },
      {
        number: 6, title: "Oscillations", slug: "oscillations", examWeight: "4–6%",
        topics: ["Simple harmonic motion", "Period of simple harmonic oscillators", "Energy of oscillations"],
      },
      {
        number: 7, title: "Gravitation", slug: "gravitation", examWeight: "6–8%",
        topics: ["Gravitational forces", "Gravitational fields", "Orbits of planets and satellites", "Gravitational potential energy beyond Earth's surface"],
      },
    ],
  },
  {
    id: "ap-physics-2",
    subject: "AP Physics 2", subjectEn: "AP Physics 2", category: "AP",
    description: "Algebra-based physics covering fluids, thermodynamics, electricity, magnetism, optics, and modern physics.",
    topicCount: 40, difficulty: "Intermediate", color: "from-blue-500 to-indigo-600", icon: "⚡",
    lessonIds: [],
    textbookSlug: "ap-physics-2-ultimate",
    units: [
      {
        number: 1, title: "Fluids", slug: "fluids", examWeight: "15–18%",
        topics: ["Density", "Pressure and buoyancy", "Fluids and Newton's laws", "Bernoulli's equation and fluid continuity"],
      },
      {
        number: 2, title: "Thermodynamics", slug: "thermodynamics", examWeight: "12–18%",
        topics: ["Thermodynamic systems", "Internal energy and heat", "Ideal gas law", "Thermodynamic processes", "Laws of thermodynamics", "Heat engines and thermal efficiency"],
      },
      {
        number: 3, title: "Electric Force, Field, and Potential", slug: "electric-force-field-potential", examWeight: "18–22%",
        topics: ["Electric charge and Coulomb's law", "Electric field", "Electric flux and Gauss's law", "Electric potential", "Electric potential difference", "Capacitors"],
      },
      {
        number: 4, title: "Electric Circuits", slug: "electric-circuits", examWeight: "10–14%",
        topics: ["Electric current", "Resistance and Ohm's law", "Power in circuits", "Series and parallel circuits", "RC circuits"],
      },
      {
        number: 5, title: "Magnetism and Electromagnetic Induction", slug: "magnetism-and-em-induction", examWeight: "14–17%",
        topics: ["Magnetic fields and forces", "Magnetic flux", "Electromagnetic induction and Faraday's law", "Inductance"],
      },
      {
        number: 6, title: "Geometric and Physical Optics", slug: "optics", examWeight: "12–14%",
        topics: ["Reflection and mirrors", "Refraction and lenses", "Wave interference", "Diffraction"],
      },
      {
        number: 7, title: "Quantum, Atomic, and Nuclear Physics", slug: "quantum-atomic-nuclear", examWeight: "10–15%",
        topics: ["Wave–particle duality", "Photoelectric effect", "Atomic spectra and Bohr model", "Radioactive decay", "Nuclear reactions"],
      },
    ],
  },
  {
    id: "ap-physics-c-mech",
    subject: "AP Physics C: Mechanics", subjectEn: "AP Physics C: Mechanics", category: "AP",
    description: "Calculus-based mechanics from Newton's laws through rotation, oscillations, and gravitation.",
    topicCount: 44, difficulty: "Advanced", color: "from-blue-600 to-indigo-600", icon: "⚙️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Kinematics", slug: "kinematics", examWeight: "6–14%",
        topics: ["Motion in one dimension", "Motion in two dimensions", "Derivatives and integrals of position, velocity, acceleration"],
      },
      {
        number: 2, title: "Newton's Laws of Motion", slug: "newtons-laws-of-motion", examWeight: "17–23%",
        topics: ["Forces and free-body diagrams", "Newton's second law (F = ma)", "Friction", "Drag forces", "Circular motion", "Non-inertial reference frames"],
      },
      {
        number: 3, title: "Work, Energy, and Power", slug: "work-energy-power", examWeight: "14–17%",
        topics: ["Work done by constant and variable forces", "Work–energy theorem", "Conservative forces and potential energy", "Conservation of mechanical energy", "Power"],
      },
      {
        number: 4, title: "Systems of Particles and Linear Momentum", slug: "systems-linear-momentum", examWeight: "14–17%",
        topics: ["Center of mass", "Impulse and linear momentum", "Conservation of linear momentum", "Collisions (elastic and inelastic)"],
      },
      {
        number: 5, title: "Rotation", slug: "rotation", examWeight: "14–20%",
        topics: ["Rotational kinematics", "Rotational inertia (moment of inertia)", "Torque and Newton's second law for rotation", "Angular momentum", "Conservation of angular momentum", "Rolling without slipping"],
      },
      {
        number: 6, title: "Oscillations", slug: "oscillations", examWeight: "6–14%",
        topics: ["Simple harmonic motion", "Simple pendulum", "Physical pendulum", "Mass-spring systems", "Damped and driven oscillations"],
      },
      {
        number: 7, title: "Gravitation", slug: "gravitation", examWeight: "6–14%",
        topics: ["Newton's law of gravitation", "Gravitational fields", "Gravitational potential energy", "Orbits and Kepler's laws", "Escape velocity"],
      },
    ],
  },
  {
    id: "ap-physics-c-em",
    subject: "AP Physics C: E&M", subjectEn: "AP Physics C: E&M", category: "AP",
    description: "Calculus-based electricity and magnetism from electrostatics through Maxwell's equations and induction.",
    topicCount: 40, difficulty: "Advanced", color: "from-indigo-600 to-purple-600", icon: "⚡",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Electrostatics", slug: "electrostatics", examWeight: "26–34%",
        topics: ["Electric charge and Coulomb's law", "Electric field", "Gauss's law", "Electric potential", "Potential due to point charges and charge distributions", "Conductors in electrostatic equilibrium"],
      },
      {
        number: 2, title: "Conductors, Capacitors, and Dielectrics", slug: "conductors-capacitors-dielectrics", examWeight: "14–17%",
        topics: ["Capacitance", "Parallel plate capacitors", "Combinations of capacitors", "Energy stored in a capacitor", "Dielectrics"],
      },
      {
        number: 3, title: "Electric Circuits", slug: "electric-circuits", examWeight: "17–20%",
        topics: ["Current and resistance", "Ohm's law", "Power", "Series and parallel resistors", "Kirchhoff's rules", "Capacitors in circuits (RC circuits)"],
      },
      {
        number: 4, title: "Magnetic Fields", slug: "magnetic-fields", examWeight: "17–20%",
        topics: ["Forces on moving charges", "Forces on current-carrying wires", "Magnetic fields from currents", "Ampere's law", "Biot-Savart law"],
      },
      {
        number: 5, title: "Electromagnetism", slug: "electromagnetism", examWeight: "14–20%",
        topics: ["Magnetic flux", "Faraday's law", "Lenz's law", "Inductance and RL circuits", "Maxwell's equations (conceptual)"],
      },
    ],
  },
  // ─── AP Math & Computer Science ────────────────────────────────────────
  {
    id: "ap-calculus-ab",
    subject: "AP Calculus AB", subjectEn: "AP Calculus AB", category: "AP",
    description: "Learn core differentiation and integration with a strong foundation before advancing into BC.",
    topicCount: 48, difficulty: "Intermediate", color: "from-orange-500 to-amber-600", icon: "∫",
    lessonIds: [],
    firstLessonId: "ap-calculus-ab-u1-l1",
    units: [
      {
        number: 1, title: "Limits and Continuity", slug: "limits-and-continuity", examWeight: "10–12%",
        topics: ["Introducing limits", "Estimating limit values", "Limit definition and properties", "Limits involving infinity", "Continuity", "Intermediate value theorem"],
      },
      {
        number: 2, title: "Differentiation: Definition and Fundamental Properties", slug: "differentiation-definition", examWeight: "10–12%",
        topics: ["Average vs. instantaneous rate of change", "Limit definition of derivative", "Basic differentiation rules", "Derivatives of trigonometric functions", "Derivatives of exponential and logarithmic functions"],
      },
      {
        number: 3, title: "Differentiation: Composite, Implicit, and Inverse Functions", slug: "differentiation-advanced", examWeight: "9–13%",
        topics: ["Chain rule", "Implicit differentiation", "Differentiating inverse functions", "Higher-order derivatives"],
      },
      {
        number: 4, title: "Contextual Applications of Differentiation", slug: "contextual-applications-differentiation", examWeight: "10–15%",
        topics: ["Meaning of derivative in context", "Straight-line motion", "Related rates", "Approximating values using local linearity and linearization", "L'Hôpital's rule"],
      },
      {
        number: 5, title: "Analytical Applications of Differentiation", slug: "analytical-applications-differentiation", examWeight: "15–18%",
        topics: ["Mean value theorem", "Extreme value theorem and critical points", "Intervals of increase and decrease", "First and second derivative tests", "Concavity and inflection points", "Connecting f, f′, and f″", "Optimization"],
      },
      {
        number: 6, title: "Integration and Accumulation of Change", slug: "integration-and-accumulation", examWeight: "17–20%",
        topics: ["Accumulation and Riemann sums", "Definite integrals", "Fundamental theorem of calculus", "Antiderivatives and indefinite integrals", "Integration by substitution"],
      },
      {
        number: 7, title: "Differential Equations", slug: "differential-equations", examWeight: "6–12%",
        topics: ["Modeling with differential equations", "Slope fields", "Separation of variables", "Exponential models"],
      },
      {
        number: 8, title: "Applications of Integration", slug: "applications-of-integration", examWeight: "10–15%",
        topics: ["Average value of a function", "Straight-line motion with integrals", "Area between curves", "Volume by cross sections", "Volume with disc and washer methods"],
      },
    ],
  },
  {
    id: "ap-calculus-bc",
    subject: "AP Calculus BC", subjectEn: "AP Calculus BC", category: "AP",
    description: "Move from limits to series and parametric equations with the full AB scope plus BC extensions.",
    topicCount: 61, difficulty: "Advanced", color: "from-purple-500 to-violet-600", icon: "∫",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Limits and Continuity", slug: "limits-and-continuity", examWeight: "4–7%",
        topics: ["Introducing limits", "Limit definition and properties", "Limits involving infinity", "Continuity", "Intermediate value theorem"],
      },
      {
        number: 2, title: "Differentiation: Definition and Fundamental Properties", slug: "differentiation-definition", examWeight: "4–7%",
        topics: ["Average vs. instantaneous rate of change", "Limit definition of derivative", "Basic differentiation rules", "Derivatives of trigonometric, exponential, and logarithmic functions"],
      },
      {
        number: 3, title: "Differentiation: Composite, Implicit, and Inverse Functions", slug: "differentiation-advanced", examWeight: "4–7%",
        topics: ["Chain rule", "Implicit differentiation", "Differentiating inverse functions"],
      },
      {
        number: 4, title: "Contextual Applications of Differentiation", slug: "contextual-applications-differentiation", examWeight: "6–9%",
        topics: ["Meaning of derivative", "Related rates", "L'Hôpital's rule"],
      },
      {
        number: 5, title: "Analytical Applications of Differentiation", slug: "analytical-applications-differentiation", examWeight: "8–11%",
        topics: ["Mean value theorem", "Critical points and extrema", "Intervals of increase/decrease", "Concavity and optimization"],
      },
      {
        number: 6, title: "Integration and Accumulation of Change", slug: "integration-and-accumulation", examWeight: "17–20%",
        topics: ["Riemann sums and definite integrals", "Fundamental theorem of calculus", "Integration by substitution", "Integration by parts", "Partial fractions", "Improper integrals"],
      },
      {
        number: 7, title: "Differential Equations", slug: "differential-equations", examWeight: "6–9%",
        topics: ["Slope fields", "Separation of variables", "Logistic differential equation", "Euler's method"],
      },
      {
        number: 8, title: "Applications of Integration", slug: "applications-of-integration", examWeight: "6–9%",
        topics: ["Area between curves", "Volume using disc, washer, and shell methods", "Arc length", "Straight-line motion"],
      },
      {
        number: 9, title: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions", slug: "parametric-polar-vector", examWeight: "11–12%",
        topics: ["Parametric equations and calculus", "Vector-valued functions", "Polar coordinates", "Areas and arc lengths in polar form"],
      },
      {
        number: 10, title: "Infinite Sequences and Series", slug: "infinite-sequences-and-series", examWeight: "17–18%",
        topics: ["Convergence and divergence of series", "Geometric series", "p-series and comparison tests", "Ratio and root tests", "Alternating series", "Power series", "Taylor and Maclaurin series", "Lagrange error bound"],
      },
    ],
  },
  {
    id: "ap-precalculus",
    subject: "AP Precalculus", subjectEn: "AP Precalculus", category: "AP",
    description: "Bridge into calculus through functions, trigonometry, and polar systems with confidence.",
    topicCount: 38, difficulty: "Intro", color: "from-yellow-500 to-orange-500", icon: "📐",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Polynomial and Rational Functions", slug: "polynomial-and-rational-functions", examWeight: "30–40%",
        topics: ["Change in tandem", "Rates of change", "Polynomial functions", "Polynomial division and factoring", "Zeros of polynomial functions", "Polynomial graphs", "Rational functions", "Rational function graphs", "Equivalent representations"],
      },
      {
        number: 2, title: "Exponential and Logarithmic Functions", slug: "exponential-and-logarithmic-functions", examWeight: "27–40%",
        topics: ["Exponential functions", "Exponential function manipulation", "Exponential function context and data modeling", "Logarithmic expressions", "Logarithmic functions", "Logarithmic function manipulation", "Exponential and logarithmic equations", "Exponential and logarithmic function context and data modeling"],
      },
      {
        number: 3, title: "Trigonometric and Polar Functions", slug: "trigonometric-and-polar-functions", examWeight: "30–35%",
        topics: ["Periodic phenomena", "Sine, cosine, and tangent", "Sine and cosine function values", "Sine and cosine function graphs", "Sinusoidal functions", "Sinusoidal function transformations", "Sinusoidal function context and data modeling", "Inverse trigonometric functions", "Trigonometric equations and inequalities", "The tangent function", "Polar coordinate system"],
      },
      {
        number: 4, title: "Functions Involving Parameters, Vectors, and Matrices", slug: "parameters-vectors-matrices", examWeight: "Not on AP Exam (coursework only)",
        topics: ["Parametric functions", "Implicitly defined functions", "Conic sections", "Parametric equations and rates of change", "Vectors", "Matrices and linear transformations"],
      },
    ],
  },
  {
    id: "ap-statistics",
    subject: "AP Statistics", subjectEn: "AP Statistics", category: "AP",
    description: "Interpret data, probability, and inference with a practical AP Statistics framework.",
    topicCount: 36, difficulty: "Intermediate", color: "from-teal-500 to-emerald-600", icon: "📊",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Exploring One-Variable Data", slug: "exploring-one-variable-data", examWeight: "15–23%",
        topics: ["Introducing statistics", "The language of variation", "Representing a categorical variable with tables and graphs", "Representing a quantitative variable with graphs", "Describing the distribution of a quantitative variable", "Summary statistics for a quantitative variable", "Graphical representations of summary statistics", "Comparing distributions", "The normal distribution"],
      },
      {
        number: 2, title: "Exploring Two-Variable Data", slug: "exploring-two-variable-data", examWeight: "5–7%",
        topics: ["Introducing statistics: Are variables related?", "Representing two categorical variables", "Statistics for two categorical variables", "Representing the relationship between two quantitative variables", "Correlation", "Linear regression models", "Residuals", "Least squares regression", "Analyzing departures from linearity"],
      },
      {
        number: 3, title: "Collecting Data", slug: "collecting-data", examWeight: "12–15%",
        topics: ["Introduction to planning a study", "Random sampling and data collection", "Potential problems with sampling", "Introduction to experimental design", "Selecting an experimental design", "Inference and experiments"],
      },
      {
        number: 4, title: "Probability, Random Variables, and Probability Distributions", slug: "probability-and-distributions", examWeight: "10–20%",
        topics: ["Introducing statistics: Random and non-random patterns", "Estimating probabilities using simulation", "Introduction to probability", "Mutually exclusive events", "Conditional probability", "Independent events and unions of events", "Introduction to random variables and probability distributions", "Mean and standard deviation of random variables", "Combining random variables", "Introduction to the binomial distribution", "Parameters for a binomial distribution", "The geometric distribution"],
      },
      {
        number: 5, title: "Sampling Distributions", slug: "sampling-distributions", examWeight: "7–12%",
        topics: ["Variation in statistics", "The sampling distribution of a sample proportion", "The sampling distribution of a sample mean", "The central limit theorem"],
      },
      {
        number: 6, title: "Inference for Categorical Data: Proportions", slug: "inference-for-proportions", examWeight: "12–15%",
        topics: ["Introduction to confidence intervals", "Confidence intervals for a proportion", "Justifying a claim based on a confidence interval", "Setting up a test for a population proportion", "Interpreting p-values", "Concluding a test for a proportion", "Potential errors in testing"],
      },
      {
        number: 7, title: "Inference for Quantitative Data: Means", slug: "inference-for-means", examWeight: "10–18%",
        topics: ["Constructing a confidence interval for a mean", "Setting up a test for a population mean", "Carrying out a test for a population mean", "Inference for the difference of two means"],
      },
      {
        number: 8, title: "Inference for Categorical Data: Chi-Square", slug: "inference-chi-square", examWeight: "2–5%",
        topics: ["Setting up a chi-square goodness of fit test", "Carrying out a chi-square goodness of fit test", "Expected counts in two-way tables", "Setting up and carrying out a chi-square test for homogeneity or independence"],
      },
      {
        number: 9, title: "Inference for Quantitative Data: Slopes", slug: "inference-for-slopes", examWeight: "2–5%",
        topics: ["Confidence intervals for the slope of a regression model", "Setting up a test for the slope of a regression model", "Carrying out a test for the slope of a regression model"],
      },
    ],
  },
  {
    id: "ap-computer-science-a",
    subject: "AP Computer Science A", subjectEn: "AP Computer Science A", category: "AP",
    description: "Learn Java, object-oriented design, and problem-solving fundamentals in a structured coding path.",
    topicCount: 45, difficulty: "Intermediate", color: "from-gray-600 to-gray-800", icon: "💻",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Primitive Types", slug: "primitive-types", examWeight: "2.5–5%",
        topics: ["Why programming? Why Java?", "Variables and data types", "Expressions and assignment statements", "Compound assignment operators", "Casting and ranges of variables"],
      },
      {
        number: 2, title: "Using Objects", slug: "using-objects", examWeight: "5–7.5%",
        topics: ["Objects: Instances of classes", "Creating and storing objects (instantiation)", "Calling a void method", "Calling a non-void method", "Calling methods with parameters", "String methods", "Math class", "Using the Java API"],
      },
      {
        number: 3, title: "Boolean Expressions and if Statements", slug: "boolean-expressions-and-if-statements", examWeight: "15–17.5%",
        topics: ["Boolean expressions", "If statements and control flow", "If-else statements", "Nested if statements and else if statements", "Compound boolean expressions", "Equivalent boolean expressions", "Comparing objects"],
      },
      {
        number: 4, title: "Iteration", slug: "iteration", examWeight: "17.5–22.5%",
        topics: ["While loops", "For loops", "Developing algorithms using strings", "Nested iteration", "Informal code analysis"],
      },
      {
        number: 5, title: "Writing Classes", slug: "writing-classes", examWeight: "5–7.5%",
        topics: ["Anatomy of a class", "Constructors", "Documentation with comments", "Accessor methods", "Mutator methods", "Writing methods", "Static variables and methods", "Scope and access", "this keyword"],
      },
      {
        number: 6, title: "Array", slug: "array", examWeight: "10–15%",
        topics: ["Array creation and access", "Traversing arrays", "Enhanced for loop for arrays", "Developing algorithms using arrays"],
      },
      {
        number: 7, title: "ArrayList", slug: "arraylist", examWeight: "2.5–7.5%",
        topics: ["Introduction to ArrayList", "ArrayList methods", "Traversing ArrayLists", "Developing algorithms using ArrayLists", "Searching and sorting ArrayLists"],
      },
      {
        number: 8, title: "2D Array", slug: "2d-array", examWeight: "7.5–10%",
        topics: ["2D arrays", "Traversing 2D arrays"],
      },
      {
        number: 9, title: "Inheritance", slug: "inheritance", examWeight: "5–10%",
        topics: ["Creating superclasses and subclasses", "Writing constructors for subclasses", "Overriding methods", "super keyword", "Creating references using inheritance hierarchies", "Polymorphism", "Object class"],
      },
      {
        number: 10, title: "Recursion", slug: "recursion", examWeight: "5–7.5%",
        topics: ["Recursion", "Recursive searching and sorting"],
      },
    ],
  },
  {
    id: "ap-cs-principles",
    subject: "AP Computer Science Principles", subjectEn: "AP Computer Science Principles", category: "AP",
    description: "Explore programming, data, the internet, and cybersecurity in a broad CS foundation course.",
    topicCount: 32, difficulty: "Intro", color: "from-gray-500 to-slate-600", icon: "🖥️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Creative Development", slug: "creative-development", examWeight: "10–13%",
        topics: ["Collaboration", "Program function and purpose", "Program design and development", "Identifying and correcting errors"],
      },
      {
        number: 2, title: "Data", slug: "data", examWeight: "17–22%",
        topics: ["Binary numbers", "Data compression", "Extracting information from data", "Using programs with data"],
      },
      {
        number: 3, title: "Algorithms and Programming", slug: "algorithms-and-programming", examWeight: "30–35%",
        topics: ["Variables and assignments", "Data abstraction", "Mathematical expressions", "Strings", "Boolean expressions and conditionals", "Iteration", "Developing procedures", "Libraries", "Random values", "Simulations", "Algorithm efficiency", "Undecidable problems"],
      },
      {
        number: 4, title: "Computer Systems and Networks", slug: "computer-systems-and-networks", examWeight: "11–15%",
        topics: ["The internet", "Fault tolerance", "Parallel and distributed computing"],
      },
      {
        number: 5, title: "Impact of Computing", slug: "impact-of-computing", examWeight: "21–26%",
        topics: ["Beneficial and harmful effects", "Digital divide", "Computing bias", "Crowdsourcing", "Legal and ethical concerns", "Safe computing"],
      },
    ],
  },
  // ─── AP History & Social Sciences ────────────────────────────────────
  {
    id: "ap-us-history",
    subject: "AP US History", subjectEn: "AP US History", category: "AP",
    description: "Move from the colonial era to the modern United States with DBQ and LEQ support built in.",
    topicCount: 55, difficulty: "Intermediate", color: "from-amber-600 to-yellow-700", icon: "🗽",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Period 1: 1491–1607", slug: "period-1-1491-1607", examWeight: "4–6%",
        topics: ["Native American societies before European contact", "European exploration and conquest", "The Columbian Exchange"],
      },
      {
        number: 2, title: "Period 2: 1607–1754", slug: "period-2-1607-1754", examWeight: "6–8%",
        topics: ["Colonial society", "Transatlantic trade and slavery", "Colonial politics and government", "Colonial culture and religion"],
      },
      {
        number: 3, title: "Period 3: 1754–1800", slug: "period-3-1754-1800", examWeight: "10–17%",
        topics: ["The Seven Years' War", "The American Revolution", "The Articles of Confederation", "The Constitution and Federalism", "The new republic"],
      },
      {
        number: 4, title: "Period 4: 1800–1848", slug: "period-4-1800-1848", examWeight: "10–17%",
        topics: ["The Age of Jefferson", "The Market Revolution", "Democracy and political change", "Antebellum reform movements", "Manifest Destiny"],
      },
      {
        number: 5, title: "Period 5: 1844–1877", slug: "period-5-1844-1877", examWeight: "10–17%",
        topics: ["Sectionalism and the road to Civil War", "The Civil War", "Reconstruction"],
      },
      {
        number: 6, title: "Period 6: 1865–1898", slug: "period-6-1865-1898", examWeight: "10–17%",
        topics: ["The Gilded Age", "Industrialization and labor", "The New South", "Western settlement and conflict", "Populism"],
      },
      {
        number: 7, title: "Period 7: 1890–1945", slug: "period-7-1890-1945", examWeight: "10–17%",
        topics: ["Progressivism", "Imperialism", "World War I", "The 1920s", "The Great Depression", "The New Deal", "World War II"],
      },
      {
        number: 8, title: "Period 8: 1945–1980", slug: "period-8-1945-1980", examWeight: "10–17%",
        topics: ["The Cold War", "Postwar prosperity", "The Civil Rights Movement", "The Great Society", "Vietnam War", "Challenges of the 1970s"],
      },
      {
        number: 9, title: "Period 9: 1980–Present", slug: "period-9-1980-present", examWeight: "4–6%",
        topics: ["Conservatism and the Reagan Revolution", "End of the Cold War", "Globalization", "The 21st century"],
      },
    ],
  },
  {
    id: "ap-world-history",
    subject: "AP World History", subjectEn: "AP World History", category: "AP",
    description: "Trace global civilizations over time while building comparative and historical reasoning skills.",
    topicCount: 58, difficulty: "Intermediate", color: "from-lime-600 to-green-700", icon: "🌍",
    lessonIds: [],
    units: [
      {
        number: 1, title: "The Global Tapestry, 1200–1450", slug: "global-tapestry", examWeight: "8–10%",
        topics: ["Developments in East Asia", "Developments in Dar al-Islam", "Developments in South and Southeast Asia", "State building in the Americas", "State building in Africa", "Developments in Europe", "Comparisons in the period"],
      },
      {
        number: 2, title: "Networks of Exchange, 1200–1450", slug: "networks-of-exchange", examWeight: "8–10%",
        topics: ["The Silk Roads", "The Mongol Empire and the making of the modern world", "Exchange in the Indian Ocean", "Trans-Saharan trade routes", "The spread of technology and culture"],
      },
      {
        number: 3, title: "Land-Based Empires, 1450–1750", slug: "land-based-empires", examWeight: "12–15%",
        topics: ["Gunpowder empires", "The Ottoman Empire", "The Mughal Empire", "The Ming and Qing dynasties", "Legitimating power in land-based empires"],
      },
      {
        number: 4, title: "Transoceanic Interconnections, 1450–1750", slug: "transoceanic-interconnections", examWeight: "12–15%",
        topics: ["European exploration and trade", "The Columbian Exchange", "The Atlantic slave trade", "Comparative colonialism", "Maritime empires and their economies"],
      },
      {
        number: 5, title: "Revolutions, 1750–1900", slug: "revolutions", examWeight: "12–15%",
        topics: ["The Enlightenment and its effects", "The American Revolution", "The French Revolution and Napoleon", "Revolutions in Latin America", "Industrial Revolution origins and spread", "Industrialization and society"],
      },
      {
        number: 6, title: "Consequences of Industrialization, 1750–1900", slug: "consequences-of-industrialization", examWeight: "12–15%",
        topics: ["Industrialization and migration", "Economic imperialism", "New imperialism in Africa and Asia", "Resistance to imperialism", "The railroad and global integration"],
      },
      {
        number: 7, title: "Global Conflict, 1900–Present", slug: "global-conflict", examWeight: "8–10%",
        topics: ["World War I causes and effects", "The interwar period", "World War II causes and effects", "Mass atrocities and genocide"],
      },
      {
        number: 8, title: "Cold War and Decolonization, 1900–Present", slug: "cold-war-and-decolonization", examWeight: "8–10%",
        topics: ["The Cold War", "Decolonization in Africa and Asia", "Independence movements", "Spread of communism and capitalism"],
      },
      {
        number: 9, title: "Globalization, 1900–Present", slug: "globalization", examWeight: "8–10%",
        topics: ["Advances in technology and exchange", "Technological advances and limits", "Disease, science, and medicine", "Economic globalization", "Challenges of globalization", "Social change"],
      },
    ],
  },
  {
    id: "ap-european-history",
    subject: "AP European History", subjectEn: "AP European History", category: "AP",
    description: "Survey European history from the Renaissance to the present with a focus on historical reasoning and evidence.",
    topicCount: 50, difficulty: "Intermediate", color: "from-blue-600 to-indigo-700", icon: "🏛️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Renaissance and Exploration, c. 1450 to c. 1648", slug: "renaissance-and-exploration", examWeight: "10%",
        topics: ["Italian Renaissance", "Northern Renaissance", "The printing press", "The Scientific Revolution", "European exploration and colonization"],
      },
      {
        number: 2, title: "Age of Reformation, c. 1450 to c. 1648", slug: "age-of-reformation", examWeight: "10%",
        topics: ["The Protestant Reformation", "Catholic Reformation (Counter-Reformation)", "Religious wars", "Witch hunts and social change", "Family and gender roles"],
      },
      {
        number: 3, title: "Absolutism and Constitutionalism, c. 1648 to c. 1815", slug: "absolutism-and-constitutionalism", examWeight: "10%",
        topics: ["Absolutism in France", "The English constitutional monarchy", "Eastern European absolutism", "Balance of power and warfare"],
      },
      {
        number: 4, title: "Scientific, Philosophical, and Political Developments, c. 1648 to c. 1815", slug: "scientific-philosophical-political", examWeight: "10%",
        topics: ["The Scientific Revolution (continued)", "The Enlightenment", "Enlightened despotism", "Enlightenment and religion"],
      },
      {
        number: 5, title: "Conflict, Crisis, and Reaction in the Late 18th Century, c. 1648 to c. 1815", slug: "conflict-crisis-reaction", examWeight: "10%",
        topics: ["The French Revolution", "Napoleon", "The Congress of Vienna", "Romanticism"],
      },
      {
        number: 6, title: "Industrialization and Its Effects, c. 1815 to c. 1914", slug: "industrialization", examWeight: "10%",
        topics: ["Origins of the Industrial Revolution", "Spread of industrialization", "Social effects of industrialization", "Socialism and Marxism"],
      },
      {
        number: 7, title: "19th-Century Perspectives and Political Developments, c. 1815 to c. 1914", slug: "19th-century-perspectives", examWeight: "10%",
        topics: ["Nationalism and the nation-state", "Conservatism and liberalism", "Imperialism", "Feminism and women's suffrage", "Mass politics and democracy"],
      },
      {
        number: 8, title: "20th-Century Global Conflicts, c. 1914 to present", slug: "20th-century-global-conflicts", examWeight: "15%",
        topics: ["World War I", "Russian Revolution", "The interwar period", "The rise of totalitarianism", "World War II and the Holocaust"],
      },
      {
        number: 9, title: "Cold War and Contemporary Europe, c. 1914 to present", slug: "cold-war-and-contemporary-europe", examWeight: "15%",
        topics: ["Cold War Europe", "Decolonization", "Postwar rebuilding and welfare states", "The collapse of communism", "European integration and the EU", "Globalization and contemporary challenges"],
      },
    ],
  },
  {
    id: "ap-macroeconomics",
    subject: "AP Macroeconomics", subjectEn: "AP Macroeconomics", category: "AP",
    description: "Analyze GDP, inflation, and monetary policy through a clear big-picture economics lens.",
    topicCount: 30, difficulty: "Intermediate", color: "from-green-600 to-lime-700", icon: "📈",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Basic Economic Concepts", slug: "basic-economic-concepts", examWeight: "5–10%",
        topics: ["Scarcity", "Resource allocation", "Production possibilities curve", "Comparative advantage and trade", "Economic systems"],
      },
      {
        number: 2, title: "Economic Indicators and the Business Cycle", slug: "economic-indicators-and-business-cycle", examWeight: "12–17%",
        topics: ["The circular flow model", "Gross domestic product (GDP)", "Limitations of GDP", "Unemployment", "Price indices and inflation", "The business cycle"],
      },
      {
        number: 3, title: "National Income and Price Determination", slug: "national-income-and-price-determination", examWeight: "17–27%",
        topics: ["Aggregate demand", "Aggregate supply (short-run and long-run)", "Equilibrium in the aggregate demand–aggregate supply model", "Changes in the AD-AS model in the short run", "Fiscal policy"],
      },
      {
        number: 4, title: "Financial Sector", slug: "financial-sector", examWeight: "12–17%",
        topics: ["Financial assets", "Definition, measurement, and functions of money", "Banking", "The money market", "The loanable funds market"],
      },
      {
        number: 5, title: "Long-Run Consequences of Stabilization Policies", slug: "long-run-consequences-stabilization", examWeight: "20–30%",
        topics: ["Fiscal and monetary policy actions and their effects", "The Phillips curve", "Money growth and inflation", "Real vs. nominal interest rates"],
      },
      {
        number: 6, title: "Open Economy: International Trade and Finance", slug: "open-economy-trade-and-finance", examWeight: "10–13%",
        topics: ["Balance of payments accounts", "Exchange rates", "The foreign exchange market", "Effect of policies on exchange rates and trade"],
      },
    ],
  },
  {
    id: "ap-microeconomics",
    subject: "AP Microeconomics", subjectEn: "AP Microeconomics", category: "AP",
    description: "Master demand, supply, market structures, and decision-making at the individual firm level.",
    topicCount: 28, difficulty: "Intermediate", color: "from-emerald-700 to-teal-800", icon: "📉",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Basic Economic Concepts", slug: "basic-economic-concepts", examWeight: "6–10%",
        topics: ["Scarcity and opportunity cost", "Production possibilities curve", "Comparative advantage", "Economic systems"],
      },
      {
        number: 2, title: "Supply and Demand", slug: "supply-and-demand", examWeight: "20–25%",
        topics: ["The demand curve", "Shifts in demand", "The supply curve", "Shifts in supply", "Market equilibrium", "Consumer and producer surplus", "Price controls"],
      },
      {
        number: 3, title: "Production, Cost, and the Perfect Competition Model", slug: "production-cost-perfect-competition", examWeight: "22–30%",
        topics: ["The production function", "Short-run and long-run production", "Types of costs", "Cost curves", "Profit maximization in perfect competition", "Short-run and long-run equilibrium"],
      },
      {
        number: 4, title: "Imperfect Competition", slug: "imperfect-competition", examWeight: "15–22%",
        topics: ["Monopoly", "Price discrimination", "Monopolistic competition", "Oligopoly and game theory"],
      },
      {
        number: 5, title: "Factor Markets", slug: "factor-markets", examWeight: "10–13%",
        topics: ["Introduction to factor markets", "Labor market", "Monopsony", "Capital and land markets"],
      },
      {
        number: 6, title: "Market Failure and the Role of Government", slug: "market-failure-and-government", examWeight: "8–13%",
        topics: ["Externalities", "Public goods and common resources", "The role of government", "Information asymmetry"],
      },
    ],
  },
  {
    id: "ap-psychology",
    subject: "AP Psychology", subjectEn: "AP Psychology", category: "AP",
    description: "Understand behavior and mental processes through core theories, studies, and research methods — reorganized for 2025.",
    topicCount: 34, difficulty: "Intro", color: "from-pink-500 to-fuchsia-600", icon: "🧠",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Scientific Foundations of Psychology", slug: "scientific-foundations", examWeight: "10–14%",
        topics: ["History and approaches of psychology", "Research methods", "The experimental method", "Statistical analysis in psychology", "Ethical considerations in research"],
      },
      {
        number: 2, title: "Biological Bases of Behavior", slug: "biological-bases-of-behavior", examWeight: "14–18%",
        topics: ["The nervous system", "Neurons and neural firing", "Brain structure and function", "Brain imaging techniques", "The endocrine system", "Genetics and behavior", "Evolutionary psychology"],
      },
      {
        number: 3, title: "Sensation, Perception, and Consciousness", slug: "sensation-perception-consciousness", examWeight: "10–14%",
        topics: ["Principles of sensation", "Vision", "Hearing", "Other senses", "Principles of perception", "States of consciousness", "Sleep and dreams", "Hypnosis", "Psychoactive drugs"],
      },
      {
        number: 4, title: "Learning, Cognition, and Memory", slug: "learning-cognition-memory", examWeight: "30–35%",
        topics: ["Classical conditioning", "Operant conditioning", "Observational learning", "Cognitive processes", "Memory processes", "Forgetting", "Thinking and problem-solving", "Language"],
      },
      {
        number: 5, title: "Motivation, Emotion, Developmental, Social, Personality, and Psychological Disorders", slug: "motivation-emotion-social", examWeight: "14–18%",
        topics: ["Theories of motivation", "Emotion and stress", "Human development", "Social thinking", "Social influence", "Personality theories", "Psychological disorders", "Psychological treatment"],
      },
    ],
  },
  {
    id: "ap-us-government",
    subject: "AP United States Government and Politics", subjectEn: "AP US Government and Politics", category: "AP",
    description: "Analyze the foundations, institutions, civil rights, ideologies, and political participation of the American system.",
    topicCount: 40, difficulty: "Intermediate", color: "from-red-600 to-rose-700", icon: "🏛️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Foundations of American Democracy", slug: "foundations-of-american-democracy", examWeight: "15–22%",
        topics: ["Ideals of democracy", "Types of democracy", "The Constitution", "Federalism", "Federalism in practice"],
      },
      {
        number: 2, title: "Interactions Among Branches of Government", slug: "interactions-among-branches", examWeight: "25–36%",
        topics: ["Congress: The Senate and the House", "Congressional behavior", "Presidential powers", "The presidency in action", "The federal bureaucracy", "The judicial branch", "Checks and balances"],
      },
      {
        number: 3, title: "Civil Liberties and Civil Rights", slug: "civil-liberties-and-civil-rights", examWeight: "13–18%",
        topics: ["The Bill of Rights", "First Amendment freedoms", "Due process and right to privacy", "Equal protection", "Civil rights movements and their outcomes"],
      },
      {
        number: 4, title: "American Political Ideologies and Beliefs", slug: "political-ideologies-and-beliefs", examWeight: "10–15%",
        topics: ["American political culture", "Measuring public opinion", "Ideology and policy preferences", "Ideology and economic policy", "Ideology and social policy"],
      },
      {
        number: 5, title: "Political Participation", slug: "political-participation", examWeight: "20–27%",
        topics: ["Voting rights and models of voting behavior", "Voter turnout", "Political parties", "Interest groups", "Mass media", "Electoral systems", "Campaign finance"],
      },
    ],
  },
  {
    id: "ap-comparative-government",
    subject: "AP Comparative Government and Politics", subjectEn: "AP Comparative Government and Politics", category: "AP",
    description: "Compare political systems, institutions, and policies across six countries: UK, Russia, China, Iran, Mexico, and Nigeria.",
    topicCount: 36, difficulty: "Intermediate", color: "from-violet-600 to-purple-700", icon: "🌐",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Political Systems, Regimes, and Governments", slug: "political-systems-regimes", examWeight: "5%",
        topics: ["Types of political systems", "Democratic and authoritarian regimes", "Course country overviews: UK, Russia, China, Iran, Mexico, Nigeria"],
      },
      {
        number: 2, title: "Political Institutions", slug: "political-institutions", examWeight: "35%",
        topics: ["Legislatures", "Executives and cabinets", "Judicial systems", "Bureaucracies", "Comparing institutions across course countries"],
      },
      {
        number: 3, title: "Political Culture and Participation", slug: "political-culture-and-participation", examWeight: "15%",
        topics: ["Political culture", "Civil society", "Political participation and social movements", "Comparing political cultures"],
      },
      {
        number: 4, title: "Party and Electoral Systems and Citizen Organizations", slug: "party-electoral-systems", examWeight: "15%",
        topics: ["Electoral systems (PR, FPTP, mixed)", "Political parties", "Interest groups and NGOs", "Comparing elections across course countries"],
      },
      {
        number: 5, title: "Political and Economic Changes and Development", slug: "political-economic-changes", examWeight: "30%",
        topics: ["Sources of political change", "Democratization", "Authoritarian durability", "Economic liberalization and globalization", "Social and demographic change", "Country case study comparisons"],
      },
    ],
  },
  {
    id: "ap-human-geography",
    subject: "AP Human Geography", subjectEn: "AP Human Geography", category: "AP",
    description: "Analyze patterns and processes of human populations, culture, politics, agriculture, urbanization, and economic development.",
    topicCount: 44, difficulty: "Intro", color: "from-teal-600 to-green-700", icon: "🗺️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Thinking Geographically", slug: "thinking-geographically", examWeight: "8–10%",
        topics: ["Introduction to maps", "Geographic data", "The power of geographic data", "Spatial concepts", "Human–environment interaction", "Scales of analysis"],
      },
      {
        number: 2, title: "Population and Migration Patterns and Processes", slug: "population-and-migration", examWeight: "12–17%",
        topics: ["Population distribution", "Consequences of population distribution", "Population composition", "Population dynamics", "The demographic transition model", "Malthusian theory", "Population policies", "Women and demographic change", "Causes of migration", "Forced and voluntary migration", "Effects of migration"],
      },
      {
        number: 3, title: "Cultural Patterns and Processes", slug: "cultural-patterns-and-processes", examWeight: "12–17%",
        topics: ["Introduction to culture", "Cultural landscapes", "Cultural patterns", "Types of diffusion", "Historical causes of diffusion", "Contemporary causes of diffusion", "Diffusion of religion and language", "Effects of diffusion"],
      },
      {
        number: 4, title: "Political Patterns and Processes", slug: "political-patterns-and-processes", examWeight: "12–17%",
        topics: ["Introduction to political geography", "The development of nation-states", "Influences on the boundaries of nation-states", "Types of political boundaries", "The function of political boundaries", "Challenges to state sovereignty", "Consequences of centrifugal and centripetal forces"],
      },
      {
        number: 5, title: "Agriculture and Rural Land-Use Patterns and Processes", slug: "agriculture-and-rural-land-use", examWeight: "12–17%",
        topics: ["Introduction to agriculture", "Settlement patterns and survey methods", "Agricultural origins and diffusion", "The second agricultural revolution", "The Green Revolution", "Agricultural practices and economic forces", "Spatial organization of agriculture", "Von Thünen model", "The global food distribution system", "Consequences of agricultural practices"],
      },
      {
        number: 6, title: "Cities and Urban Land-Use Patterns and Processes", slug: "cities-and-urban-land-use", examWeight: "12–17%",
        topics: ["The origin and influences of urbanization", "Cities across the world", "The size and distribution of cities", "The internal structure of cities", "Urban segregation and inequalities", "Urban sustainability"],
      },
      {
        number: 7, title: "Industrial and Economic Development Patterns and Processes", slug: "industrial-and-economic-development", examWeight: "12–17%",
        topics: ["The industrial revolution", "Economic sectors and patterns", "Theories of development", "Trade and the world economy", "The global economy", "Changes as a result of the world economy", "Sustainable development"],
      },
    ],
  },
  // ─── AP English ──────────────────────────────────────────────────────
  {
    id: "ap-english-language",
    subject: "AP English Language", subjectEn: "AP English Language and Composition", category: "AP",
    description: "Sharpen rhetorical analysis and argument writing with a strategy-first AP Lang sequence.",
    topicCount: 38, difficulty: "Intermediate", color: "from-red-500 to-rose-600", icon: "✍️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Rhetorical Situation and Choices", slug: "rhetorical-situation-and-choices", examWeight: "~20%",
        topics: ["The rhetorical situation (SPACE+T)", "Speaker and audience", "Exigence and purpose", "Context and genre", "Rhetorical choices and their effects"],
      },
      {
        number: 2, title: "Claims and Evidence", slug: "claims-and-evidence", examWeight: "~20%",
        topics: ["Types of claims", "Types of evidence", "Commentary and analysis", "Source selection and credibility", "Synthesis and citation"],
      },
      {
        number: 3, title: "Reasoning and Organization", slug: "reasoning-and-organization", examWeight: "~20%",
        topics: ["Line of reasoning", "Logical fallacies", "Organizational strategies", "Transitions and cohesion", "Counterargument and qualification"],
      },
      {
        number: 4, title: "Style", slug: "style", examWeight: "~20%",
        topics: ["Diction and syntax", "Tone and register", "Figurative language", "Sentence structure effects", "Voice"],
      },
      {
        number: 5, title: "Synthesis and the AP Exam Essay Tasks", slug: "synthesis-and-exam-tasks", examWeight: "~20%",
        topics: ["Rhetorical analysis essay (FRQ 1)", "Argument essay (FRQ 2)", "Synthesis essay (FRQ 3)", "Reading MCQ strategies", "Timed writing practice"],
      },
    ],
  },
  {
    id: "ap-english-literature",
    subject: "AP English Literature", subjectEn: "AP English Literature and Composition", category: "AP",
    description: "Read poetry, fiction, and drama with stronger literary analysis and interpretation.",
    topicCount: 35, difficulty: "Advanced", color: "from-rose-600 to-pink-700", icon: "📚",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Short Fiction I", slug: "short-fiction-i", examWeight: "~17%",
        topics: ["Character and narration", "Setting and context", "Structure and sequence", "Figurative language in fiction", "Literary argumentation"],
      },
      {
        number: 2, title: "Poetry I", slug: "poetry-i", examWeight: "~17%",
        topics: ["Poetic speaker and situation", "Imagery", "Figurative language in poetry", "Sound and structure", "Close reading of poems"],
      },
      {
        number: 3, title: "Longer Fiction or Drama I", slug: "longer-fiction-or-drama-i", examWeight: "~17%",
        topics: ["Plot and structure in longer works", "Character development", "Theme", "Symbols and motifs", "Extended literary analysis"],
      },
      {
        number: 4, title: "Short Fiction II", slug: "short-fiction-ii", examWeight: "~17%",
        topics: ["Advanced characterization", "Narrator reliability and point of view", "Ambiguity and complexity", "Cultural and historical context"],
      },
      {
        number: 5, title: "Poetry II", slug: "poetry-ii", examWeight: "~17%",
        topics: ["Complex tonal shifts", "Extended metaphor and allegory", "Form and meaning", "Comparative poetry analysis"],
      },
      {
        number: 6, title: "Longer Fiction or Drama II and AP Exam Preparation", slug: "longer-fiction-drama-ii-and-exam-prep", examWeight: "~15%",
        topics: ["Argument about literary complexity", "Free response essay (prose analysis)", "Free response essay (poetry analysis)", "Free response essay (literary argument)", "MCQ strategies for poetry and prose"],
      },
    ],
  },
  // ─── AP Arts ──────────────────────────────────────────────────────────
  {
    id: "ap-art-history",
    subject: "AP Art History", subjectEn: "AP Art History", category: "AP",
    description: "Explore global art and architecture across 10 time periods and cultures from prehistory to the present.",
    topicCount: 48, difficulty: "Intermediate", color: "from-amber-500 to-orange-600", icon: "🎨",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Global Prehistory, 30,000–500 BCE", slug: "global-prehistory", examWeight: "4–6%",
        topics: ["Prehistoric cave paintings", "Figurines and portable art", "Megalithic architecture", "Early human artistic expression"],
      },
      {
        number: 2, title: "Ancient Mediterranean, 3500–300 BCE", slug: "ancient-mediterranean", examWeight: "15–17%",
        topics: ["Ancient Near East and Egypt", "Aegean art (Minoan and Mycenaean)", "Ancient Greece (Archaic, Classical, Hellenistic)", "Ancient Rome"],
      },
      {
        number: 3, title: "Early Europe and Colonial Americas, 200–1750 CE", slug: "early-europe-and-colonial-americas", examWeight: "16–20%",
        topics: ["Early Christian and Byzantine art", "Early medieval art", "Romanesque art", "Gothic art", "The Renaissance", "Mannerism and Baroque", "Colonial Americas"],
      },
      {
        number: 4, title: "Later Europe and Americas, 1750–1980 CE", slug: "later-europe-and-americas", examWeight: "16–20%",
        topics: ["Rococo and Neoclassicism", "Romanticism", "Realism and Impressionism", "Post-Impressionism and early Modern", "Modern art movements (Cubism, Surrealism, Abstraction)", "Latin American modern art"],
      },
      {
        number: 5, title: "Indigenous Americas, 1000 BCE–1980 CE", slug: "indigenous-americas", examWeight: "6–8%",
        topics: ["Mesoamerican art", "South American art", "North American Indigenous art", "Architecture and ritual objects"],
      },
      {
        number: 6, title: "Africa, 1100–1980 CE", slug: "africa", examWeight: "6–8%",
        topics: ["Sub-Saharan African art", "African kingdoms and court arts", "Colonial period and resistance art"],
      },
      {
        number: 7, title: "West and Central Asia, 500 BCE–1980 CE", slug: "west-and-central-asia", examWeight: "4–6%",
        topics: ["Ancient Persian art", "Islamic art and architecture", "Mughal Empire art"],
      },
      {
        number: 8, title: "South, East, and Southeast Asia, 300 BCE–1980 CE", slug: "south-east-southeast-asia", examWeight: "8–10%",
        topics: ["Hindu and Buddhist art", "Ancient Chinese art", "Japanese art", "Southeast Asian art and architecture"],
      },
      {
        number: 9, title: "The Pacific, 700–1980 CE", slug: "the-pacific", examWeight: "4–6%",
        topics: ["Polynesian art", "Melanesian and Micronesian art", "Australian Aboriginal art"],
      },
      {
        number: 10, title: "Global Contemporary, 1980 CE to Present", slug: "global-contemporary", examWeight: "4–6%",
        topics: ["Global contemporary art movements", "Postmodern and conceptual art", "Street art and digital media", "Art in response to global issues"],
      },
    ],
  },
  {
    id: "ap-music-theory",
    subject: "AP Music Theory", subjectEn: "AP Music Theory", category: "AP",
    description: "Develop skills in reading, writing, and analyzing music through harmony, voice leading, and musical form.",
    topicCount: 42, difficulty: "Intermediate", color: "from-purple-500 to-fuchsia-600", icon: "🎵",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Music Fundamentals I: Pitch", slug: "music-fundamentals-pitch", examWeight: "7%",
        topics: ["Notation of pitch", "Clefs and the staff", "Accidentals", "The piano keyboard", "Major scales", "Minor scales", "Key signatures", "Intervals"],
      },
      {
        number: 2, title: "Music Fundamentals II: Rhythm, Meter, and Expressive Elements", slug: "music-fundamentals-rhythm", examWeight: "7%",
        topics: ["Rhythmic values", "Meter and time signatures", "Rhythmic patterns", "Tempo", "Dynamics", "Articulation and expression markings"],
      },
      {
        number: 3, title: "Music Fundamentals III: Minor Scales, Melody, Timbre, and Texture", slug: "music-fundamentals-minor", examWeight: "7%",
        topics: ["Natural, harmonic, and melodic minor", "Modes", "Melodic construction", "Timbre and instrumentation", "Texture (monophony, homophony, polyphony)"],
      },
      {
        number: 4, title: "Harmony and Voice Leading I: Chord Function, Cadence, and Phrase", slug: "harmony-voice-leading-i", examWeight: "12%",
        topics: ["Triads and seventh chords", "Chord quality", "Harmonic function (tonic, subdominant, dominant)", "Cadences", "Phrase structure"],
      },
      {
        number: 5, title: "Harmony and Voice Leading II: Chord Progressions and Predominant Chords", slug: "harmony-voice-leading-ii", examWeight: "12%",
        topics: ["Voice leading rules", "Part writing in four voices (SATB)", "Predominant chords (ii and IV)", "Common progressions", "First inversion chords"],
      },
      {
        number: 6, title: "Harmony and Voice Leading III: Secondary Function", slug: "harmony-voice-leading-iii", examWeight: "16%",
        topics: ["Secondary dominant chords", "Secondary leading-tone chords", "Tonicization", "Modulation to closely related keys", "Chromaticism"],
      },
      {
        number: 7, title: "Harmony and Voice Leading IV: Extended and Borrowed Harmony", slug: "harmony-voice-leading-iv", examWeight: "20%",
        topics: ["Borrowed chords (modal mixture)", "Neapolitan chord", "Augmented sixth chords", "Altered chords", "Extended harmony"],
      },
      {
        number: 8, title: "Modes and Form", slug: "modes-and-form", examWeight: "19%",
        topics: ["Diatonic modes", "Binary form", "Ternary form", "Sonata form", "Rondo form", "Theme and variations", "Fugue"],
      },
    ],
  },
  // ─── AP World Languages ──────────────────────────────────────────────
  {
    id: "ap-spanish-language",
    subject: "AP Spanish Language and Culture", subjectEn: "AP Spanish Language and Culture", category: "AP",
    description: "Develop advanced Spanish proficiency through six thematic units connecting language to global and cultural contexts.",
    topicCount: 36, difficulty: "Intermediate", color: "from-red-500 to-orange-600", icon: "🌎",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Families and Communities", slug: "families-and-communities", examWeight: "~17%",
        topics: ["Family structure and dynamics", "Community values", "Social relationships", "Gender roles", "Comparing family customs across Spanish-speaking cultures"],
      },
      {
        number: 2, title: "Science and Technology", slug: "science-and-technology", examWeight: "~17%",
        topics: ["Effects of technology on society", "Medical and scientific advances", "Access to technology", "Environmental science", "Ethical debates in science"],
      },
      {
        number: 3, title: "Contemporary Life", slug: "contemporary-life", examWeight: "~17%",
        topics: ["Leisure activities", "Education systems", "Travel and transportation", "Professions and workplace", "Urban and rural living"],
      },
      {
        number: 4, title: "Global Challenges", slug: "global-challenges", examWeight: "~17%",
        topics: ["Environmental issues", "Social justice and inequality", "Immigration and migration", "Public health", "Economic challenges"],
      },
      {
        number: 5, title: "Personal and Public Identities", slug: "personal-and-public-identities", examWeight: "~16%",
        topics: ["National and ethnic identities", "Religious beliefs", "Gender and sexuality", "Youth culture", "Heroism and achievement"],
      },
      {
        number: 6, title: "Beauty and Aesthetics", slug: "beauty-and-aesthetics", examWeight: "~16%",
        topics: ["Visual arts and architecture", "Literature and poetry", "Music and performing arts", "Standards of beauty", "Cultural artistic traditions"],
      },
    ],
  },
  // ─── Honors ──────────────────────────────────────────────────────────
  {
    id: "honors-biology",
    subject: "Honors Biology", subjectEn: "Honors Biology", category: "Honors",
    description: "Build a strong pre-AP Biology foundation across cells, genetics, and evolution.",
    topicCount: 35, difficulty: "Intermediate", color: "from-green-400 to-emerald-500", icon: "🧬",
    lessonIds: [],
  },
  {
    id: "honors-chemistry",
    subject: "Honors Chemistry", subjectEn: "Honors Chemistry", category: "Honors",
    description: "Prepare for AP Chemistry through reactions, bonding, and the logic behind matter.",
    topicCount: 38, difficulty: "Intermediate", color: "from-violet-400 to-purple-500", icon: "⚗️",
    lessonIds: [],
  },
  {
    id: "honors-physics",
    subject: "Honors Physics", subjectEn: "Honors Physics", category: "Honors",
    description: "Cover mechanics, waves, optics, and electricity as a durable pre-AP Physics foundation.",
    topicCount: 36, difficulty: "Intermediate", color: "from-blue-400 to-indigo-500", icon: "🔭",
    lessonIds: [],
  },
  {
    id: "honors-precalculus",
    subject: "Honors Precalculus", subjectEn: "Honors Precalculus", category: "Honors",
    description: "Strengthen functions, sequences, and trigonometry before entering AP Calculus AB or BC.",
    topicCount: 32, difficulty: "Intermediate", color: "from-amber-400 to-orange-500", icon: "📐",
    lessonIds: [],
  },
  {
    id: "honors-english",
    subject: "Honors English", subjectEn: "Honors English", category: "Honors",
    description: "Develop literary analysis and argument writing with a strong bridge into AP English.",
    topicCount: 30, difficulty: "Intermediate", color: "from-red-400 to-rose-500", icon: "📖",
    lessonIds: [],
  },
  {
    id: "honors-algebra",
    subject: "Honors Algebra", subjectEn: "Honors Algebra", category: "Honors",
    description: "Learn equations, functions, and polynomial thinking as the core language of upper-level math.",
    topicCount: 28, difficulty: "Intro", color: "from-orange-400 to-red-500", icon: "➕",
    lessonIds: [],
  },
  {
    id: "honors-us-history",
    subject: "Honors US History", subjectEn: "Honors US History", category: "Honors",
    description: "Build the historical background and writing skills needed before AP US History.",
    topicCount: 40, difficulty: "Intro", color: "from-yellow-500 to-amber-600", icon: "🗽",
    lessonIds: [],
  },
  // ─── Core ────────────────────────────────────────────────────────────
  { id: "integrated-science", subject: "Integrated Science", subjectEn: "Integrated Science", category: "Core", description: "Connect the foundations of physics, chemistry, biology, and earth science in one sequence.", topicCount: 30, difficulty: "Intro", color: "from-teal-400 to-green-500", icon: "🔬", lessonIds: [] },
  { id: "geometry", subject: "Geometry", subjectEn: "Geometry", category: "Core", description: "Use proofs, shapes, area, and volume to strengthen logical and spatial reasoning.", topicCount: 26, difficulty: "Intro", color: "from-purple-400 to-violet-500", icon: "📐", lessonIds: [] },
  { id: "algebra", subject: "Algebra", subjectEn: "Algebra", category: "Core", description: "Build fluency with equations, inequalities, and functions across the core math language.", topicCount: 24, difficulty: "Intro", color: "from-amber-400 to-yellow-500", icon: "➕", lessonIds: [] },
  { id: "core-english", subject: "English", subjectEn: "English", category: "Core", description: "Strengthen reading, grammar, and composition through a durable English foundation.", topicCount: 28, difficulty: "Intro", color: "from-red-400 to-rose-500", icon: "📖", lessonIds: [] },
  { id: "us-history", subject: "US History", subjectEn: "US History", category: "Core", description: "Understand the historical and cultural context of the United States with a student-friendly start.", topicCount: 32, difficulty: "Intro", color: "from-yellow-400 to-amber-500", icon: "🗽", lessonIds: [] },
  { id: "core-chemistry", subject: "Chemistry", subjectEn: "Chemistry", category: "Core", description: "Learn elements, bonding, and reactions before moving into Honors or AP Chemistry.", topicCount: 26, difficulty: "Intro", color: "from-blue-400 to-cyan-500", icon: "⚗️", lessonIds: [] },
  { id: "core-biology", subject: "Biology", subjectEn: "Biology", category: "Core", description: "Understand the principles of life through cells, heredity, and ecosystems.", topicCount: 28, difficulty: "Intro", color: "from-green-400 to-emerald-500", icon: "🧬", lessonIds: [] },
  { id: "core-physics", subject: "Physics", subjectEn: "Physics", category: "Core", description: "Explore force, energy, and waves through a practical introduction to physical systems.", topicCount: 26, difficulty: "Intro", color: "from-sky-400 to-blue-500", icon: "🔭", lessonIds: [] },
  // ─── Competition ─────────────────────────────────────────────────────
  { id: "amc-10", subject: "AMC 10", subjectEn: "AMC 10", category: "Competition", description: "Train from counting foundations to past-problem strategy for stronger AMC 10 performance.", topicCount: 36, difficulty: "Intermediate", color: "from-violet-500 to-purple-600", icon: "🏆", lessonIds: [] },
  { id: "amc-12", subject: "AMC 12", subjectEn: "AMC 12", category: "Competition", description: "Extend AMC 10 depth with the added concepts and pacing needed for AMC 12.", topicCount: 42, difficulty: "Advanced", color: "from-indigo-600 to-violet-700", icon: "🏆", lessonIds: [] },
  { id: "aime", subject: "AIME", subjectEn: "AIME", category: "Competition", description: "Prepare for the world beyond AMC qualification with advanced contest reasoning and strategy.", topicCount: 48, difficulty: "Advanced", color: "from-purple-700 to-indigo-800", icon: "🥇", lessonIds: [] },
  { id: "science-olympiad", subject: "Science Olympiad", subjectEn: "Science Olympiad", category: "Competition", description: "Practice event strategy, team coordination, and deeper science concepts for competition season.", topicCount: 40, difficulty: "Advanced", color: "from-teal-600 to-emerald-700", icon: "🔬", lessonIds: [] },
  { id: "usabo", subject: "USABO", subjectEn: "USABO", category: "Competition", description: "Go beyond AP Biology with Olympiad-style training aimed at Open and Semifinal rounds.", topicCount: 44, difficulty: "Advanced", color: "from-green-700 to-emerald-800", icon: "🧬", lessonIds: [] },
  { id: "physics-bowl", subject: "Physics Bowl", subjectEn: "Physics Bowl", category: "Competition", description: "Combine AP Physics depth with competition-focused problem solving for Physics Bowl and F=ma.", topicCount: 38, difficulty: "Advanced", color: "from-blue-700 to-indigo-800", icon: "⚡", lessonIds: [] },
  // ─── Test Prep ────────────────────────────────────────────────────────
  { id: "sat-math", subject: "SAT Math", subjectEn: "SAT Math", category: "Test Prep", description: "Refine algebra strategy, timing, and pattern recognition toward a top SAT Math score.", topicCount: 29, difficulty: "Intermediate", color: "from-amber-500 to-orange-600", icon: "📝", lessonIds: [] },
  { id: "sat-reading", subject: "SAT Reading & Writing", subjectEn: "SAT Reading & Writing", category: "Test Prep", description: "Master passage strategy, grammar rules, and time management for high SAT R&W performance.", topicCount: 33, difficulty: "Intermediate", color: "from-rose-500 to-pink-600", icon: "📝", lessonIds: [] },
  { id: "act", subject: "ACT", subjectEn: "ACT", category: "Test Prep", description: "Prepare across ACT Math, English, Reading, and Science with score-focused strategy.", topicCount: 40, difficulty: "Intermediate", color: "from-orange-500 to-red-600", icon: "📋", lessonIds: [] },
  { id: "toefl", subject: "TOEFL", subjectEn: "TOEFL", category: "Test Prep", description: "Build complete Reading, Listening, Speaking, and Writing readiness with score-targeted prep.", topicCount: 36, difficulty: "Intermediate", color: "from-red-500 to-rose-600", icon: "🌐", lessonIds: [] },

  // ─── IB Diploma — Tier 1 (Phase 0 foundation) ────────────────────────
  // Each course supports both HL and SL via lesson-level ib_level tagging.
  // Phase 0 ships the registry/metadata only — lesson rows + scripts come
  // in Phase 1 (Bio first, then Math AA, Chem, Econ).

  // Group 4: Sciences ─── IB Biology (First teaching 2025)
  {
    id: "ib-biology",
    subject: "IB Biology", subjectEn: "IB Biology", category: "IB",
    curriculum: "IB", ibGroup: 4, ibSyllabusFirstTeaching: 2025, ibLevels: ["HL", "SL"],
    description: "IB Biology HL/SL through the 2025 syllabus — themed conceptual frame with AI-guided study aware of how you reason.",
    topicCount: 32, difficulty: "Intermediate", color: "from-green-600 to-emerald-700", icon: "🧬",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Theme A — Unity and Diversity", slug: "theme-a-unity-and-diversity", examWeight: "Paper 1 & 2",
        ibThemeCode: "A", ibLevels: ["HL", "SL"],
        topics: ["A1 Molecules — water, nucleic acids, proteins", "A2 Cells — cell structure and diversity", "A3 Organisms — classification and evolution evidence", "A4 Ecosystems — biodiversity and conservation"],
      },
      {
        number: 2, title: "Theme B — Form and Function", slug: "theme-b-form-and-function", examWeight: "Paper 1 & 2",
        ibThemeCode: "B", ibLevels: ["HL", "SL"],
        topics: ["B1 Molecules — carbohydrates, lipids, proteins", "B2 Cells — membranes and organelles", "B3 Organisms — gas exchange, transport, integration", "B4 Ecosystems — adaptation to environment"],
      },
      {
        number: 3, title: "Theme C — Interaction and Interdependence", slug: "theme-c-interaction-and-interdependence", examWeight: "Paper 1 & 2",
        ibThemeCode: "C", ibLevels: ["HL", "SL"],
        topics: ["C1 Molecules — enzymes and metabolism", "C2 Cells — chemical signalling", "C3 Organisms — integration and homeostasis", "C4 Ecosystems — populations and communities"],
      },
      {
        number: 4, title: "Theme D — Continuity and Change", slug: "theme-d-continuity-and-change", examWeight: "Paper 1 & 2",
        ibThemeCode: "D", ibLevels: ["HL", "SL"],
        topics: ["D1 Molecules — DNA replication, transcription, translation", "D2 Cells — cell cycle and cancer", "D3 Organisms — reproduction and inheritance", "D4 Ecosystems — natural selection and speciation"],
      },
    ],
  },

  // Group 4: Sciences ─── IB Chemistry (First teaching 2023)
  {
    id: "ib-chemistry",
    subject: "IB Chemistry", subjectEn: "IB Chemistry", category: "IB",
    curriculum: "IB", ibGroup: 4, ibSyllabusFirstTeaching: 2023, ibLevels: ["HL", "SL"],
    description: "IB Chemistry HL/SL through the Structure / Reactivity framework — quantitative reasoning practice with paper-style overlays.",
    topicCount: 28, difficulty: "Intermediate", color: "from-cyan-500 to-blue-600", icon: "⚗️",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Structure 1 — Models of the Particulate Nature of Matter", slug: "structure-1-particulate-nature", examWeight: "Paper 1 & 2",
        ibThemeCode: "S1", ibLevels: ["HL", "SL"],
        topics: ["1.1 Atomic structure", "1.2 Nuclear structure", "1.3 Electron configurations", "1.4 Counting particles by mass — the mole", "1.5 Ideal gases"],
      },
      {
        number: 2, title: "Structure 2 — Models of Bonding and Structure", slug: "structure-2-bonding", examWeight: "Paper 1 & 2",
        ibThemeCode: "S2", ibLevels: ["HL", "SL"],
        topics: ["2.1 The ionic model", "2.2 The covalent model", "2.3 The metallic model", "2.4 From models to materials"],
      },
      {
        number: 3, title: "Structure 3 — Classification of Matter", slug: "structure-3-classification", examWeight: "Paper 1 & 2",
        ibThemeCode: "S3", ibLevels: ["HL", "SL"],
        topics: ["3.1 The periodic table — classification of elements", "3.2 Functional groups — classification of organic compounds"],
      },
      {
        number: 4, title: "Reactivity 1 — What Drives Chemical Reactions?", slug: "reactivity-1-driving-forces", examWeight: "Paper 1 & 2",
        ibThemeCode: "R1", ibLevels: ["HL", "SL"],
        topics: ["1.1 Measuring enthalpy changes", "1.2 Energy cycles in reactions", "1.3 Energy from fuels", "1.4 Entropy and spontaneity (HL)"],
      },
      {
        number: 5, title: "Reactivity 2 — How Much, How Fast, and How Far?", slug: "reactivity-2-extent-rate", examWeight: "Paper 1 & 2",
        ibThemeCode: "R2", ibLevels: ["HL", "SL"],
        topics: ["2.1 How much? — yield", "2.2 How fast? — rate of reaction", "2.3 How far? — equilibrium"],
      },
      {
        number: 6, title: "Reactivity 3 — Mechanisms of Chemical Change", slug: "reactivity-3-mechanisms", examWeight: "Paper 1 & 2",
        ibThemeCode: "R3", ibLevels: ["HL", "SL"],
        topics: ["3.1 Proton transfer reactions", "3.2 Electron transfer reactions", "3.3 Electron sharing reactions", "3.4 Electron-pair sharing reactions (HL)"],
      },
    ],
  },

  // Group 5: Math ─── IB Math AA (Analysis & Approaches, First teaching 2019)
  {
    id: "ib-math-aa",
    subject: "IB Math AA", subjectEn: "IB Math: Analysis and Approaches", category: "IB",
    curriculum: "IB", ibGroup: 5, ibSyllabusFirstTeaching: 2019, ibLevels: ["HL", "SL"],
    description: "IB Math AA HL/SL — analytical, proof-driven math with paper-style timed practice and concept-mapped reasoning.",
    topicCount: 30, difficulty: "Advanced", color: "from-indigo-500 to-purple-600", icon: "∫",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Topic 1 — Number and Algebra", slug: "topic-1-number-and-algebra", examWeight: "Paper 1 & 2 (HL: + P3)",
        ibThemeCode: "T1", ibLevels: ["HL", "SL"],
        topics: ["Sequences and series", "Exponents and logarithms", "Binomial theorem", "Proofs (HL: induction)", "Complex numbers (HL)"],
      },
      {
        number: 2, title: "Topic 2 — Functions", slug: "topic-2-functions", examWeight: "Paper 1 & 2",
        ibThemeCode: "T2", ibLevels: ["HL", "SL"],
        topics: ["Linear and quadratic functions", "Transformations of functions", "Rational and exponential functions", "Inverse and composite functions"],
      },
      {
        number: 3, title: "Topic 3 — Geometry and Trigonometry", slug: "topic-3-geometry-and-trig", examWeight: "Paper 1 & 2",
        ibThemeCode: "T3", ibLevels: ["HL", "SL"],
        topics: ["3D geometry", "Right and non-right triangles", "Circular functions", "Trigonometric identities and equations", "Vectors and lines in 3D (HL)"],
      },
      {
        number: 4, title: "Topic 4 — Statistics and Probability", slug: "topic-4-stats-and-probability", examWeight: "Paper 1 & 2",
        ibThemeCode: "T4", ibLevels: ["HL", "SL"],
        topics: ["Sampling and descriptive statistics", "Probability — Venn, tree, conditional", "Discrete distributions including binomial", "Normal distribution", "Bayes' theorem (HL)"],
      },
      {
        number: 5, title: "Topic 5 — Calculus", slug: "topic-5-calculus", examWeight: "Paper 1 & 2 (HL: + P3)",
        ibThemeCode: "T5", ibLevels: ["HL", "SL"],
        topics: ["Limits and continuity", "Differentiation rules", "Applications of derivatives — optimization, kinematics", "Integration techniques and area", "Differential equations (HL)", "Maclaurin series (HL)"],
      },
    ],
  },

  // Group 3: Individuals and Societies ─── IB Economics (First teaching 2022)
  {
    id: "ib-economics",
    subject: "IB Economics", subjectEn: "IB Economics", category: "IB",
    curriculum: "IB", ibGroup: 3, ibSyllabusFirstTeaching: 2022, ibLevels: ["HL", "SL"],
    description: "IB Economics HL/SL — micro, macro, and global economy with diagram-driven reasoning and paper-style overlays.",
    topicCount: 24, difficulty: "Intermediate", color: "from-amber-500 to-orange-600", icon: "📈",
    lessonIds: [],
    units: [
      {
        number: 1, title: "Unit 1 — Introduction to Economics", slug: "unit-1-introduction", examWeight: "Paper 1 & 2",
        ibThemeCode: "U1", ibLevels: ["HL", "SL"],
        topics: ["What is economics?", "How economists approach the world — models, assumptions, real-world relevance", "9 key concepts framework"],
      },
      {
        number: 2, title: "Unit 2 — Microeconomics", slug: "unit-2-microeconomics", examWeight: "Paper 1 & 2 (HL: + P3 calc)",
        ibThemeCode: "U2", ibLevels: ["HL", "SL"],
        topics: ["Demand, supply, market equilibrium", "Elasticities", "Government intervention — taxes, subsidies, price controls", "Market failure and externalities", "Firms and market structures (HL)"],
      },
      {
        number: 3, title: "Unit 3 — Macroeconomics", slug: "unit-3-macroeconomics", examWeight: "Paper 1 & 2 (HL: + P3 calc)",
        ibThemeCode: "U3", ibLevels: ["HL", "SL"],
        topics: ["Measuring economic activity — GDP, inflation, unemployment", "Aggregate demand and aggregate supply", "Macroeconomic objectives", "Fiscal, monetary, and supply-side policy", "Inequality and poverty"],
      },
      {
        number: 4, title: "Unit 4 — The Global Economy", slug: "unit-4-global-economy", examWeight: "Paper 1 & 2 (HL: + P3 calc)",
        ibThemeCode: "U4", ibLevels: ["HL", "SL"],
        topics: ["International trade — comparative advantage, protectionism", "Exchange rates and balance of payments", "Economic integration and globalization", "Sustainable development and economic development"],
      },
    ],
  },
];
