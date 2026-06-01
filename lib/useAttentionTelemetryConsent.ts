"use client";

import { useCallback, useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";

export type AttentionConsentState = "checking" | "prompt" | "granted" | "declined";

export function useAttentionTelemetryConsent() {
  const [attentionConsent, setAttentionConsent] = useState<AttentionConsentState>("checking");

  useEffect(() => {
    let cancelled = false;
    authFetch("/api/privacy/consent?type=attention_telemetry")
      .then((res) => {
        if (res.status === 401) return { consented: false };
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setAttentionConsent(json?.consented === true ? "granted" : "prompt");
      })
      .catch(() => {
        if (!cancelled) setAttentionConsent("declined");
      });
    return () => { cancelled = true; };
  }, []);

  const handleAttentionConsent = useCallback((agreed: boolean) => {
    setAttentionConsent("checking");
    void (async () => {
      try {
        const res = await authFetch("/api/privacy/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consentType: "attention_telemetry",
            consented: agreed,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setAttentionConsent(agreed ? "granted" : "declined");
      } catch {
        // Do not start telemetry unless consent was durably recorded.
        setAttentionConsent(agreed ? "prompt" : "declined");
      }
    })();
  }, []);

  return { attentionConsent, handleAttentionConsent };
}
