import { describe, expect, it } from "vitest";
import { buildUsdQuoteForService, buildUsdQuoteForTextbook, inferStoredOrderCurrency } from "@/lib/paymentCatalog";

describe("payment catalog", () => {
  it("builds usd checkout quotes for priced services", () => {
    expect(buildUsdQuoteForService("single")).toEqual({
      amount: 53,
      currency: "USD",
      orderName: "한 과목 패스",
    });
  });

  it("builds usd checkout quotes for textbooks", () => {
    expect(buildUsdQuoteForTextbook("AP Biology")).toEqual({
      amount: 29,
      currency: "USD",
      orderName: "AP Biology",
    });
  });

  it("infers legacy krw orders separately from usd orders", () => {
    expect(inferStoredOrderCurrency("single", 79000)).toBe("KRW");
    expect(inferStoredOrderCurrency("single", 53)).toBe("USD");
    expect(inferStoredOrderCurrency("textbook:ap-biology", 39000)).toBe("KRW");
    expect(inferStoredOrderCurrency("textbook:ap-biology", 29)).toBe("USD");
  });
});
