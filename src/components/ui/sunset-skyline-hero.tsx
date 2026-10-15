"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Scroll-scrubbed video section.
//
// Adapted from "Tokyo Skyline Hero" by guglielmogiannattasio
// (21st.dev): scroll drives video.currentTime forward and back,
// then — past the end of the footage — a brand mark composes in,
// with an optional transparent cutout layered above it.
//
// What changed for this codebase:
// - Pinned with `position: sticky` inside a tall section instead of
//   locking <body> with `position: fixed`. The original locks on
//   mount and never releases, which only works as the very first
//   thing on a page; sticky lets it live mid-page, keeps keyboard,
//   scrollbar and Lenis smooth-scroll working, and can't trap users.
// - The rAF loop only runs while the section is near the viewport,
//   and the video only starts downloading as you approach it.
// - Reduced motion renders a static end state with no pinning.
// - Colours/fonts come from the site's Tailwind tokens; nav and
//   signature are opt-in (the site header already provides nav).
// ─────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface TokyoSkylineHeroProps {
  videoSrc: string;
  /** Lighter encode of the same clip, used below the lg breakpoint. */
  videoSrcSmall?: string;
  /** First frame, shown until the video can seek. */
  poster?: string;
  /** Optional transparent PNG cropped identically to the video's last frame; sits above the brand mark. */
  skylineSrc?: string;
  /** Small label above the opening title. */
  eyebrow?: string;
  title?: string;
  /** Heading level for the title: h1 when this section opens the page. */
  titleAs?: "h1" | "h2";
  scrollHint?: string;
  /** Large line that composes in once the footage reaches its end. */
  brandMark?: string;
  /** Supporting line under the brand mark. */
  caption?: string;
  /** Call to action revealed with the brand mark (e.g. a link button). */
  action?: React.ReactNode;
  navItems?: NavItem[];
  signature?: { name: string; url: string } | false;
  /** Keep the site header transparent while this section is behind it. */
  darkHeader?: boolean;
  /** Darkening (0–1) over the opening frame so the title reads; lifts as the title fades. */
  openingVeil?: number;
  /** Scroll distance (px) spent scrubbing, on top of one viewport of pinning. */
  scrubDistance?: number;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Progress breakpoints: the last ~20% of the scroll is spent on the reveal.
const VIDEO_END = 0.78;
const TEXT_START = 0.8;
const TEXT_END = 0.93;
const SKYLINE_START = 0.85;
const SKYLINE_END = 0.96;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function TokyoSkylineHero({
  videoSrc,
  videoSrcSmall,
  poster,
  skylineSrc,
  eyebrow,
  title,
  titleAs: TitleTag = "h2",
  scrollHint = "SCROLL",
  brandMark,
  caption,
  action,
  navItems = [],
  signature = false,
  openingVeil = 0,
  darkHeader = false,
  scrubDistance = 3200,
  id,
  className = "",
  style,
}: TokyoSkylineHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const skylineRef = useRef<HTMLImageElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(reduceMotion);

    let duration = 0;
    let rafId = 0;
    let running = false;
    let currentProgress = 0;
    let lastSeek = -1;
    let isSeeking = false;
    let pendingTime: number | null = null;

    const onLoadedData = () => {
      duration = video.duration || 0;
      setReady(true);
      // iOS Safari only decodes seeks after the element has played once.
      video.play().then(() => video.pause()).catch(() => {});
    };
    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("seeked", onSeeked);

    function seekTo(t: number) {
      if (Math.abs(t - lastSeek) < 1 / 48) return;
      lastSeek = t;
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video!.currentTime = t;
    }

    function paint(p: number) {
      if (duration > 0) seekTo(clamp(p / VIDEO_END, 0, 1) * duration);

      const t = 1 - clamp(p / 0.3, 0, 1);
      if (titleRef.current) {
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) hintRef.current.style.opacity = p > 0.02 ? "0" : "1";

      const b = clamp((p - TEXT_START) / (TEXT_END - TEXT_START), 0, 1);
      if (veilRef.current) veilRef.current.style.opacity = String(Math.max(b * 0.6, t * openingVeil));
      if (brandRef.current) {
        brandRef.current.style.opacity = String(b);
        brandRef.current.style.transform = `translateY(${(1 - b) * 16}px) scale(${0.98 + b * 0.02})`;
        brandRef.current.style.filter = `blur(${(1 - b) * 6}px)`;
        brandRef.current.style.pointerEvents = b > 0.9 ? "auto" : "none";
      }
      if (skylineRef.current) {
        skylineRef.current.style.opacity = String(
          clamp((p - SKYLINE_START) / (SKYLINE_END - SKYLINE_START), 0, 1),
        );
      }
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${p})`;
    }

    function frame() {
      const rect = section!.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const target = range > 0 ? clamp(-rect.top / range, 0, 1) : 0;
      currentProgress += (target - currentProgress) * 0.18;
      if (Math.abs(target - currentProgress) < 0.0005) currentProgress = target;
      paint(currentProgress);
      rafId = requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      // Static end state: no pinning, no scrubbing.
      paint(1);
      return () => {
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("seeked", onSeeked);
      };
    }

    // Start fetching the clip a viewport and a half before it arrives.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoSrcSmall && window.matchMedia("(max-width: 1023px)").matches) video.src = videoSrcSmall;
          video.preload = "auto";
          video.load();
          loader.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    loader.observe(section);

    // Only animate while the section is on (or next to) the screen.
    const runner = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          rafId = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: "50% 0px" },
    );
    runner.observe(section);
    paint(0);

    return () => {
      loader.disconnect();
      runner.disconnect();
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [scrubDistance, openingVeil, videoSrcSmall]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-header-over-dark={darkHeader || undefined}
      className={`relative bg-ink-950 ${className}`}
      style={{ height: reduce ? "100dvh" : `calc(100dvh + ${scrubDistance}px)`, ...style }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden text-ivory">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready || poster ? 1 : 0 }}
        />

        {/* Darkens as the brand mark arrives so it stays legible over any frame. */}
        <div ref={veilRef} className="pointer-events-none absolute inset-0 z-[1] bg-ink-950 opacity-0" />

        {brandMark && (
          <div
            ref={brandRef}
            className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center opacity-0"
          >
            <p className="lux-display text-[clamp(3rem,10vw,9rem)] leading-[0.95] [text-shadow:0_8px_60px_rgba(0,0,0,0.45)]">
              {brandMark}
            </p>
            {caption && (
              <p className="mt-6 max-w-[34rem] font-sans text-lg leading-relaxed text-ivory/80 md:text-xl">
                {caption}
              </p>
            )}
            {action && <div className="mt-9">{action}</div>}
          </div>
        )}

        {skylineSrc && (
          // eslint-disable-next-line @next/next/no-img-element -- pixel-aligned overlay; must match the video crop exactly
          <img
            ref={skylineRef}
            src={skylineSrc}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3] h-full w-full object-cover opacity-0"
          />
        )}

        <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(5,12,31,0.45),rgba(5,12,31,0)_30%,rgba(5,12,31,0.1)_70%,rgba(5,12,31,0.6))]" />

        {title && (
          <div
            ref={titleRef}
            className="pointer-events-none absolute inset-0 z-[4] flex flex-col items-center justify-center px-6 text-center"
          >
            {eyebrow && (
              <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                {eyebrow}
              </p>
            )}
            <TitleTag className="lux-display max-w-[16ch] text-[clamp(2.25rem,5.4vw,4.75rem)] [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
              {title}
            </TitleTag>
          </div>
        )}

        {navItems.length > 0 && (
          <nav className="absolute left-1/2 top-6 z-[5] flex -translate-x-1/2 items-center gap-6 rounded-full border border-white/15 bg-white/10 px-6 py-2.5 backdrop-blur-xl">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="whitespace-nowrap text-sm font-semibold text-ivory/85 hover:text-ivory">
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute bottom-[clamp(28px,7vh,56px)] left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.3em] text-ivory/75 transition-opacity duration-500"
        >
          <span>{scrollHint}</span>
          <svg width="14" height="18" viewBox="0 0 14 18" className="motion-safe:animate-bounce">
            <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[5] h-0.5 bg-white/10">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-gradient-to-r from-accent/60 to-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {signature && (
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-6 z-[5] text-xs text-ivory/60 hover:text-ivory"
          >
            by {signature.name}
          </a>
        )}
      </div>
    </section>
  );
}
