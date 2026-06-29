/**
 * Core Notes English version — Honors Chemistry Unit 1 (Atomic Structure).
 * Faithful English rendering of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
 * Source: lib/data/authored-corenotes/honors-chemistry.json, unit 1 (lessonNum 1-5).
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
    unitName: "Atomic Structure",
    title: "Why Atoms Are Mostly Empty Space (And What That Means)",
    subtitle: "Rutherford's gold-foil experiment, the nuclear atom, and why almost all of an atom's volume is empty",
    overview:
      "Before 1911 the atom was pictured as a uniform 'plum pudding' of positive charge studded with electrons. Rutherford fired alpha particles at thin gold foil and found that a tiny fraction bounced almost straight back — impossible unless the positive charge and nearly all the mass were concentrated in a minuscule, dense nucleus. The nucleus occupies about 1/100,000 of the atom's diameter, so the atom is overwhelmingly empty space in which electrons occupy the vast outer region. This single picture explains why matter is both mostly 'nothing' and yet feels solid: it is electron–electron repulsion, not physical contact, that makes solids resist.",
    objectives: [
      "Describe Rutherford's gold-foil experiment and its conclusion",
      "Compare the plum-pudding model with the nuclear model",
      "Explain why the atom is mostly empty space yet matter feels solid",
      "Relate nuclear size and density to the atom as a whole",
    ],
    formulas: [
      "Nucleus diameter ≈ 10⁻¹⁵ m; atom diameter ≈ 10⁻¹⁰ m (≈ 1:100,000)",
      "Nuclear density ≈ 10¹⁷ kg/m³ (essentially all the atom's mass)",
    ],
    sections: [
      {
        title: "The Gold-Foil Experiment and the Nuclear Atom",
        subtitle: "How one surprising result rewrote the model of the atom",
        body: "Rutherford expected alpha particles to pass straight through the foil if positive charge were spread evenly (the plum-pudding model). Instead, about 1 in 8,000 deflected by more than 90°. He reasoned that only a tiny, dense, positively charged core could repel a fast, massive alpha particle so violently. This core — the nucleus — holds the protons (and later, neutrons) and essentially all the atom's mass, while electrons occupy the enormous surrounding volume.",
        keyIdea: "Most alpha particles passed through → the atom is mostly empty; a few bounced back → a tiny dense nucleus exists.",
        terms: [
          { term: "Nucleus", def: "The tiny, dense, positively charged center of an atom containing protons and neutrons; holds ~99.9% of the mass." },
          { term: "Alpha particle", def: "A helium nucleus (2 protons + 2 neutrons), positively charged; used as the 'probe' in Rutherford's experiment." },
          { term: "Plum-pudding model", def: "Thomson's earlier model: a diffuse positive 'pudding' with embedded electrons — disproved by the deflections." },
          { term: "Nuclear model", def: "Rutherford's model: a dense central nucleus surrounded by mostly empty space where electrons move." },
        ],
        traps: [
          "Students say the deflections prove electrons are heavy — it is the dense NUCLEUS, not electrons, that causes back-scattering.",
          "'Empty space' does not mean 'nothing happens there' — electrons and their fields fill it.",
        ],
      },
      {
        title: "Why Solids Feel Solid",
        subtitle: "Repulsion, not contact",
        body: "If atoms are mostly empty, why can't your hand pass through a table? Because when electron clouds approach, they repel each other electrostatically, and the Pauli exclusion principle forbids them from overlapping. 'Touch' is really the force of electron–electron repulsion. This is why density depends on how tightly packed and how massive the nuclei are, not on filling space with solid matter.",
        keyIdea: "Solidity comes from electromagnetic repulsion between electron clouds, not from atoms physically touching.",
        terms: [
          { term: "Electrostatic repulsion", def: "The outward force between like charges; keeps electron clouds of different atoms from overlapping." },
          { term: "Density", def: "Mass per unit volume; for atoms it reflects nuclear mass and packing, not 'solid filling' of space." },
        ],
        traps: [
          "Don't claim atoms 'touch' — repulsion stops them before contact.",
        ],
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
    unitName: "Atomic Structure",
    title: "Why Electrons Exist in Energy Levels, Not Orbits",
    subtitle: "From Bohr's orbits to the quantum-mechanical model: orbitals as probability clouds, the four quantum numbers, and electron configuration",
    overview:
      "Bohr pictured electrons circling the nucleus on fixed orbits, which explained hydrogen's line spectrum but failed for every multi-electron atom. The quantum-mechanical model replaces orbits with orbitals — regions where an electron is most likely to be found (probability clouds). An electron's state is described by four quantum numbers (n, l, mₗ, mₛ), and electrons fill orbitals according to the Aufbau principle, Hund's rule, and the Pauli exclusion principle. The notorious trap is filling order: 4s fills before 3d (lower energy) even though 3d is written before 4s in the final configuration.",
    objectives: [
      "Contrast Bohr's model with the quantum-mechanical model",
      "Describe orbitals as probability clouds",
      "State the meaning of the four quantum numbers (n, l, mₗ, mₛ)",
      "Write electron configurations using Aufbau, Hund, and Pauli rules",
    ],
    formulas: [
      "Principal quantum number n = 1, 2, 3, … (energy-level size)",
      "Angular momentum l = 0 … n−1 (s=0, p=1, d=2, f=3)",
      "Max electrons per orbital = 2; per subshell = 2(2l+1)",
      "Filling order (diagonal rule): 1s 2s 2p 3s 3p 4s 3d 4p …",
    ],
    sections: [
      {
        title: "From Bohr Orbits to Probability Clouds",
        subtitle: "Why we can no longer say where an electron is",
        body: "Bohr's circular orbits explained hydrogen's spectrum but collapsed for atoms with more than one electron. Heisenberg's uncertainty principle states we cannot know an electron's exact position and momentum simultaneously, so we describe instead a region of high probability — an orbital. Each orbital has a characteristic shape (s = spherical, p = dumbbell, d = cloverleaf) and can hold at most two electrons.",
        keyIdea: "An orbital is not a path but a 'probability cloud' — where the electron is likely to be found.",
        terms: [
          { term: "Bohr model", def: "Electrons travel fixed circular orbits; works only for hydrogen-like (one-electron) species." },
          { term: "Orbital", def: "A region of space where an electron is most likely to be found; holds at most 2 electrons." },
          { term: "Uncertainty principle", def: "Heisenberg's rule that position and momentum cannot both be known exactly at once." },
          { term: "Probability cloud", def: "The visual representation of an orbital — denser where the electron is more likely." },
        ],
        traps: [
          "Orbitals are not 2-D paths; they are 3-D probability regions.",
          "Bohr's model is not 'wrong everywhere' — it still nails hydrogen's line spectrum.",
        ],
      },
      {
        title: "Quantum Numbers and Electron Configuration",
        subtitle: "Four addresses for every electron, and the order they fill",
        body: "Four quantum numbers locate an electron: n (level), l (subshell shape), mₗ (orientation), and mₛ (spin, ±½). Electrons fill from lowest energy up (Aufbau), occupy degenerate orbitals singly before pairing (Hund), and no two electrons share all four numbers (Pauli). The classic exam trap: 4s (lower energy) fills before 3d, so potassium is [Ar]4s¹, but once written, the 3d block is listed before 4s in numerical order.",
        keyIdea: "Fill by energy (4s before 3d), but write by level number (3d before 4s).",
        terms: [
          { term: "Aufbau principle", def: "Electrons occupy the lowest-energy available orbital first." },
          { term: "Hund's rule", def: "Within equal-energy orbitals, electrons spread out singly (parallel spins) before pairing." },
          { term: "Pauli exclusion principle", def: "No two electrons in an atom can have the same set of four quantum numbers." },
          { term: "Valence electrons", def: "The outermost-shell electrons that determine chemical behavior." },
        ],
        traps: [
          "Writing 3d before 4s when FILLING — energetically 4s fills first.",
          "Forgetting Hund's rule: don't pair electrons in p or d until each orbital has one.",
        ],
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
    unitName: "Atomic Structure",
    title: "How Electron Configuration Predicts Periodic Trends",
    subtitle: "Effective nuclear charge, shielding, and how configuration explains atomic radius, ionization energy, and electronegativity",
    overview:
      "The periodic table is organized so that elements in a column share the same valence configuration and therefore similar properties. Two competing effects — increasing nuclear charge (pull in) and electron shielding (push out) — set the effective nuclear charge (Z_eff) felt by valence electrons. Z_eff explains the major trends: across a period radius shrinks and ionization energy/electronegativity rise; down a group radius grows and ionization energy/electronegativity fall.",
    objectives: [
      "Define effective nuclear charge and shielding",
      "Explain periodic trends in atomic radius",
      "Explain trends in ionization energy and electronegativity",
      "Connect valence configuration to an element's group behavior",
    ],
    formulas: [
      "Z_eff ≈ Z (protons) − S (shielding electrons)",
      "Atomic radius: ↓ across a period, ↑ down a group",
      "Ionization energy & electronegativity: ↑ across a period, ↓ down a group",
    ],
    sections: [
      {
        title: "Effective Nuclear Charge and Shielding",
        subtitle: "The tug-of-war that sets every trend",
        body: "Valence electrons feel less than the full nuclear charge because inner (core) electrons shield them. The net pull is the effective nuclear charge, Z_eff ≈ (protons) − (core electrons). Across a period, protons increase but shielding stays roughly constant, so Z_eff rises and electrons are pulled tighter. Down a group, a new shell is added each time, so even though Z grows, the added distance and shielding dominate.",
        keyIdea: "Z_eff rises across a period (tighter atoms) and the added shells dominate down a group (looser atoms).",
        terms: [
          { term: "Effective nuclear charge (Z_eff)", def: "The net positive pull a valence electron actually experiences after shielding." },
          { term: "Shielding", def: "The reduction of nuclear pull on outer electrons caused by inner-shell electrons." },
          { term: "Atomic radius", def: "A measure of atom size; reflects how tightly Z_eff holds the outermost electrons." },
        ],
        traps: [
          "Z_eff is not just the number of protons — subtract the shielding core electrons.",
          "Down a group radius increases even though Z increases, because a whole new shell is added.",
        ],
      },
      {
        title: "Ionization Energy and Electronegativity",
        subtitle: "Why metals lose and nonmetals grab",
        body: "Ionization energy is the energy to remove an electron; electronegativity is the tendency to attract a bonding electron. Both track Z_eff: high Z_eff (top-right of the table, e.g. F, O) means electrons are held tightly, so ionization energy and electronegativity are high. Low Z_eff (bottom-left, e.g. Cs) means electrons are loosely held, so metals readily lose them. This is the configuration-level reason for metallic vs nonmetallic behavior.",
        keyIdea: "High Z_eff (top-right) → hard to remove, strong to attract; low Z_eff (bottom-left) → easy to lose.",
        terms: [
          { term: "Ionization energy", def: "Energy required to remove the most loosely held electron from a gaseous atom." },
          { term: "Electronegativity", def: "A relative measure of how strongly an atom attracts shared bonding electrons." },
        ],
        traps: [
          "Ionization energy generally rises across a period but dips at small steps (e.g. B<Be, O<N) due to subshell stability.",
          "Noble gases are not assigned electronegativity in the usual sense — they rarely bond.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u1-l4",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 4,
    unitName: "Atomic Structure",
    title: "What Isotopes and Atomic Mass Really Tell Us",
    subtitle: "Isotopes, mass number vs atomic number, and how weighted average gives the atomic mass on the periodic table",
    overview:
      "All atoms of an element share the same number of protons (atomic number, Z) but can differ in neutrons, giving isotopes with different mass numbers (A = protons + neutrons). The atomic mass printed on the periodic table is not a single isotope's mass but the weighted average of all naturally occurring isotopes, weighted by abundance. That is why chlorine's atomic mass is 35.45 — a blend of Cl-35 and Cl-37, not a 'fractional atom.'",
    objectives: [
      "Distinguish atomic number, mass number, and atomic mass",
      "Define isotopes and write isotope notation",
      "Calculate average atomic mass from isotopic abundances",
      "Explain why periodic-table masses are non-integers",
    ],
    formulas: [
      "Atomic number Z = number of protons (= electrons in a neutral atom)",
      "Mass number A = protons + neutrons",
      "Average atomic mass = Σ (isotope mass × fractional abundance)",
    ],
    sections: [
      {
        title: "Isotopes and Isotope Notation",
        subtitle: "Same element, different neutron count",
        body: "Changing neutron count does not change the element (protons fix identity) but changes the mass. Isotopes are written as A_Z X or as 'element-A' (e.g., carbon-14). Most elements exist as a natural mix of isotopes. Because chemical behavior is set by electrons (and thus protons), isotopes of an element react almost identically — the difference shows up in mass and in nuclear stability.",
        keyIdea: "Protons fix the element; neutrons change the isotope (mass), not the chemistry.",
        terms: [
          { term: "Atomic number (Z)", def: "Number of protons; defines which element the atom is." },
          { term: "Mass number (A)", def: "Total protons + neutrons in the nucleus; an integer for a specific isotope." },
          { term: "Isotopes", def: "Atoms of the same element with the same Z but different numbers of neutrons (different A)." },
          { term: "Isotope notation", def: "Way to label an isotope, e.g. ¹⁴C or carbon-14, showing the mass number." },
        ],
        traps: [
          "Different isotopes are still the SAME element — protons are unchanged.",
          "Mass number (A) is for one isotope and is an integer; atomic mass is an average and is usually a decimal.",
        ],
      },
      {
        title: "Average Atomic Mass",
        subtitle: "Why the periodic table shows decimals",
        body: "The atomic mass on the table is the abundance-weighted average of the isotopes. For chlorine (75.77% Cl-35 at 34.97 u and 24.23% Cl-37 at 36.97 u): average = 0.7577×34.97 + 0.2423×36.97 ≈ 35.45 u. The result lies closer to the more abundant isotope. No single chlorine atom weighs 35.45 — it is a statistical average over the natural mix.",
        keyIdea: "Atomic mass = Σ(isotope mass × fractional abundance); it sits nearer the most abundant isotope.",
        terms: [
          { term: "Average atomic mass", def: "The abundance-weighted mean mass of an element's natural isotopes (units: u or g/mol)." },
          { term: "Fractional abundance", def: "The proportion (as a decimal) of an isotope among all atoms of the element." },
        ],
        traps: [
          "Use FRACTIONAL abundance (decimal), not the percentage directly, in the weighted sum.",
          "The average is not the simple mean of the isotope masses — it is weighted by abundance.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u1-l5",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 1,
    lessonNum: 5,
    unitName: "Atomic Structure",
    title: "How Light and Matter Exchange Energy",
    subtitle: "Photons, quantized energy levels, and how emission and absorption spectra reveal electron transitions",
    overview:
      "Light carries energy in discrete packets called photons, with energy proportional to frequency (E = hf). Because an atom's electrons occupy quantized energy levels, an electron can only jump between levels by absorbing or emitting a photon whose energy exactly matches the gap. Absorbing a photon promotes an electron to a higher level; falling back releases a photon. The specific gaps in each element produce a unique line spectrum — an atomic 'fingerprint' used to identify elements in stars and labs.",
    objectives: [
      "Relate photon energy to frequency and wavelength",
      "Explain quantized energy levels and electron transitions",
      "Distinguish emission and absorption spectra",
      "Explain why each element has a unique line spectrum",
    ],
    formulas: [
      "E = h f  (photon energy; h = 6.626 × 10⁻³⁴ J·s)",
      "c = λ f  (c = 3.0 × 10⁸ m/s) → E = hc/λ",
      "ΔE_level = E_photon (energy of absorbed/emitted photon = level gap)",
    ],
    sections: [
      {
        title: "Photons and Quantized Energy",
        subtitle: "Light comes in packets, levels come in steps",
        body: "Energy is not absorbed or emitted continuously: light is quantized into photons of energy E = hf. Higher frequency (bluer) light means higher-energy photons; lower frequency (redder) means lower energy. Because the atom's electron energy levels are also quantized (discrete steps), only photons matching a level gap can be absorbed or emitted — a key break from classical physics.",
        keyIdea: "A photon is absorbed/emitted only if its energy exactly equals the gap between two electron levels.",
        terms: [
          { term: "Photon", def: "A quantum (packet) of light energy; E = hf." },
          { term: "Frequency (f)", def: "Cycles per second of a wave (Hz); higher f → higher photon energy." },
          { term: "Quantized energy levels", def: "The discrete (step-like) energies an electron may have in an atom." },
          { term: "Planck's constant (h)", def: "6.626 × 10⁻³⁴ J·s; links photon energy to frequency." },
        ],
        traps: [
          "Energy is proportional to frequency, but INVERSELY proportional to wavelength (E = hc/λ).",
          "Electrons cannot have energies between levels — transitions are all-or-nothing.",
        ],
      },
      {
        title: "Emission and Absorption Spectra",
        subtitle: "Each element's barcode of light",
        body: "When electrons drop to lower levels they emit photons, producing bright lines at specific wavelengths — an emission spectrum. When white light passes through a cool gas, electrons absorb exactly those same energies, leaving dark lines — an absorption spectrum. Because each element's level spacings are unique, its spectral lines are a fingerprint, letting chemists and astronomers identify elements remotely.",
        keyIdea: "Emission = bright lines from electrons falling; absorption = dark lines from electrons rising; both are element-specific.",
        terms: [
          { term: "Emission spectrum", def: "Bright lines emitted as excited electrons fall to lower energy levels." },
          { term: "Absorption spectrum", def: "Dark lines where electrons absorb specific photon energies from a continuous source." },
          { term: "Line spectrum", def: "A discrete set of wavelengths unique to an element — its spectral 'fingerprint'." },
        ],
        traps: [
          "Emission and absorption lines of an element occur at the SAME wavelengths (same level gaps).",
          "A line spectrum is discrete, not a continuous rainbow — that is the whole point of quantization.",
        ],
      },
    ],
  },
];
