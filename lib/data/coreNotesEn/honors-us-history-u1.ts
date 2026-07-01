/**
 * Core Notes English version — Honors US History Unit 1 (Colonial Era & the American Revolution).
 * Faithful English rendering of the Korean source (objectives · terms · traps · example).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_US_HISTORY_U1_EN: CoreNote[] = [
  {
    lessonId: "honors-us-history-u1-l1",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 1,
    lessonNum: 1,
    unitName: "Colonial Era & the American Revolution",
    title: "The Making of Colonial Society — The Birth of the 13 Colonies",
    subtitle:
      "How regional differences in economy and society laid the foundation for a single revolution",
    overview:
      "The most common misconception students bring to early American history is that the '13 colonies' were one unified society. They were not. New England was built around Puritan communities and trade, the Middle Colonies around ethnic diversity and agriculture, and the South around a plantation economy of tobacco, rice, and indigo. Read these regional differences alongside Britain's policy of mercantilism and the relative self-government of the salutary neglect era, and it becomes clear why the eventual revolutionary explosion was almost inevitable.",
    objectives: [
      "Compare the economic, social, and religious characteristics of the New England, Middle, and Southern colonies and explain how each region was formed",
      "Analyze how the principles of mercantilism and the Navigation Acts affected the colonial economy",
      "Evaluate how the policy of salutary neglect contributed to colonial self-governance and the rise of independent institutions",
      "Describe how the transatlantic slave trade and the plantation system determined the social structure of the Southern colonies",
      "Compare how the class hierarchy and gender roles of colonial society resembled and differed from those of Britain",
    ],
    sections: [
      {
        title: "Regional Characteristics of the 13 Colonies",
        subtitle: "From Puritan communities to plantations — how geography and economy shape a society",
        terms: [
          {
            term: "Mercantilism",
            def: "The economic theory that a nation's wealth is measured by its accumulation of precious metals such as gold and silver, and that colonies should supply the mother country with raw materials while consuming its manufactured goods. Under this principle Britain enacted the Navigation Acts to control colonial trade.",
          },
          {
            term: "Salutary Neglect",
            def: "An informal British policy from the late 17th to the mid-18th century of deliberately relaxing strict enforcement of laws over the colonies. During this period colonial assemblies developed substantial self-government, which set the stage for fierce resistance once Britain later tightened control.",
          },
          {
            term: "Plantation system",
            def: "The agricultural economy of the Southern colonies that relied on enslaved African labor to grow tobacco (Virginia, Maryland), rice, and indigo (South Carolina, Georgia) on a large scale. This system caused an explosive expansion of the transatlantic slave trade.",
          },
          {
            term: "Colonial Assembly",
            def: "A representative legislative body that developed independently within each colony. Virginia's House of Burgesses (1619) was the first, and during salutary neglect such assemblies accumulated real power by controlling taxation and spending.",
          },
        ],
        traps: [
          "Avoid the simplistic binary of a 'free' North and an 'oppressive' South. New England Puritans also expelled religious nonconformists (Roger Williams, Anne Hutchinson), and Northern merchants profited from operating slave-trading ships. Regional differences should be described not as 'who owned slaves' but as differences in economic structure and the degree of dependence on slavery.",
          "Do not read salutary neglect as 'Britain abandoning the colonies.' Britain continued to extract mercantilist benefits and merely loosened enforcement. When the policy ended and strict control resumed, the colonists' backlash was not resistance to 'new pressure' but anger at having 'something taken away after growing accustomed to self-rule.'",
        ],
        example:
          "Compare Virginia and Massachusetts Bay. Virginia (1607) was a commercial colony founded for profit by the London Virginia Company; its climate and soil were ideal for tobacco, so it rapidly shifted to a plantation economy. Massachusetts Bay (1630), by contrast, was settled by Puritans seeking to build a community of faith, where the town meeting became an early form of democratic self-government. Both colonies were under the British Crown, yet their economic bases and social structures were entirely different — and that difference became a seed of North-South conflict even in later debates over forming the union.",
      },
      {
        title: "The Transatlantic Slave Trade and Fractures in Colonial Society",
        subtitle: "Structural inequality created by triangular trade, and African American resistance",
        terms: [
          {
            term: "Triangular Trade",
            def: "The Atlantic trade circuit running Europe (manufactured goods) → Africa (enslaved people) → the Americas (raw materials and agricultural products) → Europe. The Middle Passage from Africa to the Americas was the route by which millions of Africans were forcibly transported under horrific conditions.",
          },
          {
            term: "Middle Passage",
            def: "The transatlantic crossing that carried enslaved Africans from the West African coast to the Americas. It averaged six to eight weeks, and the brutal conditions produced a death rate in transit of roughly 10 to 20 percent.",
          },
          {
            term: "Indentured Servitude",
            def: "A system in which British immigrants agreed to provide contract labor for a fixed term (usually four to seven years) in exchange for passage across the Atlantic. It was the main labor force in the South into the late 17th century, but after Bacon's Rebellion (1676) it was rapidly replaced by enslaved African labor.",
          },
          {
            term: "Bacon's Rebellion (1676)",
            def: "An uprising in Virginia led by Nathaniel Bacon and composed of indentured servants, poor farmers, and freed laborers. In its aftermath plantation owners came to prefer enslaved Africans, who were easier to control than poor whites, and the slave system expanded rapidly.",
          },
        ],
        traps: [
          "Do not portray African Americans solely as passive victims. At the Honors level, high marks require describing forms of resistance — work slowdowns, escape, the preservation of community through language, religion, and culture, and direct action such as the Stono Rebellion (1739).",
        ],
        example:
          "Trace the shift from indentured servitude to racial slavery through Bacon's Rebellion (1676). Before the rebellion, Virginia's plantations relied heavily on white indentured servants from Britain who worked four to seven years for passage. When Nathaniel Bacon led an armed uprising of poor whites, freed servants, and enslaved Africans against Governor William Berkeley, planters were terrified that a poor multiracial underclass could unite against them. In response they turned decisively to lifelong enslaved African labor, which could be controlled by law and skin color and could never win freedom or land. Within a generation, laws hardening slavery as an inherited, race-based status expanded rapidly — showing how a class revolt was 'solved' by deepening racial slavery.",
      },
    ],
  },
  {
    lessonId: "honors-us-history-u1-l2",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 1,
    lessonNum: 2,
    unitName: "Colonial Era & the American Revolution",
    title: "Causes of the Revolution — Taxation, Resistance, and the Enlightenment",
    subtitle:
      "From the French and Indian War to the Intolerable Acts — how grievance exploded into revolution",
    overview:
      "The American Revolution did not happen suddenly. After the French and Indian War ended in 1763, Britain began taxing the colonies to resolve its war debt, and this collided with colonists who had grown accustomed to self-government under salutary neglect. The Enlightenment idea of 'no taxation without representation' became the theoretical weapon of resistance, and a chain of events — the Boston Massacre, the Boston Tea Party, and the Intolerable Acts — transformed simple economic grievance into a political will for independence.",
    objectives: [
      "Explain how the French and Indian War reshaped British-colonial relations and analyze how it led to the fundamental causes of the Revolution",
      "Describe in detail the content of major tax policies such as the Stamp Act, Townshend Acts, and Tea Act, and the colonial reactions to them",
      "Connect the core arguments of Enlightenment thinkers such as John Locke and Montesquieu to the logic of colonial resistance",
      "Narrate the causes and consequences of the Boston Massacre, Boston Tea Party, and Intolerable Acts as a chain of cause and effect",
      "Compare and evaluate the differing positions and social backgrounds of Loyalists and Patriots within the colonies",
    ],
    sections: [
      {
        title: "The French and Indian War and Britain's Tax Policies",
        subtitle: "How the enormous debt of the Seven Years' War ignited colonial resistance",
        terms: [
          {
            term: "French and Indian War (1754–1763)",
            def: "The North American theater of the Seven Years' War, in which Britain and France fought while drawing in Native allies. Britain won and acquired Canada and territory east of the Mississippi, but its attempt to shift the immense war debt onto the colonies became the fuse of the Revolution.",
          },
          {
            term: "Stamp Act (1765)",
            def: "The first direct tax, requiring British stamps on newspapers, legal documents, playing cards, and the like. It provoked fierce backlash across the colonies under the slogan 'no taxation without representation' and prompted the formation of the Sons of Liberty.",
          },
          {
            term: "Townshend Acts (1767)",
            def: "Legislation imposing indirect duties on imports such as glass, paper, and tea. Parliament argued that 'external taxes' were legal after repealing the Stamp Act, but colonists called these taxation without representation as well and organized boycotts.",
          },
          {
            term: "No Taxation Without Representation",
            def: "The colonists' core claim that taxes imposed by a Parliament in which they elected no representatives were unjust. Grounded in John Locke's social contract theory, this logic became the theoretical foundation of colonial resistance.",
          },
        ],
        traps: [
          "In the French and Indian War, the 'Indians' were not all on the French side — the name is easy to misread. The war is named for Britain's two main adversaries, France and various Native tribes (some allied with France, some with Britain). The Iroquois Confederacy was mostly pro-British, while the Algonquin and Huron tribes sided with France.",
          "Do not read the repeal of the Stamp Act as a British concession. In repealing it, Parliament simultaneously passed the Declaratory Act (1766), asserting its full legislative authority over the colonies. This act was later used as the legal basis for harsher tax policies.",
        ],
        example:
          "Consider how the Sons of Liberty organized colonial resistance. Led by Samuel Adams, the group intimidated and assaulted stamp collectors and urged people to refuse payment. It went further by organizing non-importation agreements to apply economic pressure. By creating intercolonial Committees of Correspondence to share information, they built the foundation for convening the Continental Congress. This is resistance evolving from individual anger into an organized political movement.",
      },
      {
        title: "The Boston Crisis and the Tensions on the Eve of Revolution",
        subtitle: "From the Boston Massacre to the Intolerable Acts — the moment of crossing a point of no return",
        terms: [
          {
            term: "Boston Massacre (1770)",
            def: "An incident in which British troops stationed in Boston fired on a taunting crowd, killing five. The situation was in reality chaotic, but Paul Revere's propaganda engraving and press coverage packaged it as a 'massacre of colonists by British soldiers,' inflaming anti-British sentiment.",
          },
          {
            term: "Boston Tea Party (1773)",
            def: "An event in which the Sons of Liberty, protesting the Tea Act, disguised themselves as Indians and dumped 342 chests of tea aboard British East India Company ships into Boston Harbor. It triggered the British government's hardline response, the Intolerable Acts.",
          },
          {
            term: "Intolerable Acts (1774)",
            def: "The collective name for four laws enacted as British retaliation for the Boston Tea Party, including the closure of Boston Harbor, the dissolution of Massachusetts self-government, and forced quartering of British troops in private homes. They instead promoted colonial unity and prompted the convening of the First Continental Congress (1774).",
          },
          {
            term: "Enlightenment",
            def: "A 17th–18th century European intellectual movement emphasizing reason, natural rights, and the social contract. The ideas of John Locke (natural rights: life, liberty, property), Montesquieu (separation of powers), and Jean-Jacques Rousseau (popular sovereignty) provided the theoretical foundation of the Revolution.",
          },
        ],
        traps: [
          "The Boston Massacre was not a deliberate massacre, yet the name 'massacre' is what history recorded. If an exam asks for the significance of the Boston Massacre, emphasize its function as propaganda — spreading anti-British sentiment and promoting colonial unity — rather than the violence of the event itself. Remember too that most British soldiers were later acquitted, and that their defense attorney was John Adams, who would become the second president.",
          "The Intolerable Acts produced the opposite of what Britain intended. Britain meant to make an example of Massachusetts to frighten the other colonies, but instead the others united, fearing 'we could be next.' It is a textbook historical case of repression strengthening resistance.",
        ],
        example:
          "Trace the causal chain from tea to armed unity. In December 1773 the Sons of Liberty dumped 342 chests of East India Company tea into Boston Harbor to protest the Tea Act. Britain retaliated in 1774 with the Intolerable Acts, closing Boston Harbor until the tea was paid for and stripping Massachusetts of self-government. Rather than isolating Massachusetts, this pushed the other colonies to convene the First Continental Congress in Philadelphia in September 1774, where twelve colonies coordinated a boycott and pledged mutual support. Within seven months the fighting at Lexington and Concord (April 1775) began — a straight line from a harbor protest, to punishment, to intercolonial unity, to war.",
      },
    ],
  },
  {
    lessonId: "honors-us-history-u1-l3",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 1,
    lessonNum: 3,
    unitName: "Colonial Era & the American Revolution",
    title: "The Revolution — Declaration, War, and Designing a New Nation",
    subtitle:
      "From the Declaration of Independence to the failure of the Articles of Confederation and the compromises of the Constitution",
    overview:
      "The 1776 Declaration of Independence was not a mere statement of separation — it was a revolutionary document that translated John Locke's philosophy of natural rights into the language of nation-building. But winning a war and founding a country were separate tasks. The first governmental design, the Articles of Confederation, made the central government too weak to control crises like Shays' Rebellion, and that failure led to the Constitutional Convention of 1787. This lesson traces the journey from the Revolution's victory to the birth of the Constitution as a 'product of imperfect compromise.'",
    objectives: [
      "Analyze the structure of the Declaration of Independence (a statement of Enlightenment principles, a list of grievances against the British king, and the declaration of independence) and the historical significance of each part",
      "Explain the strategic importance of pivotal battles such as the Battle of Saratoga and the Siege of Yorktown",
      "Describe the major weaknesses of the Articles of Confederation and the national crises they produced with concrete examples",
      "Evaluate the content and meaning of key negotiations in the constitution-making process, such as the Great Compromise and the Three-Fifths Compromise",
      "Compare the issues dividing Federalists and Anti-Federalists and explain the context for adding the Bill of Rights",
    ],
    sections: [
      {
        title: "The Declaration of Independence and Turning Points of the War",
        subtitle: "Enlightenment thought becomes a document, and the document becomes the engine of war",
        terms: [
          {
            term: "Declaration of Independence (1776)",
            def: "The document declaring independence, drafted by Thomas Jefferson. Its phrase that 'all men are created equal' with 'unalienable rights' to life, liberty, and the pursuit of happiness is a distinctly American reinterpretation of Locke's natural rights. It also includes a list of 27 grievances against King George III.",
          },
          {
            term: "Battle of Saratoga (1777)",
            def: "The decisive turning point of the Revolutionary War. The American victory in surrounding and forcing the surrender of British General Burgoyne's army was crucial in bringing France into the war as an ally. Without French military and financial support, victory would have been impossible.",
          },
          {
            term: "Siege of Yorktown (1781)",
            def: "The battle in which the combined forces of George Washington and French General Rochambeau surrounded and forced the surrender of British General Cornwallis. It was effectively the last major battle of the war, leading to the Treaty of Paris (1783), by which Britain formally recognized American independence.",
          },
          {
            term: "Treaty of Paris (1783)",
            def: "The peace treaty between Britain and the United States formally recognizing American independence. It recognized U.S. territory to the Mississippi River and included fishing and navigation rights. Benjamin Franklin, John Adams, and John Jay were the American negotiators.",
          },
        ],
        traps: [
          "You must address the historical contradiction that the Declaration's 'all men' did not include women, the enslaved, or Native peoples. At the Honors level, describing the Declaration only as a 'complete realization of liberty and equality' loses marks. The Honors approach analyzes it through an 'unfinished revolution' frame, in which the Declaration's revolutionary language was later repurposed as the logical basis for abolition, women's suffrage, and the civil rights movement.",
          "Avoid the myth that the Revolution was won by American strength alone. France's funds, navy, and troops; German mercenaries (Hessians) on the British side; and foreign volunteers such as the Polish-born Kosciuszko and Pulaski all played decisive roles. Make clear the causal link that the Saratoga victory was the direct trigger of the French alliance.",
        ],
        example:
          "Break the Declaration of Independence into three parts. First, the Preamble directly applies Locke's social contract theory — government derives its power from the consent of the governed, and when government violates natural rights the people have the right to replace it. Second, the list of grievances enumerates 27 ways King George III violated this contract — taxation without representation, forced quartering of troops, dissolving self-governing assemblies. Third, the declaration of independence proclaims formal separation as the logical conclusion. This structure makes it not merely a statement of 'we will be independent' but a work of political philosophy arguing the legitimacy of a new nation through reason and natural law.",
      },
      {
        title: "The Failure of the Articles of Confederation and the Making of the Constitution — Imperfect Compromise",
        subtitle: "The chaos created by a too-weak central government, and the 'living compromise' born in Philadelphia",
        terms: [
          {
            term: "Articles of Confederation (1781–1789)",
            def: "America's first constitution. Out of fear of a strong central government, it denied the federal government the power to tax, maintain a standing army, or regulate interstate commerce. The failure to suppress Shays' Rebellion (1786) exposed the limits of this system and triggered the Constitutional Convention.",
          },
          {
            term: "Great Compromise (1787)",
            def: "The negotiation at the Constitutional Convention that resolved the dispute between large and small states over legislative representation. It adopted a bicameral legislature: the Senate with two equal representatives per state regardless of population, and the House of Representatives apportioned by population.",
          },
          {
            term: "Three-Fifths Compromise",
            def: "The agreement to count enslaved people as three-fifths of a free person in the population used to apportion House seats and direct taxes. It increased the legislative influence of Southern states while treating the enslaved as property rather than full human beings — a morally compromised provision.",
          },
          {
            term: "Bill of Rights (1791)",
            def: "The first ten amendments added to the Constitution. They guarantee freedom of speech, religion, and assembly (1st), the right to bear arms (2nd), and protection against unreasonable searches (4th). Anti-Federalists, fearing that a strong central government would infringe individual liberty, demanded them as a condition of ratification.",
          },
        ],
        traps: [
          "Do not view the Articles of Confederation simply as a 'failed government.' Under the Articles, the Northwest Ordinance (1787) was enacted, establishing the legal process for territorial expansion, setting the conditions for new states to join, and banning slavery in the new territories — an important achievement. If an exam asks about the 'accomplishments' of the Articles, you must mention the Northwest Ordinance.",
          "The Three-Fifths Compromise was not the South trying to have the enslaved 'recognized as people' — on the contrary, Southern plantation owners sought to use 'their property (the enslaved)' to gain more seats in Congress. The enslaved had no vote, and their 'population' was used only to strengthen the political influence of white owners. This moral contradiction is America's 'original sin,' carried all the way to the Civil War.",
        ],
        example:
          "Examine the Federalist versus Anti-Federalist debate concretely. Alexander Hamilton, James Madison, and John Jay used the 85 essays of The Federalist Papers to argue why a strong central government was necessary. Madison's Federalist No. 10, arguing the dangers of faction and why a republic controls them, is the most famous document of American political theory. Patrick Henry, George Mason, and other Anti-Federalists argued that a strong central government would infringe state rights and individual liberty, and demanded the Bill of Rights as a precondition of ratification. Without this compromise the Constitution would not have been ratified — the U.S. Constitution was from the start not a perfect document but the product of a living compromise designed to be continuously amended.",
      },
    ],
  },
];
