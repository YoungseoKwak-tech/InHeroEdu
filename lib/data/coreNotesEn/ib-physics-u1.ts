/**
 * Core Notes ENGLISH version — IB Physics (DP) Unit 1 (Measurements & Mechanics).
 * Covers SI units, uncertainty, vectors, and kinematics per the IB DP Physics curriculum.
 * Full content preserved (objectives · terms · traps · formulas · example) in fluent English.
 * Terms rendered as { term: "English term", def: "English definition" }.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u1-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 1,
    lessonNum: 1,
    unitName: "Measurements & Mechanics",
    title: "SI Units and the Language of Physical Quantities",
    subtitle: "How every physical phenomenon in the universe can be expressed using just 7 base units — and how dimensional analysis catches errors",
    overview:
      "Physics is a quantitative language. The alphabet of that language is the 7 SI base units. Metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), and candela (cd) — from these 7 units every derived unit, including force, energy, and pressure, can be constructed. In IB exams, unit analysis (dimensional analysis) is a reliable source of marks in extended-response questions. If your units don't balance, you lose points even when the numerical answer is correct. Today we start not by memorising units, but by building them.",
    objectives: [
      "List the 7 SI base units and connect each unit to the physical quantity it measures",
      "Express derived units such as the newton (N), joule (J), and pascal (Pa) in terms of SI base units",
      "Use dimensional analysis to verify the homogeneity of a physical equation",
      "Apply standard form (scientific notation) and SI prefixes to express very large or very small values correctly",
      "Apply significant-figure rules to report the appropriate precision in calculated results",
    ],
    formulas: [
      "F = ma → [N] = [kg·m·s⁻²]",
      "E_k = ½mv² → [J] = [kg·m²·s⁻²]",
      "P = F/A → [Pa] = [kg·m⁻¹·s⁻²]",
      "ρ = m/V → [kg·m⁻³]",
    ],
    sections: [
      {
        title: "The 7 SI Base Units — The Alphabet of Physics",
        subtitle: "Why every physical quantity can be expressed as a combination of just 7 independent base units",
        terms: [
          {
            term: "SI Base Units",
            def: "The 7 independent units defined by the International System of Units (Système International d'Unités): metre (m · length), kilogram (kg · mass), second (s · time), ampere (A · electric current), kelvin (K · temperature), mole (mol · amount of substance), candela (cd · luminous intensity). Every other physical unit is formed by multiplying or dividing these.",
          },
          {
            term: "Derived Units",
            def: "Units defined as combinations of SI base units. For example: newton N = kg·m·s⁻², joule J = kg·m²·s⁻², pascal Pa = kg·m⁻¹·s⁻². You must be able to expand a derived unit back into base units to answer IB dimensional-analysis questions.",
          },
          {
            term: "Dimensional Homogeneity",
            def: "The requirement that both sides of a physical equation carry identical dimensions (units). Checking that both sides of E = mc² reduce to [kg·m²·s⁻²] is an example of dimensional analysis. If homogeneity fails, the equation is physically invalid.",
          },
          {
            term: "SI Prefixes",
            def: "Abbreviations representing powers of ten. Commonly tested: nano (n, 10⁻⁹), micro (μ, 10⁻⁶), milli (m, 10⁻³), centi (c, 10⁻²), kilo (k, 10³), mega (M, 10⁶), giga (G, 10⁹). Prefixes attach only to SI base units; do not stack an additional prefix onto a base unit that already carries one — the kilogram (kg) cannot take a further prefix.",
          },
        ],
        traps: [
          "IB dimensional-analysis questions often ask you to 'show that this expression is dimensionally homogeneous.' You cannot leave derived units (N, J, W, etc.) unexpanded — you must work all the way down to base units. For example, when verifying E = ½mv², writing J = N·m is not sufficient; you must write [kg·m²·s⁻²] = [kg]·[m·s⁻¹]² to earn full marks. A second trap: the kilogram already carries the prefix kilo, so attaching another prefix (e.g. mkg) is incorrect notation.",
        ],
        example:
          "Practice decomposing a derived unit into base units. Take the pascal (Pa), the unit of pressure. Pressure is defined as P = F/A and force as F = ma. Therefore [Pa] = [F]/[A] = [ma]/[m²] = [kg·m·s⁻²]/[m²] = [kg·m⁻¹·s⁻²]. When an IB Paper 1 question asks 'Express Pa in SI base units,' showing this decomposition step by step is the most reliable path to full marks.",
      },
      {
        title: "Significant Figures and Standard Form — The Information Content of a Number",
        subtitle: "Communicating the precision of a measurement correctly and preserving that precision through calculations",
        terms: [
          {
            term: "Significant Figures (Significant Digits)",
            def: "The number of meaningful digits in a measured value. Leading zeros are not significant (0.0045 has 2 significant figures); captive zeros and trailing zeros are significant (205 has 3 significant figures; 3.10 has 3 significant figures). The result of a calculation must be rounded to match the fewest significant figures in the input values.",
          },
          {
            term: "Standard Form (Scientific Notation)",
            def: "Expressing a number in the form a × 10ⁿ where 1 ≤ |a| < 10 and n is an integer. This format unambiguously communicates significant figures and makes very large or very small values easy to handle. IB recommends standard form for all reported measurements.",
          },
          {
            term: "Uncertainty (Error)",
            def: "The range within which the true value of a measurement may lie, arising from instrument limitations, environmental variation, and observer variability. Expressed as an absolute value (±unit) or as a relative value (ratio or %). IB experimental reports and Paper 3 require an uncertainty to be stated alongside every measurement.",
          },
        ],
        traps: [
          "For multiplication and division, match the number of significant figures; for addition and subtraction, match the number of decimal places. Confusing these two rules is one of the most frequent errors. For example, 2.35 × 1.4 = 3.29, but it must be reported as 3.3 (2 significant figures). By contrast, 2.351 + 1.4 is rounded to one decimal place, giving 3.8. In IB Paper 3 experimental questions, reporting too many significant figures is penalised as 'unjustified precision.'",
        ],
        example:
          "Work through a density calculation with correct significant figures and uncertainty. Suppose a metal block has mass m = 24.5 g measured to 3 significant figures and volume V = 3.1 cm3 measured to 2 significant figures. The density is rho = m/V = 24.5 / 3.1 = 7.9032 g cm^-3, which must be rounded to the fewest significant figures in the data (2), so rho = 7.9 g cm^-3. To propagate uncertainty when dividing, add the fractional uncertainties: if the mass is +/- 0.1 g (0.41%) and the volume is +/- 0.1 cm3 (3.2%), the total is about 3.6%, so 3.6% of 7.9 is about 0.3 g cm^-3. The final result is therefore reported as rho = (7.9 +/- 0.3) g cm^-3.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u1-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 1,
    lessonNum: 2,
    unitName: "Measurements & Mechanics",
    title: "Uncertainties and Error Propagation",
    subtitle: "How to report the limits of measurement honestly — and how uncertainty accumulates and propagates through calculations",
    overview:
      "In IB Physics, uncertainty is not optional — it is mandatory. Every measurement is subject to the limitations of the instrument, environmental fluctuations, and observer variation; a scientist must report these honestly rather than conceal them. Even more important is error propagation: when you multiply or divide two measured quantities their relative uncertainties add, and when you add or subtract them their absolute uncertainties add. Ignoring these rules leads to invalid experimental conclusions. This is the core of IB Paper 3.",
    objectives: [
      "Distinguish between systematic error and random error, and explain the cause and remedy for each",
      "Express a measurement as an absolute uncertainty and as a fractional (percentage) uncertainty",
      "Propagate uncertainty through addition/subtraction using absolute uncertainties, and through multiplication/division using fractional uncertainties",
      "Draw a best-fit line and extreme (maximum and minimum) gradient lines on a graph to represent uncertainty visually",
      "Evaluate the reliability and validity of experimental results using uncertainty as evidence",
    ],
    formulas: [
      "Absolute uncertainty: x = (x̄ ± Δx) [unit]",
      "Fractional uncertainty: Δx/x × 100%",
      "Addition/subtraction propagation: Δ(a ± b) = Δa + Δb",
      "Multiplication/division propagation: Δ(a×b)/(a×b) = Δa/a + Δb/b",
      "Power propagation: Δ(aⁿ)/aⁿ = n × Δa/a",
    ],
    sections: [
      {
        title: "Systematic Error vs. Random Error — Two Faces of Uncertainty",
        subtitle: "Distinguishing errors that persist with repetition from those that diminish with repetition",
        terms: [
          {
            term: "Systematic Error",
            def: "An error that shifts every measurement in the same direction by a consistent amount relative to the true value. Examples: a balance that is not zeroed; a thermometer with no temperature correction. Systematic error cannot be reduced by repeating measurements — it can only be eliminated by improving the experimental design or recalibrating the instrument. High precision with low accuracy is the hallmark of a systematic error.",
          },
          {
            term: "Random Error",
            def: "An error whose direction varies randomly from one measurement to the next. Examples: variation in reaction time when starting a stopwatch; inconsistency in reading a scale. Taking the average of repeated measurements reduces random error. If only random error is present, the average converges to the true value even though individual readings are scattered.",
          },
          {
            term: "Accuracy and Precision",
            def: "Accuracy is how close a measurement is to the true value (higher when systematic error is small). Precision is how tightly repeated measurements cluster together (higher when random error is small). Target analogy: arrows clustered at the centre = accurate and precise; arrows clustered away from the centre = precise but inaccurate; arrows scattered = imprecise (and possibly inaccurate).",
          },
          {
            term: "Half the Smallest Division",
            def: "The absolute uncertainty of an analogue instrument (ruler, thermometer, etc.) is estimated as half of its smallest scale division. For example, a millimetre ruler has an uncertainty of ±0.5 mm. For digital instruments, the uncertainty is taken as ±1 in the last displayed digit.",
          },
        ],
        traps: [
          "When an IB question asks 'How can systematic error be reduced?', many students answer 'take repeated measurements' — this is wrong. Repeating measurements reduces random error; it has no effect on systematic error. Systematic error arises from a flaw in the experimental design or instrument calibration, so it must be addressed through calibration, an improved method, or a different measuring instrument. The exam demands a different answer for each type of error.",
        ],
        example:
          "Imagine an experiment measuring the period of a pendulum in which the stopwatch is always started 0.1 s late. Because this delay is consistent across every trial, it is a systematic error. Repeating the experiment 50 times will not bring the average closer to the true value. In contrast, if the start time varies randomly within ±0.2 s on each trial, that is a random error, and averaging 50 measurements will substantially reduce its effect.",
      },
      {
        title: "Error Propagation — How Uncertainty Flows Through a Calculation",
        subtitle: "Why absolute uncertainties add in sums and differences, and fractional uncertainties add in products and quotients",
        terms: [
          {
            term: "Absolute Uncertainty",
            def: "The uncertainty expressed in the same units as the measurement. Format: x = (5.3 ± 0.2) m. For addition and subtraction, the absolute uncertainties of each term are summed: Δ(a + b) = Δa + Δb.",
          },
          {
            term: "Fractional (Percentage) Uncertainty",
            def: "The absolute uncertainty divided by the measured value, usually expressed as a percentage: Δx/x × 100%. For multiplication, division, and powers, fractional uncertainties are summed: Δ(ab)/(ab) = Δa/a + Δb/b.",
          },
          {
            term: "Error Bars",
            def: "Vertical or horizontal line segments attached to each data point on a graph, showing the range of uncertainty for that measurement. Error bars are required on all graphs in IB experimental reports and Paper 3.",
          },
          {
            term: "Best-Fit Line and Extreme Gradients",
            def: "A method for analysing uncertainty from a graph with error bars. After drawing the best-fit line, draw the steepest possible line (maximum gradient) and the shallowest possible line (minimum gradient) that still pass within the error bars of every point. The difference between these extremes gives the uncertainty in the gradient.",
          },
        ],
        traps: [
          "The most common mistake in error propagation is adding absolute uncertainties for multiplication, or adding fractional uncertainties for addition. Memory rule: 'Addition/subtraction → add absolute uncertainties; multiplication/division → add fractional (%) uncertainties.' Powers are a special case: the fractional uncertainty is multiplied by the exponent. For example, to find the uncertainty in V = (4/3)πr³, the fractional uncertainty of r must be multiplied by 3. Forgetting this factor of 3 is one of the most frequent dropped marks in Paper 3.",
        ],
        example:
          "Follow the error propagation when calculating velocity as v = d/t. Given d = (2.40 ± 0.05) m and t = (1.20 ± 0.02) s, since this is division, fractional uncertainties are added. Δd/d = 0.05/2.40 ≈ 2.1%, Δt/t = 0.02/1.20 ≈ 1.7%, total ≈ 3.8%. The calculated velocity is v = 2.40/1.20 = 2.00 m/s, so the final result is v = (2.00 ± 0.08) m/s — the absolute uncertainty 0.08 comes from 2.00 × 3.8%. IB Paper 3 requires you to show each propagation step to earn full marks.",
      },
      {
        title: "Graph Analysis and Visualising Uncertainty",
        subtitle: "Extracting maximum information from experimental data using error bars, best-fit lines, and extreme gradient lines",
        terms: [
          {
            term: "Linearisation",
            def: "The technique of transforming a non-linear relationship into a straight-line graph. For example, in the relation v² = u² + 2as, plotting v² on the y-axis against s on the x-axis produces a straight line with gradient 2a. Linear graphs allow gradients, intercepts, and their uncertainties to be determined quantitatively.",
          },
          {
            term: "Gradient Uncertainty",
            def: "The uncertainty in the gradient of a best-fit line, calculated from the extreme gradient lines. Δ(gradient) = (maximum gradient − minimum gradient) / 2. This value becomes the uncertainty of a derived physical constant (e.g. gravitational acceleration g) obtained from the graph.",
          },
          {
            term: "Intercept",
            def: "The point where the line of best fit crosses the y-axis. If a systematic error is present, the intercept will deviate from the expected value (usually zero). The intercept therefore provides evidence for the existence and direction of a systematic error.",
          },
        ],
        traps: [
          "In IB Paper 3 graph questions, many students draw only the best-fit line and stop there. To quantify the uncertainty in the gradient, you must separately draw the two extreme gradient lines — the steepest and the shallowest lines that remain consistent with all the error bars. Another trap: writing 'experimental error' as the sole explanation for a non-zero y-intercept earns minimal credit. You should identify the intercept value as evidence of a specific systematic error and propose which systematic error could have shifted the intercept in that direction.",
        ],
        example:
          "Extract g and its uncertainty from a linearised free-fall graph. To find gravitational acceleration you drop a ball from several heights s and time each fall t, then plot s on the y-axis against t^2 on the x-axis, because s = (1/2)g t^2 gives a straight line through the origin with gradient (1/2)g. Suppose the best-fit line has a gradient of 4.9 m s^-2, so g = 2 x 4.9 = 9.8 m s^-2. Reading the extreme lines, the steepest gradient consistent with the error bars is 5.1 and the shallowest is 4.7, so the gradient uncertainty is (5.1 - 4.7)/2 = 0.2 m s^-2, which doubles to +/- 0.4 for g. The final result is g = (9.8 +/- 0.4) m s^-2, and a y-intercept noticeably above zero would flag a systematic timing delay rather than random scatter.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u1-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 1,
    lessonNum: 3,
    unitName: "Measurements & Mechanics",
    title: "Vectors and the Foundations of Kinematics",
    subtitle: "Working with directional quantities — from vector addition and resolution to the equations of uniform acceleration",
    overview:
      "Half of physics is direction. Velocity, force, acceleration, and displacement are all vectors — they have both magnitude and direction. Travelling at 50 km/h and travelling north at 50 km/h are physically different states. The ability to resolve a vector into components and then reconstruct a resultant is the foundation of all IB mechanics. On top of that foundation sit the uniform-acceleration (SUVAT) equations, and from there projectile motion, Newton's laws, and energy follow naturally. Master vectors today and everything from Unit 2 onward becomes much more manageable.",
    objectives: [
      "Distinguish between vectors and scalars, and correctly classify everyday physical quantities",
      "Use trigonometric functions (sin, cos, tan) to resolve a vector into horizontal and vertical components, and to combine components into a resultant vector",
      "Understand the derivation of the 5 SUVAT equations and select the appropriate equation to solve uniform-acceleration problems",
      "Separate projectile motion into independent horizontal and vertical components to calculate time of flight, maximum height, and horizontal range",
      "Recognise that in free fall the acceleration is always g = 9.8 m·s⁻² downward — including at the highest point of the trajectory",
    ],
    formulas: [
      "v = u + at",
      "s = ut + ½at²",
      "v² = u² + 2as",
      "s = ½(u + v)t",
      "Horizontal component: vₓ = v cosθ, sₓ = vₓt",
      "Vertical component: vᵧ = v sinθ − gt, sᵧ = vᵧ₀t − ½gt²",
      "Vector magnitude: |R| = √(Rₓ² + Rᵧ²), direction: θ = arctan(Rᵧ/Rₓ)",
    ],
    sections: [
      {
        title: "Vectors and Scalars — How Direction Changes Physics",
        subtitle: "Distinguishing quantities that have only magnitude from those that have magnitude and direction, and combining vectors graphically and by components",
        terms: [
          {
            term: "Scalar",
            def: "A physical quantity that is fully described by its magnitude alone, with no directional information. Examples: mass (kg), temperature (K), speed (m/s), distance (m), energy (J), time (s). Scalars can be added and subtracted algebraically.",
          },
          {
            term: "Vector",
            def: "A physical quantity that has both magnitude and direction, represented by an arrow whose length encodes magnitude and whose orientation encodes direction. Examples: displacement (m), velocity (m/s), acceleration (m/s²), force (N), momentum (kg·m/s). Vectors must be combined geometrically (triangle law, parallelogram law) or by component resolution — not by simple algebra.",
          },
          {
            term: "Vector Resolution",
            def: "The process of splitting a single vector into two mutually perpendicular components. For a vector of magnitude v at angle θ above the horizontal: horizontal component vₓ = v cosθ, vertical component vᵧ = v sinθ. Always confirm that θ is measured from the correct reference direction.",
          },
          {
            term: "Resultant Vector",
            def: "The single vector that is the sum of two or more component vectors. Component method: sum all x-components → Rₓ; sum all y-components → Rᵧ. Magnitude |R| = √(Rₓ² + Rᵧ²), direction θ = arctan(Rᵧ/Rₓ). Used in IB problems involving the resultant of two forces or the resultant velocity of two motions.",
          },
        ],
        traps: [
          "A classic IB trap: when an angle is measured from the vertical (y-axis) rather than the horizontal, sin and cos are swapped. The horizontal component of a vector '30° from the vertical' is v sin30°, not v cos30°. Always sketch the geometry to confirm which trigonometric function applies to which component. A second trap: when summing multiple vectors, establish a sign convention (e.g. rightward/upward = positive, leftward/downward = negative) and apply it consistently throughout the entire problem.",
        ],
        example:
          "Two forces act on a point: F₁ = 30 N (horizontally to the right) and F₂ = 40 N (vertically upward). Find the magnitude and direction of the resultant. Rₓ = 30 N, Rᵧ = 40 N, so |R| = √(30² + 40²) = √(900 + 1600) = √2500 = 50 N. The direction is θ = arctan(40/30) ≈ 53° above the horizontal. Recognising the 3-4-5 right-triangle ratio speeds up this type of calculation in the IB exam.",
      },
      {
        title: "Equations of Uniform Acceleration (SUVAT)",
        subtitle: "Using the relationships among s, u, v, a, and t to solve straight-line constant-acceleration problems systematically",
        terms: [
          {
            term: "SUVAT Variables",
            def: "The five variables describing uniform linear acceleration: s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time). The SUVAT equations allow any two of these five variables to be found when the other three are known.",
          },
          {
            term: "Uniform Acceleration",
            def: "Motion in which the magnitude and direction of acceleration remain constant throughout. The SUVAT equations apply only to uniform acceleration. If air resistance varies with speed, or if the net force changes, the acceleration is non-uniform and SUVAT cannot be applied directly.",
          },
          {
            term: "Free Fall",
            def: "Motion under gravity alone, with air resistance neglected. Acceleration is always g ≈ 9.8 m·s⁻² directed downward. In IB, if upward is taken as positive then a = −9.8 m·s⁻²; if downward is positive then a = +9.8 m·s⁻². State your sign convention explicitly before solving.",
          },
          {
            term: "Projectile Motion",
            def: "Two-dimensional motion in which horizontal and vertical components are independent. Horizontal: acceleration = 0, so sₓ = uₓt (constant speed). Vertical: acceleration = g, so SUVAT applies. The only quantity linking the two components is the time t.",
          },
        ],
        traps: [
          "Two of the most common SUVAT errors. First, including gravitational acceleration in the horizontal equation for projectile motion — there is no horizontal force, so horizontal acceleration is exactly zero and sₓ = uₓt is the only valid horizontal equation. Second, concluding that acceleration is zero at the highest point because vertical velocity is zero — at the peak, vertical velocity is zero but the acceleration remains g = 9.8 m·s⁻² directed downward. IB Paper 1 multiple-choice questions almost always include distractors based on both of these misconceptions.",
        ],
        example:
          "Find the maximum height of a projectile launched at v₀ = 20 m·s⁻¹ at 30° above the horizontal. First, the initial vertical velocity: uᵧ = 20 sin30° = 10 m·s⁻¹ (upward). At the highest point vᵧ = 0; taking upward as positive, a = −9.8 m·s⁻². Applying v² = u² + 2as: 0 = 10² + 2(−9.8)s → s = 100/19.6 ≈ 5.1 m. To find horizontal range, first find total flight time: t_total = 2uᵧ/g = 2×10/9.8 ≈ 2.0 s, then horizontal distance sₓ = uₓ × t = (20 cos30°) × 2.0 ≈ 34.6 m.",
      },
      {
        title: "Relative Motion and Resultant Velocity Using Vectors",
        subtitle: "How the same motion appears different in different reference frames — describing velocity relative to an observer using vector addition",
        terms: [
          {
            term: "Relative Velocity",
            def: "The velocity of an object as observed from a particular reference frame. v_AB denotes the velocity of A as measured by observer B. The velocity of an object relative to the ground equals its velocity relative to a medium (water, wind) plus the velocity of the medium relative to the ground: v_AG = v_AM + v_MG (vector sum).",
          },
          {
            term: "Vector Triangle",
            def: "A geometric method for representing three vectors whose sum is zero (equilibrium) or where two vectors sum to a third. Commonly used in IB problems involving force equilibrium, crossing a river, and aircraft navigation.",
          },
          {
            term: "Drift Angle",
            def: "When a medium such as a river current or wind is moving, the angle between the intended direction of travel and the actual direction of motion. To travel in a desired direction, the object must be aimed into the flow to compensate for the medium's velocity.",
          },
        ],
        traps: [
          "River-crossing problems have two distinct strategies with different answers. Minimum time: always point the boat directly across the river (perpendicular to the bank), accepting downstream drift. Minimum distance: angle the boat upstream so that the resultant velocity is perpendicular to the bank, eliminating drift entirely. IB questions sometimes ask you to compare both strategies within a single problem, so read the conditions carefully before committing to an approach.",
        ],
        example:
          "Solve a river-crossing problem for the minimum-time strategy. A boat travels at 4.0 m s^-1 relative to the water and points straight across a river 100 m wide, while the current flows downstream at 3.0 m s^-1. Because the crossing velocity (4.0 m s^-1) is perpendicular to the bank and unaffected by the current, the time to cross is t = 100 / 4.0 = 25 s. During those 25 s the current carries the boat downstream by 3.0 x 25 = 75 m, so it lands 75 m downstream of the start point. The resultant speed relative to the ground is the vector sum, sqrt(4.0^2 + 3.0^2) = 5.0 m s^-1, along a path angled arctan(3.0/4.0) = 37 degrees from the straight-across direction.",
      },
    ],
  },
];
