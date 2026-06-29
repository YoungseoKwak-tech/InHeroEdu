/**
 * Core Notes English version — IB Math AI (Applications & Interpretation) Unit 5.
 * Faithful translation of the Korean storytelling version.
 * Full IB DP Math AI syllabus content (Topic 5: Calculus) preserved,
 * with exam-accurate English narrative in the style of a top-tier instructor.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AI_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-math-ai-u5-l1",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 5,
    lessonNum: 1,
    unitName: "Calculus",
    title: "Introduction to Differentiation: Gradient as Rate of Change, the Power Rule, Gradient at a Point",
    subtitle:
      "The derivative is the tool that measures 'how fast a function changes' — the heart of differentiation is moving from reading a gradient as a single number to expressing the rule of change for the entire function as an equation",
    overview:
      "IB Math AI Unit 5 begins with calculus. Calculus can feel intimidating, but its starting point is highly intuitive. The gradient of a straight line tells you 'how steep it is', and you can ask exactly the same question about a curve — except that on a curve the gradient changes from point to point. Differentiation is the method for finding the gradient at each point of a curve. More precisely, it finds the ratio of how much y changes when x changes by a tiny amount — the rate of change. This rate of change is written f'(x) or dy/dx and is called the derivative. The core technique of differentiation in IB Math AI is the power rule: if f(x) = axⁿ then f'(x) = anxⁿ⁻¹ — this single rule lets you differentiate any polynomial. Once you have found the derivative, you substitute a specific value of x to compute the gradient at a point as a number. A solid grasp of this lesson connects naturally to the applications and optimisation of the next lesson.",
    objectives: [
      "Explain the difference between average rate of change and instantaneous rate of change, and describe the geometric meaning of the derivative (the gradient of the tangent)",
      "Apply the power rule f'(x) = anxⁿ⁻¹ to monomials and polynomials to find derivatives",
      "Substitute a specific value of x into the derivative to compute the gradient at that point, and interpret the result in the language of the context",
      "Use the gradient relationship between a tangent and a normal (m_t × m_n = −1) to find the equations of tangents and normals",
      "Use the numerical derivative feature of a GDC to check the derivative value at any point and verify hand calculations",
    ],
    formulas: [
      "Power rule: d/dx[axⁿ] = anxⁿ⁻¹",
      "Sum rule: d/dx[f(x) + g(x)] = f'(x) + g'(x)",
      "Derivative of a constant: d/dx[c] = 0",
      "Tangent of gradient m at point (x₁, y₁): y − y₁ = m(x − x₁)",
      "Gradient of the normal: m_n = −1 / m_t  (tangent gradient m_t ≠ 0)",
    ],
    sections: [
      {
        title: "The Derivative as a Rate of Change — Rediscovering the Gradient",
        subtitle:
          "If the gradient of a line Δy/Δx is the 'average rate of change between two points', then the derivative dy/dx is the 'instantaneous rate of change at one point' — clearly distinguishing these two ideas is the first scoring point of IB extended-response questions",
        terms: [
          {
            term: "Average Rate of Change",
            def: "The average rate at which a function f(x) changes between two points x = a and x = b. Computed as [f(b) − f(a)] / (b − a), which geometrically is the gradient of the straight line (the secant line) joining the two points. In IB AI, context questions (velocity, change in cost, etc.) ask you to interpret the average rate of change in an extended-response item.",
          },
          {
            term: "Instantaneous Rate of Change & Derivative",
            def: "The instantaneous rate of change of f(x) at x = a — the limiting value as the secant converges to the tangent line. Written f'(a) or dy/dx|_{x=a}. Geometrically it is the gradient of the tangent at the point (a, f(a)). When 'velocity', 'rate of change', or 'gradient' appears in a problem, it is a signal to use the derivative.",
          },
          {
            term: "Power Rule",
            def: "If f(x) = axⁿ then f'(x) = anxⁿ⁻¹. The rule brings the exponent down to the front and reduces the exponent by 1. Differentiation of sums and differences is applied independently to each term. Example: f(x) = 3x⁴ − 5x² + 2 → f'(x) = 12x³ − 10x. A constant term differentiates to 0. More than 90% of IB Math AI differentiation items are solved with this single rule.",
          },
          {
            term: "Tangent & Normal",
            def: "Tangent: the straight line at a point on a curve having the same gradient as the curve at that point. Normal: the straight line perpendicular to the tangent. Gradient relationship: m_t × m_n = −1, so m_n = −1/m_t. Equation form: y − y₁ = m(x − x₁). In IB exams this appears as 'find the equation of the tangent at point P' or 'find where the normal meets the x-axis'.",
          },
        ],
        traps: [
          "A common error is finding f'(x) and then mistaking it for 'the gradient at that point'. f'(x) is the gradient function, and the gradient at a specific point x = a must be computed as f'(a). If an IB item asks to 'find the gradient of the tangent at (2, f(2))' and you simply write f'(x), you score zero. You must substitute x = 2 to obtain a number.",
          "Before applying the power rule, you must rewrite the function in xⁿ form. Example: f(x) = 1/x² is rewritten as x⁻², and f(x) = √x as x^(1/2), before differentiating. 'Differentiating 1/x² to get 1/(2x)' is an incorrect calculation that appears very frequently in IB.",
        ],
        example:
          "For the function f(x) = 2x³ − 9x² + 12x − 4, find the following. (a) The derivative f'(x): apply the power rule to each term. f'(x) = 6x² − 18x + 12. (b) The gradient at x = 1: f'(1) = 6(1)² − 18(1) + 12 = 6 − 18 + 12 = 0. Since the gradient is 0, the tangent at this point is horizontal — this is a candidate for a local extremum. (c) The equation of the tangent at x = 3: f'(3) = 6(9) − 18(3) + 12 = 54 − 54 + 12 = 12. f(3) = 2(27) − 9(9) + 12(3) − 4 = 54 − 81 + 36 − 4 = 5. Tangent: y − 5 = 12(x − 3) → y = 12x − 31. This kind of three-step calculation item appears frequently on IB Paper 1.",
      },
      {
        title: "Differentiating Polynomials — Full Application of the Power Rule",
        subtitle:
          "The range of skills required in IB Math AI differentiation centres on polynomials — automate the ability to rewrite fractional and root expressions in xⁿ form and the process of setting up tangent and normal equations",
        terms: [
          {
            term: "Negative & Fractional Exponents",
            def: "The power rule applies identically when the exponent is negative or fractional. x⁻ⁿ = 1/xⁿ, x^(1/n) = ⁿ√x. Apply the rule after rewriting: d/dx[x^(-2)] = −2x^(-3) = −2/x³. IB exams frequently use forms that require rewriting first, such as 'differentiate 3/x² + 2√x'.",
          },
          {
            term: "Geometric Interpretation of f'(x)",
            def: "On intervals where f'(x) > 0 the function is increasing, on intervals where f'(x) < 0 it is decreasing, and points where f'(x) = 0 are candidates for stationary points. In context problems, 'find the times during which the volume of water is increasing' is the same as solving f'(t) > 0.",
          },
          {
            term: "Numerical Differentiation with GDC",
            def: "The GDC's nDeriv(f(x), x, a) feature numerically computes f'(a) at x = a. Use it when hand calculation is complicated or to verify a result. In IB, for items where GDC use is permitted (Paper 2), obtaining the answer directly by numerical differentiation is also accepted.",
          },
        ],
        traps: [
          "Using the incorrect method of 'differentiating each factor separately and multiplying' for a function written as a product gives the wrong answer. In IB Math AI SL the product rule is not part of the official syllabus, so a form like f(x) = (2x + 1)(x² − 3) must be expanded first and then differentiated with the power rule. The error of writing '2 × 2x = 4x' without expanding occurs frequently.",
          "When finding the gradient of the normal, beware of the error of computing m_n = 1/m_t (omitting the negative sign). Since the tangent and normal are perpendicular, the product of the two gradients must be −1. If m_t = 4 then m_n = −1/4. Forgetting the negative sign is the most frequent simple calculation error in IB.",
        ],
        example:
          "For f(x) = x³/3 − 2x + 4/x, (a) find f'(x). First rewrite 4/x = 4x⁻¹. f'(x) = x² − 2 − 4x⁻² = x² − 2 − 4/x². (b) Find the equations of the tangent and the normal at x = 2. f(2) = 8/3 − 4 + 2 = 8/3 − 2 = 2/3. f'(2) = 4 − 2 − 1 = 1. Tangent: y − 2/3 = 1·(x − 2) → y = x − 4/3. Gradient of the normal: −1/1 = −1. Normal: y − 2/3 = −1·(x − 2) → y = −x + 8/3. In IB this kind of item is a Paper 1 type that must be solved by hand without a GDC.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u5-l2",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 5,
    lessonNum: 2,
    unitName: "Calculus",
    title: "Applications of Differentiation: Intervals of Increase/Decrease, Local Maxima/Minima, Real-Context Optimisation",
    subtitle:
      "Solving f'(x) = 0 is only the beginning — judging 'is it a maximum or a minimum', and 'is it the maximum or minimum within the real-world constraints', is the heart of the highest-mark IB questions",
    overview:
      "Now that you have mastered the technique of finding derivatives, let's put it to actual use. The second lesson of IB Math AI Unit 5 is the applications of differentiation. The sign of the derivative f'(x) tells you whether the function is increasing or decreasing. If f'(x) > 0 it is increasing; if f'(x) < 0 it is decreasing. At points where f'(x) = 0 the function may change direction, and such points are called stationary points. There are two ways to determine whether a stationary point is a local maximum or a local minimum. First, the first derivative test: check the change in sign of f'(x) on either side of the stationary point. Second, the second derivative test: judge by the sign of f''(a). These ideas connect directly to real-context optimisation. For example, 'the production level that maximises profit', 'the box dimensions that minimise material', and 'the fastest route' are all optimisation problems using differentiation. On IB Paper 2, optimisation items are always high-mark (6–10 marks) and also require a written interpretation in the real-world context.",
    objectives: [
      "Analyse the sign of f'(x) to find intervals of increase and decrease, and interpret these in context",
      "Solve f'(x) = 0 to find stationary points, and determine local maxima/minima using the first derivative test",
      "Find the second derivative f''(x) and apply that f''(a) < 0 implies a local maximum and f''(a) > 0 implies a local minimum",
      "In real-context problems, set up the variable to be optimised, use the constraint to convert to a single-variable function, and find the optimal value by differentiation",
      "Verify whether the optimal value obtained is valid within the context of the problem (positive, realistic range, etc.)",
    ],
    formulas: [
      "Stationary point condition: f'(x) = 0",
      "Second derivative test: f''(a) < 0 → local max / f''(a) > 0 → local min / f''(a) = 0 → inconclusive, use the first derivative test",
      "Interval of increase: range of x where f'(x) > 0",
      "Interval of decrease: range of x where f'(x) < 0",
      "Optimisation procedure: set up objective function → substitute constraint → single-variable function → differentiate → solve f' = 0 → verify",
    ],
    sections: [
      {
        title: "Stationary Points and Classifying Extrema — First and Second Derivative Tests",
        subtitle:
          "After finding a stationary point you must always classify it as a maximum or a minimum together with mathematical justification — 'since f'(x) = 0 it is a local minimum' scores zero in IB; you need a sign change or a second-derivative value to earn marks",
        terms: [
          {
            term: "Stationary Point",
            def: "A point (a, f(a)) satisfying f'(x) = 0. It is a point where the tangent is horizontal, and can be a local maximum, a local minimum, or a point of inflection. To prove that a stationary point is an extremum, you always need an additional test (first or second derivative). In IB you must find the full coordinates (a, f(a)).",
          },
          {
            term: "First Derivative Test",
            def: "Check the sign of f'(x) on either side of the stationary point x = a. (+) → (−): local maximum. (−) → (+): local minimum. If the sign does not change, it is a stationary point but not an extremum — a horizontal point of inflection. Drawing a sign diagram earns method marks in IB.",
          },
          {
            term: "Second Derivative Test",
            def: "At a point where f'(a) = 0, classify using the sign of f''(a). If f''(a) < 0 the curve is concave down → local maximum. If f''(a) > 0 it is concave up → local minimum. If f''(a) = 0 the test is inconclusive — you must switch to the first derivative test. On IB Paper 1 the second derivative test is often faster.",
          },
          {
            term: "Intervals of Increase & Decrease",
            def: "On intervals where f'(x) > 0, f(x) is increasing; on intervals where f'(x) < 0, f(x) is decreasing. Using stationary points as boundaries, set up a number line, partition into intervals, and test the sign of f'(x) on each. Context items asking 'the range of production over which revenue increases' or 'the time interval during which the water level decreases' fall into this category.",
          },
        ],
        traps: [
          "Concluding 'it is a local minimum' or 'it is a local maximum' merely from the fact that f'(a) = 0 at a stationary point is not accepted in IB. You must present the basis for classification through the first derivative test (sign change of f') or the second derivative test (value of f''(a)). An answer that states only a conclusion without a test does not receive the conclusion mark in the IB markscheme.",
          "If the second derivative test yields f''(a) = 0, the test is invalid. Many students conclude 'since f''(a) = 0 it is a point of inflection', which is an incorrect conclusion. When f''(a) = 0, all three cases — local maximum, local minimum, and point of inflection — remain possible. In this case you must return to the first derivative test.",
        ],
        example:
          "Find the stationary points of f(x) = 2x³ − 3x² − 12x + 5 and classify them as maxima or minima. f'(x) = 6x² − 6x − 12 = 6(x² − x − 2) = 6(x − 2)(x + 1). f'(x) = 0 → x = 2 or x = −1. f''(x) = 12x − 6. At x = 2: f''(2) = 24 − 6 = 18 > 0 → local minimum. f(2) = 16 − 12 − 24 + 5 = −15. Local minimum: (2, −15). At x = −1: f''(−1) = −12 − 6 = −18 < 0 → local maximum. f(−1) = −2 − 3 + 12 + 5 = 12. Local maximum: (−1, 12). In IB, full marks require all three elements: the coordinates of the stationary point, the basis for classification (f'' value), and the conclusion (max/min).",
      },
      {
        title: "Real-Context Optimisation — Finding Extrema Within Real-World Constraints",
        subtitle:
          "Optimisation items are not 'just differentiate' — the IB marks are determined in the process of converting real-world constraints into equations; you must not skip the three steps of setting up variables, substituting the constraint, and checking the domain",
        terms: [
          {
            term: "Objective Function",
            def: "The function representing the quantity to be maximised or minimised. Examples: profit P(x), cost C(x), area A(x), surface area S(r). The objective function must be made to contain only one variable so that it can be differentiated. Using the constraint to eliminate one variable is the key step of optimisation items.",
          },
          {
            term: "Constraint",
            def: "An equation representing the relationship between variables in the real-world context. Examples: total length of wire = constant, volume of a box = constant, total length of fence = constant. The constraint is used to convert the objective function into a single-variable function. In IB items the constraint is usually in the problem set-up, and if you cannot express it as an equation, all subsequent steps become impossible.",
          },
          {
            term: "Checking the Domain",
            def: "You must always check whether the x value obtained in the optimisation lies within the realistically meaningful range (the domain). Examples: a length is positive; production is at least 0 and no more than maximum capacity. In IB, presenting a stationary point outside the domain as the optimal value gives a wrong answer. Sometimes you must also compare the function values at the endpoints.",
          },
        ],
        traps: [
          "In an optimisation item, solving f'(x) = 0 to find an x value and writing only 'therefore the maximum/minimum is at x = …' is an incomplete answer in IB. For full marks you must ① present the basis for whether it is a maximum or minimum, ② compute the actual optimal value of the objective function (f(x)), and ③ interpret it together with the units of the context. In an item asking 'the production level that maximises profit', writing only x = 50 without computing the maximum profit value loses the final 1–2 marks.",
          "In box-optimisation items (e.g. 'making a box by cutting corners from a square sheet to obtain maximum volume'), students often forget to set the domain of the side length x of the cut-out square. If one side of the sheet is a, the domain is 0 < x < a/2. Without a domain, solving only the equation may yield a negative solution, which is invalid in IB.",
        ],
        example:
          "A farmer wants to make a rectangular pasture using 120 m of fencing in total. One side uses a river, so no fence is needed there. Find the dimensions that maximise the area. Let the length of the side parallel to the river be x and each of the other two sides be y; then the constraint is x + 2y = 120 → x = 120 − 2y. Objective function (area): A = xy = (120 − 2y)y = 120y − 2y². dA/dy = 120 − 4y = 0 → y = 30. Second derivative: d²A/dy² = −4 < 0 → confirms a maximum. x = 120 − 2(30) = 60. Maximum area = 60 × 30 = 1800 m². Domain check: 0 < y < 60 and y = 30 lies within the range. In IB this kind of item is set with a mark structure of set-up (2 marks) + differentiate/solve (3 marks) + interpretation (1 mark).",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u5-l3",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 5,
    lessonNum: 3,
    unitName: "Calculus",
    title: "Integration: Antidifferentiation/Indefinite Integral, the Definite Integral as Area, the Trapezoidal Rule",
    subtitle:
      "Integration starts from the idea of 'the reverse of differentiation', but the real IB marks lie in the ability to 'interpret the definite integral as an area' and to 'describe the limitations of the trapezoidal rule'",
    overview:
      "If differentiation is the process of finding the rate of change of a function, integration is the process of working backwards in the opposite direction. Recovering the original function when you know its derivative — this is indefinite integration, that is, antidifferentiation. The result of indefinite integration always carries a constant of integration C, reflecting the fact that 'adding any constant leaves the derivative unchanged'. By contrast, the definite integral computes the (signed) area between a function f(x) and the x-axis over an interval [a, b]. This is the heart of the Fundamental Theorem of Calculus. In IB Math AI, definite integrals are often computed with a GDC, but for polynomials, hand calculation is also required. Finally, the trapezoidal rule is a method for numerically approximating an area when no exact integration formula is available. In IB, items frequently combine computing the trapezoidal rule with describing 'whether this approximation is an overestimate or an underestimate of the true area'.",
    objectives: [
      "Apply the reverse of the power rule (∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1) to polynomials to find indefinite integrals, and explain the meaning of the constant of integration C",
      "Use an initial condition to find the value of C in an indefinite integral and recover a specific function",
      "Compute the definite integral ∫ₐᵇ f(x) dx using the Fundamental Theorem of Calculus and interpret it as the area between a curve and the x-axis",
      "Understand that the definite integral of a function below the x-axis is negative, and correctly apply absolute-value handling when finding the actual area",
      "Apply the trapezoidal rule A ≈ h/2[(y₀ + yₙ) + 2(y₁ + … + yₙ₋₁)] to find a numerical area, and judge whether the approximation is an overestimate or underestimate based on the concavity of the curve",
    ],
    formulas: [
      "Indefinite integral (power rule): ∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1)",
      "Integral of a constant: ∫k dx = kx + C",
      "Definite integral: ∫ₐᵇ f(x) dx = F(b) − F(a)  (F is an antiderivative of f)",
      "Trapezoidal rule: A ≈ (h/2)[(y₀ + yₙ) + 2(y₁ + y₂ + … + yₙ₋₁)]  where h = (b − a)/n",
      "Actual area (including below the x-axis): Area = ∫ₐᵇ |f(x)| dx",
    ],
    sections: [
      {
        title: "Indefinite Integrals and the Constant of Integration — The Reverse Process of Differentiation",
        subtitle:
          "Omitting +C from the result of an indefinite integral is a wrong answer in IB — C is not mere formality but a mathematical fact expressing 'one of infinitely many antiderivatives'",
        terms: [
          {
            term: "Antiderivative & Indefinite Integral",
            def: "Saying that a function F(x) is an antiderivative of f(x) means F'(x) = f(x). The indefinite integral is written ∫f(x) dx = F(x) + C, where +C is the constant of integration. If f(x) = 3x² then F(x) = x³ + C — because d/dx[x³ + C] = 3x². Since C is a constant it can be any value, and to determine a specific value you need an initial condition.",
          },
          {
            term: "Integration of Polynomials",
            def: "Apply to each term: ∫axⁿ dx = axⁿ⁺¹/(n+1) + C. Add 1 to the exponent and divide by the new exponent. Example: ∫(4x³ − 6x + 5) dx = x⁴ − 3x² + 5x + C. Integration of sums and differences is applied independently to each term. The case of exponent n = −1 (∫1/x dx) is beyond the IB Math AI SL range and is excluded.",
          },
          {
            term: "Initial Condition & Determining C",
            def: "From the indefinite-integral result F(x) + C, substitute a condition (initial condition) that the curve passes through a specific point (x₀, y₀) to determine the value of C. Example: if F(0) = 5 then find C from C = 5 − F(0). In physics and economics contexts, conditions such as 'the position at time t = 0 is 3 m' or 'the fixed cost at production 0 is 200 dollars' serve as initial conditions.",
          },
          {
            term: "Integration Notation",
            def: "The ∫ symbol is an elongated 'S' meaning 'sum'. In ∫f(x) dx, f(x) is the integrand and dx indicates integration with respect to x. In the definite integral ∫ₐᵇ f(x) dx, a is the lower limit and b is the upper limit. In IB you can lose method marks if the notation is incorrect.",
          },
        ],
        traps: [
          "∫x⁻¹ dx ≠ x⁰/0 — the denominator becomes 0, so the formula cannot be applied. This case is not examined in IB Math AI SL, but other negative exponents (e.g. ∫x⁻² dx = −x⁻¹ + C) apply the power rule directly. When integrating negative exponents, always first check whether n = −1, which would make the denominator 0.",
          "Omitting +C from an indefinite-integral result may look like a simple slip in IB, but it is always penalised. In most cases the markscheme explicitly states 'without +C: lose 1 mark'. By contrast, in a definite-integral calculation C cancels in F(b) − F(a), so you do not need to write it — the habit of distinguishing these two cases is important.",
        ],
        example:
          "Given dy/dx = 6x² − 4x + 1 and that the curve passes through the point (1, 3), find y as a function of x. Integrate both sides with respect to x: y = ∫(6x² − 4x + 1) dx = 2x³ − 2x² + x + C. Substitute the initial condition (1, 3): 3 = 2(1)³ − 2(1)² + 1 + C = 2 − 2 + 1 + C = 1 + C → C = 2. Therefore y = 2x³ − 2x² + x + 2. Verification: dy/dx = 6x² − 4x + 1 ✓. Check the point (1, 3): 2(1) − 2(1) + 1 + 2 = 3 ✓. In IB this item is marked as integration (2 marks) + computing C (1 mark) + final expression (1 mark).",
      },
      {
        title: "The Definite Integral and Area, the Trapezoidal Rule — Numerical Approximation and Judging Error",
        subtitle:
          "A negative definite integral does not mean 'the area is negative' but signals 'an interval lying below the x-axis' — when finding the actual area you must handle the sign, and the over/underestimate judgement of the trapezoidal rule is always linked to the concavity of the curve",
        terms: [
          {
            term: "Definite Integral & Area",
            def: "∫ₐᵇ f(x) dx computes the signed area between the function f(x) and the x-axis over the interval [a, b]. On intervals where f(x) ≥ 0 the definite integral = actual area. On intervals where f(x) < 0 the definite integral is negative → the actual area is the absolute value. When the two cases mix, split the interval and sum each absolute value. It can be computed directly with the GDC's ∫f(x)dx feature.",
          },
          {
            term: "Fundamental Theorem of Calculus",
            def: "∫ₐᵇ f(x) dx = F(b) − F(a), where F'(x) = f(x). That is, the definite integral is found by computing an antiderivative and subtracting the function value at the lower limit from that at the upper limit. The square-bracket notation [F(x)]ₐᵇ = F(b) − F(a) is notation you must always write in IB solutions. This theorem is the key link connecting differentiation and integration.",
          },
          {
            term: "Trapezoidal Rule",
            def: "A numerical integration method that divides the interval [a, b] into n equal subintervals and approximates each subinterval with a trapezium. A ≈ (h/2)[(y₀ + yₙ) + 2(y₁ + y₂ + … + yₙ₋₁)], h = (b − a)/n. If the curve is concave down, the trapezia lie below the curve, so it is an overestimate. If the curve is concave up, the trapezia lie above the curve, so it is an underestimate.",
          },
          {
            term: "Over- & Underestimate",
            def: "The direction of the error in the trapezoidal rule is determined by the concavity of f(x). On intervals where f''(x) > 0 (concave up): underestimate. On intervals where f''(x) < 0 (concave down): overestimate. In IB exams, an extended-response item asking 'is the trapezoidal-rule estimate larger or smaller than the actual area — explain with reasons by looking at the graph' is a regular feature.",
          },
        ],
        traps: [
          "In an area item that includes an interval below the x-axis, using the definite integral as is gives the wrong answer. Example: when finding the 'area' from x = 0 to x = 3 for f(x) = x² − 4, computing ∫₀³(x² − 4)dx directly yields a signed area that includes a negative part. You must split the interval into [0, 2] and [2, 3] at the x-intercept x = 2 and compute |∫₀²(x² − 4)dx| + ∫₂³(x² − 4)dx to obtain the actual area. In IB, 'find the area' always requires a positive result.",
          "In the trapezoidal-rule formula, you must not confuse the structure that the two endpoints y₀ and yₙ are added once each, while the interior points y₁, …, yₙ₋₁ are added twice each. A frequent error: doubling all y values, or also doubling the endpoints. When memorising the formula, remember 'ends ×1, interior ×2'. And do not forget to multiply by h/2.",
        ],
        example:
          "Find the area enclosed by the curve y = 3x² − 1 and the x-axis from x = 1 to x = 3 (a) by the definite integral, and (b) by the trapezoidal rule (n = 4), and compare. (a) Antiderivative: F(x) = x³ − x. ∫₁³(3x² − 1) dx = [x³ − x]₁³ = (27 − 3) − (1 − 1) = 24 − 0 = 24. Since y = 3x² − 1 ≥ 0 for x ≥ 1, the area = 24. (b) h = (3 − 1)/4 = 0.5. x values: 1, 1.5, 2, 2.5, 3. y values: y₀ = 2, y₁ = 5.75, y₂ = 11, y₃ = 17.75, y₄ = 26. A ≈ (0.5/2)[(2 + 26) + 2(5.75 + 11 + 17.75)] = 0.25[28 + 2(34.5)] = 0.25[28 + 69] = 0.25 × 97 = 24.25. Comparison: since 24.25 > 24, the trapezoidal rule is an overestimate. Reason: for y = 3x² − 1, y'' = 6 > 0, so the curve is concave up — wait, if concave up it should be an underestimate. Re-check: f''(x) = 6 > 0 → concave up → the trapezia lie above the curve → overestimate. IB write-up: 'The trapezoidal rule gives an overestimate because the curve is concave up (f''(x) > 0) on [1, 3].'",
      },
    ],
  },
];
