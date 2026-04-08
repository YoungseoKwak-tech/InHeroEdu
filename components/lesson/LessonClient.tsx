"use client";

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import AIPanel from "./AIPanel";
import Transcript from "./Transcript";
import PracticeQuestions from "./PracticeQuestions";
import Link from "next/link";
import type { Lesson } from "@/lib/data/lessons";

interface LessonClientProps {
  lesson: Lesson;
  courseId: string;
  courseName: string;
}

export default function LessonClient({ lesson, courseId, courseName }: LessonClientProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedTermEn, setSelectedTermEn] = useState<string | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  function handleTermClick(term: string, termEn: string) {
    setSelectedTerm(term);
    setSelectedTermEn(termEn);
    setAiPanelOpen(true);
  }

  function handleAiClear() {
    setAiPanelOpen(false);
    setTimeout(() => {
      setSelectedTerm(null);
      setSelectedTermEn(null);
    }, 300);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/courses" className="hover:text-primary-500 transition-colors">강의</Link>
            <span>/</span>
            <Link href={`/courses/${courseId}`} className="hover:text-primary-500 transition-colors">{courseName}</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{lesson.title}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top section: Video + AI Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Video (left, 2/3) */}
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} />
            {/* Lesson meta */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {lesson.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {lesson.titleEn} · {lesson.duration}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2.5 py-1 rounded-full font-semibold">
                  강의 {lesson.order}
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                  📝 {lesson.practiceQuestions.length}개 문제
                </span>
              </div>
            </div>
          </div>

          {/* AI Panel (right, 1/3) */}
          <div className="lg:col-span-1">
            <div className="card h-[420px] lg:h-full min-h-[320px] overflow-hidden flex flex-col">
              {/* Panel header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/10 border-b border-gray-100 dark:border-gray-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                  AI 즉시 설명
                </span>
                <span className="text-xs text-gray-400 ml-auto">by Claude</span>
              </div>
              <AIPanel
                selectedTerm={selectedTerm}
                selectedTermEn={selectedTermEn}
                lessonTopic={lesson.topic}
                onClear={handleAiClear}
              />
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="card p-6 mb-6">
          <Transcript
            segments={lesson.transcript}
            onTermClick={handleTermClick}
            activeTerm={selectedTerm}
          />
        </div>

        {/* Practice Questions */}
        <div className="mb-8">
          <PracticeQuestions questions={lesson.practiceQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {lesson.prevLessonId ? (
            <Link
              href={`/courses/${courseId}/${lesson.prevLessonId}`}
              className="btn-secondary text-sm inline-flex items-center gap-2"
            >
              ← 이전 강의
            </Link>
          ) : (
            <Link
              href={`/courses/${courseId}`}
              className="btn-secondary text-sm inline-flex items-center gap-2"
            >
              ← 강의 목록
            </Link>
          )}

          {lesson.nextLessonId ? (
            <Link
              href={`/courses/${courseId}/${lesson.nextLessonId}`}
              className="btn-primary text-sm inline-flex items-center gap-2"
            >
              다음 강의 →
            </Link>
          ) : (
            <Link
              href={`/courses/${courseId}`}
              className="btn-primary text-sm inline-flex items-center gap-2"
            >
              강의 완료 ✓
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
