"use client";

/**
 * PreviewClient — mounts SectionLessonPlayer for an unauthenticated viewer,
 * mints an anonymous attribution cookie on first visit, and shows the
 * SoftWall when the lesson reaches its natural completion.
 *
 * The /preview/[slug] route is gated on lessons.public_preview = true.
 * Everything inside this component is intentionally signed-out-friendly:
 * the player itself runs identically to its authenticated counterpart, but
 * authFetch calls fall through to anonymous endpoints (or to no-ops where
 * a server-side write would require a user).
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlaylistItem } from "@/lib/buildPlaylist";
import SoftWall from "@/components/preview/SoftWall";
import { getOrCreateAnonId } from "@/lib/anonSession";

// Match the existing dynamic import pattern from SectionLessonGate — keeps
// the SSR bundle thin and avoids "use client" double-loads.
const SectionLessonPlayer = dynamic(
  () => import("@/components/lesson/SectionLessonPlayer"),
  { ssr: false }
);

interface Props {
  lessonId: string;
  lessonTitle: string;
  playlist: PlaylistItem[];
  /** Path to return to after OAuth completes; usually current pathname. */
  continueHref: string;
}

export default function PreviewClient({ lessonId, lessonTitle, playlist, continueHref }: Props) {
  const [showWall, setShowWall] = useState(false);

  // Mint the anonymous attribution cookie on first paint. Re-runs are safe;
  // the helper short-circuits when a cookie already exists.
  useEffect(() => {
    getOrCreateAnonId();
  }, []);

  return (
    <>
      <SectionLessonPlayer
        playlist={playlist}
        lessonId={lessonId}
        onComplete={() => setShowWall(true)}
      />
      <SoftWall
        open={showWall}
        lessonTitle={lessonTitle}
        continueHref={continueHref}
        onDismiss={() => setShowWall(false)}
      />
    </>
  );
}
