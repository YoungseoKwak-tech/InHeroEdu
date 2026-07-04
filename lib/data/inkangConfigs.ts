import type { InkangConfig } from "@/components/seo/InkangLanding";

/**
 * Per-subject configs for the Korean "OO 인강" exact-match SEO landings.
 * All hrefs are verified-live routes (kr courses / question-bank / core-notes /
 * textbooks / sat / mock-exams). Add a new subject here + a thin page under
 * app/kr/<slug>/page.tsx + a sitemap entry.
 */

export const CHEM_INKANG: InkangConfig = {
  slug: "chem-inkang",
  phrase: "화학 인강",
  eyebrow: "🧪 AP · IB · 내신 화학 인터넷강의",
  accent: "#2563EB",
  title: "화학 인강 — AP·IB·내신 화학 인터넷강의 | 코어노트·문제은행",
  description:
    "화학 인강 한 곳에서 끝내기. 아이비리그생이 만든 AP 화학 인강, IB Chemistry 인강, 내신·Honors 화학 인강 — 핵심개념 코어노트, 단원별 문제은행, 디지털 교재, AI 튜터까지. 무료로 시작하세요.",
  keywords: ["화학 인강", "AP 화학 인강", "IB 화학 인강", "AP Chemistry 인강", "IB Chemistry 인강", "일반화학 인강", "미국 화학 인강", "내신 화학 인강", "케미스트리 인강", "InHero"],
  heroStrong: "AP 화학 인강 · IB Chemistry 인강 · 내신 화학 인강",
  heroLede: "을 한 곳에서. 아이비리그생이 만든 한국어 핵심개념 코어노트, 단원별 문제은행, 디지털 교재, 24시간 AI 튜터까지 — 화학 인강에 필요한 모든 것을 담았습니다.",
  primaryCta: { href: "/kr/courses/ap-chemistry", label: "AP 화학 인강 시작하기" },
  secondaryCta: { href: "/core-notes", label: "화학 코어노트 보기" },
  courseName: "화학 인강 (AP Chemistry 인터넷강의)",
  courseDesc: "AP Chemistry 9개 단원을 한국어 코어노트와 단원별 문제로 정복하는 화학 인강.",
  courseWorkload: "P9W",
  footerCta: { href: "/kr/courses", label: "전체 화학 인강·강의 보러가기" },
  tracks: [
    {
      tag: "AP", title: "AP 화학 인강 (AP Chemistry)", color: "#2563EB",
      summary: "원자 구조·화학결합·화학량론·열화학·평형·산염기·전기화학까지, AP Chemistry의 핵심을 한국어로 정리하는 AP 화학 인강. 단원별 문제로 바로 확인합니다.",
      links: [
        { href: "/kr/courses/ap-chemistry", name: "AP 화학 인강 바로가기", desc: "AP Chemistry 강의·개념 정리 (한국어)" },
        { href: "/core-notes", name: "AP 화학 코어노트", desc: "단원별 핵심개념 요약 노트 (영어·한국어 병기)" },
        { href: "/question-bank/ap-chemistry", name: "AP 화학 문제은행", desc: "단원별 실전 MCQ + 해설" },
        { href: "/textbooks/ap-chem-ultimate", name: "AP 화학 디지털 교재", desc: "AP Chemistry Ultimate 원서형 교재" },
      ],
    },
    {
      tag: "IB", title: "IB 화학 인강 (IB Chemistry)", color: "#7C5CFC",
      summary: "IB Chemistry(SL·HL) 11개 대단원을 Paper 유형에 맞춰 준비하는 IB 화학 인강. 코어노트로 개념을, Paper 스타일 문제로 시험 감각을 잡습니다.",
      links: [
        { href: "/core-notes", name: "IB 화학 코어노트", desc: "IB Chemistry 단원별 개념 노트 (영어·한국어)" },
        { href: "/textbooks/ib-chemistry-ultimate", name: "IB 화학 디지털 교재", desc: "IB Chemistry Ultimate 교재" },
        { href: "/mock-exams", name: "IB 화학 실전 연습", desc: "IB Paper 유형 문제 풀이" },
      ],
    },
    {
      tag: "내신", title: "내신·Honors 화학 인강", color: "#F59E0B",
      summary: "미국 고교 내신(Honors Chemistry) 대비 화학 인강. 학교 진도에 맞춰 29강 개념을 다지고 문제로 마무리합니다.",
      links: [
        { href: "/kr/courses/honors-chemistry", name: "Honors 화학 인강", desc: "Honors Chemistry 강의 (한국어)" },
        { href: "/textbooks/honors-chemistry-ultimate", name: "Honors 화학 교재", desc: "Honors Chemistry Ultimate 교재" },
      ],
    },
  ],
  faq: [
    { q: "화학 인강, 어디서부터 시작하나요?", a: "과정(AP·IB·내신)을 고른 뒤 해당 화학 인강의 코어노트로 개념을 잡고, 단원별 문제은행으로 확인하는 순서를 추천합니다. 회원가입 없이도 미리보기가 가능합니다." },
    { q: "AP 화학 인강과 IB 화학 인강 중 무엇을 들어야 하나요?", a: "다니는 학교 커리큘럼을 따르세요. AP 과정은 AP Chemistry, IB 과정은 IB Chemistry 화학 인강을 선택하면 됩니다. 내신 대비는 Honors 화학 인강을 추천합니다." },
    { q: "화학 인강이 한국어로 제공되나요?", a: "네. 모든 화학 코어노트는 영어·한국어 병기로 제공되어 미국 교과 용어를 한국어 설명과 함께 익힐 수 있습니다." },
    { q: "화학 인강은 무료인가요?", a: "핵심 콘텐츠는 무료로 미리 볼 수 있고, 전체 문제은행·교재는 요금제로 잠금 해제됩니다. 먼저 무료로 체험해 보세요." },
  ],
};

export const PHYSICS_INKANG: InkangConfig = {
  slug: "physics-inkang",
  phrase: "물리 인강",
  eyebrow: "🧲 AP · IB · 내신 물리 인터넷강의",
  accent: "#0EA5E9",
  title: "물리 인강 — AP·IB·내신 물리 인터넷강의 | 코어노트·문제은행",
  description:
    "물리 인강 한 곳에서 끝내기. AP Physics 1·2·C 인강, IB Physics 인강, 내신·Honors 물리 인강 — 한국어 핵심개념 코어노트, 단원별 문제은행, 디지털 교재, AI 튜터까지. 무료로 시작하세요.",
  keywords: ["물리 인강", "AP 물리 인강", "IB 물리 인강", "AP Physics 인강", "IB Physics 인강", "일반물리 인강", "미국 물리 인강", "내신 물리 인강", "피직스 인강", "InHero"],
  heroStrong: "AP Physics 1·2·C 인강 · IB Physics 인강 · 내신 물리 인강",
  heroLede: "을 한 곳에서. 역학·전자기·파동·현대물리까지 한국어 코어노트와 단원별 문제, 디지털 교재, AI 튜터로 정복하는 물리 인강.",
  primaryCta: { href: "/kr/courses/ap-physics-1", label: "AP 물리 인강 시작하기" },
  secondaryCta: { href: "/core-notes", label: "물리 코어노트 보기" },
  courseName: "물리 인강 (AP Physics 인터넷강의)",
  courseDesc: "AP Physics 1·2·C를 한국어 코어노트와 단원별 문제로 정복하는 물리 인강.",
  footerCta: { href: "/kr/courses", label: "전체 물리 인강·강의 보러가기" },
  tracks: [
    {
      tag: "AP", title: "AP 물리 인강 (Physics 1·2·C)", color: "#0EA5E9",
      summary: "운동학·뉴턴 법칙·에너지·전자기·회로까지, AP Physics 1·2·C Mechanics를 한국어로 정리하는 AP 물리 인강. 단원별 문제로 바로 확인합니다.",
      links: [
        { href: "/kr/courses/ap-physics-1", name: "AP Physics 1 인강", desc: "역학 중심 AP 물리 인강 (한국어)" },
        { href: "/kr/courses/ap-physics-2", name: "AP Physics 2 인강", desc: "전자기·유체·현대물리 AP 물리 인강" },
        { href: "/kr/courses/ap-physics-c-mechanics", name: "AP Physics C 인강", desc: "미적분 기반 역학 AP 물리 인강" },
        { href: "/question-bank/ap-physics-1", name: "AP 물리 문제은행", desc: "단원별 실전 MCQ + 해설" },
      ],
    },
    {
      tag: "IB", title: "IB 물리 인강 (IB Physics)", color: "#7C5CFC",
      summary: "IB Physics(SL·HL) 8개 대단원을 Paper 유형에 맞춰 준비하는 IB 물리 인강. 코어노트로 개념을, Paper 문제로 시험 감각을 잡습니다.",
      links: [
        { href: "/core-notes", name: "IB 물리 코어노트", desc: "IB Physics 단원별 개념 노트 (영어·한국어)" },
        { href: "/textbooks/ib-physics-ultimate", name: "IB 물리 디지털 교재", desc: "IB Physics Ultimate 교재" },
        { href: "/mock-exams", name: "IB 물리 실전 연습", desc: "IB Paper 유형 문제 풀이" },
      ],
    },
    {
      tag: "내신", title: "내신·Honors 물리 인강", color: "#F59E0B",
      summary: "미국 고교 내신(Honors Physics) 대비 물리 인강. 학교 진도에 맞춰 개념을 다지고 문제로 마무리합니다.",
      links: [
        { href: "/kr/courses/honors-physics", name: "Honors 물리 인강", desc: "Honors Physics 강의 (한국어)" },
        { href: "/textbooks/honors-physics-ultimate", name: "Honors 물리 교재", desc: "Honors Physics Ultimate 교재" },
      ],
    },
  ],
  faq: [
    { q: "물리 인강, 어디서부터 시작하나요?", a: "과정(AP·IB·내신)을 고른 뒤 코어노트로 개념을 잡고 단원별 문제은행으로 확인하는 순서를 추천합니다. 회원가입 없이도 미리보기가 가능합니다." },
    { q: "AP Physics 1·2·C 중 무엇을 들어야 하나요?", a: "대수 기반 종합은 Physics 1·2, 미적분 기반 역학 심화는 Physics C Mechanics 물리 인강을 선택하세요. 학교/시험 계획에 맞추면 됩니다." },
    { q: "물리 인강이 한국어로 제공되나요?", a: "네. 모든 물리 코어노트는 영어·한국어 병기로 제공됩니다." },
    { q: "물리 인강은 무료인가요?", a: "핵심 콘텐츠는 무료 미리보기가 가능하고, 전체 문제은행·교재는 요금제로 잠금 해제됩니다." },
  ],
};

export const MATH_INKANG: InkangConfig = {
  slug: "math-inkang",
  phrase: "수학 인강",
  eyebrow: "➗ AP · IB · 내신 수학 인터넷강의",
  accent: "#DB2777",
  title: "수학 인강 — AP 미적분·IB Math·내신 수학 인터넷강의",
  description:
    "수학 인강 한 곳에서 끝내기. AP Calculus AB·BC 인강, IB Math AA·AI 인강, Honors 정밀수학(Precalculus) 인강 — 한국어 코어노트, 문제은행, 디지털 교재, AI 튜터까지. 무료로 시작하세요.",
  keywords: ["수학 인강", "AP 수학 인강", "미적분 인강", "AP Calculus 인강", "IB Math 인강", "IB 수학 인강", "미국 수학 인강", "내신 수학 인강", "프리캘 인강", "InHero"],
  heroStrong: "AP Calculus AB·BC 인강 · IB Math AA·AI 인강 · 내신 수학 인강",
  heroLede: "을 한 곳에서. 극한·미분·적분·통계·확률까지 한국어 코어노트와 단원별 문제, 디지털 교재, AI 튜터로 정복하는 수학 인강.",
  primaryCta: { href: "/kr/courses/ap-calculus-ab", label: "AP 미적분 인강 시작하기" },
  secondaryCta: { href: "/core-notes", label: "수학 코어노트 보기" },
  courseName: "수학 인강 (AP Calculus 인터넷강의)",
  courseDesc: "AP Calculus AB·BC와 IB Math를 한국어 코어노트와 단원별 문제로 정복하는 수학 인강.",
  footerCta: { href: "/kr/courses", label: "전체 수학 인강·강의 보러가기" },
  tracks: [
    {
      tag: "AP", title: "AP 수학 인강 (Calculus AB·BC)", color: "#DB2777",
      summary: "극한·미분·적분·급수까지, AP Calculus AB·BC를 한국어로 정리하는 AP 수학 인강. 단원별 문제로 바로 확인합니다.",
      links: [
        { href: "/kr/courses/ap-calculus-ab", name: "AP Calculus AB 인강", desc: "미적분 기본 AP 수학 인강 (한국어)" },
        { href: "/kr/courses/ap-calculus-bc", name: "AP Calculus BC 인강", desc: "급수·매개변수 심화 AP 수학 인강" },
        { href: "/question-bank/ap-calculus-ab", name: "AP 미적분 문제은행", desc: "단원별 실전 MCQ + 해설" },
        { href: "/textbooks/ap-calc-bc-ultimate", name: "AP 미적분 디지털 교재", desc: "AP Calculus BC Ultimate 교재" },
      ],
    },
    {
      tag: "IB", title: "IB 수학 인강 (Math AA·AI)", color: "#7C5CFC",
      summary: "IB Math AA·AI(SL·HL)를 Paper 유형에 맞춰 준비하는 IB 수학 인강. 코어노트로 개념을, Paper 문제로 시험 감각을 잡습니다.",
      links: [
        { href: "/core-notes", name: "IB 수학 코어노트", desc: "IB Math AA·AI 단원별 개념 노트 (영어·한국어)" },
        { href: "/textbooks/ib-math-aa-ultimate", name: "IB Math AA 교재", desc: "IB Math AA Ultimate 교재" },
        { href: "/textbooks/ib-math-ai-ultimate", name: "IB Math AI 교재", desc: "IB Math AI Ultimate 교재" },
      ],
    },
    {
      tag: "내신", title: "내신·Honors 수학 인강", color: "#F59E0B",
      summary: "미국 고교 내신(Honors Precalculus) 대비 수학 인강. 함수·삼각·수열로 미적분을 준비합니다.",
      links: [
        { href: "/kr/courses/honors-precalculus", name: "Honors 정밀수학 인강", desc: "Honors Precalculus 강의 (한국어)" },
        { href: "/textbooks/honors-precalculus-ultimate", name: "Honors 정밀수학 교재", desc: "Honors Precalculus Ultimate 교재" },
      ],
    },
  ],
  faq: [
    { q: "수학 인강, 어디서부터 시작하나요?", a: "과정(AP·IB·내신)을 고른 뒤 코어노트로 개념을 잡고 단원별 문제은행으로 확인하는 순서를 추천합니다. 회원가입 없이도 미리보기가 가능합니다." },
    { q: "AP Calculus AB와 BC 중 무엇을 들어야 하나요?", a: "미적분 기본은 AB, 급수·매개변수까지 포함한 심화는 BC 수학 인강을 선택하세요. BC는 AB 내용을 포함합니다." },
    { q: "수학 인강이 한국어로 제공되나요?", a: "네. 모든 수학 코어노트는 영어·한국어 병기로 제공됩니다." },
    { q: "수학 인강은 무료인가요?", a: "핵심 콘텐츠는 무료 미리보기가 가능하고, 전체 문제은행·교재는 요금제로 잠금 해제됩니다." },
  ],
};

export const AP_INKANG: InkangConfig = {
  slug: "ap-inkang",
  phrase: "AP 인강",
  eyebrow: "🎓 AP 전 과목 인터넷강의",
  accent: "#1D9E75",
  title: "AP 인강 — AP 전 과목 인터넷강의 | 코어노트·문제은행·모의고사",
  description:
    "AP 인강 한 곳에서 끝내기. 아이비리그생이 만든 AP 과학·수학·인문 인강 — 과목별 한국어 코어노트, 단원별 문제은행, Bluebook형 모의고사, 디지털 교재, AI 튜터까지. 무료로 시작하세요.",
  keywords: ["AP 인강", "AP 과목 인강", "AP 시험 인강", "미국 AP 인강", "AP Biology 인강", "AP Chemistry 인강", "AP Calculus 인강", "AP 물리 인강", "AP 코어노트", "InHero"],
  heroStrong: "AP 전 과목 인강",
  heroLede: "을 한 곳에서. 과학·수학·인문 과목별 한국어 코어노트, 단원별 문제은행, College Board Bluebook형 모의고사, 디지털 교재, 24시간 AI 튜터까지 — AP 인강에 필요한 모든 것.",
  primaryCta: { href: "/kr/courses", label: "AP 인강 전체 보기" },
  secondaryCta: { href: "/mock-exams", label: "AP 모의고사 풀어보기" },
  courseName: "AP 인강 (AP 전 과목 인터넷강의)",
  courseDesc: "AP 과학·수학·인문 전 과목을 한국어 코어노트와 단원별 문제, 모의고사로 준비하는 AP 인강.",
  footerCta: { href: "/kr/courses", label: "AP 인강 전체 과목 보러가기" },
  tracks: [
    {
      tag: "과학", title: "AP 과학 인강 (Bio·Chem·Physics)", color: "#1D9E75",
      summary: "AP Biology·Chemistry·Physics를 한국어 코어노트와 단원별 문제로 정복하는 AP 과학 인강.",
      links: [
        { href: "/kr/bio-inkang", name: "AP 바이오 인강", desc: "AP Biology 인터넷강의" },
        { href: "/kr/chem-inkang", name: "AP 화학 인강", desc: "AP Chemistry 인터넷강의" },
        { href: "/kr/physics-inkang", name: "AP 물리 인강", desc: "AP Physics 1·2·C 인터넷강의" },
        { href: "/kr/courses/ap-chemistry", name: "AP 과학 강의 바로가기", desc: "과목별 강의·개념 정리 (한국어)" },
      ],
    },
    {
      tag: "수학", title: "AP 수학 인강 (Calculus)", color: "#DB2777",
      summary: "AP Calculus AB·BC를 한국어 코어노트와 단원별 문제로 정복하는 AP 수학 인강.",
      links: [
        { href: "/kr/math-inkang", name: "AP 미적분 인강", desc: "AP Calculus AB·BC 인터넷강의" },
        { href: "/kr/courses/ap-calculus-bc", name: "AP Calculus BC 강의", desc: "미적분 심화 강의 (한국어)" },
        { href: "/question-bank/ap-calculus-ab", name: "AP 미적분 문제은행", desc: "단원별 실전 MCQ + 해설" },
      ],
    },
    {
      tag: "실전", title: "AP 모의고사 · 문제은행", color: "#2563EB",
      summary: "College Board Bluebook 화면 그대로의 AP 모의고사와 과목별 문제은행으로 실전을 대비하는 AP 인강.",
      links: [
        { href: "/mock-exams", name: "AP 모의고사", desc: "Bluebook형 AP Section I 모의고사" },
        { href: "/question-bank", name: "AP 문제은행", desc: "전 과목 단원별 MCQ + 해설" },
        { href: "/core-notes", name: "AP 코어노트", desc: "전 과목 핵심개념 요약 (영어·한국어)" },
      ],
    },
  ],
  faq: [
    { q: "AP 인강, 어떤 과목부터 시작하나요?", a: "학교 수강/시험 계획에 있는 과목부터 시작하세요. 각 과목의 코어노트로 개념을 잡고 단원별 문제은행과 모의고사로 마무리하는 흐름을 추천합니다." },
    { q: "AP 인강이 한국어로 제공되나요?", a: "네. 전 과목 코어노트가 영어·한국어 병기로 제공되어 미국 교과 용어를 한국어 설명과 함께 익힐 수 있습니다." },
    { q: "AP 모의고사도 포함되나요?", a: "네. College Board Bluebook 화면을 재현한 AP Section I 모의고사 모드를 제공합니다." },
    { q: "AP 인강은 무료인가요?", a: "핵심 콘텐츠와 모의고사 일부는 무료로 체험할 수 있고, 전체 문제은행·교재는 요금제로 잠금 해제됩니다." },
  ],
};

export const SAT_INKANG: InkangConfig = {
  slug: "sat-inkang",
  phrase: "SAT 인강",
  eyebrow: "📝 디지털 SAT 인터넷강의",
  accent: "#7DD3FC",
  title: "SAT 인강 — 디지털 SAT 인터넷강의 | 적응형 모의고사·단어장",
  description:
    "SAT 인강 한 곳에서 끝내기. 실제 Bluebook 그대로의 적응형 디지털 SAT 모의고사, Reading·Writing·Math 실전 문제, 단어장, AI 튜터까지. 무료로 시작하세요.",
  keywords: ["SAT 인강", "디지털 SAT 인강", "SAT 수학 인강", "SAT 리딩 인강", "SAT 모의고사", "Digital SAT 인강", "미국 SAT 인강", "SAT 단어장", "InHero"],
  heroStrong: "디지털 SAT 인강",
  heroLede: "을 한 곳에서. 실제 College Board Bluebook 화면 그대로의 적응형 2단계 모의고사, Reading·Writing·Math 실전 문제, 단어장, AI 튜터까지 — SAT 인강에 필요한 모든 것.",
  primaryCta: { href: "/sat", label: "디지털 SAT 모의고사 시작" },
  secondaryCta: { href: "/vocab", label: "SAT 단어장 보기" },
  courseName: "SAT 인강 (디지털 SAT 인터넷강의)",
  courseDesc: "적응형 디지털 SAT 모의고사와 실전 문제, 단어장으로 준비하는 SAT 인강.",
  footerCta: { href: "/mock-exams", label: "전체 SAT·모의고사 보러가기" },
  tracks: [
    {
      tag: "모의고사", title: "디지털 SAT 모의고사 인강", color: "#7DD3FC",
      summary: "실제 Bluebook과 똑같은 적응형 2단계 모듈·모듈별 타이머·Desmos 계산기·400–1600 예상 점수를 제공하는 SAT 인강.",
      links: [
        { href: "/sat", name: "디지털 SAT 모의고사", desc: "적응형 Bluebook형 풀 모의고사" },
        { href: "/mock-exams", name: "SAT·AP 모의고사 허브", desc: "SAT/AP/IB 모의고사 한 곳에서" },
      ],
    },
    {
      tag: "영역별", title: "Reading·Writing·Math 인강", color: "#2563EB",
      summary: "SAT Reading & Writing과 Math를 영역별로 대비하는 SAT 인강. 실전 문제와 즉시 해설로 약점을 잡습니다.",
      links: [
        { href: "/sat", name: "SAT 실전 문제 풀이", desc: "R&W·Math 적응형 문제 + 해설" },
        { href: "/vocab", name: "SAT 단어장", desc: "과목별 필수 어휘 (영어·한국어)" },
      ],
    },
  ],
  includes: [
    { emoji: "🖥️", title: "적응형 모의고사", desc: "실제 Bluebook 화면 그대로의 2단계 적응형 디지털 SAT 모의고사." },
    { emoji: "📚", title: "SAT 단어장", desc: "영어·한국어 병기 필수 어휘로 Reading·Writing 대비." },
    { emoji: "🧮", title: "Math 문제풀이", desc: "Desmos 계산기 포함, 실전 유형 Math 문제와 해설." },
    { emoji: "🤖", title: "AI 튜터", desc: "모르는 문제는 24시간 AI 튜터에게 한국어로 질문." },
  ],
  faq: [
    { q: "SAT 인강, 어디서부터 시작하나요?", a: "먼저 무료 적응형 모의고사로 현재 점수대를 파악한 뒤, 약한 영역을 단어장·실전 문제로 보완하는 순서를 추천합니다. 회원가입 없이도 체험 모듈을 풀 수 있습니다." },
    { q: "실제 디지털 SAT와 같은 화면인가요?", a: "네. College Board Bluebook의 적응형 2단계 구조, 모듈별 타이머, Desmos 계산기, 400–1600 예상 점수를 재현했습니다." },
    { q: "SAT 인강이 한국어로 제공되나요?", a: "인터페이스와 단어장 뜻풀이가 한국어로 제공되어 한국 학생이 편하게 학습할 수 있습니다." },
    { q: "SAT 인강은 무료인가요?", a: "체험 모의고사는 무료이며, 전체 실전 모의고사·문제는 요금제로 잠금 해제됩니다." },
  ],
};

export const IB_INKANG: InkangConfig = {
  slug: "ib-inkang",
  phrase: "IB 인강",
  eyebrow: "🌐 IB Diploma 전 과목 인터넷강의",
  accent: "#7C5CFC",
  title: "IB 인강 — IB Diploma 전 과목 인터넷강의 | 코어노트·Paper 연습",
  description:
    "IB 인강 한 곳에서 끝내기. IB Biology·Chemistry·Physics·Math·Economics 등 전 과목 한국어 코어노트, Paper 유형 문제, 디지털 교재, AI 튜터까지. 무료로 시작하세요.",
  keywords: ["IB 인강", "IB 과목 인강", "IB Biology 인강", "IB Chemistry 인강", "IB Physics 인강", "IB Math 인강", "IB Diploma 인강", "IBDP 인강", "미국 IB 인강", "InHero"],
  heroStrong: "IB Diploma 전 과목 인강",
  heroLede: "을 한 곳에서. 과학·수학·인문 과목별 한국어 코어노트, IB Paper 유형 문제, 디지털 교재, 24시간 AI 튜터까지 — IB 인강에 필요한 모든 것.",
  primaryCta: { href: "/core-notes", label: "IB 코어노트 시작하기" },
  secondaryCta: { href: "/mock-exams", label: "IB Paper 연습하기" },
  courseName: "IB 인강 (IB Diploma 인터넷강의)",
  courseDesc: "IB Biology·Chemistry·Physics·Math 등 전 과목을 한국어 코어노트와 Paper 문제로 준비하는 IB 인강.",
  footerCta: { href: "/core-notes", label: "IB 인강 전체 과목 보러가기" },
  tracks: [
    {
      tag: "과학", title: "IB 과학 인강 (Bio·Chem·Physics)", color: "#7C5CFC",
      summary: "IB Biology·Chemistry·Physics를 대단원별 한국어 코어노트와 Paper 유형 문제로 정복하는 IB 과학 인강.",
      links: [
        { href: "/kr/bio-inkang", name: "IB 바이오 인강", desc: "IB Biology 인터넷강의" },
        { href: "/kr/chem-inkang", name: "IB 화학 인강", desc: "IB Chemistry 인터넷강의" },
        { href: "/kr/physics-inkang", name: "IB 물리 인강", desc: "IB Physics 인터넷강의" },
        { href: "/core-notes", name: "IB 과학 코어노트", desc: "전 과목 단원별 개념 노트 (영어·한국어)" },
      ],
    },
    {
      tag: "수학", title: "IB 수학 인강 (Math AA·AI)", color: "#DB2777",
      summary: "IB Math AA·AI(SL·HL)를 한국어 코어노트와 Paper 문제로 정복하는 IB 수학 인강.",
      links: [
        { href: "/kr/math-inkang", name: "IB 수학 인강", desc: "IB Math AA·AI 인터넷강의" },
        { href: "/textbooks/ib-math-aa-ultimate", name: "IB Math AA 교재", desc: "IB Math AA Ultimate 교재" },
        { href: "/textbooks/ib-math-ai-ultimate", name: "IB Math AI 교재", desc: "IB Math AI Ultimate 교재" },
      ],
    },
    {
      tag: "실전", title: "IB Paper 연습 · 교재", color: "#2563EB",
      summary: "IB Paper 유형 문제와 원서형 디지털 교재로 실전을 대비하는 IB 인강.",
      links: [
        { href: "/mock-exams", name: "IB Paper 연습", desc: "IB Paper 유형 문제 풀이" },
        { href: "/textbooks", name: "IB 디지털 교재", desc: "IB 전 과목 Ultimate 교재" },
        { href: "/core-notes", name: "IB 코어노트", desc: "전 과목 핵심개념 요약 (영어·한국어)" },
      ],
    },
  ],
  faq: [
    { q: "IB 인강, 어떤 과목부터 시작하나요?", a: "본인의 IB 과목 조합(6과목)에 맞춰 시작하세요. 각 과목 코어노트로 개념을 잡고 Paper 유형 문제로 마무리하는 흐름을 추천합니다." },
    { q: "SL과 HL 모두 대응하나요?", a: "코어노트는 대단원별로 구성되어 SL·HL 공통 개념을 다루며, HL 추가 주제까지 폭넓게 포함합니다." },
    { q: "IB 인강이 한국어로 제공되나요?", a: "네. 전 과목 코어노트가 영어·한국어 병기로 제공됩니다." },
    { q: "IB 인강은 무료인가요?", a: "핵심 콘텐츠는 무료 미리보기가 가능하고, 전체 문제·교재는 요금제로 잠금 해제됩니다." },
  ],
};

export const INKANG_CONFIGS: InkangConfig[] = [CHEM_INKANG, PHYSICS_INKANG, MATH_INKANG, AP_INKANG, SAT_INKANG, IB_INKANG];
