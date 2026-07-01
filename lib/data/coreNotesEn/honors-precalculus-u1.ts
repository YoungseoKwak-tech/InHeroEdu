/**
 * Core Notes English version — Honors Precalculus Unit 1 (Functions & Graphs).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content rewritten in natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PRECALCULUS_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-precalculus-u1-l1",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 1,
    lessonNum: 1,
    unitName: "Functions & Graphs",
    title: "The Nature of a Function — Domain, Range, Symmetry, and Behavior",
    subtitle: "Learning the precise language that describes the relationship between inputs and outputs",
    overview:
      "In mathematics the word 'function' carries a meaning entirely different from its everyday sense: a function is a rule that assigns to each element of the domain exactly one element of the range. Starting from this formal definition, this lesson teaches you to express domain and range in interval notation, to identify even and odd functions both algebraically and geometrically, to analyze intervals of increase and decrease together with local extrema, and to handle piecewise functions flawlessly.",
    objectives: [
      "Use the vertical line test to determine whether a given graph represents a function",
      "Express the domain and range of a function in both set notation and interval notation",
      "Distinguish even functions (f(−x) = f(x)) from odd functions (f(−x) = −f(x)) using the algebraic conditions and graphical symmetry",
      "Use a graph and a table of values to identify intervals of increase/decrease and local maxima/minima",
      "Apply the rule for each piece of a piecewise function to evaluate function values and sketch its graph",
    ],
    sections: [
      {
        title: "Definition and Notation of a Function",
        subtitle: "Exactly one output for each input — the uniqueness condition that defines a function",
        terms: [
          {
            term: "Function",
            def: "A relation that assigns to each element x of the domain exactly one element y of the codomain. If a single x maps to two or more values of y, the relation is not a function.",
          },
          {
            term: "Domain",
            def: "The set of all permissible input values x. Typically found by excluding values that make a denominator zero, that put a negative under an even root, or that take the logarithm of a non-positive number. Expressed in interval notation, e.g. (−∞, 3) ∪ (3, ∞).",
          },
          {
            term: "Range",
            def: "The set of all output values y the function actually produces. It can differ from the entire codomain; read it from the graph as the vertical extent covered and express it in interval notation.",
          },
          {
            term: "Piecewise function",
            def: "A function whose domain is split into several intervals, each governed by a different rule. First determine which interval x belongs to, then substitute into the matching expression.",
          },
        ],
        traps: [
          "Swapping domain and range is a frequent error: the domain is the set of inputs (x), the range is the set of outputs (y). When finding the 'natural domain', do not forget to check BOTH the denominator-equals-zero condition and the negative-under-an-even-root condition.",
          "In a piecewise function you must mark whether each boundary point is included (closed dot ●) or excluded (open dot ○). When two pieces give different y-values at the same boundary x, the inequality direction decides which piece owns the boundary.",
        ],
        example:
          "Find the domain of f(x) = √(x + 4)/(x − 2). The radicand cannot be negative, so x + 4 ≥ 0, i.e. x ≥ −4. The denominator cannot be zero, so x ≠ 2. The values satisfying both conditions give the domain [−4, 2) ∪ (2, ∞). Because √(x+4) ≥ 0 and the only discontinuity is at x = 2, the range is read from the graph (or confirmed with a calculator) at the Honors level rather than from the formula alone.",
      },
      {
        title: "Even/Odd Functions and Increasing/Decreasing Analysis",
        subtitle: "Symmetry and monotonicity let half the graph reveal the other half",
        terms: [
          {
            term: "Even function",
            def: "A function satisfying f(−x) = f(x) for every x in the domain. Its graph is symmetric about the y-axis. Examples: f(x) = x², f(x) = cos x.",
          },
          {
            term: "Odd function",
            def: "A function satisfying f(−x) = −f(x) for every x in the domain. Its graph is symmetric about the origin. Examples: f(x) = x³, f(x) = sin x.",
          },
          {
            term: "Increasing interval",
            def: "An interval of x over which the function value rises as you move left to right. Formally, for any x₁ < x₂ in the interval, f(x₁) < f(x₂).",
          },
          {
            term: "Local extremum",
            def: "A local maximum is a point higher than its neighbors; a local minimum is one lower than its neighbors. At a local maximum the function changes from increasing to decreasing; at a local minimum the reverse occurs.",
          },
        ],
        traps: [
          "A function can be neither even nor odd. Take f(x) = x² + x: f(−x) = x² − x ≠ f(x) and f(−x) ≠ −f(x), so it is neither. Not every function must be even or odd.",
          "Always express intervals of increase/decrease as intervals of x (open-interval notation). Say 'the function increases on (a, b)', never as a range of y-values. Because behavior at the endpoints is ambiguous, the convention is to use the open interval (a, b).",
        ],
        example:
          "Check whether f(x) = x⁴ − 2x² is even. f(−x) = (−x)⁴ − 2(−x)² = x⁴ − 2x² = f(x). Since f(−x) = f(x), it is even, and the graph is symmetric about the y-axis. Sketching it shows local minima near x ≈ ±1 and a local maximum near x = 0. In interval form: decreasing on (−∞, −1) and (0, 1), increasing on (−1, 0) and (1, ∞).",
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u1-l2",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 1,
    lessonNum: 2,
    unitName: "Functions & Graphs",
    title: "Graph Analysis and Transformations — Shifts, Stretches, Reflections",
    subtitle: "Master one parent function perfectly and dozens of graphs come for free",
    overview:
      "The most efficient strategy for graphing in precalculus is to start from a 'parent function' and apply transformations. Once you know y = f(x), you can rapidly graph y = a·f(x − h) + k by applying shifts, stretches, and reflections. This lesson has you memorize the eight core parent functions and then apply horizontal/vertical shifts, vertical/horizontal stretches and compressions, and reflections one mechanical step at a time.",
    objectives: [
      "Memorize the eight parent functions (identity, quadratic, cubic, square root, absolute value, reciprocal, exponential, logarithm) and describe their features",
      "From the form y = f(x − h) + k, determine the direction and magnitude of horizontal and vertical shifts and graph the result",
      "Distinguish vertical stretch/compression (y = af(x)) from horizontal stretch/compression (y = f(bx)) and apply each to a graph",
      "Explain how y = −f(x) and y = f(−x) reflect a graph across the x-axis and y-axis respectively",
    ],
    formulas: [
      "y = a·f(b(x − h)) + k  — general transformation form",
      "Vertical shift: +k moves up, −k moves down",
      "Horizontal shift: −h moves right, +h moves left (sign is reversed)",
      "Vertical stretch: |a| > 1 → stretch, 0 < |a| < 1 → compress",
      "Horizontal stretch: |b| > 1 → compress, 0 < |b| < 1 → stretch (reciprocal relationship)",
      "Reflection across x-axis: y = −f(x)",
      "Reflection across y-axis: y = f(−x)",
    ],
    sections: [
      {
        title: "Parent Functions and Horizontal/Vertical Shifts",
        subtitle: "Memorizing the eight parent functions gives every transformation a starting point",
        terms: [
          {
            term: "Parent function",
            def: "The simplest basic form of a function family. The eight to memorize in Honors Precalculus: y = x (identity), y = x² (quadratic), y = x³ (cubic), y = √x (square root), y = |x| (absolute value), y = 1/x (reciprocal), y = aˣ (exponential), y = log x (logarithm).",
          },
          {
            term: "Vertical shift",
            def: "y = f(x) + k. If k > 0 the whole graph moves up by k; if k < 0 it moves down. Every point's y-coordinate changes by k while x stays fixed.",
          },
          {
            term: "Horizontal shift",
            def: "y = f(x − h). If h > 0 the graph moves right; if h < 0 it moves left. Watch the reversed sign: even though h is subtracted in x − h, the graph moves right.",
          },
          {
            term: "Key-point tracking",
            def: "A method that first identifies the parent function's key points (vertex, intercepts, asymptotes) and then applies the transformation to each point to get new coordinates. There is no need to compute every point — tracking the key ones completes the graph.",
          },
        ],
        traps: [
          "Always flip the sign when reading a horizontal shift. In y = f(x − 3) you see '−3', but the graph moves 3 to the RIGHT; y = f(x + 2) moves 2 to the LEFT. Repeat the rule 'sign inside the expression is opposite to the direction of the shift' right up to exam time.",
        ],
        example:
          "Transform y = √x into y = √(x − 2) + 3. The parent's key points are (0, 0), (1, 1), (4, 2), (9, 3). The transformation y = √(x − 2) + 3 is a shift right 2 and up 3. Apply (+2, +3) to each point: (2, 3), (3, 4), (6, 5), (11, 6). Connecting these four points completes the transformed graph, with domain [2, ∞) and range [3, ∞).",
      },
      {
        title: "Stretches and Reflections",
        subtitle: "The size and sign of a and b simultaneously decide the graph's shape and orientation",
        terms: [
          {
            term: "Vertical stretch/compression",
            def: "y = af(x). If |a| > 1 it is a vertical stretch (the graph stretches along the y-direction); if 0 < |a| < 1 it is a vertical compression (it flattens). Each point's y-coordinate is multiplied by a.",
          },
          {
            term: "Horizontal stretch/compression",
            def: "y = f(bx). If |b| > 1 it is a horizontal compression (the graph narrows); if 0 < |b| < 1 it is a horizontal stretch (it spreads). Each x-coordinate is multiplied by 1/b — the opposite direction from the vertical case.",
          },
          {
            term: "Reflection over x-axis",
            def: "y = −f(x). Every point (x, y) of the original becomes (x, −y), flipping the graph about the x-axis.",
          },
          {
            term: "Reflection over y-axis",
            def: "y = f(−x). Every point (x, y) of the original becomes (−x, y), flipping the graph about the y-axis.",
          },
        ],
        traps: [
          "Vertical and horizontal stretches have opposite effects. y = 2f(x) stretches the graph vertically by 2, but y = f(2x) compresses it horizontally by 1/2. The intuition 'multiplied by 2 so it doubles in size' is wrong for horizontal stretches: in y = f(2x) the x-coordinates become 1/2 as large, so the graph narrows.",
          "When several transformations apply at once, order matters. In the general form y = a·f(b(x − h)) + k the order is ① horizontal shift (apply h to x), ② horizontal stretch (apply b), ③ vertical stretch (apply a), ④ vertical shift (apply k). Changing the order can change the result.",
        ],
        example:
          "Take the point (4, 2) on y = √x and transform to y = −2·√(x). The factor a = −2 both stretches vertically by 2 and reflects over the x-axis, so the y-coordinate becomes (−2)(2) = −4, giving the new point (4, −4). Now consider y = √(4x): here b = 4 compresses horizontally by 1/4, so the x-coordinate becomes (1/4)(4) = 1, giving (1, 2) from the original (4, 2). Notice the vertical factor multiplies y directly while the horizontal factor multiplies x by 1/b — the opposite direction.",
      },
    ],
  },
  {
    lessonId: "honors-precalculus-u1-l3",
    courseId: "honors-precalculus",
    subjectLabel: "Honors Precalculus",
    emoji: "📈",
    unit: 1,
    lessonNum: 3,
    unitName: "Functions & Graphs",
    title: "Combining Functions — Operations, Composition, Inverses",
    subtitle: "Building new functions from two old ones, and 'undoing' a function with its inverse",
    overview:
      "The realization that functions can be combined like Lego blocks is the starting point of calculus. This lesson covers function operations (adding, subtracting, multiplying, and dividing two functions), composition (feeding one function's output into another's input), and inverse functions (running a function exactly backwards). The inverse concept is the foundation for exponential/logarithmic and trigonometric/inverse-trigonometric functions, so it must be understood completely before moving on.",
    objectives: [
      "Compute the sum, difference, product, and quotient of two functions and find the domain of the resulting function",
      "Compute composite functions (f∘g)(x) = f(g(x)) and explain why f∘g and g∘f generally differ",
      "Use the horizontal line test to determine whether a function is one-to-one",
      "Find the inverse of a given function algebraically and verify the relationship f⁻¹(f(x)) = x",
      "Explain that the graph of an inverse is the reflection of the original graph across the line y = x",
    ],
    formulas: [
      "(f + g)(x) = f(x) + g(x)",
      "(f − g)(x) = f(x) − g(x)",
      "(fg)(x) = f(x)·g(x)",
      "(f/g)(x) = f(x)/g(x),  g(x) ≠ 0",
      "(f∘g)(x) = f(g(x))",
      "(g∘f)(x) = g(f(x))",
      "Inverse check: f(f⁻¹(x)) = x  AND  f⁻¹(f(x)) = x",
    ],
    sections: [
      {
        title: "Function Operations and Composition",
        subtitle: "Two ways to combine functions — the difference between arithmetic operations and composition",
        terms: [
          {
            term: "Function operations",
            def: "For two functions f and g: (f+g)(x) = f(x)+g(x), (f−g)(x) = f(x)−g(x), (fg)(x) = f(x)·g(x), (f/g)(x) = f(x)/g(x). The domain of the result is the intersection of the domains of f and g; for the quotient, also exclude points where g(x) = 0.",
          },
          {
            term: "Composite function",
            def: "(f∘g)(x) = f(g(x)). Apply g first, then use its output as the input to f. The domain consists of the x in the domain of g for which g(x) lies in the domain of f.",
          },
          {
            term: "Inner/Outer function",
            def: "In f(g(x)), g is the inner function (applied first) and f is the outer function (applied second). This distinction becomes central in the chain rule in calculus, so train it carefully now.",
          },
          {
            term: "Domain of a composite",
            def: "To find the domain of (f∘g)(x) = f(g(x)), both conditions must hold: ① x must be in the domain of g, and ② g(x) must be in the domain of f.",
          },
        ],
        traps: [
          "Composition is not commutative: f∘g ≠ g∘f in general. For f(x) = x² and g(x) = x + 1, (f∘g)(x) = (x+1)² = x²+2x+1 but (g∘f)(x) = x²+1 — different. Always check which composition the problem requires.",
        ],
        example:
          "Given f(x) = 2x − 1 and g(x) = x² + 3, find (f∘g)(x) and (g∘f)(x). (f∘g)(x) = f(x²+3) = 2(x²+3) − 1 = 2x² + 5. (g∘f)(x) = g(2x−1) = (2x−1)² + 3 = 4x² − 4x + 1 + 3 = 4x² − 4x + 4. The two results are entirely different — reversing the order of composition produces a completely different function.",
      },
      {
        title: "Inverse Functions — One-to-One and Graphical Reflection",
        subtitle: "An inverse exists only for a one-to-one function, and its graph is symmetric about y = x",
        terms: [
          {
            term: "One-to-one function",
            def: "A function for which distinct inputs always give distinct outputs: x₁ ≠ x₂ implies f(x₁) ≠ f(x₂). Horizontal line test: if every horizontal line meets the graph at most once, the function is one-to-one.",
          },
          {
            term: "Inverse function",
            def: "The function f⁻¹ that runs f exactly backwards: if f(a) = b then f⁻¹(b) = a. It exists only when f is one-to-one, and satisfies f⁻¹(f(x)) = x and f(f⁻¹(x)) = x.",
          },
          {
            term: "Horizontal line test",
            def: "A visual check for whether a graph is one-to-one (i.e. whether an inverse exists). If every horizontal line y = c meets the graph at exactly one point, it is one-to-one. y = x² fails (it meets a line twice), so it has no inverse until the domain is restricted to x ≥ 0, giving the inverse y = √x.",
          },
          {
            term: "Graph of inverse",
            def: "The graph of y = f⁻¹(x) is the reflection of y = f(x) across the line y = x. A point (a, b) on f corresponds to (b, a) on f⁻¹.",
          },
        ],
        traps: [
          "f⁻¹(x) is NEVER 1/f(x). The superscript −1 denotes the inverse function, not the reciprocal: f⁻¹(x) ≠ [f(x)]⁻¹ = 1/f(x). This confusion is one of the most common sources of wrong answers on exams.",
          "It is easy to skip the step of swapping x and y when finding an inverse. Correct procedure: ① write y = f(x), ② swap x and y, ③ solve for y, ④ write y = f⁻¹(x). Skipping step ② yields a different function, not the inverse.",
        ],
        example:
          "Find the inverse of f(x) = (3x + 1)/(x − 2). ① Write y = (3x+1)/(x−2). ② Swap x and y: x = (3y+1)/(y−2). ③ Solve for y: x(y−2) = 3y+1 → xy − 2x = 3y + 1 → xy − 3y = 2x + 1 → y(x−3) = 2x + 1 → y = (2x+1)/(x−3). So f⁻¹(x) = (2x+1)/(x−3). Verify: f(f⁻¹(x)) = (3·(2x+1)/(x−3) + 1)/((2x+1)/(x−3) − 2) = (6x+3+x−3)/(2x+1−2x+6) = 7x/7 = x. Verified completely.",
      },
    ],
  },
];
