import TextbookLoading from "@/components/textbooks/TextbookLoading";

// Shown instantly while the force-dynamic reader page loads the chapter +
// proxies its PDF. Without this the screen freezes on the previous page.
export default function Loading() {
  return <TextbookLoading message="교재를 불러오는 중이에요…" hint="페이지를 준비하고 있어요 · 잠시만요" />;
}
