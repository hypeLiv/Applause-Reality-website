"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "@/components/Image";
import Link from "next/link";
import { useRef } from "react";
import BrandTagline from "@/components/BrandTagline";
import { Cta } from "@/components/sections";
import type { Project } from "@/content/projects";
import { site } from "@/lib/site";
import type { Img } from "@/sanity/media";
import { EASE, Words } from "./motion";
import { Arrow, Bezel, Icon, lux } from "./ui";


/**
 * Framed hero: brand promise on the left, the featured launch on the right,
 * trust signals along the bottom. Full-bleed at rest; on scroll it eases back
 * into a rounded card.
 */
export default function Hero({
  background,
  featured,
  banks,
}: {
  background: Img;
  /** The launch featured beside the headline. */
  featured: Project;
  banks: { sbi: Img; pnb: Img };
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  // Opens edge to edge; on scroll the frame shrinks and rounds, letting the ivory page in from every side.
  const frameScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.94]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.25], reduce ? [0, 0] : [0, 32]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="lux-scope bg-ivory">
      <motion.div
        style={{ scale: frameScale, borderRadius: frameRadius }}
        className="lux-on-light relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-mist text-ink-900 lg:min-h-[max(720px,100svh)]"
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
              src={background.src}
              alt={background.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        {/* Legibility: a daylight veil lifts the copy side to near-white for ink text and
            fades out toward the skyline; phones, where copy spans the width, get an even wash */}
        <div className="absolute inset-0 -z-10 bg-white/60 lg:hidden" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/65 via-45% to-transparent max-lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-white/80 to-transparent" />

        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="mx-auto grid w-full max-w-[1320px] flex-1 items-center gap-12 px-4 sm:px-6 pb-8 pt-28 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          {/* Brand promise */}
          <div>
            <motion.p {...rise(0.1)} className="lux-label text-royal">
              Delhi NCR&apos;s most trusted assets
            </motion.p>
            <Words
              as="h1"
              immediate
              delay={0.2}
              text="Expert advocacy for your *lifetime* real estate goals."
              // "lifetime" is the one bold word here, set in the royal accent.
              className="lux-display mt-6 max-w-[15ch] text-[clamp(2.4rem,4.2vw,4.25rem)] leading-[1.02] [&_em]:font-bold"
            />
            <motion.div {...rise(0.6)} className="mt-7">
              <BrandTagline size="lg" />
            </motion.div>
            <motion.p
              {...rise(0.72)}
              className="mt-6 max-w-[34rem] font-text text-base leading-relaxed text-ink-900/75 md:text-lg"
            >
              Applause Reality is a Delhi NCR real estate consultancy that shortlists only 100% bank-approved
              residential and corporate projects, and stays beside you from the first site visit to long after
              possession.
            </motion.p>
            <motion.div {...rise(0.85)} className="mt-9 flex flex-wrap gap-3">
              <Cta href={site.whatsapp} className={lux.dayPrimary}>
                Book a free consultation <Arrow />
              </Cta>
              <Cta href="/projects" className={lux.dayGlass}>
                See running deals
              </Cta>
            </motion.div>
          </div>

          {/* Featured launch */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
            className="w-full max-w-[460px] justify-self-center lg:justify-self-end"
          >
            <FeaturedCard featured={featured} />
          </motion.div>
        </motion.div>

        {/* Bottom bar: direct line + trust signals */}
        <motion.div
          {...rise(1.1)}
          className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center gap-x-8 gap-y-4 px-4 sm:px-6 pb-6 md:px-12 md:pb-8"
        >
          <a
            href={site.phone.href}
            className="lux-focus group flex items-center gap-3 font-text text-sm text-ink-900/75 transition-colors hover:text-ink-900"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 bg-white/85 text-royal transition-[background-color,translate,scale,rotate] duration-500 ease-[var(--ease-spring)] group-hover:scale-105 group-hover:bg-white">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            Speak to an advisor · {site.phone.display}
          </a>
          <span aria-hidden className="hidden h-5 w-px bg-ink-900/15 md:block" />
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 font-text text-sm text-ink-900/75">
            <li className="flex items-center gap-2">
              Verified by
              <span className="flex items-center gap-1.5">
                <span className="grid h-7 place-items-center rounded-full bg-white px-2.5 ring-1 ring-ink-900/5">
                  <Image src={banks.sbi.src} alt="SBI" width={banks.sbi.width} height={banks.sbi.height} className="h-4 w-auto" />
                </span>
                <span className="grid h-7 place-items-center rounded-full bg-white px-2.5 ring-1 ring-ink-900/5">
                  <Image src={banks.pnb.src} alt="PNB" width={banks.pnb.width} height={banks.pnb.height} className="h-4 w-auto" />
                </span>
              </span>
            </li>
            <li>
              <span className="font-semibold text-ink-900 tabular-nums">23+</span> years
            </li>
            <li>
              <span className="font-semibold text-ink-900 tabular-nums">1000+</span> families
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturedCard({ featured }: { featured: Project }) {
  const href = `/projects/${featured.key}`;
  return (
    <Bezel tone="day" radius="1.75rem">
      <article className="group bg-white text-ink-900">
        <Link href={href} className="lux-focus relative block aspect-[2/1] overflow-hidden" tabIndex={-1} aria-hidden>
          <Image
            src={featured.photo}
            alt={featured.photoAlt}
            fill
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover transition-transform duration-1000 ease-[var(--ease-spring)] group-hover:scale-[1.04]"
          />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/80 to-transparent" />
          <span className="absolute bottom-3 left-4 font-text text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
            Bank approved · Corporate &amp; HR schemes
          </span>
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-text text-[11px] font-semibold uppercase tracking-[0.16em] text-royal ring-1 ring-ink-900/5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-royal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-royal" />
            </span>
            Featured launch
          </span>
        </Link>

        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-sans text-2xl font-semibold tracking-[-0.02em]">{featured.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 font-text text-sm text-slate-ink">
                <Icon name="pin" className="h-4 w-4 text-royal" />
                {featured.location}
              </p>
            </div>
            <span className="grid h-11 shrink-0 place-items-center rounded-xl bg-white px-3 ring-1 ring-ink-900/10">
              <Image src={featured.logo.src} alt={featured.logo.alt} width={featured.logo.w} height={featured.logo.h} className="h-7 w-auto" />
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-900/[0.06]">
            {featured.facts.map((f) => (
              <div key={f.label} className="bg-mist px-4 py-2.5">
                <dd className="font-sans text-base font-semibold tabular-nums">{f.value}</dd>
                <dt className="order-first font-text text-xs text-slate-ink">{f.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex gap-3">
            <Link
              href={href}
              className="lux-focus lux-btn inline-flex flex-1 items-center justify-between gap-2 rounded-full bg-royal py-3 pl-5 font-text text-sm font-semibold text-white transition-[translate,scale,rotate,background-color] duration-500 ease-[var(--ease-spring)] [--island:1.75rem] hover:bg-[#1c3880] active:scale-[0.98]"
            >
              Explore project
              <Arrow />
            </Link>
            <a
              href={featured.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-focus inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 px-5 py-3 font-text text-sm font-semibold transition-[translate,scale,rotate,background-color,border-color] duration-500 ease-[var(--ease-spring)] hover:border-ink-900/30 hover:bg-ink-900/[0.03] active:scale-[0.98]"
            >
              <Icon name="document" className="h-4 w-4" />
              Brochure
            </a>
          </div>
        </div>
      </article>
    </Bezel>
  );
}
