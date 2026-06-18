import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 3 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has a conversation + two lectures with the
 * standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_3: ToeflForm = {
  id: "toefl-3",
  title: "TOEFL iBT Practice Test 3",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Origins of Agriculture",
      passage:
`For the vast majority of human history, people obtained their food by hunting wild animals and gathering wild plants. Then, beginning roughly 11,000 years ago, several groups of humans living in widely separated parts of the world independently began to cultivate crops and raise animals. This shift, often called the Neolithic Revolution, is one of the most consequential transformations in the human story. Within a few thousand years, farming had replaced foraging across much of the inhabited world, laying the foundation for permanent villages, dense populations, and eventually the first cities. Yet the reasons why people abandoned a way of life that had served them for hundreds of thousands of years remain a matter of vigorous debate among archaeologists.

One striking feature of early agriculture is that it arose more than once, in places that had no contact with one another. Wheat and barley were first domesticated in the Fertile Crescent of the Near East; rice in the river valleys of China; maize, beans, and squash in Mesoamerica; and potatoes in the highlands of South America. The independent emergence of farming in so many regions suggests that it was not a single lucky accident but a response to conditions that were shared across the globe. Many scholars point to the end of the last Ice Age, around the same period, which brought a warmer and more stable climate that may have made reliable cultivation possible for the first time.

It is tempting to assume that early farmers were simply better off than the foragers who preceded them, but the evidence complicates that assumption. Skeletons from early farming communities often show signs of poorer health than those of nearby hunter-gatherers: shorter stature, more dental cavities, and clearer marks of nutritional stress. The reason is that farming, especially in its earliest form, depended heavily on a small number of starchy staple crops. A diet built around one or two grains can supply plenty of calories while lacking the variety of nutrients that a foraging diet, drawn from dozens of wild species, naturally provides. Farmers also worked longer hours and were more vulnerable to famine when a single harvest failed.

If early farming was so demanding and the diet so narrow, why did it spread? Part of the answer lies in sheer numbers. Although individual farmers may have been less healthy, farming could feed far more people per unit of land than foraging could. A farming community could therefore grow much larger than a band of hunter-gatherers occupying the same territory. Over many generations, the more populous farming societies tended to expand, displacing or absorbing their less numerous neighbors. In this view, agriculture spread not because it made individuals happier or healthier, but because it allowed populations to multiply.

Farming also set in motion changes that proved difficult to reverse. Once a community had cleared land, stored grain, and built permanent dwellings, returning to a mobile foraging life became increasingly impractical. Stored surpluses had to be guarded and managed, which encouraged the rise of specialists, leaders, and eventually formal systems of authority. The need to track harvests and trades may even have spurred the invention of writing and counting. In this sense, the decision to plant a field, repeated across countless communities, gradually reshaped not only what people ate but how they organized themselves. The transition to agriculture was neither sudden nor obviously beneficial to those who first undertook it, yet it carried humanity, almost irreversibly, toward the crowded and complex societies of the modern world.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, the Neolithic Revolution is significant because it",
          choices: [
            "occurred in only one region of the world",
            "laid the foundation for villages, dense populations, and cities",
            "happened gradually over hundreds of thousands of years",
            "improved the health of the people who adopted it",
          ],
          correct: 1,
          explanation: "Paragraph 1 says the shift to farming laid \"the foundation for permanent villages, dense populations, and eventually the first cities.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"consequential\" in paragraph 1 is closest in meaning to",
          choices: ["sudden", "important", "mysterious", "recent"],
          correct: 1,
          explanation: "A \"consequential\" transformation is one with large effects — that is, an important one.",
        },
        {
          id: "r1q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what does the independent emergence of farming in many regions suggest?",
          choices: [
            "Farming was a single lucky accident.",
            "Farming was a response to conditions shared across the globe.",
            "All early farmers were in contact with one another.",
            "Farming began first in the highlands of South America.",
          ],
          correct: 1,
          explanation: "The paragraph states that farming arising in so many separate places suggests \"a response to conditions that were shared across the globe.\"",
        },
        {
          id: "r1q4", qtype: "Rhetorical Purpose",
          prompt: "Why does the author list wheat, rice, maize, and potatoes in paragraph 2?",
          choices: [
            "To show which crops are most nutritious",
            "To give examples of crops domesticated independently in different regions",
            "To argue that farming began only in the Fertile Crescent",
            "To explain how the Ice Age ended",
          ],
          correct: 1,
          explanation: "The crops are concrete examples of farming arising independently in regions \"that had no contact with one another.\"",
        },
        {
          id: "r1q5", qtype: "Factual Information",
          prompt: "According to paragraph 3, skeletons from early farming communities often show",
          choices: [
            "taller stature than nearby hunter-gatherers",
            "no signs of nutritional stress",
            "shorter stature, more dental cavities, and signs of nutritional stress",
            "evidence of an unusually varied diet",
          ],
          correct: 2,
          explanation: "The paragraph reports \"shorter stature, more dental cavities, and clearer marks of nutritional stress\" in early farmers.",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"A diet built around one or two grains can supply plenty of calories while lacking the variety of nutrients that a foraging diet, drawn from dozens of wild species, naturally provides.\"",
          choices: [
            "Foraging diets contain fewer calories than grain-based diets do.",
            "A grain-based diet gives enough calories but lacks the nutritional variety of a foraging diet.",
            "Eating one or two grains provides more nutrients than eating many wild species.",
            "Both foraging and farming diets supply the same range of nutrients.",
          ],
          correct: 1,
          explanation: "The sentence contrasts ample calories from grains with the missing nutrient variety that a diverse foraging diet supplies. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 4, why did farming spread despite being demanding?",
          choices: [
            "It made individual farmers healthier than foragers.",
            "It could feed far more people per unit of land, so farming populations grew and expanded.",
            "It required fewer working hours than foraging.",
            "It eliminated the risk of famine entirely.",
          ],
          correct: 1,
          explanation: "Farming \"could feed far more people per unit of land,\" so larger farming populations \"tended to expand, displacing or absorbing\" their neighbors.",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, all of the following are described as consequences of farming EXCEPT:",
          choices: [
            "the rise of specialists and leaders",
            "the possible invention of writing and counting",
            "a return to mobile foraging becoming easier",
            "the need to guard and manage stored surpluses",
          ],
          correct: 2,
          explanation: "Paragraph 5 says returning to foraging became \"increasingly impractical,\" not easier. The other options are all listed as consequences.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 4?\n\n\"In short, what spread was not necessarily a better life but a larger number of people living it.\"",
          choices: [
            "Before \"If early farming was so demanding...\"",
            "After \"...feed far more people per unit of land than foraging could.\"",
            "Before \"Over many generations, the more populous farming societies...\"",
            "After \"...because it allowed populations to multiply.\"",
          ],
          correct: 3,
          explanation: "The inserted sentence summarizes the paragraph's conclusion — that population growth, not individual well-being, drove the spread — so it fits best at the very end.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"The shift from foraging to farming reshaped human societies, though its causes and effects are complex.\"",
          choices: [
            "Farming arose independently in several regions, probably in response to shared global conditions after the Ice Age.",
            "Early farmers were often less healthy than foragers, partly because of a narrow, grain-based diet.",
            "Farming spread mainly because larger farming populations expanded at the expense of foragers.",
            "Hunter-gatherers never ate any wild plants or animals.",
            "Writing was invented thousands of years before agriculture began.",
            "Every early farming community quickly returned to a foraging way of life.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "The key ideas are agriculture's independent origins (A), the health/diet paradox (B), and population-driven spread (C). D, E, and F contradict the passage.",
        },
      ],
    },
    {
      id: "r2",
      title: "Black Holes and the Event Horizon",
      passage:
`A black hole is a region of space where gravity is so intense that nothing, not even light, can escape from it. The idea sounds like science fiction, but it follows directly from the physics of gravity. According to Einstein's theory of general relativity, mass bends the fabric of space and time around it. The more mass that is packed into a small volume, the more severely that fabric is curved. If enough mass is concentrated in a sufficiently small region, the curvature becomes so extreme that it forms a kind of one-way boundary: matter and light can fall in, but nothing can come back out. That boundary is called the event horizon, and it is the defining feature of a black hole.

It is important to understand what the event horizon actually is. It is not a solid surface, and there is nothing physically present there to touch. Rather, it is a mathematical boundary marking the point of no return. Outside the horizon, an object can still, in principle, escape the black hole's pull if it travels fast enough. Inside the horizon, escape would require traveling faster than light, which the laws of physics forbid. An astronaut crossing the event horizon would notice nothing dramatic at the moment of crossing—no wall, no barrier—yet that crossing would seal the astronaut's fate, for no signal sent afterward could ever reach the outside universe.

How do black holes form in the first place? The most common type, a stellar black hole, is born when a very massive star runs out of nuclear fuel. Throughout its life, a star is held up against its own gravity by the outward pressure generated in its core. When the fuel is exhausted, that pressure ceases, and the core collapses under its own weight. For the most massive stars, nothing can halt the collapse, and the core shrinks into a point of essentially infinite density called a singularity, surrounded by an event horizon. Far larger black holes, millions or billions of times the mass of the Sun, sit at the centers of most galaxies, including our own; how these supermassive black holes grew so large remains an active area of research.

Because no light escapes a black hole, it cannot be seen directly. Astronomers therefore detect black holes by their effects on the matter and light around them. A black hole in orbit with an ordinary star, for example, can pull gas off its companion. As this gas spirals inward, it forms a flattened, rapidly rotating disk and heats to enormous temperatures, glowing brightly in X-rays. The X-ray light comes not from the black hole itself but from the superheated gas just outside it, and detecting such radiation was for decades the primary way astronomers identified black hole candidates.

In recent years, two remarkable achievements have placed black holes on far firmer observational ground. First, scientists detected gravitational waves—ripples in the fabric of space and time—produced when two black holes spiral together and merge, exactly as general relativity predicts. Then, an international team combined data from radio telescopes around the world to produce the first image of the gas and light surrounding a black hole, revealing a bright ring encircling a dark central region, the so-called shadow of the event horizon. Together, these results transformed black holes from a theoretical curiosity into objects that can be observed, measured, and tested—confirming, more than a century after Einstein wrote down his equations, that these strange regions are a real part of our universe.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what causes a black hole to form, according to general relativity?",
          choices: [
            "Light traveling faster than normal",
            "Enough mass concentrated in a small enough region to curve space extremely",
            "The complete absence of gravity in a region of space",
            "A star moving very rapidly through space",
          ],
          correct: 1,
          explanation: "The passage says that if \"enough mass is concentrated in a sufficiently small region,\" the curvature becomes extreme enough to form an event horizon.",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The word \"intense\" in paragraph 1 is closest in meaning to",
          choices: ["gentle", "strong", "distant", "brief"],
          correct: 1,
          explanation: "Gravity that is so \"intense\" that not even light escapes is extremely strong.",
        },
        {
          id: "r2q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what is the event horizon?",
          choices: [
            "A solid physical surface surrounding the black hole",
            "A mathematical boundary marking the point of no return",
            "The bright disk of gas around a black hole",
            "The center of the black hole, where matter collapses",
          ],
          correct: 1,
          explanation: "The paragraph states the event horizon \"is not a solid surface\" but \"a mathematical boundary marking the point of no return.\"",
        },
        {
          id: "r2q4", qtype: "Inference",
          prompt: "What can be inferred from paragraph 2 about an astronaut who crosses the event horizon?",
          choices: [
            "The astronaut would feel a sudden solid barrier at the crossing.",
            "The astronaut could send signals back as long as he traveled fast enough.",
            "The astronaut could no longer send any signal that reaches the outside universe.",
            "The astronaut would immediately be able to escape the black hole.",
          ],
          correct: 2,
          explanation: "The paragraph says the crossing \"would seal the astronaut's fate, for no signal sent afterward could ever reach the outside universe.\"",
        },
        {
          id: "r2q5", qtype: "Factual Information",
          prompt: "According to paragraph 3, a stellar black hole forms when",
          choices: [
            "a massive star runs out of fuel and its core collapses",
            "two galaxies collide with each other",
            "a star gains mass from a nearby companion",
            "gas heats up and glows in X-rays",
          ],
          correct: 0,
          explanation: "A stellar black hole \"is born when a very massive star runs out of nuclear fuel\" and its core collapses with nothing to halt it.",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author discuss gas spiraling onto a black hole in paragraph 4?",
          choices: [
            "To prove that black holes emit their own visible light",
            "To explain how astronomers detect black holes indirectly through X-rays",
            "To argue that black holes are actually made of hot gas",
            "To describe how supermassive black holes grew so large",
          ],
          correct: 1,
          explanation: "The spiraling gas heats up and glows in X-rays, which \"was for decades the primary way astronomers identified black hole candidates\" — an indirect detection method.",
        },
        {
          id: "r2q7", qtype: "Negative Factual Information",
          prompt: "According to paragraph 4, which of the following is NOT true of the X-ray light astronomers detect?",
          choices: [
            "It comes from superheated gas just outside the black hole.",
            "It is produced as gas spirals inward and heats up.",
            "It is emitted directly by the black hole itself.",
            "It helped astronomers identify black hole candidates for decades.",
          ],
          correct: 2,
          explanation: "The passage says the X-rays come \"not from the black hole itself but from the superheated gas just outside it,\" so option C is false.",
        },
        {
          id: "r2q8", qtype: "Detail",
          prompt: "According to paragraph 5, what did the international team of radio telescopes accomplish?",
          choices: [
            "They detected gravitational waves from merging black holes.",
            "They produced the first image of the gas and light surrounding a black hole.",
            "They measured the temperature of a singularity.",
            "They proved that black holes do not actually exist.",
          ],
          correct: 1,
          explanation: "The team \"combined data from radio telescopes around the world to produce the first image of the gas and light surrounding a black hole.\"",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"Both achievements offered direct evidence for objects that had long been studied only on paper.\"",
          choices: [
            "Before \"In recent years, two remarkable achievements...\"",
            "After \"...exactly as general relativity predicts.\"",
            "After \"...the so-called shadow of the event horizon.\"",
            "Before \"First, scientists detected gravitational waves...\"",
          ],
          correct: 2,
          explanation: "The sentence sums up both the gravitational-wave detection and the image, so it fits best right after both have been described.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Black holes are regions of extreme gravity that scientists have come to understand and observe.\"",
          choices: [
            "A black hole's event horizon is a one-way boundary beyond which not even light can escape.",
            "Stellar black holes form when massive stars run out of fuel and their cores collapse.",
            "Because they emit no light directly, black holes are detected through their effects, such as X-rays from surrounding gas.",
            "Black holes can be seen directly with ordinary telescopes in visible light.",
            "Gravitational waves prove that general relativity is completely wrong.",
            "Every star in the universe eventually becomes a black hole.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "The key ideas are the event horizon (A), how stellar black holes form (B), and indirect detection through surrounding matter (C). D, E, and F are false.",
        },
      ],
    },
  ],

  // ── LISTENING (conversation + two lectures) ────────────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Academic Advisor",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and an academic advisor.

Student: Hi, thanks for seeing me. I'm a second-year student, and I'm thinking pretty seriously about changing my major—I'm in biology right now, but I want to switch to environmental science. I just wasn't sure how to actually do it, or whether it's even a good idea at this point.

Advisor: Sure, let's talk it through. First, can I ask what's driving the change? Sometimes students want to switch because of one bad class, and that's not always the best reason.

Student: No, it's not that. I actually like my biology classes. It's more that I did a summer volunteer program on water quality, testing rivers and streams, and I realized that's the kind of work I want to do. Environmental science feels much closer to that than straight biology.

Advisor: That's a great reason, actually—it's based on real experience, not just a single grade. So here's the good news: biology and environmental science share a lot of the same foundation. Your intro biology, chemistry, and statistics courses will almost certainly count toward the new major.

Student: Oh, that's a relief. I was worried I'd basically be starting from zero and adding two more years.

Advisor: No, nothing like that. Let me pull up the requirements. The main difference is that environmental science adds some courses you haven't taken—things like environmental policy and a field-methods course—but it requires less of the advanced molecular biology you'd otherwise be heading into. My rough estimate is that you'd still graduate on time, maybe one extra summer course at most.

Student: That sounds totally manageable. What do I actually need to do to make the switch official?

Advisor: You'll fill out a change-of-major form—it's online, on the registrar's page. It needs a signature from the environmental science department, so you should meet with their advisor too, just to confirm the course plan. But before you submit anything, I'd strongly suggest one thing: sit in on an environmental science course this term, even informally. Make sure the actual classes feel like what you're imagining.

Student: That's smart. I'll do that first. Thank you—this is way less scary than I thought.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What are the speakers mainly discussing?",
          choices: [
            "Whether the student should switch from biology to environmental science",
            "How to improve the student's grade in a biology class",
            "Which summer volunteer program the student should join",
            "How to graduate a full year early",
          ],
          correct: 0,
          explanation: "The conversation centers on the student's possible change of major from biology to environmental science.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "Why does the student want to change majors?",
          choices: [
            "She received a poor grade in a required biology course.",
            "A summer program on water quality showed her the work she wants to do.",
            "Her friends are all in environmental science.",
            "Biology requires too many years to complete.",
          ],
          correct: 1,
          explanation: "She explains that a summer volunteer program testing rivers and streams made her realize environmental science fits the work she wants.",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the advisor say about the courses the student has already taken?",
          choices: [
            "None of them will count toward the new major.",
            "Only her chemistry course will transfer.",
            "Her intro biology, chemistry, and statistics will likely count toward the new major.",
            "She must retake all of her introductory courses.",
          ],
          correct: 2,
          explanation: "The advisor says the two majors share a foundation, so her \"intro biology, chemistry, and statistics courses will almost certainly count.\"",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "Why does the advisor ask what is driving the student's decision?",
          choices: [
            "To discourage the student from changing majors",
            "To check whether the reason is sound rather than a reaction to a single bad class",
            "To find out which professor the student dislikes",
            "To determine whether the student can afford the change",
          ],
          correct: 1,
          explanation: "The advisor notes that switching \"because of one bad class\" is \"not always the best reason,\" so the question probes whether the motivation is sound.",
        },
        {
          id: "l1q5", qtype: "Detail",
          prompt: "What does the advisor recommend the student do before submitting the change-of-major form?",
          choices: [
            "Drop all of her current biology courses",
            "Sit in on an environmental science course this term",
            "Wait until her third year to decide",
            "Take an extra molecular biology class",
          ],
          correct: 1,
          explanation: "The advisor \"strongly suggest[s]\" she \"sit in on an environmental science course this term\" to confirm it matches what she imagines.",
        },
      ],
    },
    {
      id: "l2",
      title: "Lecture: Bird Migration and Navigation (Biology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a biology class.

Professor: So today we're tackling one of the genuinely astonishing feats in the natural world—bird migration. And I don't just mean that some birds fly south for the winter. I mean that a small songbird, weighing less than an ounce, can travel thousands of miles, often at night, often alone, and arrive at a specific destination it may never have visited before. The obvious question—the one biologists have spent decades on—is: how on earth do they find their way?

Now, the first thing to understand is that birds don't rely on just one method of navigation. They use several, and they switch between them depending on the conditions. Let me walk you through the main ones.

The first is the sun. During the day, many birds use the position of the sun as a compass. But here's the catch—the sun moves across the sky over the course of the day. So to use it as a reliable compass, a bird needs an internal clock to compensate for that movement. And experiments confirm this: if you artificially shift a bird's internal clock—say, by keeping it under lights on a different schedule—the bird will head off in a predictably wrong direction. That's strong evidence that the sun compass and the internal clock work together.

The second method is the stars. Birds that migrate at night can orient using the night sky. In a classic experiment, researchers placed migratory birds in a planetarium—an artificial dome that projects the stars. When the projected sky was rotated, the birds changed the direction they tried to fly. What's fascinating is that they seem to focus not on individual stars but on the center of rotation—the point the whole sky appears to turn around, which in the Northern Hemisphere is near the North Star.

The third and most surprising method is the Earth's magnetic field. Birds can apparently sense magnetic fields and use them as a compass—which is incredibly useful, because unlike the sun or stars, the magnetic field is available day or night, in clear weather or cloudy. Exactly how they detect it is still being worked out; there's evidence pointing to specialized molecules in the eye that may respond to magnetic fields. But the behavioral evidence that they can detect it is very strong.

So notice the bigger picture here. A migrating bird isn't betting everything on one cue. On a clear day, it might use the sun. On a clear night, the stars. And when clouds roll in and block both, it can fall back on the magnetic field. This redundancy—having multiple backup systems—is almost certainly why migration is so reliable. If one cue fails, another takes over. And that, more than any single mechanism, is the real lesson here.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "Why some birds choose not to migrate at all",
            "The several methods birds use to navigate during migration",
            "How birds build their nests in distant locations",
            "The dangers birds face from bad weather during migration",
          ],
          correct: 1,
          explanation: "The professor walks through the main navigation methods birds use — the sun, the stars, and the magnetic field.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "According to the professor, why does a bird need an internal clock to use the sun as a compass?",
          choices: [
            "Because the sun is only visible at night",
            "Because the sun moves across the sky during the day",
            "Because the sun's brightness changes with the seasons",
            "Because the clock tells the bird when to sleep",
          ],
          correct: 1,
          explanation: "Since \"the sun moves across the sky over the course of the day,\" a bird needs an internal clock to compensate for that movement.",
        },
        {
          id: "l2q3", qtype: "Organization",
          prompt: "Why does the professor describe the planetarium experiment?",
          choices: [
            "To show that birds cannot navigate by the stars",
            "To provide evidence that night-migrating birds orient by the night sky",
            "To explain how planetariums are built",
            "To prove that birds prefer to migrate during the day",
          ],
          correct: 1,
          explanation: "When the projected sky was rotated, the birds changed direction — evidence that they orient using the stars.",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "What do night-migrating birds appear to focus on in the night sky?",
          choices: [
            "The brightest single star",
            "The center of rotation, near the North Star",
            "The position of the moon",
            "The edges of the visible sky",
          ],
          correct: 1,
          explanation: "The professor says they focus \"not on individual stars but on the center of rotation,\" which in the Northern Hemisphere is near the North Star.",
        },
        {
          id: "l2q5", qtype: "Detail",
          prompt: "According to the professor, what is one advantage of using the Earth's magnetic field for navigation?",
          choices: [
            "It is more precise than any other method.",
            "It is available day or night and in any weather.",
            "It requires no internal clock at all to interpret.",
            "It can only be used near the North Star.",
          ],
          correct: 1,
          explanation: "Unlike the sun or stars, the magnetic field \"is available day or night, in clear weather or cloudy.\"",
        },
        {
          id: "l2q6", qtype: "Inference",
          prompt: "What does the professor suggest is the main reason bird migration is so reliable?",
          choices: [
            "Birds use only the single most accurate cue available.",
            "Birds have multiple backup navigation systems, so if one cue fails another takes over.",
            "Birds always migrate in large groups for safety.",
            "Birds avoid migrating whenever the weather is cloudy.",
          ],
          correct: 1,
          explanation: "The professor stresses that \"redundancy — having multiple backup systems — is almost certainly why migration is so reliable.\"",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: The Industrial Revolution and Urbanization (History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a history class.

Professor: Last week we talked about the technological side of the Industrial Revolution—the steam engine, the textile machinery, all of that. Today I want to shift the focus to something just as dramatic, but that people sometimes overlook: what all that industry did to where and how people actually lived. In other words, urbanization—the massive, rapid movement of people from the countryside into cities.

So let's set the stage. For most of human history, the overwhelming majority of people lived in rural areas and worked the land. As late as the early 1800s in Britain, most people were still rural. But within just a few decades, that flipped. By the middle of the century, for the first time in history, more than half the population of Britain lived in towns and cities. That is an astonishingly fast transformation.

Why did it happen? The key is the factory. Before industrialization, much manufacturing was done at home or in small workshops, spread out across the countryside. But the new machines were large, expensive, and powered first by water and then by steam. You couldn't put them in every cottage. They had to be concentrated in big factories—and those factories needed workers, lots of them, all in one place. So people moved to where the work was. Cities like Manchester grew at a staggering rate, in some decades nearly doubling in population.

Now, here's where I want to be careful, because there's a tendency to romanticize this. The reality for most of these new urban workers was harsh. Housing was thrown up quickly and cheaply, packed tightly together. Whole families often lived in a single room. Sanitation was poor or nonexistent—imagine thousands of people with no proper sewers or clean water. The result, predictably, was disease. Outbreaks of cholera and other illnesses swept through these crowded districts, and death rates in the worst city neighborhoods were genuinely shocking.

But—and this is the part I find most interesting—those very problems eventually drove reform. The conditions were so bad, and so visible, that they couldn't be ignored. Over the second half of the century, you start to see real responses: public health laws, the building of sewer systems, regulations on housing, and eventually limits on working hours and child labor. In a sense, the modern idea that a government is responsible for the basic living conditions of its citizens grew directly out of the crisis of the industrial city.

So when you think about the Industrial Revolution, don't just picture machines. Picture a society reorganizing itself around those machines—and then slowly, painfully, learning how to manage the consequences.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The invention of the steam engine and textile machinery",
            "How industrialization drove rapid urbanization and its consequences",
            "The decline of farming technology in the countryside",
            "The military history of nineteenth-century Britain",
          ],
          correct: 1,
          explanation: "The professor focuses on urbanization — people moving to cities because of industry — and the social problems and reforms that followed.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, what major change occurred in Britain by the middle of the nineteenth century?",
          choices: [
            "Most people returned from cities to the countryside.",
            "For the first time, more than half the population lived in towns and cities.",
            "Factories were closed and replaced by home workshops.",
            "The total population of Britain began to decline.",
          ],
          correct: 1,
          explanation: "The professor says that by mid-century \"more than half the population of Britain lived in towns and cities\" for the first time.",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "According to the professor, why did people move into the cities?",
          choices: [
            "The countryside had become too crowded to farm.",
            "Large, expensive machines had to be concentrated in factories that needed many workers.",
            "Cities offered cleaner air and better housing.",
            "The government required rural families to relocate.",
          ],
          correct: 1,
          explanation: "Because the new machines were large and expensive, they had to be in big factories, which \"needed workers, lots of them, all in one place.\"",
        },
        {
          id: "l3q4", qtype: "Function",
          prompt: "Why does the professor say, \"here's where I want to be careful, because there's a tendency to romanticize this\"?",
          choices: [
            "To warn that the living conditions of urban workers were actually very harsh",
            "To suggest that city life was more pleasant than people assume",
            "To argue that factories were not really important",
            "To indicate that the population figures are unreliable",
          ],
          correct: 0,
          explanation: "He says this to correct any rosy picture, stressing that \"the reality for most of these new urban workers was harsh.\"",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "According to the professor, what was one consequence of poor sanitation in the crowded cities?",
          choices: [
            "Factories were forced to close down.",
            "Outbreaks of cholera and other diseases with high death rates",
            "A rapid decline in the city populations",
            "An immediate ban on building new housing",
          ],
          correct: 1,
          explanation: "Poor sanitation led to disease: \"outbreaks of cholera and other illnesses\" with shockingly high death rates in the worst neighborhoods.",
        },
        {
          id: "l3q6", qtype: "Inference",
          prompt: "What does the professor imply about the harsh conditions of the industrial city?",
          choices: [
            "They were ignored throughout the entire century.",
            "They eventually drove reforms and the idea that government is responsible for citizens' living conditions.",
            "They had no lasting effect on later governments.",
            "They caused most people to move permanently back to rural areas.",
          ],
          correct: 1,
          explanation: "The professor says those very problems \"drove reform\" and that the modern idea of government responsibility \"grew directly out of the crisis of the industrial city.\"",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people believe that students should be required to take part in community service before they graduate. Others believe community service should be voluntary. Which view do you agree with, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your view in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Starting next semester, the university will replace its printed course catalog with an online-only system, and all class registration will be done through a new mobile app. The administration says this will save paper and let students register from anywhere without waiting in line.\n\n[Then you hear two students discussing the change. The woman supports the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): An economics textbook defines 'economies of scale' — the cost advantages a business gains as it produces more. As output increases, the cost of producing each individual unit tends to fall, because large fixed costs (such as machinery or a factory) are spread over a greater number of units.\n\n[Then you hear a professor give an example from a study of a factory that increased its production.]",
      prompt: "Using the example from the lecture, explain the concept of economies of scale.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two ways animals avoid being eaten by predators: some animals use camouflage, blending into their surroundings so predators cannot see them, while others use mimicry, resembling a dangerous or unpleasant species so predators leave them alone. The lecture gives one example of each.",
      prompt: "Using the points and examples from the lecture, explain two ways animals avoid predators.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general concept, then give BOTH examples from the lecture and contrast them (camouflage vs. mimicry).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Many communities are considering replacing their gas-powered public buses with electric buses. Supporters make three claims in favor of the change:

1. Electric buses are better for the environment because they produce no exhaust emissions while driving.
2. Electric buses are cheaper to operate over time because electricity costs less than fuel and the engines need less maintenance.
3. Electric buses are quieter, which improves quality of life for people living along bus routes.

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

Professor: Many universities are replacing printed textbooks with digital ones that students read on tablets or laptops. In your opinion, is this change good for students? Why or why not?

Priya (classmate): I think digital textbooks are a clear improvement. They cost less, they're far lighter to carry around, and you can search them instantly for any keyword.

Tom (classmate): I'm not convinced. I find it harder to concentrate and remember what I read on a screen, and a printed book never runs out of battery in the middle of studying.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
