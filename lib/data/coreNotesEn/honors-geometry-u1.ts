/**
 * Core Notes English version — Honors Geometry Unit 1 (Foundations of Geometry).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content translated to natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_GEOMETRY_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-geometry-u1-l1",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 1,
    lessonNum: 1,
    unitName: "Foundations of Geometry",
    title: "The Language of Geometry — Points, Lines, Planes, Segments, Midpoints",
    subtitle: "Why all of geometry begins from three concepts that cannot be defined",
    overview:
      "When students first meet geometry, the most disorienting moment is asking 'what is a point?' and having the textbook answer 'it is not defined.' Point, line, and plane are the undefined terms of geometry — they are the starting point of every other definition, which is precisely why they cannot be defined in terms of anything simpler. In this lesson we build carefully on those undefined terms, all the way to segments, rays, the distance formula, and the midpoint formula, so that you have a foundation that never wobbles on a coordinate-geometry problem.",
    objectives: [
      "Describe the characteristics and notation of the three undefined terms point, line, and plane",
      "Distinguish between a segment, a ray, and a line, and use the correct symbol for each",
      "Apply the distance formula to find the length of a segment given the coordinates of its two endpoints",
      "Use the midpoint formula to find a midpoint, or work backward from a midpoint and one endpoint to find the other endpoint",
      "Explain the relationship between a midpoint and a segment bisector and apply it to problems",
    ],
    formulas: [
      "Distance formula: d = √((x₂−x₁)² + (y₂−y₁)²)",
      "Midpoint formula: M = ((x₁+x₂)/2, (y₁+y₂)/2)",
    ],
    sections: [
      {
        title: "Undefined Terms and Basic Figures",
        subtitle: "From point, line, and plane to segment, ray, and line — the skeleton of geometric language",
        terms: [
          {
            term: "Undefined terms",
            def: "The three most basic concepts of geometry that cannot be defined using other concepts — point, line, and plane. A point indicates only a position and has no size; a line extends infinitely in both directions and has no width; a plane is a flat surface that extends infinitely.",
          },
          {
            term: "Line segment",
            def: "The straight path between two endpoints. Given endpoints A and B, segment AB is written $\\overline{AB}$ and has a finite length. A ray $\\overrightarrow{AB}$ starts at A and extends infinitely in the direction of B.",
          },
          {
            term: "Collinear points",
            def: "Three or more points that lie on the same line. Coplanar points lie on the same plane. Checking whether three points are collinear is frequently required in coordinate geometry and in proofs.",
          },
          {
            term: "Betweenness",
            def: "Point B is between A and C when A, B, and C are collinear and AB + BC = AC. This relationship is called the Segment Addition Postulate.",
          },
        ],
        traps: [
          "Watch the direction of a ray. $\\overrightarrow{AB}$ and $\\overrightarrow{BA}$ have opposite starting points and directions, so they are different rays. A line $\\overleftrightarrow{AB}$ has no direction, so $\\overleftrightarrow{AB} = \\overleftrightarrow{BA}$, but you must never write two rays as equal in that way.",
          "Before using the Segment Addition Postulate, first confirm that the points are collinear. Even if B appears to lie between A and C, the relation AB + BC = AC fails if the three points are not on the same line. If a diagram does not draw the line, state 'collinear' explicitly first.",
        ],
        example:
          "Point B lies on segment AC with AB = 3x − 2, BC = x + 6, and AC = 24. Find x and AB. By the Segment Addition Postulate, AB + BC = AC, so (3x − 2) + (x + 6) = 24, giving 4x + 4 = 24, 4x = 20, x = 5. Therefore AB = 3(5) − 2 = 13 and BC = 5 + 6 = 11. Check: 13 + 11 = 24 ✓. Always make a habit of substituting back at the end to confirm the total matches AC.",
      },
      {
        title: "The Distance Formula and the Midpoint Formula",
        subtitle: "Two formulas born from the Pythagorean theorem that unlock every coordinate-geometry calculation",
        terms: [
          {
            term: "Distance formula",
            def: "The formula for the distance between two points (x₁, y₁) and (x₂, y₂): d = √((x₂−x₁)² + (y₂−y₁)²). It applies the Pythagorean theorem to the coordinate plane, computing the hypotenuse of a right triangle whose legs are the horizontal and vertical changes.",
          },
          {
            term: "Midpoint formula",
            def: "The coordinates of the midpoint of a segment with endpoints (x₁, y₁) and (x₂, y₂): M = ((x₁+x₂)/2, (y₁+y₂)/2). Each coordinate is the average of the two endpoint values, making the midpoint equidistant from both endpoints.",
          },
          {
            term: "Segment bisector",
            def: "A point, line, ray, segment, or plane that divides a segment into two congruent parts at its midpoint. Tick marks indicate the two congruent parts. A perpendicular bisector cuts the segment at its midpoint at a right angle.",
          },
          {
            term: "Congruent segments",
            def: "Two segments of equal length, written $\\overline{AB} \\cong \\overline{CD}$, which means AB = CD (equal lengths). Use 'congruent' for figures and 'equal' for numbers — that is the precise convention.",
          },
        ],
        traps: [
          "Watch out for 'work backward' midpoint problems. A common question gives midpoint M = (3, 5) and one endpoint A = (1, 2) and asks for the other endpoint B. Set up (1+x)/2 = 3 → x = 5 and (2+y)/2 = 5 → y = 8, so B = (5, 8). Substituting directly into the formula avoids errors. Memorising B = 2M − A makes the calculation even faster.",
        ],
        example:
          "Given A = (−2, 3) and B = (4, −1), find the length and midpoint of AB. Distance: d = √((4−(−2))² + (−1−3)²) = √(6² + (−4)²) = √(36 + 16) = √52 = 2√13. Midpoint: M = ((−2+4)/2, (3+(−1))/2) = (2/2, 2/2) = (1, 1). Do not leave √52 as is — always simplify to √(4×13) = 2√13, because exams require the most simplified radical form.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u1-l2",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 1,
    lessonNum: 2,
    unitName: "Foundations of Geometry",
    title: "Angles and Angle Relationships",
    subtitle: "Complementary, supplementary, vertical angles, and angle bisectors — completing every tool for working with angles at once",
    overview:
      "In a geometry proof, if you cannot explain 'why these two angles are equal,' you earn only half the marks. Simply memorising angle relationships and being able to explain 'why they hold' are completely different levels of mastery. In this lesson we master every angle relationship at the level of mechanism — the definitions of complementary and supplementary angles, the proof structure of the Vertical Angles Theorem, and the properties of angle bisectors.",
    objectives: [
      "Define complementary and supplementary angles and, given one angle's measure, calculate the other",
      "Explain the Vertical Angles Theorem and analyze the relationships among the four angles formed when two lines intersect",
      "Use the definition of an angle bisector to set up an equation in an unknown and solve for the angle",
      "Distinguish adjacent angles from a linear pair and use the Linear Pair Postulate as a reason in a proof",
      "Apply the Angle Addition Postulate correctly in angle problems",
    ],
    sections: [
      {
        title: "Complementary, Supplementary, and Linear Pairs",
        subtitle: "Pairs of angles that sum to 90° or 180° — one definition solves dozens of problems",
        terms: [
          {
            term: "Complementary angles",
            def: "Two angles whose measures sum to exactly 90°. They need not be adjacent; if the measures add to 90° the angles are complementary regardless of position. If ∠A and ∠B are complementary, then ∠A = 90° − ∠B.",
          },
          {
            term: "Supplementary angles",
            def: "Two angles whose measures sum to exactly 180°. They need not be adjacent; any pair summing to 180° is supplementary. A linear pair — two adjacent angles sharing a common side whose measures sum to 180° — is always supplementary.",
          },
          {
            term: "Linear pair",
            def: "Two adjacent angles that share a common vertex and a common side, with their remaining sides forming opposite rays. By the Linear Pair Postulate, the measures of a linear pair always sum to 180°.",
          },
          {
            term: "Angle Addition Postulate",
            def: "If ray BD lies in the interior of ∠ABC, then ∠ABD + ∠DBC = ∠ABC. It is the angle version of the Segment Addition Postulate and is the basis for every problem that splits a large angle into parts or sums two part-angles.",
          },
        ],
        traps: [
          "Students often confuse the words complementary and supplementary. Just as C (complementary) comes before S (supplementary) alphabetically, 90° comes before 180°. Remembering 'C comes before S, 90 comes before 180' guarantees you never mix them up on test day.",
          "Do not equate supplementary with linear pair. Every linear pair is supplementary, but not every supplementary pair is a linear pair. Two angles that are not adjacent are still supplementary if they sum to 180°. In a proof, 'they form a linear pair, so they are supplementary' is correct, but 'they are supplementary, so they form a linear pair' is wrong.",
        ],
        example:
          "∠A and ∠B are complementary with ∠A = 3x + 10 and ∠B = x + 20. Find both angle measures. Since they are complementary, (3x + 10) + (x + 20) = 90, so 4x + 30 = 90, 4x = 60, x = 15. Therefore ∠A = 3(15) + 10 = 55° and ∠B = 15 + 20 = 35°. Check: 55 + 35 = 90° ✓. Complementary and supplementary problems are always posed in this equation form, so writing the sum as an equation is the key first step.",
      },
      {
        title: "Vertical Angles and Angle Bisectors",
        subtitle: "The secret of the four angles two intersecting lines create, and how to split an angle exactly in half",
        terms: [
          {
            term: "Vertical angles",
            def: "The pairs of angles opposite each other when two lines intersect. By the Vertical Angles Theorem, vertical angles are always congruent (equal in measure). They share a common vertex but, unlike adjacent angles, share no common side.",
          },
          {
            term: "Vertical Angles Theorem",
            def: "When two lines intersect, the vertical angles are congruent. It is proved algebraically from the fact that two adjacent angles form a linear pair and are each supplementary: since ∠1 + ∠2 = 180° and ∠3 + ∠2 = 180°, it follows that ∠1 = ∠3.",
          },
          {
            term: "Angle bisector",
            def: "A ray from the vertex of an angle that divides it into two congruent parts. If $\\overrightarrow{BD}$ bisects ∠ABC, then ∠ABD = ∠DBC = (1/2)∠ABC. Arc marks indicate the two congruent angles.",
          },
          {
            term: "Adjacent angles",
            def: "Two angles that share a common vertex and a common side and do not overlap. A linear pair is always adjacent, but adjacent angles are not always a linear pair — to be a linear pair, the remaining two sides must form opposite rays.",
          },
        ],
        traps: [
          "After solving for x in a vertical-angle problem, always verify the angle measures. If ∠1 = 5x − 10 and its vertical angle ∠3 = 3x + 20, then 5x − 10 = 3x + 20 gives x = 15 and ∠1 = ∠3 = 65°. But you should also check that the adjacent angles sum to 180° (65 + 115 = 180) to confirm the condition that 'the two lines actually intersect.' Solving for x but skipping the angle check can cost partial marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-geometry-u1-l3",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 1,
    lessonNum: 3,
    unitName: "Foundations of Geometry",
    title: "Foundations of Logic and Proof",
    subtitle: "Conditional statements, deductive reasoning, and two-column proofs — how to explain 'why' in mathematical language",
    overview:
      "There is exactly one reason geometric proof feels hard — the question of why one must bother proving 'the obvious.' But geometry is the discipline in which humanity first perfected a method of verifying truth by logic alone rather than intuition. A two-column proof is a format that states a reason (postulate, theorem, definition, or property) for every step, showing there is no logical leap. In this lesson you fully internalize the structure of conditional statements, the principles of deductive reasoning, the properties of equality and congruence, and how to write a two-column proof.",
    objectives: [
      "Identify the hypothesis and conclusion of an if-then statement and judge the truth value of its converse, inverse, and contrapositive",
      "Use the laws of logic (Law of Detachment / modus ponens, Law of Syllogism) to draw conclusions",
      "Use the properties of equality (Addition, Subtraction, Multiplication, Division, Substitution) accurately as reasons in a two-column proof",
      "Identify the properties of congruence (Reflexive, Symmetric, Transitive) and apply them to proofs of segment and angle congruence",
      "Complete a two-column proof for a geometry problem in which the given information and the statement to prove are specified",
    ],
    sections: [
      {
        title: "Conditional Statements and Deductive Reasoning",
        subtitle: "Breaking geometric statements into if-then structure and drawing conclusions logically",
        terms: [
          {
            term: "Conditional statement",
            def: "A logical statement of the form 'if p, then q.' Here p is the hypothesis and q is the conclusion. A conditional is false only when the hypothesis is true and the conclusion is false.",
          },
          {
            term: "Converse, Inverse, Contrapositive",
            def: "For a conditional 'p → q,' the converse is 'q → p,' the inverse is '¬p → ¬q,' and the contrapositive is '¬q → ¬p.' A statement and its contrapositive always have the same truth value, and the converse and inverse share the same truth value, but these may differ from the original.",
          },
          {
            term: "Law of Detachment (Modus Ponens)",
            def: "If 'p → q' is true and p is true, then q is true. This is the most basic form of deductive reasoning: only when both the conditional and its hypothesis are true can you conclusively derive the conclusion.",
          },
          {
            term: "Law of Syllogism",
            def: "If 'p → q' is true and 'q → r' is true, then 'p → r' is true. When the conclusion of one conditional matches the hypothesis of another, this law lets you connect them directly, skipping the intermediate step.",
          },
        ],
        traps: [
          "A true converse does not make the original statement true. Each must be verified separately. For a definition the biconditional holds (both directions are true), but for a general theorem the converse may be false — so never assume 'the converse is of course also true.'",
        ],
        example:
          "Apply the Law of Syllogism in a geometric setting. (1) If two angles are congruent, then they have the same measure. (2) If two angles are vertical angles, then they are congruent. → Therefore, if two angles are vertical angles, then they have the same measure. Chaining two conditionals like links to derive a new conclusion is the Law of Syllogism. Using this structure to bundle proof steps lets you write more concise proofs.",
      },
      {
        title: "Two-Column Proofs and Properties of Equality and Congruence",
        subtitle: "The two-column proof, which states a reason for every step — the complete form of mathematical writing",
        terms: [
          {
            term: "Two-column proof",
            def: "A proof format that lists mathematical statements in the left column and the reason for each statement in the right column. Reasons include given information, definitions, postulates, theorems, and properties of equality and congruence.",
          },
          {
            term: "Properties of equality",
            def: "The Addition, Subtraction, Multiplication, Division, Substitution, and Distributive properties. Each guarantees that you may apply the same operation to both sides of an equation or substitute equal values for one another.",
          },
          {
            term: "Properties of congruence",
            def: "Reflexive: $\\overline{AB} \\cong \\overline{AB}$. Symmetric: if $\\overline{AB} \\cong \\overline{CD}$ then $\\overline{CD} \\cong \\overline{AB}$. Transitive: if $\\overline{AB} \\cong \\overline{CD}$ and $\\overline{CD} \\cong \\overline{EF}$ then $\\overline{AB} \\cong \\overline{EF}$. These apply equally to angles as well as segments.",
          },
          {
            term: "Reflexive property",
            def: "Every segment or angle is congruent to itself. In a proof, the Reflexive property justifies that a shared side or shared angle of two triangles is congruent.",
          },
        ],
        traps: [
          "Do not confuse the Substitution property with the Transitive property. The Transitive property skips a middle term when you have two relations of the same form (a = b, b = c → a = c). The Substitution property replaces an expression with an equivalent one in an equation (a = b → substitute b for a). If you are unsure which to cite in a two-column proof, use Transitive for 'linking two equations' and Substitution for 'replacing or substituting.'",
          "In a two-column proof, 'Given' always appears as the first reason. The information stated in the problem must begin with 'Given,' and every subsequent statement must follow logically from a previous statement and reason. Skipping steps or writing the conclusion first collapses the proof structure itself.",
        ],
        example:
          "Given: ∠1 and ∠2 are supplementary; ∠3 and ∠2 are supplementary. Prove: ∠1 ≅ ∠3.\n\n| Statement | Reason |\n|---|---|\n| 1. ∠1 and ∠2 are supplementary; ∠3 and ∠2 are supplementary | 1. Given |\n| 2. m∠1 + m∠2 = 180°, m∠3 + m∠2 = 180° | 2. Definition of supplementary angles |\n| 3. m∠1 + m∠2 = m∠3 + m∠2 | 3. Substitution property |\n| 4. m∠1 = m∠3 | 4. Subtraction property (subtract m∠2 from both sides) |\n| 5. ∠1 ≅ ∠3 | 5. Definition of congruent angles |\n\nBuilding the theorem 'supplements of the same angle are congruent' logically from scratch like this is the essence of a two-column proof.",
      },
    ],
  },
];
