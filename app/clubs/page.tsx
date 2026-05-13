import type { Metadata } from "next";
import ComingSoonRoom from "@/components/landing/ComingSoonRoom";

export const metadata: Metadata = {
  title: "Clubs | InHero",
  description: "Curated flagship clubs for ambitious students.",
};

export default function ClubsPage() {
  return (
    <ComingSoonRoom
      eyebrow="CLUBS · ARRIVING THIS COHORT"
      title="The rooms you'd want to belong to."
      italicWord="belong"
      body="Five curated flagship clubs — InHero Bio Research Circle, Future Founders, Engineering Ivy, Global Debaters, Olympiad/Advanced STEM. Admin-curated, not open marketplace. Joining is the signal, not the goal."
      bullets={[
        "Each club has a public room, member intros, and weekly prompts.",
        "Membership lives on your trajectory profile.",
        "Applications, team postings, and workspaces ship in v2.",
      ]}
      accent="#A99CFF"
    />
  );
}
