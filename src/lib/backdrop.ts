/**
 * Is what's painted behind `el` dark? Used by the header to swap the bare
 * logo to its white version. Probes three points across the element:
 *
 * - inside `[data-backdrop]` → that value wins ("dark" | "light"); use it for
 *   footage, WebGL and photos under tinted scrims, which can't be sampled;
 * - a bare <img> → its actual brightness there, sampled through a 1px canvas
 *   (next/image serves same-origin, so the canvas isn't tainted);
 * - anything else → the nearest solid background colour's brightness (page
 *   surfaces, buttons); translucent veils over photos are looked through.
 */
const DARK_BELOW = 120; // luma 0–255; the navy logo needs more than this behind it

let ctx: CanvasRenderingContext2D | null = null;

function imageLuma(img: HTMLImageElement, x: number, y: number, size: number): number | null {
  if (!img.complete || !img.naturalWidth) return null;
  ctx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", {
    willReadFrequently: true,
  });
  if (!ctx) return null;

  // Map the viewport point into the image's own pixels (object-fit cover/contain/fill + object-position).
  const r = img.getBoundingClientRect();
  const s = getComputedStyle(img);
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  let sx = r.width / nw;
  let sy = r.height / nh;
  let ox = 0;
  let oy = 0;
  if (s.objectFit === "cover" || s.objectFit === "contain") {
    sx = sy = (s.objectFit === "cover" ? Math.max : Math.min)(r.width / nw, r.height / nh);
    const [px, py] = s.objectPosition.split(" ").map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : 0.5));
    ox = (r.width - nw * sx) * px;
    oy = (r.height - nh * sy) * py;
  }
  const ix = (x - r.left - ox) / sx;
  const iy = (y - r.top - oy) / sy;
  const w = size / sx;
  const h = size / sy;

  try {
    // Averages the region under the point into a single pixel.
    ctx.clearRect(0, 0, 1, 1);
    ctx.drawImage(img, ix - w / 2, iy - h / 2, w, h, 0, 0, 1, 1);
    const [R, G, B, A] = ctx.getImageData(0, 0, 1, 1).data;
    if (A < 128) return null;
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  } catch {
    return null; // cross-origin image: can't read it
  }
}

function darkAt(x: number, y: number, size: number, skip: Element): boolean {
  const hit = document.elementsFromPoint(x, y).find((e) => !skip.contains(e));
  if (!hit) return false;
  const marked = hit.closest<HTMLElement>("[data-backdrop]");
  if (marked) return marked.dataset.backdrop === "dark";
  if (hit instanceof HTMLImageElement) {
    const luma = imageLuma(hit, x, y, size);
    return luma !== null && luma < DARK_BELOW;
  }
  // Otherwise the nearest solid fill decides (a royal button, a navy band); gradient veils are skipped.
  for (let e: Element | null = hit; e; e = e.parentElement) {
    const luma = fillLuma(getComputedStyle(e).backgroundColor);
    if (luma !== null) return luma < DARK_BELOW;
  }
  return false;
}

/** Luma of a mostly-opaque computed background colour, or null when it's (near) transparent. */
function fillLuma(color: string): number | null {
  const n = color.match(/[\d.]+%?/g)?.map((v) => parseFloat(v) / (v.endsWith("%") ? 100 : 1));
  if (!n) return null;
  if (color.startsWith("rgb")) {
    if (n[3] !== undefined && n[3] <= 0.5) return null;
    return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
  }
  if (color.startsWith("okl")) {
    // oklch()/oklab(): lightness first (0–1), alpha after the slash.
    if (n[3] !== undefined && n[3] <= 0.5) return null;
    return n[0] * 255;
  }
  return null;
}

/** True when most of `el`'s width sits over something dark. `skip` is the chrome to look through (the header). */
export function isDarkBehind(el: Element, skip: Element): boolean {
  const r = el.getBoundingClientRect();
  if (!r.width) return false;
  const y = r.top + r.height / 2;
  const points = [r.left + r.width * 0.15, r.left + r.width / 2, r.right - r.width * 0.15];
  return points.filter((x) => darkAt(x, y, r.height, skip)).length >= 2;
}
