import type { Metadata } from "next";
import Image from "next/image";
import BrandTagline from "@/components/BrandTagline";
import ClosingCta from "@/components/home/ClosingCta";
import { ParallaxImage, Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Icon, lux } from "@/components/home/ui";
import CorridorNav from "@/components/page/CorridorNav";
import ProjectsTimeline from "@/components/page/ProjectsTimeline";
import StoryGrid from "@/components/page/StoryGrid";
import { Cta } from "@/components/sections";
import TokyoSkylineHero from "@/components/ui/sunset-skyline-hero";
import type { Project } from "@/content/projects";
import { outcomes } from "@/content/testimonials";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getProjects, getSiteMedia } from "@/sanity/media";

export const metadata: Metadata = pageMeta({
  title: "NCR Projects & Investment Locations",
  description:
    "Compare Noida, Greater Noida and Wave City, then explore the bank-approved launches in each: Hero Homes, Godrej Arden, Eternia and Gulshan Empire.",
  path: "/projects",
});

/** Each corridor owns the launches whose location names it. Ordered by how many launches it holds. */
const corridors: {
  id: string;
  name: string;
  summary: string;
  advantages: string[];
  price: string;
  potential: string;
  match: (p: Project) => boolean;
}[] = [
  {
    id: "greater-noida",
    name: "Greater Noida",
    summary:
      "A planned city built for high-end living — wide roads, generous greenery and mega infrastructure projects.",
    advantages: ["Near Jewar International Airport", "Formula 1 track zone", "Education & tech hub"],
    price: "₹1.5 Cr – ₹5 Cr",
    potential: "Surging long-term yields",
    match: (p) => p.location.includes("Greater Noida"),
  },
  {
    id: "wave-city",
    name: "Wave City, Ghaziabad",
    summary:
      "A hi-tech township offering a smart lifestyle with automated systems and excellent NH-24 connectivity.",
    advantages: ["Smart-city infrastructure", "Wide internal road network", "Lush green landscapes"],
    price: "₹2 Cr – ₹5 Cr",
    potential: "Strategic investment value",
    match: (p) => p.location.includes("Wave City"),
  },
  {
    id: "noida",
    name: "Noida",
    summary:
      "The primary commercial and IT hub of Uttar Pradesh, with world-class infrastructure and seamless Delhi connectivity.",
    advantages: ["Operational metro network", "Close to Film City & IT parks", "High rental demand"],
    price: "₹2.5 Cr – ₹32 Cr",
    potential: "High capital appreciation",
    match: (p) => p.location.includes("Noida") && !p.location.includes("Greater Noida"),
  },
];

const launchCount = (n: number) => (n === 0 ? "On request" : `${n} launch${n === 1 ? "" : "es"}`);

const questions = [
  {
    q: "Confused about where to invest?",
    a: "Our market experts track growth corridors, infrastructure developments and demand trends so you invest with confidence.",
  },
  {
    q: "Looking for the best property within your budget?",
    a: "From premium apartments to commercial assets, we shortlist properties that match your goals and financial plans.",
  },
  {
    q: "Need guidance before making a decision?",
    a: "Get personalised recommendations, side-by-side project comparisons and financing support from experienced advisors.",
  },
];

const advantages = [
  {
    area: "Ghaziabad",
    title: "Industrial corridor access",
    text: "Close to major industrial zones, with unparalleled connectivity for corporate clients and investors seeking high-yield returns.",
  },
  {
    area: "Noida",
    title: "Infrastructure hub",
    text: "The gateway to the National Capital Region, with seamless access to Delhi's financial and commercial centres — ideal for ready-to-move flats.",
  },
  {
    area: "Greater Noida",
    title: "Emerging growth zone",
    text: "Rapid urbanisation and infrastructure expansion are creating fertile ground for long-term residential and investment opportunities.",
  },
  {
    area: "Vaishali",
    title: "Modern residential living",
    text: "A blend of luxury and convenience for families and investors looking for bank-approved, high-end properties.",
  },
];


export default async function ProjectsPage() {
  const [media, projects] = await Promise.all([getSiteMedia(), getProjects()]);
  const chapters = corridors.map((c) => ({ ...c, launches: projects.filter(c.match) }));

  return (
    <>
      <SmoothScroll />
      <TokyoSkylineHero
        videoSrc={media.locationsTour.src}
        videoSrcSmall={media.locationsTour.srcSmall}
        poster={media.locationsTour.poster}
        eyebrow="Locations & new launches · Bank-approved"
        title="NCR's best corridors, and the launches inside them."
        titleAs="h1"
        scrollHint="SCROLL TO FLY OVER NCR"
        brandMark="Where NCR grows next."
        caption="We identify the most promising investment hubs in Delhi NCR — where proximity to infrastructure and corporate growth protects long-term value."
        action={
          <div className="flex flex-col items-center gap-6">
            <ul className="flex flex-wrap justify-center gap-2">
              {chapters.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="lux-focus inline-flex items-baseline gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-text text-sm font-semibold text-ivory backdrop-blur-md transition-colors hover:bg-white/20"
                  >
                    {c.name.split(",")[0]}
                    <span className="font-medium text-ivory/60">{launchCount(c.launches.length)}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Cta href={site.whatsapp} className={lux.heroPrimary}>
              Get a free consultation <Arrow />
            </Cta>
          </div>
        }
        openingVeil={0.45}
        darkHeader
        scrubDistance={800}
      />

      {/* Corridors, each carrying its own launches */}
      <div id="launches" className="lux-scope relative bg-ink-950 pb-24 text-ivory md:pb-32">
        <header className="mx-auto max-w-[1320px] px-6 pb-14 pt-24 md:px-10 md:pt-32">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-accent-soft">Three corridors, {projects.length} launches</p>
              </Reveal>
              <Words
                text="Where your money *works hardest.*"
                className="lux-display mt-6 text-[clamp(2.6rem,5vw,4.5rem)]"
              />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-ivory/65">
                Price bands, growth drivers and the bank-approved projects we are guiding families toward
                right now — grouped by where they stand.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                { v: String(projects.length), l: "Current launches" },
                { v: "100%", l: "Bank-approved" },
                { v: "SBI · PNB", l: "Fast-track schemes" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col bg-ink-950 px-5 py-4">
                  <dd className="font-sans text-2xl font-semibold tabular-nums">{s.v}</dd>
                  <dt className="order-first font-text text-xs uppercase tracking-[0.14em] text-ivory/55">{s.l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        <CorridorNav
          items={chapters.map((c) => ({ id: c.id, label: c.name.split(",")[0], note: launchCount(c.launches.length) }))}
        />

        {chapters.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            aria-labelledby={`${c.id}-title`}
            className="scroll-mt-36 px-6 pt-16 md:px-10 md:pt-24"
          >
            <div className="mx-auto max-w-[1320px]">
              <div className="grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-12 lg:gap-10">
                <Reveal className="lg:col-span-6">
                  <p className="font-text text-sm font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  </p>
                  <h2 id={`${c.id}-title`} className="lux-display mt-5 text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.98]">
                    {c.name}
                  </h2>
                  <p className="mt-6 max-w-[34rem] font-text text-lg leading-relaxed text-ivory/70">{c.summary}</p>
                </Reveal>

                <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
                  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                    <div className="flex flex-col bg-ink-950 px-5 py-4">
                      <dd className="font-sans text-xl font-semibold tabular-nums md:text-2xl">{c.price}</dd>
                      <dt className="order-first font-text text-xs uppercase tracking-[0.14em] text-ivory/55">Price band</dt>
                    </div>
                    <div className="flex flex-col bg-ink-950 px-5 py-4">
                      <dd className="font-sans text-base font-semibold leading-snug md:text-lg">{c.potential}</dd>
                      <dt className="order-first font-text text-xs uppercase tracking-[0.14em] text-ivory/55">Outlook</dt>
                    </div>
                  </dl>
                  <ul className="mt-6 space-y-2.5">
                    {c.advantages.map((a) => (
                      <li key={a} className="flex items-start gap-3 font-text text-[15px] text-ivory/80">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <Cta href={site.whatsapp} className={`${lux.ghostDark} mt-8`}>
                    Schedule a site visit <Arrow />
                  </Cta>
                </Reveal>
              </div>

              {c.launches.length > 0 && (
                <ProjectsTimeline projects={c.launches} className="mt-16 md:mt-24" />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Strategic advantages: one wide photo, the four hubs on a panel that overlaps its foot. */}
      <section className="lux-scope lux-on-light bg-white px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Strategic location advantages</p>
              </Reveal>
              <Words
                text="Proximity that *protects* value."
                className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]"
              />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                Infrastructure and corporate growth are what keep a property in demand. These are the
                hubs we watch most closely.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <ParallaxImage
              src={media.onSitePhoto.src}
              alt={media.onSitePhoto.alt}
              sizes="(min-width: 1320px) 1320px, 100vw"
              className="aspect-[4/3] rounded-[28px] sm:aspect-[16/9] lg:aspect-[21/9]"
              range={50}
            />
          </Reveal>

          <ol className="relative mx-3 -mt-20 grid gap-px overflow-hidden rounded-[24px] bg-ink-900/[0.08] shadow-[0_40px_80px_-40px_rgba(11,23,51,0.4)] ring-1 ring-ink-900/[0.06] sm:grid-cols-2 md:mx-8 md:-mt-28 lg:mx-12 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <li key={a.title} className="group bg-white p-7 transition-colors duration-300 hover:bg-ivory md:p-8">
                <Reveal delay={i * 0.06}>
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 font-text text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                      <Icon name="pin" className="h-4 w-4 text-accent" />
                      {a.area}
                    </p>
                    <span className="font-text text-xs font-semibold tabular-nums text-ink-900/30 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 font-sans text-xl font-semibold leading-snug tracking-[-0.015em] md:text-[1.35rem]">
                    {a.title}
                  </h3>
                  <p className="mt-3 font-text text-[15px] leading-relaxed text-slate-ink">{a.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
            {[media.partners.sbi.logo, media.partners.pnb.logoWide].map((b) => (
              <span
                key={b.src}
                className="grid h-24 place-items-center rounded-[20px] bg-white px-7 shadow-[0_20px_40px_-28px_rgba(11,23,51,0.35)]"
              >
                <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-12 w-auto" />
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Questions we answer */}
      <section className="lux-scope bg-ink-900 px-6 py-24 text-ivory md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="lux-label text-accent-soft">Not sure yet?</p>
            </Reveal>
            <Words
              text="Questions we answer *every week.*"
              className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]"
            />
            <Reveal delay={0.1}>
              <Cta href={site.whatsapp} className={`${lux.primary} mt-9`}>
                Schedule a free consultation <Arrow />
              </Cta>
            </Reveal>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {questions.map((item, i) => (
              <li key={item.q}>
                <Reveal delay={i * 0.06} className="grid gap-4 py-9 sm:grid-cols-[60px_1fr]">
                  <span className="font-text text-sm font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="lux-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight">{item.q}</h3>
                    <p className="mt-3 max-w-[36rem] font-text text-base leading-relaxed text-ivory/70">{item.a}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Promise */}
      <section className="lux-scope lux-on-light bg-ivory px-6 py-24 text-center text-ink-900 md:py-28">
        <Reveal>
          <p className="lux-label justify-center text-royal">Our partnership promise</p>
          <BrandTagline size="lg" align="center" className="mt-8" />
          <p className="mx-auto mt-8 max-w-[44rem] font-sans text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium leading-snug tracking-[-0.02em]">
            Beyond the transaction, Applause Reality stays by your side as a dedicated ally — with
            support that begins before booking and lasts long after possession.
          </p>
        </Reveal>
      </section>

      <StoryGrid
        title="Investments that *paid off.*"
        intro="Real goals met through bank-approved projects and transparent dealings — the reason families and professionals keep trusting Applause Reality."
        stories={outcomes}
      />

      <ClosingCta
        label="Your next step"
        title="Ready to discuss your own *property plans?*"
        text="Tell us what you're looking for and we'll shortlist the right bank-approved project — then walk with you from the first visit to possession and beyond."
        actionLabel="Talk to an advisor"
        footnote="Noida · Greater Noida · Wave City Ghaziabad"
      />
    </>
  );
}
