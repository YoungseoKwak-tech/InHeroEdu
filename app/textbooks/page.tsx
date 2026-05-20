// /textbooks → /library
//
// The textbook catalog was merged into /library as a left sidebar
// (OriginalsSidebar). This index now redirects so existing links +
// the old TEXTBOOKS nav entry still land somewhere useful.
//
// The per-subject reader at /textbooks/[subjectId] is unaffected.
// The previous index page is preserved as page.legacy.tsx.bak.

import { redirect } from "next/navigation";

export default function TextbooksIndexRedirect(): never {
  redirect("/library");
}
