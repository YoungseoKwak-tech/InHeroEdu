import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 7 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_7: ToeflForm = {
  id: "toefl-7",
  title: "TOEFL iBT Practice Test 7",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Aztec Empire and Tenochtitlan",
      passage:
`At its height in the early sixteenth century, the Aztec Empire controlled much of central Mexico from a single, extraordinary capital city: Tenochtitlan. Founded around 1325 on a small, marshy island in the middle of Lake Texcoco, the city grew into one of the largest urban centers in the world, with a population that some scholars estimate exceeded two hundred thousand people. When Spanish soldiers first saw it in 1519, several of them recorded their astonishment in writing, comparing its gleaming temples and orderly canals to the enchanted cities they had read about in romances. For an island settlement to support so many inhabitants required solving a series of difficult engineering problems, and the Aztecs solved them with remarkable ingenuity.

The most pressing problem was simply finding enough land to grow food. The island itself was small, and the surrounding lake was shallow and brackish. The Aztec response was an agricultural system known as the chinampa. Chinampas were artificial garden plots built up from the lake bed: workers staked out rectangular beds in the shallow water, then piled up layers of mud, decaying vegetation, and reeds until the surface rose above the waterline. These fertile, perpetually moist plots produced several harvests a year, and because they drew water directly from the lake, they never needed rain. Surrounded by canals that doubled as transportation routes, the chinampas fed the swelling population and turned the marshy lake into a productive landscape.

Fresh water posed a second challenge. The water of Lake Texcoco was too salty to drink, so the Aztecs built a double aqueduct of stone and mortar that carried fresh spring water several kilometers from the mainland into the heart of the city. The aqueduct was constructed in two parallel channels: when one channel needed cleaning or repair, water could be diverted into the other, so that the supply was never interrupted. To manage flooding and to keep the salty water of the eastern lake from mixing with the fresher water around the city, Aztec engineers also built an enormous dike, many kilometers long, across the lake.

The city itself was laid out with deliberate order. Three broad causeways connected the island to the mainland, wide enough for many people to walk abreast, and each was interrupted at intervals by wooden bridges that could be removed in time of war to cut the city off from attackers. At the center stood the sacred precinct, dominated by the Templo Mayor, a great twin-staired pyramid topped by two shrines. Radiating outward from this core were residential districts, each with its own smaller temple and marketplace, organized so that the city's many neighborhoods could govern much of their own daily affairs.

Commerce flowed through Tenochtitlan on a scale that impressed every foreign observer. The vast market at Tlatelolco, a sister city joined to Tenochtitlan, drew tens of thousands of buyers and sellers on a single day. Goods arrived from every corner of the empire and beyond: cacao beans, which also served as a form of currency; brilliantly colored feathers; cotton cloth; gold ornaments; obsidian blades; and food of every description. Officials patrolled the market to settle disputes and to ensure that merchants used honest measures, a degree of regulation that surprised the Spanish.

The grandeur of Tenochtitlan, however, would prove tragically short-lived. Within two years of the Spaniards' arrival, the city fell after a long and brutal siege, and much of it was deliberately demolished so that a Spanish colonial capital, Mexico City, could be built upon its ruins. Yet the achievements of the Aztec engineers were not entirely erased. The lake was gradually drained over the following centuries, but the memory of the island metropolis—its floating gardens, its aqueducts, its great causeways and markets—survived in the written accounts of those who had seen it and in the archaeological remains that still lie beneath the modern city.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, why did several Spanish soldiers record their astonishment at Tenochtitlan?",
          choices: [
            "Its temples and canals reminded them of enchanted cities from romances.",
            "It had been completely abandoned by its inhabitants.",
            "It was much smaller than any city they had seen in Europe.",
            "It was built entirely of gold and precious stones.",
          ],
          correct: 0,
          explanation: "Paragraph 1 says the soldiers compared \"its gleaming temples and orderly canals to the enchanted cities they had read about in romances.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"ingenuity\" in paragraph 1 is closest in meaning to",
          choices: ["wealth", "cleverness", "caution", "good fortune"],
          correct: 1,
          explanation: "\"Ingenuity\" refers to inventive cleverness — the skill with which the Aztecs solved their engineering problems.",
        },
        {
          id: "r1q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what was one advantage of chinampas?",
          choices: [
            "They could be moved to follow the seasonal rains.",
            "They drew water from the lake and so never needed rain.",
            "They required no labor to build and maintain.",
            "They produced a single large harvest each year.",
          ],
          correct: 1,
          explanation: "The passage states the chinampas \"drew water directly from the lake\" and \"never needed rain.\"",
        },
        {
          id: "r1q4", qtype: "Rhetorical Purpose",
          prompt: "Why does the author explain that the aqueduct was built in two parallel channels?",
          choices: [
            "To show that the Aztecs lacked enough stone for a single channel",
            "To explain how the supply of fresh water could continue even during repairs",
            "To prove that the lake water was safe to drink",
            "To describe how the causeways were constructed",
          ],
          correct: 1,
          explanation: "The two channels meant that \"when one channel needed cleaning or repair, water could be diverted into the other, so that the supply was never interrupted.\"",
        },
        {
          id: "r1q5", qtype: "Detail",
          prompt: "According to paragraph 4, why could the bridges on the causeways be removed?",
          choices: [
            "To allow large boats to pass between sections of the lake",
            "To let workers repair the causeways more easily",
            "To cut the city off from attackers in time of war",
            "To collect tolls from travelers entering the city",
          ],
          correct: 2,
          explanation: "The bridges \"could be removed in time of war to cut the city off from attackers.\"",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"Officials patrolled the market to settle disputes and to ensure that merchants used honest measures, a degree of regulation that surprised the Spanish.\"",
          choices: [
            "The Spanish were surprised by how disorganized the Aztec market was.",
            "Officials watched the market to resolve disputes and enforce honest measures, a level of oversight the Spanish found surprising.",
            "Merchants in the market were free to use any measures they wished.",
            "The Spanish forbade officials from settling disputes in the market.",
          ],
          correct: 1,
          explanation: "The sentence says officials regulated disputes and honest measures, and that this oversight surprised the Spanish. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 5, which item served as a form of currency?",
          choices: ["Obsidian blades", "Cacao beans", "Cotton cloth", "Colored feathers"],
          correct: 1,
          explanation: "The passage lists \"cacao beans, which also served as a form of currency.\"",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to the passage, all of the following are mentioned as engineering achievements of the Aztecs EXCEPT:",
          choices: [
            "A double aqueduct carrying fresh water into the city",
            "Artificial garden plots built up from the lake bed",
            "A long dike to control flooding and salty water",
            "A wall of stone surrounding the entire island",
          ],
          correct: 3,
          explanation: "The passage describes the aqueduct, chinampas, and the dike, but never a stone wall around the island.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 6?\n\n\"In this way, the conquerors built their own power directly atop the city they had destroyed.\"",
          choices: [
            "Before \"The grandeur of Tenochtitlan, however, would prove tragically short-lived.\"",
            "After \"...a Spanish colonial capital, Mexico City, could be built upon its ruins.\"",
            "After \"...the achievements of the Aztec engineers were not entirely erased.\"",
            "Before \"Yet the achievements of the Aztec engineers...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence comments on building a new capital atop the ruins, so it fits best right after the sentence describing Mexico City being built upon Tenochtitlan's ruins.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Tenochtitlan was a remarkable island capital whose builders overcame major engineering challenges.\"",
          choices: [
            "To feed its huge population, the Aztecs built chinampas, fertile artificial plots that produced several harvests a year.",
            "Engineers solved the city's water problems with a double aqueduct and a long dike across the lake.",
            "The city was a major commercial center, with an enormous, carefully regulated market at Tlatelolco.",
            "The Spanish admired Tenochtitlan so much that they left the entire city untouched.",
            "Cacao beans were valued only as food and had no other use in the empire.",
            "The causeways were built so narrow that only one person could cross at a time.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "The key ideas are the chinampas (A), the water engineering (B), and the regulated commerce (C). D, E, and F contradict the passage.",
        },
      ],
    },
    {
      id: "r2",
      title: "Antibiotics and Antibiotic Resistance",
      passage:
`Few discoveries in the history of medicine have saved as many lives as antibiotics—drugs that kill bacteria or stop them from multiplying. Before their introduction, a minor cut could lead to a fatal infection, and diseases such as pneumonia and tuberculosis routinely killed otherwise healthy people. The modern antibiotic era is usually dated to 1928, when the Scottish scientist Alexander Fleming noticed that a mold contaminating one of his laboratory dishes had killed the bacteria growing around it. The mold produced a substance Fleming named penicillin. More than a decade passed before other researchers learned to purify penicillin in useful quantities, but once they did, the drug transformed medicine, dramatically reducing deaths from infected wounds during the Second World War.

Antibiotics work by exploiting differences between bacterial cells and the cells of the human body. Some antibiotics, for example, attack the cell wall that surrounds and protects a bacterium. Human cells have no such wall, so a drug that disrupts wall construction can destroy bacteria while leaving human tissue unharmed. Other antibiotics interfere with a bacterium's ability to build proteins or to copy its genetic material. Because these processes are slightly different in bacteria than in human cells, a well-designed drug can shut down the bacterium without poisoning the patient. This selective action is what makes antibiotics so valuable: they target the invader and largely spare the host.

The very success of antibiotics, however, has created a serious and growing problem: resistance. Within any large population of bacteria, a few individuals usually carry random genetic mutations that happen to make them less vulnerable to a particular drug. When the population is exposed to that antibiotic, the susceptible bacteria die, but the resistant ones survive and reproduce. Their resistant offspring inherit the helpful mutation, and over several generations the resistant strain comes to dominate. This is natural selection operating in fast motion, because bacteria can produce a new generation in as little as twenty minutes.

What makes bacterial resistance especially dangerous is that bacteria can share resistance genes directly with one another, even across different species. They do this through small loops of DNA called plasmids, which one bacterium can pass to another. A resistance gene that arises in a harmless bacterium can therefore spread to a dangerous one, so that the second bacterium acquires resistance without ever having been exposed to the drug itself. Through this gene-sharing, resistance can travel through a bacterial community far faster than it could by reproduction alone.

Human behavior has greatly accelerated the rise of resistance. When antibiotics are prescribed for illnesses they cannot cure—such as colds and other infections caused by viruses rather than bacteria—they provide no benefit while still exerting selective pressure on the bacteria a person carries. Patients who stop taking a prescribed course of antibiotics too early may kill off only the most vulnerable bacteria, leaving the hardier ones alive to multiply. And in agriculture, antibiotics have been given in large quantities to healthy livestock to promote growth, creating vast reservoirs in which resistant bacteria can flourish and from which they can spread.

Addressing the problem requires action on several fronts at once. Physicians are being urged to prescribe antibiotics only when they are genuinely needed, and patients to complete the courses they are given. Hospitals are tightening hygiene to limit the spread of resistant strains, and many countries are restricting the routine use of antibiotics in farming. At the same time, researchers are searching for entirely new antibiotics and for alternative therapies. The challenge is formidable, because the development of new drugs is slow and expensive, while bacteria continue to evolve resistance with relentless speed. Many specialists warn that without sustained effort, some infections that are now easily treated could once again become deadly.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what did Alexander Fleming observe in 1928?",
          choices: [
            "A mold growing in a dish had killed the surrounding bacteria.",
            "Bacteria had become resistant to a new drug.",
            "Penicillin could be purified in large quantities.",
            "A vaccine prevented infections in wounded soldiers.",
          ],
          correct: 0,
          explanation: "Fleming \"noticed that a mold contaminating one of his laboratory dishes had killed the bacteria growing around it.\"",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The word \"exploiting\" in paragraph 2 is closest in meaning to",
          choices: ["removing", "taking advantage of", "ignoring", "weakening"],
          correct: 1,
          explanation: "Antibiotics work by \"taking advantage of\" the differences between bacterial and human cells.",
        },
        {
          id: "r2q3", qtype: "Detail",
          prompt: "According to paragraph 2, why can a drug that attacks the bacterial cell wall leave human tissue unharmed?",
          choices: [
            "Human cells repair damage to their walls very quickly.",
            "Human cells have no such wall for the drug to attack.",
            "The drug is too weak to affect human cells.",
            "Human cells produce a substance that blocks the drug.",
          ],
          correct: 1,
          explanation: "\"Human cells have no such wall, so a drug that disrupts wall construction can destroy bacteria while leaving human tissue unharmed.\"",
        },
        {
          id: "r2q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, how does a resistant strain of bacteria come to dominate a population?",
          choices: [
            "The drug causes the bacteria to develop new mutations.",
            "Susceptible bacteria die while resistant ones survive and reproduce.",
            "All the bacteria slowly become resistant at the same rate.",
            "Resistant bacteria stop reproducing to conserve energy.",
          ],
          correct: 1,
          explanation: "When exposed to the antibiotic, \"the susceptible bacteria die, but the resistant ones survive and reproduce,\" passing on the mutation.",
        },
        {
          id: "r2q5", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention that bacteria can produce a new generation in as little as twenty minutes?",
          choices: [
            "To explain why bacteria are harmless to humans",
            "To emphasize how quickly natural selection for resistance can occur",
            "To show that plasmids are unnecessary for resistance",
            "To prove that antibiotics no longer work at all",
          ],
          correct: 1,
          explanation: "The rapid generation time illustrates \"natural selection operating in fast motion,\" so resistance can spread very quickly.",
        },
        {
          id: "r2q6", qtype: "Factual Information",
          prompt: "According to paragraph 4, what are plasmids?",
          choices: [
            "Drugs used to kill resistant bacteria",
            "Small loops of DNA that bacteria can pass to one another",
            "The cell walls that protect bacteria from antibiotics",
            "Proteins that bacteria use to reproduce",
          ],
          correct: 1,
          explanation: "Plasmids are described as \"small loops of DNA... which one bacterium can pass to another,\" allowing resistance genes to spread.",
        },
        {
          id: "r2q7", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, all of the following human behaviors accelerate resistance EXCEPT:",
          choices: [
            "Prescribing antibiotics for viral illnesses they cannot cure",
            "Stopping a course of antibiotics too early",
            "Giving antibiotics to healthy livestock to promote growth",
            "Completing the full course of antibiotics as prescribed",
          ],
          correct: 3,
          explanation: "The paragraph cites prescribing for viruses, stopping early, and farming use. Completing the course is recommended, not a cause of resistance.",
        },
        {
          id: "r2q8", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"A resistance gene that arises in a harmless bacterium can therefore spread to a dangerous one, so that the second bacterium acquires resistance without ever having been exposed to the drug itself.\"",
          choices: [
            "Harmless bacteria can never pass resistance genes to dangerous ones.",
            "A dangerous bacterium can become resistant by receiving a gene from a harmless one, even without drug exposure.",
            "Dangerous bacteria become resistant only after being exposed to a drug.",
            "Resistance genes weaken harmless bacteria but strengthen dangerous ones.",
          ],
          correct: 1,
          explanation: "The sentence says a dangerous bacterium can gain resistance from a harmless one's gene without ever meeting the drug. Choice B restates this.",
        },
        {
          id: "r2q9", qtype: "Inference",
          prompt: "What can be inferred from paragraph 6 about the development of new antibiotics?",
          choices: [
            "It is fast enough to keep ahead of bacterial evolution.",
            "It cannot, by itself, solve the resistance problem quickly.",
            "It has been abandoned by most researchers.",
            "It makes hospital hygiene unnecessary.",
          ],
          correct: 1,
          explanation: "Because new-drug development is \"slow and expensive\" while bacteria evolve \"with relentless speed,\" new drugs alone cannot keep pace — hence the call for action on several fronts.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Antibiotics transformed medicine, but bacterial resistance now threatens their effectiveness.\"",
          choices: [
            "Antibiotics save lives by selectively targeting bacteria while largely sparing human cells.",
            "Resistance arises through natural selection and spreads when bacteria share resistance genes via plasmids.",
            "Human misuse of antibiotics, in medicine and agriculture, has accelerated the rise of resistance.",
            "Penicillin was used in large, purified quantities immediately after Fleming's discovery.",
            "Antibiotics are equally effective against bacteria and viruses.",
            "New antibiotics can be developed quickly enough to make resistance harmless.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "Key ideas: the selective action of antibiotics (A), how resistance evolves and spreads (B), and human misuse accelerating it (C). D, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (2 conversations + 3 lectures · 28 Q) ────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Bursar's Office",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and an officer in the bursar's office.

Student: Hi, I got an email saying my tuition bill is due in full next Friday, and honestly there's no way I can pay the whole thing at once right now. I was hoping there's some kind of option.

Officer: Okay, take a breath—you're definitely not the first person to come in about this. The good news is the university has a payment plan. Instead of paying the full balance by the deadline, you split it into monthly installments over the semester.

Student: Oh, that would help a lot. How does it actually work? Like, how much per month?

Officer: It depends on your balance, but the way the plan works is we divide your remaining tuition into four equal payments, due on the first of each month. There's a one-time enrollment fee of forty dollars to set it up, but no interest is charged as long as you pay each installment on time.

Student: Forty dollars, that's manageable. And there's no interest at all?

Officer: No interest, correct. It's not a loan—it's just spreading out what you already owe. The one thing to watch is the deadlines. If you miss an installment, there's a late fee, and if you fall too far behind, you can be dropped from the plan and the full balance becomes due again.

Student: Got it, so the deadlines are the part I really need to stay on top of. Can I set it up so the payments come out automatically?

Officer: Yes, and honestly I'd recommend it. You can link a bank account and turn on automatic payments, so the installment is withdrawn on the first of each month. That way you never miss a date by accident. Most students who run into trouble are the ones paying manually who just forget.

Student: That makes sense. So what do I actually need to do to enroll?

Officer: Log in to the student payment portal, go to the "Payment Plans" tab, and select the semester plan. It'll show you your four installment amounts before you confirm, and you can set up the automatic withdrawal right there. Just make sure you enroll before next Friday—after the due date passes, the plan option closes for this semester.

Student: Okay, I'll do it tonight. Thank you, this is a huge relief.

Officer: Happy to help. And if the portal gives you any trouble, just come back and we'll walk through it together.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What is the main reason the student has come to the bursar's office?",
          choices: [
            "She wants to apply for a student loan.",
            "She cannot pay her full tuition bill by the deadline and is looking for options.",
            "She believes she was charged the wrong amount.",
            "She wants to drop a course to reduce her tuition.",
          ],
          correct: 1,
          explanation: "The student opens by saying there's \"no way I can pay the whole thing at once\" and asks whether there's an option.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "How does the payment plan divide the student's tuition?",
          choices: [
            "Into two payments due at the start and end of the semester",
            "Into four equal monthly installments due on the first of each month",
            "Into weekly payments over the whole year",
            "Into a single payment with added interest",
          ],
          correct: 1,
          explanation: "The officer says the plan divides the balance \"into four equal payments, due on the first of each month.\"",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the officer say about interest and fees on the plan?",
          choices: [
            "There is interest but no enrollment fee.",
            "There is a one-time enrollment fee but no interest if installments are paid on time.",
            "There are no fees or interest of any kind.",
            "Interest is charged monthly on the remaining balance.",
          ],
          correct: 1,
          explanation: "There is \"a one-time enrollment fee of forty dollars\" and \"no interest is charged as long as you pay each installment on time.\"",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "Why does the officer recommend setting up automatic payments?",
          choices: [
            "Because automatic payments come with a discount",
            "So the student never misses a deadline by accident",
            "Because manual payments are not allowed on the plan",
            "So the student can change the installment amounts each month",
          ],
          correct: 1,
          explanation: "The officer notes that with automatic withdrawal \"you never miss a date by accident,\" since most who run into trouble are paying manually and forget.",
        },
        {
          id: "l1q5", qtype: "Detail",
          prompt: "What does the officer say the student must do before next Friday?",
          choices: [
            "Pay the forty-dollar fee in person at the office",
            "Enroll in the plan through the student payment portal",
            "Meet with a financial aid advisor",
            "Submit a written appeal to the bursar",
          ],
          correct: 1,
          explanation: "The officer says to enroll through the payment portal before next Friday, after which \"the plan option closes for this semester.\"",
        },
      ],
    },
    {
      id: "l2",
      title: "Conversation: Student and Professor (Make-up Presentation)",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a professor.

Student: Professor Reyes, do you have a minute? It's about the group presentation that was scheduled for last Thursday.

Professor: Of course, come in. Yes—I noticed you weren't there. Your group went ahead and presented without you. Is everything all right?

Student: That's exactly what I wanted to explain. I was actually in the health center that morning with a really bad case of the flu. I have a note from them if you need it. I tried to email the group but my phone had died, and by the time I got back, they'd already gone.

Professor: I appreciate you coming to tell me, and I'm sorry you were sick. The note isn't strictly necessary, but go ahead and forward it to me so I have it on file. The more important question is what we do now, because the presentation was a graded component.

Student: Right. Is there any way I could do a make-up? I prepared the section on the economic data—I have all my slides ready. I'd hate for the whole group to lose points because of me, or for me to just take a zero.

Professor: Well, let me reassure you on one thing first: your absence won't affect your group members' grades. They presented their parts, and they'll be assessed on those. So this is really about your individual portion.

Student: Oh, that's a relief. I was worried I'd dragged them down.

Professor: Not at all. For your part, here's what I'd suggest. Rather than trying to insert you back into a group slot—which is logistically messy now—you can present your section to me individually during my office hours. Same content, same time limit, just to me instead of the whole class.

Student: That would be perfect. When would work?

Professor: I have office hours Wednesday from two to four. Come at two-thirty, and bring the same slides you prepared. Walk me through the economic-data section exactly as you would have for the class. I'll grade it on the same rubric everyone else used.

Student: Wednesday at two-thirty, with my slides. Got it. And should I still send the doctor's note?

Professor: Yes, forward that today, just so the absence is documented. But honestly, the make-up is the main thing. Prepare it well, and there's no reason you can't earn full marks.

Student: Thank you so much. I'll be there Wednesday, fully ready.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Purpose",
          prompt: "Why does the student go to see the professor?",
          choices: [
            "To explain why she missed a presentation and arrange a make-up",
            "To complain about her group members' performance",
            "To ask for an extension on a written essay",
            "To drop the course because she has been ill",
          ],
          correct: 0,
          explanation: "The student explains she was sick and missed the group presentation, then asks whether she can do a make-up.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "Why was the student absent on the day of the presentation?",
          choices: [
            "She had a scheduling conflict with another class.",
            "She was at the health center with the flu.",
            "She had not finished preparing her slides.",
            "She missed the bus to campus.",
          ],
          correct: 1,
          explanation: "She says she \"was actually in the health center that morning with a really bad case of the flu.\"",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "What does the professor say about the student's group members?",
          choices: [
            "They will lose points because of her absence.",
            "Their grades will not be affected by her absence.",
            "They will have to present again with her.",
            "They have asked her to be removed from the group.",
          ],
          correct: 1,
          explanation: "The professor reassures her that \"your absence won't affect your group members' grades.\"",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "How will the student complete the make-up?",
          choices: [
            "By submitting her slides without presenting them",
            "By presenting her section individually to the professor during office hours",
            "By joining a different group's presentation",
            "By writing a paper instead of presenting",
          ],
          correct: 1,
          explanation: "The professor suggests she \"present your section to me individually during my office hours,\" on Wednesday at two-thirty.",
        },
        {
          id: "l2q5", qtype: "Attitude",
          prompt: "What is the professor's attitude toward the student's situation?",
          choices: [
            "Annoyed that she did not contact the group sooner",
            "Understanding and willing to offer a fair make-up",
            "Doubtful that she was really sick",
            "Indifferent to whether she completes the presentation",
          ],
          correct: 1,
          explanation: "The professor is sympathetic (\"I'm sorry you were sick\"), reassures her about the group, and arranges a fair make-up on the same rubric.",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: Aquifers and Groundwater (Earth Science)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an earth science class.

Professor: Today I want to talk about water you can't see—the water that's stored underground. When most people picture the world's fresh water, they think of rivers and lakes. But the truth is that a far larger share of the planet's usable fresh water is sitting beneath our feet, in what we call groundwater. And understanding where it comes from, and how it moves, turns out to matter enormously for how we live.

So let's start with a basic idea. When rain falls, some of it runs off into streams, and some evaporates. But a portion soaks down into the ground. It seeps through the soil and keeps going down until it reaches a zone where all the spaces between the rock and sediment particles are completely filled with water. That's the saturated zone, and the top of it has a name you should remember: the water table.

Now, the rock and sediment that actually holds and transmits this water in usable amounts—that's what we call an aquifer. And here's a point students often get wrong: an aquifer is not an underground lake or a flowing river. There's no open cavern of water down there, in most cases. An aquifer is rock or sediment—like sandstone or gravel—with lots of tiny connected spaces, and the water fills those spaces. So picture a sponge rather than a swimming pool. That distinction really matters.

For a layer of rock to make a good aquifer, it needs two properties. First, porosity—it has to have enough open space to hold a useful amount of water. But porosity alone isn't enough. The second property is permeability—the spaces have to be connected, so that water can actually flow through and be pumped out. You can have a rock that's quite porous but barely permeable, where the pores don't connect, and water just won't move through it. Both properties together are what make an aquifer productive.

Now here's where the human stakes come in. Many regions depend on aquifers for drinking water and especially for agriculture—pumping groundwater up to irrigate crops. And the critical issue is the rate of recharge. Aquifers are naturally refilled, or recharged, when surface water seeps back down. But in many places, people are pumping water out far faster than nature is putting it back in. When that happens, the water table drops. Wells have to be drilled deeper, pumping gets more expensive, and in the worst cases the aquifer is effectively being mined—drawn down like a bank account that nobody is depositing into.

And there's a further complication. Some of the largest aquifers hold water that seeped in thousands of years ago, under wetter climates that no longer exist. We sometimes call that "fossil water." It is, for all practical purposes, non-renewable on any human timescale. Once you pump it out, it isn't coming back in your lifetime, or your grandchildren's. So when communities build their farms and cities on top of that kind of aquifer, they're spending a resource that took millennia to accumulate—and that's a sobering thing to keep in mind.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How rivers and lakes are formed on the Earth's surface",
            "What aquifers are, how they store groundwater, and why their use raises concerns",
            "How rainwater evaporates back into the atmosphere",
            "The chemical composition of underground rock",
          ],
          correct: 1,
          explanation: "The professor explains groundwater and aquifers, the properties that make them productive, and the problem of overuse.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, what is the water table?",
          choices: [
            "An underground river that flows through caverns",
            "The top of the saturated zone, where all spaces are filled with water",
            "A layer of rock that blocks water from moving",
            "The surface where rivers and lakes meet the ground",
          ],
          correct: 1,
          explanation: "The professor defines the water table as \"the top of\" the saturated zone, where all the spaces between particles are filled with water.",
        },
        {
          id: "l3q3", qtype: "Function",
          prompt: "Why does the professor tell students to \"picture a sponge rather than a swimming pool\"?",
          choices: [
            "To explain that aquifers are usually completely dry",
            "To stress that an aquifer is water-filled rock or sediment, not an open underground lake",
            "To show that aquifers float on top of the water table",
            "To argue that swimming pools are a source of groundwater",
          ],
          correct: 1,
          explanation: "The sponge image corrects the misconception of an underground lake: an aquifer is rock or sediment with connected spaces filled with water.",
        },
        {
          id: "l3q4", qtype: "Organization",
          prompt: "Why does the professor distinguish between porosity and permeability?",
          choices: [
            "To explain that both properties are needed for an aquifer to be productive",
            "To show that porosity alone makes a perfect aquifer",
            "To prove that permeability prevents water from being pumped",
            "To argue that aquifers cannot hold any water",
          ],
          correct: 0,
          explanation: "The professor says a rock can be porous but barely permeable; \"both properties together are what make an aquifer productive.\"",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "According to the lecture, what happens when people pump water out faster than it is recharged?",
          choices: [
            "The aquifer refills more quickly to compensate.",
            "The water table drops, wells must be drilled deeper, and pumping becomes more expensive.",
            "The water becomes safer to drink.",
            "Rainfall in the region automatically increases.",
          ],
          correct: 1,
          explanation: "When pumping outpaces recharge, \"the water table drops. Wells have to be drilled deeper, pumping gets more expensive.\"",
        },
        {
          id: "l3q6", qtype: "Inference",
          prompt: "What does the professor imply about communities that rely on \"fossil water\"?",
          choices: [
            "Their water supply will be replenished within a few years.",
            "They are using a resource that will not be replaced on any human timescale.",
            "Their aquifers are constantly refilled by modern rainfall.",
            "They face no long-term risk from heavy pumping.",
          ],
          correct: 1,
          explanation: "Fossil water is \"non-renewable on any human timescale\"; once pumped out, \"it isn't coming back in your lifetime, or your grandchildren's.\"",
        },
      ],
    },
    {
      id: "l4",
      title: "Lecture: The Anchoring Effect (Psychology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a psychology class.

Professor: Last week we talked about how people are not the perfectly rational decision-makers that older economic theories assumed. Today I want to give you one of the most striking examples of that—a mental shortcut, or bias, called the anchoring effect. And once you understand it, I promise you'll start noticing it everywhere—in stores, in negotiations, maybe even in your own choices.

So here's the basic idea. The anchoring effect is the tendency to rely too heavily on the first piece of numerical information you encounter—the "anchor"—when making a judgment. Even if that first number is completely arbitrary, even if it has nothing to do with the real answer, it pulls your estimate toward itself. You adjust away from the anchor, but you usually don't adjust enough.

Let me give you the classic demonstration. In a famous study, researchers spun a wheel of fortune that was secretly rigged to stop on either the number ten or the number sixty-five. Then they asked participants a question that had nothing to do with the wheel—something like, what percentage of African countries are members of the United Nations? Now, the wheel is obviously random. It's irrelevant. And yet—people who had just seen the wheel land on sixty-five gave much higher estimates than people who had seen it land on ten. The random number anchored their answer. That's a remarkable result, because the participants knew the wheel was just a wheel.

So why does this happen? The leading explanation is that when we face an uncertain judgment, our minds grab whatever starting point is available and then adjust from there. The trouble is the adjustment is lazy. We tend to stop adjusting as soon as we reach a value that seems plausible, rather than pushing all the way to where we'd land if we ignored the anchor entirely. So the anchor keeps a grip on the final answer.

Now let's make this practical, because this is where it really bites. Think about shopping. When a store lists an item at, say, an "original price" of two hundred dollars, then marks it down to one hundred, that two hundred is an anchor. Suddenly a hundred dollars feels like a bargain—even if a hundred dollars is actually a perfectly ordinary price for the item, or even high. The "original" number reframes how you perceive the sale price. Retailers know this very well.

The same thing happens in negotiations. Whoever makes the first offer sets the anchor, and the final agreement tends to land closer to that opening number than people expect. So if you're negotiating a salary or the price of a car, the first number on the table carries surprising weight.

Now, can you defend against anchoring? To some degree. Simply being aware of it helps a little, though less than you'd hope—the effect is stubborn even when people are warned. A better strategy is to deliberately generate your own independent estimate before you ever see the other side's number. If you decide what a fair salary is before you walk into the room, you're far less likely to be dragged around by whatever figure the employer throws out first. The anchor only works if you let it be your starting point.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How older economic theories accurately predicted human behavior",
            "A mental bias in which a first number unduly influences later judgments",
            "How to calculate the percentage of countries in an organization",
            "Why people enjoy playing games of chance like wheels of fortune",
          ],
          correct: 1,
          explanation: "The lecture is about the anchoring effect—the tendency to rely too heavily on the first number encountered.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "According to the professor, what is the anchoring effect?",
          choices: [
            "The tendency to ignore all numerical information when deciding",
            "The tendency to rely too heavily on the first number encountered when making a judgment",
            "The tendency to choose the average of several numbers",
            "The tendency to distrust any number that seems arbitrary",
          ],
          correct: 1,
          explanation: "The professor defines it as relying \"too heavily on the first piece of numerical information you encounter—the 'anchor.'\"",
        },
        {
          id: "l4q3", qtype: "Detail",
          prompt: "What was surprising about the wheel-of-fortune study?",
          choices: [
            "Participants refused to answer the United Nations question.",
            "An obviously random number still influenced people's estimates.",
            "The wheel always landed on the correct answer.",
            "Participants gave identical answers regardless of the wheel.",
          ],
          correct: 1,
          explanation: "Even though the wheel was random and irrelevant, those who saw sixty-five gave higher estimates than those who saw ten.",
        },
        {
          id: "l4q4", qtype: "Function",
          prompt: "Why does the professor describe the \"original price\" example in a store?",
          choices: [
            "To prove that marked-down items are always a good deal",
            "To show how anchoring operates in everyday shopping",
            "To explain how stores calculate their costs",
            "To argue that prices have no effect on shoppers",
          ],
          correct: 1,
          explanation: "The store example illustrates anchoring in real life: the high \"original\" price makes the sale price feel like a bargain.",
        },
        {
          id: "l4q5", qtype: "Organization",
          prompt: "Why does the professor explain that adjustment from an anchor is \"lazy\"?",
          choices: [
            "To explain why the anchor keeps influencing the final answer",
            "To argue that people never adjust their estimates at all",
            "To show that anchors are always accurate starting points",
            "To prove that warnings completely eliminate the effect",
          ],
          correct: 0,
          explanation: "People stop adjusting once they reach a plausible value, so the anchor \"keeps a grip on the final answer.\"",
        },
        {
          id: "l4q6", qtype: "Detail",
          prompt: "According to the professor, what is the best defense against anchoring?",
          choices: [
            "Always accepting the first offer made",
            "Generating your own independent estimate before seeing the other side's number",
            "Refusing to make any numerical judgments",
            "Trusting that awareness alone will fully protect you",
          ],
          correct: 1,
          explanation: "The professor says a better strategy is to \"deliberately generate your own independent estimate before you ever see the other side's number.\"",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The Renaissance and Linear Perspective (Art History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an art history class.

Professor: So we've been working our way into the Renaissance, and today I want to focus on what I'd argue is one of the most important technical breakthroughs in the entire history of Western art. It's called linear perspective. And it's the reason a flat painting from this period can suddenly look like a window you could step through into a real, three-dimensional space.

Let me set the stage. If you look at European paintings from the medieval period—say, the centuries before about 1400—you'll notice something. The space often looks flat, or strange. Figures might be sized according to their importance rather than their distance; a king could be painted larger than a building behind him. Buildings might tilt at odd angles. Now, medieval artists weren't incompetent—they had different goals. But what they generally lacked was a consistent mathematical system for showing depth on a flat surface.

That system arrived in early fifteenth-century Florence. The breakthrough is usually credited to the architect Filippo Brunelleschi, who around 1420 worked out the geometry of what we call one-point perspective. Here's the core idea. Imagine all the parallel lines that recede away from you—the edges of a tiled floor, the tops and bottoms of a row of columns. In perspective, those lines are drawn so that they all converge on a single point in the distance. We call that the vanishing point. And objects are drawn smaller in a regular, mathematical way as they get closer to that point. The result is a convincing illusion of depth.

Now, Brunelleschi demonstrated it, but it was another figure, Leon Battista Alberti, who wrote it down. In a treatise on painting, Alberti laid out the method in clear instructions that any painter could follow. And that's crucial—because once the technique was written and teachable, it spread rapidly. Perspective stopped being one architect's clever trick and became a standard part of an artist's training.

So what difference did it actually make? Enormous. For one thing, painters could now construct deep, believable architectural settings—grand halls, receding streets, rooms that felt genuinely spacious. But it went further than just realism. Because everything converged on a single vanishing point, the artist could place that point very deliberately—often right at the most important figure or object in the scene. So perspective became a tool not only for depicting space, but for directing the viewer's eye and organizing the entire composition around a focal point.

And I want you to appreciate how this connects to the broader spirit of the Renaissance. This was a period fascinated by mathematics, by observation, by the idea that the natural world follows rational, measurable rules. Linear perspective is, in a sense, that worldview applied to painting. It treats vision itself as something geometric—something you can calculate. So when we look at a Renaissance painting and feel that we're peering into real space, we're really looking at a marriage of art and mathematics, one that would define European painting for the next four hundred years.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The life of the architect Filippo Brunelleschi",
            "The development and significance of linear perspective in Renaissance art",
            "Why medieval artists refused to depict deep space",
            "How to mix paints used in Renaissance Florence",
          ],
          correct: 1,
          explanation: "The lecture explains what linear perspective is, who developed it, and why it mattered to Renaissance art.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, how was space often depicted in medieval paintings?",
          choices: [
            "With figures sized by importance rather than distance, and a flat or strange look",
            "With perfect mathematical accuracy",
            "Using a single vanishing point in every scene",
            "Without any human figures at all",
          ],
          correct: 0,
          explanation: "The professor says medieval space \"often looks flat, or strange,\" with figures \"sized according to their importance rather than their distance.\"",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "What is the vanishing point, according to the lecture?",
          choices: [
            "The point where a painting is signed by the artist",
            "The single distant point on which receding parallel lines converge",
            "The brightest area of color in a painting",
            "The spot where two paintings are joined together",
          ],
          correct: 1,
          explanation: "The vanishing point is the single point in the distance on which the receding parallel lines \"all converge.\"",
        },
        {
          id: "l5q4", qtype: "Organization",
          prompt: "Why does the professor mention Leon Battista Alberti?",
          choices: [
            "To show who first painted with bright colors",
            "To explain that Alberti wrote down the method so it could be taught and spread",
            "To prove that perspective was never used after Brunelleschi",
            "To argue that Alberti rejected the idea of perspective",
          ],
          correct: 1,
          explanation: "Alberti \"wrote it down\" in a treatise with clear instructions, so the technique became teachable and \"spread rapidly.\"",
        },
        {
          id: "l5q5", qtype: "Detail",
          prompt: "According to the professor, beyond creating realism, how could perspective be used?",
          choices: [
            "To make paintings appear flatter",
            "To direct the viewer's eye by placing the vanishing point at the most important figure",
            "To hide the most important figure from view",
            "To remove all architecture from a scene",
          ],
          correct: 1,
          explanation: "Because everything converged on one point, the artist could place it at the key figure, using perspective \"for directing the viewer's eye and organizing the entire composition.\"",
        },
        {
          id: "l5q6", qtype: "Inference",
          prompt: "What does the professor imply about the relationship between linear perspective and the Renaissance?",
          choices: [
            "Perspective had nothing to do with the ideas of the Renaissance.",
            "Perspective reflected the Renaissance interest in treating the world as rational and measurable.",
            "Perspective was rejected by Renaissance thinkers as unscientific.",
            "Perspective was used only outside of Italy during the Renaissance.",
          ],
          correct: 1,
          explanation: "The professor calls perspective the Renaissance worldview \"applied to painting,\" treating vision as geometric and calculable.",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some students prefer to live in a dormitory on campus. Others prefer to live off campus in an apartment. Which do you think is better, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your preference in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Starting next month, the university will launch a new campus-wide recycling program. Clearly labeled bins for paper, plastic, and glass will be placed in every building, and a short online tutorial on sorting waste will be required for all students.\n\n[Then you hear two students discussing the change. The woman supports the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines 'comparative advantage' — the principle that a person or country gains by specializing in what it can produce at a lower opportunity cost, and then trading for everything else, even if another party is more efficient at producing everything.\n\n[Then you hear a professor give an example of two neighbors who each specialize and trade.]",
      prompt: "Using the example from the lecture, explain the concept of comparative advantage.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two different ways that nocturnal animals locate food in the dark. The lecture contrasts echolocation, used by bats, with a highly developed sense of smell, used by certain other animals.",
      prompt: "Using the points and examples from the lecture, explain two ways nocturnal animals locate food in the dark.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general topic, then give BOTH methods from the lecture and contrast them (echolocation vs. sense of smell).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Some education experts argue that schools should switch to a "year-round" calendar, replacing the long summer break with shorter, more frequent breaks spread across the year. Supporters make three claims in its favor:

1. It prevents the "summer learning loss" that occurs when students forget material over a long break.
2. It makes better use of school buildings, which sit empty and wasted during the long summer.
3. It improves teacher morale because more frequent short breaks reduce burnout.

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

Professor: Young people spend an enormous amount of time on social media, yet they receive little formal instruction on how to use it wisely. In your opinion, should schools teach social-media literacy as a regular subject? Why or why not?

Mia (classmate): I think they absolutely should. Students need to learn how to spot misinformation and protect their privacy, and most won't pick up those skills on their own.

Liam (classmate): I'm not convinced. Schools are already overloaded, and social media changes so fast that anything taught in class would be out of date by the time students needed it.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
