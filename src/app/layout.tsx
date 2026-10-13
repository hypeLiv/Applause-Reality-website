import type { Metadata } from "next";
import { Hind, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-inter",
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
    <html lang="en" className={`${inter.variable} ${hind.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
