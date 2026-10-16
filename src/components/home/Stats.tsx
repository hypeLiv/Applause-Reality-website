import { getSiteMedia } from "@/sanity/media";
import { CountUp, Reveal, Words } from "./motion";
import PillarGallery from "./PillarGallery";

const stats = [
  { to: 1000, suffix: "+", label: "Happy families served" },
  { to: 100, suffix: "%", label: "Satisfied investors" },
  { to: 23, suffix: "+", label: "Years of industry legacy" },
];

export default async function Stats() {
  const { services } = await getSiteMedia();
  const pillars = [
    { label: "Bank-approved homes", ...services.residential },
    { label: "Commercial spaces", ...services.commercial },
    { label: "Investment advisory", ...services.investment },
    { label: "Home-loan support", ...services.homeLoans },
  ];

  return (
    <section className="lux-scope lux-grain relative isolate overflow-hidden bg-ink-950 px-6 py-28 text-ivory md:px-10 md:py-36">
      <div className="absolute left-1/2 top-0 -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-royal/35 blur-[150px]" />
      {/* Starts in the Journey section's ink so the two dark sections meet without a seam. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-ink-900 to-transparent" />
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <Reveal>
            <p className="lux-label text-accent-soft">All solutions. One trusted partner.</p>
          </Reveal>
          <Words
            text="Homes, offices, investments and loans — *under one roof.*"
            className="lux-display mx-auto mt-7 max-w-[18ch] text-[clamp(2.6rem,5vw,4.75rem)]"
          />
        </div>

        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <PillarGallery pillars={pillars} />
        </Reveal>

        <dl className="mt-20 grid gap-y-12 md:mt-24 md:grid-cols-3 md:gap-x-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-t border-white/12 pt-6">
              <dt className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-ivory/60">
                {s.label}
              </dt>
              <dd className="mt-5 font-sans text-[clamp(4rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.04em] text-ivory tabular-nums">
                <CountUp to={s.to} />
                {s.suffix}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
