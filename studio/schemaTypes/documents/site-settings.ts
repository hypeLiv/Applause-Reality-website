import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";
import { imageField } from "../shared/image-field";

/** Site-wide brand assets and the photos and videos that belong to pages rather than to a project or post. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "people", title: "People" },
    { name: "services", title: "Services" },
    { name: "home", title: "Home page" },
    { name: "projects", title: "Projects page" },
    { name: "banners", title: "Closing banners" },
  ],
  fields: [
    // Brand
    imageField({ name: "logo", title: "Logo", description: "For light backgrounds.", group: "brand", required: true }),
    imageField({ name: "logoOnDark", title: "Logo on dark", description: "Light version for dark heroes and the share card.", group: "brand" }),
    imageField({ name: "icon", title: "Browser icon", description: "Square mark used as the favicon and home-screen icon.", group: "brand" }),

    // People
    imageField({ name: "founderPortrait", title: "Founder portrait", description: "Rajiv Kumar Pandey, shown on About and on articles.", group: "people" }),

    // Services
    defineField({
      name: "servicePhotos",
      title: "Service photos",
      description: "One photo per service, used on the home page and About page.",
      type: "object",
      group: "services",
      fields: [
        imageField({ name: "residential", title: "Residential sales" }),
        imageField({ name: "commercial", title: "Commercial leasing" }),
        imageField({ name: "investment", title: "Investment advisory" }),
        imageField({ name: "homeLoans", title: "Home-loan assistance" }),
      ],
    }),

    // Home page
    imageField({ name: "homeHeroImage", title: "Hero background", description: "City skyline behind the opening headline.", group: "home" }),
    defineField({ name: "homeWalkthrough", title: "Walkthrough tour", type: "tourVideo", group: "home" }),
    defineField({
      name: "featuredAward",
      title: "Featured award",
      description: "Shown beside the home-loan section and used as the business image in search results.",
      type: "reference",
      to: [{ type: "award" }],
      group: "home",
    }),

    // Projects page
    defineField({ name: "locationsTour", title: "Locations tour", type: "tourVideo", group: "projects" }),
    imageField({ name: "onSitePhoto", title: "On-site photo", description: "Construction photo beside \"how we vet projects\".", group: "projects" }),

    // Closing banners
    imageField({ name: "ctaImage", title: "Default banner photo", description: "Behind the closing call to action on most pages.", group: "banners" }),
    imageField({ name: "testimonialsCtaImage", title: "Testimonials banner photo", group: "banners" }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
