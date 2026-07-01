/**
 * Core Notes English version — Honors Precalculus Unit 2 (Polynomial, Rational,
 * Exponential & Log Functions). Faithful translation of the Korean storytelling
 * original; all lessonId, courseId, subjectLabel, emoji, unit, lessonNum values
 * are identical to the Korean source. Content rewritten in natural,
 * exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PRECALCULUS_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-precalculus-u2-l1",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 2,
    lessonNum: 1,
    unitName: "Polynomial, Rational, Exponential & Log Functions",
    title: "Polynomial Functions — End Behavior, Zeros, Factor Theorem",
    subtitle: "Degree and leading coefficient alone seal a graph's fate",
    overview:
      "Polynomial functions are the most common function type in precalculus, but beneath the impression of 'just a high-degree function' lies an elegant structure. Three ideas drive this lesson: first, the leading term alone fully predicts end behavior; second, the number and location of zeros are pinned down by factoring and the remainder theorem; third, whether a graph crosses or touches the axis at a zero is decided by that factor's multiplicity. Linking these three organically to sketch a graph is the goal.",
    objectives: [
      "Use the degree (odd/even) and the sign of the leading coefficient (positive/negative) to predict end behavior",
      "Apply the factor theorem and remainder theorem to find the zeros of a polynomial function",
      "Use the multiplicity of a zero to determine whether the graph crosses or touches the x-axis there",
      "Use the rational root theorem to list candidate integer/rational zeros and verify them with synthetic division",
      "Combine zeros, end behavior, and the y-intercept to sketch a polynomial graph accurately",
    ],
    formulas: [
      "Remainder theorem: remainder of p(x) ÷ (x − c) = p(c)",
      "Factor theorem: p(c) = 0  ⟺  (x − c) is a factor of p(x)",
      "Rational root theorem: candidate rational zero = ±(divisor of constant term) / (divisor of leading coefficient)",
      "End behavior — odd degree: leading coef > 0 → down-left up-right, < 0 → up-left down-right",
      "End behavior — even degree: leading coef > 0 → up on both ends, < 0 → down on both ends",
      "Odd multiplicity → crosses x-axis / Even multiplicity → touches (bounces off) x-axis",
    ],
    sections: [
      {
        title: "End Behavior and Multiplicity of Zeros",
        subtitle: "The leading term and the exponent of each factor reveal the big picture of the graph",
        terms: [
          {
            term: "End behavior",
            def: "Where f(x) heads as x → +∞ or x → −∞. For a polynomial it is determined solely by the leading term aₙxⁿ. If n is odd and aₙ > 0, the graph goes to −∞ on the left and +∞ on the right.",
          },
          {
            term: "Zero / Root",
            def: "A value x = c with f(c) = 0; the x-coordinate where the graph meets the x-axis. An nth-degree polynomial has exactly n roots over the complex numbers (counting multiplicity) and at most n real x-intercepts.",
          },
          {
            term: "Multiplicity",
            def: "The number of times a factor (x − c) is repeated in the factorization. Odd multiplicity (1, 3, 5, …) means the graph crosses the x-axis; even multiplicity (2, 4, …) means it touches and turns back. Example: in p(x) = (x−1)²(x+2), x = 1 has multiplicity 2 (touch) and x = −2 has multiplicity 1 (cross).",
          },
          {
            term: "Synthetic division",
            def: "A fast way to divide p(x) by (x − c) using only the coefficients. A remainder of 0 means c is a zero and (x − c) is a factor. Combined with the remainder theorem, it steadily reduces a high-degree polynomial's factorization.",
          },
        ],
        traps: [
          "When determining end behavior, ignore every term except the leading one. In p(x) = −2x⁵ + 100x⁴ + 999, no matter how large the lower-degree coefficients are, −2x⁵ dominates for large x. Odd degree with negative leading coefficient gives end behavior up-left, down-right.",
          "Missing a multiplicity ruins a sketch. In p(x) = (x − 3)²(x + 1), drawing the graph as if it 'crosses' at x = 3 is wrong: the exponent 2 is even, so the graph touches and turns back at x = 3. Make checking each factor's exponent (multiplicity) a habit.",
        ],
        example:
          "Find all zeros of p(x) = 2x³ − 3x² − 11x + 6 and sketch it. Rational root theorem: divisors of 6 are ±{1,2,3,6}, divisors of 2 are ±{1,2} → candidates ±1, ±2, ±3, ±6, ±1/2, ±3/2. p(3) = 2(27) − 3(9) − 11(3) + 6 = 54 − 27 − 33 + 6 = 0, so x = 3 is a zero. Synthetic division gives p(x) = (x − 3)(2x² + 3x − 2) = (x − 3)(2x − 1)(x + 2). Zeros: x = 3, 1/2, −2 (all multiplicity 1, so crossing). Positive leading coefficient, odd degree → end behavior down-left, up-right. y-intercept: p(0) = 6. Combine to draw a curve crossing the x-axis at three points and heading to −∞ and +∞ at the ends.",
      },
      {
        title: "The Factor Theorem and Remainder Theorem",
        subtitle: "Factors and zeros are two sides of one coin — a single theorem reveals both",
        terms: [
          {
            term: "Remainder theorem",
            def: "When p(x) is divided by (x − c), the remainder equals p(c). You can read off the remainder by substituting c directly, without performing the full division. Example: the remainder of p(x) ÷ (x − 4) is p(4).",
          },
          {
            term: "Factor theorem",
            def: "A special case of the remainder theorem: if p(c) = 0 then (x − c) is a factor of p(x), and conversely. This two-way relationship lets you verify zeros and factor simultaneously.",
          },
          {
            term: "Rational root theorem",
            def: "For an integer-coefficient polynomial aₙxⁿ + ⋯ + a₀, any rational root p/q (in lowest terms) has p a divisor of the constant a₀ and q a divisor of the leading coefficient aₙ. Build the candidate list first, then find actual zeros by substitution or synthetic division.",
          },
        ],
        traps: [
          "The remainder theorem applies only when dividing by a linear factor of the form (x − c). For divisors like (x² + 1) or (2x + 3) you cannot apply it directly; rewrite (2x + 3) = 2(x + 3/2) and substitute c = −3/2, or perform polynomial long division.",
          "The rational root theorem only proposes candidate rational roots — you must substitute to verify which are actual roots. Do not panic at a long candidate list; testing p(1) and p(−1) first usually speeds things up.",
        ],
        example:
          "Use the theorems on p(x) = x³ − 4x² + x + 6. By the remainder theorem, test a candidate quickly: p(−1) = (−1) − 4(1) + (−1) + 6 = 0, so the remainder on division by (x + 1) is 0. By the factor theorem, that zero means (x + 1) is a factor. Synthetic division by −1 leaves x² − 5x + 6 = (x − 2)(x − 3), so p(x) = (x + 1)(x − 2)(x − 3) with zeros x = −1, 2, 3. Notice how a single evaluation confirmed a zero and handed us a factor at the same time.",
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u2-l2",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 2,
    lessonNum: 2,
    unitName: "Polynomial, Rational, Exponential & Log Functions",
    title: "Rational Functions — Asymptotes and Holes",
    subtitle: "The contest between numerator and denominator polynomials draws the graph's boundary lines",
    overview:
      "A rational function r(x) = p(x)/q(x) develops special behavior where its denominator equals zero. Two questions drive this lesson: 'At an x that makes the denominator zero, does the graph shoot to infinity (a vertical asymptote) or merely have a hole?' and 'How do you compare the degrees of numerator and denominator to decide a horizontal or oblique asymptote?' Master these clear criteria and rational-function graphs stop being difficult.",
    objectives: [
      "Distinguish a vertical asymptote from a hole by whether the factor cancels",
      "Compare numerator and denominator degrees to determine a horizontal asymptote or an oblique asymptote",
      "Identify the x-intercepts, y-intercept, asymptotes, and holes of a rational function and sketch it",
      "Use polynomial division to find the equation of an oblique asymptote",
    ],
    formulas: [
      "Vertical asymptote: x = c if q(c) = 0 and (x − c) remains after cancellation",
      "Hole: at x = c if both q(c) = 0 and p(c) = 0 so (x − c) cancels",
      "Horizontal asymptote — deg(p) < deg(q): y = 0",
      "Horizontal asymptote — deg(p) = deg(q): y = ratio of leading coefficients",
      "No horizontal asymptote — deg(p) > deg(q): an oblique (or curved) asymptote exists",
      "Oblique asymptote: the quotient of the polynomial division p(x) ÷ q(x)",
    ],
    sections: [
      {
        title: "Vertical Asymptotes and Holes",
        subtitle: "If it cancels, a hole; if it does not, a vertical asymptote — only these two cases",
        terms: [
          {
            term: "Vertical asymptote",
            def: "In r(x) = p(x)/q(x), occurs at x = c where q(c) = 0 but p(c) ≠ 0. The graph shoots to ±∞ as x → c, approaching the line x = c without ever touching it. Write its equation as 'x = c'.",
          },
          {
            term: "Hole (removable discontinuity)",
            def: "In r(x) = p(x)/q(x), when p(c) = 0 and q(c) = 0 — i.e. (x − c) cancels from both numerator and denominator — there is a hole at x = c. Substitute x = c into the reduced expression to find the hole's y-coordinate, and mark that point as an open dot.",
          },
          {
            term: "Discontinuity",
            def: "A point where the function is undefined or not continuous. For rational functions, a vertical asymptote is an 'infinite discontinuity' and a hole is a 'removable discontinuity'. A hole is called removable because redefining that single point makes the function continuous.",
          },
          {
            term: "Sign analysis",
            def: "A method for determining the sign (+/−) of r(x) on each side of a vertical asymptote. To find which way (±∞) the graph shoots near the asymptote, substitute a test value just left and just right of it and check the sign.",
          },
        ],
        traps: [
          "Not every x that makes the denominator zero is a vertical asymptote. Always try to cancel first. In r(x) = (x²−4)/(x−2) = (x+2)(x−2)/(x−2), x = 2 is a hole, not a vertical asymptote. Writing the pre-cancellation denominator zero as an asymptote is wrong.",
          "You must compute the hole's y-coordinate by substituting c into the reduced expression. Writing only 'there is a hole at x = 2' and omitting the y-coordinate leaves the graph incomplete. Above, substituting x = 2 into the reduced y = x + 2 gives y = 4, so the hole is at (2, 4).",
        ],
        example:
          "Find all asymptotes and holes of r(x) = (x² − x − 6)/(x² − 4). Factor numerator: x² − x − 6 = (x − 3)(x + 2). Factor denominator: x² − 4 = (x − 2)(x + 2). Cancel: (x − 3)/(x − 2) for x ≠ −2. Since (x + 2) cancelled, x = −2 is a hole. Hole's y-coordinate: substitute x = −2 into (x − 3)/(x − 2) → (−5)/(−4) = 5/4, so the hole is at (−2, 5/4). x = 2 remains in the denominator after cancellation, so vertical asymptote x = 2. Degree comparison (after cancelling): deg(numerator) = deg(denominator) = 1 → horizontal asymptote y = 1/1 = 1.",
      },
      {
        title: "Horizontal and Oblique Asymptotes",
        subtitle: "Where does a rational function head as x grows without bound — degree is the judge",
        terms: [
          {
            term: "Horizontal asymptote",
            def: "The y-value r(x) converges to as x → ±∞. Three rules: ① deg(p) < deg(q) → y = 0; ② deg(p) = deg(q) → y = ratio of leading coefficients; ③ deg(p) > deg(q) → none. A graph may cross a horizontal asymptote finitely many times.",
          },
          {
            term: "Oblique (slant) asymptote",
            def: "A slanted asymptote that appears when deg(p) = deg(q) + 1. Divide p(x) by q(x) to get a quotient of the form y = mx + b; that line is the oblique asymptote. The remainder term goes to 0 as x → ±∞ and is ignored.",
          },
          {
            term: "Crossing an asymptote",
            def: "A graph can never cross a vertical asymptote, but it can cross a horizontal or oblique asymptote at finitely many x. Set r(x) equal to the asymptote's equation and solve to find the crossing points.",
          },
        ],
        traps: [
          "When deg(p) = deg(q) + 2 or more, the asymptote is parabolic, not oblique. Honors Precalculus mostly handles oblique asymptotes (deg(p) = deg(q) + 1); memorizing only 'larger numerator degree → oblique asymptote' is a trap.",
          "Many students misread horizontal asymptote y = 0 as 'the graph never meets the x-axis'. A horizontal asymptote only describes behavior as x → ±∞; at finite x the graph may cross the x-axis freely. Always solve r(x) = 0 separately to find the actual x-intercepts.",
        ],
        example:
          "Find the oblique asymptote of r(x) = (2x² + 3x − 2)/(x + 1). Since deg(numerator) = 2 = deg(denominator) + 1, an oblique asymptote exists. Divide (2x² + 3x − 2) ÷ (x + 1): 2x² ÷ x = 2x; subtract 2x(x+1) = 2x² + 2x leaving x − 2; x ÷ x = 1; subtract 1·(x+1) = x + 1 leaving −3. So quotient = 2x + 1, remainder = −3, and r(x) = (2x + 1) + (−3)/(x+1). As x → ±∞, −3/(x+1) → 0, so the oblique asymptote is y = 2x + 1.",
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u2-l3",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 2,
    lessonNum: 3,
    unitName: "Polynomial, Rational, Exponential & Log Functions",
    title: "Exponential and Logarithmic Functions — Graphs, Properties, Equations",
    subtitle: "Exponentials and logarithms are inverses — master one and the other comes into view",
    overview:
      "Exponential functions and logarithmic functions are twin concepts that are inverses of each other: the inverse of y = bˣ is exactly y = log_b x. This lesson starts by graphing both functions accurately, moves to manipulating expressions with the logarithm laws (product, quotient, power), and finishes with systematically solving exponential and logarithmic equations and inequalities. Because the natural exponential e and natural log ln underpin all of calculus, make them fully your own now.",
    objectives: [
      "Describe the graph, domain, range, and asymptote of y = bˣ and y = log_b x, and apply transformations",
      "Use the product, quotient, and power laws of logarithms to expand or condense logarithmic expressions",
      "Use the change-of-base formula to evaluate a logarithm of any base on a calculator",
      "Solve exponential equations by taking logarithms of both sides or matching the bases",
      "Solve logarithmic equations and always verify against extraneous solutions",
    ],
    formulas: [
      "log_b(xy) = log_b x + log_b y  (product law)",
      "log_b(x/y) = log_b x − log_b y  (quotient law)",
      "log_b(xⁿ) = n·log_b x  (power law)",
      "Change of base: log_b x = ln x / ln b = log x / log b",
      "Inverse relationship: b^(log_b x) = x  and  log_b(bˣ) = x",
      "Natural exponential: e ≈ 2.71828, inverse of y = eˣ is y = ln x",
      "Exponential equations: take log of both sides, or make the bases equal",
    ],
    sections: [
      {
        title: "Graphs and Properties of Exponential/Logarithmic Functions",
        subtitle: "One asymptote, one anchor point — pin those two and the sketch is complete",
        terms: [
          {
            term: "Exponential function",
            def: "f(x) = bˣ (b > 0, b ≠ 1). If b > 1 it is increasing (growth); if 0 < b < 1 it is decreasing (decay). Domain: (−∞, ∞), range: (0, ∞). The x-axis (y = 0) is a horizontal asymptote; the graph never goes below the x-axis. Anchor points: (0, 1) and (1, b).",
          },
          {
            term: "Logarithmic function",
            def: "f(x) = log_b x (b > 0, b ≠ 1), the inverse of y = bˣ. If b > 1 it is increasing. Domain: (0, ∞), range: (−∞, ∞). The y-axis (x = 0) is a vertical asymptote; the graph never exists for x ≤ 0. Anchor points: (1, 0) and (b, 1).",
          },
          {
            term: "Natural exponential & logarithm",
            def: "The exponential/logarithm with base e ≈ 2.71828. y = eˣ and y = ln x are the most important function pair in calculus. ln x = log_e x, and the 'ln' button on a calculator is this function. Definition of e: the unique base for which the derivative of eˣ is itself.",
          },
          {
            term: "Definition of logarithm",
            def: "log_b x = y ⟺ bʸ = x. A logarithm asks 'to what power must I raise b to get x?'. log₂ 8 = 3 means 'raise 2 to what power to get 8? — 3.' Use this definition to convert between logarithmic and exponential equations.",
          },
        ],
        traps: [
          "The domain of a logarithm must be positive (x > 0). To find the domain of log(x² − 4), solve x² − 4 > 0 → x² > 4 → |x| > 2 → x < −2 or x > 2. Never forget that a logarithm's argument cannot be negative or zero.",
          "Do not confuse the domains and ranges of exponential and logarithmic functions. y = bˣ: domain (−∞,∞), range (0,∞); y = log_b x: domain (0,∞), range (−∞,∞). Since they are inverses, the domain and range swap exactly — remember it that way.",
        ],
        example:
          "Transform y = eˣ into f(x) = 3·e^(x−2) − 1. Subtracting 2 from x is a shift right 2; multiplying y by 3 is a vertical stretch (factor 3); subtracting 1 is a shift down 1. Anchor (0, 1) → (0+2, 3·1 − 1) = (2, 2). Anchor (1, e) → (3, 3e − 1 ≈ 7.15). The horizontal asymptote y = 0 shifts down 1 to y = −1. So horizontal asymptote y = −1, domain (−∞, ∞), range (−1, ∞).",
      },
      {
        title: "Logarithm Laws and Solving Exponential/Logarithmic Equations",
        subtitle: "Reshape expressions with the log laws, then solve equations via the inverse relationship",
        terms: [
          {
            term: "Properties of logarithms",
            def: "Product law: log_b(xy) = log_b x + log_b y. Quotient law: log_b(x/y) = log_b x − log_b y. Power law: log_b(xⁿ) = n·log_b x. Use these three to simplify a complex log expression or, conversely, to combine several logs into one.",
          },
          {
            term: "Change-of-base formula",
            def: "log_b x = log x / log b = ln x / ln b. Since calculators only support log (base 10) and ln, convert other bases with this formula: log₅ 17 = ln 17 / ln 5 ≈ 2.8332 / 1.6094 ≈ 1.760.",
          },
          {
            term: "Extraneous solution",
            def: "A value that arises from algebraic manipulation but does not satisfy the original equation. In log equations these are solutions that make a logarithm's argument negative or zero. After solving, always substitute back into the original equation to check.",
          },
        ],
        traps: [
          "log(x + y) ≠ log x + log y. The product law is log(x·y) = log x + log y; a log of a sum cannot be split. This is the most common log error on exams. Also, in log(x²) = 2 log x, x might be negative — watch the domain.",
          "Skipping the extraneous-solution check on log equations leads to wrong answers. Solving log(x − 3) + log(x + 1) = log 5 may give x = 2 and x = −2, but x = 2 gives log(2 − 3) = log(−1), undefined (extraneous), and x = −2 gives log(−5), also undefined. Both candidates can be extraneous, so always substitute to verify.",
        ],
        example:
          "Solve log₂(x + 3) + log₂(x − 1) = 5. Combine via the product law: log₂[(x+3)(x−1)] = 5. Apply the definition: (x+3)(x−1) = 2⁵ = 32. Expand: x² + 2x − 3 = 32 → x² + 2x − 35 = 0 → (x + 7)(x − 5) = 0, so x = −7 or x = 5. Check: x = −7 gives log₂(−4), undefined (extraneous); x = 5 gives log₂(8) + log₂(4) = 3 + 2 = 5 ✓. Therefore x = 5.",
      },
    ],
  },
];
