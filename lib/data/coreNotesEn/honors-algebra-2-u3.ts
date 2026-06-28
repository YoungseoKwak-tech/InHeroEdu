/**
 * Core Notes English version — Honors Algebra 2 Unit 3 (Polynomials & Polynomial Functions).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ALGEBRA_2_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-algebra-2-u3-l1",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 3,
    lessonNum: 1,
    unitName: "Polynomials & Polynomial Functions",
    title: "Polynomial Operations & Factoring — Expansion, Grouping & Special Formulas",
    subtitle: "Memorize the sum/difference of cubes and the last piece of the factoring puzzle clicks into place",
    overview:
      "After conquering quadratics, the first wall students hit in Honors Algebra 2 is factoring higher-degree polynomials. The 'trial and error' that worked for quadratic factoring is far too slow for degree 3 and above. The core strategy: 'The moment you recognize special product formulas as patterns, higher-degree polynomials become as easy as quadratics.' Difference of squares, sum of squares, sum/difference of cubes — these formulas are not rote memorization but should be understood as expansion in reverse. Strategic ordering like pulling out the GCF first and grouping also determines factoring speed. This lesson masters everything from polynomial operations to higher-degree special factoring formulas.",
    objectives: [
      "Add, subtract, and multiply polynomials and express the result in descending order after combining like terms",
      "Apply GCF factoring, grouping, and quadratic-form substitution as appropriate to factor a polynomial completely",
      "Use the sum of cubes a³ + b³ = (a + b)(a² − ab + b²) and difference of cubes a³ − b³ = (a − b)(a² + ab + b²) to factor",
      "Quickly recognize perfect square trinomials and perfect cube binomials from their structure",
      "Apply the priority order of factoring (GCF → count terms → check special formulas → general factoring) to decompose any polynomial step by step",
    ],
    formulas: [
      "Sum of cubes: a³ + b³ = (a + b)(a² − ab + b²)",
      "Difference of cubes: a³ − b³ = (a − b)(a² + ab + b²)",
      "Perfect square trinomial: a² ± 2ab + b² = (a ± b)²",
      "Difference of squares: a² − b² = (a + b)(a − b)",
      "Quadratic-form substitution: ax⁴ + bx² + c → let u = x², giving au² + bu + c",
    ],
    sections: [
      {
        title: "Polynomial Operations & Basic Factoring Strategy",
        subtitle: "GCF first, then count the terms — follow this order and half the factoring is done",
        terms: [
          {
            term: "Polynomial",
            def: "An expression made of a sum of terms. Each term consists of a coefficient and a power of a variable (a monomial). The degree is the highest exponent, and it is always written in descending order (standard form: highest degree first). Example: 3x⁴ − 2x² + 5x − 7 is a degree-4 polynomial.",
          },
          {
            term: "GCF factoring",
            def: "The first step of factoring is always to pull out the GCF. Factor out the number and variable common to every term at once. Example: 4x³ − 8x² + 12x = 4x(x² − 2x + 3). Miss the GCF and the factoring becomes incomplete later, costing points.",
          },
          {
            term: "Grouping",
            def: "Splitting four or more terms into two groups, factoring the GCF from each, then pulling out the common binomial factor. Example: x³ + 2x² − 3x − 6 = x²(x + 2) − 3(x + 2) = (x² − 3)(x + 2). Grouping only works when the parentheses match after factoring each group.",
          },
          {
            term: "Quadratic-form substitution",
            def: "An expression with an 'even/half' exponent structure like ax⁴ + bx² + c becomes the quadratic au² + bu + c when you let u = x². Factor the quadratic, then substitute x² back for u. Example: x⁴ − 5x² + 4 = (u − 1)(u − 4) = (x² − 1)(x² − 4) = (x + 1)(x − 1)(x + 2)(x − 2).",
          },
        ],
        traps: [
          "A frequent error is not checking whether the leftover factor factors further after pulling out the GCF. Stopping at 2x⁴ − 8x² = 2x²(x² − 4) is wrong. You must factor x² − 4 = (x + 2)(x − 2) for the complete answer. Always test each factor with 'can this be broken down further?'",
          "In grouping, sign errors are common when the second group's GCF involves a negative. In x³ − 3x² − 4x + 12, the GCF of the second group −4x + 12 is not −4 but factoring correctly gives −4(x − 3). Watch the sign so the parentheses match the first group.",
        ],
        example:
          "Factor x⁴ − 16 completely. First check the structure: x⁴ − 16 = (x²)² − 4² — apply the difference of squares! (x² + 4)(x² − 4). But x² − 4 is again a difference of squares: (x + 2)(x − 2). x² + 4 cannot be factored over the reals (a sum of squares, unlike a difference, does not factor). Final answer: (x² + 4)(x + 2)(x − 2). Checking for a GCF first, then testing each factor for further decomposition, is the heart of complete factoring.",
      },
      {
        title: "Sum & Difference of Cubes",
        subtitle: "With the SOAP mnemonic (Same · Opposite · Always Positive) you never miss the signs of the two formulas",
        terms: [
          {
            term: "Sum of cubes",
            def: "a³ + b³ = (a + b)(a² − ab + b²). The product of a binomial factor (a + b) and a trinomial factor (a² − ab + b²). The trinomial's sign pattern is +, −, +. Example: 8x³ + 27 = (2x)³ + 3³ = (2x + 3)(4x² − 6x + 9).",
          },
          {
            term: "Difference of cubes",
            def: "a³ − b³ = (a − b)(a² + ab + b²). The product of a binomial factor (a − b) and a trinomial factor (a² + ab + b²). The trinomial's sign pattern is +, +, +. Example: 64x³ − 1 = (4x)³ − 1³ = (4x − 1)(16x² + 4x + 1).",
          },
          {
            term: "SOAP mnemonic",
            def: "A way to remember the signs of the cube formulas: S(ame) — the binomial's sign matches the original; O(pposite) — the trinomial's middle term has the opposite sign; A(lways) P(ositive) — the trinomial's last term is always positive. For a³ + b³: binomial (a + b), middle −ab, last +b².",
          },
          {
            term: "Perfect cube",
            def: "A number or expression obtained by cubing something. 1, 8, 27, 64, 125, 216, … are perfect cubes, and x³, 8x³, 27x⁶, etc. are perfect cube expressions. Before applying the cube formula, confirm each term is a perfect cube so you set a and b correctly.",
          },
        ],
        traps: [
          "The most common error is trying to factor the trinomial factor again like a quadratic. a² − ab + b² and a² + ab + b² do not factor further over the reals. Checking the discriminant gives D = b² − 4(1)(b²) = −3b² < 0, so there are no real roots. Don't write a wrong answer by attempting more factoring.",
          "Setting a and b incorrectly before applying the cube formula is also common. Don't plug 54x³ + 16 straight into the cube formula. First pull out the GCF = 2: 2(27x³ + 8) = 2((3x)³ + 2³), making the formula easy to apply. The rule is GCF first, special formula second.",
        ],
        example:
          "Factor x⁶ − 64 completely. Viewing it as x⁶ − 64 = (x²)³ − 4³ applies the difference of cubes! a = x², b = 4. → (x² − 4)((x²)² + 4x² + 16) = (x² − 4)(x⁴ + 4x² + 16). Now factor x² − 4 = (x + 2)(x − 2). Alternatively, viewing it first as x⁶ − 64 = (x³)² − 8² gives the difference of squares first: (x³ + 8)(x³ − 8). Then applying sum/difference of cubes gives (x + 2)(x² − 2x + 4)(x − 2)(x² + 2x + 4). Both routes give the same fully factored final form.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u3-l2",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 3,
    lessonNum: 2,
    unitName: "Polynomials & Polynomial Functions",
    title: "Graphing Polynomial Functions — End Behavior, Zeros, Multiplicity & Sketching",
    subtitle: "Two end-behavior cases plus two multiplicity rules, and any polynomial sketches in three seconds",
    overview:
      "A quadratic always had a 'fixed shape' — a parabola. But degree-3, -4, -5 polynomial functions can take on a variety of turns and shapes. To graph one accurately you need two key tools: end behavior and the multiplicity of zeros. The core message: 'On exams, graphing problems are a battle of pattern recognition, not calculation.' The sign of the degree and the leading coefficient determines the two ends of the graph, and reading the exponent at each zero in factored form tells you immediately whether the graph crosses or touches there. This lesson masters the complete strategy for sketching polynomial graphs.",
    objectives: [
      "Determine a polynomial's end behavior as x → ±∞ instantly from the degree and the sign of the leading coefficient",
      "Read each zero and its multiplicity from factored form and judge whether the graph crosses (odd multiplicity) or touches (even multiplicity) the x-axis",
      "Use the fact that the maximum number of turns is (degree − 1) to gauge the number of bends",
      "Compute the y-intercept and combine zeros, end behavior, and multiplicity information to sketch a polynomial graph accurately",
      "Read the parity of the degree, the sign of the leading coefficient, and the multiplicities of zeros backward from a graph",
    ],
    formulas: [
      "End behavior: even degree + positive leading coef → both ends ↑↑ | even degree + negative leading coef → both ends ↓↓",
      "End behavior: odd degree + positive leading coef → left ↓ right ↑ | odd degree + negative leading coef → left ↑ right ↓",
      "Odd multiplicity → crosses the x-axis | even multiplicity → touches/bounces off the x-axis",
      "Number of zeros ≤ degree (a degree-n polynomial has at most n real zeros)",
      "Maximum number of turns (local extrema) = degree − 1",
    ],
    sections: [
      {
        title: "End Behavior & Multiplicity of Zeros",
        subtitle: "Lock the two ends first, decide cross vs. touch at each zero, and the skeleton of the sketch is complete",
        terms: [
          {
            term: "End behavior",
            def: "How f(x) behaves as x goes to +∞ or −∞. Only the leading term determines end behavior. If the leading coefficient is positive and the degree is odd, then f(x) → −∞ (x → −∞) and f(x) → +∞ (x → +∞).",
          },
          {
            term: "Zero / Real root",
            def: "An x-value satisfying f(x) = 0 — the x-coordinate where the graph meets the x-axis. In factored form f(x) = a(x − r₁)^m₁(x − r₂)^m₂…, each rᵢ is a zero and the exponent mᵢ is its multiplicity.",
          },
          {
            term: "Multiplicity",
            def: "The number of times a factor (x − r) repeats in the factorization. If the multiplicity is odd, the graph crosses through the x-axis; if even, the graph touches and bounces back. Multiplicity 1 → cross, 2 → touch, 3 → S-shaped crossing.",
          },
          {
            term: "Leading term",
            def: "The term of highest degree in a polynomial. Its coefficient is the leading coefficient and its degree is the polynomial's degree. Even in factored (not expanded) form, the leading term is the product of the leading terms of each factor.",
          },
        ],
        traps: [
          "When deciding end behavior, a common error is looking only at the leading coefficient and ignoring the parity of the degree. In f(x) = −2x⁴ + 5x³ − 1, the leading coefficient is −2 and the degree is 4 (even), so both ends fall to −∞. Always check both the parity of the degree and the sign of the leading coefficient together.",
          "Some misread an even-multiplicity zero as 'the graph doesn't reach the x-axis.' At an even-multiplicity zero, the graph touches the x-axis and then turns back — this point is still an x-intercept. The graph does not cross; it does not fail to meet.",
        ],
        example:
          "Analyze the end behavior, zeros, and multiplicities of f(x) = −x(x − 2)²(x + 3) and sketch the graph. Leading term: −x · x² · x = −x⁴ → degree 4 (even), leading coefficient −1 (negative) → end behavior: as x → ±∞, f(x) → −∞ (both ends down). Zeros: x = 0 (mult. 1 → cross), x = 2 (mult. 2 → touch), x = −3 (mult. 1 → cross). y-intercept: x = 0 → f(0) = 0. Maximum turns: 4 − 1 = 3. Sketch: start at −∞ on the left → cross at x = −3 → up → touch (bounce) at x = 2 → back down → cross at x = 0 → to −∞.",
      },
      {
        title: "Reading Information Backward from a Graph & Complete Sketching Strategy",
        subtitle: "Reverse training — writing the equation from the graph — is the key high-scoring point on Honors exams",
        terms: [
          {
            term: "y-intercept",
            def: "The value f(0) found by substituting x = 0. In factored form, compute it quickly by substituting 0 into each factor. For f(x) = 3(x − 1)(x + 4)(x − 2), f(0) = 3(−1)(4)(−2) = 24. The y-intercept acts as an 'anchor' point when graphing.",
          },
          {
            term: "Local maximum / Local minimum",
            def: "A hill on the graph is a local max, a valley a local min. A degree-n polynomial can have at most n − 1 local extrema. Their exact locations are handled in calculus, but at the Honors level they are used to gauge the number of bends.",
          },
          {
            term: "Writing equations from graphs",
            def: "Building a polynomial's equation backward from the x-intercepts, multiplicities, and y-intercept. Write f(x) = a(x − r₁)^m₁(x − r₂)^m₂… from the x-intercepts r₁, r₂, … and their multiplicities, then substitute an additional given point (usually the y-intercept) to determine the constant a.",
          },
          {
            term: "Continuity & IVT",
            def: "Polynomial functions are always continuous. By the Intermediate Value Theorem, if f(a) and f(b) have opposite signs, a zero must exist between (a, b). Use a table to estimate or confirm the approximate location of a zero.",
          },
        ],
        traps: [
          "When reconstructing an equation from a graph, a common error is assuming the constant a is always 1. If a point is given (usually the y-intercept or another specific point), you must substitute it to find a. Without finding a, the graph's 'shape' is right but the scale is off, costing points.",
          "Some mistake the maximum number of turns for the exact number. The maximum number of turns of a degree-n polynomial is n − 1, but the actual number can be fewer. For example, f(x) = x³ has odd degree and positive leading coefficient but 0 turns. Note it is 'at most n − 1,' not 'exactly n − 1.'",
        ],
        example:
          "Find the equation of a polynomial with x-intercepts x = −2 (mult. 2), x = 1 (mult. 1), x = 4 (mult. 1), and y-intercept (0, −16). Structure: f(x) = a(x + 2)²(x − 1)(x − 4). Substitute the y-intercept: f(0) = a(2)²(−1)(−4) = a · 4 · 4 = 16a = −16 → a = −1. Final equation: f(x) = −(x + 2)²(x − 1)(x − 4). Check — end behavior: leading term = −x⁴, even degree and negative leading coefficient → both ends ↓↓. Touch (bounce) at x = −2, cross at x = 1 and x = 4. All conditions satisfied ✓.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u3-l3",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 3,
    lessonNum: 3,
    unitName: "Polynomials & Polynomial Functions",
    title: "Remainder, Factor & Rational Root Theorems and Polynomial Division",
    subtitle: "Find a remainder without dividing using the Remainder Theorem, and narrow the factor candidates with the Rational Root Theorem",
    overview:
      "The hardest moment when factoring a degree-3-or-higher polynomial is 'Where do I start?' Searching for a factor by random trial and error burns all your time. The core strategy: 'Build candidates first with the Rational Root Theorem, then verify whether each is an actual factor in two seconds with the Remainder Theorem.' Once you find an exact factor, use synthetic division or polynomial long division to find the quotient and factor completely. This combo of three tools is the most powerful weapon in Honors Algebra 2 Unit 3. This lesson masters two division techniques and three theorems.",
    objectives: [
      "Perform polynomial long division and express the result with the division algorithm f(x) = d(x)·q(x) + r(x)",
      "Use synthetic division to find the quotient and remainder quickly when dividing by a linear divisor (x − c)",
      "Use the Remainder Theorem to find f(c) as the remainder without actually dividing",
      "Use the Factor Theorem to judge instantly whether (x − c) is a factor of f(x) by computing f(c) = 0",
      "Use the Rational Root Theorem to build a list of candidate rational roots and, combined with synthetic division and the Remainder Theorem, factor a higher-degree polynomial completely",
    ],
    formulas: [
      "Division algorithm: f(x) = d(x) · q(x) + r(x)",
      "Remainder Theorem: the remainder of f(x) ÷ (x − c) = f(c)",
      "Factor Theorem: (x − c) is a factor of f(x) ⟺ f(c) = 0",
      "Rational Root Theorem: candidate rational roots = ±(factors of the constant term) / ±(factors of the leading coefficient)",
      "Synthetic division result: f(x) ÷ (x − c) → quotient q(x), remainder r = f(c)",
    ],
    sections: [
      {
        title: "Polynomial Division — Long Division & Synthetic Division",
        subtitle: "Long division builds understanding, synthetic division builds speed — on exams, use synthetic division fluently",
        terms: [
          {
            term: "Polynomial long division",
            def: "Dividing polynomials with the same structure as integer long division. Divide leading terms to get one quotient term at a time, multiply, and subtract, repeating the process. You must use it when the divisor is degree 2 or higher or is not a binomial. Always check the result in the form f(x) = d(x)q(x) + r(x).",
          },
          {
            term: "Synthetic division",
            def: "A fast division method usable only when the divisor is a linear (x − c). Using only the coefficients, you find the quotient's coefficients and the remainder with addition and multiplication. Steps: (1) list the coefficients (fill missing degrees with 0); (2) write c and repeat bring-down, multiply, add; (3) the last value is the remainder, the rest are the quotient's coefficients.",
          },
          {
            term: "Division algorithm",
            def: "f(x) = d(x) · q(x) + r(x), where f(x) is the dividend, d(x) the divisor, q(x) the quotient, and r(x) the remainder. The remainder's degree must always be lower than the divisor's. This relation lets you verify any division result.",
          },
          {
            term: "Handling missing terms",
            def: "In both synthetic and long division, if the dividend lacks a term of some degree, fill that position with 0. Example: when dividing x³ + 2x − 5, the x² term is absent, so write the coefficients as 1, 0, 2, −5. Failing to fill in 0 causes a place-value error and a completely wrong answer.",
          },
        ],
        traps: [
          "In synthetic division, a very common error is using the wrong sign for c in the box. When dividing by (x + 3), the number in the box is −3, not +3. Since (x + 3) = (x − (−3)), c = −3. Writing the sign inside the parentheses as is guarantees a wrong answer.",
          "In long division, sign errors are frequent at the subtraction step. After multiplying the quotient term by the divisor, you 'subtract,' so flip each term's sign. Build the habit of converting to addition or wrapping the subtracted expression in parentheses to flip the signs explicitly.",
        ],
        example:
          "Solve (2x³ − 3x² + x − 5) ÷ (x − 2) by synthetic division. c = 2, coefficients: 2, −3, 1, −5. Proceed: bring down the first coefficient → 2. 2 × 2 = 4, −3 + 4 = 1. 2 × 1 = 2, 1 + 2 = 3. 2 × 3 = 6, −5 + 6 = 1. Result: quotient coefficients 2, 1, 3 → quotient 2x² + x + 3, remainder 1. Check via Remainder Theorem: f(2) = 2(8) − 3(4) + 2 − 5 = 16 − 12 + 2 − 5 = 1 ✓. Verify: (x − 2)(2x² + x + 3) + 1 = 2x³ + x² + 3x − 4x² − 2x − 6 + 1 = 2x³ − 3x² + x − 5 ✓.",
      },
      {
        title: "Remainder, Factor & Rational Root Theorems — Complete Factoring of Higher-Degree Polynomials",
        subtitle: "Candidate list → confirm a zero with the Factor Theorem → quotient by synthetic division → repeat — this is the complete factoring routine",
        terms: [
          {
            term: "Remainder Theorem",
            def: "The remainder of f(x) divided by (x − c) equals f(c). That is, without actually dividing, the value of substituting x = c into the function is the remainder. Example: the remainder of f(x) = x³ − 4x + 6 divided by (x − 2) is f(2) = 8 − 8 + 6 = 6.",
          },
          {
            term: "Factor Theorem",
            def: "A special case of the Remainder Theorem: if f(c) = 0 then (x − c) is a factor of f(x), and if (x − c) is a factor then f(c) = 0. It is the fastest way to check whether a value is a zero. After confirming a factor with it, use synthetic division to find the quotient and complete the factoring.",
          },
          {
            term: "Rational Root Theorem",
            def: "For an integer-coefficient polynomial aₙxⁿ + … + a₀, if a rational root exists, it has the form ±p/q (p a factor of the constant a₀, q a factor of the leading coefficient aₙ). This theorem builds a finite 'candidate list' of possible rational roots — reducing infinite possibilities to a finite list is the key.",
          },
          {
            term: "Full factoring routine",
            def: "(1) Build the candidate list with the Rational Root Theorem; (2) confirm an actual zero with the Factor Theorem (f(c) = 0); (3) compute the quotient q(x) by synthetic division; (4) factor q(x) again (repeat until quadratic or lower); (5) confirm all factors. Apply this routine systematically to factor degree-4 and -5 polynomials without missing anything.",
          },
        ],
        traps: [
          "The Rational Root Theorem does NOT guarantee that a rational root exists. Whether a value on the candidate list is actually a root must be confirmed with the Factor Theorem (f(c) = 0). Being on the list does not make it a root, and irrational or complex roots cannot be found by this theorem.",
          "When the leading coefficient is not 1, a common error is writing the candidates as only ±(factors of the constant term). For f(x) = 6x³ − 7x² − 1, p ranges over factors of ±1, q over factors of ±1, ±2, ±3, ±6, so the candidates are ±1, ±1/2, ±1/3, ±1/6. Forgetting to divide by q (factors of the leading coefficient) loses actual roots.",
        ],
        example:
          "Factor f(x) = 2x³ − x² − 7x + 6 completely. Candidate roots: ±1, ±2, ±3, ±6, ±1/2, ±3/2. Test with the Factor Theorem: f(1) = 2 − 1 − 7 + 6 = 0 ✓ → (x − 1) is a factor! Synthetic division with c = 1, coefficients 2, −1, −7, 6 gives quotient 2x² + x − 6. Now factor 2x² + x − 6: ac = −12, sum = 1 → 4 and −3. 2x² + 4x − 3x − 6 = 2x(x + 2) − 3(x + 2) = (2x − 3)(x + 2). Final: f(x) = (x − 1)(2x − 3)(x + 2). Check: zeros x = 1, x = 3/2, x = −2. f(3/2) = 2(27/8) − (9/4) − 7(3/2) + 6 = 27/4 − 9/4 − 42/4 + 24/4 = 0 ✓.",
      },
    ],
  },
];
