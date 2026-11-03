"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "@/components/Image";
import { useEffect, useRef } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The entrances below are CSS (.lux-rise, .lux-word), so content shows from first
 * paint without waiting for hydration. Whatever is still below the fold at hydration
 * is held back with .lux-wait, then plays when `amount` of it scrolls into view.
 */
function useScrollEntrance(amount: number, enabled = true) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("lux-wait");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.remove("lux-wait");
        io.disconnect();
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, enabled]);
  return ref;
}

/** Start delay (seconds) for an element with the .lux-rise entrance. */
export const riseDelay = (delay: number) => ({ "--rise-delay": `${delay}s` }) as React.CSSProperties;

/** Fade-and-rise once when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 44,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useScrollEntrance(0.25);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`lux-rise ${className}`}
      style={{ ...riseDelay(delay), "--rise-y": `${y}px`, animationDuration: "1s" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Headline that rises word by word. Wrap words in *asterisks* to set them in
 * the muted two-tone accent, e.g. "One partner, *every* milestone."
 * `immediate` plays on load wherever the headline is; otherwise it waits to be scrolled to.
 */
export function Words({
  text,
  as = "h2",
  className,
  immediate = false,
  delay = 0,
  ariaLevel,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Heading level for a non-heading tag, so a duplicate layout stays out of the h1–h6 outline. */
  ariaLevel?: number;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useScrollEntrance(0.5, !immediate);
  const Tag = as;

  let inEm = false;
  const words = text.split(" ").map((raw) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*") && (raw.length > 1 || inEm);
    if (opens) inEm = true;
    const em = inEm;
    if (closes) inEm = false;
    return { word: raw.replace(/\*/g, ""), em };
  });

  return (
    <Tag
      ref={ref as never}
      className={className}
      {...(ariaLevel ? { role: "heading", "aria-level": ariaLevel } : {})}
      aria-label={text.replace(/\*/g, "")}
    >
      {words.map(({ word, em }, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="lux-word inline-block" style={{ animationDelay: `${delay + i * 0.06}s` }}>
            {em ? <em>{word}</em> : word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Image that drifts against the scroll inside a clipped frame. */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "100vw",
  range = 60,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  range?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-range, range]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName}`} />
      </motion.div>
    </div>
  );
}

/** Counts up from zero the first time it is seen. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!reduce && ref.current && !inView) ref.current.textContent = "0";
  }, [reduce, inView]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
