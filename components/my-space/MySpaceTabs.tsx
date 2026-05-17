"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { key: "saved", label: "Saved", href: "/my-space/saved" },
  { key: "liked", label: "Liked", href: "/my-space/liked" },
  { key: "for-you", label: "For You", href: "/my-space/for-you", glyph: "✨" },
] as const;

export default function MySpaceTabs() {
  const pathname = usePathname() ?? "";
  // Highlight by prefix match so deep links inside a tab still light up.
  const activeKey =
    TABS.find((t) => pathname === t.href || pathname.startsWith(`${t.href}/`))?.key ?? "saved";

  return (
    <nav className="mst" aria-label="My Space sections">
      {TABS.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`mst-tab ${activeKey === t.key ? "is-active" : ""}`}
          aria-current={activeKey === t.key ? "page" : undefined}
        >
          {"glyph" in t && t.glyph && (
            <span className="mst-glyph" aria-hidden="true">
              {t.glyph}
            </span>
          )}
          <span>{t.label}</span>
        </Link>
      ))}
      <style jsx>{`
        .mst {
          display: inline-flex;
          gap: 0.25rem;
          padding: 0.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 999px;
        }
        .mst-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          padding: 0.55rem 1rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 999px;
          color: rgba(148, 163, 184, 0.85);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s, border-color 0.15s;
        }
        .mst-tab:hover {
          color: #f3f3fb;
          border-color: rgba(94, 234, 212, 0.3);
        }
        .mst-tab.is-active {
          color: #0a0a10;
          background: #5eead4;
          border-color: #5eead4;
        }
        .mst-glyph {
          font-size: 0.86rem;
        }
      `}</style>
    </nav>
  );
}
