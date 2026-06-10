/**
 * Core Notes English version — IB Math AI (Applications & Interpretation) Unit 2.
 * Full coverage of the IB DP Math AI official syllabus (Topic 2: Functions),
 * with exam-accurate narrative in the overview / section body style.
 * All IB terminology uses standard English as it appears on exam papers.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AI_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-math-ai-u2-l1",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 2,
    lessonNum: 1,
    unitName: "Functions & Modelling",
    title: "The Concept of a Function, Domain and Range, and Graph Interpretation",
    subtitle:
      "A function is an 'input → output' machine — and once you see how precisely IB exams test domain and range, you will never overlook them again",
    overview:
      "The first big idea in IB Math AI Unit 2 is this: a function is the language of modelling. Real-world data is always about finding a relationship where each single input produces exactly one output. The tool that expresses that relationship is a function, and the tools that define where a function is meaningful are the domain and range. Many students draw graphs perfectly yet lose marks by missing the question 'can x be negative in this context?' In Applications & Interpretation, domain and range are not just interval-notation exercises — they are a check on the physical or contextual validity of your model.",
    objectives: [
      "Determine whether a relation is a function using the vertical line test, and distinguish it from non-function relations",
      "Distinguish between the natural domain and a contextually restricted domain, and express each with correct notation",
      "Read the range from a graph and express it using inequality or set notation",
      "Use function notation f(x) and f : x ↦ y, and evaluate a function at a given x value",
      "Apply the conditions for the existence of a composite function f(g(x)) and an inverse function f⁻¹(x), and carry out the relevant calculations",
    ],
    formulas: [
      "Function notation: f(x) or f : x ↦ f(x)",
      "Composite function: (f ∘ g)(x) = f(g(x))",
      "Inverse function condition: f⁻¹ exists only when f is a one-to-one function",
      "Symmetry of inverse and original: the graph of y = f⁻¹(x) is the reflection of y = f(x) in the line y = x",
    ],
    sections: [
      {
        title: "Definition of a Function and the Vertical Line Test",
        subtitle:
          "For a relation to be a function, each x must correspond to exactly one y — understanding why this is essential in modelling reveals common exam traps",
        terms: [
          {
            term: "Function",
            def: "A relation in which every element of the domain corresponds to exactly one element of the codomain. The key idea is: 'put in x, get out exactly one y.' The circle x² + y² = 1 is not a function because x = 0 gives both y = 1 and y = −1.",
          },
          {
            term: "Domain",
            def: "The set of input values x for which the function is defined. The natural (mathematical) domain is all x for which f(x) is a real number, but context problems add real-world constraints such as 'time cannot be negative' or 'the number of items must be a whole number.'",
          },
          {
            term: "Range",
            def: "The set of values f(x) actually produced for all x in the domain. Note that the range is different from the codomain. When an IB question asks you to 'find the range,' you must read the y-axis extent of the graph precisely.",
          },
          {
            term: "Vertical Line Test",
            def: "A visual method for checking whether a graph represents a function. If no vertical line meets the graph at more than one point, the graph is a function. A circle or ellipse fails this test because a vertical line can intersect the graph at two points.",
          },
        ],
        traps: [
          "Assuming the domain is 'all real numbers' is a frequent error. The natural domain of √(x − 3) is x ≥ 3, and the natural domain of 1/(x − 2) is x ≠ 2. Whenever an IB exam gives you a function expression, your first routine should be to check for values that make the denominator zero and values that produce the square root of a negative number.",
          "In context problems, failing to distinguish between the mathematical domain and the practical domain costs marks. For example, in 'revenue R(n) as a function of the number of tickets sold n,' mathematics allows n to be a real number, but since tickets are whole units the domain must be restricted to n ∈ ℤ⁺ or n ≥ 0, n ∈ ℤ.",
        ],
        example:
          "Find the natural domain of f(x) = √(2x − 6) / (x − 5). Two conditions must hold simultaneously. First, the radicand must be non-negative: 2x − 6 ≥ 0 → x ≥ 3. Second, the denominator must be non-zero: x − 5 ≠ 0 → x ≠ 5. Therefore the domain is x ≥ 3 and x ≠ 5, i.e. [3, 5) ∪ (5, ∞). The IB markscheme requires both conditions to be stated for full marks.",
      },
      {
        title: "Composite Functions and Inverse Functions",
        subtitle:
          "Operations that 'chain' or 'undo' functions — this is where order errors and domain-tracking mistakes appear most frequently on IB exams",
        terms: [
          {
            term: "Composite Function",
            def: "An operation such as f(g(x)) where the output of one function becomes the input of another. Written (f ∘ g)(x), it means 'apply g first, then apply f.' Order matters — (f ∘ g)(x) ≠ (g ∘ f)(x) in most cases.",
          },
          {
            term: "Inverse Function",
            def: "If f(a) = b, then f⁻¹(b) = a. An inverse function exists only when f is one-to-one (strictly monotonic). To find f⁻¹(x): write y = f(x), swap x and y, then solve for y.",
          },
          {
            term: "One-to-One Function",
            def: "A function in which different x values always produce different f(x) values. Verified visually with the horizontal line test — no horizontal line may meet the graph at more than one point. Being one-to-one is the necessary and sufficient condition for an inverse function to exist.",
          },
          {
            term: "Horizontal Line Test",
            def: "A visual method for checking whether a function is one-to-one. If no horizontal line meets the graph at more than one point, the function is one-to-one and its inverse exists. f(x) = x² fails this test because the horizontal line y = 4 meets the graph at both x = 2 and x = −2.",
          },
        ],
        traps: [
          "In the composite (f ∘ g)(x), students often forget that g is applied first. When computing f(g(x)), always evaluate the inner function g(x) first and substitute the result into f. Assuming (f ∘ g)(3) equals (g ∘ f)(3) will produce a completely different answer.",
          "The inverse function f⁻¹(x) is NOT the same as 1/f(x). The inverse is not the reciprocal. For f(x) = 2x + 3, the inverse is f⁻¹(x) = (x − 3)/2, not 1/(2x + 3). Misreading the '−1' exponent as a reciprocal is one of the most common errors on IB exams.",
        ],
        example:
          "Given f(x) = 3x − 1 and g(x) = x², find (f ∘ g)(4). First, g(4) = 4² = 16. Then f(16) = 3(16) − 1 = 48 − 1 = 47. So (f ∘ g)(4) = 47. Going the other way, (g ∘ f)(4): f(4) = 3(4) − 1 = 11, g(11) = 11² = 121 — a completely different result. For the inverse of f: y = 3x − 1 → x = 3y − 1 → y = (x + 1)/3. Therefore f⁻¹(x) = (x + 1)/3.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u2-l2",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 2,
    lessonNum: 2,
    unitName: "Functions & Modelling",
    title: "Linear, Quadratic, and Cubic Models with an Introduction to Regression",
    subtitle:
      "How straight lines, parabolas, and cubic curves describe real data — and why GDC regression is more than pressing a button",
    overview:
      "Modelling is a core competency that runs through every topic of IB Math AI. Its foundation is the ability to look at data and judge which family of functions it follows. A linear model applies when the rate of change is constant; a quadratic model when the curve bends like a parabola; a cubic model when direction reverses twice. The GDC's regression functions provide numerical support for these judgements, but if you do not understand what r² (the coefficient of determination) actually measures, you can choose the wrong model without realising it. In Paper 2, when a question asks you to 'select the most appropriate model and justify your choice,' students who look only at the r² value fall straight into the trap.",
    objectives: [
      "Use the linear function f(x) = mx + c to interpret gradient and intercept in real-world contexts",
      "Find the vertex, axis of symmetry, and zeros of a quadratic function f(x) = ax² + bx + c using the GDC and algebraic methods",
      "Identify the general features of a cubic function (two local extrema, one inflection point) from a graph and apply them in context",
      "Perform linear and quadratic regression on the GDC and use the coefficient of determination r² to assess the quality of a model fit",
      "Define a piecewise function, represent it graphically, and verify continuity at the boundary points",
    ],
    formulas: [
      "Linear function: f(x) = mx + c  (m = gradient, c = y-intercept)",
      "Gradient: m = (y₂ − y₁) / (x₂ − x₁)",
      "Quadratic vertex form: f(x) = a(x − h)² + k  (vertex at (h, k))",
      "Quadratic formula: x = (−b ± √(b² − 4ac)) / 2a",
      "Discriminant: Δ = b² − 4ac",
      "Coefficient of determination: r² (closer to 1 indicates a better model fit)",
    ],
    sections: [
      {
        title: "Linear Models and Piecewise Functions",
        subtitle:
          "You earn marks on IB written-response questions only when you can explain what the gradient m and intercept c mean in context — not just write the equation",
        terms: [
          {
            term: "Linear Function",
            def: "A function of the form f(x) = mx + c. Its graph is a straight line; the gradient m represents the change in f(x) per unit increase in x. In IB context questions, m is interpreted as a rate such as 'cost per unit' or 'speed per hour.'",
          },
          {
            term: "Gradient (Slope)",
            def: "A value describing the steepness and direction of a straight line: m = Δy/Δx = (y₂ − y₁)/(x₂ − x₁). A positive gradient means increasing, negative means decreasing, and zero means horizontal. When two points are given, always compute the gradient using this formula first.",
          },
          {
            term: "Piecewise Function",
            def: "A function defined by different rules on different intervals of the domain. Examples include tax brackets, shipping rate tables, and traffic-light timers. On IB exams, when evaluating a function at a given x or drawing its graph, you must identify exactly which rule applies.",
          },
          {
            term: "Continuity",
            def: "The property of a graph having no breaks or jumps. A piecewise function is continuous at a boundary x value if both rules produce the same function value there. IB questions frequently ask you to find a constant that makes a piecewise function continuous.",
          },
        ],
        traps: [
          "Interpreting the y-intercept as an 'initial value' is valid only when the context supports it. In a 'base fare + per-kilometre charge' taxi model, c is the base fare; but in a population model, a negative c is physically meaningless. On IB written-response questions asking for a contextual interpretation of the intercept, you must state both the numerical value with units and its real-world meaning to receive full marks.",
          "Do not confuse the inclusion or exclusion of boundary points in a piecewise function. For f(x) = x + 1 (x < 3) and f(x) = 2x − 2 (x ≥ 3), the second rule applies at x = 3. On a graph, open circles (○) and closed circles (●) must be drawn clearly to receive credit on IB markschemes.",
        ],
        example:
          "A taxi company's fare model is given by the piecewise function: C(d) = 3 (0 ≤ d ≤ 2), C(d) = 3 + 1.5(d − 2) (d > 2). At d = 0, the base fare is €3; beyond 2 km, €1.50 is charged per additional kilometre. What is the fare for d = 7 km? C(7) = 3 + 1.5(7 − 2) = 3 + 1.5 × 5 = 3 + 7.5 = €10.50. The function is continuous at d = 2 — both rules give C = 3 when d = 2.",
      },
      {
        title: "Quadratic and Cubic Models with GDC Regression",
        subtitle:
          "Fitting parabolas and cubic curves to real data — and why a high r² does not automatically mean you have chosen the right model",
        terms: [
          {
            term: "Quadratic Function",
            def: "A function of the form f(x) = ax² + bx + c. If a > 0 the parabola opens upward (minimum); if a < 0 it opens downward (maximum). Common IB applications include projectile motion, revenue optimisation, and area maximisation.",
          },
          {
            term: "Discriminant (Δ)",
            def: "Δ = b² − 4ac. If Δ > 0, two distinct real roots; if Δ = 0, one repeated root (tangent to the x-axis); if Δ < 0, no real roots. This is the key tool for determining the number of roots without solving the equation.",
          },
          {
            term: "Coefficient of Determination (r²)",
            def: "A measure of how well a regression model explains the variability in the data. Its value lies between 0 and 1; the closer to 1, the better the model fits the data. An r² of 0.95 means 'this model accounts for 95% of the variation in the data.'",
          },
          {
            term: "Regression",
            def: "A statistical method for finding the function that best fits a set of data points. On the IB GDC, options include LinReg (linear) and QuadReg (quadratic). The regression line minimises the sum of squared residuals (the least-squares method).",
          },
        ],
        traps: [
          "A high r² does not always mean the model is correct. Even if quadratic regression gives r² = 0.99, the model is wrong if the true underlying pattern is exponential. You must also examine the residual plot or the visual pattern of the graph. Note also that r² is defined precisely for linear regression; its interpretation in non-linear regression can differ.",
          "The x-coordinate of the vertex of a quadratic is x = −b/(2a). Many students confuse this with the quadratic formula and calculate the vertex incorrectly. In vertex form f(x) = a(x − h)² + k, the vertex is (h, k) where h = −b/(2a).",
        ],
        example:
          "The height of a ball is given by h(t) = −5t² + 20t + 2 (t in seconds, h in metres). Find the maximum height and the time at which it occurs. Since a = −5 < 0, the parabola opens downward and has a maximum. Vertex time: t = −b/(2a) = −20/(2 × (−5)) = −20/(−10) = 2 s. Maximum height: h(2) = −5(4) + 20(2) + 2 = −20 + 40 + 2 = 22 m. The time the ball hits the ground is the positive root of h(t) = 0; using the quadratic formula gives t ≈ 4.10 s (to 2 d.p.). In a quadratic model, the vertex gives the optimum value and the zeros give the boundary conditions.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u2-l3",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 2,
    lessonNum: 3,
    unitName: "Functions & Modelling",
    title: "Exponential and Logistic Growth Models with Contextual Interpretation",
    subtitle:
      "When does exponential growth stop in the real world? — the reason the logistic model is especially important in IB Math AI",
    overview:
      "The logistic model is perhaps the sharpest point of difference between IB Math AI and other mathematics courses. Populations cannot grow forever, the spread of an infectious disease has a ceiling, and technology adoption reaches a saturation point — the logistic function encodes these constraints directly in its formula. Pure exponential growth describes reality well in the short term but overstates it in the long run. The logistic model builds the 'limiting factor' into the equation. Even with GDC access in Paper 2, if you cannot explain in words what each parameter of your model means, you will drop every mark on 'interpret' sub-parts. This lesson ties together the formula, the graph shape, and the contextual interpretation for both models in one go.",
    objectives: [
      "Apply the exponential growth/decay model f(t) = Ae^(kt) to real-world situations (population growth, radioactive decay, cooling) and interpret the parameters A and k",
      "Describe the parameters (L, A, k) of the logistic model f(t) = L / (1 + Ae^(−kt)) and the characteristics of its S-shaped curve",
      "Use two data points to determine the parameters of an exponential model by setting up a system of equations",
      "Select the more appropriate model (exponential or logistic) for a given context and justify the choice in writing",
      "Perform exponential and logistic regression on the GDC and interpret the results in the units of the problem",
    ],
    formulas: [
      "Exponential growth/decay: f(t) = Ae^(kt)  (k > 0: growth; k < 0: decay)",
      "Doubling time: t_d = ln(2) / k",
      "Half-life: t_½ = ln(2) / |k|",
      "Logistic function: f(t) = L / (1 + Ae^(−kt))",
      "Logistic initial value: f(0) = L / (1 + A)",
      "Logistic inflection point: t = ln(A) / k  (point of maximum growth rate)",
    ],
    sections: [
      {
        title: "Interpreting the Parameters of Exponential Growth and Decay Models",
        subtitle:
          "Memorising the formula is only half the job — reading A as the initial value and k as the growth rate from context is what IB Math AI is really testing",
        terms: [
          {
            term: "Exponential Growth Model",
            def: "f(t) = Ae^(kt) with k > 0. The value increases exponentially over time. A = f(0) is the initial value and k is the growth constant. Applications include bacterial growth, early investment returns, and the initial spread of a virus.",
          },
          {
            term: "Exponential Decay Model",
            def: "f(t) = Ae^(kt) with k < 0 (sometimes written f(t) = Ae^(−kt) with k > 0). The value approaches zero as time increases. Applications include radioactive decay, drug concentration decrease, and Newton's Law of Cooling.",
          },
          {
            term: "Doubling Time",
            def: "The time required for an exponentially growing quantity to double: t_d = ln(2)/k. If a population grows at 3% per year, k ≈ 0.03 and the doubling time ≈ ln(2)/0.03 ≈ 23 years. Note that the 'Rule of 72' (t_d ≈ 72/r%) is an approximation.",
          },
          {
            term: "Half-Life",
            def: "The time required for an exponentially decaying quantity to halve: t_½ = ln(2)/|k|. Carbon-14 has a half-life of approximately 5730 years, which is used in radiocarbon dating to determine the age of archaeological specimens.",
          },
        ],
        traps: [
          "Students sometimes miss the conversion between the base-e form f(t) = Ae^(kt) and the general-base form f(t) = Ab^t. The relationship is b = e^k. If a problem states 'grows at 8% per year,' then b = 1.08 and k = ln(1.08). When a GDC regression returns a result in the form e^(kt), remember that k is not the same as a percentage rate.",
          "The initial value of an exponential model is f(0) = Ae^0 = A. However, if data starts at t = 1 rather than t = 0, the parameter A is not the first measured data point. On IB exams, do not confuse 'the initial value according to the model' with 'the first recorded data value.'",
        ],
        example:
          "A city's population was 200,000 in 2020 and grows at an annual rate of 2.5%. Build an exponential model and estimate the population in 2035. Define t as the number of years from 2020. Annual growth of 2.5% means b = 1.025, so k = ln(1.025) ≈ 0.02469. Model: P(t) = 200000 × e^(0.02469t). For 2035, t = 15: P(15) = 200000 × e^(0.02469 × 15) = 200000 × e^(0.37035) ≈ 200000 × 1.4483 ≈ 289,660. Verification: 200000 × (1.025)^15 ≈ 289,648 — in close agreement.",
      },
      {
        title: "The Logistic Model — Mathematics of the S-Shaped Curve",
        subtitle:
          "How mathematics encodes a growth ceiling directly inside the formula — you must be able to interpret all three parameters L, A, and k",
        terms: [
          {
            term: "Logistic Function",
            def: "A function of the form f(t) = L / (1 + Ae^(−kt)). It produces an S-shaped (sigmoid) curve that initially grows exponentially and then levels off towards the carrying capacity L. Used to model population growth, disease spread, and technology adoption rates.",
          },
          {
            term: "Carrying Capacity (L)",
            def: "The maximum value that f(t) approaches in the logistic model: as t → ∞, f(t) → L. In ecology it represents the maximum population an environment can sustain; in IB problems it is interpreted as 'the value the quantity stabilises at in the long run.'",
          },
          {
            term: "Inflection Point",
            def: "The point on the logistic curve where the growth rate is at its maximum; after this point the rate of increase begins to slow. It occurs at t = ln(A)/k, at which f(t) = L/2. In other words, the inflection point of a logistic model is always at half the carrying capacity.",
          },
          {
            term: "Asymptote",
            def: "A line that the function approaches but never reaches. The logistic function has two horizontal asymptotes: y = L (upper) and y = 0 (lower). On IB questions about 'long-term behaviour,' you must mention the asymptote.",
          },
        ],
        traps: [
          "In the logistic model, the initial value is f(0) = L/(1 + A) — A itself is not the initial value. If an IB question asks you to 'find the initial value,' substitute t = 0 into the formula. Conversely, if the initial value is given and you need A, rearrange to get A = L/f(0) − 1. Reading A directly as the initial value produces a completely wrong answer.",
          "Do not confuse 'the time at which growth is fastest' with 'the time at which the carrying capacity is reached.' Maximum growth rate occurs at the inflection point where f = L/2; theoretically, f(t) never actually reaches L (it is an asymptote). On an exam, 'When does the population reach L?' is not a valid question; 'How close does the population get to L?' is the correct framing.",
        ],
        example:
          "The population of an invasive plant species on an island is modelled by P(t) = 800 / (1 + 15e^(−0.4t)), where t is in years. (a) What is the carrying capacity? L = 800. (b) What is the initial population (t = 0)? P(0) = 800/(1 + 15) = 800/16 = 50. (c) When is the population growing fastest? At f = L/2 = 400: t = ln(15)/0.4 = 2.708.../0.4 ≈ 6.77 years. (d) In the long term, the population converges to 800 — it will never exceed this value. Each parameter of the logistic model carries a specific ecological meaning, and IB always requires that interpretation to be stated with appropriate units.",
      },
    ],
  },
];
