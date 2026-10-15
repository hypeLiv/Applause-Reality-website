import type { Metadata } from "next";
import { Fraunces, Hind, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import IntroLoader from "@/components/IntroLoader";
import JsonLd from "@/components/seo/JsonLd";
import { introGateScript } from "@/lib/intro";
import { absolute, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-inter",
});
// Light, high-contrast display serif for headings (free stand-in for Roslindale Display).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--ff-fraunces",
});
// Inter has no Devanagari; Hind covers the Hindi taglines and testimonials.
const hind = Hind({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-hind",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Applause Reality",
  },
  description: DEFAULT_DESCRIPTION,
  icons: { icon: "/images/logo-mark.png", apple: "/images/logo-mark.png" },
  // Fallbacks for routes without their own pageMeta(); pages restate these.
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

// Site-wide business identity. No street address yet: add it (matching the
// Google Business Profile exactly) as soon as the client confirms it.
const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": absolute("/#business"),
      name: site.name,
      url: site.url,
      logo: absolute("/images/logo.png"),
      image: absolute("/images/award-sbi.png"),
      description: DEFAULT_DESCRIPTION,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phones,
      areaServed: [
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Greater Noida" },
        { "@type": "City", name: "Ghaziabad" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
      ],
      founder: { "@type": "Person", name: "Rajiv Kumar Pandey", sameAs: [site.linkedin] },
      knowsAbout: ["Residential sales", "Commercial leasing", "Investment advisory", "Home-loan assistance"],
    },
    {
      "@type": "WebSite",
      "@id": absolute("/#website"),
      url: site.url,
      name: site.name,
      inLanguage: "en-IN",
      publisher: { "@id": absolute("/#business") },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The head script may add the intro-done class before hydration.
    <html lang="en" className={`${inter.variable} ${hind.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body>
        <JsonLd data={businessSchema} />
        <IntroLoader />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
