/**
 * Core Notes English version — IB ESS Unit 2 (2.1–2.3).
 * Full content preserved (objectives · terms · traps · example) with exam-accurate narrative.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ESS_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-ess-u2-l1",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 2,
    lessonNum: 1,
    unitName: "Ecosystems & Ecology",
    title: "Species and Populations — What It Means to Survive Inside an Ecosystem",
    subtitle: "Why limiting factors, carrying capacity, and S-curve / J-curve growth are the three pillars of population dynamics",
    overview:
      "The first key to understanding ecosystems is asking: 'Why do some species explode in numbers and then suddenly crash?' Every population would grow exponentially if resources were unlimited — but in reality, resources are always finite. The moment limiting factors kick in, the growth curve bends, and the population oscillates near the maximum number the environment can support: the carrying capacity. Grasping this dynamic reveals the logic behind every ecological policy, from endangered species protection to invasive species management.",
    objectives: [
      "Distinguish between density-dependent and density-independent limiting factors and give real-world examples of each",
      "Define carrying capacity (K) and explain the process by which a population reaches K using negative feedback logic",
      "Compare the ecological conditions and differences between S-shaped (logistic) growth and J-shaped (exponential) growth curves",
      "Analyze overshoot and population collapse in the context of exceeding carrying capacity",
      "Interpret population dynamics data for a given species to identify limiting factors and growth phases",
    ],
    sections: [
      {
        title: "Limiting Factors and Carrying Capacity",
        subtitle: "The ceiling set by resources determines the fate of a population",
        terms: [
          {
            term: "Limiting factor",
            def: "An environmental factor that constrains population growth. Divided into density-dependent factors (food competition, predation, disease — their effect intensifies as population density increases) and density-independent factors (floods, wildfires, drought — they act regardless of population density).",
          },
          {
            term: "Carrying capacity (K)",
            def: "The maximum population size of a given species that a specific ecosystem can sustainably support with its available resources. When a population exceeds K, negative feedback driven by resource scarcity pulls numbers back down.",
          },
          {
            term: "Overshoot",
            def: "The phenomenon in which a population temporarily exceeds carrying capacity. This leads to resource depletion and waste accumulation, causing the population to crash (die-back) well below K or collapse entirely.",
          },
          {
            term: "Density-dependent factor",
            def: "A limiting factor whose impact grows stronger as population density increases. Key examples include competition for food and habitat, increased predation pressure, and accelerated disease transmission. These are the primary source of negative feedback in population regulation.",
          },
        ],
        traps: [
          "Confusing density-dependent and density-independent factors is one of the most common errors on IB ESS exams. Wildfires and floods act independently of population density and are therefore density-independent. By contrast, infectious disease spreads faster at higher densities, making it density-dependent. Use this test: 'Would this factor operate the same way if the population were sparse?' If yes, it is density-independent.",
          "Carrying capacity (K) is not a fixed constant — it shifts with environmental conditions. A drought lowers the K of a grassland, while added fertilizer raising plant productivity increases the K for herbivores. Describing K as an immovable ceiling will cost you marks.",
        ],
        example:
          "Let's analyse density-dependent limiting factors using the sea urchin–kelp ecosystem. As sea urchin populations grow, consumption of algae (their food source) surges and algae abundance falls. With less food available, the urchin population's growth rate declines — this is the density-dependent limiting factor in action. Conversely, when sea otters (predators) prey on urchins, urchin density drops and algae recover, sustaining the entire kelp forest. When otter populations declined along the California coast in the 1970s, urchin numbers exploded and kelp forests were devastated — a real-world demonstration of this dynamic.",
      },
      {
        title: "S-Curve vs. J-Curve Growth",
        subtitle: "In a world of finite resources, the S-curve is reality and the J-curve is the exception",
        terms: [
          {
            term: "Logistic growth (S-curve)",
            def: "A growth pattern in which a population initially increases exponentially but gradually slows as limiting factors intensify, stabilising near carrying capacity (K). This is the typical pattern seen in real ecosystems where resources are finite.",
          },
          {
            term: "Exponential growth (J-curve)",
            def: "A growth pattern in which population numbers increase at a constant rate with no limiting factors. Observed early in the colonisation of new habitats, in invasive species, and in the initial stages of bacterial cultures, but it cannot persist over the long term.",
          },
          {
            term: "Intrinsic rate of increase (r)",
            def: "The maximum growth rate a population can achieve when resources are unlimited. A larger r means a greater potential for rapid growth. r-strategists (r-selected species) tend to reproduce quickly and display J-curve growth patterns.",
          },
        ],
        traps: [
          "Do not mistake J-curve growth for 'sustainable growth.' J-curve growth ignores carrying capacity and represents a short-term explosion that inevitably leads to overshoot and collapse — or to resource exhaustion. When drawing a J-curve on an IB ESS exam, you must also explain why such growth cannot continue, in order to achieve full marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-ess-u2-l2",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 2,
    lessonNum: 2,
    unitName: "Ecosystems & Ecology",
    title: "Communities and Ecosystems — The Structure Built by Eating and Being Eaten",
    subtitle: "Master trophic levels, food chains, and ecological pyramids to see energy flow clearly",
    overview:
      "An ecosystem is not simply a collection of organisms. The network of 'who eats whom' determines the direction of energy flow, and that direction creates the structure and function of the ecosystem. By expanding your view from food chains to food webs, you can understand why the decline of one species triggers a chain reaction — and why top predators are so rare. Ecological pyramids are the blueprints that express that energy flow in numbers.",
    objectives: [
      "Define the roles of producers, consumers, and decomposers, and link each to a trophic level",
      "Explain the difference between food chains and food webs, and discuss why food webs are a more realistic model",
      "Analyse the features of energy pyramids, pyramids of numbers, and pyramids of biomass, including the conditions under which each can be inverted",
      "Use the 10% rule to calculate energy loss between trophic levels and explain how this accounts for the scarcity of top predators",
    ],
    sections: [
      {
        title: "Trophic Levels and Feeding Relationships",
        subtitle: "Who eats whom — the direction of energy flow shapes the structure of the ecosystem",
        terms: [
          {
            term: "Trophic level",
            def: "A classification of organisms within an ecosystem based on how they obtain energy. The first trophic level is producers (plants and algae); the second is primary consumers (herbivores); the third is secondary consumers (carnivores). Energy decreases at each successive trophic level.",
          },
          {
            term: "Food web",
            def: "A complex network in which multiple food chains within an ecosystem are interconnected. Real organisms do not belong to a single food chain; a food web is the source of ecosystem stability. The more connections that exist, the more the impact of any one species' decline is buffered.",
          },
          {
            term: "Decomposer",
            def: "Organisms (mainly bacteria and fungi) that break down dead organic matter into inorganic nutrients. They are not assigned a trophic level but play a critical role in closing the cycle of matter. Without decomposers, nutrients would become locked up and unavailable to the rest of the ecosystem.",
          },
          {
            term: "Keystone species",
            def: "A species that exerts a disproportionately large influence on its ecosystem relative to its population size. Removal of a keystone species causes the food web to collapse and biodiversity to plummet sharply. Classic examples include sea otters, wolves, and predators of sea urchins.",
          },
        ],
        traps: [
          "Do not use 'food chain' and 'food web' interchangeably. A food chain is a simplified, linear model of energy flow; a food web is a realistic model in which multiple chains are interconnected. In IB ESS Paper 2 extended-response questions, if you are asked to 'analyse using a food web' and you present only a single chain, you will lose marks. Always mention the complexity — that a species may contribute to several trophic levels or draw on multiple food sources.",
          "Do not describe a keystone species simply as 'an important species.' The defining characteristic is a disproportionately large ecological impact relative to population size. A species that is merely abundant or merely rare may not be a keystone species. You must reference both the magnitude of the impact and the size of the population to earn full marks.",
        ],
        example:
          "Let's analyse keystone species and the food web using the 1995 wolf reintroduction into Yellowstone National Park. In the absence of wolves, elk populations exceeded carrying capacity and overbrowsed willows and aspens along riverbanks. This loss of vegetation caused bank erosion and river widening. After wolf reintroduction, elk behaviour changed (the 'ecology of fear'), riparian vegetation recovered, beavers returned and built dams, and the entire habitat structure was transformed. This case — in which a single species change led to the physical remodelling of the environment — is called a trophic cascade, and it vividly illustrates the interconnectedness of the food web.",
      },
      {
        title: "Ecological Pyramids and the 10% Rule",
        subtitle: "Why energy shrinks at each higher level — the second law of thermodynamics governs ecosystems",
        terms: [
          {
            term: "Pyramid of energy",
            def: "A pyramid showing the amount of energy available per unit time and area at each trophic level. It is always wider at the base and narrower at the top, and it is never inverted. It is the most reliable of the three types of ecological pyramid.",
          },
          {
            term: "10% rule (Lindeman's efficiency)",
            def: "The principle that, on average, only about 10% of the energy at one trophic level is converted into biomass at the next trophic level. The remaining 90% is lost as heat through respiration, excretion, and undigested material.",
          },
          {
            term: "Pyramid of numbers",
            def: "A pyramid showing the number of individual organisms at each trophic level. It can be inverted. For example, a single oak tree (first trophic level) can support thousands of aphids (second trophic level).",
          },
          {
            term: "Pyramid of biomass",
            def: "A pyramid showing the dry mass of organic matter (total biomass) at each trophic level. It is typically wider at the base, but it can be inverted in marine ecosystems where phytoplankton (producers) are consumed so rapidly that their standing biomass is lower than that of their consumers at a given point in time.",
          },
        ],
        traps: [
          "Remember that the pyramid of biomass can be inverted. In marine ecosystems, phytoplankton divide so quickly that their standing biomass at any given moment may appear less than that of their consumers. However, the pyramid of energy is never inverted. On IB ESS questions asking 'which pyramid can be inverted?', stating that the pyramid of energy can also be inverted is incorrect.",
        ],
        example:
          "Let's calculate energy flow in a grassland ecosystem using the 10% rule. If grasses (producers) fix 10,000 kJ of energy through photosynthesis in a year, then grasshoppers (second trophic level) can use approximately 1,000 kJ, frogs (third trophic level) approximately 100 kJ, snakes (fourth trophic level) approximately 10 kJ, and an eagle feeding on snakes would have access to only about 1 kJ. This calculation explains why a plant-based diet can support far more people than energy-intensive animal agriculture — a core issue in IB ESS.",
      },
    ],
  },
  {
    lessonId: "ib-ess-u2-l3",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 2,
    lessonNum: 3,
    unitName: "Ecosystems & Ecology",
    title: "Energy & Matter Flow, Biomes, and Succession — How Ecosystems Change",
    subtitle: "Linking GPP/NPP, biome distribution, and primary/secondary succession into a single framework",
    overview:
      "An ecosystem is not a static photograph. Energy flows from the sun into biomass and exits again as heat; matter cycles repeatedly. Climate draws the boundaries of biomes, and disturbance resets the clock of succession. Understanding the difference between GPP and NPP lets you calculate how much of Earth's productivity humans consume, and understanding succession explains why a forest looks different with every passing decade after a fire. IB ESS Internal Assessment (IA) requires the ability to measure these principles in the field.",
    objectives: [
      "Define the difference between gross primary productivity (GPP) and net primary productivity (NPP), and write the equation linking them through respiratory losses",
      "Explain the distribution of biomes using temperature and precipitation as the two key variables, and describe the characteristic communities of major biomes",
      "Distinguish between primary succession and secondary succession, and describe the pioneer species and climax communities at each stage",
      "Clearly differentiate zonation from succession and correctly apply each concept to case examples without confusion",
      "Describe ecological survey techniques — including mark-recapture, quadrat sampling, and transect methods — together with their appropriate uses",
    ],
    sections: [
      {
        title: "Productivity: GPP, NPP, and the Human Share",
        subtitle: "Subtract what respiration takes from what photosynthesis makes — what remains is the ecosystem's real fuel",
        terms: [
          {
            term: "Gross primary productivity (GPP)",
            def: "The total amount of energy or organic matter fixed by producers (plants and algae) through photosynthesis per unit time and area. This value includes the energy subsequently consumed by the producers' own respiration.",
          },
          {
            term: "Net primary productivity (NPP)",
            def: "The energy stored as biomass by producers after subtracting the energy used in their own respiration. NPP = GPP − plant respiration (R). It represents the upper limit of energy actually available to primary consumers.",
          },
          {
            term: "Biomass",
            def: "The total mass of organic matter present in a given area at a given time. Usually expressed as dry mass (g/m² or kJ/m²). NPP is the net rate of increase in biomass per unit time.",
          },
          {
            term: "Human appropriation of net primary production (HANPP)",
            def: "The proportion of global NPP that humans directly appropriate or destroy through agriculture, forestry, urbanisation, and other activities. Currently estimated at approximately 25–40% of Earth's NPP and closely linked to biodiversity loss.",
          },
        ],
        traps: [
          "Confusing GPP and NPP is the most common calculation error on IB ESS exams. Remember: GPP = the total output of photosynthesis; NPP = what the plant can actually invest in growth. The formula is NPP = GPP − R (plant respiration). Whenever a question asks for 'energy available to consumers', you must use NPP — using GPP is incorrect.",
          "A high-NPP ecosystem does not automatically have high biodiversity. Tropical rainforests have the highest NPP, but productivity and diversity are independent concepts. Coral reefs have low NPP yet extraordinarily high biodiversity. Treating productivity and diversity as synonyms will cost you marks.",
        ],
        example:
          "Let's compare the NPP of a tropical rainforest and a desert. A tropical rainforest has a GPP of approximately 3,500 g·m⁻²·yr⁻¹ and plant respiration of approximately 1,750 g·m⁻²·yr⁻¹, giving an NPP of approximately 1,750 g·m⁻²·yr⁻¹. A desert has a GPP of approximately 90 g·m⁻²·yr⁻¹ and respiration of approximately 45 g·m⁻²·yr⁻¹, leaving an NPP of only 45 g·m⁻²·yr⁻¹. The roughly 40-fold difference in energy available to herbivores over the same area is a direct consequence of biome differences created by precipitation, temperature, and light availability.",
      },
      {
        title: "Biomes, Zonation, and Succession",
        subtitle: "Climate draws the map of biomes; disturbance winds back the clock of succession",
        terms: [
          {
            term: "Biome",
            def: "A large-scale ecosystem type determined by characteristic climate (primarily temperature and precipitation), with a distinctive plant community structure adapted to those conditions. Examples include tropical rainforests, temperate grasslands, tundra, and deserts.",
          },
          {
            term: "Zonation",
            def: "The distribution of distinct communities at particular locations along a spatial environmental gradient (moisture, light, temperature, wave exposure, etc.). Classic examples include the vertical distribution of species in the intertidal zone and the altitudinal banding of vegetation on mountains. This is a change in space, not in time.",
          },
          {
            term: "Primary succession",
            def: "The development of a community on bare, previously uncolonised substrate — such as cooled lava fields or areas exposed by glacial retreat — where no prior community existed. Pioneer species are typically lichens and mosses, and the process takes hundreds to thousands of years to reach a climax community.",
          },
          {
            term: "Secondary succession",
            def: "The re-establishment of a community in a location where an existing community was destroyed — by wildfire, flooding, or agricultural abandonment — but where soil remains intact. Because soil and a seed bank already exist, secondary succession proceeds much faster than primary succession.",
          },
        ],
        traps: [
          "Confusing zonation with succession is one of the classic misconceptions in IB ESS. Zonation is about differences in community distribution across space (same time, different locations); succession is about changes in community composition over time (same location, different times). Questions that show a photograph of an intertidal zone and ask you to 'describe succession' are specifically designed to catch this error. Always ask yourself first: 'Is this a spatial gradient or a temporal change?'",
          "Do not describe a climax community as a permanent, unchanging final state. A climax community is relatively stable given the prevailing climate and soil conditions, but disturbances such as wildfires or storms will restart succession. The phrase 'stable but not static' scores highly against IB mark schemes.",
        ],
        example:
          "Let's trace primary succession step by step at Kilauea volcano in Hawaii. Stage 1: Lichens colonise cooled basaltic lava, secreting acid that weathers the rock and forms the first thin layer of soil. Stage 2: Mosses add organic matter, deepening the soil and increasing its water-holding capacity. Stage 3: Ferns and herbaceous plants establish themselves as soil microorganisms multiply. Stage 4: Shrubs move in, creating habitat for small animals. Stage 5: After several hundred years, ʻŌhiʻa tree forest forms the climax community. At each stage, pioneer species modify the environment in ways that allow the next set of species to establish — a process called facilitation, which drives primary succession.",
      },
      {
        title: "Ecological Survey Techniques",
        subtitle: "To survive the IA, you must know each sampling method and the reason you chose it",
        terms: [
          {
            term: "Quadrat sampling",
            def: "A technique using a square frame to measure the number, frequency, and percentage cover of organisms within a defined area. Effective for plants and low-mobility animals. Random placement of quadrats is essential for unbiased estimates.",
          },
          {
            term: "Belt / line transect",
            def: "A technique in which quadrats are placed at regular intervals along a straight line following an environmental gradient (e.g. vertical zonation in the intertidal zone, altitudinal change on a mountain) to record how community composition changes. Used to analyse zonation and community transition patterns.",
          },
          {
            term: "Mark-recapture method",
            def: "A method for estimating the size of a mobile animal population. A first sample is captured, marked, and released; a second sample is then captured and the proportion of marked individuals is used to estimate total population size. Lincoln–Petersen formula: N = (M × C) / R, where M = number marked initially, C = total in second capture, R = number of recaptured marked individuals.",
          },
        ],
        traps: [
          "Forgetting the assumptions of the mark-recapture method leads to significant mark loss on IB ESS evaluation questions. For the method to be valid: (1) marking must not affect the survival or behaviour of individuals; (2) there must be no significant births, deaths, or migration in the population between the two capture events; (3) marked individuals must mix randomly and uniformly throughout the entire population. If any of these conditions are violated, the estimate will be biased — and you must state this explicitly in extended-response answers.",
        ],
        example:
          "Let's look at how the line transect method is applied in a survey of intertidal zonation. Quadrats (0.5 × 0.5 m) are placed every 10 m from the high-tide mark to the low-tide mark. In each quadrat, total percentage cover, species list, and dominant species are recorded. The results reveal a clear zonation pattern: barnacles dominate the high intertidal zone, mussels and algae dominate the mid-intertidal zone, and kelp dominates the low intertidal zone. In your IA analysis, you must connect this spatial distribution to the abiotic factors responsible — wave exposure time and desiccation stress — to earn full marks.",
      },
    ],
  },
];
