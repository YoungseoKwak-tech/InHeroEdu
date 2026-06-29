/**
 * Core Notes English version — IB Math AI (Applications & Interpretation) Unit 4.
 * Faithful translation of the Korean storytelling version.
 * Full IB DP Math AI syllabus content (Topic 4: Statistics & Probability) preserved,
 * with exam-accurate English narrative in the style of a top-tier instructor.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AI_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-math-ai-u4-l1",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 4,
    lessonNum: 1,
    unitName: "Statistics & Probability",
    title: "Data Collection & Sampling, Descriptive Statistics, Box Plots and Outliers",
    subtitle:
      "Your GDC computes the mean and standard deviation for you — but the questions that 'which sampling method did you use and why' and 'does an outlier distort the median or the mean more' carry the real IB marks",
    overview:
      "IB Math AI Unit 4 opens with statistics. Statistics splits into two stages. First, how you collect the data (sampling). Second, how you summarise the data you collected (descriptive statistics). When these two stages combine with a real-world context, an IB Paper 2 written-response question is born. Sampling methods (simple random, stratified, systematic, convenience) each carry different strengths, weaknesses, and risks of bias, and the IB frequently asks 'why was this method chosen?' or 'what is the limitation of this method?'. In descriptive statistics, the mean, median, and mode describe the centre, while the range, interquartile range (IQR), and standard deviation describe the spread. A box plot is a visualisation tool that captures both pieces of information in a single diagram, and an outlier is defined using the IQR. Once you systematise how to summarise data with numbers, you move on to correlation and regression in the next lesson.",
    objectives: [
      "Distinguish between a population and a sample, and compare the principles and trade-offs of simple random, stratified, systematic, and convenience sampling",
      "Calculate or estimate the mean, median, and mode from frequency tables and grouped data",
      "Interpret the range, interquartile range (IQR), and standard deviation, and compute them with a GDC",
      "Construct a box plot and compare the box plots of two data sets to describe centre and spread",
      "Identify outliers using the IQR criterion (Q1 − 1.5×IQR, Q3 + 1.5×IQR) and explain the effect of outliers on the mean and median",
    ],
    formulas: [
      "Sample mean: x̄ = Σ(f·x) / Σf  (frequency table)",
      "Standard deviation: σ = √(Σ(f·(x − x̄)²) / Σf)",
      "Interquartile range: IQR = Q3 − Q1",
      "Lower outlier boundary: Q1 − 1.5 × IQR",
      "Upper outlier boundary: Q3 + 1.5 × IQR",
    ],
    sections: [
      {
        title: "Sampling Methods and Bias",
        subtitle:
          "Every sampling method carries a risk of bias — the IB asks 'explain the limitation of this method in context' far more often than it asks for a numerical calculation",
        terms: [
          {
            term: "Simple Random Sampling",
            def: "A method that numbers every member of the population and selects n of them at random, using a random number table or the random number generator on a GDC. In theory it is the least biased, but it is hard to carry out when no population list exists or when the population is geographically dispersed.",
          },
          {
            term: "Stratified Sampling",
            def: "A method that divides the population into meaningful strata (by gender, year group, region, etc.) and then samples in proportion to the size of each stratum. It guarantees representation of each stratum, but defining the strata correctly requires prior knowledge.",
          },
          {
            term: "Systematic Sampling",
            def: "A method that selects every kth item from a list (e.g. every 10th customer). It is simple and fast, but if the list contains a periodic pattern, certain groups can be over- or under-represented.",
          },
          {
            term: "Convenience Sampling",
            def: "A method that selects whichever members are easiest to access (e.g. students in the front row, volunteer participants). It saves time and cost, but its bias is very large, and it appears frequently in the IB as a trap question asking 'why is the reliability of this method low?'.",
          },
        ],
        traps: [
          "When finding the sample size for each stratum in stratified sampling, you must compute 'stratum size / population size × total sample size' separately for every stratum. Taking the same number from each stratum is not stratified sampling but is closer to quota sampling. In the IB, proportional allocation is the default assumption.",
          "Do not confuse convenience sampling with volunteer sampling. A volunteer sample is made up of members who decided to take part themselves, so a group with particular opinions or characteristics is over-represented — this is self-selection bias. When an IB context question mentions 'people who voluntarily responded to an internet survey', you should point out this bias.",
        ],
        example:
          "A school has 600 students. The student body consists of 200 in Year 1, 220 in Year 2, and 180 in Year 3, and we wish to take a stratified sample of 60. Let's find how many to take from each year. Sample ratio: 60/600 = 0.1. Year 1: 200 × 0.1 = 20 students. Year 2: 220 × 0.1 = 22 students. Year 3: 180 × 0.1 = 18 students. Total: 20 + 22 + 18 = 60 students. In IB exams, finding the number to sample is often followed by an additional written-response question such as 'explain why this method is better than simple random sampling'.",
      },
      {
        title: "Descriptive Statistics, Box Plots, and Outliers",
        subtitle:
          "The mean is sensitive to outliers while the median is robust — the ability to judge in context which average is more appropriate is the core of IB written response",
        terms: [
          {
            term: "Measures of Central Tendency",
            def: "Methods that summarise a data set with a single representative value. Mean: the sum of all values divided by the count, sensitive to outliers. Median: the middle value after sorting, robust to outliers. Mode: the most frequently occurring value, suitable for categorical data. The question 'explain with reasons which average is more appropriate' is a staple in IB items.",
          },
          {
            term: "Measures of Dispersion",
            def: "Values that indicate how widely the data are spread. Range = maximum − minimum. Interquartile range (IQR) = Q3 − Q1, the range of the middle 50%, robust to outliers. Standard deviation (σ) is the average distance of each value from the mean, and is sensitive to outliers.",
          },
          {
            term: "Box Plot / Box-and-Whisker Diagram",
            def: "A diagram visualising the minimum, Q1, median, Q3, and maximum (or the minimum and maximum excluding outliers). The box represents the IQR, and the whiskers represent the range of the data excluding outliers. Outliers are marked as separate points (×). It is the most powerful visualisation tool when comparing two data sets side by side.",
          },
          {
            term: "Outlier",
            def: "An observation smaller than Q1 − 1.5×IQR or larger than Q3 + 1.5×IQR. This IQR criterion is the standard in the IB. The presence of outliers is the key factor in deciding whether the mean (sensitive) or the median (robust) is the more appropriate average.",
          },
        ],
        traps: [
          "When finding the mean from grouped data, you must use the midpoint of each class. Using the lower or upper bound of the class directly is wrong. Because this is a frequent mistake in IB items, build the reflex that the midpoint of the class '10 ≤ x < 20' is 15.",
          "On a box plot, the end of each whisker must always be an actual data value. The outlier boundaries (Q1 − 1.5×IQR, Q3 + 1.5×IQR) are not the ends of the whiskers. The whisker should extend to the minimum and maximum data values that lie within the boundaries. Drawing the boundary itself as the whisker end is a frequent mistake.",
        ],
        example:
          "The following data are the test scores of 10 students: 45, 52, 58, 61, 63, 67, 70, 75, 82, 97. Q1 = 58, Q3 = 75, IQR = 75 − 58 = 17. Lower outlier boundary: 58 − 1.5×17 = 58 − 25.5 = 32.5. Upper outlier boundary: 75 + 1.5×17 = 75 + 25.5 = 100.5. Since 97 ≤ 100.5, it is not an outlier. As all values lie within the boundaries, the whiskers extend from 45 to 97. Mean = (45+52+…+97)/10 = 670/10 = 67.0, median = (63+67)/2 = 65.0. Even with no outlier, 97 lengthens the right tail of the distribution, so the mean appears larger than the median — in such a case the median is the more representative measure of centre.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u4-l2",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 4,
    lessonNum: 2,
    unitName: "Statistics & Probability",
    title: "Correlation and Regression: Pearson's r, the Least-Squares Line, Interpolation and Extrapolation",
    subtitle:
      "Even if you get r = 0.9, writing only 'strong correlation' earns half the marks in the IB — describe 'direction and strength in context', and always guard against the trap that correlation is not causation",
    overview:
      "Measuring whether two variables 'tend to change together' is correlation, and modelling that tendency with a straight line is linear regression. In IB Math AI, correlation and regression are among the core topics of Paper 2 and appear almost every year without fail. Pearson's correlation coefficient (Pearson's r) is a value between −1 and 1 that indicates the strength and direction of a linear relationship. The least-squares regression line (y = ax + b) is computed by your GDC, but deciding from context 'which variable is x (the explanatory/independent variable) and which is y (the response/dependent variable)' is something a human must do. The difference between interpolation and extrapolation, and the fact that correlation ≠ causation, are conceptual traps the IB has repeated for decades. In this lesson you train numerical calculation and conceptual judgement at the same time.",
    objectives: [
      "Produce a scatter diagram and visually identify linear, non-linear, and no-correlation patterns",
      "Find the value of Pearson's r with a GDC and interpret the strength (weak/moderate/strong) and direction (positive/negative) of the correlation in context",
      "Find the gradient and intercept of the least-squares regression line ŷ = ax + b and interpret them in the language of the context",
      "Distinguish between interpolation and extrapolation and explain why extrapolation has low reliability",
      "Explain the difference between correlation and causation and apply the concept of a lurking variable",
    ],
    formulas: [
      "Pearson's correlation coefficient: r = Σ(x − x̄)(y − ȳ) / √(Σ(x − x̄)² · Σ(y − ȳ)²)",
      "Least-squares regression line: ŷ = ax + b",
      "Gradient: a = r · (Sᵧ / Sₓ)",
      "The regression line always passes through the point (x̄, ȳ)",
      "|r| ≥ 0.75: strong correlation / 0.50 ≤ |r| < 0.75: moderate correlation / |r| < 0.50: weak correlation (general IB guideline)",
    ],
    sections: [
      {
        title: "Pearson's Correlation Coefficient and Interpreting Scatter Diagrams",
        subtitle:
          "The sign of r gives the direction and its magnitude gives the strength — practising the expression of both pieces of information as a complete sentence in the language of the context is what earns marks in IB written response",
        terms: [
          {
            term: "Pearson's Correlation Coefficient (r)",
            def: "A numerical value in the range −1 ≤ r ≤ 1 expressing the strength and direction of the linear relationship between two continuous variables. r = 1 means a perfect positive linear relationship, r = −1 a perfect negative linear relationship, and r = 0 no linear relationship. It is computed with the statistics function of a GDC (STAT → LinReg) and is written to 3 s.f. in the IB.",
          },
          {
            term: "Scatter Diagram",
            def: "A graph representing pairs of two variables as coordinates. The x-axis (explanatory variable) and y-axis (response variable) must be placed correctly according to the context. From the pattern of the points you judge visually whether the correlation is positive, negative, or absent, and whether it is linear or non-linear.",
          },
          {
            term: "Explanatory & Response Variable",
            def: "Explanatory variable (x): the variable used to explain or predict (e.g. study time, amount of fertiliser). Response variable (y): the variable being predicted (e.g. test score, crop yield). In IB items, judging from context which variable is x and which is y is essential — the y on x regression and the x on y regression have different gradients.",
          },
          {
            term: "Lurking Variable",
            def: "A third variable that influences both variables and causes a strong correlation to be observed even when there is no causal relationship. Example: 'ice-cream sales and the number of drownings' has a high r, but both variables are influenced by the lurking variable 'temperature'. Whenever you interpret a correlation as causation, you must always consider the possibility of a lurking variable.",
          },
        ],
        traps: [
          "Giving only the value of r and omitting the context is a half-finished answer in the IB. You must describe it as a complete sentence that includes the strength (strong) + direction (positive) + type of relationship (linear) + the names of the variables, as in 'there is a strong positive linear correlation between study time and test score, r = 0.87'. Writing only the number r = 0.87 is B0 (no mark) in the IB markscheme.",
          "A strong correlation does not establish a causal relationship (correlation does not imply causation). This trap appears in the IB exam every year. The claim 'because there is a strong correlation, we can conclude that x causes y' is always an incorrect statement. You must mention the possibility of a lurking variable or a confounding variable.",
        ],
        example:
          "A study examined GDP per capita (in tens of thousands of dollars) and life expectancy (in years) for 8 countries. The result computed with a GDC is r = 0.923. Let's interpret this result. 'There is a strong positive linear correlation between GDP per capita and life expectancy (r = 0.923). This indicates that countries with a higher GDP per capita tend to have a higher life expectancy.' However, this does not mean a causal relationship in which GDP directly raises life expectancy. Lurking variables such as access to healthcare, level of nutrition, and education may influence both variables. In IB Paper 2, such interpretive descriptions commonly account for 2–3 marks.",
      },
      {
        title: "The Least-Squares Regression Line, Interpolation and Extrapolation",
        subtitle:
          "The regression line is a prediction tool — interpolation within the range of the data is reliable, but extrapolation outside the range is always risky because the model may not hold in that region",
        terms: [
          {
            term: "Least-Squares Regression Line",
            def: "The line ŷ = ax + b that minimises the sum of the squared vertical distances between each point and the line. It is also called the 'y on x regression line'. This line always passes through (x̄, ȳ), and in the IB you find a and b with a GDC. The gradient a is interpreted as 'the average change in the response variable when the explanatory variable increases by 1 unit'.",
          },
          {
            term: "Interpolation",
            def: "Using the regression line to predict ŷ for an x value that lies within the range of the data. Since the model is likely to hold within the interval where data exist, it is relatively reliable. In IB exams, after making an interpolation prediction it is good practice to state in a sentence 'why it is reliable'.",
          },
          {
            term: "Extrapolation",
            def: "Using the regression line to predict ŷ for an x value that lies outside the range of the data. Since there is no guarantee that the model maintains a linear relationship in that region, its reliability is low. Example: using a height–weight regression line to predict the weight of a person 3 m tall is extrapolation and gives a meaningless result.",
          },
          {
            term: "Coefficient of Determination (r²)",
            def: "The square of r, the proportion of the variation in the response variable that can be explained by the explanatory variable through the regression line. If r = 0.9 then r² = 0.81, interpreted as 'the explanatory variable explains 81% of the variation in y'. In IB SL, r is used more often than r², but an interpretation of r² may be required in high-mark items.",
          },
        ],
        traps: [
          "The y on x regression line is used to predict y from x. To predict x from y you need the x on y regression line, and the two lines are different (unless r = ±1). In IB exams, 'the line that predicts weight given height' and 'the line that predicts height given weight' are different lines. Check from the problem which direction of prediction is needed.",
          "After making an extrapolation prediction, you must always note the limitation that 'this prediction is unreliable'. In the IB markscheme there are cases where you must state, after an extrapolation result, 'unreliable / not valid because it is outside the data range' to earn the mark. Build the habit of first judging whether it is extrapolation or interpolation.",
        ],
        example:
          "Surveying the average daily study time (x) and final exam score (y) of 7 students gave, via GDC, ŷ = 8.4x + 32.1, r = 0.962. (a) Find the predicted score for a student who studies 5 hours a day. ŷ = 8.4(5) + 32.1 = 42 + 32.1 = 74.1 marks. If the range of the original data is 2–8 hours, then 5 hours is interpolation and so it is reliable. (b) Predicted score for a student who studies 12 hours a day: ŷ = 8.4(12) + 32.1 = 100.8 + 32.1 = 132.9 marks. This exceeds the maximum of 100 and lies outside the data range, so it is extrapolation. This prediction is unreliable, and the linear model is not appropriate in this range. (c) Interpretation of the gradient 8.4: when daily study time increases by 1 hour, the final exam score increases by 8.4 marks on average.",
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u4-l3",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 4,
    lessonNum: 3,
    unitName: "Statistics & Probability",
    title: "Probability, the Binomial Distribution, the Normal Distribution, and the χ² Test of Independence",
    subtitle:
      "Finding the inverse normal of the normal distribution and the cumulative probability of the binomial distribution with a GDC is a technique — but 'which distribution to use and why' and stating the H₀ of a χ² test are the core of the IB marks",
    overview:
      "The final lesson of IB Math AI Unit 4 is probability and distributions, together with the chi-squared (χ²) test. The probability part covers the addition rule for combined events, conditional probability, and the condition for independence. The distributions part introduces two key models: the binomial distribution and the normal distribution. The binomial distribution is the distribution of 'the number of successes when a trial with success probability p is repeated n times', while the normal distribution is the bell-shaped continuous distribution that appears frequently in natural and social phenomena. For both distributions you find the cumulative probability (cdf) and the inverse with a GDC, and the key skill is judging 'which distribution to apply in which situation'. The χ² test of independence is a hypothesis test that examines the independence of two categorical variables, and the comparison of the p-value with the significance level determines the conclusion. These three parts are combined in the highest-mark items of Paper 2.",
    objectives: [
      "Apply the addition rule P(A∪B) = P(A) + P(B) − P(A∩B) and conditional probability P(A|B) = P(A∩B)/P(B)",
      "Compute the probabilities P(X = k), P(X ≤ k), P(X ≥ k) of the binomial distribution X ~ B(n, p) with a GDC",
      "Find P(a < X < b) for the normal distribution X ~ N(μ, σ²) using a GDC, and compute quantiles with the inverse normal distribution",
      "Convert to the standard normal distribution (z-score) to compare different normal distributions",
      "State H₀ and H₁ correctly in a χ² test of independence and reach a conclusion by comparing the p-value with the significance level",
    ],
    formulas: [
      "Addition rule: P(A∪B) = P(A) + P(B) − P(A∩B)",
      "Conditional probability: P(A|B) = P(A∩B) / P(B)",
      "Independence condition: P(A∩B) = P(A) × P(B)",
      "Binomial distribution: P(X = k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ",
      "Binomial expected value: E(X) = np,  variance: Var(X) = np(1−p)",
      "Standardisation: z = (x − μ) / σ",
      "χ² test statistic: χ² = Σ (O − E)² / E",
      "Expected frequency: E = (row total × column total) / grand total",
    ],
    sections: [
      {
        title: "The Binomial and Normal Distributions — Which Distribution to Use When",
        subtitle:
          "The binomial distribution is 'discrete, a count, fixed n and p'; the normal distribution is 'continuous, a measurement, bell-shaped' — this criterion is the first gateway of an IB item",
        terms: [
          {
            term: "Binomial Distribution, B(n, p)",
            def: "The distribution of the number of successes X when a trial is repeated n times under identical conditions, the success probability of each trial is constant at p, and the trials are mutually independent. Examples: the number of heads when a coin is tossed 10 times; the number of defective items when 20 are drawn from a process with defect probability 0.05. GDC: binompdf(n, p, k) = P(X=k), binomcdf(n, p, k) = P(X≤k).",
          },
          {
            term: "Normal Distribution, N(μ, σ²)",
            def: "A bell-shaped continuous probability distribution that is symmetric about the mean μ. It applies broadly to natural and social phenomena (height, weight, measurement error, etc.). GDC: normalcdf(a, b, μ, σ) = P(a < X < b). Inverse normal: invNorm(p, μ, σ) finds the x such that P(X < x) = p. The 68-95-99.7 rule: 68% of the data lie within μ±σ, 95% within μ±2σ, and 99.7% within μ±3σ.",
          },
          {
            term: "Standardisation & z-score",
            def: "The process of converting a normal distribution to the standard normal distribution N(0, 1). z = (x − μ)/σ. The z-score indicates 'how many standard deviations away from the mean a value is', and is used to compare relative positions across different distributions (e.g. a maths score and an English score). With a GDC you can compute directly without converting, but you must understand the concept.",
          },
          {
            term: "Conditions for Using the Normal Distribution",
            def: "A binomial distribution B(n, p) can be approximated by a normal distribution when n is large and p is near 0.5 (the criteria np ≥ 5, n(1−p) ≥ 5). In IB AI SL the GDC is used, so computing the binomial distribution directly is preferred, and the normal approximation is required only at the level of conceptual understanding.",
          },
        ],
        traps: [
          "In the binomial distribution, P(X ≥ k) is the complement of P(X ≤ k − 1), so it must be computed as 1 − binomcdf(n, p, k−1). binomcdf(n, p, k) computes P(X ≤ k), so confusing 'at least (≥)' with 'at most (≤)' and using it directly gives a completely different value. Always check the direction of the inequality before computing on the GDC.",
          "When using the inverse normal (invNorm), the p you enter is always the left-hand cumulative probability (P(X < x)). To find 'what score is in the top 5%', P(X > x) = 0.05, so you must enter P(X < x) = 0.95 into invNorm. The mistake of entering p directly without distinguishing 'top' from 'bottom' is frequent.",
        ],
        example:
          "The diameter of bolts produced at a factory follows a normal distribution with mean μ = 10 mm and standard deviation σ = 0.3 mm. (a) The probability that a randomly drawn bolt has a diameter between 9.5 mm and 10.5 mm: by GDC, normalcdf(9.5, 10.5, 10, 0.3) ≈ 0.904. That is, about 90.4% of bolts lie within the specification range. (b) The diameter of bolts in the top 2%: P(X > x) = 0.02 → P(X < x) = 0.98. invNorm(0.98, 10, 0.3) ≈ 10.616 mm. Therefore bolts with a diameter of about 10.6 mm or more fall in the top 2%. (c) If the defect criterion is a diameter below 9.4 mm and 100 are produced, the expected number of defective items: P(X < 9.4) = normalcdf(−∞, 9.4, 10, 0.3) ≈ 0.0228. Y ~ B(100, 0.0228), E(Y) = 100 × 0.0228 ≈ 2.28 items.",
      },
      {
        title: "The χ² Test of Independence — Testing the Relationship Between Two Categorical Variables",
        subtitle:
          "The conclusion of a χ² test must always end with a statement about H₀ — complete the expression, with context, that if p < α reject H₀, and if p ≥ α fail to reject H₀",
        terms: [
          {
            term: "Chi-Squared Test of Independence",
            def: "A statistical method that tests whether two categorical variables are independent of each other. It compares the observed frequencies (O) and expected frequencies (E) of a contingency table to compute the test statistic χ² = Σ(O−E)²/E. Using the χ²-test function of a GDC, you can obtain the p-value directly.",
          },
          {
            term: "H₀ and H₁ (Null and Alternative Hypotheses)",
            def: "In a χ² test of independence, H₀: 'the two variables are independent' / H₁: 'the two variables are not independent'. In the IB you must state these including the variable names. Example: H₀: 'gender and preferred subject are independent.' H₁: 'gender and preferred subject are not independent.'",
          },
          {
            term: "Expected Frequency (E)",
            def: "The frequency expected in each cell when the null hypothesis is true (when there is independence). E = (row total × column total) / grand total. In the IB, if any cell has an expected frequency below 5, the conditions for applying the χ² test may not be met. Checking this condition is the first thing to verify before the test.",
          },
          {
            term: "Significance Level & p-value",
            def: "Significance level (α): the threshold for rejecting the null hypothesis (α = 0.05 is the default in the IB, stated in the problem). p-value: the probability, when the null hypothesis is true, of obtaining a result at least as extreme as the observed test statistic. If p < α you reject H₀ and conclude the two variables are not independent. If p ≥ α you fail to reject H₀.",
          },
        ],
        traps: [
          "Writing 'accept H₀' in the conclusion of a χ² test is wrong in the IB. The correct expression is 'there is insufficient evidence to reject H₀' or 'fail to reject H₀'. This is because statistics does not prove that the null hypothesis 'is true' but judges whether there is sufficient evidence to reject it.",
          "Confirming from a χ² test that two variables are not independent does not establish a causal relationship. You should say they are 'associated', and avoid the expression that one 'causes' the other. As with correlation, a χ² test only shows association.",
        ],
        example:
          "A survey of 200 students examined the relationship between gender (male/female) and preferred subject (mathematics/science/humanities). Observed frequency table: male — mathematics 45, science 30, humanities 25 / female — mathematics 35, science 25, humanities 40. Test for independence at significance level α = 0.05. H₀: gender and preferred subject are independent. H₁: gender and preferred subject are not independent. After entering the data into the χ²-test function of a GDC, the results are: χ² ≈ 6.43, p ≈ 0.0401, degrees of freedom (df) = (2−1)(3−1) = 2. Conclusion: since p = 0.0401 < α = 0.05, we reject H₀ at the 5% significance level. There is sufficient evidence that there is a statistically significant association between gender and preferred subject. Check the expected frequencies: the smallest cell E = (100×80)/200 = 40 > 5, so the condition for applying the test is satisfied.",
      },
    ],
  },
];
