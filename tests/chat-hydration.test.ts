import { describe, expect, it, vi } from "vitest";

const fromMock = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createAdminClient: () => ({
    from: fromMock,
  }),
}));

vi.mock("@/lib/mentors", () => ({
  loadMentorProfiles: async () => new Map(),
}));

describe("chat hydration", () => {
  it("uses attachment_meta.resourceId when the library mirror query is empty", async () => {
    fromMock.mockImplementation((table: string) => {
      if (table === "lounge_resources") {
        return {
          select: vi.fn(() => ({
            in: vi.fn(async () => ({ data: [], error: null })),
          })),
        };
      }

      if (table === "chat_reactions") {
        return {
          select: vi.fn(() => ({
            in: vi.fn(async () => ({ data: [], error: null })),
          })),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    });

    const { hydrateChatMessages } = await import("@/lib/chat");
    const [message] = await hydrateChatMessages(
      [
        {
          id: "chat-1",
          context_type: "lounge",
          context_id: "lounge-1",
          author_id: null,
          type: "file",
          content: "Cell membrane notes",
          reply_to_id: null,
          attachment_url: "https://storage.local/file.pdf",
          attachment_meta: {
            fileName: "notes.pdf",
            resourceId: "resource-abc",
          },
          drop_id: null,
          is_pinned: false,
          is_deleted: false,
          edited_at: null,
          created_at: "2026-05-16T00:00:00.000Z",
        },
      ],
      null
    );

    expect(message.attachment?.resourceId).toBe("resource-abc");
  });
});
