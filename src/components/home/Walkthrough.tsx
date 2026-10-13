import { Cta } from "@/components/sections";
import TokyoSkylineHero from "@/components/ui/sunset-skyline-hero";
import { Arrow, lux } from "./ui";

/** Scroll-scrubbed walk through the Godrej Arden sample flat. */
export default function Walkthrough() {
  return (
    <TokyoSkylineHero
      id="walkthrough"
      videoSrc="/videos/walkthrough-scrub.mp4"
      poster="/images/poster-walkthrough.jpg"
      eyebrow="Godrej Arden · Sigma III, Greater Noida"
      title="Step inside before you ever visit."
      scrollHint="SCROLL TO WALK THROUGH"
      brandMark="Welcome home."
      caption="Spacious 3 & 4 BHK residences across nine towers — bank-approved, and one of the homes we're guiding families toward right now."
      action={
        <Cta href="/projects" className={lux.heroPrimary}>
          Explore this project <Arrow />
        </Cta>
      }
      scrubDistance={2600}
    />
  );
}
