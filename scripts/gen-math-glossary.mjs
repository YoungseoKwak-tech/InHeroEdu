/**
 * Generate a bilingual (English ↔ 한국어) math glossary PDF for US 입시.
 * 1,000+ terms across the full US math curriculum. Korean text rendered with
 * AppleGothic (system font). Output → public/parents-docs/math-glossary.pdf
 *
 *   node scripts/gen-math-glossary.mjs
 */
import PDFDocument from "pdfkit";
import fs from "fs";

const KO_FONT = "/System/Library/Fonts/Supplemental/AppleGothic.ttf";

// ── Glossary data: [English, 한국어] pairs grouped by section ───────────────
const SECTIONS = [
  ["수와 연산 · Numbers & Operations", [
    ["Natural number","자연수"],["Whole number","0 이상의 정수(0 포함 자연수)"],["Integer","정수"],
    ["Rational number","유리수"],["Irrational number","무리수"],["Real number","실수"],
    ["Complex number","복소수"],["Imaginary number","허수"],["Imaginary unit (i)","허수 단위"],
    ["Positive number","양수"],["Negative number","음수"],["Nonnegative","음이 아닌"],
    ["Even number","짝수"],["Odd number","홀수"],["Prime number","소수(素數)"],
    ["Composite number","합성수"],["Factor","약수 / 인수"],["Multiple","배수"],
    ["Divisor","약수 / 제수"],["Dividend","피제수"],["Quotient","몫"],["Remainder","나머지"],
    ["Greatest common factor (GCF)","최대공약수"],["Least common multiple (LCM)","최소공배수"],
    ["Prime factorization","소인수분해"],["Numerator","분자"],["Denominator","분모"],
    ["Fraction","분수"],["Proper fraction","진분수"],["Improper fraction","가분수"],
    ["Mixed number","대분수"],["Decimal","소수(小數)"],["Repeating decimal","순환소수"],
    ["Terminating decimal","유한소수"],["Percent","백분율"],["Ratio","비"],["Proportion","비례식"],
    ["Reciprocal","역수"],["Absolute value","절댓값"],["Opposite (additive inverse)","덧셈에 대한 역원"],
    ["Rounding","반올림"],["Estimate","어림(추정)"],["Place value","자릿값"],
    ["Scientific notation","과학적 표기법"],["Exponent","지수"],["Base","밑"],["Power","거듭제곱"],
    ["Square","제곱"],["Cube","세제곱"],["Square root","제곱근"],["Cube root","세제곱근"],
    ["Radical","근호(루트)"],["Radicand","근호 안의 수"],["nth root","n제곱근"],
    ["Order of operations","연산 순서"],["Sum","합"],["Difference","차"],["Product","곱"],
    ["Quotient","몫"],["Addend","덧셈의 항(가수)"],["Minuend","피감수"],["Subtrahend","감수"],
    ["Factorial","계승(팩토리얼)"],["Modular arithmetic","합동 산술(모듈러)"],
    ["Congruent (mod n)","합동(법 n에 대하여)"],["Number line","수직선"],["Interval","구간"],
    ["Magnitude","크기"],["Approximate","근삿값"],["Significant figures","유효숫자"],
  ]],
  ["대수 기초 · Algebra Basics", [
    ["Variable","변수"],["Constant","상수"],["Coefficient","계수"],["Term","항"],
    ["Like terms","동류항"],["Expression","식"],["Algebraic expression","대수식"],
    ["Equation","방정식"],["Inequality","부등식"],["Identity","항등식"],
    ["Evaluate","대입하여 계산하다"],["Simplify","간단히 하다"],["Substitute","대입하다"],
    ["Distribute","분배하다"],["Distributive property","분배법칙"],
    ["Commutative property","교환법칙"],["Associative property","결합법칙"],
    ["Identity property","항등원의 성질"],["Inverse property","역원의 성질"],
    ["Additive identity (0)","덧셈의 항등원"],["Multiplicative identity (1)","곱셈의 항등원"],
    ["Additive inverse","덧셈의 역원"],["Multiplicative inverse","곱셈의 역원"],
    ["Monomial","단항식"],["Binomial","이항식"],["Trinomial","삼항식"],["Polynomial","다항식"],
    ["Degree","차수"],["Leading coefficient","최고차항의 계수"],["Constant term","상수항"],
    ["Standard form","표준형"],["Factor (verb)","인수분해하다"],["Expand","전개하다"],
    ["Like radicals","동류 근호"],["Rationalize","유리화하다"],["FOIL method","FOIL 전개법"],
    ["Greatest common factor","공통인수(최대공약수)"],["Difference of squares","제곱의 차"],
    ["Perfect square trinomial","완전제곱식"],["Sum of cubes","세제곱의 합"],
    ["Difference of cubes","세제곱의 차"],["Factoring by grouping","묶어서 인수분해"],
    ["Literal equation","문자 방정식"],["Formula","공식"],["Solve","풀다(해를 구하다)"],
    ["Solution","해(근)"],["Root","근"],["Zero","영점(근)"],["Extraneous solution","무연근(가짜 해)"],
    ["Equivalent expressions","동치인 식"],["Combine like terms","동류항을 정리하다"],
    ["Isolate the variable","변수를 한쪽으로 고립시키다"],["Balanced equation","평형(양변 균형)"],
  ]],
  ["방정식·부등식 · Equations & Inequalities", [
    ["Linear equation","일차방정식"],["Quadratic equation","이차방정식"],
    ["Cubic equation","삼차방정식"],["Quartic equation","사차방정식"],
    ["Polynomial equation","다항방정식"],["Rational equation","유리방정식"],
    ["Radical equation","무리방정식"],["Exponential equation","지수방정식"],
    ["Logarithmic equation","로그방정식"],["System of equations","연립방정식"],
    ["System of inequalities","연립부등식"],["Slope","기울기"],["y-intercept","y절편"],
    ["x-intercept","x절편"],["Slope-intercept form","기울기-절편 형(y=mx+b)"],
    ["Point-slope form","점-기울기 형"],["Standard form (line)","직선의 표준형"],
    ["Parallel lines","평행선"],["Perpendicular lines","수직선(서로 수직인 직선)"],
    ["Substitution method","대입법"],["Elimination method","가감법(소거법)"],
    ["Graphing method","그래프법"],["Quadratic formula","근의 공식"],
    ["Discriminant","판별식"],["Completing the square","완전제곱식 만들기"],
    ["Factoring (solve)","인수분해로 풀기"],["Vertex","꼭짓점"],["Axis of symmetry","대칭축"],
    ["Parabola","포물선"],["Maximum","최댓값"],["Minimum","최솟값"],["Vertex form","꼭짓점 형"],
    ["Inequality symbol","부등호"],["Greater than","~보다 크다"],["Less than","~보다 작다"],
    ["Greater than or equal to","~ 이상"],["Less than or equal to","~ 이하"],
    ["Compound inequality","복합 부등식"],["Absolute value equation","절댓값 방정식"],
    ["Absolute value inequality","절댓값 부등식"],["Boundary line","경계선"],
    ["Solution set","해집합"],["Feasible region","가능 영역(실현 영역)"],
    ["Consistent system","해를 갖는 연립방정식"],["Inconsistent system","해가 없는 연립방정식"],
    ["Dependent system","무수히 많은 해를 갖는 연립방정식"],["Linear programming","선형 계획법"],
    ["Constraint","제약 조건"],["Objective function","목적 함수"],
    ["Rate of change","변화율"],["Direct variation","정비례"],["Inverse variation","반비례"],
    ["Joint variation","결합 변화"],["Proportional","비례하는"],["Cross-multiply","교차 곱셈"],
  ]],
  ["함수 · Functions", [
    ["Function","함수"],["Relation","관계"],["Domain","정의역"],["Range","치역"],
    ["Codomain","공역"],["Input","입력값"],["Output","출력값"],["Independent variable","독립변수"],
    ["Dependent variable","종속변수"],["Mapping","대응"],["Vertical line test","수직선 판정법"],
    ["Function notation f(x)","함수 표기"],["Evaluate a function","함숫값을 구하다"],
    ["Linear function","일차함수"],["Quadratic function","이차함수"],
    ["Cubic function","삼차함수"],["Polynomial function","다항함수"],
    ["Rational function","유리함수"],["Radical function","무리함수"],
    ["Exponential function","지수함수"],["Logarithmic function","로그함수"],
    ["Absolute value function","절댓값 함수"],["Step function","계단 함수"],
    ["Piecewise function","구간별 정의 함수"],["Greatest integer function","최대 정수 함수"],
    ["Identity function","항등함수"],["Constant function","상수함수"],
    ["Even function","우함수"],["Odd function","기함수"],["Periodic function","주기함수"],
    ["Increasing function","증가함수"],["Decreasing function","감소함수"],
    ["One-to-one function","일대일함수"],["Onto function","전사함수"],
    ["Composite function","합성함수"],["Inverse function","역함수"],
    ["Transformation","변환(이동)"],["Translation","평행이동"],["Reflection","대칭이동"],
    ["Dilation","확대·축소"],["Stretch","늘이기"],["Compression","줄이기"],
    ["Horizontal shift","가로 이동"],["Vertical shift","세로 이동"],
    ["Amplitude","진폭"],["Period","주기"],["Phase shift","위상 이동"],
    ["Asymptote","점근선"],["Horizontal asymptote","수평 점근선"],
    ["Vertical asymptote","수직 점근선"],["Oblique asymptote","사선 점근선"],
    ["End behavior","끝 모양(끝 거동)"],["Continuous","연속인"],["Discontinuous","불연속인"],
    ["Hole (removable)","구멍(없앨 수 있는 불연속)"],["Intercept","절편"],
    ["Turning point","극값을 갖는 점"],["Symmetry","대칭"],["Parent function","기본 함수"],
  ]],
  ["다항식·지수·로그 · Polynomials, Exponents & Logs", [
    ["Polynomial long division","다항식의 긴 나눗셈"],["Synthetic division","조립제법"],
    ["Remainder theorem","나머지정리"],["Factor theorem","인수정리"],
    ["Rational root theorem","유리근 정리"],["Fundamental theorem of algebra","대수학의 기본정리"],
    ["Multiplicity","중복도"],["Complex conjugate","켤레 복소수"],
    ["Conjugate","켤레"],["Descartes' rule of signs","데카르트의 부호 규칙"],
    ["Leading term","최고차항"],["Binomial theorem","이항정리"],["Pascal's triangle","파스칼의 삼각형"],
    ["Power rule (exponents)","지수법칙"],["Product of powers","거듭제곱의 곱 법칙"],
    ["Quotient of powers","거듭제곱의 몫 법칙"],["Power of a power","거듭제곱의 거듭제곱"],
    ["Zero exponent","0 지수"],["Negative exponent","음의 지수"],
    ["Fractional exponent","분수 지수"],["Rational exponent","유리수 지수"],
    ["Exponential growth","지수적 증가"],["Exponential decay","지수적 감소"],
    ["Growth factor","증가 비율(인자)"],["Decay factor","감소 비율(인자)"],
    ["Compound interest","복리"],["Continuous compounding","연속 복리"],
    ["Half-life","반감기"],["Logarithm","로그"],["Common logarithm","상용로그"],
    ["Natural logarithm (ln)","자연로그"],["Base e","자연상수 e"],["Change of base","밑 변환"],
    ["Product rule (logs)","로그의 곱 법칙"],["Quotient rule (logs)","로그의 몫 법칙"],
    ["Power rule (logs)","로그의 지수 법칙"],["Logarithmic scale","로그 척도"],
    ["Exponentiate","지수를 취하다"],["Antilogarithm","역로그"],
  ]],
  ["기하 — 도형 · Geometry: Shapes", [
    ["Point","점"],["Line","직선"],["Line segment","선분"],["Ray","반직선"],["Plane","평면"],
    ["Angle","각"],["Vertex","꼭짓점"],["Side","변"],["Polygon","다각형"],
    ["Triangle","삼각형"],["Equilateral triangle","정삼각형"],["Isosceles triangle","이등변삼각형"],
    ["Scalene triangle","부등변삼각형"],["Right triangle","직각삼각형"],
    ["Acute triangle","예각삼각형"],["Obtuse triangle","둔각삼각형"],
    ["Quadrilateral","사각형"],["Square","정사각형"],["Rectangle","직사각형"],
    ["Parallelogram","평행사변형"],["Rhombus","마름모"],["Trapezoid","사다리꼴"],
    ["Kite","연 모양 사각형"],["Pentagon","오각형"],["Hexagon","육각형"],
    ["Heptagon","칠각형"],["Octagon","팔각형"],["Nonagon","구각형"],["Decagon","십각형"],
    ["Regular polygon","정다각형"],["Irregular polygon","부정형 다각형"],
    ["Convex polygon","볼록 다각형"],["Concave polygon","오목 다각형"],
    ["Circle","원"],["Radius","반지름"],["Diameter","지름"],["Chord","현"],
    ["Arc","호"],["Major arc","우호(큰 호)"],["Minor arc","열호(작은 호)"],
    ["Sector","부채꼴"],["Segment (circle)","활꼴"],["Tangent (circle)","접선"],
    ["Secant (line)","할선"],["Circumference","원둘레"],["Central angle","중심각"],
    ["Inscribed angle","원주각"],["Semicircle","반원"],["Concentric circles","동심원"],
    ["Solid","입체"],["Polyhedron","다면체"],["Prism","각기둥"],["Pyramid","각뿔"],
    ["Cylinder","원기둥"],["Cone","원뿔"],["Sphere","구"],["Cube","정육면체"],
    ["Rectangular prism","직육면체"],["Tetrahedron","정사면체"],["Edge","모서리"],
    ["Face","면"],["Net","전개도"],["Cross section","단면"],["Apex","꼭대기(정점)"],
    ["Base (solid)","밑면"],["Lateral face","옆면"],["Altitude","높이(수선)"],
    ["Perimeter","둘레"],["Area","넓이"],["Surface area","겉넓이"],["Volume","부피"],
    ["Lateral area","옆넓이"],["Slant height","빗변 높이(모선)"],
  ]],
  ["기하 — 각·관계 · Angles & Relationships", [
    ["Acute angle","예각"],["Right angle","직각"],["Obtuse angle","둔각"],
    ["Straight angle","평각"],["Reflex angle","우각(180°~360°)"],
    ["Complementary angles","여각(합 90°)"],["Supplementary angles","보각(합 180°)"],
    ["Vertical angles","맞꼭지각"],["Adjacent angles","인접각"],
    ["Corresponding angles","동위각"],["Alternate interior angles","엇각(엇변 내각)"],
    ["Alternate exterior angles","엇각(엇변 외각)"],["Co-interior angles","동측 내각"],
    ["Interior angle","내각"],["Exterior angle","외각"],["Transversal","횡단선"],
    ["Bisector","이등분선"],["Angle bisector","각의 이등분선"],
    ["Perpendicular bisector","수직 이등분선"],["Median (triangle)","중선"],
    ["Centroid","무게중심"],["Circumcenter","외심"],["Incenter","내심"],
    ["Orthocenter","수심"],["Congruent","합동인"],["Similar","닮은"],
    ["Congruence","합동"],["Similarity","닮음"],["Scale factor","닮음비(축척)"],
    ["Corresponding sides","대응변"],["Corresponding angles","대응각"],
    ["SSS (side-side-side)","SSS 합동조건"],["SAS","SAS 합동조건"],["ASA","ASA 합동조건"],
    ["AAS","AAS 합동조건"],["HL (hypotenuse-leg)","RHS(빗변-한 변) 합동"],
    ["AA similarity","AA 닮음조건"],["Hypotenuse","빗변"],["Leg","직각변"],
    ["Pythagorean theorem","피타고라스 정리"],["Pythagorean triple","피타고라스 수"],
    ["Midpoint","중점"],["Equidistant","등거리에 있는"],["Parallel","평행한"],
    ["Perpendicular","수직인"],["Collinear","한 직선 위에 있는(공선)"],
    ["Coplanar","한 평면 위에 있는(공면)"],["Reflexive property","반사성"],
    ["Transitive property","추이성"],["Two-column proof","두 단 증명"],
    ["Postulate","공준(공리)"],["Theorem","정리"],["Corollary","따름정리"],
    ["Converse","역(명제의 역)"],["Counterexample","반례"],
  ]],
  ["삼각법 · Trigonometry", [
    ["Sine","사인"],["Cosine","코사인"],["Tangent","탄젠트"],["Cosecant","코시컨트"],
    ["Secant","시컨트"],["Cotangent","코탄젠트"],["SOH-CAH-TOA","SOH-CAH-TOA"],
    ["Opposite side","대변"],["Adjacent side","인접변"],["Angle of elevation","올려본각(앙각)"],
    ["Angle of depression","내려본각(부각)"],["Unit circle","단위원"],["Radian","라디안(호도)"],
    ["Degree","도(度)"],["Arc length","호의 길이"],["Reference angle","기준각"],
    ["Coterminal angles","동경각"],["Standard position","표준 위치"],
    ["Initial side","시초선"],["Terminal side","동경(종변)"],["Quadrant","사분면"],
    ["Periodic","주기적인"],["Amplitude","진폭"],["Midline","중앙선"],
    ["Sinusoidal","정현파의(사인형의)"],["Pythagorean identity","피타고라스 항등식"],
    ["Reciprocal identity","역수 항등식"],["Quotient identity","몫 항등식"],
    ["Cofunction identity","여함수 항등식"],["Even-odd identity","우기함수 항등식"],
    ["Sum and difference formula","덧셈정리(합·차 공식)"],
    ["Double-angle formula","배각 공식"],["Half-angle formula","반각 공식"],
    ["Law of sines","사인법칙"],["Law of cosines","코사인법칙"],
    ["Inverse sine (arcsin)","역사인"],["Inverse cosine (arccos)","역코사인"],
    ["Inverse tangent (arctan)","역탄젠트"],["Trigonometric equation","삼각방정식"],
    ["Trigonometric identity","삼각 항등식"],["Solving triangles","삼각형 풀기"],
    ["Bearing","방위각"],["Ambiguous case","애매한 경우(SSA)"],
  ]],
  ["좌표·해석기하 · Coordinate Geometry", [
    ["Coordinate plane","좌표평면"],["Cartesian plane","데카르트 좌표평면"],
    ["x-axis","x축"],["y-axis","y축"],["Origin","원점"],["Ordered pair","순서쌍"],
    ["Coordinate","좌표"],["Abscissa","가로좌표(x좌표)"],["Ordinate","세로좌표(y좌표)"],
    ["Quadrant I~IV","제1~4 사분면"],["Distance formula","거리 공식"],
    ["Midpoint formula","중점 공식"],["Slope formula","기울기 공식"],
    ["Equation of a line","직선의 방정식"],["Equation of a circle","원의 방정식"],
    ["Conic section","원뿔곡선"],["Ellipse","타원"],["Hyperbola","쌍곡선"],
    ["Focus","초점"],["Directrix","준선"],["Major axis","장축"],["Minor axis","단축"],
    ["Eccentricity","이심률"],["Vertex (conic)","꼭짓점"],["Center","중심"],
    ["Asymptote (hyperbola)","쌍곡선의 점근선"],["Latus rectum","통경(직립현)"],
    ["Polar coordinates","극좌표"],["Polar axis","극축"],["Pole","극(원점)"],
    ["Parametric equation","매개변수 방정식"],["Parameter","매개변수"],
    ["Vector (geometry)","벡터"],["Translation vector","평행이동 벡터"],
    ["Reflection over an axis","축에 대한 대칭"],["Rotation","회전이동"],
    ["Symmetry about origin","원점 대칭"],["Line of symmetry","대칭선"],
  ]],
  ["미적분 — 극한·연속 · Limits & Continuity", [
    ["Limit","극한"],["Left-hand limit","좌극한"],["Right-hand limit","우극한"],
    ["One-sided limit","한쪽 극한"],["Limit at infinity","무한대에서의 극한"],
    ["Infinite limit","무한 극한"],["Indeterminate form","부정형"],
    ["Continuity","연속성"],["Continuous function","연속함수"],
    ["Discontinuity","불연속"],["Removable discontinuity","제거 가능한 불연속"],
    ["Jump discontinuity","비약(점프) 불연속"],["Infinite discontinuity","무한 불연속"],
    ["Squeeze theorem","조임정리(샌드위치 정리)"],["L'Hôpital's rule","로피탈 정리"],
    ["Intermediate value theorem","중간값 정리"],["Epsilon-delta definition","엡실론-델타 정의"],
    ["Approaches","~에 가까워지다"],["Converge","수렴하다"],["Diverge","발산하다"],
    ["Bounded","유계인"],["Unbounded","유계가 아닌"],["Asymptotic behavior","점근적 거동"],
    ["Limit exists","극한이 존재한다"],["Does not exist (DNE)","존재하지 않음"],
  ]],
  ["미적분 — 미분 · Derivatives", [
    ["Derivative","도함수"],["Differentiation","미분"],["Differentiable","미분 가능한"],
    ["Instantaneous rate of change","순간변화율"],["Average rate of change","평균변화율"],
    ["Slope of tangent line","접선의 기울기"],["Tangent line","접선"],["Secant line","할선"],
    ["Difference quotient","차분몫"],["Power rule","거듭제곱 법칙"],["Product rule","곱의 미분법"],
    ["Quotient rule","몫의 미분법"],["Chain rule","연쇄법칙(합성함수 미분)"],
    ["Implicit differentiation","음함수 미분법"],["Logarithmic differentiation","로그 미분법"],
    ["Higher-order derivative","고계도함수"],["Second derivative","이계도함수"],
    ["Critical point","임계점"],["Stationary point","정류점"],["Local maximum","극댓값"],
    ["Local minimum","극솟값"],["Absolute maximum","최댓값"],["Absolute minimum","최솟값"],
    ["Extremum","극값"],["First derivative test","일계도함수 판정법"],
    ["Second derivative test","이계도함수 판정법"],["Concavity","오목·볼록"],
    ["Concave up","아래로 볼록(위로 오목)"],["Concave down","위로 볼록(아래로 오목)"],
    ["Inflection point","변곡점"],["Increasing/decreasing","증가·감소"],
    ["Mean value theorem","평균값 정리"],["Rolle's theorem","롤의 정리"],
    ["Related rates","관련 변화율"],["Optimization","최적화"],
    ["Linear approximation","선형 근사"],["Differential","미분(차분)"],
    ["Velocity","속도"],["Acceleration","가속도"],["Position function","위치 함수"],
    ["Marginal cost","한계비용"],["Newton's method","뉴턴의 방법"],
  ]],
  ["미적분 — 적분 · Integrals", [
    ["Integral","적분"],["Integration","적분(적분하기)"],["Antiderivative","부정적분(원시함수)"],
    ["Indefinite integral","부정적분"],["Definite integral","정적분"],
    ["Constant of integration","적분상수"],["Integrand","피적분함수"],
    ["Limits of integration","적분 구간"],["Riemann sum","리만 합"],
    ["Left/Right endpoint sum","좌·우 끝점 합"],["Midpoint rule","중점 법칙"],
    ["Trapezoidal rule","사다리꼴 공식"],["Simpson's rule","심프슨 공식"],
    ["Fundamental theorem of calculus","미적분의 기본정리"],
    ["Area under a curve","곡선 아래 넓이"],["Net area","순넓이"],
    ["Area between curves","곡선 사이 넓이"],["Volume of revolution","회전체의 부피"],
    ["Disk method","원판법"],["Washer method","원환법(와셔법)"],["Shell method","원통껍질법"],
    ["U-substitution","치환적분"],["Integration by parts","부분적분"],
    ["Partial fractions","부분분수 분해"],["Trigonometric substitution","삼각치환"],
    ["Improper integral","이상적분"],["Average value of a function","함수의 평균값"],
    ["Accumulation function","누적 함수"],["Arc length (integral)","곡선의 길이"],
    ["Surface area (revolution)","회전면의 넓이"],["Work (integral)","일(적분)"],
    ["Center of mass","질량 중심"],["Differential equation","미분방정식"],
    ["Separable equation","변수분리형 방정식"],["Slope field","기울기장(방향장)"],
    ["Initial condition","초기 조건"],["General solution","일반해"],["Particular solution","특수해"],
  ]],
  ["수열·급수 · Sequences & Series", [
    ["Sequence","수열"],["Term (sequence)","항"],["Finite sequence","유한수열"],
    ["Infinite sequence","무한수열"],["Arithmetic sequence","등차수열"],
    ["Geometric sequence","등비수열"],["Common difference","공차"],["Common ratio","공비"],
    ["Recursive formula","점화식"],["Explicit formula","일반항 공식"],["nth term","제 n항"],
    ["Series","급수"],["Partial sum","부분합"],["Arithmetic series","등차급수"],
    ["Geometric series","등비급수"],["Infinite series","무한급수"],
    ["Convergent series","수렴급수"],["Divergent series","발산급수"],
    ["Sum to infinity","무한합"],["Sigma notation","시그마 표기"],["Summation","합(시그마)"],
    ["Harmonic series","조화급수"],["p-series","p급수"],["Alternating series","교대급수"],
    ["Ratio test","비 판정법"],["Root test","근 판정법"],["Comparison test","비교 판정법"],
    ["Integral test","적분 판정법"],["Telescoping series","망원급수"],
    ["Power series","멱급수"],["Taylor series","테일러 급수"],["Maclaurin series","매클로린 급수"],
    ["Radius of convergence","수렴 반지름"],["Interval of convergence","수렴 구간"],
    ["Absolute convergence","절대수렴"],["Conditional convergence","조건수렴"],
  ]],
  ["확률·통계 · Probability & Statistics", [
    ["Statistics","통계"],["Data","자료(데이터)"],["Population","모집단"],["Sample","표본"],
    ["Parameter","모수"],["Statistic","통계량"],["Categorical data","범주형 자료"],
    ["Quantitative data","양적 자료"],["Discrete data","이산 자료"],["Continuous data","연속 자료"],
    ["Frequency","도수"],["Relative frequency","상대도수"],["Frequency table","도수분포표"],
    ["Histogram","히스토그램"],["Bar graph","막대그래프"],["Pie chart","원그래프"],
    ["Line graph","꺾은선그래프"],["Dot plot","점도표"],["Stem-and-leaf plot","줄기-잎 그림"],
    ["Box plot","상자그림"],["Scatter plot","산점도"],["Mean","평균"],["Median","중앙값"],
    ["Mode","최빈값"],["Range","범위"],["Quartile","사분위수"],["Interquartile range (IQR)","사분위범위"],
    ["Percentile","백분위수"],["Variance","분산"],["Standard deviation","표준편차"],
    ["Outlier","이상값"],["Skewness","왜도(치우침)"],["Symmetric distribution","대칭분포"],
    ["Normal distribution","정규분포"],["Bell curve","종 모양 곡선"],["Z-score","z점수(표준점수)"],
    ["Empirical rule","경험적 규칙(68-95-99.7)"],["Correlation","상관관계"],
    ["Correlation coefficient","상관계수"],["Line of best fit","최적 적합선"],
    ["Regression","회귀"],["Residual","잔차"],["Probability","확률"],
    ["Experiment","시행"],["Outcome","결과"],["Sample space","표본공간"],["Event","사건"],
    ["Favorable outcome","유리한 결과"],["Theoretical probability","수학적 확률"],
    ["Experimental probability","실험적(통계적) 확률"],["Independent events","독립사건"],
    ["Dependent events","종속사건"],["Mutually exclusive","배반사건"],
    ["Complement","여사건"],["Conditional probability","조건부 확률"],
    ["Addition rule","덧셈정리"],["Multiplication rule","곱셈정리"],["Bayes' theorem","베이즈 정리"],
    ["Permutation","순열"],["Combination","조합"],["Fundamental counting principle","곱의 법칙"],
    ["Factorial","계승(팩토리얼)"],["Random variable","확률변수"],
    ["Probability distribution","확률분포"],["Expected value","기댓값"],
    ["Binomial distribution","이항분포"],["Geometric distribution","기하분포"],
    ["Poisson distribution","포아송분포"],["Margin of error","오차 한계"],
    ["Confidence interval","신뢰구간"],["Hypothesis test","가설검정"],
    ["Null hypothesis","귀무가설"],["Alternative hypothesis","대립가설"],
    ["p-value","유의확률(p값)"],["Significance level","유의수준"],["Sampling","표집"],
    ["Random sample","무작위 표본"],["Bias","편향"],["Survey","설문조사"],
  ]],
  ["행렬·벡터 · Matrices & Vectors", [
    ["Matrix","행렬"],["Element/Entry","성분(원소)"],["Row","행"],["Column","열"],
    ["Dimension","차원(크기)"],["Square matrix","정사각행렬"],["Identity matrix","단위행렬"],
    ["Zero matrix","영행렬"],["Diagonal matrix","대각행렬"],["Transpose","전치행렬"],
    ["Matrix addition","행렬의 덧셈"],["Scalar multiplication","스칼라 곱"],
    ["Matrix multiplication","행렬의 곱셈"],["Determinant","행렬식"],
    ["Inverse matrix","역행렬"],["Singular matrix","특이행렬(역행렬 없음)"],
    ["Augmented matrix","첨가행렬(확대행렬)"],["Coefficient matrix","계수행렬"],
    ["Row reduction","행 축약"],["Gaussian elimination","가우스 소거법"],
    ["Reduced row echelon form","기약 행 사다리꼴"],["Cramer's rule","크라메르 공식"],
    ["Vector","벡터"],["Scalar","스칼라"],["Component","성분"],["Magnitude","크기(노름)"],
    ["Direction","방향"],["Unit vector","단위벡터"],["Position vector","위치벡터"],
    ["Dot product","내적"],["Cross product","외적"],["Resultant","합벡터"],
    ["Orthogonal","직교하는"],["Parallel vectors","평행한 벡터"],["Norm","노름(크기)"],
    ["Linear combination","일차결합"],["Linearly independent","일차독립"],
  ]],
  ["집합·논리·수론 · Sets, Logic & Number Theory", [
    ["Set","집합"],["Element","원소"],["Subset","부분집합"],["Proper subset","진부분집합"],
    ["Universal set","전체집합"],["Empty set","공집합"],["Union","합집합"],
    ["Intersection","교집합"],["Complement (set)","여집합"],["Difference (set)","차집합"],
    ["Disjoint sets","서로소 집합"],["Cardinality","원소의 개수(농도)"],
    ["Venn diagram","벤 다이어그램"],["Roster notation","원소나열법"],
    ["Set-builder notation","조건제시법"],["Interval notation","구간 표기법"],
    ["Finite set","유한집합"],["Infinite set","무한집합"],["Power set","멱집합"],
    ["Statement (logic)","명제"],["Conjunction (AND)","논리곱(그리고)"],
    ["Disjunction (OR)","논리합(또는)"],["Negation (NOT)","부정"],
    ["Conditional (if-then)","조건명제"],["Biconditional","쌍조건명제"],
    ["Converse","역"],["Inverse","이(裏)"],["Contrapositive","대우"],
    ["Truth value","진릿값"],["Truth table","진리표"],["Tautology","항진명제"],
    ["Quantifier","한정사"],["For all (∀)","모든 ~에 대하여"],["There exists (∃)","어떤 ~이 존재한다"],
    ["Proof by contradiction","귀류법"],["Mathematical induction","수학적 귀납법"],
    ["Divisibility","나누어떨어짐(가분성)"],["Divisible by","~로 나누어떨어지는"],
    ["Modulo","나머지(법)"],["Relatively prime (coprime)","서로소"],
    ["Euclidean algorithm","유클리드 호제법"],["Parity","홀짝성(패리티)"],
    ["Perfect number","완전수"],["Fibonacci sequence","피보나치 수열"],
    ["Golden ratio","황금비"],["Counting","경우의 수"],["Pigeonhole principle","비둘기집 원리"],
  ]],
  ["측정·단위·기하량 · Measurement & Units", [
    ["Length","길이"],["Width","너비"],["Height","높이"],["Depth","깊이"],["Thickness","두께"],
    ["Distance","거리"],["Weight","무게"],["Mass","질량"],["Capacity","용량"],["Temperature","온도"],
    ["Metric system","미터법"],["Customary units","미국 관습 단위"],["Conversion factor","환산 인수"],
    ["Unit rate","단위량(비율)"],["Scale (drawing)","축척"],["Scale factor","축척 비율"],
    ["Dimension","치수(차원)"],["Square unit","제곱 단위"],["Cubic unit","세제곱 단위"],
    ["Degree (angle)","도(각도)"],["Minute (angle)","분(각도)"],["Second (angle)","초(각도)"],
    ["Radian measure","라디안 측정"],["Significant digits","유효숫자"],["Precision","정밀도"],
    ["Accuracy","정확도"],["Error","오차"],["Absolute error","절대오차"],["Relative error","상대오차"],
    ["Percent error","백분율 오차"],["Tolerance","허용오차"],["Rounding error","반올림 오차"],
    ["Estimation","어림(추정)"],["Benchmark","기준값"],["Perimeter","둘레"],["Circumference","원둘레"],
    ["Diagonal","대각선"],["Apothem","변심 거리(아포뎀)"],["Lateral surface","옆면"],
    ["Cross-sectional area","단면적"],["Density","밀도"],["Speed","속력"],["Velocity","속도"],
    ["Rate","비율(율)"],["Flow rate","유량"],["Slope as a rate","변화율로서의 기울기"],
  ]],
  ["금융·비율 수학 · Financial & Proportional Math", [
    ["Percent increase","증가율"],["Percent decrease","감소율"],["Percent change","변화율(%)"],
    ["Discount","할인"],["Markup","인상(마진)"],["Markdown","인하"],["Sale price","판매가"],
    ["Original price","원가(정가)"],["Tax","세금"],["Tip","팁(봉사료)"],["Commission","수수료"],
    ["Interest","이자"],["Principal","원금"],["Simple interest","단리"],["Compound interest","복리"],
    ["Interest rate","이자율"],["Annual rate (APR)","연이율"],["Balance","잔액"],
    ["Profit","이익"],["Loss","손실"],["Revenue","수입(매출)"],["Cost","비용"],
    ["Break-even point","손익분기점"],["Budget","예산"],["Depreciation","감가상각"],
    ["Appreciation","가치 상승"],["Unit price","단가"],["Best buy","최저가 구매(가성비)"],
    ["Currency exchange","환율 교환"],["Exchange rate","환율"],["Down payment","계약금(선금)"],
    ["Installment","할부"],["Annuity","연금"],["Present value","현재가치"],["Future value","미래가치"],
    ["Rate of return","수익률"],["Inflation","인플레이션"],["Proportion (scale)","비례(축척)"],
    ["Direct proportion","정비례"],["Inverse proportion","반비례"],["Constant of proportionality","비례상수"],
    ["Equivalent ratios","같은 비"],["Scale model","축척 모형"],["Map scale","지도 축척"],
  ]],
  ["그래프·자료 해석 · Graphs & Data Interpretation", [
    ["Graph","그래프"],["Plot","그리다(점을 찍다)"],["Coordinate","좌표"],["Axis","축"],
    ["Scale (axis)","눈금(축척)"],["Gridline","격자선"],["Label","이름표(라벨)"],["Legend/Key","범례"],
    ["Title","제목"],["Trend","추세"],["Increasing trend","증가 추세"],["Decreasing trend","감소 추세"],
    ["Positive correlation","양의 상관관계"],["Negative correlation","음의 상관관계"],
    ["No correlation","상관관계 없음"],["Linear trend","선형 추세"],["Nonlinear","비선형의"],
    ["Slope of a graph","그래프의 기울기"],["Intercept (graph)","절편"],["Peak","최고점"],
    ["Trough","최저점"],["Plateau","평탄 구간"],["Spike","급등(스파이크)"],["Cluster","군집"],
    ["Gap","빈 구간"],["Spread","퍼짐(산포)"],["Distribution shape","분포 모양"],
    ["Symmetric","대칭의"],["Skewed left","왼쪽으로 치우친"],["Skewed right","오른쪽으로 치우친"],
    ["Uniform distribution","균등분포"],["Bimodal","이봉형(최빈값 2개)"],["Frequency polygon","도수다각형"],
    ["Cumulative frequency","누적도수"],["Ogive","누적도수곡선(오자이브)"],
    ["Pictograph","그림그래프"],["Double bar graph","이중 막대그래프"],["Multi-line graph","복수 꺾은선그래프"],
    ["Area under the curve","곡선 아래 넓이"],["Rate from a graph","그래프로부터의 변화율"],
    ["Reading a graph","그래프 읽기"],["Extrapolation","외삽(추정)"],["Interpolation","내삽(보간)"],
    ["Best-fit line","최적 적합선"],["Data point","자룟값(데이터 점)"],
  ]],
  ["AP·SAT 빈출 추가 용어 · More AP·SAT Terms", [
    ["Function machine","함수 기계(입출력 모형)"],["Mapping diagram","대응 그림"],
    ["Table of values","값의 표"],["Input-output table","입출력 표"],
    ["Rate of change (table)","표에서의 변화율"],["Recursive sequence","점화 수열"],
    ["Arithmetic mean","산술평균"],["Geometric mean","기하평균"],["Weighted average","가중평균"],
    ["Proportional reasoning","비례 추론"],["Dimensional analysis","차원 해석(단위 분석)"],
    ["Equivalent equations","동치 방정식"],["Equivalent fractions","같은 분수"],
    ["Cross section of a solid","입체의 단면"],["Solid of revolution","회전체"],
    ["Composite figure","복합 도형"],["Regular tessellation","정규 테셀레이션(쪽매맞춤)"],
    ["Transformation matrix","변환 행렬"],["Rigid motion","강체 운동(합동변환)"],
    ["Dilation factor","확대 비율"],["Image (transformation)","상(변환 후 도형)"],
    ["Pre-image","원상(변환 전 도형)"],["Invariant point","불변점"],
    ["Conjecture","추측"],["Generalization","일반화"],["Pattern","규칙(패턴)"],
    ["Inductive reasoning","귀납적 추론"],["Deductive reasoning","연역적 추론"],
    ["Valid argument","타당한 논증"],["Assumption","가정"],["Hypothesis (if part)","가정(조건절)"],
    ["Conclusion (then part)","결론"],["If and only if","필요충분조건(~일 때 그리고 오직 그때)"],
    ["Necessary condition","필요조건"],["Sufficient condition","충분조건"],
    ["Boundary value","경곗값"],["Domain restriction","정의역 제한"],
    ["Restricted domain","제한된 정의역"],["Symmetry test","대칭성 검사"],
    ["Sign chart","부호표"],["Sign analysis","부호 분석"],["Test point","검정점"],
    ["Critical value","임곗값"],["Saddle point","안장점"],["Global extremum","전역 극값"],
    ["Boundedness","유계성"],["Monotonic","단조로운(단조증가·감소)"],
    ["Piecewise-defined","구간별 정의된"],["Well-defined","잘 정의된"],
  ]],
  ["문제풀이 지시어·기호 · Command Words & Symbols", [
    ["Solve","풀어라(해를 구하라)"],["Simplify","간단히 하라"],["Evaluate","값을 구하라(계산하라)"],
    ["Factor","인수분해하라"],["Expand","전개하라"],["Graph","그래프로 나타내라"],
    ["Sketch","개략적으로 그려라"],["Prove","증명하라"],["Show that","~임을 보여라"],
    ["Verify","확인하라(검증하라)"],["Justify","근거를 들어 설명하라"],["Explain","설명하라"],
    ["Determine","구하라(결정하라)"],["Find","구하라"],["Calculate","계산하라"],
    ["Estimate","어림하라(추정하라)"],["Approximate","근삿값을 구하라"],["Round","반올림하라"],
    ["Compare","비교하라"],["Describe","서술하라"],["Interpret","해석하라"],
    ["Classify","분류하라"],["Convert","변환하라(단위를 바꿔라)"],["Express","나타내라(표현하라)"],
    ["Rewrite","다시 써라(고쳐 써라)"],["Derive","유도하라"],["Hence","따라서(앞 결과를 이용해)"],
    ["State","말하여라(명시하라)"],["Identify","찾아내라(식별하라)"],
    ["Plus / Add","더하기 / 더하다"],["Minus / Subtract","빼기 / 빼다"],
    ["Times / Multiply","곱하기 / 곱하다"],["Divided by","~로 나누기"],
    ["Equals","같다(=)"],["Approximately equal (≈)","약 같다"],["Not equal (≠)","같지 않다"],
    ["Plus-minus (±)","플러스마이너스"],["Less than (<)","미만"],["Greater than (>)","초과"],
    ["At most (≤)","이하"],["At least (≥)","이상"],["Infinity (∞)","무한대"],
    ["Pi (π)","원주율 파이"],["Theta (θ)","세타(각)"],["Delta (Δ)","델타(변화량)"],
    ["Sigma (Σ)","시그마(합)"],["Integral sign (∫)","적분 기호"],["Therefore (∴)","그러므로"],
    ["Because (∵)","왜냐하면"],["Per","~당(매)"],["Of (multiplication)","~의(곱하기)"],
    ["Sum of","~의 합"],["Difference of","~의 차"],["Product of","~의 곱"],["Quotient of","~의 몫"],
  ]],
];

// ── PDF rendering ───────────────────────────────────────────────────────────
const total = SECTIONS.reduce((n, [, t]) => n + t.length, 0);
const outPath = "public/parents-docs/math-glossary.pdf";

const doc = new PDFDocument({ size: "A4", margin: 40, bufferPages: true,
  info: { Title: "미국입시 수학 용어집 (영-한)", Author: "InHero", Subject: "Bilingual Math Glossary" } });
doc.registerFont("ko", KO_FONT);
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

const GREEN = "#00b85f", INK = "#1a1a1f", SUB = "#5b6b7b", LINE = "#e6e8ec";
const PAGE_W = doc.page.width, M = 40;
const COL_W = (PAGE_W - M * 2 - 20) / 2;       // two columns
const colX = [M, M + COL_W + 20];

// Cover
doc.font("ko").fillColor(INK).fontSize(30).text("미국입시 수학 용어집", M, 150, { align: "center" });
doc.fontSize(15).fillColor(GREEN).text("Bilingual Math Glossary  ·  English ↔ 한국어", { align: "center" });
doc.moveDown(1.2);
doc.fontSize(12.5).fillColor(SUB).text(
  `AP · SAT · 미국 고교 수학 전 범위를 아우르는 ${total.toLocaleString()}개 핵심 용어.\n` +
  `대수 · 기하 · 삼각법 · 미적분 · 확률통계 · 행렬 · 집합/논리까지.\n` +
  `영어 용어를 한국어 뜻과 함께 정리해, 한국어로 이해하고 영어로 떠올리는 연습에 최적화했습니다.`,
  M, 240, { align: "center", width: PAGE_W - M * 2, lineGap: 6 });
doc.fontSize(11).fillColor("#9aa7b4").text("InHero · 인히어로에듀", M, 360, { align: "center" });
doc.fontSize(10).fillColor("#aeb8c2").text("inheroedu.com", { align: "center" });

let pageNum = 1;
function newColumnLayout(title) {
  doc.addPage(); pageNum++;
  // section header
  doc.font("ko").fillColor(INK).fontSize(15).text(title, M, M);
  doc.moveTo(M, M + 24).lineTo(PAGE_W - M, M + 24).strokeColor(GREEN).lineWidth(2).stroke();
  return M + 36;
}

for (const [title, terms] of SECTIONS) {
  let y = newColumnLayout(title);
  let col = 0;
  let n = 0;
  const startY = y;
  const bottom = doc.page.height - 50;
  for (const [en, ko] of terms) {
    if (y > bottom) {
      if (col === 0) { col = 1; y = startY; }
      else { y = newColumnLayout(title + " (계속)"); col = 0; }
    }
    const x = colX[col];
    n++;
    doc.font("ko").fontSize(9.5).fillColor(INK).text(en, x, y, { width: COL_W, continued: false });
    const enH = doc.heightOfString(en, { width: COL_W, fontSize: 9.5 });
    doc.fontSize(9).fillColor(SUB).text(ko, x + 6, y + enH, { width: COL_W - 6 });
    const koH = doc.heightOfString(ko, { width: COL_W - 6, fontSize: 9 });
    const rowH = enH + koH + 6;
    doc.moveTo(x, y + rowH - 2).lineTo(x + COL_W, y + rowH - 2).strokeColor(LINE).lineWidth(0.5).stroke();
    y += rowH;
  }
}

// Footer page numbers
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(i);
  doc.font("ko").fontSize(8).fillColor("#aeb8c2")
    .text(`InHero 미국입시 수학 용어집 · ${total}개 용어`, M, doc.page.height - 30, { width: PAGE_W - M * 2, align: "left", lineBreak: false });
  doc.text(`${i + 1} / ${range.count}`, M, doc.page.height - 30, { width: PAGE_W - M * 2, align: "right", lineBreak: false });
}

doc.end();
stream.on("finish", () => {
  const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`✓ ${outPath} — ${total} terms, ${range.count} pages, ${kb} KB`);
});
