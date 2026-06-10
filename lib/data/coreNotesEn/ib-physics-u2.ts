/**
 * Core Notes English version — IB Physics (DP) Unit 2 (Mechanics).
 * Covers kinematics, forces, energy, and momentum per the IB DP Physics curriculum.
 * All IB content preserved (objectives · terms · traps · formulas · example) with exam-accurate narrative.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u2-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 2,
    lessonNum: 1,
    unitName: "Mechanics",
    title: "Kinematics — Describing Motion with Equations and Graphs",
    subtitle: "How to read and write the relationships between displacement, velocity, and acceleration using graphs and equations — and what the slope and area of s-t, v-t, and a-t graphs actually represent",
    overview:
      "The first question in mechanics is 'how does it move?' — that is kinematics. We are not yet asking why it moves (forces come later). The language of kinematics is displacement, velocity, and acceleration — three vector quantities connected through graphs. The slope of a displacement-time (s-t) graph is velocity; the slope of a velocity-time (v-t) graph is acceleration; and the area under a v-t graph is displacement. Once you truly understand these connections, the SUVAT equations follow naturally. In IB Paper 1 and Paper 2, motion-graph interpretation questions appear every single year without exception.",
    objectives: [
      "Define displacement, velocity, and acceleration as vectors, and distinguish them from their scalar counterparts: distance, speed, and magnitude of acceleration",
      "Explain what the slope and the area under s-t, v-t, and a-t graphs each represent as physical quantities",
      "Select and apply the four SUVAT equations of uniform acceleration to solve problems involving linear motion",
      "Resolve projectile motion into horizontal and vertical components and calculate time of flight, maximum height, and horizontal range",
    ],
    formulas: [
      "v = u + at",
      "s = ut + ½at²",
      "v² = u² + 2as",
      "s = ½(u + v)t",
      "Projectile horizontal: sₓ = uₓt (aₓ = 0)",
      "Projectile vertical: sᵧ = uᵧt − ½gt², vᵧ = uᵧ − gt",
    ],
    sections: [
      {
        title: "Displacement, Velocity, and Acceleration — The Three Languages of Motion",
        subtitle: "Distinguishing scalar distance/speed from vector displacement/velocity/acceleration, and understanding the difference between average and instantaneous values",
        terms: [
          {
            term: "Displacement",
            def: "A vector quantity representing the straight-line distance and direction from the starting point to the ending point. Unit: metres (m). If an object travels a full round trip, the displacement is zero even though the distance is not. Never confuse 'distance travelled' with 'displacement' in IB questions.",
          },
          {
            term: "Average Velocity & Instantaneous Velocity",
            def: "Average velocity = total displacement / time elapsed (v_avg = Δs/Δt). Instantaneous velocity is the limit as the time interval approaches zero — i.e., the slope of the tangent to the s-t graph at a specific point. In IB, 'velocity' without qualification generally means instantaneous velocity.",
          },
          {
            term: "Acceleration",
            def: "The rate of change of velocity per unit time. Because it is a vector, acceleration exists whenever either the magnitude or the direction of velocity changes. a = Δv/Δt. On a v-t graph, acceleration is the slope. 'Deceleration' is everyday language for when acceleration and velocity point in opposite directions; IB simply treats this as negative acceleration.",
          },
          {
            term: "Area Under a v-t Graph",
            def: "The area between a velocity-time curve (or line) and the time axis equals the displacement during that interval. If the graph dips below the time axis, the displacement for that region is negative (opposite direction). Because area = displacement, you can use triangle, rectangle, or trapezoid formulas to compute it.",
          },
        ],
        traps: [
          "When an IB exam asks you to find the 'area' under a v-t graph, adding only the positive areas and ignoring the region below the axis is wrong. A region below the t-axis (negative velocity) represents negative displacement. If the question asks for 'total distance travelled,' add the absolute values of all areas. If it asks for 'net displacement,' sum the areas with their signs. These two conditions are deliberately designed to look similar, so watch for them in multi-choice questions.",
          "On an s-t graph, a horizontal straight line (zero slope) means the object is at rest; a parabolic shape means uniform acceleration. 'Constant slope' means 'constant velocity (uniform motion),' while an increasing slope means the object is accelerating. Trying to read acceleration directly off an s-t graph is incorrect.",
        ],
        example:
          "Practice finding displacement from a v-t graph. Velocity increases linearly from 0 m/s to 12 m/s between 0 s and 4 s, then remains constant at 12 m/s from 4 s to 6 s. The 0–4 s region is a triangle: area = ½ × 4 × 12 = 24 m. The 4–6 s region is a rectangle: area = 2 × 12 = 24 m. Total displacement = 24 + 24 = 48 m. If velocity then changes linearly from 12 m/s to −4 m/s between 6 s and 8 s, you must carefully distinguish total distance from net displacement.",
      },
      {
        title: "Projectile Motion — The Principle of Independence of Horizontal and Vertical Motion",
        subtitle: "Separating the two directions means even a 2-D problem reduces to two independent SUVAT calculations",
        terms: [
          {
            term: "Projectile Motion",
            def: "Two-dimensional motion under gravity alone, with no air resistance. Horizontal direction: zero acceleration, uniform motion (sₓ = uₓt). Vertical direction: acceleration g = 9.8 m/s² downward, apply SUVAT. The only variable linking the two directions is time t.",
          },
          {
            term: "Time of Flight",
            def: "The total time for a projectile to return to the same vertical position from which it was launched. Setting sᵧ = 0 in the vertical SUVAT equation gives t = 2uᵧ/g. Horizontal range is then found by multiplying the horizontal velocity by the time of flight: sₓ = uₓ × t_flight.",
          },
          {
            term: "Maximum Height",
            def: "The highest point reached by the projectile. At this instant, the vertical velocity vᵧ = 0. Substituting into v² = u² + 2as: 0 = uᵧ² − 2gH, so H = uᵧ²/(2g). At the maximum height, only the vertical velocity is zero — the horizontal velocity and the gravitational acceleration both remain unchanged.",
          },
        ],
        traps: [
          "Thinking that 'velocity is zero at the highest point, therefore acceleration is also zero' is one of the most common wrong answers in IB Paper 1. At the maximum height, the vertical velocity (vᵧ) is zero, but the acceleration is still g = 9.8 m/s² downward, and the horizontal velocity (vₓ) is still present. Also, with no air resistance the horizontal acceleration is exactly zero — writing aₓ = g is a clear error.",
        ],
        example:
          "Analyse a projectile launched at 20 m/s at 30° above the horizontal. uₓ = 20 cos30° ≈ 17.3 m/s, uᵧ = 20 sin30° = 10.0 m/s. Maximum height: when vᵧ = 0, H = uᵧ²/(2g) = 100/(2 × 9.8) ≈ 5.1 m. Time of flight: t = 2 × 10.0/9.8 ≈ 2.04 s. Horizontal range: sₓ = 17.3 × 2.04 ≈ 35.3 m. IB Paper 2 frequently asks for these three values in sequence. State the formula used and your sign convention (up = positive) at each step.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u2-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 2,
    lessonNum: 2,
    unitName: "Mechanics",
    title: "Forces and Newton's Three Laws",
    subtitle: "Why things move and why they stop — how to quantitatively analyse every force situation using free-body diagrams and Newton's laws",
    overview:
      "While kinematics describes how an object moves, dynamics explains why it moves. At the heart of that explanation are Newton's three laws. First Law: an object with no net force maintains its state of motion. Second Law: a net force produces acceleration (F = ma). Third Law: forces always act in pairs. Even if you understand all three laws, solving real problems requires drawing accurate free-body diagrams (FBDs). In IB Paper 2, extended-response mechanics questions almost always start with drawing an FBD.",
    objectives: [
      "State each of Newton's three laws and give examples of the situations in which each law applies",
      "Draw a free-body diagram (FBD) showing the magnitude and direction of all forces acting on an object",
      "Calculate the net force and apply F_net = ma to find the acceleration or the magnitude of a force",
      "Distinguish between static friction, kinetic friction, normal force, tension, and weight, and incorporate each correctly into equations",
      "Correctly identify Newton's third law action-reaction pairs and avoid confusing them with forces acting on the same object",
    ],
    formulas: [
      "F_net = ma",
      "W = mg (g ≈ 9.8 m/s²)",
      "Friction: f = μN (μ: coefficient of friction, N: normal force)",
      "Incline components: mg sinθ (along the slope), mg cosθ (perpendicular to slope)",
    ],
    sections: [
      {
        title: "Newton's Three Laws — The Fundamental Principles of Force and Motion",
        subtitle: "Precisely understanding inertia, F = ma, and action-reaction, and identifying the conditions under which each law operates independently",
        terms: [
          {
            term: "Newton's First Law — Law of Inertia",
            def: "An object with zero net force either remains at rest or continues in uniform straight-line motion. This law completely overturns the Aristotelian intuition that 'objects stop if no force acts on them.' Uniform motion (zero acceleration) does not mean there are no forces — it means all forces are in balance.",
          },
          {
            term: "Newton's Second Law",
            def: "The net force acting on an object equals the product of its mass and its acceleration: F_net = ma. Force and acceleration are vectors pointing in the same direction. When multiple forces act, find the net force by vector addition first. A larger mass produces a smaller acceleration for the same force (greater inertia).",
          },
          {
            term: "Newton's Third Law — Action-Reaction",
            def: "If object A exerts a force on object B, then object B exerts a force on object A that is equal in magnitude and opposite in direction. Crucially, these two forces act on different objects. Only one force of the pair should appear in any single object's FBD.",
          },
          {
            term: "Free-Body Diagram (FBD)",
            def: "A diagram in which the object under analysis is represented as a point (or box) and every force acting on it is drawn as an arrow. Arrow length represents magnitude; arrow direction represents the direction of the force. Both contact forces (normal force, friction, tension) and long-range forces (gravity) must be included. If the object is accelerating, the resultant arrow should be the longest.",
          },
        ],
        traps: [
          "The most common Newton's Third Law misconception: in a collision between a truck and a bicycle, students assume 'the truck is bigger, so it exerts a larger force on the bicycle.' According to the Third Law, the two forces are exactly equal in magnitude — the different outcomes arise because the masses (inertia) are different. The bicycle undergoes a large acceleration simply because its mass is small. Answering that 'the truck experiences a larger force' violates the Third Law.",
          "A common FBD error is drawing the reaction force of an action-reaction pair on the same object's FBD. When a book rests on a table: the book's FBD shows gravity (mg) downward and the table's normal force (N) upward. The table's FBD shows the book's reaction force downward. These are two separate FBDs; the force the book exerts on the table must not appear on the book's own FBD.",
        ],
        example:
          "A 5 kg box is pushed horizontally with a force of 20 N. The coefficient of kinetic friction is μ = 0.3. Find the acceleration. Vertical direction: N = mg = 5 × 9.8 = 49 N. Friction force: f = μN = 0.3 × 49 = 14.7 N (opposing motion). F_net = 20 − 14.7 = 5.3 N. a = F_net/m = 5.3/5 = 1.06 m/s² ≈ 1.1 m/s². In IB Paper 2 this type of question is marked in order: draw FBD (2 marks) → set up equations (1 mark) → calculate (1 mark).",
      },
      {
        title: "Inclines, Tension, and Connected Objects — Applied FBD Problems",
        subtitle: "Drawing separate FBDs for each object in a multi-body system and solving the resulting simultaneous equations",
        terms: [
          {
            term: "Normal Force (N)",
            def: "The contact force exerted by a surface on an object, directed perpendicular to the surface. On a horizontal surface N = mg, but on an incline at angle θ, N = mg cosθ. The equality N = mg holds only on a horizontal surface; it changes in inclined or accelerating situations.",
          },
          {
            term: "Tension (T)",
            def: "The pulling force exerted by a string, rope, or cable on an object. In an ideal (massless) string, the tension is the same throughout. For an ideal (massless, frictionless) pulley, the magnitude of tension is unchanged on either side. When two objects A and B are connected by a string, the same tension T appears in both FBDs but points in opposite directions.",
          },
          {
            term: "Friction",
            def: "Static friction: the maximum friction force before motion begins, f_s ≤ μ_s N. Kinetic friction: the friction force while the object is sliding, f_k = μ_k N. In general μ_s > μ_k, so friction decreases slightly once motion begins.",
          },
          {
            term: "System Approach",
            def: "When two objects A and B accelerate together, first find the acceleration of the whole system using F_net = (m_A + m_B)a, then analyse individual FBDs to find internal forces such as tension. This is simpler than setting up simultaneous equations for each object separately from the start.",
          },
        ],
        traps: [
          "Swapping mg sinθ and mg cosθ on incline problems is extremely common. A memory aid: as angle θ increases, the slope gets steeper and the object slides faster, so the component along the slope (mg sinθ) must increase. At θ = 90° (a vertical wall), sinθ = 1, so the full weight mg acts along the 'slope' — which makes intuitive sense. The normal force (mg cosθ) must reach zero at θ = 90°, and cos 90° = 0 confirms this. Always draw the diagram and label the angle carefully.",
        ],
        example:
          "Block A (3 kg) and Block B (5 kg) are connected by a string on a frictionless horizontal surface and pulled by an external force of 16 N. Find the acceleration of the system and the tension in the string. Whole system: a = F/(m_A + m_B) = 16/(3 + 5) = 2.0 m/s². Analysing Block B alone (with A pulling from the front): T = m_B × a = 5 × 2.0 = 10 N. Cross-check with Block A: 16 − T = m_A × a → T = 16 − 3 × 2.0 = 10 N. ✓",
      },
      {
        title: "Changes in Normal Force — Elevators and the Prelude to Circular Motion",
        subtitle: "Using F = ma to explain why apparent weight changes in an accelerating reference frame",
        terms: [
          {
            term: "Apparent Weight",
            def: "The normal force N read by a scale. When accelerating upward, N = m(g + a), so the object feels heavier. When accelerating downward, N = m(g − a), so it feels lighter. In free fall (a = g), N = 0, giving the sensation of weightlessness.",
          },
          {
            term: "Direction of Net Force and Acceleration",
            def: "By F_net = ma, net force and acceleration always point in the same direction. When an elevator accelerates upward, the net force is upward, so N > mg. Conversely, when an elevator is moving upward but decelerating, the acceleration is downward, so N < mg. Always base your equation on the direction of acceleration, not the direction of motion.",
          },
        ],
        traps: [
          "Memorising 'going up means N > mg' is a trap. Even while moving upward, if the elevator is decelerating (speed is decreasing), the acceleration points downward and N = m(g − a) < mg. Always determine the direction of acceleration first, then write F_net = ma in that direction. 'Moving upward' and 'acceleration is upward' are not the same statement.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-physics-u2-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 2,
    lessonNum: 3,
    unitName: "Mechanics",
    title: "Energy, Work, Momentum, and Collisions",
    subtitle: "Using the work-energy theorem, conservation of energy, impulse, and conservation of momentum to predict outcomes without tracking forces at every instant",
    overview:
      "Newton's approach of tracking force and acceleration at every moment is powerful but unwieldy for complex collisions or long paths. Conservation of energy and conservation of momentum are tools that let you compare only the start and end states and still reach the answer. Work is the result of a force moving an object; energy is the capacity to do work. Momentum is the product of mass and velocity; impulse equals the change in momentum. These two conservation laws are core IB DP topics that appear in Paper 2 every year.",
    objectives: [
      "Define work (W = Fs cosθ) and determine the sign of work based on the angle between force and displacement",
      "Calculate kinetic energy (E_k = ½mv²) and gravitational potential energy (E_p = mgh), and apply conservation of energy to find speed or height",
      "Explain the relationship between impulse (J = FΔt = Δp) and momentum (p = mv), and use the area under an F-t graph as impulse",
      "Apply conservation of momentum to elastic and inelastic collisions, and distinguish the two types by whether kinetic energy is conserved",
    ],
    formulas: [
      "W = Fs cosθ",
      "E_k = ½mv²",
      "E_p = mgh",
      "P = W/t = Fv",
      "p = mv",
      "J = FΔt = Δp = mv − mu",
      "Conservation of momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
    ],
    sections: [
      {
        title: "Work and Energy — How Force Transfers into Energy",
        subtitle: "Understanding W = Fs cosθ — why a perpendicular force does zero work",
        terms: [
          {
            term: "Work (W)",
            def: "The work done by a force F acting on an object that undergoes displacement s: W = Fs cosθ, where θ is the angle between the force and displacement vectors. Work is a scalar; its unit is the joule (J = N·m). The cosθ factor is crucial — when force and displacement are perpendicular (θ = 90°), W = 0. Examples: normal force and centripetal force do no work because they are always perpendicular to velocity.",
          },
          {
            term: "Work-Energy Theorem",
            def: "The net work done on an object equals the change in its kinetic energy: W_net = ΔE_k = ½mv² − ½mu². This theorem lets you find the change in speed given the net work, or find the work done given the change in speed.",
          },
          {
            term: "Conservation of Mechanical Energy",
            def: "In the absence of non-conservative forces such as friction, the sum of kinetic and gravitational potential energy is constant: E_k + E_p = constant, or ½mv₁² + mgh₁ = ½mv₂² + mgh₂. When friction is present, some mechanical energy is converted to thermal energy, so it is no longer conserved — add a heat-loss term (Q = f × d) to the energy equation.",
          },
          {
            term: "Power (P)",
            def: "The rate of doing work: P = W/t. Unit: watt (W = J/s). For a constant force F moving at velocity v: P = Fv. Efficiency = useful power output / total power input. IB uses this definition for engine and motor output problems.",
          },
        ],
        traps: [
          "In W = Fs cosθ: θ = 0° gives maximum work; θ = 90° gives zero work; θ = 180° gives negative work (energy is removed from the object, as friction does). If an IB question asks for the work done by the normal force, the answer must be zero — the normal force is always perpendicular to displacement. Simply multiplying force magnitude by distance without the cosθ factor misses this entirely.",
          "The value of E_p = mgh depends on which reference level you choose, but the difference ΔE_p = mgΔh is independent of the reference level. If an IB problem does not specify a reference level, choose a convenient one (e.g., the lowest point in the problem) and state it clearly. Changing the reference level does not change any energy differences, so there is no need to worry about it.",
        ],
        example:
          "A 40 kg student starts from rest at the top of a 10 m slide. Find the speed at the bottom, ignoring friction. Conservation of energy: mgh = ½mv². v = √(2gh) = √(2 × 9.8 × 10) = √196 = 14 m/s. If friction removes 1960 J of mechanical energy: mgh − Q = ½mv² → 40 × 9.8 × 10 − 1960 = ½ × 40 × v² → v² = (3920 − 1960)/20 = 98 → v ≈ 9.9 m/s. In IB Paper 2, the version with friction requires you to explicitly include the energy-loss term in your equation to earn full marks.",
      },
      {
        title: "Momentum, Impulse, and Collisions — Analysing Collisions with Conservation Laws",
        subtitle: "Linking elastic collisions (kinetic energy conserved) and inelastic collisions (kinetic energy lost) through conservation of momentum",
        terms: [
          {
            term: "Momentum (p)",
            def: "A vector equal to the product of mass and velocity: p = mv. Unit: kg·m/s (= N·s). Direction is the same as velocity. When no external net force acts on a system, the total momentum of the system is conserved. This is the law of conservation of momentum, and it is a direct consequence of Newton's Third Law.",
          },
          {
            term: "Impulse (J)",
            def: "The effect of a force acting over time: J = FΔt = Δp. Unit: N·s or kg·m/s. On an F-t graph, the area under the curve is the impulse. If the same change in momentum is produced over a longer contact time, the average force is smaller — this is the principle behind airbags, helmets, and cushioning materials.",
          },
          {
            term: "Elastic Collision",
            def: "A collision in which both momentum and kinetic energy are conserved. Perfectly elastic collisions are only truly achievable at the atomic or molecular level. In IB, when both unknowns (v₁ and v₂) must be found, you must solve the simultaneous equations from both conservation of momentum and conservation of kinetic energy.",
          },
          {
            term: "Perfectly Inelastic Collision",
            def: "A collision in which the two objects stick together and move as one after impact. Momentum is conserved, but kinetic energy loss is at its maximum. Equation: m₁u₁ + m₂u₂ = (m₁ + m₂)v_f. The lost kinetic energy is converted into thermal energy, sound, and deformation (internal energy).",
          },
        ],
        traps: [
          "Dropping the vector sign convention when applying conservation of momentum is the most common source of lost marks in IB Paper 2. If rightward is defined as positive, an object moving leftward must be entered with a negative velocity. This is especially critical when one object reverses direction after a collision — an incorrect sign gives a completely wrong answer. The same applies when finding impulse from an F-t graph: an area below the t-axis represents negative impulse (a decrease in momentum).",
          "Thinking that 'momentum is not conserved in an inelastic collision' is incorrect. Momentum is always conserved as long as there is no external net force on the system. What is not fully conserved in an inelastic collision is kinetic energy. 'Inelastic' means 'kinetic energy is not completely conserved,' not 'momentum is not conserved.' IB Paper 1 multiple-choice questions frequently include distractors designed to exploit exactly this confusion.",
        ],
        example:
          "Ball A (2 kg) moving at 4 m/s collides in a perfectly inelastic collision with stationary Ball B (3 kg). Find the velocity after the collision and the loss in kinetic energy. Conservation of momentum: 2 × 4 + 3 × 0 = (2 + 3) × v_f → v_f = 8/5 = 1.6 m/s. Kinetic energy before: ½ × 2 × 4² = 16 J. Kinetic energy after: ½ × 5 × 1.6² = ½ × 5 × 2.56 = 6.4 J. Loss in kinetic energy = 16 − 6.4 = 9.6 J. If IB asks where the lost energy went, you must state: 'converted into thermal energy and sound (internal energy).'",
      },
    ],
  },
];
