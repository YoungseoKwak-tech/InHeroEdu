"use client";

import { useState } from "react";

export default function WaitlistClient({ source = "ai_feature" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  async function joinWaitlist() {
    if (!email.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
        }),
      });

      if (res.ok) {
        setJoined(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl card p-8">
      <p className="text-xs font-semibold tracking-[0.28em] text-primary-400 mb-4">FIRST COHORT</p>
      <h1 className="text-3xl sm:text-4xl font-black mb-4">Join the First Cohort</h1>
      <p className="text-white/65 leading-relaxed mb-8">
        We are rolling out the full AI learning pattern engine to early users first.
        Join the waitlist to unlock your Hero Code and get priority access.
      </p>

      {joined ? (
        <div className="rounded-2xl border border-primary-500/30 bg-primary-500/10 p-5">
          <p className="text-lg font-bold text-primary-300 mb-2">You&apos;re in the first cohort queue.</p>
          <p className="text-sm text-white/70">We&apos;ll reach out as soon as your seat opens.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <button
            onClick={joinWaitlist}
            disabled={!email.trim() || loading}
            className="btn-primary w-full text-sm py-3 disabled:opacity-50"
          >
            {loading ? "Saving your place..." : "Join the First Cohort"}
          </button>
        </div>
      )}
    </div>
  );
}
