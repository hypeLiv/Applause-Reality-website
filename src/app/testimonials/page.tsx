import type { Metadata } from "next";
import ClosingCta from "@/components/home/ClosingCta";
import { CountUp, Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Bezel } from "@/components/home/ui";
import StoryGrid from "@/components/page/StoryGrid";
import TestimonialCard from "@/components/page/TestimonialCard";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { byline, outcomes, type Testimonial } from "@/content/testimonials";
import { absolute, pageMeta } from "@/lib/seo";
import { getSiteMedia, getTestimonials } from "@/sanity/media";

export const metadata: Metadata = pageMeta({
  title: "Client Reviews from NCR Home Buyers",
  description:
    "Read reviews from SBI officers, investors and families who bought bank-approved Delhi NCR homes with Applause Reality, from site visit to possession.",
  path: "/testimonials",
});

const stats = [
  { to: 1000, suffix: "+", label: "Families served" },
  { to: 23, suffix: "+", label: "Years in NCR real estate" },
  { to: 100, suffix: "%", label: "Satisfied investors" },
];

const reviewSchema = (testimonials: Testimonial[]) => ({
  "@context": "https://schema.org",
  "@graph": testimonials.map((t) => ({
    "@type": "Review",
    itemReviewed: { "@id": absolute("/#business") },
    author: { "@type": "Person", name: t.name, jobTitle: byline(t) },
    reviewBody: t.quote,
    inLanguage: t.lang ?? "en-IN",
  })),
});

export default async function TestimonialsPage() {
  const [testimonials, { testimonialsCtaImage }] = await Promise.all([getTestimonials(), getSiteMedia()]);
  const [lead, ...rest] = testimonials;

  return (
    <>
      <SmoothScroll />
      <JsonLd data={reviewSchema(testimonials)} />

      {/* Masthead */}
      <section className="lux-scope lux-grain relative isolate overflow-hidden bg-ink-950 px-4 sm:px-6 pb-40 pt-36 text-ivory md:px-10 md:pb-52 md:pt-44">
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 h-[520px] w-[620px] rounded-full bg-royal/30 blur-[140px]" />
        <div className="mx-auto max-w-[1320px]">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: "Home", href: "/" },
              { name: "Testimonials", href: "/testimonials" },
            ]}
          />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <Reveal>
                <p className="lux-label text-accent-soft">Client testimonials</p>
              </Reveal>
              <Words
                as="h1"
                immediate
                delay={0.1}
                text="Reviews from families *who bought with us.*"
                className="lux-display mt-7 max-w-[16ch] text-[clamp(2.8rem,6vw,5.5rem)] leading-[1]"
              />
            </div>
            <Reveal delay={0.3}>
              <p className="font-text text-lg leading-relaxed text-ivory/65">
                Bankers, investors and first-time buyers on what it was like to buy a bank-approved Delhi NCR
                home with Rajiv ji&rsquo;s team, in their own words.
              </p>
              <p className="mt-6 font-text text-xs font-semibold uppercase tracking-[0.18em] text-ivory/45">
                {testimonials.length} client reviews · English &amp; हिंदी
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lead review, lifted over the masthead's edge */}
      <section className="lux-scope lux-on-light bg-white px-4 sm:px-6 pb-24 text-ink-900 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1320px]">
          {/* Asymmetric bento, lifted over the masthead: the lead review spans the left, the figures stack right. */}
          <div className="relative z-10 -mt-28 grid gap-4 md:-mt-36 lg:grid-cols-12 lg:grid-rows-3 lg:gap-5">
            <Reveal className="lg:col-span-8 lg:row-span-3">
              <Bezel
                tone="light"
                className="h-full shadow-[0_50px_100px_-50px_rgba(11,23,51,0.45)]"
                coreClassName="h-full bg-ivory"
              >
                <figure className="flex h-full flex-col justify-between gap-10 p-8 md:p-14">
                  <svg aria-hidden viewBox="0 0 32 24" className="h-9 w-auto self-start text-royal/40" fill="currentColor">
                    <path d="M0 24V13.6C0 5.9 4.2 1.4 12.6 0l1.3 3.1C9.3 4.3 7 6.7 6.6 10.3H12V24H0zm18 0V13.6C18 5.9 22.2 1.4 30.6 0l1.4 3.1c-4.7 1.2-7 3.6-7.4 7.2H30V24H18z" />
                  </svg>
                  <blockquote className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.3]">{lead.quote}</blockquote>
                  <figcaption className="flex items-center gap-4 border-t border-ink-900/[0.08] pt-6">
                    <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 font-sans text-base font-semibold text-white">
                      {lead.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-sans text-lg font-semibold">{lead.name}</span>
                      <span className="font-text text-sm text-slate-ink">{byline(lead)}</span>
                    </span>
                  </figcaption>
                </figure>
              </Bezel>
            </Reveal>

            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 + i * 0.08} className="lg:col-span-4">
                <Bezel
                  tone="ink"
                  className="h-full shadow-[0_40px_80px_-48px_rgba(11,23,51,0.5)]"
                  coreClassName="h-full"
                >
                  <dl className="flex h-full flex-col justify-between gap-6 p-7 text-ivory md:p-8">
                    <dt className="font-text text-xs font-semibold uppercase tracking-[0.16em] text-ivory/55">{s.label}</dt>
                    <dd className="lux-display text-[clamp(2.6rem,4vw,3.6rem)]">
                      <CountUp to={s.to} />
                      {s.suffix}
                    </dd>
                  </dl>
                </Bezel>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid items-end gap-8 md:mt-32 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Every review</p>
              </Reveal>
              <Words text="Word for word, *as they wrote it.*" className="lux-display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]" />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                Unedited notes from clients we guided through site visits, bank paperwork, home loans and
                possession — and who still call us after it.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {rest.map((t, i) => (
              <li key={t.name} className="mb-6 break-inside-avoid">
                <Reveal delay={(i % 3) * 0.08}>
                  <TestimonialCard testimonial={t} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StoryGrid
        label="Client outcomes"
        title="Results that *speak for themselves.*"
        intro="Appreciation, smooth home loans and paperwork without surprises: what buying through Applause Reality has meant for our clients."
        stories={outcomes}
      />

      <ClosingCta
        image={testimonialsCtaImage.src}
        label="Your story next"
        title="Ready to start *your* success story?"
        text="Tell us your budget, timeline and priorities. An advisor will shortlist bank-approved projects that fit, and stay with you from the first visit to possession."
        actionLabel="Talk to an advisor"
        footnote="Bank approved · SBI & PNB home-loan support"
      />
    </>
  );
}
