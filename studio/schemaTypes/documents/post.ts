import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";
import { imageField } from "../shared/image-field";

/**
 * A blog article's media. The article text is in the website code for now,
 * matched to this document by its URL slug.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Must match the article's address, /blog/<slug>.",
      type: "slug",
      options: { source: "title", maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    imageField({ name: "cover", title: "Cover image", description: "Also used when the article is shared.", required: true }),
  ],
  preview: {
    select: { title: "title", media: "cover" },
  },
});
