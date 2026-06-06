"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { getClientSession } from "@/lib/client-auth";

interface Props {
  defaultMode: "login" | "signup";
  redirectTo: string;
}

export default function AuthEntryClient({ defaultMode, redirectTo }: Props) {
  const router = useRouter();
  const safeRedirect = useMemo(() => {
    return getSafeRedirectPath(redirectTo, "/my-plan");
  }, [redirectTo]);

  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        router.replace(safeRedirect);
      }
    });
  }, [router, safeRedirect]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <AuthModal
        isOpen
        onClose={() => router.replace(safeRedirect)}
        defaultMode={defaultMode}
        redirectTo={safeRedirect}
      />
    </div>
  );
}
