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
  // initialLang comes from the server. NOTE: on Vercel the layout's
  // cookies() read does not reliably surface the locale cookie into SSR, so
  // initialLang is effectively always "en". We therefore treat the cookie as
  // the client-side source of truth and reconcile on mount (below).
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Persistence fix: SSR renders English (cookies() unreliable on Vercel), so
  // a returning Korean user would otherwise see English until they re-toggle.
  // Read the cookie once after hydration and flip state to match. This runs
  // AFTER the first paint, so the initial client render still matches the
  // English SSR — no #418 hydration mismatch — then re-renders to Korean.
  useEffect(() => {
    const m = document.cookie.match(/(?:^|;\s*)inhero_lang=(ko|en)/)
    const cookieLang = (m?.[1] as Lang | undefined)
    if (cookieLang && cookieLang !== lang) setLangState(cookieLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep <html lang> in sync with the active language for a11y/SEO. Safe
  // because <html> carries suppressHydrationWarning — a benign post-mount
  // attribute update, not a React-tracked hydration diff.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    // 1-year cookie, lax so top-level navigations send it; path=/ for whole site.
    // This is the persisted source of truth — the mount effect above reads it
    // back on the next load. (We intentionally do NOT router.refresh(): SSR
    // can't read the cookie on Vercel, so a refresh would only repaint server
    // content in English and flicker; the client state switch covers the UI.)
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = l
    setLangState(l)
  }, [])

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
