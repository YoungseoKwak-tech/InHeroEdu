/**
 * Core Notes English version — Honors Chemistry Unit 2 (Chemical Bonding & Molecules).
 * Faithful English translation of the Korean storytelling Core Notes, IB-EN depth.
 * Terms are given in English with precise, exam-ready definitions.
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
    unitName: "Chemical Bonding & Molecules",
    title: "Ionic and Covalent Bonding",
    subtitle: "The fundamental principle behind two strategies: ionic bonds that 'give and take' electrons and covalent bonds that 'share' them",
    overview:
      "There is only one reason atoms bond — to reach a more energetically stable state. There are two ways to do it. One is ionic bonding, in which electrons are handed over entirely between atoms with a large electronegativity difference (such as a metal and a nonmetal); the other is covalent bonding, in which nonmetals share an electron pair between them. The two bonds diverge on a single question: 'where are the electrons?' Understand this principle and the type of bond, the crystal structure, and the melting point of a substance all begin to connect.",
    objectives: [
      "Distinguish ionic, covalent, and metallic bonding based on electronegativity difference, and explain which kinds of element combinations form each bond",
      "Represent the electron-transfer process that forms cations and anions in ionic bonding using Lewis dot structures",
      "Explain differences in melting point, electrical conductivity, and solubility between ionic crystals and molecular solids using bonding models",
      "Explain the ductility and electrical conductivity of metals using the 'sea of electrons' model of metallic bonding",
    ],
    sections: [
      {
        title: "Ionic Bonding — Handing Over Electrons Completely",
        subtitle: "Electronegativity difference ≥ 1.7: electron transfer, ion pairs, lattice energy",
        terms: [
          {
            term: "Ionic bonding",
            def: "A bond in which an electron is transferred completely between a metal (low electronegativity) and a nonmetal (high electronegativity) of large electronegativity difference, so that the resulting cation and anion attract by electrostatic force. NaCl is the classic example: Na loses 1 electron to become Na⁺ and Cl gains 1 electron to become Cl⁻.",
          },
          {
            term: "Lattice energy",
            def: "The energy released when gaseous ions arrange into an ionic solid crystal. The larger the lattice energy, the harder the ionic crystal and the higher its melting point. Lattice energy increases as ionic charge increases and as ionic radius decreases.",
          },
          {
            term: "Octet rule",
            def: "The tendency of atoms to lose, gain, or share electrons so that their outermost shell has 8 electrons (2 for hydrogen), like a noble gas. In ionic bonding the metal loses electrons to attain the configuration of the noble gas in the previous period, while the nonmetal gains electrons to attain that of the noble gas in its own period.",
          },
          {
            term: "Properties of ionic compounds",
            def: "Ionic compounds have high melting and boiling points (strong lattice energy), are electrical insulators as solids (ions cannot move), are electrical conductors in aqueous solution or when molten (ions can move), and dissolve well in polar solvents (water).",
          },
        ],
        traps: [
          "Simply memorizing 'electronegativity difference ≥ 1.7 means ionic' is a trap. That figure is only an approximate guideline, and bonds with 'partial ionic character' exist. HF has an electronegativity difference of 1.9 (above 1.7) yet is a covalent molecule. To judge bond type, first use the element-type criterion ('metal + nonmetal = ionic, nonmetal + nonmetal = covalent') and use the electronegativity difference only as a secondary check.",
          "Writing that ionic compounds don't conduct electricity as solids 'because there are no electrons' loses marks. The ions exist, but they are fixed in the crystal lattice and cannot move. When dissolved or melted, the ions move freely so the compound conducts — 'whether the ions can move' is the key phrase.",
        ],
        example:
          "Compare the melting points of MgO and NaCl using lattice energy. MgO is the bond of Mg²⁺ (+2) and O²⁻ (−2), so the product of charges = 2 × 2 = 4; NaCl is the bond of Na⁺ (+1) and Cl⁻ (−1), so the product of charges = 1 × 1 = 1. By Coulomb's law (F ∝ q₁q₂/r²), MgO's lattice energy is much larger, so the melting point is MgO (2852 °C) >> NaCl (801 °C). Moreover, Mg²⁺ is smaller than Na⁺ and O²⁻ is smaller than Cl⁻, so the inter-ionic distance (r) is shorter for MgO, raising the lattice energy further.",
      },
      {
        title: "Covalent Bonding and Metallic Bonding",
        subtitle: "Covalent bonding that shares electrons, and metallic bonding as a sea of free electrons",
        terms: [
          {
            term: "Covalent bonding",
            def: "A bond in which two nonmetal atoms share electron pairs to bring each atom's effective electron count close to an octet. It is classified as a single bond (2 electrons), double bond (4 electrons), or triple bond (6 electrons); the higher the bond order, the shorter the bond length and the greater the bond energy.",
          },
          {
            term: "Lone pair",
            def: "An electron pair that does not participate in bonding and belongs to a single atom. A lone pair has a larger electron cloud than a bonding pair, giving it stronger repulsion in VSEPR. When drawing a Lewis structure, the electrons left after filling each atom's octet become lone pairs.",
          },
          {
            term: "Bond order",
            def: "The number of shared electron pairs connecting two atoms. Single bond = 1, double bond = 2, triple bond = 3. The higher the bond order, the greater the bond energy and the shorter the bond length. Resonance structures can produce fractional bond orders (e.g. benzene 1.5).",
          },
          {
            term: "Metallic bonding",
            def: "A bond in which electrons are delocalized and move freely through a regular lattice of metal cations. The free electrons are the carriers of electrical and thermal conduction, and the metal cations can slide past one another, which explains ductility and malleability.",
          },
        ],
        traps: [
          "Remember that the higher the bond order in a covalent molecule, the stronger the bond. N₂'s (triple bond) bond energy is 945 kJ/mol, which is very large and is why N₂ is unreactive. But a large bond energy does not mean a high melting point for the whole substance — melting point depends on intermolecular forces (IMF), whereas bond energy is the strength of the covalent bond itself. Confusing these two energies leads to wrong predictions of physical properties.",
        ],
        example: null,
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
    unitName: "Chemical Bonding & Molecules",
    title: "Lewis Structures and VSEPR Molecular Geometry",
    subtitle: "The most powerful tool for predicting a molecule's 3D shape using electron-pair repulsion theory",
    overview:
      "The reason chemists can predict a molecule's 3D shape on paper is VSEPR (Valence Shell Electron Pair Repulsion) theory. The core logic is simple — the electron pairs around the central atom try to get as far apart from one another as possible. The result is a particular spatial arrangement, and the fact that lone pairs occupy more space than bonding pairs and thereby reduce bond angles determines the molecular shape. Drawing an accurate Lewis structure is the starting point of VSEPR, and this lesson connects the two tools into one flow.",
    objectives: [
      "Apply the step-by-step rules (total valence electrons → skeleton → fill octets → minimize formal charge) to draw the Lewis structures of most molecules and polyatomic ions",
      "Explain the meaning of resonance structures and select the best resonance structure using formal charge",
      "Count VSEPR electron domains to determine the electron geometry, then remove lone pairs to find the molecular geometry",
      "Explain quantitatively how the extra repulsion of lone pairs reduces ideal bond angles",
      "Identify a molecule's symmetry from its molecular geometry to distinguish polar molecules from nonpolar molecules",
    ],
    formulas: [
      "Total valence electrons = Σ (group number of each atom) ± ionic charge",
      "Formal charge = valence electrons − nonbonding electrons − (1/2 × bonding electrons)",
      "2 electron domains → linear (180°), 3 → trigonal planar (120°), 4 → tetrahedral (109.5°), 5 → trigonal bipyramidal (90°/120°), 6 → octahedral (90°)",
    ],
    sections: [
      {
        title: "Drawing Lewis Structures",
        subtitle: "The 5-step flow from distributing valence electrons to minimizing formal charge",
        terms: [
          {
            term: "Lewis dot structure",
            def: "A 2D structural representation that shows valence electrons as dots around the atomic symbols and covalent bonds as lines (—). By showing the bonding pattern and the positions of lone pairs, it is the basis for predicting VSEPR geometry, polarity, and reactivity.",
          },
          {
            term: "Formal charge",
            def: "The difference between the number of electrons assigned to an atom (nonbonding electrons + half of bonding electrons) and its original valence-electron count. Formal charge = valence electrons − nonbonding electrons − bonding electrons/2. The best Lewis structure is the one in which all atoms' formal charges are 0 or smallest in absolute value, and any negative formal charge should sit on the more electronegative atom.",
          },
          {
            term: "Resonance structures",
            def: "When a single Lewis structure cannot fully represent the real electron distribution of a molecule, the several possible structures are linked with a double-headed arrow (↔). The real molecule is a resonance hybrid of these structures, with electrons delocalized. Examples: SO₃, NO₃⁻, O₃.",
          },
          {
            term: "Exceptions to the octet rule",
            def: "Three main exceptions: ① electron deficient — the central atom has only 6 electrons, as in BF₃, BCl₃; ② odd-electron molecules — NO, NO₂ (radicals); ③ expanded octet — atoms in period 3 or beyond (PCl₅, SF₆) can hold 10–12 electrons using d orbitals.",
          },
        ],
        traps: [
          "When counting total valence electrons for a Lewis structure, add electrons equal to the charge for an anion and subtract for a cation. For CO₃²⁻, total valence electrons = C(4) + 3×O(6) + 2 (anion charge) = 24. A mistake at this step makes every later structure wrong, so on exams write this number accurately first.",
          "When making double and triple bonds, choose the structure that minimizes formal charge. For CO₂, the O=C=O structure (two double bonds) gives all formal charges of 0 for C and O, but an O≡C−O structure (triple bond + single bond) produces large formal charges. Pick 'the possible structure whose sum of formal charges is closest to 0.'",
        ],
        example:
          "Draw the Lewis structure of SO₄²⁻ step by step. ① Total valence electrons: S(6) + 4×O(6) + 2 (anion) = 32. ② Skeleton: place 4 O around the central S, using 8 electrons for 4 S−O single bonds → 24 electrons remain. ③ Place 3 lone pairs on each O (completing each O's octet, using all 24 electrons). ④ Check formal charges: S = 6 − 0 − 8/2 = +2, each O = 6 − 6 − 2/2 = −1. Total charge = +2 + 4×(−1) = −2 ✓. To minimize formal charge, a structure adding two S−O double bonds is also possible, but note that it requires an expanded octet.",
      },
      {
        title: "VSEPR and Molecular Geometry",
        subtitle: "The flow of electron domains → electron geometry → molecular geometry → bond angle",
        terms: [
          {
            term: "Electron domain",
            def: "A group of electrons that occupies space around the central atom. Single, double, and triple bonds each count as one electron domain, and each lone pair is also one domain. The number of electron domains is the starting point of a VSEPR prediction.",
          },
          {
            term: "Electron geometry vs. molecular geometry",
            def: "Electron geometry is the arrangement of all electron domains (including lone pairs); molecular geometry is the actual shape determined by atom positions only. Example: H₂O has electron geometry = tetrahedral (4 domains) and molecular geometry = bent. Exams usually ask for the molecular geometry.",
          },
          {
            term: "Bond-angle reduction by lone pairs",
            def: "Lone pairs sit closer to the central atom than bonding pairs and occupy more space, so they compress the bonding pairs more strongly. From the ideal 109.5°, one lone pair (e.g. NH₃) gives about 107° and two lone pairs (e.g. H₂O) about 104.5°.",
          },
          {
            term: "Major molecular geometries",
            def: "Linear (180°): CO₂, BeCl₂. Trigonal planar (120°): BF₃, SO₃. Tetrahedral (109.5°): CH₄. Trigonal pyramidal (~107°): NH₃. Bent (~104.5°): H₂O. Trigonal bipyramidal (90°/120°): PCl₅. Octahedral (90°): SF₆.",
          },
        ],
        traps: [
          "Confusing electron geometry with molecular geometry is extremely common. NH₃'s electron geometry is tetrahedral (4 electron domains) but its molecular geometry is trigonal pyramidal (3 bonds + 1 lone pair). When a question says 'shape of the molecule,' write the molecular geometry; when it says 'electron geometry,' include the lone pairs. Treating the two as the same is only half right.",
          "A double bond counts as one electron domain. For CO₂, there are two double bonds around C, so the number of electron domains = 2, giving a linear structure. SO₂ has one double bond + one single bond + one lone pair around S = 3 electron domains, so its molecular geometry is bent. Beware of counting a double bond as two domains.",
        ],
        example:
          "Determine the molecular geometry of SF₄. S has 6 valence electrons; bonding with 4 F uses 4 bonding pairs, leaving 1 lone pair on S. Total electron domains = 5 (4 bonds + 1 lone pair) → electron geometry = trigonal bipyramidal. The lone pair goes to an equatorial position where more space is available, so the molecular geometry is seesaw (sawhorse). Bond angles shrink slightly below the ideal (90°, 120°) to about 86.5°/101.5°. The expanded octet (10 electrons) is possible because S is a period-3 element.",
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
    unitName: "Chemical Bonding & Molecules",
    title: "Bond Polarity, Intermolecular Forces, and Nomenclature",
    subtitle: "From bond polarity to molecular polarity, and the physical properties and naming systems that IMF govern",
    overview:
      "Knowing the molecular geometry lets you judge 'is this molecule polar or nonpolar?' And polarity determines the type of intermolecular force (IMF) that governs macroscopic properties like melting point, boiling point, and solubility. Distinguish London dispersion forces, dipole-dipole forces, and hydrogen bonding precisely, and judge which IMF dominates in which structure, and you can compare boiling points and predict solubility. Add the naming rules for ionic and molecular compounds, and you gain the ability to freely convert between chemical formulae and names.",
    objectives: [
      "Judge bond polarity using electronegativity differences and predict a molecule's overall polarity by adding dipole vectors",
      "Distinguish London dispersion forces, dipole-dipole forces, and hydrogen bonding by strength, condition, and example, and use them to explain boiling-point differences among similar molecules",
      "Interconvert the names and chemical formulae of ionic compounds using charge balance",
      "Apply systematic nomenclature for binary covalent compounds and acids (the IUPAC prefix system and oxyacid naming)",
    ],
    sections: [
      {
        title: "Bond Polarity and Molecular Polarity",
        subtitle: "If the sum of dipole vectors is 0 the molecule is nonpolar; if not, it is polar",
        terms: [
          {
            term: "Electronegativity",
            def: "An atom's relative ability to attract a shared electron pair in a bond. On the Pauling scale F is largest at 4.0, and electronegativity increases toward the upper right of the periodic table (excluding noble gases). The larger the electronegativity difference, the more the electrons shift toward the more electronegative atom and the greater the bond polarity.",
          },
          {
            term: "Bond polarity & partial charges",
            def: "In a covalent bond between two atoms of differing electronegativity, electrons shift toward the more electronegative atom, creating δ⁻ on it and δ⁺ on the less electronegative atom. This is quantified by the dipole moment (μ), in units of debye (D).",
          },
          {
            term: "Molecular polarity",
            def: "A molecule's overall dipole moment is the vector sum of its individual bond dipoles. If the molecule is symmetric, the vectors cancel and μ = 0 (nonpolar); if asymmetric, a net dipole moment arises, making it a polar molecule. Examples: CO₂ (nonpolar, linear), H₂O (polar, bent), CCl₄ (nonpolar, tetrahedral).",
          },
          {
            term: "Intermolecular forces (IMF)",
            def: "Attractive forces acting between molecules. They are far weaker than intramolecular covalent bonds but determine boiling point, melting point, vapor pressure, viscosity, and solubility. Order of strength: hydrogen bonding > dipole-dipole > London dispersion (though the LDF of a heavy nonpolar molecule can exceed hydrogen bonding).",
          },
        ],
        traps: [
          "Having polar bonds does not automatically make a molecule polar. CO₂'s C=O double bonds are polar, but thanks to its linear structure the two dipoles cancel exactly in opposite directions, giving μ = 0 — a nonpolar molecule. CCl₄ is the same. By contrast, CHCl₃ is asymmetric because the electronegativities of the CH and CCl bonds differ, so it is polar. Always confirm that the 'vector sum of bond polarities' determines molecular polarity.",
          "Hydrogen bonding is not present in every bond that contains hydrogen. It forms only in N−H, O−H, and F−H bonds — these three elements are highly electronegative and small, so they form strong electrostatic attractions with an external H. CH₄ has C−H bonds, but C's electronegativity is too low, so there is no hydrogen bonding. When a question asks which molecule can hydrogen bond, check for N, O, or F.",
        ],
        example:
          "Explain the boiling-point trend of HF, HCl, HBr, and HI using IMF. For HCl, HBr, HI, as the halogen grows larger the electron count and molecular mass increase, strengthening London dispersion forces, so the boiling points rise in the order HCl < HBr < HI. Yet HF, despite having the smallest molecular mass, has the highest boiling point (19.5 °C). The reason is that F's high electronegativity and small size form strong hydrogen bonds between molecules. This exception is the most dramatic demonstration of the strength of hydrogen bonding.",
      },
      {
        title: "Compound Nomenclature",
        subtitle: "IUPAC systematic naming of ionic compounds, binary covalent compounds, and acids",
        terms: [
          {
            term: "Ionic compound nomenclature",
            def: "Write the cation name + anion name in that order. Monatomic anions add the '-ide' suffix to the element name (Cl⁻ → chloride, O²⁻ → oxide). Transition metals indicate ionic charge with a Roman numeral (FeCl₂ → iron(II) chloride, FeCl₃ → iron(III) chloride). Polyatomic ions must be memorized as whole names (SO₄²⁻ = sulfate, NO₃⁻ = nitrate, PO₄³⁻ = phosphate).",
          },
          {
            term: "Binary covalent nomenclature",
            def: "Indicate the number of atoms with Greek prefixes (mono-, di-, tri-, tetra-, penta-, hexa-, hepta-, octa-). The first element gets a prefix (except mono-) + element name; the second gets a prefix + element root + '-ide' suffix. Examples: N₂O₄ = dinitrogen tetroxide, PCl₃ = phosphorus trichloride.",
          },
          {
            term: "Oxyacid nomenclature",
            def: "Acid naming based on the polyatomic ion. Acids containing an '-ate' ion become '-ic acid' (e.g. sulfate → sulfuric acid); acids containing an '-ite' ion become '-ous acid' (e.g. sulfite → sulfurous acid). HClO₄ = perchloric acid, HClO₃ = chloric acid, HClO₂ = chlorous acid, HClO = hypochlorous acid.",
          },
          {
            term: "Polyatomic ions",
            def: "Groups of several covalently bonded atoms that behave as a single ion. Key ions to memorize: NH₄⁺ (ammonium), OH⁻ (hydroxide), CN⁻ (cyanide), CO₃²⁻ (carbonate), HCO₃⁻ (bicarbonate), SO₄²⁻ (sulfate), SO₃²⁻ (sulfite), NO₃⁻ (nitrate), NO₂⁻ (nitrite), PO₄³⁻ (phosphate), CrO₄²⁻ (chromate), Cr₂O₇²⁻ (dichromate), MnO₄⁻ (permanganate).",
          },
        ],
        traps: [
          "When writing an ionic compound's formula with the 'cross-over method,' you must simplify if the charges are already reducible. Crossing Ca²⁺ and O²⁻ gives Ca₂O₂, but this must be reduced to CaO. Crossing Pb⁴⁺ and O²⁻ gives Pb₂O₄, but the actual formula is PbO₂. Don't forget the reduction step of dividing the subscripts by their greatest common divisor.",
          "Transition-metal oxidation states are written with Roman numerals, but main-group metals (alkali, alkaline earth) have fixed oxidation states and take no Roman numeral. Na⁺ is always +1, so it is 'sodium chloride,' not 'sodium(I) chloride.' Only metals with multiple ionic states, such as Fe, Cu, and Pb, get distinguishing notation like iron(II)/iron(III).",
        ],
        example:
          "Name the formula Pb(SO₄)₂, then work backward to find the formula of tin(IV) phosphate. Pb(SO₄)₂: there are two SO₄²⁻, so the total anion charge = −4; for electrical neutrality Pb = +4 → Pb⁴⁺ → name: lead(IV) sulfate. Reverse direction: tin(IV) = Sn⁴⁺, phosphate = PO₄³⁻. Charge balance: 4n = 3m gives the smallest integers → Sn₃(PO₄)₄. Check: 3×(+4) + 4×(−3) = +12 − 12 = 0 ✓. Don't forget to enclose a polyatomic ion in parentheses when there are two or more of it: Sn₃(PO₄)₄.",
      },
    ],
  },
];
