import { redirect } from "next/navigation";

// Seminar lives under /parents/seminar (parent-facing). Keep /seminar working
// for any already-shared links.
export default function SeminarRedirect() {
  redirect("/parents/seminar");
}
