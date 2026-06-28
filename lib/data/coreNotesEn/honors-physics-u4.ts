/**
 * Core Notes ENGLISH version — Honors Physics Unit 4 (Thermal Physics, Waves & Sound).
 * Faithful English rendering of the Korean source (objectives · formulas · terms · traps · example).
 * Terms rendered as { term: "English term", def: "English definition" }.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PHYSICS_U4_EN: CoreNote[] = [
  {
    lessonId: "honors-physics-u4-l1",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 4,
    lessonNum: 1,
    unitName: "Thermal Physics, Waves & Sound",
    title: "Heat and Temperature — Turning 'Hot' into a Number",
    subtitle: "Q = mcΔT alone finishes the heat-energy calculation for everything from a pot to a glacier",
    overview:
      "We feel 'hot' and 'cold' every day, but physics turns those sensations into numbers. Temperature represents the average kinetic energy of particles, and heat (Q) is the energy that moves because of a temperature difference. The key formula is Q = mcΔT — the product of mass (m), specific heat (c), and temperature change (ΔT). Because c differs for each material, the same amount of heat raises temperature by different amounts, and that difference governs everything from the choice of pot material to climate regulation. A calorimeter uses this formula in reverse to measure an unknown specific heat. The first law of thermodynamics is the heat version of conservation of energy: heat added to a system is spent on increasing the internal energy and on the work done on the surroundings. And thermal expansion is the phenomenon of objects lengthening as temperature rises — expansion joints in bridges, bimetallic thermometers, and aluminum window frames all embody this principle.",
    objectives: [
      "Explain the difference between temperature and heat from the viewpoint of molecular motion and convert between kelvin (K) and Celsius (°C)",
      "Use the definition of specific heat c to compute heat with Q = mcΔT",
      "In a calorimetry experiment, apply the heat balance Q_lost = Q_gained to find an unknown specific heat or final temperature",
      "Use the linear expansion coefficient α to compute thermal expansion ΔL = αLΔT and apply it to real-life examples",
      "Explain the first law of thermodynamics ΔU = Q − W in connection with the energy flow occurring in a system",
    ],
    formulas: [
      "Q = mcΔT  (Heat Transfer)",
      "ΔT(K) = ΔT(°C),  T(K) = T(°C) + 273  (Temperature Conversion)",
      "Q_lost = Q_gained  (Calorimetry Balance)",
      "ΔL = αLΔT  (Linear Thermal Expansion)",
      "ΔU = Q − W  (First Law of Thermodynamics)",
    ],
    sections: [
      {
        title: "Heat and Specific Heat — Each Material's Different 'Temperature Sensitivity'",
        subtitle: "The larger c is, the smaller the temperature change for the same heat — the physical meaning of Q = mcΔT",
        terms: [
          {
            term: "Temperature, T",
            def: "A scalar quantity representing the average translational kinetic energy of the particles making up a material. Its SI unit is the kelvin (K), and 0 K = −273 °C is absolute zero. The temperature difference between two objects determines the direction heat flows.",
          },
          {
            term: "Heat, Q",
            def: "The energy transferred between two systems due to a temperature difference. Its unit is the joule (J). When Q is positive the system absorbs heat (endothermic); when negative it releases heat (exothermic). Heat is transferred by three methods: conduction, convection, and radiation.",
          },
          {
            term: "Specific Heat Capacity, c",
            def: "The heat required to raise the temperature of 1 kg of a material by 1 K (or 1 °C). Its unit is J/(kg·K). Water's specific heat is very large at 4,186 J/(kg·K), which stabilises climates near sea level. For the same heat, a metal with a small c heats up far faster than water with its large c.",
          },
          {
            term: "Calorimeter",
            def: "An insulated device that prevents heat exchange from leaking outward. When a hot object is placed in cold water, Q_lost (heat lost by the hot side) = Q_gained (heat gained by the cold side). This principle is used to measure an unknown material's specific heat c or to find the final temperature after mixing.",
          },
        ],
        traps: [
          "In Q = mcΔT, since ΔT = T_f − T_i, you must watch the sign. When an object loses heat, T_f < T_i and Q < 0. Writing the calorimetry problem as Q_lost + Q_gained = 0 manages the signs automatically. Remember too that when you write 'heat lost = heat gained', you must treat ΔT as an absolute value.",
          "The magnitude of a temperature change ΔT is identical in kelvin (K) and Celsius (°C) (a 1 K change = a 1 °C change). But when an absolute temperature (T_absolute) must go into a formula (e.g. the ideal-gas law PV = nRT), you must use kelvin. In Q = mcΔT either kelvin or Celsius works, but beware of mixing units when combining with other formulas.",
        ],
        example:
          "A 0.200 kg copper piece (c = 390 J/(kg·K)) is heated in 100 °C steam, then placed in an insulated calorimeter holding 0.500 kg of water (c = 4186 J/(kg·K), initial temperature 20.0 °C), reaching a final temperature T_f. Find T_f. Q_lost (copper) = Q_gained (water). m_Cu × c_Cu × (T_i,Cu − T_f) = m_w × c_w × (T_f − T_i,w). 0.200 × 390 × (100 − T_f) = 0.500 × 4186 × (T_f − 20.0). 78(100 − T_f) = 2093(T_f − 20.0). 7800 − 78T_f = 2093T_f − 41860. 49660 = 2171T_f → T_f ≈ 22.9 °C. The copper loses little heat because its c is about 10 times smaller than water's.",
      },
      {
        title: "Thermal Expansion and the First Law — Temperature Rises, Matter Expands, and Energy Is Redistributed",
        subtitle: "ΔL = αLΔT and ΔU = Q − W — the two fates of thermal energy",
        terms: [
          {
            term: "Thermal Expansion",
            def: "The phenomenon in which an object expands as temperature rises because molecular vibration amplitude grows. Linear: ΔL = αL₀ΔT (α = linear expansion coefficient, L₀ = initial length). Volumetric: ΔV = βV₀ΔT (β ≈ 3α). Bridge expansion joints, gaps between railroad rails, and bimetallic thermometers all use this principle.",
          },
          {
            term: "First Law of Thermodynamics",
            def: "The change in a system's internal energy, ΔU = Q − W. Q is the heat absorbed by the system, W is the work the system does on the surroundings. As the heat version of conservation of energy, when gas expands in a heat engine (gas piston) and does work, the internal energy (temperature) drops by that amount.",
          },
          {
            term: "Internal Energy, U",
            def: "The total of the kinetic energy plus potential energy of all the molecules making up a system. For an ideal gas, U ∝ T (depends only on temperature). ΔU > 0 means the system's energy increased (temperature rise, phase change, etc.); ΔU < 0 means it decreased.",
          },
        ],
        traps: [
          "In thermal expansion ΔL = αL₀ΔT, L₀ is the initial length before expansion. Mistakenly substituting the length after expansion (L_f = L₀ + ΔL) for L₀ gives the wrong answer. Also, α differs by material, so check the value given in the problem carefully (iron ≈ 12×10⁻⁶ /K, aluminum ≈ 23×10⁻⁶ /K).",
          "In the first law ΔU = Q − W, watch the sign convention for W. 'Work the system does on the surroundings' is positive. Some textbooks define W as 'work done on the system' and write ΔU = Q + W. Under either convention, the direction is the same: the system expands (does work on the surroundings) → internal energy decreases → temperature drops.",
        ],
        example:
          "A 100 m iron bridge (α = 12×10⁻⁶ /K) goes from winter (−20 °C) to summer (40 °C). Find the change in length ΔL. ΔT = 40 − (−20) = 60 K. ΔL = αL₀ΔT = 12×10⁻⁶ × 100 × 60 = 0.072 m = 7.2 cm. Real bridges install expansion joints to absorb this expansion. Stretching more than 7 cm, building without joints would buckle the rails every summer.",
      },
    ],
  },
  {
    lessonId: "honors-physics-u4-l2",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 4,
    lessonNum: 2,
    unitName: "Thermal Physics, Waves & Sound",
    title: "Properties of Waves — v = fλ Explains the Sea, Light, and Earthquakes Alike",
    subtitle: "Transverse, longitudinal, reflection, refraction, interference — the five faces of waves in one place",
    overview:
      "A wave carries energy, but the medium itself does not travel. Ocean waves do not transport water molecules across the Pacific; they merely pass a pattern of oscillation along the direction the energy advances. The language of waves is amplitude (A), wavelength (λ), frequency (f), and period (T), and the formula linking them is v = fλ. In a transverse wave the oscillation direction is perpendicular to the direction of travel (light, a guitar string); in a longitudinal wave the oscillation direction is parallel to the travel direction (sound, P-waves). When a wave meets the boundary of a medium, reflection, refraction, and interference occur, and these three phenomena lead to lenses, wireless communication, and noise-cancelling headphones. Interference is especially important: constructive interference adds two waves to make a larger amplitude, while destructive interference brings the amplitude close to zero.",
    objectives: [
      "Express the relationship among amplitude, wavelength, frequency, and period using v = fλ and T = 1/f, with correct units",
      "Distinguish transverse from longitudinal waves by the relationship between oscillation direction and travel direction, and give real examples",
      "Explain the law of reflection and the way wavelength and speed change during refraction",
      "Use the principle of superposition and judge the conditions for constructive/destructive interference from the wavelength (path) difference",
      "Explain why wave speed differs by medium in terms of elasticity and density",
    ],
    formulas: [
      "v = fλ  (Wave Speed)",
      "T = 1/f  (Period-Frequency)",
      "v_string = √(F_T / μ)  (Speed on a String)",
      "Path difference = nλ → constructive interference (n = 0, 1, 2, …)",
      "Path difference = (n + ½)λ → destructive interference",
    ],
    sections: [
      {
        title: "The Basic Language of Waves — Amplitude, Wavelength, Frequency, Period",
        subtitle: "v = fλ is the wave's 'speed = distance/time' rewritten with wavelength and frequency",
        terms: [
          {
            term: "Wavelength, λ",
            def: "The distance between two neighbouring points of the same phase in a wave. Its unit is m. It is the distance from one crest to the next, or one trough to the next. When the medium changes, v and λ change but f does not.",
          },
          {
            term: "Frequency, f & Period, T",
            def: "Frequency: the number of complete oscillations per unit time (1 s). Its unit is Hz = 1/s. Period: the time for one complete oscillation (s). T = 1/f. An A4 note at 440 Hz oscillates 440 times per second, with a period of about 2.27 ms.",
          },
          {
            term: "Transverse Wave vs. Longitudinal Wave",
            def: "Transverse: the medium's oscillation direction is perpendicular to the wave's travel direction. Examples: light (electromagnetic waves), guitar strings, surface water waves. Longitudinal: the medium's oscillation direction is parallel to the travel direction. Sound and seismic P-waves are typical. Longitudinal waves create alternating regions of compression and rarefaction.",
          },
          {
            term: "Superposition Principle",
            def: "When two or more waves exist at the same point simultaneously, the displacement at that point is the vector sum of each wave's displacement. After overlapping, the waves pass through each other and recover their original shapes. This principle is the mathematical basis of interference and standing waves.",
          },
        ],
        traps: [
          "In v = fλ, when the medium changes, the wave speed (v) and wavelength (λ) change together but the frequency (f) does not. The belief that 'when sound emerges from water into air it speeds up, so the frequency also rises' is a classic trap. f is set by the source that created the wave; the medium changes only the speed and wavelength.",
          "Amplitude relates to energy and is independent of speed (v), frequency (f), and wavelength (λ). A larger amplitude means more wave energy, but amplitude does not appear in the relation v = fλ. Beware of the misconception that 'a larger amplitude means a longer wavelength'.",
        ],
        example:
          "An AM radio station's carrier frequency is f = 810 kHz, and the wave propagates at the vacuum speed c = 3.00×10⁸ m/s. Find the wavelength λ. λ = v/f = (3.00×10⁸) / (810×10³) = 370 m. FM broadcasts (88–108 MHz) have a much shorter wavelength of about 2.8–3.4 m. The shorter the wavelength, the stronger the straight-line propagation and the weaker the ability to bend around obstacles (diffraction), which is why FM reception is poor in mountainous terrain.",
      },
      {
        title: "Reflection, Refraction, Interference — Three Transformations of Waves at a Boundary",
        subtitle: "Angle of reflection = angle of incidence; refraction changes v so λ changes; interference is decided by path difference",
        terms: [
          {
            term: "Reflection",
            def: "The phenomenon of a wave changing direction and returning at a boundary between media. Angle of incidence (θ_i) = angle of reflection (θ_r) relative to the normal. On reflection at a fixed boundary (denser medium) the phase inverts by 180°, while at a free boundary (less dense medium) the phase is preserved. This phase inversion is central to forming standing waves.",
          },
          {
            term: "Refraction",
            def: "The phenomenon of a wave bending its travel direction as its speed changes upon entering a different medium. Snell's law: n₁sinθ₁ = n₂sinθ₂ (for light). Entering a slower medium (n increases) it bends toward the normal; entering a faster medium it bends away from the normal.",
          },
          {
            term: "Constructive Interference",
            def: "Interference where two waves' crests meet crests and troughs meet troughs, giving maximum amplitude. It occurs when the path difference is an integer multiple of the wavelength (nλ, n = 0, 1, 2, …). In acoustic hall design, seats where constructive interference occurs hear the sound louder.",
          },
          {
            term: "Destructive Interference",
            def: "Interference where a crest meets a trough, giving minimum amplitude (ideally zero). It occurs when the path difference is an odd multiple of half a wavelength ((n + ½)λ). Noise-cancelling headphones generate the inverse phase of ambient noise sensed by a microphone and cancel it by destructive interference.",
          },
        ],
        traps: [
          "During refraction, f (frequency) does not change but v and λ do. When light exits glass into air, the speed increases so the wavelength lengthens. Many students confuse this and think 'frequency changes upon refraction'. Snell's law n₁sinθ₁ = n₂sinθ₂ also shows that v (and thus n), not f, determines the refraction.",
          "The condition for constructive/destructive interference is judged by the path difference divided by the wavelength. Do not confuse 'phase difference' with 'path difference'. A path difference of λ means a phase difference of 360° (2π rad) = constructive interference. A path difference of λ/2 means a phase difference of 180° (π rad) = destructive interference. Phase-difference formula: Δφ = (2π/λ) × path difference.",
        ],
        example:
          "Two speakers emit sound of the same frequency f = 680 Hz in phase (in air, v_sound = 340 m/s). A point is 2.50 m and 3.00 m from the two speakers respectively. Determine whether this point has constructive or destructive interference. λ = v/f = 340/680 = 0.500 m. Path difference = 3.00 − 2.50 = 0.50 m = 1.00λ. Since the path difference is an integer multiple of the wavelength (n = 1), it is constructive interference. The sound is louder at this point.",
      },
    ],
  },
  {
    lessonId: "honors-physics-u4-l3",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 4,
    lessonNum: 3,
    unitName: "Thermal Physics, Waves & Sound",
    title: "Sound and Standing Waves — The Physics Inside Instruments and the Doppler Effect",
    subtitle: "Resonance, harmonics, Doppler — every sound you hear is a product of the wave equation",
    overview:
      "Sound is the phenomenon of pressure oscillations of air molecules (a longitudinal wave) reaching the ear. Intensity relates to energy density, and the decibel (dB) scale reflects the logarithmic nature of human hearing. When a string or pipe resonates at a particular frequency, a standing wave forms — this is the principle by which pitch arises in guitars, violins, organs, and flutes. A standing wave has alternating nodes (zero amplitude) and antinodes (maximum amplitude), and this arrangement determines the fundamental and the harmonics. Finally, the Doppler effect is the phenomenon in which the observed frequency changes when the source or observer moves. It is exactly why an ambulance siren sounds higher as it approaches and lower as it recedes, and it is applied in weather radar and medical ultrasound.",
    objectives: [
      "Understand the definitions of sound intensity and the decibel (dB) scale and explain that a tenfold increase in intensity is a 10 dB increase",
      "Use the standing-wave conditions (boundary conditions) for strings and air columns (open/closed) to compute the wavelengths and frequencies of the fundamental and harmonics",
      "Explain the physical meaning of resonance and derive the frequency condition at which resonance occurs",
      "Use the Doppler effect formula f_obs = f_s × (v ± v_obs)/(v ∓ v_s) to compute the observed frequency for source/observer motion",
      "Use the beat frequency f_beat = |f₁ − f₂| to find the difference of two frequencies or apply it to tuning instruments",
    ],
    formulas: [
      "β = 10 log(I / I₀)  (Decibel Scale, I₀ = 10⁻¹² W/m²)",
      "String fixed at both ends (and pipe open at both ends): λ_n = 2L/n,  f_n = nv/(2L)  (n = 1, 2, 3, …)",
      "Pipe closed at one end: λ_n = 4L/n,  f_n = nv/(4L)  (n = 1, 3, 5, … odd only)",
      "f_obs = f_s × (v + v_obs)/(v − v_s)  (Doppler Effect — source and observer approaching)",
      "f_beat = |f₁ − f₂|  (Beat Frequency)",
    ],
    sections: [
      {
        title: "Standing Waves and Resonance — The Pitch Born in Strings and Pipes",
        subtitle: "The pattern of nodes and antinodes sets the wavelength, and the wavelength sets the pitch",
        terms: [
          {
            term: "Standing Wave",
            def: "A wave formed when two travelling waves of equal magnitude and opposite direction superpose, making the amplitude pattern appear fixed in space. At a node the displacement is always zero; at an antinode the amplitude is maximum. It forms only when the boundary conditions are satisfied between the length of the string or pipe and the wavelength.",
          },
          {
            term: "Fundamental & Harmonics",
            def: "The fundamental frequency (f₁) is the lowest frequency at which a standing wave forms, also called the 1st harmonic. The harmonics are integer multiples of the fundamental (string fixed at both ends: f_n = nf₁). A pipe closed at one end allows only odd harmonics, giving a different timbre. Because each instrument has a different harmonic make-up, the same pitch sounds different in timbre.",
          },
          {
            term: "Resonance",
            def: "The phenomenon in which the amplitude grows sharply when an external frequency matches the system's natural frequency. Pushing a swing at the same period to make it go ever higher, or a wine glass shattering at a specific note, are examples. Avoiding the resonant frequency is central to structural safety in buildings and bridges.",
          },
          {
            term: "Beat",
            def: "The phenomenon in which the combined amplitude periodically grows and shrinks when two waves of slightly different frequencies interfere. Beat frequency f_beat = |f₁ − f₂|. A piano tuner listens to the beats between a reference tone and the string and tightens the string until f_beat → 0.",
          },
        ],
        traps: [
          "The formula for a string fixed at both ends and a pipe open at both ends is identical (f_n = nv/2L), but the boundary conditions differ. A string's fixed end is a node; an open pipe's open end is an antinode. A pipe closed at one end has a node at the closed end and an antinode at the open end, so only odd harmonics are possible. If you memorise the formula without picturing 'why 2L or 4L', you will get confused on the exam.",
          "There is a trap in thinking 'a particle at a node has no energy' in a standing wave. The displacement at a node is zero, but it can be a point of maximum pressure or velocity. In a longitudinal wave (sound), a pressure node coincides with a displacement antinode. The energy is zero at a string's node, but at a pipe's pressure node the pressure amplitude is zero while the displacement amplitude is maximum.",
        ],
        example:
          "A guitar string has length L = 0.65 m and a wave speed on the string of v = 520 m/s. Find the fundamental frequency (f₁) and the second harmonic (f₂). String fixed at both ends: f_n = nv/(2L). f₁ = 1 × 520 / (2 × 0.65) = 520 / 1.30 = 400 Hz. f₂ = 2 × 400 = 800 Hz. On a real guitar, pressing a fret shortens the vibrating length L, raising f₁ at the same v to produce a higher pitch. When you fret a chord, your fingers are adjusting exactly this L.",
      },
      {
        title: "The Doppler Effect — Relative Motion of Source and Observer Changes the Pitch",
        subtitle: "Approaching raises the frequency, receding lowers it — the ± signs in the formula are everything",
        terms: [
          {
            term: "Doppler Effect",
            def: "The phenomenon in which, when the source or observer moves, the observed frequency f_obs differs from the source frequency f_s. If the source approaches the observer, f_obs > f_s (higher pitch); if it recedes, f_obs < f_s (lower pitch). Formula: f_obs = f_s(v + v_obs)/(v − v_s) (observer approaching; signs as the source approaches).",
          },
          {
            term: "Intensity, I & Decibel, dB",
            def: "Sound intensity I: the power transmitted per unit area (W/m²). For a point source, I ∝ 1/r² (inversely proportional to the square of distance). Decibel β = 10 log(I/I₀), reference intensity I₀ = 10⁻¹² W/m². A 10 dB increase = a tenfold intensity. The human hearing range is 0–130 dB (threshold of pain).",
          },
          {
            term: "Shock Wave",
            def: "The phenomenon in which, when a source moves at or above the wave speed (v_s > v_sound), the wavefronts overlap to form a V-shaped conical wavefront. Mach number M = v_s/v. The 'sonic boom' heard as a supersonic fighter jet or a bullet passes is a shock wave.",
          },
        ],
        traps: [
          "In the Doppler formula f_obs = f_s(v + v_obs)/(v − v_s), the choice of signs is the biggest trap. If the observer approaches the source, v_obs in the numerator is +; if the observer recedes, −. If the source approaches the observer, v_s in the denominator is − (making the denominator v − v_s smaller, so f_obs increases); if the source recedes, +. Always verify with the principle 'approaching → frequency up, departing → down'.",
          "In a decibel calculation, the intensity (I) doubling does not double the dB. β is a logarithmic scale, so I doubling → β increases by about 3 dB, and I tenfold → β increases by 10 dB. Writing that 'the sound became twice as loud' means the dB doubled is wrong. 60 dB + 60 dB ≠ 120 dB (two identical sources combine to about 63 dB).",
        ],
        example:
          "An ambulance sounds an f_s = 800 Hz siren and approaches a stationary observer at v_s = 30 m/s (in air, v_sound = 340 m/s). Find the frequency f_obs the observer hears. Observer at rest (v_obs = 0), source approaching (− in the denominator): f_obs = f_s × v / (v − v_s) = 800 × 340 / (340 − 30) = 800 × 340/310 ≈ 877 Hz. As the ambulance passes and recedes: f_obs = 800 × 340/(340 + 30) = 800 × 340/370 ≈ 735 Hz. The jump from 877 Hz to 735 Hz — about a 142 Hz pitch difference happening in an instant — is the dramatic effect of the Doppler effect.",
      },
    ],
  },
];
