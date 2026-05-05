import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextResponse } from "next/server";

const requireAuthenticatedUserMock = vi.fn();
const requireAdminUserMock = vi.fn();
const requestDataDeletionMock = vi.fn();
const exportUserDataMock = vi.fn();
const getLivingPortraitMock = vi.fn();
const compressSessionMock = vi.fn();
const fromMock = vi.fn();
const selectMock = vi.fn();
const eqMock = vi.fn();
const orderMock = vi.fn();
const singleMock = vi.fn();
const upsertMock = vi.fn();
const insertMock = vi.fn();
const inMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  requireAuthenticatedUser: (...args: unknown[]) => requireAuthenticatedUserMock(...args),
  requireAdminUser: (...args: unknown[]) => requireAdminUserMock(...args),
}));

vi.mock("@/app/lib/privacyCompliance", () => ({
  requestDataDeletion: (...args: unknown[]) => requestDataDeletionMock(...args),
  exportUserData: (...args: unknown[]) => exportUserDataMock(...args),
}));

vi.mock("@/lib/memory", () => ({
  getLivingPortrait: (...args: unknown[]) => getLivingPortraitMock(...args),
  compressSession: (...args: unknown[]) => compressSessionMock(...args),
}));

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
  }),
}));

describe("route authorization regressions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    selectMock.mockReturnValue({ eq: eqMock });
    eqMock.mockReturnValue({ order: orderMock });
    orderMock.mockResolvedValue({ data: [{ id: "e1" }], error: null });
    singleMock.mockResolvedValue({ data: { points: 5, total_earned: 10 }, error: null });
    upsertMock.mockResolvedValue({ error: null });
    insertMock.mockResolvedValue({ error: null });
    inMock.mockResolvedValue({ data: [{ card_id: "card-1", status: "know" }], error: null });
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("privacy delete uses the authenticated user id", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });
    requestDataDeletionMock.mockResolvedValue({ success: true });

    const { DELETE } = await import("@/app/api/privacy/delete/route");
    const req = new Request("http://localhost/api/privacy/delete", {
      method: "DELETE",
      body: JSON.stringify({ userId: "attacker-id" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await DELETE(req);
    const body = await res.json();

    expect(requestDataDeletionMock).toHaveBeenCalledWith("user-1");
    expect(body.success).toBe(true);
  });

  it("privacy export uses the authenticated user id", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });
    exportUserDataMock.mockResolvedValue({ exported_at: "now" });

    const { POST } = await import("@/app/api/privacy/export/route");
    const req = new Request("http://localhost/api/privacy/export", {
      method: "POST",
    });

    const res = await POST(req);
    const body = await res.json();

    expect(exportUserDataMock).toHaveBeenCalledWith("user-1");
    expect(body.exported_at).toBe("now");
  });

  it("memory portrait ignores caller-supplied ids and uses the session user", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });
    getLivingPortraitMock.mockResolvedValue({ heroCode: "CF-1" });

    const { GET } = await import("@/app/api/memory/portrait/route");
    const req = new Request("http://localhost/api/memory/portrait?userId=attacker-id");

    const res = await GET(req as never);
    const body = await res.json();

    expect(getLivingPortraitMock).toHaveBeenCalledWith("user-1");
    expect(body.portrait).toEqual({ heroCode: "CF-1" });
  });

  it("memory evolution filters by the authenticated user id", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });
    fromMock.mockImplementation((table: string) => {
      if (table !== "evolution_log") throw new Error(`Unexpected table: ${table}`);
      return { select: selectMock };
    });

    const { GET } = await import("@/app/api/memory/evolution/route");
    const req = new Request("http://localhost/api/memory/evolution?userId=attacker-id");

    const res = await GET(req as never);
    const body = await res.json();

    expect(eqMock).toHaveBeenCalledWith("user_id", "user-1");
    expect(body.evolution).toEqual([{ id: "e1" }]);
  });

  it("admin question routes reject non-admin callers before touching the database", async () => {
    requireAdminUserMock.mockResolvedValue(NextResponse.json({ error: "forbidden" }, { status: 403 }));

    const { GET } = await import("@/app/api/admin/questions/route");
    const req = new Request("http://localhost/api/admin/questions");

    const res = await GET(req as never);

    expect(res.status).toBe(403);
    expect(fromMock).not.toHaveBeenCalled();
  });

  it("points POST ignores caller-supplied user ids and writes for the session user", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });

    fromMock.mockImplementation((table: string) => {
      if (table === "user_points") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: singleMock,
            }),
          }),
          upsert: upsertMock,
        };
      }

      if (table === "point_history") {
        return { insert: insertMock };
      }

      throw new Error(`Unexpected table: ${table}`);
    });

    const { POST } = await import("@/app/api/points/route");
    const req = new Request("http://localhost/api/points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "attacker-id",
        nickname: "Nova",
        action: "lesson_complete",
        points: 3,
      }),
    });

    const res = await POST(req as never);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        nickname: "Nova",
      }),
      { onConflict: "user_id" }
    );
    expect(insertMock).toHaveBeenCalledWith({
      user_id: "user-1",
      action: "lesson_complete",
      points: 3,
    });
    expect(body.success).toBe(true);
  });

  it("flashcards progress GET filters by the authenticated user id", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });

    fromMock.mockImplementation((table: string) => {
      if (table === "flashcards") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: [{ id: "card-1" }], error: null }),
          }),
        };
      }

      if (table === "flashcard_progress") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              in: inMock,
            }),
          }),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    });

    const { GET } = await import("@/app/api/flashcards/progress/route");
    const req = new Request("http://localhost/api/flashcards/progress?userId=attacker-id&setId=set-1");

    const res = await GET(req as never);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.progress).toEqual([{ card_id: "card-1", status: "know" }]);
  });

  it("flashcards progress POST writes for the authenticated user only", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });

    fromMock.mockImplementation((table: string) => {
      if (table !== "flashcard_progress") throw new Error(`Unexpected table: ${table}`);
      return {
        upsert: upsertMock,
      };
    });

    const { POST } = await import("@/app/api/flashcards/progress/route");
    const req = new Request("http://localhost/api/flashcards/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "attacker-id",
        cardId: "card-1",
        status: "know",
      }),
    });

    const res = await POST(req as never);

    expect(res.status).toBe(200);
    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        card_id: "card-1",
        status: "know",
      }),
      { onConflict: "user_id,card_id" }
    );
  });

  it("memory compress ignores caller-supplied user ids and uses the session user", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });
    compressSessionMock.mockResolvedValue(undefined);

    const { POST } = await import("@/app/api/memory/compress/route");
    const req = new Request("http://localhost/api/memory/compress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "attacker-id",
        sessionId: "session-1",
        subject: "ap-biology",
        durationMin: 15,
        rawSummary: "summary text",
      }),
    });

    const res = await POST(req as never);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(compressSessionMock).toHaveBeenCalledWith({
      userId: "user-1",
      sessionId: "session-1",
      subject: "ap-biology",
      durationMin: 15,
      rawSummary: "summary text",
    });
    expect(body.ok).toBe(true);
  });
});
