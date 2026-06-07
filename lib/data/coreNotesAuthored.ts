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
  {
    courseId: "ap-psychology", unit: 4, lessonNum: 3,
    unitName: "Learning and Cognition",
    title: "Memory — Encoding, Storage, and Retrieval",
    subtitle: "Memory isn't a recording — it's a three-step process of getting information in, holding it, and pulling it back out.",
    overview:
      "Memory works in three stages: encoding (getting information in), storage (holding it), and retrieval (getting it back out). A failure at any stage looks like 'forgetting.' The classic model also describes three stores the information passes through — sensory, short-term, and long-term — each with its own capacity and duration.",
    objectives: [
      "Describe the three processes (encoding, storage, retrieval) and three stores of memory.",
      "Explain techniques that strengthen encoding (chunking, rehearsal, spacing).",
      "Explain retrieval cues and why we forget (interference, retrieval failure).",
    ],
    sections: [
      {
        title: "Three stores: sensory → short-term → long-term",
        body:
          "Information first hits sensory memory, a split-second snapshot. Attention moves a little of it to short-term (working) memory, which holds about 7 items for ~20–30 seconds. Rehearsal and encoding transfer some into long-term memory, which is effectively unlimited and durable.",
        table: {
          headers: ["Store", "Duration", "Capacity"],
          rows: [
            ["Sensory memory", "A fraction of a second", "Huge but fleeting"],
            ["Short-term / working", "~20–30 seconds", "About 7 (±2) items"],
            ["Long-term memory", "Up to a lifetime", "Essentially unlimited"],
          ],
        },
        keyIdea: "Attention is the gate from sensory to short-term; rehearsal is the gate from short-term to long-term.",
      },
      {
        title: "Encoding: getting it to stick",
        body:
          "Some encoding tricks dramatically help. Chunking groups items into meaningful units (a phone number as 3 chunks, not 10 digits). The spacing effect shows distributed study beats cramming. Deep (semantic) encoding — processing meaning — beats shallow processing of sound or appearance. Mnemonics like the method of loci hang new items on familiar mental hooks.",
        keyIdea: "Studying a little each day (spacing) crushes one long cram — the single most useful memory finding for students.",
        terms: [
          { term: "Chunking", def: "Grouping items into meaningful units to expand short-term capacity." },
          { term: "Spacing effect", def: "Better long-term memory from study spread over time than massed cramming." },
          { term: "Levels of processing", def: "Deep (meaning-based) encoding produces stronger memories than shallow encoding." },
        ],
      },
      {
        title: "Retrieval and why we forget",
        body:
          "Retrieval cues — associations linked at encoding — trigger recall (context- and state-dependent memory rely on this). Recognition (multiple choice) is easier than recall (fill-in) because the cue is provided. Forgetting often comes from interference: proactive (old learning blocks new) and retroactive (new learning blocks old). The serial position effect explains why we best remember the first (primacy) and last (recency) items in a list.",
        terms: [
          { term: "Retrieval cue", def: "An association that helps trigger a stored memory." },
          { term: "Proactive interference", def: "Old learning disrupts recall of new information." },
          { term: "Retroactive interference", def: "New learning disrupts recall of old information." },
          { term: "Serial position effect", def: "Best recall for the first (primacy) and last (recency) items." },
        ],
        traps: ["Proactive = PRIOR learning interferes forward; retroactive = recent learning interferes backward. Map it by which learning came first."],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 5, lessonNum: 1,
    unitName: "Developmental Psychology",
    title: "Piaget's Cognitive Development Stages",
    subtitle: "Children aren't just less-smart adults — they think in qualitatively different ways that unfold in a fixed order.",
    overview:
      "Jean Piaget argued that children's thinking develops through four stages, each a new way of understanding the world. Kids build mental frameworks (schemas) and update them through assimilation and accommodation as they grow.",
    objectives: [
      "Explain schemas, assimilation, and accommodation.",
      "Sequence Piaget's four stages with their hallmark abilities and limits.",
      "Contrast Piaget with Vygotsky's social view of development.",
    ],
    sections: [
      {
        title: "How thinking grows: schemas update",
        body:
          "A schema is a mental framework for a concept. When new information fits an existing schema, that's assimilation (a child calls a zebra a 'horsey'). When the schema must change to fit reality, that's accommodation (learning zebras are their own thing). Development is constant assimilation and accommodation.",
        keyIdea: "Assimilation = fit new info INTO an old schema. Accommodation = CHANGE the schema to fit new info.",
        terms: [
          { term: "Schema", def: "A mental framework that organizes and interprets information." },
          { term: "Assimilation", def: "Fitting new experiences into an existing schema." },
          { term: "Accommodation", def: "Modifying a schema to incorporate new information." },
        ],
      },
      {
        title: "The four stages",
        body:
          "Each stage adds an ability and is limited by what hasn't developed yet. The two most-tested limits are the preoperational child's egocentrism and lack of conservation (not grasping that quantity stays the same despite a change in shape).",
        table: {
          headers: ["Stage", "Age", "Gains / Hallmark"],
          rows: [
            ["Sensorimotor", "0–2", "Object permanence (things exist when unseen)"],
            ["Preoperational", "2–7", "Symbols & language; BUT egocentric, no conservation"],
            ["Concrete operational", "7–11", "Conservation, logical thought about concrete things"],
            ["Formal operational", "12+", "Abstract & hypothetical reasoning"],
          ],
        },
        keyIdea: "Conservation (concrete stage) and object permanence (sensorimotor) are the two milestones the exam tests most.",
        traps: ["Egocentrism = can't take another's PERSPECTIVE; it is not selfishness."],
      },
      {
        title: "Beyond Piaget: Vygotsky",
        body:
          "Lev Vygotsky stressed the social side of development. Children learn within the zone of proximal development — the gap between what they can do alone and what they can do with help — through scaffolding (temporary guidance that's withdrawn as they master a skill). Modern research also shows Piaget underestimated young children's abilities.",
        terms: [
          { term: "Zone of proximal development", def: "The gap between what a learner can do alone vs. with guidance." },
          { term: "Scaffolding", def: "Temporary support from a more skilled person, removed as competence grows." },
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 5, lessonNum: 2,
    unitName: "Developmental Psychology",
    title: "Social Development — Attachment and Identity",
    subtitle: "From a baby's first bond to a teenager's search for self — the relationships that shape who we become.",
    overview:
      "Social development traces our bonds and sense of self across life. Early attachment to caregivers sets a template for later relationships, and Erikson mapped the whole lifespan as a series of social challenges, each one a turning point.",
    objectives: [
      "Summarize Harlow's and Ainsworth's attachment research and the attachment styles.",
      "Identify Erikson's key psychosocial stages and their central conflicts.",
      "Connect early attachment to later social outcomes.",
    ],
    sections: [
      {
        title: "Attachment: the first bond",
        body:
          "Harlow's monkeys chose a soft cloth 'mother' over a wire one that fed them, showing attachment grows from contact comfort, not just food. Ainsworth's Strange Situation then revealed distinct attachment styles based on how infants react to a caregiver leaving and returning.",
        table: {
          headers: ["Attachment style", "Behavior when caregiver leaves/returns"],
          rows: [
            ["Secure", "Distressed at leaving, comforted at return; uses caregiver as a safe base"],
            ["Avoidant", "Little distress; avoids/ignores caregiver at return"],
            ["Anxious (resistant)", "Intense distress; clingy yet hard to soothe at return"],
          ],
        },
        keyIdea: "Harlow's lesson: comfort and contact, not just feeding, build attachment.",
      },
      {
        title: "Erikson's psychosocial stages",
        body:
          "Erik Erikson described eight lifespan stages, each a conflict to resolve. You don't need all eight perfectly, but know the high-frequency ones — especially adolescence's identity vs. role confusion, where teens form a coherent sense of self.",
        table: {
          headers: ["Stage (age)", "Conflict", "Success looks like"],
          rows: [
            ["Infancy", "Trust vs. mistrust", "Basic security from reliable care"],
            ["Adolescence", "Identity vs. role confusion", "A clear sense of self"],
            ["Young adulthood", "Intimacy vs. isolation", "Close, committed relationships"],
            ["Middle adulthood", "Generativity vs. stagnation", "Contributing to the next generation"],
          ],
        },
        keyIdea: "Match the crisis to the age: identity = teens, intimacy = young adults, generativity = midlife.",
        traps: ["Identity vs. role confusion is the ADOLESCENCE stage — the most-tested Erikson conflict."],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 6, lessonNum: 1,
    unitName: "Motivation and Emotion",
    title: "Motivation — Theories and Hunger",
    subtitle: "What pushes us to act — and what the body's hunger system reveals about motivation in general.",
    overview:
      "Motivation is the 'why' behind behavior. Several theories each capture part of it, and hunger is the textbook case study because it shows biology and environment driving a single motivated behavior.",
    objectives: [
      "Compare the major theories of motivation.",
      "Sequence Maslow's hierarchy of needs.",
      "Explain the biology of hunger (hypothalamus, hormones, set point).",
    ],
    sections: [
      {
        title: "Theories of motivation",
        body:
          "No single theory explains all motivation, so know what each emphasizes. The exam often gives a scenario and asks which theory fits.",
        table: {
          headers: ["Theory", "Core idea"],
          rows: [
            ["Drive-reduction", "We act to reduce internal tension and restore balance (homeostasis)"],
            ["Arousal theory", "We seek an OPTIMAL level of arousal — not too low, not too high"],
            ["Incentive theory", "External rewards (incentives) pull behavior"],
            ["Maslow's hierarchy", "Needs are met in order, from basic survival up to self-actualization"],
          ],
        },
        keyIdea: "Yerkes-Dodson law: performance peaks at MODERATE arousal — too little and you're flat, too much and you choke.",
        terms: [
          { term: "Drive-reduction theory", def: "Motivation to reduce a physiological need and restore homeostasis." },
          { term: "Yerkes-Dodson law", def: "Performance is best at an optimal (moderate) level of arousal." },
        ],
      },
      {
        title: "Maslow's hierarchy of needs",
        body:
          "Maslow arranged needs in a pyramid: lower needs must be reasonably met before higher ones drive behavior. From the base up: physiological (food, water) → safety → love/belonging → esteem → self-actualization (reaching one's full potential).",
        keyIdea: "You can't focus on esteem or self-actualization while starving — basic needs come first.",
      },
      {
        title: "The biology of hunger",
        body:
          "The hypothalamus is the brain's hunger control center. The hormone ghrelin (from the stomach) signals hunger; leptin (from fat cells) signals fullness. The body also defends a set point — a weight it tends to return to, which is why dieting is hard.",
        terms: [
          { term: "Hypothalamus", def: "Brain region regulating hunger, thirst, and body temperature." },
          { term: "Ghrelin / Leptin", def: "Ghrelin signals hunger; leptin signals satiety (fullness)." },
          { term: "Set point", def: "The weight the body tends to defend, resisting change." },
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 6, lessonNum: 2,
    unitName: "Motivation and Emotion",
    title: "Emotion — Theories and Expression",
    subtitle: "Does your heart race because you're afraid, or are you afraid because your heart races? The theories disagree — on purpose.",
    overview:
      "An emotion blends three ingredients: physical arousal, a cognitive label, and expressive behavior. The famous theories disagree about the ORDER in which these happen — which is exactly what the exam tests.",
    objectives: [
      "Distinguish the major theories of emotion by the order of arousal, cognition, and feeling.",
      "Identify the brain and body systems involved in emotion.",
      "Explain universal expressions and the facial feedback hypothesis.",
    ],
    sections: [
      {
        title: "Theories of emotion — it's all about order",
        body:
          "Each theory arranges arousal, thinking, and feeling differently. Use a single scenario (you see a bear) to keep them straight.",
        table: {
          headers: ["Theory", "Order of events (you see a bear)"],
          rows: [
            ["James-Lange", "Body reacts first → you interpret the arousal as fear"],
            ["Cannon-Bard", "Arousal AND fear happen at the same time, independently"],
            ["Schachter-Singer (two-factor)", "Arousal + a cognitive LABEL together = emotion"],
            ["Lazarus", "Appraisal (even unconscious) comes first, then emotion"],
          ],
        },
        keyIdea: "James-Lange = body THEN feeling. Cannon-Bard = body AND feeling together. Two-factor = body + a label.",
        traps: ["The two-factor theory's key claim: the SAME arousal can become different emotions depending on how you label it."],
      },
      {
        title: "The body and brain of emotion",
        body:
          "Emotion runs on the autonomic nervous system — the sympathetic branch fires you up (fight-or-flight), the parasympathetic calms you down. The amygdala is central to fear and can trigger a response via a fast 'low road' before the thinking cortex is even involved.",
        terms: [
          { term: "Amygdala", def: "Limbic structure central to fear and rapid emotional response." },
          { term: "Sympathetic nervous system", def: "Arouses the body for fight-or-flight." },
        ],
      },
      {
        title: "Expressing emotion",
        body:
          "Paul Ekman found a set of basic emotions whose facial expressions are recognized across cultures — evidence they're biologically universal. The facial feedback hypothesis adds a twist: expressions feed back into feeling, so forcing a smile can actually nudge your mood upward.",
        terms: [
          { term: "Universal emotions", def: "Basic expressions (e.g., happiness, fear, anger) recognized across cultures (Ekman)." },
          { term: "Facial feedback hypothesis", def: "Facial expressions influence the emotions we feel, not just reflect them." },
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 7, lessonNum: 1,
    unitName: "Clinical Psychology",
    title: "Psychological Disorders — Classification and Diagnosis",
    subtitle: "When does behavior become a disorder — and how do clinicians decide which one?",
    overview:
      "A psychological disorder is a pattern of thoughts, feelings, or behaviors that is dysfunctional, distressing, and/or deviant. Clinicians classify disorders with the DSM and increasingly explain them through the interaction of biology, psychology, and environment.",
    objectives: [
      "Explain the criteria used to define a disorder and the role of the DSM.",
      "Compare the medical, biopsychosocial, and diathesis-stress models.",
      "Recognize the major categories of disorders and their hallmark symptoms.",
    ],
    sections: [
      {
        title: "Defining and diagnosing",
        body:
          "Psychologists weigh several criteria: is the behavior dysfunctional (interferes with daily life), distressing (to the person), and/or deviant (far from cultural norms)? The DSM is the standard manual that lists disorders and their diagnostic criteria so clinicians can agree on labels.",
        keyIdea: "Deviance alone isn't a disorder — context matters. Distress + dysfunction are the heavier criteria.",
        terms: [
          { term: "DSM", def: "The Diagnostic and Statistical Manual — the standard system for classifying disorders." },
          { term: "Dysfunction", def: "Interference with everyday functioning — a core criterion for a disorder." },
        ],
      },
      {
        title: "Models of disorder",
        body:
          "The medical model treats disorders as illnesses with physical causes and treatments. The broader biopsychosocial model says biology, psychology, and social environment all contribute. The diathesis-stress model is especially testable: a predisposition (diathesis) becomes a disorder only when triggered by enough stress.",
        keyIdea: "Diathesis-stress: vulnerability + stress = disorder. Neither alone is usually enough.",
        terms: [
          { term: "Biopsychosocial model", def: "Disorders arise from interacting biological, psychological, and social factors." },
          { term: "Diathesis-stress model", def: "A predisposition is activated into a disorder by environmental stress." },
        ],
      },
      {
        title: "Major categories at a glance",
        body:
          "Know the hallmark of each big category — the exam pairs symptoms to labels.",
        table: {
          headers: ["Category", "Hallmark"],
          rows: [
            ["Anxiety disorders", "Excessive fear/worry (phobias, GAD, panic)"],
            ["OCD", "Intrusive obsessions + repetitive compulsions"],
            ["Depressive disorders", "Prolonged sadness, loss of interest"],
            ["Bipolar disorder", "Mania alternating with depression"],
            ["Schizophrenia", "Hallucinations, delusions (positive); flat affect, withdrawal (negative)"],
          ],
        },
        traps: ["Schizophrenia 'positive' symptoms ADD something abnormal (hallucinations); 'negative' symptoms are the ABSENCE of normal function (flat affect)."],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 7, lessonNum: 2,
    unitName: "Clinical Psychology",
    title: "Biomedical Treatments",
    subtitle: "Treating disorders at the level of the brain — mostly with drugs that adjust neurotransmitters.",
    overview:
      "Biomedical treatments target the biology of disorders, most often by changing neurotransmitter activity with medication. They're frequently combined with therapy, and they connect directly back to the neurotransmitters you learned in Unit 1–2.",
    objectives: [
      "Match each drug class to the disorder it treats and the neurotransmitter it targets.",
      "Describe ECT and when it is used.",
      "Recognize side effects like tardive dyskinesia.",
    ],
    sections: [
      {
        title: "Drug therapies",
        body:
          "Most psychiatric drugs work at the synapse, raising or lowering a neurotransmitter's effect. Know the class, what it treats, and its mechanism in one line each.",
        table: {
          headers: ["Drug class", "Treats", "Mechanism"],
          rows: [
            ["Antidepressants (SSRIs)", "Depression, anxiety", "Block serotonin reuptake → more serotonin"],
            ["Anti-anxiety", "Anxiety", "Boost GABA → calms neural activity"],
            ["Antipsychotics", "Schizophrenia", "Block dopamine → reduce hallucinations/delusions"],
            ["Mood stabilizers (lithium)", "Bipolar disorder", "Levels out mania and depression"],
          ],
        },
        keyIdea: "SSRIs take WEEKS to work because the brain slowly adapts to the higher serotonin — not an instant fix.",
        terms: [
          { term: "SSRI", def: "Selective serotonin reuptake inhibitor; raises serotonin to treat depression/anxiety." },
          { term: "Tardive dyskinesia", def: "Involuntary movements that can result from long-term antipsychotic use." },
        ],
      },
      {
        title: "Beyond drugs",
        body:
          "Electroconvulsive therapy (ECT) sends a brief, controlled electrical current through the brain to trigger a seizure; despite its scary reputation, it's an effective last resort for severe, treatment-resistant depression. Newer options like transcranial magnetic stimulation (TMS) are less invasive. Psychosurgery (e.g., lobotomy) is essentially obsolete.",
        terms: [
          { term: "Electroconvulsive therapy (ECT)", def: "Brief electrical stimulation inducing a seizure; used for severe, drug-resistant depression." },
          { term: "TMS", def: "Transcranial magnetic stimulation; a non-invasive alternative for depression." },
        ],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 7, lessonNum: 3,
    unitName: "Clinical Psychology",
    title: "Psychological Therapies — CBT and Beyond",
    subtitle: "Talk-based treatments, each flowing from a perspective you already know — and the one (CBT) with the most evidence.",
    overview:
      "Each major therapy descends from a perspective from Unit 1. Psychoanalysis digs into the unconscious; humanistic therapy nurtures growth; behavioral therapy retrains responses; cognitive therapy fixes distorted thinking; and CBT combines the last two — today's most evidence-based approach.",
    objectives: [
      "Match each therapy to its parent perspective and core method.",
      "Explain key behavioral and cognitive techniques.",
      "Identify why CBT is widely used.",
    ],
    sections: [
      {
        title: "Therapies by school",
        body:
          "The exam loves to match a described technique to its therapy. Anchor each to its perspective.",
        table: {
          headers: ["Therapy", "From perspective", "Core method"],
          rows: [
            ["Psychoanalysis", "Psychodynamic", "Surface unconscious conflict (free association, dreams)"],
            ["Person-centered", "Humanistic", "Empathy & unconditional positive regard (Rogers)"],
            ["Behavioral", "Behavioral", "Recondition responses (exposure, desensitization)"],
            ["Cognitive", "Cognitive", "Challenge and change distorted thoughts"],
            ["CBT", "Cognitive + Behavioral", "Change both thoughts AND behaviors — most evidence-based"],
          ],
        },
        keyIdea: "CBT = cognitive (fix the thoughts) + behavioral (change the actions). It's the most strongly supported talk therapy.",
      },
      {
        title: "Key techniques",
        body:
          "Behavioral therapies use systematic desensitization — pairing gradual exposure to a feared thing with relaxation — and exposure therapy to extinguish conditioned fears. Cognitive therapy uses cognitive restructuring to replace catastrophic thoughts ('I'll fail everything') with realistic ones.",
        terms: [
          { term: "Systematic desensitization", def: "Gradual exposure to a fear paired with relaxation; a behavioral technique." },
          { term: "Cognitive restructuring", def: "Identifying and replacing distorted, maladaptive thoughts." },
          { term: "Unconditional positive regard", def: "Rogers's nonjudgmental acceptance that fosters growth in person-centered therapy." },
        ],
        traps: ["Match the technique to its school: free association → psychoanalysis; desensitization → behavioral; restructuring → cognitive."],
      },
    ],
  },
  {
    courseId: "ap-psychology", unit: 8, lessonNum: 1,
    unitName: "Social Psychology",
    title: "Social Influence — Conformity and Obedience",
    subtitle: "The classic studies showing that the situation — not just personality — drives much of human behavior.",
    overview:
      "Social psychology's big lesson is the power of the situation: ordinary people do surprising things under social pressure. Asch revealed conformity, Milgram revealed obedience, and a cluster of group effects shows how being around others changes us.",
    objectives: [
      "Distinguish normative from informational social influence.",
      "Summarize Asch's and Milgram's findings and what raises conformity/obedience.",
      "Define the major group effects (groupthink, bystander effect, social loafing).",
    ],
    sections: [
      {
        title: "Conformity — the Asch studies",
        body:
          "Asch had people judge obvious line lengths; when confederates gave wrong answers aloud, many participants conformed to the group's wrong answer. We conform for two reasons, and the exam tests the difference.",
        table: {
          headers: ["Type of influence", "We conform because…", "Result"],
          rows: [
            ["Normative", "We want acceptance / to avoid rejection", "Go along even when we privately disagree"],
            ["Informational", "We believe others know better", "Genuinely change our view"],
          ],
        },
        keyIdea: "Normative = fit in (social approval). Informational = be right (others as a source of truth).",
      },
      {
        title: "Obedience — the Milgram studies",
        body:
          "Milgram found ordinary people would deliver what they believed were dangerous shocks because an authority figure told them to. Obedience rose when the authority was nearby and legitimate, the victim was distant, and no one else disobeyed first.",
        terms: [
          { term: "Obedience", def: "Following the direct commands of an authority figure (Milgram)." },
          { term: "Foot-in-the-door", def: "Agreeing to a small request makes a larger one more likely later — a route to obedience." },
        ],
        traps: ["Conformity = matching peers/group; obedience = following an AUTHORITY's command. Don't mix them up."],
      },
      {
        title: "Group effects",
        body:
          "Being in a group changes behavior in predictable ways the exam pairs to scenarios.",
        table: {
          headers: ["Effect", "What happens"],
          rows: [
            ["Groupthink", "Desire for harmony suppresses dissent → bad decisions"],
            ["Group polarization", "Group discussion strengthens members' initial leanings"],
            ["Social facilitation", "Others' presence boosts performance on EASY tasks"],
            ["Social loafing", "People exert less effort in a group than alone"],
            ["Bystander effect", "Less likely to help when others are present (diffusion of responsibility)"],
          ],
        },
        keyIdea: "Fundamental attribution error: we blame others' behavior on their character and underrate the situation — the theme of the whole unit.",
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 1, lessonNum: 1,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "Song Dynasty China — Bureaucracy and Innovation",
    subtitle: "The era's most advanced state, run by exam-picked scholars and powered by a commercial revolution.",
    overview:
      "Around 1200, Song China was arguably the most prosperous, technologically advanced society on Earth. Two things drove it: a government staffed by merit through the civil service exam, and an economic boom fueled by new rice, new money, and old inventions finally scaling up.",
    objectives: [
      "Explain how the civil service exam and Neo-Confucianism shaped Song governance.",
      "Identify the causes and effects of the Song economic revolution.",
      "Describe the role of Buddhism and Confucian values in Song society.",
    ],
    sections: [
      {
        title: "Government by merit (sort of)",
        body:
          "The Song expanded the civil service examination, which tested mastery of Confucian classics to select officials. In theory this created a meritocracy of scholar-gentry rather than rule by hereditary nobles. Neo-Confucianism — a revival blending Confucian ethics with Buddhist and Daoist ideas — became the official ideology, stressing hierarchy, filial piety, and education.",
        keyIdea: "The exam made government more merit-based than Europe's — but wealthy families could afford tutors, so elites still dominated.",
        terms: [
          { term: "Civil service exam", def: "Merit-based test on Confucian classics used to select government officials." },
          { term: "Scholar-gentry", def: "The educated elite class that staffed the Song bureaucracy." },
          { term: "Neo-Confucianism", def: "A revived Confucianism (with Buddhist/Daoist elements) emphasizing hierarchy and duty." },
        ],
      },
      {
        title: "The economic revolution",
        body:
          "Fast-ripening Champa rice (from Vietnam) allowed two harvests a year, driving a population boom. Commerce exploded: the Song issued the world's first paper money, ran the vast Grand Canal linking north and south, and mass-produced iron, steel, and porcelain for export along the Silk Roads and Indian Ocean.",
        table: {
          headers: ["Cause", "Effect"],
          rows: [
            ["Champa rice (2 harvests)", "Population surge, urban growth"],
            ["Paper money & credit", "Booming trade and commerce"],
            ["Grand Canal", "Cheap internal transport, integrated economy"],
            ["Iron, steel, porcelain", "Major exports along trade routes"],
          ],
        },
        keyIdea: "Song China was a major EXPORTER (silk, porcelain) — foreign silver flowed in to pay for its goods.",
      },
      {
        title: "Belief and society",
        body:
          "Buddhism, especially the Chan (Zen) school, remained influential, while Neo-Confucianism reinforced a patriarchal social order — including the spread of foot binding among elites as a status marker. Confucian filial piety structured family and state alike.",
        terms: [
          { term: "Champa rice", def: "Fast-ripening, drought-resistant rice from Vietnam that boosted Chinese population." },
          { term: "Filial piety", def: "The Confucian duty of respect and obedience to parents and elders." },
        ],
        traps: ["The civil service exam is 'meritocratic' in theory, but preparation required wealth — don't overstate equality of opportunity."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 1, lessonNum: 2,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "Dar al-Islam — Political Fragmentation, Cultural Unity",
    subtitle: "The caliphates broke apart politically, yet a shared faith, language, and trade knit the Islamic world tighter than ever.",
    overview:
      "By 1200 the unified Abbasid Caliphate had fractured into rival states, often ruled by newcomers like Turkic peoples. But politically divided did not mean culturally divided: across these states stretched Dar al-Islam — 'the house of Islam' — bound by religion, the Arabic language, scholarship, and commerce.",
    objectives: [
      "Explain the political fragmentation of the Islamic world after the Abbasids.",
      "Describe the cultural and intellectual achievements that unified Dar al-Islam.",
      "Explain how trade and Sufism spread Islam.",
    ],
    sections: [
      {
        title: "Political fragmentation",
        body:
          "As Abbasid power waned, new Muslim states rose, frequently led by Turkic military groups who converted to Islam and then ruled. Power passed to soldiers and sultans even as the caliph remained a religious figurehead.",
        table: {
          headers: ["State", "Note"],
          rows: [
            ["Abbasid Caliphate", "Declining; caliph becomes a figurehead"],
            ["Seljuk Turks", "Turkic group that seized political/military power"],
            ["Mamluks (Egypt)", "State ruled by former enslaved soldiers"],
            ["Delhi Sultanate", "Muslim rule established over northern India"],
          ],
        },
        keyIdea: "Political map fractured, but Islam, Arabic, and trade kept the Islamic world culturally connected — that's the point of 'Dar al-Islam.'",
      },
      {
        title: "A golden age of learning",
        body:
          "Scholars in centers like Baghdad's House of Wisdom translated and preserved Greek and Roman texts (which later flowed to Europe and helped spark the Renaissance) and made original advances in mathematics (algebra), astronomy, and medicine. This intellectual flourishing was a shared inheritance across the fragmented states.",
        terms: [
          { term: "Dar al-Islam", def: "The 'house of Islam' — the lands and community united by the Islamic faith." },
          { term: "House of Wisdom", def: "Baghdad center of scholarship that preserved and expanded classical knowledge." },
        ],
      },
      {
        title: "How Islam spread",
        body:
          "Islam expanded less by conquest than by connection. Muslim merchants carried the faith along trade routes, and Sufism — a mystical, adaptable form of Islam — won converts by blending with local cultures across Africa and South/Southeast Asia.",
        terms: [
          { term: "Sufism", def: "Mystical Islam whose adaptable, personal spirituality eased conversion along trade routes." },
        ],
        traps: ["'Fragmentation' is POLITICAL; 'unity' is CULTURAL/religious. The exam contrasts the two deliberately."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 1, lessonNum: 3,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "South and Southeast Asia — Hinduism, Buddhism, and Trade",
    subtitle: "Religiously diverse states, many of them built and enriched by control of Indian Ocean trade.",
    overview:
      "South and Southeast Asia in this era were shaped by Hinduism, Buddhism, and a growing Muslim presence — and above all by trade. Sea-based states grew rich taxing the ships passing through, while land-based kingdoms built monumental temples.",
    objectives: [
      "Describe religious diversity and interaction in South Asia (Hindu, Buddhist, Muslim).",
      "Contrast sea-based and land-based states in Southeast Asia.",
      "Explain how Indian Ocean trade shaped these states.",
    ],
    sections: [
      {
        title: "South Asia: many faiths, one subcontinent",
        body:
          "Hinduism remained dominant, but the Delhi Sultanate brought Muslim rule to the north, producing centuries of Hindu–Muslim interaction (and tension). The bhakti movement, stressing personal devotion to a deity accessible to all castes, paralleled Sufism's emotional spirituality — both made religion more personal and crossed social barriers.",
        keyIdea: "Bhakti (Hindu) and Sufism (Muslim) both emphasized personal devotion open to everyone — a quiet bridge between the faiths.",
        terms: [
          { term: "Bhakti movement", def: "Hindu devotional movement emphasizing personal love of a deity, open across castes." },
          { term: "Delhi Sultanate", def: "Muslim dynasties ruling much of northern India (1206–1526)." },
        ],
      },
      {
        title: "Southeast Asia: sea states vs. land states",
        body:
          "Geography split the region into two kinds of power. Sea-based states grew wealthy controlling and taxing maritime trade through key straits; land-based states drew wealth from agriculture and built vast temple complexes.",
        table: {
          headers: ["State", "Type", "Known for"],
          rows: [
            ["Srivijaya", "Sea-based (Buddhist)", "Taxed ships through the Strait of Malacca"],
            ["Majapahit", "Sea-based (Buddhist)", "Java-based maritime power controlling trade"],
            ["Khmer Empire", "Land-based (Hindu→Buddhist)", "Angkor Wat temple complex"],
            ["Sukhothai", "Land-based (Buddhist)", "Early Thai kingdom"],
          ],
        },
        keyIdea: "Sea-based states = wealth from TRADE tolls; land-based states = wealth from AGRICULTURE and monumental building.",
        traps: ["Angkor Wat began HINDU and later became Buddhist — a classic example of religious syncretism via trade and contact."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 1, lessonNum: 4,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "Mali Empire — Trans-Saharan Trade and Islam",
    subtitle: "A West African empire so rich on gold and salt that one king's pilgrimage disrupted economies a continent away.",
    overview:
      "Mali rose in West Africa by controlling the trans-Saharan trade, where camel caravans carried gold north and salt south across the desert. Taxing that trade made Mali's rulers fabulously wealthy and helped spread Islam through the region's elite.",
    objectives: [
      "Explain how the trans-Saharan gold-salt trade powered Mali.",
      "Describe Mansa Musa's role and the spread of Islam in West Africa.",
      "Recognize the blend of Islam and traditional beliefs.",
    ],
    sections: [
      {
        title: "Wealth from gold and salt",
        body:
          "The Sahara was a sea of sand crossed by camel caravans — camels and the camel saddle made the routes possible. West Africa had abundant gold but needed salt (for preservation and health); North Africa had salt and craved gold. Mali sat astride the exchange and taxed it.",
        table: {
          headers: ["Flowed north", "Flowed south"],
          rows: [
            ["Gold", "Salt"],
            ["Enslaved people, ivory", "Textiles, horses, books"],
            ["", "Islam (carried by merchants)"],
          ],
        },
        keyIdea: "Mali didn't need to PRODUCE everything — it grew rich by CONTROLLING and taxing the trade that passed through.",
      },
      {
        title: "Mansa Musa and Islam",
        body:
          "Mali's most famous ruler, Mansa Musa, made a pilgrimage (hajj) to Mecca in 1324, distributing so much gold along the way that he reportedly caused inflation in Egypt. He brought back scholars and architects, turning Timbuktu into a renowned center of Islamic learning. Islam unified the elite and connected Mali to the wider Dar al-Islam.",
        terms: [
          { term: "Trans-Saharan trade", def: "Camel-caravan trade across the Sahara exchanging West African gold for salt and goods." },
          { term: "Mansa Musa", def: "Mali ruler whose 1324 hajj displayed the empire's enormous wealth." },
          { term: "Timbuktu", def: "Mali city that became a famous center of Islamic scholarship." },
        ],
        traps: ["Islam spread mainly among RULERS and merchants; many common people kept traditional beliefs (a syncretic blend)."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 1, lessonNum: 5,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "The Americas Before European Contact — Aztec and Inca",
    subtitle: "Two powerful empires that, cut off from Afro-Eurasia, solved the problems of ruling millions in strikingly different ways.",
    overview:
      "While Afro-Eurasia traded across oceans, the Americas developed separately. Two empires dominated: the Aztec in Mesoamerica and the Inca in the Andes. Both ruled millions through systems of labor and tribute — but their methods differed.",
    objectives: [
      "Describe Aztec political, economic, and religious organization.",
      "Describe Inca administration (roads, mit'a, quipu).",
      "Compare how each empire extracted resources and labor.",
    ],
    sections: [
      {
        title: "Aztec and Inca side by side",
        body:
          "The Aztec built their capital Tenochtitlan on a lake, farming with chinampas (floating gardens) and funding the state through a tribute system imposed on conquered peoples. The Inca stretched along the Andes, bound together by a vast road network, a labor tax called the mit'a, and record-keeping with knotted cords (quipu) — all without a writing system.",
        table: {
          headers: ["Feature", "Aztec", "Inca"],
          rows: [
            ["Region", "Mesoamerica (Mexico)", "Andes (South America)"],
            ["Capital", "Tenochtitlan (on a lake)", "Cusco"],
            ["Funding the state", "Tribute from conquered peoples", "Mit'a (labor tax)"],
            ["Records", "Pictographic writing", "Quipu (knotted cords)"],
            ["Farming feat", "Chinampas (floating gardens)", "Terraced mountainsides"],
          ],
        },
        keyIdea: "Both empires sustained huge populations by extracting LABOR and TRIBUTE — the Aztec via goods, the Inca via required work.",
        terms: [
          { term: "Chinampas", def: "Aztec floating garden plots enabling intensive agriculture." },
          { term: "Mit'a", def: "Inca mandatory public labor tax used for roads, terraces, and building." },
          { term: "Quipu", def: "Inca system of knotted cords for record-keeping (no writing system)." },
        ],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 1, lessonNum: 6,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "Comparing Postclassical States — Patterns of Continuity",
    subtitle: "Across China, the Islamic world, India, Africa, and the Americas, rulers reached for the same three tools of power.",
    overview:
      "This synthesis lesson steps back from individual states to see the patterns. Despite huge differences, states from Song China to Mali to the Inca legitimized and funded their rule using a common toolkit: bureaucracy, religion, and trade/tribute.",
    objectives: [
      "Identify shared methods states used to legitimize and consolidate power.",
      "Explain how belief systems reinforced political order across regions.",
      "Analyze continuity and change across the postclassical world.",
    ],
    sections: [
      {
        title: "The shared toolkit of power",
        body:
          "Compare the states and a pattern jumps out: each used administration to govern, a belief system to justify rule, and trade or tribute to pay for it. The specifics differed; the strategy didn't.",
        table: {
          headers: ["State", "Legitimized rule with", "Funded rule with"],
          rows: [
            ["Song China", "Neo-Confucianism, exam-based bureaucracy", "Commerce, taxes"],
            ["Dar al-Islam states", "Islam", "Trans-regional trade"],
            ["Delhi Sultanate", "Islam over a Hindu majority", "Land taxes"],
            ["Mali", "Islam + traditional authority", "Trans-Saharan trade tolls"],
            ["Aztec / Inca", "State religion", "Tribute / mit'a labor"],
          ],
        },
        keyIdea: "Bureaucracy + religion + trade/tribute = the universal recipe for holding a large state together in this era.",
      },
      {
        title: "Continuity and change",
        body:
          "Continuity: major belief systems (Confucianism, Islam, Hinduism, Buddhism) and long-distance trade networks persisted and deepened. Change: WHO ruled shifted — new groups (Turkic peoples, the Mongols soon after) seized power, and states grew larger and more commercially connected.",
        keyIdea: "When a synthesis question asks 'continuity vs. change,' belief systems & trade = continuity; ruling groups & scale = change.",
        terms: [
          { term: "Legitimacy", def: "The accepted right to rule, often granted by religion or tradition." },
          { term: "Tribute system", def: "Extracting goods/labor from subject peoples to fund the state." },
        ],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 2, lessonNum: 1,
    unitName: "Networks of Exchange (c. 1200–1450)",
    title: "The Silk Roads — Goods, Ideas, and Disease",
    subtitle: "The overland routes carried luxury goods, world religions, new technologies — and the Black Death.",
    overview:
      "The Silk Roads were a web of overland routes linking China to the Mediterranean. They moved more than silk: ideas, religions, technologies, and germs all traveled the same paths. As demand for Asian luxuries grew, so did the infrastructure that supported the trade.",
    objectives: [
      "Identify the goods, ideas, and diseases that traveled the Silk Roads.",
      "Explain the technologies and institutions that expanded overland trade.",
      "Analyze both the benefits and costs of increased connectivity.",
    ],
    sections: [
      {
        title: "What moved along the routes",
        body:
          "High-value, low-bulk luxuries dominated because they were worth the long journey. But the same routes carried religions, inventions, and — fatefully — disease.",
        table: {
          headers: ["Category", "Examples"],
          rows: [
            ["Goods", "Silk & porcelain (west); horses, gold, silver (east)"],
            ["Ideas / religion", "Buddhism, Islam; papermaking, gunpowder tech"],
            ["Disease", "The Black Death (bubonic plague) spread west"],
          ],
        },
        keyIdea: "The very connectivity that spread goods and ideas also spread the plague — connection cuts both ways.",
      },
      {
        title: "What made the trade work",
        body:
          "Long-distance trade needed support. Caravanserais — roadside inns — gave merchants and camels safe rest. Financial tools like Chinese paper money and 'flying cash' (credit) let traders move value without hauling coins. Camels and the camel saddle made desert stretches passable.",
        terms: [
          { term: "Caravanserai", def: "A roadside inn offering shelter and rest to merchants and caravans." },
          { term: "Flying cash", def: "An early Chinese credit/paper-money system that eased long-distance trade." },
        ],
        traps: ["Silk Roads carried LUXURY goods, not bulk staples — the distance only paid off for high-value items."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 2, lessonNum: 2,
    unitName: "Networks of Exchange (c. 1200–1450)",
    title: "The Mongol Empire — Destruction, Unification, and the Pax Mongolica",
    subtitle: "History's largest land empire was brutally violent in conquest — and then made Eurasian trade safer than ever.",
    overview:
      "The Mongols, united by Genghis Khan around 1206, conquered the largest contiguous land empire in history. The paradox the exam loves: their conquests were devastating, yet once in control they secured the trade routes and supercharged Eurasian exchange — the Pax Mongolica.",
    objectives: [
      "Describe Mongol conquest, organization, and the khanates.",
      "Explain the Pax Mongolica and its effects on trade and exchange.",
      "Analyze the Mongols as both destroyers and integrators.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "Conquest and rule",
        body:
          "Genghis Khan unified the Mongol tribes and built a fearsome, mobile cavalry army. His successors expanded until the empire was divided into regional khanates; Kublai Khan ruled China as the Yuan Dynasty. Pragmatic rulers, the Mongols often adopted local administrators and tolerated local religions.",
        keyIdea: "Conquest (brutal) → unification of Eurasia under one power → safer, busier trade routes. That causal chain is the lesson.",
        terms: [
          { term: "Genghis Khan", def: "United the Mongol tribes (~1206) and launched the conquests." },
          { term: "Khanate", def: "A regional division of the Mongol Empire ruled by a khan." },
          { term: "Yuan Dynasty", def: "Mongol-ruled dynasty of China under Kublai Khan." },
        ],
      },
      {
        title: "The Pax Mongolica",
        body:
          "Once the fighting stopped, the 'Mongol Peace' secured the Silk Roads under a single authority. Merchants, missionaries, and envoys (like Marco Polo) moved safely across Eurasia, spreading goods, technologies (gunpowder and printing moved west), and ideas — though the same open routes also helped spread the Black Death.",
        terms: [
          { term: "Pax Mongolica", def: "The period of stability under the Mongols that boosted Eurasian trade and exchange." },
        ],
        traps: ["Hold both truths: the Mongols were enormously DESTRUCTIVE in conquest AND enormously INTEGRATIVE for trade afterward."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 2, lessonNum: 3,
    unitName: "Networks of Exchange (c. 1200–1450)",
    title: "Indian Ocean Trade — Monsoon Routes and Swahili Coast",
    subtitle: "The era's largest trade network ran on a wind that reversed with the seasons.",
    overview:
      "The Indian Ocean carried more trade by volume than the Silk Roads, and it ran on the monsoon winds — predictable seasonal winds that let ships sail east in one season and west in another. This maritime web enriched port cities and created blended coastal cultures.",
    objectives: [
      "Explain how monsoon winds and maritime technology structured Indian Ocean trade.",
      "Describe the Swahili coast and merchant diaspora communities.",
      "Compare Indian Ocean trade with the overland Silk Roads.",
    ],
    sections: [
      {
        title: "Trade on the monsoon clock",
        body:
          "Merchants timed voyages to the monsoons: sail one direction in summer, wait, and ride the reversed winds home in winter. Because ships could carry far more than camels, BULKIER goods (timber, textiles, spices in quantity) joined the luxuries. Vessels like the Arab dhow used lateen sails to work the winds.",
        keyIdea: "Unlike the Silk Roads, sea trade could move HEAVY, bulky goods — volume was the Indian Ocean's advantage.",
        terms: [
          { term: "Monsoon winds", def: "Predictable seasonal winds that reversed direction, structuring Indian Ocean voyages." },
          { term: "Dhow", def: "An Arab sailing ship using lateen sails for Indian Ocean trade." },
        ],
      },
      {
        title: "Swahili coast and diaspora communities",
        body:
          "On East Africa's coast, trade produced the Swahili city-states — a syncretic culture and language blending Bantu African and Arab/Islamic influences. Merchants who settled far from home formed diasporic communities, spreading their language, religion, and customs and lubricating trade across the network.",
        terms: [
          { term: "Swahili city-states", def: "East African coastal trading centers blending Bantu and Arab/Islamic culture." },
          { term: "Diasporic community", def: "Merchants settled abroad who spread their culture and eased trade." },
        ],
        traps: ["Swahili culture is SYNCRETIC — African (Bantu) base + Arab/Islamic influence from trade, not one or the other."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 2, lessonNum: 4,
    unitName: "Networks of Exchange (c. 1200–1450)",
    title: "Trans-Saharan Trade — Gold, Salt, and Slaves",
    subtitle: "How a 'desert highway' of camel caravans linked West Africa to the Mediterranean and grew a string of wealthy empires.",
    overview:
      "The Sahara was not a barrier but a highway, crossed by camel caravans carrying gold north and salt south. As this trade intensified, it funded a succession of powerful West African empires and carried Islam deep into the region.",
    objectives: [
      "Explain how camel technology and caravans made trans-Saharan trade possible.",
      "Trace the succession of West African trading empires.",
      "Describe how the trade spread Islam.",
    ],
    sections: [
      {
        title: "The desert highway",
        body:
          "Two technologies opened the Sahara: the camel (which endures heat and thirst) and the camel saddle, which let traders load heavy cargo. Caravans linked oases across the desert, exchanging the two things each side lacked — West African gold for Saharan/North African salt — plus enslaved people, ivory, textiles, and books.",
        keyIdea: "Gold went north, salt came south. Whoever controlled the middle (the empires) grew rich taxing the exchange.",
        terms: [
          { term: "Camel saddle", def: "Technology that let camels carry heavy loads across the Sahara, expanding trade." },
          { term: "Caravan", def: "A group of traders and pack animals crossing the desert together for safety." },
        ],
      },
      {
        title: "Empires and Islam",
        body:
          "A line of empires rose on this trade, each larger than the last, while Islam spread along the routes — first among rulers and merchants, blending with traditional beliefs among the people.",
        table: {
          headers: ["Empire", "Note"],
          rows: [
            ["Ghana", "Early empire built on the gold-salt trade"],
            ["Mali", "Peak wealth; Mansa Musa, Timbuktu scholarship"],
            ["Songhai", "Later, even larger successor empire"],
          ],
        },
        keyIdea: "Ghana → Mali → Songhai: a chain of ever-larger empires all funded by the same trans-Saharan trade.",
        traps: ["Islam took hold mainly among elites/merchants; common people often kept traditional practices (syncretism)."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 2, lessonNum: 5,
    unitName: "Networks of Exchange (c. 1200–1450)",
    title: "The Role of Technology in Expanding Trade Networks",
    subtitle: "Trade exploded because the tools did — better ships, navigation, and money made distance cheaper.",
    overview:
      "The growth of trade in this era wasn't magic — it rode on technology. Innovations in sailing, navigation, and finance (much of it spread BY trade itself) let merchants travel farther, carry more, and move value safely.",
    objectives: [
      "Identify the maritime technologies that expanded sea trade.",
      "Explain commercial innovations like credit and paper money.",
      "Connect technological diffusion to the growth of trade networks.",
    ],
    sections: [
      {
        title: "Sailing and navigation tech",
        body:
          "Sea trade leapt forward with better ships and ways to find your way. Crucially, many of these technologies spread between cultures along the very trade routes they powered.",
        table: {
          headers: ["Technology", "What it did"],
          rows: [
            ["Lateen sail", "Triangular sail — lets ships sail against the wind"],
            ["Magnetic compass (China)", "Find direction at open sea"],
            ["Astrolabe", "Determine latitude from the stars"],
            ["Dhow / Junk", "Larger cargo ships (Arab dhow; Chinese junk)"],
          ],
        },
        keyIdea: "The compass and astrolabe (spread along trade routes) freed ships from hugging the coast — distance got cheaper.",
      },
      {
        title: "Commercial and overland tech",
        body:
          "On land, the camel saddle and caravanserais sustained desert routes. In finance, Chinese paper money and credit instruments ('flying cash'), plus banking houses, let merchants move value without carrying risky loads of coin — the financial plumbing of long-distance trade.",
        terms: [
          { term: "Compass", def: "Chinese navigational tool showing direction; spread along trade routes." },
          { term: "Banking / credit", def: "Financial tools (paper money, bills of exchange) that let traders move value safely." },
        ],
        traps: ["Many trade technologies were DIFFUSED along the routes (e.g., the compass from China) — they spread the same way goods did."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 2, lessonNum: 6,
    unitName: "Networks of Exchange (c. 1200–1450)",
    title: "Cultural Consequences of Exchange — Diffusion and Resistance",
    subtitle: "The deepest legacy of trade wasn't the goods — it was the religions, crops, ideas, and diseases that traveled with them.",
    overview:
      "Trade networks moved far more than merchandise. Religions, languages, crops, technologies, and diseases all diffused along the routes, reshaping societies. Some changes were embraced and blended (syncretism); some were resisted.",
    objectives: [
      "Identify the religions, crops, and ideas that diffused along trade routes.",
      "Explain the demographic impact of disease diffusion.",
      "Describe cultural blending (syncretism) and resistance.",
    ],
    sections: [
      {
        title: "What spread along the routes",
        body:
          "Cultural diffusion was the routes' lasting effect. Religions spread (Islam across Africa and Asia, Buddhism across East Asia), languages blended (Swahili), and crops moved (fast-growing Champa rice to China; bananas and citrus across the Indian Ocean), boosting populations.",
        table: {
          headers: ["What diffused", "Examples"],
          rows: [
            ["Religion", "Islam (Africa, S/SE Asia), Buddhism (East Asia)"],
            ["Language", "Swahili (Bantu + Arabic) on the East African coast"],
            ["Crops", "Champa rice → China; bananas, citrus spread by trade"],
            ["Technology", "Compass, papermaking, gunpowder"],
          ],
        },
        keyIdea: "New crops like Champa rice didn't just feed people — they triggered population BOOMS that reshaped whole societies.",
      },
      {
        title: "Disease, syncretism, and resistance",
        body:
          "The same connectivity carried the Black Death along trade routes, killing a huge share of affected populations. Culturally, contact usually produced syncretism — blending, as when Sufism merged with local traditions or Angkor Wat shifted from Hindu to Buddhist — though some groups resisted foreign influences.",
        terms: [
          { term: "Cultural diffusion", def: "The spread of cultural traits (religion, language, crops, tech) along contact networks." },
          { term: "Syncretism", def: "The blending of two cultural or religious traditions into something new." },
        ],
        traps: ["Connectivity's costs ride along with its benefits — the routes that spread crops and faiths also spread the plague."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 3, lessonNum: 1,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "Ottoman Empire — Gunpowder, Devshirme, and Expansion",
    subtitle: "A Sunni Muslim empire that conquered with cannon and governed with a loyal slave-soldier elite.",
    overview:
      "The Ottoman Empire was the longest-lived of the 'gunpowder empires.' It expanded through superior firearms — famously taking Constantinople in 1453 — and ran on two distinctive institutions: the devshirme that produced its elite Janissary soldiers, and the millet system that managed its many religions.",
    objectives: [
      "Explain how gunpowder weapons fueled Ottoman expansion.",
      "Describe the devshirme system and the Janissaries.",
      "Explain how the millet system governed religious diversity.",
    ],
    sections: [
      {
        title: "Conquest by gunpowder",
        body:
          "The Ottomans mastered cannon and firearms. In 1453, their massive cannon breached the walls of Constantinople, ending the Byzantine Empire and giving them control of a key crossroads between Europe and Asia (which they renamed Istanbul). Under Suleiman the Magnificent the empire reached its height.",
        keyIdea: "1453: Ottoman cannon take Constantinople → Byzantine Empire ends; gunpowder reshapes who holds power.",
        terms: [
          { term: "Janissaries", def: "Elite Ottoman infantry recruited as boys through the devshirme; loyal directly to the sultan." },
          { term: "Suleiman the Magnificent", def: "Sultan under whom the Ottoman Empire reached its territorial and cultural peak." },
        ],
      },
      {
        title: "Devshirme and governing diversity",
        body:
          "The devshirme took Christian boys from conquered lands, converted them to Islam, and trained them as soldiers (Janissaries) or administrators loyal to the sultan — an elite created OUTSIDE the hereditary nobility. To rule a multi-religious empire, the millet system let each religious community govern its own internal affairs under its own laws while paying taxes.",
        terms: [
          { term: "Devshirme", def: "Ottoman system of recruiting and converting Christian boys for state/military service." },
          { term: "Millet system", def: "Ottoman policy granting religious communities self-governance under their own laws." },
        ],
        traps: ["Janissaries were technically enslaved Christian-born converts — their loyalty to the sultan came from being outside the noble families."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 3, lessonNum: 2,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "Safavid Empire — Shi'a Islam as State Identity",
    subtitle: "A Persian empire that made Shi'a Islam its official identity — and lit a Sunni–Shia rivalry that still echoes today.",
    overview:
      "The Safavid Empire in Persia stands out for making Shi'a Islam the state religion, which sharply distinguished it from its Sunni Ottoman and Mughal neighbors and fueled lasting conflict. Under Shah Abbas it enjoyed a golden age of trade and the arts.",
    objectives: [
      "Explain how Shi'a Islam shaped Safavid identity and conflict.",
      "Describe Shah Abbas's reforms and the empire's golden age.",
      "Compare the Safavids with the other gunpowder empires.",
    ],
    sections: [
      {
        title: "Religion as state identity",
        body:
          "The Safavids imposed Shi'a Islam as the official faith, a deliberate identity distinct from the Sunni Ottomans next door. This religious difference turned into political and military rivalry — Sunni vs. Shia conflict that shaped the region for centuries.",
        keyIdea: "Making Shi'a Islam the STATE religion set the Safavids against their Sunni neighbors — religion became geopolitics.",
        terms: [
          { term: "Shi'a Islam", def: "The branch of Islam the Safavids made their official state religion." },
        ],
      },
      {
        title: "Shah Abbas and the golden age",
        body:
          "Shah Abbas modernized the military with gunpowder weapons, centralized power, promoted the silk trade, and built the magnificent capital of Isfahan — a peak of Safavid art and architecture.",
        terms: [
          { term: "Shah Abbas", def: "Safavid ruler who modernized the army, boosted trade, and built up Isfahan." },
          { term: "Isfahan", def: "The splendid Safavid capital, a showcase of Persian art and architecture." },
        ],
        traps: ["The Safavid–Ottoman conflict was Shia vs. Sunni — a religious divide driving political rivalry, not just a border dispute."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 3, lessonNum: 3,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "Mughal Empire — Akbar's Tolerance and Revenue Systems",
    subtitle: "A Muslim dynasty ruling a Hindu-majority India — held together by tolerance, then strained by its abandonment.",
    overview:
      "The Mughal Empire ruled a vast, mostly Hindu population. Its greatest ruler, Akbar, governed through religious tolerance and an efficient revenue system. Later, Aurangzeb's reversal of that tolerance helped weaken the empire — a clear cause-and-effect the exam loves.",
    objectives: [
      "Explain how Akbar's tolerance and administration unified a diverse empire.",
      "Describe the Mughal revenue/zamindar system.",
      "Analyze how Aurangzeb's policies contributed to decline.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "Akbar: tolerance as strategy",
        body:
          "Akbar, a Muslim ruling a Hindu majority, made tolerance a tool of stability: he abolished the jizya (the tax on non-Muslims), included Hindus in his government, and even hosted interfaith debates. Revenue was collected through zamindars (local tax officials), funding a strong central state.",
        keyIdea: "Akbar's tolerance wasn't just kindness — it was smart politics for keeping a Hindu-majority empire loyal.",
        terms: [
          { term: "Akbar", def: "Tolerant Mughal emperor who integrated Hindus and abolished the jizya." },
          { term: "Jizya", def: "A tax on non-Muslims; abolishing it (Akbar) eased Hindu–Muslim relations." },
          { term: "Zamindar", def: "Local official who collected taxes for the Mughal state." },
        ],
      },
      {
        title: "Decline under Aurangzeb",
        body:
          "Later, the emperor Aurangzeb reversed course: he reimposed the jizya and persecuted non-Muslims. This alienated the Hindu majority and fueled rebellions, weakening the empire — a direct cause→effect of abandoning Akbar's tolerant model.",
        terms: [
          { term: "Aurangzeb", def: "Mughal emperor whose religious intolerance (reimposed jizya) fueled unrest and decline." },
        ],
        traps: ["Contrast Akbar (tolerance → stability) with Aurangzeb (intolerance → revolt). The exam tests this cause-and-effect directly."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 3, lessonNum: 4,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "Qing Dynasty — Manchu Rule and Han Chinese Continuity",
    subtitle: "Foreign conquerors who ran China by keeping the Confucian system — while guarding their own Manchu identity.",
    overview:
      "The Qing were Manchus — outsiders from the north who conquered China. Like the Mongols before them, they ruled a Han Chinese majority by adopting the existing Confucian bureaucracy, even as they preserved a separate Manchu identity and expanded the empire to its greatest size.",
    objectives: [
      "Explain how the Manchu Qing legitimized rule over Han Chinese.",
      "Describe Qing expansion and restricted foreign trade.",
      "Compare Qing rule to other foreign-led dynasties.",
    ],
    sections: [
      {
        title: "Manchu rulers, Chinese system",
        body:
          "To govern the Han majority, the Qing kept the civil service exam and Confucian bureaucracy — continuity that legitimized foreign rule. Yet they also enforced Manchu identity, requiring Han men to wear the queue (a Manchu hairstyle) as a sign of submission and reserving top posts for Manchus.",
        keyIdea: "Like the Mongol Yuan, the Qing were FOREIGN rulers who kept the LOCAL Confucian system to legitimize their rule.",
        terms: [
          { term: "Manchu", def: "The northern people who conquered China and founded the Qing dynasty." },
          { term: "Queue", def: "The Manchu-imposed hairstyle Han men had to wear as a sign of submission." },
        ],
      },
      {
        title: "Expansion and limited trade",
        body:
          "The Qing expanded China to its largest territorial extent. Confident and largely self-sufficient, they restricted European traders to the single port of Canton (the Canton system), limiting foreign influence — a stance that would later collide with industrializing Europe.",
        terms: [
          { term: "Canton system", def: "Qing policy restricting European trade to the single port of Canton." },
        ],
        traps: ["The Qing weren't simply 'anti-trade' — they tightly CONTROLLED it (one port) because they felt little need for European goods."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 3, lessonNum: 5,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "Russian Empire — Expansion East and Westernization",
    subtitle: "An empire that swallowed Siberia, bound its peasants in serfdom, and then deliberately remade itself on a Western model.",
    overview:
      "The Russian Empire under the Romanovs expanded eastward across Siberia to the Pacific while its economy rested on serfdom. Then Peter the Great forced a top-down westernization to compete with Europe — a defining theme of Russian history.",
    objectives: [
      "Describe Russian eastward expansion and the role of serfdom.",
      "Explain Peter the Great's westernizing reforms.",
      "Compare Russian serfdom to labor systems elsewhere.",
    ],
    sections: [
      {
        title: "Expansion and serfdom",
        body:
          "Russia expanded east across Siberia, gaining furs and territory all the way to the Pacific. Its agrarian economy depended on serfdom, which bound peasants to the land and their lords. Tsars worked to control the boyars (nobility) and centralize power.",
        keyIdea: "Russian serfdom lasted FAR longer than Western Europe's — it wasn't abolished until 1861.",
        terms: [
          { term: "Serfdom", def: "A system binding peasants to the land and their lord; central to Russia's economy." },
          { term: "Boyars", def: "The Russian nobility, whose power the tsars sought to limit." },
        ],
      },
      {
        title: "Peter the Great westernizes",
        body:
          "Peter the Great traveled to Western Europe and returned determined to modernize. He reformed the army and bureaucracy, imposed Western customs (famously taxing beards), and built a new capital, St. Petersburg, as a 'window to the West.'",
        terms: [
          { term: "Peter the Great", def: "Tsar who modernized and westernized Russia and built St. Petersburg." },
        ],
        traps: ["Westernization was TOP-DOWN and forced by the tsar — not a grassroots cultural shift."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 3, lessonNum: 6,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "Gunpowder Empires — Common Patterns and Differences",
    subtitle: "Five land empires, one playbook: conquer with gunpowder, legitimize with religion, govern with bureaucracy.",
    overview:
      "Step back and the land-based empires share a striking pattern. Each used gunpowder weapons to expand, a belief system to legitimize rule, and a centralized bureaucracy funded by taxes to hold it together. Their differences lie mostly in WHICH religion and HOW they handled diversity.",
    objectives: [
      "Identify the common features of the gunpowder empires.",
      "Compare how each legitimized and funded its rule.",
      "Analyze differences in religious policy.",
    ],
    sections: [
      {
        title: "Five empires, side by side",
        body:
          "Compare them and the shared toolkit is obvious — only the details change.",
        table: {
          headers: ["Empire", "Religion", "Distinctive feature"],
          rows: [
            ["Ottoman", "Sunni Islam", "Devshirme/Janissaries; millet system"],
            ["Safavid", "Shi'a Islam", "Religion as state identity → Sunni rivalry"],
            ["Mughal", "Islam (Hindu majority)", "Akbar's tolerance, then Aurangzeb's reversal"],
            ["Qing", "Confucianism", "Foreign Manchu rulers keep Chinese system"],
            ["Russia", "Orthodox Christianity", "Serfdom; forced westernization"],
          ],
        },
        keyIdea: "Common recipe: gunpowder armies + religion to legitimize + centralized bureaucracy funded by taxes/land.",
      },
      {
        title: "Patterns and differences",
        body:
          "All centralized power, patronized art and architecture (Isfahan, the Taj Mahal, St. Petersburg), and relied on tax/land revenue systems. The biggest differences were religious: the Sunni–Shia split set Ottomans against Safavids, and rulers differed in tolerance (Akbar) vs. enforcement (Aurangzeb, the Qing queue).",
        keyIdea: "When comparing empires, the SAME structures repeat — focus your answer on the religious and tolerance DIFFERENCES.",
        terms: [
          { term: "Gunpowder empires", def: "Land empires (Ottoman, Safavid, Mughal — sometimes Qing/Russia) that expanded using firearms." },
        ],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 1,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "European Maritime Expansion — Causes and Technology",
    subtitle: "Why a few small kingdoms on Europe's edge suddenly sailed across the world's oceans — and what made it possible.",
    overview:
      "Around 1450, European states began long-distance ocean voyages that would reshape the globe. The motives are summed up as 'God, gold, and glory,' and a new toolkit of borrowed sailing technologies made the voyages survivable.",
    objectives: [
      "Explain the economic, religious, and political motives for exploration.",
      "Identify the technologies that enabled oceanic voyages.",
      "Explain why states sponsored exploration.",
    ],
    sections: [
      {
        title: "Why Europe took to the sea",
        body:
          "Several pressures pushed Europe outward. The Ottomans controlled the overland routes to Asia, so Europeans sought a SEA route to the lucrative spice trade. Rulers wanted wealth and power, and missionaries wanted converts.",
        table: {
          headers: ["Motive", "Drive"],
          rows: [
            ["Gold (economic)", "Direct sea access to Asian spices & wealth"],
            ["God (religious)", "Spread Christianity"],
            ["Glory (political)", "National prestige and rival competition"],
          ],
        },
        keyIdea: "Ottoman control of land routes to Asia is what pushed Europeans to gamble on a SEA route — a key cause.",
      },
      {
        title: "The enabling technology",
        body:
          "Europeans combined borrowed innovations: the caravel (a maneuverable ship), the lateen sail (to sail against the wind), and the magnetic compass and astrolabe (for navigation out of sight of land). State sponsorship — and soon joint-stock companies — funded the risky voyages.",
        terms: [
          { term: "Caravel", def: "A small, maneuverable European ship suited to ocean exploration." },
          { term: "Astrolabe", def: "Instrument for finding latitude from the stars, aiding open-sea navigation." },
          { term: "Joint-stock company", def: "A business pooling investors' money to fund (and share the risk of) voyages." },
        ],
        traps: ["Much exploration tech (compass, lateen sail) was ADOPTED from other cultures via trade — not invented from scratch in Europe."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 2,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "The Columbian Exchange — Biological Consequences",
    subtitle: "The largest biological event in human history: continents that had been separate for millennia suddenly swapped crops, animals, and germs.",
    overview:
      "After 1492, the Americas and Afro-Eurasia exchanged plants, animals, and diseases on a massive scale — the Columbian Exchange. Its biological consequences reshaped populations on every continent, for better in the Old World and catastrophically in the New.",
    objectives: [
      "Identify what was exchanged between hemispheres.",
      "Explain the demographic catastrophe in the Americas.",
      "Explain how American crops boosted Old World populations.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "What crossed the ocean",
        body:
          "Goods flowed both ways. From the Old World came horses, cattle, wheat, sugar — and deadly diseases. From the Americas came calorie-rich crops that would transform global diets.",
        table: {
          headers: ["Old World → Americas", "Americas → Old World"],
          rows: [
            ["Horses, cattle, pigs", "Potatoes, maize (corn)"],
            ["Wheat, sugar, coffee", "Tomatoes, cacao, tobacco"],
            ["Smallpox, measles (disease)", "(few diseases went east)"],
          ],
        },
        keyIdea: "The exchange was lopsided: the Old World sent devastating DISEASES; the Americas sent transformative CROPS.",
      },
      {
        title: "A demographic earthquake",
        body:
          "Old World diseases like smallpox — to which Native Americans had no immunity — killed an estimated 80–90% of the indigenous population, the largest demographic catastrophe in history, and it enabled European conquest. Meanwhile, American crops (especially the potato and maize) caused population BOOMS across Europe, Africa, and Asia.",
        terms: [
          { term: "Columbian Exchange", def: "The transfer of plants, animals, and diseases between the hemispheres after 1492." },
          { term: "Smallpox", def: "An Old World disease that devastated immunity-lacking Native American populations." },
        ],
        traps: ["The disease deaths were UNINTENTIONAL but decisive — they, more than weapons, made conquest possible."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 3,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "Spanish Colonialism — Encomienda and Casta System",
    subtitle: "How Spain ran its American empire: coerced indigenous labor and a rigid, race-based social ladder.",
    overview:
      "Spain built a vast American empire after conquering the Aztec and Inca. It extracted wealth through coerced labor systems like the encomienda and ordered society with the casta system, a hierarchy based on race and birthplace.",
    objectives: [
      "Describe Spanish conquest and the encomienda labor system.",
      "Explain the casta racial hierarchy.",
      "Connect coerced labor to the demographic collapse.",
    ],
    sections: [
      {
        title: "Conquest and coerced labor",
        body:
          "Conquistadors toppled the Aztec and Inca, helped massively by disease. To exploit the land, Spain used the encomienda, which granted colonists the right to demand labor and tribute from indigenous people — brutal in practice. As the native population collapsed, Spain turned increasingly to enslaved Africans.",
        keyIdea: "Indigenous population collapse (disease) + labor demand → the encomienda, and then the Atlantic slave trade.",
        terms: [
          { term: "Conquistadors", def: "Spanish soldiers who conquered the American empires." },
          { term: "Encomienda", def: "A grant giving Spanish colonists the right to demand indigenous labor and tribute." },
        ],
      },
      {
        title: "The casta system",
        body:
          "Spanish America was organized by a racial hierarchy, the casta system. Birthplace and ancestry determined status and rights, with European-born at the top.",
        table: {
          headers: ["Group", "Who"],
          rows: [
            ["Peninsulares", "Spanish-born; highest status and offices"],
            ["Creoles", "American-born of Spanish parents; wealthy but blocked from top posts"],
            ["Mestizos", "Mixed European–indigenous ancestry"],
            ["Indigenous & enslaved Africans", "Bottom of the hierarchy"],
          ],
        },
        keyIdea: "Resentment of creoles (rich but barred from the top by peninsulares) would later fuel Latin American independence.",
        traps: ["The casta system ranked people by RACE and BIRTHPLACE — a rigid social order, not just informal prejudice."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 4,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "Atlantic Slave Trade — Scale, Causes, and Effects",
    subtitle: "The forced migration of roughly 12 million Africans — and the brutal Atlantic economy that demanded them.",
    overview:
      "To work the plantations and mines of the Americas after indigenous populations collapsed, Europeans turned to enslaved Africans. Over centuries, around 12 million were forcibly shipped across the Atlantic in the deadly Middle Passage, devastating African societies and powering a triangular trade.",
    objectives: [
      "Explain the causes of the Atlantic slave trade.",
      "Describe the triangular trade and the Middle Passage.",
      "Analyze the demographic and political effects on Africa.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "The triangular trade",
        body:
          "The Atlantic ran on a three-legged exchange. European manufactured goods went to Africa; enslaved Africans were shipped to the Americas via the horrific Middle Passage; and American raw materials (sugar, tobacco, silver) flowed back to Europe.",
        table: {
          headers: ["Leg", "From → To", "Cargo"],
          rows: [
            ["1", "Europe → Africa", "Guns, textiles, rum"],
            ["2 (Middle Passage)", "Africa → Americas", "Enslaved people (brutal, deadly)"],
            ["3", "Americas → Europe", "Sugar, tobacco, silver"],
          ],
        },
        keyIdea: "Root cause: demand for plantation cash-crop and mining labor + indigenous population collapse → enslaved African labor.",
      },
      {
        title: "Effects on Africa",
        body:
          "Removing millions of mostly young men distorted African demographics, skewing gender ratios and disrupting families and economies. Some coastal African states grew powerful by capturing and selling captives, while the broader continent suffered lasting harm.",
        terms: [
          { term: "Middle Passage", def: "The brutal transatlantic voyage transporting enslaved Africans to the Americas." },
          { term: "Triangular trade", def: "The three-legged Atlantic exchange of goods and enslaved people among Europe, Africa, and the Americas." },
        ],
        traps: ["The trade reshaped AFRICA too — gender imbalance, depopulation, and the rise of slave-trading states — not only the Americas."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 5,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "Silver Trade — Global Economy Begins",
    subtitle: "American silver flowed all the way to China — creating the first truly global economy.",
    overview:
      "Vast silver deposits in Spanish America (especially Potosí) were mined and shipped worldwide. Because China demanded silver for its economy, the metal circled the globe — linking the Americas, Europe, and Asia into the first genuinely global trade network.",
    objectives: [
      "Trace the global flow of American silver.",
      "Explain why China was a silver 'sink.'",
      "Analyze the silver trade's economic effects.",
    ],
    sections: [
      {
        title: "Silver circles the globe",
        body:
          "Mined at Potosí (Bolivia) and in Mexico, silver flowed two ways: east across the Atlantic to Europe, and west across the Pacific on the Manila galleons to Asia. China, which had shifted to a silver-based economy and demand for it, absorbed enormous amounts in exchange for silk, porcelain, and tea.",
        keyIdea: "American silver → Europe AND across the Pacific to China = the first time trade truly circled the whole globe.",
        terms: [
          { term: "Potosí", def: "The massive silver mine in Spanish America (Bolivia) that fueled global trade." },
          { term: "Manila galleons", def: "Ships carrying American silver across the Pacific to Asia in exchange for Asian goods." },
        ],
      },
      {
        title: "Economic effects",
        body:
          "Silver made Spain temporarily rich but also caused inflation (the 'price revolution') as money flooded Europe. China became a silver sink, deepening its role in global trade. The result was a connected world economy where a mine in the Andes affected prices in Ming China.",
        terms: [
          { term: "Price revolution", def: "European inflation caused by the influx of American silver." },
          { term: "Silver sink", def: "China's absorption of huge quantities of the world's silver." },
        ],
        traps: ["Spain's silver wealth was double-edged — it funded the empire but caused inflation and didn't build a lasting productive economy."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 6,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "Coercive Labor Systems Compared",
    subtitle: "Across the early-modern world, empires extracted labor by force — but the forms differed in who, where, and how harsh.",
    overview:
      "This synthesis lesson compares the era's coerced labor systems. All were driven by demand for cash crops and minerals, but they varied: chattel slavery was hereditary and race-based, while others (encomienda, mita, serfdom, indentured servitude) bound labor in different ways.",
    objectives: [
      "Compare the major coerced labor systems.",
      "Explain the common economic driver behind them.",
      "Distinguish chattel slavery from other coerced labor.",
    ],
    sections: [
      {
        title: "Forms of coerced labor",
        body:
          "Each system extracted labor under compulsion, but the terms and targets differed.",
        table: {
          headers: ["System", "Where", "Nature"],
          rows: [
            ["Chattel slavery", "Atlantic / Americas", "Hereditary, race-based, people as property"],
            ["Encomienda", "Spanish America", "Forced indigenous labor/tribute to colonists"],
            ["Mit'a", "Andes (Inca→Spanish)", "Rotational labor draft, used in silver mines"],
            ["Indentured servitude", "Various colonies", "Bound labor for a fixed term, then freedom"],
            ["Serfdom", "Russia / Eastern Europe", "Peasants bound to the land and lord"],
          ],
        },
        keyIdea: "All were driven by demand for cash crops and mining — but only chattel slavery was hereditary and race-based.",
      },
      {
        title: "Patterns",
        body:
          "The common thread was economic: Europe's plantations and mines needed cheap, controllable labor. The Atlantic system's defining feature was tying enslavement to RACE and making it inheritable — a break from older forms of bondage.",
        terms: [
          { term: "Chattel slavery", def: "Slavery in which people are property, hereditary and (in the Atlantic) race-based." },
          { term: "Indentured servitude", def: "Labor bound for a fixed term in exchange for passage, then freedom." },
        ],
        traps: ["Indentured servitude was temporary (then free); chattel slavery was permanent and inherited — don't equate them."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 7,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "Resistance to Colonial Rule",
    subtitle: "The conquered and enslaved were never passive — resistance ran from open revolt to quietly preserving culture.",
    overview:
      "Wherever there was colonial domination and slavery, there was resistance. It took many forms: armed rebellions, escape and self-governing communities, religious syncretism, and everyday acts of defiance that preserved identity and dignity.",
    objectives: [
      "Identify the varied forms of resistance to colonial rule and slavery.",
      "Give examples of indigenous and enslaved resistance.",
      "Explain how culture and religion served as resistance.",
    ],
    sections: [
      {
        title: "Many forms of resistance",
        body:
          "Resistance ranged from dramatic to subtle. Enslaved people staged revolts, escaped to form self-governing maroon communities, slowed work, and preserved African traditions. Indigenous peoples rebelled too — the Pueblo Revolt temporarily expelled the Spanish from New Mexico.",
        table: {
          headers: ["Form", "Example"],
          rows: [
            ["Open rebellion", "Pueblo Revolt; slave uprisings"],
            ["Escape / autonomy", "Maroon communities of escaped enslaved people"],
            ["Cultural preservation", "Keeping African languages, music, foodways"],
            ["Religious syncretism", "Vodou — blending African beliefs with Catholicism"],
          ],
        },
        keyIdea: "Preserving one's religion and culture under domination was itself a powerful, lasting form of resistance.",
        terms: [
          { term: "Maroon communities", def: "Settlements of escaped enslaved people who governed themselves." },
          { term: "Syncretism", def: "Blending traditions (e.g., Vodou) — a way to preserve identity under colonial rule." },
        ],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 4, lessonNum: 8,
    unitName: "Transoceanic Interconnections (c. 1450–1750)",
    title: "The Fur Trade and Northern Colonialism",
    subtitle: "In the cold north, colonization meant trade and alliances with Native nations — not plantations.",
    overview:
      "French, Dutch, and English colonies in northern North America followed a different model from Spain's. Instead of conquering dense populations for plantation labor, they built the fur trade, relying on partnerships and alliances with Native American nations.",
    objectives: [
      "Describe the fur trade and Native–European partnerships.",
      "Contrast northern colonialism with the Spanish plantation model.",
      "Explain why the models differed.",
    ],
    sections: [
      {
        title: "Trade, not plantations",
        body:
          "The French built their North American presence around the fur trade: traders (coureurs de bois) partnered with Native nations who trapped and supplied beaver pelts prized in Europe. This required cooperation and alliances rather than mass enslavement, though it still disrupted Native societies and drew them into European rivalries.",
        table: {
          headers: ["Model", "Spanish (south)", "French/Dutch (north)"],
          rows: [
            ["Economy", "Plantations & silver mining", "Fur trade"],
            ["Labor", "Coerced indigenous/African", "Native trapping partners"],
            ["Settlement", "Large settler society", "Fewer settlers, trade posts"],
            ["Relations", "Conquest & domination", "Alliances & exchange"],
          ],
        },
        keyIdea: "Northern colonialism ran on TRADE and ALLIANCE; Spanish colonialism ran on CONQUEST and forced LABOR.",
        terms: [
          { term: "Fur trade", def: "The North American trade in animal pelts that structured French/Dutch colonization." },
        ],
        traps: ["'Alliance-based' didn't mean harmless — the fur trade still devastated Native populations and pulled them into colonial wars."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 1,
    unitName: "Revolutions (c. 1750–1900)",
    title: "The Enlightenment and Atlantic Revolutions",
    subtitle: "A set of radical ideas about rights and government lit a chain of revolutions across the Atlantic world.",
    overview:
      "The Enlightenment was an intellectual movement that applied reason to politics and society, producing powerful new ideas: natural rights, the social contract, and popular sovereignty. These ideas directly inspired a wave of Atlantic revolutions.",
    objectives: [
      "Identify key Enlightenment thinkers and their core ideas.",
      "Explain how Enlightenment ideas challenged absolute rule.",
      "Connect the Enlightenment to the Atlantic revolutions.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "The ideas",
        body:
          "Enlightenment thinkers argued that government should rest on reason and the consent of the governed, not divine right. Their ideas became the vocabulary of revolution.",
        table: {
          headers: ["Thinker", "Big idea"],
          rows: [
            ["John Locke", "Natural rights (life, liberty, property); government by consent"],
            ["Rousseau", "Social contract; popular sovereignty"],
            ["Montesquieu", "Separation of powers (checks and balances)"],
            ["Voltaire", "Free speech, religious tolerance"],
          ],
        },
        keyIdea: "Locke's natural rights + Rousseau's popular sovereignty = the toolkit revolutionaries used to reject kings.",
        terms: [
          { term: "Natural rights", def: "Rights (life, liberty, property) that exist before government (Locke)." },
          { term: "Popular sovereignty", def: "The idea that government's authority comes from the people (Rousseau)." },
        ],
      },
      {
        title: "Ideas become revolutions",
        body:
          "These principles spread across the Atlantic and inspired revolution after revolution: the American (1776), French (1789), Haitian (1791), and Latin American independence movements all drew on Enlightenment ideals — though each applied them differently and unevenly.",
        keyIdea: "One body of ideas → a CHAIN of revolutions across the Atlantic — a textbook case of cause and effect.",
        traps: ["The same ideals produced very different outcomes (and hypocrisies) — e.g., 'all men are equal' alongside continued slavery."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 2,
    unitName: "Revolutions (c. 1750–1900)",
    title: "American and French Revolutions — Outcomes Compared",
    subtitle: "Two revolutions, the same Enlightenment ideals — wildly different paths and endings.",
    overview:
      "The American and French revolutions both invoked natural rights and popular sovereignty, but they unfolded very differently. The American produced a relatively stable republic; the French spiraled into radical violence and ended in Napoleon's empire.",
    objectives: [
      "Compare the causes and goals of the American and French revolutions.",
      "Explain why their outcomes diverged so sharply.",
      "Connect both to Enlightenment ideals.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "Two revolutions side by side",
        body:
          "Both rejected unaccountable rule using Enlightenment language, but their scope and violence differed dramatically.",
        table: {
          headers: ["", "American (1776)", "French (1789)"],
          rows: [
            ["Target", "British colonial rule", "Their own monarchy & social order"],
            ["Radicalism", "Moderate; preserved existing elites", "Radical; overturned monarchy, church, hierarchy"],
            ["Violence", "Limited (a war of independence)", "Extreme (Reign of Terror)"],
            ["Outcome", "Stable constitutional republic", "Chaos → Napoleon's empire"],
          ],
        },
        keyIdea: "Same ideals, different scope: America changed WHO ruled; France tried to remake society itself — hence the chaos.",
      },
      {
        title: "Why the outcomes diverged",
        body:
          "The American Revolution largely preserved the existing social structure (minus the British), making it more stable. The French Revolution attacked the entire old order — monarchy, nobility, church — unleashing the radical Reign of Terror before Napoleon seized power and spread revolutionary ideals (and conquest) across Europe.",
        terms: [
          { term: "Reign of Terror", def: "The radical, violent phase of the French Revolution (mass executions)." },
          { term: "Napoleon Bonaparte", def: "General-turned-emperor who ended the Revolution's chaos and spread its ideals by conquest." },
        ],
        traps: ["Don't assume 'revolution' = total social change. The American kept its elites; the French tried to overturn everything."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 3,
    unitName: "Revolutions (c. 1750–1900)",
    title: "Haitian Revolution — The Exception That Tests the Rule",
    subtitle: "The only successful large-scale slave revolt in history — and the most radical application of 'all men are created equal.'",
    overview:
      "The Haitian Revolution stands apart: enslaved people themselves overthrew French rule and founded an independent nation in 1804. It took the Enlightenment promise of equality further than any other Atlantic revolution — to the enslaved — and terrified slaveholding societies everywhere.",
    objectives: [
      "Describe the course and leaders of the Haitian Revolution.",
      "Explain why it was the most radical Atlantic revolution.",
      "Analyze its impact on the Atlantic world.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "The only successful slave revolution",
        body:
          "Inspired by the French Revolution's ideals, the enslaved majority of the French colony of Saint-Domingue rose up under leaders like Toussaint Louverture. After brutal fighting they defeated France and declared independence as Haiti in 1804 — the first nation born of a successful slave revolt and the first Black republic.",
        keyIdea: "Haiti applied 'all men are equal' to ENSLAVED people — the radical step other revolutions refused to take.",
        terms: [
          { term: "Toussaint Louverture", def: "Formerly enslaved leader of the Haitian Revolution." },
          { term: "Saint-Domingue", def: "The wealthy French sugar colony that became independent Haiti." },
        ],
      },
      {
        title: "Why it 'tested the rule'",
        body:
          "Other revolutions proclaimed equality while keeping slavery; Haiti's enslaved people forced the issue. The revolution both inspired enslaved people across the Americas and terrified slaveholding elites, who tried to isolate Haiti. It exposed the hypocrisy at the heart of the age of revolutions.",
        terms: [
          { term: "Haiti (1804)", def: "The independent nation created by the only successful large-scale slave revolt." },
        ],
        traps: ["Haiti is the 'exception' because it's the one revolution where the ENSLAVED won freedom and power — the others stopped short."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 4,
    unitName: "Revolutions (c. 1750–1900)",
    title: "Latin American Independence — Creole Revolutions",
    subtitle: "Independence led by resentful creole elites — which changed the rulers far more than the social order.",
    overview:
      "Spain's American colonies won independence in the early 1800s, but these were largely creole revolutions: led by American-born elites (creoles) who resented Spanish-born peninsulares. They threw off Spain yet preserved the existing social hierarchy.",
    objectives: [
      "Identify the leaders and causes of Latin American independence.",
      "Explain the role of creole resentment and Spain's weakness.",
      "Analyze why social hierarchies survived independence.",
    ],
    sections: [
      {
        title: "Creole-led revolutions",
        body:
          "Creoles were wealthy and educated but blocked from the highest offices by peninsulares — a resentment that, combined with Enlightenment ideals and Spain's weakness during the Napoleonic Wars, sparked independence. Leaders like Simón Bolívar and José de San Martín led the military campaigns.",
        keyIdea: "Creole resentment of peninsulares (rich but shut out of top posts) was the engine of Latin American independence.",
        terms: [
          { term: "Creoles", def: "American-born people of Spanish descent who led independence movements." },
          { term: "Simón Bolívar", def: "Creole general who liberated much of northern South America." },
        ],
      },
      {
        title: "New rulers, old order",
        body:
          "Independence swapped Spanish rulers for creole ones but largely left the social hierarchy intact: the casta order persisted and the mass of indigenous, enslaved, and mixed-race people saw little improvement. Politically free, socially unchanged.",
        terms: [
          { term: "Peninsulares", def: "Spanish-born colonists who had held the top colonial offices." },
        ],
        traps: ["Latin American independence changed WHO ruled (creoles, not Spain) but mostly preserved the social hierarchy — limited social revolution."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 5,
    unitName: "Revolutions (c. 1750–1900)",
    title: "Industrial Revolution — Britain First, Why?",
    subtitle: "Why did the machine age ignite in Britain and not somewhere else? It was a convergence of advantages.",
    overview:
      "The Industrial Revolution shifted production from hand labor to machines and factories, beginning in Britain around 1750. It wasn't luck — Britain had a rare combination of resources, capital, labor, and stability that no rival matched all at once.",
    objectives: [
      "Explain the factors that made Britain the first to industrialize.",
      "Identify the key innovations of the Industrial Revolution.",
      "Describe the factory system.",
    ],
    sections: [
      {
        title: "Why Britain first?",
        body:
          "Several advantages converged in Britain. The exam wants you to be able to list them.",
        table: {
          headers: ["Factor", "Why it mattered"],
          rows: [
            ["Coal & iron", "Cheap energy and material for machines"],
            ["Capital & banks", "Money to invest in factories"],
            ["Colonies & navy", "Raw materials in, markets for goods out"],
            ["Agricultural revolution", "Fewer farmers needed → labor freed for factories"],
            ["Rivers, ports, canals", "Cheap transport of goods"],
            ["Stable government", "Protected property and investment"],
          ],
        },
        keyIdea: "No single cause — it was the CONVERGENCE of coal, capital, colonies, labor, and stability that put Britain first.",
      },
      {
        title: "The innovations",
        body:
          "The breakthrough was harnessing new power. The steam engine (improved by James Watt) powered factories, railroads, and ships. The factory system gathered workers under one roof with machines and a strict division of labor, while textile inventions like the spinning jenny mechanized cloth-making.",
        terms: [
          { term: "Steam engine", def: "Machine converting coal-fired heat into power for factories, trains, and ships." },
          { term: "Factory system", def: "Concentrating workers and machines under one roof with division of labor and set schedules." },
        ],
        traps: ["The Agricultural Revolution was a PRECONDITION — by freeing up rural labor, it supplied the factory workforce."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 6,
    unitName: "Revolutions (c. 1750–1900)",
    title: "Social Effects of Industrialization",
    subtitle: "Factories didn't just change how things were made — they remade cities, classes, families, and politics.",
    overview:
      "Industrialization transformed society. People poured into cities, new social classes formed, working conditions were often brutal, and the backlash produced labor unions, reform laws, and radical ideologies like socialism.",
    objectives: [
      "Describe urbanization and the new class structure.",
      "Explain industrial working conditions and the responses to them.",
      "Connect industrialization to socialism and reform.",
    ],
    sections: [
      {
        title: "A new society",
        body:
          "Workers crowded into rapidly growing industrial cities (urbanization). A new middle class (the bourgeoisie — factory owners, professionals) rose, while a large industrial working class (the proletariat) labored for wages. Women and children worked long hours in factories and mines.",
        keyIdea: "Industrialization created two defining new classes: the middle-class bourgeoisie and the working-class proletariat.",
        terms: [
          { term: "Urbanization", def: "The rapid growth of cities as people moved to industrial work." },
          { term: "Bourgeoisie", def: "The industrial/commercial middle class of owners and professionals." },
          { term: "Proletariat", def: "The industrial working class who sold their labor for wages." },
        ],
      },
      {
        title: "Conditions and responses",
        body:
          "Early factories were dangerous, with long hours, low pay, and child labor. The response reshaped politics: workers formed labor unions to bargain collectively, governments passed reform laws (limiting child labor, hours), and Karl Marx's socialism/communism called for workers to overthrow the capitalist class.",
        terms: [
          { term: "Labor union", def: "A worker organization that bargains collectively for better conditions." },
          { term: "Marxism", def: "Marx's theory framing history as class struggle and calling for proletarian revolution." },
        ],
        traps: ["Industrialization's harms PRODUCED their own opposition — unions, reform laws, and socialism were all responses to it."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 7,
    unitName: "Revolutions (c. 1750–1900)",
    title: "Nationalism — Unification and Fragmentation",
    subtitle: "The same force that built new nations also tore old empires apart.",
    overview:
      "Nationalism — strong identification with one's nation — was the era's most powerful political force. It had two opposite effects: it UNIFIED divided peoples into new nation-states (Germany, Italy) and FRAGMENTED multiethnic empires whose minorities demanded their own states.",
    objectives: [
      "Define nationalism and its role in 19th-century politics.",
      "Give examples of nationalist unification and fragmentation.",
      "Explain why nationalism cut both ways.",
    ],
    sections: [
      {
        title: "Two faces of nationalism",
        body:
          "Nationalism could be centripetal (unifying) or centrifugal (fragmenting), depending on the situation.",
        table: {
          headers: ["Effect", "Example"],
          rows: [
            ["Unification", "Germany (unified by Bismarck) and Italy become nation-states"],
            ["Fragmentation", "Minorities in multiethnic empires (Ottoman, Austria-Hungary) seek independence"],
          ],
        },
        keyIdea: "Nationalism is a double-edged sword: it BUILT Germany and Italy while it BROKE apart multiethnic empires.",
        terms: [
          { term: "Nationalism", def: "Strong identification with and devotion to one's nation." },
          { term: "Otto von Bismarck", def: "Statesman who unified Germany through 'blood and iron' diplomacy and war." },
        ],
      },
      {
        title: "Why it cut both ways",
        body:
          "Where a people shared identity but were politically divided, nationalism pulled them together (unification). Where one state ruled many nationalities, nationalism pulled it apart, as each group sought self-rule. Both Italian/German unification and the slow breakup of the Ottoman Empire flowed from the same idea.",
        terms: [
          { term: "Self-determination", def: "The principle that a people should govern themselves and form their own state." },
        ],
        traps: ["Don't think of nationalism as only unifying — for multiethnic empires it was a force of FRAGMENTATION."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 5, lessonNum: 8,
    unitName: "Revolutions (c. 1750–1900)",
    title: "Abolitionism and the End of the Slave Trade",
    subtitle: "The same Enlightenment ideals that fueled revolutions turned against slavery itself.",
    overview:
      "The age of revolutions carried a moral logic that was hard to contain: if all people have natural rights, how can slavery be justified? Abolitionism — the movement to end the slave trade and slavery — grew from Enlightenment ideals, religious conviction, and the testimony of formerly enslaved people, and gradually won.",
    objectives: [
      "Explain the ideological and religious roots of abolitionism.",
      "Identify key milestones in ending the slave trade and slavery.",
      "Analyze what replaced enslaved labor.",
    ],
    sections: [
      {
        title: "The movement",
        body:
          "Abolitionism drew on Enlightenment ideas of equality, Christian (especially Quaker) moral arguments, and the powerful voices of formerly enslaved people. Britain banned the slave TRADE in 1807 and abolished SLAVERY itself in its empire in 1833; other nations followed over the century.",
        keyIdea: "Britain ended the slave TRADE (1807) before ending slavery itself (1833) — two separate milestones, often confused.",
        terms: [
          { term: "Abolitionism", def: "The movement to end the slave trade and slavery." },
        ],
      },
      {
        title: "What replaced enslaved labor",
        body:
          "Ending slavery didn't end the demand for cheap labor. Plantations and mines increasingly turned to indentured servitude — workers (often from India and China) bound for a fixed term — driving a new wave of global migration.",
        terms: [
          { term: "Indentured servitude", def: "Bound labor for a fixed term; expanded after abolition to replace enslaved workers." },
        ],
        traps: ["Abolition shifted the labor system (to indentured servants) rather than ending coerced/cheap labor outright."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 1,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "New Imperialism — Causes and the Scramble for Africa",
    subtitle: "Industrial powers raced to carve up Africa in a single generation — driven by raw materials, rivalry, and racist ideology.",
    overview:
      "In the late 1800s, industrialized nations seized colonies at breakneck speed, especially in Africa — the 'Scramble for Africa.' Industrialization created new hungers (raw materials, markets) and new tools (machine guns, steamships, quinine) that made rapid conquest possible.",
    objectives: [
      "Explain the economic, political, and ideological causes of New Imperialism.",
      "Describe the Scramble for Africa and the Berlin Conference.",
      "Identify the technologies that enabled imperial conquest.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "Why the new imperialism?",
        body:
          "Industrial economies drove the land grab, justified by racist ideology.",
        table: {
          headers: ["Cause", "Drive"],
          rows: [
            ["Economic", "Raw materials (rubber, minerals) + markets for goods"],
            ["Political", "National prestige and strategic rivalry"],
            ["Ideological", "Social Darwinism & the 'civilizing mission'"],
            ["Technological", "Machine guns, steamships, quinine made conquest feasible"],
          ],
        },
        keyIdea: "Industrialization created both the MOTIVE (resources/markets) and the MEANS (machine guns, quinine) for rapid conquest.",
      },
      {
        title: "Carving up a continent",
        body:
          "At the Berlin Conference (1884–85), European powers divided Africa among themselves — drawing borders with no African representation and little regard for existing ethnic groups, a source of conflict to this day. Quinine let Europeans survive malaria, and machine guns made resistance costly.",
        terms: [
          { term: "Scramble for Africa", def: "The rapid late-1800s European colonization of nearly all of Africa." },
          { term: "Berlin Conference", def: "1884–85 meeting where Europeans partitioned Africa among themselves." },
          { term: "Social Darwinism", def: "Misapplied 'survival of the fittest' used to justify imperialism and racism." },
        ],
        traps: ["Berlin Conference borders ignored African ethnic realities — a root of many later conflicts."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 2,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "Imperialism in Asia — India and China Compared",
    subtitle: "Two giants, two models of domination: India became a direct colony; China was carved into spheres without being formally conquered.",
    overview:
      "Industrial powers dominated Asia in different ways. Britain ruled India directly as a colony (the Raj). China was never fully colonized but was forced open and divided into spheres of influence after military defeats — a semi-colonial status.",
    objectives: [
      "Describe how Britain came to rule India directly.",
      "Explain China's semi-colonial domination (Opium Wars, unequal treaties).",
      "Compare the two models of imperialism.",
    ],
    sections: [
      {
        title: "India vs. China — two models",
        body:
          "India shows DIRECT colonial rule; China shows INFORMAL/economic imperialism. Compare them.",
        table: {
          headers: ["", "India", "China"],
          rows: [
            ["Controlled by", "British East India Company → British Crown (Raj)", "Multiple powers via spheres of influence"],
            ["Turning point", "Sepoy Rebellion (1857) → direct Crown rule", "Opium Wars → unequal treaties"],
            ["Status", "Formal colony", "Semi-colonial (kept nominal sovereignty)"],
          ],
        },
        keyIdea: "India = a formal COLONY (the Raj). China = SEMI-colonial — defeated and carved into spheres, but never fully conquered.",
      },
      {
        title: "How it happened",
        body:
          "In India, the British East India Company ruled commercially until the Sepoy Rebellion (1857) prompted the British Crown to take direct control. In China, defeat in the Opium Wars forced 'unequal treaties' opening ports and ceding Hong Kong, after which foreign powers claimed exclusive spheres of influence.",
        terms: [
          { term: "British Raj", def: "Direct British Crown rule over India after 1858." },
          { term: "Opium Wars", def: "Conflicts that forced China open via unequal treaties." },
          { term: "Spheres of influence", def: "Regions where a foreign power held exclusive trading/economic rights in China." },
        ],
        traps: ["China was NOT a formal colony — it kept nominal sovereignty but lost real control to spheres of influence ('semi-colonial')."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 3,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "Responses to Imperialism — Accommodation and Resistance",
    subtitle: "Colonized peoples were not passive: they rebelled, reformed, and built nationalist movements — and a few even won.",
    overview:
      "People under imperial pressure responded in three broad ways: armed resistance, reform and modernization (trying to beat the imperialists at their own game), and organized nationalism. A few states resisted successfully — most famously Japan and Ethiopia.",
    objectives: [
      "Categorize the main responses to imperialism.",
      "Give examples of resistance, reform, and nationalism.",
      "Explain why Japan and Ethiopia were exceptions.",
    ],
    sections: [
      {
        title: "Three kinds of response",
        body:
          "Responses ranged from violent rebellion to deliberate self-modernization to political organizing.",
        table: {
          headers: ["Response", "Examples"],
          rows: [
            ["Armed resistance", "Sepoy Rebellion (India), Boxer Rebellion (China)"],
            ["Reform / modernize", "Meiji Japan, Ottoman Tanzimat, China's Self-Strengthening"],
            ["Nationalism", "Indian National Congress organizing for self-rule"],
            ["Successful resistance", "Ethiopia defeats Italy at Adwa (1896); Japan industrializes"],
          ],
        },
        keyIdea: "Japan didn't just resist — it INDUSTRIALIZED (Meiji) and became an imperial power itself. Ethiopia militarily defeated Italy.",
      },
      {
        title: "Why some succeeded",
        body:
          "Japan's Meiji Restoration adopted Western technology, industry, and military methods rapidly enough to avoid colonization — and then to colonize others. Ethiopia, under Menelik II, modernized its army and defeated invading Italy at Adwa. Most reform efforts (late Qing China, the Ottomans) came too slowly to prevent decline.",
        terms: [
          { term: "Meiji Restoration", def: "Japan's rapid, top-down modernization that let it resist imperialism and become a power." },
          { term: "Self-Strengthening Movement", def: "China's limited, ultimately insufficient attempt to modernize." },
        ],
        traps: ["Reform ≠ automatic success — Japan's worked; China's and the Ottomans' were too slow and partial."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 4,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "Economic Imperialism — Export Economies and Dependency",
    subtitle: "You didn't have to be a colony to be controlled — industrial powers dominated whole regions through trade and debt.",
    overview:
      "Beyond formal colonies, industrial powers reshaped economies worldwide. Regions were pushed into producing a few raw materials or cash crops for European factories and buying European manufactured goods — creating export economies dependent on volatile world prices.",
    objectives: [
      "Define economic imperialism and export economies.",
      "Explain the dependency that resulted.",
      "Give examples (cash crops, deindustrialization).",
    ],
    sections: [
      {
        title: "Export economies",
        body:
          "Colonized and semi-colonized regions were steered toward producing single raw materials or cash crops for export, rather than diversified economies. They then bought finished goods from the industrial powers.",
        table: {
          headers: ["Region", "Forced export"],
          rows: [
            ["India", "Cotton (raw) — while its textile industry was undercut"],
            ["Caribbean / Brazil", "Sugar, coffee"],
            ["West Africa", "Palm oil, cacao"],
            ["Latin America", "Minerals, beef, guano"],
          ],
        },
        keyIdea: "Export economies traded diversification for dependence — wealth flowed out, and one bad price swing could wreck the economy.",
      },
      {
        title: "Dependency and deindustrialization",
        body:
          "Relying on one or two exports left economies vulnerable to global price swings (dependency). Worse, cheap British factory cloth flooded India and destroyed its once-dominant textile industry — deindustrialization. The pattern enriched the industrial core and locked the periphery into supplying raw materials.",
        terms: [
          { term: "Economic imperialism", def: "Controlling a region's economy through trade, investment, and debt rather than direct rule." },
          { term: "Dependency", def: "Reliance on exporting a few commodities, leaving an economy vulnerable to price swings." },
        ],
        traps: ["Economic imperialism didn't require a flag — Latin America was politically independent yet economically dominated."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 5,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "Migration in the Industrial Age",
    subtitle: "Industrialization set the world in motion — across oceans for work, and from countryside to city.",
    overview:
      "The industrial era triggered mass migration on an unprecedented scale: Europeans to the Americas, Asian indentured laborers across the globe, and rural people flooding into cities. New transport (steamships, railroads) made it possible, and it reshaped societies on both ends.",
    objectives: [
      "Identify the major migration patterns of the industrial age.",
      "Explain the push and pull factors driving them.",
      "Describe the social effects of mass migration.",
    ],
    sections: [
      {
        title: "Who moved where",
        body:
          "Migration flowed along several major channels, powered by steamships and railroads.",
        table: {
          headers: ["Migration", "Driver"],
          rows: [
            ["Europeans → Americas", "Escaping poverty; seeking land and jobs"],
            ["Indian & Chinese indentured → Caribbean, Africa, SE Asia", "Replacing enslaved plantation labor"],
            ["Rural → urban (internal)", "Factory jobs in growing cities"],
          ],
        },
        keyIdea: "After abolition, INDENTURED Asian laborers (India, China) became the new global workforce on plantations.",
      },
      {
        title: "Social effects",
        body:
          "Migrants formed ethnic enclaves in destination cities and sent remittances home. Migration often skewed gender ratios (many migrants were young men) and provoked nativism — backlash and discrimination against newcomers (e.g., the Chinese Exclusion Act).",
        terms: [
          { term: "Ethnic enclave", def: "A neighborhood with a high concentration of one ethnic/immigrant group." },
          { term: "Nativism", def: "Hostility and policy discrimination against immigrants by established residents." },
          { term: "Remittances", def: "Money migrants send back to family in their home country." },
        ],
        traps: ["Migration reshaped BOTH origin (remittances, gender imbalance) and destination (enclaves, nativism) societies."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 6,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "Social Darwinism and Racism as Imperial Ideology",
    subtitle: "Empire needed a justification — and pseudo-science supplied a deadly one.",
    overview:
      "Imperialism wasn't only about economics and power; it was wrapped in ideology. Europeans justified conquest with Social Darwinism, the 'civilizing mission,' and scientific racism — beliefs that cast domination as natural, even benevolent.",
    objectives: [
      "Explain how Social Darwinism justified imperialism.",
      "Define the 'civilizing mission' and scientific racism.",
      "Analyze ideology as a tool of empire.",
    ],
    sections: [
      {
        title: "Ideologies that justified empire",
        body:
          "Social Darwinism misapplied Darwin's 'survival of the fittest' to human societies, claiming stronger 'races' and nations were naturally meant to rule weaker ones. This paired with the 'White Man's Burden' — the idea that Europeans had a duty to 'civilize' colonized peoples — and pseudo-scientific racism that ranked humans by race.",
        keyIdea: "Ideology gave conquest a moral disguise: Social Darwinism + 'civilizing mission' made domination look natural and noble.",
        terms: [
          { term: "Social Darwinism", def: "The false application of 'survival of the fittest' to justify imperialism and racial hierarchy." },
          { term: "White Man's Burden", def: "The racist notion that Europeans had a duty to 'civilize' colonized peoples." },
          { term: "Scientific racism", def: "Pseudo-scientific claims used to rank human races and justify domination." },
        ],
        traps: ["Social Darwinism is a MISUSE of Darwin's biology — applied to societies, not species, to excuse cruelty."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 6, lessonNum: 7,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "Women's Rights Movements in the 19th Century",
    subtitle: "The age of revolutions and reform finally turned its ideals of equality toward women.",
    overview:
      "As industrial society and reform movements spread, women organized for their own rights — to vote, own property, and gain education. The 19th-century women's rights movement applied Enlightenment ideals of equality to gender, laying the groundwork for 20th-century suffrage.",
    objectives: [
      "Describe the goals of the 19th-century women's rights movement.",
      "Identify key milestones (Seneca Falls).",
      "Connect the movement to broader reform ideals.",
    ],
    sections: [
      {
        title: "Organizing for equality",
        body:
          "Women's rights activists, many of whom also worked in the abolition movement, demanded suffrage (the vote), property rights, and access to education. In the U.S., the Seneca Falls Convention (1848) launched the organized movement with its Declaration of Sentiments, echoing the Declaration of Independence.",
        keyIdea: "Seneca Falls (1848) applied 'all men AND women are created equal' — extending revolutionary ideals to gender.",
        terms: [
          { term: "Seneca Falls Convention", def: "The 1848 meeting that launched the organized U.S. women's rights movement." },
          { term: "Suffrage", def: "The right to vote — a central demand of the women's movement." },
        ],
        traps: ["The women's movement grew alongside ABOLITION — many leaders fought for both, applying the same equality logic."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 7, lessonNum: 1,
    unitName: "Global Conflict (c. 1900–present)",
    title: "Causes of World War I — MAIN and the Alliance System",
    subtitle: "Four long-term pressures built a powder keg; one assassination lit it.",
    overview:
      "World War I had deep underlying causes, remembered by the acronym MAIN — Militarism, Alliances, Imperialism, Nationalism — plus an immediate trigger: the assassination of Archduke Franz Ferdinand. The exam wants you to distinguish the long-term causes from the spark.",
    objectives: [
      "Explain the four MAIN causes of World War I.",
      "Describe how the alliance system escalated a local crisis.",
      "Distinguish the trigger from the underlying causes.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "The MAIN underlying causes",
        body:
          "Four long-building pressures made Europe dangerously unstable.",
        table: {
          headers: ["Cause", "Meaning"],
          rows: [
            ["Militarism", "Arms races and glorification of military power"],
            ["Alliances", "Rival blocs that could drag everyone into war"],
            ["Imperialism", "Competition for colonies and resources"],
            ["Nationalism", "Aggressive pride and ethnic tensions"],
          ],
        },
        keyIdea: "MAIN = Militarism, Alliances, Imperialism, Nationalism — the four UNDERLYING causes.",
      },
      {
        title: "The spark and the alliance chain",
        body:
          "The immediate trigger was the 1914 assassination of Archduke Franz Ferdinand of Austria-Hungary by a Serbian nationalist. Because of the alliance system, a local Balkan dispute pulled in one nation after another until most of Europe was at war.",
        terms: [
          { term: "Alliance system", def: "Interlocking defensive pacts that turned a local crisis into a continental war." },
          { term: "Assassination of Franz Ferdinand", def: "The 1914 spark that triggered WWI via the alliance system." },
        ],
        traps: ["The assassination was the TRIGGER, not the underlying cause. The deep causes were MAIN; the spark just set them off."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 7, lessonNum: 2,
    unitName: "Global Conflict (c. 1900–present)",
    title: "World War I — Total War and Its Effects",
    subtitle: "Industrial weapons created deadlock and mass death — and the war's end remade the world map.",
    overview:
      "WWI was the first total war: entire economies and populations were mobilized for the fight. Industrial weapons turned the Western Front into a grinding stalemate of trenches, and the war's aftermath toppled empires and imposed a punishing peace that sowed the seeds of the next war.",
    objectives: [
      "Define total war and describe trench warfare.",
      "Explain the home-front mobilization and propaganda.",
      "Analyze the war's major effects, including the Treaty of Versailles.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "Total war and the trenches",
        body:
          "New weapons — machine guns, poison gas, tanks, artillery — made offensives suicidal, producing years of trench-warfare stalemate and massive casualties. As 'total war,' it mobilized whole societies: governments directed economies, used propaganda, and women entered the workforce in huge numbers to replace men at the front.",
        keyIdea: "Industrial weapons + total mobilization = unprecedented casualties and a war that consumed entire societies, not just armies.",
        terms: [
          { term: "Total war", def: "War mobilizing a nation's entire economy and population." },
          { term: "Trench warfare", def: "Entrenched defensive fighting that produced stalemate and mass casualties." },
        ],
      },
      {
        title: "Effects: empires fall, a harsh peace",
        body:
          "The war shattered four empires (German, Austro-Hungarian, Ottoman, Russian). The Treaty of Versailles blamed Germany, imposed heavy reparations and territorial losses, and created the League of Nations (which the U.S. never joined). The resentment Versailles bred would help fuel WWII.",
        terms: [
          { term: "Treaty of Versailles", def: "The 1919 settlement that punished Germany with blame, reparations, and losses." },
          { term: "League of Nations", def: "The postwar body meant to keep peace; weak and unable to prevent WWII." },
        ],
        traps: ["The harshness of Versailles is a key CAUSE of WWII — German resentment of it fed the rise of the Nazis."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 7, lessonNum: 3,
    unitName: "Global Conflict (c. 1900–present)",
    title: "The Russian Revolution — Two Revolutions, One Year",
    subtitle: "In 1917 Russia overthrew its tsar, then its new government — and became the world's first communist state.",
    overview:
      "1917 actually held two revolutions. The February Revolution toppled the tsar and created a weak provisional government; the October Revolution let Lenin's Bolsheviks seize power, promising 'peace, land, and bread' and founding the first Marxist state.",
    objectives: [
      "Distinguish the February and October revolutions of 1917.",
      "Explain the Bolsheviks' appeal and Lenin's role.",
      "Connect WWI's strain to the revolution.",
    ],
    sections: [
      {
        title: "Two revolutions in one year",
        body:
          "WWI's catastrophic losses and food shortages broke the Russian monarchy. The result was two upheavals in 1917.",
        table: {
          headers: ["Revolution", "What happened"],
          rows: [
            ["February 1917", "Tsar Nicholas II abdicates; weak provisional government forms"],
            ["October 1917", "Lenin's Bolsheviks seize power, promising peace, land, and bread"],
          ],
        },
        keyIdea: "Two revolutions, one year: February ended the TSAR; October brought the BOLSHEVIKS (communists) to power.",
      },
      {
        title: "Lenin and the first communist state",
        body:
          "Lenin's Bolsheviks rallied a war-weary, hungry population with the slogan 'peace, land, and bread,' pulled Russia out of WWI, and established the world's first Marxist government — eventually the Soviet Union.",
        terms: [
          { term: "Bolsheviks", def: "Lenin's communist party that seized power in October 1917." },
          { term: "Lenin", def: "Bolshevik leader who founded the first communist state." },
        ],
        traps: ["The provisional government fell partly because it kept Russia in WWI — the Bolsheviks won by promising to LEAVE the war."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 7, lessonNum: 4,
    unitName: "Global Conflict (c. 1900–present)",
    title: "Rise of Fascism — Italy and Germany",
    subtitle: "Economic ruin and wounded national pride let authoritarian movements promising order and revenge seize power.",
    overview:
      "Between the world wars, fascism rose in Italy (Mussolini) and Germany (Hitler). Born from WWI resentment and the Great Depression's despair, fascism preached extreme nationalism, total obedience to a strong leader, and the crushing of dissent.",
    objectives: [
      "Define fascism and its core features.",
      "Explain the conditions that enabled fascism's rise.",
      "Compare fascism in Italy and Germany.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "What fascism is",
        body:
          "Fascism is an ideology of extreme nationalism and authoritarian rule: a single party and leader, suppression of opposition, militarism, and often scapegoating of minorities. It defined itself against both liberal democracy and communism.",
        keyIdea: "Fascism = extreme nationalism + a strongman leader + crushing dissent — anti-democratic and anti-communist.",
        terms: [
          { term: "Fascism", def: "An ideology of extreme nationalism and authoritarian, anti-democratic rule." },
          { term: "Totalitarianism", def: "A system where the state seeks total control over public and private life." },
        ],
      },
      {
        title: "Why it rose: Italy and Germany",
        body:
          "The conditions made the difference. Postwar instability brought Mussolini's Fascists to power in Italy. In Germany, resentment of the Treaty of Versailles plus the Great Depression's mass unemployment let Hitler's Nazis win support — promising national revival and a scapegoat.",
        terms: [
          { term: "Mussolini", def: "Fascist dictator of Italy." },
          { term: "Hitler / Nazism", def: "Leader of Germany's fascist Nazi party, which exploited Depression and Versailles resentment." },
        ],
        traps: ["Cause chain: WWI resentment + Great Depression → fascism. Economic despair was the key enabler of Hitler's rise."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 7, lessonNum: 5,
    unitName: "Global Conflict (c. 1900–present)",
    title: "World War II — Global Scope and the Holocaust",
    subtitle: "A truly global war of unprecedented destruction — including the industrialized genocide of the Holocaust.",
    overview:
      "WWII pitted the Allies against the Axis across Europe, Africa, Asia, and the Pacific. It was total war taken to a horrifying extreme: civilians were deliberately targeted, and Nazi Germany carried out the Holocaust, the systematic murder of six million Jews and millions of others.",
    objectives: [
      "Explain the causes of WWII, including appeasement.",
      "Describe the war's global scope and total-war nature.",
      "Explain the Holocaust as state-organized genocide.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "A global, total war",
        body:
          "Fascist aggression — and the failure of appeasement (giving in to Hitler's demands) — triggered war in 1939. Germany's blitzkrieg ('lightning war') overran Europe; Japan expanded across the Pacific. As total war, it mobilized entire economies and deliberately targeted civilians (bombing of cities), killing tens of millions.",
        keyIdea: "Appeasement failed: conceding to Hitler (Munich, 1938) didn't satisfy him — it emboldened more aggression.",
        terms: [
          { term: "Appeasement", def: "Giving in to an aggressor's demands to avoid war — failed to stop Hitler." },
          { term: "Blitzkrieg", def: "Germany's fast, combined-arms 'lightning war' tactics." },
          { term: "Axis vs. Allies", def: "Germany, Italy, Japan vs. Britain, USSR, US, and others." },
        ],
      },
      {
        title: "The Holocaust",
        body:
          "The Holocaust was the Nazi regime's systematic, industrialized genocide: six million Jews, plus Roma, disabled people, and others, were murdered in concentration and death camps. It represents the most extreme expression of the racism and totalitarianism behind fascism.",
        terms: [
          { term: "Holocaust", def: "The Nazi genocide of six million Jews and millions of other targeted groups." },
          { term: "Genocide", def: "The deliberate, systematic destruction of a people." },
        ],
        traps: ["The Holocaust was STATE-ORGANIZED and industrialized — the deliberate machinery of a totalitarian regime, not wartime chaos."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 7, lessonNum: 6,
    unitName: "Global Conflict (c. 1900–present)",
    title: "Atomic Bombs and the End of Total War",
    subtitle: "Two bombs ended the deadliest war in history — and opened the nuclear age.",
    overview:
      "In August 1945 the United States dropped atomic bombs on Hiroshima and Nagasaki, and Japan surrendered, ending WWII. The bomb closed one era of total war and opened another: a nuclear age that would define the Cold War's terrifying balance.",
    objectives: [
      "Explain the role of the atomic bombs in ending WWII.",
      "Describe the Manhattan Project.",
      "Connect nuclear weapons to the coming Cold War.",
    ],
    sections: [
      {
        title: "The bomb ends the war",
        body:
          "The secret Manhattan Project developed the atomic bomb. After devastating Hiroshima and then Nagasaki — killing well over a hundred thousand people, mostly civilians — Japan surrendered, ending the war without a costly invasion. The decision remains historically debated.",
        keyIdea: "The atomic bomb ended WWII immediately — and made the next great-power conflict (the Cold War) unthinkably dangerous.",
        terms: [
          { term: "Manhattan Project", def: "The secret US program that developed the atomic bomb." },
          { term: "Hiroshima & Nagasaki", def: "The two Japanese cities atomic-bombed in 1945, ending WWII." },
        ],
      },
      {
        title: "A new, nuclear era",
        body:
          "Nuclear weapons changed warfare forever. In the Cold War, both superpowers built arsenals so destructive that direct war risked mutually assured destruction (MAD) — a key reason the US–USSR conflict stayed 'cold.'",
        terms: [
          { term: "Mutually assured destruction (MAD)", def: "The doctrine that nuclear war would destroy both sides, deterring direct conflict." },
        ],
        traps: ["The bomb's biggest long-term effect was strategic: nuclear deterrence (MAD) shaped the entire Cold War."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 1,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "The Cold War — Origins and Ideology",
    subtitle: "Two superpowers, two opposed systems, and a global rivalry that never became direct war.",
    overview:
      "After WWII, the United States and the Soviet Union emerged as rival superpowers locked in the Cold War — an ideological, political, and military struggle between capitalism/democracy and communism. It was 'cold' because the two never fought each other directly, deterred by nuclear weapons.",
    objectives: [
      "Contrast the ideologies and alliances of the US and USSR.",
      "Explain the origins of the Cold War.",
      "Define containment and key early policies.",
    ],
    sections: [
      {
        title: "Two superpowers, two systems",
        body:
          "The wartime alliance collapsed into rivalry as two incompatible systems faced off.",
        table: {
          headers: ["", "United States", "Soviet Union"],
          rows: [
            ["Economy", "Capitalism", "Communism (state-controlled)"],
            ["Politics", "Democracy", "One-party rule"],
            ["Alliance", "NATO", "Warsaw Pact"],
          ],
        },
        keyIdea: "The Cold War was an IDEOLOGICAL contest (capitalism vs. communism) as much as a military one.",
      },
      {
        title: "Origins and containment",
        body:
          "Distrust, Soviet expansion in Eastern Europe (the 'Iron Curtain'), and a postwar power vacuum sparked the conflict. The US adopted containment — stopping the spread of communism — through the Truman Doctrine (aid to resist communism) and the Marshall Plan (rebuilding Western Europe to resist it).",
        terms: [
          { term: "Containment", def: "The US policy of preventing the spread of communism." },
          { term: "Iron Curtain", def: "The divide between communist Eastern and democratic Western Europe." },
          { term: "Marshall Plan", def: "US aid to rebuild Western Europe and resist communism." },
        ],
        traps: ["'Cold' means the US and USSR never fought DIRECTLY — they clashed through proxy wars and an arms race instead."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 2,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "Decolonization — Africa and Asia",
    subtitle: "Weakened by two world wars, Europe's empires came apart as colonized peoples claimed independence.",
    overview:
      "After WWII, the European empires rapidly collapsed as colonies across Africa and Asia won independence. Some transitions were negotiated, others won through violent struggle — and many new nations inherited borders and economies designed to serve their former rulers.",
    objectives: [
      "Explain why decolonization accelerated after WWII.",
      "Compare negotiated vs. violent paths to independence.",
      "Identify the challenges new nations inherited.",
    ],
    sections: [
      {
        title: "Why empires fell",
        body:
          "Two world wars drained European power and moral authority, while colonized peoples — many of whom had fought for their rulers — demanded the self-determination the Allies had championed. Independence came in different ways.",
        table: {
          headers: ["Path", "Example"],
          rows: [
            ["Largely negotiated", "India (1947) — mass nonviolent movement (Gandhi)"],
            ["Violent struggle", "Algeria — long war of independence against France"],
            ["Partition", "India/Pakistan split along religious lines (massive displacement)"],
          ],
        },
        keyIdea: "WWII shattered Europe's ability AND right to rule — 'self-determination' became impossible to deny.",
        terms: [
          { term: "Decolonization", def: "The process by which colonies gained independence from imperial powers." },
          { term: "Self-determination", def: "A people's right to govern themselves — a rallying cry for independence." },
        ],
      },
      {
        title: "Inherited challenges",
        body:
          "Independence rarely meant a clean slate. New nations often inherited arbitrary colonial borders (ignoring ethnic groups), economies built around exporting a few raw materials, and weak institutions — setting up later instability and conflict.",
        terms: [
          { term: "Partition", def: "Dividing a colony into separate states (e.g., India and Pakistan, 1947)." },
        ],
        traps: ["Political independence didn't erase colonial economic dependence — many states stayed tied to export economies."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 3,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "Non-Aligned Movement and the Third World",
    subtitle: "Newly independent nations that refused to pick a Cold War side — and tried to chart their own course.",
    overview:
      "As the Cold War split the world into US and Soviet blocs, many newly independent nations chose neither. The Non-Aligned Movement sought independence from both superpowers, while leveraging Cold War rivalry to gain aid and bargaining power.",
    objectives: [
      "Define non-alignment and its goals.",
      "Explain how non-aligned states navigated the Cold War.",
      "Identify key leaders and the Bandung Conference.",
    ],
    sections: [
      {
        title: "A third path",
        body:
          "Leaders of newly independent states — like India's Nehru, Egypt's Nasser, and Yugoslavia's Tito — formed the Non-Aligned Movement at and after the Bandung Conference (1955). They refused formal alliance with either superpower, prioritizing their own development and sovereignty.",
        keyIdea: "Non-aligned didn't mean neutral or passive — states played the superpowers off each other to extract aid.",
        terms: [
          { term: "Non-Aligned Movement", def: "Bloc of states refusing to formally side with the US or USSR." },
          { term: "Bandung Conference", def: "1955 meeting of Asian and African states that launched non-alignment." },
        ],
      },
      {
        title: "The 'Third World'",
        body:
          "These nations were often called the Third World (the First being the capitalist West, the Second the communist bloc). Many were poor, postcolonial, and focused on economic development — and both superpowers competed to win their loyalty with aid and influence.",
        terms: [
          { term: "Third World", def: "Cold War term for developing, often newly independent, non-aligned nations." },
        ],
        traps: ["'Third World' originally meant non-aligned in the Cold War — not simply 'poor,' though the meaning later shifted."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 4,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "China's Communist Revolution and Mao",
    subtitle: "A peasant-based communist revolution remade the world's most populous nation — then convulsed it.",
    overview:
      "In 1949, Mao Zedong's communists won China's civil war and founded the People's Republic. Unlike Soviet Marxism's focus on industrial workers, Mao built his revolution on the peasantry. His later campaigns — the Great Leap Forward and Cultural Revolution — brought catastrophe.",
    objectives: [
      "Explain how the communists won China's civil war.",
      "Describe how Maoism adapted Marxism to a peasant society.",
      "Assess the Great Leap Forward and Cultural Revolution.",
    ],
    sections: [
      {
        title: "Revolution and Maoism",
        body:
          "After defeating the Nationalists in a long civil war, Mao founded the People's Republic of China in 1949. His key innovation was basing revolution on the PEASANTRY rather than urban industrial workers — a major adaptation of Marxist theory to a rural society.",
        keyIdea: "Mao adapted Marxism for a peasant nation — revolution from the countryside, not the factory floor.",
        terms: [
          { term: "Mao Zedong", def: "Leader of China's communist revolution; founded the PRC in 1949." },
          { term: "Maoism", def: "Mao's adaptation of Marxism centering revolution on the peasantry." },
        ],
      },
      {
        title: "Catastrophic campaigns",
        body:
          "Mao's drives to transform China backfired terribly. The Great Leap Forward (1958) forced rapid collectivization and industrialization, causing a famine that killed tens of millions. The Cultural Revolution (1966) unleashed youth (Red Guards) against 'bourgeois' elements, causing years of chaos, persecution, and lost development.",
        terms: [
          { term: "Great Leap Forward", def: "Mao's failed forced industrialization/collectivization; caused mass famine." },
          { term: "Cultural Revolution", def: "Mao's violent 1966 campaign against perceived enemies; caused widespread chaos." },
        ],
        traps: ["Both campaigns were DISASTERS — the Great Leap caused famine; the Cultural Revolution caused chaos and persecution."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 5,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "Cold War Proxy Conflicts — Korea, Vietnam, Angola",
    subtitle: "The superpowers never fought each other directly — they fought through other countries' wars.",
    overview:
      "Because direct US–USSR war risked nuclear annihilation, the Cold War was waged through proxy conflicts: local wars where the superpowers backed opposing sides. Korea, Vietnam, and Angola became battlegrounds of the global contest between communism and capitalism.",
    objectives: [
      "Define a proxy war and explain why the Cold War relied on them.",
      "Summarize the Korean, Vietnam, and Angolan conflicts.",
      "Connect proxy wars to containment.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "War by proxy",
        body:
          "A proxy war lets rival powers fight indirectly by supporting opposing local forces. The US, following containment, backed anti-communist sides; the USSR (and China) backed communist ones. The fighting was devastatingly real for the countries caught in the middle.",
        table: {
          headers: ["Conflict", "What happened"],
          rows: [
            ["Korea (1950–53)", "Communist North vs. US-backed South → divided at the DMZ"],
            ["Vietnam (1955–75)", "US fails to stop communist North; reunified under communism"],
            ["Angola", "Cold War-backed factions fight after independence from Portugal"],
          ],
        },
        keyIdea: "Proxy wars kept the Cold War 'cold' between the superpowers while being brutally HOT for places like Korea and Vietnam.",
      },
      {
        title: "Containment in action",
        body:
          "These wars were containment applied: the US intervened to stop communism from spreading, fearing a 'domino effect' (one country falling would topple neighbors). Vietnam showed containment's limits — a costly war that ended in communist victory and deep US division.",
        terms: [
          { term: "Proxy war", def: "A conflict where rival powers back opposing local sides instead of fighting directly." },
          { term: "Domino theory", def: "The fear that one country turning communist would cause neighbors to follow." },
        ],
        traps: ["Proxy wars were real and deadly for the host nations — 'cold' only describes the US–USSR relationship, not these wars."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 6,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "End of the Cold War — Soviet Collapse",
    subtitle: "Economic stagnation, reform, and rising nationalism unraveled the USSR — and the Cold War ended without a shot between the superpowers.",
    overview:
      "By the 1980s the Soviet economy was failing. Gorbachev's reforms aimed to save the system but instead loosened control, and in 1991 the Soviet Union dissolved. The Cold War ended, leaving the United States as the sole superpower.",
    objectives: [
      "Explain the economic and political causes of Soviet collapse.",
      "Describe Gorbachev's reforms and their effects.",
      "Identify the consequences of the Cold War's end.",
    ],
    diagram: "cause-effect",
    sections: [
      {
        title: "Why the USSR fell",
        body:
          "Decades of central planning left the Soviet economy stagnant, while the arms race drained resources. Mikhail Gorbachev introduced perestroika (economic restructuring) and glasnost (openness) to reform it — but openness exposed problems and emboldened nationalist movements in Soviet republics.",
        keyIdea: "Gorbachev's reforms backfired: glasnost (openness) unleashed criticism and nationalism that the system couldn't survive.",
        terms: [
          { term: "Perestroika", def: "Gorbachev's restructuring of the Soviet economy." },
          { term: "Glasnost", def: "Gorbachev's policy of openness; allowed criticism that weakened the regime." },
        ],
      },
      {
        title: "The end and after",
        body:
          "The Berlin Wall fell in 1989, communist governments collapsed across Eastern Europe, and the Soviet Union dissolved in 1991. The Cold War ended, leaving the US as the world's sole superpower and ushering in a more economically interconnected, US-led order.",
        terms: [
          { term: "Fall of the Berlin Wall (1989)", def: "Symbolic collapse of the divide between East and West." },
          { term: "Dissolution of the USSR (1991)", def: "The breakup of the Soviet Union into independent states." },
        ],
        traps: ["The Cold War ended largely without direct superpower combat — internal collapse, not battlefield defeat, ended the USSR."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 7,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "Apartheid and Post-Colonial State Challenges",
    subtitle: "Independence was just the beginning — new nations faced racism, borders, debt, and unstable institutions.",
    overview:
      "Post-colonial states confronted enormous challenges. South Africa's apartheid enforced brutal racial segregation until a long struggle ended it. Across the formerly colonized world, arbitrary borders, weak institutions, and economic dependence bred conflict and instability.",
    objectives: [
      "Explain apartheid and how it ended.",
      "Identify common challenges facing post-colonial states.",
      "Connect colonial legacies to modern instability.",
    ],
    sections: [
      {
        title: "Apartheid in South Africa",
        body:
          "Apartheid was a legal system of racial segregation that gave South Africa's white minority power over the Black majority. Decades of resistance — led by figures like Nelson Mandela and the ANC, plus international sanctions — ended it, and Mandela became president in 1994.",
        keyIdea: "Apartheid fell to a combination of internal resistance (Mandela, ANC) AND external pressure (global sanctions).",
        terms: [
          { term: "Apartheid", def: "South Africa's legal system of racial segregation and white-minority rule." },
          { term: "Nelson Mandela", def: "Anti-apartheid leader who became South Africa's first Black president (1994)." },
        ],
      },
      {
        title: "Challenges of new nations",
        body:
          "Many post-colonial states struggled with borders drawn by colonizers (cutting across ethnic groups), economies dependent on a few exports, foreign debt, and weak institutions. These legacies fueled coups, civil wars, and authoritarian rule in numerous newly independent countries.",
        terms: [
          { term: "Neocolonialism", def: "Continued economic control of former colonies by powerful nations/corporations after independence." },
        ],
        traps: ["Many post-colonial problems (ethnic conflict, dependence) trace directly to COLONIAL borders and economic structures."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 8, lessonNum: 8,
    unitName: "Cold War and Decolonization (c. 1900–present)",
    title: "Women and Decolonization — Promises and Limits",
    subtitle: "Women fought for independence and gained new rights — but the revolutions often stopped short of full equality.",
    overview:
      "Women played central roles in independence and revolutionary movements, and many newly independent states expanded women's legal rights and access to education and work. Yet the promises of equality were frequently unfulfilled, as traditional and patriarchal structures persisted.",
    objectives: [
      "Describe women's roles in decolonization and revolutionary movements.",
      "Identify gains women made in new and revolutionary states.",
      "Explain the limits of those gains.",
    ],
    sections: [
      {
        title: "Promises: participation and rights",
        body:
          "Women joined and sometimes led independence struggles and revolutions (e.g., in Algeria, China, and Vietnam). In return, many new and communist states granted suffrage, expanded education, and brought women into the workforce, framing equality as part of national progress.",
        keyIdea: "Revolutions and independence movements needed women's participation — and often rewarded it with new legal rights.",
        terms: [
          { term: "Suffrage", def: "The right to vote, extended to women in many newly independent states." },
        ],
      },
      {
        title: "Limits: equality deferred",
        body:
          "Legal gains often outran social reality. Patriarchal traditions, religious norms, and male-dominated leadership meant women's equality was frequently incomplete — they gained rights on paper but still faced discrimination in politics, work, and the home.",
        terms: [
          { term: "Patriarchy", def: "A social system in which men hold most power, limiting women's equality despite legal reforms." },
        ],
        traps: ["Note the GAP: legal/formal gains for women often outpaced real social and political equality."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 9, lessonNum: 1,
    unitName: "Globalization (c. 1900–present)",
    title: "Economic Globalization — Free Trade and Its Critics",
    subtitle: "The post-WWII world knit national economies into one — lifting billions, while sparking fierce debate over winners and losers.",
    overview:
      "Economic globalization is the growing integration of the world's economies through trade, investment, and multinational corporations. Backed by institutions promoting free trade, it generated enormous wealth and lifted many out of poverty — but critics point to inequality, exploitation, and lost sovereignty.",
    objectives: [
      "Define economic globalization and its key institutions.",
      "Explain the role of multinational corporations and free trade.",
      "Summarize the main criticisms of globalization.",
    ],
    sections: [
      {
        title: "The integrated economy",
        body:
          "After WWII, institutions and agreements lowered trade barriers and encouraged the free flow of goods and capital. Multinational corporations spread production across borders (global supply chains), and bodies like the WTO, IMF, and World Bank shaped the rules.",
        table: {
          headers: ["Force", "Role"],
          rows: [
            ["Free trade agreements", "Lower tariffs/barriers between countries"],
            ["Multinational corporations", "Spread production across borders (supply chains)"],
            ["WTO / IMF / World Bank", "Set rules and lend to shape the global economy"],
          ],
        },
        keyIdea: "Globalization links economies so tightly that a factory in one country and a shopper in another depend on each other.",
      },
      {
        title: "Critics and trade-offs",
        body:
          "Supporters credit globalization with growth and falling poverty (especially in Asia). Critics argue it widens inequality, exploits low-wage workers, harms the environment, and erodes national sovereignty and local cultures. The debate over its winners and losers defines modern politics.",
        terms: [
          { term: "Multinational corporation", def: "A company operating across multiple countries; a key driver of globalization." },
          { term: "Free trade", def: "Trade with minimal tariffs/barriers between nations." },
        ],
        traps: ["Globalization has BOTH lifted billions from poverty AND widened inequality — the exam wants the trade-offs, not one side."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 9, lessonNum: 2,
    unitName: "Globalization (c. 1900–present)",
    title: "Technology and Cultural Globalization",
    subtitle: "Jets, satellites, and the internet shrank the world — spreading culture, and provoking backlash.",
    overview:
      "Communication and transportation technology accelerated globalization, moving people, ideas, and culture faster than ever. The result is a more connected — and more culturally blended — world, alongside fears of homogenization and movements to defend local identity.",
    objectives: [
      "Explain how technology accelerated globalization.",
      "Describe cultural globalization and syncretism.",
      "Identify backlash against cultural homogenization.",
    ],
    sections: [
      {
        title: "The technology that shrank the world",
        body:
          "Jet travel, container shipping, satellites, and especially the internet and mobile phones let information, money, and people move instantly across the globe. This connectivity is the engine of modern cultural exchange.",
        keyIdea: "The internet did for the late 20th century what the printing press did earlier — collapsed the cost of spreading ideas.",
        terms: [
          { term: "Cultural globalization", def: "The worldwide spread and blending of ideas, media, and customs." },
        ],
      },
      {
        title: "Blending and backlash",
        body:
          "Global media spread products and pop culture worldwide, often creating syncretism (blended local-global culture). But many fear cultural homogenization — the erosion of local cultures by dominant (often Western) ones — fueling movements to protect language, religion, and tradition.",
        terms: [
          { term: "Cultural homogenization", def: "The fear that local cultures are erased by a dominant global culture." },
          { term: "Syncretism", def: "Blending of global and local cultural elements into something new." },
        ],
        traps: ["Cultural globalization isn't one-way erasure — it often produces BLENDING (syncretism) and active local resistance."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 9, lessonNum: 3,
    unitName: "Globalization (c. 1900–present)",
    title: "Climate Change and Environmental Globalization",
    subtitle: "Industrialization's greatest side effect is global — and demands cooperation no single nation can provide alone.",
    overview:
      "The fossil-fueled growth of the modern era has warmed the planet, making climate change the defining environmental challenge of globalization. Because emissions anywhere affect everyone, it's a shared problem requiring international cooperation — which has proven hard to achieve.",
    objectives: [
      "Explain the causes and effects of human-driven climate change.",
      "Describe environmental problems as global, shared challenges.",
      "Identify international efforts to respond.",
    ],
    sections: [
      {
        title: "A global, shared problem",
        body:
          "Burning fossil fuels since the Industrial Revolution has released greenhouse gases that trap heat, raising global temperatures. Effects — rising seas, extreme weather, ecosystem disruption — cross every border, so one country's emissions become everyone's problem.",
        keyIdea: "Climate change is the ultimate globalization issue: emissions anywhere cause harm everywhere, so no nation can solve it alone.",
        terms: [
          { term: "Greenhouse gases", def: "Gases (like CO₂) that trap heat in the atmosphere, driving warming." },
          { term: "Climate change", def: "Long-term shifts in temperature and weather driven largely by human emissions." },
        ],
      },
      {
        title: "Responding together",
        body:
          "Nations have tried to coordinate through agreements like the Paris Agreement, pledging to cut emissions. But tensions persist between developed nations (historically the biggest emitters) and developing ones (which want to grow), making binding global action difficult.",
        terms: [
          { term: "Paris Agreement", def: "International accord in which nations pledge to limit greenhouse-gas emissions." },
          { term: "Sustainable development", def: "Growth that meets present needs without compromising future generations." },
        ],
        traps: ["The core tension: developed nations caused most past emissions, but developing nations need to grow — fueling disputes over who must cut."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 9, lessonNum: 4,
    unitName: "Globalization (c. 1900–present)",
    title: "Disease, Migration, and Global Health",
    subtitle: "The connections that move goods and people also move germs — making health a global concern.",
    overview:
      "Globalization moves people and pathogens as fast as products. Pandemics spread along the same networks as trade and migration, while mass migration reshapes societies. Global health has become a shared responsibility requiring international coordination.",
    objectives: [
      "Explain how globalization accelerates disease spread.",
      "Describe modern migration patterns and their effects.",
      "Identify global responses to health challenges.",
    ],
    sections: [
      {
        title: "Connected world, connected disease",
        body:
          "Just as the Silk Roads once spread the plague, modern air travel can carry a virus worldwide in days — as COVID-19 showed. The same interconnection that powers the global economy makes pandemics a built-in risk, prompting bodies like the WHO to coordinate responses.",
        keyIdea: "The historical pattern repeats: the networks that spread trade and people also spread disease — only faster now.",
        terms: [
          { term: "Pandemic", def: "A disease outbreak spread across countries or continents." },
          { term: "WHO", def: "World Health Organization — coordinates international responses to health crises." },
        ],
      },
      {
        title: "Migration in the global age",
        body:
          "People migrate for work, safety, and opportunity, creating large diasporas, remittance flows, and multicultural cities — but also nativist backlash and refugee crises driven by war and, increasingly, climate. Migration remains one of globalization's most contested issues.",
        terms: [
          { term: "Diaspora", def: "A dispersed population living outside its homeland." },
          { term: "Refugee", def: "A person forced to flee their country due to war, persecution, or disaster." },
        ],
        traps: ["Modern migration echoes the industrial age — remittances and enclaves at one end, nativism and backlash at the other."],
      },
    ],
  },
  {
    courseId: "ap-world-history", unit: 9, lessonNum: 5,
    unitName: "Globalization (c. 1900–present)",
    title: "Continuity and Change in the 21st Century",
    subtitle: "The big-picture synthesis: what endures across all of world history, and what has transformed.",
    overview:
      "This capstone lesson zooms all the way out. Across the whole course, certain patterns persist — trade networks, belief systems, the use of power — while others transform: the scale of connection, the pace of change, and the technologies that drive it. The skill is arguing continuity AND change over time.",
    objectives: [
      "Identify long-term continuities across world history.",
      "Identify major changes culminating in the 21st century.",
      "Practice continuity-and-change-over-time analysis.",
    ],
    sections: [
      {
        title: "What endures, what transforms",
        body:
          "The exam rewards seeing both sides of the ledger. Trade, cultural exchange, and the contest for power run through every era — but their scale and speed have exploded in the modern age.",
        table: {
          headers: ["Continuity", "Change"],
          rows: [
            ["Trade networks connect distant peoples", "From Silk Roads to instant global digital trade"],
            ["Belief systems & culture spread", "Now spread instantly via mass media/internet"],
            ["States seek power and legitimacy", "From empires to nation-states and global institutions"],
            ["Disease & people move along networks", "Now planet-wide in days"],
          ],
        },
        keyIdea: "Continuity-and-change isn't either/or — the BEST answers show the same patterns persisting while their SCALE and SPEED transform.",
      },
      {
        title: "Thinking like a historian",
        body:
          "The 21st century intensifies trends you've tracked all year: deeper economic integration, faster cultural exchange, shared global problems (climate, pandemics), and ongoing tension between global forces and local identities. The course's payoff is the habit of asking, for any development, 'what here is continuous with the past, and what is genuinely new?'",
        terms: [
          { term: "Continuity and change over time", def: "A core historical-reasoning skill: tracing what persists and what transforms across periods." },
        ],
        traps: ["Avoid all-or-nothing claims — almost nothing is purely 'new' or purely 'unchanged.' Argue degrees of both."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 1,
    unitName: "The Living World: Ecosystems",
    title: "Ecosystem Structure — Who Eats Whom and Why It Matters",
    subtitle: "Ecosystems are built from feeding relationships — trace the energy and you understand the whole system.",
    overview:
      "An ecosystem is all the living organisms in an area plus their nonliving environment, interacting. The backbone of its structure is who eats whom: producers capture energy, consumers pass it along, and decomposers recycle it. Map those feeding relationships and the system's logic appears.",
    objectives: [
      "Define ecosystem, biotic, and abiotic factors.",
      "Identify trophic levels: producers, consumers, decomposers.",
      "Explain food chains and food webs.",
    ],
    sections: [
      {
        title: "Biotic, abiotic, and trophic levels",
        body:
          "Ecosystems combine biotic (living) and abiotic (nonliving — sunlight, water, soil, temperature) factors. Energy enters through producers (autotrophs) that photosynthesize, then flows to consumers (herbivores, carnivores, omnivores) and finally to decomposers that break down dead matter and recycle nutrients.",
        table: {
          headers: ["Trophic level", "Role"],
          rows: [
            ["Producers (autotrophs)", "Make energy via photosynthesis (plants, algae)"],
            ["Primary consumers", "Herbivores that eat producers"],
            ["Secondary/tertiary consumers", "Carnivores that eat other consumers"],
            ["Decomposers", "Break down dead matter, recycle nutrients"],
          ],
        },
        keyIdea: "Energy FLOWS one way (sun → producers → consumers), but nutrients CYCLE (decomposers return them to the soil).",
      },
      {
        title: "Food chains and webs",
        body:
          "A food chain is a single path of energy (grass → rabbit → fox). A food web is the realistic, interconnected network of many overlapping chains. Webs are more stable than chains because if one species declines, others can fill the gap.",
        terms: [
          { term: "Biotic / abiotic", def: "Living factors vs. nonliving factors (sunlight, water, soil) in an ecosystem." },
          { term: "Food web", def: "An interconnected network of feeding relationships; more stable than a single chain." },
          { term: "Decomposer", def: "Organism that breaks down dead matter and recycles nutrients." },
        ],
        traps: ["Energy FLOWS through and is lost as heat; matter/nutrients CYCLE. Don't say energy is 'recycled.'"],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 2,
    unitName: "The Living World: Ecosystems",
    title: "Energy Flow and the 10% Rule",
    subtitle: "Only about a tenth of the energy at one level reaches the next — which is why food chains are short.",
    overview:
      "Energy moves up trophic levels, but most is lost at each step. The 10% rule states that only roughly 10% of the energy stored in one trophic level is passed to the next; the other ~90% is lost mostly as heat through metabolism. This single rule explains the shape of ecosystems.",
    objectives: [
      "State and apply the 10% rule.",
      "Explain why energy is lost between trophic levels.",
      "Explain why food chains are short and top predators rare.",
    ],
    diagram: "energy-pyramid",
    sections: [
      {
        title: "The 10% rule",
        body:
          "At each trophic level, organisms use most of their energy to live (movement, respiration, heat), so only about 10% gets stored as biomass available to the next level. An energy pyramid shows this: each level is roughly a tenth of the one below.",
        keyIdea: "~90% of energy is LOST as heat at each step — only ~10% moves up. That's why pyramids narrow sharply toward the top.",
        terms: [
          { term: "10% rule", def: "Only ~10% of energy in one trophic level transfers to the next." },
          { term: "Biomass", def: "The total mass of living matter at a trophic level." },
          { term: "Energy pyramid", def: "A diagram showing energy decreasing up the trophic levels." },
        ],
      },
      {
        title: "Why it shapes ecosystems",
        body:
          "Because so much energy is lost, there isn't enough to support many trophic levels — food chains rarely exceed 4–5 links, and top predators are few. It also explains why eating lower on the food chain (plants) feeds more people than eating meat: less energy is wasted.",
        example:
          "If producers store 10,000 units of energy, primary consumers get ~1,000, secondary ~100, and tertiary ~10. After a few levels there's almost nothing left — so there's no room for a 6th level.",
        traps: ["The ~90% loss is mostly heat from RESPIRATION/metabolism — not 'eaten by decomposers.'"],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 3,
    unitName: "The Living World: Ecosystems",
    title: "Biogeochemical Cycles — Carbon, Nitrogen, Phosphorus, Water",
    subtitle: "Matter isn't created or destroyed — it cycles endlessly between living things and the environment.",
    overview:
      "Unlike energy, which flows through and is lost, matter cycles. Biogeochemical cycles move key elements — carbon, nitrogen, phosphorus — and water between organisms, the atmosphere, water, and rock. Human activity has disrupted each of these cycles.",
    objectives: [
      "Describe the carbon, nitrogen, phosphorus, and water cycles.",
      "Identify reservoirs and fluxes in each cycle.",
      "Explain how humans alter these cycles.",
    ],
    diagram: "carbon-cycle",
    sections: [
      {
        title: "The major cycles",
        body:
          "Each cycle moves an element between reservoirs (storage places). Know the basics and the human disruption for each.",
        table: {
          headers: ["Cycle", "Key idea", "Human disruption"],
          rows: [
            ["Carbon", "Photosynthesis ↔ respiration; stored in fossil fuels", "Burning fossil fuels → CO₂ ↑ (warming)"],
            ["Nitrogen", "Fixation makes N usable; needs bacteria", "Fertilizers add excess N → dead zones"],
            ["Phosphorus", "No gas phase; from rock; limits growth", "Mining/fertilizer → runoff, algal blooms"],
            ["Water", "Evaporation, condensation, precipitation", "Damming, groundwater depletion, paving"],
          ],
        },
        keyIdea: "Carbon and nitrogen have atmospheric (gas) phases; PHOSPHORUS does not — it comes from rock and moves slowly.",
      },
      {
        title: "Why disruption matters",
        body:
          "Humans have overloaded these cycles: extra carbon drives climate change; excess nitrogen and phosphorus from fertilizer run into water and cause eutrophication (algal blooms that deplete oxygen and create dead zones). Nitrogen fixation by bacteria is the key step that makes atmospheric N usable by plants.",
        terms: [
          { term: "Reservoir", def: "A place where a large amount of an element is stored (e.g., fossil fuels store carbon)." },
          { term: "Nitrogen fixation", def: "Bacteria converting atmospheric N₂ into a form plants can use." },
          { term: "Eutrophication", def: "Nutrient overload (N, P) causing algal blooms and oxygen-depleted dead zones." },
        ],
        traps: ["Phosphorus has NO atmospheric/gas phase — a favorite exam distinction from carbon and nitrogen."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 4,
    unitName: "The Living World: Ecosystems",
    title: "Terrestrial Biomes — Climate Determines Structure",
    subtitle: "Temperature and precipitation are the two dials that decide which biome you get.",
    overview:
      "A biome is a large region defined by its climate and the communities of plants and animals adapted to it. The master idea: two abiotic factors — temperature and precipitation — largely determine which biome forms where, from desert to rainforest.",
    objectives: [
      "Define biome and explain what determines biome type.",
      "Identify major terrestrial biomes and their climates.",
      "Connect climate to plant/animal adaptations.",
    ],
    sections: [
      {
        title: "Climate sets the biome",
        body:
          "Plot temperature against precipitation and you can predict the biome. Hot and wet gives tropical rainforest; hot and dry gives desert; cold gives tundra. Organisms then adapt to those conditions (e.g., desert plants store water; tundra plants grow low).",
        table: {
          headers: ["Biome", "Climate"],
          rows: [
            ["Tropical rainforest", "Hot, very wet — highest biodiversity"],
            ["Desert", "Hot/cold, very dry"],
            ["Grassland/savanna", "Seasonal rain, fire-adapted"],
            ["Temperate forest", "Moderate temp, four seasons"],
            ["Taiga (boreal forest)", "Cold, coniferous"],
            ["Tundra", "Coldest, permafrost, treeless"],
          ],
        },
        keyIdea: "Two dials — TEMPERATURE and PRECIPITATION — set the biome. Everything else follows from climate.",
      },
      {
        title: "Adaptation and productivity",
        body:
          "Warm, wet biomes (tropical rainforest) have the highest net primary productivity and biodiversity; cold or dry biomes (tundra, desert) the lowest. Organisms show clear adaptations to their biome — thick fur in tundra, deep roots in deserts.",
        terms: [
          { term: "Biome", def: "A large region defined by climate and its characteristic communities." },
          { term: "Permafrost", def: "Permanently frozen ground characteristic of the tundra." },
          { term: "Net primary productivity (NPP)", def: "The energy producers store and make available; highest in tropical rainforests." },
        ],
        traps: ["Climate determines biome — NOT the other way around. Latitude/altitude matter because they affect temp and rainfall."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 5,
    unitName: "The Living World: Ecosystems",
    title: "Aquatic Biomes and Zones",
    subtitle: "Salt vs. fresh, and how deep the light reaches — that's what structures life in water.",
    overview:
      "Aquatic biomes are divided first by salinity (freshwater vs. marine) and then by zones based on depth and light. Where sunlight can reach determines where photosynthesis — and thus most life — can happen.",
    objectives: [
      "Distinguish freshwater and marine biomes.",
      "Explain aquatic zones by light and depth.",
      "Identify high-productivity aquatic areas.",
    ],
    sections: [
      {
        title: "Salinity and light zones",
        body:
          "The first split is salinity: freshwater (lakes, rivers, wetlands) vs. marine (oceans, estuaries, coral reefs). Within water bodies, the photic zone is where light penetrates and photosynthesis occurs; below it, the aphotic zone is dark.",
        table: {
          headers: ["Zone / area", "Feature"],
          rows: [
            ["Photic zone", "Sunlit; photosynthesis happens here"],
            ["Aphotic zone", "Dark, deep; no photosynthesis"],
            ["Estuary", "Where river meets sea — very productive nursery"],
            ["Coral reef", "High biodiversity; sensitive to temp/pH"],
          ],
        },
        keyIdea: "Estuaries and coral reefs are among the MOST productive/biodiverse aquatic systems — and the most vulnerable.",
      },
      {
        title: "Why productivity varies",
        body:
          "Productivity is highest where there's light AND nutrients — shallow coastal waters, estuaries, and reefs. The open deep ocean is vast but relatively low in productivity (a 'marine desert') because nutrients sink away from the sunlit surface.",
        terms: [
          { term: "Photic zone", def: "The sunlit upper water layer where photosynthesis occurs." },
          { term: "Estuary", def: "A nutrient-rich zone where freshwater and saltwater mix; a key nursery habitat." },
        ],
        traps: ["The open ocean is huge but LOW in productivity per area — coastal/estuary zones are the productive hotspots."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 6,
    unitName: "The Living World: Ecosystems",
    title: "Ecological Niches and Species Interactions",
    subtitle: "Every species has a 'job,' and how those jobs overlap drives competition, predation, and partnership.",
    overview:
      "A niche is a species' role in its ecosystem — what it eats, where it lives, how it interacts. How niches overlap shapes species interactions: competition, predation, and the three kinds of symbiosis. These interactions structure communities.",
    objectives: [
      "Distinguish a species' niche from its habitat.",
      "Explain competition and the competitive exclusion principle.",
      "Classify symbiotic relationships.",
    ],
    sections: [
      {
        title: "Niche vs. habitat, and competition",
        body:
          "A habitat is the address (where a species lives); a niche is the profession (its role and resource use). When two species need the same limited resource, the competitive exclusion principle says they can't coexist indefinitely — one outcompetes the other, or they partition resources (resource partitioning).",
        keyIdea: "Habitat = address, niche = job. Two species with identical niches can't coexist (competitive exclusion).",
        terms: [
          { term: "Niche", def: "A species' role: what it eats, where, and how it interacts." },
          { term: "Competitive exclusion", def: "Two species with the same niche can't coexist indefinitely." },
          { term: "Resource partitioning", def: "Species dividing a resource to reduce competition and coexist." },
        ],
      },
      {
        title: "Symbiosis",
        body:
          "Symbiosis is a close, long-term interaction between species. The three types differ by who benefits.",
        table: {
          headers: ["Type", "Species A", "Species B"],
          rows: [
            ["Mutualism", "Benefits (+)", "Benefits (+)"],
            ["Commensalism", "Benefits (+)", "Unaffected (0)"],
            ["Parasitism", "Benefits (+)", "Harmed (−)"],
          ],
        },
        keyIdea: "Mutualism = +/+, commensalism = +/0, parasitism = +/−. Predation differs: it's a quick kill, not a long-term relationship.",
        traps: ["A keystone species has an outsized effect on its ecosystem relative to its abundance — remove it and the community collapses."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 7,
    unitName: "The Living World: Ecosystems",
    title: "Ecosystem Services — What Nature Provides",
    subtitle: "Healthy ecosystems do enormous, free work for humans — until we degrade them and have to pay.",
    overview:
      "Ecosystem services are the benefits humans get from nature, often for free: clean water, pollination, climate regulation, and more. Putting these into categories — and recognizing their economic value — helps explain why conservation is also self-interest.",
    objectives: [
      "Define ecosystem services and their four categories.",
      "Give examples of each category.",
      "Explain why ecosystem services have economic value.",
    ],
    sections: [
      {
        title: "Four categories of services",
        body:
          "Ecosystem services are usually grouped into four types. Knowing an example of each is enough for the exam.",
        table: {
          headers: ["Category", "Example"],
          rows: [
            ["Provisioning", "Food, water, timber, medicine"],
            ["Regulating", "Climate regulation, water filtration, pollination"],
            ["Supporting", "Nutrient cycling, soil formation, photosynthesis"],
            ["Cultural", "Recreation, beauty, spiritual value"],
          ],
        },
        keyIdea: "Nature does trillions of dollars of 'free' work — pollination, water filtering, flood control — that's costly to replace artificially.",
      },
      {
        title: "Why it matters economically",
        body:
          "When ecosystems are degraded, these free services fail and humans must pay to replace them — building water-treatment plants when wetlands are lost, or hand-pollinating crops when bees decline. Valuing ecosystem services reframes conservation as a smart economic choice, not just an environmental one.",
        terms: [
          { term: "Ecosystem services", def: "The benefits humans receive from functioning ecosystems." },
          { term: "Provisioning vs. regulating", def: "Goods nature provides (food, water) vs. processes it regulates (climate, pollination)." },
        ],
        traps: ["Don't forget SUPPORTING services (nutrient cycling, soil formation) — they make all the others possible."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 1, lessonNum: 8,
    unitName: "The Living World: Ecosystems",
    title: "Primary and Secondary Productivity Calculations",
    subtitle: "How much energy an ecosystem captures and stores — and the formula the exam wants you to use.",
    overview:
      "Productivity measures how much energy an ecosystem captures and makes available. The key distinction — and a common FRQ — is between gross and net primary productivity. Get the formula GPP − respiration = NPP and you've got the lesson.",
    objectives: [
      "Define GPP, NPP, and the relationship between them.",
      "Calculate NPP from GPP and respiration.",
      "Compare productivity across ecosystems.",
    ],
    sections: [
      {
        title: "GPP, NPP, and respiration",
        body:
          "Gross primary productivity (GPP) is the total energy producers capture through photosynthesis. But plants use some of it just to live (respiration). What's left — stored as biomass and available to consumers — is net primary productivity (NPP).",
        keyIdea: "NPP = GPP − Respiration. NPP is what's actually AVAILABLE to the next trophic level.",
        terms: [
          { term: "Gross primary productivity (GPP)", def: "Total energy captured by producers via photosynthesis." },
          { term: "Net primary productivity (NPP)", def: "Energy stored after respiration; available to consumers (GPP − R)." },
          { term: "Respiration", def: "Energy producers use for their own life processes." },
        ],
      },
      {
        title: "Calculating and comparing",
        body:
          "If an ecosystem has a GPP of 1,000 kcal/m²/yr and respiration of 400, then NPP = 1,000 − 400 = 600 kcal/m²/yr. Productivity is highest in tropical rainforests and estuaries/wetlands, lowest in deserts and the open ocean (per area).",
        example:
          "GPP = 20,000 kcal/m²/yr, plant respiration = 12,000. NPP = 20,000 − 12,000 = 8,000 kcal/m²/yr. That 8,000 is what herbivores can actually eat.",
        traps: ["Watch the units (e.g., kcal/m²/yr) and remember NPP — not GPP — is the energy available to consumers."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 1,
    unitName: "The Living World: Biodiversity",
    title: "Biodiversity — Three Levels and Why Each Matters",
    subtitle: "Biodiversity isn't just 'number of species' — it operates at three levels, and more diversity means more stability.",
    overview:
      "Biodiversity is the variety of life, and it exists at three levels: genetic, species, and ecosystem. The central idea: greater biodiversity makes ecosystems more resilient — better able to withstand disease, disturbance, and change.",
    objectives: [
      "Identify the three levels of biodiversity.",
      "Explain how biodiversity increases resilience.",
      "Define species richness and evenness.",
    ],
    sections: [
      {
        title: "Three levels of biodiversity",
        body:
          "Biodiversity is measured at three nested scales, each important for survival.",
        table: {
          headers: ["Level", "What it varies", "Why it matters"],
          rows: [
            ["Genetic", "Variety of genes within a species", "Raw material for adapting to change/disease"],
            ["Species", "Variety of species in an area", "More roles filled; more stable food webs"],
            ["Ecosystem", "Variety of habitats/ecosystems", "Range of services and conditions"],
          ],
        },
        keyIdea: "Genetic diversity is the insurance policy: a varied gene pool lets a species adapt to disease and change.",
      },
      {
        title: "Diversity and resilience",
        body:
          "Higher biodiversity generally means higher resilience — the ability to recover from disturbance. Species diversity has two parts: richness (how many species) and evenness (how balanced their numbers are). A community dominated by one species is less stable than a balanced one.",
        terms: [
          { term: "Species richness", def: "The number of different species in a community." },
          { term: "Species evenness", def: "How balanced the relative abundances of species are." },
          { term: "Resilience", def: "An ecosystem's ability to recover from disturbance." },
        ],
        traps: ["Biodiversity ≠ just species count. Genetic and ecosystem diversity matter too, and evenness matters alongside richness."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 2,
    unitName: "The Living World: Biodiversity",
    title: "Evolution and Natural Selection as Biodiversity Engine",
    subtitle: "Natural selection, acting on genetic variation over time, is what creates the diversity of life.",
    overview:
      "Biodiversity exists because of evolution by natural selection. Genetic variation arises (mutation), the environment favors some variants over others (selection), and over many generations populations change and new species form. This is the engine that fills ecosystems with diverse, adapted organisms.",
    objectives: [
      "Explain natural selection and its requirements.",
      "Connect genetic variation to adaptation.",
      "Explain how selection drives biodiversity and speciation.",
    ],
    sections: [
      {
        title: "How natural selection works",
        body:
          "Natural selection needs three ingredients: variation among individuals (from mutation and sexual reproduction), heritability (traits passed to offspring), and differential survival/reproduction (some variants do better in the current environment). Over generations, favorable traits become more common — adaptation.",
        keyIdea: "Selection doesn't create variation — MUTATION does. Selection just FILTERS existing variation by the environment.",
        terms: [
          { term: "Natural selection", def: "Differential survival and reproduction based on heritable traits." },
          { term: "Genetic variation", def: "Differences in genes within a population; raw material for selection." },
          { term: "Adaptation", def: "A heritable trait that improves survival/reproduction in an environment." },
        ],
      },
      {
        title: "Selection builds biodiversity",
        body:
          "As populations adapt to different environments, they diverge — eventually forming new species (speciation). The more varied the environments and the more genetic variation available, the more biodiversity selection can generate. This also means biodiversity loss removes future adaptive potential.",
        terms: [
          { term: "Speciation", def: "The formation of new species as populations diverge." },
          { term: "Mutation", def: "A random change in DNA; the ultimate source of new genetic variation." },
        ],
        traps: ["Individuals don't 'evolve' or adapt within their lifetime — POPULATIONS evolve across generations."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 3,
    unitName: "The Living World: Biodiversity",
    title: "Island Biogeography — A Model for Habitat Patches",
    subtitle: "Island size and distance predict how many species live there — and the same logic applies to fragmented habitats.",
    overview:
      "Island biogeography theory explains why some islands hold more species than others: it's a balance of immigration and extinction set by island SIZE and DISTANCE from the mainland. Crucially, fragmented habitats act like islands, making this a key conservation tool.",
    objectives: [
      "Explain how island size and distance affect species number.",
      "Describe the immigration–extinction balance.",
      "Apply the model to habitat fragmentation.",
    ],
    sections: [
      {
        title: "Size and distance",
        body:
          "Two factors set an island's species count. Larger islands hold more species (more habitat, lower extinction). Islands closer to the mainland get more species (easier immigration). So the most species-rich islands are large and near; the poorest are small and remote.",
        table: {
          headers: ["Factor", "More species when…"],
          rows: [
            ["Island size", "LARGER (more habitat, less extinction)"],
            ["Distance to mainland", "CLOSER (more immigration)"],
          ],
        },
        keyIdea: "Big + near = most species; small + remote = fewest. It's a balance of immigration (distance) and extinction (size).",
      },
      {
        title: "Why it matters for conservation",
        body:
          "Habitat fragmentation turns continuous habitat into 'islands' of green surrounded by development. Smaller, more isolated patches lose species — which is why conservationists favor large reserves connected by corridors. The theory turns abstract math into real protected-area design.",
        terms: [
          { term: "Island biogeography", def: "Theory predicting species number from island size and isolation." },
          { term: "Habitat fragmentation", def: "Breaking continuous habitat into isolated patches, lowering biodiversity." },
        ],
        traps: ["The model applies to ANY isolated habitat patch (a forest fragment, a park) — not just literal ocean islands."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 4,
    unitName: "The Living World: Biodiversity",
    title: "Threats to Biodiversity — HIPPO",
    subtitle: "Five human-caused threats drive most biodiversity loss — remember them with HIPPO.",
    overview:
      "Most biodiversity loss comes from human activity, summarized by the acronym HIPPO: Habitat destruction, Invasive species, Pollution, Population (human), and Overharvesting. Habitat destruction is the single biggest driver.",
    objectives: [
      "List the five HIPPO threats to biodiversity.",
      "Identify the largest driver of biodiversity loss.",
      "Give an example of each threat.",
    ],
    sections: [
      {
        title: "The HIPPO threats",
        body:
          "Each letter is a major human-driven cause of species decline. Habitat destruction tops the list.",
        table: {
          headers: ["Letter", "Threat", "Example"],
          rows: [
            ["H", "Habitat destruction", "Deforestation, urban sprawl (the BIGGEST driver)"],
            ["I", "Invasive species", "Non-natives outcompeting locals"],
            ["P", "Pollution", "Pesticides, plastics, nutrient runoff"],
            ["P", "Population (human)", "Growing demand multiplies every other threat"],
            ["O", "Overharvesting", "Overfishing, poaching"],
          ],
        },
        keyIdea: "HIPPO = Habitat, Invasive, Pollution, Population, Overharvesting. Habitat destruction is #1.",
      },
      {
        title: "Why it adds up",
        body:
          "These threats interact and compound: a growing human population (P) drives more habitat destruction (H), pollution (P), and overharvesting (O). Climate change increasingly multiplies all of them. The result is an extinction rate far above the natural background level.",
        terms: [
          { term: "HIPPO", def: "Habitat destruction, Invasive species, Pollution, Population, Overharvesting." },
          { term: "Background extinction rate", def: "The natural rate of extinction; today's rate is far higher (human-driven)." },
        ],
        traps: ["If asked for the BIGGEST threat, it's HABITAT destruction — not invasive species or overharvesting."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 5,
    unitName: "The Living World: Biodiversity",
    title: "Keystone Species and Trophic Cascades",
    subtitle: "Some species hold an entire ecosystem together — remove them and the whole web unravels.",
    overview:
      "A keystone species has an effect on its ecosystem far larger than its numbers would suggest. Remove it and the community can collapse through a trophic cascade — a chain reaction rippling up or down the food web. Predators are often keystones.",
    objectives: [
      "Define keystone species and explain their outsized role.",
      "Explain trophic cascades with examples.",
      "Distinguish keystone species from dominant species.",
    ],
    diagram: "energy-pyramid",
    sections: [
      {
        title: "Keystone species",
        body:
          "Like the keystone in an arch, a keystone species is small in number but holds the structure together. Sea otters are the classic example: they eat sea urchins, which would otherwise devour kelp forests. Remove the otters and urchins explode, kelp vanishes, and dozens of species lose their habitat.",
        keyIdea: "Keystone ≠ most abundant. Its IMPACT is huge relative to its biomass — that's the whole point.",
        terms: [
          { term: "Keystone species", def: "A species with a disproportionately large effect on its ecosystem." },
          { term: "Dominant species", def: "The most ABUNDANT species — different from a keystone (defined by impact, not numbers)." },
        ],
      },
      {
        title: "Trophic cascades",
        body:
          "A trophic cascade is a chain of effects through the food web when a top species is added or removed. The reintroduction of wolves to Yellowstone is famous: wolves reduced elk overgrazing, letting vegetation (and the species depending on it) recover — effects cascading all the way to rivers.",
        terms: [
          { term: "Trophic cascade", def: "A chain reaction through a food web triggered by changing a top species." },
        ],
        traps: ["Removing a keystone PREDATOR often lets its prey explode and overconsume the next level — cascading collapse, not stability."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 6,
    unitName: "The Living World: Biodiversity",
    title: "Conservation Strategies — Protected Areas and Corridors",
    subtitle: "Saving biodiversity means protecting habitat at scale — big, connected, and well-managed.",
    overview:
      "Because habitat loss is the top threat, conservation focuses on protecting habitat: establishing protected areas, connecting them with corridors, and managing both whole ecosystems and individual species. Island biogeography guides the design.",
    objectives: [
      "Describe major conservation strategies.",
      "Explain why corridors and reserve size matter.",
      "Distinguish in-situ from ex-situ conservation.",
    ],
    sections: [
      {
        title: "Protect, connect, manage",
        body:
          "Conservation works at several scales. Protected areas (parks, reserves) preserve habitat in place; habitat corridors connect fragmented patches so animals can move, breed, and recolonize — directly applying island biogeography (bigger, less isolated = more species).",
        table: {
          headers: ["Strategy", "What it does"],
          rows: [
            ["Protected areas", "Set aside habitat from development"],
            ["Habitat corridors", "Connect patches so species can move/breed"],
            ["In-situ conservation", "Protect species in their natural habitat (best)"],
            ["Ex-situ conservation", "Protect off-site (zoos, seed banks) as backup"],
          ],
        },
        keyIdea: "Corridors fight fragmentation: connecting reserves turns small 'islands' back into one larger, more viable habitat.",
      },
      {
        title: "In-situ vs. ex-situ",
        body:
          "In-situ ('in place') conservation — protecting species in their natural habitat — is generally most effective because it preserves whole ecosystems. Ex-situ ('off-site') methods like zoos, captive breeding, and seed banks are important backups, especially for species on the brink.",
        terms: [
          { term: "Habitat corridor", def: "A strip of habitat connecting separated patches, enabling movement and gene flow." },
          { term: "In-situ / ex-situ", def: "Conservation in the natural habitat vs. off-site (zoos, seed banks)." },
        ],
        traps: ["In-situ (whole-habitat) protection is usually preferred; ex-situ is a backup, not a replacement."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 7,
    unitName: "The Living World: Biodiversity",
    title: "Invasive Species — Mechanisms and Case Studies",
    subtitle: "Move a species to a new place with no natural enemies, and it can take over — devastating native life.",
    overview:
      "An invasive species is a non-native organism that spreads and causes harm in a new ecosystem. Freed from the predators, competitors, and diseases that kept it in check back home, it can outcompete natives and disrupt entire ecosystems — a leading cause of biodiversity loss.",
    objectives: [
      "Define invasive species and why they succeed.",
      "Explain their ecological and economic harm.",
      "Identify pathways of introduction and control methods.",
    ],
    sections: [
      {
        title: "Why invasives win",
        body:
          "Invasive species thrive because in the new ecosystem they often have no natural predators or diseases, reproduce fast, and outcompete natives for resources. Humans spread them — intentionally (ornamental plants) or accidentally (ballast water, cargo). Examples: zebra mussels, kudzu, cane toads.",
        keyIdea: "The secret to an invasive's success: it left its natural enemies behind, so nothing keeps its population in check.",
        terms: [
          { term: "Invasive species", def: "A non-native species that spreads and harms its new ecosystem." },
          { term: "Native species", def: "A species that naturally occurs in an area, with co-evolved checks on it." },
        ],
      },
      {
        title: "Harm and control",
        body:
          "Invasives cause huge ecological damage (outcompeting or preying on natives, sometimes causing extinctions) and economic costs (clogging pipes, ruining crops). Control is hard once established: methods include physical removal, chemical treatment, and biological control (introducing a natural enemy — itself risky).",
        terms: [
          { term: "Ballast water", def: "Water carried by ships that often transports invasive aquatic species." },
          { term: "Biological control", def: "Using a natural predator/disease to control a pest — risky if it becomes invasive too." },
        ],
        traps: ["Not every non-native is 'invasive' — the term requires that it spreads AND causes harm."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 2, lessonNum: 8,
    unitName: "The Living World: Biodiversity",
    title: "Endangered Species and International Agreements",
    subtitle: "Saving species on the brink takes laws at home and treaties across borders.",
    overview:
      "When species approach extinction, protecting them requires legal action — national laws like the Endangered Species Act and international agreements like CITES. Because wildlife and trade cross borders, no single country can do it alone.",
    objectives: [
      "Distinguish threatened from endangered species.",
      "Describe key conservation laws and treaties.",
      "Explain why international cooperation is necessary.",
    ],
    sections: [
      {
        title: "Laws and treaties",
        body:
          "Protection happens at two levels. National laws (e.g., the US Endangered Species Act) make it illegal to harm listed species or their habitat. International treaties coordinate across borders — CITES regulates trade in endangered species, and other agreements protect habitats and migratory species.",
        table: {
          headers: ["Tool", "What it does"],
          rows: [
            ["Endangered Species Act (US)", "Lists and legally protects species & habitat"],
            ["CITES", "Regulates international trade in endangered species"],
            ["IUCN Red List", "Assesses and ranks extinction risk globally"],
          ],
        },
        keyIdea: "CITES targets the TRADE in endangered species (ivory, exotic pets) — a cross-border problem needing a treaty.",
      },
      {
        title: "Why cooperation matters",
        body:
          "Animals migrate, and the trade in wildlife is global, so one nation's protection fails if neighbors don't cooperate. International agreements also help fund conservation in biodiverse but lower-income countries, where much of Earth's biodiversity lives.",
        terms: [
          { term: "Endangered vs. threatened", def: "Endangered = at risk of extinction now; threatened = likely to become endangered soon." },
          { term: "CITES", def: "Treaty regulating international trade in endangered species." },
        ],
        traps: ["Endangered (imminent extinction risk) is MORE severe than threatened (likely to become endangered) — don't swap them."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 1,
    unitName: "Populations",
    title: "Population Dynamics — Growth Models",
    subtitle: "Populations either grow explosively (J-curve) or level off at the environment's limit (S-curve).",
    overview:
      "Populations change through births, deaths, and migration. Two models capture how: exponential growth (a J-curve, unlimited) and logistic growth (an S-curve that levels off at carrying capacity). Recognizing which applies — and what limits growth — is the core of this unit.",
    objectives: [
      "Compare exponential and logistic growth.",
      "Define carrying capacity and limiting factors.",
      "Distinguish density-dependent and density-independent factors.",
    ],
    sections: [
      {
        title: "Two growth models",
        body:
          "Exponential growth (J-curve) happens when resources are unlimited — the population explodes. In reality, resources run short, so growth slows and levels off at the carrying capacity (K), producing the S-shaped logistic curve.",
        table: {
          headers: ["Model", "Shape", "When"],
          rows: [
            ["Exponential", "J-curve", "Unlimited resources (rare, temporary)"],
            ["Logistic", "S-curve", "Growth slows to carrying capacity (K)"],
          ],
        },
        keyIdea: "Exponential = J-curve (unlimited). Logistic = S-curve leveling at carrying capacity (K). Reality is usually logistic.",
        terms: [
          { term: "Carrying capacity (K)", def: "The maximum population an environment can sustain long-term." },
          { term: "Exponential vs. logistic growth", def: "Unlimited J-curve vs. resource-limited S-curve." },
        ],
      },
      {
        title: "What limits growth",
        body:
          "Limiting factors keep populations near K. Density-dependent factors intensify as the population grows (disease, competition, predation); density-independent factors hit regardless of size (natural disasters, weather). Populations that overshoot K often crash (a die-off).",
        terms: [
          { term: "Density-dependent factor", def: "A limit that strengthens as population density rises (disease, competition)." },
          { term: "Density-independent factor", def: "A limit that acts regardless of density (storms, fire, drought)." },
        ],
        traps: ["Density-DEPENDENT effects scale with crowding (disease); density-INDEPENDENT (a hurricane) hit any size population the same."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 2,
    unitName: "Populations",
    title: "Population Density and Distribution Patterns",
    subtitle: "It's not just how many — it's how crowded, and how they're spread out.",
    overview:
      "Beyond raw numbers, ecologists describe populations by their density (how many per area) and dispersion (how individuals are spread). These patterns reveal how organisms interact with resources and each other.",
    objectives: [
      "Define population density.",
      "Compare the three dispersion patterns.",
      "Explain what causes each pattern.",
    ],
    sections: [
      {
        title: "Density and dispersion",
        body:
          "Population density is the number of individuals per unit area. Dispersion describes their spatial arrangement — and the pattern tells you about resources and behavior.",
        table: {
          headers: ["Dispersion", "Pattern", "Cause"],
          rows: [
            ["Clumped", "Groups/clusters (most common)", "Patchy resources; social groups"],
            ["Uniform", "Evenly spaced", "Territoriality / competition"],
            ["Random", "No pattern (rare)", "Resources evenly available, no interaction"],
          ],
        },
        keyIdea: "Clumped is the MOST common in nature — resources and mates are patchy, so organisms cluster.",
      },
      {
        title: "Why patterns matter",
        body:
          "Dispersion reveals ecology: uniform spacing usually signals competition or territoriality (e.g., nesting birds); clumping signals patchy resources or herd/social behavior. Density affects how strongly density-dependent factors (like disease) act.",
        terms: [
          { term: "Population density", def: "The number of individuals per unit area or volume." },
          { term: "Dispersion", def: "The spatial pattern of individuals: clumped, uniform, or random." },
        ],
        traps: ["Uniform dispersion usually means COMPETITION/territoriality; clumped means patchy resources or social grouping."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 3,
    unitName: "Populations",
    title: "Age Structure Diagrams — Predicting the Future",
    subtitle: "The shape of a population's age pyramid tells you whether it will grow, hold steady, or shrink.",
    overview:
      "An age structure diagram (population pyramid) shows the proportion of a population in each age group by sex. Its SHAPE predicts future growth: a wide base means lots of young people and rapid growth ahead; a narrow base means a shrinking population.",
    objectives: [
      "Read an age structure diagram.",
      "Connect pyramid shape to future growth.",
      "Explain population momentum.",
    ],
    diagram: "population-pyramid",
    sections: [
      {
        title: "Shape predicts growth",
        body:
          "The width of each bar shows how many people are in that age group. A wide base (many children) signals rapid future growth; straight sides signal stability; a narrow base (few children) signals decline.",
        table: {
          headers: ["Shape", "Base", "Future"],
          rows: [
            ["Pyramid (wide base)", "Many young", "Rapid growth (developing nations)"],
            ["Column (straight)", "Even", "Stable (developed nations)"],
            ["Inverted (narrow base)", "Few young", "Shrinking population"],
          ],
        },
        keyIdea: "Wide base = future growth; narrow base = future decline. The youngest cohort predicts the next generation.",
      },
      {
        title: "Population momentum",
        body:
          "Even if birth rates drop to replacement level, a population with a wide base keeps growing for decades — because that huge young cohort still has to reach reproductive age. This lag is population momentum, and it's why fast-growing countries can't stabilize instantly.",
        terms: [
          { term: "Age structure diagram", def: "A graph of a population's age and sex composition; predicts growth." },
          { term: "Population momentum", def: "Continued growth after birth rates fall, due to a large young cohort." },
        ],
        traps: ["A wide base means growth will continue even if birth rates drop NOW — that's population momentum."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 4,
    unitName: "Populations",
    title: "Human Population Growth — Demographic Transition",
    subtitle: "As countries develop, their birth and death rates fall in a predictable four-stage sequence.",
    overview:
      "The demographic transition model (DTM) describes how a country's birth and death rates change as it develops, moving through four (sometimes five) stages — from high birth/high death, through a population boom, to low birth/low death. It links development to population growth.",
    objectives: [
      "Describe the stages of the demographic transition model.",
      "Explain why the population booms in the middle stages.",
      "Connect development to falling birth rates.",
    ],
    diagram: "dtm",
    sections: [
      {
        title: "The four stages",
        body:
          "The DTM tracks birth and death rates as a society industrializes. The key insight: death rates fall FIRST (better medicine, food, sanitation), while birth rates stay high — causing a population explosion — until birth rates eventually fall too.",
        table: {
          headers: ["Stage", "Birth / Death rates", "Population"],
          rows: [
            ["1 Pre-industrial", "High birth, high death", "Stable, low"],
            ["2 Transitional", "High birth, FALLING death", "Rapid growth (boom)"],
            ["3 Industrial", "Falling birth, low death", "Growth slows"],
            ["4 Post-industrial", "Low birth, low death", "Stable / declining"],
          ],
        },
        keyIdea: "Death rates drop BEFORE birth rates — that gap (Stage 2) is what causes the population explosion.",
      },
      {
        title: "Why birth rates fall",
        body:
          "As countries develop, birth rates decline because of education (especially of women), access to family planning, urbanization, and children shifting from economic assets (farm labor) to economic costs. Higher development → lower fertility is one of the most reliable patterns in the course.",
        terms: [
          { term: "Demographic transition model", def: "Four-stage model of how birth/death rates change with development." },
          { term: "Total fertility rate", def: "Average children per woman; ~2.1 is replacement level." },
        ],
        traps: ["The population boom is from the LAG: death rates fall fast, birth rates fall slowly — Stage 2 growth."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 5,
    unitName: "Populations",
    title: "Survivorship Curves — Who Dies When",
    subtitle: "Three curve shapes capture an organism's life strategy — care for few young, or flood the world with many.",
    overview:
      "A survivorship curve plots how many individuals of a species survive at each age. The three types (I, II, III) reveal a species' reproductive strategy — from few well-cared-for offspring to many neglected ones.",
    objectives: [
      "Describe the three survivorship curve types.",
      "Connect each to a reproductive strategy.",
      "Give example organisms for each.",
    ],
    sections: [
      {
        title: "Three curve types",
        body:
          "Each curve shows survival across the lifespan. Type I species invest heavily in few offspring (most survive to old age); Type III produce huge numbers with little care (most die young); Type II have a constant death rate at all ages.",
        table: {
          headers: ["Type", "Pattern", "Example"],
          rows: [
            ["Type I", "Most survive to old age, die late", "Humans, large mammals"],
            ["Type II", "Constant death rate at all ages", "Birds, rodents"],
            ["Type III", "Most die young, few survive", "Fish, insects, plants"],
          ],
        },
        keyIdea: "Type I = few offspring, lots of care (K-strategists). Type III = many offspring, no care (r-strategists).",
      },
      {
        title: "Linking to strategy",
        body:
          "Survivorship reflects the r/K trade-off. K-strategists (Type I) have few offspring, invest heavily, and live near carrying capacity. r-strategists (Type III) reproduce fast with many offspring, betting that a few survive — typical of unstable environments.",
        terms: [
          { term: "Survivorship curve", def: "A graph of the proportion of individuals surviving at each age." },
          { term: "r vs. K strategist", def: "Many cheap offspring (r, Type III) vs. few well-cared-for offspring (K, Type I)." },
        ],
        traps: ["Type III (most die young) belongs to r-strategists (fish, insects) — don't confuse it with Type I (humans)."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 6,
    unitName: "Populations",
    title: "Resource Consumption and Ecological Footprint",
    subtitle: "It's not just how many people — it's how much each one consumes.",
    overview:
      "An ecological footprint measures the land and resources a person or population needs to support its consumption and absorb its waste. The key insight: a few high-consuming people can have a bigger environmental impact than many low-consuming ones.",
    objectives: [
      "Define ecological footprint.",
      "Explain how consumption (not just population) drives impact.",
      "Compare footprints of developed vs. developing nations.",
    ],
    sections: [
      {
        title: "Footprint = population × consumption",
        body:
          "Environmental impact isn't just headcount — it's how much each person uses. The ecological footprint captures total demand on nature. Wealthy nations have far larger per-capita footprints (more energy, meat, goods, waste) than poorer ones, even with smaller populations.",
        keyIdea: "A wealthy nation's small population can out-impact a poor nation's huge one — consumption per person matters as much as numbers.",
        terms: [
          { term: "Ecological footprint", def: "The land/resources needed to support a person's or population's consumption and absorb its waste." },
          { term: "Per-capita consumption", def: "Resource use per person; much higher in developed nations." },
        ],
      },
      {
        title: "The IPAT idea",
        body:
          "Impact is often summarized as I = P × A × T: Population × Affluence (consumption) × Technology. Rising affluence in developing nations and high consumption in developed ones both increase global impact — which is why sustainability targets consumption, not just population.",
        terms: [
          { term: "IPAT", def: "Impact = Population × Affluence × Technology — a framework for environmental impact." },
          { term: "Overconsumption", def: "Resource use beyond sustainable levels, common in wealthy nations." },
        ],
        traps: ["Don't equate 'big population' with 'big impact' — high per-capita consumption can outweigh sheer numbers."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 7,
    unitName: "Populations",
    title: "Sustainable Yield and Fisheries Management",
    subtitle: "Harvest at the rate nature replenishes, and you can take forever; take more, and you collapse the resource.",
    overview:
      "A sustainable yield is the amount of a renewable resource you can harvest without depleting it — matching harvest to natural regrowth. Fisheries are the classic case: overfishing beyond the sustainable yield causes population collapse.",
    objectives: [
      "Define sustainable yield and maximum sustainable yield.",
      "Explain how overharvesting collapses a resource.",
      "Describe fisheries management strategies.",
    ],
    sections: [
      {
        title: "Harvest vs. regrowth",
        body:
          "A renewable resource regrows, but only so fast. The sustainable yield is the harvest rate that matches that regrowth, so the stock stays stable. The maximum sustainable yield (MSY) is the largest catch you can take indefinitely — usually when the population is at about half its carrying capacity, where growth is fastest.",
        keyIdea: "Take ≤ the regrowth rate and the resource lasts forever; take more and you're spending the 'principal,' not the 'interest.'",
        terms: [
          { term: "Sustainable yield", def: "Harvest rate that matches natural regrowth, keeping the resource stable." },
          { term: "Maximum sustainable yield", def: "The largest catch sustainable long-term (~half carrying capacity)." },
        ],
      },
      {
        title: "Managing fisheries",
        body:
          "Overfishing — taking more than the sustainable yield — has collapsed major fisheries (e.g., Atlantic cod). Management tools include catch quotas, size/gear limits, no-take marine protected areas, and seasonal closures to let stocks recover. Bycatch (unintended catch) is a major side problem.",
        terms: [
          { term: "Overfishing", def: "Harvesting fish faster than they can reproduce, collapsing the stock." },
          { term: "Bycatch", def: "Non-target species caught unintentionally during fishing." },
        ],
        traps: ["MSY is highest near HALF the carrying capacity (fastest growth) — not at maximum population."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 3, lessonNum: 8,
    unitName: "Populations",
    title: "Human Population Policies and Ethics",
    subtitle: "How — and whether — governments should shape population raises hard ethical questions.",
    overview:
      "Faced with rapid growth (or decline), governments adopt population policies — some to reduce births, others to encourage them. These range from voluntary (education, family planning) to coercive (China's former one-child policy), each raising ethical debate.",
    objectives: [
      "Distinguish anti-natalist from pro-natalist policies.",
      "Give examples and evaluate their effects.",
      "Identify ethical concerns with population control.",
    ],
    sections: [
      {
        title: "Two directions of policy",
        body:
          "Policies push either way. Anti-natalist policies aim to lower birth rates (China's one-child policy, family-planning programs); pro-natalist policies encourage births where populations are shrinking and aging (incentives in countries like Japan or France).",
        table: {
          headers: ["Policy type", "Goal", "Example"],
          rows: [
            ["Anti-natalist", "Reduce births", "China's former one-child policy"],
            ["Pro-natalist", "Increase births", "Baby bonuses in low-fertility nations"],
            ["Empowerment (most effective)", "Lower births voluntarily", "Educating & employing women"],
          ],
        },
        keyIdea: "The most effective AND ethical way to slow growth is educating and empowering women — it lowers fertility voluntarily.",
      },
      {
        title: "Effects and ethics",
        body:
          "China's one-child policy slowed growth but caused a skewed sex ratio and an aging population. Coercive policies raise serious ethical concerns about human rights and bodily autonomy. Most experts favor voluntary approaches — education, healthcare, and family planning — which reduce fertility while respecting rights.",
        terms: [
          { term: "Anti-natalist / pro-natalist", def: "Policies that discourage vs. encourage childbearing." },
          { term: "Family planning", def: "Voluntary access to contraception and reproductive education; lowers fertility ethically." },
        ],
        traps: ["China's one-child policy had unintended effects: a skewed male:female ratio and a rapidly aging population."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 1,
    unitName: "Earth Systems and Resources",
    title: "Plate Tectonics and Earth's Interior",
    subtitle: "Earth's crust floats on a moving mantle — and where the plates meet, geology happens.",
    overview:
      "Earth's outer shell is broken into tectonic plates that slowly move atop the hot, flowing mantle. Where plates interact, you get earthquakes, volcanoes, and mountains. The type of boundary determines what forms.",
    objectives: [
      "Describe Earth's layered interior.",
      "Identify the three plate boundary types and their features.",
      "Connect plate tectonics to natural hazards.",
    ],
    sections: [
      {
        title: "Earth's layers and plate boundaries",
        body:
          "Earth has a core, a thick mantle, and a thin crust. Heat from the core drives convection currents in the mantle that move the plates. Where plates meet, three boundary types produce different geology.",
        table: {
          headers: ["Boundary", "Motion", "Result"],
          rows: [
            ["Divergent", "Plates move apart", "New crust; mid-ocean ridges, rift valleys"],
            ["Convergent", "Plates collide", "Mountains, volcanoes, subduction, earthquakes"],
            ["Transform", "Plates slide past", "Earthquakes (e.g., San Andreas Fault)"],
          ],
        },
        keyIdea: "Mantle convection is the ENGINE that moves the plates — and plate boundaries are where most geologic hazards happen.",
      },
      {
        title: "Hazards and resources",
        body:
          "Convergent boundaries (subduction zones) create the most dramatic features: volcanoes, the deepest earthquakes, and mountain ranges. Plate activity also concentrates resources (minerals, geothermal energy) and shapes hazard maps — most volcanoes and big quakes ring the Pacific 'Ring of Fire.'",
        terms: [
          { term: "Tectonic plates", def: "Large sections of Earth's crust that move over the mantle." },
          { term: "Convection currents", def: "Mantle heat flows that drive plate movement." },
          { term: "Subduction", def: "One plate sliding beneath another at a convergent boundary." },
        ],
        traps: ["Divergent = plates APART (new crust); convergent = TOGETHER. Transform = sliding past (quakes, no new crust)."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 2,
    unitName: "Earth Systems and Resources",
    title: "The Rock Cycle and Soil Formation",
    subtitle: "Rocks endlessly transform into one another — and their breakdown builds the soil all land life depends on.",
    overview:
      "The rock cycle describes how the three rock types (igneous, sedimentary, metamorphic) transform into one another over time. The weathering of rock, combined with organic matter, forms soil — a critical, slowly renewable resource with distinct layers (horizons).",
    objectives: [
      "Describe the three rock types and the rock cycle.",
      "Explain weathering and soil formation.",
      "Identify soil horizons and properties.",
    ],
    sections: [
      {
        title: "The rock cycle",
        body:
          "Three rock types cycle endlessly. Igneous rock forms from cooled magma; sedimentary from compressed sediments (often holding fossils and fossil fuels); metamorphic from rock changed by heat and pressure. Weathering and erosion break rock into the mineral base of soil.",
        table: {
          headers: ["Rock type", "Forms from"],
          rows: [
            ["Igneous", "Cooled/solidified magma or lava"],
            ["Sedimentary", "Compacted sediments (holds fossils, fossil fuels)"],
            ["Metamorphic", "Existing rock altered by heat & pressure"],
          ],
        },
        keyIdea: "Fossil fuels and fossils are found in SEDIMENTARY rock — formed from compressed ancient organic matter and sediments.",
      },
      {
        title: "Soil formation and horizons",
        body:
          "Soil forms slowly as weathered rock mixes with decomposed organic matter (humus). It develops layered horizons: O (organic litter), A (topsoil — richest), B (subsoil), C (weathered parent rock). Soil texture (sand/silt/clay proportions) controls water retention and fertility.",
        terms: [
          { term: "Weathering", def: "The physical/chemical breakdown of rock into smaller particles." },
          { term: "Soil horizons", def: "Layers of soil (O, A, B, C); the A horizon (topsoil) is the most fertile." },
          { term: "Soil texture", def: "The proportion of sand, silt, and clay; controls water and nutrient holding." },
        ],
        traps: ["Topsoil (A horizon) is the fertile layer — slow to form and easily lost to erosion, so it's effectively nonrenewable on human timescales."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 3,
    unitName: "Earth Systems and Resources",
    title: "The Atmosphere — Structure and Composition",
    subtitle: "A thin envelope of gas in layers — and the ozone layer that shields life from UV.",
    overview:
      "The atmosphere is mostly nitrogen and oxygen, arranged in layers by temperature. Two layers matter most for the exam: the troposphere (where weather and we live) and the stratosphere (home to the protective ozone layer).",
    objectives: [
      "State the atmosphere's main composition.",
      "Identify the key atmospheric layers.",
      "Explain the role of the ozone layer.",
    ],
    sections: [
      {
        title: "Composition and layers",
        body:
          "Dry air is about 78% nitrogen and 21% oxygen, with trace gases (including CO₂) making up the rest. The atmosphere is layered by temperature; the two you must know are the troposphere and stratosphere.",
        table: {
          headers: ["Layer", "Feature"],
          rows: [
            ["Troposphere", "Lowest; weather happens here; where we live"],
            ["Stratosphere", "Above; contains the protective OZONE layer"],
          ],
        },
        keyIdea: "Troposphere = weather + life (bottom). Stratosphere = ozone layer (above). Don't swap them.",
      },
      {
        title: "The ozone layer",
        body:
          "In the stratosphere, the ozone layer absorbs most of the sun's harmful ultraviolet (UV) radiation, protecting life from skin cancer and ecosystem damage. This 'good' high-altitude ozone is different from 'bad' ground-level ozone (a pollutant) — a distinction the exam loves.",
        terms: [
          { term: "Troposphere", def: "The lowest atmospheric layer, where weather occurs." },
          { term: "Stratosphere", def: "The layer above the troposphere, containing the ozone layer." },
          { term: "Ozone layer", def: "Stratospheric ozone that absorbs harmful UV radiation." },
        ],
        traps: ["'Good' ozone is in the STRATOSPHERE (shields UV); 'bad' ozone is at GROUND level (a pollutant). Same molecule, opposite roles."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 4,
    unitName: "Earth Systems and Resources",
    title: "Solar Radiation, Albedo, and Earth's Energy Budget",
    subtitle: "The sun powers everything — and how much energy Earth keeps vs. reflects sets the climate.",
    overview:
      "Nearly all of Earth's energy comes from the sun. The planet's temperature depends on its energy budget: incoming solar radiation vs. energy reflected and radiated back to space. Albedo — surface reflectivity — is a key control, and it sets up powerful feedback loops.",
    objectives: [
      "Explain the Earth's energy budget.",
      "Define albedo and give high/low examples.",
      "Describe the ice-albedo feedback loop.",
    ],
    sections: [
      {
        title: "Energy in vs. energy out",
        body:
          "Earth stays roughly stable when incoming solar energy equals outgoing energy. Some sunlight is reflected (by clouds, ice, light surfaces), some absorbed and re-radiated as heat. Greenhouse gases trap some outgoing heat, warming the planet — the natural greenhouse effect.",
        keyIdea: "Climate is an energy BALANCE: change how much is reflected or trapped, and the temperature shifts.",
        terms: [
          { term: "Energy budget", def: "The balance of incoming solar vs. outgoing reflected/radiated energy." },
          { term: "Albedo", def: "The reflectivity of a surface; high for ice/snow, low for dark land/ocean." },
        ],
      },
      {
        title: "Albedo and feedback",
        body:
          "Light surfaces (ice, snow, clouds) have HIGH albedo — they reflect sunlight and cool the planet. Dark surfaces (ocean, forest, asphalt) have LOW albedo — they absorb and warm. This drives the ice-albedo feedback: warming melts reflective ice, exposing dark ocean, which absorbs more heat, causing more melting — a positive (amplifying) feedback loop.",
        terms: [
          { term: "Ice-albedo feedback", def: "Melting ice exposes dark surfaces that absorb more heat, accelerating warming." },
          { term: "Positive feedback loop", def: "A self-amplifying cycle (a change causes more of the same change)." },
        ],
        traps: ["High albedo = reflective/cooling (ice); low albedo = absorbing/warming (ocean). The ice-albedo loop is POSITIVE (amplifying)."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 5,
    unitName: "Earth Systems and Resources",
    title: "Global Wind Patterns and Ocean Currents",
    subtitle: "Uneven heating plus Earth's spin set up the winds and currents that move heat around the planet.",
    overview:
      "The equator gets more direct sunlight than the poles, and that uneven heating — combined with Earth's rotation (the Coriolis effect) — drives global wind patterns and ocean currents. Together they redistribute heat and shape climate worldwide.",
    objectives: [
      "Explain how uneven heating drives circulation.",
      "Describe the Coriolis effect and convection cells.",
      "Explain how currents redistribute heat.",
    ],
    sections: [
      {
        title: "Convection and the Coriolis effect",
        body:
          "Intense heating at the equator makes warm air rise, creating convection cells (like the Hadley cell) that circulate air toward the poles and back. Earth's rotation deflects this moving air via the Coriolis effect, producing the prevailing wind belts (trade winds, westerlies).",
        keyIdea: "Uneven heating (equator vs. poles) + Earth's rotation (Coriolis) = the global pattern of winds and currents.",
        terms: [
          { term: "Convection cell", def: "A loop of rising warm air and sinking cool air (e.g., Hadley cell)." },
          { term: "Coriolis effect", def: "The deflection of moving air/water due to Earth's rotation." },
        ],
      },
      {
        title: "Currents move heat",
        body:
          "Winds drive surface ocean currents that carry warm water from the equator toward the poles and cold water back (e.g., the Gulf Stream warms Europe). This global conveyor redistributes enormous amounts of heat, moderating coastal climates and driving rainfall patterns.",
        terms: [
          { term: "Ocean currents", def: "Large-scale water movements that redistribute heat around the globe." },
          { term: "Upwelling", def: "Wind-driven rise of cold, nutrient-rich deep water, supporting rich fisheries." },
        ],
        traps: ["Upwelling brings NUTRIENTS to the surface, fueling productive fisheries — disrupted during El Niño."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 6,
    unitName: "Earth Systems and Resources",
    title: "El Niño/La Niña and Climate Variability",
    subtitle: "A periodic shift in Pacific winds and currents that reshuffles weather across the globe.",
    overview:
      "El Niño and La Niña (the ENSO cycle) are periodic changes in Pacific Ocean temperatures and winds that disrupt normal patterns, causing droughts, floods, and fishery collapses far beyond the Pacific. They're natural climate variability, separate from long-term climate change.",
    objectives: [
      "Describe El Niño and La Niña conditions.",
      "Explain their effects on weather and fisheries.",
      "Distinguish ENSO from long-term climate change.",
    ],
    sections: [
      {
        title: "El Niño vs. La Niña",
        body:
          "Normally, trade winds push warm water west across the Pacific, allowing cold, nutrient-rich upwelling off South America. In El Niño, those winds weaken, warm water sloshes back east, and upwelling shuts down — collapsing fisheries and shifting rainfall worldwide. La Niña is the intensified opposite.",
        table: {
          headers: ["Phase", "Pacific conditions", "Effects"],
          rows: [
            ["El Niño", "Weak trade winds; warm water east", "Less upwelling, fishery decline, altered global weather"],
            ["La Niña", "Strong trade winds; cold water east", "Strong upwelling; opposite weather shifts"],
          ],
        },
        keyIdea: "El Niño shuts down nutrient upwelling off South America → fisheries collapse and weather patterns scramble worldwide.",
      },
      {
        title: "Variability vs. change",
        body:
          "ENSO is natural, short-term variability — a cycle every few years — not the same as human-driven, long-term climate change. The exam wants you to keep them separate, though climate change may affect ENSO's intensity.",
        terms: [
          { term: "El Niño / ENSO", def: "Periodic Pacific warming that disrupts upwelling and global weather." },
          { term: "Climate variability vs. change", def: "Short-term natural cycles (ENSO) vs. long-term human-driven warming." },
        ],
        traps: ["El Niño/La Niña is natural, cyclical VARIABILITY — don't confuse it with long-term, human-caused climate CHANGE."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 7,
    unitName: "Earth Systems and Resources",
    title: "Water Systems — Hydrological Cycle and Freshwater",
    subtitle: "Almost all of Earth's water is salty or frozen — the tiny sliver of accessible freshwater is what we fight over.",
    overview:
      "Water cycles continuously through evaporation, condensation, precipitation, and runoff. But of all Earth's water, only a tiny fraction is fresh and accessible. Understanding where freshwater is — and how we tap groundwater — is central to water-resource issues.",
    objectives: [
      "Describe the hydrological cycle.",
      "Explain the distribution of Earth's water.",
      "Describe aquifers and groundwater depletion.",
    ],
    sections: [
      {
        title: "The water cycle and where water is",
        body:
          "The hydrologic cycle moves water via evaporation (and transpiration from plants), condensation into clouds, precipitation, and runoff/infiltration. But ~97% of Earth's water is salty ocean; most freshwater is locked in ice. Only a tiny percentage is accessible liquid freshwater (rivers, lakes, groundwater).",
        keyIdea: "~97% salt water, most of the rest frozen — humanity depends on a TINY sliver of accessible freshwater.",
        terms: [
          { term: "Hydrologic cycle", def: "The continuous movement of water through evaporation, condensation, precipitation, runoff." },
          { term: "Transpiration", def: "Water released to the air by plants; part of the water cycle." },
        ],
      },
      {
        title: "Groundwater and aquifers",
        body:
          "Much freshwater is stored underground in aquifers (porous rock layers). We pump it from wells, but in many places extraction exceeds recharge, causing groundwater depletion, sinking land (subsidence), and saltwater intrusion in coastal areas. The Ogallala Aquifer is a classic over-tapped example.",
        terms: [
          { term: "Aquifer", def: "An underground layer of rock/sediment that stores groundwater." },
          { term: "Groundwater depletion", def: "Withdrawing groundwater faster than it recharges." },
          { term: "Saltwater intrusion", def: "Seawater seeping into a depleted coastal aquifer." },
        ],
        traps: ["Aquifers recharge SLOWLY — over-pumping (e.g., Ogallala) effectively mines a nonrenewable resource on human timescales."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 4, lessonNum: 8,
    unitName: "Earth Systems and Resources",
    title: "Natural Disasters — Frequency, Magnitude, Prediction",
    subtitle: "Natural hazards become disasters when they hit people — and human choices often make them worse.",
    overview:
      "Earthquakes, volcanoes, hurricanes, floods, and droughts are natural hazards. They become disasters when they affect humans, and human actions (building in floodplains, removing wetlands) often raise the toll. Understanding their causes aids prediction and preparation.",
    objectives: [
      "Distinguish natural hazards from disasters.",
      "Connect hazards to Earth systems.",
      "Explain how human choices affect disaster impact.",
    ],
    sections: [
      {
        title: "Types and causes",
        body:
          "Many disasters trace back to Earth systems you've studied. Geologic hazards (earthquakes, volcanoes, tsunamis) come from plate tectonics; weather/climate hazards (hurricanes, floods, droughts, wildfires) come from atmospheric and ocean processes.",
        table: {
          headers: ["Hazard", "Driven by"],
          rows: [
            ["Earthquakes, volcanoes, tsunamis", "Plate tectonics"],
            ["Hurricanes", "Warm ocean water + atmosphere"],
            ["Floods, droughts", "Precipitation extremes / climate"],
          ],
        },
        keyIdea: "A 'natural disaster' = a natural hazard + vulnerable people. The hazard is natural; much of the damage is a human choice.",
      },
      {
        title: "Human impact and prediction",
        body:
          "Human decisions amplify disasters: building on floodplains or fault lines, removing mangroves/wetlands that buffer storms, and deforesting slopes that then landslide. Better prediction (seismographs, weather models) and preparation (zoning, early warning) reduce the toll, but can't eliminate it.",
        terms: [
          { term: "Natural hazard vs. disaster", def: "A natural event vs. one that causes human harm/loss." },
          { term: "Floodplain", def: "Low land near rivers prone to flooding; risky to build on." },
        ],
        traps: ["Human choices (where we build, removing natural buffers) often turn a manageable hazard into a deadly disaster."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 1,
    unitName: "Land and Water Use",
    title: "Agriculture — Green Revolution and Its Consequences",
    subtitle: "New seeds and chemicals fed billions — but with serious environmental costs.",
    overview:
      "The Green Revolution dramatically raised food production using high-yield crop varieties, irrigation, synthetic fertilizers, and pesticides. It prevented famine for billions, but its industrial methods carry heavy environmental and social costs.",
    objectives: [
      "Describe the Green Revolution and its methods.",
      "Explain its benefits and environmental costs.",
      "Distinguish industrial from subsistence agriculture.",
    ],
    sections: [
      {
        title: "What the Green Revolution did",
        body:
          "Beginning mid-20th century, the Green Revolution introduced high-yield variety (HYV) crops plus heavy inputs — irrigation, synthetic fertilizer, and pesticides — and mechanization. Yields soared, dramatically increasing the food supply and averting mass famine, especially in Asia.",
        keyIdea: "The Green Revolution traded huge yield gains for heavy dependence on water, fertilizer, pesticides, and fossil fuels.",
        terms: [
          { term: "Green Revolution", def: "Mid-1900s rise in crop yields via HYV seeds, irrigation, fertilizers, and pesticides." },
          { term: "Monoculture", def: "Growing a single crop over a large area; high yield but vulnerable to pests/disease." },
        ],
      },
      {
        title: "The environmental costs",
        body:
          "Industrial agriculture's costs are large: fertilizer runoff causes eutrophication; pesticides harm non-target species and breed resistance; irrigation depletes water and salinizes soil; monocultures erode biodiversity; and the whole system is fossil-fuel intensive. Contrast it with low-input subsistence farming.",
        terms: [
          { term: "Industrial agriculture", def: "High-input, high-yield farming reliant on chemicals, machinery, and irrigation." },
          { term: "Subsistence agriculture", def: "Small-scale farming to feed one's own family, with low inputs." },
        ],
        traps: ["The Green Revolution boosted YIELDS but increased reliance on irrigation, fertilizer, pesticides, and fossil fuels — its core trade-off."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 2,
    unitName: "Land and Water Use",
    title: "Soil Degradation — Erosion, Salinization, Desertification",
    subtitle: "Farming the wrong way strips, salts, or dries out the soil — turning farmland into wasteland.",
    overview:
      "Soil is a slowly-renewable resource, and poor land use degrades it faster than it forms. Three big culprits — erosion, salinization, and desertification — reduce fertility and can permanently damage land.",
    objectives: [
      "Explain the main causes and effects of soil erosion.",
      "Define salinization and desertification.",
      "Connect agricultural practices to soil degradation.",
    ],
    sections: [
      {
        title: "Three ways soil degrades",
        body:
          "Each form of degradation has a distinct cause. Erosion is the loss of topsoil to wind and water, worsened by removing plant cover (tilling, overgrazing). Salinization is salt buildup from evaporating irrigation water. Desertification is productive land turning desert-like from drought plus overuse.",
        table: {
          headers: ["Process", "Cause", "Result"],
          rows: [
            ["Erosion", "Tilling, deforestation, overgrazing", "Loss of fertile topsoil"],
            ["Salinization", "Irrigation water evaporates, leaving salt", "Soil too salty for crops"],
            ["Desertification", "Drought + overgrazing/overfarming", "Land becomes desert-like"],
          ],
        },
        keyIdea: "All three trace back to removing plant cover or overusing land — vegetation is what holds and protects soil.",
      },
      {
        title: "Why it matters",
        body:
          "Topsoil takes centuries to form but can erode in years, so degradation is effectively permanent on human timescales. It threatens food security and, through desertification, can displace entire populations. The Dust Bowl is the classic erosion case.",
        terms: [
          { term: "Erosion", def: "The wearing away and removal of topsoil by wind and water." },
          { term: "Salinization", def: "Accumulation of salts in soil from evaporating irrigation water." },
          { term: "Desertification", def: "Productive land degrading into desert from drought and overuse." },
        ],
        traps: ["Salinization is caused by IRRIGATION (evaporation leaves salt behind) — a key downside of irrigated agriculture."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 3,
    unitName: "Land and Water Use",
    title: "Sustainable Agriculture — Conservation Practices",
    subtitle: "Farming methods that grow food while protecting soil, water, and biodiversity for the long haul.",
    overview:
      "Sustainable agriculture aims to produce food without degrading the resources it depends on. A toolkit of conservation practices protects soil, reduces chemical inputs, and maintains productivity over time.",
    objectives: [
      "Identify key sustainable farming practices.",
      "Explain how each protects soil or reduces inputs.",
      "Contrast sustainable with industrial agriculture.",
    ],
    sections: [
      {
        title: "Conservation practices",
        body:
          "Sustainable agriculture combines several techniques, most aimed at keeping soil in place and reducing chemical dependence.",
        table: {
          headers: ["Practice", "Benefit"],
          rows: [
            ["Contour plowing / terracing", "Slows water runoff, reduces erosion on slopes"],
            ["Cover crops & no-till", "Keep soil covered, add nutrients, prevent erosion"],
            ["Crop rotation", "Restores nutrients, breaks pest cycles"],
            ["Integrated pest management (IPM)", "Minimizes pesticide use via mixed methods"],
          ],
        },
        keyIdea: "The common thread: keep soil COVERED and DIVERSE — bare, single-crop soil is what erodes and breeds pests.",
      },
      {
        title: "Reducing inputs",
        body:
          "Beyond soil care, sustainable farming reduces synthetic inputs: IPM uses natural predators and monitoring before pesticides; crop rotation and cover crops cut fertilizer needs by fixing nitrogen naturally. The goal is long-term productivity, not just maximum short-term yield.",
        terms: [
          { term: "Crop rotation", def: "Alternating crops to restore nutrients and disrupt pests." },
          { term: "No-till farming", def: "Planting without plowing, leaving residue to protect soil from erosion." },
          { term: "Integrated pest management", def: "Combining biological, mechanical, and minimal chemical controls for pests." },
        ],
        traps: ["IPM doesn't ban pesticides — it uses them as a LAST resort after biological/mechanical controls."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 4,
    unitName: "Land and Water Use",
    title: "Forestry — Logging Methods and Their Impacts",
    subtitle: "How we cut forests determines whether they recover — or wash away.",
    overview:
      "Forests provide timber, habitat, and ecosystem services, so how we harvest them matters. Logging methods range from total clear-cutting to selective cutting, with very different environmental impacts.",
    objectives: [
      "Compare clear-cutting and selective cutting.",
      "Explain the impacts of deforestation.",
      "Describe sustainable forestry practices.",
    ],
    sections: [
      {
        title: "Logging methods",
        body:
          "The two main approaches sit at opposite extremes. Clear-cutting removes all trees in an area — cheap and efficient but devastating to soil and habitat. Selective cutting removes only some trees, preserving forest structure at higher cost.",
        table: {
          headers: ["Method", "Trade-off"],
          rows: [
            ["Clear-cutting", "Cheap/efficient BUT erosion, habitat loss, runoff"],
            ["Selective cutting", "Less damage BUT costlier, less timber per area"],
          ],
        },
        keyIdea: "Clear-cutting maximizes short-term timber but causes erosion, habitat loss, and lost ecosystem services.",
      },
      {
        title: "Impacts and sustainability",
        body:
          "Deforestation reduces biodiversity, releases stored carbon (worsening climate change), increases erosion and flooding, and disrupts the water cycle. Sustainable forestry uses selective cutting, replanting, and harvesting at or below the regrowth rate to keep forests as a renewable resource.",
        terms: [
          { term: "Clear-cutting", def: "Removing all trees in an area; high impact (erosion, habitat loss)." },
          { term: "Selective cutting", def: "Harvesting only some trees to preserve forest structure." },
          { term: "Deforestation", def: "Permanent removal of forest, releasing carbon and reducing biodiversity." },
        ],
        traps: ["Deforestation worsens CLIMATE CHANGE — cutting/burning forests releases stored carbon AND removes a carbon sink."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 5,
    unitName: "Land and Water Use",
    title: "Mining — Extraction Methods and Remediation",
    subtitle: "Getting minerals out of the ground is destructive — the question is how much, and whether we clean up after.",
    overview:
      "Mining extracts the minerals and fuels modern life depends on, but it disturbs land, water, and air. Methods range from surface mining (cheap, hugely destructive) to subsurface mining (costlier, more dangerous to workers), and laws increasingly require reclamation afterward.",
    objectives: [
      "Compare surface and subsurface mining.",
      "Explain the environmental impacts of mining.",
      "Describe reclamation and acid mine drainage.",
    ],
    sections: [
      {
        title: "Surface vs. subsurface mining",
        body:
          "When ore is near the surface, companies use surface mining (strip mining, open-pit, mountaintop removal) — efficient but it scrapes away whole landscapes. When ore is deep, subsurface (underground) mining is used: less surface damage but expensive and dangerous (collapse, toxic gas) for miners.",
        table: {
          headers: ["Method", "Trade-off"],
          rows: [
            ["Surface (strip, open-pit)", "Cheap, high yield BUT massive habitat/land destruction"],
            ["Subsurface (underground)", "Less surface damage BUT costly and dangerous to workers"],
          ],
        },
        keyIdea: "Surface mining is cheaper and gets more ore, but it's far more destructive to the land than underground mining.",
      },
      {
        title: "Impacts and cleanup",
        body:
          "Mining causes erosion, habitat loss, and a notorious water problem: acid mine drainage, where exposed sulfide minerals react with water and air to form sulfuric acid that poisons streams. Tailings (waste rock) can leach toxic metals. Many laws now require reclamation — restoring mined land — though it rarely fully recovers.",
        terms: [
          { term: "Reclamation", def: "Restoring mined land toward a natural or usable state after extraction." },
          { term: "Acid mine drainage", def: "Sulfuric acid runoff from exposed mine minerals that contaminates water." },
          { term: "Tailings", def: "Leftover waste rock from mining that can leach toxins." },
        ],
        traps: ["Acid mine drainage is a major LONG-TERM water pollution problem — it continues long after a mine closes."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 6,
    unitName: "Land and Water Use",
    title: "Fisheries and Aquaculture",
    subtitle: "We're catching wild fish faster than they reproduce — and fish farming brings its own trade-offs.",
    overview:
      "Fish are a vital protein source, but wild fisheries are overexploited and many have collapsed. Aquaculture (fish farming) helps meet demand but creates pollution and disease problems of its own. Sustainable management is the goal.",
    objectives: [
      "Explain overfishing and its causes (bycatch, destructive gear).",
      "Describe aquaculture and its trade-offs.",
      "Identify sustainable fisheries practices.",
    ],
    sections: [
      {
        title: "Overfishing wild stocks",
        body:
          "Demand and efficient technology have pushed catches beyond the sustainable yield, collapsing fisheries like Atlantic cod. Destructive methods make it worse: bottom trawling scrapes the seafloor, and bycatch (unwanted species caught and discarded) kills turtles, dolphins, and juveniles.",
        keyIdea: "Catching fish faster than they reproduce collapses the stock — overfishing is exceeding the sustainable yield.",
        terms: [
          { term: "Bycatch", def: "Non-target species caught and usually discarded during fishing." },
          { term: "Bottom trawling", def: "Dragging nets across the seafloor; destroys habitat and causes bycatch." },
        ],
      },
      {
        title: "Aquaculture: solution and problem",
        body:
          "Aquaculture is the fastest-growing food sector and eases pressure on wild stocks. But dense fish pens concentrate waste and disease, require wild-caught fish as feed, and can let farmed fish or parasites escape into wild populations. Sustainable approaches include catch limits, no-take marine protected areas, and responsible farming.",
        terms: [
          { term: "Aquaculture", def: "Farming aquatic organisms; supplements wild catch but causes waste/disease issues." },
          { term: "Marine protected area", def: "A no-take ocean zone where stocks can recover." },
        ],
        traps: ["Aquaculture relieves wild-stock pressure BUT adds pollution, disease, and (often) demand for wild fish as feed."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 7,
    unitName: "Land and Water Use",
    title: "Urban Land Use and Sprawl",
    subtitle: "How cities grow — sprawling outward or building up — shapes their environmental footprint.",
    overview:
      "As populations urbanize, how cities expand matters. Urban sprawl — low-density spread into surrounding land — drives car dependence, habitat loss, and impervious surfaces, while smart growth and dense development reduce those impacts.",
    objectives: [
      "Define urban sprawl and its environmental effects.",
      "Explain impervious surfaces and runoff.",
      "Describe smart-growth alternatives.",
    ],
    sections: [
      {
        title: "Sprawl and its impacts",
        body:
          "Urban sprawl spreads low-density development outward, consuming farmland and habitat and forcing reliance on cars (more emissions). It also creates impervious surfaces (roads, parking lots) that prevent water from soaking in, increasing runoff, flooding, and water pollution while reducing groundwater recharge.",
        keyIdea: "Sprawl's hidden cost is impervious surfaces — pavement that turns rainfall into polluted runoff instead of recharge.",
        terms: [
          { term: "Urban sprawl", def: "Low-density outward spread of cities into surrounding land." },
          { term: "Impervious surface", def: "Pavement/roofing that blocks infiltration, increasing runoff." },
        ],
      },
      {
        title: "Smart growth",
        body:
          "Smart growth counters sprawl with higher-density, mixed-use development, public transit, and preserved green space. The urban heat island effect — cities being hotter than surroundings due to pavement and lost vegetation — is eased by green roofs, trees, and parks.",
        terms: [
          { term: "Smart growth", def: "Compact, transit-oriented, mixed-use planning that limits sprawl." },
          { term: "Urban heat island", def: "Cities running hotter than rural areas due to pavement and lack of vegetation." },
        ],
        traps: ["Impervious surfaces cause BOTH more runoff/flooding AND less groundwater recharge — a double water problem."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 5, lessonNum: 8,
    unitName: "Land and Water Use",
    title: "Water Use, Diversion, and Irrigation Issues",
    subtitle: "Humans move and consume staggering amounts of freshwater — mostly for farming — with big environmental costs.",
    overview:
      "Agriculture uses the lion's share of human freshwater, and we reshape rivers with dams and diversions to deliver it. These engineering feats provide water and power but disrupt ecosystems, and inefficient irrigation wastes water and damages soil.",
    objectives: [
      "Identify the largest uses of freshwater.",
      "Explain the trade-offs of dams and diversions.",
      "Compare irrigation methods and their problems.",
    ],
    sections: [
      {
        title: "Where the water goes — and how we move it",
        body:
          "Agriculture is by far the biggest water user (~70% globally). To supply it (and cities and power), we build dams and divert rivers. Dams provide water storage, flood control, and hydroelectric power — but they flood habitats, block fish migration, trap sediment, and can dry up rivers downstream (the Colorado River barely reaches the sea).",
        keyIdea: "Agriculture is the #1 water user. Dams give water + power BUT block fish, trap sediment, and starve downstream ecosystems.",
        terms: [
          { term: "Dam / reservoir", def: "Structure storing water for supply, flood control, and hydropower — with major ecological costs." },
          { term: "Water diversion", def: "Redirecting rivers/canals to supply farms and cities; can deplete the source." },
        ],
      },
      {
        title: "Irrigation methods and problems",
        body:
          "How you irrigate matters. Flood/furrow irrigation is cheap but wastes huge amounts to evaporation and runoff and worsens salinization; spray is better; drip irrigation delivers water right to roots and is the most efficient. Over-irrigation also causes waterlogging and salt buildup, and aquifer depletion when groundwater is over-pumped.",
        table: {
          headers: ["Method", "Efficiency"],
          rows: [
            ["Flood / furrow", "Low — much lost to evaporation/runoff; salinization risk"],
            ["Spray (sprinkler)", "Moderate"],
            ["Drip", "High — water delivered straight to roots"],
          ],
        },
        keyIdea: "Drip irrigation is the most water-efficient method and minimizes salinization — the 'best practice' answer.",
        traps: ["Inefficient (flood) irrigation drives SALINIZATION — evaporating water leaves salt that ruins soil over time."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 1,
    unitName: "Energy Resources and Consumption",
    title: "Fossil Fuels — Formation, Extraction, Environmental Costs",
    subtitle: "Ancient sunlight stored in coal, oil, and gas powers the modern world — and drives climate change.",
    overview:
      "Fossil fuels (coal, oil, natural gas) formed over millions of years from buried organic matter. They're energy-dense and convenient but nonrenewable, and burning them releases the CO₂ and pollutants at the heart of modern environmental problems.",
    objectives: [
      "Explain how fossil fuels form and why they're nonrenewable.",
      "Compare coal, oil, and natural gas.",
      "Describe the environmental costs of extraction and combustion.",
    ],
    sections: [
      {
        title: "The three fossil fuels",
        body:
          "All formed from organic matter buried under heat and pressure over millions of years — which is why they're nonrenewable on human timescales. They differ in form and 'cleanliness' when burned.",
        table: {
          headers: ["Fuel", "Note"],
          rows: [
            ["Coal", "Most abundant, but dirtiest (most CO₂ & pollutants per unit energy)"],
            ["Oil (petroleum)", "Powers transport; spills and refining pollution"],
            ["Natural gas", "Cleanest-burning fossil fuel, but extraction leaks methane"],
          ],
        },
        keyIdea: "Coal is the dirtiest, natural gas the cleanest-burning — but ALL release CO₂ and are nonrenewable.",
      },
      {
        title: "Extraction and combustion costs",
        body:
          "Extraction harms the environment: coal mining (including mountaintop removal), oil spills, and fracking (hydraulic fracturing) for gas, which can contaminate groundwater and release methane (a potent greenhouse gas). Burning fossil fuels emits CO₂ (driving climate change) plus pollutants causing smog and acid rain.",
        terms: [
          { term: "Fossil fuels", def: "Nonrenewable energy from ancient organic matter: coal, oil, natural gas." },
          { term: "Fracking", def: "Hydraulic fracturing to extract gas/oil; risks groundwater contamination and methane leaks." },
          { term: "Nonrenewable", def: "A resource used far faster than it forms (millions of years)." },
        ],
        traps: ["Natural gas burns 'cleaner' (less CO₂) but its extraction LEAKS methane — a far more potent greenhouse gas short-term."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 2,
    unitName: "Energy Resources and Consumption",
    title: "Nuclear Energy — Fission, Waste, and Risk",
    subtitle: "Splitting atoms makes huge, carbon-free energy — shadowed by radioactive waste and rare but severe accidents.",
    overview:
      "Nuclear power generates electricity by splitting uranium atoms (fission), releasing enormous heat with no CO₂ emissions. Its big drawbacks are long-lived radioactive waste, the risk of catastrophic accidents, and high cost.",
    objectives: [
      "Explain how nuclear fission generates power.",
      "Weigh nuclear energy's benefits against its risks.",
      "Identify the waste-disposal challenge and major accidents.",
    ],
    sections: [
      {
        title: "How it works and why it's appealing",
        body:
          "In fission, a neutron splits a uranium-235 nucleus, releasing heat (and more neutrons, sustaining a chain reaction). The heat boils water to spin a turbine. The huge advantage: it produces large, reliable, carbon-free electricity — no CO₂ — so it's attractive for fighting climate change.",
        keyIdea: "Nuclear's headline benefit: massive electricity with ZERO CO₂ emissions — a low-carbon power source.",
        terms: [
          { term: "Nuclear fission", def: "Splitting a heavy nucleus (uranium-235) to release energy." },
          { term: "Chain reaction", def: "Self-sustaining fission as released neutrons split more nuclei." },
        ],
      },
      {
        title: "Waste, risk, and cost",
        body:
          "The downsides are serious. Spent fuel is radioactive waste that stays dangerous for thousands of years, with no permanent disposal site in wide use. Accidents, though rare, can be catastrophic — Chernobyl and Fukushima released radiation over wide areas. Plants are also very expensive and slow to build.",
        terms: [
          { term: "Radioactive waste", def: "Spent nuclear fuel that remains hazardous for thousands of years." },
          { term: "Meltdown", def: "Overheating of a reactor core that can release radiation (Chernobyl, Fukushima)." },
        ],
        traps: ["Nuclear emits NO CO₂, but its problems are different: long-lived radioactive WASTE and rare-but-severe accidents — not air pollution."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 3,
    unitName: "Energy Resources and Consumption",
    title: "Solar Energy — Photovoltaic and Passive Systems",
    subtitle: "The sun delivers more energy in an hour than humanity uses in a year — the trick is capturing it.",
    overview:
      "Solar energy is renewable, clean, and abundant. We harness it two main ways: photovoltaic (PV) cells that convert sunlight directly to electricity, and passive solar design that captures heat through building orientation. Its main limit is intermittency — no sun, no power.",
    objectives: [
      "Distinguish photovoltaic, active, and passive solar.",
      "Explain solar's benefits and limitations.",
      "Connect intermittency to the need for storage.",
    ],
    sections: [
      {
        title: "Ways to capture the sun",
        body:
          "Photovoltaic (PV) cells turn sunlight directly into electricity. Active solar uses pumps/fans to move solar-heated water or air. Passive solar needs no machinery — it's smart building design (south-facing windows, thermal mass) that captures and stores heat naturally.",
        table: {
          headers: ["Type", "How it works"],
          rows: [
            ["Photovoltaic (PV)", "Cells convert sunlight directly to electricity"],
            ["Active solar", "Pumps/fans circulate solar-heated water or air"],
            ["Passive solar", "Building design captures heat — no machinery"],
          ],
        },
        keyIdea: "Passive solar uses NO mechanical equipment — just orientation and materials. PV makes electricity; passive makes heat.",
      },
      {
        title: "Benefits and the intermittency problem",
        body:
          "Solar is renewable, emits no pollution while operating, and works off-grid. Its drawbacks: it's intermittent (only generates when the sun shines), needs lots of space, and manufacturing PV panels has its own footprint. Intermittency is why solar pairs with battery storage or a backup grid.",
        terms: [
          { term: "Photovoltaic cell", def: "A device that converts sunlight directly into electricity." },
          { term: "Passive solar", def: "Building design that captures/stores solar heat without machinery." },
          { term: "Intermittent", def: "Energy available only at times (sun/wind) — requires storage or backup." },
        ],
        traps: ["Solar's main weakness is INTERMITTENCY (no sun = no power), which is why energy STORAGE matters — not that it pollutes while running."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 4,
    unitName: "Energy Resources and Consumption",
    title: "Wind, Hydro, and Geothermal Energy",
    subtitle: "Three more renewables — each clean and powerful, each tied to the right geography.",
    overview:
      "Beyond solar, three major renewables generate electricity cleanly: wind (turbines), hydroelectric (flowing water), and geothermal (Earth's heat). All avoid combustion emissions but depend on location and carry their own ecological trade-offs.",
    objectives: [
      "Explain how wind, hydro, and geothermal generate power.",
      "Identify each one's benefits and drawbacks.",
      "Connect each to suitable geography.",
    ],
    sections: [
      {
        title: "Three renewables compared",
        body:
          "Each converts a natural energy flow into electricity, and each is location-dependent.",
        table: {
          headers: ["Source", "Power from", "Drawback"],
          rows: [
            ["Wind", "Turbines spun by wind", "Intermittent; bird/bat kills; needs windy sites"],
            ["Hydroelectric", "Falling/flowing water (dams)", "Dams harm rivers, fish, sediment flow"],
            ["Geothermal", "Earth's internal heat", "Limited to geologically active areas"],
          ],
        },
        keyIdea: "All three are clean but GEOGRAPHY-bound — wind needs wind, hydro needs rivers, geothermal needs hot crust.",
      },
      {
        title: "Trade-offs",
        body:
          "Wind is one of the fastest-growing, cheapest renewables but is intermittent and can harm birds/bats. Hydroelectric is reliable and large-scale but its dams carry the ecological costs you saw earlier (blocked fish, trapped sediment). Geothermal is steady and low-emission but practical only where Earth's heat is near the surface (e.g., Iceland).",
        terms: [
          { term: "Hydroelectric power", def: "Electricity from flowing/falling water, usually via dams." },
          { term: "Geothermal energy", def: "Energy from Earth's internal heat; location-limited but steady." },
        ],
        traps: ["Unlike solar/wind, hydro and geothermal are NOT intermittent — they provide steady 'baseload' power."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 5,
    unitName: "Energy Resources and Consumption",
    title: "Biofuels and Biomass Energy",
    subtitle: "Energy from living matter — renewable in principle, but with a complicated carbon and food story.",
    overview:
      "Biomass (wood, crops, waste) and biofuels (like ethanol and biodiesel) are energy from recently living material. They're renewable and can be carbon-neutral in theory, but burning them pollutes, and fuel crops compete with food and land.",
    objectives: [
      "Define biomass and biofuels.",
      "Explain the 'carbon-neutral' claim and its limits.",
      "Identify the food-vs-fuel and pollution issues.",
    ],
    sections: [
      {
        title: "Energy from living matter",
        body:
          "Biomass is organic material burned for energy — firewood, crop residue, animal waste — still the main fuel for cooking/heating for billions. Biofuels are liquid fuels refined from crops: ethanol (from corn/sugarcane) and biodiesel. They're renewable because crops regrow.",
        keyIdea: "Biofuels/biomass are RENEWABLE (crops regrow) — but burning them still releases CO₂ and air pollutants.",
        terms: [
          { term: "Biomass", def: "Organic matter (wood, crops, waste) burned for energy." },
          { term: "Ethanol", def: "A biofuel made from crops like corn or sugarcane, blended into gasoline." },
        ],
      },
      {
        title: "Carbon neutrality and the catches",
        body:
          "Biofuels are called carbon-neutral because the CO₂ released when burned roughly equals what the plants absorbed while growing — but this ignores fossil fuels used to grow, harvest, and refine them. Bigger problems: the food-vs-fuel debate (cropland and corn diverted from food to fuel raise food prices), plus deforestation to plant fuel crops, and indoor air pollution from burning biomass.",
        terms: [
          { term: "Carbon-neutral", def: "Releasing only as much CO₂ as was absorbed during growth (an idealized claim)." },
          { term: "Food vs. fuel", def: "The conflict between using crops/land for food or for biofuel." },
        ],
        traps: ["'Carbon-neutral' is only approximate — growing and processing biofuels still burns fossil fuels, and fuel crops compete with FOOD."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 6,
    unitName: "Energy Resources and Consumption",
    title: "Energy Conservation and Efficiency",
    subtitle: "The cheapest, cleanest energy is the energy you never use.",
    overview:
      "Before generating more power, we can use less of it. Energy conservation (using less) and efficiency (getting more work per unit of energy) cut costs and pollution with no new power plants — often the smartest first step in energy policy.",
    objectives: [
      "Distinguish conservation from efficiency.",
      "Give examples of efficiency improvements.",
      "Explain why efficiency is cost-effective.",
    ],
    sections: [
      {
        title: "Conservation vs. efficiency",
        body:
          "Conservation means using less energy by changing behavior (turning off lights, driving less). Efficiency means doing the same task with less energy through better technology (LED bulbs, hybrid cars, insulation). Both reduce demand — and reduced demand means less fuel burned and less pollution.",
        table: {
          headers: ["Approach", "Example"],
          rows: [
            ["Conservation (behavior)", "Turning off lights, lowering the thermostat"],
            ["Efficiency (technology)", "LED bulbs, hybrid cars, better insulation"],
            ["Cogeneration", "Capturing waste heat from power plants for use"],
          ],
        },
        keyIdea: "Efficiency = same result, less energy (LEDs). Conservation = simply using less. Both are 'negawatts' — power you don't have to make.",
      },
      {
        title: "Why it's the smart first move",
        body:
          "Saving energy is usually cheaper than producing it and has no emissions. Cogeneration (combined heat and power) reuses waste heat that would otherwise be lost. Higher fuel-economy standards (CAFE) and efficient appliances (Energy Star) deliver big, cheap reductions in energy use and pollution.",
        terms: [
          { term: "Energy efficiency", def: "Getting more useful output per unit of energy input." },
          { term: "Cogeneration", def: "Capturing and using waste heat from electricity generation (combined heat and power)." },
        ],
        traps: ["Conservation (use less) ≠ efficiency (use it better). LED bulbs are EFFICIENCY; turning the light off is CONSERVATION."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 7,
    unitName: "Energy Resources and Consumption",
    title: "The Energy Mix — Global and US Patterns",
    subtitle: "What actually powers the world today is still mostly fossil fuels — and that's the crux of the climate problem.",
    overview:
      "The 'energy mix' is the combination of sources a country uses. Despite renewables' growth, fossil fuels still dominate globally and in the US. Understanding the mix — and how it's slowly shifting — frames every energy and climate debate.",
    objectives: [
      "Describe the current global and US energy mix.",
      "Explain why fossil fuels still dominate.",
      "Identify trends toward renewables.",
    ],
    sections: [
      {
        title: "What powers us now",
        body:
          "Worldwide and in the US, fossil fuels (oil, coal, natural gas) still supply the large majority of energy. Oil dominates transportation; coal and natural gas dominate electricity (though gas is overtaking coal). Nuclear and renewables (hydro, wind, solar) are growing but still a minority share.",
        keyIdea: "Fossil fuels STILL dominate the energy mix — that's exactly why cutting carbon emissions is so hard.",
        terms: [
          { term: "Energy mix", def: "The combination of energy sources a country or world uses." },
          { term: "Nonrenewable share", def: "The dominant fossil-fuel portion of today's energy mix." },
        ],
      },
      {
        title: "Why fossil fuels persist — and the shift",
        body:
          "Fossil fuels stay dominant because of existing infrastructure, energy density, low (unpriced) cost, and reliability versus intermittent renewables. But the mix is shifting: natural gas is replacing coal, and wind and solar are the fastest-growing sources as costs fall. Developing nations' rising demand shapes the global picture.",
        terms: [
          { term: "Energy density", def: "Energy stored per unit mass/volume — high for fossil fuels, aiding their dominance." },
        ],
        traps: ["Renewables are growing FAST but are still a SMALL share — don't overstate how much of today's mix they supply."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 6, lessonNum: 8,
    unitName: "Energy Resources and Consumption",
    title: "Energy Policy — Economics, Subsidies, and Incentives",
    subtitle: "Markets don't price pollution on their own — so policy is the tool that steers the energy transition.",
    overview:
      "Which energy sources we use depends heavily on policy: subsidies, taxes, and regulations that change their relative cost. Because burning fossil fuels creates pollution costs not paid by the buyer (an externality), economists argue policy must correct the market.",
    objectives: [
      "Explain externalities and why they justify energy policy.",
      "Compare subsidies, carbon taxes, and cap-and-trade.",
      "Connect policy to shifting the energy mix.",
    ],
    sections: [
      {
        title: "The externality problem",
        body:
          "When you burn gasoline, the health and climate damage from the pollution is paid by society, not the buyer — a negative externality. Because that cost is 'external' to the price, the market overuses fossil fuels. Policy exists to internalize that cost and level the field for cleaner energy.",
        keyIdea: "Pollution is a NEGATIVE EXTERNALITY — its cost isn't in the price, so the market burns too much fossil fuel without policy.",
        terms: [
          { term: "Externality", def: "A cost (or benefit) of an activity borne by people not involved in it — e.g., pollution." },
          { term: "Subsidy", def: "Government financial support that lowers a source's cost (given to both fossil fuels and renewables)." },
        ],
      },
      {
        title: "Policy tools",
        body:
          "Governments use several levers. Subsidies lower a source's cost (historically favoring fossil fuels, increasingly clean energy). A carbon tax charges per ton of CO₂ emitted. Cap-and-trade sets an emissions ceiling and lets firms trade allowances. Regulations (efficiency standards, emissions limits) mandate cleaner technology directly.",
        table: {
          headers: ["Tool", "How it works"],
          rows: [
            ["Carbon tax", "Charge per ton of CO₂ → makes polluting cost more"],
            ["Cap-and-trade", "Set a total emissions cap; firms buy/sell allowances"],
            ["Subsidies", "Lower the cost of favored energy sources"],
            ["Regulations/standards", "Mandate efficiency or emission limits"],
          ],
        },
        keyIdea: "Carbon taxes and cap-and-trade both put a PRICE on carbon — the core market fix for the pollution externality.",
        traps: ["Subsidies flow to BOTH fossil fuels and renewables — whichever a government subsidizes gets a market advantage."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 7, lessonNum: 1,
    unitName: "Atmospheric Pollution",
    title: "Air Pollutants — Primary and Secondary",
    subtitle: "Some pollutants are emitted directly; others form in the air afterward — and the difference is the key exam distinction.",
    overview:
      "Air pollution comes from primary pollutants emitted straight from a source and secondary pollutants that form when primaries react in the atmosphere. The Clean Air Act targets the major 'criteria' pollutants. Knowing the primary/secondary split unlocks the whole unit.",
    objectives: [
      "Distinguish primary from secondary pollutants.",
      "Identify the major air pollutants and their sources.",
      "Explain the role of the Clean Air Act.",
    ],
    sections: [
      {
        title: "Primary vs. secondary",
        body:
          "A primary pollutant is emitted directly (CO from cars, SO₂ from coal, NOx from combustion, particulates). A secondary pollutant forms later from chemical reactions in the air — ground-level ozone and smog are the classic examples, made when NOx and VOCs react in sunlight.",
        table: {
          headers: ["Type", "Examples", "Origin"],
          rows: [
            ["Primary", "CO, SO₂, NOx, particulates, VOCs", "Emitted directly from a source"],
            ["Secondary", "Ground-level ozone (O₃), smog", "Form via reactions in the atmosphere"],
          ],
        },
        keyIdea: "Primary = emitted directly; secondary = formed in the air afterward. Ground-level OZONE is the headline SECONDARY pollutant.",
      },
      {
        title: "The major pollutants and the law",
        body:
          "Key pollutants and sources: carbon monoxide (incomplete combustion, cars), sulfur dioxide (burning coal → acid rain), nitrogen oxides (high-temp combustion → smog/acid rain), particulate matter (soot, dust → lung damage), and lead (historically gasoline). The Clean Air Act regulates these criteria pollutants and has dramatically cut US air pollution.",
        terms: [
          { term: "Primary pollutant", def: "A harmful substance emitted directly into the air (e.g., CO, SO₂)." },
          { term: "Secondary pollutant", def: "A pollutant formed by reactions in the atmosphere (e.g., ground-level ozone)." },
          { term: "Clean Air Act", def: "US law regulating major air pollutants; greatly reduced emissions." },
        ],
        traps: ["Ground-level ozone is a SECONDARY pollutant (and a lung irritant) — don't confuse it with the protective stratospheric ozone layer."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 7, lessonNum: 2,
    unitName: "Atmospheric Pollution",
    title: "Photochemical Smog Formation",
    subtitle: "The brown haze over sunny cities is cooked up by car exhaust plus sunlight.",
    overview:
      "Photochemical smog is the brownish haze in cities like Los Angeles. It forms when pollutants from cars (NOx and VOCs) react in sunlight to produce ground-level ozone. It peaks on hot, sunny, calm afternoons and is worsened by temperature inversions.",
    objectives: [
      "Explain how photochemical smog forms.",
      "Identify the conditions that worsen it.",
      "Explain temperature inversions.",
    ],
    sections: [
      {
        title: "The recipe for smog",
        body:
          "Photochemical smog needs three ingredients: NOx and VOCs (mostly from vehicle exhaust) plus sunlight. The sunlight drives reactions that produce ground-level ozone, the main harmful component. That's why smog peaks on hot, sunny afternoons and in car-dependent cities.",
        keyIdea: "Smog recipe = car exhaust (NOx + VOCs) + SUNLIGHT → ground-level ozone. Hot sunny cities with lots of traffic are worst.",
        terms: [
          { term: "Photochemical smog", def: "Haze formed when sunlight drives reactions among NOx and VOCs, producing ozone." },
          { term: "VOCs", def: "Volatile organic compounds (from fuels, solvents) that help form smog." },
        ],
      },
      {
        title: "Temperature inversions trap it",
        body:
          "Normally warm air near the ground rises and disperses pollution. In a temperature inversion, a layer of warm air sits ABOVE cooler air, trapping pollutants near the ground like a lid — causing dangerous smog buildup in valleys and basins.",
        terms: [
          { term: "Temperature inversion", def: "Warm air over cool air that traps pollutants near the ground, worsening smog." },
          { term: "Ground-level ozone", def: "The main harmful component of photochemical smog; a respiratory irritant." },
        ],
        traps: ["A temperature inversion TRAPS pollution (warm air lid over cool air) — it doesn't create the pollution, it concentrates it."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 7, lessonNum: 3,
    unitName: "Atmospheric Pollution",
    title: "Acid Deposition — Chemistry and Ecological Damage",
    subtitle: "Sulfur and nitrogen pollution fall back to earth as acid — often hundreds of miles downwind.",
    overview:
      "Acid deposition ('acid rain') forms when SO₂ and NOx react with water in the atmosphere to make sulfuric and nitric acids. These fall as acidic rain, snow, or particles, damaging lakes, forests, and buildings — frequently far from the polluting source.",
    objectives: [
      "Explain the chemistry of acid deposition.",
      "Describe its effects on ecosystems and structures.",
      "Explain why it's a cross-boundary problem.",
    ],
    sections: [
      {
        title: "How acid deposition forms",
        body:
          "Burning coal releases sulfur dioxide (SO₂); high-temperature combustion releases nitrogen oxides (NOx). In the atmosphere these react with water to form sulfuric and nitric acid, which return to earth as acid rain, snow, fog, or dry particles — lowering the pH of whatever they land on.",
        keyIdea: "SO₂ (from coal) + NOx (from combustion) + water → sulfuric & nitric ACID. Coal-burning is the main culprit.",
        terms: [
          { term: "Acid deposition", def: "Acidic rain/snow/particles formed from SO₂ and NOx reacting with water in the air." },
          { term: "Sulfur dioxide (SO₂)", def: "Coal-burning pollutant that forms sulfuric acid — a key acid-rain cause." },
        ],
      },
      {
        title: "Damage — and where it lands",
        body:
          "Acid deposition acidifies lakes and streams (killing fish), leaches nutrients from soil, damages forests (especially at high elevations), and corrodes buildings and statues. Because winds carry the pollutants, the damage often hits regions far downwind of the source — making it an interstate and international issue.",
        terms: [
          { term: "Acidification", def: "Lowering of pH in water/soil from acid deposition, harming organisms." },
          { term: "Buffering capacity", def: "A water body's ability to neutralize acid; low-buffer lakes are most vulnerable." },
        ],
        traps: ["Acid rain often damages areas FAR DOWNWIND of the source — a coal plant's pollution can acidify lakes in another state/country."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 7, lessonNum: 4,
    unitName: "Atmospheric Pollution",
    title: "Stratospheric Ozone Depletion",
    subtitle: "Human-made chemicals tore a hole in Earth's UV shield — and a global treaty is healing it.",
    overview:
      "The stratospheric ozone layer absorbs harmful UV radiation. CFCs and related chemicals released by humans destroy ozone, thinning the layer (the Antarctic 'ozone hole'). The Montreal Protocol phased out these chemicals — the great success story of international environmental action.",
    objectives: [
      "Explain how CFCs deplete stratospheric ozone.",
      "Describe the consequences of ozone depletion.",
      "Explain the Montreal Protocol's success.",
    ],
    sections: [
      {
        title: "How the ozone layer is destroyed",
        body:
          "Chlorofluorocarbons (CFCs), once used in refrigerants, aerosols, and foams, drift up to the stratosphere. There, UV light frees chlorine atoms, and each chlorine atom catalytically destroys thousands of ozone molecules. This thins the protective layer — most dramatically over Antarctica each spring.",
        keyIdea: "One chlorine atom from a CFC destroys THOUSANDS of ozone molecules — that catalytic effect is why CFCs were so damaging.",
        terms: [
          { term: "CFCs", def: "Chlorofluorocarbons — chemicals that release ozone-destroying chlorine in the stratosphere." },
          { term: "Ozone hole", def: "Severe seasonal thinning of stratospheric ozone, especially over Antarctica." },
        ],
      },
      {
        title: "Consequences and the fix",
        body:
          "A thinner ozone layer lets more UV reach the surface, increasing skin cancer, cataracts, and harm to crops and plankton. The Montreal Protocol (1987) phased out CFCs worldwide, and the ozone layer is slowly recovering — proof that global cooperation can solve an environmental crisis.",
        terms: [
          { term: "Montreal Protocol", def: "1987 treaty that phased out CFCs; the ozone layer is now recovering." },
          { term: "UV radiation", def: "Ultraviolet light blocked by ozone; more reaches us when ozone thins, raising cancer risk." },
        ],
        traps: ["Don't confuse the two ozone problems: STRATOSPHERIC depletion (CFCs, less UV protection) vs. GROUND-LEVEL ozone (smog pollutant)."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 7, lessonNum: 5,
    unitName: "Atmospheric Pollution",
    title: "Indoor Air Pollution",
    subtitle: "The air inside can be more dangerous than outside — and it kills millions, mostly the poor.",
    overview:
      "Indoor air pollution is a major, often overlooked health threat. In developing nations it's mainly smoke from burning biomass for cooking; in developed nations it's chemicals from building materials and products like radon, asbestos, VOCs, and CO.",
    objectives: [
      "Identify major indoor air pollutants.",
      "Contrast indoor pollution in developing vs. developed nations.",
      "Explain why indoor pollution is so harmful.",
    ],
    sections: [
      {
        title: "Two different indoor problems",
        body:
          "In developing countries, the biggest indoor pollutant is smoke from burning wood, dung, or charcoal indoors for cooking and heat — causing massive respiratory illness, especially in women and children. In developed countries, the culprits are built-environment chemicals.",
        table: {
          headers: ["Pollutant", "Source / risk"],
          rows: [
            ["Radon", "Radioactive gas from soil/rock → lung cancer"],
            ["Asbestos", "Old insulation → lung disease when fibers inhaled"],
            ["VOCs / formaldehyde", "Paints, furniture, carpets"],
            ["Carbon monoxide", "Faulty heaters/stoves → silent killer"],
            ["Biomass smoke", "Cooking fires (developing nations)"],
          ],
        },
        keyIdea: "Developing nations: biomass cooking SMOKE is the #1 indoor pollutant. Developed nations: radon, asbestos, VOCs, CO.",
      },
      {
        title: "Why indoor air is dangerous",
        body:
          "People spend most of their time indoors, and enclosed spaces concentrate pollutants. Radon is the second-leading cause of lung cancer (after smoking); CO is deadly and odorless. Better ventilation, radon testing, and cleaner cookstoves are the main solutions.",
        terms: [
          { term: "Radon", def: "A radioactive gas seeping from the ground; a leading cause of lung cancer indoors." },
          { term: "Sick building syndrome", def: "Illness from poor indoor air quality in a building." },
        ],
        traps: ["Radon is the SECOND-leading cause of lung cancer overall — a top indoor-air danger that's invisible and odorless."],
      },
    ],
  },
  {
    courseId: "ap-environmental-science", unit: 7, lessonNum: 6,
    unitName: "Atmospheric Pollution",
    title: "The Clean Air Act and Pollution Reduction",
    subtitle: "Regulation works: US air got dramatically cleaner even as the economy grew.",
    overview:
      "The Clean Air Act is the cornerstone US law for air quality. It sets standards for major pollutants, drives control technologies, and is a proven success — pollution fell sharply while GDP rose, disproving the idea that clean air must cost growth.",
    objectives: [
      "Describe what the Clean Air Act regulates.",
      "Identify key pollution-control technologies.",
      "Explain the act's measurable success.",
    ],
    sections: [
      {
        title: "What the law does",
        body:
          "The Clean Air Act sets National Ambient Air Quality Standards for criteria pollutants (like ozone, particulates, SO₂, NOx, CO, lead) and requires sources to control emissions. It also addressed acid rain with a cap-and-trade program for SO₂ — a famous, effective market-based success.",
        keyIdea: "The Clean Air Act's SO₂ cap-and-trade slashed acid rain cheaply — a model market-based environmental policy.",
        terms: [
          { term: "Clean Air Act", def: "US law setting and enforcing air-quality standards for major pollutants." },
          { term: "Criteria pollutants", def: "The major air pollutants the EPA sets health-based standards for." },
        ],
      },
      {
        title: "Control technologies and results",
        body:
          "Technologies cut emissions at the source: catalytic converters (cars) reduce CO, NOx, and VOCs; scrubbers remove SO₂ from smokestacks; electrostatic precipitators capture particulates. Since 1970, US emissions of major pollutants have fallen sharply even as population and the economy grew.",
        terms: [
          { term: "Catalytic converter", def: "Car device that converts exhaust pollutants (CO, NOx, VOCs) to less harmful gases." },
          { term: "Scrubber", def: "Smokestack device that removes SO₂ and particulates from emissions." },
        ],
        traps: ["The Clean Air Act shows pollution control and economic growth CAN coexist — emissions dropped while GDP rose."],
      },
    ],
  },
];
