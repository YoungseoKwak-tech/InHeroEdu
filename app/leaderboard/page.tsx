"use client";

import { useEffect, useState } from "react";
import { getStoredUserId, getStoredUsername } from "@/lib/username";
import { KAKAO_LINK } from "@/lib/pricing";

interface Row {
  userId: string;
  correct: number;
  total: number;
  accuracy: number;
  streak: number;
}

type Period = "weekly" | "monthly" | "alltime";

const PERIOD_LABEL: Record<Period, string> = {
  weekly: "This week",
  monthly: "This month",
  alltime: "All time",
};

const PRIZE_TIERS = [
  { streak: 7,   emoji: "🥉", label: "Bronze",  prize: "InHero badge",                 color: "from-amber-700 to-amber-500" },
  { streak: 30,  emoji: "🥈", label: "Silver",  prize: "1 textbook PDF — free",        color: "from-gray-400 to-gray-300"   },
  { streak: 100, emoji: "🥇", label: "Gold",    prize: "Amazon Gift Card $10",         color: "from-yellow-500 to-yellow-400" },
  { streak: 365, emoji: "💎", label: "Diamond", prize: "Doordash $20 + 1 consulting",  color: "from-primary-600 to-primary-400" },
];

const STREAK_EMOJI = ["❄️","🌱","🔥","⚡","🌟","💥","👑"];

function getStreakEmoji(streak: number): string {
  if (streak === 0) return "❄️";
  if (streak < 3)  return "🌱";
  if (streak < 7)  return "🔥";
  if (streak < 14) return "⚡";
  if (streak < 30) return "🌟";
  if (streak < 100)return "💥";
  return "👑";
}

export default function LeaderboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [period, setPeriod] = useState<Period>("weekly");
  const [loading, setLoading] = useState(true);
  const [myUserId] = useState(() => getStoredUserId());
  const [myUsername] = useState(() => getStoredUsername());

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?period=${period}`)
      .then((r) => r.json())
      .then((d) => setRows(d.rows ?? []))
      .finally(() => setLoading(false));
  }, [period]);

  const myRow = rows.find((r) => r.userId === myUserId);
  const myRank = myRow ? rows.indexOf(myRow) + 1 : null;
  const myStreak = myRow?.streak ?? 0;
  const nextPrize = PRIZE_TIERS.find((t) => t.streak > myStreak);

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      {/* Header */}
      <div className="border-b" style={{ background: '#050510', borderBottomColor: 'rgba(29,158,117,0.15)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.2)' }}>🏆</div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Leaderboard</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Keep your streak alive and pick up prizes.</p>
            </div>
          </div>

          {/* My stats card */}
          {myRow && (
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-primary-100 text-xs font-semibold mb-1">Your stats {myUsername && `(${myUsername})`}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-black">{getStreakEmoji(myStreak)} {myStreak}d</p>
                      <p className="text-xs text-primary-200 mt-0.5">Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black">{myRow.correct}</p>
                      <p className="text-xs text-primary-200 mt-0.5">Correct</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black">{myRow.accuracy}%</p>
                      <p className="text-xs text-primary-200 mt-0.5">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black">#{myRank}</p>
                      <p className="text-xs text-primary-200 mt-0.5">Rank</p>
                    </div>
                  </div>
                </div>
                {nextPrize && (
                  <div className="bg-white/20 rounded-xl p-3 text-sm">
                    <p className="text-xs text-primary-100 mb-1">Next prize</p>
                    <p className="font-bold">{nextPrize.emoji} {nextPrize.label}</p>
                    <p className="text-xs text-primary-100">{nextPrize.prize}</p>
                    <p className="text-xs text-primary-200 mt-1">{nextPrize.streak - myStreak} days to go</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          {/* Period tabs */}
          <div className="flex gap-1 mb-5 p-1 rounded-xl w-fit" style={{ background: 'rgba(5,5,20,0.8)', border: '1px solid rgba(29,158,117,0.15)' }}>
            {(["weekly", "monthly", "alltime"] as Period[]).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${period === p ? "text-white" : "hover:text-white/80"}`}
                style={period === p ? { background: 'rgba(29,158,117,0.25)', color: '#1D9E75' } : { color: 'rgba(255,255,255,0.45)' }}>
                {PERIOD_LABEL[p]}
              </button>
            ))}
          </div>

          <div className="card overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div>
              </div>
            ) : rows.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-3xl mb-2">📊</p>
                <p className="text-sm">No data yet — answer some questions in the Question Bank to get on the board.</p>
              </div>
            ) : (
              <div>
                {rows.map((row, idx) => {
                  const isMe = row.userId === myUserId;
                  const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
                  return (
                    <div key={row.userId} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-0 transition-colors" style={{ borderBottomColor: 'rgba(29,158,117,0.1)', background: isMe ? 'rgba(29,158,117,0.08)' : undefined }}>
                      <span className="w-8 text-center font-black text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {medal ?? <span className="text-sm">#{idx + 1}</span>}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${isMe ? "text-primary-400" : "text-white"}`}>
                          {isMe && myUsername ? myUsername : row.userId.slice(0, 8) + "…"}
                          {isMe && <span className="ml-1.5 text-xs text-primary-400 px-2 py-0.5 rounded-full" style={{ background: 'rgba(29,158,117,0.15)' }}>You</span>}
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{getStreakEmoji(row.streak)} {row.streak}-day streak</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-black text-white">{row.correct} correct</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{row.accuracy}% accuracy</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Prize tiers */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-white text-lg">🎁 Prizes</h2>
          {PRIZE_TIERS.map((tier) => {
            const achieved = myStreak >= tier.streak;
            return (
              <div key={tier.streak} className={`card p-4 ${achieved ? "ring-1 ring-primary-500" : ""}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{tier.emoji}</span>
                  <div>
                    <p className="font-bold text-sm text-white">{tier.label}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{tier.streak}-day streak</p>
                  </div>
                  {achieved && <span className="ml-auto text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">Unlocked ✓</span>}
                </div>
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{tier.prize}</p>
                {achieved && (
                  <a href={KAKAO_LINK} target="_blank" rel="noopener noreferrer"
                    className="mt-3 block text-center text-xs font-bold py-2 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-gray-900 transition-colors">
                    💬 Claim via KakaoTalk
                  </a>
                )}
              </div>
            );
          })}

          <div className="card p-4">
            <p className="text-xs font-bold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>📅 Today&apos;s goal</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>Answer <strong>5 questions</strong> in the Question Bank<br />to keep today&apos;s streak alive.</p>
            <a href="/question-bank" className="mt-3 block text-center btn-primary text-xs py-2">Open Question Bank</a>
          </div>
        </div>
      </div>
    </div>
  );
}
