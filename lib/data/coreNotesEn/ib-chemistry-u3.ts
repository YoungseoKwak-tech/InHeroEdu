/**
 * Core Notes English version — IB Chemistry Unit 3 (Periodicity).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u3-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 1,
    unitName: "Periodicity",
    title: "Structure of the Periodic Table — Periods, Groups, Blocks, and Element Classification",
    subtitle: "How periods, groups, and blocks in the table ordered by atomic number connect to electron configuration",
    overview:
      "The periodic table is not simply a numbered list of elements. First proposed by Mendeleev and completed by modern quantum theory, it is a 'map' of electron configuration. Elements in the same horizontal row (period) are filling electrons into the same principal shell (n), while elements in the same vertical column (group) share the same number of valence electrons and therefore exhibit similar chemical properties. The s, p, d, and f blocks visually indicate which subshell receives the last electron. IB expects you to freely convert between an element's electron configuration and its position on the periodic table — and vice versa. This lesson builds that core skill.",
    objectives: [
      "Explain the meaning of period, group, and block (s/p/d/f) in the periodic table in terms of electron configuration",
      "Determine the period, group, and block of an element from its electron configuration",
      "Classify elements as metals, non-metals, or metalloids/semi-metals using their position in the periodic table and their physical and chemical properties",
      "Describe the definition and general properties of transition metals (variable oxidation states, coloured ions, catalytic activity)",
    ],
    sections: [
      {
        title: "Structure: Periods, Groups, and Blocks",
        subtitle: "Electron configuration determines the structure of the table",
        terms: [
          {
            term: "Period",
            def: "A horizontal row of the periodic table. Elements in the same period are filling electrons into the same highest principal energy level (n). Period 1 contains only H and He (filling 1s); Period 2 contains Li–Ne (filling 2s and 2p); Period 3 contains Na–Ar (filling 3s and 3p); Period 4 contains K–Kr (filling 4s, 3d, and 4p). The period number equals the principal quantum number n of the outermost electron.",
          },
          {
            term: "Group",
            def: "A vertical column of the periodic table, numbered 1–18. Elements in the same group share the same valence electron configuration and therefore similar chemical properties. For example: Group 1 alkali metals all have ns¹; Group 17 halogens all have ns²np⁵; Group 18 noble gases all have ns²np⁶ (He is 1s²).",
          },
          {
            term: "Block",
            def: "A region of the periodic table defined by which subshell receives the last electron. s block (Groups 1–2): last electron enters an s subshell. p block (Groups 13–18): p subshell. d block (Groups 3–12, transition metals): (n−1)d subshell. f block (lanthanides and actinides): (n−2)f subshell. Knowing the block allows you to read an electron configuration directly from the periodic table.",
          },
          {
            term: "Valence Electrons",
            def: "The outermost electrons that participate in chemical bonding. For s- and p-block elements the number of valence electrons equals the last digit of the group number (Group 1 = 1, Group 2 = 2, Group 13 = 3 … Group 17 = 7, Group 18 = 8). For d-block transition metals, valence electrons include both the (n−1)d and ns electrons, so the simple group-number formula does not apply directly.",
          },
        ],
        traps: [
          "d-block elements in Period 4 (e.g., Fe, Z=26) belong to Period 4, but the last subshell filled is 3d, not 4d. Oversimplifying '4th period = 4th shell is outermost' leads to errors. Fe has the configuration [Ar] 3d⁶ 4s²: the outermost shell is 4s, but the last subshell filled is 3d. Always use 'last subshell filled' as the criterion for block assignment.",
          "Helium (He) has the configuration 1s², placing it in the s block, yet its chemical behaviour (unreactivity) matches p-block noble gases, so it is placed in Group 18. If an IB question asks which block He belongs to, writing 'p block' will lose marks. He is s block.",
        ],
        example:
          "Determine the period, group, and block of selenium (Se, Z=34). Electron configuration: [Ar] 3d¹⁰ 4s² 4p⁴. Last subshell filled = 4p → p block. Highest principal quantum number n = 4 → Period 4. Valence electrons: 4s²4p⁴ = 6 → Group 16. Conclusion: Se is in Period 4, Group 16, p block. On the periodic table it sits directly below sulfur (S) in the chalcogen group.",
      },
      {
        title: "Classifying Metals, Non-metals, and Metalloids",
        subtitle: "Left of the staircase line = metals; right = non-metals",
        terms: [
          {
            term: "Metal",
            def: "Located on the left and centre of the periodic table. Properties: good conductors of heat and electricity (free electrons in the solid state), metallic lustre, malleable, ductile, mostly solid at room temperature (exception: Hg is a liquid). Chemically, metals readily lose electrons to form cations; they have low ionisation energies.",
          },
          {
            term: "Non-metal",
            def: "Located in the upper-right of the periodic table. Properties: poor conductors of heat and electricity, no metallic lustre, not malleable or ductile, brittle when solid. Exist as gases at room temperature (H₂, N₂, O₂, F₂, Cl₂) or solids (C, P, S, I₂). Non-metals gain electrons to form anions or form covalent bonds.",
          },
          {
            term: "Metalloid / Semi-metal",
            def: "Elements at the boundary between metals and non-metals: B, Si, Ge, As, Sb, Te. They possess some metallic properties (lustre, semiconductor behaviour) and some non-metallic properties. Silicon (Si) is the key semiconductor material in the electronics industry. IB questions on metalloids typically focus on their intermediate electrical conductivity.",
          },
          {
            term: "Transition Metal",
            def: "A d-block element (Groups 3–12) that has at least one stable oxidation state with an incompletely filled d subshell. Key properties: variable oxidation states, coloured ions (d–d electron transitions absorb visible light), catalytic activity (Fe, Pt, Ni), and complex/ligand formation. Note: Zn ([Ar]3d¹⁰ 4s²) is a d-block element but has a completely filled d subshell in all its stable ions, so it does not strictly meet the IB definition of a transition metal.",
          },
        ],
        traps: [
          "The IB definition of a transition metal is 'an element that has at least one stable ion with a partially filled d subshell.' Zn²⁺ = [Ar]3d¹⁰ (d fully filled) and Sc³⁺ = [Ar] (d completely empty), so both Zn and Sc are d-block elements but are NOT transition metals by the IB definition. A 2-mark question asking for this definition appears regularly on Paper 2.",
          "A common error is classifying metalloids as non-metals. Silicon (Si) and germanium (Ge) are metalloids with semiconductor properties — they are not non-metals. Memorise the staircase line: B–Si–Ge–As–Sb–Te–Po.",
        ],
        example:
          "Verify whether cobalt (Co, Z=27) is a transition metal by the IB definition. Electron configuration of Co: [Ar] 3d⁷ 4s². Co²⁺: remove 4s electrons first → [Ar] 3d⁷ (d subshell incompletely filled ✓). Co³⁺: [Ar] 3d⁶ (still incomplete ✓). Because both stable ions (Co²⁺ and Co³⁺) have a partially filled 3d subshell, Co meets the IB definition of a transition metal. The pink colour of Co²⁺ complexes is also a direct consequence of this partial d filling.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u3-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 2,
    unitName: "Periodicity",
    title: "Atomic Radius, Ionisation Energy, Electron Affinity, and Electronegativity — Periodic Trends",
    subtitle: "Using effective nuclear charge and shielding to explain the direction and reasoning behind every periodic trend",
    overview:
      "The power of the periodic table lies in its predictive ability. Knowing an element's position lets you predict its atomic size, the energy required to remove an electron, and its ability to attract electrons. Two keys unlock all these predictions: effective nuclear charge (Z_eff) and shielding. Moving right across a period, the proton count increases while inner electrons remain roughly constant, so Z_eff increases. The nucleus pulls electrons more strongly, atomic radius decreases, removing an electron becomes harder, and the attraction for shared electrons grows. Moving down a group, the principal quantum number n increases, shielding grows, and the effective influence of the nucleus weakens — reversing the trends. This single logical framework explains all four trends.",
    objectives: [
      "Use the concepts of effective nuclear charge (Z_eff) and shielding to explain periodic trends in atomic radius, ionisation energy, electron affinity, and electronegativity",
      "Describe the direction and reason for change in each property when moving left to right across a period and top to bottom down a group",
      "Explain the anomalous decreases at B and O in the general increase of first ionisation energy across Period 2 using electron configurations",
      "Determine the group (number of valence electrons) of an element from a large jump in successive ionisation energies",
    ],
    formulas: [
      "Z_eff ≈ Z − S  (Z: atomic number, S: shielding constant)",
      "Ionisation energy (IE): M(g) → M⁺(g) + e⁻  ΔH = +IE  (always endothermic)",
    ],
    sections: [
      {
        title: "Atomic Radius and Ionic Radius",
        subtitle: "A stronger nuclear charge pulls electrons closer",
        terms: [
          {
            term: "Atomic Radius",
            def: "Defined as half the internuclear distance between two bonded atoms of the same element (covalent radius). Across a period (left to right): Z_eff increases → electrons are pulled more strongly toward the nucleus → radius decreases. Down a group: n increases → each successive principal shell adds a new layer of electrons → radius increases.",
          },
          {
            term: "Ionic Radius",
            def: "The size of an ion as determined from interionic distances in ionic crystals. Cations: loss of electrons reduces electron–electron repulsion and increases Z_eff over the remaining electrons → smaller than the neutral atom. Anions: gain of electrons decreases Z_eff per electron → electrons expand → larger than the neutral atom. In an isoelectronic series, the ion with more protons has a smaller radius.",
          },
          {
            term: "Isoelectronic Series",
            def: "A set of ions (or atoms) that all have the same number of electrons. Example: N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺ all have 10 electrons. Within such a series, increasing the number of nuclear protons raises Z_eff and decreases the ionic radius. IB frequently tests the size ordering within isoelectronic series.",
          },
        ],
        traps: [
          "Many students reverse the direction when comparing cation and anion radii. The correct order is: cation < neutral atom < anion. Writing Na < Na⁺ is wrong. The correct relationship is Na⁺ (102 pm) < Na (186 pm).",
          "Do not assume that ions with the same number of electrons have the same radius. Even with identical electron counts, different nuclear charges produce different Z_eff values and therefore different radii. O²⁻ (140 pm) > F⁻ (133 pm) > Na⁺ (102 pm): greater Z means smaller radius.",
        ],
        example:
          "Na⁺, Mg²⁺, and Al³⁺ are an isoelectronic series with 10 electrons each. Determine their radius order. Na⁺: Z=11, Z_eff ≈ 11−2 = 9 (simple approximation). Mg²⁺: Z=12, Z_eff ≈ 10. Al³⁺: Z=13, Z_eff ≈ 11. A higher Z_eff pulls the same 10 electrons more strongly, so the order is Al³⁺ (53 pm) < Mg²⁺ (72 pm) < Na⁺ (102 pm).",
      },
      {
        title: "Ionisation Energy — Trends and Anomalies",
        subtitle: "Two dips within the general increase across Period 2 reveal electron configuration",
        terms: [
          {
            term: "First Ionisation Energy (IE₁)",
            def: "The energy required to completely remove one mole of electrons from one mole of gaseous neutral atoms (units: kJ mol⁻¹). Always positive (endothermic). Across a period (left to right): Z_eff increases → IE₁ increases. Down a group: n increases, shielding increases, atomic radius increases → IE₁ decreases.",
          },
          {
            term: "Anomalous Dips in Period 2",
            def: "Although IE₁ generally increases across Period 2, it decreases at two points. (1) Be → B: The outermost electron of B is in the 2p subshell, which is higher in energy than 2s and receives additional shielding from the filled 2s electrons, making it easier to remove (2s² → 2p¹). (2) N → O: Oxygen has a paired electron in one 2p orbital (2p⁴); the extra electron–electron repulsion within that pair lowers the energy needed to remove one electron compared with nitrogen's half-filled 2p³ configuration (Hund's rule).",
          },
          {
            term: "Successive Ionisation Energies and Group Identification",
            def: "When successive ionisation energies (IE₁, IE₂, IE₃, …) are measured in order, there is a large jump in energy the moment electrons begin to be removed from an inner shell after all valence electrons have been removed. The IE number just before that large jump equals the number of valence electrons = group number. Example: if IE₁ through IE₃ increase gradually but IE₄ shows a sudden large increase, the element has 3 valence electrons and belongs to Group 13 (e.g., Al).",
          },
          {
            term: "Electron Affinity (EA)",
            def: "The energy released when a gaseous neutral atom gains one electron to form a negative ion (units: kJ mol⁻¹). For most non-metals EA is negative (exothermic); a more negative value indicates a stronger attraction for electrons. Halogens have the largest EA values. Notably, Cl has a larger EA than F — the small atomic size of F leads to greater electron–electron repulsion when an extra electron is added, reducing the energy released.",
          },
        ],
        traps: [
          "Do not simply memorise that B < Be and O < N in Period 2 IE₁ without also knowing the electron-configuration reasons. On IB Paper 2, a question such as 'Explain why the first ionisation energy of B is lower than that of Be' (2 marks) awards zero if you only state 'it is lower' without the reason. The required explanation is: 'The outermost electron in B is in the 2p subshell, which is at a higher energy level and receives additional shielding from the 2s electrons.'",
          "When reading a successive ionisation energy graph, if the large jump occurs between IE₃ and IE₄, it is correct to conclude there are 3 valence electrons. However, if the jump is between IE₂ and IE₃, the element has 2 valence electrons (Group 2) — do not misread this as 1 valence electron (Group 1). The valence electron count is the IE number immediately before the large jump.",
        ],
        example:
          "Successive ionisation energies (kJ mol⁻¹) of element X: IE₁=578, IE₂=1817, IE₃=2745, IE₄=11578, IE₅=14831. A large jump occurs between IE₃ and IE₄ (2745 → 11578, roughly a 4.2-fold increase). The IE number just before the jump = 3, so there are 3 valence electrons → Group 13. This element is aluminium (Al). Al's configuration [Ne] 3s² 3p¹ has 3 valence electrons (3s², 3p¹); once all three are removed, the next electron must come from the n=2 inner shell, causing the sudden energy spike — exactly consistent with the data.",
      },
      {
        title: "Electronegativity — Measuring Bond Polarity",
        subtitle: "Using the Pauling scale to judge ionic character, covalent character, and polarity of bonds",
        terms: [
          {
            term: "Electronegativity (EN)",
            def: "The relative ability of a bonded atom to attract the shared pair of electrons toward itself. On the Pauling scale, F has the highest value (4.0) and Cs and Fr the lowest (≈ 0.7). Electronegativity increases across a period (Z_eff increases) and decreases down a group (n increases, bonding electrons are farther from the nucleus). Noble gases are not assigned electronegativity values.",
          },
          {
            term: "Bond Polarity and Ionic Character",
            def: "The difference in electronegativity (ΔEN) between two bonded atoms indicates the type of bond. ΔEN < 0.4: non-polar covalent bond. 0.4 ≤ ΔEN < 1.8: polar covalent bond. ΔEN ≥ 1.8: predominantly ionic character. IB uses these numerical thresholds directly.",
          },
          {
            term: "Dipole Moment",
            def: "A vector quantity that represents the electrical asymmetry of a polar bond or molecule. Units: debye (D) or C·m. The overall dipole moment of a molecule is the vector sum of the individual bond dipoles. Symmetrical molecules (CO₂, BF₃, CCl₄) may contain polar bonds, yet their bond dipoles cancel out to give a net dipole of zero, making them non-polar molecules.",
          },
        ],
        traps: [
          "The element with the highest electronegativity is F (4.0). Students sometimes misorder Cl (3.2) and N (3.0), placing Cl > N correctly but then misremembering the full sequence. The Pauling order to know is F > O > N ≈ Cl > Br ≈ I > S. In particular, Cl (3.2) > N (3.0) is a point of frequent confusion.",
          "The ΔEN = 1.8 boundary for ionic character is not a sharp cutoff. IB uses language such as 'predominantly ionic' or 'significant ionic character.' Avoid stating that ΔEN ≥ 1.8 'must be' an ionic bond; instead describe it as a bond with strong ionic character.",
        ],
        example:
          "Compare the bond polarity of HCl and HF. HCl: EN(H)=2.2, EN(Cl)=3.2, ΔEN=1.0 → polar covalent bond. HF: EN(H)=2.2, EN(F)=4.0, ΔEN=1.8 → polar covalent bond with very strong ionic character (borderline). Both molecules are linear, so the bond dipoles do not cancel and both are polar molecules. HF has far greater polarity than HCl, which is one of the main reasons HF has a higher boiling point than HCl.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u3-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 3,
    lessonNum: 3,
    unitName: "Periodicity",
    title: "Chemical Periodicity — Alkali Metals, Halogens, and Acid-Base Character of Oxides",
    subtitle: "Reactivity trends in Groups 1 and 17, acid-base and amphoteric patterns of oxides, and the unique chemistry of transition metals",
    overview:
      "So far we have focused on the physical properties of atoms — size and energy. Now we turn to how those properties manifest in actual chemical reactions. Group 1 alkali metals become more violently reactive going down the group — lithium dissolves quietly in water while caesium reacts explosively. Group 17 halogens show the opposite trend: reactivity decreases going down the group. Additionally, when the oxides of elements across a period dissolve in water, there is a clear shift from basic to acidic behaviour moving left to right. All of this is a natural consequence of the Z_eff, ionisation energy, and electronegativity trends established earlier. Rounding off with the distinctive chemistry of transition metals completes the IB Periodicity topic.",
    objectives: [
      "Explain why Group 1 alkali metals become more reactive toward water, oxygen, and halogens going down the group, using ionisation energy and atomic radius",
      "Explain why Group 17 halogens decrease in oxidising power (reactivity) going down the group using electronegativity and atomic radius, and determine the reactivity order experimentally through displacement reactions",
      "Predict the acidic, basic, or amphoteric character of Period 2 and Period 3 oxides from their position in the periodic table",
      "Explain the variable oxidation states, coloured ions, and catalytic activity of transition metals in terms of electron configuration",
    ],
    sections: [
      {
        title: "Reactivity Trends of Group 1 Alkali Metals",
        subtitle: "Why reactivity increases down the group — lower IE₁ and larger atomic radius",
        terms: [
          {
            term: "Alkali Metals (Group 1)",
            def: "Group 1 metals from lithium (Li) to caesium (Cs). Common properties: silvery-white lustre, low density (Li, Na, K float on water), soft solids at room temperature, ns¹ electron configuration → form +1 ions. Reactivity increases in the order Li < Na < K < Rb < Cs.",
          },
          {
            term: "Reaction with Water",
            def: "2M(s) + 2H₂O(l) → 2MOH(aq) + H₂(g). Going down the group, IE₁ decreases and atomic radius increases → the outermost electron is more easily lost, accelerating the reaction. Li: dissolves calmly with gentle bubbling. Na: rapid reaction (metal melts and moves). K: spontaneous lilac/violet flame. Rb and Cs: explosive.",
          },
          {
            term: "Formation of Halides",
            def: "Alkali metals react directly with halogens (X₂) to form ionic halides MX: 2M + X₂ → 2MX. The reactivity trend is the same as with water (Li < Na < K < …). The products are stable ionic crystals that remain solid even at high temperatures.",
          },
        ],
        traps: [
          "Explaining the increasing reactivity of alkali metals down the group as 'because electronegativity decreases' is incorrect. The correct explanation invokes decreasing IE₁ (electron more easily lost) and increasing atomic radius (weaker nucleus–electron attraction). Electronegativity measures ability to attract electrons in a covalent bond and should not be used to explain the reactivity of metals in ionic-forming reactions.",
          "Lithium is the least reactive alkali metal with water, but it behaves uniquely in some reactions — for example, Li is the only alkali metal that reacts with N₂ at room temperature (6Li + N₂ → 2Li₃N). The generalisation 'Li is always least reactive among alkali metals' applies only in the context of reactions with water, O₂, and halogens. IB questions are set within these contexts.",
        ],
        example:
          "Describe the observations and reasoning for the reaction of potassium (K) with water. Observations: K floats on the water surface, melts into a ball, moves rapidly, releases H₂ gas, and ignites with a lilac/violet flame. Equation: 2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g). Reasoning: K has a lower IE₁ (419 kJ mol⁻¹) than Na (496 kJ mol⁻¹), so it donates its valence electron more readily. The KOH solution produced turns phenolphthalein indicator deep pink, confirming a strongly alkaline solution.",
      },
      {
        title: "Halogen Reactivity and Acid-Base Character of Oxides",
        subtitle: "Halogens weaken going down the group; metal oxides are basic, non-metal oxides are acidic",
        terms: [
          {
            term: "Reactivity Trend of Halogens",
            def: "Oxidising power (reactivity) decreases in the order F₂ > Cl₂ > Br₂ > I₂. Reason: going down the group, atomic radius increases → ability to attract electrons (electron affinity, electronegativity) decreases → weaker oxidising agent. Experimental confirmation: a more reactive halogen displaces a less reactive halide ion from solution (displacement reaction).",
          },
          {
            term: "Halogen Displacement Reactions",
            def: "A more reactive halogen (X₂) displaces a less reactive halide ion (Y⁻) from solution: X₂(aq) + 2Y⁻(aq) → 2X⁻(aq) + Y₂(aq). Examples: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ (solution turns orange-brown). Cl₂ + 2I⁻ → 2Cl⁻ + I₂ (solution turns brown-black). The colour change confirms whether a reaction has occurred.",
          },
          {
            term: "Acid-Base Character of Oxides",
            def: "Across Period 2 and Period 3, the acid-base character of oxides shifts from basic → amphoteric → acidic moving left to right. Metal oxides (Na₂O, MgO, CaO): dissolve in water to give strongly alkaline solutions. Amphoteric oxides (Al₂O₃): react with both acids and bases. Non-metal oxides (SiO₂, P₄O₁₀, SO₃, Cl₂O₇): dissolve in water to give acidic solutions. Reason: the more ionic (metallic) the oxide, the more basic it is; the more covalent (non-metallic), the more acidic.",
          },
          {
            term: "Variable Oxidation States of Transition Metals",
            def: "Transition metals can lose different combinations of 3d and 4s electrons to form multiple stable oxidation states. Examples: Fe: +2 (FeO), +3 (Fe₂O₃); Mn: +2, +4 (MnO₂), +7 (MnO₄⁻). Because the 3d and 4s subshells are close in energy, electrons can be selectively removed from either. This property is the basis for using transition metals as redox catalysts.",
          },
        ],
        traps: [
          "A common error in oxide acid-base questions is classifying SiO₂ (silicon dioxide) as a 'neutral oxide.' SiO₂ is a non-metal oxide and is therefore an acidic oxide. It dissolves poorly in water, making the acidity hard to observe directly, but it does react with strong bases: SiO₂ + 2NaOH → Na₂SiO₃ + H₂O. Classify SiO₂ as an acidic oxide in IB answers.",
          "Students frequently reverse the halogen displacement rules. The reactivity order is Cl₂ > Br₂ > I₂, so Cl₂ displaces both Br⁻ and I⁻, Br₂ displaces only I⁻ (not Cl⁻), and I₂ displaces neither Br⁻ nor Cl⁻. Draw a 3×3 possible/not-possible displacement table and memorise it to avoid direction errors.",
        ],
        example:
          "Compare the acid-base character of the Period 3 oxides Na₂O, MgO, Al₂O₃, SiO₂, P₄O₁₀, and SO₃. Na₂O + H₂O → 2NaOH (strong base, pH ≫ 7). MgO + H₂O → Mg(OH)₂ (weak base). Al₂O₃ + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂O (reacts with acid); Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O (reacts with base) → amphoteric. P₄O₁₀ + 6H₂O → 4H₃PO₄ (strong acid, pH ≪ 7). SO₃ + H₂O → H₂SO₄ (strong acid). Moving from Na₂O on the left to SO₃ on the right, there is a clear periodic trend: basic → amphoteric → acidic.",
      },
    ],
  },
];
