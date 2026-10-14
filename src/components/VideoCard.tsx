"use client";

import { useRef, useState } from "react";

/**
 * Poster-first video. Until it plays, an overlay carries the play button and
 * an optional caption (`label` top-left, `title` + `meta` at the foot), all of
 * which give way to native controls once the film starts.
 */
export default function VideoCard({
  src,
  poster,
  title,
  meta,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  title: string;
  meta?: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const captioned = Boolean(meta || label);

  return (
    <div className={`group/card relative overflow-hidden bg-black ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={playing}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className={`h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-lux)] ${
          playing ? "" : "group-hover/card:scale-[1.04]"
        }`}
        aria-label={title}
      />
      {!playing && (
        <button
          type="button"
          onClick={() => ref.current?.play()}
          aria-label={`Play ${title}`}
          className={`lux-focus absolute inset-0 grid place-items-center bg-gradient-to-t ${
            captioned ? "from-black/75 via-black/5 to-black/25" : "from-black/45 via-transparent to-transparent"
          }`}
        >
          {label && (
            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 font-text text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
              {label}
            </span>
          )}

          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-ink-950 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[var(--ease-lux)] group-hover/card:scale-110">
            <span
              aria-hidden
              className="absolute -inset-2 rounded-full border border-white/35 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5">
              <path d="M7 4v16l13-8z" />
            </svg>
          </span>

          {meta && (
            <span className="absolute inset-x-5 bottom-5 text-left">
              <span className="block font-sans text-lg font-semibold tracking-[-0.01em] text-white md:text-xl">
                {title}
              </span>
              <span className="mt-1 flex items-center gap-2 font-text text-[13px] text-white/70">
                <span aria-hidden className="h-px w-4 bg-accent" />
                {meta}
              </span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}
