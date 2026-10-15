import Image from "next/image";
import { Reveal, Words } from "./motion";

const partners = [
  { src: "/images/godrej.png", alt: "Godrej Properties", w: 203, h: 83, kind: "Developer" },
  { src: "/images/sbi.png", alt: "State Bank of India", w: 157, h: 68, kind: "Banking" },
  { src: "/images/gulshan.png", alt: "Gulshan Group", w: 184, h: 100, kind: "Developer" },
  { src: "/images/pnb-full.png", alt: "Punjab National Bank", w: 327, h: 103, kind: "Banking" },
  { src: "/images/eternia.png", alt: "Eternia Residences", w: 178, h: 96, kind: "Developer" },
];

export default function Partners() {
  // Two copies side by side; the track slides by exactly one copy for a seamless loop.
  const track = [...partners, ...partners];

  return (
    <section className="lux-scope lux-on-light bg-ivory py-28 text-ink-900 md:py-36">
      <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <Reveal>
          <p className="lux-label text-royal">Aligned with global quality standards</p>
        </Reveal>
        <Words
          text="Partnered only with names you *already trust.*"
          className="lux-display mx-auto mt-7 max-w-[16ch] text-[clamp(2.6rem,5vw,4.75rem)]"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[36rem] font-text text-lg leading-relaxed text-slate-ink">
            We work exclusively with reputable developers and banking institutions that share our
            client-first standard.
          </p>
        </Reveal>
      </div>

      <div
        className="lux-marquee-wrap mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        aria-label="Our partners"
        role="region"
      >
        <ul className="lux-marquee flex w-max gap-6">
          {track.map((p, i) => (
            <li
              key={`${p.src}-${i}`}
              aria-hidden={i >= partners.length}
              className="group flex h-36 w-64 shrink-0 flex-col items-center justify-center gap-3 rounded-[18px] bg-white px-8 shadow-[0_1px_0_rgba(11,23,51,0.06),0_20px_40px_-28px_rgba(11,23,51,0.35)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={p.src}
                alt={i < partners.length ? p.alt : ""}
                width={p.w}
                height={p.h}
                className="h-14 w-auto max-w-full object-contain"
              />
              <span className="font-text text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-ink">
                {p.kind}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
