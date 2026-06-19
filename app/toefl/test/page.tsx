import type { Metadata } from "next";
import ToeflTestClient from "./ToeflTestClient";

export const metadata: Metadata = {
  title: "TOEFL iBT Practice Test — Take It",
  description: "Take all four TOEFL iBT sections — Reading, Listening, Speaking, and Writing — just like the real exam. Auto-grading with explanations, listening audio playback, speaking recording, and writing timers.",
  alternates: { canonical: "/toefl/test" },
};

export default function ToeflTestPage() {
  return <ToeflTestClient />;
}
