"use client";

/**
 * /admin/notify — Kakao 친구톡 marketing broadcast console.
 * Sends to every marketing-consented parent with a phone on file. Shows live
 * audience size, a dry-run preview, and a log of recent broadcasts.
 */

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";

interface BroadcastRow {
  id: string; channel: string; title: string; body: string;
  audience_count: number; sent_count: number; failed_count: number;
  status: string; created_at: string;
}

export default function AdminNotifyPage() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [audience, setAudience] = useState(0);
  const [recent, setRecent] = useState<BroadcastRow[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  async function load() {
    try {
      const res = await authFetch("/api/admin/notify/broadcast");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "failed to load");
      setConfigured(!!json.configured);
      setAudience(json.audienceCount ?? 0);
      setRecent(json.recent ?? []);
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : String(e) });
    }
  }
  useEffect(() => { void load(); }, []);

  async function send(dryRun: boolean) {
    if (!title.trim() || !body.trim() || busy) return;
    setBusy(true); setMsg(null);
    try {
      const res = await authFetch("/api/admin/notify/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), linkUrl: linkUrl.trim() || null, dryRun }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "send failed");
      setMsg({
        kind: "ok",
        text: dryRun
          ? `미리보기: 대상 ${json.audienceCount}명 (실제 발송 안 함)`
          : `발송 완료 — 대상 ${json.audienceCount} · 접수 ${json.accepted} · 실패 ${json.failed}${json.note ? `\n${json.note}` : ""}`,
      });
      if (!dryRun) { setTitle(""); setBody(""); setLinkUrl(""); }
      await load();
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="nb-root">
      <div className="nb-shell">
        <header className="nb-header">
          <div className="nb-eyebrow"><span className="nb-dot" /><span>KAKAO 친구톡 BROADCAST</span></div>
          <h1 className="nb-title">학부모 단체 알림 발송</h1>
          <p className="nb-sub">광고 수신동의한 학부모에게 카카오 친구톡으로 업데이트를 보냅니다. 발송 전 미리보기로 대상 인원을 확인하세요.</p>
        </header>

        {/* Status row */}
        <div className="nb-stats">
          <div className="nb-stat">
            <span className="nb-stat-num">{audience.toLocaleString()}</span>
            <span className="nb-stat-label">수신 대상 (동의·번호 보유)</span>
          </div>
          <div className="nb-stat">
            <span className={`nb-stat-num ${configured ? "is-on" : "is-off"}`}>{configured == null ? "…" : configured ? "ON" : "OFF"}</span>
            <span className="nb-stat-label">Solapi 연동</span>
          </div>
        </div>

        {configured === false && (
          <div className="nb-banner is-warn">
            ⚠️ Solapi 키가 아직 없습니다. 지금 발송하면 <strong>실제로 나가지 않고(dry run)</strong> 로그만 남습니다.
            env(SOLAPI_API_KEY / SOLAPI_API_SECRET / SOLAPI_SENDER_PHONE / SOLAPI_KAKAO_PFID)를 넣으면 바로 발송됩니다.
          </div>
        )}

        {msg && <div className={`nb-banner ${msg.kind === "error" ? "is-error" : "is-ok"}`}>{msg.text}</div>}

        {/* Compose */}
        <section className="nb-card">
          <label className="nb-field">
            <span className="nb-label">제목 (내부 로그용)</span>
            <input className="nb-input" value={title} maxLength={80} placeholder="예: 11월 AP 개념정리 업데이트"
              onChange={(e) => setTitle(e.target.value)} disabled={busy} />
          </label>
          <label className="nb-field">
            <span className="nb-label">메시지 본문 <span className="nb-count">{body.length}/1000</span></span>
            <textarea className="nb-input nb-textarea" value={body} maxLength={1000} rows={5}
              placeholder={"[인히어로 입시 업데이트]\nAP Chemistry 개념정리가 새로 추가됐어요. 지금 확인해보세요!"}
              onChange={(e) => setBody(e.target.value)} disabled={busy} />
          </label>
          <label className="nb-field">
            <span className="nb-label">링크 (선택 — 버튼/하단에 표시)</span>
            <input className="nb-input" value={linkUrl} placeholder="https://inheroedu.com/parents/core-notes"
              onChange={(e) => setLinkUrl(e.target.value)} disabled={busy} />
          </label>
          <div className="nb-actions">
            <button className="nb-btn ghost" onClick={() => void send(true)} disabled={busy || !title.trim() || !body.trim()}>미리보기 (대상 확인)</button>
            <button className="nb-btn solid" onClick={() => void send(false)} disabled={busy || !title.trim() || !body.trim()}>
              {busy ? "처리 중…" : `${audience.toLocaleString()}명에게 발송`}
            </button>
          </div>
          <p className="nb-hint">※ 친구톡은 광고성이라 야간(20:50–08:00) 발송이 제한됩니다. 정보성(가입 환영 등)은 자동 알림톡으로 별도 발송됩니다.</p>
        </section>

        {/* Recent log */}
        <section className="nb-card">
          <div className="nb-section-head"><span className="nb-section-tag">최근 발송</span><span className="nb-section-count">{recent.length}건</span></div>
          {recent.length === 0 ? (
            <div className="nb-empty">아직 발송 내역이 없습니다.</div>
          ) : (
            <table className="nb-table">
              <thead><tr><th>제목</th><th>대상</th><th>접수</th><th>실패</th><th>상태</th><th>일시</th></tr></thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td className="nb-t-title">{r.title}</td>
                    <td>{r.audience_count}</td>
                    <td>{r.sent_count}</td>
                    <td>{r.failed_count}</td>
                    <td><span className={`nb-pill st-${r.status}`}>{r.status}</span></td>
                    <td className="nb-time">{new Date(r.created_at).toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      <style>{`
        .nb-root { min-height: calc(100vh - 4rem); background: linear-gradient(180deg,#02040b,#05070d); padding: 2rem 1rem; color: #d8d9e6; font-family: 'Inter', system-ui, sans-serif; }
        .nb-shell { max-width: 56rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1.25rem; }
        .nb-header { display: flex; flex-direction: column; gap: 0.35rem; }
        .nb-eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; font-family: ui-monospace, monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; color: #fbbf24; }
        .nb-dot { width: 6px; height: 6px; border-radius: 50%; background: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.65); animation: nb-pulse 1.6s ease-in-out infinite; }
        @keyframes nb-pulse { 0%,100% { opacity: .55; transform: scale(.85);} 50% { opacity:1; transform: scale(1.12);} }
        .nb-title { font-size: 1.5rem; font-weight: 700; color: #f3f3fb; margin: 0; letter-spacing: -0.015em; }
        .nb-sub { font-size: 0.85rem; color: #94a3b8; margin: 0; line-height: 1.6; }

        .nb-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .nb-stat { display: flex; flex-direction: column; gap: 0.25rem; padding: 1rem 1.1rem; border-radius: 0.7rem; border: 1px solid rgba(255,255,255,0.07); background: rgba(10,14,26,0.55); }
        .nb-stat-num { font-size: 1.6rem; font-weight: 800; color: #f3f3fb; font-family: ui-monospace, monospace; }
        .nb-stat-num.is-on { color: #34d399; } .nb-stat-num.is-off { color: #fb7185; }
        .nb-stat-label { font-size: 0.72rem; color: #94a3b8; }

        .nb-banner { padding: 0.7rem 0.9rem; border-radius: 0.5rem; font-size: 0.8rem; line-height: 1.6; white-space: pre-line; }
        .nb-banner.is-ok { background: rgba(52,211,153,0.08); color: #6ee7b7; border: 1px solid rgba(52,211,153,0.25); }
        .nb-banner.is-error { background: rgba(255,107,91,0.08); color: #ff8b7e; border: 1px solid rgba(255,107,91,0.3); }
        .nb-banner.is-warn { background: rgba(251,191,36,0.08); color: #fcd34d; border: 1px solid rgba(251,191,36,0.3); }
        .nb-banner strong { color: #fff; }

        .nb-card { display: flex; flex-direction: column; gap: 0.85rem; padding: 1.1rem; border-radius: 0.8rem; border: 1px solid rgba(255,255,255,0.07); background: rgba(10,14,26,0.5); }
        .nb-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .nb-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; color: #94a3b8; display: flex; justify-content: space-between; }
        .nb-count { color: rgba(148,163,184,0.6); font-family: ui-monospace, monospace; font-weight: 500; }
        .nb-input { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 0.6rem 0.8rem; color: #f3f3fb; font-size: 0.9rem; outline: none; font-family: inherit; transition: border-color .15s, box-shadow .2s; }
        .nb-input:focus { border-color: rgba(251,191,36,0.5); box-shadow: 0 0 0 1px rgba(251,191,36,0.35); }
        .nb-textarea { resize: vertical; line-height: 1.6; }
        .nb-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .nb-btn { font-size: 0.82rem; font-weight: 800; padding: 0.7rem 1.3rem; border-radius: 0.5rem; cursor: pointer; transition: all .15s; }
        .nb-btn.ghost { color: #fcd34d; background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.35); }
        .nb-btn.solid { color: #03120c; background: #34d399; border: 1px solid #34d399; margin-left: auto; }
        .nb-btn.solid:hover:not(:disabled) { background: #6ee7b7; }
        .nb-btn:disabled { opacity: 0.4; cursor: default; }
        .nb-hint { font-size: 0.72rem; color: #64748b; margin: 0; line-height: 1.6; }

        .nb-section-head { display: flex; justify-content: space-between; align-items: center; }
        .nb-section-tag { font-family: ui-monospace, monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; color: #fbbf24; }
        .nb-section-count { font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.65); }
        .nb-empty { font-family: ui-monospace, monospace; font-size: 0.78rem; color: rgba(148,163,184,0.6); padding: 0.5rem 0; }
        .nb-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        .nb-table th { text-align: left; font-family: ui-monospace, monospace; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(148,163,184,0.55); padding: 0.45rem 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nb-table td { padding: 0.55rem 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .nb-t-title { color: #f3f3fb; }
        .nb-time { font-family: ui-monospace, monospace; color: rgba(148,163,184,0.7); font-size: 0.72rem; }
        .nb-pill { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 7px; border-radius: 4px; }
        .nb-pill.st-sent { color: #6ee7b7; background: rgba(52,211,153,0.12); }
        .nb-pill.st-dry_run { color: #fcd34d; background: rgba(251,191,36,0.12); }
        .nb-pill.st-partial { color: #fdba74; background: rgba(251,146,60,0.12); }
        .nb-pill.st-failed { color: #ff8b7e; background: rgba(255,107,91,0.12); }

        @media (max-width: 640px) { .nb-stats { grid-template-columns: 1fr; } .nb-btn.solid { margin-left: 0; } }
      `}</style>
    </div>
  );
}
