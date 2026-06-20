"use client";

/**
 * "출시 알림 받기" — shown when a 런칭 예정 (coming-soon) textbook card is
 * clicked. Records the request on the signed-in user's account (via
 * /api/textbooks/notify). Logged-out visitors are sent to signup first so we
 * have an account to notify.
 */
import { useEffect, useState } from "react";
import { authFetch, getClientSession } from "@/lib/client-auth";

const GREEN = "#00b85f";

export default function LaunchNotifyModal({
  slug,
  title,
  ko = true,
  onClose,
}: {
  slug: string;
  title: string;
  ko?: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState<string | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    getClientSession()
      .then((s) => setEmail(s?.user?.email ?? null))
      .catch(() => setEmail(null))
      .finally(() => setAuthResolved(true));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit() {
    if (!email) {
      // Not signed in → send to signup; they can request again once back.
      window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", source: "textbook-launch-notify" } }));
      onClose();
      return;
    }
    setStatus("loading");
    try {
      const res = await authFetch("/api/textbooks/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const cta = !authResolved
    ? (ko ? "확인 중…" : "Checking…")
    : status === "loading"
    ? (ko ? "신청 중…" : "Submitting…")
    : !email
    ? (ko ? "로그인하고 알림 받기" : "Sign in to get notified")
    : (ko ? "🔔 출시 알림 받기" : "🔔 Notify me at launch");

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(8,14,22,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 16, padding: "24px 22px", boxShadow: "0 24px 60px rgba(0,0,0,0.3)", color: "#1a1a1f" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: GREEN }}>🚀 {ko ? "곧 출시됩니다" : "Coming soon"}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "#9aa6b2", cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <h3 style={{ margin: "6px 0 6px", fontSize: 18, fontWeight: 800 }}>{title}</h3>

        {status === "done" ? (
          <div style={{ padding: "10px 0 4px" }}>
            <p style={{ margin: 0, fontSize: 14.5, color: "#0f6e56", fontWeight: 700 }}>
              ✓ {ko ? "알림 신청 완료!" : "You're on the list!"}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
              {ko
                ? `출시되면 ${email ? email + "로 " : ""}가장 먼저 알려드릴게요.`
                : `We'll email${email ? " " + email : " you"} the moment it launches.`}
            </p>
            <button onClick={onClose} style={{ marginTop: 16, width: "100%", background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
              {ko ? "닫기" : "Done"}
            </button>
          </div>
        ) : (
          <>
            <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>
              {ko
                ? "이 교재는 곧 출시됩니다. 출시되면 가장 먼저 알려드릴게요."
                : "This book launches soon. Get notified the moment it's ready."}
            </p>
            {authResolved && email && (
              <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "#94a3b8" }}>
                {ko ? "알림 받을 계정: " : "Notify: "}<strong style={{ color: "#475569" }}>{email}</strong>
              </p>
            )}
            {status === "error" && (
              <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "#dc2626" }}>
                {ko ? "잠시 후 다시 시도해 주세요." : "Something went wrong — please try again."}
              </p>
            )}
            <button
              onClick={submit}
              disabled={!authResolved || status === "loading"}
              style={{ marginTop: 6, width: "100%", background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontWeight: 800, fontSize: 15, cursor: !authResolved || status === "loading" ? "default" : "pointer", opacity: !authResolved || status === "loading" ? 0.8 : 1 }}
            >
              {cta}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
