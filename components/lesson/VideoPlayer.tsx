"use client";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-xl border border-white/10">
      <div className="relative w-full flex items-center justify-center" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(29,158,117,0.18),_transparent_38%),linear-gradient(180deg,#030712_0%,#0b1120_100%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="inline-flex items-center rounded-full border border-amber-200/50 bg-amber-50/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-amber-200">
            VIDEO COMING SOON
          </span>
          <div className="mt-6 text-5xl">🎬</div>
          <h3 className="mt-5 text-2xl font-semibold text-white">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
            We are preparing the full lesson video for the first cohort. The transcript preview is available below while the video rollout is in progress.
          </p>
        </div>
      </div>
    </div>
  );
}
