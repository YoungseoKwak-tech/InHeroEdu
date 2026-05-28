"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import LessonSupportPanel from "@/components/lesson/LessonSupportPanel";

interface LessonWorkspaceShellProps {
  courseId: string;
  lessonId: string;
  title: string;
  courseName: string;
  courseHref: string;
  lessonLang?: "en" | "ko";
  lessonScript?: string;
  children: ReactNode;
}

export default function LessonWorkspaceShell({
  courseId,
  lessonId,
  title,
  courseName,
  courseHref,
  lessonLang = "en",
  lessonScript,
  children,
}: LessonWorkspaceShellProps) {
  return (
    <>
      <div className="lws-breadcrumb">
        <div className="lws-breadcrumb-inner">
          <Link href={courseHref} className="lws-back-link">
            ← {courseName}
          </Link>
          <span className="lws-breadcrumb-sep">/</span>
          <span className="lws-breadcrumb-current">{title}</span>
        </div>
      </div>

      <div className="lws-root">
        <div className="lws-inner">
          <div className="lws-main">
            <div className="lws-stage">{children}</div>
          </div>
          <aside className="lws-side">
            <div className="lws-side-sticky">
              <LessonSupportPanel
                courseId={courseId}
                lessonId={lessonId}
                courseName={courseName}
                lessonTitle={title}
                lessonScript={lessonScript}
                lessonLang={lessonLang}
              />
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .lws-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .lws-breadcrumb-inner {
          max-width: 90rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .lws-back-link {
          color: #555;
          text-decoration: none;
          transition: color 0.15s;
        }
        .lws-back-link:hover { color: #00FFB2; }
        .lws-breadcrumb-sep { color: #333; }
        .lws-breadcrumb-current {
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 24rem;
        }
        .lws-root {
          background:
            radial-gradient(circle at top, rgba(16, 185, 129, 0.05), transparent 35%),
            linear-gradient(180deg, #02040b 0%, #05070d 100%);
          min-height: calc(100vh - 4rem);
          padding: 1rem;
        }
        .lws-inner {
          max-width: 90rem;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
        }
        .lws-main {
          min-width: 0;
        }
        .lws-stage {
          overflow: hidden;
          border-radius: 1.4rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(3, 5, 10, 0.96);
          box-shadow: 0 24px 90px rgba(0, 0, 0, 0.28);
        }
        .lws-side {
          min-width: 0;
        }
        @media (min-width: 1180px) {
          .lws-root {
            padding: 1.2rem 1.25rem 2rem;
          }
          .lws-inner {
            grid-template-columns: minmax(0, 1fr) 22rem;
            align-items: start;
            gap: 1.25rem;
          }
          .lws-side-sticky {
            position: sticky;
            top: 5rem;
          }
        }
      `}</style>
    </>
  );
}
