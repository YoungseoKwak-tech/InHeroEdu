"use client";

import { useEffect, useState } from "react";
import { getStoredUserId, getStoredUsername } from "@/lib/username";
import { KAKAO_LINK } from "@/lib/pricing";

interface LeaderRow {
  user_id: string;
  nickname: string | null;
  correct?: number;
  total?: number;
  accuracy?: number;
  streak?: number;
  points?: number;
}

interface UserPoints {
  points: number;
  streak_days: number;
  total_earned: number;
}

const REWARDS = [
  { emoji: "🎁", name: "DoorDash $10",    pts: 500, color: "#E53E3E" },
  { emoji: "📦", name: "Amazon $10",       pts: 500, color: "#DD6B20" },
  { emoji: "☕", name: "Starbucks $5",     pts: 300, color: "#276749" },
  { emoji: "🏆", name: "InHero 굿즈",     pts: 800, color: "#7F77DD" },
  { emoji: "📚", name: "교재 무료",        pts: 400, color: "#2B6CB0" },
  { emoji: "⭐", name: "1:1 컨설팅 30분", pts: 1000, color: "#D69E2E" },
];

const POINT_ACTIONS = [
  { icon: "🎓", action: "강의 1개 완료",    pts: 10  },
  { icon: "✅", action: "문제 맞힘",         pts: 2   },
  { icon: "🔥", action: "연속 학습 7일",     pts: 50  },
  { icon: "👑", action: "모의고사 1등",      pts: 100 },
];

const MEDAL = ["👑", "🥈", "🥉"];

type Period = "today" | "weekly" | "monthly";
const PERIOD_LABEL: Record<Period, string> = { today: "오늘", weekly: "이번 주", monthly: "이번 달" };

export default function DashboardExtras() {
  const [userId]  = useState(() => getStoredUserId());
  const [username] = useState(() => getStoredUsername());

  const [rows, setRows]       = useState<LeaderRow[]>([]);
  const [period, setPeriod]   = useState<Period>("weekly");
  const [lbLoading, setLbLoading] = useState(true);

  const [myPts, setMyPts]     = useState<UserPoints>({ points: 0, streak_days: 0, total_earned: 0 });

  useEffect(() => {
    // Load leaderboard (uses existing /api/leaderboard which queries question_attempts)
    setLbLoading(true);
    fetch(`/api/leaderboard?period=${period}`)
      .then((r) => r.json())
      .then((d) => setRows(d.rows ?? []))
      .finally(() => setLbLoading(false));
  }, [period]);

  useEffect(() => {
    // Load user points
    if (!userId) return;
    fetch(`/api/points?userId=${userId}`)
      .then((r) => r.json())
      .then((d) => setMyPts({ points: d.points ?? 0, streak_days: d.streak_days ?? 0, total_earned: d.total_earned ?? 0 }))
      .catch(() => {});
  }, [userId]);

  const myRow  = rows.find((r) => r.user_id === userId);
  const myRank = myRow ? rows.indexOf(myRow) + 1 : null;

  return (
    <div className="mt-12 space-y-8">
      {/* ─── 구분선 ─── */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">리더보드 & 리워드</span>
        <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* ─── Streak stats ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "🔥", label: "연속 학습일", value: `${myRow?.streak ?? myPts.streak_days}일` },
          { icon: "🎯", label: "총 정답 수",  value: `${myRow?.correct ?? 0}개` },
          { icon: "📊", label: "정답률",       value: `${myRow?.accuracy ?? 0}%` },
          { icon: "⭐", label: "내 포인트",    value: `${myPts.points}P` },
        ].map((stat) => (
          <div key={stat.label} className="card p-5 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Leaderboard ─── */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="font-extrabold text-gray-900 dark:text-white text-lg">🏆 리더보드</h2>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              {(["today", "weekly", "monthly"] as Period[]).map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${period === p ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
                  {PERIOD_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          {lbLoading ? (
            <div className="flex justify-center py-8">
              <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div>
            </div>
          ) : rows.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-sm">문제은행에서 문제를 풀면 여기 등장해요!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {rows.map((row, idx) => {
                const isMe  = row.user_id === userId;
                const medal = MEDAL[idx] ?? null;
                return (
                  <div key={row.user_id} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isMe ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"} transition-colors`}>
                    <span className="w-8 text-center font-black text-lg">
                      {medal ?? <span className="text-sm text-gray-400">#{idx + 1}</span>}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${isMe ? "text-primary-600 dark:text-primary-400" : "text-gray-900 dark:text-white"}`}>
                        {isMe && username ? username : (row.nickname ?? row.user_id.slice(0, 8) + "…")}
                        {isMe && <span className="ml-1.5 text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded-full">나</span>}
                      </p>
                      <p className="text-xs text-gray-400">🔥 {row.streak ?? 0}일 streak</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-black text-gray-900 dark:text-white">{row.correct ?? 0}정답</p>
                      <p className="text-xs text-gray-400">{row.accuracy ?? 0}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {myRank && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                내 현재 순위 <span className="text-primary-600 dark:text-primary-400 font-extrabold text-lg">#{myRank}</span>
              </p>
            </div>
          )}
        </div>

        {/* ─── Points guide ─── */}
        <div className="card p-6">
          <h2 className="font-extrabold text-gray-900 dark:text-white text-base mb-4">⚡ 포인트 획득 방법</h2>
          <div className="space-y-3 mb-5">
            {POINT_ACTIONS.map((a) => (
              <div key={a.action} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>{a.icon}</span><span>{a.action}</span>
                </div>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">+{a.pts}P</span>
              </div>
            ))}
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">내 보유 포인트</p>
            <p className="text-2xl font-black text-primary-600 dark:text-primary-400">{myPts.points}P</p>
            <p className="text-xs text-gray-400 mt-0.5">누적 획득: {myPts.total_earned}P</p>
          </div>
        </div>
      </div>

      {/* ─── Prize System ─── */}
      <div>
        <h2 className="font-extrabold text-gray-900 dark:text-white text-lg mb-5">🎁 리워드 교환소</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map((reward) => {
            const pct     = Math.min(100, Math.round((myPts.points / reward.pts) * 100));
            const canRedeem = myPts.points >= reward.pts;
            return (
              <div key={reward.name} className={`card p-5 ${canRedeem ? "ring-2 ring-primary-400" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{reward.emoji}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{reward.name}</p>
                    <p className="text-xs text-gray-400">{reward.pts}P 필요</p>
                  </div>
                  {canRedeem && (
                    <span className="ml-auto text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">교환 가능!</span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: canRedeem ? "#10B981" : reward.color }}
                  />
                </div>
                <p className="text-xs text-gray-400 mb-3">{myPts.points}P / {reward.pts}P ({pct}%)</p>

                <a
                  href={KAKAO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center text-xs font-bold py-2 rounded-xl transition-colors ${
                    canRedeem
                      ? "bg-[#FEE500] hover:bg-yellow-400 text-gray-900"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {canRedeem ? "💬 카카오톡으로 교환하기" : "💬 포인트 문의"}
                </a>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          * 포인트 교환은 현재 카카오톡 문의를 통해 처리됩니다. 자동화 예정.
        </p>
      </div>
    </div>
  );
}
