import type { Metadata } from "next";
import { Cta, PhotoBackdrop, PromiseBand, StoryCards, btn } from "@/components/sections";
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
      "The primary commercial and IT hub of Uttar Pradesh, offering world-class infrastructure and seamless Delhi connectivity.",
    advantages: ["Operational Metro Network", "Proximity to Film City & IT Parks", "High Rental Demand"],
    price: "₹2.5CR - ₹32Cr",
    potential: "High Capital Appreciation",
  },
  {
    name: "Greater Noida",
    summary:
      "A planned city designed for high-end living with wide roads, ample greenery, and mega infrastructure projects.",
    advantages: ["Jewar International Airport Proximity", "Formula 1 Track Zone", "Educational & Tech Hub"],
    price: "₹1.5CR - ₹5Cr",
    potential: "Surging Long-term Yields",
  },
  {
    name: "Wave City Ghaziabad",
    summary:
      "A Hi-Tech township offering a smart lifestyle with automated systems and excellent NH-24 connectivity.",
    advantages: ["Smart City Infrastructure", "Wide Internal Road Network", "Lush Green Landscapes"],
    price: "₹2CR - ₹5Cr",
    potential: "Strategic Investment Value",
  },
];

const prompts = [
  {
    q: "Confused About Where to Invest?",
    a: "Our market experts analyze growth corridors, infrastructure developments, and demand trends to help you invest with confidence.",
  },
  {
    q: "Looking for the Best Property Within Your Budget?",
    a: "From premium apartments to commercial assets, we shortlist properties that match your goals and financial plans.",
  },
  {
    q: "Need Guidance Before Making a Decision?",
    a: "Get personalized recommendations, project comparisons, and financing support from experienced real estate advisors.",
  },
];

const advantages = [
  {
    title: "Industrial Corridor Access",
    text: "Strategically positioned near major industrial zones, Ghaziabad offers unparalleled connectivity for corporate clients and investors seeking high-yield returns.",
  },
  {
    title: "Infrastructure Hub",
    text: "As the gateway to the National Capital Region, Noida provides seamless access to Delhi's financial and commercial centers, making it ideal for ready-to-move flats.",
  },
  {
    title: "Emerging Growth Zone",
    text: "Greater Noida is witnessing rapid urbanization and infrastructure expansion, creating a fertile ground for long-term residential and investment opportunities.",
  },
  {
    title: "Modern Residential Living",
    text: "Offering a blend of luxury and convenience, Vaishali provides a premium lifestyle for families and investors looking for bank-approved, high-end properties.",
  },
];

const stories = [
  {
    label: "Noida, Sector 150",
    role: "SBI Employee Family",
    quote:
      "“The 25% capital appreciation within just 18 months has given us true financial peace of mind.”",
    by: "3 BHK Luxury Apartment • Handpicked for Secure Appreciation",
  },
  {
    label: "Greater Noida West",
    role: "IT Professional (MNC)",
    quote:
      "“Investing in a bank-approved project ensured a hassle-free home loan and guaranteed long-term rental value.”",
    by: "Premium Studio Apartment • Proximity to Upcoming Metro",
  },
  {
    label: "Wave City, Ghaziabad",
    role: "Retired Corporate Executive",
    quote:
      "“Transparent documentation and zero hidden costs made this my best property investment for stable long-term growth.”",
    by: "Independent Floor • Smart City Infrastructure Gateway",
  },
];

export default function LocationsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-24 pt-36 md:pt-44">
        <PhotoBackdrop src="/images/locations-bg.jpg" alt="Modern apartment complex" />
        <div className="absolute inset-0 -z-10 bg-white/70" />
        <div className="mx-auto max-w-[1340px]">
          <h1 className="t-h2 text-center font-display font-semibold">
            Top Property Investment Locations in NCR
          </h1>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {locations.map((l) => (
              <article
                key={l.name}
                className="flex flex-col rounded-[9px] bg-[#fffdf5] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <h2 className="font-display text-[37px] font-bold leading-tight">{l.name}</h2>
                <p className="mt-3 font-text text-xl font-bold leading-snug">{l.summary}</p>
                <h3 className="mt-6 font-display text-[27px] font-bold uppercase text-slate-blue">
                  Key Advantages:
                </h3>
                <ul className="mt-4 list-disc space-y-1 pl-10 font-text font-semibold">
                  {l.advantages.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="mt-8 font-text text-lg font-bold text-slate-blue">Starting Price:</p>
                <p className="font-display text-[32px] font-semibold text-navy">{l.price}</p>
                <p className="mt-6 font-text text-lg font-bold text-slate-blue">Investment Potential:</p>
                <p className="font-text text-xl italic">{l.potential}</p>
                <Cta href={site.whatsapp} className={`${btn.navy} mt-auto self-start translate-y-0 pt-4`}>
                  Schedule Site Visit
                </Cta>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-[900px] space-y-10 text-center">
            {prompts.map((p, i) => (
              <div key={p.q}>
                <h3
                  className={`font-display leading-tight ${
                    i === 0 ? "text-4xl font-bold md:text-5xl" : "text-3xl md:text-[41px]"
                  }`}
                >
                  {p.q}
                </h3>
                <p className="mt-3 font-text text-lg md:text-xl">{p.a}</p>
              </div>
            ))}
            <Cta href={site.whatsapp} className={btn.navy}>
              Schedule a Free Consultation
            </Cta>
          </div>
        </div>
      </section>

      <PromiseBand>
        Beyond transactional coaching, Applause Reality stays by your side as a dedicated ally. We
        foster deep trust through enduring support that begins before and lasts long after yours.
      </PromiseBand>

      <section className="relative isolate overflow-hidden px-6 py-20 md:py-28">
        <PhotoBackdrop src="/images/construction-site.jpg" alt="Construction site view" />
        <div className="mx-auto max-w-[1300px]">
          <h2 className="t-h2 font-display font-semibold md:text-6xl">Strategic Location Advantages</h2>
          <p className="t-body-lg mt-6 max-w-[1100px] font-text">
            We identify the most promising investment hubs in Delhi NCR, where proximity to
            infrastructure and corporate growth ensures long-term value.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {advantages.map((a, i) => (
              <article
                key={a.title}
                className={`rounded-[28px] bg-periwinkle-soft/95 p-8 ${i % 2 ? "md:mt-16" : ""}`}
              >
                <h3 className="font-display text-2xl font-semibold md:text-[27px]">{a.title}</h3>
                <p className="t-body-lg mt-3 font-text">{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="t-h2 text-center font-display font-semibold text-white">Client Success Stories</h2>
          <p className="mx-auto mb-12 mt-5 max-w-[860px] text-center font-text text-lg text-white md:text-xl">
            Realizing investment goals through bank-approved projects and transparent dealings.
            Discover why families and professionals trust Applause Reality.
          </p>
          <StoryCards stories={stories} />
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-center md:py-24">
        <h2 className="t-h2 mx-auto max-w-[1100px] font-display font-semibold">
          Get a Free Consultation with NCR Property Experts
        </h2>
        <p className="mx-auto mt-6 max-w-[860px] font-text text-lg md:text-xl">
          We provide ethical, bank-approved NCR property advice tailored to your investment goals.
          Choose your preferred location and request a callback or site visit today.
        </p>
        <Cta href={site.whatsapp} className={`${btn.navy} mt-10`}>
          Schedule a Free Consultation
        </Cta>
      </section>
    </>
  );
}
