"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Wraps an article: a thin accent bar across the top tracks how far you've read. */
export function ReadingProgress({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref}>
      <motion.div
        aria-hidden
        style={{ scaleX: reduce ? scrollYProgress : smooth }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-royal"
      />
      {children}
    </div>
  );
}

/** "On this page": the article's sections, with the one you're reading highlighted. */
export function ArticleToc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      // A heading becomes "current" once it passes the upper third of the screen.
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page">
      <p className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink">On this page</p>
      <ol className="mt-5 space-y-1 border-l border-ink-900/10">
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={on ? "location" : undefined}
                className={`lux-focus -ml-px block border-l py-1.5 pl-4 font-text text-[13px] leading-snug transition-colors ${
                  on ? "border-royal font-semibold text-ink-900" : "border-transparent text-slate-ink hover:text-ink-900"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
