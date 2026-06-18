import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 4 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_4: ToeflForm = {
  id: "toefl-4",
  title: "TOEFL iBT Practice Test 4",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "Coral Reefs and Their Ecosystems",
      passage:
`Coral reefs are among the most biologically rich environments on Earth, yet the structures themselves are built by some of the ocean's simplest animals. A coral is a colony of tiny creatures called polyps, each no larger than a grain of rice. Over many generations, the polyps secrete a hard skeleton of calcium carbonate, and as old polyps die and new ones grow on top of the accumulated stone, the reef slowly rises. A reef that may stretch for hundreds of kilometers and tower meters above the seabed is, in this sense, the collective work of countless minuscule builders laboring over thousands of years.

The reef's astonishing productivity rests on a hidden partnership. Inside the tissues of each coral polyp live enormous numbers of single-celled algae known as zooxanthellae. These algae carry out photosynthesis, capturing sunlight and converting it into sugars, and they pass much of this energy directly to their coral host. In return, the coral provides the algae with a protected place to live and with the waste compounds they need as nutrients. This mutually beneficial relationship is so efficient that it allows reefs to flourish in tropical waters that are, paradoxically, very poor in dissolved nutrients. Without the algae, the coral could not gather nearly enough food to construct its massive limestone architecture.

That same partnership, however, is also the reef's greatest vulnerability. The algae function properly only within a narrow band of temperatures. When the surrounding water grows even a degree or two warmer than usual and stays warm for a sustained period, the relationship breaks down. The stressed coral expels its algae, and because the algae are what give living coral its vivid color, the coral turns a ghostly white. This phenomenon is called bleaching. A bleached coral is not yet dead, but it is starving, having lost the partner that supplied most of its energy. If cooler conditions return quickly, the algae can recolonize the coral and it may recover; if the heat persists, the coral dies.

The biological wealth that reefs support is out of all proportion to the space they occupy. Although coral reefs cover well under one percent of the ocean floor, they provide habitat for roughly a quarter of all known marine species. Fish shelter and breed among the branching coral; crabs, sea stars, and sponges crowd every crevice; and predators patrol the reef's edge. This density of life is why reefs are sometimes called the rainforests of the sea. The comparison is apt in another way as well, for like rainforests, reefs are the product of slow growth and are easily damaged by sudden change.

The value of reefs is not confined to biology. Hundreds of millions of people live near coral coastlines, and many depend on the reef for their daily food, harvesting the fish that the reef shelters. Reefs also serve as natural breakwaters: by absorbing the force of incoming waves, they protect low-lying shores from storms and erosion that would otherwise reach inhabited land. Some scientists have begun to investigate compounds produced by reef organisms as the basis for new medicines. For all these reasons, the steady decline of the world's reefs—driven by warming seas, pollution, and overfishing—is a loss measured not only in vanished species but in the livelihoods and safety of human communities. Efforts to slow that decline now range from establishing protected zones where fishing is restricted to ambitious experiments in transplanting more heat-tolerant corals onto damaged reefs.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, how does a coral reef grow larger over time?",
          choices: [
            "Individual polyps expand until they reach several meters in size.",
            "New polyps grow on the calcium-carbonate skeleton left by dead ones.",
            "The reef absorbs dissolved limestone directly from the seawater.",
            "Storms break apart older reefs and pile the rubble higher.",
          ],
          correct: 1,
          explanation: "Paragraph 1 says that as old polyps die, \"new ones grow on top of the accumulated stone, [and] the reef slowly rises.\"",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"minuscule\" in paragraph 1 is closest in meaning to",
          choices: ["ancient", "tireless", "tiny", "countless"],
          correct: 2,
          explanation: "\"Minuscule\" describes the very small builders — the polyps, each \"no larger than a grain of rice.\"",
        },
        {
          id: "r1q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, what does the coral give the zooxanthellae in their partnership?",
          choices: [
            "Sugars produced by photosynthesis",
            "Protection and the waste compounds the algae use as nutrients",
            "A way to escape the warm tropical water",
            "Calcium carbonate for building skeletons",
          ],
          correct: 1,
          explanation: "The coral \"provides the algae with a protected place to live and with the waste compounds they need as nutrients,\" while the algae supply sugars.",
        },
        {
          id: "r1q4", qtype: "Inference",
          prompt: "What can be inferred from paragraph 2 about tropical waters where reefs grow?",
          choices: [
            "They contain abundant dissolved nutrients.",
            "They would not support such productive reefs without the algae's partnership.",
            "They are too cold for most marine life.",
            "They block sunlight from reaching the coral.",
          ],
          correct: 1,
          explanation: "The passage stresses that the partnership lets reefs flourish in waters \"very poor in dissolved nutrients\" — implying the reef could not thrive there without the algae.",
        },
        {
          id: "r1q5", qtype: "Factual Information",
          prompt: "According to paragraph 3, what causes coral bleaching?",
          choices: [
            "A sudden drop in water temperature",
            "Sustained warming that causes the coral to expel its algae",
            "An invasion of predators onto the reef",
            "The natural death of old polyps",
          ],
          correct: 1,
          explanation: "When water \"grows even a degree or two warmer than usual and stays warm,\" the stressed coral \"expels its algae,\" turning white.",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"A bleached coral is not yet dead, but it is starving, having lost the partner that supplied most of its energy.\"",
          choices: [
            "A bleached coral has already died because its algae have left.",
            "A bleached coral is still alive but lacks food because it has lost its algae.",
            "A bleached coral can survive indefinitely without its algae.",
            "A bleached coral starves only if predators attack it.",
          ],
          correct: 1,
          explanation: "The sentence says the coral is alive (\"not yet dead\") but starving because it lost the algae that fed it. Choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Rhetorical Purpose",
          prompt: "Why does the author compare coral reefs to rainforests in paragraph 4?",
          choices: [
            "To show that reefs grow much faster than rainforests",
            "To emphasize the reefs' great biological richness and their vulnerability to sudden change",
            "To argue that rainforests are less valuable than reefs",
            "To explain how reefs produce oxygen for the atmosphere",
          ],
          correct: 1,
          explanation: "The comparison highlights both the density of life reefs support and the fact that, like rainforests, they grow slowly and are \"easily damaged by sudden change.\"",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, all of the following are mentioned as benefits reefs provide to people EXCEPT:",
          choices: [
            "A source of daily food from the fish they shelter",
            "Protection of shorelines by absorbing wave energy",
            "Possible compounds for new medicines",
            "A reliable supply of fresh drinking water",
          ],
          correct: 3,
          explanation: "Paragraph 5 lists food, coastal protection, and potential medicines. Fresh drinking water is never mentioned.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 3?\n\n\"In effect, the coral has cast out the very partner it cannot live without.\"",
          choices: [
            "Before \"The algae function properly only within a narrow band of temperatures.\"",
            "After \"...the coral turns a ghostly white. This phenomenon is called bleaching.\"",
            "After \"...the algae can recolonize the coral and it may recover; if the heat persists, the coral dies.\"",
            "Before \"When the surrounding water grows even a degree or two warmer...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence comments on the coral expelling its essential algae, so it fits best right after bleaching is named and explained.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Coral reefs are built by tiny animals and support life and people far out of proportion to their size.\"",
          choices: [
            "Reefs are constructed by colonies of small polyps whose limestone skeletons accumulate over thousands of years.",
            "A partnership with photosynthetic algae feeds the coral but also makes it vulnerable to warming, which causes bleaching.",
            "Reefs cover most of the ocean floor and grow faster than any other marine habitat.",
            "Though they cover little area, reefs shelter about a quarter of marine species and provide food and coastal protection for people.",
            "Bleached corals can never recover once their algae have departed.",
            "Reef organisms are the only known source of modern medicines.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: reefs are built by polyps over time (A), the algae partnership feeds yet endangers the coral (B), and reefs' outsized value to species and people (D). C, E, and F are false or overstated.",
        },
      ],
    },
    {
      id: "r2",
      title: "Roman Aqueducts and Engineering",
      passage:
`Few achievements of the ancient world reveal the practical genius of Roman engineering as clearly as the aqueduct. As the city of Rome grew, the local springs and the muddy waters of the Tiber could no longer satisfy a population that eventually numbered close to a million people. To solve this problem, Roman engineers built a network of channels that carried fresh water into the city from sources in the surrounding hills, some of them many kilometers away. By the height of the empire, eleven major aqueducts supplied Rome with a volume of water that would not be matched by any city for well over a thousand years.

The principle behind an aqueduct was elegantly simple, even if its execution was not. Water flows downhill, and the engineers exploited this fact by giving each channel a continuous, very gentle downward slope along its entire length. The water moved by gravity alone, with no pumps of any kind. The slope had to be calculated with great care. If it was too steep, the water would rush along and gradually wear away the channel; if it was too shallow, the flow would slow, stagnate, and deposit sediment that eventually blocked the conduit. Achieving the correct gradient over a course of many kilometers, across uneven country, demanded surveying of remarkable precision.

It is the towering stone arches marching across valleys that most people picture when they think of a Roman aqueduct. Yet these famous bridges were in fact the exception rather than the rule. Wherever possible, the engineers preferred to carry the water underground, in covered channels cut into the rock or buried beneath the surface. Tunnels and buried conduits were cheaper to build than arches, were less exposed to damage and weather, and—an important consideration—were far harder for an enemy to cut during a siege. The dramatic arched bridges were used only where a valley was too deep or too wide to cross by any other means, so that the channel had to be carried high in the air to preserve its careful downward slope.

Maintaining the system was a continuous task. Over time, many aqueducts developed a thick crust of mineral deposit on the inside of their channels, left behind by the hard water as it flowed. If this buildup was not periodically cleared, it could narrow the channel until the flow was choked off entirely. For this reason, the channels were built with inspection openings at regular intervals, allowing workers to enter, examine the conduit, and remove obstructions. A dedicated corps of laborers and overseers was responsible for keeping the water flowing, and the Romans took the management of their water supply seriously enough to place it under the authority of high-ranking officials.

The water that arrived in the city was not hoarded but distributed widely. It fed the public fountains from which ordinary citizens drew their drinking water, supplied the great public baths that were central to Roman social life, flushed the public latrines, and—for those who could afford to pay—was even piped into private homes. So thoroughly did this abundance of water shape the city that its loss was keenly felt. When invaders later severed the aqueducts during the empire's decline, the population of Rome, deprived of its accustomed supply, was forced to retreat back toward the river it had long since outgrown. The aqueducts stand, then, not merely as monuments to engineering skill but as a reminder of how completely a great city had come to depend on the steady, gravity-fed flow of distant water.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, why did Rome need aqueducts?",
          choices: [
            "The Tiber River had completely dried up.",
            "Local springs and the river could no longer supply the growing population.",
            "The hills around Rome were the only place crops would grow.",
            "Other cities had already built larger aqueducts.",
          ],
          correct: 1,
          explanation: "Paragraph 1 says the springs and \"the muddy waters of the Tiber could no longer satisfy a population\" approaching a million people.",
        },
        {
          id: "r2q2", qtype: "Factual Information",
          prompt: "According to paragraph 2, how did water move through a Roman aqueduct?",
          choices: [
            "By a system of mechanical pumps",
            "By gravity alone, along a continuous gentle downward slope",
            "By the pressure of water stored in towers",
            "By workers carrying it in sections",
          ],
          correct: 1,
          explanation: "The water \"moved by gravity alone, with no pumps of any kind,\" thanks to a continuous gentle slope.",
        },
        {
          id: "r2q3", qtype: "Detail",
          prompt: "According to paragraph 2, what problem arose if a channel's slope was too shallow?",
          choices: [
            "The water would rush along and wear away the channel.",
            "The flow would slow, stagnate, and deposit sediment that blocked the conduit.",
            "The channel would collapse under the weight of the water.",
            "The water would evaporate before reaching the city.",
          ],
          correct: 1,
          explanation: "If too shallow, \"the flow would slow, stagnate, and deposit sediment that eventually blocked the conduit.\"",
        },
        {
          id: "r2q4", qtype: "Vocabulary",
          prompt: "The word \"exception\" in paragraph 3 is closest in meaning to",
          choices: ["foundation", "rarity", "failure", "standard"],
          correct: 1,
          explanation: "The arches were \"the exception rather than the rule\" — meaning they were a rarity, not the usual method.",
        },
        {
          id: "r2q5", qtype: "Factual Information",
          prompt: "According to paragraph 3, why did Roman engineers usually prefer underground channels to arched bridges?",
          choices: [
            "Underground channels carried more water than bridges.",
            "Underground channels were cheaper, better protected, and harder for enemies to cut.",
            "Bridges could not maintain a downward slope.",
            "Bridges were forbidden by Roman law.",
          ],
          correct: 1,
          explanation: "Buried conduits \"were cheaper to build than arches, were less exposed to damage and weather, and… were far harder for an enemy to cut during a siege.\"",
        },
        {
          id: "r2q6", qtype: "Inference",
          prompt: "What can be inferred from paragraph 3 about the famous arched bridges?",
          choices: [
            "They were used only when no underground route could cross the terrain.",
            "They were the cheapest part of the system to construct.",
            "They were built mainly to impress visitors to the city.",
            "They carried more water than any other part of the aqueduct.",
          ],
          correct: 0,
          explanation: "Arched bridges were used \"only where a valley was too deep or too wide to cross by any other means\" — i.e., where no buried route would work.",
        },
        {
          id: "r2q7", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention the mineral deposits inside the channels in paragraph 4?",
          choices: [
            "To explain why the aqueducts needed continuous maintenance",
            "To prove that Roman water was unsafe to drink",
            "To show that the engineers used poor-quality stone",
            "To argue that arches were better than buried channels",
          ],
          correct: 0,
          explanation: "The buildup could \"choke off\" the flow if not cleared, illustrating why maintenance — with inspection openings and a dedicated corps — was continuous.",
        },
        {
          id: "r2q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, all of the following are mentioned as uses of the aqueducts' water EXCEPT:",
          choices: [
            "Supplying public drinking fountains",
            "Filling the great public baths",
            "Powering mills to grind grain",
            "Piping water into some private homes",
          ],
          correct: 2,
          explanation: "Paragraph 5 lists fountains, baths, latrines, and private homes. Grinding grain in mills is never mentioned.",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"What had once been a marvel of convenience became, in its absence, a crisis.\"",
          choices: [
            "Before \"The water that arrived in the city was not hoarded but distributed widely.\"",
            "After \"...even piped into private homes.\"",
            "After \"...was forced to retreat back toward the river it had long since outgrown.\"",
            "Before \"So thoroughly did this abundance of water shape the city...\"",
          ],
          correct: 2,
          explanation: "The sentence reflects on the aqueducts' loss turning convenience into crisis, fitting best right after the city is forced to retreat to the river when the supply is cut.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Roman aqueducts were a sophisticated system that supplied the city with distant water.\"",
          choices: [
            "Engineers used a continuous gentle slope so that gravity alone, without pumps, carried water many kilometers into Rome.",
            "Most of the system ran underground, with dramatic arched bridges used only to cross deep or wide valleys.",
            "The aqueducts relied on powerful mechanical pumps to lift water over the hills.",
            "The delivered water supplied fountains, baths, and homes, and the city came to depend on it heavily.",
            "Arched bridges were the cheapest and most common part of every aqueduct.",
            "Roman officials ignored maintenance, allowing the channels to fail quickly.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: gravity-fed slope without pumps (A), mostly underground with arches as the exception (B), and the city's wide use of and dependence on the water (D). C, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (2 conversations + 3 lectures · 28 Q) ────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and Financial Aid Office",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and an officer in the financial aid office.

Student: Hi, I got an email saying there's a problem with my scholarship, and that my account is on hold? I'm kind of panicking, honestly—I'm supposed to register for fall classes tomorrow.

Officer: Okay, let's take a look. Can I get your student ID number? ... Right, I see it here. So your merit scholarship hasn't been canceled, don't worry about that. The hold is because we're missing one document.

Student: A document? I thought I submitted everything back in the spring.

Officer: You did submit most of it. But your scholarship requires you to maintain a minimum grade point average, and to confirm that each year we need an updated academic record from the registrar. We don't have this year's on file yet.

Student: Oh. So my grades are fine, it's just that the paperwork is missing?

Officer: Most likely, yes. Your scholarship needs a 3.2 GPA, and the last record we had you well above that. This is really just a routine yearly check. The system automatically placed the hold when the deadline passed and the new record wasn't here.

Student: That's such a relief. So how do I fix it? Do I need to bring you a transcript?

Officer: You don't have to bring it to me personally. The cleanest way is to log into the registrar's portal and click "Send official record to Financial Aid." It goes directly to us electronically, and it's usually processed within a day.

Student: Within a day—but I register tomorrow morning. Will the hold be gone in time?

Officer: That's the tight part. If you submit it through the portal this afternoon, it might not clear by tomorrow at nine. So here's what I'll do: I'll put a note on your account right now saying the document is in progress. That note lets me lift the registration hold manually, so you can sign up for classes while the record makes its way through the system.

Student: You can do that? That would be amazing.

Officer: I can, as long as I can see that you've actually started the request. So step one, submit it through the registrar's portal today. Then email me a screenshot of the confirmation, and I'll lift the registration hold this afternoon. The scholarship hold will clear on its own once the record arrives.

Student: Okay. Submit through the portal, screenshot, email it to you. I'll do it the second I leave here. Thank you so much—I really thought I was going to lose the scholarship.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "Why does the student come to the financial aid office?",
          choices: [
            "To apply for a new scholarship for the fall",
            "To find out why a hold has been placed on her account",
            "To appeal a decision to cancel her scholarship",
            "To ask for help registering for classes online",
          ],
          correct: 1,
          explanation: "The student received an email about a problem and a hold, and she comes in to learn why and how to fix it.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "What is the actual cause of the hold on the student's account?",
          choices: [
            "Her grade point average has fallen below the requirement.",
            "Her scholarship has been canceled.",
            "An updated academic record from the registrar is missing.",
            "She failed to pay a registration fee.",
          ],
          correct: 2,
          explanation: "The officer explains the hold exists because \"we're missing one document\" — this year's academic record from the registrar.",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "What does the officer say is the cleanest way for the student to submit the document?",
          choices: [
            "Bring a printed transcript to the office in person",
            "Use the registrar's portal to send the record directly to Financial Aid",
            "Mail the document to the registrar",
            "Ask a professor to confirm her grades by email",
          ],
          correct: 1,
          explanation: "The officer recommends logging into the registrar's portal and clicking \"Send official record to Financial Aid,\" which arrives electronically.",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "Why does the officer offer to put a note on the student's account?",
          choices: [
            "To cancel the scholarship requirement entirely",
            "To allow her to register for classes before the document clears",
            "To extend the deadline for maintaining her GPA",
            "To explain the hold to the registrar's office",
          ],
          correct: 1,
          explanation: "The note showing the document is \"in progress\" lets the officer lift the registration hold manually so the student can sign up while the record processes.",
        },
        {
          id: "l1q5", qtype: "Detail",
          prompt: "What must the student do before the officer will lift the registration hold?",
          choices: [
            "Wait a full day for the record to be processed",
            "Submit the request through the portal and email a screenshot of the confirmation",
            "Bring two professors' recommendation letters",
            "Pay the scholarship balance in advance",
          ],
          correct: 1,
          explanation: "The officer will lift the hold once she can see the request started: submit through the portal, then email a screenshot of the confirmation.",
        },
      ],
    },
    {
      id: "l2",
      title: "Conversation: Student and Professor",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a professor.

Student: Professor Hayes, do you have a minute? You mentioned in lecture that you're looking for students to help with your research, and I wanted to ask about it.

Professor: Of course, come in. Yes, I'm starting a new project this term and I could use a couple of undergraduates. Are you thinking of getting involved?

Student: I'd really like to. I'm a second-year environmental science major, and the project sounded fascinating—it's about how city green spaces affect local insect populations, right?

Professor: That's right. We're surveying small parks and gardens across the city and counting pollinators—bees, butterflies, that sort of thing—to see how the size and the plant diversity of a green space relates to the number of pollinators it supports.

Student: That's exactly the kind of fieldwork I've been hoping to do. I should be honest, though—I haven't taken statistics yet. Is that a problem?

Professor: Not for the role I have in mind. The work I need help with right now is mostly data collection in the field. You'd go out to assigned sites on a schedule, follow a standard counting procedure, and record what you observe. The heavy statistical analysis comes later, and I'll handle that part—though if you stay on, you'd certainly learn some of it.

Student: That's reassuring. How much time would it take? I'm carrying a pretty full course load this term.

Professor: I'd ask for about six hours a week, and the nice thing is the field visits are fairly flexible—you choose which mornings work around your classes, as long as you cover your sites each week. It's not the kind of commitment where you have to be in a lab at a fixed hour.

Student: Six hours sounds manageable. Is this a volunteer position, or—

Professor: Good question. There are two ways to do it. You can register it for course credit as an independent study, which goes on your transcript, or, if your schedule's already full, some students simply do it for the experience and a letter of recommendation later. Most second-years take the credit option, since it counts toward the major.

Student: I think the credit option makes the most sense for me. What would I need to do to get started?

Professor: Stop by my office hours on Thursday and I'll give you the field protocol to read, plus the registration form for the independent study. Read the protocol carefully before our first site visit—it explains exactly how the counts are done, and consistency between observers is the whole point.

Student: I'll be there Thursday. Thank you so much for this—I've been wanting real field experience since I started here.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Purpose",
          prompt: "Why does the student go to see the professor?",
          choices: [
            "To ask for an extension on a class assignment",
            "To express interest in joining the professor's research project",
            "To complain about the difficulty of a statistics course",
            "To request a letter of recommendation for a job",
          ],
          correct: 1,
          explanation: "The student opens by asking about the research help the professor mentioned in lecture and saying she wants to get involved.",
        },
        {
          id: "l2q2", qtype: "Detail",
          prompt: "What is the research project about?",
          choices: [
            "How city green spaces affect local pollinator populations",
            "How temperature changes affect butterfly migration",
            "How pollution levels vary between city parks",
            "How gardens can be designed to attract tourists",
          ],
          correct: 0,
          explanation: "The professor describes surveying parks and gardens, counting pollinators to relate green-space size and plant diversity to pollinator numbers.",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "The student is concerned that she has not yet taken statistics. How does the professor respond?",
          choices: [
            "She must complete statistics before she can join.",
            "The role he has in mind is mostly field data collection, so it is not a problem.",
            "She should take an online statistics course immediately.",
            "Statistics is not used in the project at all.",
          ],
          correct: 1,
          explanation: "The professor says it is \"not a problem\" because the work is mainly field data collection; he handles the statistical analysis himself.",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "According to the professor, what makes the time commitment manageable?",
          choices: [
            "The student only needs to work one week per month.",
            "The field visits are flexible and can be scheduled around the student's classes.",
            "The student can do all the work from home.",
            "The professor will reduce the hours during exam weeks.",
          ],
          correct: 1,
          explanation: "He asks for about six hours a week and notes the field visits are flexible — the student chooses which mornings, as long as the sites are covered.",
        },
        {
          id: "l2q5", qtype: "Inference",
          prompt: "What does the student most likely decide to do about how she will participate?",
          choices: [
            "Volunteer without receiving credit",
            "Register the work for course credit as an independent study",
            "Wait until next term to join",
            "Join only if she is paid for her time",
          ],
          correct: 1,
          explanation: "After hearing the options, the student says \"the credit option makes the most sense for me,\" matching what most second-years choose.",
        },
      ],
    },
    {
      id: "l3",
      title: "Lecture: Volcanoes and Magma (Geology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a geology class.

Professor: Today I want to get at a question that sounds simple but really isn't: why are some volcanic eruptions gentle, almost peaceful, while others are catastrophically explosive? You've all seen the footage—on one hand, rivers of glowing lava flowing slowly down a Hawaiian hillside, and on the other, a mountain that blows itself apart in seconds. Same general phenomenon, wildly different behavior. So what's going on?

The answer comes down mostly to one property of the magma: its viscosity. Viscosity is just a measure of how easily a fluid flows. Water has low viscosity—it flows freely. Honey has high viscosity—it's thick and sluggish. Magma can be either, and the difference turns out to be enormous.

Now, what controls a magma's viscosity? The single most important factor is the amount of silica it contains. Silica is a compound of silicon and oxygen, and its molecules tend to link up into long chains. The more silica in the magma, the more of these chains form, and the thicker and stickier the magma becomes. Low-silica magma is runny, like water; high-silica magma is stiff, like cold honey.

Here's why that matters for eruptions. All magma contains dissolved gases—water vapor, carbon dioxide, and so on. As magma rises toward the surface, the pressure on it drops, and those dissolved gases try to escape, forming bubbles—exactly like the bubbles that appear when you open a bottle of soda. Now, in low-viscosity magma, the magma is runny enough that the gas bubbles can rise up and slip out easily. The gas escapes gently, and you get those calm, flowing lava eruptions.

But in high-viscosity magma, the magma is so thick and stiff that the gas can't escape. The bubbles get trapped. Pressure builds and builds with nowhere to go—until finally the magma can't contain it anymore, and the whole thing erupts violently, shattering the magma into ash and hurling it into the sky. So the explosive eruptions, the dangerous ones, are associated with thick, high-silica magma.

And this connects to where these volcanoes occur. The gentle, low-silica eruptions tend to happen at places like Hawaii, over what we call hot spots in the middle of a plate. The violently explosive, high-silica ones tend to occur where one tectonic plate is sliding beneath another—at what are called subduction zones, like those ringing the Pacific. So the next time you hear about a volcano, the first useful question to ask isn't how big it is. It's: how sticky was the magma?`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How to predict exactly when a volcano will erupt",
            "Why some volcanic eruptions are gentle while others are explosive",
            "The chemical composition of the Earth's core",
            "How volcanoes create new islands over time",
          ],
          correct: 1,
          explanation: "The professor frames the whole lecture around why eruptions range from gentle to catastrophically explosive, and the magma property responsible.",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the professor, what is viscosity?",
          choices: [
            "The temperature of the magma",
            "A measure of how easily a fluid flows",
            "The amount of gas dissolved in the magma",
            "The depth at which magma forms",
          ],
          correct: 1,
          explanation: "He defines viscosity as \"a measure of how easily a fluid flows,\" contrasting free-flowing water with thick honey.",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "According to the lecture, what is the single most important factor controlling a magma's viscosity?",
          choices: [
            "The amount of silica it contains",
            "The speed at which it rises",
            "The size of the volcano",
            "The color of the lava",
          ],
          correct: 0,
          explanation: "The professor says \"the single most important factor is the amount of silica,\" whose molecules link into chains that thicken the magma.",
        },
        {
          id: "l3q4", qtype: "Function",
          prompt: "Why does the professor compare escaping gas bubbles to opening a bottle of soda?",
          choices: [
            "To show that magma contains carbon dioxide and nothing else",
            "To illustrate how falling pressure causes dissolved gases to form bubbles",
            "To argue that soda is as dangerous as magma",
            "To explain how magma is artificially created in a lab",
          ],
          correct: 1,
          explanation: "The soda analogy illustrates that, as pressure drops, dissolved gases come out of solution as bubbles — just as in rising magma.",
        },
        {
          id: "l3q5", qtype: "Detail",
          prompt: "Why does high-viscosity magma tend to produce explosive eruptions?",
          choices: [
            "It is much hotter than low-viscosity magma.",
            "It is so thick that gas bubbles get trapped, building pressure until the magma bursts.",
            "It contains no dissolved gases at all.",
            "It cools too quickly to flow out of the volcano.",
          ],
          correct: 1,
          explanation: "In stiff, high-silica magma the gas \"can't escape,\" so pressure builds until \"the whole thing erupts violently,\" shattering the magma into ash.",
        },
        {
          id: "l3q6", qtype: "Organization",
          prompt: "How does the professor connect magma type to volcano location at the end of the lecture?",
          choices: [
            "He says low-silica eruptions occur at subduction zones and high-silica ones at hot spots.",
            "He links gentle, low-silica eruptions to hot spots like Hawaii and explosive, high-silica ones to subduction zones.",
            "He claims volcano location has no relationship to magma type.",
            "He argues that all explosive volcanoes occur in the middle of plates.",
          ],
          correct: 1,
          explanation: "He connects gentle low-silica eruptions to hot spots (Hawaii) and violent high-silica eruptions to subduction zones around the Pacific.",
        },
      ],
    },
    {
      id: "l4",
      title: "Lecture: Classical Conditioning / Pavlov (Psychology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a psychology class.

Professor: So we're going to spend today on one of the foundational ideas in all of psychology—classical conditioning. And the story behind its discovery is a great example of how a major scientific insight can come almost by accident. The central figure is a Russian physiologist named Ivan Pavlov, working around the year 1900. And here's the thing: Pavlov was not actually trying to study learning at all. He was studying digestion. Specifically, he was measuring how much dogs salivate when they're given food.

Now, a dog salivating at the sight or smell of food is no surprise—that's an automatic, built-in reflex. You don't have to teach a dog to do that. In Pavlov's terms, the food is what we call an unconditioned stimulus, and the salivation it produces is an unconditioned response. "Unconditioned" just means natural, untrained, automatic.

But Pavlov noticed something odd. After a while, the dogs in his lab started salivating before any food appeared. They'd start drooling at the sound of the assistant's footsteps approaching, or at the sight of the bowl. Now, there's nothing naturally meaningful about footsteps—a dog has no built-in reason to salivate at a footstep. So why were they doing it? Pavlov realized the dogs had learned to associate those signals with the arrival of food.

So he set out to test this systematically. He began ringing a bell—or, in some versions of the story, sounding a buzzer or a metronome—just before feeding the dogs. A bell, on its own, means nothing to a dog. At first, ringing it produced no salivation. But Pavlov repeatedly paired the bell with food: bell, then food; bell, then food; over and over. And after enough pairings, something remarkable happened. He could ring the bell with no food at all, and the dogs would salivate anyway.

So let's put the terminology together, because this is what you'll be tested on. The bell, which started out meaningless, became what we call a conditioned stimulus—conditioned because the response to it had to be learned. And the salivation in response to the bell is the conditioned response. The animal has learned to respond to a previously neutral signal as if it predicted food.

And the reason this matters so much is that it's not just about dogs and bells. This same process shapes an enormous amount of human behavior. Think about why a particular song can suddenly bring back a flood of emotion, or why the smell of a hospital can make someone anxious before anything has even happened. In each case, a once-neutral stimulus has been paired with something meaningful, and we've been conditioned to respond. Pavlov, studying drool in dogs, stumbled onto a basic mechanism of learning itself.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The digestive system of dogs",
            "How Pavlov discovered and demonstrated classical conditioning",
            "The differences between humans and animals in learning",
            "How to train a dog to follow commands",
          ],
          correct: 1,
          explanation: "The professor traces Pavlov's accidental discovery of classical conditioning and explains its key terms and significance.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "What was Pavlov originally trying to study?",
          choices: [
            "Animal learning and memory",
            "Digestion, by measuring how much dogs salivate to food",
            "The hearing ability of dogs",
            "How dogs respond to human emotions",
          ],
          correct: 1,
          explanation: "The professor stresses Pavlov \"was not actually trying to study learning\" — he was studying digestion, measuring salivation to food.",
        },
        {
          id: "l4q3", qtype: "Detail",
          prompt: "In Pavlov's terms, what is the food itself classified as?",
          choices: [
            "A conditioned stimulus",
            "An unconditioned stimulus",
            "A conditioned response",
            "A neutral signal",
          ],
          correct: 1,
          explanation: "The food is the \"unconditioned stimulus,\" producing the automatic, untrained salivation (the unconditioned response).",
        },
        {
          id: "l4q4", qtype: "Detail",
          prompt: "What surprising behavior did Pavlov notice in his dogs?",
          choices: [
            "They refused to eat the food he provided.",
            "They began salivating at signals like footsteps before any food appeared.",
            "They stopped salivating at the sight of food.",
            "They became frightened by the sound of a bell.",
          ],
          correct: 1,
          explanation: "The dogs started salivating \"before any food appeared,\" at footsteps or the sight of the bowl — leading Pavlov to investigate learned associations.",
        },
        {
          id: "l4q5", qtype: "Detail",
          prompt: "After repeated pairings of bell and food, what became the conditioned stimulus and conditioned response?",
          choices: [
            "The food was the conditioned stimulus; salivation was the conditioned response.",
            "The bell was the conditioned stimulus; salivation to the bell was the conditioned response.",
            "The footsteps were the conditioned stimulus; eating was the conditioned response.",
            "The bell was the conditioned stimulus; the food was the conditioned response.",
          ],
          correct: 1,
          explanation: "The once-meaningless bell became the conditioned stimulus, and salivating to the bell alone was the learned conditioned response.",
        },
        {
          id: "l4q6", qtype: "Inference",
          prompt: "Why does the professor mention a song bringing back emotion and the smell of a hospital causing anxiety?",
          choices: [
            "To show that classical conditioning applies only to animals",
            "To illustrate that the same conditioning process shapes human behavior",
            "To argue that emotions cannot be studied scientifically",
            "To prove that Pavlov's experiments were never replicated",
          ],
          correct: 1,
          explanation: "These human examples show the same mechanism — a once-neutral stimulus paired with something meaningful — shaping human responses, not just dogs.",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: The Invention of Photography (the Daguerreotype) (Art/Technology History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an art history class.

Professor: Today I want to talk about a moment that genuinely changed how human beings see the world: the invention of photography. And specifically the first form of photography to really catch on—the daguerreotype, announced to the public in France in 1839. Now, to appreciate why this was such a shock, you have to put yourself in the mindset of someone living before it. For all of human history up to that point, if you wanted an image of a person, a building, a landscape, you needed an artist—a painter or a draftsman—to make it by hand. Images were slow, expensive, and filtered through human skill. And then suddenly there was a machine that could capture reality directly, in extraordinary detail, with no brush at all.

The process was named after Louis Daguerre, who developed it. And the results astonished people. A daguerreotype was made on a polished silver-coated copper plate, and the level of detail it captured was breathtaking—far finer than anything a human hand could draw. People described looking at one through a magnifying glass and seeing tiny details the photographer himself hadn't noticed when taking the picture. Critics at the time wrote that the daguerreotype was like holding a mirror that had been taught to remember.

But—and this is important—the early daguerreotype had serious limitations, and I want you to understand them, because they shaped what early photography could and couldn't do. The first big limitation was exposure time. The plate was not very sensitive to light, so capturing an image required the subject to hold still for a long time—in the earliest days, sometimes many minutes. Now think about what that means. You could photograph a building or a quiet street beautifully. But you could not easily photograph a person, because almost nobody can hold perfectly still for that long without blinking or moving. That's why so many early portraits look stiff and unsmiling—the sitters had their heads clamped in place from behind, and a long unblinking stare was simply easier to hold than a smile.

There's a famous, almost eerie example of this. One of the earliest photographs of a Paris street appears to show a completely empty boulevard, even though it would actually have been full of traffic and pedestrians. Why empty? Because the exposure took so long that all the moving carriages and walking people simply didn't register on the plate—they weren't in any one spot long enough. The only human figure that does appear is a man who happened to be standing still, getting his shoes shined.

The second major limitation was that each daguerreotype was a unique object. There was no negative, so there was no way to make copies. If you wanted two daguerreotypes of the same scene, you had to take two separate photographs. This made them precious, but it also limited their spread, and it's part of why later photographic processes, which did allow copies, eventually replaced the daguerreotype entirely. Still, for that first decade, the daguerreotype gave humanity something it had never had: a faithful, mechanical record of a moment in time.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The life of the painter Louis Daguerre",
            "The daguerreotype as the first popular form of photography, including its strengths and limitations",
            "How modern digital cameras work",
            "The decline of portrait painting in the nineteenth century",
          ],
          correct: 1,
          explanation: "The professor introduces the daguerreotype as the first photography to catch on and discusses both its astonishing detail and its key limitations.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "Before photography, how were images of people and places made, according to the professor?",
          choices: [
            "With early mechanical machines",
            "By hand, by an artist such as a painter or draftsman",
            "By tracing reflections in mirrors",
            "Only in the imagination",
          ],
          correct: 1,
          explanation: "He says that for all earlier history you \"needed an artist—a painter or a draftsman—to make it by hand.\"",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "What astonished people about the detail of a daguerreotype?",
          choices: [
            "It could be printed in many copies at once.",
            "It captured detail finer than a human hand could draw, including details the photographer hadn't noticed.",
            "It showed images in full color.",
            "It could be made very quickly, in seconds.",
          ],
          correct: 1,
          explanation: "The detail was \"far finer than anything a human hand could draw,\" and viewers saw tiny details \"the photographer himself hadn't noticed.\"",
        },
        {
          id: "l5q4", qtype: "Detail",
          prompt: "Why do many early daguerreotype portraits look stiff and unsmiling?",
          choices: [
            "People in that era considered smiling improper.",
            "The long exposure time forced sitters to hold still, making a steady stare easier than a smile.",
            "The plates could not record the color of a smile.",
            "Photographers preferred serious expressions for artistic reasons.",
          ],
          correct: 1,
          explanation: "Long exposures meant subjects had to hold still for minutes; a steady unblinking stare was easier to maintain than a smile.",
        },
        {
          id: "l5q5", qtype: "Function",
          prompt: "Why does the professor describe the early photograph of an \"empty\" Paris street?",
          choices: [
            "To prove that the street was actually deserted that day",
            "To give a vivid illustration of how long exposure times erased moving people and traffic",
            "To show that daguerreotypes could not photograph buildings",
            "To explain why daguerreotypes were so expensive",
          ],
          correct: 1,
          explanation: "The 'empty' street illustrates the long-exposure limitation: moving carriages and pedestrians didn't register, while a man standing still to get his shoes shined did appear.",
        },
        {
          id: "l5q6", qtype: "Detail",
          prompt: "What was the second major limitation of the daguerreotype that the professor describes?",
          choices: [
            "It faded within a few days of being made.",
            "Each one was a unique object that could not be copied, because there was no negative.",
            "It could only photograph people, not landscapes.",
            "It required electricity, which was rare at the time.",
          ],
          correct: 1,
          explanation: "Each daguerreotype was \"a unique object\" with no negative, so copies were impossible — a limitation later processes overcame.",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some students prefer to take their classes online, while others prefer to attend classes in person on campus. Which do you prefer, and why? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State your preference in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Starting next term, the university will charge a $90 annual membership fee to use the campus recreation center and gym, which has until now been free for students. The university says the fee will fund new equipment and longer opening hours.\n\n[Then you hear two students discussing the change. The woman disagrees with the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state the announcement, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A textbook passage defines 'opportunity cost' — the value of the next-best alternative that a person gives up whenever they choose to use a limited resource, such as time or money, for one purpose instead of another.\n\n[Then you hear a professor give an example involving a student deciding how to spend a free afternoon.]",
      prompt: "Using the example from the lecture, explain the concept of opportunity cost.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains two methods by which plants disperse their seeds away from the parent plant: dispersal by wind, in which seeds are light and shaped to drift or spin on the air, and dispersal by animals, in which seeds are enclosed in sweet fruit that animals eat and later deposit elsewhere. The lecture gives one example of each.",
      prompt: "Using the points and examples from the lecture, explain two methods plants use to disperse their seeds.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general idea (why seeds must move away from the parent), then give BOTH methods from the lecture with their examples and contrast them (wind vs. animal).",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Some companies have begun replacing the traditional five-day workweek with a four-day workweek, in which employees work four days but are paid as if they worked five. Supporters make three claims in its favor:

1. It boosts productivity, because well-rested employees get more done in less time.
2. It improves employee well-being and makes workers less likely to quit.
3. It is good for the environment, since fewer commuting days mean less traffic and pollution.

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

Professor: Many universities require every student to complete at least one foreign-language course in order to graduate, regardless of their major. In your opinion, should universities require all students to take a foreign-language course? Why or why not?

Sophia (classmate): I think the requirement is valuable. Learning another language broadens your thinking and prepares you for an increasingly global world, even if your major is unrelated.

Ethan (classmate): I disagree — students should be free to focus on courses relevant to their careers. Forcing a language requirement wastes the time of students who will never use it.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
