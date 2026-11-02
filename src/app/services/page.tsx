import type { Metadata } from "next";
import Image from "@/components/Image";
import ClosingCta from "@/components/home/ClosingCta";
import { Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Icon, lux } from "@/components/home/ui";
import PageHero from "@/components/page/PageHero";
import { Cta } from "@/components/sections";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { absolute, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getSiteMedia } from "@/sanity/media";

export const metadata: Metadata = pageMeta({
  title: "Real Estate Services in Delhi NCR",
  description:
    "Residential sales, commercial leasing, investment advisory and home-loan assistance across Noida, Greater Noida and Ghaziabad — from one advisor.",
  path: "/services",
});

// One Service per offering, tied to the business declared in the root layout.
const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((s) => ({
    "@type": "Service",
    "@id": absolute(`/services#${s.id}`),
    url: absolute(`/services#${s.id}`),
    name: s.title,
    serviceType: s.title,
    description: s.text,
    provider: { "@id": absolute("/#business") },
    areaServed: [
      { "@type": "City", name: "Noida" },
      { "@type": "City", name: "Greater Noida" },
      { "@type": "City", name: "Ghaziabad" },
    ],
  })),
};

export default async function ServicesPage() {
  const media = await getSiteMedia();

  return (
    <>
      <SmoothScroll />
      <JsonLd data={servicesSchema} />

      <PageHero
        image={media.services.residential.src}
        alt={media.services.residential.alt}
        eyebrow="What we do"
        title="Four services, *one* advisor beside you."
        lead="Whether you're buying your first home, leasing an office or building a portfolio, Applause Reality handles the search, the paperwork and the loan — and stays on call after possession."
        actions={
          <Cta href={site.whatsapp} className={lux.dayPrimary}>
            Book a free consultation <Arrow />
          </Cta>
        }
      >
        <ul className="flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="lux-focus inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/85 px-4 py-2 font-text text-sm font-semibold text-ink-900 backdrop-blur-md transition-colors hover:bg-white"
              >
                <Icon name={s.icon} className="h-4 w-4 text-royal" />
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {services.map((s, i) => {
        const photo = media.services[s.photo];
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={`lux-scope lux-on-light scroll-mt-24 px-4 py-24 text-ink-900 sm:px-6 md:px-10 md:py-32 ${i % 2 === 0 ? "bg-white" : "bg-ivory"}`}
          >
            <div className="mx-auto max-w-[1320px]">
              {i === 0 && (
                <div className="mb-14">
                  <Breadcrumbs
                    items={[
                      { name: "Home", href: "/" },
                      { name: "Services", href: "/services" },
                    ]}
                  />
                </div>
              )}
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? "lg:order-last" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(11,23,51,0.35)] ring-1 ring-ink-900/5">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>

                <div>
                  <Reveal>
                    <p className="lux-label text-royal">Service {String(i + 1).padStart(2, "0")}</p>
                  </Reveal>
                  <Words
                    text={s.title}
                    className="lux-display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]"
                  />
                  <Reveal delay={0.1}>
                    <p className="mt-6 max-w-[34rem] font-text text-lg leading-relaxed text-slate-ink">{s.text}</p>
                    {s.points.length > 0 && (
                      <ul className="mt-8 space-y-3">
                        {s.points.map((point) => (
                          <li key={point} className="flex items-start gap-3 font-text text-base text-ink-900">
                            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-royal" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-8 font-text text-sm text-slate-ink">
                      <span className="font-semibold uppercase tracking-[0.16em] text-ink-900">Who it&rsquo;s for</span>
                      <span className="mt-1 block text-base">{s.audience}</span>
                    </p>
                    <Cta href={s.cta.href} className={`${lux.ghostLight} mt-9`}>
                      {s.cta.label} <Arrow />
                    </Cta>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <ClosingCta
        label="Your next step"
        title="Not sure which service you *need?*"
        text="Tell us what you're looking for — a home, an office, an investment or a loan — and we'll point you to the right next step."
        actionLabel="Talk to an advisor"
        footnote="Residential · Commercial · Investment · Home loans"
      />
    </>
  );
}
