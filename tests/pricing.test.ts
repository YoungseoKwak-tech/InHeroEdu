import { describe, expect, it } from "vitest";
import { findPricingItem } from "@/lib/pricing";

describe("pricing", () => {
  it("includes AI plans in the server-side pricing map", () => {
    expect(findPricingItem("ai_strategy")).toEqual({
      amount: 99000,
      orderName: "Strategy",
    });
  });
});
