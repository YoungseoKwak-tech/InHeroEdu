/**
 * Core Notes English version — Honors Geometry Unit 3 (Quadrilaterals, Polygons, Circles & Area).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content translated to natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_GEOMETRY_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-geometry-u3-l1",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 3,
    lessonNum: 1,
    unitName: "Quadrilaterals, Polygons, Circles & Area",
    title: "Quadrilaterals and Polygons — Interior/Exterior Angle Sums and Properties of Special Quadrilaterals",
    subtitle: "Understand 'why' parallelograms, rectangles, rhombi, squares, and trapezoids have their properties in provable language, and no application problem can break you",
    overview:
      "The most common mistake on polygon problems is memorising a formula but not knowing when to use it. A student may know 'the interior angle sum is (n−2)×180°' yet freeze when asked for one interior angle of a regular pentagon — because they memorised the formula without understanding its meaning. Every polygon formula flows from a single fact: one triangle's angle sum is 180°, and an n-gon can be split into (n−2) triangles. A quadrilateral is simply the special case n = 4. The properties of the five special quadrilaterals — parallelogram, rectangle, rhombus, square, trapezoid — become perfectly systematic when organized into 'three categories: angles, sides, diagonals.' In this lesson we master everything from the derivation of the formulas to the use of special-quadrilateral properties in proofs.",
    objectives: [
      "Derive the interior angle sum formula (n−2)×180° from the triangle-splitting logic and compute the angle sum or a single interior angle",
      "Explain that the exterior angle sum is always 360° and find one exterior angle of a regular polygon",
      "State, with proof, the four properties of a parallelogram concerning opposite sides, opposite angles, and diagonals",
      "Understand that rectangles, rhombi, and squares are special cases of the parallelogram and apply each figure's additional property to find unknowns",
      "Use the properties of an isosceles trapezoid to analyze angle and diagonal relationships",
    ],
    formulas: [
      "Interior angle sum: S = (n−2) × 180°",
      "Each interior angle of a regular n-gon: [(n−2) × 180°] ÷ n",
      "Exterior angle sum: always 360° (convex polygon)",
      "Each exterior angle of a regular n-gon: 360° ÷ n",
      "Area of a parallelogram: A = b × h (base × height, where height is the perpendicular distance)",
    ],
    sections: [
      {
        title: "Polygon Interior/Exterior Angle Formulas — Everything Flows from Triangle-Splitting",
        subtitle: "Split an n-gon into (n−2) triangles and the interior angle sum is determined instantly",
        terms: [
          {
            term: "Convex polygon",
            def: "A polygon in which every interior angle is less than 180°. A segment joining any two vertices always lies inside the polygon. The interior angle sum formula (n−2)×180° is valid for convex polygons; care is needed before applying it directly to concave polygons.",
          },
          {
            term: "Interior Angle Sum Formula",
            def: "The interior angle sum of an n-gon = (n−2) × 180°. Derivation: drawing all diagonals from one vertex splits the n-gon into (n−2) triangles, and since each triangle's angle sum is 180°, the total is (n−2)×180°. Example: a pentagon (n=5) has interior angle sum 3×180° = 540°.",
          },
          {
            term: "Exterior Angle Sum",
            def: "The sum of all exterior angles of a convex polygon is always 360°, regardless of the number of sides n. Derivation: at each vertex (interior + exterior) = 180°, so the n pairs sum to n×180°; subtracting the interior angle sum (n−2)×180° leaves exterior angle sum = 2×180° = 360°.",
          },
          {
            term: "Regular polygon",
            def: "A polygon that is both equilateral (all sides equal) and equiangular (all interior angles equal). One interior angle of a regular n-gon = [(n−2)×180°]÷n, and one exterior angle = 360°÷n. One interior angle and one exterior angle always sum to 180° (a linear pair).",
          },
        ],
        traps: [
          "When finding one interior angle of a regular polygon, students sometimes substitute the number of diagonals or triangles for n instead of the number of vertices. n is always the number of vertices (= sides). Also, since 'one interior angle = interior angle sum ÷ n,' compute (n−2)×180° first, then divide by n — skipping these two steps and substituting directly causes arithmetic errors. Build the habit of writing the calculation in two clear lines.",
          "An exterior angle is the 'supplement of the interior angle,' not an angle on the same side as the adjacent interior angle. It is the angle formed outside when one side is extended at a vertex. Choose one exterior angle per vertex; extending in both directions creates two exterior angles at a vertex, but those two are congruent vertical angles. When computing the 360° exterior angle sum, choose only one exterior angle per vertex.",
        ],
        example:
          "For a regular octagon (n=8), find one interior angle and one exterior angle, and verify their sum.\n\n**Interior angle sum**: (8−2)×180° = 6×180° = 1080°\n**One interior angle**: 1080° ÷ 8 = 135°\n**One exterior angle**: 360° ÷ 8 = 45°\n**Check**: 135° + 45° = 180° ✓ (linear pair)\n\nThese two formulas are not independent; they are linked by 'one interior + one exterior = 180°.' Since finding either gives the other by subtracting from 180°, on exams it is often faster to compute the simpler exterior angle (360÷n) first.",
      },
      {
        title: "Special Quadrilaterals — The Property System from Parallelogram to Square",
        subtitle: "Organize by the three categories of opposite sides, opposite angles, and diagonals, and the properties of all five quadrilaterals become clear at a glance",
        terms: [
          {
            term: "Parallelogram",
            def: "A quadrilateral with two pairs of parallel opposite sides. Properties: ① opposite sides congruent: AB = CD, BC = DA; ② opposite angles congruent: ∠A = ∠C, ∠B = ∠D; ③ consecutive angles supplementary: ∠A + ∠B = 180°; ④ diagonals bisect each other. All four are proved from properties of parallel lines and triangle congruence (ASA/SAS).",
          },
          {
            term: "Rectangle",
            def: "A parallelogram with four right angles. It has all parallelogram properties plus: the two diagonals are equal in length (AC = BD). In coordinate geometry, checking whether the diagonals are equal by the distance formula tells you whether a figure is a rectangle.",
          },
          {
            term: "Rhombus",
            def: "A parallelogram with four congruent sides. It has all parallelogram properties plus: ① the diagonals are perpendicular to each other; ② each diagonal bisects the vertex angles it passes through. A rhombus's diagonals are perpendicular but need not be equal in length.",
          },
          {
            term: "Isosceles trapezoid",
            def: "A trapezoid with exactly one pair of parallel sides (AB ∥ CD) whose non-parallel sides (legs) are equal in length. Properties: ① the two base angles on the same base are congruent: ∠A = ∠B, ∠C = ∠D; ② the diagonals are equal in length: AC = BD. These appear often in exam problems finding angles or lengths.",
          },
        ],
        traps: [
          "A square is both a rectangle and a rhombus — it simultaneously has all the properties of both. 'A rhombus is a rectangle' is false, but 'a square is a rhombus' is true. Memorise the inclusion hierarchy (square ⊂ rectangle ⊂ parallelogram, square ⊂ rhombus ⊂ parallelogram) as a hierarchy diagram to quickly solve 'which of the following must be true?' multiple-choice questions.",
          "A parallelogram's diagonals bisect each other but are not guaranteed to be perpendicular or equal in length. Only a rhombus has perpendicular diagonals; only a rectangle has equal-length diagonals. Using these properties when the diagram has no perpendicular mark or equal-length mark on the diagonals loses marks. First identify which special quadrilateral the figure is, then apply the matching property.",
        ],
        example:
          "In parallelogram ABCD, ∠A = 3x + 15 and ∠B = x + 45. Find x and all four angle measures.\n\nIn a parallelogram, consecutive (adjacent) angles are supplementary, so ∠A + ∠B = 180°.\n(3x + 15) + (x + 45) = 180\n4x + 60 = 180\n4x = 120\nx = 30\n\n∠A = 3(30) + 15 = 105°, ∠B = 30 + 45 = 75°\nCheck: 105 + 75 = 180° ✓\n∠C = ∠A = 105°, ∠D = ∠B = 75° (opposite angles congruent)\n\nWhether to use 'consecutive angles → supplementary' or 'opposite angles → congruent' is decided by whether the two given angles are adjacent or opposite.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u3-l2",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 3,
    lessonNum: 2,
    unitName: "Quadrilaterals, Polygons, Circles & Area",
    title: "Circles — Complete Command of Central Angles, Inscribed Angles, Arcs, Chords, and Tangents",
    subtitle: "On a circle, angle problems are solved automatically once you identify 'where the vertex is'",
    overview:
      "The circle section looks like the unit with the most formulas in Honors Geometry. The angle formula changes depending on where the vertex sits — at the center (central angle), on the circle (inscribed angle), outside the circle (exterior angle), or inside the circle (interior angle). But the core principle is just one: the Inscribed Angle Theorem, 'an inscribed angle is half the central angle on the same arc.' Everything else is derived from there. The angle and segment-length formulas for chords, tangents, and secants live within the same logical system. In this lesson, rather than memorising formulas, you internalize the decision flow 'vertex position → formula.'",
    objectives: [
      "State the central-angle/inscribed-angle relationship (inscribed = ½ central) as a theorem and, linking it to arc measure, compute unknown angles",
      "Use the fact that opposite angles of an inscribed quadrilateral sum to 180° to find angles",
      "Apply the angle formulas for two chords or secants/tangents meeting inside or outside a circle",
      "Use the chord-length and tangent-secant segment-length (power of a point) formulas to compute unknown segment lengths",
      "Use the tangent property (perpendicular to the radius at the point of tangency) as a reason in a proof",
    ],
    formulas: [
      "Inscribed Angle Theorem: ∠inscribed = ½ × (intercepted arc)",
      "Interior angle (intersection of two chords): angle = ½ × (arc₁ + arc₂)",
      "Exterior angle (vertex outside the circle): angle = ½ × |arc(far) − arc(near)|",
      "Intersecting chords segment product: AE × EC = BE × ED",
      "Secant-tangent power: tangent² = external × whole secant",
    ],
    sections: [
      {
        title: "Central Angles, Inscribed Angles, and Arcs — The Inscribed Angle Theorem and Inscribed Quadrilaterals",
        subtitle: "'If the vertex is on the circle, it is half the central angle' — this one line solves 90% of inscribed-angle problems",
        terms: [
          {
            term: "Central angle",
            def: "An angle whose vertex is at the center of the circle. The measure of a central angle equals the measure of its intercepted arc. Example: an 80° central angle corresponds to an 80° arc. The 1:1 correspondence between central angle and arc is the starting point for every circle-angle formula that follows.",
          },
          {
            term: "Inscribed angle",
            def: "An angle whose vertex is on the circle and whose two sides are both chords. Its measure is half the central angle of its intercepted arc (the Inscribed Angle Theorem). Inscribed angles intercepting the same arc are all congruent, and an inscribed angle on a diameter is exactly 90° (Thales' Theorem).",
          },
          {
            term: "Inscribed quadrilateral",
            def: "A quadrilateral whose four vertices all lie on the same circle. Key property: opposite angles sum to 180° (supplementary), i.e. ∠A + ∠C = 180°, ∠B + ∠D = 180°. This follows directly from the Inscribed Angle Theorem — the two arcs intercepted by opposite angles sum to 360°, so the two inscribed angles sum to ½×360° = 180°.",
          },
          {
            term: "Arc measure",
            def: "The angle (°) that an arc between two points on a circle subtends at the center. A semicircle arc is 180°, the whole circle is 360°. A major arc and a minor arc sum to 360°. Distinguish arc measure from arc length — measure is an angle (°), while length is an actual distance with units.",
          },
        ],
        traps: [
          "Confusing an inscribed angle with a central angle as if they were equal is very common. An inscribed angle is half the central angle. For example, when arc AB = 100°, the central angle ∠AOB = 100° but the inscribed angle intercepting arc AB is 50°. First check 'where is the vertex' — at the center → central angle (= arc); on the circle → inscribed angle (= ½ × arc).",
          "The opposite angles of an inscribed quadrilateral sum to 180°, but this does not hold for every quadrilateral. It applies only when all four vertices lie on the circle. The condition that the quadrilateral is inscribed must be stated or confirmed in the diagram before you cite this property. Conversely, using this property to judge whether a quadrilateral can be inscribed is also a frequent reverse problem.",
        ],
        example:
          "In circle O, arc AB = 140°, arc BC = 100°, arc CA = 120° (points A, B, C on the circle). Find inscribed angles ∠BAC, ∠ABC, ∠BCA.\n\n∠BAC intercepts arc BC (= 100°): ∠BAC = ½ × 100° = 50°\n∠ABC intercepts arc CA (= 120°): ∠ABC = ½ × 120° = 60°\n∠BCA intercepts arc AB (= 140°): ∠BCA = ½ × 140° = 70°\n\nCheck: 50° + 60° + 70° = 180° ✓ (triangle angle sum)\n\nThe arc an inscribed angle intercepts is the arc on the opposite side, not the side where the vertex sits. Mixing up this direction leads you to compute an entirely different arc, so always identify the two points where the angle's sides meet the circle and pick the opposite arc between them.",
      },
      {
        title: "Interior/Exterior Circle Angles and Segment-Length Formulas — Chords, Tangents, Secants",
        subtitle: "Split vertex position into inside/outside/on the circle and three formulas are automatically determined",
        terms: [
          {
            term: "Angle formed inside a circle (intersection of two chords)",
            def: "The angle formed when two chords intersect inside a circle. Angle measure = ½ × (sum of the two intercepted arcs). Example: if chords AC and BD meet at E, then ∠AEB = ½(arc AB + arc CD). Of the four angles at the intersection, opposite angles are congruent vertical angles.",
          },
          {
            term: "Angle formed outside a circle (two secants / tangent-secant / two tangents)",
            def: "The angle formed when the vertex is outside the circle. Angle measure = ½ × (far arc − near arc). The same formula applies to all three cases (two secants, tangent-secant, two tangents). The 'far arc' is the larger arc cut off farther from the vertex; the 'near arc' is the smaller arc closer to the vertex.",
          },
          {
            term: "Intersecting Chords Segment Product",
            def: "When chords AC and BD meet at point E inside a circle, AE × EC = BE × ED. Of the four segments, the product of the two parts of one chord equals the product of the two parts of the other. This relation is proved through the AA similarity of two triangles.",
          },
          {
            term: "Secant-Tangent / Secant-Secant Power of a Point",
            def: "From a point P outside the circle with a tangent and a secant: (tangent length)² = (external segment) × (whole secant length). With two secants: (external₁) × (whole₁) = (external₂) × (whole₂). By the Power of a Point principle, the product is always constant for a given point's position relative to the circle.",
          },
        ],
        traps: [
          "In the exterior-angle formula, always keep the order 'far arc − near arc.' Subtracting the far arc from the near arc gives a negative number. Memorise 'outside the circle: subtract the smaller arc from the larger and ÷2.' Also, in the tangent-secant formula the 'whole secant length' is the entire distance from the external point to the far intersection with the circle, including the external segment — beware of using only the interior chord length.",
          "Do not confuse the intersecting-chords product (AE × EC = BE × ED) with the two-secant exterior formula ((external₁)×(whole₁) = (external₂)×(whole₂)). The formula depends on whether the intersection is inside or outside the circle. Before solving, identify the location of the intersection: inside the circle → simple product of chord parts; outside → external × whole form.",
        ],
        example:
          "From a point P outside a circle, two secants are drawn. The distances to the near intersections are 4 and 6, and the whole length of one secant is 12. Find the whole length of the other secant.\n\nTwo-secant formula: (external₁) × (whole₁) = (external₂) × (whole₂)\n4 × 12 = 6 × (whole₂)\n48 = 6 × (whole₂)\nwhole₂ = 8\n\nTherefore the whole length of the second secant is 8.\n\nVerification: the interior chord length of the second secant = 8 − 6 = 2. The first chord length = 12 − 4 = 8. Since we used the external × whole formula (not an interior segment product), this confirms the intersection is outside the circle ✓.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u3-l3",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 3,
    lessonNum: 3,
    unitName: "Quadrilaterals, Polygons, Circles & Area",
    title: "Area, Perimeter, and Coordinate-Geometry Applications — Beyond Formulas to the Strategy of 'Decompose and Compose'",
    subtitle: "The area of a complex figure is always solved by two strategies: split it into known pieces, or subtract from a larger figure",
    overview:
      "The moment students get stuck on area problems is always the same — when they feel 'there's no formula for this figure.' But in truth every area problem in Honors Geometry is solved by two strategies: decompose the figure into known pieces, or subtract a smaller part from a larger figure's area. The area (πr²) and circumference (2πr) of a circle, and the sector area and arc length formulas, unify under one ratio principle — 'a fraction θ/360 of the whole 360° gives that same fraction of the area and the arc.' In coordinate geometry, we complete how to prove a figure's properties using the distance formula, midpoint formula, and slope. Understanding 'why the formula works' rather than memorising it reveals the approach to any application problem.",
    objectives: [
      "State the area formulas for triangles, quadrilaterals, trapezoids, and circles with their derivation logic, and compute composite-figure areas by decomposition and subtraction",
      "Compute the area of a sector and the length of an arc using the central-angle ratio logic",
      "Use the distance, midpoint, and slope formulas in the coordinate plane to analyze segment lengths and figure properties (parallel, perpendicular, bisecting)",
      "Use coordinate geometry to classify quadrilaterals (parallelogram, rectangle, rhombus, square)",
      "Use the Shoelace Formula to compute the area of a polygon given its vertex coordinates",
    ],
    formulas: [
      "Area of a triangle: A = ½ × b × h",
      "Area of a trapezoid: A = ½ × (b₁ + b₂) × h",
      "Circle: A = πr², C = 2πr",
      "Sector area: A = (θ/360°) × πr²",
      "Arc length: L = (θ/360°) × 2πr",
      "Distance formula: d = √[(x₂−x₁)² + (y₂−y₁)²]",
      "Midpoint formula: M = ((x₁+x₂)/2, (y₁+y₂)/2)",
    ],
    sections: [
      {
        title: "Area Formulas and Composite-Figure Strategy — Decomposition and Subtraction",
        subtitle: "No figure is unknown — there is only splitting into known pieces or subtracting from a larger one",
        terms: [
          {
            term: "Height / Altitude",
            def: "In an area formula, the height is always the 'distance perpendicular to the base,' not the length of a slanted side. A triangle's height is the distance from a vertex to the foot of the perpendicular on the opposite side (or its extension); a parallelogram's height is the perpendicular distance between the two parallel sides. If the height is not given directly, find it using the Pythagorean theorem or trigonometric ratios.",
          },
          {
            term: "Sector",
            def: "The 'wedge-shaped' region bounded by two radii and the arc between them. Sector area = (central angle θ/360°) × πr²; arc length = (θ/360°) × 2πr. Ratio logic: multiply the whole area or whole circumference by the central angle's fraction of the full circle (360°) to get the sector or arc value.",
          },
          {
            term: "Composite figure",
            def: "A figure combining two or more basic shapes. Strategy ① decomposition: split the figure into pieces with known formulas (triangles, rectangles, semicircles, etc.) and add their areas. Strategy ② subtraction: subtract the area of a missing part (a hole or empty space) from a larger figure. Which strategy is simpler varies by problem, so practice both.",
          },
          {
            term: "Shoelace Formula",
            def: "A formula for the area of any polygon given its vertex coordinates in the coordinate plane. Listing the vertices in order as (x₁,y₁), (x₂,y₂), …, (xₙ,yₙ): A = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|. Keeping the vertex order consistent (clockwise or counterclockwise) makes the absolute value yield the area.",
          },
        ],
        traps: [
          "Do not confuse arc length with arc measure. Arc measure is a dimensionless value in degrees (°); arc length is an actual distance (cm, m, etc.) computed using both r and θ. If a problem says 'find the arc length,' the radius is essential; if it says 'find the arc measure,' you only need the angle. Failing to distinguish these leads to the wrong value.",
          "In the trapezoid area formula A = ½(b₁+b₂)h, h is the perpendicular distance between the two parallel sides (bases). Substituting a leg (non-parallel side) length as the height is a very common error. For an isosceles trapezoid, find the actual height by the Pythagorean theorem first, then substitute. If an area answer is wrong, checking whether the height was found correctly is the fastest way to review.",
        ],
        example:
          "In a circle of radius 6 cm, find the area and arc length of a sector with a 120° central angle, then find the area of the remaining larger sector using the subtraction strategy.\n\n**Sector area**: A = (120/360) × π(6²) = (1/3) × 36π = 12π cm²\n**Arc length**: L = (120/360) × 2π(6) = (1/3) × 12π = 4π cm\n**Larger sector (240°) area — subtraction strategy**: whole circle area − small sector area\n= 36π − 12π = 24π cm²\n\nOr directly: (240/360) × 36π = (2/3) × 36π = 24π cm² ✓\n\nConfirming both methods give the same answer lets you self-verify against calculation errors.",
      },
      {
        title: "Coordinate Geometry — Proving Figure Properties with Distance, Midpoint, and Slope",
        subtitle: "The coordinate plane is the language that handles figures as 'equations' — three formulas complete quadrilateral classification",
        terms: [
          {
            term: "Distance Formula",
            def: "The distance between two points (x₁,y₁) and (x₂,y₂): d = √[(x₂−x₁)² + (y₂−y₁)²]. It derives directly from the Pythagorean theorem. In coordinate geometry it is used to test side-length equality (congruence) or inequality, right-triangle status, and diagonal-length comparison. When simplifying, factor inside the radical for a simple form.",
          },
          {
            term: "Midpoint Formula",
            def: "The midpoint of two points (x₁,y₁) and (x₂,y₂): M = ((x₁+x₂)/2, (y₁+y₂)/2). Used to check whether diagonals bisect each other (parallelogram test) and to find a segment's midpoint. If the midpoints of the two diagonals coincide, the diagonals bisect each other → parallelogram.",
          },
          {
            term: "Slope",
            def: "The slope of the line through (x₁,y₁) and (x₂,y₂): m = (y₂−y₁)/(x₂−x₁). Two lines are parallel ↔ equal slopes (m₁ = m₂). Two lines are perpendicular ↔ product of slopes is −1 (m₁ × m₂ = −1, except for a vertical and horizontal pair). Essential for quadrilateral classification: confirm parallelism and perpendicularity by slope.",
          },
        ],
        traps: [
          "When classifying a quadrilateral by coordinate geometry, 'proving it is a parallelogram' and 'proving it is a rectangle' need different evidence. Parallelogram: two pairs of opposite sides parallel (equal slopes) or diagonal midpoints coincide. Rectangle: a parallelogram with adjacent sides perpendicular (slope product = −1). Rhombus: a parallelogram with four equal sides (distance formula). Square: a rectangle that is also a rhombus. Omitting one piece of evidence classifies it only as a more general figure, so confirm and state all required conditions.",
          "In the slope formula, beware the case where the denominator x₂−x₁ = 0 (a vertical line). A vertical line's slope is undefined, and a horizontal line's slope is 0. A vertical and a horizontal line are perpendicular, but the 'product of slopes = −1' formula does not apply — for this case state separately that 'one slope is undefined and the other is 0, so they are perpendicular.'",
        ],
        example:
          "Classify quadrilateral ABCD with vertices A(0,0), B(4,0), C(5,3), D(1,3).\n\n**Side slopes**:\nAB: (0−0)/(4−0) = 0 (horizontal)\nDC: (3−3)/(5−1) = 0 (horizontal) → AB ∥ DC ✓\nAD: (3−0)/(1−0) = 3\nBC: (3−0)/(5−4) = 3 → AD ∥ BC ✓\n→ two pairs of opposite sides parallel ∴ parallelogram\n\n**Perpendicularity**: slope of AB = 0, slope of AD = 3. Product = 0 × 3 = 0 ≠ −1 → no right angle → not a rectangle.\n\n**Side lengths**:\nAB = √[(4−0)²+(0−0)²] = 4\nAD = √[(1−0)²+(3−0)²] = √10\nAB ≠ AD → not a rhombus.\n\n∴ ABCD is a general parallelogram.\n\nFollowing this four-step flow (slope → parallel → perpendicular → distance) in order lets you classify any quadrilateral by coordinate geometry.",
      },
    ],
  },
];
