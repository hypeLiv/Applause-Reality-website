import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { Reveal, Words } from "./motion";
import { Arrow } from "./ui";

const films = [
  {
    src: "/videos/godrej-arden.mp4",
    poster: "/images/poster-godrej-arden.jpg",
    name: "Godrej Arden",
    meta: "Sample flat · Sigma III, Greater Noida",
    frame: "aspect-video",
    cell: "md:col-span-7",
  },
  {
    src: "/videos/gulshan.mp4",
    poster: "/images/poster-gulshan.jpg",
    name: "Gulshan Empire",
    meta: "Walkthrough · Wave City, Ghaziabad",
    frame: "aspect-[9/16] md:aspect-auto md:flex-1",
    cell: "md:col-span-5 md:row-span-2",
  },
  {
    src: "/videos/eternia.mp4",
    poster: "/images/poster-eternia.jpg",
    name: "Eternia Residences",
    meta: "Lobby · Greater Noida West",
    frame: "aspect-video",
    cell: "md:col-span-7",
  },
];

export default function Showcase() {
  return (
    <section className="lux-scope lux-on-light bg-ivory px-6 py-28 text-ink-900 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <p className="lux-label text-royal">Now showing</p>
            </Reveal>
            <Words
              text="Bank-approved NCR assets for *confident* ROI."
              className="lux-display mt-7 text-[clamp(2.6rem,5vw,4.75rem)]"
            />
          </div>
          <Reveal delay={0.1}>
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

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {films.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08} className={`${f.cell} flex flex-col`}>
              <figure className="group flex h-full flex-col">
                <div className="flex flex-1 flex-col overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(11,23,51,0.45)] transition-transform duration-500 ease-[var(--ease-lux)] group-hover:-translate-y-1.5">
                  <VideoCard src={f.src} poster={f.poster} title={f.name} className={`w-full ${f.frame}`} />
                </div>
                <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-serif text-2xl">{f.name}</span>
                  <span className="font-text text-sm text-slate-ink">{f.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
