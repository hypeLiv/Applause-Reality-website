"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { Reveal, Words } from "./motion";
import { Arrow, Icon, type IconName, lux } from "./ui";

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shortlist",
    title: "A curated shortlist",
    text: "We filter Delhi NCR down to bank-approved projects that match your goals, budget and timeline.",
  },
  {
    icon: "pin",
    title: "Site visits worth your weekend",
    text: "Focused, well-planned tours of only the properties that deserve a look — never the wrong ones.",
  },
  {
    icon: "bank",
    title: "Loans without the stress",
    text: "Direct access to our SBI and PNB networks for faster, smoother home-loan approvals.",
  },
  {
    icon: "document",
    title: "White-glove paperwork",
    text: "Documentation, approvals and builder follow-ups handled transparently, end to end.",
  },
  {
    icon: "key",
    title: "Possession — and after",
    text: "Handover support and dedicated care for every future need once you have moved in.",
  },
];

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.65", "end 0.55"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <section className="lux-scope relative bg-ink-900 px-6 py-28 text-ivory md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Reveal>
            <p className="lux-label text-brass-soft">End-to-end stewardship</p>
          </Reveal>
          <Words
            text="One partner, *every* milestone."
            className="lux-display mt-7 text-[clamp(2.75rem,5.2vw,5rem)]"
          />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-[30rem] font-text text-lg leading-relaxed text-ivory/70">
              Curated shortlists, efficient tours and bank-approved assets — so your time goes into
              the right homes, from the first visit to long after the keys are yours.
            </p>
            <Cta href={site.whatsapp} className={`${lux.gold} mt-10`}>
              Plan my first visit <Arrow />
            </Cta>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative">
          <span className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" aria-hidden />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : line }}
            className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-brass-soft via-brass to-brass"
          />
          {steps.map((s, i) => (
            <Step key={s.title} index={i} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ icon, title, text, index }: { icon: IconName; title: string; text: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-35% 0px -45% 0px" });
  const seen = useInView(ref, { once: true, margin: "-35% 0px -45% 0px" });
  const lit = active || seen;

  return (
    <li ref={ref} className="relative flex gap-8 py-10 first:pt-0 last:pb-0 md:gap-10 md:py-14">
      <span
        className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
          lit
            ? "border-brass bg-ink-950 text-brass shadow-[0_0_0_6px_rgba(212,162,76,0.12)]"
            : "border-white/15 bg-ink-900 text-ivory/40"
        }`}
      >
        <Icon name={icon} />
      </span>
      <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-45"}`}>
        <p className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft tabular-nums">
          Step {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-serif text-[clamp(1.9rem,3vw,2.75rem)] leading-tight">{title}</h3>
        <p className="mt-3 max-w-[30rem] font-text text-lg leading-relaxed text-ivory/70">{text}</p>
      </div>
    </li>
  );
}
