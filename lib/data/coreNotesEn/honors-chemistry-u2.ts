/**
 * Core Notes English version — Honors Chemistry Unit 2 (Chemical Bonding).
 * Faithful English rendering of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
 * Source: lib/data/authored-corenotes/honors-chemistry.json, unit 2 (lessonNum 1-6).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_CHEMISTRY_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-chemistry-u2-l1",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 1,
    unitName: "Chemical Bonding",
    title: "Why Metals Give Away Electrons and What That Creates",
    subtitle: "Ionic bonding: electron transfer, the octet rule, lattice energy, and the properties of ionic compounds",
    overview:
      "Metals have low ionization energies, so they readily lose their few valence electrons; nonmetals have high electron affinities, so they gladly accept them. This transfer creates oppositely charged ions that snap together by electrostatic attraction into an ionic bond. The driving force is the octet rule — atoms reach the stable electron count of a noble gas. The resulting ions stack into a rigid 3-D lattice, and the energy released in forming that lattice (lattice energy) explains why ionic compounds have high melting points, are brittle, and conduct only when molten or dissolved.",
    objectives: [
      "Explain ionic bonding as electron transfer driven by the octet rule",
      "Predict ion charges from group number",
      "Relate lattice energy to ion charge and size",
      "Explain the physical properties of ionic compounds from their lattice",
    ],
    formulas: [
      "Octet rule: atoms gain/lose electrons to reach 8 valence electrons",
      "Lattice energy ∝ (charge₁ × charge₂) / (distance between ion centers)",
      "Coulomb's law: F ∝ q₁q₂ / r²",
    ],
    sections: [
      {
        title: "Electron Transfer and the Octet Rule",
        subtitle: "Why Na⁺ and Cl⁻ are happier than Na and Cl",
        body: "Sodium has one valence electron; losing it leaves a filled shell (the neon configuration) and a +1 ion. Chlorine needs one electron to complete its octet; gaining it gives the argon configuration and a −1 ion. The opposite charges attract, forming the ionic bond in NaCl. The 'reward' for both atoms is the stable noble-gas configuration, which is why the transfer is energetically favorable.",
        keyIdea: "Metals lose electrons, nonmetals gain them, and both end up with a stable octet — the bond is the electrostatic attraction that follows.",
        terms: [
          { term: "Ionic bond", def: "The electrostatic attraction between oppositely charged ions formed by electron transfer." },
          { term: "Octet rule", def: "Atoms tend to gain, lose, or share electrons to achieve eight valence electrons (a noble-gas configuration)." },
          { term: "Cation", def: "A positively charged ion formed when an atom loses electrons (typically a metal)." },
          { term: "Anion", def: "A negatively charged ion formed when an atom gains electrons (typically a nonmetal)." },
        ],
        traps: [
          "Electrons are TRANSFERRED in ionic bonds, not shared (that is covalent).",
          "Charge is set by reaching an octet, not by the atom's original electron count alone.",
        ],
      },
      {
        title: "Lattice Energy and Ionic Properties",
        subtitle: "Why salt is hard, brittle, and only conducts when melted",
        body: "Ions arrange into a repeating 3-D lattice that maximizes attraction and minimizes repulsion. Lattice energy — the energy released when gaseous ions form the solid — rises with higher charges and smaller ions (MgO ≫ NaCl). High lattice energy means high melting points. Ionic solids are brittle because shifting a layer aligns like charges, which repel and shatter the crystal. They conduct only when ions are free to move — molten or dissolved.",
        keyIdea: "Stronger lattice energy (higher charge, smaller ions) → higher melting point; mobile ions are needed for conduction.",
        terms: [
          { term: "Lattice energy", def: "The energy released when separated gaseous ions combine into one mole of solid ionic lattice." },
          { term: "Crystal lattice", def: "The ordered, repeating 3-D arrangement of ions in an ionic solid." },
          { term: "Brittleness", def: "Tendency to shatter when layers shift and like charges align, causing repulsion." },
        ],
        traps: [
          "Solid ionic compounds do NOT conduct — the ions are locked in place; only molten/dissolved do.",
          "Lattice energy depends on both charge AND ion size — don't ignore the distance term.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u2-l2",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 2,
    unitName: "Chemical Bonding",
    title: "Why Nonmetals Share Electrons (And How to Draw It)",
    subtitle: "Covalent bonding, Lewis structures, single/double/triple bonds, and exceptions to the octet rule",
    overview:
      "When two nonmetals meet, neither can pull an electron fully away, so they share pairs of electrons — a covalent bond. Sharing one pair is a single bond, two pairs a double bond, three pairs a triple bond, with bond strength rising and bond length shrinking as more pairs are shared. Lewis structures map these shared and lone pairs so we can predict molecules' shapes and reactivity. A few species break the octet rule — too few electrons (BF₃), an odd electron (NO), or an expanded octet (SF₆).",
    objectives: [
      "Explain covalent bonding as electron sharing",
      "Draw Lewis structures for molecules and polyatomic ions",
      "Relate bond order to bond length and bond strength",
      "Identify common exceptions to the octet rule",
    ],
    formulas: [
      "Bond order = number of shared electron pairs (1 = single, 2 = double, 3 = triple)",
      "Bond length: triple < double < single; Bond strength: triple > double > single",
      "Total valence e⁻ = Σ group electrons (− charge for cations, + for anions)",
    ],
    sections: [
      {
        title: "Covalent Bonds and Bond Order",
        subtitle: "Sharing to fill the shell",
        body: "Two hydrogen atoms each need one more electron, so they share a pair — each 'feels' two electrons and reaches helium's stable count. Nitrogen shares three pairs (N≡N) to complete both octets. More shared pairs pull the nuclei closer and bind them more tightly, so a triple bond is shorter and stronger than a double, which beats a single. This bond-order trend explains reactivity: the very strong N≡N triple bond makes N₂ famously unreactive.",
        keyIdea: "More shared pairs (higher bond order) → shorter, stronger bonds.",
        terms: [
          { term: "Covalent bond", def: "A bond formed by sharing one or more pairs of electrons between nonmetal atoms." },
          { term: "Bond order", def: "The number of shared electron pairs between two atoms (single = 1, double = 2, triple = 3)." },
          { term: "Lone pair", def: "A valence electron pair not involved in bonding, localized on one atom." },
          { term: "Bonding pair", def: "A shared pair of electrons that forms the covalent bond." },
        ],
        traps: [
          "Higher bond order means SHORTER bond — students often invert length and strength.",
          "Sharing electrons does not mean equal sharing — polarity comes later (next lesson).",
        ],
      },
      {
        title: "Drawing Lewis Structures and Octet Exceptions",
        subtitle: "A recipe, and when it breaks",
        body: "To draw a Lewis structure: count total valence electrons, place the least electronegative atom in the center, connect with single bonds, then distribute remaining electrons to complete octets (making multiple bonds if needed). Three exceptions matter: electron-deficient molecules (BF₃, only 6 around B), odd-electron radicals (NO), and expanded octets for period-3+ elements with available d-orbitals (SF₆, PCl₅).",
        keyIdea: "Lewis recipe: total electrons → central atom → bonds → complete octets; watch for the three exception types.",
        terms: [
          { term: "Lewis structure", def: "A diagram showing bonding pairs (lines) and lone pairs (dots) for all atoms in a molecule." },
          { term: "Expanded octet", def: "More than eight valence electrons around a central atom (period 3+, e.g. SF₆)." },
          { term: "Electron-deficient", def: "A stable molecule with fewer than eight electrons around a central atom (e.g. BF₃)." },
          { term: "Formal charge", def: "A bookkeeping charge used to choose the best Lewis structure: valence − lone − ½ bonding electrons." },
        ],
        traps: [
          "Hydrogen follows a 'duet' (2 electrons), not an octet.",
          "Don't force an octet on B or on expanded-octet centers — some molecules legitimately break the rule.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u2-l3",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 3,
    unitName: "Chemical Bonding",
    title: "How Molecular Shape Controls Everything",
    subtitle: "VSEPR theory: electron-pair repulsion, geometry, bond angles, and the effect of lone pairs",
    overview:
      "A molecule's three-dimensional shape — not just which atoms are bonded — determines its polarity, reactivity, and even biological function. VSEPR theory predicts shape from one idea: electron groups around a central atom repel and spread as far apart as possible. Counting bonding groups and lone pairs gives the geometry (linear, trigonal planar, tetrahedral, etc.). Lone pairs repel more strongly than bonding pairs, so they compress bond angles — which is why water is bent at 104.5° rather than the ideal 109.5°.",
    objectives: [
      "State the central idea of VSEPR theory",
      "Predict molecular geometry from electron-group count",
      "Explain how lone pairs distort bond angles",
      "Distinguish electron geometry from molecular geometry",
    ],
    formulas: [
      "2 groups → linear (180°); 3 → trigonal planar (120°); 4 → tetrahedral (109.5°)",
      "5 → trigonal bipyramidal (90/120°); 6 → octahedral (90°)",
      "Lone-pair repulsion > bonding-pair repulsion → angles compress",
    ],
    sections: [
      {
        title: "VSEPR: Electron Groups Spread Out",
        subtitle: "The one rule behind every shape",
        body: "Electron groups (bonds — single, double, or triple all count as one group — and lone pairs) carry negative charge and repel one another, so they arrange to maximize separation. Two groups go linear, three trigonal planar, four tetrahedral. CO₂ (2 groups) is linear; BF₃ (3 groups) is trigonal planar; CH₄ (4 groups) is tetrahedral at 109.5°. Counting groups is the whole game.",
        keyIdea: "Electron groups arrange to be as far apart as possible — count groups to get the geometry.",
        terms: [
          { term: "VSEPR theory", def: "Valence-Shell Electron-Pair Repulsion: electron groups arrange to minimize repulsion." },
          { term: "Electron group", def: "A bond (of any order) or a lone pair around the central atom; each counts as one." },
          { term: "Bond angle", def: "The angle between two bonds meeting at the central atom." },
          { term: "Electron geometry", def: "The arrangement of ALL electron groups (bonds + lone pairs) around the central atom." },
        ],
        traps: [
          "A double or triple bond counts as ONE electron group, not two or three.",
          "Electron geometry counts lone pairs; molecular geometry describes only the atoms.",
        ],
      },
      {
        title: "Lone Pairs Distort the Angles",
        subtitle: "Why water is bent, not straight",
        body: "Lone pairs sit closer to the central atom and occupy more angular space than bonding pairs, so they push bonding pairs together. Water has four electron groups (tetrahedral electron geometry) but two are lone pairs, giving a bent molecular shape with a compressed 104.5° angle. Ammonia (one lone pair) is trigonal pyramidal at 107°. So electron geometry and molecular geometry differ whenever lone pairs are present.",
        keyIdea: "Lone pairs repel harder than bonds, compressing bond angles and bending the molecular shape.",
        terms: [
          { term: "Molecular geometry", def: "The shape defined by the positions of the atoms only (lone pairs invisible)." },
          { term: "Bent (angular)", def: "A shape from two bonds + two lone pairs (e.g. H₂O, ~104.5°)." },
          { term: "Trigonal pyramidal", def: "A shape from three bonds + one lone pair (e.g. NH₃, ~107°)." },
        ],
        traps: [
          "Don't report water as linear — its two lone pairs make it bent.",
          "Lone-pair compression means actual angles are slightly LESS than the ideal values.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u2-l4",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 4,
    unitName: "Chemical Bonding",
    title: "Why Some Molecules Are Polar and Others Aren't",
    subtitle: "Bond polarity, molecular polarity, and how shape decides whether dipoles cancel",
    overview:
      "A bond is polar when the two atoms differ in electronegativity, pulling the shared electrons toward the more electronegative atom and creating a dipole. But a molecule's overall polarity depends on whether those bond dipoles add up or cancel — and that is set by its shape. CO₂ has two polar C=O bonds, yet it is nonpolar because its linear shape makes the dipoles cancel. Water has two polar bonds and a bent shape, so the dipoles add up and the molecule is strongly polar.",
    objectives: [
      "Distinguish bond polarity from molecular polarity",
      "Use electronegativity difference to classify bonds",
      "Predict molecular polarity by summing bond dipoles as vectors",
      "Explain why symmetric molecules can be nonpolar despite polar bonds",
    ],
    formulas: [
      "ΔEN < 0.4 → nonpolar covalent; 0.4–1.7 → polar covalent; > 1.7 → ionic",
      "Molecular dipole = vector sum of bond dipoles",
      "Symmetric arrangement → dipoles cancel → nonpolar molecule",
    ],
    sections: [
      {
        title: "Bond Polarity from Electronegativity",
        subtitle: "Unequal sharing creates a dipole",
        body: "When bonded atoms differ in electronegativity, the more electronegative atom pulls electron density toward itself, becoming partially negative (δ−) while the other is partially positive (δ+). This separation of charge is a bond dipole. A small difference (C–H) is nearly nonpolar; a large one (H–F) is strongly polar; a very large difference (Na–Cl) tips into ionic. The dipole points toward the more electronegative atom.",
        keyIdea: "The bigger the electronegativity gap, the more polar the bond; the dipole points to the δ− atom.",
        terms: [
          { term: "Electronegativity difference (ΔEN)", def: "The gap in electron-attracting power between two bonded atoms; sets bond polarity." },
          { term: "Dipole", def: "A separation of partial positive and negative charge across a bond or molecule." },
          { term: "Polar covalent bond", def: "A covalent bond with unequal electron sharing (ΔEN ≈ 0.4–1.7)." },
          { term: "Partial charge (δ)", def: "A fractional charge (δ+/δ−) arising from unequal sharing, not a full ionic charge." },
        ],
        traps: [
          "A polar bond is not the same as an ionic bond — electrons are still shared, just unequally.",
          "The dipole points TOWARD the more electronegative atom (δ−).",
        ],
      },
      {
        title: "Molecular Polarity Depends on Shape",
        subtitle: "Why CO₂ is nonpolar but H₂O is polar",
        body: "Bond dipoles are vectors; the molecule's net polarity is their vector sum. In linear CO₂ the two C=O dipoles point opposite ways and cancel — nonpolar overall, despite polar bonds. In bent water the two O–H dipoles don't cancel; they add to a net dipole, making water polar. Symmetric shapes (linear, trigonal planar, tetrahedral with identical bonds) cancel; asymmetric shapes or lone pairs leave a net dipole.",
        keyIdea: "Polar bonds + symmetric shape = nonpolar molecule; polar bonds + asymmetric shape = polar molecule.",
        terms: [
          { term: "Molecular polarity", def: "Whether a molecule has a net dipole, determined by the vector sum of bond dipoles." },
          { term: "Net dipole moment", def: "The overall direction and magnitude of charge separation in a molecule." },
          { term: "Molecular symmetry", def: "A geometric balance that causes bond dipoles to cancel, yielding a nonpolar molecule." },
        ],
        traps: [
          "Polar bonds do NOT guarantee a polar molecule — symmetry can cancel them (CO₂, CCl₄).",
          "Always check the shape before declaring a molecule polar.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u2-l5",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 5,
    unitName: "Chemical Bonding",
    title: "What Determines If a Solid Will Melt Easily",
    subtitle: "Intermolecular forces: dispersion, dipole-dipole, and hydrogen bonding, and how they set boiling and melting points",
    overview:
      "Inside a molecule, atoms are held by strong covalent bonds; between molecules, much weaker intermolecular forces (IMFs) decide whether a substance is a gas, liquid, or solid and how easily it melts or boils. The three main IMFs, weakest to strongest, are London dispersion forces (in everything, growing with size), dipole-dipole forces (between polar molecules), and hydrogen bonding (a strong special case when H bonds to N, O, or F). The strength of the IMFs — not the strength of covalent bonds — sets boiling and melting points.",
    objectives: [
      "Distinguish intramolecular bonds from intermolecular forces",
      "Rank dispersion, dipole-dipole, and hydrogen bonding by strength",
      "Explain how molecular size and polarity affect IMF strength",
      "Predict relative boiling/melting points from IMFs",
    ],
    formulas: [
      "IMF strength: hydrogen bonding > dipole-dipole > London dispersion",
      "Dispersion force ↑ with molar mass / number of electrons (polarizability)",
      "Stronger IMFs → higher boiling and melting points",
    ],
    sections: [
      {
        title: "The Three Intermolecular Forces",
        subtitle: "Weak attractions that decide phase",
        body: "London dispersion forces arise from momentary, fluctuating dipoles and exist in every substance; they grow stronger with more electrons (larger, heavier molecules), which is why I₂ is solid but F₂ is gas. Dipole-dipole forces act between permanent dipoles in polar molecules. Hydrogen bonding is an especially strong dipole-dipole interaction when H is bonded to the small, highly electronegative N, O, or F — responsible for water's remarkably high boiling point.",
        keyIdea: "Dispersion (all molecules) < dipole-dipole (polar) < hydrogen bonding (H–N/O/F).",
        terms: [
          { term: "London dispersion force", def: "Attraction from instantaneous, induced dipoles; present in all molecules, stronger for larger ones." },
          { term: "Dipole-dipole force", def: "Attraction between the permanent dipoles of polar molecules." },
          { term: "Hydrogen bond", def: "A strong dipole-dipole attraction when H is covalently bonded to N, O, or F." },
          { term: "Polarizability", def: "How easily an electron cloud distorts; larger clouds give stronger dispersion forces." },
        ],
        traps: [
          "Hydrogen bonding is an intermolecular FORCE, not an actual covalent bond.",
          "Dispersion forces are not negligible — for big molecules they can exceed dipole-dipole forces.",
        ],
      },
      {
        title: "IMFs Set Boiling and Melting Points",
        subtitle: "Why water boils so much higher than expected",
        body: "To boil a liquid you must overcome the IMFs holding molecules together — not break covalent bonds. Stronger IMFs mean more energy is required, so higher boiling/melting points. Water (H-bonding) boils at 100 °C while similar-sized H₂S (only dipole-dipole) boils at −60 °C. Among nonpolar molecules, larger ones with more electrons have stronger dispersion forces and higher boiling points.",
        keyIdea: "Boiling/melting points track IMF strength: stronger IMFs → harder to separate molecules → higher temperatures.",
        terms: [
          { term: "Boiling point", def: "The temperature at which a liquid's vapor pressure equals atmospheric pressure; rises with IMF strength." },
          { term: "Volatility", def: "How readily a substance evaporates; high for weak IMFs, low for strong IMFs." },
          { term: "Surface tension", def: "The 'skin' effect at a liquid surface from cohesive IMFs; strong in hydrogen-bonded water." },
        ],
        traps: [
          "Boiling does NOT break covalent bonds — it overcomes intermolecular forces only.",
          "Compare IMFs, not molar masses alone, when ranking boiling points of polar vs nonpolar substances.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-chemistry-u2-l6",
    courseId: "honors-chemistry",
    subjectLabel: "Honors Chemistry",
    emoji: "⚗️",
    unit: 2,
    lessonNum: 6,
    unitName: "Chemical Bonding",
    title: "Why Metallic Bonds Explain All Metal Properties",
    subtitle: "The electron-sea model and how delocalized electrons give metals conductivity, malleability, and luster",
    overview:
      "Metals don't transfer or share electrons in pairs — they pool their valence electrons into a shared 'sea' of delocalized electrons flowing around fixed positive metal ions. This single model explains every signature metal property at once: free electrons carry charge (electrical conductivity) and heat (thermal conductivity), the nondirectional bonding lets layers slide without shattering (malleability and ductility), and the mobile electrons reflect light (luster). It also explains why alloying changes hardness.",
    objectives: [
      "Describe the electron-sea model of metallic bonding",
      "Explain electrical and thermal conductivity from delocalized electrons",
      "Explain malleability and ductility from nondirectional bonding",
      "Relate luster and alloy behavior to the metallic model",
    ],
    formulas: [
      "Metallic bond = fixed cations + delocalized 'sea' of valence electrons",
      "More delocalized electrons / higher charge → stronger metallic bond",
      "Conductivity ∝ mobility of delocalized electrons",
    ],
    sections: [
      {
        title: "The Electron-Sea Model",
        subtitle: "Fixed ions in a flowing sea of electrons",
        body: "In a metal, atoms release their valence electrons, which become delocalized — free to move throughout the whole lattice — leaving behind a regular array of positive metal ions. The attraction between the positive ions and the negative electron sea is the metallic bond. Because the electrons belong to no single atom, the bonding is strong but nondirectional, which is the key to metals' unique combination of properties.",
        keyIdea: "Metallic bonding = positive ions held together by a shared, mobile sea of delocalized electrons.",
        terms: [
          { term: "Metallic bond", def: "The attraction between fixed positive metal ions and a surrounding sea of delocalized electrons." },
          { term: "Delocalized electrons", def: "Valence electrons free to move throughout the metal rather than belonging to one atom." },
          { term: "Electron-sea model", def: "The picture of a metal as positive ions immersed in a mobile 'sea' of valence electrons." },
        ],
        traps: [
          "Metallic bonding involves neither transfer (ionic) nor localized sharing (covalent) — the electrons are delocalized.",
          "The positive ions stay in place; it is the electrons that move.",
        ],
      },
      {
        title: "Explaining Metal Properties",
        subtitle: "One model, every property",
        body: "Delocalized electrons drift under a voltage, giving high electrical conductivity, and they transfer kinetic energy quickly, giving thermal conductivity. Because bonding is nondirectional, hammering a metal slides rows of ions past each other without breaking the bond — so metals are malleable (sheets) and ductile (wires) instead of brittle like ionic solids. The free electrons absorb and re-emit light, producing luster. Adding different-sized atoms (alloying) disrupts the layers, making the metal harder.",
        keyIdea: "Delocalized electrons explain conductivity and luster; nondirectional bonding explains malleability and ductility.",
        terms: [
          { term: "Malleability", def: "The ability to be hammered into sheets; from layers sliding without breaking metallic bonds." },
          { term: "Ductility", def: "The ability to be drawn into wires; same nondirectional-bonding origin as malleability." },
          { term: "Luster", def: "The shiny appearance of metals from delocalized electrons reflecting light." },
          { term: "Alloy", def: "A mixture of a metal with other elements; disrupts layer sliding to increase hardness." },
        ],
        traps: [
          "Metals bend rather than shatter precisely BECAUSE the bonding is nondirectional — the opposite of ionic brittleness.",
          "Conductivity comes from moving electrons, not moving ions (unlike molten ionic compounds).",
        ],
      },
    ],
  },
];
