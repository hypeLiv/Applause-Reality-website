import { getSiteMedia } from "@/sanity/media";
import { CountUp, Reveal, Words } from "./motion";
import PillarGallery from "./PillarGallery";
import { Bezel } from "./ui";

// The lead figure gets the tall bento cell; the other two stack beside it.
const lead = {
  to: 1000,
  suffix: "+",
  label: "Happy families served",
  note: "First homes, upgrades and investments across Noida, Greater Noida and Wave City.",
};
const stats = [
  { to: 100, suffix: "%", label: "Satisfied investors" },
  { to: 23, suffix: "+", label: "Years of industry legacy" },
];

const core = "bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 md:p-10";

export default async function Stats() {
  const { services } = await getSiteMedia();
  const pillars = [
    { label: "Bank-approved homes", ...services.residential },
    { label: "Commercial spaces", ...services.commercial },
    { label: "Investment advisory", ...services.investment },
    { label: "Home-loan support", ...services.homeLoans },
  ];

  return (
    <section className="lux-scope lux-grain relative isolate overflow-hidden bg-ink-950 px-4 sm:px-6 py-28 text-ivory md:px-10 md:py-36">
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

        {/* Asymmetric bento: the lead figure spans both rows on desktop; one column on phones. */}
        <div className="mt-20 grid gap-4 md:mt-24 md:grid-cols-12 md:grid-rows-2 md:gap-5">
          <Reveal className="md:col-span-7 md:row-span-2">
            <Bezel className="h-full" coreClassName={core}>
              <dl className="flex h-full min-h-[300px] flex-col justify-between gap-12 md:min-h-[440px]">
                <dt className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-ivory/60">
                  {lead.label}
                </dt>
                <dd>
                  <span className="block font-sans text-[clamp(5rem,11vw,10rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-ivory tabular-nums">
                    <CountUp to={lead.to} />
                    {lead.suffix}
                  </span>
                  <span className="mt-6 block max-w-[26rem] font-text text-[15px] leading-relaxed text-ivory/60">
                    {lead.note}
                  </span>
                </dd>
              </dl>
            </Bezel>
          </Reveal>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 + i * 0.08} className="md:col-span-5">
              <Bezel className="h-full" coreClassName={core}>
                <dl className="flex h-full min-h-[180px] flex-col justify-between gap-10">
                  <dt className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-ivory/60">
                    {s.label}
                  </dt>
                  <dd className="font-sans text-[clamp(3.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] text-ivory tabular-nums">
                    <CountUp to={s.to} />
                    {s.suffix}
                  </dd>
                </dl>
              </Bezel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
