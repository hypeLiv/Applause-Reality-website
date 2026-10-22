import type { Metadata } from "next";
import Image from "@/components/Image";
import BrandTagline from "@/components/BrandTagline";
import ClosingCta from "@/components/home/ClosingCta";
import { CountUp, Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Bezel, Icon, type IconName, lux } from "@/components/home/ui";
import AwardWall from "@/components/page/AwardWall";
import JourneyLine from "@/components/page/JourneyLine";
import RollingJourney from "@/components/page/RollingJourney";
import TestimonialCard from "@/components/page/TestimonialCard";
import Tilt from "@/components/page/Tilt";
import { Cta } from "@/components/sections";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getSiteMedia, getTestimonials, type SiteMedia } from "@/sanity/media";

export const metadata: Metadata = pageMeta({
  title: "Trusted Real Estate Consultants for Delhi-NCR",
  description:
    "Meet Rajiv Kr. Pandey and Applause Reality: 23+ years guiding families, investors and SBI/PNB professionals through bank-approved Delhi NCR property.",
  path: "/about-applause-reality",
});

const bio = [
  "With a career spanning more than 23 years, Rajiv Kr. Pandey has become a pillar of trust for families and investors across Delhi NCR — a steady companion through the milestones of buying a home.",
  "His guidance is calm and composed by design: a quiet place to think in a market that is often anything but. He works especially closely with corporate professionals and employees of institutions such as SBI and PNB, pairing thorough market intelligence with a patient understanding of each family’s needs.",
  "Beyond the transaction, his promise is to stay a devoted partner through every phase — from the first site visit to the day you receive your keys, and well after. By managing documentation and loan approvals with complete transparency, he makes sure every client feels safe, protected and certain that their legacy is in capable hands.",
];

const proofs: { value: React.ReactNode; label: string; text: string }[] = [
  {
    value: (
      <>
        <CountUp to={100} />%
      </>
    ),
    label: "Bank-approved projects",
    text: "Every home we recommend is backed by bank approval, so financing never becomes the surprise.",
  },
  {
    value: "NCR",
    label: "Market expertise",
    text: "Noida, Greater Noida and Wave City, followed closely — price bands, approvals and growth corridors.",
  },
  {
    value: "L1",
    label: "Leasing strength",
    text: "Top-tier reach in office and retail leasing across NCR’s high-visibility business districts.",
  },
];

/** Proof cascade (md and up): each card's stacking, overlap and drop, then its resting angle. */
const cascade = [
  { place: "md:z-10", tilt: "md:-rotate-2" },
  { place: "md:z-20 md:-ml-6 md:mt-12", tilt: "md:rotate-[1.5deg]" },
  { place: "md:z-30 md:-ml-6 md:mt-4", tilt: "md:-rotate-1" },
];

const services: { icon: IconName; title: string; text: string; photo: keyof SiteMedia["services"] }[] = [
  { icon: "home", title: "Residential sales", text: "Premium NCR homes and villas with verified bank approvals for secure living.", photo: "residential" },
  { icon: "building", title: "Commercial leasing", text: "Strategic leasing for office and retail spaces in high-visibility NCR business districts.", photo: "commercial" },
  { icon: "chart", title: "Investment advisory", text: "Clear analysis and ROI strategies for residential and commercial property portfolios.", photo: "investment" },
  { icon: "bank", title: "Home-loan assistance", text: "Seamless loan processing and documentation through our bank-approved partnerships.", photo: "homeLoans" },
];

const journey: { icon: IconName; title: string; text: string }[] = [
  { icon: "pin", title: "First visit", text: "Shortlisted, bank-approved options and site visits we attend with you." },
  { icon: "document", title: "Booking", text: "Every form, check and signature handled with complete transparency." },
  { icon: "bank", title: "Bank approval", text: "Loan processing through our SBI and PNB relationships." },
  { icon: "key", title: "Possession & beyond", text: "Keys in hand — and still on call long after the handover." },
];



export default async function AboutPage() {
  const media = await getSiteMedia();
  // The homepage shows the featured reviews, so this page tells the others.
  const stories = (await getTestimonials()).filter((t) => !t.featured);
  return (
    <>
      <SmoothScroll />

      {/* 1 · Founder hero */}
      <section className="lux-scope lux-on-light relative isolate overflow-hidden bg-mist px-4 sm:px-6 pb-24 pt-36 text-ink-900 md:px-10 md:pb-32 md:pt-44">
        <div aria-hidden className="absolute -left-48 top-10 -z-10 h-[520px] w-[640px] rounded-full bg-periwinkle-soft/35 blur-[150px]" />
        <div aria-hidden className="absolute -right-40 bottom-0 -z-10 h-[420px] w-[520px] rounded-full bg-gold/15 blur-[140px]" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="lux-label text-royal">About Applause Reality</p>
            </Reveal>
            <Words
              as="h1"
              immediate
              delay={0.1}
              text="Twenty-three years of *keeping promises.*"
              className="lux-display mt-7 max-w-[14ch] text-[clamp(2.8rem,5.8vw,5.25rem)] leading-[1]"
            />
            <Reveal delay={0.35}>
              <p className="mt-8 max-w-[34rem] font-text text-lg leading-relaxed text-slate-ink">
                Founded and led by Rajiv Kr. Pandey, Applause Reality guides families, investors and SBI &amp;
                PNB professionals to bank-approved homes across Delhi NCR — and stays with them long after
                the keys are handed over.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Cta href={site.whatsapp} className={lux.primary}>
                  Talk to Rajiv ji&rsquo;s team <Arrow />
                </Cta>
                <a href="#stories" className={lux.ghostLight}>
                  Read client stories
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <dl className="mt-14 grid max-w-[34rem] grid-cols-3 gap-6 border-t border-ink-900/10 pt-8">
                {[
                  { v: "23+", l: "Years in NCR" },
                  { v: "100%", l: "Bank-approved" },
                  { v: "SBI · PNB", l: "Trusted by" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="font-text text-xs uppercase tracking-[0.14em] text-slate-ink">{s.l}</dt>
                    <dd className="mt-2 font-sans text-2xl font-semibold tabular-nums md:text-3xl">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative mx-auto w-full max-w-[460px]">
            <Tilt max={5} className="rounded-[2rem]">
              <Bezel tone="light" className="shadow-[0_40px_80px_-40px_rgba(11,23,51,0.35)]">
                <figure className="relative text-ivory">
                  <Image
                    src={media.founderPortrait.src}
                    alt={media.founderPortrait.alt}
                    width={media.founderPortrait.width}
                    height={media.founderPortrait.height}
                    priority
                    sizes="(min-width: 1024px) 460px, 90vw"
                    className="h-auto w-full"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/85 to-transparent" />
                  <figcaption className="absolute inset-x-5 bottom-5">
                    <span className="block font-sans text-xl font-semibold">Rajiv Kr. Pandey</span>
                    <span className="font-text text-sm text-ivory/70">Founder &amp; Real Estate Consultant</span>
                  </figcaption>
                </figure>
              </Bezel>
            </Tilt>
            {/* Proof chip, offset off the frame */}
            <Bezel
              tone="light"
              radius="1.5rem"
              className="absolute -left-8 top-10 hidden -rotate-3 shadow-[0_30px_60px_-30px_rgba(11,23,51,0.45)] transition-[rotate,translate] duration-700 ease-[var(--ease-spring)] hover:-translate-y-1 hover:rotate-0 md:block"
              coreClassName="flex items-center gap-3 bg-white px-4 py-3 text-ink-900"
            >
              <Image
                src={media.partners.sbi.logo.src}
                alt={media.partners.sbi.logo.alt}
                width={media.partners.sbi.logo.width}
                height={media.partners.sbi.logo.height}
                className="h-6 w-auto"
              />
              <span className="font-text text-[13px] font-semibold leading-tight">
                Certificate of
                <br />
                Excellence
              </span>
            </Bezel>
          </Reveal>
        </div>
      </section>

      {/* 2 · The founder's story */}
      <section className="lux-scope lux-on-light bg-ivory px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="lux-label text-royal">The founder</p>
              </Reveal>
              <Words text="A calm guide in a *restless* market." className="lux-display mt-6 text-[clamp(2.2rem,3.8vw,3.4rem)]" />
              <Reveal delay={0.1}>
                <BrandTagline size="lg" className="mt-8" />
              </Reveal>
            </div>
          </div>
          <div>
            <div className="space-y-6 font-text text-lg leading-[1.8] text-slate-ink">
              {bio.map((p, i) => (
                <Reveal key={p.slice(0, 20)} delay={i * 0.05}>
                  <p className={i === 0 ? "text-xl leading-[1.7] text-ink-900 md:text-2xl" : ""}>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <blockquote className="mt-12 border-l-2 border-royal pl-6 font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-snug tracking-[-0.02em]">
                &ldquo;Not just a transaction — a devoted partner from your first visit to the keys, and
                every year after.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 · Mission & proof */}
      <section className="lux-scope lux-on-light bg-white px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="lux-label text-royal">Our mission</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[24ch] font-sans text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
              Bridging corporate vision with residential excellence — and building legacies on{" "}
              <span className="text-[#8a93a8]">trust and transparency.</span>
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[44rem] font-text text-lg leading-relaxed text-slate-ink">
              We focus on secure, bank-approved properties that deliver long-term value for families,
              corporates and investors across the NCR region — combining corporate professionalism with
              deep residential expertise for real peace of mind.
            </p>
          </Reveal>

          {/* Z-axis cascade: the cards overlap at slight angles and square up when hovered.
              Below md they stack flat, with no overlap to fight over taps. */}
          <ul className="mt-20 grid gap-6 md:mt-24 md:grid-cols-3 md:gap-0">
            {proofs.map((p, i) => (
              <li key={p.label} className={`relative md:hover:z-40 ${cascade[i].place}`}>
                <Reveal delay={i * 0.1}>
                  <Bezel
                    tone="light"
                    className={`shadow-[0_40px_80px_-48px_rgba(11,23,51,0.45)] transition-[rotate,translate] duration-700 ease-[var(--ease-spring)] md:hover:-translate-y-2 md:hover:rotate-0 ${cascade[i].tilt}`}
                    coreClassName="bg-ivory p-7 md:p-9"
                  >
                    <p className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink">{p.label}</p>
                    <p className="mt-6 font-sans text-[clamp(3.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink-900 tabular-nums">
                      {p.value}
                    </p>
                    <p className="mt-6 max-w-[30ch] font-text text-[15px] leading-relaxed text-slate-ink">{p.text}</p>
                  </Bezel>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · The journey we walk with you: a rolling scroll scene on desktop, the drawn timeline below lg */}
      <RollingJourney
        className="hidden lg:block"
        label="Walking with you"
        title="One family guide, *every* milestone."
        intro="The road to a home can get bumpy. We stay beside you from the first visit and booking to bank approvals and possession, and on into the years after."
        route={["First visit", "Keys in hand"]}
        steps={journey}
      />
      <section className="lux-scope lux-on-light relative isolate overflow-hidden bg-mist px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32 lg:hidden">
        <div aria-hidden className="absolute -right-40 bottom-0 -z-10 h-[460px] w-[620px] rounded-full bg-periwinkle-soft/35 blur-[150px]" />
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Walking with you</p>
              </Reveal>
              <Words text="One family guide, *every* milestone." className="lux-display mt-6 text-[clamp(2.3rem,4.4vw,4rem)]" />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                Applause Reality stays beside you as a trusted family guide — from the first visit and
                booking to bank approvals and possession, and on into the years after.
              </p>
            </Reveal>
          </div>
          <JourneyLine steps={journey} />
        </div>
      </section>

      {/* 5 · Services */}
      <section className="lux-scope lux-on-light bg-ivory px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">What we do</p>
              </Reveal>
              <Words text="Four pillars, *one* trusted partner." className="lux-display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]" />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                Everything needed to secure the right asset in Delhi NCR — and to make the journey to it
                straightforward.
              </p>
            </Reveal>
          </div>
          {/* Photo panels. On desktop they share one row and the hovered panel widens; the
              first stays open while the row is idle. Copy is always visible, so touch loses nothing. */}
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:flex lg:h-[34rem] lg:gap-3 [&:not(:hover)>li:first-child]:lg:flex-[2.1]">
            {services.map((s, i) => (
              <li
                key={s.title}
                className="group relative isolate min-h-[22rem] overflow-hidden rounded-[24px] bg-ink-950 text-ivory transition-[flex-grow] duration-700 ease-[var(--ease-lux)] sm:min-h-[26rem] lg:min-h-0 lg:flex-1 lg:hover:flex-[2.1]"
              >
                <Image
                  src={media.services[s.photo].src}
                  alt={media.services[s.photo].alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 object-cover opacity-80 transition-[transform,opacity] duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.04] group-hover:opacity-95"
                />
                <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 via-45% to-ink-950/10" />

                <Reveal delay={i * 0.06} className="flex h-full flex-col justify-between p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-text text-xs font-semibold tabular-nums tracking-[0.18em] text-accent-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-ink-950/40">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="max-w-[22rem]">
                    <h3 className="font-sans text-2xl font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-3 font-text text-[15px] leading-relaxed text-ivory/75">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 · Recognition */}
      <section className="lux-scope lux-on-light bg-mist px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Awards, mentions &amp; trust</p>
              </Reveal>
              <Words text="Recognised by the people *we work with.*" className="lux-display mt-6 max-w-[18ch] text-[clamp(2.3rem,4.4vw,4rem)]" />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                From India&rsquo;s largest bank to the NCR&rsquo;s leading developers. Select any frame to see
                it in full.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            <AwardWall awards={media.awards} />
          </div>
        </div>
      </section>

      {/* 7 · Client stories */}
      <section id="stories" className="lux-scope lux-on-light scroll-mt-24 bg-white px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Client success stories</p>
              </Reveal>
              <Words text="In their *own words.*" className="lux-display mt-6 text-[clamp(2.3rem,4.4vw,4rem)]" />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                Genuine experiences from families, investors and banking professionals who trusted Rajiv ji
                with one of life&rsquo;s biggest decisions.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 columns-1 gap-6 md:columns-2">
            {stories.map((s, i) => (
              <li key={s.name} className="mb-6 break-inside-avoid">
                <Reveal delay={(i % 2) * 0.08}>
                  <TestimonialCard testimonial={s} />
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-8 flex justify-center">
            <Cta href={site.whatsapp} className={lux.primary}>
              Start your success story <Arrow />
            </Cta>
          </Reveal>
        </div>
      </section>

      {/* 8 · Close */}
      <ClosingCta
        label="Book a free consultation"
        title="Let's plan your next *property move.*"
        text="Discuss residential, commercial, leasing, investment or loan needs with our experts — and get a clear, bank-approved shortlist."
        actionLabel="Schedule now"
        footnote="Residential · Commercial · Leasing · Investment · Loans"
      />
    </>
  );
}
