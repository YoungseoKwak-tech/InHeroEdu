/**
 * Core Notes English version — IB ESS Unit 6 (6.1–6.3).
 * Full content preserved (objectives · terms · traps · example) + exam-accurate narrative.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ESS_U6_EN: CoreNote[] = [
  {
    lessonId: "ib-ess-u6-l1",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 6,
    lessonNum: 1,
    unitName: "Atmospheric Systems & Society",
    title: "Atmospheric Structure and the Energy Balance — The Invisible Blanket Wrapping the Earth",
    subtitle: "Atmospheric composition, vertical layering, the natural greenhouse effect, and the global energy balance — the core of the IB ESS atmosphere unit",
    overview:
      "Earth's atmosphere is only about 100 km thick, yet without this thin layer of gases the planet's average temperature would be −18°C rather than the current +15°C — a world where life could not exist. The atmosphere is not a simple pocket of air. It is a highly structured system in which composition, pressure, and temperature change dramatically with altitude, and it acts as Earth's energy regulator, balancing incoming solar radiation against the long-wave radiation the planet emits. IB ESS Unit 6 begins with understanding the atmosphere as a system. You are required to be able to describe the atmospheric composition made up of nitrogen, oxygen, argon, carbon dioxide, and water vapour; the vertical structure running from the troposphere up to the exosphere; and how greenhouse gases keep Earth's surface temperature within a habitable range, understood through an energy-balance model.",
    objectives: [
      "Explain the major components of the atmosphere (N₂·O₂·Ar·CO₂·H₂O·CH₄·N₂O) in terms of their proportions and roles, and distinguish naturally occurring components from those altered by human activity",
      "Compare the atmospheric layers (troposphere, stratosphere, mesosphere, thermosphere) by altitude, temperature gradient (lapse rate), and key processes, and explain the function each layer performs in the Earth system",
      "Explain how the natural greenhouse effect works, in terms of the wavelength difference between solar (short-wave) and terrestrial (long-wave) radiation and the absorption–re-emission mechanism of greenhouse gases",
      "Explain the global energy balance quantitatively in terms of incoming solar radiation, albedo, atmospheric absorption, surface emission, and the greenhouse effect, and predict the consequences when the balance is disrupted",
      "Clearly distinguish the natural greenhouse effect from the enhanced greenhouse effect, and evaluate how human activity affects the energy balance through changes in atmospheric composition",
    ],
    sections: [
      {
        title: "Atmospheric Composition and Vertical Structure",
        subtitle: "Slice the atmosphere vertically — temperature, pressure, and function change completely with altitude",
        terms: [
          {
            term: "Atmospheric composition",
            def: "On a dry-air basis, the main components are nitrogen (N₂) ≈ 78%, oxygen (O₂) ≈ 21%, argon (Ar) ≈ 0.93%, and carbon dioxide (CO₂) ≈ 0.042% (420 ppm, as of 2024). Water vapour (H₂O) ranges from 0–4% and varies greatly by location and season. Methane (CH₄), nitrous oxide (N₂O), ozone (O₃), and halocarbons are present in trace amounts but play decisive roles in the greenhouse effect and ozone-layer chemistry. Atmospheric composition has changed continuously throughout Earth's history through biological activity (photosynthesis and decomposition), volcanic activity, and human industrial activity.",
          },
          {
            term: "Troposphere",
            def: "The lowest atmospheric layer, extending from the surface to roughly 8–16 km (8 km at the poles, 16 km at the equator). About 75% of atmospheric mass and almost all water vapour and weather phenomena are concentrated here. It is characterised by a negative environmental lapse rate (temperature falling with altitude, averaging 6.5°C/km). Convection is vigorous, so energy, moisture, and pollutants mix actively in the vertical. Temperature stabilises temporarily at the tropopause, the upper boundary of the troposphere.",
          },
          {
            term: "Stratosphere",
            def: "The region above the tropopause, roughly 12–50 km. The ozone layer (ozone layer, about 20–35 km) absorbs ultraviolet radiation (UV-B and UV-C), so temperature actually rises with altitude — an inversion structure (positive temperature gradient). This temperature inversion suppresses convection, so the stratosphere has almost no vertical mixing, and once pollutants (including ODS) enter, they remain for decades. It is also the main cruising-altitude band for aircraft.",
          },
          {
            term: "Albedo",
            def: "The proportion of incoming solar radiation reflected by the surface, clouds, ice, or atmosphere (0–1, or 0–100%). Fresh snow and ice: 0.8–0.9; clouds: 0.5–0.7; desert: 0.3–0.4; forest: 0.1–0.2; ocean: 0.05–0.1. Earth's mean albedo is about 0.30, meaning roughly 30% of incoming solar radiation is reflected back to space. Changes in albedo (for example, a reduction in ice cover) trigger a positive feedback in the global energy balance.",
          },
        ],
        traps: [
          "Do not confuse the direction of the temperature gradient in the stratosphere and the troposphere. In the troposphere, rising altitude → falling temperature (consistent with everyday experience); in the stratosphere, rising altitude → rising temperature (ozone absorbs UV and heats the layer). IB ESS exams frequently include questions requiring you to read an atmospheric temperature-profile graph. You must accurately read the point at each layer boundary (interface) where the temperature gradient reverses, and explain 'why' by linking it to ozone–UV absorption or the suppression of convection.",
          "Do not label the natural greenhouse effect as 'pollution' or a 'problem.' The natural greenhouse effect is a process essential for sustaining life, and without greenhouse gases Earth's average temperature would drop to −18°C. In IB ESS you must always distinguish the natural greenhouse effect (an essential life-supporting mechanism) from the enhanced greenhouse effect (driven by human activity and a cause of climate change). Conflating the two concepts loses marks against the assessment criteria.",
        ],
        example:
          "Let's carry out a quantitative analysis using the global energy-balance model.\n\nBaseline figures (approximations commonly used in IB ESS):\n- Solar constant: about 1,361 W/m²\n- Spherical correction (divide by 4): about 340 W/m²\n- Reflection (albedo, 30%): about 102 W/m² reflected\n- Atmosphere/surface absorption: 340 − 102 = 238 W/m²\n\nTemperature calculation:\n- Black-body radiation law (Stefan–Boltzmann): E = σT⁴. The black-body temperature emitting 238 W/m² is T = (238/5.67×10⁻⁸)^0.25 ≈ 255 K = −18°C\n- Actual mean global temperature ≈ +15°C\n- Difference = 33°C → this is the warming contributed by the natural greenhouse effect\n\nContribution by component:\n- Water vapour (H₂O): about 50% (the largest contributor to the greenhouse effect)\n- CO₂: about 20%\n- Others (CH₄·N₂O·ozone): the remainder\n\nIB ESS assessment point: rather than memorising these figures, the key skill is the ability to explain 'why the difference between −18°C and +15°C arises' by linking it to short-wave and long-wave radiation and the absorption–re-emission mechanism of greenhouse gases. Practise drawing the energy-balance diagram (atmospheric window, back radiation, surface long-wave emission) and labelling each arrow.",
      },
      {
        title: "The Greenhouse Effect and the Energy Balance",
        subtitle: "How greenhouse gases keep Earth warm — the selective absorption of short-wave and long-wave radiation",
        terms: [
          {
            term: "Greenhouse gases (GHGs)",
            def: "A collective term for atmospheric gases that absorb and re-emit long-wave (infrared) radiation. Major natural greenhouse gases: water vapour (H₂O), carbon dioxide (CO₂), methane (CH₄), nitrous oxide (N₂O), ozone (O₃). Anthropogenically added greenhouse gases: HFCs (hydrofluorocarbons), PFCs (perfluorocarbons), SF₆. The strength of each gas's greenhouse effect is compared using the Global Warming Potential (GWP, with CO₂ = 1 as the reference): CH₄ = 28, N₂O = 265 (on a 100-year basis). Atmospheric residence time also matters: CO₂ persists for hundreds to thousands of years, CH₄ for about 12 years.",
          },
          {
            term: "Enhanced greenhouse effect",
            def: "The phenomenon in which the concentrations of CO₂, CH₄, and N₂O in the atmosphere rise through fossil-fuel combustion, deforestation, agriculture, and industrial activity, producing additional warming beyond the natural greenhouse effect. Pre-industrial CO₂ was about 280 ppm → about 422 ppm in 2024 (an increase of roughly 51%). This change drives the net radiative forcing in the global energy balance in the positive (+) direction, causing a rise in global mean temperature, increased frequency of extreme weather, sea-level rise, and ocean acidification.",
          },
          {
            term: "Radiative forcing",
            def: "An index expressing how much energy imbalance (W/m²) at the tropopause is produced by changes in atmospheric composition, solar activity, or surface reflectivity. Positive (+) radiative forcing means warming; negative (−) radiative forcing means cooling. As of 2011, the total anthropogenic radiative forcing was about +2.3 W/m² (IPCC AR5). CO₂ is the largest positive forcing, and aerosols are the negative forcing with the greatest uncertainty.",
          },
        ],
        traps: [
          "Do not wrongly state that CO₂ is the most powerful of the greenhouse gases. In terms of contribution to the greenhouse effect, water vapour (H₂O) is the largest contributor. However, water vapour is a feedback gas in the climate system: humans do not directly increase atmospheric water vapour; rather it operates as a positive feedback — rising temperature → increased evaporation → more water vapour → additional warming. When discussing the 'forcing' of climate change in IB ESS, you must address gases whose emissions have increased anthropogenically, such as CO₂·CH₄·N₂O, and explain water vapour separately as a 'feedback.'",
          "Remember that a change in albedo does not simply end at 'increased reflectivity = cooling.' Reduction in ice cover → decreased albedo (dark ocean exposed) → increased energy absorption → additional warming → further ice loss is a positive feedback loop, and it is the core mechanism of Arctic amplification. IB ESS requires the ability to represent such feedback loops as diagrams and to describe them in systems-thinking language (positive/negative feedback, tipping point).",
        ],
        example:
          "Let's analyse the relationship between changing atmospheric CO₂ concentration and the global energy balance using Mauna Loa data.\n\nKey data from the Keeling Curve:\n- Measurement began in 1958: 315 ppm\n- 1988: 351 ppm\n- 2015: surpassed 400 ppm\n- 2023 peak: 424 ppm\n\nInterpreting the seasonal oscillation:\n- Each year peaks in May–June and bottoms out in September–October → the spring–summer photosynthesis (CO₂ uptake) and autumn–winter decomposition (CO₂ release) of Northern Hemisphere vegetation are reflected in global CO₂ concentration.\n- This oscillation amplitude has increased slightly over the decades → a signal of changing intensity in the ecosystem's carbon cycle.\n\nLink to the energy balance:\n- Change from 280 ppm (pre-industrial) → 422 ppm → radiative forcing of +2.1 W/m² (CO₂'s contribution alone)\n- Global mean temperature has risen 1.1°C (since the industrial revolution, IPCC AR6)\n\nIB ESS assessment point: practise reading the Keeling Curve graph to distinguish ① the long-term rising trend (anthropogenic fossil-fuel combustion), ② the seasonal oscillation (the natural carbon cycle), and ③ the accelerating rate of increase (a positive-feedback signal). Data-interpretation questions frequently ask you to 'explain the cause of the seasonal oscillation in terms of the photosynthesis–respiration cycle of Northern Hemisphere vegetation.'",
      },
    ],
  },
  {
    lessonId: "ib-ess-u6-l2",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 6,
    lessonNum: 2,
    unitName: "Atmospheric Systems & Society",
    title: "The Stratospheric Ozone Layer — How Earth's Ultraviolet Shield Was Punctured",
    subtitle: "Ozone formation and destruction mechanisms · the catalytic reactions of ODS and CFCs · UV health impacts · the Montreal Protocol",
    overview:
      "The stratospheric ozone layer, if expressed as a thickness, is only about 3 mm under standard atmospheric-pressure conditions. Yet this extremely thin band of concentrated ozone absorbs more than 90% of the UV-B and UV-C coming from the Sun, protecting life on Earth. Without the ozone layer, UV-B would directly damage DNA, causing a surge in skin cancer and cataracts, and marine phytoplankton would die off, collapsing the entire marine food chain. In the 1970s it was discovered that CFCs (chlorofluorocarbons), which humans casually used as refrigerants, aerosol propellants, and foaming agents, catalytically destroy ozone in the stratosphere, and in 1985 an ozone hole was discovered over Antarctica. Humanity then concluded the most successful environmental treaty in history, the Montreal Protocol (1987), which phases out ozone-depleting substances (ODS). IB ESS requires you to understand the mechanism of ozone chemistry accurately and to critically evaluate the achievements and limitations of the policy response.",
    objectives: [
      "Explain the mechanism by which stratospheric ozone is formed and maintained through the natural reaction cycle between oxygen and ozone (the Chapman cycle), linking it to the UV-absorption process",
      "Explain step by step the reaction mechanism by which ODS such as CFCs, halons, and HCFCs release chlorine (Cl) and bromine (Br) radicals in the stratosphere and catalytically destroy ozone",
      "Explain how a reduction in stratospheric ozone concentration affects skin cancer, cataracts, immune suppression, and marine ecosystems (decline in phytoplankton) through an increase in surface UV-B exposure",
      "Evaluate the main provisions of the Montreal Protocol (phased ODS regulation, grace periods for developing countries, technology transfer, the Multilateral Fund) and its achievements (signals of stratospheric ozone recovery), and discuss its interaction with climate-change agreements",
      "Analyse the problem of ozone-layer depletion from an EVS perspective (technological optimism, the precautionary principle, the ethics of international cooperation), and derive the conditions for a successful international environmental treaty",
    ],
    sections: [
      {
        title: "Ozone Formation and Catalytic Destruction by ODS",
        subtitle: "The shield built by the Chapman cycle — and how a single Cl radical destroys 100,000 molecules",
        terms: [
          {
            term: "Ozone layer / ozonosphere",
            def: "The band, at roughly 20–35 km altitude in the stratosphere, where ozone (O₃) is naturally concentrated at high levels. Compressing all the atmosphere's ozone to standard pressure and 0°C gives a thickness of about 3 mm, measured in Dobson Units (DU) (1 DU = 0.01 mm of ozone-layer thickness). Normal stratospheric ozone concentration is about 220–460 DU. During the Antarctic ozone hole it drops below 100 DU. It selectively absorbs UV-B (280–315 nm) and UV-C (100–280 nm), preventing them from reaching the surface.",
          },
          {
            term: "Chapman cycle",
            def: "The reaction cycle in which ozone is naturally produced and destroyed in the stratosphere, reaching a dynamic equilibrium. Key reactions: ① O₂ + UV-C → 2O (photodissociation of the oxygen molecule), ② O + O₂ + M → O₃ + M (ozone formation, where M is a collision partner), ③ O₃ + UV-B → O₂ + O (photodissociation of ozone, absorbing UV), ④ O + O₃ → 2O₂ (ozone destruction). Reaction ③ is the key process that absorbs UV-B, and when ozone formation and destruction are in balance, total ozone is kept constant.",
          },
          {
            term: "Ozone-depleting substances (ODS)",
            def: "A collective term for chemicals that reach the stratosphere and catalytically destroy ozone. CFCs (chlorofluorocarbons): used as refrigerants in fridges and air conditioners, aerosol propellants, and foaming agents. Halons: used in fire extinguishers, containing bromine. HCFCs (hydrochlorofluorocarbons): introduced as CFC substitutes but still ozone-depleting. CFCs are chemically very stable in the troposphere, so after a residence of 10–100 years they reach the stratosphere, where they are broken down by strong UV-C and release Cl radicals.",
          },
          {
            term: "Catalytic ozone destruction",
            def: "The mechanism by which a Cl radical (or Br radical) is not consumed in the ozone-destruction reaction but is regenerated, chain-destroying tens of thousands to over 100,000 ozone molecules. Key reactions: ① Cl + O₃ → ClO + O₂, ② ClO + O → Cl + O₂. Net reaction: O₃ + O → 2O₂ (Cl is regenerated as a catalyst). On the surfaces of polar stratospheric clouds (PSCs) in the Antarctic winter stratosphere, this reaction accelerates explosively, forming the ozone hole.",
          },
        ],
        traps: [
          "Confusing the reduction of stratospheric ozone with the increase of tropospheric ozone is the most frequent error in IB ESS. Stratospheric ozone = a protective shield (absorbs UV, beneficial); tropospheric ozone = a pollutant (a component of photochemical smog, a respiratory irritant, harmful to plants). Both have the same chemical formula (O₃), but their roles are opposite depending on location. In IB ESS exam questions, always check which atmospheric layer the 'ozone' refers to, and explicitly distinguish between 'stratospheric ozone' and 'tropospheric ozone' in your answers.",
          "Do not wrongly understand that CFCs destroy ozone directly in the troposphere. CFCs are stable against UV in the troposphere, so they do not break down and persist for decades; only after reaching the stratosphere are they broken down by strong UV-C to release Cl radicals. For this reason, even if CFC production stops, the CFCs already accumulated in the troposphere keep flowing into the stratosphere over decades, so full recovery of the ozone layer is projected for the 2060s–2080s. In IB ESS you must be able to explain 'why ozone recovery is slow even after the Montreal Protocol' using this mechanism.",
        ],
        example:
          "Let's analyse the formation mechanism of the Antarctic ozone hole by linking it to the seasonal cycle.\n\nSpecial conditions of the Antarctic stratosphere:\n- Antarctic winter (June–August): during the polar night, stratospheric temperature drops below −78°C.\n- Polar stratospheric cloud (PSC) formation: clouds composed of a mixture of nitric acid, sulfuric acid, and water form below about −78°C.\n- On PSC surfaces, heterogeneous reactions such as ClONO₂ + HCl → Cl₂ + HNO₃ proceed → preparing for the explosive release of Cl₂ + UV → 2Cl when spring sunlight returns.\n\nOzone destruction in Antarctic spring (September–November):\n- September sunlight returns → photodissociation of Cl₂ → massive release of Cl radicals.\n- The Cl catalytic cycle runs explosively → ozone concentration plummets (declines of up to 60–70% recorded).\n- First officially recorded in extent in 1987; record-largest extent in 2006 (about 29.5 million km², larger than the North American continent).\n\nRecovery signals (since the 2010s):\n- Through the effect of the Montreal Protocol, atmospheric CFC concentration is gradually declining → gentle signs of improvement in the area and depth of the ozone hole.\n- However, volcanic activity (SO₂ → H₂SO₄ aerosol formation → increased PSCs) or stratospheric cooling driven by climate change may disrupt the recovery.\n\nIB ESS analysis point: questions frequently ask why the ozone hole is most severe over Antarctica rather than over Northern Hemisphere cities, to be explained through PSC-formation conditions (extreme cold, polar night) and the polar vortex (an isolated mass of cooled air). For high marks, you must describe step by step how Antarctica's geography and meteorological conditions amplify the reaction, not simply 'because of CFCs.'",
      },
      {
        title: "The Impacts of Ozone Depletion and the Montreal Protocol",
        subtitle: "What happens when ultraviolet pours down — and how humanity solved this problem",
        terms: [
          {
            term: "Effects of UV-B",
            def: "A 1% decrease in stratospheric ozone increases surface UV-B exposure by about 2%. Effects on the human body: increased incidence of skin cancer (melanoma and squamous cell carcinoma) (UV-B causes pyrimidine dimer formation in DNA), increased incidence of cataracts, and immune suppression through inhibition of T-lymphocyte function. Effects on marine ecosystems: reduced photosynthetic efficiency and growth rate of phytoplankton → weakened base of the marine food chain → reduced carbon-sequestration capacity. Terrestrial ecosystems: leaf damage and growth suppression in alpine and polar plants.",
          },
          {
            term: "Montreal Protocol (1987)",
            def: "An international environmental treaty that phases out the production, use, consumption, and trade of ozone-depleting substances (ODS). It entered into force in 1989 and was ratified by 196 countries — the first international treaty ratified by every UN member state. Main provisions: a complete ban on CFC and halon production in developed countries by 1996 (with a grace period for developing countries until 2010), and technology transfer and cost support for developing countries through the Multilateral Fund. Achievements: a declining trend in atmospheric CFC-11 and CFC-12 concentrations, and detection of ozone-layer recovery signals (full recovery projected for 2060–2080). UNEP describes it as 'the most successful international environmental treaty in history.'",
          },
          {
            term: "Kigali Amendment (2016)",
            def: "A 2016 amendment to the Montreal Protocol that adds HFCs (hydrofluorocarbons) — introduced as CFC substitutes — to the regulated substances. HFCs have no ozone-depleting power but are powerful greenhouse gases with a GWP hundreds to thousands of times that of CO₂, so it was agreed to phase them down over 2019–2047 for the sake of climate-change mitigation. It is frequently cited as a case in which an ozone-protection treaty evolved into a climate-change treaty.",
          },
        ],
        traps: [
          "Do not conclude that the Montreal Protocol is a 'perfect success' or, conversely, oversimplify it as a 'failure.' It is a clear achievement in that ozone-layer recovery signals are being confirmed, but to meet the upper bands of the IB ESS assessment criteria you must also describe its limitations and uncertainties: ① full recovery will take decades because of the long atmospheric residence time of CFCs, ② the detection of clandestine CFC-11 production in some countries (some Chinese firms in 2018), and ③ stratospheric cooling driven by climate change may disrupt ozone recovery. A discussion linking the relationship between scientific evidence and the policy response to the 'precautionary principle' is also important.",
          "Do not overlook the fact that ozone-layer recovery does not solve climate change. When the Montreal Protocol replaced CFCs with HFCs, the ozone problem eased, but because HFCs are powerful greenhouse gases, an unintended trade-off arose in which climate change worsened. This is the background to the Kigali Amendment. IB ESS requires the ability to describe, through systems thinking, the 'interconnectedness of environmental problems' — that environmental problems are linked to one another, so a solution to one problem can worsen another.",
        ],
        example:
          "Let's analyse data on increased UV-B exposure and skin-cancer incidence in New Zealand and Australia.\n\nGeographic vulnerability:\n- Australia and New Zealand lie at 30–50° South, so they are directly affected by the Antarctic ozone hole.\n- In particular, during the Southern Hemisphere spring (September–November), the ozone hole temporarily expands as far as southern Australia.\n\nEpidemiological data:\n- Australia has one of the highest melanoma incidence rates in the world: about 33 per 100,000 (2020).\n- A combined result of fair-skin genetic traits + an outdoor-activity culture + high UV-B exposure.\n- A 1-unit increase in the UV-B index increases melanoma incidence by about 1.0–2.0% (meta-analysis estimate).\n\nPolicy response:\n① Sun Smart campaign: Slip (long sleeves), Slop (sunscreen SPF 30+), Slap (hat), Seek (shade), Slide (sunglasses).\n② Mandatory shade facilities at schools and public swimming pools.\n③ Mandatory inclusion of the UV index in weather forecasts.\n\nIB ESS assessment point: this case is not a purely scientific phenomenon but a socio-environmental systems problem in which population vulnerability (skin type, outdoor culture), geographic exposure (location of the ozone hole), and policy response (public-health campaigns) are all linked. When discussing the health impact of increased UV-B, practise distinguishing 'correlation' from 'causation' and explicitly stating confounding variables (skin type, sunshine hours, outdoor-exposure habits) in a scientific writing style.",
      },
    ],
  },
  {
    lessonId: "ib-ess-u6-l3",
    courseId: "ib-ess",
    subjectLabel: "IB Environmental Systems & Societies",
    emoji: "🌱",
    unit: 6,
    lessonNum: 3,
    unitName: "Atmospheric Systems & Society",
    title: "Photochemical Smog and Urban Air Pollution — The Invisible Poison Beneath a Clear Sky",
    subtitle: "Tropospheric ozone and smog-formation mechanisms · primary and secondary pollutants · health and ecological impacts · management strategies",
    overview:
      "Seoul, Beijing, Los Angeles, Mexico City. What these cities have in common is that basin and valley topography combined with strong insolation produces severe photochemical smog. Photochemical smog differs from the London-type smog (sulfur oxides and soot) of the early 20th century, when coal was burned directly. Nitrogen oxides (NO) and volatile organic compounds (VOCs) emitted from vehicles and industrial facilities react with strong solar radiation to produce secondary pollutants, including tropospheric ozone. The problem is that, because this process is a chain of hundreds of complex chemical reactions, capturing and reducing the 'pollutants coming out of the chimney' does not solve it instantly. In the final lesson of IB ESS Unit 6, we analyse, on multiple levels, the chemical principles of photochemical smog, its impact on the human body and ecosystems, and the effectiveness and limitations of technological, policy, and behavioural management strategies.",
    objectives: [
      "Define primary pollutants (CO·NO·SO₂·particulates·VOCs) and secondary pollutants (NO₂·O₃·PAN·H₂SO₄·HNO₃), and explain the role of each in the formation of photochemical smog",
      "Link the basic reaction pathways of photochemical smog formation (NO + O₃ → NO₂, NO₂ + UV → NO + O, O + O₂ → O₃, the VOC-driven enhancement of NO→NO₂ conversion) to explain the mechanism of tropospheric ozone accumulation",
      "Explain how temperature inversion suppresses the dispersion of air pollutants and thereby raises pollutant concentrations, and analyse how a city's topographic and climatic conditions affect the frequency of photochemical smog",
      "Explain the effects of air pollution (especially NO₂·O₃·PM2.5) on the human respiratory and cardiovascular systems and on ecosystems (acid deposition, reduced crop productivity)",
      "Compare and evaluate the principles, effectiveness, and limitations of air-pollution management strategies such as vehicle emission regulation (catalytic converters, European emission standards), fuel-quality regulation, the transition to renewable energy, expansion of public transport, carbon taxes, and the expansion of urban green space",
    ],
    sections: [
      {
        title: "The Formation Chemistry of Photochemical Smog",
        subtitle: "Why the sky turns yellow even without a chimney — when NOₓ and VOCs react with light",
        terms: [
          {
            term: "Primary pollutants",
            def: "Pollutants released directly into the atmosphere from a source. Major types: carbon monoxide (CO, incomplete combustion), sulfur dioxide (SO₂, coal and heavy-oil combustion), nitrogen oxides (NOₓ = NO + NO₂, from the N₂ + O₂ reaction at high combustion temperatures), volatile organic compounds (VOCs: benzene, toluene, formaldehyde, from fuel evaporation and industrial solvents), and particulate matter (PM: PM10·PM2.5). Through chemical reactions in the atmosphere, these become the precursors of secondary pollutants.",
          },
          {
            term: "Photochemical smog cycle",
            def: "The key reaction pathways of photochemical smog formation: ① NO + O₃ → NO₂ + O₂ (NO consumes ozone), ② NO₂ + UV (< 420 nm) → NO + O (photodissociation of NO₂), ③ O + O₂ + M → O₃ + M (tropospheric ozone formation). When VOCs are present, the NO → NO₂ conversion proceeds without consuming O₃, so ozone accumulates above normal levels. PAN (peroxyacetyl nitrate) is a toxic secondary pollutant that causes eye irritation and plant damage, produced in the VOC–NOₓ reaction.",
          },
          {
            term: "Temperature inversion",
            def: "Normally in the troposphere, rising altitude → falling temperature, but during a temperature inversion the air below a certain altitude is colder than the air above it, so convection is suppressed. Types: radiation inversion (surface air cooled by radiative cooling, overnight to morning) and subsidence inversion (air descending and compressing under high pressure). The inversion layer prevents the vertical dispersion of pollutants, acting as a 'lid' that traps pollutants within an urban basin. Los Angeles and Mexico City suffer especially severe photochemical smog due to the combination of mountain-ringed basin topography + subsidence inversion.",
          },
          {
            term: "Particulate matter (PM2.5 / PM10)",
            def: "Fine solid and liquid particles suspended in the air. PM10: diameter 10 μm or less, penetrating to the upper respiratory tract (nose and throat). PM2.5: diameter 2.5 μm or less, penetrating to the alveoli and capable of being absorbed into the bloodstream. Primary PM: emitted directly from combustion and grinding. Secondary PM: produced when SO₂·NOₓ·VOCs react in the atmosphere (secondary aerosols). WHO annual guideline: PM2.5 of 5 μg/m³ (revised 2021). Long-term exposure is associated with increased risk of cardiopulmonary disease, stroke, and lung cancer.",
          },
        ],
        traps: [
          "Always distinguish in your answer that tropospheric ozone is not the same as stratospheric ozone. This is the most frequent trap in IB ESS. Stratospheric ozone = ultraviolet protection, UV absorption (beneficial). Tropospheric ozone = a secondary pollutant, a respiratory irritant harmful to plants (harmful). 'Why the ozone layer must be protected' and 'why urban ozone concentrations must be lowered' are completely different problems. Whenever 'ozone' appears in an exam question, always check the context (stratosphere/troposphere); conflating the two ozones collapses your entire argument.",
          "You must precisely understand the mechanism that tropospheric ozone does not accumulate with only NO and NO₂ present, without VOCs. Without VOCs, the O₃ produced by NO₂ photodissociation immediately reacts with NO to return to NO₂, maintaining a balance (steady-state ozone = low concentration). When VOCs intervene, they break this balance and the NO → NO₂ conversion occurs without consuming O₃, so ozone accumulates. In an IB ESS essay, explaining 'why urban ozone concentrations rise' simply as 'because of NOₓ' is insufficient; you must specify the role of VOCs.",
        ],
        example:
          "Let's analyse the photochemical smog pattern in the Los Angeles (LA) basin using data.\n\nGeographic and climatic conditions:\n- Basin topography ringed on three sides by mountain ranges (such as the San Gabriel Mountains).\n- The subsidence inversion layer of the Pacific high-pressure system forms on more than 260 days per year → suppressing the vertical dispersion of pollutants.\n- Annual sunshine of about 3,000 hours → strong UV radiation activating photochemical reactions.\n\nDiurnal pattern (on a typical smog day):\n- 06:00–08:00: rush-hour traffic congestion → NO spikes, O₃ low (NO consumes O₃).\n- 09:00–12:00: sunlight strengthens → NO₂ photodissociation begins → VOC reactions activate.\n- 12:00–15:00: O₃ concentration peaks (sometimes 200+ μg/m³, double the WHO guideline of 100 μg/m³).\n- After 18:00: insolation decreases → photochemical reactions slow, O₃ falls, NO rises again.\n\nManagement achievements and limitations:\n- After the Clean Air Act of the 1970s, California mandated Zero Emission Vehicles (ZEV) and introduced low-sulfur fuel.\n- Ozone-alert days in the LA basin: more than 200 per year in the 1970s → fewer than 50 per year in the 2020s.\n- Limitations: growth in vehicle numbers, the urban heat-island effect, and high temperatures from climate change accelerating photochemical reactions have stalled further reductions.\n\nIB ESS analysis point: the LA case shows the real achievements of technological solutions (catalytic converters, unleaded petrol, ZEVs), but it also shows that socio-structural factors — urban sprawl and increasing car dependence — partially offset the gains from technological improvement. Use it as a case supporting the EVS-perspective argument that 'technological solutions alone are not enough.'",
      },
      {
        title: "The Impacts of Air Pollution and Management Strategies",
        subtitle: "When the air you breathe makes you ill — from a personal mask to international emission standards",
        terms: [
          {
            term: "Acid deposition",
            def: "The phenomenon in which atmospheric SO₂ and NOₓ react with water, oxygen, and oxidants to become sulfuric acid (H₂SO₄) and nitric acid (HNO₃), settling onto the surface as rain, fog, or dry particles. It is divided into wet deposition (acid rain, pH < 5.6) and dry deposition (adsorption of acidic particles and gases). Effects: soil acidification (leaching of Ca²⁺·Mg²⁺ → release of aluminium ions → plant toxicity), acidification of water bodies (death of aquatic life), corrosion of buildings and stone monuments, and forest decline (the European Waldsterben, or 'forest death'). Because it travels across national borders, it requires internationally coordinated regulation (CLRTAP, the Convention on Long-Range Transboundary Air Pollution).",
          },
          {
            term: "Catalytic converter",
            def: "A device fitted to a vehicle's exhaust pipe that converts harmful primary pollutants into harmless substances. Using platinum (Pt), palladium (Pd), and rhodium (Rh) catalysts, it carries out three key reactions: ① CO + O → CO₂, ② HC (hydrocarbons) + O₂ → CO₂ + H₂O, ③ 2NO → N₂ + O₂. In petrol vehicles it can reduce CO·HC·NOₓ by more than 90% each. Limitations: difficulty in further reducing NOₓ·PM in diesel vehicles, low efficiency during initial cold starts, and the environmental cost of mining precious metals.",
          },
          {
            term: "Classification of air-pollution management strategies",
            def: "Divided into end-of-pipe technology that treats pollution after it occurs (catalytic converters, filters, scrubbers) and clean technology that prevents pollution itself (renewable energy, electric vehicles, improved energy efficiency). In IB ESS, you should be able to argue that end-of-pipe technology is effective in the short term but maintains the cause of pollution and is therefore not a fundamental solution, while clean technology has the advantage in terms of long-term sustainability. Behavioural approaches (using public transport, carpooling, walking short distances) and policy approaches (emissions trading schemes, fuel taxes, LEZ or Low Emission Zones) are also important management tools.",
          },
        ],
        traps: [
          "Simply listing air-pollution management strategies makes high marks in IB ESS difficult. You must evaluate each strategy by linking its principle (how it reduces pollution), effectiveness (how much reduction is possible), limitations (why it is not enough), and context of application (developed/developing countries, city size, industrial structure). For example, an electric-vehicle transition greatly reduces urban NOₓ·PM2.5, but if coal-fired power is used to generate the electricity, it can amount to mere 'pollution shifting' — mentioning this trade-off makes for an upper-band answer.",
          "Do not reduce acid rain to 'just an SO₂ problem.' The main contributing components of modern acid deposition are SO₂ (sulfuric acid, from coal combustion) and NOₓ (nitric acid, from vehicles and thermal power). Past acid rain in Britain and Central Europe was dominated by coal SO₂, but since the introduction of desulfurisation technology the relative contribution of NOₓ has grown. In an IB ESS extended response on acid deposition, specify both precursors and link the 'transboundary' nature of acidification impacts to the need for international regulation.",
        ],
        example:
          "Let's analyse Mexico City's air-pollution management programme 'Hoy No Circula' (Today You Don't Drive).\n\nBackground:\n- Mexico City: altitude 2,240 m (low oxygen → worsened incomplete combustion), basin ringed on three sides by mountains, a megacity of about 22 million people.\n- In the early 1990s it extremely exceeded WHO guidelines for all criteria pollutants — PM, ozone, CO, Pb (lead), and others.\n\n'Hoy No Circula' policy (introduced 1989):\n- A one-day-per-week driving ban based on the last digit of the vehicle's licence plate.\n- Intent: reduce urban vehicles by 20% → reduce NOₓ·VOC emissions → lower ozone concentrations.\n\nActual results and unintended effects:\n- Wealthy residents bought a second car to use on their ban day → the total number of vehicles in the city increased.\n- The second car was usually an older, high-polluting vehicle → average emissions actually rose.\n- There was a short-term effect of spreading out peak congestion, but total long-term emissions did not decrease.\n\nSubsequent complementary policies:\n- The VERIFICACIÓN VEHICULAR programme: vehicles passing an emissions inspection receive a sticker; those failing face driving restrictions.\n- Expansion of the Metro and BRT (bus rapid transit) lines, and construction of cycle lanes.\n- Introduction of ultra-low-sulfur diesel and the adoption of Euro 3→5 emission standards.\n\nResult: since the 2000s, lead (Pb), SO₂, and CO have decreased sharply. However, O₃ and PM2.5 still exceed WHO guidelines by 2–3 times (as of the 2020s).\n\nIB ESS key analysis: this case shows that an individual traffic-regulation policy can produce unintended side effects (a rebound effect). For high marks, describe — from an EVS perspective (a socio-ecological approach) — that successful air-pollution management requires not a single policy but a policy mix integrating technology (emission standards), economic incentives (pollution taxes), infrastructure (public transport), and behavioural change (reduced car dependence).",
      },
    ],
  },
];
