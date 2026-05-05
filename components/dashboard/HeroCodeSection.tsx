"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/app/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { getStoredUserId } from "@/lib/username";
import { authFetch } from "@/lib/client-auth";
import { getHeroCodeMeta, HERO_CODE_META, HERO_CODE_ORDER } from "@/lib/hero-codes";

interface Portrait {
  heroCode: string;
  sparkTrigger: string;
  processingStyle: string;
  essaySeeds: string[];
  sparkIntensity: number;
}

interface EvolutionEntry {
  id: string;
  created_at: string;
  old_code: string | null;
  new_code: string;
  trigger_summary: string;
}

export default function HeroCodeSection() {
  const { lang } = useLang();
  const tx = t[lang].heroCode;
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [evolution, setEvolution] = useState<EvolutionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = getStoredUserId();
    if (!uid) { setLoading(false); return; }

    Promise.all([
      authFetch(`/api/memory/portrait`).then(r => r.json()).catch(() => null),
      authFetch(`/api/memory/evolution`).then(r => r.json()).catch(() => ({ entries: [] })),
    ]).then(([pData, eData]) => {
      if (pData?.portrait) setPortrait(pData.portrait);
      if (eData?.evolution) setEvolution(eData.evolution);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card p-6 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">🦸</span>
          <h2 className="font-extrabold text-white text-lg">{tx.title}</h2>
        </div>
        <div className="flex gap-1.5 justify-center py-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!portrait) return null;

  const codeMeta = getHeroCodeMeta(portrait.heroCode);
  const coreColor = codeMeta?.accent ?? "#1D9E75";
  const intensity = Math.min(100, Math.max(0, portrait.sparkIntensity ?? 50));
  const isProvisional = intensity < 60;

  return (
    <div className="mt-8 space-y-5">
      {/* Hero Code card */}
      <div className="card p-6" style={{ borderLeft: `4px solid ${coreColor}` }}>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] text-3xl shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
              style={{ background: codeMeta?.glow ?? "rgba(29,158,117,0.18)" }}
            >
              {codeMeta?.mascot ?? "🦸"}
            </div>
            <div>
              <h2 className="font-extrabold text-white text-lg mb-0.5">{tx.title}</h2>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{tx.subtitle}</p>
              {codeMeta && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-white">{codeMeta.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.56)" }}>
                    {codeMeta.mascotName} · {codeMeta.oneLiner}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-3xl font-black tracking-tight"
              style={{ color: coreColor }}
            >
              {portrait.heroCode}
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{
                background: isProvisional ? "rgba(255,255,255,0.08)" : `${coreColor}22`,
                color: isProvisional ? "rgba(255,255,255,0.5)" : coreColor,
              }}
            >
              {isProvisional ? tx.provisional : tx.confirmed}
            </span>
          </div>
        </div>

        {/* Code description */}
        {codeMeta && (
          <div
            className="text-sm mb-5 px-4 py-3 rounded-xl"
            style={{ background: `${coreColor}15`, color: "rgba(255,255,255,0.85)" }}
          >
            {codeMeta.oneLiner}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Spark trigger */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{tx.spark}</p>
            <p className="text-sm text-white font-medium mb-2">{portrait.sparkTrigger}</p>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${intensity}%`, backgroundColor: coreColor }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              {intensity}% · {isProvisional
                ? `${Math.round((60 - intensity) * 0.5)} ${tx.hoursNeeded}`
                : tx.hours}
            </p>
          </div>

          {/* Processing style */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{tx.processing}</p>
            <p className="text-sm text-white font-medium">{portrait.processingStyle}</p>
          </div>
        </div>
      </div>

      {/* Essay seeds */}
      <div className="card p-6">
        <h3 className="font-bold text-white text-base mb-3">{tx.essaySeeds}</h3>
        {portrait.essaySeeds && portrait.essaySeeds.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {portrait.essaySeeds.map((seed, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{
                  background: `${coreColor}15`,
                  borderColor: `${coreColor}40`,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {seed}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{tx.noSeeds}</p>
        )}
      </div>

      {/* Career matches */}
      {codeMeta && (
        <div className="card p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoPill label="Activation" value={codeMeta.activation} accent={coreColor} />
            <InfoPill label="Growth Path" value={codeMeta.path} accent={coreColor} />
            <InfoPill label="Mascot" value={`${codeMeta.mascot} ${codeMeta.mascotName}`} accent={coreColor} />
          </div>
        </div>
      )}

      <div className="card p-6">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div>
            <h3 className="font-bold text-white text-base">Hero Code Index</h3>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              20 learning identities, each paired with a mascot and growth path.
            </p>
          </div>
          <Link
            href="/hero-codes"
            className="rounded-full px-3 py-1 text-xs font-semibold transition-colors hover:bg-white/12"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)" }}
          >
            view all codes
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {HERO_CODE_ORDER.map((id) => {
            const item = HERO_CODE_META[id];
            const active = portrait.heroCode.startsWith(id);
            return (
              <div
                key={id}
                className="rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  borderColor: active ? `${item.accent}66` : "rgba(255,255,255,0.08)",
                  background: active ? item.glow : "rgba(255,255,255,0.03)",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl">{item.mascot}</span>
                  <span className="text-xs font-black" style={{ color: item.accent }}>{item.id}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.56)" }}>{item.mascotName}</p>
                <p className="mt-3 text-xs leading-5" style={{ color: "rgba(255,255,255,0.54)" }}>{item.oneLiner}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evolution timeline */}
      <div className="card p-6">
        <h3 className="font-bold text-white text-base mb-4">{tx.evolution}</h3>
        {evolution.length === 0 ? (
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{tx.noEvolution}</p>
        ) : (
          <div className="space-y-3">
            {evolution.map((entry) => {
              const date = new Date(entry.created_at).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
                month: "short", day: "numeric",
              });
              const fromMeta = getHeroCodeMeta(entry.old_code ?? "");
              const toMeta = getHeroCodeMeta(entry.new_code);
              return (
                <div key={entry.id} className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: toMeta?.accent ?? "#1D9E75" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {entry.old_code && fromMeta && (
                        <>
                          <span className="text-xs font-bold" style={{ color: fromMeta.accent }}>{entry.old_code}</span>
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>→</span>
                        </>
                      )}
                      {toMeta && (
                        <span className="text-xs font-bold" style={{ color: toMeta.accent }}>{entry.new_code}</span>
                      )}
                      <span className="text-xs ml-auto" style={{ color: "rgba(255,255,255,0.35)" }}>{date}</span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{entry.trigger_summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoPill({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: `${accent}33`, background: `${accent}10` }}>
      <p className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: accent }}>{label}</p>
      <p className="mt-2 text-sm leading-6 text-white">{value}</p>
    </div>
  );
}
