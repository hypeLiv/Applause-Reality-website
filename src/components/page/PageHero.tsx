"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "@/components/Image";
import { useRef } from "react";
import BrandTagline from "@/components/BrandTagline";
import { riseDelay, Words } from "@/components/home/motion";

/**
 * Inner-page hero: the homepage's daylight photo treatment at a shorter height.
 * `title` uses the Words *accent* syntax. `children` fills the bottom strip
 * (stats, a project index, …).
 */
export default function PageHero({
  image,
  alt,
  eyebrow,
  title,
  lead,
  actions,
  children,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  lead: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="lux-scope bg-ivory p-2 sm:p-3 md:p-4">
      <div className="lux-on-light relative isolate flex min-h-[78svh] flex-col overflow-hidden rounded-[24px] bg-mist text-ink-900 md:rounded-[32px]">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
          <div
            className="lux-zoom absolute inset-0"
            style={{ "--zoom-from": 1.1, "--zoom-to": 1.03, animationDuration: "2.4s" } as React.CSSProperties}
          >
            <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </motion.div>
        {/* Daylight veil, as on the homepage hero: near-white behind the copy, clear toward the photo. */}
        <div className="absolute inset-0 -z-10 bg-white/60 lg:hidden" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/70 via-45% to-transparent max-lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-white/85 to-transparent" />

        <motion.div
          style={{ opacity: fade }}
          className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-4 sm:px-6 pb-10 pt-32 md:px-12"
        >
          <p style={riseDelay(0.1)} className="lux-rise lux-label self-start text-royal">
            {eyebrow}
          </p>
          <Words
            as="h1"
            immediate
            delay={0.2}
            text={title}
            className="lux-display mt-6 max-w-[17ch] text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02]"
          />
          <div style={riseDelay(0.6)} className="lux-rise mt-7">
            <BrandTagline size="md" />
          </div>
          {/* The page's main text, so it's there from first paint rather than fading in late. */}
          <p
            className="mt-6 max-w-[38rem] font-text text-base leading-relaxed text-ink-900/75 md:text-lg"
          >
            {lead}
          </p>
          {actions && (
            <div style={riseDelay(0.85)} className="lux-rise mt-9 flex flex-wrap gap-3">
              {actions}
            </div>
          )}
        </motion.div>

        {children && (
          <div style={riseDelay(1)} className="lux-rise mx-auto w-full max-w-[1320px] px-4 sm:px-6 pb-6 md:px-12 md:pb-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
