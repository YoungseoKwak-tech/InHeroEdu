'use client'
import { createContext, useContext } from 'react'

// Site is English-only as of 2026-05-15. Korean was dropped from the
// nav and the previous DOM-mutation side-effects (document.documentElement.lang,
// localStorage read of "inhero_lang") were causing a SSR/CSR hydration
// mismatch — server rendered <html lang="en">, client mutated it to "ko"
// on mount if a stored preference existed, triggering React #418/#423/#425
// in the entire tree.
//
// The context shape is kept as a no-op so existing imports of useLang()
// keep compiling. Remove the import sites in a follow-up.

type Lang = 'ko' | 'en'

const LanguageContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
}>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ lang: 'en', setLang: () => {} }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
