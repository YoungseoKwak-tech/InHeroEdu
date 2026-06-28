/**
 * Core Notes English version — Honors Algebra 2 Unit 1 (Functions, Equations & Inequalities).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ALGEBRA_2_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-algebra-2-u1-l1",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 1,
    lessonNum: 1,
    unitName: "Functions, Equations & Inequalities",
    title: "Linear Equations, Inequalities & Absolute Value",
    subtitle: "Miss the moment you flip a single sign and half the answers go wrong — the core mechanism of absolute-value inequalities",
    overview:
      "The first hurdle in Honors Algebra 2 is the illusion that 'I already know all of this.' You learned linear equations in middle school, but the instant absolute value enters the picture, this becomes the #1 most-missed problem type. |ax + b| < c and |ax + b| > c are solved in opposite directions, and once you understand why in the language of distance on a number line, the mistakes disappear. This lesson starts from ordinary linear inequalities and conquers absolute-value equations and inequalities as a single mechanism.",
    objectives: [
      "Solve linear equations algebraically and represent the solution on a number line and in interval notation",
      "Explain, using the number line, why the inequality sign flips when you multiply or divide by a negative number",
      "Solve absolute-value equations |ax + b| = c by splitting into two cases (positive and negative)",
      "Interpret absolute-value inequalities |ax + b| < c and |ax + b| > c as statements about distance and solve them exactly",
      "Express a solution consistently in set notation, interval notation, and as a number-line graph",
    ],
    formulas: [
      "|x| = c  →  x = c  or  x = -c   (c ≥ 0)",
      "|x| < c  →  -c < x < c   (an AND condition; c > 0)",
      "|x| > c  →  x < -c  or  x > c   (an OR condition; c > 0)",
      "Multiplying/dividing by a negative reverses the sign: a < b → -a > -b",
    ],
    sections: [
      {
        title: "Linear Equations & Inequalities — The Decisive Difference Between = and <",
        subtitle: "How to confirm on the number line why the inequality flips under negative operations",
        terms: [
          {
            term: "Linear equation",
            def: "An equation in which the highest power of the unknown is 1, of the form ax + b = c. You isolate x by adding, subtracting, multiplying, or dividing both sides by the same quantity. The solution is a single number.",
          },
          {
            term: "Linear inequality",
            def: "A linear expression with an inequality sign (<, >, ≤, ≥) instead of an equals sign. It is solved the same way as an equation, except that you MUST reverse the inequality whenever you multiply or divide both sides by a negative number.",
          },
          {
            term: "Interval notation",
            def: "A way of writing an inequality's solution as an interval. A parenthesis ( ) means the endpoint is excluded (< or >); a bracket [ ] means it is included (≤ or ≥). Example: x > 3 → (3, ∞), x ≤ -1 → (-∞, -1].",
          },
          {
            term: "Solution set",
            def: "The set of all real numbers x that make the inequality true. It can be shown as a number-line graph or in set or interval notation.",
          },
        ],
        traps: [
          "The most-missed inequality mistake: leaving the inequality sign unchanged when you multiply or divide by a negative. Writing -2x < 6 as x < -3 is exactly backward. Dividing both sides by -2 flips the sign, so x > -3 is correct — multiplying by -2 reverses the order of every number on the line.",
          "∞ (infinity) is not an endpoint, so interval notation always uses an open parenthesis ( ) next to it. A notation like (-∞, 5] is fine: one side open, the other closed.",
        ],
        example:
          "Solve 3(2x - 4) > -2(x + 1). Distribute: 6x - 12 > -2x - 2. Add 2x to both sides: 8x - 12 > -2. Add 12: 8x > 10. Divide by 8 (positive, so the sign is unchanged): x > 10/8 = 5/4. In interval notation this is (5/4, ∞); on the number line, place an open dot at 5/4 and shade to the right.",
      },
      {
        title: "Absolute-Value Equations & Inequalities — Understanding Through Distance",
        subtitle: "The moment you see |expression| = c as 'two points on a number line,' the method appears automatically",
        terms: [
          {
            term: "Absolute value",
            def: "|x| is the distance between x and the origin (0) on the number line. Because distance is never negative, |x| ≥ 0 always holds. Algebraically, |x| = x when x ≥ 0 and |x| = -x when x < 0.",
          },
          {
            term: "Absolute-value equation",
            def: "An equation of the form |ax + b| = c (c ≥ 0). You must solve both cases in which the expression inside equals c or equals -c: ax + b = c or ax + b = -c.",
          },
          {
            term: "Absolute-value inequality — conjunction (AND)",
            def: "|ax + b| < c means (ax + b) must lie between -c and c. Convert it to the compound inequality -c < ax + b < c and solve as one. The solution is a 'sandwich' clustered in the middle.",
          },
          {
            term: "Absolute-value inequality — disjunction (OR)",
            def: "|ax + b| > c means (ax + b) is greater than c or less than -c. Split it into two separate inequalities: ax + b > c or ax + b < -c. The solution spreads out toward both ends.",
          },
        ],
        traps: [
          "The biggest absolute-value-inequality error is swapping the methods for < and >. |x - 3| > 5 gives x > 8 OR x < -2, while |x - 3| < 5 gives -2 < x < 8 (AND). Remember '< → inside (AND), > → outside (OR)' — memorize 'less than → and, greater than → or' and you will never confuse them.",
          "Do not miss the case c < 0. If the right side is negative, as in |ax + b| = -3, there is no solution (absolute value is always ≥ 0). Likewise |ax + b| < -3 has no solution, while |ax + b| > -3 is satisfied by all real numbers. Build the habit of spotting these special cases instantly.",
        ],
        example:
          "Solve |2x - 1| ≤ 7. The direction is '<', so it is an AND type: -7 ≤ 2x - 1 ≤ 7. Add 1 to all parts: -6 ≤ 2x ≤ 8. Divide all parts by 2 (positive, so the signs stay): -3 ≤ x ≤ 4. In interval notation this is [-3, 4]. On the number line, place closed dots (●) at -3 and 4 and shade between them.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u1-l2",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 1,
    lessonNum: 2,
    unitName: "Functions, Equations & Inequalities",
    title: "Functions & Relations — Domain, Range, Notation & Transformations",
    subtitle: "The moment you see f(x) as an 'input-output machine' rather than just a formula, the door to advanced math opens",
    overview:
      "In Honors Algebra 2, the function is the language of nearly every unit. If you do not thoroughly understand function notation, domain, range, and transformations now, you will wobble every time you meet quadratic, exponential, or logarithmic functions. The core coaching: 'Before you graph any function, always think about its domain and range first.' This lesson organizes everything from the definition of a function through the vertical line test to horizontal/vertical shifts and reflections.",
    objectives: [
      "State the definition of a function and use the vertical line test to decide whether a relation is a function",
      "Find the domain and range of a given function in both set and interval notation",
      "Use function notation f(x) to evaluate functions and compute compositions f(g(x))",
      "Apply horizontal/vertical shifts, reflections over the x- and y-axes, and vertical stretches to the graph of y = f(x)",
      "Identify a one-to-one function using the horizontal line test",
    ],
    formulas: [
      "Vertical shift: y = f(x) + k   (k > 0 up, k < 0 down)",
      "Horizontal shift: y = f(x - h)   (h > 0 right, h < 0 left)",
      "Reflection over x-axis: y = -f(x)",
      "Reflection over y-axis: y = f(-x)",
      "Vertical stretch: y = a·f(x)   (|a| > 1 stretch, 0 < |a| < 1 compress)",
    ],
    sections: [
      {
        title: "Function, Domain & Range — Why Only Some Relations Are 'Chosen' as Functions",
        subtitle: "Only a relation that assigns exactly one output to every input is called a function",
        terms: [
          {
            term: "Relation",
            def: "Any set of ordered pairs linking elements of two sets. A single input x may correspond to several outputs y and still be a relation. A function is a relation that meets one special condition.",
          },
          {
            term: "Function",
            def: "A relation that assigns exactly one range element y to every domain element x. On a graph you check this with the vertical line test — if any vertical line meets the graph more than once, it is not a function.",
          },
          {
            term: "Domain",
            def: "The set of all x-values that can be input to f. Values of x that make a denominator equal to 0, or that make the radicand of an even root negative, are excluded from the domain.",
          },
          {
            term: "Range",
            def: "The set of all y-values produced when every domain element is fed into f. On a graph it is the span of y-values the curve occupies. The strategy for finding the range varies with the type of function.",
          },
        ],
        traps: [
          "When finding a domain, check both major restrictions at once: (1) fractions: denominator ≠ 0; (2) even roots: radicand ≥ 0. For example, the domain of f(x) = √(x-2) / (x-5) requires x - 2 ≥ 0 (x ≥ 2) and x ≠ 5, giving [2, 5) ∪ (5, ∞). Drop either condition and you lose points.",
        ],
        example:
          "Find the domain and range of f(x) = √(3 - x). The radicand of an even root must be ≥ 0, so 3 - x ≥ 0, i.e. x ≤ 3. The domain is (-∞, 3]. Now for the range: when x = 3, f(3) = 0 (the minimum); as x → -∞, f(x) → +∞. So the range is [0, ∞). The graph is a half-parabola starting at x = 3 and spreading up and to the left.",
      },
      {
        title: "Function Notation, Composition & Transformations",
        subtitle: "A section that fixes, all at once, why the order of f(g(x)) and the sign direction in transformation rules go wrong",
        terms: [
          {
            term: "Function notation",
            def: "In y = f(x), the expression f(x) is 'the output when x is input to f.' f(3) is the value found by substituting x = 3. When a problem asks for f(2a - 1), replace every x in the definition of f with (2a - 1).",
          },
          {
            term: "Composite function",
            def: "(f ∘ g)(x) = f(g(x)) feeds x into g first, then feeds that output into f. Evaluate the inner function (g) first, then apply the outer function (f). Note that f ∘ g ≠ g ∘ f in general.",
          },
          {
            term: "Horizontal shift",
            def: "y = f(x - h) shifts the original graph h units along the x-axis: right if h > 0, left if h < 0. The key is that the sign inside the parentheses is opposite to the direction of the shift.",
          },
          {
            term: "Vertical stretch/compression",
            def: "y = a·f(x) multiplies every y-value by a. If |a| > 1 the graph stretches vertically; if 0 < |a| < 1 it compresses vertically; if a < 0 it is reflected over the x-axis.",
          },
        ],
        traps: [
          "In the horizontal shift y = f(x - h), the sign is the opposite of intuition. y = f(x - 3) shifts 3 units RIGHT, and y = f(x + 3) shifts 3 units LEFT. Memorize 'minus = right, plus = left.' By contrast, the vertical shift y = f(x) + k matches its sign (+k means up), which is what trips many students.",
          "The domain of a composite f(g(x)) requires both: (1) x is in the domain of g, AND (2) the output g(x) lies in the domain of f. Writing only the domain of g and forgetting the second condition will give a wrong answer.",
        ],
        example:
          "Given f(x) = x² + 1 and g(x) = 2x - 3, find (f ∘ g)(x). First compute g(x) = 2x - 3, then input that into f: f(g(x)) = f(2x - 3) = (2x - 3)² + 1 = 4x² - 12x + 9 + 1 = 4x² - 12x + 10. Now (g ∘ f)(x) = g(x² + 1) = 2(x² + 1) - 3 = 2x² - 1, confirming clearly that f ∘ g ≠ g ∘ f.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u1-l3",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 1,
    lessonNum: 3,
    unitName: "Functions, Equations & Inequalities",
    title: "Systems of Equations & Inequalities",
    subtitle: "How to find algebraically where two lines 'meet,' and the strategy for graphing inequality regions on the plane",
    overview:
      "A system of equations is the problem of finding 'the point that satisfies two conditions at once.' Substitution eliminates one variable, leaving the other; elimination adds or subtracts the two equations to cancel a variable. Deciding which method is faster by reading the structure in one second is what saves you time on Honors-level exams. Add inequalities and the solution becomes not a point but a 'region' — and that shift is exactly the beginning of linear programming.",
    objectives: [
      "Solve a two-variable system by both substitution and elimination, and judge which method is more efficient",
      "Determine whether a system has one solution (one intersection), infinitely many (the same line), or none (parallel lines)",
      "Graph the solution region of a system of inequalities and shade the intersection region",
      "Solve a 3×3 system systematically using Gaussian elimination or substitution",
    ],
    formulas: [
      "Substitution: solve one equation for y = (in x) → substitute into the other → find x, then back-substitute for y",
      "Elimination: match one variable's coefficient, then add or subtract the equations to cancel it",
      "Classifying solutions (lines y = m₁x + b₁, y = m₂x + b₂): m₁ ≠ m₂ → unique | m₁ = m₂, b₁ ≠ b₂ → none | m₁ = m₂, b₁ = b₂ → infinitely many",
    ],
    sections: [
      {
        title: "Substitution & Elimination — Choosing the Right Strategy for the Situation",
        subtitle: "Building Honors-level judgment to pick a method in one second by reading the coefficient structure",
        terms: [
          {
            term: "Substitution method",
            def: "Express one variable in terms of the other in one equation, then substitute that expression into the remaining equation to reduce to a single unknown. Substitution is fastest when one equation is already in the form y = … or x = ….",
          },
          {
            term: "Elimination method",
            def: "Scale the equations so one variable's coefficients are equal or opposite, then add or subtract to cancel that variable. Elimination is efficient when the coefficients are integers and both equations are in standard form (ax + by = c).",
          },
          {
            term: "No solution (inconsistent)",
            def: "Occurs when the equations represent parallel lines. If, during elimination, all variables cancel and you reach a false statement like 0 = 5, there is no solution. The lines share a slope but differ in y-intercept.",
          },
          {
            term: "Infinitely many solutions (dependent)",
            def: "Occurs when the equations are really the same line. If elimination yields an always-true statement like 0 = 0, the equations are dependent. The solution set is every point on the line.",
          },
        ],
        traps: [
          "When you multiply to match coefficients in elimination, you must multiply the constant (right side) too. To double 3x + 2y = 7, the result is 6x + 4y = 14, not 6x + 4y = 7. Forgetting the right side is the most common slip — always check past the equals sign.",
          "After finding a solution, always substitute it back into BOTH original equations to verify. Especially in substitution, a sign error in the middle often produces a value that fits one equation but fails the other.",
        ],
        example:
          "Solve { 2x + 3y = 12, 5x - 3y = 9 } by elimination. The y-coefficients are +3 and -3 (opposite), so add the equations directly: (2x + 5x) + (3y - 3y) = 12 + 9 → 7x = 21 → x = 3. Substitute into the first equation: 2(3) + 3y = 12 → 6 + 3y = 12 → 3y = 6 → y = 2. The solution is (3, 2). Check in the second equation: 5(3) - 3(2) = 15 - 6 = 9 ✓.",
      },
      {
        title: "Systems of Inequalities & Solution Regions",
        subtitle: "When two or more inequalities meet, the solution expands from a 'point' to a 'region'",
        terms: [
          {
            term: "System of inequalities",
            def: "A set of conditions that must be satisfied by two or more inequalities at once. Graph each inequality's solution region (a half-plane) separately, then the intersection (the overlap) satisfying all conditions is the solution region of the system.",
          },
          {
            term: "Boundary line",
            def: "The line corresponding to the equality part of an inequality. Draw it solid if the equality is included (≤ or ≥), and dashed if it is excluded (< or >).",
          },
          {
            term: "Test point",
            def: "A point not on the boundary, substituted into the inequality to determine which half-plane is the solution region. (0, 0) is the easiest test point to compute, as long as the boundary does not pass through the origin.",
          },
          {
            term: "Feasible region",
            def: "The solution region of a system of inequalities — the part of the plane satisfying all inequality conditions at once. When the region is bounded, you find its vertices and evaluate an objective function for its maximum/minimum in linear programming.",
          },
        ],
        traps: [
          "A common shading error is graphing each inequality separately and then shading the 'union.' The solution of a system is the intersection, NOT the union — shade only the region that satisfies every inequality at once. Miss one condition and the region becomes far larger, giving a completely different answer.",
          "If a boundary is a vertical line (x = k), its slope is undefined and it cannot be put into y = mx + b form. x < k is the region to the left, x > k to the right. In this case using a test point is the safest approach.",
        ],
        example:
          "Graph the solution region of { y ≤ 2x + 1, y > -x + 4 }. Draw y = 2x + 1 solid (≤) and y = -x + 4 dashed (>). For y ≤ 2x + 1: test (0, 0), giving 0 ≤ 1, true → shade the origin side (below the line). For y > -x + 4: test (0, 0), giving 0 > 4, false → shade the side away from the origin (above the line). The overlap of the two shaded regions is the solution. Find the intersection of the lines: 2x + 1 = -x + 4 → 3x = 3 → x = 1, y = 3, so the vertex of the region is (1, 3).",
      },
    ],
  },
];
