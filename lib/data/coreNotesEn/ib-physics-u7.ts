/**
 * Core Notes English version — IB Physics (DP) Unit 7 (Atomic, Nuclear & Particle Physics).
 * Covers atomic structure and energy levels, emission/absorption spectra, nuclear physics
 * (isotopes, radioactive decay α/β/γ, half-life, binding energy, E = Δmc²), fission and fusion,
 * and the Standard Model (quarks, leptons, exchange particles, conservation laws) per the IB DP Physics curriculum.
 * All objectives, terms, traps, formulas, and examples preserved at full depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U7_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u7-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 7,
    lessonNum: 1,
    unitName: "Atomic, Nuclear & Particle Physics",
    title: "Atomic Structure & Energy Levels — Reading the Atom Through Light",
    subtitle:
      "Fully understand the development of atomic models (including the Bohr model), energy levels and electron transitions, and the principles of emission/absorption spectra at the IB DP level",
    overview:
      "The atom is invisible, but the light an atom emits (its spectrum) is visible. The reason an atom emits or absorbs only specific wavelengths is that electrons can only occupy discrete energy levels. The Bohr model successfully predicted the energy levels of the hydrogen atom — an electron emits a photon when it falls from a higher level to a lower level, and absorbs a photon when it rises from a lower level to a higher level. The energy of this photon is given by E = hf and equals the difference in energy between the two levels. An emission spectrum shows bright lines at specific wavelengths, while an absorption spectrum shows dark lines against a continuous-spectrum background. On both IB DP Paper 1 and Paper 2, interpreting energy-level diagrams and calculating photon energies and wavelengths are key question types.",
    objectives: [
      "Represent electron transitions with arrows on an energy-level diagram and calculate the energy of an emitted/absorbed photon, E = E_upper − E_lower = hf",
      "Explain the difference between an emission spectrum and an absorption spectrum, and describe how both serve as a unique 'fingerprint' of an element",
      "Use the photon energy E = hf = hc/λ to calculate a transition wavelength and classify it as ultraviolet, visible, or infrared",
      "Identify the ground state, excited states, and ionisation energy on an energy-level diagram",
      "Explain the limitation of the classical atomic model (the spiral-collapse prediction of the Rutherford model) and how the Bohr model overcame it",
    ],
    formulas: [
      "E = hf  (photon energy; h = 6.63 × 10⁻³⁴ J s, Planck constant)",
      "E = hc/λ  (relationship between wavelength λ and photon energy; c = 3.00 × 10⁸ m s⁻¹)",
      "ΔE = E_upper − E_lower = hf = hc/λ  (transition energy = photon energy)",
      "E_n = −13.6/n²  eV  (hydrogen atom energy levels; n = 1, 2, 3, ...)",
      "1 eV = 1.60 × 10⁻¹⁹ J  (energy unit conversion)",
    ],
    sections: [
      {
        title: "Energy Levels & Electron Transitions — The Atom's Quantised Staircase",
        subtitle:
          "Understand the meaning of discrete energy levels and the mechanism by which photons are emitted/absorbed during electron transitions, even without a vector diagram",
        terms: [
          {
            term: "Energy Levels and Quantisation",
            def: "Electrons in an atom cannot take continuous values of energy — only specific discrete values are allowed. This is the quantisation of energy. On an energy-level diagram, each horizontal line is one allowed energy level. The lowest energy level is the ground state (n = 1), and the levels above it are excited states (n = 2, 3, ...). For hydrogen, E_n = −13.6/n² eV. At n = 1, E₁ = −13.6 eV (ground state). Ionisation energy: the energy required to raise an electron to n = ∞ (E = 0) = 13.6 eV (hydrogen).",
          },
          {
            term: "Electron Transition and the Photon",
            def: "When an electron falls from a higher level (E_upper) to a lower level (E_lower), it emits a photon (emission). Conversely, for an electron to rise from a lower level to a higher level, it must absorb a photon of exactly the corresponding energy difference (absorption). Emitted/absorbed photon energy: ΔE = E_upper − E_lower = hf. If the photon energy does not match the difference between two levels exactly, no absorption occurs — this is why line spectra appear. On IB diagrams, an emission transition is drawn as a downward arrow (upper → lower) and an absorption transition as an upward arrow (lower → upper).",
          },
          {
            term: "Emission/Absorption Spectrum",
            def: "Emission spectrum: the spectrum produced by photons emitted as an excited gas cools. Bright lines at specific wavelengths appear against a black background. Absorption spectrum: when continuous-spectrum light passes through a gas, specific wavelengths are absorbed — dark lines appear against a continuous-spectrum background. The line positions (wavelengths) of the two spectra are identical, because they correspond to the same energy transitions. Each element has a unique energy-level structure and therefore a unique spectral pattern → it serves as a 'fingerprint' for identifying the element. In astronomy, the absorption spectrum of starlight reveals the elements that make up a star.",
          },
          {
            term: "The Bohr Model and the Limitations of the Classical Model",
            def: "Rutherford model: an electron orbits the nucleus, but according to classical electromagnetism an orbiting charge should radiate energy and spiral into the nucleus — yet real atoms are stable, a contradiction. Bohr's resolution: the electron orbits stably only in specific allowed (quantised) orbits, and emits/absorbs a photon only when it transitions between those orbits. The Bohr model accurately predicts hydrogen's energy levels but has limitations for multi-electron atoms. In IB DP, the Bohr model is used as a tool for energy-level calculations.",
          },
        ],
        traps: [
          "Confusing the fact that energy values on an energy-level diagram are negative leads to errors. For hydrogen, the ground state is E₁ = −13.6 eV and the ionised state is E = 0 eV. By the principle that 'lower energy is more stable,' E₁ is the most stable state. The transition energy ΔE = E_upper − E_lower is always positive (+), and this value is the energy of the emitted/absorbed photon. Writing it incorrectly as E_lower − E_upper (negative) causes errors in the wavelength calculation.",
          "When an electron transitions between energy levels, the photon energy must match the level difference 'exactly.' The idea that 'it is absorbed if it is roughly close' is wrong — the heart of quantisation is precisely this discreteness. On IB Paper 1, in questions asking 'which transition does this photon correspond to?', you must select the one transition energy among several possibilities that matches the photon energy exactly.",
        ],
        example:
          "Calculating an emitted photon wavelength: find the wavelength of the photon emitted in a hydrogen atom during an n = 3 → n = 1 transition. E₃ = −13.6/9 = −1.51 eV, E₁ = −13.6 eV. ΔE = E₃ − E₁ = −1.51 − (−13.6) = 12.09 eV = 12.09 × 1.60 × 10⁻¹⁹ = 1.934 × 10⁻¹⁸ J. λ = hc/ΔE = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (1.934 × 10⁻¹⁸) = 1.989 × 10⁻²⁵ / 1.934 × 10⁻¹⁸ ≈ 1.03 × 10⁻⁷ m = 103 nm. This wavelength is in the ultraviolet region — it belongs to the Lyman series. IB marking points: converting the energy unit from eV → J when computing ΔE, and applying the formula λ = hc/ΔE, are both marking points.",
      },
      {
        title: "Spectral Interpretation & IB Applications — Reading Elements in the Language of Light",
        subtitle:
          "Connect the line patterns of emission/absorption spectra to energy-level diagrams, and master the spectrum and ionisation-energy calculations frequently set on IB Paper 2",
        terms: [
          {
            term: "Hydrogen Spectral Series",
            def: "The series of hydrogen are named according to the lower level the transitions reach. Lyman series (n → 1): ultraviolet (UV) region. Balmer series (n → 2): visible region — the most frequently encountered in IB. Paschen series (n → 3): infrared (IR) region. In IB DP, you must judge from the starting point and the arrival level of an arrow on an energy-level diagram which series (and which wavelength region) it belongs to. The larger the energy difference, the higher the photon frequency and the shorter the wavelength.",
          },
          {
            term: "Ionisation Energy and the Energy-Level Diagram",
            def: "Ionisation energy: the minimum energy required to ionise an atom — that is, the energy needed to raise an electron from the ground state (n = 1) to n = ∞ (E = 0). Hydrogen: ionisation energy = 0 − (−13.6) = 13.6 eV. On an energy-level diagram, the ionisation energy is the 'distance from the lowest level to the E = 0 line.' If an electron absorbs a photon of energy greater than the ionisation energy, it becomes a free electron and separates completely from the atom — the excess energy is converted into the kinetic energy of the free electron.",
          },
        ],
        traps: [
          "In emission and absorption spectra, the 'positions (wavelengths)' of the lines are identical, but their appearance differs. An emission spectrum shows 'bright lines on a black background,' while an absorption spectrum shows 'dark lines (black lines) on a continuous-spectrum background.' IB frequently sets questions asking you to identify the spectrum type from two spectrum images. Be careful not to confuse the two spectra or to state incorrectly that 'the absorption spectrum has more lines.'",
          "In ionisation-energy calculations, be careful with the 'sign of the energy difference.' Since E₁ = −13.6 eV and the ionisation level is 0 eV, ionisation energy = 0 − (−13.6) = +13.6 eV (positive). Because you are 'raising the energy' to send the electron away, energy must be supplied (+). Writing in IB that '−13.6 eV of energy is required' is incorrect.",
        ],
        example:
          "Interpreting an absorption spectrum: an atom's energy levels (eV) are E₁ = −10.4, E₂ = −5.8, E₃ = −2.6, E₄ = 0. Transitions observable in the absorption spectrum (absorption from the ground state n = 1): n = 1→2: ΔE = −5.8 − (−10.4) = 4.6 eV, n = 1→3: ΔE = −2.6 − (−10.4) = 7.8 eV, n = 1→4: ΔE = 0 − (−10.4) = 10.4 eV (ionisation). λ(n = 1→2): hc/ΔE = (6.63 × 10⁻³⁴ × 3 × 10⁸)/(4.6 × 1.6 × 10⁻¹⁹) = 1.989 × 10⁻²⁵ / 7.36 × 10⁻¹⁹ ≈ 270 nm (UV). IB marking points: state that absorption transitions start from the ground state, and confirm for each transition that ΔE = E_upper − E_lower > 0.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u7-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 7,
    lessonNum: 2,
    unitName: "Atomic, Nuclear & Particle Physics",
    title: "Nuclear Physics — Radioactive Decay, Half-Life, and E = Δmc²",
    subtitle:
      "Fully master isotopes, radioactive decay (α/β/γ), decay equations, half-life, binding energy, the mass–energy equivalence principle (E = Δmc²), fission, and fusion at the IB DP level",
    overview:
      "The nucleus accounts for more than 99.9% of an atom's mass yet occupies only one hundred-thousandth of the atom's size. The reason protons can be held together inside it despite enormous electric repulsion is the strong nuclear force. But not all nuclei are stable — an unstable nucleus changes into a more stable one through radioactive decay, emitting alpha (α), beta (β), or gamma (γ) radiation. Because decay is a statistical process, it is impossible to predict exactly when a particular nucleus will decay, but the collective decay rate can be expressed by the half-life (T₁/₂). Einstein's E = mc² reveals the remarkable fact that a difference in mass is converted into energy in nuclear reactions, which is why fission and fusion release enormous amounts of energy. On IB DP Paper 2 extended-response questions, decay equations, half-life calculations, and binding-energy calculations are frequently set.",
    objectives: [
      "Use nuclear notation (^A_Z X) to complete α, β⁻, and β⁺ decay equations in accordance with the conservation of mass number (A) and atomic number (Z)",
      "Use the half-life relation N = N₀(1/2)^(t/T½) or N = N₀e^(−λt) to calculate the number of nuclei remaining, the activity, or the elapsed time",
      "Use the relationship between binding energy and mass defect (Δm), ΔE = Δmc², to calculate the binding energy of a nucleus, and interpret the binding-energy curve (binding energy per nucleon vs. mass number)",
      "Explain why nuclear fission and nuclear fusion release energy using the binding-energy curve, and calculate the energy released Q in a nuclear reaction from the mass defect",
      "Compare the properties of α, β, and γ radiation (charge, mass, penetrating power, ionising ability) and describe the appropriate shielding material for each",
    ],
    formulas: [
      "N = N₀(1/2)^(t/T½)  or  N = N₀ e^(−λt)  (radioactive decay law)",
      "λ = ln2/T½ = 0.693/T½  (relationship between decay constant λ and half-life T½)",
      "A = λN  (Activity; unit Bq = s⁻¹)",
      "Δm = (Z·m_p + (A−Z)·m_n) − m_nucleus  (mass defect)",
      "ΔE = Δmc²  (Einstein mass–energy equivalence; c = 3.00 × 10⁸ m s⁻¹)",
    ],
    sections: [
      {
        title: "Radioactive Decay & Half-Life — Nuclear Instability and Statistical Decay",
        subtitle:
          "Master completing α/β/γ decay equations, half-life calculations, and the concept of activity, aligned with IB question patterns",
        terms: [
          {
            term: "Nuclear Notation & Decay Equations",
            def: "Nuclear notation: ^A_Z X — A is the mass number (number of protons + number of neutrons), Z is the atomic number (number of protons). Isotopes: same Z, different A — different nuclei of the same element. Alpha decay: ^A_Z X → ^(A−4)_(Z−2) Y + ^4_2 He. The nucleus emits a helium-4 nucleus (α particle); A decreases by 4 and Z decreases by 2. β⁻ decay: ^A_Z X → ^A_(Z+1) Y + ^0_(−1) e + ν̄_e. A neutron → proton + electron + electron antineutrino. Z increases by 1, A unchanged. β⁺ decay: ^A_Z X → ^A_(Z−1) Y + ^0_(+1) e + ν_e. A proton → neutron + positron + electron neutrino. Z decreases by 1, A unchanged. γ decay: an excited nucleus releases energy as γ (a high-energy photon) — A and Z unchanged. In IB, the sum of mass numbers and the sum of atomic numbers must be equal on both sides of a decay equation.",
          },
          {
            term: "Half-life (T½) and the Radioactive Decay Law",
            def: "Radioactive decay is random and spontaneous — it is impossible to predict when a particular nucleus will decay. However, for a large number of nuclei, the half-life (T½) is statistically constant: every half-life, the number of nuclei remaining halves. N = N₀(1/2)^(t/T½) — in exponential form: N = N₀ e^(−λt). Decay constant (λ): the probability of decay per unit time. λ = ln2/T½ ≈ 0.693/T½. Activity (A = λN): the number of decays per unit time. Unit: becquerel (Bq = 1 decay/s). Activity also decreases exponentially: A = A₀(1/2)^(t/T½). Half-life is an intrinsic property of the nucleus, independent of external conditions such as temperature and pressure.",
          },
          {
            term: "Comparison of Radiation Types (α·β·γ)",
            def: "Alpha (α) radiation: mass number 4, charge +2e (He nucleus). Penetrating power: weakest (shielded by a single sheet of paper). Ionising ability: strongest. Biological hazard: very dangerous if ingested/internal. Beta (β⁻) radiation: an electron (e⁻), mass ≈ 0, charge −e. Penetrating power: moderate (a few mm of aluminium). Ionising ability: moderate. Gamma (γ) radiation: an electromagnetic wave (photon), mass 0, charge 0. Penetrating power: strongest (shielded by thick lead or concrete). Ionising ability: weakest. In IB, questions asking you to draw the deflection in magnetic/electric fields (α and β deflect in opposite directions, γ is not deflected) are also frequently set.",
          },
        ],
        traps: [
          "Omitting the antineutrino (ν̄_e) or neutrino (ν_e) in β decay equations is a common mistake. In IB, an antineutrino (ν̄_e) is emitted in β⁻ decay and a neutrino (ν_e) in β⁺ decay. Omitting it means conservation of energy, momentum, and lepton number does not hold, giving a wrong answer. On IB mark schemes, whether the neutrino is included is a marking point. The idea that 'the neutrino has no charge so it need not be written' is wrong.",
          "Confusing the relationship 't = number of half-lives × T½' in half-life calculations leads to errors. Example: if T½ = 5 hours and t = 20 hours, four half-lives have passed, so N = N₀ × (1/2)⁴ = N₀/16. In 'N = N₀ × (1/2)^(t/T½),' do not forget that the exponent is t/T½, not t. Also, the half-life is not the time at which the number of atoms reaches 0 — in theory a radioactive substance never reaches 0 (exponential decay).",
        ],
        example:
          "Half-life calculation: a radioactive nuclide with half-life T½ = 3.0 days starts with N₀ = 8.0 × 10¹² nuclei. Find the number of nuclei remaining and the activity (λ = 0.693/T½) after t = 9.0 days. ① Number of half-lives elapsed: t/T½ = 9.0/3.0 = 3. ② Nuclei remaining: N = N₀ × (1/2)³ = 8.0 × 10¹² / 8 = 1.0 × 10¹² nuclei. ③ Decay constant: λ = 0.693 / (3.0 × 24 × 3600 s) = 0.693 / (2.592 × 10⁵ s) ≈ 2.67 × 10⁻⁶ s⁻¹. ④ Activity: A = λN = 2.67 × 10⁻⁶ × 1.0 × 10¹² ≈ 2.67 × 10⁶ Bq. IB marking points: converting T½ to seconds (s) and applying the formula A = λN are both marking points.",
      },
      {
        title: "Binding Energy & Fission/Fusion — The Real Power of E = Δmc²",
        subtitle:
          "Calculate binding energy from the mass defect, and fully understand the energy-release principle of fission and fusion using the binding-energy-per-nucleon curve",
        terms: [
          {
            term: "Mass Defect & Binding Energy",
            def: "The mass of an actual nucleus is less than the sum of the masses of its constituent protons and neutrons. This difference is the mass defect (Δm): Δm = (Z·m_p + (A−Z)·m_n) − m_nucleus. By Einstein's E = mc², this mass difference becomes energy: binding energy (BE) = Δmc². The binding energy is 'the energy required to completely separate a nucleus into its constituents' — the larger it is, the more stable the nucleus. Binding energy per nucleon (BE/A): the indicator used to compare nuclear stability. Near iron (Fe-56) it reaches a maximum ≈ 8.8 MeV/nucleon → the most stable nucleus. Unit: 1 MeV = 10⁶ eV = 1.60 × 10⁻¹³ J.",
          },
          {
            term: "Fission, Fusion & the BE Curve",
            def: "Binding-energy curve (BE/A vs. A graph): horizontal axis mass number A, vertical axis binding energy per nucleon BE/A. It is maximum near iron (Fe-56) and decreases towards either side (light nuclei and heavy nuclei). Nuclear fusion: two light nuclei combine to form a heavier nucleus → BE/A increases → mass decreases → energy released (the Sun's energy source). Nuclear fission: a heavy nucleus (such as U-235) splits into intermediate-mass nuclei → BE/A increases → mass decreases → energy released (nuclear power stations). Q value (energy released): Q = Δmc² = (total mass of reactants − total mass of products) × c². If Q > 0 energy is released; if Q < 0 energy is absorbed (endothermic reaction).",
          },
        ],
        traps: [
          "In binding-energy calculations, some misunderstand that 'the larger the binding energy, the more unstable the nucleus.' Since binding energy is the energy required to break a nucleus apart, the larger the binding energy, the more stable the nucleus. The larger the binding energy per nucleon (BE/A), the higher the stability. Both fission and fusion proceed in the direction of increasing BE/A, and this difference is released as energy.",
          "In the nuclear-reaction energy Q = Δmc², the mass must be converted from atomic mass units (u) to J. 1 u = 931.5 MeV/c² (provided in the IB data booklet). Thus multiplying the mass defect Δm (in u) by 931.5 MeV gives the energy (MeV) directly: ΔE(MeV) = Δm(u) × 931.5. Finding Δm in kg and then multiplying by c² gives the same result. Mixing the two methods causes unit errors, so use one method consistently.",
        ],
        example:
          "Binding-energy calculation: find the binding energy of the helium-4 nucleus (^4_2 He). m_p = 1.00728 u, m_n = 1.00866 u, m(He-4) = 4.00151 u. ① Mass defect: Δm = (2 × 1.00728 + 2 × 1.00866) − 4.00151 = (2.01456 + 2.01732) − 4.00151 = 4.03188 − 4.00151 = 0.03037 u. ② Binding energy: BE = 0.03037 u × 931.5 MeV u⁻¹ = 28.29 MeV. ③ Binding energy per nucleon: BE/A = 28.29 / 4 ≈ 7.07 MeV/nucleon. IB marking points: each step of the mass-defect calculation (confirming the number of protons and neutrons, substituting each mass, computing Δm), the u → MeV conversion (×931.5), and the final BE/A calculation are all marked.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u7-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 7,
    lessonNum: 3,
    unitName: "Atomic, Nuclear & Particle Physics",
    title: "Particle Physics — The Standard Model, Quarks, and the LEGO of the Universe",
    subtitle:
      "Understand the fundamental particles of the Standard Model (quarks, leptons, gauge bosons), the fundamental forces and exchange particles, antiparticles, and the conservation laws (baryon number, lepton number, charge) at the IB DP level",
    overview:
      "What are the ultimate building blocks of matter? One of the greatest achievements of 20th-century physics is the Standard Model. Protons and neutrons are no longer fundamental particles — they are made of quarks. The electron is a fundamental particle, a lepton. The fundamental forces are transmitted by exchange particles (gauge bosons) — the electromagnetic force by the photon, the strong nuclear force by the gluon, and the weak nuclear force by the W/Z bosons. Every particle has an antiparticle, and when a particle meets its antiparticle, annihilation occurs. In nuclear and particle reactions, charge, baryon number, and lepton number are conserved. On IB DP Paper 1 and Paper 2, classifying fundamental particles, applying conservation laws, and identifying quark content are frequently set.",
    objectives: [
      "Classify quarks (up, down, strange, charm, bottom, top), leptons (electron, muon, tau, and their neutrinos), and gauge bosons (photon, W⁺, W⁻, Z⁰, gluon) in the Standard Model and explain their roles",
      "Write the quark content of the proton (uud) and the neutron (udd) and explain the criteria for classifying baryons, mesons, and leptons",
      "Explain the properties of antiparticles and write the reaction equations for pair production and annihilation",
      "Apply conservation of charge, conservation of baryon number, and conservation of lepton number to judge whether a given reaction is allowed",
      "Compare the four fundamental forces (gravitational, electromagnetic, strong nuclear, weak nuclear) in terms of relative strength, range, and exchange particle",
    ],
    formulas: [
      "Proton: uud  (quark content; charge = +1e)",
      "Neutron: udd  (quark content; charge = 0)",
      "up quark charge: +2/3 e,  down quark charge: −1/3 e",
      "Baryon number: 1 quark = +1/3, 1 antiquark = −1/3  (baryon B = number of quarks/3 − number of antiquarks/3)",
      "Annihilation: e⁻ + e⁺ → γ + γ  /  Pair production: γ → e⁻ + e⁺  (when energy is sufficient)",
    ],
    sections: [
      {
        title: "The Standard Model — Classifying Fundamental Particles and Forces",
        subtitle:
          "Fully organise the classification and properties of quarks, leptons, and gauge bosons, and the four fundamental forces and their exchange particles, aligned with IB question patterns",
        terms: [
          {
            term: "Quarks and Hadrons",
            def: "Quarks: six flavours — up (u), down (d), strange (s), charm (c), bottom (b), top (t). Charge: u, c, t = +2/3 e; d, s, b = −1/3 e. Quarks cannot exist on their own (colour confinement) and always combine to form hadrons. The two kinds of hadron: ① Baryons: combinations of 3 quarks (e.g. proton uud, neutron udd). Baryon number B = +1. ② Mesons: combinations of 1 quark + 1 antiquark (e.g. the pion π⁺ = ud̄). Baryon number B = 0. Antiquarks have the opposite sign of charge. In IB DP, you are mainly required to identify the quark content and confirm the charge of the proton, neutron, and pion.",
          },
          {
            term: "Leptons and Antiparticles",
            def: "Leptons: six — the electron (e⁻), muon (μ⁻), tau (τ⁻), and their respective neutrinos (ν_e, ν_μ, ν_τ). Lepton number (L): lepton = +1, antilepton = −1. Electron, muon, and tau lepton numbers are each separately conserved (L_e, L_μ, L_τ). Every particle has an antiparticle of the same mass and opposite charge. Example: the positron (e⁺) is the antiparticle of the electron. Annihilation: e⁻ + e⁺ → 2γ — mass is converted into photon energy. Pair production: γ → e⁻ + e⁺ — photon energy is converted into mass (when energy is sufficient). In IB, the annihilation photon energy is calculated as: E_γ = m_e c² = 0.511 MeV (each photon, for the annihilation of an e⁻·e⁺ at rest).",
          },
          {
            term: "Four Fundamental Forces & Exchange Particles",
            def: "Strong nuclear force: exchange particle — gluon. The force that binds quarks inside the nucleus. Range: ~10⁻¹⁵ m (nuclear size). The strongest force. Weak nuclear force: exchange particles — W⁺, W⁻, Z⁰ bosons. Responsible for β decay. Range: ~10⁻¹⁸ m. Electromagnetic force: exchange particle — photon. Acts between charged particles. Range: infinite. Gravitational force: exchange particle — graviton (unobserved). Acts between all particles with mass. Range: infinite. The weakest force. In IB, table-format questions linking each force to its exchange particle and what it acts on are frequently set.",
          },
        ],
        traps: [
          "Understanding baryon number only as 'the number of baryons' leads to errors in analysing β decay equations. Baryon number is defined as B = (number of quarks − number of antiquarks) / 3. Proton and neutron: B = +1. Antiproton and antineutron: B = −1. Photon, lepton, and meson: B = 0. In a nuclear reaction the sum of baryon numbers of reactants and products must be equal. Example: in β⁻ decay n → p + e⁻ + ν̄_e: baryon number 1 = 1 + 0 + 0 ✓, lepton number 0 = 0 + 1 + (−1) ✓.",
          "In pair production, a particle-antiparticle pair must always be created — a particle cannot be created alone. This is an essential condition for satisfying conservation of charge, lepton number, and baryon number all at once. In IB, a reaction equation that creates a particle alone without an antiparticle, such as 'γ → e⁻ only,' is always wrong. Also, for pair production to occur, the photon's energy must be greater than the sum of the rest energies of the two particles: E_γ ≥ 2m_e c² = 1.022 MeV.",
        ],
        example:
          "Judging whether a reaction is allowed using conservation laws: check whether the reaction p → e⁺ + ν_e is allowed. ① Conservation of charge: left side +1, right side +1 + 0 = +1 ✓. ② Conservation of baryon number: left side B = +1 (proton), right side B = 0 + 0 = 0 ✗ → baryon number is not conserved, so this reaction is not allowed. Indeed, a free proton does not decay (conservation of baryon number). β⁺ decay p → n + e⁺ + ν_e (inside a nucleus): ① Charge: +1 = 0 + 1 + 0 ✓. ② Baryon: 1 = 1 + 0 + 0 ✓. ③ Lepton number (electron): 0 = 0 + (−1) + 1 ✓. All conserved → allowed. IB marking points: you must check all three conservation laws (charge, baryon number, lepton number) and state each explicitly.",
      },
      {
        title: "Feynman Diagrams & IB Particle-Physics Applications",
        subtitle:
          "Represent fundamental interactions with Feynman diagrams, and master the quark-level mechanism of β decay and strategies for IB Paper 2 extended-response questions",
        terms: [
          {
            term: "Feynman Diagrams",
            def: "Feynman diagram: a tool for visually representing particle interactions. In IB DP they are used at a qualitative level of understanding. Basic rules: ① the time axis runs left → right (or bottom → top). ② solid lines: fermions (quarks, leptons). ③ wavy lines: photons (electromagnetic interaction). ④ squiggly lines: W/Z bosons (weak interaction). ⑤ coiled lines: gluons (strong interaction). Feynman diagram for β⁻ decay: a d quark inside the neutron → u quark + W⁻ boson; W⁻ → e⁻ + ν̄_e. Electron-positron annihilation: e⁻ + e⁺ → γ + γ (two photons emitted). In IB, questions asking you to draw simple β decay and electron-photon scattering diagrams are set.",
          },
          {
            term: "The Quark-Level Mechanism of β Decay",
            def: "β⁻ decay (quark level): in a neutron (udd), one d quark changes into a u quark while emitting a W⁻ boson. The W⁻ immediately decays into e⁻ + ν̄_e. Neutron (udd) → proton (uud) + e⁻ + ν̄_e. β⁺ decay (quark level): in a proton (uud), one u quark changes into a d quark while emitting a W⁺ boson. W⁺ → e⁺ + ν_e. Proton (uud) → neutron (udd) + e⁺ + ν_e. Electron capture (IB HL): proton + e⁻ → neutron + ν_e (W⁻ exchange). Because the weak nuclear force mediates β decay, the exchange particle is the W boson.",
          },
          {
            term: "Conservation Laws Summary",
            def: "In IB DP, every particle reaction must satisfy the following three conservation laws. ① Conservation of charge: total charge unchanged before and after the reaction. ② Conservation of baryon number: total baryon number unchanged before and after the reaction. ③ Conservation of lepton number: electron lepton number (L_e), muon lepton number (L_μ), and tau lepton number (L_τ) each conserved. Additional (sometimes mentioned in IB): conservation of energy-momentum, strangeness — which may not be conserved in the weak interaction. When judging whether a reaction is possible, if even one of the three conservation laws is violated, the reaction is forbidden.",
          },
        ],
        traps: [
          "Failing to distinguish the neutrino (ν) from the antineutrino (ν̄) leads to errors when checking lepton-number conservation. Electron neutrino (ν_e): L_e = +1. Electron antineutrino (ν̄_e): L_e = −1. In β⁻ decay, writing the antineutrino (ν̄_e) as a neutrino (ν_e) changes the lepton-number check: since the e⁻ has L_e = +1, an ν̄_e with L_e = −1 is needed to cancel it. Writing ν_e gives a total L_e = +2, violating conservation. Be sure to distinguish: ν̄_e for β⁻, ν_e for β⁺.",
          "In IB, the fact that 'quarks' are never observed in isolation appears in questions. The statement 'a free quark can be observed in a detector' is always false — owing to colour confinement, quarks are always trapped inside hadrons. Also, the gluon is the exchange particle of the strong nuclear force and has no electric charge, but unlike the photon it experiences the strong nuclear force itself (it carries colour charge).",
        ],
        example:
          "Annihilation photon-energy calculation: an electron (e⁻) and a positron (e⁺) at rest annihilate, emitting two photons. Find the energy and wavelength of each photon. m_e = 9.11 × 10⁻³¹ kg, c = 3.00 × 10⁸ m s⁻¹, h = 6.63 × 10⁻³⁴ J s. ① Energy of each photon (conservation of energy, the two photons having equal energy): E_γ = m_e c² = 9.11 × 10⁻³¹ × (3.00 × 10⁸)² = 8.20 × 10⁻¹⁴ J = 0.511 MeV. ② Wavelength: λ = hc/E_γ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (8.20 × 10⁻¹⁴) = 1.989 × 10⁻²⁵ / 8.20 × 10⁻¹⁴ ≈ 2.42 × 10⁻¹² m = 2.42 pm (X-ray/gamma-ray region). IB marking points: state that by conservation of momentum the two photons are emitted in opposite directions (each photon carries equal energy), and the J ↔ MeV energy-unit conversion is a marking point.",
      },
    ],
  },
];
