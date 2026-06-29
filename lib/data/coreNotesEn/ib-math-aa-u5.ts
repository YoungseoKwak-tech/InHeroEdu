/**
 * Core Notes English version — IB Math AA Unit 5 (Calculus).
 * Full content preserved (objectives · terms · traps · example · formulas).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AA_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-math-aa-u5-l1",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 5,
    lessonNum: 1,
    unitName: "Calculus",
    title: "Limits, Differentiation from First Principles, and Differentiation Rules: Polynomials, Trigonometric, Exponential, and Logarithmic Functions",
    subtitle: "Differentiation is capturing the 'instantaneous rate of change' as a formula, and first principles is that definition itself",
    overview:
      "The starting point of IB AA calculus is the limit. The question 'as x gets arbitrarily close to a, what value does f(x) get arbitrarily close to?' is the foundation of differentiation. First principles defines the instantaneous rate of change — the derivative — as the limit of the average rate of change: f'(x) = lim_{h→0} [f(x+h)−f(x)]/h. Once you firmly understand this definition, you realise that every subsequent differentiation rule is simply 'a shortcut so you don't have to compute this every time.' IB Paper 1 tests the first-principles derivation and conceptual understanding of the rules, while Paper 2 tests your ability to apply the rules to composite functions together with the GDC.",
    objectives: [
      "Explain the concept of a limit intuitively, and use first principles f'(x) = lim_{h→0} [f(x+h)−f(x)]/h to derive the derivative of a polynomial function",
      "Apply the power rule d/dx(xⁿ) = nxⁿ⁻¹ to integer, fractional, and negative exponents alike, and use the constant-multiple, sum, and difference rules of differentiation",
      "Use the chain rule dy/dx = dy/du · du/dx to differentiate composite functions",
      "Apply the product rule d/dx[uv] = u'v + uv' and the quotient rule d/dx[u/v] = (u'v − uv')/v²",
      "Memorise the derivatives of the standard functions sin x, cos x, tan x, eˣ, ln x, and combine them with the differentiation rules to differentiate composite functions",
    ],
    formulas: [
      "First principles: f'(x) = lim_{h→0} [f(x+h) − f(x)] / h",
      "Power rule: d/dx(xⁿ) = nxⁿ⁻¹",
      "Chain rule: dy/dx = dy/du · du/dx  (y = f(u), u = g(x))",
      "Product rule: d/dx[uv] = u'v + uv'",
      "Quotient rule: d/dx[u/v] = (u'v − uv') / v²",
      "d/dx(sin x) = cos x,  d/dx(cos x) = −sin x,  d/dx(tan x) = sec²x",
      "d/dx(eˣ) = eˣ,  d/dx(eᵃˣ) = aeᵃˣ,  d/dx(ln x) = 1/x",
    ],
    sections: [
      {
        title: "Limits & Differentiation from First Principles",
        subtitle: "Anyone who has never worked through first principles by hand will never truly know why the differentiation rules hold",
        terms: [
          {
            term: "Limit",
            def: "lim_{x→a} f(x) = L means 'as x approaches a, f(x) approaches L.' A limit can exist even if f(a) is undefined at x = a. Because differentiation is a limiting process as h → 0, you must understand the concept of a limit clearly. IB does not require a rigorous ε-δ proof, but the intuition of 'getting sufficiently close' is essential.",
          },
          {
            term: "Derivative",
            def: "f'(x) = lim_{h→0} [f(x+h) − f(x)] / h. It is the instantaneous rate of change of f at the point x, and on the graph it is the gradient of the tangent at that point. f'(x), dy/dx, and Df(x) are all the same notation. Choose between the prime notation f'(x) and the Leibniz notation dy/dx according to context.",
          },
          {
            term: "Differentiability",
            def: "For a function to be differentiable at x = a, it must be continuous there and the left- and right-hand derivatives must be equal. Differentiation fails at corners, points of discontinuity, and vertical tangents. IB HL includes questions asking about the non-differentiability of functions like |x| at x = 0.",
          },
          {
            term: "Applying first principles",
            def: "Steps: ① expand f(x+h) → ② compute f(x+h) − f(x) (h cancels) → ③ take h → 0. If f(x) = x², then f(x+h) = x²+2xh+h², the difference = 2xh+h² = h(2x+h), dividing by h gives 2x+h, and as h → 0, f'(x) = 2x. Paper 1 sets these as f(x) = xⁿ (n = 2, 3) or f(x) = 1/x.",
          },
        ],
        traps: [
          "In first-principles calculations, expanding (x+h)² incorrectly as x²+h² when expanding f(x+h) is a very common error. Always expand (x+h)² = x²+2xh+h² and (x+h)³ = x³+3x²h+3xh²+h³. Without the middle terms 2xh and 3x²h, the h does not cancel and you cannot take the limit.",
          "You must apply lim_{h→0} 'only at step ③,' yet some students substitute h = 0 from the start, making both numerator and denominator zero. Keep the lim symbol until h cancels, and only substitute h = 0 after cancellation.",
        ],
        example:
          "Differentiate f(x) = x³ from first principles. f(x+h) = (x+h)³ = x³ + 3x²h + 3xh² + h³. f(x+h) − f(x) = 3x²h + 3xh² + h³ = h(3x² + 3xh + h²). [f(x+h)−f(x)]/h = 3x² + 3xh + h². lim_{h→0} (3x² + 3xh + h²) = 3x². Therefore f'(x) = 3x². Verification: this agrees with the power rule d/dx(x³) = 3x². On Paper 1, writing out this process clearly step by step secures both the Method and Answer marks.",
      },
      {
        title: "Differentiation Rules & Standard Derivatives",
        subtitle: "Remember the chain rule as the single line 'outer derivative × inner derivative' and no composite function will defeat you",
        terms: [
          {
            term: "Power, sum & difference rules",
            def: "d/dx(xⁿ) = nxⁿ⁻¹ (applies to all real n). d/dx(cf(x)) = cf'(x), d/dx[f(x) ± g(x)] = f'(x) ± g'(x). Fractional exponent: d/dx(√x) = d/dx(x^{1/2}) = (1/2)x^{-1/2} = 1/(2√x). Negative exponent: d/dx(1/x) = d/dx(x⁻¹) = −x⁻² = −1/x².",
          },
          {
            term: "Chain rule",
            def: "If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x). Writing u = g(x), dy/dx = dy/du · du/dx. 'Differentiate the outer function leaving the inside as is, then multiply by the derivative of the inner function.' Example: d/dx(sin(3x)) = cos(3x) · 3 = 3cos(3x). However many layers of composition there are, apply it from the outside inward in turn.",
          },
          {
            term: "Product & quotient rules",
            def: "Product: (uv)' = u'v + uv'. Order: 'first' derivative × second + first × 'second' derivative. Quotient: (u/v)' = (u'v − uv')/v². Watch the sign: the order of subtraction in the numerator is always 'numerator-derivative × denominator − numerator × denominator-derivative.' Try differentiating tan x = sin x / cos x with the quotient rule yourself to derive sec²x.",
          },
          {
            term: "Standard function derivatives",
            def: "sin x → cos x, cos x → −sin x, tan x → sec²x = 1/cos²x. eˣ → eˣ (itself), eᵃˣ → aeᵃˣ. ln x → 1/x (x > 0). aˣ → aˣ ln a. This list is included in the IB exam formula booklet, but composite forms combined with the chain rule must be computed yourself.",
          },
        ],
        traps: [
          "Omitting the 'inner-function derivative' in the chain rule is the most frequent mistake. You cannot simply write d/dx(e^{x²}) as e^{x²}. You must multiply by the derivative 2x of the inner function x², so d/dx(e^{x²}) = 2x·e^{x²} is correct. Whenever you see a composite function, ask yourself 'is there an inner function? did I multiply by its derivative?'",
          "Flipping the sign in the numerator of the quotient rule is a frequent error. In (u/v)' = (u'v − uv')/v², the order of subtraction is fixed. Writing u'v − uv' as uv' − u'v reverses the sign and is wrong. When writing the numerator, keep the order 'numerator derivative first.'",
        ],
        example:
          "Differentiate h(x) = x² · e^{3x}. Product rule: u = x², v = e^{3x}. u' = 2x, v' = 3e^{3x} (chain rule). h'(x) = 2x · e^{3x} + x² · 3e^{3x} = e^{3x}(2x + 3x²) = xe^{3x}(2 + 3x). Now differentiate g(x) = sin²(2x). g(x) = [sin(2x)]². Chain rule (applied twice): outer u² → 2u · (inner derivative), inner sin(2x) → 2cos(2x). g'(x) = 2sin(2x) · 2cos(2x) = 4sin(2x)cos(2x) = 2sin(4x). This is a typical example of the double chain rule.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u5-l2",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 5,
    lessonNum: 2,
    unitName: "Calculus",
    title: "Applications of Differentiation: Tangents & Normals, Increasing & Decreasing, Stationary Points & Optimization, Kinematics",
    subtitle: "The derivative is a 'map' of the function — where the gradient is positive it climbs, where it is zero it peaks or troughs",
    overview:
      "The real power of differentiation emerges in its applications. Finding the equations of the tangent and normal at a point on a curve is the most basic application, using directly the fact that the derivative is a gradient. Furthermore, the function is increasing where f'(x) > 0, decreasing where f'(x) < 0, and the points where f'(x) = 0 are stationary points. The second derivative f''(x) determines the nature of a stationary point (maximum/minimum/inflection) and tells you the concavity of the function. Optimization is a perennial IB question type, solving real-life problems such as 'maximise area' and 'minimise cost' with derivatives. In kinematics, displacement, velocity, and acceleration are linked through calculus.",
    objectives: [
      "Find the gradient of the tangent f'(a) and the gradient of the normal −1/f'(a) at the point (a, f(a)), and write the equation using y − f(a) = m(x − a)",
      "Determine the increasing and decreasing intervals of a function from the sign of f'(x), and classify the stationary points where f'(x) = 0 (maximum, minimum, inflection) using the first- and second-derivative tests",
      "Determine the concavity and points of inflection of a function from the sign of the second derivative f''(x)",
      "In real-life optimization problems, set up the objective function, find the maximum and minimum using the derivative, and verify the validity of the answer in context",
      "In kinematics, analyse the motion of a particle using the relationships between displacement s(t), velocity v(t) = s'(t), and acceleration a(t) = v'(t) = s''(t)",
    ],
    formulas: [
      "Gradient of tangent: m_T = f'(a)",
      "Gradient of normal: m_N = −1/f'(a)  (f'(a) ≠ 0)",
      "Tangent/normal equation: y − f(a) = m(x − a)",
      "Increasing interval: f'(x) > 0,  decreasing interval: f'(x) < 0",
      "Stationary point: f'(x) = 0;  maximum: f''(x) < 0,  minimum: f''(x) > 0",
      "Point of inflection: f''(x) = 0 and the sign of f'' changes",
      "Kinematics: v(t) = ds/dt,  a(t) = dv/dt = d²s/dt²",
    ],
    sections: [
      {
        title: "Tangents, Normals & Stationary Points",
        subtitle: "In stationary-point classification problems, when the second-derivative test gives '0,' you must always supplement it with the first-derivative sign test",
        terms: [
          {
            term: "Tangent & normal",
            def: "Tangent: the line through the point (a, f(a)) on the curve y = f(x) with gradient f'(a). Equation: y − f(a) = f'(a)(x − a). Normal: the line perpendicular to the tangent, with gradient = −1/f'(a). If f'(a) = 0, the tangent is horizontal and the normal is vertical (x = a). In IB, follow the instruction to present the tangent/normal equation in the form y = mx + c or ax + by + c = 0.",
          },
          {
            term: "Increasing & decreasing intervals",
            def: "On intervals where f'(x) > 0, f is strictly increasing; where f'(x) < 0, it is strictly decreasing. The intervals are divided by the points where f'(x) = 0. In IB, intervals are expressed as a range of x using inequalities (e.g. −2 < x < 1). Whether the endpoints (boundaries) of the interval are included depends on context.",
          },
          {
            term: "Stationary points & extrema",
            def: "A point (a, f(a)) where f'(a) = 0 is a stationary point. Second-derivative test: if f''(a) < 0 it is a local maximum, if f''(a) > 0 it is a local minimum, if f''(a) = 0 it is inconclusive → the first-derivative sign test is needed. First-derivative test: if the sign of f' goes positive→negative it is a maximum, negative→positive it is a minimum, and if there is no change it is a point of inflection.",
          },
          {
            term: "Second derivative & concavity",
            def: "On intervals where f''(x) > 0, f is concave up; where f''(x) < 0, it is concave down. Point of inflection: a point where f''(x) = 0 and the sign of f'' changes → the point where concavity switches. In IB you must find the coordinates of the inflection point exactly and prove the sign change with a table or written argument.",
          },
        ],
        traps: [
          "When the second-derivative test gives f''(a) = 0, writing 'point of inflection' categorically is a frequent error. f''(a) = 0 means 'test inconclusive,' and you must check the sign of f' on both sides with the first-derivative sign test to determine the nature of the stationary point. The point x = 0 of f(x) = x⁴, where f''(0) = 0 yet it is a minimum, is an example.",
          "When finding the equation of a tangent, many students fail to substitute the point (a, f(a)) and solve for c in the general form y = f'(a)·x + c. After finding the gradient, you must substitute the actual coordinates of the point to compute the y-intercept c = f(a) − f'(a)·a, completing the full equation.",
        ],
        example:
          "Analyse f(x) = 2x³ − 9x² + 12x − 4. f'(x) = 6x² − 18x + 12 = 6(x−1)(x−2). f'(x) = 0: x = 1, x = 2 are stationary points. f''(x) = 12x − 18. f''(1) = −6 < 0 → maximum at x = 1, f(1) = 2−9+12−4 = 1. f''(2) = 6 > 0 → minimum at x = 2, f(2) = 16−36+24−4 = 0. Increasing intervals: x < 1 and x > 2 (f' > 0); decreasing interval: 1 < x < 2. Tangent at x = 1: gradient f'(1) = 0 → tangent: y = 1 (horizontal). Normal: x = 1 (vertical line).",
      },
      {
        title: "Optimization & Kinematics",
        subtitle: "In optimization problems, after finding the answer you must always verify 'is this really the maximum/minimum' to earn full marks in IB",
        terms: [
          {
            term: "Optimization",
            def: "The process of expressing the objective function Q in terms of a single variable and solving dQ/dx = 0 to find the optimal value. Steps: ① set up variables → ② reduce variables using the constraint → ③ express Q as an expression in one variable → ④ differentiate and set to 0 → ⑤ confirm maximum/minimum with the second-derivative test or endpoint comparison → ⑥ verify in context (x > 0, integer requirement, etc.).",
          },
          {
            term: "Endpoint check & global extrema",
            def: "The maximum and minimum on a closed interval [a, b] must be found by comparing the function values at interior stationary points with the function values at both endpoints. Even if a stationary point is an extremum, a larger/smaller value may occur at an interval endpoint. In IB, restrict the domain considering the practical context (e.g. 'length is positive') and then check the endpoints as well.",
          },
          {
            term: "Calculus in kinematics",
            def: "Displacement s(t), velocity v(t) = ds/dt, acceleration a(t) = dv/dt = d²s/dt². When velocity is positive, motion is in the positive direction; when negative, in the negative direction. The instant velocity = 0 is the turning point of the motion's direction. Note that 'speed' is |v(t)|, a scalar.",
          },
          {
            term: "Related rates — HL",
            def: "When two variables are functions of time t, this is the problem type of finding dy/dt = (dy/dx) · (dx/dt) using the chain rule. Example: when the radius of a sphere changes, the rate of change of volume is dV/dt = dV/dr · dr/dt = 4πr² · dr/dt. Related-rates problems set in real-life contexts appear frequently in IB HL Paper 2.",
          },
        ],
        traps: [
          "In optimization, solving dQ/dx = 0 and stopping there is a frequent error. IB requires you to confirm whether the value is a maximum or minimum using the second-derivative test (f'' > 0: minimum, f'' < 0: maximum) or a sign change, and to state in writing whether the answer is valid in context (length positive, area real, etc.) to earn full marks. Omitting this confirmation step loses the final 1–2 marks.",
          "In kinematics, confusing 'total distance' with 'displacement' is a frequent error. Displacement is s(t₂) − s(t₁), the net change including direction. Total distance must be found by splitting the interval at the turning points where v = 0 and adding the |Δs| of each interval. A question asking for this distinction is guaranteed to appear in IB.",
        ],
        example:
          "Find the side lengths that minimise the perimeter of a rectangle with area A = 120 cm². Variables: width x, height y. Constraint: xy = 120 → y = 120/x. Objective function: P = 2x + 2y = 2x + 240/x. dP/dx = 2 − 240/x². dP/dx = 0: x² = 120, x = √120 = 2√30 ≈ 10.95 cm. d²P/dx² = 480/x³ > 0 → minimum. y = 120/x = √120 = 2√30. The perimeter is minimised when it is a square. Minimum perimeter = 4√120 = 8√30 ≈ 43.8 cm. Context check: x > 0 and real, so it is valid.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u5-l3",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 5,
    lessonNum: 3,
    unitName: "Calculus",
    title: "Integration: Indefinite & Definite Integrals, Area, the Reverse Chain Rule, and Integration by Substitution",
    subtitle: "Integration is both the reverse of differentiation and 'the sum of infinitely thin slices' — holding both perspectives at once is the heart of calculus",
    overview:
      "The second pillar of calculus is integration. The indefinite integral is antidifferentiation — finding a function F(x) whose derivative is f(x) — and must always include the constant of integration C. The definite integral ∫_a^b f(x) dx is computed by the fundamental theorem of calculus as F(b) − F(a), and geometrically it is the 'signed area' between the curve and the x-axis. In IB AA, the key techniques are antidifferentiating standard functions, the reverse chain rule, integration by substitution, and integration by parts (HL). The calculation of area and volume (volume is HL), together with integration applications in kinematics, are the main question types on the exam.",
    objectives: [
      "Find the indefinite integrals of the standard functions xⁿ, eˣ, 1/x, sin x, cos x, and explain the role of the constant of integration C",
      "Apply the fundamental theorem of calculus to compute the definite integral ∫_a^b f(x) dx = F(b) − F(a), and understand the relationship between the sign of the definite integral and area",
      "Use the reverse chain rule to compute integrals of the form ∫f(g(x))g'(x) dx = F(g(x)) + C",
      "Simplify complicated integrals by changing variables with the substitution u = g(x), transforming the limits of integration as well in definite integrals",
      "Set up and compute the area between two curves, or between a curve and the x-axis (y-axis), using a definite integral",
    ],
    formulas: [
      "Indefinite integral: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1),  ∫1/x dx = ln|x| + C",
      "∫eˣ dx = eˣ + C,  ∫eᵃˣ dx = eᵃˣ/a + C",
      "∫sin x dx = −cos x + C,  ∫cos x dx = sin x + C",
      "Fundamental theorem: ∫_a^b f(x) dx = [F(x)]_a^b = F(b) − F(a)",
      "Reverse chain rule: ∫f(g(x))·g'(x) dx = F(g(x)) + C",
      "Area with x-axis: A = ∫_a^b |f(x)| dx",
      "Area between two curves: A = ∫_a^b [f(x) − g(x)] dx  (f(x) ≥ g(x) on [a,b])",
    ],
    sections: [
      {
        title: "Indefinite & Definite Integration",
        subtitle: "The constant of integration C is not a product of laziness but mathematical honesty, explicitly expressing 'the non-uniqueness of antidifferentiation'",
        terms: [
          {
            term: "Indefinite integral",
            def: "∫f(x) dx = F(x) + C, where F'(x) = f(x). The reverse process of differentiation. The + C represents 'every constant that vanishes upon differentiation.' If an initial condition is given, the value of C can be determined. Example: if the curve passes through the point (1, 5), solve F(1) + C = 5 for C.",
          },
          {
            term: "Fundamental Theorem of Calculus",
            def: "∫_a^b f(x) dx = F(b) − F(a), where F'(x) = f(x). The theorem that formalises differentiation and integration as inverse operations. Geometric meaning: the signed area between f(x) and the x-axis from x = a to x = b. On intervals where f(x) < 0 the integral value is negative, so to find the actual area you must use the absolute value.",
          },
          {
            term: "Properties of definite integrals",
            def: "∫_a^b f(x) dx = −∫_b^a f(x) dx (swapping the limits). ∫_a^a f(x) dx = 0. ∫_a^b [f(x) ± g(x)] dx = ∫_a^b f(x) dx ± ∫_a^b g(x) dx (linearity). ∫_a^b f(x) dx = ∫_a^c f(x) dx + ∫_c^b f(x) dx (splitting the interval). Symmetric functions: if f is even, ∫_{-a}^{a} f dx = 2∫_0^a f dx; if odd, = 0.",
          },
          {
            term: "Standard integrals",
            def: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1). ∫x⁻¹ dx = ∫(1/x) dx = ln|x| + C. ∫eˣ dx = eˣ + C. ∫sin x dx = −cos x + C (watch the sign!). ∫cos x dx = sin x + C. ∫sec²x dx = tan x + C. This list is included in the IB formula booklet.",
          },
        ],
        traps: [
          "Dropping the sign by writing ∫sin x dx = cos x + C is a very common error. The integral of sin is −cos x + C, and the integral of cos is +sin x + C. If you remember the differentiation direction (sin→cos→−sin→−cos→sin) as counter-clockwise, then integration is clockwise (sin→−cos→−sin→cos→sin). A sign error is fatal on Paper 1.",
          "Failing to write + C in an indefinite integral loses marks in IB. The 'constant of integration C' is an essential component of a complete answer, while in a definite integral (one with limits) C cancels in F(b) − F(a), so it is not written. Do not confuse when C is and is not needed in indefinite/definite integrals.",
        ],
        example:
          "Compute ∫_0^2 (3x² − 4x + 1) dx. Indefinite integral: F(x) = x³ − 2x² + x. Definite integral: F(2) − F(0) = (8 − 8 + 2) − (0) = 2. Interpretation: the signed area between the curve y = 3x²−4x+1 and the x-axis from x = 0 to x = 2 is 2. Verification: 3x²−4x+1 = (3x−1)(x−1) with roots x = 1/3, x = 1. It is positive on 0 < x < 1/3, negative on 1/3 < x < 1, and positive on 1 < x < 2, so the value of the definite integral (the signed sum) differs from the actual total area. To find the total area you must split the interval and compute with |…| dx.",
      },
      {
        title: "Reverse Chain Rule, Substitution & Area",
        subtitle: "When using the substitution u = g(x), you must also write du = g'(x)dx — that single line completes the calculation",
        terms: [
          {
            term: "Reverse chain rule",
            def: "∫f'(g(x)) · g'(x) dx = f(g(x)) + C. If the integrand has the structure 'composite function × derivative of the inner function,' it can be integrated directly. Example: ∫2x(x²+1)⁴ dx → u = x²+1, du = 2x dx → ∫u⁴ du = u⁵/5 + C = (x²+1)⁵/5 + C. Check that g'(x) sits exactly alongside, or adjust by a constant multiple (multiply and divide).",
          },
          {
            term: "Integration by substitution",
            def: "Substitute u = g(x) → du = g'(x) dx → transform the integrand into an expression in u only → compute ∫h(u) du → convert u back to x. When substituting in a definite integral, either change the limits to u = g(a), u = g(b), or substitute the limits after antidifferentiating and converting u back to x. Either method is accepted in IB.",
          },
          {
            term: "Integration by parts — HL",
            def: "∫u dv = uv − ∫v du. The result of integrating the product rule (uv)' = u'v + uv'. Criterion for choosing u and dv: the LIATE order (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) — the earlier it appears, the more it should be chosen as u. ∫x·eˣ dx: u = x, dv = eˣ dx → du = dx, v = eˣ → xeˣ − ∫eˣ dx = xeˣ − eˣ + C.",
          },
          {
            term: "Area & definite integrals",
            def: "Area between the curve and the x-axis: if there are intervals where f(x) is negative, A = ∫|f(x)| dx. Compute by splitting the interval: integral over positive intervals − integral over negative intervals. Area between two curves y = f(x) and y = g(x) (with f(x) ≥ g(x)): A = ∫_a^b [f(x) − g(x)] dx. The intersection points become the boundaries.",
          },
        ],
        traps: [
          "In integration by substitution, leaving dx in place without eliminating it after finding du is a frequent error. If u = x²+1, du = 2x dx, then you must replace x dx with du/2. If x dx is absent from the integrand or does not cancel exactly, simple substitution cannot solve it — adjust by a multiple of g'(x) (constant correction) or find another method.",
          "When finding the area between two curves, writing ∫[f−g] dx without checking which curve is on top produces a negative area when the order of magnitude switches between intersection points. Find the intersection points first, check which function is larger on each interval, then approach with the absolute-value form ∫|f(x)−g(x)| dx or split the interval.",
        ],
        example:
          "Compute ∫_1^3 (2x)/(x²+1) dx by substitution. u = x²+1, du = 2x dx. Limit transformation: x = 1 → u = 2, x = 3 → u = 10. Integral: ∫_2^{10} (1/u) du = [ln|u|]_2^{10} = ln 10 − ln 2 = ln 5. Now find the area between y = x² + 2 and y = 2x − 1. Intersection: x²+2 = 2x−1 → x²−2x+3 = 0 → discriminant 4−12 < 0 → no intersection. y = x²+2 > y = 2x−1 always (minimum difference: 3−1 = 2 > 0 at x = 1). Area (over the interval −1 ≤ x ≤ 2): A = ∫_{-1}^{2} [(x²+2)−(2x−1)] dx = ∫_{-1}^{2} (x²−2x+3) dx = [x³/3 − x² + 3x]_{-1}^{2} = (8/3−4+6) − (−1/3−1−3) = (14/3) − (−13/3) = 27/3 = 9.",
      },
    ],
  },
];
