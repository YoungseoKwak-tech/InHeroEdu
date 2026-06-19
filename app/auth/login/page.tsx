import type { Metadata } from "next";
import AuthEntryClient from "@/components/auth/AuthEntryClient";
import { getSafeRedirectPath } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in or create your InHero account.",
};

interface Props {
  searchParams?: {
    redirect?: string;
    mode?: string;
  };
}

export default function AuthLoginPage({ searchParams }: Props) {
  const defaultMode = searchParams?.mode === "signup" ? "signup" : "login";
  const redirectTo = getSafeRedirectPath(searchParams?.redirect);

  return <AuthEntryClient defaultMode={defaultMode} redirectTo={redirectTo} />;
}
