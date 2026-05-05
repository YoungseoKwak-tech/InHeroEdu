import { afterEach, describe, expect, it, vi } from "vitest";

const getUserMock = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    auth: {
      getUser: getUserMock,
    },
  }),
}));

describe("auth guards", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete process.env.ADMIN_EMAILS;
  });

  it("rejects unauthenticated requests", async () => {
    const { requireAuthenticatedUser } = await import("@/lib/auth");

    const result = await requireAuthenticatedUser(new Request("http://localhost/api/test"));

    expect(result).toBeInstanceOf(Response);
    expect((result as Response).status).toBe(401);
    expect(getUserMock).not.toHaveBeenCalled();
  });

  it("accepts authenticated requests and returns the user", async () => {
    getUserMock.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
    });

    const { requireAuthenticatedUser } = await import("@/lib/auth");
    const req = new Request("http://localhost/api/test", {
      headers: { Authorization: "Bearer token-123" },
    });

    const result = await requireAuthenticatedUser(req);

    expect(result).toEqual({ id: "user-1", email: "student@example.com" });
    expect(getUserMock).toHaveBeenCalledWith("token-123");
  });

  it("rejects non-admin users for admin routes", async () => {
    process.env.ADMIN_EMAILS = "admin@example.com";
    getUserMock.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
    });

    const { requireAdminUser } = await import("@/lib/auth");
    const req = new Request("http://localhost/api/admin/test", {
      headers: { Authorization: "Bearer token-123" },
    });

    const result = await requireAdminUser(req);

    expect(result).toBeInstanceOf(Response);
    expect((result as Response).status).toBe(403);
  });

  it("accepts configured admin emails", async () => {
    process.env.ADMIN_EMAILS = "admin@example.com,owner@example.com";
    getUserMock.mockResolvedValue({
      data: { user: { id: "admin-1", email: "owner@example.com" } },
    });

    const { requireAdminUser } = await import("@/lib/auth");
    const req = new Request("http://localhost/api/admin/test", {
      headers: { Authorization: "Bearer token-123" },
    });

    const result = await requireAdminUser(req);

    expect(result).toEqual({ id: "admin-1", email: "owner@example.com" });
  });

  it("accepts admin role claims from app metadata", async () => {
    getUserMock.mockResolvedValue({
      data: {
        user: {
          id: "admin-2",
          email: "student@example.com",
          app_metadata: { role: "admin" },
          user_metadata: {},
        },
      },
    });

    const { requireAdminUser } = await import("@/lib/auth");
    const req = new Request("http://localhost/api/admin/test", {
      headers: { Authorization: "Bearer token-123" },
    });

    const result = await requireAdminUser(req);

    expect(result).toEqual({ id: "admin-2", email: "student@example.com" });
  });

  it("accepts is_admin boolean claims", async () => {
    getUserMock.mockResolvedValue({
      data: {
        user: {
          id: "admin-3",
          email: "student@example.com",
          app_metadata: {},
          user_metadata: { is_admin: true },
        },
      },
    });

    const { requireAdminUser } = await import("@/lib/auth");
    const req = new Request("http://localhost/api/admin/test", {
      headers: { Authorization: "Bearer token-123" },
    });

    const result = await requireAdminUser(req);

    expect(result).toEqual({ id: "admin-3", email: "student@example.com" });
  });
});
