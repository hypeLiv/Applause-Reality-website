"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MorphGallery from "@/components/ui/morph-gallery";
import { Bezel } from "./ui";

type Pillar = { label: string; src: string; alt: string };

/** How long each pillar holds before the next one burns through. */
const DWELL = 5500;

/**
 * The four service pillars as one morphing frame, with photo previews below.
 * The active preview carries the timer: its bar fills over DWELL and its
 * animationend advances the gallery, so pausing the bar (hover, focus,
 * off-screen) pauses the cycle.
 */
export default function PillarGallery({ pillars }: { pillars: Pillar[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = () => setIndex((i) => (i + 1) % pillars.length);
  const running = inView && !held;
  const current = pillars[index];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <Bezel coreClassName="relative">
        <MorphGallery
          items={pillars.map((p) => ({ src: p.src, alt: p.alt }))}
          index={index}
          onIndexChange={setIndex}
          height="clamp(22rem, 62svh, 38rem)"
          duration={1600}
          thumbnails={false}
          className="bg-ink-950"
        />
        <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 md:inset-x-10 md:bottom-9">
          <div key={index} className="motion-safe:animate-[pillar-rise_800ms_var(--ease-lux)_both]">
            <p className="font-text text-xs font-semibold tracking-[0.22em] text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
            </p>
            <p className="mt-2 font-sans text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ivory">
              {current.label}
            </p>
          </div>
        </div>
      </Bezel>

      <ul className="mt-4 grid grid-cols-4 gap-2 md:mt-5 md:gap-4">
        {pillars.map((p, i) => {
          const on = i === index;
          return (
            <li key={p.label}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={on}
                aria-label={`Show ${p.label}`}
                className={`lux-focus group relative block aspect-square w-full overflow-hidden rounded-xl ring-1 transition-[box-shadow,opacity] duration-500 md:aspect-[16/9] md:rounded-2xl ${
                  on ? "opacity-100 ring-2 ring-accent" : "opacity-50 ring-white/10 hover:opacity-85"
                }`}
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent max-md:hidden" />
                <span className="absolute inset-x-4 bottom-3 text-left max-md:hidden">
                  <span className="block font-text text-[11px] font-semibold tracking-[0.2em] text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block truncate font-sans text-[15px] font-semibold text-ivory">
                    {p.label}
                  </span>
                </span>
                {/* The active preview's own timer: when it fills, the next pillar dissolves in. */}
                {on && (
                  <span
                    key={index}
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
                    onAnimationEnd={next}
                    style={
                      reduced
                        ? { transform: "scaleX(0)" }
                        : {
                            animation: `pillar-fill ${DWELL}ms linear both`,
                            animationPlayState: running ? "running" : "paused",
                          }
                    }
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
