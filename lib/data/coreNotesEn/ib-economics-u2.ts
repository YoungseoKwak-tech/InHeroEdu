/**
 * Core Notes English version — IB Economics Unit 2 (Government Intervention & Market Failure).
 * All content faithfully translated from the Korean storytelling original:
 * objectives · terms · traps · examples fully preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ECONOMICS_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-economics-u2-l1",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 2,
    lessonNum: 1,
    unitName: "Government Intervention & Market Failure",
    title: "Elasticity in Depth — PES, YED, XED",
    subtitle:
      "How supply elasticity, income elasticity, and cross-price elasticity reshape tax incidence, trade policy, and market structure analysis",
    overview:
      "If you mastered PED in Unit 1, it's time to complete the full elasticity toolkit. Price elasticity of supply (PES) measures how quickly producers can respond to a price change. Income elasticity of demand (YED) reveals how large a shock a boom or recession delivers to a specific industry, while cross-price elasticity (XED) quantitatively identifies whether two goods are substitutes or complements. All three elasticities appear in indirect-tax incidence analysis, industry classification, and trade-policy evaluation — and they are the core material for HL calculation questions.",
    objectives: [
      "Calculate price elasticity of supply (PES) using the formula and explain its determinants: time to produce, stocks and spare capacity, and factor mobility",
      "Use the sign and magnitude of the YED coefficient to classify goods as normal, inferior, necessity, or luxury, and analyse their relationship to the business cycle",
      "Use the sign of the XED coefficient to identify substitutes and complements, and interpret the magnitude to assess the strength of competition or complementarity",
      "Use the relative sizes of PES and PED to explain the consumer and producer tax burden (tax incidence) when an indirect tax is imposed, without a diagram",
      "Combine all three elasticity concepts to comprehensively analyse the market characteristics of real industries (agricultural products, luxury goods, energy)",
    ],
    sections: [
      {
        title: "Price Elasticity of Supply (PES)",
        subtitle:
          "How quickly can producers increase quantity supplied in response to a price rise?",
        terms: [
          {
            term: "Price elasticity of supply (PES)",
            def: "The percentage change in quantity supplied in response to a 1% change in price. Formula: PES = (% change in Qs) ÷ (% change in P). Always positive (+) due to the law of supply. PES > 1 = elastic; PES < 1 = inelastic; PES = 0 = perfectly inelastic (vertical supply curve); PES = ∞ = perfectly elastic (horizontal supply curve).",
          },
          {
            term: "PES determinant — Time to produce",
            def: "Goods that take a long time to produce (wine, shipbuilding) are inelastic in supply because output cannot be increased quickly even when prices rise. By contrast, goods that can be produced rapidly (fast food, manufactured consumer goods) have higher PES.",
          },
          {
            term: "PES determinant — Stocks and spare capacity",
            def: "If a firm holds finished-goods inventory or has idle factory capacity, it can respond instantly to a price rise, raising PES. Industries that produce only to order with no stockpiles have lower PES.",
          },
          {
            term: "PES determinant — Factor mobility",
            def: "If labour and capital can be drawn in easily from other industries, PES is higher. Industries requiring highly specialised skills or dedicated equipment (aircraft engines, semiconductor fabs) have low PES because factors cannot be redirected quickly.",
          },
        ],
        traps: [
          "In IB exams, when discussing tax incidence using the relative sizes of PES and PED, the principle 'the more inelastic side bears more of the tax' must be applied precisely. If PED is low (inelastic consumers) and PES is high, consumers bear more of the tax; the reverse means producers bear more. Even in questions requiring a purely written explanation with no diagram, you must describe the mechanism — 'the inelastic side responds less to price changes, so it cannot exit the market and therefore bears a larger share of the tax' — to earn full marks.",
          "Always confirm that PES is positive (+). If your calculation yields a negative value, you have reversed the numerator and denominator. PED is negative, PES is positive — confusing this symmetry will cost marks at the assessment stage.",
        ],
        example:
          "Let's explore PES through the agricultural market. When the price of rice rises 20% (from 2,000 to 2,400 won per kg) and quantity supplied increases only 5% (from 100 to 105 tonnes), PES = 5% ÷ 20% = 0.25 — inelastic (PES < 1). The reason is that once rice is planted, months pass before harvest, making it impossible to raise output significantly in the short run. This is the structural reason for extreme agricultural price volatility: supply cannot respond immediately to price signals, so excess demand persists for a long time. By contrast, manufactured goods (clothing, electronics) have relatively higher PES and respond quickly to price signals.",
      },
      {
        title: "Income Elasticity (YED) and Cross-Price Elasticity (XED)",
        subtitle:
          "The sign tells you everything — determine positive or negative first",
        terms: [
          {
            term: "Income elasticity of demand (YED)",
            def: "The percentage change in quantity demanded in response to a 1% change in income. Formula: YED = (% change in Qd) ÷ (% change in income). YED > 0 = normal good; YED < 0 = inferior good. Among normal goods: YED > 1 = luxury; 0 < YED < 1 = necessity.",
          },
          {
            term: "Inferior good",
            def: "A good for which demand falls as income rises (YED < 0). Demand tends to increase during recessions and fall during booms. Examples: bus travel, second-hand clothing, budget food products.",
          },
          {
            term: "Cross-price elasticity of demand (XED)",
            def: "The percentage change in the quantity demanded of good A in response to a 1% change in the price of good B. Formula: XED = (% change in Qd of A) ÷ (% change in P of B). XED > 0 = substitutes; XED < 0 = complements. A larger absolute value indicates a closer relationship between the two goods.",
          },
          {
            term: "Independent goods",
            def: "Goods for which XED ≈ 0. A change in the price of one good has virtually no effect on the demand for the other. Example: a change in the price of shampoo and the demand for cars — the two are unrelated.",
          },
        ],
        traps: [
          "A common misconception in YED interpretation is that 'all normal goods are elastic.' Normal goods (YED > 0) are subdivided into necessities (0 < YED < 1, inelastic) and luxuries (YED > 1, elastic). Goods like food, electricity, and healthcare see little increase in demand even as income rises — they are normal goods and inelastic necessities. If an exam question asks 'classify a good with YED = 0.4,' you must give a two-part answer: 'a normal good and a necessity.'",
          "In XED questions, a frequent mistake is confusing which good goes in the numerator versus the denominator. Memorise the formula as: 'the responding good (A) is in the numerator; the causal good (B) is in the denominator.' If the price of butter rises and the demand for margarine increases, then XED (for margarine) = (% change in Qd of margarine) ÷ (% change in P of butter).",
        ],
        example:
          "Let's examine YED through the car market during a recession. If income falls 10% and demand for small economy cars falls 5%, YED = −5% ÷ −10% = +0.5 — a normal good and a necessity. If demand for premium imports (Porsche, Mercedes) falls 25%, YED = −25% ÷ −10% = +2.5 — a luxury good. This explains why demand for premium marques drops far more sharply than for mainstream brands during a downturn. For XED: if the price of a Starbucks Americano rises 10% and demand for a rival chain's Americano rises 8%, XED = +0.8 — positive, confirming the two are substitutes.",
      },
      {
        title: "Indirect Taxes, Subsidies, and Tax Incidence",
        subtitle:
          "What matters is not who pays the tax, but who bears the burden",
        terms: [
          {
            term: "Indirect tax",
            def: "A tax levied on producers that is partly passed on to consumers through higher prices. Divided into specific taxes (a fixed amount per unit) and ad valorem taxes (a percentage of the price). An indirect tax shifts the supply curve upward (to the left).",
          },
          {
            term: "Consumer tax burden",
            def: "The amount by which the price paid by consumers (P_consumer) after the tax exceeds the original equilibrium price (P*). Shown on a diagram as the vertical distance between the new consumer price and the original equilibrium price.",
          },
          {
            term: "Producer tax burden",
            def: "The amount by which the price received by producers (P_producer = P_consumer − tax) after the tax falls below the original equilibrium price (P*). The consumer burden plus the producer burden equals the full per-unit tax.",
          },
          {
            term: "Subsidy",
            def: "A financial payment made by the government to producers. Shifts the supply curve downward (to the right), lowering the equilibrium price and raising equilibrium output. The consumer benefit (price reduction) plus the producer benefit (rise in price received) equals the full per-unit subsidy.",
          },
        ],
        traps: [
          "IB exams test the distinction that 'a specific tax shifts the supply curve upward in parallel, while an ad valorem tax rotates (pivots) the supply curve.' A specific tax adds the same monetary amount at every quantity, so the slope is unchanged and the shift is parallel. An ad valorem tax grows larger as the price rises, causing a change in the slope — the curve rotates rather than shifts uniformly. Explicitly stating 'parallel shift vs. rotation (pivot)' can earn you additional marks.",
          "On a diagram, always show the 'government expenditure' rectangle for a subsidy. Total subsidy cost = per-unit subsidy × new equilibrium quantity = consumer benefit rectangle + producer benefit rectangle. Concluding that subsidies are unconditionally good will cost marks — you must evaluate drawbacks: the fiscal burden on government, the survival of inefficient producers, and potential WTO violations.",
        ],
        example:
          "Let's analyse tax incidence using South Korea's fuel tax as an example. Suppose the government levies a specific tax of 500 won per litre on petrol. The equilibrium price rises from 1,800 to 2,200 won (up 400 won) and the producer's net price falls to 1,700 won. Of the 500-won tax: the consumer burden is 400 won (2,200 − 1,800) and the producer burden is 100 won (1,800 − 1,700). Consumers bear 80% of the tax because petrol has a low PED (inelastic demand) — consumers have few substitutes for petrol and continue purchasing even at higher prices. Explaining this with figures — showing that a lower PED means consumers bear a larger share — is exactly what earns high marks on IB Paper 1.",
      },
    ],
  },
  {
    lessonId: "ib-economics-u2-l2",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 2,
    lessonNum: 2,
    unitName: "Government Intervention & Market Failure",
    title: "Price Ceilings, Price Floors, and Externalities — How Markets Fail",
    subtitle:
      "What distortions arise when governments intervene in prices, and how do externalities undermine market equilibrium?",
    overview:
      "Free markets do not always produce the best outcomes. Sometimes rents are too high, farm incomes too low, or factory smoke imposes costs on nearby residents. In these situations governments intervene directly through price ceilings and floors, or adopt policies to correct externalities. The core logic of IB Economics Unit 2 is a three-step analytical structure: diagnose the cause of market failure → measure the extent of under- or over-production → evaluate the effectiveness and limitations of government responses.",
    objectives: [
      "Explain the conditions for setting a price ceiling (maximum price), the mechanism by which excess demand arises, and the causal chain leading to black-market formation",
      "Analyse the conditions for setting a price floor (minimum price), the mechanism by which excess supply arises, and the government's need to purchase the resulting surplus",
      "Distinguish between negative and positive externalities of production and consumption, and explain the difference between the socially optimal output (Q*) and the market output in each case",
      "Describe the location and size of the deadweight loss (DWL) created by externalities in terms of a diagram",
      "Evaluate the effectiveness and limitations of government responses to externalities: Pigouvian taxes, subsidies, regulation, and tradable permits",
    ],
    sections: [
      {
        title: "Price Ceilings and Price Floors",
        subtitle:
          "Forcing the price away from equilibrium always creates excess demand or excess supply",
        terms: [
          {
            term: "Maximum price (Price ceiling)",
            def: "A government-imposed legal upper limit on the price of a good, set below the equilibrium price. The aim is to improve access to goods for low-income consumers (e.g. rent controls, medicine price caps). The ceiling must be set below the equilibrium price to be 'binding.' Result: excess demand (shortage) → potential black-market formation.",
          },
          {
            term: "Minimum price (Price floor)",
            def: "A government-imposed legal lower limit on the price of a good, set above the equilibrium price. The aim is to protect producer income (e.g. guaranteed minimum prices for agricultural goods) or protect workers (minimum wage). The floor must be set above the equilibrium price to be binding. Result: excess supply (surplus) → government must purchase the surplus.",
          },
          {
            term: "Black market",
            def: "An illegal market that emerges under a price ceiling when consumers who cannot obtain the good at the official price trade with producers who want a higher price. Black-market prices can far exceed the legal ceiling, producing outcomes directly opposite to the policy's intention.",
          },
          {
            term: "Deadweight loss (DWL)",
            def: "The portion of total social surplus (consumer surplus + producer surplus) that is irretrievably lost due to price controls, taxes, or subsidies. Shown as a triangle on a diagram, it represents the inefficiency of resource allocation.",
          },
        ],
        traps: [
          "In IB exams, omitting the 'binding' condition produces only a partial answer. A price ceiling is effective only when set below the equilibrium price; a price floor is effective only when set above it. If you do not state 'the ceiling is set below the equilibrium price,' the examiner cannot award full marks. A ceiling placed above equilibrium has no effect — the market already clears at a lower price.",
          "When explaining the side-effects of a price floor, stopping at 'excess supply occurs' will cost marks. You must narrate the chain of consequences: 'excess supply → government must buy the surplus → fiscal burden → long-term survival of inefficient producers → misallocation of resources.' Only by tracing this sequence do you earn the analysis marks.",
        ],
        example:
          "Take South Korea's rental price controls as a case study for a price ceiling. If the government caps monthly rent at 800,000 won when the market equilibrium is 1,200,000 won, the number of tenants seeking accommodation at 800,000 won will far exceed the quantity supplied, creating excess demand. In the short run the policy appears to achieve its aim of affordable housing, but in the long run landlords reduce the supply of rental units, convert monthly-rent tenancies to lump-sum deposits, and some engage in under-the-table premium payments (an informal black market). The supply of rental housing shrinks, and the most vulnerable households find it even harder to secure accommodation — a classic unintended consequence of a price ceiling.",
      },
      {
        title: "Negative and Positive Externalities",
        subtitle:
          "Costs or benefits imposed on third parties distort the market",
        terms: [
          {
            term: "Externality",
            def: "A cost (negative externality) or benefit (positive externality) that falls on third parties who are not involved in the transaction, without compensation. When externalities exist, social costs and benefits diverge from private costs and benefits, so the market fails to produce the socially optimal output (Q*).",
          },
          {
            term: "Negative externality of production",
            def: "An external cost imposed on third parties during the production process. Social marginal cost (SMC) = private marginal cost (PMC) + marginal external cost (MEC). The market produces Q_market where PMC = demand curve, but the social optimum Q* (where SMC = demand curve) is lower. Result: overallocation of resources and deadweight loss. Examples: factory smoke, chemical effluent.",
          },
          {
            term: "Positive externality of consumption",
            def: "An external benefit provided to third parties through an act of consumption. Social marginal benefit (SMB) = private marginal benefit (PMB) + marginal external benefit (MEB). The market produces Q_market where PMB = supply curve, but the social optimum Q* (where SMB = supply curve) is higher. Result: underallocation of resources and deadweight loss. Examples: vaccination, education.",
          },
          {
            term: "Pigouvian tax",
            def: "A per-unit tax imposed on producers equal to the marginal external cost (MEC), designed to correct a negative externality. In theory it closes the gap between SMC and PMC, shifting market output from Q_market down to Q*. Examples: carbon taxes, tobacco taxes.",
          },
        ],
        traps: [
          "The most fatal mistake in externality questions is confusing the direction: 'negative externalities → overproduction; positive externalities → underproduction.' Negative production externalities mean SMC > PMC, so the market produces too much relative to the social optimum. Positive consumption externalities mean SMB > PMB, so the market produces too little. Even in a written (non-diagram) explanation, you must specify which curve shifts (production externality → supply side; consumption externality → demand side).",
          "On evaluation questions about externality-correction policies, never conclude that a Pigouvian tax is perfect. In practice, accurately measuring MEC is extremely difficult, and an incorrectly set tax rate leads to over- or under-taxation. You must also note the regressive tax character — it imposes a disproportionate burden on lower-income groups — to score in the top band.",
        ],
        example:
          "Consider the positive consumption externality of flu vaccination. An individual deciding whether to get vaccinated considers only the private benefit of not contracting influenza. However, vaccination also reduces the chance of passing the virus to others — an external benefit. As a result, SMB > PMB, and the market delivers only Q_market vaccinations, while the social optimum Q* is higher. Deadweight loss arises between Q_market and Q*. If the government corrects this by providing a subsidy, the supply curve shifts downward, the price falls, and vaccination coverage rises to Q*. This is precisely the theoretical rationale behind South Korea's policy of offering free or subsidised flu vaccines.",
      },
      {
        title: "Public Goods, Common Pool Resources, and Asymmetric Information",
        subtitle:
          "Three more reasons markets fail to supply goods even when prices exist",
        terms: [
          {
            term: "Public good",
            def: "A good characterised by both non-rivalry (one person's consumption does not reduce what is available to others) and non-excludability (it is impossible to prevent non-payers from consuming it). Because of the free-rider problem, private markets under-supply or fail to supply public goods at all, requiring direct government provision. Examples: national defence, street lighting, free-to-air broadcasting.",
          },
          {
            term: "Common pool resource (CPR)",
            def: "A resource that is rivalrous (one person's consumption reduces what is available to others) but non-excludable. The absence of clear property rights leads to overuse — the tragedy of the commons. Examples: fish in international waters, clean air, shared grazing land.",
          },
          {
            term: "Asymmetric information",
            def: "A situation in which the parties to a transaction hold different amounts of information. It generates adverse selection (pre-transaction information imbalance) and moral hazard (post-transaction behaviour change). Examples: used-car markets (buyers cannot assess vehicle quality), insurance markets (policyholders take on more risk after purchasing cover).",
          },
          {
            term: "Free-rider problem",
            def: "Because non-excludability allows people to benefit from a good without paying for it, individuals have little incentive to contribute voluntarily. As a result, public goods are not supplied, or are under-supplied, in private markets, necessitating government provision.",
          },
        ],
        traps: [
          "In IB exams, failing to explain both characteristics of a public good (non-rivalry and non-excludability) with concrete examples earns only partial credit. Writing 'national defence is a public good' is insufficient. You must explain: 'National defence is non-rival because one citizen receiving protection does not reduce the protection available to another, and non-excludable because a person who does not pay taxes cannot be excluded from the protection it provides.' Omitting either characteristic will cost marks.",
          "A frequent error is confusing common pool resources with public goods. CPRs share non-excludability with public goods but are rivalrous — that is what sets them apart. 'Ocean fish are rivalrous (if I catch them, fewer remain for others) but cannot be excluded from anyone fishing in international waters, making them a CPR.' You should be able to classify all four good types (pure public goods, common pool resources, club goods, and private goods) using a 2×2 matrix of rivalry and excludability.",
        ],
        example:
          "The tragedy of the commons can be illustrated through blue crab fishing in the Yellow Sea. The blue crabs in international waters are accessible to anyone (non-excludable), so fishermen compete to catch as many as possible (rivalrous). Each individual fisherman maximises personal gain by catching as much as possible, but if all do so simultaneously, the crab population collapses. Individual rationality thus produces collective irrationality — the essence of the tragedy of the commons. Government responses include catch-number licences (regulation), tradable fishing-quota permits (tradable permits), and privatisation of fishing rights. Evaluating the effectiveness, enforceability, and equity implications of each approach in a balanced way earns top marks on an IB Paper 1 essay.",
      },
    ],
  },
  {
    lessonId: "ib-economics-u2-l3",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 2,
    lessonNum: 3,
    unitName: "Government Intervention & Market Failure",
    title: "Effectiveness and Limitations of Government Responses — No Policy Is Perfect",
    subtitle:
      "A comprehensive evaluation of Pigouvian taxes, subsidies, regulation, and tradable permits — including a discussion of government failure",
    overview:
      "Once market failure has been diagnosed, the next step is to prescribe a remedy. Options include Pigouvian taxes to internalise external costs, subsidies to extend positive externalities, direct regulation to restrict behaviour, and tradable permits to harness market mechanisms. Yet no policy is perfect. The core evaluative skill in IB Economics is to analyse each policy's strengths and weaknesses through multiple lenses — efficiency vs. equity, short-run vs. long-run effects, government cost vs. private cost — in a balanced way. This lesson completes the analytical framework for the whole of Unit 2.",
    objectives: [
      "Explain the mechanism and theoretical effects of all four policy instruments: Pigouvian taxes, subsidies, direct regulation, and tradable permits",
      "Evaluate the extent to which each policy achieves the socially optimal output, using the elimination of deadweight loss as the criterion",
      "Define government failure and identify specific causes including imperfect information, unintended consequences, and rent-seeking behaviour",
      "Construct a balanced essay argument that compares and evaluates two or more policy alternatives for the same instance of market failure",
    ],
    sections: [
      {
        title: "Comparing Policy Instruments for Correcting Externalities",
        subtitle:
          "Pigouvian taxes, subsidies, regulation, and tradable permits — strengths and weaknesses of four tools",
        terms: [
          {
            term: "Direct regulation (Command-and-control)",
            def: "Government use of law to mandate production limits, pollution emission standards, or outright bans on specific activities. Guarantees a certain outcome but weakens firms' incentive to innovate and can impose high compliance costs. Examples: vehicle exhaust emission standards, factory effluent discharge limits.",
          },
          {
            term: "Tradable permits (Cap-and-trade)",
            def: "The government sets a total allowable pollution cap, allocates permits to firms, and allows firms to buy and sell those permits on a market. This maintains the total pollution level cost-effectively while preserving the incentive to innovate. Examples: the EU Emissions Trading System (EU-ETS), South Korea's Emissions Trading Scheme (K-ETS).",
          },
          {
            term: "Government failure",
            def: "A situation in which government intervention worsens resource allocation or creates new inefficiencies. Causes include: (1) imperfect information (measurement errors for MEC leading to incorrect tax rates); (2) unintended consequences (price ceilings creating black markets); (3) rent-seeking behaviour (firms lobbying for regulatory relaxation); and (4) implementation and enforcement costs.",
          },
          {
            term: "Correcting information failure",
            def: "Government intervention to reduce information asymmetry. Measures include mandatory disclosure (used-car quality certification, food nutrition labelling), education and awareness campaigns (anti-smoking and anti-obesity warnings), and licensing systems (doctors, lawyers). Providing information assists consumer choice without coercing it, preserving individual freedom — a key advantage.",
          },
        ],
        traps: [
          "In a Paper 1 essay, concluding policy analysis with 'Pigouvian taxes are effective' earns a C–D grade. To reach A–B you must include counter-arguments and limitations. For example, after supporting a Pigouvian tax, add: 'However, accurately measuring MEC is difficult, and because the tax is regressive in nature, it may impose a disproportionate burden on lower-income households' — introducing an equity-based counter-argument. In the final evaluation paragraph, draw a context-dependent conclusion about which conditions favour which policy.",
          "Do not overlook the equity issues of tradable permits. Although total emissions fall, wealthy firms can purchase permits and continue polluting, potentially creating 'hotspot' concentrations of pollution in specific areas. Always acknowledge the tension between efficiency (total pollution reduction) and equity (geographical distribution of pollution).",
        ],
        example:
          "Analyse South Korea's Emissions Trading Scheme (K-ETS) as a case study in tradable permits. The government sets an annual CO₂ cap and distributes permits to firms. Company A, which has access to carbon-reduction technology, sells its surplus permits and earns revenue. Company B, which struggles to cut emissions, buys permits and continues production. Through trading, the society-wide cost of carbon reduction is minimised. Compared with direct regulation (uniform reduction obligations for all firms), cap-and-trade is more cost-efficient and preserves the incentive to innovate. However, limitations persist: the fairness of the initial permit allocation, price volatility (too low a permit price removes the incentive to reduce emissions), and the hotspot problem. Presenting both sides of this argument in a balanced way is the essence of the IB essay.",
      },
      {
        title: "Unit 2 Synthesis: The Market Failure Analytical Framework",
        subtitle:
          "Diagnose → Measure → Choose policy → Evaluate: this four-step logic is the backbone of every question",
        terms: [
          {
            term: "Allocative efficiency",
            def: "A state of production where social marginal benefit (SMB) = social marginal cost (SMC) at output level Q*. Market failure prevents this condition from being achieved, and the purpose of government intervention is to move output toward the social optimum where SMB = SMC.",
          },
          {
            term: "Internalization",
            def: "The process of incorporating external costs or benefits into the price system so that private decision-making reflects the social optimum. A Pigouvian tax internalises external costs by adding them to the producer's PMC; a subsidy internalises external benefits by reflecting them in the consumer's PMB.",
          },
          {
            term: "Equity–efficiency trade-off",
            def: "Policies designed to correct market failure often face a tension between efficiency (eliminating deadweight loss) and equity (fairness of distribution). A carbon tax improves allocative efficiency by reducing emissions, but may impose a heavier burden on lower-income households, worsening equity. IB evaluation questions always expect a discussion of this tension.",
          },
          {
            term: "Integration of the 9 key concepts",
            def: "Among IB DP Economics' nine key concepts (scarcity, choice, efficiency, equity, economic well-being, sustainability, change, interdependence, intervention), Unit 2 uses intervention, efficiency, equity, and sustainability as its primary analytical lenses. Explicitly deploying these concepts as analytical tools in an essay earns top marks.",
          },
        ],
        traps: [
          "In the evaluation section of a Paper 1 essay, simply stating 'this policy is good/bad' will cost marks. The mark scheme requires a context-dependent argument — 'under what conditions and assumptions is this policy effective?' For example, for a Pigouvian tax: 'If the good is price-inelastic, the tax generates substantial revenue but achieves little reduction in consumption; it is more effective at meeting an environmental target when applied to price-elastic goods' — this is the form a conditional conclusion must take.",
          "Across the whole of Unit 2, always practise linking the cause of market failure, its consequences, and the policy response in three steps: 'existence of negative externality (cause) → overproduction and deadweight loss (consequence) → Pigouvian tax to reduce output to Q* (response) → but MEC is difficult to measure (evaluation/limitation).' IB examiners award the highest marks for the completeness of this logical chain.",
        ],
        example:
          "Use a carbon tax to synthesise the full Unit 2 framework. CO₂ emissions from burning fossil fuels constitute a negative externality of production in the form of climate change (cause). Even though SMC > PMC, the market produces Q_market — the point where PMC meets the demand curve — resulting in overproduction and deadweight loss (consequence). The government imposes a Pigouvian tax per unit equal to MEC, raising PMC to the level of SMC and reducing output to Q* (response). On efficiency grounds, this corrects overproduction and creates incentives to innovate in low-carbon technology. However, MEC is difficult to measure precisely, the tax is regressive and therefore inequitable, and firms may relocate production to countries without a carbon tax — a phenomenon known as carbon leakage (evaluation/limitations). When all four key concepts — efficiency, equity, sustainability, and interdependence — converge in a single policy analysis like this, the high-scoring IB essay is complete.",
      },
    ],
  },
];
