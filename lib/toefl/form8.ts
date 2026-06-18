import type { ToeflForm } from "./types";

/**
 * TOEFL iBT Practice Test 8 — original, official-format items written to match
 * the real exam in length, question types, and timing. Reading & Listening are
 * auto-graded MCQ; Speaking & Writing are timed practice tasks.
 *
 * Each reading passage is full-length (~650 words) with 10 questions spanning
 * every official type. Listening has two conversations and three lectures with
 * the standard 5–6 questions each. Question-type labels appear on every item.
 */

export const TOEFL_FORM_8: ToeflForm = {
  id: "toefl-8",
  title: "TOEFL iBT Practice Test 8",

  // ── READING (35 min · 2 passages · 10 Q each) ──────────────────────────────
  reading: [
    {
      id: "r1",
      title: "The Origins of Money and Trade",
      passage:
`Long before coins or paper bills existed, human communities exchanged goods directly, a practice known as barter. In a barter economy, a farmer with a surplus of grain might trade it for a neighbor's tools, or a fisherman might swap part of his catch for a potter's bowls. For small, close-knit groups, this arrangement worked reasonably well. As communities grew larger and more specialized, however, barter began to reveal serious limitations that eventually pushed people toward inventing money.

The central problem with barter is what economists call the "double coincidence of wants." For a trade to succeed, each party must possess exactly what the other desires, and must want exactly what the other offers, at the same moment. A shoemaker who needs grain must find a grain farmer who happens to need shoes. If the farmer already has enough shoes, no exchange can take place, no matter how badly the shoemaker wants the grain. As the variety of goods in a society multiplied, finding such perfect matches became increasingly difficult and time-consuming.

To ease these difficulties, many societies gradually settled on certain widely desired items to serve as a medium of exchange—something that almost everyone would accept, not because they wanted the item itself, but because they knew they could trade it again later. Cattle, salt, shells, and grain have all played this role in different parts of the world. The English word "salary" descends from the Latin word for salt, a reminder that Roman soldiers were once partly paid in this valuable commodity. A medium of exchange solved the double-coincidence problem: the shoemaker could sell shoes for shells and later use those shells to buy grain from anyone, whether or not that person needed shoes.

Yet these early forms of commodity money still had drawbacks. Cattle could not be divided to make small purchases, and they could fall ill or die. Salt dissolved in damp weather, and grain could rot or be eaten by pests. What was needed was something durable, easily divided, portable, and reliably scarce. Metals—particularly gold and silver—satisfied these requirements remarkably well. They did not decay, could be melted and split into precise amounts, and were rare enough to hold their value. By around 600 BCE, in the kingdom of Lydia in what is now Turkey, rulers began stamping standardized lumps of metal with an official mark. These stamped pieces were the first true coins, and the innovation spread rapidly across the ancient world.

The advantage of coinage was not merely convenience but trust. A merchant receiving an unmarked lump of metal had to weigh it and test its purity before accepting it. An official stamp, by contrast, certified the weight and quality of the metal, so coins could be exchanged quickly and confidently. This certification was so useful that it allowed trade to expand over much greater distances. Merchants could now carry wealth in their pockets across borders, and markets that had once been limited to a single village could link entire regions.

The story of money, then, is not the story of a single brilliant invention but of a long series of practical solutions to real problems. Each step—from barter, to commodity money, to standardized coins—reduced the friction of exchange a little further, making it faster and easier for strangers to do business with one another. In doing so, money quietly became one of the most powerful tools humans ever devised for cooperation, knitting together communities that might otherwise have had no reason to trust or trade with each other at all.`,
      questions: [
        {
          id: "r1q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, barter worked reasonably well for which kind of community?",
          choices: [
            "Large, highly specialized societies",
            "Small, close-knit groups",
            "Communities that used standardized coins",
            "Regions linked by long-distance trade",
          ],
          correct: 1,
          explanation: "Paragraph 1 states that \"for small, close-knit groups, this arrangement worked reasonably well,\" before noting that growth revealed barter's limits.",
        },
        {
          id: "r1q2", qtype: "Vocabulary",
          prompt: "The word \"surplus\" in paragraph 1 is closest in meaning to",
          choices: ["shortage", "excess", "variety", "price"],
          correct: 1,
          explanation: "A \"surplus\" of grain is an amount in excess of what is needed, available to trade away.",
        },
        {
          id: "r1q3", qtype: "Factual Information",
          prompt: "According to paragraph 2, why might a trade fail under the \"double coincidence of wants\"?",
          choices: [
            "One party may not have any goods at all to offer.",
            "The two parties may live too far apart to meet.",
            "One party may not want what the other has to offer.",
            "Neither party can agree on a fair price in coins.",
          ],
          correct: 2,
          explanation: "The example shows that if the farmer \"already has enough shoes,\" no exchange occurs even though the shoemaker wants grain — the wants do not coincide.",
        },
        {
          id: "r1q4", qtype: "Rhetorical Purpose",
          prompt: "Why does the author mention the origin of the word \"salary\" in paragraph 3?",
          choices: [
            "To prove that salt was more valuable than gold",
            "To illustrate that salt once served as a medium of exchange",
            "To explain why Roman soldiers were poorly paid",
            "To show that Latin is the source of most economic terms",
          ],
          correct: 1,
          explanation: "The \"salary\"/salt connection is offered as a concrete reminder that salt functioned as a valuable medium of exchange — soldiers were partly paid in it.",
        },
        {
          id: "r1q5", qtype: "Factual Information",
          prompt: "According to paragraph 4, why were metals such as gold and silver well suited to be money?",
          choices: [
            "They were the most common materials in the ancient world.",
            "They were durable, divisible, portable, and reliably scarce.",
            "They could be eaten in times of famine.",
            "They were impossible to melt or reshape.",
          ],
          correct: 1,
          explanation: "Paragraph 4 says what was needed was something \"durable, easily divided, portable, and reliably scarce,\" and metals \"satisfied these requirements remarkably well.\"",
        },
        {
          id: "r1q6", qtype: "Sentence Simplification",
          prompt: "Which choice best expresses the essential information in the highlighted sentence?\n\n\"An official stamp, by contrast, certified the weight and quality of the metal, so coins could be exchanged quickly and confidently.\"",
          choices: [
            "Stamps made coins heavier and therefore more valuable than plain metal.",
            "Because a stamp guaranteed a coin's weight and purity, coins could be traded fast and with trust.",
            "Merchants stopped trusting coins once officials began stamping them.",
            "Officials stamped coins mainly to make them look more attractive.",
          ],
          correct: 1,
          explanation: "The sentence means the stamp's certification of weight and quality let coins be exchanged quickly and confidently — choice B restates this faithfully.",
        },
        {
          id: "r1q7", qtype: "Detail",
          prompt: "According to paragraph 4, where and roughly when were the first true coins made?",
          choices: [
            "In Rome, around the time soldiers were paid in salt",
            "In Lydia, in present-day Turkey, around 600 BCE",
            "In China, several centuries after paper money appeared",
            "In Greece, immediately after barter was abandoned",
          ],
          correct: 1,
          explanation: "The passage states that \"by around 600 BCE, in the kingdom of Lydia in what is now Turkey,\" rulers stamped metal — the first true coins.",
        },
        {
          id: "r1q8", qtype: "Negative Factual Information",
          prompt: "According to paragraph 4, all of the following are described as drawbacks of early commodity money EXCEPT:",
          choices: [
            "Cattle could fall ill or die.",
            "Salt could dissolve in damp weather.",
            "Grain could rot or be eaten by pests.",
            "Shells were too rare to be widely accepted.",
          ],
          correct: 3,
          explanation: "The paragraph lists sick cattle, dissolving salt, and rotting grain as drawbacks. It does not say shells were too rare; scarcity is presented as a desirable trait, not a flaw.",
        },
        {
          id: "r1q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 5?\n\n\"This single mark removed the need for tedious testing at every transaction.\"",
          choices: [
            "Before \"The advantage of coinage was not merely convenience but trust.\"",
            "After \"...had to weigh it and test its purity before accepting it.\"",
            "After \"...so coins could be exchanged quickly and confidently.\"",
            "Before \"Merchants could now carry wealth in their pockets across borders...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence about removing \"tedious testing\" follows naturally right after the description of merchants having to weigh and test unmarked metal.",
        },
        {
          id: "r1q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Money developed gradually as a series of solutions to the problems of exchange.\"",
          choices: [
            "Barter failed in larger societies because of the difficulty of matching wants between traders.",
            "Societies adopted widely accepted goods, and later metals, as a medium of exchange.",
            "Roman soldiers refused to accept any payment other than salt.",
            "Standardized stamped coins certified weight and quality, building trust and expanding trade.",
            "Gold and silver were chosen because they were the most plentiful metals available.",
            "Paper money replaced coins almost as soon as Lydia invented coinage.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "The key ideas are barter's matching problem (A), the move to media of exchange and then metals (B), and stamped coins building trust and trade (D). C, E, and F are false or unsupported.",
        },
      ],
    },
    {
      id: "r2",
      title: "Photosynthesis: How Plants Make Food",
      passage:
`Every green plant performs a chemical feat that sustains nearly all life on Earth: it captures energy from sunlight and uses it to manufacture its own food. This process, called photosynthesis, converts simple inorganic ingredients—carbon dioxide from the air and water from the soil—into sugars that store chemical energy. As a by-product, photosynthesis releases oxygen into the atmosphere. Because animals, including humans, ultimately depend on plants for both food and breathable air, photosynthesis is often described as the foundation of the living world.

The reaction takes place mainly inside the leaves, in tiny structures called chloroplasts. Packed within the chloroplasts is a green pigment called chlorophyll, and it is chlorophyll that gives leaves their color. More importantly, chlorophyll is exceptionally good at absorbing light, especially in the red and blue parts of the spectrum. Interestingly, it reflects rather than absorbs green light, which is precisely why leaves appear green to our eyes. When a particle of light, or photon, strikes a chlorophyll molecule, the molecule absorbs that energy, setting the entire process of photosynthesis in motion.

Biologists divide photosynthesis into two connected stages. The first stage requires light directly and is therefore known as the light-dependent reactions. During this stage, the absorbed light energy is used to split water molecules apart. This splitting is the source of the oxygen that plants release, and it also produces energy-carrying molecules that the plant will use in the next stage. The second stage, sometimes called the light-independent reactions, does not use light directly. Instead, it uses the energy captured in the first stage to combine carbon dioxide into sugar. Because this stage builds sugar without needing light at that very moment, it can continue for a short time even after the sun goes down.

A common misconception is that plants take in their food the way animals do, absorbing nutrients ready-made from the soil. In reality, the roots draw up mostly water and small quantities of minerals. The bulk of a plant's body—the wood of a tree, for instance—is built largely from carbon that the plant pulls out of the air as carbon dioxide. In a sense, a great oak is constructed mostly out of thin air and sunlight, a fact that many people find surprising when they first encounter it.

Photosynthesis does not proceed at a constant rate; it is influenced by several environmental factors. Light intensity is an obvious one: up to a point, brighter light speeds the process. The concentration of carbon dioxide matters too, as does temperature, since the reactions are driven by enzymes that work best within a certain range of warmth. When any one of these factors is in short supply, it can limit the overall rate no matter how plentiful the others are. Greenhouse growers exploit this knowledge directly, sometimes pumping extra carbon dioxide into the air around their crops to boost growth.

The consequences of photosynthesis extend far beyond individual plants. Over billions of years, the oxygen produced by early photosynthetic organisms gradually transformed the Earth's atmosphere, making it breathable for the animals that later evolved. Today, the process continues to regulate the balance of gases in the air and to capture carbon that would otherwise remain as carbon dioxide. Understanding photosynthesis is therefore not only a matter of botanical curiosity; it is central to questions about food production, ecosystems, and the changing climate of our planet.`,
      questions: [
        {
          id: "r2q1", qtype: "Factual Information",
          prompt: "According to paragraph 1, what does photosynthesis produce as a by-product?",
          choices: ["Carbon dioxide", "Water", "Oxygen", "Minerals"],
          correct: 2,
          explanation: "Paragraph 1 states that \"as a by-product, photosynthesis releases oxygen into the atmosphere.\"",
        },
        {
          id: "r2q2", qtype: "Detail",
          prompt: "According to paragraph 2, why do leaves appear green?",
          choices: [
            "Chlorophyll absorbs green light most strongly.",
            "Chlorophyll reflects rather than absorbs green light.",
            "Chloroplasts contain no other pigments.",
            "Sunlight contains mostly green photons.",
          ],
          correct: 1,
          explanation: "The passage says chlorophyll \"reflects rather than absorbs green light, which is precisely why leaves appear green.\"",
        },
        {
          id: "r2q3", qtype: "Vocabulary",
          prompt: "The word \"absorbs\" in paragraph 2 is closest in meaning to",
          choices: ["reflects", "takes in", "produces", "blocks"],
          correct: 1,
          explanation: "To \"absorb\" light is to take it in; chlorophyll takes in red and blue light to power photosynthesis.",
        },
        {
          id: "r2q4", qtype: "Factual Information",
          prompt: "According to paragraph 3, what happens during the light-dependent reactions?",
          choices: [
            "Carbon dioxide is combined directly into sugar.",
            "Water molecules are split, releasing oxygen and producing energy-carrying molecules.",
            "The plant absorbs minerals through its roots.",
            "Sugar is broken down to release stored energy.",
          ],
          correct: 1,
          explanation: "In the first, light-dependent stage, \"the absorbed light energy is used to split water molecules apart,\" which releases oxygen and yields energy-carrying molecules.",
        },
        {
          id: "r2q5", qtype: "Inference",
          prompt: "What can be inferred from paragraph 3 about the light-independent reactions?",
          choices: [
            "They cannot occur at all unless the sun is shining at that moment.",
            "They rely on energy captured earlier and can briefly continue after dark.",
            "They release more oxygen than the light-dependent reactions.",
            "They take place outside the chloroplasts, in the roots.",
          ],
          correct: 1,
          explanation: "Because they use energy \"captured in the first stage\" rather than light directly, these reactions \"can continue for a short time even after the sun goes down.\"",
        },
        {
          id: "r2q6", qtype: "Rhetorical Purpose",
          prompt: "Why does the author state that a great oak is built \"mostly out of thin air and sunlight\" in paragraph 4?",
          choices: [
            "To argue that trees do not need water to grow",
            "To dramatize that a plant's mass comes largely from carbon dioxide, not soil",
            "To explain why oaks grow faster than other trees",
            "To prove that roots play no role in a plant's life",
          ],
          correct: 1,
          explanation: "The vivid phrase underscores the corrected misconception: most of a plant's body is built from carbon pulled out of the air, not nutrients from the soil.",
        },
        {
          id: "r2q7", qtype: "Negative Factual Information",
          prompt: "According to paragraph 5, which of the following is NOT mentioned as a factor that affects the rate of photosynthesis?",
          choices: ["Light intensity", "Carbon dioxide concentration", "Temperature", "Soil color"],
          correct: 3,
          explanation: "The paragraph lists light intensity, carbon dioxide concentration, and temperature. Soil color is never mentioned.",
        },
        {
          id: "r2q8", qtype: "Detail",
          prompt: "According to paragraph 5, how do greenhouse growers use knowledge of these factors?",
          choices: [
            "They lower the temperature to slow plant growth.",
            "They block light to protect delicate crops.",
            "They pump extra carbon dioxide into the air to boost growth.",
            "They add minerals to the soil to replace lost oxygen.",
          ],
          correct: 2,
          explanation: "The passage says growers sometimes \"pump extra carbon dioxide into the air around their crops to boost growth.\"",
        },
        {
          id: "r2q9", qtype: "Insert Text",
          prompt: "Where would the following sentence best fit in paragraph 6?\n\n\"Without that ancient outpouring of oxygen, complex animal life could never have arisen.\"",
          choices: [
            "Before \"The consequences of photosynthesis extend far beyond individual plants.\"",
            "After \"...making it breathable for the animals that later evolved.\"",
            "After \"...capture carbon that would otherwise remain as carbon dioxide.\"",
            "Before \"Understanding photosynthesis is therefore not only a matter of botanical curiosity...\"",
          ],
          correct: 1,
          explanation: "The inserted sentence about oxygen enabling animal life fits directly after the statement that the early oxygen made the atmosphere breathable for animals that later evolved.",
        },
        {
          id: "r2q10", qtype: "Prose Summary",
          prompt: "An introductory sentence for a brief summary is provided. Choose the THREE statements that express the most important ideas.\n\n\"Photosynthesis lets plants make their own food and has shaped life on Earth.\"",
          choices: [
            "Plants use chlorophyll to capture sunlight and convert carbon dioxide and water into sugar, releasing oxygen.",
            "Photosynthesis occurs in two stages, one needing light directly and one using stored energy to build sugar.",
            "Plants obtain nearly all of their food ready-made by absorbing nutrients from the soil.",
            "The rate of photosynthesis depends on factors such as light, carbon dioxide, and temperature.",
            "Leaves are green because chlorophyll absorbs green light more strongly than any other color.",
            "Greenhouse growers reduce carbon dioxide to keep their crops from growing too quickly.",
          ],
          correct: 0,
          correctSet: [0, 1, 3],
          explanation: "Key ideas: the overall reaction with chlorophyll (A), the two-stage process (B), and the environmental factors that limit its rate (D). C, E, and F contradict the passage.",
        },
      ],
    },
  ],

  // ── LISTENING (2 conversations + 3 lectures · 28 Q) ────────────────────────
  listening: [
    {
      id: "l1",
      title: "Conversation: Student and IT Help Desk",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a technician at the campus IT help desk.

Student: Hi, I really hope you can help me. I've been locked out of my student account all morning, and I have an assignment due at noon that I can't even open.

Technician: Okay, take a breath, we'll sort it out. Let's start with the basics. When you try to log in, what exactly happens? Do you get an error message?

Student: Yeah, it says "incorrect password," but I'm absolutely certain I'm typing the right one. I've used the same password since September.

Technician: Right. So here's something a lot of students don't realize—the university forces a password reset every six months for security. According to your record, your password actually expired two days ago. So the one you've always used simply doesn't work anymore.

Student: Oh, you have got to be kidding me. Nobody told me.

Technician: We do send a warning email about a week before, but honestly, those notices end up buried in people's inboxes all the time. You're not the first person this has happened to today.

Student: Okay, so how do I fix it? I really am in a hurry.

Technician: It's quick, don't worry. Go to the login page and click "Forgot password." It'll send a reset link to your backup email—the personal one you listed when you registered, not your student address, since you can't get into that right now.

Student: Hmm. The thing is, I'm not totally sure which personal email I put down when I first signed up. That was over a year ago.

Technician: No problem. I can look that up for you right here—I'll just need to verify your identity first. Can I see your student ID card?

Student: Yes, here it is.

Technician: Great. Okay, the backup on file ends in "@gmail.com" and starts with your first initial and last name. Does that ring a bell?

Student: Oh! Yes, that's my old account. I can definitely get into that one.

Technician: Perfect. Send the reset link there, choose a new password, and you'll be back in within a couple of minutes—plenty of time before noon. And maybe set a reminder six months from now so it doesn't catch you off guard again.

Student: Believe me, I will. Thank you so much.`,
      questions: [
        {
          id: "l1q1", qtype: "Gist-Content",
          prompt: "What is the student's main problem?",
          choices: [
            "She cannot remember which assignment is due at noon.",
            "She is locked out of her student account and cannot log in.",
            "She has lost her student ID card.",
            "She cannot access the campus wireless network.",
          ],
          correct: 1,
          explanation: "The student opens by saying she has \"been locked out of my student account all morning\" and cannot open her assignment.",
        },
        {
          id: "l1q2", qtype: "Detail",
          prompt: "According to the technician, why is the student's password no longer working?",
          choices: [
            "She typed it incorrectly several times and got locked out.",
            "Her account was suspended for a rule violation.",
            "The university forces a reset every six months, and her password expired.",
            "The login system was down for maintenance.",
          ],
          correct: 2,
          explanation: "The technician explains the university \"forces a password reset every six months,\" and the student's password \"expired two days ago.\"",
        },
        {
          id: "l1q3", qtype: "Detail",
          prompt: "Why does the technician say the student never noticed the password warning?",
          choices: [
            "The warning email is sent only to faculty members.",
            "The warning notices often end up buried in students' inboxes.",
            "The university stopped sending warnings this year.",
            "The student had unsubscribed from university emails.",
          ],
          correct: 1,
          explanation: "He says a warning is sent about a week before, but \"those notices end up buried in people's inboxes all the time.\"",
        },
        {
          id: "l1q4", qtype: "Function",
          prompt: "Why does the technician ask to see the student's ID card?",
          choices: [
            "To check whether she has paid her technology fee",
            "To verify her identity before looking up her backup email",
            "To confirm she is enrolled in the course with the assignment",
            "To register her for a new student account",
          ],
          correct: 1,
          explanation: "He offers to look up her backup email but says \"I'll just need to verify your identity first,\" then asks for the ID card.",
        },
        {
          id: "l1q5", qtype: "Inference",
          prompt: "What can be inferred about whether the student will meet her deadline?",
          choices: [
            "She will almost certainly miss the noon deadline.",
            "She will likely regain access in time to submit before noon.",
            "She will have to request an extension from her professor.",
            "She will need to come back to the help desk in the afternoon.",
          ],
          correct: 1,
          explanation: "The technician says she'll be back in \"within a couple of minutes—plenty of time before noon,\" implying she will meet the deadline.",
        },
      ],
    },
    {
      id: "l2",
      title: "Lecture: Earthquakes and Seismic Waves (Geology)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a geology class.

Professor: Alright, today we're going to talk about earthquakes—but more specifically, about the waves that earthquakes send through the Earth, because those waves turn out to be one of the most powerful tools we have for understanding the inside of our planet. Now, an earthquake itself is basically a sudden release of energy, usually when rocks along a fault line slip past each other. But the moment that energy is released, it doesn't just stay in one place. It radiates outward in all directions as vibrations we call seismic waves.

Now there are two main families of seismic waves I want you to know. The first kind travels through the interior of the Earth—we call these body waves. The second kind travels along the surface, and those we call surface waves. And here's the interesting part: the surface waves are usually the ones that do the most damage to buildings, because they shake the ground back and forth right where we live. But the body waves are the ones scientists find most useful, and I'll explain why in a minute.

Within the body waves, there are two types, and the distinction is crucial. The first are called P-waves, or primary waves. P-waves are fast—they're the speed champions—so they're always the first to arrive at any recording station. They're also a push-pull kind of wave: the rock compresses and stretches in the same direction the wave is traveling. And importantly, P-waves can travel through anything: solid rock, liquid, even gas.

The second type are S-waves, or secondary waves. These are slower, so they always arrive after the P-waves. They move the ground up and down, or side to side, perpendicular to the direction of travel. And here's the key fact—S-waves cannot travel through liquid. They simply stop. Hold onto that, because it's about to tell us something amazing.

So, in the early twentieth century, scientists set up seismographs all around the world to record earthquakes. And they noticed something very strange. After a large earthquake, there was a region on the far side of the planet where the S-waves never showed up at all. They just vanished. Now, why would that happen? Remember what I just told you—S-waves can't pass through liquid. So the only explanation was that somewhere deep inside the Earth, the waves were hitting a layer that was liquid. And that, ladies and gentlemen, is how we discovered that the Earth has a liquid outer core. Nobody dug down to find it. We deduced it, purely from the behavior of these waves.

So you see, by carefully studying how seismic waves speed up, slow down, bend, or disappear as they pass through the planet, geologists have been able to map out the Earth's hidden layers—the crust, the mantle, the liquid outer core, and the solid inner core—without ever seeing any of it directly. The earthquakes, in a sense, take an X-ray of the planet for us.`,
      questions: [
        {
          id: "l2q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How to predict when an earthquake will occur",
            "How seismic waves are used to study the Earth's interior",
            "Why buildings collapse during large earthquakes",
            "The history of the seismograph as an instrument",
          ],
          correct: 1,
          explanation: "The professor focuses on seismic waves as \"one of the most powerful tools we have for understanding the inside of our planet.\"",
        },
        {
          id: "l2q2", qtype: "Gist-Purpose",
          prompt: "Why does the professor distinguish between body waves and surface waves?",
          choices: [
            "To explain that body waves cause the most damage to buildings",
            "To set up the point that body waves are most useful to scientists, though surface waves do more damage",
            "To argue that surface waves travel faster than body waves",
            "To show that only surface waves can be recorded by seismographs",
          ],
          correct: 1,
          explanation: "He notes surface waves do the most damage but says body waves are \"the ones scientists find most useful,\" setting up the rest of the lecture.",
        },
        {
          id: "l2q3", qtype: "Detail",
          prompt: "According to the professor, what is one characteristic of P-waves?",
          choices: [
            "They are slower than S-waves and arrive last.",
            "They are the fastest waves and can travel through solids, liquids, and gases.",
            "They cannot pass through liquid.",
            "They travel only along the Earth's surface.",
          ],
          correct: 1,
          explanation: "P-waves are \"the speed champions,\" arrive first, and \"can travel through anything: solid rock, liquid, even gas.\"",
        },
        {
          id: "l2q4", qtype: "Detail",
          prompt: "What key property of S-waves does the professor emphasize?",
          choices: [
            "They arrive before P-waves.",
            "They cannot travel through liquid.",
            "They travel faster than any other wave.",
            "They cause no damage to buildings.",
          ],
          correct: 1,
          explanation: "He stresses the \"key fact—S-waves cannot travel through liquid. They simply stop.\"",
        },
        {
          id: "l2q5", qtype: "Organization",
          prompt: "How does the professor explain the discovery of the Earth's liquid outer core?",
          choices: [
            "By describing how scientists drilled deep into the planet",
            "By describing a region where S-waves failed to appear, indicating a liquid layer",
            "By comparing earthquakes on different continents",
            "By measuring the speed of surface waves over time",
          ],
          correct: 1,
          explanation: "Scientists noticed S-waves vanished on the far side of the planet; since S-waves can't pass through liquid, this revealed a liquid outer core.",
        },
        {
          id: "l2q6", qtype: "Inference",
          prompt: "What does the professor imply by saying earthquakes \"take an X-ray of the planet for us\"?",
          choices: [
            "Earthquakes are dangerous and should be avoided.",
            "Seismic waves let scientists map the Earth's interior without seeing it directly.",
            "X-ray machines are used to detect earthquakes.",
            "The Earth's layers are visible only during earthquakes.",
          ],
          correct: 1,
          explanation: "The metaphor means that, like an X-ray, seismic waves reveal the planet's hidden internal layers without anyone observing them directly.",
        },
      ],
    },
    {
      id: "l3",
      title: "Conversation: Student and Study-Abroad Advisor",
      kind: "conversation",
      transcript:
`Narrator: Listen to a conversation between a student and a study-abroad advisor.

Advisor: Hi there, come on in. So you're interested in one of our study-abroad programs—is that right?

Student: Yes, exactly. I'm a second-year history major, and I'd really love to spend a semester in Italy. There's so much I want to study in person—Renaissance art, ancient Roman sites. But honestly, I have no idea where to start with the application.

Advisor: That's a great choice, and you've come at the right time. Applications for next spring open in two weeks and close at the end of October. So you've got a comfortable window, but I wouldn't wait until the last minute.

Student: Okay, good. What do I actually need to put together?

Advisor: There are three main pieces. First, the application form itself, which includes a personal statement—about five hundred words on why you want to go and how it fits your studies. Second, a letter of recommendation from a professor. And third, proof that you've completed the prerequisite courses.

Student: Prerequisites? I didn't know there were any.

Advisor: For the Italy program specifically, you need to have finished at least one college-level course in either European history or art history before you go. Have you taken anything like that?

Student: I took "Introduction to European History" last year and got an A.

Advisor: That covers it. So you're all set on the requirement. Now, one thing students often overlook—do you speak any Italian?

Student: A little. I took two years in high school, but I'm pretty rusty.

Advisor: That's actually fine. The program courses are taught in English, so you don't need to be fluent. But I'd strongly encourage you to brush up on the basics before you go—even just enough to handle daily life. It makes an enormous difference in how much you enjoy the experience and connect with local people.

Student: That makes sense. Is there any financial help available? I'm a little worried about the cost.

Advisor: Yes, and I'm glad you asked. There's a study-abroad scholarship with a separate application, and the deadline is actually earlier—mid-September. So if money is a concern, that's the piece I'd prioritize first. Don't let that deadline slip.

Student: Got it. So scholarship first, then the main application.

Advisor: Exactly. Why don't you start drafting that personal statement this week, and email me a version when you have one? I'm happy to give you feedback before you submit.

Student: That would be amazing. Thank you so much—I feel a lot less lost now.`,
      questions: [
        {
          id: "l3q1", qtype: "Gist-Purpose",
          prompt: "Why does the student go to see the advisor?",
          choices: [
            "To change her major from history to art history",
            "To get help applying to a study-abroad program in Italy",
            "To request an extension on a course assignment",
            "To complain about a prerequisite requirement",
          ],
          correct: 1,
          explanation: "The student says she'd love to spend a semester in Italy but has \"no idea where to start with the application.\"",
        },
        {
          id: "l3q2", qtype: "Detail",
          prompt: "According to the advisor, what are the three main pieces of the application?",
          choices: [
            "A passport, a visa, and proof of vaccination",
            "The application form with a personal statement, a recommendation letter, and proof of prerequisites",
            "An essay, a language test, and a financial form",
            "A transcript, an interview, and a portfolio",
          ],
          correct: 1,
          explanation: "The advisor lists the application form with a personal statement, a letter of recommendation, and proof of completed prerequisite courses.",
        },
        {
          id: "l3q3", qtype: "Detail",
          prompt: "What prerequisite must the student have completed for the Italy program?",
          choices: [
            "At least two years of Italian language study",
            "At least one college-level course in European history or art history",
            "A summer internship at a museum",
            "An introductory course in the Italian language",
          ],
          correct: 1,
          explanation: "The advisor says the program requires \"at least one college-level course in either European history or art history.\"",
        },
        {
          id: "l3q4", qtype: "Attitude",
          prompt: "What is the advisor's attitude toward the student's level of Italian?",
          choices: [
            "She is concerned the student will fail without fluency.",
            "She reassures the student it is fine but encourages brushing up on the basics.",
            "She insists the student take a placement test immediately.",
            "She thinks Italian is unnecessary for the program.",
          ],
          correct: 1,
          explanation: "She says rusty Italian is \"actually fine\" since courses are in English, but \"strongly encourage[s]\" the student to brush up on the basics.",
        },
        {
          id: "l3q5", qtype: "Inference",
          prompt: "Why does the advisor say the scholarship should be the student's first priority?",
          choices: [
            "The scholarship guarantees admission to the program.",
            "The scholarship deadline is earlier than the main application deadline.",
            "The scholarship replaces the need for a personal statement.",
            "The scholarship is only available to history majors.",
          ],
          correct: 1,
          explanation: "The advisor notes the scholarship deadline is \"mid-September\"—earlier than the late-October program deadline—so it should be handled first.",
        },
      ],
    },
    {
      id: "l4",
      title: "Lecture: Language Acquisition in Children (Linguistics)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in a linguistics class.

Professor: So today I want to dig into one of the most remarkable things human beings ever do, and we do it before we can even tie our shoes. I'm talking about how children acquire language. Think about it—a three- or four-year-old, who can't yet read, can't do basic arithmetic, has mastered a system of staggering complexity, with thousands of words and intricate rules of grammar, and they did it without any formal instruction. Nobody sat that child down and taught them the rules. So how does this happen?

For a long time, the dominant explanation was fairly simple. It was the idea that children learn language essentially through imitation and reward. They hear adults speak, they copy what they hear, and when they say something correctly, they get praised or they get what they want—so the correct behavior is reinforced. On the surface, that sounds reasonable, right? Children obviously do imitate. But there's a serious problem with this theory, and it comes from listening carefully to what children actually say.

Here's the evidence. Children regularly produce sentences they have never heard any adult say. The classic example is what we call "overregularization." A young child will say "I goed to the park" or "I have two foots." Now, stop and think—no adult ever says "goed" or "foots." So the child cannot be simply imitating. What's actually happening is fascinating: the child has unconsciously figured out a rule—you add "-ed" to make the past tense, you add "-s" to make a plural—and they're applying that rule everywhere, even to the irregular words where it doesn't belong. That's not imitation. That's a mind actively constructing a grammar.

This kind of evidence led the linguist Noam Chomsky to propose something quite radical in the late 1950s. He argued that the human brain comes equipped with an innate capacity for language—almost a built-in template for how grammar works. Children, in this view, aren't blank slates passively absorbing speech. They're born ready to acquire language, and their environment simply triggers and shapes a capacity that's already there.

Now, there's another striking piece of the puzzle—the idea of a critical period. The evidence suggests there's a window, roughly in early childhood, during which the brain is exceptionally good at acquiring language. If a child is exposed to language during this window, acquisition happens almost effortlessly. But if, tragically, a child is deprived of any language exposure until after this period, they often never achieve full, native-like fluency, no matter how much instruction they receive later. This strongly suggests that our capacity for language isn't open-ended—it's tied to a particular stage of brain development.

So to pull this together: the picture that's emerged is that language acquisition isn't just imitation, and it isn't just instruction. Children come to the task with a powerful, possibly innate ability, and they actively work out the rules of their language during a special early window of development. And that, frankly, is far more impressive than mere copying.`,
      questions: [
        {
          id: "l4q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "How adults can teach grammar rules to young children",
            "How children acquire language and why imitation alone cannot explain it",
            "The differences between human and animal communication",
            "Why some languages are harder to learn than others",
          ],
          correct: 1,
          explanation: "The professor explores how children acquire language and argues that imitation and reward cannot fully account for it.",
        },
        {
          id: "l4q2", qtype: "Detail",
          prompt: "According to the professor, what was the older, dominant explanation for language acquisition?",
          choices: [
            "Children are born with a built-in grammar template.",
            "Children learn language through imitation and reward.",
            "Children acquire language only through formal schooling.",
            "Children invent entirely new languages of their own.",
          ],
          correct: 1,
          explanation: "The earlier view was that children learn language \"essentially through imitation and reward.\"",
        },
        {
          id: "l4q3", qtype: "Function",
          prompt: "Why does the professor mention a child saying \"I goed\" or \"two foots\"?",
          choices: [
            "To show that children make these errors because of poor instruction",
            "To provide evidence that children construct rules rather than merely imitate adults",
            "To argue that children should be corrected immediately",
            "To prove that imitation is the main way children learn",
          ],
          correct: 1,
          explanation: "These \"overregularization\" errors are sentences no adult says, showing the child is applying a self-discovered rule — actively constructing grammar, not imitating.",
        },
        {
          id: "l4q4", qtype: "Detail",
          prompt: "What did Noam Chomsky propose about language?",
          choices: [
            "That children learn language entirely from their environment",
            "That the human brain has an innate, built-in capacity for language",
            "That language can be acquired equally well at any age",
            "That imitation is sufficient to explain grammar",
          ],
          correct: 1,
          explanation: "Chomsky argued that \"the human brain comes equipped with an innate capacity for language—almost a built-in template for how grammar works.\"",
        },
        {
          id: "l4q5", qtype: "Detail",
          prompt: "According to the lecture, what is the \"critical period\"?",
          choices: [
            "The age at which children first begin to imitate adults",
            "An early window during which the brain is especially good at acquiring language",
            "The point at which children stop making grammar errors",
            "The time required to memorize thousands of words",
          ],
          correct: 1,
          explanation: "The critical period is \"a window, roughly in early childhood, during which the brain is exceptionally good at acquiring language.\"",
        },
        {
          id: "l4q6", qtype: "Inference",
          prompt: "What can be inferred about a child deprived of language exposure until after the critical period?",
          choices: [
            "They will acquire language faster once they begin instruction.",
            "They often fail to reach full native-like fluency despite later instruction.",
            "They will naturally invent a complete grammar on their own.",
            "They will only be able to learn written language.",
          ],
          correct: 1,
          explanation: "The professor says such a child \"often never achieve[s] full, native-like fluency, no matter how much instruction they receive later.\"",
        },
      ],
    },
    {
      id: "l5",
      title: "Lecture: Ancient Greek Architecture (Art History)",
      kind: "lecture",
      transcript:
`Narrator: Listen to part of a lecture in an art history class.

Professor: Today we're going to look at ancient Greek architecture, and in particular at the temple, because the Greek temple is really the showcase for everything the Greeks valued in building—order, proportion, balance, and a kind of calm dignity. And the most famous example, of course, is the Parthenon, which still stands on the Acropolis in Athens after nearly twenty-five hundred years.

Now, when most people picture a Greek temple, the first thing they think of is the columns. And rightly so. The columns are not just structural supports; they're the heart of the building's visual identity. In fact, the Greeks developed distinct styles of columns, which we call orders, and I want to focus on the two earliest and most important: the Doric and the Ionic.

Let's start with the Doric order. The Doric is the oldest, and its character is, well, sturdy and plain. Think of it as the strong, silent type. A Doric column is relatively thick and heavy in proportion, it has no base—it sits directly on the platform of the temple—and the top of the column, the part we call the capital, is very simple, just a plain rounded cushion of stone. The overall impression is one of strength and solemn simplicity. The Parthenon itself is Doric, which is partly why it feels so powerful and serious.

The Ionic order, by contrast, is more slender and decorative. An Ionic column is taller and thinner relative to its width, it sits on a carved base, and—this is the easiest way to tell them apart—its capital features two elegant spiral scrolls, called volutes, that curl down on either side like a ram's horns or a rolled-up scroll. If the Doric is the strong, silent type, the Ionic is more graceful and refined. You'll often find the Ionic order on smaller, more ornamental temples.

Now here's something I really want you to appreciate, because it shows just how sophisticated these builders were. The Greeks understood that the human eye plays tricks on us. A perfectly straight horizontal line, on a large building, will actually appear to sag in the middle to a viewer standing in front of it. And a tall column with perfectly straight sides can look as though it's pinched or caving inward. So what did the Greeks do? They built in subtle corrections. The columns of the Parthenon actually bulge ever so slightly in the middle—a refinement called entasis—so that they look perfectly straight to the eye. And the platform of the temple is not flat; it curves upward very gently toward the center, to counteract that illusion of sagging.

And here's the remarkable part—these adjustments are so subtle that you would never notice them just by looking. They're measured in mere centimeters across the whole building. The Greeks weren't doing this for decoration. They were doing it so that the temple would appear flawlessly straight and harmonious—correcting reality to satisfy perception. To me, that's the essence of Greek architecture: not just building something, but building it so that it looks exactly right to the human eye. That marriage of mathematics and beauty is what they passed down to every age that followed.`,
      questions: [
        {
          id: "l5q1", qtype: "Gist-Content",
          prompt: "What is the lecture mainly about?",
          choices: [
            "The history of the city of Athens",
            "The features of Greek temples, including the column orders and visual refinements",
            "How the Parthenon was damaged over the centuries",
            "The religious ceremonies held inside Greek temples",
          ],
          correct: 1,
          explanation: "The professor discusses the Greek temple, focusing on the Doric and Ionic orders and the subtle optical corrections the builders used.",
        },
        {
          id: "l5q2", qtype: "Detail",
          prompt: "According to the professor, what is a characteristic of the Doric order?",
          choices: [
            "It is slender and sits on a carved base.",
            "Its capital features two spiral scrolls.",
            "It is thick and plain, with no base and a simple capital.",
            "It is found only on small, ornamental temples.",
          ],
          correct: 2,
          explanation: "The Doric column is \"relatively thick and heavy,\" \"has no base,\" and has a \"very simple\" capital — sturdy and plain.",
        },
        {
          id: "l5q3", qtype: "Detail",
          prompt: "What feature most easily distinguishes the Ionic order from the Doric?",
          choices: [
            "Its capital has two spiral scrolls, called volutes.",
            "It sits directly on the temple platform with no base.",
            "It is shorter and thicker than the Doric column.",
            "It is always made of a different kind of stone.",
          ],
          correct: 0,
          explanation: "The professor says the easiest way to tell them apart is the Ionic capital's \"two elegant spiral scrolls, called volutes.\"",
        },
        {
          id: "l5q4", qtype: "Detail",
          prompt: "What is \"entasis,\" as described in the lecture?",
          choices: [
            "A decorative carving placed at the top of a column",
            "A slight bulge in the middle of a column so it looks straight",
            "The flat platform on which a temple is built",
            "A type of spiral scroll on the Ionic capital",
          ],
          correct: 1,
          explanation: "Entasis is the refinement by which the columns \"bulge ever so slightly in the middle... so that they look perfectly straight to the eye.\"",
        },
        {
          id: "l5q5", qtype: "Organization",
          prompt: "Why does the professor explain that a straight horizontal line can appear to sag?",
          choices: [
            "To criticize the Greeks for making errors in construction",
            "To explain why the Greeks curved the temple platform upward toward the center",
            "To show that Greek temples were poorly designed",
            "To argue that columns should always be perfectly straight",
          ],
          correct: 1,
          explanation: "He describes the optical illusion of sagging to explain the Greek correction: gently curving the platform upward toward the center to counteract it.",
        },
        {
          id: "l5q6", qtype: "Attitude",
          prompt: "What is the professor's attitude toward the Greek builders' optical refinements?",
          choices: [
            "He finds them unnecessary and overly complicated.",
            "He admires them as a sophisticated marriage of mathematics and beauty.",
            "He is skeptical that they actually existed.",
            "He believes they made the temples look worse.",
          ],
          correct: 1,
          explanation: "He calls the refinements the \"essence of Greek architecture\" and admires the \"marriage of mathematics and beauty\" they reveal.",
        },
      ],
    },
  ],

  // ── SPEAKING (4 tasks · real TOEFL timing) ─────────────────────────────────
  speaking: [
    {
      id: "s1", n: 1, type: "independent",
      prompt: "Some people believe that students should be required to do volunteer work in their community in order to graduate. Do you agree or disagree with this requirement? Use specific reasons and examples to support your answer.",
      prepSec: 15, respSec: 45,
      tip: "Task 1 (Independent): 15s prep, 45s speak. State whether you agree or disagree in the first sentence, then give two reasons with one concrete example each. Depth beats breadth — don't try to say everything.",
    },
    {
      id: "s2", n: 2, type: "integrated",
      readingText:
        "Reading (45 sec): Campus Announcement — Beginning next month, the university will launch a bike-sharing program. Bicycles will be available at stations across campus, and students can rent one with their ID card and return it to any station. The university says the program will reduce traffic congestion on campus roads and give students a healthy, low-cost way to get to class.\n\n[Then you hear two students discussing the announcement. The woman supports the plan.]",
      prompt: "The woman expresses her opinion about the announcement. State her opinion and explain the reasons she gives for holding it.",
      prepSec: 30, respSec: 60,
      tip: "Task 2 (Integrated · read + listen): 30s prep, 60s speak. Briefly state what the announcement is, then report the woman's opinion and her TWO reasons using reported speech: \"She thinks… because…\". Don't give your own opinion.",
    },
    {
      id: "s3", n: 3, type: "integrated",
      readingText:
        "Reading (45 sec): A psychology textbook defines the 'halo effect' — the tendency for our overall impression of a person to influence how we judge their specific traits. If we view someone positively in one respect, such as appearance, we tend to assume they have other positive qualities, like intelligence or kindness, even without evidence.\n\n[Then you hear a professor give an example from a study on how this affects judgments.]",
      prompt: "Using the example from the lecture, explain the concept of the halo effect.",
      prepSec: 30, respSec: 60,
      tip: "Task 3 (Integrated · academic): 30s prep, 60s speak. Define the term in your own words first, then use the lecture's example to illustrate it. Structure: concept → example → why it matters.",
    },
    {
      id: "s4", n: 4, type: "integrated",
      readingText:
        "[Listen only — no reading.] A professor explains the two main types of galaxies. Spiral galaxies have a flat, rotating disk with curving arms and contain large amounts of gas and dust, which lets them keep forming new stars. Elliptical galaxies are smooth, rounded collections of mostly older stars, with little gas and dust, so they form few new stars. The lecture contrasts the two using familiar examples.",
      prompt: "Using the points and examples from the lecture, explain the two main types of galaxies and how they differ.",
      prepSec: 20, respSec: 60,
      tip: "Task 4 (Integrated · lecture only): 20s prep, 60s speak. Summarize the general topic, then describe BOTH types from the lecture and contrast them (spiral vs. elliptical) on shape, gas/dust, and star formation.",
    },
  ],

  // ── WRITING (2 tasks · real TOEFL timing) ──────────────────────────────────
  writing: [
    {
      id: "w1", n: 1, type: "integrated",
      readingText:
`Reading (3 min): Some city planners argue that a city should build many more bike lanes on its streets. Supporters make three claims in favor of doing so:

1. Bike lanes will reduce traffic congestion by encouraging more people to cycle instead of drive.
2. Bike lanes will improve public safety by physically separating cyclists from car traffic.
3. Building bike lanes is an inexpensive way for the city to improve transportation.

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

Professor: Many universities are rethinking how they assess students. Some argue that traditional final exams should be replaced by project-based assessment, in which students complete an extended project instead of sitting a timed test. In your opinion, should final exams be replaced by project-based assessment? Why or why not?

Ava (classmate): I think projects are far better. They let students apply what they've learned to real problems, and they reduce the stress of cramming for one high-pressure test.

Mason (classmate): I disagree — final exams make sure students truly understand the material on their own, and projects can be unfairly affected by group members who don't contribute.`,
      prompt: "Write a response that clearly states your opinion, supports it with reasons and a specific example, and engages with at least one classmate's point.",
      timeSec: 10 * 60,
      targetWords: "at least 100 words",
      tip: "Academic Discussion: 10 min, at least 100 words. State your position in sentence one, briefly engage a classmate by name (agree/disagree), then give ONE developed reason with a specific example. A clear, well-supported opinion scores higher than a long, vague one.",
    },
  ],
};
