"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { EASE } from "@/components/home/motion";
import { Arrow, Icon, lux } from "@/components/home/ui";
import { Cta } from "@/components/sections";
import type { Project } from "@/content/projects";
import { site } from "@/lib/site";

/**
 * Projects as a "works wheel": on arrival the project images sit in a ring
 * around a title; scrolling folds the ring into a 3D drum that turns one
 * project at a time while the details swap in on the left. Phones and
 * reduced-motion get a stacked list instead (switched in CSS).
 */
export default function ProjectsWheel({ projects }: { projects: Project[] }) {
  return (
    <section aria-label="Current launches" className="lux-scope bg-ink-950 text-ivory">
      <div className="hidden lg:block motion-reduce:hidden">
        <Wheel projects={projects} />
      </div>
      <div className="lg:hidden motion-reduce:block">
        <Stacked projects={projects} />
      </div>
    </section>
  );
}

// ─── Desktop wheel ─────────────────────────────────────────────

const INTRO_VH = 100; // scroll spent folding the ring into the drum
const STEP_VH = 80; // scroll per project
const STEP_DEG = 55; // drum rotation between neighbouring projects (wide enough that neighbours clear the front card)

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Wheel({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const rangeVh = INTRO_VH + (n - 1) * STEP_VH;
  const sectionRef = useRef<HTMLDivElement>(null);
  const vw = useMotionValue(1440);
  const vh = useMotionValue(900);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const scrolledVh = useTransform(scrollYProgress, (p) => p * rangeVh);
  const mix = useSpring(
    useTransform(scrolledVh, (v) => clamp((v - 10) / (INTRO_VH - 25), 0, 1)),
    { stiffness: 150, damping: 28 },
  );
  const posRaw = useTransform(scrolledVh, (v) => clamp((v - INTRO_VH) / STEP_VH, 0, n - 1));
  const pos = useSpring(posRaw, { stiffness: 150, damping: 28 });

  const [active, setActive] = useState(0);
  useMotionValueEvent(posRaw, "change", (v) => {
    const a = Math.round(v);
    setActive((c) => (c === a ? c : a));
  });

  const titleOpacity = useTransform(mix, [0, 0.5], [1, 0]);
  const titleScale = useTransform(mix, [0, 1], [1, 0.9]);
  const panelOpacity = useTransform(mix, [0.55, 1], [0, 1]);
  const panelX = useTransform(mix, [0.55, 1], [-24, 0]);
  const [panelLive, setPanelLive] = useState(false);
  useMotionValueEvent(mix, "change", (m) => setPanelLive((live) => (live === m > 0.8 ? live : m > 0.8)));

  useLayoutEffect(() => {
    const measure = () => {
      vw.set(window.innerWidth);
      vh.set(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [vw, vh]);

  /** Scroll so project i sits in the front of the drum. */
  const jumpTo = useCallback(
    (i: number, smooth = true) => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + ((INTRO_VH + i * STEP_VH) / 100) * window.innerHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [],
  );

  // Deep links like /projects#hero-homes land on that project in the drum.
  useEffect(() => {
    const go = () => {
      if (!window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
      const i = projects.findIndex((p) => `#${p.key}` === window.location.hash);
      if (i >= 0) window.setTimeout(() => jumpTo(i, false), 60);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [projects, jumpTo]);

  // Ring = every project's photo and highlights sheet; the drum keeps the photos.
  const ringItems = projects.flatMap((p, i) => [
    { key: `${p.key}-photo`, src: p.photo, project: i, kind: "photo" as const },
    { key: `${p.key}-hl`, src: p.highlights, project: i, kind: "highlights" as const },
  ]);
  const current = projects[active];

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${100 + rangeVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Soft glow behind the stage */}
        <div aria-hidden className="absolute left-[62%] top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/25 blur-[150px]" />

        {/* 3D stage */}
        <div className="absolute inset-0" style={{ perspective: 1600 }}>
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {ringItems.map((item, k) => (
              <WheelCard
                key={item.key}
                src={item.src}
                kind={item.kind}
                project={item.project}
                slot={k}
                slots={ringItems.length}
                mix={mix}
                pos={pos}
                vw={vw}
                vh={vh}
                alt={item.kind === "photo" ? projects[item.project].photoAlt : ""}
              />
            ))}
          </div>
        </div>

        {/* Ring title */}
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <p className="lux-label text-brass-soft">Current launches</p>
          <p className="mt-4 font-sans text-[clamp(2.6rem,4.4vw,4.4rem)] font-semibold leading-none tracking-[-0.04em]">
            Launches &rsquo;26
          </p>
          <p className="mt-5 flex items-center gap-3 font-text text-xs font-semibold uppercase tracking-[0.2em] text-ivory/50">
            Scroll to explore <span aria-hidden>↓</span>
          </p>
        </motion.div>

        {/* Details panel */}
        <motion.div
          style={{ opacity: panelOpacity, x: panelX }}
          className={`absolute left-[6vw] top-1/2 w-[min(36vw,520px)] -translate-y-1/2 pt-10 ${
            panelLive ? "" : "pointer-events-none"
          }`}
          aria-hidden={!panelLive}
        >
          <ol className="flex flex-wrap gap-2" aria-label="Projects">
            {projects.map((p, i) => (
              <li key={p.key}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  tabIndex={panelLive ? 0 : -1}
                  className={`lux-focus rounded-full px-3 py-1.5 font-text text-xs font-semibold transition-colors ${
                    i === active ? "bg-ivory text-ink-950" : "text-ivory/55 hover:bg-white/10 hover:text-ivory"
                  }`}
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> {p.name}
                </button>
              </li>
            ))}
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-8"
            >
              <ProjectDetails project={current} index={active} tabbable={panelLive} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function WheelCard({
  src,
  alt,
  kind,
  project,
  slot,
  slots,
  mix,
  pos,
  vw,
  vh,
}: {
  src: string;
  alt: string;
  kind: "photo" | "highlights";
  project: number;
  slot: number;
  slots: number;
  mix: MotionValue<number>;
  pos: MotionValue<number>;
  vw: MotionValue<number>;
  vh: MotionValue<number>;
}) {
  const layout = (m: number, p: number, w: number, h: number) => {
    const vp = { w, h };
    const cardW = clamp(vp.w * 0.36, 420, 560);

    // Ring placement: evenly spaced, tilted along the circle.
    const phi = ((-90 + (slot * 360) / slots) * Math.PI) / 180;
    const radius = Math.min(vp.h * 0.34, 320);
    const ringX = Math.cos(phi) * radius;
    const ringY = Math.sin(phi) * radius;
    let ringRot = (slot * 360) / slots;
    if (ringRot > 180) ringRot -= 360;
    const ringScale = 0.34;

    if (kind === "highlights") {
      // Highlights sheets only live in the ring; they shrink away as it folds.
      const fade = clamp(1 - m * 1.8, 0, 1);
      return {
        transform: `translate(-50%, -50%) translate3d(${ringX * (1 - m * 0.4)}px, ${ringY * (1 - m * 0.4)}px, 0px) rotateZ(${ringRot}deg) scale(${ringScale * (1 - m * 0.5)})`,
        opacity: fade,
        width: cardW,
      };
    }

    // Drum placement: a vertical cylinder, offset to the right of centre.
    const d = project - p;
    const theta = (d * STEP_DEG * Math.PI) / 180;
    const drumR = vp.h * 0.55;
    const drumX = vp.w * 0.17;
    const drumY = Math.sin(theta) * drumR;
    const drumZ = (Math.cos(theta) - 1) * drumR;
    const a = Math.abs(d);
    const drumOpacity = a < 0.5 ? 1 : clamp(1 - (a - 0.5) * 0.75, 0, 1);

    return {
      transform: `translate(-50%, -50%) translate3d(${lerp(ringX, drumX, m)}px, ${lerp(ringY, drumY, m)}px, ${lerp(0, drumZ, m)}px) rotateX(${lerp(0, -d * STEP_DEG, m)}deg) rotateZ(${lerp(ringRot, 0, m)}deg) scale(${lerp(ringScale, 1, m)})`,
      opacity: lerp(1, drumOpacity, m),
      width: cardW,
    };
  };
  const inputs = [mix, pos, vw, vh];
  const transform = useTransform(inputs, ([m, p, w, h]: number[]) => layout(m, p, w, h).transform);
  const opacity = useTransform(inputs, ([m, p, w, h]: number[]) => layout(m, p, w, h).opacity);
  const width = useTransform(inputs, ([m, p, w, h]: number[]) => layout(m, p, w, h).width);

  return (
    <motion.div
      style={{ transform, opacity, width }}
      className="absolute left-1/2 top-1/2 aspect-[4/3] overflow-hidden rounded-[22px] bg-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] will-change-transform"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="560px"
        className={kind === "highlights" ? "object-cover object-top" : "object-cover"}
      />
    </motion.div>
  );
}

// ─── Shared details ────────────────────────────────────────────

function ProjectDetails({ project: p, index, tabbable = true }: { project: Project; index: number; tabbable?: boolean }) {
  const tab = tabbable ? undefined : -1;
  return (
    <div>
      <p className="flex items-center gap-2 font-text text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
        <span className="tabular-nums text-brass">{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden className="h-px w-6 bg-brass" />
        {p.location}
      </p>
      <div className="mt-4 flex items-center gap-4">
        <h2 className="font-sans text-[clamp(2.2rem,3.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {p.name}
        </h2>
        {p.featured && (
          <span className="shrink-0 rounded-full border border-brass/50 px-3 py-1 font-text text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-soft">
            Featured
          </span>
        )}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
        {p.facts.map((f) => (
          <div key={f.label} className="bg-ink-950 px-4 py-3">
            <dd className="font-sans text-base font-semibold tabular-nums">{f.value}</dd>
            <dt className="order-first font-text text-xs text-ivory/55">{f.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-5 font-text text-[15px] leading-relaxed text-ivory/70">{p.summary}</p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Cta href={site.whatsappProjects} className={lux.gold}>
          Know more <Arrow />
        </Cta>
        <a
          href={p.brochure}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tab}
          className={lux.ghostDark}
        >
          <Icon name="download" className="h-4 w-4" /> Brochure
        </a>
        <HighlightsButton project={p} tabIndex={tab} />
      </div>
    </div>
  );
}

/** "View highlights" opens the project's highlights sheet in a modal. */
function HighlightsButton({ project: p, tabIndex }: { project: Project; tabIndex?: number }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        tabIndex={tabIndex}
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

// ─── Phones / reduced motion ───────────────────────────────────

function Stacked({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-16 px-6 py-20">
      <div>
        <p className="lux-label text-brass-soft">Current launches</p>
        <p className="mt-4 font-sans text-4xl font-semibold tracking-[-0.04em]">Launches &rsquo;26</p>
      </div>
      {projects.map((p, i) => (
        <article key={p.key} id={p.key} className="scroll-mt-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
            <Image src={p.photo} alt={p.photoAlt} fill sizes="100vw" className="object-cover" />
            <span className="absolute left-3 top-3 grid h-10 place-items-center rounded-xl bg-white px-3">
              <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.w} height={p.logo.h} className="h-6 w-auto" />
            </span>
          </div>
          <div className="mt-6">
            <ProjectDetails project={p} index={i} />
          </div>
        </article>
      ))}
    </div>
  );
}
