/**
 * A same-origin URL for an image used as a WebGL texture (MorphGallery).
 * Sanity's CDN sends no CORS headers, so its URLs can't be uploaded to WebGL
 * and the gallery would quietly fall back to a cross-fade. Next's optimizer
 * serves the image from our own origin, resized to 1920px and re-encoded.
 */
export function textureSrc(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
}
