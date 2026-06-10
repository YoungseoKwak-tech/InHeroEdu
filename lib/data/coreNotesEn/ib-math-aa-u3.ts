/**
 * Core Notes English version — IB Math AA Unit 3 (Trigonometry).
 * Full content preserved (objectives · terms · traps · example · formulas).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AA_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-math-aa-u3-l1",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 3,
    lessonNum: 1,
    unitName: "Trigonometry",
    title: "Radian Measure, Arc Length & Sector Area, the Unit Circle and Exact Trigonometric Values",
    subtitle: "The moment you view an angle as a 'ratio of arc length to radius,' every trigonometric formula connects naturally",
    overview:
      "The first key to IB AA trigonometry is switching the unit of angle from degrees to radians. A radian has the geometric definition of 'the angle that subtends an arc equal in length to the radius,' which means the arc length formula l = rθ and the sector area formula A = ½r²θ each follow from a single multiplication. Drawing the unit circle (radius 1) on the coordinate plane then makes cosθ and sinθ simply the x- and y-coordinates of the corresponding point, so the exact values of the special angles can be derived rather than memorised by rote. Because Paper 1 is non-calculator and requires these exact values, a thorough understanding of the unit circle is central to scoring well.",
    objectives: [
      "Apply the conversion formula between radians and degrees, and convert key angles such as π/6, π/4, π/3, and π/2 fluently in both directions",
      "Use the arc length formula l = rθ and the sector area formula A = ½r²θ (θ in radians) to calculate unknown quantities",
      "Determine the sign of sinθ, cosθ, and tanθ in each quadrant from the unit-circle point (cosθ, sinθ)",
      "Obtain exact trigonometric values at θ = 0, π/6, π/4, π/3, π/2 (and the corresponding 0°, 30°, 45°, 60°, 90°) without a calculator",
      "Use reference angles to reduce the trigonometric ratio of any angle θ to its first-quadrant equivalent",
    ],
    formulas: [
      "Radians ↔ degrees: θ(rad) = θ(°) × π/180,  θ(°) = θ(rad) × 180/π",
      "Arc length: l = rθ  (θ in radians)",
      "Sector area: A = ½r²θ  (θ in radians)",
      "Unit circle definition: (cosθ, sinθ) is the point on the unit circle at angle θ",
      "tanθ = sinθ / cosθ",
      "sin(π/6) = ½,  cos(π/6) = √3/2,  tan(π/6) = 1/√3 = √3/3",
      "sin(π/4) = √2/2,  cos(π/4) = √2/2,  tan(π/4) = 1",
      "sin(π/3) = √3/2,  cos(π/3) = ½,  tan(π/3) = √3",
    ],
    sections: [
      {
        title: "Radian Measure, Arc Length & Sector Area",
        subtitle: "The single line l = rθ connects radius, angle, and arc length all at once",
        terms: [
          {
            term: "Radian",
            def: "The central angle in a circle of radius r at which the arc length equals r. 1 rad ≈ 57.3°. Because one full circle subtends 2π rad = 360°, we have π rad = 180°. Radians are dimensionless numbers, which makes them far more natural than degrees when differentiating or integrating trigonometric functions.",
          },
          {
            term: "Arc length",
            def: "l = rθ (θ in radians). The length of the arc corresponding to central angle θ in a circle of radius r. If θ is given in degrees, you must convert it to radians before substituting.",
          },
          {
            term: "Sector area",
            def: "A = ½r²θ (θ in radians). This is equivalent to taking the fraction θ/(2π) of the full circle area πr². Together with arc length, it forms the classic IB problem type 'given any two of radius, angle, and arc/area, find the third.'",
          },
          {
            term: "Segment area",
            def: "Sector area minus triangle area: A_segment = ½r²(θ − sinθ). This applied formula appears frequently in both IB Paper 1 and Paper 2.",
          },
        ],
        traps: [
          "In the formulas l = rθ and A = ½r²θ, θ must be in radians. It is very common to substitute 120 directly when the problem states '120°' without first converting to θ = 2π/3. Make it a habit to convert any angle given in degrees to radians before doing anything else.",
          "When finding segment area, some students calculate the triangle area as ½ × base × height separately rather than using ½r²sinθ, which leads to errors. Remembering ½r²sinθ as a single block lets you write A_segment = ½r²θ − ½r²sinθ = ½r²(θ − sinθ) immediately.",
        ],
        example:
          "Find the arc length and sector area of a sector with radius 8 cm and central angle 210°. First convert to radians: θ = 210 × π/180 = 7π/6. Arc length: l = rθ = 8 × 7π/6 = 28π/3 cm. Sector area: A = ½r²θ = ½ × 64 × 7π/6 = 224π/6 = 112π/3 cm². Verification: the full circumference is 16π ≈ 50.3 cm, and 28π/3 ≈ 29.3 cm is approximately 210/360 ≈ 58.3% of the full circumference, which is consistent.",
      },
      {
        title: "The Unit Circle & Exact Trigonometric Values",
        subtitle: "Draw the unit circle coordinates once and you will never need to memorise special-angle values again",
        terms: [
          {
            term: "Unit circle",
            def: "A circle centred at the origin with radius 1. The coordinates of the point corresponding to angle θ are defined as (cosθ, sinθ). Because the radius is 1, the ratio definitions of the trigonometric functions (opposite/hypotenuse, etc.) coincide exactly with the coordinates, giving the simplest possible form.",
          },
          {
            term: "CAST rule (quadrant sign rule)",
            def: "Quadrant I: sin, cos, and tan are all positive. Quadrant II: sin only is positive. Quadrant III: tan only is positive. Quadrant IV: cos only is positive. The acronym CAST (reading quadrants IV → I → II → III) serves as a memory aid, or you can verify signs directly from the coordinates.",
          },
          {
            term: "Reference angle",
            def: "The acute angle between an arbitrary angle θ and the x-axis, used to reduce trigonometric ratios in quadrants II, III, and IV to first-quadrant values. For example, the reference angle of θ = 5π/6 is π − 5π/6 = π/6.",
          },
          {
            term: "Cotangent, secant, and cosecant (cotθ, secθ, cscθ)",
            def: "cotθ = cosθ/sinθ = 1/tanθ, secθ = 1/cosθ, cscθ = 1/sinθ. These are not included in the IB AA SL formula booklet, so you must be able to apply their reciprocal relationships automatically.",
          },
        ],
        traps: [
          "Students sometimes forget that tan(π/2) is undefined and are confused by a calculator error message. At angles where cosθ = 0 (e.g. π/2, 3π/2), tanθ = sinθ/cosθ has a zero denominator and is undefined. Always check whether cosθ = 0 before computing tanθ on Paper 1.",
          "Finding negative angles (e.g. θ = −π/3) or angles greater than 2π (e.g. θ = 7π/4) on the unit circle can cause directional confusion. Negative angles travel clockwise; angles beyond 2π represent one or more extra full rotations. Using sin(−θ) = −sinθ and cos(−θ) = cosθ lets you adjust the sign quickly without re-drawing the circle.",
        ],
        example:
          "Find the exact values of sinθ, cosθ, and tanθ for θ = 5π/3. Since 3π/2 < 5π/3 < 2π, the angle lies in quadrant IV. Reference angle: 2π − 5π/3 = π/3. First-quadrant values: sin(π/3) = √3/2, cos(π/3) = ½. By the CAST rule, sin < 0 and cos > 0 in quadrant IV. Therefore sin(5π/3) = −√3/2, cos(5π/3) = ½, and tan(5π/3) = (−√3/2)/(½) = −√3. Verification: tan < 0 in quadrant IV, so the sign is correct ✓.",
      },
      {
        title: "Transformations of Trigonometric Graphs",
        subtitle: "Amplitude, period, and phase shift are the three parameters that completely determine a trigonometric graph",
        terms: [
          {
            term: "Amplitude",
            def: "In y = A sin(Bx + C) + D, the amplitude is |A|. It is half the distance between the maximum and minimum values of the graph. If A < 0, the graph is reflected in the x-axis.",
          },
          {
            term: "Period",
            def: "T = 2π/|B| for sine and cosine; T = π/|B| for tangent. A larger value of B produces a shorter period, causing the graph to oscillate more rapidly.",
          },
          {
            term: "Phase shift",
            def: "Written in the form y = A sin(B(x − C)) + D, the horizontal translation is C. C > 0 shifts the graph to the right; C < 0 shifts it to the left. To find the phase shift of y = sin(2x + π/3), first factorise: y = sin(2(x + π/6)), revealing a shift of π/6 to the left.",
          },
          {
            term: "Vertical shift and midline",
            def: "In y = A sin(Bx) + D, the constant D translates the graph vertically. The midline is y = D. Maximum value = D + |A|; minimum value = D − |A|.",
          },
        ],
        traps: [
          "A very common error is reading the phase shift of y = sin(2x + π/3) as 'C = π/3, so shift right by π/3.' You must first factorise to get y = sin(2(x + π/6)) to see that the shift is π/6 to the left. Always factor out B before identifying the phase shift.",
          "Students sometimes confuse the period formula for sin/cos (2π/B) with that for tan (π/B). The reason tan has a shorter period is that it completes one cycle every π radians. When sketching a tan graph, note that vertical asymptotes appear at every half-period.",
        ],
        example:
          "Find the amplitude, period, phase shift, midline, maximum, and minimum of f(x) = 3 sin(2x − π/2) + 1. Factorise: f(x) = 3 sin(2(x − π/4)) + 1. Amplitude: |3| = 3. Period: 2π/2 = π. Phase shift: π/4 to the right. Midline: y = 1. Maximum: 1 + 3 = 4 (at x = π/4 + πk). Minimum: 1 − 3 = −2 (at x = 3π/4 + πk). The graph is y = sinx scaled vertically by a factor of 3, shifted right by π/4, and shifted up by 1.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u3-l2",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 3,
    lessonNum: 2,
    unitName: "Trigonometry",
    title: "Pythagorean Identities, Double Angle Formulae, and Solving Trigonometric Equations",
    subtitle: "Every trigonometric formula branches from the single identity sin²θ + cos²θ = 1",
    overview:
      "The second layer of trigonometry is identities. The Pythagorean identity sin²θ + cos²θ = 1 is a direct consequence of the unit-circle definition, yet rearranging it produces dozens of transformations such as 1 − sin²θ = cos²θ and 1 − cos²θ = sin²θ. The double angle formulae are essential not only in Paper 2 calculations but also in the proof questions that appear on Paper 1. The method for solving trigonometric equations boils down to a three-step routine: use identities to reduce the equation to a single trigonometric function, write the general solution, then extract the specific solutions within the given domain.",
    objectives: [
      "Prove and apply the Pythagorean identity sin²θ + cos²θ = 1, as well as the derived forms 1 + tan²θ = sec²θ and 1 + cot²θ = csc²θ",
      "Recall the double angle formula sin(2θ) = 2 sinθ cosθ and all three forms of cos(2θ), selecting the appropriate form for each context",
      "Find all solutions of sinθ = k, cosθ = k, and tanθ = k within a given domain without omitting any",
      "Use double angle and Pythagorean identities to convert higher-degree trigonometric equations into single-function equations",
      "In identity proof questions, transform one side step by step until it matches the other side",
    ],
    formulas: [
      "sin²θ + cos²θ = 1",
      "1 + tan²θ = sec²θ",
      "1 + cot²θ = csc²θ",
      "sin(2θ) = 2 sinθ cosθ",
      "cos(2θ) = cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ",
      "tan(2θ) = 2tanθ / (1 − tan²θ)",
      "sinθ = k → θ = arcsin(k) + 2πn  or  θ = π − arcsin(k) + 2πn",
      "cosθ = k → θ = ±arccos(k) + 2πn",
      "tanθ = k → θ = arctan(k) + πn",
    ],
    sections: [
      {
        title: "Pythagorean Identity & Derived Forms",
        subtitle: "Rearranging sin²θ + cos²θ = 1 in three directions yields both sec² and csc²",
        terms: [
          {
            term: "Pythagorean identity",
            def: "sin²θ + cos²θ = 1. The point (cosθ, sinθ) on the unit circle is at distance 1 from the origin — this is exactly the Pythagorean theorem. It is the starting point for proving every trigonometric identity.",
          },
          {
            term: "Secant–tangent identity",
            def: "Dividing sin²θ + cos²θ = 1 through by cos²θ gives tan²θ + 1 = sec²θ. Use this to replace expressions involving cos²θ with sec²θ, or vice versa.",
          },
          {
            term: "Cosecant–cotangent identity",
            def: "Dividing sin²θ + cos²θ = 1 through by sin²θ gives 1 + cot²θ = csc²θ. This is the key tool for simplifying complicated expressions in which sinθ appears in the denominator.",
          },
          {
            term: "Proof strategy",
            def: "The standard approach is to manipulate the more complex side (LHS or RHS) until it matches the simpler side. Manipulating both sides simultaneously will lose marks in IB. Start by combining fractions if present, or by lowering double angles to single angles using identities.",
          },
        ],
        traps: [
          "In identity proofs, assuming 'LHS = RHS' and applying the same operation to both sides results in mark deductions. You must work in one direction only, in the form LHS = ... = ... = RHS. Explicitly writing '∴ LHS = RHS' at the end is also required for full marks in IB.",
          "Writing sin²θ as sinθ² is a notation error that appears in Paper 1 extended-response work. Note that sin²θ = (sinθ)², not sin(θ²). Always use parentheses accurately in IB answer booklets.",
        ],
        example:
          "Prove the identity (1 − cos²θ)/sinθ = sinθ. LHS = (1 − cos²θ)/sinθ. By the Pythagorean identity, 1 − cos²θ = sin²θ, so LHS = sin²θ/sinθ = sinθ (provided sinθ ≠ 0). Therefore LHS = RHS = sinθ. ∴ The identity holds. (When sinθ = 0 the original LHS is undefined, so no separate case is needed.)",
      },
      {
        title: "Double Angle Formulae",
        subtitle: "The context of the equation determines which of the three forms of cos(2θ) to use",
        terms: [
          {
            term: "sin(2θ) formula",
            def: "sin(2θ) = 2 sinθ cosθ. Use this to combine a product of sin and cos into a single double angle expression. The reverse direction, sinθ cosθ = ½ sin(2θ), is frequently used in integration.",
          },
          {
            term: "Three forms of cos(2θ)",
            def: "cos(2θ) = cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ. The choice among the three forms depends on which trigonometric function already appears in the equation or proof. If only sin is present, use 1 − 2sin²θ; if only cos is present, use 2cos²θ − 1.",
          },
          {
            term: "Half-angle identities",
            def: "From cos(2θ) = 1 − 2sin²θ: sin²θ = (1 − cos2θ)/2. From cos(2θ) = 2cos²θ − 1: cos²θ = (1 + cos2θ)/2. These are essential in IB HL integration when converting sin²θ or cos²θ into an integrable form.",
          },
          {
            term: "Strategy for solving double angle equations",
            def: "For equations of the form sin(2θ) = k, write 2θ = α or π − α + 2πn, then divide by 2 at the very end to get θ = α/2. The key step is to double the domain of θ first, working with 2θ throughout.",
          },
        ],
        traps: [
          "When solving sin(2θ) = k, using the domain for θ instead of doubling it first means you will find only half the solutions. For example, if 0 ≤ θ < 2π then 2θ ranges over 0 ≤ 2θ < 4π. Find all solutions in that extended range, then divide by 2 to obtain the complete solution set for θ.",
          "Wasting time by trying all three forms of cos(2θ) without knowing which to choose is a common inefficiency. If the equation already contains sin, select 1 − 2sin²θ to produce a single-variable equation in sin. Making this selection instinctive will save considerable time on Paper 1.",
        ],
        example:
          "Solve cos(2θ) + 3cosθ + 2 = 0 for 0 ≤ θ ≤ 2π. The equation contains only cos, so use cos(2θ) = 2cos²θ − 1. Substituting: 2cos²θ − 1 + 3cosθ + 2 = 0 → 2cos²θ + 3cosθ + 1 = 0. Factorising: (2cosθ + 1)(cosθ + 1) = 0. So cosθ = −½ or cosθ = −1. cosθ = −½: θ = 2π/3, 4π/3. cosθ = −1: θ = π. Therefore θ ∈ {2π/3, π, 4π/3}. Verification: substitute each value back into the original equation.",
      },
      {
        title: "Solving Trigonometric Equations",
        subtitle: "The two-step routine — general solution then domain restriction — guarantees no solutions are missed",
        terms: [
          {
            term: "General solution",
            def: "sinθ = k: θ = arcsin(k) + 2πn or θ = π − arcsin(k) + 2πn (n ∈ ℤ). cosθ = k: θ = ±arccos(k) + 2πn. tanθ = k: θ = arctan(k) + πn. Write the general solution first, then substitute integer values of n to extract all solutions within the specified domain.",
          },
          {
            term: "Using the unit circle to count solutions",
            def: "sinθ = k corresponds to the intersections of the horizontal line y = k with the unit circle (typically 2 solutions for 0 ≤ θ < 2π). cosθ = k corresponds to the vertical line x = k. Understanding this geometrically helps verify the expected number of solutions before calculating.",
          },
          {
            term: "Equations involving multiple angles (2θ, nθ)",
            def: "To solve sin(nθ) = k: write nθ = α + 2πm or nθ = π − α + 2πm, then if 0 ≤ θ < 2π extend the domain to 0 ≤ nθ < 2nπ. Divide by n at the end to find all values of θ.",
          },
          {
            term: "Quadratic trigonometric equations",
            def: "An equation such as 2sin²θ − sinθ − 1 = 0 becomes the standard quadratic 2u² − u − 1 = 0 under the substitution u = sinθ. After factorising, only values with |u| ≤ 1 are valid.",
          },
        ],
        traps: [
          "Finding only one solution (the arcsin) for sinθ = k and stopping is the single most common source of lost marks on both Paper 1 and Paper 2. Train yourself to mark both solutions on a unit circle diagram — the second solution is always π − (first solution). Keep this as a permanent checklist item.",
          "After quadratic substitution, treating |u| > 1 values (e.g. sinθ = 2) as valid solutions is a mistake. Since sinθ and cosθ are restricted to [−1, 1], any |u| > 1 result must be rejected, and you should explicitly write 'no solution' for that case to avoid mark deductions in IB.",
        ],
        example:
          "Solve 2sin²θ − sinθ − 1 = 0 for 0 ≤ θ < 2π. Substitute u = sinθ: 2u² − u − 1 = 0. Factorising: (2u + 1)(u − 1) = 0. So u = −½ or u = 1. sinθ = −½: reference angle = π/6; sin is negative in quadrants III and IV, giving θ = π + π/6 = 7π/6 and θ = 2π − π/6 = 11π/6. sinθ = 1: θ = π/2. Therefore θ ∈ {π/2, 7π/6, 11π/6}. Verification: substitute each value into the original equation to confirm.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u3-l3",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 3,
    lessonNum: 3,
    unitName: "Trigonometry",
    title: "The Sine Rule, the Cosine Rule, and Triangle Area",
    subtitle: "Viewing a triangle as 'three known quantities → find the rest' makes the choice of rule automatic",
    overview:
      "The sine rule and the cosine rule are the essential tools for working with non-right triangles. IB AA Paper 2 always allows a calculator, but no calculator can replace the ability to decide immediately which rule to use. Use the sine rule when a side and its opposite angle are given as a matched pair; use the cosine rule when all three sides or two sides and the included angle are known. The area formula ½ab sinC is a powerful shortcut that yields the area of a triangle from two sides and the included angle without first finding the height. The ambiguous case (SSA) is a point many students miss: whenever the sine rule is used in reverse, the second possible solution must always be checked.",
    objectives: [
      "Apply the sine rule a/sinA = b/sinB = c/sinC to find unknown sides or angles in non-right triangles",
      "Recognise the ambiguous case (SSA) and handle both possible triangles",
      "Use the cosine rule c² = a² + b² − 2ab cosC (and the rearranged form cosC = (a² + b² − c²)/(2ab)) to find sides or angles",
      "Calculate the area of a triangle given two sides and the included angle using Area = ½ab sinC",
      "Select the appropriate rule for real-world problems (surveying, navigation, 3D geometry) and develop the solution step by step",
    ],
    formulas: [
      "Sine rule: a/sinA = b/sinB = c/sinC",
      "Cosine rule (finding a side): c² = a² + b² − 2ab cosC",
      "Cosine rule (finding an angle): cosC = (a² + b² − c²) / (2ab)",
      "Triangle area: Area = ½ab sinC",
      "Heron's formula: Area = √(s(s−a)(s−b)(s−c)),  s = (a+b+c)/2",
    ],
    sections: [
      {
        title: "The Sine Rule & the Ambiguous Case",
        subtitle: "The inverse sine produces two answers — failing to check both will cost marks",
        terms: [
          {
            term: "Sine rule",
            def: "a/sinA = b/sinB = c/sinC (= 2R, where R is the circumradius). Use it when a side and its opposite angle form a matched pair. It is the natural first choice under AAS, ASA, or SSA conditions.",
          },
          {
            term: "Ambiguous case (SSA)",
            def: "When two sides a, b and the angle A opposite side a are given, sinB = b sinA / a may yield two values (B and π − B), so zero, one, or two triangles can exist. If B < 90° and a < b, two triangles are possible. IB frequently asks you to 'find all possible triangles' in this scenario.",
          },
          {
            term: "Reverse application of the sine rule",
            def: "After computing sinB, the two candidates B = arcsin(value) and B = π − arcsin(value) must both be tested; only values for which the interior angles of the triangle sum to less than 180° are valid. Presenting both candidates and verifying each is the routine for full marks in IB.",
          },
          {
            term: "Circumradius R",
            def: "a/sinA = 2R. In IB HL, questions may require you to prove or calculate results linking the circumradius and the sine rule. Combining the area formula with the circumradius gives Area = abc/(4R).",
          },
        ],
        traps: [
          "When finding an angle with the sine rule, taking only arcsin and not checking π − arcsin causes you to miss an entire triangle in the ambiguous case. Even when the problem does not explicitly say 'find all possible triangles,' train yourself to investigate both cases automatically whenever SSA conditions appear.",
          "If sinB > 1, you must explicitly state 'no solution.' When sinB = 1.2 or a similarly out-of-range value causes a calculator ERROR, do not interpret this as a calculator malfunction — it means no triangle satisfying the given conditions exists.",
        ],
        example:
          "In triangle ABC, a = 8, b = 10, and A = 35°. Find all possible triangles. Sine rule: sinB/b = sinA/a → sinB = 10 × sin35°/8 ≈ 10 × 0.5736/8 ≈ 0.7170. B = arcsin(0.7170) ≈ 45.8° or B = 180° − 45.8° = 134.2°. Case 1: B ≈ 45.8° gives C = 180° − 35° − 45.8° = 99.2° > 0° → valid. Case 2: B ≈ 134.2° gives C = 180° − 35° − 134.2° = 10.8° > 0° → valid. Both triangles exist. Side c in each case: c = 8 × sin(99.2°)/sin(35°) ≈ 13.8 and c = 8 × sin(10.8°)/sin(35°) ≈ 2.6.",
      },
      {
        title: "The Cosine Rule",
        subtitle: "When all three sides are known, or two sides and the included angle, the cosine rule is the answer",
        terms: [
          {
            term: "Cosine rule — finding a side",
            def: "c² = a² + b² − 2ab cosC. This is the generalisation of the Pythagorean theorem; setting C = 90° gives cosC = 0 and hence c² = a² + b². Use it under the SAS condition (two sides and the included angle) to find the third side.",
          },
          {
            term: "Cosine rule — finding an angle (reverse form)",
            def: "cosC = (a² + b² − c²)/(2ab). Use this under the SSS condition (all three sides known) to find any angle. Because the range of cos⁻¹ is [0°, 180°], there is no ambiguous case here.",
          },
          {
            term: "Choosing between the cosine rule and the sine rule",
            def: "SAS (two sides and included angle) → cosine rule (find the third side). SSS (all three sides) → cosine rule (find an angle). ASA, AAS, SAA → sine rule. SSA → sine rule (watch for the ambiguous case). Keep this four-case decision tree in mind as a flowchart.",
          },
          {
            term: "Heron's formula",
            def: "When all three sides a, b, c are known: s = (a+b+c)/2, Area = √(s(s−a)(s−b)(s−c)). In IB this is more often used as a verification tool than as the primary method.",
          },
        ],
        traps: [
          "Writing '+ 2ab cosC' instead of '− 2ab cosC' in the cosine rule is an error that appears consistently even on Paper 2. When C is obtuse, cosC < 0, so −2ab cosC > 0 — the side c can appear larger than a² + b², which is geometrically correct. If in doubt, check that C = 90° reduces the formula to c² = a² + b².",
          "After finding cosC, a negative GDC result for cos⁻¹ means C is obtuse (90° < C < 180°). The IB GDC outputs cos⁻¹ directly in the range [0°, 180°], but if you are computing by hand be sure not to overlook the obtuse possibility.",
        ],
        example:
          "In triangle PQR, PQ = 7, QR = 9, and angle Q = 120°. Find side PR and angle P. Cosine rule for PR: PR² = PQ² + QR² − 2·PQ·QR·cosQ = 49 + 81 − 2·7·9·cos120° = 130 − 126·(−½) = 130 + 63 = 193. PR = √193 ≈ 13.89. Sine rule for angle P: sinP/QR = sinQ/PR → sinP = 9·sin120°/√193 = 9·(√3/2)/√193 ≈ 7.794/13.89 ≈ 0.5612. P ≈ arcsin(0.5612) ≈ 34.2°. (Since Q = 120°, angle P must be acute, so the second arcsin solution is unnecessary.)",
      },
      {
        title: "Triangle Area & Applications",
        subtitle: "½ab sinC is the most elegant tool for finding area when the height is unknown",
        terms: [
          {
            term: "Triangle area formula (Area = ½ab sinC)",
            def: "Given two sides a, b and their included angle C, Area = ½ab sinC. No height calculation is required. When C = 90°, sinC = 1 and the formula reduces to ½ab, the familiar right-triangle result.",
          },
          {
            term: "3D trigonometry",
            def: "In 3D figures such as cuboids, square-based pyramids, and triangular prisms, you identify a triangle containing the face diagonal or space diagonal, extract it as a 2D cross-section, and then apply the sine or cosine rule. This is a guaranteed application topic in IB Paper 2.",
          },
          {
            term: "Bearing and surveying problems",
            def: "A bearing is an angle measured clockwise from north, expressed as a three-digit number (000°–360°). The interior angles of the triangle you form do not follow directly from the bearing values — auxiliary angle calculations are needed to find them.",
          },
          {
            term: "Combined problems",
            def: "Chain problems in IB HL Paper 2 typically require the sine rule → cosine rule → area formula applied in sequence within a single question. Do not round intermediate results; carry the full exact value (stored in the GDC) into each subsequent step.",
          },
        ],
        traps: [
          "Using an angle that is not the included angle in Area = ½ab sinC is a frequent error. The angle C must be the one formed between sides a and b. Draw and label the triangle, then verify that 'sides a and b share angle C' before substituting.",
          "In chain problems, rounding intermediate values (e.g. replacing √193 with 13.9 prematurely) causes accumulated rounding error by the final answer. IB requires the final answer rounded to three significant figures, but intermediate calculations must use the exact values stored in the GDC. Make 'no intermediate rounding' a fixed part of your solving routine.",
        ],
        example:
          "In quadrilateral ABCD, AB = 6, BC = 8, CD = 5, DA = 7, and angle ABC = 100°. Find diagonal AC, then find the area of triangle ACD. Step 1 — cosine rule in triangle ABC: AC² = 36 + 64 − 2·6·8·cos100° = 100 − 96·(−0.1736) ≈ 100 + 16.67 ≈ 116.67, so AC ≈ 10.80. Step 2 — cosine rule in triangle ACD: cosCAD = (AC² + DA² − CD²)/(2·AC·DA) = (116.67 + 49 − 25)/(2·10.80·7) ≈ 140.67/151.2 ≈ 0.9302, giving angle CAD ≈ 21.5°. Step 3 — area: Area(ACD) = ½·AC·DA·sinCAD = ½·10.80·7·sin21.5° ≈ ½·75.6·0.3665 ≈ 13.85. Use the exact value of AC (stored as √116.67… in the GDC) throughout to minimise rounding error.",
      },
    ],
  },
];
