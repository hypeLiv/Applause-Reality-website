/**
 * Computes a BlurHash for every opaque photo in public/images and writes them to
 * src/content/blurhashes.json, keyed by the path the site uses ("/images/…").
 * Logos are skipped (by name, or by having transparency): they load fast and a
 * blurred blob behind a logo looks wrong. Sanity computes its own hashes for
 * uploaded images.
 *
 *   npm run blurhash
 */
import fs from "node:fs";
import path from "node:path";
import { encode } from "blurhash";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public/images");
const out = path.join(root, "src/content/blurhashes.json");

// Logos and bank/developer marks, including the white-backed ones that read as opaque.
const LOGO = /(^|\/)(logo|sbi|pnb)|-logo\.|^(eternia|godrej|gulshan)\.(png|jpe?g)$/i;

const files = fs
  .readdirSync(imagesDir, { recursive: true })
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !LOGO.test(f.split(path.sep).join("/")))
  .sort();

const hashes = {};
let skipped = 0;
for (const rel of files) {
  const file = path.join(imagesDir, rel);
  const image = sharp(file);
  const { isOpaque } = await image.stats();
  if (!isOpaque) {
    skipped++;
    continue;
  }
  const { width, height } = await image.metadata();
  // Hash a small copy: the result is the same and encoding stays fast.
  const { data, info } = await image
    .clone()
    .resize(32, 32, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // 4×3 components: enough for the broad light and colour of a photo.
  const hash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);
  hashes[`/images/${rel.split(path.sep).join("/")}`] = { hash, width, height };
}

fs.writeFileSync(out, JSON.stringify(hashes, null, 2) + "\n");
console.log(`${Object.keys(hashes).length} hashes written, ${skipped} transparent images skipped.`);
