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
          className="lux-focus group/play absolute inset-0 grid place-items-center bg-gradient-to-t from-black/45 via-transparent to-transparent"
        >
          <span className="flex items-center gap-3 rounded-full border border-white/25 bg-white/15 py-2 pl-2 pr-5 font-text text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 group-hover/play:scale-105 group-hover/play:bg-white/25">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brass text-ink-950">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 4v16l13-8z" />
              </svg>
            </span>
            Play film
          </span>
        </button>
      )}
    </div>
  );
}
