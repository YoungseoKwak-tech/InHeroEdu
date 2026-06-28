/**
 * Core Notes English version — Honors Biology Unit 1 (Chemistry of Life).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_BIOLOGY_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-biology-u1-l1",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 1,
    lessonNum: 1,
    unitName: "Chemistry of Life",
    title: "Water and the Chemical Foundation of Life",
    subtitle: "How the polarity of a single water molecule makes all life on Earth possible",
    overview:
      "The thing students new to life science most often miss is this — biology is, at its root, chemistry at the molecular scale. Water (H₂O) looks simple, but the partial charges created by oxygen's high electronegativity, and the hydrogen-bond network they produce, hold the keys to cohesion, adhesion, dissolution, and pH regulation — everything that sustains life. This lesson starts from molecular structure and traces, mechanistically, why water is called the 'solvent of life.'",
    objectives: [
      "Explain how a difference in electronegativity creates the polarity of water and its hydrogen bonding",
      "Analyze how cohesion and adhesion operate in the mechanism of water transport in plants",
      "Explain why the polarity of water dissolves ionic and polar substances while excluding nonpolar ones",
      "Connect the pH scale to hydrogen ion concentration and evaluate how buffer systems maintain homeostasis",
      "Predict how water's high specific heat and heat of vaporization contribute to temperature regulation in biological systems",
    ],
    sections: [
      {
        title: "Polarity of Water and Hydrogen Bonding",
        subtitle: "How a difference in electronegativity builds the molecular network that sustains life",
        terms: [
          {
            term: "Electronegativity",
            def: "A measure of an atom's tendency to pull shared electrons toward itself in a covalent bond. Oxygen (3.44) is far more electronegative than hydrogen (2.20), creating a partial negative charge (δ⁻) and partial positive charges (δ⁺) within the water molecule.",
          },
          {
            term: "Polarity",
            def: "The property of having an uneven distribution of charge within a molecule. Water's bent geometry (104.5°) prevents the charges from canceling, producing a permanent dipole.",
          },
          {
            term: "Hydrogen bond",
            def: "An electrostatic attraction between the partial positive charge of a hydrogen bonded to an electronegative atom (O, N, F) and the partial negative charge of a nearby electronegative atom. Each individual bond is weak, but millions acting together produce every one of water's unusual properties.",
          },
          {
            term: "Cohesion",
            def: "Attraction between molecules of the same kind through hydrogen bonding. Water molecules pull on one another, producing surface tension and the continuous column of water within a plant's xylem.",
          },
        ],
        traps: [
          "The most common mistake is confusing whether hydrogen bonds occur 'within' or 'between' molecules. The polar covalent bond holds the O–H together inside a single water molecule; the hydrogen bond holds different water molecules to one another. On a question asking 'what holds water molecules to each other?', writing 'covalent bond' loses marks.",
          "Do not confuse adhesion with cohesion. Cohesion is water-to-water attraction; adhesion is water-to-other-surface attraction (e.g., to cellulose cell walls). The rise of water in plant xylem requires both.",
        ],
        example: null,
      },
      {
        title: "Thermal Properties of Water and the Universal Solvent",
        subtitle: "How high specific heat, heat of vaporization, and polarity stabilize biological systems",
        terms: [
          {
            term: "Specific heat",
            def: "The energy required to raise the temperature of 1 g of a substance by 1 °C. Water's very high specific heat (1 cal/g·°C) lets it absorb large amounts of energy without much temperature change, keeping intracellular temperature stable.",
          },
          {
            term: "Heat of vaporization",
            def: "The energy required to convert 1 g of liquid into gas. Water's high heat of vaporization (540 cal/g) removes a large amount of heat from the skin surface as sweat evaporates, contributing to body-temperature regulation.",
          },
          {
            term: "Hydration shell",
            def: "A layer of water molecules ordered around a dissolved ion. The partial charges of water orient toward the oppositely charged ion, pulling ionic compounds out of their lattice and enabling dissolution.",
          },
          {
            term: "Hydrophobic effect",
            def: "The tendency of nonpolar molecules to aggregate in aqueous solution. Water excludes nonpolar substances because it 'prefers' to maximize hydrogen bonding among its own molecules rather than with a nonpolar surface.",
          },
        ],
        traps: [
          "The hydrophobic effect is not nonpolar substances 'pushing water away.' It is the water molecules excluding the nonpolar molecule in order to maximize hydrogen bonding among themselves. Keep this same perspective when explaining why a lipid bilayer forms.",
        ],
        example:
          "Consider how table salt (NaCl) dissolves in water. Inside the solid crystal, Na⁺ and Cl⁻ are held in a lattice by strong ionic bonds. When water is added, the partial-negative (δ⁻) oxygen end of water molecules is attracted to Na⁺, and the partial-positive (δ⁺) hydrogen end is attracted to Cl⁻. These water molecules surround each ion to form a hydration shell, supplying the energy to break the ionic bonds and letting the ions disperse into solution. This is the core mechanism of water acting as the 'universal solvent.'",
      },
      {
        title: "pH and Buffering — Acid–Base Control Inside the Cell",
        subtitle: "How hydrogen ion concentration governs the structure and function of biological molecules",
        terms: [
          {
            term: "pH",
            def: "The negative base-10 logarithm of hydrogen ion concentration (−log[H⁺]). Because the scale is logarithmic, a change of 1 pH unit equals a 10-fold change in [H⁺]. 7 is neutral, below 7 is acidic, above 7 is basic.",
          },
          {
            term: "Acid",
            def: "A substance that releases hydrogen ions (H⁺) in aqueous solution. The stronger the acid, the higher the [H⁺] and the lower the pH.",
          },
          {
            term: "Base",
            def: "A substance that accepts hydrogen ions (H⁺) or releases hydroxide ions (OH⁻) in aqueous solution. The stronger the base, the lower the [H⁺] and the higher the pH.",
          },
          {
            term: "Buffer system",
            def: "A solution made of a weak acid and its conjugate base that minimizes pH change by absorbing H⁺ when it rises and releasing H⁺ when it falls. The blood's carbonic acid–bicarbonate buffer holds blood pH at 7.35–7.45.",
          },
        ],
        traps: [
          "Remember the pH scale is logarithmic, not linear. pH 5 is not 10 times but 100 times (10²) more concentrated in H⁺ than pH 7. When an exam says 'twice as acidic,' convert this to a ratio of H⁺ concentration, not a difference in pH units.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-biology-u1-l2",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 1,
    lessonNum: 2,
    unitName: "Chemistry of Life",
    title: "The Four Macromolecules of Life",
    subtitle: "How carbohydrates, lipids, proteins, and nucleic acids divide the structural and functional labor of living systems",
    overview:
      "Picture the cell as a factory — carbohydrates are fuel and building material, lipids are the warehouse and the wiring, proteins are all the machinery, and nucleic acids are the blueprints. These four macromolecules are all polymers built by linking small monomers through dehydration synthesis. In this lesson you will see fully how a small difference in monomer structure can completely change a macromolecule's function.",
    objectives: [
      "Compare dehydration synthesis and hydrolysis and explain how each applies to the formation and breakdown of polymers",
      "Identify the monomer and polymer of carbohydrates, lipids, proteins, and nucleic acids and link each to its major function",
      "Predict how the geometric difference between alpha and beta glycosidic linkages affects a polymer's shape and function",
      "Analyze how the structural difference between saturated and unsaturated fatty acids affects membrane fluidity",
    ],
    sections: [
      {
        title: "Carbohydrates — The Dual Role of Energy and Structure",
        subtitle: "A single glycosidic-linkage geometry separates storage molecules from structural ones",
        terms: [
          {
            term: "Monosaccharide",
            def: "The simplest carbohydrate unit, which cannot be hydrolyzed into a simpler sugar. Glucose, fructose, and galactose are representative; their molecular formula is C₆H₁₂O₆.",
          },
          {
            term: "Disaccharide",
            def: "Two monosaccharides joined by dehydration synthesis. Maltose (glucose + glucose), sucrose (glucose + fructose), and lactose (glucose + galactose) are representative examples.",
          },
          {
            term: "Polysaccharide",
            def: "A polymer of hundreds to thousands of monosaccharides joined by glycosidic linkages. Function divides into energy storage (starch, glycogen) and structural support (cellulose, chitin).",
          },
          {
            term: "Glycosidic linkage",
            def: "The covalent bond between two monosaccharides formed by dehydration synthesis. Alpha (α) linkages create helical chains (starch); beta (β) linkages create straight chains (cellulose), and this geometry determines function.",
          },
        ],
        traps: [
          "Starch and cellulose are both glucose polymers — so why do they differ in function? Writing simply 'the linkage type is different' earns only partial credit. For full marks you must give the mechanism: alpha linkages create a helical structure favorable for compact storage, while beta linkages create a straight structure that maximizes hydrogen bonding between adjacent chains, providing the tensile strength a cell wall needs.",
        ],
        example:
          "Think about how glucose is linked. In α-glucose, the hydroxyl group (OH) on carbon 1 points below the ring plane. Linking in this orientation (α 1,4 linkage) bends the chain one way and forms a helix — that is starch. In β-glucose the OH on carbon 1 points up, so each glucose is flipped 180° at every link, producing a straight chain — that is cellulose. The monomers are identical, yet a single difference in linkage orientation determines everything.",
      },
      {
        title: "Lipids — Membrane Structure and Energy Storage",
        subtitle: "The saturation of fatty acid tails decides the fate of membrane fluidity",
        terms: [
          {
            term: "Fatty acid",
            def: "An organic molecule with a long hydrocarbon chain ending in a carboxyl group (–COOH). Saturated fatty acids have no carbon–carbon double bonds, so they are straight and pack tightly; unsaturated fatty acids have kinks at double bonds, raising fluidity.",
          },
          {
            term: "Phospholipid",
            def: "An amphipathic molecule with two hydrophobic fatty acid tails and a hydrophilic phosphate head attached to a glycerol backbone. It is the main component of the cell membrane, forming the bilayer that creates the cell's boundary.",
          },
          {
            term: "Saturated fatty acid",
            def: "A fatty acid with no double bonds in its carbon chain, fully saturated with hydrogen. Its straight chains pack tightly together, making it solid at room temperature (e.g., butter) and lowering membrane fluidity.",
          },
          {
            term: "Unsaturated fatty acid",
            def: "A fatty acid with one or more double bonds in its carbon chain, producing kinks. Tight packing is impossible, so it is liquid at room temperature (e.g., vegetable oil) and raises membrane fluidity.",
          },
        ],
        traps: [
          "Note that lipids are not polymers. Carbohydrates, proteins, and nucleic acids are polymers of covalently linked monomers, but lipids have no common monomer. A fat is 1 glycerol + 3 fatty acids joined by ester bonds; a phospholipid is glycerol + 2 fatty acids + a phosphate group. Do not fall for an exam trap asking for 'the monomer of a lipid.'",
        ],
        example: null,
      },
      {
        title: "Proteins and Nucleic Acids — The Doers and the Keepers of Information",
        subtitle: "How amino acid sequence builds protein structure, and nucleotide sequence holds genetic information",
        terms: [
          {
            term: "Amino acid",
            def: "The monomer of proteins, with an amino group (–NH₂), a carboxyl group (–COOH), a hydrogen, and a variable R group bonded to a central (α) carbon. Differences among the R groups of the 20 amino acids produce protein diversity.",
          },
          {
            term: "Peptide bond",
            def: "A covalent bond formed by dehydration synthesis between the carboxyl group of one amino acid and the amino group of another. Amino acids linked by this bond form a polypeptide chain.",
          },
          {
            term: "Protein structure levels",
            def: "Proteins have four structural levels. Primary = the amino acid sequence; secondary = alpha helices and beta sheets formed by hydrogen bonding; tertiary = the overall 3-D shape from R-group interactions; quaternary = the assembly of multiple polypeptide subunits.",
          },
          {
            term: "Nucleotide",
            def: "The monomer of nucleic acids, composed of a pentose sugar (deoxyribose or ribose), a phosphate group, and a nitrogenous base. DNA uses four (A, T, G, C); RNA uses four (A, U, G, C).",
          },
        ],
        traps: [
          "Protein denaturation does not change the primary structure (amino acid sequence). pH changes, high heat, and extreme salinity break weak interactions (hydrogen bonds, ionic bonds, hydrophobic interactions), destroying only the secondary, tertiary, and quaternary structure. Remember 'denaturation = loss of 3-D shape,' not 'destruction of the protein.' If conditions are restored, some proteins can refold.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-biology-u1-l3",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 1,
    lessonNum: 3,
    unitName: "Chemistry of Life",
    title: "Enzymes and Metabolism",
    subtitle: "How catalytic proteins lower activation energy to control the rate and direction of cellular reactions",
    overview:
      "Thousands of chemical reactions occur inside a cell every second. The secret to running these reactions under the mild conditions of body temperature (37 °C) is the enzyme. An enzyme is a biological catalyst that fits a substrate precisely into its active site and lowers the activation energy of a reaction. In this lesson you will fully master how enzymes work, their optimal conditions, and inhibition mechanisms, alongside the interpretation of experimental data.",
    objectives: [
      "Explain the mechanism by which an enzyme lowers activation energy, connecting it to the formation of the enzyme–substrate complex",
      "Predict and graphically interpret the effects of temperature, pH, substrate concentration, and enzyme concentration on reaction rate",
      "Distinguish competitive from noncompetitive inhibition by their response to changes in substrate concentration",
      "Analyze how feedback inhibition regulates metabolic pathways to maintain cellular homeostasis",
      "Compare and contrast catabolism and anabolism in terms of energy direction and molecular transformation",
    ],
    sections: [
      {
        title: "How Enzymes Work — Activation Energy and the Active Site",
        subtitle: "How the complementary binding of substrate and active site lowers the reaction barrier",
        terms: [
          {
            term: "Activation energy",
            def: "The minimum energy required to initiate a chemical reaction. An enzyme lowers this barrier by holding the substrate in a particular orientation and altering the bonding environment, so the reaction proceeds faster.",
          },
          {
            term: "Active site",
            def: "The specific three-dimensional region of an enzyme where the substrate binds. The enzyme's amino acid R groups are precisely arranged to fit the substrate complementarily. If the active site's shape changes, enzyme function is destroyed.",
          },
          {
            term: "Substrate",
            def: "The reactant molecule that binds the enzyme's active site and undergoes chemical transformation. An enzyme–substrate complex must form for the reaction to occur.",
          },
          {
            term: "Induced fit model",
            def: "A model in which the enzyme's active site changes shape slightly to fit the substrate as it binds. More accurate than the lock-and-key model, it describes the dynamic process of the enzyme 'embracing' its substrate.",
          },
        ],
        traps: [
          "An enzyme lowers only the activation energy of a reaction; it does not change the overall energy change (ΔG) between reactants and products. Saying an enzyme 'makes an impossible reaction possible' or 'makes the reaction release energy' is wrong. An enzyme only speeds up how fast the reaction happens; the thermodynamic outcome (energy released or absorbed) is identical with or without the enzyme.",
          "The lock-and-key model treats the enzyme as a completely rigid structure and is now considered inaccurate. The current textbook standard is the induced fit model — remember that the enzyme's shape changes slightly when the substrate binds.",
        ],
        example:
          "Let's examine induced fit with salivary amylase. Amylase's active site has a 3-D structure complementary to the region around the alpha glycosidic bonds of starch. When a starch chain approaches, the active-site amino acids shift slightly to wrap the substrate more tightly (induced fit). In this process, a water molecule is positioned to attack the glycosidic bond precisely, greatly lowering the activation energy of the hydrolysis reaction. When the reaction finishes, the enzyme is unchanged: it releases the maltose molecules and is ready to accept the next substrate.",
      },
      {
        title: "Factors Affecting Enzyme Activity",
        subtitle: "How changes in temperature, pH, and concentration alter enzyme–substrate collision frequency and active-site structure",
        terms: [
          {
            term: "Optimal temperature",
            def: "The temperature at which enzyme reaction rate is maximal. Rising temperature increases collision frequency and rate, but beyond the optimum, heat breaks hydrogen and ionic bonds, destroying the active site (denaturation) and the rate plummets.",
          },
          {
            term: "Optimal pH",
            def: "The pH at which enzyme reaction rate is maximal. Most enzymes work best at pH 6–8, but stomach pepsin is optimal at pH 2 and intestinal trypsin at pH 8. Changes in pH alter the ionization state of R groups, deforming the active site.",
          },
          {
            term: "Enzyme saturation",
            def: "The state in which all enzyme active sites are occupied by substrate. Increasing substrate concentration further no longer raises the reaction rate — this is the maximum rate (Vmax).",
          },
          {
            term: "Denaturation",
            def: "The breaking of weak molecular bonds by extreme pH, temperature, or chemicals, destroying a protein's tertiary and quaternary structure. The active site's shape changes so substrate can no longer bind and the enzyme loses function.",
          },
        ],
        traps: [
          "Does lowering temperature denature an enzyme? No. Low temperature reduces molecular motion, lowering collision frequency and reaction rate, but the enzyme's structure is preserved — raise the temperature again and activity recovers. By contrast, an enzyme denatured above its optimum is irreversibly destroyed and does not recover even if cooled. Always distinguish these two cases when interpreting graphs.",
        ],
        example: null,
      },
      {
        title: "Enzyme Inhibition and Metabolic Regulation",
        subtitle: "How competitive, noncompetitive, and feedback inhibition precisely tune cellular metabolism",
        terms: [
          {
            term: "Competitive inhibition",
            def: "An inhibitor structurally similar to the substrate competes for the active site. Raising substrate concentration overcomes the inhibition, so Vmax is unchanged but the apparent Km increases.",
          },
          {
            term: "Noncompetitive inhibition",
            def: "An inhibitor binds a site other than the active site (an allosteric site), deforming the enzyme. No amount of added substrate can overcome it, so Vmax decreases while Km is unchanged.",
          },
          {
            term: "Allosteric regulation",
            def: "Regulation in which a molecule binds a site other than the active site (an allosteric site), changing the enzyme's structure and activity. An activator turns the enzyme on; an inhibitor turns it off.",
          },
          {
            term: "Feedback inhibition",
            def: "A control mechanism in which the final product of a metabolic pathway inhibits an enzyme early in the pathway. When enough product accumulates, production is automatically halted so cellular resources are not wasted.",
          },
        ],
        traps: [
          "The most reliable criterion for distinguishing competitive from noncompetitive inhibition is 'is the inhibition overcome when substrate concentration is raised?' Competitive inhibition can be outcompeted by adding more substrate (Vmax recovers); noncompetitive inhibition keeps Vmax low no matter how much substrate is added. On an experimental graph, whether Vmax changes is the most important criterion.",
        ],
        example:
          "A classic example of feedback inhibition is the isoleucine synthesis pathway. Inside the cell, threonine is converted to isoleucine through five enzyme-catalyzed steps. When enough isoleucine accumulates, isoleucine binds the allosteric site of the first enzyme (threonine deaminase), deforming it and inhibiting its activity. When isoleucine levels fall, the inhibition is released and synthesis resumes. Thanks to this automatic regulation, the cell makes only as much isoleucine as it needs, saving energy and raw materials.",
      },
    ],
  },
];
