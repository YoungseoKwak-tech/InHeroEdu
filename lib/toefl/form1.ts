import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 1 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has a conversation + two lectures with the
 * standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_1: ToeflForm = {
  id: "toefl-1",
  title: "TOEFL iBT Practice Test 1",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Domestication of the Horse",
      passage:
`The domestication of the horse, which occurred roughly 5,500 years ago on the open grasslands of Central Asia, transformed human societies more profoundly than almost any other animal ever has. Before the horse was tamed, people moved themselves and their goods on foot or with the help of oxen. Oxen are powerful and can pull heavy loads, but they are slow and tire quickly over long journeys. The horse offered something genuinely new: a combination of speed and endurance that no domesticated animal had previously provided. A single rider could cover in one day a distance that would take a traveler on foot the better part of a week.

Archaeologists have long debated exactly when and where horses were first ridden rather than merely hunted for meat. The question is difficult because riding, unlike butchery, leaves few obvious traces in the archaeological record. One important line of evidence comes from the teeth of ancient horses. When a horse is controlled with a bit—a bar placed in the animal's mouth and attached to reins—it habitually chews on the bit, and over time this produces a distinctive pattern of wear on certain teeth. Horse skeletons excavated from sites of the Botai culture, in what is now Kazakhstan, show precisely this kind of wear. To many researchers, the wear indicates that the Botai horses were bridled, and therefore ridden, more than five thousand years ago.

A second line of evidence is less direct but equally suggestive. The settlements of horse-using peoples tend to spread across wide territories with remarkable speed. Their distinctive pottery, metal tools, and burial customs appear over enormous distances within a relatively short span of time. Such rapid cultural expansion is difficult to account for without some efficient means of transportation. The horse, many scholars argue, was the engine that drove this expansion, carrying not only people and trade goods but also languages, technologies, and beliefs across the vast open steppe. Some linguists have even connected the spread of an entire family of related languages to the movements of these early horse-riding cultures.

Not every researcher is persuaded that riding came first. A minority view holds that horses were initially kept primarily for their milk and meat, and that riding developed only considerably later. These skeptics point out that the tooth-wear evidence, although suggestive, is not decisive: similar wear can occasionally result from a horse's natural chewing behavior rather than from a metal bit. They also note that the remains of corrals and large quantities of horse bones at Botai sites are equally consistent with herding animals for food. Riding, in their view, may have been a secondary development that left the more dramatic mark on history only much later.

Whatever the precise sequence, the long-term consequences of the partnership between humans and horses are not in dispute. Once mounted horses became widespread, they reshaped warfare, allowing armies to strike swiftly and retreat before an enemy could respond. They revolutionized trade by linking distant communities that had previously had little contact. And they accelerated the movement of entire peoples across continents. For thousands of years, until the arrival of the railway and the automobile, the horse remained the fastest reliable means of overland travel available to human beings—a single domestication event whose effects rippled through nearly every later chapter of human history.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what advantage did the horse have over the ox?",
          choices: [
            "It could pull much heavier loads.",
            "It combined speed with endurance over long distances.",
            "It required far less food to keep healthy.",
            "It was easier to control with a bit.",
          ],
          correct: 1,
          explanation: "Paragraph 1 contrasts oxen (\"powerful\" but \"slow\" and tiring) with the horse, which offered \"a combination of speed and endurance.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"distinctive\" in paragraph 2 is closest in meaning to",
          choices: ["permanent", "characteristic", "accidental", "harmful"],
          correct: 1,
          explanation: "A \"distinctive\" pattern is a characteristic, identifying one — the recognizable wear a bit leaves on specific teeth.",
        },
        {
          id: "r1q3", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention the Botai culture in paragraph 2?",
          choices: [
            "To provide a concrete example of horse skeletons showing bit wear",
            "To prove that horses were first kept only for their meat",
            "To explain how pottery styles spread across the steppe",
            "To argue that riding developed thousands of years too late",
          ],
          correct: 0,
          explanation: "The Botai horses are introduced as concrete evidence: their teeth \"show precisely this kind of wear,\" supporting the claim that they were bridled and ridden.",
        },
        {
          id: "r1q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, the rapid spread of pottery, tools, and burial customs is used as evidence that",
          choices: [
            "horses were kept mainly for milk and meat",
            "the steppe peoples had almost no contact with one another",
            "an efficient means of transportation must have existed",
            "tooth wear was caused by natural chewing",
          ],
          correct: 2,
          explanation: "The paragraph says such rapid expansion is \"difficult to account for without some efficient means of transportation\" — the horse.",
        },
        {
          id: "r1q5", qtype: "Inference",
          prompt: "What can be inferred from paragraph 3 about early horse-riding cultures?",
          choices: [
            "They deliberately avoided trading with distant groups.",
            "Their influence may have extended even to the spread of languages.",
            "They left no physical traces of their settlements.",
            "They were unable to travel beyond the steppe.",
          ],
          correct: 1,
          explanation: "The paragraph notes that some linguists \"connected the spread of an entire family of related languages\" to these cultures' movements, implying linguistic influence.",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"Such rapid cultural expansion is difficult to account for without some efficient means of transportation.\"",
          choices: [
            "Cultures expanded slowly because their transportation was inefficient.",
            "The speed of these cultures' expansion is best explained by efficient transportation.",
            "Transportation had very little effect on how these cultures expanded.",
            "Efficient transportation actually prevented these cultures from expanding.",
          ],
          correct: 1,
          explanation: "The sentence means the speed of expansion implies efficient transportation. Choice B restates this without changing the meaning.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 4, skeptics argue that the tooth-wear evidence",
          choices: [
            "proves beyond doubt that riding came before herding",
            "is rejected by nearly every archaeologist",
            "is suggestive but not decisive, since natural chewing can cause similar wear",
            "applies only to horses that were never kept for food",
          ],
          correct: 2,
          explanation: "Skeptics say the wear \"is not decisive,\" because \"similar wear can occasionally result from a horse's natural chewing behavior rather than from a metal bit.\"",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 4, all of the following are cited by skeptics EXCEPT:",
          choices: [
            "Tooth wear can come from natural chewing.",
            "Corrals at Botai sites fit the idea of herding for food.",
            "Large quantities of horse bones suggest the animals were eaten.",
            "Written records describe early riders in detail.",
          ],
          correct: 3,
          explanation: "The skeptics cite natural chewing, corrals, and bone quantities. There is no mention of written records (the passage stresses how little riding leaves behind).",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"No other animal gave its riders such a decisive advantage in speed.\"",
          choices: [
            "Before \"Once mounted horses became widespread...\"",
            "After \"...strike swiftly and retreat before an enemy could respond.\"",
            "After \"...linking distant communities that had previously had little contact.\"",
            "Before \"For thousands of years, until the arrival of the railway...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence about a speed advantage fits best right after the description of armies striking swiftly and retreating — the clearest example of that advantage.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"The domestication of the horse had far-reaching effects on human history.\"",
          choices: [
            "Domesticating the horse gave humans fast, long-distance transport that transformed their societies.",
            "Tooth-wear patterns and rapid cultural spread are the main evidence used to study early riding.",
            "Oxen were entirely useless for moving goods before horses were tamed.",
            "Some researchers argue horses were first kept for food, with riding developing later.",
            "Pottery styles are the only evidence scholars use to study horse domestication.",
            "Horses lost all importance as soon as the first railways were built.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "The key ideas are the horse's transformative transport (A), the two main lines of evidence (B), and the skeptical 'food first' view (D). C, E, and F are false or overstated.",
        },
      ],
    },
    {
      id: "r2",
      title: "Bioluminescence in the Deep Sea",
      passage:
`In the perpetual darkness of the deep ocean, where sunlight never penetrates, a surprising number of organisms produce their own light through a chemical reaction known as bioluminescence. The reaction generally involves a light-emitting molecule called luciferin and an enzyme called luciferase, which speeds the reaction along. When luciferin and luciferase combine in the presence of oxygen, the energy released takes the form of light rather than heat. This makes bioluminescence an unusually efficient process, and it is often described as "cold light" because almost none of the energy is wasted as warmth.

Bioluminescence serves several distinct functions among deep-sea creatures. For some species, light is a lure used to capture prey. The deep-sea anglerfish, for example, dangles a glowing appendage in front of its enormous mouth; smaller animals, attracted to the rare point of light in the darkness, swim directly toward the waiting predator. For other species, light is a means of defense. Certain shrimp, when threatened, eject a cloud of glowing fluid that startles or confuses an attacker, giving the shrimp a precious moment to dart away into the surrounding blackness. Still other species use light to communicate, producing flashes in particular patterns that allow individuals of the same species to recognize one another or to attract mates.

Because the deep sea is so vast and so difficult to reach, scientists once assumed that bioluminescent animals were comparatively rare. Modern surveys have decisively overturned that assumption. Studies that lower sensitive cameras thousands of meters below the surface have revealed that a majority of the animals living in the open ocean's middle depths are capable of producing light. In some samples, more than three-quarters of all the individuals collected can bioluminesce. The results have surprised even experienced marine biologists, who had not expected the ability to be so nearly universal.

The discovery has significance well beyond the biology of the deep sea. The genes responsible for bioluminescence have been adapted by researchers as "reporters" in the laboratory. By attaching a luciferase gene to another gene whose activity they wish to track, scientists can make cells glow whenever that gene is switched on. An otherwise invisible biological process is thereby turned into a visible signal that can be measured precisely. This technique has become a standard tool in fields ranging from cancer research to the study of how the brain works.

Bioluminescence also poses an evolutionary puzzle. The ability has arisen independently many times across very different and only distantly related groups of organisms—fishes, shrimp, squid, jellyfish, and bacteria among them. When a trait evolves repeatedly in unrelated lineages, biologists infer that it must confer a substantial advantage; otherwise, natural selection would be unlikely to favor it again and again. The repeated, independent origins of bioluminescence therefore suggest that, in the lightless environment of the deep sea, the ability to make light is not a rare curiosity but a powerful survival strategy. In this way, a phenomenon born in the darkest places on Earth has illuminated questions across the whole of biology.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, bioluminescence is called \"cold light\" because",
          choices: [
            "it is produced only in very cold deep water",
            "almost none of the energy is wasted as heat",
            "it can occur without any oxygen present",
            "it works only at low temperatures",
          ],
          correct: 1,
          explanation: "The passage says the energy is released as light rather than heat, so \"almost none of the energy is wasted as warmth\" — hence \"cold light.\"",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The word \"lure\" in paragraph 2 is closest in meaning to",
          choices: ["warning", "attraction", "shelter", "barrier"],
          correct: 1,
          explanation: "A \"lure\" attracts prey; the anglerfish's light draws smaller animals toward its mouth.",
        },
        {
          id: "r2q3", qtype: "Negative Factual Information",
          prompt: "According to paragraph 2, which of the following is NOT mentioned as a function of bioluminescence?",
          choices: ["Luring prey", "Defending against attackers", "Communicating with others", "Generating heat for warmth"],
          correct: 3,
          explanation: "Paragraph 2 lists luring, defense, and communication. Generating heat contradicts the \"cold light\" described in paragraph 1.",
        },
        {
          id: "r2q4", qtype: "Detail",
          prompt: "According to paragraph 2, how do certain shrimp use bioluminescence?",
          choices: [
            "They glow steadily to attract mates.",
            "They eject a cloud of glowing fluid to confuse attackers.",
            "They light up the seafloor to find food.",
            "They flash to warn other shrimp of danger.",
          ],
          correct: 1,
          explanation: "When threatened, the shrimp \"eject a cloud of glowing fluid that startles or confuses an attacker,\" allowing escape.",
        },
        {
          id: "r2q5", qtype: "Factual Information",
          prompt: "What assumption did scientists once hold, according to paragraph 3?",
          choices: [
            "That bioluminescent animals were relatively rare in the deep sea",
            "That most deep-sea animals could produce light",
            "That cameras could not function at great depths",
            "That bioluminescence served only as a defense",
          ],
          correct: 0,
          explanation: "Scientists \"once assumed that bioluminescent animals were comparatively rare\" — an assumption modern surveys overturned.",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention cancer research and the study of the brain in paragraph 4?",
          choices: [
            "To show that bioluminescence is dangerous to humans",
            "To give examples of fields that use bioluminescence genes as a tool",
            "To argue that deep-sea animals should be protected",
            "To explain how luciferin is manufactured",
          ],
          correct: 1,
          explanation: "These fields are offered as examples of where the luciferase \"reporter\" technique \"has become a standard tool.\"",
        },
        {
          id: "r2q7", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"When a trait evolves repeatedly in unrelated lineages, biologists infer that it must confer a substantial advantage.\"",
          choices: [
            "Traits that evolve once are usually more advantageous than traits that evolve often.",
            "Biologists conclude a trait is very useful when it evolves again and again in unrelated groups.",
            "Unrelated organisms rarely share any of the same traits.",
            "A trait that provides no advantage will still evolve repeatedly.",
          ],
          correct: 1,
          explanation: "The sentence means repeated independent evolution signals a strong advantage. Choice B restates that faithfully.",
        },
        {
          id: "r2q8", qtype: "Inference",
          prompt: "What can be inferred from paragraph 5 about bioluminescence in the deep sea?",
          choices: [
            "It is a rare accident that provides little benefit.",
            "It is so useful that it has evolved many separate times.",
            "It is found only in a single group of closely related animals.",
            "It has no measurable effect on an organism's survival.",
          ],
          correct: 1,
          explanation: "Because the ability \"has arisen independently many times,\" biologists infer it confers a substantial advantage — a powerful survival strategy.",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 3?\n\n\"In other words, the ability is the rule rather than the exception.\"",
          choices: [
            "Before \"Because the deep sea is so vast...\"",
            "After \"...bioluminescent animals were comparatively rare.\"",
            "After \"...more than three-quarters of all the individuals collected can bioluminesce.\"",
            "Before \"Modern surveys have decisively overturned that assumption.\"",
          ],
          correct: 2,
          explanation: "The inserted sentence restates the striking statistic that most individuals glow, so it fits best right after that figure.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Bioluminescence is widespread in the deep sea and important to science.\"",
          choices: [
            "Bioluminescence is an efficient reaction that releases energy as light with little heat.",
            "Deep-sea organisms use light to lure prey, defend themselves, and communicate.",
            "Anglerfish are the only deep-sea animals able to produce light.",
            "Surveys show the ability is common, and its repeated evolution implies a strong advantage.",
            "Bioluminescent reactions require very high temperatures to occur.",
            "Luciferase damages the cells of laboratory organisms.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: the efficient reaction (A), its varied functions (B), and its prevalence/repeated evolution (D). C, E, and F are false.",
        },
      ],
    },
  ],

  // ── LISTENING (conversation + two lectures) ────────────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Librarian",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a librarian.

Student: Hi, I'm hoping you can help me out. I'm writing a research paper on urban beekeeping—you know, keeping bees on city rooftops and in community gardens—and I'm really struggling to find good sources. Everything that comes up is either decades old or just newspaper articles.

Librarian: Okay, that's a common problem. Can I ask—are you searching the general library catalog, or the academic databases?

Student: Um, just the catalog, I think. Whatever comes up on the main search bar on the homepage.

Librarian: That explains it. The main search bar pulls from a lot of sources, including news, so the popular articles tend to crowd out the scholarly research. For a topic like beekeeping, you'll want the peer-reviewed journals, and those live in the subject databases.

Student: I didn't even know we had separate databases. How do I get to them?

Librarian: From the homepage, click "Databases A to Z." For an environmental topic, I'd start with the environmental science collection. And here's the key part—once you're in, set the filter to show only the last five years. That alone will fix the "everything is old" problem.

Student: Oh, that's exactly what I need. Can I get into those from my apartment, or do I have to come to the library?

Librarian: You can access them from anywhere. The first time, you'll just log in with your student ID, and after that it remembers you. One more tip: when you find a really good article, scroll down to its reference list. The sources that article cites are often perfect for your own paper, and it saves you a ton of searching.

Student: That's brilliant. Honestly, I was starting to think I'd have to switch topics entirely.

Librarian: Oh, definitely not. Urban beekeeping is actually a hot research area right now—there's plenty out there once you're looking in the right place. If you get stuck, just come back and ask for me.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What are the speakers mainly discussing?",
          choices: [
            "How the student can find recent scholarly sources for a paper",
            "Why the student should change her research topic",
            "How to renew an overdue library book",
            "The history of urban beekeeping in the city",
          ],
          correct: 0,
          explanation: "The whole conversation is about helping the student find better, more recent sources for her beekeeping paper.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "Why are the student's current search results unsatisfactory?",
          choices: [
            "They are too advanced for her to understand.",
            "They are either very old or only newspaper articles.",
            "They are written in a foreign language.",
            "They are available only inside the library building.",
          ],
          correct: 1,
          explanation: "She says everything is \"either decades old or just newspaper articles.\"",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the librarian recommend the student do to find recent research?",
          choices: [
            "Use the main search bar more carefully",
            "Use the subject databases and filter to the last five years",
            "Borrow printed journals from the reference desk",
            "Request articles through interlibrary loan",
          ],
          correct: 1,
          explanation: "The librarian tells her to use the \"Databases A to Z,\" choose the environmental science collection, and \"set the filter to show only the last five years.\"",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "Why does the librarian suggest looking at an article's reference list?",
          choices: [
            "To check whether the article is too old to use",
            "Because the cited sources are often useful for the student's own paper",
            "To make sure the student is allowed to access the article",
            "Because the references explain how to log in from home",
          ],
          correct: 1,
          explanation: "The librarian says the sources an article cites \"are often perfect for your own paper, and it saves you a ton of searching.\"",
        },
        {
          id: "l1q5", qtype: "Inference",
          prompt: "What can be inferred about accessing the databases from off campus?",
          choices: [
            "It is not permitted for undergraduate students.",
            "It requires logging in with a student ID the first time.",
            "It is noticeably slower than access inside the library.",
            "It is possible only during the library's open hours.",
          ],
          correct: 1,
          explanation: "The librarian says access works from anywhere; \"the first time, you'll just log in with your student ID.\"",
        },
      ],
    },
    {
      id: "l2",
      title: "Lecture: Why Leaves Change Color (Biology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a biology class.

Professor: Alright, today I want to talk about something every one of you has seen, but probably never thought about in any detail—why leaves change color in the fall. Now, most people describe it as the leaves "turning" red and yellow, as if some new color is being painted onto them. But that picture is mostly wrong, and unpacking why is going to teach us something about how plants actually work.

So let's start in the summer. All spring and summer, a leaf is packed with chlorophyll. Chlorophyll is the pigment that makes the leaf green, and—much more importantly—it's the molecule that captures sunlight to drive photosynthesis. Now here's the part students are usually surprised by: the yellow and orange pigments, which we call carotenoids, are in the leaf the whole time, all summer long. You just can't see them, because there's so much green chlorophyll that it overwhelms them visually.

So what actually happens in autumn? As the days get shorter and the nights get colder, the tree essentially makes a decision to shut the leaf down. It stops producing new chlorophyll, and the chlorophyll that's already there begins to break down and disappear. And once that dominant green fades away, the yellows and oranges that were present all along finally become visible. So notice—those colors aren't appearing. They're being revealed. Big difference.

Now, red is a completely different story, and this is where it gets interesting. The reds and purples come from a group of pigments called anthocyanins. And unlike the carotenoids, anthocyanins are not sitting in the leaf all summer. They are manufactured fresh, right at the end, in the fall. Which raises an obvious question: why would a tree spend precious energy building a brand-new pigment in a leaf it is literally about to drop? That seems wasteful.

Well, there's still genuine debate about this, but the leading hypothesis is that the red pigment acts something like sunscreen. On bright, cold autumn days, the leaf is still trying to pull valuable nutrients—especially nitrogen—back into the tree before it falls. But strong sunlight can damage the leaf and interrupt that process. The red anthocyanins may shield the leaf just long enough for the tree to finish reclaiming those nutrients. And here's the payoff: a tree that recovers more nutrients in the fall gets a head start the following spring.

So, to summarize—next time you see a brilliant red maple, remember two things. The yellow underneath was hiding there all summer. But the red is brand new, and it may be doing a real, measurable job for the tree.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How trees survive freezing winter temperatures",
            "The biological reasons leaves change color in autumn",
            "How to tell different species of trees apart",
            "The discovery of the pigment chlorophyll",
          ],
          correct: 1,
          explanation: "The professor focuses throughout on why leaves change color in the fall and the pigments responsible.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "According to the professor, why do leaves look green in summer?",
          choices: [
            "Carotenoids are completely absent until autumn.",
            "Abundant chlorophyll visually overwhelms the other pigments.",
            "Anthocyanins are produced in very large amounts.",
            "The leaf reflects only the green part of sunlight.",
          ],
          correct: 1,
          explanation: "The yellows and oranges are present all summer, but \"there's so much green chlorophyll that it overwhelms them visually.\"",
        },
        {
          id: "l2q3", qtype: "Function",
          prompt: "Why does the professor emphasize that the yellow colors are \"revealed\" rather than \"appearing\"?",
          choices: [
            "To stress that the tree paints on new color in the fall",
            "To make the point that those pigments were present all along and only become visible",
            "To show that yellow pigments are produced fresh in autumn",
            "To argue that the yellow colors come from anthocyanins",
          ],
          correct: 1,
          explanation: "He distinguishes the words to highlight that carotenoids don't newly appear; they were there and become visible as chlorophyll fades.",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "How do red pigments (anthocyanins) differ from the yellow and orange ones?",
          choices: [
            "They are present in the leaf all summer.",
            "They are manufactured fresh in the leaf in the fall.",
            "They capture sunlight to drive photosynthesis.",
            "They are never actually visible to the human eye.",
          ],
          correct: 1,
          explanation: "Unlike carotenoids, anthocyanins \"are manufactured fresh, right at the end, in the fall.\"",
        },
        {
          id: "l2q5", qtype: "Detail",
          prompt: "What is the leading hypothesis for why trees produce red pigment in autumn?",
          choices: [
            "It speeds up the falling of the leaves.",
            "It acts like sunscreen, helping the tree reclaim nutrients before the leaf drops.",
            "It attracts insects that protect the tree from disease.",
            "It replaces chlorophyll so photosynthesis can continue.",
          ],
          correct: 1,
          explanation: "The professor says the leading idea is that the red acts \"something like sunscreen,\" shielding the leaf so the tree can reclaim nutrients such as nitrogen.",
        },
        {
          id: "l2q6", qtype: "Inference",
          prompt: "What does the professor imply is the benefit to a tree that reclaims more nutrients in the fall?",
          choices: [
            "It will grow taller than other trees in summer.",
            "It gets a head start the following spring.",
            "It will keep its leaves longer into winter.",
            "It produces brighter red leaves the next year.",
          ],
          correct: 1,
          explanation: "He states the payoff directly: \"a tree that recovers more nutrients in the fall gets a head start the following spring.\"",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: The Mystery of Cave Paintings (Art History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an art history class.

Professor: So we've been talking about early human art, and today I want to focus on the cave paintings of Western Europe—places like Lascaux in France and Altamira in Spain. These paintings are old. We're talking roughly 15,000 to 30,000 years old, made by Ice Age hunter-gatherers. And when you actually see images of them, the first reaction most people have is surprise at how sophisticated they are. These aren't crude stick figures. They're large, dynamic animals—horses, bison, deer—drawn with real skill, real attention to movement and anatomy.

Now, the big question art historians keep returning to is simply: why? Why did people go to such enormous effort to make these images? And I want to walk you through three of the main hypotheses, because honestly, none of them is fully proven.

The first idea is what we might call "hunting magic." Notice that the animals depicted are very often the large game animals these people hunted. So one theory is that painting an animal was a kind of ritual—an attempt to gain power over it, to ensure a successful hunt. Here's a piece of evidence that's often cited: some of the painted animals appear to have marks on them that look like spears or wounds. That fits the hunting-magic idea pretty well.

But—and this is important—there's a problem with that theory. When researchers actually analyzed the animal bones found in these caves, the bones don't match the paintings. At Lascaux, for example, the people were mostly eating reindeer. But reindeer are almost absent from the walls. If this were purely about hunting magic, you'd expect them to paint what they ate. So that's a real complication.

The second hypothesis is that the paintings had a religious or shamanic purpose. The locations support this. Many of these images are not near the cave entrances, where people actually lived. They're deep inside, in chambers that are hard to reach, sometimes requiring you to crawl through narrow passages in total darkness. That's a strange place to put decoration. So some scholars argue these were sacred spaces, used for rituals or for contacting a spirit world.

And the third hypothesis is about communication—that the paintings recorded information. Maybe they were teaching tools, showing younger members of the group which animals to hunt and how they behaved. Or maybe they marked territory, or recorded important events.

So where does that leave us? Frankly, the honest answer is that we don't know for certain, and we may never know. These artists left us no written explanation. But the very fact that people, tens of thousands of years ago, repeatedly traveled deep underground to create careful, beautiful images—that tells us something profound about the human need to make art.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How prehistoric paints were chemically produced",
            "Competing explanations for why Ice Age people made cave paintings",
            "The discovery of the Lascaux cave by modern explorers",
            "Differences between French and Spanish cave art",
          ],
          correct: 1,
          explanation: "The professor presents three main hypotheses for why the paintings were made and weighs the evidence for each.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "What evidence is cited in support of the \"hunting magic\" hypothesis?",
          choices: [
            "The caves are located near hunting grounds.",
            "Some painted animals appear to have spear or wound marks.",
            "Reindeer bones were found throughout the caves.",
            "The paintings are near the cave entrances.",
          ],
          correct: 1,
          explanation: "The professor notes that some animals \"appear to have marks on them that look like spears or wounds,\" fitting hunting magic.",
        },
        {
          id: "l3q3", qtype: "Organization",
          prompt: "Why does the professor mention the reindeer bones found at Lascaux?",
          choices: [
            "To prove the hunting-magic theory is correct",
            "To point out a problem with the hunting-magic theory",
            "To show that the painters were skilled hunters",
            "To explain why the caves were abandoned",
          ],
          correct: 1,
          explanation: "The people mostly ate reindeer, yet reindeer are almost absent from the walls — a complication for the hunting-magic idea.",
        },
        {
          id: "l3q4", qtype: "Detail",
          prompt: "What feature of the paintings' locations supports the religious or shamanic hypothesis?",
          choices: [
            "Many images are deep inside hard-to-reach chambers, not where people lived.",
            "Most images are painted near sources of water.",
            "The images are arranged in straight rows like writing.",
            "The images are all found close to cave entrances.",
          ],
          correct: 0,
          explanation: "The professor says many images are \"deep inside, in chambers that are hard to reach\" — a strange spot for mere decoration, suggesting sacred use.",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "According to the lecture, what is one version of the \"communication\" hypothesis?",
          choices: [
            "The paintings were signatures of individual artists.",
            "The paintings were teaching tools about which animals to hunt.",
            "The paintings were used to predict the weather.",
            "The paintings were created to decorate living spaces.",
          ],
          correct: 1,
          explanation: "One version is that the paintings were \"teaching tools, showing younger members of the group which animals to hunt and how they behaved.\"",
        },
        {
          id: "l3q6", qtype: "Attitude",
          prompt: "What is the professor's attitude toward the three hypotheses?",
          choices: [
            "He is certain the shamanic hypothesis is correct.",
            "He believes none of them has been fully proven.",
            "He rejects all three as unscientific.",
            "He thinks the question is unimportant.",
          ],
          correct: 1,
          explanation: "He repeatedly stresses uncertainty — \"none of them is fully proven\" and \"we don't know for certain, and we may never know.\"",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some students prefer to study alone. Others prefer to study with a group of classmates. Which do you prefer, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your preference in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — The university will close the north parking lot for two months to build a new bike-storage facility. Students who normally park there should use the south lot or the new shuttle from the train station.\n\n[Then you hear two students discussing the change. The man disagrees with the plan.]",
      prompt: "The man expresses his opinion about the announcement. State his opinion and explain the reasons he gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the man's opinion and his TWO reasons using reported speech: \"He thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines 'diminishing returns' — the principle that after a certain point, adding more of one input (such as study hours) yields smaller and smaller improvements in the result.\n\n[Then you hear a professor give an example from a study on student test scores.]",
      prompt: "Using the example from the lecture, explain the concept of diminishing returns.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains 'diversification' in ecosystems: how a species that can use several different food sources survives environmental change better than a specialist that depends on only one source. The lecture gives two contrasting animal examples.",
      prompt: "Using the points and examples from the lecture, explain how diversification helps a species survive.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general concept, then give BOTH examples from the lecture and contrast them (generalist vs. specialist).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Some cities have introduced "congestion pricing" — a fee charged to drivers who enter the busy downtown core during peak hours. Supporters make three claims in its favor:

1. It reduces traffic jams by discouraging unnecessary trips.
2. It lowers air pollution because fewer cars idle in the city center.
3. It raises money that can be invested in public transportation.

[Then you would hear a lecture in which the professor challenges each of these three points.]`,
      prompt: "Summarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading.",
      timeSec: 20 * 60,
      targetWords: "150–225 words",
      tip: "Integrated Writing: 20 min, 150–225 words. Do NOT give your own opinion. For each of the three reading points, report the lecture's counterpoint: \"While the reading claims X, the lecture argues Y because…\". Use all three.",
    },
    {
      id: "w2", n: 2, type: "discussion",
      readingText:
`Your professor is teaching a class and has posted a question. In your response you should express and support your own opinion and make a contribution to the discussion.

Professor: As technology advances, some people argue that schools should stop teaching handwriting and focus only on typing. Others believe handwriting still has educational value. In your opinion, should schools continue to teach handwriting? Why or why not?

Kelly (classmate): I think handwriting is outdated. Almost everything is typed now, so class time would be better spent on digital skills.

Andrew (classmate): I disagree — research suggests writing by hand can help students remember and understand material better.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
