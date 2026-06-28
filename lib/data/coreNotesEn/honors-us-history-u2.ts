/**
 * Core Notes English version — Honors US History Unit 2 (The New Republic to the Civil War).
 * Faithful English rendering of the Korean source (objectives · terms · traps · example).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_US_HISTORY_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-us-history-u2-l1",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 2,
    lessonNum: 1,
    unitName: "The New Republic to the Civil War",
    title: "The Experiment of the Early Republic — From the Constitution to Jacksonian Democracy",
    subtitle:
      "Washington's precedents, the birth of party politics, and how the 'people's president' transformed American democracy",
    overview:
      "There is something harder than building a new nation — starting it when no one knows how to run it. When George Washington took office as the first president in 1789, the Constitution was only a skeleton. What counted as 'presidential' conduct, how to form a cabinet, what economic role the federal government should play — all had to be designed from scratch. Alexander Hamilton and Thomas Jefferson clashed over this design, creating America's first party system, and that conflict became the fundamental opposition of Federalism versus Republicanism. Then, when Andrew Jackson arrived in 1828, American democracy reached a turning point, shifting from an elite republic to a 'nation of the common white man.' This lesson traces how the early republic took shape and where it began to split.",
    objectives: [
      "Explain how the major precedents of Washington's administration and Hamilton's economic program established the role of the federal government",
      "Compare and analyze the ideological differences between the Federalists and the Democratic-Republicans in terms of constitutional interpretation, economic policy, and foreign policy",
      "Describe how Chief Justice John Marshall's major rulings established the authority of the Supreme Court and the principle of federal supremacy",
      "Evaluate the key features of Jacksonian Democracy and the consequences of the Indian Removal Act for Native peoples",
      "Critically describe the rise of the Second Party System and the limits that accompanied the expansion of 'common-man democracy'",
    ],
    sections: [
      {
        title: "Designing the Early Republic — Hamilton vs. Jefferson",
        subtitle: "National bank and loose construction vs. strict construction — the prototype of American political conflict",
        terms: [
          {
            term: "Hamilton's Financial Program",
            def: "A series of economic policies proposed by the first Treasury Secretary, Alexander Hamilton: federal assumption of war debt, the establishment of the First Bank of the United States, and protective tariffs for manufacturing. It aimed at a strong, centralized economic system, and the clash with Jefferson became the direct cause of the party split.",
          },
          {
            term: "Loose vs. Strict Construction",
            def: "The fundamental dispute over constitutional interpretation. Hamilton and the Federalists supported a loose construction in which powers not explicitly named could be exercised through the 'necessary and proper' clause. Jefferson and the Republicans held to a strict construction in which the federal government had only the powers explicitly named in the Constitution.",
          },
          {
            term: "Marbury v. Madison (1803)",
            def: "The landmark ruling in which Chief Justice Marshall established the Supreme Court's power of judicial review. It declared the principle that the Court may strike down a law passed by Congress if it violates the Constitution — the foundation of American judicial power to this day.",
          },
          {
            term: "Louisiana Purchase (1803)",
            def: "President Jefferson's purchase of roughly 2.14 million square kilometers of present-day central America from France for about $15 million. Ironically, Jefferson, an advocate of 'strict construction,' carried out the deal without explicit constitutional basis, thereby applying a loose construction of executive power himself.",
          },
        ],
        traps: [
          "Do not confuse the Federalists with today's 'supporters of the federal government.' The Federalists of the early republic backed a strong central government, but Jefferson's Democratic-Republicans did not deny the federal government's existence — they disagreed over the scope of its powers. Both parties competed within the constitutional framework.",
          "Do not read Jefferson's 'duplicity' in the Louisiana Purchase as mere hypocrisy. Jefferson himself admitted the constitutional basis was unclear, but judged the national benefit overwhelming and made a pragmatic decision. At the Honors level it is appropriate to analyze this as a historical irony of 'the conflict between ideology and pragmatism.'",
        ],
        example:
          "Understand the Hamilton-Jefferson clash through one concrete case. When Hamilton proposed the First Bank of the United States, Jefferson argued it was unconstitutional because 'nowhere does the Constitution grant the power to establish a national bank.' Hamilton countered, citing the Necessary and Proper Clause of Article I, Section 8, that a bank was needed for economic management. President Washington sided with Hamilton, and that decision became the prototype of the recurring 'scope of federal power' debate in American history. Their conflict was not a mere clash of personalities but a fundamental difference of vision about what kind of nation America should become.",
      },
      {
        title: "Jacksonian Democracy and Its Contradictions — Expansion and Exclusion at Once",
        subtitle: "How the 'age of the common man' was accompanied by Native removal and the expansion of slavery",
        terms: [
          {
            term: "Jacksonian Democracy",
            def: "The political ideology of the era of President Andrew Jackson (1829–1837). It featured the expansion of universal white male suffrage, resentment of the aristocratic elite (banks, vested interests), and rewarding supporters through the 'spoils system.' It looked like an expansion of democracy, but its benefits were limited to white men.",
          },
          {
            term: "Indian Removal Act (1830)",
            def: "A law signed by Jackson that forcibly relocated Native tribes east of the Mississippi to the west (Indian Territory, present-day Oklahoma). It led to the 'Trail of Tears' (1838–1839), in which thousands of Cherokee died during a forced winter march.",
          },
          {
            term: "Bank War",
            def: "Jackson's policy of vetoing the recharter of the Second Bank of the United States and dispersing federal funds into state banks. Jackson regarded the bank as a tool of the wealthy Eastern elite, but this decision became one cause of speculative overheating and the Panic of 1837.",
          },
          {
            term: "Nullification Crisis (1832–1833)",
            def: "An incident in which South Carolina declared a federal tariff law unconstitutional and 'nullified' it at the state level. Jackson responded with the Force Bill, invoking federal supremacy, and resolved the crisis — but it became a prelude to the Civil War's conflict between states' rights and federal authority.",
          },
        ],
        traps: [
          "Describing Jackson only as a 'hero of democracy' loses marks at the Honors level. Jackson expanded white male democracy, but he also carried out forced removal amounting to ethnic cleansing of Native peoples and was a slaveholder who actively supported slavery. The fact that he ignored the Supreme Court's ruling in favor of the Cherokee (Worcester v. Georgia, 1832) and forced removal anyway shows how limited his 'democracy' was.",
          "Do not simplify Jackson's defense of federal authority in the Nullification Crisis as 'oppressing the South.' The surface issue was the tariff, but South Carolina's real fear was that the federal government might one day regulate slavery. The tariff conflict was a rehearsal for the slavery conflict.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-us-history-u2-l2",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 2,
    lessonNum: 2,
    unitName: "The New Republic to the Civil War",
    title: "Expansion, Division, and the Limits of Compromise — From Manifest Destiny to John Brown",
    subtitle:
      "How westward expansion exploded the debate over the spread of slavery and made national division irreversible",
    overview:
      "One of the most tragic ironies in American history is this: the larger the nation grew, the more it split. As territory expanded to the Pacific through the Mexican War, the annexation of Oregon, and the California gold rush under the ideology of 'Manifest Destiny,' the most important question arose: would slavery be permitted in the new territories? The three compromises — the Missouri Compromise (1820), the Compromise of 1850, and the Kansas-Nebraska Act (1854) — were not solutions but time bombs. The Dred Scott decision (1857) pulled the detonator, and John Brown's raid on Harpers Ferry (1859) brought North and South before an uncrossable river. This lesson traces the tragic logic by which expansion turned into division.",
    objectives: [
      "Analyze the ideological basis of Manifest Destiny and the causes and consequences of the Mexican-American War, and explain how territorial expansion deepened the slavery debate",
      "Describe in order the content of the Missouri Compromise, the Compromise of 1850, and the Kansas-Nebraska Act, and why each ultimately failed",
      "Compare the major figures and strategies of abolitionism and evaluate the influence of the Underground Railroad and slave-narrative literature on Northern public opinion",
      "Analyze the content of Dred Scott v. Sandford (1857) and its political repercussions on the slavery debate",
      "Explain the background of the founding of the Republican Party and the historical significance of the Lincoln-Douglas Debates on the eve of the 1860 election",
    ],
    sections: [
      {
        title: "Manifest Destiny and the Dilemma Created by Territorial Expansion",
        subtitle: "How an America stretched to the Pacific came to hold the bomb of 'free soil or slave soil'",
        terms: [
          {
            term: "Manifest Destiny",
            def: "The mid-19th century expansionist ideology that the United States was divinely destined to rule the entire North American continent. Named by John O'Sullivan in 1845, it was used to justify the Mexican War, the annexation of Oregon, and the seizure of Native lands.",
          },
          {
            term: "Missouri Compromise (1820)",
            def: "A solution to the slavery debate brokered by Henry Clay. It admitted Missouri as a slave state and Maine as a free state simultaneously and banned slavery in the Louisiana Purchase territory north of the 36°30' line. It maintained a fragile balance for 40 years but was effectively repealed by the Kansas-Nebraska Act.",
          },
          {
            term: "Wilmot Proviso (1846)",
            def: "A congressional proposal to ban slavery entirely in any new territory acquired through the Mexican War. It passed the House but was defeated in the Senate. Its failure rallied Northern opinion against the spread of slavery and led to the founding of the Free Soil Party.",
          },
          {
            term: "Kansas-Nebraska Act (1854)",
            def: "A law spearheaded by Stephen Douglas that let the settlers of Kansas and Nebraska decide the slavery question by popular sovereignty. It effectively repealed the ban on slavery north of the Missouri Compromise line, triggered the armed conflict of 'Bleeding Kansas,' and was the direct cause of the Republican Party's founding.",
          },
        ],
        traps: [
          "Do not confuse the Compromise of 1850 with the Kansas-Nebraska Act. The Compromise of 1850 was a package admitting California as a free state but including a strong Fugitive Slave Act. The Kansas-Nebraska Act (1854) was a separate law that effectively nullified the Missouri Compromise. Keep their order and content distinct.",
          "Writing that popular sovereignty was a 'fair solution because it was democratic' loses marks. What actually happened in Kansas was a civil war, as pro- and anti-slavery sides clashed violently to determine the outcome. Popular sovereignty did not solve the problem; it merely moved the problem to the ground.",
        ],
        example:
          "Analyze why the Dred Scott decision (1857) was the detonator of the Civil War. The opinion written by Chief Justice Roger Taney declared three things: first, that Black people (free or enslaved) were not U.S. citizens and therefore had no right to sue in court; second, that because the enslaved were property, it was unconstitutional for the federal government to ban slavery in any territory; third, that the Missouri Compromise itself had been unconstitutional. The ruling effectively meant that 'Congress can make no compromise at all.' Northern liberals and the Republican Party were shocked and concluded that legislative compromise could no longer stop the spread of slavery. Lincoln gained national attention by criticizing the decision, and it became the springboard for his 1860 presidential run.",
      },
      {
        title: "The Abolitionist Movement and the Acceleration of National Division",
        subtitle: "From Frederick Douglass to Harriet Beecher Stowe — moral confrontation swallows politics",
        terms: [
          {
            term: "Underground Railroad",
            def: "A network for the escape of fugitive slaves organized by activists such as Harriet Tubman. 'Underground' did not mean literally beneath the ground but referred to a network of secret routes and hideouts. After escaping herself, Tubman led more than 70 people to free soil through roughly 13 rescue missions.",
          },
          {
            term: "Uncle Tom's Cabin (1852)",
            def: "Harriet Beecher Stowe's novel, which emotionally depicted the cruelty of slavery and played a decisive role in turning Northern opinion against it. The anecdote that Lincoln, on meeting Stowe, called her 'the little woman who started this great war' symbolizes the book's influence.",
          },
          {
            term: "Republican Party (founded 1854)",
            def: "A party founded by a coalition of Northern anti-slavery forces (former Whigs, Free Soilers, and anti-slavery Democrats) in backlash to the Kansas-Nebraska Act. Under the slogan 'Free Labor, Free Soil, Free Men,' it opposed the spread of slavery into new territories.",
          },
          {
            term: "Harpers Ferry Raid (1859)",
            def: "An attempt by the radical abolitionist John Brown to seize the federal arsenal at Harpers Ferry, Virginia, and spark a slave uprising. It failed and Brown was executed, but he was remembered as a martyr in the North and a terrorist in the South, driving national division to the extreme.",
          },
        ],
        traps: [
          "Writing that all abolitionists supported full racial equality is an overgeneralization. There was a spectrum within abolitionism — William Lloyd Garrison demanded immediate, unconditional abolition, while Lincoln in the 1860 election opposed only the spread of slavery into new territories, not abolition in existing slave states. Do not portray Lincoln as a 'complete abolitionist' from the start.",
          "Do not evaluate John Brown's actions simply as the work of a madman. His methods were controversial even in the contemporary North, but his goal of abolishing slavery was shared by many. At the Honors level the key is to analyze 'why this event threw the South into panic' — as the explosion of white Southern fear of an armed Black uprising.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-us-history-u2-l3",
    courseId: "honors-us-history",
    subjectLabel: "Honors US History",
    emoji: "🇺🇸",
    unit: 2,
    lessonNum: 3,
    unitName: "The New Republic to the Civil War",
    title: "The Civil War and Reconstruction — Saving the Union, Ending Slavery, and a Broken Promise",
    subtitle:
      "From the meaning of the Emancipation Proclamation to the Reconstruction Amendments — why the victory of the Civil War led to the failure of Reconstruction",
    overview:
      "The Civil War, which began with the bombardment of Fort Sumter in 1861, was not a mere civil war — it was a second revolution over what America should be. Lincoln at first proclaimed 'preserving the Union' as the war's purpose, but with the Emancipation Proclamation of 1863 he changed its character. The North won and the 13th, 14th, and 15th Amendments passed, but Reconstruction ultimately ended in failure — because the Black Codes, the Ku Klux Klan, and the Compromise of 1877 effectively restored the old order in the South. This lesson examines the war's turning points, the logic of emancipation, and the promise and betrayal of Reconstruction together.",
    objectives: [
      "Analyze the immediate causes of the Civil War's outbreak (Lincoln's 1860 election and Southern secession) and compare the strategic strengths and weaknesses of both sides",
      "Evaluate on multiple levels the legal content and limits of the Emancipation Proclamation (1863) and its strategic and moral significance",
      "Explain the military and psychological reasons the Battle of Gettysburg and Sherman's March to the Sea became turning points of the war",
      "Describe accurately the content of the 13th, 14th, and 15th Amendments and the rights each was meant to guarantee",
      "Critically evaluate the main content of Reconstruction policy and the political and social causes of its ultimate failure",
    ],
    sections: [
      {
        title: "The Turning Points of the War and the Emancipation Proclamation",
        subtitle: "Why the North won, and how the Proclamation was a document more complex than 'emancipation'",
        terms: [
          {
            term: "Emancipation Proclamation (1863)",
            def: "An executive order issued by Lincoln under his wartime powers, declaring the enslaved in the 11 rebelling Southern states 'forever free.' A key limit: it did not apply to the Border States already under Union control or to occupied areas. Its immediate emancipatory effect was limited, but its moral and strategic significance — shifting the war's purpose from 'preserving the Union' to 'abolishing slavery' — was decisive.",
          },
          {
            term: "Battle of Gettysburg (1863)",
            def: "The largest battle of the Civil War, fought over three days (July 1–3) at Gettysburg, Pennsylvania. The defeat of General Lee's invasion of the North permanently ended the South's strategic offensive. After the battle, Lincoln's Gettysburg Address remains a celebrated speech that defined the war as a struggle for the rebirth of democracy.",
          },
          {
            term: "Sherman's March to the Sea (1864)",
            def: "General William Tecumseh Sherman's roughly 500-kilometer advance from Atlanta to Savannah, systematically destroying the South's civilian economy and will to fight. An early example of modern 'total war,' it methodically destroyed not only military installations but railroads, farms, and supplies.",
          },
          {
            term: "Reconstruction Amendments (13th, 14th, 15th)",
            def: "Three amendments added to the Constitution after the war: the 13th (1865) abolished slavery entirely; the 14th (1868) guaranteed citizenship by birth and naturalization, due process, and equal protection of the laws; the 15th (1870) banned restrictions on voting based on race, color, or previous condition of servitude. These became the constitutional basis for the later civil rights movement.",
          },
        ],
        traps: [
          "Writing that the Emancipation Proclamation immediately freed all the enslaved is a clear error. It applied only to the enslaved in states in rebellion and not to those in the Border States that remained in the Union (Kentucky, Missouri, Maryland, Delaware). All enslaved people in America became legally free only after ratification of the 13th Amendment (1865). Always distinguish the Proclamation's actual effect from its symbolic significance.",
          "Do not simply label Reconstruction a 'failure' — to earn Honors marks, you must describe specifically 'why it failed.' Reconstruction legally achieved unprecedented expansions of Black rights (the Reconstruction Amendments, the election of Black legislators), but the weakening of federal enforcement will, the violent resistance of Southern Democrats (the KKK), and the withdrawal of federal troops after the Compromise of 1877 reversed those gains. Frame it around 'the promise was great, but the fulfillment was brief.'",
        ],
        example:
          "Analyze Lincoln's Gettysburg Address sentence by sentence. 'Four score and seven years ago' points to 1776, meaning Lincoln set the nation's founding reference point at the Declaration of Independence (1776), not the Constitution (1787) — a deliberate choice. He built the logic that the Declaration's principle that 'all men are created equal' takes precedence over the slavery compromised in the Constitution. The phrase 'government of the people, by the people, for the people' defines the war's purpose as a struggle not only to abolish slavery but for the very survival of democracy. At just 272 words, it is a compressed work of political philosophy that redefined what America was fighting for.",
      },
      {
        title: "The Promise and Failure of Reconstruction — From 'Freedom' to Jim Crow",
        subtitle: "How the rights guaranteed by the amendments were systematically stripped away",
        terms: [
          {
            term: "Black Codes (1865–1866)",
            def: "Laws enacted by several Southern states immediately after the war, broadly restricting the movement, occupation, contracts, and landownership of officially freed Black people. They were essentially an attempt to recreate slavery's economic structure in the new form of sharecropping, and they triggered the hardline Reconstruction policy of the Radical Republicans.",
          },
          {
            term: "Freedmen's Bureau (1865)",
            def: "An agency established by the federal government to support freed slaves. It attempted education (founding HBCU schools), legal aid, and temporary land distribution ('40 acres and a mule'). It achieved only limited results due to obstruction by President Andrew Johnson and Southern resistance.",
          },
          {
            term: "Compromise of 1877",
            def: "An informal negotiation resolving the disputed 1876 election. Republican Rutherford Hayes became president in exchange for withdrawing federal troops from the South. As a result, Southern Reconstruction governments collapsed and Democrats seized the South, establishing the disenfranchisement of Black voters and the system of Jim Crow laws.",
          },
          {
            term: "Plessy v. Ferguson (1896)",
            def: "The Supreme Court ruling upholding the 'separate but equal' principle as constitutional. By effectively nullifying the equal protection guaranteed by the Reconstruction Amendments itself, this decision became the legal basis sustaining racial segregation until Brown v. Board of Education (1954).",
          },
        ],
        traps: [
          "The early-20th-century, Southern-centric view of history (the Dunning School) that Reconstruction was 'a period when Radical Republicans harshly oppressed the South' has been rejected by current historians. This view was used to justify the KKK and the Black Codes. At the Honors level you must describe in balanced terms both the achievements of the Reconstruction Amendments and governments — Black male suffrage, the expansion of public schools, the election of Black legislators — and how they were reversed by violence and political compromise.",
          "Do not view Plessy v. Ferguson as a 'separate incident' — it is the legal final confirmation of Reconstruction's failure. The 14th Amendment guaranteed 'equal protection of the laws,' but the Court itself reinterpreted that protection as 'separate but equal,' effectively legalizing racial segregation. It is a decisive case showing how the gap between the Constitution and judicial interpretation can strip away civil rights.",
        ],
        example:
          "A structural analysis of Reconstruction's failure reveals three layers. First, the persistence of the economic structure — '40 acres and a mule' never materialized, and most freed slaves remained landless sharecroppers under their old masters, continuing economic dependence. Second, repression through violence — the KKK systematically terrorized Black people and Republican supporters, making voting itself impossible. Third, the withdrawal of federal will — after the Compromise of 1877, when federal troops left the South, the means to stop state-level racial oppression vanished. Because these three forces operated at once, despite the constitutional amendments, Black civil rights remained effectively suspended until the 1960s. The lesson here: 'even if law guarantees rights, without enforcement those rights do not exist.'",
      },
    ],
  },
];
