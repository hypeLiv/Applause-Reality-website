"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Reveal, Words } from "@/components/home/motion";

type Step = { title: string; text: string };

/** How much of each column shows before the scene starts, so the row arrives staggered. */
const START_VISIBLE = [0.34, 0.24, 0.16, 0.1];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The journey as a pinned scroll scene: four columns rise into place, then a
 * wheel rolls from the first milestone to the last. It starts as a rough
 * polygon on a bumpy road and arrives a perfect circle on a flat one — the
 * bumps are the process, the smoothness is what we hand back.
 *
 * Every column carries its own copy of the line art, shifted by its offset,
 * so each clips the drawing to itself and the gaps stay clean. Desktop only;
 * with reduced motion the finished scene renders without pinning.
 */
export default function RollingJourney({
  label,
  title,
  intro,
  route,
  steps,
  className = "",
}: {
  label: string;
  title: string;
  intro: string;
  route: [string, string];
  steps: Step[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLOListElement>(null);
  const colRefs = useRef<(HTMLLIElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const roadRefs = useRef<(SVGPathElement | null)[]>([]);
  const wheelRefs = useRef<(SVGPathElement | null)[]>([]);
  const hubRefs = useRef<(SVGCircleElement | null)[]>([]);
  const reduce = useReducedMotion();

  const [geo, setGeo] = useState({ w: 0, h: 0, offsets: [] as number[], centers: [] as number[] });
  const geoRef = useRef(geo);
  geoRef.current = geo;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Columns are laid out by CSS; the drawing works in the grid's own pixel space.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const cols = colRefs.current.filter(Boolean) as HTMLLIElement[];
      if (!cols.length) return;
      setGeo({
        w: grid.clientWidth,
        h: cols[0].clientHeight,
        offsets: cols.map((c) => c.offsetLeft),
        centers: cols.map((c) => c.offsetLeft + c.clientWidth / 2),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  const draw = useCallback(
    (raw: number) => {
      const p = reduce ? 1 : raw;
      const { w, h, centers } = geoRef.current;

      // 1 · Columns rise, staggered left to right.
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        const r = ease(clamp((p - i * 0.07) / 0.3));
        const visible = lerp(START_VISIBLE[i] ?? 0.1, 1, r);
        col.style.clipPath = `inset(${((1 - visible) * 100).toFixed(2)}% 0 0 0 round 22px)`;
        const num = numRefs.current[i];
        if (num) num.style.opacity = String(clamp((r - 0.8) / 0.2));
      });
      if (!w || !h || centers.length < 2) return;

      // 2 · The wheel rolls once the row is mostly up; the road calms as it goes.
      const t = clamp((p - 0.3) / 0.62);
      const R = Math.min(h * 0.14, w * 0.07);
      const axle = h * 0.36;
      const ground = axle + R;
      const amp = R * 0.42 * Math.pow(1 - t, 1.3);
      const period = lerp(R * 2.8, R * 1.5, t);
      const roadY = (x: number) => ground - amp * Math.abs(Math.sin((Math.PI * x) / period));

      let road = `M0 ${roadY(0).toFixed(1)}`;
      for (let x = 4; x <= w + 4; x += 4) road += ` L${x} ${roadY(x).toFixed(1)}`;

      const x0 = centers[0];
      const x1 = centers[centers.length - 1];
      const cx = lerp(x0, x1, ease(t) * 0.15 + t * 0.85);
      const cy = roadY(cx) - R;
      const spin = (cx - x0) / R;
      const sides = t > 0.97 ? 96 : Math.round(5 + 40 * t * t);
      let wheel = "";
      for (let k = 0; k < sides; k++) {
        const a = spin + (Math.PI * 2 * k) / sides;
        wheel += `${k ? "L" : "M"}${(cx + R * Math.cos(a)).toFixed(1)} ${(cy + R * Math.sin(a)).toFixed(1)}`;
      }
      wheel += "Z";
      const show = String(clamp(t * 10));

      roadRefs.current.forEach((el) => el?.setAttribute("d", road));
      wheelRefs.current.forEach((el) => {
        if (!el) return;
        el.setAttribute("d", wheel);
        el.style.opacity = show;
      });
      hubRefs.current.forEach((el) => {
        if (!el) return;
        el.setAttribute("cx", cx.toFixed(1));
        el.setAttribute("cy", cy.toFixed(1));
        el.style.opacity = show;
      });
    },
    [reduce],
  );

  useMotionValueEvent(scrollYProgress, "change", draw);
  useEffect(() => draw(scrollYProgress.get()), [draw, geo, scrollYProgress]);

  const axleY = geo.h * 0.36;

  return (
    <section
      ref={sectionRef}
      className={`lux-scope lux-on-light relative bg-mist text-ink-900 ${className}`}
      style={{ height: reduce ? undefined : "330vh" }}
    >
      <div className={`${reduce ? "" : "sticky top-0 h-[100svh]"} flex flex-col px-10 pb-8 pt-28`}>
        <div className="mx-auto grid w-full max-w-[1320px] items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="lux-label text-royal">{label}</p>
            </Reveal>
            <Words text={title} className="lux-display mt-5 text-[clamp(2.2rem,3.4vw,3.4rem)]" />
          </div>
          <Reveal delay={0.1}>
            <p className="flex items-center gap-3 font-text text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              {route[0]}
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M0 5h20M16 1l4 4-4 4" />
              </svg>
              {route[1]}
            </p>
            <p className="mt-3 max-w-[34rem] font-text text-[17px] leading-relaxed text-slate-ink">{intro}</p>
          </Reveal>
        </div>

        <ol
          ref={gridRef}
          className={`relative mx-auto mt-10 grid w-full max-w-[1320px] grid-cols-4 gap-3 ${reduce ? "h-[560px]" : "min-h-0 flex-1"}`}
        >
          {steps.map((s, i) => (
            <li
              data-backdrop="dark"
              key={s.title}
              ref={(el) => {
                colRefs.current[i] = el;
              }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-b from-periwinkle to-royal p-7 text-ivory"
              style={{ clipPath: `inset(${((1 - (START_VISIBLE[i] ?? 0.1)) * 100).toFixed(2)}% 0 0 0 round 22px)` }}
            >
              {geo.w > 0 && (
                <svg
                  aria-hidden
                  className="pointer-events-none absolute top-0 h-full"
                  style={{ left: -(geo.offsets[i] ?? 0), width: geo.w }}
                  viewBox={`0 0 ${geo.w} ${geo.h}`}
                  fill="none"
                  stroke="#f7f4ee"
                >
                  <line x1="0" x2={geo.w} y1={axleY} y2={axleY} strokeWidth="1" strokeDasharray="6 7" strokeOpacity="0.7" />
                  <path
                    ref={(el) => {
                      roadRefs.current[i] = el;
                    }}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    ref={(el) => {
                      wheelRefs.current[i] = el;
                    }}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{ opacity: 0 }}
                  />
                  <circle
                    ref={(el) => {
                      hubRefs.current[i] = el;
                    }}
                    r="3.5"
                    fill="#f7f4ee"
                    stroke="none"
                    style={{ opacity: 0 }}
                  />
                </svg>
              )}

              <span
                ref={(el) => {
                  numRefs.current[i] = el;
                }}
                className="relative font-text text-sm font-semibold tabular-nums tracking-[0.12em] text-ivory/85"
                style={{ opacity: 0 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <h3 className="lux-display text-[clamp(1.8rem,2.4vw,2.4rem)] leading-[1.02]">{s.title}</h3>
                <p className="mt-3 max-w-[20rem] font-text text-[15px] leading-relaxed text-ivory/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
