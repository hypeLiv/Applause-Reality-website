"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { EASE, Words } from "./motion";
import { Arrow, lux } from "./ui";

const services = ["Bank-approved homes", "Commercial spaces", "Investment advisory", "Home-loan support"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="lux-scope lux-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-ivory"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image
            src="/images/hero-living.jpg"
            alt="Sunlit living room in a premium Delhi NCR residence"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink-950 to-transparent" />
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-royal/40 blur-[140px]" />

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto grid w-full max-w-[1320px] flex-1 items-center gap-14 px-6 pb-16 pt-36 md:px-10 lg:grid-cols-[1.35fr_0.65fr] lg:pt-40"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="lux-label text-brass-soft"
          >
            Delhi NCR · Bank-approved property advisors
          </motion.p>
          <Words
            as="h1"
            immediate
            delay={0.2}
            text="Expert advocacy for your *lifetime* real estate goals."
            className="lux-display mt-7 max-w-[13ch] text-[clamp(3rem,7.2vw,7rem)]"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-8 max-w-[34rem] font-text text-lg leading-relaxed text-ivory/75 md:text-xl"
          >
            Only 100% bank-approved residential and corporate properties — with a consultant who
            stays beside you from the first site visit to long after possession.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Cta href={site.whatsapp} className={lux.gold}>
              Book a free consultation <Arrow />
            </Cta>
            <Cta href="/projects" className={lux.ghostDark}>
              See running deals
            </Cta>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
          style={{ perspective: 1200 }}
        >
          <TrustCard />
        </motion.div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6 font-text text-sm text-ivory/70 md:px-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-brass" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <span className="hidden items-center gap-3 md:flex" aria-hidden>
            Scroll
            <span className="relative h-8 w-px overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-brass"
                animate={reduce ? undefined : { y: [-12, 32] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

/** Glass credential card that tilts toward the pointer; layers sit at different depths. */
function TrustCard() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.16), transparent 55%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="lux-glass relative mx-auto max-w-[400px] rounded-[28px] p-8"
    >
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[28px]"
      />
      <div style={{ transform: "translateZ(50px)" }}>
        <p className="lux-label text-ivory/60">Verified by</p>
        <div className="mt-4 flex gap-3">
          {[
            { src: "/images/sbi.png", alt: "State Bank of India", w: 108, h: 56 },
            { src: "/images/pnb.png", alt: "Punjab National Bank", w: 124, h: 53 },
          ].map((l) => (
            <span key={l.src} className="grid h-14 flex-1 place-items-center rounded-xl bg-white px-3">
              <Image src={l.src} alt={l.alt} width={l.w} height={l.h} className="h-9 w-auto" />
            </span>
          ))}
        </div>
      </div>

      <div style={{ transform: "translateZ(80px)" }} className="mt-10">
        <p className="font-serif text-[88px] leading-none text-brass tabular-nums">100%</p>
        <p className="mt-2 font-text text-lg text-ivory">Bank-approved assets, every time</p>
      </div>

      <dl
        style={{ transform: "translateZ(40px)" }}
        className="mt-8 grid grid-cols-2 border-t border-white/10 pt-6"
      >
        {[
          { v: "23+", l: "Years of legacy" },
          { v: "1000+", l: "Families served" },
        ].map((s, i) => (
          <div key={s.l} className={i ? "border-l border-white/10 pl-6" : ""}>
            <dd className="font-serif text-4xl text-ivory tabular-nums">{s.v}</dd>
            <dt className="mt-1 font-text text-xs uppercase tracking-[0.14em] text-ivory/60">{s.l}</dt>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
