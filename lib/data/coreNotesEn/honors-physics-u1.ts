/**
 * Core Notes ENGLISH version — Honors Physics Unit 1 (Kinematics — 1D Motion).
 * Faithful English rendering of the Korean source (objectives · formulas · terms · traps · example).
 * Terms rendered as { term: "English term", def: "English definition" }.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PHYSICS_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-physics-u1-l1",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 1,
    lessonNum: 1,
    unitName: "Kinematics — 1D Motion",
    title: "Distance, Displacement, and Velocity — Describing Motion with Numbers",
    subtitle: "If you don't grasp the difference between scalars and vectors, all of physics becomes shaky",
    overview:
      "The first thing you learn in physics is kinematics — the science of describing how an object moves. You don't need to know about forces or energy yet; at this stage you are only learning the language that describes motion: position, distance, and velocity. The key insight is a single one: for every physical quantity, those that have only magnitude (scalars) and those that have both magnitude and direction (vectors) are handled in completely different ways. Once this distinction becomes second nature, you will stop making the classic mistake of confusing speed with velocity.",
    objectives: [
      "Distinguish distance from displacement and compute each one for a given path of motion",
      "Explain the difference between speed and velocity in terms of scalars and vectors, and compute their averages using the correct formulas",
      "Compare the definitions of scalars and vectors and correctly classify physical quantities in a given situation",
      "Use signs (+/−) to represent direction in one-dimensional motion and apply them to displacement calculations",
      "Explain the difference between average velocity and instantaneous velocity using the concept of the time interval",
    ],
    formulas: [
      "Δx = x_f − x_i  (displacement)",
      "v̄ = Δx / Δt  (average velocity)",
      "s̄ = d / Δt  (average speed)",
    ],
    sections: [
      {
        title: "Distance vs. Displacement — The Whole Path vs. Start and End",
        subtitle: "Displacement is not how far you travelled but from where to where you went",
        terms: [
          {
            term: "Distance",
            def: "The total length of the path actually travelled by an object. It is a scalar that ignores direction and is always non-negative (≥ 0).",
          },
          {
            term: "Displacement",
            def: "The straight-line change in position from the starting point to the final point: Δx = x_f − x_i. It is a vector with both magnitude and direction, and it can be negative.",
          },
          {
            term: "Scalar",
            def: "A physical quantity fully described by magnitude alone. Distance, time, mass, speed, and temperature are examples.",
          },
          {
            term: "Vector",
            def: "A physical quantity that requires both magnitude and direction. Displacement, velocity, acceleration, and force are typical examples; in one dimension, direction is indicated by a sign (+/−).",
          },
        ],
        traps: [
          "The most common mistake is writing distance and displacement as equal in a round trip. If you walk from home to school (3 km) and back home, the distance is 6 km but the displacement is 0 km. Whenever the start and end points coincide, the displacement is always zero.",
          "Displacement can be negative. If rightward is defined as positive in one dimension, then a movement to the left gives a negative displacement. Remember that the sign carries the direction.",
        ],
        example:
          "Cheolsu starts at x = 0, walks 7 m to the right to reach x = 7 m, then walks 4 m back to the left and stops at x = 3 m. The distance is 7 + 4 = 11 m (the whole path). The displacement is Δx = 3 − 0 = +3 m (the straight-line change from start to end). Use this example to lock in that distance ≠ displacement.",
      },
      {
        title: "Speed vs. Velocity — How Fast vs. How Fast and In What Direction",
        subtitle: "The scalar/vector distinction is what separates speed from velocity",
        terms: [
          {
            term: "Average speed",
            def: "The total distance travelled divided by the time taken: s̄ = d / Δt. It is a directionless scalar and is always ≥ 0.",
          },
          {
            term: "Average velocity",
            def: "The displacement divided by the time taken: v̄ = Δx / Δt. It is a vector that includes direction and can be negative.",
          },
          {
            term: "Instantaneous velocity",
            def: "The limit of Δx/Δt as Δt → 0. It equals the slope of the tangent to a single point on a position–time graph.",
          },
        ],
        traps: [
          "The magnitudes of average speed and average velocity are not always equal. For a round trip where the displacement is zero, the average velocity is zero but the average speed is positive. Writing 'if average velocity is zero then the object was at rest' on an exam is incorrect.",
          "The magnitude of velocity (|v|) is speed — but average speed differs from the 'magnitude of average velocity'. The magnitude of average velocity = |v̄| = |Δx|/Δt, whereas average speed = total distance/Δt. These two values can differ unless the path is a straight line.",
        ],
        example:
          "A runner goes 100 m east in 20 s, then 60 m west in 10 s (east = +). Find the average speed and the average velocity for the full trip. Total distance = 100 + 60 = 160 m over Δt = 30 s, so average speed = 160 / 30 = 5.3 m/s. Displacement = +100 − 60 = +40 m, so average velocity = 40 / 30 = +1.3 m/s (eastward). The two differ because the path was not a straight line — this is exactly why 'speed = magnitude of average velocity' is false in general.",
      },
    ],
  },
  {
    lessonId: "honors-physics-u1-l2",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 1,
    lessonNum: 2,
    unitName: "Kinematics — 1D Motion",
    title: "Acceleration and the Kinematic Equations",
    subtitle: "How to make the four equations of uniformly accelerated motion truly your own",
    overview:
      "The heart of kinematics is handling motion in which the velocity changes — that is, motion with acceleration. In uniformly accelerated motion, just four equations let you find any unknown among position, velocity, time, and acceleration. If you understand why these four equations hold rather than merely memorising them, you can apply them far faster. In today's lesson we pin down exactly which combination of variables each equation is used for, and what the sign of the acceleration really means.",
    objectives: [
      "Define acceleration as the rate of change of velocity, including its magnitude and direction",
      "List the four kinematic equations of uniformly accelerated motion and identify the variables contained in each",
      "Organise the known and unknown variables in a given problem, then select the appropriate kinematic equation to solve it",
      "Analyse how the sign (+/−) of acceleration connects to speeding up, slowing down, and reversal of direction",
      "Explain that the average-velocity formula v̄ = (v₀ + v)/2 holds only under the condition of uniform acceleration",
    ],
    formulas: [
      "v = v₀ + at",
      "x = x₀ + v₀t + ½at²",
      "v² = v₀² + 2aΔx",
      "x = x₀ + ½(v₀ + v)t",
    ],
    sections: [
      {
        title: "Acceleration — The Rate of Change of Velocity",
        subtitle: "The sign of acceleration tells you the direction, not whether speed increases",
        terms: [
          {
            term: "Acceleration",
            def: "The change in velocity per unit time: a = Δv / Δt. It is a vector; when it points the same way as the velocity the object speeds up, and when it points the opposite way the object slows down (decelerates).",
          },
          {
            term: "Uniformly accelerated motion",
            def: "Motion in which the magnitude and direction of the acceleration stay constant over time. Only when this condition holds can the four kinematic equations be applied directly.",
          },
          {
            term: "Deceleration",
            def: "A situation in which the speed (magnitude of velocity) decreases. It does not mean the acceleration is negative — it refers to the case where the acceleration opposes the velocity. If a negative acceleration acts while moving in the negative direction, the object actually speeds up.",
          },
          {
            term: "Initial / Final velocity",
            def: "In a kinematics problem, the velocity v₀ at the start of the analysed interval and the velocity v at its end. 'Starting from rest' means v₀ = 0; 'until it stops' means v = 0.",
          },
        ],
        traps: [
          "It is wrong to say a negative acceleration always means deceleration. With rightward set as the positive direction, an object moving left that experiences a leftward (negative) acceleration actually speeds up. The criterion for speeding up vs. slowing down is whether velocity and acceleration point the same way (speed up) or opposite ways (slow down).",
          "The kinematic equations are valid only under uniform acceleration. Applying these formulas to a problem where the acceleration changes with time produces a wrong answer.",
        ],
        example:
          "A car starts from rest (v₀ = 0) and travels in a straight line for 5.0 s at a constant acceleration a = 3.0 m/s². Find the final velocity and the distance travelled. Final velocity: v = v₀ + at = 0 + (3.0)(5.0) = 15 m/s. Distance: x = v₀t + ½at² = 0 + ½(3.0)(5.0)² = 37.5 m. You can also check with v² = v₀² + 2aΔx → (15)² = 0 + 2(3.0)Δx → Δx = 225/6 = 37.5 m.",
      },
      {
        title: "Choosing the Right Kinematic Equation",
        subtitle: "Knowing three of the five variables (x, v₀, v, a, t) lets you find the other two",
        terms: [
          {
            term: "Kinematic variable list",
            def: "Every uniform-acceleration problem is described by the five variables Δx, v₀, v, a, t. Each equation links four of them, so knowing three lets you solve for the remaining one.",
          },
          {
            term: "Time-independent equation",
            def: "v² = v₀² + 2aΔx — the equation that contains no time t. Choose this immediately when time information is not given or not needed.",
          },
          {
            term: "Average velocity for constant acceleration",
            def: "v̄ = (v₀ + v)/2. This holds only under uniform acceleration, and using it derives the equation x = x₀ + ½(v₀ + v)t.",
          },
        ],
        traps: [
          "v̄ = (v₀ + v)/2 can be used only for uniformly accelerated motion. If the acceleration is not constant, this formula does not hold. Do not use it when the velocity–time graph is a curve rather than a straight line.",
        ],
        example:
          "A car moving at v₀ = 30 m/s brakes uniformly and stops (v = 0) over a distance of Δx = 90 m. Find the acceleration. Here time is neither given nor asked, so choose the time-independent equation v² = v₀² + 2aΔx. Substituting: 0² = (30)² + 2a(90), so 0 = 900 + 180a, giving a = −900/180 = −5.0 m/s². The negative sign means the acceleration opposes the motion (braking). Recognising that no t appears is the cue to pick this equation immediately.",
      },
    ],
  },
  {
    lessonId: "honors-physics-u1-l3",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 1,
    lessonNum: 3,
    unitName: "Kinematics — 1D Motion",
    title: "Free Fall and Motion Graphs",
    subtitle: "The slope and the area of a graph hold an entire set of kinematic variables",
    overview:
      "Free fall is the idealised situation in which only Earth's gravity acts; neglecting air resistance, every object falls with the same acceleration g ≈ 9.8 m/s². It is the single most important real example of uniformly accelerated motion. The ability to read position–time (x–t) and velocity–time (v–t) graphs is demanded repeatedly across all of physics — you must understand completely what the slope means and what the area under the curve means, because that understanding transforms your problem-solving speed.",
    objectives: [
      "Define free fall as uniformly accelerated motion and use g ≈ 9.8 m/s² (downward) to solve falling and projectile problems",
      "Explain that the slope of a position–time graph is velocity, and interpret the state of motion from the sign and change in slope",
      "Explain that the slope of a velocity–time graph is acceleration, and apply the fact that the area under it is displacement",
      "Draw motion graphs (x–t, v–t) from a verbal description of motion, or conversely describe the motion from a graph",
    ],
    formulas: [
      "a = −g ≈ −9.8 m/s²  (free fall, up = +)",
      "v = v₀ − gt",
      "y = y₀ + v₀t − ½gt²",
      "v² = v₀² − 2gΔy",
    ],
    sections: [
      {
        title: "Free Fall — Uniformly Accelerated Motion Under Gravity Alone",
        subtitle: "Whether a feather or a stone, with no air resistance they fall with the same acceleration",
        terms: [
          {
            term: "Free fall",
            def: "Motion under gravity alone when air resistance is neglected. Both upward and downward motion are classified as free fall, and the object has a constant acceleration g ≈ 9.8 m/s² independent of its mass.",
          },
          {
            term: "Gravitational acceleration, g",
            def: "The magnitude of the acceleration of an object in free fall near Earth's surface, g ≈ 9.8 m/s² ≈ 10 m/s² (approximation). Its direction is always toward Earth's centre (downward); taking up as positive, it is written a = −g.",
          },
          {
            term: "Velocity at maximum height",
            def: "The instant when an object thrown upward reaches v = 0 at its highest point. Even at this instant the acceleration is still g (downward), unchanged — the acceleration does not become zero.",
          },
          {
            term: "Symmetry of free fall",
            def: "The property in air-resistance-free fall that the rise time = the fall time and the launch speed = the landing speed. It is useful for checking calculations.",
          },
        ],
        traps: [
          "Instantaneous velocity being zero at the highest point does not mean the acceleration is zero. Even at the top, the acceleration is still −g ≈ −9.8 m/s². Writing that the acceleration is also zero at the instant the velocity is zero loses marks.",
          "Always write g as a positive value (9.8 m/s²) and apply the sign in the equation according to your coordinate setup. If up is positive then a = −9.8 m/s²; if down is positive then a = +9.8 m/s². Do not switch your convention within a single problem.",
        ],
        example:
          "A ball is thrown straight up from the ground at v₀ = 20 m/s (up = +, g = 10 m/s²). Find the maximum height and the time to return to the ground. Maximum height: v = 0 → 0² = (20)² − 2(10)Δy → Δy = 400/20 = 20 m. Rise time: 0 = 20 − 10t → t = 2 s. By symmetry, total flight time = 4 s. Check: y = 20(4) − ½(10)(4)² = 80 − 80 = 0 m (confirms return to the ground).",
      },
      {
        title: "Motion Graphs — Slope and Area Are the Kinematic Variables",
        subtitle: "Slope of an x–t graph → velocity; slope of a v–t graph → acceleration; area → displacement",
        terms: [
          {
            term: "Slope of an x–t graph",
            def: "The slope of an x–t graph (Δx/Δt) represents velocity. A positive slope means motion in the positive direction, a negative slope means motion in the negative direction, and zero means at rest. If the slope grows steeper (the curve is concave up), the object is accelerating in the positive direction.",
          },
          {
            term: "Slope of a v–t graph",
            def: "The slope of a v–t graph (Δv/Δt) represents acceleration. Uniformly accelerated motion gives a straight-line v–t graph, and the sign of the slope indicates the direction of the acceleration.",
          },
          {
            term: "Area under a v–t graph",
            def: "The area between a v–t graph and the time axis (its integral) represents displacement. Area above the time axis is positive displacement; area below it is negative displacement.",
          },
          {
            term: "At rest vs. instantaneous v = 0",
            def: "A point where the slope of an x–t graph is zero means the velocity is zero at that instant, but it does not necessarily mean the object is permanently at rest. It may be the fleeting moment of reversing direction, like the highest point of free fall.",
          },
        ],
        traps: [
          "On an x–t graph, an interval where the slope of the curve is not constant does not have zero acceleration. An increasing slope means increasing velocity = positive acceleration; a decreasing slope means decreasing velocity = acceleration opposite to velocity. The 'curvature' of an x–t graph represents acceleration.",
          "The area under a v–t graph is displacement, not distance. Where the graph dips below the time axis, that area is negative displacement (motion in the opposite direction). To find distance, you must add the absolute values of all the areas.",
        ],
        example:
          "On a v–t graph, an object's velocity changes uniformly from +10 m/s at 0 s to −10 m/s at 5 s. (1) Find the acceleration. (2) Find the displacement over the 5 s. Solution: (1) a = Δv/Δt = (−10 − 10)/5 = −4 m/s². (2) Area method: the graph crosses v = 0 at t = 2.5 s. Triangle from 0–2.5 s (above): ½(2.5)(10) = +12.5 m. Triangle from 2.5–5 s (below): ½(2.5)(10) = −12.5 m. Displacement = 12.5 + (−12.5) = 0 m. Check with the formula: Δx = v₀t + ½at² = 10(5) + ½(−4)(25) = 50 − 50 = 0 m.",
      },
    ],
  },
];
