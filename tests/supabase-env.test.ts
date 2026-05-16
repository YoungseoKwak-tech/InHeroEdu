import { describe, expect, it } from "vitest";
import { normalizeSupabaseEnvValue } from "@/lib/supabase";

describe("supabase env normalization", () => {
  it("removes escaped newlines and trims whitespace", () => {
    expect(
      normalizeSupabaseEnvValue(
        "  https://pxxdduhtnulwmseygojv.supabase.co\\n  ",
        "NEXT_PUBLIC_SUPABASE_URL"
      )
    ).toBe("https://pxxdduhtnulwmseygojv.supabase.co");
  });

  it("throws for missing values", () => {
    expect(() => normalizeSupabaseEnvValue("", "SUPABASE_SERVICE_ROLE_KEY")).toThrow(
      "Missing Supabase environment variable: SUPABASE_SERVICE_ROLE_KEY"
    );
  });
});
