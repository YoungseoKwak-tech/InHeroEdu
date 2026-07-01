/**
 * Core Notes English version — Honors Geometry Unit 2 (Triangle Congruence & Similarity).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content translated to natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_GEOMETRY_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-geometry-u2-l1",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 2,
    lessonNum: 1,
    unitName: "Triangle Congruence & Similarity",
    title: "Parallel Lines and Transversals — The Laws That Govern Angle Relationships",
    subtitle: "The moment you understand why corresponding, alternate, and co-interior angles hold in 'provable language,' every angle problem opens up",
    overview:
      "The most common mistake students make on parallel-line problems is leaning on the intuition 'these two angles look equal, so they must be equal.' But the instant an exam asks 'why are they equal,' intuition earns no marks. The eight angles formed when a transversal crosses parallel lines bundle into three perfectly predictable relationships — corresponding angles, alternate interior angles, and co-interior angles. In this lesson you fully internalize which postulate and theorem each relationship comes from, and how to use them in reverse to prove that two lines are parallel.",
    objectives: [
      "Name each of the eight angles formed when a transversal meets two lines and describe their positional relationships",
      "Use the Corresponding Angles Postulate to state, with a reason, that two angles are congruent",
      "Use the Alternate Interior Angles Theorem and the Co-interior Angles Theorem correctly as reasons in a two-column proof",
      "State the conditions for two lines to be parallel (the converse theorems) and judge parallelism from angle relationships",
      "Given angle expressions containing an unknown, use parallel-line relationships to set up an equation and solve for x",
    ],
    formulas: [
      "Corresponding angles: if l ∥ m, then ∠1 = ∠5 (same relative position)",
      "Alternate interior angles: if l ∥ m, then ∠3 = ∠6 (interior, opposite sides of the transversal)",
      "Co-interior / same-side interior angles: if l ∥ m, then ∠3 + ∠5 = 180°",
    ],
    sections: [
      {
        title: "The Angle Pairs Formed by Parallel Lines and a Transversal",
        subtitle: "Classify the eight angles into three groups — the positional logic of corresponding, alternate, and co-interior angles",
        terms: [
          {
            term: "Transversal",
            def: "A line that crosses two or more lines at distinct points. When a transversal meets parallel lines, four angles form at each intersection, eight in total. These eight are first classified by position into interior (between the two parallel lines) and exterior (outside them).",
          },
          {
            term: "Corresponding angles",
            def: "Pairs of angles in the same relative position (upper-left, upper-right, etc.) where a transversal meets two lines. If the lines are parallel, corresponding angles are congruent (Corresponding Angles Postulate). Example: ∠1 and ∠5 (both upper-left).",
          },
          {
            term: "Alternate interior angles",
            def: "Pairs of angles between the two lines (interior) on opposite sides of the transversal. If the lines are parallel, alternate interior angles are congruent (Alternate Interior Angles Theorem). This theorem is proved from the Corresponding Angles Postulate by way of the Vertical Angles Theorem.",
          },
          {
            term: "Co-interior / same-side interior angles",
            def: "Pairs of angles between the two lines (interior) on the same side of the transversal. If the lines are parallel, co-interior angles sum to exactly 180° (supplementary) by the Co-interior Angles Theorem. Memorise 'co-interior angles are supplementary.'",
          },
        ],
        traps: [
          "Many students confuse corresponding and alternate interior angles by name alone, without a figure. The key is position — corresponding means 'same side, same level,' alternate interior means 'opposite side, inside.' If the two angles are outside the parallel lines, they are alternate exterior angles, not alternate interior — so classify interior vs. exterior first, then apply the postulate or theorem.",
          "When citing the converse theorems as reasons, mind the direction. 'Parallel → corresponding angles congruent' is the postulate, while 'corresponding angles congruent → parallel' is the Converse of the Corresponding Angles Postulate, with its own separate name. To prove two lines parallel you must cite the converse version; using the original postulate signals a backward logical direction to the grader.",
        ],
        example:
          "A transversal crosses two parallel lines l ∥ m. Given ∠3 = 4x + 10 and ∠5 = 2x + 50, find x and the angle measures. ∠3 and ∠5 are co-interior angles, so they sum to 180°. (4x + 10) + (2x + 50) = 180, giving 6x + 60 = 180, 6x = 120, x = 20. Therefore ∠3 = 4(20) + 10 = 90° and ∠5 = 2(20) + 50 = 90°. Check: 90 + 90 = 180° ✓. Making a habit of first deciding 'are they equal so they are alternate, or do they sum to 180° so they are co-interior' greatly speeds up your solving.",
      },
      {
        title: "The Converse Theorems — Tools for Proving Two Lines Parallel",
        subtitle: "Integrating into a two-column proof the logic of inferring parallelism 'in reverse' from angle relationships",
        terms: [
          {
            term: "Converse of the Corresponding Angles Postulate",
            def: "When a transversal meets two lines and the corresponding angles are congruent, the two lines are parallel. This converse is the key reason in problems that prove parallelism. Note that the direction is 'angle → parallel.'",
          },
          {
            term: "Converse of the Alternate Interior Angles Theorem",
            def: "When a transversal meets two lines and the alternate interior angles are congruent, the two lines are parallel. It follows from the Converse of the Corresponding Angles Postulate. Use it only in the direction 'alternate interior angles congruent → parallel.'",
          },
          {
            term: "Converse of the Co-interior Angles Theorem",
            def: "When a transversal meets two lines and the co-interior angles sum to 180°, the two lines are parallel. Confirming that the co-interior angles are supplementary lets you conclude parallelism.",
          },
        ],
        traps: [
          "When using a converse theorem, state clearly 'which two lines are parallel.' In a complex diagram where a transversal meets three lines, it is easy to confuse which pair is parallel. After the name of the converse theorem you cite, always write a specific conclusion such as '∴ l ∥ m' with the actual line names, to avoid losing marks in a two-column proof.",
        ],
        example:
          "A transversal crosses lines l and m, forming alternate interior angles ∠3 = 3x + 15 and ∠6 = 5x − 25. Find the value of x that forces l ∥ m, then confirm the parallelism. To make the lines parallel, the alternate interior angles must be congruent: 3x + 15 = 5x − 25, so 40 = 2x, x = 20. Then ∠3 = 3(20) + 15 = 75° and ∠6 = 5(20) − 25 = 75°, so ∠3 ≅ ∠6. By the Converse of the Alternate Interior Angles Theorem, ∴ l ∥ m. Always cite the converse (not the original theorem) when the goal is to conclude parallelism.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u2-l2",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 2,
    lessonNum: 2,
    unitName: "Triangle Congruence & Similarity",
    title: "Triangle Congruence — SSS, SAS, ASA, AAS, HL and CPCTC",
    subtitle: "Not memorising five congruence conditions, but understanding 'why minimal information uniquely determines a triangle'",
    overview:
      "The most common pattern in geometry proofs is the flow 'two triangles are congruent → therefore this side (or angle) is equal.' But students often make this mistake — writing the congruence first and concluding with CPCTC is correct, yet they apply the congruence condition itself incorrectly. SSS (three sides), SAS (two sides and the included angle), ASA (two angles and the included side), AAS (two angles and a non-included side), and HL (the hypotenuse and one leg of a right triangle) are not to be memorised but understood: 'why does this information alone uniquely determine the triangle?' Master that and you choose correctly in proofs. We also master why SSA and AAA are not congruence conditions.",
    objectives: [
      "Define each of the five triangle congruence conditions SSS, SAS, ASA, AAS, HL and judge when each applies given the information",
      "Complete a two-column proof that two triangles are congruent, with step-by-step reasons",
      "Use CPCTC (Corresponding Parts of Congruent Triangles are Congruent) correctly in the conclusion step after a congruence proof",
      "Explain counterexamples showing why SSA and AAA are not congruence conditions",
      "Use the Reflexive Property to justify that a shared side or shared angle of two triangles is congruent",
    ],
    sections: [
      {
        title: "The Five Congruence Conditions — SSS, SAS, ASA, AAS, HL",
        subtitle: "Which conditions uniquely determine a triangle — the logic of each and the criteria for applying it",
        terms: [
          {
            term: "SSS Congruence Postulate",
            def: "If all three pairs of corresponding sides of two triangles are congruent, the triangles are congruent. If AB = DE, BC = EF, and CA = FD, then △ABC ≅ △DEF. It holds because three side lengths completely determine a triangle's shape and size.",
          },
          {
            term: "SAS Congruence Postulate",
            def: "If two pairs of corresponding sides are congruent and the included angle (between the two sides) is congruent, the triangles are congruent. If AB = DE, ∠B = ∠E, and BC = EF, then △ABC ≅ △DEF. The 'included angle' is key — an angle not between the two sides is not SAS.",
          },
          {
            term: "ASA Congruence Postulate",
            def: "If two pairs of corresponding angles are congruent and the included side (between the two angles) is congruent, the triangles are congruent. If ∠A = ∠D, AB = DE, and ∠B = ∠E, then △ABC ≅ △DEF. The included side is the side adjacent to both angles.",
          },
          {
            term: "AAS Congruence Theorem",
            def: "If two pairs of corresponding angles are congruent and one pair of corresponding non-included sides is congruent, the triangles are congruent. If ∠A = ∠D, ∠B = ∠E, and BC = EF, then △ABC ≅ △DEF. Since the angle sum of a triangle is 180°, the third angle is determined, reducing it to ASA.",
          },
          {
            term: "HL Congruence Theorem",
            def: "In right triangles, if the hypotenuse and one pair of legs are congruent, the two right triangles are congruent. You must first state that the triangles are right triangles; it holds because the Pythagorean theorem determines the third side.",
          },
        ],
        traps: [
          "Do not confuse SAS with SSA. SAS requires the angle to be between the two sides, whereas SSA (two sides and a non-included angle) does not uniquely determine a triangle — two triangles can fit the given information, so it is not a congruence condition. When two sides and one angle appear in a proof, always confirm 'is the angle between the two sides?' before applying SAS.",
          "In congruence notation, the order of vertices declares the correspondence. Writing △ABC ≅ △DEF declares A↔D, B↔E, C↔F. A different ordering (e.g. △ABC ≅ △EDF) means a different correspondence, so match the vertex order carefully. Getting this order wrong leads you to claim the wrong sides and angles in the later CPCTC step.",
        ],
        example:
          "Given: $\\overline{AB} \\cong \\overline{DC}$, $\\overline{BC} \\cong \\overline{CB}$ (shared side), and ∠ABC and ∠DCB are right angles. Prove: △ABC ≅ △DCB, and AC = DB.\n\n| Statement | Reason |\n|---|---|\n| 1. ∠ABC = 90°, ∠DCB = 90° | 1. Given |\n| 2. △ABC and △DCB are right triangles | 2. Definition of a right triangle |\n| 3. $\\overline{AB} \\cong \\overline{DC}$ | 3. Given |\n| 4. $\\overline{BC} \\cong \\overline{CB}$ | 4. Reflexive Property |\n| 5. △ABC ≅ △DCB | 5. HL Congruence Theorem |\n| 6. $\\overline{AC} \\cong \\overline{DB}$ | 6. CPCTC |\n\nThe key flow of this proof is 'confirm the right angles → confirm hypotenuse and leg → HL → CPCTC.' CPCTC can be used only in a step after congruence is established.",
      },
      {
        title: "CPCTC and Proof Strategy",
        subtitle: "The tool that opens the instant congruence is established — designing CPCTC as the final step of a proof",
        terms: [
          {
            term: "CPCTC (Corresponding Parts of Congruent Triangles are Congruent)",
            def: "The reason used after two triangles have been proved congruent to claim that corresponding sides or angles are congruent. The flow is always '(1) prove the two triangles congruent → (2) use CPCTC to derive the desired side or angle congruence.' CPCTC cannot be used on its own before congruence is declared.",
          },
          {
            term: "Reflexive Property of Congruence",
            def: "Any segment or angle is congruent to itself ($\\overline{AB} \\cong \\overline{AB}$). It is the only reason that justifies the congruence of a side shared by two triangles. Whenever two triangles share a side in the diagram, state the Reflexive Property as one explicit step.",
          },
          {
            term: "Correspondence in congruent triangles",
            def: "The pairs of corresponding vertices, sides, and angles when two triangles are congruent. If △ABC ≅ △PQR, then ∠A ↔ ∠P, ∠B ↔ ∠Q, ∠C ↔ ∠R, and $\\overline{AB} \\cong \\overline{PQ}$, $\\overline{BC} \\cong \\overline{QR}$, $\\overline{CA} \\cong \\overline{RP}$. The vertex order of the congruence symbol fully defines the correspondence.",
          },
        ],
        traps: [
          "Avoid trying to use CPCTC in the middle of a congruence proof. For instance, claiming 'this angle is equal so I can use SAS' and citing CPCTC as the reason creates circular reasoning. CPCTC may be used only on the line after congruence is fully established. Plan from the start so the second-to-last line is the congruence condition and the last line is CPCTC.",
        ],
        example:
          "Given: M is the midpoint of both $\\overline{AB}$ and $\\overline{CD}$. Prove: ∠A ≅ ∠B.\n\n| Statement | Reason |\n|---|---|\n| 1. M is the midpoint of AB and CD | 1. Given |\n| 2. $\\overline{AM} \\cong \\overline{BM}$, $\\overline{CM} \\cong \\overline{DM}$ | 2. Definition of midpoint |\n| 3. ∠AMC ≅ ∠BMD | 3. Vertical Angles Theorem |\n| 4. △AMC ≅ △BMD | 4. SAS Congruence Postulate |\n| 5. ∠A ≅ ∠B | 5. CPCTC |\n\nNotice the flow: build the congruence with SAS on line 4, then and only then reach ∠A ≅ ∠B by CPCTC on the final line. CPCTC always sits immediately after the congruence is declared.",
      },
    ],
  },
  {
    lessonId: "honors-geometry-u2-l3",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 2,
    lessonNum: 3,
    unitName: "Triangle Congruence & Similarity",
    title: "Triangle Similarity — AA, SAS, SSS Similarity, Ratios, and Scale Factor",
    subtitle: "If congruence means 'equal in size too,' similarity means 'same shape only' — that one difference changes all ratio and proportion calculations",
    overview:
      "Similarity may look like a relaxed version of congruence, but it is actually a more powerful tool with wider application. Knowing the scale factor alone lets you compute every corresponding side length, and it is used to indirectly measure heights and distances you cannot reach. AA (two pairs of equal angles imply similarity) starts from the remarkable principle that matching just two angles completely determines a triangle's shape. In this lesson we complete the three similarity conditions, how to set up proportions, and the proportional relationships that frequently appear in similar triangles (including the Triangle Proportionality Theorem).",
    objectives: [
      "Define each of the three triangle similarity conditions AA, SAS, SSS and judge which applies given the information",
      "Find the ratio (scale factor) between corresponding sides of two similar triangles and use it to compute an unknown side length",
      "Set up a proportion and solve for an unknown by cross-multiplication",
      "Apply the Triangle Proportionality Theorem to analyze proportional relationships inside a triangle",
      "Explain that the ratio of perimeters of similar triangles equals the scale factor and the ratio of areas equals its square, and apply this in calculations",
    ],
    formulas: [
      "Scale factor: k = (ratio of corresponding side lengths), e.g. AB/DE = BC/EF = CA/FD = k",
      "Ratio of perimeters = scale factor k",
      "Ratio of areas = square of the scale factor, k²",
      "Triangle Proportionality Theorem: in △ABC, if DE ∥ BC then AD/DB = AE/EC",
    ],
    sections: [
      {
        title: "The Three Similarity Conditions — AA, SAS Similarity, SSS Similarity",
        subtitle: "Why two equal angles already determine similarity — the logical structure and criteria for each condition",
        terms: [
          {
            term: "AA Similarity Postulate",
            def: "If two pairs of corresponding angles of two triangles are congruent, the triangles are similar. Since the angle sum is 180°, fixing two angles automatically fixes the third — which is why AA alone gives similarity. Written △ABC ~ △DEF.",
          },
          {
            term: "SAS Similarity Theorem",
            def: "If two pairs of corresponding sides are in equal ratio (proportional) and the included angle is congruent, the triangles are similar. If AB/DE = AC/DF and ∠A = ∠D, then △ABC ~ △DEF. Note that, unlike SAS congruence, the sides are 'proportional,' not 'equal.'",
          },
          {
            term: "SSS Similarity Theorem",
            def: "If all three pairs of corresponding sides are in equal ratio, the triangles are similar. If AB/DE = BC/EF = CA/FD, then △ABC ~ △DEF. Confirm that all the ratios equal the same value k (the scale factor) before concluding similarity.",
          },
          {
            term: "Scale factor & Proportion",
            def: "In similar triangles, the common value k of the ratios of corresponding sides is the scale factor. To find an unknown side x, set up a proportion a/b = c/x and solve by cross-multiplication (ax = bc).",
          },
        ],
        traps: [
          "Do not confuse SAS similarity with SAS congruence. SAS congruence requires the two sides to be 'equal in length' with a congruent included angle, while SAS similarity requires the two sides to be 'in equal ratio' with a congruent included angle. Writing 'SAS similarity' after comparing only side lengths without computing the ratios loses marks. Always compute the two ratio values and show they match, then confirm the included angle.",
          "The vertex order in a similarity statement defines correspondence just as in congruence. In △ABC ~ △DEF, the side corresponding to AB is DE, not EF or FD. Setting up a proportion without following the vertex order produces an entirely wrong ratio. Before writing the '~' symbol, check the correspondence order once more in the diagram.",
        ],
        example:
          "In △ABC, DE ∥ BC, AD = 6, DB = 4, AE = 9. Find EC and prove △ADE ~ △ABC.\n\n**Finding EC**: By the Triangle Proportionality Theorem, AD/DB = AE/EC, so 6/4 = 9/EC. Cross-multiply: 6·EC = 4·9 = 36, EC = 6.\n\n**Similarity proof (two-column)**:\n| Statement | Reason |\n|---|---|\n| 1. DE ∥ BC | 1. Given |\n| 2. ∠ADE = ∠ABC | 2. Corresponding Angles Postulate (DE ∥ BC) |\n| 3. ∠A = ∠A | 3. Reflexive Property |\n| 4. △ADE ~ △ABC | 4. AA Similarity Postulate |\n\nThe pattern 'parallel line appears → connect via AA similarity' shows up constantly on exams, so memorise this whole flow.",
      },
      {
        title: "Applying the Scale Factor — Perimeter and Area Ratios and Indirect Measurement",
        subtitle: "Why a single scale factor k yields k× perimeter and k²× area, and its real-world uses",
        terms: [
          {
            term: "Perimeter and area ratios",
            def: "For two similar triangles with scale factor k, the ratio of perimeters is k:1 and the ratio of areas is k²:1. Example: a scale factor of 3:2 gives a perimeter ratio of 3:2 but an area ratio of 9:4. This property applies to all similar polygons.",
          },
          {
            term: "Triangle Proportionality Theorem",
            def: "A line parallel to one side of a triangle divides the other two sides proportionally. In △ABC, if DE ∥ BC then AD/DB = AE/EC. Conversely, if AD/DB = AE/EC then DE ∥ BC (the converse may also be used).",
          },
          {
            term: "Indirect measurement",
            def: "Finding a height or distance that cannot be measured directly by using the proportional relationships of similar triangles. Examples: the proportions of shadows cast by sunlight, map scale, and measuring building heights. Real-world problems most often use AA similarity (parallel rays + a right angle).",
          },
        ],
        traps: [
          "Writing the area ratio as if it were the scale factor is a very common error. A scale factor of 2:3 gives an area ratio of 4:9, not 2:3. Memorise 'scale factor = ratio of lengths, area ratio = square of the scale factor,' and remember that if a problem says 'use the area ratio to find the scale factor,' you must take the square root. That is, an area ratio of 25:36 gives a scale factor of 5:6.",
        ],
        example:
          "Two similar triangles △ABC ~ △DEF have scale factor 3:5. If the area of △ABC is 27 cm², find the area of △DEF. Area ratio = square of the scale factor = 3²:5² = 9:25. Proportion: 27/x = 9/25, cross-multiply: 9x = 27 × 25 = 675, x = 75 cm². Therefore the area of △DEF is 75 cm². Even when the scale factor is given as a fraction, square it the same way and set up the proportion.",
      },
    ],
  },
];
