/**
 * Core Notes English version — IB Math AA Unit 2 (Functions).
 * Full content preserved (objectives · terms · traps · example · formulas) with exam-accurate explanations.
 * Translated from the Korean 일타강사 storytelling version.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AA_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-math-aa-u2-l1",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 2,
    lessonNum: 1,
    unitName: "Functions",
    title: "Function Notation, Domain & Range, Composite & Inverse Functions",
    subtitle: "Once you see a function as a 'machine', composition and inverse functions become completely natural",
    overview:
      "A function is a rule that takes an input and produces exactly one output. IB AA builds domain, range, composition, and inverse functions on top of this simple definition, testing all of them evenly across Paper 1 and Paper 2. The most common mark-losing mistakes in IB marking are: confusing the order in f(g(x)) versus g(f(x)), and setting the wrong domain for an inverse function. Visualising a function as an 'input → process → output' machine — rather than as abstract symbols — makes both composition and inverse substitution far more intuitive.",
    objectives: [
      "Use function notation f(x) and f: A → B, and accurately distinguish domain, codomain, and range",
      "Evaluate the composite function (f∘g)(x) = f(g(x)) and demonstrate with examples that (f∘g)(x) and (g∘f)(x) are generally not equal",
      "Determine whether a function is one-to-one (injective) using the horizontal line test",
      "Find the inverse function f⁻¹(x) algebraically and explain that the domain of f⁻¹ equals the range of f",
      "Use the identity f(f⁻¹(x)) = f⁻¹(f(x)) = x to verify the correctness of an inverse function",
    ],
    formulas: [
      "(f∘g)(x) = f(g(x))",
      "(g∘f)(x) = g(f(x))",
      "f⁻¹(f(x)) = x,  f(f⁻¹(x)) = x",
      "domain of f⁻¹ = range of f",
      "range of f⁻¹ = domain of f",
    ],
    sections: [
      {
        title: "Function Notation, Domain & Range",
        subtitle: "The single symbol f: A → B carries all three concepts — domain, codomain, and range",
        terms: [
          {
            term: "Domain",
            def: "The set of all x-values that can be input into function f. When no restriction is stated, the 'natural domain' is every x that makes f(x) a real number. Example: the natural domain of f(x) = √(x − 3) is x ≥ 3.",
          },
          {
            term: "Codomain & Range",
            def: "The codomain is the entire set to which outputs are allowed to belong; the range (image) is the set of values actually produced as outputs. Range ⊆ codomain. When IB asks you to 'find the range', it means the range (image), not the codomain.",
          },
          {
            term: "One-to-one (Injective) function",
            def: "A function where different inputs always produce different outputs. Graphically, any horizontal line crosses the graph at most once — this is the horizontal line test. Being one-to-one is a necessary condition for an inverse function to exist.",
          },
          {
            term: "Onto (Surjective) function",
            def: "A function whose range equals the entire codomain: for every y in the codomain there exists an x such that f(x) = y. A function that is simultaneously one-to-one and onto is called bijective, and its inverse is perfectly defined on the same type of set.",
          },
        ],
        traps: [
          "Writing range and codomain as the same thing will cost marks on IB. For f: ℝ → ℝ defined by f(x) = x², the codomain is all of ℝ but the range is y ≥ 0. When the codomain is stated in the problem, you must compute and write the range separately.",
          "When finding the natural domain, you must check simultaneously for denominators equal to zero and for square roots of negative numbers. In expressions where both conditions overlap, students often handle only one and miss the other. When a fraction contains a square root, write both inequalities side by side: 'denominator ≠ 0' and 'expression under root ≥ 0'.",
        ],
        example:
          "Find the natural domain of f(x) = √(2x − 4) / (x − 5). Square-root condition: 2x − 4 ≥ 0 → x ≥ 2. Denominator condition: x − 5 ≠ 0 → x ≠ 5. Combining both conditions gives domain {x ∈ ℝ : x ≥ 2, x ≠ 5}, i.e. [2, 5) ∪ (5, ∞). Within this interval the minimum value is f(2) = 0, but since the function behaves differently as x → 5⁻ and x → 5⁺, further analysis is needed to determine the full range.",
      },
      {
        title: "Composite Functions",
        subtitle: "Two machines connected in series — the right-hand machine runs first",
        terms: [
          {
            term: "Composite function",
            def: "(f∘g)(x) = f(g(x)). Apply g first, then feed the result into f. The key point is that the symbol is read right to left.",
          },
          {
            term: "Domain of a composite function",
            def: "The domain of (f∘g)(x) is {x ∈ domain of g : g(x) ∈ domain of f}. Only x-values for which g is defined and whose output falls inside the domain of f are included.",
          },
          {
            term: "Non-commutativity of composition",
            def: "In general, f∘g ≠ g∘f. The only exception is when f and g are inverses of each other. IB questions that ask for both compositions are specifically testing awareness of this difference.",
          },
          {
            term: "Self-composition",
            def: "(f∘f)(x) = f(f(x)) — composing the same function with itself. Sometimes written f²(x). IB Paper 2 may ask: 'Find a such that (f∘f)(a) = k'.",
          },
        ],
        traps: [
          "A very common mistake when computing f(g(x)) is applying f first and g second. In f∘g, remember that 'g is on the inside, f is on the outside'. Draw arrows by hand to double-check. Even with simple-looking functions like f(x) = 2x + 1 and g(x) = x², f(g(x)) = 2x² + 1 and g(f(x)) = (2x+1)² are completely different.",
          "A frequent error when finding the domain of a composite function is checking only the domain of g without verifying whether the output of g falls inside the domain of f. For example, with f(x) = √x (x ≥ 0) and g(x) = 1 − 2x, the domain of (f∘g)(x) requires g(x) ≥ 0, giving x ≤ 1/2. The domain of g alone is all of ℝ, but the composite domain is much smaller.",
        ],
        example:
          "Given f(x) = 3x − 1 and g(x) = x² + 2, find (f∘g)(x) and (g∘f)(x), then compare their values at x = 2. (f∘g)(x) = f(g(x)) = f(x² + 2) = 3(x² + 2) − 1 = 3x² + 5. (g∘f)(x) = g(f(x)) = g(3x − 1) = (3x − 1)² + 2 = 9x² − 6x + 3. Substituting x = 2: (f∘g)(2) = 3·4 + 5 = 17, (g∘f)(2) = 9·4 − 12 + 3 = 27. Since 17 ≠ 27, non-commutativity is confirmed.",
      },
      {
        title: "Inverse Functions",
        subtitle: "If f 'locks', f⁻¹ 'unlocks' — the domain of the inverse is the range of the original",
        terms: [
          {
            term: "Inverse function",
            def: "f⁻¹ is the function that reverses the output of f back to its input: if f(a) = b then f⁻¹(b) = a. For an inverse function to exist, f must be one-to-one (injective).",
          },
          {
            term: "Domain & range of f⁻¹",
            def: "domain(f⁻¹) = range(f), range(f⁻¹) = domain(f). The domain and range of the original function swap exactly when forming the inverse. When the domain must be restricted for an inverse to exist (e.g. f(x) = x², x ≥ 0), you must explicitly state the restricted domain to avoid losing marks.",
          },
          {
            term: "Graph symmetry",
            def: "The graphs of f and f⁻¹ are reflections of each other in the line y = x. If (a, b) is on f then (b, a) is on f⁻¹. On IB Paper 2, you can use this symmetry to quickly verify a sketch or find intersection points.",
          },
          {
            term: "Procedure for finding f⁻¹",
            def: "① Write y = f(x). ② Solve for x to get x = (expression in y). ③ Swap x and y to write f⁻¹(x) = (expression in x). ④ State the domain. In IB extended-response questions, all four steps must be shown to earn full marks.",
          },
        ],
        traps: [
          "Confusing f⁻¹(x) with 1/f(x) is the most common error on Paper 1. f⁻¹ denotes the inverse function, not the reciprocal. The same logic applies: sin⁻¹(x) ≠ 1/sin(x). Writing a small note at the top of your working — 'f⁻¹ ≠ 1/f' — is the most effective way to prevent this mistake.",
          "After finding an inverse function, many students leave the domain as 'all real numbers'. For example, the inverse of f(x) = x², x ≥ 0 is f⁻¹(x) = √x with domain x ≥ 0. Without stating the domain, IB markers award only partial credit. Always append 'domain: …' whenever you write an inverse function.",
        ],
        example:
          "Find the inverse of f(x) = (2x + 3)/(x − 1), x ≠ 1. ① Write y = (2x + 3)/(x − 1). ② Solve for x: y(x − 1) = 2x + 3 → yx − y = 2x + 3 → yx − 2x = y + 3 → x(y − 2) = y + 3 → x = (y + 3)/(y − 2). ③ Swap x and y: f⁻¹(x) = (x + 3)/(x − 2). ④ Domain: finding the range of f shows y ≠ 2, so the domain of f⁻¹ is x ≠ 2. Verification: f(f⁻¹(x)) = f((x+3)/(x−2)) = (2·(x+3)/(x−2) + 3)/((x+3)/(x−2) − 1) = (2x+6+3x−6)/(x+3−x+2) = 5x/5 = x. ✓",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u2-l2",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 2,
    lessonNum: 2,
    unitName: "Functions",
    title: "Graph Transformations, Quadratic Functions & the Discriminant",
    subtitle: "A graph is the visual language of algebraic change — a complete system of translations, reflections, and stretches",
    overview:
      "Graph transformations are one of the fastest scoring areas in IB AA. If you fully internalise the transformation rules from y = f(x) to y = af(bx + c) + d, you can instantly sketch any new function the first time you see it. Quadratic functions are the ultimate test of these transformations — once vertex form and the discriminant are combined, the number and position of x-intercepts become immediately visible.",
    objectives: [
      "Accurately represent on a graph the transformations y = f(x) + d (vertical translation) and y = f(x − c) (horizontal translation) from y = f(x)",
      "Understand the transformations y = af(x) (vertical stretch/reflection) and y = f(bx) (horizontal stretch/reflection), and calculate the changed coordinates of key points",
      "Convert a quadratic function to vertex form f(x) = a(x − h)² + k and identify the vertex (h, k) and axis of symmetry x = h",
      "Use the discriminant Δ = b² − 4ac to determine the number of real roots of a quadratic equation (two distinct roots, a repeated root, or no real roots)",
      "Determine the maximum or minimum value and the range of a quadratic function using vertex form",
    ],
    formulas: [
      "y = f(x) + d  → vertical translation by d (up if d>0, down if d<0)",
      "y = f(x − c) → horizontal translation by c (right if c>0, left if c<0)",
      "y = af(x)     → vertical stretch by factor |a| (reflection in x-axis if a<0)",
      "y = f(bx)     → horizontal stretch by factor 1/|b| (reflection in y-axis if b<0)",
      "f(x) = a(x − h)² + k  (vertex form)",
      "x = −b / (2a)  (x-coordinate of vertex)",
      "Δ = b² − 4ac",
      "Δ > 0 → two distinct real roots,  Δ = 0 → repeated root,  Δ < 0 → no real roots",
    ],
    sections: [
      {
        title: "Transformations of Graphs",
        subtitle: "y = af(b(x − c)) + d — four parameters that translate, stretch, and reflect a graph",
        terms: [
          {
            term: "Vertical translation",
            def: "y = f(x) + d shifts every point d units in the y-direction. d > 0 moves the graph up; d < 0 moves it down. The x-intercepts change but the shape and gradient are unaffected.",
          },
          {
            term: "Horizontal translation",
            def: "y = f(x − c) shifts the graph c units in the x-direction. c > 0 moves it right; c < 0 moves it left. This is the opposite direction to what the sign suggests — pay careful attention to the sign.",
          },
          {
            term: "Vertical stretch & reflection",
            def: "y = af(x) multiplies every y-value by a. |a| > 1 gives a vertical stretch; 0 < |a| < 1 gives a vertical compression. When a < 0, a reflection in the x-axis occurs at the same time.",
          },
          {
            term: "Horizontal stretch & reflection",
            def: "y = f(bx) replaces every x-value with x/b. |b| > 1 gives a horizontal compression; 0 < |b| < 1 gives a horizontal stretch. When b < 0, a reflection in the y-axis occurs at the same time.",
          },
        ],
        traps: [
          "It is very common to mis-remember y = f(x − 3) as 'shift 3 to the left because of the minus sign'. It is actually a shift of 3 to the right. Derive it directly: substituting x − 3 means the original value at x = 0 now appears at x = 3. Whenever the sign is uncertain, check where the point x = 0 moves.",
          "When transforming y = f(2x + 4), you must first factorise it as y = f(2(x + 2)) and then read the transformation as 'horizontal compression by factor 1/2, then shift left by 2'. Many students skip the factorisation step and incorrectly read x + 4 as 'shift right by 4'. For compound horizontal transformations, always rewrite in the form f(b(x − c)) first.",
        ],
        example:
          "Starting from f(x) = x², sketch g(x) = −2(x + 1)² + 3 step by step. ① y = (x + 1)²: shift f(x) left by 1. ② y = 2(x + 1)²: vertical stretch by factor 2. ③ y = −2(x + 1)²: reflect in the x-axis. ④ y = −2(x + 1)² + 3: shift up by 3. The final graph has vertex (−1, 3) and opens downward. Tracking the vertex through each step — (0,0) → (−1,0) → (−1,0) → (−1,0) → (−1,3) — makes errors impossible.",
      },
      {
        title: "Quadratic Functions & Vertex Form",
        subtitle: "A single completing-the-square step reveals the vertex, maximum/minimum, and range all at once",
        terms: [
          {
            term: "Vertex form",
            def: "f(x) = a(x − h)² + k. Vertex is (h, k), axis of symmetry is x = h. If a > 0 the function has a minimum value of k (opens upward); if a < 0 it has a maximum value of k (opens downward).",
          },
          {
            term: "Completing the square",
            def: "ax² + bx + c → a(x + b/(2a))² + (c − b²/(4a)). This technique is the essential tool for reaching vertex form. It is required on IB Paper 1 whenever you must find the vertex without a calculator.",
          },
          {
            term: "x-coordinate of the vertex",
            def: "x = −b/(2a). Use this to find the x-coordinate of the vertex quickly without completing the square. Substitute this value back into f to obtain the y-coordinate (the maximum or minimum value).",
          },
          {
            term: "Range of a quadratic function",
            def: "If a > 0 the range is [k, ∞); if a < 0 it is (−∞, k]. Converting to vertex form gives the range immediately. When the domain is restricted, you must also compare the values at the endpoints.",
          },
        ],
        traps: [
          "When converting f(x) = 2x² − 8x + 5 to vertex form, students frequently forget to compensate the constant: 2(x² − 4x) + 5 = 2(x − 2)² − 8 + 5 = 2(x − 2)² − 3. The term subtracted inside the brackets must be multiplied by a when moved outside. If you factor out 2, the compensating constant outside is 2 × (the number added to complete the square), not just the number itself.",
          "In the vertex formula x = −b/(2a), students often write b instead of −b in the numerator. The formula has a negative sign: it is −b, not b. For f(x) = x² − 6x + 2 the x-coordinate of the vertex is x = −(−6)/(2·1) = 3, not x = −6/2 = −3.",
        ],
        example:
          "Convert f(x) = 3x² − 12x + 7 to vertex form and find the range. ① Factor out 3: 3(x² − 4x) + 7. ② Complete the square: 3(x − 2)² − 3·4 + 7 = 3(x − 2)² − 12 + 7 = 3(x − 2)² − 5. ③ Vertex (2, −5); since a = 3 > 0 the parabola opens upward. ④ Range: f(x) ≥ −5, i.e. [−5, ∞). Verification: f(2) = 12 − 24 + 7 = −5 ✓.",
      },
      {
        title: "The Discriminant & Roots of a Quadratic",
        subtitle: "Δ = b² − 4ac alone tells you the number of roots, whether they are rational, and whether they are integers",
        terms: [
          {
            term: "Discriminant",
            def: "Δ = b² − 4ac. This is the expression under the square root in the quadratic formula x = (−b ± √Δ)/(2a). Δ > 0 gives two distinct real roots; Δ = 0 gives a repeated (equal) root; Δ < 0 means no real roots (two complex roots).",
          },
          {
            term: "Repeated root",
            def: "When Δ = 0 the equation has exactly one root x = −b/(2a). Geometrically, the parabola is tangent to the x-axis. IB frequently asks: 'Find k such that the quadratic has a repeated root'.",
          },
          {
            term: "Rational roots condition",
            def: "If Δ is a perfect square then √Δ is rational, giving rational roots from the quadratic formula. IB HL includes proof-style questions that classify the nature of roots using the value of the discriminant.",
          },
          {
            term: "Vieta's formulas",
            def: "For the roots α and β of ax² + bx + c = 0: α + β = −b/a and αβ = c/a. You can find the sum and product of the roots immediately without using the discriminant, saving significant time on IB extended-response questions.",
          },
        ],
        traps: [
          "When applying Δ = b² − 4ac, students often square b without keeping its sign, leading to errors. Example: for f(x) = 3x² − 5x + 2, Δ = (−5)² − 4·3·2 = 25 − 24 = 1. Since b = −5, note that b² = 25. Always enclose b in brackets — write (−5)² — to avoid sign mistakes.",
          "'The quadratic meets the x-axis at two points' and 'the quadratic has two positive real roots' are different conditions. The former requires only Δ > 0, but the latter additionally requires α + β > 0 (i.e. −b/a > 0) and αβ > 0 (i.e. c/a > 0). Stopping at Δ > 0 alone earns only partial credit.",
        ],
        example:
          "Find the range of values of k for which x² + kx + (k + 3) = 0 has two distinct real roots. Δ = k² − 4(k + 3) = k² − 4k − 12 > 0. Factorising: (k − 6)(k + 2) > 0. Number-line analysis: k < −2 or k > 6. Therefore, for two distinct real roots, k ∈ (−∞, −2) ∪ (6, ∞). The repeated-root condition is Δ = 0, i.e. k = −2 or k = 6.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u2-l3",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 2,
    lessonNum: 3,
    unitName: "Functions",
    title: "Rational Functions, and Graphs of Exponential & Logarithmic Functions",
    subtitle: "The moment you can read asymptotes, the shape of every rational, exponential, and logarithmic graph falls into place",
    overview:
      "Rational functions have 'lines where the denominator becomes zero'; exponential and logarithmic functions have 'horizontal or vertical boundaries they never reach' — these are asymptotes. The goal of IB AA Unit 2 is to sketch all three families perfectly and accurately describe their asymptotes, intercepts, and monotonicity. Going beyond rote memorisation of shapes to understanding how each parameter changes the graph will give you the confidence to handle any variation question.",
    objectives: [
      "Find the vertical and horizontal asymptotes of f(x) = 1/x and f(x) = (ax + b)/(cx + d), and sketch their graphs",
      "Describe the key properties of the exponential function f(x) = aˣ (a > 0, a ≠ 1): monotonicity, horizontal asymptote y = 0, and y-intercept of 1",
      "Confirm that f(x) = log_a(x) is the inverse of the exponential function by identifying the y = x symmetry of their graphs",
      "Connect the number of intersections of graphs of exponential and logarithmic equations to the existence of solutions",
      "Find the asymptote y = k, y-intercept, and the point (h, A + k) for a transformed exponential function of the form f(x) = A·aˣ⁻ʰ + k",
    ],
    formulas: [
      "f(x) = 1/(x − h) + k : vertical asymptote x = h, horizontal asymptote y = k",
      "f(x) = (ax + b)/(cx + d) : vertical asymptote x = −d/c, horizontal asymptote y = a/c",
      "f(x) = aˣ : domain ℝ, range (0, ∞), horizontal asymptote y = 0",
      "f(x) = A·a^(x−h) + k : horizontal asymptote y = k",
      "f(x) = log_a(x) : domain (0, ∞), range ℝ, vertical asymptote x = 0",
      "aˣ = e^(x·ln a)  (conversion to natural exponential form)",
    ],
    sections: [
      {
        title: "Rational Functions & Asymptotes",
        subtitle: "Where the denominator is zero is the vertical asymptote — comparing degrees determines the horizontal asymptote",
        terms: [
          {
            term: "Vertical asymptote",
            def: "For f(x) = p(x)/q(x), the line x = c is a vertical asymptote where q(c) = 0 and p(c) ≠ 0. The function value approaches ±∞ as x approaches c. Only roots of q(x) = 0 that cannot be cancelled by a common factor with p(x) give vertical asymptotes.",
          },
          {
            term: "Horizontal asymptote",
            def: "The value y = L that f(x) approaches as x → ±∞. When the highest-degree terms of numerator and denominator have the same degree, as in f(x) = (ax + b)/(cx + d), the horizontal asymptote is y = a/c (the ratio of leading coefficients). If the degree of the numerator is smaller, the asymptote is y = 0.",
          },
          {
            term: "Hole (Removable discontinuity)",
            def: "If p(x)/q(x) has a common factor (x − r) that cancels, a hole (an empty point) appears at x = r instead of a vertical asymptote. On IB extended-response questions you must mark the hole as an open circle (○) on the graph and state its coordinates to avoid losing marks.",
          },
          {
            term: "Oblique (Slant) asymptote",
            def: "When the degree of the numerator is exactly 1 more than the degree of the denominator, polynomial long division produces a linear expression y = mx + n that is the oblique asymptote. This appears on IB AA HL; you must show that the remainder term tends to 0 as x → ∞.",
          },
        ],
        traps: [
          "A common error is identifying all roots of q(x) = 0 as vertical asymptotes. If a common factor cancels, the result is a hole, not an asymptote. Example: f(x) = (x² − 4)/(x − 2) = x + 2 (x ≠ 2). This function has no vertical asymptote — only a hole at x = 2. Always check for cancellable factors before sketching the graph.",
          "For f(x) = (3x² + 1)/(2x + 5), where the degree of the numerator exceeds that of the denominator, students sometimes incorrectly write y = 3/2 as a horizontal asymptote. This function has an oblique asymptote (degree difference = 1), not a horizontal one. Perform polynomial long division to find the slant asymptote in the form y = (3/2)x + ….",
        ],
        example:
          "Find all asymptotes and intercepts of f(x) = (2x + 3)/(x − 1) and describe the shape of the graph. Vertical asymptote: x − 1 = 0 → x = 1. Horizontal asymptote: ratio of leading coefficients → y = 2/1 = 2. x-intercept: f(x) = 0 → 2x + 3 = 0 → x = −3/2. y-intercept: f(0) = 3/(−1) = −3. Behaviour near the asymptote: f(1⁺) → +∞, f(1⁻) → −∞. The graph is a rectangular hyperbola with asymptotes x = 1 and y = 2. Rewriting in the form 1/(x−h)+k: f(x) = 2 + 5/(x − 1).",
      },
      {
        title: "Exponential Functions",
        subtitle: "The size of the base a determines growth or decay; vertical and horizontal shifts change the asymptote",
        terms: [
          {
            term: "Basic exponential function",
            def: "f(x) = aˣ (a > 0, a ≠ 1). If a > 1 the function is increasing (grows rapidly as x → ∞ and approaches 0 as x → −∞); if 0 < a < 1 it is decreasing. The horizontal asymptote is always y = 0 and the y-intercept is always 1.",
          },
          {
            term: "Transformed exponential function",
            def: "f(x) = A·a^(x−h) + k. The horizontal asymptote shifts to y = k; the y-intercept becomes f(0) = A·a^(−h) + k. The point (h, A + k) is a 'reference point' that always lies on the graph.",
          },
          {
            term: "Natural exponential function",
            def: "f(x) = eˣ (e ≈ 2.718). The central function connecting to calculus in IB AA. Using aˣ = e^(x·ln a) converts any exponential into natural exponential form, standardising differentiation and integration.",
          },
          {
            term: "Exponential growth & decay model",
            def: "P(t) = P₀·e^(kt). If k > 0, the model describes growth; if k < 0, decay. In IB AA this appears for graph interpretation in Unit 2 and is revisited with differentiation and integration in Unit 5.",
          },
        ],
        traps: [
          "Writing the horizontal asymptote of y = 2ˣ + 3 as y = 0 is a frequent error. The vertical shift of +3 moves the asymptote to y = 3. Always pair 'horizontal asymptote = vertical shift constant' in your memory. Missing y = k also leads to writing the range as (0, ∞) instead of (3, ∞) — both marks are lost together.",
          "When the coefficient A is negative, determining the direction of the graph becomes confusing. For y = −2·3ˣ with A < 0, the graph lies entirely below the x-axis and heads towards −∞. The horizontal asymptote is still y = 0, but the graph is always below it. Check the sign of A first before sketching.",
        ],
        example:
          "For f(x) = 3·2^(x−1) − 6, find the horizontal asymptote, y-intercept, x-intercept, and range. Horizontal asymptote: y = −6. y-intercept (x = 0): f(0) = 3·2^(−1) − 6 = 3/2 − 6 = −9/2. x-intercept (f(x) = 0): 3·2^(x−1) = 6 → 2^(x−1) = 2 → x − 1 = 1 → x = 2. Range: since 3·2^(x−1) > 0, we have f(x) > −6, so the range is (−6, ∞). The graph passes through the reference point (1, −3) (since A·a⁰ + k = 3 + (−6) = −3) and increases exponentially to the right.",
      },
      {
        title: "Logarithmic Functions & Combined Exponential–Logarithmic Problems",
        subtitle: "A logarithmic graph is the y = x reflection of its exponential partner — a vertical asymptote is born",
        terms: [
          {
            term: "Basic logarithmic function",
            def: "f(x) = log_a(x) (a > 0, a ≠ 1). Domain (0, ∞), range ℝ, vertical asymptote x = 0, x-intercept (1, 0). The function is increasing if a > 1 and decreasing if 0 < a < 1.",
          },
          {
            term: "Transformed logarithmic function",
            def: "f(x) = A·log_a(x − h) + k. Vertical asymptote is x = h; the x-intercept is found by solving f(x) = 0. Domain is x > h. Applying the vertical shift k and horizontal shift h step by step gives an accurate sketch.",
          },
          {
            term: "Relationship between exponential and logarithmic functions",
            def: "y = aˣ and y = log_a(x) are inverse functions of each other. Their graphs are symmetric about the line y = x. The correspondence is: aˣ has y-intercept (0, 1) and no x-intercept ↔ log_a(x) has x-intercept (1, 0) and no y-intercept.",
          },
          {
            term: "Natural logarithm function",
            def: "f(x) = ln(x) = log_e(x). The inverse of eˣ. Key identities: ln(eˣ) = x and e^(ln x) = x. This function is foundational for calculus and differential equations in IB AA and recurs throughout Unit 5.",
          },
        ],
        traps: [
          "Writing the domain of log_a(x − h) + k as x > 0 is a common error. The horizontal shift of h moves the vertical asymptote to x = h, so the domain is x > h. Always treat 'vertical asymptote x = h → domain x > h' as a single paired fact when working with logarithmic functions.",
          "When faced with an equation like log(x) = eˣ, students sometimes try to solve it algebraically and get stuck. IB designs these questions for the GDC (graphic display calculator) — the solutions are the x-coordinates of the intersection of the two graphs. Attempting an algebraic approach on Paper 2 wastes time. Recognise 'intersection of graphs = solution of simultaneous equations' and switch to the GDC immediately.",
        ],
        example:
          "For f(x) = 2·ln(x + 3) − 4, find the vertical asymptote, x-intercept, y-intercept, domain, and range. Vertical asymptote: x + 3 = 0 → x = −3. Domain: x > −3. y-intercept (x = 0): f(0) = 2·ln(3) − 4 ≈ 2·1.099 − 4 ≈ −1.802. x-intercept (f(x) = 0): 2·ln(x+3) = 4 → ln(x+3) = 2 → x + 3 = e² → x = e² − 3 ≈ 4.389. Range: since ln(x+3) has range ℝ, multiplying by 2 and subtracting 4 still gives all of ℝ, so the range is ℝ. The graph increases monotonically to the right of the asymptote x = −3, crossing the x-axis at (e²−3, 0) and the y-axis at (0, 2ln3−4).",
      },
    ],
  },
];
