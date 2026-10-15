"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise once when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

/**
 * Headline that rises word by word. Wrap words in *asterisks* to set them in
 * the muted two-tone accent, e.g. "One partner, *every* milestone."
 */
export function Words({
  text,
  as = "h2",
  className,
  immediate = false,
  delay = 0,
}: {
  text: string;
  as?: keyof typeof tags;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = tags[as];

  let inEm = false;
  const words = text.split(" ").map((raw) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*") && (raw.length > 1 || inEm);
    if (opens) inEm = true;
    const em = inEm;
    if (closes) inEm = false;
    return { word: raw.replace(/\*/g, ""), em };
  });

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text.replace(/\*/g, "")}
    >
      {words.map(({ word, em }, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
              show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {em ? <em>{word}</em> : word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
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
