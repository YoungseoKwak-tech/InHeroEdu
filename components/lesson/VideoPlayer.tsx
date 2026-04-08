"use client";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
