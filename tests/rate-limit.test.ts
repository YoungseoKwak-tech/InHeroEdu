import { afterEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit, resetRateLimitBuckets } from "@/lib/rate-limit";

const requireAdminUserMock = vi.fn();
const fromMock = vi.fn();
const selectMock = vi.fn();
const eqMock = vi.fn();
const singleMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  requireAdminUser: (...args: unknown[]) => requireAdminUserMock(...args),
}));

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
  }),
}));

vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    messages = {
      create: vi.fn().mockResolvedValue({
        content: [{ type: "text", text: "[]" }],
      }),
    };
  },
}));

describe("rate limit helper", () => {
  afterEach(() => {
    resetRateLimitBuckets();
  });

  it("blocks requests after the configured limit within a window", () => {
    const now = 1_000;

    expect(checkRateLimit("scope", "user-1", 2, 60_000, now).allowed).toBe(true);
    expect(checkRateLimit("scope", "user-1", 2, 60_000, now + 1).allowed).toBe(true);

    const blocked = checkRateLimit("scope", "user-1", 2, 60_000, now + 2);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("resets after the window expires", () => {
    const now = 1_000;

    checkRateLimit("scope", "user-1", 1, 1_000, now);
    const allowedAgain = checkRateLimit("scope", "user-1", 1, 1_000, now + 1_001);

    expect(allowedAgain.allowed).toBe(true);
  });
});

describe("admin analyze route", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    resetRateLimitBuckets();
  });

  it("returns 429 when the analyze endpoint is called too often", async () => {
    requireAdminUserMock.mockResolvedValue({ id: "admin-1", email: "owner@example.com" });

    selectMock.mockReturnValue({ eq: eqMock });
    eqMock.mockReturnValue({ single: singleMock });
    singleMock.mockResolvedValue({
      data: { id: "material-1", raw_text: "study text" },
      error: null,
    });

    fromMock.mockImplementation((table: string) => {
      if (table === "source_materials") {
        return {
          select: selectMock,
          update: vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) }),
        };
      }

      if (table === "questions") {
        return {
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockResolvedValue({ data: [], error: null }),
          }),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    });

    const { POST } = await import("@/app/api/admin/analyze-material/route");

    const makeReq = () =>
      new Request("http://localhost/api/admin/analyze-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialId: "material-1", subject: "ap-biology", count: 1 }),
      });

    for (let i = 0; i < 5; i++) {
      const res = await POST(makeReq() as never);
      expect(res.status).toBe(200);
    }

    const blocked = await POST(makeReq() as never);
    const body = await blocked.json();

    expect(blocked.status).toBe(429);
    expect(body.error).toBe("rate limit exceeded");
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });
});
