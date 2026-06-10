/**
 * Core Notes English version — IB Economics Unit 3 (Macroeconomics).
 * All content faithfully translated from the Korean storytelling original:
 * objectives · terms · traps · examples fully preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ECONOMICS_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-economics-u3-l1",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 3,
    lessonNum: 1,
    unitName: "Macroeconomics",
    title: "Measuring Economic Activity — GDP, GNI, Real vs Nominal, Business Cycle",
    subtitle:
      "How to read a country's economic 'thermometer' correctly — spotting the traps hidden behind the numbers is the key to top marks",
    overview:
      "If Unit 2 analysed individual markets, Unit 3 zooms out to view the economy as a whole. The first question in macroeconomics is: 'How much is our economy producing?' The principal indicators used to measure this are Gross Domestic Product (GDP) and Gross National Income (GNI). However, a rising GDP does not automatically mean things have 'improved.' If prices have risen alongside output, real purchasing power may be unchanged or even lower — which is precisely why distinguishing between nominal GDP and real GDP matters. Furthermore, economies never grow in a straight line; they follow a business cycle of boom, downturn, recession, and recovery. This lesson builds fluency with measurement indicators and the business cycle so you have the vocabulary for all macroeconomic analysis that follows.",
    objectives: [
      "Understand the three approaches to measuring GDP (expenditure, income, output) and apply the expenditure approach formula (Y = C + I + G + (X − M))",
      "Explain the difference between GDP and GNI (domestic production vs national income) using examples involving foreign direct investment and overseas remittances",
      "Explain the difference between real GDP and nominal GDP using the GDP deflator, and discuss which indicator is more appropriate for comparing living standards",
      "Link the four phases of the business cycle (boom, downturn/contraction, recession, recovery) to changes in key economic indicators at each phase",
      "Identify the limitations of GDP (income inequality, non-market activities, quality of life) and compare it with alternative indicators such as the HDI and happiness indices",
    ],
    sections: [
      {
        title: "GDP and GNI — Two Rulers for Measuring the Size of an Economy",
        subtitle:
          "Where was it produced? (GDP) vs Who earned it? (GNI) — in an open economy this distinction is decisive",
        terms: [
          {
            term: "Gross Domestic Product (GDP)",
            def: "The total market value of all final goods and services produced within a country's borders over a given period (usually one year). Expenditure approach formula: GDP = C (consumption) + I (investment) + G (government spending) + (X − M) (net exports). The nationality of the producer is irrelevant; everything produced domestically is included.",
          },
          {
            term: "Gross National Income (GNI)",
            def: "The total income earned by a country's residents (nationals) both at home and abroad over a given period. GNI = GDP + factor income received from abroad − factor income paid abroad. Profits earned domestically by foreign firms and repatriated overseas are included in GDP but excluded from GNI; income earned abroad by domestic residents is excluded from GDP but added to GNI.",
          },
          {
            term: "Nominal GDP vs Real GDP",
            def: "Nominal GDP is calculated using current-year prices; real GDP is calculated using base-year prices and therefore strips out the effect of price changes. GDP deflator = (Nominal GDP ÷ Real GDP) × 100. To make meaningful comparisons of living standards over time, real GDP must be used.",
          },
          {
            term: "Business Cycle",
            def: "The recurring pattern of expansion and contraction in economic activity around a long-run trend. Four phases: ① Boom — peak growth rate, low unemployment, inflationary pressure; ② Downturn/Contraction — growth rate falls; ③ Recession — two consecutive quarters of negative growth, high unemployment; ④ Recovery — growth rate rebounds. Government and central bank policies aim to reduce the amplitude of these fluctuations.",
          },
        ],
        traps: [
          "Conflating GDP and GNI in an IB exam answer will cost marks. You must state — and illustrate with an example — that 'revenue earned in Korea by a foreign company is included in Korea's GDP but not in Korea's GNI.' This distinction is especially critical for economies with large inflows of foreign direct investment or significant overseas worker remittances (e.g., many developing countries), where the gap between GDP and GNI has a decisive effect on which indicator better reflects living standards. Explicitly stating which measure is more appropriate in a given context is what earns top marks.",
          "Treating an increase in nominal GDP as equivalent to real economic growth is one of the most common traps. If nominal GDP rose by 5% but the GDP deflator increased by 7%, real GDP actually fell. When discussing whether living standards have improved, you must always refer to real GDP (or real GDP per capita), and whenever you see the word 'nominal' you should immediately question whether a price adjustment has been made.",
        ],
        example:
          "A comparison between South Korea and the Philippines illustrates the difference between GDP and GNI. In the Philippines, large numbers of citizens work abroad (in the Middle East, Hong Kong, and the United States) and send remittances home. These overseas earnings are not included in Philippine GDP but are added to GNI. Conversely, output from Samsung Electronics' factory in Vietnam is counted in Vietnamese GDP, but the profits repatriated to Samsung (a Korean corporation) are added to South Korean GNI. As a result, in an economy like the Philippines that relies heavily on remittances, GNI per capita is significantly higher than GDP per capita, and GNI is the more appropriate indicator for assessing residents' actual living standards. Explaining this choice of indicator in context earns analytical marks in IB Paper 1.",
      },
      {
        title: "Limitations of GDP and Alternative Indicators",
        subtitle:
          "GDP is powerful but imperfect — what it leaves out and how those gaps can be addressed",
        terms: [
          {
            term: "GDP Limitation — Non-Market Activities",
            def: "Production activities that carry no market price — such as household labour, volunteering, and subsistence farming — are excluded from GDP. This means that two identical productive activities can produce different GDP figures simply because one is paid and the other is not, leading to an underestimation of the actual living standards in developing countries where unpaid work is widespread.",
          },
          {
            term: "GDP Limitation — Income Inequality",
            def: "GDP is an aggregate measure and therefore reveals nothing about how income is distributed across the population. A high GDP per capita figure can coexist with a high Gini coefficient, meaning that the majority of citizens may enjoy living standards well below the average.",
          },
          {
            term: "Human Development Index (HDI)",
            def: "A composite index developed by the UNDP that combines three dimensions: ① GNI per capita (at purchasing power parity), ② life expectancy at birth, and ③ mean and expected years of schooling. It measures development in a broader sense than GDP alone, but still fails to capture environmental quality, personal security, or subjective well-being.",
          },
        ],
        traps: [
          "Simply listing the limitations of GDP is not enough to earn analysis marks. You must connect each limitation to a specific context that explains how serious that limitation is in practice. For example, the non-market activities problem is particularly acute in low-income countries with high rates of subsistence production, while the income inequality problem is especially prominent in resource-export-dependent economies (high GDP, unequal distribution). When you mention alternative indicators such as the HDI, you must also evaluate their own limitations (e.g., HDI does not capture happiness or environmental sustainability) to produce a balanced, evaluative response.",
        ],
        example:
          "A comparison of Kuwait and Cuba using the HDI brings GDP's limitations to life. Kuwait has a very high GDP per capita, but oil revenues are concentrated among a small elite and access to education and healthcare infrastructure is unequal. Cuba, by contrast, has a far lower GDP per capita, yet thanks to universal healthcare and high literacy rates its life expectancy and education indicators in the HDI are comparatively strong. This comparison demonstrates that 'economic size ≠ human development,' and using both GDP and HDI together to evaluate a country's level of development from multiple angles is exactly the kind of multi-indicator analysis that earns high marks in IB essays.",
      },
    ],
  },
  {
    lessonId: "ib-economics-u3-l2",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 3,
    lessonNum: 2,
    unitName: "Macroeconomics",
    title: "The AD–AS Model and Macroeconomic Equilibrium — Keynesian vs Monetarist Perspectives",
    subtitle:
      "Understanding how aggregate demand and supply curves are drawn and why they shift is the gateway to analysing every macroeconomic policy",
    overview:
      "While the demand-and-supply model in microeconomics explained prices and quantities in individual markets, the Aggregate Demand (AD) – Aggregate Supply (AS) model explains the overall price level and real GDP of an entire economy. In macroeconomics, however, the two major schools — Keynesian and Monetarist (New Classical) — fundamentally disagree about the shape of the AS curve. Keynesians regard the short-run AS as approximately horizontal, while Monetarists argue that the long-run AS is vertical at the full-employment level of output. This difference in perspective completely changes how each school evaluates the effectiveness of fiscal and monetary policy. IB DP Economics requires students to understand both models and to distinguish between them in the appropriate context.",
    objectives: [
      "Explain why the AD curve slopes downward (wealth effect, interest-rate effect, international trade effect) and identify the four factors that shift AD (C, I, G, X−M)",
      "Distinguish between the Keynesian short-run AS (reverse-L shape) and the Monetarist long-run AS (vertical line) and compare the effect of an increase in AD under each model",
      "Explain the concepts of an inflationary gap and a deflationary gap in AD–AS equilibrium and represent them in a written diagram description",
      "Analyse how supply shocks (adverse cost-push shocks vs favourable supply shocks) shift the AS curve and produce combined effects on the price level and real GDP",
      "Understand the concept of the Keynesian multiplier and explain its relationship to the marginal propensity to consume (MPC)",
    ],
    sections: [
      {
        title: "Aggregate Demand (AD) — What Determines Economy-Wide Demand?",
        subtitle:
          "AD = C + I + G + (X − M) — if any one of the four engines stalls, the economy cools",
        terms: [
          {
            term: "Aggregate Demand (AD)",
            def: "The total quantity of real GDP that households, firms, the government, and the foreign sector wish to purchase at a given price level. The AD curve slopes downward: a rise in the price level reduces total demand because ① real wealth (assets) falls (wealth effect), ② higher interest rates reduce investment and consumption (interest-rate effect), and ③ exports fall while imports rise (international trade effect). A change in any factor other than the price level shifts the entire AD curve.",
          },
          {
            term: "Factors Shifting AD",
            def: "① Consumption (C): changes in income, asset values, consumer confidence, interest rates, or taxes. ② Investment (I): changes in expected business profits, interest rates, technological innovation, or corporate tax rates. ③ Government spending (G): directly adjusted through fiscal policy. ④ Net exports (X−M): changes in trading-partner incomes, exchange rates, or trade barriers. An increase in any one of these shifts the AD curve to the right.",
          },
          {
            term: "Keynesian Multiplier",
            def: "The ratio by which an initial increase in spending (e.g., a rise in government expenditure ΔG) is amplified into a larger final increase in national income. Formula: multiplier = 1 ÷ (1 − MPC) = 1 ÷ MPS. The higher the MPC (the lower the propensity to save), the larger the multiplier — a small initial injection produces a large GDP increase. Example: if MPC = 0.8, the multiplier = 5. In an open economy, however, leakages through imports and taxation make the real-world multiplier considerably smaller.",
          },
          {
            term: "Marginal Propensity to Consume (MPC)",
            def: "The fraction of an additional unit of income that is spent on consumption. MPC + MPS (marginal propensity to save) = 1. Example: if income rises by $1,000 and $800 is spent on consumption, MPC = 0.8.",
          },
        ],
        traps: [
          "Explaining the downward slope of AD simply as 'demand falls when prices rise' will lose marks. IB examiners require you to describe all three mechanisms — wealth effect, interest-rate effect, and international trade effect — with their causal chains. For example: 'A rise in the price level → fall in real asset values → households feel less wealthy → reduced consumption spending (wealth effect).' Omitting even one of the three effects makes your answer incomplete in the examiner's assessment.",
          "Do not confuse the closed-economy and open-economy multipliers when applying the formula. The closed-economy multiplier is 1 ÷ MPS, but in a real open economy a portion of income leaks out through taxation (t) and imports (m), so the multiplier = 1 ÷ (MPS + t + m), which is considerably smaller. In HL calculation questions where a tax rate and import propensity are provided, you must incorporate these leakages into your multiplier calculation.",
        ],
        example:
          "The South Korean government's 2009 fiscal stimulus package illustrates the multiplier effect. In the immediate aftermath of the global financial crisis, the Korean government announced a fiscal spending package of approximately ₩28 trillion (an increase in G). Assuming a Korean MPC of 0.75, the closed-economy multiplier would be 1 ÷ 0.25 = 4, implying a theoretical GDP increase of ₩112 trillion. However, South Korea is a highly trade-dependent open economy, so the actual multiplier was far smaller. A substantial share of additional income was 'leaked' into spending on imports rather than domestically produced goods. Noting that the multiplier must be adjusted for the degree of openness, the tax rate, and the import propensity when applied to real economies is exactly the kind of evaluative commentary that lifts an IB answer to the top mark band.",
      },
      {
        title: "Aggregate Supply (AS) — Keynesian Model vs Monetarist Model",
        subtitle:
          "The shape of the AS curve determines the effectiveness of policy — make both schools of thought your own",
        terms: [
          {
            term: "Keynesian Short-Run AS (SRAS)",
            def: "Keynesians argue that the short-run AS curve has three distinct segments: ① Horizontal segment — when the economy is in deep recession (mass unemployment, idle capacity), firms can increase output without raising prices (elastic supply). ② Upward-sloping segment — as the economy moves toward normal capacity, bottlenecks emerge and higher costs are required to expand output further. ③ Vertical segment — near full employment, output cannot be increased further regardless of the price level.",
          },
          {
            term: "Monetarist Long-Run AS (LRAS)",
            def: "Monetarists (New Classical economists) argue that in the long run the economy produces at the full-employment level of real GDP — potential GDP (Y*) — determined by the natural rate of unemployment. The LRAS is therefore a vertical line at Y*. In the long run, changes in the price level cannot affect real GDP; demand-side expansion only raises the nominal price level and does not increase real output.",
          },
          {
            term: "Inflationary Gap vs Deflationary Gap",
            def: "Inflationary gap: the current equilibrium real GDP (Y_e) exceeds potential GDP (Y*). The economy is overheating and inflationary pressure is high. Deflationary gap (recessionary gap): Y_e falls short of Y*. Unemployment is high and growth is sluggish. Contractionary policies are used to close an inflationary gap; expansionary policies to close a deflationary gap.",
          },
          {
            term: "Supply Shock",
            def: "An external event that shifts the AS curve itself. Negative supply shock: a sudden rise in input costs (raw materials, wages, energy) or a natural disaster shifts AS to the left, producing stagflation — rising prices combined with falling real GDP and rising unemployment. Positive supply shock: technological innovation or a productivity improvement shifts AS to the right, achieving lower prices and higher real GDP simultaneously.",
          },
        ],
        traps: [
          "Mixing up Keynesian AS and Monetarist LRAS is a frequent error in IB responses. In the Keynesian model, an AD increase in the horizontal segment raises real GDP with no change in the price level. In the Monetarist long-run equilibrium, the same AD increase raises only the price level and leaves real GDP unchanged. If you do not explicitly state whether you are working in a 'short-run / Keynesian' or 'long-run / Monetarist' framework, the examiner cannot award marks for analysis. Always identify your model.",
          "Defining stagflation merely as 'inflation and recession occurring simultaneously' and stopping there will not earn analysis marks. You must describe the mechanism: 'a negative supply shock shifts SRAS to the left → the price level rises, real GDP falls, and unemployment increases simultaneously.' You must also note the policy dilemma this creates: expanding AD to rescue GDP will push prices even higher, while contracting AD to fight inflation will depress GDP further. Both elements are required for full credit.",
        ],
        example:
          "The 1973 oil shock and the 2020s energy crisis offer parallel examples of negative supply shocks. When OPEC's oil embargo quadrupled oil prices in 1973, production costs soared for firms worldwide, shifting the global SRAS to the left. Stagflation resulted: prices surged while real GDP fell. Governments faced a stark dilemma — stimulating AD to revive output would worsen inflation, while tightening AD to control inflation would deepen the recession. The same structural dynamic repeated itself in 2022, when the Russia–Ukraine war drove up energy and food prices sharply. Using this case to articulate the core lesson of the AD–AS model — that demand-side policies alone cannot fully address a supply-side shock — will simultaneously earn analysis and evaluation marks in an IB essay.",
      },
    ],
  },
  {
    lessonId: "ib-economics-u3-l3",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 3,
    lessonNum: 3,
    unitName: "Macroeconomics",
    title: "Macroeconomic Objectives and Policy Instruments — Growth, Unemployment, Inflation, and the Balance of Payments",
    subtitle:
      "Understanding the trade-offs among the four objectives and evaluating demand-side and supply-side policies accurately is the heart of IB macroeconomics essays",
    overview:
      "No government can simultaneously and perfectly achieve all four macroeconomic objectives — economic growth, low unemployment, low and stable inflation, and a sustainable current account balance. Policy instruments fall broadly into demand-side policies (fiscal policy and monetary policy) and supply-side policies (labour market reform, education, deregulation, privatisation, etc.), each with different effects, time lags, and side-effects. IB DP Economics macroeconomics essays do not reward a single-track conclusion about which policy is 'correct.' Instead, they require context-dependent evaluation: how does the effectiveness of each policy change depending on the economic circumstances — the phase of the business cycle, the rate of inflation, the type of unemployment, and the degree of openness?",
    objectives: [
      "Define the three types of unemployment (cyclical, structural, frictional) and match each type to the most appropriate policy response",
      "Describe the causes of demand-pull inflation and cost-push inflation and represent each using an AD–AS diagram description",
      "Compare the operating mechanisms of expansionary and contractionary fiscal policy and expansionary and contractionary monetary policy",
      "Explain how the main supply-side policy instruments (education, vocational training, R&D support, labour flexibility, deregulation) shift the potential GDP (LRAS)",
      "Understand the short-run Phillips curve trade-off between inflation and unemployment and evaluate its limitations",
    ],
    sections: [
      {
        title: "Unemployment and Inflation — Diagnosing the Type Determines the Prescription",
        subtitle:
          "Unemployment is not monolithic — distinguishing cyclical, structural, and frictional types is essential before prescribing a remedy",
        terms: [
          {
            term: "Cyclical (Demand-Deficient) Unemployment",
            def: "Unemployment caused by a deficiency of aggregate demand during a recession. In the AD–AS model it appears when Y_e < Y*, i.e., a deflationary (recessionary) gap exists. It can be addressed through demand-expansion policies (fiscal and monetary) that increase AD.",
          },
          {
            term: "Structural Unemployment",
            def: "Unemployment arising from structural changes in the economy — automation, technological displacement, de-industrialisation — that render existing skills obsolete. It must be addressed through supply-side policies: vocational retraining, investment in education, and support for geographic mobility. Demand-expansion policies alone cannot resolve structural unemployment.",
          },
          {
            term: "Demand-Pull Inflation",
            def: "A sustained rise in the price level caused when aggregate demand (AD) exceeds the economy's productive capacity (LRAS). In the AD–AS diagram, AD shifts rightward beyond Y*, moving equilibrium along or past the LRAS, so the price level rises without a lasting increase in real output. Classic description: 'too much money chasing too few goods.'",
          },
          {
            term: "Cost-Push Inflation",
            def: "A rise in the price level combined with a simultaneous fall in real GDP caused by an increase in production costs (wages, raw materials, energy) that shifts SRAS to the left. Triggered by adverse supply shocks, it cannot easily be resolved by demand-expansion policies and can lead to stagflation.",
          },
        ],
        traps: [
          "Answering 'unemployment is high, therefore government spending should increase' without qualification will lose marks in an IB exam. You must first diagnose the type of unemployment. If it is cyclical, expansionary fiscal and monetary policy is effective; if it is structural, demand expansion only generates inflation while leaving unemployment unresolved. The required three-step logic is: ① identify the cause and type of unemployment → ② recommend the policy appropriate to that type → ③ evaluate its limitations.",
          "When describing the two types of inflation without a diagram, you must explicitly state: demand-pull involves 'the AD curve shifting rightward → price level rises, real GDP rises,' while cost-push involves 'the SRAS curve shifting leftward → price level rises, real GDP falls.' Writing only that 'prices rose' without identifying which curve shifted means the examiner cannot award analysis marks.",
        ],
        example:
          "South Korea's 2022–2023 inflation illustrates both types simultaneously. In 2022 Korea's consumer price inflation hit around 5%, the highest since the 1990s, driven by two distinct pressures. First, pent-up consumer demand unleashed after the COVID-19 pandemic shifted AD sharply to the right — classic demand-pull. Second, the Russia–Ukraine war sent energy and grain prices surging, shifting SRAS to the left — classic cost-push. Because both forces operated at once, the policy response was unusually difficult. The Bank of Korea chose to raise its benchmark interest rate to restrain AD, but this demand-side tool did nothing to address the supply-side cost pressures and had the side-effect of slowing growth. Describing this policy limitation in the context of a compound inflation episode earns high marks in the evaluation paragraph of IB Paper 1.",
      },
      {
        title: "Demand-Side Policies vs Supply-Side Policies — Comparing Effects and Limitations",
        subtitle:
          "Fiscal and monetary policy manage short-run demand; supply-side policies raise long-run potential output",
        terms: [
          {
            term: "Expansionary Fiscal Policy",
            def: "A policy that increases AD by raising government spending (G↑) or cutting taxes (T↓). Effective at reducing cyclical unemployment during recessions. Drawbacks: implementation lags (decision, execution, and impact lags), the crowding-out effect (government borrowing raises interest rates, displacing private investment), and the accumulation of fiscal deficits and public debt.",
          },
          {
            term: "Expansionary Monetary Policy",
            def: "A policy through which the central bank increases aggregate demand by lowering the benchmark interest rate or purchasing assets (quantitative easing, QE) to expand liquidity, thereby stimulating consumption and investment. Advantage: faster to implement than fiscal policy. Drawbacks: the liquidity trap (when nominal interest rates approach zero, further cuts lose traction), weak transmission to the real economy during a credit crunch, and the risk of asset price bubbles.",
          },
          {
            term: "Supply-Side Policies",
            def: "Policies aimed at expanding the economy's productive capacity (potential GDP, LRAS) over the long run. ① Market-oriented supply-side policies: deregulation, cuts in corporate and income tax rates, privatisation, increased labour market flexibility. ② Interventionist supply-side policies: investment in education and vocational training, R&D subsidies, infrastructure spending. Effects materialise over the long run; these policies cannot address short-run cyclical downturns immediately.",
          },
          {
            term: "Phillips Curve",
            def: "An empirical relationship showing an inverse correlation between the inflation rate and the unemployment rate in the short run. Reducing unemployment by expanding AD tends to raise inflation; reducing inflation by contracting AD tends to raise unemployment. However, the stagflation of the 1970s broke down this relationship, leading Monetarists to argue that the long-run Phillips curve is vertical at the natural rate of unemployment.",
          },
        ],
        traps: [
          "Concluding that supply-side policies are simply 'good because they raise efficiency' will earn a C–D grade in IB. Market-oriented supply-side policies (deregulation, privatisation, tax cuts) may improve efficiency but can worsen income inequality; interventionist policies (education, R&D) support long-run growth but impose a short-run fiscal burden. You must discuss both the benefits and these trade-offs, and reach a context-dependent conclusion about which type of supply-side policy is most appropriate under given conditions.",
          "Failing to distinguish between the short-run and long-run Phillips curves will lose marks. You need to develop the argument that 'the short-run Phillips curve slopes downward, implying an inflation–unemployment trade-off, but in the long run it is vertical at the natural rate of unemployment, so demand-expansion policies ultimately generate only inflation.' Referencing the 1970s stagflation as a historical example of the short-run Phillips curve shifting rightward strengthens the evaluation.",
        ],
        example:
          "The Federal Reserve's quantitative easing (QE) programme from 2008 to 2015 illustrates both the strengths and limits of demand-side monetary policy. After the global financial crisis, the Fed cut the federal funds rate to near zero and purchased trillions of dollars of Treasury bonds and mortgage-backed securities. This successfully supported AD and prevented a deeper contraction, but two key limitations emerged. First, with interest rates near zero, there was virtually no room for further cuts — the classic 'liquidity trap' concern. Second, the released liquidity flowed into asset prices (equities and real estate) rather than productive real investment, actually widening income inequality. These shortcomings explain why the Obama administration pursued the American Recovery and Reinvestment Act (fiscal stimulus) alongside long-run supply-side investments in infrastructure and education. Linking demand-side and supply-side policies to a real case in this way positions an IB Paper 1 essay in the top mark band.",
      },
      {
        title: "Trade-Offs Among the Four Macroeconomic Objectives — No Perfect Policy Mix Exists",
        subtitle:
          "Growth, unemployment, inflation, and the current account can conflict with one another — evaluating this tension is the ultimate goal of IB macroeconomics essays",
        terms: [
          {
            term: "Growth vs Inflation Trade-Off",
            def: "Using AD-expansion policies to boost economic growth and reduce unemployment increases demand-pull inflationary pressure as the economy approaches potential GDP. This trade-off is represented by the downward slope of the short-run Phillips curve and is the reason central banks adopt inflation targeting.",
          },
          {
            term: "Inflation Targeting",
            def: "A monetary policy framework in which the central bank sets the maintenance of a specific inflation rate (e.g., around 2%) as its primary objective. Adopted by the Bank of Korea, the Bank of England, the Bank of Canada, and many others. The higher the central bank's credibility, the more stable inflation expectations become, making it easier to control actual inflation.",
          },
          {
            term: "Growth vs Current Account Balance Trade-Off",
            def: "During an economic boom, higher incomes increase demand for imports, which can deteriorate the current account balance. Conversely, contracting AD to reduce imports improves the current account but sacrifices growth and employment. This policy dilemma is especially prominent in export-dependent economies.",
          },
          {
            term: "Natural Rate of Unemployment (NRU)",
            def: "The sum of frictional and structural unemployment that persists regardless of the business cycle — the unemployment rate when the economy is in long-run equilibrium (on its LRAS). Attempting to push unemployment below the NRU generates demand-pull inflation. Lowering the NRU itself is the objective of supply-side policies such as education and vocational training.",
          },
        ],
        traps: [
          "Concluding in an IB Paper 1 essay that 'expansionary fiscal policy is the correct policy because it achieves growth' — judging by a single objective — will lose marks. The marking criteria require you to recognise trade-offs among multiple objectives and to evaluate 'in what economic circumstances, when prioritising which objective, is this policy appropriate.' For example, if the economy is in recession with low inflation and a current account surplus, the side-effects of expansionary fiscal policy are limited and its benefits large; but if the economy is at full employment with high inflation and a current account deficit, the same policy would worsen all of those objectives. Providing this context is essential.",
          "Using 'natural rate of unemployment' and 'full employment' interchangeably is acceptable, but mistaking 'full employment' for 'zero unemployment' is a frequently penalised error. Full employment means cyclical unemployment is zero while frictional and structural unemployment still exist — the unemployment rate equals the NRU, not zero. When using the term 'full employment' in an exam answer, always clarify: 'cyclical unemployment is zero, but frictional and structural unemployment persist, so the unemployment rate stands at the NRU.'",
        ],
        example:
          "South Korea's 2023–2024 policy dilemma illustrates the simultaneous tension among all four objectives. In 2023, Korea maintained a high benchmark interest rate (monetary tightening) to control inflation, but the resulting increase in debt-servicing costs for households weakened consumption and slowed GDP growth — a classic inflation-control vs growth trade-off. At the same time, weak semiconductor exports put downward pressure on the current account surplus, adding a growth vs current account dimension. The government refrained from large-scale expansionary fiscal policy on fiscal-consolidation grounds, but a number of economists argued for increased investment in education and vocational training (supply-side policy) to address structural and youth unemployment. This case — where all four objectives (growth, low unemployment, low inflation, current account balance) are simultaneously in tension — is precisely what an IB macroeconomics essay should address: evaluating the government's priority choices and the rationale behind them.",
      },
    ],
  },
];
