"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Icon, type IconName } from "@/components/home/ui";

/**
 * Four milestones on one line that draws itself as the section scrolls
 * through the viewport; each node lights as the line reaches it.
 * Horizontal on wide screens, vertical on phones.
 */
export default function JourneyLine({ steps }: { steps: { icon: IconName; title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const draw = useTransform(scrollYProgress, (p) => (reduce ? 1 : p));

  return (
    <ol ref={ref} className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
      {/* Track + drawn line: across the node row on desktop, down the left on phones */}
      <span aria-hidden className="absolute left-[23px] top-6 h-[calc(100%-3rem)] w-px bg-white/10 md:left-6 md:right-6 md:h-px md:w-auto" />
      <motion.span
        aria-hidden
        style={{ scaleY: draw }}
        className="absolute left-[23px] top-6 h-[calc(100%-3rem)] w-px origin-top bg-accent md:hidden"
      />
      <motion.span
        aria-hidden
        style={{ scaleX: draw }}
        className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-accent md:block"
      />

      {steps.map((s, i) => (
        <Step key={s.title} step={s} index={i} count={steps.length} draw={draw} />
      ))}
    </ol>
  );
}

function Step({
  step,
  index,
  count,
  draw,
}: {
  step: { icon: IconName; title: string; text: string };
  index: number;
  count: number;
  draw: MotionValue<number>;
}) {
  // A node lights once the line has reached its position along the row.
  const at = count > 1 ? index / (count - 1) : 0;
  const reached = (p: number) => p >= at - 0.02;
  const bg = useTransform(draw, (p) => (reached(p) ? "#8ea6e8" : "#13224a"));
  const fg = useTransform(draw, (p) => (reached(p) ? "#050c1f" : "rgb(247 244 238 / 0.7)"));

  return (
    <li className="relative flex gap-5 md:block">
      <motion.span
        style={{ backgroundColor: bg, color: fg }}
        className="relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full ring-4 ring-ink-950 transition-colors duration-300"
      >
        <Icon name={step.icon} className="h-5 w-5" />
      </motion.span>
      <div className="md:mt-7">
        <p className="font-text text-xs font-semibold tabular-nums tracking-[0.18em] text-accent-soft">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 font-sans text-xl font-semibold tracking-[-0.015em]">{step.title}</h3>
        <p className="mt-2 max-w-[28ch] font-text text-[15px] leading-relaxed text-ivory/65">{step.text}</p>
      </div>
    </li>
  );
}
