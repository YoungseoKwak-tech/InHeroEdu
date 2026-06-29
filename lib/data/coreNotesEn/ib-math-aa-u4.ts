/**
 * Core Notes English version — IB Math AA Unit 4 (Statistics & Probability).
 * Full content preserved (objectives · terms · traps · example · formulas).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AA_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-math-aa-u4-l1",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 4,
    lessonNum: 1,
    unitName: "Statistics & Probability",
    title: "Descriptive Statistics: Measures of Centre, Dispersion, Quartiles, Box Plots, and Outliers",
    subtitle: "Compressing data into 'a single number' is the first language of statistics",
    overview:
      "The starting point of IB AA statistics is summarising a given data set in two directions. The first direction is centre — the mean, median, and mode represent the 'typical value' of the data. The second direction is spread — the range, interquartile range (IQR), variance, and standard deviation measure how spread out the data are. The box-and-whisker plot integrates information from both directions into a single picture. On Paper 2 you obtain statistical values directly with the GDC, but conceptual understanding such as the outlier criterion and the interpretation of skewness is tested without a calculator on Paper 1.",
    objectives: [
      "Calculate the mean, median, and mode from raw data and from frequency tables, and explain the appropriate situation for using each measure of centre",
      "Calculate variance and standard deviation using formulas, and understand the difference between σₙ and sₙ₋₁ using the GDC's statistical functions",
      "Find the lower quartile (Q1), median (Q2), and upper quartile (Q3), and calculate the interquartile range (IQR = Q3 − Q1)",
      "Draw and interpret box plots, and apply the outlier criterion Q1 − 1.5×IQR and Q3 + 1.5×IQR",
      "Judge the symmetry and skewness of a distribution from box plots and histograms, and explain the relative positions of the mean and median",
    ],
    formulas: [
      "Mean: x̄ = (Σxᵢ) / n  (raw data),  x̄ = (Σfᵢxᵢ) / (Σfᵢ)  (frequency distribution)",
      "Variance: σ² = Σ(xᵢ − x̄)² / n  (population),  s² = Σ(xᵢ − x̄)² / (n−1)  (sample)",
      "Standard deviation: σ = √(σ²),  s = √(s²)",
      "Interquartile range: IQR = Q3 − Q1",
      "Outlier boundaries: lower = Q1 − 1.5 × IQR,  upper = Q3 + 1.5 × IQR",
    ],
    sections: [
      {
        title: "Measures of Central Tendency & Dispersion",
        subtitle: "The mean is pulled by outliers; the median is robust to outliers — remember this one sentence",
        terms: [
          {
            term: "Mean",
            def: "The sum of all data values divided by the count. x̄ = Σxᵢ/n. In a frequency table, multiply each class value by its frequency, sum these, and divide by the total frequency. Because the mean reflects every value, it is sensitive to outliers. For data with extreme values, such as income distributions, the median is more representative.",
          },
          {
            term: "Median",
            def: "The value in the middle position when the data are sorted in order of size. If n is odd it is the (n+1)/2-th value; if n is even it is the average of the n/2-th and n/2+1-th values. Because it is unaffected by outliers, it is a 'robust' measure of centre.",
          },
          {
            term: "Standard deviation",
            def: "The positive square root of the variance. It expresses, in the same units as the original data, how far the data lie from the mean on average. In IB you distinguish the population standard deviation σₙ from the sample standard deviation sₙ₋₁. On the GDC, check the two values σₓ (= σₙ) and Sₓ (= sₙ₋₁).",
          },
          {
            term: "Skewness",
            def: "The direction of asymmetry of a distribution. A long right tail means positive skew (positively skewed) → mean > median > mode. A long left tail means negative skew (negatively skewed) → mean < median < mode. In a symmetric distribution, mean = median = mode.",
          },
        ],
        traps: [
          "When finding the mean from a frequency table, you must use the class 'midpoint,' not the class 'boundary.' The midpoint of the class '20 ≤ x < 30' is 25. Using the boundary value 20 or 30 directly gives an incorrect mean.",
          "Mixing up the population standard deviation (σₙ) and the sample standard deviation (sₙ₋₁) loses marks in IB. If the problem states 'these data are the entire population,' use σₙ; if it says 'a sample,' use sₙ₋₁. When not specified, judge from context, but check whether the denominator of the formula in the IB exam formula booklet is n or n−1.",
        ],
        example:
          "Data: 3, 7, 7, 10, 12, 14, 19. Mean: x̄ = (3+7+7+10+12+14+19)/7 = 72/7 ≈ 10.3. Median: the 4th of 7 = 10. Mode: 7 (appears twice). Variance (population): σ² = [(3−10.3)²+(7−10.3)²+(7−10.3)²+(10−10.3)²+(12−10.3)²+(14−10.3)²+(19−10.3)²]/7 = [53.3+10.9+10.9+0.1+2.9+13.7+75.7]/7 = 167.4/7 ≈ 23.9. σ ≈ 4.89. The distribution is slightly right-skewed (mean 10.3 > median 10).",
      },
      {
        title: "Quartiles, Box Plots & Outliers",
        subtitle: "A single box plot reveals a distribution's centre, spread, skew, and outliers all at once",
        terms: [
          {
            term: "Quartiles",
            def: "The three boundary values that divide the data into four equal parts after sorting them by size. Q1 (lower quartile, 25th percentile), Q2 (median, 50th percentile), Q3 (upper quartile, 75th percentile). IQR = Q3 − Q1 represents the range of the middle 50%.",
          },
          {
            term: "Box-and-whisker plot",
            def: "A diagram representing the minimum, Q1, Q2, Q3, and maximum (the 5-number summary) with a rectangle and whiskers. The whiskers extend to the maximum and minimum excluding outliers. Outliers are marked as separate points (×). The width of the box is the IQR, and the position of the line inside the box is the median.",
          },
          {
            term: "Outlier",
            def: "A data value below Q1 − 1.5×IQR or above Q3 + 1.5×IQR. In IB this criterion is also called the 'fence' rule. If outliers are present, noting that the median is a more appropriate measure of centre than the mean can earn high marks.",
          },
          {
            term: "Cumulative frequency & percentiles",
            def: "On a cumulative frequency graph (ogive), Q1 corresponds to the value at 25% of the total frequency, Q2 at 50%, and Q3 at 75%. IB Paper 2 frequently presents an ogive graph and asks you to read off the quartiles.",
          },
        ],
        traps: [
          "When calculating outlier boundaries, a common mistake is to add or subtract 1.5 directly to Q1·Q3 instead of multiplying it by the IQR. You must follow the order 'lower = Q1 − 1.5 × IQR, upper = Q3 + 1.5 × IQR' exactly. Failing to find the IQR first tangles the calculation order.",
          "There is an error of drawing the whiskers of a box plot all the way to the overall minimum and maximum of the data. When outliers exist, the whiskers should be drawn only to the smallest/largest value that is not an outlier, and the outliers marked as separate points. A whisker that includes an outlier is an incorrect box plot.",
        ],
        example:
          "Data: 2, 5, 6, 7, 8, 9, 10, 11, 13, 35 (n = 10). Q1 = (6+7)/2 = 6.5, Q2 = (8+9)/2 = 8.5, Q3 = (10+11)/2 = 10.5. IQR = 10.5 − 6.5 = 4. Lower = 6.5 − 1.5×4 = 6.5 − 6 = 0.5, upper = 10.5 + 6 = 16.5. In the data, 35 > 16.5, so 35 is an outlier. Since 2 > 0.5, the value 2 is normal. Box plot: whiskers from 2 to 13, with the outlier 35 marked as a separate point (×). Mean (11.6) > median (8.5) → positive skew, with the outlier 35 pulling the mean up.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u4-l2",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 4,
    lessonNum: 2,
    unitName: "Statistics & Probability",
    title: "Probability: Sample Space, Combined Events, Conditional Probability, Independence, Tree & Venn Diagrams",
    subtitle: "The single equation P(A∩B) = P(A)P(B) is both the definition of independence and the heart of the exam",
    overview:
      "The IB AA probability unit redefines the probability you learned in high school far more rigorously. The goal is to master the set-theoretic language of sample space and event, and to understand the addition rule, multiplication rule, and conditional probability as principles rather than mere formulas. Independent and mutually exclusive are frequently confused concepts: independence does not imply mutual exclusivity, nor does mutual exclusivity imply independence. The tree diagram is the most reliable visual tool for breaking complex probabilities down step by step, and the Venn diagram intuitively represents the overlapping structure of two events.",
    objectives: [
      "Use the set-theoretic representations of sample space, event, and complement, and apply P(A') = 1 − P(A)",
      "Use the addition rule P(A∪B) = P(A) + P(B) − P(A∩B) to calculate probabilities of combined events, and explain its simplification for mutually exclusive events",
      "Calculate conditional probability P(A|B) = P(A∩B)/P(B) with the formula, and read it directly from tree and Venn diagrams",
      "Apply the definition of independent events P(A∩B) = P(A)×P(B), and clearly explain the difference between independence and mutual exclusivity",
      "Use tree diagrams to systematically calculate the probabilities of combined events over two or more stages",
    ],
    formulas: [
      "Complement: P(A') = 1 − P(A)",
      "Addition rule: P(A∪B) = P(A) + P(B) − P(A∩B)",
      "When mutually exclusive: P(A∪B) = P(A) + P(B)",
      "Conditional probability: P(A|B) = P(A∩B) / P(B)",
      "Multiplication rule: P(A∩B) = P(A|B) × P(B) = P(B|A) × P(A)",
      "Definition of independence: P(A∩B) = P(A) × P(B)  ⟺  P(A|B) = P(A)",
      "Law of total probability: P(A) = P(A|B)P(B) + P(A|B')P(B')",
    ],
    sections: [
      {
        title: "Sample Space, Combined Events & Addition Rule",
        subtitle: "The essence of the addition rule is drawing a Venn diagram and subtracting the intersection once so you do not add it twice",
        terms: [
          {
            term: "Sample space (S)",
            def: "The set of all possible outcomes of an experiment. Two coin tosses: S = {HH, HT, TH, TT}. The sum of all probabilities over the sample space is 1. An event A is a subset of S, with P(A) = n(A)/n(S) (in an equally likely model).",
          },
          {
            term: "Complement",
            def: "The event A' that A does not occur. P(A') = 1 − P(A). For 'at least one' type problems, it is much faster to calculate the complement 'none occur' and subtract from 1.",
          },
          {
            term: "Mutually exclusive",
            def: "When two events A, B cannot occur simultaneously, P(A∩B) = 0. The addition rule simplifies to P(A∪B) = P(A) + P(B). Note: if mutually exclusive, they cannot be independent (when P(A) > 0, P(B) > 0). If mutually exclusive, when one event occurs the other never occurs, so they influence each other.",
          },
          {
            term: "Venn diagram",
            def: "Represents two events A, B as overlapping circles. The intersection A∩B is the overlapping region, the union A∪B is the entire area of the two circles, and the region of A only is A∩B'. IB frequently asks you to fill a Venn diagram with probability values (or frequencies).",
          },
        ],
        traps: [
          "Using P(A∪B) = P(A) + P(B) unconditionally adds P(A∩B) twice when the events are not mutually exclusive. Always write P(A∪B) = P(A) + P(B) − P(A∩B) first, and only simplify with P(A∩B) = 0 when A and B are stated or proven to be mutually exclusive.",
          "The false belief that 'mutually exclusive implies independent' is very common. If P(A) = 0.3, P(B) = 0.4 and they are mutually exclusive, then P(A∩B) = 0, but P(A)×P(B) = 0.12 ≠ 0, so they are not independent. Confusing mutual exclusivity with independence will certainly lose marks in IB.",
        ],
        example:
          "Given P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2, let us find the following. (a) P(A∪B) = 0.5 + 0.4 − 0.2 = 0.7. (b) P(A'∩B) = P(B) − P(A∩B) = 0.4 − 0.2 = 0.2. (c) Independence: P(A)×P(B) = 0.5×0.4 = 0.2 = P(A∩B) → independent. (d) P(A|B) = P(A∩B)/P(B) = 0.2/0.4 = 0.5 = P(A) → independence confirmed. Venn diagram: A only = 0.3, A∩B = 0.2, B only = 0.2, remainder = 0.3.",
      },
      {
        title: "Conditional Probability & Independence",
        subtitle: "Multiply along the branches of a tree diagram and add the branches with the same outcome, and you can find any probability",
        terms: [
          {
            term: "Conditional probability",
            def: "The probability that event A occurs given that event B has occurred: P(A|B) = P(A∩B)/P(B) (P(B) > 0). It is intuitive to think of it as the proportion that A occupies after shrinking the sample space to B.",
          },
          {
            term: "Independent events",
            def: "P(A|B) = P(A) ⟺ P(A∩B) = P(A)×P(B). If the information that B has occurred does not change the probability of A, they are independent. Sampling with replacement is independent; sampling without replacement is not independent.",
          },
          {
            term: "Tree diagram",
            def: "Conditional probabilities are labelled on the branches that extend stage by stage. Multiplying probabilities along each branch gives the joint probability; adding the probabilities of several paths with the same final outcome gives the total probability. The sum of the end probabilities of all branches is 1.",
          },
          {
            term: "Law of total probability",
            def: "P(A) = P(A|B)P(B) + P(A|B')P(B'). When events B and B' partition the sample space into two parts, the total probability of A is expressed as the sum of its probabilities under each condition. Adding the two paths of a tree diagram is the visual representation of this law.",
          },
        ],
        traps: [
          "The error of swapping P(A|B) and P(B|A) (the 'inverse probability fallacy') is very frequent in IB exams. P(A|B) ≠ P(B|A). For example, 'the probability of testing positive given a disease' and 'the probability of having the disease given a positive test' are entirely different values. In the formula P(A|B) = P(A∩B)/P(B), always confirm that the denominator is the probability of the 'conditioning event.'",
          "There is a mistake of writing the unconditional probability on the second branch of a tree diagram instead of the conditional probability. On the branches after the second stage, you must always write the probability conditioned on the first outcome. Check what the denominator is on each branch.",
        ],
        example:
          "A bag contains 3 red balls and 2 blue balls. Drawing 2 in succession without replacement, let us find the probability that the second ball is red. Tree diagram: 1st red (3/5) → 2nd red (2/4 = 1/2): probability 3/5 × 1/2 = 3/10. 1st blue (2/5) → 2nd red (3/4): probability 2/5 × 3/4 = 6/20 = 3/10. P(2nd red) = 3/10 + 3/10 = 6/10 = 3/5. Verification: by symmetry, the probability of drawing a red ball at any position is 3/5 → consistent. Conditional: P(1st red | 2nd red) = (3/10) / (3/5) = 1/2.",
      },
      {
        title: "Introduction to Bayes & Probability Applications",
        subtitle: "Bayes' theorem is the formula written for how new evidence changes belief",
        terms: [
          {
            term: "Bayes' theorem",
            def: "P(B|A) = P(A|B)×P(B) / P(A). Posterior = likelihood × prior / evidence. In IB AA SL it is fully solvable with a tree diagram, but in HL it is required directly in formula form. Expanding the numerator and denominator of the conditional probability formula with the law of total probability gives Bayes' theorem.",
          },
          {
            term: "False positive & false negative",
            def: "Frequently appears in contexts such as medical testing and spam filters. Sensitivity = P(positive|disease), specificity = P(negative|healthy). The positive predictive value = P(disease|positive) is calculated using Bayes' theorem. The paradoxical result that the positive predictive value drops sharply when the prevalence of the disease is low is a staple of IB HL questions.",
          },
          {
            term: "Repeated independent trials",
            def: "In problems of the type P(A occurs at least k times out of n), if independent then P(A occurs k times in a row) = P(A)^k, P(A occurs exactly k times) = C(n,k)×P(A)^k×P(A')^(n-k) (the binomial distribution). This concept connects directly to the binomial distribution of Lesson 3.",
          },
        ],
        traps: [
          "When applying Bayes' theorem, swapping the roles of the prior and the likelihood is a common mistake. When finding 'the probability of disease (B) given a positive test (A),' do not make the error of simply assuming P(positive) = 0.5 in the denominator instead of expanding P(A) with the law of total probability. Always calculate P(A) as the sum of the two paths using a tree diagram.",
          "There are cases of being unable to intuitively accept that, in a low-prevalence situation, even a test with high sensitivity can have a low positive predictive value. With a prevalence of 1% and a test of 99% sensitivity and 99% specificity, P(disease|positive) ≈ only 50%. IB may ask you to prove this paradox by calculation.",
        ],
        example:
          "Disease prevalence P(D) = 0.01. Test sensitivity P(positive|D) = 0.95, specificity P(negative|D') = 0.90, i.e. P(positive|D') = 0.10. Let us find the probability of actually having the disease when the test result is positive. Law of total probability: P(positive) = P(positive|D)×P(D) + P(positive|D')×P(D') = 0.95×0.01 + 0.10×0.99 = 0.0095 + 0.099 = 0.1085. Bayes: P(D|positive) = P(positive|D)×P(D)/P(positive) = 0.0095/0.1085 ≈ 0.0876 ≈ 8.8%. Interpretation: because the prevalence is low, even a positive result gives only about an 8.8% probability of actually having the disease.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u4-l3",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 4,
    lessonNum: 3,
    unitName: "Statistics & Probability",
    title: "Binomial Distribution, Normal Distribution and Standardisation",
    subtitle: "Countless real-world probability problems reduce to one of these two distributions",
    overview:
      "The IB AA probability distribution unit centres on the binomial distribution, a discrete random variable, and the normal distribution, a continuous random variable. The binomial distribution is the distribution of 'the number of successes when n independent trials with a fixed success probability p are repeated,' using the binomial coefficient in its probability calculation. The normal distribution is the most common distribution model for natural phenomena and measurements, and through standardisation any normal distribution problem can be solved by converting it to the standard normal distribution (z-distribution). On Paper 2, fluently using the GDC's binomialPDF/CDF and normalCDF functions is the key to saving time.",
    objectives: [
      "Check the conditions of the binomial distribution X ~ B(n, p) (fixed n, independent trials, binary outcomes, fixed p) and calculate P(X = k) = C(n,k)×p^k×(1−p)^(n−k)",
      "Calculate the expected value E(X) = np and variance Var(X) = np(1−p) of the binomial distribution and interpret them in context",
      "Use the GDC's binomcdf to calculate cumulative probabilities of the form P(X ≤ k), P(X < k), P(X ≥ k), P(a ≤ X ≤ b)",
      "Explain the characteristics of the normal distribution X ~ N(μ, σ²) (bell shape, symmetry, the 68–95–99.7% rule), and use the standardisation formula z = (x−μ)/σ",
      "Use the GDC's normalcdf and invNorm functions to solve normal distribution probability and inverse normal problems",
    ],
    formulas: [
      "Binomial probability: P(X = k) = C(n,k) × p^k × (1−p)^(n−k)",
      "Binomial expected value: E(X) = np",
      "Binomial variance: Var(X) = np(1−p),  standard deviation: σ = √(np(1−p))",
      "Normal standardisation: Z = (X − μ) / σ,  Z ~ N(0, 1)",
      "Normal symmetry: P(X > a) = 1 − P(X ≤ a)",
      "P(μ − σ < X < μ + σ) ≈ 0.683,  P(μ − 2σ < X < μ + 2σ) ≈ 0.954",
    ],
    sections: [
      {
        title: "Binomial Distribution",
        subtitle: "Checking the four BINS conditions is the first step in applying the binomial distribution",
        terms: [
          {
            term: "Conditions for the binomial distribution (BINS)",
            def: "Binary (binary outcome: success/failure), Independent (each trial independent), Number of trials fixed (number of trials n fixed), Same probability (the success probability p is the same in each trial). When all four conditions are met, X ~ B(n, p). Mentioning these four conditions before using the binomial distribution in IB secures the Method mark.",
          },
          {
            term: "Binomial probability formula",
            def: "P(X = k) = C(n,k) × p^k × (1−p)^(n−k), where C(n,k) = n!/(k!(n−k)!) is the binomial coefficient. C(n,k) is the number of ways k successes can be arranged among n trials. On Paper 1 calculate directly for small n; on Paper 2 use the GDC's binompdf/binomcdf.",
          },
          {
            term: "Cumulative binomial probability",
            def: "P(X ≤ k) = Σ_{i=0}^{k} P(X = i). Calculate with binomcdf(n, p, k) on the GDC. P(X ≥ k) = 1 − P(X ≤ k−1) = 1 − binomcdf(n, p, k−1). P(a ≤ X ≤ b) = binomcdf(n, p, b) − binomcdf(n, p, a−1).",
          },
          {
            term: "Expected value & variance",
            def: "E(X) = np: on average np successes in n independent trials. Var(X) = np(1−p) = npq (q = 1−p). The variance is maximised when p = 0.5. The ability to interpret expected value and variance in context ('expect 4 successes on average,' 'a variance of 2.4 is the variability in the number of successes') is required in IB.",
          },
        ],
        traps: [
          "Incorrectly calculating P(X ≥ k) as 1 − P(X ≤ k) is a very common mistake. The correct formula is P(X ≥ k) = 1 − P(X ≤ k−1). For example, P(X ≥ 3) = 1 − P(X ≤ 2), not 1 − P(X ≤ 3). Always check whether the upper bound of binomcdf on the GDC should be k or k−1.",
          "If a binomial distribution problem involves sampling without replacement, the success probability of each trial changes, so the binomial distribution cannot be applied. The binomial distribution is only an approximation when 'with replacement' is stated or the population is sufficiently large (generally when the sample is less than 5% of the population). Always check the sampling method in the problem.",
        ],
        example:
          "On a product line with a 10% defect rate, drawing 15 at random, let X = number of defective items, so X ~ B(15, 0.1). (a) P(X = 2) = C(15,2) × (0.1)² × (0.9)¹³ = 105 × 0.01 × 0.2542 ≈ 0.267. (b) P(X ≤ 3) = binomcdf(15, 0.1, 3) ≈ 0.944. (c) P(X ≥ 2) = 1 − P(X ≤ 1) = 1 − binomcdf(15, 0.1, 1) ≈ 1 − 0.549 = 0.451. (d) E(X) = 15×0.1 = 1.5 items, Var(X) = 15×0.1×0.9 = 1.35. Interpretation: expect 1.5 defective items on average, with a standard deviation ≈ 1.16 items.",
      },
      {
        title: "Normal Distribution & Standardisation",
        subtitle: "Any normal distribution converts to the standard normal with a single z = (x−μ)/σ, and the GDC solves all standard normal problems",
        terms: [
          {
            term: "Normal distribution",
            def: "X ~ N(μ, σ²). A continuous probability distribution with a bell-curve shape, perfectly symmetric about μ. μ is the centre of the distribution (= median = mode), and σ² is the variance. The smaller σ is, the narrower and more peaked the bell shape. Countless natural phenomena such as height, weight, and measurement errors follow a normal distribution.",
          },
          {
            term: "Standardisation",
            def: "Z = (X − μ)/σ. Converts an arbitrary normal distribution X ~ N(μ, σ²) into the standard normal distribution Z ~ N(0, 1). The z-value is the standard score (z-score) indicating how many standard deviations the original value x lies from the mean. z > 0 means above the mean, z < 0 means below the mean.",
          },
          {
            term: "68–95–99.7% rule (empirical rule)",
            def: "P(μ−σ < X < μ+σ) ≈ 68.3%, P(μ−2σ < X < μ+2σ) ≈ 95.4%, P(μ−3σ < X < μ+3σ) ≈ 99.7%. Use it on Paper 1 to approximate normal distribution problems without a GDC. About 2/3 of the data lie within μ ± 1σ.",
          },
          {
            term: "Inverse normal",
            def: "The problem of finding x satisfying P(X ≤ x) = p when a probability p is given. Calculate with invNorm(p, μ, σ) on the GDC. Used for questions of the type 'what is the minimum score of the top 10%?' or 'what is the range of the middle 80%?'. By symmetry, P(X > x) = 0.1 → P(X ≤ x) = 0.9 = invNorm(0.9, μ, σ).",
          },
        ],
        traps: [
          "In conversions using the symmetry of the normal distribution, there are cases of forgetting that P(X > a) = P(X < 2μ−a) and missing the lower bound setting when trying to enter P(X > a) directly into the GDC. Whether you use the GDC's normalcdf(a, 10^99, μ, σ) or 1 − normalcdf(−10^99, a, μ, σ), the result is the same, but you must enter the upper or lower bound as a large number (10^99) instead of ∞.",
          "Forgetting that the probability entered into invNorm is the left-tail area and entering the right-tail area directly is a frequent mistake. If P(X > x) = 0.05, you must enter P(X ≤ x) = 0.95 into invNorm. The GDC's invNorm always takes the cumulative probability (left-tail area) as input.",
        ],
        example:
          "IQ scores X ~ N(100, 15²). (a) P(X > 130): z = (130−100)/15 = 2. P(X > 130) = 1 − normalcdf(−∞, 130, 100, 15) ≈ 1 − 0.9772 = 0.0228 ≈ 2.28%. (b) Minimum IQ of the top 5%: P(X ≤ x) = 0.95. x = invNorm(0.95, 100, 15) ≈ 100 + 1.645×15 ≈ 124.7. That is, about 125 or above is in the top 5%. (c) P(85 < X < 115) = normalcdf(85, 115, 100, 15) ≈ normalcdf(−1, 1 standard normal) ≈ 0.683 → confirms the 68.3% rule. Keep the exact value through to the final answer with no intermediate rounding on the GDC.",
      },
    ],
  },
];
