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
import { getProjects, getSiteMedia } from "@/sanity/media";

export const metadata: Metadata = pageMeta({ description: DEFAULT_DESCRIPTION, path: "/" });

export default async function Home() {
  // Both reads share one cached Sanity fetch. (`Promise` here is the section component.)
  const media = await getSiteMedia();
  const projects = await getProjects();
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <>
      <SmoothScroll />
      <Hero
        background={media.homeHeroImage}
        featured={featured}
        banks={{ sbi: media.partners.sbi.logo, pnb: media.partners.pnb.logo }}
      />
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
