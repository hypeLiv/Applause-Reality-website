/**
 * Copies the website's bundled blog text and testimonials into Sanity:
 * each post's title, date, topic, summary and article body, and one
 * Testimonial document per review in src/content/testimonials.ts.
 *
 *   npm run seed:content                 # fill in only what's empty in Sanity
 *   FORCE=1 npm run seed:content         # overwrite Sanity with the code's text
 *   DRY_RUN=1 npm run seed:content       # print the plan, change nothing
 *
 * By default nothing edited in the Studio is overwritten (setIfMissing), so
 * it's safe to re-run. Post documents must already exist (npm run seed:media
 * creates them with their covers).
 */
import { posts } from "../../src/content/posts";
import { testimonials } from "../../src/content/testimonials";
import { fromPostBlocks } from "../../src/sanity/portable-text";

const DRY_RUN = process.env.DRY_RUN === "1";
const FORCE = process.env.FORCE === "1";

/** Stable document IDs, so re-runs update rather than duplicate. Non-Latin names fall back to their position. */
const testimonialId = (name: string, i: number) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `testimonial-${slug || `review-${i + 1}`}`;
};

async function main() {
  console.log(`${posts.length} posts, ${testimonials.length} testimonials${FORCE ? " (overwriting)" : " (filling empty fields only)"}.`);
  if (DRY_RUN) {
    testimonials.forEach((t, i) => console.log(`  ${testimonialId(t.name, i)}  ${t.name}`));
    console.log("Dry run: nothing changed.");
    return;
  }

  const { getCliClient } = await import("sanity/cli");
  const client = getCliClient({ apiVersion: "2026-02-01" });
  const tx = client.transaction();

  console.log("Blog posts");
  for (const p of posts) {
    const id = await client.fetch<string | null>(`*[_type == "post" && slug.current == $slug][0]._id`, { slug: p.slug });
    if (!id) {
      console.warn(`  ! no post document for ${p.slug}; run npm run seed:media first`);
      continue;
    }
    const fields = { title: p.title, date: p.date, topic: p.topic, excerpt: p.excerpt, body: fromPostBlocks(p.body) };
    tx.patch(id, (patch) => (FORCE ? patch.set(fields) : patch.setIfMissing(fields)));
    console.log(`  ${p.slug}`);
  }

  console.log("Testimonials");
  testimonials.forEach((t, i) => {
    const _id = testimonialId(t.name, i);
    const fields = {
      quote: t.quote,
      name: t.name,
      role: t.role,
      ...(t.org ? { org: t.org } : {}),
      language: t.lang ?? "en",
      featured: !!t.featured,
      rank: (i + 1) * 10,
    };
    tx.createIfNotExists({ _id, _type: "testimonial", ...fields });
    if (FORCE) tx.patch(_id, (patch) => patch.set(fields));
    console.log(`  ${_id}`);
  });

  await tx.commit();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
