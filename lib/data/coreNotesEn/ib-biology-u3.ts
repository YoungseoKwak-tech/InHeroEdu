/**
 * Core Notes English version — IB Biology Unit 3 (Genetics).
 * Faithful translation of the Korean storytelling original.
 * All objectives, terms, traps, and examples preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-biology-u3-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 3,
    lessonNum: 1,
    unitName: "Genetics",
    title: "Genes, Genomes, and Chromosomes — Storage and Structure of Genetic Information",
    subtitle: "You need to know exactly where a gene sits on a chromosome before inheritance patterns make sense",
    overview:
      "The first gateway into genetics is defining the 'unit of information' precisely. A gene is a DNA sequence that determines a specific trait, and an allele is a different version of that gene. The human genome consists of approximately 3 billion base pairs, packaged across 23 pairs of chromosomes. Karyotype analysis lets us see chromosome number and shape directly, and it forms the diagnostic basis for chromosomal abnormalities such as Down syndrome. In IB exams, you are expected to define these concepts accurately in written responses and to interpret diagrams showing the relationships among homologous chromosomes, sister chromatids, and alleles.",
    objectives: [
      "Define gene, allele, genome, and locus precisely, and explain that the two alleles occupying the same locus are located on homologous chromosomes",
      "Distinguish between diploid and haploid chromosome numbers, and explain the relationship between somatic cells and gametes in the context of 2n → n",
      "Describe the procedure and significance of karyotyping, and link numerical abnormalities such as Down syndrome (trisomy 21) to non-disjunction during meiosis",
      "Differentiate sister chromatids from homologous chromosomes on the basis of whether they are genetically identical",
    ],
    sections: [
      {
        title: "Genes, Alleles, and Genome — The Language of Genetic Information",
        subtitle: "Same position, different version — alleles generate phenotypic diversity",
        terms: [
          {
            term: "Locus",
            def: "The fixed position on a chromosome occupied by a particular gene. At the same locus on homologous chromosomes sit two alleles — one inherited from the father and one from the mother — both governing the same trait.",
          },
          {
            term: "Allele",
            def: "A specific version of a gene occupying the same locus. For example, IA, IB, and i are all alleles at the ABO blood-group locus. When both alleles at a locus are the same the individual is homozygous; when they differ the individual is heterozygous.",
          },
          {
            term: "Genome",
            def: "The complete set of genetic information possessed by an organism. The human genome is approximately 3 billion bp and includes nuclear DNA as well as mitochondrial DNA (mtDNA). IB defines 'genome' as the entire DNA of a cell and refers to it in terms of the haploid (n) complement.",
          },
          {
            term: "Karyotype",
            def: "A photograph or diagram of an individual's chromosomes arranged in order of size and shape. Karyotypes are prepared during metaphase, when chromosomes are maximally condensed. Karyotype analysis allows diagnosis of numerical abnormalities (trisomy, monosomy) and structural abnormalities (deletion, inversion).",
          },
        ],
        traps: [
          "IB written-response questions frequently ask for the difference between a gene and an allele. A gene is the entire DNA sequence that determines a trait; an allele is a particular version of that gene. Writing something like 'genes are on chromosomes but alleles are not,' or using the two terms interchangeably, will lose marks. Your answer must include the phrase 'a different version at the same locus.'",
          "Sister chromatids and homologous chromosomes are commonly confused. Sister chromatids are two identical copies joined at the centromere after DNA replication — they carry exactly the same genetic information. Homologous chromosomes are one paternal and one maternal chromosome of the same type; they share the same gene loci but may carry different alleles. Lumping them together as 'paired chromosomes' is incorrect.",
        ],
        example:
          "An IB-style diagnostic question using karyotype analysis. Fetal cells obtained by amniocentesis were karyotyped and showed three copies of chromosome 21 (trisomy 21). This occurs because non-disjunction of chromosome 21 during meiosis produces an n+1 gamete that then fuses with a normal gamete. Result: 2n = 47. In IB Paper 2 you may be asked to identify the abnormal chromosome from a karyogram, or to state whether non-disjunction occurred in meiosis I or meiosis II and to justify your answer.",
      },
      {
        title: "Meiosis — Cell Division That Generates Genetic Diversity",
        subtitle: "Crossing over and independent assortment are the two mechanisms that make every gamete unique",
        terms: [
          {
            term: "Meiosis",
            def: "The process by which a diploid (2n) cell undergoes two successive divisions — meiosis I and meiosis II — to produce four haploid (n) cells. During meiosis I, homologous chromosomes separate; during meiosis II, sister chromatids separate.",
          },
          {
            term: "Crossing over",
            def: "During prophase I, while homologous chromosomes are in synapsis, DNA segments are exchanged between non-sister chromatids. The point of exchange is called a chiasma. Crossing over generates new combinations of alleles and is a major source of genetic diversity.",
          },
          {
            term: "Non-disjunction",
            def: "Failure of chromosomes to separate correctly during meiosis or mitosis, producing daughter cells with abnormal chromosome numbers. When non-disjunction occurs in meiosis I, both resulting daughter cells are abnormal; when it occurs in meiosis II, only one of the two daughter cells is affected.",
          },
          {
            term: "Independent assortment",
            def: "During metaphase I, each pair of homologous chromosomes lines up on the spindle independently, with the maternal and paternal chromosomes of each pair oriented randomly. In humans this produces 2²³ (approximately 8 million) possible combinations of chromosomes in the gametes.",
          },
        ],
        traps: [
          "IB questions often ask how many cells result from meiosis I versus meiosis II. After meiosis I there are 2 cells; after meiosis II there are 4 haploid cells in total. A common point of confusion is the chromosome content immediately after meiosis I: homologous chromosomes have separated so each cell is haploid (n), but each chromosome still consists of two sister chromatids, meaning the DNA content is still 2C. Understanding that such a cell is 'haploid in chromosome number but 2C in DNA amount' is essential.",
          "Crossing over occurs between non-sister chromatids, not between sister chromatids. An exchange between sister chromatids produces no new allele combinations because the sequences are identical. Writing 'crossing over between sister chromatids' in an IB answer will cost marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u3-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 3,
    lessonNum: 2,
    unitName: "Genetics",
    title: "Mendelian Genetics — From Simple Dominance to Codominance, Multiple Alleles, and Sex-Linkage",
    subtitle: "A single Punnett square predicts every phenotypic ratio across all inheritance patterns",
    overview:
      "Mendel's law of segregation and law of independent assortment, discovered through pea-plant experiments, form the foundation of modern genetic counselling. IB requires you to go beyond simple dominant/recessive inheritance and accurately analyse codominance, multiple alleles (ABO blood groups), and sex-linked inheritance using Punnett squares. Key skills include calculating the proportion of carrier females and affected males in sex-linked crosses, distinguishing phenotypic ratios from genotypic ratios, and constructing 4×4 Punnett squares for dihybrid crosses.",
    objectives: [
      "Distinguish the phenotypes of homozygous and heterozygous individuals in simple dominant/recessive inheritance, predict cross outcomes using Punnett squares, and distinguish phenotypic ratios from genotypic ratios",
      "Explain the difference between codominance and incomplete dominance at the level of phenotype, and analyse crosses involving the three ABO alleles (IA, IB, i)",
      "Explain the concepts of carrier female and affected male in X-linked inheritance, and predict sex-specific phenotypic ratios using Punnett squares",
      "Explain how the 9:3:3:1 ratio in a dihybrid cross is derived from independent assortment, and construct the corresponding 4×4 Punnett square",
    ],
    sections: [
      {
        title: "Simple Inheritance, Codominance, and Multiple Alleles — The Logic of Phenotypic Ratios",
        subtitle: "Changing the dominance relationship between alleles changes the phenotypic ratio",
        terms: [
          {
            term: "Dominant / Recessive",
            def: "In a heterozygote (Aa), the allele expressed in the phenotype is dominant (A) and the allele not expressed is recessive (a). A single dominant allele (Aa) is sufficient to produce the dominant phenotype. The recessive phenotype appears only in the homozygous recessive genotype (aa).",
          },
          {
            term: "Codominance",
            def: "An inheritance pattern in which both alleles in a heterozygote are expressed simultaneously and independently in the phenotype. Example: in blood type AB, both IA and IB are expressed, so both A antigen and B antigen are present on the surface of red blood cells. Unlike incomplete dominance (which produces an intermediate phenotype), the two traits do not blend — each is expressed in full.",
          },
          {
            term: "Multiple alleles",
            def: "The existence of three or more alleles for a single gene locus within a population. The ABO blood group is controlled by three alleles — IA, IB, and i — producing four phenotypes (A, B, AB, O). Any individual still carries only two alleles, but three versions exist at the population level.",
          },
          {
            term: "Punnett square",
            def: "A grid used to calculate the probability of offspring genotypes by placing the gamete genotypes of each parent along the rows and columns. A monohybrid cross uses a 2×2 grid; a dihybrid cross uses a 4×4 grid.",
          },
        ],
        traps: [
          "In the ABO blood group system, IA and IB are codominant with each other, and both are dominant over i. A common exam trap is the question 'Can two parents with blood type O produce a child with blood type AB?' The answer is no — blood type O is genotype ii, so each parent can only contribute the i allele, and blood type AB requires both IA and IB. Do not fall for the reasoning that 'codominance makes it possible.'",
          "Do not confuse codominance with incomplete dominance. In codominance both phenotypes are expressed independently (blood type AB: both A and B antigens present). In incomplete dominance a blended intermediate phenotype results (red flower × white flower → pink flower). IB mark schemes distinguish these two concepts strictly.",
        ],
        example:
          "ABO blood group cross analysis. The mother has blood type A (genotype IAi) and the father has blood type B (genotype IBi). A Punnett square gives the following offspring distribution.\n\nMother's gametes: IA, i / Father's gametes: IB, i\n\nPunnett square:\n        IB             i\nIA | IAIB (AB)  | IAi (A)\ni  | IBi  (B)   | ii  (O)\n\nResult: A : B : AB : O = 1 : 1 : 1 : 1 (25% each). All four blood types can appear with equal probability. In IB Paper 2 you will also be asked to express the probability of a specific blood type as a fraction or percentage.",
      },
      {
        title: "Sex-Linked Inheritance — The Unusual Inheritance Pattern of X-Linked Traits",
        subtitle: "The reason only sons are affected by a carrier mother is that they have only one X chromosome",
        terms: [
          {
            term: "Sex-linked inheritance",
            def: "An inheritance pattern in which the gene determining the trait is located on a sex chromosome, typically the X chromosome. Because females (XX) carry two X chromosomes, they can be heterozygous carriers without showing the trait. Males (XY) have only one X chromosome, so a single recessive allele is sufficient for the trait to be expressed.",
          },
          {
            term: "Carrier",
            def: "A heterozygous individual (XᴬXᵃ) who has a normal phenotype but carries a recessive allele that can be passed to offspring. In sex-linked inheritance, carriers are almost always female. Males cannot be carriers because they possess only one X chromosome.",
          },
          {
            term: "X-linked recessive",
            def: "An inheritance pattern in which a recessive allele is located on the X chromosome. Colour blindness and haemophilia are classic examples. The daughters of an affected male (XᵃY) are obligate carriers (XᴬXᵃ), while his sons receive the Y chromosome and are unaffected.",
          },
        ],
        traps: [
          "When writing the genotype of an affected male in an X-linked recessive cross, you must write XᵃY — making explicit that the Y chromosome carries no corresponding allele. Writing 'aa' as though it were an autosomal genotype omits the sex-chromosome information and loses marks. Also remember that an affected father cannot pass an X-linked trait to his sons — fathers give sons the Y chromosome, so X-linked traits are never transmitted father-to-son.",
          "Phenotypic ratios in sex-linked crosses must be stated separately for each sex. For example: '50% of daughters are carriers; 50% of sons are colour blind.' Writing '25% of all offspring are colour blind' by combining sexes is incorrect. IB mark schemes require sex-specific phenotypic ratios to be stated explicitly.",
        ],
        example:
          "Colour blindness (X-linked recessive) Punnett square. Cross: carrier mother (XᴺXⁿ) × normal-vision father (XᴺY).\n\nMother's gametes: Xᴺ, Xⁿ / Father's gametes: Xᴺ, Y\n\nPunnett square:\n        Xᴺ                Y\nXᴺ | XᴺXᴺ (normal ♀)  | XᴺY (normal ♂)\nXⁿ | XᴺXⁿ (carrier ♀) | XⁿY (colour-blind ♂)\n\nResult — daughters: 50% normal, 50% carrier / sons: 50% normal, 50% colour blind. Although 25% of all offspring are colour blind, IB requires you to state 'among sons, 50% are colour blind' with the sex distinction to achieve full marks.",
      },
    ],
  },
  {
    lessonId: "ib-biology-u3-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 3,
    lessonNum: 3,
    unitName: "Genetics",
    title: "Genetic Technology — Principles and Ethics of PCR, Gel Electrophoresis, GMOs, and Cloning",
    subtitle: "The molecular tools that amplify a single DNA fragment a billion-fold and sort it by size",
    overview:
      "Modern genetic technology has applications across forensics, medical diagnosis, agriculture, and biotechnology at large. In IB Topic 3 you are expected to explain the scientific principles of PCR (polymerase chain reaction), gel electrophoresis, and genetically modified organisms (GMOs) with precision. You must also be able to write extended-response answers on the difference between reproductive and therapeutic cloning, and evaluate the potential benefits and ethical concerns surrounding stem-cell technology.",
    objectives: [
      "Describe the three steps of PCR (denaturation, annealing, extension) including the temperature and role of each step, and explain why a heat-stable DNA polymerase (Taq polymerase) is required",
      "Explain the principle of gel electrophoresis (negatively charged DNA migrates toward the positive electrode; smaller fragments migrate further) and estimate fragment sizes by comparison with a size ladder",
      "Describe the basic steps of recombinant DNA technology (restriction enzymes, DNA ligase, vector insertion) and evaluate specific GMO applications, including their potential benefits and risks",
      "Explain the principle of cloning by nuclear transfer, distinguish reproductive from therapeutic cloning, and discuss the ethical issues surrounding stem-cell technology",
      "Describe the personal and social ethical issues associated with genetic screening techniques (e.g. amniocentesis, chorionic villus sampling) in the context of IB Nature of Science",
    ],
    sections: [
      {
        title: "PCR and Gel Electrophoresis — The Two Core Tools of DNA Analysis",
        subtitle: "Copy DNA exponentially over dozens of cycles, then rank the fragments by length",
        terms: [
          {
            term: "PCR (Polymerase Chain Reaction)",
            def: "A technique that amplifies a specific region of DNA in vitro by repeated cycles of replication, producing billions of copies. The three steps are: ① Denaturation (~95°C) — heat separates the double helix into single strands; ② Annealing (~55°C) — primers bind to the template strands; ③ Extension (~72°C) — Taq polymerase synthesises new strands. DNA doubles with each cycle, yielding 2ⁿ copies after n cycles.",
          },
          {
            term: "Gel electrophoresis",
            def: "A technique in which DNA samples are loaded into an agarose gel and an electric field is applied to separate fragments by size. Because DNA is negatively charged (due to phosphate groups), it migrates toward the positive electrode. Smaller fragments pass through the gel matrix more easily and travel further. Fragment sizes are estimated by comparison with a DNA size ladder (marker).",
          },
          {
            term: "Taq polymerase",
            def: "A heat-stable DNA polymerase isolated from the thermophilic bacterium Thermus aquaticus. It retains activity at the high temperatures (~95°C) used for denaturation in PCR. Ordinary DNA polymerases are inactivated at these temperatures and would have to be re-added after every cycle, making automation impractical.",
          },
          {
            term: "Restriction enzyme (restriction endonuclease)",
            def: "An enzyme that recognises a specific short DNA sequence (restriction site) and cuts the DNA at or near that site. Cutting produces 'sticky ends' — short single-stranded overhangs — that can base-pair with complementary sticky ends on another DNA fragment cut by the same enzyme. This makes restriction enzymes the central tool for constructing recombinant DNA.",
          },
        ],
        traps: [
          "During the annealing step of PCR it is the primers that bind to the template — not the DNA polymerase. Furthermore, PCR primers are short single-stranded DNA oligonucleotides, not RNA. Writing 'the polymerase binds during annealing' or 'RNA primers bind' in an IB answer will lose marks. Taq polymerase acts only during the extension step to synthesise new strands.",
          "When interpreting a gel electrophoresis image, be careful about direction. DNA is negatively charged and migrates from the negative electrode (where samples are loaded) toward the positive electrode. Smaller fragments migrate further (toward the positive end). The band closest to the loading well is the largest fragment — keep this in mind when asked which band represents the largest DNA fragment.",
        ],
        example:
          "Calculating the number of PCR copies from cycle number. Suppose a crime-scene DNA sample contains a single molecule of double-stranded DNA (2 strands). After 30 cycles of PCR, the theoretical number of copies is 2³⁰ ≈ 1 billion (10⁹). Actual efficiency is below 100%, so the real yield is somewhat lower, but it is more than sufficient for forensic DNA fingerprinting analysis. The amplified DNA is run on a gel, producing a band pattern that can be compared with a suspect's DNA profile to determine a match.",
      },
      {
        title: "GMOs, Cloning, and Stem Cells — Applications and Ethics of Genetic Technology",
        subtitle: "What science makes possible is not necessarily what ought to be done",
        terms: [
          {
            term: "GMO (Genetically Modified Organism)",
            def: "An organism into which a gene from another species has been introduced using recombinant DNA technology. Examples include Bt maize (containing a pest-resistance gene), Golden Rice (engineered to produce beta-carotene), and E. coli engineered to produce human insulin. The target gene is cut with restriction enzymes, inserted into a plasmid vector using DNA ligase, and introduced into a host cell by transformation.",
          },
          {
            term: "Nuclear transfer (Somatic Cell Nuclear Transfer, SCNT)",
            def: "A technique in which the nucleus is removed from a somatic cell and transferred into an enucleated egg cell. Activation of the egg (e.g. by electrical stimulation) initiates development. In reproductive cloning the reconstructed egg is implanted into a surrogate and develops into a cloned organism. In therapeutic cloning development is allowed to proceed only to the blastocyst stage, from which stem cells are harvested.",
          },
          {
            term: "Stem cell",
            def: "An undifferentiated cell capable of dividing and differentiating into multiple cell types. Embryonic stem cells (ESCs) are pluripotent and highly versatile but their use requires destruction of an embryo. Adult stem cells (ASCs) are more limited in their differentiation potential. Induced pluripotent stem cells (iPSCs) are created by reprogramming differentiated somatic cells, avoiding the ethical concerns associated with embryo destruction.",
          },
        ],
        traps: [
          "In an IB Paper 2 extended-response question asking about the benefits and risks of GMOs, listing only one side will limit your mark. Benefits (e.g. enhanced nutrition, improved yields through herbicide resistance, production of pharmaceutical proteins) and risks (e.g. ecological effects through gene flow, reduction in biodiversity, possible allergic reactions, food sovereignty concerns related to patent control) must both be addressed in a balanced argument. Extreme statements such as 'all GMOs are dangerous' or 'GMOs are completely safe' are penalised on IB mark schemes.",
          "Do not confuse reproductive cloning with therapeutic cloning. Both use SCNT, but the purpose and outcome differ. Reproductive cloning aims to produce a genetically identical individual. Therapeutic cloning aims to obtain patient-matched stem cells. Writing 'Dolly the sheep is an example of therapeutic cloning' in an IB answer is incorrect — Dolly is an example of reproductive cloning.",
        ],
        example:
          "Step-by-step production of insulin-producing GMO E. coli. ① The insulin gene is excised from the human chromosome using a restriction enzyme. ② The same restriction enzyme is used to linearise an E. coli plasmid. ③ The two DNA fragments are mixed; their complementary sticky ends anneal, and DNA ligase seals the phosphodiester bonds to create a recombinant plasmid. ④ The recombinant plasmid is introduced into E. coli by transformation. ⑤ The bacteria express the insulin gene and produce human insulin. Recombinant insulin produced by this method (e.g. Humulin) has been used to treat patients with diabetes mellitus since 1982.",
      },
    ],
  },
];
