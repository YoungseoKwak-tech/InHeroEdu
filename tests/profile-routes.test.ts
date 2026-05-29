import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthenticatedUserMock = vi.fn();
const requireAdminUserMock = vi.fn();
const upsertMock = vi.fn();
const eqMock = vi.fn();
const singleMock = vi.fn();
const orderMock = vi.fn();
const inMock = vi.fn();
const listUsersMock = vi.fn();
const fromMock = vi.fn();

function emptyListQuery() {
  const result = { data: [], error: null };
  return {
    order: vi.fn(async () => result),
    then: (onFulfilled: (value: typeof result) => unknown, onRejected?: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(onFulfilled, onRejected),
  };
}

vi.mock("@/lib/auth", () => ({
  requireAuthenticatedUser: (...args: unknown[]) => requireAuthenticatedUserMock(...args),
  requireAdminUser: (...args: unknown[]) => requireAdminUserMock(...args),
}));

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
    auth: {
      admin: {
        listUsers: listUsersMock,
      },
    },
  }),
}));

describe("profile routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    upsertMock.mockResolvedValue({ error: null });
    singleMock.mockResolvedValue({ data: null, error: null });
    orderMock.mockResolvedValue({ data: [], error: null });
    inMock.mockImplementation(() => emptyListQuery());
    eqMock.mockReturnValue({
      single: singleMock,
      order: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
    });
    fromMock.mockImplementation((table: string) => {
      if (table === "profiles") {
        return {
          upsert: upsertMock,
          select: vi.fn().mockReturnValue({ eq: eqMock, in: inMock }),
        };
      }

      return {
        select: vi.fn().mockReturnValue({ eq: eqMock, in: inMock }),
      };
    });
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("profile sync stores the authenticated user's profile fields", async () => {
    requireAuthenticatedUserMock.mockResolvedValue({ id: "user-1", email: "student@example.com" });

    const { POST } = await import("@/app/api/profile/route");
    const req = new Request("http://localhost/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "  Nova Kim  ",
        grade: "  11학년 ",
        school: "  Seoul Science High School ",
      }),
    });

    const res = await POST(req as never);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(upsertMock).toHaveBeenCalledWith(
      {
        id: "user-1",
        name: "Nova Kim",
        grade: "11학년",
        school: "Seoul Science High School",
        referral_student_email: null,
      },
      { onConflict: "id" }
    );
    expect(body.profile).toEqual({
      name: "Nova Kim",
      grade: "11학년",
      school: "Seoul Science High School",
      referral_student_email: null,
    });
  });

  it("admin students falls back to auth metadata when the profile row is missing", async () => {
    requireAdminUserMock.mockResolvedValue({ id: "admin-1", email: "owner@example.com" });
    listUsersMock.mockResolvedValue({
      data: {
        users: [
          {
            id: "user-1",
            email: "student@example.com",
            created_at: "2026-04-16T00:00:00.000Z",
            last_sign_in_at: "2026-04-16T01:00:00.000Z",
            user_metadata: {
              name: "Student Kim",
              grade: "12학년",
              school: "Cornell Prep",
            },
          },
        ],
      },
    });

    const { GET } = await import("@/app/api/admin/students/route");
    const req = new Request("http://localhost/api/admin/students");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.students[0].profile).toEqual({
      name: "Student Kim",
      grade: "12학년",
      school: "Cornell Prep",
      referral_student_email: null,
    });
  });
});
