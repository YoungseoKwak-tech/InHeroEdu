import type { Metadata } from "next";
import AuthEntryClient from "@/components/auth/AuthEntryClient";

export const metadata: Metadata = {
  title: "Sign In | InHero",
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
  const redirectTo =
    typeof searchParams?.redirect === "string" && searchParams.redirect.startsWith("/")
      ? searchParams.redirect
      : "/dashboard";

  return <AuthEntryClient defaultMode={defaultMode} redirectTo={redirectTo} />;
}
