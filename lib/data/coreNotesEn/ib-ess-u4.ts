/**
 * Core Notes English version — IB ESS Unit 4 (4.1–4.3).
 * Full content preserved (objectives · terms · traps · example) + exam-accurate narrative.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ESS_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-ess-u4-l1",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 4,
    lessonNum: 1,
    unitName: "Water & Aquatic Systems",
    title: "The Water Cycle and Water Resources — How the Earth Moves Water",
    subtitle: "The core of the IB ESS hydrosphere section: the hydrological cycle, ocean circulation, and the causes and management of water scarcity",
    overview:
      "Earth's water is in constant motion. Moisture evaporating from the oceans travels through the atmosphere, falls as precipitation, seeps underground or flows along rivers back to the sea — the hydrological cycle is the central mechanism that sustains life on Earth. Yet this cycle is being disrupted by human activity. Irrigation and urbanisation alter surface runoff, climate change destabilises precipitation patterns, and groundwater over-extraction is depleting fossil water resources accumulated over hundreds of thousands of years within mere decades. IB ESS Unit 4 requires you to understand the physical pathways by which water moves, and to analyse the causes, types, regional imbalances, and management strategies of water scarcity in an integrated way.",
    objectives: [
      "Explain the major stores and flows of the hydrological cycle with a labelled diagram, and compare the relative magnitudes of evaporation, transpiration, infiltration, and surface runoff",
      "Explain the role of thermohaline circulation in distributing global thermal energy and nutrients, and discuss disruption scenarios driven by climate change",
      "Distinguish between physical water scarcity and economic water scarcity, and analyse the regional context in which each appears, with examples",
      "Explain the impact of groundwater over-extraction and saltwater intrusion on the sustainability of water resources",
      "Evaluate the strengths and weaknesses of water resource management strategies — dams, desalination, rainwater harvesting, and water demand management — from environmental, social, and economic perspectives",
    ],
    sections: [
      {
        title: "The Hydrological Cycle and Thermohaline Circulation",
        subtitle: "How water moves — two giant conveyor belts that connect atmosphere, land, and ocean",
        terms: [
          {
            term: "Hydrological cycle",
            def: "The process by which water on Earth circulates among stores through evaporation, transpiration, precipitation, surface runoff, infiltration, and groundwater flow. Solar energy is the driving force of the cycle, and gravity moves water toward lower ground.",
          },
          {
            term: "Thermohaline circulation",
            def: "The global deep-ocean current system created by density differences arising from seawater temperature (thermo) and salinity (haline). High-density water cooled at the poles sinks and travels along the deep ocean toward the equator, returning at the surface in a conveyor-belt structure. It redistributes thermal energy, nutrients, and carbon on a global scale.",
          },
          {
            term: "Evapotranspiration",
            def: "A combined concept of evaporation from soil and water surfaces and transpiration through plant leaves. It represents the total amount of water moving from land to the atmosphere. Deforestation reduces transpiration, decreasing local precipitation and increasing surface runoff.",
          },
          {
            term: "Surface runoff",
            def: "Water that flows over the land surface without infiltrating the soil. Urbanisation (impermeable paving), deforestation, and soil compaction sharply increase surface runoff, raising flood risk and reducing groundwater recharge.",
          },
        ],
        traps: [
          "Do not use evaporation and evapotranspiration as if they were the same concept. Evaporation is the physical process occurring at a water surface, while evapotranspiration adds plant transpiration to evaporation. When discussing the water balance of terrestrial ecosystems you must use evapotranspiration, and also note that transpiration accounts for a large share of the total in forest ecosystems.",
          "Describing thermohaline circulation simply as 'the movement of warm surface water' will cost you marks. The key is that density differences caused by temperature and salinity are the driving force. In particular, describe the climate-regulating role of thermohaline circulation through the scenario in which a halt in North Atlantic Deep Water (NADW) formation rapidly cools Europe's climate. Linking this to the mechanism by which increased freshwater input from melting glaciers lowers salinity and weakens sinking earns top marks.",
        ],
        example:
          "Let's analyse the impact of urbanisation on the hydrological cycle using a systems diagram.\n\nA forested watershed in its natural state: of 100 units of precipitation, 40 go to evapotranspiration, 50 to infiltration, and 10 to surface runoff, giving active groundwater recharge.\n\nThe same watershed after urbanisation: impermeable paving (roads, car parks, building roofs) reduces infiltration to 10, evapotranspiration falls to 20, and surface runoff surges to 70.\n\nResults: ① increased frequency and magnitude of downstream flooding, ② falling groundwater levels causing wells to dry up, ③ a shorter time to peak flow after precipitation. This is represented on the 'urban hydrograph' as a higher, narrower peak curve. IB ESS Paper 1 data-analysis questions frequently require the ability to interpret hydrographs showing this pattern.",
      },
      {
        title: "Water Scarcity and Water Resource Management",
        subtitle: "There is enough water on Earth, so why do some people lack it — the difference between physical and economic scarcity",
        terms: [
          {
            term: "Physical water scarcity",
            def: "A state in which precipitation is absolutely insufficient, or available freshwater per capita falls below a critical threshold. Arid regions of the Middle East, North Africa, and sub-Saharan Africa fall into this category. Annual available freshwater of less than 1,000 m³ per person is defined as absolute water scarcity.",
          },
          {
            term: "Economic water scarcity",
            def: "A state in which water itself is present but cannot be accessed due to a lack of infrastructure, finance, technology, or governance. Parts of sub-Saharan Africa, where sufficient precipitation exists but safe water is hard to obtain because there is no purification or piping infrastructure, fall into this category.",
          },
          {
            term: "Desalination",
            def: "Technology that removes salt from seawater to produce drinking and agricultural water using reverse osmosis or multi-stage flash distillation. It is used as a major water strategy in Saudi Arabia, Israel, and Singapore. Drawbacks: high energy consumption and impacts on marine ecosystems from the discharge of high-salinity concentrated brine.",
          },
          {
            term: "Groundwater extraction",
            def: "The process of drawing up groundwater stored in an aquifer through wells and pumps. Over-extraction exceeding the recharge rate causes falling water tables, land subsidence, and saltwater intrusion in coastal areas. The depletion of aquifers in India's Punjab region is a representative case that threatens agricultural sustainability.",
          },
        ],
        traps: [
          "Do not oversimplify the water scarcity problem as merely 'there is no water.' IB ESS always requires you to distinguish physical scarcity from economic scarcity in your account. In particular, citing a region such as sub-Saharan Africa where economic scarcity is severe despite sufficient precipitation, and arguing that technology, governance, and poverty create inequality of water access — linked to the EVS (social ecology) perspective — earns top marks.",
          "Describing dam construction as 'the perfect solution to water resource problems' will cost you marks. Dams provide the benefits of flood control, power generation, and irrigation, but they simultaneously carry the costs of ① upstream ecosystem destruction, ② blocking fish migration, ③ downstream delta erosion from sediment trapping, ④ forced displacement of residents, and ⑤ methane emissions from reservoirs. The Three Gorges Dam is the typical example. Presenting strengths and weaknesses in a balanced way is central to the IB ESS assessment criteria.",
        ],
        example:
          "Let's analyse Israel's integrated water resource management as a case study.\n\nIsrael is a physically water-scarce country with annual precipitation of only 200–700 mm, where agricultural water demand exceeds half of total national consumption.\n\nThe bundle of strategies applied:\n① Drip irrigation: supplying water directly near the roots minimises evaporation losses, cutting water use by 30–50% compared with conventional sprinklers.\n② Wastewater reuse: 86% of treated wastewater is reused for agriculture — the highest level in the world.\n③ Desalination: four large desalination plants along the Mediterranean coast supply about 70% of urban drinking water.\n④ National Water Carrier: transports water from the Sea of Galilee to the Negev Desert in the south.\n\nIB ESS assessment point: describe that it is the combination of multiple strategies (a water portfolio), rather than any single technology, that enhances sustainability, and that combining renewable energy with high-energy-consumption desalination is the direction that lowers environmental costs.",
      },
    ],
  },
  {
    lessonId: "ib-ess-u4-l2",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 4,
    lessonNum: 2,
    unitName: "Water & Aquatic Systems",
    title: "Aquatic Food Production Systems — Can the Sea Feed Us?",
    subtitle: "Maximum sustainable yield, the ecology of overfishing, and the environmental costs and benefits of aquaculture",
    overview:
      "About 20% of humanity's protein comes from aquatic ecosystems. Fisheries and aquaculture are not simply a food issue but a system on which the food security of billions and the livelihoods of hundreds of millions depend. Yet this system is faltering. Over 90% of the world's commercial fish stocks are fully exploited or overfished, and aquaculture, which seeks to compensate, generates its own environmental costs. The core of the aquatic food production section in IB ESS Unit 4 is to understand the concept of maximum sustainable yield (MSY) through figures and graphs, to analyse the ecological, economic, and social causes and consequences of fishery collapse, and to evaluate the benefits and risks of aquaculture in a balanced way.",
    objectives: [
      "Explain the concept of maximum sustainable yield (MSY) using a yield–population size graph, and analyse the mechanism by which a fishery collapses when MSY is exceeded",
      "Explain the tragedy of the commons, subsidies and excess fishing capacity, and bycatch as causes of overfishing, and discuss possible solutions to each",
      "Explain the cascading effects of stock collapse on the food web and ecosystem structure using the concept of a trophic cascade",
      "Evaluate the environmental impacts of different types of aquaculture (habitat destruction, disease, genetic pollution, pollutant discharge) and compare them with sustainable aquaculture approaches",
      "Explain the principles and limitations of fisheries management strategies (catch quotas, no-take zones and closed seasons, gear regulations, eco-labelling, IUU fishing enforcement)",
    ],
    sections: [
      {
        title: "Maximum Sustainable Yield and the Ecology of Overfishing",
        subtitle: "The moment the peak of the MSY curve is exceeded — fish stocks race toward an unrecoverable state",
        terms: [
          {
            term: "Maximum sustainable yield (MSY)",
            def: "The maximum amount that can be harvested continuously from a fish population without depleting it over the long term. MSY is achieved when the population is at K/2 (half of carrying capacity), where the net growth rate is at its maximum. Continuing to harvest beyond MSY reduces the population to an unrecoverable level.",
          },
          {
            term: "Tragedy of the commons",
            def: "A concept proposed by Garrett Hardin. Each individual with access to a shared resource overexploits it to maximise short-term gain, but when everyone does so the resource is depleted and ultimately everyone is harmed — a collective-action problem. High-seas fisheries, lacking exclusive ownership, are prone to this tragedy.",
          },
          {
            term: "Bycatch",
            def: "Fish, marine mammals, sea turtles, and seabirds caught unintentionally alongside the target species. It is especially severe in trawling and longline fisheries. Global bycatch is estimated at about 40% of the annual catch, broadly disrupting ecosystem structure.",
          },
          {
            term: "Trophic cascade",
            def: "A phenomenon in which the removal or addition of an apex predator at the top of a food chain triggers ripple effects through the entire lower trophic levels. Overfishing of large predatory fish such as sharks and tuna causes an explosion of mesopredators (mid-sized fish) → a sharp decline in herbivorous and small fish → a proliferation of algae, in a cascade.",
          },
        ],
        traps: [
          "Do not oversimplify MSY as the ideal fishing target. MSY is theoretically sustainable, but in reality it has limitations: errors in estimating population size, fluctuations in K due to climate change, and the neglect of multi-species interactions within the ecosystem. Many ecologists recommend ecosystem-based fisheries management (EBFM), which sets actual management targets below MSY. Failing to mention MSY's limitations in IB ESS extended responses makes it hard to reach the top mark band.",
          "Do not describe overfishing merely as 'catching too many fish.' You must also explain the structural causes of overfishing — overcapacity created by fishing subsidies, the absence of ownership over the international high seas, and IUU (illegal, unreported, and unregulated) fishing. Explicitly link the 'tragedy of the commons' and propose Exclusive Economic Zones (EEZs), catch quotas, and eco-labelling as directions for a solution.",
        ],
        example:
          "Let's analyse the collapse of the Grand Banks cod fishery as a case of exceeding MSY.\n\n1960s–1980s: the Atlantic cod of Newfoundland's Grand Banks was one of the world's largest fish stocks. The large-scale deployment of advanced fish-finding technology and trawlers pushed the annual catch persistently above MSY.\n\n1992: the Canadian government declared an emergency fishing moratorium. The estimated population had collapsed to below 10% of the K/2 level that corresponds to MSY. About 35,000 fishery workers lost their jobs.\n\nAs of 2023: thirty years on, the cod population shows little sign of recovery. An increase in the predator (seal) population and climate change (rising water temperatures) have become new barriers obstructing recovery.\n\nIB ESS analysis points: describe all three layers — ① the biological tipping point (shrimp and crab filled the empty niche left by cod, so the food-chain structure itself changed), ② the tragedy of the commons (Canadian and EU vessels alike maximised short-term gain), and ③ the social cost (the collapse of fishing communities).",
      },
      {
        title: "Aquaculture — Solution or New Problem?",
        subtitle: "The two faces of the world's fastest-growing food industry",
        terms: [
          {
            term: "Aquaculture",
            def: "The commercial breeding, rearing, and harvesting of fish, crustaceans, molluscs, and seaweed in controlled environments. It accounts for about 50% of the world's seafood supply and is growing rapidly at an average of 5–6% per year. The main types are freshwater pond aquaculture (tilapia, carp), marine cage aquaculture (salmon, tuna), shellfish aquaculture (oysters, mussels), and shrimp farming.",
          },
          {
            term: "Mangrove conversion",
            def: "The clearing and reclamation of coastal mangrove forests to create shrimp and fish farms. Because mangroves serve as spawning grounds for coastal fisheries, filter terrestrial nutrients, store carbon, and protect coastlines, conversion creates the paradox of reducing overall coastal fishery productivity over the long term.",
          },
          {
            term: "Genetic pollution",
            def: "A phenomenon in which farmed fish escape from cages and interbreed with wild populations, lowering the genetic diversity and adaptability of the wild population. Farmed Atlantic salmon are selectively bred for fast growth, so interbreeding with wild salmon is known to reduce predator-avoidance and river-ascending abilities.",
          },
        ],
        traps: [
          "Do not describe aquaculture as 'a complete alternative to depleting fish stocks.' Carnivorous farmed fish such as salmon and tuna consume large amounts of fishmeal and fish oil to grow, requiring the large-scale harvesting of small fish (anchovies, herring). In other words, some aquaculture is structured to place additional pressure on wild fish stocks. In IB ESS extended responses you must present both the benefits of aquaculture (increased supply, potential to relieve pressure on wild fisheries) and this paradoxical cost.",
          "Do not narrow the environmental impact of aquaculture to 'pollution' alone. Besides pollution (the discharge of feed residues, antibiotics, and waste into water bodies), describe four categories: ① habitat destruction (mangrove removal), ② disease transmission (infection of wild fish by parasites such as sea lice), ③ genetic pollution, and ④ the risk of introducing alien species — this meets the top band of the IB ESS mark scheme.",
        ],
        example:
          "Let's analyse the environmental impact of Norway's Atlantic salmon aquaculture on multiple levels.\n\nBenefits:\n- As the world's largest producer of farmed salmon, it partly replaces fishing pressure on wild Atlantic salmon.\n- It provides a stable supply of high-protein food, contributing to food security.\n- It generates economic activity and employment in coastal regions.\n\nEnvironmental costs:\n① Fishmeal dependence: producing 1 kg of farmed salmon requires about 1.2–1.5 kg of wild fish raw material → pressure to overfish small fish.\n② Sea lice: high-density rearing in cages promotes parasite proliferation, infecting wild salmon smolts passing through the fjords and reducing their return rate.\n③ Genetic pollution: escaped farmed salmon interbreed with wild populations → weakening of wild traits.\n④ Organic discharge: feed residues and faeces accumulate on the seabed beneath the cages → forming localised hypoxic zones.\n\nSustainable direction: closed-loop Recirculating Aquaculture Systems (RAS) block pollutant discharge, and plant-based protein feeds are under development. In IB ESS you must also discuss the current limitations of these technical solutions (high energy costs).",
      },
    ],
  },
  {
    lessonId: "ib-ess-u4-l3",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 4,
    lessonNum: 3,
    unitName: "Water & Aquatic Systems",
    title: "Water Pollution — How Water Dies and the Strategies That Revive It",
    subtitle: "Completing the IB ESS water pollution section: eutrophication, BOD, indicator species, and management strategies",
    overview:
      "Rivers, lakes, and oceans are the final destination of everything humanity discards. Nitrogen and phosphorus running off from fertiliser tint rivers green, sewage flows into the sea and strips it of oxygen, and plastic contaminates the food chain. The core of water pollution is not so much 'which substance comes from where' as understanding 'how that substance disrupts the oxygen and nutrient balance within the water body.' IB ESS requires the ability to analyse the staged process of eutrophication with a systems diagram, to interpret biochemical oxygen demand (BOD) as a pollution indicator, and to use indicator species and chemical analysis in combination.",
    objectives: [
      "Distinguish between point source and non-point source water pollution and explain the differences in management strategy for each",
      "Represent the causes and stepwise process of eutrophication (nutrient input → algal bloom → oxygen depletion → death) with a systems diagram and analyse the feedback at each stage",
      "Explain the concept of biochemical oxygen demand (BOD) and interpret the principle by which BOD values indicate the degree of pollution in a water body",
      "Compare the principles of biological water quality assessment using indicator species with chemical analysis, and explain how they differ",
      "Evaluate the effectiveness and limitations of water pollution management strategies (sewage treatment, fertiliser-use regulation, buffer vegetation strips, international agreements) from environmental, economic, and social perspectives",
    ],
    sections: [
      {
        title: "Eutrophication and Biochemical Oxygen Demand",
        subtitle: "Water that dies from too much nutrition — how a single bag of fertiliser suffocates an entire river",
        terms: [
          {
            term: "Eutrophication",
            def: "The process by which excessive input of nutrients such as nitrogen (N) and phosphorus (P) into a water body causes an explosive proliferation of algae and cyanobacteria, and oxygen is depleted during their decomposition, leading to the mass death of aquatic organisms. Fertiliser runoff from farmland and sewage discharge are the main causes.",
          },
          {
            term: "Biochemical oxygen demand (BOD)",
            def: "The amount of oxygen consumed by aquatic microorganisms when they aerobically decompose organic matter (unit: mg O₂/L, usually measured over 5 days at 20°C). A higher BOD means more decomposable organic pollutants in the water body, and it is inversely related to dissolved oxygen (DO) levels. Clean water has BOD < 2 mg/L; severe pollution > 10 mg/L.",
          },
          {
            term: "Dissolved oxygen sag curve",
            def: "The characteristic 'U-shaped' oxygen-concentration curve in which, downstream of a point where pollutants enter a water body, dissolved oxygen (DO) decreases due to organic-matter decomposition and then recovers through reaeration and phytoplankton photosynthesis. Questions interpreting this graph appear on IB ESS Paper 1.",
          },
          {
            term: "Algal bloom",
            def: "A phenomenon in which an oversupply of nutrients causes algae and cyanobacteria to proliferate explosively, covering the water surface. Blocking sunlight reduces the photosynthesis of submerged plants, and after the algae die, microbial decomposition causes BOD to spike sharply while dissolved oxygen is depleted. Some cyanobacteria produce toxins (cyanotoxins) that even threaten drinking-water safety.",
          },
        ],
        traps: [
          "Do not stop at describing eutrophication merely as 'the water turning green.' IB ESS requires you to describe the causal mechanism of eutrophication stage by stage: ① nutrient input → ② algal bloom → ③ death of submerged plants due to light blockage → ④ explosion of decomposer bacteria on the dead matter → ⑤ increased BOD and decreased dissolved oxygen → ⑥ death of fish and invertebrates (hypoxic/anoxic conditions). Linking each stage as a positive feedback relationship earns top marks.",
          "Do not conclude that high BOD always means polluted water. BOD measures the amount of decomposable organic matter, so a tropical river with naturally abundant organic matter and active leaf-litter decomposition can also register a somewhat high BOD. Therefore in IB ESS you must state that water quality should be judged by integrating not only BOD but also dissolved oxygen (DO), pH, nitrate and phosphate concentrations, and indicator-species surveys.",
        ],
        example:
          "Let's analyse the process of lake eutrophication caused by agricultural runoff using a systems diagram.\n\nInput: during concentrated spring rainfall, nitrogen and phosphate fertilisers applied to farmland enter a nearby lake through surface runoff and groundwater.\n\nStage 1 — algal bloom: rising N and P concentrations → explosive proliferation of green algae and cyanobacteria → formation of a thick algal mat on the water surface.\n\nStage 2 — light blockage: the algal mat blocks sunlight → submerged aquatic plants (macrophytes) cannot photosynthesise → aquatic plants die.\n\nStage 3 — oxygen depletion: aerobic bacteria decompose the dead aquatic plants plus the dead algae → BOD surges → dissolved oxygen (DO) plummets (5 mg/L → below 1 mg/L) → an anoxic environment forms.\n\nStage 4 — ecosystem collapse: lowered DO causes mass death of fish and invertebrates → undecomposed organic matter accumulates → under anaerobic conditions phosphorus (P) is released again from the sediment (internal loading) → a self-reinforcing positive feedback of eutrophication.\n\nIn the IB ESS exam it is essential to practise representing this feedback loop with an arrow diagram and accurately marking the positive (+) / negative (−) relationships between each variable.",
      },
      {
        title: "Water Pollution Indicators and Management Strategies",
        subtitle: "How to recognise polluted water, and how to revive it",
        terms: [
          {
            term: "Indicator species",
            def: "An organism that reflects water quality conditions. An abundance of pollution-sensitive species (e.g. stonefly nymphs) indicates clean water, while dominance by pollution-tolerant species (e.g. Tubifex worms, rat-tailed maggots) indicates polluted water. It has the advantage of providing time-integrated water quality information compared with chemical analysis.",
          },
          {
            term: "Point source pollution",
            def: "Pollution discharged from a single, identifiable point such as a pipe or drain. Factory effluent and sewage-treatment-plant discharge fall into this category. Because the discharge point is clear, regulation and monitoring are relatively easy.",
          },
          {
            term: "Non-point source pollution",
            def: "Pollution that arises dispersed over a wide area. Fertiliser and pesticide runoff from farmland, urban storm runoff, and erosion from forest roads fall into this category. Because the sources are widespread and depend on season and rainfall, regulation and monitoring are difficult. It is one of the major causes of global water pollution.",
          },
        ],
        traps: [
          "Do not view indicator-species assessment and chemical water-quality analysis as opposing methods. The two methods are complementary. Chemical analysis precisely measures pollutant concentrations at a specific point in time, but leaves no trace once a pollution event has passed. Indicator-species surveys accumulate months to years of pollution history in the structure of the biological community, making them better suited to detecting chronic rather than one-off pollution. When comparing the strengths and weaknesses of the two in IB ESS extended responses, make this 'time-integration' the central point.",
          "In water pollution management, do not merely list technical solutions (sewage treatment plants). IB ESS requires you to describe management strategies at three levels: ① prevention before pollution occurs (reducing fertiliser use, buffer vegetation strips, organic farming), ② treatment at the stage pollution occurs (sewage treatment plants, retention ponds), and ③ international and institutional regulation (the EU Water Framework Directive (WFD), wetland protection under the Ramsar Convention). Also evaluating socioeconomic feasibility (the lack of sewage-treatment infrastructure in developing countries) makes for a top-mark response.",
        ],
        example:
          "Let's apply biological water quality assessment to a field case.\n\nSurvey stream: a small stream near farmland, with samples taken at three sites from upstream (reference) toward downstream.\n\nResults:\n- Site A (upstream, above the pollution source): 15 stonefly, 12 mayfly, 8 diving beetle individuals → high BMWP score → judged clean water.\n- Site B (directly downstream of farmland): 2 stonefly, 40 Chironomus (midge larvae), 55 Tubifex (sludge worm) individuals → low BMWP score → judged polluted water.\n- Site C (5 km downstream, recovery zone): 6 stonefly, 5 mayfly, 15 Chironomus individuals → intermediate water quality, judged to be recovering.\n\nIB ESS analysis points: ① the A→B change is the result of eutrophication, increased BOD, and decreased DO caused by fertiliser runoff from farmland (a non-point source), ② the B→C recovery is due to self-purification and reaeration, and ③ practise interpreting this data by linking it to the DO sag curve in IB ESS Paper 1 data questions.",
      },
    ],
  },
];
