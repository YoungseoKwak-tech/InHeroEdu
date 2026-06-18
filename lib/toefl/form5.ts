import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 5 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_5: ToeflForm = {
  id: "toefl-5",
  title: "TOEFL iBT Practice Test 5",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Silk Road and Cultural Exchange",
      passage:
`The term "Silk Road" refers not to a single paved highway but to a sprawling network of overland and maritime trade routes that, for well over a thousand years, linked the civilizations of China, Central Asia, India, Persia, and the Mediterranean world. The name itself is misleading in two ways. First, it was coined only in the nineteenth century by a German geographer, long after the routes had fallen into disuse. Second, although silk was indeed among the most prized goods carried westward from China, it was only one commodity among many. Spices, precious stones, glassware, horses, paper, and countless other items moved along these arteries, and the goods traveled in both directions rather than flowing only from east to west.

It is important to understand that very few merchants traveled the entire length of the network. The popular image of a single caravan setting out from the Chinese capital and arriving, months later, in Rome is largely a myth. In reality, goods passed through many hands. A bolt of silk might be exchanged a dozen times, carried by a succession of local traders who each covered only a portion of the route before selling their cargo to the next merchant. At each transfer the price rose, which is one reason silk was so extraordinarily expensive by the time it reached the Mediterranean. This relay system also meant that the people at one end of the network often had only the vaguest notion of who lived at the other end.

If the Silk Road's economic role is well known, its cultural consequences were arguably even more profound. Along with merchandise, the routes carried ideas, technologies, artistic styles, and religions. Buddhism, for instance, spread from India into China largely along these trade routes, carried by missionaries and merchants who built monasteries at the oasis towns where caravans rested. Technologies moved as well: papermaking, a Chinese invention, gradually made its way westward and eventually transformed record-keeping and learning in Europe and the Islamic world. Artistic motifs migrated too, so that designs originating in one culture reappeared, subtly altered, in the crafts of distant peoples.

The oasis cities that dotted the network deserve special attention, for they were the true engines of exchange. Towns such as Samarkand and Kashgar grew wealthy not by producing trade goods themselves but by serving as marketplaces, resting points, and centers of finance where caravans could be provisioned and merchants could exchange currencies. These cities became remarkably cosmopolitan. In a single bustling market one might encounter speakers of a dozen languages and followers of several different faiths conducting business side by side. Such cities demonstrate that the Silk Road was not merely a conduit for objects but a setting in which diverse peoples regularly mingled.

The network did not last forever. Several developments contributed to its decline. The rise of large, stable empires that could guarantee safe passage had once encouraged trade, but political fragmentation and the spread of disease later disrupted it. The catastrophic epidemics of the fourteenth century, which themselves traveled along the trade routes, devastated populations across Eurasia. More decisively, the eventual opening of direct sea routes between Europe and Asia allowed ships to carry bulk goods far more cheaply than caravans ever could. By the early modern period, the maritime routes had largely supplanted the old overland network. Yet the legacy of the Silk Road endured. For more than a millennium it had stitched together distant societies, demonstrating that even cultures separated by deserts and mountains could profoundly influence one another through the patient, indirect work of exchange.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, in what two ways is the term \"Silk Road\" misleading?",
          choices: [
            "It was coined in China, and it referred only to land routes.",
            "It was coined long after the routes' use, and silk was only one of many goods.",
            "It described a single highway, and it ignored maritime trade entirely.",
            "It was invented by merchants, and it overstated the value of silk.",
          ],
          correct: 1,
          explanation: "Paragraph 1 says the name was \"coined only in the nineteenth century... long after the routes had fallen into disuse,\" and that silk \"was only one commodity among many.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"arteries\" in paragraph 1 is closest in meaning to",
          choices: ["barriers", "routes", "markets", "borders"],
          correct: 1,
          explanation: "Here \"arteries\" is a metaphor for the trade routes along which goods \"moved... in both directions.\"",
        },
        {
          id: "r1q3", qtype: "Rhetorical Purpose",
          prompt: "Why does the author describe the \"relay system\" in paragraph 2?",
          choices: [
            "To prove that a single caravan traveled from China to Rome",
            "To explain why silk became so expensive and why the two ends had little knowledge of each other",
            "To argue that merchants preferred sea routes to land routes",
            "To show that silk was the only commodity worth trading",
          ],
          correct: 1,
          explanation: "The relay of many traders, each raising the price, explains both silk's high cost and why people at one end had \"only the vaguest notion of who lived at the other end.\"",
        },
        {
          id: "r1q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, how did Buddhism spread from India into China?",
          choices: [
            "Through military conquest by Indian armies",
            "Along the trade routes, carried by missionaries and merchants who built monasteries",
            "By means of sea routes that bypassed Central Asia",
            "Through books printed on Chinese paper",
          ],
          correct: 1,
          explanation: "Paragraph 3 says Buddhism \"spread from India into China largely along these trade routes, carried by missionaries and merchants who built monasteries at the oasis towns.\"",
        },
        {
          id: "r1q5", qtype: "Inference",
          prompt: "What can be inferred from paragraph 4 about cities such as Samarkand and Kashgar?",
          choices: [
            "They owed their wealth chiefly to the goods they manufactured.",
            "They prospered mainly because of their role in handling and supporting trade.",
            "They were inhabited by people of only one language and faith.",
            "They declined as soon as the Silk Road was established.",
          ],
          correct: 1,
          explanation: "The passage says these cities \"grew wealthy not by producing trade goods themselves but by serving as marketplaces, resting points, and centers of finance,\" implying their prosperity came from their role in trade.",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"Such cities demonstrate that the Silk Road was not merely a conduit for objects but a setting in which diverse peoples regularly mingled.\"",
          choices: [
            "These cities show the Silk Road moved objects but kept different peoples apart.",
            "These cities show the Silk Road carried goods and also brought different peoples together.",
            "These cities prove the Silk Road was used only for trading objects.",
            "These cities prove that diverse peoples avoided the Silk Road's markets.",
          ],
          correct: 1,
          explanation: "The sentence means the Silk Road was both a channel for goods and a place where varied peoples mixed. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 5, what eventually allowed goods to be carried more cheaply than caravans could manage?",
          choices: [
            "The building of new paved roads across the deserts",
            "The rise of large empires that guaranteed safe passage",
            "The opening of direct sea routes between Europe and Asia",
            "The end of the fourteenth-century epidemics",
          ],
          correct: 2,
          explanation: "The passage states that \"the eventual opening of direct sea routes between Europe and Asia allowed ships to carry bulk goods far more cheaply than caravans ever could.\"",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, all of the following contributed to the decline of the Silk Road EXCEPT:",
          choices: [
            "Political fragmentation that disrupted safe travel",
            "Devastating epidemics that spread along the routes",
            "Cheaper transport of goods by sea",
            "A sudden lack of demand for silk in Europe",
          ],
          correct: 3,
          explanation: "The paragraph cites political fragmentation, epidemics, and cheaper sea transport. It never mentions a collapse in demand for silk.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 4?\n\n\"In effect, they functioned as the great trading hubs of their day.\"",
          choices: [
            "Before \"The oasis cities that dotted the network deserve special attention...\"",
            "After \"...where caravans could be provisioned and merchants could exchange currencies.\"",
            "After \"...followers of several different faiths conducting business side by side.\"",
            "Before \"Such cities demonstrate that the Silk Road was not merely a conduit...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence summarizes the cities' role as provisioning and financial centers, so it fits best right after that description.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"The Silk Road was a network of trade routes that profoundly connected distant civilizations.\"",
          choices: [
            "Goods passed through many traders in a relay system rather than along one continuous journey.",
            "The routes carried not only goods but also religions, technologies, and artistic styles between cultures.",
            "Oasis cities served as cosmopolitan hubs of trade, finance, and cultural mixing.",
            "Silk was the only commodity ever carried along the routes.",
            "A single caravan typically traveled the whole distance from China to Rome.",
            "The Silk Road was named in the nineteenth century by a Chinese emperor.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "The key ideas are the relay trade system (A), the exchange of ideas and culture (B), and the role of oasis cities (C). D, E, and F are explicitly contradicted by the passage.",
        },
      ],
    },
    {
      id: "r2",
      title: "Circadian Rhythms and Human Sleep",
      passage:
`Nearly every living organism, from bacteria to human beings, keeps time. Hidden within our cells is a biological clock that drives a roughly twenty-four-hour cycle of physiological changes known as a circadian rhythm, from the Latin words meaning "about a day." This internal timekeeper governs far more than the simple alternation of sleep and wakefulness. It also regulates body temperature, the release of hormones, blood pressure, and even the pace at which the body processes food and medicine. The result is that our bodies are, in a sense, profoundly different at different hours of the day, anticipating regular events rather than merely reacting to them.

The master clock in human beings resides in a tiny cluster of nerve cells in the brain called the suprachiasmatic nucleus, often abbreviated SCN. Remarkably, the rhythms generated by this clock persist even in total isolation. In experiments in which volunteers lived for weeks in underground rooms with no clocks, no windows, and no cues about the time of day, their bodies continued to follow a regular cycle of sleeping and waking. This demonstrated that the rhythm is generated internally rather than imposed from outside. Interestingly, however, the cycle these isolated volunteers settled into was usually not exactly twenty-four hours long; for most people it ran slightly longer, often closer to twenty-four and a half hours.

This small discrepancy points to a crucial feature of the system. Because the internal clock does not keep perfect twenty-four-hour time on its own, it must be reset each day to stay synchronized with the external world. The most powerful signal for this resetting is light. Specialized cells in the retina detect the brightness of the surrounding environment and send that information directly to the SCN. Morning light, in particular, nudges the clock so that it remains aligned with the actual day. Without such daily correction, the internal rhythm would gradually drift out of step with the rising and setting of the sun.

Understanding this mechanism helps explain the discomfort of jet lag. When a traveler crosses several time zones, the external cues—light and darkness—suddenly disagree with the internal clock, which is still set to the time at the point of departure. The body's many rhythms become temporarily uncoupled from the local day, producing fatigue, poor concentration, and disturbed sleep. Recovery is gradual because the clock can shift only a limited amount each day, which is why jet lag may persist for several days after a long flight. Notably, travel in one direction tends to be harder to adjust to than travel in the other, a pattern that reflects the clock's natural tendency to run slightly long.

The implications of circadian biology reach well beyond travel. Modern life frequently places people in conflict with their internal clocks. Shift workers, who must remain alert during the night and sleep during the day, are essentially fighting their own physiology, and studies have linked chronic disruption of circadian rhythms to a range of health problems. Even the widespread use of bright artificial light and glowing screens late at night can confuse the system, since the clock interprets such light as a signal that it is still daytime, delaying the onset of sleep. Researchers increasingly argue that respecting the body's natural timing—seeking bright light in the morning and dimmer surroundings at night—is not a trivial matter of comfort but an important component of long-term health.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, the circadian rhythm regulates all of the following EXCEPT:",
          choices: [
            "the release of hormones",
            "body temperature",
            "the color of the skin",
            "blood pressure",
          ],
          correct: 2,
          explanation: "Paragraph 1 lists body temperature, hormone release, and blood pressure (as well as food and medicine processing). Skin color is never mentioned.",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The word \"persist\" in paragraph 2 is closest in meaning to",
          choices: ["disappear", "continue", "weaken", "reverse"],
          correct: 1,
          explanation: "The rhythms \"persist even in total isolation\" — that is, they continue without external cues.",
        },
        {
          id: "r2q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what did the experiments with volunteers in underground rooms demonstrate?",
          choices: [
            "That the sleep cycle depends entirely on seeing clocks",
            "That the rhythm is generated internally rather than imposed from outside",
            "That people stop sleeping when deprived of light",
            "That the cycle is always exactly twenty-four hours long",
          ],
          correct: 1,
          explanation: "Even without time cues, the volunteers kept a regular cycle, which \"demonstrated that the rhythm is generated internally rather than imposed from outside.\"",
        },
        {
          id: "r2q4", qtype: "Detail",
          prompt: "According to paragraph 3, why must the internal clock be reset each day?",
          choices: [
            "Because it stops working during the night",
            "Because it does not keep perfect twenty-four-hour time on its own",
            "Because light damages the cells of the SCN",
            "Because the SCN moves position within the brain",
          ],
          correct: 1,
          explanation: "Since the clock runs slightly off twenty-four hours, \"it must be reset each day to stay synchronized with the external world.\"",
        },
        {
          id: "r2q5", qtype: "Factual Information",
          prompt: "According to paragraph 3, what is the most powerful signal for resetting the internal clock?",
          choices: ["temperature", "food", "light", "exercise"],
          correct: 2,
          explanation: "The passage states that \"the most powerful signal for this resetting is light,\" detected by specialized cells in the retina.",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author discuss jet lag in paragraph 4?",
          choices: [
            "To prove that the internal clock does not really exist",
            "To illustrate what happens when external cues and the internal clock disagree",
            "To argue that travelers should avoid crossing time zones",
            "To explain how the retina detects light",
          ],
          correct: 1,
          explanation: "Jet lag is used as a concrete illustration: when external cues \"suddenly disagree with the internal clock,\" the rhythms become uncoupled, producing fatigue and poor sleep.",
        },
        {
          id: "r2q7", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"Recovery is gradual because the clock can shift only a limited amount each day, which is why jet lag may persist for several days after a long flight.\"",
          choices: [
            "Jet lag lasts only a single day because the clock adjusts instantly.",
            "Because the clock can move just a little each day, jet lag can take several days to fade.",
            "The clock never adjusts after a long flight, so jet lag is permanent.",
            "Jet lag is gradual because long flights damage the body's clock.",
          ],
          correct: 1,
          explanation: "The sentence means the clock's limited daily shift makes recovery slow, so jet lag can last several days. Choice B restates this accurately.",
        },
        {
          id: "r2q8", qtype: "Inference",
          prompt: "What can be inferred from paragraph 5 about using bright screens late at night?",
          choices: [
            "It has no effect on the body's internal clock.",
            "It can make falling asleep harder by signaling that it is still daytime.",
            "It helps reset the clock the way morning light does.",
            "It is the main cause of all health problems in shift workers.",
          ],
          correct: 1,
          explanation: "The clock \"interprets such light as a signal that it is still daytime, delaying the onset of sleep,\" implying late-night screens make falling asleep harder.",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 3?\n\n\"Sunrise thus serves as a kind of daily correction for an imperfect clock.\"",
          choices: [
            "Before \"This small discrepancy points to a crucial feature of the system.\"",
            "After \"...send that information directly to the SCN.\"",
            "After \"...nudges the clock so that it remains aligned with the actual day.\"",
            "Before \"The most powerful signal for this resetting is light.\"",
          ],
          correct: 2,
          explanation: "The inserted sentence restates how morning light corrects the clock, so it fits best right after the sentence describing morning light nudging the clock into alignment.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Circadian rhythms are internal clocks that govern human physiology and must stay in step with the day.\"",
          choices: [
            "A clock in the brain (the SCN) drives a roughly daily cycle that persists even without external cues.",
            "Because the internal clock is not exactly twenty-four hours, light—especially morning light—resets it each day.",
            "Disrupting circadian rhythms, as in jet lag, shift work, or late-night light, can impair function and health.",
            "The internal clock keeps perfect twenty-four-hour time and never needs adjustment.",
            "Sleep and wakefulness are the only processes the circadian clock controls.",
            "Removing all light from a person's environment immediately stops the sleep cycle.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "The key ideas are the internal SCN clock (A), daily resetting by light (B), and the consequences of disruption (C). D, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (2 conversations + 3 lectures · 28 Q) ────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Library Staff",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a member of the library staff.

Student: Hi, um, I got an email saying I have a fine on my account? Something about an overdue book, but I'm pretty sure I returned everything weeks ago.

Librarian: Let's take a look. Can I have your student ID number? ... Okay, here we go. It says you checked out a book called Foundations of Macroeconomics back in March, and our records show it was never returned.

Student: That can't be right. I definitely brought that back. I remember dropping it in the return slot outside the main entrance the night before spring break.

Librarian: Ah, the outside slot. That actually might be the issue. When a book goes in the after-hours slot, it doesn't get checked back in until a staff member processes it the next morning. If it was the night before a holiday, there can be a backlog. But the system should still have caught up by now, so let me search the shelves.

Student: So the fine is, what, fifteen dollars? That seems like a lot for one book.

Librarian: It's actually charged per day after the due date, which is why it adds up. But hold on—don't worry about the amount yet. If we locate the book, we waive the fine entirely, because that means it was returned and just got lost in processing on our end.

Student: Oh, okay, that's a relief. So what happens now?

Librarian: I'll put in a "search request." Someone will check the macroeconomics section and the sorting room over the next two days. About eighty percent of the time, the book turns up right where it should be. I'll email you either way.

Student: And if it doesn't turn up?

Librarian: Then we'd have a conversation about a replacement cost, but honestly, let's not get ahead of ourselves. In your situation—returned through the slot before a holiday—the book almost always surfaces. For now, I'm putting a hold on the fine so it stops growing while we search.

Student: That's great, thank you. I was worried I'd have to pay for a book I already gave back.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What is the main reason the student has come to the library?",
          choices: [
            "To check out a macroeconomics textbook",
            "To dispute a fine for a book she believes she returned",
            "To ask for help finding sources for a paper",
            "To pay a replacement cost for a lost book",
          ],
          correct: 1,
          explanation: "The student says she received an email about a fine for an overdue book but is sure she returned it, and the conversation centers on resolving that.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "According to the librarian, why might the returned book not have been checked in?",
          choices: [
            "The student returned it to the wrong library branch.",
            "Books in the after-hours slot are processed the next morning, and a holiday caused a backlog.",
            "The student forgot to scan the book at the self-checkout.",
            "The book was damaged and removed from circulation.",
          ],
          correct: 1,
          explanation: "The librarian explains that the outside slot's books \"don't get checked back in until a staff member processes it the next morning,\" and before a holiday \"there can be a backlog.\"",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "Why is the fine as large as it is?",
          choices: [
            "It includes the full replacement cost of the book.",
            "It is charged per day after the due date.",
            "It doubles each week the book is overdue.",
            "It includes a penalty for using the outside slot.",
          ],
          correct: 1,
          explanation: "The librarian says the fine \"is actually charged per day after the due date, which is why it adds up.\"",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "What does the librarian mean when she says, \"let's not get ahead of ourselves\"?",
          choices: [
            "They should not discuss a replacement cost until the search is complete.",
            "The student should leave and come back another day.",
            "The fine must be paid immediately.",
            "The book has definitely been lost for good.",
          ],
          correct: 0,
          explanation: "She uses the phrase to say there is no need to worry about replacement costs yet, because the book usually turns up in such situations.",
        },
        {
          id: "l1q5", qtype: "Inference",
          prompt: "What can be inferred about the fine while the search is taking place?",
          choices: [
            "It will continue to increase each day.",
            "It has been put on hold so it will stop growing.",
            "It has already been paid by the student.",
            "It will be transferred to another student's account.",
          ],
          correct: 1,
          explanation: "The librarian says, \"I'm putting a hold on the fine so it stops growing while we search.\"",
        },
      ],
    },
    {
      id: "l2",
      title: "Conversation: Student and Career Center Advisor",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and an advisor at the campus career center.

Advisor: Hi there, come on in. So you signed up for a slot about applying for internships—is there a specific one you have in mind, or are you just getting started?

Student: A bit of both, honestly. There's a summer internship at a marketing firm downtown that I really want. But every time I sit down to apply, I freeze up. The application asks for a cover letter, and I have no idea what to even put in it.

Advisor: That's completely normal—cover letters are the part almost everyone dreads. Let me ask you this first: have you already done your résumé?

Student: Yeah, I had it reviewed here last month. I think it's solid.

Advisor: Great, that's half the battle. So the thing to understand about a cover letter is that it is not just your résumé in paragraph form. The résumé lists what you've done. The cover letter explains why those things make you the right fit for this specific role. So the first thing I'd do is read the internship posting very carefully and pull out two or three skills they emphasize.

Student: Okay, so for this one they keep mentioning "social media campaigns" and "working with data."

Advisor: Perfect. Those become the spine of your letter. For each one, you give a short, concrete example from your own experience—a class project, a club, a part-time job—where you actually did that thing. Specific beats general every time. Don't write "I am a hard worker." Write "I ran the Instagram account for our student film festival and grew it by forty percent."

Student: Oh, that's way more concrete than what I was writing. Should I send it to you before I submit?

Advisor: Absolutely, that's exactly what we're here for. Draft it this week using those two skills as your anchors, then book a follow-up and we'll polish it together. And one practical note—check the deadline. A lot of these summer positions stop reviewing applications well before the official closing date, so earlier is always better.

Student: Got it. I'll have a draft by Friday. Thank you, this makes it feel a lot less overwhelming.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Purpose",
          prompt: "Why does the student go to the career center?",
          choices: [
            "To have her résumé reviewed for the first time",
            "To get help writing a cover letter for an internship application",
            "To search for a list of available internships",
            "To practice for a job interview",
          ],
          correct: 1,
          explanation: "The student says she wants a specific internship but freezes up on the cover letter, and the advisor focuses on how to write it.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "According to the advisor, how is a cover letter different from a résumé?",
          choices: [
            "A cover letter simply restates the résumé in paragraph form.",
            "A cover letter explains why the applicant fits the specific role, rather than just listing accomplishments.",
            "A cover letter is shorter and contains no examples.",
            "A cover letter lists skills, while a résumé explains them.",
          ],
          correct: 1,
          explanation: "The advisor says a cover letter \"is not just your résumé in paragraph form\"; it \"explains why those things make you the right fit for this specific role.\"",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "What does the advisor tell the student to do first when writing the letter?",
          choices: [
            "Copy the wording directly from her résumé",
            "Read the posting carefully and identify two or three skills it emphasizes",
            "Write a general statement about being a hard worker",
            "Contact the marketing firm to ask about the role",
          ],
          correct: 1,
          explanation: "The advisor says to \"read the internship posting very carefully and pull out two or three skills they emphasize,\" which become the spine of the letter.",
        },
        {
          id: "l2q4", qtype: "Function",
          prompt: "Why does the advisor contrast \"I am a hard worker\" with the example about the film festival Instagram account?",
          choices: [
            "To show that the student should not mention clubs in a cover letter",
            "To illustrate that specific, concrete examples are stronger than vague claims",
            "To suggest the student lacks relevant experience",
            "To explain how to format the résumé differently",
          ],
          correct: 1,
          explanation: "The advisor uses the contrast to make the point that \"specific beats general every time,\" preferring a concrete achievement over a vague claim.",
        },
        {
          id: "l2q5", qtype: "Detail",
          prompt: "What practical advice does the advisor give about the application deadline?",
          choices: [
            "Applications are accepted only after the official closing date.",
            "Many summer positions stop reviewing well before the official deadline, so applying early is better.",
            "The deadline does not matter for internships.",
            "The student should wait until the deadline to submit her strongest draft.",
          ],
          correct: 1,
          explanation: "The advisor notes that \"a lot of these summer positions stop reviewing applications well before the official closing date, so earlier is always better.\"",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: Renewable Energy — Wind and Solar Power (Environmental Science)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an environmental science class.

Professor: So we've been talking about the shift away from fossil fuels, and today I want to focus on the two renewable sources that get the most attention: wind power and solar power. And I want to do more than just say "they're clean and good." I want you to understand both their real strengths and a genuine challenge they share—one that turns out to be the central engineering problem for both.

Let's start with the basics. Wind power works by using the moving air to turn the blades of a turbine, which spins a generator and produces electricity. Solar power, in the most common form, works differently—photovoltaic panels convert sunlight directly into electricity using semiconductor materials. Two completely different physical processes. But notice what they have in common: neither one burns anything. There's no smoke, no carbon dioxide released while they operate. That's the headline advantage, and it's a real one.

Now, here's the obvious benefit people focus on: once you've built a wind turbine or a solar panel, the "fuel"—the wind, the sunlight—is free and essentially unlimited. You're not buying coal or gas every month. So over the long run, the operating costs are very low.

But—and this is the part I really want you to sit with—both of these sources share a fundamental problem. It's called intermittency. The wind doesn't always blow. The sun doesn't always shine—it's gone every single night, and it's weak on cloudy days. So the electricity these sources produce is variable. It's not steady and on-demand the way a gas plant is. And here's why that matters so much: on an electrical grid, supply has to match demand almost exactly, moment to moment. If people are using a lot of power on a calm, cloudy evening, your wind and solar might be producing very little, precisely when you need it most.

So how do we deal with intermittency? This is where a lot of current research is focused, and there are basically three approaches. The first is storage—mainly large batteries that charge up when there's surplus wind or sun, and then release that energy later when production drops. The second is building a wider, better-connected grid, so that if it's calm in one region, power can be imported from another region where the wind is blowing. And the third is simply combining sources—wind and solar often complement each other, since it's frequently windier at night and on cloudy days when solar is weak.

So let me leave you with the key takeaway. The advantages of wind and solar—no emissions, free fuel—are clear and significant. But don't walk away thinking the problem is solved. The defining engineering challenge of renewable energy isn't generating the power. It's dealing with the fact that nature delivers it on its own schedule, not ours.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The history of fossil fuel use in industry",
            "The advantages of wind and solar power and the shared challenge of intermittency",
            "How semiconductor materials are manufactured",
            "Why batteries are dangerous to the environment",
          ],
          correct: 1,
          explanation: "The professor explains how wind and solar work, their advantages, and dwells on intermittency as their central shared problem.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, how does a photovoltaic solar panel produce electricity?",
          choices: [
            "By burning a clean fuel to heat water",
            "By using moving air to spin a turbine",
            "By converting sunlight directly into electricity with semiconductor materials",
            "By storing heat in large underground tanks",
          ],
          correct: 2,
          explanation: "The professor says photovoltaic panels \"convert sunlight directly into electricity using semiconductor materials.\"",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "What does the professor identify as the \"headline advantage\" shared by wind and solar?",
          choices: [
            "They produce electricity at a perfectly steady rate.",
            "They burn nothing, releasing no smoke or carbon dioxide while operating.",
            "They require no construction or up-front cost.",
            "They can store energy without batteries.",
          ],
          correct: 1,
          explanation: "He notes that \"neither one burns anything. There's no smoke, no carbon dioxide released while they operate. That's the headline advantage.\"",
        },
        {
          id: "l3q4", qtype: "Detail",
          prompt: "Why does intermittency create a serious problem for the electrical grid?",
          choices: [
            "Because supply must match demand almost exactly at every moment",
            "Because batteries cannot store any electricity",
            "Because wind and solar produce too much power at night",
            "Because fossil fuel plants cannot connect to the grid",
          ],
          correct: 0,
          explanation: "The professor stresses that \"on an electrical grid, supply has to match demand almost exactly, moment to moment,\" which variable sources struggle to do.",
        },
        {
          id: "l3q5", qtype: "Organization",
          prompt: "How does the professor organize his discussion of solutions to intermittency?",
          choices: [
            "By comparing renewable energy to nuclear power",
            "By presenting three approaches: storage, a wider connected grid, and combining sources",
            "By describing the history of each solution in order",
            "By listing the costs of building wind turbines",
          ],
          correct: 1,
          explanation: "He says \"there are basically three approaches\" and lists storage (batteries), a wider better-connected grid, and combining complementary sources.",
        },
        {
          id: "l3q6", qtype: "Inference",
          prompt: "What does the professor imply when he says nature delivers power \"on its own schedule, not ours\"?",
          choices: [
            "Wind and solar will never be useful sources of energy.",
            "The main challenge of renewables is managing their variable timing, not generating the power.",
            "Engineers have already fully solved the problem of intermittency.",
            "Fossil fuels are more environmentally friendly than renewables.",
          ],
          correct: 1,
          explanation: "He concludes that the defining challenge \"isn't generating the power\" but dealing with the fact that the supply is variable and not on demand.",
        },
      ],
    },
    {
      id: "l4",
      title: "Lecture: The Cognitive Benefits of Bilingualism (Linguistics/Psychology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a psychology class.

Professor: Today I want to talk about bilingualism—people who speak two languages fluently—and specifically about a question that has fascinated researchers for the past few decades: does speaking two languages actually change the way the brain works? And the short answer, which I'll spend the rest of the lecture unpacking, is: yes, in some interesting and surprisingly specific ways.

Now, let's start by clearing away an old misconception. For a long time, well into the twentieth century, many educators believed that raising a child with two languages was harmful. The worry was that the two languages would compete, confuse the child, and slow down learning. We now know that this fear was largely unfounded. Bilingual children do sometimes have a slightly smaller vocabulary in each individual language, especially when young, but their total vocabulary across both languages is comparable to their peers, and any early differences tend to even out.

So if it's not harmful, is it actually beneficial? Here's where it gets interesting. The key insight is this: a bilingual person's two languages are both active, all the time, even when only one is being used. Think about that. When a Spanish-English bilingual is speaking English, the Spanish words for things are not switched off. They're right there, active, competing. So the brain has to constantly manage this—it has to select the right language and suppress the other one. It's doing this all day, every day, for years.

And that constant practice appears to strengthen a set of mental abilities we call "executive function." This is the brain's management system—it's what lets you focus your attention, ignore distractions, and switch flexibly between tasks. The argument is that because bilinguals are constantly exercising the mental "muscle" that suppresses one language to use another, that same muscle gets stronger for other tasks too. In experiments, bilinguals often perform a little better on tasks that require ignoring misleading information or rapidly switching between rules.

Now, I want to be careful and honest here, because this is an area of active scientific debate. Some of the early studies showing big bilingual advantages have been hard to reproduce, and a few researchers now argue the effect is smaller than was once claimed, or shows up only under certain conditions. So I don't want you to leave thinking bilingualism makes you a genius. It doesn't.

But there's one finding that has held up more robustly, and it's genuinely striking. It concerns aging. Several studies suggest that lifelong bilingualism is associated with a delay—on the order of several years—in the onset of the symptoms of dementia. The leading idea is what researchers call "cognitive reserve." A lifetime of mental exercise doesn't necessarily prevent the underlying disease, but it seems to build up a kind of buffer, allowing the brain to cope with damage for longer before symptoms appear. And that, I think, is the most important practical takeaway from all this research.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How children learn their first language",
            "Whether and how speaking two languages affects the brain",
            "The best methods for teaching a foreign language",
            "Why some languages are harder to learn than others",
          ],
          correct: 1,
          explanation: "The professor focuses on the question of whether bilingualism changes how the brain works, discussing executive function and cognitive reserve.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "What old misconception about bilingual children does the professor correct?",
          choices: [
            "That bilingual children never learn to read",
            "That raising a child with two languages is harmful and confusing",
            "That bilingual children have a larger vocabulary than others",
            "That bilingualism guarantees higher intelligence",
          ],
          correct: 1,
          explanation: "He explains that educators once believed two languages would \"compete, confuse the child, and slow down learning,\" a fear now known to be largely unfounded.",
        },
        {
          id: "l4q3", qtype: "Detail",
          prompt: "According to the professor, what is the \"key insight\" about how a bilingual person's brain works?",
          choices: [
            "Only one of the two languages is ever active at a time.",
            "Both languages are active all the time, so the brain must constantly select one and suppress the other.",
            "The two languages are stored in completely separate parts of the brain.",
            "Bilinguals forget one language as they master the other.",
          ],
          correct: 1,
          explanation: "He says a bilingual's two languages \"are both active, all the time,\" so the brain must \"select the right language and suppress the other one.\"",
        },
        {
          id: "l4q4", qtype: "Detail",
          prompt: "How does the professor explain the connection between bilingualism and executive function?",
          choices: [
            "Constantly suppressing one language strengthens the same mental abilities used for focus and task-switching.",
            "Bilinguals have larger brains than monolinguals.",
            "Executive function is needed only for learning vocabulary.",
            "Bilingualism replaces executive function with a new system.",
          ],
          correct: 0,
          explanation: "The argument is that exercising the \"muscle\" that suppresses one language \"gets stronger for other tasks too,\" such as ignoring distractions and switching rules.",
        },
        {
          id: "l4q5", qtype: "Attitude",
          prompt: "What is the professor's attitude toward the early studies showing large bilingual advantages?",
          choices: [
            "He fully accepts them without reservation.",
            "He is cautious, noting that some results have been hard to reproduce and may be smaller than claimed.",
            "He dismisses bilingualism research as worthless.",
            "He believes bilingualism makes people far more intelligent.",
          ],
          correct: 1,
          explanation: "He says he wants to be \"careful and honest,\" noting some early studies \"have been hard to reproduce\" and the effect may be smaller or conditional.",
        },
        {
          id: "l4q6", qtype: "Detail",
          prompt: "According to the professor, what does the concept of \"cognitive reserve\" help explain?",
          choices: [
            "Why bilingual children have smaller vocabularies",
            "Why lifelong bilingualism is associated with a delay in dementia symptoms",
            "Why some languages are easier to learn than others",
            "Why bilinguals switch between languages so quickly",
          ],
          correct: 1,
          explanation: "Cognitive reserve is the leading idea for why bilingualism is linked to a delay in dementia symptoms—a mental \"buffer\" letting the brain cope with damage longer.",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The Invention of the Telescope and Galileo (Astronomy/History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an astronomy and history of science class.

Professor: Alright, today we're going to talk about an instrument that, quite literally, changed our picture of the universe: the telescope. And I want to make an important distinction up front, because it surprises a lot of students. Galileo did not invent the telescope. That's a common myth. What Galileo did was arguably more important—but let's get the history straight.

The telescope first appeared in the Netherlands around 1608. The credit usually goes to a spectacle-maker named Hans Lippershey, who applied for a patent on a device for "seeing things far away as if they were nearby." Now, these first telescopes were not made for astronomy at all. They were marketed as practical tools—for sailors to spot ships on the horizon, for merchants, for the military. They were essentially novelty items and instruments of commerce and war.

So here's where Galileo comes in. In 1609, Galileo, who was working in Italy, heard about this Dutch invention. He never saw one himself, but based only on the description, he figured out the optics and built his own—and crucially, he kept improving it until it was far more powerful than the originals. And then he did the thing that mattered: he pointed it at the night sky. That simple act—turning this commercial gadget upward—is what makes him so important.

And what he saw was revolutionary. Let me give you the highlights. He looked at the Moon and saw that it was not a smooth, perfect sphere, as had long been believed, but covered in mountains and craters—a rugged world, like the Earth. He looked at the Milky Way and discovered it was not a cloud but was made of countless individual stars. And perhaps most famously, he looked at Jupiter, and over several nights he saw four little points of light that changed position—he realized they were moons, orbiting Jupiter.

Now, why was that last observation so explosive? Because at the time, the accepted view was that everything in the heavens revolved around the Earth. But here were four objects clearly orbiting something that was not the Earth. It was direct, visual evidence that the Earth was not the center of all motion. It supported the controversial idea, proposed by Copernicus, that the Earth and planets orbit the Sun.

So let's be precise about Galileo's real achievement. He didn't invent the tool. His genius was in two things: dramatically improving the instrument, and—even more importantly—recognizing that it could be turned into a scientific instrument, a way to gather new evidence about nature. He transformed a merchant's spyglass into the foundation of modern observational astronomy. And the lesson there is a recurring one in the history of science: sometimes the great breakthrough isn't a new invention at all. It's seeing a new use for something that already exists.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How spectacle-makers in the Netherlands ran their businesses",
            "Galileo's real contribution to the telescope and astronomy",
            "The complete life story of Galileo",
            "How modern telescopes are built today",
          ],
          correct: 1,
          explanation: "The professor distinguishes who invented the telescope from what Galileo actually did, focusing on Galileo's improvements and astronomical observations.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, who is usually credited with the first telescope, and what was it used for?",
          choices: [
            "Galileo, who used it for astronomy",
            "Hans Lippershey, whose device was marketed for practical uses like spotting ships",
            "Copernicus, who used it to study the Sun",
            "An Italian merchant, who used it for navigation only",
          ],
          correct: 1,
          explanation: "Credit \"usually goes to a spectacle-maker named Hans Lippershey,\" and the first telescopes were marketed as practical tools for sailors, merchants, and the military.",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "How did Galileo come to build his own telescope?",
          choices: [
            "He bought one of the original Dutch telescopes.",
            "He heard a description of the Dutch invention and worked out the optics himself, then improved it.",
            "He was given a patent by Hans Lippershey.",
            "He copied a design printed in a scientific book.",
          ],
          correct: 1,
          explanation: "Galileo \"never saw one himself, but based only on the description, he figured out the optics and built his own,\" and kept improving it.",
        },
        {
          id: "l5q4", qtype: "Detail",
          prompt: "What did Galileo observe when he looked at the Moon?",
          choices: [
            "That it was a smooth, perfect sphere",
            "That it was covered in mountains and craters, like a rugged world",
            "That it was made of countless individual stars",
            "That it had four small moons orbiting it",
          ],
          correct: 1,
          explanation: "He saw the Moon \"was not a smooth, perfect sphere... but covered in mountains and craters—a rugged world, like the Earth.\"",
        },
        {
          id: "l5q5", qtype: "Organization",
          prompt: "Why does the professor describe Galileo's observation of Jupiter's moons in detail?",
          choices: [
            "To explain how telescopes were manufactured",
            "To show it provided direct visual evidence that not everything orbits the Earth",
            "To prove that Jupiter is larger than the Earth",
            "To argue that Galileo invented the telescope",
          ],
          correct: 1,
          explanation: "The four moons orbiting Jupiter were \"direct, visual evidence that the Earth was not the center of all motion,\" supporting the Copernican idea.",
        },
        {
          id: "l5q6", qtype: "Inference",
          prompt: "What broader lesson about scientific discovery does the professor draw from Galileo's story?",
          choices: [
            "Great breakthroughs always require entirely new inventions.",
            "Sometimes the breakthrough is seeing a new use for something that already exists.",
            "Commercial tools are never useful for science.",
            "Scientists should avoid improving existing instruments.",
          ],
          correct: 1,
          explanation: "He concludes that \"sometimes the great breakthrough isn't a new invention at all. It's seeing a new use for something that already exists.\"",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people believe that it is important for students to study history. Others think students should focus on subjects that are more directly useful for future careers. Do you think it is important for students to study history? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your position in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Beginning next month, the main campus cafeteria will go completely cashless. Students will be able to pay only with their student ID card or a mobile payment app; cash will no longer be accepted. The university says the change will speed up checkout lines and reduce the cost of handling money.\n\n[Then you hear two students discussing the change. The woman disagrees with the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines the 'placebo effect' — a phenomenon in which a patient experiences a real improvement in symptoms after receiving a treatment that has no active medical ingredient, simply because the patient believes the treatment will work.\n\n[Then you hear a professor describe an experiment with patients who were given sugar pills for pain.]",
      prompt: "Using the example from the lecture, explain the concept of the placebo effect.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's experiment to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two strategies animals use to survive the cold of winter when food becomes scarce. The lecture contrasts two animal examples: one that hibernates, sleeping through the winter to save energy, and one that migrates, traveling to a warmer region where food remains available.",
      prompt: "Using the points and examples from the lecture, explain two strategies animals use to survive winter.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general challenge (winter, scarce food), then give BOTH examples from the lecture and contrast them (hibernation vs. migration).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Many cities are considering a ban on single-use plastic shopping bags. Supporters of such a ban make three claims in its favor:

1. It would reduce litter and protect wildlife, since discarded plastic bags often end up in rivers and oceans where animals mistake them for food.
2. It would push shoppers to switch to reusable cloth bags, which are far better for the environment over their lifetime.
3. It would save cities money, because they would no longer have to pay to clean up and dispose of so much plastic waste.

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

Professor: Some instructors include "class participation" — things like speaking up in discussions and asking questions — as part of a student's final grade. Others believe grades should reflect only exams and written work. In your opinion, should students be graded on class participation? Why or why not?

Hana (classmate): I think participation should count. It encourages everyone to engage with the material, and learning to speak up in a group is a valuable skill for life and work.

Lucas (classmate): I disagree — grading participation unfairly punishes shy students who understand the material perfectly well but are uncomfortable speaking in front of others.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
