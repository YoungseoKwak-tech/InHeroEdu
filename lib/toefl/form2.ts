import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 2 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has a conversation + two lectures with the
 * standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_2: ToeflForm = {
  id: "toefl-2",
  title: "TOEFL iBT Practice Test 2",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Invention of Paper",
      passage:
`For most of human history, the materials people used to record their words were heavy, scarce, or expensive. The clay tablets of ancient Mesopotamia were durable but bulky, while the papyrus of Egypt depended on a single plant that grew only along the Nile. In Europe, important documents were written on parchment, a writing surface made from treated animal skin; a single large book could require the hides of an entire herd. Against this background, the invention of paper in China stands out as one of the quietly revolutionary achievements of the ancient world, for it offered a writing surface that was light, cheap, and capable of being produced almost anywhere.

Tradition credits the invention to a court official named Cai Lun, who is said to have presented the new material to the Chinese emperor around the year 105. Modern archaeology has complicated this neat story. Fragments of paper older than Cai Lun have been recovered from several sites, which suggests that he did not invent paper out of nothing. What he most likely did was refine and standardize an existing craft, improving the recipe and demonstrating its value so convincingly that production spread rapidly. Whether inventor or improver, Cai Lun became the figure to whom later generations attached the achievement.

The process he helped popularize was ingenious in its simplicity. Plant fibers—from materials such as mulberry bark, hemp, and old rags—were soaked and beaten into a wet pulp. This pulp was suspended in water, and a screen was dipped into the mixture and lifted out, catching a thin, even layer of fiber across its surface. The wet sheet was then pressed to remove water and left to dry. The raw materials were abundant and inexpensive, and the equipment was modest. As a result, paper could be made in large quantities at a fraction of the cost of parchment, putting the written word within reach of far more people than before.

For several centuries the Chinese guarded the technique closely, and paper remained largely an East Asian product. Its spread westward was gradual and, according to one famous account, accidental. In the eighth century, a conflict between Chinese forces and an expanding Islamic empire is said to have resulted in the capture of soldiers who knew how to make paper. Whatever the precise mechanism, papermaking soon took root in the cities of Central Asia and the Middle East, where skilled artisans adapted the craft to local materials. From there it traveled along trade routes into the Mediterranean world, reaching Europe by way of Spain and Italy several hundred years later.

The arrival of paper in Europe set the stage for a transformation whose full force would not be felt until the fifteenth century. When the printing press with movable type came into use, it required a writing surface that was both cheap and available in enormous quantities. Parchment could never have met that demand; there were simply not enough animals. Paper could. The two technologies—paper and the press—reinforced each other, and together they made the mass production of books possible for the first time. Knowledge that had once been locked inside a handful of costly manuscripts began to circulate widely, fueling movements in religion, science, and education across the continent.

Seen in this light, paper is far more than a convenient surface for writing. It was an enabling technology, one whose true importance lay in what it made possible. By driving down the cost of recording and sharing information, it loosened the grip of the few who had previously controlled written knowledge. The unassuming sheet, beaten from bark and rags in a Chinese workshop two thousand years ago, became one of the foundations on which the modern world of widely shared information was eventually built.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what was a disadvantage of parchment?",
          choices: [
            "It could be produced only along the Nile.",
            "It was too fragile to survive for long.",
            "Making a single large book could require many animal hides.",
            "It could be written on only with special ink.",
          ],
          correct: 2,
          explanation: "Paragraph 1 says parchment was made from animal skin and that \"a single large book could require the hides of an entire herd.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"refine\" in paragraph 2 is closest in meaning to",
          choices: ["invent from nothing", "improve", "abandon", "conceal"],
          correct: 1,
          explanation: "Cai Lun \"refine[d] and standardize[d] an existing craft, improving the recipe\" — to refine here means to improve.",
        },
        {
          id: "r1q3", qtype: "Inference",
          prompt: "What can be inferred from paragraph 2 about Cai Lun?",
          choices: [
            "He was the first person ever to make paper of any kind.",
            "He probably built on a craft that already existed before him.",
            "He kept his recipe secret from the emperor.",
            "He worked entirely outside the Chinese court.",
          ],
          correct: 1,
          explanation: "Paper fragments older than Cai Lun show \"he did not invent paper out of nothing\"; he most likely refined an existing craft.",
        },
        {
          id: "r1q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, why could paper be made so cheaply?",
          choices: [
            "Its raw materials were abundant and the equipment was modest.",
            "It required rare plants found only in China.",
            "It was produced only by highly trained court officials.",
            "It used the same animal skins as parchment.",
          ],
          correct: 0,
          explanation: "The paragraph states \"the raw materials were abundant and inexpensive, and the equipment was modest,\" so paper cost a fraction of parchment.",
        },
        {
          id: "r1q5", qtype: "Rhetorical Purpose",
          prompt: "Why does the author describe the papermaking process in paragraph 3?",
          choices: [
            "To prove that Cai Lun personally invented every step",
            "To show how simple and inexpensive the method was",
            "To argue that the process was too difficult for most people",
            "To explain why paper was kept secret for centuries",
          ],
          correct: 1,
          explanation: "The process is called \"ingenious in its simplicity,\" and the details show why paper could be produced cheaply and in quantity.",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"The two technologies—paper and the press—reinforced each other, and together they made the mass production of books possible for the first time.\"",
          choices: [
            "Paper and the press worked against each other, slowing book production.",
            "Paper and the press strengthened each other, together enabling books to be mass-produced.",
            "The press alone, without paper, made mass book production possible.",
            "Books had already been mass-produced long before paper or the press existed.",
          ],
          correct: 1,
          explanation: "The sentence says the two technologies reinforced each other and together first enabled mass book production. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 5, why was paper, rather than parchment, suited to the printing press?",
          choices: [
            "Parchment could not hold printed ink.",
            "There were not enough animals to supply parchment in the needed quantities.",
            "The press could physically use only paper.",
            "Parchment was illegal to use in printed books.",
          ],
          correct: 1,
          explanation: "The passage says parchment \"could never have met that demand; there were simply not enough animals,\" whereas paper could.",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 4, all of the following are mentioned about the spread of papermaking EXCEPT:",
          choices: [
            "The Chinese guarded the technique closely for centuries.",
            "It took root in Central Asia and the Middle East.",
            "It reached Europe through Spain and Italy.",
            "European monks independently invented it without Asian influence.",
          ],
          correct: 3,
          explanation: "The paragraph traces the craft from China through Central Asia and the Middle East into Europe; it never claims Europeans invented it independently.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"Suddenly, copies that once took a scribe months to produce could be printed in a matter of days.\"",
          choices: [
            "Before \"The arrival of paper in Europe set the stage...\"",
            "After \"...made the mass production of books possible for the first time.\"",
            "Before \"Parchment could never have met that demand...\"",
            "After \"...came into use, it required a writing surface...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence about copies being printed quickly elaborates on the claim that the two technologies made mass production possible, so it fits right after that statement.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"The invention of paper in China had far-reaching effects on the recording and sharing of knowledge.\"",
          choices: [
            "Paper offered a writing surface that was light, cheap, and producible almost anywhere.",
            "Papermaking gradually spread from China westward, eventually reaching Europe.",
            "Paper combined with the printing press to make the mass production of books possible.",
            "Cai Lun personally invented paper with no earlier craft to build on.",
            "Parchment remained cheaper than paper throughout the Middle Ages.",
            "Paper was kept secret in Europe and never used for printed books.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "The key ideas are paper's cheap, portable surface (A), its westward spread (B), and its partnership with the press to mass-produce books (C). D, E, and F are false.",
        },
      ],
    },
    {
      id: "r2",
      title: "How Vaccines Train the Immune System",
      passage:
`The human immune system is remarkably good at remembering its enemies. When the body encounters a dangerous microbe for the first time, it usually takes several days to mount an effective response—days during which a person can become seriously ill. But if the same microbe returns later, the immune system often recognizes it almost instantly and destroys it before any symptoms appear. This capacity for memory is the foundation on which all vaccines are built. A vaccine works not by fighting a disease directly, but by teaching the immune system to recognize a particular threat in advance, so that a later encounter with the real microbe is met with a swift and overwhelming defense.

To understand how this works, it helps to know what the immune system is reacting to. On the surface of every microbe are molecules called antigens, which act rather like identifying markings. Specialized white blood cells can bind to a specific antigen and, in doing so, learn to recognize it. Some of these cells produce antibodies—proteins that lock onto the matching antigen and mark the invader for destruction. Crucially, after an infection is defeated, a portion of these cells survive as long-lived "memory cells." It is these memory cells that allow the body to respond so much faster the second time around.

A vaccine exploits this system by presenting the immune system with antigens in a form that cannot cause serious illness. Early vaccines often used a weakened or inactivated version of the microbe itself: still recognizable to the immune system, but no longer able to multiply dangerously. The body responds as though it were under genuine attack, generating antibodies and, most importantly, memory cells—yet the person never suffers the actual disease. Should the real microbe later invade, the memory cells are already waiting, and the response is fast enough to stop the infection in its tracks.

Not all vaccines rely on a whole microbe. Some use only a single, carefully chosen piece of the pathogen—a fragment of protein, for instance—that is enough to train the immune system without any risk of infection. More recently, a different strategy has emerged. Rather than delivering the antigen directly, certain vaccines deliver a set of genetic instructions that prompt the body's own cells to manufacture a harmless copy of one of the microbe's proteins. The immune system then learns to recognize that protein. In every case, the underlying principle is the same: expose the body to a safe version of the enemy's identifying markings, and let its natural memory do the rest.

The benefits of vaccination extend beyond the individual. When a large enough proportion of a community becomes immune, a contagious disease struggles to spread, because the microbe keeps encountering people who cannot pass it on. This effect, sometimes called community immunity, indirectly protects those who cannot be vaccinated themselves—newborns, for example, or people with weakened immune systems. In this way, the choice to be vaccinated has consequences not only for one's own health but for the health of an entire population.

Vaccines are not without limits. Some pathogens, such as the viruses that cause influenza, change their surface antigens so frequently that a vaccine effective one year may be far less effective the next, which is why certain vaccines must be reformulated regularly. And no vaccine produces a perfect response in every person. Yet the overall record is extraordinary. Diseases that once killed or disabled millions have been pushed to the margins of human experience, and at least one—smallpox—has been eliminated from the natural world entirely. All of this rests on a single elegant idea: that the immune system can be taught, ahead of time, to win a battle it has not yet had to fight.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, how does a vaccine work?",
          choices: [
            "By directly attacking microbes already in the body",
            "By teaching the immune system to recognize a threat in advance",
            "By slowing down the immune system's first response",
            "By replacing the body's natural antibodies with stronger ones",
          ],
          correct: 1,
          explanation: "Paragraph 1 says a vaccine works \"by teaching the immune system to recognize a particular threat in advance,\" not by fighting disease directly.",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The word \"swift\" in paragraph 1 is closest in meaning to",
          choices: ["fast", "gentle", "delayed", "uncertain"],
          correct: 0,
          explanation: "A \"swift and overwhelming defense\" is a fast, rapid one — the opposite of the slow first response.",
        },
        {
          id: "r2q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what is the function of antibodies?",
          choices: [
            "They produce new antigens on the surface of microbes.",
            "They lock onto a matching antigen and mark the invader for destruction.",
            "They weaken the body's own memory cells.",
            "They cause the symptoms of an infection.",
          ],
          correct: 1,
          explanation: "Antibodies are \"proteins that lock onto the matching antigen and mark the invader for destruction.\"",
        },
        {
          id: "r2q4", qtype: "Inference",
          prompt: "What can be inferred from paragraph 2 about memory cells?",
          choices: [
            "They are destroyed as soon as an infection ends.",
            "They are responsible for the faster response to a repeat infection.",
            "They prevent the body from ever producing antibodies.",
            "They are found only on the surface of microbes.",
          ],
          correct: 1,
          explanation: "Memory cells \"survive\" after an infection and \"allow the body to respond so much faster the second time around.\"",
        },
        {
          id: "r2q5", qtype: "Detail",
          prompt: "According to paragraph 3, how do early vaccines that use a weakened microbe avoid causing illness?",
          choices: [
            "The microbe is still recognizable but no longer able to multiply dangerously.",
            "The microbe is completely removed before injection.",
            "The microbe is replaced with a harmless antibody.",
            "The microbe is given only to people who are already immune.",
          ],
          correct: 0,
          explanation: "Such a microbe is \"still recognizable to the immune system, but no longer able to multiply dangerously.\"",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author discuss vaccines that deliver \"genetic instructions\" in paragraph 4?",
          choices: [
            "To argue that whole-microbe vaccines are dangerous",
            "To give an example of a newer strategy that still follows the same underlying principle",
            "To prove that antigens are unnecessary for immunity",
            "To explain why some vaccines must be reformulated yearly",
          ],
          correct: 1,
          explanation: "The genetic-instruction vaccine is presented as a recent strategy, but the author stresses \"the underlying principle is the same\" — exposing the body to safe identifying markings.",
        },
        {
          id: "r2q7", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"When a large enough proportion of a community becomes immune, a contagious disease struggles to spread, because the microbe keeps encountering people who cannot pass it on.\"",
          choices: [
            "A disease spreads fastest when most people in a community are immune.",
            "If enough people in a community are immune, the disease has trouble spreading because it meets people who cannot transmit it.",
            "Immune people are the main carriers who spread a contagious disease.",
            "Community immunity has no effect on how a disease spreads.",
          ],
          correct: 1,
          explanation: "The sentence means widespread immunity blocks transmission because the microbe meets people who can't pass it on. Choice B restates this accurately.",
        },
        {
          id: "r2q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 6, all of the following are limits of vaccines EXCEPT:",
          choices: [
            "Some pathogens change their surface antigens frequently.",
            "Certain vaccines must be reformulated regularly.",
            "No vaccine produces a perfect response in every person.",
            "Vaccines can give people the full disease they protect against.",
          ],
          correct: 3,
          explanation: "The paragraph cites changing antigens, the need to reformulate, and imperfect responses. It never says vaccines give people the full disease.",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"In effect, the immunity of the many becomes a shield for the few.\"",
          choices: [
            "Before \"The benefits of vaccination extend beyond the individual.\"",
            "After \"...indirectly protects those who cannot be vaccinated themselves—newborns, for example, or people with weakened immune systems.\"",
            "Before \"When a large enough proportion of a community becomes immune...\"",
            "After \"...because the microbe keeps encountering people who cannot pass it on.\"",
          ],
          correct: 1,
          explanation: "The inserted sentence summarizes how community immunity protects vulnerable people, so it fits best right after the description of that indirect protection.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Vaccines protect against disease by working with the immune system's natural ability to remember.\"",
          choices: [
            "Vaccines expose the body to a safe form of a microbe's antigens so memory cells form without illness.",
            "Different vaccines use weakened microbes, protein fragments, or genetic instructions, but share the same principle.",
            "Widespread vaccination produces community immunity that also protects those who cannot be vaccinated.",
            "Antibodies are produced only after a vaccine has completely failed.",
            "Vaccines work by directly attacking microbes already multiplying in the body.",
            "Smallpox remains widespread despite the existence of a vaccine.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "Key ideas: safe antigen exposure builds memory (A), the shared principle across vaccine types (B), and community immunity (C). D, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (conversation + two lectures) ────────────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Professor (Missed Exam)",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a professor during office hours.

Student: Hi, Professor Hayes, do you have a minute? It's about the midterm I missed on Tuesday.

Professor: Come in, sit down. Yes, I noticed you weren't there. I was a little concerned, actually—you've been one of the more reliable students this term. What happened?

Student: I'm really sorry. I woke up Tuesday morning with a high fever and could barely get out of bed. I went to the campus health center, and they told me to stay home for a couple of days. I have a note from them if you need it.

Professor: I appreciate you going to the trouble. And yes, a note from health services is exactly what our department policy asks for in a situation like this, so please do email me a copy. With documentation, a missed exam for illness counts as an excused absence.

Student: Oh, that's a relief. So what happens now? Do I get a zero, or—

Professor: No, no. An excused absence means you're entitled to a make-up exam. It won't be the identical test the rest of the class took, for fairness reasons, but it'll cover the same material at the same level of difficulty.

Student: That makes sense. When would I take it?

Professor: Let's aim for early next week, while the material is still fresh. I have a quiet room I use for make-ups. Are you free Monday afternoon, say, around two o'clock?

Student: Monday at two works perfectly.

Professor: Good. One thing I'd suggest—don't try to cram everything tonight. You're just getting over being sick. Review your notes a bit each day between now and Monday. Steady review beats a panicked all-nighter, and you'll actually remember more.

Student: That's good advice. Honestly, I was worried I'd ruined my grade by getting sick.

Professor: Not at all. Things happen. The important thing is that you communicated with me and brought documentation. That's exactly what you're supposed to do.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What are the speakers mainly discussing?",
          choices: [
            "How the student can make up an exam she missed because of illness",
            "Why the student is unhappy with her midterm grade",
            "How to switch into a different section of the course",
            "Which topics will appear on the final exam",
          ],
          correct: 0,
          explanation: "The conversation centers on the student's missed midterm and arranging an excused make-up exam.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "Why did the student miss the midterm?",
          choices: [
            "She overslept and forgot the exam date.",
            "She woke up with a high fever and was told to stay home.",
            "She had a conflict with another exam.",
            "She was traveling out of town.",
          ],
          correct: 1,
          explanation: "She says she \"woke up Tuesday morning with a high fever\" and the health center told her to stay home.",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the professor say the student must provide for the absence to be excused?",
          choices: [
            "A signed form from another professor",
            "A note from the campus health center",
            "A written apology to the class",
            "Proof that she studied the material",
          ],
          correct: 1,
          explanation: "The professor says a note from health services \"is exactly what our department policy asks for\" and asks her to email a copy.",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "Why does the professor say, \"It won't be the identical test the rest of the class took, for fairness reasons\"?",
          choices: [
            "To warn the student that the make-up will be much harder",
            "To explain that the make-up will differ but cover the same material at the same difficulty",
            "To suggest the student should retake the whole course",
            "To imply the student does not deserve a make-up exam",
          ],
          correct: 1,
          explanation: "He explains the make-up differs for fairness but \"cover[s] the same material at the same level of difficulty.\"",
        },
        {
          id: "l1q5", qtype: "Attitude",
          prompt: "What is the professor's attitude toward the student's situation?",
          choices: [
            "Suspicious that the student is making an excuse",
            "Understanding and reassuring",
            "Annoyed that the student came to office hours",
            "Indifferent to whether she makes up the exam",
          ],
          correct: 1,
          explanation: "He is reassuring throughout — \"Things happen,\" and he praises her for communicating and bringing documentation.",
        },
      ],
    },
    {
      id: "l2",
      title: "Lecture: The Water Cycle and Cloud Formation (Earth Science)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an earth science class.

Professor: Okay, today we're going to follow a single drop of water on a journey—through what we call the water cycle—and along the way I want to clear up a misconception about how clouds actually form. Because almost everyone has the basic story slightly wrong.

Let's start at the ocean. The sun heats the surface of the water, and some of that water evaporates—it turns from liquid into invisible water vapor, a gas, and rises into the atmosphere. Notice I said invisible. This is the first thing people get wrong. Water vapor is a clear gas. You cannot see it. So the steam you think you see rising from a hot cup of coffee? That's not actually vapor. We'll come back to that.

Now, our parcel of warm, moist air rises. And here's the key physical fact for today: as air rises, it expands and cools. The higher you go, the colder the air gets. And cold air can hold less water vapor than warm air can. So as our rising air cools down, it eventually reaches a point—we call it the dew point—where it simply can't hold all its water vapor anymore.

So what happens to the excess vapor? It condenses. It turns back from a gas into tiny liquid water droplets. And that—that collection of countless tiny liquid droplets—is what a cloud actually is. A cloud is not water vapor. A cloud is liquid water. Which is exactly why you can see it: those little droplets scatter light. And it's the same reason you can see your coffee "steam"—what you're seeing is the vapor that has cooled and condensed into tiny droplets in the cooler air above the cup.

There's one more piece, and it surprises people. Water vapor doesn't condense easily all on its own. It needs a surface to condense onto—a tiny solid particle floating in the air. We call these condensation nuclei. They can be specks of dust, salt from sea spray, even pollen. Without these particles, you'd need air far more saturated than what we usually see before clouds would form. So, a little counterintuitively, you actually need some "dirt" in the air to get a nice cloud.

And then the cycle closes. Inside the cloud, droplets collide and merge, growing larger and heavier, until eventually they're too heavy for the rising air to support. They fall—as rain, or if it's cold enough, as snow. That water flows over the land, into rivers, and back to the ocean, where the sun can heat it and lift it all over again. One continuous loop, powered, ultimately, by the sun.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How rivers carve out valleys over time",
            "How water moves through the water cycle and how clouds form",
            "Why ocean water is salty",
            "How to measure the temperature of the upper atmosphere",
          ],
          correct: 1,
          explanation: "The professor traces a water drop through the water cycle, focusing on evaporation, cooling, condensation, and cloud formation.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "According to the professor, what is water vapor?",
          choices: [
            "A visible white mist",
            "An invisible, clear gas",
            "A collection of tiny liquid droplets",
            "Frozen ice crystals",
          ],
          correct: 1,
          explanation: "He stresses that water vapor \"is a clear gas. You cannot see it.\"",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "What happens to a parcel of moist air as it rises, according to the lecture?",
          choices: [
            "It expands and cools, and can hold less water vapor.",
            "It contracts and warms, and can hold more water vapor.",
            "It stays the same temperature but loses oxygen.",
            "It absorbs more vapor the higher it goes.",
          ],
          correct: 0,
          explanation: "\"As air rises, it expands and cools,\" and \"cold air can hold less water vapor than warm air can.\"",
        },
        {
          id: "l2q4", qtype: "Function",
          prompt: "Why does the professor mention the \"steam\" rising from a cup of coffee?",
          choices: [
            "To prove that water vapor is visible",
            "To illustrate that what we see is actually condensed liquid droplets, not vapor",
            "To explain why coffee cools down quickly",
            "To show that condensation needs no particles",
          ],
          correct: 1,
          explanation: "He uses the coffee example to show that the visible \"steam\" is vapor that has cooled and condensed into tiny droplets — like a cloud.",
        },
        {
          id: "l2q5", qtype: "Detail",
          prompt: "According to the lecture, what role do condensation nuclei play?",
          choices: [
            "They warm the air so vapor can rise.",
            "They provide tiny surfaces for water vapor to condense onto.",
            "They prevent clouds from ever forming.",
            "They turn liquid droplets back into vapor.",
          ],
          correct: 1,
          explanation: "Condensation nuclei are tiny particles — dust, salt, pollen — that water vapor \"needs a surface to condense onto.\"",
        },
        {
          id: "l2q6", qtype: "Inference",
          prompt: "What can be inferred about clouds from the lecture?",
          choices: [
            "Clouds are made of invisible water vapor.",
            "Clouds are visible because they are made of tiny liquid droplets that scatter light.",
            "Clouds form only over the ocean.",
            "Clouds cannot form without strong winds.",
          ],
          correct: 1,
          explanation: "A cloud \"is liquid water\"—countless tiny droplets—\"which is exactly why you can see it: those little droplets scatter light.\"",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: Impressionism in Painting (Art History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an art history class.

Professor: So we've reached the 1870s in France, and I want to talk about a group of painters who, at the time, were basically considered failures—even frauds. Critics mocked them. And yet today they're among the most beloved artists in the world. I'm talking, of course, about the Impressionists—Monet, Renoir, Pissarro, and others.

Now, to understand why they were so controversial, you have to understand what "serious" painting was supposed to look like back then. The official art world prized large, polished canvases—historical scenes, mythological subjects, painted in the studio with smooth, almost invisible brushstrokes. The goal was a kind of flawless finish, where you couldn't see the artist's hand at all.

The Impressionists threw all of that out. Here's their central idea: they were obsessed with capturing the fleeting effects of light. Think about it—the way sunlight hits a field at, say, seven in the morning is completely different from how it looks at noon. Light is always changing. And to capture a specific, momentary impression of light, you have to work fast. You can't spend six months in a studio.

So they did something pretty radical. They took their easels and their paints outdoors—this is called painting "en plein air," in the open air—and they painted the scene right there, on the spot, often finishing a canvas in a single sitting. This was made practical, by the way, partly by a new invention: paint sold in portable metal tubes. Before that, painting outdoors with fresh pigments was a real hassle.

And because they were working quickly, their technique changed too. Instead of smooth, blended, invisible brushwork, they used short, broken, visible strokes of pure color. Up close, an Impressionist painting can look almost messy—just dabs and patches. But step back, and your eye blends those dabs together into shimmering light and water and air. That was the effect they were after.

This is exactly what horrified the critics. When Monet exhibited a hazy harbor scene called "Impression, Sunrise," a critic used the word "impression" as an insult—he meant the painting looked unfinished, like a rough sketch rather than a real painting. The name stuck, and the artists, somewhat defiantly, embraced it.

So what's the lasting importance here? The Impressionists changed what a painting could be about. It no longer had to tell a grand story or show a polished, idealized scene. It could simply capture a moment—the light on the water, a crowd on a rainy street, a quiet garden. They opened the door to everything that came after in modern art.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The lives of individual painters such as Monet and Renoir",
            "How and why the Impressionists broke with traditional painting",
            "The invention of the metal paint tube",
            "How critics chose which paintings to exhibit",
          ],
          correct: 1,
          explanation: "The professor explains the Impressionists' goals, methods, and why they broke from the official art world.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, what did the official art world value at the time?",
          choices: [
            "Quick sketches made outdoors",
            "Large, polished canvases with smooth, invisible brushstrokes",
            "Short, visible strokes of pure color",
            "Scenes of ordinary everyday life",
          ],
          correct: 1,
          explanation: "Serious painting prized \"large, polished canvases... with smooth, almost invisible brushstrokes,\" aiming for a flawless finish.",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "According to the lecture, what was the Impressionists' central goal?",
          choices: [
            "To depict grand historical and mythological scenes",
            "To capture the fleeting, changing effects of light",
            "To make brushstrokes completely invisible",
            "To paint only in a studio over many months",
          ],
          correct: 1,
          explanation: "The professor says \"they were obsessed with capturing the fleeting effects of light,\" which changes constantly.",
        },
        {
          id: "l3q4", qtype: "Organization",
          prompt: "Why does the professor mention paint sold in portable metal tubes?",
          choices: [
            "To explain how the Impressionists made money",
            "To explain what helped make painting outdoors on the spot practical",
            "To prove that Impressionist paint was higher quality",
            "To show why their paintings faded over time",
          ],
          correct: 1,
          explanation: "The portable tubes are cited as a new invention that helped make painting \"en plein air\" practical.",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "How did the term \"Impressionism\" originate, according to the lecture?",
          choices: [
            "Monet chose it as a proud label for the movement.",
            "A critic used \"impression\" as an insult, meaning a painting looked unfinished.",
            "It was the title of an art school the painters attended.",
            "It described the studios where the painters worked.",
          ],
          correct: 1,
          explanation: "A critic used the word \"impression\" as an insult about Monet's hazy harbor scene; the name stuck and the artists embraced it.",
        },
        {
          id: "l3q6", qtype: "Inference",
          prompt: "What does the professor imply about the broken brushstrokes in Impressionist paintings?",
          choices: [
            "They were a mistake the painters tried to hide.",
            "They look messy up close but blend into a vivid effect when viewed from a distance.",
            "They made the paintings impossible to display.",
            "They were identical to traditional studio technique.",
          ],
          correct: 1,
          explanation: "Up close the strokes look \"messy,\" but \"step back, and your eye blends those dabs together into shimmering light\" — the intended effect.",
        },
      ],
    },
    {
      id: "l4",
      title: "Conversation: Student and Housing Office (Dorm Room Change)",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a staff member in the university housing office.

Student: Hi, um, I was hoping to talk to someone about possibly changing my dorm room. Is this the right place?

Officer: You've come to the right place. I handle room change requests. Have a seat. So, what's going on with your current room?

Student: Well, I'm in Drummond Hall, room 214. The room itself is fine, but the problem is my roommate's schedule and mine are completely opposite. He's a music major, and he practices guitar in the room until two or three in the morning most nights. I have an eight a.m. lab almost every day, and I just can't function on a few hours of sleep.

Officer: That does sound difficult. Let me ask—have the two of you actually talked about it? Sometimes a conversation solves the problem without anyone moving.

Student: We have, a couple of times. He's a nice guy, he's not trying to be rude, but the practice rooms in the music building close at midnight, so he says he has nowhere else to go. We're just on totally different clocks.

Officer: I understand. I'll be honest with you—mid-semester room changes can be tricky, because we're nearly full. But "nearly full" isn't the same as full. Let me check what's open. Do you have a preference about which building or what kind of room?

Student: Honestly, my main priority is just being somewhere quiet at night. A single room would be ideal, if there's any way to do that.

Officer: Singles are in high demand, so I can't promise one. But it happens that a spot just opened up in Forsythe Hall—that's our quiet-study residence. There are enforced quiet hours after ten p.m., and it's mostly upperclassmen and graduate students. It's a double, but the current resident there keeps very regular hours, from what I've seen.

Student: That actually sounds perfect. Quiet hours after ten would solve everything.

Officer: Good. Now, there's a small catch I should mention. Forsythe is on the north side of campus, which is about a fifteen-minute walk from the science buildings. Your current dorm is much closer to your lab. Is that a trade-off you're okay with?

Student: For a good night's sleep? Absolutely. Fifteen minutes is nothing.

Officer: All right. Then here's what we'll do. I'll put in the transfer request today, and you'll need to fill out a room-change form—I'll print it for you. Once it's approved, which usually takes two or three business days, you'll get an email with your move-in date and your new key information. Sound good?

Student: That sounds great. Thank you so much—this is a huge relief.

Officer: Happy to help. And do me a favor: let your current roommate know you're moving, so it's not a surprise when housing contacts him about the empty bed.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "Why does the student go to the housing office?",
          choices: [
            "To complain that his dorm room is too small",
            "To request a change to a different dorm room",
            "To sign up for a music practice room",
            "To pay an outstanding housing fee",
          ],
          correct: 1,
          explanation: "The student opens by saying he was hoping to talk about \"possibly changing my dorm room,\" and the whole conversation is about arranging a transfer.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "What is the main problem with the student's current room?",
          choices: [
            "His roommate practices guitar late at night, disrupting his sleep.",
            "The room is too far from the music building.",
            "His roommate is rude and unfriendly.",
            "The heating in the room does not work.",
          ],
          correct: 0,
          explanation: "The student explains his roommate, a music major, \"practices guitar in the room until two or three in the morning,\" while he has early labs and can't sleep.",
        },
        {
          id: "l4q3", qtype: "Function",
          prompt: "Why does the officer ask whether the two roommates have talked about the problem?",
          choices: [
            "To suggest the student is overreacting to a minor issue",
            "To check whether the problem might be solved without a room change",
            "To imply that the roommate should be the one to move",
            "To delay processing the request until the next semester",
          ],
          correct: 1,
          explanation: "The officer says, \"Sometimes a conversation solves the problem without anyone moving,\" so she is checking whether a transfer is really necessary.",
        },
        {
          id: "l4q4", qtype: "Detail",
          prompt: "What does the officer say is a drawback of moving to Forsythe Hall?",
          choices: [
            "It has no enforced quiet hours.",
            "It is only for graduate students.",
            "It is about a fifteen-minute walk from the science buildings.",
            "It costs more than the student's current room.",
          ],
          correct: 2,
          explanation: "The officer notes Forsythe is on the north side of campus, \"about a fifteen-minute walk from the science buildings,\" farther than his current dorm.",
        },
        {
          id: "l4q5", qtype: "Attitude",
          prompt: "How does the student feel about the proposed move to Forsythe Hall?",
          choices: [
            "Reluctant, because the walk to his lab is too long",
            "Pleased, because the quiet hours would solve his problem",
            "Disappointed, because he wanted a single room",
            "Uncertain, because he has not visited the building",
          ],
          correct: 1,
          explanation: "When told about the quiet hours, he says it \"sounds perfect\" and that for a good night's sleep the longer walk is \"nothing\" — he is clearly pleased and relieved.",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The Waggle Dance — How Honeybees Communicate (Biology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a biology class.

Professor: All right. Today I want to talk about one of the most remarkable examples of animal communication that we know of—the way honeybees tell each other where to find food. And what's astonishing about it is that they do it not with sound, and not with scent, really, but with a kind of dance. A coded, symbolic dance. This was worked out in the mid-twentieth century by an Austrian scientist named Karl von Frisch, and it eventually earned him a Nobel Prize.

So here's the situation. A single foraging bee—a scout—flies out from the hive and discovers a rich patch of flowers, maybe a few hundred meters away. Now, that one bee can't possibly harvest all that nectar by herself. The colony needs to send dozens, even hundreds, of workers to the same spot. But how does the scout tell the others where it is? She can't lead them there one by one. So instead, she comes back to the hive and performs what von Frisch called the waggle dance.

Let me describe it. The bee walks forward in a straight line while rapidly shaking, or "waggling," her abdomen from side to side. Then she loops back—say, to the left—and returns to the start. Then she does the straight waggling run again, and loops back to the right. So the overall path traces out a figure-eight, with that waggling straight run in the middle. And it's that central straight run that carries the actual information.

Now here's where it gets really clever, and this is the key point I want you to remember. The dance encodes two separate pieces of information: direction and distance. Let's take direction first. The bees are dancing inside the hive, on a vertical honeycomb, in the dark—so they can't simply point at the flowers. Instead, they use gravity as a stand-in for the sun. If the bee waggles straight up, it means "fly toward the sun." If she waggles straight down, it means "fly directly away from the sun." And if she waggles, say, sixty degrees to the right of vertical, it means "fly at a sixty-degree angle to the right of the sun." It's a translation: the angle relative to the sun becomes an angle relative to gravity.

And then there's distance. This is encoded in the duration of that waggling run. The longer the bee waggles during the straight portion, the farther away the food source is. A short waggle means the flowers are close to the hive; a long, drawn-out waggle means they're far away. So a watching bee can read both the angle and the timing, and from those two numbers, work out roughly where to fly.

Now, you might be skeptical. Is this really communication, or are the other bees just following her scent? Von Frisch was skeptical too, so he tested it. He set up feeding stations at known directions and distances, observed the dances, and predicted where recruited bees would go—and they went there. Later researchers even built tiny robotic bees that performed artificial waggle dances, and live bees flew to the locations the robot "described." So yes—the information really is in the dance itself.

I want to leave you with why this matters beyond just being a neat trick. For a long time, the ability to use abstract symbols—to let one thing stand for another, like a dance angle standing for a compass direction—was thought to be almost uniquely human, tied to language. The honeybee shows us that a brain smaller than a grain of rice can do something genuinely symbolic. And that should make us think carefully about where we draw the line between human and animal communication.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How honeybees produce honey from nectar",
            "How honeybees use a dance to communicate the location of food",
            "Why Karl von Frisch won the Nobel Prize",
            "How bees defend their hive from predators",
          ],
          correct: 1,
          explanation: "The professor focuses on the waggle dance and how it tells other bees where food is located.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, what shape does the bee's overall dance path trace?",
          choices: [
            "A circle",
            "A straight line",
            "A figure-eight",
            "A spiral",
          ],
          correct: 2,
          explanation: "The professor says the bee loops left, does the waggling run, loops right, so \"the overall path traces out a figure-eight.\"",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "How does the dance indicate the distance to the food source?",
          choices: [
            "By how loudly the bee buzzes",
            "By how long the waggling straight run lasts",
            "By how many times the bee circles",
            "By the direction the bee faces when it lands",
          ],
          correct: 1,
          explanation: "Distance \"is encoded in the duration of that waggling run\" — a longer waggle means the food is farther away.",
        },
        {
          id: "l5q4", qtype: "Detail",
          prompt: "According to the lecture, how does the bee communicate direction while dancing in the dark hive?",
          choices: [
            "By pointing directly at the flowers",
            "By using the angle of her dance relative to gravity to stand for the angle relative to the sun",
            "By releasing a scent that points toward the food",
            "By leading the other bees partway out of the hive",
          ],
          correct: 1,
          explanation: "Because the bees can't see the sun inside the hive, they \"use gravity as a stand-in for the sun\": the dance angle relative to vertical equals the flight angle relative to the sun.",
        },
        {
          id: "l5q5", qtype: "Organization",
          prompt: "Why does the professor describe von Frisch's feeding-station experiments and the robotic bees?",
          choices: [
            "To show that the dance is too complicated for real bees to perform",
            "To provide evidence that the information really is carried in the dance itself",
            "To explain how bees produce more honey",
            "To argue that bees actually rely mostly on scent",
          ],
          correct: 1,
          explanation: "Von Frisch's predictions and the robotic-bee experiments are given as evidence that the location information \"really is in the dance itself,\" not just scent.",
        },
        {
          id: "l5q6", qtype: "Inference",
          prompt: "What does the professor imply about the significance of the waggle dance?",
          choices: [
            "It proves that bees are as intelligent as humans.",
            "It challenges the idea that using abstract symbols is uniquely human.",
            "It shows that animal communication is always based on scent.",
            "It suggests that bees cannot really find food on their own.",
          ],
          correct: 1,
          explanation: "The professor notes symbolic ability was thought \"almost uniquely human,\" and the bee—with a tiny brain—does \"something genuinely symbolic,\" challenging where we draw the line.",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people prefer to take a vacation in a city, where there are museums, restaurants, and busy streets. Others prefer a vacation in a quiet natural setting, such as a mountain or a beach. Which do you prefer, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your preference in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Starting next semester, the university library will reduce its weekend hours, closing at 6 p.m. instead of midnight on Saturdays and Sundays. The administration says low weekend usage and rising staffing costs make the change necessary.\n\n[Then you hear two students discussing the announcement. The woman disagrees with the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A psychology textbook defines the 'bystander effect' — the tendency for individuals to be less likely to help a person in need when other people are present, because each person assumes someone else will take responsibility.\n\n[Then you hear a professor give an example from a study about a person who needed help on a busy street.]",
      prompt: "Using the example from the lecture, explain the concept of the bystander effect.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two strategies plants use to survive in dry desert environments: some plants store large amounts of water in thick stems and leaves to use slowly, while others grow very deep roots to reach water far underground. The lecture gives one example of each.",
      prompt: "Using the points and examples from the lecture, explain two strategies that help plants survive in the desert.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general idea, then give BOTH strategies from the lecture with their examples and contrast them (storing water vs. deep roots).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Many towns are considering whether to replace their older street lights with new LED street lights. Supporters make three claims in favor of the switch:

1. LED lights use far less electricity, so they save the town money over time.
2. LEDs last much longer than older bulbs, reducing the cost and effort of replacement.
3. The bright, white light of LEDs improves safety by making streets easier to see at night.

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

Professor: Some companies now allow employees to work from home permanently, while others insist that workers return to the office. In your opinion, is it better for most employees to work mainly from home or mainly in an office? Why?

Maria (classmate): I think working from home is clearly better. People avoid long commutes and can focus without constant office interruptions.

David (classmate): I see it differently — being in the office makes collaboration easier and helps new employees learn from their colleagues.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
