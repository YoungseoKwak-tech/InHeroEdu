/**
 * Core Notes English version — IB Math AA Unit 1 (Number & Algebra).
 * Faithful translation of the Korean storytelling original; all lessonId,
 * courseId, subjectLabel, emoji, unit, lessonNum values are identical to the
 * Korean source. Content translated to natural, exam-accurate English.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AA_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-math-aa-u1-l1",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 1,
    lessonNum: 1,
    unitName: "Number & Algebra",
    title: "Sequences & Series — Arithmetic and Geometric",
    subtitle: "How one first term and one common difference (or ratio) commands an infinite pattern of numbers",
    overview:
      "An arithmetic sequence adds a fixed amount; a geometric sequence multiplies by a fixed amount — that single distinction separates dozens of marks on IB Paper 1 and Paper 2. Memorising the general-term and sum formulas without understanding their derivation collapses the moment a question reorders the given information, but grasping the underlying logic lets you build the equation no matter how the numbers are presented. We'll extend that understanding to sigma notation so you can read any series at a glance.",
    objectives: [
      "Derive the arithmetic general term u_n = u_1 + (n−1)d and use it to find unknown terms or the number of terms",
      "Apply the arithmetic series sum formula S_n = n/2·(2u_1 + (n−1)d) to evaluate finite sums",
      "Use the geometric general term u_n = u_1 · r^(n−1) to find the common ratio or a specific term",
      "Apply the geometric series sum formula S_n = u_1(1 − r^n)/(1 − r) and explain why the infinite series S_∞ = u_1/(1 − r) converges when |r| < 1",
      "Read sigma (Σ) notation and express or expand arithmetic and geometric series in sigma form",
    ],
    formulas: [
      "u_n = u_1 + (n-1)d",
      "S_n = n/2 · (2u_1 + (n-1)d) = n/2 · (u_1 + u_n)",
      "u_n = u_1 · r^(n-1)",
      "S_n = u_1(1 - r^n) / (1 - r),  r ≠ 1",
      "S_∞ = u_1 / (1 - r),  |r| < 1",
      "Σ_{k=1}^{n} k = n(n+1)/2",
    ],
    sections: [
      {
        title: "Arithmetic Sequences",
        subtitle: "The steady staircase of common difference d — logic behind the general term and sum formula",
        terms: [
          {
            term: "Arithmetic sequence",
            def: "A sequence in which the difference between any two consecutive terms is constant. That constant difference is called the common difference d; the first term u_1 and d together fully determine the entire sequence.",
          },
          {
            term: "Common difference",
            def: "In an arithmetic sequence, d = u_{n+1} − u_n. A positive d gives an increasing sequence; a negative d gives a decreasing sequence.",
          },
          {
            term: "Arithmetic mean",
            def: "When three numbers a, m, b form an arithmetic sequence, m = (a + b)/2. Whenever a Paper 1 question states 'three numbers are in arithmetic progression', apply this relationship immediately.",
          },
          {
            term: "Arithmetic series",
            def: "The sum of the terms of an arithmetic sequence. S_n = n/2·(u_1 + u_n) has the intuitive meaning: average of first and last term, multiplied by the number of terms.",
          },
        ],
        traps: [
          "The most common error is confusing the nth term with the sum of n terms. u_n is the value of the nth term; S_n is the sum from the first term through the nth. Because questions often ask both in the same problem, always mark which quantity you are finding before you write any formula.",
          "In the sum formula S_n = n/2·(2u_1 + (n−1)d), writing u_1 instead of 2u_1 is a frequent exam mistake. Make a conscious habit of double-checking the 2u_1 factor every time you write the formula.",
        ],
        example:
          "Given an arithmetic sequence with first term 3 and common difference 5, find the 8th term and the sum of the first 8 terms. u_8 = u_1 + (8−1)d = 3 + 7×5 = 38. S_8 = 8/2·(u_1 + u_8) = 4×(3 + 38) = 4×41 = 164. The same result using the other form: S_8 = 8/2·(2·3 + 7·5) = 4·(6+35) = 4·41 = 164.",
      },
      {
        title: "Geometric Sequences & Infinite Series",
        subtitle: "The magic of a finite sum from infinitely many terms — when |r| < 1",
        terms: [
          {
            term: "Geometric sequence",
            def: "A sequence in which the ratio of any two consecutive terms is constant. That constant ratio is called the common ratio r, where u_{n+1}/u_n = r.",
          },
          {
            term: "Common ratio",
            def: "In a geometric sequence, r = u_{n+1}/u_n. When r > 1 the sequence grows explosively; when 0 < r < 1 it decreases toward zero; when r < 0 the signs alternate.",
          },
          {
            term: "Convergence condition",
            def: "For the infinite geometric series S_∞ to converge to a finite value, the condition |r| < 1 must hold. If |r| ≥ 1 the series diverges and is undefined.",
          },
          {
            term: "Infinite geometric series",
            def: "When |r| < 1, S_∞ = u_1/(1 − r). The denominator (1 − r) must not equal zero, so r ≠ 1 is implicitly included in the condition.",
          },
        ],
        traps: [
          "Using the infinite geometric series formula without first verifying |r| < 1 results in immediate mark deductions in IB marking. Whenever an infinite series appears, find the common ratio first and explicitly state whether |r| < 1 before applying the formula.",
          "When r = 1 (all terms are equal), the denominator of S_n = u_1(1 − r^n)/(1 − r) is zero, so this formula breaks down. Remember the separate result S_n = n·u_1 for this case — IB occasionally uses it as a trap.",
        ],
        example:
          "A geometric sequence has u_1 = 12 and r = 1/3. First, |r| = 1/3 < 1, so the infinite series converges. S_∞ = 12/(1 − 1/3) = 12/(2/3) = 18. The sum of the first 4 terms is S_4 = 12·(1 − (1/3)^4)/(1 − 1/3) = 12·(1 − 1/81)/(2/3) = 12·(80/81)·(3/2) = 160/9 ≈ 17.78. Notice how close S_4 is to S_∞, confirming rapid convergence.",
      },
      {
        title: "Sigma Notation",
        subtitle: "Compressing and manipulating long series with the Σ symbol",
        terms: [
          {
            term: "Sigma notation",
            def: "Σ_{k=m}^{n} f(k) = f(m) + f(m+1) + ⋯ + f(n). Here k is the summation index, m is the lower limit, and n is the upper limit.",
          },
          {
            term: "Index shift",
            def: "Rewriting a sigma sum with a different starting index while preserving the same total. For example: Σ_{k=1}^{n}(k+2) = Σ_{j=3}^{n+2} j. IB questions frequently require this manipulation.",
          },
          {
            term: "Linearity of Σ",
            def: "Σ(af(k) + bg(k)) = a·Σf(k) + b·Σg(k). Splitting a sum or factoring out constants is the key technique for reducing a complex series to a standard form.",
          },
          {
            term: "Standard sum formulas",
            def: "Σ_{k=1}^{n} 1 = n, Σ_{k=1}^{n} k = n(n+1)/2, Σ_{k=1}^{n} k² = n(n+1)(2n+1)/6. In IB AA HL these formulas are combined directly to evaluate complicated sums.",
          },
        ],
        traps: [
          "Many students mis-remember Σ_{k=1}^{n} k as n²/2. The correct formula is n(n+1)/2. Build the habit of verifying with n = 4: 1+2+3+4 = 10, and 4·5/2 = 10.",
          "When the upper limit is n−1 or n+1 rather than n, it is easy to miscalculate the number of terms. Always compute upper limit − lower limit + 1 = total number of terms and write it down before starting the solution.",
        ],
        example:
          "Evaluate Σ_{k=1}^{20}(3k − 1) using linearity. Σ_{k=1}^{20}(3k − 1) = 3·Σ_{k=1}^{20} k − Σ_{k=1}^{20} 1 = 3·(20·21/2) − 20 = 3·210 − 20 = 630 − 20 = 610. Cross-check: this is an arithmetic sequence with u_1 = 2 and d = 3, so S_20 = 20/2·(2 + 20·3 − 1) = 10·61 = 610. The fact that sigma manipulation and the arithmetic series formula yield the same answer confirms both methods are consistent.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u1-l2",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 1,
    lessonNum: 2,
    unitName: "Number & Algebra",
    title: "Laws of Exponents and Logarithms",
    subtitle: "The mirror relationship — logarithms turn multiplication into addition by reading exponents in reverse",
    overview:
      "The laws of exponents are not merely quick-calculation shortcuts; they underlie the entire structure of mathematics. Logarithms are the inverse of exponentials — they 'read the exponent backwards' — and IB continually tests the ability to move fluently between the two forms. Internalise all six exponent laws, master solving equations by applying the addition, subtraction, and power rules of logarithms, and there is no reason to lose marks on any Unit 1 question.",
    objectives: [
      "Apply the laws of exponents (product, quotient, power, fractional exponent, negative exponent) to simplify complex exponential expressions",
      "Use the definition log_a(x) = y ⟺ a^y = x to convert between exponential and logarithmic equations",
      "Apply the logarithm laws (log(xy), log(x/y), log(x^n)) to expand or condense logarithmic expressions",
      "Use the change-of-base formula log_a(x) = log_b(x)/log_b(a) to rewrite a logarithm in any desired base",
      "Solve exponential and logarithmic equations and verify solutions against the argument condition and base condition",
    ],
    formulas: [
      "a^m · a^n = a^(m+n)",
      "a^m / a^n = a^(m-n)",
      "(a^m)^n = a^(mn)",
      "a^0 = 1,  a^(-n) = 1/a^n",
      "a^(1/n) = n√a,  a^(m/n) = n√(a^m)",
      "log_a(xy) = log_a(x) + log_a(y)",
      "log_a(x/y) = log_a(x) - log_a(y)",
      "log_a(x^n) = n · log_a(x)",
      "log_a(x) = log_b(x) / log_b(a)  (change-of-base formula)",
      "log_a(a) = 1,  log_a(1) = 0",
    ],
    sections: [
      {
        title: "Laws of Exponents",
        subtitle: "Combining the six exponent laws to simplify any exponential expression",
        terms: [
          {
            term: "Fractional exponent",
            def: "a^(m/n) = (a^(1/n))^m = (ⁿ√a)^m. Remember it as: 'the denominator of the exponent is the root; the numerator is the power.' Example: 8^(2/3) = (³√8)² = 2² = 4.",
          },
          {
            term: "Negative exponent",
            def: "a^(−n) = 1/a^n. A negative exponent expresses a reciprocal relationship. The most common mistake is interpreting a^(−n) as a negative number.",
          },
          {
            term: "Zero exponent",
            def: "a^0 = 1 (a ≠ 0). Understand this by derivation: a^m / a^m = a^(m−m) = a^0, and any number divided by itself equals 1, so a^0 = 1.",
          },
          {
            term: "Power of a power",
            def: "(a^m)^n = a^(mn). The outer exponent multiplies the inner exponent. Beware of confusing this with addition: (a^m)·n ≠ a^(m+n).",
          },
        ],
        traps: [
          "a^(m+n) ≠ a^m + a^n, and (a+b)^n ≠ a^n + b^n. IB Paper 1 frequently offers these as distractor answer choices. Exponent laws apply only to products and quotients of equal bases — never to bases joined by addition or subtraction.",
          "Leaving √a as √a instead of converting it to a^(1/2), or ³√a instead of a^(1/3), causes you to miss applicable exponent laws in complex expressions. Form the habit of immediately rewriting any radical as a fractional exponent.",
        ],
        example:
          "Simplify (16x^4)^(3/4) / (2x)^(−1). First, (16x^4)^(3/4) = 16^(3/4) · x^(4·3/4) = (⁴√16)³ · x³ = 2³ · x³ = 8x³. Next, (2x)^(−1) = 1/(2x). Therefore the full expression = 8x³ ÷ (1/(2x)) = 8x³ · 2x = 16x⁴. Processing fractional and negative exponents step by step before combining is the safest approach on IB written-response questions.",
      },
      {
        title: "Logarithm Laws & Equations",
        subtitle: "Logarithm as the inverse of the exponential — replacing multiplication with addition",
        terms: [
          {
            term: "Definition of logarithm",
            def: "log_a(x) = y ⟺ a^y = x (a > 0, a ≠ 1, x > 0). Think of a logarithm as 'asking for the exponent': log_2(8) = 3 means 'how many times must 2 be multiplied to reach 8? — three times.'",
          },
          {
            term: "Natural logarithm",
            def: "The logarithm with base e (≈ 2.718), written ln(x) = log_e(x). In IB AA it is the central function connecting algebra to calculus.",
          },
          {
            term: "Change-of-base formula",
            def: "log_a(x) = ln(x)/ln(a) = log(x)/log(a). Since calculators provide only log base 10 and ln, this formula is essential for evaluating logarithms in any other base.",
          },
          {
            term: "Argument condition",
            def: "In log_a(x), the argument x must satisfy x > 0. Any solution to a logarithmic equation that makes an argument negative or zero must be rejected.",
          },
        ],
        traps: [
          "log(a + b) = log(a) + log(b) is FALSE. The addition law is log(a·b) = log(a) + log(b). A frequent exam error is combining log(x + 3) + log(x − 2) into log(5x − 6). The only valid combination is log((x+3)(x−2)) = log(x²+x−6).",
          "Failing to verify the argument condition after solving a logarithmic equation costs partial marks in IB. The final step of every log equation solution must be: substitute each candidate back into the original expression and confirm every argument is positive.",
        ],
        example:
          "Solve log_2(x + 3) + log_2(x − 1) = 5. Apply the addition law: log_2((x+3)(x−1)) = 5. Convert to exponential form: (x+3)(x−1) = 2^5 = 32. Expand: x² + 2x − 3 = 32, so x² + 2x − 35 = 0. Factorise: (x+7)(x−5) = 0, giving x = −7 or x = 5. Argument check: x = −7 makes x − 1 = −8 < 0, so reject. x = 5 gives x + 3 = 8 > 0 and x − 1 = 4 > 0, so accept. Therefore x = 5.",
      },
      {
        title: "Applications of Exponents and Logarithms",
        subtitle: "Setting up and solving exponential and logarithmic models in real-world contexts",
        terms: [
          {
            term: "Exponential growth and decay",
            def: "A model of the form N(t) = N_0 · a^t or N(t) = N_0 · e^(kt). When k > 0 the quantity grows; when k < 0 it decays. IB contextual questions use population growth, radioactive decay, and Newton's law of cooling.",
          },
          {
            term: "Half-life",
            def: "The time required for a radioactive substance to fall to half its original amount. Expressed as N(t) = N_0 · (1/2)^(t/T_{1/2}), or by finding k from the exponential decay model N(t) = N_0 · e^(kt).",
          },
          {
            term: "Converting between logarithmic and exponential form",
            def: "Rewriting a logarithmic equation in exponential form (and vice versa) isolates the unknown variable. Fluency moving freely between both forms is the core skill in IB application questions.",
          },
          {
            term: "Logarithmic scale",
            def: "Used when the range of values is extremely wide — e.g. pH, Richter magnitude, and decibels. An increase of 1 on a common-logarithm scale corresponds to a tenfold increase in the actual quantity.",
          },
        ],
        traps: [
          "When taking logarithms of both sides of an exponential equation, the base must be consistent throughout. Some students apply log to one side and ln to the other, corrupting the equation. Fix one base — either log or ln — and use it everywhere.",
          "In a decay model, k must be negative; writing it as positive is a common sign error in IB written-response questions. Whenever a problem mentions 'decay' or 'decrease', confirm at the model-setup stage that k < 0 or that the exponent carries an explicit negative sign.",
        ],
        example:
          "A bacterial colony starts with 500 organisms and triples every hour. Find the first hour at which the population exceeds 100,000. Model: N(t) = 500 · 3^t > 100,000. Divide both sides by 500: 3^t > 200. Take logarithms: t · log(3) > log(200), so t > log(200)/log(3) = log_3(200). Calculate: log(200)/log(3) ≈ 2.301/0.4771 ≈ 4.82. Therefore at t = 5 hours (rounding up) the population first exceeds 100,000.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u1-l3",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 1,
    lessonNum: 3,
    unitName: "Number & Algebra",
    title: "The Binomial Theorem",
    subtitle: "A complete map of (a + b)^n expansion — Pascal's triangle and the general term formula",
    overview:
      "The Binomial Theorem is the method for expanding (a + b)^n without multiplying it out directly. In IB AA, computing binomial coefficients C(n, r) quickly and finding the coefficient of a specified term is a fixed question type on both Paper 1 and Paper 2. Starting from the combinatorial logic of C(n, r), passing through Pascal's triangle, and arriving at the general term T_{r+1} = C(n,r)·a^(n−r)·b^r — understanding the 'why' rather than memorising lets you handle every variation.",
    objectives: [
      "Calculate binomial coefficients C(n, r) = n!/(r!(n−r)!) and explain their connection to Pascal's triangle",
      "Apply the Binomial Theorem (a + b)^n = Σ_{r=0}^{n} C(n,r)·a^(n−r)·b^r to expand expressions",
      "Use the general term formula T_{r+1} = C(n,r)·a^(n−r)·b^r to find a specific term or a specific coefficient",
      "Apply the Binomial Theorem to approximate values (e.g. approximate 1.02^10)",
      "Use the symmetry property C(n, r) = C(n, n−r) to simplify calculations",
    ],
    formulas: [
      "C(n, r) = n! / (r!(n-r)!)",
      "(a + b)^n = Σ_{r=0}^{n} C(n,r) · a^(n-r) · b^r",
      "T_{r+1} = C(n, r) · a^(n-r) · b^r  (general term, the (r+1)th term)",
      "C(n, 0) = C(n, n) = 1",
      "C(n, r) = C(n, n-r)  (symmetry)",
      "Σ_{r=0}^{n} C(n,r) = 2^n  (substitute a=b=1)",
    ],
    sections: [
      {
        title: "Binomial Coefficients & Pascal's Triangle",
        subtitle: "The combinatorial meaning of C(n, r) and the addition pattern in Pascal's triangle",
        terms: [
          {
            term: "Binomial coefficient",
            def: "C(n, r) = n!/(r!(n−r)!). It counts the number of ways to choose r objects from n objects without regard to order, and combinatorially represents the number of a^(n−r)b^r terms in the expansion of (a + b)^n.",
          },
          {
            term: "Factorial",
            def: "n! = n × (n−1) × ⋯ × 2 × 1, with 0! = 1 by definition. You can verify C(n, 0) = n!/(0!·n!) = 1 directly from this definition.",
          },
          {
            term: "Pascal's triangle",
            def: "A triangular array in which each row lists the binomial coefficients, built by the rule C(n, r) = C(n−1, r−1) + C(n−1, r): each entry is the sum of the two entries directly above it. Useful for finding binomial coefficients on IB Paper 1 without a calculator.",
          },
          {
            term: "Symmetry",
            def: "C(n, r) = C(n, n−r). In the expansion of (a+b)^n the (r+1)th term from the front and the (r+1)th term from the back share the same coefficient. This symmetry reduces computation: C(10, 7) = C(10, 3) = 120.",
          },
        ],
        traps: [
          "In the general term T_{r+1}, r starts at 0. For the 'third term', T_3 = T_{r+1} requires r = 2 — not r = 3. This is an extremely common error. Always note beside the formula: term number = r + 1.",
          "In C(n, r), the denominator is the product of two factorials: r!·(n−r)!. Writing only r! in the denominator is a frequent algebraic mistake.",
        ],
        example:
          "Use Pascal's triangle to list C(5, 0) through C(5, 5). Row n = 5 is: 1, 5, 10, 10, 5, 1. Verify C(5,2) = 10 with the formula: 5!/(2!·3!) = 120/(2·6) = 120/12 = 10. The symmetry C(5,2) = C(5,3) = 10 is confirmed. The sum of the row is 1+5+10+10+5+1 = 32 = 2^5, consistent with Σ C(n,r) = 2^n.",
      },
      {
        title: "Binomial Expansion & The General Term",
        subtitle: "Using T_{r+1} to locate any single term without expanding the whole expression",
        terms: [
          {
            term: "General term",
            def: "T_{r+1} = C(n, r)·a^(n−r)·b^r. Substituting r = 0, 1, …, n into this formula yields the first, second, …, (n+1)th term of the expansion of (a + b)^n.",
          },
          {
            term: "Constant term",
            def: "The term in which the variable (e.g. x) cancels out, leaving a pure number. Find the r value that makes the power of x equal to zero in T_{r+1}, then multiply the binomial coefficient by the remaining constants.",
          },
          {
            term: "Specific coefficient",
            def: "When a question asks 'find the coefficient of x^k', write the power of x in T_{r+1} as an expression in r, set it equal to k, solve for r, then evaluate the full term.",
          },
          {
            term: "Binomial approximation",
            def: "When |x| ≪ 1, (1 + x)^n ≈ 1 + nx + C(n,2)x² + ⋯. In IB AA HL this appears as finding the first three terms of an expansion or computing a decimal approximation.",
          },
        ],
        traps: [
          "When expanding (a − b)^n, substitute −b for b: T_{r+1} = C(n,r)·a^(n−r)·(−b)^r. When r is odd the term is negative. Missing the sign from (−b)^r depending on the parity of r is the single most frequent error in Binomial Theorem questions.",
          "For an expression like (2x + 3)^6, you must set a = 2x and b = 3, not a = x and b = 3. Before applying the theorem, explicitly write down what a and b are.",
        ],
        example:
          "Find the coefficient of x^5 in the expansion of (x + 2)^8. General term: T_{r+1} = C(8, r)·x^(8−r)·2^r. For x^5: 8 − r = 5, so r = 3. T_4 = C(8, 3)·x^5·2^3 = 56·8·x^5 = 448x^5. The coefficient of x^5 is 448. Follow these four steps in order: ① identify a and b, ② set the power condition to find r, ③ evaluate C(n,r), ④ multiply the remaining factors. Writing every step prevents mark losses.",
      },
      {
        title: "综합 Applications of the Binomial Theorem",
        subtitle: "IB HL-style questions combining Pascal identities, approximations, and simultaneous conditions",
        terms: [
          {
            term: "Pascal's identity",
            def: "C(n, r) = C(n−1, r−1) + C(n−1, r). This identity underlies proofs of binomial coefficient identities and induction arguments.",
          },
          {
            term: "Sum of binomial coefficients",
            def: "Σ_{r=0}^{n} C(n,r) = 2^n (substitute a = b = 1) and Σ_{r=0}^{n} (−1)^r C(n,r) = 0 (substitute a = 1, b = −1). Both results appear frequently in IB proof questions.",
          },
          {
            term: "Simultaneous binomial conditions",
            def: "Questions in which the coefficients (or their ratio) of two terms are given, requiring you to find both n and r simultaneously. Set up a separate equation for each condition, then solve the system.",
          },
          {
            term: "Accuracy of binomial approximation",
            def: "When |x| is sufficiently smaller than 1, just a few terms give an excellent approximation. IB also tests comparing the error when only r terms are used against the exact value.",
          },
        ],
        traps: [
          "The sum formula Σ C(n,r) = 2^n holds only when all signs are positive. The alternating sum Σ (−1)^r C(n,r) = 0 is a different result. Confusing the two and submitting the wrong value is a known exam mistake — check which sum is being asked for before choosing a formula.",
          "In simultaneous binomial condition questions, remember that r must be a non-negative integer satisfying 0 ≤ r ≤ n. Presenting all real solutions to the resulting equation without applying this constraint is a common error.",
        ],
        example:
          "Use the coefficients of x and x^2 in the expansion of (1 + x)^10 to approximate 1.05^10. General term: T_{r+1} = C(10,r)·x^r. Coefficients: C(10,1) = 10, C(10,2) = 45, C(10,3) = 120. Substitute x = 0.05: (1.05)^10 ≈ 1 + 10(0.05) + 45(0.05)^2 + 120(0.05)^3 = 1 + 0.5 + 0.1125 + 0.015 = 1.6275. The actual value 1.05^10 ≈ 1.6289, so the three-term approximation has an error below 0.1%. In approximation questions, state how many terms you used and add one sentence explaining why higher-order terms are negligible.",
      },
    ],
  },
];
