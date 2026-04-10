"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo2.png" alt="InHero" width={60} height={60} className="h-16 w-auto object-contain" priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/courses"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            강의
          </Link>
          <Link
            href="/ai-companion"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            AI 컴패니언
          </Link>
          <Link
            href="/thinking-analyzer"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            사고력 분석
          </Link>
          <Link
            href="/flashcards"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            플래시카드
          </Link>
          <Link
            href="/qa"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            Q&amp;A
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            요금제
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            대시보드
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/courses"
            className="btn-primary text-sm py-2 px-5"
          >
            무료로 시작하기
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <Link href="/courses" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            강의
          </Link>
          <Link href="/ai-companion" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            AI 컴패니언
          </Link>
          <Link href="/thinking-analyzer" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            사고력 분석
          </Link>
          <Link href="/flashcards" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            플래시카드
          </Link>
          <Link href="/qa" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            Q&amp;A
          </Link>
          <Link href="/pricing" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            요금제
          </Link>
          <Link href="/dashboard" className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(false)}>
            대시보드
          </Link>
          <Link href="/courses" className="btn-primary text-center text-sm mt-2" onClick={() => setMenuOpen(false)}>
            무료로 시작하기
          </Link>
        </div>
      )}
    </header>
  );
}
