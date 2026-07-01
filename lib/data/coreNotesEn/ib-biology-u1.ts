/**
 * Core Notes English version — IB Biology Unit 1 (Cell Biology).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-biology-u1-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 1,
    lessonNum: 1,
    unitName: "Cell Biology",
    title: "Cell Theory — 200 Years of Discovery That Defined the Rules of Life",
    subtitle: "How a single microscope overturned a worldview, and the exceptions IB always tests",
    overview:
      "It all began in 1665 when Robert Hooke peered at a thin slice of cork through a microscope and called what he saw 'little rooms.' The cell theory that Schleiden, Schwann, and Virchow later refined into three axioms declares: all living organisms are composed of cells, the cell is the fundamental unit of life, and all cells arise only from pre-existing cells. Yet IB knows this theory is not without cracks — exceptions such as skeletal muscle fibers, fungal hyphae, and slime molds that do not fit these axioms appear on exams with striking regularity.",
    objectives: [
      "State the three axioms of cell theory and explain the observations and experiments from which each was derived",
      "Compare the structural differences between prokaryotic and eukaryotic cells based on the presence or absence of a membrane-bound nucleus and organelles",
      "Identify the exceptions to cell theory (skeletal muscle fibers, fungal hyphae, slime molds) and explain why each exception arises",
      "Analyze the physical limits on cell size using the surface area to volume ratio",
    ],
    sections: [
      {
        title: "The Three Axioms of Cell Theory",
        subtitle: "The foundation of life science, validated over two centuries",
        terms: [
          {
            term: "Cell theory",
            def: "Three axioms systematized by Schleiden, Schwann, and Virchow: (1) all living organisms are composed of one or more cells; (2) the cell is the smallest fundamental unit of life; (3) all cells arise from the division of pre-existing cells.",
          },
          {
            term: "Prokaryotic cell",
            def: "A cell that lacks a membrane-bound nucleus and membrane-bound organelles. Bacteria and archaea are prokaryotes; their genetic material is located in a non-membrane-enclosed region called the nucleoid.",
          },
          {
            term: "Eukaryotic cell",
            def: "A cell with a true nucleus enclosed by a nuclear envelope and membrane-bound organelles such as mitochondria and the endoplasmic reticulum. Animals, plants, fungi, and protists are all eukaryotes.",
          },
          {
            term: "Surface area to volume ratio",
            def: "As a cell grows larger, its volume increases as a cube while its surface area increases only as a square, so the ratio decreases. Because the efficiency of material exchange falls, there is a physical upper limit on cell size.",
          },
        ],
        traps: [
          "IB Paper 2 extended-response questions frequently ask you to 'explain the limitations of cell theory with examples.' You must name specific examples — skeletal muscle fibers (multinucleate cells), fungal hyphae (multinucleate structures with incomplete septa), and slime molds (ambiguous boundary between unicellular and multicellular). Simply writing 'there are exceptions' earns close to zero marks; you must specify which axiom each exception challenges to earn full credit.",
          "In surface area to volume ratio calculation questions, students often omit units or reverse the direction of the ratio (writing V:SA instead of SA:V). Always verify that a larger ratio means more favorable material exchange — getting the direction wrong inverts your entire conclusion.",
        ],
        example:
          "Here is a numerical illustration of why the surface area to volume ratio limits cell size. A cube-shaped cell with a side length of 1 μm has a surface area of 6 μm² and a volume of 1 μm³, giving a ratio of 6:1. The same shape with a side length of 2 μm has a surface area of 24 μm² and a volume of 8 μm³, dropping the ratio to 3:1 — exactly half. When the cell doubles in linear size, the 'windows' available for gas and nutrient exchange (surface area) increase fourfold, but the interior that must be supplied (volume) increases eightfold. If a cell grows too large, the oxygen concentration inside falls below the threshold for cellular respiration and the cell dies.",
      },
      {
        title: "Prokaryotic vs. Eukaryotic Cells — Structural Comparison",
        subtitle: "Knowing exactly which structures are present — and absent — is everything on the exam",
        terms: [
          {
            term: "Nucleoid",
            def: "The non-membrane-bound region in a prokaryotic cell where circular DNA is compacted. Although histone proteins are absent, the DNA is partially organized by prokaryote-specific proteins.",
          },
          {
            term: "70S ribosome",
            def: "The smaller ribosome found in prokaryotic cells (composed of 30S and 50S subunits). Unlike the 80S eukaryotic ribosome, it is the selective target of many antibiotics.",
          },
          {
            term: "Nuclear envelope",
            def: "The double membrane surrounding the nucleus of a eukaryotic cell. Nuclear pores in the envelope regulate the passage of RNA and proteins between the nucleus and cytoplasm.",
          },
          {
            term: "80S ribosome",
            def: "The ribosome found in the cytoplasm and on the surface of the endoplasmic reticulum of eukaryotic cells (composed of 40S and 60S subunits). Ribosomes attached to the rough ER synthesize secretory proteins.",
          },
        ],
        traps: [
          "IB knows that ribosomes are present in BOTH prokaryotic and eukaryotic cells — but their sizes differ (70S vs. 80S). Writing 'prokaryotes have no ribosomes' is an instant mark deduction. Also note that mitochondria and chloroplasts in eukaryotic cells contain their own 70S ribosomes; this is frequently tested as evidence for the endosymbiotic origin of these organelles.",
        ],
        example:
          "Consider why the antibiotic erythromycin can kill an E. coli infection without poisoning your own cells. Erythromycin binds the 50S subunit of the bacterial 70S ribosome and blocks protein synthesis, but it does not fit the 60S subunit of the human 80S ribosome, so your cytoplasmic ribosomes keep working. The clinically important catch is that human mitochondria carry their own 70S ribosomes — a relic of their endosymbiotic bacterial ancestry — which is why very high doses of such antibiotics can disrupt mitochondrial protein synthesis and produce side effects. This single case simultaneously illustrates the 70S vs. 80S distinction and the endosymbiotic origin of mitochondria.",
      },
    ],
  },
  {
    lessonId: "ib-biology-u1-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 1,
    lessonNum: 2,
    unitName: "Cell Biology",
    title: "Membrane Structure and Transport — Why the Fluid Mosaic Is Alive",
    subtitle: "The molecular mechanism of selective permeability, and the energy logic of active vs. passive transport",
    overview:
      "In 1972 Singer and Nicolson proposed the fluid mosaic model, declaring that the membrane is not a static wall but a living two-dimensional fluid in which proteins float. The fluidity of the phospholipid bilayer is precisely regulated by fatty acid saturation and cholesterol, while the diverse proteins embedded within handle material transport, cell recognition, and signal transduction. In IB, the key skill is accurately distinguishing simple diffusion, facilitated diffusion, osmosis, active transport, endocytosis, and exocytosis by their energy requirements.",
    objectives: [
      "List the key components of the fluid mosaic model (phospholipid bilayer, integral and peripheral membrane proteins, cholesterol, glycoproteins) and describe the role of each",
      "Classify simple diffusion, facilitated diffusion, osmosis, and active transport by their energy requirements and involvement of membrane proteins",
      "Explain osmosis in terms of water potential gradients and predict the consequences of osmotic pressure on cell volume",
      "Describe endocytosis (phagocytosis and pinocytosis) and exocytosis as dynamic behaviors of the membrane",
      "Analyze at the molecular level how temperature, fatty acid composition, and cholesterol affect membrane fluidity",
    ],
    sections: [
      {
        title: "The Fluid Mosaic Model",
        subtitle: "The membrane is not a static wall — it is a constantly flowing two-dimensional fluid",
        terms: [
          {
            term: "Fluid mosaic model",
            def: "A model of membrane structure proposed by Singer and Nicolson in 1972, in which the phospholipid bilayer flows like a liquid and various proteins are embedded within it in a 'mosaic' pattern.",
          },
          {
            term: "Integral membrane protein",
            def: "A membrane protein whose hydrophobic region spans or is embedded within the phospholipid bilayer. These proteins function as transporters, channels, and receptors, and cannot be removed from the membrane without detergent.",
          },
          {
            term: "Peripheral membrane protein",
            def: "A protein loosely associated with the surface of the phospholipid head groups or with integral proteins. It can be dissociated from the membrane by changes in ion concentration or pH.",
          },
          {
            term: "Glycoprotein",
            def: "A membrane protein with carbohydrate chains attached, located on the extracellular surface of the membrane. Glycoproteins function in cell recognition, immune responses, and as receptors.",
          },
        ],
        traps: [
          "IB frequently asks about the role of cholesterol in the membrane; answering only 'it increases fluidity' earns half marks at best. The accurate answer depends on temperature: at high temperatures, cholesterol restrains the free movement of phospholipids and reduces fluidity; at low temperatures, it prevents phospholipids from packing into a gel-like state and maintains fluidity. Cholesterol should be described as a 'temperature buffer' for membrane fluidity.",
        ],
        example:
          "The FRAP (Fluorescence Recovery After Photobleaching) experiment is the classic demonstration of membrane fluidity. A laser bleaches a patch of fluorescently labeled phospholipids, eliminating fluorescence in that zone. Over time, labeled phospholipids from the surrounding membrane diffuse into the bleached zone and fluorescence recovers. The rate of recovery quantifies membrane fluidity: recovery is faster at higher temperatures and with a greater proportion of unsaturated fatty acids.",
      },
      {
        title: "Passive Transport — Movement Without Energy",
        subtitle: "The concentration gradient is the energy source; membrane proteins are merely the keys that open the gate",
        terms: [
          {
            term: "Simple diffusion",
            def: "The movement of molecules down a concentration gradient directly through the phospholipid bilayer, without the assistance of membrane proteins. Oxygen, carbon dioxide, ethanol, and lipid-soluble hormones move by simple diffusion.",
          },
          {
            term: "Facilitated diffusion",
            def: "Passive transport of molecules down a concentration gradient through channel proteins or carrier proteins. ATP is not consumed, but membrane proteins are required. Glucose, amino acids, and ions move by facilitated diffusion.",
          },
          {
            term: "Osmosis",
            def: "The movement of water molecules across a semi-permeable membrane from a region of higher water potential (lower solute concentration) to a region of lower water potential (higher solute concentration). No energy is consumed.",
          },
          {
            term: "Osmotic pressure",
            def: "The pressure that must be applied to prevent the net movement of water by osmosis. Higher solute concentration produces greater osmotic pressure; it is directly linked to phenomena such as swelling, shrinking, and lysis of red blood cells.",
          },
        ],
        traps: [
          "IB Paper 1 multiple-choice questions frequently include traps designed to confuse osmosis with diffusion. Osmosis refers exclusively to the movement of water molecules across a semi-permeable membrane. The movement of solute molecules is diffusion (simple or facilitated), not osmosis. Also distinguish the response of plant cells to a hypertonic solution: plasmolysis (the cell membrane pulls away from the cell wall) — unlike animal cells, plant cells do not burst because the cell wall is present.",
          "Both facilitated diffusion and active transport use membrane proteins, but their energy requirements differ. Facilitated diffusion moves molecules down a concentration gradient and requires no ATP; active transport moves molecules against a concentration gradient and requires ATP. Memorizing 'uses a protein = active transport' is wrong and will cost marks.",
        ],
        example:
          "Consider a red blood cell placed in three different solutions to see osmosis in action. In an isotonic solution (0.9% saline, the same water potential as the cytoplasm) there is no net movement of water and the cell keeps its normal biconcave shape. In a hypotonic solution such as pure water, water moves in by osmosis from high water potential outside to lower water potential inside, the cell swells and bursts (hemolysis) because animal cells have no cell wall. In a hypertonic solution such as 3% saline, water leaves the cell down the water potential gradient and the cell shrinks and becomes crenated. Note that in every case it is water, not the salt solute, that crosses the semi-permeable membrane.",
      },
      {
        title: "Active Transport, Endocytosis, and Exocytosis",
        subtitle: "Movements that require ATP — including the ways the membrane physically reshapes itself",
        terms: [
          {
            term: "Active transport",
            def: "The movement of substances against a concentration gradient using ATP. The sodium-potassium pump (Na⁺/K⁺-ATPase) is the canonical example: it expels 3 Na⁺ ions and imports 2 K⁺ ions per cycle.",
          },
          {
            term: "Phagocytosis",
            def: "A form of endocytosis in which the cell extends its plasma membrane to engulf solid particles or bacteria, drawing them in as a vacuole (phagosome). Immune cells such as macrophages and neutrophils use phagocytosis to destroy pathogens.",
          },
          {
            term: "Pinocytosis",
            def: "A form of endocytosis in which the cell takes up liquid and its dissolved solutes into small vesicles — sometimes called 'cell drinking.' It is distinguished from the more selective receptor-mediated endocytosis.",
          },
          {
            term: "Exocytosis",
            def: "The process by which secretory vesicles fuse with the plasma membrane and release their contents outside the cell. It is used for neurotransmitter release, digestive enzyme secretion, and antibody secretion.",
          },
        ],
        traps: [
          "IB specifically tests the exact number of ions moved per cycle of the sodium-potassium pump: 3 Na⁺ out, 2 K⁺ in. Memorize this ratio precisely, and connect it to the consequence: because more positive charges leave than enter, the inside of the cell maintains a net negative (resting) membrane potential. Common wrong answers include '2 each' or '3 each' — both appear frequently as distractors.",
        ],
        example:
          "Follow the charge bookkeeping of one cycle of the sodium-potassium pump in a neuron. The pump hydrolyzes one ATP to expel 3 Na⁺ ions from the cell and import 2 K⁺ ions, so each cycle moves a net of one positive charge outward (3 out minus 2 in). Repeated over millions of pumps, this builds and maintains the resting membrane potential of about -70 mV, with the inside negative relative to the outside. This example connects active transport directly to a downstream physiological function: without the constant ATP-powered 3:2 pumping, the neuron could not maintain the gradient it needs to fire action potentials.",
      },
    ],
  },
  {
    lessonId: "ib-biology-u1-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 1,
    lessonNum: 3,
    unitName: "Cell Biology",
    title: "Cell Division — The Precise Control of Mitosis and the Cell Cycle",
    subtitle: "Understanding why each stage must follow the sequence it does is also understanding cancer",
    overview:
      "A single cell dividing into two identical daughter cells is far more than a simple splitting in half. Each stage — prophase, metaphase, anaphase, telophase — is a molecularly precise sequence designed to guarantee the accurate segregation of chromosomes, and when the checkpoints that enforce this sequence fail, the result is cancer. IB also requires the practical skill of identifying stages of cell division from microscope images and calculating the mitotic index.",
    objectives: [
      "Describe the cell cycle as composed of interphase (G1, S, G2) and the mitotic phase (M phase), and list the key events occurring at each stage",
      "Distinguish prophase, metaphase, anaphase, and telophase of mitosis by chromosome behavior and identify each stage from microscope images",
      "Explain the molecular mechanisms of spindle fiber formation, centromere attachment, and sister chromatid separation",
      "Calculate the mitotic index and interpret the difference between dividing and non-dividing tissues",
    ],
    sections: [
      {
        title: "The Cell Cycle — Mitosis Is Not the Whole Story",
        subtitle: "For division to succeed, DNA replication during S phase must be perfect, and checkpoints must be vigilant",
        terms: [
          {
            term: "Cell cycle",
            def: "The repeating sequence of cell growth (G1) → DNA replication (S phase) → preparation for division (G2) → division (M phase: mitosis + cytokinesis). Progression through the cycle is permitted or blocked at checkpoints.",
          },
          {
            term: "Interphase",
            def: "The collective term for G1, S, and G2. Under the microscope, interphase cells show an intact nuclear envelope and no visible chromosomes. Interphase is not a resting period — it is the busiest time of the cell cycle, during which DNA is replicated and the cell grows.",
          },
          {
            term: "Cyclin-CDK complex",
            def: "A complex formed by a cyclin protein and a cyclin-dependent kinase (CDK). At cell cycle checkpoints, the complex phosphorylates target proteins to authorize entry into the next stage of the cycle.",
          },
          {
            term: "Cell cycle checkpoint",
            def: "A control system at the G1/S, G2/M, and spindle assembly checkpoints that monitors DNA damage, replication completeness, and spindle attachment. If errors are detected, the checkpoint halts the cell cycle.",
          },
        ],
        traps: [
          "Writing 'interphase is a resting phase' in an IB extended-response question is an immediate mark deduction. During S phase of interphase, the entire genome is replicated; during G1 and G2, active cell growth and division preparation occur. The reason interphase cells vastly outnumber dividing cells in any microscope image is that interphase lasts far longer than mitosis — not because the cell is idle.",
        ],
        example:
          "Use the relative durations of the cell cycle to explain what you see down a microscope. In a typical human cell with a 24-hour cycle, interphase lasts roughly 23 hours (G1 about 11 h, S about 8 h, G2 about 4 h) while mitosis takes only about 1 hour. If you sample a growing tissue at a random instant, the probability of catching a given cell in mitosis is about 1/24, so you expect only around 4% of cells to show condensed chromosomes and the other 96% to be in interphase with an intact nuclear envelope. This is exactly why an onion root tip micrograph is dominated by interphase cells — the phase durations, not any 'resting,' set the proportions.",
      },
      {
        title: "The Stages of Mitosis — A Detailed Breakdown",
        subtitle: "Track chromosomes through prophase, metaphase, anaphase, and telophase and you will never confuse them",
        terms: [
          {
            term: "Prophase",
            def: "Chromatin condenses into visible chromosomes, the nuclear envelope begins to break down, and spindle fibers (microtubules extending from centrioles) form. Each chromosome consists of two sister chromatids joined at the centromere.",
          },
          {
            term: "Metaphase",
            def: "Spindle fibers attach to centromeres and align all chromosomes along the cell's equatorial plate (metaphase plate). Chromosomes are at their most condensed state — the optimal moment for karyotyping.",
          },
          {
            term: "Anaphase",
            def: "Cohesin proteins holding sister chromatids together are cleaved, and each chromatid is pulled to opposite poles of the cell by the spindle. The number of chromatids moving to each pole equals the original chromosome number of the cell.",
          },
          {
            term: "Telophase",
            def: "A nuclear envelope reforms around each set of chromatids at the poles, and the chromosomes decondense back into chromatin. Cytokinesis begins, completing the formation of two daughter cells.",
          },
          {
            term: "Mitotic index",
            def: "The ratio of dividing cells to total cells (number of cells in mitosis ÷ total number of cells). Used to assess tissue growth rate, tumor malignancy, and the effectiveness of anticancer drugs.",
          },
        ],
        traps: [
          "Confusing anaphase with metaphase is a common error in microscope image questions. In metaphase, chromosomes are lined up in a single row at the equatorial plate; in anaphase, chromatids are already moving toward the two poles. Remember: 'two sets visible at the ends of the cell = anaphase; a single line in the middle = metaphase.' IB also asks what a high mitotic index implies — answer specifically: rapid growth, possible malignant tumor, or wound-healing tissue. Simply writing 'more division is occurring' will not earn full marks.",
          "Cytokinesis occurs differently in animal and plant cells — a frequent exam question. In animal cells, a contractile ring of actin pinches the cell inward (cleavage furrow). In plant cells, a cell plate grows outward from the center and ultimately becomes the new cell wall.",
        ],
        example:
          "Here is an example of the IB practical exercise of calculating the mitotic index from an onion root tip image. In a micrograph showing 200 cells total, 12 are in prophase, 5 in metaphase, 3 in anaphase, and 4 in telophase. Mitotic index = (12 + 5 + 3 + 4) / 200 = 24/200 = 0.12, or 12%. The root tip meristem is actively growing, so its mitotic index is far higher than that of mature leaf mesophyll cells (mitotic index ≈ 0). If cells treated with an anticancer drug show an accumulation of cells in metaphase, this is evidence that the drug inhibits spindle fiber formation.",
      },
    ],
  },
];
