import { redirect } from "next/navigation";

export default function ChatRedirect({ params }: { params: { slug: string } }) {
  redirect(`/lounges/${params.slug}`);
}
