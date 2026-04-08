export interface Subject {
  id: string;
  name: string;
  nameKo: string;
  folder: string;
  color: string;
  category: "AP" | "Honors" | "Core" | "대회" | "시험";
  emoji: string;
}

export const SUBJECTS: Subject[] = [
  // ── AP ──────────────────────────────────────────────────────────────────
  { id: "ap_bio",         name: "AP Biology",               nameKo: "AP 생물학",          folder: "AP Biology",               color: "#1D9E75", category: "AP",   emoji: "🧬" },
  { id: "ap_chem",        name: "AP Chemistry",              nameKo: "AP 화학",             folder: "AP Chemistry",              color: "#7F77DD", category: "AP",   emoji: "⚗️" },
  { id: "ap_calc_bc",     name: "AP Calculus BC",            nameKo: "AP 미적분 BC",        folder: "AP Calculus BC",            color: "#BA7517", category: "AP",   emoji: "∫" },
  { id: "ap_calc_ab",     name: "AP Calculus AB",            nameKo: "AP 미적분 AB",        folder: "AP Calculus AB",            color: "#D85A30", category: "AP",   emoji: "∫" },
  { id: "ap_precalc",     name: "AP Precalculus",            nameKo: "AP 프리칼큘러스",     folder: "AP Precalculus",            color: "#854F0B", category: "AP",   emoji: "📐" },
  { id: "ap_phys_c_mech", name: "AP Physics C Mech",         nameKo: "AP 물리 C 역학",      folder: "AP Physics C Mechanics",    color: "#185FA5", category: "AP",   emoji: "⚙️" },
  { id: "ap_phys_c_em",   name: "AP Physics C E&M",          nameKo: "AP 물리 C 전자기",    folder: "AP Physics C E&M",          color: "#3C3489", category: "AP",   emoji: "⚡" },
  { id: "ap_phys1",       name: "AP Physics 1",              nameKo: "AP 물리 1",           folder: "AP Physics 1",              color: "#533DAF", category: "AP",   emoji: "🔭" },
  { id: "ap_stats",       name: "AP Statistics",             nameKo: "AP 통계",             folder: "AP Statistics",             color: "#0F6E56", category: "AP",   emoji: "📊" },
  { id: "ap_cs_a",        name: "AP Computer Science A",     nameKo: "AP 컴퓨터과학 A",     folder: "AP Computer Science A",     color: "#444441", category: "AP",   emoji: "💻" },
  { id: "ap_cs_p",        name: "AP CS Principles",          nameKo: "AP 컴퓨터과학 원리",  folder: "AP CS Principles",          color: "#666660", category: "AP",   emoji: "🖥️" },
  { id: "ap_eng_lang",    name: "AP English Language",       nameKo: "AP 영어 언어",        folder: "AP English Language",       color: "#993C1D", category: "AP",   emoji: "✍️" },
  { id: "ap_eng_lit",     name: "AP English Literature",     nameKo: "AP 영어 문학",        folder: "AP English Literature",     color: "#712B13", category: "AP",   emoji: "📚" },
  { id: "ap_ush",         name: "AP US History",             nameKo: "AP 미국사",           folder: "AP US History",             color: "#854F0B", category: "AP",   emoji: "🗽" },
  { id: "ap_wh",          name: "AP World History",          nameKo: "AP 세계사",           folder: "AP World History",          color: "#633806", category: "AP",   emoji: "🌍" },
  { id: "ap_psych",       name: "AP Psychology",             nameKo: "AP 심리학",           folder: "AP Psychology",             color: "#993556", category: "AP",   emoji: "🧠" },
  { id: "ap_macro",       name: "AP Macroeconomics",         nameKo: "AP 거시경제",         folder: "AP Macroeconomics",         color: "#3B6D11", category: "AP",   emoji: "📈" },
  { id: "ap_micro",       name: "AP Microeconomics",         nameKo: "AP 미시경제",         folder: "AP Microeconomics",         color: "#27500A", category: "AP",   emoji: "📉" },
  { id: "ap_enviro",      name: "AP Environmental Science",  nameKo: "AP 환경과학",         folder: "AP Environmental Science",  color: "#1D9E75", category: "AP",   emoji: "🌱" },

  // ── Honors ──────────────────────────────────────────────────────────────
  { id: "hon_bio",        name: "Honors Biology",            nameKo: "Honors 생물학",       folder: "Honors Biology",            color: "#1D9E75", category: "Honors", emoji: "🧬" },
  { id: "hon_chem",       name: "Honors Chemistry",          nameKo: "Honors 화학",         folder: "Honors Chemistry",          color: "#7F77DD", category: "Honors", emoji: "⚗️" },
  { id: "hon_phys",       name: "Honors Physics",            nameKo: "Honors 물리",         folder: "Honors Physics",            color: "#185FA5", category: "Honors", emoji: "🔭" },
  { id: "hon_precalc",    name: "Honors Precalculus",        nameKo: "Honors 프리칼큘러스", folder: "Honors Precalculus",        color: "#BA7517", category: "Honors", emoji: "📐" },
  { id: "hon_eng",        name: "Honors English",            nameKo: "Honors 영어",         folder: "Honors English",            color: "#993C1D", category: "Honors", emoji: "📖" },
  { id: "hon_algebra",    name: "Honors Algebra",            nameKo: "Honors 대수학",       folder: "Honors Algebra",            color: "#D85A30", category: "Honors", emoji: "➕" },
  { id: "hon_ush",        name: "Honors US History",         nameKo: "Honors 미국사",       folder: "Honors US History",         color: "#854F0B", category: "Honors", emoji: "🗽" },

  // ── Core ────────────────────────────────────────────────────────────────
  { id: "core_sci",       name: "Integrated Science",        nameKo: "통합과학",            folder: "Integrated Science",        color: "#1D9E75", category: "Core",   emoji: "🔬" },
  { id: "core_geo",       name: "Geometry",                  nameKo: "기하학",              folder: "Geometry",                  color: "#7F77DD", category: "Core",   emoji: "📐" },
  { id: "core_algebra",   name: "Algebra",                   nameKo: "대수학",              folder: "Algebra",                   color: "#BA7517", category: "Core",   emoji: "➕" },
  { id: "core_eng",       name: "English",                   nameKo: "영어",                folder: "English",                   color: "#993C1D", category: "Core",   emoji: "📖" },
  { id: "core_ush",       name: "US History",                nameKo: "미국사",              folder: "US History",                color: "#854F0B", category: "Core",   emoji: "🗽" },
  { id: "core_chem",      name: "Chemistry",                 nameKo: "화학",                folder: "Chemistry",                 color: "#7F77DD", category: "Core",   emoji: "⚗️" },
  { id: "core_bio",       name: "Biology",                   nameKo: "생물학",              folder: "Biology",                   color: "#1D9E75", category: "Core",   emoji: "🧬" },
  { id: "core_phys",      name: "Physics",                   nameKo: "물리학",              folder: "Physics",                   color: "#185FA5", category: "Core",   emoji: "🔭" },

  // ── 대회 ────────────────────────────────────────────────────────────────
  { id: "amc10",          name: "AMC 10",                    nameKo: "AMC 10",              folder: "AMC 10",                    color: "#7F77DD", category: "대회",  emoji: "🏆" },
  { id: "amc12",          name: "AMC 12",                    nameKo: "AMC 12",              folder: "AMC 12",                    color: "#3C3489", category: "대회",  emoji: "🏆" },
  { id: "aime",           name: "AIME",                      nameKo: "AIME",                folder: "AIME",                      color: "#26215C", category: "대회",  emoji: "🥇" },
  { id: "scioly",         name: "Science Olympiad",          nameKo: "사이언스 올림피아드", folder: "Science Olympiad",          color: "#0F6E56", category: "대회",  emoji: "🔬" },
  { id: "usabo",          name: "USABO",                     nameKo: "생물 올림피아드",     folder: "USABO",                     color: "#085041", category: "대회",  emoji: "🧬" },
  { id: "physics_bowl",   name: "Physics Bowl",              nameKo: "피직스 볼",           folder: "Physics Bowl",              color: "#0C447C", category: "대회",  emoji: "⚡" },

  // ── 시험 ────────────────────────────────────────────────────────────────
  { id: "sat_math",       name: "SAT Math",                  nameKo: "SAT 수학",            folder: "SAT Math",                  color: "#BA7517", category: "시험",  emoji: "📝" },
  { id: "sat_rw",         name: "SAT Reading & Writing",     nameKo: "SAT 읽기/쓰기",       folder: "SAT Reading & Writing",     color: "#854F0B", category: "시험",  emoji: "📝" },
  { id: "act",            name: "ACT",                       nameKo: "ACT",                 folder: "ACT",                       color: "#D85A30", category: "시험",  emoji: "📋" },
  { id: "toefl",          name: "TOEFL",                     nameKo: "TOEFL",               folder: "TOEFL",                     color: "#993C1D", category: "시험",  emoji: "🌐" },
];

export const SUBJECT_CATEGORIES = ["AP", "Honors", "Core", "대회", "시험"] as const;
export type SubjectCategory = typeof SUBJECT_CATEGORIES[number];

export const CATEGORY_LABELS: Record<SubjectCategory, string> = {
  AP:     "AP",
  Honors: "Honors",
  Core:   "Core",
  "대회": "대회",
  "시험": "시험",
};

export function getSubjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getSubjectsByCategory(category: string): Subject[] {
  return SUBJECTS.filter((s) => s.category === category);
}

export function getSubjectByFolder(folder: string): Subject | undefined {
  return SUBJECTS.find((s) => s.folder === folder);
}
