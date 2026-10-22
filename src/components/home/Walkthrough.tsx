import { Cta } from "@/components/sections";
import TokyoSkylineHero from "@/components/ui/sunset-skyline-hero";
import { getSiteMedia } from "@/sanity/media";
import { Arrow, lux } from "./ui";

/** Scroll-scrubbed walk through a bright modern home (Pexels stock clip 7578546). */
export default async function Walkthrough() {
  const { homeWalkthrough: tour } = await getSiteMedia();
  return (
    <TokyoSkylineHero
      id="walkthrough"
      videoSrc={tour.src}
      videoSrcSmall={tour.srcSmall}
      poster={tour.poster}
      eyebrow="Virtual walkthrough"
      title="Step inside before you ever visit."
      scrollHint="SCROLL TO WALK THROUGH"
      brandMark="Welcome home."
      caption="Bank-approved homes across Delhi NCR — shortlisted for you, with an advisor beside you from the first visit to possession."
      action={
        <Cta href="/projects" className={lux.heroPrimary}>
          Explore our projects <Arrow />
        </Cta>
      }
      // The footage is bright, so the opening title sits on a light veil.
      openingVeil={0.4}
      // Keep the interior's daylight: a lighter close and softer edges than the dusk tours.
      closingVeil={0.38}
      shade="soft"
      scrubDistance={2600}
    />
  );
}
