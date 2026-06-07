/**
 * Hand-authored, Khan-Academy-style Core Notes (narrative + diagrams) for
 * lessons that need depth beyond the breakdown topics. These OVERRIDE the
 * auto-generated seed for the same courseId+unit+lesson (see lib/coreNotes).
 * Authored by Claude (no API). Rolling out subject by subject.
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
    subtitle: "How psychology became a science — and why it sees behavior through many lenses at once.",
    overview:
      "Psychology started as a branch of philosophy asking a huge question: what is the mind, and how does it work? For centuries that question lived in armchairs and debate. Then, in 1879, Wilhelm Wundt opened the first psychology laboratory in Leipzig, Germany — and turned the question into a science you could measure.\n\nHere's the key idea for the exam: psychology didn't settle on one answer. It split into several perspectives, and each one is a different lens on the same behavior. None is 'the truth' — each emphasizes different causes. When the AP exam describes a behavior and asks which perspective explains it, it's testing whether you can match the lens to the explanation.",
    objectives: [
      "Know that Wundt (1879) founded the first psych lab and used introspection.",
      "Contrast structuralism (Wundt/Titchener) with functionalism (James).",
      "Identify the major modern perspectives and what each emphasizes.",
      "Match a described behavior to the perspective that best explains it.",
    ],
    sections: [
      {
        title: "From philosophy to science",
        body:
          "Wundt and his student Titchener founded structuralism: they tried to break consciousness into its basic elements using introspection — trained self-reports of inner experience. The method was unreliable (people's reports varied), so structuralism faded, but the goal of studying the mind experimentally stuck.\n\nWilliam James pushed back with functionalism. Influenced by Darwin, James asked not what the mind is made of but what it is for — how mental processes help an organism adapt and survive. That 'why does this behavior help?' question still drives the evolutionary perspective today.",
        terms: [
          { term: "Introspection", def: "Examining and reporting your own conscious experience — structuralism's main (and flawed) method." },
          { term: "Structuralism", def: "Early school (Wundt, Titchener) that analyzed consciousness into its basic elements." },
          { term: "Functionalism", def: "Early school (James) that studied how mental processes help organisms adapt to their environment." },
        ],
      },
      {
        title: "The modern perspectives — each a lens",
        body:
          "Today psychologists explain behavior from several angles. The behavioral perspective focuses on observable, learned responses; the cognitive on how we process and store information; the biological on genes, brain, and neurochemistry; the psychodynamic on unconscious drives and early experience; the humanistic on growth and free will; the sociocultural on how culture and others shape us; and the evolutionary on traits that aided survival.\n\nThink of one behavior — say, aggression. The biological perspective points to the amygdala and testosterone; the behavioral to rewarded past aggression; the cognitive to hostile interpretations; the sociocultural to cultural norms. All can be partly right at once.",
        terms: [
          { term: "Biological perspective", def: "Explains behavior through genes, brain structures, and neurotransmitters." },
          { term: "Cognitive perspective", def: "Explains behavior through how we perceive, process, and remember information." },
          { term: "Psychodynamic perspective", def: "Explains behavior through unconscious conflicts and early childhood experience." },
          { term: "Sociocultural perspective", def: "Explains behavior through cultural, social, and situational influences." },
        ],
        example:
          "AP-style prompt: 'A student is anxious only before exams.' Biological: stress hormones; Cognitive: catastrophic thoughts ('I'll fail'); Behavioral: a past bad exam was punishing; Sociocultural: family pressure to achieve. The 'best' answer depends on which cause the scenario emphasizes.",
        traps: [
          "Treating the perspectives as competing truths where one is 'right.' Each is a LENS emphasizing different factors — choosing a perspective means choosing what to study, not declaring the others wrong. AP multiple choice often gives a scenario and asks WHICH lens best explains it.",
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 1, lessonNum: 2,
    unitName: "Scientific Foundations of Psychology",
    title: "Research Methods — Experiments, Correlations, Statistics",
    subtitle: "How psychology actually knows things — and why 'they're correlated' never means 'one caused the other.'",
    overview:
      "Psychology is a science because it tests ideas with evidence, not opinion. But not all evidence is equal. The single most tested idea in this unit is the difference between methods that can show CAUSATION and methods that can only show a RELATIONSHIP.\n\nOnly one method lets you claim cause and effect: the experiment, because it uses random assignment to rule out other explanations. Everything else — surveys, case studies, correlations — can describe and predict, but cannot prove that one thing causes another.",
    objectives: [
      "Explain why only experiments (with random assignment) can show causation.",
      "Identify the independent variable, dependent variable, and confounds.",
      "Interpret a correlation coefficient's sign and strength — and its limits.",
      "Read basic descriptive statistics and the meaning of statistical significance.",
    ],
    diagram: "scatter-regression",
    sections: [
      {
        title: "The experiment: the only path to cause",
        body:
          "In an experiment you manipulate one thing — the independent variable (IV) — and measure its effect on another — the dependent variable (DV). The magic ingredient is random assignment: each participant has an equal chance of landing in the experimental or control group. That randomly evens out other differences (age, mood, ability), so if the groups differ at the end, the IV is the likely cause.\n\nA confounding variable is anything besides the IV that could explain the result. Random assignment is what controls confounds — which is exactly why correlational studies (no random assignment) can't establish cause.",
        terms: [
          { term: "Independent variable (IV)", def: "The factor the experimenter manipulates." },
          { term: "Dependent variable (DV)", def: "The outcome that is measured." },
          { term: "Random assignment", def: "Placing participants in groups by chance, balancing confounds and enabling causal claims." },
          { term: "Confounding variable", def: "An uncontrolled factor that offers an alternative explanation for the results." },
        ],
      },
      {
        title: "Correlation: relationship, not cause",
        body:
          "A correlation measures how two variables move together, from −1 (perfect negative) through 0 (none) to +1 (perfect positive). Ice-cream sales and drownings are positively correlated — but ice cream doesn't cause drowning. A third variable (hot weather) drives both. That's the third-variable problem, and it's why 'correlation does not imply causation' is the most repeated line in the course.\n\nCorrelations are still useful: they let us predict. If two things reliably move together, knowing one helps estimate the other — we just can't say which (if either) causes which.",
        terms: [
          { term: "Correlation coefficient (r)", def: "A number from −1 to +1 showing the strength and direction of a linear relationship." },
          { term: "Third-variable problem", def: "An outside variable that explains a correlation between two others." },
          { term: "Statistical significance", def: "A result unlikely to be due to chance (typically p < .05) — not the same as 'large' or 'important.'" },
        ],
        example:
          "Students who sleep more get higher grades (r = +0.4). Tempting conclusion: sleep causes good grades. But conscientiousness could cause BOTH more sleep and more studying. Only a sleep experiment with random assignment could show cause.",
        traps: [
          "Reading a correlation as causation. A positive r tells you two things rise together — nothing about why. On the exam, if there was no random assignment, you cannot claim one variable caused the other.",
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 1, lessonNum: 3,
    unitName: "Scientific Foundations of Psychology",
    title: "Biological Bases of Behavior — The Neuron",
    subtitle: "Every thought, feeling, and movement begins as an electrical-then-chemical signal in a single cell.",
    overview:
      "Before we talk about brains, we have to talk about the cell that builds them: the neuron. Your nervous system has roughly 86 billion of them, and they all do one core job — receive a signal, decide whether it's strong enough, and pass it on.\n\nThe trick the exam loves is this: signals travel two different ways. WITHIN a neuron the signal is electrical (the action potential racing down the axon). BETWEEN neurons it's chemical (neurotransmitters floating across the synapse). Keep those two straight and most of this unit clicks.",
    objectives: [
      "Label the parts of a neuron and what each does.",
      "Explain the all-or-none action potential and the resting potential.",
      "Describe how neurotransmitters cross the synapse and are cleared by reuptake.",
      "Connect specific neurotransmitters (dopamine, serotonin, GABA) to their roles.",
    ],
    diagram: "neuron",
    sections: [
      {
        title: "Anatomy of a neuron",
        body:
          "A signal enters through the dendrites — branchlike receivers — and gathers at the cell body (soma). If it's strong enough, it fires down the axon, a long cable often wrapped in a fatty myelin sheath that speeds the signal like insulation on a wire. At the end, axon terminals hand the message to the next cell.\n\nMyelin matters: in multiple sclerosis the myelin breaks down and signals slow or fail, which is a favorite real-world example on the exam.",
        terms: [
          { term: "Dendrites", def: "Branched extensions that receive incoming signals from other neurons." },
          { term: "Axon", def: "The long fiber that carries the signal away from the cell body to the terminals." },
          { term: "Myelin sheath", def: "Fatty insulation around the axon that speeds neural transmission." },
        ],
      },
      {
        title: "The action potential — all or nothing",
        body:
          "At rest, the neuron holds a slightly negative charge (the resting potential), like a loaded spring. Incoming signals add up; if they cross the threshold, the neuron fires a full electrical impulse — the action potential. It never fires 'halfway': it's all-or-none. A stronger stimulus doesn't make a bigger spike; it makes the neuron fire more often.",
        terms: [
          { term: "Resting potential", def: "The neuron's stable negative charge before firing." },
          { term: "Threshold", def: "The level of stimulation needed to trigger an action potential." },
          { term: "All-or-none principle", def: "A neuron fires at full strength or not at all once threshold is reached." },
        ],
        traps: [
          "Thinking a stronger stimulus makes a bigger action potential. It doesn't — intensity is coded by how OFTEN the neuron fires (firing rate), not by the size of each spike.",
        ],
      },
      {
        title: "Crossing the synapse",
        body:
          "Between neurons is a tiny gap, the synapse. The electrical signal can't jump it, so the terminal releases chemical messengers — neurotransmitters — that drift across and bind to receptors on the next neuron's dendrites, like a key in a lock. Leftover neurotransmitter is reabsorbed by the sending neuron in a process called reuptake (many antidepressants work by blocking it).\n\nKnow a few by role: dopamine (reward, movement), serotonin (mood, sleep), GABA (the main inhibitor that calms the brain), and acetylcholine (muscle action and memory).",
        terms: [
          { term: "Synapse", def: "The gap between neurons where chemical signaling occurs." },
          { term: "Neurotransmitter", def: "A chemical messenger that carries the signal across the synapse." },
          { term: "Reuptake", def: "Reabsorption of leftover neurotransmitter by the sending neuron." },
        ],
        example:
          "SSRIs (a class of antidepressant) block the reuptake of serotonin, leaving more of it in the synapse to keep stimulating the next neuron — which over weeks can lift mood.",
      },
    ],
  },
];
