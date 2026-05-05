import WaitlistClient from "@/components/waitlist/WaitlistClient";

export default function WaitlistPage({
  searchParams,
}: {
  searchParams?: { source?: string };
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-20">
      <WaitlistClient source={searchParams?.source ?? "ai_feature"} />
    </div>
  );
}
