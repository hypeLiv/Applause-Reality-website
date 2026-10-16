import Image from "next/image";
import { getSiteMedia } from "@/sanity/media";
import { Reveal, Words } from "./motion";
import { Bezel } from "./ui";

export default async function Partners() {
  const { partners: logos } = await getSiteMedia();
  const partners = [
    { ...logos.godrej.logo, kind: "Developer" },
    { ...logos.sbi.logo, kind: "Banking" },
    { ...logos.gulshan.logo, kind: "Developer" },
    { ...logos.pnb.logoWide, kind: "Banking" },
    { ...logos.eternia.logo, kind: "Developer" },
  ];
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
        <ul className="lux-marquee flex w-max gap-6 py-3">
          {track.map((p, i) => (
            <li
              key={`${p.src}-${i}`}
              aria-hidden={i >= partners.length}
              className="h-40 w-[17rem] shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1"
            >
              <Bezel
                tone="light"
                radius="1.5rem"
                className="h-full"
                coreClassName="flex flex-col items-center justify-center gap-3 bg-white px-8"
              >
                <Image
                  src={p.src}
                  alt={i < partners.length ? p.alt : ""}
                  width={p.width}
                  height={p.height}
                  className="h-14 w-auto max-w-full object-contain"
                />
                <span className="font-text text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-ink">
                  {p.kind}
                </span>
              </Bezel>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
