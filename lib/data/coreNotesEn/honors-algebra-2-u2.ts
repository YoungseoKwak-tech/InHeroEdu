/**
 * Core Notes English version — Honors Algebra 2 Unit 2 (Quadratic Functions & Complex Numbers).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ALGEBRA_2_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-algebra-2-u2-l1",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 2,
    lessonNum: 1,
    unitName: "Quadratic Functions & Complex Numbers",
    title: "Graphing Quadratics — Vertex, Standard & Factored Form",
    subtitle: "Switch freely among the three forms and any problem is set up in under a minute",
    overview:
      "The quadratic function is the heart of Honors Algebra 2. Where the vertex of a parabola sits, which way it opens, how many x-intercepts it has — all of this information is already embedded in the form of the equation. The core strategy: 'First convert the equation into the form that gives the information the problem demands.' Switch to vertex form to read the vertex directly, factored form to read the x-intercepts, and standard form to compare coefficients — that switching ability is the heart of the Honors level. This lesson conquers the structure of the three forms and their conversions.",
    objectives: [
      "Express a quadratic in standard form, vertex form, and factored form, and explain what each form reveals",
      "Read the vertex (h, k), axis of symmetry, and maximum/minimum directly from vertex form y = a(x − h)² + k",
      "Use the vertex formula x = −b/(2a) to find the vertex from standard form and sketch the graph",
      "Immediately identify the x-intercepts (zeros) and axis of symmetry from factored form y = a(x − p)(x − q)",
      "Determine the parabola's direction (up/down), y-intercept, and number of x-intercepts to graph it accurately",
    ],
    formulas: [
      "Standard form: y = ax² + bx + c",
      "Vertex form: y = a(x − h)² + k  →  vertex: (h, k)",
      "Factored form: y = a(x − p)(x − q)  →  x-intercepts: p, q",
      "Axis of symmetry: x = −b / (2a)",
      "Vertex x-coordinate: h = −b / (2a)  →  find k = f(h)",
    ],
    sections: [
      {
        title: "The Three Forms — What Can You Read Off Directly",
        subtitle: "Each form makes different information 'instantly readable' — confirm your purpose before converting",
        terms: [
          {
            term: "Standard form",
            def: "The form y = ax² + bx + c. You can read the y-intercept c directly. If a > 0 the parabola opens upward (concave up); if a < 0 it opens downward. You must additionally compute the vertex using the axis of symmetry x = −b/(2a).",
          },
          {
            term: "Vertex form",
            def: "The form y = a(x − h)² + k. You can read the vertex (h, k) and the axis of symmetry x = h immediately. k is the minimum (a > 0) or maximum (a < 0). Watch the sign: in x − h, a positive h means the graph shifted right.",
          },
          {
            term: "Factored form",
            def: "The form y = a(x − p)(x − q). You can read the x-intercepts (zeros/roots) p and q immediately. The axis of symmetry is the average of the two intercepts, x = (p + q)/2. This form is available only when the quadratic factors.",
          },
          {
            term: "Parabola",
            def: "The graph of a quadratic function. The larger |a|, the narrower the parabola; the smaller, the wider. The vertex is the lowest point (a > 0) or highest point (a < 0), and the graph is symmetric across the axis of symmetry.",
          },
        ],
        traps: [
          "In vertex form y = a(x − h)² + k, always watch the sign of h. The vertex of y = 3(x − 2)² + 5 is (2, 5), while y = 3(x + 2)² + 5 is (x − (−2))², so its vertex is (−2, 5). When you see a plus sign inside the parentheses, the vertex's x-coordinate is negative.",
          "In standard form y = ax² + bx + c, watch for missing terms. y = 2x² − 5 has b = 0, so its axis of symmetry is x = 0 (the y-axis); y = x² + 3x has c = 0, so its y-intercept is 0. When a term is absent, explicitly recognize that its coefficient is 0.",
        ],
        example:
          "Convert y = 2x² − 8x + 3 to vertex form, and find the vertex, axis of symmetry, and minimum. Axis of symmetry: x = −(−8)/(2·2) = 8/4 = 2. y-value: y = 2(2)² − 8(2) + 3 = 8 − 16 + 3 = −5. The vertex is (2, −5), and vertex form is y = 2(x − 2)² − 5. Since a = 2 > 0, the parabola opens upward and the minimum is −5. The y-intercept is c = 3, and the graph spreads symmetrically about x = 2 from (2, −5).",
      },
      {
        title: "Converting Between Forms & Sketching Graphs",
        subtitle: "Completing the square turns standard into vertex form; factoring reveals the x-intercepts",
        terms: [
          {
            term: "Perfect square trinomial",
            def: "The expansion (x + n)² = x² + 2nx + n². To turn x² + bx into a perfect square, add and subtract (b/2)². This step is the core of 'completing the square' to convert into vertex form.",
          },
          {
            term: "x-intercept / Zero",
            def: "The x-coordinate where the graph meets the x-axis. Find it by setting y = 0 and solving. A quadratic has 0 x-intercepts (discriminant < 0), 1 (discriminant = 0), or 2 (discriminant > 0).",
          },
          {
            term: "y-intercept",
            def: "The point where the graph meets the y-axis. Find it by substituting x = 0. In standard form y = ax² + bx + c, the y-intercept is always c. With the vertex and the y-intercept in hand, you can sketch a parabola's shape quickly.",
          },
          {
            term: "Using symmetry",
            def: "A parabola is perfectly symmetric across its axis of symmetry (x = h), the vertical line through the vertex. The y-intercept (0, c) is distance h from x = h, so its mirror point is (2h, c). Using this gives you extra points for graphing.",
          },
        ],
        traps: [
          "When a ≠ 1, completing the square causes many errors. To convert y = 2x² − 8x + 3, first factor out the coefficient 2 from the x² term: y = 2(x² − 4x) + 3. Then add and subtract (4/2)² = 4 inside the parentheses, but when pulling it out you must subtract 2 × 4 = 8: y = 2(x² − 4x + 4) + 3 − 8 = 2(x − 2)² − 5. Do not forget to multiply the pulled-out number by a.",
          "In factored form y = a(x − p)(x − q), the x-intercepts are p and q themselves, not (x − p) and (x − q). The x-intercepts of y = (x − 3)(x + 5) are 3 and −5. Remember that a minus sign inside the parentheses makes the x-intercept positive.",
        ],
        example:
          "Sketch the graph of y = (x − 1)(x − 5). x-intercepts: x = 1 and x = 5. Axis of symmetry: x = (1 + 5)/2 = 3. Vertex: substitute x = 3, y = (3 − 1)(3 − 5) = 2·(−2) = −4, giving vertex (3, −4). y-intercept: substitute x = 0, y = (−1)(−5) = 5. Since a = 1 > 0, the parabola opens upward. Plot (1, 0), (3, −4), (5, 0), (0, 5), and by symmetry add (6, 5) to complete the sketch.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u2-l2",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 2,
    lessonNum: 2,
    unitName: "Quadratic Functions & Complex Numbers",
    title: "Solving Quadratics — Factoring, Completing the Square, the Formula & the Discriminant",
    subtitle: "An Honors-level strategy map for choosing among four methods in half a second",
    overview:
      "A student who reaches for the quadratic formula every single time will run out of time at the Honors level. Plugging a problem that factors in two seconds into the formula even raises your chance of error. The strategy map: 'First check if it factors → if not, complete the square or use the formula → use the discriminant to know the number of solutions in advance.' Etch this flow into your mind and you can solve any quadratic by the fastest route. This lesson masters when to apply each of the four methods and the meaning of the discriminant.",
    objectives: [
      "Solve a quadratic by each of the four methods: factoring, the square root method, completing the square, and the quadratic formula",
      "Use the sign of the discriminant D = b² − 4ac to predict real, repeated, or imaginary solutions in advance",
      "Read a problem's structure and choose the most efficient method in one second",
      "Use completing the square to derive a quadratic's exact solutions without the formula",
      "Read the sum and product of the roots directly from the coefficients using Vieta's formulas",
    ],
    formulas: [
      "Quadratic formula: x = (−b ± √(b² − 4ac)) / (2a)",
      "Discriminant: D = b² − 4ac",
      "D > 0 → two distinct real roots | D = 0 → one repeated real root | D < 0 → two imaginary roots",
      "Vieta's formulas: sum of roots = −b/a,  product of roots = c/a",
      "Square root method: x² = k  →  x = ±√k",
    ],
    sections: [
      {
        title: "Factoring & the Square Root Method — The First Gate to a Fast Solution",
        subtitle: "Training to judge in half a second whether an expression factors",
        terms: [
          {
            term: "Factoring",
            def: "Decomposing ax² + bx + c into the form a(x − p)(x − q). For an integer-coefficient quadratic, first find the factor pair of c whose sum is b. It is much faster when a = 1; when a ≠ 1, use the AC method or trial and error.",
          },
          {
            term: "Zero product property",
            def: "If AB = 0, then A = 0 or B = 0. Once factoring gives (x − p)(x − q) = 0, you immediately conclude x = p or x = q. This property is exactly why factoring is the fastest solution method for quadratics.",
          },
          {
            term: "Square root method",
            def: "Used when an equation is in the form (x − h)² = k. Taking the square root of both sides gives x − h = ±√k, so x = h ± √k. It is most efficient for quadratics with no linear term (b = 0).",
          },
          {
            term: "GCF (Greatest Common Factor)",
            def: "The first step of any factoring is always to pull out the GCF. In 2x² + 6x = 0 the GCF is 2x, so 2x(x + 3) = 0 → x = 0 or x = −3. Miss the GCF and you lose a solution.",
          },
        ],
        traps: [
          "When applying the zero product property after factoring, a common error is writing it without moving everything to one side equal to 0. If the right side is not 0, as in (x − 2)(x + 3) = 6, you cannot use the property. Always set the right side to 0 first. Writing x = 2 or x = −3 from (x − 2)(x + 3) = 6 is completely wrong.",
          "After pulling out a GCF, it is easy to miss x = 0 as a solution. Factoring 3x² − 12x = 0 as 3x(x − 4) = 0 gives both x = 0 and x = 4. Dividing by x and solving only x − 4 = 0 → x = 4 loses half the answer.",
        ],
        example:
          "Solve 6x² + x − 2 = 0 by factoring. With a = 6 and c = −2, ac = −12. The factor pair summing to b = 1 is 4 and −3 (4 + (−3) = 1, 4 × (−3) = −12). Split the middle term: 6x² + 4x − 3x − 2 = 0. Group: 2x(3x + 2) − 1(3x + 2) = 0 → (2x − 1)(3x + 2) = 0. Zero product property: 2x − 1 = 0 → x = 1/2, or 3x + 2 = 0 → x = −2/3. Solutions: x = 1/2 or x = −2/3. Check via Vieta: sum = 1/2 + (−2/3) = 3/6 − 4/6 = −1/6 = −b/a = −1/6 ✓.",
      },
      {
        title: "Completing the Square, the Quadratic Formula & the Discriminant",
        subtitle: "When factoring stalls, use the formula — but predict the nature of the roots first with the discriminant",
        terms: [
          {
            term: "Completing the square",
            def: "Converting the ax² + bx part of ax² + bx + c = 0 into a perfect square to reach the form (x − h)² = k. It is used to derive the quadratic formula and to convert a quadratic into vertex form. When a ≠ 1, first divide by a to make the leading coefficient 1.",
          },
          {
            term: "Quadratic formula",
            def: "A formula that always finds the solutions of ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) / (2a). Use it when the quadratic does not factor or the coefficients are fractions/decimals. The ± sign represents both solutions at once.",
          },
          {
            term: "Discriminant",
            def: "The quantity under the root in the formula, D = b² − 4ac. D > 0: two distinct real roots (graph crosses the x-axis twice). D = 0: a repeated root (graph is tangent to the x-axis). D < 0: two conjugate imaginary roots (graph does not meet the x-axis).",
          },
          {
            term: "Vieta's formulas",
            def: "If r₁, r₂ are the roots of ax² + bx + c = 0, then r₁ + r₂ = −b/a and r₁·r₂ = c/a. You can read the sum and product of the roots from the coefficients without solving — useful for verification.",
          },
        ],
        traps: [
          "When writing −b in the formula, sign errors are common if b itself is negative. If b = −5, then −b = −(−5) = 5. Also, many write the denominator as just 2 instead of 2a. Always include a in the denominator: if a = 3, the denominator is 2·3 = 6.",
          "In the discriminant D = b² − 4ac, when computing b² with b = −4, you get (−4)² = 16, but a common error is computing b² as −16. Remember that squaring a negative always gives a positive. And when computing 4ac, include the sign of c exactly.",
        ],
        example:
          "Solve 2x² − 4x − 3 = 0 with the formula, first checking the nature of the roots with the discriminant. a = 2, b = −4, c = −3. Discriminant D = (−4)² − 4(2)(−3) = 16 + 24 = 40 > 0, so there are two distinct real roots. Apply the formula: x = (−(−4) ± √40) / (2·2) = (4 ± 2√10) / 4 = (2 ± √10) / 2. So x = (2 + √10)/2 or x = (2 − √10)/2. Check with Vieta: sum = (2 + √10)/2 + (2 − √10)/2 = 4/2 = 2 = −b/a = −(−4)/2 = 2 ✓. Product = (2 + √10)/2 · (2 − √10)/2 = (4 − 10)/4 = −6/4 = −3/2 = c/a ✓.",
      },
    ],
  },
  {
    lessonId: "honors-algebra-2-u2-l3",
    courseId: "honors-algebra-2",
    subjectLabel: "Honors Algebra 2",
    emoji: "➗",
    unit: 2,
    lessonNum: 3,
    unitName: "Quadratic Functions & Complex Numbers",
    title: "Complex Numbers — The Imaginary Unit, Operations, Conjugates & Complex Solutions",
    subtitle: "Accept the new number system that i² = −1 creates, and the solutions of D < 0 come into view",
    overview:
      "Many students think a quadratic with a negative discriminant has 'no solutions.' But the precise statement is 'no real solutions.' Enter the world of imaginary numbers and every quadratic is guaranteed two solutions — this is the essence of the Fundamental Theorem of Algebra. The core message: 'i is not just a symbol; it is the key that expands the number line into a two-dimensional plane.' Understand the complex number a + bi and it connects to polynomial roots, the rotation of triangles, and signal processing. This lesson masters the imaginary unit, the four operations on complex numbers, conjugates, and complex solutions.",
    objectives: [
      "Use the definition i² = −1 to compute powers of i (the i¹, i², i³, i⁴ cycle)",
      "Add, subtract, and multiply complex numbers a + bi and express the result in standard form (a + bi)",
      "Use the complex conjugate to divide complex numbers (rationalize the denominator)",
      "Find the imaginary solutions of a quadratic with D < 0 exactly using the formula and write them in complex form",
      "Explain that imaginary solutions always appear as a conjugate pair and reconstruct the quadratic from them",
    ],
    formulas: [
      "Imaginary unit: i = √(−1),  i² = −1",
      "Powers of i cycle: i¹ = i,  i² = −1,  i³ = −i,  i⁴ = 1  (period 4)",
      "Standard form: a + bi  (a: real part, b: imaginary part)",
      "Complex conjugate: the conjugate of a + bi is a − bi",
      "Division: (a + bi) / (c + di) = [(a + bi)(c − di)] / (c² + d²)",
      "√(−n) = i√n  (n > 0)",
    ],
    sections: [
      {
        title: "The Imaginary Unit & Adding, Subtracting, Multiplying Complex Numbers",
        subtitle: "Treat i like a variable but follow the one rule i² = −1, and every operation works out",
        terms: [
          {
            term: "Imaginary unit",
            def: "Defined as i = √(−1), with i² = −1. Because the real number system has no square root of a negative, this new unit completes the complex number system. Powers of i repeat with period 4: i¹ = i, i² = −1, i³ = −i, i⁴ = 1.",
          },
          {
            term: "Complex number",
            def: "A number of the form a + bi, where a is the real part and b is the imaginary part, both real. If a = 0 it is pure imaginary; if b = 0 it is a real number. Every real number is a special case of a complex number.",
          },
          {
            term: "Addition/Subtraction of complex numbers",
            def: "Add or subtract real parts with real parts and imaginary parts with imaginary parts: (a + bi) + (c + di) = (a + c) + (b + d)i. This mirrors component-wise vector addition. To reduce sign errors, always write the i explicitly on the imaginary part.",
          },
          {
            term: "Multiplication of complex numbers",
            def: "(a + bi)(c + di) = ac + adi + bci + bdi² = ac + (ad + bc)i + bd(−1) = (ac − bd) + (ad + bc)i. FOIL-expand, then replace i² with −1. The real part is ac − bd and the imaginary part is ad + bc.",
          },
        ],
        traps: [
          "Forgetting to replace i² with −1 and leaving the imaginary-squared term as is, is a frequent error. Expanding (2 + 3i)(1 − i) gives 2 − 2i + 3i − 3i² = 2 + i − 3(−1) = 2 + i + 3 = 5 + i. Leaving i² as i² means the answer is not in standard form. After expanding, always replace i² with −1.",
          "To find a power iⁿ, use the remainder of n divided by 4. For i²³, since 23 ÷ 4 = 5 remainder 3, i²³ = i³ = −i. If the remainder is 0, then i⁴ = 1. Trying to compute large exponents directly invites errors — use the cycle.",
        ],
        example:
          "Compute (3 + 2i)(4 − 5i) and write it in standard form. FOIL-expand: 3·4 + 3·(−5i) + 2i·4 + 2i·(−5i) = 12 − 15i + 8i − 10i² = 12 − 7i − 10(−1) = 12 − 7i + 10 = 22 − 7i. Check: real part 22, imaginary part −7. The standard form 22 − 7i is the final answer.",
      },
      {
        title: "Conjugates, Division & Complex Solutions of Quadratics",
        subtitle: "Multiplying by the conjugate eliminates the imaginary part — that one principle solves both division and reconstruction",
        terms: [
          {
            term: "Complex conjugate",
            def: "The conjugate of a + bi is a − bi — only the sign of the imaginary part flips. Multiplying by the conjugate gives (a + bi)(a − bi) = a² + b², always a real number. This property is used to rationalize denominators.",
          },
          {
            term: "Division of complex numbers",
            def: "To compute (a + bi) ÷ (c + di), multiply numerator and denominator by the conjugate of the denominator (c − di) to make the denominator real. FOIL-expand the numerator; the denominator becomes c² + d². Simplify the result into standard form a + bi.",
          },
          {
            term: "Imaginary/Complex solution",
            def: "The solution of a quadratic with discriminant D = b² − 4ac < 0. In the formula, convert √(negative) = i√(positive) to find the complex solution. Example: x² + 4 = 0 → x² = −4 → x = ±√(−4) = ±2i.",
          },
          {
            term: "Conjugate pair of solutions",
            def: "The imaginary solutions of a quadratic with real coefficients always appear as a conjugate pair. If one solution is a + bi, the other must be a − bi. Using this, even one imaginary solution lets you reconstruct the quadratic: (x − (a + bi))(x − (a − bi)) = (x − a)² + b².",
          },
        ],
        traps: [
          "When finding the conjugate for division, be careful not to also flip the sign of the real part. The conjugate of 3 + 4i is 3 − 4i, not −3 − 4i. Only the imaginary part's sign flips. Also, after making the denominator real, don't forget to divide both the real and imaginary parts by it.",
          "When computing √(−12), some students just write i√12 and stop. You must simplify the radicand as far as possible. Since √12 = 2√3, the final form is √(−12) = 2i√3. Leaving the radical unsimplified makes the answer incomplete.",
        ],
        example:
          "Solve x² − 4x + 13 = 0 and confirm the conjugate pair. a = 1, b = −4, c = 13. Discriminant D = (−4)² − 4(1)(13) = 16 − 52 = −36 < 0, so imaginary solutions are expected. Formula: x = (4 ± √(−36)) / 2 = (4 ± 6i) / 2 = 2 ± 3i. Two solutions: x = 2 + 3i and x = 2 − 3i — confirmed as a conjugate pair! Reconstruction check: (x − (2 + 3i))(x − (2 − 3i)) = ((x − 2) − 3i)((x − 2) + 3i) = (x − 2)² + 9 = x² − 4x + 4 + 9 = x² − 4x + 13 ✓.",
      },
    ],
  },
];
