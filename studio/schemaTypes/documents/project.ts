import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";
import { imageField } from "../shared/image-field";

/**
 * A current launch. Only its media lives here for now; the project's text is
 * in the website code, matched to this document by its URL key.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL key",
      description: "The last part of the project's page address, e.g. hero-homes for /projects/hero-homes.",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    imageField({ name: "photo", title: "Main photo", description: "Hero image on the project page and cards.", required: true }),
    imageField({ name: "logo", title: "Logo", description: "Transparent PNG or SVG works best.", required: true }),
    imageField({ name: "highlights", title: "Highlights sheet", description: "The one-page amenities/highlights graphic." }),
    defineField({ name: "film", title: "Film", type: "film" }),
    defineField({
      name: "brochure",
      title: "Brochure",
      description: "PDF visitors can download.",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current", media: "photo" },
  },
});
