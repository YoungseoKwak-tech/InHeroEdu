"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";
import { createBrowserClient } from "@/lib/supabase";

interface Props {
  defaultMode: "login" | "signup";
  redirectTo: string;
}

export default function AuthEntryClient({ defaultMode, redirectTo }: Props) {
  const router = useRouter();
  const safeRedirect = useMemo(() => {
    if (!redirectTo.startsWith("/")) return "/";
    return redirectTo;
  }, [redirectTo]);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
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
