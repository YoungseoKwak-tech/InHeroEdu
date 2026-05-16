import TextbookReaderShell from "@/components/textbooks/TextbookReaderShell";

export default async function TextbookReaderPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;

  return <TextbookReaderShell subjectId={decodeURIComponent(subjectId)} />;
}

