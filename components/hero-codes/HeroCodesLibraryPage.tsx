"use client";

import Link from "next/link";
import { HERO_CODE_META, HERO_CODE_ORDER } from "@/lib/hero-codes";

const groups = [
  {
    label: "Pressure",
    description: "Students who sharpen through urgency, stakes, and heat.",
    codes: ["PF", "PB", "PS"] as const,
  },
  {
    label: "Curiosity",
    description: "Students who move through concepts, structure, and possibility.",
    codes: ["CF", "CS", "CE"] as const,
  },
  {
    label: "Direction",
    description: "Students who build momentum through goals, systems, and ideas.",
    codes: ["DF", "DA", "DB"] as const,
  },
  {
    label: "Security",
    description: "Students who care about certainty, risk, and preparation.",
    codes: ["FS", "FT", "FB"] as const,
  },
  {
    label: "Influence",
    description: "Students who grow through people, teams, and reach.",
    codes: ["IF", "IE", "IB"] as const,
  },
  {
    label: "Pattern",
    description: "Students who experiment, map, and detect hidden structure.",
    codes: ["CV", "CT", "CA"] as const,
  },
  {
    label: "Intensity",
    description: "Students who lock in hard and peak when challenge rises.",
    codes: ["DS", "PE"] as const,
  },
];

export default function HeroCodesLibraryPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#03080d_0%,#08131b_30%,#eef2f5_30%,#f7f9fb_100%)]">
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(78,159,132,0.2),transparent_26%),radial-gradient(circle_at_80%_14%,rgba(96,165,250,0.12),transparent_25%),radial-gradient(circle_at_55%_55%,rgba(184,154,86,0.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-[0.28em] text-emerald-300">
              HERO CODES
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              PUBLIC LIBRARY
            </div>
            <h1 className="mt-7 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              20 learning identities.
              <br />
              One system for how students actually move.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
              Hero Codes are not personality labels. They are operating patterns. Each one reveals what activates a student, how they grow, and
              what kind of environment makes them stronger.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/waitlist?source=hero_codes"
                className="inline-flex items-center justify-center rounded-[1.3rem] bg-emerald-400 px-6 py-4 text-sm font-bold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
              >
                Get Your Hero Code
              </Link>
              <Link
                href="/trajectory-lab"
                className="inline-flex items-center justify-center rounded-[1.3rem] border border-white/14 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-white/84 transition-colors duration-200 hover:bg-white/[0.07]"
              >
                Explore Trajectory Lab
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {HERO_CODE_ORDER.slice(0, 5).map((id) => {
              const item = HERO_CODE_META[id];
              return (
                <div key={id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-3xl">{item.mascot}</span>
                    <span className="text-xs font-black" style={{ color: item.accent }}>{item.id}</span>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-white/56">{item.mascotName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6">
          {groups.map((group) => (
            <div key={group.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.24em] text-slate-400">{group.label.toUpperCase()} GROUP</p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-slate-950">{group.label} Codes</h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">{group.description}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.codes.map((id) => {
                  const item = HERO_CODE_META[id];
                  return (
                    <div key={id} className="rounded-[1.6rem] border border-slate-100 bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-[1rem] text-2xl"
                            style={{ background: item.glow }}
                          >
                            {item.mascot}
                          </div>
                          <div>
                            <p className="text-xs font-black tracking-[0.18em]" style={{ color: item.accent }}>{item.id}</p>
                            <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-sm font-semibold text-slate-800">{item.oneLiner}</p>
                      <p className="mt-2 text-xs font-medium" style={{ color: item.accent }}>{item.mascotName}</p>

                      <div className="mt-5 space-y-3">
                        <div className="rounded-2xl border border-white bg-white px-4 py-3">
                          <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">ACTIVATION</p>
                          <p className="mt-2 text-sm leading-6 text-slate-700">{item.activation}</p>
                        </div>
                        <div className="rounded-2xl border border-white bg-white px-4 py-3">
                          <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">GROWTH PATH</p>
                          <p className="mt-2 text-sm leading-6 text-slate-700">{item.path}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
