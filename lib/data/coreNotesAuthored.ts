/**
 * Hand-authored, textbook-depth Core Notes (deep narrative + diagrams) that
 * OVERRIDE the auto-generated seed for the same courseId+unit+lesson
 * (see lib/coreNotes). Authored by Claude (no API). Rolling out subject by
 * subject at textbook depth.
 */

export interface AuthoredSection {
  title: string;
  body?: string;
  terms?: { term: string; def: string }[];
  example?: string | null;
  traps?: string[];
}
export interface AuthoredNote {
  courseId: string;
  unit: number;
  lessonNum: number;
  unitName: string;
  title: string;
  subtitle?: string;
  overview?: string;
  objectives?: string[];
  diagram?: string | null;
  formulas?: string[];
  sections: AuthoredSection[];
}

export const CORE_NOTES_AUTHORED: AuthoredNote[] = [
  {
    courseId: "ap-psychology", unit: 1, lessonNum: 1,
    unitName: "Scientific Foundations of Psychology",
    title: "History and Perspectives of Psychology",
    subtitle: "How a 2,000-year-old philosophical question turned into a laboratory science in a single year — and why modern psychology still studies every behavior through seven different lenses at once.",
    overview:
      "Psychology is often called a young science, and in a strict sense that is true: it has existed as an experimental discipline for fewer than 150 years. But the questions psychology asks are among the oldest humans have ever posed. What is the mind? Where do thoughts and feelings come from? Are we born as we are, or made by experience? Is human behavior free, or is it caused — and if it is caused, by what? For most of recorded history these questions belonged to philosophy, debated brilliantly but settled by no one, because there was no method for turning an opinion about the mind into a testable claim.\n\nThe entire story of this lesson is the story of how that changed. It is the story of a discipline learning to replace argument with evidence. And it pivots on one year you must not forget: 1879, when Wilhelm Wundt opened the first laboratory devoted to studying the mind scientifically. Before 1879, the study of the mind was a branch of philosophy. After 1879, it was a science with its own methods, its own laboratories, and eventually its own warring schools of thought.\n\nThat last detail — the warring schools — is the second great theme of this lesson. Psychology did not march toward a single agreed-upon theory of behavior. Instead it fractured, repeatedly, into competing schools (structuralism, functionalism, psychoanalysis, behaviorism, humanism, and the cognitive revolution) and then settled into the seven modern perspectives that frame the entire AP course. The crucial insight — the one the exam tests more than any other in this unit — is that these perspectives are not rivals fighting over one correct answer. Each is a lens: a deliberate choice about which causes of behavior to study and which to set aside.\n\nWhy does that matter so much? Because almost every behavior you will study this year has many causes operating at once — biological, cognitive, behavioral, social, and developmental. A complete explanation needs several lenses. When a multiple-choice item describes a behavior and asks 'which perspective best explains this?', it is checking whether you can hear which kind of cause the scenario is emphasizing and reach for the matching lens. When a free-response prompt asks you to apply two perspectives to one situation, it is checking whether you can hold several lenses at once. Mastering this skill here, in the very first lesson, pays off in every unit that follows.\n\nSo read this lesson with two goals. First, build a timeline of names and contributions you can recall instantly, because the exam reuses them as anchors. Second — and more importantly — internalize the habit of the empirical mind that Wundt started: whenever you meet a claim about behavior, ask how anyone could actually measure it. That single habit is what separates psychology from the philosophy it grew out of.",
    objectives: [
      "Trace the philosophical roots of psychology (mind–body dualism, empiricism vs. nativism) and explain why philosophy alone could not settle questions about the mind.",
      "Explain the significance of 1879 and Wundt's founding of the first psychology laboratory.",
      "Compare structuralism (Wundt, Titchener) and functionalism (James), including the method each used and why each rose and fell.",
      "Summarize the major schools that followed — psychoanalysis, behaviorism, humanism, and the cognitive revolution — and pair each with its key figures.",
      "Identify the seven modern perspectives and the specific kind of cause each one emphasizes.",
      "Apply two or more perspectives to a single behavior, recognizing that they are complementary lenses rather than competing truths.",
    ],
    sections: [
      {
        title: "The long prehistory: philosophy's questions about the mind",
        body:
          "Long before psychology had a name, philosophers were asking its questions. The ancient Greeks debated whether the mind was located in the heart or the brain — Aristotle argued for the heart, and he was wrong, but he was asking an empirical question about where mental life lives. Centuries later, the French philosopher René Descartes proposed mind–body dualism: the idea that the mind is a non-physical thing, separate from the physical body, interacting with it somehow through the brain. Dualism dominated Western thought for a long time, and the modern biological perspective is in many ways a direct rejection of it — an insistence that the mind IS what the physical brain does.\n\nA second great debate framed everything that followed: where does knowledge come from? Empiricists like John Locke argued that the mind begins as a blank slate (a tabula rasa) and that all knowledge is written onto it by experience. Nativists, following Plato and later Descartes, argued that some knowledge and capacities are inborn. You should recognize this as the ancestor of the nature–nurture issue that runs through the entire course. Notice that modern psychology did not 'pick a side' — it concluded that nature and nurture constantly interact, and the interesting questions are about how.\n\nThe limitation of all this brilliant thinking was methodological. A philosopher could argue elegantly that the mind is a blank slate, and another could argue just as elegantly that it isn't, and there was no experiment to decide between them. Philosophy could pose the questions with stunning clarity, but it had no way to test the answers. That missing ingredient — a method — is exactly what the founders of scientific psychology supplied.",
        terms: [
          { term: "Mind–body dualism", def: "Descartes's view that the mind is a non-physical entity separate from the physical body; modern biological psychology largely rejects it." },
          { term: "Empiricism", def: "The view (Locke) that knowledge comes from experience and observation; the mind starts as a 'blank slate.'" },
          { term: "Nativism", def: "The view that certain knowledge and capacities are inborn rather than learned." },
          { term: "Nature–nurture issue", def: "The enduring debate over the relative contributions of biology (nature) and experience (nurture); the modern answer is that they interact." },
        ],
      },
      {
        title: "1879: the birth of a science (structuralism)",
        body:
          "In 1879, in Leipzig, Germany, Wilhelm Wundt established the first laboratory in the world dedicated to the scientific study of the mind. This is the date the AP exam treats as the founding of psychology, and Wundt is accordingly called the father of psychology. What made his lab revolutionary was not a theory but a method: Wundt brought the mind under controlled conditions, measuring things like reaction times and training participants to report their experiences systematically. For the first time, mental life could be studied with the tools of science rather than the tools of debate.\n\nWundt and his student Edward Titchener built the first formal school of thought, structuralism. Their ambition was almost chemical: just as a chemist breaks a compound into elements, they tried to break consciousness into its basic components — raw sensations, feelings, and images. Their tool was introspection, in which carefully trained observers reported the contents of their own conscious experience in response to a stimulus, such as the ticking of a metronome or the taste of a fruit.\n\nStructuralism ultimately failed, and the reason it failed is itself an important lesson about science. Introspection produced data that could not be verified: two equally trained observers might report different 'elements' of the same experience, and there was no objective way to determine who was right. A science needs data that different observers can agree on, and introspection couldn't deliver it. So structuralism faded within a generation. But the deeper achievement survived intact — the conviction, proven by Wundt's lab itself, that the mind could be studied experimentally at all.",
        terms: [
          { term: "Wilhelm Wundt", def: "Founded the first psychology laboratory in 1879; the 'father of psychology.'" },
          { term: "Structuralism", def: "Wundt and Titchener's school that aimed to analyze consciousness into its basic elements." },
          { term: "Introspection", def: "The method of having trained observers report the contents of their own conscious experience; abandoned because it couldn't be verified." },
          { term: "Edward Titchener", def: "Wundt's student who brought structuralism to the United States and named it." },
        ],
        example:
          "A structuralist studying an apple wouldn't ask 'what is an apple for?' — they'd ask a trained participant to report the pure sensory elements of the experience: the specific red, the cool smoothness, the sweet-tart taste, each catalogued separately. The hope was to assemble a periodic table of conscious experience. The fatal flaw: your catalogue of the apple and mine might not match, and nothing could settle the disagreement.",
      },
      {
        title: "Functionalism and the schools that followed",
        body:
          "While structuralists in Germany dissected the contents of consciousness, the American psychologist William James found that project sterile. Deeply influenced by Darwin's theory of evolution, James asked a different question: not what the mind is made of, but what the mind is for. Why do we have memory, attention, emotion, and habit? Because, James argued, these processes help an organism adapt to and survive in its environment. This school, functionalism, focused on the purpose of mental life — and that 'what is this behavior good for?' question is the direct ancestor of today's evolutionary perspective.\n\nThe early twentieth century then produced a rapid succession of schools, each reacting against the last. Sigmund Freud, a Viennese physician, founded psychoanalysis, arguing that behavior is driven by powerful unconscious conflicts and desires, many rooted in early childhood. Freud's emphasis on the unconscious was enormously influential, though his methods were unscientific by modern standards; his legacy lives on in the psychodynamic perspective. In sharp rebellion, John B. Watson and later B. F. Skinner founded behaviorism, which dismissed the unconscious mind — and even consciousness itself — as unscientific. Behaviorists insisted psychology should study only observable behavior and the environmental rewards and punishments that shape it. For decades, behaviorism dominated American psychology.\n\nTwo final movements complete the picture. The humanistic psychologists, led by Abraham Maslow and Carl Rogers, rejected both Freud's grim determinism and behaviorism's mechanical view of people. They emphasized free will, conscious experience, and the human drive toward growth and self-actualization. Then, in the 1950s and 60s, the cognitive revolution brought the mind back to center stage: armed with new ideas from computer science and linguistics, cognitive psychologists argued that we must study internal mental processes — perception, memory, thinking — as information processing. This revolution produced the cognitive perspective and reshaped the entire field.",
        terms: [
          { term: "William James", def: "Founded functionalism; studied the adaptive PURPOSE of mental processes, influenced by Darwin." },
          { term: "Functionalism", def: "The school that asked what mental processes are FOR — how they help organisms adapt and survive." },
          { term: "Sigmund Freud", def: "Founded psychoanalysis; emphasized unconscious drives and early childhood — ancestor of the psychodynamic perspective." },
          { term: "Behaviorism", def: "Watson and Skinner's school that studied only observable behavior shaped by environmental consequences, rejecting study of the mind." },
          { term: "Humanistic psychology", def: "Maslow and Rogers's movement emphasizing free will, conscious experience, and self-actualization." },
          { term: "Cognitive revolution", def: "The mid-20th-century return to studying internal mental processes as information processing." },
        ],
      },
      {
        title: "The seven modern perspectives — one behavior, many lenses",
        body:
          "Out of that history, modern psychology settled into seven perspectives, and the single most useful thing you can do is learn to recognize each one by the type of cause it points to. The biological perspective locates causes in genes, brain structures, hormones, and neurotransmitters. The cognitive perspective looks at how we perceive, process, store, and retrieve information. The behavioral perspective studies observable responses shaped by reward and punishment, ignoring the inner mind. The psychodynamic perspective traces behavior to unconscious conflicts and early experience.\n\nThe remaining three: the humanistic perspective emphasizes free will, personal growth, and the drive to fulfill one's potential; the sociocultural perspective examines how culture, social norms, and the immediate situation shape thought and action; and the evolutionary perspective asks how a behavior might have helped our ancestors survive and reproduce. Some textbooks add a behavior-genetics or biopsychosocial perspective, but these seven are the core.\n\nThe master skill is to see that these perspectives are not in competition for a single right answer — they are complementary. Any rich behavior has causes at several of these levels simultaneously. Choosing a perspective is not claiming the others are false; it is choosing which slice of the causal pie to investigate. This is the framework the entire course is built on, and the exam rewards students who can fluidly switch lenses and combine them.",
        terms: [
          { term: "Biological perspective", def: "Explains behavior through genes, brain anatomy, hormones, and neurotransmitters." },
          { term: "Cognitive perspective", def: "Explains behavior through mental processes: perception, memory, reasoning, problem-solving." },
          { term: "Behavioral perspective", def: "Explains behavior through observable, learned responses shaped by environmental consequences." },
          { term: "Psychodynamic perspective", def: "Explains behavior through unconscious conflicts and early childhood experience." },
          { term: "Humanistic perspective", def: "Emphasizes free will, conscious experience, and self-actualization (Maslow, Rogers)." },
          { term: "Sociocultural perspective", def: "Explains behavior through cultural, social, and situational influences." },
          { term: "Evolutionary perspective", def: "Explains behavior in terms of traits that aided ancestral survival and reproduction." },
        ],
        example:
          "Consider why a teenager might act aggressively, and watch all seven lenses illuminate different causes. Biological: a reactive amygdala or elevated testosterone. Cognitive: a habit of interpreting ambiguous acts as hostile ('he bumped me on purpose'). Behavioral: aggression that has been rewarded in the past with respect or getting one's way. Psychodynamic: displaced anger from an unresolved family conflict. Humanistic: thwarted needs blocking growth. Sociocultural: a peer culture that equates toughness with status. Evolutionary: aggression that once helped ancestors defend territory and resources. No single lens is 'the' explanation — and an FRQ may explicitly ask you to apply two or three of them to exactly this kind of scenario.",
        traps: [
          "The number-one error: treating the perspectives as competing truths where only one can be correct. Each perspective is a LENS that deliberately emphasizes some causes and ignores others; choosing a perspective means choosing what to study, not declaring the rest wrong. On multiple choice, read carefully for which kind of cause the scenario stresses — a brain region points biological, a reward history points behavioral, a cultural norm points sociocultural — and pick the matching lens.",
        ],
      },
      {
        title: "How this lesson shows up on the AP exam",
        body:
          "It is tempting to treat the history as background trivia, but the AP exam mines it for points in predictable ways. The most common is simple matching: you are given a quote, a method, or a description and asked to identify the school or figure it represents. You should be able to pair instantly — Wundt with the first lab and introspection, Titchener with structuralism, James with functionalism, Freud with the unconscious, Watson and Skinner with behaviorism, Maslow and Rogers with humanism. Build that list into flashcards; it is among the highest-yield memorization in the unit.\n\nThe second and more sophisticated way this content appears is conceptual. Questions describe a behavior and ask which perspective best explains it, or present a research approach and ask which school it reflects. Here the matching skill from the perspectives section is everything: practice reading a scenario and naming the kind of cause it emphasizes. Free-response questions frequently go further, asking you to apply a specific perspective to a novel situation — which means you must not just define each lens but use it to generate an explanation.\n\nFinally, keep sight of the throughline that connects this lesson to the next one. Psychology earned the word 'science' by replacing unverifiable introspection with controlled, repeatable methods. The very weakness that doomed structuralism — data nobody could check — is what the next lesson on research methods is designed to overcome. So as you move forward, carry Wundt's founding habit with you: whenever you encounter a claim about the mind, ask the empirical question, 'How could we actually measure that?'",
        terms: [
          { term: "Father of psychology", def: "Wilhelm Wundt, for founding the first psychology laboratory (1879) and making the mind an experimental subject." },
          { term: "Psychology (modern definition)", def: "The scientific study of behavior and mental processes — 'scientific' is the word that separates it from its philosophical roots." },
        ],
      },
    ],
  },
];
