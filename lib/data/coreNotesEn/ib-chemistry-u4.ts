/**
 * Core Notes English version — IB Chemistry Unit 4 (Bonding & Structure).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u4-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 1,
    unitName: "Bonding & Structure",
    title: "Ionic and Covalent Bonding — Lewis Structures, Bond Polarity, and Coordinate Bonds",
    subtitle: "Complete electron transfer gives ionic bonding, sharing gives covalent bonding — how to draw both in the single visual language of Lewis dot structures",
    overview:
      "When first learning chemical bonding, students often simply memorise 'ionic = metal + non-metal, covalent = non-metal + non-metal.' But IB asks about the principles underneath. Ionic bonding occurs when the electronegativity difference is large enough that one atom completely gives up electrons while another takes them, gathering cations and anions together through electrostatic attraction. Covalent bonding, by contrast, is a bond in which two atoms share electron pairs. All of this is expressed in a single visual language — the Lewis (electron dot) structure. Drawing a Lewis structure makes clear the positions of bonding pairs and lone pairs, and lets you check whether the octet rule is satisfied. A coordinate bond (dative covalent bond) is a special case of covalent bonding in which only one atom supplies the shared electron pair. In IB this concept appears frequently in molecules such as NH₄⁺, H₃O⁺, and CO. This lesson builds the ability to express the nature of bonding perfectly in the Lewis language.",
    objectives: [
      "Compare and explain the formation of ionic bonding and covalent bonding in terms of electronegativity difference and electron transfer/sharing",
      "Draw Lewis (electron dot) structures following a systematic procedure (count total valence electrons → arrange skeleton → distribute electrons → check octets)",
      "Distinguish bond polarity from molecular polarity using electronegativity difference and molecular symmetry",
      "Explain the concept of the coordinate (dative covalent) bond using examples such as NH₄⁺ and H₃O⁺, and represent it with an arrow in a Lewis structure",
    ],
    sections: [
      {
        title: "Ionic Bonding and the Ionic Lattice",
        subtitle: "Electrostatic attraction from electron transfer — lattice energy as the measure of stability",
        terms: [
          {
            term: "Ionic Bonding",
            def: "The process in which, between elements with a sufficiently large electronegativity difference (typically ΔEN ≥ 1.8), a metal loses electrons to become a cation and a non-metal gains electrons to become an anion, after which the bond forms through electrostatic attraction between the oppositely charged ions. Ionic compounds form a 3D lattice of ions; we regard the bonding not as an 'NaCl bond' but as the collective attraction across the whole set of Na⁺·Cl⁻ ion pairs.",
          },
          {
            term: "Ionic Crystal Lattice",
            def: "A regular three-dimensional structure in which cations and anions alternate. In the NaCl lattice each Na⁺ is surrounded by 6 Cl⁻ (coordination number 6), and each Cl⁻ is likewise surrounded by 6 Na⁺. Lattice energy is the energy released when gaseous ions form an ionic crystal (always negative, exothermic); the larger the ionic charges and the smaller the ionic radii, the greater the magnitude of the lattice energy and the more stable the crystal.",
          },
          {
            term: "Properties of Ionic Compounds",
            def: "High melting and boiling points (strong lattice energy must be overcome), electrical insulators in the solid state (ions are fixed and cannot move), electrical conductors when molten or in aqueous solution (ions are free to move), and water-soluble (the polar solvent water hydrates the ions and breaks down the lattice). Not malleable or ductile (when ions of like charge are pushed into the same layer, strong repulsion causes the crystal to cleave).",
          },
        ],
        traps: [
          "Describing ionic bonding as a '1:1 bond between a specific pair of ions' is wrong. Ionic bonding is a collective attraction in which each ion interacts equally with all neighbouring ions throughout the lattice. When writing the definition of ionic bonding on IB Paper 2, you must use the phrase 'electrostatic attraction between oppositely charged ions.'",
          "Lattice energy is always negative (exothermic, energy released). 'The lattice energy is large' means its magnitude is large, indicating a more stable crystal. The lattice energy of MgO (−3791 kJ mol⁻¹) is far larger in magnitude than that of NaCl (−787 kJ mol⁻¹) because the charges of Mg²⁺/O²⁻ (+2/−2) are greater than Na⁺/Cl⁻ (+1/−1) and the ionic radii are smaller.",
        ],
        example:
          "Compare the melting points of MgO and NaCl and explain the reason in terms of lattice energy. MgO melting point: about 2852°C; NaCl melting point: 801°C. In MgO, the product of charges of Mg²⁺ (ionic radius 72 pm) and O²⁻ (140 pm) = 2×2 = 4. In NaCl, the product of charges of Na⁺ (102 pm) and Cl⁻ (181 pm) = 1×1 = 1. By Coulomb's law (F ∝ q₁q₂/r²) the magnitude of MgO's lattice energy is far greater, and more thermal energy is needed to overcome this strong attraction, so the melting point is much higher.",
      },
      {
        title: "Covalent Bonding and Lewis Structures",
        subtitle: "Sharing electron pairs to fill octets — the 4-step method for drawing Lewis structures",
        terms: [
          {
            term: "Covalent Bond",
            def: "A bond in which two atoms share electron pairs so that each achieves a stable electron configuration (octet or duet). Single bond: 1 pair (2e⁻) shared; double bond: 2 pairs (4e⁻) shared; triple bond: 3 pairs (6e⁻) shared. The higher the bond order, the shorter the bond length and the greater the bond enthalpy.",
          },
          {
            term: "Lewis (Electron Dot) Structure",
            def: "A structural formula that represents valence electrons as dots (·) and covalent bonds as lines (―). Four-step procedure: ① Count the total number of valence electrons (add electrons equal to the charge for anions, subtract for cations). ② Place the least electronegative element as the central atom in the skeleton (H is always terminal). ③ Distribute the remaining electrons as lone pairs starting from the terminal atoms to satisfy octets. ④ If the central atom's octet is still unsatisfied after the terminal atoms have octets, adjust by forming multiple bonds.",
          },
          {
            term: "Coordinate (Dative Covalent) Bond",
            def: "A special form of covalent bond in which both electrons of the shared pair are supplied by one atom (the electron-pair donor). The direction of donation is shown with an arrow (→). Example: when NH₃ accepts H⁺ to form NH₄⁺, the lone pair of nitrogen (N) is donated to H⁺ → an N→H⁺ coordinate bond forms. Once formed, a coordinate bond is indistinguishable from and equivalent to an ordinary covalent bond.",
          },
          {
            term: "Resonance Structures",
            def: "When a single Lewis structure cannot fully represent a molecule, it is shown as several Lewis structures (resonance structures), and the actual structure is regarded as a blend of these (a resonance hybrid). Example: in O₃ (ozone) the two O−O bond lengths are identical — there is no separate single/double bond as a simple Lewis structure would suggest, but a hybrid state with bond order 1.5. Resonance structures do not simply mean 'the double bond moves back and forth' but represent electron delocalisation.",
          },
        ],
        traps: [
          "In Lewis structures, an expanded octet is possible only for central atoms in Period 3 and beyond (P, S, Cl, etc.). Carbon (Period 2) can never hold more than 8 electrons. SF₆ (S has 12e⁻) or PCl₅ (P has 10e⁻) are possible, but turning CF₄ into CF₅ is impossible because C is in Period 2 — that would be a wrong structure. When drawing a Lewis structure with a Period 3 element as the central atom in IB, always consider the possibility of an expanded octet.",
          "Do not misunderstand coordinate bonds and ordinary covalent bonds as 'different kinds of bonds.' In NH₄⁺, although one of the four N−H bonds formed by a different process, after formation all four are equivalent bonds. The coordinate-bond arrow (→) merely indicates the source of the electron pair; it does not distinguish the strength or length of the final bond. IB Paper 2 sometimes includes a trap question asking 'how many of the bonds in NH₄⁺ are coordinate bonds' — the answer is 1 in terms of the formation process, but you must state clearly that in the actual structure they are all identical.",
        ],
        example:
          "Draw the Lewis structure of SO₂ and decide whether resonance structures are needed. ① Total valence electrons: S(6) + O×2(12) = 18e⁻. ② Skeleton: O-S-O (S is central). ③ Use 2 bonds (4e⁻) → distribute the remaining 14e⁻: 3 lone pairs on each O (12e⁻), 1 lone pair on S (2e⁻). Electron count on S: 2(bonds)×2 + 2(lone pair) = 6 → octet not satisfied. ④ Adjust by making one lone pair of one O into a double bond with S. Result: one S=O double bond and one S-O single bond. However, the two S-O bond lengths are experimentally identical → two resonance structures coexist. The actual bond order in SO₂ is 1.5, with the electrons delocalised.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u4-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 2,
    unitName: "Bonding & Structure",
    title: "VSEPR — Molecular Geometry and Bond Angles",
    subtitle: "How to predict the 3D shape and bond angles of any molecule using electron pair repulsion theory",
    overview:
      "Lewis structures draw a molecule as a 2D plane. But real molecules adopt specific shapes in three-dimensional space, and that shape determines a molecule's polarity, reactivity, and physical properties. The theory that predicts this is VSEPR (Valence Shell Electron Pair Repulsion). The core idea is simple: the electron domains around the central atom try to push each other as far apart as possible. Both bonding pairs and lone pairs are electron domains, but a lone pair is attracted to only one nucleus, so it occupies more space and causes stronger repulsion than a bonding pair. As a result, every additional lone pair reduces the bond angle. The progression CH₄ (109.5°) → NH₃ (107°) → H₂O (104.5°) is the evidence. Once you master VSEPR, you can immediately state a molecule's 3D name and bond angles just from its Lewis structure.",
    objectives: [
      "Use VSEPR theory to determine the electron domain geometry and molecular geometry from the number of electron domains and lone pairs on the central atom",
      "Explain the effect of lone pairs on bond angles using the repulsion strength order (lone pair-lone pair > lone pair-bonding pair > bonding pair-bonding pair), and compare the bond angles of CH₄, NH₃, and H₂O",
      "List the electron domain geometries linear, trigonal planar, tetrahedral, trigonal bipyramidal, and octahedral, and the molecular geometries derived from them, together with their bond angles",
      "Determine molecular polarity (polar/non-polar molecule) by finding the vector sum of bond dipoles based on the VSEPR molecular geometry",
    ],
    sections: [
      {
        title: "Electron Domain Geometry and Molecular Geometry",
        subtitle: "Minimise electron pair repulsion → electron domain geometry → name only the atom positions to get molecular geometry",
        terms: [
          {
            term: "Electron Domain",
            def: "A group of electrons occupying space around the central atom. A single, double, or triple bond each counts as one domain (a multiple bond still counts as 1), and a lone pair is also 1 domain. The number of electron domains (steric number) determines the geometric framework of the molecule: 2 = linear (180°), 3 = trigonal planar (120°), 4 = tetrahedral (109.5°), 5 = trigonal bipyramidal (120°/90°), 6 = octahedral (90°).",
          },
          {
            term: "Molecular Geometry",
            def: "A name describing only the 3D arrangement of the central atom and the atoms bonded to it. It is the shape seen with only the atoms visible, excluding the positions of lone pairs from the electron domain geometry. Example: 4 electron domains, 1 lone pair (NH₃) → electron domain geometry = tetrahedral, molecular geometry = trigonal pyramidal. 4 electron domains, 2 lone pairs (H₂O) → molecular geometry = bent (V-shaped).",
          },
          {
            term: "Lone Pair Compression of Bond Angles",
            def: "A lone pair is not confined between two nuclei but is attracted by only the single central-atom nucleus, so it spreads out spatially. Because of this the repulsion strength order is: lone pair-lone pair > lone pair-bonding pair > bonding pair-bonding pair. As a result, the bond angle decreases for each additional lone pair: CH₄ (0 lone pairs, 109.5°) → NH₃ (1, 107°) → H₂O (2, 104.5°).",
          },
        ],
        traps: [
          "In VSEPR, when counting the 'number of electron domains,' double and triple bonds each count as one domain. The Lewis structure of CO₂ is O=C=O with two double bonds — number of domains = 2 → linear (180°). Counting a double bond as 2 domains and writing 'tetrahedral' is wrong. You count the 'number of electron domains (directions),' not the 'number of bonds.'",
          "Confusing the molecular geometry name with the electron domain geometry name is the most common error. H₂O has a 'tetrahedral' electron domain geometry but a 'bent' molecular geometry. On both IB Paper 1 and Paper 2, writing the electron domain geometry when asked to 'state the molecular geometry' is wrong. Distinguish whether the question asks for the 'shape of the molecule' or the 'electron domain arrangement.'",
        ],
        example:
          "Determine the molecular geometry and bond angles of SF₄ using VSEPR. Valence electrons of S: 6. Use 4 electron pairs (8e⁻) to bond with 4 F atoms. Remaining electron pairs: (6−4)/2 = 1 lone pair. Number of electron domains = 4 (bonds) + 1 (lone pair) = 5 → trigonal bipyramidal electron domain geometry. The single lone pair occupies an equatorial position (securing more space). Molecular geometry = seesaw. Bond angles: equatorial F–F ≈ 116° (reduced from 120° of the trigonal bipyramid by lone pair repulsion), axial F–F ≈ 87° (reduced from the normal 90°).",
      },
      {
        title: "Molecular Polarity — The Interplay of Bond Polarity and Symmetry",
        subtitle: "Even with polar bonds, symmetry gives a non-polar molecule; asymmetry gives a polar molecule",
        terms: [
          {
            term: "Polar and Non-polar Molecules",
            def: "Molecular polarity is determined by the vector sum of the bond dipoles. ① All bonds non-polar → non-polar molecule (e.g., H₂, Cl₂). ② Even with polar bonds, if the molecule is fully symmetrical the dipole sum = 0 → non-polar molecule (e.g., linear CO₂, trigonal planar BF₃, tetrahedral CCl₄, octahedral SF₆). ③ Polar bonds present and asymmetrical (e.g., lone pairs present) → dipole sum ≠ 0 → polar molecule (e.g., H₂O, NH₃, CHCl₃).",
          },
          {
            term: "Dipole Moment and Molecular Properties",
            def: "The molecular dipole moment (μ) indicates the magnitude and direction of charge separation, with units of debye (D). If μ > 0 the molecule is polar. Polar molecules dissolve readily in polar solvents (like dissolves like), while non-polar molecules dissolve readily in non-polar solvents. In addition, dipole-dipole interactions act between polar molecules, generally giving them higher boiling points than non-polar molecules.",
          },
        ],
        traps: [
          "Questions confusing CHCl₃ (chloroform) and CCl₄ appear frequently. CCl₄ is tetrahedral and symmetrical → non-polar molecule. CHCl₃ has one of its four substituents as H (different electronegativity from Cl), so it is asymmetrical → polar molecule. You must drop the misconception that 'the same central atom with the same number of bonds means the same polarity.' If even one substituent differs, the symmetry breaks and the molecule can become polar.",
          "BF₃ is trigonal planar and a non-polar molecule. However, BF₃ has no lone pair and an incomplete octet (B has 6e⁻), so it acts as a Lewis acid. NF₃ is trigonal pyramidal with a lone pair, so it is a polar molecule. Many students confuse the differing molecular geometries and polarities of BF₃ and NF₃ — the group number of the central atom (B: Group 13, N: Group 15) determines the presence or absence of a lone pair.",
        ],
        example:
          "Compare the molecular polarity of SO₂ and CO₂. CO₂: VSEPR → 2 electron domains (two double bonds) → linear (180°) → the two C=O dipoles point in exactly opposite directions and cancel → non-polar molecule (μ=0). SO₂: VSEPR → S central, 3 electron domains (2 bonds + 1 lone pair) → bent (≈119°) → the two S=O dipoles are arranged asymmetrically → dipole sum ≠ 0 → polar molecule (μ=1.63 D). Two molecules with the same ratio of S and O, yet the difference in molecular shape completely separates whether they are polar.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u4-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 4,
    lessonNum: 3,
    unitName: "Bonding & Structure",
    title: "Intermolecular Forces, Giant Covalent and Metallic Structures, and Allotropes",
    subtitle: "Why London dispersion, dipole-dipole, and hydrogen bonding determine physical properties, and why giant structures and allotropes are classic IB high-mark topics",
    overview:
      "Why and how atoms form bonds was covered in the previous two lessons. But what force makes molecules gather together into liquids or solids? These are intermolecular forces (IMF). The stronger the IMF, the more energy is needed to pull molecules apart, raising melting point, boiling point, and enthalpy of vaporisation. The three IMFs covered in IB, in order of strength, are London dispersion force (LDF) < dipole-dipole interaction < hydrogen bonding. Hydrogen bonding appears only in molecules containing N-H, O-H, or F-H bonds, and explains the anomalously high boiling point of water and the low density of ice. Meanwhile, giant covalent structures such as diamond, graphite, and silica (SiO₂), and metallic lattices, are connected by strong covalent or metallic bonds rather than IMF, so their physical properties are entirely different. And allotropes — the same element existing in different structures, such as carbon's diamond, graphite, fullerene (C₆₀), and graphene — are classic IB topics. This lesson completes the grand narrative of how bonding and structure determine physical properties.",
    objectives: [
      "Distinguish the conditions and strengths of London dispersion force, dipole-dipole interaction, and hydrogen bonding, and explain their effects on boiling point, melting point, and solubility",
      "Connect the conditions for hydrogen bond formation (H bonded to N, O, F + a lone pair on a highly electronegative atom) to the anomalous properties of water (high boiling point, why ice is less dense than water)",
      "Compare the structural differences (number of bonds, hybridisation, bond angles, non-bonding electrons) of diamond, graphite, fullerene, and graphene, and the physical properties predicted from them (conductivity, hardness, lubricity)",
      "Explain metallic bonding as the electrostatic attraction between a lattice of cations and delocalised electrons, and use this model to explain electrical conductivity, ductility, and malleability",
    ],
    sections: [
      {
        title: "Intermolecular Forces — LDF, Dipole-Dipole, and Hydrogen Bonding",
        subtitle: "London dispersion forces exist in all molecules, and hydrogen bonding is the strongest intermolecular force",
        terms: [
          {
            term: "London Dispersion Force (LDF)",
            def: "An intermolecular force present between all molecules, including non-polar ones. It arises when an instantaneous dipole created by the momentary uneven distribution of electrons induces an induced dipole in a neighbouring molecule. Its strength increases with greater molar mass, more electrons (increased polarisability), and larger molecular contact area (straight-chain > branched). The rising boiling points of the halogens within a group (F₂, Cl₂, Br₂, I₂) are due to increasing LDF.",
          },
          {
            term: "Hydrogen Bonding",
            def: "The strongest intermolecular force. A strong dipole-dipole interaction formed between a hydrogen (δ+) bonded directly to a highly electronegative atom (N, O, F) and a lone pair (δ−) on an N, O, or F of a neighbouring molecule. Notation: X−H···Y (X, Y = N, O, F; ··· is the hydrogen bond). The actual boiling point appears much higher than the boiling point predicted in the absence of hydrogen bonding (H₂O 100°C vs predicted −80°C).",
          },
          {
            term: "Anomalous Properties of Water",
            def: "Water (H₂O), with molar mass 18, would be predicted to boil at −80°C, but actually boils at 100°C — because of hydrogen bonding. Also, ice (solid) is less dense than water (liquid): in liquid water hydrogen bonds continually break and reform so the molecules pack closely, but in ice the hydrogen bonds form a hexagonal lattice with empty space inside, increasing the volume. Because of this ice floats on water and aquatic ecosystems are maintained even in winter.",
          },
          {
            term: "IMF and Boiling Points",
            def: "Boiling point reflects the energy needed to overcome intermolecular forces. Strength order: hydrogen bonding > dipole-dipole > London dispersion force. However, the LDF of a very large non-polar molecule can exceed the dipole-dipole force of a small polar molecule. Example: non-polar I₂ (M=254, bp=184°C) > polar HCl (M=36.5, bp=−85°C). When comparing the boiling points of given molecules you must consider both molar mass and the type of intermolecular force.",
          },
        ],
        traps: [
          "Remembering the definition of hydrogen bonding as 'a bond involving hydrogen' is wrong. CH₄ and C₂H₆ have C-H bonds but no hydrogen bonding. The essential conditions for hydrogen bond formation are an H bonded directly to N, O, or F (donor) and a lone pair on N, O, or F of a neighbouring molecule (acceptor). On IB Paper 2 definition questions, failing to specify 'N, O, F' loses 1 mark.",
          "When comparing intermolecular forces, oversimplifying that 'a polar molecule always has a higher boiling point than a non-polar one' can give a wrong answer. If the difference in molar mass is large enough, the LDF of a larger non-polar molecule can exceed the dipole-dipole force of a smaller polar molecule. In IMF problems, always consider both 'which type of IMF' and 'how large the difference in molar mass (number of electrons) is.'",
        ],
        example:
          "Compare the boiling points of HF, HCl, HBr, and HI and explain the anomalously high boiling point of HF. Expectation: molar mass HF(20) < HCl(36.5) < HBr(81) < HI(128) → considering only LDF, boiling points should follow this order. Actual: HCl(−85°C) < HBr(−67°C) < HI(−35°C) follow the expected order, but HF(19.5°C) is anomalously high. Reason: the extremely high electronegativity of F (4.0) and the F-H···F hydrogen bond (very strong). HF forms intermolecular hydrogen bonds, so its boiling point is higher even than HI of far greater molar mass. In IB, this 'boiling point graph of Group 16/17 hydrides' is a frequently examined essay topic.",
      },
      {
        title: "Giant Covalent and Metallic Structures and Carbon Allotropes",
        subtitle: "Why diamond is hard and graphite is slippery — structure determines everything",
        terms: [
          {
            term: "Giant Covalent Structure",
            def: "A 3D or 2D network structure in which a vast number of atoms are connected by covalent bonds. Because all bonds are strong covalent bonds, these have very high melting and boiling points and high hardness. Generally no electrical conductivity (exceptions: graphite, graphene). Examples: diamond, graphite, silicon (Si), silicon dioxide (SiO₂). In IB, writing 'SiO₂ molecule' as if it were a molecular structure is wrong — it is a giant covalent structure.",
          },
          {
            term: "Allotropes of Carbon",
            def: "Different structures of the same element (C): (1) Diamond: each C is covalently bonded to 4 other C in a tetrahedral arrangement (sp³ hybridised) → 3D network → very hard, electrical insulator (no non-bonding electrons). (2) Graphite: each C is bonded to 3 other C in hexagonal planar layers (sp² hybridised) + 1 delocalised electron (π electron) → LDF between layers → layers slide (lubricant), electrical conductor. (3) Fullerene (C₆₀, Buckminsterfullerene): sp² hybridised, spherical molecule, held by intermolecular LDF → low melting point, can be a semiconductor. (4) Graphene: a single layer of graphite, outstanding electrical conductivity.",
          },
          {
            term: "Metallic Bonding",
            def: "A bond formed by the electrostatic attraction between metal cations (an electrostatic lattice) and delocalised electrons (the sea-of-electrons model). Because the delocalised electrons move freely, electrical and thermal conductivity are high. Since a sea of electrons lies between the cations, the bonding is maintained even when layers slide, so metals are malleable and ductile. The strength of metallic bonding increases with greater ionic charge, smaller ionic radius, and more delocalised electrons → higher melting point and hardness (e.g., Na < Mg < Al).",
          },
        ],
        traps: [
          "Writing that graphite conducts electricity 'because ions move freely' is wrong. Graphite's conductivity is because the electron remaining in the p orbital after sp² hybridisation is delocalised within the layer, forming a π electron cloud that moves freely. The charge carriers are electrons, not ions. In IB, the explanation of graphite conductivity must be written as 'delocalised electrons within each layer.'",
          "Both diamond and graphite are giant covalent structures, but between the layers of graphite the connection is London dispersion force (LDF), not covalent bonds. Therefore 'all bonds in graphite are covalent' is a false statement. The C-C bonds within a graphite layer are covalent (strong), while the interaction between layers is LDF (weak) — this difference explains the lubricating property of graphite, in which the layers slide easily.",
        ],
        example:
          "Compare the electrical conductivity, hardness, and melting point of graphite and diamond by structure. Diamond: sp³ hybridised, each C covalently bonded to 4 other C → 3D network → no delocalised electrons → electrical insulator. All bonds are strong covalent bonds → very high hardness (Mohs hardness 10), very high melting point (3550°C). Graphite: sp² hybridised, each C covalently bonded to 3 other C within a layer + 1 delocalised π electron → electrical conductor. LDF between layers (weak) → layers slide easily → lubricant, pencil lead. Melting point is high but lower than diamond's. Conclusion: even for the same element, the difference in bonding mode and structure makes the physical properties completely different.",
      },
    ],
  },
];
