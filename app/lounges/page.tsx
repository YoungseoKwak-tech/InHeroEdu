import type { Metadata } from "next";
import ComingSoonRoom from "@/components/landing/ComingSoonRoom";

export const metadata: Metadata = {
  title: "Lounges | InHero",
  description: "Subject-based community lounges for the InHero cohort.",
};

export default function LoungesPage() {
  return (
    <ComingSoonRoom
      eyebrow="LOUNGES · ARRIVING THIS COHORT"
      title="Where the cohort actually talks."
      italicWord="actually"
      body="Subject-based rooms for the InHero cohort — open discussion, exam talk, study questions. Starts with AP Bio. Small on purpose. High-signal by default."
      bullets={[
        "Post a question, get a reply from a verified AP 5 scorer.",
        "Share a resource, get it dissected — not buried.",
        "Identity is your trajectory handle, not a username.",
      ]}
      accent="#5eead4"
    />
  );
}
