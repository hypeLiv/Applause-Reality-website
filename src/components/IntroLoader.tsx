import { site } from "@/lib/site";

/**
 * First-visit intro: a royal-blue wall slides across an ivory stage, uncovering
 * the wordmark, then the stage lifts away. Plain markup and CSS (see globals.css),
 * so it plays from first paint and ends on time however slowly the JavaScript loads.
 */
export default function IntroLoader() {
  return (
    <div className="intro" aria-hidden>
      <div className="intro-stage">
        <p className="intro-word">
          Applause <em>Reality</em>
        </p>
        <p lang="hi" className="intro-tag">
          {site.tagline}
        </p>
      </div>
      <div className="intro-wall">
        <span className="intro-edge" />
      </div>
    </div>
  );
}
