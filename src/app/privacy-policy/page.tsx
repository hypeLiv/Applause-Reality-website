import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

// TODO: paste the client's approved privacy policy text here before launch.
export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-[760px] px-6 pb-24 pt-36 font-text md:pt-44">
      <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-6 text-lg leading-relaxed">
        Applause Reality&apos;s privacy policy will be published here. For any questions about how
        we handle your information, write to{" "}
        <a href={`mailto:${site.email}`} className="text-navy underline">
          {site.email}
        </a>
        .
      </p>
    </section>
  );
}
