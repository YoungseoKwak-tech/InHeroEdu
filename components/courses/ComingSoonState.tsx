import Link from "next/link";

interface ComingSoonStateProps {
  badge: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export default function ComingSoonState({
  badge,
  title,
  description,
  backHref = "/courses",
  backLabel = "Back to courses",
}: ComingSoonStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full rounded-[2rem] border border-slate-200 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] p-8 sm:p-10 text-center">
        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-amber-700">
          {badge}
        </span>
        <div className="mt-6 text-5xl">🚧</div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={backHref}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            {backLabel}
          </Link>
          <Link
            href="/waitlist?source=course_preview"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
          >
            Join Course Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
