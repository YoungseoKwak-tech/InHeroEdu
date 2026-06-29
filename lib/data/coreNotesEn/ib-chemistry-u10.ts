/**
 * Core Notes English version — IB Chemistry Unit 10 (Organic Chemistry).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U10_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u10-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 10,
    lessonNum: 1,
    unitName: "Organic Chemistry",
    title: "The Framework of Organic Chemistry — Homologous Series, Functional Groups, IUPAC Nomenclature, and Structural Isomers",
    subtitle: "Draw a carbon skeleton and attach functional groups and you have an organic compound — master the naming rules (IUPAC) first and the reaction mechanisms will follow",
    overview:
      "The name 'organic chemistry' derives from the early-19th-century belief that such compounds could only be made by living organisms. In 1828 the German chemist Friedrich Wöhler synthesised urea (CO(NH₂)₂) from the inorganic substance ammonium cyanate, demolishing this doctrine of vitalism; yet the name 'organic' survived and today refers collectively to carbon-based compounds. The number of known compounds runs into the tens of millions, and the heart of that diversity is carbon's ability to form long chains or rings with other carbon atoms while simultaneously bonding to hydrogen, oxygen, nitrogen, halogens, and more. IB DP Chemistry Topic 10 is the gateway to this vast field. Understanding what a homologous series is organises thousands of compounds into a handful of 'families.' Knowing the functional groups lets you predict a compound's properties and reactivity in advance. Mastering IUPAC nomenclature makes structural formula and name correspond one-to-one. Understanding structural isomers makes it clear that compounds with the same molecular formula can have completely different properties. In this lesson we will consolidate these four concepts to the level of IB Paper 1 and Paper 2. The vocabulary and framework built here become the language of every organic reaction lesson that follows.",
    objectives: [
      "State the definition of a homologous series — same general formula, adjacent members differing by a single CH₂ unit, and physical properties changing regularly — and write the general formulae of alkanes, alkenes, alcohols, halogenoalkanes, and carboxylic acids",
      "Identify the key functional groups — the C=C of alkenes, the –OH of alcohols, the –X of halogenoalkanes, and the –COOH of carboxylic acids — in structural formulae, and explain the effect each functional group has on the compound's reactivity",
      "Use the IUPAC stems for 1–6 carbon atoms (meth-, eth-, prop-, but-, pent-, hex-) and the suffixes (alkane –ane, alkene –ene, alcohol –ol, carboxylic acid –oic acid, the halo- prefix for halogenoalkanes) to name organic compounds including structural isomers, or to draw their structures",
      "Define saturated and unsaturated hydrocarbons and identify or draw structural isomers that share a molecular formula but differ in structure",
      "Enumerate the number of structural isomers for a given molecular formula and write the correct IUPAC name and condensed structural formula for each isomer",
    ],
    formulas: [
      "General formula of alkanes: CₙH₂ₙ₊₂",
      "General formula of alkenes: CₙH₂ₙ  (assuming no ring)",
      "General formula of alcohols: CₙH₂ₙ₊₁OH",
      "General formula of carboxylic acids: CₙH₂ₙ₊₁COOH",
      "General formula of halogenoalkanes: CₙH₂ₙ₊₁X  (X = F, Cl, Br, I)",
    ],
    sections: [
      {
        title: "Homologous Series and Functional Groups — Grouping Organic Compounds into 'Families'",
        subtitle: "Same functional group means same reactions — the secret to understanding thousands of organic compounds at once",
        terms: [
          {
            term: "Homologous Series",
            def: "A homologous series is a set of compounds that satisfies all three of the following characteristics. (1) The same general formula: for example, alkanes are CₙH₂ₙ₊₂ and alkenes are CₙH₂ₙ. (2) Adjacent members differ by a single CH₂ (methylene) unit: methane (CH₄) → ethane (C₂H₆) → propane (C₃H₈). (3) Physical properties change regularly: as the number of carbons increases, molecular mass increases → boiling and melting points rise, viscosity increases, and solubility in water decreases (a long hydrocarbon chain dilutes the effect of a polar –OH group). Knowing a homologous series lets you predict properties from the number of carbons without memorising individual compounds. The question type 'state the homologous series to which the following compound belongs' appears frequently on IB Paper 1.",
          },
          {
            term: "Functional Group",
            def: "A functional group is the atom or group of atoms within an organic molecule that determines a particular chemical reactivity. Compounds with the same functional group show similar chemical reactions regardless of the length of the carbon skeleton. The key functional groups covered in IB Topic 10: (1) the carbon–carbon double bond (C=C) of alkenes: electrophilic addition. (2) the C–X bond of halogenoalkanes (X = F, Cl, Br, I): nucleophilic substitution. (3) the hydroxyl group (–OH) of alcohols: oxidation, esterification, dehydration. (4) the carboxyl group (–COOH) of carboxylic acids: esterification, acid–base reactions. Identifying the functional group first lets you predict which reactions will occur.",
          },
          {
            term: "Saturated and Unsaturated Hydrocarbons",
            def: "Saturated hydrocarbon: a hydrocarbon that has only carbon–carbon single bonds (C–C) and holds the maximum possible number of hydrogens. Alkanes are the representative example. General formula CₙH₂ₙ₊₂. Unsaturated hydrocarbon: contains a carbon–carbon double bond (C=C, alkene) or triple bond (C≡C, alkyne) and has fewer hydrogens than the alkane with the same number of carbons. Alkene general formula CₙH₂ₙ (when no triple bond is present). Tests for saturated/unsaturated: compare the hydrogen count with the alkane of the same carbon number. Reaction with H₂ gas (hydrogenation) indicates unsaturation (H₂ adds if a C=C is present). Alternatively, decolourising bromine water indicates unsaturation. IB Paper 1 includes problems that give only a molecular formula and ask you to decide saturated or unsaturated.",
          },
        ],
        traps: [
          "The alkene general formula CₙH₂ₙ applies only to single-double-bond alkenes with no ring structure. A cycloalkane also has the same general formula CₙH₂ₙ, so concluding 'this compound is an alkene' from the molecular formula alone can be wrong. On IB Paper 1, answering 'alkene' unconditionally for C₄H₈ loses marks — cyclobutane is also C₄H₈. Always check the structural formula or additional information.",
          "In IUPAC naming you must select the longest continuous carbon chain as the main chain. If a branched carbon is not included in the main chain, the name changes. You must also number the carbons in the direction that gives the substituent the lowest possible number. 'Left to right' is not always correct — the IUPAC principle is to number in the direction that gives the smaller locant to the substituent.",
        ],
        example:
          "Example of structural isomers and IUPAC naming (IB Paper 2 type): draw all the structural isomers corresponding to the molecular formula C₄H₁₀ and write their IUPAC names. Solution: C₄H₁₀ (the molecular formula of butane, CₙH₂ₙ₊₂, n=4) has two structural isomers. (1) butane: four carbons connected in a straight line — CH₃CH₂CH₂CH₃. (2) 2-methylpropane: a three-carbon main chain with one methyl group (–CH₃) attached to the second carbon — (CH₃)₃CH. Check: both isomers are C₄H₁₀ and differ in structure. 2-methylpropane is also called 'isobutane,' but IB requires the IUPAC name.",
      },
      {
        title: "IUPAC Nomenclature in Depth — Naming Alkenes, Alcohols, Halogenoalkanes, and Carboxylic Acids",
        subtitle: "Stem + suffix (functional group) + locant — combine these three elements and you can name any organic compound",
        terms: [
          {
            term: "IUPAC Naming: Alkenes, Alcohols, Carboxylic Acids",
            def: "Common principles: (1) select the longest carbon chain as the main chain. (2) number the carbons so that the functional group (double bond, or –OH, or –COOH) has the lowest locant. (3) write branches/substituents in number-name form and list them alphabetically. Alkene: suffix –ene + the locant of the double bond. Example: CH₂=CHCH₂CH₃ → but-1-ene (C4 chain, double bond C1–C2). CH₃CH=CHCH₃ → but-2-ene. Alcohol: suffix –ol + the locant of the –OH. Example: CH₃CH(OH)CH₃ → propan-2-ol. Carboxylic acid: the –COOH carbon is C1, so the locant is omitted. Example: CH₃CH₂COOH → propanoic acid. Halogenoalkane: the halogen is shown as a prefix (fluoro-, chloro-, bromo-, iodo-) + the locant. Example: CH₃CHBrCH₃ → 2-bromopropane.",
          },
          {
            term: "Types of Structural Isomers",
            def: "Structural isomers (constitutional isomers) are compounds with the same molecular formula but a different connectivity of atoms. The key types covered in IB Topic 10: (1) chain isomers: the main chain length differs. Example: butane vs 2-methylpropane for C₄H₁₀. (2) positional isomers: the position of a functional group or substituent differs. Example: 1-bromopropane vs 2-bromopropane for C₃H₇Br. (3) functional group isomers: the molecular formula is the same but the functional group itself differs. Example: ethanol (alcohol, CH₃CH₂OH) vs methoxymethane (ether, CH₃OCH₃) for C₂H₆O. At IB SL types (1) and (2) are mainly examined, while HL also includes (3). Structural isomers have different physical and chemical properties.",
          },
        ],
        traps: [
          "A common error in alkene naming is omitting the locant of the double bond. For alkenes with three or more carbons you must always specify the position of the double bond. 'Propene' has only one possible C=C, so no locant is needed, but 'butene' must be distinguished as but-1-ene or but-2-ene. On IB Paper 1, answering 'butene' to 'what is the IUPAC name of CH₃CH=CHCH₃?' is incorrect — the correct answer is 'but-2-ene.'",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u10-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 10,
    lessonNum: 2,
    unitName: "Organic Chemistry",
    title: "Reactions of Alkanes and Alkenes — Free-Radical Substitution, Electrophilic Addition, and Combustion",
    subtitle: "Alkanes are substituted via radicals, alkenes undergo addition across the double bond — you must be able to write the initiation, propagation, and termination steps of both mechanisms accurately on an IB answer sheet",
    overview:
      "Among hydrocarbon reactions, two mechanisms are asked most often on IB Paper 2: the free-radical substitution (FRS) of alkanes and the electrophilic addition of alkenes. The two reactions proceed in completely different ways. Alkanes have no C=C and therefore no π electron cloud for an electrophile to attack. Instead, ultraviolet (UV) energy causes the bond of a halogen molecule (e.g., Cl₂) to undergo homolytic fission, producing radicals (particles with an unpaired electron), and these radicals attack the C–H bonds in a chain reaction. By contrast, the C=C double bond of an alkene has π electrons located outside the carbon nuclei, acting as 'bait' that attracts electrophiles (electron-deficient particles). When HBr or Br₂ approaches, the π electrons shift to one side, a carbocation intermediate forms, and a nucleophile attacks it to give the addition product. Markovnikov's rule is an empirical rule that predicts which carbon the hydrogen attaches to in an unsymmetrical alkene; at IB HL level it is explained by the principle that the more stable carbocation is the preferred intermediate. Combustion reactions are also covered on the IB exam, including the difference between complete combustion and incomplete combustion, and the environmental implications of CO and particulate matter. In this lesson we will fully consolidate the step-by-step equations of both mechanisms and the common IB exam traps.",
    objectives: [
      "Write the equation for each of the three steps of the free-radical substitution of alkanes — initiation, propagation, termination — and explain the difference between homolytic fission and heterolytic fission",
      "Write the products and reaction conditions for the electrophilic addition of alkenes with H₂, Br₂, HBr, and H₂O (acid-catalysed)",
      "Use Markovnikov's rule to predict the major product when HBr adds to an unsymmetrical alkene (e.g., propene), and explain it by the more stable carbocation intermediate (HL)",
      "Write the equations for complete combustion and incomplete combustion of alkanes, and explain the environmental and health hazards of the incomplete combustion products (CO, C)",
    ],
    formulas: [
      "Complete combustion: CₓHᵧ + (x + y/4)O₂ → xCO₂ + (y/2)H₂O",
      "Alkene hydrogenation: C=C + H₂ → C–C  (Ni catalyst, 150°C)",
      "Alkene + Br₂: C=C + Br₂ → CBr–CBr  (bromine addition; decolourises bromine water)",
      "Alkane FRS (propagation): Cl• + CH₄ → HCl + CH₃•  /  CH₃• + Cl₂ → CH₃Cl + Cl•",
    ],
    sections: [
      {
        title: "Free-Radical Substitution — The Three Steps Initiation, Propagation, Termination",
        subtitle: "The moment a single beam of UV light splits a Cl–Cl bond, the chain reaction begins — you must write every particle and bond change in each step",
        terms: [
          {
            term: "Homolytic Fission and Radicals",
            def: "There are two ways a covalent bond can break. Homolytic fission: the bonding electron pair is split one electron to each atom, producing radicals each bearing an unpaired electron. Notation: Cl : Cl → Cl• + Cl•  (the dot represents the unpaired electron). Heterolytic fission: the bonding electron pair goes entirely to one atom, producing ions (cation and anion). Free-radical substitution (FRS) begins with homolytic fission. Radicals are electrically neutral and extremely reactive — the driving force to fill that single electron powers the chain reaction. When the UV photon energy exceeds the Cl–Cl bond energy of Cl₂, the initiation step begins.",
          },
          {
            term: "The Three Steps of FRS — Initiation, Propagation, Termination",
            def: "We summarise step by step using the FRS of methane (CH₄) and chlorine (Cl₂). (1) Initiation: UV light → Cl₂ → 2Cl•  (homolytic fission; occurs only once). (2) Propagation: Cl• + CH₄ → HCl + CH₃•  /  CH₃• + Cl₂ → CH₃Cl + Cl•  (these two reactions repeat as a chain reaction; the radical is regenerated). The propagation step can repeat thousands to millions of times, so even a catalytic amount of UV produces a large quantity of product. (3) Termination: two radicals combine to form a molecule with no radical. Examples: Cl• + Cl• → Cl₂  /  CH₃• + Cl• → CH₃Cl  /  CH₃• + CH₃• → C₂H₆. The termination step produces small amounts of unexpected by-products (e.g., ethane). Writing the propagation equations in order is a frequent IB Paper 2 question.",
          },
          {
            term: "Polysubstitution and Lack of Selectivity in FRS",
            def: "The FRS of CH₄ + Cl₂ does not stop at CH₃Cl (chloromethane). The H atoms of CH₃Cl also react with Cl•, producing CH₂Cl₂ (dichloromethane), CHCl₃ (trichloromethane, chloroform), and CCl₄ (tetrachloromethane) in succession. The amount of Cl₂ provides some control, but FRS is inherently low in selectivity, so it is difficult to obtain a single specific product industrially. This is the practical limitation of FRS, and when describing 'the disadvantages of FRS' on IB you should mention that a mixture of polysubstituted products is formed.",
          },
        ],
        traps: [
          "Confusing the propagation step with the termination step is a very common error. In a propagation step the number of radicals must be conserved (one radical consumed → one radical regenerated). In a termination step two radicals combine and the radicals disappear. When IB Paper 2 asks you to write a propagation equation, writing 'Cl• + CH₃• → CH₃Cl' as propagation is wrong — that is a termination step (two radicals combine to give a radical-free product). A propagation equation must have a radical (•) at both the start and the end.",
          "The initiation step requires UV light (ultraviolet) and does not readily occur with heat or another light source. Failing to state 'UV light' or 'ultraviolet radiation' as the condition loses marks on IB Paper 2. Also, in the initiation equation the UV must be shown as a reaction condition above the arrow or specified as 'condition: UV'; it must not be written as a reactant on the left-hand side, e.g., 'UV + Cl₂.'",
        ],
        example:
          "Example of writing FRS propagation steps (IB Paper 2 type): write the two propagation steps as equations for the free-radical substitution of ethane (C₂H₆) and chlorine (Cl₂). Solution: propagation step 1: Cl• + C₂H₆ → HCl + C₂H₅•  (the chlorine radical attacks a C–H bond, abstracts the hydrogen to form HCl, generating the ethyl radical C₂H₅•). Propagation step 2: C₂H₅• + Cl₂ → C₂H₅Cl + Cl•  (the ethyl radical attacks Cl₂, forming chloroethane C₂H₅Cl and regenerating the chlorine radical). Check: in each step one radical is consumed and one radical is generated — satisfying the key requirement of a chain reaction.",
      },
      {
        title: "Electrophilic Addition of Alkenes and Markovnikov's Rule",
        subtitle: "The moment the π electrons attract an electrophile, the double bond opens — Markovnikov: H goes to the carbon that already has more H",
        terms: [
          {
            term: "Electrophilic Addition",
            def: "The C=C double bond of an alkene is a structure with a π bond added on top of a σ bond. The π electrons are located in the space above and below, between the two carbon nuclei, and are easily exposed to an external electrophile (a particle seeking electrons). The reaction process: (1) the electrophile (e.g., the H⁺ part of HBr, or Br₂) is attracted and approaches by the π electron cloud. (2) the π bond electrons form a new bond with the electrophile → a carbocation or bromonium ion intermediate is produced. (3) a nucleophile (Br⁻, etc.) attacks the positively charged position → the addition product is completed. Key addition reactions and conditions: H₂ addition (hydrogenation): Ni catalyst, 150°C → alkane. Br₂ (or bromine water) addition: room temperature, no catalyst → dibromoalkane (decolourising bromine water tests for unsaturation). HBr addition: room temperature → bromoalkane. H₂O addition (hydration): H₃PO₄ catalyst, 300°C, 60 atm → alcohol.",
          },
          {
            term: "Markovnikov's Rule",
            def: "When HX (HBr, HCl, etc.) adds to an unsymmetrical alkene (an alkene whose two carbons carry different numbers of hydrogens), the hydrogen (H) adds to the carbon that already bears more hydrogens (the carbon already richer in hydrogen gets more). Example: when HBr adds to propene (CH₂=CHCH₃), the major product is 2-bromopropane (CH₃CHBrCH₃) and the minor product is 1-bromopropane (CH₂BrCH₂CH₃). Principle (IB HL): in the first step, the intermediate carbocation is determined by which carbon the H⁺ attaches to. If H⁺ attaches to the CH₂= side, a secondary carbocation (two alkyl groups bonded to the carbon) forms; if it attaches to the CH₃CH= side, a primary carbocation forms. The secondary carbocation is more stable (hyperconjugation/inductive effect of the surrounding alkyl groups), so this pathway is preferred → 2-bromopropane is the major product. At IB SL it is treated as an empirical rule; at HL it is explained by carbocation stability.",
          },
        ],
        traps: [
          "Confusing the addition reactions of alkenes with the substitution reactions of alkanes is a classic IB exam trap. Adding Br₂ to an alkene gives an addition reaction producing a dibromoalkane, whereas adding Br₂ to an alkane gives a substitution reaction under UV conditions producing a bromoalkane + HBr. Different reaction types also mean different reaction conditions — alkene + Br₂ proceeds at room temperature without UV, but alkane + Br₂ barely reacts without UV. On IB Paper 1, confusing this difference in questions about reaction conditions and products will always be marked wrong.",
          "When applying Markovnikov's rule, many students memorise it backwards as 'H goes to the carbon with fewer hydrogens.' The precise statement: 'H goes to the carbon that already has more H, and X (the halogen) goes to the carbon with fewer H (more substituents).' Mnemonic: 'the richer gets richer.' For propene + HBr, the CH₂= side has 2 H and the =CHCH₃ side has 1 H → H goes to the CH₂= side (more H), so the major product is 2-bromopropane.",
        ],
        example:
          "Example of predicting the product of electrophilic addition (IB Paper 2 type): when HBr adds to propene (CH₃CH=CH₂), write the structural formula and IUPAC name of the major product and explain it using Markovnikov's rule. Solution: the double-bond carbons of propene are CH₃CH= (1 H) and =CH₂ (2 H). By Markovnikov's rule, H adds to the carbon with more H, =CH₂, and Br adds to the carbon with fewer H, =CHCH₃. Major product: CH₃CHBrCH₃ → 2-bromopropane. IB HL explanation: if H⁺ attaches to =CH₂, CH₃CH⁺CH₃ (a secondary carbocation, more stable) forms; if H⁺ attaches to =CHCH₃, CH₃CH₂CH₂⁺ (a primary carbocation, less stable) forms. The pathway through the more stable secondary carbocation is preferred, so 2-bromopropane is the major product.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u10-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 10,
    lessonNum: 3,
    unitName: "Organic Chemistry",
    title: "Oxidation and Esterification of Alcohols, Nucleophilic Substitution of Halogenoalkanes, and Addition Polymerisation",
    subtitle: "Alcohols are oxidised to aldehydes, ketones, and carboxylic acids; when a carboxylic acid meets an alcohol it becomes an ester — polymerisation is the process by which the double bonds of monomers open to become a polymer",
    overview:
      "Thanks to the –OH functional group, an alcohol becomes the starting point for a variety of reactions including oxidation, esterification, and dehydration. In an oxidation reaction, a primary alcohol is oxidised all the way to a carboxylic acid in the presence of excess oxidising agent (e.g., acidified KMnO₄ or acidified K₂Cr₂O₇), but with precise control of the oxidising agent it can be separated by distillation at the aldehyde stage. A secondary alcohol is oxidised only to a ketone and no further. A tertiary alcohol is not oxidised — the attached alkyl groups block the oxidation. Esterification is a reversible reaction in which a carboxylic acid and an alcohol undergo dehydration condensation under acid catalysis (H₂SO₄) to form an ester (-COO-) and water. Most fragrant fruity smells come from ester compounds. The nucleophilic substitution (Sₙ) of halogenoalkanes is a reaction in which a nucleophile such as OH⁻, CN⁻, or NH₃ attacks the C–X bond and replaces X. Addition polymerisation is a reaction in which the C=C of alkene monomers opens repeatedly to make a long-chain polymer; ethene → poly(ethene) (PE), chloroethene → PVC, and styrene → polystyrene are representative examples. In this lesson we will fully consolidate these three reaction types — their conditions, products, and equations — to the level of IB Paper 2.",
    objectives: [
      "Define primary, secondary, and tertiary alcohols, and predict and write equations for their oxidation products when an oxidising agent (acidified KMnO₄ or acidified K₂Cr₂O₇) is used — primary: aldehyde → carboxylic acid, secondary: ketone, tertiary: not oxidised",
      "Write the conditions (H₂SO₄ catalyst, heating) and products (ester + water) of the esterification reaction of a carboxylic acid and an alcohol, and name the ester using IUPAC nomenclature",
      "Write the products of the nucleophilic substitution of halogenoalkanes with the nucleophiles OH⁻, CN⁻, and NH₃, and explain the principle by which the polarity of the C–X bond induces the nucleophile's attack",
      "Write the equation for the addition polymerisation of an alkene monomer and draw the polymer structure including the repeat unit",
    ],
    formulas: [
      "Esterification: R–COOH + R'–OH ⇌ R–COO–R' + H₂O  (H₂SO₄ catalyst, reversible)",
      "Addition polymerisation: n CH₂=CHX → –[CH₂–CHX]ₙ–",
      "Oxidation of a primary alcohol: R–CH₂OH → (controlled oxidant) R–CHO → (excess oxidant) R–COOH",
      "Oxidation of a secondary alcohol: R–CHOH–R' → R–CO–R' (ketone; no further oxidation)",
    ],
    sections: [
      {
        title: "Oxidation of Alcohols and Esterification — The Two Core Reactions Alcohols Take Part In",
        subtitle: "The moment you classify a primary, secondary, or tertiary alcohol, the oxidation product is determined — esterification is reversible, so remember the acid catalyst and conditions together",
        terms: [
          {
            term: "Oxidation of Primary, Secondary, and Tertiary Alcohols",
            def: "The degree of an alcohol is determined by the number of other carbons directly bonded to the C–OH carbon. Primary alcohol (one carbon on the –OH carbon): R–CH₂OH. Example: ethanol (CH₃CH₂OH). Secondary alcohol (two carbons on the –OH carbon): R–CHOH–R'. Example: propan-2-ol (CH₃CHOHCH₃). Tertiary alcohol (three carbons on the –OH carbon): R₃C–OH. Example: 2-methylpropan-2-ol. Oxidation results: primary alcohol + a small amount of oxidising agent (distillation conditions) → aldehyde (–CHO). Primary alcohol + excess oxidising agent → carboxylic acid (–COOH). Secondary alcohol + oxidising agent → ketone (C=O, in the middle of the chain). Tertiary alcohol → not oxidised (there is no C–H bond on the C–OH carbon to be oxidised). Oxidising agent: acidified K₂Cr₂O₇ (confirmed by an orange → green colour change) or acidified KMnO₄.",
          },
          {
            term: "Esterification and Naming Esters",
            def: "Esterification: carboxylic acid + alcohol ⇌ ester + water. Conditions: concentrated sulfuric acid (H₂SO₄) catalyst, heating. This reaction is reversible, so to shift the equilibrium toward the products you remove water or use one of the reactants in excess. Naming an ester: the name of the alcohol-derived part (alkyl-, e.g., ethyl) + the name of the carboxylic-acid-derived part (-ate, e.g., ethanoate). Example: CH₃COOH (acetic/ethanoic acid) + CH₃CH₂OH (ethanol) → CH₃COOCH₂CH₃ (ethyl ethanoate) + H₂O. The functional group of an ester: –COO– (the ester linkage). Esters are the main components of fruit and floral aromas and are used in the food and perfume industries. IB Paper 2 examines both writing the ester equation and assigning the IUPAC name.",
          },
          {
            term: "Nucleophilic Substitution of Halogenoalkanes",
            def: "In a halogenoalkane (R–X), the C–X bond is polar because of the high electronegativity of the halogen (X): the carbon is δ+ and the halogen is δ-. A nucleophile (an electron-rich particle with a lone pair) attacks the δ+ carbon, expels X, and forms a new bond. Key reactions: (1) R–X + NaOH(aq) → R–OH + NaX  (heating; produces an alcohol). (2) R–X + KCN (in ethanol solvent) → R–CN + KX  (heating; produces a nitrile, lengthening the carbon chain). (3) R–X + NH₃ (excess, in ethanol solvent, sealed vessel) → R–NH₂ + HX  (produces an amine). Reactivity of the halogens: bond energy increases (the bond gets stronger) in the order C–I < C–Br < C–Cl < C–F, so reactivity decreases. Therefore the iodoalkane (R–I) is the most reactive. IB Paper 2 includes problems that ask you to identify the nucleophile and write the products.",
          },
        ],
        traps: [
          "Confusing aldehydes and ketones as oxidation products is the most common error. An aldehyde is the first-stage oxidation product of a primary alcohol and its functional group –CHO sits at the end of the chain. A ketone is the oxidation product of a secondary alcohol and its functional group C=O sits in the middle of the chain. Both contain C=O, but an aldehyde can be oxidised further (→ carboxylic acid) while a ketone cannot. On IB Paper 2, writing a carboxylic acid as 'the oxidation product of a secondary alcohol' is immediately wrong.",
          "Forgetting that esterification is a reversible reaction and writing a one-way arrow (→) loses marks on IB. You must use ⇌ (the reversible arrow) or state that it is an equilibrium reaction. You must also show the acid catalyst (H₂SO₄) and the heating condition above the equation or in the conditions field. Omitting the conditions loses partial credit.",
        ],
        example:
          "Comprehensive example of alcohol oxidation and esterification (IB Paper 2 type): (1) write the structural formula and IUPAC name of the final product when propan-1-ol (CH₃CH₂CH₂OH) is treated with excess acidified K₂Cr₂O₇. Solution: propan-1-ol is a primary alcohol → excess oxidising agent → propanoic acid (CH₃CH₂COOH). Colour change: K₂Cr₂O₇ orange → green (Cr³⁺ formed). (2) write the equation for synthesising an ester from propanoic acid and ethanol, and give the IUPAC name of the ester formed. Solution: CH₃CH₂COOH + CH₃CH₂OH ⇌ CH₃CH₂COOCH₂CH₃ + H₂O  (conditions: concentrated H₂SO₄, heating). Name of the ester: ethyl propanoate (alcohol → ethyl, carboxylic acid → propanoate).",
      },
      {
        title: "Addition Polymerisation — The Process by Which a Monomer's Double Bond Opens to Become a Polymer",
        subtitle: "n molecules of CH₂=CHX open to become –[CH₂–CHX]ₙ– — you must follow the rule of writing the repeat unit with square brackets and n exactly",
        terms: [
          {
            term: "Addition Polymerisation",
            def: "Addition polymerisation is a reaction in which monomer molecules bearing a C=C double bond open that double bond and form covalent bonds with one another to make a long-chain polymer. Features: (1) no by-product — every atom of the monomer is included in the polymer. (2) the double bond (C=C) is converted into a single bond (C–C). Equation notation: n CH₂=CHX → –[CH₂–CHX]ₙ– (the repeat unit inside square brackets, with n as a subscript). Key examples: ethene (CH₂=CH₂) → poly(ethene) (PE, plastic bags). Chloroethene (= vinyl chloride, CH₂=CHCl) → PVC (poly(vinyl chloride), pipes). Propene (CH₂=CHCH₃) → poly(propene) (PP, containers). Styrene (CH₂=CH–C₆H₅) → polystyrene (PS, expanded styrofoam). IB Paper 2 examines both directions: drawing the polymer repeat unit from the monomer structure, and conversely deducing the monomer from the polymer structure.",
          },
          {
            term: "Distinguishing Addition and Condensation Polymerisation",
            def: "At IB Topic 10 SL only addition polymerisation is covered; condensation polymerisation (nylon, polyester, etc.) is covered in Topic B (HL Option) or HL extension content. The key difference between the two: addition polymerisation: no by-product, requires a C=C in the monomer. Condensation polymerisation: produces a by-product (mainly H₂O), requires two kinds of functional group in the monomer (e.g., –NH₂ and –COOH). On IB Paper 1, choosing addition polymerisation in answer to 'which polymerisation reaction produces a by-product?' is wrong. At SL level, knowing just this distinction is sufficient.",
          },
        ],
        traps: [
          "In the equation for addition polymerisation, writing the repeat unit without square brackets or mis-writing the n notation loses marks on IB Paper 2. Correct notation: n CH₂=CH₂ → –[CH₂–CH₂]ₙ–  (or (–CH₂–CH₂–)ₙ). The double bond (C=C) of the monomer becomes a single bond (C–C) in the repeat unit — you must show this conversion clearly in the structural formula. You must also show bond lines (–) at both ends of the polymer chain to indicate that the chain continues to extend.",
          "When deducing the monomer back from the polymer structure, 'restoring' one C–C single bond of the repeat unit to a C=C double bond gives the monomer. In the PVC repeat unit –[CH₂–CHCl]ₙ–, the monomer is CH₂=CHCl (chloroethene, vinyl chloride). Thinking of this reverse deduction as 'splitting apart' the polymer structure: changing the central C–C bond of the carbon chain within the repeat unit to a C=C gives the monomer. On IB Paper 2, when given a polymer structure and asked to draw the monomer, a frequent error is drawing a dimer instead of the monomer.",
        ],
        example:
          "Example of writing an addition polymerisation equation and reverse deduction (IB Paper 2 type): (1) write the addition polymerisation equation from propene (CH₃CH=CH₂) and represent the repeat unit as a structural formula. Solution: n CH₂=CHCH₃ → –[CH₂–CHCH₃]ₙ–  (poly(propene)). Repeat unit: –CH₂–CH(CH₃)– (square brackets and n notation required). Confirm that the double bond is converted to a single bond. (2) draw the monomer from the following polymer's repeat unit: –[CH₂–CF₂]ₙ–. Solution: restoring the C–C single bond of the repeat unit to a C=C gives the monomer = CH₂=CF₂ (1,1-difluoroethene, or vinylidene fluoride). Polymerising this monomer produces the PVDF (poly(vinylidene fluoride)) polymer.",
      },
    ],
  },
];
