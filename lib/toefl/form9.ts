import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 9 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_9: ToeflForm = {
  id: "toefl-9",
  title: "TOEFL iBT Practice Test 9",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Great Library of Alexandria",
      passage:
`In the third century BCE, the city of Alexandria, founded by Alexander the Great on the coast of Egypt, became home to what was arguably the greatest center of learning in the ancient world. The Great Library of Alexandria was established under the early rulers of the Ptolemaic dynasty, the Greek-speaking kings who governed Egypt after Alexander's death. Their ambition was as bold as it was simple: to collect, in one place, a copy of every book then in existence. No institution before it had attempted scholarship on such a scale.

The Library was not merely a storehouse for scrolls. It was part of a larger research complex known as the Mouseion, or "house of the Muses," from which the modern word "museum" derives. Scholars from across the Mediterranean were invited to live and work there, supported by royal funds. Freed from the need to earn a living, they could devote themselves entirely to study. The result was an extraordinary concentration of talent. It was at Alexandria that the geographer Eratosthenes calculated the circumference of the Earth with remarkable accuracy, and that the mathematician Euclid is thought to have compiled the geometry textbook that would be used for the next two thousand years.

The methods the Ptolemies used to acquire books were aggressive, even ruthless. According to one well-known account, every ship that docked in Alexandria's harbor was searched, and any scrolls found aboard were confiscated and copied. The copy was returned to the owner, while the original was kept for the Library. The kings also borrowed valuable manuscripts from other cities, supposedly to copy them, and then quietly kept the originals, forfeiting the hefty deposits they had paid. Such behavior reveals how fiercely the Ptolemies competed with rival kingdoms for intellectual prestige.

A crucial achievement of the Alexandrian scholars was their work in preserving and editing texts. Many of the works they collected existed in multiple, conflicting versions, copied and recopied by hand over centuries. The librarians compared these versions, corrected obvious errors, and produced authoritative editions—a painstaking process that laid the foundations for the modern discipline of textual criticism. Without their efforts, many classical works might have survived only in garbled or fragmentary form, if they survived at all.

The eventual fate of the Library has long fascinated and frustrated historians. Popular accounts often describe a single catastrophic fire that destroyed it in an instant, erasing the accumulated knowledge of antiquity overnight. The reality, most scholars now believe, was far less dramatic. The Library probably declined gradually over several centuries, weakened by a combination of fires, wars, cuts in royal funding, and the slow departure of scholars to other cities. There may never have been one decisive moment of destruction. Instead, the institution faded as the conditions that had sustained it disappeared.

Whatever the precise cause of its end, the Library of Alexandria left a lasting legacy. It demonstrated that organized, well-funded, collaborative scholarship could achieve far more than isolated individuals working alone. The very idea of gathering the world's knowledge under one roof, supporting researchers so they could pursue truth for its own sake, has echoed through every great library and university built since. In that sense, although the building and its scrolls are long gone, the institution they represented has never truly vanished.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what was the ambition of the Ptolemaic rulers who established the Library?",
          choices: [
            "To train scribes who could copy texts quickly",
            "To collect in one place a copy of every book then in existence",
            "To translate Greek works into the Egyptian language",
            "To build the largest building in the ancient world",
          ],
          correct: 1,
          explanation: "Paragraph 1 says their ambition was \"to collect, in one place, a copy of every book then in existence.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"derives\" in paragraph 2 is closest in meaning to",
          choices: ["differs", "comes", "departs", "borrows money"],
          correct: 1,
          explanation: "The modern word \"museum\" \"derives\" from Mouseion — that is, it comes from it.",
        },
        {
          id: "r1q3", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention Eratosthenes and Euclid in paragraph 2?",
          choices: [
            "To prove that the Library's scrolls were eventually destroyed",
            "To give concrete examples of the scholarship produced at Alexandria",
            "To explain how the Ptolemies acquired their books",
            "To show that ancient mathematics was inaccurate",
          ],
          correct: 1,
          explanation: "They are offered as examples of the \"extraordinary concentration of talent\" and the achievements made at Alexandria.",
        },
        {
          id: "r1q4", qtype: "Detail",
          prompt: "According to paragraph 3, what happened to scrolls found aboard ships in Alexandria's harbor?",
          choices: [
            "They were destroyed to prevent the spread of rival ideas.",
            "They were confiscated and copied, with the original kept for the Library.",
            "They were sold back to their owners at a high price.",
            "They were translated and then returned unchanged.",
          ],
          correct: 1,
          explanation: "The scrolls \"were confiscated and copied,\" with the copy returned and \"the original was kept for the Library.\"",
        },
        {
          id: "r1q5", qtype: "Inference",
          prompt: "What can be inferred from paragraph 3 about the Ptolemies' attitude toward rival kingdoms?",
          choices: [
            "They cooperated freely with rival kingdoms to share knowledge.",
            "They were willing to lose money and break promises to gain intellectual prestige.",
            "They feared that rival kingdoms would attack Alexandria.",
            "They had no interest in books held by other cities.",
          ],
          correct: 1,
          explanation: "They kept borrowed originals and \"forfeit[ed] the hefty deposits they had paid,\" showing how \"fiercely the Ptolemies competed with rival kingdoms for intellectual prestige.\"",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"Without their efforts, many classical works might have survived only in garbled or fragmentary form, if they survived at all.\"",
          choices: [
            "The scholars' editing work was the only reason any classical works were ever written.",
            "Thanks to the scholars' work, many classical texts survived in fuller and more accurate form than they otherwise would have.",
            "Classical works were always copied perfectly, so editing was unnecessary.",
            "Most classical works were lost despite the scholars' careful editing.",
          ],
          correct: 1,
          explanation: "The sentence means that without the editors, texts would be incomplete or corrupted — so their work helped texts survive in better form. Choice B restates this.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 4, what did the Alexandrian librarians do with works that existed in conflicting versions?",
          choices: [
            "They discarded all but the oldest version.",
            "They compared the versions, corrected errors, and produced authoritative editions.",
            "They sent the versions to rival cities for safekeeping.",
            "They refused to copy works that had errors.",
          ],
          correct: 1,
          explanation: "The librarians \"compared these versions, corrected obvious errors, and produced authoritative editions.\"",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, all of the following are mentioned as possible causes of the Library's decline EXCEPT:",
          choices: [
            "Fires",
            "Cuts in royal funding",
            "The departure of scholars to other cities",
            "A flood that submerged the harbor",
          ],
          correct: 3,
          explanation: "Paragraph 5 lists fires, wars, funding cuts, and the departure of scholars. A flood is never mentioned.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"In truth, the evidence points to a much slower process.\"",
          choices: [
            "Before \"The eventual fate of the Library has long fascinated...\"",
            "After \"...erasing the accumulated knowledge of antiquity overnight.\"",
            "After \"...the slow departure of scholars to other cities.\"",
            "Before \"Instead, the institution faded as the conditions...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence sets up the contrast with the dramatic \"single fire\" story, so it fits right after that popular account and before the explanation of the gradual decline.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"The Great Library of Alexandria was a landmark institution of ancient scholarship.\"",
          choices: [
            "The Ptolemaic kings aimed to gather every existing book and supported resident scholars who made major discoveries.",
            "The Ptolemies used aggressive methods, such as confiscating scrolls from ships, to build the collection.",
            "Every scholar at Alexandria was required to pay for his own food and lodging.",
            "The Library most likely declined gradually rather than being destroyed in a single fire, but its model of collaborative scholarship endured.",
            "Euclid personally founded the Library and ran it for two thousand years.",
            "The Ptolemies refused to copy any books brought from rival cities.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: the goal and supported scholars (A), the aggressive collecting methods (B), and the gradual decline plus lasting model (D). C, E, and F contradict the passage.",
        },
      ],
    },
    {
      id: "r2",
      title: "How the Human Eye Perceives Color",
      passage:
`Color is one of the most vivid features of human experience, yet it does not exist in the outside world in the way most people imagine. The objects around us are not inherently "red" or "blue." What actually reaches the eye is light—electromagnetic radiation of various wavelengths. Color, properly understood, is the brain's interpretation of those wavelengths. It is a perception manufactured inside the head, not a property attached to objects themselves.

The process begins at the back of the eye, in a thin layer of tissue called the retina. The retina contains two kinds of light-sensitive cells, named for their shapes: rods and cones. Rods are extremely sensitive to light and allow us to see in dim conditions, but they cannot distinguish colors. Cones, by contrast, are responsible for color vision and work best in bright light. This is why, on a moonlit night, the world appears in shades of gray: there is not enough light to activate the cones, and we are seeing almost entirely with our rods.

Human color vision depends on the fact that there are three types of cones, each containing a pigment that responds most strongly to a particular range of wavelengths—roughly, to red, green, and blue light. No single cone, on its own, can report a color. A cone can only signal how strongly it has been stimulated. The sensation of a specific color arises from the brain's comparison of the signals coming from all three cone types at once. A beam of yellow light, for instance, stimulates the red and green cones almost equally while barely affecting the blue cones, and the brain interprets that particular pattern of activity as "yellow."

This three-cone system has a remarkable and somewhat counterintuitive consequence. Because the brain cares only about the relative pattern of cone stimulation, two physically different mixtures of light can look identical. Pure yellow light and a careful blend of red and green light produce the same ratio of cone responses, and so they appear exactly the same to us, even though their underlying physical composition is completely different. Such matching colors are called metamers, and they are the basis of color television and computer screens, which fool the eye into seeing a full range of colors using only red, green, and blue dots.

The three-cone arrangement also explains the most common form of color blindness. In some people, usually as a result of an inherited difference in their genes, one type of cone is missing or contains an abnormal pigment. Most often it is the red or green cone that is affected. Because the brain can no longer perform its usual three-way comparison, these individuals have difficulty distinguishing certain colors, particularly reds from greens. They are not "blind" to color in general; they simply perceive a narrower range of distinctions than people with normal vision.

What all of this reveals is that color is less a fact about the world than a construction of the nervous system. The same physical light can look different to different observers, and physically different light can look the same. Our rich, colorful visual experience is not a direct readout of reality but an interpretation—one assembled, with astonishing speed and consistency, by just three types of cells and the brain that reads them.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what is color, properly understood?",
          choices: [
            "A physical property attached to objects",
            "The brain's interpretation of light wavelengths",
            "A type of electromagnetic radiation emitted by objects",
            "A chemical produced inside the retina",
          ],
          correct: 1,
          explanation: "The passage states color \"is the brain's interpretation of those wavelengths,\" a perception made inside the head rather than a property of objects.",
        },
        {
          id: "r2q2", qtype: "Detail",
          prompt: "According to paragraph 2, why does the world appear gray on a moonlit night?",
          choices: [
            "The cones are damaged by darkness.",
            "There is too little light to activate the cones, so we see mainly with rods.",
            "The rods stop working in dim light.",
            "Moonlight contains no colored wavelengths.",
          ],
          correct: 1,
          explanation: "In dim conditions \"there is not enough light to activate the cones, and we are seeing almost entirely with our rods,\" which cannot distinguish color.",
        },
        {
          id: "r2q3", qtype: "Vocabulary",
          prompt: "The word \"counterintuitive\" in paragraph 4 is closest in meaning to",
          choices: [
            "easy to predict",
            "contrary to what one would expect",
            "harmful to the eye",
            "common and familiar",
          ],
          correct: 1,
          explanation: "Something \"counterintuitive\" runs against expectation — here, the surprising fact that physically different light can look identical.",
        },
        {
          id: "r2q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, how does the brain produce the sensation of a specific color?",
          choices: [
            "By measuring the signal from a single cone",
            "By comparing the signals coming from all three cone types at once",
            "By detecting the exact wavelength of the incoming light directly",
            "By combining the signals from the rods and cones",
          ],
          correct: 1,
          explanation: "\"The sensation of a specific color arises from the brain's comparison of the signals coming from all three cone types at once.\"",
        },
        {
          id: "r2q5", qtype: "Detail",
          prompt: "According to paragraph 4, what are metamers?",
          choices: [
            "Cells in the retina that detect motion",
            "Physically different light mixtures that look identical to the eye",
            "The three pigments found inside the cones",
            "Colors that cannot be displayed on a screen",
          ],
          correct: 1,
          explanation: "Metamers are matching colors — \"two physically different mixtures of light\" that \"appear exactly the same to us.\"",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention color television and computer screens in paragraph 4?",
          choices: [
            "To show that screens cause color blindness",
            "To give a practical example that relies on metamers and the three-cone system",
            "To argue that screens display colors more accurately than the eye sees them",
            "To explain how rods detect dim light",
          ],
          correct: 1,
          explanation: "Screens are offered as an application: they \"fool the eye\" using only red, green, and blue dots — a real-world use of metamers.",
        },
        {
          id: "r2q7", qtype: "Factual Information",
          prompt: "According to paragraph 5, the most common form of color blindness results when",
          choices: [
            "all three cone types are missing",
            "the rods contain an abnormal pigment",
            "one cone type, usually red or green, is missing or has an abnormal pigment",
            "the brain stops comparing cone signals entirely",
          ],
          correct: 2,
          explanation: "Usually due to inherited genes, \"one type of cone is missing or contains an abnormal pigment,\" most often the red or green cone.",
        },
        {
          id: "r2q8", qtype: "Inference",
          prompt: "What can be inferred from paragraph 5 about people with red-green color blindness?",
          choices: [
            "They cannot perceive any colors at all.",
            "They can still see many colors but make fewer color distinctions than others.",
            "They see colors more vividly than people with normal vision.",
            "Their rods do not function properly.",
          ],
          correct: 1,
          explanation: "The passage says they \"are not 'blind' to color in general; they simply perceive a narrower range of distinctions.\"",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 3?\n\n\"It is the pattern across the three, not any one reading, that matters.\"",
          choices: [
            "Before \"Human color vision depends on the fact...\"",
            "After \"A cone can only signal how strongly it has been stimulated.\"",
            "After \"...the brain interprets that particular pattern of activity as 'yellow.'\"",
            "Before \"No single cone, on its own, can report a color.\"",
          ],
          correct: 1,
          explanation: "The inserted sentence reinforces the point that a single cone reports only its own stimulation, so it fits right after that statement and before the example.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Human color perception is constructed by the eye and brain rather than read directly from objects.\"",
          choices: [
            "Color is the brain's interpretation of light wavelengths, not a property of objects themselves.",
            "Three types of cones respond to different wavelengths, and the brain compares their signals to produce color.",
            "Rods are responsible for all human color vision in bright light.",
            "Because only the pattern of cone responses matters, different light mixtures can look identical and certain cone defects cause color blindness.",
            "Computer screens use thousands of different pigments to reproduce every wavelength of light.",
            "People with color blindness see no colors of any kind.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: color as brain interpretation (A), the three-cone comparison system (B), and its consequences — metamers and color blindness (D). C, E, and F are false.",
        },
      ],
    },
  ],

  // ── LISTENING (2 conversations + 3 lectures · 28 Q) ────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Campus Bookstore",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a campus bookstore clerk.

Student: Hi, I'm hoping you can help me sort out a textbook order. I ordered the textbook for my sociology class online through the bookstore site about three weeks ago, and it still hasn't arrived. The class already started, and I'm falling behind.

Clerk: Okay, let's take a look. Do you have your order number, or the email address you used?

Student: I've got the confirmation email right here. The order number is at the top—it's 4471.

Clerk: Got it. Let me pull that up. Okay... so I see the problem. This title was on backorder from the publisher when you placed the order. There should have been a notice about that at checkout, but honestly, sometimes that warning gets buried.

Student: I definitely didn't see any warning. So when is it actually going to come in?

Clerk: The system says the new shipment is expected in about two more weeks. I know that's not ideal, especially with the class already underway.

Student: Two more weeks? That's a real problem. We have a reading quiz next Monday.

Clerk: Right. So here's what I'd suggest. First, you can cancel this backorder and get a full refund—no penalty, since it never shipped. Then, instead of waiting, you have a couple of options. We actually have two used copies of the same edition on the shelf right now, over in the social sciences section. They're cheaper than the new one, too.

Student: Oh, I had no idea you had used copies in the store. I assumed if it was backordered online, it was sold out everywhere.

Clerk: That's a common mix-up. The website inventory and the physical shelf inventory aren't always in sync. The other option, if you'd rather not buy a second copy, is the library. The professor put one copy of the textbook on two-hour reserve at the main library, so you could at least do the quiz reading there this week.

Student: That's really helpful. I think I'll cancel the order and just grab a used copy now—I don't want to risk it not coming again. Can you do the refund here?

Clerk: Absolutely. Let me cancel order 4471 and process the refund to your original card. It'll show up in three to five business days. Then go grab one of those used copies and bring it back to me to check out.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What problem brings the student to the bookstore?",
          choices: [
            "A textbook she ordered online has not arrived and her class has started.",
            "She was charged twice for the same textbook.",
            "She wants to return a textbook she no longer needs.",
            "She cannot log in to the bookstore website.",
          ],
          correct: 0,
          explanation: "The student says she ordered the textbook three weeks ago, \"it still hasn't arrived,\" and she's falling behind in class.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "Why did the textbook fail to arrive?",
          choices: [
            "The student entered the wrong shipping address.",
            "The title was on backorder from the publisher.",
            "The bookstore lost the order entirely.",
            "The package was returned as undeliverable.",
          ],
          correct: 1,
          explanation: "The clerk finds that \"this title was on backorder from the publisher\" when the order was placed.",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the clerk say the student can do about the unshipped order?",
          choices: [
            "Pay a small fee to upgrade to faster shipping",
            "Cancel the backorder and get a full refund with no penalty",
            "Exchange it for a different sociology textbook",
            "Wait until the end of the semester for a store credit",
          ],
          correct: 1,
          explanation: "The clerk says she can \"cancel this backorder and get a full refund—no penalty, since it never shipped.\"",
        },
        {
          id: "l1q4", qtype: "Inference",
          prompt: "Why is the student surprised that the store has used copies on the shelf?",
          choices: [
            "She thought used copies were always more expensive.",
            "She assumed a backordered online title meant it was sold out everywhere.",
            "She did not know the store sold sociology books.",
            "She believed the professor had banned used copies.",
          ],
          correct: 1,
          explanation: "She says she assumed \"if it was backordered online, it was sold out everywhere,\" and the clerk explains online and shelf inventory aren't always in sync.",
        },
        {
          id: "l1q5", qtype: "Function",
          prompt: "Why does the clerk mention the copy on reserve at the main library?",
          choices: [
            "To suggest the student return her order to the library instead",
            "To offer a way the student can do the quiz reading this week without buying a book",
            "To explain why the textbook is out of stock",
            "To recommend the student drop the sociology class",
          ],
          correct: 1,
          explanation: "The clerk notes the professor put a copy on two-hour reserve so the student \"could at least do the quiz reading there this week.\"",
        },
      ],
    },
    {
      id: "l2",
      title: "Conversation: Student and Professor (Thesis Topic)",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and her history professor.

Professor: Come on in. So you said in your email you're stuck on choosing a topic for your senior thesis. Let's talk it through.

Student: Yeah, that's exactly it. I'm really interested in the history of public health, but every time I land on a topic, it feels either way too big or kind of boring. I keep going in circles.

Professor: That's actually a good sign—it means you're thinking critically. Let's narrow it. When you say public health, is there a particular period or place that draws you in?

Student: I guess the nineteenth century, in cities. I read something last year about how cholera epidemics changed how cities were built—sewers, clean water, that kind of thing.

Professor: There you go. That's a rich area. Now, "cholera and nineteenth-century cities" is still too broad for a thesis—you could write ten books on that. The trick is to find one specific, arguable question inside it.

Student: Okay, but how do I know if a question is specific enough?

Professor: A good test: can you imagine actually answering it with the sources available to you in one semester? "How did cholera change cities?" is a topic, not a thesis. But something like, "How did one specific cholera outbreak change the way a particular city government made decisions about water supply?"—now that's a question you can dig into with real documents.

Student: Oh, I see. So I'd pick one city, one outbreak.

Professor: Exactly. Focus is your friend. And here's a practical tip: pick a case where the primary sources actually survive and are accessible to you—ideally in English or in a language you read, and ideally digitized or here in our archives. A brilliant question is useless if you can't get to the evidence.

Student: That makes sense. I was almost choosing topics based on what sounded impressive, not on what I could actually research.

Professor: A very common trap. Impressive-but-unresearchable is the number-one reason theses stall. So here's your assignment before we meet again: come back next week with three narrow questions, each tied to a specific city and outbreak, and for each one, tell me where you think the sources are. Then we'll pick the strongest.

Student: That's really helpful. I feel like I actually have a way forward now.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Purpose",
          prompt: "Why does the student go to see the professor?",
          choices: [
            "To ask for an extension on her thesis deadline",
            "To get help narrowing down a topic for her senior thesis",
            "To complain that the assigned readings are too difficult",
            "To request a letter of recommendation",
          ],
          correct: 1,
          explanation: "The student says she is \"stuck on choosing a topic\" for her senior thesis, and the conversation is about narrowing it.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "What general area of public health history interests the student?",
          choices: [
            "Vaccination programs in the twentieth century",
            "How nineteenth-century cholera epidemics changed how cities were built",
            "The history of hospitals in rural areas",
            "Diseases spread by international trade routes",
          ],
          correct: 1,
          explanation: "She mentions reading about \"how cholera epidemics changed how cities were built—sewers, clean water.\"",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "According to the professor, what is the test of whether a research question is specific enough?",
          choices: [
            "Whether it sounds impressive to other historians",
            "Whether you can imagine answering it with available sources in one semester",
            "Whether it has never been studied before",
            "Whether it covers an entire century",
          ],
          correct: 1,
          explanation: "The professor's test is whether \"you can imagine actually answering it with the sources available to you in one semester.\"",
        },
        {
          id: "l2q4", qtype: "Function",
          prompt: "Why does the professor say, \"A brilliant question is useless if you can't get to the evidence\"?",
          choices: [
            "To discourage the student from studying history at all",
            "To stress that the student must choose a topic whose primary sources she can actually access",
            "To explain that brilliant questions are rarely worth asking",
            "To suggest the student write in a different language",
          ],
          correct: 1,
          explanation: "The remark supports his practical tip: pick a case \"where the primary sources actually survive and are accessible to you.\"",
        },
        {
          id: "l2q5", qtype: "Detail",
          prompt: "What does the professor ask the student to do before their next meeting?",
          choices: [
            "Write a complete first draft of the thesis",
            "Bring three narrow questions, each tied to a city and outbreak, with possible sources",
            "Read ten books on cholera and cities",
            "Choose a topic in a completely different field",
          ],
          correct: 1,
          explanation: "He assigns her to \"come back next week with three narrow questions, each tied to a specific city and outbreak,\" and where the sources are.",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: Tides and the Moon (Oceanography)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an oceanography class.

Professor: Today we're going to talk about something you can watch happen at any beach, but that turns out to involve some surprisingly subtle physics—the tides. Why does the level of the ocean rise and fall, usually twice a day, in such a predictable rhythm? Most of you already know the short answer: the Moon. But the full story is more interesting than "the Moon pulls on the water," and I want to get the details right, because there's a famous puzzle hidden in here.

So, the basic cause is gravity. The Moon's gravity tugs on the Earth, and because gravity gets weaker with distance, it pulls hardest on the side of the Earth that's facing the Moon. The ocean on that near side gets pulled toward the Moon and bulges out. That gives you a high tide on the side of the Earth facing the Moon. So far, so intuitive.

But here's the puzzle that trips everyone up. There are usually two high tides a day, not one. There's a bulge on the side facing the Moon—but there's also a second bulge on the exact opposite side of the Earth, the side facing away from the Moon. Now think about that. The far side is the part of the Earth the Moon is pulling on least. So why is there a high tide there too?

The answer is about differences in pull across the whole Earth. The Moon pulls hardest on the near-side water, pulls a bit less hard on the solid Earth in the middle, and pulls least of all on the far-side water. So relative to the solid Earth in the middle, the near-side water gets pulled toward the Moon—and the far-side water gets, in effect, left behind, because it's pulled the least. The result is that water piles up on both sides. Two bulges. So as the Earth rotates once a day, any given coastline passes through both bulges, and that's why you get roughly two high tides every day.

Now, the Sun matters too, even though it's far away. The Sun is vastly more massive than the Moon, but it's also vastly farther away, and for tides it's the difference in pull across the Earth that counts, not the total pull. So the Sun's tidal effect is real but smaller—a bit less than half the Moon's. And here's a nice consequence. When the Sun, Earth, and Moon line up—at the full moon and the new moon—the Sun's pull and the Moon's pull add together, and you get especially large tides. We call those spring tides, and that has nothing to do with the season—it's "spring" as in "spring up." When the Sun and Moon are at right angles instead, their effects partly cancel, and you get unusually small tides, called neap tides.

So the takeaway is this: tides aren't just "the Moon pulling the water up." They're caused by the difference in gravitational pull across the Earth, which is why you get two bulges, and why the Sun, despite being so much more massive, plays only a supporting role.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How sailors predicted tides before modern science",
            "Why tides occur and why there are usually two high tides a day",
            "How the Moon formed billions of years ago",
            "The dangers that spring tides pose to coastal cities",
          ],
          correct: 1,
          explanation: "The professor explains the cause of tides and focuses on the puzzle of why there are two high tides a day.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, why is there a high tide on the side of the Earth facing the Moon?",
          choices: [
            "The Earth's rotation throws water to that side.",
            "The Moon's gravity pulls hardest there, and the water bulges toward the Moon.",
            "The Sun pushes water toward the Moon.",
            "That side is closest to the Sun.",
          ],
          correct: 1,
          explanation: "The Moon \"pulls hardest on the side of the Earth that's facing the Moon,\" so the water there \"bulges out.\"",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "How does the professor explain the second high tide, on the far side of the Earth?",
          choices: [
            "The far-side water is pulled least, so relative to the solid Earth it is left behind, forming a bulge.",
            "The Sun creates the far-side bulge by itself.",
            "The far-side water is pulled hardest by the Moon.",
            "The Earth's rotation alone creates the far-side bulge.",
          ],
          correct: 0,
          explanation: "The far-side water is \"pulled the least,\" so relative to the middle of the Earth it is \"left behind,\" producing the second bulge.",
        },
        {
          id: "l3q4", qtype: "Organization",
          prompt: "Why does the professor describe the difference in the Moon's pull on the near side, the middle, and the far side of the Earth?",
          choices: [
            "To prove that the Moon has no effect on tides",
            "To explain why water piles up on both sides, producing two bulges",
            "To show that the Sun is more important than the Moon",
            "To argue that tides happen only once a day",
          ],
          correct: 1,
          explanation: "The comparison across the Earth explains why \"water piles up on both sides. Two bulges.\"",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "According to the lecture, what happens during a spring tide?",
          choices: [
            "The Sun and Moon are at right angles, partly canceling their pulls.",
            "The Sun, Earth, and Moon line up, so the Sun's and Moon's pulls add together for especially large tides.",
            "The tides disappear entirely for a day.",
            "The tides occur only in the spring season.",
          ],
          correct: 1,
          explanation: "When the Sun, Earth, and Moon \"line up,\" their pulls \"add together,\" producing \"especially large tides\" called spring tides — unrelated to the season.",
        },
        {
          id: "l3q6", qtype: "Inference",
          prompt: "What can be inferred about why the Sun has a smaller tidal effect than the Moon despite being far more massive?",
          choices: [
            "The Sun's gravity does not reach the Earth.",
            "For tides, the difference in pull across the Earth matters, and the distant Sun produces a smaller difference.",
            "The Sun pulls only on the land, not the ocean.",
            "The Sun's effect is canceled by the Earth's rotation.",
          ],
          correct: 1,
          explanation: "The professor says \"it's the difference in pull across the Earth that counts, not the total pull,\" so the very distant Sun has a smaller tidal effect.",
        },
      ],
    },
    {
      id: "l4",
      title: "Lecture: The Mere Exposure Effect (Psychology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a psychology class.

Professor: Okay, here's a question to start us off. Why do you sometimes end up liking a song that you actually hated the first time you heard it? Or a person you didn't think much of at first, but who somehow grows on you? Today we're going to look at one psychological principle that helps explain this, and it's called the mere exposure effect.

The idea is simple to state, even though the implications are pretty deep. The mere exposure effect says that, all else being equal, the more often we are exposed to something—a face, a word, a melody, a shape—the more we tend to like it. Notice the word "mere." We're not talking about being persuaded, or being rewarded, or learning new information about the thing. Just repeated exposure, by itself, tends to increase liking. Familiarity, in a sense, breeds preference.

This was studied carefully by the psychologist Robert Zajonc in the 1960s. In one classic experiment, he showed people a series of made-up, meaningless symbols—shapes that looked a bit like Chinese characters but didn't mean anything. Some symbols were shown many times, others only once or twice. Afterward, he asked people how much they liked each symbol. And reliably, the symbols people had seen more often were the ones they rated as more pleasant—even though no one could explain why, and even though the symbols were meaningless.

Now, here's a detail that makes the effect even more striking. The exposure doesn't have to be conscious. In some studies, images were flashed so quickly that participants couldn't consciously report having seen them at all. And yet, those subliminally shown images were still rated more positively later. So your preference can be nudged by something you don't even remember perceiving.

Why would our minds work this way? The leading explanation has to do with safety. Think about it from an evolutionary standpoint. When you encounter something for the first time, your brain doesn't know whether it's dangerous. A reasonable default is caution. But if you encounter that same thing repeatedly and nothing bad happens, your brain gradually registers it as safe. And "safe" tends to feel like "good." So familiarity, in this view, is essentially a signal that something hasn't hurt you, and we translate that into liking.

This effect is everywhere once you start noticing it. It's a big part of why advertisers pay enormous sums simply to put a brand name in front of you over and over, even with no real argument attached—they're buying familiarity. It's part of why politicians repeat the same slogans. But there's a limit worth mentioning: the effect is strongest for things that are neutral or mildly positive to begin with. If you genuinely dislike something from the start, repeated exposure can actually make you like it less, not more. So it's not magic. It's a tendency—a real and measurable one, but with boundaries.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How advertisers design their logos",
            "A principle in which repeated exposure tends to increase liking",
            "Why people forget images they have seen",
            "How Robert Zajonc invented a new language of symbols",
          ],
          correct: 1,
          explanation: "The lecture introduces and explains the mere exposure effect: repeated exposure tends to increase how much we like something.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "What does the professor emphasize by stressing the word \"mere\"?",
          choices: [
            "That the effect requires learning new information about the thing",
            "That repeated exposure by itself, without persuasion or reward, increases liking",
            "That the effect is very weak and rarely observed",
            "That the effect only works on faces",
          ],
          correct: 1,
          explanation: "\"Mere\" stresses that it is exposure by itself — not persuasion, reward, or new information — that increases liking.",
        },
        {
          id: "l4q3", qtype: "Detail",
          prompt: "What did Robert Zajonc's experiment with meaningless symbols show?",
          choices: [
            "People disliked symbols they saw repeatedly.",
            "People rated symbols they had seen more often as more pleasant.",
            "People could always explain why they preferred certain symbols.",
            "People preferred symbols that had real meanings.",
          ],
          correct: 1,
          explanation: "The symbols seen more often \"were the ones they rated as more pleasant,\" even though they were meaningless.",
        },
        {
          id: "l4q4", qtype: "Detail",
          prompt: "Why does the professor mention that some images were flashed too quickly to be consciously seen?",
          choices: [
            "To show the effect can occur even without conscious awareness of the exposure",
            "To prove the effect does not really exist",
            "To explain how people memorize images",
            "To argue that the eye cannot detect fast images",
          ],
          correct: 0,
          explanation: "Even subliminally shown images were rated more positively, showing \"your preference can be nudged by something you don't even remember perceiving.\"",
        },
        {
          id: "l4q5", qtype: "Detail",
          prompt: "According to the leading explanation, why might repeated exposure increase liking?",
          choices: [
            "Because repetition teaches us useful facts about the object",
            "Because repeated harmless exposure signals safety, and 'safe' feels 'good'",
            "Because our memory improves with repetition",
            "Because we feel obligated to like familiar things",
          ],
          correct: 1,
          explanation: "The leading explanation is evolutionary: repeated exposure with no harm registers as safe, and \"'safe' tends to feel like 'good.'\"",
        },
        {
          id: "l4q6", qtype: "Attitude",
          prompt: "What important limitation of the effect does the professor point out?",
          choices: [
            "It works only on advertisements, not on people.",
            "If you strongly dislike something at first, repeated exposure can make you like it even less.",
            "It only affects children, not adults.",
            "It disappears completely after a single exposure.",
          ],
          correct: 1,
          explanation: "The professor notes the effect is strongest for neutral or mildly positive things; for things you \"genuinely dislike from the start, repeated exposure can actually make you like it less.\"",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The Origins of Gothic Architecture (Art History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an art history class.

Professor: So last time we looked at Romanesque churches—those heavy, solid stone buildings with thick walls, small windows, and a rather dark, fortress-like interior. Today we move forward to what came next, and it's one of the most dramatic shifts in the history of architecture: the rise of the Gothic style, starting in France in the middle of the twelfth century.

Now, when people think of Gothic cathedrals, they think of height and light. Enormous walls of stained glass, ceilings that seem impossibly high, an interior flooded with colored light. And the big question for us is: how? How did builders suddenly go from those dark, heavy Romanesque churches to these soaring, glass-filled cathedrals? Because this wasn't just a change in taste. It required solving real engineering problems.

The challenge is basically about weight. A stone roof is incredibly heavy, and all that weight pushes down and—this is the key part—pushes outward, sideways, on the walls. In a Romanesque church, you deal with that outward push by making the walls extremely thick and the windows tiny. Thick walls can resist the push, but they make the building dark and heavy. So if you want big windows and tall thin walls, you need a completely different strategy for handling that outward force.

Gothic builders solved this with three innovations working together. The first is the pointed arch. A rounded Roman arch pushes outward quite strongly. A pointed arch, by contrast, directs more of the weight straight downward, which reduces the sideways push. The second is the ribbed vault, which concentrates the weight of the ceiling onto specific points rather than spreading it along the whole wall. So now the load is being funneled down to particular spots.

And the third innovation is the famous one: the flying buttress. This is an external stone support, a kind of arched bridge of masonry that reaches from the upper wall out to a heavy pier standing some distance away from the building. What it does is brilliant. It catches that outward push at exactly the point where the vault delivers it, and it carries that force safely down and out to the ground, away from the wall. So the wall itself no longer has to be thick to resist the push—the buttress is doing that job from outside.

And here's the payoff. Once the wall is freed from its job of holding everything up—once the buttresses are taking the outward thrust—the wall doesn't have to be a solid load-bearing mass anymore. You can fill it with glass. And that's exactly what they did. The wall became, in a sense, a frame for enormous stained-glass windows. That's why a Gothic cathedral feels so different from a Romanesque church: the engineering of the pointed arch, the ribbed vault, and the flying buttress is precisely what made all that light possible.

So remember—those soaring windows aren't just decoration. They're the visible result of an engineering revolution that figured out how to move weight away from the wall.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The differences between French and German cathedrals",
            "The engineering innovations that made Gothic cathedrals tall and full of light",
            "How stained glass was manufactured in the Middle Ages",
            "Why Romanesque churches were abandoned",
          ],
          correct: 1,
          explanation: "The professor focuses on the engineering innovations that allowed Gothic builders to create tall, light-filled cathedrals.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, how did Romanesque churches deal with the outward push of a heavy stone roof?",
          choices: [
            "By using flying buttresses",
            "By making the walls very thick and the windows tiny",
            "By replacing stone roofs with wooden ones",
            "By building the churches very low to the ground",
          ],
          correct: 1,
          explanation: "In a Romanesque church, builders handled the push by \"making the walls extremely thick and the windows tiny.\"",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "According to the lecture, how does the pointed arch help compared with a rounded arch?",
          choices: [
            "It spreads weight evenly along the whole wall.",
            "It directs more weight straight downward, reducing the sideways push.",
            "It makes the ceiling lighter overall.",
            "It eliminates the need for any walls.",
          ],
          correct: 1,
          explanation: "A pointed arch \"directs more of the weight straight downward, which reduces the sideways push.\"",
        },
        {
          id: "l5q4", qtype: "Detail",
          prompt: "What does the flying buttress do, according to the professor?",
          choices: [
            "It adds extra weight to the roof to hold it down.",
            "It catches the outward push and carries that force down to the ground away from the wall.",
            "It supports the stained-glass windows from the inside.",
            "It replaces the ribbed vault entirely.",
          ],
          correct: 1,
          explanation: "The flying buttress \"catches that outward push\" and \"carries that force safely down and out to the ground, away from the wall.\"",
        },
        {
          id: "l5q5", qtype: "Organization",
          prompt: "Why does the professor describe the three innovations before discussing the stained-glass windows?",
          choices: [
            "To show that the windows were added long after the cathedrals were built",
            "To explain that those innovations are what freed the walls so they could be filled with glass",
            "To argue that the windows were unnecessary decoration",
            "To prove that Romanesque churches also had large windows",
          ],
          correct: 1,
          explanation: "The innovations take the outward thrust off the wall, so \"the wall doesn't have to be a solid load-bearing mass anymore\" and can be filled with glass.",
        },
        {
          id: "l5q6", qtype: "Inference",
          prompt: "What main point does the professor make about the soaring windows of a Gothic cathedral?",
          choices: [
            "They are purely decorative and have no structural meaning.",
            "They are the visible result of engineering that moved weight away from the wall.",
            "They were copied directly from Romanesque churches.",
            "They made the cathedrals weaker and more likely to collapse.",
          ],
          correct: 1,
          explanation: "The professor concludes the windows \"aren't just decoration\" but \"the visible result of an engineering revolution that figured out how to move weight away from the wall.\"",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people prefer to get advice from their friends. Others prefer to get advice from members of their family. Which do you prefer, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your preference in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Beginning next semester, the university will introduce a new class-attendance policy. Instructors will record attendance at every class meeting, and students who miss more than three classes in a course without an approved excuse will have their final grade lowered. The administration says the policy will encourage participation and help students keep up with the material.\n\n[Then you hear two students discussing the announcement. The woman disagrees with the new policy.]",
      prompt: "The woman expresses her opinion about the new attendance policy. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines 'inflation' — a general rise in the overall level of prices in an economy over time, which means that each unit of money buys fewer goods and services than it did before. Economists track inflation to understand how the purchasing power of money changes.\n\n[Then you hear a professor give an example involving the price of a cup of coffee over several decades.]",
      prompt: "Using the example from the lecture, explain the economics concept of inflation.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two methods by which flowering plants are pollinated. The lecture contrasts wind pollination, in which plants release large amounts of light pollen carried by the air, with insect pollination, in which plants use colorful flowers and nectar to attract insects that carry pollen from flower to flower.",
      prompt: "Using the points and examples from the lecture, explain the two methods of plant pollination and how they differ.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general concept, then give BOTH methods from the lecture and contrast them (wind vs. insect pollination).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Some universities are considering replacing the natural grass lawns on campus with artificial turf. Supporters make three claims in favor of the change:

1. Artificial turf saves money, because it does not need watering, mowing, or fertilizer.
2. Artificial turf is more durable and stays usable in all weather, while grass turns to mud and wears out in heavy-traffic areas.
3. Artificial turf is better for the environment, since it eliminates the water use and gas-powered mowing that natural lawns require.

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

Professor: Many people argue about how higher education should be paid for. Some believe that a college education should be free for everyone, funded by the government, while others believe students should pay for it themselves. In your opinion, should a college education be free for everyone? Why or why not?

Emma (classmate): I think college should be free. Education is a public good, and making it free would give everyone an equal chance, regardless of how much money their family has.

Jack (classmate): I disagree — if college were free, taxes would rise sharply, and people might value their education less when they don't have to pay for it.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
