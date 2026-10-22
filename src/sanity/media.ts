import { createClient } from "@sanity/client";
import { cache } from "react";
import type { Award } from "@/components/page/AwardWall";
import { type Post, posts, readMinutesFor } from "@/content/posts";
import localHashes from "@/content/blurhashes.json";
import { GALLERY_GROUPS, type GalleryImage, type Project, projects } from "@/content/projects";
import { type Testimonial, testimonials } from "@/content/testimonials";
import { blurhashToDataURL } from "@/lib/blurhash";
import { apiVersion, dataset, projectId, sanityEnabled } from "./env";
import { toPostBlocks } from "./portable-text";
import { MEDIA_QUERY } from "./queries";
import type { MEDIA_QUERY_RESULT } from "./types";

/**
 * Photos, videos and files come from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID
 * is set. Every slot falls back to the file bundled in /public, so an empty
 * field, an unreachable API or a missing project ID never breaks a page.
 */

export type Img = { src: string; alt: string; width: number; height: number };
export type TourVideo = { src: string; srcSmall?: string; poster: string };
export type PartnerLogos = { logo: Img; logoWide: Img };

/** Webhook revalidation target; see app/api/revalidate. */
export const MEDIA_TAG = "sanity";

const client = createClient({ projectId: projectId || "unset", dataset, apiVersion, useCdn: true, perspective: "published" });

const fetchMedia = cache(async (): Promise<MEDIA_QUERY_RESULT | null> => {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch(MEDIA_QUERY, {}, { next: { revalidate: 3600, tags: [MEDIA_TAG] } });
  } catch (err) {
    console.error("Sanity media fetch failed; serving bundled media.", err);
    return null;
  }
});

type SanityImg = { src: string | null; alt: string | null; width: number | null; height: number | null } | null | undefined;
type SanityTour = { src: string | null; srcSmall: string | null; poster: string | null } | null | undefined;

function pick(s: SanityImg, fallback: Img): Img {
  if (!s?.src) return fallback;
  return {
    src: s.src,
    alt: s.alt || fallback.alt,
    width: s.width ?? fallback.width,
    height: s.height ?? fallback.height,
  };
}

function pickTour(s: SanityTour, fallback: TourVideo): TourVideo {
  if (!s?.src) return fallback;
  return { src: s.src, srcSmall: s.srcSmall ?? undefined, poster: s.poster ?? fallback.poster };
}

/** A local fallback image; size only matters where the layout uses it (logos, certificates). */
const local = (src: string, alt: string, width = 1600, height = 1000): Img => ({ src, alt, width, height });

const DEFAULTS = {
  logo: local("/images/logo.png", "Applause Reality", 1309, 373),
  logoOnDark: local("/images/logo-light.png", "Applause Reality", 1309, 373),
  icon: local("/images/logo-mark.png", "Applause Reality", 198, 190),
  founderPortrait: local("/images/founder.png", "Rajiv Kr. Pandey, founder of Applause Reality", 1120, 1404),
  // Unsplash licence (free for commercial use): Christian, Aalo Lens, Bibhash Banerjee, rc.xyz.
  services: {
    residential: local("/images/pillars/homes.jpg", "Warmly lit living room with night city views"),
    commercial: local("/images/pillars/commercial.jpg", "Office tower lit up at dusk"),
    investment: local("/images/pillars/investment.jpg", "Residential towers at blue hour"),
    homeLoans: local("/images/pillars/loans.jpg", "A house key on a dark surface"),
  },
  homeHeroImage: local("/images/hero-homes/central-lawn.jpg", "Families strolling across a sunlit central lawn at Hero Homes Leafsong Retreat"),
  homeWalkthrough: {
    src: "/videos/walkthrough-scrub.mp4",
    srcSmall: "/videos/walkthrough-scrub-mobile.mp4",
    poster: "/images/poster-walkthrough.jpg",
  },
  featuredAward: local(
    "/images/award-sbi.png",
    "Applause Reality receiving a Certificate of Excellence from State Bank of India",
    1475,
    1066,
  ),
  // Pexels clip 3258635 (4K dusk drone pull-back): its first ~25s at 6x speed, a 4s, 96-frame scrub.
  locationsTour: {
    src: "/videos/locations-scrub.mp4",
    srcSmall: "/videos/locations-scrub-mobile.mp4",
    poster: "/images/poster-locations.jpg",
  },
  onSitePhoto: local("/images/construction-site.jpg", "Residential towers under construction in Delhi NCR"),
  ctaImage: local("/images/residential-complex.jpg", "Residential towers in Delhi NCR"),
  testimonialsCtaImage: local("/images/key-in-door.jpg", ""),
};

const PARTNER_DEFAULTS = {
  sbi: local("/images/sbi.png", "State Bank of India", 157, 68),
  pnb: local("/images/pnb.png", "Punjab National Bank", 124, 53),
  godrej: local("/images/godrej.png", "Godrej Properties", 203, 83),
  gulshan: local("/images/gulshan.png", "Gulshan Group", 184, 100),
  eternia: local("/images/eternia.png", "Eternia Residences", 178, 96),
};
const PNB_WIDE = local("/images/pnb-full.png", "Punjab National Bank", 327, 103);

export type PartnerKey = keyof typeof PARTNER_DEFAULTS;

const AWARD_DEFAULTS: Award[] = [
  { src: "/images/award-sbi.png", w: 1475, h: 1066, title: "Certificate of Excellence", meta: "State Bank of India" },
  { src: "/images/award-2000cr.png", w: 1050, h: 1498, title: "₹2,000 Crore super launch", meta: "Godrej Properties · Outstanding performance, FY 23–24" },
  { src: "/images/award-builder.png", w: 1121, h: 1403, title: "Growth Partners Meet 2026", meta: "Gulshan Homes · Gulshan Empire, Wave City" },
  { src: "/images/award-partnership.png", w: 1507, h: 1044, title: "Partnership & performance", meta: "Recognised by Fusion Group" },
  { src: "/images/award-corporate.png", w: 1143, h: 1376, title: "Legends of Excellence — Outstanding", meta: "Godrej Majesty" },
  { src: "/images/award-5.png", w: 1296, h: 1214, title: "Channel partner recognition", meta: "The Prestige City" },
];

/** Brand assets and page-level photos and videos. */
export const getSiteMedia = cache(async () => {
  const m = await fetchMedia();
  const s = m?.settings;
  const d = DEFAULTS;

  const partners = Object.fromEntries(
    (Object.keys(PARTNER_DEFAULTS) as PartnerKey[]).map((key) => {
      const doc = m?.partners.find((p) => p.key === key);
      const logo = pick(doc?.logo, PARTNER_DEFAULTS[key]);
      const wideFallback = key === "pnb" && !doc?.logo?.src ? PNB_WIDE : logo;
      return [key, { logo, logoWide: pick(doc?.logoWide, wideFallback) }];
    }),
  ) as Record<PartnerKey, PartnerLogos>;

  const awards: Award[] = m?.awards.length
    ? m.awards.flatMap((a) =>
        a.image?.src
          ? [{ src: a.image.src, w: a.image.width ?? 1200, h: a.image.height ?? 1200, title: a.title ?? "", meta: a.issuer ?? "" }]
          : [],
      )
    : AWARD_DEFAULTS;

  return {
    logo: pick(s?.logo, d.logo),
    logoOnDark: pick(s?.logoOnDark, d.logoOnDark),
    icon: pick(s?.icon, d.icon),
    founderPortrait: pick(s?.founderPortrait, d.founderPortrait),
    services: {
      residential: pick(s?.servicePhotos?.residential, d.services.residential),
      commercial: pick(s?.servicePhotos?.commercial, d.services.commercial),
      investment: pick(s?.servicePhotos?.investment, d.services.investment),
      homeLoans: pick(s?.servicePhotos?.homeLoans, d.services.homeLoans),
    },
    homeHeroImage: pick(s?.homeHeroImage, d.homeHeroImage),
    homeWalkthrough: pickTour(s?.homeWalkthrough, d.homeWalkthrough),
    featuredAward: pick(s?.featuredAward, d.featuredAward),
    locationsTour: pickTour(s?.locationsTour, d.locationsTour),
    onSitePhoto: pick(s?.onSitePhoto, d.onSitePhoto),
    ctaImage: pick(s?.ctaImage, d.ctaImage),
    testimonialsCtaImage: pick(s?.testimonialsCtaImage, d.testimonialsCtaImage),
    partners,
    awards,
  };
});

export type SiteMedia = Awaited<ReturnType<typeof getSiteMedia>>;

/** The projects from content/projects.ts with their photos, film and brochure swapped in from Sanity. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const m = await fetchMedia();
  return projects.map((p) => {
    const doc = m?.projects.find((d) => d.key === p.key);
    if (!doc) return p;
    const photo = pick(doc.photo, local(p.photo, p.photoAlt));
    const logo = pick(doc.logo, local(p.logo.src, p.logo.alt, p.logo.w, p.logo.h));
    const film = doc.film?.src
      ? {
          src: doc.film.src,
          poster: doc.film.poster ?? p.film?.poster ?? photo.src,
          title: doc.film.title ?? p.film?.title ?? p.name,
          portrait: doc.film.orientation === "portrait",
        }
      : p.film;
    return {
      ...p,
      photo: photo.src,
      photoAlt: photo.alt,
      logo: { src: logo.src, alt: logo.alt, w: logo.width, h: logo.height },
      highlights: doc.highlights?.src ?? p.highlights,
      gallery: pickGallery(doc.gallery, p.gallery),
      film,
      brochure: doc.brochure ?? p.brochure,
      brochureBytes: doc.brochureBytes ?? undefined,
    };
  });
});

type SanityGallery = { src: string | null; alt: string | null; caption: string | null; group: string | null; width: number | null; height: number | null }[] | null | undefined;

/** The Sanity gallery when it has any usable images, otherwise the bundled one. */
function pickGallery(s: SanityGallery, fallback: GalleryImage[] | undefined): GalleryImage[] | undefined {
  const items = (s ?? []).flatMap((g): GalleryImage[] =>
    g.src && g.caption && GALLERY_GROUPS.includes(g.group as GalleryImage["group"])
      ? [{ src: g.src, alt: g.alt || g.caption, caption: g.caption, group: g.group as GalleryImage["group"], width: g.width ?? 1600, height: g.height ?? 1000 }]
      : [],
  );
  // Group order comes from GALLERY_GROUPS; order within a group is the editor's.
  items.sort((a, b) => GALLERY_GROUPS.indexOf(a.group) - GALLERY_GROUPS.indexOf(b.group));
  return items.length ? items : fallback;
}

export async function getProjectMedia(key: string) {
  return (await getProjects()).find((p) => p.key === key);
}

/**
 * Blog posts, newest first. A post written in Sanity (title, date and body all
 * filled in) is used as is, including posts that exist only there; otherwise
 * the bundled post from content/posts.ts is used, with any Sanity cover.
 */
export const getPosts = cache(async (): Promise<Post[]> => {
  const m = await fetchMedia();
  const docs = m?.posts ?? [];
  const bundled = new Map(posts.map((p) => [p.slug, p]));
  const fromSanity: Post[] = docs.flatMap((d): Post[] => {
    const body = toPostBlocks(d.body);
    if (!d.slug || !d.title || !d.date || !body.length) return [];
    const fallback = bundled.get(d.slug);
    const cover = d.cover?.src ?? fallback?.cover;
    if (!cover) return [];
    return [
      {
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt || fallback?.excerpt || "",
        topic: d.topic || fallback?.topic || "Insights",
        date: d.date,
        readMinutes: readMinutesFor(body),
        body,
        cover,
        coverAlt: d.cover?.alt || undefined,
      },
    ];
  });
  const written = new Set(fromSanity.map((p) => p.slug));
  const rest = posts
    .filter((p) => !written.has(p.slug))
    .map((p) => {
      const cover = docs.find((d) => d.slug === p.slug)?.cover;
      return cover?.src ? { ...p, cover: cover.src, coverAlt: cover.alt || undefined } : p;
    });
  return [...fromSanity, ...rest].sort((a, b) => b.date.localeCompare(a.date));
});

/** Client testimonials in display order: Sanity's when it has any, otherwise the bundled set. */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const docs = (await fetchMedia())?.testimonials ?? [];
  const fromSanity = docs.flatMap((d): Testimonial[] =>
    d.quote && d.name && d.role
      ? [
          {
            quote: d.quote,
            name: d.name,
            role: d.role,
            ...(d.org ? { org: d.org } : {}),
            ...(d.language === "hi" ? { lang: "hi" as const } : {}),
            ...(d.featured ? { featured: true } : {}),
          },
        ]
      : [],
  );
  return fromSanity.length ? fromSanity : testimonials;
});

type Hashed = { src: string; hash: string; width: number; height: number };

/** Every image in a Sanity result that carries a BlurHash, except logos (keys like logo, logoWide, icon). */
function sanityHashes(node: unknown, key = "", out: Hashed[] = []): Hashed[] {
  if (Array.isArray(node)) {
    for (const item of node) sanityHashes(item, key, out);
  } else if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (typeof o.src === "string" && typeof o.blurHash === "string" && !/logo|icon/i.test(key)) {
      out.push({ src: o.src, hash: o.blurHash, width: Number(o.width) || 1, height: Number(o.height) || 1 });
    }
    for (const [k, v] of Object.entries(o)) sanityHashes(v, k, out);
  }
  return out;
}

/**
 * Blur placeholders (image src → tiny PNG data URL) for every photo the site
 * currently shows: Sanity's own hashes for uploaded images, and the hashes from
 * `npm run blurhash` for bundled /public files. Limited to images actually in
 * use, so the map stays a few kilobytes.
 */
export const getBlurMap = cache(async (): Promise<Record<string, string>> => {
  const [m, media, projectList, postList] = await Promise.all([fetchMedia(), getSiteMedia(), getProjects(), getPosts()]);
  const used = JSON.stringify([media, projectList, postList]);
  const local: Hashed[] = Object.entries(localHashes as Record<string, { hash: string; width: number; height: number }>).map(
    ([src, h]) => ({ src, ...h }),
  );
  const map: Record<string, string> = {};
  for (const h of [...local, ...sanityHashes(m)]) {
    if (!map[h.src] && used.includes(`"${h.src}"`)) map[h.src] = blurhashToDataURL(h.hash, h.width, h.height);
  }
  return map;
});
