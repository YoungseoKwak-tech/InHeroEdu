import type { Metadata } from "next";
import ComingSoonRoom from "@/components/landing/ComingSoonRoom";

export const metadata: Metadata = {
  title: "Trajectory | InHero",
  description: "Your ambition handle, badges, and public profile.",
};

export default function TrajectoryPage() {
  return (
    <ComingSoonRoom
      eyebrow="TRAJECTORY · ARRIVING THIS COHORT"
      title="An identity for the version of you that's still arriving."
      italicWord="arriving"
      body="A lightweight, public-by-default profile — ambition handle, graduation year, target schools, badges. Not a resume. The signal that lets other ambitious students recognize you."
      bullets={[
        "Pick your handle: CornellBio27 · FutureFounder17 · APChem5.",
        "Earn badges from real signals — verified AP 5, research, olympiad, founder.",
        "Show it on every lounge post and club room.",
      ]}
      accent="#F4C95D"
      backLabel="← Back to InHero"
    />
  );
}
