'use client'

/**
 * Cookie-based language switch — hydration-safe.
 *
 * The previous version mutated document.documentElement.lang and read
 * localStorage on mount, which diverged from the server-rendered
 * <html lang="en"> and triggered React #418/#423/#425 across the tree.
 *
 * This version takes the locale from a COOKIE the server already read at
 * render time (see app/layout.tsx, which passes `initialLang` and sets
 * <html lang>). Server and client therefore start from the SAME value —
 * no mismatch. setLang() writes the cookie, flips local state for an
 * instant client update, and router.refresh()es so any Server Components
 * re-render in the new language and the cookie persists for next load.
 */

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { KO } from '@/lib/i18n/ko'

export type Lang = 'ko' | 'en'

export const LANG_COOKIE = 'inhero_lang'

interface LanguageValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** Translate an English source string; falls back to English when missing. */
  t: (en: string) => string
}

const LanguageContext = createContext<LanguageValue>({
  lang: 'en',
  setLang: () => {},
  toggle: () => {},
  t: (en) => en,
})

export function LanguageProvider({
  initialLang = 'en',
  children,
}: {
  initialLang?: Lang
  children: React.ReactNode
}) {
  const router = useRouter()
  // initialLang comes from the server's cookie read — same on both sides.
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Next 16 statically optimizes the <html> shell, so its lang attribute can
  // lag the cookie even when the (dynamic) body renders Korean. Correct it on
  // the client after hydration. Safe because <html> carries
  // suppressHydrationWarning — this is a benign post-mount attribute update,
  // not a React-tracked hydration diff.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback(
    (l: Lang) => {
      // 1-year cookie, lax so top-level navigations send it; path=/ for whole site.
      document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
      // Reflect on <html> for a11y/SEO without waiting for the server round-trip.
      document.documentElement.lang = l
      setLangState(l)
      // Re-render Server Components (metadata, server pages) in the new language.
      router.refresh()
    },
    [router]
  )

  const toggle = useCallback(() => {
    setLang(lang === 'ko' ? 'en' : 'ko')
  }, [lang, setLang])

  const t = useCallback(
    (en: string) => (lang === 'ko' ? (KO[en] ?? en) : en),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)

/** Convenience hook: const t = useT(); t("Pricing"). */
export const useT = () => useContext(LanguageContext).t
