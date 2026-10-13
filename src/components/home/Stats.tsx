import { CountUp, Reveal, Words } from "./motion";

const stats = [
  { to: 1000, suffix: "+", label: "Happy families served" },
  { to: 100, suffix: "%", label: "Satisfied investors" },
  { to: 23, suffix: "+", label: "Years of industry legacy" },
];

const pillars = ["Bank-approved homes", "Commercial spaces", "Investment advisory", "Home-loan support"];

export default function Stats() {
  return (
    <section className="lux-scope lux-grain relative isolate overflow-hidden bg-ink-950 px-6 py-28 text-ivory md:px-10 md:py-36">
      <div className="absolute left-1/2 top-0 -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-royal/35 blur-[150px]" />
      <div className="mx-auto max-w-[1320px] text-center">
        <Reveal>
          <p className="lux-label text-brass-soft">All solutions. One trusted partner.</p>
        </Reveal>
        <Words
          text="Homes, offices, investments and loans — *under one roof.*"
          className="lux-display mx-auto mt-7 max-w-[18ch] text-[clamp(2.6rem,5vw,4.75rem)]"
        />
        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {pillars.map((p) => (
              <li
                key={p}
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-text text-sm text-ivory/80"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <dl className="mt-20 grid border-y border-white/10 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`flex flex-col items-center gap-3 py-12 ${
                i ? "border-t border-white/10 md:border-l md:border-t-0" : ""
              }`}
            >
              <dd className="font-serif text-[clamp(4rem,7vw,6.5rem)] leading-none text-brass tabular-nums">
                <CountUp to={s.to} />
                {s.suffix}
              </dd>
              <dt className="order-last font-text text-xs font-semibold uppercase tracking-[0.18em] text-ivory/65">
                {s.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
