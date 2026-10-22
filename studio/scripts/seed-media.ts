/**
 * One-time import of the website's bundled photos, videos and brochures into
 * Sanity, creating the documents that reference them.
 *
 *   npm run seed:media                 # upload and create/update documents
 *   DRY_RUN=1 npm run seed:media       # only check every file exists and print the plan
 *
 * Safe to re-run: Sanity de-duplicates identical uploads, and documents are
 * matched by URL key / slug / title and patched rather than duplicated.
 */
import fs from "node:fs";
import path from "node:path";
import { posts } from "../../src/content/posts";
import { projects } from "../../src/content/projects";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "../../public");
const DRY_RUN = process.env.DRY_RUN === "1";

type Ref = { _type: "reference"; _ref: string };
type ImageValue = { _type: "image"; asset: Ref; alt?: string };
type FileValue = { _type: "file"; asset: Ref };

const partners = [
  { key: "sbi", name: "State Bank of India", kind: "bank", logo: "/images/sbi.png" },
  { key: "pnb", name: "Punjab National Bank", kind: "bank", logo: "/images/pnb.png", logoWide: "/images/pnb-full.png" },
  { key: "godrej", name: "Godrej Properties", kind: "developer", logo: "/images/godrej.png" },
  { key: "gulshan", name: "Gulshan Group", kind: "developer", logo: "/images/gulshan.png" },
  { key: "eternia", name: "Eternia Residences", kind: "developer", logo: "/images/eternia.png" },
];

const awards = [
  { src: "/images/award-sbi.png", title: "Certificate of Excellence", issuer: "State Bank of India", alt: "Applause Reality receiving a Certificate of Excellence from State Bank of India" },
  { src: "/images/award-2000cr.png", title: "₹2,000 Crore super launch", issuer: "Godrej Properties · Outstanding performance, FY 23–24" },
  { src: "/images/award-builder.png", title: "Growth Partners Meet 2026", issuer: "Gulshan Homes · Gulshan Empire, Wave City" },
  { src: "/images/award-partnership.png", title: "Partnership & performance", issuer: "Recognised by Fusion Group" },
  { src: "/images/award-corporate.png", title: "Legends of Excellence — Outstanding", issuer: "Godrej Majesty" },
  { src: "/images/award-5.png", title: "Channel partner recognition", issuer: "The Prestige City" },
];

const settings = {
  logo: { src: "/images/logo.png", alt: "Applause Reality" },
  logoOnDark: { src: "/images/logo-light.png", alt: "Applause Reality" },
  icon: { src: "/images/logo-mark.png", alt: "Applause Reality" },
  founderPortrait: { src: "/images/founder.png", alt: "Rajiv Kr. Pandey, founder of Applause Reality" },
  servicePhotos: {
    residential: { src: "/images/pillars/homes.jpg", alt: "Warmly lit living room with night city views" },
    commercial: { src: "/images/pillars/commercial.jpg", alt: "Office tower lit up at dusk" },
    investment: { src: "/images/pillars/investment.jpg", alt: "Residential towers at blue hour" },
    homeLoans: { src: "/images/pillars/loans.jpg", alt: "A house key on a dark surface" },
  },
  homeHeroImage: { src: "/images/hero-homes/central-lawn.jpg", alt: "Families strolling across a sunlit central lawn at Hero Homes Leafsong Retreat" },
  homeWalkthrough: {
    video: "/videos/walkthrough-scrub.mp4",
    mobileVideo: "/videos/walkthrough-scrub-mobile.mp4",
    poster: { src: "/images/poster-walkthrough.jpg", alt: "Bright open-plan living room" },
  },
  locationsTour: {
    video: "/videos/locations-scrub.mp4",
    mobileVideo: "/videos/locations-scrub-mobile.mp4",
    poster: { src: "/images/poster-locations.jpg", alt: "City lights under a dusk sky, seen from a drone" },
  },
  onSitePhoto: { src: "/images/construction-site.jpg", alt: "Residential towers under construction in Delhi NCR" },
  ctaImage: { src: "/images/residential-complex.jpg", alt: "Residential complex at dusk" },
  testimonialsCtaImage: { src: "/images/key-in-door.jpg", alt: "A key turning in the front door of a new home" },
};

/** Every local file the import touches, checked before anything is uploaded. */
function collectFiles(): string[] {
  const files = new Set<string>();
  for (const p of projects) {
    [p.photo, p.logo.src, p.highlights, p.brochure, p.film?.src, p.film?.poster].forEach((f) => f && files.add(f));
  }
  for (const p of posts) files.add(p.cover);
  for (const p of partners) [p.logo, p.logoWide].forEach((f) => f && files.add(f));
  for (const a of awards) files.add(a.src);
  const walk = (v: unknown): void => {
    if (typeof v === "string" && v.startsWith("/")) files.add(v);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(settings);
  return [...files];
}

async function main() {
  const files = collectFiles();
  const missing = files.filter((f) => !fs.existsSync(path.join(PUBLIC_DIR, f)));
  if (missing.length) throw new Error(`Missing files in public/:\n  ${missing.join("\n  ")}`);

  const bytes = files.reduce((n, f) => n + fs.statSync(path.join(PUBLIC_DIR, f)).size, 0);
  console.log(`${files.length} files, ${(bytes / 1e6).toFixed(0)} MB to upload.`);
  console.log(`Documents: 1 site settings, ${projects.length} projects, ${posts.length} posts, ${partners.length} partners, ${awards.length} awards.`);
  if (DRY_RUN) {
    console.log("Dry run: nothing uploaded.");
    return;
  }

  const { getCliClient } = await import("sanity/cli");
  const client = getCliClient({ apiVersion: "2026-02-01" });
  const uploaded = new Map<string, string>();

  async function upload(kind: "image" | "file", src: string) {
    const cached = uploaded.get(src);
    if (cached) return cached;
    const asset = await client.assets.upload(kind, fs.createReadStream(path.join(PUBLIC_DIR, src)), {
      filename: path.basename(src),
    });
    console.log(`  ↑ ${src}`);
    uploaded.set(src, asset._id);
    return asset._id;
  }
  const ref = (id: string): Ref => ({ _type: "reference", _ref: id });
  const image = async (src: string, alt?: string): Promise<ImageValue> => ({
    _type: "image",
    asset: ref(await upload("image", src)),
    ...(alt ? { alt } : {}),
  });
  const file = async (src: string): Promise<FileValue> => ({ _type: "file", asset: ref(await upload("file", src)) });

  /** Patch the document matched by `filter`, or create it. Returns its _id. */
  async function upsert(type: string, filter: string, params: Record<string, string>, fields: Record<string, unknown>) {
    const existing = await client.fetch<string | null>(`*[_type == $type && ${filter}][0]._id`, { type, ...params });
    if (existing) {
      await client.patch(existing).set(fields).commit();
      return existing;
    }
    return (await client.create({ _type: type, ...fields }))._id;
  }

  console.log("Projects");
  for (const p of projects) {
    await upsert("project", "slug.current == $key", { key: p.key }, {
      name: p.name,
      slug: { _type: "slug", current: p.key },
      photo: await image(p.photo, p.photoAlt),
      logo: await image(p.logo.src, p.logo.alt),
      ...(p.highlights ? { highlights: await image(p.highlights, `${p.name} project highlights`) } : {}),
      brochure: await file(p.brochure),
      ...(p.film
        ? {
            film: {
              _type: "film",
              video: await file(p.film.src),
              poster: await image(p.film.poster, p.film.title),
              title: p.film.title,
              orientation: p.film.portrait ? "portrait" : "landscape",
            },
          }
        : {}),
    });
  }

  console.log("Blog posts");
  for (const p of posts) {
    await upsert("post", "slug.current == $slug", { slug: p.slug }, {
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      cover: await image(p.cover, p.title),
    });
  }

  console.log("Partners");
  for (const p of partners) {
    await upsert("partner", "slug.current == $key", { key: p.key }, {
      name: p.name,
      slug: { _type: "slug", current: p.key },
      kind: p.kind,
      logo: await image(p.logo, p.name),
      ...(p.logoWide ? { logoWide: await image(p.logoWide, p.name) } : {}),
    });
  }

  console.log("Awards");
  const awardIds: string[] = [];
  for (const [i, a] of awards.entries()) {
    awardIds.push(
      await upsert("award", "title == $title", { title: a.title }, {
        title: a.title,
        issuer: a.issuer,
        image: await image(a.src, a.alt ?? `${a.title}, ${a.issuer}`),
        rank: (i + 1) * 10,
      }),
    );
  }

  console.log("Site settings");
  const s = settings;
  const tour = async (t: typeof s.homeWalkthrough) => ({
    _type: "tourVideo",
    video: await file(t.video),
    mobileVideo: await file(t.mobileVideo),
    poster: await image(t.poster.src, t.poster.alt),
  });
  await client.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
  await client
    .patch("siteSettings")
    .set({
      logo: await image(s.logo.src, s.logo.alt),
      logoOnDark: await image(s.logoOnDark.src, s.logoOnDark.alt),
      icon: await image(s.icon.src, s.icon.alt),
      founderPortrait: await image(s.founderPortrait.src, s.founderPortrait.alt),
      servicePhotos: {
        residential: await image(s.servicePhotos.residential.src, s.servicePhotos.residential.alt),
        commercial: await image(s.servicePhotos.commercial.src, s.servicePhotos.commercial.alt),
        investment: await image(s.servicePhotos.investment.src, s.servicePhotos.investment.alt),
        homeLoans: await image(s.servicePhotos.homeLoans.src, s.servicePhotos.homeLoans.alt),
      },
      homeHeroImage: await image(s.homeHeroImage.src, s.homeHeroImage.alt),
      homeWalkthrough: await tour(s.homeWalkthrough),
      featuredAward: ref(awardIds[0]),
      locationsTour: await tour(s.locationsTour),
      onSitePhoto: await image(s.onSitePhoto.src, s.onSitePhoto.alt),
      ctaImage: await image(s.ctaImage.src, s.ctaImage.alt),
      testimonialsCtaImage: await image(s.testimonialsCtaImage.src, s.testimonialsCtaImage.alt),
    })
    .commit();

  console.log(`Done: ${uploaded.size} files uploaded.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
