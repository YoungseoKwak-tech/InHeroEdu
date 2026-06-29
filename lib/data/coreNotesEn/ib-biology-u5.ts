/**
 * Core Notes English version — IB Biology Unit 5 (Evolution & Biodiversity).
 * Faithful translation of the Korean storytelling original.
 * All objectives, terms, traps, and examples preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-biology-u5-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 5,
    lessonNum: 1,
    unitName: "Evolution & Biodiversity",
    title: "Evidence for Evolution — Reading the History of Life Through Fossils, Selective Breeding, and Homologous Structures",
    subtitle: "Evolution is not a 'theory' but a scientific fact built on multiple layers of evidence — and you must prove it with data",
    overview:
      "Evolution is the process by which the allele frequencies of a population change across generations. In IB Topic 5 you first confirm the multiple lines of evidence that evolution has actually occurred, and only then study natural selection as the mechanism behind it. The three pillars of evidence are the fossil record, selective breeding, and homologous structures. Fossils show that the form of organisms has changed gradually over time; selective breeding demonstrates that humans can strengthen desired traits within a few hundred generations, proving that comparable change is possible in nature. Homologous structures — the fact that limbs serving entirely different functions still share the same underlying bone arrangement (e.g. the human arm, the bird wing, the whale flipper, the horse foreleg) — provide powerful support for the existence of a common ancestor. IB does not stop at describing each line of evidence in isolation; it requires you to articulate the logical link by which each line of evidence supports the occurrence of evolution.",
    objectives: [
      "Explain why the fossil record is evidence for evolution by linking temporal continuity (the dating of rock strata) with changes in form",
      "Explain the principle of selective breeding (selective breeding / artificial selection) and argue why it is evidence supporting the possibility of evolution by natural selection",
      "Distinguish homologous structures from analogous structures, and explain why homologous structures are evidence for the existence of a common ancestor",
      "Present vestigial structures as evidence for evolution, and explain them using specific examples (e.g. the human coccyx and wisdom teeth, the whale's pelvic bones)",
    ],
    sections: [
      {
        title: "The Fossil Record and Selective Breeding — Witness of Time and Artificial Experiment",
        subtitle: "Rock strata are the calendar of life, and selective breeding is evolution reproduced in the laboratory",
        terms: [
          {
            term: "Fossil record",
            def: "The totality of organic remains, traces, and chemical residues preserved within rock strata. The deeper (older) the stratum, the more primitive the forms of organisms that appear, allowing changes in form to be traced through temporal continuity. The fossil series of the horse (Hyracotherium → Merychippus → Equus) is a textbook example, showing the reduction of toe number from 4 → 3 → 1 and an increase in body size in the order of the strata.",
          },
          {
            term: "Selective breeding (Artificial selection)",
            def: "A method in which humans select and mate individuals possessing a desired phenotype. Within a few hundred generations it can produce breeds that differ greatly from their wild ancestor (e.g. wild wolf → Chihuahua and Great Dane; wild cabbage → kale, broccoli, cauliflower). This directly demonstrates that rapid changes in form are possible through artificial selection pressure alone, and provides an analogy that the same principle operates in nature.",
          },
          {
            term: "Vestigial structure",
            def: "A structure whose function has been reduced or lost during the course of evolution. It now has little or no clear function but is a morphological remnant that was functional in an ancestor. Examples: the human coccyx (the remnant of a tail bone), the pelvic and hindlimb bones of whales (traces of a terrestrial ancestor), the pelvic bones of snakes, and the wing bones of flightless birds. The fact that the structure remains without function supports the idea that the organism descended with modification from a common ancestor.",
          },
        ],
        traps: [
          "Do not misinterpret the incompleteness of the fossil record as evidence against evolution. Fossilisation is a very rare event (requiring conditions such as rapid sedimentation, anaerobic environments, and hard structures), so not every organism can be preserved as a fossil. In IB you must explain the 'gaps' in the fossil record by the rarity of fossilisation; the logic that 'a gap = evolution did not occur' is scientifically wrong.",
          "Describing selective breeding simply as 'mating' earns only partial marks. IB mark schemes require that you include three steps: ① selecting individuals with the desired phenotype, ② repeated selective mating over generations, and ③ an increase in the frequency of a particular allele.",
        ],
        example:
          "An applied example of selective breeding. Wild cabbage (Brassica oleracea) diverged from a single species, through human selection, into entirely different vegetables.\n\n· Selecting for large leaves → kale\n· Selecting for large stems and flower buds → broccoli\n· Selecting for tightly packed axillary buds → Brussels sprouts\n· Selecting for the inflorescence → cauliflower\n\nAll of these vegetables split from the same ancestral species within just a few thousand years. In IB Paper 2 this case is presented and you are asked to discuss 'how artificial selection can generate species-level diversity of form.'",
      },
      {
        title: "Homologous Structures and Common Ancestry — The Bone Arrangement Is the Same Even When the Function Differs",
        subtitle: "The fact that arm, wing, and flipper all started from the same blueprint is decisive evidence for evolution",
        terms: [
          {
            term: "Homologous structures",
            def: "Organs in different species whose function has diverged but whose embryological origin and basic skeletal structure are identical. Example: the human arm (grasping), the bird wing (flight), the whale flipper (swimming), the bat wing membrane (flight), and the horse foreleg (running) all share the same arrangement of humerus, radius, ulna, carpals, and phalanges. The commonality of structure is evidence of descent from a common ancestor.",
          },
          {
            term: "Analogous structures",
            def: "Structures with different embryological origins that have undergone convergent evolution to perform a similar function. Example: the bird wing (modified forelimb) and the insect wing (originating from outgrowths of the body wall); the whale flipper and the shark pectoral fin. Their function is the same but their structural origin differs, so they are not evidence of a common ancestor.",
          },
          {
            term: "Convergent evolution",
            def: "The phenomenon in which organisms of different lineages independently evolve similar phenotypes under similar environmental selection pressures. Example: the marsupial mole of Oceania and the placental mole of the Northern Hemisphere are very similar in body form due to adaptation to a subterranean life, yet are far apart on the phylogenetic tree. The structures produced by convergent evolution are analogous structures.",
          },
        ],
        traps: [
          "Homologous and analogous structures are the pair of concepts most frequently confused in IB exams. The key distinction: homologous = same origin, function may differ (evidence of a common ancestor); analogous = similar function but different origin (convergent evolution, not evidence of a common ancestor). Writing something like 'the bird wing and the insect wing are homologous structures' results in an immediate loss of marks.",
          "When explaining homologous structures, writing 'because the structure is the same, the function is the same' is incorrect. The essence of homologous structures is that the basic skeletal pattern is conserved despite the function having diverged, and it is from this difference that the evidence of evolutionary modification emerges.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u5-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 5,
    lessonNum: 2,
    unitName: "Evolution & Biodiversity",
    title: "Natural Selection — The Engine of Evolution Driven by Variation, Overproduction, and Differential Survival",
    subtitle: "The mechanism Darwin uncovered: when the individuals that survive change, the population of the next generation changes too",
    overview:
      "Natural selection is the central mechanism by which evolution occurs. The logic Darwin proposed consists of four observations and two inferences: ① heritable variation exists among the individuals in a population, ② populations produce more offspring than the environment can support (overproduction), ③ competition arises among individuals over resources, and ④ individuals carrying variations better suited to the environment have an advantage in survival and reproduction (differential survival and reproduction). As a result, the frequency of alleles governing the favourable traits increases across generations. IB requires you to apply this logical structure to real-world cases such as antibiotic resistance in bacteria or industrial melanism in Biston betularia, and to write out a complete explanation.",
    objectives: [
      "Explain the four prerequisites of natural selection (heritable variation, overproduction, struggle for survival, differential survival and reproduction) in order, and argue why each condition is essential",
      "Explain the emergence and spread of antibiotic resistance step by step using the mechanism of natural selection",
      "Explain that natural selection does not change individuals but changes the allele frequencies of the population",
      "Explain the difference between directional selection, stabilising selection, and disruptive selection using phenotype-frequency distribution graphs, and link them to real examples",
    ],
    sections: [
      {
        title: "The Logical Structure of Natural Selection — The Four Steps of Darwin's Argument",
        subtitle: "Without variation there is no selection, and without inheritance there is no evolution",
        terms: [
          {
            term: "Heritable variation",
            def: "Phenotypic differences among individuals in a population that are determined by DNA sequence (genotype) and can therefore be transmitted to offspring. The sources of heritable variation are mutation, crossing over during meiosis, independent assortment, and the recombination of alleles through sexual reproduction. Non-heritable phenotypic changes caused by the environment (e.g. muscle built up through exercise) are not subject to natural selection.",
          },
          {
            term: "Overproduction (Reproductive excess)",
            def: "Populations produce far more offspring than the carrying capacity of the environment. Example: a single pair of oysters lays millions of eggs, but most never reach adulthood. This overproduction is the premise that generates competition (the struggle for existence) among individuals over resources (food, space, mates).",
          },
          {
            term: "Differential survival and reproduction",
            def: "Because of heritable variation, under particular environmental conditions some individuals survive and leave more offspring than others. This is the difference in 'fitness.' The favourable alleles of high-fitness individuals increase in frequency within the population, while unfavourable alleles decrease. When this process is repeated, the phenotypic distribution of the whole population shifts — evolution occurs.",
          },
          {
            term: "Selection pressure",
            def: "An environmental factor that makes a particular phenotype favourable or unfavourable. Predators, pathogens, climate, food availability, and mate choice all act as selection pressures. The stronger and more sustained the selection pressure, the faster the population's allele frequencies change.",
          },
        ],
        traps: [
          "Natural selection does not change individual organisms. An individual's genotype is determined at birth and does not change over its lifetime. Natural selection changes allele frequencies at the level of the population through which genotypes reproduce more successfully. Writing 'when environment X arose, the organism generated variation to suit X' is Lamarckian thinking and is penalised immediately in IB.",
          "You must distinguish heritable variation from environmentally caused phenotypic change. If plants of the same genotype grow larger in a brightly lit location, this is phenotypic plasticity and does not provide raw material for natural selection. Natural selection acts only on heritable variation.",
        ],
        example:
          "An applied example of the mechanism of natural selection — antibiotic-resistant bacteria.\n\n① Within a bacterial population, random mutation produces a tiny minority of variants able to break down or evade a particular antibiotic (heritable variation).\n② When the antibiotic is administered, bacteria die or stop replicating, but individuals carrying the resistance variant survive (selection pressure → differential survival).\n③ The surviving resistant bacteria divide rapidly and spread the resistance allele (reproduction, increase in allele frequency).\n④ After a few generations, most of the population is resistant.\n\nIn IB Paper 2 this scenario is presented and you are asked to discuss 'whether or not this is evolution, and by what mechanism it is explained.' Key point: the antibiotic did not create new variation — it selected variation that already existed.",
      },
      {
        title: "The Three Patterns of Selection — How the Phenotype Distribution Shifts",
        subtitle: "Will selection push the centre of the distribution, one tail, or both tails?",
        terms: [
          {
            term: "Directional selection",
            def: "Selection in which one extreme of the phenotype distribution becomes favourable and the mean shifts in one direction. It is common when selection pressures change or when populations migrate to a new environment. Example: industrial melanism in the peppered moth (Biston betularia) — after the Industrial Revolution, on bark blackened by soot, the dark form (carbonaria) had a higher rate of avoiding predation, so its proportion in the population increased.",
          },
          {
            term: "Stabilising selection",
            def: "Selection in which both extremes of the phenotype distribution are unfavourable and intermediate values are favourable, so the variance of the distribution decreases. It occurs when the environment is stable and maintains the phenotype around the current optimum. Example: human birth weight — newborns that are too light or too heavy have higher mortality, and intermediate birth weight (about 3–4 kg) is most favourable for survival.",
          },
          {
            term: "Disruptive selection",
            def: "Selection in which intermediate values of the phenotype distribution are unfavourable and both extremes are favourable, forming a two-peaked, bimodal distribution. Taken to an extreme, the two groups may occupy different ecological niches and become precursors to speciation. Example: bill size in the African seed-cracking finch (Pyrenestes ostrinus) — the two extreme bills specialised for either large or small seeds are favoured over an intermediate bill.",
          },
        ],
        traps: [
          "Confusing stabilising selection with directional selection is a common error. In stabilising selection the mean of the population does not change and only the variance decreases; in directional selection the mean itself shifts. Interpreting the newborn birth-weight case as 'larger babies are more favourable, so weight evolves to increase' is incorrect — both extremes are unfavourable, so it is stabilising selection.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u5-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 5,
    lessonNum: 3,
    unitName: "Evolution & Biodiversity",
    title: "Classification and Cladistics — Reading the Tree of Life Through Binomial Nomenclature, Taxonomic Hierarchy, and Cladograms",
    subtitle: "The goal of modern taxonomy is not to assign names but to reveal evolutionary relationships",
    overview:
      "Taxonomy is the discipline that organises the diversity of organisms systematically so that we can understand and communicate about it. Binomial nomenclature, introduced by Linnaeus in the 18th century, is still the common language used by scientists worldwide today. Traditional classification has used a seven-level hierarchy — Kingdom, Phylum, Class, Order, Family, Genus, Species — based on morphological and physiological similarity. Modern phylogenetics, however, constructs cladograms that represent evolutionary common-ancestry relationships through DNA sequences, protein sequences, and embryological evidence, and this cladistic approach occupies an important place in the IB course. The three-domain system proposed by Woese (Bacteria, Archaea, Eukarya) is also a representative case of evidence-based reconstruction, replacing the older five-kingdom classification through rRNA analysis. IB requires you to interpret cladograms in practice, to infer a cladogram from a given pattern of shared characters, and to explain the evidence for the three-domain system.",
    objectives: [
      "Explain the rules of binomial nomenclature (italics, Latin, capitalised genus name, lowercase specific epithet), and explain the number of shared characters and the relationships among levels of the taxonomic hierarchy (Kingdom, Phylum, Class, Order, Family, Genus, Species)",
      "Interpret a cladogram to find the most recent common ancestor of two taxa, and define a clade",
      "Construct a simple cladogram using shared derived characters (synapomorphies), or infer evolutionary relationships from a given cladogram",
      "Explain the rRNA-sequence evidence that led the three-domain system (Bacteria, Archaea, Eukarya) to replace the older five-kingdom system",
    ],
    sections: [
      {
        title: "Binomial Nomenclature and the Taxonomic Hierarchy — A Common Language and a Map of Diversity",
        subtitle: "Why two words — genus name + specific epithet — point to the same organism anywhere on Earth",
        terms: [
          {
            term: "Binomial nomenclature",
            def: "The system of assigning each species a scientific name composed of two words — the genus name and the specific epithet. Rules: ① use Latin or Latinised names, ② capitalise the first letter of the genus name and keep the specific epithet lowercase, ③ use italics in print and underline when handwritten. Example: modern humans are Homo sapiens (genus: Homo, specific epithet: sapiens). Binomial nomenclature eliminates the confusion of common names that differ between countries and standardises scientific communication.",
          },
          {
            term: "Taxonomic hierarchy",
            def: "Domain/Kingdom → Phylum → Class → Order → Family → Genus → Species. The lower the level (the closer to species), the more characters are shared and the more recent the common ancestor. IB also covers the eight-level system with the addition of the domain, and you must guard against the misconception that 'if the genus is the same, the species is the same.'",
          },
          {
            term: "Species",
            def: "The basic unit of biological classification. According to the biological species concept, a group of individuals that can interbreed in the wild and produce fertile offspring. The mule (horse × donkey) can be produced by crossing, but its offspring are sterile, so the horse and the donkey are separate species. However, this definition is difficult to apply to asexually reproducing organisms — a limitation.",
          },
        ],
        traps: [
          "In binomial nomenclature only the genus name begins with a capital letter, and the specific epithet must always be lowercase. Writing both words capitalised, as in Homo Sapiens, loses marks immediately. The scientific name must also be written in italics (or underlined when handwritten), and using the specific epithet alone is not correct notation.",
          "Misremembering the order of the taxonomic hierarchy is a common error. Remember the principle that 'the lower the level, the fewer the members and the more characters they share.' Mnemonic: King Philip Came Over For Good Soup (Kingdom, Phylum, Class, Order, Family, Genus, Species).",
        ],
        example:
          "An applied example of the taxonomic hierarchy — comparing the classification of human and chimpanzee.\n\n| Level | Human | Chimpanzee |\n|------|------------|-------------------|\n| Domain | Eukarya | Eukarya |\n| Kingdom | Animalia | Animalia |\n| Phylum | Chordata | Chordata |\n| Class | Mammalia | Mammalia |\n| Order | Primates | Primates |\n| Family | Hominidae | Hominidae |\n| Genus | Homo | Pan |\n| Species | Homo sapiens | Pan troglodytes |\n\nThey belong to the same taxon up to Order and share the classification down to the Family level. IB presents this table and asks 'what is the last shared classification level of human and chimpanzee' (answer: Family Hominidae).",
      },
      {
        title: "Cladograms and the Three-Domain System — Cladistics and the Revolution in Modern Classification",
        subtitle: "rRNA sequences revealed the three roots of life — Bacteria, Archaea, and Eukarya",
        terms: [
          {
            term: "Cladogram",
            def: "A type of phylogenetic tree that represents the evolutionary relationships among taxa as a branching pattern based on shared derived characters (synapomorphies). A node represents the most recent common ancestor, and a terminal taxon (branch tip) is a living or fossil taxon. By finding the closest branching point that two taxa share on a cladogram, you can identify their most recent common ancestor (MRCA).",
          },
          {
            term: "Clade (Monophyletic group)",
            def: "A group that includes a common ancestor and all of the descendants derived from that ancestor. On a cladogram, cutting off all the branches below a particular node yields a single clade. IB asks questions in which you must correctly identify clades on a given cladogram and judge whether particular taxa belong to the same clade.",
          },
          {
            term: "Three-domain system",
            def: "The highest-level classification system proposed by Woese and Fox (1977) on the basis of comparing rRNA (ribosomal RNA) sequences. It divides life into three domains — Bacteria, Archaea, and Eukarya. The key change is splitting the prokaryotes of the older five-kingdom classification into Bacteria and Archaea; Archaea appear morphologically similar to Bacteria but are closer to Eukarya in their rRNA sequences, membrane lipids, and RNA-polymerase structure.",
          },
          {
            term: "Synapomorphy (Shared derived character)",
            def: "A derived character that a particular group of taxa newly evolved in a common ancestor and shares. It forms the basis for constructing cladograms. Example: the vertebra is a derived character shared by the entire vertebrate clade, and fur is a derived character shared by the mammal clade. Unlike an ancestral character (plesiomorphy), a derived character supports the monophyly of a particular clade.",
          },
        ],
        traps: [
          "On a cladogram, the length of a branch does not represent evolutionary distance (time or amount of change) unless specifically indicated. IB cladograms show topological relationships only — that is, which taxon shares a more recent common ancestor with which other taxon. Interpreting 'a longer branch = more change' is incorrect.",
          "In the three-domain system, you must remember that Archaea are closer to Eukarya than to Bacteria. rRNA-sequence analysis shows a structure in which Archaea and Eukarya first share a common ancestor and Bacteria then branch off. Writing 'Bacteria and Archaea are both prokaryotes, so they belong to the same domain' is immediately incorrect.",
        ],
        example:
          "An example of cladogram interpretation. Consider the following simple cladogram:\n\n· (((human, chimpanzee), gorilla), orangutan)\n\nThe relationships that can be read from this cladogram:\n① Human and chimpanzee share the closest branching point (MRCA1) → these two are the closest relatives\n② MRCA1 + gorilla share MRCA2 → the gorilla is the next closest relative after human and chimpanzee\n③ The orangutan shares MRCA3 with all the rest → the most distant relative\n\nIn IB Paper 2 you are given a real table of character data (e.g. presence of fur, presence of a placenta, brain-volume category) and asked to construct a cladogram from it, or conversely to read a cladogram and describe the relationship of two species. Key point: the more recent the MRCA of two taxa (the lower the branching point on the cladogram), the closer the relatives.",
      },
    ],
  },
];
