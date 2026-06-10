/**
 * Core Notes English version — IB Math AI (Applications & Interpretation) Unit 3.
 * Faithful translation of the Korean storytelling version.
 * Full IB DP Math AI syllabus content (Topic 3: Geometry & Trigonometry) preserved,
 * with exam-accurate English narrative in the style of a top-tier instructor.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AI_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-math-ai-u3-l1",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 3,
    lessonNum: 1,
    unitName: "Geometry & Trigonometry",
    title: "Volumes & Surface Areas of 3D Solids, Trigonometric Ratios in Right Triangles",
    subtitle:
      "Everyone memorises SOH-CAH-TOA — but if you can't decide which ratio to use and can't identify the right-angled cross-section inside a 3D solid, the IB exam will catch you out",
    overview:
      "IB Math AI Unit 3 opens on two fronts. First: applying volume and surface area formulas for spheres, cylinders, cones, and pyramids in real-world contexts. Second: using the ratios of sides in a right triangle to find unknown angles and lengths — trigonometric ratios. The two topics may look separate, but in a Paper 2 3D application question they always appear together. The classic IB type: 'use trigonometric ratios to find the perpendicular height from the apex of a cone to the centre of its base, then calculate the volume.' Even though the formulas are in the Formula Booklet, the skill that earns marks is training your eye to extract a right-angled triangle from a 3D diagram.",
    objectives: [
      "Apply volume and surface area formulas for spheres, cylinders, cones, and pyramids in context",
      "Use SOH-CAH-TOA in a right triangle to find unknown side lengths and angles",
      "Define angle of elevation and angle of depression and apply them to practical surveying problems",
      "Extract a cross-section from a 3D solid to form a right triangle and find the space diagonal",
      "Apply the Pythagorean theorem twice in a 3D setting to calculate distances inside a solid",
    ],
    formulas: [
      "Sphere volume: V = (4/3)πr³",
      "Sphere surface area: SA = 4πr²",
      "Cylinder volume: V = πr²h",
      "Cylinder surface area: SA = 2πr² + 2πrh",
      "Cone volume: V = (1/3)πr²h",
      "Cone slant height: l = √(r² + h²)",
      "Cone surface area: SA = πr² + πrl",
      "Right triangle: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent",
      "Cuboid space diagonal: d = √(l² + w² + h²)",
    ],
    sections: [
      {
        title: "Applying Volume and Surface Area Formulas for 3D Solids",
        subtitle:
          "The Formula Booklet handles the formula lookup — the IB mark comes from reading the context to decide which r and h to substitute",
        terms: [
          {
            term: "Volume",
            def: "The amount of space occupied by a 3D solid. Units are cubed length units such as cm³ or m³. Before applying any volume formula in an IB question, always check whether the problem gives you the radius or the diameter — diameter values appear frequently.",
          },
          {
            term: "Surface Area",
            def: "The sum of the areas of all faces of a 3D solid. IB context questions phrase this as 'area to be painted', 'area of wrapping material', or 'heat-dissipating surface'. For a cone, decide whether to include the base (πr²) by reading the context carefully.",
          },
          {
            term: "Slant Height (l)",
            def: "The distance from the apex of a cone or pyramid to the edge of the base along the lateral face. For a cone, l = √(r² + h²) via the Pythagorean theorem. Do not confuse l with the perpendicular height h — the surface area formula uses l, not h.",
          },
          {
            term: "Composite Solid",
            def: "A shape formed by combining two or more basic solids, or by removing a portion from one. Examples: a hemisphere placed on top of a cylinder; a frustum created by cutting a smaller cone from a larger one. For volume, add or subtract each part; for surface area, sum only the exposed faces.",
          },
        ],
        traps: [
          "Many students forget the factor of 1/3 in the volume formulas for cones and pyramids. Remember it as: 'a cone holds one-third the volume of the cylinder with the same base and height.' In composite solids where a cone sits on top of a cylinder, calculate each volume separately and add them — a common error is confusing the height of the cone with the total height of the composite figure.",
          "Failing to identify which faces are exposed in a surface area problem will cost you marks. For example, if a cylinder rests on a flat surface, one circular base is in contact with that surface and may need to be excluded from the surface area. Make it a habit to read the IB context carefully before deciding which faces to include.",
        ],
        example:
          "An ice-cream cone is a composite solid: a cone of radius 3 cm and height 12 cm topped by a hemisphere of radius 3 cm. Find the total volume. Cone volume: V₁ = (1/3)π(3²)(12) = (1/3)π(9)(12) = 36π cm³. Hemisphere volume: V₂ = (1/2) × (4/3)π(3³) = (2/3)π(27) = 18π cm³. Total volume: V = 36π + 18π = 54π ≈ 169.6 cm³. Slant height: l = √(3² + 12²) = √(9 + 144) = √153 ≈ 12.37 cm. Lateral surface area of cone: πrl = π(3)(√153) ≈ 116.6 cm². In IB exams, always state final answers rounded to 3 significant figures.",
      },
      {
        title: "Trigonometric Ratios in Right Triangles: Elevation, Depression, and 3D",
        subtitle:
          "Build the habit of choosing instinctively which of the three SOH-CAH-TOA ratios to use, and train your eye to extract the right triangle from a 3D figure",
        terms: [
          {
            term: "Trigonometric Ratios",
            def: "Sine (sin), cosine (cos), and tangent (tan), each defined as a ratio of two sides in a right triangle. SOH: sin θ = opposite/hypotenuse; CAH: cos θ = adjacent/hypotenuse; TOA: tan θ = opposite/adjacent. Used both to find a side when an angle is known, and to find an angle when sides are known (using inverse trig functions).",
          },
          {
            term: "Angle of Elevation",
            def: "The angle between the horizontal and the line of sight when looking up at an object above the horizontal. Always measured upward from the horizontal. A classic example is the angle at which the top of a tower is observed from ground level.",
          },
          {
            term: "Angle of Depression",
            def: "The angle between the horizontal and the line of sight when looking down at an object below the horizontal. Always measured downward from the horizontal. Because of alternate angles, the angle of depression from point A to point B equals the angle of elevation from point B to point A.",
          },
          {
            term: "Space Diagonal",
            def: "The diagonal of a cuboid that connects two opposite vertices and passes through the interior of the solid. Found using d = √(l² + w² + h²), which is the result of applying the Pythagorean theorem twice in succession. One of the most common 'hidden right triangles' in 3D IB problems.",
          },
        ],
        traps: [
          "When using the tangent ratio in elevation/depression problems, confirm that 'opposite' is the vertical height and 'adjacent' is the horizontal distance. Starting calculations without drawing a diagram leads to swapping opposite and adjacent. In IB exams, always mark the right angle (□) and all known values on a sketch before selecting the ratio.",
          "In 3D problems, being unable to identify which plane contains the right triangle will stop you in your tracks. To find the space diagonal of a cuboid, first find the diagonal of the base using the Pythagorean theorem, then use that diagonal as the base of a second right triangle with the height of the cuboid. Attempting to finish it in one step is a frequent source of wrong answers.",
        ],
        example:
          "An observer is in a viewing platform 50 m above the ground. The angle of depression to the top of a building is 32°, and the angle of depression to the base of the building is 55°. Find the height of the building. Let d = horizontal distance to the building. Base of building: tan 55° = 50/d → d = 50/tan 55° ≈ 35.01 m. Top of building: let h_diff = vertical difference between the platform and the building top; tan 32° = h_diff/d → h_diff = 35.01 × tan 32° ≈ 35.01 × 0.6249 ≈ 21.88 m. Building height = 50 − 21.88 ≈ 28.1 m (3 s.f.). The key is first confirming in a diagram that the two depression angles correspond to the top and bottom of the building respectively.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u3-l2",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 3,
    lessonNum: 2,
    unitName: "Geometry & Trigonometry",
    title: "Sine Rule, Cosine Rule, and Area of a Triangle",
    subtitle:
      "What do you do when there is no right angle? The sine rule and cosine rule guarantee a solution for any triangle — but knowing which rule to reach for, and when, is the dividing line in the IB exam",
    overview:
      "SOH-CAH-TOA and the Pythagorean theorem are enough for right triangles. But the triangles you encounter in the real world — surveying, navigation, architecture — almost never have a right angle. You need to find remaining sides and angles when you only know some of them. The two tools for this are the sine rule and the cosine rule. In IB Math AI both appear on Paper 1 (no calculator) and Paper 2 (with calculator). The decision rule is simple: if you have two matching angle–opposite-side pairs, use the sine rule; if you have three sides, or two sides and the included angle, use the cosine rule. Internalise this decision routine and you will always know where to start.",
    objectives: [
      "Use the sine rule a/sinA = b/sinB = c/sinC to find unknown sides and angles in a triangle",
      "Use the cosine rule c² = a² + b² − 2ab cosC to solve triangles given SSS or SAS",
      "Use the area formula Area = ½ab sinC to find the area of a triangle given two sides and the included angle",
      "Identify when the ambiguous case (SSA) arises and find both possible solutions",
      "Combine bearings with trigonometry to solve navigation problems",
    ],
    formulas: [
      "Sine rule: a/sinA = b/sinB = c/sinC",
      "Cosine rule (finding a side): c² = a² + b² − 2ab cosC",
      "Cosine rule (finding an angle): cosC = (a² + b² − c²) / (2ab)",
      "Area of a triangle: Area = ½ab sinC",
      "Heron's formula: Area = √(s(s−a)(s−b)(s−c)),  s = (a+b+c)/2",
    ],
    sections: [
      {
        title: "The Sine Rule and the Ambiguous Case",
        subtitle:
          "The sine rule is powerful, but it carries the ambiguous-case trap — always check whether two valid triangles exist when you are given SSA",
        terms: [
          {
            term: "Sine Rule",
            def: "In any triangle ABC, a/sinA = b/sinB = c/sinC, where lower-case a, b, c denote the sides opposite angles A, B, C respectively. Use it when at least one complete angle–opposite-side pair is known along with one additional piece of information. Use the ratio forwards to find a side; use the inverse sine function (sin⁻¹) to find an angle.",
          },
          {
            term: "Ambiguous Case",
            def: "When two sides and a non-included angle (SSA) are given, there may be zero, one, or two valid triangles. This happens because the sine function takes the same value for two angles (θ and 180° − θ). The IB exam either explicitly asks for both possible values or expects you to use context to reject the impossible one.",
          },
          {
            term: "Bearing",
            def: "A direction measured clockwise from true north, written as a three-digit number (e.g. 045°, 270°). IB navigation problems combine bearings with trigonometry to find distances or directions between two points. Always draw an accurate diagram and extract interior angles geometrically before applying any trig rule.",
          },
          {
            term: "Inverse Trigonometric Function",
            def: "A function that recovers an angle from a known ratio. Written as sin⁻¹, cos⁻¹, or tan⁻¹. On a GDC, accessed with the 2nd or SHIFT key. Always verify that the result falls within the expected range (0° to 180° for triangle angles).",
          },
        ],
        traps: [
          "When using the sine rule to find an angle, sin⁻¹ always returns a value between 0° and 90°. If the angle could be obtuse (between 90° and 180°), then 180° − θ is also a candidate. Always test whether the obtuse value is valid by checking that the three angles still sum to 180°. Writing down only the acute answer when both are valid earns at most half the marks.",
          "Bearing problems frequently cause errors when students extract the wrong interior angle of the triangle. If two bearings are given, the interior angle of the triangle is not simply the arithmetic difference of those bearings. Draw the diagram, mark true-north lines at both reference points, and extract the angle geometrically.",
        ],
        example:
          "In triangle ABC, a = 7 cm, b = 10 cm, A = 35°. Find all possible values of angle B. Sine rule: sinB/b = sinA/a → sinB = 10 × sin35°/7 = 10 × 0.5736/7 ≈ 0.8194. B₁ = sin⁻¹(0.8194) ≈ 55.0°. Ambiguous case check: B₂ = 180° − 55.0° = 125.0°. Validate B₂: A + B₂ = 35° + 125° = 160° < 180° → C = 20° > 0°, so B₂ is valid. Therefore B = 55.0° or B = 125.0°. The IB markscheme awards full marks only if both solutions are presented.",
      },
      {
        title: "The Cosine Rule and the Area of a Triangle",
        subtitle:
          "Three sides or two sides with their included angle calls for the cosine rule — and the area formula ½ab sinC works for any triangle, right-angled or not",
        terms: [
          {
            term: "Cosine Rule",
            def: "In any triangle, c² = a² + b² − 2ab cosC. Use it to find the third side when two sides and the included angle (SAS) are given, or rearrange as cosC = (a²+b²−c²)/(2ab) to find an angle when all three sides (SSS) are given. When C = 90°, cosC = 0, and the formula reduces to the Pythagorean theorem — confirming that it is the general case.",
          },
          {
            term: "Included Angle",
            def: "The angle formed between two given sides. The cosine rule and the area formula both require the included angle. If the angle provided in a problem is not between the two given sides (i.e. the configuration is SSA rather than SAS), you must use the sine rule instead. Always verify this before choosing a method.",
          },
          {
            term: "Area Formula",
            def: "When two sides a and b and their included angle C are known, Area = ½ab sinC. No need to find the perpendicular height explicitly. Since sin has a maximum of 1 (at C = 90°), the area is greatest when the included angle is 90° — a useful intuitive check.",
          },
          {
            term: "Heron's Formula",
            def: "Finds the area when all three sides are known but no angle is given. Define the semi-perimeter s = (a+b+c)/2, then Area = √(s(s−a)(s−b)(s−c)). Provided in the IB Formula Booklet. For SSS area problems, this is often quicker than first finding an angle via the cosine rule.",
          },
        ],
        traps: [
          "In the cosine rule cosC = (a²+b²−c²)/(2ab), a negative numerator simply means the angle is obtuse (90° < C < 180°). Accept the obtuse result from cos⁻¹ naturally — it is not an error. Unlike the sine rule, the cosine rule never produces an ambiguous case when finding angles, because cos⁻¹ returns a unique value in the range 0° to 180°.",
          "In the area formula ½ab sinC, angle C must be the included angle between sides a and b. If a problem gives three angles but you are not sure which one lies between the two given sides, confirm with a labelled diagram before applying the formula. Applying the formula with the wrong angle pairing is a common and costly mistake.",
        ],
        example:
          "In triangle PQR, PQ = 8 cm, PR = 11 cm, angle P = 42°. Find (a) the length QR and (b) the area of the triangle. (a) Cosine rule: QR² = PQ² + PR² − 2(PQ)(PR)cos P = 64 + 121 − 2(8)(11)cos 42° = 185 − 176 × 0.7431 ≈ 185 − 130.8 = 54.2. QR = √54.2 ≈ 7.36 cm (3 s.f.). (b) Area = ½ × PQ × PR × sin P = ½ × 8 × 11 × sin 42° = 44 × 0.6691 ≈ 29.4 cm² (3 s.f.). IB marking note: using a rounded value of QR in a subsequent area calculation accumulates rounding error. Store intermediate results exactly in your GDC rather than re-entering rounded values.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u3-l3",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 3,
    lessonNum: 3,
    unitName: "Geometry & Trigonometry",
    title: "3D Geometry Applications, Bearing Navigation, and Introduction to Voronoi Diagrams",
    subtitle:
      "The final application of every Unit 3 tool combined — step-by-step decomposition of 3D trig problems, plus the IB AI-exclusive topic of Voronoi diagrams",
    overview:
      "The last lesson of IB Math AI Unit 3 is about integration. A single Paper 2 high-mark question will demand 3D solids, SOH-CAH-TOA, the sine rule, and the cosine rule in sequence. For example: find the angle between a slant edge of a pyramid and its base using the cosine rule, then use that angle to find the lateral face area with ½ab sinC. On top of this, Unit 3 ends with a topic unique to the IB Math AI syllabus: Voronoi diagrams. A Voronoi diagram partitions a plane into regions showing which site (e.g. a fire station) is closest to each point — a practical model for facility location. The foundation is the perpendicular bisector. Although it looks complex, mastering three core concepts is enough to handle any IB Voronoi question.",
    objectives: [
      "Extract appropriate cross-sections from a 3D figure and apply right-triangle trig, the sine rule, and the cosine rule in sequence",
      "Extract interior angles correctly from bearing-based surveying problems and solve the resulting triangles",
      "Define the cell, vertex, and edge of a Voronoi diagram and explain their relationship to perpendicular bisectors",
      "Construct a Voronoi diagram by drawing perpendicular bisectors of given sites",
      "Analyse how the cell structure changes when a new site is added to an existing Voronoi diagram",
    ],
    formulas: [
      "Midpoint of two points: M = ((x₁+x₂)/2, (y₁+y₂)/2)",
      "Gradient between two points: m = (y₂−y₁)/(x₂−x₁)",
      "Perpendicular bisector gradient: m_⊥ = −1/m",
      "Distance between two points: d = √((x₂−x₁)² + (y₂−y₁)²)",
      "Sine rule: a/sinA = b/sinB = c/sinC",
      "Cosine rule: c² = a² + b² − 2ab cosC",
    ],
    sections: [
      {
        title: "Strategy for Complex 3D Trigonometry Problems",
        subtitle:
          "The only way to solve a 3D problem is to decide first which 2D cross-section to cut — once you have the cross-section, apply the Unit 3 tools you already know",
        terms: [
          {
            term: "Angle in 3D Space",
            def: "The angle formed between two lines, or between a line and a plane, within a 3D figure. To find it, identify the 2D cross-section containing both lines and apply trigonometry within that plane. Typical IB examples: the angle a slant edge of a pyramid makes with the base, or the dihedral angle between a lateral face and the base.",
          },
          {
            term: "Dihedral Angle",
            def: "The angle between two planes, measured in the direction perpendicular to their line of intersection (the hinge). In a 3D problem, 'the angle between the sloping face and the horizontal base' is a dihedral angle. Find a line in each plane that is perpendicular to the line of intersection, and measure the angle between those two lines.",
          },
          {
            term: "Step-by-step Decomposition",
            def: "Rather than trying to solve a 3D problem in one go, break it into steps: (1) identify the required cross-section; (2) label the known sides and angles in that cross-section; (3) select the appropriate law; (4) store the intermediate result exactly; (5) carry it into the next step. In IB Paper 2, method marks for high-mark questions come from showing this process clearly.",
          },
          {
            term: "Surveying",
            def: "The practical application of trigonometry to measure positions, distances, and angles of terrain or structures. In IB Math AI, surveying problems combine bearings, angles of elevation and depression, and triangle-solving techniques. The underlying principle: use trigonometry to find distances that cannot be measured directly.",
          },
        ],
        traps: [
          "In multi-step 3D problems, rounding an intermediate result to a decimal before using it in the next calculation creates accumulated rounding error. When using a GDC, store intermediate values using the Ans or STO function and pass the exact value to the next step. The IB markscheme is not extremely strict about final-answer rounding tolerance, but large mid-calculation rounding errors can cost even follow-through marks.",
          "When finding the shortest path or angle of inclination on a 3D surface, do not attempt to work in 3D space directly. Instead, unfold a net or extract a cross-section to convert the problem into 2D. For example, the shortest path between two points on the surface of a cone is a straight line on the net. This transformation is central to HL Paper 3 and also appears in SL-level problems.",
        ],
        example:
          "A square pyramid has a square base of side 10 m and a perpendicular height of 8 m. Find the length of a slant edge (from apex V to base vertex A) and the angle it makes with the base. Step 1 — half the base diagonal: the diagonal of the square base = 10√2 m, so OA (from centre O to vertex A) = 10√2/2 = 5√2 ≈ 7.071 m. Step 2 — slant edge in right triangle VOA: VA = √(OA² + VO²) = √((5√2)² + 8²) = √(50 + 64) = √114 ≈ 10.68 m. Step 3 — angle with the base: tan θ = VO/OA = 8/(5√2) → θ = tan⁻¹(8/(5√2)) ≈ tan⁻¹(1.1314) ≈ 48.5°. The slant edge of the pyramid is approximately 10.7 m and makes an angle of approximately 48.5° with the base.",
      },
      {
        title: "Voronoi Diagrams — The IB Math AI Exclusive Topic",
        subtitle:
          "Perpendicular bisectors are the whole story of Voronoi diagrams — once you firmly grasp that each cell is the set of points closest to its site, every IB Voronoi question becomes clear",
        terms: [
          {
            term: "Voronoi Diagram",
            def: "Given a set of points (sites) in the plane, a Voronoi diagram partitions the plane into regions (cells) such that each cell contains all points closer to its site than to any other site. It is a practical model for questions such as 'which fire station, hospital, or cell tower is nearest to a given location?'",
          },
          {
            term: "Perpendicular Bisector",
            def: "The line that passes through the midpoint of a segment and is perpendicular to it. In a Voronoi diagram, the boundary between the cells of two neighbouring sites is the perpendicular bisector of the segment joining those two sites. Every point on a perpendicular bisector is equidistant from the two sites.",
          },
          {
            term: "Voronoi Cell",
            def: "The region consisting of all points in the plane that are closer to a given site than to any other site. Each cell is a convex polygon, and the number of cells equals the number of sites. Points on the boundary are equidistant from two sites; in IB problems the cell is typically defined with a strict inequality (<).",
          },
          {
            term: "Voronoi Vertex",
            def: "A point where three or more Voronoi cell boundaries meet. Such a point is equidistant from three (or more) sites and is the circumcentre of the triangle formed by those sites. In IB exam questions, Voronoi vertices are often found by solving a system of two perpendicular bisector equations simultaneously.",
          },
        ],
        traps: [
          "When constructing a Voronoi diagram, you only need the perpendicular bisectors of neighbouring site pairs — drawing bisectors for every possible pair produces far too many unnecessary lines. The actual boundary between two cells exists only between adjacent sites. Adjacency is determined by Delaunay triangulation; at IB level, with only a small number of sites, you can identify neighbours visually.",
          "A Voronoi vertex is found as the intersection of two perpendicular bisectors, but you must confirm it is the meeting point of three cells, not just any intersection of two lines. Also note that adding a new site can reshape all existing cells — the new cell is carved out of the existing ones, and you must re-examine the entire diagram rather than just inserting a new region in isolation.",
        ],
        example:
          "Three fire stations are located at A(1, 5), B(5, 1), and C(7, 6). Determine which fire station's cell contains point P(4, 4). PA = √((4−1)² + (4−5)²) = √(9 + 1) = √10 ≈ 3.162. PB = √((4−5)² + (4−1)²) = √(1 + 9) = √10 ≈ 3.162. PC = √((4−7)² + (4−6)²) = √(9 + 4) = √13 ≈ 3.606. Since PA = PB < PC, point P lies on the perpendicular bisector of AB and is closer to both A and B than to C. That is, P is on the boundary between cell A and cell B, and does not belong to cell C. Verification: midpoint of AB = (3, 3), gradient of AB = (1−5)/(5−1) = −1, so the perpendicular bisector has gradient 1 and equation y − 3 = 1(x − 3), i.e. y = x. Point P(4, 4) satisfies y = x, confirming it lies exactly on the perpendicular bisector of AB.",
      },
    ],
  },
];
