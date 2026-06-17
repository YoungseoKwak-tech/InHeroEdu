import type { ReactNode } from "react";
import LiveActivityToast from "@/components/social/LiveActivityToast";

/**
 * Parent portal layout. Mounts the live-activity toast across every /parents
 * page so the portal always reads as actively in use (live social gravity).
 */
export default function ParentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LiveActivityToast />
    </>
  );
}
