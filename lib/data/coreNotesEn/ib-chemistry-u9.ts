/**
 * Core Notes English version — IB Chemistry Unit 9 (Redox).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U9_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u9-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 9,
    lessonNum: 1,
    unitName: "Redox",
    title: "Definitions of Oxidation and Reduction and Oxidation States — Remember with OIL RIG, Never Slip with the Rules",
    subtitle: "Oxidation is loss of electrons (OIL), reduction is gain of electrons (RIG) — identifying the oxidising and reducing agents accurately from oxidation-state changes is half of every IB redox question",
    overview:
      "Oxidation-reduction (redox) reactions are among the most broadly applicable concepts in chemistry. At first, scientists understood oxidation simply as 'gaining oxygen' and reduction as 'losing oxygen.' The rusting of iron (4Fe + 3O₂ → 2Fe₂O₃) was the classic example. But once it was discovered that electron transfer also occurs in reactions with no oxygen at all — for instance Zn displacing Cu from aqueous CuSO₄ — the definitions were broadened: 'oxidation = loss of electrons', 'reduction = gain of electrons'. The most famous mnemonic for this is OIL RIG — Oxidation Is Loss, Reduction Is Gain. Meanwhile, in covalent compounds where electron transfer is hard to track directly, we assign a fictitious charge called the oxidation state (oxidation number) to judge oxidation and reduction. An increase in oxidation state means oxidation; a decrease means reduction. This lesson fully organises, at IB SL/HL level, the OIL RIG definitions, the seven rules for calculating oxidation states, the identification of oxidising agents and reducing agents, and predicting displacement reactions using the reactivity series.",
    objectives: [
      "Use OIL RIG to define oxidation as 'loss of electrons' and reduction as 'gain of electrons', and identify oxidation and reduction in a given half-equation",
      "Apply the seven rules for oxidation states to determine the oxidation state of each element in molecules and polyatomic ions, and judge from oxidation-state changes which element is oxidised and which is reduced",
      "Explain that an oxidising agent oxidises another substance while itself being reduced, and a reducing agent reduces another substance while itself being oxidised, and correctly identify the oxidising and reducing agents in an equation",
      "Use the reactivity series to predict whether a metal displacement reaction is possible, and explain the principle 'a more reactive metal displaces the ion of a less reactive metal' in terms of oxidation-state changes",
    ],
    formulas: [
      "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons)",
      "Oxidation: oxidation state increases",
      "Reduction: oxidation state decreases",
      "Oxidation state of an element in its standard state = 0; oxidation state of a monatomic ion = ionic charge; sum of oxidation states in a compound = 0; sum of oxidation states in a polyatomic ion = ionic charge",
    ],
    sections: [
      {
        title: "OIL RIG and the Oxidation-State Rules — Track Electron Transfer with Numbers",
        subtitle: "If there is no change in oxidation state, it is not a redox reaction — apply the seven rules in order and any compound can be solved",
        terms: [
          {
            term: "OIL RIG — Definitions of Oxidation and Reduction",
            def: "Oxidation: the process in which an atom, ion, or molecule loses electrons. The oxidation state increases. Reduction: the process in which an atom, ion, or molecule gains electrons. The oxidation state decreases. Mnemonic OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain of electrons. Example half-equations: Zn → Zn²⁺ + 2e⁻ (oxidation, loss of electrons, oxidation state 0 → +2, increases). Cu²⁺ + 2e⁻ → Cu (reduction, gain of electrons, oxidation state +2 → 0, decreases). Important: oxidation and reduction always occur together (simultaneous processes). When one species loses electrons, another must gain those electrons. A reaction in which electron transfer is coupled in this way is called a redox reaction.",
          },
          {
            term: "Rules for Oxidation States",
            def: "The rules for calculating oxidation states used in IB — applied in priority from top to bottom: ① The oxidation state of an element in its standard state (Na, O₂, Fe, etc.) = 0. ② The oxidation state of a monatomic ion = the ionic charge (Na⁺ = +1, Fe³⁺ = +3, Cl⁻ = −1). ③ In a compound the oxidation state of F is always −1. ④ In a compound the oxidation state of O is generally −2 (exceptions: −1 in peroxides such as H₂O₂, +2 in OF₂). ⑤ In a compound the oxidation state of H is generally +1 (exception: −1 in metal hydrides such as NaH). ⑥ The sum of oxidation states of all elements in a compound = 0. ⑦ The sum of oxidation states of all elements in a polyatomic ion = the overall charge of the ion. Example: oxidation state of Cr in Cr₂O₇²⁻ → 2x + 7(−2) = −2 → 2x = 12 → x = +6. Oxidation state of Mn in MnO₄⁻ → x + 4(−2) = −1 → x = +7.",
          },
          {
            term: "Oxidising Agent and Reducing Agent",
            def: "Oxidising agent: a substance that oxidises another substance. It itself gains electrons and is reduced — that is, its own oxidation state decreases. Common oxidising agents: O₂, Cl₂, MnO₄⁻ (permanganate ion), Cr₂O₇²⁻ (dichromate ion), H₂O₂, Fe³⁺. Reducing agent: a substance that reduces another substance. It itself loses electrons and is oxidised — that is, its own oxidation state increases. Common reducing agents: Zn, Fe, H₂, CO, I⁻, SO₂. Example: Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s). Zn: oxidation state 0 → +2 (oxidised, reducing agent). Cu²⁺: oxidation state +2 → 0 (reduced, oxidising agent). A way to remember: 'the oxidising agent is reduced.' If confused, write OIL RIG first and check the direction.",
          },
        ],
        traps: [
          "Do not confuse oxidation state with actual charge. Example: the oxidation state of C in CH₄ is −4, but this does not mean carbon exists as a real C⁴⁻ ion — the oxidation state is merely a 'fictitious' charge assigned based on electronegativity differences in covalent bonds. On IB Paper 1, confusing 'oxidation state = actual ionic charge' will always lead to errors in CH₄-related questions. Also note that the oxidation state of O is not 'always −2' — it is −1 in peroxides (H₂O₂) and +2 in F₂O.",
          "Confusing oxidising agent with oxidation loses marks on IB Paper 2 descriptive questions. An oxidising agent is reduced itself while oxidising the other species. Writing 'the oxidising agent is oxidised' is wrong. Always remember 'the oxidising agent is reduced, the reducing agent is oxidised.' Building the habit of checking the direction of the oxidation-state change (increase vs decrease) prevents mistakes.",
        ],
        example:
          "Example of determining oxidation states and identifying oxidising/reducing agents (IB Paper 2 type): In the reaction 2MnO₄⁻(aq) + 5H₂C₂O₄(aq) + 6H⁺(aq) → 2Mn²⁺(aq) + 10CO₂(g) + 8H₂O(l), identify the oxidising and reducing agents and state the oxidation-state change of each element. Solution: Mn in MnO₄⁻: x + 4(−2) = −1 → Mn = +7. In the product Mn²⁺, Mn = +2. So Mn: +7 → +2 (oxidation state decreases → reduced → MnO₄⁻ is the oxidising agent). C in H₂C₂O₄: 2x + 2(+1) + 4(−2) = 0 → 2x = 6 → C = +3. In the product CO₂, C = +4 (oxidation state increases → oxidised → H₂C₂O₄ is the reducing agent). Conclusion: oxidising agent = MnO₄⁻ (purple → almost colourless), reducing agent = H₂C₂O₄.",
      },
      {
        title: "The Reactivity Series and Metal Displacement Reactions — A Stronger Metal Pushes Out a Weaker Metal Ion",
        subtitle: "The more reactive the metal, the more readily it loses electrons — this is all that decides the direction of a displacement reaction",
        terms: [
          {
            term: "Reactivity Series",
            def: "The reactivity series (activity series) lists metals in order of their tendency to lose electrons (tendency to be oxidised). The essential order to memorise for IB (top → bottom = decreasing reactivity): K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H₂ > Cu > Ag > Au. The more reactive a metal: ① reacts with cold water (K, Na, Ca). ② reacts with hot water/steam (Mg). ③ reacts vigorously with acids (Mg, Al, Zn, Fe). ④ reacts slowly with acids (Ni, Sn, Pb). ⑤ does not react with dilute acids (Cu, Ag, Au). Predicting displacement reactions: 'a more reactive metal (A) can displace the ion of a less reactive metal (B²⁺) in aqueous solution or molten salt.' A + B²⁺ → A²⁺ + B. In this reaction A is the reducing agent and B²⁺ is the oxidising agent.",
          },
          {
            term: "Displacement Reactions as Redox",
            def: "A metal displacement reaction is a typical redox reaction. Example ①: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s). Fe (reactivity Fe > Cu): oxidation state of Fe 0 → +2 (oxidation, reducing agent). Cu²⁺: oxidation state +2 → 0 (reduction, oxidising agent). Example ②: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). Mg: 0 → +2 (oxidation). H⁺: +1 → 0 (reduction). Non-metal displacement is also possible: Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(aq). Cl₂ (the stronger oxidising agent) oxidises I⁻ to I₂. Reactivity (oxidising power) of halogens: F₂ > Cl₂ > Br₂ > I₂. Therefore Cl₂ displaces Br⁻ and I⁻, but I₂ cannot displace Cl⁻ or Br⁻.",
          },
        ],
        traps: [
          "Writing the direction of a displacement reaction backwards is the most common error on IB Paper 1. 'A less reactive metal displaces the ion of a more reactive metal' is impossible. Example: Cu + ZnSO₄(aq) → no reaction (reactivity of Cu < Zn). Always confirm the direction 'the more reactive species pushes out the less reactive ion.' The position of hydrogen (H₂) in the reactivity series also matters — only metals more reactive than H₂ react with acids to release H₂.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u9-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 9,
    lessonNum: 2,
    unitName: "Redox",
    title: "Balancing Half-equations and Electrochemical Cells — Turn Electron Transfer into a Circuit and You Get Electricity",
    subtitle: "How to balance half-equations under acidic and basic conditions, plus the structure, electrode labels, and EMF calculation of a voltaic cell — all at once",
    overview:
      "Separating a redox reaction into 'half-equations' makes the direction and quantity of electron transfer clear. Balancing half-equations is a regular feature of IB Paper 3 (HL), and even on SL, questions ask you to construct a full ionic equation from given half-equations. In particular, the process differs between adding H₂O and H⁺ in acidic solution and adding H₂O and OH⁻ in basic solution. This is exactly where many students slip up. Meanwhile, as Luigi Galvani and Alessandro Volta discovered in the late 18th century, connecting a spontaneous redox reaction in 'a circuit separated into an oxidation electrode (anode) and a reduction electrode (cathode)' yields an electric current — this is the voltaic cell (galvanic cell). This lesson fully organises, at IB SL/HL level, the five steps of balancing half-equations, the structure of a voltaic cell (electrodes, salt bridge, current direction), cell notation, standard electrode potential (E°) and EMF calculation, and judging spontaneity.",
    objectives: [
      "Apply the five steps of balancing half-equations (balance atoms → balance O (add H₂O) → balance H (add H⁺ or H₂O) → balance charge (add e⁻) → match e⁻ numbers and add the two half-equations) under both acidic and basic conditions",
      "In a voltaic/galvanic cell, correctly distinguish the electrode where oxidation occurs as the anode (negative electrode) and the electrode where reduction occurs as the cathode (positive electrode), and explain the direction of flow of electrons, ions, and current",
      "Read and write cell notation (anode | anode solution ‖ cathode solution | cathode), and construct cell notation from two given half-equations",
      "Use standard electrode potential (E°) data to calculate the standard EMF as E°cell = E°(cathode) − E°(anode), and judge that the reaction is spontaneous when E°cell > 0",
    ],
    formulas: [
      "E°cell = E°(reduction electrode, cathode) − E°(oxidation electrode, anode)",
      "E°cell > 0 → spontaneous reaction",
      "Cell notation: anode | anode solution ‖ cathode solution | cathode",
      "Balancing half-equations: atoms → O (H₂O) → H (H⁺/OH⁻) → charge (e⁻) → match e⁻ numbers and add",
    ],
    sections: [
      {
        title: "Balancing Half-equations — A Five-Step Process",
        subtitle: "If you are unsure where to use H₂O and H⁺ (acidic) or OH⁻ (basic), balance for acidic first and then add OH⁻ to both sides if it is basic",
        terms: [
          {
            term: "Half-equation Balancing in Acidic Solution",
            def: "The five steps for balancing half-equations in acidic solution: ① Balance the number of atoms of the participating elements (excluding O and H). ② O atoms: add H₂O to the side that is short. ③ H atoms: add H⁺ to the side that is short (acidic conditions). ④ Total charge: add e⁻ to make up the charge difference. (In an oxidation half-equation add e⁻ on the right; in a reduction half-equation add e⁻ on the left.) ⑤ Scale the two half-equations so that the e⁻ numbers are equal and add them. Example: MnO₄⁻(aq) → Mn²⁺(aq) (acidic). ① Balance Mn: already balanced. ② O: add 4 H₂O on the right → MnO₄⁻ → Mn²⁺ + 4H₂O. ③ H: add 8 H⁺ on the left → 8H⁺ + MnO₄⁻ → Mn²⁺ + 4H₂O. ④ Charge: left (+8−1)=+7, right +2 → add 5e⁻ on the left → 5e⁻ + 8H⁺ + MnO₄⁻ → Mn²⁺ + 4H₂O. Complete.",
          },
          {
            term: "Half-equation Balancing in Basic Solution",
            def: "In basic solution, the safest method is to balance as for acidic conditions and then add OH⁻ to both sides at the end to neutralise the H⁺. Steps: ① Carry out steps 1–4 exactly as for acidic conditions (using H⁺). ② Add as many OH⁻ to both sides as there are H⁺: replace via H⁺ + OH⁻ → H₂O. ③ Cancel H₂O so that the final half-equation is expressed only with OH⁻ and H₂O. Example: MnO₄⁻ → MnO₂ (basic). Balance for acidic first: 3e⁻ + 4H⁺ + MnO₄⁻ → MnO₂ + 2H₂O. Add 4OH⁻ to both sides: 3e⁻ + 4H₂O + MnO₄⁻ → MnO₂ + 2H₂O + 4OH⁻. Cancel H₂O: 3e⁻ + 2H₂O + MnO₄⁻ → MnO₂ + 4OH⁻. Complete. Half-equations in basic solution appear often on IB HL Paper 3.",
          },
          {
            term: "Combining Half-equations into a Full Ionic Equation",
            def: "How to combine two half-equations into a full ionic equation: ① Adjust the multipliers of the oxidation half-equation (releasing e⁻ on the right) and the reduction half-equation (consuming e⁻ on the left) so the e⁻ numbers are equal. ② Add the two half-equations. ③ Cancel any common terms on both sides (e⁻, H₂O, H⁺, etc.). Example: Zn → Zn²⁺ + 2e⁻ (oxidation) + Cu²⁺ + 2e⁻ → Cu (reduction) → Zn + Cu²⁺ → Zn²⁺ + Cu. The e⁻ cancel to give a clean ionic equation. On IB Paper 2, leaving e⁻ in the final equation in a 'write the ionic equation' question loses marks.",
          },
        ],
        traps: [
          "Using OH⁻ instead of H⁺ (or vice versa) for the balancing conditions gives a wrong half-equation. If the question states 'in acidic solution', use only H⁺ and H₂O; if it states 'in basic/alkaline solution', no H⁺ may remain in the final equation. On IB Paper 3 HL, ignoring the conditions and applying only the acidic method can lose even partial marks.",
          "When combining half-equations, simply adding them without matching the e⁻ numbers breaks the charge balance. If the oxidation half-equation has 2e⁻ and the reduction has 6e⁻, scale the oxidation by 3 and the reduction by 1 (i.e., to LCM = 6), or in any case make the e⁻ numbers equal before adding. Always check that the charges on both sides of the final ionic equation are equal.",
        ],
        example:
          "Example of balancing and combining half-equations (IB HL Paper 3 type): Write the full ionic equation for the reaction of Cr₂O₇²⁻(aq) and Fe²⁺(aq) in acidic solution. Solution: [reduction] Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (Cr: +6→+3, 3e⁻ per Cr, 6e⁻ total). [oxidation] Fe²⁺ → Fe³⁺ + e⁻ (Fe: +2→+3). Match e⁻ numbers: oxidation half-equation × 6 → 6Fe²⁺ → 6Fe³⁺ + 6e⁻. Combine: Cr₂O₇²⁻ + 14H⁺ + 6Fe²⁺ → 2Cr³⁺ + 7H₂O + 6Fe³⁺. Check after cancelling e⁻: left charge (−2 + 14 + 12) = +24, right charge (6 + 18) = +24 — balanced.",
      },
      {
        title: "Voltaic Cells — Devices That Turn a Spontaneous Redox Reaction into Electricity",
        subtitle: "Oxidation at the anode, reduction at the cathode — electrons through the external circuit, ions through the salt bridge — you must be able to draw both flows at once",
        terms: [
          {
            term: "Structure of a Voltaic/Galvanic Cell",
            def: "Voltaic cell / galvanic cell: a device that converts the chemical energy of a spontaneous redox reaction into electrical energy. Components: ① Two half-cells: a metal electrode immersed in a solution of its own ions. Example: Zn electrode / ZnSO₄(aq), Cu electrode / CuSO₄(aq). ② External circuit: electrons (e⁻) flow from anode → cathode. ③ Salt bridge: a tube connecting the two half-cell solutions (saturated KNO₃ or KCl + agar). Role: it moves ions to maintain electrical neutrality. Without the salt bridge the cell cannot work. Electrode names: anode (oxidation electrode): oxidation occurs → releases electrons, electrode mass decreases, ion concentration increases. cathode (reduction electrode): reduction occurs → consumes electrons, electrode mass increases, ion concentration decreases. Zn-Cu cell example: Zn(s) | ZnSO₄(aq) ‖ CuSO₄(aq) | Cu(s).",
          },
          {
            term: "Standard Electrode Potential E° and EMF",
            def: "Standard electrode potential (E°): the reduction tendency of each half-cell measured against the standard hydrogen electrode (SHE, E° = 0.00 V). Conditions: 25°C, 1 mol dm⁻³ ion concentration, 1 atm (gases). The larger the E°, the more readily reduction occurs (the stronger the oxidising agent). The smaller the E° (or the more negative), the more readily oxidation occurs (the stronger the reducing agent). Example: Cu²⁺ + 2e⁻ → Cu, E° = +0.34 V. Zn²⁺ + 2e⁻ → Zn, E° = −0.76 V. Cell EMF calculation: E°cell = E°(cathode) − E°(anode) = (+0.34) − (−0.76) = +1.10 V. E°cell > 0 → spontaneous. E°cell < 0 → non-spontaneous. Because an E° table is provided in the IB exam, applying the correct formula matters more than memorisation.",
          },
        ],
        traps: [
          "In a voltaic cell the anode is the negative electrode and the cathode is the positive electrode. But in an electrolytic cell this is reversed: anode = positive (+), cathode = negative (−). On IB Paper 2, swapping the polarity in a 'voltaic vs electrolytic cell' question loses marks immediately. Memory aid: the electrode names (anode = oxidation, cathode = reduction) are the same for both cell types, but the polarity (+/−) is reversed depending on the cell type.",
          "In E°cell calculations, changing the multiplier of a half-equation does not change the E° value. Because E° is an intensive property, doubling the coefficients of a half-equation leaves E° unchanged. Example: Zn²⁺ + 2e⁻ → Zn has E° = −0.76 V, but written as 2Zn²⁺ + 4e⁻ → 2Zn the E° is still −0.76 V. In ΔG = −nFE°, n changes so ΔG differs, but E° itself does not change.",
        ],
        example:
          "Example of voltaic cell EMF calculation and spontaneity judgement (IB Paper 2 type): When a voltaic cell is constructed from Fe²⁺/Fe and Ag⁺/Ag half-cells, calculate E°cell and state which electrode is the anode. (E°: Fe²⁺ + 2e⁻ → Fe = −0.44 V; Ag⁺ + e⁻ → Ag = +0.80 V). Solution: the side with the lower E° (Fe²⁺/Fe, −0.44 V) is oxidised → anode. The side with the higher E° (Ag⁺/Ag, +0.80 V) is reduced → cathode. E°cell = E°(cathode) − E°(anode) = 0.80 − (−0.44) = +1.24 V. E°cell > 0 → spontaneous. Cell notation: Fe(s) | Fe²⁺(aq) ‖ Ag⁺(aq) | Ag(s).",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u9-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 9,
    lessonNum: 3,
    unitName: "Redox",
    title: "Electrolytic Cells — Force Non-spontaneous Redox with Electricity, and Finish with Electroplating",
    subtitle: "Oxidation at the anode and reduction at the cathode in an electrolytic cell — never slip on the IB exam over why the electrode products differ between molten electrolytes and aqueous solutions",
    overview:
      "Right after Alessandro Volta invented the battery in 1800, Britain's Humphry Davy used that electricity to isolate Na and K for the first time — elements that could not then be purely separated. This was the first great achievement of electrolysis. An electrolytic cell works on the opposite principle to a voltaic cell — an external power source forcibly drives a non-spontaneous redox reaction. The electrode connected to the negative terminal (−) of the source becomes the cathode (reduction electrode), and the electrode connected to the positive terminal (+) becomes the anode (oxidation electrode). The key question for an electrolytic cell is 'which ion is discharged first?' In a molten electrolyte it is simple — there are only two kinds of ion. But in aqueous solution, H₂O can also decompose, so you must apply the preferential discharge rules. Electroplating is one of the most important applications of electrolytic cells, and on IB Paper 2 descriptive questions you must be able to describe the plating set-up, the electrode materials, and the choice of electrolyte. This lesson fully organises, at IB SL/HL level, the principle of electrolytic cells, the electrode products for molten and aqueous electrolysis, the preferential discharge rules, electroplating design, and the quantitative calculations of Faraday's laws.",
    objectives: [
      "Explain the relationship between the polarity of the external power source and the electrode names in an electrolytic cell (anode = oxidation electrode = + electrode, cathode = reduction electrode = − electrode), and describe the difference in anode/cathode polarity from a voltaic cell",
      "Predict the products formed at each electrode for molten electrolytes (molten NaCl, molten Al₂O₃) and aqueous electrolytes (aqueous NaCl, aqueous CuSO₄), and apply the preferential discharge rules (comparison of E°, effect of concentration) in aqueous solution",
      "Explain why, in designing an electroplating experiment, the object to be plated is connected to the cathode, the plating metal (e.g., Cu) to the anode, and an electrolyte containing the plating-metal ions is used",
      "Use Faraday's laws (Q = It, n(e⁻) = Q/F) to calculate the number of moles and the mass of substance deposited at an electrode from a given current and time",
    ],
    formulas: [
      "Q = I × t  (charge (C) = current (A) × time (s))",
      "n(e⁻) = Q / F  (F = Faraday constant = 96 500 C mol⁻¹)",
      "n(deposited substance) = n(e⁻) / z  (z = number of electrons in the half-equation)",
      "m = n × M  (mass = moles × molar mass)",
    ],
    sections: [
      {
        title: "The Principle of Electrolytic Cells and Predicting Electrode Products",
        subtitle: "Molten electrolytes are simple — the most complex part of electrolysis is that H₂O also competes in aqueous solution",
        terms: [
          {
            term: "Electrolytic Cell vs Voltaic Cell",
            def: "Electrolytic cell: a device that connects an external power source (a battery, etc.) to forcibly drive a non-spontaneous redox reaction. Positive terminal (+) of the source → connected to the anode (oxidation electrode). Negative terminal (−) of the source → connected to the cathode (reduction electrode). Key difference from a voltaic cell: in a voltaic cell the anode is the negative (−) electrode and the cathode is the positive (+) electrode. In an electrolytic cell the anode is the positive (+) electrode and the cathode is the negative (−) electrode. That is, the polarity is exactly reversed — but the definitions anode = oxidation and cathode = reduction are the same for both cell types. The electrolysis process: in the ionic solution, cations migrate toward the cathode and are reduced, while anions migrate toward the anode and are oxidised.",
          },
          {
            term: "Electrolysis of Molten Electrolytes",
            def: "A molten electrolyte contains only the cations and anions of the electrolyte (no H₂O). Predicting the electrode products is therefore simple. Example ①: electrolysis of NaCl(l). Cathode: Na⁺ + e⁻ → Na(l) (sodium metal deposited). Anode: 2Cl⁻ → Cl₂(g) + 2e⁻ (chlorine gas evolved). Example ②: electrolysis of Al₂O₃(l) (Hall-Héroult process). Cathode: Al³⁺ + 3e⁻ → Al(l). Anode: 2O²⁻ → O₂(g) + 4e⁻. Important context: melting Al₂O₃ directly requires 2054°C, so cryolite (Na₃AlF₆) is mixed in to lower the melting point to about 1000°C. This is the core of the aluminium smelting process. The environmental and economic significance of this process is also examined in IB.",
          },
          {
            term: "Electrolysis of Aqueous Solutions — Preferential Discharge",
            def: "In aqueous solution, besides the electrolyte ions, the H⁺ and OH⁻ derived from H₂O can also be discharged competitively. Preferential discharge rules: Cathode (reduction): the ion with the larger (more positive) E° is reduced preferentially. However, if the ion concentration is low, H⁺/H₂O is preferred. Anode (oxidation): generally halide ions (Cl⁻, Br⁻, I⁻) are oxidised before OH⁻/H₂O. However, if the halide ion concentration is low (or the solution is dilute), O₂ is evolved. Example ①: concentrated aqueous NaCl (brine): Cathode: 2H₂O + 2e⁻ → H₂(g) + 2OH⁻ (H₂O preferred over Na⁺, by E° comparison). Anode: 2Cl⁻ → Cl₂(g) + 2e⁻ (concentrated Cl⁻ preferred over OH⁻/H₂O). Example ②: CuSO₄(aq) (inert electrodes): Cathode: Cu²⁺ + 2e⁻ → Cu(s) (E° +0.34 V > H⁺/H₂ 0.00 V). Anode: 2H₂O → O₂(g) + 4H⁺ + 4e⁻ (SO₄²⁻ is hard to oxidise).",
          },
        ],
        traps: [
          "Confusing the reversed polarity (+/−) of the anode and cathode between voltaic and electrolytic cells is the most common error on IB Paper 2. Voltaic cell: anode = − (negative, because it supplies electrons). Electrolytic cell: anode = + (connected to the positive terminal of the external source). If you have memorised 'the anode is always negative', correct it right now — that rule holds only for voltaic cells. On IB Paper 2, omitting the + label on the anode when drawing an electrolytic cell diagram loses marks.",
          "In aqueous electrolysis, the result differs depending on whether the anode is an active electrode or an inert electrode. In electrolysis of CuSO₄(aq), if the anode is Cu metal, Cu dissolves to form Cu²⁺ (Cu → Cu²⁺ + 2e⁻); if the anode is graphite or platinum (Pt), H₂O is oxidised and O₂ is evolved. On IB Paper 2, answering without specifying the 'electrode material' causes partial mark loss, so always check whether the electrode is active or inert.",
        ],
        example:
          "Example of electrode products in aqueous electrolysis (IB Paper 2 type): When 0.5 mol dm⁻³ CuSO₄(aq) is electrolysed with graphite electrodes, state the products formed at each electrode and give the half-equations. Solution: Cathode (reduction): E° of Cu²⁺ = +0.34 V, E° of H⁺/H₂ = 0.00 V → Cu²⁺ is more easily reduced → Cu²⁺ + 2e⁻ → Cu(s) (copper deposited). Anode (oxidation): SO₄²⁻ is very stable and hard to oxidise, and graphite is an inert electrode → H₂O is oxidised → 2H₂O → O₂(g) + 4H⁺(aq) + 4e⁻ (oxygen gas evolved). Observation: over time, reddish-brown Cu is deposited on the cathode and the blue colour of the solution (Cu²⁺) gradually fades.",
      },
      {
        title: "Electroplating and Faraday's Laws — Finish with Quantitative Calculations",
        subtitle: "Mass plated = current × time / Faraday constant / number of electrons — just check unit consistency and the IB calculation question is sure to be correct",
        terms: [
          {
            term: "Electroplating Design",
            def: "Electroplating: a technique that uses an electrolytic cell to coat an object's surface with a thin film of metal. Design principles: ① the object to be plated → connected to the cathode (reduction electrode). ② the plating metal (e.g., Cu, Ag, Ni) → connected to the anode (oxidation electrode) (active electrode). ③ use an electrolyte containing the plating-metal ions (e.g., CuSO₄(aq) for Cu plating). ④ because the plating metal at the anode dissolves and replenishes the ions, the electrolyte concentration is maintained. Half-equations (Cu plating example): Cathode: Cu²⁺ + 2e⁻ → Cu(s) (Cu deposited on the object). Anode: Cu(s) → Cu²⁺(aq) + 2e⁻ (the anode Cu electrode dissolves to replenish the ions). Applications: car parts (Ni/Cr plating), jewellery (Au/Ag plating), tableware (Ag plating). On IB Paper 2, questions asking you to describe an electroplating experiment design with a diagram appear often.",
          },
          {
            term: "Faraday's Laws and Quantitative Calculations",
            def: "Faraday constant (F) = 96 500 C mol⁻¹ (or 9.65 × 10⁴ C mol⁻¹) — the charge of 1 mol of electrons. Calculation steps: ① charge Q = I(A) × t(s). ② moles of electrons transferred: n(e⁻) = Q / F = It / F. ③ using the electron coefficient z from the half-equation: n(deposited substance) = n(e⁻) / z. ④ mass: m = n × M. Example: the mass of Cu deposited in electrolysis of CuSO₄(aq) when a current of 0.500 A is passed for 1930 s. Q = 0.500 × 1930 = 965 C. n(e⁻) = 965 / 96500 = 0.01000 mol. For Cu²⁺ + 2e⁻ → Cu, z = 2: n(Cu) = 0.01000 / 2 = 0.00500 mol. m(Cu) = 0.00500 × 63.55 = 0.318 g.",
          },
        ],
        traps: [
          "In Faraday's law calculations, the most common unit error is entering the time in minutes (min) or hours (h). In Q = I × t, t must be in seconds (s). Example: '30 minutes' must be converted to 1800 s. On IB Paper 2 calculation questions, although you may still receive process marks (ECF, error carried forward) if a unit conversion is omitted and the final answer is wrong, you lose 1 mark for the unit-conversion error itself.",
          "In electroplating, if the anode is an inert electrode, the plating-metal ions are depleted, the electrolyte concentration decreases, and the plating quality deteriorates. In IB, the answer to 'why use an active anode?' is 'to keep the ion concentration constant.' Also, in an electroplating design, connecting the object to be plated to the anode and the plating metal to the cathode causes the reverse reaction instead of plating — always confirm that the object to be plated = the cathode (reduction electrode).",
        ],
        example:
          "Example of electroplating + Faraday calculation (IB Paper 2 type): A silver (Ag) spoon is to be electroplated with gold (Au). ① Describe how to set up the cell, and ② find the mass of Au deposited when a current of 2.00 A is passed for 2.00 hours. (Atomic mass of Au = 197.0 g mol⁻¹; half-equation: Au³⁺ + 3e⁻ → Au). Solution: ① Set-up: connect the silver spoon as the cathode (to the negative terminal of the source), a gold electrode as the anode (to the positive terminal of the source), and use HAuCl₄ solution (or an electrolyte containing gold ions) as the electrolyte. ② Calculation: t = 2.00 h = 7200 s. Q = 2.00 A × 7200 s = 14 400 C. n(e⁻) = 14400 / 96500 = 0.1492 mol. Au³⁺ + 3e⁻ → Au (z = 3): n(Au) = 0.1492 / 3 = 0.04973 mol. m(Au) = 0.04973 × 197.0 = 9.80 g.",
      },
    ],
  },
];
