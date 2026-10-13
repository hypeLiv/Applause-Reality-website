import Image from "next/image";
import AdvisorForm from "@/components/AdvisorForm";
import VideoCard from "@/components/VideoCard";
import {
  BankLogos,
  Cta,
  HindiTagline,
  PhotoBackdrop,
  PromiseBand,
  btn,
} from "@/components/sections";
import { site } from "@/lib/site";

const perks = [
  { icon: "/images/icon-bank.jpg", text: "Direct access to premier bank networks" },
  { icon: "/images/icon-paper.jpg", text: "White-glove paper management" },
  { icon: "/images/icon-care.jpg", text: "Dedicated care far beyond possession" },
  { icon: "/images/icon-tailored.jpg", text: "Tailored solutions for diverse client backgrounds" },
];

const testimonials = [
  {
    quote:
      "Excellent service, professional approach, and complete transparency throughout the process. Thank you for making the property transaction smooth, hassle-free, and successful. Highly recommended.",
    by: "Rajeev Kumar Agrawal • Dy. General Manager • SBI",
  },
  {
    quote:
      "I would like to express my sincere gratitude for your invaluable support and guidance throughout the process of booking my new flat in Noida. Your guidance, prompt responses, and sincere efforts made the entire process seamless and stress-free. I truly appreciate your assistance and professionalism.",
    by: "Jitender Kumar • DGM • SBI",
  },
  {
    quote:
      "Deeply grateful for the seamless support from our first site visit to long after possession. Their dedicated care ensured every step was transparent and stress-free. Truly professional partners.",
    by: "Anurag • Analyst • PwC",
  },
];

const stats = [
  { value: "1000+", label: "Happy Families Served" },
  { value: "100%", label: "Satisfied Investors" },
  { value: "23+ Years", label: "Legacy Industry Expertise" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-36 md:px-14 lg:min-h-[966px]">
        <PhotoBackdrop src="/images/hero-living.jpg" alt="Modern living space" dim={0.45} priority />
        <div className="max-w-[1040px] text-white">
          <p className="font-aether text-lg font-bold uppercase tracking-[0.2em] md:text-[27px]">
            Delhi NCR&apos;s Most Trusted Assets
          </p>
          <h1 className="t-hero mt-6 font-inter font-normal">
            Expert Advocacy for Your Lifetime Real Estate Goals
          </h1>
          <p className="t-lead mt-6 max-w-[640px] font-aether text-mist">
            Choose safety with 100% bank-approved residential and corporate properties. We act as
            your lifelong consultants, providing security and institutional support at every step
            of your journey.
          </p>
          <Cta href="/projects" className={`${btn.pillDark} mt-10`}>
            Running Best Deals
          </Cta>
        </div>
      </section>

      <HindiTagline />

      <PromiseBand>
        We reject the hit-and-run broker culture. Applause Reality acts as your lifelong consultant,
        providing continuous value and advocacy far beyond the initial property signing.
      </PromiseBand>

      {/* Bank approved + project videos */}
      <section className="relative isolate overflow-hidden px-6 py-24 md:px-6 md:py-32">
        <PhotoBackdrop src="/images/building-facade.jpg" alt="Modern building facade" dim={0.6} />
        <div className="mx-auto max-w-[1100px] text-center text-white">
          <h2 className="t-h1 font-inter font-semibold">Bank Approved NCR Assets for Confident ROI</h2>
          <p className="t-lead mt-8 font-aether text-mist">
            End to end stewardship from first site visit to post possession. We value your time
            with curated shortlists, efficient tours and safe, bank approved assets so your
            weekends are never wasted on the wrong properties.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1400px] items-start gap-8 md:grid-cols-[1.9fr_1fr_1.95fr]">
          <VideoCard
            src="/videos/godrej-arden.mp4"
            poster="/images/poster-godrej-arden.jpg"
            title="Godrej Arden sample flat"
            className="aspect-video"
          />
          <VideoCard
            src="/videos/gulshan.mp4"
            poster="/images/poster-gulshan.jpg"
            title="Gulshan Empire walkthrough"
            className="mx-auto aspect-[9/16] w-full max-w-[300px]"
          />
          <VideoCard
            src="/videos/eternia.mp4"
            poster="/images/poster-eternia.jpg"
            title="Eternia Residences lobby"
            className="aspect-video"
          />
        </div>
      </section>

      {/* Investor strip */}
      <section className="bg-black px-6 py-8 md:px-9">
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="font-inter text-xl text-white md:text-[27px]">
            Guiding elite investors and families toward premium DELHI-NCR assets
          </p>
          <BankLogos />
        </div>
      </section>

      {/* Financial consulting */}
      <section className="relative isolate overflow-hidden bg-mist px-6 pb-16 pt-24 md:min-h-[1061px] md:px-6">
        <PhotoBackdrop src="/images/key-in-door.jpg" alt="Key in door" />
        <div className="mx-auto max-w-[1392px]">
          <h2 className="t-hero max-w-[900px] font-aether font-bold">
            Ensure Stability with Financial Consulting
          </h2>
          <p className="t-lead mt-8 max-w-[620px] font-aether italic">
            Leverage our elite SBI and PNB ties for stress-free loans, alongside projects from only
            the most trusted builders.
          </p>
          <Cta href={site.whatsapp} className={`${btn.navy} mt-10 px-14`}>
            Meet a Finance Expert
          </Cta>
          <h3 className="mt-12 font-display text-2xl font-semibold uppercase tracking-[0.05em] md:text-[27px]">
            Bank-Trusted Partner
          </h3>
          <BankLogos className="mt-4" />
          <ul className="mt-10 grid gap-8 rounded-sm bg-mist/85 p-8 sm:grid-cols-2 lg:max-w-[1210px] lg:grid-cols-4 lg:p-12">
            {perks.map((p) => (
              <li key={p.text}>
                <Image src={p.icon} alt="" width={46} height={46} className="mb-4 h-[46px] w-[46px]" />
                <span className="font-display text-xl font-semibold leading-tight">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A home for generations */}
      <section className="relative isolate overflow-hidden px-6 py-24 md:min-h-[933px] md:py-48">
        <PhotoBackdrop src="/images/residential-complex.jpg" alt="Modern residential complex" />
        <div className="ml-auto max-w-[795px] rounded-xl bg-ink p-8 text-white md:mr-[4%] md:p-14">
          <p className="font-aether text-lg uppercase tracking-[0.2em] text-lavender md:text-xl">
            A Home for Generations
          </p>
          <h2 className="t-h2 mt-3 font-aether tracking-tight">Your New Chapter Starts with Expert Help</h2>
          <p className="mt-6 font-inter text-lg leading-snug text-mist md:text-xl">
            Securing your premium residence is meant to be a celebration of your family&apos;s
            achievements. From the initial tour through the final handover and beyond, we remain
            your committed consultants to manage every legal and financial detail.
          </p>
          <Cta
            href={site.whatsapp}
            className="mt-10 flex h-16 items-center justify-center rounded-full bg-black/40 font-display text-xl font-bold uppercase tracking-[0.15em] ring-1 ring-white/10 transition-colors hover:bg-white/10"
          >
            Say Hello
          </Cta>
          <p className="mt-6 text-center font-inter text-[15px] uppercase tracking-[0.05em] text-white/40">
            Dedicated Household Growth • Total Guidance
          </p>
        </div>
      </section>

      {/* All solutions */}
      <section className="bg-black px-6 py-14 md:px-9">
        <div className="mx-auto max-w-[1380px] text-white">
          <h2 className="font-aether text-[32px] font-bold">All Solutions. One Trusted Partner.</h2>
          <p className="mt-4 font-inter text-xl leading-snug md:text-[27px]">
            Applause Reality brings bank-approved homes, commercial spaces, investments and loan
            support under one roof in Delhi NCR.
          </p>
        </div>
      </section>

      <HindiTagline as="h2" />

      {/* Testimonials + advisor form */}
      <section className="bg-periwinkle px-6 py-20 md:px-14 md:py-24">
        <h2 className="t-h2 text-center font-display font-semibold tracking-tight md:text-[60px]">
          Trusted By Those Who Fund Nation
        </h2>
        <div className="mx-auto mt-16 grid max-w-[1320px] gap-14 lg:grid-cols-[1fr_500px]">
          <div className="space-y-16">
            {testimonials.map((t) => (
              <figure key={t.by}>
                <blockquote className="font-text text-xl italic leading-snug md:text-[27px] md:leading-[1.4]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 font-text text-base uppercase tracking-[0.1em] md:text-lg">
                  {t.by}
                </figcaption>
              </figure>
            ))}
          </div>
          <aside id="advisor" className="self-start rounded-lg bg-ink p-8">
            <h3 className="font-aether text-4xl text-white">Meet Your Advisor</h3>
            <p className="mb-8 mt-4 font-inter text-xl leading-normal text-mist">
              Connect with a dedicated Delhi NCR relationship manager for personalized guidance on
              your next step.
            </p>
            <AdvisorForm />
          </aside>
        </div>
      </section>

      {/* Partners + stats */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-[1256px]">
          <h2 className="t-h2 text-center font-aether">Aligned with Global Quality Standards</h2>
          <p className="mx-auto mt-6 max-w-[760px] text-center font-inter text-lg md:text-xl">
            Applause Reality partners only with reputable developers and institutions that share
            our vision of client-first excellence.
          </p>
          <div className="mt-14 space-y-10 md:pl-24">
            <PartnerRow label="Industry Leaders">
              <Image src="/images/godrej.png" alt="Godrej" width={203} height={83} className="h-16 w-auto md:h-[83px]" />
              <Image src="/images/gulshan.png" alt="Gulshan — Experience Excellence" width={184} height={100} className="h-16 w-auto md:h-[100px]" />
              <Image src="/images/eternia.png" alt="Eternia" width={178} height={96} className="h-16 w-auto md:h-[96px]" />
            </PartnerRow>
            <PartnerRow label="Banking Partners">
              <Image src="/images/sbi.png" alt="SBI" width={157} height={68} className="h-14 w-auto md:h-[68px]" />
              <Image src="/images/pnb-full.png" alt="Punjab National Bank" width={327} height={103} className="h-16 w-auto md:h-[103px]" />
            </PartnerRow>
          </div>
          <dl className="mt-16 grid bg-slate-blue md:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center gap-4 px-6 py-10 text-center ${
                  i > 0 ? "border-t border-white/30 md:border-l md:border-t-0" : ""
                }`}
              >
                <dd className="font-display text-5xl font-semibold text-gold md:text-[54px]">{s.value}</dd>
                <dt className="order-last font-inter text-lg uppercase tracking-[0.05em] text-white">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-black px-6 py-24 text-center md:py-28">
        <h2 className="t-h2 mx-auto max-w-[900px] font-inter font-semibold text-white">
          Secure a Private Tour of Bank-Approved Assets
        </h2>
        <Cta href={site.whatsapp} className={`${btn.outlineLight} mt-12`}>
          Schedule Site Visit
        </Cta>
      </section>
    </>
  );
}

function PartnerRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-14 gap-y-6">
      <p className="w-36 font-aether text-xl font-bold uppercase leading-tight tracking-[0.1em] text-slate-blue">
        {label}
      </p>
      {children}
    </div>
  );
}
