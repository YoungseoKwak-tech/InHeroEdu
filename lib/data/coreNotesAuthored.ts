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
  {
    courseId: "ap-psychology", unit: 2, lessonNum: 1,
    unitName: "Biological Bases of Behavior",
    title: "The Brain — Structures and Functions",
    subtitle: "A tour from the survival machinery at the base to the thinking cap on top — and the tools that let us watch it work.",
    overview:
      "The brain is organized roughly bottom-to-top and oldest-to-newest: the lower, older structures handle automatic survival; the higher, newer cortex handles thought. Learn the map by that logic and it sticks.",
    diagram: "brain-lobes",
    objectives: [
      "Locate the major brain structures and state each one's job.",
      "Distinguish the brainstem, limbic system, and cerebral cortex.",
      "Match the four cortical lobes to their functions.",
      "Compare the tools (EEG, fMRI, lesion) used to study the brain.",
    ],
    sections: [
      {
        title: "Bottom to top: the brain's division of labor",
        body:
          "At the base, the brainstem runs automatic survival: the medulla controls heartbeat and breathing. The cerebellum ('little brain') coordinates balance and movement. Above sits the limbic system — the emotion-and-memory core. On top, the wrinkled cerebral cortex does perception, language, and reasoning.",
        table: {
          headers: ["Structure", "Main job"],
          rows: [
            ["Medulla", "Heartbeat, breathing (vital reflexes)"],
            ["Cerebellum", "Balance, coordination, motor skills"],
            ["Thalamus", "Sensory relay station (except smell)"],
            ["Hypothalamus", "Hunger, thirst, temperature, the 4 F's"],
            ["Amygdala", "Fear and emotional response"],
            ["Hippocampus", "Forming new long-term memories"],
            ["Cerebral cortex", "Thinking, perception, language"],
          ],
        },
        keyIdea: "Lower = automatic survival; higher = flexible thought. The hippocampus makes memories; the amygdala makes fear.",
      },
      {
        title: "The four lobes of the cortex",
        body:
          "The cortex splits into four lobes. The frontal lobe handles judgment, planning, and voluntary movement (and matures last — relevant to teen decision-making). The parietal lobe processes touch and space. The temporal lobe handles hearing and language. The occipital lobe, at the very back, processes vision.",
        table: {
          headers: ["Lobe", "Processes"],
          rows: [
            ["Frontal", "Judgment, planning, movement, personality"],
            ["Parietal", "Touch and body position (somatosensory)"],
            ["Temporal", "Hearing and language"],
            ["Occipital", "Vision"],
          ],
        },
        keyIdea: "Mnemonic: the occipital lobe is at the BACK — your eyes are in front, but vision is processed in the rear.",
        traps: ["Damage to the occipital lobe can cause blindness even with perfectly healthy eyes — vision is built in the brain, not the eye."],
      },
      {
        title: "Tools for studying the brain",
        body:
          "An EEG records electrical waves through scalp electrodes (great time resolution, used for sleep). An fMRI tracks blood-oxygen flow to show which areas are active (great spatial detail). Lesion studies destroy or observe damage to tissue to infer function.",
        terms: [
          { term: "EEG", def: "Records the brain's electrical activity via scalp electrodes; excellent timing." },
          { term: "fMRI", def: "Shows brain activity by tracking blood flow; excellent location detail." },
          { term: "Lesion", def: "Tissue damage (natural or induced) used to infer a region's function." },
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 2, lessonNum: 2,
    unitName: "Biological Bases of Behavior",
    title: "Genetics and Behavior — Nature vs. Nurture",
    subtitle: "It was never nature OR nurture — the real question is how genes and experience interact.",
    overview:
      "Almost every trait — intelligence, personality, mental illness — comes from genes AND environment working together. Psychology's job is to estimate how much each contributes and how they interact, using clever natural experiments.",
    objectives: [
      "Explain why nature and nurture interact rather than compete.",
      "Describe how twin and adoption studies separate genes from environment.",
      "Interpret heritability correctly (a population statistic, not an individual one).",
    ],
    sections: [
      {
        title: "Nature interacts with nurture",
        body:
          "Genes set a range of possibilities; environment determines where in that range you land. Even gene expression responds to experience — the field of epigenetics shows that stress, diet, and care can switch genes on or off without changing the DNA itself.",
        keyIdea: "Genes load the gun; environment pulls the trigger. Neither acts alone.",
        terms: [
          { term: "Heritability", def: "The proportion of variation in a trait, within a population, attributable to genes." },
          { term: "Epigenetics", def: "How experience switches genes on/off without changing the DNA sequence." },
          { term: "Temperament", def: "A person's inborn emotional reactivity and intensity, present early in life." },
        ],
      },
      {
        title: "How researchers tease them apart",
        body:
          "Because you can't randomly assign genes, psychologists use natural experiments. Twin studies compare identical twins (100% shared genes) with fraternal twins (~50%). Adoption studies compare adopted children with both their biological and adoptive families.",
        table: {
          headers: ["Study", "Compares", "What it isolates"],
          rows: [
            ["Identical twins", "Same genes, raised together/apart", "Effect of environment (genes held constant)"],
            ["Twin (identical vs. fraternal)", "100% vs. ~50% shared genes", "Effect of genes (environment similar)"],
            ["Adoption", "Child vs. biological & adoptive family", "Genes vs. rearing environment"],
          ],
        },
        keyIdea: "Identical twins raised apart who still share a trait = strong evidence for a genetic influence on that trait.",
        traps: ["Heritability describes VARIATION in a group, not an individual. '50% heritable' never means 'half of your height came from genes.'"],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 3, lessonNum: 1,
    unitName: "Sensation and Perception",
    title: "Sensation — Thresholds and Transduction",
    subtitle: "How raw physical energy — light, sound, pressure — gets turned into signals your brain can read.",
    overview:
      "Sensation is detecting physical energy from the world; perception is interpreting it. This lesson is about the detecting side: how sense organs convert energy into neural signals (transduction) and the limits of what we can detect (thresholds).",
    objectives: [
      "Distinguish sensation from perception and define transduction.",
      "Compare absolute threshold and difference threshold (and Weber's law).",
      "Explain sensory adaptation and signal detection theory.",
    ],
    sections: [
      {
        title: "Sensation, perception, and transduction",
        body:
          "Every sense does the same basic trick: transduction — converting one form of energy (light waves, sound waves, pressure) into the electrochemical signals neurons use. The eye transduces light; the ear transduces sound. Sensation delivers the raw data; perception (next lesson) makes meaning of it.",
        keyIdea: "Sensation = bottom-up raw detection. Perception = top-down interpretation. Transduction is the bridge.",
        terms: [
          { term: "Sensation", def: "Detecting physical energy from the environment with sense organs." },
          { term: "Transduction", def: "Converting physical energy into neural signals the brain can use." },
          { term: "Perception", def: "Organizing and interpreting sensory information into meaning." },
        ],
      },
      {
        title: "Thresholds: the limits of detection",
        body:
          "The absolute threshold is the minimum stimulus you can detect 50% of the time (e.g., a candle flame ~30 miles away on a clear night). The difference threshold (or just-noticeable difference, JND) is the smallest change you can detect. Weber's law says that change must be a constant PERCENTAGE, not a fixed amount — adding 1 lb is obvious on a 5-lb bag, invisible on a 100-lb load.",
        table: {
          headers: ["Threshold", "Means", "Example"],
          rows: [
            ["Absolute threshold", "Faintest stimulus detectable 50% of the time", "A faint ticking watch in a quiet room"],
            ["Difference threshold (JND)", "Smallest detectable CHANGE", "Noticing one extra voice in a choir"],
          ],
        },
        keyIdea: "Weber's law: we detect change as a percentage. A $5 difference matters on a $20 shirt, not on a $5,000 laptop.",
        traps: ["Don't swap them: ABSOLUTE threshold = can you detect it at all; DIFFERENCE threshold = can you detect a change."],
      },
      {
        title: "Sensory adaptation",
        body:
          "Keep a constant stimulus and your sensitivity to it fades — that's sensory adaptation. You stop feeling your clothes, smell your own room less, or stop hearing a steady hum. It's useful: it frees attention for changes, which are what usually matter.",
        example:
          "Walk into a bakery and the smell is overwhelming; ten minutes later you barely notice it. The molecules are still there — your receptors have adapted, dialing down a constant signal so changes stand out.",
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 3, lessonNum: 2,
    unitName: "Sensation and Perception",
    title: "Perception — Top-Down Processing and Gestalt Principles",
    subtitle: "Your brain doesn't just receive the world — it actively builds it, using rules, expectations, and shortcuts.",
    overview:
      "Perception is where raw sensation becomes meaning. The big theme: your brain is not a passive camera. It organizes incomplete, messy input into whole objects using built-in rules (Gestalt principles) and prior knowledge (top-down processing).",
    objectives: [
      "Distinguish bottom-up from top-down processing.",
      "Apply the Gestalt principles of perceptual organization.",
      "Explain perceptual constancy and key depth cues.",
    ],
    sections: [
      {
        title: "Two directions of processing",
        body:
          "Bottom-up processing starts with the raw sensory data and builds up to a whole — useful for a brand-new stimulus. Top-down processing starts with your expectations and knowledge and works down, filling gaps. Reading sloppy handwriting works because top-down expectation tells you what the word probably is.",
        keyIdea: "Bottom-up = data first. Top-down = expectation first. A schema (mental framework) is what powers top-down perception.",
        terms: [
          { term: "Bottom-up processing", def: "Building perception from raw sensory input upward." },
          { term: "Top-down processing", def: "Using prior knowledge and expectations to interpret sensory input." },
          { term: "Perceptual set", def: "A readiness to perceive things a certain way based on expectation/context." },
        ],
      },
      {
        title: "Gestalt principles: the whole > the parts",
        body:
          "Gestalt psychologists showed the brain organizes pieces into wholes using predictable rules. The most fundamental is figure-ground (picking an object out from its background); the rest group elements together.",
        table: {
          headers: ["Principle", "We tend to…"],
          rows: [
            ["Figure-ground", "Separate an object (figure) from its background"],
            ["Proximity", "Group things that are close together"],
            ["Similarity", "Group things that look alike"],
            ["Closure", "Fill in gaps to see a complete object"],
            ["Continuity", "See smooth, continuous lines rather than broken ones"],
          ],
        },
        keyIdea: "'The whole is different from the sum of its parts' — Gestalt's core claim. You see a face, not a list of features.",
      },
      {
        title: "Constancy and depth",
        body:
          "Perceptual constancy lets you see an object as stable even as its image changes — a door is still rectangular as it swings, a friend stays the same size as they walk away. We judge depth using binocular cues (needing both eyes, like retinal disparity — the slight difference between each eye's image) and monocular cues (one eye is enough, like relative size, interposition, and linear perspective).",
        terms: [
          { term: "Perceptual constancy", def: "Perceiving objects as unchanging (in size, shape, color) despite changing images." },
          { term: "Retinal disparity", def: "A binocular depth cue: the brain compares the two eyes' slightly different images." },
          { term: "Monocular cues", def: "Depth cues that work with one eye (relative size, interposition, linear perspective)." },
        ],
        traps: ["Bottom-up vs top-down: if the question stresses raw features assembling into a whole, it's bottom-up; if it stresses expectation/context shaping what you see, it's top-down."],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 4, lessonNum: 1,
    unitName: "Learning and Cognition",
    title: "Classical Conditioning — Pavlov and Applications",
    subtitle: "Learning that two things go together — until a neutral cue triggers a reflex on its own.",
    overview:
      "Classical conditioning is learning by association. A neutral stimulus gets paired with something that already triggers an automatic reflex, until the neutral stimulus alone triggers the reflex. Pavlov's dogs salivated to a bell because the bell had been paired with food.",
    objectives: [
      "Identify the UCS, UCR, CS, and CR in any conditioning scenario.",
      "Explain acquisition, extinction, spontaneous recovery, generalization, and discrimination.",
      "Recognize classical conditioning in real life (fears, advertising, taste aversions).",
    ],
    sections: [
      {
        title: "The four building blocks",
        body:
          "The whole topic rests on four terms. Before learning, food (the unconditioned stimulus) naturally causes salivation (the unconditioned response). A bell starts neutral. After pairing the bell with food repeatedly, the bell becomes the conditioned stimulus, and salivation to the bell is the conditioned response.",
        table: {
          headers: ["Term", "In Pavlov's study", "Rule of thumb"],
          rows: [
            ["UCS (unconditioned stimulus)", "Food", "Triggers the reflex naturally"],
            ["UCR (unconditioned response)", "Salivation to food", "The automatic, unlearned reaction"],
            ["CS (conditioned stimulus)", "Bell (after pairing)", "Was neutral; now triggers the response"],
            ["CR (conditioned response)", "Salivation to bell", "The learned reaction (often same behavior as UCR)"],
          ],
        },
        keyIdea: "Find the UCS first (what triggers the reflex without learning). The thing paired with it becomes the CS.",
      },
      {
        title: "Key processes of conditioning",
        body:
          "Acquisition is the initial learning of the association. If you present the CS repeatedly without the UCS, the CR fades — extinction. After a rest, it can briefly return — spontaneous recovery. Generalization is responding to stimuli similar to the CS; discrimination is learning to respond only to the specific CS.",
        terms: [
          { term: "Acquisition", def: "Initial learning of the CS–UCS association." },
          { term: "Extinction", def: "The CR weakens when the CS is repeatedly shown without the UCS." },
          { term: "Spontaneous recovery", def: "Reappearance of an extinguished CR after a pause." },
          { term: "Generalization / Discrimination", def: "Responding to similar stimuli vs. only the specific CS." },
        ],
        example:
          "A child bitten by a dog (UCS → fear UCR) may fear that dog, then all dogs (generalization), even on TV. Over time, calm exposure to friendly dogs without harm can extinguish the fear.",
        traps: ["The CS is whatever was NEUTRAL before pairing. Don't label the natural trigger (food, a loud noise) as the CS."],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 4, lessonNum: 2,
    unitName: "Learning and Cognition",
    title: "Operant Conditioning — Reinforcement and Punishment",
    subtitle: "Learning from consequences: behaviors that are rewarded repeat; behaviors that are punished fade.",
    overview:
      "Where classical conditioning links two stimuli, operant conditioning (Skinner) links a behavior to its consequence. Reinforcement makes a behavior more likely; punishment makes it less likely. The trick is that 'positive' and 'negative' mean ADD and REMOVE — not good and bad.",
    objectives: [
      "Distinguish the four consequences using the add/remove × increase/decrease grid.",
      "Explain why negative reinforcement is not punishment.",
      "Compare reinforcement schedules and their effects on behavior.",
    ],
    sections: [
      {
        title: "The four consequences — read it as a grid",
        body:
          "Two questions define every consequence. Does it INCREASE behavior (reinforcement) or DECREASE it (punishment)? And does it ADD a stimulus (positive) or REMOVE one (negative)? 'Positive' and 'negative' are math signs, not value judgments.",
        table: {
          headers: ["", "Add a stimulus (+)", "Remove a stimulus (−)"],
          rows: [
            ["Increase behavior (Reinforcement)", "Positive reinforcement: give a treat", "Negative reinforcement: stop a nagging alarm"],
            ["Decrease behavior (Punishment)", "Positive punishment: add a scolding", "Negative punishment: take away the phone"],
          ],
        },
        keyIdea: "Reinforcement always INCREASES behavior; punishment always DECREASES it. Positive = add, Negative = remove.",
        traps: ["Negative reinforcement is NOT punishment. It removes something unpleasant to INCREASE a behavior (taking aspirin to end pain makes you take aspirin again)."],
      },
      {
        title: "Schedules of reinforcement",
        body:
          "When you reinforce matters as much as whether you reinforce. Ratio schedules reward after a number of responses; interval schedules reward after time. Fixed is predictable; variable is unpredictable — and variable schedules produce the steadiest, most addiction-resistant responding (think slot machines).",
        table: {
          headers: ["Schedule", "Reward after…", "Everyday example"],
          rows: [
            ["Fixed-ratio", "A set # of responses", "Buy 10 coffees, get 1 free"],
            ["Variable-ratio", "An unpredictable # of responses", "Slot machines (highest, steadiest rate)"],
            ["Fixed-interval", "A set amount of time", "A weekly paycheck"],
            ["Variable-interval", "An unpredictable amount of time", "Checking for a text reply"],
          ],
        },
        keyIdea: "Variable-ratio is the most powerful schedule — unpredictable rewards are why gambling is so hard to quit.",
        terms: [
          { term: "Shaping", def: "Reinforcing successive approximations to build a complex behavior step by step." },
          { term: "Primary vs. secondary reinforcer", def: "Satisfies a biological need (food) vs. gains value by association (money)." },
        ],
      },
    ],
  },
];
