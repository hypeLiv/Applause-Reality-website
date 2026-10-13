import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { ParallaxImage, Reveal, Words } from "./motion";
import { Arrow, Icon, lux } from "./ui";

export default function ClosingCta() {
  return (
    <section className="lux-scope relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink-950 px-6 py-28 text-ivory md:px-10">
      <ParallaxImage
        src="/images/residential-complex.jpg"
        alt=""
        range={90}
        className="!absolute inset-0 -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/70 via-ink-950/45 to-ink-950/85" />

      <div className="lux-glass mx-auto w-full max-w-[820px] rounded-[28px] px-8 py-14 text-center md:px-16 md:py-20">
        <Reveal>
          <p className="lux-label justify-center text-brass-soft">A home for generations</p>
        </Reveal>
        <Words
          text="Your new chapter starts with *expert* help."
          className="lux-display mx-auto mt-7 max-w-[14ch] text-[clamp(2.6rem,5.4vw,5rem)]"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[34rem] font-text text-lg leading-relaxed text-ivory/75">
            Your home should be a celebration of your family&apos;s achievements. From the first tour
            to the final handover and beyond, we manage every legal and financial detail for you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Cta href={site.whatsapp} className={lux.gold}>
              Schedule a site visit <Arrow />
            </Cta>
            <a href={site.phone.href} className={lux.ghostDark}>
              <Icon name="phone" className="h-5 w-5" /> {site.phone.display}
            </a>
          </div>
          <p className="mt-10 font-text text-xs uppercase tracking-[0.18em] text-ivory/55">
            Dedicated household growth · Total guidance
          </p>
        </Reveal>
      </div>
    </section>
  );
}
