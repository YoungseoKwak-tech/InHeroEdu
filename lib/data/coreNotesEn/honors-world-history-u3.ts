/**
 * Core Notes English version — Honors World History Unit 3 (Early Modern World —
 * Renaissance, Exploration, Revolution). Translated and adapted from the Korean
 * Core Notes with IB-level analytical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_WORLD_HISTORY_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-world-history-u3-l1",
    courseId: "honors-world-history",
    subjectLabel: "Honors World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 1,
    unitName: "The Early Modern World",
    title: "The Renaissance and the Reformation — A World Centered on the Human Being",
    subtitle: "How a cultural revolution that began in 14th–17th century Italy shook the absolute authority of the Church and gave birth to modern Europe",
    overview:
      "Students often memorize the Renaissance as nothing more than an 'art movement.' But the Renaissance was fundamentally a shift in worldview. Where medieval Europe placed God and the afterlife at the center of life, the Renaissance turned toward Humanism — placing the human being and this world at the center. The key is to understand why this transformation began in Italy, and why in the 14th century: the psychological shock following the Black Death, the flight of Greek scholars to Italy after the fall of the Byzantine Empire, and the immense wealth Italian city-states had accumulated through Mediterranean trade. When these three conditions converged, the Renaissance exploded. Luther's Reformation, in turn, was the result of Renaissance Humanism penetrating the Church — the moment when the individualism of 'I will read Scripture myself' grew stronger than the authority of the Pope became the starting point of the Reformation.",
    objectives: [
      "Explain the core ideas of Renaissance Humanism and analyze the political, economic, and intellectual conditions (Florence, Venice, Rome) that made the Italian city-states the cradle of the Renaissance",
      "Use concrete examples — Leonardo da Vinci, Michelangelo, Machiavelli — to explain how the ideas and works of Renaissance figures broke with the medieval worldview",
      "Analyze the core claims of Martin Luther's Ninety-Five Theses and explain how the Reformation went beyond a theological dispute to reorder political, social, and economic structures",
      "Evaluate the Catholic Counter-Reformation and the response of the Council of Trent, and describe how this led to Europe's religious wars and division",
      "Causally connect the long-term influence of the Renaissance and Reformation on the later Scientific Revolution, the Enlightenment, and the formation of modern nation-states",
    ],
    sections: [
      {
        title: "The Renaissance — A Cultural Revolution That Rediscovered the Human Being",
        subtitle: "A new worldview that exploded when the wealth of Italian city-states met the knowledge of ancient Greece",
        terms: [
          {
            term: "Humanism",
            def: "The core philosophy of the Renaissance, which studied the classical texts of ancient Greece and Rome (Latin and Greek originals) to emphasize human reason, individuality, and the value of life in this world. Unlike medieval Scholasticism, which regarded theology and faith as the highest intellectual activity, the humanists argued that the 'studia humanitatis' — rhetoric, history, poetry, philosophy, and ethics — produced morally complete citizens. Petrarch is called the father of Humanism.",
          },
          {
            term: "Renaissance man (uomo universale)",
            def: "Italian for 'universal man,' the ideal of a person of outstanding ability across many fields. Leonardo da Vinci is the archetype, mastering painting, sculpture, architecture, anatomy, mathematics, engineering, and music. This concept embodies the Renaissance worldview that makes the maximization of human ability — rather than the medieval 'total devotion to God' — the goal of life.",
          },
          {
            term: "Machiavellianism",
            def: "The realist political philosophy Niccolò Machiavelli set out in The Prince (1532). It is summarized by the claim that 'a ruler must possess the strength of the lion and the cunning of the fox, and the ends justify the means.' Abandoning the medieval approach of explaining politics through morality and religion, it was the first modern political text to analyze the acquisition and maintenance of power with cold detachment. Today 'Machiavellian' denotes a schemer who lets no means stand in the way of an end.",
          },
          {
            term: "Gutenberg's printing press (1450s)",
            def: "The mass-printing machine Johannes Gutenberg invented by combining metal movable type with ink. Bibles and books that previously had to be copied by hand by clergy could now be produced cheaply in large quantities. Luther's Ninety-Five Theses spread across Germany in mere weeks thanks to the press — it was a 'democratizing technology' that diffused Renaissance knowledge and Reformation ideas from the elite to the masses.",
          },
        ],
        traps: [
          "It is a common misconception that the Renaissance was a 'secular movement that broke with Christianity.' Renaissance artists still treated religious themes heavily and received Church patronage — Michelangelo's Sistine Chapel ceiling is the prime example. What changed was the mode of depiction: away from the flat, symbolic representation of medieval icons toward anatomically accurate, emotionally rich, human-centered portrayal. The Renaissance was not 'de-religionization' but 'humanization.'",
          "Beware the geographical misconception that 'the Renaissance happened only in Italy.' The Italian Renaissance was the starting point, but in the 15th–16th centuries the Northern Renaissance crossed the Alps and figures such as Erasmus, Thomas More, and Shakespeare reinterpreted it to fit each nation's language and reality. Northern Humanism focused especially sharply on Church reform, becoming the intellectual soil that led to Luther's Reformation.",
        ],
        example:
          "To understand why Machiavelli's The Prince shocked Europe, you must compare it with the medieval view. Medieval political theory rested on the premise that 'a good ruler must govern justly according to God's will.' Machiavelli discarded this premise entirely — watching Italian city-states trampled by foreign powers, he concluded that a 'strong ruler who is feared' protects the state better than a 'morally perfect but weak' one. His claim that 'it is safer for a ruler to be feared than loved' was a revolutionary declaration of a 'politics without religion' in a world where religious authority dominated politics. This is the starting point of modern political thought.",
      },
      {
        title: "The Reformation — The Collision of Theology and Politics That Split the Church",
        subtitle: "From Luther's Ninety-Five Theses to Calvin and the English Reformation — why Europe entered the age of religious war",
        terms: [
          {
            term: "Ninety-Five Theses (1517)",
            def: "The Latin theses Martin Luther is said to have posted on the door of the Wittenberg church, criticizing the papacy's sale of indulgences. The core claim was that 'salvation is obtained not through the Church's sacraments or good works but by faith alone (sola fide).' Translated into German and distributed via Gutenberg's press, it spread across Europe within weeks and became the spark of the Protestant Reformation.",
          },
          {
            term: "Sola Scriptura (Scripture alone)",
            def: "Another core principle of Luther's theology: that 'Scripture alone, not the authority of the Pope or councils, is the sole authority for faith and practice.' This principle returned interpretive authority — long monopolized by the clergy through the Latin Vulgate — to the people, and was directly tied to Luther's act of translating the Bible into German. The democratization of Scripture, combined with rising literacy, drew the common people into the Reformation.",
          },
          {
            term: "Calvinism",
            def: "The theological system John Calvin developed in Geneva, Switzerland. Its core is predestination — the doctrine that God has predetermined who will be saved and who will not. Calvinism spread to France (the Huguenots), the Netherlands, Scotland (Presbyterianism), and the English Puritans, and Max Weber argued that Calvinist ethics of diligence, thrift, and vocational calling contributed to the development of capitalism.",
          },
          {
            term: "Council of Trent (1545–1563)",
            def: "The council the Catholic Church convened in response to the Protestant Reformation. While admitting and reforming some Church corruption, it held firmly to core doctrines (purgatory, the sacraments, the equal authority of Scripture and Church tradition). Together with the educational and missionary work of the Jesuits, it became the institutional foundation of the Counter-Reformation, cementing the division of southern Europe (Spain, Italy, southern Germany) as Catholic and northern Europe and England as Protestant.",
          },
        ],
        traps: [
          "Do not understand the Reformation as only a 'religious matter.' The German princes who backed Luther had enormous political and economic interests beyond theological conviction — they could confiscate Church property, cut off taxes flowing to Rome (papal levies), and secure political independence from Emperor Charles V. The success of the Reformation cannot be explained by theology alone; it was made possible because the decentralization of political structures supported it. At the Honors level you must analyze this 'religion–politics alliance.'",
          "Do not simplify the English Reformation as 'because of Henry VIII's divorce.' Henry VIII's demand for a divorce was the immediate trigger, but England already had intellectual soil for the Reformation — Wycliffe's Lollard movement, Erasmus's humanist critique, and the inflow of Lutheran ideas. The king's personal affairs were merely the 'trigger' of a historical turning point; the structural conditions were already in place.",
        ],
        example:
          "Compare the two Reformations to see why theology and politics fused. Luther's German Reformation succeeded because territorial princes had every incentive to seize Church lands and break Rome's fiscal grip, while England's break came when a king's dynastic crisis met a population already primed by Lollard and humanist critique. In both cases a spiritual claim — 'faith alone,' 'Scripture alone' — became unstoppable only once it served the material interests of those holding real political power. The lesson is that ideas reshape history fastest when they align with the ambitions of the powerful.",
      },
    ],
  },
  {
    lessonId: "honors-world-history-u3-l2",
    courseId: "honors-world-history",
    subjectLabel: "Honors World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 2,
    unitName: "The Early Modern World",
    title: "The Age of Exploration — The Columbian Exchange and the First Globalization",
    subtitle: "How Portuguese and Spanish voyages bound the Atlantic into a single economic zone, and how the collision of the Old and New Worlds produced history's first true globalization",
    overview:
      "If you remember the Age of Exploration as the 'adventures of brave explorers,' you miss the point. This was a competition among states over the monopoly of trade routes. When the Ottoman Empire took Constantinople in 1453, Europe's traditional eastern trade route (the Silk Road) was blocked. To obtain spices, silk, and porcelain, a new path bypassing the Ottomans was needed. Portugal sought to reach India by rounding Africa; Spain sought Asia across the Atlantic. The place Columbus reached, believing it to be 'Asia,' was the American continent, and this 'accidental discovery' produced one of history's most destructive yet most consequential encounters — the Columbian Exchange. The loss of 90% of the Indigenous American population, the explosion of European and Asian populations driven by the potato and maize, and the African slave trade that stained the Atlantic with blood — all of it began with a single voyage.",
    objectives: [
      "Analyze the technological, economic, and political conditions through which Portugal and Spain led the 15th–16th century Age of Exploration, and explain how navigation technology (the caravel, the compass, celestial navigation) made oceanic voyaging possible",
      "Enumerate the biological content of the Columbian Exchange (the movement of plants, animals, and pathogens) with concrete examples, and evaluate its asymmetric impact on Indigenous American, European, African, and Asian populations",
      "Analyze Spain's American colonial system (encomienda, hacienda, the mita) and explain how it led to the exploitation of Indigenous labor and the destruction of culture",
      "Describe how the Atlantic triangular trade connected Europe, Africa, and the Americas economically, and evaluate the long-term impact of the African slave trade on West African society",
      "Analyze how the Age of Exploration created the first true globalization and explain its influence on the later formation of a Europe-centered World System",
    ],
    sections: [
      {
        title: "Why Portugal and Spain — The Structural Conditions of Exploration",
        subtitle: "Why world exploration began on the Iberian Peninsula, where technology, capital, and political will converged",
        terms: [
          {
            term: "Caravel",
            def: "The small, highly maneuverable sailing ship developed by Portugal and Spain. Fitted with triangular lateen sails, it could zigzag against headwinds and required fewer crew than large galleys. Unlike earlier Mediterranean and coastal vessels vulnerable to the rough Atlantic, the caravel was optimized for ocean voyaging. The voyages of both Vasco da Gama and Columbus were built on the caravel.",
          },
          {
            term: "Treaty of Tordesillas (1494)",
            def: "The treaty by which, through the mediation of Pope Alexander VI, Portugal and Spain divided the newly 'discovered' world along an Atlantic meridian. West of the line (most of the Americas) went to Spain; east of the line (Africa, the Asian routes, Brazil) to Portugal. The Indigenous peoples were never consulted at all, and France, England, and the Netherlands ignored the treaty and later joined the colonial competition on their own terms.",
          },
          {
            term: "Encomienda system",
            def: "The forced-labor system Spain imposed in its American colonies. It granted Spanish conquistadors or colonists (encomenderos) the right to levy labor from Indigenous communities, in exchange for the nominal obligation to convert and 'protect' them. In practice it was a structure of exploitation close to slavery. Friar Bartolomé de las Casas denounced its cruelty and prompted the crown's institutional reform (the New Laws, 1542), though these were barely enforced on the ground.",
          },
          {
            term: "Mercantilism",
            def: "The economic theory European states adopted in the 16th–18th centuries, resting on the premise that a nation's wealth is measured by its stock of gold and silver and that colonies are resource warehouses supplying it. The state was to maximize exports and minimize imports to pursue a trade surplus. This ideology justified the structure of colonial exploitation and underpinned the Spanish imperial economy centered on American silver mines (such as Potosí).",
          },
        ],
        traps: [
          "Do not narrate Columbus only through the frame of 'the hero who discovered America.' Before Columbus arrived, the American continent was already home to tens of millions of Indigenous people who had built advanced civilizations — Aztec, Inca, Maya. The very concept of 'discovery' is a Eurocentric perspective. At the Honors level, use the terms 'contact' or 'encounter,' and narrate the meaning of this event from the Indigenous perspective as well.",
          "Do not romanticize the Age of Exploration as the 'voluntary journeys of curious explorers.' It was a state-driven enterprise in which governments financed voyages and reaped monopoly profits. Columbus and Vasco da Gama both sailed with royal investment and patronage, under contracts that vested monopoly rights over discovered territories and trade routes in the crown. The Age of Exploration is the prototype of modern 'imperial capitalism.'",
        ],
        example:
          "The story of the Potosí silver mine best reveals the reality of Spain's colonial economy. Potosí, in present-day Bolivia, became the world's largest silver mine soon after its discovery in 1545, and in the 16th–17th centuries the Spanish Empire poured the silver mined there into Europe and Asia. The problem was the labor that ran the mine — Spain abused the Inca mita forced-labor system to conscript Indigenous people into the mines, and hundreds of thousands died from mercury poisoning, cave-ins, and overwork. The silver from Potosí triggered Europe's price revolution, spiking prices by 200–300%, and because Spain squandered this immense wealth on European wars rather than investing it in domestic industry, it ultimately ceded economic supremacy to the Netherlands and England. It is the historical archetype of the 'resource curse.'",
      },
      {
        title: "The Columbian Exchange — The Shock of Biological Globalization",
        subtitle: "How the meeting of the Old and New Worlds permanently changed the world through population, agriculture, disease, and the slave trade",
        terms: [
          {
            term: "Columbian Exchange",
            def: "The large-scale, two-way movement of plants, animals, microbes, people, and culture between the Americas and Europe, Africa, and Asia following Columbus's 1492 voyage. From the Americas to the Old World: potatoes, maize, tomatoes, cacao, tobacco, chili peppers, turkeys, syphilis. From the Old World to the Americas: smallpox, measles, horses, cattle, pigs, wheat, sugarcane, coffee. The most destructive dimension of this exchange was pathogens; the most long-lasting was crops.",
          },
          {
            term: "Population collapse (demographic catastrophe)",
            def: "The phenomenon by which the Indigenous American population fell by up to 90% within a century after contact with Europeans. The main cause was epidemics to which they had no immunity — smallpox, measles, influenza — which killed far more than military conquest. The Indigenous population of central Mexico is estimated to have fallen from about 25 million in 1519 to roughly 1 million by 1600. This labor vacuum became the direct cause that accelerated the Atlantic slave trade.",
          },
          {
            term: "Atlantic triangular trade",
            def: "The three-way trade circuit linking Europe, Africa, and the Americas from the 17th to the 19th centuries. Guns, textiles, and liquor were exported from Europe to Africa → enslaved people were carried from Africa to the Americas (the Middle Passage) → sugar, tobacco, cotton, and silver were exported from the Americas to Europe. Roughly 12.5–13 million Africans were forcibly transported through this system, of whom about 2 million died during the voyage.",
          },
          {
            term: "Middle Passage",
            def: "The second leg of the Atlantic triangular trade, carrying enslaved people from West Africa to the American colonies. The enslaved lay in the hold with only minimal space for 6–8 weeks, and death rates from dehydration, disease, abuse, and suicide attempts reached 10–20%. The Middle Passage was one of the most systematically organized forced migrations in human history and is the historical origin of today's African American community.",
          },
        ],
        traps: [
          "Do not write the Columbian Exchange as an 'equal exchange.' This exchange was thoroughly asymmetric. The Americas lost most of their population and saw their civilizations destroyed, and Africa lost tens of millions of its young adults to slavery. Europe, by contrast, absorbed the New World's resources, labor, and crops (potatoes, maize) and saw its population and economy explode. An Honors narrative that does not make this asymmetry explicit is only half an analysis.",
          "Do not narrate the slave trade only as something Africans simply 'had done to them.' It is also important that West African kingdoms (Asante, Dahomey, and others) were complicit, selling war captives and criminals to European merchants. This was not a moral failure of Africans but a structural result of European gun supply and economic pressure distorting Africa's internal power structures. At the Honors level you must analyze the complex web of actors without oversimplifying.",
        ],
        example:
          "The story of the potato dramatically reveals the long-term consequences of the Columbian Exchange. The potato, cultivated by Andean Indigenous people for thousands of years, entered Europe through 16th-century Spain but was at first shunned as a 'devil's plant' — because it was unmentioned in the Bible and grew underground. But in the 18th century, when Ireland and Prussia adopted it on a large scale, the population of northern Europe exploded. The potato produced 3–4 times more calories than wheat and could feed far more people on the same land. Paradoxically, this dependence on potatoes produced the Irish Great Famine of the 1840s — the danger of monoculture dependence appeared as the starvation of over a million people. A single New World crop reshaped Europe's demographic structure, supplied the labor of the Industrial Revolution, and through famine drove the mass Irish emigration to America. That is the true scale of the Columbian Exchange.",
      },
    ],
  },
  {
    lessonId: "honors-world-history-u3-l3",
    courseId: "honors-world-history",
    subjectLabel: "Honors World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 3,
    unitName: "The Early Modern World",
    title: "The Scientific Revolution and the Enlightenment — Reason Ascends the Throne",
    subtitle: "How, from Copernicus to Newton, the center of the universe moved from Earth to the Sun, and how Enlightenment philosophers used that logic to dismantle the authority of kings and the Church",
    overview:
      "Many students memorize the Scientific Revolution and the Enlightenment separately, but the two are one continuous intellectual revolution. The Scientific Revolution declared that 'if you observe nature and find its laws through mathematics, you can reach truth.' The Enlightenment applied this method not to nature but to human society — the logic that 'just as there are natural laws, society too has laws discoverable by reason, and royal and Church power that does not fit those laws is illegitimate.' This logic became the ideological ammunition of the French Revolution and the American Revolution. Newton discovered the law of universal gravitation in 1687, and the American Declaration of Independence came in 1776 — in just 90 years, physics led a political revolution. Knowledge is never neutral; it always becomes a weapon that shakes power structures.",
    objectives: [
      "Connect the scientific achievements of Copernicus, Galileo, Kepler, and Newton to explain the process by which the heliocentric model was established, and analyze why it clashed with the existing Church–Aristotelian worldview",
      "Compare and explain how the methodology of the Scientific Revolution — inductive reasoning, experiment, mathematical proof — differed from the deductive, authority-based methodology of medieval Scholasticism",
      "Summarize the key concepts of the major Enlightenment thinkers (Locke, Rousseau, Montesquieu, Voltaire) and describe how they were concretized into the modern democratic principles of natural rights, the social contract, and the separation of powers",
      "Analyze how Enlightenment thought operated as the ideological foundation of the American Revolution (1776) and the French Revolution (1789), connecting it to concrete documents (the Declaration of Independence, the Declaration of the Rights of Man)",
      "Explain the intellectual lineage connecting the Scientific Revolution and the Enlightenment to the earlier Renaissance and Reformation, and articulate, at Honors-level thematic analysis, the shared theme of 'trust in human reason' across all three movements",
    ],
    sections: [
      {
        title: "The Scientific Revolution — The Intellectual Coup That Moved the Center of the Universe",
        subtitle: "How the geocentric model the Church had taught as truth for 1,400 years collapsed in a single century",
        terms: [
          {
            term: "Heliocentric model",
            def: "The model in which the Sun is the center of the universe and the Earth orbits it, proposed by the Polish cleric Nicolaus Copernicus in On the Revolutions of the Heavenly Spheres (1543). Overturning the geocentric model of the ancient Greek Ptolemy after 1,400 years, Copernicus himself, fearing Church persecution, published it only just before his death. The model was refined by Galileo's telescopic observations and Kepler's laws of elliptical orbits, and proved mathematically by Newton's universal gravitation.",
          },
          {
            term: "Trial of Galileo (1633)",
            def: "The case in which the Italian physicist Galileo Galilei was brought before the Roman Catholic Inquisition for publishing writings supporting the heliocentric model. Galileo was sentenced to life under house arrest and forced to publicly abjure his claims. Yet the trial paradoxically posed to European intellectuals the question 'what should one follow when Church authority conflicts with scientific evidence?' and promoted the separation of science from religious authority.",
          },
          {
            term: "Law of Universal Gravitation",
            def: "The law Isaac Newton published in Principia Mathematica (1687). It states that every body attracts every other with a force proportional to their masses and inversely proportional to the square of the distance, explaining the fall of an apple on Earth and the orbit of the Moon with a single equation. Regarded as the completion of the Scientific Revolution, it became the symbol proving the Enlightenment's core message that 'reason and mathematics can discover nature's hidden order.'",
          },
          {
            term: "Inductive / Scientific method",
            def: "The method of scientific inquiry systematized by Francis Bacon. It proceeds in the order: observation → hypothesis → verification through experiment → derivation of general law. This is the exact opposite of medieval Scholasticism, which drew premises from the texts of authorities like Aristotle and deduced logically. Bacon's slogan 'doubt and experiment' became the motto not only of the Scientific Revolution but of the whole critical spirit of the Enlightenment.",
          },
        ],
        traps: [
          "Do not simplify the Scientific Revolution as an 'all-out war between Church and science.' Copernicus was a Catholic cleric, Kepler was a devout Lutheran, and Newton devoted even more time to theology. Many figures of the Scientific Revolution believed that discovering, through reason, the natural laws God had created was an act that gave glory to God. Conflicts like the Galileo trial existed, but they were not the whole picture. Instead of the simple 'science vs. religion' dichotomy, analyzing 'what kind of religious authority became an obstacle to scientific progress' is the Honors-level approach.",
        ],
        example:
          "Exactly 100 years after Newton published the law of universal gravitation in 1687, the US Constitution was drafted in 1787. Understanding that this was not coincidence but causation is at the heart of Honors world history. Enlightenment philosophers drew deep inspiration from Newton's achievement — they thought, 'just as Newton discovered the laws of the physical world through mathematics, we too can discover the laws of human society through reason.' John Locke argued that 'all humans possess natural rights to life, liberty, and property, that government exists to protect these rights, and that it may be replaced if it fails.' When Jefferson wrote the Declaration of Independence, he took Locke's logic directly. The observation of an apple falling from a tree became, a century later, the ideology of a revolution that cut off a king's head — that is how knowledge changes power.",
      },
      {
        title: "The Enlightenment — The Philosophical Revolution That Dismantled Royal and Church Power Through Reason",
        subtitle: "How Voltaire, Locke, Rousseau, and Montesquieu created the grammar of modern democracy",
        terms: [
          {
            term: "Social contract theory",
            def: "The political theory developed in different ways by Thomas Hobbes, John Locke, and Jean-Jacques Rousseau, explaining the relationship between the state and citizens as a voluntary contract. Hobbes saw a 'war of all against all' without a strong sovereign (the Leviathan); Locke held that a right of resistance arises when government violates natural rights; Rousseau argued that true sovereignty lies with the people (the general will). All three denied the divine right of kings.",
          },
          {
            term: "Separation of powers",
            def: "The political principle Charles de Montesquieu set out in The Spirit of the Laws (1748). It divides legislative, executive, and judicial power among different institutions to check the abuse of power. Derived from his analysis of the English parliamentary system, this principle directly influenced the framers of the US Constitution, and the separation of powers in the US federal government is the realization of Montesquieu's blueprint.",
          },
          {
            term: "Encyclopédie",
            def: "The great French encyclopedia edited by Denis Diderot and Jean le Rond d'Alembert and published from 1751 to 1772. Enlightenment philosophers such as Voltaire, Rousseau, and Montesquieu contributed, systematically organizing knowledge across science, philosophy, art, and technology. It was not merely a compilation of knowledge but a propaganda weapon of the Enlightenment that criticized superstition, religious prejudice, and absolute power, and like Gutenberg's press it became a symbol of the democratization of knowledge.",
          },
          {
            term: "Critique of the divine right of kings",
            def: "The political ideology Enlightenment philosophers commonly attacked. The divine right of kings — the medieval and absolutist doctrine that 'a king's authority is granted directly by God, so rebellion is a sin against God' — was countered by the Enlightenment claim that 'the source of political authority lies not in God but in the consent of the governed.' This shift is the starting point of modern democracy.",
          },
        ],
        traps: [
          "Do not idealize the Enlightenment as 'a movement for everyone's freedom and equality.' Most Enlightenment philosophers viewed women, the enslaved, and non-Europeans as 'beings lacking rational capacity' and excluded them from their ideals of freedom. Locke signed documents supporting slavery in the American colonies, and Rousseau denied women a public role. The contradiction between the Enlightenment's universalist language ('all men are equal') and its actual application later became intellectual ammunition for anti-colonial, women's suffrage, and abolition movements — the oppressed turned the language of their colonial masters into the logic of their own liberation.",
          "Do not connect the Enlightenment and the French Revolution in a simple causal relationship. Rousseau, Voltaire, and Diderot all died before the 1789 French Revolution, and the way revolutionary leaders interpreted their ideas differed greatly from the authors' intentions. In particular, Robespierre's Reign of Terror used an extreme distortion of Rousseau's concept of the 'general will.' Include in your Honors analysis the historical lesson that ideas are transformed in the hands of those who use them.",
        ],
        example:
          "Mary Wollstonecraft's A Vindication of the Rights of Woman (1792) is the sharpest text exposing the internal contradiction of the Enlightenment. She asked: 'if male Enlightenment thinkers deny a king's authority in the name of reason, why do they presuppose that women have no reason?' Locke said 'all humans have natural rights,' but at the time 'man' effectively meant the adult, white, propertied male. Wollstonecraft turned the Enlightenment's own logic against the Enlightenment — the argument that 'if reason defines the human being, then women too, once educated, can become rational beings and must therefore hold equal rights.' This became the intellectual foundation of the 19th-century women's suffrage movement. In Honors history, remember the pattern that 'an idea becomes a weapon to criticize the very world that produced it.'",
      },
    ],
  },
];
