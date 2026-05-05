"use client";

import Link from "next/link";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function EarlyAccessModal({
  isOpen,
  onClose,
  title,
  description,
}: EarlyAccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-amber-700">
          STAGED RELEASE
        </span>
        <div className="mt-6 text-5xl">🚧</div>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Back
          </button>
          <Link
            href="/waitlist?source=feature_gate"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
          >
            Join the First Cohort
          </Link>
        </div>
      </div>
    </div>
  );
}
