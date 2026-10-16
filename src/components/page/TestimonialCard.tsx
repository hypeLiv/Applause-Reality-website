import { Bezel } from "@/components/home/ui";
import { byline, type Testimonial } from "@/content/testimonials";

/** A client quote on an ivory card in a light bezel, with an initial avatar; Hindi quotes switch to the Devanagari face. */
export default function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const deva = t.lang === "hi";
  return (
    <Bezel tone="light" radius="1.75rem">
      <figure className="bg-ivory p-7 md:p-9">
        <svg aria-hidden viewBox="0 0 32 24" className="h-6 w-auto text-royal/40" fill="currentColor">
          <path d="M0 24V13.6C0 5.9 4.2 1.4 12.6 0l1.3 3.1C9.3 4.3 7 6.7 6.6 10.3H12V24H0zm18 0V13.6C18 5.9 22.2 1.4 30.6 0l1.4 3.1c-4.7 1.2-7 3.6-7.4 7.2H30V24H18z" />
        </svg>
        <blockquote
          lang={t.lang}
          className={`mt-5 text-ink-900 ${deva ? "font-deva text-[17px] leading-[1.9]" : "font-text text-[17px] leading-[1.75]"}`}
        >
          {t.quote}
        </blockquote>
        <figcaption className="mt-7 flex items-center gap-3 border-t border-ink-900/[0.08] pt-5">
          <span
            aria-hidden
            lang={t.lang}
            className={`grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-sm font-semibold text-white ${deva ? "font-deva" : "font-sans"}`}
          >
            {t.name.charAt(0)}
          </span>
          <span>
            <span lang={t.lang} className={`block font-semibold ${deva ? "font-deva" : "font-sans"}`}>
              {t.name}
            </span>
            <span className="font-text text-sm text-slate-ink">{byline(t)}</span>
          </span>
        </figcaption>
      </figure>
    </Bezel>
  );
}
