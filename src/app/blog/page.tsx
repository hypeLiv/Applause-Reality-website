import type { Metadata } from "next";
import Link from "next/link";
import ClosingCta from "@/components/home/ClosingCta";
import { Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Bezel } from "@/components/home/ui";
import CoverImage from "@/components/page/CoverImage";
import { PostCard, PostMeta, ReadLink } from "@/components/page/PostCard";
import { formatDate } from "@/content/posts";
import { pageMeta } from "@/lib/seo";
import { getPosts } from "@/sanity/media";

export const metadata: Metadata = pageMeta({
  title: "NCR Property Blog & Real Estate Insights",
  description:
    "Guides on where to invest in Delhi NCR, new bank-approved launches and practical home-buying tips from the Applause Reality advisory desk.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <SmoothScroll />

      {/* Masthead */}
      <section className="lux-scope lux-on-light relative isolate overflow-hidden bg-mist px-4 sm:px-6 pb-40 pt-40 text-ink-900 md:px-10 md:pb-52 md:pt-48">
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[520px] w-[620px] rounded-full bg-periwinkle-soft/35 blur-[140px]" />
        <div aria-hidden className="absolute -left-32 bottom-0 -z-10 h-[360px] w-[460px] rounded-full bg-gold/15 blur-[140px]" />
        <div className="mx-auto grid max-w-[1320px] items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              <p className="lux-label text-royal">The Applause journal</p>
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
            <p className="font-text text-lg leading-relaxed text-slate-ink">
              Guides, location deep-dives and project notes from our advisory desk — written to help
              families and investors decide with confidence.
            </p>
            <p className="mt-6 font-text text-xs font-semibold uppercase tracking-[0.18em] text-ink-900/45">
              {posts.length} articles · Updated {formatDate(featured.date)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured, lifted over the masthead's edge */}
      <section className="lux-scope lux-on-light bg-ivory px-4 sm:px-6 pb-28 text-ink-900 md:px-10 md:pb-40">
        <div className="mx-auto max-w-[1320px]">
          <Reveal className="relative z-10 -mt-28 md:-mt-36">
            <Link
              href={`/blog/${featured.slug}`}
              className="lux-focus group block rounded-[2rem] shadow-[0_50px_100px_-50px_rgba(11,23,51,0.4)]"
            >
              <Bezel tone="light" coreClassName="grid bg-white lg:grid-cols-[1.15fr_0.85fr]">
                <CoverImage
                  src={featured.cover}
                  alt={featured.coverAlt ?? featured.title}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                  zoom
                  className="aspect-[16/10] lg:aspect-auto lg:min-h-[460px]"
                />
                <span className="flex flex-col justify-between gap-10 p-5 sm:p-7 md:p-10">
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
              </Bezel>
            </Link>
          </Reveal>

          {/* Editorial split: the heading holds still on the left while the cards step down the right. */}
          <div className="mt-28 grid gap-14 md:mt-40 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <p className="lux-label text-royal">More from the desk</p>
                </Reveal>
                <Words
                  text="Guides worth *bookmarking.*"
                  className="lux-display mt-7 text-[clamp(2.4rem,4.6vw,4.5rem)] leading-[1]"
                />
                <Reveal delay={0.1}>
                  <p className="mt-7 max-w-[26rem] font-text text-lg leading-relaxed text-slate-ink">
                    Location deep-dives, launch notes and buying advice — short enough to read between site
                    visits.
                  </p>
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {rest.map((p) => (
                      <li
                        key={p.slug}
                        className="rounded-full bg-ink-900/[0.04] px-4 py-2 font-text text-[13px] font-semibold text-ink-900 ring-1 ring-ink-900/[0.07]"
                      >
                        {p.topic}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>

            <ul className="flex flex-col gap-8 lg:col-span-7 lg:gap-12">
              {rest.map((post, i) => (
                <li key={post.slug} className={i % 2 ? "lg:ml-14" : "lg:mr-14"}>
                  <Reveal delay={0.05}>
                    <PostCard post={post} wide />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingCta
        label="Still deciding?"
        title="Get answers for *your* family's move."
        text="Every situation is different. Tell us your budget, timeline and priorities, and an advisor will walk you through the options that genuinely fit."
        actionLabel="Talk to an advisor"
        footnote="Bank approved · Corporate & HR schemes"
      />
    </>
  );
}
