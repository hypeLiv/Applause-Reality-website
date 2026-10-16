"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import BrandTagline from "@/components/BrandTagline";
import { Cta } from "@/components/sections";
import type { Project } from "@/content/projects";
import { site } from "@/lib/site";
import type { Img } from "@/sanity/media";
import { EASE, Words } from "./motion";
import { Arrow, Icon, lux } from "./ui";


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
        className="lux-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-white lg:min-h-[max(720px,100svh)]"
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
        {/* Legibility: the photo's own dark wall carries the copy, so the veils stay light
            and the skyline keeps its daylight; the card carries its own glass */}
        <div className="absolute inset-0 -z-10 bg-ink-950/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/75 via-ink-950/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink-950/65 to-transparent" />

        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="mx-auto grid w-full max-w-[1320px] flex-1 items-center gap-12 px-6 pb-8 pt-28 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          {/* Brand promise */}
          <div>
            <motion.p {...rise(0.1)} className="lux-label text-accent-soft">
              Delhi NCR&apos;s most trusted assets
            </motion.p>
            <Words
              as="h1"
              immediate
              delay={0.2}
              text="Expert advocacy for your *lifetime* real estate goals."
              className="lux-display mt-6 max-w-[15ch] text-[clamp(2.4rem,4.2vw,4.25rem)] leading-[1.02]"
            />
            <motion.div {...rise(0.6)} className="mt-7">
              <BrandTagline onDark size="lg" />
            </motion.div>
            <motion.p
              {...rise(0.72)}
              className="mt-6 max-w-[34rem] font-text text-base leading-relaxed text-white/80 md:text-lg"
            >
              Only 100% bank-approved residential and corporate properties — with a consultant who
              stays beside you from the first site visit to long after possession.
            </motion.p>
            <motion.div {...rise(0.85)} className="mt-9 flex flex-wrap gap-3">
              <Cta href={site.whatsapp} className={lux.heroPrimary}>
                Book a free consultation <Arrow />
              </Cta>
              <Cta href="/projects" className={lux.heroGlass}>
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
          className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center gap-x-8 gap-y-4 px-6 pb-6 md:px-12 md:pb-8"
        >
          <a
            href={site.phone.href}
            className="lux-focus group flex items-center gap-3 font-text text-sm text-white/75 transition-colors hover:text-white"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-colors group-hover:bg-white/25">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            Speak to an advisor · {site.phone.display}
          </a>
          <span aria-hidden className="hidden h-5 w-px bg-white/25 md:block" />
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 font-text text-sm text-white/75">
            <li className="flex items-center gap-2">
              Verified by
              <span className="flex items-center gap-1.5">
                <span className="grid h-7 place-items-center rounded-full bg-white px-2.5">
                  <Image src={banks.sbi.src} alt="SBI" width={banks.sbi.width} height={banks.sbi.height} className="h-4 w-auto" />
                </span>
                <span className="grid h-7 place-items-center rounded-full bg-white px-2.5">
                  <Image src={banks.pnb.src} alt="PNB" width={banks.pnb.width} height={banks.pnb.height} className="h-4 w-auto" />
                </span>
              </span>
            </li>
            <li>
              <span className="font-semibold text-white tabular-nums">23+</span> years
            </li>
            <li>
              <span className="font-semibold text-white tabular-nums">1000+</span> families
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
    <article className="lux-glass group overflow-hidden rounded-[24px] text-white">
      <Link href={href} className="lux-focus relative block aspect-[2/1] overflow-hidden" tabIndex={-1} aria-hidden>
        <Image
          src={featured.photo}
          alt={featured.photoAlt}
          fill
          sizes="(min-width: 1024px) 460px, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/80 to-transparent" />
        <span className="absolute bottom-3 left-4 font-text text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
          Bank approved · Corporate &amp; HR schemes
        </span>
        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink-950/60 px-3 py-1.5 font-text text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Featured launch
        </span>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-2xl font-semibold tracking-[-0.02em]">{featured.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 font-text text-sm text-white/70">
              <Icon name="pin" className="h-4 w-4 text-accent-soft" />
              {featured.location}
            </p>
          </div>
          <span className="grid h-11 shrink-0 place-items-center rounded-xl bg-white px-3">
            <Image src={featured.logo.src} alt={featured.logo.alt} width={featured.logo.w} height={featured.logo.h} className="h-7 w-auto" />
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
          {featured.facts.map((f) => (
            <div key={f.label} className="bg-ink-950/40 px-4 py-2.5">
              <dd className="font-sans text-base font-semibold tabular-nums">{f.value}</dd>
              <dt className="order-first font-text text-xs text-white/60">{f.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex gap-3">
          <Link
            href={href}
            className="lux-focus group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ivory px-5 py-3 font-text text-sm font-semibold text-ink-950 transition-colors hover:bg-white"
          >
            Explore project
            <Icon name="arrow" className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          <a
            href={featured.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-focus inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 font-text text-sm font-semibold transition-colors hover:bg-white/10"
          >
            <Icon name="document" className="h-4 w-4" />
            Brochure
          </a>
        </div>
      </div>
    </article>
  );
}
