import { redirect } from "next/navigation";
import { getSafeRedirectPath } from "@/lib/auth-redirect";

interface Props {
  searchParams?: {
    redirect?: string;
  };
}

export default function AuthSignupPage({ searchParams }: Props) {
  const next = typeof searchParams?.redirect === "string" ? `?mode=signup&redirect=${encodeURIComponent(getSafeRedirectPath(searchParams.redirect))}` : "?mode=signup";
  redirect(`/auth/login${next}`);
}
