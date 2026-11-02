import type { IconName } from "@/components/home/ui";
import type { SiteMedia } from "@/sanity/media";

/**
 * The four services, shared by /services and the About page. The one-line `text`
 * is the client's original wording. `points`, `audience` and the CTA only restate
 * what the site already says elsewhere (journey steps, consultation reasons,
 * the corridor comparison); add detail here once the client confirms it.
 */
export type Service = {
  /** Anchor on /services and the Service schema's id. */
  id: string;
  icon: IconName;
  title: string;
  text: string;
  /** Which service photo (set in Sanity) illustrates it. */
  photo: keyof SiteMedia["services"];
  points: string[];
  audience: string;
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "residential",
    icon: "home",
    title: "Residential sales",
    text: "Premium NCR homes and villas with verified bank approvals for secure living.",
    photo: "residential",
    points: [
      "Shortlists of bank-approved projects that fit your budget",
      "Site visits we attend with you",
      "Side-by-side project comparisons",
      "Every form, check and signature handled with complete transparency",
    ],
    audience: "Families and professionals buying a home to live in.",
    cta: { label: "See current launches", href: "/projects" },
  },
  {
    id: "commercial",
    icon: "building",
    title: "Commercial leasing",
    text: "Strategic leasing for office and retail spaces in high-visibility NCR business districts.",
    photo: "commercial",
    points: [],
    audience: "Businesses looking for office or retail space across NCR.",
    cta: { label: "Talk to an advisor", href: "/consultation" },
  },
  {
    id: "investment",
    icon: "chart",
    title: "Investment advisory",
    text: "Clear analysis and ROI strategies for residential and commercial property portfolios.",
    photo: "investment",
    points: ["Side-by-side comparison of Noida, Greater Noida and Wave City: price ranges, advantages and growth potential"],
    audience: "Investors building or rebalancing an NCR property portfolio.",
    cta: { label: "Compare corridors", href: "/projects" },
  },
  {
    id: "home-loans",
    icon: "bank",
    title: "Home-loan assistance",
    text: "Seamless loan processing and documentation through our bank-approved partnerships.",
    photo: "homeLoans",
    points: [
      "Loan processing through our SBI and PNB relationships",
      "Priority processing for SBI and PNB employees",
      "Help with home loans, paperwork and possession",
    ],
    audience: "Every buyer who needs financing.",
    cta: { label: "Read the buyer FAQ", href: "/projects#faq" },
  },
];
