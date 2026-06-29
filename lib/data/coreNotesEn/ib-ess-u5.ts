/**
 * Core Notes English version — IB ESS Unit 5 (5.1–5.3).
 * Full content preserved (objectives · terms · traps · example) + exam-accurate narrative.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ESS_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-ess-u5-l1",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 5,
    lessonNum: 1,
    unitName: "Soil Systems & Terrestrial Food Production",
    title: "Soil Systems — The Living Ecosystem Beneath Your Feet",
    subtitle: "Soil formation, profiles, physical and chemical properties, and ecosystem services — the core of the IB ESS soil section",
    overview:
      "We call it 'dirt,' but soil is a highly complex system created by rock, air, water, organic matter, and microorganisms interacting over thousands of years. A single handful of healthy soil contains more microorganisms than the entire human population of the planet. When this living system collapses, dozens of ecosystem services we take for granted — agricultural productivity, flood prevention, carbon storage, water purification — collapse simultaneously. IB ESS Unit 5 begins with understanding soil as a system. It requires the ability to comprehensively analyse the horizons of the soil profile, the triangular classification of soil texture, the role of soil biological communities, and the ecosystem services that soil provides.",
    objectives: [
      "Define soil as a system and represent its inputs, outputs, stores, and flows in a diagram",
      "Compare and explain the main horizons of the soil profile (O, A, B, C, R horizons) in terms of depth, colour, organic matter content, and permeability",
      "Use the soil texture triangle to classify soil by the proportions of sand, silt, and clay, and compare how each texture affects water-holding capacity, aeration, and crop productivity",
      "Explain the functional roles that soil organisms (bacteria, fungi, earthworms, arthropods) perform in soil formation and nutrient cycling",
      "Classify the ecosystem services provided by soil (food production, water filtration, carbon sequestration, flood buffering) into provisioning, regulating, cultural, and supporting services, and evaluate their value",
    ],
    sections: [
      {
        title: "Soil Profile and Texture",
        subtitle: "What you see when you cut into the ground vertically — different colour, texture, and function at each horizon",
        terms: [
          {
            term: "Soil profile",
            def: "The layered structure revealed when soil is cut vertically from the surface down to bedrock. Main horizons: the O horizon (organic layer, accumulation of leaf litter and humus), the A horizon (topsoil, the uppermost mineral layer rich in organic matter and the critical zone for plant growth), the B horizon (subsoil, accumulation of clay and iron oxides leached from above), the C horizon (fragments of weathered parent material), and the R horizon (bedrock). Each horizon differs markedly in colour, structure, and permeability.",
          },
          {
            term: "Soil texture triangle",
            def: "A chart that classifies soil into 12 texture classes using the mass proportions of sand (0.05–2 mm), silt (0.002–0.05 mm), and clay (< 0.002 mm). Loam, with a balanced mixture of all three particle sizes, has both excellent water-holding capacity and good aeration, making it ideal for crop production. The higher the clay content, the lower the permeability; the higher the sand content, the faster water drains away.",
          },
          {
            term: "Humus",
            def: "Stable, dark-brown organic matter formed when plant and animal organic material is fully decomposed by soil microorganisms. Humus promotes the formation of soil aggregates, increasing aeration and water-holding capacity, and raises the cation exchange capacity (CEC), retaining plant nutrients so they are not leached away. It is concentrated in the O and A horizons.",
          },
          {
            term: "Cation exchange capacity (CEC)",
            def: "The ability of soil to retain plant-available cation nutrients (Ca²⁺, Mg²⁺, K⁺, NH₄⁺) on its negatively charged surfaces. The more clay and humus present, the higher the CEC and the greater the fertility. In acidic soils, H⁺ ions occupy CEC sites, reducing the availability of plant nutrients.",
          },
        ],
        traps: [
          "Do not memorise the soil profile simply as 'soil with layers.' IB ESS requires you to connect and explain the formation process of each horizon (weathering, leaching, accumulation, biological activity). In particular, you must clearly state why the B horizon has a higher clay content than the A horizon — 'the accumulation of clay and oxides washed down from the topsoil by leaching.' You should also explain why bare soil lacking an O horizon has low fertility, linking it to humus loss and reduced CEC.",
          "Do not conclude that sandy soil is always worse for agriculture than clay soil. Clay-rich soil retains water well but has poor aeration and a risk of hardpan formation. Sandy soil drains quickly and is easy to till, and may actually be advantageous for crops where root development matters, such as carrots and potatoes. In IB ESS extended responses, you must argue, with context, that the advantages and disadvantages of soil texture depend on 'which crop is grown under which conditions.'",
        ],
        example:
          "Let's practise classifying soils using the soil texture triangle and interpreting the agricultural implications.\n\nSample A: sand 60%, silt 20%, clay 20% → falls within the 'sandy loam' zone on the soil texture triangle.\nSample B: sand 20%, silt 30%, clay 50% → falls within the 'clay' zone.\nSample C: sand 40%, silt 40%, clay 20% → falls within the 'loam' zone.\n\nAgricultural comparison:\n- Sample A (sandy loam): good drainage and easy tillage, moderate water-holding capacity → without irrigation, crops experience stress in the dry season. Suitable for maize and peanuts.\n- Sample B (clay): excellent water retention but poor aeration, risk of root rot when waterlogged, heavy and difficult to till → suitable for paddy cultivation (rice) but unfavourable for field crops.\n- Sample C (loam): a balance of all three particle sizes → excellent water retention, aeration, and nutrient supply → ideal for most vegetable and grain cultivation.\n\nIB ESS assessment point: the skill of reading the soil texture triangle accurately (proportions sum to 100%) and the ability to connect how each texture affects the choice of production system are central in data-interpretation questions.",
      },
      {
        title: "Soil Biological Communities and Ecosystem Services",
        subtitle: "The richest biodiversity on Earth lies beneath your feet — when soil organisms stop, the planet stops",
        terms: [
          {
            term: "Soil biota",
            def: "The collective term for all organisms living within the soil. It includes bacteria, fungi, actinomycetes, protozoa, nematodes, earthworms, mites, and springtails. They perform key functions such as decomposing organic matter, cycling nutrients, forming soil structure, and suppressing pathogens.",
          },
          {
            term: "Mycorrhiza",
            def: "Fungi that live in symbiosis with plant roots. The fungi extend the root surface area several hundredfold, helping the uptake of nutrients with low mobility such as phosphorus (P) and zinc, while the plant supplies the fungi with sugars (glucose) produced by photosynthesis. In intensive agriculture, the overuse of synthetic phosphate fertilisers suppresses mycorrhizal development.",
          },
          {
            term: "Carbon sequestration",
            def: "The process by which atmospheric carbon dioxide (CO₂) is stored long-term in the soil in the form of soil organic matter (SOM). The world's soils store about twice as much carbon as the atmosphere. Soil disturbance (tillage, deforestation) oxidises SOM and releases carbon back into the atmosphere, so soil management is directly linked to climate change mitigation strategies.",
          },
        ],
        traps: [
          "Do not reduce soil ecosystem services to the single function of 'a place where plants grow.' IB ESS requires you to discuss ecosystem services classified as provisioning services (food, fibre, fuel), regulating services (flood buffering, carbon sequestration, water filtration, climate regulation), supporting services (nutrient cycling, support of primary productivity), and cultural services (rural landscapes, traditional knowledge). Linking carbon sequestration and water filtration in particular to the mitigation of climate change and water pollution produces high-band responses.",
          "Do not describe earthworm activity simply as 'digging up the soil.' Earthworms perform multi-layered functions: ① concentrating nutrients through castings, ② improving aeration and permeability through burrowing (reducing surface runoff), ③ accelerating microbial decomposition by breaking organic matter into smaller pieces, and ④ buffering soil pH. In high-scoring IB ESS responses, the key is an integrated approach that connects one earthworm function to the rest of the soil-system processes.",
        ],
        example:
          "Let's analyse soil-system services by comparing the biodiversity of cropland and natural-forest soils.\n\nNatural broadleaf forest soil (Site A): earthworm density 200 individuals/m², mycorrhizal fungal diversity index H' = 3.2, organic matter content 8%, infiltration rate 50 mm/h, high soil respiration rate (analogous to BOD).\n\nIntensive cropland soil (Site B): earthworm density 20 individuals/m², mycorrhizal fungal diversity index H' = 0.8, organic matter content 1.5%, infiltration rate 8 mm/h, low soil respiration rate.\n\nInterpretation:\n① A tenfold decrease in earthworm density → reduced aeration and permeability at Site B → increased surface runoff during rainfall → higher flood risk + reduced groundwater recharge.\n② Decreased organic matter content → lower CEC → increased leaching of fertiliser nutrients → risk of eutrophication in downstream water bodies.\n③ Decreased mycorrhizal diversity → reduced efficiency of crop phosphorus uptake → need for additional phosphate fertiliser input → increased cost + greater environmental burden.\n\nIB ESS key message: when intensive agriculture reduces soil biodiversity, soil-system services across the board weaken in a chain reaction, which in turn creates a vicious cycle of greater dependence on synthetic inputs (fertilisers, pesticides). Practise representing this cycle as a positive feedback loop.",
      },
    ],
  },
  {
    lessonId: "ib-ess-u5-l2",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 5,
    lessonNum: 2,
    unitName: "Soil Systems & Terrestrial Food Production",
    title: "Terrestrial Food Production Systems — How Will We Feed Everyone?",
    subtitle: "Intensive agriculture vs. small-scale subsistence farming · input-output analysis · the conditions for sustainable food production",
    overview:
      "The ways in which we supply food to a world population now exceeding 8 billion are strained from two directions. On one side is intensive agriculture, which concentrates chemical fertilisers, pesticides, large machinery, and irrigation to pursue maximum output per unit area; on the other is small-scale subsistence agriculture, run on local resources without external inputs. IB ESS requires you to analyse these two systems not simply as 'modern agriculture vs. traditional agriculture,' but through a multidimensional sustainability-assessment framework that includes energy efficiency, biodiversity, environmental burden, and social equity. The key is not which system is better, but understanding which system creates which trade-offs under which conditions.",
    objectives: [
      "Compare the input-output flows of intensive agriculture and small-scale subsistence agriculture from energy, water, and nutrient perspectives, and calculate the energy efficiency (energy ratio) of each system",
      "Compare the ecological differences between monoculture and polyculture / intercropping in terms of biodiversity, pest resistance, and soil health",
      "Evaluate, in a balanced way, the achievements of the Green Revolution (increased production) and its ecological and social costs (loss of biodiversity, displacement of smallholders, groundwater depletion)",
      "Explain the principles and limitations of organic farming, agroecology, and precision agriculture, comparing them with modern intensive agriculture",
      "Apply the criteria used to assess the sustainability of food production systems (energy efficiency, biodiversity, soil health, social equity, carbon footprint), connecting them to EVS perspectives",
    ],
    sections: [
      {
        title: "Input-Output Analysis and Comparison of Agricultural Systems",
        subtitle: "It may be the same 100 g of wheat — but who invested how much to produce it determines its sustainability",
        terms: [
          {
            term: "Energy ratio / energy efficiency",
            def: "In an agricultural system, the ratio of output energy (food calories) to input energy (fossil-fuel energy consumed in manufacturing fertiliser, fuelling machinery, pumping irrigation, and synthesising pesticides). The energy efficiency of small-scale traditional agriculture is 5–50 or more (1 input calorie → 5–50 output calories), whereas modern intensive agriculture can be below 0.1–1. In other words, intensive agriculture is closer to a system that 'converts' fossil-fuel energy into food calories than one that 'creates' calories.",
          },
          {
            term: "Monoculture",
            def: "The practice of growing a single crop variety intensively over a large area. Its high mechanisation, harvest efficiency, and market access make it the mainstream of modern commercial agriculture. However, its genetic uniformity makes it vulnerable to the large-scale spread of pests and pathogens, and growing the same crop year-round selectively depletes specific nutrients.",
          },
          {
            term: "Green Revolution",
            def: "The agricultural-modernisation movement of the 1960s–1970s that dramatically increased food production in developing countries such as Mexico, India, and Pakistan by introducing high-yielding varieties (HYVs), synthetic fertilisers, pesticides, and irrigation as a package. Rice and wheat production in Asia increased 2–3 fold, helping to reduce famine, but it produced side effects: loss of biodiversity (extinction of traditional varieties), over-extraction of groundwater, pesticide pollution, and the debt and displacement of smallholders.",
          },
          {
            term: "Agroecology",
            def: "An approach that applies ecological principles to the design of agricultural systems to reduce dependence on external inputs and maximise ecosystem services. It combines intercropping, crop rotation, cover crops, biological pest control, and nitrogen fixation through legumes. It is also linked to the concept of food sovereignty for small-scale farmers.",
          },
        ],
        traps: [
          "Concluding that intensive agriculture is 'more efficient because output per unit area is high' loses marks in IB ESS. When the energy ratio is applied, intensive agriculture is actually energy-consuming. Yield per hectare and energy efficiency (energy output / energy input) are entirely different indicators, so you must always specify which criterion you are comparing by. IB ESS extended responses require systems to be evaluated by multiple criteria (energy, biodiversity, soil health, carbon footprint, social equity), not a single indicator.",
          "Do not describe the Green Revolution simply as 'positive agricultural modernisation,' nor flatten it to 'an event that ruined the environment.' From the EVS perspective in IB ESS, the Green Revolution must be evaluated simultaneously for ① its utilitarian benefits of reduced famine and food security, and ② its ecocentric and social-ecological costs of biodiversity loss, water-resource depletion, and smallholder inequality. Contrasting the two perspectives in your response is the high-scoring strategy.",
        ],
        example:
          "Let's compare the agricultural systems of Punjab, India before and after the Green Revolution using input-output analysis.\n\nBefore 1960 (traditional small-scale agriculture):\n- Main inputs: human labour, animal power, compost, rain-fed irrigation\n- Cultivated varieties: numerous locally adapted traditional wheat varieties (high varietal diversity)\n- Energy ratio: approximately 10–15\n- Wheat yield per unit area: approximately 0.8–1.2 t/ha\n\nAfter the 1980s Green Revolution:\n- Main inputs: fossil-fuelled machinery, synthetic nitrogen and phosphorus fertilisers, pesticides, groundwater irrigation (tube-well pumps)\n- Cultivated varieties: monoculture of 2–3 HYVs\n- Energy ratio: approximately 0.5–2\n- Wheat yield per unit area: approximately 4–5 t/ha\n\nEnvironmental outcomes:\n① Groundwater table: declining 0.5–1 m per year → long-term water-security crisis.\n② Soil health: organic matter declining due to intensive monoculture tillage, onset of soil salinisation.\n③ Biodiversity: hundreds of traditional varieties reduced to the point of being preserved only in seed banks.\n④ Social impact: large farms gained income, while smallholders increasingly faced displacement due to fertiliser and pesticide debt.\n\nIB ESS analysis point: presenting the inverse movement of yield per unit area and energy efficiency in a table, and contrasting short-term food-security benefits with long-term sustainability costs through the EVS lens (technocentric optimism vs. ecocentrism), earns high marks.",
      },
      {
        title: "Sustainable Food Production Strategies",
        subtitle: "Not more, but longer and more fairly — the equation 21st-century agriculture must solve",
        terms: [
          {
            term: "Organic farming",
            def: "A method of producing food without synthetic chemical fertilisers, pesticides, or growth hormones, relying instead on organic matter, biological pest control, and crop rotation. Yield per unit area averages 20–25% lower than intensive agriculture, but there are benefits for soil health, biodiversity, and consumer health. Because certification standards differ by country, there are reliability issues with the 'organic' label.",
          },
          {
            term: "Crop rotation",
            def: "A method of growing different crops on the same field in a changing sequence by season or year. Rotation including legumes replenishes soil nitrogen through nitrogen-fixing bacteria (rhizobium). It prevents the accumulation of specific pests and pathogens and the depletion of specific nutrients caused by monocropping the same crop.",
          },
          {
            term: "Precision agriculture",
            def: "Technology-intensive agriculture that uses GPS, satellite imagery, soil sensors, and drones to apply exactly the fertiliser, pesticide, and water needed in each sub-area of a field. By reducing over-application, it can simultaneously lower environmental burden and cost. Its limitations are the high initial technology-investment cost and limited accessibility for smallholders.",
          },
        ],
        traps: [
          "Do not conclude that organic farming is the only solution to sustainable food production. Because organic farming has lower yield per unit area, more cropland is required to produce the same amount of food — the 'land sparing vs. land sharing' dilemma. IB ESS requires you to evaluate the benefits of organic farming (soil health, biodiversity, consumer health) and its costs (low yield, high price, certification cost) in a balanced way, and to discuss its suitability in specific contexts (small-scale farms, consumer markets in developed countries, ecologically sensitive regions).",
          "Do not overrate precision agriculture as the technological solution to every agricultural problem. Precision agriculture increases input efficiency, but it entails structural limitations: ① dependence on expensive equipment and digital infrastructure, ② data-ownership issues (large agribusinesses collecting smallholder data), and ③ continued reliance on fossil-fuel-based machinery. From the EVS perspective in IB ESS, you must also discuss how technological innovation can deepen social inequality.",
        ],
        example:
          "Let's analyse Cuba's urban agriculture and its transition to agroecology.\n\nBackground: with the collapse of the Soviet Union in 1989, Cuba's supply of oil, synthetic fertilisers, pesticides, and food imports was suddenly cut off. A food crisis known as the 'Special Period' ensued.\n\nTransition process:\n- Urban vacant lots were converted into intensive small-scale gardens (organopónicos), applying compost, vermiculture, and biological pest control.\n- Large state farms were reorganised into small-scale cooperatives (cooperativas), introducing crop rotation and intercropping.\n- A partial return from machinery to ox-power farming → improved energy efficiency.\n\nResults:\n① Around 90% of Havana's vegetable demand was met by production within the city (early 2000s).\n② Chemical-pesticide use fell by more than 50%, and synthetic-fertiliser use was greatly reduced.\n③ Urban green space and biodiversity increased, and local employment was created.\n\nLimitations: self-sufficiency in staple grains such as rice and wheat remains difficult, and since the opening of international markets there has been a trend of partial re-conversion to intensive agriculture.\n\nIB ESS key analysis: as a case in which a crisis became the catalyst for an agroecological transition, describe with systems thinking how reduced dependence on external inputs causes short-term disruption but increases long-term resilience. The Cuban case also connects well to EVS perspectives (self-sufficiency, ecocentrism, social ecology).",
      },
    ],
  },
  {
    lessonId: "ib-ess-u5-l3",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 5,
    lessonNum: 3,
    unitName: "Soil Systems & Terrestrial Food Production",
    title: "Soil Degradation and Conservation — Protecting What Takes a Thousand Years to Replace Once Lost",
    subtitle: "Causes and mechanisms of erosion, salinisation, and desertification · evaluating soil-conservation strategies",
    overview:
      "It takes nature 100–1,000 years to create 1 cm of topsoil. Humans are losing it in just a few decades. About 33% of the world's cropland is already in a state of moderate or worse degradation, and every year an area many tens of times the size of Seoul permanently loses its agricultural productivity. Soil degradation is not simply a physical problem of 'soil disappearing.' It erodes food-production capacity, releases carbon into the atmosphere, pollutes downstream water bodies, and breaks down rural communities. The final part of IB ESS Unit 5 requires understanding the causes and mechanisms of erosion, salinisation, and desertification, and the ability to evaluate the effectiveness and limitations of soil-conservation strategies on multiple levels.",
    objectives: [
      "Explain the main causes of soil erosion (deforestation, tillage, overgrazing, slope agriculture, rainfall impact) and the physical mechanisms (rill, sheet, and gully erosion), and analyse the factors affecting erosion rate",
      "Explain the causes of soil salinisation (over-irrigation, conditions where evaporation > precipitation, poor drainage) and the mechanism of crop-productivity decline",
      "Define desertification as the combined result of soil degradation, climate change, and human activity, and explain the factors accelerating desertification in vulnerable arid regions, connecting them to UNCCD criteria",
      "Compare and evaluate the principles and effectiveness of soil-conservation strategies such as contour ploughing, shelter belts, terracing, cover crops, minimum tillage / no-till, and land-use planning",
      "Evaluate the achievements and limitations of international efforts to address soil degradation and desertification (the UNCCD Convention to Combat Desertification, the African Great Green Wall Initiative)",
    ],
    sections: [
      {
        title: "Soil Erosion and Salinisation",
        subtitle: "Two ways soil disappears — water and wind sweep it away, or salt kills it",
        terms: [
          {
            term: "Soil erosion",
            def: "The process by which soil particles are detached, transported, and deposited from their original location by water (water erosion), wind (wind erosion), and gravity. Raindrop splash destroys soil aggregates, and surface runoff carries fine particles downstream. It is most severe on bare ground without vegetation cover, on slopes, and in regions with strong seasonal variation where rainfall is concentrated. Globally, about 25 billion tonnes of topsoil are lost each year.",
          },
          {
            term: "Soil salinisation",
            def: "The process by which salts (NaCl, Na₂SO₄, etc.) in irrigation water accumulate in the surface layer of soil in arid and semi-arid regions. When evaporation exceeds precipitation and drainage under hot, low-humidity conditions, salts move to the surface by capillary action and crystallise. The resulting rise in soil osmotic pressure prevents crops from absorbing water and nutrients, causing yields to plummet, and in severe cases a white salt crust forms, rendering the land unfit for agriculture.",
          },
          {
            term: "Desertification",
            def: "The process by which land productivity is permanently reduced in arid, semi-arid, and dry sub-humid regions through the combined effects of climate variability and human activity (deforestation, overgrazing, intensive cultivation, overuse of water resources). According to the UNCCD (UN Convention to Combat Desertification), about 1.5 billion people live in regions at risk of desertification, with sub-Saharan Africa, Central Asia, and north-western China being especially vulnerable.",
          },
          {
            term: "Rill and gully erosion",
            def: "The process by which concentrated surface runoff creates shallow channels (rills) on the soil surface that deepen into ravines (gullies). Gully erosion is difficult to reverse even with tillage or revegetation and can render land permanently unfit for agriculture.",
          },
        ],
        traps: [
          "Do not explain soil erosion solely through the topographic factor that 'steeper slopes mean more severe erosion.' IB ESS requires you to explain that erosion rate is the product of multiple factors: ① vegetation cover, ② soil structure (aggregate stability), ③ rainfall intensity and concentration, and ④ land-management practices (tillage direction, cultivation frequency). Referring to the factors of the USLE (Universal Soil Loss Equation) and noting that each factor is individually manageable produces a high-band answer.",
          "Do not describe soil salinisation solely through the simple cause of 'too much irrigation.' For salinisation to occur, three conditions must be met: ① the irrigation water contains salts, ② an arid climate where evapotranspiration exceeds precipitation + drainage, and ③ poor drainage causing the water table to rise. Using the representative case of cotton agriculture in the Aral Sea basin (Uzbekistan, Kazakhstan), describing the chain of over-irrigation → falling Aral Sea level → expansion of salt-exposed land → desertification produces a high-scoring IB ESS answer.",
        ],
        example:
          "Let's analyse the irrigation-soil salinisation problem in Australia's Murray-Darling Basin.\n\nBackground: the Murray-Darling Basin is Australia's largest breadbasket, where wheat, grapes, cotton, and orchards are grown by large-scale irrigated agriculture.\n\nSalinisation mechanism:\n① Originally, deep underground in this region there was a salt layer where salts had accumulated over thousands of years.\n② After European settlement, deforestation removed the deep roots of trees, causing the water table to rise.\n③ Additional irrigation water input → the water table rose further → the salt layer moved closer to the surface.\n④ During evaporation, salts crystallised at the surface → soil osmotic pressure rose → crops died.\n\nCurrent situation:\n- More than about 300,000 ha of the basin's cropland is affected by salinisation.\n- Salt entering rivers from salinised cropland degrades the quality of drinking and irrigation water in downstream areas.\n\nManagement strategies:\n① Creating vegetation belts (reforestation) to control the water table.\n② Improving drainage (subsurface drainage) to remove salts.\n③ Introducing salt-tolerant crops (halophytes) and transitioning to salt-producing agriculture.\n\nIB ESS analysis point: represent the positive feedback of deforestation → rising water table → salinisation → reduced productivity → need for more irrigation → worsening salinisation in a diagram, and practise analysing which feedback loop each management strategy breaks.",
      },
      {
        title: "Soil Conservation Strategies and International Responses",
        subtitle: "Can lost soil be restored? — from field strategies to international conventions",
        terms: [
          {
            term: "Contour ploughing",
            def: "A method of cultivating along the contour lines (the same elevation) horizontally rather than in the direction of the slope. It blocks surface runoff and slows the downslope movement of soil particles, reducing erosion by 50–70%. Terracing is the development of contour ploughing into stepped structures; the Ifugao Rice Terraces in the Philippines, with thousands of years of history, are registered as a UNESCO cultural heritage site.",
          },
          {
            term: "Minimum tillage / No-till farming",
            def: "A method of not tilling the soil at all, or tilling minimally, to conserve soil structure and organic matter. Because tillage destroys soil aggregates, oxidises organic matter, and creates bare ground vulnerable to erosion, no-till prevents this. Crop residues from cover crops are left on the surface to cushion raindrop impact and retain moisture. There are large-scale adoption cases in the USA, Brazil, and Argentina.",
          },
          {
            term: "African Great Green Wall",
            def: "A UNCCD-led international initiative to create a roughly 8,000 km-long vegetation corridor crossing the African continent from Senegal to Ethiopia, to halt desertification in the Sahel. Through an integrated approach combining tree planting, land restoration, and local community participation, it aims to restore 100 million ha by 2030.",
          },
        ],
        traps: [
          "Do not simply list soil-conservation strategies — describe them by connecting 'which strategy is effective under which conditions.' For example, contour ploughing is effective on moderate slopes below 15°, but terracing is required on steep slopes above 15°. Shelter belts are suited to arid plains where wind erosion dominates, but cover crops are more effective against rill erosion in tropical rainforest regions. IB ESS requires you to discuss how strategy selection depends on topographic, climatic, and socio-economic context.",
          "Do not oversimplify the African Great Green Wall as 'a project that just plants trees.' Initially it focused on tree planting, but under local climatic and soil conditions simple planting alone had a low-survival-rate problem. It has now evolved into a concept of 're-landscaping' that includes agroforestry, farmer-managed natural regeneration (FMNR) of native vegetation, integration of local food production, and capacity-building of local communities. To meet the high-band IB ESS assessment criteria, you must describe its achievements (the FMNR success case in Niger) together with its limitations of insufficient funding and weak governance in a balanced way.",
        ],
        example:
          "Let's analyse the Soil and Water Conservation (SWC) programme in Ethiopia's Tigray region.\n\nBackground: the Tigray highlands experienced widespread soil erosion and desertification due to severe drought and deforestation in the 1970s–1980s. More than 80% of rainfall is concentrated in a 3-month monsoon and is of high intensity, causing severe topsoil erosion.\n\nThe bundle of strategies applied:\n① Contour stone bunds: stacking stones along the contours to slow surface-runoff velocity and trap soil and moisture upslope of the bunds.\n② Infiltration trenches: directing rainwater underground to recharge groundwater and disperse erosion energy.\n③ Hillside closure: designating particular slopes as grazing-free zones for 3–5 years to induce natural vegetation recovery.\n④ Cover plants and perennial grassland: minimising bare cropland before the monsoon.\n\nResults (20-year monitoring):\n- In some areas the water table rose 0.5–2 m → springs reappeared in the dry season.\n- Reported measurements of 50–70% reduction in topsoil loss.\n- Increased plant-species diversity (rising vegetation cover).\n- 30–40% increase in grain production per capita among local farmers.\n\nLimitations: because it relies on large-scale labour and community organisation, there is a risk that programme continuity weakens during political instability. Replicability to other regions depends heavily on local community capacity and governance.\n\nIB ESS analysis point: in this case, describe how an integration of SWC techniques — rather than a single technology — produces synergistic effects, and how social capital (community cooperation, land-use rules) is as important as the physical techniques, connecting this to the EVS perspective (social ecology).",
      },
    ],
  },
];
