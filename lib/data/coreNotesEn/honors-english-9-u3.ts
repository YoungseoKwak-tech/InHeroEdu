/**
 * Core Notes English version — Honors English 9 Unit 3 (Drama & the Novel).
 * Faithful English rendering of the Korean source; full content preserved
 * (objectives · terms · traps · examples) with fluent, exam-accurate phrasing.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ENGLISH_9_U3_EN: CoreNote[] = [
  {
    lessonId: "honors-english-9-u3-l1",
    courseId: "honors-english-9",
    subjectLabel: "Honors English 9",
    emoji: "📖",
    unit: 3,
    lessonNum: 1,
    unitName: "Drama & the Novel",
    title: "Dissecting Shakespeare — Dramatic Structure and Stage Language",
    subtitle:
      "Devices born on a stage 400 years ago appear on your exam this very moment.",
    overview:
      "Everyone is bewildered the first time they read Shakespeare. Archaic language, verse dialogue, a five-act structure — it all feels strange and difficult. But the reason Shakespeare has survived for over 400 years is that he mastered the art of amplifying humanity's most universal emotions — love, jealousy, ambition, fear — to the maximum within the confined space of a stage. When we read Romeo and Juliet in Honors English 9, we do not merely follow the plot; we decode the dramatic devices Shakespeare uses. Once you fully absorb soliloquy, aside, and dramatic irony, you begin to see how precisely engineered every line is. The moment an actor on stage is not muttering to himself but sharing a secret with the audience — that is the core language of Shakespearean drama.",
    objectives: [
      "Define the five acts of dramatic structure — exposition, rising action, climax, falling action, denouement — and identify each in Romeo and Juliet",
      "Explain the difference between soliloquy and aside and analyse the information asymmetry each creates between audience and characters",
      "Analyse, with specific scenes, how dramatic irony amplifies tension and tragic effect",
      "Recognise Shakespeare's distinctive linguistic conventions — blank verse, sonnet-form dialogue, puns — and explain their dramatic function",
      "Analyse with textual evidence how stage language reveals a character's personality, status, and emotional state",
    ],
    sections: [
      {
        title: "Dramatic Structure and Shakespearean Stage Conventions",
        subtitle:
          "The five-act structure is not a mere frame — it is a map for designing a play's emotional swells",
        terms: [
          {
            term: "Dramatic structure",
            def: "The way events in a drama are arranged and developed. Shakespearean tragedy follows the classical five-act structure — exposition (introducing setting and characters), rising action (deepening conflict), climax (turning point), falling action (chain of consequences), and denouement/catastrophe (final resolution). In Romeo and Juliet, the climax is Romeo's killing of Tybalt (Act 3, Scene 1), after which everything becomes irreversible.",
          },
          {
            term: "Soliloquy",
            def: "A device in which a character, alone on stage, speaks aloud to reveal inner thoughts, emotions, and conflicts directly to the audience. Other characters cannot hear it. The soliloquy acts as the play's narrator, disclosing truth to the audience alone. Juliet's 'What's in a name? That which we call a rose / By any other name would smell as sweet' is her most honest emotion delivered through soliloquy.",
          },
          {
            term: "Aside",
            def: "A brief remark a character delivers to the audience alone, unheard by other characters on stage. Shorter than a soliloquy, it is usually used while other characters are present. An aside reveals the gap between a character's true intentions and their public statements on stage — and this becomes the basis of dramatic irony.",
          },
          {
            term: "Blank verse",
            def: "The metrical form mainly used by noble characters in Shakespearean drama. It is written in iambic pentameter (the iamb, da-DUM, repeated five times per line, totalling ten syllables) but without rhyme. Lower-class characters speak in prose, while heightened emotion or sonnet scenes use rhyming couplets. The very form of the language is a code marking a character's status and emotion.",
          },
        ],
        traps: [
          "Many students confuse soliloquy and aside. The key distinction: a soliloquy is delivered at length while a character is alone on stage; an aside is a brief remark to the audience alone while other characters are present. On exams, when asked whether a scene is a soliloquy or an aside, first check 'are other characters on stage?'",
          "In dramatic structure it is easy to mistake the climax for 'the most exciting or moving moment,' but at Honors level the climax is precisely 'the turning point — the moment when the situation shifts irreversibly for or against the protagonist.' The most moving scene in Romeo and Juliet is the death scene, but the climax is the killing of Tybalt that made it all possible.",
        ],
        example:
          "Let's dissect Shakespeare's stage language in Act 2, Scene 2 — the balcony scene. Juliet's 'O Romeo, Romeo! Wherefore art thou Romeo?' is a soliloquy spoken alone on stage, disclosing to the audience alone Juliet's true conflict (her recognition that the family name is the obstacle to love). 'Wherefore' is an archaism meaning 'why,' not 'where' — Juliet is not asking where Romeo is but lamenting why he must be a Montague. At the same time the scene is written in blank verse (iambic pentameter), so the metrical form itself expresses Juliet's noble status and serious emotion. After this soliloquy, when the two begin to converse, the audience already knows Juliet's true feelings — this is the seed of dramatic irony.",
      },
      {
        title: "Dramatic Irony — Tension Created by a Secret Only the Audience Knows",
        subtitle:
          "When the reader knows more than the characters, tragedy hurts twice as much",
        terms: [
          {
            term: "Dramatic irony",
            def: "Irony arising from a gap in knowledge — the audience (reader) knows what the characters do not. This information asymmetry creates suspense, dread, or tragic sorrow. The most powerful dramatic irony in Romeo and Juliet is in Act 5 — Romeo drinks poison unaware that Juliet is actually alive. Because the audience knows, the pain is multiplied.",
          },
          {
            term: "Foreshadowing",
            def: "The arrangement of language, imagery, or events that hints at what is to come. In Shakespearean tragedy, foreshadowing often comes from the characters' own mouths — when Romeo says in Act 2 that his joy is 'too rash, too unadvised, too sudden, / Too like the lightning,' it foreshadows how quickly the relationship will end.",
          },
          {
            term: "Tragic flaw / Hamartia",
            def: "A fatal weakness or error in a tragic hero that ultimately leads to their ruin — the concept Aristotle named hamartia. Romeo's tragic flaw is impulsiveness; his tendency to act before thinking leads to the killing of Tybalt and his immediate suicide beside Juliet. The tragic flaw generates the tragedy from within the hero, not from external evil.",
          },
        ],
        traps: [
          "Do not confuse dramatic irony with verbal irony (saying the opposite of what one means). Dramatic irony arises from information asymmetry — a situation in which the audience knows more than the characters. For example, when Romeo weeps before Juliet's tomb believing she is dead, the dread the audience feels — knowing she is alive — is dramatic irony. Distinguish it from a character's sarcastic remark.",
        ],
        example:
          "Look at how the tomb scene in Act 5 fuses all three devices. The dramatic irony is that the audience knows Juliet has taken a sleeping potion and is alive, while Romeo, seeing her, believes her dead and drinks poison — so every line of his grief lands twice as hard on a viewer who knows the truth. This catastrophe is also foreshadowed earlier by Romeo's own words that his love feels 'too like the lightning,' a hint that his speed will destroy him. Finally it enacts his hamartia: his impulsiveness, the same flaw that killed Tybalt, makes him swallow the poison seconds before Juliet wakes. Reading these devices together shows the tragedy is engineered from within the hero, not imposed by outside evil.",
      },
    ],
  },
  {
    lessonId: "honors-english-9-u3-l2",
    courseId: "honors-english-9",
    subjectLabel: "Honors English 9",
    emoji: "📖",
    unit: 3,
    lessonNum: 2,
    unitName: "Drama & the Novel",
    title: "Anatomy of the Novel — Narrative Structure, Character Development, Motif, and Allegory",
    subtitle:
      "A novel is not a story but an architecture that constructs meaning.",
    overview:
      "Unlike drama, a novel builds a world across hundreds of pages. In a short story you could focus on one or two scenes, but reading a full-length novel at Honors level demands a different skill — the ability to track the seeds of meaning a writer has planted across hundreds of pages without losing them. Motif is the language of those seeds. Recurring images, colours, and symbols may at first look like mere description, but when they converge on a single thematic meaning across the whole story, the novel transforms from 'a long, thick story' into 'a precisely designed architecture of meaning.' Allegory is a layer deeper — when every element of the novel tells a second story behind the surface one. In Honors English 9 we train to read novels through these two lenses.",
    objectives: [
      "Apply the components of the narrative arc — exposition, rising action, climax, falling action, resolution — to specific scenes, and explain similarities and differences with dramatic structure",
      "Distinguish the two axes of character development — round vs. flat, dynamic vs. static — and support with textual evidence",
      "Track a motif across a novel and analyse how it connects to the work's central theme",
      "Explain the concept of allegory and read a novel's surface narrative and underlying symbolic meaning simultaneously",
      "Analyse how point of view affects the reader's access to information and empathy for characters",
    ],
    sections: [
      {
        title: "Narrative Structure and Character Development",
        subtitle:
          "A story is not events happening but a character changing",
        terms: [
          {
            term: "Narrative arc",
            def: "The way plot is structured across a whole novel: exposition (introducing world, characters, conflict) → rising action (complicating conflict) → climax (turning point) → falling action → resolution/denouement. A novel may have more than one arc — a protagonist's external and internal conflicts can each carry a separate arc.",
          },
          {
            term: "Dynamic / static character",
            def: "A dynamic character undergoes significant inner change — in values, beliefs, or personality — over the story; a static character remains essentially unchanged throughout. What matters is the quality of the change — not merely a shift in circumstance but a change in the character's inner self. Separately, a round character is complex and many-sided, while a flat character is defined by a single trait.",
          },
          {
            term: "Point of view",
            def: "The choice of whose eyes and voice tell the story. The major types are first person (the narrator appears as 'I,' subjective and limited), third-person limited ('he/she' but with access to only one character's inner life), and third-person omniscient (access to all characters' inner lives). The choice of point of view is the writer's key strategy for determining what the reader can know and whom they empathise with.",
          },
          {
            term: "Types of conflict",
            def: "The sources of tension that drive the plot. External conflict: character vs. character, character vs. society, character vs. nature, character vs. technology. Internal conflict: character vs. self — a moral dilemma or clash of desires within the character. At Honors level you must analyse how external conflict reflects or triggers internal conflict.",
          },
        ],
        traps: [
          "Confusing dynamic and round characters is extremely common. They lie on different axes. Dynamic/static is about whether the character changes; round/flat is about whether the character is complex. A round but static character (complex yet unchanging) and a dynamic but flat character (changing yet simple) both exist. Exams will ask you to distinguish them.",
          "In point-of-view analysis, labelling 'this is first person' is identification, not analysis. At Honors level you must analyse 'how the first-person point of view makes the reader share the narrator's bias or limits of knowledge, and how that affects the reader's judgement of particular characters.'",
        ],
        example:
          "Consider works typically found in an Honors 9 novel curriculum. In F. Scott Fitzgerald's The Great Gatsby, the narrator Nick Carraway tells the story in first person. The effect of this choice: the reader sees only the Gatsby reflected in Nick's eyes, so Gatsby's true motives and inner life always remain a mystery. The more Nick romanticises Gatsby, the more the reader shares that romanticised view — and this is the core narrative strategy by which the novel conveys its theme of the illusion of the American Dream. Point of view creates theme.",
      },
      {
        title: "Motif and Allegory — Meaning Beneath the Surface",
        subtitle:
          "There is a reason a writer repeats something — tracking that reason is Honors reading",
        terms: [
          {
            term: "Motif",
            def: "An image, symbol, concept, or linguistic pattern that recurs throughout a work and reinforces thematic meaning. If theme is what a work says, motif is the means by which that theme is repeatedly expressed. Example: the light-and-dark motif in Romeo and Juliet — from Romeo describing Juliet as 'a torch that lights the night' to their meetings always occurring in darkness — expresses the beauty of love and the danger of concealment at once.",
          },
          {
            term: "Allegory",
            def: "A narrative mode in which a deeper symbolic, moral, or political meaning exists behind the literal story. Every character, event, and setting represents something beyond its surface meaning. George Orwell's Animal Farm is the classic case — on the surface a story of farm animals' rebellion, but in fact an allegory of the Soviet Revolution. Reading allegory means tracking 'what this character/event represents in reality' at the same time.",
          },
          {
            term: "Theme",
            def: "The universal, central message a work conveys about human experience. It must be expressed as a complete sentence, not a single word like 'love' or 'freedom' — such as 'in an oppressive society, preserving individual identity is an act of resistance.' Theme is something the reader discovers, not something the writer states directly — plot, character, motif, and symbol build it together.",
          },
        ],
        traps: [
          "Many students confuse motif and theme. A motif is a recurring literary element (image, symbol, pattern); a theme is the central message a work conveys (expressed as a complete sentence). 'Light and dark' is a motif; 'love is beautiful but endangered when its beauty can exist only in darkness' is the theme that motif speaks. Writing only a motif or a word in answer to 'state the theme' loses marks.",
          "Beware forcing allegory onto every novel. Not every novel is an allegory. Allegory must be a deliberately designed double-layered meaning structure — a mere guess that 'this character seems to symbolise this' is not allegorical analysis. A consistent correspondence must be proven across the whole text before you can analyse it as allegory.",
        ],
        example:
          "Let's analyse motif and allegory together in Orwell's Animal Farm. Motif: the gradual alteration of the 'Commandments' — 'four legs good, two legs bad' is slowly distorted as the story proceeds and finally becomes 'four legs good, two legs better.' This motif visually tracks the theme of how ideology is corrupted by power. Allegory: the pig Napoleon = Stalin, Snowball = Trotsky, the farm = Soviet Russia. The surface story (the animals' rebellion) and the allegorical layer (the betrayal of the Soviet Revolution) run in parallel, and the novel's meaning is completed through this double reading.",
      },
    ],
  },
  {
    lessonId: "honors-english-9-u3-l3",
    courseId: "honors-english-9",
    subjectLabel: "Honors English 9",
    emoji: "📖",
    unit: 3,
    lessonNum: 3,
    unitName: "Drama & the Novel",
    title: "Writing the Literary Essay — Thematic Analysis, Evidence Integration, and Synthesis",
    subtitle:
      "A literary essay is not summarising a plot but arguing for a meaning.",
    overview:
      "Now that you know how to read drama and the novel, it is time to convert that reading into an Honors-level literary essay. One crucial premise of the literary essay: plot summary is not an essay. 'Romeo and Juliet fell in love but met a tragic death because of their families' feud' — this is something the reader already knows. A literary essay argues 'why this text was made this way, and what it says about human experience.' Building a strong literary thesis, selecting, integrating, and analysing evidence from the text, and synthesising drama and novel across two texts — these three are the core skills of the Honors English 9 literary essay, assembled step by step in this lesson.",
    objectives: [
      "Explain the difference between a literary essay and an argumentative essay — argumentative topic vs. literary interpretation topic — and write a thesis specialised for textual analysis",
      "Select evidence for thematic analysis from a literary text and analyse it within its literary context using the quotation sandwich",
      "Move beyond single-text analysis to construct an essay that synthesises two or more texts around a shared theme or contrasting approach",
      "Apply the TEAL structure (Topic sentence, Evidence, Analysis, Link) in literary paragraphs and prevent analysis from drifting into listing or summary",
      "Design an argumentative flow across the whole essay that connects authorial intent, literary devices, and thematic significance",
    ],
    sections: [
      {
        title: "The Literary Thesis and the Thematic Analysis Paragraph",
        subtitle:
          "A literary thesis is not stating a correct answer but arguing for an interpretation",
        terms: [
          {
            term: "Literary analysis thesis",
            def: "The central claim of a literary essay — an interpretive argument about how a specific aspect of the text (literary device, character, motif) conveys a specific theme. Structure: [author/text] + [literary device/choice] + [thematic effect/meaning]. Example: 'Shakespeare uses the light-and-dark motif in Romeo and Juliet to build the theme that the beauty of love is inevitably destroyed by the social pressure to conceal it.' This is an arguable interpretation, not a plot summary.",
          },
          {
            term: "TEAL paragraph structure",
            def: "The four-stage structure of a literary analysis paragraph. T (Topic sentence): present the paragraph's literary claim in one sentence. E (Evidence): integrate a quotation, scene, or device via the quotation sandwich. A (Analysis): explain why and how the evidence creates thematic meaning — the writer's deliberate choice and its effect. L (Link): state how the paragraph's analysis supports the essay's overall thesis. The Analysis stage must be the longest and deepest — over half the paragraph should be analysis at Honors level.",
          },
          {
            term: "Authorial choice / intentionality",
            def: "The stance in literary analysis that a writer's choice of specific language, structure, or device is deliberate, not accidental. 'Why did Shakespeare use blank verse instead of prose in this scene?' 'Why did Orwell choose third-person omniscient rather than first person?' Posing these questions is the start of literary analysis. The language of analysis should always be 'the writer achieves/conveys/constructs X through Y.'",
          },
          {
            term: "Thematic significance",
            def: "Analysis of how a specific element (device, scene, character, motif) contributes to the work's overall theme. Not simply 'this scene is sad' but 'how this scene deepens the theme of individual choice and the inevitability of fate.' At Honors level, every analytical paragraph must converge on thematic significance.",
          },
        ],
        traps: [
          "The most common and fatal mistake in a literary essay is filling paragraphs with plot summary. 'Next, Romeo met Tybalt and killed him. This is because Romeo is impulsive' — this is summary plus a plain statement, not analysis. Honors-level analysis must address 'how the writer constructed this scene, what effect that construction has on the reader, and how it connects to the work's theme.'",
          "Beware writing a literary thesis as a fact statement. 'In Romeo and Juliet, the two protagonists meet a tragic end' — this is a fact the text proves, not an interpretive claim. A strong literary thesis must be interpretable and arguable — there must be room for a reader to respond, 'Hmm, one could see it that way, but I interpret it differently.'",
        ],
        example:
          "Let's compare a weak and a strong thesis. Topic: the question of fate vs. personal choice in Romeo and Juliet. Weak thesis: 'In Romeo and Juliet, the two cannot fulfil their love and die.' → plot summary. Strong thesis: 'Through dramatic irony and the recurrence of impulsive choices, Shakespeare argues that the lovers' tragedy is the product not of fate but of failures of personal agency, exploring the problem of free will and responsibility.' → it is interpretable, names textual devices (dramatic irony, the pattern of choices), and connects to a larger thematic meaning (free will and responsibility).",
      },
      {
        title: "Synthesis — Weaving Two Texts into a Larger Claim",
        subtitle:
          "If analysing one text is reading, synthesising two is real criticism",
        terms: [
          {
            term: "Synthesis",
            def: "Connecting shared themes, contrasting perspectives, or complementary ideas across two or more texts to construct a more complex claim that exceeds single-text analysis. A synthesis essay is not alternating 'text A is like this, text B is like that' — it analyses both texts at once to support a single unified claim.",
          },
          {
            term: "Comparative analysis",
            def: "An essay type that analyses similarities and differences between two texts. A form of synthesis, it does not merely list them but analyses what the similarities and differences reveal about each text's thematic meaning. Establishing a clear point of comparison and maintaining it consistently is key.",
          },
          {
            term: "Depth of evidence integration",
            def: "The difference between simply quoting and moving on (surface-level) and analysing the quotation's linguistic choices, structure, and authorial intent (deep-level). Surface: 'Juliet says \"What's in a name?\" This shows she thinks Romeo's name does not matter.' Deep: 'Juliet's rhetorical question \"What's in a name?\" challenges how language constructs social identity, through which Shakespeare critiques a social structure that privileges the signifier of family over an individual's essence.'",
          },
        ],
        traps: [
          "If a synthesis essay separates the two texts into 'blocks' rather than alternating them, it becomes two separate essays rather than a synthesis. Instead of writing all of text A and then all of text B in block structure, use a point-by-point structure that treats both texts at once within each paragraph, developing a single comparative point — only then is it a true synthesis essay.",
        ],
        example:
          "Suppose you synthesise Romeo and Juliet with a modern novel about feuding families. A block-structured, weak version discusses the whole play, then the whole novel, and hopes the reader connects them. A true synthesis builds one unified claim — 'both works argue that inherited hatred, not individual choice, destroys the young' — and develops it point by point: within a single paragraph you set Shakespeare's dramatic irony beside the novel's parallel scene, showing how each author engineers the same tragic inevitability. This point-by-point weave, driven by deep evidence integration that analyses each text's language rather than merely quoting it, is what separates criticism from summary.",
      },
    ],
  },
];
