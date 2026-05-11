/**
 * InHero Faculty Universe — 6 hard-coded AI instructors.
 * The faculty roster itself is a source-controlled constant; only the
 * illustration URL is dynamic (managed via /admin/faculty).
 */

export interface FacultyMeta {
  id: FacultyId;
  name: string;
  subject: string;
  subjectShort: string;
  courseId: string | null;   // ties faculty → course in lib/data/courses.ts
  tagline: string;
  accent: string;            // primary accent hex (matches Classroom UI)
  bg: string;                // dark room base hex
  vibe: string;              // one-line room mood
  mascotEmoji: string;
}

export type FacultyId =
  | "osmosis"
  | "coulomb"
  | "vacuum"
  | "evidence"
  | "lhopital"
  | "julian";

export const FACULTY: FacultyMeta[] = [
  {
    id: "osmosis",
    name: "Dr. Chemi Osmosis",
    subject: "AP Biology",
    subjectShort: "AP Bio",
    courseId: "ap-biology",
    tagline: "Mitochondria didn't become a meme to make you feel smart.",
    accent: "#5DCAA5",
    bg: "#0a1610",
    vibe: "Cathedral of Campbell — bookshelves of every edition, stained-glass organelles.",
    mascotEmoji: "🧬",
  },
  {
    id: "coulomb",
    name: "Dr. Coulomb",
    subject: "AP Chemistry",
    subjectShort: "AP Chem",
    courseId: "ap-chemistry",
    tagline: "Everything is a charge. Everything is a distance. Everything is Coulomb.",
    accent: "#C9A84C",
    bg: "#161108",
    vibe: "Edwardian study, brass instruments, zero humidity, slate chalkboard.",
    mascotEmoji: "⚗️",
  },
  {
    id: "vacuum",
    name: "Professor Vacuum",
    subject: "AP Physics",
    subjectShort: "AP Physics",
    courseId: "ap-physics-1",
    tagline: "In here, your pencil does not have mass. Neither do your feelings.",
    accent: "#94A3B8",
    bg: "#0a0e15",
    vibe: "Total white void. Floating axes. No shadows.",
    mascotEmoji: "♾",
  },
  {
    id: "evidence",
    name: "Ms. Evidence",
    subject: "SAT Reading & Writing",
    subjectShort: "SAT R&W",
    courseId: "sat-reading",
    tagline: "Your feelings are not in the passage. The answer is.",
    accent: "#FF6B5B",
    bg: "#170a09",
    vibe: "Interrogation room × law library. Single harsh spotlight.",
    mascotEmoji: "📑",
  },
  {
    id: "lhopital",
    name: "Dr. L'Hôpital",
    subject: "AP Calculus",
    subjectShort: "AP Calc",
    courseId: "ap-calc-ab",
    tagline: "Forget the +C and watch me forget my composure.",
    accent: "#E97099",
    bg: "#150a12",
    vibe: "Continuous panic room — curved walls, never-stopping chalk.",
    mascotEmoji: "∫",
  },
  {
    id: "julian",
    name: "Julian Context",
    subject: "AP History",
    subjectShort: "AP History",
    courseId: "ap-us-history",
    tagline: "Every fact is someone winning. Tell me who.",
    accent: "#B45309",
    bg: "#1a0f08",
    vibe: "Smoke-room speakeasy library, red-thread world map, scratched-eye monarch.",
    mascotEmoji: "🕯",
  },
];

export const FACULTY_BY_ID: Record<FacultyId, FacultyMeta> = FACULTY.reduce(
  (acc, faculty) => {
    acc[faculty.id] = faculty;
    return acc;
  },
  {} as Record<FacultyId, FacultyMeta>
);

export function isFacultyId(value: string | null | undefined): value is FacultyId {
  if (!value) return false;
  return value in FACULTY_BY_ID;
}

export function getFaculty(id: string | null | undefined): FacultyMeta | null {
  return id && isFacultyId(id) ? FACULTY_BY_ID[id] : null;
}
