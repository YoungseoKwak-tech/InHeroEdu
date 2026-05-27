import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const selectMock = vi.fn();
const singleMock = vi.fn();
const eqMock = vi.fn();
const updateMock = vi.fn();
const textbookSelectMock = vi.fn();
const textbookEqSubjectMock = vi.fn();
const textbookEqStatusMock = vi.fn();
const textbookSingleMock = vi.fn();

const fromMock = vi.fn((table: string) => {
  if (table === "orders") {
    return {
      insert: insertMock,
      select: selectMock,
      update: updateMock,
    };
  }

  if (table === "textbook_products") {
    return {
      select: textbookSelectMock,
    };
  }

  throw new Error(`Unexpected table: ${table}`);
});

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
  }),
}));

vi.mock("@/lib/auth", () => ({
  requireAuthenticatedUser: vi.fn(async () => ({
    id: "user-1",
    email: "student@example.com",
    user_metadata: {},
  })),
  getAuthenticatedUser: vi.fn(async () => ({
    id: "user-1",
    email: "student@example.com",
    user_metadata: {},
  })),
}));

describe("payment routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TOSS_CLIENT_KEY = "test_ck_example";
    process.env.TOSS_SECRET_KEY = "test_sk_example";

    insertMock.mockReturnValue({ select: selectMock });
    selectMock.mockImplementation(() => ({
      single: singleMock,
      eq: eqMock,
    }));
    singleMock.mockResolvedValue({ data: { id: "order-1" }, error: null });
    eqMock.mockImplementation(() => ({
      single: vi.fn().mockResolvedValue({
        data: { id: "order-1", amount_krw: 29, status: "pending", service_id: "single", order_name: "한 과목 패스", user_id: null },
        error: null,
      }),
    }));
    updateMock.mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) });
    textbookSelectMock.mockReturnValue({ eq: textbookEqSubjectMock });
    textbookEqSubjectMock.mockReturnValue({ eq: textbookEqStatusMock });
    textbookEqStatusMock.mockReturnValue({ single: textbookSingleMock });
    textbookSingleMock.mockResolvedValue({
      data: { price_krw: 39000, title: "AP Biology", status: "available" },
      error: null,
    });
  });

  it("creates orders from the server pricing table, not client-provided amount", async () => {
    const { POST } = await import("@/app/api/payments/toss/route");

    const req = new Request("http://localhost/api/payments/toss", {
      method: "POST",
      body: JSON.stringify({
        serviceId: "single",
        amount: 100,
        orderName: "Tampered Price",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req as never);
    const body = await res.json();

    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        service_id: "single",
        order_name: "한 과목 패스",
        amount_krw: 29,
        status: "pending",
      })
    );
    expect(body.amount).toBe(29);
    expect(body.orderName).toBe("한 과목 패스");
    expect(body.currency).toBe("USD");
    expect(body.method).toBe("FOREIGN_EASY_PAY");
    expect(body.provider).toBe("PAYPAL");
  });

  it("creates textbook purchases as normal orders so they appear in billing", async () => {
    const { POST } = await import("@/app/api/payments/toss/route");

    const req = new Request("http://localhost/api/payments/toss", {
      method: "POST",
      body: JSON.stringify({
        serviceId: "textbook",
        subjectId: "ap-biology",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req as never);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        service_id: "textbook:ap-biology",
        order_name: "AP Biology",
        amount_krw: 29,
        status: "pending",
      })
    );
    expect(body.amount).toBe(29);
    expect(body.orderName).toBe("AP Biology");
    expect(body.currency).toBe("USD");
  });

  it("rejects unknown service ids", async () => {
    const { POST } = await import("@/app/api/payments/toss/route");

    const req = new Request("http://localhost/api/payments/toss", {
      method: "POST",
      body: JSON.stringify({ serviceId: "does-not-exist" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req as never);

    expect(res.status).toBe(400);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("confirms payments using the stored order amount", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ paymentKey: "pay_123", orderId: "order-1", status: "DONE", totalAmount: 29 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { POST } = await import("@/app/api/payments/confirm/route");

    const req = new Request("http://localhost/api/payments/confirm", {
      method: "POST",
      body: JSON.stringify({
        paymentKey: "pay_123",
        orderId: "order-1",
        amount: 10,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req as never);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.tosspayments.com/v1/payments/confirm",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          paymentKey: "pay_123",
          orderId: "order-1",
          amount: 29,
        }),
      })
    );
    expect(body.success).toBe(true);
  });
});
