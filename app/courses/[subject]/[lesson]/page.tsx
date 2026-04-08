import { lessons } from "@/lib/data/lessons";
import { courses } from "@/lib/data/courses";
import LessonClient from "@/components/lesson/LessonClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { subject: string; lesson: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = lessons[params.lesson];
  if (!lesson) return { title: "강의 | InHero" };
  return {
    title: `${lesson.title} | InHero`,
    description: `${lesson.titleEn} — AP Biology 강의 with AI 즉시 설명`,
  };
}

export async function generateStaticParams() {
  return Object.values(lessons).map((l) => ({
    subject: l.courseId,
    lesson: l.id,
  }));
}

export default function LessonPage({ params }: Props) {
  const lesson = lessons[params.lesson];
  if (!lesson || lesson.courseId !== params.subject) notFound();

  const course = courses.find((c) => c.id === params.subject);
  if (!course) notFound();

  return (
    <LessonClient
      lesson={lesson}
      courseId={course.id}
      courseName={course.subject}
    />
  );
}
