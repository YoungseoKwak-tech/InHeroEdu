/**
 * Hand-authored, textbook-depth Core Notes presented for scannability:
 * short prose chunks + KEY IDEA callouts + comparison TABLES + term cards +
 * diagrams. Content is preserved; the format is built so students actually
 * read it. These OVERRIDE the auto-generated seed for the same
 * courseId+unit+lesson (see lib/coreNotes). Authored by Claude (no API).
 */

export interface AuthoredSection {
  title: string;
  body?: string;
  keyIdea?: string;
  table?: { headers: string[]; rows: string[][] };
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
    subtitle: "How a 2,000-year-old philosophy question became a lab science in one year — and why psychology still explains behavior through seven lenses at once.",
    overview:
      "Psychology asks the oldest questions humans have: What is the mind? Are we born this way or made by experience? Is behavior free, or caused? For most of history these belonged to philosophy — argued brilliantly, settled by no one, because there was no way to test an opinion about the mind.\n\nTwo things changed that, and they are the whole lesson. First, a date: 1879, when Wundt opened the first psychology lab and turned the mind into something you could measure. Second, a habit of mind: psychology never agreed on one theory — it split into seven perspectives, each a different lens on the same behavior.",
    objectives: [
      "Explain why 1879 (Wundt's lab) marks psychology becoming a science.",
      "Compare structuralism (Wundt, Titchener) with functionalism (James).",
      "Pair the major early figures with their schools (Freud, Watson/Skinner, Maslow/Rogers).",
      "Identify the seven modern perspectives and the cause each one emphasizes.",
      "Apply two or more perspectives to one behavior — they are complementary, not rivals.",
    ],
    sections: [
      {
        title: "Philosophy's questions, with no way to answer them",
        body:
          "Before psychology had a name, philosophers asked its questions. Descartes argued for mind–body dualism — that the mind is non-physical, separate from the body. Locke countered with empiricism: the mind starts as a blank slate, written on by experience. Nativists insisted some knowledge is inborn.\n\nThe problem was never the ideas — it was the method. There was no experiment to decide who was right, so the debates never closed. That missing ingredient is exactly what scientific psychology supplied.",
        keyIdea: "Philosophy could pose the questions about the mind; it could not test the answers. Psychology = philosophy's questions + science's method.",
        terms: [
          { term: "Mind–body dualism", def: "Descartes's view that mind and body are separate; modern biological psychology rejects it." },
          { term: "Empiricism", def: "Locke's view that knowledge comes from experience — the mind as a 'blank slate.'" },
          { term: "Nature–nurture issue", def: "The debate over biology vs. experience; the modern answer is that they interact." },
        ],
      },
      {
        title: "1879: the birth of a science",
        body:
          "In 1879 Wilhelm Wundt opened the first psychology laboratory in Leipzig — the date the AP exam treats as psychology's founding, making Wundt the 'father of psychology.' His breakthrough was a method: studying the mind under controlled conditions.\n\nWundt and Titchener built the first school, structuralism, which tried to break consciousness into basic elements using introspection (trained self-reports). It failed because introspection couldn't be verified — two observers couldn't agree, and a science needs checkable data. But the bigger idea survived: the mind can be studied in a lab at all.",
        keyIdea: "Structuralism's failure teaches the rule of science: data has to be verifiable. Introspection wasn't, so it died — but the experimental approach lived.",
        terms: [
          { term: "Wilhelm Wundt", def: "Founded the first psychology lab (1879); the 'father of psychology.'" },
          { term: "Structuralism", def: "Wundt & Titchener's school analyzing consciousness into basic elements." },
          { term: "Introspection", def: "Trained self-reports of conscious experience; abandoned as unverifiable." },
        ],
      },
      {
        title: "The schools that followed — figures to know",
        body:
          "William James launched functionalism, asking not what the mind is made of but what it is FOR — how mental processes help us adapt (a Darwinian idea, and the ancestor of the evolutionary perspective). After him, the field reinvented itself again and again, each school rebelling against the last.",
        table: {
          headers: ["Figure(s)", "School", "Core idea"],
          rows: [
            ["Wundt / Titchener", "Structuralism", "Break consciousness into elements (introspection)"],
            ["William James", "Functionalism", "Study the PURPOSE of mental processes (adaptation)"],
            ["Sigmund Freud", "Psychoanalysis", "Behavior driven by the unconscious & early childhood"],
            ["Watson & Skinner", "Behaviorism", "Study only observable behavior shaped by reward/punishment"],
            ["Maslow & Rogers", "Humanism", "Free will, growth, self-actualization"],
            ["(1950s–60s)", "Cognitive revolution", "Study the mind as information processing"],
          ],
        },
        keyIdea: "Memorize this table — the exam constantly gives a quote or method and asks 'whose school is this?'",
      },
      {
        title: "The seven modern perspectives — one behavior, many lenses",
        body:
          "Modern psychology settled into seven perspectives. The skill that matters all year: recognize each by the KIND of cause it points to, and remember they overlap. Choosing a lens means choosing what to study — not declaring the others wrong.",
        table: {
          headers: ["Perspective", "Looks for causes in…", "Why is someone aggressive?"],
          rows: [
            ["Biological", "Genes, brain, hormones, neurotransmitters", "Overactive amygdala; high testosterone"],
            ["Cognitive", "How we perceive & process information", "Reads neutral acts as hostile"],
            ["Behavioral", "Rewards & punishments (learning)", "Aggression was rewarded before"],
            ["Psychodynamic", "Unconscious conflicts, early childhood", "Displaced, unresolved anger"],
            ["Humanistic", "Free will, blocked growth needs", "Thwarted needs"],
            ["Sociocultural", "Culture, norms, the situation", "A peer culture prizing toughness"],
            ["Evolutionary", "Traits that aided ancestral survival", "Defending resources/territory"],
          ],
        },
        keyIdea: "No single lens is 'the' answer. A complete explanation usually combines several — which is exactly what an FRQ asks you to do.",
        traps: [
          "Treating the perspectives as competing truths where only one is right. Each is a LENS that emphasizes some causes and ignores others. On multiple choice, read for which cause the scenario stresses (a brain region → biological, a reward history → behavioral, a cultural norm → sociocultural) and pick that lens.",
        ],
      },
      {
        title: "How this shows up on the exam",
        body:
          "Two ways. (1) Matching: a quote, method, or figure → name the school (use the table above). (2) Application: a scenario → which perspective best explains it, or apply a named perspective to a new situation.\n\nKeep the throughline in mind: psychology earned the word 'science' by replacing unverifiable introspection with controlled methods — which is exactly what the next lesson, Research Methods, is all about.",
        keyIdea: "Whenever you meet a claim about the mind, ask Wundt's founding question: 'How could we actually measure that?'",
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 1, lessonNum: 2,
    unitName: "Scientific Foundations of Psychology",
    title: "Research Methods — Experiments, Correlations, Statistics",
    subtitle: "How psychology actually knows things — and why 'they're correlated' never, on its own, means 'one caused the other.'",
    overview:
      "Psychology is a science because it tests ideas with evidence. But the conclusion you're allowed to draw depends entirely on the method you used. The one rule that runs through everything: only a controlled experiment with random assignment can show CAUSATION. Everything else can describe and predict — never prove cause.",
    diagram: "scatter-regression",
    objectives: [
      "Explain why only experiments (with random assignment) can establish causation.",
      "Identify the IV, DV, experimental/control groups, and confounding variables.",
      "Interpret a correlation's sign and strength — and why it can't prove cause.",
      "Match each research method to what it can and can't tell you.",
      "Read basic descriptive statistics and the meaning of statistical significance.",
    ],
    sections: [
      {
        title: "The experiment: the only road to cause",
        body:
          "In an experiment you manipulate the independent variable (IV, the suspected cause) and measure the dependent variable (DV, the effect). The magic is random assignment: chance decides who's in the experimental vs. control group, which scatters all other differences evenly. So if the groups end up different, the IV is the cause — confounds were balanced out.",
        keyIdea: "Random assignment is what licenses a cause-and-effect claim. No random assignment → no causation, ever.",
        terms: [
          { term: "Independent variable (IV)", def: "The factor the experimenter manipulates — the suspected cause." },
          { term: "Dependent variable (DV)", def: "The outcome that is measured — the effect." },
          { term: "Random assignment", def: "Sorting participants into groups by chance; balances confounds, enabling causal claims." },
          { term: "Confounding variable", def: "Any factor besides the IV that could explain the result." },
          { term: "Double-blind", def: "Neither participants nor researchers know who got the real treatment — blocks expectation effects." },
        ],
      },
      {
        title: "Correlation: relationship, not cause",
        body:
          "A correlation coefficient runs from −1 (perfect negative) through 0 (none) to +1 (perfect positive). The sign is direction; distance from 0 is strength — so −0.8 is STRONGER than +0.3. Correlations let you predict, but two pitfalls block causation: a hidden third variable, and the directionality problem (which causes which?).",
        keyIdea: "Ice-cream sales and drownings rise together — but hot weather (a third variable) drives both. Correlation ≠ causation.",
        terms: [
          { term: "Correlation coefficient (r)", def: "−1 to +1; sign = direction, distance from 0 = strength." },
          { term: "Third-variable problem", def: "An outside variable produces a correlation between two others." },
          { term: "Directionality problem", def: "A correlation can't say whether A causes B or B causes A." },
        ],
        traps: ["If there was no manipulation and no random assignment, you cannot claim cause — no matter how strong r is."],
      },
      {
        title: "Which method tells you what",
        body: "Each research method buys a different kind of knowledge. The exam loves to ask which method fits a goal.",
        table: {
          headers: ["Method", "Shows cause?", "Best for"],
          rows: [
            ["Experiment", "✅ Yes (random assignment)", "Testing cause and effect"],
            ["Correlational study", "❌ No", "Measuring & predicting relationships"],
            ["Survey", "❌ No", "Many people, attitudes (watch wording/bias)"],
            ["Naturalistic observation", "❌ No", "Real behavior in natural settings"],
            ["Case study", "❌ No", "Rich depth on one rare case"],
          ],
        },
        keyIdea: "Only the experiment row gets a ✅. Everything else describes or predicts.",
      },
      {
        title: "Describing data",
        body:
          "Central tendency locates the middle: the mean (average) is pulled by outliers; the median (middle value) resists them, so skewed data uses the median. Standard deviation measures spread. Many traits form a normal distribution (bell curve, ~68% within 1 SD). Statistical significance (p < .05) means a result probably isn't chance — but 'significant' ≠ 'large' or 'important.'",
        keyIdea: "A billionaire walks into a café: the MEAN income jumps, the MEDIAN barely moves. That's why skewed data reports the median.",
        terms: [
          { term: "Mean / Median", def: "Average vs. middle value; the median resists outliers." },
          { term: "Standard deviation", def: "How far scores typically fall from the mean (spread)." },
          { term: "Statistical significance", def: "Result unlikely due to chance (p < .05) — not the same as large/important." },
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 1, lessonNum: 3,
    unitName: "Scientific Foundations of Psychology",
    title: "Biological Bases of Behavior — The Neuron",
    subtitle: "Every thought and movement begins as one cell deciding whether to fire — electrical within, chemical between.",
    overview:
      "Everything you feel and do is built from neurons passing messages. Each neuron does one job: receive signals, add them up, and decide whether to fire. The distinction that unlocks the unit: WITHIN a neuron the signal is electrical (the action potential); BETWEEN neurons it's chemical (neurotransmitters crossing the synapse).",
    diagram: "neuron",
    objectives: [
      "Label the neuron's parts and each one's job.",
      "Explain the resting potential, threshold, and all-or-none action potential.",
      "Describe how neurotransmitters cross the synapse and are cleared by reuptake.",
      "Match key neurotransmitters to their roles and related disorders.",
    ],
    sections: [
      {
        title: "Anatomy: a one-way relay",
        body:
          "Signals arrive at the dendrites, gather at the cell body (soma), and if strong enough fire down the axon, often wrapped in a fatty myelin sheath that speeds transmission (its breakdown causes multiple sclerosis). The axon terminals hand off to the next cell. Flow: dendrites → soma → axon → terminals.",
        keyIdea: "Myelin = insulation on a wire. Lose it (MS) and signals slow or fail.",
        terms: [
          { term: "Dendrites", def: "Branches that receive incoming signals." },
          { term: "Axon", def: "Fiber that carries the signal away from the soma." },
          { term: "Myelin sheath", def: "Fatty insulation speeding transmission; breaks down in MS." },
          { term: "Terminal buttons", def: "Axon ends that release neurotransmitters." },
        ],
      },
      {
        title: "The action potential — all or nothing",
        body:
          "At rest the neuron holds a negative charge (resting potential). Incoming signals add up; cross the threshold and it fires a full impulse — the action potential. It's all-or-none: never halfway. So how do we sense intensity? By firing RATE — a stronger stimulus makes the neuron fire more often, not bigger.",
        keyIdea: "A neuron is like a gun: it fires fully or not at all. 'Louder' = fires more often, not a bigger spike.",
        terms: [
          { term: "Resting potential", def: "The neuron's stable negative charge before firing." },
          { term: "Threshold", def: "The stimulation level needed to trigger firing." },
          { term: "All-or-none principle", def: "Fires at full strength or not at all; intensity is coded by firing rate." },
        ],
        traps: ["A stronger stimulus does NOT make a bigger action potential — it makes the neuron fire more frequently."],
      },
      {
        title: "Crossing the synapse — where drugs act",
        body:
          "Neurons don't touch; the synapse is the gap. The terminal releases neurotransmitters that bind to receptors on the next neuron (key-in-lock). Leftovers are vacuumed back by reuptake — which many antidepressants (SSRIs) block to keep serotonin in the gap. Drugs that mimic a neurotransmitter are agonists; those that block it are antagonists.",
        table: {
          headers: ["Neurotransmitter", "Role", "Linked to"],
          rows: [
            ["Dopamine", "Reward, motivation, movement", "Parkinson's (too little); addiction"],
            ["Serotonin", "Mood, sleep, appetite", "Depression (low); SSRIs raise it"],
            ["GABA", "Main inhibitor (calms the brain)", "Anxiety; boosted by alcohol"],
            ["Acetylcholine", "Muscle movement & memory", "Alzheimer's (loss)"],
          ],
        },
        keyIdea: "SSRIs block serotonin reuptake → more serotonin lingers in the synapse → mood lifts over weeks.",
        terms: [
          { term: "Synapse", def: "The gap between neurons where chemical signaling happens." },
          { term: "Reuptake", def: "Reabsorption of leftover neurotransmitter; blocking it raises that NT's effect." },
        ],
      },
    ],
  },
];
