import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthenticatedUserMock = vi.fn();
const fromMock = vi.fn();

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

const loungeRow = { id: "lounge-1", slug: "ap-bio", name: "AP Biology Lounge" };
const profiles = [
  { user_id: "user-1", display_handle: "cornellian" },
  { user_id: "user-2", display_handle: "yeongseo0802" },
];

const resourceRows = [
  {
    id: "resource-1",
    chat_message_id: "chat-1",
    lounge_id: "lounge-1",
    author_id: "user-1",
    folder_type: "notes",
    title: "Transport Across Cell Membrane.pdf",
    description: null,
    attachment_url: "https://storage.local/one.pdf",
    attachment_meta: { fileName: "one.pdf", mimeType: "application/pdf", group: "notes" },
    file_name: "one.pdf",
    file_size: 15684,
    mime_type: "application/pdf",
    is_inhero_official: false,
    is_seeded: false,
    download_count: 0,
    upvote_count: 0,
    comment_count: 0,
    created_at: "2026-05-16T00:02:00.000Z",
  },
];

const chatRows = [
  {
    id: "chat-1",
    context_id: "lounge-1",
    author_id: "user-1",
    content: "mirrored upload",
    attachment_url: "https://storage.local/one.pdf",
    attachment_meta: {
      fileName: "one.pdf",
      mimeType: "application/pdf",
      group: "notes",
      resourceId: "resource-1",
      isInheroOfficial: false,
    },
    created_at: "2026-05-16T00:02:00.000Z",
  },
  {
    id: "chat-2",
    context_id: "lounge-1",
    author_id: "user-2",
    content: "fallback upload",
    attachment_url: "https://storage.local/two.pdf",
    attachment_meta: {
      fileName: "two.pdf",
      mimeType: "application/pdf",
      group: "notes",
      isInheroOfficial: false,
    },
    created_at: "2026-05-16T00:01:00.000Z",
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  requireAuthenticatedUserMock.mockResolvedValue({
    id: "user-1",
    email: "student@example.com",
  });

  fromMock.mockImplementation((table: string) => {
    if (table === "lounge_resources") {
      return {
        select: vi.fn(() => chainFor({ data: resourceRows, error: null })),
      };
    }

    if (table === "chat_messages") {
      return {
        select: vi.fn(() => chainFor({ data: chatRows, error: null })),
      };
    }

    if (table === "lounges") {
      return {
        select: vi.fn(() => chainFor({ data: [loungeRow], error: null })),
      };
    }

    if (table === "profiles_public") {
      return {
        select: vi.fn(() => chainFor({ data: profiles, error: null })),
      };
    }

    throw new Error(`Unexpected table: ${table}`);
  });
});

describe("library feed", () => {
  it("includes attachment posts that only exist in chat_messages", async () => {
    const { GET } = await import("@/app/api/library/feed/route");
    const req = new Request("http://localhost/api/library/feed?sort=new&limit=24");

    const res = await GET(req as never);
    const body = await res.json() as { items: Array<{ id: string; title: string; author?: { handle: string } | null }>; nextCursor: string | null };

    expect(res.status).toBe(200);
    expect(body.items.map((item) => item.id)).toEqual(["resource-1", "chat-2"]);
    expect(body.items[0]).toMatchObject({
      id: "resource-1",
      title: "Transport Across Cell Membrane.pdf",
      author: { handle: "cornellian" },
    });
    expect(body.items[1]).toMatchObject({
      id: "chat-2",
      title: "fallback upload",
      author: { handle: "yeongseo0802" },
    });
    expect(body.nextCursor).toBeNull();
  });
});
