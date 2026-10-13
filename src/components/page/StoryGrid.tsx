import { Reveal, Words } from "@/components/home/motion";

export type PageStory = {
  /** Small gold line above the card title, e.g. a location or an outcome. */
  eyebrow: string;
  title?: string;
  meta?: string;
  quote: string;
  by?: string;
};

/** Client stories on navy: gold-marked cards that lift on hover. */
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
              <p className="lux-label text-brass-soft">{label}</p>
            </Reveal>
            <Words text={title} className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]" />
          </div>
          {intro && (
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-ivory/70">{intro}</p>
            </Reveal>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.eyebrow + i} delay={i * 0.08} className="h-full">
              <figure className="group relative flex h-full flex-col rounded-[24px] border border-white/10 bg-white/[0.04] p-7 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-brass/40 hover:bg-white/[0.07]">
                <span aria-hidden className="font-sans text-6xl font-semibold leading-none text-brass/50">
                  &ldquo;
                </span>
                <p className="mt-2 font-text text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
                  {s.eyebrow}
                </p>
                {s.title && <p className="mt-2 font-sans text-xl font-semibold tracking-[-0.01em]">{s.title}</p>}
                {s.meta && <p className="mt-1 font-text text-sm text-ivory/55">{s.meta}</p>}
                <blockquote className="mt-5 flex-1 font-text text-[17px] leading-relaxed text-ivory/85">
                  {s.quote}
                </blockquote>
                {s.by && (
                  <figcaption className="mt-6 border-t border-white/10 pt-4 font-text text-sm text-ivory/60">
                    {s.by}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
