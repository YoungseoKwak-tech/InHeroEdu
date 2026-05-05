import { describe, expect, it } from "vitest";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";

describe("textbook products", () => {
  it("hides test and demo manuals from the public catalog", () => {
    expect(
      isPublicTextbookProduct({
        subject_id: "ap-biology-test",
        title: "AP Biology Test Manual",
        pdf_url: "https://example.com/test.pdf",
        status: "available",
      })
    ).toBe(false);
  });

  it("keeps real manuals visible", () => {
    expect(
      isPublicTextbookProduct({
        subject_id: "ap-chemistry",
        title: "AP Chemistry Field Manual",
        pdf_url: "https://example.com/chem.pdf",
        status: "available",
      })
    ).toBe(true);
  });
});
