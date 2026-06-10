/**
 * Core Notes English version — IB Psychology Unit 2 (Cognitive Approach).
 * Full content preserved (objectives · terms · traps · examples) with fluent exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PSYCHOLOGY_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-psychology-u2-l1",
    courseId: "ib-psychology",
    subjectLabel: "IB Psychology",
    emoji: "🧠",
    unit: 2,
    lessonNum: 1,
    unitName: "Cognitive Approach",
    title: "Models of Memory: How Is Information Stored and Retrieved?",
    subtitle:
      "How the Multi-Store Model and the Working Memory Model explain the structure and capacity limits of memory",
    overview:
      "The central question of the cognitive approach is this: where and how is information stored in our minds? Atkinson and Shiffrin's Multi-Store Model (MSM) describes memory as a sequential flow from sensory memory → short-term memory → long-term memory, while Baddeley and Hitch's Working Memory Model (WMM) revealed that short-term memory is in fact an active working space made up of several sub-systems. Comparing the evidence and limitations of both models resolves roughly half of the IB cognitive unit.",
    objectives: [
      "Compare and explain the characteristics (capacity, duration, and encoding) of the three stores in the Multi-Store Model (MSM): sensory memory, short-term memory, and long-term memory",
      "Describe the roles of the four components of the Working Memory Model (WMM): the central executive, the phonological loop, the visuospatial sketchpad, and the episodic buffer",
      "Evaluate Glanzer & Cunitz's (1966) serial position effect study and the case of HM as evidence for the MSM",
      "Compare the strengths and limitations of the MSM and WMM, and discuss how the two models are mutually complementary",
      "Critically examine the problem of ecological validity in laboratory-based memory research",
    ],
    sections: [
      {
        title: "The Multi-Store Model: Three Layers of Memory",
        subtitle:
          "The linear flow from sensory memory to short-term memory to long-term memory, and the characteristics of each store",
        terms: [
          {
            term: "Multi-Store Model (MSM)",
            def: "A model of memory proposed by Atkinson & Shiffrin (1968). Information travels sequentially through sensory memory (brief duration, large capacity) → short-term memory (approximately 15–30 seconds, 7±2 chunks) → long-term memory (unlimited capacity, indefinite duration). Rehearsal facilitates the transfer from STM to LTM.",
          },
          {
            term: "Short-term memory (STM)",
            def: "A temporary store with a capacity of approximately 7±2 items (Miller, 1956) and a duration of about 15–30 seconds. It primarily uses acoustic (phonological) encoding and information is rapidly forgotten without rehearsal.",
          },
          {
            term: "Long-term memory (LTM)",
            def: "A permanent store with virtually unlimited capacity and indefinite duration. Information is primarily encoded semantically and can be divided into declarative memory (explicit) and procedural memory (implicit).",
          },
          {
            term: "Serial position effect",
            def: "The phenomenon in which items at the beginning (primacy effect) and end (recency effect) of a list are recalled better than items from the middle. In the MSM, the primacy effect is explained by transfer to LTM, while the recency effect reflects items still present in STM.",
          },
        ],
        traps: [
          "In IB exams, writing that 'information always moves from short-term memory to long-term memory' when introducing the MSM will cost you marks. Although the MSM assumes a linear flow, transfer does not occur without attention and rehearsal, and some researchers argue that certain information may be processed without passing through STM. When describing the model, always mention the role of control processes (rehearsal and attention).",
          "Do not confuse the recency effect with the primacy effect. The recency effect refers to items at the end of a list — information still held in STM. Using a delayed recall task eliminates the recency effect but preserves the primacy effect; this manipulation is key MSM evidence that STM and LTM are separate stores. You must explain this operational distinction accurately.",
        ],
        example:
          "Glanzer & Cunitz (1966) serial position effect experiment: Participants were shown a list of words and asked for immediate free recall. Words from the beginning (primacy effect) and end (recency effect) of the list were recalled significantly better than those from the middle. The critical condition was delayed recall (after a 30-second distractor task), which eliminated the recency effect but left the primacy effect intact. This result is strong MSM evidence that STM and LTM are structurally separate stores. However, questions remain about the ecological validity of laboratory word-list tasks as representations of everyday memory.",
      },
      {
        title: "The Working Memory Model: Short-Term Memory Is Not a Single Store",
        subtitle:
          "Baddeley & Hitch's multi-component working memory system and dual-task experimental evidence",
        terms: [
          {
            term: "Working Memory Model (WMM)",
            def: "An elaborated model of short-term memory proposed by Baddeley & Hitch (1974). Rather than treating STM as a single store, the WMM divides it into four components: the central executive, the phonological loop, the visuospatial sketchpad, and the episodic buffer (added in 2000).",
          },
          {
            term: "Central executive",
            def: "The supervisory system in the WMM that coordinates attention, allocates tasks to the slave sub-systems (phonological loop and visuospatial sketchpad), and oversees the exchange of information with long-term memory. It has limited capacity and handles non-automatic cognitive tasks.",
          },
          {
            term: "Phonological loop",
            def: "A sub-system that temporarily maintains language-based information. It consists of the phonological store (an auditory trace lasting approximately 2 seconds) and the articulatory rehearsal process. Its existence is supported by the word-length effect and the phonological similarity effect.",
          },
          {
            term: "Visuospatial sketchpad",
            def: "A sub-system that temporarily processes and manipulates visual and spatial information. It is involved in mental image rotation, spatial navigation, and visual pattern memory, and operates independently of the phonological loop.",
          },
        ],
        traps: [
          "An answer that introduces the WMM but omits the episodic buffer is structurally incomplete. Added in 2000, this component integrates information from the phonological loop, visuospatial sketchpad, and long-term memory to create multi-modal representations. When an HL question asks for the full structure of the WMM, you must describe all four components.",
          "When using dual-task experiments as evidence for the WMM, you must specify why the two tasks use the same sub-system. Performing two tasks that rely on the same sub-system simultaneously (e.g., two verbal tasks → phonological loop) causes interference; performing tasks that use different sub-systems (verbal + spatial) causes little interference. Failing to explain this principle reduces your answer to a simple list of facts.",
        ],
        example:
          "Baddeley et al. (1975) word-length effect study: Participants were asked to remember lists of short words (e.g., sum, wit) and long words (e.g., opportunity, aluminium). Immediate recall was significantly higher for short-word lists than long-word lists, and this effect disappeared under articulatory suppression (continuously vocalising an irrelevant sound). Conclusion: STM uses a phonological loop whose capacity is limited by the time it takes to articulate words — direct evidence for the WMM. The MSM's simple '7±2 chunks' explanation cannot predict this effect.",
      },
      {
        title: "Evaluating and Integrating the Two Models",
        subtitle:
          "Comparing the strengths and limitations of the MSM and WMM, and validating both models with neuroscientific and clinical evidence",
        terms: [
          {
            term: "Ecological validity",
            def: "The extent to which research findings apply to everyday memory tasks outside the laboratory. Because most evidence for the MSM and WMM comes from controlled laboratory studies, there are questions about how well they explain the complex memory demands of real life (e.g., narrative comprehension, episodic memory).",
          },
          {
            term: "Double dissociation",
            def: "A pattern in which patient A shows impairment on function X but intact function Y, while patient B shows impairment on function Y but intact function X. This pattern strongly supports the claim that X and Y are neurologically independent systems. The cases of KF (impaired STM, intact LTM) and HM (unable to form new LTM, intact STM) are the classic MSM double-dissociation evidence.",
          },
          {
            term: "KF case study",
            def: "A patient whose STM was severely impaired following a motorcycle accident while LTM remained normal; his immediate memory span for verbal stimuli dropped to 1–2 items. This case provides double-dissociation evidence that STM and LTM can operate independently within the MSM, and is also interpreted as evidence for phonological loop damage within the WMM.",
          },
          {
            term: "Reductionism",
            def: "The tendency in cognitive psychology to explain complex memory processes by decomposing them into units such as stores or components. This approach strengthens the clarity and testability of models but has been criticised for treating memory as isolated from social, emotional, and cultural contexts.",
          },
        ],
        traps: [
          "Simply writing 'too simplistic' when discussing the limitations of the MSM will cost you marks. There are three specific criticisms: (1) the MSM treats STM as a single passive store, but the WMM demonstrated that it is an active multi-component system; (2) rehearsal is depicted as the only route from STM to LTM, yet levels-of-processing theory shows that semantic elaboration is equally critical; (3) the MSM treats LTM as overly unitary, failing to account for the distinctions among episodic, semantic, and procedural memory. Write at least one of these with supporting evidence.",
        ],
        example:
          "The case of HM (Milner, 1957 onwards) — integrated evaluation of MSM and WMM: Following hippocampal resection, HM could no longer form new declarative memories (episodic or semantic), yet his immediate STM span (digit span of 6) was normal and he was able to learn procedural skills (mirror-drawing). From the MSM perspective, this demonstrates a double dissociation between preserved STM and impaired LTM formation. From the WMM perspective, it shows that the central executive and phonological loop (immediate processing, preserved) are separate from the LTM consolidation system. Although generalisation is limited because this is a single case study, HM provides the strongest neuropsychological evidence for both models and must be cited in IB essays.",
      },
    ],
  },
  {
    lessonId: "ib-psychology-u2-l2",
    courseId: "ib-psychology",
    subjectLabel: "IB Psychology",
    emoji: "🧠",
    unit: 2,
    lessonNum: 2,
    unitName: "Cognitive Approach",
    title: "Schema Theory and Reconstructive Memory: Memory Is Not a Recording",
    subtitle:
      "How schemas distort the encoding, storage, and retrieval of new information, and why eyewitness memory cannot be trusted",
    overview:
      "The common-sense belief that memory stores facts like a video recording is wrong. Bartlett showed that memory is not a replay of the past but a reconstruction in the present, and Loftus demonstrated experimentally how a single question can contaminate a witness's memory. Schema theory and reconstructive memory research reveal why cognitive psychology matters in courtrooms, education, and clinical settings — making them a core topic of the unit.",
    objectives: [
      "Define the concept of schema and explain how schemas influence the encoding, storage, and retrieval of new information",
      "Evaluate Bartlett's (1932) 'War of the Ghosts' study as evidence for the reconstructive nature of memory",
      "Describe Loftus & Palmer's (1974) misinformation effect study and discuss its implications for the reliability of eyewitness testimony",
      "Connect schema theory to the explanation of stereotypes, prejudice, and cultural differences",
      "Critically evaluate ethical issues in memory reconstruction research (deception and the potential harm of memory manipulation)",
    ],
    sections: [
      {
        title: "Schema Theory: Knowledge Frameworks Shape Memory",
        subtitle:
          "How existing knowledge structures (schemas) actively distort the interpretation, storage, and retrieval of new information",
        terms: [
          {
            term: "Schema",
            def: "An organised mental framework of pre-existing knowledge about the world. Schemas guide the interpretation of new information and shape expectations, influencing memory encoding, storage, and retrieval. First systematised by Bartlett (1932); information that does not fit an existing schema tends to be distorted or omitted.",
          },
          {
            term: "Reconstructive memory",
            def: "The process by which memory is not a simple replay of stored information but is actively constructed (reconstructed) at the time of retrieval using prior knowledge, expectations, and current context. Errors, distortions, deletions, and additions arise during this process.",
          },
          {
            term: "Assimilation",
            def: "The process of interpreting or transforming new information to fit an existing schema. For example, a person who holds a schema that tomatoes are vegetables may delete or distort fruit-related information when recalling a story about tomatoes.",
          },
          {
            term: "Rationalization",
            def: "The process of filling in gaps during retrieval to make a memory more logical and coherent with schema-based or cultural expectations. In Bartlett's 'War of the Ghosts' study, participants substituting unfamiliar cultural elements with familiar equivalents is the classic example.",
          },
        ],
        traps: [
          "Describing schemas simply as 'prejudices' or 'stereotypes' will cost you marks. Schemas take many forms — event schemas (scripts, e.g., knowing you receive a menu when you enter a restaurant), self-schemas, social schemas, and role schemas — and they also serve an adaptive function by allowing efficient cognitive processing. If a question asks you to evaluate the effects of schemas, an answer that only lists distortion and bias as limitations without addressing the strength of cognitive efficiency is not a balanced response.",
          "When introducing Bartlett's research you must acknowledge its methodological limitations. Bartlett conducted his study informally without standardised procedures and did not quantify changes systematically. By modern standards it lacks scientific rigour. However, pairing this criticism with the point that many subsequent experimental studies have replicated similar reconstructive effects (convergent validity) produces a balanced evaluation.",
        ],
        example:
          "Bartlett (1932) 'War of the Ghosts' study: British participants read a Native American folk tale and were asked to recall it repeatedly over time. With each successive recall, participants replaced unfamiliar cultural elements (canoes, spirits) with familiar British cultural equivalents, and shortened the story to make it more logical and coherent. Bartlett interpreted this as evidence of schema-driven rationalization and reconstruction. Limitations include the absence of a control condition and the lack of systematic measurement of individual memory differences; however, the study's theoretical contribution in being the first to systematise the active, constructive nature of memory is substantial.",
      },
      {
        title: "The Misinformation Effect and Eyewitness Testimony: Questions Change Memory",
        subtitle:
          "How post-event misinformation (questions and suggestions) contaminates a witness's original memory",
        terms: [
          {
            term: "Misinformation effect",
            def: "A phenomenon in which incorrect information provided after an event is integrated with the original memory, distorting it. Loftus & Palmer's (1974) 'collision speed' study, which showed that a leading question can alter speed estimates, is the classic demonstration.",
          },
          {
            term: "Leading question",
            def: "A question whose wording or presupposition guides the respondent toward a particular answer. 'How fast were the cars going when they smashed into each other?' produces higher speed estimates and greater false memory of broken glass than 'How fast were the cars going when they contacted each other?'",
          },
          {
            term: "Memory contamination",
            def: "The process by which new information encountered after witnessing an event (news reports, statements from other witnesses, police questioning) is integrated into the original memory trace, altering it. This is a key concept illustrating the clinical and legal implications of reconstructive memory.",
          },
          {
            term: "Post-event information effect",
            def: "The modification of event memory by information provided after the event. Two competing accounts are the 'trace replacement theory' (the original memory trace is overwritten by new information) and the 'retrieval competition theory' (both memories coexist but the misinformation is selected at retrieval).",
          },
        ],
        traps: [
          "Failing to distinguish between the two experiments within Loftus & Palmer's study will cost you marks. Experiment 1 demonstrated differences in speed estimates across five verbs (smashed, collided, bumped, hit, contacted). Experiment 2 showed in a one-week follow-up that the 'smashed' group was significantly more likely to falsely report having seen broken glass (which did not appear in the video). Experiment 2 is the stronger evidence for the misinformation effect as a genuine change in memory, so describe both experiments separately.",
          "Do not over-generalise the misinformation effect into the conclusion that 'memory is always inaccurate.' The magnitude of the misinformation effect varies with the strength of the suggestion, the time elapsed, and individual differences. In the absence of misinformation, or for events involving intense emotional experience, memory can be considerably more stable. When an IB question asks about the limitations of the misinformation effect, mention these moderating variables.",
        ],
        example:
          "Loftus & Palmer (1974) car collision speed estimation study: 45 American students watched videos of car collisions and were then asked a question using one of five verbs: smashed, collided, bumped, hit, or contacted. The mean speed estimate for the 'smashed' condition was approximately 40.8 mph, compared to approximately 31.8 mph for the 'contacted' condition — a significant difference. In a one-week follow-up (Experiment 2), 32% of the 'smashed' group reported seeing broken glass, even though no broken glass appeared in the video. This study demonstrates the danger that leading questions pose to the fairness of justice in police interrogations and courtroom testimony, and provided the foundation for reforms in child-witness interviewing practices.",
      },
    ],
  },
  {
    lessonId: "ib-psychology-u2-l3",
    courseId: "ib-psychology",
    subjectLabel: "IB Psychology",
    emoji: "🧠",
    unit: 2,
    lessonNum: 3,
    unitName: "Cognitive Approach",
    title: "Thinking, Decision-Making, Emotion and Memory: Cognition Is Not Cold",
    subtitle:
      "The two systems of dual process theory, cognitive biases, and how emotion changes the reliability of memory through flashbulb memories",
    overview:
      "How rational is our thinking? Kahneman argues that humans judge the world using two processing systems — a fast, automatic System 1 and a slow, analytical System 2. Because we rely on System 1 in most situations, we make predictable and systematic biases and errors. Meanwhile, Brown & Kulik's flashbulb memory research shows how strong emotion can (sometimes illussorily) enhance the vividness and apparent accuracy of memory. Grasping these two threads completes the final puzzle of Unit 2.",
    objectives: [
      "Compare and explain the characteristics of System 1 and System 2 in dual process theory",
      "Define major cognitive biases — including the availability heuristic, representativeness heuristic, and anchoring effect — and apply them to real-world decision-making errors",
      "Describe Brown & Kulik's (1977) flashbulb memory study and explain how flashbulb memories differ from ordinary memories",
      "Link the effect of emotional arousal on memory encoding and retrieval to neurobiological mechanisms (the amygdala)",
      "Critically evaluate the reliability of cognitive processes by citing evidence that the vividness of flashbulb memories does not guarantee accuracy",
    ],
    sections: [
      {
        title: "Dual Process Theory: A Brain That Thinks in Two Systems",
        subtitle:
          "The characteristics of System 1 (fast and automatic) and System 2 (slow and analytical), and the origins of cognitive bias",
        terms: [
          {
            term: "Dual process theory",
            def: "A cognitive model popularised by Kahneman (2011). System 1 is fast, automatic, unconscious, and relies on intuition; System 2 is slow, deliberate, conscious, and handles effortful analytical processing. Most everyday judgements are processed by System 1.",
          },
          {
            term: "Availability heuristic",
            def: "A cognitive shortcut in which probability is estimated on the basis of how easily an example comes to mind (availability) rather than on the actual frequency or probability of the event. The tendency to overestimate the danger of plane crashes relative to car crashes because plane crashes are more easily recalled is a classic example.",
          },
          {
            term: "Representativeness heuristic",
            def: "A cognitive shortcut in which the probability that a person or event belongs to a category is judged by how closely it resembles a typical member of that category. The higher the perceived typicality, the more likely people are to assign category membership regardless of actual base rates (base-rate neglect).",
          },
          {
            term: "Anchoring effect",
            def: "A cognitive bias in which the first number or piece of information presented (the anchor) exerts a disproportionate influence on subsequent judgements or estimates. The influence of an initial asking price on the final agreed price in property negotiations is a typical example.",
          },
        ],
        traps: [
          "Describing System 1 simply as the 'bad' processing system in an IB exam will cost you marks. System 1 functions quickly, efficiently, and adaptively in most situations — threat-avoidance responses and the intuitive judgements of experts are prime examples. Although cognitive biases originate mainly in System 1, System 2 is not always more accurate either. Avoid simple comparisons about which system is 'better' and instead show the nuance that the two systems interact depending on context.",
          "Merely listing the names of cognitive biases without further development will not reach the upper mark bands. You must link each bias to the experimental evidence supporting it and to the consequences it produces in real-world contexts (medical diagnosis, legal judgement, economic decision-making). Citing Tversky & Kahneman's experimental studies specifically (e.g., the Linda problem, the Asian disease problem) strengthens the explanatory power of your answer considerably.",
        ],
        example:
          "Tversky & Kahneman (1983) Linda problem (conjunction fallacy): Participants read a description of Linda — a 31-year-old single woman who had studied philosophy, was concerned about social justice, and had participated in anti-nuclear demonstrations — and were asked whether it was more probable that 'Linda is a bank teller' or that 'Linda is a feminist bank teller.' 85% chose the feminist bank teller option, which is logically impossible: the conjunction of two events (A and B) cannot be more probable than either event alone (A). This result is core evidence for the representativeness heuristic — and for dual process theory more broadly — demonstrating that typicality-based reasoning can override logical probability judgements.",
      },
      {
        title: "Emotion and Memory: Flashbulb Memories and the Role of the Amygdala",
        subtitle:
          "The special trace left by intensely emotional events — is vividness the same as accuracy?",
        terms: [
          {
            term: "Flashbulb memory",
            def: "A concept coined by Brown & Kulik (1977) referring to the phenomenon in which the circumstances surrounding a shocking or emotionally intense event (e.g., the assassination of JFK, the 9/11 attacks) — where you were, what you were doing, who you were with — are remembered with photographic vividness and detail.",
          },
          {
            term: "Amygdala",
            def: "A limbic-system structure that plays a central role in emotional processing, particularly in detecting and responding to threatening stimuli. When an emotionally arousing event occurs, the amygdala enhances hippocampal consolidation of long-term memory (amygdala–hippocampus interaction), facilitating the formation of flashbulb memories.",
          },
          {
            term: "Emotional arousal",
            def: "A state of physiological and psychological activation triggered by an emotional event. Moderate levels of emotional arousal enhance memory encoding and consolidation (the Yerkes–Dodson inverted-U curve), but extremely high arousal can actually increase memory distortion.",
          },
          {
            term: "Memory consolidation",
            def: "The process by which a newly encoded memory becomes stabilised into durable long-term memory over time. Sleep and hippocampal–neocortical reactivation are central to consolidation, and emotional arousal strengthens this process via the amygdala.",
          },
        ],
        traps: [
          "Stating that flashbulb memories are 'accurate memories' is one of the most common serious errors in IB answers. Brown & Kulik claimed that flashbulb memories are reported vividly and with confidence, but Neisser & Harsch's (1992) Challenger space shuttle study showed that flashbulb memories become substantially inaccurate over time despite their subjective vividness. Always write the distinction: vividness ≠ accuracy.",
          "When addressing what a consistent comparison standard looks like in flashbulb memory research, you must raise the methodological point that a control condition comparing memory for ordinary events is needed. Brown & Kulik's study lacked a clear comparison baseline and could not independently verify the accuracy of recall. Failing to note this methodological limitation will prevent you from reaching the upper mark bands.",
        ],
        example:
          "Brown & Kulik (1977) flashbulb memory study: 40 White American and 40 Black American participants were asked how they had heard about ten surprising events, including the assassination of President Kennedy. Over 90% of participants vividly remembered the circumstances in which they heard about the Kennedy assassination; Black participants also showed particularly vivid memories for the assassinations of Black leaders (Malcolm X, Martin Luther King Jr.). Brown & Kulik proposed that intense emotional shock triggers a 'Now Print!' mechanism that creates a special memory trace. However, Talarico & Rubin's (2003) 9/11 study subsequently showed that although flashbulb memories are more vivid and held with greater confidence than ordinary memories, their actual accuracy of detail declines over time at a similar rate to ordinary memories — emotion heightens confidence in a memory but does not necessarily guarantee its accuracy.",
      },
      {
        title: "The Reliability of Cognitive Processes: An Integrated Evaluation",
        subtitle:
          "Why cognitive processes produce systematic errors, and how those implications play out in real life",
        terms: [
          {
            term: "Reliability of cognitive processes",
            def: "The question of how accurately and consistently cognitive processes such as memory, thinking, and perception represent external reality. This is the central theme of the IB cognitive unit: schema theory, the misinformation effect, flashbulb memory, and cognitive bias research all demonstrate limits on cognitive reliability.",
          },
          {
            term: "Cognitive economy",
            def: "The tendency for the human brain to rely on schemas, heuristics, and automatic processing (System 1) in order to use cognitive resources efficiently. This is adaptive, but it is also the source of systematic bias and memory distortion.",
          },
          {
            term: "Metacognition",
            def: "The capacity to monitor and regulate one's own cognitive processes — thinking, memory, and comprehension. Asking oneself 'Am I genuinely remembering this, or am I filling it in by inference?' is an example of metacognition. It is facilitated by the engagement of System 2.",
          },
          {
            term: "Confirmation bias",
            def: "The cognitive tendency to selectively attend to and remember information that confirms existing beliefs or expectations, while ignoring or reinterpreting disconfirming information. It is closely linked to schema operation and contributes to diagnostic errors, political polarisation, and the maintenance of stereotypes.",
          },
        ],
        traps: [
          "The sweeping conclusion that 'cognitive processes cannot be trusted' is an answer type that IB examiners penalise. The correct position is a balanced evaluation: cognitive processes produce systematic errors under specific conditions (high emotional arousal, exposure to misinformation, certain decision-making contexts), but they function sufficiently efficiently and adaptively for most everyday tasks. Mentioning individual differences (expertise, metacognitive ability) and the possibility of intervention (systematic decision-making training) will place your answer in the upper mark bands.",
          "In a Unit 2 synthesis essay, merely listing multiple studies amounts to simple knowledge description. The upper mark bands require analysis and synthesis that shows the connections among studies. For example: 'Loftus's misinformation effect experimentally validated Bartlett's principle of reconstructive memory, and combining these two lines of research with Brown & Kulik's flashbulb memory work shows that emotion can both reduce reconstruction errors and simultaneously foster overconfidence in vividness.' Integrate in this way.",
        ],
        example:
          "Neisser & Harsch (1992) Challenger space shuttle flashbulb memory study: The day after the Challenger explosion in 1986, participants recorded how they had heard the news. When asked the same question 2.5 years later, their accounts were compared to their original records: 25% showed complete inconsistency with their initial account and 50% showed partial inconsistency. Crucially, participants expressed very high confidence in their (incorrect) recollections — the more vividly they felt they remembered, the less their accuracy was guaranteed. This study integrates the misinformation effect (Loftus), reconstructive memory (Bartlett), and dual process theory (System 1 overconfidence) into a single body of evidence, making it highly important for discussing the limits of cognitive reliability in legal and clinical contexts.",
      },
    ],
  },
];
