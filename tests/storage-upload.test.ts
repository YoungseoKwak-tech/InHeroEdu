import { afterEach, describe, expect, it } from "vitest";
import { formatStorageUploadLimit, getStorageUploadLimitBytes } from "@/lib/storageUpload";

describe("storage upload config", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_STORAGE_UPLOAD_LIMIT_BYTES;
  });

  it("defaults to 9GB when no env override is present", () => {
    expect(getStorageUploadLimitBytes()).toBe(9 * 1024 * 1024 * 1024);
    expect(formatStorageUploadLimit()).toBe("9GB");
  });

  it("supports env overrides", () => {
    process.env.NEXT_PUBLIC_STORAGE_UPLOAD_LIMIT_BYTES = String(2 * 1024 * 1024 * 1024);

    expect(getStorageUploadLimitBytes()).toBe(2 * 1024 * 1024 * 1024);
    expect(formatStorageUploadLimit()).toBe("2GB");
  });
});
