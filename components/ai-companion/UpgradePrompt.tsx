import Link from "next/link";

interface UpgradePromptProps {
  kind: "limit" | "locked" | "fallback";
  feature?: string;
  freeCount?: number;
}

export default function UpgradePrompt({ kind, feature = "this feature", freeCount }: UpgradePromptProps) {
  const isLimit = kind === "limit";

  return (
    <div className="mt-3 rounded-xl border border-primary-500/25 bg-primary-500/8 p-4">
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none mt-0.5">{isLimit ? "⚡" : "🔒"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {isLimit
              ? `Your free access for ${feature} has ended`
              : `${feature} is opening to early users`}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
            {isLimit
              ? `You've used your ${freeCount ? `${freeCount} free` : "free"} ${freeCount === 1 ? "use" : "uses"}. Upgrade to keep the conversation going — unlimited access to all AI features.`
              : "You've seen the first layer. Upgrade to unlock the full system."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-600"
            >
              See Plans — Unlock Full Access →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
