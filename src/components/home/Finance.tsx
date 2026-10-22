import Image from "@/components/Image";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { getSiteMedia, type Img } from "@/sanity/media";
import { ParallaxImage, Reveal, Words } from "./motion";
import { Arrow, Bezel, Icon, lux } from "./ui";

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
    <div
      className={`flex items-center gap-4 rounded-2xl bg-white/95 py-3 pl-3 pr-5 ring-1 ring-ink-900/5 shadow-[0_24px_48px_-24px_rgba(11,23,51,0.35)] ${className}`}
    >
      <span className="grid h-12 shrink-0 place-items-center rounded-xl bg-white px-3 ring-1 ring-ink-900/10">
        <Image src={sbi.src} alt={sbi.alt} width={sbi.width} height={sbi.height} className="h-6 w-auto" />
      </span>
      <span>
        <span className="block font-text text-[15px] font-semibold leading-tight text-ink-900">
          Certificate of Excellence
        </span>
        <span className="mt-1 block font-text text-[13px] text-slate-ink">Awarded by State Bank of India</span>
      </span>
    </div>
  );
}

export default async function Finance() {
  const { featuredAward, partners } = await getSiteMedia();
  const banks = [partners.sbi.logo, partners.pnb.logo];

  return (
    <section className="lux-scope lux-on-light relative isolate bg-white px-4 pb-28 pt-20 text-ink-900 sm:px-6 md:px-10 md:pb-36 md:pt-28">
      {/* Picks up the Stats section's sky wash so the two meet without a seam. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-mist to-transparent" />
      <div className="mx-auto max-w-[1320px]">
        {/* The award photo, framed like the pillar gallery rather than faded into the page;
            the SBI credit rests on its corner. Cropped high so faces and certificate stay in. */}
        <Reveal className="relative">
          <Bezel tone="light" radius="2rem" coreClassName="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/9]">
            <ParallaxImage
              src={featuredAward.src}
              alt={featuredAward.alt}
              className="h-full"
              imageClassName="object-[50%_25%]"
              sizes="(min-width: 1320px) 1320px, 100vw"
              range={30}
            />
          </Bezel>
          <div className="absolute bottom-6 right-6 hidden xl:block 2xl:bottom-8 2xl:right-8">
            <Credit sbi={partners.sbi.logo} />
          </div>
        </Reveal>

        <Reveal className="mt-16 md:mt-24">
          <p className="lux-label text-royal">Financial consulting</p>
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
            <p className="max-w-[30rem] font-text text-lg leading-relaxed text-slate-ink md:text-xl">
              Lean on our long-standing <strong className="font-semibold text-ink-900">SBI and PNB</strong>{" "}
              relationships for stress-free home loans — on projects from only the most trusted builders.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Cta href={site.whatsapp} className={lux.primary}>
                Meet a finance expert <Arrow />
              </Cta>
              <a
                href={site.phone.href}
                className="lux-focus inline-flex items-center gap-2 font-text text-[15px] font-semibold text-ink-900/80 transition-colors hover:text-royal"
              >
                <Icon name="phone" className="h-5 w-5 text-royal" /> {site.phone.display}
              </a>
            </div>
          </Reveal>

          <ol className="border-b border-ink-900/10 lg:col-span-6 lg:col-start-7">
            {perks.map((p, i) => (
              <li key={p.title}>
                <Reveal
                  delay={0.1 + i * 0.06}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink-900/10 py-6 md:grid-cols-[3.5rem_1fr]"
                >
                  <span className="pt-1 font-text text-xs font-semibold tracking-[0.18em] text-royal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-sans text-xl font-semibold tracking-[-0.01em] md:text-2xl">
                      {p.title}
                    </span>
                    <span className="mt-1.5 block font-text text-[15px] leading-relaxed text-slate-ink">{p.text}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* The banking relationship is the differentiator: one quiet band, no card. */}
        <Reveal
          delay={0.1}
          className="mt-20 grid items-start gap-10 border-t border-ink-900/10 pt-12 md:mt-28 lg:grid-cols-[auto_1fr_1fr] lg:gap-16"
        >
          <div>
            <p className="lux-label text-royal">Bank-trusted partner</p>
            <div className="mt-5 flex gap-3">
              {banks.map((b) => (
                <span
                  key={b.src}
                  className="grid h-16 w-32 place-items-center rounded-xl bg-white px-4 ring-1 ring-ink-900/10 shadow-[0_16px_32px_-24px_rgba(11,23,51,0.35)] sm:w-36 md:h-20 md:w-44"
                >
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-9 w-auto md:h-11" />
                </span>
              ))}
            </div>
          </div>
          {proofs.map((p) => (
            <div key={p.title} className="lg:pt-9">
              <p className="font-sans text-lg font-semibold">{p.title}</p>
              <p className="mt-2 max-w-[22rem] font-text text-[15px] leading-relaxed text-slate-ink">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
