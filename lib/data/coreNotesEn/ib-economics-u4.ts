/**
 * Core Notes English version — IB Economics Unit 4 (The Global Economy).
 * All content faithfully translated from the Korean storytelling original:
 * objectives · terms · traps · examples fully preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ECONOMICS_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-economics-u4-l1",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 4,
    lessonNum: 1,
    unitName: "The Global Economy",
    title: "International Trade — Comparative Advantage, Free Trade and Protectionism",
    subtitle:
      "Why do nations trade with one another, and why do they also try to block one another? Master the logic of this tension and half of every IB trade question is already solved",
    overview:
      "Where Unit 3 covered domestic macroeconomics — growth, unemployment, and inflation — Unit 4 widens the lens beyond national borders. The starting point of international trade is a simple fact: no country can produce everything well. The theory of comparative advantage shows that because opportunity costs differ from country to country, specialisation and trade allow every country to gain at the same time. In reality, however, governments erect protectionist barriers such as tariffs, import quotas, and subsidies. The justification of protecting domestic industry constantly collides with the side-effect of lost consumer welfare. In this lesson you will gain a precise understanding of the core concepts of trade theory and analyse — with narrative and worked structure — the mechanisms by which protectionist measures operate and who gains and who loses from them.",
    objectives: [
      "Explain the difference between absolute advantage and comparative advantage using numerical examples based on opportunity cost",
      "Evaluate the limitations of comparative advantage theory (violated assumptions — transport costs, economies of scale, imperfect markets)",
      "Describe in prose the effects of a tariff on domestic consumers, producers, government revenue, and social welfare, using the concepts of consumer surplus and producer surplus",
      "Analyse and compare the operating mechanisms and economic effects of an import quota and an export subsidy against those of a tariff",
      "Evaluate, in a balanced way, the gains from free trade (increased consumer surplus, efficient resource allocation, economies of scale) against the arguments for protectionism (infant industry, national security, response to unfair trade)",
    ],
    sections: [
      {
        title: "Comparative Advantage — The Logic of Trade Where Everybody Wins",
        subtitle:
          "Even a country that is absolutely less efficient at everything can still gain from trade — opportunity cost is the key",
        terms: [
          {
            term: "Comparative Advantage",
            def: "The ability of a country to produce a particular good at a lower opportunity cost than another country. It is distinct from absolute advantage (producing more output with the same resources). When countries specialise in the good in which they hold a comparative advantage and then trade, both can consume more than they could under self-sufficiency. Example: if the opportunity cost of producing one tonne of wheat is 0.5 tonnes of rice in country A and 1.5 tonnes of rice in country B, then A has a comparative advantage in wheat.",
          },
          {
            term: "Terms of Trade (ToT)",
            def: "The ratio of the export price index to the import price index (×100). ToT = (index of export prices ÷ index of import prices) × 100. When the ToT rises, a country can buy more imports with the same volume of exports (an improvement in the terms of trade), raising real income. Countries that depend on exporting primary commodities suffer a deterioration in their terms of trade when raw-material prices fall, which holds back growth.",
          },
          {
            term: "Gains from Free Trade",
            def: "① Increased consumer surplus: when the world price is below the domestic price, consumers buy more cheaply. ② Efficient resource allocation: resources move out of comparative-disadvantage industries and into comparative-advantage industries. ③ Economies of scale: a larger market lowers average production costs. ④ Competitive pressure stimulates innovation. However, these gains are not distributed evenly across society, so income inequality may worsen.",
          },
          {
            term: "Arguments for Protectionism",
            def: "① Infant industry: temporarily protecting a newly developing industry until it achieves economies of scale. ② National security: dependence on imports of food, energy, and defence goods is dangerous. ③ Anti-dumping (response to unfair trade): countering foreign firms that export below cost to destroy domestic industry. ④ Protecting domestic employment. Every argument must be evaluated alongside its counter-argument — long-run inefficiency and the risk of retaliatory tariffs.",
          },
        ],
        traps: [
          "Confusing comparative advantage with absolute advantage in an IB exam answer costs marks immediately. You must always prove the principle that 'a comparative advantage can exist even without an absolute advantage' using a numerical opportunity-cost example. For instance, even if a developed country holds an absolute advantage in every good, a developing country holds a comparative advantage in the good it produces relatively less inefficiently, so both countries gain from trade — develop this logic explicitly. Explaining it merely as 'making it more cheaply' without an opportunity-cost calculation earns no analysis marks.",
          "Stopping at a list of arguments for protectionism puts you in the C–D mark band. You must also describe the conditions under which each argument is valid and its limitations. Infant-industry protection raises the problem of 'when does protection end' and risks being made permanent by political pressure; the employment-protection argument produces side-effects in the long run of an inefficient domestic industry and higher consumer prices. Whatever the argument, evaluating both sides in a balanced way is the structure of a high-scoring IB answer.",
        ],
        example:
          "South Korea–Vietnam trade in semiconductors and textiles makes comparative advantage tangible. South Korea possesses world-leading semiconductor technology and therefore holds both an absolute and a comparative advantage in chips. Vietnam cannot make semiconductors more efficiently than South Korea, but thanks to its cheap labour its opportunity cost in clothing and textile production is very low. If Vietnam can produce 5 units of clothing for every 1 unit of semiconductors it gives up, while South Korea can produce only 2 units of clothing for every 1 unit of semiconductors it gives up, then Vietnam has a comparative advantage in clothing and South Korea in semiconductors. If each specialises and they trade, both countries can consume more than under self-sufficiency. Developing this logic together with the opportunity-cost figures secures high marks on an IB Paper 1 data-response question.",
      },
      {
        title: "Tariffs, Import Quotas, and Subsidies — The Three Weapons of Protectionism",
        subtitle:
          "A tariff generates government revenue, a quota sets a ceiling on import volume, and a subsidy supports domestic firms — you must describe the differences among the three instruments precisely",
        terms: [
          {
            term: "Tariff",
            def: "A tax imposed on imported goods. It raises the price of imports, reducing the quantity imported and protecting domestic producers. Effects: domestic output rises, consumption falls, imports fall, government tariff revenue is generated, consumer surplus falls, producer surplus rises, and a deadweight (welfare) loss occurs. A tariff differs from a quota in that it generates government revenue.",
          },
          {
            term: "Import Quota",
            def: "A measure that legally limits the maximum quantity that may be imported over a given period. It has price-raising and import-reducing effects similar to a tariff, but generates no government revenue; instead, the resulting margin (quota rent) accrues to the licensed foreign suppliers or domestic importers. Because the quantity restriction is definite, the protection of domestic industry is more direct.",
          },
          {
            term: "Export Subsidy",
            def: "A subsidy paid by a government to its own exporting firms. It lowers firms' production costs, enabling them to export at artificially low prices on the world market. Producers in the exporting country benefit, but from the importing country's perspective its domestic industry may be exposed to dumping, making it a source of disputes. The WTO regulates some forms of export subsidy, such as agricultural subsidies.",
          },
        ],
        traps: [
          "In tariff analysis, writing only the conclusion that 'consumers are worse off' without describing the precise welfare distribution earns no analysis marks. The IB exam requires you to break the effect of a tariff into ① the fall in consumer surplus, ② the rise in producer surplus, ③ government tariff revenue, and ④ the deadweight loss (the area of two triangles). Even when answering in prose without a diagram, you must describe the price and quantity changes step by step, e.g. 'as the price rises from the world price P_w before the tariff to P_w + tariff after it, imports fall from Q_3 − Q_2 to Q_4 − Q_1.'",
          "Simplifying the effects of a tariff and an import quota as 'the same' is wrong. The crucial differences are 'whether government revenue is generated' and 'to whom the quota rent accrues.' A tariff generates government revenue, whereas a quota producing the same quantity restriction lets that rent accrue to importers or foreign suppliers. Failing to describe this difference in an IB HL question loses you the comparative-analysis marks.",
        ],
        example:
          "Compare the US steel tariffs (2018) with EU agricultural subsidies to see the real-world effects of tariffs and subsidies. In 2018 the Trump administration imposed tariffs of 25% and 10% on steel and aluminium respectively, justified as protecting domestic industry. In the short run the producer surplus of US steel producers rose, but the costs of automobile and machinery manufacturers that use steel as an input increased, consumer prices rose, and a deadweight loss occurred. At the same time the EU, China, and Canada imposed retaliatory tariffs, harming US exporters as well. In the EU agricultural-subsidy case, European farmers were able to export below world-market prices, and the resulting 'development-impeding' effect of pricing African developing-country farmers out of competition drew criticism. Evaluating both the short-run benefits and the long-run side-effects and retaliation risk of protectionist measures in this way earns balanced-evaluation marks in an IB Paper 1 essay.",
      },
    ],
  },
  {
    lessonId: "ib-economics-u4-l2",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 4,
    lessonNum: 2,
    unitName: "The Global Economy",
    title: "Exchange Rates and the Balance of Payments — Currency Valuation and External Balance",
    subtitle:
      "When an exchange rate rises or falls, exports, imports, and inflation all change — you must understand the link between the current account and the financial account to solve IB international-finance questions",
    overview:
      "The value of a country's currency is not just a number. When the exchange rate changes, export prices, import prices, inflation, and even the domestic growth rate all shift in a chain reaction. Under a floating exchange rate system the rate is determined by supply and demand in the foreign-exchange market; under a fixed exchange rate system the government or central bank intervenes to hold the rate at a particular level. The balance of payments is an accounting record of all the economic transactions a country conducts with the rest of the world, composed of two main axes: the current account and the financial account. Exchange rates and the balance of payments are tightly linked: a persistent current-account deficit puts downward pressure on the exchange rate, and a falling exchange rate in turn affects export competitiveness.",
    objectives: [
      "Explain the demand and supply factors that determine the exchange rate (the value of the domestic currency) under a floating system, and analyse the causes of currency appreciation and depreciation",
      "Describe, as a causal chain, the effects of exchange-rate changes on export and import prices, the current account, inflation, and real GDP",
      "Evaluate the operating method (central-bank intervention in the foreign-exchange market, changes in reserves) and the advantages and disadvantages of a fixed exchange rate system",
      "Explain the composition of the balance of payments — the current account (goods, services, primary income, secondary income) and the financial account (FDI, portfolio investment, reserve assets)",
      "Evaluate, according to context, the causes and consequences of current-account deficits and surpluses and the means of correcting imbalances (devaluation, austerity, structural reform)",
    ],
    sections: [
      {
        title: "Exchange-Rate Determination — Floating and Fixed Systems",
        subtitle:
          "Currency value is determined by supply and demand — and central banks sometimes intervene in that market",
        terms: [
          {
            term: "Floating Exchange Rate System",
            def: "A system in which the exchange rate is determined freely by supply and demand in the foreign-exchange market. When demand for the domestic currency rises (inflows of foreign investment, higher exports, rising interest rates), the currency appreciates; when supply rises (higher imports, capital outflows, falling interest rates), it depreciates. No foreign-exchange reserves are required, giving high policy flexibility, but the drawback is high exchange-rate volatility.",
          },
          {
            term: "Fixed Exchange Rate System",
            def: "A system in which the central bank intervenes directly in the foreign-exchange market to hold the rate within a particular level (or a narrow band). If the rate falls below target, it defends the currency by buying it; if it rises, it sells the currency. Exchange-rate stability reduces trade and investment uncertainty, but independent monetary policy is constrained and there is a risk of exhausting foreign-exchange reserves.",
          },
          {
            term: "Effects of Appreciation / Depreciation",
            def: "Appreciation: exports become more expensive abroad, so exports fall; imports become cheaper, so imports rise → possible deterioration of the current account, with eased inflationary pressure as import prices fall. Depreciation: exports become cheaper abroad, so exports rise; imports become more expensive, so imports fall → possible improvement of the current account (though the J-curve effect means it may worsen in the short run), with cost-push inflation from rising import prices.",
          },
        ],
        traps: [
          "A common error is confusing whether a rise in the exchange rate (e.g., 1,300 won per dollar → 1,400 won per dollar) represents an 'appreciation' or a 'depreciation' of the won. In an IB exam, always check the quotation convention (direct vs indirect). If the 'won price per dollar' has risen, that is a depreciation of the won (the won's value falls, the dollar's rises). Conversely, under a 'dollar price per won' convention, a rising number means the won has appreciated. You must state which currency is the basis of the quotation before beginning your analysis so the examiner can follow your logic.",
          "Asserting that a depreciation automatically improves the current account is wrong. You must mention the J-curve effect. In the short run, export and import contracts are already fixed and import demand is price-inelastic, so import spending does not fall and the current account temporarily worsens. The current account improves in the long run only if the Marshall–Lerner condition (the sum of the price elasticities of demand for exports and imports exceeds 1) is satisfied. Describing both concepts together earns high marks in exchange-rate / current-account linkage analysis.",
        ],
        example:
          "Analyse the compound effects on the Korean economy of the 2022 surge in the won–dollar rate (a won depreciation). In the second half of 2022 the won–dollar rate at one point exceeded 1,430 won, the highest since the global financial crisis. For large exporters such as Samsung Electronics and Hyundai Motor, converting dollar-denominated revenue into won increased profits (the depreciation raised price competitiveness). On the other hand, firms that import energy and raw materials in dollars saw their costs surge, and consumers faced a heavier price burden from rising import prices. The Bank of Korea had to raise its benchmark interest rate to curb inflation, which simultaneously increased demand for the won and thereby moderated the depreciation. Understanding that the effects of an exchange-rate movement act differently on exporters, importers, consumers, and policymakers — and describing 'who gains and who loses' — produces a high-scoring IB answer.",
      },
      {
        title: "The Balance of Payments — Structure of the Current and Financial Accounts",
        subtitle:
          "How to read a country's external transaction ledger — a current-account deficit must always be offset by a financial-account surplus",
        terms: [
          {
            term: "Current Account",
            def: "The sum of the goods balance (trade in goods), the services balance, primary income (wages and investment income earned abroad), and secondary income (overseas remittances and aid). A current-account surplus means a country earns more from abroad than it spends; a deficit means the opposite. A chronic current-account deficit can lead to rising net external debt, downward pressure on the currency, and questions over sustainability.",
          },
          {
            term: "Financial Account",
            def: "Records changes in foreign direct investment (FDI), portfolio investment (equities and bonds), other investment (bank lending), and reserve assets (the central bank's foreign-exchange reserves). By the balance-of-payments identity, current account + financial account + capital account = 0, so a current-account deficit must be financed by a financial-account surplus (capital inflows). This is known as 'financing the current-account deficit.'",
          },
          {
            term: "Current-Account Imbalances — Causes and Consequences",
            def: "Causes: differences in domestic saving and investment rates, international competitiveness (productivity and costs), the exchange rate, the business cycle, and the terms of trade. Consequences of chronic deficits: accumulating net external debt, downward currency pressure, a heavier external-debt repayment burden, and falling international confidence. Consequences of chronic surpluses: protectionist pressure from trading partners, upward currency pressure, and possible suppression of trading partners' growth. Means of correction: exchange-rate adjustment (devaluation/revaluation), demand management (fiscal and monetary tightening), structural reform (supply-side productivity improvement).",
          },
        ],
        traps: [
          "A frequent error is confusing the identity that 'the balance of payments always balances' with the reality that 'the current account or financial account can show an imbalance.' The overall balance of payments is always in balance by the double-entry bookkeeping principle (current + financial + capital = 0), but the current account taken alone can persistently run a deficit or surplus. If you do not clearly describe this distinction, the examiner will judge that you have confused the concepts.",
          "Asserting that a current-account deficit is always 'a bad thing' loses marks. A deficit can be sustainable when it is financed by capital inflows for increased domestic investment (importing capital goods) or for economic growth. By contrast, a deficit arising from rising consumption imports and a falling saving rate is problematic for long-run sustainability. You must reach the context-dependent conclusion that 'the evaluation changes depending on the cause of the deficit and how it is financed' to earn high marks.",
        ],
        example:
          "Use the US's chronic current-account deficit and China's surplus as a case study of balance-of-payments imbalances. Since the 2000s the US has consistently run annual current-account deficits in the hundreds of billions of dollars. This is because US consumers import manufactured goods from China and Germany on a large scale, while the US mainly exports services and high-tech products. The US current-account deficit is financed by a financial-account surplus as China, Japan, and others purchase US Treasury bonds. From China's perspective, intervention to avoid upward pressure on the yuan by buying dollars (accumulating reserves) is reflected in its financial account. The US has pointed to this structure as 'Chinese currency manipulation' and a cause of trade friction, which led to the 2018 tariff war. Describing this chain of balance-of-payments imbalance → exchange-rate conflict → protectionism earns integrated-analysis marks in an IB Paper 2 essay.",
      },
    ],
  },
  {
    lessonId: "ib-economics-u4-l3",
    courseId: "ib-economics",
    subjectLabel: "IB Economics",
    emoji: "📈",
    unit: 4,
    lessonNum: 3,
    unitName: "The Global Economy",
    title: "Economic Integration, Development, and Sustainability — From the WTO to the SDGs",
    subtitle:
      "Understanding how regional trade blocs and the WTO shape the global economy, and why 'growth' and 'development' are different concepts, brings Unit 4 to its climax",
    overview:
      "The final lesson of Unit 4 connects two large themes. First, economic integration. Countries cooperate to expand free trade through various forms — FTAs, customs unions, common markets, and economic unions — and the WTO manages this within a multilateral framework. Yet regional trade blocs, while benefiting member states, can discriminate against non-members and produce trade-diversion effects. Second, economic development. Mere 'growth' in which GDP rises differs from 'development,' in which living standards, health, education, and distribution improve together. Evaluating the structural barriers developing countries face (primary-commodity dependence, debt, deteriorating terms of trade, institutional weakness) and the strategies to overcome them (foreign direct investment, aid, debt relief, trade liberalisation, sustainable development) is the final advanced topic of IB DP Economics.",
    objectives: [
      "Distinguish the five stages of economic integration (preferential trade agreement, free trade agreement, customs union, common market, economic union) and explain the characteristics of each stage",
      "Evaluate the concepts of trade creation and trade diversion in connection with WTO principles",
      "Explain the difference between economic growth and economic development using indicators (GDP vs HDI, the multidimensional poverty index, etc.)",
      "Analyse the structural barriers that impede the development of developing countries (primary-commodity dependence, deteriorating terms of trade, debt, brain drain, institutional weakness)",
      "Evaluate the meaning of sustainable development and the trade-offs among its three dimensions — environmental, social, and economic",
    ],
    sections: [
      {
        title: "Economic Integration and the WTO — Regional Cooperation and the Multilateral Trade Order",
        subtitle:
          "A free trade agreement can both create and divert trade — clearly describing both sides is what produces top IB marks",
        terms: [
          {
            term: "Stages of Economic Integration",
            def: "① Preferential Trade Agreement (PTA): lower tariffs applied to specific products. ② Free Trade Agreement (FTA): tariffs and quotas abolished among members, while each member keeps its own tariffs on non-members. ③ Customs Union: FTA + a common external tariff applied to non-members (e.g., Mercosur). ④ Common Market: customs union + free movement of labour and capital (e.g., the EU single market). ⑤ Economic Union: common market + coordinated monetary and fiscal policy and a single currency (e.g., the eurozone). The deeper the stage of integration, the greater the transfer of sovereignty required.",
          },
          {
            term: "Trade Creation vs Trade Diversion",
            def: "Trade creation: the effect by which forming a customs union replaces inefficient domestic production with efficient production from a member country, raising overall welfare. Trade diversion: the effect by which imports from a more efficient non-member are replaced by now relatively cheaper imports from a member country, actually reducing overall efficiency. The net effect of a customs union depends on whether trade creation exceeds trade diversion.",
          },
          {
            term: "The WTO and Multilateralism",
            def: "The WTO (World Trade Organization) is an international body established in 1995 as successor to GATT, mediating trade disputes among its 164 member states and overseeing multilateral trade rules. Core principles: ① Most-Favoured-Nation treatment (MFN — a benefit granted to one country applies to all members); ② National treatment (treating imports the same as domestic products). Regional trade blocs are permitted as an exception to the MFN principle, but critics argue this weakens the multilateral trading system.",
          },
        ],
        traps: [
          "Concluding that a regional trade agreement is 'unconditionally good' earns no analysis marks. You must always distinguish the trade-creation effect from the trade-diversion effect. Write the definitions clearly — 'when imports rise from a member that is more efficient than non-members, that is trade creation; when imports rise from a member through tariff discrimination even though a non-member is more efficient, that is trade diversion' — and evaluate the net effect (welfare rises only if trade creation > trade diversion). Concluding 'good/bad' without context about which direction dominates is not permitted under the IB marking criteria.",
          "Describing the EU simply as a 'free trade area' is wrong. The EU has developed beyond a common market (free movement of labour and capital) to the economic-union stage, using a single currency in the eurozone. When using the EU as a case in an IB exam, specify which stage of integration's characteristics you are referring to, and adding the sovereignty-transfer controversy that comes with deeper integration — such as 'Brexit' — raises your evaluation marks.",
        ],
        example:
          "Compare RCEP (the Regional Comprehensive Economic Partnership) with the Korea–US FTA to see the trade-creation and trade-diversion effects of economic integration. RCEP, which entered into force in 2022, is the world's largest free trade agreement, comprising the 10 ASEAN states plus Korea, China, Japan, Australia, and New Zealand. As tariffs among members are phased out, a trade-creation effect that strengthens the regional supply chain is expected. However, firms in non-members such as the US, the EU, and India are placed at a relative disadvantage, so parts previously sourced efficiently from those countries may be diverted to sourcing from member states — trade diversion. In the case of the Korea–US FTA (KORUS), trade in goods and services between the two countries expanded after it took effect, but some US manufacturers claimed they had lost competitiveness against Korean cars and steel and demanded renegotiation. Analysing the actual effects of a regional trade agreement through the trade-creation / trade-diversion frame with concrete examples earns high analysis and evaluation marks in IB Paper 1.",
      },
      {
        title: "Economic Development and Sustainability — Beyond Growth",
        subtitle:
          "A rising GDP does not mean a country is developing — you must evaluate, at IB level, the multidimensional meaning of development encompassing distribution, health, education, and the environment",
        terms: [
          {
            term: "Economic Growth vs Economic Development",
            def: "Economic growth: an increase in real GDP (or real GDP per capita). Economic development: a broad-based improvement in living standards — not only rising income but also health (life expectancy), education (literacy and enrolment rates), poverty reduction, improved income distribution, and the expansion of political and social freedoms. Growth is a necessary but not sufficient condition for development. A country that achieves high growth can still receive a low development assessment if distributional inequality and environmental destruction are severe.",
          },
          {
            term: "Barriers to Economic Development",
            def: "① Primary-commodity dependence: exports dependent on minerals and agricultural products are vulnerable to deteriorating terms of trade and price volatility. ② External-debt burden: excessive external debt strains public finances and investment. ③ Brain drain: highly skilled workers migrate to developed countries, weakening the human-capital base. ④ Institutional weakness: corruption, unclear property rights, and political instability deter investment. ⑤ Infrastructure shortages and climate vulnerability. These barriers are interconnected and form a 'poverty trap.'",
          },
          {
            term: "Sustainable Development",
            def: "The UN Brundtland Report (1987) definition: 'development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs.' It is a concept integrating the three dimensions of economy, society, and environment, and the UN Sustainable Development Goals (the 17 SDGs) set the global agenda to 2030. While economic growth and environmental conservation conflict in the short run (CO₂ emissions vs industrialisation), there is a view that they can coexist in the long run through investment in green technology and renewable energy.",
          },
          {
            term: "Development Strategies",
            def: "① Import-substitution industrialisation (ISI): nurturing domestic manufacturing behind protective tariffs — attempted in Latin America in the 1950s–70s, with side-effects of inefficiency and accumulating external debt. ② Export-oriented growth (EOG): growth through expanding exports in areas of comparative advantage — the 'East Asian miracle' of Korea, Taiwan, and Singapore. ③ Attracting FDI: inflows of foreign capital, technology, and jobs. ④ Official development assistance (ODA): grants and concessional loans from developed-country governments. ⑤ Microfinance: provision of small-scale start-up capital. Each strategy is context-dependent, and a combination matters more than applying any one in isolation.",
          },
        ],
        traps: [
          "Using only GDP or GDP per capita to measure economic development makes the analysis incomplete. The IB exam requires you to use a range of indicators alongside GDP — the HDI, the Multidimensional Poverty Index (MPI), the Gini coefficient, the Gender Inequality Index (GII) — to evaluate both 'what the numbers tell us and what they fail to tell us.' In particular, explaining a 'high-income country with a low HDI' or a 'low-income country with a high HDI' with concrete country examples (e.g., Kuwait vs Cuba) raises your analysis and evaluation marks.",
          "Defining sustainable development narrowly as 'protecting the environment' does not produce an IB-level answer. The core is the concept of intergenerational equity — 'meeting the needs of the present generation + not compromising the ability of future generations' — and you must clearly describe the simultaneous achievement of the three dimensions of economy, society, and environment. Moreover, simply listing the 17 SDGs is not analysis — you earn evaluation marks by describing the tension whereby a particular SDG (e.g., SDG 13 Climate Action) can conflict in the short run with SDG 8 (Decent Work and Economic Growth).",
        ],
        example:
          "Compare South Korea's export-oriented growth strategy with the current situation in Bangladesh to see the context-dependence of development strategies. Korea began in the 1960s–80s with light industries in which it had a comparative advantage (textiles, footwear) and, through a government-led export-oriented industrialisation (EOG) strategy, upgraded to high-value industries such as semiconductors, automobiles, and shipbuilding, achieving the 'Miracle on the Han River.' Bangladesh, by contrast, is today achieving rapid growth through clothing exports, but is criticised for over-dependence on primary products (textiles and garments) and for labour-condition and safety problems (the 2013 Rana Plaza collapse) that undermine the qualitative dimension of development. Both countries used an export-oriented strategy, but Korea succeeded in transitioning to high-value-added industry while Bangladesh is still at the diversification stage. This comparison shows that there is no single answer to 'which development strategy is correct,' and that the effect of a strategy depends on initial conditions, institutional capacity, and the international environment — demonstrating the need for context-dependent evaluation. Closing the final evaluation paragraph of an IB HL Paper 1 essay with this logic completes the structure of a top-scoring answer.",
      },
    ],
  },
];
