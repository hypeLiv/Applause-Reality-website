import type { Metadata } from "next";
import Image from "next/image";
import ClosingCta from "@/components/home/ClosingCta";
import { Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, lux } from "@/components/home/ui";
import PageHero from "@/components/page/PageHero";
import ProjectsTimeline from "@/components/page/ProjectsTimeline";
import StoryGrid from "@/components/page/StoryGrid";
import { Cta } from "@/components/sections";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NCR Luxury Projects",
  description:
    "Newly launched, bank-approved NCR developments: Hero Homes Sector MU, Gulshan Empire at Wave City, Godrej Arden and Eternia Residences.",
};

const stories = [
  {
    eyebrow: "Outcome · A better deal",
    quote: "Excellent home councilor work and services in Real Estate.",
    by: "A K Agarwal — Homebuyer, Chief Manager, SBI",
  },
  {
    eyebrow: "Outcome · Faster possession",
    quote:
      "“We weren't just sold a dream; the follow-up with the developer ensured we got our keys 3 months early.”",
    by: "Investor, Sector 150 Noida",
  },
  {
    eyebrow: "Outcome · Stress-free loan",
    quote:
      "My experience with Applause Reality while booking my flat was truly wonderful. From site visits to final handover, everything was handled seamlessly and it was made sure I had zero hassle with paperwork. Grateful to Applause Reality for making this journey so smooth",
    by: "Ashwani Baunthiyal — Homebuyer, SBI Dwarka",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <SmoothScroll />
      <PageHero
        image="/images/building-facade.jpg"
        alt="Modern residential building facade"
        eyebrow="New launches · Bank-approved"
        title="Exclusive access to NCR's *finest* new launches."
        lead="Four bank-approved developments we're guiding families toward right now — with corporate and HR schemes for banking professionals."
        actions={
          <>
            <Cta href={site.whatsapp} className={lux.heroPrimary}>
              Talk to an advisor <Arrow />
            </Cta>
            <a href="#launches" className={lux.heroGlass}>
              See the launches
            </a>
          </>
        }
      >
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { v: String(projects.length), l: "Current launches" },
            { v: "100%", l: "Bank-approved" },
            { v: "SBI · PNB", l: "Fast-track schemes" },
          ].map((s) => (
            <div key={s.l} className="bg-ink-950/50 px-5 py-4 backdrop-blur-md">
              <dd className="font-sans text-2xl font-semibold tabular-nums text-white">{s.v}</dd>
              <dt className="order-first font-text text-xs uppercase tracking-[0.14em] text-white/60">{s.l}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <div id="launches" className="scroll-mt-0">
        <ProjectsTimeline projects={projects} />
      </div>

      {/* Banking perks */}
      <section className="lux-scope lux-on-light bg-ivory px-6 py-20 text-ink-900 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <p className="lux-label text-royal">Exclusive banking perks</p>
            </Reveal>
            <Words
              text="Fast-track *priority* for SBI & PNB employees."
              className="lux-display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[36rem] font-text text-lg leading-relaxed text-slate-ink">
                Specialised fast-track processing and priority access to NCR assets, with personalised
                service for a secure, efficient path to ownership.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="flex flex-wrap gap-4 lg:justify-end">
            {[
              { src: "/images/sbi.png", alt: "State Bank of India", w: 157, h: 68 },
              { src: "/images/pnb-full.png", alt: "Punjab National Bank", w: 327, h: 103 },
            ].map((b) => (
              <span
                key={b.src}
                className="grid h-24 place-items-center rounded-[20px] bg-white px-7 shadow-[0_20px_40px_-28px_rgba(11,23,51,0.35)]"
              >
                <Image src={b.src} alt={b.alt} width={b.w} height={b.h} className="h-12 w-auto" />
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <StoryGrid title="Outcomes, not *promises.*" stories={stories} />

      <ClosingCta
        image="/images/residential-complex.jpg"
        label="Your next step"
        title="Ready to discuss your own *property plans?*"
        text="Tell us what you're looking for and we'll shortlist the right bank-approved project — then walk with you from the first visit to possession and beyond."
        actionLabel="Talk to an advisor"
        footnote="Bank approved · Corporate & HR schemes"
      />
    </>
  );
}
