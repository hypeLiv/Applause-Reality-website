import { defineQuery } from "groq";

/** An image's URL, alt text, intrinsic size and the BlurHash Sanity computes on upload. */
const image = /* groq */ `{
  "src": asset->url,
  alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "blurHash": asset->metadata.blurHash
}`;

const tour = /* groq */ `{
  "src": video.asset->url,
  "srcSmall": mobileVideo.asset->url,
  "poster": poster.asset->url
}`;

/** Every photo, video and file the site shows, in one round trip. */
export const MEDIA_QUERY = defineQuery(/* groq */ `{
  "settings": *[_id == "siteSettings"][0]{
    logo${image},
    logoOnDark${image},
    icon${image},
    founderPortrait${image},
    servicePhotos{
      residential${image},
      commercial${image},
      investment${image},
      homeLoans${image}
    },
    homeHeroImage${image},
    homeWalkthrough${tour},
    "featuredAward": featuredAward->image${image},
    locationsTour${tour},
    onSitePhoto${image},
    ctaImage${image},
    testimonialsCtaImage${image}
  },
  "projects": *[_type == "project" && defined(slug.current)]{
    "key": slug.current,
    photo${image},
    logo${image},
    highlights${image},
    "gallery": gallery[defined(asset)]{
      "src": asset->url,
      alt,
      caption,
      group,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "blurHash": asset->metadata.blurHash
    },
    film{
      "src": video.asset->url,
      "poster": poster.asset->url,
      title,
      orientation
    },
    "brochure": brochure.asset->url,
    "brochureBytes": brochure.asset->size
  },
  "posts": *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    cover${image}
  },
  "partners": *[_type == "partner" && defined(slug.current)]{
    "key": slug.current,
    logo${image},
    logoWide${image}
  },
  "awards": *[_type == "award" && defined(image.asset)] | order(rank asc){
    _id,
    title,
    issuer,
    image${image}
  }
}`);
