/**
 * A same-origin URL for an image used as a WebGL texture (MorphGallery).
 * Sanity's CDN sends no CORS headers, so its URLs can't be uploaded to WebGL
 * and the gallery would quietly fall back to a cross-fade. Next's optimizer
 * serves the image from our own origin, resized to `width` and re-encoded.
 */
export function textureSrc(src: string, width = 1920) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

/** Next's default image widths, up to the size the source photos are worth. */
const WIDTHS = [640, 750, 828, 1080, 1200, 1920];

/** The smallest texture that stays sharp across this screen. Browser only. */
export function textureWidth() {
  const needed = window.innerWidth * window.devicePixelRatio;
  return WIDTHS.find((w) => w >= needed) ?? 1920;
}
