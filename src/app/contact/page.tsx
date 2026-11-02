import type { Metadata } from "next";
import { Reveal, Words } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Icon, lux } from "@/components/home/ui";
import { Cta } from "@/components/sections";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { absolute, pageMeta } from "@/lib/seo";
import { maps, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description:
    "Call, WhatsApp or visit Applause Reality, Delhi NCR real estate consultants for Noida, Greater Noida and Ghaziabad. Free consultation.",
  path: "/contact",
});

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": absolute("/contact#page"),
  url: absolute("/contact"),
  name: "Contact Applause Reality",
  // The business, with its address and phone numbers, is declared once in the root layout.
  mainEntity: { "@id": absolute("/#business") },
};

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <SmoothScroll />
      <JsonLd data={contactSchema} />
      <section className="lux-scope lux-on-light bg-ivory px-4 sm:px-6 pb-24 pt-32 text-ink-900 md:px-10 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />

          <div className="mt-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="lux-label text-royal">Contact</p>
              </Reveal>
              <Words
                as="h1"
                immediate
                delay={0.1}
                text="Call, write or *drop by.*"
                className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[32rem] font-text text-lg leading-relaxed text-slate-ink">
                  Every enquiry reaches Rajiv Kr. Pandey&rsquo;s team directly. Tell us what you&rsquo;re looking for and
                  we&rsquo;ll take it from there.
                </p>

                <h2 className="mt-10 border-t border-ink-900/10 pt-8 font-sans text-2xl font-semibold tracking-[-0.02em]">
                  Office &amp; contact details
                </h2>
                <dl className="mt-7 space-y-8 font-text">
                  <div>
                    <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink">
                      <Icon name="pin" className="h-5 w-5 text-royal" /> Office
                    </dt>
                    <dd className="mt-3 text-base">
                      <address className="not-italic leading-relaxed">
                        {address.street},
                        <br />
                        {address.locality}, {address.region} {address.postalCode}
                      </address>
                      <a
                        href={maps.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lux-focus mt-2 inline-block font-semibold text-royal underline-offset-4 hover:underline"
                      >
                        Get directions
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink">
                      <Icon name="phone" className="h-5 w-5 text-royal" /> Phone
                    </dt>
                    <dd className="mt-3 space-y-1 text-base font-semibold">
                      {site.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-royal">
                          {p}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink">
                      <Icon name="document" className="h-5 w-5 text-royal" /> Email
                    </dt>
                    <dd className="mt-3 text-base font-semibold">
                      <a href={site.emailHref} className="hover:text-royal">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>

                <Cta href="/consultation" className={`${lux.primary} mt-10`}>
                  Book a free consultation <Arrow />
                </Cta>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-40px_rgba(11,23,51,0.35)] ring-1 ring-ink-900/5">
                <iframe
                  title="Applause Reality office on Google Maps"
                  src={maps.embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[420px] w-full border-0 lg:h-[560px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
