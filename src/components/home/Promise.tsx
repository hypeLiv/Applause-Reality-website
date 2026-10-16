"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/lib/site";
import { Reveal } from "./motion";
import { Arrow } from "./ui";

const statement =
  "We reject the hit-and-run broker culture. Applause Reality stays on as your lifelong consultant — adding value and advocating for you long after the papers are signed.";

export default function Promise() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = statement.split(" ");

  return (
    <section className="lux-scope lux-on-light bg-ivory px-4 sm:px-6 py-28 text-ink-900 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="lux-label text-royal">Our partnership promise</p>
          {/* Tagline renders ~17x its font-size wide, so size it to the
              container (viewport minus side padding, capped at 1100px)
              and keep it on one line. */}
          <h2 lang="hi" className="mt-8 whitespace-nowrap font-deva text-[clamp(1rem,calc((100vw-5rem)/17.6),3.9rem)] leading-[1.25] text-royal">
            {site.tagline}
          </h2>
        </Reveal>

        <p
          ref={ref}
          className="mt-14 font-serif text-[clamp(1.75rem,3.4vw,3.1rem)] leading-[1.18] tracking-[-0.01em]"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href="/about-applause-reality"
            className="lux-focus group inline-flex items-center gap-3 border-b border-ink-900/20 pb-1 font-text text-[15px] font-semibold transition-colors hover:border-ink-900"
          >
            Meet the founder <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}
