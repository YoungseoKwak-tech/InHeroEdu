/**
 * Core Notes English version — IB Psychology Unit 1 (Biological Approach).
 * Full content preserved (objectives · terms · traps · example) with natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_PSYCHOLOGY_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-psychology-u1-l1",
    courseId: "ib-psychology",
    subjectLabel: "IB Psychology",
    emoji: "🧠",
    unit: 1,
    lessonNum: 1,
    unitName: "Biological Approach",
    title: "Brain and Behavior: Localization and Neuroplasticity",
    subtitle:
      "How do we prove that specific brain regions handle specific functions — and that this map can be redrawn by experience?",
    overview:
      "The biological approach starts with a simple claim: behavior originates in the brain. But which region handles which behavior? Localization theory holds that brain functions are assigned to specific areas, while neuroplasticity tells us those assignments can change with experience, injury, and training. From Phineas Gage to the London taxi driver hippocampus study, we follow the evidence to grasp the core of the brain–behavior relationship.",
    objectives: [
      "Define localization of function and explain how brain-lesion studies and neuroimaging research support it",
      "Describe the principles of neuroplasticity and distinguish between structural change and functional reorganization",
      "Evaluate key case studies including Phineas Gage, H.M. (Henry Molaison), and the London taxi driver study",
      "Distinguish correlation from causation in brain–behavior research and discuss the ethical limitations of research methods",
      "Analyze how localization and neuroplasticity are complementary rather than contradictory concepts",
    ],
    sections: [
      {
        title: "Localization: The Address Book of Brain Function",
        subtitle:
          "Evidence linking specific behaviors, cognitions, and emotions to specific brain structures",
        terms: [
          {
            term: "Localization of function",
            def: "The principle that specific psychological and behavioral functions are controlled by specific regions of the brain. Classic examples include Broca's area (left frontal lobe) for speech production and Wernicke's area (left temporal lobe) for language comprehension.",
          },
          {
            term: "Lateralization",
            def: "The tendency for certain functions to be concentrated in one cerebral hemisphere. Language is predominantly left-hemisphere; spatial processing is generally right-hemisphere dominant, though individual variation exists.",
          },
          {
            term: "Hippocampus",
            def: "A limbic structure located in the medial temporal lobe that plays a critical role in the consolidation of explicit (declarative) memory. The H.M. case established the link between hippocampal damage and the inability to form new long-term memories.",
          },
          {
            term: "Frontal lobe",
            def: "The anterior region of the cerebral cortex responsible for executive function, decision-making, impulse control, and personality. Phineas Gage's frontal lobe injury provided landmark historical evidence connecting this region to personality and social behavior.",
          },
        ],
        traps: [
          "The most common IB exam error is interpreting localization to mean 'only one brain region operates in isolation.' In reality, localization means a specific area plays a key role in a particular function — not that the function is entirely independent of other regions. Language, for example, relies critically on Broca's and Wernicke's areas, but multiple networks work in concert. Missing this nuance costs marks in the top band.",
          "The Phineas Gage study is a case study, so generalizability is limited. When an IB question asks for 'limitations of this study,' be sure to address: the single-case nature, the imprecision of 19th-century neuroscientific measurement, and the reliability problems of post-hoc reconstruction.",
        ],
        example:
          "London taxi driver study (Maguire et al., 2000): MRI scans of 16 London taxi drivers were compared with 50 age- and sex-matched non-drivers. Taxi drivers had significantly larger posterior hippocampi (the region associated with spatial memory processing), and hippocampal volume correlated positively with years of driving experience. Conclusion: prolonged spatial navigation training produces structural changes in the hippocampus — making this a key study supporting both localization (hippocampus = spatial memory) and neuroplasticity (experience-driven structural change) simultaneously.",
      },
      {
        title: "Neuroplasticity: How the Brain Rewrites Itself",
        subtitle:
          "The mechanisms by which experience, injury, and learning physically alter neuronal connections and brain structure",
        terms: [
          {
            term: "Neuroplasticity",
            def: "The brain's ability to reorganize itself structurally and functionally in response to experience, learning, and injury. It encompasses synaptic formation and strengthening (synaptic plasticity), dendritic growth, and even limited neurogenesis (new neuron formation).",
          },
          {
            term: "Synaptic pruning",
            def: "The process of eliminating unused synaptic connections to increase the efficiency of neural circuits. It is especially active during adolescence, and experience determines which connections are strengthened or removed.",
          },
          {
            term: "Long-term potentiation (LTP)",
            def: "A cellular learning mechanism in which repeated synaptic activation produces a lasting strengthening of synaptic connections. It is the basis of Hebbian plasticity: 'neurons that fire together, wire together.'",
          },
          {
            term: "Functional recovery",
            def: "The clinical expression of neuroplasticity in which adjacent or contralateral brain regions take over functions lost to injury. Rehabilitation therapy promotes this process.",
          },
        ],
        traps: [
          "Avoid overstating neuroplasticity as meaning the brain 'changes infinitely and always.' Plasticity is constrained by age, severity of injury, and intensity of training. IB questions asking about 'limitations of neuroplasticity' require you to note that adult plasticity is lower than in childhood and that severe damage may prevent complete recovery. Evidence-based nuance beats unlimited optimism.",
        ],
        example:
          "H.M. case (Milner, 1957 onward): Henry Molaison (H.M.) had both hippocampi removed to treat severe epilepsy. After surgery he could no longer form new declarative memories, yet procedural memory (motor-skill learning such as mirror drawing) was intact. The case proved that memory is not a single system and established the hippocampus as the seat of declarative memory consolidation. Crucially, H.M.'s ability to acquire new motor skills is itself evidence of neuroplasticity — skill learning was possible via cerebellar and basal-ganglia pathways even without a hippocampus.",
      },
      {
        title: "Research Methods and Ethics: Evaluating Biological Evidence",
        subtitle:
          "Major methodologies in brain research, their strengths and limitations, and principles of participant protection",
        terms: [
          {
            term: "fMRI (Functional Magnetic Resonance Imaging)",
            def: "A non-invasive neuroimaging technique that maps which brain regions activate during specific cognitive tasks by measuring blood-flow changes. It has high spatial resolution but low temporal resolution and cannot establish causation.",
          },
          {
            term: "Case study",
            def: "A research method involving an in-depth investigation of a single individual or small group. Case studies of rare brain injuries — such as H.M. and Phineas Gage — are invaluable for exploring brain–behavior relationships, but generaliz­ability is low.",
          },
          {
            term: "Informed consent",
            def: "The ethical principle requiring that research participants voluntarily agree to participate after fully understanding the study's purpose, procedures, and potential risks. It is mandatory in neuroimaging and clinical research.",
          },
          {
            term: "Baseline condition",
            def: "A control condition measuring the resting level of brain activity without experimental manipulation. In fMRI research, task-related activation must be contrasted with the baseline to confirm genuine functional localization.",
          },
        ],
        traps: [
          "In IB HL extended responses, you must include the critique that fMRI shows correlation, not causation. A region being active during a task does not mean it causes that function. Additionally, fMRI compares the most active region during a task — it does not imply that region is the sole area responsible. Citing fMRI without this caveat loses marks.",
          "For ethics questions, specifically note that retrospective consent for historical case studies (e.g., Phineas Gage, who is deceased) could not be obtained. A vague statement like 'there are ethical issues' will not reach the top mark band — you must identify which ethical principle was violated and explain how.",
        ],
        example:
          "Methodological evaluation of Maguire et al. (2000): MRI was used to measure hippocampal volume and a quasi-experimental design compared taxi drivers against controls. Strengths: the biological measure is objective and a dose–response relationship was found between driving experience and hippocampal volume. Limitation: the correlational design means causation cannot be confirmed — it is impossible to fully rule out reverse causation (people with larger hippocampi may be better suited to become taxi drivers). The absence of longitudinal data or random assignment limits causal inference.",
      },
    ],
  },
  {
    lessonId: "ib-psychology-u1-l2",
    courseId: "ib-psychology",
    subjectLabel: "IB Psychology",
    emoji: "🧠",
    unit: 1,
    lessonNum: 2,
    unitName: "Biological Approach",
    title: "Neurotransmitters and Hormones: The Chemical Language of Behavior",
    subtitle:
      "How synaptic chemical signals and endocrine signals in the bloodstream coordinate emotion, memory, and social behavior",
    overview:
      "The brain is not a purely electrical machine. In the gaps between neurons (synapses), chemical messengers carry signals; beyond the brain, hormones issue commands to the entire body via the bloodstream. Serotonin orchestrates mood, dopamine drives reward and motivation, oxytocin regulates bonding, and cortisol manages the stress response. Understanding this chemical language is essential for grasping the core of the biological approach.",
    objectives: [
      "Explain the mechanism of neurotransmitter action (synthesis, release, receptor binding, reuptake, and degradation) at the synaptic level",
      "Link the roles of serotonin, dopamine, and oxytocin to behavioral outcomes and cite relevant research",
      "Compare and contrast the mechanisms by which hormones and neurotransmitters exert their effects",
      "Explain the relationship between cortisol and the stress response, including the concept of the HPA axis",
      "Critically evaluate the limitation that neurochemical research often demonstrates correlation rather than causation",
    ],
    sections: [
      {
        title: "Synaptic Signaling: How Neurotransmitters Work",
        subtitle:
          "The mechanism by which neurons communicate in chemical language and the roles of key neurotransmitters",
        terms: [
          {
            term: "Neurotransmitter",
            def: "A chemical messenger released from the presynaptic neuron that crosses the synaptic cleft and binds to postsynaptic receptors, either exciting or inhibiting the next cell. Examples include serotonin, dopamine, acetylcholine, and GABA.",
          },
          {
            term: "Serotonin",
            def: "A neurotransmitter involved in mood regulation, appetite, sleep, and impulse control. Low serotonin levels are associated with depression and anxiety; SSRIs (selective serotonin reuptake inhibitors) increase synaptic serotonin concentration to produce their therapeutic effect.",
          },
          {
            term: "Dopamine",
            def: "A neurotransmitter involved in reward, motivation, and motor control. The mesolimbic dopamine pathway ('reward circuit') underlies pleasure and addiction; the nigrostriatal pathway governs motor control, and its degeneration is associated with Parkinson's disease.",
          },
          {
            term: "Reuptake",
            def: "The process by which released neurotransmitters are reabsorbed into the presynaptic neuron, terminating the signal and recycling the transmitter. Drugs such as SSRIs block this process to increase synaptic concentration.",
          },
        ],
        traps: [
          "IB answers that flatly state 'low serotonin causes depression' will lose marks. The relationship between serotonin and depression is correlational, and the serotonin hypothesis has been criticized as an oversimplification. Use precise language such as 'low serotonin levels are associated with depression' or 'serotonin dysregulation is observed in depression,' avoiding causal claims.",
          "Describing dopamine as simply the 'happiness chemical' will cost marks. Dopamine signals reward prediction error (the difference between expected and actual reward) and is more closely tied to motivation and seeking behavior than to happiness itself. This distinction is critical when explaining why addiction involves dysregulation of the dopamine system.",
        ],
        example:
          "Raine et al. (1997) PET study: PET scans of 41 individuals convicted of murder were compared with a matched control group. Murderers showed lower glucose metabolism in the prefrontal cortex (an index of neural activity) and different asymmetry patterns in the amygdala and hippocampus. The study suggests that antisocial behavior may be associated with differences in brain function, but the relationship is correlational, not causal — and the ethical implications of deterministic interpretation (biology as destiny) must be discussed alongside the findings.",
      },
      {
        title: "Hormones and Behavior: The Slow Conducting of the Endocrine System",
        subtitle:
          "How hormonal signals through the bloodstream coordinate social behavior, stress, and sex differences",
        terms: [
          {
            term: "Oxytocin",
            def: "A peptide hormone and neurotransmitter synthesized in the hypothalamus and released from the posterior pituitary. It promotes social bonding, trust, maternal behavior, and lactation, and also modulates the stress response.",
          },
          {
            term: "Cortisol",
            def: "A glucocorticoid hormone secreted by the adrenal cortex during stress, involved in glucose mobilization, anti-inflammatory responses, and immune suppression. Chronically elevated cortisol is associated with hippocampal damage and memory impairment.",
          },
          {
            term: "HPA axis (Hypothalamic–pituitary–adrenal axis)",
            def: "The neuroendocrine system that responds to stress: the hypothalamus releases CRH → the pituitary releases ACTH → the adrenal glands secrete cortisol, adapting the body to the stressor through this cascade.",
          },
          {
            term: "Testosterone",
            def: "An androgen hormone produced mainly in the testes, associated with aggression, dominance behavior, and sexual motivation. However, the relationship between testosterone and aggression is context-dependent and does not constitute a simple causal link.",
          },
        ],
        traps: [
          "Reducing oxytocin to merely the 'love hormone' will not earn high marks in IB. Oxytocin can simultaneously increase in-group favoritism and amplify distrust of out-groups (De Dreu et al.; Ditzen et al.), and it is implicated in jealousy and selective trust. Demonstrating this dual nature is essential when a question asks you to 'critically evaluate the effects of oxytocin.'",
          "Avoid writing that testosterone 'causes' aggression. Correlational studies show an association, but experimental manipulation studies find weaker effects that vary with context (social challenge, status threat). A unidirectional causal claim falls into the trap of biological determinism.",
        ],
        example:
          "Ditzen et al. (2009) oxytocin and couples conflict study: 47 couples received intranasal oxytocin or placebo before engaging in a conflict discussion. The oxytocin group showed increased positive communication behaviors (smiling, active listening) and lower cortisol levels. The double-blind, placebo-controlled design strengthens internal validity, but questions remain about ecological validity — whether short-term laboratory effects generalize to real-world relationships.",
      },
      {
        title: "Evaluating Neurochemical Research: Strengths, Limitations, and Ethics",
        subtitle:
          "How to critically read animal models, pharmacological manipulation studies, and neuroimaging research",
        terms: [
          {
            term: "Animal model",
            def: "A research method using animals (typically rodents) to study human disorders or behavior. It is useful for testing the causal effects of drugs and brain manipulation, but limited by questions of generalizability to humans (species specificity).",
          },
          {
            term: "Double-blind procedure",
            def: "An experimental control in which neither participants nor researchers know which condition (drug or placebo) has been administered. It minimizes expectation bias and increases the internal validity of neurochemical drug studies.",
          },
          {
            term: "Reductionism",
            def: "The approach of explaining complex behaviors and psychological phenomena in terms of simpler biological components (neurons, neurotransmitters, genes). It is both a strength of the biological approach and the basis for criticism that it ignores social, cultural, and cognitive factors.",
          },
          {
            term: "Ecological validity",
            def: "The degree to which research findings can be applied to real-life settings outside the laboratory. Controlled neurochemical experiments tend to have high internal validity but low ecological validity.",
          },
        ],
        traps: [
          "When discussing the biological approach, simply listing reductionism as a 'weakness' is insufficient. Top-band answers present a balanced view: reductionism increases scientific testability (a strength) while also oversimplifying the complexity of human behavior (a limitation). Whenever an instruction says 'critically discuss,' address both strengths and limitations.",
        ],
        example:
          "Caspi et al. (2003) 5-HTTLPR gene and stress–depression study: Individuals carrying the short allele (s-allele) of the serotonin transporter gene who experienced stressful life events in adulthood had higher rates of depression than long-allele (l-allele) carriers. This study demonstrated the importance of gene–environment interaction (G×E interaction). Later meta-analyses questioned the effect size, but the study established the key principle that genes do not act alone — behavior is determined by the interaction of genetic predisposition and environmental exposure.",
      },
    ],
  },
  {
    lessonId: "ib-psychology-u1-l3",
    courseId: "ib-psychology",
    subjectLabel: "IB Psychology",
    emoji: "🧠",
    unit: 1,
    lessonNum: 3,
    unitName: "Biological Approach",
    title: "Genetics, Evolution, and Behavior: The Evidence for Nature",
    subtitle:
      "How genes contribute to behavior, and how evolutionary pressures have shaped universal behavioral patterns",
    overview:
      "Does DNA determine behavior? It is not that simple. Genes set the range of possibilities, not a fixed blueprint. Twin studies isolate the genetic contribution to behavior, and evolutionary psychology asks why humans are designed to act in certain ways. Understanding heritability, epigenetics, and evolutionary adaptation reveals how powerful the biological approach can be — and how cautiously its findings must be interpreted.",
    objectives: [
      "Explain the concept of heritability and describe how twin studies and adoption studies estimate genetic contribution",
      "Define the principles of epigenetics and connect how the environment alters gene expression to behavioral outcomes",
      "Apply core evolutionary psychology concepts (natural selection, adaptation, inclusive fitness) to explain behavioral patterns",
      "Critically evaluate the ethical and methodological limitations of twin studies and evolutionary psychology research",
      "Reframe the nature–nurture debate as an interaction rather than a dichotomy",
    ],
    sections: [
      {
        title: "Genetics and Behavior: Twin Studies and Heritability",
        subtitle:
          "How comparing monozygotic and dizygotic twins separates the contributions of genes and environment",
        terms: [
          {
            term: "Heritability",
            def: "The proportion of variance in a trait within a specific population that is attributable to genetic differences, expressed as a value from 0 to 1.0 (or 0–100%). A heritability of 0.7 means 70% of the variance in that trait within that population is explained by genetic differences. Note: this is a population-level statistic, not an individual-level one.",
          },
          {
            term: "Monozygotic twins (MZ)",
            def: "Twins who develop from a single fertilized egg and share approximately 100% of their genes. Twin studies compare the concordance rates of MZ twins with those of dizygotic (DZ) twins to estimate genetic contribution.",
          },
          {
            term: "Concordance rate",
            def: "The probability that, if one twin displays a particular trait or disorder, the other twin displays the same trait or disorder. A significantly higher concordance rate in MZ twins than in DZ twins indicates a genetic contribution.",
          },
          {
            term: "Separated twins study",
            def: "A research design studying monozygotic twins reared apart from birth in order to control for shared environmental influence and more directly estimate genetic contribution. Bouchard et al.'s Minnesota study is the landmark example.",
          },
        ],
        traps: [
          "Do not write that MZ twins have 'identical environments.' MZ twins typically grow up in the same household, but micro-environments differ (how parents treat each twin individually, peer groups, intrauterine position). There is also the gene–environment correlation problem: MZ twins may actively select and evoke more similar environments because of their genetic identity. Failing to note these limitations will prevent top-band marks.",
          "Applying heritability to an individual is a logical error. The statement 'if heritability is 80%, then 80% of this person's IQ is genetic' is incorrect. Heritability is a population-level statistic, and it changes when the environment changes. High IQ heritability estimates are fully compatible with the finding that environmental interventions (e.g., quality education) can raise IQ.",
        ],
        example:
          "Bouchard et al. (1990) Minnesota Study of Twins Reared Apart: 37 pairs of MZ twins reared apart were compared with 41 pairs of DZ twins reared apart. Intelligence concordance rates for together-reared MZ twins and separated MZ twins were similar, and high similarity between MZ twins was also observed in personality, vocational interests, and social attitudes. The study provides evidence that genetic contribution outweighs shared environmental influence, but limitations include a non-representative sample (twins recruited through media contact) and potential bias in self-report measures.",
      },
      {
        title: "Epigenetics: Experience Flips the Gene Switch",
        subtitle:
          "The mechanisms by which the environment regulates gene expression without altering the DNA sequence",
        terms: [
          {
            term: "Epigenetics",
            def: "The study of changes in gene expression patterns that occur without changes to the underlying DNA sequence. Chemical marks such as methylation (suppressing gene expression) and histone acetylation (activating gene expression) switch genes on and off.",
          },
          {
            term: "DNA methylation",
            def: "An epigenetic mechanism in which a methyl group (–CH₃) is added to cytosine in DNA, suppressing gene transcription. Early-life stress and trauma can alter the methylation patterns of specific genes (e.g., stress-response-related genes).",
          },
          {
            term: "Early-life stress",
            def: "Chronic stress, abuse, or neglect experienced during sensitive developmental periods (prenatal and early childhood) that produces lasting epigenetic changes in HPA-axis regulatory genes, with enduring effects on adult stress reactivity and mental health.",
          },
          {
            term: "Gene–environment interaction (G×E)",
            def: "The phenomenon in which individuals with a particular genotype respond differently to a given environment than individuals with a different genotype. The diathesis–stress model is the most widely used framework for explaining this interaction.",
          },
        ],
        traps: [
          "Interpreting epigenetics as 'acquired characteristics are inherited' (Lamarckism) is a serious error. While some research on transgenerational epigenetics suggests that certain epigenetic marks can be transmitted to subsequent generations, most epigenetic changes are reset during the formation of germ cells. The claim that 'epigenetics resolves the nature–nurture dichotomy' is also an overgeneralization — this remains an active area of research.",
        ],
        example:
          "Weaver et al. (2004) maternal behavior and stress reactivity in rats: Rat pups that received high levels of maternal licking and grooming showed lower methylation of the glucocorticoid receptor (GR) gene, resulting in a less reactive HPA axis. Pups of low-nurturing mothers showed higher GR gene methylation and greater stress sensitivity. These effects persisted into adulthood and were reversed by administration of a histone deacetylase inhibitor. Although the study uses an animal model — limiting direct generalization to humans — it provides compelling evidence that early caregiving experience epigenetically programs the brain's stress system.",
      },
      {
        title: "Evolutionary Psychology: The Selection History Written into Behavior",
        subtitle:
          "How natural selection produced universal human behavioral patterns, and the limits of evolutionary explanation",
        terms: [
          {
            term: "Natural selection",
            def: "The process by which individuals better adapted to their environment leave more descendants, causing traits that enhance survival and reproduction to accumulate in a population across generations. It is the central mechanism of Darwinian evolution.",
          },
          {
            term: "Adaptation",
            def: "A trait shaped by natural selection because it contributed to survival and reproductive success in ancestral environments and is therefore present in current populations. Evolutionary psychology explains present-day behavioral patterns in terms of past adaptive pressures.",
          },
          {
            term: "Inclusive fitness",
            def: "An individual's total evolutionary success, including not only direct reproductive output but also contributions to the reproduction of genetically related individuals. Hamilton's concept explains the evolution of altruistic behavior, particularly kin altruism.",
          },
          {
            term: "Evolutionary psychology",
            def: "An approach that understands current psychological mechanisms and behaviors as products of adaptation. It seeks evolutionary explanations for universal human behavioral patterns such as mate selection, jealousy, aggression, fear, and language.",
          },
        ],
        traps: [
          "Evolutionary psychology explanations are frequently criticized in IB as 'just-so stories.' Observing a current behavior and working backward to propose an adaptive explanation is difficult to falsify — this methodological limitation must be addressed in any evaluation. Also note that a behavior present today is not necessarily evidence that it was adaptive in ancestral environments.",
          "Do not misread evolutionary explanations as biological determinism. Evolutionary psychology does not claim 'humans are programmed to do X.' It claims 'a tendency to do X under certain conditions has evolved in humans.' This nuance is decisive for top-band marks. Always mention cultural variation and context-dependence alongside evolutionary claims.",
        ],
        example:
          "Buss (1989) 37-culture mate preference study: A survey of 10,047 individuals across 37 cultures found that men consistently valued physical attractiveness and youth in partners more than women did, while women consistently valued resource acquisition ability and status in partners more than men did. Evolutionary psychology explains this through parental investment theory (the sex with greater parental investment is more selective in mate choice). However, limitations include social desirability bias in self-report surveys, underestimation of cross-cultural variation, and the difficulty of ruling out the contribution of gender-role socialization.",
      },
    ],
  },
];
