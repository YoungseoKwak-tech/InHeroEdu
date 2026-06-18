import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 1 — original, official-format items.
 * Reading & Listening are auto-graded MCQ; Speaking & Writing are timed
 * practice tasks. Pools are sized for v1 and the engine is full-spec.
 */

export const TOEFL_FORM_1: ToeflForm = {
  id: "toefl-1",
  title: "TOEFL iBT Practice Test 1",

  // ── READING ───────────────────────────────────────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Domestication of the Horse",
      passage:
`The domestication of the horse roughly 5,500 years ago on the grasslands of Central Asia transformed human societies more profoundly than almost any other animal. Before the horse, people moved goods and themselves on foot or with the help of oxen, which are powerful but slow. The horse offered something new: speed combined with endurance over long distances. A rider could cover in a single day a distance that would take a person on foot the better part of a week.

Archaeologists have long debated when and where horses were first ridden rather than merely eaten. One line of evidence comes from the teeth of ancient horses. When a horse is controlled with a bit—a bar placed in the mouth and attached to reins—the animal habitually chews on it, producing a distinctive pattern of wear on specific teeth. Horse skeletons from the Botai culture of present-day Kazakhstan show exactly this kind of wear, suggesting that these animals were bridled and therefore ridden.

A second line of evidence is more indirect. The settlements of horse-using cultures tend to spread rapidly across wide territories, and their pottery, tools, and burial customs appear over enormous areas in a relatively short time. Such swift cultural expansion is difficult to explain without some efficient means of transportation. The horse, many scholars argue, was the engine of this expansion, carrying not only people and trade goods but also languages and ideas across the steppe.

Not every researcher is convinced that riding came first. Some propose that horses were initially kept for their milk and meat, and that riding developed only later. The tooth-wear evidence, they caution, can sometimes result from natural causes rather than from a bit. Nevertheless, the weight of current evidence favors early riding, and few dispute that, once adopted, the mounted horse reshaped warfare, trade, and the movement of entire peoples.`,
      questions: [
        {
          id: "r1q1",
          prompt: "According to paragraph 1, what advantage did the horse have over the ox?",
          choices: [
            "It could carry heavier loads.",
            "It combined speed with endurance over long distances.",
            "It required less food to maintain.",
            "It was easier to control with a bit.",
          ],
          correct: 1,
          explanation: "Paragraph 1 contrasts oxen (\"powerful but slow\") with the horse, which offered \"speed combined with endurance over long distances.\"",
        },
        {
          id: "r1q2",
          prompt: "The word \"distinctive\" in paragraph 2 is closest in meaning to",
          choices: ["permanent", "characteristic", "accidental", "harmful"],
          correct: 1,
          explanation: "A \"distinctive\" pattern is a characteristic, identifying one — here the recognizable wear a bit leaves on specific teeth.",
        },
        {
          id: "r1q3",
          prompt: "Why does the author mention the Botai culture in paragraph 2?",
          choices: [
            "To give an example of horse skeletons showing bit wear",
            "To show that horses were first eaten rather than ridden",
            "To explain how pottery spread across the steppe",
            "To argue that riding developed very late",
          ],
          correct: 0,
          explanation: "The Botai horses are introduced as concrete evidence: their teeth \"show exactly this kind of wear,\" supporting the claim that they were bridled and ridden.",
        },
        {
          id: "r1q4",
          prompt: "According to paragraph 3, the rapid spread of pottery, tools, and burial customs is used as evidence that",
          choices: [
            "horses were kept mainly for milk and meat",
            "the steppe cultures had no contact with one another",
            "an efficient means of transportation existed",
            "tooth wear was caused by natural processes",
          ],
          correct: 2,
          explanation: "The paragraph says such swift expansion is \"difficult to explain without some efficient means of transportation\" — i.e., the horse.",
        },
        {
          id: "r1q5",
          prompt: "In paragraph 4, the author suggests that the tooth-wear evidence",
          choices: [
            "proves beyond doubt that riding came first",
            "is rejected by nearly all researchers",
            "can occasionally have causes other than a bit",
            "applies only to horses kept for meat",
          ],
          correct: 2,
          explanation: "Skeptics \"caution\" that tooth wear \"can sometimes result from natural causes rather than from a bit.\"",
        },
        {
          id: "r1q6",
          prompt: "Which sentence best expresses the essential information in the highlighted sentence?\n\n\"Such swift cultural expansion is difficult to explain without some efficient means of transportation.\"",
          choices: [
            "Cultures expanded slowly because transportation was inefficient.",
            "The rapid spread of these cultures implies they had efficient transportation.",
            "Transportation had little effect on how cultures expanded.",
            "Efficient transportation prevented cultures from expanding.",
          ],
          correct: 1,
          explanation: "The sentence means the speed of expansion is best explained by efficient transportation — choice B restates that without changing meaning.",
        },
        {
          id: "r1q7",
          prompt: "Prose Summary — Choose the THREE statements that best express the most important ideas of the passage.",
          choices: [
            "Domesticating the horse gave humans fast, long-distance transport that reshaped their societies.",
            "Tooth-wear patterns on ancient horse skeletons provide evidence of early riding.",
            "Oxen were completely useless for moving goods before the horse.",
            "The rapid spread of steppe cultures suggests horses enabled their expansion.",
            "All researchers agree that horses were ridden before they were eaten.",
            "Pottery styles are the only evidence scholars use to study domestication.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "The main ideas are the horse's transformative transport (A), the tooth-wear evidence (B), and the cultural-expansion evidence (D). C, E, and F are either false or minor details.",
        },
      ],
    },
    {
      id: "r2",
      title: "Bioluminescence in the Deep Sea",
      passage:
`In the darkness of the deep ocean, where sunlight never reaches, many organisms produce their own light through a chemical reaction called bioluminescence. The reaction typically involves a light-emitting molecule, luciferin, and an enzyme, luciferase, that speeds the reaction along. When the two combine in the presence of oxygen, energy is released as light rather than heat—an unusually efficient process often described as "cold light."

Bioluminescence serves several functions. For some species, light is a lure. The anglerfish, for instance, dangles a glowing appendage in front of its mouth; smaller animals drawn to the light swim straight toward the predator. For others, light is a defense. Certain shrimp, when threatened, eject a cloud of glowing fluid that startles or distracts an attacker, allowing the shrimp to escape into the dark. Still other species use light to communicate, flashing patterns that help individuals of the same species recognize one another or attract mates.

Because the deep sea is so vast and difficult to explore, scientists once assumed that bioluminescent animals were rare. Modern surveys have overturned that assumption. Studies using cameras lowered thousands of meters below the surface have found that a majority of the animals living in the open ocean's middle depths can produce light. In some samples, the figure exceeds three-quarters of all individuals collected.

The discovery has practical as well as biological significance. The genes responsible for bioluminescence have been adapted by researchers as "reporters" in laboratories: by attaching a luciferase gene to another gene of interest, scientists can make cells glow whenever that gene is active, turning an invisible biological process into a visible signal. In this way, a survival strategy evolved in the lightless deep has become a tool for studying life everywhere.`,
      questions: [
        {
          id: "r2q1",
          prompt: "According to paragraph 1, bioluminescence is described as \"cold light\" because",
          choices: [
            "it is produced only in cold deep water",
            "it releases energy as light rather than as heat",
            "it requires no oxygen to occur",
            "it works only at low temperatures",
          ],
          correct: 1,
          explanation: "The passage says energy \"is released as light rather than heat,\" an efficient process \"often described as 'cold light.'\"",
        },
        {
          id: "r2q2",
          prompt: "The word \"lure\" in paragraph 2 is closest in meaning to",
          choices: ["warning", "attraction", "shelter", "barrier"],
          correct: 1,
          explanation: "A \"lure\" attracts prey; the anglerfish's light draws smaller animals toward it.",
        },
        {
          id: "r2q3",
          prompt: "Which of the following is NOT mentioned in paragraph 2 as a function of bioluminescence?",
          choices: ["Luring prey", "Defending against attackers", "Communicating with others", "Generating heat for warmth"],
          correct: 3,
          explanation: "Paragraph 2 lists luring, defense, and communication. Generating heat is the opposite of the \"cold light\" described earlier.",
        },
        {
          id: "r2q4",
          prompt: "What assumption did scientists once hold, according to paragraph 3?",
          choices: [
            "That bioluminescent animals were rare in the deep sea",
            "That most deep-sea animals could produce light",
            "That cameras could not function at great depths",
            "That bioluminescence served only as a defense",
          ],
          correct: 0,
          explanation: "Scientists \"once assumed that bioluminescent animals were rare\" — an assumption modern surveys overturned.",
        },
        {
          id: "r2q5",
          prompt: "According to paragraph 4, how do researchers use bioluminescence genes in the laboratory?",
          choices: [
            "To make deep-sea animals easier to catch",
            "To produce heat efficiently in cells",
            "To make cells glow when a gene of interest is active",
            "To replace sunlight in growing plants",
          ],
          correct: 2,
          explanation: "By attaching a luciferase gene to another gene, scientists \"make cells glow whenever that gene is active\" — a visible reporter.",
        },
        {
          id: "r2q6",
          prompt: "Insert-text: Where would the following sentence best fit in paragraph 3?\n\n\"The results surprised even experienced marine biologists.\"",
          choices: [
            "Before \"Because the deep sea is so vast...\"",
            "After \"...bioluminescent animals were rare.\"",
            "After \"...exceeds three-quarters of all individuals collected.\"",
            "Before \"Modern surveys have overturned that assumption.\"",
          ],
          correct: 2,
          explanation: "The sentence comments on a surprising finding, so it fits best right after the striking statistic that ends the paragraph (three-quarters of individuals glow).",
        },
        {
          id: "r2q7",
          prompt: "Prose Summary — Choose the THREE statements that best express the most important ideas of the passage.",
          choices: [
            "Bioluminescence is an efficient chemical reaction that produces light with little heat.",
            "Deep-sea organisms use light to lure prey, defend themselves, and communicate.",
            "Anglerfish are the only deep-sea animals that can produce light.",
            "Modern surveys show bioluminescence is widespread, not rare, in the deep sea.",
            "Bioluminescent reactions require very high temperatures to occur.",
            "Luciferase is harmful to the cells of laboratory organisms.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: the efficient reaction (A), its varied functions (B), and its surprising prevalence (D). C, E, and F are false.",
        },
      ],
    },
  ],

  // ── LISTENING (read aloud via SpeechSynthesis) ──────────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Librarian",
      kind: "conversation",
      transcript:
`Student: Hi, I'm hoping you can help me. I'm writing a research paper on urban beekeeping, and I'm having trouble finding recent sources. Everything I pull up is either really old or just news articles.

Librarian: Sure, I can help with that. Have you tried the academic databases rather than the general catalog? News articles show up a lot in a basic search, but the peer-reviewed journals are where you'll find recent studies.

Student: I didn't even know we had separate databases. How do I get to those?

Librarian: From the library homepage, click "Databases A to Z." For a topic like beekeeping, I'd start with the environmental science collection. You can set a filter to show only articles from the last five years.

Student: Oh, that's exactly what I need. Can I access them from home, or do I have to be on campus?

Librarian: You can get in from anywhere—you'll just log in with your student ID the first time. One more tip: when you find a good article, check its reference list. The sources it cites are often perfect for your own paper.

Student: That's a great idea. Thank you so much. I was starting to think I'd have to change my topic.

Librarian: Not at all. Beekeeping's a popular research area right now, so there's plenty out there once you know where to look.`,
      questions: [
        {
          id: "l1q1",
          prompt: "Why does the student go to the library?",
          choices: [
            "To return overdue books",
            "To find recent sources for a research paper",
            "To ask for an extension on an assignment",
            "To change the topic of her paper",
          ],
          correct: 1,
          explanation: "The student says she's writing a paper on urban beekeeping and is \"having trouble finding recent sources.\"",
        },
        {
          id: "l1q2",
          prompt: "What problem does the student have with her current search results?",
          choices: [
            "They are too technical to understand.",
            "They are either old or just news articles.",
            "They are not available from home.",
            "They cost money to access.",
          ],
          correct: 1,
          explanation: "She says everything she finds is \"either really old or just news articles.\"",
        },
        {
          id: "l1q3",
          prompt: "What does the librarian recommend the student use?",
          choices: [
            "The general catalog",
            "Printed reference books",
            "Academic databases with a date filter",
            "Interlibrary loan",
          ],
          correct: 2,
          explanation: "The librarian suggests the academic databases and setting a filter \"to show only articles from the last five years.\"",
        },
        {
          id: "l1q4",
          prompt: "What additional tip does the librarian give about good articles?",
          choices: [
            "To read only the abstract",
            "To check the article's reference list for more sources",
            "To email the author for the full text",
            "To print the articles to read later",
          ],
          correct: 1,
          explanation: "The librarian says to \"check its reference list,\" since the cited sources are often useful for the student's own paper.",
        },
        {
          id: "l1q5",
          prompt: "What can be inferred about accessing the databases from home?",
          choices: [
            "It is not allowed for undergraduates.",
            "It requires the student to log in with her ID.",
            "It is slower than access on campus.",
            "It is only possible during library hours.",
          ],
          correct: 1,
          explanation: "The librarian says she can access them from anywhere, logging in \"with your student ID the first time.\"",
        },
      ],
    },
    {
      id: "l2",
      title: "Lecture: Why Leaves Change Color",
      kind: "lecture",
      transcript:
`Professor: Okay, today let's talk about something you've all seen but maybe never thought about closely—why leaves change color in autumn. Most people assume the leaves "turn" red and yellow, as if a new color is being painted on. But that's not quite what happens.

All through spring and summer, leaves are full of chlorophyll, the pigment that makes them green and that captures sunlight for photosynthesis. What you might not realize is that other pigments are present the whole time, too—yellows and oranges called carotenoids. They're just masked by the much more abundant green chlorophyll.

So what changes in the fall? As the days get shorter and temperatures drop, the tree stops producing chlorophyll and the existing chlorophyll breaks down. Once the green fades, the yellows and oranges that were there all along finally become visible. So in a sense, those colors aren't appearing—they're being revealed.

Now, reds are a different story. Reds come from pigments called anthocyanins, and unlike the carotenoids, these are mostly produced fresh in the fall. There's still some debate about why a tree would invest energy making new pigment in a leaf it's about to drop. One leading idea is that the red acts like sunscreen, protecting the leaf long enough for the tree to reabsorb valuable nutrients before the leaf falls. Trees that pull back more nutrients get a head start the following spring.

So next time you see a brilliant red maple, remember: that yellow underneath was hiding all summer, but the red is brand new, and it may be doing a real job for the tree.`,
      questions: [
        {
          id: "l2q1",
          prompt: "What is the main topic of the lecture?",
          choices: [
            "How trees survive cold winters",
            "The biological reasons leaves change color in autumn",
            "How to identify maple trees",
            "The role of sunlight in photosynthesis",
          ],
          correct: 1,
          explanation: "The professor focuses on \"why leaves change color in autumn\" and the pigments involved.",
        },
        {
          id: "l2q2",
          prompt: "According to the professor, why do leaves look green in summer?",
          choices: [
            "Carotenoids are absent in summer.",
            "Abundant chlorophyll masks the other pigments.",
            "Anthocyanins are produced in large amounts.",
            "The leaves reflect only green sunlight.",
          ],
          correct: 1,
          explanation: "Yellows and oranges are present but \"masked by the much more abundant green chlorophyll.\"",
        },
        {
          id: "l2q3",
          prompt: "Why does the professor say the yellow and orange colors are \"revealed\" rather than \"appearing\"?",
          choices: [
            "Because the tree paints them on in the fall",
            "Because those pigments were present all along and become visible as chlorophyll breaks down",
            "Because they are produced fresh in autumn",
            "Because they come from anthocyanins",
          ],
          correct: 1,
          explanation: "Carotenoids are there the whole time; once the green chlorophyll fades, they \"finally become visible.\"",
        },
        {
          id: "l2q4",
          prompt: "How do red pigments (anthocyanins) differ from the yellow and orange ones?",
          choices: [
            "They are present all summer.",
            "They are mostly produced fresh in the fall.",
            "They capture sunlight for photosynthesis.",
            "They are never visible to the eye.",
          ],
          correct: 1,
          explanation: "\"Unlike the carotenoids, these are mostly produced fresh in the fall.\"",
        },
        {
          id: "l2q5",
          prompt: "What is one leading explanation for why trees make red pigment in autumn?",
          choices: [
            "It speeds up the falling of leaves.",
            "It acts like sunscreen, helping the tree reabsorb nutrients before the leaf drops.",
            "It attracts insects that protect the tree.",
            "It replaces chlorophyll for photosynthesis.",
          ],
          correct: 1,
          explanation: "The professor says the red may act \"like sunscreen,\" protecting the leaf so the tree can reabsorb nutrients first.",
        },
      ],
    },
  ],

  // ── SPEAKING (timed practice) ───────────────────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some students prefer to study alone. Others prefer to study with a group of classmates. Which do you prefer, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Take a clear position in the first sentence, then give two reasons with a concrete example each. Don't try to say everything—depth beats breadth.",
    },
    {
      id: "s2", n: 2, type: "independent",
      prompt: "Do you agree or disagree with the following statement? \"It is better for students to take a part-time job during their studies than to focus only on schoolwork.\" Explain your reasons.",
      prepSec: 15, respSec: 45,
      tip: "Pick one side even if you see both. State it, then defend it with reasons. Use signposting: \"First… Also… For example…\"",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Campus Announcement: The university will close the north parking lot for two months to build a new bike-storage facility. Students who normally park there should use the south lot or the new shuttle from the train station.",
      prompt: "The man expresses his opinion about the announcement. State his opinion and explain the reasons he gives for holding it. (Imagine a conversation in which a male student reacts to this change.)",
      prepSec: 30, respSec: 60,
      tip: "Summarize the announcement in one sentence, then report the speaker's opinion and his two reasons. Use reported speech: \"He thinks… because…\"",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "Lecture summary: A professor explains 'diversification' in ecosystems—how a species that can use several food sources survives environmental change better than a specialist that relies on only one.",
      prompt: "Using the points and examples from the lecture, explain the concept of diversification and how it helps a species survive.",
      prepSec: 20, respSec: 60,
      tip: "Define the term first, then give the lecture's example. Aim for a clear structure: concept → example → why it matters.",
    },
  ],

  // ── WRITING (timed practice) ────────────────────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Some cities have introduced congestion pricing—a fee charged to drivers entering the busy downtown core. Supporters claim three benefits: it reduces traffic jams, it lowers air pollution, and it raises money for public transit.`,
      prompt: "Summarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading. (Imagine a lecture that challenges each of the reading's three claims.)",
      timeSec: 20 * 60,
      targetWords: "150–225 words",
      tip: "Don't give your own opinion. For each reading point, report the lecture's counterpoint: \"While the reading claims X, the lecture argues Y because…\"",
    },
    {
      id: "w2", n: 2, type: "discussion",
      readingText:
`Your professor is teaching a class. Write a post responding to the professor's question. In your response you should express and support your opinion and make a contribution to the discussion.

Professor: As technology advances, some people argue that schools should stop teaching handwriting and focus only on typing. Others believe handwriting still has value. In your opinion, should schools continue to teach handwriting? Why or why not?

(Two classmates have already posted brief opposing views.)`,
      prompt: "Write a response that states your opinion clearly and supports it with reasons and examples, while engaging with the discussion.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "State your position in the first sentence, briefly acknowledge a classmate's view, then give one developed reason with a specific example.",
    },
  ],
};
