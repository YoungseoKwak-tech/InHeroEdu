// Build per-lesson Core Notes for the content/quant subjects straight from
// ap-lesson-breakdown.json — the same source the admin Course Units page uses,
// so notes match the real chapters exactly (unit, lesson number, title).
// Each lesson has `topics` (key points; "Term: explanation" where applicable)
// and an `examTip` (the trap). Authored mapping by Claude, no API.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const breakdown = JSON.parse(readFileSync(join(here, "..", "..", "lib", "data", "ap-lesson-breakdown.json"), "utf8"));
const outFile = join(here, "..", "..", "lib", "data", "coreNotesSeed.json");

// breakdown courseId -> Core Notes courseId (must match question-bank/courses meta)
const MAP = {
  "ap-psychology": "ap-psychology",
  "ap-world-history": "ap-world-history",
  "ap-environmental-science": "ap-environmental-science",
  "ap-us-government": "ap-us-government",
  "ap-english-language": "ap-english-language",
  "ap-human-geography": "ap-human-geography",
  "ap-calculus-bc": "ap-calculus-bc",
  "ap-statistics": "ap-statistics",
  "ap-cs-a": "ap-computer-science-a",
  "ap-macroeconomics": "ap-macroeconomics",
  "ap-microeconomics": "ap-microeconomics",
};
const QUANT = new Set(["ap-calculus-bc", "ap-statistics", "ap-computer-science-a", "ap-macroeconomics", "ap-microeconomics"]);

// Key formulas per (courseId | unitNumber) — attached to each lesson in the unit.
const FORMULAS = {
  "ap-calculus-bc|1": ["lim(x→a) f(x) = L", "Removable hole: factor & cancel", "∞ end behavior: compare leading degrees"],
  "ap-calculus-bc|2": ["d/dx[xⁿ] = n·xⁿ⁻¹", "(fg)' = f'g + fg'", "(f/g)' = (f'g − fg')/g²"],
  "ap-calculus-bc|3": ["d/dx[f(g(x))] = f'(g(x))·g'(x)", "d/dx[eˣ]=eˣ, d/dx[ln x]=1/x"],
  "ap-calculus-bc|5": ["Critical pt: f'(x)=0 or undefined", "f''>0 ⇒ concave up", "MVT: f'(c)=(f(b)−f(a))/(b−a)"],
  "ap-calculus-bc|6": ["FTC: ∫ₐᵇ f dx = F(b)−F(a)", "d/dx ∫ₐˣ f(t)dt = f(x)", "∫(1/x)dx = ln|x|+C"],
  "ap-calculus-bc|7": ["Separable: ∫g(y)dy=∫f(x)dx", "Exponential: y=y₀eᵏᵗ", "Logistic: dP/dt=kP(1−P/M)"],
  "ap-calculus-bc|8": ["Area=∫(top−bottom)dx", "Disk: V=π∫[R(x)]²dx", "Distance=∫|v(t)|dt"],
  "ap-calculus-bc|10": ["Geometric: Σarⁿ=a/(1−r), |r|<1", "p-series: converges iff p>1", "eˣ=Σxⁿ/n!"],
  "ap-statistics|1": ["z=(x−μ)/σ", "IQR=Q3−Q1", "Outlier: <Q1−1.5·IQR or >Q3+1.5·IQR"],
  "ap-statistics|2": ["ŷ=a+bx", "r² = % variation explained", "residual = y−ŷ"],
  "ap-statistics|5": ["CLT: x̄≈Normal for large n", "SE(x̄)=σ/√n", "SE(p̂)=√(p(1−p)/n)"],
  "ap-statistics|6": ["CI = estimate ± crit·SE", "ME = ½·width", "large counts: np̂≥10, n(1−p̂)≥10"],
  "ap-statistics|7": ["t-test df = n−1", "matched pairs → 1-sample t on diffs", "power = 1−β"],
  "ap-statistics|8": ["χ²=Σ(O−E)²/E", "GOF df = cats−1", "indep df=(r−1)(c−1)"],
  "ap-statistics|9": ["slope test H₀: β=0", "LINE conditions", "s = SD of residuals"],
  "ap-computer-science-a|1": ["7/2==3 (int division)", "13%4==1", "(double)5/2==2.5"],
  "ap-computer-science-a|3": ["!(a&&b)==!a||!b", "short-circuit: && stops on false"],
  "ap-computer-science-a|4": ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
  "ap-computer-science-a|6": ["valid index 0..length−1", "last: arr[arr.length−1]"],
  "ap-computer-science-a|9": ["Animal a=new Dog() → Dog override runs", "is-a inherit, has-a compose"],
  "ap-computer-science-a|10": ["base case stops recursion", "f(n)=n·f(n−1), f(0)=1"],
  "ap-macroeconomics|2": ["GDP=C+I+G+Xn", "unemployment=unemployed/labor force", "real≈nominal−inflation"],
  "ap-macroeconomics|3": ["spending mult=1/(1−MPC)", "tax mult=−MPC/(1−MPC)"],
  "ap-macroeconomics|4": ["money mult=1/reserve ratio", "buy bonds→MS↑ rates↓"],
  "ap-microeconomics|2": ["E=%ΔQ/%ΔP", "|E|<1 inelastic, >1 elastic", "ceiling<eq→shortage"],
  "ap-microeconomics|3": ["MR=MC (P=MR if price taker)", "shutdown if P<min AVC", "profit=(P−ATC)·Q"],
  "ap-microeconomics|5": ["MRP=MP×price", "hire while MRP≥wage"],
};

// Attach a built-in SVG diagram to a lesson when its title clearly calls for one.
function pickDiagram(courseId, unitTitle, lessonTitle) {
  const s = `${unitTitle} ${lessonTitle}`.toLowerCase();
  if (courseId === "ap-microeconomics" || courseId === "ap-macroeconomics") {
    if (/aggregate (demand|supply)|ad.?as|aggregate model|short-run|long-run|stabiliz|national income|fiscal|monetary/.test(s)) return "ad-as";
    if (/production possibilit|\bppc\b|scarcity|opportunity cost|basic economic|gains from trade|comparative advantage/.test(s)) return "ppc";
    if (/supply|demand|market|equilibrium|price (ceiling|floor|control)|elasticity|surplus/.test(s)) return "supply-demand";
  }
  if (courseId === "ap-statistics") {
    if (/regression|scatter|correlation|least.?squares|slope|two-variable|bivariate/.test(s)) return "scatter-regression";
    if (/normal|sampling distribution|z-score|central limit|empirical/.test(s)) return "bell-curve";
    if (/one-variable|describing|display|distribution|boxplot|summary|exploring|graph/.test(s)) return "boxplot";
  }
  if (courseId === "ap-calculus-bc") {
    if (/integral|integration|accumulation|area (under|between)|riemann|definite/.test(s)) return "area-under-curve";
    if (/derivative|tangent|differentiation|rate of change|slope/.test(s)) return "tangent";
  }
  return null;
}

function splitTopic(t) {
  // "Name (detail): explanation" → term/def; else null
  const i = t.indexOf(":");
  if (i > 2 && i < t.length - 3) {
    const term = t.slice(0, i).trim();
    const def = t.slice(i + 1).trim();
    if (term.length <= 70 && def.length > 3) return { term, def };
  }
  return null;
}

const notes = [];
for (const [bid, courseId] of Object.entries(MAP)) {
  const course = breakdown.courses.find((c) => c.courseId === bid);
  if (!course) { console.log("MISSING in breakdown:", bid); continue; }
  for (const u of course.units) {
    for (const l of u.lessons) {
      const topics = Array.isArray(l.topics) ? l.topics : [];
      const terms = [];
      const bullets = [];
      for (const t of topics) {
        const p = splitTopic(t);
        if (p) terms.push(p);
        else bullets.push(t);
      }
      const objectives = bullets.length
        ? bullets
        : [`Master ${l.lessonTitle} for the ${u.unitTitle} unit.`];
      const sections = [];
      if (terms.length) sections.push({ title: "Key concepts", terms, traps: [], example: null });
      // exam tip → trap (attach to first section, or its own section)
      const tip = (l.examTip || "").trim();
      if (tip) {
        if (sections[0]) sections[0].traps = [tip];
        else sections.push({ title: l.lessonTitle, terms: [], traps: [tip], example: null });
      }
      const formulas = QUANT.has(courseId) ? FORMULAS[`${courseId}|${u.unitNumber}`] : undefined;
      const diagram = pickDiagram(courseId, u.unitTitle, l.lessonTitle);
      notes.push({
        courseId,
        unit: u.unitNumber,
        lessonNum: l.lessonNumber,
        unitName: u.unitTitle,
        title: l.lessonTitle,
        subtitle: null,
        objectives,
        ...(formulas ? { formulas } : {}),
        ...(diagram ? { diagram } : {}),
        sections: sections.length ? sections : [{ title: l.lessonTitle, terms: [], traps: [], example: null }],
      });
    }
  }
}

// Replace any prior seed for these courseIds; keep the rest (none currently).
const targetCourseIds = new Set(Object.values(MAP));
let existing = [];
try { existing = JSON.parse(readFileSync(outFile, "utf8")); } catch {}
const kept = existing.filter((n) => !targetCourseIds.has(n.courseId));
const merged = [...kept, ...notes];
writeFileSync(outFile, JSON.stringify(merged, null, 1));

const counts = {};
for (const n of notes) counts[n.courseId] = (counts[n.courseId] || 0) + 1;
console.log("per-lesson notes by subject:", JSON.stringify(counts, null, 0));
console.log("total breakdown notes:", notes.length, "| file total:", merged.length);
