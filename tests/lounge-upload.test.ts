import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthenticatedUserMock = vi.fn();
const checkRateLimitMock = vi.fn();
const isAdminEmailMock = vi.fn();
const hydrateChatMessagesMock = vi.fn();
const fromMock = vi.fn();
const storageFromMock = vi.fn();
const chatMessageUpdateMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  requireAuthenticatedUser: (...args: unknown[]) => requireAuthenticatedUserMock(...args),
  isAdminEmail: (...args: unknown[]) => isAdminEmailMock(...args),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimitMock(...args),
}));

vi.mock("@/lib/chat", () => ({
  CHAT_RATE_LIMIT: 30,
  CHAT_RATE_WINDOW_MS: 60 * 1000,
  hydrateChatMessages: (...args: unknown[]) => hydrateChatMessagesMock(...args),
}));

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
    storage: {
      from: storageFromMock,
    },
  }),
}));

type TestState = {
  resourceInserted: boolean;
  resourceInsertPayload: Record<string, unknown> | null;
};

let state: TestState;

function makeThenableResult<T>(result: T) {
  const chain: Record<string, unknown> = {};
  const passthrough = () => chain;
  Object.assign(chain, {
    select: vi.fn(passthrough),
    eq: vi.fn(passthrough),
    gte: vi.fn(passthrough),
    in: vi.fn(passthrough),
    order: vi.fn(passthrough),
    limit: vi.fn(passthrough),
    maybeSingle: vi.fn(passthrough),
    single: vi.fn(passthrough),
    then: (onFulfilled: (value: T) => unknown, onRejected?: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(onFulfilled, onRejected),
  });
  return chain as typeof chain & PromiseLike<T>;
}

function buildHydratedMessage(row: {
  id: string;
  type: string;
  content: string | null;
  created_at: string;
  attachment_url: string | null;
  attachment_meta: Record<string, unknown> | null;
}) {
  return {
    id: row.id,
    type: row.type,
    content: row.content,
    createdAt: row.created_at,
    isPinned: false,
    isMine: true,
    author: null,
    replyTo: null,
    attachment: row.attachment_url
      ? {
          url: row.attachment_url,
          meta: row.attachment_meta ?? {},
          resourceId: state.resourceInserted ? "resource-123" : null,
        }
      : null,
    links: [],
    reactions: [],
  };
}

function setupSupabaseMock() {
  fromMock.mockImplementation((table: string) => {
    if (table === "profiles_public") {
      return makeThenableResult({ data: [{ user_id: "user-123" }], error: null });
    }

    if (table === "lounges") {
      return makeThenableResult({
        data: { id: "lounge-1", slug: "ap-biology", name: "AP Biology Lounge" },
        error: null,
      });
    }

    if (table === "chat_messages") {
      return {
        select: vi.fn(() => makeThenableResult({ data: [], error: null })),
        insert: vi.fn((payload: Record<string, unknown>) => {
          const insertedRow = {
            id: "chat-1",
            created_at: "2026-05-16T00:00:00.000Z",
            ...payload,
          };
          return {
            select: () => ({
              single: () => makeThenableResult({ data: insertedRow, error: null }),
            }),
          };
        }),
        update: vi.fn((payload: Record<string, unknown>) => ({
          eq: vi.fn(async () => {
            chatMessageUpdateMock(payload);
            return { data: null, error: null };
          }),
        })),
      };
    }

    if (table === "lounge_resources") {
      return {
        insert: vi.fn((payload: Record<string, unknown>) => {
          state.resourceInserted = true;
          state.resourceInsertPayload = payload;
          return {
            select: () => ({
              single: () =>
                Promise.resolve({
                  data: { id: "resource-123" },
                  error: null,
                }),
            }),
          };
        }),
      };
    }

    throw new Error(`Unexpected table: ${table}`);
  });

  storageFromMock.mockImplementation(() => ({
    upload: vi.fn(async () => ({ error: null })),
    uploadToSignedUrl: vi.fn(async () => ({ error: null })),
    list: vi.fn(async (_dir: string, opts?: { search?: string }) => ({
      data: opts?.search ? [{ name: opts.search }] : [],
      error: null,
    })),
    getPublicUrl: vi.fn((path: string) => ({
      data: { publicUrl: `https://storage.local/${path}` },
    })),
    createSignedUploadUrl: vi.fn(async (path: string) => ({
      data: {
        path,
        token: `token-${path}`,
        signedUrl: `https://signed.local/${path}`,
      },
      error: null,
    })),
  }));
}

beforeEach(() => {
  vi.clearAllMocks();
  state = {
    resourceInserted: false,
    resourceInsertPayload: null,
  };
  chatMessageUpdateMock.mockReset();

  requireAuthenticatedUserMock.mockResolvedValue({
    id: "user-123",
    email: "student@example.com",
  });
  checkRateLimitMock.mockReturnValue({ allowed: true, retryAfterSec: 0 });
  isAdminEmailMock.mockReturnValue(false);
  hydrateChatMessagesMock.mockImplementation(async (rows: Array<any>) =>
    rows.map((row) => buildHydratedMessage(row))
  );

  setupSupabaseMock();
});

afterEach(() => {
  vi.resetModules();
});

describe("lounge upload routing", () => {
  it("returns a library resource id from the finalize flow after the mirror insert", async () => {
    const { POST } = await import("@/app/api/lounges/[slug]/chat/upload/finalize/route");
    const req = {
      json: async () => ({
        path: "lounge/ap-biology/user-123-1715820000000-notes.pdf",
        fileName: "notes.pdf",
        fileSize: 15684,
        mimeType: "application/pdf",
        caption: "Cell membrane notes",
        group: "notes",
        replyToId: null,
      }),
    } as never;

    const res = await POST(req, { params: { slug: "ap-biology" } } as never);
    const body = await res.json() as { ok?: boolean; message?: { attachment?: { resourceId: string | null } } };

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.message?.attachment?.resourceId).toBe("resource-123");
    expect(state.resourceInserted).toBe(true);
    expect(chatMessageUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        attachment_meta: expect.objectContaining({
          resourceId: "resource-123",
        }),
      })
    );
    expect(state.resourceInsertPayload).toMatchObject({
      chat_message_id: "chat-1",
      lounge_id: "lounge-1",
      folder_type: "notes",
      title: "Cell membrane notes",
      attachment_url: "https://storage.local/lounge/ap-biology/user-123-1715820000000-notes.pdf",
      file_name: "notes.pdf",
      file_size: 15684,
      mime_type: "application/pdf",
      review_status: "approved",
    });
  });

  it("returns a library resource id from the multipart upload flow after the mirror insert", async () => {
    const { POST } = await import("@/app/api/lounges/[slug]/chat/upload/route");
    const file = new File([new Uint8Array([1, 2, 3])], "notes.pdf", {
      type: "application/pdf",
    });
    const form = new FormData();
    form.set("file", file);
    form.set("subject", "ap-biology");
    form.set("group", "notes");

    const req = {
      formData: async () => form,
    } as never;

    const res = await POST(req, { params: { slug: "ap-biology" } } as never);
    const body = await res.json() as { ok?: boolean; message?: { attachment?: { resourceId: string | null } } };

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.message?.attachment?.resourceId).toBe("resource-123");
    expect(state.resourceInserted).toBe(true);
    expect(chatMessageUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        attachment_meta: expect.objectContaining({
          resourceId: "resource-123",
        }),
      })
    );
    expect(state.resourceInsertPayload).toMatchObject({
      chat_message_id: "chat-1",
      lounge_id: "lounge-1",
      folder_type: "notes",
      file_name: "notes.pdf",
      file_size: file.size,
      mime_type: "application/pdf",
      review_status: "approved",
    });
  });

  it("guides users without a trajectory profile to onboarding", async () => {
    fromMock.mockImplementation((table: string) => {
      if (table === "profiles_public") {
        return {
          select: vi.fn(() => makeThenableResult({ data: [], error: null })),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    });

    const { POST } = await import("@/app/api/lounges/[slug]/chat/upload/sign/route");
    const req = {
      json: async () => ({
        fileName: "notes.pdf",
        fileSize: 15684,
        mimeType: "application/pdf",
      }),
    } as never;

    const res = await POST(req, { params: { slug: "ap-biology" } } as never);
    const body = await res.json() as { error?: string; code?: string; onboardingUrl?: string };

    expect(res.status).toBe(403);
    expect(body).toMatchObject({
      error: "Claim your trajectory handle before chatting.",
      code: "NO_PROFILE",
      onboardingUrl: "/onboarding",
    });
  });
});
