import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField } from "../shared/image-field";

/**
 * A blog article: cover, card text and the article itself. Read time is
 * worked out from the body by the website.
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
      description: "The article's address, /blog/<slug>. Changing it breaks existing links.",
      type: "slug",
      options: { source: "title", maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Published on",
      type: "date",
      options: { dateFormat: "D MMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      description: "Short label on the blog cards, e.g. Investment or Buying guide.",
      type: "string",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      description: "One or two sentences for the blog cards and search results (about 150 characters).",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200).warning("Search engines cut summaries off after about 160 characters"),
    }),
    imageField({ name: "cover", title: "Cover image", description: "Also used when the article is shared.", required: true }),
    defineField({
      name: "body",
      title: "Article",
      description: "Headings (H2) also build the article's table of contents.",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
            { title: "Note", value: "note" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    description: "A full address (https://…) or a page on this site (/projects).",
                    type: "string",
                    validation: (rule) => rule.required(),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "cover" },
  },
});
