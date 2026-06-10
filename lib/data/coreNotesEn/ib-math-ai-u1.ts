/**
 * Core Notes English version — IB Math AI (Applications & Interpretation) Unit 1.
 * Faithful English translation of the Korean storytelling edition.
 * Covers IB DP Math AI official syllabus Topic 1: Number & Algebra in full,
 * with narrative overviews, exam traps, and worked examples.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AI_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-math-ai-u1-l1",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 1,
    lessonNum: 1,
    unitName: "Number & Algebra",
    title: "Approximation, Significant Figures, and Percentage Error",
    subtitle:
      "Why real-world measurements are never perfectly exact — and how IB exams quantify that error",
    overview:
      "IB Math AI opens with a fundamental message: mathematics is a tool for modelling the real world. That is why the very first unit teaches you that mistakes are unavoidable. Every measurement is an approximation, and what matters is not how small the error is, but how significant it is. Significant figures and percentage error are the tools that let you pin that significance down numerically. Even though this course is calculator-allowed, not knowing when to round will cost you marks on both Paper 1 and Paper 2.",
    objectives: [
      "Round a measurement to a specified number of significant figures",
      "Use the percentage error formula to calculate the error between an approximate value and an exact value",
      "Distinguish between rounding error and truncation error",
      "Decide when to present a result to a reasonable degree of accuracy given the context",
    ],
    formulas: [
      "% error = |v_A − v_E| / |v_E| × 100",
      "Rounding: if the first discarded digit ≥ 5, round up; if < 5, round down",
    ],
    sections: [
      {
        title: "Approximations and Significant Figures",
        subtitle:
          "Changing the way you read a number changes the precision it conveys — you must count meaningful digits, not decimal places",
        terms: [
          {
            term: "Approximation",
            def: "A value that is close to, but not exactly equal to, the true value of a measurement or calculation. Every real-world measurement is an approximation because of the limitations of measuring instruments.",
          },
          {
            term: "Significant Figures (s.f.)",
            def: "All digits that carry meaning, starting from the first non-zero digit. For example, 0.00340 has 3 significant figures (3, 4, and the trailing 0) — the leading zeros merely indicate magnitude.",
          },
          {
            term: "Rounding",
            def: "Replacing a number with the nearest value at the required precision. If the first digit being dropped is 5 or more, round up; if less than 5, truncate.",
          },
          {
            term: "Truncation",
            def: "Dropping all digits beyond a certain precision without rounding. Truncating 3.987 to two decimal places gives 3.98 — rounding would give 3.99. Truncation errors are common in computer arithmetic.",
          },
        ],
        traps: [
          "On IB exams, students often ignore the instruction '3 s.f.' and either copy the calculator display or confuse significant figures with decimal places. Writing 0.003070 to 3 s.f. gives 0.00307 — the leading zeros are not significant, but the trailing zero is explicitly meaningful and must be kept.",
          "Rounding should be done only in the final answer. Rounding intermediate steps too early introduces cumulative error that can make the final answer wrong — this is called rounding error propagation.",
        ],
        example:
          "Let's work through a percentage error calculation. A student measures the area of a rectangle and obtains 48.2 cm². The actual area is 50.0 cm². Percentage error = |48.2 − 50.0| / |50.0| × 100 = 1.8 / 50.0 × 100 = 3.6%. The measurement has a 3.6% error. IB mark schemes often accept the result without a sign (absolute value), but remember: the denominator in the formula is always the expected (true) value v_E.",
      },
      {
        title: "The Structure of Percentage Error",
        subtitle:
          "Why relative size matters more than absolute size — and why the true value always goes in the denominator",
        terms: [
          {
            term: "Absolute Error",
            def: "The absolute difference between the approximate and exact values: |v_A − v_E|. It carries units, and on its own is not enough to judge whether an error is serious.",
          },
          {
            term: "Relative Error",
            def: "Absolute error divided by the true value: |v_A − v_E| / |v_E|. Dimensionless, so it enables comparison of errors across measurements with different units or scales.",
          },
          {
            term: "Percentage Error",
            def: "Relative error multiplied by 100: |v_A − v_E| / |v_E| × 100. This formula appears directly in the IB formula booklet and is used on both Paper 1 and Paper 2.",
          },
        ],
        traps: [
          "In the percentage error formula, the denominator must be the expected (true) value v_E — never the approximate value. Swapping them gives a completely different result. IB problems sometimes reverse 'approximate' and 'true' as a deliberate trap, so always identify which value is v_A and which is v_E before substituting.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u1-l2",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 1,
    lessonNum: 2,
    unitName: "Number & Algebra",
    title: "Arithmetic and Geometric Sequences — and Financial Mathematics",
    subtitle:
      "Why sequence formulas are more than memorisation — modelling bank interest, annuities, and loan repayments with mathematics",
    overview:
      "This is where IB Math AI diverges most sharply from courses like AP Calculus AB. Sequences and series are not taught as abstract proofs; they are applied immediately to real money problems. An arithmetic sequence models saving a fixed amount each month. A geometric sequence models a bank account earning compound interest. Knowing the formula is less important than recognising whether a situation is arithmetic or geometric — get that judgement wrong and the formula is useless regardless of how carefully you apply it.",
    objectives: [
      "Use the common difference and common ratio to find the general term of arithmetic and geometric sequences",
      "Apply the sum formulas for arithmetic and geometric series to calculate the sum of n terms",
      "Model simple interest as an arithmetic sequence and compound interest as a geometric sequence",
      "Use the IB financial mathematics formulas to calculate future value (FV) and present value (PV)",
      "Explain why the geometric series sum formula applies to annuity and loan repayment problems",
    ],
    formulas: [
      "Arithmetic general term: u_n = u_1 + (n−1)d",
      "Arithmetic series sum: S_n = n/2 × (u_1 + u_n) = n/2 × (2u_1 + (n−1)d)",
      "Geometric general term: u_n = u_1 × r^(n−1)",
      "Geometric series sum (r ≠ 1): S_n = u_1(r^n − 1) / (r − 1)",
      "Simple interest: FV = PV × (1 + rn/100)",
      "Compound interest: FV = PV × (1 + r/100k)^(kn)  [k = number of compounding periods per year]",
    ],
    sections: [
      {
        title: "Arithmetic Sequences — A World of Repeated Addition",
        subtitle:
          "Once you recognise a constant common difference (d), you can find the 100th term without any tedious counting",
        terms: [
          {
            term: "Arithmetic Sequence",
            def: "A sequence in which the difference between consecutive terms (the common difference d) is constant. Example: 3, 7, 11, 15, … has d = 4. Each term is obtained by adding d to the previous term.",
          },
          {
            term: "Common Difference (d)",
            def: "The constant gap between consecutive terms in an arithmetic sequence: d = u_{n+1} − u_n. A positive d gives an increasing sequence; a negative d gives a decreasing sequence.",
          },
          {
            term: "Arithmetic Series",
            def: "The sum of the terms of an arithmetic sequence. S_n is the sum of the first n terms; if the first and last terms are known, it simplifies to S_n = n/2 × (u_1 + u_n).",
          },
          {
            term: "Simple Interest",
            def: "Interest that is calculated on the principal only. Because the same fixed amount of interest is added each period, the balance forms an arithmetic sequence. FV = PV + PV × r/100 × n = PV(1 + rn/100).",
          },
        ],
        traps: [
          "The arithmetic general-term formula uses (n−1), not n. When n = 1, you need u_1 = u_1 + 0 × d — so the exponent on d must be (n−1). Finding the 10th term requires substituting n = 10, giving (10−1) = 9 multiplied by d. Forgetting the '−1' is the single most common arithmetic error on IB exam questions of this type.",
        ],
        example:
          "A person saves €200 in the first month and increases their monthly savings by €50 each month. How much do they save in month 12? u_1 = 200, d = 50, n = 12. u_12 = 200 + (12−1) × 50 = 200 + 550 = €750. What is the total saved over 12 months? S_12 = 12/2 × (200 + 750) = 6 × 950 = €5700. This situation is arithmetic because the monthly increase in savings is constant (+€50).",
      },
      {
        title: "Geometric Sequences — A World of Repeated Multiplication, and the Mathematics of Compound Interest",
        subtitle:
          "A constant common ratio (r) produces exponential growth or decay — compound interest, population growth, radioactive decay",
        terms: [
          {
            term: "Geometric Sequence",
            def: "A sequence in which the ratio between consecutive terms (the common ratio r) is constant. Example: 2, 6, 18, 54, … has r = 3. Each term is obtained by multiplying the previous term by r.",
          },
          {
            term: "Common Ratio (r)",
            def: "The constant multiplier between consecutive terms: r = u_{n+1} / u_n. |r| > 1 gives exponential growth; 0 < |r| < 1 gives exponential decay.",
          },
          {
            term: "Compound Interest",
            def: "Interest calculated on both the principal and the accumulated interest. The balance forms a geometric sequence. With k compounding periods per year: FV = PV × (1 + r/(100k))^(kn), where r is the annual rate (%), n is the number of years, and k is the compounding frequency.",
          },
          {
            term: "Compounding Frequency (k)",
            def: "The number of times per year that interest is added to the principal. k = 1 is annual compounding, k = 12 is monthly, k = 365 is daily. The higher k is, the larger the final amount for the same nominal annual rate.",
          },
        ],
        traps: [
          "Confusing simple interest and compound interest is extremely common. Even '5% interest per year' gives completely different formulas: simple interest → u_n = PV(1 + 0.05n); compound interest → u_n = PV × (1.05)^n. If the exam question specifies 'simple interest' or 'compound interest', you must use a different formula. Over long time horizons the two values diverge dramatically.",
          "In the compound interest formula, check whether the rate is entered as a percentage or as a decimal. If r = 5%, you must substitute r/100 = 0.05. Leaving it as 5 gives FV = PV × (1 + 5/k)^(kn), which is completely wrong.",
        ],
        example:
          "€5000 is deposited at an annual rate of 4%, compounded quarterly (k = 4), for 3 years. What is the final amount? FV = 5000 × (1 + 4/(100 × 4))^(4 × 3) = 5000 × (1 + 0.01)^12 = 5000 × (1.01)^12. Since (1.01)^12 ≈ 1.12683, FV ≈ €5634.15. Under simple interest with the same conditions: FV = 5000 × (1 + 4 × 3/100) = 5000 × 1.12 = €5600. After 3 years the difference is about €34 — but over 30 years it becomes enormous. That is the power of compounding.",
      },
      {
        title: "Future Value, Present Value, and Annuities",
        subtitle:
          "The core of IB financial mathematics — linking 'money today' with 'money in the future' using the geometric series sum structure",
        terms: [
          {
            term: "Future Value (FV)",
            def: "The value that a present amount will grow to at a specified future date, after earning interest. Calculated using the compound interest formula: FV = PV × (1 + r/100k)^(kn).",
          },
          {
            term: "Present Value (PV)",
            def: "The value today of an amount to be received or paid in the future. Solved from the FV formula: PV = FV / (1 + r/100k)^(kn). This process is also called discounting.",
          },
          {
            term: "Annuity",
            def: "A financial product involving equal, regular payments made or received over a fixed period. Because each payment earns interest for a different number of periods, the total value is calculated as a geometric series sum.",
          },
        ],
        traps: [
          "In annuity problems, you must distinguish whether payments are made at the beginning of each period (annuity-due) or at the end (ordinary annuity). IB exams usually assume end-of-period payments, but always check if the question specifies. When using the GDC TVM (Time Value of Money) function, the Begin/End setting changes the result.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-math-ai-u1-l3",
    courseId: "ib-math-ai",
    subjectLabel: "IB Math AI",
    emoji: "📊",
    unit: 1,
    lessonNum: 3,
    unitName: "Number & Algebra",
    title: "Exponents and Logarithms — Applications and Standard Form",
    subtitle:
      "Why the laws of exponents become the laws of logarithms — and why logarithmic transformations are so powerful in science and finance",
    overview:
      "When students first encounter logarithms, the inevitable question is: 'Where is this actually used?' IB Math AI answers immediately. Earthquake magnitude (Richter scale), sound intensity (dB), pH, population growth modelling — none of these can be expressed without logarithms. Standard form (scientific notation) is also an extension of the laws of exponents, and it is the shared language of IB mathematics and science subjects whenever numbers are extremely large or extremely small. This lesson connects exponent laws → logarithm laws → real-world applications in a single through-line.",
    objectives: [
      "Apply the laws of exponents to simplify exponential expressions or solve equations",
      "Use the definition log_a(b) = c ↔ a^c = b to convert between exponential and logarithmic form",
      "Use the laws of logarithms (product, quotient, power rules) to simplify logarithmic expressions",
      "Express numbers in standard form a × 10^k (1 ≤ a < 10) and perform arithmetic in that form",
      "Apply exponential and logarithmic functions to real-world contexts such as population growth, radioactive decay, and half-life",
    ],
    formulas: [
      "Laws of exponents: a^m × a^n = a^(m+n),  a^m / a^n = a^(m−n),  (a^m)^n = a^(mn)",
      "Logarithm definition: log_a(b) = c  ⟺  a^c = b",
      "Laws of logarithms: log(mn) = log m + log n,  log(m/n) = log m − log n,  log(m^n) = n·log m",
      "Common logarithm (base 10): log₁₀(x), written log(x)",
      "Natural logarithm (base e): ln(x) = log_e(x)",
      "Change of base formula: log_a(b) = log(b) / log(a)",
      "Standard form: a × 10^k,  1 ≤ a < 10, k ∈ ℤ",
    ],
    sections: [
      {
        title: "Laws of Exponents and Standard Form",
        subtitle:
          "The rules for operating on powers are in exact symmetry with the laws of logarithms — understand the connection and both become straightforward",
        terms: [
          {
            term: "Exponent (Index)",
            def: "The number indicating how many times a base is multiplied by itself. In a^n, a is the base and n is the exponent. A negative exponent means a reciprocal (a^(−n) = 1/a^n); a fractional exponent means a root (a^(1/n) = ⁿ√a).",
          },
          {
            term: "Standard Form (Scientific Notation)",
            def: "A way of writing very large or very small numbers as a × 10^k where 1 ≤ a < 10 and k is an integer. For example: 602,000,000,000,000,000,000,000 = 6.02 × 10²³. Widely used alongside IB science subjects.",
          },
          {
            term: "Laws of Exponents",
            def: "Three core rules governing multiplication, division, and powers of exponential expressions: a^m × a^n = a^(m+n), a^m ÷ a^n = a^(m−n), (a^m)^n = a^(mn). Each of these corresponds exactly to one of the three laws of logarithms.",
          },
          {
            term: "Fractional Exponent",
            def: "An exponent expressed as a fraction: a^(p/q) = (ⁿ√a)^p = ⁿ√(a^p). Example: 8^(2/3) = (∛8)² = 2² = 4.",
          },
        ],
        traps: [
          "In standard form, a must satisfy 1 ≤ a < 10. The expression 0.45 × 10³ is not in standard form — it should be written as 4.5 × 10². On IB questions that ask you to present a calculated answer in standard form, leaving a < 1 costs marks.",
          "The laws of exponents only apply when the bases are identical. 2³ × 3² ≠ 6^5 — the exponent laws cannot be applied here; you must calculate each factor separately (8 × 9 = 72). Always check whether the bases match before reaching for an exponent law.",
        ],
        example:
          "Simplify (2^5 × 4^3) ÷ 8^4 using the laws of exponents. The key strategy is to rewrite everything as a power of 2: 4 = 2², 8 = 2³. (2^5 × (2²)^3) ÷ (2³)^4 = (2^5 × 2^6) ÷ 2^12 = 2^(5+6) ÷ 2^12 = 2^11 ÷ 2^12 = 2^(11−12) = 2^(−1) = 1/2. Unifying the base is always the first move.",
      },
      {
        title: "The Definition and Laws of Logarithms",
        subtitle:
          "A logarithm is the inverse of an exponent — it answers the question 'what power do I need?'",
        terms: [
          {
            term: "Logarithm",
            def: "The inverse operation of exponentiation. log_a(b) = c is equivalent to a^c = b. It answers: 'To what power must a be raised to produce b?' For instance, log₁₀(1000) = 3 because 10³ = 1000.",
          },
          {
            term: "Common Logarithm",
            def: "The logarithm with base 10: log₁₀(x), usually written log(x). This is what the 'log' button on a calculator computes. Used extensively in scientific scales such as pH = −log[H⁺] and the Richter scale.",
          },
          {
            term: "Natural Logarithm",
            def: "The logarithm with base e (≈ 2.718): ln(x) = log_e(x). It appears alongside the exponential function e^x in natural growth and decay models (population, radioactive decay).",
          },
          {
            term: "Laws of Logarithms",
            def: "log(mn) = log m + log n (product rule), log(m/n) = log m − log n (quotient rule), log(m^n) = n·log m (power rule). These three rules correspond exactly to the three laws of exponents (addition, subtraction, multiplication of exponents).",
          },
        ],
        traps: [
          "log(m + n) ≠ log m + log n. The addition law applies to the logarithm of a product, not to the sum of arguments. There is no further simplification for log(m + n). This is overwhelmingly the most common error in IB logarithm questions.",
          "When solving a logarithmic equation, always verify that the solution does not make any argument of a logarithm negative or zero. For log(x − 3), the domain requires x − 3 > 0, so x > 3. If your solution gives x = 2, it lies outside the domain and must be rejected.",
        ],
        example:
          "Solve 5^x = 200 for x. Take log of both sides: log(5^x) = log(200). Apply the power rule: x·log(5) = log(200). Therefore x = log(200) / log(5) = 2.301... / 0.699... ≈ 3.292. This is equivalent to using the change of base formula directly: x = log_5(200) = log(200)/log(5). On IB Paper 2 a GDC can compute this immediately, but on Paper 1 you must show this working to earn method marks.",
      },
      {
        title: "Real-World Applications of Exponential and Logarithmic Functions",
        subtitle:
          "How mathematical formulas underlie population models, half-life, and scientific scales — and why this is the foundation of AI data analysis",
        terms: [
          {
            term: "Exponential Growth Model",
            def: "A model of the form P(t) = P_0 × e^(kt) or P(t) = P_0 × r^t. When k > 0 (or r > 1) the quantity grows; when k < 0 (or 0 < r < 1) it decays. P_0 is the initial value and t is time.",
          },
          {
            term: "Half-Life",
            def: "The time required for a radioactive substance (or any decaying quantity) to fall to half its initial value. Modelled as P(t) = P_0 × (1/2)^(t/h), where h is the half-life. Frequently appears in cross-topic problems linked to IB Physics and Chemistry.",
          },
          {
            term: "Logarithmic Transformation",
            def: "Applying a logarithm to data in order to convert an exponential relationship into a linear one. Taking log of both sides of y = ab^x gives log y = log a + x·log b, which is a straight-line equation. This connects directly to IB Math AI Topic 4 (Statistics and Probability / data analysis).",
          },
        ],
        traps: [
          "In half-life problems it is tempting to count whole half-lives directly, but when the elapsed time is not an integer multiple of the half-life you need the exponential formula P(t) = P_0 × (0.5)^(t/h). If t/h is not an integer, use the GDC or logarithms to evaluate the expression.",
        ],
        example:
          "A radioactive substance has a half-life of 8 years. If the initial amount is 500 g, how much remains after 20 years? P(20) = 500 × (1/2)^(20/8) = 500 × (0.5)^2.5 = 500 × 0.17678… ≈ 88.4 g. Sanity check: after 8 years there is 250 g, after 16 years there is 125 g, and 20 years falls between 16 and 24 years (the third half-life), so 88.4 g is reasonable. Making this kind of sanity check a habit on IB exams helps catch arithmetic mistakes before they cost marks.",
      },
    ],
  },
];
