/**
 * Core Notes English version — Honors World History Unit 1
 * (Early Civilizations & Classical Empires).
 * Translated from the Korean storytelling source; same objectives, terms,
 * traps, and worked examples, at IB-EN depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_WORLD_HISTORY_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-world-history-u1-l1",
    courseId: "honors-world-history",
    subjectLabel: "Honors World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 1,
    unitName: "Early Civilizations & Classical Empires",
    title: "The Neolithic Revolution and River Valley Civilizations",
    subtitle:
      "How humanity's shift from hunting and gathering to farming produced the first cities and writing systems",
    overview:
      "The thing students starting history get wrong most often is this: a 'civilization' is not simply 'people living together in one place.' Around 10,000 BCE the Neolithic Revolution introduced agriculture, and from it came — in sequence — surplus food, the division of labor, social stratification, and state structures. The fertile environments of the Tigris–Euphrates, Nile, Indus, and Yellow River valleys accelerated this transformation explosively. This lesson starts from the geographic-determinist question 'why those particular rivers?' and then traces the shared characteristics of civilization as a set of mechanisms rather than a checklist.",
    objectives: [
      "Analyze the environmental and economic conditions that produced the Neolithic Revolution and compare hunter-gatherer societies with agricultural societies",
      "Explain how the geographic features of the Mesopotamian, Egyptian, Indus, and Yellow River civilizations shaped each one's path of development",
      "Identify the shared characteristics of civilization — writing, social hierarchy, centralized government, food surplus, and specialized labor — in each river valley case",
      "Compare the functions of cuneiform (Mesopotamia) and hieroglyphics (Egypt) and evaluate the role writing played in state governance and the economy",
      "Analyze how social stratification affected gender roles, slavery, and occupational specialization, using examples from different river valley civilizations",
    ],
    sections: [
      {
        title: "The Neolithic Revolution — Farming and Settled Society",
        subtitle:
          "How a single food surplus triggered a chain reaction of labor specialization, hierarchy, and the state",
        terms: [
          {
            term: "Neolithic Revolution",
            def: "The historical shift, beginning around 10,000 BCE, from a hunting-and-gathering way of life to farming and herding. Also called the 'Agricultural Revolution,' it made permanent settlements, population growth, and surplus food production possible, becoming the foundation for all later civilization.",
          },
          {
            term: "Agricultural surplus",
            def: "Food a community can store beyond what it needs for immediate consumption. Once a surplus exists, not everyone has to farm, so specialized occupations — warriors, priests, artisans, scribes — emerge and social stratification accelerates.",
          },
          {
            term: "Fertile Crescent",
            def: "A crescent-shaped region of ancient farmland spanning modern Iraq, Syria, Israel, and Jordan. Rich in wild wheat and barley and in domesticable animals, it is where humanity's earliest agriculture began.",
          },
          {
            term: "Characteristics of civilization",
            def: "The shared markers historians use to classify a society as a 'civilization': (1) urban centers, (2) specialized division of labor, (3) social hierarchy, (4) surplus food and taxation, (5) monumental architecture, (6) writing or record-keeping systems, and (7) long-distance trade networks.",
          },
        ],
        traps: [
          "The most common mistake is treating the Neolithic Revolution as a sudden event. Despite the word 'revolution,' it was actually a gradual transition over thousands of years. If an exam asks for a 'precise date,' remember it varies by region (about 10,000 BCE in the Fertile Crescent, about 7000 BCE in China) — so never write that it 'happened simultaneously across the whole world.'",
          "Listing the characteristics of civilization by rote will cost you marks in extended response. The Honors-level answer connects them as a causal chain: 'surplus food → division of labor → stratification → the state.'",
        ],
        example:
          "Take Sumer in Mesopotamia (modern Iraq). Each year the Tigris and Euphrates flooded and left behind fertile silt. Sumerian farmers built irrigation canals and produced wheat and barley in bulk from this rich soil, storing the surplus grain in temple granaries. As surplus accumulated, classes of priests, scribes, artisans, and merchants emerged, and cities like Ur and Uruk formed. The administrative needs of the city gave birth to cuneiform — and the very first records were tax records. Geography created the surplus, and the surplus created civilization.",
      },
      {
        title: "Comparing the Four River Valley Civilizations",
        subtitle:
          "The shared features and the differences among Mesopotamia, Egypt, the Indus, and the Yellow River",
        terms: [
          {
            term: "Mesopotamian civilization",
            def: "Meaning 'the land between two rivers,' the civilization that developed between the Tigris and Euphrates. The Sumerians invented cuneiform, the wheel, and a base-60 number system, followed by the Akkadian, Babylonian, and Assyrian empires. The Code of Hammurabi, the first written law code, embodies a retributive 'eye for an eye' system of justice.",
          },
          {
            term: "Egyptian civilization",
            def: "The civilization called 'the gift of the Nile.' The Nile's predictable flooding guaranteed a steady surplus, allowing a centralized pharaonic theocracy to remain stable for thousands of years. Hieroglyphics, papyrus, and the pyramids are its signature products.",
          },
          {
            term: "Indus Valley civilization",
            def: "A civilization that flourished around 2600–1900 BCE in what is now Pakistan and northwestern India. Mohenjo-daro and Harappa are notable for their grid-pattern street layouts and sophisticated drainage; their script remains undeciphered. There is almost no evidence of a centralized ruler, setting it apart from the other river valley civilizations.",
          },
          {
            term: "Yellow River civilization",
            def: "A civilization that developed around 2000 BCE along the Yellow River (Huang He) in China. The Shang dynasty is famous for characters carved on oracle bones and for bronze technology. Ancestor worship and the idea of the Mandate of Heaven became the basis of legitimacy for every later Chinese dynasty.",
          },
        ],
        traps: [
          "Do not mistake the Indus Valley civilization for a 'less developed' civilization. Mohenjo-daro's urban planning — grid streets, a public bath, a sewage system — was actually more advanced than contemporary Mesopotamia or Egypt. We simply know less about its internal social structure because its script has not been deciphered.",
        ],
        example: null,
      },
      {
        title: "Writing and Social Stratification — The Core Engine of Civilization",
        subtitle:
          "Why writing was not just a means of communication but a tool for monopolizing power and knowledge",
        terms: [
          {
            term: "Cuneiform",
            def: "One of humanity's first writing systems, invented by the Sumerians around 3200 BCE. Scribes pressed wedge-shaped marks into clay tablets with a reed stylus; early use was for tax and inventory records, later expanding to myths, laws, and correspondence.",
          },
          {
            term: "Hieroglyphics",
            def: "The pictographic writing system used by the Egyptians. It represented objects, concepts, and sounds with picture symbols, carved on temple walls and written on papyrus. Regarded as sacred writing, it helped the scribe class monopolize social power.",
          },
          {
            term: "Social hierarchy",
            def: "The layered structure within a civilization in which power, wealth, and status are distributed unequally. It typically ran from an upper tier (kings, priests, warriors) through a middle tier (merchants, artisans) to a lower tier (farmers, slaves), with control over the food surplus at the core of social power.",
          },
          {
            term: "Scribe",
            def: "A specialized professional who could read and write. Literacy was extremely rare in ancient societies, so scribes monopolized administration, accounting, religion, and diplomacy, enjoying high social status and a stable income.",
          },
        ],
        traps: [
          "Do not read the Code of Hammurabi as 'fair law.' The 'eye for an eye' principle looks like equal punishment, but a close reading shows that penalties varied by the social class of victim and offender — the punishment differed when a noble harmed a commoner versus when a commoner harmed a noble. The code was also a tool that codified class inequality into written law.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-world-history-u1-l2",
    courseId: "honors-world-history",
    subjectLabel: "Honors World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 2,
    unitName: "Early Civilizations & Classical Empires",
    title: "Politics and Thought in the Classical Empires",
    subtitle:
      "How Greece, Rome, Han China, and the Maurya/Gupta governed vast empires in fundamentally different ways",
    overview:
      "The part of world history students get wrong most is comparing the classical empires. Greek democracy, the Roman Republic, Han bureaucracy, and the Buddhist Mauryan state were all different experiments in answering one question: how does a state govern a large territory? This lesson analyzes each classical empire along three axes — governmental structure, trade networks, and philosophy and religion — and traces the mechanisms that explain why some empires lasted centuries while others collapsed quickly.",
    objectives: [
      "Compare the structure and limits of Athenian democracy with modern democracy and critically evaluate which groups were excluded from political participation",
      "Analyze the causes of Rome's transition from Republic to Empire in terms of social tension, military expansion, and political instability",
      "Compare how the Confucian bureaucracy of Han China stabilized imperial rule with the governing models of the Maurya and Gupta empires",
      "Explain the core philosophies of Confucius, the Buddha, Socrates, and Plato by connecting each to its social context",
      "Analyze the economic foundations of the classical empires (trade routes, taxation, currency) and evaluate how they contributed to imperial expansion and maintenance",
    ],
    sections: [
      {
        title: "Greece and Rome — Origins of the Western Political Tradition",
        subtitle:
          "The legacy and limits that Athenian democracy and the Roman Republic left to modern government",
        terms: [
          {
            term: "Direct democracy",
            def: "The political system in which Athenian citizens participated directly in the Assembly and decided laws by vote. 'Citizen,' however, was limited to adult free males, excluding women, slaves, and foreigners (metics). Only about 20–30% of Athens's adult population held voting rights.",
          },
          {
            term: "Roman Republic",
            def: "Rome's political system from 509 to 27 BCE. Two consuls served one-year terms and shared power, while the Senate decided foreign and financial policy. An early form of separation of powers, the Republic was a model the framers of the U.S. Constitution looked to.",
          },
          {
            term: "Pax Romana",
            def: "The period of relative peace and prosperity in the Roman Empire from 27 BCE to 180 CE. Beginning with the accession of Emperor Augustus, it unified the whole Mediterranean into a single economic zone, with road networks, a common currency, and Roman law supporting trade and governance.",
          },
          {
            term: "Hellenism",
            def: "The cultural blending in which Greek culture spread to Egypt, Persia, and India after the conquests of Alexander the Great (336–323 BCE). Greek became a lingua franca, and a new art, science, and philosophy emerged from the fusion of local and Greek cultures.",
          },
        ],
        traps: [
          "Do not evaluate Athenian democracy as a uniformly 'progressive' political system. A substantial part of the Athenian economy depended on slave labor, and the benefits of citizenship went to a minority. In an extended response on Athenian democracy you must also name its limits (the excluded groups) to write an Honors-level answer.",
          "Do not confuse the Roman 'Republic' with the Roman 'Empire.' Julius Caesar was a figure of the Republican period; it was Augustus (Octavian) who opened the imperial era as the first emperor. The phrase 'Emperor Caesar' is historically inaccurate.",
        ],
        example:
          "The transition from Roman Republic to Empire shows the paradox of imperial expansion. The Punic Wars (264–146 BCE) gave Rome control of the Mediterranean, but during the wars small farmers were conscripted into the army and lost their land. Slaves taken as war captives filled the great estates (latifundia), so nobles grew richer and commoners poorer. This economic inequality bred civil war, and military leaders who promised to restore order (Caesar → Augustus) seized dictatorial power. Expansion is what brought down the Republic.",
      },
      {
        title: "Han China and the Maurya–Gupta — Classical Empires of East and South Asia",
        subtitle:
          "How Confucian bureaucracy and dharma-based rule each sustained empires for centuries",
        terms: [
          {
            term: "Han dynasty bureaucracy",
            def: "The central administrative system run by Han China (206 BCE–220 CE) on Confucian principles. Officials were selected by civil service examination so that learned elites managed the empire — a system that persisted through later Chinese dynasties.",
          },
          {
            term: "Maurya Empire",
            def: "India's first unified empire, founded by Chandragupta Maurya in 322–185 BCE. After the horrors of the Kalinga War, King Ashoka (r. 268–232 BCE) converted to Buddhism and governed the empire by the principle of dharma — nonviolence and tolerance.",
          },
          {
            term: "Gupta Empire",
            def: "An empire that ruled northern India around 320–550 CE. Called India's 'Golden Age,' it saw great advances in Hindu philosophy, mathematics (the concept of zero, the decimal system), astronomy, and Sanskrit literature. This knowledge later spread to the Islamic world and Europe.",
          },
          {
            term: "Mandate of Heaven",
            def: "The Chinese concept of political legitimacy: Heaven grants the right to rule to a virtuous ruler, and if a ruler is unworthy — or natural disasters and rebellions occur — it is proof the mandate has been lost. A new dynasty justified rebellion by claiming the previous one had lost the mandate.",
          },
        ],
        traps: [
          "Do not confuse the Maurya and Gupta. The Maurya (322–185 BCE) is earlier, defined by Ashoka's Buddhist statecraft. The Gupta (320–550 CE) is later, defined by a Hindu revival and a golden age of science and art. Sort them as 'India's Golden Age = Gupta' and 'spread of Buddhism = Ashoka (Maurya).'",
        ],
        example:
          "When Han Emperor Wu (r. 141–87 BCE) introduced the forerunner of the civil service examination, it was not merely an education policy. At the time, hereditary aristocrats held real power in the provinces. By making the Confucian classics the standard for the exam, Wu selected learned officials loyal to the emperor, thereby weakening regional aristocrats and strengthening central control. Understanding the political context — 'Confucianism = a tool for strengthening imperial power' — lets you write a level higher of analysis on an extended response.",
      },
      {
        title: "Philosophy and Religion in the Classical Age",
        subtitle:
          "Why the ideas of Confucius, the Buddha, and Socrates were each a response to a specific social problem",
        terms: [
          {
            term: "Confucianism",
            def: "The ethical and social philosophy founded by Confucius (551–479 BCE). It emphasizes ren (benevolence), li (ritual propriety), zhong (loyalty), and xiao (filial piety) as core virtues, aiming at harmony in the hierarchical relationships of family, society, and state. It became the backbone of Chinese social structure and political philosophy.",
          },
          {
            term: "Buddhism",
            def: "The religion and philosophy founded by Siddhartha Gautama (c. 563–483 BCE). Through the Four Noble Truths and the Eightfold Path, it teaches that one can reach nirvana by eliminating desire, the cause of suffering (dukkha). With Ashoka's patronage it spread beyond India to Southeast, Central, and East Asia.",
          },
          {
            term: "Socratic method",
            def: "The question-and-answer mode of philosophical inquiry used by Socrates (470–399 BCE). By posing sharp questions about another person's beliefs, it exposes logical contradictions and moves toward deeper understanding. It became the basis of critical thinking and the Western philosophical tradition.",
          },
          {
            term: "Hinduism",
            def: "The oldest religious tradition of the Indian subcontinent — a collection of diverse beliefs, rituals, and philosophies with no single founder or scripture. Brahman (the cosmic soul), dharma (duty), karma (the consequences of action), and moksha (liberation) are core concepts, closely tied to the caste (varna) social system.",
          },
        ],
        traps: [
          "Do not memorize the classical philosophers in isolation from their era and region. Confucius emphasized social order and ethics as a response to the chaos of the Spring and Autumn / Warring States period; the Buddha emphasized individual practice as a critique of the caste system and Brahmin ritual; Socrates emphasized individual rational inquiry as a critique of the collective decision-making of Athenian democracy. Explaining philosophy in its historical context is what earns Honors-level marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-world-history-u1-l3",
    courseId: "honors-world-history",
    subjectLabel: "Honors World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 3,
    unitName: "Early Civilizations & Classical Empires",
    title: "The Silk Road and Cultural Exchange",
    subtitle:
      "How trade networks moved not just goods but religions, technologies, diseases, and ideas",
    overview:
      "The most underrated force in world history is the power of trade. The Silk Road was not a road for selling silk — it was the road along which Buddhism, Islam, and Christianity spread, along which the plague bacillus, gunpowder, the compass, and paper traveled, and along which separate empires came to know one another. This lesson uses the Silk Road as a lens to analyze how the classical empires were connected, and what changes that connection brought to each civilization.",
    objectives: [
      "Identify the major routes and hub cities of the Silk Road on a map and explain the role each empire played in the trade",
      "Distinguish between cultural diffusion and cultural syncretism and give Silk Road examples of each",
      "Analyze the role diaspora communities played in long-distance trade",
      "Explain the patterns of religious diffusion along the Silk Road by comparing Buddhism, Christianity, and Islam",
      "Analyze the shared causes of classical empires' collapse (internal division, external invasion, economic breakdown, epidemic disease) and apply them to specific empires",
    ],
    sections: [
      {
        title: "The Silk Road — The Trade Network Linking East and West",
        subtitle:
          "The ancient internet that carried not silk but ideas, religions, technologies, and diseases",
        terms: [
          {
            term: "Silk Road",
            def: "The network of ancient trade routes running from China through Central Asia to Persia and Rome. Not a single road but a set of many routes, its historical starting point is usually dated to the 2nd century BCE, when Han Emperor Wu sent Zhang Qian to the Western Regions. Along with goods — silk, spices, glass, iron, ceramics — it carried religions, philosophies, technologies, and epidemics.",
          },
          {
            term: "Cultural diffusion",
            def: "The process by which one society's cultural elements (technology, beliefs, language, customs) spread to another through contact and trade. Via the Silk Road, Buddhism spread to Central Asia and China, Islam to Southeast Asia, and the Indian numeral system to the Arab world.",
          },
          {
            term: "Syncretism",
            def: "The phenomenon in which different cultural, religious, or philosophical traditions blend to create a new form. Gandharan art — a fusion of Greek sculptural style and Buddhist iconography — is a classic example, the product of Alexander's conquests and Silk Road trade.",
          },
          {
            term: "Diaspora community",
            def: "An ethnic or religious group that has left its original homeland and settled elsewhere. Sogdian, Indian, and Arab merchant communities settled in Silk Road trading cities are prime examples; they bridged language barriers and provided credit networks, translation, and brokerage.",
          },
        ],
        traps: [
          "The simplification that what moved along the Silk Road was 'mostly silk' costs marks. Trade goods included not only silk but ceramics, spices, glass, metals, and horses — and, more importantly, religions (Buddhism, Islam, Christianity, Zoroastrianism), technologies (papermaking, gunpowder, the compass), and epidemics (the Plague of Justinian, overlapping with the routes of the Black Death). In an extended response, always mention this 'invisible cargo.'",
        ],
        example:
          "Gandharan art shows just how powerful syncretism can be. After Alexander the Great conquered the region of present-day Afghanistan and Pakistan in 327 BCE, Greek colonies persisted there for centuries. When Buddhism spread in this region, sculptors had no model for how to depict the Buddha. What they chose was the sculptural technique of the Greek statue of Apollo — realistic hair, draped robes, idealized bodily proportions. The result was the Gandharan Buddha: a Greek face bearing Buddhist symbols (the ushnisha, the monastic robe). The 'Silk Road' was never just about goods.",
      },
      {
        title: "The Spread of Religion and the Collapse of Classical Empires",
        subtitle:
          "How religions and epidemics that traveled along trade routes transformed the imperial order",
        terms: [
          {
            term: "Universal religion",
            def: "A religion open to all people, transcending a particular ethnicity or state. Buddhism, Christianity, and Islam are the leading examples; all three spread widely beyond their birthplaces along the Silk Road and maritime trade routes. By contrast, Hinduism and Judaism are more strongly tied to a specific ethnic and regional identity.",
          },
          {
            term: "Plague of Justinian",
            def: "An outbreak of bubonic plague that struck the Eastern Roman (Byzantine) Empire in 541–549 CE. Thought to have spread via the Silk Road and Mediterranean trade networks, it killed 25–50% of the Byzantine population and contributed decisively to the empire's weakening.",
          },
          {
            term: "Common causes of imperial collapse",
            def: "The shared pattern by which classical empires (Rome, Han, Gupta) collapsed: (1) rising military defense costs, (2) internal power struggles and civil war, (3) declining tax revenue from reduced trade, (4) external nomadic invasions (the Huns and others), (5) population decline from epidemics.",
          },
          {
            term: "Legacy of the Silk Road",
            def: "The long-term impact the classical-era trade networks left for later generations. The east–west spread of paper, gunpowder, the compass, and printing; the scholarship of the Islamic Golden Age (preserving and translating Greek philosophy); the spread of the Indian numeral system (Arabic numerals) to Europe; and the movement of the plague are all connected to the Silk Road.",
          },
        ],
        traps: [
          "Explaining the fall of the Roman Empire solely by the invasions of the Huns and Germanic peoples is a half answer. The fall of the Western Roman Empire in 476 was the result of multiple factors, not a single cause — a fiscal crisis from rising military costs, the Crisis of the Third Century (a parade of soldier-emperors), population decline from epidemics, and reduced trade from civil war structurally weakened the empire over centuries before external invasion delivered the final blow. Beware of trap questions demanding a 'single cause.'",
          "The Eastern Roman (Byzantine) Empire survived until 1453 CE. The statement 'the Roman Empire fell in 476' applies only to the Western half. When discussing 'the fall of the Roman Empire' on an exam, distinguishing East from West is Honors-level precision.",
        ],
        example:
          "Han China and Rome had no direct diplomatic contact, but they were indirectly linked through the Silk Road. The Han court wanted Roman glass and gold, and Roman aristocrats were obsessed with Chinese silk. The Roman Senate even worried that 'so much silk is being bought that gold is draining to the East.' Sogdian merchants and the Parthian and Kushan empires acted as intermediaries between the two, and in the process Buddhism spread through Central Asia into China. The two empires did not know each other — but their mutual consumer desires were connecting the world.",
      },
      {
        title: "Comparing the Classical Empires — Similarities and Differences",
        subtitle:
          "The structures Greece, Rome, Han, and Maurya shared and the different solutions each chose",
        terms: [
          {
            term: "Imperialism",
            def: "The policy of controlling other peoples and territories through political, military, and economic domination. The classical empires all expanded territory by military conquest, but their methods of integrating conquered peoples differed — Rome through extending citizenship, Han China through incorporation into the bureaucracy, the Maurya through allowing regional autonomy and spreading Buddhism.",
          },
          {
            term: "Hegemony",
            def: "A form of domination that goes beyond mere military rule to win the consent of other groups through cultural, economic, and ideological influence. The spread of Rome's Latin, law, and architecture and Han China's Confucianism and Chinese characters are examples.",
          },
          {
            term: "Nomadic pressure",
            def: "The historical pattern in which steppe nomads (the Huns, the Xiongnu, the Yuezhi, and others) continually pressed on the borders of settled empires. Rome's frontier defenses (the limes) and the Han's Great Wall (the Changcheng) were both defensive responses to this pressure.",
          },
          {
            term: "Common legacies of classical empires",
            def: "The institutional, intellectual, and technological influence the classical empires left to later civilizations. Roman law → European legal systems; Confucian bureaucracy → East Asian government models; Greek philosophy and the concept of democracy → the Western political tradition; the Indian numeral system and Buddhism → Asian and Middle Eastern culture.",
          },
        ],
        traps: [
          "When comparing the classical empires, do not inject Western-centric value judgments like 'Rome was the greatest.' Honors World History assesses your ability to compare and analyze multiple civilizations on equal terms. Concrete comparative statements like 'Han China had a larger population than Rome and developed its administrative system earlier' are what earn high marks.",
        ],
        example: null,
      },
    ],
  },
];
