import Image from "next/image";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { getSiteMedia, type Img } from "@/sanity/media";
import { ParallaxImage, Reveal, Words } from "./motion";
import { Arrow, Icon, lux } from "./ui";

const perks = [
  { title: "White-glove paperwork", text: "Every form, check and signature managed for you." },
  { title: "Care beyond possession", text: "We stay on call long after the handover." },
  { title: "Tailored to you", text: "Solutions shaped around diverse client backgrounds." },
];

const proofs = [
  { title: "Priority processing", text: "Fast-track home loans for SBI and PNB employees." },
  { title: "Direct bank lines", text: "Straight into SBI and PNB for faster approvals." },
];

/** The SBI award, credited like a photo caption rather than a badge. */
function Credit({ sbi, className = "" }: { sbi: Img; className?: string }) {
  return (
    <div className={`lux-glass flex items-center gap-4 rounded-2xl py-3 pl-3 pr-5 ${className}`}>
      <span className="grid h-12 shrink-0 place-items-center rounded-xl bg-white px-3">
        <Image src={sbi.src} alt="" width={sbi.width} height={sbi.height} className="h-6 w-auto" />
      </span>
      <span>
        <span className="block font-text text-[15px] font-semibold leading-tight text-ivory">
          Certificate of Excellence
        </span>
        <span className="mt-1 block font-text text-[13px] text-ivory/60">Awarded by State Bank of India</span>
      </span>
    </div>
  );
}

export default async function Finance() {
  const { featuredAward, partners } = await getSiteMedia();
  const banks = [partners.sbi.logo, partners.pnb.logo];

  return (
    <section className="lux-scope relative isolate bg-ink-950 text-ivory">
      {/* Full-bleed award photo. Framed high so faces and certificate stay clear of the headline below. */}
      <div className="relative aspect-[4/5] md:aspect-auto md:h-[78svh] md:min-h-[520px] lg:h-[100svh] lg:max-h-[1080px] lg:min-h-[680px]">
        <ParallaxImage
          src={featuredAward.src}
          alt={featuredAward.alt}
          className="h-full"
          imageClassName="object-[50%_20%] lg:object-[50%_15%]"
          range={40}
        />
        <span aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink-950 via-ink-950/75 to-transparent"
        />
        <Reveal delay={0.2} className="absolute bottom-[34%] right-8 hidden xl:block 2xl:right-14">
          <Credit sbi={partners.sbi.logo} />
        </Reveal>
      </div>

      <div className="relative -mt-[clamp(4.5rem,14vw,12rem)] px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="lux-label text-accent-soft">Financial consulting</p>
          </Reveal>
          <Words
            text="Ensure stability with *financial* consulting."
            className="lux-display mt-6 max-w-[16ch] text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[0.98]"
          />
          <Reveal delay={0.15} className="mt-8 xl:hidden">
            <Credit sbi={partners.sbi.logo} className="inline-flex" />
          </Reveal>

          <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="max-w-[30rem] font-text text-lg leading-relaxed text-ivory/70 md:text-xl">
                Lean on our long-standing <strong className="font-semibold text-ivory">SBI and PNB</strong>{" "}
                relationships for stress-free home loans — on projects from only the most trusted builders.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Cta href={site.whatsapp} className={lux.primary}>
                  Meet a finance expert <Arrow />
                </Cta>
                <a
                  href={site.phone.href}
                  className="lux-focus inline-flex items-center gap-2 font-text text-[15px] font-semibold text-ivory/85 hover:text-ivory"
                >
                  <Icon name="phone" className="h-5 w-5" /> {site.phone.display}
                </a>
              </div>
            </Reveal>

            <ol className="border-b border-white/10 lg:col-span-6 lg:col-start-7">
              {perks.map((p, i) => (
                <li key={p.title}>
                  <Reveal
                    delay={0.1 + i * 0.06}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-white/10 py-6 md:grid-cols-[3.5rem_1fr]"
                  >
                    <span className="pt-1 font-text text-xs font-semibold tracking-[0.18em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-sans text-xl font-semibold tracking-[-0.01em] md:text-2xl">
                        {p.title}
                      </span>
                      <span className="mt-1.5 block font-text text-[15px] leading-relaxed text-ivory/60">
                        {p.text}
                      </span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* The banking relationship is the differentiator: one quiet band, no card. */}
          <Reveal
            delay={0.1}
            className="mt-20 grid items-start gap-10 border-t border-white/10 pt-12 md:mt-28 lg:grid-cols-[auto_1fr_1fr] lg:gap-16"
          >
            <div>
              <p className="lux-label text-accent-soft">Bank-trusted partner</p>
              <div className="mt-5 flex gap-3">
                {banks.map((b) => (
                  <span key={b.src} className="grid h-16 w-36 place-items-center rounded-xl bg-white px-4 md:h-20 md:w-44">
                    <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-9 w-auto md:h-11" />
                  </span>
                ))}
              </div>
            </div>
            {proofs.map((p) => (
              <div key={p.title} className="lg:pt-9">
                <p className="font-sans text-lg font-semibold">{p.title}</p>
                <p className="mt-2 max-w-[22rem] font-text text-[15px] leading-relaxed text-ivory/60">{p.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
