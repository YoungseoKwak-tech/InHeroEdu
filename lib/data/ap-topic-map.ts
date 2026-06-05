export interface LessonInfo {
  number: number;
  title: string;
}

export interface UnitInfo {
  slug: string;
  number: number;
  title: string;
  examWeight: string;
  lessons: LessonInfo[];
}

export interface CourseTopicInfo {
  id: string;
  name: string;
  units: UnitInfo[];
}

export const AP_TOPIC_MAP: CourseTopicInfo[] = [
  {
    id: "ap-biology",
    name: "AP Biology",
    units: [
      {
        slug: "chemistry-of-life", number: 1, title: "Chemistry of Life", examWeight: "8–11%",
        lessons: [
          { number: 1, title: "Structure of Water, Hydrogen Bonds, pH" },
          { number: 2, title: "Carbon and Functional Groups" },
          { number: 3, title: "Carbohydrates and Lipids" },
          { number: 4, title: "Proteins and Nucleic Acids" },
        ],
      },
      {
        slug: "cell-structure-and-function", number: 2, title: "Cell Structure and Function", examWeight: "10–13%",
        lessons: [
          { number: 1, title: "Cell Theory and Prokaryote vs Eukaryote" },
          { number: 2, title: "Membrane Structure — Fluid Mosaic Model" },
          { number: 3, title: "Transport — Diffusion, Osmosis, Active Transport" },
          { number: 4, title: "Organelle Structure and Function" },
        ],
      },
      {
        slug: "cellular-energetics", number: 3, title: "Cellular Energetics", examWeight: "12–16%",
        lessons: [
          { number: 1, title: "Enzymes and Activation Energy" },
          { number: 2, title: "Cellular Respiration — Glycolysis" },
          { number: 3, title: "Krebs Cycle and Oxidative Phosphorylation" },
          { number: 4, title: "Photosynthesis — Light Reactions" },
          { number: 5, title: "Calvin Cycle" },
        ],
      },
      {
        slug: "cell-communication-and-cell-cycle", number: 4, title: "Cell Communication and Cell Cycle", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Signal Transduction Pathways" },
          { number: 2, title: "Cell Cycle — Interphase and Mitosis" },
          { number: 3, title: "Regulation of Cell Cycle and Cancer" },
        ],
      },
      {
        slug: "heredity", number: 5, title: "Heredity", examWeight: "8–11%",
        lessons: [
          { number: 1, title: "Meiosis and Genetic Diversity" },
          { number: 2, title: "Mendelian Genetics" },
          { number: 3, title: "Non-Mendelian Genetics" },
        ],
      },
      {
        slug: "gene-expression-and-regulation", number: 6, title: "Gene Expression and Regulation", examWeight: "12–16%",
        lessons: [
          { number: 1, title: "DNA Replication" },
          { number: 2, title: "Transcription and Translation" },
          { number: 3, title: "Gene Regulation — Operons and Epigenetics" },
          { number: 4, title: "Mutations and Biotechnology" },
        ],
      },
      {
        slug: "natural-selection", number: 7, title: "Natural Selection", examWeight: "13–20%",
        lessons: [
          { number: 1, title: "Evidence for Evolution" },
          { number: 2, title: "Natural Selection Mechanisms" },
          { number: 3, title: "Hardy-Weinberg Equilibrium" },
          { number: 4, title: "Speciation and Phylogeny" },
        ],
      },
      {
        slug: "ecology", number: 8, title: "Ecology", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Population Ecology" },
          { number: 2, title: "Community Ecology" },
          { number: 3, title: "Ecosystem Ecology and Energy Flow" },
          { number: 4, title: "Biogeochemical Cycles" },
        ],
      },
    ],
  },

  {
    id: "ap-chemistry",
    name: "AP Chemistry",
    units: [
      {
        slug: "atomic-structure-and-properties", number: 1, title: "Atomic Structure and Properties", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Moles and molar mass" },
          { number: 2, title: "Atomic structure and electron configuration" },
          { number: 3, title: "Photoelectron spectroscopy" },
          { number: 4, title: "Periodic trends" },
        ],
      },
      {
        slug: "molecular-and-ionic-compound-structure", number: 2, title: "Molecular and Ionic Compound Structure", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Ionic and covalent bonding" },
          { number: 2, title: "Lewis structures and VSEPR" },
          { number: 3, title: "Molecular geometry and polarity" },
          { number: 4, title: "Intermolecular forces" },
        ],
      },
      {
        slug: "intermolecular-forces-and-properties", number: 3, title: "Intermolecular Forces and Properties", examWeight: "18–22%",
        lessons: [
          { number: 1, title: "Solids, liquids, gases — IMF comparison" },
          { number: 2, title: "Solutions and solubility" },
          { number: 3, title: "Spectroscopy and light" },
          { number: 4, title: "Chromatography and separations" },
        ],
      },
      {
        slug: "chemical-reactions", number: 4, title: "Chemical Reactions", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Types of chemical reactions" },
          { number: 2, title: "Net ionic equations" },
          { number: 3, title: "Representations of reactions" },
        ],
      },
      {
        slug: "kinetics", number: 5, title: "Kinetics", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Reaction rates and factors" },
          { number: 2, title: "Rate laws and order" },
          { number: 3, title: "Reaction mechanisms" },
          { number: 4, title: "Activation energy and Arrhenius" },
        ],
      },
      {
        slug: "thermodynamics", number: 6, title: "Thermodynamics", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Endothermic vs exothermic" },
          { number: 2, title: "Enthalpy and Hess's law" },
          { number: 3, title: "Entropy and Gibbs free energy" },
        ],
      },
      {
        slug: "equilibrium", number: 7, title: "Equilibrium", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Equilibrium expressions — Kc and Kp" },
          { number: 2, title: "ICE tables" },
          { number: 3, title: "Le Chatelier's principle" },
          { number: 4, title: "Solubility equilibrium — Ksp" },
        ],
      },
      {
        slug: "acids-and-bases", number: 8, title: "Acids and Bases", examWeight: "11–15%",
        lessons: [
          { number: 1, title: "Brønsted-Lowry acids and bases" },
          { number: 2, title: "pH and pOH calculations" },
          { number: 3, title: "Weak acids and Ka" },
          { number: 4, title: "Buffers and Henderson-Hasselbalch" },
          { number: 5, title: "Titrations and equivalence point" },
        ],
      },
      {
        slug: "applications-of-thermodynamics", number: 9, title: "Applications of Thermodynamics", examWeight: "7–9%",
        lessons: [
          { number: 1, title: "Galvanic cells and cell potential" },
          { number: 2, title: "Electrolysis" },
          { number: 3, title: "Gibbs free energy and electrochemistry" },
        ],
      },
    ],
  },

  {
    id: "ap-environmental-science",
    name: "AP Environmental Science",
    units: [
      {
        slug: "the-living-world-ecosystems", number: 1, title: "The Living World: Ecosystems", examWeight: "6–8%",
        lessons: [
          { number: 1, title: "Ecosystem structure and function" },
          { number: 2, title: "Energy flow and trophic levels" },
          { number: 3, title: "Biogeochemical cycles" },
        ],
      },
      {
        slug: "the-living-world-biodiversity", number: 2, title: "The Living World: Biodiversity", examWeight: "6–8%",
        lessons: [
          { number: 1, title: "Biodiversity and evolution" },
          { number: 2, title: "Ecosystem services" },
          { number: 3, title: "Island biogeography" },
        ],
      },
      {
        slug: "populations", number: 3, title: "Populations", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Population ecology — growth models" },
          { number: 2, title: "Carrying capacity and limiting factors" },
          { number: 3, title: "Age structure diagrams" },
        ],
      },
      {
        slug: "earth-systems-and-resources", number: 4, title: "Earth Systems and Resources", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Plate tectonics and soil formation" },
          { number: 2, title: "Atmospheric circulation" },
          { number: 3, title: "Ocean currents and El Niño" },
          { number: 4, title: "Water resources" },
        ],
      },
      {
        slug: "land-and-water-use", number: 5, title: "Land and Water Use", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Agriculture and soil degradation" },
          { number: 2, title: "Forestry and deforestation" },
          { number: 3, title: "Fisheries and aquaculture" },
          { number: 4, title: "Mining impacts" },
        ],
      },
      {
        slug: "energy-resources-and-consumption", number: 6, title: "Energy Resources and Consumption", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Fossil fuels — formation and impacts" },
          { number: 2, title: "Nuclear energy" },
          { number: 3, title: "Renewable energy — solar, wind, hydro" },
          { number: 4, title: "Energy conservation" },
        ],
      },
      {
        slug: "atmospheric-pollution", number: 7, title: "Atmospheric Pollution", examWeight: "7–10%",
        lessons: [
          { number: 1, title: "Air pollutants — sources and effects" },
          { number: 2, title: "Photochemical smog" },
          { number: 3, title: "Acid deposition" },
          { number: 4, title: "Ozone depletion" },
        ],
      },
      {
        slug: "aquatic-and-terrestrial-pollution", number: 8, title: "Aquatic and Terrestrial Pollution", examWeight: "7–10%",
        lessons: [
          { number: 1, title: "Water pollution — point and nonpoint sources" },
          { number: 2, title: "Eutrophication" },
          { number: 3, title: "Solid waste and plastic pollution" },
          { number: 4, title: "Toxicology" },
        ],
      },
      {
        slug: "global-change", number: 9, title: "Global Change", examWeight: "15–20%",
        lessons: [
          { number: 1, title: "Greenhouse gases and climate change" },
          { number: 2, title: "Ocean acidification" },
          { number: 3, title: "Species extinction and habitat loss" },
          { number: 4, title: "Environmental policy and solutions" },
        ],
      },
    ],
  },

  {
    id: "ap-physics-1",
    name: "AP Physics 1",
    units: [
      {
        slug: "kinematics", number: 1, title: "Kinematics", examWeight: "10–16%",
        lessons: [
          { number: 1, title: "Position, velocity, acceleration" },
          { number: 2, title: "Kinematic equations — 1D motion" },
          { number: 3, title: "Projectile motion — 2D" },
          { number: 4, title: "Relative motion" },
        ],
      },
      {
        slug: "forces-and-newtons-laws", number: 2, title: "Forces and Newton's Laws", examWeight: "16–20%",
        lessons: [
          { number: 1, title: "Newton's first and second law" },
          { number: 2, title: "Newton's third law and force pairs" },
          { number: 3, title: "Friction and normal force" },
          { number: 4, title: "Inclines and tension problems" },
        ],
      },
      {
        slug: "work-energy-power", number: 3, title: "Work, Energy, Power", examWeight: "12–18%",
        lessons: [
          { number: 1, title: "Work and work-energy theorem" },
          { number: 2, title: "Kinetic and potential energy" },
          { number: 3, title: "Conservation of energy" },
          { number: 4, title: "Power" },
        ],
      },
      {
        slug: "systems-of-particles-and-linear-momentum", number: 4, title: "Systems of Particles and Linear Momentum", examWeight: "10–16%",
        lessons: [
          { number: 1, title: "Momentum and impulse" },
          { number: 2, title: "Conservation of momentum" },
          { number: 3, title: "Elastic and inelastic collisions" },
        ],
      },
      {
        slug: "rotation", number: 5, title: "Rotation", examWeight: "12–18%",
        lessons: [
          { number: 1, title: "Angular kinematics" },
          { number: 2, title: "Torque and rotational inertia" },
          { number: 3, title: "Conservation of angular momentum" },
          { number: 4, title: "Rolling motion" },
        ],
      },
      {
        slug: "oscillations", number: 6, title: "Oscillations", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Simple harmonic motion" },
          { number: 2, title: "Springs and pendulums" },
          { number: 3, title: "Energy in oscillation" },
        ],
      },
      {
        slug: "gravitation", number: 7, title: "Gravitation", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Newton's law of gravitation" },
          { number: 2, title: "Orbital motion" },
          { number: 3, title: "Gravitational potential energy" },
        ],
      },
    ],
  },

  {
    id: "ap-phys2",
    name: "AP Physics 2",
    units: [
      {
        slug: "fluids", number: 1, title: "Fluids", examWeight: "10–12%",
        lessons: [
          { number: 1, title: "Pressure and buoyancy" },
          { number: 2, title: "Fluid flow — continuity and Bernoulli" },
          { number: 3, title: "Viscosity and surface tension" },
        ],
      },
      {
        slug: "thermodynamics", number: 2, title: "Thermodynamics", examWeight: "12–18%",
        lessons: [
          { number: 1, title: "Temperature, heat, and thermal equilibrium" },
          { number: 2, title: "Laws of thermodynamics" },
          { number: 3, title: "Heat engines and entropy" },
          { number: 4, title: "Ideal gas law" },
        ],
      },
      {
        slug: "electric-force-field-potential", number: 3, title: "Electric Force, Field, Potential", examWeight: "18–22%",
        lessons: [
          { number: 1, title: "Coulomb's law" },
          { number: 2, title: "Electric field" },
          { number: 3, title: "Electric potential and potential energy" },
          { number: 4, title: "Capacitors" },
        ],
      },
      {
        slug: "electric-circuits", number: 4, title: "Electric Circuits", examWeight: "10–14%",
        lessons: [
          { number: 1, title: "Current, resistance, Ohm's law" },
          { number: 2, title: "Series and parallel circuits" },
          { number: 3, title: "RC circuits" },
        ],
      },
      {
        slug: "magnetism-and-electromagnetic-induction", number: 5, title: "Magnetism and Electromagnetic Induction", examWeight: "10–14%",
        lessons: [
          { number: 1, title: "Magnetic force on charges and wires" },
          { number: 2, title: "Magnetic fields from currents" },
          { number: 3, title: "Electromagnetic induction — Faraday's law" },
        ],
      },
      {
        slug: "geometric-and-physical-optics", number: 6, title: "Geometric and Physical Optics", examWeight: "12–14%",
        lessons: [
          { number: 1, title: "Reflection and mirrors" },
          { number: 2, title: "Refraction and lenses" },
          { number: 3, title: "Diffraction and interference" },
        ],
      },
      {
        slug: "quantum-atomic-nuclear-physics", number: 7, title: "Quantum, Atomic, Nuclear Physics", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Photoelectric effect" },
          { number: 2, title: "Atomic models and energy levels" },
          { number: 3, title: "Nuclear reactions — fission and fusion" },
        ],
      },
    ],
  },

  {
    id: "ap-physics-c-mechanics",
    name: "AP Physics C: Mechanics",
    units: [
      {
        slug: "kinematics", number: 1, title: "Kinematics", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Derivatives of Motion — Calculus-Based Kinematics" },
          { number: 2, title: "Projectile Motion — Exact Calculus Treatment" },
          { number: 3, title: "Relative Motion and Non-Inertial Reference Frames" },
          { number: 4, title: "Circular Motion with Calculus" },
          { number: 5, title: "Constraints and Coupled Systems" },
          { number: 6, title: "Variable Acceleration Problems" },
          { number: 7, title: "2D Motion with Variable Forces" },
          { number: 8, title: "Parametric Equations and Motion Analysis" },
        ],
      },
      {
        slug: "newtons-laws-of-motion", number: 2, title: "Newton's Laws of Motion", examWeight: "15–20%",
        lessons: [
          { number: 1, title: "Newton's Laws with Calculus — Variable Forces" },
          { number: 2, title: "Free Body Diagrams for Complex Systems" },
          { number: 3, title: "Friction and Constraint Forces" },
          { number: 4, title: "Circular Motion — Vertical and Banked Turns" },
          { number: 5, title: "Drag Forces and Terminal Velocity" },
          { number: 6, title: "Spring-Mass Systems with Calculus" },
          { number: 7, title: "Fictitious Forces in Rotating Frames" },
          { number: 8, title: "Numerical Methods for Newton's Laws" },
        ],
      },
      {
        slug: "work-energy-and-power", number: 3, title: "Work, Energy, and Power", examWeight: "15–25%",
        lessons: [
          { number: 1, title: "Work as a Line Integral" },
          { number: 2, title: "Potential Energy Functions from Force" },
          { number: 3, title: "Conservative vs. Non-Conservative Forces" },
          { number: 4, title: "Power and Efficiency with Variable Forces" },
          { number: 5, title: "Energy Methods for Complex Systems" },
          { number: 6, title: "Gravitational PE Beyond Near-Earth Approximation" },
          { number: 7, title: "Vibration Energy and Coupled Oscillators" },
          { number: 8, title: "Energy in Variable-Force Particle Motion" },
        ],
      },
      {
        slug: "systems-of-particles-and-linear-momentum", number: 4, title: "Systems of Particles and Linear Momentum", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Center of Mass with Calculus — Continuous Distributions" },
          { number: 2, title: "Momentum and Variable-Mass Systems" },
          { number: 3, title: "Elastic Collisions — Full Calculus Treatment" },
          { number: 4, title: "Angular Momentum of Systems" },
          { number: 5, title: "Impulse and Variable Forces" },
          { number: 6, title: "Collision Analysis in 2D with Calculus Methods" },
          { number: 7, title: "Mechanical Waves from Particle Dynamics" },
          { number: 8, title: "Inelastic Collisions and Deformation Energy" },
        ],
      },
      {
        slug: "rotation", number: 5, title: "Rotation", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Moment of Inertia by Integration" },
          { number: 2, title: "Torque and Angular Acceleration with Calculus" },
          { number: 3, title: "Rolling Motion and Rolling Constraints" },
          { number: 4, title: "Angular Momentum — Vector Form and Conservation" },
          { number: 5, title: "Rotational Energy and Work" },
          { number: 6, title: "Gyroscopes and Precession — Full Treatment" },
          { number: 7, title: "Lagrangian Mechanics Introduction" },
          { number: 8, title: "Precession, Nutation, and Stability of Rotating Bodies" },
        ],
      },
      {
        slug: "oscillations", number: 6, title: "Oscillations", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Deriving SHM from the Differential Equation" },
          { number: 2, title: "Energy Methods in SHM" },
          { number: 3, title: "Damped Oscillations and Resonance" },
          { number: 4, title: "Physical Pendulum and Torsional Oscillator" },
          { number: 5, title: "Coupled Oscillators and Normal Modes" },
          { number: 6, title: "Non-Linear Oscillations and Chaos" },
          { number: 7, title: "Waves in Extended Media" },
          { number: 8, title: "Anharmonic Oscillators and Perturbation Theory" },
        ],
      },
      {
        slug: "gravitation", number: 7, title: "Gravitation", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Gravitational Field as Vector Field — Calculus Treatment" },
          { number: 2, title: "Gravitational Potential and Potential Energy" },
          { number: 3, title: "Orbits — Derivation of Orbital Mechanics" },
          { number: 4, title: "Extended Mass Distributions and Tidal Forces" },
          { number: 5, title: "Energy Analysis of Gravitational Systems" },
          { number: 6, title: "Gravity in Non-Spherically-Symmetric Distributions" },
          { number: 7, title: "Relativistic Gravity — Conceptual Overview" },
          { number: 8, title: "Three-Body Problem and Chaos in Orbital Mechanics" },
        ],
      },
    ],
  },

  {
    id: "ap-physics-c-em",
    name: "AP Physics C: Electricity and Magnetism",
    units: [
      {
        slug: "electrostatics", number: 1, title: "Electrostatics", examWeight: "26–34%",
        lessons: [
          { number: 1, title: "Coulomb's Law and Superposition — Vector Calculus" },
          { number: 2, title: "Electric Field from Continuous Charge Distributions" },
          { number: 3, title: "Gauss's Law — Derivation and Applications" },
          { number: 4, title: "Electric Potential from Field — Integration" },
          { number: 5, title: "Conductors in Electrostatic Equilibrium" },
          { number: 6, title: "Capacitance and Energy Storage" },
          { number: 7, title: "Dielectrics and Polarization" },
          { number: 8, title: "Electrostatic Boundary Conditions and Uniqueness Theorem" },
        ],
      },
      {
        slug: "conductors-capacitors-dielectrics", number: 2, title: "Conductors, Capacitors, and Dielectrics", examWeight: "14–17%",
        lessons: [
          { number: 1, title: "Resistance and Ohm's Law from Microscopic View" },
          { number: 2, title: "RC Circuits — Differential Equation Approach" },
          { number: 3, title: "Capacitor Networks and Equivalent Circuits" },
          { number: 4, title: "Steady-State and Transient Behavior in RC Circuits" },
          { number: 5, title: "Stored Energy and Energy Density" },
          { number: 6, title: "Multi-loop Circuits and Kirchhoff's Laws" },
          { number: 7, title: "Nonlinear Circuit Elements" },
          { number: 8, title: "Capacitor Applications and Real Dielectrics" },
        ],
      },
      {
        slug: "electric-circuits", number: 3, title: "Electric Circuits", examWeight: "17–23%",
        lessons: [
          { number: 1, title: "DC Circuit Analysis — Complete Methods" },
          { number: 2, title: "Charge and Current Conservation in Complex Circuits" },
          { number: 3, title: "Power Analysis in DC Circuits" },
          { number: 4, title: "AC Circuits — Phasors and Impedance" },
          { number: 5, title: "LC Circuits and Electrical Oscillations" },
          { number: 6, title: "Filters and Signal Processing Basics" },
          { number: 7, title: "Grounding, Shielding, and Practical Circuit Issues" },
          { number: 8, title: "Measuring Instruments and Their Effect on Circuits" },
        ],
      },
      {
        slug: "magnetic-fields", number: 4, title: "Magnetic Fields", examWeight: "18–23%",
        lessons: [
          { number: 1, title: "Biot-Savart Law — Magnetic Field from Current" },
          { number: 2, title: "Ampere's Law — Using Symmetry for B" },
          { number: 3, title: "Magnetic Force on Moving Charges — Cyclotron Motion" },
          { number: 4, title: "Magnetic Force on Current-Carrying Conductors" },
          { number: 5, title: "Magnetic Materials and Permeability" },
          { number: 6, title: "Maxwell's Addition to Ampere's Law" },
          { number: 7, title: "Hall Effect and Charge Carrier Identification" },
          { number: 8, title: "Magnetic Flux and Its Role in Induction" },
        ],
      },
      {
        slug: "electromagnetism", number: 5, title: "Electromagnetism", examWeight: "14–20%",
        lessons: [
          { number: 1, title: "Faraday's Law and Lenz's Law — Full Formulation" },
          { number: 2, title: "Inductance — Self and Mutual" },
          { number: 3, title: "RL Circuits — Differential Equation and Solution" },
          { number: 4, title: "LC Oscillations and Energy Exchange" },
          { number: 5, title: "RLC Circuits and Damped Oscillations" },
          { number: 6, title: "Maxwell's Equations — The Complete Set" },
          { number: 7, title: "Electromagnetic Waves — Derivation from Maxwell" },
          { number: 8, title: "Electromagnetic Induction Applications — Generators and Motors" },
        ],
      },
    ],
  },

  {
    id: "ap-calc-ab",
    name: "AP Calculus AB",
    units: [
      {
        slug: "limits-and-continuity", number: 1, title: "Limits and Continuity", examWeight: "10–12%",
        lessons: [
          { number: 1, title: "Limits — graphical and numerical" },
          { number: 2, title: "Algebraic limit techniques" },
          { number: 3, title: "Continuity and discontinuity" },
          { number: 4, title: "Limits at infinity" },
        ],
      },
      {
        slug: "differentiation-definition-and-properties", number: 2, title: "Differentiation: Definition and Fundamental Properties", examWeight: "10–12%",
        lessons: [
          { number: 1, title: "Definition of derivative" },
          { number: 2, title: "Basic differentiation rules" },
          { number: 3, title: "Product and quotient rules" },
          { number: 4, title: "Derivatives of trig functions" },
        ],
      },
      {
        slug: "differentiation-composite-implicit-inverse", number: 3, title: "Differentiation: Composite, Implicit, Inverse", examWeight: "9–13%",
        lessons: [
          { number: 1, title: "Chain rule" },
          { number: 2, title: "Implicit differentiation" },
          { number: 3, title: "Derivatives of inverse functions" },
          { number: 4, title: "Derivatives of exponential and log" },
        ],
      },
      {
        slug: "contextual-applications-of-differentiation", number: 4, title: "Contextual Applications of Differentiation", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Related rates" },
          { number: 2, title: "Linear approximation" },
          { number: 3, title: "L'Hôpital's rule" },
        ],
      },
      {
        slug: "analytical-applications-of-differentiation", number: 5, title: "Analytical Applications of Differentiation", examWeight: "15–18%",
        lessons: [
          { number: 1, title: "Mean value theorem" },
          { number: 2, title: "Increasing/decreasing and first derivative test" },
          { number: 3, title: "Concavity and second derivative test" },
          { number: 4, title: "Optimization problems" },
        ],
      },
      {
        slug: "integration-and-accumulation-of-change", number: 6, title: "Integration and Accumulation of Change", examWeight: "17–20%",
        lessons: [
          { number: 1, title: "Riemann sums and definite integral" },
          { number: 2, title: "Fundamental theorem of calculus" },
          { number: 3, title: "Basic antiderivatives" },
          { number: 4, title: "U-substitution" },
        ],
      },
      {
        slug: "differential-equations", number: 7, title: "Differential Equations", examWeight: "6–12%",
        lessons: [
          { number: 1, title: "Slope fields" },
          { number: 2, title: "Separable differential equations" },
          { number: 3, title: "Exponential growth and decay" },
        ],
      },
      {
        slug: "applications-of-integration", number: 8, title: "Applications of Integration", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Area between curves" },
          { number: 2, title: "Volume — disk and washer method" },
          { number: 3, title: "Accumulation problems" },
        ],
      },
    ],
  },

  {
    id: "ap-calc-bc",
    name: "AP Calculus BC",
    units: [
      {
        slug: "limits-and-continuity", number: 1, title: "Limits and Continuity", examWeight: "4–7%",
        lessons: [
          { number: 1, title: "Limits — graphical and numerical" },
          { number: 2, title: "Algebraic limit techniques" },
          { number: 3, title: "Continuity and discontinuity" },
          { number: 4, title: "Limits at infinity" },
        ],
      },
      {
        slug: "differentiation-definition-and-properties", number: 2, title: "Differentiation: Definition and Fundamental Properties", examWeight: "4–7%",
        lessons: [
          { number: 1, title: "Definition of derivative" },
          { number: 2, title: "Basic differentiation rules" },
          { number: 3, title: "Product and quotient rules" },
          { number: 4, title: "Derivatives of trig functions" },
        ],
      },
      {
        slug: "differentiation-composite-implicit-inverse", number: 3, title: "Differentiation: Composite, Implicit, Inverse", examWeight: "4–7%",
        lessons: [
          { number: 1, title: "Chain rule" },
          { number: 2, title: "Implicit differentiation" },
          { number: 3, title: "Derivatives of inverse functions" },
          { number: 4, title: "Derivatives of exponential and log" },
        ],
      },
      {
        slug: "contextual-applications-of-differentiation", number: 4, title: "Contextual Applications of Differentiation", examWeight: "6–9%",
        lessons: [
          { number: 1, title: "Related rates" },
          { number: 2, title: "Linear approximation" },
          { number: 3, title: "L'Hôpital's rule" },
        ],
      },
      {
        slug: "analytical-applications-of-differentiation", number: 5, title: "Analytical Applications of Differentiation", examWeight: "8–11%",
        lessons: [
          { number: 1, title: "Mean value theorem" },
          { number: 2, title: "Increasing/decreasing and first derivative test" },
          { number: 3, title: "Concavity and second derivative test" },
          { number: 4, title: "Optimization problems" },
        ],
      },
      {
        slug: "integration-and-accumulation-of-change", number: 6, title: "Integration and Accumulation of Change", examWeight: "17–20%",
        lessons: [
          { number: 1, title: "Riemann sums and definite integral" },
          { number: 2, title: "Fundamental theorem of calculus" },
          { number: 3, title: "Basic antiderivatives and integration by parts" },
          { number: 4, title: "U-substitution and partial fractions" },
        ],
      },
      {
        slug: "differential-equations", number: 7, title: "Differential Equations", examWeight: "6–9%",
        lessons: [
          { number: 1, title: "Slope fields" },
          { number: 2, title: "Separable differential equations" },
          { number: 3, title: "Euler's method" },
          { number: 4, title: "Logistic growth" },
        ],
      },
      {
        slug: "applications-of-integration", number: 8, title: "Applications of Integration", examWeight: "6–9%",
        lessons: [
          { number: 1, title: "Area between curves" },
          { number: 2, title: "Volume — disk, washer, shell" },
          { number: 3, title: "Arc length" },
        ],
      },
      {
        slug: "parametric-polar-vector", number: 9, title: "Parametric Equations, Polar, Vector", examWeight: "11–12%",
        lessons: [
          { number: 1, title: "Parametric equations — derivatives and arc length" },
          { number: 2, title: "Polar coordinates and area" },
          { number: 3, title: "Vector-valued functions" },
        ],
      },
      {
        slug: "infinite-sequences-and-series", number: 10, title: "Infinite Sequences and Series", examWeight: "17–18%",
        lessons: [
          { number: 1, title: "Convergence and divergence — basic tests" },
          { number: 2, title: "Integral and comparison tests" },
          { number: 3, title: "Ratio and alternating series tests" },
          { number: 4, title: "Power series and radius of convergence" },
          { number: 5, title: "Taylor and Maclaurin series" },
          { number: 6, title: "Lagrange error bound" },
        ],
      },
    ],
  },

  {
    id: "ap-statistics",
    name: "AP Statistics",
    units: [
      {
        slug: "exploring-one-variable-data", number: 1, title: "Exploring One-Variable Data", examWeight: "15–23%",
        lessons: [
          { number: 1, title: "Types of data and displays" },
          { number: 2, title: "Measures of center and spread" },
          { number: 3, title: "Normal distribution and z-scores" },
          { number: 4, title: "Percentiles and empirical rule" },
        ],
      },
      {
        slug: "exploring-two-variable-data", number: 2, title: "Exploring Two-Variable Data", examWeight: "5–7%",
        lessons: [
          { number: 1, title: "Scatterplots and correlation" },
          { number: 2, title: "Linear regression — LSRL" },
          { number: 3, title: "Residuals and r²" },
        ],
      },
      {
        slug: "collecting-data", number: 3, title: "Collecting Data", examWeight: "12–15%",
        lessons: [
          { number: 1, title: "Sampling methods and bias" },
          { number: 2, title: "Experimental design" },
          { number: 3, title: "Observational studies vs experiments" },
        ],
      },
      {
        slug: "probability-random-variables-distributions", number: 4, title: "Probability, Random Variables, Distributions", examWeight: "10–20%",
        lessons: [
          { number: 1, title: "Basic probability rules" },
          { number: 2, title: "Conditional probability and independence" },
          { number: 3, title: "Discrete random variables" },
          { number: 4, title: "Binomial and geometric distributions" },
        ],
      },
      {
        slug: "sampling-distributions", number: 5, title: "Sampling Distributions", examWeight: "7–12%",
        lessons: [
          { number: 1, title: "Sampling distribution of sample mean" },
          { number: 2, title: "Central limit theorem" },
          { number: 3, title: "Sampling distribution of sample proportion" },
        ],
      },
      {
        slug: "inference-for-categorical-data-proportions", number: 6, title: "Inference for Categorical Data: Proportions", examWeight: "12–15%",
        lessons: [
          { number: 1, title: "Confidence intervals for proportions" },
          { number: 2, title: "Significance tests for proportions" },
          { number: 3, title: "Two-sample proportion tests" },
        ],
      },
      {
        slug: "inference-for-quantitative-data-means", number: 7, title: "Inference for Quantitative Data: Means", examWeight: "10–18%",
        lessons: [
          { number: 1, title: "t-distribution and confidence intervals" },
          { number: 2, title: "One-sample t-test" },
          { number: 3, title: "Two-sample t-test and paired t-test" },
        ],
      },
      {
        slug: "inference-for-categorical-data-chi-square", number: 8, title: "Inference for Categorical Data: Chi-Square", examWeight: "2–5%",
        lessons: [
          { number: 1, title: "Chi-square goodness of fit" },
          { number: 2, title: "Chi-square test of independence" },
        ],
      },
      {
        slug: "inference-for-quantitative-data-slopes", number: 9, title: "Inference for Quantitative Data: Slopes", examWeight: "2–5%",
        lessons: [
          { number: 1, title: "Inference for regression slope" },
          { number: 2, title: "Confidence intervals and tests for slope" },
        ],
      },
    ],
  },

  {
    id: "ap-computer-science-a",
    name: "AP Computer Science A",
    units: [
      {
        slug: "primitive-types", number: 1, title: "Primitive Types", examWeight: "2–5%",
        lessons: [
          { number: 1, title: "Variables and data types" },
          { number: 2, title: "Arithmetic operators and expressions" },
          { number: 3, title: "Casting and overflow" },
        ],
      },
      {
        slug: "using-objects", number: 2, title: "Using Objects", examWeight: "5–7%",
        lessons: [
          { number: 1, title: "Objects and classes" },
          { number: 2, title: "String methods" },
          { number: 3, title: "Math class and wrapper classes" },
        ],
      },
      {
        slug: "boolean-expressions-and-if-statements", number: 3, title: "Boolean Expressions and if Statements", examWeight: "15–17%",
        lessons: [
          { number: 1, title: "Boolean expressions" },
          { number: 2, title: "if/else and nested conditionals" },
          { number: 3, title: "Common logic errors" },
        ],
      },
      {
        slug: "iteration", number: 4, title: "Iteration", examWeight: "17–19%",
        lessons: [
          { number: 1, title: "while loops" },
          { number: 2, title: "for loops" },
          { number: 3, title: "Nested loops and loop tracing" },
        ],
      },
      {
        slug: "writing-classes", number: 5, title: "Writing Classes", examWeight: "5–7%",
        lessons: [
          { number: 1, title: "Class structure and constructors" },
          { number: 2, title: "Instance variables and methods" },
          { number: 3, title: "Static vs instance" },
        ],
      },
      {
        slug: "array", number: 6, title: "Array", examWeight: "10–15%",
        lessons: [
          { number: 1, title: "Array declaration and traversal" },
          { number: 2, title: "Array algorithms — search, sort" },
          { number: 3, title: "Array as parameter" },
        ],
      },
      {
        slug: "arraylist", number: 7, title: "ArrayList", examWeight: "2–7%",
        lessons: [
          { number: 1, title: "ArrayList methods" },
          { number: 2, title: "Traversal and modification" },
          { number: 3, title: "ArrayList algorithms" },
        ],
      },
      {
        slug: "2d-array", number: 8, title: "2D Array", examWeight: "7–10%",
        lessons: [
          { number: 1, title: "2D array declaration and access" },
          { number: 2, title: "Nested loop traversal" },
          { number: 3, title: "2D array algorithms" },
        ],
      },
      {
        slug: "inheritance", number: 9, title: "Inheritance", examWeight: "5–10%",
        lessons: [
          { number: 1, title: "Superclass and subclass" },
          { number: 2, title: "Method overriding" },
          { number: 3, title: "Polymorphism" },
        ],
      },
      {
        slug: "recursion", number: 10, title: "Recursion", examWeight: "5–7%",
        lessons: [
          { number: 1, title: "Base case and recursive case" },
          { number: 2, title: "Tracing recursion" },
          { number: 3, title: "Recursive algorithms — binary search, mergesort" },
        ],
      },
    ],
  },

  {
    id: "ap-macroeconomics",
    name: "AP Macroeconomics",
    units: [
      {
        slug: "basic-economic-concepts", number: 1, title: "Basic Economic Concepts", examWeight: "5–10%",
        lessons: [
          { number: 1, title: "Scarcity, opportunity cost, PPC" },
          { number: 2, title: "Comparative advantage and trade" },
          { number: 3, title: "Economic systems" },
        ],
      },
      {
        slug: "economic-indicators-and-the-business-cycle", number: 2, title: "Economic Indicators and the Business Cycle", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "GDP — components and measurement" },
          { number: 2, title: "Unemployment — types and natural rate" },
          { number: 3, title: "Inflation — CPI and effects" },
        ],
      },
      {
        slug: "national-income-and-price-determination", number: 3, title: "National Income and Price Determination", examWeight: "17–27%",
        lessons: [
          { number: 1, title: "Aggregate demand — components and shifts" },
          { number: 2, title: "Aggregate supply — SRAS and LRAS" },
          { number: 3, title: "AD-AS model and equilibrium" },
          { number: 4, title: "Fiscal policy and multipliers" },
        ],
      },
      {
        slug: "financial-sector", number: 4, title: "Financial Sector", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Money supply and money market" },
          { number: 2, title: "Banking system and money creation" },
          { number: 3, title: "Federal Reserve and monetary policy" },
        ],
      },
      {
        slug: "long-run-consequences-of-stabilization-policies", number: 5, title: "Long-Run Consequences of Stabilization Policies", examWeight: "20–30%",
        lessons: [
          { number: 1, title: "Phillips curve — short run and long run" },
          { number: 2, title: "Crowding out" },
          { number: 3, title: "Economic growth and loanable funds" },
        ],
      },
      {
        slug: "open-economy-international-trade-and-finance", number: 6, title: "Open Economy: International Trade and Finance", examWeight: "10–13%",
        lessons: [
          { number: 1, title: "Balance of payments" },
          { number: 2, title: "Exchange rates" },
          { number: 3, title: "Current and capital accounts" },
        ],
      },
    ],
  },

  {
    id: "ap-microeconomics",
    name: "AP Microeconomics",
    units: [
      {
        slug: "basic-economic-concepts", number: 1, title: "Basic Economic Concepts", examWeight: "6–9%",
        lessons: [
          { number: 1, title: "Scarcity and PPC" },
          { number: 2, title: "Comparative advantage" },
          { number: 3, title: "Market economies" },
        ],
      },
      {
        slug: "supply-and-demand", number: 2, title: "Supply and Demand", examWeight: "15–20%",
        lessons: [
          { number: 1, title: "Demand — law and shifts" },
          { number: 2, title: "Supply — law and shifts" },
          { number: 3, title: "Market equilibrium and price changes" },
          { number: 4, title: "Elasticity — price, income, cross-price" },
        ],
      },
      {
        slug: "production-cost-and-perfect-competition", number: 3, title: "Production, Cost, and the Perfect Competition Model", examWeight: "22–33%",
        lessons: [
          { number: 1, title: "Production function and marginal product" },
          { number: 2, title: "Short-run and long-run costs" },
          { number: 3, title: "Perfect competition — profit maximization" },
          { number: 4, title: "Shut-down and break-even" },
        ],
      },
      {
        slug: "imperfect-competition", number: 4, title: "Imperfect Competition", examWeight: "15–25%",
        lessons: [
          { number: 1, title: "Monopoly — MR and profit max" },
          { number: 2, title: "Price discrimination" },
          { number: 3, title: "Oligopoly and game theory" },
          { number: 4, title: "Monopolistic competition" },
        ],
      },
      {
        slug: "factor-markets", number: 5, title: "Factor Markets", examWeight: "10–18%",
        lessons: [
          { number: 1, title: "Labor demand and MRP" },
          { number: 2, title: "Labor supply and wages" },
          { number: 3, title: "Monopsony" },
        ],
      },
      {
        slug: "market-failure-and-role-of-government", number: 6, title: "Market Failure and Role of Government", examWeight: "8–13%",
        lessons: [
          { number: 1, title: "Externalities and Pigouvian taxes" },
          { number: 2, title: "Public goods" },
          { number: 3, title: "Income inequality and redistribution" },
        ],
      },
    ],
  },

  {
    id: "ap-psychology",
    name: "AP Psychology",
    units: [
      {
        slug: "scientific-foundations-of-psychology", number: 1, title: "Scientific Foundations of Psychology", examWeight: "10–14%",
        lessons: [
          { number: 1, title: "History of psychology — major perspectives" },
          { number: 2, title: "Research methods — experiments and correlations" },
          { number: 3, title: "Statistics — descriptive and inferential" },
          { number: 4, title: "Ethics in research" },
        ],
      },
      {
        slug: "biological-bases-of-behavior", number: 2, title: "Biological Bases of Behavior", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Neurons and neurotransmission" },
          { number: 2, title: "Brain structure and function" },
          { number: 3, title: "Genetics and behavior" },
        ],
      },
      {
        slug: "sensation-and-perception", number: 3, title: "Sensation and Perception", examWeight: "6–8%",
        lessons: [
          { number: 1, title: "Sensory processes — thresholds and adaptation" },
          { number: 2, title: "Visual perception" },
          { number: 3, title: "Perceptual organization — Gestalt" },
        ],
      },
      {
        slug: "learning-and-cognition", number: 4, title: "Learning and Cognition", examWeight: "30–35%",
        lessons: [
          { number: 1, title: "Classical conditioning" },
          { number: 2, title: "Operant conditioning" },
          { number: 3, title: "Observational learning" },
          { number: 4, title: "Memory — encoding, storage, retrieval" },
          { number: 5, title: "Forgetting and memory distortion" },
          { number: 6, title: "Thinking, problem-solving, language" },
        ],
      },
      {
        slug: "developmental-social-and-personality-psychology", number: 5, title: "Developmental, Social, and Personality Psychology", examWeight: "30–35%",
        lessons: [
          { number: 1, title: "Developmental theories — Piaget, Erikson" },
          { number: 2, title: "Social influence — conformity, obedience" },
          { number: 3, title: "Attribution and attitudes" },
          { number: 4, title: "Personality theories" },
          { number: 5, title: "Psychological disorders — overview" },
          { number: 6, title: "Treatment approaches" },
        ],
      },
    ],
  },

  {
    id: "ap-us-history",
    name: "AP United States History",
    units: [
      {
        slug: "period-1-1491-1607", number: 1, title: "Period 1: 1491–1607", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Native American societies before contact" },
          { number: 2, title: "European exploration and contact" },
          { number: 3, title: "Columbian Exchange" },
        ],
      },
      {
        slug: "period-2-1607-1754", number: 2, title: "Period 2: 1607–1754", examWeight: "6–8%",
        lessons: [
          { number: 1, title: "British colonial models" },
          { number: 2, title: "Colonial economies and labor systems" },
          { number: 3, title: "Colonial society and conflict" },
        ],
      },
      {
        slug: "period-3-1754-1800", number: 3, title: "Period 3: 1754–1800", examWeight: "10–17%",
        lessons: [
          { number: 1, title: "French and Indian War" },
          { number: 2, title: "Road to Revolution" },
          { number: 3, title: "Revolutionary War and founding documents" },
          { number: 4, title: "Articles of Confederation to Constitution" },
        ],
      },
      {
        slug: "period-4-1800-1848", number: 4, title: "Period 4: 1800–1848", examWeight: "10–17%",
        lessons: [
          { number: 1, title: "Market revolution" },
          { number: 2, title: "Jacksonian democracy" },
          { number: 3, title: "Reform movements — abolition, women's rights" },
          { number: 4, title: "Manifest Destiny" },
        ],
      },
      {
        slug: "period-5-1844-1877", number: 5, title: "Period 5: 1844–1877", examWeight: "10–17%",
        lessons: [
          { number: 1, title: "Causes of the Civil War" },
          { number: 2, title: "Civil War — key turning points" },
          { number: 3, title: "Reconstruction — successes and failures" },
        ],
      },
      {
        slug: "period-6-1865-1898", number: 6, title: "Period 6: 1865–1898", examWeight: "10–17%",
        lessons: [
          { number: 1, title: "Industrialization and Gilded Age" },
          { number: 2, title: "Immigration and urbanization" },
          { number: 3, title: "Populism and labor movements" },
        ],
      },
      {
        slug: "period-7-1890-1945", number: 7, title: "Period 7: 1890–1945", examWeight: "10–17%",
        lessons: [
          { number: 1, title: "Progressivism" },
          { number: 2, title: "WWI and aftermath" },
          { number: 3, title: "Great Depression and New Deal" },
          { number: 4, title: "WWII — home front and abroad" },
        ],
      },
      {
        slug: "period-8-1945-1980", number: 8, title: "Period 8: 1945–1980", examWeight: "10–17%",
        lessons: [
          { number: 1, title: "Cold War — containment and Korea" },
          { number: 2, title: "Civil Rights Movement" },
          { number: 3, title: "Vietnam War and counterculture" },
          { number: 4, title: "Nixon and détente" },
        ],
      },
      {
        slug: "period-9-1980-present", number: 9, title: "Period 9: 1980–Present", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Reagan Revolution" },
          { number: 2, title: "End of Cold War" },
          { number: 3, title: "Post-9/11 America" },
        ],
      },
    ],
  },

  {
    id: "ap-world-history",
    name: "AP World History: Modern",
    units: [
      {
        slug: "the-global-tapestry", number: 1, title: "The Global Tapestry", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "East Asia — Song and Ming dynasties" },
          { number: 2, title: "Dar al-Islam" },
          { number: 3, title: "South and Southeast Asia" },
          { number: 4, title: "Americas and Africa" },
        ],
      },
      {
        slug: "networks-of-exchange", number: 2, title: "Networks of Exchange", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Silk Roads" },
          { number: 2, title: "Mongol Empire and trade" },
          { number: 3, title: "Indian Ocean trade" },
          { number: 4, title: "Trans-Saharan trade" },
        ],
      },
      {
        slug: "land-based-empires", number: 3, title: "Land-Based Empires", examWeight: "12–15%",
        lessons: [
          { number: 1, title: "Ottoman Empire" },
          { number: 2, title: "Safavid and Mughal empires" },
          { number: 3, title: "Russian and Chinese empires" },
        ],
      },
      {
        slug: "transoceanic-interconnections", number: 4, title: "Transoceanic Interconnections", examWeight: "12–15%",
        lessons: [
          { number: 1, title: "European exploration" },
          { number: 2, title: "Columbian Exchange" },
          { number: 3, title: "Maritime empires — Portugal and Spain" },
          { number: 4, title: "Slave trade and Atlantic world" },
        ],
      },
      {
        slug: "revolutions", number: 5, title: "Revolutions", examWeight: "12–15%",
        lessons: [
          { number: 1, title: "Scientific Revolution and Enlightenment" },
          { number: 2, title: "Atlantic Revolutions" },
          { number: 3, title: "Industrial Revolution" },
          { number: 4, title: "Nationalism and social reform" },
        ],
      },
      {
        slug: "consequences-of-industrialization", number: 6, title: "Consequences of Industrialization", examWeight: "12–15%",
        lessons: [
          { number: 1, title: "Imperialism in Africa and Asia" },
          { number: 2, title: "Resistance to imperialism" },
          { number: 3, title: "Global economic integration" },
        ],
      },
      {
        slug: "global-conflict", number: 7, title: "Global Conflict", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "WWI — causes and consequences" },
          { number: 2, title: "Interwar period — fascism and depression" },
          { number: 3, title: "WWII — causes, turning points, aftermath" },
          { number: 4, title: "Holocaust and genocide" },
        ],
      },
      {
        slug: "cold-war-and-decolonization", number: 8, title: "Cold War and Decolonization", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Cold War — origins and proxy wars" },
          { number: 2, title: "Decolonization in Asia and Africa" },
          { number: 3, title: "Non-Aligned Movement" },
        ],
      },
      {
        slug: "globalization", number: 9, title: "Globalization", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Technological advances and communication" },
          { number: 2, title: "Economic globalization" },
          { number: 3, title: "Resistance to globalization" },
          { number: 4, title: "Environmental change" },
        ],
      },
    ],
  },

  {
    id: "ap-hug",
    name: "AP Human Geography",
    units: [
      {
        slug: "thinking-geographically", number: 1, title: "Thinking Geographically", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Maps and geographic data" },
          { number: 2, title: "Geographic concepts — scale and region" },
          { number: 3, title: "Spatial thinking and patterns" },
        ],
      },
      {
        slug: "population-and-migration", number: 2, title: "Population and Migration", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Population distribution and density" },
          { number: 2, title: "Demographic transition model" },
          { number: 3, title: "Migration — push/pull factors" },
          { number: 4, title: "Refugee patterns" },
        ],
      },
      {
        slug: "cultural-patterns-and-processes", number: 3, title: "Cultural Patterns and Processes", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Culture — language and religion distribution" },
          { number: 2, title: "Cultural diffusion" },
          { number: 3, title: "Cultural landscapes" },
        ],
      },
      {
        slug: "political-patterns-and-processes", number: 4, title: "Political Patterns and Processes", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Nation-states and sovereignty" },
          { number: 2, title: "Boundaries — types and conflicts" },
          { number: 3, title: "Electoral geography" },
          { number: 4, title: "Supranationalism and devolution" },
        ],
      },
      {
        slug: "agriculture-and-rural-land-use", number: 5, title: "Agriculture and Rural Land Use", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Agricultural origins and diffusion" },
          { number: 2, title: "Von Thünen model" },
          { number: 3, title: "Green Revolution and GMOs" },
          { number: 4, title: "Food security" },
        ],
      },
      {
        slug: "cities-and-urban-land-use", number: 6, title: "Cities and Urban Land Use", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Urbanization trends" },
          { number: 2, title: "Urban models — Burgess, Hoyt, multiple nuclei" },
          { number: 3, title: "Suburbanization and urban sprawl" },
          { number: 4, title: "Squatter settlements" },
        ],
      },
      {
        slug: "industrial-and-economic-development", number: 7, title: "Industrial and Economic Development", examWeight: "12–17%",
        lessons: [
          { number: 1, title: "Development indicators — HDI, GNI" },
          { number: 2, title: "Industrial location — Weber model" },
          { number: 3, title: "Rostow's stages of growth" },
          { number: 4, title: "Globalization and trade" },
        ],
      },
    ],
  },

  {
    id: "ap-art-hist",
    name: "AP Art History",
    units: [
      {
        slug: "global-prehistory", number: 1, title: "Global Prehistory 30,000–500 BCE", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Paleolithic art" },
          { number: 2, title: "Neolithic monuments" },
        ],
      },
      {
        slug: "ancient-mediterranean", number: 2, title: "Ancient Mediterranean 3500–30 BCE", examWeight: "15–17%",
        lessons: [
          { number: 1, title: "Ancient Near East and Egypt" },
          { number: 2, title: "Ancient Greece — Archaic to Hellenistic" },
          { number: 3, title: "Ancient Rome" },
        ],
      },
      {
        slug: "early-europe-and-colonial-americas", number: 3, title: "Early Europe and Colonial Americas 200–1750 CE", examWeight: "16–18%",
        lessons: [
          { number: 1, title: "Early Christian and Byzantine" },
          { number: 2, title: "Romanesque and Gothic" },
          { number: 3, title: "Renaissance — Early, High, Northern" },
          { number: 4, title: "Baroque and Rococo" },
        ],
      },
      {
        slug: "later-europe-and-americas", number: 4, title: "Later Europe and Americas 1750–1980 CE", examWeight: "14–16%",
        lessons: [
          { number: 1, title: "Neoclassicism and Romanticism" },
          { number: 2, title: "Realism and Impressionism" },
          { number: 3, title: "Modernism — Cubism, Surrealism, Abstract" },
          { number: 4, title: "Postmodernism" },
        ],
      },
      {
        slug: "indigenous-americas", number: 5, title: "Indigenous Americas 1000 BCE–1980 CE", examWeight: "6–8%",
        lessons: [
          { number: 1, title: "Mesoamerica — Maya and Aztec" },
          { number: 2, title: "North America" },
        ],
      },
      {
        slug: "africa", number: 6, title: "Africa 1100–1980 CE", examWeight: "6–8%",
        lessons: [
          { number: 1, title: "Sub-Saharan kingdoms" },
          { number: 2, title: "Colonial and postcolonial art" },
        ],
      },
      {
        slug: "west-and-central-asia", number: 7, title: "West and Central Asia 500 BCE–1980 CE", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Islamic art and architecture" },
        ],
      },
      {
        slug: "south-east-southeast-asia", number: 8, title: "South, East, Southeast Asia 300 BCE–1980 CE", examWeight: "8–10%",
        lessons: [
          { number: 1, title: "Indian art — Hindu and Buddhist" },
          { number: 2, title: "Chinese and Japanese art" },
        ],
      },
      {
        slug: "the-pacific", number: 9, title: "The Pacific 700–1980 CE", examWeight: "4–6%",
        lessons: [
          { number: 1, title: "Oceanic art" },
        ],
      },
      {
        slug: "global-contemporary", number: 10, title: "Global Contemporary 1980 CE to Present", examWeight: "12–14%",
        lessons: [
          { number: 1, title: "Contemporary global art movements" },
        ],
      },
    ],
  },

  {
    id: "ap-music",
    name: "AP Music Theory",
    units: [
      {
        slug: "music-fundamentals-i", number: 1, title: "Music Fundamentals I", examWeight: "35–40%",
        lessons: [
          { number: 1, title: "Pitch — clefs, notes, accidentals" },
          { number: 2, title: "Rhythm — note values and meter" },
          { number: 3, title: "Scales — major and minor" },
          { number: 4, title: "Key signatures" },
        ],
      },
      {
        slug: "music-fundamentals-ii", number: 2, title: "Music Fundamentals II", examWeight: "20–25%",
        lessons: [
          { number: 1, title: "Intervals" },
          { number: 2, title: "Triads — types and inversions" },
          { number: 3, title: "Seventh chords" },
        ],
      },
      {
        slug: "harmony-and-voice-leading-i", number: 3, title: "Harmony and Voice Leading I", examWeight: "20–25%",
        lessons: [
          { number: 1, title: "Roman numeral analysis" },
          { number: 2, title: "Voice leading rules" },
          { number: 3, title: "Cadences" },
        ],
      },
      {
        slug: "harmony-and-voice-leading-ii", number: 4, title: "Harmony and Voice Leading II", examWeight: "15–20%",
        lessons: [
          { number: 1, title: "Secondary dominants" },
          { number: 2, title: "Modulation" },
          { number: 3, title: "Form analysis — binary, ternary, sonata" },
        ],
      },
    ],
  },
  // ─── HONORS ───────────────────────────────────────────────────────────────

  {
    id: "honors-biology",
    name: "Honors Biology",
    units: [
      {
        slug: "cell-biology", number: 1, title: "Cell Biology", examWeight: "20%",
        lessons: [
          { number: 1, title: "Cell theory and cell types" },
          { number: 2, title: "Cell organelles and functions" },
          { number: 3, title: "Cell membrane and transport" },
          { number: 4, title: "Cell division — mitosis and meiosis" },
        ],
      },
      {
        slug: "genetics", number: 2, title: "Genetics", examWeight: "20%",
        lessons: [
          { number: 1, title: "DNA structure and replication" },
          { number: 2, title: "Protein synthesis" },
          { number: 3, title: "Mendelian genetics" },
          { number: 4, title: "Inheritance patterns" },
        ],
      },
      {
        slug: "evolution", number: 3, title: "Evolution", examWeight: "20%",
        lessons: [
          { number: 1, title: "Natural selection" },
          { number: 2, title: "Evidence for evolution" },
          { number: 3, title: "Speciation" },
        ],
      },
      {
        slug: "ecology", number: 4, title: "Ecology", examWeight: "20%",
        lessons: [
          { number: 1, title: "Ecosystems and energy flow" },
          { number: 2, title: "Population dynamics" },
          { number: 3, title: "Biomes and biodiversity" },
        ],
      },
      {
        slug: "human-biology", number: 5, title: "Human Biology", examWeight: "20%",
        lessons: [
          { number: 1, title: "Body systems overview" },
          { number: 2, title: "Immune system" },
          { number: 3, title: "Homeostasis" },
        ],
      },
    ],
  },

  {
    id: "honors-chemistry",
    name: "Honors Chemistry",
    units: [
      {
        slug: "atomic-structure", number: 1, title: "Atomic Structure", examWeight: "15%",
        lessons: [
          { number: 1, title: "Atomic theory and models" },
          { number: 2, title: "Electron configuration" },
          { number: 3, title: "Periodic table and trends" },
        ],
      },
      {
        slug: "chemical-bonding", number: 2, title: "Chemical Bonding", examWeight: "15%",
        lessons: [
          { number: 1, title: "Ionic and covalent bonds" },
          { number: 2, title: "Lewis structures" },
          { number: 3, title: "Molecular geometry" },
        ],
      },
      {
        slug: "stoichiometry", number: 3, title: "Stoichiometry", examWeight: "20%",
        lessons: [
          { number: 1, title: "Mole concept" },
          { number: 2, title: "Chemical equations and balancing" },
          { number: 3, title: "Limiting reagents and percent yield" },
        ],
      },
      {
        slug: "thermochemistry", number: 4, title: "Thermochemistry", examWeight: "15%",
        lessons: [
          { number: 1, title: "Energy in reactions" },
          { number: 2, title: "Enthalpy and Hess's law" },
          { number: 3, title: "Calorimetry" },
        ],
      },
      {
        slug: "kinetics-and-equilibrium", number: 5, title: "Kinetics and Equilibrium", examWeight: "20%",
        lessons: [
          { number: 1, title: "Reaction rates" },
          { number: 2, title: "Equilibrium and Le Chatelier" },
          { number: 3, title: "Acids and bases — pH" },
        ],
      },
      {
        slug: "electrochemistry", number: 6, title: "Electrochemistry", examWeight: "15%",
        lessons: [
          { number: 1, title: "Oxidation and reduction" },
          { number: 2, title: "Galvanic cells" },
          { number: 3, title: "Electrolysis" },
        ],
      },
    ],
  },

  {
    id: "honors-physics",
    name: "Honors Physics",
    units: [
      {
        slug: "kinematics", number: 1, title: "Kinematics", examWeight: "20%",
        lessons: [
          { number: 1, title: "Motion — displacement, velocity, acceleration" },
          { number: 2, title: "1D kinematics equations" },
          { number: 3, title: "Projectile motion" },
        ],
      },
      {
        slug: "dynamics", number: 2, title: "Dynamics", examWeight: "20%",
        lessons: [
          { number: 1, title: "Newton's laws" },
          { number: 2, title: "Friction and normal force" },
          { number: 3, title: "Circular motion" },
        ],
      },
      {
        slug: "energy-and-momentum", number: 3, title: "Energy and Momentum", examWeight: "20%",
        lessons: [
          { number: 1, title: "Work and kinetic energy" },
          { number: 2, title: "Conservation of energy" },
          { number: 3, title: "Momentum and collisions" },
        ],
      },
      {
        slug: "waves-and-sound", number: 4, title: "Waves and Sound", examWeight: "20%",
        lessons: [
          { number: 1, title: "Wave properties" },
          { number: 2, title: "Sound and resonance" },
          { number: 3, title: "Doppler effect" },
        ],
      },
      {
        slug: "electricity-and-magnetism", number: 5, title: "Electricity and Magnetism", examWeight: "20%",
        lessons: [
          { number: 1, title: "Electric charge and field" },
          { number: 2, title: "Circuits — series and parallel" },
          { number: 3, title: "Magnetic force and induction" },
        ],
      },
    ],
  },

  {
    id: "honors-precalculus",
    name: "Honors Precalculus",
    units: [
      {
        slug: "functions-and-graphs", number: 1, title: "Functions and Graphs", examWeight: "20%",
        lessons: [
          { number: 1, title: "Function notation and domain/range" },
          { number: 2, title: "Transformations" },
          { number: 3, title: "Inverse functions" },
        ],
      },
      {
        slug: "polynomial-and-rational-functions", number: 2, title: "Polynomial and Rational Functions", examWeight: "20%",
        lessons: [
          { number: 1, title: "Polynomial functions and zeros" },
          { number: 2, title: "Rational functions and asymptotes" },
          { number: 3, title: "Polynomial division" },
        ],
      },
      {
        slug: "exponential-and-logarithmic-functions", number: 3, title: "Exponential and Logarithmic Functions", examWeight: "20%",
        lessons: [
          { number: 1, title: "Exponential growth and decay" },
          { number: 2, title: "Logarithms and properties" },
          { number: 3, title: "Solving equations" },
        ],
      },
      {
        slug: "trigonometry", number: 4, title: "Trigonometry", examWeight: "25%",
        lessons: [
          { number: 1, title: "Unit circle and radian measure" },
          { number: 2, title: "Trig functions and graphs" },
          { number: 3, title: "Trig identities and equations" },
        ],
      },
      {
        slug: "sequences-and-series", number: 5, title: "Sequences and Series", examWeight: "15%",
        lessons: [
          { number: 1, title: "Arithmetic sequences" },
          { number: 2, title: "Geometric sequences" },
          { number: 3, title: "Introduction to limits" },
        ],
      },
    ],
  },

  {
    id: "honors-english",
    name: "Honors English",
    units: [
      {
        slug: "rhetoric-and-argumentation", number: 1, title: "Rhetoric and Argumentation", examWeight: "25%",
        lessons: [
          { number: 1, title: "Rhetorical appeals — ethos, pathos, logos" },
          { number: 2, title: "Argument structure and claims" },
          { number: 3, title: "Counterargument and rebuttal" },
        ],
      },
      {
        slug: "literary-analysis", number: 2, title: "Literary Analysis", examWeight: "25%",
        lessons: [
          { number: 1, title: "Fiction — character, plot, theme" },
          { number: 2, title: "Poetry — form, tone, imagery" },
          { number: 3, title: "Drama and nonfiction" },
        ],
      },
      {
        slug: "research-and-writing", number: 3, title: "Research and Writing", examWeight: "25%",
        lessons: [
          { number: 1, title: "Thesis development" },
          { number: 2, title: "Evidence integration and citation" },
          { number: 3, title: "Essay revision and style" },
        ],
      },
      {
        slug: "language-and-style", number: 4, title: "Language and Style", examWeight: "25%",
        lessons: [
          { number: 1, title: "Diction and syntax" },
          { number: 2, title: "Figurative language" },
          { number: 3, title: "Voice and tone" },
        ],
      },
    ],
  },

  {
    id: "honors-algebra",
    name: "Honors Algebra",
    units: [
      {
        slug: "linear-functions", number: 1, title: "Linear Functions", examWeight: "20%",
        lessons: [
          { number: 1, title: "Slope and linear equations" },
          { number: 2, title: "Systems of equations" },
          { number: 3, title: "Inequalities" },
        ],
      },
      {
        slug: "quadratic-functions", number: 2, title: "Quadratic Functions", examWeight: "20%",
        lessons: [
          { number: 1, title: "Factoring and quadratic formula" },
          { number: 2, title: "Completing the square" },
          { number: 3, title: "Complex numbers" },
        ],
      },
      {
        slug: "polynomial-and-rational-expressions", number: 3, title: "Polynomial and Rational Expressions", examWeight: "20%",
        lessons: [
          { number: 1, title: "Polynomial operations" },
          { number: 2, title: "Rational expressions" },
          { number: 3, title: "Radical expressions" },
        ],
      },
      {
        slug: "exponential-and-logarithmic-functions", number: 4, title: "Exponential and Logarithmic Functions", examWeight: "20%",
        lessons: [
          { number: 1, title: "Exponential functions" },
          { number: 2, title: "Logarithms" },
          { number: 3, title: "Applications — growth and decay" },
        ],
      },
      {
        slug: "statistics-and-probability", number: 5, title: "Statistics and Probability", examWeight: "20%",
        lessons: [
          { number: 1, title: "Descriptive statistics" },
          { number: 2, title: "Probability rules" },
          { number: 3, title: "Normal distribution" },
        ],
      },
    ],
  },

  {
    id: "honors-us-history",
    name: "Honors US History",
    units: [
      {
        slug: "colonial-america-to-revolution", number: 1, title: "Colonial America to Revolution", examWeight: "20%",
        lessons: [
          { number: 1, title: "Colonial societies" },
          { number: 2, title: "Road to independence" },
          { number: 3, title: "Revolutionary War and founding documents" },
        ],
      },
      {
        slug: "early-republic-to-civil-war", number: 2, title: "Early Republic to Civil War", examWeight: "20%",
        lessons: [
          { number: 1, title: "Constitution and early government" },
          { number: 2, title: "Expansion and Manifest Destiny" },
          { number: 3, title: "Causes and consequences of Civil War" },
        ],
      },
      {
        slug: "reconstruction-to-progressive-era", number: 3, title: "Reconstruction to Progressive Era", examWeight: "20%",
        lessons: [
          { number: 1, title: "Reconstruction" },
          { number: 2, title: "Industrialization and immigration" },
          { number: 3, title: "Progressive reforms" },
        ],
      },
      {
        slug: "20th-century-america", number: 4, title: "20th Century America", examWeight: "20%",
        lessons: [
          { number: 1, title: "WWI and interwar period" },
          { number: 2, title: "WWII and Cold War" },
          { number: 3, title: "Civil Rights Movement" },
        ],
      },
      {
        slug: "modern-america", number: 5, title: "Modern America", examWeight: "20%",
        lessons: [
          { number: 1, title: "Vietnam and social change" },
          { number: 2, title: "Reagan era and end of Cold War" },
          { number: 3, title: "Post-9/11 to present" },
        ],
      },
    ],
  },

  // ─── CORE ─────────────────────────────────────────────────────────────────

  {
    id: "core-integrated-science",
    name: "Integrated Science",
    units: [
      {
        slug: "scientific-method-and-tools", number: 1, title: "Scientific Method and Tools", examWeight: "25%",
        lessons: [
          { number: 1, title: "Scientific method and inquiry" },
          { number: 2, title: "Measurement and data" },
          { number: 3, title: "Lab safety and tools" },
        ],
      },
      {
        slug: "physical-science-basics", number: 2, title: "Physical Science Basics", examWeight: "25%",
        lessons: [
          { number: 1, title: "Matter and its properties" },
          { number: 2, title: "Energy — forms and transfer" },
          { number: 3, title: "Forces and motion" },
        ],
      },
      {
        slug: "life-science-basics", number: 3, title: "Life Science Basics", examWeight: "25%",
        lessons: [
          { number: 1, title: "Cell structure and function" },
          { number: 2, title: "Photosynthesis and respiration" },
          { number: 3, title: "Ecosystems" },
        ],
      },
      {
        slug: "earth-science-basics", number: 4, title: "Earth Science Basics", examWeight: "25%",
        lessons: [
          { number: 1, title: "Earth's layers and plate tectonics" },
          { number: 2, title: "Weather and climate" },
          { number: 3, title: "Space — solar system and universe" },
        ],
      },
    ],
  },

  {
    id: "core-geometry",
    name: "Geometry",
    units: [
      {
        slug: "foundations", number: 1, title: "Foundations", examWeight: "15%",
        lessons: [
          { number: 1, title: "Points, lines, planes" },
          { number: 2, title: "Angles and angle relationships" },
          { number: 3, title: "Logic and proof" },
        ],
      },
      {
        slug: "triangles", number: 2, title: "Triangles", examWeight: "20%",
        lessons: [
          { number: 1, title: "Triangle congruence — SSS, SAS, ASA" },
          { number: 2, title: "Triangle similarity" },
          { number: 3, title: "Pythagorean theorem and special triangles" },
        ],
      },
      {
        slug: "quadrilaterals-and-polygons", number: 3, title: "Quadrilaterals and Polygons", examWeight: "15%",
        lessons: [
          { number: 1, title: "Parallelograms and properties" },
          { number: 2, title: "Other quadrilaterals" },
          { number: 3, title: "Area and perimeter" },
        ],
      },
      {
        slug: "circles", number: 4, title: "Circles", examWeight: "15%",
        lessons: [
          { number: 1, title: "Circle parts and arc length" },
          { number: 2, title: "Inscribed angles and theorems" },
          { number: 3, title: "Area and circumference" },
        ],
      },
      {
        slug: "coordinate-geometry", number: 5, title: "Coordinate Geometry", examWeight: "20%",
        lessons: [
          { number: 1, title: "Distance and midpoint" },
          { number: 2, title: "Slope and equations of lines" },
          { number: 3, title: "Transformations — translations, rotations, reflections" },
        ],
      },
      {
        slug: "3d-geometry", number: 6, title: "3D Geometry", examWeight: "15%",
        lessons: [
          { number: 1, title: "Surface area" },
          { number: 2, title: "Volume" },
          { number: 3, title: "Cross sections" },
        ],
      },
    ],
  },

  {
    id: "core-algebra",
    name: "Algebra",
    units: [
      {
        slug: "foundations-of-algebra", number: 1, title: "Foundations of Algebra", examWeight: "15%",
        lessons: [
          { number: 1, title: "Variables and expressions" },
          { number: 2, title: "Order of operations" },
          { number: 3, title: "Properties of real numbers" },
        ],
      },
      {
        slug: "linear-equations-and-inequalities", number: 2, title: "Linear Equations and Inequalities", examWeight: "25%",
        lessons: [
          { number: 1, title: "Solving one and two-step equations" },
          { number: 2, title: "Multi-step equations" },
          { number: 3, title: "Linear inequalities" },
        ],
      },
      {
        slug: "functions-and-graphs", number: 3, title: "Functions and Graphs", examWeight: "20%",
        lessons: [
          { number: 1, title: "Introduction to functions" },
          { number: 2, title: "Slope-intercept form" },
          { number: 3, title: "Systems of equations" },
        ],
      },
      {
        slug: "polynomials", number: 4, title: "Polynomials", examWeight: "20%",
        lessons: [
          { number: 1, title: "Adding and subtracting polynomials" },
          { number: 2, title: "Multiplying polynomials" },
          { number: 3, title: "Factoring basics" },
        ],
      },
      {
        slug: "quadratics", number: 5, title: "Quadratics", examWeight: "20%",
        lessons: [
          { number: 1, title: "Graphing quadratics" },
          { number: 2, title: "Solving by factoring" },
          { number: 3, title: "Quadratic formula" },
        ],
      },
    ],
  },

  {
    id: "core-english",
    name: "English",
    units: [
      {
        slug: "reading-comprehension", number: 1, title: "Reading Comprehension", examWeight: "25%",
        lessons: [
          { number: 1, title: "Main idea and supporting details" },
          { number: 2, title: "Inference and analysis" },
          { number: 3, title: "Vocabulary in context" },
        ],
      },
      {
        slug: "writing-fundamentals", number: 2, title: "Writing Fundamentals", examWeight: "25%",
        lessons: [
          { number: 1, title: "Paragraph structure" },
          { number: 2, title: "Essay organization" },
          { number: 3, title: "Grammar and mechanics" },
        ],
      },
      {
        slug: "literature", number: 3, title: "Literature", examWeight: "25%",
        lessons: [
          { number: 1, title: "Short story elements" },
          { number: 2, title: "Poetry basics" },
          { number: 3, title: "Drama and nonfiction" },
        ],
      },
      {
        slug: "argument-and-research", number: 4, title: "Argument and Research", examWeight: "25%",
        lessons: [
          { number: 1, title: "Claims and evidence" },
          { number: 2, title: "Evaluating sources" },
          { number: 3, title: "Research writing" },
        ],
      },
    ],
  },

  {
    id: "core-us-history",
    name: "US History",
    units: [
      {
        slug: "founding-america", number: 1, title: "Founding America", examWeight: "25%",
        lessons: [
          { number: 1, title: "Native Americans and early exploration" },
          { number: 2, title: "Colonial period" },
          { number: 3, title: "Revolution and Constitution" },
        ],
      },
      {
        slug: "building-a-nation", number: 2, title: "Building a Nation", examWeight: "25%",
        lessons: [
          { number: 1, title: "Early republic" },
          { number: 2, title: "Expansion and conflict" },
          { number: 3, title: "Civil War and Reconstruction" },
        ],
      },
      {
        slug: "industrial-america", number: 3, title: "Industrial America", examWeight: "25%",
        lessons: [
          { number: 1, title: "Industrialization" },
          { number: 2, title: "Immigration and urbanization" },
          { number: 3, title: "Progressive Era" },
        ],
      },
      {
        slug: "america-in-the-world", number: 4, title: "America in the World", examWeight: "25%",
        lessons: [
          { number: 1, title: "WWI and WWII" },
          { number: 2, title: "Cold War" },
          { number: 3, title: "Civil Rights and modern America" },
        ],
      },
    ],
  },

  {
    id: "core-chemistry",
    name: "Chemistry",
    units: [
      {
        slug: "matter-and-measurement", number: 1, title: "Matter and Measurement", examWeight: "25%",
        lessons: [
          { number: 1, title: "States of matter" },
          { number: 2, title: "Physical and chemical changes" },
          { number: 3, title: "Measurement and the mole" },
        ],
      },
      {
        slug: "atomic-structure", number: 2, title: "Atomic Structure", examWeight: "25%",
        lessons: [
          { number: 1, title: "Atomic models" },
          { number: 2, title: "Periodic table basics" },
          { number: 3, title: "Electron arrangement" },
        ],
      },
      {
        slug: "chemical-reactions", number: 3, title: "Chemical Reactions", examWeight: "25%",
        lessons: [
          { number: 1, title: "Types of reactions" },
          { number: 2, title: "Balancing equations" },
          { number: 3, title: "Reaction rates basics" },
        ],
      },
      {
        slug: "solutions-and-acids-bases", number: 4, title: "Solutions and Acids/Bases", examWeight: "25%",
        lessons: [
          { number: 1, title: "Solutions and solubility" },
          { number: 2, title: "Acids and bases basics" },
          { number: 3, title: "pH scale" },
        ],
      },
    ],
  },

  {
    id: "core-biology",
    name: "Biology",
    units: [
      {
        slug: "cell-biology", number: 1, title: "Cell Biology", examWeight: "25%",
        lessons: [
          { number: 1, title: "Cell theory and types" },
          { number: 2, title: "Cell organelles" },
          { number: 3, title: "Photosynthesis and respiration basics" },
        ],
      },
      {
        slug: "genetics", number: 2, title: "Genetics", examWeight: "25%",
        lessons: [
          { number: 1, title: "DNA basics" },
          { number: 2, title: "Heredity and traits" },
          { number: 3, title: "Mutations" },
        ],
      },
      {
        slug: "evolution-and-classification", number: 3, title: "Evolution and Classification", examWeight: "25%",
        lessons: [
          { number: 1, title: "Natural selection basics" },
          { number: 2, title: "Classification of life" },
          { number: 3, title: "Adaptations" },
        ],
      },
      {
        slug: "ecology", number: 4, title: "Ecology", examWeight: "25%",
        lessons: [
          { number: 1, title: "Food chains and webs" },
          { number: 2, title: "Ecosystems" },
          { number: 3, title: "Human impact on environment" },
        ],
      },
    ],
  },

  {
    id: "core-physics",
    name: "Physics",
    units: [
      {
        slug: "motion", number: 1, title: "Motion", examWeight: "25%",
        lessons: [
          { number: 1, title: "Speed, velocity, acceleration" },
          { number: 2, title: "Newton's laws basics" },
          { number: 3, title: "Gravity and free fall" },
        ],
      },
      {
        slug: "energy", number: 2, title: "Energy", examWeight: "25%",
        lessons: [
          { number: 1, title: "Kinetic and potential energy" },
          { number: 2, title: "Work and power" },
          { number: 3, title: "Conservation of energy" },
        ],
      },
      {
        slug: "waves-and-light", number: 3, title: "Waves and Light", examWeight: "25%",
        lessons: [
          { number: 1, title: "Wave properties" },
          { number: 2, title: "Sound waves" },
          { number: 3, title: "Light and optics basics" },
        ],
      },
      {
        slug: "electricity", number: 4, title: "Electricity", examWeight: "25%",
        lessons: [
          { number: 1, title: "Electric charge basics" },
          { number: 2, title: "Simple circuits" },
          { number: 3, title: "Magnetism basics" },
        ],
      },
    ],
  },
];

/** Look up course + unit context for the generate-script prompt */
export function getScriptContext(courseId: string, unitSlug: string): {
  courseName: string;
  unitName: string;
  examWeight: string;
  lessonList: string;
} | null {
  const course = AP_TOPIC_MAP.find((c) => c.id === courseId);
  if (!course) return null;

  // Try exact slug match first.
  let unit = course.units.find((u) => u.slug === unitSlug);
  // Then the lesson-id pattern: callers pass the full lessonId
  // (e.g. "ap-physics-c-mechanics-u3-l5"), so pull the unit number
  // out of "-u{N}-" and match on it. This is what actually resolves
  // the unit for per-lesson script generation.
  if (!unit) {
    const m = unitSlug.match(/-u(\d+)(?:-l\d+)?/i);
    if (m) {
      const n = parseInt(m[1], 10);
      unit = course.units.find((u) => u.number === n);
    }
  }
  // Finally, fuzzy title match.
  if (!unit) {
    const normalized = unitSlug.toLowerCase().replace(/-/g, " ");
    unit = course.units.find((u) => u.title.toLowerCase().includes(normalized) || normalized.includes(u.title.toLowerCase()));
  }
  if (!unit) return null;

  const lessonList = unit.lessons.map((l) => `  ${l.number}. ${l.title}`).join("\n");

  return {
    courseName: course.name,
    unitName: unit.title,
    examWeight: unit.examWeight,
    lessonList,
  };
}
