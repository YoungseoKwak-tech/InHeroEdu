/**
 * Core Notes ENGLISH version — IB ESS Unit 1 (1.1–1.3).
 * Faithful translation of ib-ess-u1.ts (Korean) with identical structure.
 * All lessonId / courseId / subjectLabel / emoji / unit / lessonNum preserved.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ESS_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-ess-u1-l1",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 1,
    lessonNum: 1,
    unitName: "Foundations of ESS",
    title: "Environmental Value Systems — How Do We See Nature?",
    subtitle: "Why the three axes of the EVS spectrum are the starting point of every environmental debate",
    overview:
      "The reason people clash so fiercely over environmental issues isn't simply disagreement — it's a collision of worldviews. An Environmental Value System (EVS) maps the spectrum from viewing nature as a tool for human use, to seeing it as a partner, to regarding it as inherently sacred. Understanding this spectrum first is essential for analysing any environmental policy debate that follows.",
    objectives: [
      "Compare the three major EVS perspectives (anthropocentrism, biocentrism, ecocentrism) and explain the core assumptions of each",
      "Position a specific environmental policy case on the EVS spectrum and justify the placement with reasoned argument",
      "Reflect on how your own EVS influences the way you engage with ESS content and respond to assessment questions",
      "Analyse, using real examples, why different EVS positions lead to opposing conclusions from the same data",
    ],
    sections: [
      {
        title: "The EVS Spectrum: From Anthropocentrism to Ecocentrism",
        subtitle: "How worldview defines the frame around an environmental problem",
        terms: [
          {
            term: "Environmental value system (EVS)",
            def: "The set of values and attitudes held by an individual or society toward the environment and its resources. An EVS shapes how environmental problems are perceived and which solutions are preferred.",
          },
          {
            term: "Anthropocentrism",
            def: "The view that human needs and interests should be central to environmental decision-making. Nature is valued primarily as a resource for human purposes. Sits at one end of the EVS spectrum.",
          },
          {
            term: "Biocentrism",
            def: "The view that all living organisms have intrinsic value equal to that of humans. Humans are members of the community of life and hold no special status above other species.",
          },
          {
            term: "Ecocentrism",
            def: "The view that entire ecosystems — biotic and abiotic components alike — possess intrinsic value. Conservation of ecosystem processes and functions takes priority over individual species populations. Sits at the opposite end of the EVS spectrum from anthropocentrism.",
          },
        ],
        traps: [
          "A common IB Paper 1 trap is conflating biocentrism with ecocentrism. Biocentrism focuses on the value of individual living organisms; ecocentrism recognises the intrinsic value of the entire ecosystem. For example, euthanising a diseased wolf to ensure food supply for the rest of the pack is an ecocentric decision that conflicts with a biocentric one. Whenever an EVS question appears, first ask: is this about individual life or the ecosystem as a whole?",
          "In extended-response questions, EVS is a matter of differing premises, not right versus wrong. You must describe the internal logic of each perspective neutrally, without endorsing or criticising any particular EVS, to earn full marks.",
        ],
        example:
          "Let's analyse the Amazon rainforest development debate through the EVS spectrum. A Brazilian agricultural official with an anthropocentric view argues that forest clearance contributes to food security and economic growth. An animal-rights activist with a biocentric view emphasises the survival rights of individual endangered species threatened by deforestation. An ecologist with an ecocentric view argues that the Amazon performs global carbon cycling and climate regulation functions, and so the ecosystem itself must be preserved. All three people look at the same data yet reach different conclusions — because their EVS differs.",
      },
      {
        title: "EVS and Sustainability",
        subtitle: "How worldview produces different definitions of sustainable development strategy",
        terms: [
          {
            term: "Weak sustainability",
            def: "The position that natural capital can be substituted by manufactured capital, so resource depletion can be offset by technological innovation. Associated with an anthropocentric EVS.",
          },
          {
            term: "Strong sustainability",
            def: "The position that natural capital is irreplaceable and must be maintained in its own right. Ecosystem services and biodiversity cannot be traded off against manufactured capital. Associated with ecocentric and biocentric EVS.",
          },
          {
            term: "Intrinsic value",
            def: "The value something possesses in and of itself, independent of any human use. Biocentrism and ecocentrism recognise the intrinsic value of nature, whereas anthropocentrism prioritises instrumental value.",
          },
        ],
        traps: [
          "When discussing sustainability in IB ESS assessments, you must explicitly distinguish between weak and strong sustainability. Writing only 'sustainable development' earns partial credit at best. Link your answer concretely to the EVS starting point: the same renewable-energy policy can appear a 'sufficient solution' under an anthropocentric (weak sustainability) framing, yet look like 'mere tinkering' under an ecocentric (strong sustainability) framing.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-ess-u1-l2",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 1,
    lessonNum: 2,
    unitName: "Foundations of ESS",
    title: "Systems and Models — Simplifying a Complex World",
    subtitle: "Distinguishing open, closed, and isolated systems, and the power of the systems approach",
    overview:
      "Trying to understand the entire planet in one go feels overwhelming. The systems approach is the tool that breaks that complexity into manageable chunks. The moment you draw a boundary around what counts as 'the system', the flows of energy and matter become visible. Follow along to see why distinguishing an open system from a closed one is the key to understanding Earth's energy balance.",
    objectives: [
      "Define open, closed, and isolated systems in terms of energy and matter exchange, and apply these definitions to real environmental examples",
      "Distinguish between transfer and transformation, and give examples of each in the flow of energy and matter within ecosystems",
      "Use systems diagrams (stores, flows, and process symbols) to model simple environmental systems",
      "Apply the understanding that all models are simplifications with limitations to the evaluation of a specific environmental model",
      "Identify positive and negative feedback loops and predict their effects on system stability",
    ],
    sections: [
      {
        title: "Types of Systems: The Boundary Determines Everything",
        subtitle: "Classifying systems by whether energy and matter can cross their boundaries",
        terms: [
          {
            term: "Open system",
            def: "A system in which both energy and matter can cross the boundary. Most ecosystems are open systems. Example: a tropical rainforest receives sunlight (energy input) and releases water vapour (matter output).",
          },
          {
            term: "Closed system",
            def: "A system that exchanges energy but not matter across its boundary. The Earth as a whole exchanges negligible matter with outer space while receiving solar energy and re-radiating heat, so it is treated as an approximately closed system.",
          },
          {
            term: "Isolated system",
            def: "An idealised system in which neither energy nor matter is exchanged with the surroundings. A perfectly isolated system does not exist in nature, but the concept is used as an approximation in laboratory contexts such as insulated-container experiments.",
          },
          {
            term: "Store / stock",
            def: "A component within a system where matter or energy accumulates. Represented as a rectangular box in systems diagrams. Examples include soil carbon, tree biomass, and lake water.",
          },
        ],
        traps: [
          "IB ESS exams frequently ask 'What type of system is the Earth?' Do not categorise Earth as a fully closed system without qualification. The precise answer is: 'Earth exchanges energy (incoming solar radiation and outgoing terrestrial radiation) with its surroundings, but matter exchange is negligible, so it can be modelled as an approximately closed system.' Omitting qualifiers such as 'approximately' or 'as a model' can cost marks.",
        ],
        example:
          "Let's model the carbon cycle as a systems diagram. Stores include atmospheric CO₂, dissolved oceanic carbon, plant biomass, soil organic matter, and fossil fuels. Flows include photosynthesis (atmosphere → plants), respiration (plants/animals/soil → atmosphere), fossil fuel combustion (fossil fuels → atmosphere), and oceanic uptake (atmosphere → ocean). This single diagram makes it immediately clear that human acceleration of the fossil fuel combustion flow is increasing the size of the atmospheric CO₂ store.",
      },
      {
        title: "Transfer vs. Transformation: Two Types of Flow",
        subtitle: "How matter and energy move and change within a system",
        terms: [
          {
            term: "Transfer",
            def: "A process in which matter or energy moves from one store to another without changing its form or nature. Examples: river water flowing from a lake to the sea; dead organic material moving to decomposers.",
          },
          {
            term: "Transformation",
            def: "A process in which the form or nature of energy or matter changes. Examples: light energy converted to chemical energy during photosynthesis; chemical energy converted to heat energy during respiration.",
          },
          {
            term: "Flow / flux",
            def: "The quantity of matter or energy moving between stores per unit time. Represented by arrows in systems diagrams; the rate of flow determines whether a store grows, shrinks, or remains stable.",
          },
        ],
        traps: [
          "Confusing transfer and transformation is a common error in ESS extended-response answers. When a herbivore eats grass, the organic carbon undergoes transfer (it moves from the grass store to the herbivore store), but when the herbivore uses cellular respiration to release energy, a transformation occurs (chemical energy → kinetic energy + heat). A single biological process can involve both transfer and transformation simultaneously, so always address 'what moved?' and 'did the form change?' as separate points.",
        ],
        example: null,
      },
      {
        title: "The Power and Limits of Models",
        subtitle: "Without simplification there is no understanding — but simplification has a cost",
        terms: [
          {
            term: "Model",
            def: "A simplified representation of a complex real-world system, used to understand how the system operates and to make predictions. Models can take conceptual, numerical, or physical forms.",
          },
          {
            term: "System boundary",
            def: "The dividing line between the system being analysed and the external environment. Where the boundary is drawn determines which components are internal to the system and which are treated as external drivers or disturbances.",
          },
        ],
        traps: [
          "When evaluating a model, do not conclude that 'simple = bad.' Every model is intentionally simplified, and that simplification is precisely what makes understanding and communication possible. What IB rewards is a balanced discussion of what the model includes and what it excludes, and therefore in which contexts it is useful and in which contexts it may mislead.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-ess-u1-l3",
    courseId: "ib-ess",
    subjectLabel: "IB ESS",
    emoji: "🌱",
    unit: 1,
    lessonNum: 3,
    unitName: "Foundations of ESS",
    title: "Feedback Loops and Sustainability — How Systems Regulate Themselves",
    subtitle: "Why positive feedback is the accelerator of climate crisis, and why negative feedback is the ecosystem's safety mechanism",
    overview:
      "Why does the Arctic, once it starts warming, melt ever faster? Why does a rise in herbivore numbers eventually lead to fewer plants and then fewer herbivores? The answer in both cases is feedback loops. Identifying the direction of a feedback loop lets you predict whether a system will move toward stability or runaway change. Sustainability, at its core, is about keeping negative feedback in charge.",
    objectives: [
      "Distinguish between negative and positive feedback loops and explain the effect of each on system stability",
      "Trace feedback loops in real climate and ecological examples and predict their outcomes",
      "Evaluate how the systems approach contributes to the design of sustainable solutions to environmental problems",
      "Apply the concept of sustainability — framed as system equilibrium (inputs = outputs) — to specific policy examples",
    ],
    sections: [
      {
        title: "Negative Feedback: The System's Self-Correcting Mechanism",
        subtitle: "When change suppresses further change, the system stabilises",
        terms: [
          {
            term: "Negative feedback",
            def: "A process in which a system's output returns to counteract its input, reducing the original change and returning the system toward equilibrium. It is the stabilising mechanism that maintains homeostasis. Example: predator population increases → prey population decreases → less food for predators → predator population decreases.",
          },
          {
            term: "Homeostasis",
            def: "The property by which a system maintains a relatively constant internal state through negative feedback mechanisms. In ecosystems, negative feedback loops keep population sizes near the carrying capacity (K).",
          },
          {
            term: "Carrying capacity (K)",
            def: "The maximum population size of a given species that a particular environment can sustain indefinitely, given the available resources. Negative feedback loops regulate population size toward this limit.",
          },
          {
            term: "Steady state / equilibrium",
            def: "The condition in which inputs and outputs to a system are balanced, so the size of stores remains constant over time. It is the typical outcome of a system governed by negative feedback.",
          },
        ],
        traps: [
          "Many students misread 'negative' feedback as something harmful or bad. In IB ESS, negative feedback is the stabilising mechanism that keeps ecosystems healthy. 'Negative' refers only to the direction of the feedback — it opposes the original change. Writing that negative feedback is 'harmful' will lose marks. Always state explicitly that negative feedback returns the system toward equilibrium.",
        ],
        example:
          "Let's analyse wolf–deer population dynamics using negative feedback. When the deer population rises, food becomes abundant for wolves, so the wolf population also rises. As wolves increase, the predation rate on deer rises, and the deer population falls. Fewer deer means less food for wolves, so the wolf population then declines. This cycle repeats, causing both populations to oscillate while remaining within a long-term range. This is how negative feedback maintains ecosystem stability.",
      },
      {
        title: "Positive Feedback: The Accelerator Toward a Tipping Point",
        subtitle: "When change amplifies further change, the system races toward a new state",
        terms: [
          {
            term: "Positive feedback",
            def: "A process in which a system's output reinforces further change in the same direction. It amplifies the original change, driving the system rapidly toward a new state or making it unstable. Example: global warming → Arctic ice loss → reduced albedo → further warming.",
          },
          {
            term: "Ice-albedo feedback",
            def: "A positive feedback loop in which warming melts ice, exposing darker ocean or land surfaces that absorb more solar energy, which causes further warming and further melting. It is one of the key amplifying mechanisms in climate change.",
          },
          {
            term: "Tipping point",
            def: "The threshold at which a system shifts abruptly into a new state from which it is difficult or impossible to return. When positive feedback becomes dominant, the system can cross a tipping point and undergo irreversible change.",
          },
          {
            term: "Methane release feedback",
            def: "A positive feedback loop in which warming thaws permafrost, releasing methane (CH₄) from frozen organic matter. Because methane is a potent greenhouse gas, its release drives additional warming.",
          },
        ],
        traps: [
          "Do not conflate 'positive' feedback with 'beneficial.' 'Positive' means only that the feedback acts in the same direction as the original change. In the context of climate change, positive feedback almost always amplifies instability and risk. Writing that positive feedback is 'beneficial' is incorrect. Also note that positive feedback does not mean immediate catastrophe; linking it to the concept of tipping points will strengthen the quality of your answer.",
        ],
        example: null,
      },
      {
        title: "Sustainability and System Equilibrium",
        subtitle: "Sustainability means maintaining a system in which inputs and outputs are balanced",
        terms: [
          {
            term: "Sustainability",
            def: "Using resources in a way that meets the needs of the present generation without compromising the ability of future generations to meet their own needs. In systems terms, it is the state in which the rate of input does not fall below the rate of output or consumption.",
          },
          {
            term: "Natural capital",
            def: "The stock of resources and services provided by ecosystems to humans and other organisms. It includes soil, fresh water, biodiversity, and atmospheric composition. Sustainable use does not diminish this capital stock.",
          },
          {
            term: "Ecosystem services",
            def: "The benefits that healthy ecosystems provide to human society free of charge. These include food provision, water purification, carbon sequestration, pollination, and cultural or spiritual value.",
          },
        ],
        traps: [
          "In IB ESS, describing sustainability purely as 'protecting the environment' earns only partial credit. Sustainability is a concept with three pillars — social, economic, and environmental — held in balance. When using systems language, define it as: 'the state in which the rate of renewable resource use does not exceed the rate of renewal, non-renewable resources are replaced by renewable alternatives, and the rate of waste generation does not exceed the capacity of natural systems to absorb it.' This framing consistently achieves full marks.",
        ],
        example:
          "Let's analyse sustainable fisheries through the lens of system equilibrium. Treating the fish population as a store, the input flow is natural reproduction and the output flows are harvesting and natural mortality. If the harvest rate consistently exceeds the reproduction rate, the store (the population) declines and eventually collapses — this is exactly what happened in the Grand Banks cod fishery collapse. Sustainable fishing means keeping the harvest below the Maximum Sustainable Yield so that the store size remains constant. This solution cannot be derived without systems equilibrium thinking.",
      },
    ],
  },
];
