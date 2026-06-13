"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import { courses } from "@/lib/data/courses";
import { krw, usd } from "@/lib/pricing";
import type { PaymentCurrency } from "@/lib/paymentCatalog";

type OrderRow = {
  id: string;
  provider?: string | null;
  service_id: string;
  order_name: string;
  amount: number;
  currency: PaymentCurrency;
  kind?: string | null;
  provider_subscription_id?: string | null;
  status: string;
  created_at: string;
  paid_at?: string | null;
};

type ManualRow = {
  subjectId: string;
  orderId: string | null;
  title: string;
  pdfUrl: string | null;
  priceAmount: number | null;
  priceCurrency: PaymentCurrency | null;
  status: string | null;
};

type SubscriptionRow = {
  id: string;
  provider: string;
  service_id: string;
  subject_id: string | null;
  status: string;
  next_billing_at: string | null;
  last_billed_at: string | null;
  last_order_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  access_through: string | null;
  can_cancel: boolean;
  manage_url: string | null;
};

type BillingResponse = {
  orders: OrderRow[];
  manuals: ManualRow[];
  subscriptions?: SubscriptionRow[];
};

const courseNameById = new Map(courses.map((course) => [course.id, course.subjectEn]));

function formatDate(value: string | null) {
  if (!value) return "Not scheduled";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function statusLabel(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "Active";
    case "paid":
      return "Paid";
    case "failed":
      return "Failed";
    case "pending":
      return "Pending";
    case "past_due":
      return "Payment issue";
    case "cancelled":
    case "canceled":
      return "Canceled";
    case "expired":
      return "Expired";
    default:
      return status || "Unknown";
  }
}

function formatAmount(amount: number, currency: PaymentCurrency) {
  return currency === "USD" ? usd(amount) : krw(amount);
}

function subjectLabel(subjectId?: string | null) {
  const normalized = normalizeCourseAccessSubjectId(subjectId);
  if (!normalized) return null;
  return courseNameById.get(normalized) ?? normalized;
}

function subjectFromServiceId(serviceId: string) {
  const [, rawSubjectId] = serviceId.toLowerCase().split(":");
  return subjectLabel(rawSubjectId);
}

function cleanPlanName(serviceId: string, subjectId?: string | null, fallback = "InHero purchase") {
  const normalizedServiceId = serviceId.toLowerCase();
  const subjectName = subjectLabel(subjectId) ?? subjectFromServiceId(normalizedServiceId);

  if (normalizedServiceId === "all_subjects" || normalizedServiceId === "novapass") {
    return "All Subject Elite Pass";
  }

  if (
    normalizedServiceId === "one_subject" ||
    normalizedServiceId.startsWith("one_subject:") ||
    normalizedServiceId.startsWith("single:")
  ) {
    return subjectName ? `One Subject Elite Pass — ${subjectName}` : "One Subject Elite Pass";
  }

  if (normalizedServiceId.startsWith("textbook:")) {
    const textbookSubject = subjectLabel(normalizedServiceId.slice("textbook:".length));
    return textbookSubject ? `${textbookSubject} Textbook` : "Textbook access";
  }

  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(fallback) ? "InHero purchase" : fallback;
}

function planScope(serviceId: string, subjectId?: string | null) {
  const normalizedServiceId = serviceId.toLowerCase();
  const subjectName = subjectLabel(subjectId) ?? subjectFromServiceId(normalizedServiceId);

  if (normalizedServiceId === "all_subjects" || normalizedServiceId === "novapass") {
    return "Unlocks every course, every textbook, every question bank, and every lounge.";
  }

  if (
    normalizedServiceId === "one_subject" ||
    normalizedServiceId.startsWith("one_subject:") ||
    normalizedServiceId.startsWith("single:")
  ) {
    return subjectName
      ? `Unlocks ${subjectName} lessons, textbook, question bank, and all lounges.`
      : "Unlocks one selected subject plus all lounges.";
  }

  if (normalizedServiceId.startsWith("textbook:")) {
    return "Unlocks textbook reader access for this subject.";
  }

  return "Your InHero access is listed below.";
}

function purchaseType(order: OrderRow) {
  const serviceId = order.service_id.toLowerCase();

  if (serviceId === "all_subjects" || serviceId === "novapass") return "All subjects";
  if (serviceId.startsWith("one_subject:") || serviceId.startsWith("single:") || serviceId === "one_subject") {
    return "One subject";
  }
  if (serviceId.startsWith("textbook:")) return "Textbook";
  return "InHero";
}

function isActiveSubscription(subscription: SubscriptionRow) {
  return subscription.status.toLowerCase() === "active";
}

function isRenewalStopped(subscription: SubscriptionRow) {
  const status = subscription.status.toLowerCase();
  return status === "cancelled" || status === "canceled" || status === "expired";
}

function subscriptionStatusLabel(subscription: SubscriptionRow) {
  if (isRenewalStopped(subscription)) return "Renewal stopped";
  return statusLabel(subscription.status);
}

function subscriptionDateLabel(subscription: SubscriptionRow) {
  if (isActiveSubscription(subscription)) return "Next renewal";
  if (isRenewalStopped(subscription)) return "Access through";
  if (subscription.status.toLowerCase() === "past_due") return "Retry date";
  return "Billing date";
}

function subscriptionDisplayDate(subscription: SubscriptionRow) {
  if (isActiveSubscription(subscription)) {
    return subscription.next_billing_at ?? subscription.access_through;
  }
  return subscription.access_through ?? subscription.next_billing_at;
}

function cancellationState(subscription: SubscriptionRow | null) {
  if (!subscription) return "No subscription";
  if (isRenewalStopped(subscription)) return "Renewal stopped";
  if (subscription.can_cancel) return "Cancelable here";
  if (subscription.manage_url) return "Managed by provider";
  if (isActiveSubscription(subscription)) return "Contact support";
  return statusLabel(subscription.status);
}

function providerLabel(provider: string) {
  switch (provider.toLowerCase()) {
    case "nicepay":
      return "NICEPAY";
    case "paypal":
      return "PayPal";
    default:
      return provider || "Provider";
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function readBoolean(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

async function readJsonSafely(res: Response): Promise<Record<string, unknown> | null> {
  const text = await res.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function mergeSubscriptionUpdate(subscription: SubscriptionRow, value: unknown): SubscriptionRow {
  const update = asRecord(value);
  if (!update) {
    return { ...subscription, status: "cancelled", can_cancel: false };
  }

  return {
    ...subscription,
    id: readString(update.id) ?? subscription.id,
    provider: readString(update.provider) ?? subscription.provider,
    service_id: readString(update.service_id) ?? subscription.service_id,
    subject_id: readString(update.subject_id) ?? subscription.subject_id,
    status: readString(update.status) ?? subscription.status,
    next_billing_at: readString(update.next_billing_at) ?? subscription.next_billing_at,
    last_billed_at: readString(update.last_billed_at) ?? subscription.last_billed_at,
    last_order_id: readString(update.last_order_id) ?? subscription.last_order_id,
    created_at: readString(update.created_at) ?? subscription.created_at,
    updated_at: readString(update.updated_at) ?? subscription.updated_at,
    access_through: readString(update.access_through) ?? subscription.access_through,
    can_cancel: readBoolean(update.can_cancel) ?? false,
    manage_url: readString(update.manage_url) ?? subscription.manage_url,
  };
}

function BillingPageInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [cancelingSubscriptionId, setCancelingSubscriptionId] = useState<string | null>(null);
  const [data, setData] = useState<BillingResponse>({ orders: [], manuals: [], subscriptions: [] });

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setNeedsAuth(false);

      try {
        const res = await authFetch("/api/billing");
        if (res.status === 401) {
          setNeedsAuth(true);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error ?? "Failed to load billing.");
        }

        const body = (await res.json()) as BillingResponse;
        setData({
          orders: body.orders ?? [],
          manuals: body.manuals ?? [],
          subscriptions: body.subscriptions ?? [],
        });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load billing.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const paidOrders = useMemo(
    () =>
      data.orders
        .filter((order) => order.status === "paid")
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [data.orders]
  );

  const subscriptions = useMemo(
    () =>
      [...(data.subscriptions ?? [])].sort((a, b) => {
        const activeDelta = Number(isActiveSubscription(b)) - Number(isActiveSubscription(a));
        if (activeDelta !== 0) return activeDelta;
        return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      }),
    [data.subscriptions]
  );

  const activeSubscription = useMemo(() => subscriptions.find(isActiveSubscription) ?? null, [subscriptions]);
  const primarySubscription = activeSubscription ?? subscriptions[0] ?? null;
  const latestPaidOrder = paidOrders[0] ?? null;

  const totals = useMemo(() => {
    return paidOrders.reduce(
      (summary, order) => {
        if (order.currency === "USD") {
          summary.usd += Number(order.amount ?? 0);
        } else {
          summary.krw += Number(order.amount ?? 0);
        }
        return summary;
      },
      { usd: 0, krw: 0 }
    );
  }, [paidOrders]);

  const currentPlanName = primarySubscription
    ? cleanPlanName(primarySubscription.service_id, primarySubscription.subject_id)
    : latestPaidOrder
      ? cleanPlanName(latestPaidOrder.service_id, null, latestPaidOrder.order_name)
      : "Free Plan";

  const currentPlanStatus = primarySubscription
    ? subscriptionStatusLabel(primarySubscription)
    : latestPaidOrder
      ? "Paid access"
      : "Free";
  const currentPlanScope = primarySubscription
    ? planScope(primarySubscription.service_id, primarySubscription.subject_id)
    : latestPaidOrder
      ? planScope(latestPaidOrder.service_id)
      : "First lessons and public question previews are available. Upgrade when you are ready to unlock a subject or every subject.";
  const currentBillingDateLabel = primarySubscription ? subscriptionDateLabel(primarySubscription) : "Next renewal";
  const currentBillingDate = primarySubscription ? formatDate(subscriptionDisplayDate(primarySubscription)) : "Not scheduled";
  const totalPaid = totals.usd > 0 ? usd(totals.usd) : totals.krw > 0 ? krw(totals.krw) : "$0";

  async function cancelSubscription(subscription: SubscriptionRow) {
    if (!subscription.can_cancel || !isActiveSubscription(subscription)) return;

    const confirmed = window.confirm(
      "Cancel future recurring billing? You will keep access through the paid period, and no next monthly charge will be attempted."
    );
    if (!confirmed) return;

    setCancelingSubscriptionId(subscription.id);
    setActionMessage(null);
    try {
      const res = await authFetch(
        `/api/billing/subscriptions/${encodeURIComponent(subscription.id)}/cancel`,
        { method: "POST" }
      );
      const json = await readJsonSafely(res);
      if (!res.ok) {
        throw new Error(typeof json?.error === "string" ? json.error : "Could not cancel subscription.");
      }

      setData((current) => ({
        ...current,
        subscriptions: (current.subscriptions ?? []).map((item) =>
          item.id === subscription.id ? mergeSubscriptionUpdate(item, json?.subscription) : item
        ),
      }));
      setActionMessage({
        tone: "success",
        text: "Renewal stopped. Your current paid access remains available through the paid period.",
      });
    } catch (e) {
      setActionMessage({
        tone: "error",
        text: e instanceof Error ? e.message : "Could not cancel subscription.",
      });
    } finally {
      setCancelingSubscriptionId(null);
    }
  }

  function renderSubscriptionAction(subscription: SubscriptionRow, compact = false) {
    const isCanceling = cancelingSubscriptionId === subscription.id;

    if (isActiveSubscription(subscription) && subscription.can_cancel) {
      return (
        <button
          type="button"
          disabled={isCanceling}
          onClick={() => void cancelSubscription(subscription)}
          style={{
            minHeight: compact ? "38px" : "42px",
            padding: compact ? "9px 12px" : "11px 15px",
            borderRadius: compact ? "12px" : "13px",
            border: "1px solid rgba(255,107,91,0.48)",
            background: "rgba(255,107,91,0.1)",
            color: "#FFB0A7",
            fontWeight: 800,
            cursor: isCanceling ? "default" : "pointer",
            opacity: isCanceling ? 0.6 : 1,
          }}
        >
          {isCanceling ? "Cancelling..." : "Cancel renewal"}
        </button>
      );
    }

    if (isActiveSubscription(subscription) && subscription.manage_url) {
      return (
        <a
          href={subscription.manage_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: compact ? "38px" : "42px",
            padding: compact ? "9px 12px" : "11px 15px",
            borderRadius: compact ? "12px" : "13px",
            background: "#00FF88",
            color: "#02120A",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Manage in {providerLabel(subscription.provider)}
        </a>
      );
    }

    if (isActiveSubscription(subscription)) {
      return (
        <a
          href={`mailto:inheroedu@gmail.com?subject=${encodeURIComponent("Billing support")}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: compact ? "38px" : "42px",
            padding: compact ? "9px 12px" : "11px 15px",
            borderRadius: compact ? "12px" : "13px",
            border: "1px solid rgba(0,255,136,0.24)",
            background: "rgba(0,255,136,0.09)",
            color: "#00FF88",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Contact support
        </a>
      );
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          minHeight: compact ? "34px" : "38px",
          padding: compact ? "8px 11px" : "9px 13px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(245,247,250,0.64)",
          fontSize: compact ? "12px" : "13px",
          fontWeight: 800,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {isRenewalStopped(subscription) ? "Renewal stopped" : statusLabel(subscription.status)}
      </span>
    );
  }

  const paymentSuccess = searchParams.get("payment") === "success";

  return (
    <div style={{ minHeight: "100vh", background: "#05070C", color: "#F5F7FA", padding: "96px 24px 72px" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.16em", color: "#00FF88", marginBottom: "12px" }}>
            ACCOUNT · BILLING
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05, fontWeight: 800, marginBottom: "10px" }}>
            My current plan and purchases.
          </h1>
          <p style={{ color: "rgba(245,247,250,0.6)", maxWidth: "760px", lineHeight: 1.7 }}>
            See what is active on your account, what you bought, and where to manage renewal or cancellation.
          </p>
        </div>

        {paymentSuccess && (
          <div style={{ marginBottom: "24px", padding: "16px 18px", borderRadius: "16px", border: "1px solid rgba(0,255,136,0.24)", background: "rgba(0,255,136,0.08)" }}>
            <div style={{ fontWeight: 700, marginBottom: "4px" }}>Payment confirmed.</div>
            <div style={{ color: "rgba(245,247,250,0.7)", fontSize: "14px" }}>
              Your plan and purchase history are updated below.
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ padding: "72px 0", textAlign: "center", color: "rgba(245,247,250,0.55)" }}>
            Loading billing...
          </div>
        ) : needsAuth ? (
          <div style={{ padding: "32px", borderRadius: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "10px" }}>Sign in to view your plan.</h2>
            <p style={{ color: "rgba(245,247,250,0.64)", marginBottom: "18px", lineHeight: 1.7 }}>
              Your current plan and purchases are tied to the student account that made the purchase.
            </p>
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("inhero:open-auth", { detail: { mode: "login", source: "billing" } })
                )
              }
              style={{ padding: "12px 18px", borderRadius: "12px", border: "none", background: "#00FF88", color: "#02120A", fontWeight: 700, cursor: "pointer" }}
            >
              Sign in
            </button>
          </div>
        ) : error ? (
          <div style={{ padding: "24px", borderRadius: "20px", border: "1px solid rgba(255,90,90,0.22)", background: "rgba(255,90,90,0.08)", color: "#FFB2B2" }}>
            {error}
          </div>
        ) : (
          <>
            {actionMessage && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border:
                    actionMessage.tone === "success"
                      ? "1px solid rgba(0,255,136,0.24)"
                      : "1px solid rgba(255,90,90,0.24)",
                  background:
                    actionMessage.tone === "success"
                      ? "rgba(0,255,136,0.08)"
                      : "rgba(255,90,90,0.08)",
                  color: actionMessage.tone === "success" ? "#B9FFD9" : "#FFB2B2",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {actionMessage.text}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              {[
                { label: "Current plan", value: currentPlanName },
                { label: "Plan status", value: currentPlanStatus },
                { label: currentBillingDateLabel, value: currentBillingDate },
                { label: "Total paid", value: totalPaid },
              ].map((item) => (
                <div key={item.label} style={{ padding: "20px", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(245,247,250,0.45)", textTransform: "uppercase", marginBottom: "10px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: item.value.length > 24 ? "20px" : "28px", fontWeight: 800, lineHeight: 1.2 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <section style={{ marginBottom: "20px", padding: "26px", borderRadius: "26px", background: "linear-gradient(135deg, rgba(0,255,136,0.09), rgba(255,255,255,0.025))", border: "1px solid rgba(0,255,136,0.18)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "18px", flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#00FF88", textTransform: "uppercase", marginBottom: "12px" }}>
                    Current plan
                  </div>
                  <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 800, lineHeight: 1.08, marginBottom: "10px" }}>
                    {currentPlanName}
                  </h2>
                  <p style={{ color: "rgba(245,247,250,0.68)", maxWidth: "720px", lineHeight: 1.7 }}>
                    {currentPlanScope}
                  </p>
                </div>

                <div style={{ minWidth: "220px", padding: "16px", borderRadius: "18px", background: "rgba(5,7,12,0.62)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px", color: "rgba(245,247,250,0.58)", fontSize: "13px" }}>
                    <span>Status</span>
                    <strong style={{ color: primarySubscription || latestPaidOrder ? "#00FF88" : "rgba(245,247,250,0.86)", textAlign: "right" }}>{currentPlanStatus}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px", color: "rgba(245,247,250,0.58)", fontSize: "13px" }}>
                    <span>{currentBillingDateLabel}</span>
                    <strong style={{ color: "rgba(245,247,250,0.86)", textAlign: "right" }}>
                      {currentBillingDate}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "14px", color: "rgba(245,247,250,0.58)", fontSize: "13px" }}>
                    <span>Cancellation</span>
                    <strong style={{ color: "rgba(245,247,250,0.86)", textAlign: "right" }}>
                      {cancellationState(primarySubscription)}
                    </strong>
                  </div>
                  {primarySubscription ? (
                    renderSubscriptionAction(primarySubscription)
                  ) : (
                    <Link
                      href="/pricing"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "42px",
                        borderRadius: "13px",
                        background: "#00FF88",
                        color: "#02120A",
                        textDecoration: "none",
                        fontWeight: 800,
                      }}
                    >
                      View plans
                    </Link>
                  )}
                </div>
              </div>
            </section>

            <section style={{ marginBottom: "20px", padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(245,247,250,0.45)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Renewal control
                  </div>
                  <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Subscription details</h2>
                </div>
                <div style={{ color: "rgba(245,247,250,0.48)", fontSize: "13px" }}>
                  {subscriptions.length} subscription{subscriptions.length === 1 ? "" : "s"}
                </div>
              </div>

              {subscriptions.length === 0 ? (
                <div style={{ color: "rgba(245,247,250,0.52)", lineHeight: 1.7 }}>
                  No recurring subscription is active on this account yet. Completed purchases still appear below.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {subscriptions.map((subscription) => {
                    const active = isActiveSubscription(subscription);
                    return (
                      <article
                        key={subscription.id}
                        style={{
                          padding: "18px",
                          borderRadius: "20px",
                          background: active ? "rgba(0,255,136,0.045)" : "rgba(255,255,255,0.02)",
                          border: active ? "1px solid rgba(0,255,136,0.18)" : "1px solid rgba(255,255,255,0.06)",
                          display: "grid",
                          gridTemplateColumns: "minmax(0, 1fr) auto",
                          gap: "14px",
                          alignItems: "start",
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
                            <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0 }}>
                              {cleanPlanName(subscription.service_id, subscription.subject_id)}
                            </h3>
                            <span
                              style={{
                                display: "inline-flex",
                                padding: "4px 9px",
                                borderRadius: "999px",
                                background: active ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.06)",
                                color: active ? "#00FF88" : "rgba(245,247,250,0.62)",
                                fontSize: "11px",
                                fontWeight: 800,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                              }}
                            >
                              {subscriptionStatusLabel(subscription)}
                            </span>
                          </div>
                          <p style={{ margin: "0 0 12px", color: "rgba(245,247,250,0.62)", lineHeight: 1.6 }}>
                            {planScope(subscription.service_id, subscription.subject_id)}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", color: "rgba(245,247,250,0.52)", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                            <span>Provider: {providerLabel(subscription.provider)}</span>
                            <span>{subscriptionDateLabel(subscription)}: {formatDate(subscriptionDisplayDate(subscription))}</span>
                            <span>Last billed: {formatDate(subscription.last_billed_at)}</span>
                            <span>Cancellation: {cancellationState(subscription)}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          {renderSubscriptionAction(subscription, true)}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", color: "rgba(245,247,250,0.5)", fontSize: "13px", lineHeight: 1.6 }}>
                <span>Cancel renewal before the next billing cycle. Current paid access stays available through the paid period.</span>
                <span style={{ display: "inline-flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/refund-policy" style={{ color: "#00FF88", textDecoration: "none" }}>Refund policy</Link>
                  <Link href="/terms" style={{ color: "#00FF88", textDecoration: "none" }}>Terms</Link>
                  <Link href="/privacy" style={{ color: "#00FF88", textDecoration: "none" }}>Privacy</Link>
                </span>
              </div>
            </section>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
              <section style={{ padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: 700 }}>My purchases</h2>
                  <Link href="/pricing" style={{ color: "#00FF88", textDecoration: "none", fontSize: "14px" }}>
                    Buy more
                  </Link>
                </div>

                {paidOrders.length === 0 ? (
                  <div style={{ color: "rgba(245,247,250,0.52)", lineHeight: 1.7 }}>
                    No completed purchases yet. Checkout attempts only appear here after payment succeeds.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {paidOrders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          padding: "16px 18px",
                          borderRadius: "18px",
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          display: "grid",
                          gridTemplateColumns: "minmax(0, 1fr) auto",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>
                            {cleanPlanName(order.service_id, null, order.order_name)}
                          </div>
                          <div style={{ color: "rgba(245,247,250,0.55)", fontSize: "13px", lineHeight: 1.6 }}>
                            {purchaseType(order)} · {formatDate(order.created_at)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "16px", fontWeight: 700 }}>{formatAmount(order.amount, order.currency)}</div>
                          <div
                            style={{
                              marginTop: "6px",
                              display: "inline-flex",
                              padding: "4px 10px",
                              borderRadius: "999px",
                              background: "rgba(0,255,136,0.12)",
                              color: "#00FF88",
                              fontSize: "12px",
                            }}
                          >
                            {statusLabel(order.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section style={{ padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Textbook access</h2>
                  <Link href="/textbooks" style={{ color: "#00FF88", textDecoration: "none", fontSize: "14px" }}>
                    Open textbooks
                  </Link>
                </div>

                {data.manuals.length === 0 ? (
                  <div style={{ color: "rgba(245,247,250,0.52)", lineHeight: 1.7 }}>
                    No textbooks unlocked yet.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {data.manuals.map((manual) => (
                      <div key={`${manual.subjectId}-${manual.orderId ?? "manual"}`} style={{ padding: "16px 18px", borderRadius: "18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>
                          {subjectLabel(manual.subjectId) ?? manual.title}
                        </div>
                        <div style={{ color: "rgba(245,247,250,0.55)", fontSize: "13px", marginBottom: "12px" }}>
                          Textbook reader access
                          {manual.priceAmount && manual.priceCurrency ? ` · ${formatAmount(manual.priceAmount, manual.priceCurrency)}` : ""}
                        </div>
                        {manual.pdfUrl ? (
                          <a
                            href={manual.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-flex", padding: "10px 14px", borderRadius: "12px", background: "rgba(0,255,136,0.12)", color: "#00FF88", textDecoration: "none", fontWeight: 700 }}
                          >
                            Read textbook
                          </a>
                        ) : (
                          <span style={{ color: "rgba(245,247,250,0.42)", fontSize: "13px" }}>Textbook link unavailable</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#05070C", color: "#F5F7FA", padding: "96px 24px 72px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", color: "rgba(245,247,250,0.55)" }}>
            Loading billing...
          </div>
        </div>
      }
    >
      <BillingPageInner />
    </Suspense>
  );
}
