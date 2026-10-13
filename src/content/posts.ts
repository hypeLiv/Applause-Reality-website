/**
 * Blog posts from the Wix blog. Slugs match the live /post/<slug> URLs so
 * existing links and search rankings carry over.
 *
 * `body` is empty until the full articles are imported from the Wix blog
 * export (Wix dashboard → Blog → Settings → Export). Each body is an array of
 * blocks so the import script can map Wix's rich content 1:1.
 */
export type PostBlock = { type: "h2" | "p"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "hero-homes-sector-mu-greater-noida-a-future-ready-address-for-corporate-and-banking-professionals",
    title:
      "Hero Homes Sector MU Greater Noida: A Future-Ready Address for Corporate and Banking Professionals",
    excerpt:
      "Why commute, connectivity and developer credibility make Hero Homes Sector MU a strong fit for corporate and banking families.",
    cover: "/images/blog-hero-homes.jpeg",
    body: [],
  },
  {
    slug: "top-investment-flats-in-delhi-ncr-you-should-consider",
    title: "Top Investment Flats in Delhi/NCR You Should Consider",
    excerpt:
      "A shortlist of Delhi NCR flats that balance rental returns, appreciation potential and day-to-day livability.",
    cover: "/images/blog-investment-flats.png",
    body: [],
  },
  {
    slug: "exploring-the-best-locations-for-flats-in-noida",
    title: "Exploring the Best Locations for Flats in Noida",
    excerpt:
      "A neighbourhood-by-neighbourhood look at where first-time buyers, investors and renters should focus in Noida.",
    cover: "/images/blog-noida-locations.png",
    body: [],
  },
  {
    slug: "essential-home-buying-tips-for-delhi-ncr-families",
    title: "Essential Home Buying Tips for Delhi/NCR Families",
    excerpt:
      "Practical checks on budget, location, approvals and amenities before your family commits to a home in Delhi NCR.",
    cover: "/images/blog-buying-tips.png",
    body: [],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
