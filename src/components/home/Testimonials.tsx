"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import AdvisorForm from "@/components/AdvisorForm";
import { testimonials } from "@/content/testimonials";
import { EASE, Reveal, Words } from "./motion";

const HOLD_MS = 7000;

const quotes = testimonials.filter((t) => t.featured);

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % quotes.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const q = quotes[active];

  return (
    <section
      id="advisor"
      className="lux-scope relative overflow-hidden bg-ink-900 px-6 py-28 text-ivory md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="flex flex-col"
        >
          <Reveal>
            <p className="lux-label text-accent-soft">Trusted by those who fund the nation</p>
          </Reveal>
          <Words
            text="Bankers buy *through us.*"
            className="lux-display mt-7 text-[clamp(2.6rem,5vw,4.75rem)]"
          />

          <div className="relative mt-12 min-h-[356px] flex-1 md:min-h-[316px]">
            {/* In flow above the quote (not overlaid), sized as an icon so it can't collide with the text. */}
            <svg aria-hidden viewBox="0 0 32 24" className="mb-6 h-8 w-auto text-accent/50" fill="currentColor">
              <path d="M0 24V13.6C0 5.9 4.2 1.4 12.6 0l1.3 3.1C9.3 4.3 7 6.7 6.6 10.3H12V24H0zm18 0V13.6C18 5.9 22.2 1.4 30.6 0l1.4 3.1c-4.7 1.2-7 3.6-7.4 7.2H30V24H18z" />
            </svg>
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative"
                aria-live="polite"
              >
                <blockquote className="font-serif text-[clamp(1.5rem,2.4vw,2.15rem)] leading-[1.3]">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-8 font-text">
                  <span className="block text-base font-semibold">{q.name}</span>
                  <span className="text-sm text-ivory/65">
                    {q.role} · {q.org}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4" role="group" aria-label="Choose a testimonial">
            {quotes.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Show testimonial from ${item.name}`}
                className="lux-focus group text-left"
              >
                <span className="relative block h-px overflow-hidden bg-white/15">
                  {i === active && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="absolute inset-0 origin-left bg-accent"
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused || reduce ? 0 : HOLD_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span
                  className={`mt-3 block font-text text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    i === active ? "text-ivory" : "text-ivory/45 group-hover:text-ivory/75"
                  }`}
                >
                  {item.org} · {item.role}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <aside className="lux-on-light rounded-[28px] bg-ivory p-8 text-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] md:p-10">
            <p className="lux-label text-royal">Meet your advisor</p>
            <h3 className="lux-display mt-5 text-4xl md:text-[44px]">
              Talk to a Delhi NCR <em>relationship</em> manager.
            </h3>
            <p className="mb-8 mt-4 font-text text-base leading-relaxed text-slate-ink">
              Share a few details and we&apos;ll guide your next step personally.
            </p>
            <AdvisorForm />
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
