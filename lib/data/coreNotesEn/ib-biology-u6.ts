/**
 * Core Notes English version — IB Biology Unit 6 (Human Physiology).
 * Faithful translation of the Korean storytelling original.
 * All objectives, terms, traps, and examples preserved at identical depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U6_EN: CoreNote[] = [
  {
    lessonId: "ib-biology-u6-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 6,
    lessonNum: 1,
    unitName: "Human Physiology",
    title: "Digestion & Absorption + Heart, Vessels & Blood — How Nutrients Reach Every Cell",
    subtitle: "From the mouth, through the vessels, to every cell in the body — digestion and circulation are one continuous supply chain",
    overview:
      "The starting point of human physiology is the question 'how do cells obtain what they need?' The answer lies in the tight cooperation of two systems: the digestive system breaks food down into absorbable molecules, and the circulatory system delivers those molecules to every cell. Digestion proceeds along two axes — physical digestion (chewing, peristalsis) and chemical digestion (enzymes, acid, bile) — and the final products are absorbed through the villi and microvilli of the small intestine. The absorbed nutrients enter the hepatic portal circulation via capillaries, or the lymphatic system via the lacteal. The heart of the circulatory system works as a double pump: the right side handles the pulmonary circulation, and the left side handles the systemic circulation. Blood vessels are divided by function into arteries, veins, and capillaries, and blood itself consists of four components: red blood cells (erythrocytes), white blood cells (leukocytes), platelets, and plasma. IB does not stop at describing these two systems separately — it demands an integrated understanding in which you trace, as a connected pathway, how digested products are absorbed and then travel through the heart and vessels to reach target tissues.",
    objectives: [
      "Explain the role of each organ of the digestive system (mouth, oesophagus, stomach, small intestine, large intestine, liver, pancreas) by linking it to enzyme secretion, and describe which enzymes break carbohydrates, proteins, and lipids down into which final products",
      "Explain how the structural features of the small-intestine villi and microvilli maximise the absorptive surface area, and describe the pathways by which monosaccharides and amino acids are absorbed into capillaries while fatty acids and glycerol are absorbed into the lacteal",
      "Explain the double-pump structure of the heart (pulmonary and systemic circulation), and discuss the roles of systole and diastole, and of the atrioventricular and semilunar valves, within the cardiac cycle",
      "Compare in a table the structural differences (wall thickness, elasticity, presence of valves) and functional differences (pressure, speed, direction) among arteries, veins, and capillaries, and explain the functions of the four components of blood (red cells, white cells, platelets, plasma)",
    ],
    sections: [
      {
        title: "Digestion and Absorption — The Two Axes of Breakdown and the Strategy of the Villi",
        subtitle: "Enzymes cut large molecules into small ones, and villi draw those molecules into the bloodstream",
        terms: [
          {
            term: "Chemical digestion",
            def: "The process by which enzymes and digestive juices break covalent bonds, splitting large molecules into absorbable monomers. Carbohydrates: amylase (saliva, pancreas) breaks starch into maltose, and enzymes such as maltase (intestinal lining) break disaccharides into monosaccharides like glucose. Proteins: pepsin (stomach, optimal at low pH) breaks protein into polypeptides; trypsin and chymotrypsin (pancreas) digest further; peptidases in the intestinal lining complete the breakdown into amino acids. Lipids: bile (produced by the liver, stored in the gallbladder) emulsifies fat to increase its surface area, and pancreatic lipase breaks triglycerides into fatty acids and glycerol.",
          },
          {
            term: "Villi and microvilli",
            def: "A two-tier structure that maximises the absorptive surface area of the small-intestine lining. Villi are finger-like projections of the intestinal mucosa (about 1 mm tall), each containing a capillary network and a lacteal. Microvilli are further brush-like projections from the surface of the villus epithelial cells (enterocytes), collectively forming the 'brush border.' This double structure brings the effective surface area of the small-intestine lining to roughly 200 m² (the size of a tennis court). Monosaccharides and amino acids are absorbed via capillaries → hepatic portal vein → liver, while fatty acids and glycerol are reassembled into triglycerides, packaged as chylomicrons, and absorbed via the lacteal → lymphatic vessels → thoracic duct → veins.",
          },
          {
            term: "Hepatic portal circulation",
            def: "A vascular route designed so that nutrients absorbed in the small intestine pass through the liver first. Venous blood from the small intestine, large intestine, stomach, and pancreas converges to form the hepatic portal vein, which flows into the liver. The liver buffers blood glucose by storing it as glycogen or releasing it, detoxifies toxic substances, and deaminates amino acids, before sending blood out via the hepatic vein → inferior vena cava.",
          },
        ],
        traps: [
          "Bile is not an enzyme. Bile is synthesised in the liver and stored in the gallbladder, and it plays a physical role: emulsifying fat into small droplets to increase the surface area on which lipase can act. Writing 'bile digests fat' will immediately cost marks; you must write 'bile emulsifies fat, assisting the action of lipase.'",
          "Do not confuse the lipid absorption pathway with the monosaccharide/amino-acid absorption pathway. Monosaccharides and amino acids go via capillaries → hepatic portal vein → liver, while fatty acids and glycerol are repackaged as chylomicrons and enter the lacteal → lymphatic system → thoracic duct → subclavian vein. Writing that lipids are absorbed directly into capillaries is incorrect.",
        ],
        example:
          "An example summarising digestive enzymes. Here we organise the enzymes, substrates, products, and sites of secretion frequently asked about in IB.\n\n· Amylase: substrate = starch, product = disaccharides such as maltose, site = salivary glands, pancreas\n· Pepsin: substrate = protein, product = polypeptides, site = stomach (secreted as propepsin, activated by HCl), optimal pH ≈ 2\n· Trypsin: substrate = polypeptides, product = short peptides, site = pancreas (secreted as inactive trypsinogen)\n· Lipase: substrate = triglyceride, product = fatty acids + glycerol, site = pancreas\n· Maltase and other disaccharidases: substrate = disaccharides, product = monosaccharides, site = small-intestine lining (brush border)\n\nIn IB Paper 1 and 2 you may be asked about the substrate or optimal pH of a particular enzyme, or asked to interpret a graph showing how enzyme activity changes with pH.",
      },
      {
        title: "Heart, Vessels & Blood — The Double Pump and the Circulatory Highway",
        subtitle: "The left and right sides beat together, each perfusing the lungs and the whole body in a dual-circuit design",
        terms: [
          {
            term: "Double circulation",
            def: "The mammalian circulatory arrangement in which blood passes through the heart twice during one complete circuit of the body. Right atrium → right ventricle → pulmonary artery → lungs (gas exchange) → pulmonary vein → left atrium → left ventricle → aorta → systemic circulation → vena cava → right atrium. The wall of the left ventricle is thicker than that of the right because it must pump blood to the whole body at high pressure. Double circulation keeps oxygenated blood from the lungs and returning systemic blood from mixing, maximising efficiency.",
          },
          {
            term: "Cardiac cycle",
            def: "The sequence of contraction and relaxation that occurs in one heartbeat. ① Atrial systole: the atria contract and push blood into the ventricles (AV valves open). ② Ventricular systole: the ventricles contract and force blood into the arteries (semilunar valves open, AV valves close). ③ Ventricular diastole: the ventricles relax, blood pressure falls, the semilunar valves close, and blood begins to flow in from the atria. Valves prevent the backflow of blood, and the heart sounds ('lub-dub') are produced when the valves close.",
          },
          {
            term: "Artery, vein, capillary",
            def: "The three vessel types have structures matched to their functions. Artery: carries blood from the heart to the tissues; has a thick muscular and elastic layer to withstand high pressure and no valves. Vein: returns blood from the tissues to the heart; has a thin wall and one-way valves to prevent backflow, with skeletal-muscle contraction assisting blood movement. Capillary: has a wall of a single layer of endothelium, the site where exchange of materials (gases, nutrients, wastes) occurs, with a diameter so small that red blood cells pass through in single file.",
          },
          {
            term: "Components of blood",
            def: "Blood consists of four components. ① Red blood cells (erythrocytes): no nucleus, biconcave disc shape, carry O₂ and CO₂ via haemoglobin, lifespan about 120 days. ② White blood cells (leukocytes): responsible for immune responses, have a nucleus, classified as monocytes, lymphocytes, neutrophils, and so on. ③ Platelets (thrombocytes): nucleus-free cell fragments that initiate blood clotting. ④ Plasma: contains water, proteins, glucose, ions, hormones, and wastes (e.g. urea), making up about 55% of blood volume.",
          },
        ],
        traps: [
          "The rule that arteries carry oxygenated blood has exceptions. The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs. Likewise, the pulmonary vein carries oxygenated blood from the lungs to the left atrium. Simply memorising 'artery = oxygenated, vein = deoxygenated' fails in the pulmonary circulation.",
          "You must understand the timing of valve opening and closing. When the ventricles contract, the AV valves (bicuspid, tricuspid) close and the semilunar valves (aortic, pulmonary) open. Conversely, when the ventricles relax, the semilunar valves close and the AV valves open. Describing this relationship the wrong way around is immediately incorrect.",
        ],
        example:
          "An example tracing the path of blood. Here we describe, in pathway order, the entire journey of glucose absorbed in the small intestine until it reaches a muscle cell.\n\n① Absorption into small-intestine capillaries → ② convergence into the hepatic portal vein → ③ passage through the liver (blood-glucose regulation, detoxification) → ④ hepatic vein → ⑤ inferior vena cava → ⑥ right atrium → ⑦ right ventricle → ⑧ pulmonary artery → ⑨ lungs (oxygen loading, CO₂ release) → ⑩ pulmonary vein → ⑪ left atrium → ⑫ left ventricle → ⑬ aorta → ⑭ capillaries of muscle tissue → arrival at the muscle cell.\n\nIn the 'describe the pathway' questions of IB Paper 2, full marks require listing this sequence accurately and describing what happens at each stage (valve opening/closing, gas exchange, blood-glucose processing, and so on).",
      },
    ],
  },
  {
    lessonId: "ib-biology-u6-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 6,
    lessonNum: 2,
    unitName: "Human Physiology",
    title: "Defence Against Disease (Immunity) + Gas Exchange — How the Lungs and Immune System Block External Threats",
    subtitle: "While we breathe, pathogens invade — the lungs exchange gases and the immune system remembers the enemy",
    overview:
      "The body is constantly exposed to pathogens. The defences that block them fall into two layers: fast, non-specific innate immunity, and slow but precise, memory-forming adaptive immunity. Innate immunity consists of the skin, mucous membranes, phagocytosis, and the inflammatory response, and it responds regardless of the type of pathogen. Adaptive immunity divides into humoral immunity, in which B lymphocytes produce antibodies, and cell-mediated immunity, in which T lymphocytes directly destroy infected cells. Antibodies are Y-shaped proteins that bind only to a specific antigen, and the specificity of the antigen–antibody reaction is the key by which the immune system distinguishes 'self' from 'non-self.' A vaccine safely introduces an antigen to generate memory cells, thereby inducing a rapid secondary immune response upon real infection. In the gas-exchange system, the structural features of the alveoli enable efficient exchange of O₂ and CO₂, and ventilation is achieved through the cooperation of the diaphragm and the intercostal muscles. IB demands the ability to describe the stages of the immune response in order and to discuss the structure–function relationship of the alveoli accurately.",
    objectives: [
      "Explain the first and second lines of defence in innate immunity (skin, mucous membranes, phagocytosis, inflammatory response), and describe why each component is non-specific",
      "Explain in order the stages of adaptive immunity — antigen presentation → T-cell activation → B-cell activation → antibody production → memory-cell formation — and interpret a graph showing the difference between the primary and secondary immune responses (speed, antibody titre)",
      "Explain how the variable region in the Y-shaped structure of an antibody determines antigen specificity, and describe how formation of the antigen–antibody complex contributes to pathogen removal",
      "Explain how the structural features of the alveoli (single-layer epithelium, large surface area, thin walls, abundant capillaries, moist surface) maximise the efficiency of gas diffusion, and describe how the diaphragm, intercostal muscles, lung volume, and pressure change during inspiration and expiration",
    ],
    sections: [
      {
        title: "Innate and Adaptive Immunity — The Rapid Front Line and the Precision Special Forces",
        subtitle: "Once the first line of defence is breached, antibodies and memory cells remember the pathogen permanently",
        terms: [
          {
            term: "Phagocytosis",
            def: "The process by which a phagocyte (mainly neutrophils, monocytes, macrophages) engulfs a pathogen or cell debris with pseudopodia to form a phagosome, which fuses with a lysosome and is broken down by digestive enzymes. It is a core mechanism of innate immunity, non-specific, and requires no prior training to recognise a particular pathogen. After breakdown, macrophages present fragments of the pathogen's antigen on their cell surface (antigen presentation), initiating adaptive immunity.",
          },
          {
            term: "Antibody (Immunoglobulin)",
            def: "A Y-shaped glycoprotein produced by B lymphocytes after they differentiate into plasma cells. Four polypeptide chains (two heavy chains + two light chains) are linked by disulphide bonds. The variable region located at the tips of the two arms of the Y has a high degree of specificity, binding complementarily only to the epitope of a particular antigen. Formation of the antigen–antibody complex removes the pathogen through agglutination, neutralisation of toxins, and enhancement of phagocyte uptake (opsonisation).",
          },
          {
            term: "Memory cells",
            def: "Cells in which, after the primary immune response, some B and T lymphocytes survive for decades, retaining the specific information of the antigen. Upon re-exposure to the same antigen, memory cells proliferate rapidly to begin the secondary immune response, in which antibody production is far greater and faster than in the primary response (shortened lag phase, surging titres). Vaccines work on the principle of using attenuated or inactivated antigens to form memory cells without actual infection.",
          },
        ],
        traps: [
          "Antibodies are secreted not by B lymphocytes but by plasma cells. To be precise, B cells must first be activated with the help of T helper cells and differentiate into plasma cells before antibody secretion begins. Writing 'B cells secrete antibodies' omits a step and may receive only partial marks in IB grading. You must write 'differentiate into plasma cells and then secrete.'",
          "Errors frequently occur when interpreting graphs of the primary and secondary immune responses. Compared with the primary, the secondary response has ① a shorter lag phase, ② a higher peak antibody titre, and ③ antibodies that persist longer. You must explain all three differences by the presence of memory cells. Merely writing 'the secondary response is stronger' costs marks; you must link it to the mechanism.",
        ],
        example:
          "An example describing how a vaccine works. IB Paper 2 often requires you to describe step by step how a vaccine confers immunity.\n\n① The attenuated pathogen (or inactivated antigen, protein fragment, etc.) contained in the vaccine is introduced into the body.\n② Macrophages present the antigen (antigen presentation), and T helper cells become activated.\n③ T helper cells stimulate B cells → B cells differentiate into plasma cells → antibody production (primary response).\n④ Some B and T lymphocytes remain as memory cells.\n⑤ Upon infection with the real pathogen, memory cells immediately produce large quantities of antibody (secondary response) → the pathogen is removed before it can proliferate.\n\nKey point: the purpose of a vaccine is to create immune memory without causing disease.",
      },
      {
        title: "Gas Exchange — The Design of the Alveolus and the Mechanism of Ventilation",
        subtitle: "Each alveolus is built to push exchange efficiency to its limit, and the diaphragm is its pump",
        terms: [
          {
            term: "Alveolus (plural alveoli)",
            def: "A tiny, grape-cluster-shaped air sac within the lung where gas exchange takes place. Structural features that maximise gas-exchange efficiency: ① single-layer squamous epithelium — minimises diffusion distance, ② enormous total surface area (roughly 70 m² across both lungs combined) — maximises diffusion area, ③ abundant capillary network — maintains the concentration gradient, ④ moist surface — gases diffuse in dissolved form, ⑤ surfactant secretion — reduces surface tension to prevent alveolar collapse. O₂ moves from the alveolus into the blood and CO₂ from the blood into the alveolus by simple diffusion along the partial-pressure gradient.",
          },
          {
            term: "Ventilation mechanism",
            def: "The process by which, during inspiration and expiration, the cooperation of the diaphragm and intercostal muscles changes lung volume and pressure to move air. Inspiration (active): the diaphragm contracts (flattens) and the external intercostal muscles contract → thoracic volume increases → lung volume increases → intrapulmonary pressure decreases → atmospheric pressure > intrapulmonary pressure → air flows in. Expiration (passive at rest): the diaphragm and external intercostal muscles relax → the thoracic cavity recoils elastically → lung volume decreases → intrapulmonary pressure increases → intrapulmonary pressure > atmospheric pressure → air is expelled.",
          },
        ],
        traps: [
          "The lungs have no muscle, so they cannot expand or contract on their own. Changes in lung volume depend entirely on changes in thoracic volume produced by contraction and relaxation of the diaphragm and intercostal muscles. Writing 'the lungs contract to cause expiration' is incorrect; you must write the causal chain 'decreased thoracic volume → elastic recoil of the lungs → rise in intrapulmonary pressure → expiration.'",
          "Gas exchange occurs not by active transport but by simple diffusion. No energy (ATP) is consumed, and the driving force is the partial-pressure gradient. O₂ has a higher partial pressure on the alveolar side and so moves into the blood; CO₂ has a higher partial pressure on the blood side and so moves into the alveolus. Writing 'cells actively take up O₂' will immediately cost marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u6-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 6,
    lessonNum: 3,
    unitName: "Human Physiology",
    title: "Neurons & Synapses (Action Potentials) + Hormones and Homeostasis (Blood Glucose & Temperature Control)",
    subtitle: "An electrical signal crosses the synapse, and hormones lock blood glucose and body temperature within a narrow range",
    overview:
      "The nervous system and the endocrine system are the body's two coordinating and integrating systems. The nervous system transmits the electrical signal of the action potential through neurons on a millisecond timescale, while the endocrine system transmits hormones through the blood to target organs slowly (over seconds to minutes). A neuron has the structure dendrites → cell body → axon → axon terminal, and the action potential arises from changes in membrane permeability to sodium ions (Na⁺) and potassium ions (K⁺). At the synapse, the junction between neurons, the electrical signal is converted into a chemical signal — a neurotransmitter — which binds to receptors on the next neuron and is then converted back into an electrical signal. Homeostasis is the ability to maintain the internal environment within a narrow optimal range, and the negative-feedback mechanism is its core principle. In blood-glucose regulation, insulin (lowering glucose) and glucagon (raising glucose) are secreted by the islets of Langerhans of the pancreas and regulate blood glucose antagonistically. In thermoregulation, the hypothalamus acts as the integrating centre for sensing body temperature and triggering corrective responses, with sweating, shivering, and vasodilation/vasoconstriction acting as effectors. IB demands the ability to explain the stages of the action potential by linking them to ion movement, and to complete blood-glucose and temperature control as negative-feedback diagrams.",
    objectives: [
      "Explain the structure of a neuron (dendrites, cell body, axon, myelin sheath, nodes of Ranvier) and the roles of sensory neurons, relay (inter)neurons, and motor neurons",
      "Explain the generation of the action potential as the stages of polarisation (resting potential) → depolarisation (Na⁺ influx) → repolarisation (K⁺ efflux) → hyperpolarisation → recovery by linking them to ion movement, and discuss the refractory period and the all-or-nothing law",
      "Describe step by step the process of synaptic transmission (synaptic-vesicle release → neurotransmitter diffusion → receptor binding → ion-channel opening → depolarisation of the next cell → neurotransmitter reuptake/breakdown), and distinguish excitatory from inhibitory synapses",
      "Explain the antagonistic action of insulin and glucagon and the negative-feedback loop in blood-glucose regulation, and describe how the hypothalamus links receptor, integrating centre, and effector in thermoregulation",
    ],
    sections: [
      {
        title: "Neurons and the Action Potential — The Birth and Propagation of an Electrical Signal",
        subtitle: "When Na⁺ rushes in the membrane reverses, and when K⁺ flows out it returns to the way it was",
        terms: [
          {
            term: "Action potential",
            def: "A transient reversal of membrane potential that occurs at the neuron's plasma membrane. The resting membrane potential is about −70 mV (the cell interior is negative). When a stimulus at or above threshold arrives: ① Depolarisation: voltage-gated Na⁺ channels open and Na⁺ rushes in → membrane potential rises to +30 to +40 mV. ② Repolarisation: Na⁺ channels close and K⁺ channels open, so K⁺ flows out → membrane potential falls. ③ Hyperpolarisation: K⁺ channels close late, so the membrane potential briefly drops below −70 mV. ④ The sodium–potassium pump (Na⁺/K⁺ pump) actively transports 3 Na⁺ out and 2 K⁺ in to restore the resting membrane potential.",
          },
          {
            term: "All-or-nothing law & Refractory period",
            def: "All-or-nothing law: if the stimulus intensity reaches threshold, an action potential of maximal size is generated; below threshold, none occurs at all. The size of the action potential is always constant, independent of stimulus intensity. Stimulus intensity is encoded by the frequency of action potentials per unit time. Refractory period: immediately after an action potential, while Na⁺ channels are inactivated (the absolute refractory period), no new action potential can be generated by any stimulus; in the subsequent, partially recovered relative refractory period, only a strong stimulus above threshold can elicit a response. The refractory period guarantees unidirectional propagation of the action potential.",
          },
          {
            term: "Synaptic transmission",
            def: "The process of crossing the synaptic cleft (about 20 nm) between two neurons with a chemical signal. ① An action potential reaches the presynaptic terminal → ② voltage-gated Ca²⁺ channels open → Ca²⁺ flows in → ③ synaptic vesicles fuse with the presynaptic membrane and release neurotransmitters (e.g. acetylcholine, dopamine, serotonin) into the synaptic cleft → ④ the neurotransmitter binds to receptors on the postsynaptic membrane → ⑤ ion channels open → at an excitatory synapse: Na⁺ influx → depolarisation → an action potential may be generated; at an inhibitory synapse: Cl⁻ influx or K⁺ efflux → hyperpolarisation → action-potential generation is suppressed → ⑥ the neurotransmitter is broken down by an enzyme (e.g. acetylcholinesterase) or taken back up (reuptake) into the presynaptic neuron.",
          },
        ],
        traps: [
          "Writing that the Na⁺/K⁺ pump 'creates' an individual action potential during propagation is incorrect. The Na⁺/K⁺ pump is not directly involved in generating the action potential; its role is to restore the resting membrane potential after the action potential has ended. The action potential itself is generated by the rapid opening and closing of voltage-gated ion channels.",
          "Synaptic transmission is one-directional (presynaptic → postsynaptic). Because neurotransmitters are released only at the presynaptic terminal and receptors are on the postsynaptic membrane, a reverse signal is impossible. In addition, the excitatory and inhibitory signals received via receptors on the dendrites are integrated at the cell body (axon hillock) (spatial and temporal summation), and an action potential is generated only when their sum exceeds threshold.",
        ],
        example:
          "An example interpreting an action-potential graph. IB Paper 1 and 2 frequently present a graph of membrane potential (mV) versus time (ms) and ask about the ion movement at a particular point.\n\nSummary of ion movement by graph segment:\n① Resting potential (−70 mV): K⁺ is mainly inside the cell, Na⁺ mainly outside. The Na⁺/K⁺ pump maintains the gradient.\n② Depolarisation rising phase (−70 → +40 mV): voltage-gated Na⁺ channels open rapidly → sharp Na⁺ influx.\n③ Repolarisation falling phase (+40 → −70 mV): Na⁺ channels inactivate/close + K⁺ channels open → K⁺ efflux.\n④ Hyperpolarisation phase (below −70 mV): K⁺ channels close late, so K⁺ over-effluxes.\n⑤ Recovery (return to −70 mV): the Na⁺/K⁺ pump operates (consuming ATP).\n\nKey point: the absolute refractory period corresponds to the depolarisation + repolarisation phases (Na⁺ channels inactivated), and during this phase no stimulus, however strong, can trigger a new action potential.",
      },
      {
        title: "Homeostasis — The Negative-Feedback Loops of Blood-Glucose and Temperature Control",
        subtitle: "Insulin and glucagon hold blood glucose like a seesaw, and the hypothalamus acts as the body's thermostat",
        terms: [
          {
            term: "Negative feedback",
            def: "A control principle in which, when a system departs from its optimal set point, the deviation is detected and a corrective response in the opposite direction is triggered. It is the core mechanism of homeostasis. Structure: ① receptor (detects the change) → ② control centre / effector coordinator (processes the signal, decides the response) → ③ effector (executes the corrective response) → ④ feedback (the response stops once the change returns to the set point). In negative feedback the output acts to reduce the input, so the system stabilises, oscillating with decreasing amplitude around the set point.",
          },
          {
            term: "Blood glucose regulation",
            def: "The antagonistic action of two hormones secreted by the alpha cells and beta cells of the islets of Langerhans of the pancreas maintains blood glucose at about 4–6 mmol L⁻¹ (about 80–120 mg dL⁻¹). When blood glucose rises: beta cells → insulin secretion → liver and muscle cells increase glucose uptake, glycogen synthesis (glycogenesis) is promoted, and fat synthesis is promoted → blood glucose falls. When blood glucose falls: alpha cells → glucagon secretion → in the liver, glycogen breakdown (glycogenolysis) and gluconeogenesis are promoted → glucose is released into the blood → blood glucose rises. Diabetes mellitus: type 1 involves destruction of beta cells (no insulin secretion); type 2 involves reduced responsiveness of insulin receptors.",
          },
          {
            term: "Thermoregulation",
            def: "The hypothalamus performs in an integrated way the roles of receptor (sensing skin and blood temperature) + control centre (comparing against the 37 °C set point) + effector-command centre. When body temperature rises (heat-loss mechanisms): ① sweating — heat is released via the latent heat of water evaporation, ② vasodilation of skin vessels — increased skin blood flow increases heat loss by radiation and convection, ③ relaxation of the arrector pili — hairs lie flat, thinning the air layer. When body temperature falls (heat-gain mechanisms): ① shivering — involuntary muscle contraction generates heat, ② vasoconstriction of skin vessels — reduced skin blood flow limits heat loss, ③ contraction of the arrector pili — hairs stand up, thickening the air layer to enhance insulation.",
          },
        ],
        traps: [
          "Do not confuse the cells that secrete insulin and glucagon. Insulin = pancreatic beta cells; glucagon = pancreatic alpha cells. Writing that the two hormones are secreted by the opposite cells immediately costs marks. Also remember that insulin is the hormone that 'lowers' blood glucose — when glucose is high, beta cells are stimulated to secrete insulin.",
          "In thermoregulation, writing that 'raising the hairs (piloerection)' contributes significantly to maintaining body temperature in humans may not be accepted in IB grading. Humans have little body hair, so the practical insulating effect of this mechanism is almost nil; the main defence against rising temperature is sweating, and against falling temperature it is shivering and vasoconstriction. Also, writing only that sweating 'lowers body temperature' is insufficient; you must include the principle that 'the latent heat of evaporation draws heat away from the skin as water evaporates.'",
        ],
        example:
          "An example describing the negative feedback of blood-glucose regulation. IB Paper 2 gives a scenario and asks you to describe the hormonal response to a change in blood glucose step by step.\n\nScenario: after a carbohydrate-rich meal, blood glucose has risen to 9 mmol L⁻¹.\n\n① Receptor: the pancreatic beta cells detect the rise in blood glucose.\n② Integration: the beta cells secrete insulin into the blood.\n③ Effector response A: liver cells take up glucose and synthesise it into glycogen (glycogenesis).\n④ Effector response B: muscle and fat cells increase glucose uptake via GLUT4 receptors.\n⑤ Result: blood glucose falls into the normal range (about 4–6 mmol L⁻¹).\n⑥ Feedback: normalisation of blood glucose → reduced stimulation of beta cells → reduced insulin secretion (negative feedback complete).\n\nKey point: full marks require stating explicitly that, in negative feedback, the corrective response acts in the direction that removes the original stimulus.",
      },
    ],
  },
];
