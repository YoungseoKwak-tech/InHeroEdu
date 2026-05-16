import { redirect } from "next/navigation";

interface Props {
  searchParams?: {
    redirect?: string;
  };
}

export default function AuthSignupPage({ searchParams }: Props) {
  const next = typeof searchParams?.redirect === "string" ? `?mode=signup&redirect=${encodeURIComponent(searchParams.redirect)}` : "?mode=signup";
  redirect(`/auth/login${next}`);
}
