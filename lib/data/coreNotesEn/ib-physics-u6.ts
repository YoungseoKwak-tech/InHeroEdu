/**
 * Core Notes English version — IB Physics (DP) Unit 6 (Circular Motion & Gravitation).
 * Covers uniform circular motion (angular velocity, period), centripetal acceleration
 * and force (horizontal/vertical circles, banked tracks), Newton's law of universal
 * gravitation, gravitational fields, and satellite orbits (orbital speed/period, Kepler)
 * per the IB DP Physics curriculum.
 * All objectives, terms, traps, formulas, and examples preserved at full depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U6_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u6-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 6,
    lessonNum: 1,
    unitName: "Circular Motion & Gravitation",
    title: "Uniform Circular Motion — Same Speed, So Why Is It Accelerating?",
    subtitle:
      "Understand the definitions of angular velocity, period, and centripetal acceleration, and master the core IB DP skill of computing centripetal force with F = mv²/r = mω²r",
    overview:
      "Roller coasters, centrifuges, satellites orbiting the Earth — all of these are circular motion. The fact that 'the speed is constant' does not mean the state of motion is unchanged. Velocity is a vector, so if its direction keeps changing then an acceleration exists. This is centripetal acceleration — it always points towards the centre of the circle. By Newton's second law F = ma, if there is centripetal acceleration there must be a centripetal force, and what that force actually is (tension, friction, gravity, normal force) depends on the situation. On both IB DP Paper 1 and Paper 2, questions that 'identify the true source of the centripetal force' are a recurring favourite. Don't just memorise the equations — you must fully understand 'why is an object in circular motion accelerating?' through the vector concept in order to solve applied problems.",
    objectives: [
      "Explain the relationships among angular velocity (ω = 2π/T = 2πf), period (T), and frequency (f), and calculate linear speed (v = ωr)",
      "Explain, in terms of vector change, why centripetal acceleration a = v²/r = ω²r points towards the centre of the circle",
      "Calculate centripetal force F = mv²/r = mω²r, and identify the actual force providing it (tension, gravity, friction, normal force, resultant) according to the situation",
      "Carry out force analysis at each point for horizontal circular motion (a horizontal circle, a conical pendulum) and vertical circular motion (top and bottom of a roller coaster)",
      "Derive the optimum speed at which frictionless circular motion is possible on a banked track from tan θ = v²/(rg)",
    ],
    formulas: [
      "ω = 2π/T = 2πf  (angular velocity; unit rad s⁻¹)",
      "v = ωr  (relationship between linear speed and angular velocity)",
      "a = v²/r = ω²r  (centripetal acceleration; direction: towards the centre)",
      "F = mv²/r = mω²r  (centripetal force; unit N)",
      "Banked-track optimum speed: tan θ = v²/(rg)  →  v = √(rg tan θ)",
    ],
    sections: [
      {
        title: "Angular Velocity, Period & Linear Speed — Learning the Language of Circular Motion",
        subtitle:
          "Understand the relationships among ω, T, f, and v, and grasp the vector essential that in uniform circular motion the speed is constant but the velocity changes",
        terms: [
          {
            term: "Angular Velocity (ω) and Period (T)",
            def: "Angular velocity (ω): the angle (in radians) swept per unit time. ω = Δθ/Δt = 2π/T = 2πf. Unit: rad s⁻¹. Period (T): the time taken to complete one revolution (2π rad). Frequency (f): the number of revolutions per unit time; f = 1/T. Linear speed (v): the tangential speed of a point on the circle. v = ωr (r: radius of the circle). For the same rotating body, the farther from the centre (the larger r), the greater the linear speed, but the angular velocity is the same — the classic example is the inner and outer tracks of a CD rotating at the same angular velocity.",
          },
          {
            term: "Centripetal Acceleration (a)",
            def: "In uniform circular motion the speed is constant, but the direction of the velocity vector changes at every instant. Δv = v_f − v_i (the vector difference) is a vector pointing towards the centre of the circle → acceleration a = v²/r = ω²r, with direction always towards the centre (centripetal = 'centre-seeking'). Magnitude: a = v²/r. Unit: m s⁻². Important: centripetal acceleration does not change the speed, only the direction — therefore it does no work and the kinetic energy does not change.",
          },
          {
            term: "Centripetal Force (F_c)",
            def: "Applying Newton's second law F = ma to the centripetal acceleration: F_c = mv²/r = mω²r. Direction: towards the centre of the circle. Important — the centripetal force is not a new kind of force. An already-existing force (or resultant) plays the role of the centripetal force. Examples: planetary orbit → gravity; a car on a circular track → friction; the top of a vertical circle → gravity + normal force; a conical pendulum → the horizontal component of the tension. When IB Paper 2 asks 'which force provides the centripetal force?', you must write the name of that specific force.",
          },
        ],
        traps: [
          "Confusing centripetal force with 'centrifugal force' produces a wrong answer on IB. Centrifugal force is a fictitious force introduced in a non-inertial frame (a rotating observer), whereas IB DP works in an inertial frame by default. Drawing 'centrifugal force' on a free-body diagram loses marks. Show only the net inward force (the centripetal force) correctly.",
          "In v = ωr, if r doubles then v also doubles. Substituting into a = v²/r gives a = (2v)²/(2r) = 4v²/(2r) = 2v²/r, so the acceleration also doubles. Don't simply memorise 'larger r means smaller acceleration' — you must account for v changing along with r through v = ωr. The conclusion differs depending on whether the problem holds ω (angular velocity) fixed or v (linear speed) fixed.",
        ],
        example:
          "Uniform circular motion calculation: on a circular track of radius r = 0.50 m, an object of mass m = 2.0 kg undergoes uniform circular motion with period T = 4.0 s. ① Angular velocity: ω = 2π/T = 2π/4.0 = 1.57 rad s⁻¹. ② Linear speed: v = ωr = 1.57 × 0.50 = 0.785 m s⁻¹. ③ Centripetal acceleration: a = v²/r = (0.785)²/0.50 = 0.616/0.50 ≈ 1.23 m s⁻² (or a = ω²r = (1.57)² × 0.50 ≈ 1.23 m s⁻²). ④ Centripetal force: F = ma = 2.0 × 1.23 ≈ 2.5 N. IB marking point: you must state that the directions of a and F are 'towards the centre of the circle.'",
      },
      {
        title: "Vertical Circular Motion & Banked Tracks — Applying Force Analysis",
        subtitle:
          "The core IB technique of applying Newton's laws in the centripetal direction at the top and bottom of a roller coaster and on a banked track",
        terms: [
          {
            term: "Vertical Circular Motion — Top and Bottom",
            def: "When a roller coaster or a ball on a string undergoes circular motion in a vertical plane, the force analysis differs at the top and the bottom. Top (centre direction = downward): mg + N = mv²/r → N = mv²/r − mg. Bottom (centre direction = upward): N − mg = mv²/r → N = mv²/r + mg. Minimum-speed condition (N = 0 at the top): v_min = √(gr). If the speed is slower than √(gr), the normal force would be negative and the object 'cannot push on the track,' so in reality the circular motion cannot be maintained. On IB Paper 2, deriving this minimum speed and developing the force equations is an essential extended-response skill.",
          },
          {
            term: "Banked Track — Frictionless Circular Motion",
            def: "Analyse a car undergoing circular motion at speed v without friction on a curved road banked at angle θ. Vertical component of the normal force N: N cos θ = mg. Horizontal component of the normal force N (the centripetal force): N sin θ = mv²/r. Dividing the two equations: tan θ = v²/(rg) → optimum speed: v = √(rg tan θ). At this speed, circular motion is possible even with zero friction. If the speed is faster than this, the car tends to slide outward; if slower, it tends to slide inward. IB requires both the force diagram (direction of N) and the derivation of tan θ.",
          },
          {
            term: "Conical Pendulum",
            def: "In a conical pendulum with string length L making angle θ with the vertical, the ball moves uniformly around a horizontal circle. Vertical component: T cos θ = mg. Horizontal component (the centripetal force): T sin θ = mv²/r = mω²r. Radius of the circle: r = L sin θ. From these equations: tan θ = ω²r/g = ω²L sin θ/g → cos θ = g/(ω²L). The greater the angular velocity (the faster the rotation), the larger θ becomes (the string approaches the horizontal). The equation structure is identical to the banked-track analysis, so understanding them together is efficient.",
          },
        ],
        traps: [
          "In vertical circular motion, gravity (mg) always points downward at both the top and the bottom. At the top, both mg and N point towards the centre (downward), so the sum of the two forces is the centripetal force; at the bottom, N points towards the centre (upward) and mg points the opposite way (downward), so N − mg = mv²/r. Setting up signs without a free-body diagram often leads to writing N − mg at the top and getting it wrong — always set the convention 'centre direction is positive (+)' and add the force components in that direction.",
          "In banked-track problems, a common error is drawing N in the 'vertical' direction. On a frictionless banked track the normal force N is perpendicular to the road surface (perpendicular to the incline), not vertical. If you draw N vertically, deriving tan θ = v²/(rg) becomes impossible. Drawing N correctly along the surface normal in the force diagram is the first marking point for this question type.",
        ],
        example:
          "Minimum speed at the top of a roller coaster: a rider of mass m = 60 kg passes over the top of a roller coaster of radius r = 10 m. ① Force equation at the top: mg + N = mv²/r (both forces point towards the centre, i.e. downward). ② Minimum speed: when N = 0 → mg = mv²_min/r → v_min = √(gr) = √(9.81 × 10) ≈ 9.9 m s⁻¹. ③ Force the rider exerts on the track when passing at v = 15 m s⁻¹: N = mv²/r − mg = 60 × (15)²/10 − 60 × 9.81 = 1350 − 589 = 761 N. IB marking point: stating the sign convention at the top (centre = downward) for N + mg = mv²/r, plus developing the numerical calculation, is essential.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u6-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 6,
    lessonNum: 2,
    unitName: "Circular Motion & Gravitation",
    title: "Universal Gravitation & Gravitational Fields — The Universe Newton Read in an Apple",
    subtitle:
      "Understand Newton's law of universal gravitation (F = GMm/r²) and gravitational field strength (g = GM/r²), and master gravity calculations at a planet's surface and in orbit at IB DP level",
    overview:
      "One of Newton's greatest insights was that the force pulling on an apple and the force keeping the Moon in orbit around the Earth are the same gravity. Newton's law of universal gravitation, F = GMm/r², has exactly the same equation structure as Coulomb's law — it is proportional to the product of the two masses and inversely proportional to the square of the distance. The key difference: gravity is always attractive and there is no repulsion. A gravitational field is 'a region of space, due to a mass, that is already prepared to exert a force,' and the field strength g = F/m = GM/r² is the gravitational force per unit mass. The surface value g ≈ 9.81 m s⁻² is derived directly from this formula. IB DP Paper 1 frequently asks about the difference between g and G, how g changes as r varies, and gravitational field-line patterns. On Paper 2, applied calculations with the law of universal gravitation and gravitational fields are central.",
    objectives: [
      "Use Newton's law of universal gravitation F = GMm/r² to calculate the gravitational force between two masses, and explain how the force changes when the distance doubles",
      "Define gravitational field strength g = F/m = GM/r², and calculate g at the surface and at other altitudes",
      "Interpret the direction and density (strength) of gravitational field lines, and distinguish a uniform gravitational field from the field around a point mass",
      "Know that gravitational potential energy is expressed as ΔEp = mgΔh (uniform field) or Ep = −GMm/r (point mass), and explain why the sign is negative",
    ],
    formulas: [
      "F = GMm/r²  (law of universal gravitation; G = 6.67 × 10⁻¹¹ N m² kg⁻²)",
      "g = F/m = GM/r²  (gravitational field strength; unit N kg⁻¹ = m s⁻²)",
      "ΔEp = mgΔh  (change in gravitational potential energy in a uniform field)",
      "Ep = −GMm/r  (gravitational potential energy around a point mass; reference 0 at infinity)",
      "g_surface = GM/R²  (planetary surface gravitational field; R: planet radius)",
    ],
    sections: [
      {
        title: "Universal Gravitation — The Birth of Inverse-Square Gravity",
        subtitle:
          "Understand the structure of F = GMm/r², and fully grasp at IB level its similarities and differences with Coulomb's law and the meaning of the inverse-square law",
        terms: [
          {
            term: "Newton's Law of Universal Gravitation",
            def: "When two bodies of mass M and m are separated by a distance r, the gravitational force is: F = GMm/r². G = 6.67 × 10⁻¹¹ N m² kg⁻² (the universal gravitational constant). Features: ① always attractive — gravity has no repulsion. ② Inverse-square law: r doubles → F becomes 1/4. ③ Equal and opposite forces act on the two bodies (a Newton's-third-law pair). It has the same equation structure as Coulomb's law F = kq₁q₂/r², but differs in that it is roughly 10³⁹ times weaker than the electric force and is always purely attractive. On astronomical scales, masses are vast, so gravity becomes the dominant force.",
          },
          {
            term: "Gravitational Field Strength (g)",
            def: "Gravitational field strength g: the gravitational force on a unit mass placed at that point. g = F/m = GM/r². Unit: N kg⁻¹ = m s⁻² (the same unit as acceleration). At the Earth's surface g = GM_Earth/R_Earth² ≈ 9.81 m s⁻². g varies with the distance r from the centre of the Earth: as altitude above the surface increases (r increases), g decreases. Inside the Earth (r < R), g also decreases as you go below the surface (assuming uniform density). On IB, ratio problems comparing surface g when the mass and radius ratios of two planets are given are frequently set.",
          },
          {
            term: "Gravitational Field Lines and the Uniform Field",
            def: "Gravitational field lines: lines that show the direction of the force on a unit mass at that point. Rules: ① always directed towards the mass (all inward, since gravity is only attractive). ② The greater the density of lines, the stronger the field. ③ Around a point mass: radial lines directed towards the centre. Near a planet's surface (when the height is very small compared with the radius), the gravitational field is approximated as uniform — parallel, equally spaced lines pointing vertically downward. Use ΔEp = mgΔh in a uniform field, and Ep = −GMm/r in the field of a point mass.",
          },
          {
            term: "Gravitational Potential Energy (Ep)",
            def: "Taking the reference point at infinity (r → ∞): Ep = −GMm/r. Why negative: as r decreases from infinity to bring a mass closer, gravity does work (because it is attractive), so the energy decreases. As r increases, Ep approaches 0 (Ep < 0 but increasing). Gravitational potential (V_g = Ep/m = −GM/r; unit J kg⁻¹). Uniform-field approximation near the surface: ΔEp = mgΔh (when h is much smaller than R). On IB, this concept is used for the meaning of negative potential energy and for escape-speed calculations.",
          },
        ],
        traps: [
          "Confusing g (lowercase: gravitational field strength / gravitational acceleration, N kg⁻¹ or m s⁻²) with G (uppercase: the universal gravitational constant, N m² kg⁻²) produces calculation errors on IB. g is a quantity that varies with location, whereas G is a constant that is the same everywhere in the universe. When a problem asks for the 'gravitational acceleration,' use g = GM/r², and check the value of G in the IB data booklet.",
          "Omitting the negative sign in gravitational potential energy Ep = −GMm/r is a common mistake. 'Taking a mass to infinity gives Ep = 0, and at a finite distance r the energy is Ep = −GMm/r < 0,' so it is lower than at infinity. Ignoring this leads to errors in escape-speed calculations (from ½mv² = GMm/r giving v = √(2GM/r)) by mishandling the negative energy.",
        ],
        example:
          "Comparing surface gravitational field strengths: planet X has 3 times the Earth's mass and 2 times the Earth's radius. Find the surface gravitational field strength g_X of planet X. g_Earth = GM_Earth/R_Earth², g_X = G(3M_Earth)/(2R_Earth)² = 3GM_Earth/(4R_Earth²) = (3/4) × g_Earth = (3/4) × 9.81 ≈ 7.4 N kg⁻¹. IB marking point: first state the ratio relationship g ∝ M/R², then substitute the numbers. Either unit N kg⁻¹ or m s⁻² is accepted.",
      },
      {
        title: "Depth of the Gravitational Field — Potential, Energy & IB Applications",
        subtitle:
          "Compare potential energy in a uniform field and in a point-mass field, and grasp the core context of IB Paper 2 extended-response questions",
        terms: [
          {
            term: "r-Dependence of the Gravitational Field — Above the Surface and Inside the Earth",
            def: "Above the surface (r > R): g = GM/r², inversely proportional to r². At altitude h, with r = R + h, g = GM/(R+h)². At the surface, when h = R (i.e. altitude equal to the radius), g = GM/(2R)² = g_surface/4. Inside the Earth (assuming uniform density, r < R): g = GM_enclosed/r² = G × (4/3πr³ρ)/r² ∝ r — decreasing linearly towards the centre until g = 0. The g vs r graph: maximum at the surface (r = R), inverse-square decrease moving outward, linear decrease moving inward. IB sets questions asking students to sketch and interpret the graph shape over these two regions.",
          },
          {
            term: "Escape Speed",
            def: "The minimum initial speed for an object of mass m to escape the gravity of a planet of mass M and reach infinity. Energy conservation: ½mv_esc² + (−GMm/R) = 0 (both kinetic and potential energy are zero at infinity). v_esc = √(2GM/R). Earth's escape speed: v_esc ≈ 11.2 km s⁻¹. Escape speed is independent of launch direction (when air resistance is ignored). Since v_esc ∝ √(M/R), the larger the mass or the smaller the radius, the greater the escape speed. A black hole is a body for which v_esc ≥ c (the speed of light).",
          },
        ],
        traps: [
          "In altitude problems, setting r = h (the altitude) is a very common mistake. In the gravitation formula, r is the distance from the centre of the planet, so r = R (planet radius) + h (altitude). At the surface, when h = R, r = 2R and g becomes 1/4 of the surface value. Setting 'r = h' incorrectly gives a completely different answer. Develop the habit of always writing r = R + h clearly.",
          "When finding escape speed, writing only '½mv² = GMm/r' causes a sign error. The correct energy-conservation equation is '½mv² − GMm/r = 0' (referenced to Ep = 0, Ek = 0 at infinity). You must clearly state the process that includes the negative sign of the potential energy and rearranges to ½mv² = GMm/r in order to earn all the partial-credit marks on Paper 2.",
        ],
        example:
          "Escape-speed calculation: find the escape speed from an Earth of mass M = 6.0 × 10²⁴ kg and radius R = 6.4 × 10⁶ m. Energy conservation: ½mv_esc² = GMm/R → v_esc = √(2GM/R) = √(2 × 6.67 × 10⁻¹¹ × 6.0 × 10²⁴ / 6.4 × 10⁶) = √(2 × 6.67 × 6.0 × 10¹³ / 6.4 × 10⁶) = √(1.25 × 10⁸) ≈ 1.12 × 10⁴ m s⁻¹ ≈ 11.2 km s⁻¹. IB marking point: state the starting point of the energy-conservation equation including the negative sign of the potential energy, and indicate that the value of G was taken from the data booklet.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u6-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 6,
    lessonNum: 3,
    unitName: "Circular Motion & Gravitation",
    title: "Satellite Orbits & Kepler's Laws — Gravity Determines the Orbit",
    subtitle:
      "From centripetal force = gravity in a circular orbit, derive the orbital speed (v = √(GM/r)) and period (T² ∝ r³), and fully understand Kepler's third law and geostationary satellites at IB DP level",
    overview:
      "The reason a satellite does not fall is precisely 'because it is falling.' A satellite is continuously accelerated towards the centre of the Earth by gravity, but at the same time, thanks to its tangential speed, it 'falls while moving forward' at the same rate as the curvature of the Earth's surface. In a circular orbit it is gravity that provides the centripetal force: GMm/r² = mv²/r → v = √(GM/r). Using T = 2πr/v from this gives T² = (4π²/GM)r³, that is, the square of the period is proportional to the cube of the orbital radius (Kepler's third law). This relationship applies to every planet in the Solar System, the Moon, and artificial satellites. A geostationary satellite orbits with the same period as the Earth's rotation (24 hours), so it stays at a fixed position over the ground. On IB DP Paper 2, orbital-speed and period calculations and applications of Kepler's third law are central extended-response questions.",
    objectives: [
      "Apply the condition centripetal force = gravity, GMm/r² = mv²/r, in a circular orbit to derive and calculate the orbital speed v = √(GM/r)",
      "Derive T² = (4π²/GM)r³ (Kepler's third law) from the period T = 2πr/v, and find the ratio of periods and orbital radii of two bodies",
      "Explain the characteristics of a geostationary satellite (altitude, period, above the equator) and calculate its orbital radius",
      "Analyse orbital energy (Ek + Ep) and explain the paradoxical relationship that as the orbital radius increases the total mechanical energy increases (becomes less negative)",
    ],
    formulas: [
      "GMm/r² = mv²/r  →  v = √(GM/r)  (circular orbital speed)",
      "T = 2πr/v = 2πr/√(GM/r) = 2π√(r³/(GM))  (orbital period)",
      "T² = (4π²/GM) r³  (Kepler's third law; T² ∝ r³)",
      "E_total = Ek + Ep = ½mv² + (−GMm/r) = −GMm/(2r)  (total orbital energy)",
      "Geostationary condition: T = 24 h = 86400 s  →  r = ∛(GMT²/(4π²))",
    ],
    sections: [
      {
        title: "Orbital Speed & Period — The Perfect Circular Motion Created by Gravity",
        subtitle:
          "Derive v and T from the condition GMm/r² = mv²/r, and fully grasp the physical meaning of Kepler's third law T² ∝ r³",
        terms: [
          {
            term: "Orbital Speed — v = √(GM/r)",
            def: "For a satellite (mass m) in a circular orbit of radius r around a planet of mass M: centripetal force = gravity → mv²/r = GMm/r². Rearranging: v = √(GM/r). Features: ① the orbital speed is independent of the satellite's mass m (m does not appear in the equation). ② The larger r is, the smaller v — a higher-orbit satellite is slower. ③ For the International Space Station (ISS): r ≈ 6.77 × 10⁶ m → v ≈ 7.7 km s⁻¹. Comparing with the escape speed v_esc = √(2GM/r) = √2 × v_orbital: the escape speed is √2 times the circular orbital speed at the same location.",
          },
          {
            term: "Kepler's Third Law — T² ∝ r³",
            def: "Orbital period: T = 2πr/v = 2πr/√(GM/r) = 2π√(r³/(GM)). Squaring both sides: T² = 4π²r³/(GM). Therefore T² ∝ r³ (when the central mass M is constant). This is Kepler's third law. Application: if two bodies A and B orbit the same central mass M, then T_A²/T_B² = r_A³/r_B³. For the Solar System, T²/r³ = 4π²/(GM_Sun) is the same constant for every planet. On IB, ratio calculations that use this proportionality to find the orbital radius or period of another planet are frequently set.",
          },
          {
            term: "Geostationary Satellite",
            def: "A satellite that orbits with the same period as the Earth's rotation, T = 24 hours (more precisely the sidereal day of 23 h 56 min), so that it appears fixed at the same position to a ground observer. Characteristics: ① orbital direction: the same as the Earth's rotation (west → east). ② Position: above the equator (equatorial) — at any other latitude it traces a figure-of-eight path. ③ Altitude: substituting T = 24 h into T² = (4π²/GM)r³ → r ≈ 4.22 × 10⁷ m (from the Earth's centre), altitude ≈ 35,786 km. Applications: GPS, broadcast satellites, weather satellites, etc. On IB, questions that develop this altitude calculation are frequently set.",
          },
        ],
        traps: [
          "In Kepler's third law T² ∝ r³, r is the 'semi-major axis' of an elliptical orbit, not the distance at periapsis or apoapsis. In IB DP, circular orbits are mostly treated, so r = circular orbital radius can be applied directly. However, if a problem mentions an ellipse, the mean orbital radius (= semi-major axis) must be used.",
          "In the orbital speed v = √(GM/r), M is the mass of the 'central body (planet, star),' not the satellite's mass. Thinking 'shouldn't a heavier satellite need a greater speed?' is an error — in the centripetal-force equation the satellite mass m cancels from both sides, so the orbital speed is independent of the satellite's mass. IB Paper 1 sets multiple-choice questions that test this point directly.",
        ],
        example:
          "Applying Kepler's third law: Mars's orbital radius is 1.52 times the Earth's (r_Mars = 1.52 r_Earth). Find Mars's orbital period T_Mars (T_Earth = 1 year). Since T²/r³ is constant: (T_Mars/T_Earth)² = (r_Mars/r_Earth)³ = (1.52)³ = 3.512. T_Mars = T_Earth × √3.512 = 1 × 1.874 ≈ 1.87 years. This agrees very well with Mars's actual orbital period (687 days ≈ 1.88 years). IB marking point: first state the ratio relationship T²/r³, then calculate step by step — and clearly convert the final unit (years or seconds).",
      },
      {
        title: "Orbital Energy — Why a Higher Orbit Has 'More Energy'",
        subtitle:
          "Analyse a satellite's kinetic energy, gravitational potential energy, and total mechanical energy, and understand the paradoxical relationship between orbital radius and energy",
        terms: [
          {
            term: "Orbital Energy Analysis",
            def: "Kinetic energy of a circular-orbit satellite: Ek = ½mv² = ½m × GM/r = GMm/(2r). Gravitational potential energy: Ep = −GMm/r. Total mechanical energy: E_total = Ek + Ep = GMm/(2r) − GMm/r = −GMm/(2r). Features: ① E_total < 0 (negative) — meaning the satellite is bound to the planet. ② |Ep| = 2Ek (the Virial Theorem — IB HL extension). ③ The larger r is (the higher the orbit), the smaller the magnitude of E_total = −GMm/(2r) (less negative) → total energy increases. Paradox: a satellite in a higher orbit has less kinetic energy (v decreases), but the increase in potential energy is greater, so the total energy is greater.",
          },
          {
            term: "Orbital Decay and Energy",
            def: "Real low-orbit satellites lose energy through friction with the residual atmosphere. In E_total = −GMm/(2r), the energy decreases (becomes more negative) → r decreases (to a lower orbit). When r decreases, v = √(GM/r) increases (!) — the satellite speeds up even as it loses energy. This is the paradox of orbital mechanics: it loses energy to friction yet increases in speed. Of the potential energy lost, half is converted to kinetic energy and the other half to heat. On IB, questions explaining this paradox qualitatively are set as Paper 3 or Paper 2 extended-response items.",
          },
          {
            term: "The Solar System and the Scope of Kepler's Laws",
            def: "Kepler's first law: every planet traces an elliptical orbit with the Sun at one focus (simplified to a circular orbit in IB DP). Kepler's second law: the planet–Sun line sweeps out equal areas in equal times (constant areal velocity, conservation of angular momentum). Kepler's third law: T² ∝ r³ — the most-used law on IB. Within the IB DP scope, the key point about Kepler's laws is that they 'can be derived from Newton's law of universal gravitation,' and understanding the derivation of T² = (4π²/GM)r³ is more important than memorising the laws themselves.",
          },
        ],
        traps: [
          "Many students find it counterintuitive that the satellite's speed increases when the orbital radius decreases. The reason the general intuition 'losing energy should make it slower' fails: the decrease in gravitational potential energy is greater than the increase in kinetic energy. In E_total = −GMm/(2r), as r decreases the total energy becomes more negative (energy decreases), but v = √(GM/r) increases. You must clearly write 'Total energy decreases but speed increases' in the extended-response answer.",
          "In calculating the orbital radius of a geostationary satellite, do not confuse r with the 'altitude above the surface.' The r obtained from T² = (4π²/GM)r³ is the distance from the Earth's centre. Altitude (h) = r − R_Earth ≈ 4.22 × 10⁷ − 6.4 × 10⁶ ≈ 3.58 × 10⁷ m = 35,800 km. If the problem asks 'find the altitude,' you must subtract the Earth's radius.",
        ],
        example:
          "Geostationary-satellite radius calculation: T = 24 h = 86400 s, M_Earth = 6.0 × 10²⁴ kg, G = 6.67 × 10⁻¹¹ N m² kg⁻². From T² = (4π²/GM)r³, r³ = GMT²/(4π²) = (6.67 × 10⁻¹¹ × 6.0 × 10²⁴ × (86400)²) / (4π²). Numerator: 6.67 × 6.0 × 10¹³ × 7.465 × 10⁹ = 4.004 × 10¹³ × 7.465 × 10⁹ ≈ 2.989 × 10²³ m³. Denominator: 4 × 9.87 ≈ 39.5. r³ = 2.989 × 10²³ / 39.5 ≈ 7.57 × 10²¹ m³. r = (7.57 × 10²¹)^(1/3) ≈ 4.22 × 10⁷ m. Altitude: h = r − R_Earth = 4.22 × 10⁷ − 6.4 × 10⁶ ≈ 3.58 × 10⁷ m ≈ 35,800 km. IB marking point: both the step of converting T to seconds (s) and the final step of distinguishing r from the altitude (h) are marking points.",
      },
    ],
  },
];
