import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";
import { imageField } from "../shared/image-field";

/** A bank or developer the firm works with, shown as a logo. */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Key",
      description: "Short identifier the site uses, e.g. sbi, pnb, godrej.",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Bank", value: "bank" },
          { title: "Developer", value: "developer" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    imageField({ name: "logo", title: "Logo", description: "Compact mark used at small sizes.", required: true }),
    imageField({
      name: "logoWide",
      title: "Wide logo",
      description: "Optional full wordmark for larger placements; the compact logo is used when empty.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "kind", media: "logo" },
  },
});
