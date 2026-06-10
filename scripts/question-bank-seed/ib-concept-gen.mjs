/**
 * IB concept subjects (Biology, Chemistry, Economics, Physics) — SL + HL.
 * Builds MCQs from authored term/definition banks: a "best definition" item and
 * a reverse "which term" item per entry, with same-bank distractors.
 * Output → <subject>-ibgen<seed>.json   (topic prefixed "SL · "/"HL · ")
 *
 *   node scripts/question-bank-seed/ib-concept-gen.mjs 1
 */
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const seed = Number(process.argv[2] || 1);
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(seed*40503+7);
const shuffle=(arr)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(arr,n,not)=>shuffle(arr.filter(x=>x!==not)).slice(0,n);

function buildSubject(entries){
  const qs=[]; const seen=new Set();
  const defs=entries.map(e=>e.def); const terms=entries.map(e=>e.term);
  function opt(level,topic,question_text,correct,distractors,explanation){
    if(seen.has(question_text))return;
    const chosen=[String(correct)];
    for(const d of distractors){const s=String(d);if(!chosen.includes(s))chosen.push(s);if(chosen.length===4)break;}
    if(chosen.length<4)return;
    const arr=shuffle(chosen.map((v,i)=>({v,ok:i===0})));const L=["a","b","c","d"];
    const q={level,topic:`${level} · ${topic}`,difficulty:"medium",question_text};let ca="A";
    arr.forEach((o,i)=>{q["option_"+L[i]]=o.v;if(o.ok)ca=L[i].toUpperCase();});
    q.correct_answer=ca;q.explanation=explanation;seen.add(question_text);qs.push(q);
  }
  for(const e of entries){
    const fd=sample(defs,3,e.def);
    if(fd.length===3)opt(e.lvl,e.t,`In IB ${e.t}, "${e.term}" is best defined as:`,e.def,fd,`${e.term}: ${e.def}`);
    const rt=sample(terms,3,e.term);
    if(rt.length===3)opt(e.lvl,e.t,`Which term is defined as: "${e.def}"?`,e.term,rt,`${e.term} — ${e.def}`);
  }
  return qs;
}

const BANKS = {
"ib-biology":[
 {lvl:"SL",t:"Cell Biology",term:"the cell theory",def:"the principle that all living things are made of cells, the basic unit of life"},
 {lvl:"SL",t:"Cell Biology",term:"the surface area-to-volume ratio",def:"the limit that controls cell size by affecting exchange of materials"},
 {lvl:"SL",t:"Cell Biology",term:"a prokaryote",def:"an organism whose cell lacks a membrane-bound nucleus"},
 {lvl:"SL",t:"Cell Biology",term:"a eukaryote",def:"an organism whose cells contain a membrane-bound nucleus and organelles"},
 {lvl:"SL",t:"Cell Biology",term:"the fluid mosaic model",def:"the description of the membrane as a fluid phospholipid bilayer with embedded proteins"},
 {lvl:"SL",t:"Cell Biology",term:"osmosis",def:"the passive movement of water across a membrane to lower water potential"},
 {lvl:"SL",t:"Cell Biology",term:"active transport",def:"the movement of substances against a gradient using ATP and protein pumps"},
 {lvl:"SL",t:"Cell Biology",term:"facilitated diffusion",def:"the passive transport of molecules through channel or carrier proteins"},
 {lvl:"SL",t:"Cell Biology",term:"mitosis",def:"the nuclear division producing two genetically identical diploid cells"},
 {lvl:"SL",t:"Cell Biology",term:"a cyclin",def:"a protein that controls progression through the cell cycle"},
 {lvl:"SL",t:"Molecular Biology",term:"a condensation reaction",def:"a reaction joining monomers and releasing a water molecule"},
 {lvl:"SL",t:"Molecular Biology",term:"a hydrolysis reaction",def:"a reaction splitting a molecule by adding water"},
 {lvl:"SL",t:"Molecular Biology",term:"an enzyme's active site",def:"the region where the substrate binds and catalysis occurs"},
 {lvl:"SL",t:"Molecular Biology",term:"denaturation",def:"the loss of an enzyme's shape and function due to heat or pH"},
 {lvl:"SL",t:"Molecular Biology",term:"anabolism",def:"metabolic reactions that build large molecules from small ones"},
 {lvl:"SL",t:"Molecular Biology",term:"catabolism",def:"metabolic reactions that break large molecules into smaller ones"},
 {lvl:"SL",t:"Molecular Biology",term:"a semiconservative replication",def:"DNA copying in which each new molecule has one old and one new strand"},
 {lvl:"SL",t:"Molecular Biology",term:"transcription",def:"the synthesis of mRNA from a DNA template"},
 {lvl:"SL",t:"Molecular Biology",term:"translation",def:"the assembly of a polypeptide from mRNA codons at the ribosome"},
 {lvl:"SL",t:"Genetics",term:"a gene",def:"a heritable factor consisting of a length of DNA influencing a trait"},
 {lvl:"SL",t:"Genetics",term:"an allele",def:"one of the different forms of a gene"},
 {lvl:"SL",t:"Genetics",term:"a genotype",def:"the alleles an organism possesses"},
 {lvl:"SL",t:"Genetics",term:"a phenotype",def:"the observable characteristics of an organism"},
 {lvl:"SL",t:"Genetics",term:"codominance",def:"inheritance where both alleles are fully expressed in the heterozygote"},
 {lvl:"SL",t:"Ecology",term:"a trophic level",def:"a feeding position in a food chain"},
 {lvl:"SL",t:"Ecology",term:"a keystone species",def:"a species with a disproportionately large effect on its ecosystem"},
 {lvl:"SL",t:"Ecology",term:"the greenhouse effect",def:"the warming of Earth by atmospheric gases absorbing infrared radiation"},
 {lvl:"SL",t:"Evolution",term:"natural selection",def:"the differential survival and reproduction of organisms with favorable traits"},
 {lvl:"SL",t:"Evolution",term:"a homologous structure",def:"a feature shared due to common ancestry"},
 {lvl:"HL",t:"Nucleic Acids (HL)",term:"a nucleosome",def:"DNA wound around a core of eight histone proteins"},
 {lvl:"HL",t:"Nucleic Acids (HL)",term:"an intron",def:"a non-coding sequence removed during RNA splicing"},
 {lvl:"HL",t:"Nucleic Acids (HL)",term:"an exon",def:"a coding sequence retained in mature mRNA"},
 {lvl:"HL",t:"Metabolism (HL)",term:"a competitive inhibitor",def:"a molecule that blocks an enzyme by binding the active site"},
 {lvl:"HL",t:"Metabolism (HL)",term:"glycolysis",def:"the cytoplasmic breakdown of glucose into two pyruvate molecules"},
 {lvl:"HL",t:"Metabolism (HL)",term:"the Krebs cycle",def:"the cyclic oxidation of acetyl-CoA producing CO₂, NADH and FADH₂"},
 {lvl:"HL",t:"Metabolism (HL)",term:"chemiosmosis",def:"ATP synthesis driven by a proton gradient across a membrane"},
 {lvl:"HL",t:"Plant Biology (HL)",term:"transpiration",def:"the loss of water vapor from a plant's leaves"},
 {lvl:"HL",t:"Genetics & Evolution (HL)",term:"a polygenic trait",def:"a characteristic controlled by two or more genes"},
 {lvl:"HL",t:"Genetics & Evolution (HL)",term:"the Hardy-Weinberg principle",def:"the model predicting constant allele frequencies in a non-evolving population"},
 {lvl:"HL",t:"Animal Physiology (HL)",term:"an antibody",def:"a protein produced by plasma cells that binds a specific antigen"},
 {lvl:"HL",t:"Animal Physiology (HL)",term:"a motor unit",def:"a motor neuron and all the muscle fibers it stimulates"},
],
"ib-chemistry":[
 {lvl:"SL",t:"Atomic Structure",term:"an isotope",def:"atoms of the same element with different numbers of neutrons"},
 {lvl:"SL",t:"Atomic Structure",term:"the mass number",def:"the total number of protons and neutrons in a nucleus"},
 {lvl:"SL",t:"Atomic Structure",term:"a mole",def:"the amount of substance containing 6.02×10²³ particles"},
 {lvl:"SL",t:"Atomic Structure",term:"the relative atomic mass",def:"the weighted average mass of an element's isotopes"},
 {lvl:"SL",t:"Periodicity",term:"the first ionization energy",def:"the energy to remove one mole of electrons from gaseous atoms"},
 {lvl:"SL",t:"Periodicity",term:"electronegativity",def:"the tendency of an atom to attract a bonding pair of electrons"},
 {lvl:"SL",t:"Periodicity",term:"atomic radius trend",def:"the decrease in size across a period and increase down a group"},
 {lvl:"SL",t:"Bonding",term:"an ionic bond",def:"the electrostatic attraction between oppositely charged ions"},
 {lvl:"SL",t:"Bonding",term:"a covalent bond",def:"a shared pair of electrons between two atoms"},
 {lvl:"SL",t:"Bonding",term:"a metallic bond",def:"the attraction between a lattice of cations and delocalized electrons"},
 {lvl:"SL",t:"Bonding",term:"a dipole",def:"a separation of charge from unequal electron sharing"},
 {lvl:"SL",t:"Bonding",term:"a hydrogen bond",def:"an intermolecular attraction between H and N, O, or F"},
 {lvl:"SL",t:"Bonding",term:"VSEPR theory",def:"the model predicting shape from electron-pair repulsion"},
 {lvl:"SL",t:"Energetics",term:"an exothermic reaction",def:"a reaction that releases heat to the surroundings"},
 {lvl:"SL",t:"Energetics",term:"an endothermic reaction",def:"a reaction that absorbs heat from the surroundings"},
 {lvl:"SL",t:"Energetics",term:"the enthalpy change",def:"the heat absorbed or released at constant pressure"},
 {lvl:"SL",t:"Kinetics",term:"the activation energy",def:"the minimum energy needed for a reaction to occur"},
 {lvl:"SL",t:"Kinetics",term:"a catalyst",def:"a substance that speeds a reaction by lowering activation energy"},
 {lvl:"SL",t:"Kinetics",term:"collision theory",def:"the idea that reactions need sufficiently energetic, correctly oriented collisions"},
 {lvl:"SL",t:"Equilibrium",term:"dynamic equilibrium",def:"a state where forward and reverse rates are equal"},
 {lvl:"SL",t:"Equilibrium",term:"Le Chatelier's principle",def:"a system at equilibrium shifts to oppose an applied change"},
 {lvl:"SL",t:"Acids & Bases",term:"a Brønsted-Lowry acid",def:"a proton (H⁺) donor"},
 {lvl:"SL",t:"Acids & Bases",term:"a Brønsted-Lowry base",def:"a proton (H⁺) acceptor"},
 {lvl:"SL",t:"Acids & Bases",term:"the pH scale",def:"the measure of hydrogen-ion concentration, pH = −log[H⁺]"},
 {lvl:"SL",t:"Redox",term:"oxidation",def:"the loss of electrons or increase in oxidation state"},
 {lvl:"SL",t:"Redox",term:"reduction",def:"the gain of electrons or decrease in oxidation state"},
 {lvl:"SL",t:"Organic",term:"a homologous series",def:"a family of compounds with the same general formula and functional group"},
 {lvl:"SL",t:"Organic",term:"an isomer",def:"a compound with the same molecular formula but different structure"},
 {lvl:"SL",t:"Organic",term:"a functional group",def:"the reactive atom or group defining a class of organic compounds"},
 {lvl:"HL",t:"Atomic Structure (HL)",term:"an emission spectrum",def:"the discrete lines produced when excited electrons fall to lower levels"},
 {lvl:"HL",t:"Bonding (HL)",term:"a sigma bond",def:"a covalent bond from head-on orbital overlap"},
 {lvl:"HL",t:"Bonding (HL)",term:"a pi bond",def:"a covalent bond from side-on overlap of p orbitals"},
 {lvl:"HL",t:"Bonding (HL)",term:"hybridization",def:"the mixing of atomic orbitals to form equivalent bonding orbitals"},
 {lvl:"HL",t:"Energetics (HL)",term:"lattice enthalpy",def:"the energy to separate one mole of an ionic solid into gaseous ions"},
 {lvl:"HL",t:"Energetics (HL)",term:"entropy",def:"a measure of the disorder or dispersal of energy in a system"},
 {lvl:"HL",t:"Energetics (HL)",term:"Gibbs free energy",def:"the quantity (ΔG = ΔH − TΔS) predicting reaction spontaneity"},
 {lvl:"HL",t:"Kinetics (HL)",term:"the rate-determining step",def:"the slowest step that controls the overall reaction rate"},
 {lvl:"HL",t:"Equilibrium (HL)",term:"the equilibrium constant Kc",def:"the ratio of product to reactant concentrations at equilibrium"},
 {lvl:"HL",t:"Acids & Bases (HL)",term:"a buffer solution",def:"a solution resisting pH change on adding small amounts of acid or base"},
 {lvl:"HL",t:"Redox (HL)",term:"a standard electrode potential",def:"the voltage of a half-cell measured against the standard hydrogen electrode"},
],
"ib-economics":[
 {lvl:"SL",t:"Introduction",term:"opportunity cost",def:"the value of the next best alternative forgone when a choice is made"},
 {lvl:"SL",t:"Introduction",term:"scarcity",def:"the basic economic problem of limited resources versus unlimited wants"},
 {lvl:"SL",t:"Introduction",term:"a free good",def:"a good with no opportunity cost because it is unlimited"},
 {lvl:"SL",t:"Microeconomics",term:"the law of demand",def:"the inverse relationship between price and quantity demanded"},
 {lvl:"SL",t:"Microeconomics",term:"the law of supply",def:"the direct relationship between price and quantity supplied"},
 {lvl:"SL",t:"Microeconomics",term:"price elasticity of demand",def:"the responsiveness of quantity demanded to a change in price"},
 {lvl:"SL",t:"Microeconomics",term:"a normal good",def:"a good whose demand rises as income rises"},
 {lvl:"SL",t:"Microeconomics",term:"an inferior good",def:"a good whose demand falls as income rises"},
 {lvl:"SL",t:"Microeconomics",term:"consumer surplus",def:"the gap between what consumers pay and the maximum they would pay"},
 {lvl:"SL",t:"Microeconomics",term:"a price ceiling",def:"a legal maximum price set below equilibrium"},
 {lvl:"SL",t:"Microeconomics",term:"a price floor",def:"a legal minimum price set above equilibrium"},
 {lvl:"SL",t:"Microeconomics",term:"a negative externality",def:"a cost imposed on third parties not reflected in the market price"},
 {lvl:"SL",t:"Microeconomics",term:"a public good",def:"a good that is non-excludable and non-rivalrous"},
 {lvl:"SL",t:"Macroeconomics",term:"gross domestic product",def:"the total market value of final goods and services produced in a country"},
 {lvl:"SL",t:"Macroeconomics",term:"inflation",def:"a sustained increase in the general price level"},
 {lvl:"SL",t:"Macroeconomics",term:"deflation",def:"a sustained decrease in the general price level"},
 {lvl:"SL",t:"Macroeconomics",term:"cyclical unemployment",def:"joblessness caused by a downturn in the business cycle"},
 {lvl:"SL",t:"Macroeconomics",term:"structural unemployment",def:"joblessness from a mismatch of skills and available jobs"},
 {lvl:"SL",t:"Macroeconomics",term:"fiscal policy",def:"the use of government spending and taxation to influence the economy"},
 {lvl:"SL",t:"Macroeconomics",term:"monetary policy",def:"the central bank's control of interest rates and money supply"},
 {lvl:"SL",t:"Macroeconomics",term:"aggregate demand",def:"the total spending on goods and services in an economy"},
 {lvl:"SL",t:"Global Economy",term:"a tariff",def:"a tax on imported goods"},
 {lvl:"SL",t:"Global Economy",term:"a quota",def:"a physical limit on the quantity of a good that may be imported"},
 {lvl:"SL",t:"Global Economy",term:"comparative advantage",def:"the ability to produce a good at a lower opportunity cost than others"},
 {lvl:"SL",t:"Global Economy",term:"an exchange rate",def:"the price of one currency in terms of another"},
 {lvl:"HL",t:"Microeconomics (HL)",term:"marginal utility",def:"the extra satisfaction from consuming one more unit of a good"},
 {lvl:"HL",t:"Microeconomics (HL)",term:"the law of diminishing marginal returns",def:"the fall in extra output as a variable input is added to fixed inputs"},
 {lvl:"HL",t:"Microeconomics (HL)",term:"a monopoly",def:"a market with a single seller and high barriers to entry"},
 {lvl:"HL",t:"Microeconomics (HL)",term:"perfect competition",def:"a market of many firms selling identical products with free entry"},
 {lvl:"HL",t:"Microeconomics (HL)",term:"allocative efficiency",def:"the output where price equals marginal cost, maximizing welfare"},
 {lvl:"HL",t:"Microeconomics (HL)",term:"price discrimination",def:"charging different prices to different consumers for the same good"},
 {lvl:"HL",t:"Macroeconomics (HL)",term:"the multiplier effect",def:"the amplified change in income from an initial change in spending"},
 {lvl:"HL",t:"Macroeconomics (HL)",term:"the Phillips curve",def:"the short-run inverse relationship between inflation and unemployment"},
 {lvl:"HL",t:"Macroeconomics (HL)",term:"crowding out",def:"the fall in private investment caused by government borrowing"},
 {lvl:"HL",t:"Global Economy (HL)",term:"the J-curve effect",def:"the initial worsening then improvement of the trade balance after devaluation"},
 {lvl:"HL",t:"Global Economy (HL)",term:"the Marshall-Lerner condition",def:"the rule that devaluation improves the trade balance if elasticities sum above one"},
],
"ib-physics":[
 {lvl:"SL",t:"Mechanics",term:"displacement",def:"the straight-line distance and direction from start to finish"},
 {lvl:"SL",t:"Mechanics",term:"velocity",def:"the rate of change of displacement with time"},
 {lvl:"SL",t:"Mechanics",term:"acceleration",def:"the rate of change of velocity with time"},
 {lvl:"SL",t:"Mechanics",term:"Newton's first law",def:"an object stays at rest or constant velocity unless acted on by a net force"},
 {lvl:"SL",t:"Mechanics",term:"Newton's second law",def:"net force equals mass times acceleration (F = ma)"},
 {lvl:"SL",t:"Mechanics",term:"momentum",def:"the product of an object's mass and velocity"},
 {lvl:"SL",t:"Mechanics",term:"the work-energy theorem",def:"the net work done on an object equals its change in kinetic energy"},
 {lvl:"SL",t:"Thermal Physics",term:"internal energy",def:"the total kinetic and potential energy of a substance's particles"},
 {lvl:"SL",t:"Thermal Physics",term:"specific heat capacity",def:"the energy to raise 1 kg of a substance by 1 K"},
 {lvl:"SL",t:"Thermal Physics",term:"latent heat",def:"the energy to change a substance's phase at constant temperature"},
 {lvl:"SL",t:"Waves",term:"the frequency of a wave",def:"the number of complete oscillations per second"},
 {lvl:"SL",t:"Waves",term:"the wavelength",def:"the distance between two adjacent points in phase on a wave"},
 {lvl:"SL",t:"Waves",term:"refraction",def:"the change in a wave's direction as it changes speed between media"},
 {lvl:"SL",t:"Waves",term:"a standing wave",def:"a wave pattern with fixed nodes formed by interference"},
 {lvl:"SL",t:"Electricity",term:"electric current",def:"the rate of flow of electric charge"},
 {lvl:"SL",t:"Electricity",term:"Ohm's law",def:"the rule that voltage equals current times resistance (V = IR)"},
 {lvl:"SL",t:"Electricity",term:"electrical power",def:"the rate of energy transfer, P = VI"},
 {lvl:"SL",t:"Circular Motion",term:"centripetal force",def:"the net inward force keeping an object in circular motion"},
 {lvl:"SL",t:"Fields",term:"gravitational field strength",def:"the force per unit mass at a point in a field"},
 {lvl:"SL",t:"Atomic & Nuclear",term:"an alpha particle",def:"a helium nucleus emitted in radioactive decay"},
 {lvl:"SL",t:"Atomic & Nuclear",term:"half-life",def:"the time for half the radioactive nuclei in a sample to decay"},
 {lvl:"SL",t:"Atomic & Nuclear",term:"binding energy",def:"the energy needed to separate a nucleus into its nucleons"},
 {lvl:"HL",t:"Wave Phenomena (HL)",term:"the Doppler effect",def:"the change in observed frequency due to relative motion of source and observer"},
 {lvl:"HL",t:"Wave Phenomena (HL)",term:"diffraction grating",def:"a device with many slits producing sharp interference maxima"},
 {lvl:"HL",t:"Fields (HL)",term:"gravitational potential",def:"the work per unit mass to bring a mass from infinity to a point"},
 {lvl:"HL",t:"Fields (HL)",term:"escape velocity",def:"the minimum speed to leave a gravitational field without further propulsion"},
 {lvl:"HL",t:"Electromagnetic Induction (HL)",term:"Faraday's law",def:"the induced emf equals the rate of change of magnetic flux linkage"},
 {lvl:"HL",t:"Electromagnetic Induction (HL)",term:"Lenz's law",def:"the induced current opposes the change in flux that produced it"},
 {lvl:"HL",t:"Quantum Physics (HL)",term:"the photoelectric effect",def:"the emission of electrons when light above a threshold frequency strikes a metal"},
 {lvl:"HL",t:"Quantum Physics (HL)",term:"a photon",def:"a quantum (discrete packet) of electromagnetic energy"},
 {lvl:"HL",t:"Quantum Physics (HL)",term:"the de Broglie wavelength",def:"the wavelength associated with a moving particle, λ = h/p"},
],
};

let all=0;
for (const [subject, entries] of Object.entries(BANKS)){
  const questions = buildSubject(entries);
  fs.writeFileSync(`${OUT}${subject}-ibgen${seed}.json`, JSON.stringify({subject, questions}, null, 1));
  const sl=questions.filter(q=>q.level==="SL").length, hl=questions.filter(q=>q.level==="HL").length;
  console.log(`${subject}-ibgen${seed}.json — ${questions.length} (SL ${sl}, HL ${hl})`);
  all+=questions.length;
}
console.log(`TOTAL concept questions: ${all}`);
