import { defineField } from "sanity";

type ImageFieldOptions = {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  group?: string;
};

/** An image with hotspot cropping and alt text; the site falls back to its built-in alt when alt is empty. */
export function imageField({ name, title, description, required, group }: ImageFieldOptions) {
  return defineField({
    name,
    title,
    description,
    group,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        description: "What the image shows, for search engines and screen readers.",
        type: "string",
        validation: (rule) => rule.required().warning("Alt text helps SEO and accessibility"),
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  });
}

/** An MP4 upload. Keep files web-compressed (H.264, ideally under ~20 MB). */
export function videoField({ name, title, description, required }: ImageFieldOptions) {
  return defineField({
    name,
    title,
    description,
    type: "file",
    options: { accept: "video/mp4" },
    validation: required ? (rule) => rule.required() : undefined,
  });
}
