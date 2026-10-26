import type { Metadata } from "next";
import { Fraunces, Hind, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { BlurProvider } from "@/components/Image";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import IntroLoader from "@/components/IntroLoader";
import JsonLd from "@/components/seo/JsonLd";
import { introGateScript } from "@/lib/intro";
import { absolute, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";
import { site } from "@/lib/site";
import { getBlurMap, getSiteMedia, type SiteMedia } from "@/sanity/media";

// Warm geometric sans for body, labels and UI.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-sans",
});
// Light, high-contrast display serif for headings (free stand-in for Roslindale Display).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--ff-fraunces",
});
// Jakarta has no Devanagari; Hind covers the Hindi taglines and testimonials.
const hind = Hind({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-hind",
});

export async function generateMetadata(): Promise<Metadata> {
  const { icon } = await getSiteMedia();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: DEFAULT_TITLE,
      template: "%s | Applause Reality",
    },
    description: DEFAULT_DESCRIPTION,
    icons: { icon: icon.src, apple: icon.src },
    // Fallbacks for routes without their own pageMeta(); pages restate these.
    openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
    twitter: { card: "summary_large_image" },
  };
}

// Site-wide business identity. No street address yet: add it (matching the
// Google Business Profile exactly) as soon as the client confirms it, along
// with any company social profiles in sameAs.
const businessSchema = (media: SiteMedia) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": absolute("/#business"),
      name: site.name,
      url: site.url,
      logo: absolute(media.logo.src),
      image: absolute(media.featuredAward.src),
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
      sameAs: [site.google.mapsUrl],
      founder: { "@id": absolute("/#founder") },
      knowsAbout: ["Residential sales", "Commercial leasing", "Investment advisory", "Home-loan assistance"],
    },
    {
      "@type": "Person",
      "@id": absolute("/#founder"),
      name: site.founder,
      jobTitle: "Founder",
      worksFor: { "@id": absolute("/#business") },
      sameAs: [site.linkedin],
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
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [media, blurMap] = await Promise.all([getSiteMedia(), getBlurMap()]);
  return (
    // The head script may add the intro-done class before hydration.
    <html lang="en" className={`${jakarta.variable} ${hind.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      {/* lux-day: the site-wide daylight treatment (royal actions and accents; see globals.css). */}
      <body className="lux-day">
        <JsonLd data={businessSchema(media)} />
        <IntroLoader />
        <BlurProvider map={blurMap}>
          <Header logo={media.logo} logoOnDark={media.logoOnDark} />
          <main>{children}</main>
          <Footer />
          <ChatButton />
        </BlurProvider>
      </body>
    </html>
  );
}
