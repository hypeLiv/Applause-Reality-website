import type { Metadata } from "next";
import {
  Hind,
  Instrument_Serif,
  Inter,
  Space_Grotesk,
  Tiro_Devanagari_Hindi,
  Wix_Madefor_Display,
  Wix_Madefor_Text,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import { site } from "@/lib/site";

const madeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  variable: "--ff-madefor-display",
});
const madeforText = Wix_Madefor_Text({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-madefor-text",
});
const inter = Inter({ subsets: ["latin"], variable: "--ff-inter" });
const aether = Space_Grotesk({ subsets: ["latin"], variable: "--ff-aether" });
const hind = Hind({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--ff-hind",
});
// Echoes the serif "REALITY" in the logo; used by the landing page.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--ff-serif",
});
const deva = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--ff-deva",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Trusted Real Estate Consultants | Applause Reality Local Experts",
    template: "%s | Applause Reality",
  },
  description:
    "Bank-approved residential and corporate properties across Delhi NCR, with lifelong consulting from first site visit to post-possession.",
  icons: { icon: "/images/logo-mark.png", apple: "/images/logo-mark.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${madeforDisplay.variable} ${madeforText.variable} ${inter.variable} ${aether.variable} ${hind.variable} ${serif.variable} ${deva.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
