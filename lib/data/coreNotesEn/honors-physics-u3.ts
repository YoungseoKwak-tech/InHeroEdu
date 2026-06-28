/**
 * Core Notes ENGLISH version — Honors Physics Unit 3 (Work, Energy & Momentum).
 * Faithful English rendering of the Korean source (objectives · formulas · terms · traps · example).
 * Terms rendered as { term: "English term", def: "English definition" }.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_PHYSICS_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-physics-u3-l1",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 3,
    lessonNum: 1,
    unitName: "Work, Energy & Momentum",
    title: "Work and the Work-Energy Theorem — When Force Meets Distance, It Becomes Energy",
    subtitle: "W = Fd cosθ alone lets you explain not 'how hard' but 'how much it changed'",
    overview:
      "If Newton's Second Law dealt with instantaneous force and acceleration, this unit deals with the accumulation of change. Its starting point is work. Work is the amount of energy transferred when a force moves an object through some distance. The key formula is W = Fd cosθ — it captures the magnitude of the force, the magnitude of the displacement, and the angle between the two vectors all at once. From this comes the insight that when θ = 90°, cosθ = 0 so the work is zero; that is, forces perpendicular to the motion, like the normal force or a centripetal force, do no work. And the work-energy theorem proves that the net work equals the change in kinetic energy. With this one theorem you can find a change in speed without ever computing acceleration, dramatically speeding up your problem-solving.",
    objectives: [
      "Use the definition of work W = Fd cosθ to compute the work done by a force at various angles",
      "Distinguish positive work, negative work, and zero work by the directional relationship between force and displacement",
      "Compute kinetic energy KE = ½mv² and verify its units (J = kg·m²/s²)",
      "Use the work-energy theorem (W_net = ΔKE) to find net work or a change in speed",
      "Use the definition of power P = W/t = Fv to compute the rate of energy transfer",
    ],
    formulas: [
      "W = Fd cosθ  (Work)",
      "KE = ½mv²  (Kinetic Energy)",
      "W_net = ΔKE = KE_f − KE_i  (Work-Energy Theorem)",
      "P = W/t = Fv  (Power)",
      "1 J = 1 N·m = 1 kg·m²/s²",
    ],
    sections: [
      {
        title: "Work — Energy Is Transferred Only When Force Meets Displacement",
        subtitle: "No matter how large the force, with no displacement the work is zero — the physical meaning of W = Fd cosθ",
        terms: [
          {
            term: "Work, W",
            def: "The energy transferred when a force F acts on an object while the object moves through a displacement d. W = Fd cosθ, where θ is the angle between the force vector and the displacement vector. Its unit is the joule (J = N·m), and it is a scalar.",
          },
          {
            term: "Positive vs. Negative Work",
            def: "If the force component is along the direction of motion, the work is positive (energy added); if opposite, the work is negative (energy removed). Example: friction opposes the motion, so it always does negative work and reduces kinetic energy.",
          },
          {
            term: "Kinetic Energy, KE",
            def: "The energy a moving object possesses. KE = ½mv², proportional to mass and to the square of the speed. Doubling the speed quadruples the kinetic energy. Its unit is the joule, and it is always non-negative (≥ 0).",
          },
          {
            term: "Work-Energy Theorem",
            def: "The net work done on an object (the sum of the work by all forces) equals the change in its kinetic energy: W_net = ΔKE = ½mv_f² − ½mv_i². Thanks to this theorem you need only the initial/final speeds and the work, without computing the intermediate acceleration.",
          },
        ],
        traps: [
          "Work is not force × distance but force × displacement × cosθ. The normal force (N) points vertically while the motion is horizontal, so θ = 90°, cosθ = 0 → the work done by the normal force = 0. Beware the trap of selecting 'the normal force also does work' on an exam.",
          "The W in the work-energy theorem is the net work, not the work done by a single specific force. When several forces act at once, you must find the work of each and add them. With friction present, the negative work done by friction must always be included.",
        ],
        example:
          "A 4 kg object starts from rest on a horizontal surface. A horizontal force of 20 N acts over 5 m, while a kinetic friction of 4 N acts over the same interval (g = 10 m/s²). Find the final speed. W_applied = 20 × 5 × cos0° = 100 J. W_friction = 4 × 5 × cos180° = −20 J. W_net = 100 + (−20) = 80 J. Work-energy theorem: 80 = ½ × 4 × v² − 0 → v² = 40 → v = √40 ≈ 6.32 m/s. Much faster than the FBD + F = ma method.",
      },
      {
        title: "Power — How Fast Energy Is Transferred",
        subtitle: "The same work done faster means greater power — P = W/t = Fv",
        terms: [
          {
            term: "Power, P",
            def: "The work done or energy transferred per unit time. P = W/t = ΔE/t. Its unit is the watt (W = J/s = kg·m²/s³). When applying a force F at constant speed v, it can also be written P = Fv.",
          },
          {
            term: "Watt, W",
            def: "The SI unit of power. 1 W = 1 J/s. The practical unit horsepower (hp) is also used, with 1 hp ≈ 746 W. The 'power consumption' of a bulb, engine, or motor is exactly this quantity, power.",
          },
          {
            term: "Average vs. Instantaneous Power",
            def: "Average power P_avg = W_total / t_total. Instantaneous power is the power over a very short time, P = Fv (when speed v and force F are in the same direction). If a problem gives 'v = constant', use P = Fv directly.",
          },
        ],
        traps: [
          "P = Fv holds when force and velocity are in the same direction (θ = 0°). In general, P = Fv cosθ. When an engine pushes a vehicle horizontally and the car moves horizontally, θ = 0, so P = Fv is exact.",
          "Do not confuse power with energy (work). Energy (J) is 'how much'; power (W = J/s) is 'how fast'. A weak force acting for a long time can transfer a large amount of energy, while a large power acting for a short time can transfer little total energy.",
        ],
        example:
          "A 70 kg athlete climbs a flight of stairs 10 m high in 8 seconds (g = 10 m/s²). Find (1) the work done and (2) the average power. (1) Work done against gravity = increase in potential energy = mgh = 70 × 10 × 10 = 7000 J. (2) P_avg = W/t = 7000 / 8 = 875 W. Converted to horsepower, 875 / 746 ≈ 1.17 hp. Remember as benchmarks that a human's peak instantaneous power is about 1–2 kW and a horse's power is about 746 W (1 hp).",
      },
    ],
  },
  {
    lessonId: "honors-physics-u3-l2",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 3,
    lessonNum: 2,
    unitName: "Work, Energy & Momentum",
    title: "Potential Energy and Conservation of Mechanical Energy — Energy Never Disappears",
    subtitle: "The KE ↔ PE exchange explains everything from roller coasters to pendulums",
    overview:
      "If kinetic energy (KE) is the energy of motion, potential energy (PE) is the energy stored by position or state. Two kinds are central to Honors Physics: gravitational potential energy PE = mgh and elastic potential energy PE_spring = ½kx². In a frictionless system, these two kinds of energy merely convert into each other while their sum (the mechanical energy, E_mech = KE + PE) stays constant — this is the law of conservation of mechanical energy. The conservation law is powerful because it lets you find speeds from the initial and final states alone, without tracing a complicated path. However, with friction the mechanical energy decreases, and that lost amount converts to thermal energy — the energy itself is still conserved.",
    objectives: [
      "Compute gravitational potential energy PE = mgh relative to a chosen reference level and set the sign correctly",
      "Explain elastic potential energy PE_spring = ½kx² in connection with Hooke's Law",
      "Apply conservation of mechanical energy (KE_i + PE_i = KE_f + PE_f) in a system with no non-conservative forces (friction) to find speed or height",
      "Explain that in a system with friction, the loss of mechanical energy equals the magnitude of the work done by friction",
      "Explain the difference between a conservative force and a non-conservative force in terms of path dependence",
    ],
    formulas: [
      "PE_grav = mgh  (Gravitational PE)",
      "PE_spring = ½kx²  (Elastic PE)",
      "E_mech = KE + PE  (Mechanical Energy)",
      "KE_i + PE_i = KE_f + PE_f  (Conservation of Mechanical Energy)",
      "ΔE_mech = W_nc  (Non-conservative work = change in mechanical energy)",
      "F_spring = −kx  (Hooke's Law)",
    ],
    sections: [
      {
        title: "Potential Energy — How Gravity and Springs Store Energy",
        subtitle: "The reference level for PE = mgh is free to choose, but once chosen it must stay consistent throughout",
        terms: [
          {
            term: "Gravitational Potential Energy, PE_grav",
            def: "The energy of a mass m at height h above a reference level (h = 0) within Earth's gravitational field. PE = mgh. Above the reference level it is positive; below it, negative. You may set the reference level freely for convenience, but it must remain consistent within one solution.",
          },
          {
            term: "Elastic Potential Energy, PE_spring",
            def: "The energy stored when an ideal spring obeying Hooke's Law F = −kx is compressed or stretched by an amount x. PE_spring = ½kx². Since it is proportional to the square of the deformation, both compression and extension store positive energy.",
          },
          {
            term: "Conservative Force",
            def: "A force whose work is independent of path and depends only on the initial and final positions. Gravity and the spring elastic force are typical. A potential energy can be defined for a conservative force, and if only conservative forces act, the mechanical energy is conserved.",
          },
          {
            term: "Non-conservative Force",
            def: "A force whose work depends on the path. Friction, air resistance, and an applied force are examples. When a non-conservative force acts, mechanical energy is not conserved, and the lost mechanical energy converts to heat, sound, deformation energy, and so on.",
          },
        ],
        traps: [
          "In PE = mgh, h is always the vertical height directly climbed, not the distance travelled along an incline (the hypotenuse). If you climb 5 m along an incline at 30°, then h = 5 sin30° = 2.5 m. Beware of substituting the distance 5 m directly for h.",
          "In elastic potential energy PE_spring = ½kx², x is the deformation from the natural length, not the spring's total length. If a problem says the spring is 'compressed by 10 cm', you must substitute x = 0.10 m.",
        ],
        example:
          "A 2 kg ball starts from rest at h = 5 m and slides down a frictionless incline (g = 10 m/s²). Find its speed at the bottom (h = 0). Conservation of energy: KE_i + PE_i = KE_f + PE_f. 0 + mgh = ½mv² + 0. mgh = ½mv² → v² = 2gh = 2 × 10 × 5 = 100 → v = 10 m/s. The incline angle and length are not needed at all — only the initial and final heights. This is the power of the conservation of energy.",
      },
      {
        title: "Conservation of Mechanical Energy and Friction — Conservative vs. Non-conservative Systems",
        subtitle: "With friction, ΔE_mech = W_friction (negative); without it, ΔE_mech = 0",
        terms: [
          {
            term: "Conservation of Mechanical Energy",
            def: "In a system where only conservative forces act, the sum of mechanical energy (KE + PE) is always constant. KE_i + PE_i = KE_f + PE_f. This law applies to free fall in a gravitational field, a frictionless incline, an ideal spring, and so on.",
          },
          {
            term: "Energy transformation",
            def: "Energy converts from one form to another, but the total is unchanged (the law of conservation of energy). At a roller coaster's high point PE is maximum and KE minimum; at the low point KE is maximum and PE minimum. With friction, part of the mechanical energy converts to thermal energy.",
          },
          {
            term: "Loss of Mechanical Energy",
            def: "When a non-conservative force acts, the decrease in mechanical energy = the magnitude of the negative work done by that force. ΔE_mech = W_nc. Since the work done by friction is W_f = −f_k × d, we have E_mech,f = E_mech,i − f_k × d.",
          },
        ],
        traps: [
          "The law of conservation of energy is different from conservation of mechanical energy. Energy itself is always conserved, but with friction the mechanical energy (KE + PE) decreases. The lost mechanical energy is not gone — it has converted to thermal energy. On an exam, answering 'it does not hold when there is friction' to a question about whether the conservation of energy holds is incorrect.",
          "The reference level (h = 0) is free to choose, but you must not change it within a single problem. Setting the lowest point as h = 0 usually keeps PE always ≥ 0, which is convenient. Changing the reference level changes the absolute value of PE, but ΔPE stays the same, so the final answer is identical.",
        ],
        example:
          "A 3 kg object starts from rest at h = 8 m and slides down an incline. With friction present, its speed at the bottom was 10 m/s (g = 10 m/s²). Find the work done by friction (W_f). E_mech,i = KE_i + PE_i = 0 + mgh = 3 × 10 × 8 = 240 J. E_mech,f = KE_f + PE_f = ½ × 3 × 10² + 0 = 150 J. ΔE_mech = 150 − 240 = −90 J. Therefore the work done by friction W_f = −90 J (90 J of mechanical energy converted to heat).",
      },
    ],
  },
  {
    lessonId: "honors-physics-u3-l3",
    courseId: "honors-physics",
    subjectLabel: "Honors Physics",
    emoji: "⚛️",
    unit: 3,
    lessonNum: 3,
    unitName: "Work, Energy & Momentum",
    title: "Momentum and Collisions — p = mv Predicts the Outcome of a Collision",
    subtitle: "Conquer collision and explosion problems completely with the impulse-momentum theorem and conservation of momentum",
    overview:
      "If energy conservation explained the 'exchange of height and speed', momentum (p = mv) and its conservation law are the tools for analysing collisions and explosions. The impulse-momentum theorem says that when a net force acts over time the momentum changes, and the law of conservation of momentum guarantees that in a system with no external force the total momentum before and after a collision is the same. There are two kinds of collision: the perfectly elastic collision in which kinetic energy is also conserved, and the perfectly inelastic collision in which the two objects stick together afterward. Real collisions lie somewhere in between, but Honors Physics exams test your ability to firmly distinguish and compute these two extremes.",
    objectives: [
      "Compute momentum p = mv and express its unit (kg·m/s) and vector direction correctly",
      "Use the impulse-momentum theorem J = FΔt = Δp to find an impulsive force or a change in momentum",
      "Apply conservation of momentum (p_i = p_f) in a system with no external force to compute speeds before and after collisions and explosions",
      "Explain the difference between perfectly elastic and perfectly inelastic collisions (whether kinetic energy is conserved) and set up the appropriate equations for each",
      "Distinguish that momentum is always conserved in a collision but mechanical energy is conserved only in an elastic collision",
    ],
    formulas: [
      "p = mv  (Momentum)",
      "J = FΔt = Δp = m(v_f − v_i)  (Impulse-Momentum Theorem)",
      "p_total,i = p_total,f  (Conservation of Momentum)",
      "m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f  (Elastic Collision)",
      "m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f  (Perfectly Inelastic Collision)",
    ],
    sections: [
      {
        title: "Momentum and Impulse — When Force Meets Time, Momentum Changes",
        subtitle: "J = FΔt = Δp — the same Δp can be achieved with a smaller impulsive force by extending the time",
        terms: [
          {
            term: "Momentum, p",
            def: "The product of an object's mass and velocity: p = mv. It is a vector pointing the same way as the velocity. Its unit is kg·m/s. The greater the momentum, the harder it is to change the object's state of motion.",
          },
          {
            term: "Impulse, J",
            def: "The change in momentum transferred when a force F acts over a time Δt: J = FΔt = Δp. Its unit is N·s = kg·m/s, the same as momentum. On a force–time graph, the area is the impulse.",
          },
          {
            term: "Impulse-Momentum Theorem",
            def: "Net impulse = change in momentum: J = Δp = m(v_f − v_i). This theorem is derived directly from Newton's Second Law F = ma. Even when the force is not constant, you can apply it with the average force (F_avg) as J = F_avg × Δt.",
          },
          {
            term: "Force-time graph",
            def: "A graph with time on the horizontal axis and force on the vertical axis. The area under the curve (its integral) is the impulse. Safety devices such as airbags and helmets extend Δt, dividing the same Δp by a longer time to give a smaller F_avg, thereby reducing the impulsive force.",
          },
        ],
        traps: [
          "Momentum (p = mv) and kinetic energy (KE = ½mv²) are different physical quantities. Momentum is a vector, kinetic energy a scalar. Even with equal masses, opposite directions cancel the momentum but add the kinetic energies. Mixing the two quantities is a very frequent mistake in collision problems.",
          "In impulse J = FΔt, F is the net force. If several forces act on the object, you must find the resultant first. However, when dealing with conservation of momentum, the internal forces (between two objects during a collision) cancel, so you need only consider external forces.",
        ],
        example:
          "A 0.5 kg baseball arrives at 40 m/s, is hit by a bat, and bounces back in the opposite direction at 60 m/s. If the contact time is 0.002 s, find the average force the bat exerts on the ball. Set rightward as positive: v_i = +40 m/s, v_f = −60 m/s (opposite direction). Δp = m(v_f − v_i) = 0.5 × (−60 − 40) = 0.5 × (−100) = −50 kg·m/s. J = FΔt → F = J/Δt = −50 / 0.002 = −25,000 N. Magnitude 25,000 N, directed opposite to the incoming ball (from bat toward ball).",
      },
      {
        title: "Conservation of Momentum and Collision Types — Elastic vs. Inelastic",
        subtitle: "Momentum is always conserved; energy is conserved only in an elastic collision",
        terms: [
          {
            term: "Conservation of Momentum",
            def: "In a system with zero external net force (an isolated system), the total momentum before and after a collision or explosion is conserved: p_total,i = p_total,f. During a collision, the forces between the two objects are action–reaction and cancel within the system. This law holds regardless of whether the collision is elastic or inelastic.",
          },
          {
            term: "Perfectly Elastic Collision",
            def: "A collision in which both momentum and kinetic energy are conserved before and after. An ideal billiard-ball collision is an approximate example. Solving the two equations (momentum conservation + energy conservation) simultaneously gives both objects' velocities after the collision.",
          },
          {
            term: "Perfectly Inelastic Collision",
            def: "A collision in which the two objects merge into one and move at the same velocity afterward. Momentum is conserved but kinetic energy is lost to the maximum extent. It is solved by the single equation m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f.",
          },
          {
            term: "Kinetic Energy Loss in a Collision",
            def: "The kinetic energy lost in an inelastic collision = KE_i − KE_f. This energy converts to sound, heat, and deformation energy. The energy loss is greatest in a perfectly inelastic collision, but the energy is not destroyed — it converts to other forms.",
          },
        ],
        traps: [
          "Conservation of momentum holds only in a system with no external force. For example, when two objects slide and collide on a floor with friction, if the collision happens in a very short time the external force (friction) during the collision can be neglected, so it holds approximately. But for the long travel after the collision, friction must definitely be accounted for.",
          "In a perfectly inelastic collision, 'the two merging' does not mean the kinetic energy becomes zero. Even with different masses, they move at the same velocity v_f after merging, so the kinetic energy ½(m₁+m₂)v_f² remains. For the kinetic energy to be zero, everything must be at rest after the collision, which is possible only in special cases.",
        ],
        example:
          "A 2 kg ball A moving right at 5 m/s collides perfectly inelastically with a stationary 3 kg ball B. Find (1) the velocity after the collision and (2) the kinetic energy lost. Conservation of momentum: m_A v_A + m_B v_B = (m_A + m_B)v_f → 2×5 + 3×0 = (2+3)v_f → 10 = 5v_f → v_f = 2 m/s (right). Before: KE_i = ½×2×5² = 25 J. After: KE_f = ½×5×2² = 10 J. Loss = 25 − 10 = 15 J. This 15 J converts to collision sound, heat, and deformation energy; the energy itself is not destroyed.",
      },
    ],
  },
];
