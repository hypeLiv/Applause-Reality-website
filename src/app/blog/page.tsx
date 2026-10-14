import type { Metadata } from "next";
import Link from "next/link";
import ClosingCta from "@/components/home/ClosingCta";
import { Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import CoverImage from "@/components/page/CoverImage";
import { PostCard, PostMeta, ReadLink } from "@/components/page/PostCard";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Discover NCR Property Blogs | Real Estate Insights",
  description: "Delhi NCR real estate guides and project insights from Applause Reality.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <SmoothScroll />

      {/* Masthead */}
      <section className="lux-scope lux-grain relative isolate overflow-hidden bg-ink-950 px-6 pb-40 pt-40 text-ivory md:px-10 md:pb-52 md:pt-48">
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[520px] w-[620px] rounded-full bg-royal/30 blur-[140px]" />
        <div className="mx-auto grid max-w-[1320px] items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              <p className="lux-label text-accent-soft">The Applause journal</p>
            </Reveal>
            <Words
              as="h1"
              immediate
              delay={0.1}
              text="Clear thinking for *NCR home buyers.*"
              className="lux-display mt-7 max-w-[16ch] text-[clamp(2.8rem,6vw,5.5rem)] leading-[1]"
            />
          </div>
          <Reveal delay={0.3}>
            <p className="font-text text-lg leading-relaxed text-ivory/65">
              Guides, location deep-dives and project notes from our advisory desk — written to help
              families and investors decide with confidence.
            </p>
            <p className="mt-6 font-text text-xs font-semibold uppercase tracking-[0.18em] text-ivory/45">
              {posts.length} articles · Updated {formatDate(featured.date)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured, lifted over the masthead's edge */}
      <section className="lux-scope lux-on-light bg-ivory px-6 pb-24 text-ink-900 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="relative z-10 -mt-28 md:-mt-36">
            <Link
              href={`/post/${featured.slug}`}
              className="lux-focus group grid overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-40px_rgba(11,23,51,0.45)] ring-1 ring-ink-900/[0.06] lg:grid-cols-[1.15fr_0.85fr]"
            >
              <CoverImage
                src={featured.cover}
                alt={featured.title}
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
                zoom
                className="aspect-[16/10] lg:aspect-auto lg:min-h-[460px]"
              />
              <span className="flex flex-col justify-between gap-10 p-7 md:p-10">
                <span>
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-royal px-3 py-1 font-text text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                      Latest
                    </span>
                    <PostMeta post={featured} />
                  </span>
                  <span className="mt-6 block font-sans text-[clamp(1.75rem,2.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                    {featured.title}
                  </span>
                  <span className="mt-5 block font-text text-[17px] leading-relaxed text-slate-ink">{featured.excerpt}</span>
                </span>
                <ReadLink />
              </span>
            </Link>
          </Reveal>

          <div className="mt-24 flex items-end justify-between gap-6 md:mt-32">
            <div>
              <Reveal>
                <p className="lux-label text-royal">More from the desk</p>
              </Reveal>
              <Words text="Guides worth *bookmarking.*" className="lux-display mt-6 text-[clamp(2.1rem,3.8vw,3.4rem)]" />
            </div>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 0.08} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        image="/images/residential-complex.jpg"
        label="Still deciding?"
        title="Get answers for *your* family's move."
        text="Every situation is different. Tell us your budget, timeline and priorities, and an advisor will walk you through the options that genuinely fit."
        actionLabel="Talk to an advisor"
        footnote="Bank approved · Corporate & HR schemes"
      />
    </>
  );
}
