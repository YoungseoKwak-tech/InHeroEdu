import type { ReactNode } from "react";

/**
 * Parent portal layout. (The fabricated "…님이 …결제하셨습니다" live-activity
 * toast was removed — it manufactured fake purchase notifications.)
 */
export default function ParentsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
