/**
 * Core Notes English version — Honors US History Unit 3 (Industrialization, Gilded Age & Progressive Era).
 * Faithful English rendering of the Korean source (objectives · terms · traps · example).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_US_HISTORY_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-us-history-u3-l1",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 3,
    lessonNum: 1,
    unitName: "Industrialization, Gilded Age & Progressive Era",
    title: "Industrialization and the Age of Big Business — Railroads, Steel, and the America of the Robber Barons",
    subtitle:
      "How America transformed into the world's largest industrial power after the Civil War, and who amassed astronomical wealth while who was exploited in the process",
    overview:
      "When the Civil War ended in 1865, America was still an agrarian nation. Yet just 30 years later, in the 1890s, it had overtaken Britain to become the world's largest industrial producer. How was this possible? Three keys: railroads, steel, and oil. Railroads bound the continent into a single market, and Andrew Carnegie's vertical integration and John D. Rockefeller's horizontal integration created unprecedented monopolies. Were these men 'captains of industry' or 'robber barons'? The answer depends on where you stand — a hero to a factory owner, an exploiter to a worker laboring 12 hours a day. This lesson examines the engine of industrialization and its shadow at once.",
    objectives: [
      "Comprehensively analyze the core factors that made post-Civil War industrialization possible (railroad expansion, natural resources, immigrant labor, technological innovation, government support)",
      "Explain concretely the difference between vertical integration and horizontal integration through the cases of Carnegie and Rockefeller",
      "Present and critically evaluate the evidence for the opposing historical interpretations of 'robber barons' and 'captains of industry'",
      "Explain the demands and resistance of workers in the industrial age through the major organizations and representative strikes of the labor movement",
      "Describe the legislative background and the limits of early enforcement of the Sherman Antitrust Act (1890), connecting them to the growth of monopolies",
    ],
    sections: [
      {
        title: "Railroads, Steel, and Oil — The Triangle of Industrial Empire",
        subtitle: "From the transcontinental railroad to Standard Oil — the logic of monopoly and the start of antitrust",
        terms: [
          {
            term: "Vertical Integration",
            def: "A strategy in which one company controls every stage of the supply chain, from raw-material production to final sale. Carnegie Steel is the prime example: it owned mines, railroads, mills, and distribution networks, dramatically lowering costs and driving competitors out of the market. It maximizes efficiency but subordinates subcontractors, competitors, and workers alike.",
          },
          {
            term: "Trust",
            def: "A form of business combination pioneered by Rockefeller's Standard Oil. Competing companies turned their stock over to a trustee and received only dividends, so they operated effectively as a single monopoly. By the 1880s Standard Oil controlled over 90 percent of U.S. oil refining, which became the direct cause of antitrust legislation.",
          },
          {
            term: "Sherman Antitrust Act (1890)",
            def: "America's first federal antitrust law, making business practices that restrained trade or formed monopolies illegal. Early enforcement was weak, however, and it was even misused to regulate the collective action of labor unions. Only in the Roosevelt administration did it function as a real tool for 'trust-busting.'",
          },
          {
            term: "Transcontinental Railroad (1869)",
            def: "The railroad completed when the Union Pacific and Central Pacific lines met at Promontory Summit, Utah. Built through the grueling labor of Irish and Chinese immigrants, it connected East and West, unifying the national market and accelerating Western development.",
          },
        ],
        traps: [
          "Do not evaluate Carnegie and Rockefeller in the simple binary of 'greedy villains' or 'great entrepreneurs.' Both undertook enormous philanthropy late in life (Carnegie Hall, Carnegie Mellon University, the Rockefeller Foundation), but that wealth was built on the exploitation of workers, the destruction of competitors, and the monopoly harm done to consumers. At the Honors level, present the evidence for both views and judge within historical context.",
          "Writing that monopolies dissolved as soon as the Sherman Antitrust Act passed is an error. For about 10 years from 1890 the law was effectively unenforced, and the Supreme Court even refused to apply it in E.C. Knight Co. v. United States (1895), ruling that manufacturing was not 'commerce.' Effective monopoly regulation arrived only in the era of Theodore Roosevelt.",
        ],
        example:
          "Trace concretely how Rockefeller monopolized the oil industry. Founding Standard Oil in 1870, Rockefeller first bought out or bankrupted every competing refinery in Cleveland — a process called the 'Cleveland Massacre.' He then made secret rebate deals with railroad companies, securing far lower shipping rates than his competitors. Unable to ship at the same price, competitors had no choice but to close or sell to Rockefeller. As a result, by the 1880s Standard Oil controlled over 90 percent of U.S. oil refining. Was this a free market or the destruction of one? That very question became the moral energy of the antitrust movement.",
      },
      {
        title: "The Birth of the Labor Movement — Exploitation and Resistance",
        subtitle: "From the Knights of Labor to the AFL — why the 19th-century labor movement repeatedly failed",
        terms: [
          {
            term: "Knights of Labor",
            def: "America's first large-scale national labor organization, formed in 1869. It was notable for inclusively organizing skilled and unskilled workers, Black people, and women. It demanded an eight-hour workday, the abolition of child labor, and a cooperative economy. After the Haymarket Affair (1886) it was tarred with association with anarchists and declined rapidly.",
          },
          {
            term: "AFL (American Federation of Labor)",
            def: "A federation of labor unions centered on skilled workers, organized by Samuel Gompers in 1886. Unlike the Knights, it largely excluded unskilled workers, immigrants, and Black people. It pursued practical goals ('bread and butter unionism') — higher wages, shorter hours, better conditions — rather than social revolution, and so lasted longer.",
          },
          {
            term: "Homestead Strike (1892)",
            def: "A strike by workers at Carnegie Steel's Homestead plant in Pennsylvania against wage cuts. Manager Henry Clay Frick hired Pinkerton private guards, leading to armed clashes with workers, after which the state militia was deployed and the strike was crushed. It dealt a fatal blow to Carnegie's pro-worker image.",
          },
        ],
        traps: [
          "Writing that the AFL was 'more progressive' than the Knights of Labor is an error. The AFL actually restricted its organization to skilled workers, systematically excluding unskilled workers, immigrants, Black people, and women. While the Knights were inclusive, the AFL reproduced inequality within the labor movement. Distinguish 'more practical' from 'more inclusive' — they are entirely different evaluations.",
          "Do not simplify all 19th-century labor strikes as connected to violent anarchism. There was no evidence that whoever threw the bomb at Haymarket belonged to the Knights of Labor, yet the press manufactured the link, and the courts executed activists who had led an eight-hour-workday rally. This is a case showing how media, courts, and business used the fear of 'radicalism' to suppress the labor movement.",
        ],
        example:
          "See why the 19th-century labor movement kept failing through the Homestead Strike (1892). At Carnegie Steel's Homestead plant in Pennsylvania, workers struck against wage cuts while Andrew Carnegie was conveniently abroad. His manager Henry Clay Frick hired 300 armed Pinkerton private guards to break the strike, and a gun battle on the Monongahela River left workers and Pinkertons dead. The governor then sent 8,000 state militia, the plant reopened with strikebreakers, and the union was crushed. The pattern repeats across the era — Homestead, Pullman (1894), Haymarket (1886): companies could summon private guards, state militia, courts, and federal troops, while unions had only the strike, so organized labor lost nearly every major confrontation before 1900.",
      },
    ],
  },
  {
    lessonId: "honors-us-history-u3-l2",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 3,
    lessonNum: 2,
    unitName: "Industrialization, Gilded Age & Progressive Era",
    title: "Immigration, Urbanization, and the Gilded Age — The Gilt Surface and the Inner Inequality",
    subtitle:
      "The very name 'Gilded' is a critique — the duality of the American Dream as Mark Twain saw it",
    overview:
      "When Mark Twain and Charles Dudley Warner named this era the 'Gilded Age' in their 1873 novel, it was no compliment — it was a biting satire that the surface glittered like gold while the inside was filled with base metal. From the 1880s to the 1900s, roughly 20 million immigrants poured into America. The 'New Immigration' from southern and eastern Europe — Italians, Poles, Jews, Slavs — crowded into urban slums like New York's Lower East Side. Thanks to railroads, inland cities like Chicago, Cleveland, and Pittsburgh exploded in growth, but behind that growth lay corrupt structures like Tammany Hall ruled by political bosses, child labor, and racial discrimination. The key to understanding the Gilded Age is to see precisely this gap between surface and substance.",
    objectives: [
      "Compare Old Immigration and New Immigration in terms of region of origin, scale, and reception, and explain the background of anti-immigrant sentiment and legislation (such as the Chinese Exclusion Act)",
      "Describe with concrete examples the engines of urban growth in the industrial age and urban problems (slums, corruption, child labor, disease)",
      "Analyze how the Gilded Age's political structures — the political machine and the spoils system — gained immigrant support while simultaneously deepening corruption",
      "Compare and evaluate how the two ideologies of Social Darwinism and the Gospel of Wealth justified Gilded Age inequality",
      "Describe the historical significance of farmer grievances and the rise of the Populist Party as a response to the political and economic contradictions of the Gilded Age",
    ],
    sections: [
      {
        title: "New Immigration and Urbanization — 'Melting Pot' or 'Salad Bowl'?",
        subtitle: "From Ellis Island to the Lower East Side — the cities immigrants built and the walls they faced",
        terms: [
          {
            term: "New Immigration",
            def: "The wave of immigrants who arrived after the 1880s, mainly from southern and eastern Europe (Italy, Poland, Russia, Austria-Hungary) and Asia. Unlike the earlier Old Immigration (Britain, Germany, Ireland, Scandinavia), their language, religion, and appearance felt more foreign, provoking strong anti-immigrant sentiment. Most became industrial workers concentrated in low-wage urban jobs.",
          },
          {
            term: "Chinese Exclusion Act (1882)",
            def: "A law banning Chinese laborers from immigrating for 10 years (later extended until 1943). It was the first U.S. immigration ban targeting a specific ethnic group — a textbook case of racist legislation that exploited Chinese labor for railroad construction and then excluded them once they were no longer needed.",
          },
          {
            term: "Political Machine",
            def: "A corrupt political organization that ruled a city. The prime example is New York's Tammany Hall. It provided immigrants with jobs, housing, and legal help in exchange for loyal votes at election time. The boss controlled public-works contracts, the police, and even the courts, effectively privatizing the whole city.",
          },
          {
            term: "Social Darwinism",
            def: "The ideology, applied by Herbert Spencer from Darwin's theory of natural selection to human society, that 'survival of the fittest' determines economic success. With the logic that poverty results from individual inferiority and the rich are 'superiors' not weeded out by natural selection, it became the ideological shield of big business and the wealthy against government welfare intervention.",
          },
        ],
        traps: [
          "Do not view the political machine merely as a 'corrupt clique.' From the immigrant's perspective, an organization like Tammany Hall was the only institution that provided real help — job placement, food, aid with citizenship — to new immigrants who spoke no English and had no rights. To understand 'why immigrants supported this corrupt structure,' you must start from their practical needs. At the Honors level, analyzing this structural contradiction is key.",
          "Do not confuse Social Darwinism with Darwin's theory of evolution. Darwin only explained biological evolution; its application to society was the independent interpretation of social thinkers such as Spencer. Darwin himself did not endorse such social applications. On an exam, writing that 'Darwin advocated Social Darwinism' is a factual error.",
        ],
        example:
          "Consider why Jacob Riis's How the Other Half Lives (1890) was a turning point of the Gilded Age. Riis, a Danish-born immigrant journalist, was the first to use flash photography to show middle-class readers the slums of New York's Lower East Side — tenements with ten people in one room, child labor, heaps of garbage — directly. Words could be ignored, but photographs were hard to ignore. The book led to reform of New York housing law and prompted the young Theodore Roosevelt (then New York police commissioner) to visit the slums himself and burn with reformist zeal. It is a historical instance of the saying that 'a single photograph can change the world.'",
      },
      {
        title: "The Populist Party and the Election of 1896 — The Fracture of the Gilded Age",
        subtitle: "Where and why the farmers' revolt failed, and why it became the seed of the Progressive Era",
        terms: [
          {
            term: "Populist Party / People's Party",
            def: "A third party formed in the 1890s on the grievances of farmers and workers. It demanded the nationalization of railroads, a progressive income tax, the direct election of senators, and the free coinage of silver. It showed a successful third-party challenge by winning 22 electoral votes in 1892, but after being absorbed by the Democrats in 1896 it effectively dissolved.",
          },
          {
            term: "Free Silver",
            def: "An inflationary policy demand to freely coin silver at a 16:1 ratio to gold, instead of the gold standard, to increase the money supply. Indebted farmers wanted inflation to reduce the real burden of their debts. The 1896 Democratic candidate William Jennings Bryan's 'Cross of Gold' speech symbolized this demand.",
          },
          {
            term: "Election of 1896",
            def: "The contest between Republican William McKinley and the Democratic-Populist fusion candidate William Jennings Bryan. It was an ideological showdown of defending the gold standard (business, Eastern finance) versus free silver (farmers, debtors). McKinley's victory preserved the Gilded Age economic order, and the defeat meant the end of the Populist movement.",
          },
        ],
        traps: [
          "Do not record the Populist Party merely as a 'failed farmers' revolt.' The policies it demanded — a progressive income tax (16th Amendment, 1913), the direct election of senators (17th Amendment, 1913), stronger railroad regulation — were substantially realized decades later through the Progressive Era and the New Deal. The Populists should be evaluated not as 'losers of their age' but as those who 'laid out the roadmap for future policy.'",
          "Do not read Bryan's 'Cross of Gold' speech as merely a religious one. The line 'you shall not crucify mankind upon a cross of gold' borrowed religious rhetoric to deliver an economic message — a political speech. To analyze why it provoked an explosive response among Southern and Western farmers, connect it to the real suffering the gold standard inflicted on indebted farmers.",
        ],
        example:
          "See how the Election of 1896 fractured and ended the Populist movement. William Jennings Bryan, only 36, electrified the 1896 Democratic convention with his 'Cross of Gold' speech demanding free silver, and the Populists fused behind him rather than run their own candidate. Republican William McKinley, backed by industrialist Mark Hanna's unprecedented campaign war chest of some $3.5 million from banks and corporations, defended the gold standard and won 271 to 176 electoral votes. Once the Populists had poured their identity into Bryan and lost, the third party effectively dissolved. Yet within two decades their platform was law — the progressive income tax (16th Amendment, 1913) and direct election of senators (17th Amendment, 1913) — showing they lost the election but wrote the future policy agenda.",
      },
    ],
  },
  {
    lessonId: "honors-us-history-u3-l3",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 3,
    lessonNum: 3,
    unitName: "Industrialization, Gilded Age & Progressive Era",
    title: "The Progressive Era and the Prelude to Imperialism — Reformers Change America as America Goes Out into the World",
    subtitle:
      "From the muckrakers' exposés to women's suffrage and the Panama Canal — why America reformed at home and abroad at once",
    overview:
      "When the contradictions of the Gilded Age reached their peak, America moved in two directions at once. Inward came Progressivism — a reform movement to regulate corrupt politics, monopolies, unsafe food, and child labor, and to make democracy real. Outward came Imperialism — rising as a power of the Pacific and the Caribbean by absorbing Cuba, the Philippines, Guam, and Puerto Rico into its sphere through the Spanish-American War (1898). That these two movements proceeded together was no coincidence — a newly industrial America needed overseas markets, resources, and strategic bases. The Progressive Era was full of fine slogans, but its benefits went mainly to the white middle class, while reform's hand rarely reached Black people, immigrants, and Native peoples. This lesson examines the achievements and limits of Progressivism and how America stepped onto the world stage.",
    objectives: [
      "Explain the representative works of the muckrakers and their influence on Progressive legislation with concrete cases (Upton Sinclair's The Jungle, Ida Tarbell's investigation of Standard Oil, etc.)",
      "Compare and analyze the similarities and differences between Theodore Roosevelt's 'Square Deal' and Woodrow Wilson's 'New Freedom'",
      "Describe the strategic development of the women's suffrage movement and the process up to the passage of the 19th Amendment (1920), with key figures and events",
      "Analyze the causes and consequences of the Spanish-American War and explain how American imperialism developed from the Monroe Doctrine",
      "Critically evaluate how Progressive reforms were applied to or excluded Black people, immigrants, and Native peoples, in order to describe the structural limits of Progressivism",
    ],
    sections: [
      {
        title: "The Muckrakers and Progressive Reform — Exposés Make Laws",
        subtitle: "The story of how one book, The Jungle, passed the Pure Food and Drug Act — how journalism makes democracy work",
        terms: [
          {
            term: "Muckrakers",
            def: "A group of early-20th-century investigative journalists and writers who exposed corporate monopoly, political corruption, and social inequality. The name, which Theodore Roosevelt coined mockingly as 'muck-rakers,' became instead a badge of pride. Ida Tarbell (Standard Oil), Upton Sinclair (meatpacking), and Lincoln Steffens (urban political corruption) were representative figures.",
          },
          {
            term: "Square Deal",
            def: "The domestic policy program of President Theodore Roosevelt (1901–1909). It rested on three pillars: consumer protection (Pure Food and Drug Act 1906, Meat Inspection Act 1906), business regulation (trust-busting), and conservation (designating national parks). It advanced the principle of giving everyone a fair chance.",
          },
          {
            term: "19th Amendment (1920)",
            def: "The constitutional amendment banning restrictions on voting based on sex, guaranteeing women's suffrage. It was achieved 72 years after the demand began at the Seneca Falls Convention (1848). It was the fruit of decades of activism by Elizabeth Cady Stanton, Susan B. Anthony, and Carrie Chapman Catt.",
          },
          {
            term: "Roosevelt Corollary (1904)",
            def: "A foreign policy declared by Theodore Roosevelt extending the Monroe Doctrine. It declared that if Latin American nations failed to meet international debts, the United States could intervene as an 'international police.' Framed as preventing European intervention, it was effectively an imperialist declaration justifying American hegemony over the Caribbean and Central America.",
          },
        ],
        traps: [
          "Do not miss the irony that Upton Sinclair's The Jungle (1906) was written to expose the misery of workers, but actual public opinion focused on food safety. Sinclair himself lamented, 'I aimed at the public's heart, and by accident I hit it in the stomach.' This is a symbolic case showing why Progressive reform was more effective at protecting middle-class consumers than the working class as a whole.",
          "Do not view the Progressive Era as America's 'age of complete democratization.' Progressive reformers were mainly white middle-class men and women, and Black civil rights were largely excluded from the agenda. Theodore Roosevelt made the symbolic gesture of inviting the Black leader Booker T. Washington to the White House, but he did not structurally challenge the South's racial segregation (Jim Crow) system. At the Honors level you must point out this 'selective Progressivism.'",
        ],
        example:
          "Understand the strategic evolution of the women's suffrage movement in three stages. Stage 1 (1848–1870s): the Seneca Falls Convention adopted a declaration and tried to include women in the 14th and 15th Amendments, but they were excluded. Stage 2 (1870–1900): a shift to winning suffrage at the state level, succeeding first in Western states like Wyoming and Colorado. Stage 3 (1900–1920): concentration on a national constitutional amendment. Carrie Chapman Catt's 'Winning Plan' used state-level gains as leverage to apply federal pressure. The reason it took 72 years was not simply that men opposed it — even among women there was a real anti-suffrage movement arguing that 'gaining the vote would damage women's traditional role.' Understanding this complexity is Honors-level analysis.",
      },
      {
        title: "The Spanish-American War and Imperialism — 'Manifest Destiny' Beyond the Sea",
        subtitle: "Yellow journalism, the USS Maine, the Philippines — the moment America decided to become an empire",
        terms: [
          {
            term: "Yellow Journalism",
            def: "The practice by which William Randolph Hearst's New York Journal and Joseph Pulitzer's New York World sensationalized and exaggerated the Cuban crisis to attract readers. Reporting that asserted the 1898 explosion of the USS Maine was Spain's doing played a decisive role in building public support for the Spanish-American War. It is a historical case of how the media manufactures war sentiment.",
          },
          {
            term: "Spanish-American War (1898)",
            def: "A war between the United States and Spain begun on the pretext of supporting Cuban independence. It ended in a swift American victory, often called a war of 'just 10 weeks,' and by the Treaty of Paris the United States acquired Cuba (effectively a protectorate), the Philippines, Guam, and Puerto Rico. Called the 'Splendid Little War,' it was followed in the Philippines by years of the Philippine-American War (1899–1902).",
          },
          {
            term: "Platt Amendment (1901)",
            def: "A provision the United States forced Cuba to insert into its constitution. It restricted Cuba from making independent treaties with foreign powers or incurring debt and codified the United States' right to intervene militarily when necessary. It is a textbook case of neocolonialism, making Cuba a nominally independent nation but in reality an American protectorate.",
          },
        ],
        traps: [
          "Writing as if it were fact that the USS Maine explosion was Spain's doing is an error. Modern historical research favors an internal explosion (possible spontaneous combustion in the coal bunker), but at the time Spain was blamed without evidence as a pretext for war. The key is to analyze how the slogan 'Remember the Maine!' manipulated war sentiment.",
          "Do not describe the results of the Spanish-American War only as the achievement of an American 'war of liberation.' Filipinos resisted, saying they had merely changed from a Spanish colony to an American one, and in the Philippine-American War led by Emilio Aguinaldo roughly 200,000 Filipino civilians died. America called this war the suppression of an 'insurrection,' but from the Filipino perspective it was a war of independence.",
        ],
        example:
          "Understand how Alfred Thayer Mahan's The Influence of Sea Power upon History (1890) became the theoretical foundation of American imperialism. Mahan argued that to become a great power a nation needed a strong navy, overseas bases, and a merchant-marine network. The book directly influenced Theodore Roosevelt and congressional leaders, becoming the blueprint for America's naval expansion and its strategy of securing Pacific bases (Hawaii, Guam, the Philippines). It was no coincidence that the first battle of the Spanish-American War took place not in Cuba but at Manila Bay in the Philippines — the U.S. Navy was already preparing to secure Pacific strategic footholds. If 'war is the continuation of diplomacy,' Mahan's theory equipped that diplomacy with the tool of naval power.",
      },
    ],
  },
];
