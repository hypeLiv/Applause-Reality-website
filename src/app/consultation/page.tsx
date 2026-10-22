import type { Metadata } from "next";
import AdvisorForm from "@/components/AdvisorForm";
import BrandTagline from "@/components/BrandTagline";
import { Icon } from "@/components/home/ui";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Book a Free Consultation",
  description:
    "Talk to a Delhi NCR relationship manager about bank-approved homes, commercial spaces, investments and home loans.",
  path: "/consultation",
});

const reasons = [
  "Shortlists of bank-approved projects that fit your budget",
  "Priority processing for SBI and PNB employees",
  "Help with home loans, paperwork and possession",
];

export default function ConsultationPage() {
  return (
    <section className="lux-scope lux-on-light bg-ivory px-4 sm:px-6 pb-24 pt-32 text-ink-900 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="lux-label text-royal">Free consultation</p>
          <h1 className="lux-display mt-6 text-[clamp(2.4rem,4.4vw,4rem)]">
            Talk to a Delhi NCR <em>relationship</em> manager.
          </h1>
          <BrandTagline size="md" className="mt-6" />
          <p className="mt-6 max-w-[32rem] font-text text-lg leading-relaxed text-slate-ink">
            Share a few details and we&apos;ll call you back to plan your next step — from the
            first site visit to long after possession.
          </p>

          <ul className="mt-8 space-y-3 font-text text-base text-ink-900">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-3 border-t border-ink-900/10 pt-8 font-text">
            <p className="text-sm text-slate-ink">Prefer to talk now?</p>
            <a href={site.phone.href} className="flex items-center gap-3 font-semibold hover:text-royal">
              <Icon name="phone" className="h-5 w-5 text-royal" /> {site.phone.display}
            </a>
            <a href={site.emailHref} className="flex items-center gap-3 font-semibold hover:text-royal">
              <Icon name="document" className="h-5 w-5 text-royal" /> {site.email}
            </a>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-40px_rgba(11,23,51,0.35)] md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-sans text-2xl font-semibold tracking-[-0.02em]">Request a callback</h2>
              <p className="mt-2 font-text text-sm text-slate-ink">All fields are required unless marked optional.</p>
            </div>
            <span className="shrink-0 rounded-full bg-royal/[0.08] px-3 py-1.5 font-text text-xs font-semibold text-royal">
              Free consultation
            </span>
          </div>
          <div className="mb-8 mt-7 h-px bg-ink-900/[0.08]" />
          <AdvisorForm withMessage />
        </div>
      </div>
    </section>
  );
}
