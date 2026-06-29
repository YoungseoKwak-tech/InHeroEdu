/**
 * Core Notes English version — IB Physics (DP) Unit 4 (Waves).
 * Covers simple harmonic motion, travelling waves, wave characteristics,
 * wave behaviour, standing waves, and the Doppler effect per the IB DP Physics curriculum.
 * All objectives, terms, traps, formulas, and examples preserved at full depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u4-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 4,
    lessonNum: 1,
    unitName: "Waves",
    title: "Simple Harmonic Motion & Travelling Waves — The Birth of a Wave",
    subtitle:
      "Understand how an oscillation (SHM) spreads through space to become a travelling wave, and calculate the fundamental quantities of a wave using v = fλ and T = 1/f",
    overview:
      "Everything about a wave begins with an oscillation. Simple Harmonic Motion (SHM) is a regular oscillation in which the restoring force is proportional to the displacement; a pendulum and a spring-mass system are the classic examples. When this oscillation spreads outward through a medium, transferring energy, it becomes a travelling wave. IB DP requires you to define the fundamental physical quantities of a wave precisely — amplitude, wavelength, period, frequency, and wave speed — and to explain the difference between a transverse wave and a longitudinal wave. The wave-speed equation v = fλ is the foundation of all of Unit 4 and is used very frequently on both Paper 1 and Paper 2.",
    objectives: [
      "Define Simple Harmonic Motion (SHM) and relate a displacement-time graph to a velocity-time graph",
      "Define amplitude, period, frequency, and wavelength, and apply the relationship T = 1/f",
      "Define transverse and longitudinal waves and explain, for each, the relationship between the direction of medium-particle motion and the direction of wave propagation",
      "Use the wave-speed equation v = fλ to calculate one of the three quantities",
      "Distinguish a displacement-distance (snapshot) graph from a displacement-time graph and read the wavelength and period from each",
    ],
    formulas: [
      "v = fλ  (wave speed)",
      "T = 1/f  (period and frequency are reciprocals)",
      "f [Hz] = 1/T [s]",
      "Amplitude A: maximum displacement from the equilibrium position [m]",
      "Wavelength λ: the distance between two adjacent points in phase [m]",
    ],
    sections: [
      {
        title: "Simple Harmonic Motion (SHM) — The Oscillation from Which a Wave Originates",
        subtitle:
          "Understand the proportional relationship between restoring force and displacement, and grasp the features of SHM through a displacement-time graph",
        terms: [
          {
            term: "Simple Harmonic Motion (SHM)",
            def: "Motion under a restoring force that is proportional to the displacement from the equilibrium position and directed opposite to it: F ∝ −x. The displacement-time graph appears as a sine or cosine curve. The spring-mass system and the small-angle simple pendulum are the SHM examples that appear most often in IB.",
          },
          {
            term: "Amplitude (A)",
            def: "The magnitude of the maximum displacement from the equilibrium position. Unit: metre (m). Amplitude is directly related to the energy a wave carries (intensity) — the larger the amplitude, the greater the energy. In SHM, amplitude determines the maximum values of velocity and acceleration. Maximum speed occurs at the equilibrium position; maximum acceleration (= maximum restoring force) occurs at maximum displacement.",
          },
          {
            term: "Period (T) and Frequency (f)",
            def: "Period (T): the time taken to complete one full oscillation (one cycle). Unit: second (s). Frequency (f): the number of oscillations per unit time. Unit: hertz (Hz = s⁻¹). Reciprocal relationship: T = 1/f. Period of a simple pendulum: T = 2π√(L/g); period of a spring-mass system: T = 2π√(m/k). In IB these two formulas are provided in the data booklet.",
          },
          {
            term: "Displacement-Time Graph vs. Displacement-Distance Graph (x-t graph vs. x-position graph)",
            def: "Displacement-time graph: shows the position of one particle as a function of time → read the period T. Displacement-distance graph (snapshot/displacement-position graph): shows the displacement of every point of the medium at a particular instant → read the wavelength λ. On IB Paper 1, multiple-choice questions designed to make you confuse the two graphs appear frequently.",
          },
        ],
        traps: [
          "On IB Paper 1, you may be prompted to 'read the period from a displacement-distance graph,' confusing the two graphs. What you can read from a displacement-distance graph is the 'wavelength (λ),' not the 'period (T).' T can only ever be read from a displacement-time graph. Make a habit of first checking the unit of the x-axis (m vs. s) on each graph.",
          "In SHM, 'the position of maximum speed = the position of zero displacement (equilibrium position),' and 'the position of maximum acceleration = the position of maximum displacement (the extremes).' Exam options that swap these two positions appear frequently. Acceleration is always opposite in direction to displacement, so the acceleration graph is the displacement graph flipped upside down.",
        ],
        example:
          "Calculating a pendulum period and reading the graph: find the period of a simple pendulum of length L = 0.40 m, and if its displacement-time graph shows an amplitude of 0.05 m, estimate the maximum speed. T = 2π√(L/g) = 2π√(0.40/9.81) = 2π × 0.2019 ≈ 1.27 s. Frequency f = 1/T ≈ 0.79 Hz. Maximum speed is v_max = Aω = A × 2πf = 0.05 × 2π × 0.79 ≈ 0.25 m s⁻¹ (occurring at the equilibrium position). IB marking point: keep angles in radians when computing T, and take g = 9.81 m s⁻² from the data booklet.",
      },
      {
        title: "Travelling Waves — Transverse vs. Longitudinal and v = fλ",
        subtitle:
          "Distinguish transverse from longitudinal waves by the direction of medium-particle motion, and connect the three fundamental quantities of a wave",
        terms: [
          {
            term: "Transverse Wave",
            def: "A wave in which the direction of medium-particle oscillation is perpendicular to the direction of wave propagation. Examples: electromagnetic waves (light), surface water waves (to a surface approximation), waves travelling along a string. Crests and troughs are clearly visible on a displacement-distance snapshot graph. A transverse wave can be polarized — this is fundamentally different from a longitudinal wave.",
          },
          {
            term: "Longitudinal Wave",
            def: "A wave in which the direction of medium-particle oscillation is parallel to the direction of wave propagation. Examples: sound (acoustic waves), pressure waves travelling along a spring. Compressions and rarefactions form alternately in the medium. A longitudinal wave cannot travel through a vacuum (a medium is required). Polarization is not possible.",
          },
          {
            term: "Wave Speed (v)",
            def: "The speed at which a wave transfers energy through a medium: v = fλ. Wave speed is determined by the properties of the medium (density, elasticity) and is independent of frequency or amplitude. In the same medium, if the frequency doubles the wavelength halves, so the speed stays constant. Speed of light in a vacuum: c = 3.0 × 10⁸ m s⁻¹.",
          },
        ],
        traps: [
          "A common misremembering of v = fλ is that 'wave speed is proportional to frequency.' Wave speed is fixed by the medium — if the frequency increases, the wavelength simply shortens and the speed does not change. This concept is also central to refraction problems: when the medium changes, the speed and wavelength change but the frequency does not.",
        ],
        example:
          "Applying v = fλ: sound travels at 340 m s⁻¹ in air at 20 °C. Find the wavelength of a 680 Hz sound. λ = v/f = 340/680 = 0.50 m. When the same sound enters water (v ≈ 1500 m s⁻¹): λ = 1500/680 ≈ 2.2 m. The frequency (680 Hz) does not change; only the wavelength becomes longer. This confirms the intuitive relationship that the faster the wave speed, the longer the wavelength.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u4-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 4,
    lessonNum: 2,
    unitName: "Waves",
    title: "Wave Characteristics & Behaviour — Reflection, Refraction, Diffraction & Interference",
    subtitle:
      "Understand wavefronts, intensity, and polarization, and apply at IB level the conditions for reflection, refraction (Snell's law), diffraction, and path-difference interference",
    overview:
      "The heart of Unit 4 is how a wave behaves when it meets a boundary or an obstacle. Reflection, refraction, diffraction, and interference — these four wave behaviours apply identically to light, sound, and water waves, and they appear on IB Paper 2 extended-response questions every year. In refraction, Snell's law and refractive index are the key equations; in interference, path difference is the criterion that determines reinforcement or cancellation. Polarization is a phenomenon that occurs only in transverse waves and is evidence of the transverse nature of light. We also cover the inverse-square law, in which intensity is proportional to the square of the amplitude and, for a point source, inversely proportional to the square of the distance.",
    objectives: [
      "Explain the relationship between wavefronts and rays, and represent reflection and refraction geometrically using wavefronts",
      "Apply Snell's law n₁sinθ₁ = n₂sinθ₂ to calculate refraction angles and refractive indices, and find the critical angle for total internal reflection",
      "Explain wave behaviour in single-slit diffraction and double-slit interference in terms of path difference",
      "State the path-difference conditions for constructive interference and destructive interference",
      "Explain in words the principle of polarization and the change in intensity for light passing through a polarizer/analyser",
    ],
    formulas: [
      "n₁sinθ₁ = n₂sinθ₂  (Snell's law)",
      "n = c/v  (absolute refractive index of a medium)",
      "Critical angle for total internal reflection: sinθ_c = n₂/n₁  (when n₁ > n₂)",
      "Constructive interference: path difference = nλ  (n = 0, 1, 2, …)",
      "Destructive interference: path difference = (n + ½)λ  (n = 0, 1, 2, …)",
      "Intensity-amplitude relationship: I ∝ A²",
      "Inverse-square law: I ∝ 1/d²  (point source)",
    ],
    sections: [
      {
        title: "Wavefronts, Intensity & Polarization — Three Ways of Looking at a Wave",
        subtitle:
          "Understand the geometric relationship between wavefronts and rays, and grasp the quantitative link between amplitude, distance, and intensity",
        terms: [
          {
            term: "Wavefront and Ray",
            def: "Wavefront: a surface (or line) connecting points that are in phase. The wavefronts of a spherical wave from a point source are spherical, becoming closer to plane waves as the distance increases. Ray: a line perpendicular to the wavefront that shows the direction of energy transfer. It is natural to understand the laws of reflection and refraction with rays, and diffraction and interference with wavefronts.",
          },
          {
            term: "Intensity (I)",
            def: "The energy (power) passing through unit area per unit time: I = P/A, unit W m⁻². You must remember two relationships. ① I ∝ A² (proportional to the square of the amplitude A): if the amplitude doubles, the intensity becomes four times greater. ② Inverse-square law: for a point source spreading energy uniformly in all directions, at distance d, I = P/(4πd²) ∝ 1/d².",
          },
          {
            term: "Polarization",
            def: "The phenomenon of restricting the direction of oscillation of a transverse wave to a particular direction. Unpolarized light oscillates in all directions perpendicular to the direction of propagation. After passing through a polarizer it becomes linearly polarized light, oscillating in only one direction. If two polarizers are crossed (90°), light is completely blocked. Polarization is possible only for transverse waves, so the fact that light can be polarized proves that light is a transverse wave. A longitudinal wave (sound) cannot be polarized.",
          },
        ],
        traps: [
          "The inverse-square law I ∝ 1/d² holds only for a point source and a medium with no energy loss. A beam that spreads in a single direction in a parallel manner, like a laser, does not decrease in intensity with distance. In IB problems, applying the inverse-square law directly without the condition 'point source' is risky.",
          "Regarding polarization, the statement 'all waves can be polarized' is false. Polarization is possible only for a transverse wave; a longitudinal wave cannot be restricted to a particular direction because its particles oscillate parallel to the direction of propagation. In the Paper 1 'which of the following waves can be polarized?' type, choosing sound is immediately wrong.",
        ],
        example:
          "Calculating an intensity-distance relationship: find the intensity at a point 3.0 m from a 60 W bulb (treated as a point source). I = P/(4πd²) = 60/(4π × 9.0) = 60/113.1 ≈ 0.53 W m⁻². The intensity at a point 6.0 m (twice the distance) from the same bulb: I = 0.53/4 ≈ 0.13 W m⁻². The inverse-square law confirms that doubling the distance reduces the intensity to one quarter. IB Paper 2 frequently sets ratio questions of the type 'when the distance becomes n times greater, the intensity becomes 1/n² times.'",
      },
      {
        title: "Reflection, Refraction, Diffraction & Interference — The Four Fates of a Wave Meeting a Boundary",
        subtitle:
          "Predict wave behaviour quantitatively using Snell's law and the path-difference conditions, and master the precise language required in IB extended-response questions",
        terms: [
          {
            term: "Refraction and Snell's Law",
            def: "The phenomenon in which a wave bends its direction of travel because of a change in speed as it enters a different medium. Snell's law: n₁sinθ₁ = n₂sinθ₂ (θ is the angle to the normal). Absolute refractive index of a medium: n = c/v (v: speed of light in that medium). Entering a slower medium (higher n) bends the wave toward the normal (θ decreases); leaving into a faster medium (lower n) bends it away from the normal. During refraction the frequency is unchanged; only the wavelength and speed change.",
          },
          {
            term: "Total Internal Reflection",
            def: "When moving from a faster medium (lower n) to a slower medium (higher n), the angle of incidence at which the refraction angle becomes 90° is called the critical angle (θ_c): sinθ_c = n₂/n₁. If the angle of incidence exceeds θ_c, all the light is reflected (total internal reflection). This is the operating principle of optical fibres and endoscopes.",
          },
          {
            term: "Diffraction",
            def: "The phenomenon in which a wave spreads out as it passes the edge of an obstacle or a slit. Diffraction is most pronounced when the slit width is comparable to the wavelength. If the slit width is much greater than the wavelength, almost no diffraction occurs. In IB you must be able to state that the central bright fringe of a single-slit diffraction pattern is the widest and brightest, and that the narrower the slit, the more diffraction occurs.",
          },
          {
            term: "Interference and Path Difference",
            def: "The phenomenon in which coherent waves from two sources superpose, reinforcing or weakening the amplitude. Constructive interference: the two waves arrive in phase → path difference = nλ (n = 0, 1, 2, …). Destructive interference: the two waves arrive in antiphase → path difference = (n + ½)λ. Coherence: the two sources must have the same frequency and a constant phase difference for a stable interference pattern to form.",
          },
        ],
        traps: [
          "In Snell's law, the angle θ is the angle to the 'normal,' not to the boundary surface. If you confuse the angle to the surface (the grazing angle) with the angle to the normal, the sine value differs and you get a completely wrong refraction angle. Always draw the normal perpendicular to the boundary first, and measure angles relative to it.",
          "When memorising the interference condition as 'path difference = λ gives constructive interference,' it is easy to forget that path difference = 0 (identical paths) is also constructive interference. Path difference = nλ (including n = 0) is the complete condition for constructive interference. Also, the condition is reversed 'when the two slits are in antiphase (phase difference π)' — such cases are stated explicitly on Paper 2.",
        ],
        example:
          "Snell's law + critical angle for total internal reflection: find the critical angle when light travels from glass of refractive index n = 1.5 into air (n = 1.0). sinθ_c = n₂/n₁ = 1.0/1.5 = 0.667 → θ_c = 41.8° ≈ 42°. For an angle of incidence of 45°, the critical angle is already exceeded, so total internal reflection occurs. On the other hand, for an angle of incidence of 30°, the refraction angle is: sinθ₂ = (1.5/1.0) × sin30° = 1.5 × 0.5 = 0.75 → θ₂ ≈ 48.6°. This confirms that when going from glass into air the wave bends away from the normal (refraction angle > incidence angle).",
      },
    ],
  },
  {
    lessonId: "ib-physics-u4-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 4,
    lessonNum: 3,
    unitName: "Waves",
    title: "Standing Waves & the Doppler Effect — Advanced Applications of Waves",
    subtitle:
      "Derive the node, antinode, and harmonic conditions for standing waves, and calculate quantitatively how source and observer motion affect frequency through the Doppler effect",
    overview:
      "When a travelling wave superposes with an oppositely directed travelling wave of the same frequency and amplitude, a standing wave is formed. This phenomenon is the basis of the sound of musical instruments, laser resonators, and countless other applications. In IB DP you must be able to identify the positions of nodes and antinodes of a standing wave, and calculate the wavelength and frequency of the fundamental harmonic and higher overtones/harmonics according to the boundary conditions at the two ends. The Doppler effect is the phenomenon in which the observed frequency changes when the source or the observer is in motion; it is applied in evidence for the expansion of the universe through redshift, and in speed-measuring radar. In IB the Doppler formula is provided in the data booklet, and both conceptual understanding and formula application are required on Paper 2.",
    objectives: [
      "Explain the principle of standing-wave formation through superposition, and identify the positions of nodes and antinodes",
      "Calculate the wavelength and frequency of the fundamental and harmonics for a string fixed at both ends and for open/closed pipes",
      "Explain the Doppler effect qualitatively and predict the direction of change in the observed frequency when the source or the observer is in motion",
      "Use the Doppler formula f' = f(v ± v_o)/(v ∓ v_s) to calculate the observed frequency",
    ],
    formulas: [
      "Standing wave, string fixed at both ends: λ_n = 2L/n, f_n = nv/(2L)  (n = 1, 2, 3, …)",
      "Open pipe (open at both ends): λ_n = 2L/n, f_n = nv/(2L)  (n = 1, 2, 3, …)",
      "Closed pipe (closed at one end): λ_n = 4L/n, f_n = nv/(4L)  (n = 1, 3, 5, … odd only)",
      "Doppler formula: f' = f × (v ± v_o)/(v ∓ v_s)",
      "Node spacing = λ/2, adjacent node-to-antinode spacing = λ/4",
    ],
    sections: [
      {
        title: "Standing Waves — What Changes When a Wave Is Trapped",
        subtitle:
          "Understand the physical meaning of nodes and antinodes, and derive the harmonic patterns according to the boundary conditions (fixed/open)",
        terms: [
          {
            term: "Standing Wave",
            def: "A wave pattern produced by the superposition of two travelling waves of the same frequency, amplitude, and wavelength moving in opposite directions. In a standing wave no energy is transferred (the time-averaged energy flow = 0). Certain points always have displacement = 0 (nodes), while other points oscillate with maximum amplitude (antinodes). The distance between two adjacent nodes = λ/2.",
          },
          {
            term: "Node and Antinode",
            def: "Node: a point where the two waves always interfere destructively, so the displacement is always 0. The fixed end of a string and the closed end of a closed pipe are always nodes. Antinode: a point where the two waves always interfere constructively, oscillating with maximum amplitude. The open end of an open pipe and a free end are always antinodes. The adjacent node-to-antinode spacing = λ/4.",
          },
          {
            term: "Harmonics and the Fundamental",
            def: "Fundamental (first harmonic): the lowest frequency in a standing-wave pattern. For a string fixed at both ends, the fundamental: L = λ₁/2 → λ₁ = 2L, f₁ = v/(2L). The nth harmonic: f_n = nf₁. In a closed pipe (closed at one end) only odd harmonics exist — because a node must be at the closed end and an antinode at the open end, L = (2n−1)λ/4. In an open pipe all harmonics exist.",
          },
          {
            term: "Resonance",
            def: "The phenomenon in which the amplitude grows sharply when an external frequency matches the natural frequency of a system. A standing wave forms when the resonance condition is met. In IB, questions ask you to explain the resonance condition in string instruments (guitar, violin) and wind instruments (flute, organ pipe) in terms of boundary conditions (node/antinode positions).",
          },
        ],
        traps: [
          "In a closed pipe (closed at one end) only odd harmonics exist (1st, 3rd, 5th, …). If you think 'a closed pipe also has all harmonics,' you will get the 2nd and 4th harmonic questions wrong. Make a habit of first drawing the boundary conditions, confirming the node and antinode positions, and then finding λ. Always count the harmonic number (n), the number of nodes, and the number of antinodes directly to check.",
          "Confusing standing waves with travelling waves is a common descriptive error. In a travelling wave the 'phase' of the wave moves with time, but in a standing wave the positions of the nodes and antinodes are fixed and all points oscillate in phase (or in antiphase). On Paper 2 extended-response questions, you must explicitly state 'in a standing wave no energy is transferred' to gain full marks.",
        ],
        example:
          "Calculating standing-wave harmonics on a string: a string of length L = 0.80 m is fixed at both ends, and the wave speed on the string is v = 320 m s⁻¹. Find the wavelength and frequency of the fundamental (first harmonic) and the third harmonic. 1st: λ₁ = 2L = 1.60 m, f₁ = v/λ₁ = 320/1.60 = 200 Hz. 3rd: λ₃ = 2L/3 = 0.533 m, f₃ = 3f₁ = 600 Hz. If this string sits on a resonance speaker and receives a 600 Hz driving frequency, the third harmonic resonates and the amplitude grows sharply. IB marking point: you must first state the boundary conditions (nodes at both ends) and write out the process of deriving the formula λ = 2L/n.",
      },
      {
        title: "The Doppler Effect — The Frequency Change Created by a Moving Source",
        subtitle:
          "Understand the sign convention of the Doppler formula precisely, and predict and calculate frequency according to the direction of source/observer motion",
        terms: [
          {
            term: "Doppler Effect",
            def: "The phenomenon in which the observed frequency (f') differs from the emitted frequency (f) when there is relative motion between the source and the observer. When the source approaches the observer: the wavefronts are compressed, so f' > f (the pitch is heard as higher). When the source moves away from the observer: the wavefronts are stretched, so f' < f (the pitch is heard as lower). The sudden drop in pitch as an ambulance siren passes by is the classic example.",
          },
          {
            term: "Doppler Formula Sign Convention",
            def: "f' = f(v ± v_o)/(v ∓ v_s). v: wave speed in the medium, v_o: observer speed, v_s: source speed. Rules: observer moving toward the source → use + in the numerator (f' increases). Observer moving away from the source → use − in the numerator (f' decreases). Source moving toward the observer → use − in the denominator (f' increases). Source moving away from the observer → use + in the denominator (f' decreases). The IB data booklet provides the formula, but getting the sign wrong is the most common error.",
          },
          {
            term: "Redshift and Blueshift",
            def: "An astronomical application of the Doppler effect. When a star or galaxy moves away from Earth, the wavelength of its light increases — a redshift (f decreases, λ increases); when it moves closer, the wavelength decreases — a blueshift (f increases, λ decreases). The fact that more distant galaxies show a greater redshift in Hubble's observations is evidence for the expansion of the universe. On IB Paper 2, the question type 'calculate the recession speed from the measured wavelength change' is set.",
          },
        ],
        traps: [
          "Applying the signs the wrong way round in the Doppler formula gives an f' that is opposite to reality. Specifically: when the source approaches the observer f' should be > f, but writing + in the denominator gives the wrong result f' < f. Rather than memorising the formula, the habit of verifying the sign with the physical logic 'source approaches → wavefronts compressed → wavelength decreases → frequency increases' prevents mistakes on the IB exam.",
          "In Doppler-effect calculations, confusing the wave speed in the medium (v) with the source or observer speed collapses the formula itself. The speed of sound in air, v = 340 m s⁻¹, does not change (it is independent of source/observer speed), and v_s and v_o are the ground speeds of the source and the observer respectively. In particular, if the source speed approaches the speed of sound, physics beyond IB level (shock waves) appears, so the exam assumes the condition v_s ≪ v.",
        ],
        example:
          "Doppler formula calculation: an ambulance (source) sounds an f = 800 Hz siren and approaches a stationary observer at v_s = 30 m s⁻¹. With the speed of sound in air v = 340 m s⁻¹, find the frequency f' the observer hears. Observer stationary (v_o = 0), source approaching → use − in the denominator. f' = f × v/(v − v_s) = 800 × 340/(340 − 30) = 800 × 340/310 = 800 × 1.097 ≈ 877 Hz. As the ambulance passes and moves away: f' = 800 × 340/(340 + 30) = 800 × 340/370 ≈ 735 Hz. The sudden drop from 877 Hz to 735 Hz is the siren effect we experience in everyday life. IB marking point: state in one line the reason for the chosen sign convention, and write the unit (Hz).",
      },
    ],
  },
];
