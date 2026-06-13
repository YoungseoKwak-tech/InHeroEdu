import { afterEach, describe, expect, it, vi } from "vitest";
import {
  approveNicePayPayment,
  getNicePayClientId,
  getNicePayMethod,
  getNicePayQuote,
  isNicePayConfigured,
} from "@/lib/nicepay";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

describe("nicepay config", () => {
  it("falls back when optional env vars are blank strings", () => {
    process.env.NICEPAY_CLIENT_ID = "";
    process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID = "public-client-id";
    process.env.NICEPAY_SECRET_KEY = "secret-key";
    process.env.NICEPAY_METHOD = "";
    process.env.NICEPAY_CURRENCY = "";

    expect(getNicePayClientId()).toBe("public-client-id");
    expect(getNicePayMethod()).toBe("card");
    expect(isNicePayConfigured()).toBe(true);
    expect(getNicePayQuote("one_subject")).toMatchObject({
      chargeAmount: 75000,
      chargeCurrency: "KRW",
    });
  });

  it("uses the NICEPAY client id and secret key for approval API Basic auth", async () => {
    process.env.NICEPAY_CLIENT_ID = "";
    process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID = "client-id";
    process.env.NICEPAY_SECRET_KEY = "secret-key";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        resultCode: "0000",
        tid: "tid_123",
        amount: 1004,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await approveNicePayPayment({ tid: "tid_123", amount: 1004 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(options).toEqual(
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ amount: 1004 }),
      })
    );
    expect(options.headers).toEqual(
      expect.objectContaining({
        Authorization: `Basic ${Buffer.from("client-id:secret-key").toString("base64")}`,
        "Content-Type": "application/json",
      })
    );
    expect(options.headers).not.toEqual(
      expect.objectContaining({
        Authorization: `Basic ${Buffer.from("secret-key:").toString("base64")}`,
      })
    );
  });
});
