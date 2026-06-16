import Link from "next/link";
import { aiDisclosure } from "@/lib/legal";

/**
 * AiContentNotice — small, consistent "this study material is AI-generated"
 * disclosure shown on textbook (Originals) and Korean core-notes surfaces.
 * Links to the full /ai-disclosure page. Renders light by default; pass
 * `tone="dark"` on dark backgrounds.
 */
export default function AiContentNotice({
  tone = "light",
  style,
}: {
  tone?: "light" | "dark";
  style?: React.CSSProperties;
}) {
  const dark = tone === "dark";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        fontSize: 12.5,
        lineHeight: 1.6,
        borderRadius: 10,
        padding: "9px 12px",
        border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "#e6e8ec"}`,
        background: dark ? "rgba(255,255,255,0.04)" : "#f7f8fa",
        color: dark ? "rgba(255,255,255,0.6)" : "#64748b",
        ...style,
      }}
    >
      <span style={{ flexShrink: 0 }}>🤖</span>
      <span>
        {aiDisclosure.inline}{" "}
        <Link
          href="/ai-disclosure"
          style={{ color: dark ? "#7DD3FC" : "#047a45", textDecoration: "underline", fontWeight: 600 }}
        >
          AI 생성 콘텐츠 안내
        </Link>
      </span>
    </div>
  );
}
