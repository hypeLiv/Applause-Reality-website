import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

// Stays out of the index until the approved policy below replaces the placeholder.
export const metadata: Metadata = {
  ...pageMeta({
    title: "Privacy Policy",
    description:
      "How Applause Reality collects, uses and protects the details you share through consultation enquiries, WhatsApp and this website.",
    path: "/privacy-policy",
  }),
  robots: { index: false },
};

// TODO: paste the client's approved privacy policy text here before launch.
export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-[760px] px-4 sm:px-6 pb-24 pt-36 font-text text-ink-900 md:pt-44">
      <h1 className="lux-display text-4xl">Privacy Policy</h1>
      <p className="mt-6 text-lg leading-relaxed text-slate-ink">
        Applause Reality&apos;s privacy policy will be published here. For any questions about how
        we handle your information, write to{" "}
        <a href={`mailto:${site.email}`} className="text-royal underline">
          {site.email}
        </a>
        .
      </p>
    </section>
  );
}
