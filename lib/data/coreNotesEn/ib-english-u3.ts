/**
 * Core Notes English version — IB English A (Language & Literature) Unit 3.
 * Full content preserved (objectives · terms · traps · example) with fluent exam-accurate English narrative.
 * Literary and rhetorical terms retain standard English terminology throughout.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_ENGLISH_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-english-u3-l1",
    courseId: "ib-english",
    subjectLabel: "IB English A",
    emoji: "📖",
    unit: 3,
    lessonNum: 1,
    unitName: "Intertextuality — Connecting Texts",
    title: "No Text Is an Island — The Concept and Mechanics of Intertextuality",
    subtitle: "Every text is written in the shadow of texts that came before — the author is always in dialogue.",
    overview:
      "The central question of IB English A Unit 3 is this: 'How is this text connected to other texts, and how do those connections transform, expand, or subvert meaning?' Intertextuality describes the ways in which texts speak to one another. Sometimes an author deliberately quotes or alludes to another work; at other times, a genre is itself already a set of conventions accumulated from countless prior texts. Choosing the sonnet form, borrowing the structure of the hero's journey — these are all intertextual acts. This concept matters in IB because the ability to read the network of meanings that texts create together — moving beyond the analysis of a single text in isolation — underpins every assessment, from the Paper 2 comparative essay outward. Begin reading texts not as isolated islands, but as individual voices in an ever-connected conversation.",
    objectives: [
      "Define the concept of intertextuality and identify its specific forms — allusion, parody, pastiche, intertextual subversion — using textual evidence",
      "Analyse how meaning shifts across layers when an author references or transforms another text, examining the relationship between source text and new text",
      "Explain how genre conventions create intertextual expectations, and how an author produces effects by fulfilling or violating those expectations",
      "Discuss why intertextual references are received differently depending on a reader's prior textual experience, connecting this to the context of reception",
      "Explain how to use intertextual connections between two texts as the basis of an argument in an IB Paper 2 comparative essay",
    ],
    sections: [
      {
        title: "Core Concepts of Intertextuality — Dialogue Between Texts",
        subtitle: "A text never speaks alone — it always resonates alongside other voices",
        terms: [
          {
            term: "Intertextuality",
            def: "A concept developed by Roland Barthes and Julia Kristeva: every text is made up of the absorption and transformation of texts that have already been written. A text does not generate new meaning independently; it acquires meaning through its relationships with existing texts. In IB, this relationship is analysed in the form: 'Which specific language, structures, or images reference which other text, and what effect does that reference produce?'",
          },
          {
            term: "Allusion",
            def: "A technique in which a writer makes an indirect reference to another text, myth, historical event, or cultural icon without naming it explicitly. When a reader recognises the source text, the layers of meaning double in effect. If the reader does not recognise the reference, only the surface meaning is available — making allusion a prime example of how a text's meaning varies according to a reader's cultural background.",
          },
          {
            term: "Parody",
            def: "A technique that deliberately imitates the style, form, or conventions of a source text while simultaneously exaggerating or distorting it to create humour, critique, or irony. Parody presupposes deep familiarity with the source text, and the wider the gap between original and imitation, the stronger the effect.",
          },
          {
            term: "Hypertext / Hypotext",
            def: "Concepts from Gérard Genette: the hypotext is the source text being referenced; the hypertext is the new text that transforms or extends it. Example: Homer's Odyssey (hypotext) → James Joyce's Ulysses (hypertext). In IB, articulating this relationship clearly is central to textual analysis.",
          },
        ],
        traps: [
          "If you merely identify an allusion or intertextual reference without explaining what semantic or rhetorical effect it creates within the text, IB examiners will award a low score. 'The author alludes to Shakespeare' is not analysis. Analysis means getting to: 'How does this allusion deepen or subvert the text's central theme X?'",
          "Do not analyse parody as nothing more than a 'humour device.' In IB, parody can be read as a political act that critically dismantles the power, ideology, or conventions of a source text. Use textual evidence to argue whether the purpose of the parody is comedy, subversion, or homage.",
        ],
        example:
          "Consider how intertextuality operates in Margaret Atwood's The Handmaid's Tale (1985). The title and frame narrative allude to Chaucer's The Canterbury Tales. Where Chaucer's text is a democratic narrative in which many voices freely exchange stories, Atwood's 'tale' depicts a totalitarian society in which only a single, suppressed voice exists. This contrast is the effect of the allusion — by referencing the open, communal storytelling space of the source text, Atwood paradoxically emphasises how completely that space has been eradicated. The intertextual gap between the two texts is what generates the theme.",
      },
      {
        title: "Genre Conventions and Transformation — You Must Know the Rules to Break Them",
        subtitle: "Genre is a contract between reader and writer — meaning is born the moment that contract is broken",
        terms: [
          {
            term: "Genre conventions",
            def: "The collective set of structural, stylistic, and thematic expectations that define a particular genre. Examples include the mystery-to-solution structure of detective fiction, the fourteen-line form of the sonnet, and the pattern of the tragic hero's downfall. These conventions are themselves intertextual — readers bring prior genre experience to every new text.",
          },
          {
            term: "Generic transformation / Subversion",
            def: "The deliberate twisting or violation of a genre's conventions by the author. The moment an expectation is met and then suddenly broken, the reader's attention sharpens and the violation produces meaning. In IB, the analysis focuses on which conventions are transformed and how, and what critical, philosophical, or aesthetic effects that transformation creates.",
          },
          {
            term: "Pastiche",
            def: "A technique of deliberately imitating the style of a particular author, period, or genre. Unlike parody, pastiche tends to reproduce its source as homage or tribute rather than from a position of critical distance. In postmodern fiction, pastiche is frequently deployed as a metacritical tool that calls the very concept of originality into question.",
          },
        ],
        traps: [
          "Listing genre conventions and checking whether a text follows them like a checklist is not IB analysis. What IB demands is the connection between convention and meaning: 'How does this text's use or violation of this genre convention produce a particular meaning, effect, or critique?' Convention alone is never the endpoint.",
        ],
        example:
          "Compare John Keats's 'Ode to a Nightingale' (1819) and Anne Carson's Autobiography of Red (1998) from the perspective of genre convention and transformation. Keats's ode faithfully follows the conventions of the English Romantic ode — a ten-line stanza structure built on iambic pentameter, the emotion of the sublime — to explore the tension between mortality and an ideal world. Carson equally borrows the conventions of ode and epic — a narrative directed toward a mythological figure — but commits a genre violation by placing Greek myth in a contemporary Canadian setting, using this displacement to explore queer identity and desire. Both texts are fully 'aware' of their genre conventions, and the particular relationship each maintains with those conventions becomes the primary vehicle through which each text's meaning is made.",
      },
      {
        title: "Intertextuality and the Production of Meaning — The Reader as Co-Author",
        subtitle: "A text's meaning does not live on the page — it lives in the reader's intertextual memory",
        terms: [
          {
            term: "Reader response",
            def: "The theory that meaning is not fixed in a text but is actively constructed by the reader in the act of reading. Combined with intertextuality, this means that the same allusion can open entirely different layers of meaning depending on which prior texts a given reader already knows.",
          },
          {
            term: "Interdiscursivity",
            def: "The way a text absorbs and repositions not only other texts but also various social discourses — language games, institutional registers, ideological codes. Examples include advertising borrowing the discourse of medicine, or a political speech deploying religious rhetoric.",
          },
          {
            term: "Metafiction",
            def: "A narrative technique in which the text consciously draws attention to its own status as fiction. By reminding readers that they are reading a story, metafiction opens questions about the relationship between language and reality, between text and lived experience. Combined with intertextuality, it can make the process of a text absorbing other texts its explicit subject matter.",
          },
          {
            term: "Intertextual gap",
            def: "The difference in meaning-experience between a reader who recognises the source text and one who does not. In IB analysis, it is important to recognise that the existence of this gap is itself a textual strategy — which reader does the author construct as the 'ideal reader' when placing an allusion?",
          },
        ],
        traps: [
          "It is a trap to assume that the more intertextual references you find, the deeper your analysis is. What matters in IB is depth, not quantity — arguing multi-layeredly how a single intertextual connection relates to the text's theme, purpose, and audience earns far higher marks than a superficial list of references.",
          "Do not take reader response theory into a relativism that says 'everyone can interpret it differently.' IB requires personal interpretation to be supported by textual evidence. The frame must be: 'This textual device produces this effect, and the reason is...' — not 'I felt this way.'",
        ],
        example:
          "Imagine a poem that ends with the single line 'and the garden was, once more, a garden.' A reader who carries the biblical story of Eden in memory reads an intertextual layer — the return to an original innocence, or its impossibility — while a reader without that frame experiences only the literal image of a restored garden. This is the intertextual gap in action: the same words open different depths depending on the reader's prior textual experience, and the ideal reader the poet constructs is one who hears the Edenic echo. Crucially, the analysis does not stop at 'it reminds me of Eden'; it argues that the repetition 'a garden … a garden' and the interruptive commas stage a hesitation that makes the allusion feel like a fragile, provisional recovery rather than a settled one.",
      },
    ],
  },
  {
    lessonId: "ib-english-u3-l2",
    courseId: "ib-english",
    subjectLabel: "IB English A",
    emoji: "📖",
    unit: 3,
    lessonNum: 2,
    unitName: "Intertextuality — Connecting Texts",
    title: "Transformation and Rewriting — What It Means to Rewrite a Source Text",
    subtitle: "Rewriting is not copying — it is the act of dismantling a source text and conferring new power upon it.",
    overview:
      "What does it mean to 'rewrite' a text? To retell Shakespeare's Othello from an African American perspective, or to reinterpret classical myth through a feminist lens — these acts are not simply creative exercises. They are political and aesthetic interventions that confront the ideology, power structures, and assumptions embedded in a source text and transform them. The reason 'transformation' is a central concept in IB Unit 3 is that understanding a new text alone is not enough — the tension and dialogue between source text and new text opens up the ethical dimension of literature. In a Paper 2 comparative essay, the ability to read two texts as standing in a relationship of transformation is the most sophisticated form of comparative analysis.",
    objectives: [
      "Identify the transformative relationship between a source text and a derived text, and analyse with specific linguistic evidence what is preserved and what is altered in that transformation",
      "Argue how rewriting challenges or subverts the ideology, representations, and power structures of a source text, connecting this to postcolonial and feminist perspectives",
      "Analyse how formal transformation — for example novel to poem, play to prose — changes meaning and effect",
      "Explain how to construct a Paper 2 comparative essay thesis when reading two texts as standing in a transformative relationship",
    ],
    sections: [
      {
        title: "The Politics of Rewriting — Who Rewrites, What, and Why",
        subtitle: "Rewriting the canon is an act of summoning the voices that were silenced within it",
        terms: [
          {
            term: "Rewriting / Counter-narrative",
            def: "The creative act of retelling an existing text — particularly a canonical or dominant narrative — from a different perspective, voice, or context. Unlike simple imitation or parody, rewriting carries a critical intent that directly interrogates the ideological premises of the source text. It is most prominent in postcolonial, feminist, and queer literature.",
          },
          {
            term: "Gap-filling",
            def: "The strategy of reconstructing a narrative around characters, perspectives, or events that were marginalised or silenced in the source text. The archetypal example is Jean Rhys's Wide Sargasso Sea giving voice to Bertha Mason — the 'madwoman in the attic' who appears only as a peripheral figure in Charlotte Brontë's Jane Eyre.",
          },
          {
            term: "Transformation",
            def: "The concept that describes how meaning changes when an element of a source text — plot, character, theme, form — is moved into a new context. It is a central category in Genette's theory of transtextuality. In IB, the analysis asks: 'What is retained, what has changed, and what does that change mean?'",
          },
          {
            term: "Paratext",
            def: "Genette's concept for the elements at the 'periphery' of a text — title, subtitle, epigraph, author's note, preface, cover. Paratexts frame the way a reader approaches the text before reading begins. A title or epigraph that alludes to a source text is the first layer of intertextual signalling.",
          },
        ],
        traps: [
          "When analysing a rewriting, focusing exclusively on comparison with the source text while neglecting the linguistic and structural features of the new text itself creates an imbalance. High-scoring Paper 2 responses maintain the perspective that treats each text as an independent work of art even while analysing its relationship to the source.",
          "Do not close your analysis with a value judgment — 'the rewriting is better than' or 'more politically progressive than' the source text. What IB requires is not judgment but: 'Through what linguistic and structural choices does this transformation produce what new meanings?'",
        ],
        example:
          "Let us analyse the transformative relationship between Jean Rhys's Wide Sargasso Sea (1966) and Charlotte Brontë's Jane Eyre (1847). In Brontë's text, Bertha Mason is a voiceless, 'animalistic' peripheral figure — Victorian ideological representations of the colonial subject and of women are encoded directly into her depiction. Rhys transforms this silenced character into a first-person narrator, placing Bertha's interiority and subjectivity at centre stage. The formal transformation is equally significant: the distancing effect of Brontë's omniscient third-person narration objectifies Bertha, while Rhys's first-person narration draws the reader into intimate contact with her inner life. This analysis demonstrates the connective chain of formal choice → perspective → ideological effect that is the model for transformation analysis.",
      },
      {
        title: "Formal Transformation — How Meaning Travels Across Genres",
        subtitle: "When form changes, meaning changes — the same story becomes a different story when written as a poem",
        terms: [
          {
            term: "Formal transformation",
            def: "An analytical concept concerning how meaning, effect, and emphasis shift when the same content or story is moved into a different genre, medium, or form. In the process of translating a novel to a poem, a play to prose, or a printed text to a visual essay, we examine what survives from the original and what is lost, extinguished, or amplified.",
          },
          {
            term: "Verse / Prose boundary",
            def: "The difference between verse and prose is not merely formal. Verse uses rhythm, sound patterns, and line breaks to control the reader's pace and create intentional pauses at particular words or images. When narrative content migrates from prose to verse, the reader's experience itself changes.",
          },
          {
            term: "Medium specificity",
            def: "The effects that each medium — written word, image, film, performance — can produce uniquely, and the qualities that cannot be translated into another medium. In IB, it is important to analyse how a text exploits the distinctive possibilities of its chosen medium.",
          },
        ],
        traps: [
          "When analysing formal transformation, avoid sliding into a value hierarchy such as 'the original novel is better than the film adaptation.' In IB analysis, formal transformation is not a question of quality but of: 'What does this form make possible, and what does it make impossible, for this content?' Treat the distinctive capabilities and limitations of each form neutrally.",
        ],
        example:
          "Consider the same moment of grief rendered first as prose and then as verse. In prose — 'She stood at the door for a long time, unable to go in, thinking of everything she would now have to do alone' — the syntax carries the reader smoothly through the character's reasoning. Recast as verse — 'She stood / at the door. / Alone. / The long list / of everything / now hers.' — the line breaks force silences the prose could not, and isolating 'Alone.' on its own line lets the medium make the feeling structural rather than merely stated. The point is not that one version is superior but that verse's control of pace and white space makes the pause itself expressive, an effect prose achieves differently and image or film could not achieve at all.",
      },
      {
        title: "Myth and Archetype — Stories That Are Always Being Rewritten",
        subtitle: "Myth does not age — it is reborn with new meaning in every new context",
        terms: [
          {
            term: "Archetype",
            def: "A term originating in Carl Jung's thought and expanded into myth criticism — character types, narrative patterns, and images that recur across cultures: the hero's journey, death and rebirth, the wise elder, the earth mother. In IB, archetype analysis examines which universal narrative structures a text employs and how it transforms them.",
          },
          {
            term: "Mythological transformation",
            def: "The work of bringing the characters, events, or structures of ancient myth into a modern context and investing them with new meanings. The tension between the original myth and its modern transformation frequently produces the text's most important layer of meaning. In IB, the analysis asks which elements of the source myth are preserved and which are subverted.",
          },
          {
            term: "Universal vs. particular",
            def: "A text that uses myth or archetype simultaneously asserts 'a universal truth applicable to all human beings' and produces meaning within a specific historical, cultural, and political context. Recognising this tension in IB analysis — asking what a text presents as 'universal' and who is excluded from that 'universal' — is the core of critical reading.",
          },
        ],
        traps: [
          "Declaring 'this text follows the hero's journey structure' and stopping there is evaluated as surface-level analysis in IB. What matters is: 'Which specific elements of the hero's journey does this text transform or violate, and how does that transformation connect to the text's central theme?' Archetype is a starting point, not a conclusion.",
        ],
        example:
          "Let us analyse the mythological transformation between Adrienne Rich's poem 'Diving into the Wreck' (1973) and Homer's epic tradition (the Odyssey). Rich's poem superficially borrows the hero's journey structure of the Odyssey — a solitary descent into an unknown world, a quest for truth. But where the archetypal male hero conquers a 'treasure' and returns home, what Rich's speaker seeks in the 'wreck' is 'the damage that was done' — the wounds of women and marginalised people historically written out of the record. Formally, too, Rich chooses free verse in a conversational prose register instead of epic grandeur, dismantling the oratorical authority of the hero myth. The analytical spine is the chain: myth preservation → point of transformation → ideological effect.",
      },
    ],
  },
  {
    lessonId: "ib-english-u3-l3",
    courseId: "ib-english",
    subjectLabel: "IB English A",
    emoji: "📖",
    unit: 3,
    lessonNum: 3,
    unitName: "Intertextuality — Connecting Texts",
    title: "Paper 2 Comparative Essay — Building an Argument That Connects Texts",
    subtitle: "Comparison is not 'same / different' — the insight generated by two texts in dialogue is the heart of the comparative essay.",
    overview:
      "Paper 2, one of the final gatekeepers of IB English A, is a comparative analytical essay on two literary texts. Many students misread the 'comparative essay' as alternating between a paragraph about Text A and a paragraph about Text B. But IB assesses something more: the ability to bring two texts together under a single, integrated thesis and show what literary insight their dialogue generates. The concept of intertextuality from Unit 3 is precisely the theoretical tool for this comparative essay. Arguing how two texts are connected, and what tensions and conversations arise from that connection, is the key to a high score on Paper 2.",
    objectives: [
      "Understand each IB Paper 2 assessment criterion (knowledge and understanding, analysis, comparison and contrast, language) and explain response strategies that satisfy each criterion",
      "Construct an integrated thesis applicable to two literary texts, grounded in shared literary techniques, themes, or intertextual connections",
      "Avoid ping-pong comparison in a comparative essay and write integrated paragraph structures in which both texts are analysed simultaneously",
      "Use language that analyses literary devices and their effects with precision in an intertextual context",
      "Explain a time-management strategy for moving from thesis construction to outline to completed essay under exam conditions (90 minutes, closed book)",
    ],
    sections: [
      {
        title: "Structure of the Paper 2 Comparative Essay — From Thesis to Conclusion",
        subtitle: "A single strong thesis drives the entire essay — comparison is the method, not the goal",
        terms: [
          {
            term: "Integrated thesis",
            def: "The core sentence that argues not a simple listing of two texts but a single literary insight that the two texts explore together. A strong thesis is not 'Both Text A and B demonstrate X' but rather: 'Text A explores X in manner Y and Text B explores X in manner Z, so that together they arrive at the insight W.' This structure carries the entire essay.",
          },
          {
            term: "Integrated comparison paragraph",
            def: "The paragraph structure that earns high marks in IB Paper 2: under a single topic sentence, evidence from both texts is analysed simultaneously. The pattern is: Text A example + analysis → Text B example + analysis → comparative integration of both texts (connectives such as 'whereas,' 'similarly,' 'in contrast') → explanation of how this comparison connects to the thesis.",
          },
          {
            term: "Literary analysis language",
            def: "The core of the analytical language IB demands: 'The author uses technique X to create effect Y, which deepens / subverts / emphasises theme Z.' Identification of technique → explanation of effect → connection to thematic meaning is one analytical unit. Not 'it feels like' but 'through X, the reader is guided to Y' — concrete language of effect is required.",
          },
          {
            term: "Comparative connectives",
            def: "Language that links two texts: similarity (similarly, likewise, in the same way), contrast (in contrast, whereas, while), extension (furthermore, moreover), complication (however, nevertheless, yet). The choice of connective defines the nature of the relationship between the two texts and determines the direction of analysis.",
          },
        ],
        traps: [
          "The most common and damaging error in Paper 2 is constructing the essay as 'paragraphs about Text A + paragraphs about Text B' — the so-called block method. IB Assessment Criterion C (comparison and contrast) requires an integrated structure in which both texts are in continuous, simultaneous dialogue throughout the entire essay. Comparison must be the core of every paragraph, not something reserved for the conclusion.",
          "Jumping straight into technique analysis without a thesis is also a common error. In IB Paper 2, the thesis is the compass of the essay — no matter how accurate the technique analysis, without a thesis the essay becomes a scattered list of observations. After receiving the exam paper, invest five minutes writing your thesis sentence and drafting your outline first.",
        ],
        example:
          "Let us look at a sample thesis and paragraph structure for a Paper 2 comparative essay.\n\nQuestion: 'How are memory and the self connected? Compare the impact of memory on narrative structure in two works.'\n\nTexts: Pablo Neruda's Twenty Love Poems and a Song of Despair and Javier Marías's Your Face Tomorrow\n\nSample integrated thesis: 'Both Neruda and Marías present memory as an unstable foundation for the self, but whereas Neruda summons memory as an immediate, physical present through the present tense and direct second-person address of lyric poetry, Marías reveals memory as reconstruction through the prose's repeated structure of self-correction, making memory's status as re-creation visible in the narrative form itself. Together the two texts arrive at the epistemological insight that memory is not the preservation of fact but its endless re-creation.'\n\nSample integrated paragraph: 'Both writers embody the instability of memory through their choice of narrative tense. Neruda deploys present-tense declarations — \"puedo escribir los versos\" (I can write the verses) — to forcibly summon past experience into the present, and this tense collision creates an anxiety that memory does not belong to the past but invades the present. Similarly, Marías's narrator repeats a syntactic pattern of immediately revising his own prior statements (\"or perhaps he did, I cannot be certain\"), inscribing memory's unreliability into the prose rhythm itself. Yet the effects of the two strategies are contrasting: Neruda's present tense grants memory an intense sense of presence, while Marías's self-correction dismantles that presence. This contrast is the precise point at which the two texts' accounts of memory converge.'",
      },
      {
        title: "Using Evidence in the Comparative Essay — Balancing Quotation and Analysis",
        subtitle: "Quotation exists to prove an argument — quotation must not become the analysis itself",
        terms: [
          {
            term: "Textual evidence",
            def: "Specific citations from within the text that support an analytical claim — direct quotation, paraphrase, or deictic reference to a particular scene, image, or structure. In IB, more quotation is not better; each quotation must serve a clear analytical function.",
          },
          {
            term: "Three layers of analysis",
            def: "The depth of analysis IB Paper 2 requires: (1) technique identification (what): 'The author uses a metaphor'; (2) effect explanation (how): 'This metaphor creates image X in the reader and induces emotional response Y'; (3) thematic meaning (why): 'The reason this deepens the text's theme Z is...' Most students stop at (1) or (2). Reaching (3) is the key to a high score.",
          },
          {
            term: "Literary judgment",
            def: "A critical evaluation of whether a text's aesthetic choices are 'effective' and 'why this choice serves this text's purpose better than an alternative.' IB assesses not only the ability to analyse texts but also the ability to present, with supporting reasons, a judgment about the literary value of their choices.",
          },
        ],
        traps: [
          "Beware the 'evidence dump' pattern — bringing in very long quotations and then offering only a brief analysis. In IB Paper 2 (a 90-minute exam), the effective approach is to quote only the key word or phrase, then devote far more space to its analysis. One line of quotation with four to five lines of analysis earns significantly higher marks than four lines of quotation with one line of analysis.",
          "Looking only for similarities between the two texts, or conversely emphasising only differences, produces analytical monotony. High-scoring IB responses explore both similarities and differences and connect what each reveals to the thesis — a dialectical structure that shows what the likeness tells us and what the difference tells us.",
        ],
        example:
          "Compare an 'evidence dump' with a controlled use of quotation. Weak: 'The narrator says, \"I walked down the empty street in the grey light of morning past the shuttered shops that had once been full of noise and life and people I knew,\" which shows the town is sad.' The long quotation swamps a single thin claim. Strong: the writer's isolation surfaces in one word — the street is merely \"shuttered\" — where the closed shopfronts stand in for a whole community that has withdrawn from him, the participle's suggestion of deliberate shutting-out mirroring his own exclusion. The second version quotes a single load-bearing word and devotes the sentence to its effect and thematic meaning, which is precisely the quotation-to-analysis ratio IB Paper 2 rewards.",
      },
      {
        title: "Paper 2 Exam Strategy — Designing 90 Minutes",
        subtitle: "What shines in the exam room is a prepared strategy — thinking before the exam, execution during it",
        terms: [
          {
            term: "Thesis construction strategy",
            def: "A method for rapidly constructing a thesis in the Paper 2 exam room: (1) extract the core concept from the question (e.g. 'memory,' 'power,' 'identity'); (2) identify the single most powerful technique connected to that concept in each text; (3) integrate the similarities and differences of the two texts into one sentence; (4) add one sentence on what this comparison reveals ('so what?'). Invest five to seven minutes in this process.",
          },
          {
            term: "Time management",
            def: "Recommended allocation for Paper 2 (90 minutes): reading the question + writing thesis and outline 8–10 minutes / introduction 8–10 minutes / body paragraphs 3–4 × 12–15 minutes = 45–60 minutes / conclusion 8–10 minutes / review 5 minutes. Spending too long on the introduction is the most common time-wasting pattern — keep it concise: thesis plus direction.",
          },
          {
            term: "Criterion-linked self-check",
            def: "A 30-second check after writing each paragraph, linked to IB assessment criteria: Criterion A (knowledge and understanding) — am I showing accurate, specific knowledge of both texts? Criterion C (comparison and contrast) — are both texts being analysed simultaneously in this paragraph? Criterion D (language) — am I using literary analysis language accurately and fluently?",
          },
          {
            term: "Closed-book preparation",
            def: "Paper 2 is a closed-book exam written without access to texts. Preparation strategies: memorise ten to fifteen key quotations from each text accurately; compile five core technique patterns for each author; list the major themes and concepts each text explores. However, since paraphrase is also permitted when exact quotation is not possible, prioritise training in analytical ability over rote memorisation.",
          },
        ],
        traps: [
          "Ending a Paper 2 conclusion with a summary — 'Text A shows X and Text B shows Y' — is a wasted opportunity. A high-scoring IB conclusion synthesises the insight reached through the body's analysis and opens outward to the larger question of why the comparison of these two texts is literarily and humanly significant. 'By reading these two texts together, we come to understand Y about X' — this is the ideal form of an IB comparative essay conclusion.",
          "Choosing a thesis that is too safe is also a trap. A self-evident claim such as 'both texts explore love' leaves no analytical space to develop. A strong thesis is slightly counterintuitive, or embeds an interpretive challenge about the relationship between the two texts — only then does the body analysis have the purpose of 'proving' the thesis.",
        ],
        example:
          "Sample outline for a Paper 2 comparative essay (five-minute exam-room version):\n\nQuestion: 'How does language construct or resist power in two texts?'\n\nTexts: George Orwell's 1984 and Chinua Achebe's Things Fall Apart\n\n[1 minute] Extract core concept: language + power → control of language, loss of language, resistance through language\n\n[2 minutes] Connect key technique to each text:\n- Orwell: Newspeak — totalitarian power makes thought itself impossible by shrinking language\n- Achebe: Igbo proverbs and rhythms inserted into an English narrative — the paradoxical strategy of resisting the colonial language from within it\n\n[1 minute] Draft thesis: 'Orwell figures the absolutisation of power through linguistic deprivation as dystopian narrative, while Achebe seeds the rhythms of Igbo into the colonial tongue to show that language itself can become a space of resistance. Together the two texts reveal that language is not a neutral tool of communication but a political battleground on which power contends.'\n\n[1 minute] Direction for three body paragraphs:\n① The mechanisms of linguistic control — Newspeak vs. suppression of Igbo\n② Silence and resistance — Winston's diary vs. Achebe's insertion of oral tradition\n③ Language and identity — self-erasure within Newspeak vs. survival of identity within a hybrid tongue",
      },
    ],
  },
];
