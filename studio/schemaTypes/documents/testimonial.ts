import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

/** A named client review, shown on the Testimonials page and, when featured, on the homepage. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Review",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: "e.g. Dy. General Manager, or Investor.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "org",
      title: "Organisation",
      description: "Optional short employer name, shown after the role: \"Dy. General Manager · SBI\".",
      type: "string",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Hindi", value: "hi" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "en",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      description: "Featured reviews rotate in the homepage's \"Bankers buy through us\" section. Keep them short.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "rank",
      title: "Display order",
      description: "Lower numbers show first. The first review leads the Testimonials page.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Display order", name: "rankAsc", by: [{ field: "rank", direction: "asc" }] }],
  preview: {
    select: { title: "name", role: "role", org: "org", featured: "featured" },
    prepare: ({ title, role, org, featured }) => ({
      title,
      subtitle: [org ? `${role} · ${org}` : role, featured ? "★ Homepage" : null].filter(Boolean).join("  "),
    }),
  },
});
