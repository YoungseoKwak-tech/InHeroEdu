'use client'

import { useLang } from "@/app/contexts/LanguageContext"
import EnglishPricingSection from "@/components/pricing/EnglishPricingSection"

export default function PricingLangSwitch({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()
  if (lang === 'en') return <EnglishPricingSection />
  return <>{children}</>
}
