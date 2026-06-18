"use client";

/**
 * /dm — DM inbox. Lists the signed-in user's threads (other person + last
 * message), newest first → tap to open /dm/[handle]. This is how a mentor sees
 * and replies to incoming messages.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClientSession, authFetch } from "@/lib/client-auth";

interface ThreadItem {
  threadId: string;
  otherHandle: string | null;
  lastMessage: string | null;
  lastAt: string | null;
  lastFromMe: boolean;
}

export default function DMInboxPage() {
  const [status, setStatus] = useState<"loading" | "out" | "ok">("loading");
  const [threads, setThreads] = useState<ThreadItem[]>([]);

  useEffect(() => {
    (async () => {
      const session = await getClientSession().catch(() => null);
      if (!session) { setStatus("out"); return; }
      try {
        const res = await authFetch("/api/dm/threads");
        const json = await res.json();
        if (json?.ok) setThreads(json.threads ?? []);
      } catch { /* ignore */ }
      setStatus("ok");
    })();
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a14", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "20px 18px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>✦ 받은 메시지</h1>
          <Link href="/parents" style={{ color: "#A99CFF", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>자료실 →</Link>
        </div>

        {status === "loading" && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>불러오는 중…</p>}
        {status === "out" && (
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>로그인 후 받은 메시지를 볼 수 있어요.</p>
        )}
        {status === "ok" && threads.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "40px 0", textAlign: "center" }}>아직 받은 메시지가 없어요.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {threads.map((t) => (
            <Link key={t.threadId} href={`/dm/${encodeURIComponent(t.otherHandle ?? "")}`}
              style={{ display: "block", textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>@{t.otherHandle}</span>
                {t.lastAt && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{new Date(t.lastAt).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })}</span>}
              </div>
              {t.lastMessage && (
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "5px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.lastFromMe ? "나: " : ""}{t.lastMessage}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
