import type { Metadata } from "next";
import { site } from "./site";

export const DEFAULT_TITLE = "Trusted Real Estate Consultants | Applause Reality Local Experts";
export const DEFAULT_DESCRIPTION =
  "Bank-approved residential and corporate properties across Delhi NCR, with lifelong consulting from first site visit to post-possession.";

/** The branded card from app/opengraph-image.tsx, used when a page has no image of its own. */
const SITE_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Applause Reality — bank-approved Delhi NCR property, from first visit to possession.",
};

/** Absolute URL for a site path, for JSON-LD (metadata resolves relative URLs itself). */
export const absolute = (path: string) => new URL(path, site.url).toString();

type PageMetaInput = {
  /** Bare page title; the root layout's template appends the brand. Omit for the home page. */
  title?: string;
  description: string;
  /** Canonical path, e.g. "/projects/hero-homes". */
  path: string;
  /** Page-specific share images; defaults to the site-wide branded card. */
  images?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter
 * tags. A nested segment's openGraph replaces the parent's wholesale, so the
 * shared fields (site name, locale, card type) are restated here every time.
 */
export function pageMeta({ title, description, path, images, type = "website", publishedTime }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : DEFAULT_TITLE;
  // Setting openGraph here drops the root card, so fall back to it explicitly.
  const shareImages = images ?? [SITE_CARD];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: shareImages,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: shareImages,
    },
  };
}
