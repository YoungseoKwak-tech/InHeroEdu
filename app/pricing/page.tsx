import type { Metadata } from "next";
import EnglishPricingSection from "@/components/pricing/EnglishPricingSection";

export const metadata: Metadata = {
  title: "Pricing | InHero",
  description: "Choose your InHero plan, from subject passes to tutoring and college consulting.",
};

export default function PricingPage() {
  return <EnglishPricingSection />;
}
