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
];
