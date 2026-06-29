/**
 * Core Notes English version — IB Chemistry Unit 11 (Measurement & Analysis).
 * Based on actual IB DP Chemistry SL/HL content, written in clear exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U11_EN: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u11-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 11,
    lessonNum: 1,
    unitName: "Measurement & Analysis",
    title: "Uncertainty and Error — The Skill of Handling Experimental Data Honestly",
    subtitle: "Random error can be reduced and systematic error has a fixed direction — the moment you distinguish the two, your IB IA changes",
    overview:
      "When you measure a physical quantity, an 'exactly correct value' does not exist. Every measurement necessarily carries an uncertainty. Yet many students confuse 'error' with 'mistake' — a mistake is faulty technique or a calculation slip, whereas an error is a limitation inherent in the act of measuring itself. In IB Chemistry, error is divided into two types. Random error scatters in a different direction each time you measure, and it can be reduced by averaging replicate measurements. Systematic error biases measurements in the same direction and by the same magnitude every time — a balance with an incorrect zero or an uncalibrated thermometer are classic examples. No matter how many times you repeat the measurement, systematic error is not reduced. Meanwhile, precision describes how closely repeated measurements cluster together, while accuracy describes how close a measurement is to the true value. In this lesson, alongside these concepts, we organise absolute uncertainty, percentage uncertainty, and the propagation of uncertainty through arithmetic operations to full IB exam standard. Wielding this language precisely throughout an experiment is the key to your IA marks.",
    objectives: [
      "Define the difference between random error and systematic error, and explain the cause, directionality, and method of reduction for each type",
      "Explain the difference between precision and accuracy, and judge which type of error is dominant in a given data set",
      "Calculate absolute uncertainty and percentage uncertainty, and apply the propagation rules — add absolute uncertainties for addition/subtraction, and add percentage uncertainties for multiplication/division",
      "Apply significant figure rules correctly to instrument scales, calculated results, and final answers, and explain the relationship between uncertainty and significant figures",
      "Propose experimental design methods to reduce systematic error (calibration, control experiments) and replicate-measurement strategies to reduce random error",
    ],
    formulas: [
      "Absolute uncertainty: ± (smallest scale division or ½ × smallest division)",
      "% uncertainty = (absolute uncertainty / measured value) × 100",
      "Addition/subtraction: add absolute uncertainties (Δ(A±B) = ΔA + ΔB)",
      "Multiplication/division: add % uncertainties (%(A×B) = %A + %B)",
      "Uncertainty of a mean: ± ½ × (maximum − minimum)",
    ],
    sections: [
      {
        title: "Random Error vs Systematic Error — The Two Faces of Error",
        subtitle: "Random error is reduced by repeating measurements; systematic error remains even when repeated — you must identify the cause to solve it",
        terms: [
          {
            term: "Random Error",
            def: "Random error is error whose magnitude and direction change unpredictably each time you measure. Causes: variation in the observer's eye position (parallax), tiny fluctuations in environmental factors such as temperature, pressure, and vibration, and the minute sensitivity limits of the instrument itself. Characteristic: averaging replicate measurements lets positive (+) and negative (−) errors cancel one another, reducing the influence of random error. The more data you gather, the closer the mean approaches the true value. When random error is large, the data are said to have low precision — repeated measurements spread out widely. In an IB IA, when you mention random error in answer to 'state the sources of error,' always add that 'the effect was reduced by taking replicate measurements.'",
          },
          {
            term: "Systematic Error",
            def: "Systematic error biases all measurements consistently in the same direction (always too high or always too low). Causes: a balance with an incorrect zero (zero error), an uncalibrated thermometer, heat loss to the surroundings during calorimetry, and reagent residue clinging to a graduated cylinder. Characteristic: no matter how many times you repeat the measurement, the mean does not approach the true value — because the error always points the same way. When systematic error is large, accuracy is said to be low. Methods of reduction: calibration of instruments, control experiments, blind measurement, replacing the instrument. In IB Paper 3 and the IA, 'what is the source of systematic error in this experiment, and how can it be reduced?' is a core assessment item.",
          },
          {
            term: "Precision vs Accuracy",
            def: "Precision: the degree to which repeated measurements cluster close to one another. High precision means small random error — replicate values group tightly together. Accuracy: the degree to which a measurement (or mean) is close to the true/accepted value. High accuracy means small systematic error. The target analogy: 'precise but inaccurate' = a tight grouping that is off-centre (large systematic error). 'Accurate but imprecise' = a widely scattered grouping distributed around the centre (large random error). 'Precise and accurate' = a tight grouping at the centre (ideal). Swapping precision and accuracy in an IB answer loses marks immediately.",
          },
        ],
        traps: [
          "'Error' and 'mistake' are different. An error is an unavoidable limitation inherent in the act of measuring, whereas a mistake is faulty technique, a misreading, or a calculation slip. In an IB IA, 'I read the balance wrongly' is a mistake, not an error. Describing a mistake as an error loses marks.",
          "Writing only 'I used a more precise instrument' to reduce random error is insufficient. A precise instrument reduces the absolute uncertainty, but the key method of reducing random error is replicate measurement. Describe the two methods distinctly.",
        ],
        example:
          "Distinguishing systematic vs random error (IB Paper 3 type): A student measured the enthalpy of combustion of Mg ribbon and obtained −541 kJ mol⁻¹, while the literature value is −601 kJ mol⁻¹. State the type of error and a possible cause. Solution: The measured value is consistently smaller in absolute magnitude than the literature value, so systematic error is suspected. Possible cause: heat leaked out around the calorimeter, so the temperature rise of the water was measured as smaller than it actually was (heat loss to the surroundings). Method of reduction: insulate the calorimeter with lagging and close the lid to minimise heat loss by convection of gases. No matter how many times the measurement is repeated, this systematic error is not removed.",
      },
      {
        title: "Calculating and Propagating Uncertainty — Whenever You Handle a Number, Handle the Error Too",
        subtitle: "Add absolute uncertainties when adding and subtracting, add % uncertainties when multiplying and dividing — this one rule solves 90% of IB uncertainty problems",
        terms: [
          {
            term: "Absolute and Percentage Uncertainty",
            def: "Absolute uncertainty (Δ): the range attached to a measured value in ± form. For an analogue (scaled) instrument, use ½ of the least count as the basic uncertainty; for a digital instrument, use ±1 in the last digit. Example: a burette with 0.05 cm³ graduations → ± 0.05 cm³ (±0.05 if you read the end value once, ±0.10 if you read both the initial and final values). Percentage uncertainty (% uncertainty): % uncertainty = (absolute uncertainty / measured value) × 100. Example: 25.0 cm³ measured to ±0.10 cm³ → % uncertainty = (0.10/25.0) × 100 = 0.40%. The smaller the measured value, the larger the % uncertainty for the same absolute uncertainty — using a small volume increases the % error.",
          },
          {
            term: "Propagation of Uncertainty",
            def: "For addition and subtraction, add the absolute uncertainties: Δ(A + B) = Δ(A − B) = ΔA + ΔB. Example: burette initial value 0.10 ± 0.05 cm³, final value 25.10 ± 0.05 cm³ → titre = 25.00 ± 0.10 cm³ (absolute uncertainty 0.05 + 0.05 = 0.10). For multiplication and division, add the percentage uncertainties: %(A × B) = %(A ÷ B) = %A + %B. Example: c = n/V, n = 0.00250 ± 1.0% mol, V = 25.0 ± 0.40% cm³ → %(c) = 1.0 + 0.40 = 1.4%. Final absolute uncertainty: after calculating c, work back to absolute uncertainty = (c) × (% uncertainty / 100). For exponent operations (powers, roots): multiply the % uncertainty by the exponent — e.g., the % uncertainty of A² = 2 × %A.",
          },
          {
            term: "Significant Figures",
            def: "Significant figures (sf) are the digits that express the precision of a measurement. Rules: non-zero digits are always significant / zeros between two significant figures are significant / trailing zeros to the right of the decimal point are significant (e.g., 1.200 → 4 sf) / trailing zeros with no decimal point are ambiguous (e.g., 1200 could be 2, 3, or 4 sf → write as 1.2 × 10³ to make it clear). Application in calculations: multiplication/division → match the value with the fewest sf / addition/subtraction → match the value with the fewest decimal places. The uncertainty and sf of the final answer must agree — if the uncertainty is ±0.1, the final answer is shown only to the first decimal place. In IB, an incorrectly shown sf is penalised in the mark scheme as a 'penalty for incorrect sf.'",
          },
        ],
        traps: [
          "If reading a burette once has an uncertainty of ±0.05 cm³, then finding the titre (final − initial) requires two readings, so the uncertainty becomes ±0.10 cm³. Many students memorise 'burette uncertainty = ±0.05 cm³' and carry it straight over to the titre. When finding a difference, the addition rule applies and the two uncertainties must be added.",
          "Do not confuse percentage uncertainty with percentage error. Percentage uncertainty (% uncertainty) is the experimental range arising from instrument limitations, whereas percentage error (% error) = |experimental value − literature value| / literature value × 100 expresses the accuracy of the result. In an IB IA you must describe these two distinctly.",
        ],
        example:
          "Uncertainty propagation calculation (IB Paper 3 type): A student measured the enthalpy of neutralisation of HCl(aq) with NaOH(aq). Temperature change: ΔT = 6.5 ± 0.2 °C, mass of solution: m = 50.0 ± 0.1 g, specific heat: c = 4.18 J g⁻¹ °C⁻¹ (treated as a constant). q = m × c × ΔT = 50.0 × 4.18 × 6.5 = 1358.5 J. % uncertainty(m) = 0.1/50.0 × 100 = 0.20%. % uncertainty(ΔT) = 0.2/6.5 × 100 = 3.08%. Total % uncertainty(q) = 0.20 + 3.08 = 3.28%. Absolute uncertainty(q) = 1358.5 × 0.0328 ≈ ±45 J. Final q = 1360 ± 50 J (rounded to fit sf). Conclusion: the uncertainty in ΔT is dominant, so to improve the experiment it is effective to use a more precise thermometer or a larger temperature change (more reagent).",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u11-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 11,
    lessonNum: 2,
    unitName: "Measurement & Analysis",
    title: "Graphing Techniques — Turning Data into a Straight Line and Reading Gradient and Intercept",
    subtitle: "A best-fit line expresses the 'trend' of the points; it need not pass through every point — read the physical meaning of gradient and intercept to score full marks in IB",
    overview:
      "After collecting data in an experiment, you must visualise it on a graph to reveal the relationship between variables. In IB Chemistry, drawing a graph is not just plotting points — it is a comprehensive data-analysis skill that includes axis titles, units, scale intervals, the best-fit line, the gradient, and the physical meaning of the intercept. In particular, 'transforming data so that it becomes a straight line (linearisation)' is a core skill in IB HL and the IA. For example, the Arrhenius equation relating the rate constant k to temperature T (ln k vs 1/T) is a representative case of transforming an exponential relationship into a straight line. The difference between extrapolation and interpolation, and the difference in their reliability, also appears repeatedly on IB exams. In this lesson we organise every type of graph analysis that frequently appears in IB Paper 1, 2, and 3, and master how to extract chemical meaning from the gradient and intercept.",
    objectives: [
      "Draw a best-fit line correctly — covering the full range of the data and minimising the sum of the residuals of the points — and calculate the gradient and intercept from the best-fit line",
      "Interpret the chemical meaning of the gradient and y-intercept in a given context (e.g., gradient = −Ea/R in a ln k vs 1/T graph)",
      "Explain the difference between interpolation and extrapolation, and distinguish why extrapolation is less reliable than interpolation and the situations in which it is appropriate",
      "Apply variable transformations (e.g., ln, reciprocal, square) to linearise non-linear data, and derive the original physical quantity from the transformed graph",
    ],
    formulas: [
      "Gradient = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)  (use a large triangle)",
      "Arrhenius linearisation: ln k = −(Ea/R) × (1/T) + ln A  →  gradient = −Ea/R",
      "Beer–Lambert linearisation: A = εlc  →  absorbance A vs concentration c (gradient = εl)",
      "Absolute zero extrapolation: Charles's law V vs T(°C) → x-intercept = −273 °C",
    ],
    sections: [
      {
        title: "Drawing the Best-fit Line and Interpreting Gradient and Intercept",
        subtitle: "A best-fit line need not pass through every point — it is the 'trend line that bisects the centre' of the points, and the gradient must be found with a large triangle",
        terms: [
          {
            term: "Best-fit Line / Line of Best Fit",
            def: "A best-fit line is the straight line that best represents the overall trend of the experimental data points. Drawing rules: ① the line is drawn so that the data points are divided roughly evenly above and below it. ② it need not pass through every point — if there is an outlier, mark that point with a circle and exclude it from the line. ③ extend the line slightly beyond the data range on both sides (for interpolation and reading the intercept). IB mark scheme: 'should the best-fit line pass through the origin?' is decided on theoretical grounds — for example, in the Beer–Lambert law (A vs c), if c=0 then A=0, so a line through the origin is theoretically correct. When you force the line through the origin you must state the justification.",
          },
          {
            term: "Interpreting Gradient and Intercept",
            def: "Calculating the gradient: choose two points on the line (points on the line, not data points) and find Δy/Δx. Always use a large triangle (as wide an x range as possible) to reduce reading error. The units of the gradient are y-axis units / x-axis units. Examples of chemical interpretation: ① ln k vs 1/T graph (Arrhenius): gradient = −Ea/R → Ea = −gradient × R (R = 8.314 J mol⁻¹ K⁻¹). Intercept (y-intercept) = ln A. ② absorbance A vs concentration c (Beer–Lambert): gradient = εl (ε = molar absorption coefficient, l = path length). ③ V vs T (°C) graph: x-intercept = absolute zero (−273 °C) — Charles's law. If you use the coordinates of an original data point when finding the gradient, error arises because the best-fit line may not pass exactly through that point, so always choose two points on the line.",
          },
          {
            term: "Interpolation and Extrapolation",
            def: "Interpolation: reading a value from the graph within the range over which data were collected. Example: reading the concentration corresponding to absorbance 0.35 on a calibration line for concentrations of 0.20–1.00 mol dm⁻³. Relatively reliable — because the trend of the line (or curve) has already been confirmed over that range. Extrapolation: predicting a value by extending the graph beyond the data range. Example: extrapolating an Arrhenius graph from k values at a few temperatures to predict k at a very high temperature. Less reliable — because the assumption that the same trend holds beyond the data range may not be valid. However, theoretically justified extrapolations, such as determining absolute zero (Charles's law), are permissible.",
          },
        ],
        traps: [
          "Using the coordinates of a data point directly when finding the gradient is the wrong method. A data point may not lie exactly on the best-fit line, so you must choose two points on the drawn best-fit line (points easy to read off the scale) to calculate the gradient. Also, if the triangle is small the reading error grows, so use a large triangle that covers at least half the length of the line.",
          "When you find an outlier, simply including it in the line or excluding it with no explanation loses marks. In an IB IA and Paper 3, mark the outlier clearly with a circle or other symbol, and give a brief justification such as 'this point was excluded from determining the best-fit line, as it appears to be due to experimental error (e.g., contamination during that particular measurement).'",
        ],
        example:
          "Calculating the activation energy (Ea) from the gradient (IB HL Paper 2 type): From the data below, the gradient of a ln k vs 1/T graph was calculated as −8500 K. Find Ea. Solution: Arrhenius linearisation: ln k = −(Ea/R) × (1/T) + ln A. Therefore gradient = −Ea/R = −8500 K. Ea = 8500 K × 8.314 J mol⁻¹ K⁻¹ = 70667 J mol⁻¹ ≈ 71 kJ mol⁻¹. Note: using the units of R (J mol⁻¹ K⁻¹) gives Ea in J mol⁻¹. To convert to kJ mol⁻¹, ÷1000. On IB Paper 2, omitting the units loses partial marks in the mark scheme.",
      },
      {
        title: "Linearisation and the Experimental Use of Graphs",
        subtitle: "Transform exponential or curved relationships with ln or a reciprocal and they become straight lines — once straight, a single gradient yields a physical constant",
        terms: [
          {
            term: "Linearisation",
            def: "When experimental data show a curved (non-linear) relationship, the process of mathematically transforming the variables so that the graph becomes a straight line is called linearisation. Reason: on a straight line you can read the gradient and intercept accurately to extract a physical constant, and judging the best-fit line is also easier. Key transformation examples: ① exponential relationship y = Ae^(bx) → ln y = bx + ln A (ln y vs x straight line, gradient = b). ② inverse relationship y = k/x → y vs 1/x straight line (gradient = k). ③ power relationship y = kx^n → log y = n log x + log k (log y vs log x straight line, gradient = n). The contexts where linearisation appears most often in IB HL chemistry: the Arrhenius equation (ln k vs 1/T), and determining reaction order (log[A] vs t or 1/[A] vs t).",
          },
          {
            term: "Calibration Curve",
            def: "A calibration curve is a graph made using the measured values (e.g., absorbance, conductivity) of standard solutions of known concentration. After confirming the linear relationship between the known concentration (x-axis) and the measured value (y-axis), the concentration of an unknown sample is determined by interpolating its measured value. In IB Chemistry, the representative example is a Beer–Lambert calibration of absorbance vs concentration: A = εlc (ε: molar absorption coefficient, l: path length, c: concentration). If the calibration curve passes through the origin, the Beer–Lambert law holds. The reason for using a calibration curve: to reduce systematic error by correcting for matrix effects of the real sample and instrument deviations.",
          },
        ],
        traps: [
          "When taking ln for linearisation, do not forget the units. ln can only be taken of a dimensionless number, so theoretically if k in ln k has units, this is understood as a ratio relative to a reference value. IB exams usually instruct you to 'ignore the units of k and use only the value,' but in an IA, mentioning this point provides evidence of Additional Higher Level (AHL) understanding.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u11-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 11,
    lessonNum: 3,
    unitName: "Measurement & Analysis",
    title: "Structural Analysis of Organic Compounds — How to 'Read' a Molecule with IR, NMR, and Mass Spectrometry",
    subtitle: "Calculate the degree of unsaturation with IHD, then combine IR, ¹H NMR, and MS spectra — and you can complete the structural formula of an unknown organic compound on paper",
    overview:
      "The methods for determining the structure of organic compounds are called spectroscopy. In a modern chemistry laboratory, three core tools are combined to identify an unknown compound. First, infrared (IR) spectroscopy identifies functional groups using the frequencies at which bonds within a molecule absorb infrared radiation — for example, a broad, strong O−H stretch (3200−3550 cm⁻¹) signals the presence of an alcohol or carboxylic acid. Second, proton nuclear magnetic resonance (¹H NMR spectroscopy) tells you the number and arrangement of hydrogens (protons) in different chemical environments — from the chemical shift (δ), integration, and splitting pattern you can even deduce how the carbon skeleton is connected. Third, mass spectrometry (MS) ionises the molecule to measure the molecular mass (molecular ion M⁺) and fragment ions — the pattern of losing particular fragments lets you confirm functional groups. Before using these three, you calculate the degree of unsaturation (IHD, Index of Hydrogen Deficiency, or degree of unsaturation) from the molecular formula to predict in advance the number of double bonds, triple bonds, and rings. In this lesson we organise everything from calculating IHD to the core principles of the three spectroscopic methods and IB exam patterns.",
    objectives: [
      "Given a molecular formula, use the degree-of-unsaturation formula IHD = (2C + 2 + N − H − X) / 2 to calculate the total number of double bonds, triple bonds, and rings, and mention the possibility of a benzene ring when IHD ≥ 4",
      "Recognise the main functional-group absorption positions in an IR spectrum (O−H alcohol 3200−3550 cm⁻¹, C=O carbonyl 1700−1750 cm⁻¹, N−H around 1550 cm⁻¹, C−H 2850−3000 cm⁻¹) and identify the corresponding functional group",
      "Interpret the chemical shift (δ), integration ratio, and splitting pattern (by the n+1 rule) in a ¹H NMR spectrum to determine the chemical environments of non-equivalent protons in the molecule",
      "Determine the molecular mass from the molecular ion peak (M⁺) in a mass spectrum, and use particular fragment losses (e.g., 15 = CH₃, 17 = OH, 29 = CHO, 45 = OC₂H₅) to deduce functional groups",
      "Combine IR, ¹H NMR, and MS data to solve problems determining the structure of an unknown organic compound step by step",
    ],
    formulas: [
      "IHD (degree of unsaturation) = (2C + 2 + N − H − X) / 2  (X = halogen, ignore O)",
      "IHD interpretation: 1 = one double bond or ring, 2 = one triple bond or two double bonds, 4+ = benzene ring possible",
      "n+1 rule: if there are n neighbouring H, the number of splittings = n+1 (singlet/doublet/triplet/quartet…)",
      "MS fragment losses: −15(CH₃), −17(OH), −28(CO), −29(CHO), −31(OCH₃), −45(OEt)",
    ],
    sections: [
      {
        title: "IHD and Infrared Spectroscopy (IR) — Find the Functional Group",
        subtitle: "Predict the number of double bonds and rings with IHD, then confirm the functional group with IR — the C=O peak (~1700 cm⁻¹) and the broad O−H peak (~3300 cm⁻¹) appear most often in IB",
        terms: [
          {
            term: "Index of Hydrogen Deficiency (IHD) / Degree of Unsaturation",
            def: "IHD = (2C + 2 + N − H − X) / 2, where C = number of carbons, N = number of nitrogens, H = number of hydrogens, X = number of halogens. Oxygen (O) and sulfur (S) are ignored in the formula. Interpretation: IHD = 0 → fully saturated (chain alkane). IHD = 1 → one double bond (C=C or C=O) or one ring. IHD = 2 → one triple bond, or two double bonds, or a ring plus a double bond. IHD = 4 → benzene ring (1 ring + 3 C=C double bonds). If IHD ≥ 4, consider the possibility of a benzene ring. Example: IHD of C₄H₈O = (2×4 + 2 − 8) / 2 = 1 → one double bond or one ring. Whether this is butanal (C=O) or cyclobutanol (a ring) is distinguished with additional spectral data.",
          },
          {
            term: "Key IR Absorptions",
            def: "In an IR spectrum, the higher-wavenumber side (left) is higher energy. Key absorption positions to memorise for IB: ① O−H (alcohol): 3200−3550 cm⁻¹, broad and strong absorption (broadened by hydrogen bonding). ② O−H (carboxylic acid): 2500−3300 cm⁻¹, very broad and strong absorption. ③ N−H (amine, amide): 3300−3500 cm⁻¹, usually sharp, a double peak (primary amine) or a single peak (secondary amine). ④ C−H: 2850−3000 cm⁻¹, present in most organic compounds (low diagnostic value). ⑤ C≡N: ~2200 cm⁻¹, sharp and strong absorption. ⑥ C=O (aldehyde/ketone/ester/carboxylic acid/amide): 1650−1750 cm⁻¹, strong sharp absorption — type can be distinguished by position (ester ~1735, ketone ~1715, aldehyde ~1725, carboxylic acid ~1710, amide ~1650). ⑦ C=C (alkene): 1620−1680 cm⁻¹. ⑧ fingerprint region: 500−1500 cm⁻¹, used for compound identification by specific patterns, but IB does not require its interpretation.",
          },
          {
            term: "IR Spectrum Analysis Strategy",
            def: "In IB, IR spectrum problems mainly ask 'which absorption peak indicates the presence of a particular functional group?' Strategy: ① first look at the region above 3000 cm⁻¹ — check whether an O−H or N−H peak is present. ② check whether a C=O peak near 1700 cm⁻¹ is present → if so, it is one of the carbonyl compounds (aldehyde/ketone/ester/carboxylic acid/amide). ③ if a broad O−H (2500−3300 cm⁻¹) and a C=O (~1710 cm⁻¹) are present simultaneously, a carboxylic acid (-COOH) is highly likely. ④ check that it agrees with the degree of unsaturation predicted from IHD. ⑤ the fingerprint region (500−1500 cm⁻¹) needs no interpretation at IB level — just state that it is the fingerprint region.",
          },
        ],
        traps: [
          "In the IHD formula, oxygen (O) is not counted. A common mistake is to include the O₂ when finding the IHD of C₅H₁₀O₂. The formula is (2×5 + 2 − 10) / 2 = 1. O affects neither the hydrogen count nor the carbon count, so ignore it completely. By contrast, nitrogen (N) contributes +1 (each N allows one extra H, which cancels when subtracting H from the formula), and halogens (X) are treated like H and subtracted.",
          "Do not conclude in IR that 'there is a C−H peak near 3000 cm⁻¹, so it is an alkane.' C−H stretching is present in virtually every organic compound. In IB exams it is diagnostically useful to focus on the high-energy (high-wavenumber) O−H, N−H, or the low-energy (low-wavenumber) C=O peak. 'Concluding it is an alkane from the C−H peak alone' is marked as a wrong interpretation in Paper 3 HL.",
        ],
        example:
          "Combined IHD + IR problem (IB Paper 2 type): A compound of molecular formula C₃H₆O shows a strong absorption at 1720 cm⁻¹ in its IR spectrum and no broad absorption at 2500−3300 cm⁻¹. Propose a possible structure. Solution: IHD = (2×3 + 2 − 6) / 2 = 1 → one double bond or one ring. The IR 1720 cm⁻¹ is C=O carbonyl absorption (ketone/aldehyde range). No O−H at 2500−3300 cm⁻¹ → not a carboxylic acid. Therefore IHD = 1 is explained by C=O (carbonyl). Structures of C₃H₆O containing C=O: propanal (CH₃CH₂CHO, aldehyde) and acetone (CH₃COCH₃, ketone). An aldehyde shows an additional C−H (aldehyde H) peak at ~2720 cm⁻¹, so if that peak is absent, acetone (propan-2-one) is the more likely structure.",
      },
      {
        title: "¹H NMR and Mass Spectrometry — Reading the Carbon Skeleton and Molecular Mass",
        subtitle: "NMR's chemical shift, integration, and splitting; MS's M⁺ and fragment losses — combining these three pieces of information lets you logically build the structure of an unknown molecule",
        terms: [
          {
            term: "¹H NMR Spectroscopy — Chemical Shift, Integration, Splitting",
            def: "¹H NMR uses the phenomenon of hydrogens (protons) in a molecule absorbing specific radio waves in an external magnetic field. Three core pieces of information: ① chemical shift (δ, ppm): indicates the chemical environment in which the hydrogen sits. Measured relative to TMS (tetramethylsilane) as the reference (δ=0). Key ranges: alkyl C−H δ 0.5−1.5, allylic/alkyne δ 1.5−3.5, =C−H attached to C=C δ 4.5−6.5, aromatic Ar−H δ 6.5−8.0, aldehyde CHO δ 9−10, carboxylic acid COOH δ 10−12. ② integration: the area under a peak is proportional to the relative number of hydrogens in that chemical environment. Example: an area ratio of 3:1 means the ratio of hydrogen numbers is 3:1. ③ splitting pattern (n+1 rule): if there are n neighbouring (vicinal, three bonds away) hydrogens, the peak splits into n+1 peaks. singlet (s, n=0), doublet (d, n=1), triplet (t, n=2), quartet (q, n=3). Splitting does not occur between hydrogens on the same carbon; it occurs because of hydrogens on neighbouring carbons.",
          },
          {
            term: "Mass Spectrometry — Molecular Ion and Fragment Ions",
            def: "In mass spectrometry (MS), the sample is ionised (mainly by electron impact, EI) to form cations, which are separated by mass/charge ratio (m/z). Molecular ion peak (M⁺): appears at the highest m/z and equals the molecular mass (Mr). Base peak: the strongest peak in the spectrum, normalised to 100%. Fragment ion: pieces formed when bonds in the molecular ion break. Fragment loss patterns: M−15 (−CH₃), M−17 (−OH), M−18 (−H₂O), M−28 (−CO or −C₂H₄), M−29 (−CHO), M−31 (−OCH₃), M−45 (−OC₂H₅). Isotope peaks: the intensity of the M+1 peak is proportional to the number of carbons (¹³C abundance ≈ 1.1% per C). If chlorine or bromine is present, a strong M+2 peak appears (Cl: M:(M+2) ≈ 3:1, Br: M:(M+2) ≈ 1:1).",
          },
          {
            term: "Combined Spectral Analysis Strategy",
            def: "A step-by-step approach to determining the structure of an unknown organic compound: ① if a molecular formula is given, calculate the IHD. ② confirm the molecular mass from the M⁺ peak in MS, and deduce functional groups from the major fragment losses. ③ confirm functional-group absorption peaks in IR (especially C=O, O−H, N−H). ④ in ¹H NMR, determine hydrogen types from chemical shift, the ratio of hydrogen numbers from integration, and the number of neighbouring hydrogens from the splitting pattern. ⑤ combine all information to propose a consistent structure. On IB Paper 2 HL, clearly stating these four steps earns marks for logical reasoning.",
          },
        ],
        traps: [
          "In the n+1 rule, 'neighbouring' means hydrogens three bonds away (vicinal, J-coupling). Hydrogens on the same carbon (geminal H) are generally treated at IB level as not splitting one another. Therefore, in CH₃−CH₂, the hydrogen peak of CH₂ is split by the 3 H of CH₃ into a quartet (3+1=4 lines). Understand precisely that it is 'the number of hydrogens on the neighbouring carbon + 1,' and avoid the mistake of miscounting the hydrogens on the same carbon and adding them into n+1.",
          "In MS, the M⁺ peak is not necessarily the base peak. If the molecular ion is unstable and fragments easily, the M⁺ peak may be very weak or even invisible. 'The highest m/z peak in the spectrum = M⁺' is correct, but 'the strongest peak in the spectrum = M⁺' is wrong. On IB Paper 2, confusing the base peak with the molecular ion peak leads to an incorrect determination of the molecular mass.",
        ],
        example:
          "Combined ¹H NMR + MS structure determination (IB HL Paper 2 type): Molecular formula C₄H₈O₂, M⁺ = 88 in MS, with an m/z = 59 (M−29) peak observed. Strong C=O at ~1735 cm⁻¹ in IR. ¹H NMR: δ 1.2 (t, 3H), δ 2.1 (s, 3H), δ 4.1 (q, 2H). Determine the structure. Solution: ① IHD = (2×4+2−8)/2 = 1 → one C=O. ② confirm M⁺=88 in MS, M−29=loss of CHO → possibility of an aldehyde. ③ IR ~1735 cm⁻¹ → ester (C=O, ester range). ④ NMR: δ 1.2 (t, 3H) — CH₃ has a neighbouring CH₂ giving a triplet → CH₃−CH₂− structure. δ 4.1 (q, 2H) — CH₂ has 3 neighbouring H → −O−CH₂−CH₃ (the −OCH₂ of an ethyl ester). δ 2.1 (s, 3H) — singlet, CH₃ with no neighbouring H → CH₃−C=O (acetyl group). ⑤ Conclusion: CH₃COOC₂H₅ (ethyl ethanoate). Re-checking M−29: in an ester, losing −OC₂H₅ (45) would leave CH₃CO⁺ (43) at m/z=43. m/z=59 = 88−29 = M−CHO → C₃H₇O⁺ (59). Therefore ethyl ethanoate is the consistent structure.",
      },
    ],
  },
];
