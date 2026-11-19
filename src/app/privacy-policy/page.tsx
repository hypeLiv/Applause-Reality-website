import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
  alternates: { canonical: "/privacy-policy" },
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

      <h2 className="mt-12 font-sans text-2xl font-semibold tracking-[-0.02em]">Analytics</h2>
      <p className="mt-4 text-lg leading-relaxed text-slate-ink">
        We use Google Analytics to understand how visitors find and use this website, such as which pages are
        viewed, how visitors arrive here and whether they contact us. Google Analytics sets cookies and collects
        information like your approximate location, device and browser; it does not give us your name or contact
        details. You can learn how Google uses this data at{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="text-royal underline"
        >
          policies.google.com
        </a>{" "}
        and opt out with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-royal underline">
          Google Analytics opt-out browser add-on
        </a>
        .
      </p>
    </section>
  );
}
