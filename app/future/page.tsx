"use client";

/**
 * /future — full-screen wrapper for the SelfSynchronization hero.
 *
 * Replaces the prior SplitSelf SVG centerpiece. The component is
 * the same one mounted in the landing-page hero (app/page.tsx);
 * here it gets a dedicated route + framed in a cosmic page shell
 * so a signed-in student can drop in for a focus session.
 */

import SelfSynchronization from "@/components/SelfSynchronization/SelfSynchronization";

export default function FuturePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "3rem 1.25rem 4rem",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(169, 156, 255, 0.06), transparent 50%)," +
          "radial-gradient(ellipse at 80% 100%, rgba(94, 234, 212, 0.05), transparent 55%)," +
          "#050610",
      }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <SelfSynchronization />
      </div>
    </main>
  );
}
