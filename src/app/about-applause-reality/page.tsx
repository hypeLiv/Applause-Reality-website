import type { Metadata } from "next";
import Image from "next/image";
import { Cta, HindiTagline, PromiseBand, btn } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trusted Real Estate Consultants for Delhi-NCR",
  description:
    "Meet Rajiv Kr. Pandey and Applause Reality: 23+ years guiding families, investors and SBI/PNB professionals through bank-approved Delhi NCR property.",
};

const bio = [
  "Rajiv Kr. Pandey, Founder & Real Estate Consultant With a distinguished career spanning over 23 years, he has established himself as a pillar of trust for families and investors throughout the Delhi NCR landscape.",
  "He has dedicated his professional life to serving as a steadfast companion to homeowners, helping a diverse range of clients navigate the pivotal milestones of property acquisition with ease and expertise. His approach is defined by a serene and composed guidance, offering a calm sanctuary in the often turbulent real estate market.",
  "Rajiv specializes in supporting the aspirations of corporate professionals and employees from prestigious institutions such as SBI and PNB, ensuring their financial decisions are backed by thorough market intelligence and a gentle, patient understanding of their unique needs.",
  "Beyond just a transaction, Rajiv’s sacred promise is to remain a devoted partner through every phase of the journey—from the very first site visit to the moment you receive your keys and well into the future. By managing complex documentation and loan approvals with absolute transparency, he ensures every client feels safe, protected and fully reassured that their legacy is in the most capable hands.",
];

const whyStats = [
  { value: "100%", label: "Bank-Approved Projects" },
  { value: "NCR", label: "Market Expertise" },
  { value: "L1", label: "Leasing Strength" },
];

const testimonials = [
  {
    quote:
      "I purchased my builder flat through Mr. Rajeev Kumar Pandey, and my experience was very positive. He guided me throughout the entire process, from property selection to documentation. His professional approach, prompt communication, and transparency helped make the purchase smooth and hassle-free. He was always available to address my queries and provided valuable assistance at every stage. I appreciate his dedication and would recommend him to anyone looking for reliable real estate guidance.",
    by: "Alok Kumar Mandal, Deputy Manager (State Bank of India)",
  },
  {
    quote:
      "Rajiv made the entire home-buying and loan process much easier for clients. He was always available to guide the interested parties. I have also experienced the same and he patiently answered my queries, and helped me secure the right home. His knowledge, honesty, and commitment to helping clients truly stand out. I would happily recommend him to anyone looking for support with property purchase and home financing.",
    by: "Netrapal Singh, AGM (State Bank of India)",
  },
  {
    quote:
      "I wanted to take a moment to sincerely thank you Rajeev Pandey ji of Applause group for all your help in securing my new dream flat Revulet of fusion group at Greater Noida. Your expertise, patience and dedication made what could have been stressful process feel incredibly smooth. I truly appreciate your going extra mile to bridge the gap between me and the builder. I could not have been done it without your honest efforts and guidance. Your candid approach towards the home buyers is testimonials for your credibility that one could trust you blindly for buying a flat at Noida/Greater Noida. All the best in your endeavours and for prospective home buyers in pursuit for a reliable builder amid lots of fake brokers around locality.",
    by: "Praveen Mansinghka, Investor",
  },
  {
    quote:
      "प्रिय राजीव पांडेय जी, जैसा कि हम सभी जानते हैं, दिल्ली एवं दिल्ली-एनसीआर में अपना एक सुंदर घर होना हर व्यक्ति का सपना होता है। रियल एस्टेट क्षेत्र में आपके 15 वर्षों से अधिक के अनुभव ने न जाने कितने लोगों के इस सपने को साकार करने में महत्वपूर्ण भूमिका निभाई है। लेकिन आपकी सबसे बड़ी विशेषता केवल आपका अनुभव नहीं, बल्कि आपका मानवीय दृष्टिकोण और लोगों के साथ लंबे समय तक भरोसेमंद संबंध बनाने की भावना है। आप सदैव अपने ग्राहकों की आवश्यकताओं को समझकर उन्हें ईमानदारी, पारदर्शिता और समर्पण के साथ सही मार्गदर्शन प्रदान करते हैं। आपकी कार्यशैली, व्यवहार-कुशलता और लोगों के प्रति आत्मीयता आपको इस क्षेत्र में एक विशिष्ट पहचान दिलाती है। मैं आपके उज्ज्वल भविष्य और निरंतर सफलता की कामना करता हूँ।",
    by: "हनिश शर्मा, Investor",
  },
];

const awards = [
  { src: "/images/award-sbi.png", caption: "Certificate of excellence From SBI", w: 458, h: 331 },
  { src: "/images/award-partnership.png", caption: "Partnerships and Perfomances Delivery", w: 458, h: 318 },
  { src: "/images/award-2000cr.png", caption: "", w: 321, h: 458 },
  { src: "/images/award-builder.png", caption: "Recognitions from Builder Perspective", w: 541, h: 394 },
  { src: "/images/award-corporate.png", caption: "Corporate Leadership Tie Ups", w: 381, h: 458 },
  { src: "/images/award-5.png", caption: "", w: 392, h: 367 },
];

const services = [
  {
    icon: "/images/service-residential.jpg",
    title: "Residential Sales",
    text: "Premium NCR homes and villas with verified bank approvals for secure living.",
  },
  {
    icon: "/images/service-commercial.jpg",
    title: "Commercial Leasing",
    text: "Strategic leasing for office and retail spaces in high-visibility NCR business districts.",
  },
  {
    icon: "/images/service-investment.jpg",
    title: "Investment Advisory",
    text: "Expert analysis and ROI strategies for residential and commercial property portfolios.",
  },
  {
    icon: "/images/service-loan.jpg",
    title: "Home Loan Assistance",
    text: "Seamless loan processing and documentation support via our bank-approved partnerships.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-black px-6 pb-20 pt-36 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="font-display text-4xl font-semibold uppercase tracking-[0.3em] text-navy md:text-[55px]">
            Applause Reality
          </h1>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_495px]">
            <div className="space-y-4 font-text text-lg leading-snug text-white md:text-[22px]">
              {bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <figure>
              <Image
                src="/images/founder.png"
                alt="Rajiv Kr. Pandey, founder of Applause Reality"
                width={495}
                height={587}
                className="h-auto w-full"
                priority
              />
              <figcaption className="mt-4 text-right font-text text-sm uppercase tracking-[0.15em] text-white/60">
                Mr. Rajiv Kr Pandey, Founder – Applause Reality
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <HindiTagline as="h2" />

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="t-h2 font-inter font-semibold">Our Mission</h2>
          <p className="t-body-lg mt-6 font-text">
            At Applause Reality, our mission is to redefine urban living by bridging corporate
            vision with residential excellence. We are committed to fostering trust and
            transparency in every transaction, ensuring long-term value for families, corporates
            and investors across the NCR region. Our focus remains steadfast on delivering secure,
            bank-approved properties that build lasting legacies for our clients.
          </p>
        </div>
      </section>

      <section className="bg-black px-6 py-20">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="t-h2 font-inter font-semibold text-white">Why Choose Applause Reality</h2>
          <p className="mx-auto mt-6 max-w-[760px] font-text text-lg text-white md:text-xl">
            We bring a premium edge to the NCR market, combining corporate professionalism with
            deep residential expertise to ensure your peace of mind.
          </p>
          <dl className="mt-16 grid gap-10 md:grid-cols-3">
            {whyStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <dd className="font-display text-6xl font-semibold text-navy md:text-[72px]">{s.value}</dd>
                <dt className="order-last font-inter uppercase tracking-[0.12em] text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PromiseBand>
        Applause Reality orbits your journey as a trusted family guide. From your first visit and
        booking to bank approvals and eventual possession, we walk with you through every
        milestone.
      </PromiseBand>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="t-h2 text-center font-display font-semibold md:text-6xl">Client Success Stories</h2>
          <p className="mx-auto mt-6 max-w-[1000px] text-center font-text text-lg md:text-xl">
            These are the genuine experiences and success stories of families, investors, and
            banking partners who have placed their trust in Applause Reality under the steadfast
            guidance of Mr. Rajiv Kumar Pandey (Rajiv ji). His career is built on the foundation of
            transparency, unwavering honesty, and the cultivation of deep, long-term relationships.
          </p>
          <div className="mt-14 space-y-12">
            {testimonials.map((t) => (
              <figure key={t.by}>
                <blockquote className="font-text text-lg italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-right font-text text-[17px]">{t.by}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Cta href={site.whatsapp} className={`${btn.navy} uppercase tracking-[0.08em]`}>
              Start Your Success Story
            </Cta>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center font-display text-5xl font-semibold text-white md:text-[82px] md:leading-none">
            Awards, Mentions &amp; Trust
          </h2>
          <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
            {awards.map((a) => (
              <figure key={a.src} className="mb-8 break-inside-avoid">
                {a.caption && (
                  <figcaption className="mb-3 font-display text-lg font-semibold text-white">{a.caption}</figcaption>
                )}
                <Image src={a.src} alt={a.caption || "Applause Reality recognition"} width={a.w} height={a.h} className="h-auto w-full" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e6ecff] px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="t-h2 text-center font-inter font-semibold">Services Overview</h2>
          <p className="mx-auto mt-5 max-w-[760px] text-center font-text text-lg md:text-xl">
            Comprehensive real estate pillars designed to secure your prime assets and streamline
            your property journey in Delhi NCR.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article key={s.title} className="rounded-lg bg-white/70 p-6 text-center shadow-sm">
                <Image src={s.icon} alt="" width={55} height={55} className="mx-auto h-[55px] w-[55px]" />
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">{s.title}</h3>
                <p className="mt-2 font-text">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 text-center">
        <h2 className="t-h2 font-inter font-semibold text-white">Book a Free Consultation</h2>
        <p className="mx-auto mt-6 max-w-[620px] font-text text-lg text-white">
          Discuss residential, commercial, leasing, investment or loan needs with our experts.
        </p>
        <Cta href={site.whatsapp} className={`${btn.white} mt-10`}>
          Schedule Now
        </Cta>
      </section>
    </>
  );
}
