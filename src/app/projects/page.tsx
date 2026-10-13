import type { Metadata } from "next";
import Image from "next/image";
import { BankLogos, Cta, PhotoBackdrop, PromiseBand, StoryCards, btn } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NCR Luxury Projects",
  description:
    "Newly launched, bank-approved NCR developments: Hero Homes Sector MU, Gulshan Wave City, Godrej Arden and Eternia Residences.",
};

type Project = {
  key: string;
  backdrop: string;
  logo: { src: string; alt: string; w: number; h: number };
  photo: { src: string; alt: string; w: number; h: number };
  highlights: { src: string; alt: string; w: number; h: number };
  location: string;
  paragraphs: string[];
  brochure: string;
};

const projects: Project[] = [
  {
    key: "hero-homes",
    backdrop: "/images/projects-hero-bedroom.jpg",
    logo: { src: "/images/hero-homes-logo.png", alt: "Hero Homes logo", w: 392, h: 154 },
    photo: { src: "/images/hero-homes-render.png", alt: "Hero Homes Sector MU towers", w: 760, h: 563 },
    highlights: {
      src: "/images/hero-homes-highlights.png",
      alt: "Hero Homes Sector MU, Greater Noida project highlights",
      w: 716,
      h: 529,
    },
    location: "Sector MU, Greater Noida.",
    paragraphs: [
      "Hero Homes Sector MU, Greater Noida, presents premium 3 BHK residences designed for spacious, modern and healthier living. Spread across approximately 4.7 acres, the limited three-tower community features landscaped green spaces, jogging tracks, a clubhouse, swimming pool and fitness facilities.",
      "Thoughtfully planned homes range from 1,650 to 2,200 sq. ft., while the proposed AQI-controlled environment supports everyday wellness. It brings together contemporary design, privacy, comfort and lifestyle-focused amenities in a promising Greater Noida residential address.",
    ],
    brochure: "/brochures/hero-homes.pdf",
  },
  {
    key: "gulshan",
    backdrop: "/images/projects-bg-bedroom.jpg",
    logo: { src: "/images/gulshan-empire-logo.jpg", alt: "Gulshan Empire logo", w: 357, h: 112 },
    photo: { src: "/images/gulshan-towers.png", alt: "Aerial view of Gulshan Wave City towers", w: 830, h: 490 },
    highlights: {
      src: "/images/gulshan-highlights.png",
      alt: "Gulshan Wave City project highlights",
      w: 791,
      h: 529,
    },
    location: "Wave City Ghaziabad",
    paragraphs: [
      "Gulshan Wave City in Ghaziabad is a premium residential enclave by the reputed Gulshan Group, offering a refined lifestyle amid planned green surroundings and strong civic infrastructure. The project features well-laid-out 3 and 4 BHK apartments with modern comforts and thoughtful community spaces.",
      "Located within Wave City on NH-24, this integrated township is designed with ample open areas, wide roads and essential services, and enjoys convenient connectivity across the wider Delhi–NCR region.",
    ],
    brochure: "/brochures/gulshan-wave-city.pdf",
  },
  {
    key: "godrej-arden",
    backdrop: "/images/projects-bg-window.jpg",
    logo: { src: "/images/godrej-arden-logo.png", alt: "Godrej Arden logo", w: 563, h: 113 },
    photo: { src: "/images/godrej-arden-living.png", alt: "Godrej Arden living space", w: 804, h: 471 },
    highlights: {
      src: "/images/godrej-arden-highlights.png",
      alt: "Godrej Arden Sigma III project highlights",
      w: 778,
      h: 516,
    },
    location: "Sector Sigma III, Greater Noida",
    paragraphs: [
      "Situated in the established neighborhood of Pari Chowk, this development prioritizes quiet living and family well-being. The estate covers 9.58 acres with nine residential towers comprising spacious 3 and 4 BHK layouts.",
      "By maintaining a low density of just 90 residents per acre, the project offers a secure and private sanctuary for your loved ones. A dedicated multi-level clubhouse provides essential recreation for all generations.",
    ],
    brochure: "/brochures/godrej-arden.pdf",
  },
  {
    key: "eternia",
    backdrop: "/images/projects-bg-room.jpg",
    logo: { src: "/images/eternia.png", alt: "Eternia Residences logo", w: 333, h: 105 },
    photo: { src: "/images/eternia-living.png", alt: "Eternia Residences living room", w: 705, h: 567 },
    highlights: {
      src: "/images/eternia-highlights.png",
      alt: "Eternia Residences amenities list",
      w: 814,
      h: 528,
    },
    location: "Greater Noida West",
    paragraphs: [
      "Eternia Residences in Greater Noida West is an ultra-luxury residential community in Tech Zone 4, planned for calm, comfortable family living. The project offers thoughtfully designed 1, 2, 3 and 4 BHK apartments with contemporary amenities and everyday conveniences.",
      "The location connects smoothly to the Noida–Greater Noida Link Road, Yamuna Expressway and the upcoming Jewar Airport corridor. Daily needs are close by, with a nearby metro station, reputed schools like Lotus Valley, Fortis Hospital and Gaur City Mall all within a short drive.",
    ],
    brochure: "/brochures/eternia.pdf",
  },
];

const stories = [
  {
    label: "Outcome: Secured a Better Deal",
    quote: "Excellent home councilor work and services in Real Estate.",
    by: "A K Agarwal — Homebuyer, Chief Manager, SBI",
  },
  {
    label: "Outcome: Faster Possession",
    quote:
      "“We weren't just sold a dream; the follow-up with the developer ensured we got our keys 3 months early.”",
    by: "— Investor, Sector 150 Noida",
  },
  {
    label: "Outcome: Stress-Free Loan Process",
    quote:
      "My experience with Applause Reality while booking my flat was truly wonderful. From site visits to final handover, everything was handled seamlessly and it was made sure I had zero hassle with paperwork. Grateful to Applause Reality for making this journey so smooth",
    by: "Ashwani Baunthiyal — Homebuyer, SBI Dwarka",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-black px-6 pb-16 pt-36 md:pt-40">
        <h1 className="t-h2 mx-auto max-w-[1100px] text-center font-display font-semibold text-white md:text-6xl">
          Exclusive Newly Launch Access to NCR&apos;s Finest Developments
        </h1>
      </section>

      {projects.map((p, i) => (
        <ProjectShowcase key={p.key} project={p} flip={i % 2 === 1} />
      ))}

      <PromiseBand title="Exclusive Banking Perks">
        Applause Reality offers SBI and PNB employees specialized fast-track processing and
        priority access to NCR assets. Our personalized service ensures a secure and efficient path
        to property ownership.
      </PromiseBand>

      <section className="bg-black px-6 py-20">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="t-h2 mb-12 text-center font-inter font-semibold text-white">Client Success Stories</h2>
          <StoryCards stories={stories} />
          <div className="mx-auto mt-20 max-w-[640px] rounded-xl bg-mist px-8 py-12 text-center">
            <h2 className="font-inter text-2xl font-semibold md:text-[32px]">
              Ready to discuss your own property plans?
            </h2>
            <Cta href={site.whatsapp} className={`${btn.navy} mt-8`}>
              Talk to an advisor
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectShowcase({ project: p, flip }: { project: Project; flip: boolean }) {
  // The live layout alternates: odd projects lead with the logo/photo pair mirrored.
  const textBlock = (
    <div>
      <Image
        src={p.logo.src}
        alt={p.logo.alt}
        width={p.logo.w}
        height={p.logo.h}
        className="h-auto max-h-[150px] w-auto max-w-full"
      />
      <p className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-[#7a1f1f]">
        {p.location}
      </p>
      {p.paragraphs.map((t) => (
        <p key={t.slice(0, 24)} className="mt-4 font-text text-lg font-semibold leading-snug">
          {t}
        </p>
      ))}
    </div>
  );

  const actions = (
    <div className="flex flex-col items-start gap-6 lg:items-center lg:justify-center">
      <p className="font-display text-lg font-semibold">
        Safe NCR Growth | Bank Approved | Corporate &amp; HR Schemes
      </p>
      <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
        <a href={p.brochure} target="_blank" rel="noopener noreferrer" className={`${btn.navy} w-64`}>
          Download Brochure
        </a>
        <Cta href={site.whatsappProjects} className={`${btn.navy} w-64`}>
          Click to Know More
        </Cta>
      </div>
      <div>
        <p className="mb-3 font-display text-sm font-bold uppercase">100% Verified By :</p>
        <BankLogos />
      </div>
    </div>
  );

  return (
    <section id={p.key} className="relative isolate scroll-mt-24 overflow-hidden px-4 py-12 md:py-16">
      <PhotoBackdrop src={p.backdrop} />
      <div className="absolute inset-0 -z-10 bg-white/80" />
      <div className="mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-2">
        <div className={flip ? "lg:order-2" : ""}>
          <Image src={p.photo.src} alt={p.photo.alt} width={p.photo.w} height={p.photo.h} className="h-auto w-full" />
        </div>
        <div className={flip ? "lg:order-1" : ""}>{textBlock}</div>
        <div className={flip ? "lg:order-4" : "lg:order-3"}>{actions}</div>
        <div className={flip ? "lg:order-3" : "lg:order-4"}>
          <Image
            src={p.highlights.src}
            alt={p.highlights.alt}
            width={p.highlights.w}
            height={p.highlights.h}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
