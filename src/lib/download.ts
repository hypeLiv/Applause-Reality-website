/**
 * A link that downloads rather than opens. The `download` attribute is ignored
 * cross-origin, so files on Sanity's CDN get its ?dl= flag instead.
 */
export const downloadHref = (href: string) => (href.startsWith("http") ? `${href}?dl=` : href);
