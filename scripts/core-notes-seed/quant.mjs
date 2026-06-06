// Hand-authored Core Notes for the quantitative subjects (no term banks to mine).
// Same card shape; merged into lib/data/coreNotesSeed.json alongside content notes.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const outFile = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "lib", "data", "coreNotesSeed.json");

const T = (term, def) => ({ term, def });
const note = (courseId, unit, unitName, objectives, sections) => ({
  courseId, unit, lessonNum: 1, unitName, title: unitName,
  subtitle: `The formulas, ideas, and traps you actually need for ${unitName}.`,
  objectives, sections,
});

const NOTES = [
  // ===== AP Calculus BC =====
  note("ap-calculus-bc", 1, "Limits & Continuity", [
    "Evaluate limits by substitution, factoring, and conjugates.",
    "Identify removable, jump, and infinite discontinuities.",
    "Use the limit definition of continuity at a point.",
  ], [{ title: "Key concepts", terms: [
    T("Limit", "The value f(x) approaches as x approaches a; may exist even when f(a) does not."),
    T("Continuity at a", "Requires lim(x→a) f(x) to exist, f(a) to exist, and the two to be equal."),
    T("Removable discontinuity", "A hole: the limit exists but the function is undefined or different there."),
    T("End behavior", "For rational functions, compare leading degrees: higher denominator → 0, equal → ratio of leading coefficients."),
    T("Squeeze theorem", "If g ≤ f ≤ h and g, h → L, then f → L."),
  ], traps: ["A limit can exist where the function is undefined — don't assume lim = f(a) unless f is continuous."],
     example: "lim(x→2) (x²−4)/(x−2): factor to (x−2)(x+2)/(x−2) = x+2 → 4. The (x−2) cancels (removable hole)." }]),
  note("ap-calculus-bc", 2, "Differentiation: Definition & Rules", [
    "Apply the power, product, and quotient rules fluently.",
    "Read the derivative as instantaneous rate of change and tangent slope.",
    "Use the limit definition of the derivative.",
  ], [{ title: "Key concepts", terms: [
    T("Derivative definition", "f'(x) = lim(h→0) [f(x+h) − f(x)]/h."),
    T("Power rule", "d/dx[xⁿ] = n·xⁿ⁻¹."),
    T("Product rule", "d/dx[fg] = f'g + fg'."),
    T("Quotient rule", "d/dx[f/g] = (f'g − fg')/g²."),
  ], traps: ["The derivative of a product is NOT f'g' — you must use the product rule."],
     example: "d/dx[x²·eˣ] = 2x·eˣ + x²·eˣ = x·eˣ(2 + x)." }]),
  note("ap-calculus-bc", 3, "Chain, Implicit & Inverse Differentiation", [
    "Differentiate composite functions with the chain rule.",
    "Use implicit differentiation when y is not isolated.",
    "Differentiate inverse and log/exponential functions.",
  ], [{ title: "Key concepts", terms: [
    T("Chain rule", "d/dx[f(g(x))] = f'(g(x))·g'(x)."),
    T("Implicit differentiation", "Differentiate both sides treating y as a function of x, then solve for dy/dx."),
    T("d/dx[ln x]", "1/x; d/dx[eˣ] = eˣ."),
    T("Inverse derivative", "(f⁻¹)'(x) = 1 / f'(f⁻¹(x))."),
  ], traps: ["Forgetting the inner derivative is the #1 chain-rule error: d/dx[sin(3x)] = 3cos(3x), not cos(3x)."],
     example: "x² + y² = 25 → 2x + 2y·y' = 0 → y' = −x/y." }]),
  note("ap-calculus-bc", 5, "Analytical Applications", [
    "Find critical points and classify extrema.",
    "Use first and second derivatives for increasing/decreasing and concavity.",
    "Apply the Mean Value Theorem.",
  ], [{ title: "Key concepts", terms: [
    T("Critical point", "Where f'(x) = 0 or is undefined — candidates for extrema."),
    T("First derivative test", "Sign change of f' from + to − is a max; − to + is a min."),
    T("Concavity", "f'' > 0 concave up; f'' < 0 concave down; sign change is an inflection point."),
    T("Mean Value Theorem", "If f is continuous on [a,b] and differentiable on (a,b), some c has f'(c) = (f(b)−f(a))/(b−a)."),
  ], traps: ["f'' = 0 alone does NOT guarantee an inflection point — concavity must actually change sign."],
     example: "f(x)=x³−3x → f'=3x²−3=0 → x=±1; f''=6x, so x=1 is a min, x=−1 is a max." }]),
  note("ap-calculus-bc", 6, "Integration & Accumulation", [
    "Compute antiderivatives and definite integrals.",
    "Apply the Fundamental Theorem of Calculus.",
    "Use u-substitution.",
  ], [{ title: "Key concepts", terms: [
    T("FTC Part 2", "∫ₐᵇ f(x) dx = F(b) − F(a), where F' = f."),
    T("FTC Part 1", "d/dx ∫ₐˣ f(t) dt = f(x)."),
    T("u-substitution", "Reverse the chain rule: let u = inner function, du = u'(x) dx."),
    T("Integral of 1/x", "∫(1/x) dx = ln|x| + C."),
  ], traps: ["Never forget +C on an indefinite integral, and change the bounds when substituting in a definite integral."],
     example: "∫₀^π sin x dx = [−cos x]₀^π = −cos π + cos 0 = 1 + 1 = 2." }]),
  note("ap-calculus-bc", 7, "Differential Equations", [
    "Solve separable differential equations.",
    "Model exponential and logistic growth.",
    "Interpret slope fields and equilibria.",
  ], [{ title: "Key concepts", terms: [
    T("Separable equation", "Rewrite as g(y)dy = f(x)dx, then integrate both sides."),
    T("Exponential model", "dy/dt = ky → y = y₀eᵏᵗ."),
    T("Logistic model", "dP/dt = kP(1 − P/M); P approaches the carrying capacity M."),
    T("Equilibrium solution", "A constant solution where dy/dt = 0."),
  ], traps: ["In logistic growth, the fastest growth is at P = M/2, not at the start."],
     example: "dy/dx = xy → (1/y)dy = x dx → ln|y| = x²/2 + C → y = Ae^(x²/2)." }]),
  note("ap-calculus-bc", 8, "Applications of Integration", [
    "Find area between curves and volumes of revolution.",
    "Compute average value and total distance.",
    "Set up arc length and accumulation integrals.",
  ], [{ title: "Key concepts", terms: [
    T("Area between curves", "∫ₐᵇ (top − bottom) dx."),
    T("Disk method", "V = π∫ₐᵇ [R(x)]² dx."),
    T("Average value", "(1/(b−a)) ∫ₐᵇ f(x) dx."),
    T("Total distance", "∫ₐᵇ |v(t)| dt (use the absolute value of velocity)."),
  ], traps: ["Displacement uses ∫v dt; total distance uses ∫|v| dt — they differ when direction reverses."],
     example: "Average value of x² on [0,6] = (1/6)∫₀⁶ x² dx = (1/6)(72) = 12." }]),
  note("ap-calculus-bc", 10, "Infinite Sequences & Series", [
    "Test series for convergence and divergence.",
    "Recognize geometric and p-series.",
    "Build Taylor and Maclaurin series.",
  ], [{ title: "Key concepts", terms: [
    T("Geometric series", "Σarⁿ converges to a/(1−r) iff |r| < 1."),
    T("p-series", "Σ1/nᵖ converges iff p > 1 (harmonic series p=1 diverges)."),
    T("Ratio test", "If lim|aₙ₊₁/aₙ| < 1 the series converges absolutely."),
    T("Maclaurin series", "A Taylor series centered at 0; eˣ = Σ xⁿ/n!."),
    T("nth-term test", "If terms don't approach 0, the series diverges (but →0 does not guarantee convergence)."),
  ], traps: ["Terms going to 0 does NOT prove convergence — the harmonic series Σ1/n diverges."],
     example: "Σ(2/3)ⁿ from n=1: a=2/3, r=2/3 → sum = (2/3)/(1−2/3) = 2." }]),

  // ===== AP Statistics =====
  note("ap-statistics", 1, "Exploring One-Variable Data", [
    "Describe shape, center, spread, and outliers.",
    "Compute z-scores and use the empirical rule.",
    "Compare mean vs. median under skew.",
  ], [{ title: "Key concepts", terms: [
    T("z-score", "(value − mean)/SD; distance from the mean in standard deviations."),
    T("IQR", "Q3 − Q1; outliers fall beyond Q1 − 1.5·IQR or Q3 + 1.5·IQR."),
    T("Skew & center", "Right-skew pulls the mean above the median; mean chases the tail."),
    T("Empirical rule", "68%–95%–99.7% of data lie within 1, 2, 3 SDs of the mean (normal)."),
  ], traps: ["The mean is sensitive to outliers; the median and IQR are resistant."],
     example: "A value of 80 with mean 70, SD 5 has z = (80−70)/5 = 2 (two SDs above the mean)." }]),
  note("ap-statistics", 2, "Exploring Two-Variable Data", [
    "Interpret correlation and least-squares regression.",
    "Use r² and residuals to assess fit.",
    "Avoid extrapolation and causation errors.",
  ], [{ title: "Key concepts", terms: [
    T("Correlation r", "Strength/direction of a linear relationship, −1 to 1; symmetric in x and y."),
    T("r²", "Proportion of variation in y explained by the linear model."),
    T("Residual", "Observed − predicted (y − ŷ)."),
    T("Extrapolation", "Predicting outside the data range — unreliable."),
  ], traps: ["Correlation does NOT imply causation; only a randomized experiment can establish cause."],
     example: "ŷ = 3 + 2x predicts y = 13 when x = 5." }]),
  note("ap-statistics", 3, "Collecting Data", [
    "Distinguish sampling methods and sources of bias.",
    "Apply control, randomization, replication in experiments.",
    "Tell observational studies from experiments.",
  ], [{ title: "Key concepts", terms: [
    T("Simple random sample", "Every group of n individuals is equally likely to be chosen."),
    T("Stratified sampling", "Sample within homogeneous subgroups (strata)."),
    T("Confounding variable", "A variable tied to both explanatory and response variables, muddying cause."),
    T("Experiment principles", "Control, Randomization, Replication."),
  ], traps: ["Only a randomized experiment can show causation; observational studies can't control confounders."],
     example: "Voluntary-response (online) polls overrepresent strong opinions → biased." }]),
  note("ap-statistics", 5, "Sampling Distributions", [
    "Use the Central Limit Theorem.",
    "Compute the standard error of a statistic.",
    "Distinguish bias from variability.",
  ], [{ title: "Key concepts", terms: [
    T("Central Limit Theorem", "For large n, the sampling distribution of x̄ is approximately normal regardless of population shape."),
    T("Standard error of x̄", "σ/√n — shrinks as n grows."),
    T("Standard error of p̂", "√(p(1−p)/n)."),
    T("Unbiased estimator", "Its sampling distribution centers on the true parameter."),
  ], traps: ["Quadrupling n only halves the standard error (1/√n), not quarters it."],
     example: "σ = 20, n = 25 → SE = 20/√25 = 4." }]),
  note("ap-statistics", 6, "Inference for Proportions", [
    "Build and interpret confidence intervals.",
    "Run significance tests and read P-values.",
    "Check conditions (random, 10%, large counts).",
  ], [{ title: "Key concepts", terms: [
    T("Confidence interval", "estimate ± (critical value)·(standard error); the margin of error is half the width."),
    T("P-value", "Probability of data this extreme if H₀ is true — NOT the probability H₀ is true."),
    T("Type I / II error", "Type I: reject a true H₀ (prob α). Type II: fail to reject a false H₀."),
    T("Large-counts condition", "np̂ ≥ 10 and n(1−p̂) ≥ 10."),
  ], traps: ["'95% confident' means 95% of such intervals capture the parameter — not a 95% chance for this one."],
     example: "Interval (0.30, 0.40): point estimate 0.35, margin of error 0.05." }]),
  note("ap-statistics", 7, "Inference for Means", [
    "Use t-procedures when σ is unknown.",
    "Run one-sample, two-sample, and matched-pairs tests.",
    "Interpret confidence and significance correctly.",
  ], [{ title: "Key concepts", terms: [
    T("t-distribution", "Used for means when σ is unknown; heavier tails than normal, df = n − 1."),
    T("Matched pairs", "Analyze within-pair differences with a one-sample t-test."),
    T("Failing to reject H₀", "Means insufficient evidence — never 'proof' the null is true."),
    T("Power", "P(rejecting a false H₀) = 1 − β; rises with n, α, and effect size."),
  ], traps: ["Use t (not z) for means whenever σ is unknown, even for large samples."],
     example: "One-sample t-test, n = 25 → df = 24." }]),
  note("ap-statistics", 8, "Inference: Chi-Square", [
    "Choose goodness-of-fit, independence, or homogeneity.",
    "Compute expected counts and df.",
    "Interpret the chi-square statistic.",
  ], [{ title: "Key concepts", terms: [
    T("Chi-square statistic", "Σ (observed − expected)²/expected; large values give small P-values."),
    T("Goodness-of-fit df", "categories − 1."),
    T("Independence/homogeneity df", "(rows − 1)(columns − 1)."),
    T("Condition", "All expected counts ≥ 5."),
  ], traps: ["Chi-square uses counts (categorical data), never percentages or means."],
     example: "5 categories → goodness-of-fit df = 5 − 1 = 4." }]),
  note("ap-statistics", 9, "Inference for Slopes", [
    "Test the regression slope for significance.",
    "Read computer regression output.",
    "Check the LINE conditions.",
  ], [{ title: "Key concepts", terms: [
    T("Slope t-test", "H₀: β = 0; a small P-value is evidence of a real linear relationship."),
    T("LINE conditions", "Linearity, Independence, Normality of residuals, Equal variance."),
    T("s (residual SD)", "Typical size of prediction errors."),
    T("Slope meaning", "Predicted change in y per one-unit increase in x."),
  ], traps: ["A significant slope shows association, not necessarily causation."],
     example: "P-value 0.001 for the slope → strong evidence of a linear relationship." }]),

  // ===== AP Computer Science A =====
  note("ap-computer-science-a", 1, "Primitive Types", [
    "Use int, double, boolean correctly.",
    "Predict integer division and modulus results.",
    "Understand casting and operator precedence.",
  ], [{ title: "Key concepts", terms: [
    T("Integer division", "int / int truncates toward zero: 7/2 = 3."),
    T("Modulus %", "Remainder after division: 13 % 4 = 1."),
    T("Casting", "(double) converts before the operation: (double)7/2 = 3.5."),
    T("Compound assignment", "x *= 2 doubles x; x += 1 increments."),
  ], traps: ["7/2 is 3, not 3.5 — integer division truncates before any assignment to a double."],
     example: "(double) 5 / 2 = 2.5, but 5 / 2 = 2." }]),
  note("ap-computer-science-a", 3, "Boolean Expressions & if", [
    "Combine conditions with &&, ||, !.",
    "Use short-circuit evaluation and De Morgan's laws.",
    "Build if/else-if ladders.",
  ], [{ title: "Key concepts", terms: [
    T("&& and ||", "AND is true only if both are true; OR is true if either is true."),
    T("Short-circuit", "&& stops if the left is false; || stops if the left is true."),
    T("De Morgan's law", "!(a && b) = !a || !b; !(a || b) = !a && !b."),
    T("else-if ladder", "Executes the first true branch and skips the rest."),
  ], traps: ["Short-circuit evaluation can prevent errors: (n != 0 && 10/n > 1) avoids division by zero."],
     example: "!(x < 0) is equivalent to x >= 0." }]),
  note("ap-computer-science-a", 4, "Iteration", [
    "Trace for and while loops.",
    "Count iterations and build strings/sums.",
    "Use nested loops.",
  ], [{ title: "Key concepts", terms: [
    T("while loop", "Checks the condition before each pass; may run zero times."),
    T("for loop", "init; condition; update — best when the count is known."),
    T("break / continue", "break exits the loop; continue skips to the next iteration."),
    T("Sum 1..n", "n(n+1)/2."),
  ], traps: ["A String += in a loop concatenates, so '' + 1 + 2 + 3 builds \"123\", not 6."],
     example: "int x=1; while(x<100) x*=2; → x ends at 128 (1,2,4,...,64,128)." }]),
  note("ap-computer-science-a", 6, "Arrays", [
    "Access and traverse arrays safely.",
    "Use enhanced for loops.",
    "Find max/min and sums.",
  ], [{ title: "Key concepts", terms: [
    T("Index range", "Valid indices are 0 to length−1; arr[length] throws an exception."),
    T("Enhanced for", "for (int v : arr) reads each element (no index)."),
    T("Fixed length", "An array's length is set at creation and cannot change."),
    T("Finding max", "Initialize max to arr[0], not 0, to handle all-negative arrays."),
  ], traps: ["Accessing arr[arr.length] is out of bounds — the last element is arr[arr.length−1]."],
     example: "int[] a={2,5,8}; int s=0; for(int v:a) s+=v; → s = 15." }]),
  note("ap-computer-science-a", 9, "Inheritance & Polymorphism", [
    "Use extends, super, and overriding.",
    "Apply polymorphism and dynamic dispatch.",
    "Distinguish is-a (inheritance) from has-a (composition).",
  ], [{ title: "Key concepts", terms: [
    T("super", "Calls the superclass constructor (super(...)) or methods (super.method())."),
    T("Overriding", "A subclass redefines an inherited method with the same signature."),
    T("Polymorphism", "Animal a = new Dog(); a.speak() runs Dog's overridden version at runtime."),
    T("Private fields", "Not directly accessible to subclasses — use inherited getters/setters."),
  ], traps: ["The object type (not the reference type) decides which overridden method runs."],
     example: "Animal a = new Dog(); a.makeSound(); → executes Dog.makeSound()." }]),
  note("ap-computer-science-a", 10, "Recursion", [
    "Identify base and recursive cases.",
    "Trace recursive calls and return order.",
    "Compute factorials and sums recursively.",
  ], [{ title: "Key concepts", terms: [
    T("Base case", "The condition that stops recursion without calling itself."),
    T("Recursive case", "Reduces the problem and calls the method on a smaller input."),
    T("Print order", "Printing before the call → top-down; after the call → bottom-up."),
    T("Factorial", "f(n) = n·f(n−1), f(0)=1."),
  ], traps: ["Missing or unreachable base cases cause infinite recursion (StackOverflowError)."],
     example: "f(n){if(n<=0)return; print(n); f(n-1);} f(3) prints 3 2 1." }]),

  // ===== AP Macroeconomics =====
  note("ap-macroeconomics", 1, "Basic Economic Concepts", [
    "Apply scarcity, opportunity cost, and the PPC.",
    "Use comparative advantage and gains from trade.",
    "Read PPC shifts as growth.",
  ], [{ title: "Key concepts", terms: [
    T("Opportunity cost", "The value of the next-best alternative given up."),
    T("Comparative advantage", "Lower opportunity cost; the basis for gains from trade."),
    T("PPC", "On the curve = efficient; inside = unemployment; outside = unattainable; outward shift = growth."),
    T("Factors of production", "Land, labor, capital, entrepreneurship (money is NOT a factor)."),
  ], traps: ["Trade gains come from comparative (not absolute) advantage."],
     example: "If a worker earning $30/hr takes an hour off, the opportunity cost is $30." }]),
  note("ap-macroeconomics", 2, "Economic Indicators & the Business Cycle", [
    "Compute GDP, unemployment, and inflation.",
    "Distinguish nominal and real values.",
    "Identify business-cycle phases.",
  ], [{ title: "Key concepts", terms: [
    T("GDP (expenditure)", "C + I + G + Xn."),
    T("Unemployment rate", "unemployed ÷ labor force × 100."),
    T("Real vs nominal", "Real is inflation-adjusted; real GDP growth ≈ nominal growth − inflation."),
    T("CPI inflation", "(CPI₂ − CPI₁)/CPI₁ × 100."),
  ], traps: ["Discouraged workers leave the labor force, so they aren't counted as unemployed."],
     example: "Labor force 150M, 9M unemployed → 9/150 = 6%." }]),
  note("ap-macroeconomics", 3, "National Income & Price Determination", [
    "Use AD/AS to find equilibrium.",
    "Apply the spending and tax multipliers.",
    "Distinguish recessionary and inflationary gaps.",
  ], [{ title: "Key concepts", terms: [
    T("Spending multiplier", "1/(1 − MPC)."),
    T("Tax multiplier", "−MPC/(1 − MPC) (smaller in magnitude than the spending multiplier)."),
    T("Recessionary gap", "Output below full employment; close with expansionary policy."),
    T("LRAS", "Vertical at potential output; only growth shifts it."),
  ], traps: ["A demand shift moves output and price level the same direction; a supply shift moves them opposite."],
     example: "MPC 0.8 → multiplier 1/(1−0.8) = 5; a $50B spending rise can raise GDP up to $250B." }]),
  note("ap-macroeconomics", 4, "The Financial Sector", [
    "Explain money, the money market, and banking.",
    "Use the money multiplier.",
    "Connect the Fed's tools to interest rates.",
  ], [{ title: "Key concepts", terms: [
    T("Money multiplier", "1 ÷ reserve requirement."),
    T("Open market operations", "Fed buys bonds → money supply up, rates down; sells bonds → opposite."),
    T("Money demand", "Downward-sloping vs. the interest rate; more real GDP shifts it right."),
    T("Functions of money", "Medium of exchange, unit of account, store of value."),
  ], traps: ["Bond prices and interest rates move in opposite directions."],
     example: "Reserve requirement 25% → money multiplier = 1/0.25 = 4." }]),
  note("ap-macroeconomics", 5, "Stabilization & Long-Run Policy", [
    "Choose fiscal and monetary policy for the goal.",
    "Explain growth and the long-run self-correction.",
    "Recognize policy lags and crowding out.",
  ], [{ title: "Key concepts", terms: [
    T("Expansionary policy", "Cut taxes / raise spending, or buy bonds / lower rates — fights recession."),
    T("Contractionary policy", "Raise taxes / cut spending, or sell bonds / raise rates — fights inflation."),
    T("Long-run growth", "Rightward LRAS shift from more resources, capital, or technology."),
    T("Crowding out", "Government borrowing raises rates and reduces private investment."),
  ], traps: ["Money is neutral in the long run — sustained money growth raises prices, not real output."],
     example: "To fight a recession: cut taxes / increase G (fiscal) or buy bonds / lower rates (monetary)." }]),
  note("ap-macroeconomics", 6, "Open Economy: Trade & Finance", [
    "Read the balance of payments.",
    "Explain floating exchange rates.",
    "Link interest rates to capital flows and currency value.",
  ], [{ title: "Key concepts", terms: [
    T("Net exports", "Exports − imports."),
    T("Exchange rate", "The price of one currency in another; set by supply and demand (floating)."),
    T("Appreciation", "Higher demand for a currency raises its value, making exports pricier abroad."),
    T("Capital flows", "Higher domestic interest rates attract foreign investment, appreciating the currency."),
  ], traps: ["A stronger (appreciated) currency tends to reduce net exports."],
     example: "Rising exports raise demand for the currency → it appreciates." }]),

  // ===== AP Microeconomics =====
  note("ap-microeconomics", 1, "Basic Economic Concepts", [
    "Apply scarcity, opportunity cost, marginal analysis.",
    "Use the PPC and comparative advantage.",
    "Separate positive from normative claims.",
  ], [{ title: "Key concepts", terms: [
    T("Marginal analysis", "Act while marginal benefit ≥ marginal cost."),
    T("Opportunity cost", "The next-best alternative forgone."),
    T("Comparative advantage", "Lower opportunity cost; drives specialization and trade."),
    T("Positive vs normative", "Positive = testable fact; normative = value judgment ('should')."),
  ], traps: ["Sunk costs are irrelevant to decisions — only marginal costs and benefits matter."],
     example: "Diminishing marginal utility is why demand curves slope downward." }]),
  note("ap-microeconomics", 2, "Supply & Demand", [
    "Shift vs. move along curves.",
    "Compute and apply elasticity.",
    "Analyze price controls, taxes, and surplus.",
  ], [{ title: "Key concepts", terms: [
    T("Price elasticity", "%ΔQ / %ΔP; |E| < 1 inelastic, > 1 elastic."),
    T("Total revenue test", "Inelastic: price↑ raises revenue. Elastic: price↑ lowers revenue."),
    T("Price ceiling/floor", "Binding ceiling (below eq.) → shortage; binding floor (above eq.) → surplus."),
    T("Tax incidence", "Falls more on the more inelastic side of the market."),
  ], traps: ["A binding price ceiling causes a shortage, not a surplus."],
     example: "Elasticity 0.5 (inelastic): raising price increases total revenue." }]),
  note("ap-microeconomics", 3, "Production, Cost & Perfect Competition", [
    "Distinguish fixed, variable, marginal, and average costs.",
    "Apply the profit-max and shutdown rules.",
    "Describe long-run competitive equilibrium.",
  ], [{ title: "Key concepts", terms: [
    T("Profit maximization", "Produce where MR = MC; for a price taker, P = MR."),
    T("Shutdown rule", "Operate short-run only if price ≥ minimum AVC."),
    T("ATC", "Total cost ÷ quantity; MC crosses ATC at its minimum."),
    T("Long-run equilibrium", "P = min ATC, zero economic (but normal) profit."),
  ], traps: ["Zero economic profit ≠ losing money — it means a normal return covering opportunity cost."],
     example: "Profit = (P − ATC)×Q: 100 units at $15 with ATC $10 → $500." }]),
  note("ap-microeconomics", 4, "Imperfect Competition", [
    "Compare monopoly, oligopoly, monopolistic competition.",
    "Explain why MR < P for a monopolist.",
    "Use basic game theory.",
  ], [{ title: "Key concepts", terms: [
    T("Monopoly outcome", "Higher price, lower output, deadweight loss vs. competition."),
    T("MR < P", "A monopolist must lower price on all units to sell more, so MR is below price."),
    T("Price discrimination", "Needs market power and the ability to prevent resale."),
    T("Prisoner's dilemma", "Each firm's dominant strategy yields a worse joint outcome than cooperation."),
  ], traps: ["For a competitive firm P = MR; for a monopolist MR < P — don't mix them up."],
     example: "Perfect price discrimination captures all consumer surplus and removes deadweight loss." }]),
  note("ap-microeconomics", 5, "Factor Markets", [
    "Derive labor demand from marginal revenue product.",
    "Find the cost-minimizing input mix.",
    "Explain wage determination.",
  ], [{ title: "Key concepts", terms: [
    T("Marginal revenue product", "MRP = marginal product × price; hire while MRP ≥ wage."),
    T("Least-cost rule", "Equalize marginal product per dollar across inputs."),
    T("Derived demand", "Demand for labor comes from demand for the output it makes."),
    T("Monopsony", "A single buyer of labor pays below the competitive wage and hires fewer workers."),
  ], traps: ["Labor demand is 'derived' — it depends on the value of what labor produces."],
     example: "Marginal product 10, output price $5 → MRP = $50; hire while wage ≤ $50." }]),
  note("ap-microeconomics", 6, "Market Failure & the Role of Government", [
    "Correct externalities with taxes and subsidies.",
    "Explain public goods and the free-rider problem.",
    "Measure deadweight loss and surplus.",
  ], [{ title: "Key concepts", terms: [
    T("Negative externality", "Overproduction; correct with a Pigouvian tax equal to the external cost."),
    T("Positive externality", "Underproduction; correct with a subsidy equal to the external benefit."),
    T("Public good", "Non-rival and non-excludable → underprovided due to free riders."),
    T("Deadweight loss", "Lost total surplus from mutually beneficial trades that don't occur."),
  ], traps: ["Common resources (rival, non-excludable) are overused — the tragedy of the commons."],
     example: "Consumer surplus = ½ × base × height of the triangle below demand, above price." }]),
];

let arr = [];
try { arr = JSON.parse(readFileSync(outFile, "utf8")); } catch {}
const quantIds = new Set(NOTES.map((n) => n.courseId));
const kept = arr.filter((n) => !quantIds.has(n.courseId));
const merged = [...kept, ...NOTES];
writeFileSync(outFile, JSON.stringify(merged, null, 1));
const counts = {};
for (const n of NOTES) counts[n.courseId] = (counts[n.courseId] || 0) + 1;
console.log("quant seed notes:", JSON.stringify(counts), "| total in file:", merged.length);
