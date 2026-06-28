/**
 * Core Notes English version — Honors Algebra 2 Unit 4 (Rational & Radical Expressions & Functions).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ALGEBRA_2_U4_EN: CoreNote[] = [
  {
    lessonId: "honors-algebra-2-u4-l1",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 4,
    lessonNum: 1,
    unitName: "Rational & Radical Expressions & Functions",
    title: "Rational Expression Operations — Simplifying, Multiply/Divide, Add/Subtract & Solving",
    subtitle: "The LCD and the extraneous-solution check are the two things that decide your score on rational expressions",
    overview:
      "A rational expression is a fraction expression — a structure with polynomials in both numerator and denominator. The instinct you built for integer fractions applies here exactly the same way. The core message: '90% of students who lose points on rational-expression problems lose them not to arithmetic errors but to skipping the check.' After solving an equation, you must substitute back into the original to test whether a solution is extraneous (makes a denominator 0). Simplifying requires factoring before canceling, and adding/subtracting requires finding the LCD to get a common denominator. This lesson masters the four operations on rational expressions, solving equations, and handling extraneous solutions.",
    objectives: [
      "Factor a rational expression and cancel common factors to write it as a simplified rational expression",
      "Multiply and divide rational expressions, converting division to multiplying by the reciprocal",
      "Find the LCD to get a common denominator for rational expressions with unlike denominators, and add/subtract",
      "Solve a rational equation by multiplying both sides by the LCD to clear denominators",
      "After solving a rational equation, always substitute into the original to check for extraneous solutions",
    ],
    formulas: [
      "Simplifying: (factor numerator) / (factor denominator) → cancel common factors",
      "Division: (A/B) ÷ (C/D) = (A/B) × (D/C)",
      "Addition: A/B + C/D = (AD + BC) / BD (though finding the LCD to get a common denominator is more efficient)",
      "Solving a rational equation: multiply both sides by the LCD to clear denominators → solve the polynomial equation → check for extraneous solutions",
      "Extraneous condition: substitute a found solution into the original denominators; if any denominator = 0, discard it as extraneous",
    ],
    sections: [
      {
        title: "Simplifying, Multiplying & Dividing Rational Expressions",
        subtitle: "Always factor before canceling — never try to cancel while expanded",
        terms: [
          {
            term: "Rational expression",
            def: "A fraction-form expression with polynomials in both numerator and denominator. Values of x that make the denominator 0 are excluded from the domain. Example: in (x² − 4) / (x² − x − 2), the denominator x² − x − 2 = (x − 2)(x + 1), so x ≠ 2 and x ≠ −1.",
          },
          {
            term: "Simplifying rational expressions",
            def: "Factor numerator and denominator separately, then cancel common factors. Never try to cancel while expanded — factor first and only cancel identical factors. Example: (x² − 4) / (x² − x − 2) = (x + 2)(x − 2) / ((x − 2)(x + 1)) = (x + 2) / (x + 1), x ≠ 2.",
          },
          {
            term: "Multiplication & division",
            def: "Multiplication: cross-cancel diagonally before multiplying numerators and denominators to simplify the work. Division: take the reciprocal of the divisor, convert to multiplication, then cancel. Example: [(x+3)/(x−1)] ÷ [(x+3)/(x²−1)] = [(x+3)/(x−1)] × [(x²−1)/(x+3)] = [(x+3)(x+1)(x−1)] / [(x−1)(x+3)] = x + 1.",
          },
          {
            term: "Domain restrictions",
            def: "Always exclude x-values that make a denominator 0. Values corresponding to factors canceled during simplification must also be excluded. Even if a factor is no longer in the denominator after simplifying, if it made the original denominator 0, you must state the 'x ≠ …' condition.",
          },
        ],
        traps: [
          "Canceling individual terms of the numerator and denominator is a very common error. In (x² + 3x) / (x² + 5x), canceling x² with x² and x with x to get '(1 + 3)/(1 + 5) = 4/6' is completely wrong. You must factor: numerator x(x + 3), denominator x(x + 5), cancel x, and get (x + 3)/(x + 5). Canceling terms directly is never allowed.",
          "In division, a common error is taking the reciprocal of only part of the divisor instead of the whole thing. Writing A ÷ (C/D) as A × (C/D), or (A/B) ÷ (C/D) as (B/A) × (C/D), is wrong. The reciprocal must flip the entire dividing fraction top-to-bottom.",
        ],
        example:
          "Simplify [(2x² + 5x − 3) / (x² − 9)] × [(x² + 2x − 3) / (4x − 2)]. Factor each polynomial: 2x² + 5x − 3 = (2x − 1)(x + 3), x² − 9 = (x + 3)(x − 3), x² + 2x − 3 = (x + 3)(x − 1), 4x − 2 = 2(2x − 1). The full expression: [(2x − 1)(x + 3)] / [(x + 3)(x − 3)] × [(x + 3)(x − 1)] / [2(2x − 1)]. Cancel: the (2x − 1) factors, and one (x + 3) from each side. Simplifying gives (x + 3)(x − 1) / [2(x − 3)]. Domain: x ≠ ±3, x ≠ 1/2.",
      },
      {
        title: "Adding/Subtracting Rational Expressions & Rational Equations — LCD and the Extraneous Check",
        subtitle: "The LCD is all of addition/subtraction; the extraneous check is the finish of any equation — skip either and you lose points",
        terms: [
          {
            term: "LCD (Least Common Denominator)",
            def: "To add or subtract rational expressions with unlike denominators, you must build a common denominator. The LCD is the product of every factor at its highest power, taken from the factored denominators. Example: in 1/(x−2) + 3/(x²−4), since x² − 4 = (x+2)(x−2), the LCD = (x+2)(x−2). Multiply the first term's numerator and denominator by (x+2).",
          },
          {
            term: "Adding & subtracting rational expressions",
            def: "(1) Factor each denominator; (2) determine the LCD; (3) expand each fraction to the LCD (multiply numerator and denominator by the same expression); (4) add or subtract numerators; (5) factor the numerator and check whether it cancels. In subtraction especially, don't forget to distribute the minus sign across the entire numerator.",
          },
          {
            term: "Rational equation",
            def: "An equation containing fraction expressions. Strategy: multiply both sides by the LCD to clear all denominators, then solve as an ordinary polynomial equation. Because the LCD contains the denominator's variable, a found solution may make the original denominator 0, so a check is always required.",
          },
          {
            term: "Extraneous solution",
            def: "A solution that appears when you solve the equation algebraically but makes a denominator 0 (undefined) when substituted into the original. It arises from multiplying both sides by the LCD. Before writing the final answer, always substitute solutions into the original denominators to test for 0 and discard any such 'extraneous' solution.",
          },
        ],
        traps: [
          "Skipping the extraneous check after solving a rational equation is the most heavily penalized error in this unit. Especially when the equation has a quadratic denominator, one of the two solutions is often extraneous — a frequent exam setup. Don't submit immediately after finding solutions; substitute each into the original denominators to test for 0.",
          "In subtraction, a common error is not distributing the second numerator's minus sign across the whole numerator after getting a common denominator. Writing 2/(x+1) − (x+3)/(x+1) = (2 − x + 3)/(x+1) is wrong. The correct computation is (2 − (x+3))/(x+1) = (2 − x − 3)/(x+1) = (−x − 1)/(x+1) = −1. Wrap the subtracted numerator in parentheses to distribute the sign.",
        ],
        example:
          "Solve 3/(x−2) + 1/(x+2) = 8/(x²−4). Factor the denominator: x² − 4 = (x+2)(x−2) → LCD = (x+2)(x−2). Multiply both sides by the LCD: 3(x+2) + 1(x−2) = 8. Expand: 3x + 6 + x − 2 = 8 → 4x + 4 = 8 → 4x = 4 → x = 1. Extraneous check: substitute x = 1 into the denominators: (1−2) = −1 ≠ 0, (1+2) = 3 ≠ 0, (1²−4) = −3 ≠ 0 — none is 0, so it is a valid solution. Final answer: x = 1. Had x = 2 or x = −2 appeared, it would be discarded as extraneous.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u4-l2",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 4,
    lessonNum: 2,
    unitName: "Rational & Radical Expressions & Functions",
    title: "Radicals & Rational Exponents — nth Roots, Exponent Laws & Solving Equations",
    subtitle: "Move freely between rational-exponent and radical notation and complicated expressions simplify",
    overview:
      "Square roots are already familiar, but Honors Algebra 2 also covers nth roots such as cube and fourth roots, and rational exponents expressed as fractional exponents. The core insight: 'Radicals and exponents are two faces of the same thing. The moment you convert with x^(m/n) = (ⁿ√x)^m, a complicated-looking expression simplifies dramatically.' For multiplication, division, and rationalizing radicals, handle the coefficient and the radicand separately; for radical equations, raise both sides to a power to remove the radical — and again the extraneous check is essential. This lesson masters nth roots, rational exponents, radical operations, and solving equations.",
    objectives: [
      "Understand the definition and notation of nth roots and convert freely between radical and rational-exponent notation using ⁿ√x = x^(1/n)",
      "Use x^(m/n) = (ⁿ√x)^m = ⁿ√(xᵐ) to evaluate and simplify expressions with rational exponents",
      "Apply the laws of exponents to rational exponents to multiply, divide, and raise radical expressions to powers",
      "Rationalize the denominator — for both monomial and binomial denominators — to a form with no radical in the denominator",
      "Solve radical equations by raising both sides to a power and always check for extraneous solutions",
    ],
    formulas: [
      "nth roots and rational exponents: ⁿ√x = x^(1/n), ⁿ√(xᵐ) = x^(m/n) = (x^(1/n))^m",
      "Laws of exponents: x^a · x^b = x^(a+b), x^a / x^b = x^(a−b), (x^a)^b = x^(ab)",
      "Even-exponent caution: (x^(1/2))² = |x| (over the reals); odd: (x^(1/3))³ = x",
      "Rationalizing a monomial denominator: a/√b = a√b / b",
      "Rationalizing a binomial denominator: a/(√b + √c) = a(√b − √c) / (b − c) — using the conjugate",
    ],
    sections: [
      {
        title: "nth Roots, Rational Exponents & Radical Operations",
        subtitle: "In the rational exponent m/n, the denominator n is the root index, the numerator m the power — remember this and every conversion works",
        terms: [
          {
            term: "nth root",
            def: "When aⁿ = b, a is an nth root of b, written a = ⁿ√b. If n is even, b must be ≥ 0 to be defined over the reals, and only the positive root is taken as the principal root. If n is odd, a real nth root always exists regardless of the sign of b. Example: ⁴√81 = 3 (positive principal root), ³√−8 = −2.",
          },
          {
            term: "Rational exponent",
            def: "An exponent that is a fraction: x^(m/n) = ⁿ√(xᵐ) = (ⁿ√x)ᵐ. The denominator n is the root index, the numerator m the power. Example: 27^(2/3) = (³√27)² = 3² = 9. Or 27^(2/3) = ³√(27²) = ³√729 = 9. Both give the same result, but taking the root first is far easier to compute.",
          },
          {
            term: "Laws of exponents",
            def: "The integer-exponent laws apply to rational exponents too: x^(1/2) · x^(1/3) = x^(1/2 + 1/3) = x^(5/6). (x^(2/3))^(3/2) = x^(2/3 × 3/2) = x¹ = x. Skill with fraction addition/multiplication matters — don't forget to find a common denominator when adding exponents.",
          },
          {
            term: "Rationalizing the denominator",
            def: "If a radical is in the denominator, rationalize to an integer/polynomial form. Monomial denominator: multiply numerator and denominator by the same radical. Binomial denominator: multiply by the conjugate. Example: 5/(√3 + √2) = 5(√3 − √2) / ((√3)² − (√2)²) = 5(√3 − √2) / (3 − 2) = 5(√3 − √2). The conjugate flips only the sign and is otherwise identical.",
          },
        ],
        traps: [
          "When computing x^(m/n), whether you square first or take the root first changes the difficulty dramatically. The 'root first' strategy keeps numbers small and easy. Example: for 32^(3/5), computing 32³ = 32768 first is complex, but ⁵√32 = 2 first gives 2³ = 8 simply. Follow the principle 'denominator (root) first, numerator (power) second.'",
          "For even n, ignoring the domain of x^(m/n) is a common error. x^(1/2) requires x ≥ 0, and (x²)^(1/2) = |x|, not x. When taking an even nth root, if x is negative it is undefined, so always check domain restrictions in expressions with variables.",
        ],
        example:
          "Simplify (8x⁶)^(2/3) ÷ (4x²)^(1/2). Apply rational exponents to each: (8x⁶)^(2/3) = 8^(2/3) · (x⁶)^(2/3) = (³√8)² · x⁴ = 2² · x⁴ = 4x⁴. (4x²)^(1/2) = 4^(1/2) · (x²)^(1/2) = 2 · |x| = 2x (assuming x ≥ 0). Division: 4x⁴ / (2x) = 2x³. Check via exponent laws: numerator exponent sum = 6·(2/3) = 4, denominator exponent sum = 2·(1/2) = 1, 4 − 1 = 3 so x³; coefficients 4 / 2 = 2. Final answer: 2x³.",
      },
      {
        title: "Solving Radical Equations & Checking Extraneous Solutions",
        subtitle: "Raising both sides to a power removes the radical, but the price is an obligatory extraneous check",
        terms: [
          {
            term: "Radical equation",
            def: "An equation with a variable inside a radical. Strategy: (1) isolate the radical on one side; (2) raise both sides to the radical's index to remove it; (3) solve the equation; (4) check for extraneous solutions. Example: √(2x + 3) = x − 1 → square both sides → 2x + 3 = x² − 2x + 1 → x² − 4x − 2 = 0.",
          },
          {
            term: "Isolating the radical",
            def: "Before solving, move the radical term to one side to get 'radical = remaining expression.' If there are two or more radicals, isolate and remove them one at a time. Raising both sides to a power without isolating the radical makes the expression more complicated.",
          },
          {
            term: "Checking for extraneous solutions",
            def: "Raising both sides to a power (especially an even power) can create extraneous solutions. For example, √x = −2 has no solution, but squaring gives x = 4, which is extraneous. Always substitute found solutions into the original equation to confirm they are true.",
          },
          {
            term: "nth-root equations",
            def: "Cube-root and fourth-root equations are solved the same way as square-root ones. ³√(x + 1) = 2 → cube both sides → x + 1 = 8 → x = 7. Odd-index radicals do not produce extraneous solutions, but even-index radicals (square, fourth, etc.) always require a check.",
          },
        ],
        traps: [
          "Squaring both sides without isolating the radical is a very common error. In √x + 3 = 7, squaring immediately gives x + 6√x + 9 = 49, which is more complicated. First isolate √x = 4, then square to get x = 16. Always proceed in the order 'isolate → raise to a power.'",
          "After squaring a radical equation and getting a quadratic, both solutions appear, and one is often extraneous — a frequent exam setup. After finding both, substitute each into the original to confirm. Assuming 'no extraneous solutions' and writing both as answers loses points.",
        ],
        example:
          "Solve √(x + 5) = x − 1 and check for extraneous solutions. The radical is already isolated. Square both sides: x + 5 = (x − 1)² = x² − 2x + 1. Rearrange: x² − 3x − 4 = 0 → (x − 4)(x + 1) = 0 → x = 4 or x = −1. Extraneous check: substitute x = 4: √(4+5) = √9 = 3, x − 1 = 3 → 3 = 3 ✓ valid. Substitute x = −1: √(−1+5) = √4 = 2, x − 1 = −1 − 1 = −2 → 2 ≠ −2 ✗ extraneous! Final answer: only x = 4 is valid; x = −1 is discarded.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u4-l3",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 4,
    lessonNum: 3,
    unitName: "Rational & Radical Expressions & Functions",
    title: "Graphing Rational & Radical Functions — Asymptotes, Domain & Transformations",
    subtitle: "Asymptotes are the skeleton of a rational function; domain restrictions are the heart of a radical function",
    overview:
      "Where earlier you handled expressions, this lesson studies the shape of the graph once an expression becomes a function f(x). You already know the graph of the rational function f(x) = 1/x as an inverse-variation curve, but for rational functions with complicated denominators the vertical and horizontal asymptotes serve as the skeleton of the graph. The core message: 'Draw the asymptotes first, then check which way the graph approaches — that is all of rational-function sketching.' The radical function f(x) = √x starts with domain x ≥ 0, and transformations change its starting point and direction. This lesson masters graph analysis and transformations for both function types.",
    objectives: [
      "Determine the vertical asymptote, horizontal asymptote, domain, and range of a rational function f(x) = a/(x − h) + k",
      "Compare the degrees of numerator and denominator to find the horizontal (or oblique) asymptote",
      "Factor the denominator to distinguish vertical asymptotes from holes (removable discontinuities)",
      "Determine the domain, range, endpoint, and direction of a radical function f(x) = a·ⁿ√(x − h) + k and apply transformations",
      "Use the key features (asymptotes, domain, range, intercepts) of rational and radical functions to sketch them accurately",
    ],
    formulas: [
      "Vertical asymptote: x-value where denominator = 0 and numerator ≠ 0 → x = a",
      "Horizontal asymptote: numerator degree < denominator degree → y = 0; equal → y = ratio of leading coefficients; numerator > denominator → no horizontal asymptote (oblique)",
      "Hole: where a common factor (x − a) cancels in numerator and denominator, a hole occurs at x = a",
      "Radical transformation: f(x) = a·√(x − h) + k → (h, k) is the endpoint, sign of a the direction (up/down), |a| the vertical stretch/compression",
      "Even-radical domain: √(x − h) → x ≥ h; odd-radical domain: ³√(x − h) → all reals",
    ],
    sections: [
      {
        title: "Graphing Rational Functions — Asymptotes, Holes, Domain & Sketching",
        subtitle: "Vertical asymptote = denominator 0, horizontal asymptote = degree comparison — these two rules complete the skeleton",
        terms: [
          {
            term: "Vertical asymptote",
            def: "The vertical line x = a that the graph approaches infinitely but never touches, occurring where the denominator is 0 and the numerator is not. Factor the denominator and set to 0 the remaining factors (excluding any that become holes). As x → a±, f(x) → ±∞.",
          },
          {
            term: "Horizontal asymptote",
            def: "The horizontal line y = b that f(x) approaches as x → ±∞. Compare numerator degree (n) vs. denominator degree (m): n < m → y = 0; n = m → y = ratio of leading coefficients; n > m → no horizontal asymptote (oblique). Unlike a vertical asymptote, the graph may cross a horizontal asymptote.",
          },
          {
            term: "Hole / Removable discontinuity",
            def: "When a common factor (x − a) cancels after factoring numerator and denominator, a hole (a small open circle) appears at x = a where the function is undefined. Distinguish from a vertical asymptote: a vertical asymptote remains in the denominator after canceling, while a hole disappears. Find the hole's y-coordinate by substituting x = a into the simplified expression.",
          },
          {
            term: "Transformations of rational functions",
            def: "Applying transformations to the basic f(x) = 1/x: in f(x) = a/(x − h) + k, x = h is the vertical asymptote and y = k the horizontal asymptote. h is a horizontal shift (right +h), k a vertical shift (up +k), the sign of a a reflection, and |a| a vertical stretch/compression. Reading this form directly makes sketching very fast.",
          },
        ],
        traps: [
          "Failing to distinguish a vertical asymptote from a hole is the signature high-score barrier of this unit. In f(x) = (x² − 4)/(x² − x − 2) = (x+2)(x−2)/((x−2)(x+1)), (x−2) is a common factor, so x = 2 is a hole, not a vertical asymptote; the vertical asymptote is at (x+1) = 0, i.e. x = −1. Always judge by comparing before and after canceling.",
          "When finding a horizontal asymptote, a common error is dividing all coefficients instead of comparing only leading terms. The horizontal asymptote of f(x) = (3x² + 5x − 2)/(2x² − x + 4) is y = 3/2 (ratio of leading coefficients), not (3+5−2)/(2−1+4) = 6/5. The horizontal asymptote is determined solely by the ratio of leading coefficients.",
        ],
        example:
          "Analyze the asymptotes, hole, domain, and graph features of f(x) = (2x² − 8) / (x² + x − 6). Factor: numerator 2x² − 8 = 2(x+2)(x−2), denominator x² + x − 6 = (x+2)(x−3). Common factor (x+2) → a hole at x = −2. Simplify: f(x) = 2(x−2)/(x−3), x ≠ −2. Vertical asymptote: x − 3 = 0 → x = 3. Horizontal asymptote: numerator and denominator both degree 1 → y = 2/1 = 2. Hole coordinate: substitute x = −2 → 2(−2−2)/(−2−3) = 2(−4)/(−5) = 8/5, so the hole is (−2, 8/5). Domain: x ≠ −2, x ≠ 3. y-intercept: f(0) = 2(0−2)/(0−3) = −4/(−3) = 4/3.",
      },
      {
        title: "Graphing Radical Functions — Domain, Range, Transformations & Sketching",
        subtitle: "A radical function's endpoint is (h, k) and an even radical goes only one direction — the domain is the graph's starting point",
        terms: [
          {
            term: "Basic radical function",
            def: "f(x) = √x is a right-half-parabola shape with domain x ≥ 0, endpoint (0, 0), increasing slowly up and to the right. f(x) = ³√x has domain all reals and is an S-shaped curve through the origin (0, 0). Memorize the basic shapes first, then apply transformations.",
          },
          {
            term: "Transformations of radical functions",
            def: "In f(x) = a·√(x − h) + k: h is a horizontal shift (the endpoint's x-coordinate), k a vertical shift (the endpoint's y-coordinate); if a is negative, reflect over the x-axis (opens downward); if |a| > 1, vertical stretch; if 0 < |a| < 1, vertical compression. The endpoint is always (h, k). An even radical has domain x ≥ h; an odd radical has domain all reals.",
          },
          {
            term: "Domain & range",
            def: "For f(x) = a·√(x − h) + k with an even radical, the domain is x ≥ h. Range: y ≥ k if a > 0, y ≤ k if a < 0. The domain restriction comes from 'the radicand cannot be negative'; the range restriction comes from the endpoint k and the stretch/direction a. Example: f(x) = −2√(x + 3) − 1 → domain x ≥ −3, range y ≤ −1.",
          },
          {
            term: "Inverse relationship of square root and quadratic functions",
            def: "f(x) = x² (x ≥ 0) and g(x) = √x are inverse functions of each other. f(g(x)) = (√x)² = x, g(f(x)) = √(x²) = |x| = x (x ≥ 0). On a graph they are symmetric about the line y = x. The rational-exponent functions f(x) = xⁿ and g(x) = x^(1/n) hold the same inverse relationship.",
          },
        ],
        traps: [
          "Applying the radical function's horizontal-shift direction backward is a common error. The endpoint of f(x) = √(x − 3) is x = +3, and of f(x) = √(x + 3) is x = −3. As with polynomial and rational functions, the sign of h in (x − h) is the shift direction as written. Don't read the sign backward — build the habit of setting the radicand to 0 to find the endpoint directly.",
          "When determining the range, ignoring the sign of a is common. For f(x) = −3√(x − 1) + 4, the endpoint is (1, 4) and a = −3 < 0, so the graph goes right and down from the endpoint, giving range y ≤ 4. Without checking the sign of a, you might wrongly write y ≥ 4. Always determine in the order: sign of a → graph direction → range.",
        ],
        example:
          "Analyze the domain, range, endpoint, and direction of f(x) = −2√(x + 1) + 3 and sketch it. Decompose: a = −2, h = −1, k = 3. Domain: x + 1 ≥ 0 → x ≥ −1. Endpoint: (−1, 3). Since a = −2 < 0, the graph goes right and down from the endpoint. Since |a| = 2, it stretches vertically by a factor of 2 relative to basic √x. Range: y ≤ 3. Key points: x = 0 → f(0) = −2√1 + 3 = 1, x = 3 → f(3) = −2√4 + 3 = −4 + 3 = −1. Sketch: start at (−1, 3), pass through (0, 1) and (3, −1), curving down to the right with decreasing rate. The y-intercept is (0, 1).",
      },
    ],
  },
];
