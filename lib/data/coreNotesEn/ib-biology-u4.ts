/**
 * Core Notes English version — IB Biology Unit 4 (Ecology).
 * Faithful translation of the Korean storytelling original.
 * All objectives, terms, traps, and examples preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-biology-u4-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 4,
    lessonNum: 1,
    unitName: "Ecology",
    title: "Species, Communities, and Ecosystems — The Basic Units of Ecology and Modes of Nutrition",
    subtitle: "To understand an ecosystem you must first classify precisely 'who eats what'",
    overview:
      "Ecology is the study of the interactions between organisms and their environment. The first gateway into IB Topic 4 is to draw a clear distinction between the three levels of organisation — population, community, and ecosystem — and to grasp how the scale and nature of the interactions occurring at each level differ. Next, you must classify organisms by their mode of nutrition into autotrophs and heterotrophs, and within each category further subdivide consumers into herbivores, carnivores, omnivores, detritivores, and parasites according to how they obtain food. IB does not treat this classification as rote memorisation; instead it expects you to interpret real food-web data and to discuss the ecological role of each organism in written responses.",
    objectives: [
      "Explain the hierarchy of organism, population, community, and ecosystem, and provide examples of the interactions addressed at each level",
      "Explain the difference between autotrophs and heterotrophs in terms of how they acquire energy, and distinguish photoautotrophs from chemoautotrophs",
      "Classify consumers into herbivores, carnivores, omnivores, and detritivores/decomposers, and determine the mode of nutrition of each organism in a food web",
      "Connect the concepts of habitat, niche, and competition within communities, and explain the implications of the competitive exclusion principle for biodiversity",
    ],
    sections: [
      {
        title: "The Hierarchy of Ecological Organisation — From Organism to Ecosystem",
        subtitle: "As the scale increases, so does the complexity of the interactions",
        terms: [
          {
            term: "Population",
            def: "A group of individuals of the same species gathered together in the same time and place. Population ecology deals with population size, density, birth rate, death rate, and migration. Because the members are the same species, they can interbreed and share a common gene pool.",
          },
          {
            term: "Community",
            def: "The totality of the various populations living together in the same area. Community ecology deals with interspecific interactions (predation, competition, mutualism, commensalism, parasitism). It includes only biotic factors and does not include the abiotic environment.",
          },
          {
            term: "Ecosystem",
            def: "A functional unit combining a community with the abiotic environment it occupies (temperature, light, water, minerals, etc.). Ecosystem ecology deals with energy flow and nutrient cycling. When the entire Earth is viewed as a single ecosystem, it is called the biosphere.",
          },
          {
            term: "Niche",
            def: "The sum total of the functional role and environmental conditions occupied by a species in an ecosystem. It includes all factors such as food, living space, time of activity, and the range of temperatures it can tolerate. If the niches of two species overlap completely, the competitive exclusion principle dictates that one species will eventually disappear.",
          },
        ],
        traps: [
          "Answers that confuse 'community' and 'ecosystem' appear frequently in IB. The key difference is whether the abiotic environment is included. A community is only the biotic factors, whereas an ecosystem is the community plus the entire abiotic environment. Writing 'an ecosystem is the set of all organisms' omits the abiotic factors and loses marks.",
          "Do not confuse habitat with niche. A habitat is 'the place where an organism lives (where),' whereas a niche is 'the sum of the role an organism plays and the environmental conditions it tolerates (what it does + what it tolerates).' Writing 'habitat = niche' is penalised immediately.",
        ],
        example:
          "An example applying the competitive exclusion principle. Suppose two finch species in the Galápagos Islands compete for seeds of the same size. If the niches of these two species overlap completely, competition intensifies and the species that is even slightly superior at acquiring resources excludes the other from the local area (competitive exclusion). In the actual Galápagos, cases have been observed in which the beak sizes of two finch species have undergone divergent evolution (character displacement) in a direction that makes coexistence possible. In IB Paper 2 you may be presented with such data and asked to discuss the relationship between the competitive exclusion principle and niche partitioning.",
      },
      {
        title: "Classifying Modes of Nutrition — Where and How Energy Is Obtained",
        subtitle: "The difference between autotrophs and heterotrophs comes down to whether carbon is fixed by the organism itself",
        terms: [
          {
            term: "Autotroph",
            def: "An organism that synthesises organic molecules from inorganic substances to produce its own energy. There are photoautotrophs, which use light as their energy source (e.g. plants, algae, cyanobacteria), and chemoautotrophs, which use inorganic chemical reactions as their energy source (e.g. sulfur-oxidising bacteria near hydrothermal vents). They correspond to the producers in a food chain.",
          },
          {
            term: "Detritivore / Decomposer",
            def: "An organism that ingests and breaks down dead organic matter (the fragments of fallen leaves, carcasses, faeces, etc. — detritus) to return it to inorganic form. They can be divided into detritivores such as earthworms and millipedes, and decomposers such as fungi and bacteria. Decomposers absorb organic matter through extracellular digestion and are the key link in nutrient cycling.",
          },
          {
            term: "Parasite",
            def: "A heterotroph that obtains nutrition while harming a host organism. It is distinguished from a predator in that it exploits the host over a long period without killing it immediately. Example: the tapeworm absorbs the host's digested nutrients through intestinal parasitism, and the malaria protozoan multiplies inside blood cells.",
          },
        ],
        traps: [
          "Decomposer and detritivore are not the same concept. Detritivores (e.g. earthworms, woodlice) physically fragment fallen leaves or carcasses and digest them internally, whereas decomposers (e.g. fungi, bacteria) secrete enzymes to break matter down chemically outside the body and then absorb it. IB mark schemes require these two terms to be used distinctly, and using them interchangeably such as 'decomposer = earthworm' is penalised.",
          "Misclassifying chemoautotrophs as heterotrophs is a common mistake. Chemoautotrophic bacteria simply do not use light; they obtain energy from inorganic chemical reactions (e.g. sulfur oxidation, ammonia oxidation) to synthesise their own organic matter — they are clearly autotrophs. Beware the faulty logic that 'if it obtains energy without light, it is a heterotroph.'",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u4-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 4,
    lessonNum: 2,
    unitName: "Ecology",
    title: "Energy Flow — Food Chains, Trophic Efficiency, and Energy Pyramids",
    subtitle: "You truly understand the 10% rule only when you grasp, numerically, why carnivory is inefficient",
    overview:
      "In an ecosystem, energy flows in one direction only. Solar energy is stored in organic molecules by the photosynthesis of producers, and as it moves from primary consumer → secondary consumer → tertiary consumer, about 90% of the energy is lost at each trophic level to cellular respiration, heat loss, undigested material, and so on. For this reason the energy actually transferred to the next trophic level is, on average, only about 10% — this is called trophic efficiency, or the 10% rule. In IB you are frequently asked to draw a food web and calculate the amount of energy at each trophic level, or to interpret the shape of a pyramid of energy and a pyramid of biomass and explain why an exceptional inverted pyramid can occur.",
    objectives: [
      "Arrange the trophic levels in a food chain in the order producer, primary consumer, secondary consumer, and explain the direction of energy flow and the complex pathways within a food web",
      "Explain the concept of trophic efficiency and calculate the amount of energy at the next or previous trophic level from a given energy value",
      "Explain that a pyramid of energy is always upright, and discuss why a pyramid of biomass can be inverted by linking it to productivity",
      "Distinguish and explain the three main pathways by which energy is lost at a trophic level (heat loss through cellular respiration, undigested material, transfer to decomposers)",
      "Evaluate trophic efficiency in connection with the environmental impact of human dietary choices (plant-based vs. meat-centred diets)",
    ],
    sections: [
      {
        title: "Food Chains and Food Webs — A Map of Energy-Transfer Pathways",
        subtitle: "An arrow points in 'the direction energy travels' — that is, from the eaten toward the eater",
        terms: [
          {
            term: "Trophic level",
            def: "A level in a food chain distinguished by how energy is acquired. Level 1: producers (organisms that synthesise organic matter from inorganic substances); Level 2: primary consumers (herbivores); Level 3: secondary consumers (carnivores that eat primary consumers); Level 4: tertiary consumers. A single organism can belong to several trophic levels, so in a food web trophic levels can overlap.",
          },
          {
            term: "Trophic efficiency",
            def: "The proportion of energy transferred from one trophic level to the next. It averages about 10%, with the remaining 90% lost to cellular respiration (heat loss), faeces, undigested material, and transfer to decomposers. Trophic efficiency = (energy of the higher trophic level / energy of the lower trophic level) × 100%.",
          },
          {
            term: "Pyramid of energy",
            def: "A graph in which bars represent the amount of energy passing through each trophic level per unit area per unit time (unit: kJ m⁻² yr⁻¹). Because energy always decreases toward the higher levels, a pyramid of energy is, without exception, upright (an erect triangle).",
          },
          {
            term: "Pyramid of biomass",
            def: "A graph in which bars represent the total biomass present at a given moment at each trophic level (dry mass, g m⁻²). It is usually upright, but in cases such as marine ecosystems where the reproduction rate of phytoplankton is very rapid, the instantaneous biomass can be small while consumer biomass is greater, producing an inverted pyramid.",
          },
        ],
        traps: [
          "The direction of food-chain arrows must be drawn as 'the direction in which energy (matter) moves.' That is, they point from prey toward predator, as in 'grass → grasshopper → frog.' A very common mistake on exams is to draw the relationship 'a grasshopper eats grass' in the reverse direction, as 'grasshopper → grass.' Always remember that the arrow points 'not in the direction of being eaten but in the direction energy flows.'",
          "Do not make the error of treating a pyramid of biomass and a pyramid of energy as the same. A pyramid of energy is always upright, but a pyramid of biomass can be inverted. Writing 'all pyramids are always upright' in IB is penalised immediately — you must mention the possibility that a pyramid of biomass can be inverted.",
        ],
        example:
          "An example of a trophic-efficiency calculation. Suppose that in an ecosystem the total energy production of the producers is 40,000 kJ m⁻² per year. If trophic efficiency is a constant 10%, the energy at each trophic level is as follows.\n\nProducers: 40,000 kJ m⁻² yr⁻¹\nPrimary consumers: 40,000 × 0.10 = 4,000 kJ m⁻² yr⁻¹\nSecondary consumers: 4,000 × 0.10 = 400 kJ m⁻² yr⁻¹\nTertiary consumers: 400 × 0.10 = 40 kJ m⁻² yr⁻¹\n\nIn other words, only 0.1% of the producer energy reaches the tertiary consumers. In IB Paper 2 this calculation is sometimes asked in reverse — the answer to 'how much energy is needed at the producer level for tertiary consumers to obtain 40 kJ?' is 40 ÷ 0.001 = 40,000 kJ.",
      },
      {
        title: "Pathways of Energy Loss and the Environmental Impact of Diet",
        subtitle: "The low value of trophic efficiency is the scientific basis for the environmental cost of meat production",
        terms: [
          {
            term: "Assimilation efficiency",
            def: "The proportion of ingested food energy that is actually digested, absorbed, and assimilated into the body. Plant-based food high in fibre has low assimilation efficiency (herbivores ~20–50%), while high-protein animal food is higher (carnivores ~80%). Undigested material leaves the body as faeces and is transferred to decomposers.",
          },
          {
            term: "Production efficiency",
            def: "The proportion of assimilated energy used for biomass increase (growth) and reproduction. The remainder is heat lost through cellular respiration. Endothermic (warm-blooded) animals expend a great deal of energy maintaining body temperature, so their production efficiency is low (~1–10%), whereas ectothermic (cold-blooded) animals are relatively higher (~10–40%).",
          },
          {
            term: "Net Primary Productivity (NPP)",
            def: "The total energy fixed by producers through photosynthesis (gross primary productivity, GPP) minus the producers' own cellular-respiration consumption. NPP = GPP − respiration. NPP sets the upper limit of the energy available to all consumers.",
          },
        ],
        traps: [
          "Trophic efficiency of 10% is an average value and is not always exactly 10%. In IB calculation questions, if the question directly provides an efficiency value you must use that value, and assuming arbitrarily 'because it is 10%…' is wrong. Also, writing the cause of the 10% loss simply as 'lost as heat' earns only partial credit — you must distinguish the three pathways of undigested material (faeces), transfer to decomposers, and heat loss through cellular respiration to score full marks.",
        ],
        example:
          "An example of a written response on the environmental impact of dietary choice. To obtain 1 kg of beef protein, a cow must consume about 7–10 kg of grain feed (trophic efficiency of about 10–14%). By contrast, the same amount of plant protein (e.g. soy) requires far less land, water, and energy. In IB written-response questions you are presented with these figures and asked to explain, using the concept of trophic efficiency, 'why a meat-centred diet requires more cultivated land than a plant-based diet.' The key logic: the closer to the base of the energy pyramid (plants), the smaller the energy loss, so the same number of calories can be supplied with fewer resources.",
      },
    ],
  },
  {
    lessonId: "ib-biology-u4-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 4,
    lessonNum: 3,
    unitName: "Ecology",
    title: "The Carbon Cycle and Climate Change — Carbon Fluxes, the Greenhouse Effect, and Their Consequences",
    subtitle: "Knowing the pathways by which carbon crosses the atmosphere, organisms, soil, and oceans reveals the mechanism of climate change",
    overview:
      "Carbon forms the backbone of every organic molecule on Earth and cycles ceaselessly among the atmosphere (CO₂, CH₄), biosphere, soil, oceans, and lithosphere. The rate at which carbon moves from one reservoir to another is called a carbon flux, and as human activities (fossil-fuel combustion, deforestation, cement production) have disrupted this balance, the atmospheric CO₂ concentration has risen from about 280 ppm before the Industrial Revolution to over 420 ppm today. In IB Topic 4 you are required to describe each process of the carbon cycle precisely (photosynthesis, cellular respiration, combustion, decomposition, calcification, carbonation) and to evaluate, on the basis of evidence, the physical mechanism of the greenhouse effect and the ecological consequences of global warming.",
    objectives: [
      "Explain, using a carbon-cycle diagram, the carbon reservoirs (atmosphere, biosphere, soil, oceans, lithosphere) and the carbon-flux processes between them (photosynthesis, respiration, combustion, decomposition, calcification, dissolution)",
      "Explain the physical mechanism of the greenhouse effect step by step (transmission of short-wave solar radiation → absorption at the surface → emission of long-wave radiation → re-absorption and re-emission by greenhouse gases), and distinguish CO₂, CH₄, N₂O, and water vapour as greenhouse gases",
      "Explain the main pathways by which human activity contributes to rising atmospheric CO₂ (fossil-fuel combustion, deforestation, agriculture, cement production) and evaluate the relative contribution of each",
      "Discuss the ecological consequences of global warming (sea-level rise, coral bleaching, ocean acidification, polar ice loss, shifts in species distribution) together with their causal relationships",
    ],
    sections: [
      {
        title: "The Carbon Cycle — Every Pathway by Which Carbon Crosses an Ecosystem",
        subtitle: "Photosynthesis draws carbon out of the atmosphere; respiration and combustion send it back",
        terms: [
          {
            term: "Carbon reservoir (carbon sink & source)",
            def: "A place where carbon is stored. Major reservoirs: the atmosphere (CO₂, CH₄), the terrestrial biosphere (plants, soil organic matter), the oceans (dissolved CO₂, marine organisms, sediments), fossil fuels (coal, oil, natural gas), and the lithosphere (limestone, marble). When carbon is removed from the atmosphere it is called a carbon sink; when carbon is released it is called a carbon source.",
          },
          {
            term: "Carbon flux",
            def: "The amount of carbon moving from one reservoir to another per unit time (unit: GtC yr⁻¹). Major fluxes: photosynthesis (atmosphere → biosphere, ~120 GtC yr⁻¹), cellular respiration (biosphere → atmosphere, ~60 GtC yr⁻¹), ocean–atmosphere CO₂ exchange, fossil-fuel combustion (fossil fuels → atmosphere, ~10 GtC yr⁻¹), and deforestation (biosphere → atmosphere, ~1–2 GtC yr⁻¹).",
          },
          {
            term: "Ocean acidification",
            def: "The phenomenon in which atmospheric CO₂ dissolves in seawater to form carbonic acid (H₂CO₃), which lowers the pH of the seawater. CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. Since industrialisation, ocean pH has fallen from 8.2 to 8.1, a drop of about 0.1 units (an increase in H⁺ concentration of about 26%), which impairs calcification in organisms with calcium carbonate (CaCO₃) shells and skeletons (corals, shellfish, sea urchins).",
          },
          {
            term: "Calcification and weathering",
            def: "Calcification: the process by which marine organisms (corals, foraminifera, shellfish, etc.) use Ca²⁺ and CO₃²⁻ to form CaCO₃ skeletons and shells, storing carbon over the long term. Weathering: the geological flux by which limestone in the lithosphere dissolves in rainwater (mildly acidic), gradually releasing carbon to the atmosphere or oceans.",
          },
        ],
        traps: [
          "Cellular respiration and combustion both release organic carbon as CO₂, but do not confuse them. Cellular respiration is an enzyme-mediated biochemical process that proceeds within organisms, whereas combustion is a rapid oxidation reaction with oxygen (fire, burning of fossil fuels). In an IB question asking about 'the processes by which carbon returns to the atmosphere,' conflating the two processes or writing 'respiration = combustion' is penalised — you must clearly distinguish the characteristics of each process.",
          "When describing ocean-acidification figures, you must always note that 'pH 8.1 is not acidic.' Current ocean pH is still weakly basic (8.1), and 'acidification' does not mean it has become absolutely acidic but rather that it has shifted relatively in the more acidic direction (a decrease in pH). Writing 'because the pH has fallen, the ocean has become acidic' is wrong.",
        ],
        example:
          "An example of a carbon-cycle calculation and interpretation. Suppose that in a forest ecosystem the annual gross primary productivity (GPP) = 150 GtC yr⁻¹ and plant cellular respiration = 90 GtC yr⁻¹.\n\nNet primary productivity (NPP) = GPP − respiration = 150 − 90 = 60 GtC yr⁻¹\n\nThis NPP is the maximum amount of energy available to consumers and decomposers. If this forest were removed by deforestation, the GPP would disappear and, instead, the stored biomass would be decomposed or burned, releasing carbon to the atmosphere. In IB Paper 2 you are presented with such figures and asked to discuss 'the effect of deforestation on atmospheric carbon concentration' via two or more pathways (loss of productivity + release of stored carbon).",
      },
      {
        title: "The Greenhouse Effect and Climate Change — From Mechanism to Consequences",
        subtitle: "Without the natural greenhouse effect, Earth's average temperature would be −18°C; anthropogenic enhancement creates the present crisis",
        terms: [
          {
            term: "Greenhouse effect",
            def: "A natural phenomenon in which short-wave solar radiation (visible light, ultraviolet) passes through the atmosphere and is absorbed at the surface, and when the surface emits long-wave radiation (infrared), greenhouse gases (CO₂, CH₄, N₂O, water vapour) absorb and re-emit it, keeping Earth's surface warm. The natural greenhouse effect raises Earth's average temperature by +33°C and is essential for sustaining life; an anthropogenic increase in greenhouse gases enhances it excessively.",
          },
          {
            term: "Global Warming Potential (GWP)",
            def: "The relative ability of 1 kg of a particular greenhouse gas to contribute to atmospheric warming over 100 years compared with 1 kg of CO₂. CO₂ has a GWP = 1 (reference), CH₄ ≈ 28–34, N₂O ≈ 265–298. Methane has a far greater per-molecule warming effect than CO₂ but a shorter atmospheric lifetime (~12 years vs. hundreds of years for CO₂).",
          },
          {
            term: "Coral bleaching",
            def: "The phenomenon in which a rise in seawater temperature or acidification causes coral polyps to expel their symbiotic algae (zooxanthellae). Because the symbiotic algae provide the coral with photosynthetic products (nutrients) and pigment, after expulsion the coral becomes white (bleached) and may die from nutrient deficiency. Sustained bleaching leads to the collapse of the coral-reef ecosystem.",
          },
        ],
        traps: [
          "The error of confusing the greenhouse effect with ozone depletion arises frequently. The greenhouse effect is the phenomenon in which temperature rises through the blocking of infrared radiation, whereas ozone depletion is the phenomenon in which the ability to block ultraviolet radiation decreases — the causative gases and mechanisms are entirely different. The statement 'CFCs (Freon gases) cause the greenhouse effect' is inaccurate — CFCs are primarily the agents of ozone depletion, and their effect as greenhouse gases is secondary.",
          "When describing the consequences of global warming, writing simply 'the temperature rises' earns only partial credit. IB mark schemes require you to connect and describe, through multiple pathways, specific consequences such as sea-level rise (ice melt + thermal expansion), ocean acidification, changes in precipitation patterns, coral bleaching, changes to polar ecosystems, and the poleward shift of species distributions. Merely listing consequences without causal relationships is also penalised.",
        ],
        example:
          "An example of a step-by-step description of the greenhouse-effect mechanism (the structure of a model IB Paper 2 written response):\n\n① Short-wave radiation emitted by the Sun (mainly visible light, λ ≈ 400–700 nm) passes mostly through the atmosphere and is absorbed at the surface.\n② The surface emits the absorbed energy as long-wave radiation (infrared, λ ≈ 10,000 nm).\n③ Greenhouse gases such as CO₂, CH₄, and H₂O (vapour) absorb this long-wave radiation and re-emit it in all directions.\n④ Some radiation is re-emitted toward the surface, raising the surface temperature.\n⑤ When human activity increases the atmospheric CO₂ concentration, step ③ is enhanced, more long-wave radiation is trapped, and Earth's average temperature rises.\n\nIB mark schemes require you to include both the sequence ①–④ and the distinction between short-wave and long-wave radiation.",
      },
    ],
  },
];
