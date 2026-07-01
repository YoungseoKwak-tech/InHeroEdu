/**
 * Core Notes English version — Honors Biology Unit 3 (Genetics).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_BIOLOGY_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-biology-u3-l1",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 3,
    lessonNum: 1,
    unitName: "Genetics",
    title: "Meiosis and Sexual Reproduction",
    subtitle: "The two mechanisms by which meiosis, which halves chromosome number, generates the genetic diversity of sexual reproduction",
    overview:
      "Life has two ways to reproduce itself: stamping out genetically identical copies as in mitosis, or making haploid gametes by meiosis to generate new genetic combinations through sexual reproduction. In this lesson we dig deep into the fact that meiosis is not simply a 'division that halves chromosomes.' The separation of homologous chromosomes and crossing over in meiosis I, and the separation of sister chromatids in meiosis II — these two stages are the engine of genetic diversity. Add independent assortment and, for humans, over 8 million gamete combinations become theoretically possible.",
    objectives: [
      "Compare and explain each stage of meiosis I and meiosis II in terms of the behavior of homologous chromosomes and sister chromatids",
      "Explain the mechanism by which crossing over increases genetic diversity, linked to the formation of chiasmata",
      "Explain that the law of independent assortment originates in metaphase of meiosis I from the random alignment of homologous chromosome pairs",
      "Compare and contrast mitosis and meiosis by purpose, number of divisions, number of daughter cells, genetic identity, and chromosome number",
    ],
    sections: [
      {
        title: "Meiosis I — Separation of Homologous Chromosomes and the Birth of Genetic Diversity",
        subtitle: "The two sources of diversity created by crossing over in prophase I and random alignment in metaphase I",
        terms: [
          {
            term: "Meiosis",
            def: "A nuclear division in which a diploid (2n) parent cell divides twice in succession to make four haploid (n) daughter cells (gametes). Meiosis I separates homologous chromosomes; meiosis II separates sister chromatids.",
          },
          {
            term: "Crossing over",
            def: "The phenomenon in prophase I, when homologous chromosomes form a tetrad, in which non-sister chromatids exchange DNA segments at chiasmata. It creates new allele combinations, maximizing genetic diversity.",
          },
          {
            term: "Independent assortment",
            def: "The phenomenon in metaphase of meiosis I in which different homologous chromosome pairs align randomly on the equatorial plate. One pair's orientation does not affect another's, making 2ⁿ (n = number of homologous pairs) chromosome combinations possible.",
          },
          {
            term: "Tetrad / Bivalent",
            def: "The four-stranded structure formed in prophase I when two homologous chromosomes, each made of two sister chromatids, pair up. Held together by synapsis, this structure is where crossing over occurs.",
          },
        ],
        traps: [
          "What separates in anaphase I is homologous chromosomes, not sister chromatids. Sister chromatids do not separate until anaphase II. If asked 'what separates in meiosis I vs. meiosis II,' you must distinguish precisely: homologous chromosomes in I, sister chromatids in II.",
          "It is easy to confuse the number of cells produced by meiosis. Spermatogenesis yields 4 functional sperm from 1 parent cell, but oogenesis yields 1 egg and 2–3 polar bodies — only 1 functional gamete. Do not just memorize the numbers; understand why, through the asymmetry of cytokinesis.",
        ],
        example:
          "Let's compute the number of chromosome combinations possible by independent assortment in a human cell (2n = 46). Humans have 23 pairs of homologous chromosomes, so the number of ways to pick one of the two chromosomes from each pair is 2²³ ≈ 8,388,608. Add the new combinations from crossing over and the actual number of possible gamete types is theoretically nearly infinite. At fertilization, when a father's and mother's gametes combine, more than 2²³ × 2²³ = 2⁴⁶ offspring genetic combinations are possible. This is why sexual reproduction is far more powerful than asexual reproduction for genetic diversity.",
      },
      {
        title: "Comparing Meiosis II and Mitosis — Mastering the Decisive Difference",
        subtitle: "Meiosis II looks like mitosis, but its starting cell is already haploid",
        terms: [
          {
            term: "Haploid (n)",
            def: "A cell with only one set of each type of chromosome. The chromosome number of a human gamete is n = 23. It is the final product of meiosis and recovers the diploid state (2n = 46) at fertilization.",
          },
          {
            term: "Synapsis",
            def: "The process in prophase I in which homologous chromosome pairs join precisely like a zipper. A protein structure called the synaptonemal complex holds the two homologs together, and crossing over occurs in this bound state.",
          },
          {
            term: "Fertilization",
            def: "The process in which a haploid sperm (n) and a haploid egg (n) unite to form a diploid zygote (2n). Meiosis halves the chromosome number, and fertilization restores the species' characteristic diploid number.",
          },
        ],
        traps: [
          "Simplifying meiosis II as 'identical to mitosis' is wrong. The starting cell of mitosis is diploid (2n), but the starting cell of meiosis II is already haploid (n). As a result, meiosis II ends with haploid (n) cells while mitosis ends with diploid (2n) cells. The processes look similar, but the chromosome numbers differ.",
        ],
        example:
          "Track a cell with 2n = 4 through both processes to expose the difference. In mitosis, the 2n = 4 parent cell replicates its DNA and divides once, producing two daughter cells that are each still 2n = 4 — full diploid copies for growth and repair. In meiosis, the same 2n = 4 cell replicates once but divides twice: meiosis I separates the two homologous pairs to give two n = 2 cells, and meiosis II then separates the sister chromatids to give four n = 2 gametes. So although meiosis II and mitosis both split sister chromatids and look alike under the microscope, the meiosis II cell enters already haploid (n = 2) and leaves haploid, whereas mitosis enters and leaves diploid (2n = 4).",
      },
    ],
  },
  {
    lessonId: "honors-biology-u3-l2",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 3,
    lessonNum: 2,
    unitName: "Genetics",
    title: "Mendelian Genetics — From Monohybrid to Dihybrid to Sex-Linked Inheritance",
    subtitle: "Mendel's two laws and the Punnett square as a complete toolkit for predicting phenotype and genotype ratios",
    overview:
      "Was Gregor Mendel, who studied seven pea traits for 14 years, lucky or a genius? In truth, both. The seven pea traits he chose happened to all lie on independent chromosomes, cleanly showing independent assortment, and their dominant/recessive relationships were perfectly clear and did not blend. On this fortunate experimental design, Mendel discovered two core laws: the Law of Segregation and the Law of Independent Assortment. In this lesson you will fully master monohybrid and dihybrid crosses with Punnett squares and extend to sex-linked inheritance. About 90% of the genetics problems on exams are solved with these tools.",
    objectives: [
      "Explain the Law of Segregation and the Law of Independent Assortment, connecting them to the mechanism of meiosis",
      "Draw a Punnett square for a monohybrid cross and predict the phenotype and genotype ratios of the F₁ and F₂ generations",
      "Distinguish when independent assortment applies in a dihybrid cross and when it does not (linked genes)",
      "Analyze X-linked inheritance with a sex-linked Punnett square and explain the difference in expression by sex",
      "Solve problems that infer parental genotype from phenotype (including the test cross)",
    ],
    sections: [
      {
        title: "The Law of Segregation and the Monohybrid Cross",
        subtitle: "The principle that a pair of alleles separates during meiosis so each gamete carries one",
        terms: [
          {
            term: "Law of Segregation",
            def: "The law that the two alleles governing a trait separate by meiosis during gamete formation, so each gamete carries one. The physical basis is that when homologous chromosomes separate in meiosis I, each allele goes separately too.",
          },
          {
            term: "Dominant / Recessive",
            def: "A dominant allele (usually capitalized) is expressed in the phenotype even in a heterozygote (Aa); a recessive allele (lowercase) is expressed only when homozygous (aa). Dominant is not 'stronger' or 'better' — it is merely the one expressed in the heterozygous state.",
          },
          {
            term: "Punnett square",
            def: "A table that places the gamete genotypes of both parents along the rows and columns to visually calculate all possible offspring genotype combinations and their ratios. A monohybrid uses a 2×2 grid; a dihybrid uses a 4×4 grid.",
          },
          {
            term: "Test cross",
            def: "An experiment crossing an individual of dominant phenotype but unknown genotype (homozygous AA or heterozygous Aa) with a homozygous recessive (aa) to determine its genotype from offspring ratios. If recessive offspring appear, it is Aa; if none appear, it is presumed AA.",
          },
        ],
        traps: [
          "The 3:1 F₂ phenotype ratio holds only for a monohybrid cross (Aa × Aa) with complete dominance. With incomplete dominance the F₂ shows a 1:2:1 phenotype ratio, and with codominance both phenotypes appear together. Memorizing '3:1 for genetics problems' will fail you on incomplete dominance and codominance problems.",
          "In a dihybrid cross (AaBb × AaBb), the 9:3:3:1 ratio holds only when the two gene pairs lie on different chromosomes and assort independently. If the two genes are linked on the same chromosome, independent assortment breaks down and the ratio deviates. Memorizing 'dihybrid = always 9:3:3:1' will certainly fail you on linkage problems.",
        ],
        example:
          "Take the pea-height trait. The tall allele (T) is dominant, the short allele (t) recessive. What happens when two heterozygous tall peas (Tt) are crossed? Draw the Punnett square: one parent's gametes T, t / the other parent's gametes T, t. Result: TT (1) + Tt (2) + tt (1) = genotype ratio 1:2:1, phenotype ratio tall (TT + Tt) : short (tt) = 3:1. If a pea is tall but its genotype is unknown, a test cross (with tt) tells you: if half the offspring are short the parent is Tt; if all are tall the parent is TT.",
      },
      {
        title: "Sex-Linked Inheritance — The Special Pattern of Traits Carried on the X Chromosome",
        subtitle: "The logic of the hemizygous effect by which X-linked traits appear more often in males",
        terms: [
          {
            term: "Sex determination",
            def: "In humans, sex is determined by the sex chromosomes: female XX, male XY. The SRY gene on the Y chromosome triggers male development. Because a male has only one X chromosome, he is hemizygous for X-linked genes.",
          },
          {
            term: "X-linked inheritance",
            def: "The inheritance pattern of genes on the X chromosome. A male (XY) has only one X, so a single recessive allele appears in his phenotype. Red-green color blindness and hemophilia A are representative X-linked recessive traits.",
          },
          {
            term: "Carrier",
            def: "A term for a heterozygous (XᴬXᵃ) female for an X-linked recessive trait. She has a normal phenotype but carries one recessive allele and passes it to her sons with 50% probability.",
          },
          {
            term: "Barr body",
            def: "A condensed clump of chromatin in the cells of an XX female where one of the two X chromosomes is randomly inactivated. It arises by X-inactivation (lyonization); because a different X is inactivated in each cell, the female is a genetic mosaic. The coat pattern of the calico cat is a representative example.",
          },
        ],
        traps: [
          "In X-linked traits, a father does not pass an X chromosome to his sons. A father passes the Y chromosome to sons and the X chromosome to daughters. So even if a father shows an X-linked trait, his sons do not inherit it directly from him. Understand the structure precisely: not 'color-blind father → color-blind son,' but 'color-blind/carrier mother → 50% color-blind sons.'",
        ],
        example:
          "Let's solve a color-blindness (X-linked recessive) Punnett square. Predict the offspring phenotypes of a color-blind father (XᵇY) and a carrier mother (XᴮXᵇ). Mother's gametes: Xᴮ, Xᵇ / father's gametes: Xᵇ, Y. Result: XᴮXᵇ (normal carrier daughter) + XᵇXᵇ (color-blind daughter) + XᴮY (normal son) + XᵇY (color-blind son). Among daughters, 50% are normal (carriers) and 50% color-blind; among sons, 50% normal and 50% color-blind. Overall 25% of children are color-blind, but note that daughters can be color-blind too — when the father is color-blind and the mother is a carrier, daughters can also be color-blind.",
      },
    ],
  },
  {
    lessonId: "honors-biology-u3-l3",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 3,
    lessonNum: 3,
    unitName: "Genetics",
    title: "Molecular Genetics — DNA Structure, Replication, Transcription, Translation, Mutation",
    subtitle: "The precise mechanisms by which the Central Dogma from DNA to protein is executed at the molecular level",
    overview:
      "Mendel knew that 'hereditary factors' existed but did not know their identity. Eighty years later Watson and Crick revealed the double-helix structure of DNA, and the Central Dogma of molecular biology was born — DNA → RNA → protein. This flow of information determines every trait of life. In this lesson you will fully master the whole molecular mechanism: the double helix and semiconservative replication, transcription that copies genetic information into mRNA, translation that decodes codons into amino acids, and mutation, the error in this process. This is the molecular basis of cancer, genetic disease, and evolution.",
    objectives: [
      "Explain the structural features of the DNA double helix (antiparallel strands, complementary base pairing, sugar-phosphate backbone) at the nucleotide level",
      "Explain why DNA polymerase synthesizes the leading and lagging strands differently in the semiconservative replication model",
      "Explain how RNA polymerase reads the template strand to synthesize pre-mRNA in transcription, and RNA processing (splicing, 5' cap, poly-A tail)",
      "Explain the roles of the ribosome, tRNA, codon, and anticodon in translation, linked to the mechanism of amino acid chain elongation",
    ],
    sections: [
      {
        title: "DNA Structure and Semiconservative Replication",
        subtitle: "The logical necessity by which the complementary structure of the double helix enables accurate replication",
        terms: [
          {
            term: "Nucleotide",
            def: "The monomer of DNA: a five-carbon sugar (deoxyribose) + a phosphate group + a nitrogenous base. Purines: adenine (A), guanine (G); pyrimidines: cytosine (C), thymine (T). RNA uses uracil (U) in place of thymine.",
          },
          {
            term: "Chargaff's rules",
            def: "The complementary base-pairing rules in DNA in which A = T and G = C. A–T pairs form 2 hydrogen bonds; G–C pairs form 3. The higher the G–C content, the more stable the DNA.",
          },
          {
            term: "Semiconservative replication",
            def: "A mode of replication in which the double helix unwinds and each original strand serves as a template for a new strand, so each replicated double helix contains one original strand and one new strand. The Meselson-Stahl experiment proved this with ¹⁵N/¹⁴N labeling.",
          },
          {
            term: "DNA polymerase",
            def: "The enzyme that synthesizes a new DNA strand only in the 5'→3' direction. The leading strand is synthesized continuously toward the replication fork, but the lagging strand can only be synthesized in the opposite direction, making Okazaki fragments discontinuously before joining them.",
          },
        ],
        traps: [
          "Do not confuse 'the direction the template strand is read' with 'the direction the new strand is synthesized.' DNA polymerase reads the template 3'→5' and synthesizes the new strand 5'→3'. The template's 3'→5' and the new strand's 5'→3' are antiparallel — this is the fundamental reason leading and lagging strands arise.",
          "Do not just memorize 'G–C is stronger' for why high G–C content raises the melting temperature (Tm). Because G–C pairs form 3 hydrogen bonds and A–T pairs form 2, higher G–C content means more energy is needed to separate the strands. Understand it as a mechanism so you can apply it to twist problems.",
        ],
        example:
          "Let's follow the logic of the Meselson-Stahl experiment. E. coli is grown in heavy-nitrogen (¹⁵N) medium so all its DNA is labeled with ¹⁵N. Transfer the bacteria to light-nitrogen (¹⁴N) medium and let them replicate once: under semiconservative replication, each double helix should consist of one ¹⁵N strand + one ¹⁴N strand, giving an intermediate (hybrid) weight. Measuring DNA weight by centrifugation (CsCl density gradient) gave exactly one band of intermediate density. After two generations, an intermediate-density band and a light band appeared in a 1:1 ratio. This pattern can be predicted only by the semiconservative model — neither the conservative nor the dispersive model explains it.",
      },
      {
        title: "Transcription, Translation, and Mutation — The Central Dogma and Its Errors",
        subtitle: "The two steps that convert DNA information into an amino acid sequence, and how errors in them change phenotype",
        terms: [
          {
            term: "Transcription",
            def: "The process in which RNA polymerase reads the DNA template strand 3'→5' to synthesize complementary pre-mRNA 5'→3'. In eukaryotes it occurs in the nucleus, and the pre-mRNA undergoes RNA processing — intron removal/exon joining (splicing), a 5' cap, and a 3' poly-A tail — to become mature mRNA.",
          },
          {
            term: "Codon & Translation",
            def: "A codon, a sequence of 3 consecutive mRNA bases, specifies a particular amino acid or a stop signal. Translation is the process in which a ribosome reads mRNA codons and tRNA anticodons bind complementarily to link the corresponding amino acids. The start codon is AUG (methionine); the stop codons are UAA, UAG, UGA.",
          },
          {
            term: "Mutation",
            def: "A permanent change in DNA base sequence. Point mutations include synonymous/silent (no amino acid change), missense (a different amino acid), and nonsense (a premature stop codon). Insertions/deletions (frameshift mutations) shift the reading frame and alter the entire downstream sequence.",
          },
        ],
        traps: [
          "Do not assume a silent (synonymous) mutation always has 'no effect on phenotype.' Even when the genetic code's degeneracy leaves the amino acid unchanged, the codon change can affect mRNA structure, stability, or splice sites, or alter translation speed. At the Honors level, writing 'silent mutation = always phenotypically neutral' can lose marks.",
          "In transcription, the strand RNA polymerase reads is the template strand, and the strand with the same sequence as the mRNA (except T→U) is the non-template (coding/sense) strand. If you swap template and non-template when comparing mRNA sequences you get the exact opposite sequence. When asked to 'write the mRNA from the following DNA sequence,' always first confirm which strand is the template.",
        ],
        example:
          "Let's compare the consequences of point mutations. Suppose the normal mRNA codon …GAG… codes for glutamate (Glu). ① GAG → GAA: the codon changes, but GAA also codes for glutamate — a synonymous mutation, no amino acid change. ② GAG → GTG: GTG codes for valine (Val) — a missense mutation, amino acid changes. This is exactly the GAG→GTG substitution in the hemoglobin β-globin gene of sickle cell anemia, changing Glu to Val. ③ GAG → TAG: TAG is a stop codon — a nonsense mutation, premature termination of protein synthesis. ④ Insert one base before G: all downstream codons shift in a frameshift mutation, and the protein is translated as an entirely different sequence. A single base change can have dramatically different impacts depending on mutation type, so always distinguish by type.",
      },
    ],
  },
];
