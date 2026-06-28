/**
 * Core Notes ENGLISH version — Honors Physics Unit 2 (Forces & Newton's Laws).
 * Faithful English rendering of the Korean source (objectives · formulas · terms · traps · example).
 * Terms rendered as { term: "English term", def: "English definition" }.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PHYSICS_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-physics-u2-l1",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 2,
    lessonNum: 1,
    unitName: "Forces & Newton's Laws",
    title: "Newton's Three Laws — Completing the Language of Motion",
    subtitle: "Why an object moves, why it stops — force is the answer",
    overview:
      "If kinematics described how an object moves, dynamics now explains why it moves that way. The key to that answer is force, and the relationship between force and motion summarised in three lines is Newton's Laws of Motion. The First Law is the law of inertia — without force, the state is preserved. The Second Law is F = ma — the net force produces acceleration. The Third Law is action–reaction — every force exists in a pair. If you understand these three laws as cause-and-effect rather than rote memory, half of every physics problem solves itself.",
    objectives: [
      "Explain Newton's First Law (the law of inertia) in terms of net force and acceleration, and apply it to rest and constant-velocity motion",
      "Use Newton's Second Law F = ma to compute one of net force, mass, or acceleration",
      "State Newton's Third Law (action–reaction) correctly and confirm that the action–reaction pair acts on two different objects",
      "Derive the unit of force, the newton (N = kg·m/s²), in SI units and use it in numerical calculations",
      "Distinguish cases where the net force is zero from those where it is nonzero, and predict the resulting motion in each",
    ],
    formulas: [
      "ΣF = ma  (Newton's 2nd Law)",
      "W = mg  (Weight)",
      "1 N = 1 kg·m/s²",
    ],
    sections: [
      {
        title: "The First Law — Inertia: No Force, No Change",
        subtitle: "An object at rest stays at rest; an object in motion stays in motion",
        terms: [
          {
            term: "Inertia",
            def: "An object's tendency to keep its current state of motion (rest or constant-velocity straight-line motion). The greater the mass, the greater the inertia, and the more force is needed to change that state.",
          },
          {
            term: "Net force, ΣF",
            def: "The vector sum of all forces acting on an object. If the net force is zero, the acceleration is zero (rest or constant-velocity motion is maintained); if the net force is nonzero, an acceleration arises.",
          },
          {
            term: "Inertial reference frame",
            def: "A frame in which Newton's laws hold as stated — the viewpoint of a non-accelerating observer (one at rest or moving at constant velocity). Care is needed when applying them inside an accelerating bus.",
          },
          {
            term: "Equilibrium",
            def: "A state in which the net force is zero. Static equilibrium is the state of rest; dynamic equilibrium is the state of constant-velocity straight-line motion. Both have ΣF = 0.",
          },
        ],
        traps: [
          "Thinking that no force acts on an object moving at constant velocity is the most common misconception. A car moving at constant speed still has the engine's thrust, friction, air resistance, and more acting on it — it is just that the sum of these forces (the net force) is zero. The idea that 'a force is needed to maintain motion' is Aristotle's error.",
          "Inertia is proportional to mass, not velocity. A fast-moving object does not necessarily have more inertia than a slow one — with equal masses, the inertia is equal. Without force, any speed is maintained.",
        ],
        example:
          "A 5 kg box slides to the right at a constant 3 m/s on a frictionless horizontal surface. What is the net force on the box? Solution: since the velocity is constant, the acceleration a = 0. By the Second Law, ΣF = ma = 5 × 0 = 0 N. This does not mean no forces act — gravity and the normal force cancel each other, so the net force is zero.",
      },
      {
        title: "The Second and Third Laws — F = ma and Action–Reaction",
        subtitle: "Net force determines acceleration, and every force exists in a pair",
        terms: [
          {
            term: "Newton's 2nd Law",
            def: "The net force applied to an object equals mass × acceleration: ΣF = ma. Force and acceleration are vectors in the same direction, and mass is always a positive scalar.",
          },
          {
            term: "Weight, W",
            def: "The force of Earth's gravity on an object, W = mg. Unlike mass (kg), it has units of force (N) and always points downward (toward the centre). Mass does not change with location, but weight changes where g differs (e.g. on the Moon).",
          },
          {
            term: "Newton's 3rd Law",
            def: "If object A exerts a force on B, then B exerts on A a force equal in magnitude and opposite in direction (action = reaction). The two forces always act on two different objects; they are equal in magnitude, but the resulting accelerations differ according to mass.",
          },
          {
            term: "Action–reaction pair",
            def: "The bundle of two forces linked by the Third Law. To be a true action–reaction pair, they must (1) be equal in magnitude, (2) be opposite in direction, and (3) act on two different objects.",
          },
        ],
        traps: [
          "An action–reaction pair does not cancel in the net-force calculation for a single object, because the two forces act on different objects. For example, if I push a wall (action) the wall pushes me back (reaction), but these two forces act on different objects (the wall and me) — they cannot be combined.",
          "In F = ma, F is not a single force but always the net force (ΣF). When several forces act at once, beware of substituting each force individually. You must first find the vector sum and set it equal to ma.",
        ],
        example:
          "A 10 kg box is pulled simultaneously by 50 N to the right and 20 N to the left. Find the acceleration of the box. Set rightward as positive. ΣF = 50 − 20 = 30 N (right). a = ΣF / m = 30 / 10 = 3 m/s² (right). Third-Law check: the forces the box exerts on each rope are 50 N (left) and 20 N (right) — equal in magnitude and opposite in direction — but these act on the ropes, not on the box.",
      },
    ],
  },
  {
    lessonId: "honors-physics-u2-l2",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 2,
    lessonNum: 2,
    unitName: "Forces & Newton's Laws",
    title: "Free-Body Diagrams and the Normal & Friction Forces",
    subtitle: "A single FBD solves half of every mechanics problem",
    overview:
      "The first step in applying Newton's laws to a real problem is always to draw a Free-Body Diagram (FBD). An FBD picks out the single object you want to analyse and draws every force actually acting on it as an arrow. Two forces that cannot be omitted here are the normal force and the friction force. The normal force is the push of a contact surface on the object; the friction force is the force at the contact surface that opposes motion. Only once you can draw these two forces accurately on an FBD can you solve incline and tension problems without getting stuck.",
    objectives: [
      "Draw a Free-Body Diagram (FBD) correctly and indicate the direction and relative magnitude of every force acting on the object",
      "Explain that the normal force is always perpendicular to the contact surface and is not always equal to the weight",
      "Explain the difference between static friction and kinetic friction and compute the maximum of each",
      "Use the coefficient of friction (μ) and the normal force to find the magnitude of the friction force and apply it to an FBD",
      "Draw an FBD for an object on a horizontal surface under a horizontal force and find the acceleration with ΣF = ma",
    ],
    formulas: [
      "f_s ≤ μ_s N  (static friction)",
      "f_k = μ_k N  (kinetic friction)",
      "N = mg  (normal force on a flat surface)",
    ],
    sections: [
      {
        title: "Free-Body Diagram (FBD) — Making Forces Visible",
        subtitle: "Isolate the object of analysis and draw only the forces acting on it as arrows",
        terms: [
          {
            term: "Free-Body Diagram (FBD)",
            def: "A diagram that represents the object of analysis as a dot or box and shows every force acting on it as a vector arrow. Only the force of an action–reaction pair that acts on the object being analysed should be included.",
          },
          {
            term: "Normal force, N",
            def: "The force with which a contact surface pushes the object away, at the contact between the object and the surface. It is always perpendicular to the contact surface, and its magnitude varies with the situation (it may differ from mg on an incline, under added force, or while accelerating).",
          },
          {
            term: "Tension, T",
            def: "The force with which a rope, string, or cable pulls an object. Its direction is always along the rope (pulling toward the object), and its magnitude is the same at both ends of the rope (assuming a massless rope).",
          },
          {
            term: "Contact vs. non-contact force",
            def: "The normal force, friction, and tension are contact forces that require direct contact. Gravity is the representative example of a non-contact force (field force) that acts without contact.",
          },
        ],
        traps: [
          "The most common FBD mistake is including the force the object exerts (the action) on that object's own FBD. For example, the force a box presses on the floor belongs on the floor's FBD, while the box's FBD should show only the normal force the floor pushes up on the box. Draw only the forces coming into the object being analysed.",
          "The normal force equalling the weight (mg) is a special case that holds only for an object at rest on a horizontal surface. On an incline, under an added vertical force, or while accelerating vertically, N ≠ mg. After drawing the FBD, you must find N directly from the vertical ΣF = ma.",
        ],
        example:
          "An 8 kg box rests on a horizontal surface. Draw the FBD and find the normal force. Forces acting: (1) weight W = mg = 8 × 10 = 80 N (down), (2) normal force N (up). Vertical ΣF = 0 (at rest, a = 0): N − 80 = 0 → N = 80 N. Now add an extra upward force of 30 N: N + 30 − 80 = 0 → N = 50 N. Notice that the normal force has decreased.",
      },
      {
        title: "Friction — The Real-World Force That Opposes Motion",
        subtitle: "Since μ_s > μ_k, the moment of breaking free from rest is the hardest",
        terms: [
          {
            term: "Static friction, f_s",
            def: "The friction between a not-yet-moving object and a contact surface. As the applied force grows, it grows to match, until the moment it exceeds the maximum static friction f_s(max) = μ_s N, when the object starts to slide.",
          },
          {
            term: "Kinetic friction, f_k",
            def: "The friction between an already-sliding object and a contact surface. Its magnitude is constant, f_k = μ_k N, and it always opposes the direction of motion. Generally μ_k < μ_s, so kinetic friction < maximum static friction.",
          },
          {
            term: "Coefficient of friction, μ",
            def: "A dimensionless constant representing the roughness of two contact surfaces. There are two — the coefficient of static friction μ_s and the coefficient of kinetic friction μ_k — and always μ_s ≥ μ_k.",
          },
          {
            term: "Direction of friction",
            def: "Friction always opposes the object's actual (or intended) direction of motion. An object moving right experiences leftward friction, and a stationary object on the verge of sliding right experiences leftward static friction too.",
          },
        ],
        traps: [
          "In the friction formula f = μN, N is the normal force, not the weight (mg). On an incline or with an added vertical force, N ≠ mg, so you must always find N from the FBD first and then compute the friction.",
          "Static friction is f_s ≤ μ_s N, not f_s = μ_s N. The value μ_s N is the maximum static friction, not a value it always takes. As long as the object is not yet moving, static friction exactly matches the applied force, taking whatever magnitude makes the net force zero.",
        ],
        example:
          "A 10 kg box (μ_s = 0.5, μ_k = 0.3) rests on a horizontal surface. Use g = 10 m/s². (1) What minimum horizontal force is needed to move it? (2) Once moving, if a 60 N force is maintained, what is the acceleration? Solution: N = mg = 100 N. (1) f_s(max) = μ_s N = 0.5 × 100 = 50 N. It must exceed 50 N to move, so the minimum horizontal force is just above 50 N. (2) f_k = μ_k N = 0.3 × 100 = 30 N. ΣF = 60 − 30 = 30 N. a = ΣF / m = 30 / 10 = 3 m/s².",
      },
    ],
  },
  {
    lessonId: "honors-physics-u2-l3",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 2,
    lessonNum: 3,
    unitName: "Forces & Newton's Laws",
    title: "Inclines, Tension, and Connected Bodies — Applying Newton's Laws",
    subtitle: "Resolving forces on an incline, pulley-connected bodies, and complete net-force analysis",
    overview:
      "The real skill in Newton's laws shows up in application problems. Inclined-plane problems hinge on resolving gravity into components along and perpendicular to the slope, while two-body pulley problems hinge on drawing a separate FBD for each object and tying them together through tension as a shared unknown. Master these two types completely and 70–80% of the mechanics exam questions in Honors Physics solve themselves. Today, fully master the two tools of force decomposition and FBD-based systems of equations.",
    objectives: [
      "Resolve the gravity acting on an object on an incline into a component parallel to the slope (mg sinθ) and a component perpendicular to it (mg cosθ)",
      "Compute the normal force and acceleration of an object on an incline using ΣF = ma",
      "Draw an FBD for an incline problem with friction and set up ΣF = ma in each direction to solve it",
      "For a two-body system connected by a pulley, draw each object's FBD and solve for the acceleration and tension using simultaneous equations",
      "Explain the advantage, in net-force analysis, of aligning the coordinate system with the direction of the incline",
    ],
    formulas: [
      "mg sinθ  (gravity component parallel to the incline)",
      "mg cosθ  (gravity component perpendicular to the incline)",
      "N = mg cosθ  (normal force on an incline)",
      "a = (m₁ − m₂)g / (m₁ + m₂)  (Atwood machine acceleration)",
    ],
    sections: [
      {
        title: "The Incline — Resolve Gravity into Two Directions",
        subtitle: "Tilt the coordinate system to match the incline and the equations become extremely simple",
        terms: [
          {
            term: "Force decomposition",
            def: "Splitting one force vector into two perpendicular components. In incline problems, gravity W = mg is resolved into (1) the component parallel to the slope, mg sinθ, and (2) the component perpendicular to the slope, mg cosθ.",
          },
          {
            term: "Angle of incline, θ",
            def: "The angle the incline makes with the horizontal. As sinθ grows (the steeper the slope), the down-slope force (mg sinθ) grows, and as cosθ shrinks, the normal force N = mg cosθ shrinks too.",
          },
          {
            term: "Normal force on an incline",
            def: "The force with which the incline pushes the object, perpendicular to the slope. From vertical-direction equilibrium, N = mg cosθ. At θ = 0 (horizontal) N = mg; at θ = 90° (vertical wall) N = 0.",
          },
          {
            term: "Net force along the incline",
            def: "The net force acting along the slope. With no friction, ΣF∥ = mg sinθ (down-slope). With friction, ΣF∥ = mg sinθ − f_k = mg sinθ − μ_k mg cosθ = mg(sinθ − μ_k cosθ).",
          },
        ],
        traps: [
          "Substituting θ into sinθ and cosθ the wrong way around is a very frequent mistake. The parallel-to-slope component is sinθ, and the perpendicular component (normal-force direction) is cosθ. Memory aid: the steeper the slope (θ increases), the greater the force sliding it down — because sinθ increases.",
          "On an incline, the normal force is always perpendicular to the slope, not vertically upward. Because the incline is tilted, the direction of N is tilted too. Beware of drawing N straight up on the FBD.",
        ],
        example:
          "A 5 kg object sits on a frictionless incline at θ = 30° (g = 10 m/s²). Find the acceleration down the slope. Parallel-direction ΣF = mg sinθ = 5 × 10 × sin30° = 5 × 10 × 0.5 = 25 N. a = ΣF / m = 25 / 5 = 5 m/s². Normal force: N = mg cosθ = 5 × 10 × cos30° = 50 × (√3/2) ≈ 43.3 N. Check: if θ = 0° then a = 0 (no sliding on a horizontal surface); if θ = 90° then a = g = 10 m/s² (free fall) — extreme cases confirm the result.",
      },
      {
        title: "Connected Bodies and Pulleys — Tying the Whole System into Equations",
        subtitle: "Two bodies joined by a rope share the same acceleration, which is what makes a system of equations possible",
        terms: [
          {
            term: "Atwood machine",
            def: "A system of two masses m₁, m₂ connected by a rope over a pulley (pulley and rope mass neglected). If m₁ > m₂, then m₁ accelerates down and m₂ accelerates up, and the magnitudes of the two accelerations are equal. a = (m₁ − m₂)g / (m₁ + m₂).",
          },
          {
            term: "Tension, T",
            def: "The force with which a rope connecting two objects pulls each of them. In an ideal massless rope, the tension magnitude is the same throughout the rope. On each object's FBD, T is drawn in the direction the rope pulls.",
          },
          {
            term: "System approach",
            def: "Treating the two connected bodies as one system and finding the acceleration first from the external forces alone, ignoring the internal force (tension): a = ΣF_external / m_total. After finding the acceleration, compute the tension from an individual FBD.",
          },
        ],
        traps: [
          "In an Atwood machine the two bodies' accelerations are equal in magnitude but opposite in direction. If you take downward as positive on one body's FBD, then upward is positive on the other. Keep your direction conventions consistent and set the positive direction for each body to match the direction it accelerates, and the equations come out clean.",
          "The accelerations of two rope-connected bodies being equal in magnitude holds only when the rope length is fixed. In complex pulley systems with multiple pulleys or a mechanical advantage, this condition can change.",
        ],
        example:
          "In an Atwood machine, m₁ = 6 kg (right side, down) and m₂ = 4 kg (left side, down), g = 10 m/s². Find the system acceleration and the rope tension. System approach: a = (m₁ − m₂)g / (m₁ + m₂) = (6 − 4)(10) / (6 + 4) = 20/10 = 2 m/s². For m₁ with down positive: m₁g − T = m₁a → T = m₁(g − a) = 6(10 − 2) = 48 N. Check (m₂, up positive): T − m₂g = m₂a → T = m₂(g + a) = 4(10 + 2) = 48 N. The two values agree, confirming the answer.",
      },
    ],
  },
];
