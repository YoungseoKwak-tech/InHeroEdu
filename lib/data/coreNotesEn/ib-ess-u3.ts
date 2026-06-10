/**
 * Core Notes English version — IB ESS Unit 3 (3.1–3.3).
 * Full content preserved (objectives · terms · traps · example) + exam-accurate narrative.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ESS_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-ess-u3-l1",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 3,
    lessonNum: 1,
    unitName: "Biodiversity & Conservation",
    title: "What Is Biodiversity? — Understanding Life's Variety Through Three Layers",
    subtitle: "Measuring ecosystem health with species diversity, genetic diversity, habitat diversity, and Simpson's Diversity Index",
    overview:
      "Biodiversity does not simply mean 'there are many species on Earth.' It is the resilience of ecosystems — and the sum of future resources — created by the interplay of three distinct layers: species diversity, genetic diversity, and habitat diversity. If any one of these layers collapses, the others follow in a cascade. The core of studying biodiversity in IB ESS is understanding how diversity is measured and what those numbers actually mean. Simpson's Diversity Index is that measurement tool, and the ability to calculate and interpret it is required on every exam.",
    objectives: [
      "Define species diversity, genetic diversity, and habitat diversity separately, and explain their interconnections",
      "Distinguish between species richness and species evenness, and analyse how both contribute to species diversity",
      "Calculate Simpson's Diversity Index (D) using the formula, and interpret what a given D value implies about ecosystem health",
      "Discuss the ecological and evolutionary risks that arise when genetic diversity is low, using examples",
      "Explain the relationship between habitat diversity and species diversity, and evaluate the impact of habitat simplification on biodiversity",
    ],
    sections: [
      {
        title: "The Three Layers of Biodiversity",
        subtitle: "Counting species alone is not enough — you need genes and habitats too for the complete picture",
        terms: [
          {
            term: "Species diversity",
            def: "A measure of diversity that combines the number of species in an area (species richness) with the relative abundance of each species (species evenness). Even a community with many species can be rated low in diversity if one species dominates the population count overwhelmingly.",
          },
          {
            term: "Genetic diversity",
            def: "The degree of genetic variation among individuals within a single species. Higher genetic diversity increases a species' ability to adapt to environmental change, disease, and climate shocks. If population size declines, inbreeding can cause genetic diversity to plummet rapidly.",
          },
          {
            term: "Habitat diversity",
            def: "The number and variety of habitat types present within a given area. The more habitat types there are, the more ecological niches are created, allowing a greater number of species to coexist.",
          },
          {
            term: "Species evenness",
            def: "An index indicating how evenly individual organisms are distributed among the species in a community. A community in which all species have similar population sizes has higher evenness — and therefore higher diversity — than one in which a single species accounts for 90% of all individuals.",
          },
        ],
        traps: [
          "Do not confuse species richness with species diversity — they are not the same concept. Species richness is simply a count of how many species are present, while species diversity adds evenness to that count. A community with 20 species can have lower diversity than one with only 10 species if 95% of all individuals belong to a single species. If you look only at species count when calculating the Simpson Index, you will get the wrong answer.",
          "Do not equate a reduction in genetic diversity directly with a reduction in population size. Population size can shrink while genetic diversity remains stable for a period, and conversely a large population that is highly inbred can have extremely low genetic diversity. You must describe separately how population bottleneck and founder effect cause rapid genetic diversity loss in small populations.",
        ],
        example:
          "Let's calculate Simpson's Diversity Index (D) and compare two communities.\n\nCommunity A: total individuals N = 10 — 8 of species X, 2 of species Y\nCommunity B: total individuals N = 10 — 5 of species X, 5 of species Y\n\nFormula: D = 1 − [Σ n(n−1) / N(N−1)]\n\nCommunity A: Σ n(n−1) = 8×7 + 2×1 = 56 + 2 = 58. N(N−1) = 10×9 = 90. D = 1 − (58/90) ≈ 0.36\nCommunity B: Σ n(n−1) = 5×4 + 5×4 = 20 + 20 = 40. N(N−1) = 90. D = 1 − (40/90) ≈ 0.56\n\nD ranges from 0 (no diversity) to approaching 1 (maximum diversity). Community B has the same number of species but higher evenness, giving it a larger D value. Questions testing this formula and its interpretation appear on almost every IB ESS exam.",
      },
      {
        title: "The Value of Biodiversity and Biodiversity Hotspots",
        subtitle: "Why conserve it? — Instrumental value, intrinsic value, and the most threatened places on Earth",
        terms: [
          {
            term: "Instrumental value",
            def: "The direct and indirect benefits that biodiversity provides to humans. These include the supply of food, medicines, and raw materials (direct), as well as water purification, carbon sequestration, and pollination (indirect ecosystem services). Instrumental value forms the basis of anthropocentric conservation arguments.",
          },
          {
            term: "Intrinsic value",
            def: "The value that living organisms possess independently of any human use. It is grounded in the environmental-ethical position that every species has a right to exist on Earth. This is the core concept of ecocentrism in EVS (Environmental Value Systems) discussions.",
          },
          {
            term: "Biodiversity hotspot",
            def: "A region that simultaneously supports an exceptionally high number of endemic species and has suffered severe habitat loss. Conservation International criteria: must hold at least 1,500 endemic plant species and have lost more than 70% of its original vegetation. Examples include Madagascar, southwestern Australia, and the Western Ghats.",
          },
        ],
        traps: [
          "Failing to clearly distinguish between instrumental value and intrinsic value in IB ESS extended-response questions will cost you significant marks. Writing only 'biodiversity is important' is insufficient. You must differentiate the two values based on 'whose benefit is it (human vs. the organism itself)' and 'does the value depend on whether humans use it?' In EVS discussion questions, linking each value to technocentrism, ecocentrism, and social ecology perspectives will earn maximum marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-ess-u3-l2",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 3,
    lessonNum: 2,
    unitName: "Biodiversity & Conservation",
    title: "Origins and Threats to Biodiversity — Evolution Builds; Humans Demolish",
    subtitle: "From natural selection, speciation, and mass extinctions to the IUCN Red List and ecological tipping points",
    overview:
      "Earth's current biodiversity is the accumulated product of billions of years of evolution. Natural selection filters variation within species, geographic isolation generates new species, and mass extinctions reset the board — opening new opportunities for adaptive radiation. Yet this process is now running in reverse at an unprecedented pace. The sixth mass extinction driven by humans is fundamentally different from prior ones: losses that would naturally take millions of years to recover are accumulating within decades. The IUCN Red List is the alarm system that quantifies that pace, and tipping points warn of the point of no return.",
    objectives: [
      "List the four conditions for natural selection and explain its relationship to genetic diversity",
      "Distinguish between allopatric speciation and sympatric speciation, and describe the mechanism of each",
      "Compare and contrast the causes and consequences of historical mass extinction events with present-day human-driven biodiversity loss",
      "Define the main categories of the IUCN Red List (Extinct, Extinct in the Wild, Critically Endangered, Endangered, Vulnerable, etc.) and explain the criteria used to list a species",
      "Analyse human-driven threats such as habitat destruction, pollution, overexploitation, invasive species, and climate change in an ecological context, and apply the concept of ecological tipping points",
    ],
    sections: [
      {
        title: "Evolution, Natural Selection, and Speciation",
        subtitle: "The factory of biodiversity — variation is selected, isolation creates new species",
        terms: [
          {
            term: "Natural selection",
            def: "The process by which, when genetic variation exists within a population, certain phenotypes that confer survival and reproductive advantages are passed on to subsequent generations in greater numbers. Four conditions: ① variation exists, ② variation is heritable, ③ differential survival and reproduction due to resource competition, ④ resources are finite.",
          },
          {
            term: "Allopatric speciation",
            def: "The formation of new species when a single population is divided into two or more groups by a geographic barrier (mountain range, strait, glacier) and each group evolves independently until reproductive isolation occurs. This is the most common pathway of speciation in evolution.",
          },
          {
            term: "Adaptive radiation",
            def: "The rapid diversification of a single common ancestor species into many species as it fills a variety of ecological niches. A classic example is the explosive diversification of surviving lineages into vacant niches following a mass extinction.",
          },
          {
            term: "Reproductive isolation",
            def: "A state in which two populations do not interbreed, or if they do, produce no fertile offspring. It is the defining criterion for completed speciation and arises through geographic isolation, behavioural differences, mismatched breeding seasons, or genetic incompatibility.",
          },
        ],
        traps: [
          "A common error in IB ESS is describing evolution as a change occurring within an individual organism. Evolution is a change in allele frequency at the population level, not the individual level. Do not write 'this giraffe evolved a longer neck'; instead write 'individuals with the variant for a longer neck survived and reproduced more successfully, increasing the frequency of the long-neck allele in the population.'",
          "Do not assume that speciation always requires geographic isolation. Allopatric speciation is the most common route, but sympatric speciation is also possible. Speciation by polyploidy in plants is the classic example. In any IB question asking 'can speciation occur without geographic isolation?', you must mention sympatric speciation.",
        ],
        example:
          "Let's use Darwin's finches to analyse adaptive radiation and natural selection. A single finch species that reached the Galápagos Islands from the South American mainland roughly two million years ago adapted to different food resources on each island (seeds, insects, cactus nectar), resulting in differently shaped beaks. Seed-eating species developed thick, heavy beaks, while insect-catching species developed thin, pointed beaks. The different selection pressures on each island produced more than 13 distinct species from a common ancestor — the textbook example of adaptive radiation. In an exam, explicitly state that all four conditions of natural selection were operating: variation (beak morphology), heritability, differential survival, and finite resources.",
      },
      {
        title: "Threats to Biodiversity: Mass Extinctions, Human Impact, IUCN, and Tipping Points",
        subtitle: "The sixth mass extinction is different from all others — the speed is the problem, and we are the cause",
        terms: [
          {
            term: "IUCN Red List",
            def: "A catalogue produced by the International Union for Conservation of Nature assessing the extinction risk of species. Categories: Extinct (EX), Extinct in the Wild (EW), Critically Endangered (CR), Endangered (EN), Vulnerable (VU), Near Threatened (NT), Least Concern (LC). Classification is based on criteria such as population decline rate, geographic range, and total population size.",
          },
          {
            term: "Ecological tipping point",
            def: "The point at which a stressed ecosystem crosses a threshold and shifts irreversibly into a new stable state that it cannot return from. The conversion of Amazonian rainforest into savanna and the takeover of coral reefs by algae are classic examples. It is the moment at which negative feedback switches to positive feedback.",
          },
          {
            term: "Habitat fragmentation",
            def: "The process by which continuous habitat is broken into smaller, isolated patches by human activities such as road building, agriculture, and urbanisation. Fragmentation threatens biodiversity simultaneously through three mechanisms: reduction in total habitat area, increased edge effect, and isolation of populations.",
          },
          {
            term: "Invasive alien species",
            def: "A species introduced by humans to an area outside its native range that causes harm to the ecosystem, economy, or human health. Invasive species can rapidly displace native species by acting as predators, competitors, or disease vectors. The introduction of rats to New Zealand and the resulting extinction of native bird species is a well-known example.",
          },
        ],
        traps: [
          "Do not confuse mass extinction with background extinction rate. Background extinction is the natural, low-level rate of extinction occurring through normal evolutionary processes (approximately 1 species per million species per year); the current extinction rate is estimated to be 100–1,000 times higher than this. Using the argument that 'extinction has always occurred naturally' to suggest conservation is unnecessary will cost you heavily in IB ESS essays. Always cite figures to show that the current rate of extinction is abnormally fast.",
          "When describing a tipping point, do not simply call it a 'threshold' — you must include 'irreversibility.' The IB ESS mark scheme treats irreversibility as the defining characteristic of a tipping point. A statement such as 'problems will arise if the current trend continues' does not correctly apply the tipping point concept.",
        ],
        example:
          "Let's analyse an ecological tipping point using a coral reef ecosystem. Under normal conditions, coral dominates the reef and negative feedback loops maintain stability. When rising sea temperatures, pollution, and overfishing act simultaneously, corals bleach and die. As the organisms that graze on algae decline, algae proliferate explosively. Once algae cover the coral substrate, coral larvae can no longer settle — triggering a positive feedback loop. This is the tipping point. Once roughly 50% of a reef's area has shifted to algae-dominated states from which it cannot recover, approximately 25% of all marine species diversity that depended on that ecosystem collapses with it. The large-scale bleaching events on Australia's Great Barrier Reef (2016, 2017, 2020, 2022) demonstrate that this tipping point is becoming a reality.",
      },
    ],
  },
  {
    lessonId: "ib-ess-u3-l3",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 3,
    lessonNum: 3,
    unitName: "Biodiversity & Conservation",
    title: "Conservation Strategies — In-Situ vs. Ex-Situ Conservation and the Clash of Values",
    subtitle: "Protected areas, seed banks, restoration ecology, EVS perspectives — everything on IB ESS conservation",
    overview:
      "Approaches to conserving biodiversity fall into two broad categories. In-situ conservation protects species within their natural habitats, while ex-situ conservation manages species outside their original habitats. Neither is a perfect solution. In-situ conservation can pit the interests of local communities against habitat protection, while ex-situ conservation is limited by the fact that it removes species from natural evolutionary pressures. IB ESS requires not only comparing the advantages and disadvantages of both strategies but also analysing why different people reach different conclusions about conservation — that is, differences in Environmental Value Systems (EVS).",
    objectives: [
      "Describe the strategies and examples of in-situ conservation, and evaluate its effectiveness and limitations",
      "Describe the strategies and examples of ex-situ conservation, and discuss its advantages and disadvantages compared to in-situ conservation",
      "Explain the design principles of protected areas (size, connectivity, edge effect) in connection with island biogeography theory",
      "Compare the perspectives of technocentrism, ecocentrism, and social ecology on biodiversity conservation",
      "Explain the role and limitations of international conventions (CITES, CBD, Ramsar Convention, etc.) in biodiversity conservation",
    ],
    sections: [
      {
        title: "In-Situ and Ex-Situ Conservation",
        subtitle: "Protect species in place, or remove and store them elsewhere?",
        terms: [
          {
            term: "In-situ conservation",
            def: "The protection of species within their natural habitats. It includes national parks, nature reserves, biosphere reserves, and wildlife sanctuaries. Its greatest advantage is that natural evolutionary processes, ecological interactions, and self-regulating functions are maintained.",
          },
          {
            term: "Ex-situ conservation",
            def: "The protection, breeding, and management of species outside their original habitats. It includes zoos, botanical gardens, seed banks, frozen gene banks, and captive breeding programmes. It can serve as the last refuge for species whose habitats have been completely destroyed.",
          },
          {
            term: "Seed bank",
            def: "An ex-situ conservation facility that stores seeds from diverse plant species in frozen, desiccated conditions for long-term preservation. The Svalbard Global Seed Vault in Norway is the defining example. It functions as an insurance policy preserving the genetic diversity of agricultural and wild plant species.",
          },
          {
            term: "Biosphere reserve",
            def: "A conservation model under UNESCO's Man and the Biosphere (MAB) Programme, divided into three zones: core zone, buffer zone, and transition zone. The model seeks coexistence by spatially separating strict protection from sustainable human activity.",
          },
        ],
        traps: [
          "Do not describe ex-situ conservation simply as 'locking species up in zoos.' IB ESS requires you to recognise that the ultimate goal of ex-situ conservation is long-term species survival, and that it complements in-situ conservation through captive breeding followed by reintroduction into the wild. The successful captive breeding and wild reintroduction of the Arabian oryx is a key example — you must state that the two strategies are most effective when they operate as a continuum.",
          "Avoid the oversimplification that a larger protected area is always better. According to island biogeography theory, species number in a protected area is positively correlated with area, but a network of smaller, connected protected areas may be more effective than a single large fragmented one with no wildlife corridors. Discussing area, connectivity, and shape (circular vs. linear) together is required for full marks.",
        ],
        example:
          "Let's examine how island biogeography theory (MacArthur & Wilson) is applied to the design of protected areas. The theory states that species number (S) increases with larger area (A) and with proximity to the mainland. Applied to protected area design: ① Is a Single Large (SL) reserve better than Several Small (SS) ones? — In general SL supports more species, but SS can be complementary when diverse habitat types are needed (the SLOSS debate). ② Wildlife corridors enable movement between small protected areas, creating opportunities for recolonisation. ③ Edge effect: the boundary zone of a protected area is vulnerable to invasive species, desiccation, and human disturbance. A circular reserve has a lower edge-to-area ratio than a linear one of the same area, protecting core habitat more effectively. Practice applying these principles directly in IB Paper 2 design questions.",
      },
      {
        title: "Conflicting Values in Conservation — EVS and International Conventions",
        subtitle: "Why do people looking at the same ecosystem reach completely different conclusions?",
        terms: [
          {
            term: "Environmental Value System (EVS)",
            def: "The system of values, beliefs, and attitudes that shapes how an individual or group perceives the relationship between humans and the environment. IB ESS addresses three EVS perspectives: technocentrism, ecocentrism, and social ecology.",
          },
          {
            term: "CITES (Convention on International Trade in Endangered Species of Wild Fauna and Flora)",
            def: "An international convention that regulates international trade in wild animals and plants to ensure it does not threaten species survival. Species are classified into Appendix I (commercial trade prohibited), Appendix II (trade requires a permit), and Appendix III (species protected at the request of specific countries). The regulation of ivory trade for African elephant protection is the flagship example.",
          },
          {
            term: "Convention on Biological Diversity (CBD)",
            def: "An international convention (Rio, 1992) with three objectives: conservation of biodiversity, sustainable use of its components, and fair and equitable sharing of benefits arising from genetic resources. The Nagoya Protocol is a supplementary agreement under the CBD that operationalises Access and Benefit-Sharing (ABS) for genetic resources.",
          },
        ],
        traps: [
          "Do not characterise the technocentric perspective as unconditionally anti-environment. Technocentrism is an optimistic view that technological innovation can solve environmental problems; it does not necessarily oppose conservation. In IB ESS EVS questions, describe the core of each perspective accurately. Distinguish technocentrism (technology will fix it), ecocentrism (nature has intrinsic value; restrict human activity), and social ecology (conservation cannot succeed without addressing social inequality) with supporting examples.",
          "An analysis that does not acknowledge the limitations of international environmental conventions is incomplete. CITES and CBD are legally binding, but: ① enforcement depends on the capacity of individual national governments, ② implementation slows when it conflicts with economic interests, and ③ when convention requirements clash with local livelihoods, implementation faces resistance. Balancing strengths and limitations is required to meet the IB ESS high-mark extended-response criteria.",
        ],
        example:
          "Let's analyse the clash of EVS perspectives surrounding African elephant conservation. The same problem — declining elephant populations and ivory poaching — produces entirely different solutions from the three EVS perspectives.\n\nTechnocentric perspective: Drones, GPS tracking, and AI surveillance technology can detect poachers in real time. Scientific management of elephant populations can simultaneously achieve ecological integrity and economic benefits from tourism.\n\nEcocentric perspective: Elephants possess intrinsic value as ecosystem engineers and must be protected regardless of economic benefit to humans. All ivory trade should be banned and their habitat fully protected.\n\nSocial ecology perspective: The root cause of poaching is local poverty and inequality. Unless a structure is created in which local communities gain economic benefits from elephant conservation — such as Community-Based Natural Resource Management (CBNRM) — no regulation will be sustainable.\n\nIn IB ESS essays, applying all three perspectives to a single case study and comparing the strengths and limitations of each is the key to achieving the highest marks.",
      },
    ],
  },
];
