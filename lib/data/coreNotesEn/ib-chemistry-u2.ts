/**
 * Core Notes English version — IB Chemistry Unit 2 (Atomic Structure).
 * Based on IB DP Chemistry SL/HL curriculum content.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u2-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 1,
    unitName: "Atomic Structure",
    title: "Nuclear Symbols, Isotopes & Mass Spectrometry — A Close-Up View of the Atom",
    subtitle: "Reading protons, neutrons, and electrons from nuclear symbols; how isotopes feed into relative atomic mass; and how the mass spectrometer makes it all visible",
    overview:
      "When you first learn about atoms, it seems like 'number of protons = atomic number' is all there is — but IB goes one step further. Atoms of the same element can have different masses: these are isotopes. Carbon-12 and carbon-14 are both carbon, but they differ in neutron count. The weighted average of the natural isotope abundances is exactly why the relative atomic mass (Ar) on the periodic table is almost never a whole number. The mass spectrometer is the instrument that lets us 'see' these isotope patterns directly. Once you understand the four stages — ionisation, acceleration, deflection, and detection — reading an m/z spectrum becomes straightforward.",
    objectives: [
      "Use nuclear symbol notation ᴬ꜀X to determine the number of protons, neutrons, and electrons in an atom or ion",
      "Define isotope and distinguish between different isotopes of the same element based on proton and neutron counts",
      "Calculate relative atomic mass (Ar) using a weighted average of isotopic masses and their natural abundances",
      "Describe the four stages of a mass spectrometer (ionisation, acceleration, deflection, detection) in the correct order",
      "Calculate Ar from a mass spectrum using the m/z values and relative peak heights of isotope peaks",
    ],
    formulas: [
      "A = Z + N  (mass number = protons + neutrons)",
      "Ar = Σ (isotopic mass × relative abundance) / 100",
    ],
    sections: [
      {
        title: "Nuclear Symbols and Subatomic Particles",
        subtitle: "ᴬ꜀X — one notation that acts as an atom's identity card",
        terms: [
          {
            term: "Atomic Number (Z)",
            def: "The number of protons in the nucleus. It is the absolute value that defines the chemical identity of an element — change the proton count and you have a different element. In a neutral atom the number of electrons equals Z.",
          },
          {
            term: "Mass Number (A)",
            def: "The sum of protons and neutrons in the nucleus: A = Z + N. The mass of an electron is negligible (about 1/1836 that of a proton), so electrons are not included in the mass number.",
          },
          {
            term: "Nuclear Symbol",
            def: "The notation ᴬ꜀X where A (mass number) appears as a superscript and Z (atomic number) as a subscript to the left of the element symbol X. Example: ¹²₆C has 6 protons, 6 neutrons, and (for a neutral atom) 6 electrons. For ions, adjust the electron count using the charge.",
          },
          {
            term: "Ion",
            def: "An atom (or molecule) that has gained or lost electrons and therefore carries a net charge. A cation has lost electrons, so protons > electrons; an anion has gained electrons, so electrons > protons. For ²³₁₁Na⁺: electrons = 11 − 1 = 10.",
          },
        ],
        traps: [
          "Electron counts for ions are a common source of errors. For ²⁷₁₃Al³⁺ the electron count is 13 − 3 = 10. Always apply the rule: 'subtract the charge from the proton number for cations; add it for anions.'",
          "When finding the neutron count, students often write only A or only Z instead of A − Z. Build the habit of reading a nuclear symbol aloud: 'top = mass number A, bottom = atomic number Z, neutrons = A − Z.'",
        ],
        example:
          "Find the proton, neutron, and electron counts for ²³⁵₉₂U³⁺. Z = 92, so protons = 92. A = 235, so neutrons = 235 − 92 = 143. Charge = +3, so electrons = 92 − 3 = 89. Three pieces of information read from a single nuclear symbol.",
      },
      {
        title: "Isotopes and Relative Atomic Mass",
        subtitle: "Same element, different masses — their average gives the periodic table's Ar",
        terms: [
          {
            term: "Isotope",
            def: "Atoms of the same element (identical atomic number Z) that differ in neutron count and therefore in mass number A. Isotopes have essentially identical chemical properties (same electron configuration) but differ in nuclear reactions and any mass-dependent property. Example: ¹H (protium), ²H (deuterium), ³H (tritium).",
          },
          {
            term: "Relative Atomic Mass (Ar)",
            def: "The weighted average mass of the atoms of an element relative to 1/12 the mass of a carbon-12 atom (= 1 u). It is a dimensionless number that reflects the natural isotope abundances. The reason most periodic table values are not whole numbers is precisely this weighted average.",
          },
          {
            term: "Relative Isotopic Mass",
            def: "The mass of a single isotope expressed on the carbon-12 scale. Unlike Ar it refers to one specific isotope; it is close to a whole number but not exactly. IB problems typically supply this as the 'exact mass.'",
          },
          {
            term: "Natural Abundance",
            def: "The percentage of all atoms of an element in nature that are a particular isotope. For chlorine: ³⁵Cl ≈ 75.77 %, ³⁷Cl ≈ 24.23 %, giving Ar = (35 × 75.77 + 37 × 24.23) / 100 ≈ 35.5.",
          },
        ],
        traps: [
          "Do not confuse Ar (relative atomic mass) with relative isotopic mass. Ar is the weighted average of all isotopes; relative isotopic mass is the value for a single isotope. When an IB question states 'Ar of chlorine = 35.5,' this is not the mass of ³⁵Cl alone.",
          "When abundances are given as percentages, you must divide by 100 before multiplying. Using 75.77 directly (not 0.7577) will make your calculated Ar thousands of times too large.",
        ],
        example:
          "Boron isotopes: ¹⁰B (abundance 19.9 %, relative mass 10.01) and ¹¹B (abundance 80.1 %, relative mass 11.01). Ar(B) = (10.01 × 19.9 + 11.01 × 80.1) / 100 = (199.2 + 881.9) / 100 = 1081.1 / 100 = 10.81. This is exactly why the periodic table shows B as 10.81.",
      },
      {
        title: "The Mass Spectrometer and Mass Spectrum",
        subtitle: "Ionisation → Acceleration → Deflection → Detection, then reading the spectrum",
        terms: [
          {
            term: "Mass Spectrometer",
            def: "An instrument that ionises a gaseous sample and separates the resulting ions according to their mass-to-charge ratio (m/z). Used to determine isotope patterns, calculate Ar, and analyse molecular structures. At IB level, singly charged ions (z = 1) are assumed, so m/z equals the mass number.",
          },
          {
            term: "Electron Bombardment Ionisation",
            def: "The ionisation stage of the mass spectrometer: a beam of high-energy electrons knocks one electron from each sample atom or molecule, producing a singly charged cation M⁺. The cations are then accelerated by an electric field.",
          },
          {
            term: "Mass-to-Charge Ratio (m/z)",
            def: "The quantity used to separate ions in the mass spectrometer. At IB level z = 1, so m/z equals the mass number A. The x-axis of a mass spectrum is m/z; the y-axis is relative abundance (%).",
          },
          {
            term: "Base Peak",
            def: "The tallest peak in a mass spectrum, normalised to a relative abundance of 100 %. For a monatomic element it corresponds to the most abundant isotope.",
          },
        ],
        traps: [
          "When calculating Ar from a mass spectrum, use the peak heights as relative abundances directly. A common mistake is keeping the ratio (e.g. 3 : 1) without converting to percentages. Use: Ar = Σ(m/z × relative abundance) / Σ(relative abundance).",
          "Describing the four stages of the mass spectrometer out of order costs marks on IB Paper 2. Memorise the fixed sequence: ionisation → acceleration → deflection → detection.",
        ],
        example:
          "Neon mass spectrum: m/z = 20 (relative abundance 90.5), m/z = 21 (0.3), m/z = 22 (9.2). Ar(Ne) = (20 × 90.5 + 21 × 0.3 + 22 × 9.2) / (90.5 + 0.3 + 9.2) = (1810 + 6.3 + 202.4) / 100.0 = 2018.7 / 100.0 = 20.19. This matches the periodic table value of Ne = 20.18.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u2-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 2,
    unitName: "Atomic Structure",
    title: "The Electromagnetic Spectrum, Hydrogen Emission Spectrum & the Bohr Model",
    subtitle: "Linking wavelength, frequency, and energy; using the hydrogen line spectrum to prove energy level quantisation",
    overview:
      "Have you ever wondered why atoms emit only specific colours of light? Neon signs glow red, hydrogen discharge tubes produce violet-cyan lines — the answer lies in quantised energy levels. When an electron drops from a higher energy level to a lower one, it releases exactly the energy difference as a photon of light. Because E = hf, fixing the energy also fixes the frequency and wavelength. Every element therefore produces its own unique line spectrum — often called the element's 'fingerprint.' Bohr applied this principle to hydrogen and calculated energy levels n = 1, 2, 3, … — a result that became the starting point for modern quantum theory.",
    objectives: [
      "Use E = hf and c = λf to calculate the wavelength, frequency, and energy of electromagnetic radiation",
      "Distinguish between a continuous spectrum and a line spectrum, and argue that a line spectrum is direct evidence for quantised energy levels",
      "Connect the visible-light lines of the hydrogen emission spectrum (Balmer series) and the UV lines (Lyman series) to specific energy-level transitions",
      "Describe the key assumptions and limitations of the Bohr model",
    ],
    formulas: [
      "E = hf",
      "c = λf",
      "h = 6.63 × 10⁻³⁴ J s  (Planck's constant)",
      "c = 3.00 × 10⁸ m s⁻¹  (speed of light)",
      "ΔE = E_high − E_low = hf",
    ],
    sections: [
      {
        title: "The Electromagnetic Spectrum and Photon Energy",
        subtitle: "E = hf — the higher the frequency, the greater the energy",
        terms: [
          {
            term: "Electromagnetic Spectrum",
            def: "The full range of electromagnetic radiation arranged in order of wavelength (λ) or frequency (f). Shorter wavelength means higher frequency and higher energy. In order of increasing wavelength: gamma rays < X-rays < ultraviolet (UV) < visible light < infrared (IR) < microwaves < radio waves.",
          },
          {
            term: "Wavelength (λ)",
            def: "The spatial distance occupied by one full cycle of an electromagnetic wave. Units: m (or nm; 1 nm = 10⁻⁹ m). Visible light spans approximately 400 nm (violet) to 700 nm (red).",
          },
          {
            term: "Frequency (f)",
            def: "The number of oscillations per unit time. Units: Hz (= s⁻¹). Inversely proportional to wavelength: from c = λf, a shorter λ means a larger f.",
          },
          {
            term: "Photon Energy (E)",
            def: "The energy carried by one quantum of electromagnetic radiation. E = hf = hc/λ, where Planck's constant h = 6.63 × 10⁻³⁴ J·s. Doubling the frequency doubles the energy.",
          },
        ],
        traps: [
          "Many students think wavelength and frequency are proportional. They are inversely proportional — c = λf with c constant means λ and f move in opposite directions. Always check the direction: shorter wavelength → higher frequency → higher energy.",
          "Unit-conversion errors: if λ is given in nm, convert to metres before using E = hc/λ. For example, 500 nm = 5.00 × 10⁻⁷ m. Inserting nm directly inflates the energy by a factor of 10⁹.",
        ],
        example:
          "Calculate the photon energy of the hydrogen Balmer cyan line (n = 4 → n = 2 transition) at λ = 486 nm. λ = 4.86 × 10⁻⁷ m. E = hc/λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (4.86 × 10⁻⁷) = 1.989 × 10⁻²⁵ / 4.86 × 10⁻⁷ = 4.09 × 10⁻¹⁹ J. This value corresponds exactly to the energy gap between n = 4 and n = 2.",
      },
      {
        title: "The Hydrogen Line Spectrum and Energy Levels",
        subtitle: "Discrete lines are direct evidence for quantised energy",
        terms: [
          {
            term: "Emission Spectrum",
            def: "The spectrum produced when excited atoms transition to lower energy levels, releasing photons at specific wavelengths. Appears as bright coloured lines on a dark background. Each line corresponds to a specific ΔE = E_high − E_low.",
          },
          {
            term: "Absorption Spectrum",
            def: "Produced when white light passes through a cool atomic gas; atoms absorb photons at the same specific wavelengths they would emit, leaving dark lines on a bright continuous background. The positions of absorption and emission lines for the same element are identical.",
          },
          {
            term: "Balmer Series",
            def: "Hydrogen transitions from n ≥ 3 down to n = 2. These fall in the visible region (400–700 nm): red (n = 3→2), cyan (n = 4→2), blue-violet (n = 5→2), and violet (n = 6→2). All four lines are visible to the naked eye.",
          },
          {
            term: "Lyman Series",
            def: "Hydrogen transitions from n ≥ 2 down to n = 1. The large energy gaps place these lines in the ultraviolet (UV) region. Frequently cited in IB SL/HL as evidence for quantised energy levels.",
          },
        ],
        traps: [
          "A common error is reversing the direction: students think larger n differences produce longer-wavelength (lower-energy) lines. In fact a larger Δn means a larger ΔE → higher frequency → shorter wavelength. The shortest-wavelength line in the Balmer series is the convergence limit (n = ∞ → 2).",
          "Emission and absorption spectra have lines at identical positions but opposite appearances. Swapping their descriptions in an IB answer loses marks. Remember: emission = bright lines on dark background; absorption = dark lines on bright background.",
        ],
        example:
          "Interpret the energy-level diagram for the first Balmer line (n = 3 → n = 2). E₃ = −1.51 eV, E₂ = −3.40 eV. ΔE = −1.51 − (−3.40) = 1.89 eV = 3.03 × 10⁻¹⁹ J. f = E/h = 3.03 × 10⁻¹⁹ / 6.63 × 10⁻³⁴ = 4.57 × 10¹⁴ Hz. λ = c/f = 3.00 × 10⁸ / 4.57 × 10¹⁴ = 656 nm (red). This matches the observed value.",
      },
      {
        title: "The Bohr Model — Achievements and Limitations",
        subtitle: "Works for hydrogen; breaks down for multi-electron atoms",
        terms: [
          {
            term: "Bohr Model",
            def: "An atomic model (Niels Bohr, 1913) in which electrons orbit the nucleus in fixed circular paths, each corresponding to a quantised energy level n = 1, 2, 3, … The model successfully predicted the line spectrum of hydrogen.",
          },
          {
            term: "Ground State",
            def: "The state in which an atom's electrons occupy the lowest possible energy level (n = 1). Absorbing energy promotes an electron to an excited state (n > 1); releasing that energy returns it to the ground state.",
          },
          {
            term: "Excited State",
            def: "A state in which one or more electrons occupy an energy level above the ground state (n ≥ 2). This is unstable; electrons typically return to a lower level within ~10⁻⁸ s, emitting a photon in the process.",
          },
        ],
        traps: [
          "The Bohr model is accurate only for hydrogen (and other one-electron species). For helium and heavier atoms, electron-electron repulsion makes Bohr's energy formula incorrect. If an IB essay asks for the limitations of the Bohr model, this point is essential.",
          "Some students write that an electron moves from a lower n to a higher n when emitting a photon — the opposite is true. Emission: higher energy level → lower energy level (higher n → lower n). Absorption is the reverse.",
        ],
        example:
          "Calculate the wavelength of the photon emitted when a hydrogen electron drops from n = 4 to n = 1 (Lyman series). IB Data Booklet values: E₁ = −13.6 eV, E₄ = −0.850 eV. ΔE = (−0.850) − (−13.6) = 12.75 eV = 12.75 × 1.60 × 10⁻¹⁹ = 2.04 × 10⁻¹⁸ J. λ = hc/E = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / 2.04 × 10⁻¹⁸ = 9.75 × 10⁻⁸ m = 97.5 nm (UV). This explains why the Lyman series is invisible to the naked eye.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u2-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 3,
    unitName: "Atomic Structure",
    title: "Electron Configuration — Energy Levels, Sublevels & Orbitals",
    subtitle: "Using the Aufbau principle, Hund's rule, and the Pauli exclusion principle to write electron configurations for every element in the periodic table",
    overview:
      "Where the Bohr model dealt only with n, the modern quantum model goes one level deeper by distinguishing sublevels and orbitals. Within each principal energy level n there are s, p, d, and f sublevels, each made up of orbitals of a characteristic shape. Three rules govern how electrons fill those orbitals: the Aufbau principle, Hund's rule, and the Pauli exclusion principle. Master all three and you can write the electron configuration of any element from hydrogen (Z = 1) to krypton (Z = 36) on the spot. Electron configuration is also the master key to predicting an element's chemical behaviour — ionisation energy, reactivity, and bonding.",
    objectives: [
      "Describe the hierarchy of principal shells (n), sublevels (s/p/d/f), and orbitals, and state the maximum number of electrons each sublevel can hold",
      "Apply the Aufbau principle, Hund's rule, and the Pauli exclusion principle to write electron configurations (e.g. 1s² 2s² 2p⁶ …) for elements with Z = 1–36",
      "Connect the s/p/d/f blocks of the periodic table to electron configurations, moving in both directions between position and configuration",
      "Explain the anomalous electron configurations of chromium (Cr) and copper (Cu)",
      "Derive the electron configuration of ions from the neutral atom, explaining why 4s electrons are removed before 3d electrons in transition-metal ions",
    ],
    formulas: [
      "Maximum electrons: s = 2, p = 6, d = 10, f = 14",
      "Maximum electrons in shell n = 2n²",
    ],
    sections: [
      {
        title: "The Hierarchy of Energy Levels, Sublevels, and Orbitals",
        subtitle: "n → l → m_l → spin — four addresses to locate every electron",
        terms: [
          {
            term: "Principal Energy Level (n)",
            def: "The quantum number that primarily determines an electron's energy. As n increases (1, 2, 3, 4, …) electrons are further from the nucleus and higher in energy. Shell n can hold a maximum of 2n² electrons.",
          },
          {
            term: "Sublevel (Subshell)",
            def: "A subdivision within a principal shell defined by the shape of the orbitals: s (spherical, 1 orbital), p (dumbbell, 3 orbitals), d (clover-leaf, 5 orbitals), f (complex, 7 orbitals). Maximum electrons: s = 2, p = 6, d = 10, f = 14.",
          },
          {
            term: "Atomic Orbital",
            def: "A region of three-dimensional space where there is a high probability of finding an electron. Each orbital holds at most 2 electrons with opposite spins. Orbitals are mathematically described by the square of the wave function |ψ|², which gives the electron probability density.",
          },
          {
            term: "Spin Quantum Number",
            def: "The intrinsic angular momentum of an electron, with only two allowed values: +½ (spin-up ↑) and −½ (spin-down ↓). The Pauli exclusion principle requires that the two electrons in the same orbital must have opposite spins.",
          },
        ],
        traps: [
          "4s fills before 3d (lower energy), but 4s is removed before 3d when forming transition-metal cations. Remember: '4s fills first, 4s leaves first.' For Fe²⁺: start from Fe = [Ar] 3d⁶ 4s², remove 4s² → [Ar] 3d⁶.",
          "When a p sublevel has three orbitals but only two electrons, placing both in the same orbital violates Hund's rule. Carbon's 2p² configuration is ↑ ↑ □, not ↑↓ □ □.",
        ],
        example:
          "Write the electron configuration of sulfur (S, Z = 16) and identify the number of valence electrons. Filling in Aufbau order: 1s² 2s² 2p⁶ 3s² 3p⁴. The three 3p orbitals with 4 electrons: ↑↓ ↑ ↑ (Hund's rule — one electron per orbital first, then pair). Valence electrons (3s² + 3p⁴) = 6. This explains why sulfur forms S²⁻ and makes 2, 4, or 6 bonds with oxygen.",
      },
      {
        title: "The Three Rules of Electron Configuration",
        subtitle: "Aufbau · Hund's Rule · Pauli — the three rules that build the periodic table",
        terms: [
          {
            term: "Aufbau Principle",
            def: "Electrons fill orbitals in order of increasing energy. Filling order: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → … The diagonal-rule diagram is a useful memory aid.",
          },
          {
            term: "Hund's Rule",
            def: "When filling orbitals of equal energy (e.g. the three 2p orbitals), electrons occupy each orbital singly with parallel spins before any pairing occurs. This minimises electron-electron repulsion and lowers the total energy.",
          },
          {
            term: "Pauli Exclusion Principle",
            def: "No two electrons in the same atom can have identical quantum numbers; equivalently, each orbital holds at most 2 electrons and they must have opposite spins (+½ and −½). This principle underlies the shell capacities 2, 8, 18, 32.",
          },
          {
            term: "Anomalous Electron Configuration",
            def: "Chromium (Cr, Z = 24) and copper (Cu, Z = 29) deviate from Aufbau predictions. Cr: [Ar] 3d⁵ 4s¹ (predicted: 3d⁴ 4s²); Cu: [Ar] 3d¹⁰ 4s¹ (predicted: 3d⁹ 4s²). Reason: a half-filled or fully filled d sublevel confers extra stability.",
          },
        ],
        traps: [
          "Do not memorise the Cr and Cu anomalies without understanding the reason. IB frequently asks why those configurations are more stable — the answer is the extra stability of a half-filled (3d⁵) or fully filled (3d¹⁰) d sublevel.",
          "The most common error with transition-metal ions is removing 3d electrons before 4s. Fe (Z = 26) = [Ar] 3d⁶ 4s². Fe²⁺ = [Ar] 3d⁶ (remove 4s² first). Fe³⁺ = [Ar] 3d⁵ (then remove one 3d electron).",
        ],
        example:
          "Write the electron configuration of copper (Cu, Z = 29) and derive the configuration of Cu²⁺. Cu: [Ar] 3d¹⁰ 4s¹ (not [Ar] 3d⁹ 4s² — the fully filled 3d¹⁰ is more stable). Cu²⁺: remove 2 electrons from the neutral atom → remove 4s¹ (1 electron) and then one 3d electron → [Ar] 3d⁹. Check: protons = 29, electrons = 27 (= 29 − 2), configuration [Ar(18)] + 3d⁹ = 18 + 9 = 27 ✓.",
      },
      {
        title: "Electron Configuration and Periodic Table Blocks",
        subtitle: "The s/p/d/f blocks are a map of electron configurations",
        terms: [
          {
            term: "s-block",
            def: "Groups 1 (H, Li, Na, …) and 2 (Be, Mg, Ca, …) of the periodic table, where the outermost electrons occupy an s sublevel. The number of valence electrons equals the group number (1 or 2). Includes the highly reactive alkali and alkaline-earth metals, plus hydrogen.",
          },
          {
            term: "p-block",
            def: "Groups 13–18, where the outermost electrons fill a p sublevel. Contains non-metals, metalloids, and some metals. Group 18 (noble gases) have a complete valence shell: ns² np⁶ (or 1s² for He).",
          },
          {
            term: "d-block (Transition Metals)",
            def: "Groups 3–12, where the (n−1)d sublevel is being filled. Transition metals show variable oxidation states, form coloured ions, and are often good catalysts — all properties rooted in their electron configurations.",
          },
          {
            term: "Group and Valence Electrons",
            def: "For s- and p-block elements the number of valence electrons equals the last digit of the group number (group 1 = 1, group 2 = 2, group 13 = 3, …, group 18 = 8). Elements in the same group have the same number of valence electrons and therefore similar chemical properties.",
          },
        ],
        traps: [
          "In period 4 it is tempting to assume all period-4 electrons are in n = 4 shells. For transition metals (e.g. Fe = [Ar] 3d⁶ 4s²), the 3d sublevel also fills in period 4, even though it is an n = 3 shell. To determine the group, consult the periodic table rather than just counting s electrons.",
          "When writing electron configurations in noble-gas core notation, choose the immediately preceding noble gas — not any other. Na (Z = 11) is [Ne] 3s¹; writing [Na] or [Ar] is wrong. Always verify which noble gas comes just before the element in atomic number.",
        ],
        example:
          "Write the electron configuration of vanadium (V, Z = 23) and link it to its periodic table position. [Ar] 3d³ 4s². Period 4 (begins filling n = 4 shell), d-block, group 5 (3d³ + 4s² = 5 valence electrons). Vanadium can reach a maximum oxidation state of +5 by losing all three 3d and both 4s electrons — a direct consequence of this configuration and the reason d-block elements show multiple oxidation states.",
      },
    ],
  },
];
