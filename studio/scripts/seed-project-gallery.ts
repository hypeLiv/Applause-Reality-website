/**
 * Uploads one project's main photo and gallery from the website's bundled
 * files (src/content/projects.ts → public/) and sets just those two fields on
 * its Sanity document. Everything else on the document is left alone.
 *
 *   PROJECT=hero-homes npm run seed:gallery
 *   DRY_RUN=1 PROJECT=hero-homes npm run seed:gallery
 *
 * Safe to re-run: Sanity de-duplicates identical uploads, and the gallery is
 * replaced as a whole, so editing captions in code and re-running wins.
 */
import fs from "node:fs";
import path from "node:path";
import { projects } from "../../src/content/projects";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "../../public");
const DRY_RUN = process.env.DRY_RUN === "1";
const KEY = process.env.PROJECT;

async function main() {
  const p = projects.find((x) => x.key === KEY);
  if (!p) throw new Error(`Set PROJECT to one of: ${projects.map((x) => x.key).join(", ")}`);
  const gallery = p.gallery ?? [];
  const files = [p.photo, ...gallery.map((g) => g.src)];
  const missing = files.filter((f) => !fs.existsSync(path.join(PUBLIC_DIR, f)));
  if (missing.length) throw new Error(`Missing files in public/:\n  ${missing.join("\n  ")}`);

  const bytes = [...new Set(files)].reduce((n, f) => n + fs.statSync(path.join(PUBLIC_DIR, f)).size, 0);
  console.log(`${p.name}: main photo + ${gallery.length} gallery images, ${(bytes / 1e6).toFixed(1)} MB.`);
  if (DRY_RUN) {
    console.log("Dry run: nothing uploaded.");
    return;
  }

  const { getCliClient } = await import("sanity/cli");
  const client = getCliClient({ apiVersion: "2026-02-01" });
  const docId = await client.fetch<string | null>(`*[_type == "project" && slug.current == $key][0]._id`, { key: p.key });
  if (!docId) throw new Error(`No Sanity project with URL key "${p.key}". Run npm run seed:media first.`);

  const uploaded = new Map<string, string>();
  async function upload(src: string) {
    const cached = uploaded.get(src);
    if (cached) return cached;
    const asset = await client.assets.upload("image", fs.createReadStream(path.join(PUBLIC_DIR, src)), {
      filename: path.basename(src),
    });
    console.log(`  ↑ ${src}`);
    uploaded.set(src, asset._id);
    return asset._id;
  }
  const ref = (id: string) => ({ _type: "reference" as const, _ref: id });

  const photo = { _type: "image", asset: ref(await upload(p.photo)), alt: p.photoAlt };
  const items = [];
  for (const g of gallery) {
    items.push({
      _type: "image",
      // Stable keys keep Studio history readable across re-runs.
      _key: path.basename(g.src, path.extname(g.src)),
      asset: ref(await upload(g.src)),
      caption: g.caption,
      group: g.group,
      alt: g.alt,
    });
  }

  await client.patch(docId).set({ photo, gallery: items }).commit();
  console.log(`Done: set photo and ${items.length} gallery images on ${docId}.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
