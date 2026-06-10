/**
 * Core Notes English version — IB Biology Unit 2 (Molecular Biology).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-biology-u2-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 2,
    lessonNum: 1,
    unitName: "Molecular Biology",
    title: "Biochemical Molecules — The Precise Workings of Carbohydrates, Lipids, Proteins, and Enzymes",
    subtitle: "Why a single bond formed by a water molecule determines the structure of life",
    overview:
      "The four classes of macromolecules that make up living organisms — carbohydrates, lipids, proteins, and nucleic acids — are all built on a carbon scaffold. The symmetry by which monomers polymerize via condensation reactions and are broken apart again by hydrolysis is the very foundation of digestive and biosynthetic metabolism. Enzymes are protein catalysts that lower activation energy so that these reactions proceed fast enough at body temperature, and IB tests enzyme structure and inhibitor mechanisms with specific graph interpretation tasks.",
    objectives: [
      "List the monomers and polymers of carbohydrates, lipids, and proteins, and describe the bonds (glycosidic, ester, and peptide bonds) formed by condensation reactions",
      "Explain the structural difference between saturated and unsaturated fatty acids in terms of double bonds, and connect the consequences to health and membrane fluidity",
      "Describe the primary, secondary, tertiary, and quaternary structures of proteins and distinguish the bond types that stabilize each level",
      "Explain the mechanism by which enzymes lower activation energy using the induced fit model, and interpret graphs showing the effects of temperature, pH, substrate concentration, and inhibitors on reaction rate",
      "Compare competitive and non-competitive inhibition at the molecular level and predict changes in Vmax and Km",
    ],
    sections: [
      {
        title: "Carbohydrates, Lipids, and Proteins — Structure and Function of Macromolecules",
        subtitle: "Each condensation reaction forms one bond, and those bonds collectively define the forms of life",
        terms: [
          {
            term: "Condensation reaction",
            def: "A reaction in which two monomers are joined by a covalent bond with the loss of one water molecule. This applies throughout macromolecule synthesis: two glucose molecules → maltose (glycosidic bond); two amino acids → dipeptide (peptide bond); glycerol + fatty acid → triglyceride (ester bond).",
          },
          {
            term: "Saturated fatty acid",
            def: "A fatty acid with no carbon-carbon double bonds, fully saturated with hydrogen atoms. The straight-chain molecules pack tightly together, making them solid at room temperature (animal fats), and they reduce the fluidity of the phospholipid bilayer.",
          },
          {
            term: "Unsaturated fatty acid",
            def: "A fatty acid with one or more carbon-carbon double bonds. The kinked structure reduces molecular packing, making unsaturated fats liquid at room temperature (plant oils) and increasing membrane fluidity.",
          },
          {
            term: "Tertiary structure of protein",
            def: "The overall three-dimensional shape formed when the entire polypeptide chain folds through disulfide bonds, hydrogen bonds, ionic bonds, and hydrophobic interactions. This shape determines the precise geometry of the enzyme's active site.",
          },
        ],
        traps: [
          "IB frequently asks in extended-response questions why glycogen and starch function differently despite both being glucose polymers. Starch consists of amylose (helical) and amylopectin (branched), used for energy storage in plants. Glycogen is far more extensively branched, allowing enzymes to cleave from multiple ends simultaneously — this makes it ideal for rapid glucose release in animals. Writing 'both store glucose' and stopping there will earn only partial marks.",
          "Unlike carbohydrates and proteins, lipids are not true polymers. A triglyceride is formed by ester bonds between one glycerol and three fatty acids, but because there is no repeating monomer unit, the expression 'lipid monomer' is incorrect in IB mark schemes. If asked 'What is the monomer of a lipid?' the correct answer is to explicitly state that lipids do not have a monomer-polymer structure.",
        ],
        example:
          "Let's understand protein denaturation — the collapse of tertiary structure — in the context of an IB practical experiment. When egg white (albumin) is heated, it changes from transparent to a white solid. Heat breaks the hydrogen bonds and hydrophobic interactions that hold the tertiary structure together; the polypeptide unfolds and exposes hydrophobic regions that then aggregate. Because this process is irreversible, the denatured enzyme has a disrupted active site that can no longer bind substrate, and catalytic activity is lost entirely.",
      },
      {
        title: "Enzymes — Protein Catalysts That Lower Activation Energy",
        subtitle: "The precise three-dimensional shape of the active site determines the pace of life",
        terms: [
          {
            term: "Activation energy",
            def: "The energy barrier that reactants must overcome for a chemical reaction to begin. Enzymes lower this barrier by stabilizing substrates within the active site or by forming a reaction intermediate, thereby dramatically increasing reaction rate.",
          },
          {
            term: "Induced fit model",
            def: "A model in which binding of a substrate causes the enzyme to undergo a slight conformational change that wraps more precisely around the substrate. This model accounts for the dynamic flexibility of enzymes better than the rigid 'lock-and-key' model.",
          },
          {
            term: "Competitive inhibitor",
            def: "An inhibitor with a structure similar to the substrate that competes with the substrate for the active site. Increasing substrate concentration reduces the inhibitory effect; Vmax is unchanged but the apparent Km increases.",
          },
          {
            term: "Non-competitive inhibitor",
            def: "An inhibitor that binds at an allosteric site rather than the active site, altering the enzyme's conformation and reducing its catalytic activity. Increasing substrate concentration cannot overcome the inhibition; Vmax decreases while Km remains unchanged.",
          },
        ],
        traps: [
          "IB Paper 2 graph questions ask students to distinguish between the Michaelis-Menten curves for competitive and non-competitive inhibition. Competitive inhibition: Vmax unchanged, Km increased (curve shifted to the right). Non-competitive inhibition: Vmax decreased, Km unchanged (curve shifted downward). In both cases, the explanation that 'increasing substrate concentration solves the problem' applies only to competitive inhibition — this distinction must be stated clearly.",
          "In temperature versus reaction rate graphs, writing 'the enzyme is destroyed' to explain the sharp drop beyond the optimum temperature is imprecise and will cost marks. The correct phrasing is 'at high temperatures, the enzyme denatures, meaning the shape of the active site changes so it can no longer bind the substrate.' It is the collapse of tertiary structure — not physical destruction — that must be specified for full credit.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u2-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 2,
    lessonNum: 2,
    unitName: "Molecular Biology",
    title: "DNA Structure, Replication, Transcription, and Translation — The Flow of Genetic Information",
    subtitle: "The complete molecular journey from double helix self-copying to protein synthesis",
    overview:
      "The DNA double helix that Watson and Crick resolved in 1953 from X-ray diffraction data is a brilliantly engineered structure that simultaneously allows genetic information to be preserved and transmitted. Because the two strands are linked by complementary base pairs, each strand can serve as a template for replication, and a gene's information travels through transcription and translation to become a protein. IB tests the experimental evidence for semi-conservative replication, the correspondence between mRNA codons and tRNA anticodons, and the specific steps by which peptide bonds form on the ribosome.",
    objectives: [
      "Describe the nucleotide structure of DNA and the double helix model (antiparallel strands, complementary base pairing, sugar-phosphate backbone)",
      "Explain semi-conservative replication in connection with the Meselson-Stahl experiment, and distinguish the roles of DNA polymerase, helicase, and DNA ligase",
      "Describe transcription (RNA polymerase reading the template strand, mRNA synthesis) and translation (ribosome, codons, anticodons, amino acid assembly) step by step",
      "Explain the three properties of the genetic code (degeneracy, universality, non-overlapping) and use a codon table to determine an amino acid sequence",
    ],
    sections: [
      {
        title: "DNA Structure and Semi-Conservative Replication",
        subtitle: "Why the beautiful symmetry of two antiparallel strands makes replication perfect",
        terms: [
          {
            term: "Nucleotide",
            def: "The basic unit of DNA. Each nucleotide consists of a deoxyribose (5-carbon sugar) + a phosphate group + a nitrogenous base (adenine, thymine, guanine, or cytosine). Phosphodiester bonds between adjacent nucleotides form the sugar-phosphate backbone.",
          },
          {
            term: "Chargaff's rules",
            def: "The rule that in any DNA molecule the molar ratios A = T and G = C. These ratios are explained by hydrogen-bonded base pairs (A-T: 2 hydrogen bonds; G-C: 3 hydrogen bonds) between purines (A, G) and pyrimidines (T, C). Central to IB calculation problems in which a given proportion of one base is used to find all others.",
          },
          {
            term: "Semi-conservative replication",
            def: "A mode of DNA replication in which each daughter double helix consists of one original (parental) strand and one newly synthesized strand. Proved experimentally by Meselson and Stahl in 1958 using ¹⁵N/¹⁴N isotope labeling.",
          },
          {
            term: "DNA polymerase",
            def: "The enzyme that synthesizes a new DNA strand by linking nucleotides in the 5'→3' direction only. The leading strand is synthesized continuously; the lagging strand is synthesized discontinuously as Okazaki fragments.",
          },
        ],
        traps: [
          "IB regularly asks students to distinguish the roles of helicase and DNA polymerase. Helicase breaks the hydrogen bonds between the two strands to unwind the double helix; DNA polymerase uses the exposed single strand as a template to synthesize the new strand. Confusing the two — e.g., writing 'helicase makes the new strand' — loses marks. Also note that it is primase (not DNA polymerase) that synthesizes the RNA primer, and that DNA polymerase cannot initiate replication without a primer.",
          "In Meselson-Stahl interpretation questions, students are asked why all DNA is at an intermediate density after one generation. Under conservative replication, two bands (heavy and light) would appear; the appearance of only a single intermediate-density band is the direct evidence for semi-conservative replication. The answer must link the experimental result to this conclusion explicitly.",
        ],
        example:
          "Here is an IB calculation example using Chargaff's rules. If cytosine (C) makes up 22% of the bases in a given DNA molecule: G = C = 22%; A + T = 100% − (22 + 22)% = 56%; A = T = 28%. Therefore adenine accounts for 28% of the bases. In the double helix, a higher proportion of G-C pairs means stronger overall bonding (3 hydrogen bonds per pair), so DNA with a high G-C content denatures at a higher temperature. This explains why organisms adapted to extreme heat have DNA with elevated G-C content.",
      },
      {
        title: "Transcription and Translation — The Journey from DNA to Protein",
        subtitle: "The molecular grammar by which one codon summons one amino acid",
        terms: [
          {
            term: "Transcription",
            def: "The process in which RNA polymerase reads the DNA template strand (3'→5') and synthesizes a complementary mRNA strand in the 5'→3' direction. In eukaryotes this occurs in the nucleus, after which the mRNA is processed (5' cap, poly-A tail, intron removal) before export.",
          },
          {
            term: "Translation",
            def: "The process in which the ribosome reads mRNA codons and tRNA-carried amino acids are joined by peptide bonds to form a polypeptide. The sequence proceeds: A site (aminoacyl-tRNA binding) → P site (peptide bond formation) → E site (empty tRNA release).",
          },
          {
            term: "Codon",
            def: "A sequence of three consecutive bases on mRNA that specifies a particular amino acid or a stop signal. Because 64 codons encode only 20 amino acids, the code is degenerate — multiple codons specify the same amino acid.",
          },
          {
            term: "Anticodon",
            def: "The three-base sequence on the loop of a tRNA molecule that base-pairs with the complementary mRNA codon. The tRNA carries the corresponding amino acid attached to its 3' end and delivers it to the A site of the ribosome.",
          },
        ],
        traps: [
          "IB frequently asks students to distinguish the 'template strand' from the 'coding strand' during transcription. RNA polymerase reads the template strand (3'→5') to synthesize mRNA. The resulting mRNA sequence is identical to the coding strand (non-template strand), except that T is replaced by U. Confusing the template strand with the sequence that matches the mRNA — and writing 'the template strand has the same sequence as the mRNA' — is a common error that costs marks.",
          "In translation, the start codon (AUG) encodes methionine, so every polypeptide initially begins with methionine. However, the final protein may not contain methionine at its N-terminus because it can be cleaved post-translationally. Also, stop codons (UAA, UAG, UGA) have no corresponding tRNA; instead, a release factor protein binds at the stop codon and triggers release of the polypeptide from the ribosome.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u2-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 2,
    lessonNum: 3,
    unitName: "Molecular Biology",
    title: "Cellular Respiration and Photosynthesis — The Big Picture of Energy Metabolism",
    subtitle: "How mitochondria and chloroplasts exploit membranes to convert energy",
    overview:
      "Cellular respiration and photosynthesis are energy conversions running in opposite directions. Photosynthesis stores light energy as chemical energy in glucose; cellular respiration breaks that glucose down and converts it into ATP — the energy currency the cell can directly use. In IB Topic 2, students are expected to accurately state the overall input/output equations for both pathways, distinguish glycolysis, the Krebs cycle, and oxidative phosphorylation, and describe at an overview level the roles of the light-dependent reactions and the Calvin cycle in photosynthesis.",
    objectives: [
      "Write the overall equation for cellular respiration (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP) and distinguish glycolysis (cytoplasm), the Krebs cycle (mitochondrial matrix), and oxidative phosphorylation (inner membrane) by location and major products",
      "Explain the conditions and significance of anaerobic fermentation (lactic acid and ethanol fermentation)",
      "Write the overall equation for photosynthesis (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂) and distinguish the roles of the light-dependent reactions (thylakoid membrane) and the Calvin cycle (stroma)",
      "Describe the structure of ATP and explain the reversible reaction ATP ↔ ADP + Pi in the context of cellular energy transfer",
    ],
    sections: [
      {
        title: "Cellular Respiration — Three Stages from Glucose to ATP",
        subtitle: "Glycolysis needs no oxygen; the real bulk of ATP production happens at the inner membrane",
        terms: [
          {
            term: "Glycolysis",
            def: "A 10-step reaction in the cytoplasm that splits one glucose molecule (6 carbons) into two pyruvate molecules (3 carbons). Oxygen is not required; net products are 2 ATP, 2 NADH, and 2 pyruvate.",
          },
          {
            term: "Krebs cycle",
            def: "A cycle in the mitochondrial matrix in which acetyl-CoA (2 carbons) combines with oxaloacetate (4 carbons) to form citrate (6 carbons), releases carbon dioxide, and regenerates oxaloacetate. Per acetyl-CoA: 1 ATP, 3 NADH, 1 FADH₂, and 2 CO₂ are produced.",
          },
          {
            term: "Oxidative phosphorylation",
            def: "The process on the inner mitochondrial membrane in which electrons from NADH and FADH₂ are passed along the electron transport chain to oxygen, releasing energy that ATP synthase uses to produce large quantities of ATP. Chemiosmosis is the central mechanism.",
          },
          {
            term: "Lactic acid fermentation",
            def: "Under anaerobic conditions, the reduction of pyruvate to lactate (catalyzed by lactate dehydrogenase). This regenerates NAD⁺ from NADH, allowing glycolysis to continue. It occurs in animal muscle cells and red blood cells.",
          },
        ],
        traps: [
          "When IB asks for the total ATP yield of glycolysis, the answer is 2 (net). Students must distinguish 2 ATP invested versus 4 ATP produced to arrive at a net of 2. Writing '4' is marked wrong. Similarly, in ethanol fermentation, clearly separate the step that releases CO₂ (pyruvate → acetaldehyde) from the step that produces ethanol (acetaldehyde → ethanol) — conflating the two loses marks.",
          "For questions asking 'where does the CO₂ from the Krebs cycle come from?', never write 'directly from glucose.' Glucose is broken down to pyruvate in glycolysis; one CO₂ is released when pyruvate is converted to acetyl-CoA (pyruvate decarboxylation), and two additional CO₂ molecules are released during each turn of the Krebs cycle. The precise stage at which each CO₂ is released must be specified.",
        ],
        example:
          "Let's calculate total ATP yield from cellular respiration at IB level. From complete oxidation of one glucose molecule: glycolysis (cytoplasm) → net 2 ATP + 2 NADH; pyruvate-to-acetyl-CoA conversion (matrix) → 2 NADH + 2 CO₂; Krebs cycle (×2) → 2 ATP + 6 NADH + 2 FADH₂ + 4 CO₂; electron transport chain → approximately 2.5 ATP per NADH, approximately 1.5 ATP per FADH₂. Total: approximately 30–32 ATP per glucose molecule. IB values the concept that the vast majority of ATP is produced by oxidative phosphorylation far more than the precise number.",
      },
      {
        title: "Photosynthesis — Two Stages for Converting Light into Chemical Energy",
        subtitle: "The ATP and NADPH produced in the light-dependent reactions fuel the engine of the Calvin cycle",
        terms: [
          {
            term: "Light-dependent reactions",
            def: "Reactions on the thylakoid membrane of the chloroplast that use light energy to photolyze water, synthesize ATP and NADPH, and release oxygen. Photosystem II (P680) splits water; Photosystem I (P700) produces NADPH.",
          },
          {
            term: "Calvin cycle",
            def: "A cycle in the chloroplast stroma that uses ATP and NADPH to fix CO₂ into G3P (3 carbons). The enzyme RuBisCO catalyzes the combination of CO₂ with RuBP (5 carbons) to initiate carbon fixation.",
          },
          {
            term: "Photolysis of water",
            def: "The splitting of water molecules using light energy at Photosystem II, generating electrons, protons, and oxygen (2H₂O → 4H⁺ + 4e⁻ + O₂). The oxygen released is the byproduct of photosynthesis that enters the atmosphere.",
          },
          {
            term: "ATP synthase",
            def: "A membrane protein complex present on both the inner mitochondrial membrane and the thylakoid membrane. It uses the proton (H⁺) gradient (chemiosmosis) to synthesize ATP from ADP + Pi. The fact that the same mechanism operates in both organelles is an important IB concept.",
          },
        ],
        traps: [
          "IB questions that ask 'where does the oxygen produced in photosynthesis come from?' have water (H₂O) — not CO₂ — as the correct answer. Oxygen is released by the photolysis reaction (2H₂O → 4H⁺ + 4e⁻ + O₂), demonstrated by ¹⁸O isotope tracing experiments. 'Oxygen comes from carbon dioxide' is a standard wrong-answer distractor in Paper 1.",
          "Confusion about whether the Calvin cycle depends on light is common. The Calvin cycle itself does not directly require light, but without light, ATP and NADPH are not supplied, so it depends on light indirectly. The statement 'the Calvin cycle can proceed without light' is not technically wrong, but in the IB context the complete answer must note that without ATP and NADPH replenishment, the cycle quickly halts.",
        ],
        example:
          "Here is an IB investigation example that confirms the dependence of the Calvin cycle on the light-dependent reactions. When a chloroplast is illuminated and the light is suddenly cut off, ATP and NADPH levels fall and the Calvin cycle slows; RuBP continues to be consumed but cannot be regenerated, so it is depleted. Conversely, if CO₂ supply is suddenly removed, G3P production stops, NADPH accumulates, and RuBP builds up. Both experiments appear regularly as Paper 2 data analysis questions; practise describing the causal chain at the molecular level in chronological order.",
      },
    ],
  },
];
