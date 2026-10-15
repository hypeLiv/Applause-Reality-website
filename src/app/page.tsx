import type { Metadata } from "next";
import ClosingCta from "@/components/home/ClosingCta";
import Finance from "@/components/home/Finance";
import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Partners from "@/components/home/Partners";
import Promise from "@/components/home/Promise";
import SmoothScroll from "@/components/home/SmoothScroll";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Walkthrough from "@/components/home/Walkthrough";
import { DEFAULT_DESCRIPTION, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ description: DEFAULT_DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Hero />
      <Promise />
      <Walkthrough />
      <Journey />
      <Stats />
      <Finance />
      <Testimonials />
      <Partners />
      <ClosingCta />
    </>
  );
}
