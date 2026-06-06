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
  service_id: string;
  order_name: string;
  amount: number;
  currency: PaymentCurrency;
  status: string;
  created_at: string;
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
  can_cancel: boolean;
};

type BillingResponse = {
  orders: OrderRow[];
  manuals: ManualRow[];
  subscriptions?: SubscriptionRow[];
};

const courseNameById = new Map(courses.map((course) => [course.id, course.subjectEn]));

function formatDate(value: string | null) {
  if (!value) return "Not scheduled";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
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

function BillingPageInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [error, setError] = useState("");
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

  const activeSubscription = useMemo(
    () => (data.subscriptions ?? []).find(isActiveSubscription) ?? null,
    [data.subscriptions]
  );

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

  const currentPlanName = activeSubscription
    ? cleanPlanName(activeSubscription.service_id, activeSubscription.subject_id)
    : latestPaidOrder
      ? cleanPlanName(latestPaidOrder.service_id, null, latestPaidOrder.order_name)
      : "Free Plan";

  const currentPlanStatus = activeSubscription ? statusLabel(activeSubscription.status) : latestPaidOrder ? "Paid access" : "Free";

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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              {[
                { label: "Current plan", value: currentPlanName },
                { label: "Plan status", value: currentPlanStatus },
                { label: "Purchases", value: String(paidOrders.length) },
                { label: "Total paid", value: totals.usd > 0 ? usd(totals.usd) : totals.krw > 0 ? krw(totals.krw) : "$0" },
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
                    {activeSubscription
                      ? planScope(activeSubscription.service_id, activeSubscription.subject_id)
                      : latestPaidOrder
                        ? planScope(latestPaidOrder.service_id)
                        : "First lessons and public question previews are available. Upgrade when you are ready to unlock a subject or every subject."}
                  </p>
                </div>

                <div style={{ minWidth: "220px", padding: "16px", borderRadius: "18px", background: "rgba(5,7,12,0.62)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px", color: "rgba(245,247,250,0.58)", fontSize: "13px" }}>
                    <span>Status</span>
                    <strong style={{ color: activeSubscription || latestPaidOrder ? "#00FF88" : "rgba(245,247,250,0.86)" }}>{currentPlanStatus}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "14px", color: "rgba(245,247,250,0.58)", fontSize: "13px" }}>
                    <span>Next renewal</span>
                    <strong style={{ color: "rgba(245,247,250,0.86)", textAlign: "right" }}>
                      {activeSubscription ? formatDate(activeSubscription.next_billing_at) : "Not scheduled"}
                    </strong>
                  </div>
                  <Link
                    href={activeSubscription ? "/my-plan" : "/pricing"}
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
                    {activeSubscription ? "Manage subscription" : "View plans"}
                  </Link>
                </div>
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
