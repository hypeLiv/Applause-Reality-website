import { StarIcon } from "@sanity/icons/Star";
import { defineField, defineType } from "sanity";
import { imageField } from "../shared/image-field";

/** A certificate or trophy shown on the About page's recognition wall. */
export const award = defineType({
  name: "award",
  title: "Award",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issued by",
      description: "Who gave it and for what, e.g. \"Godrej Properties · Outstanding performance, FY 23–24\".",
      type: "string",
    }),
    imageField({ name: "image", title: "Photo or scan", required: true }),
    defineField({
      name: "rank",
      title: "Display order",
      description: "Lower numbers show first.",
      type: "number",
      initialValue: 10,
    }),
  ],
  orderings: [{ title: "Display order", name: "rankAsc", by: [{ field: "rank", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "issuer", media: "image" },
  },
});
