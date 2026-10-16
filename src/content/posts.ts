import bodies from "./post-bodies.json";

/**
 * Blog posts. Sanity is the source (see getPosts in src/sanity/media.ts); the
 * entries here are the bundled fallback, transcribed from the old Wix blog.
 * Slugs match the live Wix slugs; the old /post/<slug> URLs redirect to
 * /blog/<slug> so links and rankings carry over.
 *
 * Article bodies, dates and read times live in post-bodies.json, as simple blocks.
 */

/** A run of formatted text from Sanity's rich-text editor. */
export type Span = { text: string; bold?: boolean; italic?: boolean; href?: string };

/** `text`/`items` are always plain text (for headings, anchors and read time); `spans` carry formatting when there is any. */
export type PostBlock =
  | { type: "h2" | "h3" | "p" | "quote" | "note"; text: string; spans?: Span[] }
  | { type: "ul" | "ol"; items: string[]; itemSpans?: Span[][] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  /** Alt text from Sanity; the title stands in when empty. */
  coverAlt?: string;
  /** Short topic label shown on cards. */
  topic: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readMinutes: number;
  body: PostBlock[];
};

type Body = { date: string; readMinutes: number; blocks: PostBlock[] };
const bodyFor = (slug: string): Body =>
  (bodies as Record<string, Body>)[slug] ?? { date: "", readMinutes: 1, blocks: [] };

const entries: Omit<Post, "date" | "readMinutes" | "body">[] = [
  {
    slug: "hero-homes-sector-mu-greater-noida-a-future-ready-address-for-corporate-and-banking-professionals",
    title:
      "Hero Homes Sector MU Greater Noida: A Future-Ready Address for Corporate and Banking Professionals",
    excerpt:
      "Why commute, connectivity and developer credibility make Hero Homes Sector MU a strong fit for corporate and banking families.",
    cover: "/images/blog-hero-homes.jpeg",
    topic: "Project spotlight",
  },
  {
    slug: "top-investment-flats-in-delhi-ncr-you-should-consider",
    title: "Top Investment Flats in Delhi/NCR You Should Consider",
    excerpt:
      "A shortlist of Delhi NCR flats that balance rental returns, appreciation potential and day-to-day livability.",
    cover: "/images/blog-investment-flats.png",
    topic: "Investment",
  },
  {
    slug: "exploring-the-best-locations-for-flats-in-noida",
    title: "Exploring the Best Locations for Flats in Noida",
    excerpt:
      "A neighbourhood-by-neighbourhood look at where first-time buyers, investors and renters should focus in Noida.",
    cover: "/images/blog-noida-locations.png",
    topic: "Locations",
  },
  {
    slug: "essential-home-buying-tips-for-delhi-ncr-families",
    title: "Essential Home Buying Tips for Delhi/NCR Families",
    excerpt:
      "Practical checks on budget, location, approvals and amenities before your family commits to a home in Delhi NCR.",
    cover: "/images/blog-buying-tips.png",
    topic: "Buying guide",
  },
];

/** Newest first. */
export const posts: Post[] = entries
  .map((e) => {
    const b = bodyFor(e.slug);
    return { ...e, date: b.date, readMinutes: b.readMinutes, body: b.blocks };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

/** Minutes to read at ~230 words a minute, which matches the Wix originals. */
export function readMinutesFor(blocks: PostBlock[]) {
  const words = blocks
    .flatMap((b) => ("items" in b ? b.items : [b.text]))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export const formatDate = (iso: string) =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";
