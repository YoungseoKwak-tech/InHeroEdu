import { courses } from "@/lib/data/courses";
import CourseListClient from "@/components/courses/CourseListClient";
import ClassroomGrid from "@/components/courses/ClassroomGrid";
import { getAllFacultyWithAssets } from "@/lib/facultyAssets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classroom | InHero",
  description:
    "Step inside the InHero Faculty Universe — six AI instructors, one Architect. Pick your Classroom.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const faculty = await getAllFacultyWithAssets();

  return (
    <div className="cls-root">
      {/* ─── Starfield backdrop ────────────────────────────────────────── */}
      <div className="cls-stars" aria-hidden="true" />
      <div className="cls-glow" aria-hidden="true" />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="cls-hero">
        <div className="cls-hero-inner">
          <div className="cls-eyebrow">
            <span className="cls-pulse" />
            <span>FACULTY UNIVERSE · ONLINE</span>
          </div>
          <h1 className="cls-h1">
            Pick a <em>Classroom</em>.<br />Meet the instructor.
          </h1>
          <p className="cls-sub">
            Six AI instructors. One Architect. Each Classroom carries the personality of the
            subject — and an instructor who would die on its hill.
          </p>
        </div>
      </section>

      {/* ─── FACULTY GRID ─────────────────────────────────────────────── */}
      <section className="cls-faculty">
        <div className="cls-section-head">
          <span className="cls-section-tag">THE FACULTY</span>
          <span className="cls-section-count">{faculty.length} instructors</span>
        </div>
        <ClassroomGrid faculty={faculty} />
      </section>

      {/* ─── REST OF LIBRARY ──────────────────────────────────────────── */}
      <section className="cls-library">
        <div className="cls-section-head">
          <span className="cls-section-tag">ALL COURSES</span>
          <span className="cls-section-count">{courses.length} paths</span>
        </div>
        <div className="cls-library-inner">
          <CourseListClient courses={courses} />
        </div>
      </section>

      <style>{`
        .cls-root {
          position: relative;
          min-height: 100vh;
          background: #02040b;
          color: #d8d9e6;
          font-family: 'Inter', system-ui, sans-serif;
          overflow-x: hidden;
        }
        .cls-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.85), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.7), transparent 100%),
            radial-gradient(0.8px 0.8px at 64% 88%, rgba(255,255,255,0.5), transparent 100%),
            radial-gradient(1px 1px at 92% 56%, rgba(255,255,255,0.65), transparent 100%),
            radial-gradient(0.9px 0.9px at 18% 92%, rgba(255,255,255,0.45), transparent 100%),
            radial-gradient(1.2px 1.2px at 50% 8%, rgba(94,234,212,0.8), transparent 100%),
            radial-gradient(0.9px 0.9px at 8% 52%, rgba(255,255,255,0.5), transparent 100%);
          background-size: 300px 300px;
          background-repeat: repeat;
        }
        .cls-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94,234,212,0.08), transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168,140,255,0.06), transparent 60%);
        }

        /* HERO */
        .cls-hero {
          position: relative;
          z-index: 1;
          padding: 6rem 1.5rem 3rem;
        }
        .cls-hero-inner { max-width: 60rem; margin: 0 auto; }
        .cls-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.5);
          margin-bottom: 1.25rem;
        }
        .cls-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 10px rgba(94,234,212,0.7);
          animation: cls-pulse 1.6s ease-in-out infinite;
        }
        @keyframes cls-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .cls-h1 {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 600;
          line-height: 1.05;
          color: #f3f3fb;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .cls-h1 em {
          font-style: italic;
          color: #5eead4;
          text-shadow: 0 0 22px rgba(94,234,212,0.35);
        }
        .cls-sub {
          font-size: 1.05rem;
          line-height: 1.55;
          color: #94a3b8;
          max-width: 42rem;
          margin: 0;
        }

        /* SECTIONS */
        .cls-faculty, .cls-library {
          position: relative;
          z-index: 1;
          padding: 2rem 1.5rem 3.5rem;
          max-width: 84rem;
          margin: 0 auto;
        }
        .cls-section-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 0.85rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cls-section-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #5eead4;
        }
        .cls-section-count {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: rgba(148,163,184,0.65);
        }

        .cls-library {
          padding-top: 1rem;
          padding-bottom: 6rem;
        }
        .cls-library-inner {
          padding: 1.25rem;
          border-radius: 0.85rem;
          background: rgba(10,14,26,0.55);
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
}
