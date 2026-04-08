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
  weekly: "이번 주",
  monthly: "이번 달",
  alltime: "전체",
};

const PRIZE_TIERS = [
  { streak: 7,   emoji: "🥉", label: "Bronze",  prize: "InHero 배지",                 color: "from-amber-700 to-amber-500" },
  { streak: 30,  emoji: "🥈", label: "Silver",  prize: "교재 PDF 1권 무료",            color: "from-gray-400 to-gray-300"   },
  { streak: 100, emoji: "🥇", label: "Gold",    prize: "Amazon Gift Card $10",         color: "from-yellow-500 to-yellow-400" },
  { streak: 365, emoji: "💎", label: "Diamond", prize: "Doordash $20 + 컨설팅 1회",   color: "from-primary-600 to-primary-400" },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xl">🏆</div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">리더보드</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">스트릭 유지하고 상품 받아가세요!</p>
            </div>
          </div>

          {/* My stats card */}
          {myRow && (
            <div className="bg-gradient-to-r from-primary-500 to-violet-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-primary-100 text-xs font-semibold mb-1">나의 현황 {myUsername && `(${myUsername})`}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-black">{getStreakEmoji(myStreak)} {myStreak}일</p>
                      <p className="text-xs text-primary-200 mt-0.5">연속 streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black">{myRow.correct}</p>
                      <p className="text-xs text-primary-200 mt-0.5">정답 수</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black">{myRow.accuracy}%</p>
                      <p className="text-xs text-primary-200 mt-0.5">정답률</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black">#{myRank}</p>
                      <p className="text-xs text-primary-200 mt-0.5">순위</p>
                    </div>
                  </div>
                </div>
                {nextPrize && (
                  <div className="bg-white/20 rounded-xl p-3 text-sm">
                    <p className="text-xs text-primary-100 mb-1">다음 상품까지</p>
                    <p className="font-bold">{nextPrize.emoji} {nextPrize.label}</p>
                    <p className="text-xs text-primary-100">{nextPrize.prize}</p>
                    <p className="text-xs text-primary-200 mt-1">{nextPrize.streak - myStreak}일 남음</p>
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
          <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
            {(["weekly", "monthly", "alltime"] as Period[]).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${period === p ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"}`}>
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
                <p className="text-sm">아직 데이터가 없어요. 문제은행에서 문제를 풀어보세요!</p>
              </div>
            ) : (
              <div>
                {rows.map((row, idx) => {
                  const isMe = row.userId === myUserId;
                  const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
                  return (
                    <div key={row.userId} className={`flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0 ${isMe ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"} transition-colors`}>
                      <span className="w-8 text-center font-black text-lg text-gray-400">
                        {medal ?? <span className="text-sm">#{idx + 1}</span>}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${isMe ? "text-primary-600 dark:text-primary-400" : "text-gray-900 dark:text-white"}`}>
                          {isMe && myUsername ? myUsername : row.userId.slice(0, 8) + "…"}
                          {isMe && <span className="ml-1.5 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full">나</span>}
                        </p>
                        <p className="text-xs text-gray-400">{getStreakEmoji(row.streak)} {row.streak}일 streak</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-black text-gray-900 dark:text-white">{row.correct}정답</p>
                        <p className="text-xs text-gray-400">{row.accuracy}% 정확도</p>
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
          <h2 className="font-extrabold text-gray-900 dark:text-white text-lg">🎁 상품 목록</h2>
          {PRIZE_TIERS.map((tier) => {
            const achieved = myStreak >= tier.streak;
            return (
              <div key={tier.streak} className={`card p-4 ${achieved ? "ring-2 ring-primary-400" : ""}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{tier.emoji}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{tier.label}</p>
                    <p className="text-xs text-gray-400">{tier.streak}일 연속 달성</p>
                  </div>
                  {achieved && <span className="ml-auto text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">달성 ✓</span>}
                </div>
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{tier.prize}</p>
                {achieved && (
                  <a href={KAKAO_LINK} target="_blank" rel="noopener noreferrer"
                    className="mt-3 block text-center text-xs font-bold py-2 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-gray-900 transition-colors">
                    💬 카카오톡으로 상품 신청
                  </a>
                )}
              </div>
            );
          })}

          <div className="card p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">📅 오늘의 목표</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">문제은행에서 <strong>5문제</strong> 이상 풀면<br />오늘 스트릭이 유지돼요!</p>
            <a href="/question-bank" className="mt-3 block text-center btn-primary text-xs py-2">문제 풀러 가기</a>
          </div>
        </div>
      </div>
    </div>
  );
}
