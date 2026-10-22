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
import { getProjects, getSiteMedia, getTestimonials } from "@/sanity/media";

export const metadata: Metadata = pageMeta({ description: DEFAULT_DESCRIPTION, path: "/" });

export default async function Home() {
  // These reads share one cached Sanity fetch. (`Promise` here is the section component.)
  const media = await getSiteMedia();
  const projects = await getProjects();
  const testimonials = await getTestimonials();
  // Featured reviews rotate on the homepage; with none featured, the first three stand in.
  const featuredReviews = testimonials.filter((t) => t.featured);
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
      <Testimonials quotes={featuredReviews.length ? featuredReviews : testimonials.slice(0, 3)} />
      <Partners />
      <ClosingCta />
    </>
  );
}
