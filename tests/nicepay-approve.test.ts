import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  approveNicePayPayment: vi.fn(),
  attachStoredOrderProviderDetails: vi.fn(),
  getStoredOrder: vi.fn(),
  markStoredOrderFailed: vi.fn(),
  markStoredOrderPaid: vi.fn(),
  grantPurchasedCredits: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({ from: vi.fn() }),
}));

vi.mock("@/lib/orderStore", () => ({
  attachStoredOrderProviderDetails: mocks.attachStoredOrderProviderDetails,
  getStoredOrder: mocks.getStoredOrder,
  markStoredOrderFailed: mocks.markStoredOrderFailed,
  markStoredOrderPaid: mocks.markStoredOrderPaid,
}));

vi.mock("@/lib/credits-server", () => ({
  grantPurchasedCredits: mocks.grantPurchasedCredits,
}));

vi.mock("@/lib/nicepay", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/nicepay")>();
  return {
    ...actual,
    approveNicePayPayment: mocks.approveNicePayPayment,
  };
});

describe("NICEPAY approval callback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getStoredOrder.mockResolvedValue({
      id: "order-1",
      userId: "user-1",
      serviceId: "one_subject",
      orderName: "One subject",
      amount: 75000,
      currency: "KRW",
      status: "pending",
      createdAt: new Date().toISOString(),
      providerOrderId: null,
      providerSubscriptionId: null,
      kind: "subscription",
      raw: {},
    });
    mocks.attachStoredOrderProviderDetails.mockResolvedValue(undefined);
  });

  it("keeps the order pending and redirects to failure when the approval API rejects after auth success", async () => {
    mocks.approveNicePayPayment.mockRejectedValue(
      new Error("사용자 정보가 존재하지 않습니다.")
    );

    const { GET } = await import("@/app/api/payments/nicepay/approve/route");
    const req = new NextRequest(
      "https://inheroedu.com/api/payments/nicepay/approve?orderId=order-1&tid=tid_123&amount=75000&authResultCode=0000"
    );

    const res = await GET(req);
    const location = res.headers.get("location") ?? "";

    expect(res.status).toBe(303);
    expect(location).toContain("/payment/fail");
    expect(location).toContain("provider=nicepay");
    expect(location).toContain("serviceId=one_subject");
    expect(location).toContain("code=approval_api_failed");
    expect(location).not.toContain("/payment/success");
    expect(mocks.markStoredOrderFailed).not.toHaveBeenCalled();
    expect(mocks.attachStoredOrderProviderDetails).toHaveBeenCalledWith(
      expect.anything(),
      "order-1",
      expect.objectContaining({
        provider: "nicepay",
        providerOrderId: "tid_123",
        rawResponse: expect.objectContaining({
          approvalError: "사용자 정보가 존재하지 않습니다.",
        }),
      })
    );
  });

  it("marks the order paid and redirects to success when NICEPAY approval succeeds", async () => {
    mocks.approveNicePayPayment.mockResolvedValue({
      resultCode: "0000",
      status: "PAID",
      orderId: "order-1",
      tid: "tid_123",
      amount: 75000,
    });
    mocks.markStoredOrderPaid.mockResolvedValue(undefined);

    const { GET } = await import("@/app/api/payments/nicepay/approve/route");
    const req = new NextRequest(
      "https://inheroedu.com/api/payments/nicepay/approve?orderId=order-1&tid=tid_123&amount=75000&authResultCode=0000"
    );

    const res = await GET(req);
    const location = res.headers.get("location") ?? "";

    expect(res.status).toBe(303);
    expect(location).toContain("/payment/success");
    expect(location).toContain("provider=nicepay");
    expect(location).toContain("localOrderId=order-1");
    expect(mocks.markStoredOrderPaid).toHaveBeenCalledWith(
      expect.anything(),
      "order-1",
      expect.objectContaining({
        userId: "user-1",
        provider: "nicepay",
        providerOrderId: "tid_123",
        rawResponse: expect.objectContaining({
          approval: expect.objectContaining({
            resultCode: "0000",
            orderId: "order-1",
          }),
        }),
      })
    );
    expect(mocks.markStoredOrderFailed).not.toHaveBeenCalled();
  });
});
