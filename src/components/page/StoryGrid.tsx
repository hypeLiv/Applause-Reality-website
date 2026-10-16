import { Reveal, Words } from "@/components/home/motion";
import { Bezel } from "@/components/home/ui";

export type PageStory = {
  /** Small accent line above the card title, e.g. a location or an outcome. */
  eyebrow: string;
  title?: string;
  meta?: string;
  quote: string;
  by?: string;
};

/** Client stories on navy: bezel cards in an asymmetric bento that lift on hover. */
export default function StoryGrid({
  label = "Client success stories",
  title,
  intro,
  stories,
}: {
  label?: string;
  title: string;
  intro?: string;
  stories: PageStory[];
}) {
  return (
    <section className="lux-scope bg-ink-900 px-6 py-24 text-ivory md:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="lux-label text-accent-soft">{label}</p>
            </Reveal>
            <Words text={title} className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]" />
          </div>
          {intro && (
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-ivory/70">{intro}</p>
            </Reveal>
          )}
        </div>

        {/* Asymmetric bento: the lead story spans both rows beside the other two; one column on phones. */}
        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
          {stories.map((s, i) => {
            const lead = i === 0;
            return (
              <Reveal
                key={s.eyebrow + i}
                delay={i * 0.08}
                className={lead ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}
              >
                <Bezel
                  className="h-full transition-[translate] duration-700 ease-[var(--ease-spring)] hover:-translate-y-1"
                  coreClassName="bg-gradient-to-b from-white/[0.07] to-white/[0.02]"
                >
                  <figure className={`flex h-full flex-col p-7 ${lead ? "md:p-10" : ""}`}>
                    <span aria-hidden className="font-sans text-6xl font-semibold leading-none text-accent/50">
                      &ldquo;
                    </span>
                    <p className="mt-2 font-text text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                      {s.eyebrow}
                    </p>
                    {s.title && <p className="mt-2 font-sans text-xl font-semibold tracking-[-0.01em]">{s.title}</p>}
                    {s.meta && <p className="mt-1 font-text text-sm text-ivory/55">{s.meta}</p>}
                    <blockquote
                      className={`mt-5 flex-1 font-text text-ivory/85 ${
                        lead ? "text-[clamp(1.4rem,2.2vw,2rem)] leading-snug tracking-[-0.01em]" : "text-[17px] leading-relaxed"
                      }`}
                    >
                      {s.quote}
                    </blockquote>
                    {s.by && (
                      <figcaption className="mt-6 border-t border-white/10 pt-4 font-text text-sm text-ivory/60">
                        {s.by}
                      </figcaption>
                    )}
                  </figure>
                </Bezel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
