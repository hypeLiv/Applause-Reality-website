import Image from "next/image";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { Reveal, Words } from "./motion";
import { Arrow, Icon, type IconName, lux } from "./ui";

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: "document", title: "White-glove paperwork", text: "Every form, check and signature managed for you." },
  { icon: "heart", title: "Care beyond possession", text: "We stay on call long after the handover." },
  { icon: "sliders", title: "Tailored to you", text: "Solutions shaped around diverse client backgrounds." },
];

const proofs: { icon: IconName; title: string; text: string }[] = [
  { icon: "check", title: "Certificate of Excellence", text: "Awarded by SBI for outstanding performance." },
  { icon: "key", title: "Priority processing", text: "Fast-track home loans for SBI and PNB employees." },
  { icon: "bank", title: "Direct bank lines", text: "Straight into SBI and PNB for faster approvals." },
];

const banks = [
  { src: "/images/sbi.png", alt: "State Bank of India", w: 157, h: 68, cls: "h-11 md:h-14" },
  { src: "/images/pnb.png", alt: "Punjab National Bank", w: 124, h: 53, cls: "h-10 md:h-12" },
];

export default function Finance() {
  return (
    <section className="lux-scope lux-on-light bg-white px-6 py-28 text-ink-900 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <figure className="group relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(11,23,51,0.55)]">
              {/* Cropped tall, but positioned so both people and the certificate stay in frame. */}
              <Image
                src="/images/award-sbi.png"
                alt="Applause Reality receiving a Certificate of Excellence from State Bank of India"
                width={1475}
                height={1066}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[5/6] w-full object-cover object-[39%_50%] transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/0 via-45% to-transparent" />
              <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8">
                <span>
                  <span className="block font-text text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Recognised by SBI
                  </span>
                  <span className="mt-2 block font-sans text-2xl font-semibold leading-tight tracking-[-0.01em] text-ivory md:text-[1.75rem]">
                    Certificate of Excellence
                  </span>
                </span>
                <span className="grid h-14 shrink-0 place-items-center rounded-2xl bg-white px-4">
                  <Image src="/images/sbi.png" alt="" width={157} height={68} className="h-7 w-auto" />
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <p className="lux-label text-royal">Financial consulting</p>
            </Reveal>
            <Words
              text="Ensure stability with *financial* consulting."
              className="lux-display mt-7 text-[clamp(2.6rem,5vw,4.75rem)]"
            />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[32rem] font-text text-lg leading-relaxed text-slate-ink">
                Lean on our long-standing <strong className="font-semibold text-ink-900">SBI and PNB</strong>{" "}
                relationships for stress-free home loans — on projects from only the most trusted builders.
              </p>
            </Reveal>

            <ul className="mt-10 divide-y divide-ink-900/[0.08] border-y border-ink-900/[0.08]">
              {perks.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={0.1 + i * 0.06} className="flex items-center gap-4 py-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ivory text-royal">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <span className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="font-text text-base font-semibold">{p.title}</span>
                      <span className="font-text text-[15px] text-slate-ink">{p.text}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
              <Cta href={site.whatsapp} className={lux.primary}>
                Meet a finance expert <Arrow />
              </Cta>
              <a
                href={site.phone.href}
                className="lux-focus inline-flex items-center gap-2 font-text text-[15px] font-semibold text-ink-900 hover:text-royal"
              >
                <Icon name="phone" className="h-5 w-5" /> {site.phone.display}
              </a>
            </Reveal>
          </div>
        </div>

        {/* The banking relationship is the differentiator, so it gets its own band. */}
        <Reveal delay={0.1} className="mt-20 md:mt-28">
          <div className="lux-grain relative isolate overflow-hidden rounded-[28px] bg-ink-950 px-6 py-10 text-ivory md:px-12 md:py-14">
            <div className="absolute -left-24 -top-32 -z-10 h-[380px] w-[520px] rounded-full bg-royal/40 blur-[120px]" />
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
              <div>
                <p className="lux-label text-accent-soft">Bank-trusted partner</p>
                <h3 className="lux-display mt-5 text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.08]">
                  SBI and PNB, <span className="italic text-accent">on your side.</span>
                </h3>
                <div className="mt-8 grid max-w-[28rem] grid-cols-2 gap-3">
                  {banks.map((b) => (
                    <span
                      key={b.src}
                      className="grid h-20 place-items-center rounded-2xl bg-white px-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] md:h-28"
                    >
                      <Image src={b.src} alt={b.alt} width={b.w} height={b.h} className={`${b.cls} w-auto`} />
                    </span>
                  ))}
                </div>
              </div>

              <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                {proofs.map((p) => (
                  <li key={p.title} className="border-t border-white/12 pt-5">
                    <Icon name={p.icon} className="h-6 w-6 text-accent" />
                    <p className="mt-4 font-sans text-lg font-semibold leading-snug">{p.title}</p>
                    <p className="mt-2 font-text text-[15px] leading-relaxed text-ivory/65">{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
