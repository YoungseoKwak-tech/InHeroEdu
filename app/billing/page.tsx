"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
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

type BillingResponse = {
  orders: OrderRow[];
  manuals: ManualRow[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function statusLabel(status: string) {
  switch (status) {
    case "paid":
      return "Paid";
    case "failed":
      return "Failed";
    case "pending":
      return "Pending";
    default:
      return status;
  }
}

function formatAmount(amount: number, currency: PaymentCurrency) {
  return currency === "USD" ? usd(amount) : krw(amount);
}

function BillingPageInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<BillingResponse>({ orders: [], manuals: [] });

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

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
        setData(body);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load billing.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totals = useMemo(() => {
    return data.orders
      .filter((order) => order.status === "paid")
      .reduce(
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
  }, [data.orders]);

  const paymentSuccess = searchParams.get("payment") === "success";

  return (
    <div style={{ minHeight: "100vh", background: "#05070C", color: "#F5F7FA", padding: "96px 24px 72px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.16em", color: "#00FF88", marginBottom: "12px" }}>
            MY PROFILE · BILLING
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05, fontWeight: 800, marginBottom: "10px" }}>
            Purchases, receipts, and manual access in one place.
          </h1>
          <p style={{ color: "rgba(245,247,250,0.6)", maxWidth: "720px", lineHeight: 1.7 }}>
            Students can review what they bought, what is active, and which manuals are ready to open.
          </p>
        </div>

        {paymentSuccess && (
          <div style={{ marginBottom: "24px", padding: "16px 18px", borderRadius: "16px", border: "1px solid rgba(0,255,136,0.24)", background: "rgba(0,255,136,0.08)" }}>
            <div style={{ fontWeight: 700, marginBottom: "4px" }}>Payment confirmed.</div>
            <div style={{ color: "rgba(245,247,250,0.7)", fontSize: "14px" }}>
              Your billing history and unlocked manuals are updated below.
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ padding: "72px 0", textAlign: "center", color: "rgba(245,247,250,0.55)" }}>
            Loading billing...
          </div>
        ) : needsAuth ? (
          <div style={{ padding: "32px", borderRadius: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "10px" }}>Sign in to view billing.</h2>
            <p style={{ color: "rgba(245,247,250,0.64)", marginBottom: "18px", lineHeight: 1.7 }}>
              Billing and manual access are tied to the student account that made the purchase.
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
                { label: "Paid orders", value: String(data.orders.filter((order) => order.status === "paid").length) },
                { label: "USD paid", value: usd(totals.usd) },
                { label: "Legacy KRW", value: totals.krw > 0 ? krw(totals.krw) : "None" },
                { label: "Manuals unlocked", value: String(data.manuals.length) },
              ].map((item) => (
                <div key={item.label} style={{ padding: "20px", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(245,247,250,0.45)", textTransform: "uppercase", marginBottom: "10px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 800 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: "20px" }}>
              <section style={{ padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Transactions</h2>
                  <Link href="/pricing" style={{ color: "#00FF88", textDecoration: "none", fontSize: "14px" }}>
                    View pricing
                  </Link>
                </div>

                {data.orders.length === 0 ? (
                  <div style={{ color: "rgba(245,247,250,0.52)", lineHeight: 1.7 }}>
                    No purchases yet.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {data.orders.map((order) => (
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
                          <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{order.order_name}</div>
                          <div style={{ color: "rgba(245,247,250,0.55)", fontSize: "13px", lineHeight: 1.6 }}>
                            {order.service_id} · {order.currency} · {formatDate(order.created_at)}
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
                              background: order.status === "paid" ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.08)",
                              color: order.status === "paid" ? "#00FF88" : "rgba(245,247,250,0.7)",
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
                  <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Manual access</h2>
                  <Link href="/textbooks" style={{ color: "#00FF88", textDecoration: "none", fontSize: "14px" }}>
                    Open manuals
                  </Link>
                </div>

                {data.manuals.length === 0 ? (
                  <div style={{ color: "rgba(245,247,250,0.52)", lineHeight: 1.7 }}>
                    No manuals unlocked yet.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {data.manuals.map((manual) => (
                      <div key={`${manual.subjectId}-${manual.orderId ?? "manual"}`} style={{ padding: "16px 18px", borderRadius: "18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>{manual.title}</div>
                        <div style={{ color: "rgba(245,247,250,0.55)", fontSize: "13px", marginBottom: "12px" }}>
                          {manual.subjectId}
                          {manual.priceAmount && manual.priceCurrency ? ` · ${formatAmount(manual.priceAmount, manual.priceCurrency)}` : ""}
                        </div>
                        {manual.pdfUrl ? (
                          <a
                            href={manual.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-flex", padding: "10px 14px", borderRadius: "12px", background: "rgba(0,255,136,0.12)", color: "#00FF88", textDecoration: "none", fontWeight: 700 }}
                          >
                            Read manual
                          </a>
                        ) : (
                          <span style={{ color: "rgba(245,247,250,0.42)", fontSize: "13px" }}>PDF link unavailable</span>
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
