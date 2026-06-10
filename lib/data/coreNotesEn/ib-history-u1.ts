/**
 * Core Notes English version — IB History Unit 1 (Historical Concepts & Source Analysis).
 * IB DP History core skills: six historical concepts (causation · consequence · change ·
 * continuity · significance · perspective) + OPVL source evaluation (origin · purpose ·
 * value · limitation) + source typology + introduction to historiography.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_HISTORY_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-history-u1-l1",
    courseId: "ib-history",
    subjectLabel: "IB History",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 1,
    unitName: "Historical Concepts & Source Analysis",
    title: "Six Lenses for Reading History",
    subtitle:
      "How causation, consequence, change, continuity, significance, and perspective turn events from memorisation targets into objects of analysis",
    overview:
      "In IB History, memorising dates and events alone will never earn you a 7. What examiners want is the ability to systematically argue why something happened, what changed and what stayed the same, and whose perspective is shaping the account. These six historical concepts form the thinking framework for every essay and source analysis you write. Apply even one of them and your score improves; weave several together and you have the architecture of a Band 6–7 essay.",
    objectives: [
      "Distinguish between causation and consequence, and apply a hierarchy of short-term, long-term, and structural causes to historical arguments",
      "Identify change and continuity simultaneously in order to evaluate whether a given period represents a genuine turning point",
      "Use at least two of the five criteria of historical significance (scale, duration, precedent, contemporary relevance, and period recognition) to argue the importance of an event",
      "Explain how perspective shapes historical interpretation and analyse the limits of relying on a single narrative",
      "Integrate all six concepts to construct an IB essay thesis and select supporting evidence for a line of argument",
    ],
    sections: [
      {
        title: "Causation and Consequence — Layering the 'Why'",
        subtitle: "Every event has seeds, kindling, and a spark",
        terms: [
          {
            term: "Long-term cause",
            def: "Structural conditions that accumulate over decades and create the fertile ground that makes an event almost inevitable. Example: the long-term causes of World War I include Europe's alliance system, imperial rivalry, and rising nationalism. Without those conditions, the Sarajevo assassination could not have escalated into a world war.",
          },
          {
            term: "Short-term cause (trigger)",
            def: "An immediate event that ignites an already volatile situation. It cannot explain the event by itself, but in combination with long-term causes it plays a decisive role. Example: the assassination of Archduke Franz Ferdinand was the short-term cause — the trigger — of World War I.",
          },
          {
            term: "Unintended consequence",
            def: "An outcome that historical actors neither anticipated nor planned for. It is the key device for demonstrating the complexity of consequence in an IB essay. Example: the Treaty of Versailles was intended to end the war, but it produced the unintended consequence of contributing to the rise of Nazism.",
          },
          {
            term: "Structural factor",
            def: "Social, economic, or political conditions that constrain or enable the choices of individual actors. In causal analysis, structural factors form a contrasting analytical level to agent-centred explanations (the role of individuals in history).",
          },
        ],
        traps: [
          "The most common mistake is writing the 'trigger' (short-term cause) as if it were the main cause. Saying only that the Sarajevo assassination 'caused' World War I will lose marks under IB Assessment Criterion A (knowledge and understanding). You must frame it as: 'the trigger ignited pre-existing tensions.' Explicitly naming the hierarchy of causes — long-term, medium-term, short-term — is a Band 5+ requirement.",
          "When narrating consequences, never list only intended outcomes. Distinguishing between intended and unintended consequences, and between short-term and long-term consequences, demonstrates the depth of historical thinking examiners reward.",
        ],
        example:
          "Layered causal analysis in practice — arguing the causes of the Russian Revolution (1917): Present peasant poverty, the political rigidity of the tsarist system, and the unfinished change of the 1905 Revolution as long-term causes; the formation of an urban working class through industrialisation and Lenin's Bolshevik party organisation as medium-term causes; then cite the catastrophic casualties of World War I and the bread riots of the February Revolution as short-term causes (triggers). Layering causation in this way produces the kind of structured argument that earns high marks.",
      },
      {
        title: "Change and Continuity — Pinning Down 'What Shifted'",
        subtitle: "A turning point is something you argue, not something you assume",
        terms: [
          {
            term: "Change",
            def: "An institutional, social, or political transition that occurs between one period and the next. IB requires analysis of the pace (gradual vs. rapid), scope (partial vs. wholesale), and direction (progressive vs. regressive) of change.",
          },
          {
            term: "Continuity",
            def: "Structures, practices, and power relationships that persist even through periods that appear to involve dramatic change. Identifying continuity allows you to measure the real depth of any transformation. Example: after the Glorious Revolution (1688), England's social hierarchy and the political dominance of the landed aristocracy continued unchanged.",
          },
          {
            term: "Turning point",
            def: "An event or period that reversed a previous trend or set a new direction. When arguing for a turning point in an IB essay, compare the 'before' and 'after' states and implicitly suggest what would have been different if the event had not occurred (counterfactual thinking).",
          },
          {
            term: "Counterfactual thinking",
            def: "The technique of imagining 'What if X had not happened?' in order to evaluate the historical significance and causal weight of an event. Rather than stating the counterfactual directly, use it implicitly in the form: 'Without X, Y would have been impossible.'",
          },
        ],
        traps: [
          "An essay that lists only change while ignoring continuity will lose marks under IB Criterion D (analysis and evaluation). For example, writing only 'the Cold War began in 1947 and changed the world entirely' is insufficient. Instead, argue that 'the Cold War was both a continuation of earlier great-power competition and a turning point that introduced the new structure of ideological confrontation' — addressing change and continuity simultaneously.",
        ],
        example: null,
      },
      {
        title: "Historical Significance and Perspective — 'How Important?' and 'Through Whose Eyes?'",
        subtitle: "Significance is not self-evident, and perspective determines interpretation",
        terms: [
          {
            term: "Historical significance",
            def: "Five criteria for judging the importance of an event: (1) scale — how many people were affected; (2) duration — how long the effects lasted; (3) precedent — whether it became a model for later events; (4) contemporary relevance — its connection to the present; (5) period recognition — whether contemporaries considered it significant. Using at least two of these criteria in an argument produces a high-scoring IB response.",
          },
          {
            term: "Perspective",
            def: "The influence that a historical actor's or historian's position, background, and interests have on their interpretation of events. Different perspectives produce entirely different accounts of the same event. Example: the Opium War is 'the protection of free trade' from a British perspective and 'imperialist aggression' from a Chinese perspective.",
          },
          {
            term: "Narrative",
            def: "A meaningful story constructed around historical events from a particular perspective. It is not a neutral list of facts but an interpretation shaped by selection, emphasis, and omission. IB requires you to examine multiple perspectives rather than rely on a single narrative.",
          },
        ],
        traps: [
          "When arguing significance, vague phrases like 'it was very important' or 'it changed the course of history' earn no credit under IB Criterion C. You must name the specific criterion (one or more of the five above) and link it to concrete evidence explaining why the event meets that criterion.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-history-u1-l2",
    courseId: "ib-history",
    subjectLabel: "IB History",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 2,
    unitName: "Historical Concepts & Source Analysis",
    title: "OPVL — Four Scalpels for Dissecting a Source",
    subtitle:
      "How to apply origin, purpose, value, and limitation systematically to score full marks on IB Paper 1 source analysis",
    overview:
      "When IB Paper 1 asks you to analyse a source, the most common student mistake is summarising its content. The examiner already knows what the source says — what they want is an argument about how useful that source is to a historian and why it is also limited. OPVL (Origin, Purpose, Value, Limitation) is the framework for that argument. The high-scoring strategy is not to tick off each element mechanically, but to show how each element explains the next one in a continuous chain.",
    objectives: [
      "Define the four elements of OPVL and explain the role each plays in source evaluation",
      "Analyse the author's background, date of production, and document type from the Origin, then connect them to the Purpose",
      "Distinguish between content-based value and origin-based value when arguing for a source's usefulness",
      "Apply multiple criteria — omission, bias, partisanship, temporal distance — when identifying Limitations",
      "Construct an OPVL analysis as a connected argument (Origin → Purpose → Value → Limitation) and apply it to IB Paper 1 source questions",
    ],
    sections: [
      {
        title: "Origin and Purpose — Who Made It, and Why?",
        subtitle: "The same content carries a different meaning depending on who produced it",
        terms: [
          {
            term: "Origin",
            def: "The creator (individual, institution, or group), the date and place of production, and the document type (diary, speech, photograph, statistics, newspaper article, etc.) of a source. Origin is the starting point for analysing purpose, value, and limitation. Begin by confirming it with the phrase 'This source originates from…'",
          },
          {
            term: "Purpose",
            def: "The intent behind the source: to persuade, inform, propagandise, record, entertain, instruct, and so on. Distinguishing between explicit purpose (evident from the source itself) and implicit purpose (inferred from context) enables a deeper level of evaluation.",
          },
          {
            term: "Primary source",
            def: "A source produced at the same time as the event or period under study. It carries direct evidence of contemporaries' experiences, observations, and records — and therefore of the perspectives and context of the time. Being contemporary does not, however, mean being free of bias.",
          },
          {
            term: "Secondary source",
            def: "A source produced after the events, typically the work of historians, journalists, or analysts. Temporal distance allows for a broader view and the synthesis of diverse evidence, but it cannot convey the lived experience of participants.",
          },
        ],
        traps: [
          "Simply stating 'this is a primary source' when writing about origin and purpose is not OPVL analysis. After identifying the origin, you must connect it: explain how that origin shaped the purpose. Example: 'This source originates from Goebbels, Nazi Minister of Propaganda, who wrote it for a mass rally in 1943 (Origin). Its purpose was therefore to sustain German public support for the war and to conceal the defeat at Stalingrad (Purpose).' That chain is the high-scoring IB pattern.",
        ],
        example:
          "Origin–Purpose connection in practice — analysing President Truman's radio address of 6 August 1945 on the Hiroshima bombing: Origin: an official statement issued by the President of the United States on the very day of the bombing, addressed to the American public and the world. Purpose: to justify the use of the atomic bomb and to establish the narrative of 'retribution for Japan's attack on Pearl Harbor' and 'a swift end to the war.' It also carries the implicit purpose of managing post-hoc public opinion for a military decision already made. Without this connection, origin and purpose remain two separate descriptions rather than one analytical argument.",
      },
      {
        title: "Value and Limitation — How Useful Is It to the Historian?",
        subtitle: "Value and limitation are derived from origin and purpose, not invented separately",
        terms: [
          {
            term: "Value",
            def: "The reason a source is useful to a specific historical enquiry. Analyse it at two levels: (1) content-based value — the information and evidence the source contains (what does it tell us?); (2) origin-based value — the credibility or representativeness conferred by the author, period, or type of source (why is this particular source especially useful?). Addressing both levels earns high marks in IB.",
          },
          {
            term: "Limitation",
            def: "The reason a source restricts the historian's understanding. Four key categories: (1) bias — the influence of the author's interests, ideology, or emotions on the account; (2) incompleteness — perspectives excluded or information omitted; (3) temporal distance — the possibility of distorted memory or post-hoc rationalisation when written long after the event; (4) intended audience — the possibility that truths unsuitable for the target readership have been withheld.",
          },
          {
            term: "Bias",
            def: "The tendency of a source's content to be distorted, selectively presented, or exaggerated in favour of the author's position, interests, or ideology. Bias itself is not a failing — what matters for IB analysis is arguing how the bias specifically limits the source's usefulness. Writing 'this source is biased' without further explanation earns no credit.",
          },
          {
            term: "Propaganda / Partisan nature",
            def: "The character of a source created to advocate for a particular ideology, group, or state. Propagandistic material is a limitation, but it is simultaneously a valuable piece of evidence showing what ideological language was used to persuade the public at a given moment in time.",
          },
        ],
        traps: [
          "Two classic OPVL mistakes: (1) Writing value and limitation independently of origin and purpose — always frame it as 'this source is valuable / limited because of its [origin/purpose].' (2) Treating limitation as meaning 'this source is useless' — a limitation means the source restricts answers to certain historical questions, not that it should be discarded entirely. Value and limitation can actually stem from the same source characteristic: a propaganda document is valuable as evidence of how public opinion was manipulated, while being limited as evidence of objective fact.",
        ],
        example:
          "Value–Limitation connection in practice — using Anne Frank's diary (1942–1944) for Holocaust research: Value: as a primary source recorded directly by a Jewish girl hiding in Nazi-occupied Amsterdam, it conveys the daily terror, psychological pressure, and lived experience of a civilian in hiding with an immediacy unavailable in official documents. The source type (private diary) gives it the special value of revealing personal interiority and ordinary daily life. Limitation: it captures the experience of a single individual and cannot represent all Jews in hiding. There is also the possibility that fear of discovery by the Gestapo led to self-censorship of certain details.",
      },
      {
        title: "Constructing the OPVL Argument — Connection, Not a Checklist",
        subtitle: "O→P→V→L is a single continuous argument, not four sequential boxes to tick",
        terms: [
          {
            term: "OPVL (Origin · Purpose · Value · Limitation)",
            def: "The acronym for Origin, Purpose, Value, and Limitation — the core framework for source analysis in IB History Paper 1. Each element is not an independent item but is causally linked to the others: origin explains purpose, and purpose determines value and limitation.",
          },
          {
            term: "Usefulness to the historian",
            def: "The central question in IB Paper 1 source evaluation questions. The argument must go beyond 'what does this source contain?' to 'how well does it help answer a specific historical question?' Usefulness is always relative to a particular research purpose.",
          },
          {
            term: "Cross-referencing sources",
            def: "The technique of evaluating several sources together to corroborate shared evidence or analyse conflicting accounts. It is essential for high marks on IB Paper 1 Question 4 (the synthesis essay). Contradictions between sources are not errors — they reflect the historical reality of multiple perspectives.",
          },
        ],
        traps: [
          "Mechanically dividing your OPVL into four labelled paragraphs receives a low mark from IB examiners. Examiners do not check whether the four words 'O, P, V, L' appear; they assess the logical connection between each element. The target structure is a single, continuous sentence of argument: 'Because this source originates from [origin], it carries the purpose of [purpose], which makes it [value] for a historian studying [topic], while simultaneously limiting its usefulness because [limitation].'",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-history-u1-l3",
    courseId: "ib-history",
    subjectLabel: "IB History",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 3,
    unitName: "Historical Concepts & Source Analysis",
    title: "Introduction to Historiography — Historians Are Products of History Too",
    subtitle:
      "Understanding that both the people who created sources and the people who wrote history were shaped by their own contexts",
    overview:
      "History is not an objective record of what happened. Historians are influenced by the era, society, and ideology in which they live — and recognising this is the starting point of historiography. In IB History, historiography is not about listing 'this historian thought this'; it is about analysing why interpretive differences arise among historians and arguing what those differences mean for the nature of historical knowledge. Integrating historiographical perspectives in Paper 2 and Paper 3 essays is what makes Band 6–7 scores achievable.",
    objectives: [
      "Define historiography and explain its role in historical writing, and analyse why historians' interpretations change over time",
      "Compare the differences between orthodox, revisionist, and post-revisionist schools by connecting them to specific historical examples",
      "Argue how a historian's temporal context, ideology, and access to sources influence their interpretation",
      "Integrate historiographical debates into IB essay arguments to perform multi-perspective analysis",
      "Construct a balanced position that acknowledges the subjectivity of historical knowledge and the limits of sources, while still defending the validity of evidence-based argument",
    ],
    sections: [
      {
        title: "What Is Historiography? — 'The History of History'",
        subtitle: "Historians are not neutral observers transmitting facts",
        terms: [
          {
            term: "Historiography",
            def: "The history of historical writing — the field that studies the methods, theories, and perspectives historians have used to interpret the past. In IB terms, historiography means analysing how historians have interpreted a given topic differently across different periods.",
          },
          {
            term: "Interpretation",
            def: "The historical explanation a historian constructs by selecting, analysing, and giving meaning to evidence (sources). Different historians can produce different interpretations from the same sources, and those differences arise from their theoretical frameworks, ideologies, and temporal contexts.",
          },
          {
            term: "Revisionism",
            def: "The scholarly tendency to challenge or modify a previously dominant historical interpretation. Revisionism is driven by the discovery of new sources, shifts in theoretical frameworks, and social changes (such as the civil rights movement, feminism, and postcolonialism). Revisionism is not inherently correct or incorrect; it is an indicator that historical interpretation is always in progress.",
          },
          {
            term: "Historian's context",
            def: "The era, nationality, ideology, gender, and available sources that form the background shaping a historian's writing. Understanding this context explains why a Cold War-era American historian and a Soviet historian produced such different accounts of the same events.",
          },
        ],
        traps: [
          "Writing historiography as a list of historians' opinions will never earn high marks in IB. What matters is the 'why' — how a historian's context (their era, ideology, and the sources available to them) influenced their interpretation. 'A. J. P. Taylor argued that Hitler was an opportunist' is not enough; you need to add: 'The Cold War fatigue of the 1960s and the declassification of German documents led Taylor to place Hitler in the same continuum as traditional great-power statesmen.' That is historiographical analysis.",
          "Taking sides in a historiographical debate is not the goal. An IB essay does not judge which interpretation is correct; it analyses the differences between interpretations and evaluates the strengths and weaknesses of each. Simply demonstrating an awareness that a debate exists among historians is itself a Band 6+ requirement.",
        ],
        example:
          "Historiographical integration in practice — the debate on the origins of World War I: Orthodox interpretation: Writing in the atmosphere of the 1919 Paris Peace Conference, most Western historians saw German aggressive expansionism and militarism as the primary cause of the war (the logic behind the 'war guilt clause'). Revisionist interpretation: In the 1960s, German historian Fritz Fischer unearthed internal German documents showing that the German elite had deliberately planned a war for European hegemony — paradoxically reinforcing the orthodox emphasis on German responsibility. Counter-revisionist interpretation: Later historians challenged single-nation responsibility arguments and instead emphasised the mutual interactions of all the great powers and structural factors (the alliance system, the arms race). Integrating this debate into an essay demonstrates an understanding of how historical knowledge is constructed — a hallmark of high-scoring responses.",
      },
      {
        title: "The Spectrum of Historical Schools — Same Event, Different Lenses",
        subtitle: "Understanding structurally how orthodox, revisionist, and post-revisionist interpretations differ",
        terms: [
          {
            term: "Orthodox / Traditional interpretation",
            def: "An interpretation formed largely in the immediate aftermath of events or in the early Cold War period. It tends to identify a specific nation, leader, or ideology as the primary cause or responsible party. It reflects the sources available at the time and the political atmosphere of the era.",
          },
          {
            term: "Revisionist interpretation",
            def: "A historical interpretation that challenges the orthodox account by introducing new sources, theories, or perspectives to revise the existing narrative. It often challenges the 'villain-victim' binary or emphasises structural factors over individual agency.",
          },
          {
            term: "Post-revisionist interpretation",
            def: "An interpretation that examines the arguments of both the orthodox and revisionist schools and then integrates insights from both, or offers a more complex multi-causal analysis. In Cold War historiography, post-revisionism often appears as a shared-responsibility argument that assigns fault to both superpowers.",
          },
          {
            term: "Postcolonial historiography",
            def: "A historiographical movement that restores the perspectives and historical agency of non-Western peoples whose colonial experience was marginalised in European and Western-centric accounts. It retells events from the colonial era from the perspective of both coloniser and colonised.",
          },
        ],
        traps: [
          "Never assume that a revisionist interpretation is automatically 'more accurate' or 'more progressive.' Revisionism also reflects the era and ideology of its authors. For example, Cold War revisionism was heavily influenced by the left-wing Western academic climate of the 1960s and 1970s. Rather than ranking interpretations, analyse 'what sources, methodology, and context produced each interpretation, what aspects it explains well, and where its limits lie.'",
        ],
        example: null,
      },
      {
        title: "Using Historiography in IB Essays",
        subtitle: "Historian + interpretation + context + limitation — all four are required for genuine historiographical integration",
        terms: [
          {
            term: "Thesis",
            def: "One or two sentences encapsulating the central argument of the entire essay. A strong IB thesis answers 'who/what, to what extent, and why' and implies the possibility of a counter-argument. Integrating historiography into the thesis enables a structure such as: 'Historians have long debated X, but the evidence more strongly supports Y.'",
          },
          {
            term: "Historiographical integration",
            def: "The technique of not merely quoting a historian's interpretation in the body of an essay, but analysing the context, strengths, and limitations of that interpretation and connecting it to your own thesis. The structure runs from 'According to Taylor…' to '…however, Taylor's interpretation carries the limitation of [X], and when read alongside [other evidence], [my thesis] is more persuasive.'",
          },
          {
            term: "Provisional nature of historical knowledge",
            def: "The concept that historical knowledge is always subject to revision because it rests on currently available sources and existing interpretations. New source discoveries, methodological advances, and social change can all reconstruct established interpretations. This concept connects directly to IB Theory of Knowledge (TOK).",
          },
        ],
        traps: [
          "Appending a historiography paragraph at the very end of your essay as an afterthought is poor practice. Historiographical arguments must be organically integrated throughout the thesis, the body paragraphs, and the conclusion. Structure the entire essay around 'evaluating which interpretation is best supported by the evidence in this historical debate,' and historiography becomes the skeleton of the argument rather than a decorative addition.",
        ],
        example:
          "Historiographical integration in an essay paragraph — the origins of the Cold War: 'Historians have long debated where greater responsibility for the origins of the Cold War lies. Orthodox historian Herbert Feis identified Soviet expansionist ambitions as the primary cause, but that interpretation was produced under commission from the Truman administration and therefore carried the purpose of justifying American policy. Revisionist historian Gabriel Kolko, by contrast, emphasised American economic expansionism, yet his interpretation was limited by the absence of Soviet archival sources. When Soviet classified documents became available after the Cold War, post-revisionist historians such as John Lewis Gaddis integrated both sides of the responsibility argument while reasserting the importance of Stalin's personal role. This historiographical debate demonstrates that the Cold War must be understood not through a single cause but as a complex interplay of structural, personal, and ideological factors.'",
      },
    ],
  },
];
