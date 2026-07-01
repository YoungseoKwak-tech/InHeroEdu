/**
 * Core Notes English version — Honors Precalculus Unit 4 (Sequences, Series &
 * Limits). Faithful translation of the Korean storytelling original; all
 * lessonId, courseId, subjectLabel, emoji, unit, lessonNum values are identical
 * to the Korean source. Content rewritten in natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PRECALCULUS_U4_EN: CoreNote[] = [
  {
    lessonId: "honors-precalculus-u4-l1",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 4,
    lessonNum: 1,
    unitName: "Sequences, Series & Limits",
    title: "Sequences and Series — Arithmetic, Geometric, Sigma Notation",
    subtitle: "The moment you compress a pattern into a formula, the 100th term and even an infinite sum fit on one line",
    overview:
      "A sequence is a list of numbers following a rule; a series is the sum of its terms. Three ideas drive this lesson: first, distinguish arithmetic from geometric sequences and write the general term as a formula; second, read, write, and compute sigma (Σ) notation; third, apply the sum formulas for arithmetic and geometric series along with the idea behind their derivation. Master the language of sequences and series once, and the infinite series and Riemann sums you meet later in calculus will feel familiar.",
    objectives: [
      "Write the general term of an arithmetic and a geometric sequence as a formula and compute a specific term",
      "Expand sigma (Σ) notation or compress a sum into sigma form",
      "Use the arithmetic series partial-sum formula S_n = n/2(a₁ + aₙ) to compute a sum",
      "Apply the geometric series partial-sum formula S_n = a₁(1 − rⁿ)/(1 − r), and find the infinite sum when |r| < 1",
      "Find the common difference or common ratio from a given sequence to identify its type",
    ],
    formulas: [
      "Arithmetic general term: aₙ = a₁ + (n − 1)d",
      "Arithmetic partial sum: S_n = n/2 · (a₁ + aₙ) = n/2 · [2a₁ + (n − 1)d]",
      "Geometric general term: aₙ = a₁ · rⁿ⁻¹",
      "Geometric partial sum: S_n = a₁(1 − rⁿ)/(1 − r)  (r ≠ 1)",
      "Infinite geometric series: S_∞ = a₁/(1 − r)  (|r| < 1)",
      "Sigma linearity: Σ(caₙ) = c·Σaₙ,  Σ(aₙ + bₙ) = Σaₙ + Σbₙ",
      "Sigma of a constant: Σ_{k=1}^{n} c = cn",
    ],
    sections: [
      {
        title: "Arithmetic and Geometric Sequences",
        subtitle: "Common difference d and common ratio r — one number is the blueprint of the whole sequence",
        terms: [
          {
            term: "Arithmetic sequence",
            def: "A sequence in which the difference of consecutive terms is constant; that constant is the common difference d. General term: aₙ = a₁ + (n − 1)d. Example: 3, 7, 11, 15, … has d = 4, a₁ = 3, so aₙ = 4n − 1. Its scatter plot lies on a line of slope d.",
          },
          {
            term: "Geometric sequence",
            def: "A sequence in which the ratio of consecutive terms is constant; that constant is the common ratio r. General term: aₙ = a₁ · rⁿ⁻¹. Example: 2, 6, 18, 54, … has r = 3, a₁ = 2, so aₙ = 2 · 3ⁿ⁻¹. Its scatter plot has an exponential shape; if r is negative the signs alternate.",
          },
          {
            term: "Sigma notation (Σ)",
            def: "A compact symbol for a sum. Σ_{k=m}^{n} aₖ means add aₖ from k = m to k = n. Example: Σ_{k=1}^{5} (2k − 1) = 1 + 3 + 5 + 7 + 9 = 25. Sigma compresses a series to one line and reappears centrally in the definition of the definite integral.",
          },
          {
            term: "Identifying type",
            def: "To classify a sequence: ① if the differences a₂ − a₁, a₃ − a₂, … are all equal, it is arithmetic (common difference d); ② if the ratios a₂/a₁, a₃/a₂, … are all equal, it is geometric (common ratio r). If neither holds it is neither. Classify first to pick the right formula.",
          },
        ],
        traps: [
          "Writing n instead of n − 1 in the arithmetic general term is extremely common. aₙ = a₁ + nd gives a₁ + d at n = 1, making the first term a₂ rather than a₁. Always write aₙ = a₁ + (n − 1)d and check by substituting n = 1 to confirm you get a₁.",
          "Finding the common ratio by subtraction is a mistake — it is a₂/a₁, not a₂ − a₁. For 2, 6, 18 the common ratio is 6/2 = 3, not 6 − 2 = 4. Keep the rule clear: arithmetic uses subtraction, geometric uses division.",
        ],
        example:
          "An arithmetic sequence has first term a₁ = 5 and common difference d = −3. Find the 10th term and the sum of the first 10 terms. General term: aₙ = 5 + (n − 1)(−3) = 8 − 3n. 10th term: a₁₀ = 8 − 30 = −22. Sum: S₁₀ = 10/2·(a₁ + a₁₀) = 5·(5 + (−22)) = 5·(−17) = −85. Cross-check: S₁₀ = 10/2·[2(5) + 9(−3)] = 5·[10 − 27] = −85. Both methods agree.",
      },
      {
        title: "Sum of a Series — Partial Sums and Infinite Geometric Series",
        subtitle: "A finite sum is one formula; an infinite sum hinges on the single condition |r| < 1",
        terms: [
          {
            term: "Arithmetic series partial sum",
            def: "The sum of n terms of an arithmetic sequence: S_n = n/2·(a₁ + aₙ). Idea: pair the first and last terms, the second and second-to-last, … — each pair sums to a₁ + aₙ, and there are n/2 pairs. This is exactly how Gauss summed 1 to 100 instantly.",
          },
          {
            term: "Geometric series partial sum",
            def: "The sum of n terms of a geometric sequence: S_n = a₁(1 − rⁿ)/(1 − r) (r ≠ 1). Derivation: S_n − r·S_n = a₁ − a₁rⁿ gives (1 − r)S_n = a₁(1 − rⁿ). If r = 1, then S_n = n·a₁.",
          },
          {
            term: "Infinite geometric series",
            def: "The sum as n → ∞. If |r| < 1 then rⁿ → 0, so S_∞ = a₁/(1 − r). If |r| ≥ 1 the series diverges and has no sum. Example: 1 + 1/2 + 1/4 + ⋯ = 1/(1 − 1/2) = 2. Always confirm |r| < 1 before applying the formula.",
          },
        ],
        traps: [
          "In S_∞ = a₁/(1 − r), mistaking r² or another value for the common ratio is an error. Clear cases like 1 + 1/3 + 1/9 + ⋯ are fine, but with 3/4 + 3/16 + 3/64 + ⋯ you must separate a₁ from r = a₂/a₁. Always state a₁ and r = a₂/a₁ explicitly before applying the formula.",
          "Assuming an infinite sum exists when |r| ≥ 1 gives nonsense. Computing 1 + 2 + 4 + 8 + ⋯ as 1/(1 − 2) = −1 is obviously wrong. The S_∞ formula is valid only for |r| < 1; make checking |r| < 1 the first item on your checklist.",
        ],
        example:
          "Evaluate the infinite series 3/4 + 3/16 + 3/64 + ⋯. First identify a₁ and r explicitly: a₁ = 3/4 and r = a₂/a₁ = (3/16)/(3/4) = 1/4. Since |r| = 1/4 < 1, the series converges, so S_∞ = a₁/(1 − r) = (3/4)/(1 − 1/4) = (3/4)/(3/4) = 1. For contrast, the partial sum of the first 3 terms is S₃ = (3/4)(1 − (1/4)³)/(1 − 1/4) = (3/4)(63/64)/(3/4) = 63/64, which is already close to the infinite sum of 1.",
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u4-l2",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 4,
    lessonNum: 2,
    unitName: "Sequences, Series & Limits",
    title: "The Binomial Theorem and an Introduction to Combinatorics",
    subtitle: "One formula hidden in Pascal's triangle resolves the entire expansion of (a + b)ⁿ in a single line",
    overview:
      "The binomial theorem is a powerful tool that immediately gives each coefficient in the expansion of (a + b)ⁿ as a combination, so you can write any term of (a + b)⁵ without multiplying it out five times. Three ideas drive this lesson: first, compute and interpret the combination C(n, k) = n!/(k!(n−k)!); second, use the binomial theorem (a + b)ⁿ = Σ_{k=0}^{n} C(n,k) aⁿ⁻ᵏ bᵏ to write a specific term directly; third, explain the relationship between Pascal's triangle and combinations. The binomial theorem is an important link reaching into probability, statistics, and the binomial series in calculus.",
    objectives: [
      "Compute factorials (n!) and explain the meaning of the combination C(n, k) = n!/(k!(n−k)!)",
      "Use the binomial theorem to write the expansion of (a + b)ⁿ and find a specific (kth) term directly",
      "Construct Pascal's triangle and explain its relationship to the binomial coefficients",
      "Set up the general-term formula to find a term containing a specific power of a variable in a binomial expansion",
    ],
    formulas: [
      "Factorial: n! = n × (n−1) × ⋯ × 2 × 1,  0! = 1",
      "Combination: C(n, k) = ₙCₖ = n! / (k! · (n−k)!)",
      "Binomial theorem: (a + b)ⁿ = Σ_{k=0}^{n} C(n,k) · aⁿ⁻ᵏ · bᵏ",
      "General term (the (k+1)th term): T_{k+1} = C(n, k) · aⁿ⁻ᵏ · bᵏ",
      "Pascal's identity: C(n, k) = C(n−1, k−1) + C(n−1, k)",
      "Symmetry: C(n, k) = C(n, n−k)",
    ],
    sections: [
      {
        title: "Factorials and Combinations",
        subtitle: "The number of ways to choose k of n without regard to order — the root of the binomial coefficient",
        terms: [
          {
            term: "Factorial (n!)",
            def: "n! = n × (n−1) × ⋯ × 1, with 0! = 1 by definition (without it, C(n, 0) = 1 would fail). 5! = 120, 10! = 3,628,800. Factorials grow fast, so the key is to cancel common factorials between numerator and denominator. Example: 10! / 8! = 10 × 9 = 90.",
          },
          {
            term: "Combination C(n, k)",
            def: "The number of ways to choose k of n distinct items without regard to order: C(n, k) = n!/(k!(n−k)!). Unlike a permutation (P(n,k) = n!/(n−k)!), order does not matter. Example: choosing 3 of 5 people: C(5,3) = 10. That each binomial-expansion coefficient is a combination is the heart of the theorem.",
          },
          {
            term: "Pascal's triangle",
            def: "A triangular arrangement of binomial coefficients. The apex and both edges are 1, and each interior entry is the sum of the two above it (Pascal's identity: C(n,k) = C(n−1,k−1) + C(n−1,k)). Row n holds the coefficients of (a+b)ⁿ. For small n, drawing the triangle is faster than computing.",
          },
          {
            term: "Symmetry of binomial coefficients",
            def: "C(n, k) = C(n, n−k). Example: C(7, 2) = C(7, 5) = 21. It follows because 'choosing k' equals 'excluding n−k'. For large k, switch to the smaller n−k to compute more easily.",
          },
        ],
        traps: [
          "Computing C(n, k) by fully expanding numerator and denominator before dividing forces you to handle huge numbers. For C(10, 3) = 10!/(3!·7!), cancel 7! against the numerator: (10 × 9 × 8)/(3 × 2 × 1) = 720/6 = 120. The efficiency gain is enormous.",
          "Not knowing or forgetting 0! = 1 causes errors in C(n, 0) or C(n, n). C(5, 0) = 5!/(0!·5!) = 1, but mistaking 0! = 0 makes the denominator 0 and undefined. Remember 0! = 1 is a definition essential to making the binomial theorem work.",
        ],
        example:
          "Compute C(8, 3) and locate it in Pascal's triangle. Formula: C(8, 3) = 8!/(3!·5!) = (8 × 7 × 6)/(3 × 2 × 1) = 336/6 = 56. Symmetry check: C(8, 5) = 56 as well. In Pascal's triangle, row n = 8 (counting the apex as n = 0, the 9th row) is 1, 8, 28, 56, 70, 56, 28, 8, 1; the 4th entry (k = 3) is 56, matching.",
      },
      {
        title: "The Binomial Theorem and Finding a Specific Term",
        subtitle: "Picking out one term without the full expansion — the general-term formula is the shortcut",
        terms: [
          {
            term: "Binomial theorem",
            def: "(a + b)ⁿ = Σ_{k=0}^{n} C(n,k)·aⁿ⁻ᵏ·bᵏ = C(n,0)aⁿ + C(n,1)aⁿ⁻¹b + ⋯ + C(n,n)bⁿ. It produces n+1 terms; in each term the exponents of a and b sum to n. Example: (a+b)³ = a³ + 3a²b + 3ab² + b³.",
          },
          {
            term: "General term T_{k+1}",
            def: "The (k+1)th term of the expansion of (a+b)ⁿ: T_{k+1} = C(n, k)·aⁿ⁻ᵏ·bᵏ, with k starting at 0. Use it to find a term directly. Example: the 4th term of (x + 2)⁶ is k = 3: T₄ = C(6,3)·x³·2³ = 20·x³·8 = 160x³.",
          },
          {
            term: "Sum properties",
            def: "Special results: substituting a = b = 1 gives C(n,0) + C(n,1) + ⋯ + C(n,n) = 2ⁿ (the row's coefficients sum to 2ⁿ); substituting a = 1, b = −1 gives sum of even-position coefficients = sum of odd-position coefficients. These appear often in summation problems.",
          },
        ],
        traps: [
          "Counting k from 1 instead of 0 in a binomial expansion is a mistake. The '3rd term' has k = 2 (k+1 = 3), so T₃ = C(n, 2)·aⁿ⁻²·b². Remember T₁ corresponds to k = 0, and when using the general term, k = (term number) − 1.",
          "For an expression like (2x − 3)⁵ with negative b, missing the sign is common. With b = −3, bᵏ = (−3)ᵏ, which is negative for odd k. Note (−3)² = 9, not −9. Always check each term's sign after expanding.",
        ],
        example:
          "Find the coefficient of x⁴ in the expansion of (3x − 2)⁷. With a = 3x, b = −2, n = 7, the general term is T_{k+1} = C(7, k)·(3x)^{7−k}·(−2)^k. The x⁴ term needs 7 − k = 4, so k = 3. T₄ = C(7, 3)·(3x)⁴·(−2)³ = 35·81x⁴·(−8) = 35·(−648)x⁴ = −22,680x⁴. The coefficient of x⁴ is −22,680.",
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u4-l3",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 4,
    lessonNum: 3,
    unitName: "Sequences, Series & Limits",
    title: "Limits and Continuity — The Bridge to Calculus",
    subtitle: "Asking where a function heads as x approaches a value is the whole of a limit",
    overview:
      "The limit is the language of all of calculus. It introduces a new way of thinking — not 'what value does the function actually take at a point?' but 'where does it head as you approach that point?' Three ideas drive this lesson: first, find a limit from a graph or by substitution, and use one-sided limits to recognize when a limit does not exist; second, resolve the 0/0 indeterminate form with algebraic techniques (factoring, rationalizing); third, check the three conditions of continuity and classify discontinuities (hole, jump, infinite). Understand limits firmly and the derivative and definite integral of AP Calculus connect naturally.",
    objectives: [
      "Estimate lim_{x→a} f(x) from a graph or table and check whether the left and right limits agree to decide if the limit exists",
      "Find limits of continuous functions by direct substitution, and resolve the 0/0 indeterminate form by factoring or rationalizing",
      "List the three conditions for continuity and determine whether a given function is continuous at a point",
      "Distinguish removable, jump, and infinite discontinuities from a graph and from a formula",
    ],
    formulas: [
      "Limit definition: lim_{x→a} f(x) = L  (f(x) approaches L as x approaches a)",
      "Limit exists: lim_{x→a⁻} f(x) = lim_{x→a⁺} f(x) = L",
      "Limit law: lim[f(x) ± g(x)] = lim f(x) ± lim g(x)",
      "Limit law: lim[f(x) · g(x)] = lim f(x) · lim g(x)",
      "Limit law: lim[f(x)/g(x)] = lim f(x) / lim g(x)  (lim g(x) ≠ 0)",
      "Three conditions of continuity: ① f(a) exists, ② lim_{x→a} f(x) exists, ③ lim_{x→a} f(x) = f(a)",
      "Squeeze theorem: if g(x) ≤ f(x) ≤ h(x) and lim g = lim h = L, then lim f = L",
    ],
    sections: [
      {
        title: "The Concept and Computation of Limits",
        subtitle: "The value at x = a does not matter — the direction as x approaches a is everything",
        terms: [
          {
            term: "Limit",
            def: "lim_{x→a} f(x) = L means f(x) gets arbitrarily close to L as x gets arbitrarily close to a (but x ≠ a). The limit can exist even where the function is undefined at x = a. The point is the direction of approach, not arrival. On a graph, read which y-value the curve converges to near x = a.",
          },
          {
            term: "One-sided limits",
            def: "Left limit lim_{x→a⁻} f(x): the value as x approaches a from below. Right limit lim_{x→a⁺} f(x): from above. The limit exists only when both one-sided limits are equal. At a jump discontinuity, left ≠ right, so the limit does not exist.",
          },
          {
            term: "Indeterminate form 0/0",
            def: "When direct substitution gives 0/0, an actual limit may still exist. Strategies: ① factor and cancel the common factor; ② multiply numerator and denominator by the conjugate to rationalize; ③ for trig, use lim_{x→0} sinx/x = 1. Example: lim_{x→2} (x²−4)/(x−2) = lim_{x→2} (x+2) = 4.",
          },
          {
            term: "Direct substitution",
            def: "For continuous functions (polynomial, rational, trig), lim_{x→a} f(x) = f(a), so substitute x = a directly. If the result is a finite value (not 0/0 or ∞/∞), that is the limit. Use additional algebra only when an indeterminate form appears.",
          },
        ],
        traps: [
          "Confusing the value f(a) with the limit is a mistake. The limit is independent of f(a): even if f(2) = 5, lim_{x→2} f(x) need not be 5, and the limit can be 3 even when f(2) is undefined. Always remember 'a limit is the value of the approach, not the value at arrival.'",
          "Failing to conclude that the limit 'does not exist' when the left and right limits differ is common. For absolute-value or piecewise functions at x = a, do not skip computing the left and right limits separately and comparing them. Mark a nonexistent limit clearly as 'DNE' (Does Not Exist).",
        ],
        example:
          "Find lim_{x→3} (x² − 9)/(x − 3). Direct substitution gives (9−9)/(3−3) = 0/0, indeterminate. Factor: x² − 9 = (x−3)(x+3), so (x²−9)/(x−3) = x + 3 for x ≠ 3. Limit: lim_{x→3} (x+3) = 6. The original function is undefined at x = 3 (a hole), yet the limit is 6.",
      },
      {
        title: "Continuity and Discontinuity — The Gateway to Calculus",
        subtitle: "Break any one of the three continuity conditions and the point is discontinuous — classifying the type is the key",
        terms: [
          {
            term: "Continuity",
            def: "f is continuous at x = a when all three conditions hold: ① f(a) is defined, ② lim_{x→a} f(x) exists, ③ lim_{x→a} f(x) = f(a). Failing any one means a discontinuity at x = a. Polynomials are continuous everywhere; rational functions are continuous wherever the denominator ≠ 0.",
          },
          {
            term: "Removable discontinuity",
            def: "The limit exists but f(a) is undefined or f(a) ≠ the limit. It shows as a hole on the graph. Example: f(x) = (x²−4)/(x−2) is undefined at x = 2 but lim_{x→2} f(x) = 4. Redefining f(2) = 4 makes it continuous, so the discontinuity is removable.",
          },
          {
            term: "Jump discontinuity",
            def: "Both one-sided limits exist but differ. It shows as a jump (a vertical break) on the graph, often at the boundary where two pieces of a piecewise function meet. The limit itself does not exist, so it is not continuous and cannot be made continuous by redefinition.",
          },
          {
            term: "Infinite discontinuity",
            def: "f(x) → ±∞ as x → a. It shows as a vertical asymptote on the graph. Example: f(x) = 1/(x−3) at x = 3. In rational functions it occurs where the denominator is zero. The limit diverges to ±∞, so no finite limit exists.",
          },
        ],
        traps: [
          "Concluding 'continuous because the limit exists' without checking condition ③ is a mistake. Even when the limit exists, if f(a) ≠ lim f(x) the function is still discontinuous. For piecewise functions, check the three conditions one by one as a checklist; following the ① → ② → ③ order prevents skipping steps.",
          "Confusing removable and jump discontinuities is common. A removable discontinuity has an existing limit that disagrees with (or lacks) the function value; a jump discontinuity has no limit at all. On a graph, a 'hole' is removable, while a 'break splitting into two heights' is a jump.",
        ],
        example:
          "Determine whether f(x) = { (x²−1)/(x−1), x ≠ 1 ; 3, x = 1 } is continuous at x = 1. Condition ①: f(1) = 3 is defined. Condition ②: lim_{x→1} (x²−1)/(x−1) = lim_{x→1} (x−1)(x+1)/(x−1) = lim_{x→1} (x+1) = 2; the limit exists. Condition ③: lim_{x→1} f(x) = 2 but f(1) = 3, so 2 ≠ 3 and condition ③ fails. Conclusion: discontinuous at x = 1 (removable). Redefining f(1) = 2 instead of 3 makes it continuous.",
      },
    ],
  },
];
