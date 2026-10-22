import { Cta } from "@/components/sections";
import { site } from "@/lib/site";
import { getSiteMedia } from "@/sanity/media";
import { ParallaxImage, Reveal, Words } from "./motion";
import { Arrow, Bezel, Icon, lux } from "./ui";

/** An ink panel over a darkened photo, or (the homepage) a white panel over a bright one. */
const tones = {
  dark: {
    section: "bg-ink-950 text-ivory",
    veil: "bg-gradient-to-b from-ink-950/70 via-ink-950/45 to-ink-950/85",
    bezel: "glass",
    core: "bg-gradient-to-b from-ink-900/80 to-ink-950/85",
    label: "text-accent-soft",
    text: "text-ivory/75",
    ghost: lux.ghostDark,
    footnote: "text-ivory/55",
  },
  light: {
    section: "lux-on-light bg-mist text-ink-900",
    veil: "bg-gradient-to-b from-white/30 via-white/5 to-white/45",
    bezel: "day",
    core: "bg-white/95",
    label: "text-royal",
    text: "text-slate-ink",
    ghost: lux.ghostLight,
    footnote: "text-slate-ink",
  },
} as const;

/**
 * Full-bleed closing call to action: a glass panel over a drifting photo.
 * Defaults are the homepage copy; inner pages pass their own.
 */
export default async function ClosingCta({
  image,
  label = "A home for generations",
  title = "Your new chapter starts with *expert* help.",
  text = "Your home should be a celebration of your family's achievements. From the first tour to the final handover and beyond, we manage every legal and financial detail for you.",
  actionLabel = "Schedule a site visit",
  footnote = "Dedicated household growth · Total guidance",
  tone = "dark",
}: {
  /** Background photo; defaults to the banner photo set in Sanity. */
  image?: string;
  label?: string;
  title?: string;
  text?: string;
  actionLabel?: string;
  footnote?: string;
  tone?: keyof typeof tones;
}) {
  const fallback = image ? null : (await getSiteMedia()).ctaImage;
  const bg = image ?? fallback!.src;
  const t = tones[tone];

  return (
    <section
      className={`lux-scope relative isolate flex min-h-[92svh] items-center overflow-hidden px-3 py-28 sm:px-6 md:px-10 ${t.section}`}
    >
      <ParallaxImage src={bg} alt={fallback?.alt ?? ""} range={90} className="!absolute inset-0 -z-20" />
      <div className={`absolute inset-0 -z-10 ${t.veil}`} />

      <Bezel
        tone={t.bezel}
        className="mx-auto w-full max-w-[820px]"
        coreClassName={`${t.core} px-5 py-12 text-center sm:px-8 sm:py-14 md:px-16 md:py-20`}
      >
        <Reveal>
          <p className={`lux-label justify-center ${t.label}`}>{label}</p>
        </Reveal>
        <Words
          text={title}
          className="lux-display mx-auto mt-7 max-w-[15ch] text-[clamp(2.6rem,5.4vw,5rem)]"
        />
        <Reveal delay={0.1}>
          <p className={`mx-auto mt-7 max-w-[34rem] font-text text-lg leading-relaxed ${t.text}`}>{text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Cta href={site.whatsapp} className={lux.primary}>
              {actionLabel} <Arrow />
            </Cta>
            <a href={site.phone.href} className={t.ghost}>
              <Icon name="phone" className="h-5 w-5" /> {site.phone.display}
            </a>
          </div>
          {footnote && (
            <p className={`mt-10 font-text text-xs uppercase tracking-[0.18em] ${t.footnote}`}>{footnote}</p>
          )}
        </Reveal>
      </Bezel>
    </section>
  );
}
