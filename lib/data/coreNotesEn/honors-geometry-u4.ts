/**
 * Core Notes English version — Honors Geometry Unit 4 (Right Triangles, Trig, Transformations & Solids).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content translated to natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_GEOMETRY_U4_EN: CoreNote[] = [
  {
    lessonId: "honors-geometry-u4-l1",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 4,
    lessonNum: 1,
    unitName: "Right Triangles, Trig, Transformations & Solids",
    title: "Right Triangles — Complete Command of the Pythagorean Theorem and Special Right Triangles",
    subtitle: "Not memorising the 45-45-90 and 30-60-90 ratios, but understanding 'why those ratios' so no side-length problem stops you",
    overview:
      "The most common mistake in the right-triangle unit is memorising the Pythagorean theorem as a formula and the special-triangle ratios by rote. But real exam questions always test 'the ability to recognize which triangle it is first.' The fact that c in a² + b² = c² must be the hypotenuse, and the flow of using the converse to judge whether a triangle is right, acute, or obtuse, come first. The 45-45-90 triangle comes from the diagonal of a square; the 30-60-90 triangle comes from cutting an equilateral triangle in half — understand these derivations and you can reconstruct the ratios even if you forget them. Students who understand the logic behind the formulas do not waver in real exams.",
    objectives: [
      "Explain the Pythagorean theorem a² + b² = c² using square-area logic and compute the unknown side of a right triangle",
      "Use the converse of the Pythagorean theorem to judge whether a triangle with three given side lengths is right, acute, or obtuse",
      "Derive the side ratio of a 45-45-90 triangle (1 : 1 : √2) from square-diagonal logic and find the other two sides from one given side",
      "Derive the side ratio of a 30-60-90 triangle (1 : √3 : 2) from equilateral-triangle splitting and find the other two sides from one given side",
      "Apply the Pythagorean theorem and special right-triangle ratios to composite-figure problems to compute areas and diagonal lengths",
    ],
    formulas: [
      "Pythagorean Theorem: a² + b² = c² (c = hypotenuse)",
      "Converse: a² + b² = c² → right / a² + b² > c² → acute / a² + b² < c² → obtuse",
      "45-45-90 triangle side ratio: leg : leg : hypotenuse = 1 : 1 : √2 (if a leg is x, hypotenuse = x√2)",
      "30-60-90 triangle side ratio: short leg : long leg : hypotenuse = 1 : √3 : 2 (if short leg is x, hypotenuse = 2x, long leg = x√3)",
    ],
    sections: [
      {
        title: "The Pythagorean Theorem and Its Converse — Through to Triangle Classification",
        subtitle: "Switch the equality/inequality in a² + b² = c² and right, acute, or obtuse is determined",
        terms: [
          {
            term: "Pythagorean Theorem",
            def: "In a right triangle, the sum of the squares of the two legs equals the square of the hypotenuse: a² + b² = c². Key condition: c must be the hypotenuse, the side opposite the right angle. Substituting any other side for c gives a completely wrong answer. Always confirm that the side opposite the vertex marked with the right-angle symbol (□) is c.",
          },
          {
            term: "Converse of the Pythagorean Theorem",
            def: "For a triangle with side lengths a ≤ b ≤ c: if c² = a² + b² it is right; if c² < a² + b² it is acute; if c² > a² + b² it is obtuse. The entire classification algorithm is to set the longest side c as the hypotenuse candidate and compare c² with a² + b².",
          },
          {
            term: "Pythagorean Triple",
            def: "Three positive integers satisfying a² + b² = c². Common primitive triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Multiples also work: 6-8-10 (2× of 3-4-5), 9-12-15 (3×), etc. Recognizing a triple lets you find integer answers without radical computation, saving significant time on exams.",
          },
          {
            term: "Hypotenuse & Legs",
            def: "In a right triangle, the side opposite the right angle is the hypotenuse, and the two sides forming the right angle are the legs. The hypotenuse is always the longest side. In a² + b² = c², a and b are legs and c is the hypotenuse. Confirming in the diagram that the side opposite the vertex marked with the right-angle symbol (□) is the hypotenuse is the first step in avoiding mistakes.",
          },
        ],
        traps: [
          "The most common error using the Pythagorean theorem is substituting a side that is not the hypotenuse for c. Especially when the 'longest side' is unknown, students may arbitrarily substitute a known side for c. Always confirm the principle 'side opposite the right angle = c' first. Depending on whether the unknown is the hypotenuse or a leg, transform to c² = a² + b² (hypotenuse unknown) or a² = c² − b² (leg unknown) before substituting.",
          "In the converse classification, mis-choosing the longest side as c is an error. For sides 5, 7, 9, c = 9 — 9² = 81, and 5² + 7² = 25 + 49 = 74. Since 81 > 74, c² > a² + b² → obtuse. Choosing a side that is not the longest as c reverses the inequality direction and swaps acute/obtuse. Always list the three sides in ascending order and place the largest value as c.",
        ],
        example:
          "Classify each triangle by its three side lengths.\n\n**(1) Sides: 9, 12, 15**\nc = 15, c² = 225, a² + b² = 81 + 144 = 225\nc² = a² + b² → right triangle (9-12-15 is the 3× multiple of the 3-4-5 triple)\n\n**(2) Sides: 5, 6, 8**\nc = 8, c² = 64, a² + b² = 25 + 36 = 61\n64 > 61 → c² > a² + b² → obtuse triangle\n\n**(3) Sides: 4, 5, 6**\nc = 6, c² = 36, a² + b² = 16 + 25 = 41\n36 < 41 → c² < a² + b² → acute triangle\n\nIn all three cases, keep the order 'longest side as c → compare c² with a² + b² → judge by equality/inequality.' Internalize this three-step algorithm and classification problems take under 30 seconds.",
      },
      {
        title: "Special Right Triangles — Deriving and Using 45-45-90 and 30-60-90",
        subtitle: "Don't memorise the ratios — memorise how to pull them from a square and an equilateral triangle; know the derivation and you never forget",
        terms: [
          {
            term: "45-45-90 Triangle",
            def: "A right triangle with both acute angles equal to 45°. Derivation: drawing the diagonal of a square with side x creates two 45-45-90 triangles. Diagonal length = x√2 (Pythagorean: x² + x² = 2x², √(2x²) = x√2). Side ratio: leg : leg : hypotenuse = x : x : x√2. Given the hypotenuse, leg = hypotenuse ÷ √2 = (hypotenuse × √2) ÷ 2 after rationalizing.",
          },
          {
            term: "30-60-90 Triangle",
            def: "A right triangle with acute angles of 30° and 60°. Derivation: dropping a perpendicular from a vertex of an equilateral triangle with side 2x creates two 30-60-90 triangles. Hypotenuse = 2x (a side of the equilateral triangle), short leg = x (half the base), long leg = x√3 (Pythagorean: (2x)² − x² = 3x², √(3x²) = x√3). Side ratio: short leg : long leg : hypotenuse = 1 : √3 : 2.",
          },
          {
            term: "Rationalizing the Denominator",
            def: "Finding a side in a 45-45-90 or 30-60-90 triangle can leave √2 or √3 in the denominator. Mathematical convention forbids leaving a radical in the denominator, so multiply numerator and denominator by the same radical. Example: in a 45-45-90 triangle with hypotenuse 8, leg = 8/√2 = 8√2/2 = 4√2. On the Honors Geometry exam 4√2 and 8/√2 are equal, but the rationalized form is the accepted answer.",
          },
        ],
        traps: [
          "In a 30-60-90 triangle, students often swap the 'short leg' and 'long leg.' The side opposite 30° is the short leg (= half the hypotenuse); the side opposite 60° is the long leg (= short leg × √3). Always confirm which angle the given side is opposite. The safest method: set the hypotenuse as 2x, express short leg = x and long leg = x√3, then solve for x with the given value to avoid errors.",
          "In a 45-45-90 triangle, finding the hypotenuse from a leg is '× √2,' but finding a leg from the hypotenuse is '÷ √2 (= × √2/2).' Confusing the two and applying × √2 to a given hypotenuse produces the nonsensical result of a leg longer than the hypotenuse. Always sanity-check the final answer with 'the hypotenuse is the longest' — if a leg exceeds the hypotenuse, your direction is wrong.",
        ],
        example:
          "A square has a diagonal of 10√2 cm. Find the square's side length and area.\n\nThe square's diagonal is the hypotenuse of a 45-45-90 triangle.\nHypotenuse = side × √2, so:\nside × √2 = 10√2\nside = 10 cm\n\nArea = 10² = 100 cm²\n\nOr verify directly: both legs are 10, so hypotenuse = √(10² + 10²) = √200 = 10√2 ✓\n\nAlways performing this second verification (working backward with the Pythagorean theorem) catches errors in applying special-triangle ratios. If time permits on the exam, write down this one-line check.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u4-l2",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 4,
    lessonNum: 2,
    unitName: "Right Triangles, Trig, Transformations & Solids",
    title: "Right-Triangle Trigonometry — Sine, Cosine, Tangent and Real-World Angles of Elevation and Depression",
    subtitle: "sin/cos/tan are 'ratios,' not standalone angles — fix which angle is the reference and which sides form the ratio, and every trig problem is solved",
    overview:
      "The greatest enemy in the trigonometric-ratios unit is memorising SOH-CAH-TOA but, faced with a problem, not knowing which angle to use as the reference. sin, cos, and tan are always ratios relative to a 'reference angle' — change the reference angle and 'opposite' and 'adjacent' change. Before solving, the whole task is two steps: ① mark the reference angle and ② clearly label the opposite, adjacent, and hypotenuse from that angle. Angle-of-elevation and angle-of-depression problems turn into right triangles with a single auxiliary line. Master finding angles with inverse trig and the trigonometry section is complete.",
    objectives: [
      "State sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent with the SOH-CAH-TOA mnemonic and compute the three ratios for a given angle in a right triangle",
      "Solve for an unknown side as an equation when one trig ratio and one side length are given in a right triangle",
      "Use inverse trig (arcsin/arccos/arctan) to find an unknown angle of a right triangle from two given side lengths using a calculator",
      "State the definitions of angle of elevation and angle of depression and set up a right triangle to find an unknown distance or height in a real-world problem",
      "Use relationships between trig ratios (sin²θ + cos²θ = 1, tan θ = sin θ / cos θ) to derive one ratio from another",
    ],
    formulas: [
      "SOH: sin θ = Opposite / Hypotenuse",
      "CAH: cos θ = Adjacent / Hypotenuse",
      "TOA: tan θ = Opposite / Adjacent",
      "Inverse trig: θ = sin⁻¹(O/H) = cos⁻¹(A/H) = tan⁻¹(O/A)",
      "Pythagorean Identity: sin²θ + cos²θ = 1",
    ],
    sections: [
      {
        title: "SOH-CAH-TOA — Accurate Setup of Reference-Angle-Based Trig Ratios",
        subtitle: "The instant you mark the reference angle and label the three sides O, A, H, any trig problem becomes an equation",
        terms: [
          {
            term: "Sine (sin θ)",
            def: "For reference angle θ, sine is the ratio of the opposite side (O) to the hypotenuse (H): sin θ = O/H. Remember 'SOH.' The key is that which side is O changes when the reference angle changes. sin 30° = ½, sin 45° = √2/2, sin 60° = √3/2 — these three standard values may be used without proof.",
          },
          {
            term: "Cosine (cos θ)",
            def: "For reference angle θ, cosine is the ratio of the adjacent side (A) to the hypotenuse (H): cos θ = A/H. Remember 'CAH.' For the two acute angles α and β = 90° − α of one triangle, sin α = cos β and cos α = sin β (the co-function identity). The 'co' in 'cosine' means 'complement.'",
          },
          {
            term: "Tangent (tan θ)",
            def: "For reference angle θ, tangent is the ratio of the opposite side (O) to the adjacent side (A): tan θ = O/A. Remember 'TOA.' It can also be written tan θ = sin θ / cos θ. Since tangent does not involve the hypotenuse, it is the most frequently used ratio when only height and horizontal distance are known (elevation/depression problems).",
          },
          {
            term: "Inverse Trigonometric Ratios",
            def: "The operation of finding an angle given the value of a trig ratio. sin⁻¹(x) = arcsin(x), cos⁻¹(x) = arccos(x), tan⁻¹(x) = arctan(x). Example: if sin θ = 0.6 then θ = sin⁻¹(0.6) ≈ 36.87°. On a calculator, press '2nd' or 'INV' then sin/cos/tan. The result is always an acute angle in 0° ≤ θ ≤ 90° (in the right-triangle context).",
          },
        ],
        traps: [
          "When the reference angle changes, O (opposite) and A (adjacent) change. In triangle ABC, the O for reference angle ∠A is side BC, while for ∠B it is side AC. The most common error is changing the reference angle but keeping the old O and A labels. Before solving, circle the reference angle and pencil in 'O' on the side it faces, 'A' on the adjacent side, and 'H' on the hypotenuse.",
          "Some students misread sin⁻¹, cos⁻¹, tan⁻¹ as reciprocals. sin⁻¹(x) ≠ 1/sin(x). sin⁻¹ is the inverse function, while 1/sin(x) is the cosecant (csc). In Honors Geometry you may learn both inverse trig (arcsin etc.) and trig reciprocals (csc, sec, cot), so distinguish notation by context. On a calculator the 'sin⁻¹' button is the inverse function; entering a sin value then '1/x' is the reciprocal.",
        ],
        example:
          "In a right triangle, ∠A = 90°, ∠B = θ, BC (hypotenuse) = 13, AC (opposite ∠B) = 5.\n\n**① Find AB (adjacent to ∠B) by Pythagoras**:\nAB = √(13² − 5²) = √(169 − 25) = √144 = 12\n\n**② The three trig ratios for ∠B**:\nsin θ = O/H = 5/13\ncos θ = A/H = 12/13\ntan θ = O/A = 5/12\n\n**③ The measure of ∠B (inverse trig)**:\nθ = sin⁻¹(5/13) ≈ 22.6°\n\nCheck: sin²θ + cos²θ = (5/13)² + (12/13)² = 25/169 + 144/169 = 169/169 = 1 ✓\n\nVerifying with the Pythagorean identity lets you self-catch trig calculation errors.",
      },
      {
        title: "Angles of Elevation and Depression — Converting Real-World Problems into Right Triangles",
        subtitle: "Looking up from the horizontal is elevation, looking down is depression — one auxiliary line completes the right triangle",
        terms: [
          {
            term: "Angle of Elevation",
            def: "The angle measured upward from the horizontal to the line of sight. It forms when an observer at eye level looks up at a target (a building top, an airplane, etc.) relative to the horizontal. The angle between the horizontal and the line of sight is the angle of elevation (θ), which becomes the reference angle in the right triangle. Since the vertical distance (height) and horizontal distance form the two legs, tan θ = height / horizontal distance is most often used.",
          },
          {
            term: "Angle of Depression",
            def: "The angle measured downward from the horizontal to the line of sight. It forms when looking down from a high point at a lower target (a ship, the base of a building, etc.). The angle of depression and the angle of elevation are equal as alternate interior angles — the observer's angle of depression equals the angle of elevation looking up from the target. Using this relationship, depression problems are solved the same way as elevation problems.",
          },
          {
            term: "Perpendicular Auxiliary Line",
            def: "An imaginary vertical line added to create a right triangle in an elevation/depression problem. Drawing the vertical line completes a right triangle whose three sides are the horizontal distance (base), vertical distance (height), and line of sight (hypotenuse). This auxiliary line does not physically exist but is an essential logical tool for the solution.",
          },
        ],
        traps: [
          "In an elevation problem where the observer's eye is h meters above the ground, the vertical distance is 'target height − observer's eye height.' Omitting the eye height wrongly uses the target's full height as the vertical distance and gives a wrong answer. Read carefully to distinguish 'observing from ground level' and 'observing from eye level.'",
          "In a depression problem, not knowing 'angle of depression = alternate interior angle' leads to setting up the triangle wrong. The horizontal line acts as one of two parallel lines and the line of sight as the transversal. Apply the property that alternate interior angles are equal on parallel lines to transfer the angle of depression to the reference angle of the right triangle, and mark this explicitly in the diagram.",
        ],
        example:
          "An observer 20 m from a building looks up at the top, with an angle of elevation of 35°. Find the building's height (rounded to the first decimal place).\n\nRight-triangle setup:\n- Reference angle θ = 35°\n- Adjacent (horizontal distance) = 20 m (A)\n- Opposite (building height) = h m (O)\n\ntan 35° = O/A = h/20\nh = 20 × tan 35°\nh ≈ 20 × 0.7002\nh ≈ 14.0 m\n\nCheck: hypotenuse (line of sight) = 20 / cos 35° ≈ 20 / 0.8192 ≈ 24.4 m\nsin 35° × 24.4 ≈ 0.5736 × 24.4 ≈ 14.0 m ✓\n\nFor real-world problems, always draw a figure, mark the horizontal, vertical, and line of sight as the three sides, then apply trig — following this three-step routine avoids errors.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u4-l3",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 4,
    lessonNum: 3,
    unitName: "Right Triangles, Trig, Transformations & Solids",
    title: "Transformations, Symmetry, and Solids — The Logic of Rigid Motion and a Complete System of Surface Area and Volume",
    subtitle: "Understand why translation, reflection, and rotation preserve congruence and transformation proofs become easy; every solid formula flows from the single principle 'base × height'",
    overview:
      "Transformations and 3D solids may look like separate topics, but they connect through the shared keyword 'preservation.' The rigid motions — translation, reflection, rotation — preserve distance and angle, producing congruent figures. Dilation preserves angle but scales distance by a ratio, producing similar figures. Solid formulas fall into two categories, surface area and volume, and every volume formula comes from one framework: 'base area (B) × height (h)' or '(1/3) × B × h.' Only the sphere formulas must be memorised separately; the rest derive from the framework. In this lesson we complete the coordinate rules of transformations and the derivation logic of solid formulas at the same time.",
    objectives: [
      "Explain that translation, reflection, and rotation are rigid motions and apply each transformation's coordinate rule to compute the image's coordinates",
      "Define line symmetry and point symmetry and determine a figure's symmetry and its axis or center of symmetry",
      "Derive and compute the surface area and volume formulas of prisms and cylinders using 'lateral net and base' logic",
      "State and compute the surface area and volume formulas of pyramids and cones, including their 1/3 ratio relationship to prisms",
      "Apply the surface area and volume formulas of a sphere and compute the volume of a composite solid by decomposition",
    ],
    formulas: [
      "Translation: (x, y) → (x + a, y + b)",
      "Reflection over x-axis: (x, y) → (x, −y)",
      "Reflection over y-axis: (x, y) → (−x, y)",
      "Rotation 180° about origin: (x, y) → (−x, −y)",
      "Rotation 90° CCW about origin: (x, y) → (−y, x)",
      "Prism/Cylinder Volume: V = B × h (B = base area)",
      "Pyramid/Cone Volume: V = (1/3) × B × h",
      "Sphere Surface Area: SA = 4πr²",
      "Sphere Volume: V = (4/3)πr³",
    ],
    sections: [
      {
        title: "Rigid Motion and Symmetry — Coordinate Rules of Translation, Reflection, and Rotation",
        subtitle: "The essence of rigid motion is 'a transformation that preserves distance and angle' — one coordinate rule instantly locates the image",
        terms: [
          {
            term: "Rigid Motion / Isometry",
            def: "A transformation that does not change a figure's size or shape. Translation, reflection, and rotation are rigid motions. After a rigid motion, the pre-image and image are congruent. By contrast, dilation changes size and is not a rigid motion — dilation preserves angle but scales distance by a ratio.",
          },
          {
            term: "Translation",
            def: "A transformation that moves every point of a figure the same distance in the same direction. Expressed by a vector ⟨a, b⟩, with coordinate rule (x, y) → (x + a, y + b). Move a in the x-direction and b in the y-direction. a > 0 is right, a < 0 left, b > 0 up, b < 0 down.",
          },
          {
            term: "Reflection",
            def: "A transformation that flips a figure across a line of reflection. Each point and its image are equidistant from the line of reflection, which is the perpendicular bisector of the two points. Key rules: reflection over the x-axis (x, y)→(x, −y), over the y-axis (x, y)→(−x, y), over y = x (x, y)→(y, x), over y = −x (x, y)→(−y, −x).",
          },
          {
            term: "Rotation",
            def: "A transformation that turns a figure about a fixed center of rotation by a specific angle. Key rules for rotation about the origin: 90° CCW: (x, y)→(−y, x); 180°: (x, y)→(−x, −y); 270° CCW (= 90° CW): (x, y)→(y, −x). The direction of rotation (clockwise/counterclockwise) must be stated.",
          },
        ],
        traps: [
          "Reflection and rotation coordinate rules are often confused. In particular, reflection over y = x (x,y)→(y,x) and 90° CCW rotation (x,y)→(−y,x) both swap x and y and look similar, but the signs differ. When memorising, always substitute a specific point such as (1, 0) or (0, 1) and draw the result in a diagram to verify. Checking 'where must point (1, 0) go' visually prevents confusion.",
          "In a composite transformation, order matters. 'Reflect over the x-axis then the y-axis' may give the same result as 'reflect over the y-axis then the x-axis,' but in general changing the order of transformations changes the result. When two or more transformations appear, confirm the rule for application ('right to left' or 'in numbered order') and always write down the intermediate coordinates.",
        ],
        example:
          "Apply the following composite transformation to point A(3, −1) in order and find the final image's coordinates.\nTransformation 1: reflection over the y-axis\nTransformation 2: 90° CCW rotation about the origin\n\n**Transformation 1 — reflection over y-axis (x, y) → (−x, y)**:\nA(3, −1) → A'(−3, −1)\n\n**Transformation 2 — 90° CCW (x, y) → (−y, x)**:\nA'(−3, −1) → A''(−(−1), −3) = A''(1, −3)\n\nFinal image: A''(1, −3)\n\nVerification: distance from origin to A(3, −1) = √(9+1) = √10.\nDistance from origin to A''(1, −3) = √(1+9) = √10. ✓\nSince this is a rigid motion, distance from the origin is preserved.",
      },
      {
        title: "Surface Area and Volume of Solids — A Complete Formula System for Prisms, Cones, and Spheres",
        subtitle: "Every volume formula comes from one framework, 'B × h' or '(1/3) B × h' — memorise the sphere separately and you are done",
        terms: [
          {
            term: "Prism & Cylinder",
            def: "Prism: a solid with two congruent parallel polygonal bases connected by rectangular lateral faces. Cylinder: two congruent parallel circular bases connected by a curved lateral surface. Volume: V = B × h (B = base area, h = height). Surface area (SA) = 2B + lateral area. For a cylinder, unrolling the lateral surface gives a rectangle of width 2πr and height h: SA = 2πr² + 2πrh.",
          },
          {
            term: "Pyramid & Cone",
            def: "Pyramid: a solid connecting a polygonal base to a single apex via triangular faces. Cone: a circular base connected to an apex by a curved surface. Volume: V = (1/3) × B × h — one third of a prism with the same base and height. Cone surface area: SA = πr² + πrl (l = slant height = √(r² + h²)). Distinguishing slant height from height is essential.",
          },
          {
            term: "Sphere",
            def: "A perfectly symmetric solid in which the distance from the center to every point on the surface (radius r) is constant. Surface area: SA = 4πr² (four times a circle's area πr²). Volume: V = (4/3)πr³. Doubling the radius makes surface area 4× (proportional to r²) and volume 8× (proportional to r³) — understanding this scaling relationship speeds up comparison problems.",
          },
          {
            term: "Slant Height",
            def: "The shortest distance from the apex of a cone or pyramid to the edge (rim) of the base. For a cone, l = √(r² + h²) (Pythagorean theorem: r is the base radius, h the vertical height). The slant height (l) differs from the vertical height (h) — use the slant height in the surface-area formula and the vertical height in the volume formula.",
          },
        ],
        traps: [
          "Confusing cone/pyramid volume with prism/cylinder volume is the most common error. Students memorise 'a cone's volume is 1/3 of a prism with the same base and height' but then drop the (1/3) or multiply the prism by (1/3). The rule is simple: prism/cylinder V = Bh, pyramid/cone V = (1/3)Bh. Remember to attach 1/3 whenever there is a pointed apex.",
          "Confusing slant height (l) and vertical height (h) in the cone surface-area formula gives a completely wrong answer. In SA = πr² + πrl, l is the slant height, not the vertical height h. If only the radius and vertical height are given, first find l = √(r² + h²), then substitute into the surface-area formula. The volume V = (1/3)πr²h uses the vertical height h, so clearly distinguish: l for surface area, h for volume.",
        ],
        example:
          "Find the surface area and volume of a cone with radius 6 cm and vertical height 8 cm.\n\n**① Slant height**:\nl = √(r² + h²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm\n\n**② Surface area**:\nSA = πr² + πrl = π(6²) + π(6)(10) = 36π + 60π = 96π cm²\n\n**③ Volume**:\nV = (1/3)πr²h = (1/3)π(36)(8) = (1/3)(288π) = 96π cm³\n\nThe surface area and volume happen to both come out to 96π, but this is a coincidence holding only for this particular set of numbers (the units differ, cm² vs cm³). l = 10 was found as an integer without radical computation by recognizing the 6-8-10 Pythagorean triple — knowing triples speeds up slant-height calculations too.",
      },
    ],
  },
];
