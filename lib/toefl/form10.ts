import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 10 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_10: ToeflForm = {
  id: "toefl-10",
  title: "TOEFL iBT Practice Test 10",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Construction of the Egyptian Pyramids",
      passage:
`The pyramids of ancient Egypt, especially the Great Pyramid of Giza built around 2560 BCE, remain among the most astonishing engineering achievements of the ancient world. The Great Pyramid originally rose to a height of about 146 meters and was constructed from roughly two and a half million blocks of limestone and granite, some weighing as much as fifteen tons. For nearly four thousand years it stood as the tallest human-made structure on Earth. That such a monument could be raised without iron tools, wheeled vehicles, or pulleys has long invited both admiration and wild speculation. Yet the evidence assembled by archaeologists points not to mystery but to careful organization, abundant labor, and a handful of ingenious techniques.

A central question concerns the workforce. For centuries it was widely assumed that the pyramids were built by vast armies of slaves, an image popularized by later Greek writers and reinforced by motion pictures. Modern excavation has overturned this picture. Near the Giza pyramids, archaeologists uncovered a sprawling settlement that housed the workers, complete with bakeries, breweries, and storerooms capable of feeding thousands. Even more telling, they found a cemetery in which laborers were buried with honor close to the pyramids themselves—a privilege that would never have been granted to slaves. Skeletons show healed fractures and signs of medical care, indicating that injured workers were treated rather than discarded. The picture that emerges is of a paid, well-fed, and rotating workforce of free Egyptians, many of them farmers conscripted during the months when the Nile flooded their fields and made agriculture impossible.

How the enormous stones were moved and lifted has prompted much debate. The quarrying itself is reasonably well understood: workers cut limestone blocks using copper chisels and wooden wedges, which were driven into cracks and then soaked with water so that they swelled and split the rock. Transporting the blocks across the desert was harder. A painted scene from a later Egyptian tomb shows a colossal statue being dragged on a wooden sledge, with one worker pouring water onto the sand in front of it. Experiments have confirmed the logic of this image: wetting the sand to just the right degree reduces the friction under a sledge by roughly half, so that far fewer people are needed to haul a heavy load.

Raising the blocks to ever greater heights presented the final challenge, and here the evidence is less direct. The most widely accepted explanation is that the Egyptians built ramps of mud brick and rubble against the rising structure, hauling the stones upward on sledges. Scholars disagree, however, about the ramps' shape. A single straight ramp would have had to be enormously long to reach the summit at a workable slope, requiring more material than the pyramid itself. Some researchers therefore favor a ramp that spiraled around the outside of the pyramid as it grew, while others propose ramps built within the structure. No single design has won universal agreement, and it is possible that more than one method was used over the course of construction.

What is not in dispute is the level of planning the project demanded. The sides of the Great Pyramid are aligned to the cardinal directions with an accuracy of a fraction of a degree, a feat achieved most likely by observing the stars. The base is nearly a perfect square and remarkably level across its more than five-hectare footprint. Coordinating the quarrying, transport, and placement of millions of blocks over roughly two decades required administrators, surveyors, and a reliable system of supply. Seen in this light, the pyramids testify less to any single secret technique than to the organizational genius of a society able to marshal its people and resources toward a common monumental goal.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what makes the Great Pyramid especially remarkable as an engineering feat?",
          choices: [
            "It was built far more quickly than later monuments.",
            "It was raised without iron tools, wheeled vehicles, or pulleys.",
            "It was constructed entirely from a single type of stone.",
            "It was taller than any structure built before or since.",
          ],
          correct: 1,
          explanation: "Paragraph 1 stresses that the monument was raised \"without iron tools, wheeled vehicles, or pulleys,\" which is what invited admiration and speculation.",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"sprawling\" in paragraph 2 is closest in meaning to",
          choices: ["abandoned", "extensive", "temporary", "hidden"],
          correct: 1,
          explanation: "A \"sprawling settlement\" is a large, extensive one — here, big enough to house and feed thousands of workers.",
        },
        {
          id: "r1q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what finding most strongly indicates that the builders were not slaves?",
          choices: [
            "Bakeries and breweries were located near the pyramids.",
            "The workers came from farming villages along the Nile.",
            "Laborers were buried with honor in a cemetery near the pyramids.",
            "The settlement had storerooms full of grain.",
          ],
          correct: 2,
          explanation: "The passage calls the honored burial \"even more telling,\" noting it was \"a privilege that would never have been granted to slaves.\"",
        },
        {
          id: "r1q4", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention skeletons with \"healed fractures and signs of medical care\" in paragraph 2?",
          choices: [
            "To show that the work was so dangerous that many laborers died",
            "To provide evidence that injured workers were treated rather than discarded",
            "To argue that the workforce was made up mostly of trained physicians",
            "To explain why the cemetery was located far from the pyramids",
          ],
          correct: 1,
          explanation: "The healed injuries indicate \"injured workers were treated rather than discarded,\" supporting the view that they were valued free laborers, not slaves.",
        },
        {
          id: "r1q5", qtype: "Factual Information",
          prompt: "According to paragraph 3, how did workers split limestone blocks from the quarry?",
          choices: [
            "By heating the rock until it cracked",
            "By driving in wooden wedges and soaking them with water so they swelled",
            "By dragging the blocks until they broke apart",
            "By using iron saws cooled with sand",
          ],
          correct: 1,
          explanation: "Workers used \"copper chisels and wooden wedges, which were driven into cracks and then soaked with water so that they swelled and split the rock.\"",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"Experiments have confirmed the logic of this image: wetting the sand to just the right degree reduces the friction under a sledge by roughly half, so that far fewer people are needed to haul a heavy load.\"",
          choices: [
            "Wetting the sand makes a sledge so heavy that more workers are required.",
            "Experiments show that correctly dampening the sand cuts friction sharply, so fewer workers can move a heavy load.",
            "Pouring water on dry sand has no measurable effect on how a sledge moves.",
            "Heavy loads can be moved only when the sand is completely dry.",
          ],
          correct: 1,
          explanation: "The sentence says experiments confirm that properly wetted sand roughly halves friction, reducing the number of workers needed. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Factual Information",
          prompt: "According to paragraph 4, why do some scholars reject the idea of a single straight ramp?",
          choices: [
            "Straight ramps could not be built from mud brick.",
            "A straight ramp would need to be so long that it required more material than the pyramid itself.",
            "Straight ramps would have collapsed under the weight of the sledges.",
            "No straight ramps have ever been found in Egypt.",
          ],
          correct: 1,
          explanation: "A single straight ramp at a workable slope \"would have had to be enormously long... requiring more material than the pyramid itself.\"",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to the passage, all of the following are cited as evidence about how the pyramids were built EXCEPT:",
          choices: [
            "A tomb painting showing a statue dragged on a sledge with water poured on the sand",
            "A workers' settlement with bakeries and storerooms",
            "Detailed written instructions left by the pyramid's architects",
            "The precise alignment of the pyramid's sides to the cardinal directions",
          ],
          correct: 2,
          explanation: "The passage mentions the tomb painting, the settlement, and the precise alignment, but never any written instructions from the architects.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"Such precision could not have been achieved by guesswork.\"",
          choices: [
            "Before \"The sides of the Great Pyramid are aligned to the cardinal directions...\"",
            "After \"...a feat achieved most likely by observing the stars.\"",
            "After \"...remarkably level across its more than five-hectare footprint.\"",
            "Before \"Seen in this light, the pyramids testify...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence about precision follows naturally after the claim that the alignment was achieved by observing the stars, reinforcing that careful method, not chance, was involved.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"The Egyptian pyramids were built through organization and ingenuity rather than mystery.\"",
          choices: [
            "Evidence shows the builders were a paid, well-fed workforce of free Egyptians, not slaves.",
            "Practical techniques, such as wetting sand to reduce friction, helped move and shape the huge stones.",
            "The Great Pyramid was built mainly by Greek engineers hired by the pharaoh.",
            "The project demanded extraordinary planning, including precise alignment and coordination of millions of blocks.",
            "Egyptians used iron tools and large wheeled wagons to transport the stone.",
            "The ramps used to raise the blocks have been found completely intact.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "The key ideas are the free, paid workforce (A), the practical techniques like wetting sand (B), and the extraordinary planning (D). C, E, and F contradict the passage.",
        },
      ],
    },
    {
      id: "r2",
      title: "Wetlands and Their Ecological Importance",
      passage:
`Wetlands are among the most productive and valuable ecosystems on Earth, yet for much of human history they were regarded as worthless wastelands. Defined as areas where water covers the soil, or is present at or near the surface, for at least part of the year, wetlands include marshes, swamps, bogs, and the muddy margins of rivers and lakes. Their defining feature is that they are neither fully land nor fully water but something in between, and it is precisely this in-between quality that makes them so ecologically rich. The constant presence of water, combined with the nutrients carried in by rivers and runoff, supports a density of plant and animal life rivaled only by tropical rainforests and coral reefs.

One of the most important services wetlands provide is the purification of water. As water moves slowly through a wetland, its flow is slowed by the dense vegetation, and suspended particles of silt and sediment settle out and sink to the bottom. Meanwhile, the plants and microorganisms living in the wetland absorb and break down pollutants such as excess nitrogen and phosphorus, which would otherwise cause harmful algal blooms downstream. In effect, a wetland acts as a natural filter, and the water that leaves it is markedly cleaner than the water that entered. Some communities have recognized this so clearly that they now construct artificial wetlands to treat wastewater, a method that can be cheaper and more sustainable than conventional treatment plants.

Wetlands also play a crucial role in protecting against floods. Because they can absorb and store large volumes of water, they function much like natural sponges. During heavy rains or storm surges, a wetland soaks up the excess water and releases it gradually over time, rather than allowing it to rush downstream all at once. Coastal wetlands in particular serve as a buffer against the destructive force of storms, their vegetation absorbing wave energy and reducing the height of surges before they reach inhabited land. Studies after major coastal storms have found that areas protected by healthy wetlands suffered substantially less property damage than comparable areas where wetlands had been removed.

Beyond these services, wetlands are reservoirs of biological diversity. They provide breeding grounds, nurseries, and feeding areas for an enormous range of species. A great many of the world's fish, for example, depend on coastal wetlands during at least one stage of their life cycle, and migratory birds rely on wetlands as stopover points where they can rest and refuel during journeys that may span continents. The loss of a single major wetland can therefore ripple outward, affecting fisheries and bird populations far beyond its borders. Wetlands also store vast quantities of carbon in their waterlogged soils, where the absence of oxygen slows the decay of plant material; when wetlands are drained, this stored carbon is released into the atmosphere, contributing to climate change.

Despite their value, wetlands have been disappearing at an alarming rate. For generations they were drained and filled to create farmland, to build housing, and to eliminate the insects associated with standing water. It is estimated that a large share of the wetlands that once existed have already been lost. Only in recent decades has their importance been widely appreciated, prompting efforts to protect those that remain and even to restore some that were destroyed. Restoration, however, is difficult and slow, and a re-created wetland rarely matches the complexity of one that developed naturally over thousands of years. The lesson is increasingly clear: it is far wiser to conserve existing wetlands than to attempt to rebuild them after they are gone.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what feature of wetlands makes them so ecologically rich?",
          choices: [
            "They are located only in tropical regions.",
            "They are neither fully land nor fully water but something in between.",
            "They contain very few nutrients compared with other ecosystems.",
            "They are completely covered by water all year round.",
          ],
          correct: 1,
          explanation: "The passage says wetlands are \"neither fully land nor fully water but something in between, and it is precisely this in-between quality that makes them so ecologically rich.\"",
        },
        {
          id: "r2q2", qtype: "Vocabulary",
          prompt: "The word \"markedly\" in paragraph 2 is closest in meaning to",
          choices: ["slightly", "noticeably", "rarely", "temporarily"],
          correct: 1,
          explanation: "Water leaving a wetland is \"markedly cleaner\" — that is, noticeably cleaner than the water that entered.",
        },
        {
          id: "r2q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, how do wetlands remove pollutants such as nitrogen and phosphorus?",
          choices: [
            "By speeding up the flow of water so pollutants are carried away",
            "By having plants and microorganisms absorb and break them down",
            "By heating the water until the pollutants evaporate",
            "By trapping them permanently in the wetland's surface ice",
          ],
          correct: 1,
          explanation: "The plants and microorganisms \"absorb and break down pollutants such as excess nitrogen and phosphorus.\"",
        },
        {
          id: "r2q4", qtype: "Rhetorical Purpose",
          prompt: "Why does the author compare wetlands to \"natural sponges\" in paragraph 3?",
          choices: [
            "To show that wetlands are soft and easily destroyed",
            "To illustrate how wetlands absorb excess water and release it gradually",
            "To explain why wetlands are usually dry for most of the year",
            "To argue that wetlands cannot hold much water at all",
          ],
          correct: 1,
          explanation: "The sponge comparison illustrates that wetlands \"absorb and store large volumes of water,\" soaking up floods and releasing the water gradually.",
        },
        {
          id: "r2q5", qtype: "Detail",
          prompt: "According to paragraph 3, what did studies find about areas protected by healthy wetlands after major coastal storms?",
          choices: [
            "They experienced stronger storm surges than other areas.",
            "They suffered substantially less property damage than areas without wetlands.",
            "They recovered more slowly than areas where wetlands had been removed.",
            "They showed no measurable difference in damage.",
          ],
          correct: 1,
          explanation: "Studies found such areas \"suffered substantially less property damage than comparable areas where wetlands had been removed.\"",
        },
        {
          id: "r2q6", qtype: "Detail",
          prompt: "According to paragraph 4, what happens when wetlands are drained?",
          choices: [
            "Carbon stored in the soil is released into the atmosphere.",
            "Migratory birds gain new stopover points.",
            "Fish populations increase rapidly.",
            "The soil immediately fills with oxygen and becomes more fertile.",
          ],
          correct: 0,
          explanation: "When wetlands are drained, \"this stored carbon is released into the atmosphere, contributing to climate change.\"",
        },
        {
          id: "r2q7", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"The loss of a single major wetland can therefore ripple outward, affecting fisheries and bird populations far beyond its borders.\"",
          choices: [
            "Losing one important wetland can harm fish and birds well beyond the wetland itself.",
            "Wetlands have very little effect on fish or bird populations.",
            "Fisheries and birds are damaged only when many wetlands are lost at once.",
            "The borders of a wetland prevent its loss from affecting other areas.",
          ],
          correct: 0,
          explanation: "The sentence means the loss of one major wetland affects fish and birds far beyond it. Choice A restates this without changing the meaning.",
        },
        {
          id: "r2q8", qtype: "Inference",
          prompt: "What can be inferred from paragraph 5 about restoring lost wetlands?",
          choices: [
            "It is usually quicker and cheaper than protecting existing wetlands.",
            "A restored wetland seldom fully matches a naturally developed one.",
            "Restoration always produces wetlands richer than the originals.",
            "Restoration is impossible once a wetland has been drained.",
          ],
          correct: 1,
          explanation: "The passage says restoration is \"difficult and slow,\" and a re-created wetland \"rarely matches the complexity of one that developed naturally,\" implying restored wetlands seldom fully match natural ones.",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"At the time, draining a marsh was widely seen as an improvement, not a loss.\"",
          choices: [
            "Before \"Despite their value, wetlands have been disappearing...\"",
            "After \"...to eliminate the insects associated with standing water.\"",
            "After \"...prompting efforts to protect those that remain...\"",
            "Before \"The lesson is increasingly clear...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence comments on the historical attitude toward draining wetlands, so it fits best right after the list of reasons people drained and filled them.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Wetlands provide valuable ecological services but are being lost rapidly.\"",
          choices: [
            "Wetlands purify water and protect against floods and storms.",
            "Wetlands are rich reservoirs of biodiversity and store large amounts of carbon.",
            "Wetlands are biologically poor compared with most other ecosystems.",
            "Many wetlands have been drained and lost, and restoring them is difficult and slow.",
            "Artificial wetlands are always more effective than natural ones.",
            "Coastal wetlands increase the damage caused by storms.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: water purification and flood/storm protection (A), biodiversity and carbon storage (B), and rapid loss with difficult restoration (D). C, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (2 conversations + 3 lectures) ───────────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Recreation Center Staff",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a staff member at the campus recreation center.

Student: Hi, I'm hoping to sign up for a gym membership, but I'm a little confused about how it all works here. Back at my old school it was just included in tuition.

Staff: Sure, happy to walk you through it. So here's the first thing a lot of students don't realize—if you're a full-time enrolled student, basic access to the gym is already covered. It's part of the student activity fee you paid at registration.

Student: Wait, really? So I can just walk in?

Staff: Exactly. Just bring your student ID and swipe in at the front desk. That gets you the cardio machines, the weight room, the indoor track, and the basketball courts.

Student: Oh, that's great. So what's the membership I keep seeing advertised, then?

Staff: Good question. The paid membership is an upgrade. It adds two things. First, the group fitness classes—yoga, spin, that kind of thing. And second, access to the pool. Those aren't covered by the activity fee.

Student: Hmm. I'm mostly interested in the pool, honestly. I used to swim every morning. How much is it?

Staff: For students, it's forty dollars a semester. Or if you only care about the pool and not the classes, there's a pool-only pass for twenty-five.

Student: Oh, the pool-only pass sounds perfect. Can I sign up for that right now?

Staff: You can, but let me mention one thing first. This week we're running a trial—any student can use the full upgraded membership for free through Sunday. So before you pay for anything, you might want to try a class or two. You might find you like the spin classes and decide the full membership is worth it.

Student: That's a good point. I'll try the free week and see. If I just end up swimming, I'll get the pool-only pass next week.

Staff: Perfect plan. And either way, you just swipe your ID—I'll add the trial to your account right now so the pool turnstile lets you through.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What are the speakers mainly discussing?",
          choices: [
            "How gym memberships and access work at the recreation center",
            "Why the student transferred from another school",
            "How to join the campus swim team",
            "A schedule change for the group fitness classes",
          ],
          correct: 0,
          explanation: "The conversation centers on what the student's fee already covers and what the paid membership adds — how access works at the rec center.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "According to the staff member, what does the student's activity fee already cover?",
          choices: [
            "Group fitness classes and the pool",
            "Basic gym access: cardio, weights, the track, and the courts",
            "A personal trainer once a week",
            "Nothing — all access requires a paid membership",
          ],
          correct: 1,
          explanation: "The staff member says basic access is covered by the activity fee: \"the cardio machines, the weight room, the indoor track, and the basketball courts.\"",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the paid membership add that the activity fee does not cover?",
          choices: [
            "Use of the weight room and indoor track",
            "Group fitness classes and access to the pool",
            "A locker and free towels",
            "Access to the basketball courts",
          ],
          correct: 1,
          explanation: "The staff member explains the paid upgrade adds \"the group fitness classes\" and \"access to the pool.\"",
        },
        {
          id: "l1q4", qtype: "Detail",
          prompt: "Which option is the student initially most interested in?",
          choices: [
            "The full membership with classes",
            "The pool-only pass",
            "A personal trainer",
            "The basketball courts",
          ],
          correct: 1,
          explanation: "The student says she's \"mostly interested in the pool\" and that the \"pool-only pass sounds perfect.\"",
        },
        {
          id: "l1q5", qtype: "Function",
          prompt: "Why does the staff member tell the student about the free trial week before she pays?",
          choices: [
            "To convince her that the pool is closed this week",
            "So she can try the classes before deciding whether the full membership is worth it",
            "Because the pool-only pass is no longer available",
            "To require her to attend a fitness class",
          ],
          correct: 1,
          explanation: "The staff member suggests she try a class or two during the free week, saying she \"might find you like the spin classes and decide the full membership is worth it.\"",
        },
      ],
    },
    {
      id: "l2",
      title: "Conversation: Student and Academic Advisor",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and an academic advisor.

Advisor: Hi, come on in. Your email said you were thinking about withdrawing from a course—is that right?

Student: Yeah. It's my Intro to Economics class. Honestly, I'm just drowning in it. I'm taking five courses this semester and economics is the one that's pulling everything else down.

Advisor: Okay. Before we talk about withdrawing, let me ask—where does the grade actually stand right now? Sometimes it feels worse than it is.

Student: I got a D on the midterm. There's a final paper and a final exam still left, but I'm pretty discouraged.

Advisor: All right. So a couple of things you should know. First, the withdrawal deadline is this Friday. If you withdraw by then, you get a "W" on your transcript instead of a grade. A W doesn't affect your GPA, but it does show up.

Student: A W is okay, I guess. Better than failing.

Advisor: It is. But let me push back gently. Is economics required for your major?

Student: It is, yeah. It's a prerequisite for two courses I have to take next year.

Advisor: That's the part I want you to think about. If you withdraw now, you'll have to retake the whole course later, and that could push back the courses that depend on it—possibly delaying your graduation. So withdrawing isn't free, even if it feels like relief right now.

Student: I hadn't thought about it that way. But if I stay in and fail, that's worse, isn't it?

Advisor: It would be—but I'm not sure failing is your only other option. Have you been to the economics tutoring center? It's free, and they have peer tutors specifically for that intro course. With a final paper and exam still ahead, there's real room to pull the grade up to a C.

Student: I didn't know there was tutoring just for econ.

Advisor: There is, in the library basement, every afternoon. Here's what I'd suggest: go this week, talk to a tutor about the final paper, and see how you feel. The withdrawal deadline is Friday, so you've got a few days to decide. You can always withdraw at the last minute if the tutoring doesn't help—but you can't un-withdraw once you've dropped.

Student: That's a really good point. Okay. I'll go to the tutoring center today and decide by Thursday.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Purpose",
          prompt: "Why does the student come to see the advisor?",
          choices: [
            "To ask about adding a sixth course to her schedule",
            "Because she is considering withdrawing from her economics course",
            "To change her major away from economics",
            "To complain about an unfair midterm grade",
          ],
          correct: 1,
          explanation: "The advisor confirms at the start that the student emailed about \"withdrawing from a course\" — her economics class.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "What does the advisor explain about receiving a \"W\" on the transcript?",
          choices: [
            "It lowers the student's GPA significantly.",
            "It does not affect GPA but does appear on the transcript.",
            "It can be removed automatically after one year.",
            "It counts the same as a failing grade.",
          ],
          correct: 1,
          explanation: "The advisor says a W \"doesn't affect your GPA, but it does show up\" on the transcript.",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "Why does the advisor warn that withdrawing \"isn't free\"?",
          choices: [
            "Withdrawing requires paying an extra fee.",
            "Economics is a prerequisite, so retaking it could delay later courses and graduation.",
            "The student would lose her financial aid.",
            "A W counts against the student's major GPA.",
          ],
          correct: 1,
          explanation: "Because economics is a prerequisite for two required courses, withdrawing means retaking it later, which \"could push back the courses that depend on it—possibly delaying your graduation.\"",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "What does the advisor recommend the student do before deciding?",
          choices: [
            "Drop two of her other courses",
            "Go to the free economics tutoring center and work on the final paper",
            "Ask the professor to drop the midterm grade",
            "Switch to a different section of economics",
          ],
          correct: 1,
          explanation: "The advisor recommends visiting the free econ tutoring center to \"talk to a tutor about the final paper\" before deciding.",
        },
        {
          id: "l2q5", qtype: "Attitude",
          prompt: "What is the advisor's attitude toward the student's plan to withdraw?",
          choices: [
            "Strongly supportive — she urges the student to withdraw immediately.",
            "Cautious — she wants the student to try tutoring before deciding, since withdrawing has costs.",
            "Indifferent — she leaves the decision entirely to the student without comment.",
            "Dismissive — she insists the grade cannot possibly be improved.",
          ],
          correct: 1,
          explanation: "The advisor gently pushes back, pointing out the costs of withdrawing and urging tutoring first, while noting the student can still withdraw by Friday — a cautious stance.",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: How Caves and Stalactites Form (Geology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a geology class.

Professor: Today we're going inside the Earth, almost literally—we're going to talk about how caves form, and then how those famous stone icicles, the stalactites and stalagmites, get created inside them. And the whole story comes down to a single, fairly gentle chemical reaction. No explosions, no earthquakes. Just water, slowly, patiently, dissolving rock.

So let's start with the rock. The caves we're talking about—the big, spectacular ones with chambers and passages—almost always form in a particular kind of rock called limestone. Limestone is made mostly of calcium carbonate, and the key thing about calcium carbonate is that it can be dissolved by acid. Not strong acid—we're talking about very weak, mild acid.

Where does the acid come from? This is the elegant part. Rainwater, as it falls and especially as it soaks down through the soil, picks up carbon dioxide. And when carbon dioxide dissolves in water, it forms a weak acid called carbonic acid. It's the same mild acid that's in a glass of soda. So ordinary rainwater becomes very slightly acidic on its way underground.

Now, this slightly acidic water seeps into cracks in the limestone. And over thousands and thousands of years, it dissolves the rock along those cracks, widening them—first into channels, then into passages, and eventually into the large open chambers we call caves. I want to stress the timescale here. This is not fast. A cave system can take hundreds of thousands of years to form. We're watching geology in extreme slow motion.

Okay—so now we have a cave, a hollow space in the rock. Here's where the stalactites come in, and notice that the same chemistry runs in reverse. Water that's still seeping through the rock above drips from the ceiling of the cave. But now the water is exposed to the open air of the cave. When that drop hangs there, a little of its carbon dioxide escapes into the cave air. And when the carbon dioxide leaves, the water can no longer hold all its dissolved calcium carbonate—so a tiny bit of the mineral is deposited, left behind on the ceiling.

Drop after drop, over centuries, those tiny deposits build downward into an icicle of stone hanging from the ceiling. That's a stalactite. And of course, the water that drips off the tip falls to the floor, where the same depositing happens, building a mound upward. That's a stalagmite. Sometimes, given enough time, a stalactite and a stalagmite meet in the middle and join into a single column.

So here's the takeaway, and I love this symmetry: the very same reaction—calcium carbonate and weak acid—first carves out the cave by dissolving rock, and then decorates it by depositing rock. Dissolving going down, depositing coming back out. Same chemistry, opposite directions.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How earthquakes create caves in solid rock",
            "The chemical process by which caves and their formations are created",
            "How to tell stalactites apart from stalagmites by their color",
            "Why limestone is valuable as a building material",
          ],
          correct: 1,
          explanation: "The professor explains how a single chemical reaction forms caves and then builds stalactites and stalagmites inside them.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "Why does the acidic water form as rain soaks through the soil?",
          choices: [
            "The water picks up carbon dioxide, which forms weak carbonic acid.",
            "Heat underground turns the water into a strong acid.",
            "Minerals in the limestone release acid into the water.",
            "Bacteria in the soil produce acid as they grow.",
          ],
          correct: 0,
          explanation: "Rainwater \"picks up carbon dioxide,\" and when CO2 dissolves in water \"it forms a weak acid called carbonic acid.\"",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "Why does the professor compare the acidic rainwater to soda?",
          choices: [
            "To show that the water is dangerously corrosive",
            "To illustrate that it contains the same kind of mild carbonic acid",
            "To explain that the water is artificially carbonated",
            "To argue that caves form fastest in warm climates",
          ],
          correct: 1,
          explanation: "He says carbonic acid is \"the same mild acid that's in a glass of soda,\" emphasizing how weak it is.",
        },
        {
          id: "l3q4", qtype: "Detail",
          prompt: "According to the professor, why is calcium carbonate deposited when a water drop hangs from the cave ceiling?",
          choices: [
            "The drop freezes and leaves mineral behind.",
            "Carbon dioxide escapes from the drop, so the water can no longer hold all its dissolved mineral.",
            "The acid in the water suddenly grows stronger.",
            "Air pressure in the cave forces the mineral out of the water.",
          ],
          correct: 1,
          explanation: "When the drop is exposed to cave air, \"a little of its carbon dioxide escapes,\" and then \"the water can no longer hold all its dissolved calcium carbonate—so a tiny bit of the mineral is deposited.\"",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "How does a stalagmite form, according to the lecture?",
          choices: [
            "Water dripping off a stalactite deposits mineral on the floor, building a mound upward.",
            "Acid eats a hole in the cave floor.",
            "A stalactite breaks off and lands on the floor.",
            "Mineral-rich mud hardens on the ceiling.",
          ],
          correct: 0,
          explanation: "The water that drips off the tip \"falls to the floor, where the same depositing happens, building a mound upward. That's a stalagmite.\"",
        },
        {
          id: "l3q6", qtype: "Organization",
          prompt: "How does the professor organize the explanation in the lecture?",
          choices: [
            "By comparing caves in different countries",
            "By showing how the same chemical reaction first dissolves rock to form the cave and then deposits rock to decorate it",
            "By listing the reaction in order of which minerals are most valuable",
            "By contrasting fast-forming and slow-forming acids",
          ],
          correct: 1,
          explanation: "The professor highlights the \"symmetry\": the same calcium carbonate–acid reaction \"first carves out the cave by dissolving rock, and then decorates it by depositing rock.\"",
        },
      ],
    },
    {
      id: "l4",
      title: "Lecture: Confirmation Bias (Psychology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a psychology class.

Professor: All right, today we're looking at one of the most important and, frankly, most stubborn flaws in human thinking. It's called confirmation bias. And here's the basic definition: confirmation bias is our tendency to search for, interpret, and remember information in a way that confirms what we already believe—while ignoring or downplaying evidence that contradicts it.

Now, I want to be careful here. This isn't about people being stupid or dishonest. Confirmation bias affects everyone—including scientists, including me, including all of you. It's a feature of how the human mind naturally works, and that's exactly what makes it so dangerous. You don't notice yourself doing it.

Let me give you a classic example from a famous experiment. Researchers gave people a sequence of three numbers—two, four, six—and told them this sequence followed a certain rule. The participants' job was to figure out the rule by proposing their own three-number sequences and getting told "yes, that fits" or "no, it doesn't."

Now, most people immediately guessed the rule was "even numbers going up by two." So what did they do? They tested sequences like four, six, eight. Ten, twelve, fourteen. And every time, they were told "yes, that fits." So they grew confident and announced their rule. But they were wrong. The actual rule was much simpler: just "any three numbers in increasing order." The point is, people only tested sequences they expected to confirm their guess. Almost nobody tried a sequence like one, two, three, or—crucially—a sequence designed to fail, like six, four, two. They sought confirmation, not disproof.

And that's the deep lesson here. Good thinking, scientific thinking, actually requires the opposite instinct. It requires you to actively try to prove yourself wrong—to seek out the evidence that would break your theory if your theory is false. That's deeply unnatural. Our instinct is to collect supporting examples and feel reassured.

You can see confirmation bias everywhere once you know to look. Think about how people consume news. Someone who already holds a political opinion tends to read the sources that agree with them, interpret ambiguous events as supporting their side, and remember the facts that fit their view while forgetting the ones that don't. Each person ends up feeling that the evidence overwhelmingly supports them—because they've unconsciously filtered the evidence.

So what's the defense? Well, you can't switch the bias off; it's too deep. But you can build habits to counter it. Deliberately ask, "What would change my mind?" Seek out the strongest version of the opposing view, not the weakest. And treat the desire to be right as separate from the goal of being right. Those habits don't come naturally—but that's exactly why they're worth practicing.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "A flaw in human thinking that leads people to favor information confirming their beliefs",
            "How scientists design number-sequence experiments",
            "Why people disagree about politics",
            "The difference between intelligence and dishonesty",
          ],
          correct: 0,
          explanation: "The professor defines and illustrates confirmation bias — the tendency to favor information that confirms existing beliefs.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "According to the professor, who is affected by confirmation bias?",
          choices: [
            "Only people who lack formal education",
            "Everyone, including scientists",
            "Only people with strong political opinions",
            "Mainly those who are being dishonest",
          ],
          correct: 1,
          explanation: "He stresses it \"affects everyone—including scientists, including me, including all of you,\" and isn't about being stupid or dishonest.",
        },
        {
          id: "l4q3", qtype: "Detail",
          prompt: "In the number-sequence experiment, what mistake did most participants make?",
          choices: [
            "They tested only sequences they expected to confirm their guessed rule.",
            "They refused to propose any sequences at all.",
            "They guessed the rule correctly but doubted themselves.",
            "They tested sequences that decreased rather than increased.",
          ],
          correct: 0,
          explanation: "People \"only tested sequences they expected to confirm their guess,\" rarely trying a sequence designed to fail.",
        },
        {
          id: "l4q4", qtype: "Function",
          prompt: "Why does the professor describe the number-sequence experiment?",
          choices: [
            "To prove that most people are bad at arithmetic",
            "To give a concrete demonstration of how people seek confirmation rather than disproof",
            "To explain how researchers choose participants",
            "To show that simple rules are usually wrong",
          ],
          correct: 1,
          explanation: "The experiment concretely demonstrates that people \"sought confirmation, not disproof\" — the heart of confirmation bias.",
        },
        {
          id: "l4q5", qtype: "Detail",
          prompt: "According to the lecture, how does confirmation bias show up in how people consume news?",
          choices: [
            "People read only the most difficult news sources available.",
            "People favor sources that agree with them and remember facts that fit their views.",
            "People avoid news entirely to escape the bias.",
            "People change their political opinions whenever they read the news.",
          ],
          correct: 1,
          explanation: "Someone with an opinion \"tends to read the sources that agree with them... and remember the facts that fit their view while forgetting the ones that don't.\"",
        },
        {
          id: "l4q6", qtype: "Inference",
          prompt: "What does the professor imply about overcoming confirmation bias?",
          choices: [
            "It can be eliminated completely with enough effort.",
            "It cannot be switched off, but deliberate habits can help counter it.",
            "It only affects people who refuse to read the news.",
            "It disappears once a person becomes a scientist.",
          ],
          correct: 1,
          explanation: "He says \"you can't switch the bias off; it's too deep,\" but you can \"build habits to counter it,\" such as asking what would change your mind.",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The History of Cartography (Geography)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a geography class.

Professor: So today we're talking about maps—specifically, the history of cartography, which is just the fancy word for mapmaking. And I want to use this history to make a bigger point: a map is never just a neutral picture of the world. Every map is a choice. It reflects what its makers knew, what they valued, and sometimes, frankly, what they wanted you to believe.

Let's start way back. The earliest maps weren't of countries or coastlines at all. They were maps of the sky—the stars—and maps of small local areas, like a river valley or a city. People mapped what mattered to them and what they could actually see. A farmer doesn't need a map of a continent; he needs to know where the fields and the water are.

Now, the ancient Greeks made a big leap. Around two thousand years ago, a scholar named Ptolemy did something revolutionary. He created a system of lines—what we'd recognize as latitude and longitude—a grid laid over the world so that any place could be given coordinates. This was huge. It meant maps could be systematic and, in principle, reproducible. The catch was that Ptolemy's actual data was often wrong, because nobody had accurate measurements of distant places. So his maps had the right idea but the wrong details.

Then comes a long, interesting period in medieval Europe where, honestly, maps got less accurate, not more. Many medieval maps weren't really trying to be geographically precise at all. They were religious and symbolic. A typical map of that era put the holy city of Jerusalem right in the center of the world, not because it was geographically central, but because it was spiritually central to the mapmakers. So the map tells you about their beliefs more than about actual distances.

The big turning point was the Age of Exploration, starting around the 1400s. Suddenly there was an enormous practical demand for accurate maps—sailors needed them to cross oceans and come back alive. And this is where my favorite example comes in: the Mercator projection.

Here's the problem Mercator was solving. The Earth is a sphere, but a map is flat. You cannot flatten a sphere onto paper without distorting something—it's mathematically impossible. So every flat map is a compromise; the only question is what you choose to distort. Mercator made a brilliant choice for sailors: his projection keeps directions accurate, so a straight line on the map is a constant compass heading. Fantastic for navigation. But the trade-off is that it badly distorts size. Land near the poles gets stretched enormously. On a Mercator map, Greenland looks about as big as Africa—but in reality, Africa is roughly fourteen times larger.

So that's the thread I want you to carry away. Every map distorts something, because it has to. The map that's perfect for a sailor is misleading for someone comparing the sizes of continents. There is no single "true" map—only maps that are useful for particular purposes.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the main point the professor makes about maps?",
          choices: [
            "Modern maps are completely accurate, unlike older ones.",
            "Every map is a choice that reflects its makers' knowledge, values, and purposes.",
            "Maps of the sky are more important than maps of the land.",
            "Mapmaking stopped improving after the Age of Exploration.",
          ],
          correct: 1,
          explanation: "The professor's bigger point is that \"a map is never just a neutral picture\"; \"every map is a choice\" reflecting its makers' knowledge, values, and purposes.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, what did the earliest maps depict?",
          choices: [
            "Entire continents and their coastlines",
            "The stars and small local areas like river valleys or cities",
            "Trade routes across oceans",
            "The locations of religious sites",
          ],
          correct: 1,
          explanation: "The earliest maps \"were maps of the sky—the stars—and maps of small local areas, like a river valley or a city.\"",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "What was revolutionary about Ptolemy's contribution?",
          choices: [
            "He drew the first accurate map of the entire world.",
            "He created a grid of latitude and longitude so any place could be given coordinates.",
            "He placed Jerusalem at the center of the world.",
            "He invented the compass used by sailors.",
          ],
          correct: 1,
          explanation: "Ptolemy created \"a system of lines—what we'd recognize as latitude and longitude—a grid laid over the world so that any place could be given coordinates.\"",
        },
        {
          id: "l5q4", qtype: "Organization",
          prompt: "Why does the professor mention medieval maps that placed Jerusalem at the center?",
          choices: [
            "To show that those maps were the most accurate of their time",
            "To illustrate how maps can reflect beliefs rather than actual geography",
            "To prove that Jerusalem really is the geographic center of the world",
            "To explain how latitude and longitude were discovered",
          ],
          correct: 1,
          explanation: "The Jerusalem example shows the map \"tells you about their beliefs more than about actual distances\" — maps reflecting values, not geography.",
        },
        {
          id: "l5q5", qtype: "Detail",
          prompt: "What problem was the Mercator projection designed to solve?",
          choices: [
            "How to show the true sizes of the continents",
            "How to flatten the spherical Earth onto paper while keeping directions accurate for navigation",
            "How to place religious sites at the center of a map",
            "How to map the stars more precisely",
          ],
          correct: 1,
          explanation: "Mercator's projection \"keeps directions accurate, so a straight line on the map is a constant compass heading\" — ideal for sailors crossing oceans.",
        },
        {
          id: "l5q6", qtype: "Inference",
          prompt: "What does the professor imply by saying there is \"no single 'true' map\"?",
          choices: [
            "All maps are equally useless.",
            "Because flattening a sphere always distorts something, each map is useful only for particular purposes.",
            "Maps will eventually become perfectly accurate.",
            "Only maps of small areas can be trusted.",
          ],
          correct: 1,
          explanation: "Since flattening a sphere \"always distorts something,\" each map is a compromise — \"useful for particular purposes,\" with no single true version.",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people believe that students should take a gap year—a year off from school—before starting university, while others think students should begin university right after high school. Which do you think is better, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your preference in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — The university will close the 24-hour computer lab in the Science Building at the end of the month. Administrators say most students now own laptops and that the lab's overnight staffing and electricity costs are too high. Students who need computers late at night can use the main library, which is open until midnight.\n\n[Then you hear two students discussing the change. The woman disagrees with the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines 'the tragedy of the commons' — when a resource is shared and open to everyone, each individual has an incentive to take as much as possible for personal benefit, even though this overuse eventually depletes or destroys the resource for the whole group.\n\n[Then you hear a professor give an example involving a shared village pasture used for grazing.]",
      prompt: "Using the example from the lecture, explain the concept of the tragedy of the commons.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two ways that desert animals conserve water. The lecture contrasts a behavioral strategy with a physiological strategy, giving one animal example of each.",
      prompt: "Using the points and examples from the lecture, explain two ways desert animals conserve water.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general idea, then give BOTH examples from the lecture and contrast them (behavioral strategy vs. physiological strategy).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): A city is considering switching its electricity supply to nuclear power. Supporters make three claims in its favor:

1. Nuclear power produces almost no greenhouse gases, so it would sharply reduce the city's air pollution.
2. A single nuclear plant can generate enormous amounts of electricity reliably, day and night, unlike solar or wind.
3. Once built, a nuclear plant is cheap to operate, which would lower electricity costs for residents over time.

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

Professor: Some educators argue that homework should be abolished in schools, claiming it adds stress without improving learning. Others believe homework is an essential part of education. In your opinion, should schools abolish homework? Why or why not?

Grace (classmate): I think homework should be abolished. Students already spend all day in class, and piling on more work at home just causes burnout and leaves no time for family or rest.

Henry (classmate): I disagree — homework is how students practice and absorb what they learned. Without it, a lot of material would simply be forgotten by the next class.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
