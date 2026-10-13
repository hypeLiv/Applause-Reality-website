import type { Metadata } from "next";
import BrandTagline from "@/components/BrandTagline";
import ClosingCta from "@/components/home/ClosingCta";
import { ParallaxImage, Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Icon, lux } from "@/components/home/ui";
import PageHero from "@/components/page/PageHero";
import StoryGrid from "@/components/page/StoryGrid";
import { Cta } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NCR High Return Trusted Properties",
  description:
    "Noida, Greater Noida and Wave City Ghaziabad: compare NCR investment locations, price bands and growth potential with Applause Reality.",
};

const locations = [
  {
    name: "Noida",
    summary:
      "The primary commercial and IT hub of Uttar Pradesh, with world-class infrastructure and seamless Delhi connectivity.",
    advantages: ["Operational metro network", "Close to Film City & IT parks", "High rental demand"],
    price: "₹2.5 Cr – ₹32 Cr",
    potential: "High capital appreciation",
  },
  {
    name: "Greater Noida",
    summary:
      "A planned city built for high-end living — wide roads, generous greenery and mega infrastructure projects.",
    advantages: ["Near Jewar International Airport", "Formula 1 track zone", "Education & tech hub"],
    price: "₹1.5 Cr – ₹5 Cr",
    potential: "Surging long-term yields",
  },
  {
    name: "Wave City, Ghaziabad",
    summary:
      "A hi-tech township offering a smart lifestyle with automated systems and excellent NH-24 connectivity.",
    advantages: ["Smart-city infrastructure", "Wide internal road network", "Lush green landscapes"],
    price: "₹2 Cr – ₹5 Cr",
    potential: "Strategic investment value",
  },
];

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

const stories = [
  {
    eyebrow: "Noida, Sector 150",
    title: "SBI employee family",
    meta: "3 BHK luxury apartment · Handpicked for secure appreciation",
    quote:
      "“The 25% capital appreciation within just 18 months has given us true financial peace of mind.”",
  },
  {
    eyebrow: "Greater Noida West",
    title: "IT professional (MNC)",
    meta: "Premium studio apartment · Close to the upcoming metro",
    quote:
      "“Investing in a bank-approved project ensured a hassle-free home loan and guaranteed long-term rental value.”",
  },
  {
    eyebrow: "Wave City, Ghaziabad",
    title: "Retired corporate executive",
    meta: "Independent floor · Smart-city infrastructure gateway",
    quote:
      "“Transparent documentation and zero hidden costs made this my best property investment for stable long-term growth.”",
  },
];

export default function LocationsPage() {
  return (
    <>
      <SmoothScroll />
      <PageHero
        image="/images/locations-bg.jpg"
        alt="Landscaped residential complex with a pool in Delhi NCR"
        eyebrow="Where to invest in Delhi NCR"
        title="Top property investment *locations* in NCR."
        lead="We identify the most promising investment hubs in Delhi NCR — where proximity to infrastructure and corporate growth protects long-term value."
        actions={
          <>
            <Cta href={site.whatsapp} className={lux.heroPrimary}>
              Get a free consultation <Arrow />
            </Cta>
            <Cta href="/projects" className={lux.heroGlass}>
              Explore projects
            </Cta>
          </>
        }
      >
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { v: "3", l: "High-growth corridors" },
            { v: "₹1.5 Cr+", l: "Entry price band" },
            { v: "100%", l: "Bank-approved projects" },
          ].map((s) => (
            <div key={s.l} className="bg-ink-950/50 px-5 py-4 backdrop-blur-md">
              <dd className="font-sans text-2xl font-semibold tabular-nums text-white">{s.v}</dd>
              <dt className="order-first font-text text-xs uppercase tracking-[0.14em] text-white/60">{s.l}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Location comparison */}
      <section className="lux-scope lux-on-light bg-ivory px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Three corridors, compared</p>
              </Reveal>
              <Words
                text="Where your money *works hardest.*"
                className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]"
              />
            </div>
            <Reveal delay={0.1}>
              <p className="font-text text-lg leading-relaxed text-slate-ink">
                Price bands, growth drivers and the kind of return each corridor is known for — so
                you can see at a glance where your goals fit.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {locations.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col rounded-[28px] bg-white p-8 shadow-[0_1px_0_rgba(11,23,51,0.05),0_30px_60px_-36px_rgba(11,23,51,0.35)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-text text-sm font-semibold tabular-nums text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-royal/[0.08] px-3 py-1 font-text text-xs font-semibold text-royal">
                      {l.potential}
                    </span>
                  </div>
                  <h2 className="mt-6 font-sans text-3xl font-semibold tracking-[-0.03em]">{l.name}</h2>
                  <p className="mt-3 font-text text-base leading-relaxed text-slate-ink">{l.summary}</p>

                  <div className="mt-7 rounded-2xl bg-ivory px-5 py-4">
                    <p className="font-text text-xs uppercase tracking-[0.14em] text-slate-ink">Starting price</p>
                    <p className="mt-1 font-sans text-2xl font-semibold tabular-nums text-ink-900">{l.price}</p>
                  </div>

                  <p className="mt-7 font-text text-xs font-semibold uppercase tracking-[0.14em] text-slate-ink">
                    Key advantages
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {l.advantages.map((a) => (
                      <li key={a} className="flex items-start gap-3 font-text text-[15px]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brass/15 text-[#8f6420]">
                          <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Cta href={site.whatsapp} className={`${lux.ghostLight} w-full`}>
                      Schedule a site visit <Arrow />
                    </Cta>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Questions we answer */}
      <section className="lux-scope bg-ink-900 px-6 py-24 text-ivory md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="lux-label text-brass-soft">Not sure yet?</p>
            </Reveal>
            <Words
              text="Questions we answer *every week.*"
              className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]"
            />
            <Reveal delay={0.1}>
              <Cta href={site.whatsapp} className={`${lux.gold} mt-9`}>
                Schedule a free consultation <Arrow />
              </Cta>
            </Reveal>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {questions.map((item, i) => (
              <li key={item.q}>
                <Reveal delay={i * 0.06} className="grid gap-4 py-9 sm:grid-cols-[60px_1fr]">
                  <span className="font-text text-sm font-semibold tabular-nums text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.02em]">
                      {item.q}
                    </h3>
                    <p className="mt-3 max-w-[36rem] font-text text-base leading-relaxed text-ivory/70">{item.a}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Strategic advantages */}
      <section className="lux-scope lux-on-light bg-white px-6 py-24 text-ink-900 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:sticky lg:top-28">
            <ParallaxImage
              src="/images/construction-site.jpg"
              alt="Residential towers under construction in Delhi NCR"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/5] rounded-[28px]"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="lux-label text-royal">Strategic location advantages</p>
            </Reveal>
            <Words
              text="Proximity that *protects* value."
              className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[34rem] font-text text-lg leading-relaxed text-slate-ink">
                Infrastructure and corporate growth are what keep a property in demand. These are the
                hubs we watch most closely.
              </p>
            </Reveal>
            <ol className="mt-12 space-y-4">
              {advantages.map((a, i) => (
                <li key={a.title}>
                  <Reveal
                    delay={i * 0.06}
                    className="rounded-[24px] border border-ink-900/10 p-7 transition-colors duration-300 hover:border-brass/50 hover:bg-ivory"
                  >
                    <p className="flex items-center gap-2 font-text text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                      <Icon name="pin" className="h-4 w-4 text-brass" />
                      {a.area}
                    </p>
                    <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.02em]">{a.title}</h3>
                    <p className="mt-2 font-text text-base leading-relaxed text-slate-ink">{a.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
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
        stories={stories}
      />

      <ClosingCta
        image="/images/residential-complex.jpg"
        label="Free consultation"
        title="Get advice from NCR *property experts.*"
        text="Ethical, bank-approved property advice tailored to your investment goals. Pick a corridor and we'll arrange a callback or a site visit."
        actionLabel="Schedule a free consultation"
        footnote="Noida · Greater Noida · Wave City Ghaziabad"
      />
    </>
  );
}
