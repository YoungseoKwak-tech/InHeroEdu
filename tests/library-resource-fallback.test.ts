import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthenticatedUserMock = vi.fn();
const fromMock = vi.fn();
const fetchMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  requireAuthenticatedUser: (...args: unknown[]) => requireAuthenticatedUserMock(...args),
}));

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
  }),
}));

function chainFor(result: unknown) {
  const chain: Record<string, unknown> = {};
  const passthrough = () => chain;
  Object.assign(chain, {
    select: vi.fn(passthrough),
    eq: vi.fn(passthrough),
    is: vi.fn(passthrough),
    in: vi.fn(passthrough),
    order: vi.fn(passthrough),
    limit: vi.fn(passthrough),
    gte: vi.fn(passthrough),
    gt: vi.fn(passthrough),
    or: vi.fn(passthrough),
    maybeSingle: vi.fn(async () => result),
    single: vi.fn(async () => result),
    then: (onFulfilled: (value: unknown) => unknown, onRejected?: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(onFulfilled, onRejected),
  });
  return chain;
}

const loungeRow = { id: "lounge-1", slug: "ap-biology", name: "AP Biology Lounge" };
const profileRow = { user_id: "user-1", display_handle: "studier" };
const fallbackMessage = {
  id: "chat-1",
  context_id: "lounge-1",
  author_id: "user-1",
  content: "Cell membrane notes",
  attachment_url: "https://storage.local/file.pdf",
  attachment_meta: {
    fileName: "notes.pdf",
    mimeType: "application/pdf",
    group: "notes",
  },
  created_at: "2026-05-16T00:00:00.000Z",
};

beforeEach(() => {
  vi.clearAllMocks();
  requireAuthenticatedUserMock.mockResolvedValue({
    id: "user-1",
    email: "student@example.com",
  });

  fromMock.mockImplementation((table: string) => {
    if (table === "lounge_resources") {
      return {
        select: vi.fn(() => chainFor({ data: null, error: null })),
      };
    }

    if (table === "chat_messages") {
      return {
        select: vi.fn(() => chainFor({ data: fallbackMessage, error: null })),
      };
    }

    if (table === "lounges") {
      return {
        select: vi.fn(() => chainFor({ data: loungeRow, error: null })),
      };
    }

    if (table === "profiles_public") {
      return {
        select: vi.fn(() => chainFor({ data: profileRow, error: null })),
      };
    }

    throw new Error(`Unexpected table: ${table}`);
  });

  fetchMock.mockResolvedValue(new Response("PDFDATA", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("library fallback", () => {
  it("resolves a library resource from the chat message id when lounge_resources is empty", async () => {
    const { GET } = await import("@/app/api/library/resource/[id]/route");
    const req = new Request("http://localhost/api/library/resource/chat-1");

    const res = await GET(req as never, { params: { id: "chat-1" } } as never);
    const body = await res.json() as { resource?: { id: string; folder: string; isPdf: boolean; author?: { handle: string } | null } };

    expect(res.status).toBe(200);
    expect(body.resource).toMatchObject({
      id: "chat-1",
      folder: "notes",
      isPdf: true,
      author: { handle: "studier" },
    });
  });

  it("streams the attachment bytes from the chat message id fallback", async () => {
    const { GET } = await import("@/app/api/library/resource/[id]/file/route");
    const req = new Request("http://localhost/api/library/resource/chat-1/file");

    const res = await GET(req as never, { params: { id: "chat-1" } } as never);

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toContain('notes.pdf');
    expect(await res.text()).toBe("PDFDATA");
  });
});
