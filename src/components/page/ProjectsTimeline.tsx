"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Arrow, Icon, lux } from "@/components/home/ui";
import type { Project } from "@/content/projects";
import { ExpandLink } from "./ExpandTransition";

/**
 * Projects as a scroll timeline: a spine runs down the middle and fills as you
 * scroll, with each project's details and photo alternating either side of it.
 * The project nearest the middle of the screen is lit; the rest wait dimmed.
 * Phones get the same timeline with the spine down the left edge.
 */
export default function ProjectsTimeline({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const fill = useTransform(scrollYProgress, (p) => (reduce ? 1 : p));

  return (
    <section aria-label="Current launches" className="lux-scope bg-ink-950 px-6 py-24 text-ivory md:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-2xl">
          <p className="lux-label text-accent-soft">Current launches</p>
          <h2 className="lux-display mt-6 text-[clamp(2.6rem,5vw,4.5rem)] leading-none">
            Launches &rsquo;26
          </h2>
          <p className="mt-6 font-text text-lg leading-relaxed text-ivory/60">
            {projects.length} bank-approved projects we are guiding families toward right now.
          </p>
        </header>

        <ol ref={listRef} className="relative mt-16 md:mt-24">
          {/* Spine: a faint track with the scroll-driven fill on top. */}
          <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 lg:left-1/2" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent lg:left-1/2"
          />

          {projects.map((p, i) => (
            <Row key={p.key} project={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Row({ project: p, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  // Lit while the row crosses the middle of the screen, dimmed either side.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], reduce ? [1, 1, 1, 1] : [0.3, 1, 1, 0.3]);
  const node = useTransform(scrollYProgress, [0.25, 0.35], reduce ? [1, 1] : [0, 1]);
  const flip = index % 2 === 1;

  return (
    <li ref={ref} id={p.key} data-expand-root className="relative scroll-mt-28 pb-20 pl-10 last:pb-0 md:pb-28 lg:pl-0">
      {/* Node on the spine */}
      <span
        aria-hidden
        className="absolute left-[7px] top-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-ink-950 lg:left-1/2"
      >
        <motion.span style={{ scale: node }} className="h-2 w-2 rounded-full bg-accent" />
      </span>

      <motion.div style={{ opacity }} className="grid items-start gap-6 lg:grid-cols-2 lg:gap-24">
        <article className={`rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 md:p-10 ${flip ? "lg:order-2" : ""}`}>
          <ProjectDetails project={p} index={index} />
        </article>

        <ExpandLink
          href={`/projects/${p.key}`}
          aria-label={`View ${p.name}`}
          className={`lux-focus group block rounded-[28px] lg:mt-16 ${flip ? "lg:order-1" : ""}`}
        >
          <span data-expand-source className="relative block aspect-[5/4] overflow-hidden rounded-[28px] ring-1 ring-white/10">
            <Image
              src={p.photo}
              alt={p.photoAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.03]"
            />
            <span className="absolute left-4 top-4 grid h-11 place-items-center rounded-xl bg-white px-3">
              <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.w} height={p.logo.h} className="h-6 w-auto" />
            </span>
          </span>
        </ExpandLink>
      </motion.div>
    </li>
  );
}

// ─── Details ───────────────────────────────────────────────────

function ProjectDetails({ project: p, index }: { project: Project; index: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="font-text text-sm font-semibold tabular-nums text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-text text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/40">
          {p.featured ? "Featured launch" : `Project ${index + 1}`}
        </span>
      </div>

      <h3 className="lux-display mt-6 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.02]">
        {p.name}
      </h3>
      <p className="mt-3 flex items-center gap-2 font-text text-sm text-ivory/60">
        <Icon name="pin" className="h-4 w-4" />
        {p.location}
      </p>

      <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
        {p.facts.map((f) => (
          <div key={f.label} className="bg-ink-950 px-4 py-3">
            <dd className="font-sans text-base font-semibold tabular-nums">{f.value}</dd>
            <dt className="order-first font-text text-xs text-ivory/55">{f.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-6 font-text text-[15px] leading-relaxed text-ivory/70">{p.summary}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ExpandLink href={`/projects/${p.key}`} className={lux.primary}>
          View project <Arrow />
        </ExpandLink>
        <a href={p.brochure} target="_blank" rel="noopener noreferrer" className={lux.ghostDark}>
          <Icon name="download" className="h-4 w-4" /> Brochure
        </a>
        <HighlightsButton project={p} />
      </div>
    </div>
  );
}

/** "View highlights" opens the project's highlights sheet in a modal. */
function HighlightsButton({ project: p }: { project: Project }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="lux-focus inline-flex items-center gap-2 font-text text-sm font-semibold text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
      >
        <Icon name="document" className="h-4 w-4" /> View highlights
      </button>
      <dialog
        ref={ref}
        aria-label={`${p.name} project highlights`}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        className="m-auto w-[min(92vw,960px)] overflow-visible bg-transparent p-0 backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative overflow-hidden rounded-[24px] bg-white">
          <Image
            src={p.highlights}
            alt={`${p.name} project highlights`}
            width={1600}
            height={1060}
            className="h-auto w-full"
          />
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close highlights"
            className="lux-focus absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink-950/80 text-ivory hover:bg-ink-950"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}
