/**
 * Core Notes English version — IB Physics (DP) Unit 5 (Electricity & Magnetism).
 * Covers electric charge, Coulomb's law, electric fields; current, potential difference,
 * Ohm's law, resistivity, power; electric circuits (series/parallel, EMF and internal
 * resistance, Kirchhoff's laws); magnetic fields, force on a current-carrying conductor,
 * and force on a moving charge, per the IB DP Physics curriculum.
 * All objectives, terms, traps, formulas, and examples preserved at full depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PHYSICS_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-physics-u5-l1",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 5,
    lessonNum: 1,
    unitName: "Electricity & Magnetism",
    title: "Electric Charge, Coulomb's Law & Electric Fields — The Birth of the Electric Force",
    subtitle:
      "Understand the properties of electric charge and Coulomb's law, and master the definition of the electric field and the field-line patterns around point charges at IB level",
    overview:
      "Everything in electricity begins with electric charge. There are two kinds of charge — positive and negative — and like charges repel while unlike charges attract. The quantitative expression of this force is Coulomb's law, whose mathematical structure is strikingly similar to Newton's law of gravitation. The electric field is the concept that 'the space around a charge is already primed to exert a force,' visualised through field lines. In IB DP you must be able to handle the vector direction of Coulomb's law, the definition of the electric field E = F/q, the field around a point charge, and the rules governing field lines. Questions on Paper 1 and Paper 2 alike frequently ask about the relationship between the electric field and the electric force in vector terms.",
    objectives: [
      "State the law of conservation of charge and explain the difference between a conductor and an insulator in terms of the mobility of electrons",
      "Use Coulomb's law F = kq₁q₂/r² to calculate the magnitude and direction of the electric force between two point charges",
      "Define the electric field as the force on a unit positive charge (+1 C), and apply E = F/q and the point-charge field E = kq/r²",
      "State the rules for electric field lines — direction, density (strength), and that they never cross — and sketch the field-line patterns around a single point charge and around a dipole",
      "Apply E = V/d for the field between parallel plates in a uniform electric field",
    ],
    formulas: [
      "F = kq₁q₂/r²  (Coulomb's law;  k = 8.99 × 10⁹ N m² C⁻²)",
      "E = F/q  (definition of electric field; unit N C⁻¹ = V m⁻¹)",
      "E = kq/r²  (field around a point charge)",
      "E = V/d  (uniform field between parallel plates)",
      "Conservation of charge: ΣQ_before = ΣQ_after",
    ],
    sections: [
      {
        title: "Charge and Coulomb's Law — A Quantitative Grasp of the Electric Force",
        subtitle:
          "Define conservation of charge, conductors and insulators, and master the inverse-square structure and vector direction of Coulomb's law",
        terms: [
          {
            term: "Electric Charge and Conservation of Charge",
            def: "Charge is a fundamental electrical property of matter, of which there are two kinds: positive charge and negative charge. The elementary unit of charge is the charge on a single proton: e = 1.6 × 10⁻¹⁹ C. Conservation of charge: in an isolated system the total charge does not change — charge is neither created nor destroyed, it is only transferred. Conductor: a material with many free electrons in which charge moves easily (a metal). Insulator: a material with few free electrons in which charge moves with difficulty (glass, rubber). A semiconductor lies between the two.",
          },
          {
            term: "Coulomb's Law",
            def: "The magnitude of the electric force between two point charges q₁, q₂: F = kq₁q₂/r², where k = 8.99 × 10⁹ N m² C⁻² (Coulomb's constant) and r is the separation between the charges. The force is a vector: like charges (positive × positive, or negative × negative) repel (the charges push each other apart), unlike charges attract (they pull toward each other). It has the same mathematical structure as gravitation F = Gm₁m₂/r², but the electric force is about 10³⁹ times stronger than gravity. Doubling the distance reduces the force to one quarter (inverse square).",
          },
          {
            term: "Principle of Superposition",
            def: "When several charges are present, the net electric force on one charge is the vector sum of the Coulomb forces exerted by each of the other charges. That is, charges exert forces independently and do not interfere with one another. In a three-charge problem you must calculate the Coulomb force for each pair separately and then add them as vectors. IB problems usually require vector summation for charges arranged in a straight line or at right angles.",
          },
        ],
        traps: [
          "When finding the magnitude of the force in Coulomb's law, many students substitute the signs of the charges directly, obtain a negative result, and interpret that as 'attraction.' In IB you should first calculate the magnitude (F = k|q₁||q₂|/r²) and then judge the direction separately — 'like charges → repulsion, unlike charges → attraction.' Interpreting a negative sign as a 'negative magnitude' causes errors in vector summation.",
          "Students sometimes confuse Coulomb's law with the law of gravitation. Both are inverse-square laws, but gravity is always attractive whereas the electric force can be either attractive or repulsive. Also, Coulomb's constant k is given in the data booklet, but knowing that k = 1/(4πε₀) lets you connect it to ε₀ (the permittivity of free space).",
        ],
        example:
          "Coulomb force calculation: two charges of +2.0 μC and −3.0 μC are separated by r = 0.10 m. Find the magnitude of the electric force between them. F = kq₁q₂/r² = (8.99 × 10⁹ × 2.0 × 10⁻⁶ × 3.0 × 10⁻⁶) / (0.10)² = (8.99 × 10⁹ × 6.0 × 10⁻¹²) / 0.010 = 53.94/0.010 ≈ 5.4 N. Because the signs are opposite, the force is attractive. IB marking point: calculate the magnitude first, then state the direction (attractive/repulsive) separately.",
      },
      {
        title: "The Electric Field — How Space Holds a Force",
        subtitle:
          "Understand the definition of the electric field and the rules for field lines, and calculate E for point charges and uniform fields",
        terms: [
          {
            term: "Electric Field (E)",
            def: "Defined as the electric force acting on a unit positive charge (a +1 C test charge): E = F/q. Unit: N C⁻¹ = V m⁻¹. Direction: the same as the force on a positive charge (away from a positive charge, toward a negative charge). Field around a point charge q: E = kq/r². The electric field is a vector, so the principle of superposition applies.",
          },
          {
            term: "Electric Field Lines",
            def: "Curves that visualise the electric field, following these rules. ① They start on positive charges and end on negative charges (or begin/end at infinity). ② The tangent to a field line at a point gives the direction of the field at that point. ③ The density of field lines (number of lines per unit area) is proportional to the field strength. ④ Two field lines never cross (since the field direction at a point must be unique). ⑤ Uniform field: parallel, equally spaced straight field lines.",
          },
          {
            term: "Uniform Electric Field",
            def: "A field whose magnitude and direction are constant throughout space. The classic example: applying a potential difference V across two parallel metal plates produces a uniform field between them. E = V/d (V: potential difference [V], d: plate separation [m]). The force on a charge q in a uniform field: F = qE, directed along E for a positive charge and opposite to E for a negative charge. This is the foundation of parallel-plate capacitor problems.",
          },
          {
            term: "Electric Potential Energy and Electric Potential",
            def: "Electric potential energy (U): the positional energy a charge possesses within an electric field. The work done moving a charge q a distance d in a uniform field: W = qEd = qV. Electric potential (V): the electric potential energy a unit positive charge possesses relative to a reference point: V = U/q, unit J C⁻¹ = V (volts). Potential due to a point charge q: V = kq/r (a scalar). Potential difference (ΔV) becomes the central idea of the circuit work in Unit 5.",
          },
        ],
        traps: [
          "In E = F/q, q is the 'test charge,' not the 'source charge' that creates the field. The test charge is assumed small enough not to disturb the original field. Confusing the two makes it unclear which charge q refers to in the point-charge formula E = kq/r².",
          "Confusing field-line density with field strength leads to errors in graph interpretation. 'The denser the field lines, the stronger the field' is correct, but 'the field is zero where there are no field lines' can be wrong depending on context. Remember that E = 0 only inside a conductor in electrostatic equilibrium.",
        ],
        example:
          "Parallel-plate field calculation: two parallel plates are separated by d = 5.0 mm = 5.0 × 10⁻³ m with a potential difference V = 200 V. Find the field E between the plates and the force on an electron (q = −1.6 × 10⁻¹⁹ C) placed in this field. E = V/d = 200/(5.0 × 10⁻³) = 4.0 × 10⁴ V m⁻¹. F = qE = 1.6 × 10⁻¹⁹ × 4.0 × 10⁴ = 6.4 × 10⁻¹⁵ N. Because the electron is negative, the force points opposite to the field (toward the positive plate). IB marking point: stating the direction and the units (V m⁻¹, N) is essential.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u5-l2",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 5,
    lessonNum: 2,
    unitName: "Electricity & Magnetism",
    title: "Current, Potential Difference, Ohm's Law & Electric Circuits — The World of Flowing Charge",
    subtitle:
      "Understand the definitions of current, potential difference, and resistance and Ohm's law, and master EMF, internal resistance, and Kirchhoff's laws in series and parallel circuits at IB level",
    overview:
      "When charge flows through a wire it becomes an electric current. For a current to flow there must be a potential difference (voltage), and the relationship in which resistance responds to this potential difference is Ohm's law, V = IR. A real battery behaves like an ideal EMF source connected in series with an internal resistance. When analysing complex circuits, Kirchhoff's current law (KCL) and voltage law (KVL) are powerful tools. On IB DP Paper 2, circuit analysis, power calculations, and the relationship between EMF and terminal voltage appear frequently as extended-response questions. Rather than merely memorising the series and parallel resistance formulas, you must understand the physical reasons behind them to solve applied problems.",
    objectives: [
      "Define current (I = ΔQ/Δt), potential difference, and resistance, and use Ohm's law V = IR to calculate any one of the three quantities",
      "Apply the resistivity formula R = ρL/A and explain how a temperature change affects the resistance of a metal wire",
      "Use the power formulas P = VI = I²R = V²/R to calculate the power dissipated by a component and the energy used",
      "Calculate the combined resistance in series and parallel connections, and find the current and voltage for each component",
      "Calculate the terminal voltage in a circuit that includes an EMF (ε) and internal resistance (r), and apply Kirchhoff's laws",
    ],
    formulas: [
      "I = ΔQ/Δt  (current; unit A = C s⁻¹)",
      "V = IR  (Ohm's law)",
      "R = ρL/A  (resistivity formula; ρ: resistivity [Ω m], L: length, A: cross-sectional area)",
      "P = VI = I²R = V²/R  (power; unit W)",
      "Series resistance: R_total = R₁ + R₂ + …",
      "Parallel resistance: 1/R_total = 1/R₁ + 1/R₂ + …",
      "EMF: ε = I(R + r)  (terminal voltage: V = ε − Ir)",
    ],
    sections: [
      {
        title: "Current, Resistance & Power — The Three Basic Languages of a Circuit",
        subtitle:
          "Understand the physical meaning of current, potential difference, and resistance, and apply the resistivity and power formulas at IB exam level",
        terms: [
          {
            term: "Electric Current (I) and Charge Carriers",
            def: "Current: the charge passing a given cross-section per unit time: I = ΔQ/Δt, unit ampere (A = C s⁻¹). The direction of current is conventionally defined as the direction in which positive charge moves (conventional current), but in a metal the particles that actually move are electrons (negative charge), which move opposite to the current. In an electrolyte solution both positive and negative ions are charge carriers. In IB, 'current flows from + to −' refers to the conventional current direction in the external circuit.",
          },
          {
            term: "Resistance (R) and Resistivity (ρ)",
            def: "Resistance: the ratio of potential difference to current, R = V/I, unit ohm (Ω = V A⁻¹). Ohm's law: at constant temperature, for many metal wires V ∝ I, i.e. R is constant. A component satisfying this is an ohmic component. Resistivity (ρ): a material's intrinsic electrical resistance. R = ρL/A (L: wire length, A: cross-sectional area). In metals, as temperature rises the ion vibrations increase, so the resistance (resistivity) increases.",
          },
          {
            term: "Power (P) and Electrical Energy",
            def: "Power: the energy an electrical component dissipates (or supplies) per unit time. P = VI = I²R = V²/R. Unit W (= J s⁻¹). Energy: E = Pt = VIt. The energy dissipated in a resistor is converted to heat (Joule heating). Heat produced: Q = I²Rt. On IB Paper 2 there are frequent comparison questions of the form 'if bulb A is brighter than bulb B, it dissipates more power' — be careful that the current and voltage of each bulb differ in series versus parallel connections.",
          },
          {
            term: "Ohm's Law and Non-ohmic Components",
            def: "Ohmic component: the V–I graph is a straight line through the origin → slope = R (constant). Classic example: a metal resistor (fixed temperature). Non-ohmic component: the V–I graph is not a straight line → R is not constant. Classic examples: a diode (allows current in one direction only), a filament bulb (resistance increases as temperature rises), an NTC thermistor (resistance decreases as temperature rises), an LDR (resistance decreases as light intensifies). IB asks you to sketch or interpret the V–I graph shapes of these components.",
          },
        ],
        traps: [
          "Simply memorising from P = I²R that 'larger resistance means more power dissipated' gives wrong answers in parallel circuits. In a parallel connection each component has the same voltage, so using P = V²/R means smaller resistance dissipates more power; in a series connection the current is the same, so using P = I²R means larger resistance dissipates more power. Identify the circuit configuration first, then choose the appropriate power formula.",
          "In the resistivity formula R = ρL/A, the area A must be the cross-sectional area of the wire (πr²), not the surface area. Also, doubling L doubles R, while doubling the cross-sectional area A halves R. In comparison problems where both variables change at once, you must consider both the numerator and the denominator.",
        ],
        example:
          "Resistivity and power calculation: a copper wire (ρ = 1.7 × 10⁻⁸ Ω m) of length L = 2.0 m and radius r = 0.50 mm = 5.0 × 10⁻⁴ m. Cross-sectional area A = πr² = π × (5.0 × 10⁻⁴)² ≈ 7.85 × 10⁻⁷ m². Resistance R = ρL/A = (1.7 × 10⁻⁸ × 2.0)/(7.85 × 10⁻⁷) = 3.4 × 10⁻⁸/7.85 × 10⁻⁷ ≈ 0.043 Ω. When a current I = 5.0 A flows in this wire, the power dissipated: P = I²R = 25 × 0.043 ≈ 1.1 W. IB marking point: show the cross-sectional area calculation and state the unit conversion (mm → m).",
      },
      {
        title: "Series & Parallel Circuits, EMF & Kirchhoff's Laws — Conquering Complex Circuits",
        subtitle:
          "Understand combined-resistance calculation and the concepts of EMF and internal resistance, and analyse complex circuits systematically with Kirchhoff's laws",
        terms: [
          {
            term: "Series and Parallel Connections",
            def: "Series: components are connected along a single path. Current is constant: I₁ = I₂ = I. Voltage is shared: V_total = V₁ + V₂ + … Combined resistance: R_total = R₁ + R₂ + … (always larger than any individual resistance). Parallel: components are connected between the same two nodes. Voltage is constant: V₁ = V₂ = V. Current is shared: I_total = I₁ + I₂ + … Combined resistance: 1/R_total = 1/R₁ + 1/R₂ + … (always smaller than the smallest individual resistance).",
          },
          {
            term: "Electromotive Force (EMF, ε) and Internal Resistance (r)",
            def: "EMF (ε): the energy of another form that a battery or generator converts into electrical energy per unit charge. Unit V (volts). The EMF is the ideal voltage of the cell when there is no external resistance. Internal resistance (r): the resistance inside a real cell. When a current I flows, a voltage Ir is dropped across the internal resistance, so the terminal voltage: V = ε − Ir. While discharging: V < ε. While charging: V > ε (an external source supplies energy to the cell). In ε = I(R + r), R is the external resistance.",
          },
          {
            term: "Kirchhoff's Laws",
            def: "Kirchhoff's current law (KCL): at any node (junction), the sum of currents flowing in equals the sum of currents flowing out (conservation of charge). ΣI_in = ΣI_out. Kirchhoff's voltage law (KVL): around any closed loop, the sum of the EMFs equals the sum of the voltage drops across resistors (conservation of energy). ΣΕ = ΣIR. In IB, circuit problems with two loops or with two cells require KCL and KVL to be solved as simultaneous equations.",
          },
        ],
        traps: [
          "When finding the combined parallel resistance, a very common mistake is solving 1/R_total = 1/R₁ + 1/R₂ and then forgetting to take the reciprocal of the final answer. Confirm that R_total = 1/(1/R₁ + 1/R₂). When the two resistances are equal (R₁ = R₂ = R), the combined parallel resistance is quickly R/2. On IB Paper 1, errors in parallel combined-resistance calculation are a classic way to throw away marks.",
          "Treating the EMF and the terminal voltage as equal always gives wrong answers in internal-resistance problems. When current flows, V_terminal = ε − Ir, so the terminal voltage is always smaller than the EMF (while discharging). When writing a KVL loop, build the habit of explicitly drawing r on the circuit diagram so you do not omit the voltage drop Ir across the internal resistance.",
        ],
        example:
          "EMF and internal resistance calculation: a cell with EMF ε = 12 V and internal resistance r = 1.0 Ω is connected to an external resistance R = 5.0 Ω. Find the circuit current, the terminal voltage, and the power dissipated in the internal resistance. ε = I(R + r) → I = 12/(5.0 + 1.0) = 12/6.0 = 2.0 A. Terminal voltage: V = ε − Ir = 12 − 2.0 × 1.0 = 10 V (or confirm via V = IR = 2.0 × 5.0 = 10 V). Power dissipated in internal resistance: P_r = I²r = (2.0)² × 1.0 = 4.0 W. Total power supplied by the cell: P_total = εI = 12 × 2.0 = 24 W; dissipated in external resistance: 24 − 4 = 20 W. IB marking point: finding the terminal voltage by two methods (ε − Ir and IR) and showing they agree earns full marks.",
      },
    ],
  },
  {
    lessonId: "ib-physics-u5-l3",
    courseId: "ib-physics",
    subjectLabel: "IB Physics",
    emoji: "⚛️",
    unit: 5,
    lessonNum: 3,
    unitName: "Electricity & Magnetism",
    title: "Magnetic Fields & Electromagnetic Forces — When Current and Charge Meet a Magnetic Field",
    subtitle:
      "Understand the properties of the magnetic field and calculate the force on a current-carrying conductor (F = BIL sinθ) and on a moving charge (F = qvB sinθ) using the right-hand rule",
    overview:
      "Electricity and magnetism are taught separately but are unified as a single subject: electromagnetism. A magnetic field (B) is set up around a current-carrying conductor or around a permanent magnet, and it exerts a force on another current or a moving charge. This force is called the Lorentz force, and F = qvB sinθ is the key formula. For a current-carrying conductor it is expressed as F = BIL sinθ. The direction of the force is determined by the right-hand rule or by Fleming's left-hand rule. A charge moving in a uniform magnetic field undergoes circular motion, which is the operating principle of the cyclotron and the mass spectrometer. On IB DP Paper 1 and Paper 2 alike, judging force direction and calculating force magnitude is a core topic examined every year.",
    objectives: [
      "Define the magnetic field (B) as a vector and describe the direction and characteristics of magnetic field lines",
      "Calculate the force a magnetic field exerts on a straight current-carrying conductor, F = BIL sinθ, and determine its direction using Fleming's left-hand rule",
      "Calculate the force a magnetic field exerts on a moving charge, F = qvB sinθ (the Lorentz force), and determine its direction using the right-hand rule",
      "Explain why a charged particle moving in a uniform magnetic field undergoes circular motion, and calculate the radius as r = mv/(qB)",
    ],
    formulas: [
      "F = BIL sinθ  (magnetic force on a current-carrying conductor; θ: angle between current direction and B)",
      "F = qvB sinθ  (Lorentz force on a moving charge; θ: angle between v and B)",
      "r = mv/(qB)  (radius of circular motion of a charged particle in a uniform magnetic field)",
      "Unit of magnetic field: tesla (T = kg A⁻¹ s⁻²)",
      "Field around a straight wire: B = μ₀I/(2πr)  (μ₀ = 4π × 10⁻⁷ T m A⁻¹)",
    ],
    sections: [
      {
        title: "Properties of the Magnetic Field and the Force on a Current-carrying Conductor",
        subtitle:
          "Understand the characteristics of magnetic field lines and the unit of B, and determine force direction with F = BIL sinθ and Fleming's left-hand rule",
        terms: [
          {
            term: "Magnetic Field (B) and Magnetic Field Lines",
            def: "Magnetic field B: the vector quantity of the space in which a magnetic force acts. Unit: tesla (T = kg A⁻¹ s⁻²). Rules for magnetic field lines: ① The direction of a field line is the direction the north pole of a compass points at that location (the direction of B). ② Outside a bar magnet they emerge from the N pole and enter the S pole. ③ Field lines are closed curves (unlike electric field lines, there is no isolated magnetic pole — a magnetic monopole has never been found). ④ A uniform magnetic field is represented by equally spaced parallel field lines. ⑤ Around a straight current-carrying wire the field lines are concentric circles (right-hand grip rule).",
          },
          {
            term: "Force on a Current-carrying Conductor",
            def: "The force on a wire of length L carrying current I in a magnetic field B: F = BIL sinθ. θ: the angle between the current direction and the field direction. When θ = 90° (perpendicular), F = BIL (maximum). When θ = 0° (parallel), F = 0. Direction of the force: Fleming's left-hand rule — left-hand first finger → B direction, second finger → current (I) direction, thumb → force (F) direction. You can also remember it as the vector cross product F = IL × B.",
          },
          {
            term: "Force Between Two Parallel Wires",
            def: "Two parallel wires carrying current in the same direction attract each other, while currents in opposite directions repel. This principle was the basis of the SI definition of the ampere (it has since been redefined via the elementary charge e). For wires separated by d carrying currents I₁ and I₂, the force per unit length: F/L = μ₀I₁I₂/(2πd). In IB, judging the direction is the main requirement, and the formula is checked in the data booklet.",
          },
        ],
        traps: [
          "When applying Fleming's left-hand rule, the current direction is the conventional current (flow of positive charge). The direction of electron flow is opposite to the current direction. If a problem features an 'electron beam' or 'negatively charged particles,' set the particle's velocity direction opposite to the current direction before applying Fleming's left-hand rule, or use the right-hand rule with F = qvB directly while accounting for the sign of q (negative).",
          "In F = BIL sinθ, when θ = 0° (current direction parallel to the field direction) the force is F = 0. Forgetting that a wire parallel to the field experiences no force at all leads to wrongly assuming a force arises at angles other than perpendicular. On Paper 1, the correct answer to 'what is the magnitude of the force on a wire lying parallel to the magnetic field?' is 0.",
        ],
        example:
          "Force on a current-carrying conductor: in a uniform magnetic field B = 0.30 T, a wire of length L = 0.25 m carrying a current I = 4.0 A is placed perpendicular to the field (θ = 90°). The force: F = BIL sinθ = 0.30 × 4.0 × 0.25 × sin90° = 0.30 N. If the angle between the wire and the field were 30°: F = 0.30 × 4.0 × 0.25 × sin30° = 0.30 × 0.5 = 0.15 N. The direction of the force is determined by Fleming's left-hand rule — point the first finger along B and the second finger along I, and the thumb points along the force. IB marking point: state the meaning of θ (the current–B angle) and use the unit N.",
      },
      {
        title: "Force on a Moving Charge — The Lorentz Force and Circular Motion",
        subtitle:
          "Understand the direction and magnitude of F = qvB sinθ, and calculate the radius of a charged particle in circular motion in a uniform magnetic field",
        terms: [
          {
            term: "The Lorentz Force — F = qvB sinθ",
            def: "The force on a charge q moving with velocity v in a magnetic field B: F = qvB sinθ. θ: the angle between v and B. When θ = 90°, F = qvB (maximum); when θ = 0° (velocity parallel to the field), F = 0. Direction of the force: the right-hand rule — curling the four fingers of the right hand from the v direction toward the B direction, the thumb gives the force direction for a positive charge (opposite for a negative charge). Important: the Lorentz force is always perpendicular to the velocity, so it does not change the kinetic energy — the speed stays constant and only the direction changes.",
          },
          {
            term: "Circular Motion of a Charged Particle in a Magnetic Field",
            def: "For a charged particle (mass m, charge q, speed v) moving perpendicular to the magnetic field, F = qvB acts as the centripetal force. qvB = mv²/r → r = mv/(qB). The radius is proportional to mass and speed and inversely proportional to charge and field strength. The stronger the field, the smaller the circle. Period: T = 2πr/v = 2πm/(qB) — independent of speed and radius, depending only on m, q, and B (the cyclotron frequency). The mass spectrometer measures the mass of ions using this principle.",
          },
          {
            term: "Velocity Selector and Applications of the Magnetic Field",
            def: "When an electric field E and a magnetic field B are applied simultaneously, only particles with speed v = E/B travel in a straight line because the forces balance (electric force = magnetic force: qE = qvB). This is called a velocity selector. In a cyclotron, particles are accelerated by the electric field between two D-shaped electrodes (dees) and made to move in semicircles by the uniform magnetic field inside each dee, undergoing repeated acceleration. In IB, combined problems appear in which the mass is found from the radius of circular motion in a mass spectrometer after passing through a velocity selector.",
          },
        ],
        traps: [
          "Because the Lorentz force F = qvB is perpendicular to the velocity, the conclusion that it 'does no work' is important. The statement 'the charge is accelerated by F = qvB so its kinetic energy increases' is wrong. When the force is perpendicular to the velocity, F·v = 0, so the power is zero — the magnetic force cannot change the speed, only the direction. This idea is a key point that must be stated explicitly in Paper 2 extended-response marking.",
          "In r = mv/(qB), the charge q uses the magnitude (absolute value) of the charge. Positive and negative charges circulate in opposite directions, but the radius itself is the same. In IB, the answer to 'what is the radius when a positron and an electron enter the same magnetic field at the same speed?' is the same (r is identical), but the direction of curvature of the circle is opposite.",
        ],
        example:
          "Circular-motion radius calculation (mass spectrometer): a proton (mass m = 1.67 × 10⁻²⁷ kg, charge q = 1.6 × 10⁻¹⁹ C) that has passed through a velocity selector enters a uniform magnetic field B = 0.50 T perpendicularly at v = 2.0 × 10⁵ m s⁻¹. Radius of circular motion: r = mv/(qB) = (1.67 × 10⁻²⁷ × 2.0 × 10⁵)/(1.6 × 10⁻¹⁹ × 0.50) = (3.34 × 10⁻²²)/(8.0 × 10⁻²⁰) = 4.18 × 10⁻³ m ≈ 4.2 mm. If a deuterium ion of the same speed (m = 2 × 1.67 × 10⁻²⁷ kg, q = 1.6 × 10⁻¹⁹ C) enters, r is doubled ≈ 8.4 mm — two ions of different mass trace circles of different radius and are thus separated. IB marking point: deriving the circular-motion condition (centripetal force = Lorentz force) and stating the unit (m) is essential.",
      },
    ],
  },
];
