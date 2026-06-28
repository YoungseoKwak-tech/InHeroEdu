/**
 * Core Notes English version — Honors Biology Unit 4 (Evolution & Classification).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_BIOLOGY_U4_EN: CoreNote[] = [
  {
    lessonId: "honors-biology-u4-l1",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 4,
    lessonNum: 1,
    unitName: "Evolution & Classification",
    title: "Natural Selection and the Evidence for Evolution",
    subtitle: "The multilayered structure of science by which a principle Darwin found in the Galápagos converges with fossil, anatomical, and molecular proof",
    overview:
      "What Charles Darwin realized over five years sailing the world aboard the Beagle was simple: in a world of limited resources, individuals that survive better leave more offspring, and that advantageous trait spreads through the population across generations. This is the core of natural selection. The reason this principle is not 'just a theory' is that completely independent fields of evidence support it simultaneously. The fossil record shows biological change over time, homologous structures imply common ancestry, and embryological similarities reveal evolutionary relatedness. And molecular biology — comparing DNA and protein sequences — did not even exist in Darwin's day, yet supports natural selection most powerfully. In this lesson you will fully master everything from the four preconditions of natural selection to the logical structure of the five lines of evidence for evolution.",
    objectives: [
      "Explain each of the four preconditions for natural selection (variation, heredity, overproduction, differential survival/reproduction) and analyze how natural selection is affected when one is not met",
      "Distinguish homologous from analogous structures and explain how they are interpreted differently in judging common ancestry",
      "Explain the five types of evidence for evolution — fossil record, comparative anatomy, embryology, biogeography, and molecular evidence — each with an example",
      "Compare and contrast artificial selection, which shares the principle of natural selection but differs in the source of the selection pressure",
      "Define adaptation precisely as a change in frequency across generations at the population level, not an intentional change at the individual level",
    ],
    sections: [
      {
        title: "The Mechanism of Natural Selection — Four Preconditions and Adaptation",
        subtitle: "The logic by which variation, heredity, overproduction, and differential survival mesh to sculpt populations generation by generation",
        terms: [
          {
            term: "Natural selection",
            def: "The process by which, when heritable variation exists among individuals in a population, those with traits favorable for survival and reproduction in that environment leave more offspring, increasing the frequency of that trait across generations. It divides into directional, stabilizing, and disruptive types.",
          },
          {
            term: "Adaptation",
            def: "A genetically determined trait whose frequency has risen in a population through natural selection and that raises fitness in that environment. It must be a heritable variation, not an acquired trait gained during an individual's life. Do not confuse Lamarck's use-and-disuse with Darwin's natural selection.",
          },
          {
            term: "Fitness",
            def: "The relative ability of an individual to survive and achieve reproductive success in a given environment. It is not an absolute measure of 'strong' or 'fast' but is measured by how many viable offspring an individual leaves in that environment. When the environment changes, fitness changes too.",
          },
          {
            term: "Artificial selection",
            def: "Selective breeding in which humans deliberately choose and breed individuals with desired traits. The diversification of dog breeds, crops, and livestock are representative examples. The mechanism is the same as natural selection, but the selection pressure comes from humans rather than the environment.",
          },
        ],
        traps: [
          "Saying 'an individual adapts' in natural selection is wrong. Adaptation happens at the population level across generations. An individual does not change its trait within one generation. 'Giraffes' necks grew longer to reach high leaves' is a Lamarckian error; 'long-necked giraffes survived and reproduced more, raising the frequency of the long-neck trait in the population' is the correct Darwinian statement. On an exam, the choice 'evolution happens to individuals' is wrong.",
          "Do not misunderstand natural selection as making 'better individuals.' Natural selection only raises the frequency of traits that are relatively favorable in the current environment. If the environment changes, a previously favorable trait can become unfavorable. A representative example is antibiotic-resistant bacteria, which can actually grow more slowly in an antibiotic-free environment.",
        ],
        example:
          "Let's analyze directional selection with the peppered moth. In pre-industrial England, light-colored moths were camouflaged against lichen-covered light bark and were rarely eaten by birds (high fitness), while dark moths stood out and were preyed upon (low fitness). The light-colored moth was frequent in the population. After the Industrial Revolution, factory soot blackened the trees and the selection pressure reversed: dark moths were now camouflaged (high fitness) and light moths were preyed upon. Within a few generations the dark moth's frequency rose to over 90% of the population. The key point is that the dark variant existed in the population before the Industrial Revolution — natural selection does not 'create' new variation; it 'selects' among variation already present.",
      },
      {
        title: "Evidence for Evolution — Five Independent Lines of Evidence",
        subtitle: "A convergent argument in which fossil, anatomical, embryonic, geographic, and molecular evidence support common ancestry from different angles",
        terms: [
          {
            term: "Homologous structures",
            def: "Structures derived from a common ancestor that share the same basic structure and arrangement but have diverged in function. The human arm, whale flipper, and bat wing all share the same bone arrangement (humerus, radius, ulna, carpals, phalanges). Used as evidence of common ancestry. Even if outward appearance differs, the same structural origin makes them homologous.",
          },
          {
            term: "Analogous structures",
            def: "Structures that, without a common ancestor, independently came to share a similar function under similar environmental pressures. A bird's wing and an insect's wing share a function (flight) but differ in structural and developmental origin, so they do not support common ancestry. This is called convergent evolution.",
          },
          {
            term: "Vestigial structures",
            def: "Structures that functioned in a common ancestor but are nonfunctional or reduced in present-day organisms. Examples include the human coccyx, ear muscles, and wisdom teeth, the vestigial pelvic bones of whales, and the wing bones of flightless birds. They are evidence of a prior evolutionary history.",
          },
        ],
        traps: [
          "Confusing homologous and analogous structures completely reverses your judgment of common ancestry. Homologous = same structural origin = supports common ancestry. Analogous = similar function but different origin = does not support common ancestry. A bat's and a butterfly's wings are both for flight but differ in origin, so they are analogous. By contrast, a bat's wing and a human arm look entirely different but derive from the same bone structure, so they are homologous.",
          "Do not misunderstand molecular evidence (DNA/protein sequence similarity) as 'less important because it is the most recently developed.' On the contrary, molecular evidence is the most powerful convergent evidence precisely because, though developed independently of morphological evidence, it supports the same evolutionary relationships. It has been experimentally confirmed that cytochrome c protein sequences are more similar the more closely related the organisms.",
        ],
        example:
          "Let's see how the five lines of evolutionary evidence converge to support the land-mammal origin of whales. ① Fossil record: Pakicetus (~50 million years ago) was a legged land mammal, and intermediate fossils such as Rodhocetus and Ambulocetus show the land-to-water transition. ② Homologous structures: a whale's flipper contains finger bones (phalanges) inside. ③ Vestigial structures: whales retain vestigial pelvic girdle bones in the body. ④ Embryology: whale embryos briefly form hind-limb buds early in development, then they regress. ⑤ Molecular evidence: whale DNA sequences are most similar to the hippopotamus, supporting a lineage branching from the even-toed ungulates. Five lines of evidence from completely different fields all point to the same conclusion.",
      },
    ],
  },
  {
    lessonId: "honors-biology-u4-l2",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 4,
    lessonNum: 2,
    unitName: "Evolution & Classification",
    title: "Mechanisms of Evolution — Genetic Drift, Gene Flow, Hardy-Weinberg, Speciation",
    subtitle: "The five engines of evolution revealed by population genetics, and the boundary conditions under which a new species is born",
    overview:
      "Darwin's natural selection is the heart of evolution but is not the only mechanism. Population genetics analyzes mathematically how and why allele frequencies in a population change. And remarkably, the most powerful tool for studying evolution is the Hardy-Weinberg equilibrium, which first defines the conditions under which evolution does NOT happen. Just as you must assume a frictionless ideal surface to measure the real effect of friction, you must define an ideal non-evolving population to measure the real forces of evolution. In this lesson we cover the five conditions of Hardy-Weinberg equilibrium, the four mechanisms that break it (natural selection, mutation, genetic drift, gene flow), and the process of speciation by which a new species arises.",
    objectives: [
      "List the five conditions of Hardy-Weinberg equilibrium and match which evolutionary mechanism operates when each is broken",
      "Distinguish the two types of genetic drift — the bottleneck effect and the founder effect — and explain their genetic consequences",
      "Explain that gene flow acts to homogenize allele frequencies between two populations and connect this to speciation",
      "Explain the mechanistic difference between allopatric and sympatric speciation based on whether geographic isolation is present",
    ],
    sections: [
      {
        title: "Hardy-Weinberg Equilibrium — The Zero-Point Model of Evolution",
        subtitle: "The mathematical baseline at which allele frequencies stay constant across generations only when all five conditions are perfectly met",
        terms: [
          {
            term: "Hardy-Weinberg equilibrium",
            def: "An equilibrium state in which allele frequencies (p, q) and genotype frequencies (p², 2pq, q²) stay constant across generations when a population meets all five conditions: (1) random mating, (2) no natural selection, (3) no mutation, (4) no gene flow, and (5) a sufficiently large population. If this equilibrium is broken, evolution is occurring.",
          },
          {
            term: "Hardy-Weinberg equations",
            def: "The two equations p + q = 1 (sum of allele frequencies) and p² + 2pq + q² = 1 (sum of genotype frequencies). p = dominant allele frequency, q = recessive, p² = homozygous dominant, 2pq = heterozygous, q² = homozygous recessive. From the observed q² (the measurable recessive homozygote fraction) find q, then p = 1 − q gives the rest.",
          },
          {
            term: "Genetic drift",
            def: "The unpredictable change in allele frequency by random events in a population that is not large enough. Unlike natural selection it has no direction; its effect is greater in smaller populations and it tends to reduce genetic diversity. The bottleneck effect and the founder effect are its representative forms.",
          },
          {
            term: "Gene flow",
            def: "The movement of alleles from one population to another as individuals or gametes (including pollen and spores) move between populations. The more active the gene flow, the more similar (homogenized) the allele frequencies; the more it is blocked, the more independently the two populations evolve, raising the chance of speciation.",
          },
        ],
        traps: [
          "In the Hardy-Weinberg equation, q² is the directly observable fraction of recessive homozygous individuals by phenotype. If a problem states '90 of 1000 show the recessive phenotype,' compute q² = 90/1000 = 0.09, q = 0.3, p = 0.7 in order. Then carriers (heterozygous, 2pq) = 2 × 0.7 × 0.3 = 0.42, i.e., 420 of 1000. The key insight of this equation is that a large fraction of phenotypically normal people carry the recessive allele.",
          "There is a misconception that genetic drift 'removes unfavorable alleles.' Because genetic drift has no direction, a favorable allele can be lost by chance in a small population and an unfavorable allele can be fixed by chance. The key point is that it can act opposite to the direction natural selection works.",
        ],
        example:
          "Cystic fibrosis is a recessive genetic disease. If 1 in 2500 people in a population has cystic fibrosis, let's find the carrier frequency with the Hardy-Weinberg equation. q² = 1/2500 = 0.0004, q = √0.0004 = 0.02, p = 1 − 0.02 = 0.98. Carriers (Aa, 2pq) = 2 × 0.98 × 0.02 = 0.0392, about 3.9%. That is, roughly 1 in 25 in this population is a carrier. There are 100 times more carriers (1 in 25) than patients (1 in 2500). This is why recessive genetic diseases persist in populations more easily than expected — most recessive alleles 'hide' in carriers and escape the pressure of natural selection.",
      },
      {
        title: "Speciation — How Blocking Gene Flow Creates New Species",
        subtitle: "The two routes by which geographic isolation (allopatric) and reproductive isolation (sympatric) create species boundaries",
        terms: [
          {
            term: "Species",
            def: "By the biological species concept, a group of individuals that can interbreed under natural conditions to produce fertile offspring. A mule is a horse–donkey cross but is sterile, so they are not the same species. Note this definition is hard to apply to asexual organisms or fossil comparisons.",
          },
          {
            term: "Allopatric speciation",
            def: "The process in which a geographic barrier (mountain range, sea, river) splits one population into two, and each evolves independently with gene flow blocked, diverging into reproductively isolated separate species. Galápagos finches are a representative example.",
          },
          {
            term: "Sympatric speciation",
            def: "The process in which reproductive isolation arises first in the same region without geographic isolation, producing speciation. Polyploidy in plants is a representative mechanism — a sudden doubling of chromosome number makes the new form unable to interbreed with the original. It is far more common in plants than in animals.",
          },
        ],
        traps: [
          "In speciation, 'reproductive isolation' does not immediately mean 'completion of a new species.' Speciation is a continuous process over thousands to millions of generations. It begins with reduced gene flow between two populations and progresses as prezygotic (habitat, temporal, behavioral, mechanical, gametic isolation) or postzygotic (hybrid sterility, hybrid breakdown) barriers accumulate. The simplification 'isolated = instant new species' is wrong.",
          "Sympatric speciation by polyploidy can occur in an instant from a single event (chromosomal nondisjunction). In plants, when a tetraploid (4n) crosses with the diploid (2n) parent population, the 3n hybrid is sterile because meiosis is irregular — so the tetraploid is reproductively isolated from the diploid population. This is the only well-known mechanism by which sympatric speciation can occur 'in a single generation.'",
        ],
        example:
          "Let's analyze the allopatric speciation of Darwin's finches step by step. ① About 2–3 million years ago, one type of finch population migrated from the South American mainland to the Galápagos Islands. ② Because the islands are far apart, gene flow between island populations was blocked. ③ Different natural selection acted according to each island's environment (food type, presence of competitors), and genetic drift also strongly affected the small island populations. ④ Each population evolved independently, diverging in beak shape and size — large, hard beaks for cracking seeds; slender, long beaks for sipping nectar from cactus flowers; pointed beaks for catching insects. ⑤ After enough time, when some populations dispersed to other islands, their behavior, morphology, and breeding timing had already diverged so that interbreeding did not occur — speciation was complete. The Galápagos today have 14 species of Darwin's finches, all derived from one common ancestor.",
      },
    ],
  },
  {
    lessonId: "honors-biology-u4-l3",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 4,
    lessonNum: 3,
    unitName: "Evolution & Classification",
    title: "Taxonomy and Phylogeny — The Science of Drawing the Tree of Life",
    subtitle: "From Linnaeus's binomial nomenclature to the three-domain system, the logic by which a cladogram visualizes common ancestry",
    overview:
      "How do we organize millions of species? In the 18th century, Sweden's Carl Linnaeus solved this with binomial nomenclature and a hierarchical taxonomy. But because Linnaeus's system was based on morphological similarity, it did not necessarily reflect evolutionary relationships. As molecular biology advanced and DNA-sequence comparison became possible, classification shifted paradigm completely — from 'what does it look like?' to 'which common ancestor does it share?' Phylogenetics and cladistics are that methodology. In this lesson you will complete the hierarchy of biological classification, how to read phylogenetic trees and cladograms, and the three-domain system born from the rediscovery of the Archaea.",
    objectives: [
      "List Linnaeus's hierarchical classification (domain, kingdom, phylum, class, order, family, genus, species) in order and explain the rules of binomial nomenclature",
      "Identify the common ancestor, node, and derived character (synapomorphy) in a cladogram and judge the relatedness of two taxa",
      "Explain how morphological features and molecular evidence (DNA-sequence similarity) are used to construct a cladogram",
      "Explain the basis on which Carl Woese's rRNA analysis reorganized the old five-kingdom system into the three-domain (Bacteria, Archaea, Eukarya) system",
    ],
    sections: [
      {
        title: "Classification and Binomial Nomenclature — The Address System Linnaeus Designed for Life",
        subtitle: "The logic of hierarchical classification, the rules of scientific naming, and how to read relatedness at the species level",
        terms: [
          {
            term: "Taxonomic hierarchy",
            def: "The hierarchical structure of biological classification established by Linnaeus, narrowing in order: Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species. The more taxonomic ranks two organisms share, the closer their phylogenetic relationship. You must memorize the order.",
          },
          {
            term: "Binomial nomenclature",
            def: "A system that gives every species a two-word scientific name in Latin or Latinized form: a genus name (capitalized) and a species epithet (lowercase). E.g., humans are Homo sapiens, lions Panthera leo. It is italicized in print and underlined when handwritten. The same scientific name is used everywhere in the world.",
          },
          {
            term: "Phylogenetic tree",
            def: "A diagram that visualizes evolutionary history and relatedness as branches. A node represents a common ancestor; a tip (leaf) represents a present-day organism or taxon. The more recent the node where two branches meet, the closer the common ancestor and the tighter the relationship.",
          },
          {
            term: "Monophyletic group / Clade",
            def: "A natural group consisting of one common ancestor and all its descendants. In cladistics, only monophyletic groups (clades) are valid taxonomic units. Reptilia traditionally excluded Aves (birds), making it a paraphyletic rather than monophyletic group; modern classification includes birds within reptiles.",
          },
        ],
        traps: [
          "In binomial nomenclature, the genus begins with a capital letter and the species epithet with a lowercase letter. The species epithet is never written alone — it must accompany the genus. In Homo sapiens you cannot write 'sapiens' alone. Also, after the first mention you may abbreviate the genus, as in H. sapiens. Naming errors (capitalization, italics, omitting the genus) are mark-losing points on exams.",
          "Many students misread a cladogram as 'the species whose tip is farther to the right evolved more recently.' What matters is the branching order (which node represents the older common ancestor); the left/right position of a tip is unrelated to the timing of evolution. Judge the relatedness of two taxa by 'how many nodes you must pass through to reach a shared one' — fewer nodes means closer relatedness.",
        ],
        example:
          "Let's practice reading relatedness from a cladogram. Draw a tree of human (Homo sapiens), chimpanzee (Pan troglodytes), gorilla (Gorilla gorilla), and gibbon (Hylobates lar). Node analysis: ① the gibbon branches off first (shares the oldest common ancestor). ② Next the gorilla diverges. ③ Finally human and chimpanzee split (about 6–7 million years ago). So the human's closest relative is the chimpanzee — because the number of nodes to reach the shared one is fewest. DNA-sequence comparison also shows human–chimpanzee similarity is highest at about 98–99%. This is a powerful case where morphology-based and molecule-based classification agree.",
      },
      {
        title: "The Three-Domain System — How the rRNA Revolution Changed the Grand Classification of Life",
        subtitle: "The rediscovery of the Archaea and the endosymbiosis theory that explains the birth of eukaryotes",
        terms: [
          {
            term: "Three domains",
            def: "The highest classification of life proposed by Carl Woese in the 1970s–80s based on ribosomal RNA (rRNA) sequence comparison: Bacteria, Archaea, and Eukarya. Unlike the old five-kingdom system that lumped prokaryotes together, it revealed that bacteria and archaea differ fundamentally at the molecular level.",
          },
          {
            term: "Archaea",
            def: "Prokaryotes that mainly inhabit extreme environments (hydrothermal vents, salt lakes, anaerobic environments) but are also found in ordinary environments. Like bacteria they lack a nuclear envelope, but in cell-wall composition (no peptidoglycan), rRNA sequence, and gene-expression machinery they are closer to eukaryotes than to bacteria. This is the core basis for the three-domain system.",
          },
          {
            term: "Endosymbiotic theory",
            def: "A theory proposed by Lynn Margulis that the mitochondria of eukaryotic cells originated as ancient bacteria taken up by a host cell and established as a symbiotic relationship. Chloroplasts likewise derive from photosynthetic bacteria (cyanobacteria). Evidence supporting it: mitochondria and chloroplasts have their own DNA, ribosomes, and double membranes and reproduce by binary fission.",
          },
        ],
        traps: [
          "The misconception that Archaea live only in extreme environments is wrong. Archaea were first found in hydrothermal vents and hypersaline lakes and were known as 'extremophiles,' but they are now found widely in ordinary environments such as soil, the ocean, and the human gut. The importance of Archaea lies not in their habitat but in their molecular characteristics (intermediate between bacteria and eukaryotes).",
          "Do not just memorize the origin of mitochondria and chloroplasts as 'a bacterium got in.' You must know the concrete supporting evidence: ① mitochondria/chloroplasts have their own circular DNA (nuclear DNA is linear); ② they have 70S (bacterial-type) ribosomes (the rest of the eukaryote is 80S); ③ they have a double membrane (formed when a bacterium is engulfed by phagocytosis); ④ they reproduce independently by binary fission. Remember these four as a set.",
        ],
        example:
          "Let's connect the three-domain classification with the origin of eukaryotes. By rRNA-sequence comparison, eukaryotes (Eukarya) are more closely related to Archaea. That is, the 'nuclear genome' of eukaryotes appears to derive from the archaeal lineage. Yet the mitochondria of eukaryotes came from the Bacteria lineage through endosymbiosis. So the present eukaryotic cell has a 'chimeric' character: an archaeal-lineage host cell + a bacterial-lineage symbiont (→ mitochondria). This is why eukaryotic rRNA sequences resemble Archaea while mitochondrial DNA is closer to bacteria. This insight, where phylogenetics and cell biology intersect, is one of the conceptually deepest topics in Honors Biology.",
      },
    ],
  },
];
