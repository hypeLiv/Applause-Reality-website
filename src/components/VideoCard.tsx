"use client";

import { useRef, useState } from "react";

export default function VideoCard({
  src,
  poster,
  title,
  className = "",
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={playing}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className="h-full w-full object-cover"
        aria-label={title}
      />
      {!playing && (
        <button
          type="button"
          onClick={() => ref.current?.play()}
          aria-label={`Play ${title}`}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 4v16l13-8z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
