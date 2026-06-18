import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 6 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_6: ToeflForm = {
  id: "toefl-6",
  title: "TOEFL iBT Practice Test 6",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "Glaciers and the Ice Age",
      passage:
`A glacier is a vast, slow-moving river of ice that forms wherever more snow falls each winter than melts away each summer. Over many years, the accumulating snow is buried, compressed, and gradually recrystallized into dense glacial ice. Once a body of ice grows thick enough—generally tens of meters deep—its own weight causes it to deform and begin to flow downhill or to spread outward under the pull of gravity. This flow is what distinguishes a true glacier from a simple, stationary snowfield. Although a glacier may appear motionless, it is in fact in constant, if extremely slow, motion, advancing by anywhere from a few centimeters to several meters in a single day.

The great ice ages of Earth's past were periods when glaciers expanded far beyond the polar regions and high mountains where they survive today. During the most recent ice age, which reached its peak roughly twenty thousand years ago, immense sheets of ice up to several kilometers thick buried much of North America, northern Europe, and Asia. So much of the planet's water was locked up in these ice sheets that sea levels dropped by more than a hundred meters, exposing land bridges that connected regions now separated by ocean. The climate during this period was not uniformly frozen; rather, the ice advanced and retreated repeatedly as the global temperature fluctuated over tens of thousands of years.

What causes ice ages to begin and end has long puzzled scientists. The leading explanation centers on small, regular variations in the Earth's orbit and in the tilt of its axis. These variations slightly alter the amount and the distribution of sunlight that reaches the planet's surface, particularly at high latitudes. When summers in the far north become cool enough that winter snow fails to melt completely, the snow accumulates year after year, and ice sheets begin to grow. The changes in sunlight are themselves quite small, but they can be amplified by feedback effects. Fresh snow and ice, for instance, are brilliantly white and reflect a large fraction of the sunlight that strikes them back into space, which cools the surface further and encourages still more ice to form.

Glaciers have left an unmistakable signature on the landscapes they once covered. As a glacier flows, it acts like a colossal sheet of sandpaper, grinding against the bedrock beneath it and plucking loose enormous quantities of rock and soil. This debris is carried along, frozen within the ice, and dumped wherever the glacier finally melts. The result is a distinctive set of landforms: broad U-shaped valleys carved by mountain glaciers, long ridges of jumbled rock and gravel called moraines, and countless lakes that fill the hollows the ice scooped out. Even far from any present-day glacier, geologists can read these features and reconstruct the extent of vanished ice sheets with remarkable confidence.

Studying past ice ages is far more than an exercise in reconstructing ancient history. By drilling deep into the ice that still remains in Antarctica and Greenland, researchers can recover cores containing tiny bubbles of air trapped when the snow first fell, some of it hundreds of thousands of years ago. These bubbles preserve samples of the ancient atmosphere, allowing scientists to measure how the concentration of certain gases rose and fell in step with the great cycles of cold and warmth. Understanding how the climate behaved during these natural swings gives researchers a crucial baseline against which to judge the changes unfolding in the world today.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what distinguishes a true glacier from a stationary snowfield?",
          choices: [
            "A glacier is always found in polar regions.",
            "A glacier flows because its own weight causes the ice to deform.",
            "A glacier is made of snow rather than ice.",
            "A glacier never melts during the summer.",
          ],
          correct: 1,
          explanation: "Paragraph 1 says that once ice grows thick enough, \"its own weight causes it to deform and begin to flow,\" and that this flow \"distinguishes a true glacier from a simple, stationary snowfield.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"immense\" in paragraph 2 is closest in meaning to",
          choices: ["ancient", "enormous", "fragile", "shifting"],
          correct: 1,
          explanation: "\"Immense\" sheets of ice \"up to several kilometers thick\" means enormous, very large.",
        },
        {
          id: "r1q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what was one effect of so much water being locked up in ice sheets?",
          choices: [
            "Mountains rose higher in the polar regions.",
            "Sea levels dropped, exposing land bridges.",
            "The global climate became uniformly frozen.",
            "Rivers stopped flowing in northern Europe.",
          ],
          correct: 1,
          explanation: "The paragraph states sea levels \"dropped by more than a hundred meters, exposing land bridges that connected regions now separated by ocean.\"",
        },
        {
          id: "r1q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, the leading explanation for the beginning and ending of ice ages centers on",
          choices: [
            "volcanic eruptions that block sunlight",
            "small, regular variations in Earth's orbit and axial tilt",
            "sudden shifts in the position of the continents",
            "changes in the salt content of the oceans",
          ],
          correct: 1,
          explanation: "The paragraph says the leading explanation \"centers on small, regular variations in the Earth's orbit and in the tilt of its axis.\"",
        },
        {
          id: "r1q5", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention that fresh snow and ice are \"brilliantly white\" in paragraph 3?",
          choices: [
            "To explain a feedback effect that amplifies cooling and ice formation",
            "To describe how glaciers are easy to spot from a distance",
            "To prove that orbital changes have no real effect on climate",
            "To show that snow is more reflective than bedrock for aesthetic reasons",
          ],
          correct: 0,
          explanation: "The white snow reflects sunlight back into space, which \"cools the surface further and encourages still more ice to form\" — a feedback effect that amplifies the small orbital changes.",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"The changes in sunlight are themselves quite small, but they can be amplified by feedback effects.\"",
          choices: [
            "Feedback effects reduce the small changes in sunlight until they disappear.",
            "Though the sunlight changes are small, feedback effects can make their impact much larger.",
            "Large changes in sunlight are needed before any feedback effects begin.",
            "Sunlight changes and feedback effects are completely unrelated to each other.",
          ],
          correct: 1,
          explanation: "The sentence means the small sunlight changes get magnified by feedback. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Detail",
          prompt: "According to paragraph 4, how do glaciers reshape the landscape as they flow?",
          choices: [
            "They deposit fresh snow that hardens into bedrock.",
            "They grind against the bedrock and carry away rock and soil.",
            "They cause volcanoes to erupt beneath the ice.",
            "They raise the level of nearby lakes and rivers.",
          ],
          correct: 1,
          explanation: "A glacier \"acts like a colossal sheet of sandpaper, grinding against the bedrock\" and plucking loose rock and soil, which it later dumps.",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 4, all of the following are landforms left by glaciers EXCEPT:",
          choices: [
            "broad U-shaped valleys",
            "ridges of rock and gravel called moraines",
            "lakes filling hollows scooped out by ice",
            "tall volcanic cones formed by eruptions",
          ],
          correct: 3,
          explanation: "The paragraph lists U-shaped valleys, moraines, and lakes. Volcanic cones are not mentioned as glacial landforms.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"In effect, each bubble is a tiny time capsule of the air as it was long ago.\"",
          choices: [
            "Before \"By drilling deep into the ice...\"",
            "After \"...some of it hundreds of thousands of years ago.\"",
            "After \"...the great cycles of cold and warmth.\"",
            "Before \"Understanding how the climate behaved...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence calls each bubble a \"time capsule,\" which fits best right after the description of bubbles trapping air from hundreds of thousands of years ago.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Glaciers and the ice ages have shaped Earth's surface and remain valuable to science.\"",
          choices: [
            "Glaciers are flowing bodies of ice that expanded far beyond the poles during past ice ages.",
            "Small orbital and tilt variations, amplified by feedback, are the leading explanation for ice ages.",
            "Glaciers carve distinctive landforms and the trapped air in ice cores records ancient climate.",
            "Glaciers move several kilometers every single day across the landscape.",
            "Ice ages occurred only once in Earth's entire history.",
            "Moraines are formed when volcanoes erupt beneath the ice.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "Key ideas: glaciers and their ice-age expansion (A), the orbital/feedback explanation (B), and the landforms plus ice-core record (C). D, E, and F are false or overstated.",
        },
      ],
    },
    {
      id: "r2",
      title: "The Evolution of Flight in Birds",
      passage:
`Few questions in biology have generated as much debate as the origin of bird flight. Today, the evidence overwhelmingly indicates that birds are the living descendants of a group of small, feathered, two-legged dinosaurs. Fossils unearthed over the past several decades have blurred the once-sharp line between dinosaurs and birds, revealing creatures that possessed feathers, wishbones, and other features long thought to belong to birds alone. Yet establishing that birds evolved from dinosaurs is only the beginning. The harder problem is explaining how the ancestors of birds made the extraordinary transition from running and leaping on the ground to true, powered flight through the air.

Feathers themselves did not evolve for flying. The earliest feathers, preserved on dinosaurs that clearly could not fly, were simple, hair-like structures. They most likely served to insulate the body, helping a small, active animal retain heat. Only later did feathers become broad, flat, and asymmetrical—the shape required to generate lift. This pattern, in which a structure first arises for one purpose and is later adapted for an entirely different one, is common in evolution. Insulating down, in other words, was eventually co-opted into the machinery of flight, long after it first appeared.

Two competing scenarios have traditionally been proposed to explain how flight itself began. The first, often called the "trees-down" hypothesis, holds that the ancestors of birds were small animals that climbed trees and leaped between branches. Gliding from a height would have offered an immediate advantage—escaping predators, reaching food, or simply moving efficiently—and feathered limbs would have extended each leap into a controlled glide. Over many generations, the argument goes, gliding gradually gave way to flapping, and flapping to sustained, powered flight.

The rival "ground-up" hypothesis begins not in the trees but on open ground. It pictures the ancestors of birds as fast-running, two-legged hunters that used their feathered forelimbs while sprinting after prey or escaping danger. Flapping these limbs, the theory suggests, could have provided extra thrust, lift, or stability during a high-speed chase. Critics of the trees-down view note that the closest dinosaur relatives of birds appear to have been ground-dwelling runners, not climbers, which would seem to favor a ground-based origin for flight.

In recent years, a striking observation has offered fresh support for the ground-up scenario. Biologists studying certain modern ground birds noticed that the chicks, although too young to fly, vigorously flap their developing wings while scrambling up steep slopes and obstacles. The flapping presses their feet more firmly against the surface, much as a spoiler holds a race car to the track, allowing the birds to run up inclines far steeper than they could otherwise manage. This behavior, dubbed wing-assisted incline running, suggests a plausible series of intermediate steps. A flapping motion that began simply as a way to climb obstacles more securely could, over evolutionary time, have been refined into the powerful downstroke of true flight.

It may be that no single scenario captures the whole truth. Evolution rarely proceeds along one tidy path, and the ancestors of birds may have exploited both the trees and the ground at different times. What is no longer seriously in dispute is the larger picture: flight in birds was not a sudden invention but the cumulative product of many small modifications, each useful in its own right, assembled gradually over millions of years.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what does the fossil evidence of recent decades indicate?",
          choices: [
            "Birds and dinosaurs evolved completely separately.",
            "Birds are the living descendants of small, feathered dinosaurs.",
            "Feathers first appeared on flying reptiles.",
            "Dinosaurs were unable to run or leap on the ground.",
          ],
          correct: 1,
          explanation: "Paragraph 1 states the evidence \"overwhelmingly indicates that birds are the living descendants of a group of small, feathered, two-legged dinosaurs.\"",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The phrase \"co-opted\" in paragraph 2 is closest in meaning to",
          choices: ["destroyed", "repurposed", "weakened", "duplicated"],
          correct: 1,
          explanation: "Insulating down was \"co-opted into the machinery of flight\" — that is, taken over and repurposed for a new use.",
        },
        {
          id: "r2q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what was the most likely original function of the earliest feathers?",
          choices: [
            "To generate lift for gliding",
            "To insulate the body and retain heat",
            "To attract mates during courtship",
            "To protect the skin from sunlight",
          ],
          correct: 1,
          explanation: "The earliest, hair-like feathers \"most likely served to insulate the body, helping a small, active animal retain heat.\"",
        },
        {
          id: "r2q4", qtype: "Detail",
          prompt: "According to paragraph 3, what advantage does the \"trees-down\" hypothesis propose for early feathered limbs?",
          choices: [
            "They allowed the animals to dig burrows more quickly.",
            "They extended each leap between branches into a controlled glide.",
            "They helped the animals run faster on open ground.",
            "They kept the animals warm in cold mountain climates.",
          ],
          correct: 1,
          explanation: "Under the trees-down view, \"feathered limbs would have extended each leap into a controlled glide.\"",
        },
        {
          id: "r2q5", qtype: "Detail",
          prompt: "According to paragraph 4, what point do critics of the trees-down view raise?",
          choices: [
            "The closest dinosaur relatives of birds were ground-dwelling runners, not climbers.",
            "Trees did not exist when birds first evolved.",
            "Gliding always requires asymmetrical feathers.",
            "Running birds cannot flap their forelimbs at all.",
          ],
          correct: 0,
          explanation: "Critics note that \"the closest dinosaur relatives of birds appear to have been ground-dwelling runners, not climbers,\" favoring a ground-based origin.",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author describe the behavior of modern ground-bird chicks in paragraph 5?",
          choices: [
            "To prove that the trees-down hypothesis is correct",
            "To provide observable support for the ground-up scenario",
            "To explain why some birds never learn to fly",
            "To show that feathers evolved for display rather than flight",
          ],
          correct: 1,
          explanation: "The chicks' wing-assisted incline running is offered as \"fresh support for the ground-up scenario,\" suggesting plausible intermediate steps toward flight.",
        },
        {
          id: "r2q7", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"This pattern, in which a structure first arises for one purpose and is later adapted for an entirely different one, is common in evolution.\"",
          choices: [
            "In evolution, structures keep the same purpose forever.",
            "It is common in evolution for a structure to arise for one purpose and later be adapted for another.",
            "Structures that change purpose rarely survive in evolution.",
            "Most structures in evolution serve no useful purpose at all.",
          ],
          correct: 1,
          explanation: "The sentence says a structure arising for one use and later serving another is a common evolutionary pattern. Choice B restates that faithfully.",
        },
        {
          id: "r2q8", qtype: "Detail",
          prompt: "According to paragraph 5, what does the flapping of the chicks' wings accomplish?",
          choices: [
            "It lifts the chicks briefly into the air.",
            "It presses their feet more firmly against the surface so they can run up steep slopes.",
            "It cools the chicks during fast running.",
            "It signals danger to the rest of the flock.",
          ],
          correct: 1,
          explanation: "The flapping \"presses their feet more firmly against the surface,\" like a spoiler on a race car, letting them climb steeper inclines.",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 6?\n\n\"Nature, after all, is not obliged to choose between two textbook explanations.\"",
          choices: [
            "Before \"It may be that no single scenario captures the whole truth.\"",
            "After \"...exploited both the trees and the ground at different times.\"",
            "After \"...assembled gradually over millions of years.\"",
            "Before \"What is no longer seriously in dispute...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence reinforces the idea that birds may have used both trees and ground, so it fits best right after that statement.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Scientists have pieced together how flight gradually evolved in the ancestors of birds.\"",
          choices: [
            "Birds descended from feathered dinosaurs, and early feathers first served as insulation.",
            "Two main hypotheses—trees-down and ground-up—explain how flight may have begun.",
            "Modern ground-bird chicks that flap while climbing support a gradual, ground-based path to flight.",
            "Feathers evolved suddenly and were used for flight from the very start.",
            "Birds and dinosaurs share no anatomical features whatsoever.",
            "Flight appeared fully formed in a single generation of birds.",
          ],
          correct: 0,
          correctSet: [0, 1, 2],
          explanation: "Key ideas: the dinosaur origin and insulating feathers (A), the two competing hypotheses (B), and the chick behavior supporting a gradual ground-up path (C). D, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (two conversations + three lectures) ─────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Registrar",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a staff member in the registrar's office.

Student: Hi, I'm hoping you can help me figure something out about my graduation requirements. I'm planning to graduate this spring, and I just want to make absolutely sure I'm not missing anything.

Registrar: Of course, that's exactly what we're here for. Let me pull up your record. Can you tell me your major and your student ID?

Student: Sure, I'm a history major, and my ID is 4-4-7-2-1-0.

Registrar: Got it. Okay, I'm looking at your degree audit right now. Most things look complete—your major requirements are done, your credit total is fine. But there's one item flagged here in yellow. It says you still need to satisfy the upper-level writing requirement.

Student: Wait, really? I thought I took care of that. I wrote a huge research paper in my American history seminar last year.

Registrar: That's the tricky part. The writing requirement isn't satisfied just by writing a long paper. The course itself has to be officially designated as "writing-intensive." Those courses have a special "W" label in the catalog. Let me check whether your seminar had it... no, it looks like that particular section wasn't a designated W course.

Student: Oh no. So that paper doesn't count at all?

Registrar: Not toward this specific requirement, I'm afraid. But don't panic—this is very fixable. You just need to take one course this spring that carries the W designation. Plenty of departments offer them, and several are in history, so it should fit naturally with your interests.

Student: Okay, that's a relief. How do I find which ones are W courses?

Registrar: When you search the course catalog, there's a filter for "writing-intensive." Just check that box and it'll show you only the qualifying sections. Pick one, register for it, and once you complete it, the requirement clears automatically.

Student: That's much less scary than I thought. I'll go search right now and get one added before the deadline.

Registrar: Perfect. And if the audit still shows the flag after you register, come back and I'll make sure it updates correctly.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Purpose",
          prompt: "Why does the student go to the registrar's office?",
          choices: [
            "To change her major from history to writing",
            "To confirm she has met all her graduation requirements",
            "To complain about a grade in her history seminar",
            "To request an extension on a research paper",
          ],
          correct: 1,
          explanation: "The student says she is planning to graduate and wants to \"make absolutely sure I'm not missing anything\" — checking her graduation requirements.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "What requirement has the student not yet satisfied?",
          choices: [
            "The total number of credits needed to graduate",
            "The upper-level writing requirement",
            "A required foreign language course",
            "The minimum grade point average",
          ],
          correct: 1,
          explanation: "The registrar says the only item flagged is that \"you still need to satisfy the upper-level writing requirement.\"",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "Why does the research paper the student already wrote not satisfy the requirement?",
          choices: [
            "It was too short to count.",
            "The course was not officially designated as writing-intensive.",
            "She received a failing grade on it.",
            "It was written in a non-history course.",
          ],
          correct: 1,
          explanation: "The registrar explains the course \"has to be officially designated as 'writing-intensive,'\" and her seminar section was not a designated W course.",
        },
        {
          id: "l1q4", qtype: "Detail",
          prompt: "How can the student find courses that satisfy the writing requirement?",
          choices: [
            "By emailing each department individually",
            "By using the catalog's 'writing-intensive' filter",
            "By asking the registrar to assign her a course",
            "By looking only at history department offerings",
          ],
          correct: 1,
          explanation: "The registrar says to check the \"writing-intensive\" filter box in the course catalog, which shows only qualifying sections.",
        },
        {
          id: "l1q5", qtype: "Attitude",
          prompt: "How does the student feel by the end of the conversation?",
          choices: [
            "Frustrated that she must repeat her entire seminar",
            "Relieved that the problem is easy to fix",
            "Uncertain about whether she will graduate at all",
            "Annoyed that the registrar cannot help her",
          ],
          correct: 1,
          explanation: "She says \"That's much less scary than I thought\" and \"that's a relief,\" showing she feels relieved the issue is easily fixable.",
        },
      ],
    },
    {
      id: "l2",
      title: "Lecture: Ocean Currents and Climate (Oceanography)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an oceanography class.

Professor: Alright, last week we looked at how the atmosphere moves heat around the planet. Today I want to turn to the other great heat-transport system on Earth—the ocean. And I want to convince you of something that sounds surprising at first: the ocean has just as much to do with the climate you experience as the air does. Maybe more.

So let's start with a basic fact. The sun doesn't heat the Earth evenly. The tropics, near the equator, receive far more solar energy than the poles do. If there were no way to move that heat around, the tropics would be unbearably hot and the poles would be impossibly cold. The atmosphere carries some of that excess heat toward the poles—but so does the ocean, through a system of currents.

Now, there are two kinds of currents I want you to keep separate in your mind. The first kind is surface currents. These are driven mainly by the wind, blowing across the top of the ocean. The most famous example is the Gulf Stream, which carries warm water from the tropical Atlantic up along the east coast of North America and then across toward Europe. And this matters enormously. Western Europe is much warmer than you'd expect for how far north it is. London is actually farther north than parts of Canada that have brutal winters, yet London's winters are relatively mild. A big reason is all that warm water and warm air arriving from the Gulf Stream.

The second kind of current is deep-ocean circulation, and this one is driven not by wind but by differences in the density of the water. Here's how it works. When water is cold and salty, it becomes dense—heavy—and it sinks. This happens dramatically in the far North Atlantic. Warm surface water flows north, gradually loses its heat to the cold air, becomes denser, and plunges down into the deep ocean. From there it travels slowly along the bottom, all the way around the globe, before eventually rising again elsewhere. This enormous, slow loop is sometimes called the "global conveyor belt," and a single drop of water can take roughly a thousand years to complete the full circuit.

Now here's why this matters for climate, and why scientists watch it so closely. That conveyor belt is part of what keeps heat flowing toward the North Atlantic. But the sinking depends on the water being salty enough to be dense. If a large amount of fresh water—say, from melting ice—were added to the North Atlantic, it could dilute the salt, make the water less dense, and slow the sinking. And if the conveyor slowed, the flow of warm water toward Europe could weaken. It's a striking irony: a warming planet could, in this particular region, actually bring cooler conditions. So the ocean isn't just a passive bathtub absorbing heat. It's an active, moving engine of climate—and a delicately balanced one.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How wind patterns form over the open ocean",
            "How ocean currents move heat around the planet and influence climate",
            "Why the tropics receive more sunlight than the poles",
            "How sailors historically used the Gulf Stream",
          ],
          correct: 1,
          explanation: "The professor focuses on how the ocean's currents transport heat and shape climate, contrasting surface and deep-ocean circulation.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "According to the professor, what drives surface currents?",
          choices: [
            "Differences in water density",
            "The wind blowing across the ocean's surface",
            "The melting of polar ice",
            "Earthquakes on the ocean floor",
          ],
          correct: 1,
          explanation: "The professor says surface currents \"are driven mainly by the wind, blowing across the top of the ocean.\"",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "Why does the professor mention that London is farther north than parts of Canada?",
          choices: [
            "To show that London has unusually mild winters because of the Gulf Stream",
            "To explain why Canada has colder summers than Europe",
            "To prove that latitude has no effect on climate",
            "To illustrate how deep-ocean currents reach London",
          ],
          correct: 0,
          explanation: "The example shows that despite its northern latitude, London's winters are mild largely because of warm water and air from the Gulf Stream.",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "According to the professor, what causes water to sink in the far North Atlantic?",
          choices: [
            "It becomes warm and light.",
            "It becomes cold and salty, and therefore dense.",
            "It is pushed down by strong winds.",
            "It mixes with fresh water from melting ice.",
          ],
          correct: 1,
          explanation: "The professor explains that \"when water is cold and salty, it becomes dense—heavy—and it sinks,\" as warm surface water loses heat in the North Atlantic.",
        },
        {
          id: "l2q5", qtype: "Organization",
          prompt: "How does the professor organize the discussion of ocean currents?",
          choices: [
            "By comparing the ocean to the atmosphere only",
            "By distinguishing two kinds of currents: wind-driven surface currents and density-driven deep circulation",
            "By tracing the history of ocean exploration",
            "By listing the world's oceans from largest to smallest",
          ],
          correct: 1,
          explanation: "The professor explicitly separates \"two kinds of currents\": wind-driven surface currents and density-driven deep-ocean circulation.",
        },
        {
          id: "l2q6", qtype: "Inference",
          prompt: "What does the professor imply could happen if a large amount of fresh water entered the North Atlantic?",
          choices: [
            "The Gulf Stream would speed up dramatically.",
            "The sinking of water could slow, weakening the flow of warm water toward Europe.",
            "The tropics would receive less sunlight.",
            "Surface currents would stop being driven by wind.",
          ],
          correct: 1,
          explanation: "Fresh water could dilute the salt and slow the sinking; if the conveyor slowed, \"the flow of warm water toward Europe could weaken,\" possibly bringing cooler conditions.",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: Cognitive Dissonance (Psychology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a psychology class.

Professor: Today I want to introduce one of the most influential ideas in social psychology—a concept called cognitive dissonance. And I think the best way to understand it is to start with how it feels, because all of you have experienced it, even if you didn't have a name for it.

Cognitive dissonance is the uncomfortable mental tension we feel when we hold two beliefs that contradict each other, or when our actions don't line up with our beliefs. Our minds, it turns out, really dislike that kind of inconsistency. And so we're strongly motivated to get rid of the discomfort—to reduce the dissonance somehow.

Let me give you the classic example. Imagine a person who smokes cigarettes. This person also knows, perfectly well, that smoking is harmful—it causes serious disease. So now they're holding two conflicting thoughts: "I smoke," and "smoking will hurt me." That's uncomfortable. Now, the logical solution would be to quit smoking. But quitting is hard. So very often, people resolve the tension a different way—by changing the belief instead of the behavior. They might tell themselves, "Well, my grandfather smoked his whole life and lived to ninety," or "The research is probably exaggerated." Notice what's happening: rather than change the action, they adjust their thinking to make the discomfort go away.

Now, here's the experiment that really put this concept on the map. Researchers asked people to perform an extremely boring task for an hour—turning pegs, over and over. Then each participant was asked to tell the next person waiting that the task had been fun and interesting. In other words, to lie. Here's the clever part. Some participants were paid twenty dollars to tell this lie. Others were paid only one dollar. Afterward, everyone was asked how they really felt about the task.

And here's the surprising result. The people paid twenty dollars still said, honestly, that the task was boring. But the people paid just one dollar actually rated the task as more enjoyable. Now think about why. If you were paid twenty dollars, you had a solid reason to lie—the money justified it, so there was no dissonance. But if you were paid only one dollar, that's not enough to justify lying. So you're left with tension: "I said it was fun, but I had almost no reason to." And the way the mind resolves that? It quietly decides, "You know what, maybe the task really wasn't so bad after all." The belief shifts to match the behavior.

So the takeaway is this: we like to think our beliefs drive our actions. But cognitive dissonance shows the arrow can run the other way too. Sometimes we act first, and then rearrange our beliefs to fit what we've already done.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "Why people choose to smoke despite the health risks",
            "The concept of cognitive dissonance and how people reduce it",
            "How to design a fair psychology experiment",
            "The difference between beliefs and emotions",
          ],
          correct: 1,
          explanation: "The professor explains cognitive dissonance—the tension from inconsistent beliefs or actions—and the ways people resolve it.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, what is cognitive dissonance?",
          choices: [
            "The pleasure we feel when our beliefs are confirmed",
            "The uncomfortable tension from holding contradictory beliefs or acting against our beliefs",
            "The inability to remember two facts at the same time",
            "A disagreement between two different people",
          ],
          correct: 1,
          explanation: "He defines it as \"the uncomfortable mental tension we feel when we hold two beliefs that contradict each other, or when our actions don't line up with our beliefs.\"",
        },
        {
          id: "l3q3", qtype: "Function",
          prompt: "Why does the professor describe the example of a smoker?",
          choices: [
            "To argue that everyone should stop smoking",
            "To illustrate how people often change a belief instead of their behavior to reduce dissonance",
            "To prove that smoking is not actually harmful",
            "To explain how addiction affects the brain",
          ],
          correct: 1,
          explanation: "The smoker example shows that rather than quitting, people often \"adjust their thinking\" — changing the belief rather than the behavior — to reduce dissonance.",
        },
        {
          id: "l3q4", qtype: "Detail",
          prompt: "In the experiment, what did participants do before being asked how they felt about the task?",
          choices: [
            "They watched a film about a boring job.",
            "They told the next person that the boring task had been fun.",
            "They each completed a written survey about honesty.",
            "They chose how much money they wanted to be paid.",
          ],
          correct: 1,
          explanation: "After the boring peg-turning task, each participant \"was asked to tell the next person waiting that the task had been fun and interesting\" — that is, to lie.",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "What was the surprising result of the experiment?",
          choices: [
            "Those paid twenty dollars rated the task as more enjoyable.",
            "Those paid only one dollar rated the task as more enjoyable.",
            "Both groups rated the task as equally boring.",
            "Nobody was willing to lie about the task.",
          ],
          correct: 1,
          explanation: "The people paid just one dollar \"actually rated the task as more enjoyable,\" while those paid twenty dollars still called it boring.",
        },
        {
          id: "l3q6", qtype: "Inference",
          prompt: "According to the professor, why did the participants paid only one dollar change their opinion of the task?",
          choices: [
            "The small payment made them angry at the researchers.",
            "Without enough money to justify lying, they reduced the tension by deciding the task wasn't so bad.",
            "They forgot how boring the task had actually been.",
            "They wanted to be paid the same as the other group.",
          ],
          correct: 1,
          explanation: "One dollar wasn't enough to justify the lie, so to resolve the dissonance their belief shifted: \"maybe the task really wasn't so bad after all.\"",
        },
      ],
    },
    {
      id: "l4",
      title: "Conversation: Student and Lab Manager",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a chemistry lab manager.

Student: Hi, are you the lab manager? My professor told me I need to sign up for lab safety training before I can start my research project this semester.

Manager: Yes, that's me. And your professor is right—nobody works in our research labs without completing the safety training first. It's a strict rule, no exceptions. Are you the new student joining Professor Reyes's group?

Student: That's me. I'm really excited to get started, but I wasn't sure what the training actually involves.

Manager: Sure, let me walk you through it. The training has two parts. The first part is an online module. You log in, watch a series of short videos, and then take a quiz at the end. It covers the basics—how to read chemical labels, what the different hazard symbols mean, where the emergency equipment is, that kind of thing.

Student: Okay, that sounds manageable. Can I do that part from home?

Manager: Absolutely, the online part you can do anywhere, on your own schedule. But here's the important thing—you have to pass the quiz before you can move on. You need an eighty percent or higher. If you don't pass, you can retake it, so don't stress about it.

Student: Got it. And what's the second part?

Manager: The second part has to be done in person, here in the lab. It's a hands-on session. I'll show you how to use the safety equipment for real—the eyewash station, the fume hood, the fire extinguisher, the chemical spill kit. You actually practice with them. That's the part you can't fake by watching a video, which is why we require it face-to-face.

Student: That makes sense. So how do I sign up for the in-person session?

Manager: Once you've passed the online quiz, the system will email you a link to book a hands-on slot. We run them on Tuesday and Thursday afternoons. I'd book early—they fill up fast at the start of the semester, and you can't enter the lab until both parts are done.

Student: Understood. I'll start the online module tonight so I can grab a session this week.

Manager: Perfect. Get the online part done, book your slot, and you'll be ready to start your project in no time.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Purpose",
          prompt: "Why does the student come to see the lab manager?",
          choices: [
            "To turn in a completed research project",
            "To sign up for required lab safety training",
            "To complain about a difficult quiz",
            "To borrow safety equipment for a class",
          ],
          correct: 1,
          explanation: "The student says her professor told her she needs to \"sign up for lab safety training before I can start my research project.\"",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "What does the first part of the training consist of?",
          choices: [
            "A hands-on session in the lab",
            "An online module with videos and a quiz",
            "A written report about lab procedures",
            "An interview with the professor",
          ],
          correct: 1,
          explanation: "The manager says the first part is \"an online module\" where you watch short videos \"and then take a quiz at the end.\"",
        },
        {
          id: "l4q3", qtype: "Detail",
          prompt: "What must the student do to move on from the online part?",
          choices: [
            "Watch every video at least twice",
            "Score eighty percent or higher on the quiz",
            "Get a signature from Professor Reyes",
            "Complete the module within one day",
          ],
          correct: 1,
          explanation: "The manager states \"you have to pass the quiz before you can move on. You need an eighty percent or higher.\"",
        },
        {
          id: "l4q4", qtype: "Detail",
          prompt: "Why must the second part of the training be done in person?",
          choices: [
            "Because the lab manager is only available in person",
            "Because students actually practice using the safety equipment, which can't be done by watching a video",
            "Because the online system is unreliable",
            "Because the professor wants to observe each student",
          ],
          correct: 1,
          explanation: "The hands-on session has students \"actually practice\" with the equipment — \"the part you can't fake by watching a video, which is why we require it face-to-face.\"",
        },
        {
          id: "l4q5", qtype: "Inference",
          prompt: "Why does the manager advise the student to book a hands-on session early?",
          choices: [
            "The sessions are more expensive later in the semester.",
            "The sessions fill up fast, and the student cannot enter the lab until both parts are done.",
            "Only morning sessions are available later on.",
            "The online quiz expires after one week.",
          ],
          correct: 1,
          explanation: "The manager says to book early because slots \"fill up fast at the start of the semester, and you can't enter the lab until both parts are done.\"",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The Birth of Jazz (Music History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a music history class.

Professor: Today we're going to talk about the birth of one of America's truly original art forms—jazz. And what I want you to come away with is an appreciation for the fact that jazz didn't just appear out of nowhere. It emerged from a very particular time and place, and from the blending of several different musical traditions. That place, above all, was the city of New Orleans, around the beginning of the twentieth century.

Why New Orleans? Well, New Orleans was unusually diverse, even for an American city. It was a busy port, a meeting point of cultures—African, European, Caribbean. And crucially, it had a strong tradition of public music. There were brass bands everywhere—playing at parades, at dances, even at funerals. So music was woven into daily life in a way that created the perfect conditions for something new to grow.

Now, jazz drew on several earlier styles, and I want to highlight two of them. The first is the blues. The blues came largely out of African American communities in the rural South—deeply expressive, vocal music, often about hardship and emotion. It gave jazz much of its feeling, and a particular way of bending and shaping notes that you don't find in European classical music. The second major ingredient was ragtime. Ragtime was a written, piano-based style, very popular around 1900, and it's known for its "ragged," syncopated rhythm—accents falling in unexpected places, off the main beat. Ragtime gave jazz a lot of its rhythmic energy.

But here's the thing that makes jazz jazz—the feature that really sets it apart. Improvisation. In most of the music Europeans were familiar with, a composer wrote down notes and performers played exactly what was on the page. In jazz, the musicians invent music on the spot. They take a melody, a basic structure, and then they spontaneously create new variations, right there in the performance. No two performances are ever quite the same. The musician becomes a composer in real time. And often this happens collectively—several players improvising together, responding to one another, almost like a musical conversation.

Now, one more crucial point about how jazz spread. In its earliest days, jazz was a live, local music. But two technologies changed everything. The first was the phonograph—the recording. Once jazz could be recorded, it could travel. A band in New Orleans could be heard in New York or Chicago without ever leaving home. The second was radio. Suddenly the music could reach millions of people at once. So within just a couple of decades, a regional style from one southern city became a national, and then an international, phenomenon. And that's a pattern worth remembering—a new art form, plus a new technology to carry it, can transform a whole culture remarkably fast.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The lives of individual jazz musicians in New Orleans",
            "How jazz emerged from blended traditions and then spread",
            "Why ragtime was more popular than the blues",
            "How to play improvised music on the piano",
          ],
          correct: 1,
          explanation: "The professor traces how jazz emerged in New Orleans from blended musical traditions and how it later spread nationally and internationally.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, why was New Orleans an ideal birthplace for jazz?",
          choices: [
            "It had the largest concert halls in the country.",
            "It was unusually diverse and had a strong tradition of public music.",
            "It banned European classical music.",
            "It was home to the first recording studios.",
          ],
          correct: 1,
          explanation: "New Orleans was \"unusually diverse\" — a meeting point of cultures — with brass bands everywhere and \"a strong tradition of public music.\"",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "According to the professor, what did ragtime contribute to jazz?",
          choices: [
            "Its emotional, vocal quality",
            "Its 'ragged,' syncopated rhythmic energy",
            "Its tradition of written classical scores",
            "Its use of brass band instruments",
          ],
          correct: 1,
          explanation: "Ragtime is \"known for its 'ragged,' syncopated rhythm\" and \"gave jazz a lot of its rhythmic energy.\"",
        },
        {
          id: "l5q4", qtype: "Detail",
          prompt: "According to the professor, what feature most sets jazz apart from European classical music?",
          choices: [
            "Its use of written sheet music",
            "Improvisation—musicians inventing music on the spot",
            "Its reliance on solo performers only",
            "Its slow, mournful tempo",
          ],
          correct: 1,
          explanation: "The professor says the feature that \"makes jazz jazz\" is improvisation: musicians \"invent music on the spot,\" unlike classical players who follow the written page.",
        },
        {
          id: "l5q5", qtype: "Organization",
          prompt: "How does the professor explain the way jazz spread beyond New Orleans?",
          choices: [
            "By describing two technologies—the phonograph and radio—that carried the music",
            "By listing the cities where jazz bands toured in order",
            "By comparing jazz recordings to classical recordings",
            "By tracing the careers of famous radio announcers",
          ],
          correct: 0,
          explanation: "The professor credits \"two technologies\" — the phonograph (recording) and radio — for letting jazz travel and reach millions, spreading it nationally and internationally.",
        },
        {
          id: "l5q6", qtype: "Inference",
          prompt: "What general lesson does the professor draw at the end of the lecture?",
          choices: [
            "Regional music styles rarely become popular elsewhere.",
            "A new art form combined with a new technology to carry it can transform a culture very quickly.",
            "Recordings always sound worse than live performances.",
            "Jazz could only have developed in the twentieth century.",
          ],
          correct: 1,
          explanation: "He concludes that \"a new art form, plus a new technology to carry it, can transform a whole culture remarkably fast.\"",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people believe that children should start learning a second language at an early age. Others believe it is better to wait until children are older. Which view do you agree with, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your position in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Beginning next semester, the university will reduce the number of meal-plan options from five to two and will end the popular \"pay-as-you-go\" plan. Administrators say the simpler system will lower costs and make dining services easier to manage.\n\n[Then you hear two students discussing the change. The woman disagrees with the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines the 'sunk cost fallacy' — the mistake of continuing an activity or investment because of the time, money, or effort already spent on it, even when continuing is no longer the best choice. People feel they must not 'waste' what they have already put in.\n\n[Then you hear a professor give an example involving a person and a movie ticket.]",
      prompt: "Using the example from the lecture, explain the concept of the sunk cost fallacy.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two ways plants defend themselves against herbivores: physical defenses, such as sharp thorns and tough, prickly leaves that make a plant difficult to eat, and chemical defenses, such as bitter or toxic compounds that make a plant taste bad or even sicken the animal that eats it. The lecture gives an example of each.",
      prompt: "Using the points and examples from the lecture, explain the two ways plants defend themselves against herbivores.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general concept, then give BOTH examples from the lecture and contrast them (physical thorns vs. chemical toxins).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): A regional government has proposed building a new hydroelectric dam on a major river. Supporters make three claims in its favor:

1. The dam will provide clean, renewable electricity that produces almost no air pollution.
2. The reservoir behind the dam will store water and help control seasonal flooding downstream.
3. The construction and tourism around the reservoir will create many new jobs for the local economy.

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

Professor: Many universities are debating whether to ban laptops and other electronic devices during lectures. Some argue this improves focus, while others argue it removes a useful learning tool. In your opinion, should universities ban laptops in lectures? Why or why not?

Olivia (classmate): I think laptops should be banned. Too many students end up browsing the internet or messaging friends, and it distracts the people sitting around them as well.

Noah (classmate): I disagree — laptops let us take notes quickly, look up unfamiliar terms, and access course materials instantly. Banning them punishes responsible students for the behavior of a few.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
