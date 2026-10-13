"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
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

const intro =
  "Curated shortlists, efficient tours and bank-approved assets — so your time goes into the right homes, from the first visit to long after the keys are yours.";

/**
 * Horizontal milestone rail on desktop: the section pins, the track slides
 * sideways, and each step draws its stem and reveals its copy as it reaches
 * the reveal point. Phones and reduced-motion get a vertical list instead
 * (switched in CSS, so there is no hydration flash).
 */
export default function Journey() {
  return (
    <section className="lux-scope relative bg-ink-900 text-ivory">
      <div className="hidden md:block motion-reduce:hidden">
        <Rail />
      </div>
      <div className="md:hidden motion-reduce:block">
        <Stacked />
      </div>
    </section>
  );
}

// ─── Desktop rail ──────────────────────────────────────────────

/** Where on screen (fraction of viewport width) a step "arrives". */
const REVEAL_AT = 0.62;
/** Length of each milestone stem. */
const STEM = "clamp(110px, 18vh, 190px)";

type Layout = { distance: number; vw: number; railLeft: number; railWidth: number; marks: number[] };

function Rail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const markRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layout = useRef<Layout>({ distance: 0, vw: 1, railLeft: 0, railWidth: 1, marks: [] });
  const [distance, setDistance] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const lineScale = useMotionValue(0);
  const endDot = useTransform(lineScale, [0.94, 1], [0.25, 1]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * layout.current.distance);

  function sync(xv: number) {
    const l = layout.current;
    const point = -xv + l.vw * REVEAL_AT;
    const count = l.marks.filter((m) => point >= m).length;
    setRevealed((c) => (c === count ? c : count));
    lineScale.set(Math.min(1, Math.max(0, (point - l.railLeft) / l.railWidth)));
  }
  useMotionValueEvent(x, "change", sync);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const rail = railRef.current;
      if (!track || !rail) return;
      const vw = window.innerWidth;
      layout.current = {
        distance: Math.max(0, track.scrollWidth - vw),
        vw,
        railLeft: rail.offsetLeft,
        railWidth: rail.offsetWidth,
        marks: markRefs.current.map((el) => (el ? rail.offsetLeft + el.offsetLeft : Infinity)),
      };
      setDistance(layout.current.distance);
      sync(x.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- measure once; ResizeObserver handles changes
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-full w-max items-stretch">
          {/* Intro panel */}
          <div className="flex w-[44vw] min-w-[440px] max-w-[640px] shrink-0 flex-col justify-center pl-[6vw] pr-12">
            <Reveal>
              <p className="lux-label text-brass-soft">End-to-end stewardship</p>
            </Reveal>
            <Words
              text="One partner, *every* milestone."
              className="lux-display mt-6 text-[clamp(2.5rem,4.4vw,4.25rem)]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[28rem] font-text text-lg leading-relaxed text-ivory/70">{intro}</p>
              <Cta href={site.whatsapp} className={`${lux.gold} mt-9`}>
                Plan my first visit <Arrow />
              </Cta>
              <p className="mt-10 flex items-center gap-3 font-text text-xs font-semibold uppercase tracking-[0.2em] text-ivory/45">
                Scroll
                <span aria-hidden className="h-px w-10 bg-ivory/30" />
                <span aria-hidden>→</span>
              </p>
            </Reveal>
          </div>

          {/* Milestone rail */}
          <div
            ref={railRef}
            className="relative h-full shrink-0"
            style={
              {
                "--gap": "clamp(300px, 27vw, 420px)",
                "--pad": "4vw",
                width: `calc(${steps.length - 1} * var(--gap) + 2 * var(--pad) + 320px)`,
              } as React.CSSProperties
            }
          >
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-white/12" />
            <motion.span
              aria-hidden
              style={{ scaleX: lineScale }}
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-gradient-to-r from-brass/70 to-brass"
            />
            <motion.span
              aria-hidden
              style={{ opacity: endDot }}
              className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brass"
            />

            <ol>
              {steps.map((s, i) => (
                <Milestone
                  key={s.title}
                  ref={(el) => {
                    markRefs.current[i] = el;
                  }}
                  index={i}
                  on={i < revealed}
                  {...s}
                />
              ))}
            </ol>
          </div>

          {/* Closing panel */}
          <div className="flex w-[40vw] min-w-[420px] max-w-[600px] shrink-0 flex-col justify-center pl-10 pr-[6vw]">
            <p className="lux-label text-brass-soft">And beyond</p>
            <p className="mt-6 font-sans text-[clamp(1.75rem,2.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em]">
              We stay on — long after the keys are yours.
            </p>
            <Cta href={site.whatsapp} className={`${lux.ghostDark} mt-9 self-start`}>
              Talk to an advisor <Arrow />
            </Cta>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Milestone({
  ref,
  index,
  on,
  icon,
  title,
  text,
}: {
  ref: React.Ref<HTMLDivElement>;
  index: number;
  on: boolean;
  icon: IconName;
  title: string;
  text: string;
}) {
  const above = index % 2 === 0;
  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <li>
      <div
        ref={ref}
        className="absolute top-1/2 h-0"
        style={{ left: `calc(var(--pad) + ${index} * var(--gap))` }}
      >
        {/* Base tick on the rail */}
        <span
          aria-hidden
          className={`absolute -left-[5px] -top-[5px] h-[11px] w-[11px] rounded-full border transition-colors duration-500 ${
            on ? "border-brass bg-brass" : "border-white/25 bg-ink-900"
          }`}
        />
        {/* Stem */}
        <span
          aria-hidden
          className={`absolute left-0 w-px bg-brass transition-transform duration-700 ${ease} ${
            above ? "bottom-0 origin-bottom" : "top-0 origin-top"
          }`}
          style={{ height: STEM, transform: `scaleY(${on ? 1 : 0})` }}
        />
        {/* Tip dot */}
        <span
          aria-hidden
          className={`absolute -left-[4px] h-[9px] w-[9px] rounded-full bg-brass shadow-[0_0_0_5px_rgba(212,162,76,0.15)] transition-transform duration-300 ${
            on ? "scale-100 delay-500" : "scale-0"
          }`}
          style={above ? { bottom: `calc(${STEM} - 4px)` } : { top: `calc(${STEM} - 4px)` }}
        />
        {/* Copy, aligned to the tip */}
        <div
          className={`absolute left-7 w-[300px] transition-all duration-700 ${ease} ${
            on ? "translate-y-0 opacity-100 delay-300" : "translate-y-3 opacity-0"
          }`}
          style={{ top: above ? `calc(-1 * ${STEM} - 12px)` : `calc(${STEM} - 12px)` }}
        >
          <p className="flex items-center gap-3 font-text text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft tabular-nums">
            <Icon name={icon} className="h-5 w-5 text-brass" />
            Step {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-sans text-[clamp(1.4rem,1.9vw,1.85rem)] font-semibold leading-tight tracking-[-0.02em]">
            {title}
          </h3>
          <p className="mt-2 font-text text-[15px] leading-relaxed text-ivory/65">{text}</p>
        </div>
      </div>
    </li>
  );
}

// ─── Phones / reduced motion ───────────────────────────────────

function Stacked() {
  return (
    <div className="px-6 py-24">
      <Reveal>
        <p className="lux-label text-brass-soft">End-to-end stewardship</p>
      </Reveal>
      <Words text="One partner, *every* milestone." className="lux-display mt-6 text-[2.6rem]" />
      <Reveal delay={0.1}>
        <p className="mt-6 font-text text-lg leading-relaxed text-ivory/70">{intro}</p>
      </Reveal>

      <ol className="relative mt-14 space-y-10 border-l border-brass/40 pl-8">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-1 h-[9px] w-[9px] rounded-full bg-brass shadow-[0_0_0_5px_rgba(212,162,76,0.15)]"
            />
            <Reveal>
              <p className="flex items-center gap-3 font-text text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">
                <Icon name={s.icon} className="h-5 w-5 text-brass" />
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 font-text text-base leading-relaxed text-ivory/65">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-12">
        <Cta href={site.whatsapp} className={lux.gold}>
          Plan my first visit <Arrow />
        </Cta>
      </Reveal>
    </div>
  );
}
