import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { Reveal, Words } from "./motion";
import { Arrow } from "./ui";

type Film = { src: string; poster: string; name: string; meta: string };

const landscape: Film[] = [
  {
    src: "/videos/godrej-arden.mp4",
    poster: "/images/poster-godrej-arden.jpg",
    name: "Godrej Arden",
    meta: "Sample flat · Sigma III, Greater Noida",
  },
  {
    src: "/videos/eternia.mp4",
    poster: "/images/poster-eternia.jpg",
    name: "Eternia Residences",
    meta: "Lobby · Greater Noida West",
  },
];

const portrait: Film = {
  src: "/videos/gulshan.mp4",
  poster: "/images/poster-gulshan-headlines.jpg",
  name: "Gulshan Empire",
  meta: "Campaign film · Wave City, Ghaziabad",
};

/**
 * Two 16:9 films stacked beside one 9:16 film. Every card is sized from a
 * single height (`--h` in `.film-wall`), so the wall always fits one screen.
 */
export default function Showcase() {
  return (
    <section className="lux-scope lux-on-light bg-ivory px-6 py-24 text-ink-900 md:px-10 xl:py-20">
      <div className="film-wall mx-auto grid max-w-[1320px] gap-12 xl:grid-cols-[20rem_1fr] xl:items-center xl:gap-16">
        <div className="md:grid md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-10 xl:block">
          <div>
            <Reveal>
              <p className="lux-label text-royal">Now showing</p>
            </Reveal>
            <Words
              text="Bank-approved NCR assets for *confident* ROI."
              className="lux-display mt-6 text-[clamp(2.4rem,4.6vw,4.25rem)] xl:text-[2.5rem]"
            />
          </div>
          <Reveal delay={0.1} className="mt-6 md:mt-0 xl:mt-7">
            <p className="font-text text-lg leading-relaxed text-slate-ink">
              Step inside a few of the projects we are guiding families toward right now — each one
              bank-approved and backed by builders we trust.
            </p>
            <Link
              href="/projects"
              className="lux-focus group mt-6 inline-flex items-center gap-3 border-b border-ink-900/20 pb-1 font-text text-[15px] font-semibold transition-colors hover:border-ink-900"
            >
              Explore all projects <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 md:flex-row md:justify-center xl:justify-end">
          <div className="flex flex-col gap-5 md:shrink-0 md:items-start">
            {landscape.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <FilmCard
                  film={f}
                  index={i === 0 ? 1 : 3}
                  className="aspect-video w-full md:h-[calc((var(--h)-var(--gap))/2)] md:w-auto"
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12} className="md:shrink-0">
            <FilmCard
              film={portrait}
              index={2}
              className="mx-auto aspect-[9/16] w-full max-w-sm md:mx-0 md:h-[var(--h)] md:w-auto md:max-w-none"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FilmCard({ film, index, className }: { film: Film; index: number; className: string }) {
  return (
    <VideoCard
      src={film.src}
      poster={film.poster}
      title={film.name}
      meta={film.meta}
      label={`Film ${String(index).padStart(2, "0")}`}
      className={`rounded-[24px] shadow-[0_30px_60px_-30px_rgba(11,23,51,0.5)] ring-1 ring-ink-900/5 transition-transform duration-500 ease-[var(--ease-lux)] hover:-translate-y-1 ${className}`}
    />
  );
}
