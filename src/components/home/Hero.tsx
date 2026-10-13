"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { EASE, Words } from "./motion";
import { Arrow, Icon, lux } from "./ui";

/**
 * Framed hero: the photo sits in a rounded, inset card; copy is centred over it.
 * On scroll the card eases back slightly so the page reads as lifting off it.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const frameScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.94]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="lux-scope bg-ivory p-2 sm:p-3 md:p-4">
      <motion.div
        style={{ scale: frameScale }}
        className="lux-grain relative isolate flex h-[calc(100svh-1rem)] min-h-[640px] flex-col overflow-hidden rounded-[24px] bg-ink-950 text-white sm:h-[calc(100svh-1.5rem)] md:h-[calc(100svh-2rem)] md:rounded-[32px]"
      >
        {/* Photo with a slow settle-in zoom and scroll parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.12 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 2.6, ease: EASE }}
          >
            <Image
              src="/images/hero-living.jpg"
              alt="Sunlit living room in a premium Delhi NCR residence"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        {/* Legibility: light overall wash, a soft pool behind the copy, darker edges top and bottom */}
        <div className="absolute inset-0 -z-10 bg-ink-950/30" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(5,12,31,0.55),transparent_75%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink-950/70 to-transparent" />

        <motion.div
          style={{ y: copyY, opacity: fade }}
          className="flex flex-1 flex-col items-center justify-center px-6 pt-20 text-center"
        >
          <motion.p {...rise(0.1)} className="lux-label text-brass-soft">
            Delhi NCR · Bank-approved property advisors
          </motion.p>
          <Words
            as="h1"
            immediate
            delay={0.2}
            text="Expert advocacy for your *lifetime* real estate goals."
            className="lux-display mt-6 max-w-[18ch] text-[clamp(2.5rem,5.4vw,5.25rem)] leading-[1.02] tracking-[-0.04em]"
          />
          <motion.p
            {...rise(0.7)}
            className="mt-6 max-w-[38rem] font-text text-lg leading-relaxed text-white/85 md:text-xl"
          >
            Only 100% bank-approved homes and offices — with a consultant who stays beside you
            from the first site visit to long after possession.
          </motion.p>
          <motion.div {...rise(0.85)} className="mt-10 flex flex-wrap justify-center gap-3">
            <Cta href={site.whatsapp} className={lux.heroPrimary}>
              Book a free consultation <Arrow />
            </Cta>
            <Cta href="/projects" className={lux.heroGlass}>
              See running deals
            </Cta>
          </motion.div>

          <motion.ul
            {...rise(1)}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-text text-sm text-white/75"
          >
            <li className="flex items-center gap-2">
              Verified by
              <span className="flex items-center gap-1.5">
                <span className="grid h-7 place-items-center rounded-full bg-white px-2.5">
                  <Image src="/images/sbi.png" alt="SBI" width={108} height={56} className="h-4 w-auto" />
                </span>
                <span className="grid h-7 place-items-center rounded-full bg-white px-2.5">
                  <Image src="/images/pnb.png" alt="PNB" width={124} height={53} className="h-4 w-auto" />
                </span>
              </span>
            </li>
            <li className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
            <li>
              <span className="font-semibold text-white tabular-nums">23+</span> years
            </li>
            <li className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
            <li>
              <span className="font-semibold text-white tabular-nums">1000+</span> families
            </li>
          </motion.ul>
        </motion.div>

        {/* Corner controls, echoing the reference's quiet utility buttons */}
        <motion.div
          {...rise(1.15)}
          className="flex items-center gap-3 px-5 pb-5 md:px-8 md:pb-7"
        >
          <a
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
            className="lux-focus grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Icon name="phone" className="h-5 w-5" />
          </a>
          <span className="hidden font-text text-sm text-white/70 sm:inline">
            ← Speak to an advisor now · {site.phone.display}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
