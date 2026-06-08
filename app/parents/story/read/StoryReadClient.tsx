"use client";

/**
 * Access guard for the 합격 수기 reader. The reader must NOT be readable just by
 * knowing the URL — entry requires being signed in AND having unlocked the book
 * (200 credits, key res:/parents/story). Otherwise we bounce back to the landing
 * page (which shows the login / paywall flow). Unlock state lives client-side
 * (localStorage), so this check has to run on the client.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PdfReader from "@/app/library/[resourceId]/read/PdfReader";
import { getClientSession } from "@/lib/client-auth";
import { isUnlocked } from "@/lib/credits";

const READ_KEY = "res:/parents/story";

export default function StoryReadClient() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await getClientSession().catch(() => null);
      const signedIn = !!session?.user;
      const owns = isUnlocked(READ_KEY);
      if (cancelled) return;
      if (signedIn && owns) {
        setAllowed(true);
        return;
      }
      // Not entitled → send back to the landing page. If not signed in, also pop
      // the auth modal there.
      setAllowed(false);
      if (!signedIn) {
        window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/story" } }));
      }
      router.replace("/parents/story");
    })();
    return () => { cancelled = true; };
  }, [router]);

  if (allowed !== true) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a14", color: "#94a3b8", fontSize: 14 }}>
        {allowed === null ? "확인 중…" : "접근 권한이 없어요. 책 페이지로 이동합니다…"}
      </div>
    );
  }

  return (
    <PdfReader
      source={{
        fileUrl: "/api/parents/story/file",
        title: "내가 아이비리그 공대에 오기까지",
        subtitle: "아이비리그 코넬 공대 자기주도로 간 사람의 이야기",
        eyebrow: "🎓 합격 수기",
        backHref: "/parents/story",
        closeHref: "/parents/story",
      }}
    />
  );
}
