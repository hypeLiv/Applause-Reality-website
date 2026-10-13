import Image from "next/image";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { ParallaxImage, Reveal, Words } from "./motion";
import { Arrow, Icon, type IconName, lux } from "./ui";

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: "bank", title: "Premier bank networks", text: "Direct lines into SBI and PNB for faster approvals." },
  { icon: "document", title: "White-glove paperwork", text: "Every form, check and signature managed for you." },
  { icon: "heart", title: "Care beyond possession", text: "We stay on call long after the handover." },
  { icon: "sliders", title: "Tailored to you", text: "Solutions shaped around diverse client backgrounds." },
];

export default function Finance() {
  return (
    <section className="lux-scope lux-on-light bg-white px-6 py-28 text-ink-900 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative">
          <ParallaxImage
            src="/images/key-in-door.jpg"
            alt="House keys turning in a front door lock"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] rounded-[28px]"
          />
          <div className="absolute -bottom-8 left-6 right-6 rounded-[18px] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(11,23,51,0.35)] md:left-auto md:right-[-2rem] md:w-[320px]">
            <p className="lux-label text-royal">Bank-trusted partner</p>
            <div className="mt-4 flex items-center gap-5">
              <Image src="/images/sbi.png" alt="State Bank of India" width={108} height={56} className="h-11 w-auto" />
              <Image src="/images/pnb.png" alt="Punjab National Bank" width={124} height={53} className="h-11 w-auto" />
            </div>
          </div>
        </Reveal>

        <div className="pt-8 lg:pt-0">
          <Reveal>
            <p className="lux-label text-royal">Financial consulting</p>
          </Reveal>
          <Words
            text="Ensure stability with *financial* consulting."
            className="lux-display mt-7 text-[clamp(2.6rem,5vw,4.75rem)]"
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[32rem] font-text text-lg leading-relaxed text-slate-ink">
              Lean on our long-standing SBI and PNB relationships for stress-free home loans — on
              projects from only the most trusted builders.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {perks.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={0.1 + i * 0.06} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ivory text-royal">
                    <Icon name={p.icon} />
                  </span>
                  <span>
                    <span className="block font-text text-base font-semibold">{p.title}</span>
                    <span className="mt-1 block font-text text-[15px] leading-relaxed text-slate-ink">{p.text}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-6">
            <Cta href={site.whatsapp} className={lux.gold}>
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
    </section>
  );
}
