/**
 * Core Notes English version — Honors Biology Unit 2 (The Cell: Structure & Function).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_BIOLOGY_U2_EN: CoreNote[] = [
  {
    lessonId: "honors-biology-u2-l1",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 2,
    lessonNum: 1,
    unitName: "The Cell: Structure & Function",
    title: "Cell Theory and Types of Cells",
    subtitle: "Why the structural difference between prokaryotic and eukaryotic cells is the starting point of biological complexity",
    overview:
      "The basic unit of life is the cell. Three hundred years after Robert Hooke peered through a microscope at a slice of cork and found tiny 'rooms,' today's cell theory rests on three core claims — all organisms are made of cells, the cell is the fundamental unit of life, and all cells arise from pre-existing cells. In this lesson, on the historical foundation of cell theory, we dig mechanistically into the structural differences between prokaryotes and eukaryotes.",
    objectives: [
      "State the three claims of cell theory and explain the scientific evidence supporting each",
      "Compare and contrast the structural differences between prokaryotic and eukaryotic cells (presence or absence of a nuclear envelope and membrane-bound organelles)",
      "Explain why bacteria and archaea are prokaryotes in terms of cellular structural features",
      "Analyze why the surface area-to-volume ratio limits cell size, linked to the efficiency of material exchange",
      "Evaluate how the difference in resolution between light and electron microscopes affected the study of cells",
    ],
    sections: [
      {
        title: "Cell Theory — The Unifying Theory of Life Science",
        subtitle: "Three claims built up by Hooke, Leeuwenhoek, Schleiden, Schwann, and Virchow",
        terms: [
          {
            term: "Cell theory",
            def: "The core unifying theory of life science built on three claims: ① all organisms are made of one or more cells; ② the cell is the fundamental structural and functional unit of life; ③ all cells arise by division from pre-existing cells.",
          },
          {
            term: "Resolution",
            def: "The minimum distance at which two points can be distinguished as separate. A light microscope's resolution is about 200 nm (half the wavelength of visible light), enough to see organelles; an electron microscope reaches about 0.2 nm, enough to see ribosomes and membrane structure.",
          },
          {
            term: "Surface area-to-volume ratio",
            def: "Cell surface area divided by cell volume. As a cell grows, this ratio falls, reducing the membrane area available to exchange material per unit volume; supply of oxygen and nutrients and removal of waste slow down, naturally limiting cell size.",
          },
          {
            term: "Disproof of spontaneous generation",
            def: "Pasteur's swan-neck flask experiment established the third claim of cell theory — that life arises only from pre-existing life. A sterilized broth grew no microbes unless outside bacteria were allowed to enter.",
          },
        ],
        traps: [
          "Writing the third claim of cell theory as only 'all cells arise by division' is insufficient. The key is that they arise 'from pre-existing cells.' You must include the meaning that cells do not arise spontaneously from non-living matter to earn full marks.",
          "It is easy to wonder whether viruses are an exception to cell theory. Because a virus is not a cell, it is simply not within the scope of cell theory. The debate is whether to count viruses as living under 'all organisms are made of cells' — it is not that cell theory is wrong.",
        ],
        example:
          "Let's feel the surface area-to-volume ratio numerically. A cube-shaped cell with a side of 1 μm has a surface area of 6 μm², a volume of 1 μm³, and a ratio of 6. With a side of 2 μm the surface area is 24 μm², the volume 8 μm³, and the ratio 3 — half. That is, doubling the cell's size halves the ratio. The larger the cell, the farther a single interior molecule must diffuse to reach the membrane, making material exchange inefficient. This is the core reason cells divide to stay small.",
      },
      {
        title: "Prokaryotic vs. Eukaryotic Cells — The Leap in Structure and Complexity",
        subtitle: "Why the presence or absence of a nuclear envelope is the most fundamental branch point in the evolution of complexity",
        terms: [
          {
            term: "Prokaryotic cell",
            def: "A cell that lacks a nuclear envelope, so its DNA exists in the cytoplasm as a nucleoid region. It has no membrane-bound organelles but does have ribosomes. Bacteria and archaea are prokaryotes.",
          },
          {
            term: "Eukaryotic cell",
            def: "A cell with a true nucleus enclosed by a nuclear envelope and membrane-bound organelles such as mitochondria, the endoplasmic reticulum, and the Golgi apparatus. Animals, plants, fungi, and protists are eukaryotes.",
          },
          {
            term: "Nucleoid",
            def: "The region of the cytoplasm in a prokaryotic cell where DNA is concentrated. It is not separated by a membrane and typically holds a single circular chromosome compacted with nucleoid-associated proteins.",
          },
          {
            term: "Cell wall",
            def: "A rigid layer outside the cell membrane that supports the cell and prevents osmotic rupture. Bacteria use peptidoglycan, plants use cellulose, and fungi use chitin. Animal cells have no cell wall.",
          },
        ],
        traps: [
          "Ribosomes are present in BOTH prokaryotic and eukaryotic cells. The defining feature of a prokaryote is the absence of membrane-bound organelles, not the absence of ribosomes. The fact that the prokaryotic ribosome (70S) is smaller than the eukaryotic ribosome (80S) is the basis for how certain antibiotics work.",
        ],
        example:
          "See why the 70S vs. 80S ribosome difference lets antibiotics work. Bacteria (prokaryotes) build proteins on smaller 70S ribosomes, while our own cells (eukaryotes) use larger 80S ribosomes. The antibiotic tetracycline binds specifically to the 30S subunit of the bacterial 70S ribosome and blocks tRNA from delivering amino acids, halting bacterial protein synthesis, but it does not fit the human 80S ribosome. This is the principle of 'selective toxicity': the drug can poison the invader's protein factory while sparing the patient's own — a direct, life-saving consequence of one structural difference between prokaryotic and eukaryotic cells.",
      },
    ],
  },
  {
    lessonId: "honors-biology-u2-l2",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 2,
    lessonNum: 2,
    unitName: "The Cell: Structure & Function",
    title: "Organelles and the Cell Membrane",
    subtitle: "The division of labor among the factories inside a eukaryotic cell, and how the membrane selectively controls what passes",
    overview:
      "Imagine a eukaryotic cell as a high-tech factory. The nucleus is the blueprint archive, ribosomes are the assembly line, the ER and Golgi are the processing-packaging-shipping system, mitochondria are the power plant, and chloroplasts are the solar panels. And the boundary that separates this whole factory from the outside — the plasma membrane — is not a simple wall but an intelligent, selectively permeable structure that actively decides what to admit and release. In this lesson you will fully master the structure–function link of each organelle and the fluid mosaic model of the phospholipid bilayer.",
    objectives: [
      "Pair and explain the structure and function of major organelles (nucleus, ribosome, ER, Golgi, mitochondria, chloroplast, lysosome, vacuole)",
      "Explain the fluid mosaic model in terms of the roles of the phospholipid bilayer, integral proteins, peripheral proteins, and cholesterol",
      "Trace the membrane continuity between organelles (nuclear envelope–ER–Golgi–plasma membrane secretory pathway) through the process of protein secretion",
      "Evaluate the evidence by which the endosymbiotic theory explains the origin of mitochondria and chloroplasts",
    ],
    sections: [
      {
        title: "Key Organelles — The Complete Link Between Structure and Function",
        subtitle: "How to understand why each organelle's membrane structure and function form one logical pair",
        terms: [
          {
            term: "Nucleus",
            def: "The cell's information center, enclosed by a double nuclear envelope. mRNA and proteins are exchanged with the cytoplasm through nuclear pores. It contains chromosomal DNA and the nucleolus, where RNA synthesis occurs.",
          },
          {
            term: "Endoplasmic reticulum (ER)",
            def: "A membrane network continuous with the nuclear envelope. The rough ER, with attached ribosomes, synthesizes, folds, and modifies secretory proteins; the smooth ER handles lipid synthesis and detoxification.",
          },
          {
            term: "Golgi apparatus",
            def: "A stack of flattened membrane sacs (cisternae) — the cell's postal shipping center — that modifies, sorts, and packages proteins from the ER and sends them to their destinations. The cis face points toward the ER, the trans face toward the plasma membrane.",
          },
          {
            term: "Mitochondria",
            def: "The cell's power plant, with a double membrane whose inner membrane folds into cristae to maximize the surface area for ATP synthesis. It has its own circular DNA and 70S ribosomes, serving as evidence for the endosymbiotic theory.",
          },
        ],
        traps: [
          "The fact that lysosomes are found only in animal cells does not mean plant cells lack digestive function. The plant central vacuole carries acidic hydrolytic enzymes and performs some lysosome-like roles. Writing 'plant cells have no digestive function at all' loses marks.",
          "The key to distinguishing rough from smooth ER is 'presence or absence of ribosomes.' On an exam asking 'what is the difference between the two?', you must answer immediately with 'whether ribosomes are attached.' Remember the names 'rough/smooth' come from the electron-microscope appearance produced by attached ribosomes.",
        ],
        example:
          "Let's trace the path a secretory protein takes out of the cell — say, a pancreatic β cell making insulin. ① In the nucleus, mRNA for the insulin gene is transcribed. ② The mRNA exits through a nuclear pore, binds a ribosome on the rough ER, and the insulin precursor is synthesized and inserted into the ER lumen. ③ After folding and glycosylation in the ER, it is packaged into a vesicle and moves to the cis face of the Golgi. ④ Inside the Golgi it undergoes further modification and cleavage, and mature insulin buds off the trans face into a secretory vesicle. ⑤ In response to a blood-glucose signal, the vesicle fuses with the plasma membrane and releases insulin out of the cell (exocytosis). This continuous membrane pathway from nucleus to plasma membrane is the heart of secretory-protein trafficking.",
      },
      {
        title: "The Fluid Mosaic Model of the Cell Membrane",
        subtitle: "The structural principle by which the phospholipid bilayer is selectively permeable yet stays fluid",
        terms: [
          {
            term: "Fluid mosaic model",
            def: "A model describing the membrane as a two-dimensional sea in which the phospholipid bilayer flows freely, with proteins, cholesterol, and glycolipids embedded like a mosaic. Proposed by Singer and Nicolson in 1972.",
          },
          {
            term: "Selective permeability",
            def: "The property by which the membrane screens passage according to a substance's size, polarity, and charge. Small nonpolar molecules (O₂, CO₂, lipids) diffuse freely, but ions, glucose, and proteins struggle to pass without the help of membrane proteins.",
          },
          {
            term: "Integral protein",
            def: "A membrane protein embedded deep in or completely spanning the phospholipid bilayer. It functions as an ion channel, receptor, or transporter; its hydrophobic amino acid regions interact with the hydrophobic interior of the membrane.",
          },
          {
            term: "Cholesterol",
            def: "A steroid molecule wedged among the phospholipids of animal cell membranes. At low temperatures it prevents fatty acid chains from packing tightly to maintain fluidity; at high temperatures it restrains excessive fluidity, regulating membrane stability.",
          },
        ],
        traps: [
          "Do not confuse the role of unsaturated fatty acids in membrane fluidity. The kinks created by the double bonds of unsaturated fatty acids prevent tight packing of the phospholipid chains, raising fluidity. Conversely, more saturated fatty acids let chains pack straight and densely, lowering fluidity. This is exactly why bacteria living in cold environments raise their proportion of unsaturated fatty acids to maintain membrane fluidity.",
        ],
        example:
          "See selective permeability at work at the cell surface. A small nonpolar molecule like oxygen (O₂) or carbon dioxide (CO₂) slips straight through the hydrophobic interior of the phospholipid bilayer by simple diffusion — no protein needed. But a charged ion like Na⁺ or a large polar molecule like glucose is repelled by that oily core and cannot cross on its own; it must pass through a specific integral protein — a channel or transporter. Cholesterol wedged among the phospholipids acts as a 'fluidity buffer,' keeping the membrane from getting too rigid when cold or too leaky when warm. Thus the membrane is not a passive wall but an intelligent gate that decides passage by a molecule's size, polarity, and charge.",
      },
    ],
  },
  {
    lessonId: "honors-biology-u2-l3",
    courseId: "honors-biology",
    subjectLabel: "Honors Biology",
    emoji: "🧬",
    unit: 2,
    lessonNum: 3,
    unitName: "The Cell: Structure & Function",
    title: "Membrane Transport and the Cell Cycle",
    subtitle: "How cells communicate with their environment through diffusion, osmosis, and active transport, and how life continues through cell division",
    overview:
      "Through selective permeability, the cell membrane finely regulates the cell's internal environment. Passive transport — substances moving from high to low concentration — needs no energy, but to gather needed substances against a concentration gradient, the cell requires active transport, which spends ATP. And after it finishes growing, the cell copies itself through division — once you understand how the cell cycle is regulated, you naturally understand why cancer is a failure of division control.",
    objectives: [
      "Compare the mechanisms of diffusion, facilitated diffusion, osmosis, and active transport, and explain the energy requirement and direction of transport for each",
      "Predict how animal and plant cells respond to isotonic, hypertonic, and hypotonic solutions by osmosis",
      "Explain the operation of the sodium-potassium pump (Na⁺/K⁺-ATPase) as the representative example of active transport",
      "Describe in order the stages of the cell cycle (G₁, S, G₂, M phase) and the key events of each",
      "Explain the four stages of mitosis (prophase, metaphase, anaphase, telophase) in terms of chromosome behavior",
    ],
    sections: [
      {
        title: "Passive and Active Transport — The Logic of Energy and Direction",
        subtitle: "How the concentration gradient and the role of ATP determine the direction and energy cost of moving substances",
        terms: [
          {
            term: "Diffusion",
            def: "Passive transport in which a substance spreads from a region of high to low concentration by random thermal motion without energy input. Oxygen and carbon dioxide diffuse directly through the cell membrane.",
          },
          {
            term: "Osmosis",
            def: "The diffusion of water molecules across a semi-permeable membrane. Water moves from the side of lower solute concentration (higher water concentration) to the side of higher solute concentration (lower water concentration). Osmotic pressure is the pressure needed to stop this movement of water.",
          },
          {
            term: "Facilitated diffusion",
            def: "Passive transport in which a substance moves down its concentration gradient through a channel protein or carrier protein. No energy is required, but a specific membrane protein is. The uptake of glucose and ions into cells is a representative example.",
          },
          {
            term: "Active transport",
            def: "Transport that uses ATP to move a substance against its concentration gradient (low → high). The sodium-potassium pump (Na⁺/K⁺-ATPase) is canonical, moving 3 Na⁺ out and 2 K⁺ in per ATP.",
          },
        ],
        traps: [
          "Osmosis is the movement of water, not the movement of solute. When a question shows a concentration difference across a semi-permeable membrane, first think of the direction water molecules move, not the solute. Water always moves from where there is more water (lower solute concentration) to where there is less water (higher solute concentration).",
          "Do not confuse how animal and plant cells respond in a hypotonic solution. An animal cell (red blood cell) swells as water enters and bursts by lysis, but a plant cell stays turgid because the cell wall generates turgor pressure. The firm stem of a plant is exactly due to this turgor pressure.",
        ],
        example:
          "Let's follow one cycle of the sodium-potassium pump. ① From the cytoplasmic side, 3 Na⁺ bind the pump protein's binding sites. ② ATP transfers a phosphate group to the pump (phosphorylation), changing the protein's shape so the binding sites face outside the cell. ③ The 3 Na⁺ are released outside, and 2 K⁺ from outside bind the new conformation. ④ The phosphate detaches, the protein returns to its original shape, and the 2 K⁺ are released inside the cell. This pump keeps intracellular Na⁺ low and K⁺ high, forming the basis for nerve signaling and cell-volume regulation.",
      },
      {
        title: "The Cell Cycle and Mitosis — The Precise Choreography of Replicating Life",
        subtitle: "How G₁, S, G₂, and M phases run in order while checkpoints filter out errors",
        terms: [
          {
            term: "Cell cycle",
            def: "The repeating process in which a cell grows, replicates its DNA, and divides. It consists of interphase (G₁, S, G₂) and the mitotic phase (M phase: mitosis + cytokinesis). G₁ is growth, S phase is DNA replication, and G₂ is preparation for division.",
          },
          {
            term: "Mitosis",
            def: "Nuclear division in which the chromosomes of the parent nucleus are distributed identically to two daughter cells. It proceeds through four stages: prophase, metaphase, anaphase, and telophase.",
          },
          {
            term: "Spindle fibers",
            def: "Microtubule structures extending from the centrosome. In metaphase they attach to the kinetochores of chromosomes; in anaphase they pull sister chromatids apart to opposite poles.",
          },
          {
            term: "Checkpoint",
            def: "A quality-control mechanism at specific points in the cell cycle that detects DNA damage, replication errors, and faulty spindle attachment and either permits or halts division. The G₁, G₂, and M-phase checkpoints are representative; when this system fails, cancer arises.",
          },
        ],
        traps: [
          "Writing that 'chromosomes' separate in anaphase of mitosis is inaccurate. Precisely, sister chromatids separate at the centromere and each moves as an independent chromosome to a different pole. In anaphase the cell's chromosome count appears temporarily doubled, but this is the chromatids separating and moving — the chromosome number is not truly doubled.",
          "Most of the cell cycle is interphase, not the mitotic phase. Students tend to think 'the cell is always dividing,' but real human cells spend over 90% of the cycle in interphase, performing growth, biosynthesis, and DNA replication.",
        ],
        example:
          "Let's view a single skin cell dividing from a checkpoint perspective. In G₁ the cell grows and the G₁ checkpoint asks, 'Is there DNA damage? Is the cell large enough? Are growth-factor signals present?' If all pass, it enters S phase and replicates DNA. The G₂ checkpoint checks, 'Is DNA replication fully complete? Is there damaged DNA?' On entering the mitotic phase, in prophase the chromatin condenses into distinct chromosomes, the nuclear envelope breaks down, and spindle fibers form. When chromosomes align on the equatorial plate in metaphase, the M-phase checkpoint verifies, 'Are spindle fibers properly attached to every kinetochore?' If it passes, in anaphase sister chromatids separate and move to the two poles, and in telophase a nuclear envelope reforms at each pole. Cytokinesis completes two identical daughter cells.",
      },
    ],
  },
];
