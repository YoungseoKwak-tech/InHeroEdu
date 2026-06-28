/**
 * Core Notes English version — Honors Precalculus Unit 3 (Trigonometry).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content rewritten in natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PRECALCULUS_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-precalculus-u3-l1",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 3,
    lessonNum: 1,
    unitName: "Trigonometry",
    title: "Angles and the Unit Circle — Radians, Exact Values, Reference Angles",
    subtitle: "Break free from 360 degrees and think in radians, and all of trigonometry simplifies",
    overview:
      "The first gateway in trigonometry is changing how you view angles. Advanced mathematics, including calculus, expresses angles in radians rather than degrees. Three ideas drive this lesson: first, convert freely between radians and degrees; second, use unit-circle coordinates to find exact values of the six trig functions at any angle; third, use reference angles to quickly determine trig values in quadrants II, III, and IV. Once you fully understand the structure of the unit circle, you derive trig values from principle rather than memorizing a table.",
    objectives: [
      "Convert freely between degrees and radians and explain the relationship between the two units",
      "Use the unit circle definition to find exact values of sin, cos, tan at the principal angles (0, π/6, π/4, π/3, π/2, …)",
      "Use reference angles to determine the value and sign of a trig function at any angle",
      "Handle negative angles and angles greater than one full turn using coterminal angles",
      "Use radians to compute arc length and sector area",
    ],
    formulas: [
      "Radian conversion: degrees × (π / 180) = radians",
      "Degree conversion: radians × (180 / π) = degrees",
      "Arc length: s = rθ  (θ in radians)",
      "Sector area: A = (1/2)r²θ  (θ in radians)",
      "Unit circle: (cos θ, sin θ) = coordinates of angle θ on the unit circle",
      "Coterminal: θ ± 360° or θ ± 2π",
      "Reference angle: the acute angle between the terminal side and the x-axis",
    ],
    sections: [
      {
        title: "Radians and Degrees — Two Languages of Angle",
        subtitle: "Think in terms of π and conversion is a single multiplication",
        terms: [
          {
            term: "Radian",
            def: "The central angle in a circle of radius r that subtends an arc of length r. One full turn (360°) = 2π radians; a half turn (180°) = π radians. A radian is dimensionless, so 'rad' is often omitted. Trig derivative formulas in calculus hold only in radians, so becoming fluent now is essential.",
          },
          {
            term: "Unit circle",
            def: "A circle of radius 1, equation x² + y² = 1. Placing an angle θ in standard position, the point where the terminal side meets the unit circle has coordinates (cos θ, sin θ). Rather than memorizing it, understand the definition 'coordinates = (cos, sin)' and you can derive any angle.",
          },
          {
            term: "Reference angle",
            def: "The positive acute angle (0 < α < 90°) between the terminal side of θ and the nearer side of the x-axis. The absolute values of trig functions at the reference angle are the same regardless of quadrant; only the sign changes by quadrant (ASTC). Example: the reference angle of θ = 150° is 180° − 150° = 30°.",
          },
          {
            term: "Coterminal angles",
            def: "Two angles whose terminal sides coincide in standard position. Found by adding or subtracting 360° (or 2π). Example: 390°, 30°, and −330° are all coterminal. Trig functions are equal at coterminal angles, so you can reduce a large or negative angle to an equivalent angle in 0°–360°.",
          },
        ],
        traps: [
          "When converting degrees to radians you must multiply by π/180; multiplying by 180/π instead is a frequent error. Memorize with direction: 'deg → rad: ×(π/180), rad → deg: ×(180/π).' Writing units guards against mistakes: 45° × (π rad / 180°) = π/4 rad.",
          "A reference angle is always a positive acute angle (0°–90°). Per-quadrant formulas: Q2 → 180° − θ, Q3 → θ − 180°, Q4 → 360° − θ. For θ = 210° the reference angle is 210° − 180° = 30°.",
        ],
        example:
          "Find the exact values of sin θ, cos θ, tan θ for θ = 5π/3 radians. Convert: 5π/3 × (180/π) = 300°. Since 300° = 360° − 60°, it lies in Quadrant IV, with reference angle 360° − 300° = 60°. At 60°: sin 60° = √3/2, cos 60° = 1/2. In Q4 by ASTC, sin is negative, cos is positive, tan is negative. So sin(5π/3) = −√3/2, cos(5π/3) = 1/2, tan(5π/3) = (−√3/2)/(1/2) = −√3.",
      },
      {
        title: "The Unit Circle — Exact Values of the Principal Angles",
        subtitle: "Master just the 30-60-90 and 45-45-90 triangles and the whole unit circle becomes clear",
        terms: [
          {
            term: "ASTC rule (signs by quadrant)",
            def: "Which trig functions are positive in each quadrant: Q1 → All, Q2 → Sine only, Q3 → Tangent only, Q4 → Cosine only. Mnemonic 'All Students Take Calculus.' The other functions are negative there. Apply these signs to the reference-angle magnitude to get the trig value of any angle.",
          },
          {
            term: "Special angle values",
            def: "30° (π/6): sin = 1/2, cos = √3/2, tan = 1/√3 = √3/3. 45° (π/4): sin = √2/2, cos = √2/2, tan = 1. 60° (π/3): sin = √3/2, cos = 1/2, tan = √3. 0°: sin = 0, cos = 1. 90° (π/2): sin = 1, cos = 0, tan undefined. These derive directly from the 30-60-90 and 45-45-90 right triangles.",
          },
          {
            term: "Arc length & sector area",
            def: "For a sector of radius r and central angle θ (radians): arc length s = rθ, sector area A = (1/2)r²θ. If θ is in degrees, convert to radians first. These formulas follow naturally from the definition of a radian, so understand rather than memorize.",
          },
        ],
        traps: [
          "Reversing the order of sin and cos in the unit-circle coordinates (x, y) is a common error. On the unit circle x = cos θ and y = sin θ. Remember 'y (up/down) = sin, x (left/right) = cos.' In particular, sin 90° = 1 (not cos 90° = 1) is frequently tested.",
          "In the arc length formula s = rθ, θ MUST be in radians. Substituting θ = 60° directly gives a completely wrong answer. If a problem gives degrees, convert to π/3 first. This single mistake can wreck an entire sector-area problem.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u3-l2",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 3,
    lessonNum: 2,
    unitName: "Trigonometry",
    title: "Graphs of Trig Functions — Amplitude, Period, Phase Shift",
    subtitle: "The single form y = A sin(Bx + C) + D holds every secret of a trig graph",
    overview:
      "Trig graphs begin with the basic waveforms of sin and cos, but exam and application problems present combinations of amplitude, period, phase shift, and vertical shift. The core goal of this lesson is to read those four pieces of information instantly from y = A sin(Bx + C) + D and graph the result accurately. You will also learn the features of the tan, csc, sec, and cot graphs (locations of vertical asymptotes, basic shapes). Fluency with trig graphs makes inverse trig and trig equations far easier later.",
    objectives: [
      "Read amplitude (A), period (2π/B), phase shift (−C/B), and vertical shift (D) from y = A sin(Bx + C) + D and apply them",
      "Accurately plot the maxima, minima, zeros, and quarter points of sin and cos graphs",
      "Determine the vertical-asymptote locations and base period (π) of the tan graph and sketch it",
      "Derive the csc, sec, and cot graphs as reciprocals of sin, cos, and tan",
      "Read amplitude, period, and phase shift from a given graph and write the function in the form y = A sin(Bx + C) + D",
    ],
    formulas: [
      "Amplitude: |A|",
      "Period: sin·cos → 2π/|B|,  tan·cot → π/|B|",
      "Phase shift: −C/B  (positive → right, negative → left)",
      "Vertical shift: D",
      "Maximum: D + |A|,  Minimum: D − |A|",
      "tan vertical asymptotes: Bx + C = π/2 + nπ  (n integer)",
      "csc = 1/sin,  sec = 1/cos,  cot = 1/tan",
    ],
    sections: [
      {
        title: "Transforming sin and cos Graphs",
        subtitle: "Each of the four numbers A, B, C, D independently controls one feature of the graph",
        terms: [
          {
            term: "Amplitude",
            def: "|A| in A sin(Bx + C) + D. The maximum distance the graph rises and falls from the midline (y = D). If A is negative, the graph is reflected over the x-axis. Example: y = −3 sin x has amplitude 3 and is the sin graph flipped upside down.",
          },
          {
            term: "Period",
            def: "The change in x needed to complete one full cycle. The base period of sin and cos is 2π, and y = A sin(Bx) has period 2π/|B|. If B > 1 the period shortens (compression), giving faster oscillation; if 0 < B < 1 it lengthens (stretch), giving slower oscillation.",
          },
          {
            term: "Phase shift",
            def: "The horizontal shift in y = A sin(Bx + C), equal to −C/B. Positive shifts right, negative shifts left. Note: factor y = sin(2x − π) as y = sin[2(x − π/2)] to see the phase shift is π/2 (right). Reading C directly and calling the shift π is a common error.",
          },
          {
            term: "Quarter points",
            def: "The points dividing one period into quarters. sin pattern: (0, 0) → (T/4, 1) → (T/2, 0) → (3T/4, −1) → (T, 0). cos: (0, 1) → (T/4, 0) → (T/2, −1) → (3T/4, 0) → (T, 1). On a transformed graph, apply amplitude, phase shift, and vertical shift to these quarter points to plot exact points.",
          },
        ],
        traps: [
          "To find the phase shift you must factor out B first. In y = sin(3x + π) the phase shift is −π/3, not −π. Rewriting as y = sin[3(x + π/3)] makes the shift left π/3 clear. Skipping this step is the most common error on trig-graph problems.",
          "Amplitude is half the distance between maximum and minimum. For a graph with max 5 and min −1, writing amplitude '5' is wrong: amplitude = (5 − (−1))/2 = 3, and the midline is D = (5 + (−1))/2 = 2. Do not confuse amplitude with vertical shift.",
        ],
        example:
          "Find the amplitude, period, phase shift, and vertical shift of y = −2 cos(πx/2 − π/4) + 1 and the quarter points. A = −2, so amplitude = |−2| = 2 (reflected). B = π/2, so period = 2π/(π/2) = 4. Factor: πx/2 − π/4 = (π/2)(x − 1/2), so phase shift = +1/2 (right). D = 1, so vertical shift up 1; midline y = 1. Since A < 0, the cos start (a maximum) becomes a minimum. Quarter points (with phase/vertical shift applied): x = 1/2 → y = 1 − 2 = −1 (min); x = 3/2 → y = 1 (midline); x = 5/2 → y = 1 + 2 = 3 (max); x = 7/2 → y = 1 (midline); x = 9/2 → y = −1 (min).",
      },
      {
        title: "Graphs of tan, csc, sec, cot",
        subtitle: "Reciprocal relationships and vertical asymptotes — know sin/cos and the other four follow automatically",
        terms: [
          {
            term: "Tangent graph",
            def: "Since tan x = sin x / cos x, vertical asymptotes occur where cos x = 0, at x = π/2 + nπ. Base period π (half of sin/cos). Within one period it increases monotonically from −∞ → 0 → +∞; amplitude is undefined. For y = A tan(Bx + C): period = π/|B|, asymptotes at Bx + C = π/2 + nπ.",
          },
          {
            term: "Cosecant & secant graphs",
            def: "csc x = 1/sin x: vertical asymptotes where sin x = 0, at x = nπ. csc has local minima/maxima at sin's maxima/minima and shoots to ±∞ where sin → 0. sec x = 1/cos x: vertical asymptotes where cos x = 0, at x = π/2 + nπ. Both have period 2π.",
          },
          {
            term: "Cotangent graph",
            def: "cot x = cos x / sin x = 1/tan x. Vertical asymptotes where sin x = 0, at x = nπ. Base period π. Unlike tan, within one period it decreases monotonically from +∞ → 0 → −∞. Distinguish tan and cot by opposite asymptote locations and opposite increase/decrease direction.",
          },
        ],
        traps: [
          "Computing tan's vertical asymptotes at π intervals like sin/cos is half right and half wrong. tan's asymptotes are where cos = 0, at x = π/2 + nπ, starting at π/2. They are at x = π/2, 3π/2, 5π/2, … not at x = 0, π, 2π, … so always confirm the π/2 offset when sketching.",
          "Drawing the csc graph directly without the sin graph makes it easy to misplace the asymptotes. Use a two-step approach: lightly draw the sin graph first, then erect vertical asymptotes at sin's zeros and place the csc vertices at sin's peaks and valleys.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u3-l3",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 3,
    lessonNum: 3,
    unitName: "Trigonometry",
    title: "Trig Identities, Equations, and the Laws of Sines & Cosines",
    subtitle: "Identities are transformation tools and the laws solve any triangle — two pillars that complete trigonometry",
    overview:
      "The final unit of trigonometry develops two core abilities. The first is using trig identities to simplify complex expressions or to solve trig equations completely on a given interval. Starting from the Pythagorean identity through the sum/difference and double-angle formulas, you can transform any trig expression into any desired form. The second is applying the law of sines and the law of cosines to find unknown sides and angles in non-right triangles. Together these abilities solve nearly every problem in trigonometry.",
    objectives: [
      "Use the Pythagorean identity (sin²θ + cos²θ = 1) and its variants (1 + tan²θ = sec²θ, etc.) to simplify trig expressions",
      "Apply the sum/difference and double-angle formulas to compute exact values and transform expressions",
      "Solve trig equations on [0, 2π) using reference angles and the ASTC rule to find all solutions",
      "Use the law of sines to solve AAS/ASA/SSA triangles and recognize the ambiguous case",
      "Use the law of cosines to find unknown sides and angles of SAS/SSS triangles",
    ],
    formulas: [
      "Pythagorean: sin²θ + cos²θ = 1,  1 + tan²θ = sec²θ,  1 + cot²θ = csc²θ",
      "Sum: sin(A ± B) = sinA cosB ± cosA sinB",
      "Sum: cos(A ± B) = cosA cosB ∓ sinA sinB",
      "Double-angle: sin 2θ = 2 sinθ cosθ",
      "Double-angle: cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1",
      "Law of sines: a/sinA = b/sinB = c/sinC",
      "Law of cosines: c² = a² + b² − 2ab cosC",
    ],
    sections: [
      {
        title: "Trig Identities and Equations",
        subtitle: "Rewriting one Pythagorean identity in three forms is the starting point of every identity proof",
        terms: [
          {
            term: "Pythagorean identity",
            def: "sin²θ + cos²θ = 1 follows directly from the unit-circle equation x² + y² = 1. Rearranged: sin²θ = 1 − cos²θ, cos²θ = 1 − sin²θ. Dividing by cos²θ gives tan²θ + 1 = sec²θ; dividing by sin²θ gives 1 + cot²θ = csc²θ. Switching freely among these three forms is the key skill in identity proofs.",
          },
          {
            term: "Sum/difference formulas",
            def: "sin(A + B) = sinA cosB + cosA sinB; sin(A − B) = sinA cosB − cosA sinB; cos(A + B) = cosA cosB − sinA sinB; cos(A − B) = cosA cosB + sinA sinB. Tip: sin sum/difference keeps the sign, cos sum/difference flips it. Use to compute exact values of non-standard angles, e.g. sin 75° = sin(45° + 30°).",
          },
          {
            term: "Double-angle formulas",
            def: "sin 2θ = 2 sinθ cosθ. cos 2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1. They derive from the sum formula with A = B = θ. Choose the cos 2θ form to fit the problem: use 1 − 2sin²θ when only sin appears, 2cos²θ − 1 when only cos appears.",
          },
          {
            term: "General solution of a trig equation",
            def: "Because of periodicity, a trig equation has infinitely many solutions. On a given interval like [0, 2π), find all solutions there. Procedure: ① reduce to a single trig function, ② find the reference angle, ③ use ASTC to pick the quadrants, ④ list all solutions.",
          },
        ],
        traps: [
          "Mixing the three forms of cos 2θ causes errors. cos 2θ = cos²θ − sin²θ is correct, but to convert it to 2cos²θ − 1 you must substitute sin²θ = 1 − cos²θ. Exams sometimes plant a wrong form like 'cos 2θ = 2sin²θ − 1' as a distractor, so know the derivation.",
          "Missing solutions on [0, 2π) is common. For sin θ = √3/2, writing only θ = π/3 and omitting θ = 2π/3 is the classic mistake. After finding the reference angle, always check every quadrant where the function is positive — pair Q1 & Q2 (sin positive), Q1 & Q4 (cos positive), Q1 & Q3 (tan positive).",
        ],
        example:
          "Solve 2sin²θ − sinθ − 1 = 0 on [0, 2π). Let u = sinθ: 2u² − u − 1 = 0 → (2u + 1)(u − 1) = 0, so sinθ = −1/2 or sinθ = 1. sinθ = 1: θ = π/2. sinθ = −1/2: sin is negative in Q3 and Q4, reference angle π/6. Q3: θ = π + π/6 = 7π/6. Q4: θ = 2π − π/6 = 11π/6. So θ = π/2, 7π/6, 11π/6 (all within [0, 2π)).",
      },
      {
        title: "The Law of Sines and the Law of Cosines",
        subtitle: "Identify what information is given first — that decides which law to use",
        terms: [
          {
            term: "Law of sines",
            def: "In any triangle ABC, a/sinA = b/sinB = c/sinC. Use it when a side and its opposite angle are given as a pair (AAS, ASA, SSA). For SSA (two sides and a non-included angle) the ambiguous case arises, giving 0, 1, or 2 solutions, so take care.",
          },
          {
            term: "Law of cosines",
            def: "c² = a² + b² − 2ab cosC, a generalization of the Pythagorean theorem. Use it for SAS (two sides and the included angle) or SSS (three sides). To find an angle, rearrange: cosC = (a² + b² − c²)/(2ab). When C = 90°, cosC = 0 and it reduces to the Pythagorean theorem.",
          },
          {
            term: "Ambiguous case (SSA)",
            def: "Given two sides a, b and the angle A opposite a, compute h = b sinA. When A is acute: ① a < h → no solution, ② a = h → right triangle (1 solution), ③ h ≤ a < b → 2 solutions, ④ a ≥ b → 1 solution. For the two-solution case, the second angle is B' = 180° − B.",
          },
        ],
        traps: [
          "Trying to use the law of sines for an SAS configuration stalls. With the included angle given (SAS), no complete side/opposite-angle pair exists, so the law of sines cannot start. Use the law of cosines to find the third side first, then the law of sines for the angles. Classifying the given information first is the key habit.",
          "In the ambiguous case, forgetting the second solution when two exist is common. Solving sin B = k and writing only B = arcsin(k) is half an answer. Check whether B' = 180° − B can also be a triangle's angle (i.e. A + B' < 180°); if so, present the second solution.",
        ],
        example:
          "In triangle ABC with a = 7, b = 10, A = 35°, find all possibilities (SSA ambiguous case). h = b sinA = 10 sin 35° ≈ 5.736. Since a = 7 > h ≈ 5.736 and a = 7 < b = 10, there are 2 solutions. Law of sines: sinB = b sinA / a = 10 sin 35° / 7 ≈ 0.8194. B₁ = arcsin(0.8194) ≈ 55.0°. B₂ = 180° − 55.0° = 125.0°. Case 1: C₁ = 180° − 35° − 55° = 90°, c₁ = a sinC₁ / sinA = 7 sin 90° / sin 35° ≈ 12.2. Case 2: C₂ = 180° − 35° − 125° = 20°, c₂ = 7 sin 20° / sin 35° ≈ 4.2. Both triangles are valid.",
      },
    ],
  },
];
